#!/usr/bin/env node
// @claude timeout=300
// KRIS iterační tester — volá live API přímo, bez browseru
// Použití: node scripts/kris-test.js davona.cz
// Auth:    KRIS_AUTH_TOKEN env var nebo --token=xxx argument

const url = process.argv[2];
if (!url || url.startsWith('--')) { console.error('Použití: node scripts/kris-test.js <url-eshopu> [--token=xxx]'); process.exit(1); }

const API = 'https://cro-report.vercel.app/api/analyze';
const AUTH_API = 'https://cro-report.vercel.app/api/auth';

// Auth token z env nebo argumentu
function getAuthToken() {
  const tokenArg = process.argv.find(a => a.startsWith('--token='));
  if (tokenArg) return tokenArg.split('=')[1];
  if (process.env.KRIS_AUTH_TOKEN) return process.env.KRIS_AUTH_TOKEN;
  return null;
}

async function authenticateInteractive() {
  const readline = await import('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('Zadej 6-místný TOTP kód: ', async (code) => {
      rl.close();
      try {
        const res = await fetch(AUTH_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code.trim() }),
        });
        const data = await res.json();
        if (data.ok && data.token) {
          console.log(`✅ Auth OK — token platný 24h`);
          console.log(`💡 Pro příště: export KRIS_AUTH_TOKEN="${data.token}"\n`);
          resolve(data.token);
        } else {
          console.error(`❌ Auth failed: ${data.error || 'Neplatný kód'}`);
          process.exit(1);
        }
      } catch (e) {
        console.error('❌ Auth error:', e.message);
        process.exit(1);
      }
    });
  });
}

async function checkClarity(shopUrl) {
  try {
    const fullUrl = shopUrl.startsWith('http') ? shopUrl : `https://${shopUrl}`;
    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CROBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    return html.includes('clarity.ms');
  } catch {
    return false;
  }
}

async function testKris(shopUrl) {
  let authToken = getAuthToken();
  if (!authToken) {
    console.log('⚠️  Žádný auth token — potřebuji TOTP kód\n');
    authToken = await authenticateInteractive();
  }

  console.log(`\n🔍 Testuji: ${shopUrl}\n`);

  const hasClarity = await checkClarity(shopUrl);
  if (!hasClarity) {
    console.log(`⚠️  Clarity tracking nenalezen — doporučení jsou založena na expertní analýze webu, ne na behaviorálních datech\n`);
  }

  const start = Date.now();

  const controller = new AbortController();
  const fetchTimeout = setTimeout(() => controller.abort(), 240000);

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientUrl: shopUrl, reportMode: 'full', withClarity: true, authToken }),
    signal: controller.signal
  });
  clearTimeout(fetchTimeout);

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error(`API error ${res.status}:`, errText);
    if (res.status === 401) console.error('💡 Token vypršel — spusť znovu pro nový TOTP kód');
    process.exit(1);
  }

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
