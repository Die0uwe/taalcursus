# Changelog: Taalcursus

Created by DieOuwe · www.dieouwe.nl

Nieuwste bovenaan. De wijzigingen van de cursus zelf staan in `papiamento/CHANGELOG.md`.

## [2026-10-07 03:20] — Vlagplaatjes voor Windows, autootjes 5px lager op mobiel

**Type:** Feature + UI Polish
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `vlaggen.js`, `vlaggen/*.svg` (nieuw), `papiamento/img/vlag-*.svg`, `hub.js`, `sfeer.js`, `sfeer.css`, `kleuren.css`, `sw.js`, `papiamento/js/app.js`, `onderhoud.html`, `tools/*`
**Versie:** hoofdpagina v0.10.1

### Wijzigingen
- Windows heeft geen vlag-emoji (letters als "GB", "CW"). `vlaggen.js` test dat met een canvas en zet daar dan een klein vlagplaatje (SVG) voor: hoofdpagina, opduikende vlaggetjes en de eilandkeuze (Curaçao, Aruba, Bonaire). Op telefoon, Mac en Linux blijft de emoji staan.
- Autootjes op mobiel (tot 480 px) 5 px lager (`bottom` 52 naar 47 px).
- Generator: de eilandvlaggetjes staan alleen in de voorraadlijst van Papiamentu; in de andere cursussen liet dat de service worker niet installeren (opgevangen door de cursustest).
- Getest met een nagebootste Windows (geen emoji-vlaggen): 6 plaatjes op de hoofdpagina, 3 bij de eilandkeuze, alles laadt; cursustest 72/72.
- Let op: de vlag van Bonaire en de wapens in de Spaanse vlag zijn vereenvoudigd.

## [2026-10-07 03:00] — Deel-knop, huisjes en bomen goed zichtbaar in browsers

**Type:** Feature + Bugfix
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `delen.js` (nieuw), `kleuren.css`, `sfeer.js`, `index.html`, `sw.js`, `papiamento/*`, `tools/maak_cursus.py`, `tools/maak_deploy.py`, `README.md`
**Versie:** hoofdpagina v0.10.0, papiamento v0.14.0, overige cursussen v0.10.0

### Wijzigingen
- Deel-knop 📤 in de bovenbalk van de hoofdpagina en alle cursussen: op telefoon het eigen deelmenu (`navigator.share`), in de browser een paneel met WhatsApp, Facebook, Telegram, X, e-mail en link kopiëren. Geen externe scripts.
- Deelvoorbeeld: `og:`-tags op de hoofdpagina en in de cursussen (plaatje meisje-boven, titel en beschrijving).
- Huisjes en bomen op brede schermen (vanaf 1100 px) in de marges naast de kaarten; ze stonden eerst achter de kaarten.
- Huisjes, bomen en weg worden nu ook gebouwd als Windows "animaties uit" staat (prefers-reduced-motion); daardoor zag je in Chrome niets.
- Getest: deelknop op hub, papiamento en engels (paneel, native delen, CSP, geen horizontale scroll), cursustest 72/72.

## [2026-10-07 02:35] — Onderhoud-uit werkt: voorpagina nooit meer uit oude cache

**Type:** Bugfix
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `sw.js`, `.htaccess`, `docs/FTP-STAPPENPLAN.md`
**Versie:** hoofdpagina v0.9.0

### Wijzigingen
- Oorzaak: de service worker bewaarde `/` toen dat nog de onderhoudspagina was en bleef die oude kopie tonen, ook na hernoemen naar `onderhoud-uit.html` (gereproduceerd met een Apache-simulatie).
- Nu: `/` komt altijd eerst van het netwerk; de bewaarde `index.html` dient alleen offline. `/` staat niet meer in de voorraad.
- `.htaccess`: `onderhoud.html` krijgt ook `no-cache`.
- Getest: onderhoud aan, uit, weer aan: wisselt direct.
- `tools/maak_deploy.py --zip --live` laat `onderhoud.html` weg, zodat een nieuwe upload het onderhoud niet terugzet.

## [2026-10-07 02:20] — Huisjes zichtbaar op de hoofdpagina (voet viel er overheen)

**Type:** Bugfix
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `hub.css`, `sw.js`
**Versie:** hoofdpagina v0.8.0

### Wijzigingen
- Op de hoofdpagina lag de voet (halfdoorzichtig, 94 px hoog) over de weg, huisjes en bomen, waardoor ze op een groot scherm onder de weg leken te staan of weg waren. De voet is nu vast onderaan en compact (één regel), zoals bij de onderhoudspagina, zodat de weg met huisjes en bomen er netjes boven staat. Controle op 1920x1000 en 1000x640.

