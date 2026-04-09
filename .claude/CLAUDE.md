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
| Backend | Next.js Route Handlers (4 API endpointy) |
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
├── page.js              ← Frontend (auth UI, preflight, analyza, report render)
├── layout.js            ← Root layout (minimal, zadny globals.css)
├── icon.svg             ← Favicon
├── lib/
│   └── auth.js          ← Sdileny modul (HMAC tokeny, rate limit)
└── api/
    ├── analyze/route.js ← Hlavni CRO analyza (Anthropic streaming, preflight, Blob save)
    ├── auth/route.js    ← TOTP overeni → session token
    ├── reports/route.js ← CRUD reportu (Blob: GET/POST/DELETE)
    └── cron/daily-report/route.js ← Denni email souhrn (Resend)
knowledge/
├── sekce-checkout.md    ← Knowledge base: checkout
├── sekce-detail-produktu.md
├── sekce-kosik.md
├── reference-weby.md
└── segmenty/            ← Segment-specificke KB (TODO)
scripts/
└── kris-test.js         ← CLI tester (vola live API, overuje kriteria)
```

### Data Flow

1. Uzivatel zada TOTP kod → `POST /api/auth` → overi TOTP → vrati HMAC session token
2. Uzivatel zada URL → `POST /api/analyze` (action=preflight) → detekce kategorie + otazky
3. Uzivatel klikne Spustit → `POST /api/analyze` (streaming) → Anthropic API → SSE stream → klient renderuje
4. Po dokonceni streamu: server ulozi report do Vercel Blob (server-side save v route.js)
5. Klient take ulozi do Blob pres `POST /api/reports`
6. Report zobrazen → uzivatel muze kopirovat nebo tisknout (PDF pres print dialog)
7. Denne v 8:00 UTC: `GET /api/cron/daily-report` → posle email pres Resend

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
- route.js = route_v6_edge_v27 (preflight, role/audience/cíl, doptávání, server-side Blob save, auth + rate limit)
- page.js = page_v18 (TOTP auth obrazovka, preflight UI, Blob save)
- Další verze: route → v28 | page → v19
- Vercel projekt: jen `cro-report` (duplikát `clarity-reporter-njmo` smazán)

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

## Co zbývá — v28
❌ Knowledge base segmenty — vyplnit kosmetika.md, moda.md, elektronika.md
❌ Segment-specifické benchmarky v promptu (dle vybraného segmentu)
❌ Smazat staré Blob stores v dashboardu (kris-reports, kkwiki-blob)

## Další krok
v28: vyplnit knowledge base pro top 3 segmenty, segment-specifické benchmarky
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

## Zabezpečení (v27)
Kompletni pravidla viz @SECURITY.md
- **Auth**: TOTP (Google Authenticator) → HMAC session token (24h)
- **Rate limit**: Upstash Redis (upstash-kv-teal-apple) — 5 auth/15min, 10 analýz/h per IP
- **Storage**: Vercel Blob private (kris-reports-private, fra1) — přímé URL = 403
- **Headers**: HSTS, X-Frame-Options DENY, nosniff, XSS protection, Permissions-Policy
- **CORS**: jen cro-report.vercel.app
- **Logování**: IP + akce na /api/auth, /api/analyze, /api/reports
- **Sdílený modul**: app/lib/auth.js (createSessionToken, verifySessionToken, checkAuthRateLimit, checkAnalyzeRateLimit)

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
