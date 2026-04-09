import { createHmac } from 'crypto'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const TOKEN_MAX_AGE = 24 * 60 * 60 * 1000 // 24h

export function createSessionToken() {
  const secret = (process.env.TOTP_SECRET || '').trim()
  const timestamp = Date.now().toString()
  const signature = createHmac('sha256', secret).update(timestamp).digest('hex')
  return timestamp + '.' + signature
}

export function verifySessionToken(token) {
  if (!token) return false
  const secret = (process.env.TOTP_SECRET || '').trim()
  if (!secret) return false

  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [timestamp, signature] = parts
  const age = Date.now() - parseInt(timestamp)
  if (isNaN(age) || age > TOKEN_MAX_AGE || age < 0) return false

  const expected = createHmac('sha256', secret).update(timestamp).digest('hex')
  return signature === expected
}

// Persistentni rate limiter (Upstash Redis)
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// Max 5 pokusu za 15 minut per IP
const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:auth',
})

// Max 10 analyzí za hodinu per IP
const analyzeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  prefix: 'ratelimit:analyze',
})

export async function checkAuthRateLimit(ip) {
  const { success } = await authLimiter.limit(ip)
  return success
}

export async function checkAnalyzeRateLimit(ip) {
  const { success } = await analyzeLimiter.limit(ip)
  return success
}
