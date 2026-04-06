// route_v6_edge_v23.js
// Zmeny oproti v22:
// 1. Clarity API realna data (numOfDays=3, mobile+desktop breakdown)
// 2. Multi-page crawl: homepage + kosik + kategorie + detail produktu
// 3. Dva rezimy: "quick" (top 10 priorit) a "full" (sekcni analyza po typech stranek)
// 4. Tri vrstvy doporuceni: [CRO PRINCIP] + [SEGMENT] + [CLARITY DATA]
// 5. Impact (1-5) vs Narocnost (1-5) matice ke kazdemu doporuceni
// 6. Sekce 📱 MOBIL a 🖥️ DESKTOP zvlast v Clarity kontextu

export const runtime = 'edge'

const KRIS_KNOWLEDGE_BASE = `
# KRIS ZNALOSTNI BAZE v9

## KRITICKE PRAVIDLO VYSTUPU
NIKDY nepouzivej tyto ZAKAZANE FRAZE: "neoveril jsem", "doporucuji overit", "bez pristupu k rozhrani nelze", "nebylo mozne overit", "nelze overit z dostupnych dat", "na zaklade meta dat nelze". Pokud nemas prima data, formuluj VZDY jako hypotezu s dopadem: "Pravdepodobne [problem] — pokud ano, dopad je [X]%. Jak overit v Clarity: [konkretni krok]."

## GOOGLE SKORE KVALITY VSTUPNI STRANKY
- Hodnota 1-99, neni verejne dostupna, jina pro hlavni domenu a dilci URL
- Ovlivnuje: pozice ve vyhledavani, cenu prokliku v reklame, zobrazeni v AI Overview
- Co Google hodnoti: unikatni obsah, citelnost, medialni obsah, touch zony, interni prolinkovani, duveryhodnost
- AI obsah penalizace: od 01/2026 vice nez 60 % AI nebo generickeho obsahu = postih
- Vlastni autenticky obsah ma vzdy prednost pred AI generovanym

## DUVERYHODNOSTNI MATICE (ERA AI od 09/2025)
Prvky s nejvyssim dopadem (serazene):
1. Autenticky vlastni obsah (ne AI balast, ne kopie od dodavatele)
2. Osobni kontakt s fotografii (jmeno, mobilni cislo, cas dostupnosti)
3. Signature prvky znacky (unikatni vizualni prvky)
4. Vlastni fotografie a videa (ne stockove)
5. Authority rank (lide v projektu viditelni)
6. Pribeh znacky a stranka O nas (autenticky, ne genericky)
7. Recenze s hodnocenim (min. 50, optimum 4,2-4,7 hvezdicky)
8. Certifikace, platebni metody, moznosti dopravy
9. Unikatni textace (ne genericke kopie od dodavatele)
10. FAQ s schema markup

## SCHEMA.ORG STRUCTURED DATA
- Product schema: name, price, availability, rating, description
- FAQ schema: zobrazeni v Google rich snippetech a AI Overview
- Organization schema: name, url, logo, contactPoint, sameAs
- BreadcrumbList schema: lepsi navigace ve vyhledavani
- VideoObject schema: videa indexovatelna Googlem, zvysuje CTR z vyhledavani - POUZIJ kdyz e-shop ma vlastni videa produktu
- LocalBusiness schema pri kamenne prodejne
- Person schema pro konkretni lidi (zakladatele, testery, odbornici)

## SOCIAL PROOF BADGES (vizualni odznaky)
- "Otestováno námi" badge: silny diferenciator pro niche e-shopy s vlastnim testovanim
- "Bestseller" badge: na top 3-5 produktech v kategorii, zvysuje CTR ve vypisu
- "Doporučujeme" badge: editorialni vyber, buduje autoritu
- "Nové" badge: modra barva, u produktu novejsich nez 30 dni
- "Sleva X %" badge: cervena, vzdy s preskrtnutou cenou
- "Posledni kusy" badge: urgency bez dark pattern, jen pokud je realita
- Badges implementovat jako CSS overlay na fotografii produktu

## MICROSOFT CLARITY
- Bezplatny nastroj, instalace do 30 minut pres Google Tag Manager
- Click heatmapy, scroll depth, rage clicks, session recordings
- Konverzni trychtyr: Homepage, Kategorie, Produkt, Kosik, Objednavka, Dekujeme
- Filtr "navstivil kosik ale nenakoupil" = nejcennejsi segment pro analyzu
- Po 7 dnech: heatmapy homepage, nejnavstevovanejsi kategorie, detail nejprodavanejsiho produktu

## DESIGN A PRISTUPNOST
- Pismo nikdy mensi nez 13px (Google postih). Hlavni obsah: 15-17px
- Kontrastni pomer textu: minimalne 4,5:1
- iPhone: pole vyhledavani minimalne 16px jinak automaticke priblizeni rozbije layout
- Touch zony: 7x7 mm s 2mm rozestupy (EU zakon od cervna 2025)
- Seda barva pro aktivni prvky = chyba
- Konverzni barva: nejvyraznejsi, pouzivana POUZE pro konverzni prvky

## HEADER
- Mobilni telefonni cislo v hlavicce: lide vi ze volaji zdarma (lepsi konverze nez pevna linka)
- Uvest dny a casy pro volani, idealne fotografie clena tymu vedle cisla
- Vyhledavani: kdyz vede ke konverzi, musi byt IHNED viditelne (ne jen ikona lupy)
- Naseptavac: zakaznici kteri vyhledavaji konvertuji 2-3x lepe
- Stav "nic nenalezeno": nikdy prazdny, nabidni alternativu nebo kontakt
- Menu na mobilu: ikona 3 linek I TEXT "MENU", nikdy seda barva

## HOMEPAGE
- Staticke hero s JEDNOU nabidkou a JEDNOU vyzvou k akci > slider
- Slider: kazdy banner musi mit jednoznacnou nabidku a TLACITKO
- USP lista: na KAZDE vstupni strance (homepage, kategorie, produkt, kontakt)
- Pop-up: nikdy pri prvni navsteve na mobilu (postih Google)

## KATEGORIE
- Popis kategorie: max 3-5 vet, ne dlouhy SEO text
- Filtrace s vizualnimi prvky (barevne ctverecky, ikony, vizualni vyber)
- Razeni: Nejprodavanejsi, Nejlevnejsi, Nejdrazsi, Nejnovejsi (odebrat "Abecedne")
- Vypis: velka fotografie, hodnoceni zlatou barvou s poctem, barevna skladovost
- Pokud kategorie ma hodne produktu: pop-up s vyzkou k filtrovani zvysuje konverze

## DETAIL PRODUKTU
- Velka fotografie ma primy vliv na konverzi (75 % zakazniku = fotky klicove)
- Min 3-5 fotek: zepredу, zezadu, detail, idealne v prostori nebo na modelce
- Video zvysuje konverze az o 80 % - vlozit PRIMO na stranku, ne jen na YouTube
- VideoObject schema markup ke kazdemu videu na produktove strance
- NIKDY zalozky pro deleni obsahu (Google ignoruje skryty obsah)
- Misto zalozek: rozcestnik na strance + fixni lista (foto, cena, skladovost, CTA)
- Zobrazit datum doruceni u kazde moznosti dopravy (ne jen "1-2 dny")
- "Pro koho se hodi" a "Pro koho se nehodi": snizuje vraceni zbozi, pomaha rozhodovani
  - Funguje v KAZDE kategorii: kosmetika (typ pleti), sport (uroven/pozice), nabytek (styl/prostor)
  - Format: "Tato pomucka je idealni pro: [konkretni popis zakaznika]"
- Ikony vlastnosti produktu (Vegan, Bez parabenů, Skladem, Ceska vyroba...) berou vice pozornosti nez text

## KOSARIK A OBJEDNAVKOVY PROCES
- Upsell v kosiku: 3-5 levnych produktu relevantních k objednavce
- Slevovy kod: schovat za checkbox, otevrene pole laka k odchodu na agregatory
- Checkout od kroku 2: bez menu, bez vyhledavani, jen logo a telefon
- Paticka v checkoutu: jen Obchodni podminky, Ochrana udaju, Kontakt
- Datum doruceni u kazde moznosti dopravy
- Progress bar "do dopravy zdarma zbývá X Kč": zvysuje prumernou hodnotu objednavky o 10-20 %
- BNPL (Twisto, Splitty, Alma, Klarna): u produktu nad 1 000 Kc zvysuje konverze o 15-30 %
- BNPL zobrazit jako mesicni splatku primo u ceny na detailu produktu
- Apple Pay a Google Pay na mobilu: dramaticky snizuji friction

## FOOTER
- Copyright: zobrazit roky fungování (napr. "2012-2026") ne jen aktualni rok
- Loga platebních metod a dopravcu = trust signal
- Osobni kontakt s fotografii v paticce

## EMAILOVY MARKETING
- Opusteny kosik: serie 3 emailu (1h, 24h, 72h) = prumerna konverze 5-15 %
- Personalizace predmetu = open rate o 26 % vyssi
- Kategorie-specificke tipy pro serie emailu:
  - Moda: do druheho emailu vlozit fotografii produktu na modelce (jiny pohled)
  - Kosmetika: do druheho emailu vlozit video aplikace nebo recenzi s fotkou
  - Elektronika: do druheho emailu vlozit srovnani s konkurencnim produktem
  - Nabytek: do druheho emailu vlozit fotografii produktu v interieru zakaznika
  - Sport/niche: do druheho emailu vlozit odkaz na testovaci video produktu

## RECENZE A SOCIALNI DUKAZ
- 92 % zakazniku cte recenze pred nakupem
- Optimum: 4,2-4,7 hvezdicky, min 50 recenzi, zlatou barvou s poctem
- Recenze s fotkami konvertuji 2x lepe nez textove
- Automaticky email 7 dni po doruceni s vyzkou k recenzi

## HEUREKA A SROVNAVACE
- Heureka a Zbozi.cz: srovnavace jsou zdrojem navstevnosti, ale i nebezpecim odchodu
- Heureka recenze jsou validni zdroj social proof - importovat na produktove stranky
- Heureka certifikat Overeno zakazniky = silny trust signal pro nezname e-shopy
- Zbozi.cz feed: aktualizovat min. 1x denne, spravna cena a skladovost = vice prokliků
- Zakaznik odchazi na srovnavac pro overeni ceny - reaguj: cena za proklik u vas musi byt konkurencni

## SPECIFICKE ZNALOSTI DLE KATEGORIE

### KOSMETIKA A DROGERIE
- Popis produktu: pro koho je, hlavni prinos, jak pouzivat, s cim kombinovat
- "Pro koho se hodi / nehodi" = snizuje vraceni zbozi
- Vizualni ikony vlastnosti: Vegan, Bez parabenů, Pro suchou plet, Dermatologicky testovano
- Swatche barev u make-upu ve vypisu i na detailu
- FAQ na produktu: Jak dlouho vydrzi, Lze kombinovat s X, Vhodny pro tehotne
- Vzorky jako upsell v kosiku
- Sezonnnost: jaro (cistici rutiny), leto (SPF), podzim (hydratace), zima (vyziva)

### MODA A OBLECENI
- Fotografie jsou primarni konverzni nastroj: min 4 fotky (zepredу, zezadu, detail, na modelce)
- Velikostni tabulka na kazdem produktu = snizuje vraceni o 20-30 %
- Look-book a styling inspirace = zvysuje prumerne hodnoty objednavky
- Hover efekt: druha fotografie (pohled zezadu nebo jine obleceni)
- Filtrace: barva (vizualni ctverecky), velikost, material, styl, prilezitost
- Vraceni a reklamace: u mody prominentne zobrazit

### ELEKTRONIKA A TECHNIKA
- Technicke parametry: povinne, prehledne ve tabulce
- Srovnani variant (tabulka): pomaha pri rozhodovani mezi modely
- BNPL: u produktu nad 2 000 Kc silny konverzni nastroj
- Video recenze a unboxing: konverze az o 80 %
- Kompatibilita: jasne uvest s jakymi zarizeni produkt funguje
- Technicka podpora: chat nebo telefon primo na produktove strance

### NABYTEK A INTERIERY
- Rozmery: vzdy jasne, idealne s nakresom nebo naznacenou lidskou silhuetou pro meritko
- Rozmerovy diagram = KRITICKA priorita (30-40 % opusteni bez neho)
- Dodaci lhuta: v nabytku KRITICKA informace (tyden vs. 8 tydnu je zasadni)
- AR vizualizace "jak by to vypadalo u me doma" = aktualne nejvetsi diferenciator v online prodeji nabytku
- Materialy: detailni popis + fotografie detailu textury (latka, drevo, kov)
- Konfigurator: vyber barvy, materialu, rozmeru primo na strance
- Recenze s fotkami zakazniku (nabytek v jejich domacnosti) = nejcennejsi trust signal
- Doplnkova nabidka v kosiku: polstare, prehozky, cistici prostredky

### SPORT A NICHE E-SHOPY
- Niche zakaznik je informovany odbornik - neduveri obecnym popisum od vyrobcu
- Vlastni testovani produktu s videi = nejsilnejsi diferenciator v niche kategorii
- VideoObject schema ke kazdemu testovacihmu videu
- "Otestovano nami" badge: prime oznaceni otestovanych produktu ve vypisu kategorie
- Filtry specificke pro sport: vekova kategorie (deti, junioni, dospeli), typ treninku, herní pozice
- "Pro koho se hodi" je v niche sportu klicove: "Tato pomucka je idealni pro juniorskeho hokejiste ktery trenuuje 3x tydne"
- Srovnavaci tabulka produktu ve stejne kategorii: zkracuje rozhodovaci proces
- Osobni kontakt s fotografii = odbornik, ne anonymni e-shop
- Authority rank: kdo produkty testuje, jaka je jejich sportovni zkusenost
- Niche e-shop muze byt levnanim konkurovat velkym (Alza, Datart) prostrednictvim odbornosti a duvery

## PRISTUPNOST (EU zakon od cervna 2025)
- Minimalni dotykova plocha: 7x7 mm s 2mm rozestupy
- Kontrastni pomer textu: minimalne 4,5:1
- Formulare: labely musi byt viditelne, ne jen placeholder
`

