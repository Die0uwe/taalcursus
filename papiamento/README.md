# Aprende Papiamentu!

Created by DieOuwe · www.dieouwe.nl

Educatieve webapp (kinderen) om Papiamentu te leren. Dialect-hoofdlijn: **Curaçao**; Aruba en Bonaire kiesbaar.
Versie **0.5.0**. Dit is één cursus van de **taalcursus** (zie de README in de hoofdmap). Gewone HTML, CSS en JavaScript, geen bouwstap nodig. Installeerbaar als app (PWA) en offline bruikbaar.

## Wat zit erin

- 5 categorieën: Basiswoorden, Dieren, Kleuren, Nummers, Familie (42 woorden, elk met emoji, Papiamentu, Nederlands en uitspraakgids)
- Leerscherm met vorige/volgende en een "Zeg het"-knop
- Quiz van 10 vragen over alle categorieën, met feedback, confetti en geluidjes. Na elk antwoord een **leerkaartje**: tik op een antwoord (of ga er met de muis overheen) om te zien wat het is
- Sterren en 12 badges, bewaard in `localStorage` (sleutel `papiweb.v1`)
- Geluid aan/uit, **📲 App-knop** om te installeren
- **Stemmen in eigen mappen**: echte opnames (`mp3/vrouw/`) winnen van de computerstem (`mp3/mms/`)
- **Eigen plaatjes** (`img/`) vervangen de emoji, woord voor woord

## Snel starten

| Wat | Hoe |
|---|---|
| Even kijken | Dubbelklik op `index.html` |
| Als echte app (installeren, offline, opnemen) | Dubbelklik op `start-server.bat` en open http://localhost:8080 |
| Online zetten | Zie de README in de hoofdmap (hele taalcursus, met hoofdpagina) |

## Mappenstructuur

```
papiamento/
├── index.html              de app (het logo linksboven brengt je terug naar alle talen)
├── manifest.webmanifest    app-gegevens (naam, kleuren, iconen)
├── sw.js                   service worker (offline)
├── start-server.bat        start een lokale webserver voor alleen deze cursus
├── css/style.css           opmaak (kleuren/vormen staan bovenin als variabelen)
├── js/
│   ├── words.js            alle woorden, fonetiek, dialecten
│   ├── game.js             sterren, badges, quizronde, opslag
│   ├── audio.js            geluid: stemmen, terugval, geluidjes
│   ├── beeld.js            eigen plaatjes uit img/
│   ├── app.js              schermen en navigatie
│   └── pwa.js              installeer-knop en offline
├── icons/                  app-iconen
├── mp3/
│   ├── vrouw/              echte opnames (winnen)
│   └── mms/                computerstem
├── img/                    eigen plaatjes (<id>.png / .webp ...), LIJST.md, prompts.txt
├── opnames/                ruwe opnames (blijft op je pc)
├── tools/
│   ├── studio.html         opnamestudio + overzicht van wat al klaar is
│   ├── opnames_naar_mp3.py opnames -> mp3/vrouw/
│   ├── maak_audio.py       computerstem -> mp3/mms/
│   ├── maak_beeldlijst.py  maakt img/LIJST.md en img/prompts.txt
│   └── Dockerfile
├── CHANGELOG.md  TESTLIJST.md  NOTICE.md  README.md
```

Alle commando's hieronder voer je uit **vanuit de map `papiamento/`**.

De bestandsnaam van een mp3 of plaatje is het `id` uit `js/words.js`: `Kachó` is `kacho`, `Ruman muhé` is `rumanmuhe`.

## Stemmen (audio)

De app speelt per woord de eerste die bestaat:

1. `mp3/vrouw/<id>.mp3` echte opname
2. `mp3/mms/<id>.mp3` computerstem
3. `mp3/<id>.mp3` losse mp3 (oude opzet)
4. computerstem van de browser, anders meldt de app "nog geen geluid"

