#!/usr/bin/env python3
"""
maak_cursus.py v0.1.0 - Taalcursus
Created by DieOuwe · www.dieouwe.nl

Maakt een complete cursusmap voor een taal uit het sjabloon `papiamento/` en de woordenlijst in tools/talen.py.
De app-code is voor alle cursussen gelijk; alleen words.js, namen, iconen en opslagsleutel verschillen.

Gebruik (vanuit de hoofdmap van de repo):
    python tools/maak_cursus.py engels            # één taal
    python tools/maak_cursus.py --alle            # alle talen uit tools/talen.py
    python tools/maak_cursus.py engels --force    # bestaande cursusmap overschrijven (mp3/img/opnames blijven staan)

Een map met alleen de "komt eraan"-placeholder wordt zonder --force vervangen.
Daarna: iconen maken (zie docs/NIEUWE-CURSUS.md) en in cursussen.js de status op "beschikbaar" zetten.
"""
import argparse
import json
import re
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from talen import CATEGORIEEN, CONCEPTEN, TALEN  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SJABLOON = ROOT / "papiamento"
VERSIE = "0.1.0"

# woord-id's van het Papiamentu-sjabloon -> neutrale (Nederlandse) id's die alle andere cursussen gebruiken
ID_MAP = {
    "solo": "zon", "luna": "maan", "awa": "water", "kandela": "vuur", "kas": "huis", "bondia": "goedemorgen",
    "apel": "appel", "lechi": "melk", "kacho": "hond", "pushi": "kat", "paha": "vogel", "piska": "vis",
    "kabritu": "geit", "kabai": "paard", "baka": "koe", "galina": "kip", "kora": "rood", "blou": "blauw",
    "berde": "groen", "hel": "geel", "pretu": "zwart", "blanku": "wit", "oranje": "oranje", "lila": "paars",
    "un": "een", "dos": "twee", "tres": "drie", "kuater": "vier", "sinku": "vijf", "seis": "zes", "shete": "zeven",
    "ocho": "acht", "nuebe": "negen", "dies": "tien", "papa": "papa", "mama": "mama", "welo": "opa", "wela": "oma",
    "rumanhomber": "broer", "rumanmuhe": "zus", "tanta": "tante", "tio": "oom",
}
# voorbeeldtekst in de uitleg-bestanden
VOORBEELDEN = [("Kachó", "Hond"), ("Ruman muhé", "Zus"), ("`kacho.mp3`", "`hond.mp3`"), ("`rumanmuhe.mp3`", "`zus.mp3`"),
               ("kacho.webm", "hond.webm"), ("welo.m4a", "opa.m4a"), ("un.wav", "een.wav"), ("welo.png", "opa.png"),
               ("kacho.webp", "hond.webp"), ("solo.svg", "zon.svg"), ("img/welo.webp", "img/opa.webp"),
               ("img/welo.png", "img/opa.png"), ("--only kacho", "--only hond"), ("kacho.mp3", "hond.mp3")]

KOPIEER_MAPPEN = ["css", "js", "tools"]   # icons: zie hieronder (eigen iconen blijven staan)
KOPIEER_BESTANDEN = ["index.html", "manifest.webmanifest", "sw.js"]
LEES_ALLEEN_TEKST = {"index.html", "manifest.webmanifest", "sw.js"}


def is_placeholder(d: Path) -> bool:
    namen = {p.name for p in d.iterdir()} if d.is_dir() else set()
    return namen <= {"index.html", "README.md"}