// Clarity Data Export API
// Docs: https://learn.microsoft.com/en-us/clarity/clarity-data-export-api
// Endpoint: GET https://www.clarity.ms/export-data/api/v1/project-live-insights
// Auth: Bearer token (projekt-specificky JWT z Clarity Settings → Data Export)
// Limit: max 10 requestu/projekt/den, data pouze za posledni 1-3 dny
// Projekt je identifikovan tokenem, ne URL parametrem

const CLARITY_API = 'https://www.clarity.ms/export-data/api/v1/project-live-insights'

// Mapovani domeny na token: CLARITY_API_TOKEN_<DOMAIN_KEY>
// Priklad: spinkids.sk → CLARITY_API_TOKEN_SPINKIDS_SK
function getClarityToken(hostname) {
  const key = hostname
    .replace(/^www\./, '')
    .replace(/[\.\-]/g, '_')
    .toUpperCase()
  return process.env[`CLARITY_API_TOKEN_${key}`] || null
}

async function fetchClarityData(hostname) {
  try {
    const token = getClarityToken(hostname)
    if (!token) return null

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    // 2 requesty: celkova data + breakdown podle zarizeni (mobile/desktop)
    // numOfDays=3 = maximum dostupne (posledni 72 hodin)
    const [overallRes, deviceRes] = await Promise.all([
      fetch(`${CLARITY_API}?numOfDays=3`, { headers }),
      fetch(`${CLARITY_API}?numOfDays=3&dimension1=Device`, { headers }),
    ])

    if (!overallRes.ok) {
      const errText = await overallRes.text()
      console.error(`Clarity API ${overallRes.status}:`, errText)
      return null
    }

    const [overall, deviceBreakdown] = await Promise.all([
      overallRes.json(),
      deviceRes.ok ? deviceRes.json() : null,
    ])

    return { overall, deviceBreakdown }
  } catch (e) {
    console.error('fetchClarityData error:', e.message)
    return null
  }
}

