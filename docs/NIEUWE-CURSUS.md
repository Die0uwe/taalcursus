# Een nieuwe cursus toevoegen

Created by DieOuwe · www.dieouwe.nl

Elke taal is een eigen map met een complete, zelfstandige app. De app-code is voor alle cursussen gelijk (sjabloon: `papiamento/`);
alleen woordenlijst, namen, iconen en opslagsleutel verschillen. Een generator doet het saaie werk.

## Snelste weg (aanbevolen)

1. **Woorden** toevoegen in `tools/talen.py`: een blok in `TALEN` met `naam`, `eigen`, `vlag`, `map`, `prefix` (3 letters, uniek, ook voor de cache), `opslag`, teksten, `tts` (taalcode van de browserstem, bijv. `["it"]`) en 42 woorden `(woord, uitspraak)` in de volgorde van `CONCEPTEN`.
2. **Cursus maken:** `python tools/maak_cursus.py italiaans` (of `--alle`; met `--force` om een bestaande map opnieuw te maken; mp3, plaatjes en opnames blijven staan).
3. **Iconen:** voeg de taal toe in `tools/maak_iconen.js` (vlag + kleuren) en draai het (Node + Playwright), of zet eigen `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` in de map.
4. **Hoofdpagina:** voeg één blok toe aan `cursussen.js` met `status: "beschikbaar"` en `opslag` gelijk aan die uit stap 1.
5. **Testen:** `start-server.bat` in de hoofdmap en open http://localhost:8080.

```js
{ id: "italiaans", naam: "Italiaans", eigen: "Italiano", sub: "Italië", vlag: "🇮🇹", kleur: "green",
  status: "beschikbaar", opslag: "italiaans.v1" }
```

`tools/maak_deploy.py` vindt elke map met een `index.html` zelf, dus de bouwstap hoeft niet te worden aangepast.

## Wat de generator doet

- Kopieert `css/`, `js/`, `tools/`, `index.html`, `manifest.webmanifest`, `sw.js` uit `papiamento/` en past namen aan.
- Schrijft `js/words.js` met de woorden, `meta.opslag` (eigen `localStorage`-sleutel, zodat cursussen geen sterren delen), `meta.ttsTalen` (stem van de browser) en één dialect (dan verdwijnt de dialectbalk).
- Geeft de service worker een eigen voorvoegsel (`eng-`, `spa-`, ...) zodat cursussen elkaars cache niet opruimen.
- Maakt `README.md`, `NOTICE.md` en `CHANGELOG.md` voor de cursus.
- De woord-id's zijn Nederlandse woorden (zon, maan, hond ...) en gelijk in alle cursussen (behalve Papiamentu, die eigen id's heeft). Plaatjes kun je dus delen.

## Geluid

- Standaard: de stem van de browser of het apparaat. Op sommige apparaten ontbreekt een stem voor een taal; dan meldt de app "nog geen geluid".
- Computerstem als mp3: in de cursusmap `docker build -t pap-audio -f tools/Dockerfile .` en dan `docker run --rm -v "${PWD}:/work" -v pap_hf_cache:/hf_cache pap-audio`. Het model (`facebook/mms-tts-<taal>`) staat al in `tools/maak_audio.py`. Licentie CC BY-NC 4.0, alleen niet-commercieel, met bronvermelding: pas `NOTICE.md` en de footer aan.
- Echte opnames: `tools/studio.html` (zie de README van de cursus).

## Let op

- Alle paden in een cursus zijn relatief; de map kan overal staan.
- Mapnamen in kleine letters: veel servers onderscheiden hoofdletters.
- Het terugkeerlinkje in de cursus is `<a class="brand" href="../index.html">`; laat dat staan.
- Uitspraak en vertaling laat je door een moedertaalspreker nakijken (status `check` in `words.js`).
