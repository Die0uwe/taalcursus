# Changelog: Aprende Papiamentu!

Created by DieOuwe · www.dieouwe.nl

Nieuwste bovenaan.

## [2026-10-06 20:00] — Cursus in de map `papiamento/` van de taalcursus-repo

**Type:** Migratie
**Skill:** webapp-dev, wow-git-manager (via wow-bigboss-orchestrator)
**Bestanden:** `index.html`, `css/style.css`, `sw.js`, `README.md`
**Versie:** v0.5.0

### Wijzigingen
- Het hele project staat nu in `papiamento/` van https://github.com/Die0uwe/taalcursus; de hoofdpagina staat in de root.
- Merk (🌸 Aprende Papiamentu) in de bovenbalk is nu een link terug naar alle talen (`../index.html`).
- `sw.js` ruimt alleen eigen caches op (voorvoegsel `pap-`), zodat de hoofdpagina (`hub-`) en andere cursussen met rust gelaten worden.
- Pages-workflow, deploy-script, `.htaccess` en nginx-voorbeeld staan nu in de root en gelden voor alle cursussen.
- Sjabloon generiek: `meta` in `words.js` bevat taalnaam, badge-naam, opslagsleutel en browserstem; dialectbalk verdwijnt bij één dialect (voor de andere cursussen). Papiamentu werkt ongewijzigd.
- `tools/github-pages-workflow.yml` hier verwijderd (zit nu in de root als `.github/workflows/pages.yml`).

### Open actiepunten
- [ ] Zelfde open punten als v0.4.0 (opnames, plaatjes, `check`-woorden)

---

## [2026-10-06 19:45] — Strakke interface, app-modus, eigen plaatjes, stemmen en GitHub-klaar

**Type:** Feature / UI Polish
**Skill:** design-architect, webapp-dev, python-tools, wow-git-manager (via wow-bigboss-orchestrator)
**Bestanden:** `index.html`, `css/style.css`, `js/app.js`, `js/audio.js`, `js/beeld.js`, `js/pwa.js`, `sw.js`, `manifest.webmanifest`, `icons/*`, `tools/*`, `mp3/*`, `img/*`, GitHub-bestanden
**Versie:** v0.4.0

### Wijzigingen
- **Interface opnieuw opgezet** met design-tokens in `:root`: één bovenbalk (merk, sterren, App-knop, geluid), segmentbalk voor het eiland, menu met "Spelen" (Quiz, Badges) en "Woorden leren" (5 kaarten met voortgangsbalk), leerkaart met gekleurd podium, ronde knoppen, gesegmenteerde voortgangsbalk, quiz met voortgangsbalk en 2x2-antwoorden. Zelfde speelse concept en kleuren, Comic Sans vervangen door een afgeronde systeemlettertype-stack.
- **Quiz-leerkaartje**: na een antwoord verschijnt plaatje, woord, uitspraak en vertaling met luisterknop. Tik op een ander antwoord (of mouseover op de computer) om dat te zien. Extra tikken geven geen sterren.
- **Webapp (PWA)**: `manifest.webmanifest`, `sw.js` (offline, ook audio-Range voor Safari), iconen (192, 512, maskable, Apple), **📲 App-knop** met installeer-prompt of uitleg per apparaat (iPhone, Android, computer, en een melding bij `file://`). `start-server.bat` voor lokaal gebruik.
- **Stemmen in eigen mappen**: `mp3/vrouw/` (echte opnames, wint) vóór `mp3/mms/` (computerstem) vóór losse `mp3/<id>.mp3`. `play()` meldt welke stem is gebruikt. `maak_audio.py` schrijft naar `mp3/mms/` en maakt voor Aruba/Bonaire alleen afwijkende woorden in een submap.
- **Opnametools**: `tools/studio.html` (opnemen, terugluisteren, overzicht plaatje/echte stem/computerstem per woord) en `tools/opnames_naar_mp3.py` (stilte weg, volume gelijk, mp3).
- **Eigen plaatjes**: `img/<id>.webp|png|jpg|jpeg|svg` vervangt de emoji per woord (`js/beeld.js`). `tools/maak_beeldlijst.py` maakt `img/LIJST.md` en `img/prompts.txt`.
- **GitHub-klaar**: `.gitignore`, `.gitattributes`, `LICENSE` (MIT voor code), `NOTICE.md` (rechten audio/plaatjes), Pages-workflow (`tools/github-pages-workflow.yml`, handmatig naar `.github/workflows/pages.yml` kopiëren: die map is voor mij beschermd), uitleg-bestanden in de mappen, README met stappen.
- Eilandbalk blijft op één regel op smalle telefoons.

