# Changelog: Taalcursus

Created by DieOuwe · www.dieouwe.nl

Nieuwste bovenaan. De wijzigingen van de cursus zelf staan in `papiamento/CHANGELOG.md`.

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
