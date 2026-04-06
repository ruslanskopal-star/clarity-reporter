# KRIS Engine — Persistentní kontext pro Claude Code

## Projekt
- Live: https://cro-report.vercel.app/
- GitHub: ruslanskopal-star/clarity-reporter
- Vercel Team ID: team_YyUwpSM7UNIxeWdz7IsroSNz
- Vercel Project ID: prj_c6U3B3yWLJn9130Cpb9U50f42uPC

## Role Claude v analýze
- Senior CRO poradce s 15+ lety praxe v české e-commerce
- Mluví konkrétně a akčně, žádné akademické fráze

## Audience reportu
- Podklad pro klienta (majitel e-shopu nebo e-commerce manažer)
- Srozumitelný bez technického pozadí, jazyk byznysu ne vývoje

## Byznys cíl
- Akční plán s měřitelným dopadem na tržby
- Každé doporučení: co udělat, kolik to přinese, jak poznat že to funguje

## Aktuální stav
- route.js = route_v6_edge_v26 (preflight, role/audience/cíl, doptávání)
- page.js = page_v16
- Další verze: route → v27 | page → v17...

## Co je hotovo ve v25
✅ Vercel env vars: RESEND_API_KEY + KRIS_REPORT_EMAIL + CRON_SECRET + ANTHROPIC_API_KEY přidány
✅ Cron endpoint /api/cron/daily-report — {"ok":true} ✓, email doručen
✅ vercel.json: cron každý den v 8:00 UTC aktivní

## Co je hotovo ve v26
✅ Doptávání — 3 volitelné selecty v UI (segment, roční obrat, hlavní problém)
✅ shopContext injektován do system promptu — benchmarky a Quick Wins kalibrovány dle profilu
✅ Selecty se zvýrazní oranžově když jsou vyplněny

## Co zbývá — v27
❌ Test v26 na davona.cz nebo eppi.cz s vyplněným kontextem
❌ Knowledge base segmenty — vyplnit kosmetika.md, moda.md, elektronika.md
❌ Segment-specifické benchmarky v promptu (dle vybraného segmentu)

## Další krok
v27: test doptávání na reálném e-shopu, pak vyplnit knowledge base pro top 3 segmenty

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
davona.cz (v20, 51/100) | v-mart.cz (v21, 54/100) | spinkids.sk (v24, 52/100)

## Zakázané v route.js
- ROADMAP, IMPLEMENTAČNÍ PLÁN, TÝDENNÍ PLÁN jako extra sekce
- Fráze: "neověřil jsem", "nebylo možné ověřit", "nelze ověřit z dostupných dat"
- N/A pro jiné oblasti než Mobilní verze
- Celkové skóre bez výpočtu z podskóre
