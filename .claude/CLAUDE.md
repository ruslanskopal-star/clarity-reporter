# KRIS Engine — Persistentní kontext pro Claude Code

## Projekt
- Live: https://cro-report.vercel.app/
- GitHub: ruslanskopal-star/cro-report
- Vercel Team ID: team_YyUwpSM7UNIxeWdz7IsroSNz
- Vercel Project ID: prj_c6U3B3yWLJn9130Cpb9U50f42uPC

## Dalsi dokumenty
- **@DESIGN.md** — vizualni system, barvy, typografie, komponenty, print styly
- **@SECURITY.md** — autentizace, validace, error handling, secrets, dependencies
- **@PLAN.md** — verzovany roadmap (v28 → v29 → v30 → v31)
- **@AUDIT.md** — tydenni hloubkovy audit (bezpecnost, endpointy, errory, kod) — provadej 1× tydne

---

## Tech Stack

| Vrstva | Technologie |
|--------|-------------|
| Frontend | React 18 + Next.js 14 (App Router, single page) |
| Styling | Inline styly (zadny CSS framework, zadny globals.css) |
| Backend | Next.js Route Handlers (6 API endpointu) |
| AI | Anthropic Claude API (@anthropic-ai/sdk), streaming |
| Auth | TOTP (otpauth) → HMAC session token |
| Rate Limit | Upstash Redis (@upstash/ratelimit) |
| Storage | Vercel Blob (private, fra1) |
| Email | Resend API (cron daily report) |
| Deploy | Vercel (auto-deploy z main) |
| Package manager | npm |

## Architektura

### Adresarova struktura

```
app/
├── page.js              ← Frontend (auth UI, preflight, screenshot upload, analyza, galerie)
├── layout.js            ← Root layout (minimal, zadny globals.css)
├── icon.svg             ← Favicon
├── lib/
│   └── auth.js          ← Sdileny modul (HMAC tokeny, rate limit)
├── knowledge/
│   └── checklist.js     ← Klientsky CRO checklist (ESHOP BOOSTER, 4 VLNY, referencni weby)
└── api/
    ├── analyze/route.js            ← Hlavni CRO analyza (Anthropic multimodal + streaming)
    ├── auth/route.js               ← TOTP overeni → session token
    ├── reports/route.js            ← CRUD reportu (Blob: GET/POST/DELETE)
    ├── upload-screenshot/route.js  ← Upload jednoho screenshotu do Blob (obchazi 4.5MB limit)
    ├── screenshot/route.js         ← Servis screenshotu pro galerii v historii
    └── cron/daily-report/route.js  ← Denni email souhrn (Resend)
knowledge/
├── sekce-checkout.md    ← Knowledge base: checkout
├── sekce-detail-produktu.md
├── sekce-kosik.md
├── reference-weby.md    ← TODO v29: extrahovat referencni vzory z denatura.cz atd.
└── segmenty/            ← Segment-specificke KB (TODO v30)
scripts/
├── kris-test.js             ← CLI tester (vola live API, overuje kriteria)
└── read-latest-report.js    ← Cte posledni report z Blob storage pro dany hostname
```

### Data Flow

1. Uzivatel zada TOTP kod → `POST /api/auth` → overi TOTP → vrati HMAC session token
2. Uzivatel zada URL → `POST /api/analyze` (action=preflight) → detekce kategorie + otazky
3. Uzivatel nahraje screenshoty → klientsky canvas resize na 1200×1500 JPEG 0.75 →
   `POST /api/upload-screenshot` (per chunk) → Blob `screenshots/{sessionId}/{slotId}.jpg`
4. Group sloty (homepage/kategorie/produkt/predkosik/kosik): auto-split dlouheho screenshotu
   na 1500px kusy, distribuce do slotu 1-6
5. Uzivatel klikne Spustit → `POST /api/analyze` (streaming, sessionId) →
   server stahne vsechny screenshoty z Blob → multimodal content (images + text) →
   Anthropic API (`claude-sonnet-4-6`) → SSE stream → klient renderuje
6. System prompt: checklist.js (max priorita) + KRIS_KNOWLEDGE_BASE (nizsi) + crawl meta + Clarity detekce
7. Po dokonceni streamu: server ulozi report do Blob `reports/{hostname}/{id}.json`
   vcetne referencí na screenshoty (sessionId + slot names)
8. Screenshoty NEMAZOU po analyze — zustavaji v Blob pro historii
9. Historie: klient vola `/api/screenshot?sessionId=X&slot=Y&token=Z` pro galerii
10. Denne v 8:00 UTC: `GET /api/cron/daily-report` → posle email pres Resend

