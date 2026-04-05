import { NextResponse } from "next/server";

var KB = "Jsi expert na CRO a UX pro e-shopy podle metodologie EshopBooster. Analyzuj e-shop klienta a dej konkretni doporuceni v techto oblastech:\n\n";

KB += "=== GOOGLE QUALITY SCORE ===\n";
KB += "Google hodnoti weby skorem 0-99 (neni verejne). Ovlivnuje SEO pozice a cenu kliku v reklame (o 20-30%). Benchmark segmentu cca 45-50 bodu. E-shop s dobrym zpracovanim muze dosahovat 80+ bodu. Google hodnoti: velikost pisma (min 13px), citelnost/kontrast, klikatelnost prvku, duveryhodnost, FAQ, recenze, interni prolinkovani, pribeh znacky, osobni kontakt.\n\n";

KB += "=== HP - HLAVNI STRANKA ===\n";
KB += "- USP lista: musi byt na HP i na detailu produktu i v kategorii. Pokud chybi, prokazatelne snizuje konverze. USP musi byt proklikavajici na staticke stranky s detailnimi informacemi. Chybi-li staticke stranky, zakaznik ztrati duveru.\n";
KB += "- Logo: doplnit dovetek nazvu (napr. 'specialiste na...') - zakaznik vi kde je a co e-shop prodava.\n";
KB += "- Logo Heureka: umistit mezi logo a vyhledavani - zvysuje duveryhodnost.\n";
KB += "- Kontakt v hlavicce: tel. cislo + email + fotka oblicej + zelene/cervene kolecko dostupnosti podpory. Zobrazit i v paticce.\n";
KB += "- Hamburger menu: doplnit kontakty (tel, email) - zakaznik muze kontaktovat na jeden klik.\n";
KB += "- Info menu: pridat listu s: Kontakt, O nas, Recenze, Doprava, Garance, Blog, Castoze dotazy. OP dat do paticky ne do menu.\n";
KB += "- Vyhledavani: viditelne na desktopu i mobilu. Na mobilu musi byt jasne videt i pri otevreni hamburger menu. Idealne s pohybujicim se textem.\n";
KB += "- Hello bar: vyrazna barva, spravny kontrast (ne cerna+tmave seda). Pouzit pro akce, limitovane nabidky. Pro max efekt kombinovat hello bar + detail produktu + kategorie.\n";
KB += "- Bannery: musi mit CTA tlacitko. Splnovat squint test (jasne srozumitelne pri zamraceni). Max 2 slidery na HP.\n";
KB += "- Rychly rozcestnik (dlazdicove menu): prehledny, razeny podle prodejnosti. Proklikovost dlazdic ma velky vliv na konverze.\n";
KB += "- Recenze na HP: umistit co nejvys. Zlate hvezdicky. Rucne vybrat 12 nejlepsich. Symbol overene recenze. Logo Heureka/Google u recenzi. Proklik na vsechny reference.\n";
KB += "- Kolo stesti: zvazit pro sbiranje emailu / slevove kody (sluzba Koloo - plne responzivni).\n";
KB += "- Paticka: kontakty, loga Heureka, platebni metody, prepravci, staticke stranky.\n";
KB += "- Text na HP: vyuzit pro kredibilitu, prolinkovat do kategorii a statickych stranek.\n";
KB += "- Kammenna prodejna: prezentovat na co nejvice mistech (menu, paticka, detail produktu, staticke stranky).\n\n";

KB += "=== KATEGORIE ===\n";
KB += "- Razeni produktu: nejprodavanejsi na prvnich mistech, skladem produkty vzdy pred nedostupnymi.\n";
KB += "- Filtry: rozbalene, razene podle dulezitosti pro zakaznika. Zabaleny filtr je casto prehlednuty.\n";
KB += "- Termin dodani: zobrazit u produktu ve vypisu (skladem / dnes / zitra).\n";
KB += "- Stitky: 'lidovka', 'zlata stredni cesta', 'pro narocne' - maji velky vliv na konverze.\n";
KB += "- Hvezdicky: zobrazovat jen u produktu kde jsou a kde je hodnoceni dobre. Prazdne hvezdicky skryt.\n";
KB += "- Text kategorie: vyuzit pro kredibilitu + rozcestnik na informace ktere zakaznika zajimaji.\n";
KB += "- Dynamicke titulky: pri filtrovani menit nazev kategorie a title stranky (lepsi SEO).\n";
KB += "- Podkategorie: zobrazit jasne pomoci ikonek, fungovat spravne i na mobilu.\n";
KB += "- Nahledovy obrazek: po najeti mysi zobrazit infografiku nebo klicove body produktu.\n\n";