### Bestanden gewijzigd
| Bestand | Type | Samenvatting |
|---|---|---|
| `css/style.css` | UI Polish | Volledig herschreven met tokens |
| `index.html` | UI Polish | Nieuwe bovenbalk, manifest, overlay, leerkaartje |
| `js/app.js` | Feature | Menu-secties, plaatjes, leerkaartje, quiz-balk |
| `js/audio.js` | Feature | Meerdere stemmen |
| `js/beeld.js`, `js/pwa.js`, `sw.js`, `manifest.webmanifest`, `icons/*` | Feature | Plaatjes en app-modus |
| `tools/studio.html`, `tools/opnames_naar_mp3.py`, `tools/maak_beeldlijst.py`, `tools/maak_audio.py` | Feature | Opnemen en plaatjes-werklijst |
| `.gitignore`, `.gitattributes`, `LICENSE`, `NOTICE.md`, `tools/github-pages-workflow.yml`, `start-server.bat` | Release | GitHub-klaar |
| `mp3/*.mp3` → `mp3/mms/*.mp3` | Migratie | Bestaande 42 mp3's verplaatst |

### Subdomein-voorbereiding (zelfde release)
- `.htaccess` (Apache/LiteSpeed) en `deploy/nginx-papi.conf.voorbeeld`: `.git`, `opnames/`, `tools/`, `deploy/`, scripts en werkdocumenten geven 404/403; juiste MIME-types (`.webmanifest`, `.mp3`), cache (30 dagen voor geluid/plaatjes, nooit voor pagina en service worker) en beveiligingsheaders met strenge Content-Security-Policy.
- `tools/maak_deploy.py`: bouwt `_site/` (en zip) met alleen de app en zet automatisch een tijdstempel in de cache-versie van `sw.js`.
- `deploy/docker-compose.yml` (nginx:alpine, poort 8080).
- Manifest kreeg `"id": "./"`; inline stijl in `index.html` vervangen door een CSS-klasse zodat de CSP geen uitzondering nodig heeft.
- Getest: gebouwde site achter exact deze CSP: service worker, installeren, offline, quiz en plaatjes werken, geen CSP-meldingen.

### Open actiepunten
- [ ] Subdomein aanmaken, https aanzetten en `_site/` uploaden (stappen in README)
- [ ] Repo aanmaken en pushen (stappen in README), Pages aanzetten
- [ ] Alle woorden inspreken in `mp3/vrouw/`
- [ ] Plaatjes maken (`img/LIJST.md`)
- [ ] 16 `check`-woorden laten controleren
- [ ] Licentiekeuze (MIT voor code) bevestigen

---

## [2026-10-06 19:30] — Stap 6: polish en mobiel

**Type:** UI Polish
**Skill:** design-architect (via wow-bigboss-orchestrator)
**Bestanden:** `index.html`, `css/style.css`, `js/app.js`, `js/words.js`, `js/game.js`, `js/audio.js`, `tools/maak_audio.py`
**Versie:** v0.3.0

### Wijzigingen
- Vaste bovenbalk (`.topbar`, sticky): sterren en geluidsknop blijven altijd zichtbaar en overlappen titel of kaarten niet meer.
- Geluidsknop is niet meer `position: fixed`; hij staat naast de sterrenbalk.
- Alle knoppen minimaal 44 px hoog (aanraakdoel voor kinderen), `touch-action: manipulation`, duidelijke `:focus-visible`-rand.
- Compactere indeling op schermen tot 480 px; geen horizontale scroll van 375 px tot 1280 px.
- Quiz: nieuwe vraag scrollt naar boven, de Volgende-knop scrollt in beeld na een antwoord (rekening houdend met "minder beweging").
- Favicon (emoji), `theme-color`, bronvermelding voor de computerstem in de footer.
- Kopregel "Created by DieOuwe · www.dieouwe.nl" en versie 0.3.0 in alle bestanden.

### Bestanden gewijzigd
| Bestand | Type | Samenvatting |
|---|---|---|
| `index.html` | UI Polish | Sticky bovenbalk, favicon, theme-color, footer-credit |
| `css/style.css` | UI Polish | Topbar, focus, touch, mobiele compactie |
| `js/app.js` | UI Polish | Scrollgedrag in de quiz |
| `js/words.js`, `js/game.js`, `js/audio.js`, `tools/maak_audio.py` | Onderhoud | Kopregel en versienummer |

