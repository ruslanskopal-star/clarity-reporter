# AUDIT.md — Týdenní hloubkový audit CRO Report

> Provádět 1× týdně. Na začátku session zkontroluj datum posledního auditu.
> Pokud uplynulo 7+ dní, nabídni provedení.

---

## Poslední audit
- **Datum:** 2026-04-09
- **Výsledek:** 3 CRITICAL + 4 HIGH opraveno, vše čisté
- **Další plánovaný:** 2026-04-16

---

## 1. Security audit

### Error handling — žádné leaky klientovi
```bash
# Nesmí být žádný výsledek (e.message v JSON response klientovi)
grep -rn "error: e\.message\|error:.*err\b" app/api/ | grep -v console
```

### HMAC porovnání
- `app/lib/auth.js` — musí používat `timingSafeEqual`, nikdy `===`

### Input validace
- `app/api/analyze/route.js` — clientUrl: typ, délka (max 200), URL schema (jen http/https), blokované interní adresy

### Auth na všech endpointech
- `/api/analyze` — ✅ verifySessionToken
- `/api/auth` — ✅ TOTP (vstupní bod, nepotřebuje session)
- `/api/reports` — ✅ verifySessionToken (GET/POST/DELETE)
- `/api/cron/daily-report` — ✅ CRON_SECRET v Authorization header

### Rate limiting
- Auth: 5 pokusů / 15 min per IP
- Analyze: 10 / h per IP (jen plná analýza, ne preflight)

### Headers
- HSTS, X-Frame-Options DENY, nosniff, XSS, Permissions-Policy
- CORS jen na cro-report.vercel.app

### Secrets
- Žádné secrets v kódu nebo gitu
- `.gitignore` obsahuje: .env, .env.local, .env*.local, .vercel, *.log, *.pem, credentials.json, .DS_Store

---

## 2. Endpoint audit

Pro každý endpoint ověř:

### POST /api/auth
- [ ] Přijímá jen 6-místný číselný kód
- [ ] Rate limit funguje
- [ ] Vrací generické chybové hlášky
- [ ] Loguje IP + výsledek

### POST /api/analyze (preflight)
- [ ] Auth check
- [ ] SSRF validace URL
- [ ] Nespotřebovává analyze rate limit
- [ ] Vrací JSON s detectedCategory + questions

### POST /api/analyze (full)
- [ ] Auth check
- [ ] Rate limit check
- [ ] SSRF validace URL
- [ ] Streaming funguje
- [ ] Server-side Blob save po streamu
- [ ] Generické error hlášky v SSE

### GET/POST/DELETE /api/reports
- [ ] Auth check na všech metodách
- [ ] Blob list/save/delete funguje
- [ ] Content-Type header na všech responses

### GET /api/cron/daily-report
- [ ] CRON_SECRET auth
- [ ] Čte reálná data z Blob (posledních 24h)
- [ ] Posílá brandovaný HTML email
- [ ] Loguje výsledek

---

## 3. Error audit

### Kontrola logování
```bash
# Všechny console.error musí mít [ENDPOINT] prefix
grep -rn "console.error" app/api/
```

Očekávaný formát: `console.error('[ENDPOINT] Popis:', e.message)`

### Kontrola error responses
```bash
# Všechny JSON error responses musí mít Content-Type header
grep -rn "JSON.stringify.*error" app/api/ | grep -v "Content-Type"
```

Nesmí být žádný výsledek (každá error response musí mít `headers: { 'Content-Type': 'application/json' }`).

---

## 4. Kódový audit

### Dependencies
```bash
npm audit
```
- 0 critical povinně
- High — posoudit relevanci (Next.js high se týká image optimizer a rewrites, které nepoužíváme)

### Nepoužívané dependencies
```bash
# Zkontrolovat zda se každý package z package.json skutečně importuje
```

### Dead code
- Funkce definované ale nikde nevolané
- Zakomentovaný kód
- TODO komentáře — splnit nebo smazat

### Build
```bash
npm run build
```
Musí projít čistě bez chyb.

---

## 5. Funkční kontrola

### Frontend (page.js)
- [ ] Auth screen se zobrazí
- [ ] Po TOTP kódu se přepne na input
- [ ] Preflight detekuje kategorii
- [ ] Loading animace běží
- [ ] Report se renderuje správně
- [ ] Kopírovat / PDF funguje
- [ ] Historie se ukládá do localStorage

### Data flow
- [ ] Report se ukládá do Blob (server-side)
- [ ] Žádná duplicitní Blob save
- [ ] Cron email obsahuje reálná data

---

## Postup auditu

1. Přečti tento dokument
2. Spusť grep/bash příkazy z každé sekce
3. Projdi každý endpoint (přečti kód)
4. Zapiš nálezy s CRITICAL/HIGH/MEDIUM/LOW
5. Oprav vše co jde opravit hned
6. Aktualizuj datum "Poslední audit" a "Další plánovaný" v tomto souboru
7. Commitni opravy + aktualizovaný AUDIT.md
