# Changelog: Taalcursus

Created by DieOuwe · www.dieouwe.nl

Nieuwste bovenaan. De wijzigingen van de cursus zelf staan in `papiamento/CHANGELOG.md`.

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
- [ ] Zesde cursus kiezen en toevoegen
- [ ] GitHub Pages aanzetten (Settings → Pages → GitHub Actions) of subdomein uploaden
- [ ] Licentiekeuze (MIT voor code) bevestigen
