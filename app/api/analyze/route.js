// route_v6_edge_v8.js
// Zmeny oproti v7: injektovani realneho data do system promptu

export const runtime = 'edge'

const KRIS_KNOWLEDGE_BASE = `
# KRIS ZNALOSTNI BAZE v6

## MICROSOFT CLARITY – JAK CIST DATA PRO CRO ANALYZU

### Heatmapy
- Click heatmapy odhaluji kde uzivatele klikaji na neaktivni prvky (dead clicks) – okamzita priorita opravy
- Scroll heatmapy presne ukazuji kde uzivatele prestali scrollovat – obsah pod touto casti je prakticky neviditelny
- Pokud scroll depth na produktove strance nepresahuje 50 %, je problem s prvni obrazovkou nebo nacitanim
- Area heatmapy ukazuji kde uzivatele travi cas pohledem – porovnej s idealnim F-pattern nebo Z-pattern
- Pokud je CTR hlavniho CTA tlacitka pod 2 %, testuj text, barvu nebo pozici

### Rage Clicks
- Rage click = uzivatel klikne 3x a vice rychle za sebou na stejne misto – signal frustrace a konfuze
- Nejcastejsi priciny: neaktivni tlacitko, prvek ktery VYPADA klikatelne ale neni, pomaly JavaScript
- Top 3 stranky s nejvyssi miru rage clicks jsou nejvyssi priority pro redesign
- Rage clicks na checkout strance primo zpusobuji opusteni kosiku – resit okamzite
- Rage clicks na filtry signalizuji problem s UX filtrovani nebo rychlosti odezvy
- Jak reportovat: "Na strance X je rage click rate Y %, klikani na prvek Z – doporucuji deaktivovat nebo pridat akci"

### Dead Clicks
- Dead click = klik na prvek bez reakce – uzivatel ocekava akci ale nedostane ji
- Typicke problemy: dekorativni texty vypadajici jako odkazy, produktove obrazky bez zoomu, ikonky bez funkce
- Pokud vice nez 5 % kliknuti na dany prvek jsou dead clicks, nutny redesign nebo pridani funkce
- Produktove obrazky bez zoom funkce jsou masivni zdroj dead clicks

### Session Recordings
- Analyzuj relace s nejvyssim cas na strance ale nizkou konverzi – co konkretne brani dokonceni?
- Filtruj nahravky kde uzivatel navstivil kosik ale nenakoupil – identifikuj pricinu opusteni
- Sleduj "rage sessions" (vice nez 5 rage clicks v jedne relaci) – nejcennejsi zpetna vazba
- Porovnej nahravky desktop vs. mobil – chovani se vychylne lisi
- Hledej vzory: na kterem konkretnim poli formulare uzivatel prestal?

### Scroll Depth
- Scroll depth pod 30 % = vazny problem s prvni obrazovkou
- Scroll depth 30 az 60 % = prumerny vysledek, testuj usporadani obsahu
- Scroll depth nad 70 % = dobry engagement, umisti sem CTA tlacitko
- Na kategoriove strance: scroll depth ktery nepresahne listing = filtry nefunguji
- Na blogu: scroll depth pod 50 % = titulek slibil vic nez obsah dodal

### Konverzni Trychtyre v Clarity
- Nastav trychtyr: Homepage, Kategorie, Produkt, Kosik, Objednavka, Dekujeme
- Nejvyssi odpad v trychtyr = nejvetsi konverzni bariery
- Odpad mezi Produkt a Kosik nad 70 % = problem s cenou, duverou nebo chybejicimi informacemi
- Odpad pri checkoutu nad 60 % = problem s formularem, dopravou nebo platebnimi metodami
- Porovnavej trychtyre: mobil vs. desktop, organika vs. placena navsteva

### JavaScript Chyby
- Clarity zaznamenava JS chyby – zkontroluj stranky s vysokou miru opakujicich se chyb
- JS chyba na checkout strance = prime opusteni – absolutni priorita
- Chyby ve formulari = uzivatel nemuze dokoncit akci

### Doporuceny Postup CRO s Clarity Daty
1. Identifikuj top 5 stranek s nejvyssim odpadem v trychtyr
2. Pro kazdu stranku zkontroluj scroll depth, rage clicks, dead clicks a session recordings
3. Formuluj hypotezy: "Uzivatele nescrolluji pod produkt – pricina je neatraktivni prvni obrazovka"
4. Navrhni konkretni reseni s prioritou
5. Po implementaci sleduj zmenu chovani v Clarity

### Jak Prezentovat Clarity Data Klientovi
- Vzdycky uved konkretni cisla: "Rage click rate na tlacitku Koupit je 18 %, prumerne to byva pod 3 %"
- Pripoj screenshot heatmapy nebo timestamp konkretni session recording
- Preved data na penize: "Pokud opravime rage click na checkoutu, odhadujeme zvyseni konverze o 0,3 az 0,5 %"
- Prioritizuj podle dopadu na konverzi, ne podle vizualni atraktivity problemu

## PRVNI DOJEM A DUVERYHODNOST
- Navstevnik si udela prvni dojem za 0,1 sekundy
- Halo efekt: krasny web = lepsi produkt v mysli zakaznika
- Nejdulezitejsi trust signaly: recenze, fotky realnych zakazniku, certifikaty, media
- Above the fold musi komunikovat: co prodavate, proc u vas, a vyzvu k akci

## OHYB STRANKY (The Fold)
- Google studie: nad ohybem je obsah videt v 68 % pripadu, pod ohybem jen 40 %
- Nielsen Norman: rozdil pozornosti nad vs. pod ohybem = 84 %
- Nejlepsi pozice CTA: tesne nad ohybem nebo primo v prvni obrazovce
- Uzivatele scrolluji POUZE pokud je obsah prvni obrazovky dostatecne motivujici

## SLIDER NA HOMEPAGE
- Banner blindness: lidi ignoruji vse co se hybne nebo pripomina reklamu
- Kobercovy nalet sdeleni: misto jednoho silneho sdeleni bombardujete vice nekonkretnimi
- Reseni: staticke hero s JEDNOU silnou nabidkou a JEDNOU vyzvou k akci

## SLOGAN A POSITIONING
- 90 % sloganu jsou prazdne fraze: "Vase spokojenost je nasi prioritou"
- Test: zakryjte logo a dejte slogan konkurenci – pokud pasuje, slogan nic nerika
- Misto sloganu testujte konkretni value proposition: "Dorucime do 24h nebo vratime penize"

## PRODUKTOVE STRANKY A FOTOGRAFIE
- 75 % zakazniku povazuje fotky za klicove pri rozhodovani
- 58 % zakazniku chce videt produkt ze vsech stran – minimum jsou 3 az 5 fotek
- Lifestyle fotky vyrazne zvysuji konverze u obleceni, doplnku, nabytku
- Video produktu zvysuje konverze az o 80 % u slozitejsich produktu
- Dostupnost skladem musi byt jasne viditelna

## NAVIGACE A KATEGORIE
- Hamburger menu na desktopu je chyba – skryva navigaci a snizuje konverze
- Do 10 polozek: horizontalni navigace; 10 a vice polozek: vertikalni vlevo
- Interni vyhledavani: zakaznici kteri vyhledavaji konvertuji 2 az 3x lepe

## VYPRODANE PRODUKTY
- Neaktivni tlacitko bez vysvetleni = nejhorsi mozny stav
- Nabidni alternativni produkty nebo Hlidaci pes – posleme e-mail
- Trvale vyprodane produkty: NESMAZAVEJ stranku (SEO hodnota), presmeruj na alternativy

## KOSIK A CHECKOUT
- Zasilkovna vede (9 500 vydejnich mist)
- Datum doruceni: zobrazuj u kazde dopravy – dela to jen polovina e-shopu
- KRITICKA CHYBA: neptejte se na dorucovaci adresu pri osobnim odberu
- Registraci navrhujte az na dekovaci strance
- Minimalizuj pocet poli – kazde extra pole snizuje konverze

## RECENZE A SOCIALNI DUKAZ
- 92 % zakazniku cte recenze pred nakupem
- Perfektni 5.0 je podezrele – optimum je 4,2 az 4,7
- Recenze s fotkami konvertuji 2x lepe nez textove
- Pod 10 recenzi zakaznici neveruji; 50 a vice je solidni zaklad

## CENOTVORBA A PSYCHOLOGIE CEN
- EU regulace 2023: zobrazuj nejnizsi cenu za poslednich 30 dni jako referencni
- Psychologicke ceny: 999 Kc je lepsi nez 1 000 Kc
- Kotvici cena: nejdrazsi varianta vlevo meni vnimani ostatnich cen

## MOBILNI VERZE
- Vice nez 60 % navstevniku prichazi z mobilu, ale jen 30 % tam nakoupi
- Kazda sekunda navic pri nacitani = 7 % pokles konverzi
- Thumb zone: nejdulezitejsi akce do spodni casti obrazovky
- Sticky kosik nebo CTA tlacitko vyrazne zvysuje mobilni konverze

## A/B TESTOVANI
- Mene nez 1 000 konverzi za mesic = A/B testovani nema smysl
- Nejlepsi veci k testovani: nadpis, text CTA, cena dopravy, poradi produktu
- Statisticka signifikance minimalne 95 %

## EMAILOVY MARKETING
- Opusteny kosik: serie 3 e-mailu (1h, 24h, 72h) – prumerna konverze 5 az 15 %
- Personalizace predmetu (jmeno zakaznika) zvysuje open rate o 26 %
- Ziskat noveho zakaznika stoji 5 az 7x vice nez udrzet stavajiciho

## DARK PATTERNS
- Skryte poplatky v poslednim kroku = nejcastejsi duvod opusteni kosiku
- Predvybrane souhlasy s newsletterem jsou v EU ilegalni
- Falsna urgence poskozuje brand dlouhodobe

## PRISTUPNOST (EU zakon od cervna 2025)
- Od cervna 2025 povinna pristupnost pro e-shopy nad urcitou velikost
- Minimalni velikost dotykove plochy: 7x7 mm s 2mm rozestupy
- Kontrastni pomer textu: minimalne 4,5:1 pro normalni text
- Formulare: labely musi byt viditelne, ne jen placeholder ktery zmizi pri psani
`

