import { TOTP, Secret } from 'otpauth'
import { createSessionToken, checkRateLimit } from '../../lib/auth.js'

export const runtime = 'nodejs'

export async function POST(req) {
  try {
    // Rate limit per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip)) {
      console.warn(`[AUTH] RATE LIMITED ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Prilis mnoho pokusu, zkuste za 15 minut' }), { status: 429, headers: { 'Content-Type': 'application/json' } })
    }

    const { code } = await req.json()
    if (!code) {
      return new Response(JSON.stringify({ error: 'Chybi kod' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const secret = (process.env.TOTP_SECRET || '').trim()
    if (!secret) {
      return new Response(JSON.stringify({ error: 'TOTP neni nakonfigurovany' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const totp = new TOTP({ issuer: 'ESHOP BOOSTER', label: 'CRO Report', secret: Secret.fromBase32(secret), algorithm: 'SHA1', digits: 6, period: 30 })
    const valid = totp.validate({ token: code, window: 1 }) !== null

    if (!valid) {
      console.warn(`[AUTH] FAILED ip=${ip}`)
      return new Response(JSON.stringify({ ok: false, error: 'Neplatny kod' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    console.log(`[AUTH] OK ip=${ip}`)
    const sessionToken = createSessionToken()
    return new Response(JSON.stringify({ ok: true, token: sessionToken }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
