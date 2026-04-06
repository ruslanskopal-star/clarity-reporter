# KRIS Engine — Persistentní kontext pro Claude Code

## Projekt
- Live: https://cro-report.vercel.app/
- GitHub: ruslanskopal-star/clarity-reporter
- Vercel Team ID: team_YyUwpSM7UNIxeWdz7IsroSNz
- Vercel Project ID: prj_c6U3B3yWLJn9130Cpb9U50f42uPC


## Aktuální stav
- route.js = route_v6_edge_v26 (preflight, role/audience/cíl, doptávání, upozornění malý vzorek)
- page.js = page_v17
- Další verze: route → v27 | page → v18

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

## Co zbývá — v27
❌ Otestovat preflight UI živě na cro-report.vercel.app
❌ Knowledge base segmenty — vyplnit kosmetika.md, moda.md, elektronika.md
❌ Segment-specifické benchmarky v promptu (dle vybraného segmentu)

## Další krok
v27: otestovat preflight UI, vyplnit knowledge base pro top 3 segmenty

## Jak testovat (BEZ BROWSERU)
node scripts/kris-test.js davona.cz

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
