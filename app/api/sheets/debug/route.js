// Debug endpoint — vypise VERCEL_* env vary ze ktere se inicializuje WIF flow
// POUZE pro debug, odstranit po vyreseni OIDC problemu
import { requireSession } from '../../../lib/auth.js'

export const runtime = 'nodejs'

export async function GET(req) {
  const session = await requireSession(req)
  if (!session.ok) {
    return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  const vercelEnvs = Object.keys(process.env)
    .filter(k => k.startsWith('VERCEL_'))
    .reduce((acc, k) => {
      // Neposilej obsah OIDC tokenu — jen zda existuje a delku
      if (k === 'VERCEL_OIDC_TOKEN') {
        const v = process.env[k]
        acc[k] = v ? `<present, ${v.length} chars>` : '<missing>'
      } else {
        acc[k] = process.env[k]
      }
      return acc
    }, {})

  return new Response(JSON.stringify({
    vercelEnvs,
    hasOidc: !!process.env.VERCEL_OIDC_TOKEN,
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    env: process.env.VERCEL_ENV || 'unknown',
  }, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
  })
}
