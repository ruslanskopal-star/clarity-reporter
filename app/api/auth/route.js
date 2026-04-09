import { TOTP } from 'otpauth'

export const runtime = 'nodejs'

export async function POST(req) {
  try {
    const { code } = await req.json()
    if (!code) {
      return new Response(JSON.stringify({ error: 'Chybi kod' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const secret = process.env.TOTP_SECRET
    if (!secret) {
      return new Response(JSON.stringify({ error: 'TOTP neni nakonfigurovany' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const totp = new TOTP({ secret, algorithm: 'SHA1', digits: 6, period: 30 })
    const valid = totp.validate({ token: code, window: 1 }) !== null

    if (!valid) {
      return new Response(JSON.stringify({ ok: false, error: 'Neplatny kod' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    // Vygeneruj session token (platny 24h)
    const sessionToken = Buffer.from(secret + ':' + Date.now()).toString('base64')
    return new Response(JSON.stringify({ ok: true, token: sessionToken }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
