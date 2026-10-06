# Testlijst: Aprende Papiamentu! (v0.5.0)

Created by DieOuwe · www.dieouwe.nl

Start `start-server.bat` (in de root van de repo, of in deze map) en open http://localhost:8080/papiamento/index.html (voor alles met app, offline en opnemen).
Alleen kijken kan ook door `index.html` te dubbelklikken. Vink af wat klopt.

## Start en menu
- [ ] Pagina opent zonder foutmelding; bovenbalk met 🌸, ⭐ 0, 📲 App en 🔊
- [ ] Bovenbalk blijft in beeld als je omlaag scrolt
- [ ] Eilandbalk toont Curaçao, Aruba, Bonaire op één regel (ook op een telefoon)
- [ ] "Spelen": Quiz en Badges; "Woorden leren": 5 kaarten met voortgangsbalk en "x / n geleerd"

## Leren
- [ ] Basiswoorden, Dieren, Kleuren, Nummers, Familie samen 42 woorden
- [ ] Kaart toont plaatje/emoji, Papiamentu, uitspraak `[ka-sjo]` en Nederlands
- [ ] ◀ ▶ en pijltjestoetsen werken; Escape gaat terug
- [ ] Eerste keer een woord bekijken geeft +1 ster, terugkomen niets extra
- [ ] 🔊 Zeg het speelt de stem af
- [ ] Familie bevat papa, mama, opa (welo), oma (wela), broer, zus, tante, oom
- [ ] Aruba: *kas* wordt "Cas"

## Quiz
- [ ] 10 vragen, geen woord twee keer; goed = groen + confetti + geluidje + 2 sterren; fout = rood, geen sterren
- [ ] 5 op rij geeft +1 bonusster
- [ ] Na het antwoord verschijnt het **leerkaartje** (plaatje, woord, uitspraak, vertaling, 🔊)
- [ ] Tik op een ander antwoord: het leerkaartje laat dat woord zien en horen, geen extra sterren
- [ ] Mouseover op een antwoord toont "woord = vertaling" (computer)
- [ ] "Volgende" is zonder scrollen bereikbaar, ook op 375×667
- [ ] Resultaatscherm met score en sterren; Terug midden in de quiz geeft geen fouten

## Sterren en badges
- [ ] Sterren blijven na verversen (F5) staan; badgescherm toont 12 badges
- [ ] Popup bij nieuwe badge bedekt de antwoorden niet

## Geluid en stemmen
- [ ] 🔊 ↔ 🔇 stopt alle geluid, stand blijft na verversen
- [ ] Alleen `mp3/mms/` gevuld: computerstem speelt
- [ ] Zet `mp3/vrouw/kacho.mp3` neer: Kachó speelt nu die opname, de rest nog de computerstem
- [ ] Hernoem een mp3 tijdelijk: browserstem of "nog geen geluid", geen fout

## Eigen plaatjes
- [ ] Zet `img/welo.png`: Welo toont het plaatje in leren en quiz, Wela blijft emoji
- [ ] Verwijder het plaatje: emoji is terug

## App en offline (via http://localhost:8080)
- [ ] 📲 App geeft de installeer-vraag van de browser of een korte uitleg
- [ ] Na installeren opent de app in een eigen venster zonder adresbalk
- [ ] Netwerk uit (of vliegtuigmodus), pagina verversen: app werkt nog; eerder beluisterde woorden spelen nog

## Terug naar de hoofdpagina
- [ ] Klik op 🌸 Aprende Papiamentu linksboven: je komt op de pagina met alle talen
- [ ] Online-controles (subdomein, afschermen, installeren) staan in de `TESTLIJST.md` in de root

## Opnamestudio (http://localhost:8080/papiamento/tools/studio.html)
- [ ] Alle 42 woorden met chips 🖼️ 🎙️ 🤖
- [ ] ⏺ Opnemen → ⏹ Stop → ▶ terugluisteren → 💾 Bewaar downloadt `<id>.webm`
- [ ] `python tools/opnames_naar_mp3.py` maakt `mp3/vrouw/<id>.mp3`; studio toont daarna 🎙️ aan

## Mobiel en toegankelijkheid
- [ ] 375 px breed: geen horizontale scroll, niets overlapt, knoppen makkelijk te raken
- [ ] Tab-toets toont een duidelijke paarse focusrand
- [ ] "Minder beweging" aan in het systeem: geen confetti en geen animaties

## Reset (schone test)
Console (F12): `localStorage.removeItem('papiweb.v1'); location.reload()`

## Automatische tests (uitgevoerd voor v0.4.0)
Quiz en badges (42 woorden, perfecte ronde = 22 sterren en 4 badges, opslag, luistervragen alleen met mp3) en 40 nieuwe controles:
service worker, manifest en iconen, installeer-knop (met en zonder browser-prompt), eigen plaatje, stemvolgorde vrouw boven mms,
leerkaartje en tooltips, Aruba "Cas", **offline herladen**, geen horizontale scroll en Volgende-knop in beeld op 375, 390, 820 en 1280 px, geen consolefouten.
