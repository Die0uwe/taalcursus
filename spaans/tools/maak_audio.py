#!/usr/bin/env python3
"""
maak_audio.py v0.4.0 - Leer Spaans
Created by DieOuwe · www.dieouwe.nl

Maakt de COMPUTERSTEM: mp3/mms/<id>.mp3 voor elk woord in js/words.js, met het model
facebook/mms-tts-spa (Meta MMS-TTS, licentie CC-BY-NC 4.0: alleen niet-commercieel).

Stemmen staan in eigen mappen (de app speelt de eerste die bestaat):
    mp3/vrouw/   echte opnames (maak ze met tools/studio.html + tools/opnames_naar_mp3.py)  <- wint
    mp3/mms/     computerstem uit dit script                                               <- terugval
Dit script raakt mp3/vrouw/ nooit aan.

Gebruik (in de container, zie tools/Dockerfile):
    python tools/maak_audio.py                 # alles wat nog ontbreekt
    python tools/maak_audio.py --only hond    # één woord (id uit words.js)
    python tools/maak_audio.py --force         # alles opnieuw maken
    python tools/maak_audio.py --dialect aw    # alleen woorden die in Aruba anders zijn -> mp3/mms/aw/
    python tools/maak_audio.py --seed 7        # andere stem-variatie
"""
import argparse
import json
import re
import subprocess
import sys
import unicodedata
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORDS_JS = ROOT / "js" / "words.js"
MP3_DIR = ROOT / "mp3" / "mms"
MODEL_ID = "facebook/mms-tts-spa"


def laad_data() -> dict:
    """Leest de JSON achter 'window.PAP_DATA =' uit js/words.js."""
    tekst = WORDS_JS.read_text(encoding="utf-8")
    m = re.search(r"^window\.PAP_DATA\s*=", tekst, re.M)  # begin van de regel: negeert de kopcomment
    if not m:
        raise ValueError("window.PAP_DATA niet gevonden in js/words.js")
    ruw = tekst[m.end():].strip().rstrip(";").strip()
    return json.loads(ruw)


def woord_voor_dialect(w: dict, dialect: str) -> str:
    return w.get("dialect", {}).get(dialect, {}).get("pap", w["pap"])


def zonder_accenten(s: str) -> str:
    n = unicodedata.normalize("NFD", s)
    return "".join(c for c in n if unicodedata.category(c) != "Mn")


def maak_tekst(pap: str) -> str:
    """Model-invoer: kleine letters, geen leestekens."""
    return re.sub(r"[^\w\s']", "", pap.lower()).strip()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", help="alleen dit woord-id")
    ap.add_argument("--force", action="store_true", help="bestaande mp3's overschrijven")
    ap.add_argument("--dialect", default="cw", choices=["cw", "aw", "bn"])
    ap.add_argument("--seed", type=int, default=42, help="vaste seed (model is stochastisch)")
    ap.add_argument("--wav", action="store_true", help="bewaar ook de .wav (naast de mp3)")
    args = ap.parse_args()

    data = laad_data()
    woorden = data["woorden"]
    if args.only:
        woorden = [w for w in woorden if w["id"] == args.only]
        if not woorden:
            print(f"Geen woord met id '{args.only}'.", file=sys.stderr)
            return 2

    uitvoer = MP3_DIR if args.dialect == "cw" else MP3_DIR / args.dialect
    te_doen = []
    for w in woorden:
        if args.dialect != "cw" and "pap" not in w.get("dialect", {}).get(args.dialect, {}):
            continue   # geen eigen schrijfwijze voor dit eiland: de Curacao-opname wordt gebruikt
        doel = uitvoer / f"{w['id']}.mp3"
        if doel.exists() and not args.force:
            print(f"  = {w['id']}: bestaat al (overgeslagen)")
            continue
        te_doen.append((w, doel))

    if not te_doen:
        print("Niets te doen.")
        return 0

    # Zware imports pas hier, zodat --help snel blijft
    import numpy as np
    import scipy.io.wavfile as wavfile
    import torch
    from transformers import AutoTokenizer, VitsModel

    print(f"Model laden: {MODEL_ID} (eerste keer wordt het gedownload)...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    model = VitsModel.from_pretrained(MODEL_ID)
    model.eval()
    sr = model.config.sampling_rate
    uitvoer.mkdir(parents=True, exist_ok=True)

    fouten = []
    for w, doel in te_doen:
        pap = woord_voor_dialect(w, args.dialect)
        tekst = maak_tekst(pap)
        inputs = tokenizer(tekst, return_tensors="pt")
        if inputs["input_ids"].shape[1] == 0:
            tekst = maak_tekst(zonder_accenten(pap))
            inputs = tokenizer(tekst, return_tensors="pt")
        if inputs["input_ids"].shape[1] == 0:
            print(f"  ! {w['id']}: lege invoer voor '{pap}'", file=sys.stderr)
            fouten.append(w["id"])
            continue

        # vaste seed per woord => elke run geeft dezelfde klank
        torch.manual_seed(args.seed + zlib.crc32(w["id"].encode()) % 10_000)
        with torch.no_grad():
            golf = model(**inputs).waveform[0].cpu().numpy()

        piek = float(np.max(np.abs(golf))) or 1.0
        pcm = (golf / piek * 0.9 * 32767).astype(np.int16)
        wav_pad = doel.with_suffix(".wav")
        wavfile.write(wav_pad, sr, pcm)

        r = subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_pad),
             "-ac", "1", "-codec:a", "libmp3lame", "-q:a", "4", str(doel)],
            capture_output=True, text=True)
        if r.returncode != 0:
            print(f"  ! {w['id']}: ffmpeg faalde: {r.stderr.strip()}", file=sys.stderr)
            fouten.append(w["id"])
            continue
        if not args.wav:
            wav_pad.unlink(missing_ok=True)
        print(f"  + {w['id']}: '{tekst}' -> {doel.name} ({len(pcm) / sr:.2f}s)")

    print(f"Klaar. {len(te_doen) - len(fouten)} gemaakt, {len(fouten)} mislukt.")
    if fouten:
        print("Mislukt:", ", ".join(fouten), file=sys.stderr)
    print("Luister steekproefsgewijs! Klinkt een woord fout? Vervang het bestand door een echte opname.")
    return 1 if fouten else 0


if __name__ == "__main__":
    sys.exit(main())
