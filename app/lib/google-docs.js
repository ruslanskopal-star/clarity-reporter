// Google Docs pres stejny WIF flow jako google-sheets.js.
// Sdili access token (scope documents.readonly je v SCOPES v google-sheets.js).
import { getAccessToken } from './google-sheets.js'

// Vraci { documentId, title, revisionId, bodyLength } — metadata bez plneho obsahu
export async function fetchDocMetadata(documentId) {
  const token = await getAccessToken()
  // fields=title,revisionId,documentId vraci jen zakladni metadata (ne body)
  const url = `https://docs.googleapis.com/v1/documents/${documentId}?fields=title,revisionId,documentId`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Docs metadata failed (${res.status}): ${err}`)
  }
  const data = await res.json()
  return {
    documentId: data.documentId,
    title: data.title,
    revisionId: data.revisionId,
  }
}

// Vraci plny dokument (body.content tree) — pro priste, ted nepouzivame
export async function fetchDocContent(documentId) {
  const token = await getAccessToken()
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Docs content failed (${res.status}): ${err}`)
  }
  return await res.json()
}
