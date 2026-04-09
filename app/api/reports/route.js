// API pro ukládání a čtení CRO reportů (Vercel Blob storage)
import { put, list, del } from '@vercel/blob'
import { verifySessionToken } from '../../lib/auth.js'

export const runtime = 'nodejs'

// POST — uloží nový report
export async function POST(req) {
  try {
    const { url, analysis, mode, score, withClarity, seconds, authToken } = await req.json()

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!verifySessionToken(authToken)) {
      console.warn(`[REPORTS] UNAUTHORIZED POST ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    if (!url || !analysis) {
      return new Response(JSON.stringify({ error: 'Chybí url nebo analysis' }), { status: 400 })
    }

    const hostname = url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
    const id = Date.now()
    const filename = `reports/${hostname}/${id}.json`

    const data = {
      id,
      url,
      hostname,
      analysis,
      mode: mode || 'full',
      score: score || null,
      withClarity: withClarity || false,
      seconds: seconds || null,
      date: new Date().toISOString(),
    }

    const blob = await put(filename, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json',
    })

    return new Response(JSON.stringify({ ok: true, id, blobUrl: blob.url }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('Report save error:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

// GET — seznam reportů (volitelně ?hostname=eppi.cz)
export async function GET(req) {
  try {
    // Auth z query stringu nebo headeru
    const { searchParams } = new URL(req.url)
    const authToken = searchParams.get('token') || req.headers.get('authorization')?.replace('Bearer ', '')
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (!verifySessionToken(authToken)) {
      console.warn(`[REPORTS] UNAUTHORIZED GET ip=${ip}`)
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const hostname = searchParams.get('hostname')
    console.log(`[REPORTS] GET ip=${ip} hostname=${hostname || 'all'}`)
    const prefix = hostname ? `reports/${hostname}/` : 'reports/'

    const { blobs } = await list({ prefix })

    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0, 50)

    const reports = await Promise.all(
      sorted.map(async (blob) => {
        try {
          const res = await fetch(blob.url)
          return await res.json()
        } catch {
          return null
        }
      })
    )

    return new Response(JSON.stringify(reports.filter(Boolean)), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('Report list error:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

// DELETE — smazání reportu
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const authToken = searchParams.get('token') || req.headers.get('authorization')?.replace('Bearer ', '')

    if (!verifySessionToken(authToken)) {
      return new Response(JSON.stringify({ error: 'Neautorizovany pristup' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const blobUrl = searchParams.get('blobUrl')
    if (!blobUrl) {
      return new Response(JSON.stringify({ error: 'Chybi blobUrl' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    await del(blobUrl)
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error('Report delete error:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
