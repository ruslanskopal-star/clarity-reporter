import { NextResponse } from 'next/server'

// ============================================================
// KRIS - Knowledge-based Report Intelligence System
// Engine postavený na metodologii ESHOP BOOSTER
// + znalostní báze z blogu Ondřeje Ilinčeva (ilincev.com)
// Verze 3.0 – vytěžený obsah článků (Batch 1+2, ~40 článků)
// ============================================================

const KRIS_KNOWLEDGE_BASE = `
# KRIS ZNALOSTNÍ BÁZE v3 – ESHOP BOOSTER + ILINČEV METODOLOGIE

## PRVNÍ DOJEM A DŮVĚRYHODNOST
- Návštěvník si udělá první dojem za 0,1 sekundy – vizuální kvalita webu přímo ovlivňuje vnímanou důvěryhodnost
- Halo efekt: krásný web = lepší produkt v mysli zákazníka, i když to není pravda
- Nejdůležitější trust signály: recenze, fotky reálných zákazníků, certifikáty, média ve kterých se e-shop objevil
- "Above the fold" musí okamžitě komunikovat: co prodáváte, proč u vás, a výzvu k akci
- Slider na homepage je mrtvý – zobrazuje jen první slide. Místo slideru: statický hero banner s jednou silnou nabídkou
- Animace a efekty zpomalují načítání a odvádějí pozornost od konverze
- Social proof "above the fold": počet zákazníků, hodnocení, loga médií/partnerů

## SLIDER NA HOMEPAGE – PROČ NEFUNGUJE (4 důvody)
- Banner blindness: lidi se naučili ignorovat vše co se hýbe nebo připomíná reklamu – slider dělá oboje najednou
- Kobercový nálet sdělení: místo jednoho silného sdělení zákazníka bombardujete více sděleními, která ho většinou nezajímají
- Zpomaluje načítání a odvádí pozornost od konverze
- Řešení: statický hero banner s JEDNOU silnou nabídkou a JEDNOU výzvou k akci
- Pokud musíte mít slider: personalizujte – 1.-2. návštěva = průřez sortimentem + výhody oproti konkurenci; 3.+ návštěva = oblíbené kategorie + akce
- Ideálně uzpůsobte slider segmentu uživatele (nový vs. vracející se)

## SLOGAN A POSITIONING
- 90 % sloganů jsou prázdné fráze: "Vaše spokojenost je naší prioritou", "Kvalita, které věříte"
- Dobrý slogan říká CO děláte pro KOHO a PROČ je to jiné – ne jak se cítíte jako firma
- Test: zakryjte logo a dejte slogan konkurenci – pokud pasuje, slogan nic neříká
- Místo sloganu testujte konkrétní value proposition: "Doručíme do 24h nebo vrátíme peníze"
- Příklad: Fondee – místo "Investujte chytře" → "Akciové portfolio za 15 minut, bez poplatků za výběr"
- 3 otázky pro dobrý slogan: Pro koho? Co přesně? Proč zrovna my?

## KONKURENČNÍ VÝHODA A DIFERENCIACE
- Většina firem tvrdí totéž: kvalita, servis, cena – to není diferenciace
- Skutečná diferenciace: specializace na niku, rychlost, komunita, udržitelnost, garance
- Konkurovat pouze cenou je sebevražda – vždy přijde někdo levnější (Čína, Amazon)
- Brand funguje jako placebo – stejný produkt s lepším brandem zákazníci vnímají jako kvalitnější
- Najděte "unfair advantage" – co konkurence nemůže snadno zkopírovat
- Specializace vždy vítězí nad generalisty v mysli zákazníka
- AirBnB efekt: stejné bílé interiéry, stejné bezpatkové fonty, stejné layouty → e-shopy jsou zaměnitelné a neviditelné
- Bezpečný design = průměrný design = neviditelný design; záměrně porušte jednu konvenci, nesledujte trendy slepě

## STRÁNKA "O NÁS"
- 3.–5. nejnavštěvovanější stránka e-shopu – ignorovat ji je strategická chyba
- Musí obsahovat: proč firma existuje (účel/mise), příběh zakladatele s fotkou, tým s reálnými fotkami, hodnoty, kontakt
- Příběh zakladatele zvyšuje důvěryhodnost a emocionální vazbu se zákazníkem
- Nepoužívejte "O nás" jako reklamní brožuru – zákazníci to poznají a odchází
- Buďte lidští, konkrétní a autentičtí – je to místo kde lidi rozhodují zda vám věří

## PRODUKTOVÉ STRÁNKY A FOTOGRAFIE
- 75 % zákazníků považuje fotky za klíčové při rozhodování o koupi (Weebly)
- 58 % zákazníků chce vidět produkt ze všech stran – minimum jsou 3–5 fotek
- Každý 5. zákazník vrátí produkt, protože fotka neodpovídala realitě
- Lifestyle fotky (produkt v kontextu použití) výrazně zvyšují konverze u oblečení, doplňků, nábytku
- Zoom funkce na produktových fotkách je nutnost
- Video produktu zvyšuje konverze až o 80 % u komplexnějších produktů
- Popis produktu: zákazníci nečtou, skenují. Bullet pointy > odstavce. Nejdůležitější info první.
- Dostupnost skladem musí být jasně viditelná (zelená = skladem, červená = vyprodáno)
- Fotky na bílém pozadí vs. lifestyle: testujte dle kategorie – elektronika = bílé, móda = lifestyle

## VYPRODANÉ PRODUKTY – SPRÁVNÝ POSTUP
- Dočasně nedostupný produkt bez alternativy = 99 % uživatelů odchází ke konkurenci okamžitě
- Tlačítko "Přidat do košíku" které nic nedělá je NEJHORŠÍ možný stav – vždy ho deaktivujte nebo skryjte
- Víte kdy naskladníte: dejte možnost objednat s delší dodací lhůtou (viditelně zvýrazněte) NEBO formulář "Hlídací pes – pošleme e-mail až bude skladem"
- Nevíte kdy: nabídněte alternativní produkty, přesměrujte na podobné, dejte "Hlídací pes"
- Trvale vyprodané produkty: NESMAZÁVEJTE stránku (SEO hodnota zachována), přesměrujte na nejbližší alternativy
- Specifická velikost/varianta není skladem: nabídněte upozornění jen pro danou variantu, ostatní varianty musí zůstat dostupné a objednatelné
- Stránka "Dočasně nedostupné" bez dalšího kontextu = ztracený zákazník

## NAVIGACE A KATEGORIE
- Hamburger menu na desktopu je chyba – skrývá navigaci a snižuje konverze
- Do 10 položek: horizontální navigace (uživatelé na ni zvyklí, většina e-shopů)
- 10+ položek: vertikální navigace vlevo (Alza: 20 kategorií, funguje dobře)
- Uživatelé tráví pohledem 80 % času na levé části obrazovky
- Drobečková navigace (breadcrumbs): 2 typy – lokační (kde jste) a atributová (jaké filtry máte aktivní)
- Vyhledávání na e-shopu: zákazníci kteří vyhledávají konvertují 2–3× lépe než ti co browsují
- Interní vyhledávání: sledujte co zákazníci hledají = zlatý důl pro merchandising a sortiment
- Kategorie: méně je více – příliš mnoho kategorií mate; testujte card sorting s reálnými zákazníky

## MEGA MENU – 10 PRAVIDEL
- Mega menu: maximálně 3 úrovně (lišta → kategorie → podkategorie); 4. úroveň musí být řešena uvnitř stránek kategorií
- Mega menu se musí vejít na jednu obrazovku – co se nevejde, uřízněte nebo přesuňte
- Každá kategorie musí být klikací (ne jen rozcestník na podkategorie)
- Ikony kategorií pomáhají orientaci a rychlosti skenování
- Card sorting s reálnými uživateli: nechte zákazníky seskupit produkty dle vlastní logiky (nástroj: OptimalSort)
- Tree testing: 30 uživatelů, 10 otázek – ověří zda zákazníci najdou co hledají; typické otázky: "Kde byste hledali produkt X?"
- Card sorting odhalí jak zákazníci přirozeně pojmenovávají kategorie – používejte jejich slovník, ne interní terminologii firmy
- Výstupy tree testingu ukážou úspěšnost jednotlivých navigačních cest a odhalí slepé uličky

## DROPDOWN MENU – LEPŠÍ ALTERNATIVY
- Dropdown skrývá možnosti = uživatel nevidí co si vybírá, zvyšuje kognitivní zátěž při výběru
- Lepší alternativy pro malý počet možností (2–5): radio buttony, segmented control, karty/dlaždice
- Pro velký počet (6+): vyhledávání s autocomplete > dropdown
- Výběr pohlaví: nikdy dropdown – použijte radio buttony nebo karty
- Výběr roku narození: nahraďte přímým textovým polem (type="number"), ne dropdown se stovkami položek
- Výběr státu/kraje: výjimka – zde dropdown nebo autocomplete vyhledávání je vhodné

## IKONY – PRAVIDLA POUŽITÍ
- Ikony bez popisků jsou hazard – uživatelé je neznají tak jak si myslíme
- Výjimky (ikony fungující i bez textu): lupa (vyhledávání), košík/vozík (nákup), hamburger (menu), hvězdička (oblíbené), domek (homepage)
- Ikony s popiskem vždy > ikony bez popisku – kombinujte vždy kde je místo
- Nikdy nenahrazujte navigační text pouze ikonami – zákazník musí vědět kam jde
- Testujte zda uživatelé ikonu správně identifikují: stačí 5 uživatelů (metoda 5 sekundového testu)

## A/B TESTOVÁNÍ – KDY, JAK, KOLIK VYDĚLÁ
- Méně než 1 000 konverzí/měsíc = A/B testování nemá smysl, ztrácíte čas; iterujte bez testování
- Průměrné ROI A/B testování: 223 % (dle dostupných studií a dat z praxe)
- Nejčastější první test: barva CTA tlačítka – je to plýtvání; testujte raději nadpisy, layout, ceny dopravy
- Statistická signifikance min. 95 %, ideálně 99 % – bez toho výsledky nelze interpretovat
- Testujte vždy jen jednu hypotézu – každý test musí mít jasný důvod proč ho děláte (ne náhodné změny)
- Nejlepší věci k testování (sestupně podle dopadu): nadpis/headline, CTA tlačítko a jeho text, cena dopravy, pořadí produktů v kategorii, počet polí ve formuláři
- Barevnost tlačítka je přeceňovaná – důležitější je text na tlačítku a jeho umístění
- 15 typů A/B testů: klasický A/B, A/B/n (více variant), MVT (multivariate – testuje kombinace), split URL, server-side, client-side, feature flags, bandit testing (adaptivní)
- A/A test před prvním A/B testem: ověří správnou implementaci nástroje, změří míru šumu v datech, zkontroluje bias; průběžně nastavte minimální detekovatelný efekt (MDE)

## MIKROTEXTY A UX COPYWRITING – KONKRÉTNÍ ČÍSLA
- Změna 3 slov v nadpisu = +10 % obratu (dokumentovaný případ z praxe Ilinčeva)
- Veeam: "Request a quote" → "Request pricing" = +161,66 % prokliků na CTA
- Google ubytování: "Book a room" → "Check availability" = +17 % engagement (slovo "book" bylo příliš závazné a odrazovalo)
- Mikrotexty = dialog mezi uživatelem a rozhraním; cíl: minimum slov, maximum kontextu a jasnosti
- Typické mikrotexty: texty na tlačítkách, popisky polí formuláře, error hlášky, prázdné stavy, helper texty, tooltips
- Chybové hlášky: konkrétní + přátelské + nápomocné (ne jen "Chyba" – ale "Zadejte e-mail ve formátu jmeno@email.cz")
- "Přihlásit se" / "Registrovat" > "Sign-in" / "Sign-up" (první slovo je stejné = zpomaluje rozhodnutí, v češtině problém odpadá)
- Prázdné stavy (košík, výsledky vyhledávání) jsou konverzní příležitost – ne jen "Nic jsme nenašli" ale nabídněte alternativu
- Pište texty tak aby jim rozuměl puberťák – základ pochopitelnosti UX textů
- Tlačítko musí říkat co se stane po kliknutí: ne "Odeslat" ale "Získat nabídku zdarma"; ne "Koupit" ale "Přidat do košíku"
- Headline na landing page je nejdůležitější element – testujte jako první věc

## POP-UPY – CO FUNGUJE A CO NE (analýza 2 miliard pop-upů)
- Top 10 % pop-upů mají jedno společné: nabízejí něco užitečného a RELEVANTNÍHO ke stránce kde se uživatel nachází
- Dokumentované konverze lead magnet pop-upů: šablony transakčních e-mailů = 61 %; srovnání košíků 100 e-shopů = 47 %
- Newsletter pop-up: zobrazujte až po přečtení alespoň 50 % článku – zákazník zjistil že je obsah dobrý a má důvod se přihlásit
- Exit intent pop-up (při odchodu kurzoru mimo stránku): poslední šance, funguje pro nabídku dopravy zdarma nebo jednorázové slevy
- Podmínky dobrého pop-upu: (1) správný timing, (2) relevantní obsah k dané stránce, (3) snadné zavření velkým viditelným křížkem, (4) hodnotná nabídka
- Hlavní nevýhody špatných pop-upů: otravné, špatný timing (hned při příchodu), pasivně-agresivní tón, obtížné zavření

## VÝČITKY PO NÁKUPU – BUYER'S REMORSE
- Buyer's remorse = kognitivní disonance po nákupu; přirozený jev který lze aktivně omezit
- Čím starší zákazník, tím více výčitek (více zkušeností se špatnými finančními rozhodnutími)
- 14 dní na vrácení: zákazník si nekupuje jen produkt, ale jistotu – komunikujte to jako silnou výhodu, ne jen jako právní povinnost
- Jak aktivně omezit výčitky: (1) potvrzovací e-mail "Udělali jste skvělé rozhodnutí" s reaffirmací benefitů, (2) ukazujte social proof i po nákupu (hodnocení ostatních), (3) snadné vrácení bez výmluv a otázek
- Post-purchase e-mail sekvence: klíčová pro racionalizaci rozhodnutí zákazníka a budování dlouhodobé loajality
- Zákon ČR: online nákup do 14 dní vrátit bez udání důvodu – slušné firmy z toho dělají výhodu, ne povinnost

## ZDRAŽENÍ – JAK KOMUNIKOVAT A NEPŘIJÍT O ZÁKAZNÍKY
- Nikdy neoznamujte zdražení až na faktuře – případ Hotjar: +400 % bez upozornění = hromadný odliv a negativní PR
- 5 legitimních důvodů ke zdražení: (1) výrazně jste zlepšili produkt/službu, (2) nikdo se nehádá o cenu a akceptuje první nabídku, (3) výrazně vydělávate klientům (násobky jejich investice), (4) uplynulo 3–12 měsíců od posledního zdražení, (5) nejste ziskoví
- Nejhorší důvod ke zdražení: záporná rentabilita bez jiné hodnoty pro zákazníka
- Doporučení: měňte ceny 1–4× ročně (ne jen směrem nahoru – testujte nové balíčky, upsell, zrušení slev)
- Bezpečná míra zdražení bez výrazného odlivu: do 10–15 %
- Správné oznámení zdražení: dopředu s dostatečným předstihem, s vysvětlením proč, s možností prepay za staré ceny, s osobní komunikací pro velké zákazníky

## LEAD MAGNET A CONTENT UPGRADE
- Lead magnet = hodnotný obsah zdarma výměnou za e-mail; funguje 2–4× lépe než pouhý formulář
- Content upgrade = specifický lead magnet přímo k danému článku (např. checklista k článku o checkoutu) – konvertuje 2–4× lépe než obecný lead magnet na homepage
- Nejlépe fungující formáty lead magnetů: checklisty, šablony, srovnávací tabulky, kalkulačky, e-book průvodci, vzorové dokumenty
- Pouhý formulář "Přihlaste se k newsletteru" v patičce nestačí – potřebujete jasný důvod PROČ se přihlásit
- Newsletter databáze = byznysový poklad; budujte ji aktivně přes všechny kanály

## LOAJALITA ZÁKAZNÍKŮ – CO OPRAVDU FUNGUJE
- Nadšení zákazníci ≠ loajální zákazníci; spokojení zákazníci od vás klidně odejdou ke konkurenci
- United Airlines příklad: Dave Carroll + "United Breaks Guitars" = 150M+ views, pokles hodnoty akcií o 180M USD – jeden negativní zážitek může být fatální
- Slevy NEbudují loajalitu – budují závislost na slevách a přitahují pouze cenově citlivé zákazníky
- Co skutečně buduje loajalitu: (1) konzistentní skvělá zkušenost při každém kontaktu, (2) rychlé a férové řešení problémů, (3) komunita kolem značky a sdílené hodnoty, (4) personalizace a pocit výjimečnosti
- NPS (Net Promoter Score): "Jak pravděpodobně nás doporučíte od 0–10?" – promotéři (9–10), pasivní (7–8), kritici (0–6); sledujte trend NPS v čase
- Věrnostní program musí mít jasnou, jednoduchou a okamžitou hodnotu – složité bodové systémy odrazují více než pomáhají
- Nejlepší loajalitní nástroj: zákazník musí cítit že mu firma skutečně pomáhá, ne jen prodává

## CHECKOUT A OBJEDNÁVKOVÝ PROCES (analýza 200 e-shopů)
- Dopravci: Zásilkovna vede (9 500 výdejních míst), Česká pošta klesá kvalitou. Doporučení: 3 dopravci na adresu + 2 na výdejny
- Sjednoťte výdejní místa různých dopravců do jedné položky s výběrem z mapy (dělá to jen 10 % e-shopů)
- Ceny dopravy: průměr 96 Kč na adresu, 70 Kč výdejní místo. Doporučení: 99 Kč / 69 Kč (psychologické ceny)
- Datum doručení: zobrazujte u každé dopravy – dělá to jen polovina e-shopů! Zákazníci to chtějí vědět
- Doprava zdarma od určité hranice: nabízí 75 % e-shopů, medián je 1 500 Kč
- Vzorec pro výpočet hranice dopravy zdarma: AOV + (cena dopravy / marže). Příklad: 1 250 + (69 / 0,3) = 1 480 Kč
- KRITICKÁ CHYBA: Neptejte se na doručovací adresu, když si zákazník vybral osobní odběr! Dělá to 54 % e-shopů
- Pamatujte si vyplněné údaje – 56 % e-shopů si to nepamatuje = frustrující UX
- Registraci navrhujte až na děkovací stránce (stačí se zeptat na heslo) – dělá to jen 15 % e-shopů
- Obchodní podmínky: místo checkboxu použijte oznámení "Kliknutím na Koupit souhlasíte s OP"
- Minimalizujte počet polí ve formuláři – každé extra pole snižuje konverze
- U dobírky uveďte "lze platit hotově i kartou" – 70 % e-shopů tuto info nemá

## PRŮMĚRNÁ HODNOTA OBJEDNÁVKY (AOV)
- Zvyšovat AOV lze přes: upsell/cross-sell, balíčky, množstevní slevy, doplňkové služby
- Upsell = nabídněte lepší verzi produktu. Cross-sell = nabídněte doplněk (k botám – ponožky)
- Hranici dopravy zdarma nastavte mírně nad průměrnou AOV – zákazník si přiloží produkt
- POZOR: Agresivní slevy zvyšují AOV, ale snižují marži. Sledujte průměrnou marži na objednávku, ne jen AOV

## RECENZE A SOCIÁLNÍ DŮKAZ
- Recenze jsou nejsilnější trust signál – 92 % zákazníků čte recenze před nákupem
- Negativní recenze nejsou problém – perfektní hodnocení 5.0 je podezřelé. Optimum je 4,2–4,7
- Recenze s fotkami od zákazníků konvertují 2× lépe než textové
- Odpovídejte na negativní recenze veřejně – ukazuje to zákaznický servis a péči
- Počet recenzí je důležitý – pod 10 recenzí zákazníci nedůvěřují; 50+ je solidní základ
- Recenze žádejte e-mailem 7–14 dní po doručení = nejvyšší response rate

## CENOTVORBA A PSYCHOLOGIE CEN (EU regulace 2023)
- Nová EU regulace: musíte zobrazovat nejnižší cenu za posledních 30 dní jako referenční cenu
- Škrtnutá cena musí být skutečná předchozí cena, ne uměle navýšená
- Psychologické ceny: 999 Kč funguje lépe než 1 000 Kč; 997 Kč je lepší než 995 Kč
- Zaokrouhlené ceny (100, 500, 1 000 Kč) signalizují luxus a prémiovost
- Kotevní cena (anchoring): nejdražší varianta vlevo mění vnímání ostatních cen jako "rozumných"
- Příliš velká sleva snižuje vnímanou kvalitu produktu
- Zobrazujte úsporu v korunách (Ušetříte 350 Kč) i v procentech – záleží na kategorii a výši slevy

## PŘÍPADOVKA: TRENÝRKÁRNA – 4× OBRAT ZA 6 LET
- Klíčové UX změny filtrace v kategorii:
  - Filtry seřazeny podle skutečné používanosti (data z analytics/MS Clarity): Velikost → Značka → Barva (cena posuvník sestoupila z 1. místa)
  - Použité filtry viditelné na začátku výpisu produktů + jednoklikové tlačítko "Zrušit vše"
  - Barvy zobrazeny jako barevné puntíky místo textu – okamžité vizuální rozpoznání
  - Pamatování vybrané velikosti z filtru do detailu produktu (předvybrání varianty v detailu)
- Princip: odstraňujte vše co uživatele neposouvá k cíli konverze

## PŘÍPADOVKA: ČESKÁ POJIŠŤOVNA – REDESIGN ZA 7 TÝDNŮ
- Stávající web z roku 2011: struktura navigace odpovídala interním potřebám firmy, ne zákazníkům
- Plánováno 7,5 měsíce → dodáno za 7 týdnů (rychlá iterace)
- Analýza prvního dojmu: první krok každého redesignu (uživatelé citliví na dětskou grafiku a nevhodné primární barvy)
- Klíčové zjištění: struktura navigace musí odpovídat mentálnímu modelu zákazníka, ne organizační struktuře firmy
- Hypoteční kalkulačka UX problémy: nejasné označení aktivního stavu, neklikatelné prvky které vypadají klikatelně, 5–10s načítání bez indikátoru průběhu, špatně nastavená analytika

## IKEA EFEKT – PSYCHOLOGIE VLASTNICTVÍ
- Produkty které sami sestavíme/vytvoříme si ceníme více než hotové – dokázáno výzkumem Nortona, Mochona a Arielyho
- Aplikace na e-shop: konfigurátor produktu, personalizace (gravírování, výběr barvy/materiálu), sestavení vlastního balíčku
- Klíč: nesmí být příliš jednoduché (bez pocitu vlastní práce) ani příliš složité (frustrace a opuštění)
- Optimální obtížnost: středně náročné s jasně viditelným výsledkem vlastní práce
- Konfigurátor zvyšuje vnímanou hodnotu produktu a snižuje pravděpodobnost vrácení

## COOKIES A GDPR – SPRÁVNÁ IMPLEMENTACE
- Cookie banner nesmí nepřiměřeně překážet webu ani být podmínkou pro vstup
- Žádné předzaškrtnuté checkboxy – ani pro analytické cookies – čistý opt-in
- "Odmítnout vše" musí být stejně snadno dostupné jako "Přijmout vše" (jeden klik)
- Tlačítko souhlasu nesmí být v křiklavých zdůrazněných barvách (zvýhodňování souhlasu je ilegální)
- Bez odsouhlasení nesmíte ukládat žádná data – ani analytická (Google Analytics atd.)
- Decentní banner = nikdo na něj neklikne = nulová data; agresivní banner = ilegální; hledejte zlatou střední cestu

## OBSAH KTERÝ DLOUHODOBĚ ZVYŠUJE PRODEJE
- Vzdělávací obsah buduje autoritu a organický traffic (SEO) – nejlevnější dlouhodobý marketing
- Nejlepší formáty: průvodci "jak na X", srovnání produktů, případové studie, odpovědi na FAQ zákazníků
- Evergreen obsah (časově neomezený) >> trendový obsah pro dlouhodobé výsledky a ROI
- Produktový obsah: detailní popis řešení konkrétního problému zákazníka > technické parametry
- Délka článku: odpovězte na otázku tak dobře jak jen lze, pak skončete; délka není cíl

## PROČ VŠE VYPADÁ STEJNĚ – DIFERENCIACE DESIGNEM
- Studie Vitaly Komara (11 zemí): lidé napříč kulturami chtějí od umění stejné věci → stejná estetika → "Hledali jsme svobodu, našli jsme otroctví"
- Stejný problém postihuje weby: stejné bílé layouty, stejné sans-serif fonty, stejné hero sekce → nerozlišitelnost
- Řešení: najděte vizuální hlas značky, záměrně porušte jednu designovou konvenci, nesledujte trendy slepě
- Diferenciace designem = trvalá konkurenční výhoda; zákazník si vás zapamatuje a pozná

## PŘÍSTUPNOST WEBU (Accessibility)
- Od června 2025 povinná přístupnost pro e-shopy a služby nad určitou velikost (EU zákon)
- Přístupný web konvertuje lépe i pro běžné uživatele – jasná struktura, kontrasty, čitelnost
- Základy: alt texty u obrázků, správné nadpisové úrovně (H1–H6), focus stavy pro klávesnici
- Kontrastní poměr textu: minimálně 4,5:1 pro normální text, 3:1 pro velký text
- Formuláře: labely musí být viditelné – ne jen placeholder, který zmizí při psaní
- Screen reader friendly navigace = lepší SEO a lepší UX pro všechny uživatele

## MOBILNÍ VERZE
- Více než 60 % návštěvníků e-shopů přichází z mobilu, ale jen 30 % tam nakoupí
- Formuláře na mobilu: používejte správný typ klávesnice (type="tel", type="email", type="number")
- Tlačítka: minimální velikost 44×44 px (dotek prstu), dostatečné mezery mezi nimi
- Sticky košík / CTA tlačítko na mobilu výrazně zvyšuje konverze
- Načítací čas na mobilu: každá sekunda navíc = 7 % pokles konverzí
- Thumb zone: nejdůležitější akce do spodní části obrazovky (palec dosáhne snáze)
- Swipe gesta pro galerii produktů jsou na mobilu standard – implementujte je

## EMAILOVÝ MARKETING A RETENCE
- Získat nového zákazníka stojí 5–7× více než udržet stávajícího
- Follow-up e-maily po nákupu: poděkování, tracking zásilky, cross-sell 2 týdny po doručení
- Opuštěný košík: série 3 e-mailů (1h, 24h, 72h) – průměrná konverze 5–15 %
- Personalizace předmětu (jméno zákazníka) zvyšuje open rate o 26 %
- Welcome sekvence nových zákazníků: klíčová pro onboarding a motivaci k prvnímu nákupu
- Post-purchase sekvence: (1) potvrzení + benefit reminder, (2) tracking, (3) cross-sell po doručení, (4) žádost o recenzi po 7–14 dnech

## DARK PATTERNS – ČEHO SE VYVAROVAT
- Skryté poplatky přidané v posledním kroku objednávky = nejčastější důvod opuštění košíku
- Předvybrané souhlasy s newsletterem nebo pojištěním jsou neetické a v EU ilegální
- Falešná urgence ("Zbývají jen 3 kusy!" při 300 skladem) poškozuje brand dlouhodobě
- Confirmshaming ("Ne, nechci ušetřit peníze") zákazníci poznají a negativně hodnotí
- "Roach motel": snadno se přihlásit, obtížně odhlásit – regulatorní riziko (EU DSA)
- Obtížné zrušení předplatného nebo objednávky = negativní recenze a chargebacks

## DESIGN JE MANIPULACE – PSYCHOLOGIE
- Každé UX rozhodnutí ovlivňuje chování uživatele – design nikdy není neutrální
- Nudge theory: malé podněty vedou k žádoucímu chování (výchozí nastavení, pořadí možností)
- Barvy: červená = urgence/sleva, zelená = bezpečí/potvrdit, modrá = důvěra
- F-pattern a Z-pattern čtení: nejdůležitější info do levého horního rohu a podél horizontálních tahů
- Bílý prostor (whitespace) zvyšuje vnímání kvality a čitelnost obsahu
- FOMO (Fear of Missing Out): omezená dostupnost zvyšuje hodnotu v mysli zákazníka
- Endowment effect: co vlastníme, ceníme více – proto fungují "30 dní na vrácení zdarma"

## A/B TESTOVÁNÍ A ANALYTIKA
- Netestujte intuicí – každá změna může konverze zvýšit i snížit
- Mouse tracking (Hotjar, MS Clarity – zdarma) odhalí kde zákazníci klikají a kde odchází
- Heatmapa + záznam sessionů = nejlevnější CRO investice s největším ROI
- Nejčastější místa úniku: produktová stránka, košík, krok adresy
- MS Clarity je zdarma a plně funkční alternativa k Hotjaru pro základní mousetracking

## REDESIGN A PŘÍPADOVÉ STUDIE
- Redesign Fakturoidu: +48,3 % registrací – klíč: zjednodušení onboardingu a jasný value prop na homepage
- Redesign Spa.cz: +21,5 % objednávek – lepší filtrování, důvěryhodnost, mobilní verze
- Redesign není o novém vizuálu – je o odstranění konverzních bariér
- Před redesignem: analýza dat, uživatelské testování, identifikace pain pointů
- Iterativní redesign (postupné změny) je méně rizikový než "big bang" redesign – méně rizika, rychlejší učení
- Měřte baseline metriky před změnou – bez toho nevíte jestli se zlepšilo

## AI A AUTOMATIZACE V E-COMMERCE
- AI personalizace produktových doporučení zvyšuje AOV průměrně o 10–30 %
- Chatboty pro zákaznický servis: fungují pro FAQ, selhávají u komplexních a emocionálních problémů
- Automatizace e-mailových sekvencí (opuštěný košík, retence) = nejvyšší ROI z automation
- AI generovaný obsah (popisy produktů) šetří čas, ale potřebuje human review pro tone of voice a přesnost

## CHECKBOXY A PRÁVNÍ UX
- Příliš mnoho souhlasů frustruje uživatele a snižuje konverze v checkoutu
- GDPR vyžaduje informovaný souhlas, ale ne nutně checkbox pro každou maličkost
- Předvybrané souhlasy (s newsletterem, pojištěním) jsou v EU ilegální – dark pattern
- Souhlas s OP: kombinujte do jednoho jasného oznámení "Kliknutím na Koupit souhlasíte s OP" při objednávce
- Princip: méně souhlasů = vyšší konverze + právní dostatečnost

## PŘEDPLATNÉ A SUBSCRIPTION MODELY
- Roční předplatné vydělá 2× více než měsíční při správném nastavení ceny a komunikace
- Klíč: jasná hodnota ročního vs. měsíčního – úspora musí být okamžitě zřejmá (ukazujte ji v % i v Kč)
- Únava z předplatného – zákazníci mají předplatných příliš mnoho; musíte být viditelně a opakovaně hodnotní
- Povinnost mít snadno dostupné tlačítko pro zrušení (zákon, etika i long-term retence)
- Nejlepší moment pro nabídku ročního: ihned po registraci a při 1. obnově měsíčního
`

export async function POST(req) {
  try {
    const { clientName } = await req.json()

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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4000,
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

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ success: false, error: 'Chyba API: ' + err })
    }

    const data = await response.json()
    const analysis = data.content?.[0]?.text || ''

    return NextResponse.json({ success: true, analysis })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message || 'Neznámá chyba' })
  }
}
