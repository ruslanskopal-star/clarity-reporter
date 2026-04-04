import { NextResponse } from "next/server";

var KNOWLEDGE_BASE = "Jsi expert na CRO pro e-shopy podle metodologie EshopBooster.\n\nHP:\n- Absence listy USP na HP i across celym e-shopem\n- Chybi viditelny kontakt v hlavicce (tel + email)\n- Recenze na HP co nejvyse, zlate hvezdicky\n- Hello bar - vyrazna barva\n- Rychly rozcestnik kategorii podle prodaju\n- Vyhledavani viditelne na desktopu i mobilu\n- Bannery musi mit CTA tlacitko\n\nKategorie:\n- Poradi produktu podle prodaju, skladem prvni\n- Filtry rozbalene podle dulezitosti\n- Zobrazeni terminu dodani u produktu\n- Stitky: lidovka, zlata stredni cesta, pro narocne\n\nDetail produktu:\n- Reference primo pod nazev produktu\n- Info kdy zbozi dorazi\n- Klic. informace shrnuty bodove\n- FAQ sekce\n- Upsell/cross-sell\n- Box nevite si rady s kontaktem\n\nKosik:\n- Policko slevoveho kodu skryt\n- Apple Pay / Google Pay pridat\n- Termin dodani i v kosiku\n\nObecne:\n- Velikost pisma min 16px\n- Spravny kontrast barev\n- Page Speed - obrazky pod 100kb\n- Kamenna prodejna prezentovat vsude\n";

export async function POST(req) {
  var body = await req.json();
  var clientName = body.clientName;
  if (!clientName) return NextResponse.json({ error: "Chybi jmeno" }, { status: 400 });
  try {
    var Anthropic = (await import("@anthropic-ai/sdk")).default;
    var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    var prompt = KNOWLEDGE_BASE + "\n\nKlient: " + clientName + "\n\nNa zaklade metodologie EshopBooster vytvor detailni CRO analyzu pro e-shop " + clientName + ".\n\nStrukturuj analyzu:\n\nKRITICKE PROBLEMY (resit ihned)\nVYSOKA PRIORITA (resit do mesice)\nSTREDNI PRIORITA (resit do 3 mesicu)\nQUICK WINS (snadne zmeny s velkym dopadem)\n\nPro kazde doporuceni: co chybi, jak opravit, jaky dopad. Celkem 15-20 doporuceni.";

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