KB += "=== DETAIL PRODUKTU ===\n";
KB += "- Reference: primo pod nazev produktu - zlaté hvezdicky, pocet hodnoceni.\n";
KB += "- Termin dodani: zobrazit jako 'dnes', 'zitra', 'pozitri' + datum. Ne jen 'muzeme dorucit'.\n";
KB += "- Infografika v galerii: u TOP produktu pridat infografiku s klicovymi body.\n";
KB += "- Klicove informace: shrnout bodove hned na zacatku popisku.\n";
KB += "- FAQ: pridat na stranku - pro zakaznika i pro Google.\n";
KB += "- Upsell/cross-sell: nabizet doplnkove produkty a balicky. Nabidnout i pri pridani do kosiku.\n";
KB += "- Univerzalni informace o firme: recyclovatelny blok across vsemi detaily - usetri cas a zvysuje kredibilitu vsude.\n";
KB += "- Proc nakoupit zrovna u vas: ukaz vyhody s fotkai/gify - funguje na vjemy a emoce zakaznika.\n";
KB += "- Box 'nevite si rady': kontaktni tel + email v detailu produktu.\n";
KB += "- Nazor odbornika: pridat u TOP produktu.\n";
KB += "- Galerie: pridat foto referencí spokojených zákazníků.\n";
KB += "- Logo Heureka: viditelne zobrazit v detailu produktu.\n";
KB += "- Ukaz ze jsi 'zubar': dokazat svoji odbornost v detailu produktu.\n\n";

KB += "=== KOSIK ===\n";
KB += "- Policko slevoveho kodu: skryt nebo minimalizovat - viditelne policko posila zakazniky hledat slevo na Google, kde najdou konkurenci.\n";
KB += "- Apple Pay / Google Pay: pridat - vyrazne zvysuje konverze u mobilnich uzivatelu.\n";
KB += "- QR kod: pridko platebni metodu - pro e-shop vyhoda (neplatis % poplatek).\n";
KB += "- Termin dodani: zopakovat i v kosiku - klicova informace pro dokonceni objednavky.\n";
KB += "- Upsell: nabizet relevantni produkty pri pridani do kosiku i v kroku 1 kosiku.\n";
KB += "- Doplnkove moznosti: dycko (dysko), pojisteni, prodlouzena zaruka.\n";
KB += "- Prazdny kosik: zpracovat kreativne - zobrazit bestsellery, kontakt, argumenty proc nakoupit.\n\n";

KB += "=== MOBILNI VERZE ===\n";
KB += "- Hamburger menu: umistitit vpravo (prirozene pro pravacky).\n";
KB += "- Vyhledavani: jasne viditelne na mobilu stale.\n";
KB += "- Rozbaleni kategorii: prehledne a spravne.\n";
KB += "- Kosik: kompletne zkontrolovat a odladit na mobilu.\n\n";

KB += "=== OBECNE / TECHNICKE ===\n";
KB += "- Velikost pisma: min 13px, idealne 16px.\n";
KB += "- Kontrast: splnovat WCAG standard. Overit na color.review.\n";
KB += "- Page Speed: obrazky idealne pod 100kb. Sledovat Core Web Vitals na pagespeed.web.dev.\n";
KB += "- Staticke stranky: zpracovat kvalitne pro kazde USP, dopravu, zaruku, o nas, kontakt, kamennou prodejnu.\n";
KB += "- Interni prolinkovani: prolinkovat text na kategorie a staticke stranky.\n";
KB += "- Meta data a title: zpracovat pro klicove kategorie, pridat USP do titulku.\n";

export async function POST(req) {
  var body = await req.json();
  var clientName = body.clientName;
  if (!clientName) return NextResponse.json({ error: "Chybi jmeno" }, { status: 400 });
  try {
    var Anthropic = (await import("@anthropic-ai/sdk")).default;
    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    var prompt = KB + "\n\nKlient: " + clientName + "\n\n";
    prompt += "Na zaklade teto kompletni metodologie EshopBooster vytvor detailni CRO analyzu pro e-shop " + clientName + ".\n\n";
    prompt += "Strukturuj analyzu do techto sekci:\n\n";
    prompt += "KRITICKE PROBLEMY - resit ihned (veci ktere prokazatelne nejvice skodi konverzim)\n";
    prompt += "VYSOKA PRIORITA - resit do mesice\n";
    prompt += "STREDNI PRIORITA - resit do 3 mesicu\n";
    prompt += "QUICK WINS - snadne zmeny s velkym dopadem\n\n";
    prompt += "Pro kazde doporuceni: co presne chybi nebo je spatne, jak to opravit konkretne, jaky dopad to bude mit na konverze.\n";
    prompt += "Zames se na vsechny oblasti: HP, kategorie, detail produktu, kosik, mobilni verzi, duveryhodnost, USP, Page Speed a Google quality score.\n";
    prompt += "Celkem 15-20 konkretnich doporuceni.";

    var message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    var analysis = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ success: true, analysis: analysis });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
