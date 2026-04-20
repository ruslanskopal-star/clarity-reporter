// Upload jednoho screenshotu do Blob storage (auth pres HttpOnly cookie)
import { put, del } from '@vercel/blob'
import { requireSession, checkUploadRateLimit, incrementSessionSlots } from '../../lib/auth.js'

export const runtime = 'nodejs'
export const maxDuration = 30

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024
const MAX_BASE64_LENGTH = Math.ceil(MAX_SCREENSHOT_BYTES * 4 / 3) + 4

function isImageBuffer(buf) {
  if (!buf || buf.length < 4) return false
  if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return true
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return true
  if (buf.length >= 12 && buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return true
  return false
}

export async function POST(req) {
  try {
    const session = await requireSession(req)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!session.ok) {
      console.warn(`[UPLOAD-SCREENSHOT] UNAUTHORIZED ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    if (!await checkUploadRateLimit(ip)) {
      console.warn(`[UPLOAD-SCREENSHOT] RATE LIMITED ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Prilis mnoho uploadu, zkuste pozdeji' }), { status: 429, headers: { 'Content-Type': 'application/json' } })
    }

    const { sessionId, slotId, base64 } = await req.json()

    if (!sessionId || !slotId || !base64 || typeof base64 !== 'string') {
      return new Response(JSON.stringify({ error: 'Chybi data' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (!/^[a-zA-Z0-9]{8,64}$/.test(sessionId) || !/^[a-zA-Z0-9]{1,30}$/.test(slotId)) {
      return new Response(JSON.stringify({ error: 'Neplatne ID' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (base64.length > MAX_BASE64_LENGTH) {
      return new Response(JSON.stringify({ error: 'Screenshot prilis velky (max 5MB)' }), { status: 413, headers: { 'Content-Type': 'application/json' } })
    }

    const buffer = Buffer.from(base64, 'base64')
    if (buffer.length > MAX_SCREENSHOT_BYTES) {
      return new Response(JSON.stringify({ error: 'Screenshot prilis velky (max 5MB)' }), { status: 413, headers: { 'Content-Type': 'application/json' } })
    }

    if (!isImageBuffer(buffer)) {
      return new Response(JSON.stringify({ error: 'Soubor neni obrazek (JPEG/PNG/WebP)' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (!await incrementSessionSlots(sessionId)) {
      console.warn(`[UPLOAD-SCREENSHOT] SLOT LIMIT ip=${ip} session=${sessionId}`)
      return new Response(JSON.stringify({ error: 'Limit screenshotu pro tuto session dosazen' }), { status: 429, headers: { 'Content-Type': 'application/json' } })
    }

    const filename = `screenshots/${sessionId}/${slotId}.jpg`
    await put(filename, buffer, { access: 'private', contentType: 'image/jpeg', allowOverwrite: true })

    console.log(`[UPLOAD-SCREENSHOT] OK ip=${ip} session=${sessionId} slot=${slotId} size=${buffer.length}`)
    return new Response(JSON.stringify({ ok: true, slotId }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('[UPLOAD-SCREENSHOT] Error:', e.message)
    return new Response(JSON.stringify({ error: 'Chyba pri nahravani' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

// DELETE — smaze screenshot
export async function DELETE(req) {
  try {
    const session = await requireSession(req)
    if (!session.ok) {
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')
    const slotId = searchParams.get('slotId')

    if (!sessionId || !slotId || !/^[a-zA-Z0-9]{8,64}$/.test(sessionId) || !/^[a-zA-Z0-9]{1,30}$/.test(slotId)) {
      return new Response(JSON.stringify({ error: 'Neplatne ID' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const filename = `screenshots/${sessionId}/${slotId}.jpg`
    try { await del(filename) } catch {}

    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('[UPLOAD-SCREENSHOT] Delete error:', e.message)
    return new Response(JSON.stringify({ error: 'Chyba pri mazani' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
