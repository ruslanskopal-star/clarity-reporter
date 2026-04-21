// Test endpoint — overi ze dokazeme pres WIF precist metadata Google Docu.
// Vyzaduje session + GOOGLE_DOC_ID env var. Vraci { title, revisionId } pokud OK.
import { requireSession } from '../../../lib/auth.js'
import { fetchDocMetadata } from '../../../lib/google-docs.js'

export const runtime = 'nodejs'

export async function GET(req) {
  try {
    const session = await requireSession(req)
    if (!session.ok) {
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const docId = process.env.GOOGLE_DOC_ID
    if (!docId) {
      return new Response(JSON.stringify({ error: 'GOOGLE_DOC_ID env var chybi' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const meta = await fetchDocMetadata(docId)
    return new Response(JSON.stringify({ ok: true, doc: meta }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' },
    })
  } catch (e) {
    console.error('[DOCS-TEST] Error:', e.message)
    return new Response(JSON.stringify({ error: 'Docs test failed', detail: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
