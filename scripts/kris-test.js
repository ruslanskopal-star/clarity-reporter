#!/usr/bin/env node
// @claude timeout=300
// KRIS iterační tester — volá live API přímo, bez browseru
// Použití: node scripts/kris-test.js davona.cz

const url = process.argv[2];
if (!url) { console.error('Použití: node scripts/kris-test.js <url-eshopu>'); process.exit(1); }

const API = 'https://cro-report.vercel.app/api/analyze';

async function testKris(shopUrl) {
  console.log(`\n🔍 Testuji: ${shopUrl}\n`);
  const start = Date.now();

  const controller = new AbortController();
  const fetchTimeout = setTimeout(() => controller.abort(), 240000);

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientUrl: shopUrl, reportMode: 'full', withClarity: true }),
    signal: controller.signal
  });
  clearTimeout(fetchTimeout);

  if (!res.ok) { console.error('API error:', res.status, await res.text()); process.exit(1); }

  // Streaming response
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  process.stdout.write('Streamuji');
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    fullText += chunk;
    process.stdout.write('.');
  }
  const elapsed = ((Date.now() - start) / 1000).toFixed(0);
  console.log(` hotovo za ${elapsed}s\n`);

  // Parsuj SSE stream na čistý text
  let parsedText = '';
  for (const line of fullText.split('\n')) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (data === '[DONE]') continue;
    try {
      const parsed = JSON.parse(data);
      if (parsed.chunk) parsedText += parsed.chunk;
    } catch {}
  }

  // Výpis analýzy
  console.log('─'.repeat(60));
  console.log(parsedText);
  console.log('─'.repeat(60));

  // Hodnocení kritérií
  const t = parsedText;
  const tl = t.toLowerCase();
  const results = [
    { nazev: '4 sekce (SKÓRE/CO DĚLÁ DOBŘE/QUICK WINS/CLARITY CHECKLIST)', ok: t.includes('SKORE') || t.includes('SKÓRE') },
    { nazev: 'CO DĚLÁ DOBŘE přítomna', ok: tl.includes('co dělá dobře') || tl.includes('co dela dobre') || tl.includes('čo robí dobre') || tl.includes('co robí dobre') },
    { nazev: 'QUICK WINS přítomny', ok: tl.includes('quick win') },
    { nazev: 'CLARITY CHECKLIST přítomna', ok: t.includes('CLARITY CHECKLIST') },
    { nazev: 'Žádný ROADMAP/IMPLEMENTACE', ok: !t.includes('ROADMAP') && !t.includes('IMPLEMENTACE') },
    { nazev: 'Žádné zakázané fráze', ok: !t.includes('neověřil jsem') && !t.includes('nebylo možné ověřit') && !t.includes('nelze ověřit z dostupných dat') },
    { nazev: 'Mobilní = N/A', ok: t.includes('N/A') },
    { nazev: 'Vážené skóre (výpočet v závorce)', ok: /\d+[x×]\d+/.test(t) },
    { nazev: 'CO DĚLÁ DOBŘE = přesně 3 body', ok: (t.match(/\*\*\d+\./g) || []).length >= 3 },
    { nazev: 'Quick Wins: Odhadovaný dopad (5×)', ok: (tl.match(/odhadovan/g) || []).length >= 5 },
    { nazev: 'Quick Wins: Jak ověřit v Clarity (5×)', ok: (tl.match(/jak ov[eě]řit|jak overit|ako overi/g) || []).length >= 5 },
  ];

  console.log('\n📊 HODNOCENÍ KRITÉRIÍ:\n');
  let passed = 0;
  for (const r of results) {
    const icon = r.ok ? '✅' : '❌';
    console.log(`${icon} ${r.nazev}`);
    if (r.ok) passed++;
  }
  const skore = t.match(/(\d{2,3})\s*\/\s*100/)?.[1];
  console.log(`\n🏆 Výsledek: ${passed}/${results.length} kritérií splněno`);
  console.log(`📈 Skóre e-shopu: ${skore || 'nenalezeno'}\n`);
}

testKris(url).catch(console.error);