// Parsovani Clarity response na citelny kontext pro Claude
// Response format: [{ metricName: "Traffic", information: [{...}] }, ...]
function parseClarityMetric(data, metricName) {
  if (!Array.isArray(data)) return null
  return data.find(m => m.metricName === metricName)?.information || null
}

function extractMetric(data, metricName) {
  if (!Array.isArray(data)) return null
  return data.find(m => m.metricName === metricName)?.information ?? null
}

function formatDeviceSection(deviceBreakdown, metricName, label) {
  const rows = extractMetric(deviceBreakdown, metricName)
  if (!rows) return ''
  const lines = []
  for (const row of rows) {
    const dev = row.Device ?? row.device ?? 'Unknown'
    if (metricName === 'Traffic') {
      lines.push(`  ${dev}: sessions=${row.totalSessionCount ?? '?'}, uzivatele=${row.distantUserCount ?? '?'}, stranky/session=${Number(row.PagesPerSessionPercentage ?? 0).toFixed(2)}`)
    } else {
      const pct = row.sessionsWithMetricPercentage ?? row.percentage ?? '?'
      lines.push(`  ${dev}: ${pct}% sessions postizeno`)
    }
  }
  return lines.length ? `${label}:\n${lines.join('\n')}` : ''
}

function formatClarityContext(clarityData) {
  if (!clarityData) return ''
  const { overall, deviceBreakdown } = clarityData
  const lines = ['\nREALNA DATA Z MICROSOFT CLARITY (posledni 3 dny):']

  if (Array.isArray(overall)) {
    for (const { metricName: name, information: info } of overall) {
      if (!info?.length) continue
      const r = info[0]
      if (name === 'Traffic') {
        lines.push(`- Celkem sessions: ${r.totalSessionCount ?? '?'} | Unikatni uzivatele: ${r.distantUserCount ?? '?'} | Stranky/session: ${Number(r.PagesPerSessionPercentage ?? 0).toFixed(2)}`)
      } else if (name === 'RageClickCount' || name === 'Rage Click Count') {
        lines.push(`- Rage clicks: ${r.sessionsWithMetricPercentage ?? '?'}% sessions (${r.sessionsCount ?? '?'} sessions, ${r.subTotal ?? '?'} kliknuti)`)
      } else if (name === 'DeadClickCount' || name === 'Dead Click Count') {
        lines.push(`- Dead clicks: ${r.sessionsWithMetricPercentage ?? '?'}% sessions (${r.sessionsCount ?? '?'} sessions, ${r.subTotal ?? '?'} kliknuti)`)
      } else if (name === 'QuickbackClick' || name === 'Quickback Click') {
        lines.push(`- Quick backs: ${r.sessionsWithMetricPercentage ?? '?'}% sessions`)
      } else if (name === 'ScrollDepth' || name === 'Scroll Depth') {
        lines.push(`- Scroll depth: ${r.sessionsWithMetricPercentage ?? '?'}% sessions scrolluje pod 50 %`)
      } else if (name === 'EngagementTime' || name === 'Engagement Time') {
        lines.push(`- Aktivni cas: ${r.subTotal ?? r.avgActiveTime ?? '?'}`)
      } else if (name === 'ExcessiveScroll' || name === 'Excessive Scroll') {
        lines.push(`- Excessive scroll: ${r.sessionsWithMetricPercentage ?? '?'}% sessions`)
      }
    }
  }

  if (Array.isArray(deviceBreakdown)) {
    const trafficSection = formatDeviceSection(deviceBreakdown, 'Traffic', '📱🖥️ Breakdown podle zarizeni (Traffic)')
    if (trafficSection) lines.push(trafficSection)
    const rageSection = formatDeviceSection(deviceBreakdown, 'RageClickCount', '📱🖥️ Rage clicks podle zarizeni')
      || formatDeviceSection(deviceBreakdown, 'Rage Click Count', '📱🖥️ Rage clicks podle zarizeni')
    if (rageSection) lines.push(rageSection)
    const deadSection = formatDeviceSection(deviceBreakdown, 'DeadClickCount', '📱🖥️ Dead clicks podle zarizeni')
      || formatDeviceSection(deviceBreakdown, 'Dead Click Count', '📱🖥️ Dead clicks podle zarizeni')
    if (deadSection) lines.push(deadSection)
  }

  lines.push('DULEZITE: Tato cisla jsou REALNA behavioralni data POUZE tohoto webu. Cituj je primo v analyze s konkretnimi hodnotami. Pokud mas mobilni data, Mobilni verze dostane skutecne skore, ne N/A.')
  return lines.join('\n') + '\n'
}

