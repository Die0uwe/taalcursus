/* ============================================================
   Leer Frans - woordenlijst  (js/words.js)  v0.4.0
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
window.PAP_DATA = {
  "meta": {"versie": "0.4.0", "standaardDialect": "std", "taal": "Frans", "kampioen": "Français-kampioen!", "opslag": "frans.v1", "ttsTalen": ["fr"], "ttsFallback": "fr-FR"},
  "dialecten": [ {"id": "std", "naam": "Frans", "vlag": "🇫🇷"} ],
  "categorieen": [
    {"id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink"},
    {"id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green"},
    {"id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow"},
    {"id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple"},
    {"id": "familie", "naam": "Familie", "sub": "Papa, Maman, Grand-père, Grand-mère...", "icon": "👨‍👩‍👧‍👦", "kleur": "red"}
  ],
  "woorden": [
    {"id": "zon", "cat": "basis", "icon": "☀️", "pap": "Soleil", "uitspraak": "so-lèj", "nl": "Zon", "status": "bron", "bron": "woordenlijst"},
    {"id": "maan", "cat": "basis", "icon": "🌙", "pap": "Lune", "uitspraak": "luun", "nl": "Maan", "status": "bron", "bron": "woordenlijst"},
    {"id": "water", "cat": "basis", "icon": "💧", "pap": "Eau", "uitspraak": "oo", "nl": "Water", "status": "bron", "bron": "woordenlijst"},
    {"id": "vuur", "cat": "basis", "icon": "🔥", "pap": "Feu", "uitspraak": "fè", "nl": "Vuur", "status": "bron", "bron": "woordenlijst"},
    {"id": "huis", "cat": "basis", "icon": "🏠", "pap": "Maison", "uitspraak": "mè-zon", "nl": "Huis", "status": "bron", "bron": "woordenlijst"},
    {"id": "goedemorgen", "cat": "basis", "icon": "👋", "pap": "Bonjour", "uitspraak": "bon-zjoer", "nl": "Goedemorgen", "status": "bron", "bron": "woordenlijst"},
    {"id": "appel", "cat": "basis", "icon": "🍎", "pap": "Pomme", "uitspraak": "pom", "nl": "Appel", "status": "bron", "bron": "woordenlijst"},
    {"id": "melk", "cat": "basis", "icon": "🥛", "pap": "Lait", "uitspraak": "lè", "nl": "Melk", "status": "bron", "bron": "woordenlijst"},

    {"id": "hond", "cat": "dieren", "icon": "🐕", "pap": "Chien", "uitspraak": "sjien", "nl": "Hond", "status": "bron", "bron": "woordenlijst"},
    {"id": "kat", "cat": "dieren", "icon": "🐈", "pap": "Chat", "uitspraak": "sja", "nl": "Kat", "status": "bron", "bron": "woordenlijst"},
    {"id": "vogel", "cat": "dieren", "icon": "🐦", "pap": "Oiseau", "uitspraak": "wa-zoo", "nl": "Vogel", "status": "bron", "bron": "woordenlijst"},
    {"id": "vis", "cat": "dieren", "icon": "🐟", "pap": "Poisson", "uitspraak": "pwa-son", "nl": "Vis", "status": "bron", "bron": "woordenlijst"},
    {"id": "geit", "cat": "dieren", "icon": "🐐", "pap": "Chèvre", "uitspraak": "sjèv-r", "nl": "Geit", "status": "bron", "bron": "woordenlijst"},
    {"id": "paard", "cat": "dieren", "icon": "🐴", "pap": "Cheval", "uitspraak": "sje-val", "nl": "Paard", "status": "bron", "bron": "woordenlijst"},
    {"id": "koe", "cat": "dieren", "icon": "🐄", "pap": "Vache", "uitspraak": "vasj", "nl": "Koe", "status": "bron", "bron": "woordenlijst"},
    {"id": "kip", "cat": "dieren", "icon": "🐔", "pap": "Poule", "uitspraak": "poel", "nl": "Kip", "status": "bron", "bron": "woordenlijst"},

    {"id": "rood", "cat": "kleuren", "icon": "🔴", "pap": "Rouge", "uitspraak": "roezj", "nl": "Rood", "status": "bron", "bron": "woordenlijst"},
    {"id": "blauw", "cat": "kleuren", "icon": "🔵", "pap": "Bleu", "uitspraak": "blè", "nl": "Blauw", "status": "bron", "bron": "woordenlijst"},
    {"id": "groen", "cat": "kleuren", "icon": "🟢", "pap": "Vert", "uitspraak": "vèr", "nl": "Groen", "status": "bron", "bron": "woordenlijst"},
    {"id": "geel", "cat": "kleuren", "icon": "🟡", "pap": "Jaune", "uitspraak": "zjoon", "nl": "Geel", "status": "bron", "bron": "woordenlijst"},
    {"id": "zwart", "cat": "kleuren", "icon": "⚫", "pap": "Noir", "uitspraak": "nwar", "nl": "Zwart", "status": "bron", "bron": "woordenlijst"},
    {"id": "wit", "cat": "kleuren", "icon": "⚪", "pap": "Blanc", "uitspraak": "blan", "nl": "Wit", "status": "bron", "bron": "woordenlijst"},
    {"id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Orange", "uitspraak": "o-ranzj", "nl": "Oranje", "status": "bron", "bron": "woordenlijst"},
    {"id": "paars", "cat": "kleuren", "icon": "🟣", "pap": "Violet", "uitspraak": "vjo-lè", "nl": "Paars", "status": "bron", "bron": "woordenlijst"},

    {"id": "een", "cat": "nummers", "icon": "1️⃣", "pap": "Un", "uitspraak": "un", "nl": "Eén", "status": "bron", "bron": "woordenlijst"},
    {"id": "twee", "cat": "nummers", "icon": "2️⃣", "pap": "Deux", "uitspraak": "dè", "nl": "Twee", "status": "bron", "bron": "woordenlijst"},
    {"id": "drie", "cat": "nummers", "icon": "3️⃣", "pap": "Trois", "uitspraak": "trwa", "nl": "Drie", "status": "bron", "bron": "woordenlijst"},
    {"id": "vier", "cat": "nummers", "icon": "4️⃣", "pap": "Quatre", "uitspraak": "kat-r", "nl": "Vier", "status": "bron", "bron": "woordenlijst"},
    {"id": "vijf", "cat": "nummers", "icon": "5️⃣", "pap": "Cinq", "uitspraak": "sènk", "nl": "Vijf", "status": "bron", "bron": "woordenlijst"},
    {"id": "zes", "cat": "nummers", "icon": "6️⃣", "pap": "Six", "uitspraak": "sies", "nl": "Zes", "status": "bron", "bron": "woordenlijst"},
    {"id": "zeven", "cat": "nummers", "icon": "7️⃣", "pap": "Sept", "uitspraak": "sèt", "nl": "Zeven", "status": "bron", "bron": "woordenlijst"},
    {"id": "acht", "cat": "nummers", "icon": "8️⃣", "pap": "Huit", "uitspraak": "wiet", "nl": "Acht", "status": "bron", "bron": "woordenlijst"},
    {"id": "negen", "cat": "nummers", "icon": "9️⃣", "pap": "Neuf", "uitspraak": "nuf", "nl": "Negen", "status": "bron", "bron": "woordenlijst"},
    {"id": "tien", "cat": "nummers", "icon": "🔟", "pap": "Dix", "uitspraak": "dies", "nl": "Tien", "status": "bron", "bron": "woordenlijst"},

    {"id": "papa", "cat": "familie", "icon": "👨", "pap": "Papa", "uitspraak": "pa-pa", "nl": "Papa", "status": "bron", "bron": "woordenlijst"},
    {"id": "mama", "cat": "familie", "icon": "👩", "pap": "Maman", "uitspraak": "ma-man", "nl": "Mama", "status": "bron", "bron": "woordenlijst"},
    {"id": "opa", "cat": "familie", "icon": "👴", "pap": "Grand-père", "uitspraak": "gran-pèr", "nl": "Opa", "status": "bron", "bron": "woordenlijst"},
    {"id": "oma", "cat": "familie", "icon": "👵", "pap": "Grand-mère", "uitspraak": "gran-mèr", "nl": "Oma", "status": "bron", "bron": "woordenlijst"},
    {"id": "broer", "cat": "familie", "icon": "👦", "pap": "Frère", "uitspraak": "frèr", "nl": "Broer", "status": "bron", "bron": "woordenlijst"},
    {"id": "zus", "cat": "familie", "icon": "👧", "pap": "Sœur", "uitspraak": "sur", "nl": "Zus", "status": "bron", "bron": "woordenlijst"},
    {"id": "tante", "cat": "familie", "icon": "🧕", "pap": "Tante", "uitspraak": "tant", "nl": "Tante", "status": "bron", "bron": "woordenlijst"},
    {"id": "oom", "cat": "familie", "icon": "🧔", "pap": "Oncle", "uitspraak": "onkl", "nl": "Oom", "status": "bron", "bron": "woordenlijst"}
  ]
};
