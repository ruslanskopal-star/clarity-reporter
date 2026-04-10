// Serves individual screenshots from Blob storage (pro zobrazeni v historii reportu)
import { list, get } from '@vercel/blob'
import { verifySessionToken } from '../../lib/auth.js'

export const runtime = 'nodejs'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const authToken = searchParams.get('token')
    const sessionId = searchParams.get('sessionId')
    const slot = searchParams.get('slot')

    if (!verifySessionToken(authToken)) {
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }
    if (!sessionId || !slot || !/^[a-zA-Z0-9]{8,64}$/.test(sessionId) || !/^[a-zA-Z0-9]{1,30}$/.test(slot)) {
      return new Response(JSON.stringify({ error: 'Neplatne ID' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const { blobs } = await list({ prefix: `screenshots/${sessionId}/` })
    const blob = blobs.find(b => b.pathname.endsWith(`/${slot}.jpg`))
    if (!blob) {
      return new Response('Not found', { status: 404 })
    }

    const blobData = await get(blob.url, { access: 'private' })
    if (!blobData || !blobData.stream) {
      return new Response('Blob fetch error', { status: 500 })
    }

    return new Response(blobData.stream, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (e) {
    console.error('[SCREENSHOT] Error:', e.message)
    return new Response('Server error', { status: 500 })
  }
}