### API Response Format

```js
// Uspech
{ ok: true, data: ... }

// Chyba
{ error: "popis pro uzivatele" }  // BEZ internich detailu
```

HTTP kody: 200 (ok), 400 (bad input), 401 (unauthorized), 429 (rate limit), 500 (server error)

---

## Prikazy

```bash
npm run dev          # Lokalni dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production serveru lokalne

# Testovani
node scripts/kris-test.js davona.cz    # CLI test proti live API

# Deploy
git push             # Auto-deploy na Vercel z main (~60s)
```

---

## Aktualni stav
- route.js = route_v6_edge_v28 (visual analysis, multimodal, checklist, autodetekce Clarity)
- page.js = page_v19 (25 upload slotu, auto-split, galerie v historii)
- Další verze: route → v29 | page → v20
- Vercel projekt: jen `cro-report` (duplikát `clarity-reporter-njmo` smazán)
- Clarity API odstraneno — 8× CLARITY_API_TOKEN_* env vars smazane z Vercelu

## Co je hotovo ve v25
✅ Vercel env vars: RESEND_API_KEY + KRIS_REPORT_EMAIL + CRON_SECRET + ANTHROPIC_API_KEY přidány
✅ Cron endpoint /api/cron/daily-report — {"ok":true} ✓, email doručen
✅ vercel.json: cron každý den v 8:00 UTC aktivní

## Co je hotovo ve v26
✅ Preflight dialog — detekce kategorie + 3 otázky (segment, obrat, hlavní problém)
✅ Role/Audience/Byznys cíl v systemPrompt
✅ Upozornění na malý vzorek Clarity dat (<500 sessions za 3 dny)
✅ Clarity tokeny — 8 e-shopů na Vercelu i lokálně
✅ Runtime nodejs + maxDuration 300s (fix timeout)

## Co je hotovo ve v27
✅ Preflight UI otestován živě — funguje
✅ Server-side Blob save v route.js (reporty se ukládají automaticky po streamu)
✅ Report nadpis: "CRO ANALÝZA" (bez "KRIS")
✅ TOTP autentizace (Google Authenticator, ESHOP BOOSTER: CRO Report)
✅ HMAC session tokeny (24h platnost, secret zůstává na serveru)
✅ Rate limit: 5 auth pokusů/15min + 10 analýz/h per IP (Upstash Redis)
✅ Auth na všech endpointech včetně preflight
✅ Private Blob storage (přímé URL = 403)
✅ Security headers (HSTS, X-Frame-Options DENY, nosniff, XSS, Permissions-Policy)
✅ CORS omezení na cro-report.vercel.app
✅ Logování přístupů na všech API endpointech
✅ /api/reports: GET/POST/DELETE s auth
✅ Smazán duplikátní projekt clarity-reporter-njmo

## Co je hotovo ve v28 (2026-04-11)
✅ 25 upload slotu na screenshoty (Homepage/Kategorie/Produkt/Predkosik/Kosik ×6, + singles)
✅ Auto-split dlouhych screenshotu (group sloty 1200×1500 kusy)
✅ Klientska komprese JPEG 0.75 @ 1200 width
✅ Separate `/api/upload-screenshot` endpoint (obchází 4.5MB body limit)
✅ Blob storage: `screenshots/{sessionId}/{slotId}.jpg` (private)
✅ Multimodal Anthropic API (screenshoty + text) - `claude-sonnet-4-6`
✅ Screenshoty se nemažou - historie galerie pod analýzou
✅ Novy endpoint `/api/screenshot` pro servis screenů do galerie
✅ Odstraněn Clarity API fetch (3 denní data = marginal)
✅ Autodetekce Clarity z HTML homepage (clarity.ms script)
✅ Klientský CRO checklist v `app/knowledge/checklist.js` (4 VLNY, referenční weby)
✅ Checklist injektovaný do system promptu s NEJVYŠŠÍ prioritou
✅ Tři-vrstvy format: [CRO PRINCIP] / [SEGMENT] / [JAK OVERIT V CLARITY]
✅ 401 handling: expired token → auto logout
✅ Bez authTokenu vše skryté (historie, analýza, patička)
✅ `scripts/read-latest-report.js` pro čtení reportů z Blob
✅ Otestováno na denatura.cz (76/100, konkrétní citace, VLNY fungují)
✅ Checklist kompletne rozsireny (3 pruchody dokumentem): 838 radku, 95 unikatnich
   CZ referencnich webu (pozitivni + negativni priklady), case studies attribution
   (Zbysek Nadenik USP studie, Honza Bartos GAP hokejkovy efekt, Honza Kvasnicka kosik)

