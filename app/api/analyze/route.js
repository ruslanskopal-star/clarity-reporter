import { NextResponse } from 'next/server'

// Vercel: max 60s pro Hobby plán – streaming obchází timeout
export const maxDuration = 60

// ============================================================
// KRIS - Knowledge-based Report Intelligence System
// Engine postavený na metodologii ESHOP BOOSTER
// + znalostní báze z blogu Ondřeje Ilinčeva (ilincev.com)
// Verze 4.0 – vytěžený obsah článků (Batch 1–4, ~80 článků)
// ============================================================

const KRIS_KNOWLEDGE_BASE = `
# KRIS ZNALOSTNÍ BÁZE v4 – ESHOP BOOSTER + ILINČEV METODOLOGIE

## PRVNÍ DOJEM A DŮVĚRYHODNOST
- Návštěvník si udělá první dojem za 0,1 sekundy – vizuální kvalita webu přímo ovlivňuje vnímanou důvěryhodnost
- Halo efekt: krásný web = lepší produkt v mysli zákazníka, i když to není pravda
- Nejdůležitější trust signály: recenze, fotky reálných zákazníků, certifikáty, média ve kterých se e-shop objevil
- "Above the fold" musí okamžitě komunikovat: co prodáváte, proč u vás, a výzvu k akci
- Social proof "above the fold": počet zákazníků, hodnocení, loga médií/partnerů

## OHYB STRÁNKY (The Fold) – KRITICKÁ ZÓNA
- Google studie inzerátů: nad ohybem je obsah viditelný v 68 % případů, pod ohybem jen ve 40 %
- Nielsen Norman: průměrný rozdíl v pozornosti nad vs. pod ohybem = 84 % ve prospěch obsahu nad ohybem
- Nejlepší pozice CTA: těsně nad ohybem nebo přímo v první obrazovce
- Uživatelé skrolují POUZE pokud je obsah první obrazovky dostatečně motivující
- Každá druhá polovina inzerátů na internetu nebude nikdy nikým spatřena (špatné umístění)
- Platí pro všechna zařízení – velikost ohybu se liší, princip zůstává stejný

## SLIDER NA HOMEPAGE – PROČ NEFUNGUJE
- Banner blindness: lidi ignorují vše co se hýbe nebo připomíná reklamu – slider dělá oboje najednou
- Kobercový nálet sdělení: místo jednoho silného sdělení bombardujete zákazníka více nekonkrétními sděleními
- Zpomaluje načítání a odvádí pozornost od konverze
- Řešení: statický hero banner s JEDNOU silnou nabídkou a JEDNOU výzvou k akci
- Pokud musíte mít slider: personalizujte – 1.–2. návštěva = průřez sortimentem + výhody; 3.+ = oblíbené kategorie + akce

## SLOGAN A POSITIONING
- 90 % sloganů jsou prázdné fráze: "Vaše spokojenost je naší prioritou", "Kvalita, které věříte"
- Dobrý slogan říká CO děláte pro KOHO a PROČ je to jiné – ne jak se cítíte jako firma
- Test: zakryjte logo a dejte slogan konkurenci – pokud pasuje, slogan nic neříká
- Místo sloganu testujte konkrétní value proposition: "Doručíme do 24h nebo vrátíme peníze"
- 3 otázky pro dobrý slogan: Pro koho? Co přesně? Proč zrovna my?

## KONKURENČNÍ VÝHODA A DIFERENCIACE
- Většina firem tvrdí totéž: kvalita, servis, cena – to není diferenciace
- Skutečná diferenciace: specializace na niku, rychlost, komunita, udržitelnost, garance
- Konkurovat pouze cenou je sebevražda – vždy přijde někdo levnější (Čína, Amazon)
- Brand funguje jako placebo – stejný produkt s lepším brandem zákazníci vnímají jako kvalitnější
- AirBnB efekt: stejné bílé layouty, stejné sans-serif fonty → weby jsou zaměnitelné a neviditelné
- Bezpečný design = průměrný design = neviditelný design; záměrně porušte jednu konvenci

## PSYCHOLOGIE STATUSU V NÁKUPECH
- Téměř každý nákup má složku statusu – co o mně říká to, co kupuji?
- Luxusní zboží: zákazník nekupuje produkt, kupuje status a příslušnost ke skupině
- Cena jako signál kvality: příliš nízká cena u prémiového produktu snižuje vnímanou hodnotu
- Veblenův efekt: u luxusního zboží vyšší cena = vyšší poptávka (opak běžného trhu)
- Prémiové balení, limitované edice, exkluzivní přístup, personalizace zvyšují vnímaný status

## LUXUS A PRÉMIOVÉ E-SHOPY
- Prémiové značky: NIKDY plošné slevy (poškozují brand), raději limitované edice a exkluzivní nabídky
- Fotografie: vždy lifestyle, vždy nejvyšší kvalita, detail materiálů a řemesla (craftsmanship)
- Copywriting luxusu: smyslový jazyk, příběh produktu, původ materiálu
- Zákaznická péče u luxusu: osobní přístup je nutnost, ne bonus
- Veblenův efekt: neslevujte prémiové produkty – cena je součástí hodnoty

## PSYCHOLOGIE DÁRKŮ A VÁNOCE
- Obdarovaný si váží dárku průměrně jen na 82 % jeho skutečné ceny (studie)
- Peněžní dárky a poukazy mají nejnižší vnímanou hodnotu – i když jsou prakticky nejflexibilnější
- Produkty s příběhem (odkud pochází, jak vznikly) mají vyšší vnímanou hodnotu
- Pro e-shopy: dárkové balení, průvodní text na přání, možnost skrytí ceny = zvyšují konverzi
- Vánoce: zákazníci jsou ochotni platit více a nakupují impulzivně
- Deadlines doručení (poslední termín objednání před Vánoci) = silný konverzní element

## PRODUKTOVÉ STRÁNKY A FOTOGRAFIE
- 75 % zákazníků považuje fotky za klíčové při rozhodování o koupi (Weebly)
- 58 % zákazníků chce vidět produkt ze všech stran – minimum jsou 3–5 fotek
- Každý 5. zákazník vrátí produkt, protože fotka neodpovídala realitě
- Lifestyle fotky (produkt v kontextu) výrazně zvyšují konverze u oblečení, doplňků, nábytku
- Zoom funkce na produktových fotkách je nutnost
- Video produktu zvyšuje konverze až o 80 % u komplexnějších produktů
- Popis produktu: zákazníci nečtou, skenují. Bullet pointy > odstavce. Nejdůležitější info první.
- Dostupnost skladem musí být jasně viditelná (zelená = skladem, červená = vyprodáno)

## VYPRODANÉ PRODUKTY – SPRÁVNÝ POSTUP
- Dočasně nedostupný produkt bez alternativy = 99 % uživatelů odchází ke konkurenci okamžitě
- Tlačítko "Přidat do košíku" které nic nedělá = NEJHORŠÍ možný stav – vždy ho deaktivujte nebo skryjte
- Víte kdy naskladníte: dejte možnost objednat s delší dodací lhůtou NEBO formulář "Hlídací pes"
- Nevíte kdy: nabídněte alternativní produkty, přesměrujte, dejte "Hlídací pes – pošleme e-mail"
- Trvale vyprodané produkty: NESMAZÁVEJTE stránku (SEO hodnota), přesměrujte na alternativy
- Specifická velikost/varianta není skladem: upozornění jen pro danou variantu, ostatní zůstanou dostupné

## NAVIGACE A KATEGORIE
- Hamburger menu na desktopu je chyba – skrývá navigaci a snižuje konverze
- Do 10 položek: horizontální navigace; 10+ položek: vertikální navigace vlevo (vzor: Alza – 20 kategorií)
- Uživatelé tráví pohledem 80 % času na levé části obrazovky
- Drobečková navigace: lokační (kde jste) a atributová (aktivní filtry)
- Interní vyhledávání: zákazníci kteří vyhledávají konvertují 2–3× lépe než ti co browsují

## INTERNÍ VYHLEDÁVÁNÍ NA E-SHOPU
- Zákazníci kteří použijí vyhledávání konvertují 2–3× lépe – prioritizujte tuto funkci
- Autocomplete/suggest: zobrazujte nejen texty ale i produkty s obrázkem přímo v našeptávači
- Nulové výsledky = promarněná příležitost: nabídněte alternativy, podobné produkty, kontakt
- Sledujte co zákazníci vyhledávají = zlatý důl pro merchandising a sortiment
- Překlepy a synonyma: vyhledávač musí rozumět "tricko" i "tričko", "iphone" i "iPhone"

## MEGA MENU – 10 PRAVIDEL
- Maximálně 3 úrovně; 4. úroveň řešte uvnitř stránek kategorií
- Musí se vejít na jednu obrazovku – co se nevejde, odstraňte
- Každá kategorie musí být klikací (ne jen rozcestník)
- Ikony kategorií pomáhají orientaci a rychlosti skenování
- Card sorting s reálnými uživateli: nechte zákazníky seskupit produkty dle vlastní logiky (OptimalSort)
- Tree testing: 30 uživatelů, 10 otázek – ověří zda zákazníci najdou co hledají
- Používejte slovník zákazníků, ne interní terminologii firmy

## DROPDOWN MENU – LEPŠÍ ALTERNATIVY
- Dropdown skrývá možnosti = zvyšuje kognitivní zátěž
- Lepší alternativy pro 2–5 možností: radio buttony, segmented control, karty/dlaždice
- Pro 6+ možností: vyhledávání s autocomplete > dropdown
- Výběr pohlaví: nikdy dropdown – radio buttony nebo karty
- Výběr roku narození: přímé textové pole (type="number")

## IKONY – PRAVIDLA POUŽITÍ
- Ikony bez popisků jsou hazard – uživatelé je neznají tak jak si myslíme
- Výjimky (fungují i bez textu): lupa, košík, hamburger menu, hvězdička, domek
- Ikony s popiskem vždy > ikony bez popisku
- Testujte zda uživatelé ikonu správně identifikují: stačí 5 uživatelů

## A/B TESTOVÁNÍ – KDY, JAK, KOLIK VYDĚLÁ
- Méně než 1 000 konverzí/měsíc = A/B testování nemá smysl; iterujte bez testování
- Průměrné ROI A/B testování: 223 % (dle dostupných studií)
- Nejčastější první test: barva CTA tlačítka – je to plýtvání; testujte raději nadpisy a layout
- Statistická signifikance min. 95 %, ideálně 99 %
- Testujte vždy jen jednu hypotézu s jasným důvodem
- Nejlepší věci k testování (sestupně): nadpis/headline, text CTA, cena dopravy, pořadí produktů

## A/A TESTOVÁNÍ – PŘED KAŽDÝM A/B TESTEM
- A/A test = testujete dvě identické verze stránky – žádná změna obsahu
- Ověříte: správnou implementaci nástroje, míru šumu v datech, absenci bias
- Pomáhá nastavit minimální detekovatelný efekt (MDE) pro následné A/B testy
- Proveďte A/A test před prvním A/B testem a průběžně při změně nástroje

## MIKROTEXTY A UX COPYWRITING – KONKRÉTNÍ ČÍSLA
- Změna 3 slov v nadpisu = +10 % obratu (dokumentovaný případ z praxe)
- Veeam: "Request a quote" → "Request pricing" = +161,66 % prokliků na CTA
- Google ubytování: "Book a room" → "Check availability" = +17 % engagement
- Chybové hlášky: konkrétní + přátelské + nápomocné ("Zadejte e-mail ve formátu jmeno@email.cz")
- Prázdné stavy jsou konverzní příležitost – nabídněte alternativu, ne jen "Nic jsme nenašli"
- Tlačítko musí říkat co se stane po kliknutí: "Získat nabídku zdarma" > "Odeslat"
- Headline na landing page je nejdůležitější element – testujte jako první

## POP-UPY – CO FUNGUJE A CO NE (analýza 2 miliard pop-upů)
- Top 10 % pop-upů nabízejí něco užitečného a relevantního ke konkrétní stránce
- Dokumentované konverze lead magnet pop-upů: šablony e-mailů = 61 %; srovnání košíků = 47 %
- Newsletter pop-up: zobrazujte až po přečtení alespoň 50 % článku
- Exit intent pop-up: poslední šance pro nabídku dopravy zdarma nebo slevy
- Podmínky dobrého pop-upu: správný timing + relevantní obsah + snadné zavření + hodnotná nabídka

## VÝČITKY PO NÁKUPU (Buyer's Remorse)
- Buyer's remorse = přirozený jev, který lze aktivně omezit post-purchase komunikací
- 14 dní na vrácení: komunikujte jako silnou výhodu, ne jen jako právní povinnost
- Jak omezit: potvrzovací e-mail "Udělali jste skvělé rozhodnutí", social proof i po nákupu, snadné vrácení
- Čím starší zákazník, tím více výčitek – potřebují více ujištění

## ZDRAŽENÍ – JAK KOMUNIKOVAT A NEPŘIJÍT O ZÁKAZNÍKY
- Nikdy neoznamujte zdražení až na faktuře (případ Hotjar: +400 % bez upozornění = hromadný odliv)
- 5 legitimních důvodů ke zdražení: zlepšení produktu, nikdo se nehádá o cenu, výrazné ROI pro klienty, 3–12 měsíců od posledního zdražení, záporná rentabilita
- Bezpečná míra zdražení: do 10–15 %
- Oznámení: dopředu s vysvětlením a možností prepay za staré ceny

## LEAD MAGNET A CONTENT UPGRADE
- Lead magnet = hodnotný obsah zdarma výměnou za e-mail; funguje 2–4× lépe než pouhý formulář
- Content upgrade k danému článku konvertuje 2–4× lépe než obecný lead magnet
- Nejlepší formáty: checklisty, šablony, srovnávací tabulky, kalkulačky, průvodci

## LOAJALITA ZÁKAZNÍKŮ – CO OPRAVDU FUNGUJE
- Nadšení zákazníci ≠ loajální zákazníci
- Slevy NEbudují loajalitu – přitahují cenově citlivé zákazníky závislé na slevách
- Loajalitu buduje: konzistentní zkušenost, rychlé řešení problémů, komunita, sdílené hodnoty
- NPS: sledujte trend v čase, ne jen absolutní číslo
- United Airlines případ: jeden negativní virální zážitek = ztráta 180M USD tržní hodnoty

## STRÁNKA "O NÁS"
- 3.–5. nejnavštěvovanější stránka e-shopu – ignorovat ji je strategická chyba
- Musí obsahovat: proč firma existuje, příběh zakladatele s fotkou, tým, hodnoty, kontakt
- Příběh zakladatele zvyšuje důvěryhodnost a emocionální vazbu
- Buďte lidští, konkrétní a autentičtí

## CHECKOUT A OBJEDNÁVKOVÝ PROCES (analýza 200 e-shopů)
- Zásilkovna vede (9 500 výdejních míst); Česká pošta klesá kvalitou
- Doporučení: 3 dopravci na adresu + 2 na výdejny; sjednoťte výdejní místa do jedné položky s mapou (dělá to jen 10 %)
- Ceny dopravy: průměr 96 Kč na adresu, 70 Kč výdejní místo. Doporučení: 99 Kč / 69 Kč
- Datum doručení: zobrazujte u každé dopravy – dělá to jen polovina e-shopů
- Doprava zdarma od hranice: nabízí 75 % e-shopů, medián je 1 500 Kč
- Vzorec pro hranici dopravy zdarma: AOV + (cena dopravy / marže). Příklad: 1 250 + (69 / 0,3) = 1 480 Kč
- KRITICKÁ CHYBA: neptejte se na doručovací adresu při osobním odběru (54 % e-shopů to dělá)
- Pamatujte si vyplněné údaje (56 % e-shopů si to nepamatuje)
- Registraci navrhujte až na děkovací stránce – stačí se zeptat na heslo (dělá to jen 15 % e-shopů)
- Obchodní podmínky: "Kliknutím na Koupit souhlasíte s OP" místo checkboxu
- Minimalizujte počet polí ve formuláři – každé extra pole snižuje konverze
- U dobírky uveďte "lze platit hotově i kartou" (70 % e-shopů tuto info nemá)

## PŘÍSTUPNOST A TESTOVÁNÍ UX
- Od června 2025 povinná přístupnost pro e-shopy nad určitou velikost (EU zákon)
- Testování s levou rukou: simuluje omezenou motoriku – odhalí problémy s velikostí prvků
- Snížená svítivost displeje při testování: odhalí problémy s kontrastem
- Minimální velikost dotykové plochy na mobilu: 7 × 7 mm s 2mm rozestupy
- Vyhněte se animacím při motion sensitivity
- Kontrastní poměr textu: minimálně 4,5:1 pro normální text, 3:1 pro velký text
- Formuláře: labely musí být viditelné – ne jen placeholder který zmizí při psaní
- 5 uživatelů odhalí 85 % UX problémů (Jakob Nielsen)

## UŽIVATELSKÝ VÝZKUM – JAK SE SPRÁVNĚ PTÁT
- Většina UX výzkumů je znehodnocena sugestivními otázkami
- Špatná otázka: "Líbí se vám náš nový design?" → zákazník řekne ano ze slušnosti
- Správná otázka: "Popište mi, jak byste postupovali při hledání produktu X" → behaviorální, otevřená
- Nikdy nezačínejte rozhovor ukázkou řešení – nejdřív zmapujte problém a současné chování
- Ptejte se na minulé chování, ne na hypotetické budoucí ("Koupili byste to?" je bezcenné)
- 5 uživatelů odhalí 85 % UX problémů – nepotřebujete velký vzorek

## PSYCHOLOGIE POZORNOSTI A SOUSTŘEDĚNÍ
- Uživatel udrží soustředění při složitém úkolu cca 20 minut; při pasivním browsování jen 8 sekund
- Systémová reakce do 100ms: uživatel vnímá jako okamžitou; 1s+ = frustrace a opuštění
- Nenutťte uživatele přepínat kontext: potvrzení e-mailu mimo web = ztráta až 40 % uživatelů
- Zobrazujte důležité informace ve středu obrazovky nebo jako overlay – ne jako novou záložku

## REGISTRACE A PŘIHLAŠOVÁNÍ
- Registrace při objednávce = konverzní killer; nabízejte nákup bez registrace vždy
- Guest checkout je nutnost – zákazník se zaregistruje sám pokud bude chtít
- Registraci navrhujte až na děkovací stránce (1 pole: "Uložit vaše údaje? Zadejte heslo:")
- Sociální login (Google, Facebook) = méně tření, více konverzí
- Zapomenuté heslo: posílejte reset link, ne dočasné heslo

## PRŮMĚRNÁ HODNOTA OBJEDNÁVKY (AOV)
- Zvyšovat AOV: upsell/cross-sell, balíčky, množstevní slevy, doplňkové služby
- Hranici dopravy zdarma nastavte mírně nad průměrnou AOV – zákazník si přiloží produkt
- POZOR: agresivní slevy zvyšují AOV, ale snižují marži – sledujte marži na objednávku, ne jen AOV

## RECENZE A SOCIÁLNÍ DŮKAZ
- Recenze jsou nejsilnější trust signál – 92 % zákazníků čte recenze před nákupem
- Perfektní 5.0 je podezřelé – optimum je 4,2–4,7
- Recenze s fotkami konvertují 2× lépe než textové
- Odpovídejte na negativní recenze veřejně
- Pod 10 recenzí zákazníci nedůvěřují; 50+ je solidní základ
- Recenze žádejte e-mailem 7–14 dní po doručení = nejvyšší response rate

## CENOTVORBA A PSYCHOLOGIE CEN (EU regulace 2023)
- EU regulace: zobrazujte nejnižší cenu za posledních 30 dní jako referenční
- Škrtnutá cena musí být skutečná předchozí cena
- Psychologické ceny: 999 Kč > 1 000 Kč; zaokrouhlené ceny = signál luxusu
- Kotevní cena: nejdražší varianta vlevo mění vnímání ostatních cen
- Příliš velká sleva snižuje vnímanou kvalitu produktu

## PŘÍPADOVKA: TRENÝRKÁRNA – 4× OBRAT ZA 6 LET
- Filtry seřazeny podle skutečné používanosti (MS Clarity): Velikost → Značka → Barva
- Použité filtry viditelné na začátku výpisu + tlačítko "Zrušit vše"
- Barvy jako barevné puntíky (ne text)
- Pamatování vybrané velikosti z filtru do detailu produktu

## PŘÍPADOVKA: ČESKÁ POJIŠŤOVNA – REDESIGN ZA 7 TÝDNŮ
- Navigace musí odpovídat mentálnímu modelu zákazníka, ne org. struktuře firmy
- Kalkulačka: nejasný aktivní stav, neklikatelné prvky vypadající klikatelně, 5–10s načítání bez progress baru

## PŘÍPADOVKA: FAKTUROID A SPA.CZ
- Fakturoid: +48,3 % registrací – zjednodušení onboardingu a jasný value prop
- Spa.cz: +21,5 % objednávek – lepší filtrování, důvěryhodnost, mobilní verze
- Redesign = odstranění konverzních bariér, ne nový vizuál

## AMAZON – INOVACE V LOGISTICE A E-COMMERCE
- Amazon Go (bezpokladenní obchody): kamery + počítačové vidění; platba automatická při odchodu
- Amazon má 10 000+ aktivních patentů (2023) – desetinásobek oproti roku 2000
- Anticipated shipping: balíčky odesílány ještě před objednávkou na základě AI predikce
- Lekce pro e-shopy: logistika je nejsilnější Amazonova výhoda – konkurujte specializací a zákaznickým zážitkem, ne cenou

## DESIGN ZÁKLADY PRO VÝVOJÁŘE A NEDESIGNÉRY
- Bílý prostor (whitespace) = aktivní designový prvek zvyšující čitelnost, ne prázdné místo
- Zarovnání: vše na stránce by mělo být zarovnáno na skrytou mřížku
- Typografie: maximálně 2 řezy písma; jasná hierarchie (H1 > H2 > body)
- Primární akční barva: jen pro nejdůležitější akce (CTA tlačítko)
- Gestalt principy: blízkost (co je blízko = patří k sobě), podobnost, kontinuita
- Vizuální hierarchie: zákazníkovo oko sleduje design, ne obsah – navrhněte cestu očí

## IKEA EFEKT – PSYCHOLOGIE VLASTNICTVÍ
- Produkty které sami sestavíme/vytvoříme si ceníme více (Norton, Mochon, Ariely)
- Aplikace na e-shop: konfigurátor produktu, personalizace, sestavení vlastního balíčku
- Optimální obtížnost: středně náročné s jasně viditelným výsledkem
- Konfigurátor zvyšuje vnímanou hodnotu a snižuje pravděpodobnost vrácení

## MOBILNÍ VERZE
- Více než 60 % návštěvníků e-shopů přichází z mobilu, ale jen 30 % tam nakoupí
- Formuláře: správný typ klávesnice (type="tel", type="email", type="number")
- Tlačítka: minimální 44×44 px, dostatečné mezery
- Sticky košík / CTA tlačítko výrazně zvyšuje konverze
- Každá sekunda navíc při načítání = 7 % pokles konverzí
- Thumb zone: nejdůležitější akce do spodní části obrazovky
- Vyhněte se animacím a paralax scrollingu na mobilu (motion sensitivity, výkon)

## EMAILOVÝ MARKETING A RETENCE
- Získat nového zákazníka stojí 5–7× více než udržet stávajícího
- Opuštěný košík: série 3 e-mailů (1h, 24h, 72h) – průměrná konverze 5–15 %
- Personalizace předmětu (jméno zákazníka) zvyšuje open rate o 26 %
- Post-purchase sekvence: potvrzení + benefity → tracking → cross-sell po doručení → recenze po 7–14 dnech

## DARK PATTERNS – ČEHO SE VYVAROVAT
- Skryté poplatky v posledním kroku = nejčastější důvod opuštění košíku
- Předvybrané souhlasy s newsletterem nebo pojištěním jsou v EU ilegální
- Falešná urgence poškozuje brand dlouhodobě
- Confirmshaming, roach motel, skryté předplatné = regulatorní riziko (EU DSA)

## DESIGN JE MANIPULACE – PSYCHOLOGIE
- Každé UX rozhodnutí ovlivňuje chování uživatele – design nikdy není neutrální
- Nudge theory: malé podněty vedou k žádoucímu chování
- Barvy: červená = urgence, zelená = bezpečí/potvrdit, modrá = důvěra
- F-pattern a Z-pattern: nejdůležitější info do levého horního rohu
- FOMO: omezená dostupnost zvyšuje hodnotu; Endowment effect: "30 dní na vrácení" funguje

## CHECKBOXY A PRÁVNÍ UX
- Příliš mnoho souhlasů frustruje uživatele a snižuje konverze
- Předvybrané souhlasy jsou v EU ilegální
- Souhlas s OP: "Kliknutím na Koupit souhlasíte s OP" místo checkboxu

## COOKIES A GDPR
- Žádné předzaškrtnuté checkboxy – čistý opt-in
- "Odmítnout vše" musí být stejně snadné jako "Přijmout vše"
- Bez odsouhlasení nesmíte ukládat žádná data – ani analytická

## PŘEDPLATNÉ A SUBSCRIPTION MODELY
- Roční předplatné vydělá 2× více při správném nastavení ceny a komunikace
- Úspora musí být okamžitě zřejmá v Kč i v %
- Nejlepší moment pro nabídku ročního: ihned po registraci a při 1. obnově měsíčního

## AI A AUTOMATIZACE V E-COMMERCE
- AI personalizace doporučení zvyšuje AOV průměrně o 10–30 %
- Chatboty: fungují pro FAQ, selhávají u komplexních problémů
- Automatizace e-mailových sekvencí = nejvyšší ROI z automation

## OBSAH KTERÝ DLOUHODOBĚ ZVYŠUJE PRODEJE
- Vzdělávací obsah buduje autoritu a organický traffic – nejlevnější dlouhodobý marketing
- Nejlepší formáty: průvodci "jak na X", srovnání produktů, případové studie, FAQ
- Evergreen obsah >> trendový obsah pro dlouhodobé výsledky
- Produktový obsah: řešení konkrétního problému zákazníka > technické parametry

## AI A SEO – NOVÁ PRAVIDLA 2025/2026 (Czech Online Expo 2026, Jan Kvasnička)
- Google aktivně penalizuje weby s převahou AI obsahu: od 09/2025 penalizace při >80 % AI obsahu, od 01/2026 již při >60 % AI obsahu – trend se bude zpřísňovat
- AI obsah bez přidané hodnoty = nulová šance na viditelnost v Google; e-shopy s 200+ AI články mají obsah s přidanou hodnotou blížící se nule
- Správné použití AI: AI jako asistent při tvorbě obsahu, NE jako autor; výsledek musí přinášet unikátní pohled, zkušenost nebo data
- Google hodnotí weby přes tzv. "Skóre kvality vstupní stránky" (hodnota 1–99, není veřejně dostupná, liší se pro hlavní doménu a dílčí URL)
- Skóre kvality ovlivňuje: pozice v SEO, cenu prokliku v PPC reklamě, zobrazení v AI overview/AI mode, ranking interního prolinkování
- Co zvyšuje skóre kvality: kvalita a unikátnost obsahu, čitelnost (min. 13px písmo), mediální obsah, správné touch zóny, interní prolinkování

## GOOGLE AI OVERVIEW A AI MODE – DOPADY NA E-SHOPY
- AI overview (dříve SGE) mění chování uživatelů: část dotazů je zodpovězena přímo v Google bez kliknutí na web
- E-shopy musí optimalizovat obsah tak, aby byly citovány v AI odpovědích Google (= nový typ "SEO")
- Strukturovaná data (schema.org) jsou klíčová pro zařazení do AI odpovědí
- Důvěryhodnostní matice webu: Google hodnotí E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) stále přísněji v době AI
- Signature prvky webu (unikátní prvky které odlišují web) zvyšují skóre kvality a důvěryhodnost

## TECHNICKÁ UX PRAVIDLA DLE GOOGLE (2026)
- Minimální velikost písma: 13px – Google penalizuje stránky s menším písmem při hodnocení skóre
- Touch zóny na mobilu musí být správně implementovány (min. 44×44px, dostatečné mezery)
- Mediální obsah (obrázky, video) na vstupní stránce zvyšuje skóre kvality stránky
- Obsah mimo základní části e-shopu musí být správně vykreslen na mobilu
- Interní prolinkování a práce s crawl budgetem přímo ovlivňuje viditelnost v Google
- Vizuální obsah generovaný AI: Google jej dokáže identifikovat stejně jako textový AI obsah – používejte reálné fotografie

## DŮVĚRYHODNOSTNÍ MATICE PRO E-SHOPY
- Důvěryhodnost webu = kombinace technických, obsahových a vizuálních signálů
- Klíčové složky: reálné recenze zákazníků, viditelný tým a kontakty, fyzická adresa, certifikáty a členství, média kde byl e-shop zmíněn
- Rychlost webu jako trust signál: pomalý web = nedůvěryhodný web v mysli zákazníka
- HTTPS, bezpečnostní certifikáty, jasná politika vrácení = základní hygienické minimum
- Konzistentní vizuální identita napříč všemi kanály zvyšuje vnímanou profesionalitu
`