async function fetchOnePage(url, timeoutMs = 8000) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), timeoutMs)
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CROBot/1.0)', 'Accept': 'text/html', 'Accept-Language': 'cs,sk,en;q=0.9' },
    })
    clearTimeout(t)
    if (!res.ok) return null
    return await res.text()
  } catch { return null }
}

function extractLinks(html, baseUrl) {
  const links = []
  const re = /href=["']([^"'#?]+)["']/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      const u = new URL(m[1], baseUrl)
      if (u.hostname === new URL(baseUrl).hostname) links.push(u.href)
    } catch {}
  }
  return [...new Set(links)]
}

function parseMeta(html, url) {
  if (!html) return null
  const get = (re) => { const m = html.match(re); return m ? m[1].trim().replace(/\s+/g, ' ') : null }
  return {
    url,
    title: get(/<title[^>]*>([^<]+)<\/title>/i) || get(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i),
    description: get(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || get(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i),
    h1: get(/<h1[^>]*>([^<]+)<\/h1>/i),
    h2Count: (html.match(/<h2[^>]*>/gi) || []).length,
    hasSchema: /application\/ld\+json/i.test(html),
    hasVideo: /youtube\.com|vimeo\.com|<video/i.test(html),
    hasBNPL: /twisto|splitit|alma|klarna|splitty/i.test(html),
    hasSearch: /type=["']search["']|role=["']search["']/i.test(html),
    hasReviews: /recenz|hodnocen|review|rating/i.test(html),
    canonical: get(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i),
    hasCouponField: /slevov|coupon|discount.*input|input.*coupon/i.test(html),
    hasProgressBar: /progress.*doprv|zbývá.*doprv|free.*ship|doprava.*zdarma.*\d/i.test(html),
  }
}

// Najde URL kategorie, detailu produktu a kosiku ze homepage HTML
function discoverKeyUrls(html, baseUrl) {
  const links = extractLinks(html, baseUrl)
  const base = new URL(baseUrl).hostname
  const score = (u) => {
    const p = new URL(u).pathname.toLowerCase()
    if (/kosik|cart|basket/.test(p)) return { type: 'kosik', url: u }
    if (/checkout|objednavka|pokladna/.test(p)) return { type: 'checkout', url: u }
    if (/produkt|product|detail|item/.test(p)) return { type: 'produkt', url: u }
    if (/kategor|category|shop|zbozi/.test(p)) return { type: 'kategorie', url: u }
    return null
  }
  const found = {}
  for (const link of links) {
    try {
      const r = score(link)
      if (r && !found[r.type]) found[r.type] = r.url
    } catch {}
  }
  return found
}

async function fetchMultiPageData(clientUrl) {
  const baseUrl = clientUrl.startsWith('http') ? clientUrl : `https://${clientUrl}`
  const homepageHtml = await fetchOnePage(baseUrl, 10000)
  const homepageMeta = parseMeta(homepageHtml, baseUrl)

  if (!homepageHtml) return { homepage: null, pages: {} }

  const keyUrls = discoverKeyUrls(homepageHtml, baseUrl)

  // Paralelne fetch dalsi stranky (kosik, kategorie, produkt) — max 10s celkem
  const extraPages = {}
  const fetches = Object.entries(keyUrls).map(async ([type, url]) => {
    const html = await fetchOnePage(url, 6000)
    if (html) extraPages[type] = parseMeta(html, url)
  })
  await Promise.allSettled(fetches)

  return { homepage: homepageMeta, pages: extraPages, discoveredUrls: keyUrls }
}

function formatMultiPageContext(crawlData) {
  if (!crawlData?.homepage) return '\nMeta data se nepodarilo nacist. Analyzu postav na zaklade URL a kategorie.\n'
  const { homepage: h, pages, discoveredUrls } = crawlData
  let ctx = '\nREALNA DATA ZE STRANKY (pouzij v analyze):\n'
  ctx += `Homepage:\n`
  if (h.title) ctx += `- Title: "${h.title}"\n`
  if (h.description) ctx += `- Meta description: "${h.description}"\n`
  if (h.h1) ctx += `- H1: "${h.h1}"\n`
  ctx += `- H2 pocet: ${h.h2Count} | Schema.org: ${h.hasSchema ? 'ANO' : 'NE'} | Video: ${h.hasVideo ? 'ANO' : 'NE'} | BNPL: ${h.hasBNPL ? 'ANO' : 'NE'} | Vyhledavani: ${h.hasSearch ? 'ANO' : 'NE'}\n`
  if (h.canonical) ctx += `- Canonical: ${h.canonical}\n`

  for (const [type, meta] of Object.entries(pages)) {
    if (!meta) continue
    ctx += `\n${type.charAt(0).toUpperCase() + type.slice(1)} (${meta.url}):\n`
    if (meta.title) ctx += `- Title: "${meta.title}"\n`
    if (meta.h1) ctx += `- H1: "${meta.h1}"\n`
    if (type === 'kosik') {
      ctx += `- Slevove pole viditelne: ${meta.hasCouponField ? 'ANO (problem — ceka zakazniky k odchodu)' : 'NE nebo skryte'}\n`
      ctx += `- Progress bar doprava zdarma: ${meta.hasProgressBar ? 'ANO' : 'NE'}\n`
    }
    if (type === 'produkt') {
      ctx += `- Recenze pritomny: ${meta.hasReviews ? 'ANO' : 'NE'} | Video: ${meta.hasVideo ? 'ANO' : 'NE'} | Schema: ${meta.hasSchema ? 'ANO' : 'NE'}\n`
    }
  }
  ctx += `Komentuj: je title SEO-optimalizovany? H1 obsahuje keyword? Schema.org nasazena? BNPL zobrazeno?\n`
  return ctx
}

async function fetchPageMeta(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CROBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'cs,en;q=0.9',
      },
    })
    clearTimeout(timeout)
    if (!response.ok) return null
    const html = await response.text()

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : null
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)
    const description = descMatch ? descMatch[1].trim().replace(/\s+/g, ' ') : null
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    const h1 = h1Match ? h1Match[1].trim().replace(/\s+/g, ' ') : null
    const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null
    const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i)
    const ogDesc = ogDescMatch ? ogDescMatch[1].trim() : null
    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length
    const hasSchema = /application\/ld\+json/i.test(html)
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : null

    return { title: title || ogTitle, description: description || ogDesc, h1, h2Count, hasSchema, canonical }
  } catch {
    return null
  }
}

