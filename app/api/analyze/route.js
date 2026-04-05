import { NextResponse } from 'next/server'

// ============================================================
// KRIS - Knowledge-based Report Intelligence System
// Engine postavený na metodologii ESHOP BOOSTER
// + znalostní báze z blogu Ondřeje Ilinčeva (ilincev.com)
// Verze 6.0 – vytěžený obsah článků (Batch 1–6, ~120 článků)
// ============================================================

const KRIS_KNOWLEDGE_BASE = `
# KRIS ZNALOSTNÍ BÁZE v6 – ESHOP BOOSTER + ILINČEV METODOLOGIE

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
- Konkurovat pouze cenou je sebevražda – vždy přijde někdo levnější (Čína, Amazon, Temu)
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
- 5 chyb luxusního e-shopu: moc barev, málo whitespace, agresivní marketing/popupy/slevy, malé fotky, komplikovaný layout

## PSYCHOLOGIE DÁRKŮ A VÁNOCE
- Obdarovaný si váží dárku průměrně jen na 82 % jeho skutečné ceny (studie)
- Peněžní dárky a poukazy mají nejnižší vnímanou hodnotu – i když jsou prakticky nejflexibilnější
- Produkty s příběhem (odkud pochází, jak vznikly) mají vyšší vnímanou hodnotu
- Pro e-shopy: dárkové balení, průvodní text na přání, možnost skrytí ceny = zvyšují konverzi
- Vánoce: zákazníci jsou ochotni platit více a nakupují impulzivně
- Deadlines doručení (poslední termín objednání před Vánoci) = silný konverzní element

## PRODUKTOVÉ STRÁNKY – 17 KLÍČOVÝCH ELEMENTŮ (behaviorální psychologie)
- 75 % zákazníků považuje fotky za klíčové při rozhodování o koupi (Weebly)
- 58 % zákazníků chce vidět produkt ze všech stran – minimum jsou 3–5 fotek
- Každý 5. zákazník vrátí produkt, protože fotka neodpovídala realitě
- Název: NIKDY nemíchejte jméno produktu s kategorií nebo vlastnostmi – 50 % e-shopů tuto chybu dělá
- Foto: velké, ze všech stran, zoom funkce, 360° pohled, AR (brýle/oblečení na tělo), video
- Hodnocení: počet hvězdiček + počet recenzí – bez počtu recenzí je hvězdičky nedostatečné
- Cena: dejte ji do blízkosti tlačítka "přidat do košíku"
- Skladovost: jasně viditelná (zelená = skladem, červená = není)
- Live chat: zvyšuje konverze, stačí vidět možnost – reálně kontaktuje každý 100. zákazník
- Upsell funguje 20× lépe než cross-sell; cross-sell max do 60 % ceny původního produktu
- Popis: vlastními slovy, ne od výrobce (SEO + osobnost firmy)
- Lifestyle fotky (produkt v kontextu) výrazně zvyšují konverze u oblečení, doplňků, nábytku
- Video produktu zvyšuje konverze až o 80 % u komplexnějších produktů
- Dostupnost skladem musí být jasně viditelná
- Wishlist: průměrně ho používají 3 z 1000 zákazníků – sledujte v analytics

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
- Kategorie vs. filtr: kategorie = buď/anebo; filtr = kombinovatelné vlastnosti (barva + velikost + materiál)

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
- A/B testy personalizace a segmentace ztrojnásobují potenciální zvýšení obratu
- 97,5 % jsou A/B testy, 1 % A/A testy, 1 % multivariační, 0,5 % personalizace

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
- Slevový kupon: spíše jako textový odkaz než pole (zákazníci odcházejí hledat kód a nevrátí se)
- Persistentní košík: zákazník se vrátí a najde zboží v košíku
- 93 % lidí by nakoupilo více, kdyby byla doprava zdarma

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
- Příliš přísné požadavky na heslo = ztráta 18 % uživatelů

## PRŮMĚRNÁ HODNOTA OBJEDNÁVKY (AOV)
- Zvyšovat AOV: upsell/cross-sell, balíčky, množstevní slevy, doplňkové služby
- Hranici dopravy zdarma nastavte mírně nad průměrnou AOV – zákazník si přiloží produkt
- POZOR: agresivní slevy zvyšují AOV, ale snižují marži – sledujte marži na objednávku, ne jen AOV
- Upsell v detailu produktu nebo jako upgrade v (před)košíku
- Upsell ideální kde malý cenový rozdíl = velký výkonnostní rozdíl (elektronika, hosting)
- Sledujte: konverzní poměr, marže, LTV zákazníků, počet kusů v objednávce

## RECENZE A SOCIÁLNÍ DŮKAZ (6 druhů social proof)
- Recenze jsou nejsilnější trust signál – 92 % zákazníků čte recenze před nákupem
- Perfektní 5.0 je podezřelé – optimum je 4,2–4,7
- Recenze s fotkami konvertují 2× lépe než textové
- Odpovídejte na negativní recenze veřejně
- Pod 10 recenzí zákazníci nedůvěřují; 50+ je solidní základ
- Recenze žádejte e-mailem 7–14 dní po doručení = nejvyšší response rate
- Největší efekt mají první 1–5 recenzí; produkt s 5 recenzemi se prodává o 50 % víc
- Každá hvězdička navíc na Yelp = +5–9 % obratu restaurace (HBR studie)
- Loga klientů: nejsnáze zapamatovatelný typ social proof (ConversionXL)
- Testimonials: umístěte jako "koření" po celém webu u CTA, ne jen na speciální stránku
- Reverzní ohlas (Sean de Souza): 6 otázek = strukturovaný testimonial
- User stats: počty zákazníků, objednávek, hodnocení
- Certifikáty a ocenění, PR zmínky v médiích
- Negativní recenze první = spouštíte řetězovou reakci dalších negativních

## CENOTVORBA A PSYCHOLOGIE CEN (EU regulace 2023) + 38 TIPŮ
- EU regulace: zobrazujte nejnižší cenu za posledních 30 dní jako referenční
- Škrtnutá cena musí být skutečná předchozí cena
- Psychologické ceny: 999 Kč > 1 000 Kč; zaokrouhlené ceny = signál luxusu
- Kotevní cena: nejdražší varianta vlevo/první mění vnímání ostatních cen
- Příliš velká sleva snižuje vnímanou kvalitu produktu
- Přeškrtnutou cenu dejte NAD nebo NALEVO od aktuální ceny
- Splátky: 5 × 999 Kč je vnímáno lépe než 5 000 Kč (zákazník porovnává výši splátky)
- Cena za den: ideálně pod 20–50 Kč pro denně používané produkty (fitko: "19 Kč/den")
- Cena v levém dolním rohu = vnímána jako nižší
- Začít množstvím, pak cenou: zákazník vnímá výhodu, ne náklady
- Velikost písma ceny ovlivňuje vnímanou výši
- Bez teček: 2500 Kč > 2.500 Kč (méně číslic = vnímáno jako levnější)
- Přesná cena (ne kulatá) = vyšší vnímaná hodnota (studie 27 000 prodejů nemovitostí)
- Červená barva ceny pro muže zvyšuje impulzní nákupy (vzrušení → emocionální rozhodnutí)
- Slevy drahých produktů ukončit opatrně: zákazníci pak kupují levnější varianty
- 5 % sleva = musíte prodat o 20 % víc (ztráta marže vs. objem)
- Nejdražší produkt v kategorii na první řadě = zbytek vypadá levněji (vzor Alza)
- Tip: neřaďte kategorii od nejlevnějšího – mixujte podle ceny, marže, skladovosti

## LAKOMEC VS. MARNOTRATNÍK – CENOVÁ CITLIVOST
- Zákazníci se liší v tom, jak moc je "bolí" platit
- Lakomci (tightwads ~24 %): snižte vnímanou bolest platby – splátky, denní cena, slovo "jen", "malý poplatek"
- Marnotratníci (spendthrifts ~15 %): dejte jim šanci utrácet více – upsell, prémiové varianty, exkluzivita
- Pragmatici (většina): racionální zdůvodnění koupě
- Citlivost na cenu se dramaticky liší odvětvím: benzín vs. dovolená vs. zdraví
- Pokud část platí zaměstnavatel nebo je odečitatelná z daní → citlivost na cenu klesá
- Platba rozdělit mezi více lidí = každý platí méně = méně bolí
- Lidi potřebují mít pocit, že cena je férová – zdůvodněte ji

## NEDOSTATEK (Scarcity) – PRINCIP FOMO
- FOMO (fear of missing out) = jeden z nejsilnějších psychologických principů
- Studie: svobodný muž vs. zadaný muž → zájem žen vzrostl z 59 % na 90 %
- Nedostatek MNOŽSTVÍ > nedostatek ČASU (méně předvídatelné = cennější)
- Funguje u produktů, co nejsou jinde dostupné; u komodit NE
- Musí být pravda! Falešný nedostatek: zákazníci to odhalí a ztratíte důvěryhodnost
- Příklady: Bonami (u ikony košíku), ZOOT (odpočet v předkošíku), Alza (trháky dne)
- Booking.com = mistr nedostatku (ale eticky diskutabilní)
- Riziko "mrzáčka, co nikdo nechtěl" u posledního kusu méně populárních produktů – testujte
- Před odesláním e-mailu o opuštěném košíku: zkontrolujte, zda se zboží nevyprodalo!

## KOGNITIVNÍ ZKRESLENÍ PRO E-SHOPY
- Využití 6 kognitivních zkreslení umožní přetáhnout od konkurence 72–94 % zákazníků
- Choice Overload (paralýza výběrem): příliš mnoho možností = žádná volba
  → Max 2–4 varianty produktů/plánů; zvýrazněte "doporučenou" variantu
- Anchoring (kotvení): první cena je kotva pro všechna další vnímání
  → Nejdražší varianta první; přeškrtnutá cena vlevo/nad aktuální
- FOMO/Scarcity: chceme co nemůžeme mít nebo je to těžké získat
  → Omezené množství, časové nabídky (musí být pravdivé!)
- Peak-End Rule: zákazník si pamatuje vrchol a konec zážitku
  → Děkovná stránka a packaging jsou klíčové (moment radosti)
- Confirmation Bias: hledáme potvrzení svého rozhodnutí
  → Post-purchase e-maily ujišťující "udělali jste správné rozhodnutí"
- Context Effect: prostředí ovlivňuje celé vnímání
  → Typografie, whitespace, vizuální hierarchie = celkový vjem webu

## PERSONALIZACE – TYPICKÝ ZÁKAZNÍK NEEXISTUJE
- Typický uživatel neexistuje (Adolphe Quetelet, 1830) – průměr jako design základ je chyba
- Pilotní kabina pro průměrného pilota = sedí nikomu → personalizace je nutností
- Netflix vydělá díky personalizaci ~1 mld. USD ročně
- Personalizace pro e-shopy: bannery/slevy/popupy (Heuréka uživatel = cenově citlivý), doporučené produkty, opuštěný košík, drip kampaně, retargeting, frekvence nákupů
- Segmentace: lokalita, nový vs. vracející se, algoritmické segmenty (AI predikce)
- Jak začít: KPI → analýza stávajícího stavu → tvorba segmentů → co jim ukázat → měření
- A/B testy personalizace ztrojnásobují potenciální nárůst obratu
- Ze všech A/B testů tvoří personalizace jen 0,5 % – obrovský nevyužitý potenciál
- Pro opravdovou personalizaci (ne produktová doporučení) potřebujete hodně dat a konverzí

## TRANSAKČNÍ E-MAILY – NEVYUŽITÝ POTENCIÁL
- Transakční e-maily = 3–4× vyšší open rate a proklikovost než marketingové e-maily
- Jsou jako polibky: zákazník se na ně TĚŠÍ (inicioval je sám svou akcí)
- Legendární příklad: CD Baby – 20 000 zpětných odkazů za 20 minut práce na textu e-mailu
- 19 typů transakčních e-mailů: potvrzení objednávky, odeslání zásilky, reklamace, hlídací pes, zapomenuté heslo, stav věrnostních bodů, uznání/neuznání reklamace, zpoždění, změna v objednávce atd.
- Posílejte z info@vasobchod.cz, newsletters z newsletter@sub.domena.cz (jiná doména = ochrana reputace)
- Pište jako byste to říkali dobrému zákazníkovi – ne úředními frázemi
- Nejsou to marketingové e-maily – neupsellujte agresivně (riziko spam složky)
- Zamyslete se: je každý e-mail nutný? Nedají se sloučit? (co nejméně = co nejlépe)

## DĚKOVNÁ STRÁNKA – 3.–5. NEJNAVŠTĚVOVANĚJŠÍ STRÁNKA
- Základní informace: co zákazník objednal + kdy to dorazí + na jaký e-mail jde potvrzení
- Telefonický kontakt výrazně zvyšuje důvěryhodnost a snižuje buyer's remorse
- Registrace: stačí se zeptat na heslo "Uložit vaše údaje?" = navýšení registrací
- Sdílení: funguje pokud tím pomůžete (Liftago: sleva pro kamaráda, Harry's: 100 000 e-mailů za týden)
- Dotazník spokojenosti: pokud se zákazníků zeptáte těsně po nákupu, produkt si víc oblíbí
- Sleva na příští nákup: testujte, zda to funguje lépe pro nové vs. vracející se zákazníky
- Fotka majitele nebo zodpovědné osoby = "lidi nakupují od lidí, ne od počítačů"
- Surprise gift (ebook, infografika, konzultace zdarma) = ideální pro konverzi na prémiovou verzi
- Příklad: správná děkovná stránka vedla k +52 % obratu (dokumentovaný případ)
- Upsell možný, ale dejte pozor aby nepohřbil hlavní CTA (sledování objednávky)

## PRODEJNÍ TEXT A COPYWRITING
- 95 % internetu je text; 80 % všech úspěšných A/B testů jsou změny textu
- Wall Street Journal prodejní text (Martin Conroy, 1975): vydělal 1–2 miliardy USD za 28 let
- Fáze uvědomění zákazníka (Schwartz): 1. Neví o problému → 2. Ví o problému → 3. Hledá řešení → 4. Zná vás → 5. Připraven koupit
- Strategie textu: posuňte zákazníka z jeho fáze o krok vpřed (ne všichni jsou připraveni koupit)
- Zákazníkům nepíšete o produktu, ale o VÝHODÁCH pro ně (emocionální benefity, ne technické funkce)
- Harley-Davidson: "opravdu soutěží" s plastickou chirurgií a sporťáky, ne s jinými motorkami
- Orwellova pravidla: krátce, jednoduše, aktivně, bez žargonu
- Aktivní rod > trpný rod: "Artikel popisuje" > "Jsou popisovány"
- Pozitivní formulace > negativní: "Přijďte včas" > "Nechoďte pozdě"
- Zdůvodňujte spojkami: "Přírodní oleje pomáhají, ALE jak stárnete… PROTO…"
- Jednoduchý text = inteligentní autor (paradox: složitost = vnímaná nižší inteligence)
- 6 otázek před psaním: Cíl? Pro koho? Co říct? Kolik prostoru? Jaký dojem? Kolik času?

## FORMULÁŘE NA MOBILU – 12 TIPŮ
- Konverze na mobilu je 25–50 % té na desktopu – mobilní gap je reálný problém
- 5 důvodů nižší mobilní konverze: bezpečnostní obavy (20 %), nešikovný detail produktu (19,6 %), obtížná navigace (19,3 %), nemožnost porovnávat (19,6 %), obtížné vyplňování formulářů (18,6 %)
- Ptejte se jen na NEZBYTNÁ pole – každé extra pole snižuje konverze
- Předvyberte obvyklé volby (80 %+ uživatelů volí stejně)
- Steppery (+/-) místo dropdownu pro počty; slider místo dvou polí pro rozsah hodnot
- Popis polí: NIKDY uvnitř pole (placeholder), vždy NAD polem nebo plovoucí label
- Vždy správná klávesnice: type="tel", type="email", type="number", type="url"
- Live validace (po opuštění pole): -22 % chyb, +22 % dokončení, +31 % spokojenost (Luke Wroblewski)
- Vždy zobrazte heslo (toggle) – 75 % uživatelů nedokončí nákup pokud musí žádat reset
- Adresy: našeptávač až po 5+ znacích, max 10 položek, bez č.p. v našeptávači
- Na mobilu při formulářích: orientace na výšku (90 % uživatelů), šířka pole max 300px
- Tlačítko submit: sekundová prodleva po kliknutí (zabrání double-tap = dvojí objednávka)

## OPUŠTĚNÝ KOŠÍK – ZÁCHRANNÁ SÉRIE
- 2/3 lidí si dá něco do košíku a nedokončí objednávku
- 8 % z těch co opustí košík lze přemluvit e-mailem k dokončení
- 72 % lidí co dokončí nákup po připomenutí to udělá do 12 hodin
- Série 3 e-mailů: do 20 minut (konverze 5,2 %), do 1 hodiny (4,5 %), do 24 hodin (2,6 %)
- 44 % otevře e-mail; 11 % klikne; 30 % z klikajících dokončí nákup
- AOV opuštěného košíku je o 14 % vyšší než průměr (hodnotnější zákazníci)
- E-mail musí obsahovat: velké obrázky produktů, tlačítko "Dokončit nákup" (HTML, ne obrázek), trust signály, kontakt na podporu
- Slevu nabídněte AŽ ve 3. e-mailu – nepodřezávejte si marži zbytečně
- E-mail nepsat vyčítavě nebo nátlakově – spíše jako kamarádské připomenutí
- Ptejte se na e-mail CO NEJDŘÍVE v objednávce – zachytíte i ty co odpadnou dříve
- Urgenci (vyprodá se!) používejte JEN pokud je to pravda – zkontrolujte sklad před odesláním

## FILTROVÁNÍ PRODUKTŮ
- Jen 16 % velkých e-shopů má rozumně navržené filtrování (Baymard Institut)
- Filtrování ≠ řazení – nikdy je nemíchejte dohromady
- Každá kategorie musí mít VLASTNÍ specifické filtry (ne jeden filtr pro vše jako Bonami)
- Nejužitečnější filtry dejte nahoru (sledujte používanost přes analytics/Clarity)
- Vždy umožněte kombinaci více filtrů najednou (AND logika, ne OR)
- Ukažte počet produktů odpovídající každé hodnotě filtru; 0 produktů = zašedlé, ne skryté
- Použité filtry ukažte NAD výpisem produktů + možnost zrušit jeden nebo všechny
- Seznamy vlastností nad 10 položek usekněte a skryjte za "Zobrazit více"
- Kompatibilní produkty jako filtr: "kompatibilní s obsahem košíku" funguje nejlépe
- Přidání filtrace produktů = nárůst obratu o 76 % (dokumentovaná případová studie)
- Filtry s barvami: vždy jako barevné puntíky, ne text
- Změny filtru = okamžité (bez tlačítka "Přepočítat"), jako samostatný krok v historii prohlížeče

## PŘÍPADOVKA: TRENÝRKÁRNA – 4× OBRAT ZA 6 LET
- Filtry seřazeny podle skutečné používanosti (MS Clarity): Velikost → Značka → Barva
- Použité filtry viditelné na začátku výpisu + tlačítko "Zrušit vše"
- Barvy jako barevné puntíky (ne text)
- Pamatování vybrané velikosti z filtru do detailu produktu
- Slevový kupon: pole vizuálně potlačit a přejmenovat na "dárkový poukaz"
- Ze 4 A/B testů: přidání slevového pole ke košíku snížilo konverze o 13 %

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
- Tlačítka: minimální 44×44 px, dostatečné mezery (7×7mm, 2mm rozestupy)
- Sticky košík / CTA tlačítko výrazně zvyšuje konverze
- Každá sekunda navíc při načítání = 7 % pokles konverzí
- Thumb zone: nejdůležitější akce do spodní části obrazovky
- Vyhněte se animacím a paralax scrollingu na mobilu (motion sensitivity, výkon)
- 90 % uživatelů drží mobil na výšku při formulářích – šířka pole max 300px

## EMAILOVÝ MARKETING A RETENCE
- Získat nového zákazníka stojí 5–7× více než udržet stávajícího
- Opuštěný košík: série 3 e-mailů – průměrná konverze 5–15 %
- Personalizace předmětu (jméno zákazníka) zvyšuje open rate o 26 %
- Post-purchase sekvence: potvrzení + benefity → tracking → cross-sell po doručení → recenze po 7–14 dnech
- Nejlepší čas na žádost o recenzi: 7–14 dní po doručení
- Transakční e-maily: 3–4× vyšší open rate než marketing (využijte tento potenciál)

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

## PŘEDKOŠÍK – 4 TYPY POTVRZENÍ PŘIDÁNÍ DO KOŠÍKU
- Průměrně si přidá produkt do košíku 8,7 % návštěvníků e-shopu
- Hlavní důvody nenakoupení: 61 % dodatečné náklady (doprava, daň), 35 % nutnost registrace, 27 % komplikovaná objednávka, 22 % technické problémy, 18 % nedůvěryhodný vzhled
- 4 typy předkošíku: 1) Dropdown/slide-out box, 2) Pop-up (modal), 3) Mezistránka, 4) Přesměrování rovnou do košíku
- Dropdown/slide-out: zobrazujte min. 7 sekund (ideálně 10); po odjetí myši 0,5s prodleva před zavřením; nevhodné kombinovat s jednokrokovým košíkem
- Pop-up (modal): nejčastější v ČR, agresivnější ale přehledný; ukazuje: potvrzení přidání + náhled + vlastnosti produktu + tlačítka "Pokračovat" a "Do košíku"
- Mezistránka: nevhodná pro standardní e-shopy (uživatelé si pletou s košíkem); vhodná jen pokud máte hodně přidružených služeb
- Drop-down box: raritetní v ČR; zmátne uživatele krkolomným přechodem z tlačítka ke košíku
- Dobré řešení pro luxusní zboží a e-shopy s desítkami položek (potraviny, korálky): disk notification (animace)
- Vždy v předkošíku ukažte: jasné textové potvrzení + náhled + vlastnosti (velikost, barva) + CTA tlačítka

## VÍCEKROKOVÝ VS. JEDNOKROKOVÝ KOŠÍK
- Počet kroků v košíku NENÍ klíčový pro konverze – důležitá je jednoduchost každého kroku
- Nejčastější pořadí kroků: Košík → Doprava a adresa → Platba → Souhrn → Děkujeme
- Průměrná objednávka v USA má 23,5 prvků formuláře; ideál = 10 nebo méně
- Vícekrokový košík: výhoda – nestresuje rozsahem na první pohled; nevýhoda – více kliknutí
- Jednokrokový košík: výhoda – zákazník vidí vše co se od něj bude chtít; nevýhoda – může vizuálně vyděsit
- Vancouver 2010 Olympics: přechod na jednokrokový košík = +21,8 % objednávek
- Harmonikový (accordion) košík = zlatá střední cesta: kroky jsou na jedné stránce, ale minimalizované; otevírají se postupně; 14 % top US e-shopů (2012) → 32 % (2016)
- Jednokrokový košík nevhodný pokud: hodně přizpůsobení (doprava, věrnostní program, slevové kódy, dárkové balení), hodně produktů, firma B2B
- Progress bar: ukažte vždy – lidé rádi předem ví do čeho jdou; nad progress bar ikonu bezpečí
- Tlačítko dalšího kroku: nejvýraznější prvek + konkrétní text (ne "Pokračovat" ale "Vybrat dopravu")
- Vyhazením jednoho zbytečného tlačítka (registrace) vydělal Jared Spool klientovi 300 milionů USD ročně
- Nutkání dokončit rozdělanou věc = silný psychologický princip → progress bar využívá toto

## NÁKUPNÍ PERSONY A 4 NÁKUPNÍ MODALITY
- Tony Zambito: persony = reprezentace zákazníků (motivace, cíle, přemýšlení, nákupní rozhodování)
- Persony musí být živé a pomáhat při designu – ne nicneříkající životopisy z fotobankové fotky
- Walmart případ: špatná otázka ("Chcete méně nepřehledné police?") → zbavili se 15 % sortimentu → prodělali 1,85 mld. USD
- Johanna Weibe: "Je mi jedno pohlaví a kde bydlí. Potřebuji vědět co ho trápí a zda mám nejlepší řešení."
- 4 NÁKUPNÍ MODALITY (jak zákazníci rozhodují):
  1. Soutěživá (rychlé, racionální): chce důvody proč si vybrat, nestroluje → CTA nad ohybem, stručné
  2. Metodická (pomalé, racionální): největší skupina; chce podrobný popis, funkce, propojení → detailní obsah
  3. Spontánní (rychlé, emocionální): reaguje na emoce, design, personalizaci → vizuální, přesvědčivé
  4. Humanistická (pomalé, emocionální): chce příběh, hodnoty, vztah → autentický obsah, komunita
- Vědecké studie (Chapman 2008, Long 2009): persony prokazatelně zlepšují proces designu produktu
- Šablona persony: demografie + motivace + frustrace + nákupní chování + citáty zákazníků
- Vždy ověřte personu zpětně s reálnými zákazníky; vyberte pro každou personu jednoho reálného člověka

## PŘÍPADOVKA: 680 % ZVÝŠENÍ OBRATU (8x-obrat)
- Fitness Women e-shop: úpravou jedné produktové stránky +680 % obratu
- Typický výsledek pro nové klienty (bez předchozí optimalizace): +50–100 % obratu za rok
- Typický výsledek pro klienty kteří optimalizují: +10–40 % za rok
- Česká banka (A/B test): 153 konverzí (původní) → 1185 konverzí (nová verze) = +675 %
- CRO se vyplatí: pokud měsíční zisk přesahuje 150 000 Kč (ROI z optimalizace > náklady)
- Jednorázová CRO analýza: pár desítek tisíc Kč → vrátí se zpět za měsíc
- Pokud nikdo web neoptimalizoval: roční nárůst obratu 15–45 %
- Pokud už optimalizujete: roční nárůst 5–15 %
- Poměr CRO vs. PPC investice v zahraničí: 92:1 ve prospěch PPC (chyba!) – CRO je levnější dlouhodobě

## PŘÍPADOVKA: TRENÝRKÁRNA – DETAILNÍ A/B VÝSLEDKY
- Konverzní poměr na mobilu: 4,3 % (více než průměrný desktop)
- Test patičky: schování patičky snížilo konverzi o 7 % a obrat o 9,4 % (důvěryhodnost e-shopu!)
- Test redukované patičky: statisticky shodné výsledky jako plná patička → zachována plná
- Test navigace v checkoutu: schování navigace snížilo obrat o 9,2 %, druhý test –11,7 % (zákazníci chtějí dokončit)
- Test potvrzovací stránky: zrušení mezistránky po přidání do košíku = +14 % obratu
- Test dvou dlaždic (mobil 390px+): +8 % konverze a obrat díky více viditelným produktům
- Filtry: seřadit podle používanosti (Clarity) = Velikost → Značka → (ne cena)
- Pamatovat vybranou velikost z filtru do detailu produktu
- Použité filtry NAD výpisem + tlačítko "Zrušit vše"
- Poučení: co funguje jinde, nemusí fungovat u vás → vždy testujte!

## ANALYTIKA A GOOGLE ANALYTICS – CHYBY A BEST PRACTICES
- "Bez pořádného UX/CRO výzkumu nevíte nic" – zapomeňte na best practices bez dat
- Neexistují změny které "vždy zvýší konverze" – vše musí být otestováno pro váš e-shop
- Nejčastější chyby v Google Analytics: nenastavené goals (cíle), neslinkované UTM parametry, nepoužitý enhanced e-commerce
- Enhanced e-commerce: sleduje produktové zobrazení, přidání do košíku, checkout funnely, refundy
- Analytics odpovídají na otázku CO – Hotjar/Clarity odpovídá na otázku PROČ
- Sledujte: konverzní poměr z každého zdroje (PPC má jiný konverzní poměr než bannerová reklama!)
- Případ: PPC ROAS 1250 % vs. bannerová reklama ROAS 25 % (konverzní poměr bannerů: 0,02 %)
- Goals a funnely: kde přesně zákazníci opouštějí objednávkový proces?
- Kvalita návštěvnosti > kvantita návštěvnosti – optimalizujte nejdřív zdroje, pak web
- UTM parametry: vždy konzistentní pojmenování (email nebo e-mail nebo newsletter – ne mix!)
- Vždy nejdřív zlepšit web PŘED spouštěním drahých PPC kampaní

## PÍSMO NA WEBU – TYPOGRAFIE PRO VÝKON
- Web je z 95 % písmo – správnou typografií zvýšíte čitelnost i konverze
- Průměrně si uživatelé přečtou jen 20–25 % textu na stránce; ideální délka článku: 2–3 000 slov
- Minimální velikost písma: 14 px (mobil), 16–18 px (desktop); čím větší obrazovka, tím větší písmo
- Výška řádku (line-height): ideálně 1,5× velikost písma; menší písmo = větší řádkování
- Délka řádku: max. 60–75 znaků (desktop), 30–40 znaků (mobil)
- NIKDY nezarovnávejte text do bloku (justify) – vznikají bílé řeky v textu
- Maximálně 2 řezy písma na webu; jasná typografická škála (H1 > H2 > H3 > body)
- Patkové písmo (serif): historicky vnímáno jako důvěryhodnější (NYT studie: Baskerville +1,5 % důvěra)
- Bezpatkové (sans-serif): vhodné pro UI a mobil; obě kategorie jsou podobně čitelné pokud jsou velké
- Tmavý text na světlém pozadí: ideál; inverzní (světlý na tmavém) = čte se o 32 % pomaleji
- Kontrastní poměr: minimálně 4,5:1 (normální text), 3:1 (velký text)
- Vybírejte písma s podporou latinky s diakritikou (latin extended) pro češtinu
- Google Fonts: bezplatné, prověřené, správná diakritika (zkontrolujte)
- Nestahujte všechny řezy písma – každý +1 MB zpomaluje načítání a kazí konverze
- Špatná typografie = pomalejší plnění úkolů, nižší úspěšnost objednávek (studie)
- Typografická škála: prvky musí být tak různé velikostí, aby šly rozeznat i samostatně

## KONVERZE A DATA-DRIVEN ROZHODOVÁNÍ
- "Bez pořádného výzkumu nevíte nic" – best practices jsou výchozí bod, ne jistota
- Neexistuje seznam věcí, které vám "vždy zvýší konverze" – každý e-shop je unikátní
- CRO výzkumný proces: Analytika (CO) → Heatmapy/Nahrávky (JAK) → Uživatelské testování (PROČ) → Hypotéza → A/B test
- Metriky k sledování: konverzní poměr, AOV, marže na objednávku, LTV, bounce rate, čas na stránce
- Kvalita metrik: zisk > obrat > konverze > návštěvnost (nezaměňujte HITS: How Idiots Track Success)
- CRO vs. PPC: CRO je fixní investice která vydělává dlouhodobě; PPC = nekonečné opakující se náklady
- Návštěvnost nebo konverze? Nejdřív optimalizuj web → pak lákej návštěvníky
- Pokud máte špatnou návštěvnost (nízký zájem): nejsnadnější zvýšení konverzí = lepší kvalita návštěv
- Jedna korigovaná řádka kódu nebo text = někdy stovky % zlepšení (příklady: Obama kampaň +5 %)
- Mousetracking (MS Clarity = zdarma): nejrychlejší způsob jak zjistit kde lidi klikají a kde odpadají

## KOŠÍK A OBJEDNÁVKA – KLÍČOVÁ DATA
- 68 % lidí si dá něco do košíku a nenakoupí (průměr; nejlepší e-shopy mají pod 50 %)
- Hlavní důvody opuštění košíku: skryté poplatky v posledním kroku (61 %), nutnost registrace (35 %), komplikovaná objednávka (27 %), technické problémy (22 %), nedůvěryhodný vzhled (18 %)
- 75 % zákazníků opouštějí košík s tím, že se vrátí → pošlete jim e-mail!
- 3 ze 4 zákazníků se chce k nákupu vrátit → persistentní košík je nutnost
- One-page checkout (Vancouver 2010): +21,8 % objednávek přechodem z vícekrokového
- E-mail v objednávce: ptejte se CO NEJDŘÍVE (ke jménu, ne až na konci) → zachytíte ty co odpadnou dříve
- Registrace PŘED nákupem = ztráta 20–25 % objednávek (dokumentováno opakovaně)
- Přidání jednoho zbytečného kroku (registrace): Jared Spool ji odstranil = +300 mil. USD/rok pro klienta
- 93 % lidí by nakoupilo více kdyby byla doprava zdarma
- Slevový kód jako textové pole v košíku: zákazníci odcházejí hledat kód → nikdy to nevymáhají; dejte jako textový odkaz "dárkový poukaz"
- Persistentní košík + wishlist: umožněte přesunutí z wishlistu do košíku jedním klikem
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

Analyzuj tyto oblasti: homepage a první dojem, produktové stránky a fotografie, navigace a kategorie, košík a checkout (předkošík, typ košíku, formuláře), trust signály a recenze, mobilní verze, ceny a psychologie cen, copywriting a mikrotexty, filtrování produktů, personalizace a e-mailing, typografie a čitelnost, analytika a data-driven přístup.

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
