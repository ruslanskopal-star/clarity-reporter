import { TOTP, Secret } from 'otpauth'
import { cookies } from 'next/headers'
import {
  createSession,
  destroySession,
  verifySession,
  hashUA,
  checkAuthRateLimit,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTS,
} from '../../lib/auth.js'

export const runtime = 'nodejs'

// POST — overi TOTP kod, vytvori session, nastavi HttpOnly cookie
export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (!await checkAuthRateLimit(ip)) {
      console.warn(`[AUTH] RATE LIMITED ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Prilis mnoho pokusu, zkuste za 15 minut' }), { status: 429, headers: { 'Content-Type': 'application/json' } })
    }

    const { code } = await req.json()
    if (!code || typeof code !== 'string' || !/^\d{6}$/.test(code)) {
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
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const uaHash = hashUA(req.headers.get('user-agent'))
    const token = await createSession(uaHash)
    cookies().set(SESSION_COOKIE, token, SESSION_COOKIE_OPTS)

    console.log(`[AUTH] OK ip=${ip}`)
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('[AUTH] Error:', e.message)
    return new Response(JSON.stringify({ error: 'Chyba serveru' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

// GET — overi ze klient ma platnou session (bez vystaveni tokenu)
export async function GET(req) {
  try {
    const store = cookies()
    const token = store.get(SESSION_COOKIE)?.value
    if (!token) return new Response(JSON.stringify({ authenticated: false }), { headers: { 'Content-Type': 'application/json' } })

    const uaHash = hashUA(req.headers.get('user-agent'))
    const ok = await verifySession(token, uaHash)
    if (!ok) {
      store.set(SESSION_COOKIE, '', { ...SESSION_COOKIE_OPTS, maxAge: 0 })
      return new Response(JSON.stringify({ authenticated: false }), { headers: { 'Content-Type': 'application/json' } })
    }
    return new Response(JSON.stringify({ authenticated: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('[AUTH] Check error:', e.message)
    return new Response(JSON.stringify({ authenticated: false }), { headers: { 'Content-Type': 'application/json' } })
  }
}

// DELETE — odhlaseni, smazani session z Redisu + cookie
export async function DELETE() {
  try {
    const store = cookies()
    const token = store.get(SESSION_COOKIE)?.value
    if (token) await destroySession(token)
    store.set(SESSION_COOKIE, '', { ...SESSION_COOKIE_OPTS, maxAge: 0 })
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('[AUTH] Logout error:', e.message)
    return new Response(JSON.stringify({ error: 'Chyba serveru' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