---

## [2026-10-07 02:00] — Schakelaar voor de computerstem

**Type:** Feature
**Skill:** webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `papiamento/js/{audio,game,app}.js`, `papiamento/index.html`, `papiamento/css/style.css`, `papiamento/sw.js`, `tools/maak_cursus.py`
**Versie:** papiamento v0.13.0, overige cursussen v0.9.0

### Wijzigingen
- In het 🎚️-paneel staat nu "Computerstem aan". Uit betekent: geen browserstem en geen MMS-computerstem-mp3's; echte opnames (`mp3/vrouw/…` en losse `mp3/<id>.mp3`) blijven klinken. De keuze wordt bewaard per cursus; de melding onder het woord legt uit dat de stem uit staat.
- Een uitklapbare uitleg in het paneel: de app kan alleen zijn eigen stem uitzetten. Praat het systeem zelf mee, dan staat dat in Windows (Verteller: Windows-toets + Ctrl + Enter, of Instellingen > Toegankelijkheid > Verteller) of Mac (Systeeminstellingen > Toegankelijkheid > Gesproken inhoud).

---

## [2026-10-07 01:40] — Huisjes en bomen langs de weg

**Type:** Feature / UI Polish
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `sfeer.js`, `sfeer.css`, `sw.js`
**Versie:** hoofdpagina v0.7.0

