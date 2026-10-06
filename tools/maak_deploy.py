#!/usr/bin/env python3
"""
maak_deploy.py v0.5.0 - Taalcursus (hoofdpagina + alle cursussen)
Created by DieOuwe · www.dieouwe.nl

Verzamelt ALLEEN wat online nodig is in de map _site/ (en met --zip ook als zipbestand),
klaar om naar je subdomein (bijv. taal.dieouwe.nl) te uploaden.

  Hoofdpagina (root): index.html, hub.css, hub.js, sfeer.*, onderhoud.*, cursussen.js, pwa.js, sw.js, manifest, icons/,
                      .htaccess, NOTICE.md, LICENSE
  Per cursusmap (elke map met een index.html, behalve tools/deploy/docs/...):
                      index.html, sw.js, manifest, NOTICE.md, css/, js/, icons/, mp3/ (alleen .mp3),
                      img/ (alleen plaatjes)
  NIET mee:           .git, .github, opnames/, tools/, deploy/, docs/, README/CHANGELOG/TESTLIJST, *.py, *.bat

Elke service worker krijgt een tijdstempel in zijn versie, zodat bezoekers na elke upload
de nieuwe bestanden krijgen (je hoeft VERSIE niet zelf te verhogen).

Gebruik:
    python tools/maak_deploy.py            # maakt _site/
    python tools/maak_deploy.py --zip      # maakt ook taalcursus-site-<tijdstempel>.zip
Zonder Python op je pc:
    docker run --rm -v "${PWD}:/work" -w /work python:3.11-slim python tools/maak_deploy.py --zip
"""
import argparse
import re
import shutil
import sys
import zipfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UIT = ROOT / "_site"

# Hoofdpagina
ROOT_BESTANDEN = ["index.html", "hub.css", "kleuren.css", "hub.js", "sfeer.css", "sfeer.js", "cursussen.js", "pwa.js", "sw.js",
                  "onderhoud.html", "onderhoud.css", "onderhoud.js", "meisje-boven.webp",
                  "manifest.webmanifest", ".htaccess", "NOTICE.md", "LICENSE"]
ROOT_MAPPEN = {"icons": {".png", ".svg", ".ico"}}

# Cursusmap
CURSUS_BESTANDEN = ["index.html", "sw.js", "manifest.webmanifest", "NOTICE.md"]
CURSUS_MAPPEN = {
    "css": {".css"},
    "js": {".js"},
    "icons": {".png", ".svg", ".ico"},
    "mp3": {".mp3"},
    "ui": {".webp", ".png"},
    "img": {".webp", ".png", ".jpg", ".jpeg", ".svg"},
}

# Mappen in de root die nooit een cursus zijn
GEEN_CURSUS = {"tools", "deploy", "docs", "_site", "icons", ".git", ".github", "node_modules"}


def kopieer(bron: Path, doel: Path) -> int:
    doel.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(bron, doel)
    return bron.stat().st_size


def kopieer_set(basis: Path, uit: Path, bestanden, mappen) -> tuple[int, int]:
    n = b = 0
    for naam in bestanden:
        bron = basis / naam
        if not bron.is_file():
            if basis == ROOT:
                print(f"  ! ontbreekt: {bron.relative_to(ROOT).as_posix()}", file=sys.stderr)
            continue
        b += kopieer(bron, uit / naam)
        n += 1
    for map_, ext in mappen.items():
        d = basis / map_
        if not d.is_dir():
            continue
        for bron in sorted(d.rglob("*")):
            if bron.is_file() and bron.suffix.lower() in ext:
                b += kopieer(bron, uit / map_ / bron.relative_to(d))
                n += 1
    return n, b


def vind_cursussen() -> list[Path]:
    return sorted(p for p in ROOT.iterdir()
                  if p.is_dir() and p.name not in GEEN_CURSUS and not p.name.startswith(".")
                  and (p / "index.html").is_file())


def stempel_sw(sw: Path, stempel: str) -> str | None:
    tekst = sw.read_text(encoding="utf-8")
    m = re.search(r"const VERSIE = '([^']+)';", tekst)
    if not m:
        return None
    versie = f"{m.group(1)}-{stempel}"
    sw.write_text(tekst.replace(m.group(0), f"const VERSIE = '{versie}';"), encoding="utf-8")
    return versie


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--zip", action="store_true", help="maak ook een zipbestand")
    args = ap.parse_args()

    if UIT.exists():
        shutil.rmtree(UIT)
    UIT.mkdir()

    n, b = kopieer_set(ROOT, UIT, ROOT_BESTANDEN, ROOT_MAPPEN)
    cursussen = vind_cursussen()
    for c in cursussen:
        cn, cb = kopieer_set(c, UIT / c.name, CURSUS_BESTANDEN, CURSUS_MAPPEN)
        print(f"  cursus {c.name}: {cn} bestanden")
        n += cn
        b += cb

    stempel = datetime.now().strftime("%Y%m%d%H%M")
    sws = [UIT / "sw.js"] + [UIT / c.name / "sw.js" for c in cursussen if (UIT / c.name / "sw.js").is_file()]
    versies = []
    for sw in sws:
        v = stempel_sw(sw, stempel)
        if v is None:
            print(f"VERSIE niet gevonden in {sw.relative_to(UIT).as_posix()}", file=sys.stderr)
            return 2
        versies.append(v)

    print(f"_site/ klaar: {n} bestanden, {b / 1024 / 1024:.1f} MB, {len(cursussen)} cursusmappen")
    print("cache-versies: " + ", ".join(versies))

    if args.zip:
        zip_pad = ROOT / f"taalcursus-site-{stempel}.zip"
        with zipfile.ZipFile(zip_pad, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(UIT.rglob("*")):
                if f.is_file():
                    z.write(f, f.relative_to(UIT).as_posix())
        print(f"Zip: {zip_pad.name}")

    print("Upload de INHOUD van _site/ naar de hoofdmap van het subdomein (index.html moet daar direct in staan).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
