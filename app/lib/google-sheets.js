// Google Sheets pres Workload Identity Federation + Vercel OIDC (keyless, zadny JSON klic)
// Flow: Vercel OIDC token → STS federated token → impersonate service account → Sheets API
import { getVercelOidcToken } from '@vercel/functions/oidc'

const PROJECT_NUMBER = '251861487049'
const POOL_ID = 'vercel-pool'
const PROVIDER_ID = 'vercel-oidc'
const SERVICE_ACCOUNT = 'cro-report-reader@cro-report-sheets.iam.gserviceaccount.com'
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
]

let cachedToken = null
let cachedAt = 0
const TOKEN_TTL_MS = 50 * 60 * 1000 // GCP access tokens platneji 1h, refresh po 50 min

export async function getAccessToken() {
  if (cachedToken && Date.now() - cachedAt < TOKEN_TTL_MS) return cachedToken

  // Token prichazi z request headeru x-vercel-oidc-token (ne env var)
  const vercelToken = await getVercelOidcToken()
  if (!vercelToken) throw new Error('Vercel OIDC token missing — OIDC Federation not enabled?')

  const audience = `//iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}`

  // Step 1: Exchange Vercel OIDC token za STS federated token
  const stsRes = await fetch('https://sts.googleapis.com/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      audience,
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      subject_token: vercelToken,
    }),
  })

  if (!stsRes.ok) {
    const err = await stsRes.text()
    throw new Error(`STS exchange failed (${stsRes.status}): ${err}`)
  }

  const stsJson = await stsRes.json()
  const federatedToken = stsJson.access_token
  if (!federatedToken) throw new Error('STS did not return access_token')

  // Step 2: Impersonovat service account — ziskat SA access token
  const saUrl = `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${SERVICE_ACCOUNT}:generateAccessToken`
  const saRes = await fetch(saUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${federatedToken}`,
    },
    body: JSON.stringify({
      scope: SCOPES,
      lifetime: '3600s',
    }),
  })

  if (!saRes.ok) {
    const err = await saRes.text()
    throw new Error(`SA impersonation failed (${saRes.status}): ${err}`)
  }

  const saJson = await saRes.json()
  const accessToken = saJson.accessToken
  if (!accessToken) throw new Error('SA impersonation did not return accessToken')

  cachedToken = accessToken
  cachedAt = Date.now()
  return accessToken
}

// Vraci { sheets: [{sheetId, title}, ...] } — seznam vsech tabu s gid a nazvem
export async function fetchSheetMetadata(spreadsheetId) {
  const token = await getAccessToken()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties(sheetId,title,hidden)`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sheets metadata failed (${res.status}): ${err}`)
  }
  const data = await res.json()
  const sheets = (data.sheets || []).map(s => ({
    sheetId: s.properties.sheetId,
    title: s.properties.title,
    hidden: !!s.properties.hidden,
  }))
  return { sheets }
}

// Vraci { values: [[...], [...], ...] } — 2D array radku pro dany tab (nebo range A1:Z)
export async function fetchSheetValues(spreadsheetId, range) {
  const token = await getAccessToken()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sheets values failed (${res.status}): ${err}`)
  }
  return await res.json()
}
