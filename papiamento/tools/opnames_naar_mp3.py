#!/usr/bin/env python3
"""
opnames_naar_mp3.py v0.4.0 - Aprende Papiamentu
Created by DieOuwe · www.dieouwe.nl

Zet echte opnames om naar mp3/vrouw/<id>.mp3 (de stem die de app als eerste speelt).

Zo werkt het:
  1. Neem de woorden op met tools/studio.html (of met je telefoon/computer).
  2. Zet de bestanden in de map opnames/ en noem ze naar het woord-id:  kacho.webm, welo.m4a, un.wav ...
  3. Draai:   python tools/opnames_naar_mp3.py
     Elk bestand wordt stilte-vrij gemaakt, even hard gezet en als mp3 opgeslagen.

Opties:
    --dialect aw     schrijf naar mp3/vrouw/aw/ (alleen voor woorden met een eigen Aruba-schrijfwijze)
    --bron MAP       andere invoermap (standaard: opnames/)
    --verplaats      verplaats de bron naar opnames/klaar/ als het gelukt is
    --controle       alleen tonen wat er zou gebeuren

Werkt met ffmpeg (staat in de Docker-image). Zonder ffmpeg op je pc:
    docker run --rm --entrypoint python -v "${PWD}:/work" pap-audio tools/opnames_naar_mp3.py
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORDS_JS = ROOT / "js" / "words.js"
UIT_DIR = ROOT / "mp3" / "vrouw"
TOEGESTAAN = {".wav", ".webm", ".ogg", ".oga", ".m4a", ".mp4", ".aac", ".mp3", ".flac", ".opus", ".caf"}

# Stilte aan begin en eind weg, dan volume gelijk trekken (EBU R128), dan een klein stukje stilte terug.
FILTER = (
    "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,"
    "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,"
    "loudnorm=I=-16:TP=-1.5:LRA=7,"
    "adelay=120|120,apad=pad_dur=0.15"
)


def laad_ids():
    tekst = WORDS_JS.read_text(encoding="utf-8")
    m = re.search(r"^window\.PAP_DATA\s*=", tekst, re.M)
    data = json.loads(tekst[m.end():].strip().rstrip(";").strip())
    return {w["id"]: w for w in data["woorden"]}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dialect", default="cw", choices=["cw", "aw", "bn"])
    ap.add_argument("--bron", default=str(ROOT / "opnames"))
    ap.add_argument("--verplaats", action="store_true")
    ap.add_argument("--controle", action="store_true")
    args = ap.parse_args()

    if not shutil.which("ffmpeg"):
        print("ffmpeg niet gevonden. Gebruik de Docker-variant (zie bovenaan dit bestand).", file=sys.stderr)
        return 2

    woorden = laad_ids()
    bron = Path(args.bron)
    if not bron.is_dir():
        print(f"Map {bron} bestaat niet.", file=sys.stderr)
        return 2
    uit = UIT_DIR if args.dialect == "cw" else UIT_DIR / args.dialect
    klaar_dir = bron / "klaar"

    bestanden = sorted(f for f in bron.iterdir() if f.is_file() and f.suffix.lower() in TOEGESTAAN)
    if not bestanden:
        print(f"Geen opnames gevonden in {bron}. Zet bestanden zoals kacho.webm of welo.m4a in die map.")
        return 0

    gelukt, overgeslagen, fout = 0, [], []
    for f in bestanden:
        wid = f.stem.lower()
        if wid not in woorden:
            overgeslagen.append(f.name)
            print(f"  ? {f.name}: onbekend woord-id '{wid}' (zie js/words.js)", file=sys.stderr)
            continue
        doel = uit / f"{wid}.mp3"
        if args.controle:
            print(f"  - {f.name} -> {doel.relative_to(ROOT)}")
            continue
        uit.mkdir(parents=True, exist_ok=True)
        r = subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(f), "-vn", "-ac", "1", "-ar", "44100",
             "-af", FILTER, "-codec:a", "libmp3lame", "-q:a", "3", str(doel)],
            capture_output=True, text=True)
        if r.returncode != 0:
            fout.append(f.name)
            print(f"  ! {f.name}: ffmpeg faalde: {r.stderr.strip()[:200]}", file=sys.stderr)
            continue
        gelukt += 1
        print(f"  + {f.name} -> {doel.relative_to(ROOT)}")
        if args.verplaats:
            klaar_dir.mkdir(exist_ok=True)
            shutil.move(str(f), str(klaar_dir / f.name))

    if not args.controle:
        print(f"Klaar. {gelukt} omgezet, {len(overgeslagen)} overgeslagen, {len(fout)} mislukt.")
    return 1 if fout else 0


if __name__ == "__main__":
    sys.exit(main())