export async function POST(req) {
  try {
    const { clientUrl, withClarity, reportMode } = await req.json()

    if (!clientUrl) {
      return new Response(JSON.stringify({ error: 'Chybi URL klienta' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API klic neni nastaven' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const hostname = clientUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const baseUrl = clientUrl.startsWith('http') ? clientUrl : `https://${clientUrl}`

    const [crawlData, clarityData] = await Promise.all([
      fetchMultiPageData(baseUrl),
      fetchClarityData(hostname),
    ])

    const clarityDataContext = formatClarityContext(clarityData)
    const metaContext = formatMultiPageContext(crawlData)

    const clarityInstruction = clarityData
      ? `Klient MA Clarity a MAME REALNA DATA (viz sekce REALNA DATA Z MICROSOFT CLARITY). Tato data patri POUZE tomuto webu — nikdy je nepouzivej pro jine projekty. Cituj konkretni hodnoty primo v analyze. Pokud mas mobilni data, Mobilni verze dostane skutecne skore 1-10, ne N/A.`
      : withClarity
        ? `Klient MA Clarity ale nemame API data pro tuto analyzu. U kazdeho doporuceni uved konkretni krok jak ho overit v Clarity (vrstva 📊 [CLARITY DATA]).`
        : `Klient NEMA Clarity. V QUICK WINS jako prvni bod uved instalaci Clarity (max 2 vety: co to je + jak nainstalovat pres GTM).`

    const now = new Date()
    const dateStr = now.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })

    const isTop10 = reportMode === 'top10' || reportMode === 'quick'

    const scoringAreas = `
HODNOCENE OBLASTI A VAHY (pouzij vzdy presne tychto 7 oblasti + Mobilni verze jako N/A):
1. Duveryhodnost a trust signaly (vaha 15 %)
2. Produktove stranky a obsah (vaha 20 %)
3. Navigace a vyhledavani (vaha 10 %)
4. Objednavkovy proces (vaha 20 %)
5. Homepage a prvni dojem (vaha 15 %)
6. SEO a technicka zakladna (vaha 10 %)
7. Zakaznicka pece a retence (vaha 10 %)
8. Mobilni verze (N/A — nezapocitava se do skore)

Format pro kazdou oblast: "Oblast (vaha X %): skore/10"
**Komentar:** [1 veta: konkretni problem nebo silna stranka ktera skore zpusobuje] + [1 veta: konkretni priklad z tohoto e-shopu — nazev prvku, URL, nebo pozorovani]
ZAKAZANO: Komentare jako "Tato oblast je prumerna" nebo "Web ma prostor pro zlepseni" bez konkretniho prikladu. Kazdy komentar musi byt tak specificky, ze nemuze platit pro jiny e-shop.

VYPOCET CELKOVEHO SKORE: Celkove skore MUSI byt vypocitano jako vazeny prumer 7 oblasti (Mobilni verze se nezapocitava).
Vzorec: (skore1 x 15) + (skore2 x 20) + (skore3 x 10) + (skore4 x 20) + (skore5 x 15) + (skore6 x 10) + (skore7 x 10) = celkove skore ze 100.
Za celkovym skorem uved vypocet v zavorkach, napr.: (4x15 + 6x20 + 5x10 + 4x20 + 5x15 + 5x10 + 4x10 = 490 → 49/100)
ZAKAZANO: Celkove skore odhadnout bez vypoctu z podskore.
ZAKAZANO: Celkove skore a vypocet opakovat — uved ho POUZE JEDNOU, bezprostredne pod nadpisem SKORE E-SHOPU. Pod tabulkou oblasti NEPRIDAVEJ zadny souhrn ani opakovani vypoctu.

Pozor: Skore musi byt relativni vuci kategorii a velikosti e-shopu.
Niche specializovany e-shop hodnoť vyse za autenticky obsah a odbornost.

PRAVIDLO N/A — POUZE PRO MOBILNI VERZI: N/A smis pouzit JEN pro oblast "Mobilni verze". Format: "Mobilni verze (N/A): N/A — Pro objektivni hodnoceni potrebuji Clarity heatmapy mobilni verze."
ZAKAZANO — nikdy nepis: "Mobilni verze: 5/10" nebo jake koliv cislo pro mobilni verzi.
SPRAVNE: "Mobilni verze (N/A): N/A — Pro objektivni hodnoceni potrebuji Clarity heatmapy mobilni verze."
VSECHNY OSTATNI oblasti (Duveryhodnost, Produktove stranky, Navigace, Objednavkovy proces, Homepage, SEO, Zakaznicka pece) MUSI vzdy dostat konkretni skore 1-10. Nikdy nepouzivej N/A pro jine oblasti nez Mobilni verze.
`

    const strictRules = `
ABSOLUTNI PRAVIDLA:

PRAVIDLO 1 – NO DASH: Nikdy pomlcku jako oddelovac (–, —). Jedina vyjimka: pomlcka uvnitr slova (e-shop).

PRAVIDLO 2 – ZADNE VYMYSLENE FAKTY: Nikdy konkretni cisla ktere neznas. Priklad vzdy oznacit: (PRIKLAD: overit skutecnou hodnotu).

PRAVIDLO 3 – ZADNE ANGLICISMY: "objednavkovy proces" ne "checkout", "vstupni stranka" ne "landing page", "mira okamziteho odchodu" ne "bounce rate". Vyjimky: nazvy nastroju (Clarity, Twisto).

PRAVIDLO 4 – ZAKAZANE FRAZE: NIKDY nepouzivej: "neoveril jsem", "doporucuji overit", "bez pristupu nelze", "nebylo mozne overit", "nelze overit z dostupnych dat", "na zaklade meta dat nelze", "Toto jsem neoveril primo". Vsechny tyto fraze jsou ZAKAZANE. Misto nich vzdy pouzij hypotezu: "Pravdepodobne [problem] — pokud ano, dopad je [X]%. Jak overit v Clarity: [konkretni krok]."

PRAVIDLO 5 – SPECIFICKA DOPORUCENI: Kazde doporuceni musi byt specificke pro TENTO e-shop. Clarity v Quick Wins: max 2 vety (1 veta co to je + 1 veta jak nainstalovat). Kazdy Quick Win: max 3 vety celkem.

PRAVIDLO 6 – KATEGORIE-RELATIVNI SKORE: Niche e-shop (do 500 produktu, uzka kategorie) hodnoť vyse za autenticky obsah a odbornost. Penalizuj za absenci odborneho obsahu vice nez u generalistu.

PRAVIDLO 7 – MATICE EMOJI: V sekci DUVERYHODNOSTNI MATICE VZDY pouzivej: ✅ funguje dobre, ❌ chybi nebo spatne, ⚠️ nedostatecne nebo casti chybi, ❓ neovereno z dostupnych dat.

PRAVIDLO 8 – CELKOVY POTENCIAL VZDY TABULKA: Sekci CELKOVY POTENCIAL pis VZDY jako tabulku se dvema sloupci: Oblast | Odhadovany dopad.

PRAVIDLO 9 – NO VERSION FOOTER: Na konci NIKDY nepridavej nazev systemu, verzi ani zkratky.

PRAVIDLO 10 – MAX 6 STRAN: Celkova delka analyzy MAXIMALNE 6 stran A4. Pokud bys presahl, zkrat: Quick Wins na max 3 vety, Stredni priority na 1-2 vety, Roadmap na jeden radek na polozku.
`

    const clarityLayerText = clarityData
      ? 'Cituj KONKRETNI CISLO z realnych dat tohoto webu (viz REALNA DATA Z CLARITY nahore). Priklad: "Dead click rate je 1,59 % — to znamena ze uzivatele klikaji na prvky ktere nejsou klikatelne."'
      : 'Uved konkretni krok jak tuto oblast overit v Clarity. Priklad: "Otevri Heatmapu stranky /kosik → zkontroluj zda uzivatele klikaji na pole slevoveho kodu."'

    const threeLayerFormat = `
KRITICKE: Kazde doporuceni MUSI obsahovat PRESNE TYTO TRI RADKY ve formatu nize. Nikdy je nevynechej, nikdy je nespoj do jednoho odstavce.

🎯 **[CRO PRINCIP]:** [1 veta — obecny princip proc tato zmena zvysuje konverzi]
👥 **[SEGMENT]:** [1 veta — konkretni zkusenost z podobnych e-shopu v teto kategorii, idealne s cislem dopadu]
📊 **[CLARITY DATA]:** ${clarityLayerText}

PRIKLAD SPRAVNEHO VYSTUPU (pro doporuceni o slevovem kodu):
🎯 **[CRO PRINCIP]:** Viditelne pole pro slevovy kod aktivuje u zakaznika vedomí ze "sleva existuje ale ja ji nemam" a zpusobuje odchod na agregatory pred dokoncenim objednavky.
👥 **[SEGMENT]:** E-shopy s detskym zbozim ktere skryly slevovy kod za checkbox zaznamenaly prumerny rust konverze z kosiku o 11 %.
📊 **[CLARITY DATA]:** ${clarityData ? 'Podle Clarity dat ma tento web dead click rate 1,59 % — zkontroluj zda jsou rage clicks soustredeny na oblast slevoveho kodu v nahrávkach segmentu "navstivil kosik ale nenakoupil".' : 'Otevri Recordings → filtr "navstivil kosik ale nenakoupil" → hledej zaznamy kde uzivatel klikne do pole slevoveho kodu a pak opusti stranku do 60 sekund.'}

PRIKLAD SPATNEHO VYSTUPU (ZAKAZANO):
"Doporucujeme skryt slevovy kod. Toto zvysi konverze." — TOTO JE ZAKAZANO, chybi vsechny tri vrstvy.

MATICE DOPAD vs NAROCNOST — POVINNY FORMAT pro kazde doporuceni:
**Dopad:** ●●●●○ (4/5) | **Narocnost:** ●●○○○ (2/5) | **Cas:** [konkretni odhad, napr. "2 hodiny"]
Pravidla:
- Dopad 5/5 = +15 % a vice konverze | Dopad 1/5 = marginalní zmena
- Narocnost 5/5 = tyden+ vyvoje | Narocnost 1/5 = zmena textu nebo CSS do 30 minut
- Puntiky: pouzivej symbol ● pro aktivni a ○ pro neaktivni (celkem vzdy 5 symbolu)
`

    const structureInstruction = isTop10 ? `
REZIM: QUICK — TOP 10 PRIORITIZOVANYCH DOPORUCENI
Vystup POUZE tyto sekce:

SKORE E-SHOPU
[Cislo 0-100] (vazeny vypocet v zavorkach)
[Kategorie + 1 veta komentar]

TOP 10 DOPORUCENI (razeno: nejvyssi Dopad / nejnizsi Narocnost = první)
1. **[Nazev — max 8 slov]**
   ${threeLayerFormat}
   Dopad: ●●●●○ | Narocnost: ●●○○○ | Cas: [odhad]

MATICE PRIORIT
Doporuceni | Dopad (1-5) | Narocnost (1-5)
[tabulka vsech 10]

Celkova delka: 1-2 strany A4.
` : `
REZIM: FULL — HLOUBKOVA SEKCNI ANALYZA

ZAVAZNA STRUKTURA (presne tyto sekce, v tomto poradi):

## SKORE E-SHOPU
[Cislo 0-100] (vazeny vypocet v zavorkach)
[Kategorie + konkurenti]
${scoringAreas}

## CO DELA DOBRE
3 body — kazdy: konkretni nazev prvku + 2-3 vety proc funguje + odkaz na sekci/URL

## ANALYZA PO SEKCICH

### 🏠 HOMEPAGE A PRVNI DOJEM
[3-4 konkretni pozorovani — co funguje, co chybi]

### 🔍 VYHLEDAVANI A NAVIGACE
[filtrace, naseptavac, menu, "nic nenalezeno" stav]

### 📦 KATEGORIE A VYPIS
[fotografie, razeni, filtry, badges]

### 🛍️ DETAIL PRODUKTU
[fotografie, video, "pro koho se hodi", recenze, BNPL, schema]

### 🛒 KOSIK
[slevove pole, progress bar, upsell, datum doruceni]

### 💳 OBJEDNAVKOVY PROCES
[kroky, platebni metody, BNPL, Apple/Google Pay]

## TOP 5 QUICK WINS (od nejvetsiho dopadu × nejnizsi narocnosti)
Kazdy Quick Win:
**[Nazev]**
${threeLayerFormat}
**Problem:** [1 veta]
**Jak opravit:** [max 3 kroky]
**Odhadovany dopad:** [% rozsah]
**Jak overit v Clarity:** [kde kliknout → co hledat → jake cislo = problem potvrzen]

## CLARITY CHECKLIST (5 polozek, POSLEDNI SEKCE)
Format: "[cislo]. [Kde v Clarity] → [Co hledat] → [Jak interpretovat]"
Kazda polozka specificka pro TENTO web a kategorii.
`

    const systemPrompt = `Jsi KRIS – Knowledge-based Report Intelligence System, expert CRO analytik e-shopu metodologie ESHOP BOOSTER.

Znalostni baze:
${KRIS_KNOWLEDGE_BASE}

${metaContext}
${clarityDataContext}
${clarityInstruction}

Dnesni datum: ${dateStr}.

${strictRules}

${structureInstruction}

Pouzij specificke znalosti pro kategorii tohoto e-shopu z databaze. Identifikuj kategorii z URL a nazvu e-shopu.`

    const userMessage = `Priprav KRIS CRO analyzu pro e-shop: ${clientUrl}

Identifikuj kategorii produktu. Bud maximalne konkretni pro TENTO e-shop. NIKDY nepouzivej slovo "pravdepodobne".`

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text()
      return new Response(JSON.stringify({ error: 'Chyba API: ' + err }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      const reader = anthropicResponse.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                await writer.write(encoder.encode(`data: ${JSON.stringify({ chunk: parsed.delta.text })}\n\n`))
              }
            } catch {}
          }
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`))
      } finally {
        await writer.close()
      }
    })()

    return new Response(readable, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || 'Neznama chyba' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
