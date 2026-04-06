# KRIS Engine — Persistentní kontext pro Claude Code

## Projekt
- Live: https://cro-report.vercel.app/
- GitHub: ruslanskopal-star/clarity-reporter
- Vercel Team ID: team_YyUwpSM7UNIxeWdz7IsroSNz
- Vercel Project ID: prj_c6U3B3yWLJn9130Cpb9U50f42uPC

## Aktuální stav
- route.js = route_v6_edge_v21 (vážené skóre 15/20/10/20/15/10/10)
- page.js = page_v16
- Další verze: route → v22, v23... | page → v17...

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

## Zásobník e-shopů (nepoužité)
vonavydomov.eu
mojeromantika.cz
farmamix.sk
garazujeme.cz
sana-store.cz
utrhni.cz
levelys.sk
lepsizivot.shop
cestouprirody.eu
inzep.cz
pyzamka.cz
deeplove.cz
silluro.cz
olashop.cz
cyklodiskont.cz
marieli.cz
momenti.cz
sparkys.cz
bonfood.cz
vicnezkucharka.cz
salveo.cz
malinna.com
witsocks.cz
fixy.cz
eurokoberce.eu
zelenazeme.cz
vercajk-shop.cz
smatab.cz
horakgastro.com
leoness.sk
lovesilk.sk
just.love
pranita.cz
instalshop.sk
kraloveskoly.cz
katea.sk
represhop.eu
drdlik.cz
spime.cz
papery.cz
slickstyle.cz
kavatrobica.cz
mixton.cz
simply-beauty.eu
husse.cz
luxelleparis.com
lyss.cz
dapi.cz
drogeriadomov.sk
facederma.sk

## Použité e-shopy
cubenest.cz (v16, 64/100) | haltimo.com (v16, 52/100) | elenys.cz (v17, 62/100)
zahradnizabava.cz (v18, 58/100) | vikio.cz (v19, 41/100) | davona.cz (v20, 51/100) | v-mart.cz (v21, ?)

## Zakázané v route.js
- ROADMAP, IMPLEMENTAČNÍ PLÁN, TÝDENNÍ PLÁN jako extra sekce
- Fráze: "neověřil jsem", "nebylo možné ověřit", "nelze ověřit z dostupných dat"
- N/A pro jiné oblasti než Mobilní verze
- Celkové skóre bez výpočtu z podskóre