### Open actiepunten
- [x] Topbar-overlap oplossen
- [ ] 16 woorden met status `check` laten controleren door een Papiamentu-sprekende
- [ ] Echte opnames (vrouwenstem) later in `mp3/` zetten

---

## [2026-10-06 19:08] — Grotere quiz-icoontjes

**Type:** UI Polish
**Skill:** design-architect
**Bestanden:** `css/style.css`
**Versie:** v0.2.1

### Wijzigingen
- Plaatje in de vraag 9rem (mobiel 7,5rem); emoji-antwoorden 4,8rem met minimaal 130 px hoogte (mobiel 4,2rem / 115 px), zodat opa, oma, enz. goed te zien zijn.
- Mediaquery verplaatst achter de basisregels, anders won de basisregel.

### Bestanden gewijzigd
| Bestand | Type | Samenvatting |
|---|---|---|
| `css/style.css` | UI Polish | Grotere emoji in de quiz |

---

## [2026-10-06 18:22–18:43] — Stappen 3–5: leerscherm, quiz en badges

**Type:** Feature
**Skill:** webapp-dev, game-logic (via wow-bigboss-orchestrator)
**Bestanden:** `index.html`, `css/style.css`, `js/game.js`, `js/audio.js`, `js/app.js`
**Versie:** v0.2.0

### Wijzigingen
- Menu met 5 categorieën ("x / n geleerd"), dialectkeuze (Curaçao, Aruba, Bonaire), quiz- en badgekaart.
- Leerscherm met vorige/volgende, "Zeg het"-knop, voortgangsbolletjes, toetsen links/rechts/Escape.
- Quiz van 10 vragen zonder herhaling uit alle categorieën, goed/fout-animatie, confetti, geluidjes; "luister en kies" alleen voor woorden met een mp3.
- Sterren: +1 per nieuw woord (eenmalig), quiz goed +2, +1 bonus per 5 op rij. Opslag in `localStorage` (`papiweb.v1`).
- 12 badges, met popup. Eerder verdiende badges worden stil bijgewerkt.
- Audioketen: `mp3/<dialect>/<id>.mp3`, dan `mp3/<id>.mp3`, dan browserstem (es/pt), dan "nog geen geluid". Mute-schakelaar.
- Fix: voortgangsbolletjes werden getekend vóór het markeren van het woord.
- Fix: badge-popup bedekte de antwoorden (vertraagd in de quiz, `pointer-events: none`).

### Bestanden gewijzigd
| Bestand | Type | Samenvatting |
|---|---|---|
| `index.html` | Feature | Schermen: menu, leren, quiz, badges |
| `css/style.css` | Feature | Opmaak, animaties, confetti |
| `js/game.js` | Feature | Staat, sterren, badges, quizronde |
| `js/audio.js` | Feature | Afspelen met fallback, scan, geluidjes |
| `js/app.js` | Feature | Schermen en navigatie |

---

## [2026-10-06 18:04] — Stappen 0–2: woorden en audio-tool

**Type:** Feature
**Skill:** content-research, python-tools (via wow-bigboss-orchestrator)
**Bestanden:** `js/words.js`, `tools/maak_audio.py`, `tools/Dockerfile`, `README.md`
**Versie:** v0.1.0

### Wijzigingen
- 42 woorden in 5 categorieën, elk met emoji, Papiamentu, Nederlands en uitspraakgids; status `bron` of `check`, dialect-overrides (alleen *kas*: Aruba "Cas").
- `maak_audio.py` maakt `mp3/<id>.mp3` met `facebook/mms-tts-pap` (Docker, CPU), overschrijft bestaande mp3's nooit zonder `--force`.
- Fix: de JSON-parser pakte de vermelding van `window.PAP_DATA` in de kopregel; nu een regex op regelbegin.
- 42 mp3's gegenereerd (18:13–18:15); stem goedgekeurd door DieOuwe.

### Bestanden gewijzigd
| Bestand | Type | Samenvatting |
|---|---|---|
| `js/words.js` | Feature | Woordenlijst met bronnen |
| `tools/maak_audio.py` | Feature | Audiogenerator |
| `tools/Dockerfile` | Feature | python:3.11-slim, ffmpeg, torch CPU |
| `README.md` | Feature | Eerste versie |

### Open actiepunten
- [x] Stem horen en goedkeuren
