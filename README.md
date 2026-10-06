# Taalcursus

Created by DieOuwe · www.dieouwe.nl

Taalcursussen voor kinderen, elk als eigen kleine webapp. De hoofdpagina laat je de taal kiezen.
Versie **0.2.0** (hoofdpagina). Gewone HTML, CSS en JavaScript, geen bouwstap nodig. Installeerbaar als app (PWA) en offline bruikbaar.

| Taal | Map | Status |
|---|---|---|
| 🇨🇼 Papiamentu | `papiamento/` | beschikbaar (v0.7.0) |
| 🇬🇧 Engels | `engels/` | beschikbaar (v0.3.0, stem van de browser) |
| 🇪🇸 Spaans | `spaans/` | beschikbaar (v0.3.0, stem van de browser) |
| 🇩🇪 Duits | `duits/` | beschikbaar (v0.3.0, stem van de browser) |
| 🇫🇷 Frans | `frans/` | beschikbaar (v0.3.0, stem van de browser) |
| 🇺🇦 Oekraïens | `oekraiens/` | beschikbaar (v0.3.0, stem van de browser) |

## Snel starten

| Wat | Hoe |
|---|---|
| Even kijken | Dubbelklik op `index.html` |
| Als echte app (installeren, offline) | Dubbelklik op `start-server.bat` en open http://localhost:8080 |
| Online zetten | Zie "Online zetten" hieronder |

## Mappenstructuur

```
taalcursus/
├── index.html              hoofdpagina: kies je taal
├── hub.css  hub.js         opmaak en logica van de hoofdpagina
├── cursussen.js            de lijst met cursussen (hier komt een nieuwe taal bij)
├── pwa.js  sw.js  manifest.webmanifest   app-modus en offline voor de hoofdpagina
├── icons/                  iconen van de hoofdpagina
├── papiamento/             complete cursus (eigen README, woorden, audio, plaatjes, tools)
├── engels/ spaans/ duits/ frans/ oekraiens/   volledige cursussen (zelfde opzet, 42 woorden elk)
├── docs/NIEUWE-CURSUS.md   hoe voeg je een taal toe
├── tools/maak_deploy.py    bouwt _site/ met alleen wat online mag
├── tools/maak_cursus.py    maakt een cursusmap uit het sjabloon + tools/talen.py (woordenlijsten)
├── deploy/                 nginx-voorbeeld en docker-compose
├── .github/workflows/pages.yml   GitHub Pages
├── .htaccess               server-regels (Apache/LiteSpeed)
├── start-server.bat        lokale webserver (Windows)
└── CHANGELOG.md  TESTLIJST.md  NOTICE.md  LICENSE  README.md
```

Elke cursus is zelfstandig: eigen `index.html`, service worker (scope `/<taal>/`), manifest en opslagsleutel in `localStorage`.
De hoofdpagina leest alleen de sterren en geleerde woorden per cursus voor de voortgang op de kaarten.
Een nieuwe taal toevoegen: zie `docs/NIEUWE-CURSUS.md`.

## Online zetten

### Op een subdomein (bijv. taal.dieouwe.nl)

Kort hieronder; het volledige stappenplan voor FTP staat in [`docs/FTP-STAPPENPLAN.md`](docs/FTP-STAPPENPLAN.md).

1. **DNS en https:** maak het subdomein aan en zet er een SSL-certificaat op. Https is nodig voor installeren en offline gebruik.
2. **Bouwen:** `python tools/maak_deploy.py --zip` (of via Docker, zie bovenin dat bestand). Dit maakt `_site/` met **alleen** wat online mag: geen `.git`, geen `opnames/`, geen `tools/`, geen scripts of werkdocumenten.
3. **Uploaden:** zet de **inhoud** van `_site/` in de hoofdmap van het subdomein, zodat `index.html` er direct in staat.
4. **Server instellen:** Apache/LiteSpeed: `.htaccess` zit al in `_site/`. nginx: `deploy/nginx-taal.conf.voorbeeld`. Docker: `deploy/docker-compose.yml` (poort 8080, zet je eigen proxy met https ervoor).
5. **Controleren:** zie het kopje "Online" in `TESTLIJST.md`.
6. **Nieuwe versie:** opnieuw bouwen en uploaden. Elke service worker krijgt automatisch een nieuwe versie.

Staat er Cloudflare voor je server? Zet dan de https-omleiding in `.htaccess` uit (staat standaard uit).

### Met GitHub Pages

`.github/workflows/pages.yml` bouwt en publiceert bij elke push naar `main`.
Zet eenmalig in GitHub: **Settings → Pages → Source: GitHub Actions**. Daarna staat alles op `https://die0uwe.github.io/taalcursus/`.

## Git

```powershell
git clone https://github.com/Die0uwe/taalcursus.git
cd taalcursus
# werken, dan:
git add -A
git commit -m "Omschrijving"
git push
```

Ruwe opnames (`<cursus>/opnames/`) gaan nooit mee (staan in `.gitignore`).
Zet in `mp3/vrouw/` alleen opnames waarvoor de spreker toestemming gaf om ze te delen.

## Licenties

Code: MIT (`LICENSE`). Audio en plaatjes hebben eigen voorwaarden, zie `NOTICE.md` en de `NOTICE.md` in elke cursusmap.
De computerstem van Papiamento komt van Meta MMS-TTS, **CC BY-NC 4.0** (alleen niet-commercieel).
