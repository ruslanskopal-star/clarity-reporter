// Vraci podepsane URL pro screenshoty (token NIKDY v URL, auth pres cookie)
import { requireSession, createScreenshotSignature } from '../../lib/auth.js'

export const runtime = 'nodejs'

export async function POST(req) {
  try {
    const session = await requireSession(req)
    if (!session.ok) {
      return Response.json({ error: 'Neautorizovany pristup' }, { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { sessionId, slots } = await req.json()

    if (!sessionId || !Array.isArray(slots) || slots.length === 0 || slots.length > 30) {
      return Response.json({ error: 'Neplatny vstup' }, { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (!/^[a-zA-Z0-9]{8,64}$/.test(sessionId)) {
      return Response.json({ error: 'Neplatne sessionId' }, { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const urls = {}
    for (const slot of slots) {
      if (!/^[a-zA-Z0-9_-]{1,30}$/.test(slot)) continue
      const { sig, expires } = createScreenshotSignature(sessionId, slot)
      urls[slot] = '/api/screenshot?sessionId=' + encodeURIComponent(sessionId) + '&slot=' + encodeURIComponent(slot) + '&sig=' + encodeURIComponent(sig) + '&expires=' + encodeURIComponent(expires)
    }

    return Response.json({ ok: true, urls }, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store' } })
  } catch (e) {
    console.error('[SCREENSHOT-URLS] Error:', e.message)
    return Response.json({ error: 'Chyba serveru' }, { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
