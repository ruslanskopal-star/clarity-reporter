// Denní email souhrn KRIS analýz — spouští se každý den v 8:00 UTC přes Vercel Cron
// Konfigurováno v vercel.json: { "crons": [{ "path": "/api/cron/daily-report", "schedule": "0 8 * * *" }] }
// Vyžaduje: RESEND_API_KEY a KRIS_REPORT_EMAIL v env proměnných

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
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY nebo KRIS_REPORT_EMAIL neni nastaven' }), { status: 500 })
  }

  const today = new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })

  // TODO: načíst výsledky analýz z předchozího dne (z DB nebo logu)
  // Prozatím šablona souhrnu
  const html = `
    <h2>KRIS Denní souhrn — ${today}</h2>
    <h3>📊 Analýzy předchozího dne</h3>
    <p><em>Data se načítají z logu analýz — implementovat napojení na storage.</em></p>
    <h3>⚠️ Konflikty ve znalostní bázi</h3>
    <p><em>Žádné nové konflikty.</em></p>
    <h3>🔄 Stav systému</h3>
    <ul>
      <li>route.js: route_v6_edge_v24</li>
      <li>Clarity API: aktivní</li>
      <li>Vercel: online</li>
    </ul>
  `

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'KRIS <onboarding@resend.dev>',
      to: [toEmail],
      subject: `KRIS Denní souhrn — ${today}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: err }), { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true, sent: today }))
}
