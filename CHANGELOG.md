# Changelog: Taalcursus

Created by DieOuwe · www.dieouwe.nl

Nieuwste bovenaan. De wijzigingen van de cursus zelf staan in `papiamento/CHANGELOG.md`.

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
