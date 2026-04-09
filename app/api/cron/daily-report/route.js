// Denní email souhrn KRIS analýz — spouští se každý den v 8:00 UTC přes Vercel Cron
// Konfigurováno v vercel.json: { "crons": [{ "path": "/api/cron/daily-report", "schedule": "0 8 * * *" }] }
// Vyžaduje: RESEND_API_KEY, KRIS_REPORT_EMAIL, BLOB_READ_WRITE_TOKEN v env proměnných

import { list, get } from '@vercel/blob'

export const runtime = 'nodejs'

const RESEND_API = 'https://api.resend.com/emails'

export async function GET(req) {
  // Vercel Cron ověřuje přes CRON_SECRET header
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.KRIS_REPORT_EMAIL
  if (!resendKey || !toEmail) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY nebo KRIS_REPORT_EMAIL neni nastaven' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  const today = new Date()
  const todayStr = today.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  // Načíst reporty z Blob — posledních 24h
  let recentReports = []
  try {
    const { blobs } = await list({ prefix: 'reports/' })
    const recent = blobs.filter(b => new Date(b.uploadedAt) >= yesterday)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

    for (const blob of recent.slice(0, 20)) {
      try {
        const blobData = await get(blob.url)
        const text = await blobData.text()
        const report = JSON.parse(text)
        recentReports.push(report)
      } catch {}
    }
  } catch (e) {
    console.error('[CRON] Blob list error:', e.message)
  }

  // Sestavit email
  let analysesHtml = ''
  if (recentReports.length === 0) {
    analysesHtml = '<p style="color:#888;">Žádné analýzy za posledních 24 hodin.</p>'
  } else {
    analysesHtml = '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">'
    analysesHtml += '<tr style="border-bottom:2px solid #FF6B00;"><th style="text-align:left;padding:8px;">Web</th><th style="text-align:left;padding:8px;">Čas</th><th style="text-align:right;padding:8px;">Doba (s)</th><th style="text-align:center;padding:8px;">Clarity</th></tr>'
    for (const r of recentReports) {
      const date = new Date(r.date).toLocaleString('cs-CZ', { hour: '2-digit', minute: '2-digit' })
      const scoreMatch = r.analysis?.match(/(\d{2,3})\s*\/\s*100/)
      const score = scoreMatch ? scoreMatch[1] + '/100' : '—'
      analysesHtml += `<tr style="border-bottom:1px solid #eee;">
        <td style="padding:8px;font-weight:bold;">${r.hostname || r.url}</td>
        <td style="padding:8px;color:#666;">${date}</td>
        <td style="padding:8px;text-align:right;">${r.seconds || '—'}s</td>
        <td style="padding:8px;text-align:center;">${r.withClarity ? '✅' : '—'}</td>
      </tr>`
    }
    analysesHtml += '</table>'
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#111;padding:16px 24px;border-radius:8px 8px 0 0;">
        <span style="color:white;font-weight:900;font-size:18px;">ESH</span><span style="color:#FF6B00;font-weight:900;font-size:18px;">O</span><span style="color:white;font-weight:900;font-size:18px;">P BOOSTER</span>
        <span style="color:#FF6B00;font-size:13px;margin-left:12px;">Denní souhrn</span>
      </div>
      <div style="padding:24px;border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;">
        <h2 style="margin-top:0;color:#333;">${todayStr}</h2>
        <h3 style="color:#FF6B00;margin-bottom:8px;">Analýzy za posledních 24h (${recentReports.length})</h3>
        ${analysesHtml}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
        <p style="color:#999;font-size:12px;margin:0;">ESHOP BOOSTER CRO Report • Automatický denní souhrn</p>
      </div>
    </div>
  `

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ESHOP BOOSTER <onboarding@resend.dev>',
      to: [toEmail],
      subject: `CRO Report — ${recentReports.length} analýz — ${todayStr}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[CRON] Resend error:', err)
    return new Response(JSON.stringify({ error: 'Chyba pri odesilani emailu' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  console.log(`[CRON] Daily report sent: ${recentReports.length} analyses, to=${toEmail}`)
  return new Response(JSON.stringify({ ok: true, sent: todayStr, reports: recentReports.length }), { headers: { 'Content-Type': 'application/json' } })
}