## Co zbývá — v29 (Referenční weby)
❌ Extrahovat z denatura.cz analýzy silné prvky do `knowledge/reference-weby.md`
❌ Napojit reference-weby.md do system promptu s instrukcí "inspiruj se"
❌ Otestovat na jiném kosmetickém e-shopu (porovnání s denaturou)

## Co zbývá — v30 (Segmenty)
❌ Knowledge base segmenty — vyplnit kosmetika.md, moda.md, elektronika.md
❌ Segment-specifické benchmarky v promptu (dle vybraného segmentu)
❌ Smazat staré Blob stores v dashboardu (kris-reports, kkwiki-blob)

## Další krok
v29: reference-weby.md z denatura.cz — viz @PLAN.md
Kompletni roadmap viz @PLAN.md

---

## Code Standards

### Naming
- Soubory: `kebab-case` (route.js, daily-report)
- Promenne/funkce: `camelCase` (handleAnalyze, authToken)
- Konstanty: `UPPER_SNAKE_CASE` (LOADING_PHASES, AUTH_KEY, TOKEN_MAX_AGE)
- Env vars: `UPPER_SNAKE_CASE` (ANTHROPIC_API_KEY, TOTP_SECRET)

### Aktualni conventions
- Frontend (page.js): `var` vsude (historicky), inline styly, zadny CSS framework
- Backend (route.js): `const`/`let`, async/await
- Sdileny modul: `app/lib/auth.js` (export funkci)
- Zadny TypeScript (ignoreBuildErrors: true) — planovany v budoucnu

### Commit messages
- `feat:` nova funkcionalita
- `fix:` oprava bugu
- `security:` bezpecnostni zmena
- `chore:` udrzba, deploy, config
- Format: `type: route_v6_edge_vXX - popis` (pro route.js zmeny)

---

## Iterační workflow
1. Spusť test: node scripts/kris-test.js <eshop>
2. Zkontroluj kritéria (výpis automatický)
3. Uprav route.js — vytvoř novou verzi (vXX+1)
4. Commitni: git add app/api/analyze/route.js && git commit -m "feat: route_v6_edge_vXX - popis" && git push
5. Počkej na Vercel deploy (~60s)
6. Spusť test na dalším e-shopu

## Kritéria hodnocení (musí splňovat)
1. Přesně 4 sekce: SKÓRE E-SHOPU / CO DĚLÁ DOBŘE / TOP 5 QUICK WINS / CLARITY CHECKLIST
2. Žádné zakázané fráze: "neověřil jsem", "nebylo možné ověřit", "nelze ověřit z dostupných dat"
3. Mobilní verze = N/A (bez fiktivního skóre)
4. CO DĚLÁ DOBŘE = přesně 3 e-shop-specifické body s konkrétním příkladem
5. Skóre = matematicky vypočítané z vážených podskóre (výpočet v závorce)
6. Quick Wins = 5× (Problem / Jak opravit max 3 kroky / Odhadovaný dopad % / Jak ověřit v Clarity)
7. CLARITY CHECKLIST = 5 specifických položek (Kde kliknout → Co sledovat → Jaké číslo = problém potvrzen)

## Váhy skóre
1. Důvěryhodnost 15% | 2. Produktové stránky 20% | 3. Navigace 10%
4. Objednávkový proces 20% | 5. Homepage 15% | 6. SEO 10% | 7. Zákaznická péče 10%

## CLARITY PROJEKTY
Weby s aktivním Clarity trackingem (Project ID doplnit ručně):
- davona.cz | Project ID: —
- eppi.cz, eppi.de, sperky-a-diamanty.sk | Project ID: —
- fanda-nhl.cz, fanda-nhl.sk | Project ID: —
- profi-dj.cz | Project ID: —
- spinkids.cz, spinkids.de, spinkids.gr, spinkids.hr, spinkids.hu, spinkids.it, spinkids.pl, spinkids.ro, spinkids.si, spinkids.sk | Project ID: —

## Zásobník e-shopů (nepoužité)
davona.cz
eppi.cz
eppi.de
sperky-a-diamanty.sk
fanda-nhl.cz
fanda-nhl.sk
profi-dj.cz
spinkids.cz
spinkids.de
spinkids.gr
spinkids.hr
spinkids.hu
spinkids.it
spinkids.pl
spinkids.ro
spinkids.si
spinkids.sk

## Použité e-shopy
davona.cz (v20, 51/100) | v-mart.cz (v21, 54/100) | spinkids.sk (v24, 52/100) | eppi.cz (v26, 54/100 s Clarity)