export async function POST(req) {
  try {
    const { clientUrl, withClarity } = await req.json()

    if (!clientUrl) {
      return new Response(
        JSON.stringify({ error: 'Chybi URL klienta' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API klic neni nastaven' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const clarityInstruction = withClarity
      ? `Klient MA pristup do Microsoft Clarity. V analyze zahrn konkretni doporuceni jak vyuzit data z Clarity (heatmapy, rage clicks, dead clicks, session recordings, scroll depth) pro overeni a prioritizaci tvych doporuceni. U kazde kriticke nebo vysoke priority uved jak ji overit v Clarity datech.`
      : `Klient NEMA pristup do Microsoft Clarity. Analyzu postav na best practices a obecnych vzorech v dane kategorii. Doporuc zavedeni Clarity jako quick win pro dalsi optimalizaci.`

    const dateInstruction = `Dnesni datum je ${dateStr}. Pokud ve sve analyze uvadis datum analyzy, pouzij VZDY toto datum. Nikdy nepouzivej jine datum.`

    const systemPrompt = `Jsi KRIS – Knowledge-based Report Intelligence System, expert CRO analytik e-shopu metodologie ESHOP BOOSTER.

Tvoje znalostni baze:
${KRIS_KNOWLEDGE_BASE}

TVOJE ULOHA: Analyzuj e-shop klienta na zaklade jeho URL a vytvor strukturovanou CRO analyzu. Pis v cestine, konkretne a akcionovatelne. Kazde doporuceni musi byt specificke pro dany e-shop a jeho kategorii produktu, ne obecne.

${clarityInstruction}

${dateInstruction}

DULEZITE PRAVIDLO 1 – NO DASH RULE (ABSOLUTNI ZAKAZ): Ve svem vystupu NIKDY nepouzivej znak pomlcky jako oddelovac nebo dekoraci. Konkretne zakazane znaky: en dash (–), em dash (—), a pomlcka pouzita jako oddelovac v textu. Jedina vyjimka: pomlcka uvnitr slova (e-shop, self-service). Misto oddelovacu pouzivej VZDY dvojtecku nebo novy radek. Priklad SPATNE: "Analyza – vysledky – doporuceni". Priklad SPRAVNE: "Analyza: vysledky: doporuceni". Toto pravidlo je absolutni a nema vyjimky.

DULEZITE PRAVIDLO 2 – NO VERSION FOOTER: Na konci analyzy NIKDY nepridavej radky s verzi, nazvem systemu ani zkratkami jako "KRIS v5", "KRIS analyza", "ESHOP BOOSTER metodologie v5" apod. Footer s autorstvim je reseny zvlast na urovni UI.

POVINNÁ STRUKTURA ANALYZY (pouzivej presne tato klicova slova pro spravne zobrazeni):

KRITICKE PRIORITY
1. [konkretni problem s dopadem na konverze]
   Proc to boli: [vysvetleni]
   Jak opravit: [konkretni reseni]
   ${withClarity ? 'Jak overit v Clarity: [kde se podivat v Clarity]' : ''}

VYSOKA PRIORITA
1. [doporuceni]
   Dopad: [odhad dopadu]
   Jak na to: [konkretni kroky]
   ${withClarity ? 'Clarity signal: [co hledat v datech]' : ''}

STREDNI PRIORITA
1. [doporuceni]
   Jak na to: [kroky]

QUICK WINS (do 1 tydne)
1. [co jde udelat rychle a levne]

Analyzuj tyto oblasti: homepage a prvni dojem, produktove stranky a fotografie, navigace a kategorie, kosik a checkout, trust signaly a recenze, mobilni verze, cenotvorba a slevy, copywriting a mikrotexty.

Bud konkretni: pojmenuj konkretni prvky webu, uved konkretni cisla a kroky. Analyza musi byt primo pouzitelna jako akcni plan pro klienta.`

    const now = new Date()
    const dateStr = now.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })

    const userMessage = `Priprav kompletni KRIS CRO analyzu pro e-shop: ${clientUrl}

Zhodnocuji web podle URL a kategorie produktu. Zamer se na nejcastejsi konverzni problemy v dane kategorii. Bud konkretni, pojmenuj konkretni prvky webu, uved konkretni cisla a kroky. Analyza musi byt primo pouzitelna jako akcni plan.`

    // Streaming SSE response – obchazi 30s Edge timeout
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.text()
      return new Response(
        JSON.stringify({ error: 'Chyba Anthropic API: ' + err }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Prenaset SSE stream primo klientovi
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      const reader = anthropicResponse.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              if (
                parsed.type === 'content_block_delta' &&
                parsed.delta?.type === 'text_delta'
              ) {
                const chunk = parsed.delta.text
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
                )
              }
            } catch {
              // ignoruj nevalidni JSON radky
            }
          }
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'))
      } catch (err) {
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`)
        )
      } finally {
        await writer.close()
      }
    })()

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || 'Neznama chyba' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