export async function POST(req) {
  try {
    const { clientName, withClarity } = await req.json()

    if (!clientName) {
      return NextResponse.json({ success: false, error: 'Chybí jméno klienta' })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API klíč není nastaven' })
    }

    const systemPrompt = `Jsi KRIS – Knowledge-based Report Intelligence System, expert CRO analytik e-shopů metodologie ESHOP BOOSTER.

Tvá znalostní báze:
${KRIS_KNOWLEDGE_BASE}

TVOJE ÚLOHA: Analyzuj e-shop klienta a vytvoř strukturovanou CRO analýzu. Piš v češtině, konkrétně a akcionovatelně. Každé doporučení musí být specifické pro daný e-shop, ne obecné.

POVINNÁ STRUKTURA ANALÝZY (dodržuj přesně tato označení pro správné zobrazení):

KRITICKE PRIORITY: [název sekce]
1. [konkrétní problém s dopadem na konverze]
   - Proč to bolí: [vysvětlení]
   - Jak opravit: [konkrétní řešení]

VYSOKA PRIORITA: [název sekce]
1. [doporučení]
   - Dopad: [odhad dopadu]
   - Jak na to: [konkrétní kroky]

STREDNI PRIORITA: [název sekce]
1. [doporučení]
   - Jak na to: [kroky]

QUICK WINS: Rychlé výhry (do 1 týdne)
1. [co jde udělat rychle a levně]

Analyzuj tyto oblasti: homepage a první dojem, produktové stránky a fotografie, navigace a kategorie, košík a checkout, trust signály a recenze, mobilní verze, ceny a slevy, copywriting a mikrotexty.

Pokud konkrétní e-shop neznáš, vycházej z obecné praxe v dané kategorii produktů a aplikuj znalostní bázi KRIS.`

    // Zavoláme Anthropic API se stream: true
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4000,
        stream: true,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Připrav kompletní KRIS CRO analýzu pro e-shop: ${clientName}

Zaměř se na nejčastější problémy v dané kategorii produktů. Buď konkrétní – jmenuj konkrétní prvky webu, konkrétní čísla, konkrétní kroky. Analýza musí být přímo použitelná jako akční plán.`,
          },
        ],
      }),
    })

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text()
      return NextResponse.json({ success: false, error: 'Chyba API: ' + err })
    }

    // Přeposíláme SSE stream přímo klientovi
    const stream = new ReadableStream({
      async start(controller) {
        const reader = anthropicResponse.body.getReader()
        const decoder = new TextDecoder()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue
              const data = line.slice(6).trim()
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)

                // Extrahujeme text z content_block_delta
                if (
                  parsed.type === 'content_block_delta' &&
                  parsed.delta?.type === 'text_delta' &&
                  parsed.delta?.text
                ) {
                  // Pošleme jen text jako SSE event
                  const sseEvent = `data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`
                  controller.enqueue(new TextEncoder().encode(sseEvent))
                }

                // Signalizujeme konec streamu
                if (parsed.type === 'message_stop') {
                  controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                }
              } catch {
                // Ignorujeme non-JSON řádky
              }
            }
          }
        } catch (e) {
          const errorEvent = `data: ${JSON.stringify({ error: e.message })}\n\n`
          controller.enqueue(new TextEncoder().encode(errorEvent))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message || 'Neznámá chyba' })
  }
}