def schrijf_words(t: dict, pad: Path) -> int:
    fam = [w[0] for w, c in zip(t["w"], CONCEPTEN) if c[1] == "familie"][:4]
    cats = []
    for cid, naam, sub, icon, kleur in CATEGORIEEN:
        sub = sub or (", ".join(fam) + "...")
        cats.append({"id": cid, "naam": naam, "sub": sub, "icon": icon, "kleur": kleur})
    kop = f"""/* ============================================================
   {t['titel']} - woordenlijst  (js/words.js)  v{VERSIE}
   Created by DieOuwe · www.dieouwe.nl
   Gemaakt met tools/maak_cursus.py uit tools/talen.py (pas de woorden daar aan en maak de cursus opnieuw,
   of pas dit bestand direct aan).
   Het veld "pap" is in elke cursus het woord in de DOELTAAL (de naam is historisch).
   meta: taal, kampioen (laatste badge), opslag (localStorage-sleutel, uniek per cursus),
         ttsTalen / ttsFallback (taalcode van de browserstem).
   LET OP: dit bestand bevat STRIKTE JSON na "window.PAP_DATA =".
   tools/maak_audio.py leest dit bestand ook. Dus: dubbele quotes,
   geen commentaar binnen het object, geen komma na het laatste item.

   status : "bron"  = standaardwoord uit een woordenlijst
            "check" = nog te controleren door een moedertaalspreker
   uitspraak: gids voor Nederlandstalige kinderen (indicatief)
   ============================================================ */
"""
    meta = {"versie": VERSIE, "standaardDialect": "std", "taal": t["naam"], "kampioen": t["kampioen"],
            "opslag": t["opslag"], "ttsTalen": t["tts"], "ttsFallback": t["tts_fallback"]}
    regels = []
    laatste = None
    for (wid, cat, icon, nl), (woord, uitspraak) in zip(CONCEPTEN, t["w"]):
        if laatste is not None and cat != laatste:
            regels.append("")
        laatste = cat
        w = {"id": wid, "cat": cat, "icon": icon, "pap": woord, "uitspraak": uitspraak, "nl": nl, "status": t["status"]}
        if t["bron"]:
            w["bron"] = t["bron"]
        regels.append("    " + json.dumps(w, ensure_ascii=False) + ",")
    # geen komma achter het laatste woord
    for i in range(len(regels) - 1, -1, -1):
        if regels[i].strip():
            regels[i] = regels[i].rstrip(",")
            break
    j = lambda o: json.dumps(o, ensure_ascii=False)  # noqa: E731
    tekst = (kop + "window.PAP_DATA = {\n"
             f'  "meta": {j(meta)},\n'
             f'  "dialecten": [ {j({"id": "std", "naam": t["naam"], "vlag": t["vlag"]})} ],\n'
             '  "categorieen": [\n' + ",\n".join("    " + j(c) for c in cats) + "\n  ],\n"
             '  "woorden": [\n' + "\n".join(regels) + "\n  ]\n};\n")
    pad.write_text(tekst, encoding="utf-8")
    # controle: geldige JSON
    json.loads(re.split(r"^window\.PAP_DATA\s*=", tekst, flags=re.M)[1].strip().rstrip(";"))
    return len(CONCEPTEN)


def vervang_tekst(pad: Path, t: dict) -> None:
    s = pad.read_text(encoding="utf-8")
    naam = pad.name
    if naam == "index.html":
        s = s.replace("<title>🌸 Aprende Papiamentu! 🌸</title>", f"<title>{t['vlag']} {t['titel']}! {t['vlag']}</title>")
        s = s.replace('<span class="brand-name">Aprende <b>Papiamentu</b></span>', f'<span class="brand-name">Leer <b>{t["merk"]}</b></span>')
        s = s.replace("<h1>Bon bini! <span", f"<h1>{t['groet']} <span")
        s = s.replace("<p>Leer Papiamentu spelenderwijs. Kies een eiland en begin!</p>", f"<p>{t['intro']}</p>")
        s = s.replace('aria-label="Kies je eiland"', 'aria-label="Kies je variant"')
        s = s.replace('<p class="foot-main">Bon bini na Papiamentu! 🌺</p>', f'<p class="foot-main">{t["footer"]}</p>')
        s = s.replace('<p class="credit">Computerstem: Meta MMS-TTS (CC BY-NC 4.0), alleen voor niet-commercieel gebruik.</p>',
                      '<p class="credit">Geluid: de computerstem van je eigen apparaat.</p>')
        s = s.replace("Leer Papiamentu spelenderwijs: woorden", f"Leer {t['naam']} spelenderwijs: woorden")
        s = s.replace("Aprende Papiamentu", t["titel"]).replace("🌸", t["vlag"]).replace("Papiamentu", t["merk"])
        s = re.sub(r"v0\.5\.0", f"v{VERSIE}", s)
    elif naam == "manifest.webmanifest":
        s = s.replace("Aprende Papiamentu!", f"{t['titel']}!").replace('"Papiamentu"', f'"{t["merk"]}"')
        s = s.replace("Leer Papiamentu spelenderwijs", f"Leer {t['naam']} spelenderwijs")
    elif naam == "sw.js":
        s = s.replace("Aprende Papiamentu", t["titel"]).replace("'pap-v0.5.0'", f"'{t['prefix']}-v{VERSIE}'")
        s = s.replace("v0.5.0", f"v{VERSIE}")
    elif naam == "pwa.js":
        s = s.replace("Aprende Papiamentu", t["titel"]).replace("Papiamentu", t["merk"])
    elif naam.endswith((".js", ".css", ".py", ".html", ".md", ".bat")) or naam == "Dockerfile":
        s = s.replace("Aprende Papiamentu", t["titel"])
        for oud, nieuw in VOORBEELDEN:
            s = s.replace(oud, nieuw)
        if naam == "maak_beeldlijst.py":
            for oud, nieuw in ID_MAP.items():
                s = s.replace(f'"{oud}":', f'"{nieuw}":')
        if naam == "studio.html":
            s = s.replace('<option value="cw">Curaçao</option><option value="aw">Aruba</option><option value="bn">Bonaire</option>',
                          '<option value="std">Standaard</option>')
        if naam == "LEESMIJ.md" and "Per eiland" in s:
            s = re.sub(r"\nPer eiland:.*", "", s, flags=re.S)
        if naam == "Dockerfile":
            s = s.replace("facebook/mms-tts-pap", t["mms"])
        if naam == "maak_audio.py":
            s = s.replace('MODEL_ID = "facebook/mms-tts-pap"', f'MODEL_ID = "{t["mms"]}"')
            s = s.replace("facebook/mms-tts-pap", t["mms"])
    pad.write_text(s, encoding="utf-8")


