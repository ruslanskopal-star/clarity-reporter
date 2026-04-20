# SECURITY.md — CRO Report

Bezpecnostni pravidla pro psani a review kodu v tomto projektu.
Posledni update: 2026-04-20 po hacker auditu (C1/C2/H1/H2/H3/H4/M1/M2/M3 opraveno).

---

## Zakladni principy

- Nikdy neduvěruj vstupu od uzivatele. Validuj a sanitizuj na kazde hranici systemu.
- Princip nejmensich opravneni vsude (API tokeny, env vars, pristup k Blob).
- Selhavej bezpecne. Chyby NESMI odhalit interni detaily uzivateli.
- Obrana do hloubky. Nespolehej se na jedinou vrstvu ochrany.
- Auth token NIKDY v URL query stringu (referer leak, logy, historie).
- Auth token NIKDY v localStorage (XSS = okamzita krádež).

---

## Autentizace

- TOTP (Google Authenticator) pro prvotni login (6-mistny kod, toleruje 1 window)
- Rate limit na login: max 5 pokusu / 15 minut per IP (Upstash Redis)
- Session token: random 32B (crypto.randomBytes) zakodovany base64url
- Session storage: Upstash Redis s TTL 24h (key: `session:<token>`)
- Payload v Redisu: `{ ua: <uaHash>, iat: <timestamp> }`
- UA binding: SHA256 User-Agent → first 32 hex chars. Pri overeni sessionu musi UA souhlasit.
- Cookie: `HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
- TOTP secret NIKDY v klientskem kodu — zustava jen na serveru
- Po uspesnem prihlaseni server Set-Cookie — token nevrací v response body
- Klient nikdy nevidi session token, nemuze ho cist z JS (HttpOnly)

---

## Autorizace

- Kazdy API endpoint MUSI overit session token pred jakoukoli operaci
- Pouzij `requireSession(req)` z `app/lib/auth.js` — cte cookie, overi UA binding
- NIKDY neprijímej session token v query stringu nebo request body (pouze cookie)
- Pri expirovane/neplatne session: 401 `{ error: 'Neautorizovany pristup' }`
- Cron endpoint pouziva CRON_SECRET v Authorization headeru (ne session cookie)
- Signed screenshot URLs: HMAC sig + expires v URL (nezavisle na session tokenu, 15 min TTL)

---

## Validace vstupu

- Validovat vsechny vstupy na serveru, bez ohledu na klientskou validaci
- `clientUrl`: validovat format URL, omezit delku (max 200 znaku), odmitnout interni adresy
- TOTP kod: presne 6 cislic (`/^\d{6}$/`)
- `sessionId`: alphanumeric 8-64 znaku
- `slotId`: alphanumeric 1-30 znaku
- Screenshoty: max 5MB, magic-number validace (JPEG FFD8FF, PNG 89504E47, WebP RIFF...WEBP)
- API requesty: parsovat v try/catch, nikdy nepredpokladat strukturu

---

## Prevence SSRF

Server fetchuje `clientUrl` pro crawling meta dat. Blokovane adresy:

- `localhost`, `0.0.0.0`, `::1`, `.local`, `.internal`, `.localhost`
- `0.0.0.0/8`, `10.0.0.0/8`, `127.0.0.0/8`
- `169.254.0.0/16` (AWS IMDS, link-local)
- `172.16.0.0/12` (RFC1918 — presne 172.16-172.31, ne naive `172.*`)
- `192.168.0.0/16`
- `100.64.0.0/10` (CGNAT)
- IPv6: `fe80::/10` (link-local), `fc00::/7` (ULA), `ff00::/8` (multicast), `::`

Implementace: `isInternalHost(host)` v `app/api/analyze/route.js`.
Povolene jen `http:` a `https:` schema.

---

## Prevence injekci

### XSS (Cross-Site Scripting)

- React auto-escaping — NEPOUZIVAT `dangerouslySetInnerHTML`
- CSP header: `default-src 'self'; connect-src 'self'; frame-ancestors 'none'; object-src 'none'`
- Pri XSS: token v HttpOnly cookie nejde exfiltrovat, connect-src 'self' zabrani POST na atacker origin
- Sanitizovat text analyzy pred renderovanim (renderLine funkce)

### Command Injection

- Nikdy nepredavat uzivatelsky vstup do shell prikazu
- URL od uzivatele se pouziva jen jako parametr pro Anthropic API, ne pro fetch do shellu

### CSRF

- SameSite=Strict cookie — cross-origin requesty cookie neposlou
- CORS explicitni na `https://cro-report.vercel.app`
- Stale validovat session na kazdem state-changing endpointu

---

## Ochrana dat

