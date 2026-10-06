# Stappenplan: taalcursus via FTP op een subdomein

Created by DieOuwe · www.dieouwe.nl

Doel: `https://taal.dieouwe.nl` toont de hoofdpagina (taal kiezen) en elke taal staat in zijn eigen submap
(`/papiamento/`, `/engels/`, ... `/oekraiens/`). Pas `taal` aan als je een andere naam kiest.

## 1. Subdomein aanmaken (eenmalig)

1. Maak in het hostingpaneel het subdomein `taal.dieouwe.nl` aan. Het paneel maakt een eigen map ervoor aan (vaak `taal` of `taal.dieouwe.nl`); dat is de **doelmap**.
2. Zet er een gratis SSL-certificaat op (Let's Encrypt / "SSL" in het paneel) en wacht tot het slotje werkt.
   Https is nodig om te installeren als app en voor offline gebruik.
3. Maak een FTP-account aan dat bij die doelmap hoort (of gebruik je bestaande account) en noteer host, gebruikersnaam en wachtwoord. Kies **SFTP** of **FTPS** als je hoster dat aanbiedt (veiliger dan gewone FTP).

## 2. Site bouwen (op je pc)

Zorg dat je de nieuwste versie hebt (`git pull`) en voer uit in de map `taalcursus`:

```powershell
python tools/maak_deploy.py
```

Geen Python? Dan met Docker:

```powershell
docker run --rm -v "${PWD}:/work" -w /work python:3.12-slim python tools/maak_deploy.py
```

Er komt een map **`_site`**. Daarin staat alleen wat online mag (geen `.git`, geen `opnames/`, geen `tools/`, geen README's). Controleer: in `_site` staan `index.html`, `sw.js`, `.htaccess` en de mappen `papiamento`, `engels`, `spaans`, `duits`, `frans`, `oekraiens`, `icons`.

## 3. Uploaden met FileZilla (of WinSCP)

1. Verbind: host, gebruikersnaam, wachtwoord, poort leeg laten (of 22 bij SFTP).
2. Zet in FileZilla **verborgen bestanden aan** (menu *Server → Verborgen bestanden tonen*), anders zie je `.htaccess` niet en wordt hij niet mee-geüpload.
3. Ga rechts (server) naar de **doelmap** van het subdomein. Open links (pc) de map `_site`.
4. Selecteer **alles in** `_site` (Ctrl+A) en sleep het naar rechts. Dus **de inhoud**, niet de map `_site` zelf: `index.html` moet direct in de doelmap staan.
5. Wacht tot de wachtrij leeg is. Het geluid (`papiamento/mp3/`) is het grootste deel; niets mislukt in de tab *Mislukte overdrachten*.
6. Overdrachtstype: laat op *Automatisch*; mp3's en plaatjes worden dan als binair verstuurd.

Resultaat op de server:

```
taal.dieouwe.nl/            (doelmap)
├── index.html  hub.css  hub.js  cursussen.js  pwa.js  sw.js  manifest.webmanifest
├── .htaccess  NOTICE.md  LICENSE
├── icons/
├── papiamento/   index.html, sw.js, manifest, css/, js/, icons/, mp3/, img/
├── engels/  spaans/  duits/  frans/  oekraiens/   (elk een complete cursus: index.html, css/, js/, icons/, sw.js, manifest)
```

## 4. Controleren

1. Open `https://taal.dieouwe.nl`: de hoofdpagina met zes kaarten (Papiamentu, Engels, Spaans, Duits, Frans, Oekraïens).
2. Klik Papiamentu: de cursus opent; klik 🌸 linksboven: je bent terug.
3. Test de kaarten van de andere talen: "komt eraan"-pagina met terugknop.
4. Test **📲 App** (op de telefoon via Chrome/Safari).
5. Test dat privé-onderdelen dicht zijn; deze geven een foutpagina (404/403):
   - `https://taal.dieouwe.nl/.git/config`
   - `https://taal.dieouwe.nl/papiamento/opnames/`
   - `https://taal.dieouwe.nl/papiamento/tools/studio.html`
   - `https://taal.dieouwe.nl/README.md`
   En `https://taal.dieouwe.nl/NOTICE.md` is wel leesbaar.

## 5. Problemen

| Probleem | Oplossing |
|---|---|
| Witte pagina of lijst met bestanden | `index.html` staat niet direct in de doelmap (waarschijnlijk is `_site` zelf geüpload) |
| 500-fout na uploaden | Je server (nginx of Apache zonder `AllowOverride`) snapt `.htaccess` niet: verwijder het, of gebruik `deploy/nginx-taal.conf.voorbeeld`, of vraag je hoster `AllowOverride All` aan te zetten |
| Eindeloze omleiding | Staat er Cloudflare voor? Laat de https-omleiding in `.htaccess` uitgeschakeld (standaard) |
| Geen 📲 App-knop / installeren | Alleen via `https://`; check het slotje |
| Oude versie blijft zichtbaar | Eén keer hard verversen (Ctrl+F5); de service worker haalt daarna zelf de nieuwe versie |
| Geluid speelt niet | Check dat `papiamento/mp3/mms/` is geüpload en niet leeg is |

## 6. Een volgende keer (bijwerken)

1. `git pull`, werk aan je cursus, `python tools/maak_deploy.py`.
2. In FileZilla alles uit `_site` opnieuw naar de doelmap slepen en bij de vraag *Bestand bestaat al* kiezen voor **Overschrijven als bron nieuwer is** (of altijd overschrijven).
3. Elke service worker krijgt automatisch een nieuwe versie; bezoekers krijgen de nieuwe bestanden bij het volgende bezoek.
4. Verwijderde of hernoemde bestanden (bijv. een plaatje) haal je ook handmatig op de server weg.

## 7. Alternatief zonder FTP

GitHub Pages: *Settings → Pages → Source: GitHub Actions*; bij elke push naar `main` wordt alles automatisch gepubliceerd op `https://die0uwe.github.io/taalcursus/`.

## 8. Onderhoudspagina houden en wisselen

Staat er al een pagina op het subdomein die je als onderhoudspagina wilt houden?
1. Hernoem die `index.html` op de server naar **`onderhoud.html`** (laat de bijbehorende plaatjes staan).
2. Upload de zip-inhoud. `.htaccess` bevat de regel `DirectoryIndex onderhoud.html index.html`: zolang `onderhoud.html` bestaat, ziet iedereen op `/` die pagina.
3. Test de echte site op `/index.html` (bijvoorbeeld `https://taal.scriptspace.nl/index.html`).
4. **Live zetten:** hernoem `onderhoud.html` naar `onderhoud-uit.html`. **Weer onderhoud:** hernoem terug.
5. Cloudflare: wis de cache na elke wissel (*Caching → Configuration → Purge Everything*).