## Zakázané v route.js
- ROADMAP, IMPLEMENTAČNÍ PLÁN, TÝDENNÍ PLÁN jako extra sekce
- Fráze: "neověřil jsem", "nebylo možné ověřit", "nelze ověřit z dostupných dat"
- N/A pro jiné oblasti než Mobilní verze
- Celkové skóre bez výpočtu z podskóre

## Role Claude v analýze
Senior CRO poradce s 15+ lety praxe v české e-commerce. Mluvíš konkrétně, akčně, bez omluv a vaty.

## Audience reportu
Podklad pro klienta (majitel nebo manažer e-shopu). Srozumitelný bez technického pozadí, konkrétní aby věděl přesně co, proč a jak opravit.

## Byznys cíl
Rychlá identifikace TOP příležitostí pro zvýšení konverzí/obratu. Akční plán s měřitelným dopadem, ne akademická analýza.

## Zabezpečení (po hacker auditu, 2026-04-20)
Kompletni pravidla viz @SECURITY.md
- **Auth**: TOTP (Google Authenticator) → random 32B session token v Upstash Redis (24h TTL)
- **Cookie**: HttpOnly + Secure + SameSite=Strict, klient token nevidi
- **Session binding**: UA hash (SHA256 first 32 hex) — krádež cookie na jiny browser neplatna
- **Rate limit**: Upstash Redis (upstash-kv-teal-apple) — 5 auth/15min, 10 analýz/h, 200 uploadu/h per IP
- **Per-session limit**: 30 screenshotu per sessionId (2h TTL)
- **Storage**: Vercel Blob private (kris-reports-private, fra1) — přímé URL = 403
- **Screenshot URLs**: signed (HMAC sig + expires 15min) — session token NIKDY v URL
- **Headers**: HSTS 2 roky + preload, X-Frame-Options DENY, nosniff, Permissions-Policy, Cross-Origin-Opener-Policy
- **CSP**: default-src 'self', connect-src 'self', frame-ancestors 'none', object-src 'none'
- **Cache-Control**: private, no-store na vsech /api/* + Vary: Authorization
- **CORS**: jen cro-report.vercel.app (explicitni i pro /(.*) )
- **SSRF**: localhost, RFC1918, 169.254/16, 172.16-31/12, CGNAT, IPv6 ULA/link-local
- **Input validace**: TOTP presne 6 cislic, magic-number check screenshotu (JPEG/PNG/WebP)
- **Logování**: IP + akce na /api/auth, /api/analyze, /api/reports, /api/upload-screenshot
- **401 hlasky**: jednotne "Neautorizovany pristup" (nerozlisuje expired vs missing)
- **robots.txt**: Disallow /
- **Sdílený modul**: app/lib/auth.js
  - `createSession(uaHash)` / `verifySession(token, uaHash)` / `destroySession(token)`
  - `requireSession(req)` — helper pro route handlers (cte cookie)
  - `hashUA(userAgent)`, `SESSION_COOKIE`, `SESSION_COOKIE_OPTS`
  - `checkAuthRateLimit(ip)` / `checkAnalyzeRateLimit(ip)` / `checkUploadRateLimit(ip)`
  - `incrementSessionSlots(sessionId)` — per-session slot counter
  - `createScreenshotSignature` / `verifyScreenshotSignature` — signed URLs

## Env vars na Vercelu
ANTHROPIC_API_KEY, RESEND_API_KEY, CRON_SECRET, KRIS_REPORT_EMAIL,
BLOB_READ_WRITE_TOKEN (private store), TOTP_SECRET,
KV_REST_API_URL, KV_REST_API_TOKEN, KV_URL, REDIS_URL,
8× CLARITY_API_TOKEN_*

## Pravidla pro Claude Code
- Při auditu/review: projdi VŠECHNY soubory a endpointy napoprvé, nevynechávej nic
- Při implementaci zabezpečení: nejdřív navrhni KOMPLETNÍ seznam zranitelností, pak implementuj vše najednou — ne postupně po jedné
- Před commitem: ověř, že kód skutečně funguje (např. testni API curl příkazem)
- Při změně formátu tokenu/auth: upozorni, že uživatel se bude muset znovu přihlásit
- Nepoužívej fire-and-forget fetch pro důležité operace — vždy await
- Pouze modifikuj soubory ktere jsou explicitne pozadovane
- Pred predpokladem ze komponenta existuje — precti zdrojovy kod
- Pod 80% jistoty se zeptej uzivatele

## Scope Control
- Nemodifikuj soubory mimo zadany scope
- Nevytvarej extra soubory ani nerestrukturuj bez souhlasu
- Pred kazdou zmenou precti aktualni stav souboru
- Zeptej se pred sirokymi zmenami
