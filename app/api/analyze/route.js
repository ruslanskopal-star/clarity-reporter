import { NextResponse } from "next/server";

const KNOWLEDGE_BASE = `
Jsi expert na CRO (Conversion Rate Optimization) pro e-shopy podle metodologie EshopBooster. 
Při analýze vždy kontroluj tyto klíčové oblasti a doporučení:

HP (Hlavní stránka):
- Absence lišty USP - musí být na HP i napříč celým e-shopem (detail, kategorie)
- USP musí být proklikávatelné na statické stránky
- Chybí viditelný kontakt v hlavičce (tel + email + obličej + zelené/červené kolečko dostupnosti)
- Logo - doplnit dovětek názvu pro jasnou specializaci
- Recenze na HP co nejvýše, zlaté hvězdičky, ověřené recenze
- Hello bar - výrazná barva, správný kontrast
- Rychlý rozcestník kategorií - pořadí podle prodejů
- Políčko vyhledávání - viditelné na desktopu i mobilu
- Patička - kontakty, loga Heuréky, platebních metod
- Bannery musí mít CTA tlačítko a splňovat squint test
- Max 2 slidery na HP
- Info menu - oduktů podle prodejů, skladem produkty první
- Filtry rozbalené a seřazené podle důležitosti
- Zobrazení termínu dodání u produktů
- Štítky "lidovka", "zlatá střední cesta", "pro náročné"
- Hodnocení hvězdičky jen u produktů kde jsou, zlaté barvy
- Text kategorie využít pro kredibilitu + rozcestník

Detail produktu:
- Reference přímo pod název produktu
- Informace kdy zboží dorazí (dnes/zítra/pozítří)
- Infografika v galerii u TOP produktů
- Klíčové informace shrnuté bodově
- FAQ sekce
- Upsell/cross-sell nabídky
- Univerzální informace o firmě (recyklova u vás"
- Box "nevíte si rady" s kontaktem

Košík:
- Políčko slevového kódu minimalizovat/skrýt
- Apple Pay / Google Pay přidat
- Termín dodání i v košíku
- Upsell při přidání do košíku
- Možnost platby QR kódem

Mobilní verze:
- Hamburger menu vpravo
- Vyhledávání viditelně
- Správné rozbalení kategorií

Obecně:
- Velikost písma min 13px, ideálně 16px
- Správný kontrast barev (WCAG standard)
- Page Speed - optimalizace obrázků pod 100kb
- Kamenná prodejna - prezentovat na webq) {
  const { clientName } = await req.json();
  if (!clientName) return NextResponse.json({ error: "Chybi jmeno" }, { status: 400 });
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4000,
      messages: [{
        role: "user",
        content: `${KNOWLEDGE_BASE}

Klient: "${clientName}"

Na základě výše uvedené metodologie EshopBooster vytvoř detailní CRO analýzshop "${clientName}".

Strukturuj analýzu takto:

🔴 KRITICKÉ PROBLÉMY (řešit ihned)
🟠 VYSOKÁ PRIORITA (řešit do měsíce)
🟡 STŘEDNÍ PRIORITA (řešit do 3 měsíců)
⚡ QUICK WINS (snadné změny s velkým dopadem)

Pro každé doporučení uveď:
- Co přesně chybí nebo je špatně
- Jak to opravit konkrétně
- Jaký dopad to bude mít na konverze

Zaměř se na: HP, krzi, důvěryhodnost a USP.
Celkem 15-20 konkrétních doporučení.`
      }]
    });

    const analysis = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ success: true, analysis });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
