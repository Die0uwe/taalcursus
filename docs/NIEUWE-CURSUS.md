# Een nieuwe cursus toevoegen

Created by DieOuwe · www.dieouwe.nl

Elke taal is een eigen map met een complete, zelfstandige app (zelfde opzet als `papiamento/`).
De hoofdpagina (`index.html`) leest alleen `cursussen.js`; daar komt per taal één blok bij.

## Stappen (voorbeeld: Engels)

1. **Kopieer** `papiamento/` naar een nieuwe mapnaam in kleine letters: `engels/` (de huidige placeholder-map eerst weghalen of overschrijven).
2. **Leeg maken:** verwijder `mp3/mms/*`, `mp3/vrouw/*`, `img/*` (behalve `LEESMIJ.md`) en `opnames/*`.
3. **Woorden:** pas `js/words.js` aan (id, emoji, woord, Nederlands, uitspraak, categorieën, `meta`).
4. **Opslagsleutel:** in `js/game.js` staat `var KEY = 'papiweb.v1';`. Geef elke cursus een eigen sleutel, bijvoorbeeld `'engels.v1'`, anders delen cursussen sterren en badges.
5. **Namen en kleuren** in `index.html` (titel, merknaam, beschrijving, `apple-mobile-web-app-title`), `manifest.webmanifest` (`name`, `short_name`, `id`, kleuren) en eventueel `css/style.css`.
6. **Service worker:** in `sw.js` de `VERSIE` een eigen voorvoegsel geven, bijvoorbeeld `'eng-v0.1.0'`. Het voorvoegsel moet verschillen van `pap-` en `hub-`, anders ruimen de cursussen elkaars cache op.
7. **Iconen** opnieuw maken (192, 512, maskable, Apple) in `icons/`.
8. **Computerstem:** in `tools/maak_audio.py` het model aanpassen, bijvoorbeeld `facebook/mms-tts-eng`. Check eerst de licentie van het model en pas `NOTICE.md` en de footer aan.
9. **Hoofdpagina:** in `cursussen.js` het blok van de taal op `status: 'beschikbaar'` zetten en `opslag` gelijk maken aan de sleutel uit stap 4.
10. **Testen:** `start-server.bat` in de root en open http://localhost:8080.

## Nieuwe taal erbij (zesde, zevende ...)

1. Maak de map (stappen hierboven) en voeg één blok toe aan `cursussen.js`:

   ```js
   { id: 'italiaans', naam: 'Italiano', eigen: 'Italiaans', sub: 'Italië',
     vlag: '🇮🇹', kleur: 'green', status: 'binnenkort', opslag: 'italiaans.v1' }
   ```
2. `id` is de mapnaam. `tools/maak_deploy.py` vindt elke map met een `index.html` zelf, dus de bouwstap hoeft niet te worden aangepast.
3. Beschikbare kleuren staan in `hub.css` (`data-color`).

## Let op

- Alle paden in een cursus zijn relatief; de map kan dus overal staan.
- Mapnamen in kleine letters: veel servers onderscheiden hoofdletters.
- Het terugkeerlinkje in de cursus is `<a class="brand" href="../index.html">`; laat dat staan.