- Blob storage je PRIVATE — prime URL vrati 403
- Reporty pristupne jen pres autentizovany endpoint `/api/reports`
- Screenshoty pristupne jen pres signed URL `/api/screenshot?...sig=...&expires=...`
- NIKDY nelogovat citlive udaje (tokeny, TOTP kody, API klice, session IDs)
- Logovat: IP + akce (login/fail/analyze/report) — BEZ obsahu requestu a tokenu
- Security headers (vsechny routes):
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Content-Security-Policy` (viz nize)
- API-specific headers:
  - `Cache-Control: private, no-store, max-age=0, must-revalidate`
  - `Vary: Authorization, Cookie`
  - `Access-Control-Allow-Origin: https://cro-report.vercel.app`

---

## Content-Security-Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
object-src 'none';
```

`connect-src 'self'` zabrani XSS payloadu poslat data na atacker origin.
`frame-ancestors 'none'` duplikuje `X-Frame-Options: DENY` pro moderni browsery.
`'unsafe-inline'` je nutne kvuli inline stylum v `page.js` (design system rozhodnuti).

---

## API Security

- Autentizovat KAZDY endpoint (zadne nahodne verejne endpointy)
- Rate limit na vsechny kriticke operace:
  - Auth: 5 pokusu / 15 min per IP
  - Analyze: 10 analyzí / 1h per IP
  - Upload: 200 screenshotu / 1h per IP
  - Per-session: 30 screenshotu / session (2h TTL)
- Validovat Content-Type na prichozich requestech
- Vracet konzistentni chybovy format: `{ error: "popis" }` BEZ internich detailu
- NIKDY nevracet `e.message` primo klientovi — pouzit genericke hlasky
- 401 hlasky JEDNOTNE: `"Neautorizovany pristup"` — nerozlisovat expired vs missing vs malformed
- HTTP status kody: 400 (bad input), 401 (unauthorized), 413 (payload too large), 429 (rate limit), 500 (server error)

---

## Sprava secretu

- NIKDY commitovat secrety, API klice nebo credentials do repozitare
- Vsechny credentials v env promennych na Vercelu (`vercel env`)
- Env vars: ANTHROPIC_API_KEY, TOTP_SECRET, BLOB_READ_WRITE_TOKEN, KV_REST_API_*, RESEND_API_KEY, CRON_SECRET
- `.gitignore` MUSI obsahovat: `.env`, `.env.local`, `.env*.local`, `credentials.json`, `*.pem`, `*.log`
- Pred commitem: zkontrolovat diff na nahodne pridane secrety
- Rotace secretu: po jakomkoli podezreni na kompromitaci
- TOTP_SECRET se pouziva i jako HMAC secret pro screenshot signed URLs — pri rotaci invaliduje vsechny galerie

---

## Dependencies

- Udrzovat dependencies aktualni, zvlaste security patche
- Pred pridanim nove dependency: zkontrolovat maintainera, licenci, popularitu
- Pinovat verze v package.json (vyhnout se neocekavanym zmenam)
- Aktualni: Next.js ^14.2.35, @anthropic-ai/sdk (jen route pouziva fetch), @upstash/redis, @upstash/ratelimit, @vercel/blob, otpauth
- `productionBrowserSourceMaps: false` — ne-leak source mapy

---

## Logovani

- Logovat: auth udalosti (login OK/FAIL), rate limit hity, report operace (GET/POST/DELETE), upload/delete screenshotu
- Logovat: IP adresu + akci na kazdem endpointu
- NIKDY nelogovat: request body (muze obsahovat citliva data), session tokeny, API klice, TOTP kody, UA hashe
- Format: `[ENDPOINT] AKCE ip=X detail=Y`
- Logy zmizi s function instance — pro audit trail zvazit externi storage (v32 roadmap)

---

## Error Handling

- Uzivateli zobrazit genericke hlasky ("Chyba serveru", "Neplatny vstup", "Neautorizovany pristup")
- Detailni chybove informace logovat JEN na serveru (console.error)
- NIKDY nevracet stack traces, databazove chyby, nebo cesty k souborum v odpovedi
- Vzor pro API error response:
  ```js
  // SPRAVNE
  return new Response(JSON.stringify({ error: 'Chyba serveru' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  })

  // SPATNE — leaks internals
  return Response.json({ error: e.message }, { status: 500 })
  ```

---

## robots.txt

Aplikace je gated (vyzaduje TOTP login). `app/robots.txt` obsahuje:
```
User-agent: *
Disallow: /
```
Brani indexaci v Google vcetne API endpointu.

---

## .gitignore minimum

```
node_modules
.next
.env
.env.local
.env*.local
.vercel
*.log
*.pem
credentials.json
.DS_Store
```