Voor Aruba of Bonaire: `mp3/vrouw/aw/kas.mp3` (Curaçao staat direct in de stem-map).
Je hoeft niet alles in één keer op te nemen: wat ontbreekt, valt terug op de computerstem.

### Echte (vrouwen)stem opnemen

1. `start-server.bat` starten en http://localhost:8080/tools/studio.html openen.
2. Per woord **⏺ Opnemen**, terugluisteren, **💾 Bewaar**. De studio laat zien welke woorden al een echte stem, computerstem of plaatje hebben.
3. Bestanden (bv. `kacho.webm`) in `opnames/` zetten.
4. `python tools/opnames_naar_mp3.py` (haalt stilte weg, zet het volume gelijk, maakt de mp3). Zonder ffmpeg op je pc:
   ```powershell
   docker run --rm --entrypoint python -v "${PWD}:/work" pap-audio tools/opnames_naar_mp3.py
   ```

### Computerstem opnieuw maken (Docker, Windows PowerShell)

```powershell
docker build -t pap-audio -f tools/Dockerfile .
docker run --rm -v "${PWD}:/work" -v pap_hf_cache:/hf_cache pap-audio
```

Eén woord opnieuw: `... pap-audio --only kacho --force`. Bestaande bestanden worden niet overschreven zonder `--force`.

## Eigen plaatjes

Zet een plaatje in `img/` met het woord-id als naam, bijvoorbeeld `img/welo.png` (ook webp, jpg, jpeg, svg).
Heeft een woord een plaatje, dan toont de app dat in leerscherm en quiz; anders blijft de emoji staan.
`python tools/maak_beeldlijst.py` maakt `img/LIJST.md` (voortgang, bestandsnamen, voorbeeld-prompts) en `img/prompts.txt`.
Aanbevolen: vierkant, 512 tot 1024 px, png of webp, doorzichtige achtergrond, onder 200 kB.

## Installeren als app (PWA)

De knop **📲 App** rechtsboven installeert de app (Chrome/Edge/Android) of legt uit hoe (iPhone: Deel → Zet op beginscherm).
Dit werkt alleen via een webadres: `http://localhost` of een online adres met `https`, niet vanaf `file://`.
Na het eerste bezoek werkt de app ook zonder internet; geluiden en plaatjes worden bewaard zodra ze voor het eerst gebruikt zijn.
Na een nieuwe release haalt de app de nieuwe bestanden zelf op (de bouwstap in de hoofdmap zet een nieuwe versie in `sw.js`).

## Online zetten

Dat gebeurt voor de hele taalcursus tegelijk (hoofdpagina plus alle cursussen), zie de README in de hoofdmap.
`tools/maak_deploy.py` daar neemt alleen mee wat online mag: geen `opnames/`, geen `tools/`, geen scripts of werkdocumenten.
De service worker krijgt bij elke bouw automatisch een nieuwe versie, dus bezoekers krijgen de nieuwe bestanden zonder dat je iets verhoogt.

## Licenties

Code: MIT (`LICENSE` in de hoofdmap). Audio en plaatjes hebben eigen voorwaarden, zie `NOTICE.md`.
De computerstem komt van **Meta MMS-TTS** (`facebook/mms-tts-pap`), **CC BY-NC 4.0**: alleen niet-commercieel, met bronvermelding (staat in de footer).

## Woordstatus

In `js/words.js` heeft elk woord `status`: `bron` (gevonden in een bron) of `check` (nog door een Papiamentu-sprekende te controleren).
De 16 `check`-woorden zijn niet fout bevonden, alleen niet bevestigd in de bronnen die ik kon raadplegen.
Aruba- en Bonaire-afwijkingen staan er pas in als ze bevestigd zijn.

## Mogelijke vervolgstappen

- `check`-woorden laten nakijken en alle woorden inspreken
- Plaatjes maken voor alle 42 woorden (`img/LIJST.md`)
