// Test endpoint — overi ze WIF token exchange funguje a vraci seznam tabu ze sheetu.
// Vyzaduje prihlaseni (cookie session) a GOOGLE_SHEET_ID env var na Vercelu.
import { requireSession } from '../../../lib/auth.js'
import { fetchSheetMetadata } from '../../../lib/google-sheets.js'

export const runtime = 'nodejs'

export async function GET(req) {
  try {
    const session = await requireSession(req)
    if (!session.ok) {
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const sheetId = process.env.GOOGLE_SHEET_ID
    if (!sheetId) {
      return new Response(JSON.stringify({ error: 'GOOGLE_SHEET_ID env var chybi' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const meta = await fetchSheetMetadata(sheetId)
    return new Response(JSON.stringify({ ok: true, tabs: meta.sheets }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
    })
  } catch (e) {
    console.error('[SHEETS-TEST] Error:', e.message)
    return new Response(JSON.stringify({ error: 'WIF test failed', detail: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