### Wijzigingen
- Langs de weg onderaan staan nu huisjes (🏠 🏡 🏘️) en bomen (🌳 🌲), verspreid over de breedte. Ze staan stil, achter de auto's en achter de kaarten, en zijn niet klikbaar. Op een telefoon zijn het er minder en kleiner.
- Alleen op de hoofdpagina en de onderhoudspagina (waar ook de auto's rijden); bij "minder beweging" blijft de sfeerlaag uit, zoals eerder.

---

## [2026-10-07 01:25] — Meisje-bestand hernoemd (oude plaatje bleef in de cache hangen)

**Type:** Bugfix
**Skill:** webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `meisje-boven.webp` (was `meisje.webp`), `papiamento/ui/meisje-boven.webp`, `index.html`, `onderhoud.html`, `sw.js`, `papiamento/sw.js`, `tools/maak_deploy.py`
**Versie:** hoofdpagina v0.6.0, papiamento v0.12.0, overige cursussen v0.8.0

### Wijzigingen
- Het leunende meisje staat nu onder een nieuwe bestandsnaam. Op de live site kwam nog het oude cirkel-plaatje (duim omhoog) voor, omdat Cloudflare, de browser en de offline-cache het oude `meisje.webp` bleven tonen. Een nieuwe naam omzeilt dat.
- Cache-versies verhoogd, zodat de service workers het nieuwe bestand binnenhalen.

---

## [2026-10-07 01:10] — Poppetje voor de antwoordtekst; auto's en ballonnen ook op de hoofdpagina

**Type:** Feature / UI Polish
**Skill:** webapp-dev, design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `papiamento/js/app.js`, `papiamento/css/style.css`, `papiamento/index.html`, `index.html`, `sw.js`
**Versie:** hoofdpagina v0.5.0, papiamento v0.11.0, overige cursussen v0.7.0

### Wijzigingen
- Quiz: bij goed staat het goed-poppetje klein (44 px) vóór "Bon! Goed gedaan!", bij fout het fout-poppetje vóór "Bijna! Het is: …". Het poppetje in de hoek van het scherm is vervangen door deze plek. De emoji's 🎉 en 😊 in de tekst zijn weggehaald.
- Hoofdpagina (alleen daar): `data-sfeer="vol"`, dus ook de politie- en brandweerauto, de weg, meer ballonnen en sterren en de opduikende vlaggetjes zoals op de onderhoudspagina. Alles is niet-klikbaar, dus de kaarten blijven gewoon werken. Bij "minder beweging" staat het stil. De cursussen blijven rustig.

---

## [2026-10-07 00:55] — Groter meisje boven de rand (onderhoud) en boven de titel (hoofdpagina)

**Type:** UI Polish
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `onderhoud.css`, `hub.css`, `index.html`
**Versie:** hoofdpagina v0.4.0

### Wijzigingen
- Onderhoudspagina: het meisje is veel groter (tot 390 px) en leunt met haar handen op de bovenrand van de kaart. Ze staat nu in de pagina zelf in plaats van er los bovenop, dus de muts wordt nooit afgeknipt.
- Hoofdpagina: meisje boven de titel, groter dan eerst (250 px, op telefoon 190 px), zoals bij de cursussen.

---

## [2026-10-07 00:40] — Eén gedeeld kleurenbestand voor alle pagina's (kleuren van de onderhoudspagina)

**Type:** UI Polish
**Skill:** design-architect, webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `kleuren.css` (nieuw), `index.html`, `onderhoud.html`, `sw.js`, `papiamento/css/kleuren.css`, `papiamento/index.html`, `papiamento/sw.js`, `tools/maak_cursus.py`, `tools/maak_deploy.py`
**Versie:** hoofdpagina v0.4.0, papiamento v0.10.0, overige cursussen v0.6.0

### Wijzigingen
- Nieuw `kleuren.css`: de lucht (blauw naar geel), roze/gele titels, roze stippelranden, bruine tekst en de roze/oranje/blauwe/groene knoppen van de onderhoudspagina. Het wordt als laatste stijlblad geladen door de hoofdpagina, de onderhoudspagina en elke cursus, dus één plek om kleuren te wijzigen.
- De paarse accenten in de cursussen zijn nu merk-roze of blauw; de lichtere achtergrond is vervangen door dezelfde lucht als de onderhoudspagina.
- `tools/maak_cursus.py` kopieert `kleuren.css` uit de hoofdmap naar het sjabloon en alle cursussen; de kopie staat ook in de offline-cache.

---

## [2026-10-07 00:20] — Het echte meisje (leunend op de kaart) op alle startpagina's

**Type:** UI Polish
**Skill:** design-architect, webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `meisje.webp`, `papiamento/ui/meisje.webp`, `onderhoud.css`, `index.html`, `hub.css`, `papiamento/index.html`, `papiamento/css/style.css`, `papiamento/sw.js`, `tools/maak_deploy.py`
**Versie:** papiamento v0.9.0, overige cursussen v0.5.0

### Wijzigingen
- Het meisje dat met haar handen op de rand leunt is nu `meisje.webp`: op de onderhoudspagina kijkt ze over de kaart, op de hoofdpagina staat ze boven de titel, en in elke cursus staat ze boven "Aprende Papiamentu" (andere talen: eigen titel).
- De twee cirkel-plaatjes (duim omhoog en nadenkend) worden weer alleen voor goed en fout in de quiz gebruikt (`ui/mascotte-goed.webp`, `ui/mascotte-fout.webp`). `meisje-denken.webp` is weggehaald.
- Cursussen hebben `ui/meisje.webp` ook in de offline-cache.

---

## [2026-10-06 23:55] — Meisje terug op de voorpagina en de onderhoudspagina

**Type:** Bugfix
**Skill:** webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `meisje.webp`, `meisje-denken.webp`, `index.html`, `hub.css`, `sw.js`, `onderhoud.html`, `tools/maak_deploy.py`
**Versie:** hoofdpagina v0.3.0

### Wijzigingen
- Het oorspronkelijke meisje-plaatje (`plak-mux2b7wy-7068c1.webp`) zat nooit in de repo of zip, dus de onderhoudspagina toonde haar niet. Nu wijst die pagina (en `og:image`) naar `meisje.webp`: het meisje met de duim omhoog, dat meegaat in de zip.
- De hoofdpagina heeft haar nu ook bovenaan, met een zachte beweging (staat stil bij "minder beweging"). Ze is offline beschikbaar via de service worker.

---

## [2026-10-06 23:10] — Kinderlook: pastelkaarten met dikke randen, samen met de nieuwe lucht

**Type:** UI Polish
**Skill:** design-architect, webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `papiamento/css/style.css`, `papiamento/index.html`, `papiamento/sw.js`, `tools/maak_cursus.py`, alle gegenereerde cursussen
**Versie:** papiamento v0.8.0, overige cursussen v0.4.0

### Wijzigingen
- Kaarten zoals de eerste versie: pastelkleur per categorie, dikke gekleurde rand, harde schaduw, grote emoji zonder cirkel, cursief ondertitel, paarse voortgangstekst.
- Quiz en Badges zijn nu ook pastelkaarten (blauw, oranje) in plaats van felle verlopen.
- Grote titel met bloemetjes (bij andere talen met de vlag) en de groet in de ondertitel.
- Eilandkeuze en knoppen als paarse bolletjes met harde schaduw; sterrenbalk als witte pil met gele rand.
- Leerkaart, quizvraag en antwoorden met dikke randen. Blijft behouden: lucht, zon, wolk, stippellijnen bij balk en voet, rustige animaties.

---

## [2026-10-06 22:58] — Poppetje bij goed/fout en geluidjes-knop met volume

**Type:** Feature
**Skill:** webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `papiamento/ui/`, `papiamento/js/{app,audio,game}.js`, `papiamento/index.html`, `papiamento/css/style.css`, `papiamento/sw.js`, `tools/maak_cursus.py`, `tools/maak_deploy.py`
**Versie:** papiamento v0.7.0, overige cursussen v0.3.0 (generator)

### Wijzigingen
- Na elk quizantwoord verschijnt kort (2,2 s) een klein poppetje linksonder: `ui/mascotte-goed.webp` bij goed, `ui/mascotte-fout.webp` bij fout. Het verdwijnt bij de volgende vraag en blokkeert niets.
- Nieuwe knop 🎚️ in de bovenbalk: geluidjes aan/uit en een volumeslider. Instelling blijft bewaard (localStorage). Bij het schuiven klinkt een proefgeluidje. 🔊 bovenin blijft alle geluid (ook de stem) uitzetten.
- Geluidjes zijn zachter dan eerst (standaard 50%).
- Nieuwe map `ui/` in elke cursus (offline in de service worker); generator en deploy-script nemen die mee.

### Gecontroleerd
- cursustest 72/72, paneel/volume/opslag/poppetje getest in Papiamentu en Oekraïens, geen CSP-fouten, geen horizontale scroll.

---

## [2026-10-06 22:35] — Alle cursussen in de merkstijl, maar rustiger

**Type:** UI Polish
**Skill:** design-architect, webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `papiamento/css/style.css`, `papiamento/sw.js`, `tools/maak_cursus.py`, alle gegenereerde cursussen
**Versie:** papiamento v0.6.0, overige cursussen v0.2.0

### Wijzigingen
- Alle zes de cursussen hebben nu de look van de hoofdpagina: luchtverloop, Comic Sans-achtig lettertype, stippelranden, roze/gele koppen, zon en een wolk.
- Rustiger: stuiterende plaatjes weg, kleinere hover-, schud- en pop-effecten, zon staat stil en er is één heel langzame wolk (160 s). Geen ballonnen, sterren, vlaggetjes of voertuigen in de leeromgeving.
- Alles is pure CSS (geen extra bestanden, werkt offline en onder de strikte CSP). Bij "minder beweging" staat alles stil.
- Cursussen opnieuw gegenereerd met `maak_cursus.py --alle --force` (iconen, mp3 en eigen plaatjes blijven staan).

### Gecontroleerd
- cursustest 72/72 OK, geen CSP-fouten, geen horizontale scroll op 375/390/820/1280 px in alle zes cursussen.

---

## [2026-10-06 22:20] — Merk "De wereld rond in 80 vragen": onderhoudspagina terug en nieuwe look hoofdpagina

**Type:** UI Polish
**Skill:** design-architect, webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** `onderhoud.html|css|js`, `sfeer.css|js`, `hub.css`, `index.html`, `sw.js`, `tools/maak_deploy.py`
**Versie:** hoofdpagina v0.2.0

### Wijzigingen
- De originele "Komt eraaaaaaan!!!"-pagina is terug (zon, wolken, ballonnen, politie- en brandweerauto, vlaggetjes, regenboogbalk), opgesplitst in `onderhoud.html`, `onderhoud.css`, `onderhoud.js`. Reden: de beveiligingsregels (CSP) blokkeren inline stijl en script, waardoor de pagina kaal was.
- Het meisje-plaatje wordt verborgen als het bestand ontbreekt (geen kapot plaatje meer).
- De hoofdpagina heeft nu hetzelfde merk: hemelkleuren, speelse letters, stippellijnen, zon, wolken, ballonnen en vlaggetjes met de taalnamen (`sfeer.css`, `sfeer.js`). Bij "minder beweging" staat alles stil.
- Deploy-script neemt de nieuwe bestanden mee.

### Open actiepunten
- [ ] `logo.png` en `plak-mux2b7wy-7068c1.webp` (meisje) in de repo zetten zodra beschikbaar
- [x] Cursussen zelf ook in dit merk (zie 22:35)

---

## [2026-10-06 22:00] — Cursussen Engels, Spaans, Duits, Frans en Oekraïens

**Type:** Feature
**Skill:** webapp-dev, python-tools, design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `engels|spaans|duits|frans|oekraiens/*`, `tools/talen.py`, `tools/maak_cursus.py`, `tools/maak_iconen.js`, `cursussen.js`, `papiamento/js/{words,game,audio,app}.js`, `papiamento/css/style.css`
**Versie:** hoofdpagina v0.2.0, nieuwe cursussen v0.1.0

### Wijzigingen
- Vijf nieuwe cursussen met 42 woorden elk (zelfde 5 categorieën), uitspraakgids voor Nederlandse kinderen, quiz, sterren, badges, app en offline. Stem: browser/apparaat.
- Het sjabloon is generiek gemaakt: taalnaam, badge-naam, opslagsleutel en browserstem staan nu in `meta` van `words.js`; de dialectbalk verdwijnt bij één dialect. Papiamento werkt ongewijzigd.
- `tools/maak_cursus.py` + `tools/talen.py`: een nieuwe cursus maken uit het sjabloon; `tools/maak_iconen.js` voor iconen met vlag.
- Elke cursus heeft een eigen service worker-voorvoegsel (`eng-`, `spa-`, `deu-`, `fra-`, `ukr-`) en eigen `localStorage`-sleutel.
- Hoofdpagina: alle zes kaarten staan op "beschikbaar".
- Getest: alle zes cursussen (laden, leren, quiz van 10 vragen, opslag, service worker, offline, terug naar de hoofdpagina, CSP).

### Open actiepunten
- [ ] Woorden en uitspraak laten nakijken door moedertaalsprekers (vooral Oekraïens)
- [ ] Eventueel mp3's maken met MMS (`mms-tts-eng/-spa/-deu/-fra/-ukr`, CC BY-NC) of inspreken
- [ ] Eigen plaatjes (`<cursus>/img/`, id's als `zon.png`, `hond.png`)
- [ ] Test op een echte telefoon of de browser een stem heeft voor elke taal (vooral Oekraïens)

---

## [2026-10-06 20:15] — Zesde cursus: Oekraïens, FTP-stappenplan

**Type:** Feature / Docs
**Skill:** webapp-dev, wow-git-manager (via wow-bigboss-orchestrator)
**Bestanden:** `cursussen.js`, `oekraiens/*`, `docs/FTP-STAPPENPLAN.md`, `README.md`, `TESTLIJST.md`
**Versie:** v0.1.0

### Wijzigingen
- Oekraïens (🇺🇦, Українська) als zesde taal: placeholdermap `oekraiens/` en kaart op de hoofdpagina.
- `docs/FTP-STAPPENPLAN.md`: bouwen, uploaden met FileZilla naar het subdomein, controleren, problemen, bijwerken.

### Open actiepunten
- [x] Zesde cursus kiezen
- [ ] GitHub Pages aanzetten (Settings → Pages → GitHub Actions) of subdomein uploaden
- [ ] Licentiekeuze (MIT voor code) bevestigen

---

## [2026-10-06 20:05] — Hoofdpagina en repo-opzet voor meerdere cursussen

**Type:** Feature / Migratie
**Skill:** webapp-dev, python-tools, wow-git-manager (via wow-bigboss-orchestrator)
**Bestanden:** `index.html`, `hub.css`, `hub.js`, `cursussen.js`, `pwa.js`, `sw.js`, `manifest.webmanifest`, `icons/*`, `engels|spaans|duits|frans/*`, `tools/maak_deploy.py`, `.htaccess`, `deploy/*`, `.github/workflows/pages.yml`, docs
**Versie:** v0.1.0

### Wijzigingen
- **Hoofdpagina** met een kaart per taal (vlag, naam, voortgang uit `localStorage`), totaal aantal sterren, 📲 App-knop en eigen offline-modus (service worker met scope `/`, voorvoegsel `hub-`).
- Alles wat er was staat in `papiamento/`; placeholders voor `engels/`, `spaans/`, `duits/`, `frans/` (komt-eraan-pagina met terugknop).
- `cursussen.js`: de lijst met cursussen. Een nieuwe taal is één blok (zie `docs/NIEUWE-CURSUS.md`).
- `tools/maak_deploy.py` bouwt de hele repo naar `_site/`, vindt cursusmappen zelf en zet per service worker een tijdstempel.
- `.htaccess` en nginx-voorbeeld schermen `opnames/`, `tools/`, `deploy/`, `docs/` en `.md`-bestanden ook in cursusmappen af (`NOTICE.md` blijft leesbaar).
- GitHub Pages-workflow in `.github/workflows/pages.yml`.

### Open actiepunten
- [ ] GitHub Pages aanzetten (Settings → Pages → GitHub Actions) of subdomein uploaden
- [ ] Licentiekeuze (MIT voor code) bevestigen
