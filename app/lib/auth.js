import { createHmac, timingSafeEqual, randomBytes, createHash } from 'crypto'
import { cookies } from 'next/headers'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

export const SESSION_COOKIE = 'cro_session'
const SESSION_TTL_SECONDS = 24 * 60 * 60 // 24h

export const SESSION_COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: SESSION_TTL_SECONDS,
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// UA binding — hash User-Agent, omezi krádež cookie na jiny browser
export function hashUA(userAgent) {
  return createHash('sha256').update(String(userAgent || '')).digest('hex').slice(0, 32)
}

function sessionKey(token) {
  return `session:${token}`
}

function isValidTokenShape(token) {
  return typeof token === 'string' && token.length >= 32 && token.length <= 100 && /^[A-Za-z0-9_-]+$/.test(token)
}

// Vytvori novou session — random 32B token, v Redisu { ua, iat } s TTL 24h
export async function createSession(uaHash) {
  const token = randomBytes(32).toString('base64url')
  const payload = JSON.stringify({ ua: uaHash, iat: Date.now() })
  await redis.set(sessionKey(token), payload, { ex: SESSION_TTL_SECONDS })
  return token
}

// Overi session z Redisu + UA binding
export async function verifySession(token, uaHash) {
  if (!isValidTokenShape(token)) return false
  const raw = await redis.get(sessionKey(token))
  if (!raw) return false
  let data
  try {
    data = typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return false
  }
  if (!data || data.ua !== uaHash) return false
  return true
}

export async function destroySession(token) {
  if (!isValidTokenShape(token)) return
  try { await redis.del(sessionKey(token)) } catch {}
}

// Helper pro route handlers — precte cookie, overi session s UA bindingem
export async function requireSession(req) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value
    if (!token) return { ok: false }
    const uaHash = hashUA(req.headers.get('user-agent'))
    const ok = await verifySession(token, uaHash)
    return ok ? { ok: true, token } : { ok: false }
  } catch {
    return { ok: false }
  }
}

// Persistentni rate limiter (Upstash Redis)
const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:auth',
})

const analyzeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  prefix: 'ratelimit:analyze',
})

const uploadLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(200, '1 h'),
  prefix: 'ratelimit:upload',
})

export async function checkAuthRateLimit(ip) {
  const { success } = await authLimiter.limit(ip)
  return success
}

export async function checkAnalyzeRateLimit(ip) {
  const { success } = await analyzeLimiter.limit(ip)
  return success
}

export async function checkUploadRateLimit(ip) {
  const { success } = await uploadLimiter.limit(ip)
  return success
}

export async function incrementSessionSlots(sessionId) {
  const key = `session:slots:${sessionId}`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, 7200)
  return count <= 30
}

// Signed screenshot URLs (15 min TTL) — sig je HMAC nezavisly na session tokenu
const SCREENSHOT_URL_TTL = 15 * 60 * 1000

export function createScreenshotSignature(sessionId, slot) {
  const secret = (process.env.TOTP_SECRET || '').trim()
  const expires = (Date.now() + SCREENSHOT_URL_TTL).toString()
  const payload = `${sessionId}:${slot}:${expires}`
  const sig = createHmac('sha256', secret).update(payload).digest('hex')
  return { sig, expires }
}

export function verifyScreenshotSignature(sessionId, slot, sig, expires) {
  if (!sessionId || !slot || !sig || !expires) return false
  const secret = (process.env.TOTP_SECRET || '').trim()
  if (!secret) return false

  const expiresNum = parseInt(expires)
  if (isNaN(expiresNum) || Date.now() > expiresNum) return false

  const payload = `${sessionId}:${slot}:${expires}`
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  if (sig.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))
}
