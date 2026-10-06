/* ============================================================
   Leer Duits - woordenlijst  (js/words.js)  v0.9.0
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
  "meta": {"versie": "0.9.0", "standaardDialect": "std", "taal": "Duits", "kampioen": "Deutsch-kampioen!", "opslag": "duits.v1", "ttsTalen": ["de"], "ttsFallback": "de-DE"},
  "dialecten": [ {"id": "std", "naam": "Duits", "vlag": "🇩🇪"} ],
  "categorieen": [
    {"id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink"},
    {"id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green"},
    {"id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow"},
    {"id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple"},
    {"id": "familie", "naam": "Familie", "sub": "Papa, Mama, Opa, Oma...", "icon": "👨‍👩‍👧‍👦", "kleur": "red"}
  ],
  "woorden": [
    {"id": "zon", "cat": "basis", "icon": "☀️", "pap": "Sonne", "uitspraak": "zo-ne", "nl": "Zon", "status": "bron", "bron": "woordenlijst"},
    {"id": "maan", "cat": "basis", "icon": "🌙", "pap": "Mond", "uitspraak": "moont", "nl": "Maan", "status": "bron", "bron": "woordenlijst"},
    {"id": "water", "cat": "basis", "icon": "💧", "pap": "Wasser", "uitspraak": "va-ser", "nl": "Water", "status": "bron", "bron": "woordenlijst"},
    {"id": "vuur", "cat": "basis", "icon": "🔥", "pap": "Feuer", "uitspraak": "foi-er", "nl": "Vuur", "status": "bron", "bron": "woordenlijst"},
    {"id": "huis", "cat": "basis", "icon": "🏠", "pap": "Haus", "uitspraak": "haus", "nl": "Huis", "status": "bron", "bron": "woordenlijst"},
    {"id": "goedemorgen", "cat": "basis", "icon": "👋", "pap": "Guten Morgen", "uitspraak": "goe-ten mor-gen", "nl": "Goedemorgen", "status": "bron", "bron": "woordenlijst"},
    {"id": "appel", "cat": "basis", "icon": "🍎", "pap": "Apfel", "uitspraak": "ap-fel", "nl": "Appel", "status": "bron", "bron": "woordenlijst"},
    {"id": "melk", "cat": "basis", "icon": "🥛", "pap": "Milch", "uitspraak": "milch", "nl": "Melk", "status": "bron", "bron": "woordenlijst"},

    {"id": "hond", "cat": "dieren", "icon": "🐕", "pap": "Hund", "uitspraak": "hoent", "nl": "Hond", "status": "bron", "bron": "woordenlijst"},
    {"id": "kat", "cat": "dieren", "icon": "🐈", "pap": "Katze", "uitspraak": "kat-se", "nl": "Kat", "status": "bron", "bron": "woordenlijst"},
    {"id": "vogel", "cat": "dieren", "icon": "🐦", "pap": "Vogel", "uitspraak": "foo-gel", "nl": "Vogel", "status": "bron", "bron": "woordenlijst"},
    {"id": "vis", "cat": "dieren", "icon": "🐟", "pap": "Fisch", "uitspraak": "fisj", "nl": "Vis", "status": "bron", "bron": "woordenlijst"},
    {"id": "geit", "cat": "dieren", "icon": "🐐", "pap": "Ziege", "uitspraak": "tsie-ge", "nl": "Geit", "status": "bron", "bron": "woordenlijst"},
    {"id": "paard", "cat": "dieren", "icon": "🐴", "pap": "Pferd", "uitspraak": "pfeert", "nl": "Paard", "status": "bron", "bron": "woordenlijst"},
    {"id": "koe", "cat": "dieren", "icon": "🐄", "pap": "Kuh", "uitspraak": "koe", "nl": "Koe", "status": "bron", "bron": "woordenlijst"},
    {"id": "kip", "cat": "dieren", "icon": "🐔", "pap": "Huhn", "uitspraak": "hoen", "nl": "Kip", "status": "bron", "bron": "woordenlijst"},

    {"id": "rood", "cat": "kleuren", "icon": "🔴", "pap": "Rot", "uitspraak": "root", "nl": "Rood", "status": "bron", "bron": "woordenlijst"},
    {"id": "blauw", "cat": "kleuren", "icon": "🔵", "pap": "Blau", "uitspraak": "blau", "nl": "Blauw", "status": "bron", "bron": "woordenlijst"},
    {"id": "groen", "cat": "kleuren", "icon": "🟢", "pap": "Grün", "uitspraak": "gruun", "nl": "Groen", "status": "bron", "bron": "woordenlijst"},
    {"id": "geel", "cat": "kleuren", "icon": "🟡", "pap": "Gelb", "uitspraak": "gelp", "nl": "Geel", "status": "bron", "bron": "woordenlijst"},
    {"id": "zwart", "cat": "kleuren", "icon": "⚫", "pap": "Schwarz", "uitspraak": "sjvarts", "nl": "Zwart", "status": "bron", "bron": "woordenlijst"},
    {"id": "wit", "cat": "kleuren", "icon": "⚪", "pap": "Weiß", "uitspraak": "vais", "nl": "Wit", "status": "bron", "bron": "woordenlijst"},
    {"id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Orange", "uitspraak": "o-ran-zje", "nl": "Oranje", "status": "bron", "bron": "woordenlijst"},
    {"id": "paars", "cat": "kleuren", "icon": "🟣", "pap": "Lila", "uitspraak": "lie-la", "nl": "Paars", "status": "bron", "bron": "woordenlijst"},

    {"id": "een", "cat": "nummers", "icon": "1️⃣", "pap": "Eins", "uitspraak": "ains", "nl": "Eén", "status": "bron", "bron": "woordenlijst"},
    {"id": "twee", "cat": "nummers", "icon": "2️⃣", "pap": "Zwei", "uitspraak": "tsvai", "nl": "Twee", "status": "bron", "bron": "woordenlijst"},
    {"id": "drie", "cat": "nummers", "icon": "3️⃣", "pap": "Drei", "uitspraak": "drai", "nl": "Drie", "status": "bron", "bron": "woordenlijst"},
    {"id": "vier", "cat": "nummers", "icon": "4️⃣", "pap": "Vier", "uitspraak": "fier", "nl": "Vier", "status": "bron", "bron": "woordenlijst"},
    {"id": "vijf", "cat": "nummers", "icon": "5️⃣", "pap": "Fünf", "uitspraak": "fuunf", "nl": "Vijf", "status": "bron", "bron": "woordenlijst"},
    {"id": "zes", "cat": "nummers", "icon": "6️⃣", "pap": "Sechs", "uitspraak": "zeks", "nl": "Zes", "status": "bron", "bron": "woordenlijst"},
    {"id": "zeven", "cat": "nummers", "icon": "7️⃣", "pap": "Sieben", "uitspraak": "zie-ben", "nl": "Zeven", "status": "bron", "bron": "woordenlijst"},
    {"id": "acht", "cat": "nummers", "icon": "8️⃣", "pap": "Acht", "uitspraak": "acht", "nl": "Acht", "status": "bron", "bron": "woordenlijst"},
    {"id": "negen", "cat": "nummers", "icon": "9️⃣", "pap": "Neun", "uitspraak": "noin", "nl": "Negen", "status": "bron", "bron": "woordenlijst"},
    {"id": "tien", "cat": "nummers", "icon": "🔟", "pap": "Zehn", "uitspraak": "tseen", "nl": "Tien", "status": "bron", "bron": "woordenlijst"},

    {"id": "papa", "cat": "familie", "icon": "👨", "pap": "Papa", "uitspraak": "pa-pa", "nl": "Papa", "status": "bron", "bron": "woordenlijst"},
    {"id": "mama", "cat": "familie", "icon": "👩", "pap": "Mama", "uitspraak": "ma-ma", "nl": "Mama", "status": "bron", "bron": "woordenlijst"},
    {"id": "opa", "cat": "familie", "icon": "👴", "pap": "Opa", "uitspraak": "oo-pa", "nl": "Opa", "status": "bron", "bron": "woordenlijst"},
    {"id": "oma", "cat": "familie", "icon": "👵", "pap": "Oma", "uitspraak": "oo-ma", "nl": "Oma", "status": "bron", "bron": "woordenlijst"},
    {"id": "broer", "cat": "familie", "icon": "👦", "pap": "Bruder", "uitspraak": "broe-der", "nl": "Broer", "status": "bron", "bron": "woordenlijst"},
    {"id": "zus", "cat": "familie", "icon": "👧", "pap": "Schwester", "uitspraak": "sjves-ter", "nl": "Zus", "status": "bron", "bron": "woordenlijst"},
    {"id": "tante", "cat": "familie", "icon": "🧕", "pap": "Tante", "uitspraak": "tan-te", "nl": "Tante", "status": "bron", "bron": "woordenlijst"},
    {"id": "oom", "cat": "familie", "icon": "🧔", "pap": "Onkel", "uitspraak": "ong-kel", "nl": "Oom", "status": "bron", "bron": "woordenlijst"}
  ]
};
