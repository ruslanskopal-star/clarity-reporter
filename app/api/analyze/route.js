// route_v6_edge_v13.js
// Zmeny oproti v12:
// 1. Zakaz slova "pravdepodobne" - nahradit "Toto jsem neoveril, doporucuji zkontrolovat"
// 2. Max 6 stran zprisneno, Clarity max 2 vety, Quick Wins max 3 vety na polozku
// 3. Matice standardni emoji: ✅ ❌ ⚠️ ❓
// 4. Standardnich 8 oblasti skore s komentarem
// 5. Celkovy potencial vzdy tabulka 2 sloupce
// 6. KB: VideoObject schema, AR nabytek, progress bar doprava, "Pro koho se hodi"
// 7. KB: Social proof badges, kategorie-specificke filtry, sport niche sekce
// 8. KB: Email serie kategorie-specificke tipy, Heureka/Zbozi, niche vs masovy
// 9. cleanUrl instrukce pro URL v hlavicce reportu

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

    const pageMeta = await fetchPageMeta(clientUrl)

    let metaContext = ''
    if (pageMeta) {
      metaContext = `\nREALNA DATA ZE STRANKY (pouzij v analyze):\n`
      if (pageMeta.title) metaContext += `- Title: "${pageMeta.title}"\n`
      if (pageMeta.description) metaContext += `- Meta description: "${pageMeta.description}"\n`
      if (pageMeta.h1) metaContext += `- H1: "${pageMeta.h1}"\n`
      if (pageMeta.h2Count !== undefined) metaContext += `- Pocet H2: ${pageMeta.h2Count}\n`
      if (pageMeta.hasSchema !== undefined) metaContext += `- Schema.org: ${pageMeta.hasSchema ? 'ANO - nasazena' : 'NE - chybi structured data'}\n`
      if (pageMeta.canonical) metaContext += `- Canonical: ${pageMeta.canonical}\n`
      metaContext += `Komentuj primo v analyze: je title SEO-optimalizovany? Meta description motivuje ke kliknuti? H1 obsahuje keyword? Schema.org nasazena?\n`
    } else {
      metaContext = `\nMeta data se nepodarilo nacist. Analyzu postav na zaklade URL a kategorie.\n`
    }

    const clarityInstruction = withClarity
      ? `Klient MA Clarity. U kazde kriticke a vysoke priority uved jak ji overit v Clarity (max 1 veta).`
      : `Klient NEMA Clarity. V sekci QUICK WINS uved Clarity jako bod 1 - max 2 vety s navodem na instalaci.`

    const now = new Date()
    const dateStr = now.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })

    const isTop10 = reportMode === 'top10'

    const scoringAreas = `
OSMI STANDARDNICH OBLASTI SKORE (pouzij vzdy tychto 8, poradi muze zmenit dle priority):
1. Duveryhodnost a trust signaly
2. Produktove stranky a obsah
3. Navigace a vyhledavani
4. Mobilni verze
5. Objednavkovy proces
6. SEO a strukturovana data
7. Cenotvorba a konverzni prvky
8. Copywriting a texty

Format pro kazdou oblast: "Oblast: X/10 | Komentar: [1 veta co konkretne chybi nebo funguje]"
Pozor: Skore musi byt relativni vuci kategorii a velikosti e-shopu.
Niche specializovany e-shop hodnoť vyse za autenticky obsah a odbornost.

PRAVIDLO N/A — POUZE PRO MOBILNI VERZI: N/A smis pouzit JEN pro oblast "Mobilni verze" pokud nemas Clarity data ani primy pristup k mobilni verzi. Uved: "N/A — Pro objektivni hodnoceni potrebuji Clarity heatmapy mobilni verze." VSECHNY OSTATNI oblasti (Navigace, Objednavkovy proces, Duveryhodnost, SEO atd.) MUSI vzdy dostat konkretni skore 1-10 s hypotezou ve formatu: "Pravdepodobne [problem] — pokud ano, dopad je [X]%. Jak overit v Clarity: [konkretni krok]." Nikdy nepouzivej N/A pro jine oblasti nez Mobilni verze.
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

    const structureInstruction = isTop10 ? `
REZIM: TOP 10 AKCNI PLAN
Vygeneruj POUZE:

SKORE E-SHOPU
[Cislo 0-100 + kategorie + 1 veta komentar]

TOP 10 AKCNICH KROKU (od nejvetsiho dopadu)
1. [Max 8 slov nazev]
   Proc: [1 veta]
   Jak: [2 kroky max]
   Dopad: [cislo nebo %]

CELKOVY POTENCIAL
Oblast | Odhadovany dopad
[tabulka 3-5 radku]

Celkova delka: 1 strana A4 max.
` : `
REZIM: PLNA ANALYZA

KRITICKE: Vystup musi obsahovat PRESNE TYTO 4 SEKCE a nic jineho:
1. SKORE E-SHOPU (s podskore oblasti)
2. CO DELA DOBRE (3 body)
3. TOP 5 QUICK WINS (kazdy s: Problem / Jak opravit / Odhadovany dopad / Jak overit v Clarity)
4. CLARITY CHECKLIST (5 e-shop-specifickych polozek)

ZAKAZANE SEKCE: Nepridavej ROADMAP, IMPLEMENTACNI PLAN, TYDENNI PLAN, DUVERYHODNOSTNI MATICE, CELKOVY POTENCIAL ani zadnou 5. sekci. Vystup konci po CLARITY CHECKLIST.

---

SKORE E-SHOPU
[Cislo 0-100]
[Kategorie e-shopu a konkurenti]
${scoringAreas}
[2 vety komentar]

CO DELA DOBRE
Top 3 silne stranky s vysvetlenim "Proc to funguje: [konkretni duvod]"

TOP 5 QUICK WINS (od nejvetsiho dopadu)
Kazdy Quick Win musi mit PRESNE tuto strukturu:
1. [Nazev]
   **Problem:** [1 veta popisujici konkretni problem]
   **Jak opravit:** [MAXIMALNE 3 kroky, kazdy krok max 2 vety, bez zbytecneho rozvadeni]
   **Odhadovany dopad:** [konkretni % rozsah, napr. +8-15 % konverze]
   **Jak overit v Clarity:** [1 konkretni instrukce: kde kliknout + co sledovat + jake cislo = problem potvrzen]

ZAKAZANO: vice nez 3 kroky v Jak opravit. Kazdy Quick Win musi byt implementovatelny za 1-2 hodiny, ne za tyden.

---
## CLARITY CHECKLIST

TATO SEKCE MUSI BYT VZDY POSLEDNI SEKCI ANALYZY. Prave 5 polozek, kazda specificka pro TENTO e-shop a jeho kategorii — NIKDY genericka. Format: "[cislo]. [Kde presne v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]"
Priklad SPRAVNE polozky: "1. Heatmapa stranky /kosik → zkontroluj % uzivatelu kteri scrolluji pod seznam polozek; pokud mene nez 60 % vidi tlacitko Objednat, presun ho vys."
Priklad SPATNE polozky: "1. Zkontroluj heatmapy webu." — TOTO JE ZAKAZANE.

1. [Kde v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]
2. [Kde v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]
3. [Kde v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]
4. [Kde v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]
5. [Kde v Clarity kliknout] → [Co konkretne hledat a jak to interpretovat]
`

    const systemPrompt = `Jsi KRIS – Knowledge-based Report Intelligence System, expert CRO analytik e-shopu metodologie ESHOP BOOSTER.

Znalostni baze:
${KRIS_KNOWLEDGE_BASE}

${metaContext}

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
