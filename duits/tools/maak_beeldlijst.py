#!/usr/bin/env python3
"""
maak_beeldlijst.py v0.4.0 - Leer Duits
Created by DieOuwe · www.dieouwe.nl

Maakt de werklijst voor je eigen plaatjes:
    img/LIJST.md      overzicht: welk woord, welke bestandsnaam, al klaar of nog niet, voorbeeld-prompt
    img/prompts.txt   een prompt per regel:  id<TAB>prompt   (handig om in Stable Diffusion/ComfyUI te plakken)

Draai opnieuw na het toevoegen van plaatjes of woorden:   python tools/maak_beeldlijst.py
Een plaatje in img/ (webp, png, jpg, jpeg of svg, met het woord-id als naam) vervangt in de app de emoji.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "img"
EXT = ["webp", "png", "jpg", "jpeg", "svg"]

STIJL = ("cute children's book illustration, flat vector style, soft rounded shapes, bright cheerful colors, "
         "thick clean outline, single subject centered, plain white background, no text, no letters")

# Engelse beschrijving per woord-id, voor het beeldmodel. Pas gerust aan.
EN = {
    "zon": "a smiling sun with sun rays", "maan": "a crescent moon with a sleepy face and little stars",
    "water": "a big drop of clear water with a splash", "vuur": "a friendly cartoon flame, campfire",
    "huis": "a small colorful Caribbean house with a red roof", "goedemorgen": "a child waving hello on a sunny morning",
    "appel": "a shiny red apple with a green leaf", "melk": "a glass of milk next to a milk bottle",
    "hond": "a happy dog", "kat": "a cute cat", "vogel": "a small colorful bird on a branch",
    "vis": "a cheerful tropical fish", "geit": "a goat", "paard": "a horse", "koe": "a cow",
    "kip": "a hen with chicks",
    "rood": "a big red circle paint splash", "blauw": "a big blue circle paint splash",
    "groen": "a big green circle paint splash", "geel": "a big yellow circle paint splash",
    "zwart": "a big black circle paint splash", "wit": "a big white circle with a light gray outline",
    "oranje": "a big orange circle paint splash", "paars": "a big purple circle paint splash",
    "een": "the number 1 made of one apple", "twee": "the number 2 shown with two apples",
    "drie": "the number 3 shown with three apples", "vier": "the number 4 shown with four apples",
    "vijf": "the number 5 shown with five apples", "zes": "the number 6 shown with six apples",
    "zeven": "the number 7 shown with seven apples", "acht": "the number 8 shown with eight apples",
    "negen": "the number 9 shown with nine apples", "tien": "the number 10 shown with ten apples",
    "papa": "a friendly father, adult man smiling", "mama": "a friendly mother, adult woman smiling",
    "opa": "a kind grandfather with white hair and glasses", "oma": "a kind grandmother with gray hair in a bun",
    "broer": "a cheerful boy, big brother", "zus": "a cheerful girl with pigtails, big sister",
    "tante": "a friendly aunt, woman with a colorful headscarf", "oom": "a friendly uncle, man with a short beard",
}


def laad():
    tekst = (ROOT / "js" / "words.js").read_text(encoding="utf-8")
    m = re.search(r"^window\.PAP_DATA\s*=", tekst, re.M)
    return json.loads(tekst[m.end():].strip().rstrip(";").strip())


def bestaand(wid):
    for e in EXT:
        if (IMG / f"{wid}.{e}").exists():
            return f"{wid}.{e}"
    return None


def main():
    data = laad()
    cats = {c["id"]: c for c in data["categorieen"]}
    IMG.mkdir(exist_ok=True)
    regels, prompts = [], []
    klaar = 0
    for c in data["categorieen"]:
        regels.append(f"\n## {c['icon']} {c['naam']}\n")
        regels.append("| Klaar | Woord | Nederlands | Bestandsnaam | Prompt (Engels) |")
        regels.append("|:--:|---|---|---|---|")
        for w in [x for x in data["woorden"] if x["cat"] == c["id"]]:
            gevonden = bestaand(w["id"])
            klaar += bool(gevonden)
            onderwerp = EN.get(w["id"], w["nl"])
            prompt = f"{onderwerp}, {STIJL}"
            prompts.append(f"{w['id']}\t{prompt}")
            regels.append(f"| {'✅' if gevonden else '⬜'} | {w['icon']} {w['pap']} | {w['nl']} | `img/{w['id']}.png` | {onderwerp} |")
    totaal = len(data["woorden"])
    kop = f"""# Plaatjes-lijst (img/)

*Gemaakt door `tools/maak_beeldlijst.py`. Niet met de hand aanpassen, draai het script opnieuw.*

**Klaar: {klaar} van {totaal}**

## Afspraken

- **Bestandsnaam** = het woord-id uit `js/words.js`, bijvoorbeeld `img/opa.png`.
- **Formaat**: png, webp, jpg of svg. Voorkeur: **webp of png, vierkant, 512 x 512 tot 1024 x 1024 pixels**, liefst met doorzichtige achtergrond.
- Bestaat er geen plaatje voor een woord, dan toont de app gewoon de emoji. Je kunt dus een voor een vervangen.
- Zoekvolgorde per woord: `webp`, `png`, `jpg`, `jpeg`, `svg`. De eerste die bestaat wint.
- Eén plaatje per woord geldt voor alle eilanden.
- Houd bestanden klein (liefst onder 200 kB), zodat de app snel laadt en offline blijft werken.
- Ververs de app na het toevoegen met Ctrl+F5. Draai daarna dit script opnieuw voor een bijgewerkte lijst.

## Vaste stijl (aan elke prompt toegevoegd)

`{STIJL}`

Gebruik voor alle plaatjes dezelfde stijl, seed-reeks of LoRA, dan ziet de app er rustig en samenhangend uit.
Voor de familie-plaatjes kun je zelf bepalen hoe de personen eruitzien, de prompts hieronder zijn alleen een start.
"""
    (IMG / "LIJST.md").write_text(kop + "\n".join(regels) + "\n", encoding="utf-8")
    (IMG / "prompts.txt").write_text("\n".join(prompts) + "\n", encoding="utf-8")
    print(f"img/LIJST.md en img/prompts.txt gemaakt. Klaar: {klaar}/{totaal}")


if __name__ == "__main__":
    main()