def maak(taal: str, force: bool) -> None:
    t = TALEN[taal]
    doel = ROOT / t["map"]
    if doel.exists() and not is_placeholder(doel) and not force:
        sys.exit(f"{doel.name}/ bestaat al en is geen placeholder; gebruik --force om te overschrijven.")
    doel.mkdir(exist_ok=True)
    for oud in ("index.html", "README.md"):
        (doel / oud).unlink(missing_ok=True)

    for m in KOPIEER_MAPPEN:
        if (doel / m).exists():
            shutil.rmtree(doel / m)
        shutil.copytree(SJABLOON / m, doel / m, ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))
    if not (doel / "icons").exists():     # tijdelijk de iconen van het sjabloon; maak eigen iconen (tools/maak_iconen.js)
        shutil.copytree(SJABLOON / "icons", doel / "icons")
    for b in KOPIEER_BESTANDEN:
        shutil.copy2(SJABLOON / b, doel / b)
    # lege werkmappen met uitleg (bestaande inhoud blijft staan)
    for m in ("mp3/vrouw", "mp3/mms", "img", "opnames"):
        (doel / m).mkdir(parents=True, exist_ok=True)
    for f in ("mp3/vrouw/.gitkeep", "mp3/mms/.gitkeep", "mp3/LEESMIJ.md", "img/LEESMIJ.md", "opnames/LEESMIJ.md"):
        if (SJABLOON / f).is_file() and not (doel / f).exists():
            shutil.copy2(SJABLOON / f, doel / f)

    n = schrijf_words(t, doel / "js" / "words.js")
    sw = doel / "js" / "game.js"   # opslagsleutel komt uit words.js; hier geen aanpassing nodig
    for pad in [doel / b for b in KOPIEER_BESTANDEN] + list((doel / "js").glob("*.js")) + list((doel / "css").glob("*.css")) \
            + list((doel / "tools").glob("*")) + list((doel / "mp3").glob("*.md")) + list((doel / "img").glob("*.md")) \
            + list((doel / "opnames").glob("*.md")):
        if pad.name == "words.js" or not pad.is_file() or pad.suffix in {".png", ".mp3", ".webm"}:
            continue
        vervang_tekst(pad, t)
    del sw

    (doel / "README.md").write_text(f"""# {t['titel']}! ({t['eigen']})

Created by DieOuwe · www.dieouwe.nl

Cursus **{t['naam']}** van de Taalcursus, versie {VERSIE}. Zelfde opzet als `papiamento/`: leren, quiz, sterren en badges, app (PWA) en offline.

- {n} woorden in 5 categorieën, elk met emoji, woord, Nederlands en uitspraakgids. Woorden aanpassen: `tools/talen.py` (en dan `python tools/maak_cursus.py {taal} --force`) of direct `js/words.js`.
- **Geluid:** de stem van de browser of het apparaat (taalcode `{t['tts_fallback']}`). Eigen mp3's gaan voor: `mp3/vrouw/<id>.mp3` (echte opname) of `mp3/mms/<id>.mp3` (computerstem).
- Computerstem maken (Docker, zie `tools/Dockerfile`): model `{t['mms']}`, licentie CC BY-NC 4.0. Controleer de licentie en pas `NOTICE.md` en de footer aan als je ze gebruikt.
- Opslagsleutel in `localStorage`: `{t['opslag']}`.
- Eigen plaatjes: `img/<id>.png` (zie `img/LEESMIJ.md`). De ids zijn Nederlandse woorden (zon, maan, hond ...) en gelijk in alle cursussen.
{"- **Let op:** woorden en uitspraak zijn nog niet door een moedertaalspreker gecontroleerd (status `check`)." if t['status'] == 'check' else "- De uitspraakgids is indicatief (Nederlandse klanken); laat hem nakijken door een moedertaalspreker."}

Hoofdpagina: `../index.html`. Hoe voeg je nog een taal toe: `../docs/NIEUWE-CURSUS.md`.
""", encoding="utf-8")
    (doel / "NOTICE.md").write_text(f"""# NOTICE: rechten per onderdeel ({t['naam']})

Created by DieOuwe · www.dieouwe.nl

| Onderdeel | Map | Voorwaarden |
|---|---|---|
| Code (html, css, js, python) | `index.html`, `css/`, `js/`, `tools/`, `sw.js` | MIT, zie `LICENSE` in de hoofdmap |
| Geluid | (browser) | De computerstem van het apparaat van de bezoeker; er worden geen opnames verspreid |
| Echte opnames | `mp3/vrouw/` | Rechten bij de spreker. Zet hier alleen opnames waarvoor je **toestemming** hebt om ze openbaar te delen |
| Computerstem (optioneel) | `mp3/mms/` | Bij gebruik van Meta MMS-TTS (`{t['mms']}`): **CC BY-NC 4.0**, alleen niet-commercieel, met bronvermelding |
| Eigen plaatjes | `img/` | Rechten bij de maker |
| Woordenlijst | `js/words.js` | Standaardwoorden; uitspraakgids is indicatief en nog niet door een moedertaalspreker gecontroleerd |
| Emoji | (in de browser) | Getekend door het besturingssysteem van de bezoeker |
""", encoding="utf-8")
    (doel / "CHANGELOG.md").write_text(f"""# Changelog: {t['titel']}!

Created by DieOuwe · www.dieouwe.nl

## [2026-10-06 22:00] — Eerste versie van de cursus {t['naam']}

**Type:** Feature
**Skill:** webapp-dev (via wow-bigboss-orchestrator)
**Bestanden:** alles in `{t['map']}/`, gemaakt met `tools/maak_cursus.py`
**Versie:** v{VERSIE}

### Wijzigingen
- {n} woorden, uitspraakgids, quiz met leerkaartjes, sterren en badges, app en offline; stem van het apparaat.

### Open actiepunten
- [ ] Woorden en uitspraak laten nakijken door een moedertaalspreker
- [ ] Eventueel mp3's maken (`tools/Dockerfile`, model `{t['mms']}`) of inspreken
- [ ] Eigen plaatjes (`img/LEESMIJ.md`)
""", encoding="utf-8")
    print(f"  {t['map']}/ klaar: {n} woorden, opslag {t['opslag']}, SW-prefix {t['prefix']}-")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("talen", nargs="*", help=f"een of meer van: {', '.join(TALEN)}")
    ap.add_argument("--alle", action="store_true")
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    lijst = list(TALEN) if a.alle else a.talen
    if not lijst:
        ap.error("geef een taal of --alle")
    for t in lijst:
        if t not in TALEN:
            ap.error(f"onbekende taal {t}")
        maak(t, a.force)
    print("Klaar. Maak nu de iconen en zet de status in cursussen.js op \"beschikbaar\".")
    return 0


if __name__ == "__main__":
    sys.exit(main())
