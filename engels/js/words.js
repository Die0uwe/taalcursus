/* ============================================================
   Leer Engels - woordenlijst  (js/words.js)  v0.5.0
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
  "meta": {"versie": "0.5.0", "standaardDialect": "std", "taal": "Engels", "kampioen": "English-kampioen!", "opslag": "engels.v1", "ttsTalen": ["en"], "ttsFallback": "en-GB"},
  "dialecten": [ {"id": "std", "naam": "Engels", "vlag": "🇬🇧"} ],
  "categorieen": [
    {"id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink"},
    {"id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green"},
    {"id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow"},
    {"id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple"},
    {"id": "familie", "naam": "Familie", "sub": "Dad, Mum, Grandpa, Grandma...", "icon": "👨‍👩‍👧‍👦", "kleur": "red"}
  ],
  "woorden": [
    {"id": "zon", "cat": "basis", "icon": "☀️", "pap": "Sun", "uitspraak": "son", "nl": "Zon", "status": "bron", "bron": "woordenlijst"},
    {"id": "maan", "cat": "basis", "icon": "🌙", "pap": "Moon", "uitspraak": "moen", "nl": "Maan", "status": "bron", "bron": "woordenlijst"},
    {"id": "water", "cat": "basis", "icon": "💧", "pap": "Water", "uitspraak": "wo-ter", "nl": "Water", "status": "bron", "bron": "woordenlijst"},
    {"id": "vuur", "cat": "basis", "icon": "🔥", "pap": "Fire", "uitspraak": "faai-er", "nl": "Vuur", "status": "bron", "bron": "woordenlijst"},
    {"id": "huis", "cat": "basis", "icon": "🏠", "pap": "House", "uitspraak": "haus", "nl": "Huis", "status": "bron", "bron": "woordenlijst"},
    {"id": "goedemorgen", "cat": "basis", "icon": "👋", "pap": "Good morning", "uitspraak": "goed mor-ning", "nl": "Goedemorgen", "status": "bron", "bron": "woordenlijst"},
    {"id": "appel", "cat": "basis", "icon": "🍎", "pap": "Apple", "uitspraak": "e-pel", "nl": "Appel", "status": "bron", "bron": "woordenlijst"},
    {"id": "melk", "cat": "basis", "icon": "🥛", "pap": "Milk", "uitspraak": "milk", "nl": "Melk", "status": "bron", "bron": "woordenlijst"},

    {"id": "hond", "cat": "dieren", "icon": "🐕", "pap": "Dog", "uitspraak": "dog", "nl": "Hond", "status": "bron", "bron": "woordenlijst"},
    {"id": "kat", "cat": "dieren", "icon": "🐈", "pap": "Cat", "uitspraak": "ket", "nl": "Kat", "status": "bron", "bron": "woordenlijst"},
    {"id": "vogel", "cat": "dieren", "icon": "🐦", "pap": "Bird", "uitspraak": "berd", "nl": "Vogel", "status": "bron", "bron": "woordenlijst"},
    {"id": "vis", "cat": "dieren", "icon": "🐟", "pap": "Fish", "uitspraak": "fisj", "nl": "Vis", "status": "bron", "bron": "woordenlijst"},
    {"id": "geit", "cat": "dieren", "icon": "🐐", "pap": "Goat", "uitspraak": "goot", "nl": "Geit", "status": "bron", "bron": "woordenlijst"},
    {"id": "paard", "cat": "dieren", "icon": "🐴", "pap": "Horse", "uitspraak": "hors", "nl": "Paard", "status": "bron", "bron": "woordenlijst"},
    {"id": "koe", "cat": "dieren", "icon": "🐄", "pap": "Cow", "uitspraak": "kau", "nl": "Koe", "status": "bron", "bron": "woordenlijst"},
    {"id": "kip", "cat": "dieren", "icon": "🐔", "pap": "Chicken", "uitspraak": "tsjik-ken", "nl": "Kip", "status": "bron", "bron": "woordenlijst"},

    {"id": "rood", "cat": "kleuren", "icon": "🔴", "pap": "Red", "uitspraak": "red", "nl": "Rood", "status": "bron", "bron": "woordenlijst"},
    {"id": "blauw", "cat": "kleuren", "icon": "🔵", "pap": "Blue", "uitspraak": "bloe", "nl": "Blauw", "status": "bron", "bron": "woordenlijst"},
    {"id": "groen", "cat": "kleuren", "icon": "🟢", "pap": "Green", "uitspraak": "grien", "nl": "Groen", "status": "bron", "bron": "woordenlijst"},
    {"id": "geel", "cat": "kleuren", "icon": "🟡", "pap": "Yellow", "uitspraak": "je-lo", "nl": "Geel", "status": "bron", "bron": "woordenlijst"},
    {"id": "zwart", "cat": "kleuren", "icon": "⚫", "pap": "Black", "uitspraak": "blek", "nl": "Zwart", "status": "bron", "bron": "woordenlijst"},
    {"id": "wit", "cat": "kleuren", "icon": "⚪", "pap": "White", "uitspraak": "wait", "nl": "Wit", "status": "bron", "bron": "woordenlijst"},
    {"id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Orange", "uitspraak": "o-rindzj", "nl": "Oranje", "status": "bron", "bron": "woordenlijst"},
    {"id": "paars", "cat": "kleuren", "icon": "🟣", "pap": "Purple", "uitspraak": "per-pel", "nl": "Paars", "status": "bron", "bron": "woordenlijst"},

    {"id": "een", "cat": "nummers", "icon": "1️⃣", "pap": "One", "uitspraak": "wan", "nl": "Eén", "status": "bron", "bron": "woordenlijst"},
    {"id": "twee", "cat": "nummers", "icon": "2️⃣", "pap": "Two", "uitspraak": "toe", "nl": "Twee", "status": "bron", "bron": "woordenlijst"},
    {"id": "drie", "cat": "nummers", "icon": "3️⃣", "pap": "Three", "uitspraak": "thrie", "nl": "Drie", "status": "bron", "bron": "woordenlijst"},
    {"id": "vier", "cat": "nummers", "icon": "4️⃣", "pap": "Four", "uitspraak": "for", "nl": "Vier", "status": "bron", "bron": "woordenlijst"},
    {"id": "vijf", "cat": "nummers", "icon": "5️⃣", "pap": "Five", "uitspraak": "faiv", "nl": "Vijf", "status": "bron", "bron": "woordenlijst"},
    {"id": "zes", "cat": "nummers", "icon": "6️⃣", "pap": "Six", "uitspraak": "siks", "nl": "Zes", "status": "bron", "bron": "woordenlijst"},
    {"id": "zeven", "cat": "nummers", "icon": "7️⃣", "pap": "Seven", "uitspraak": "se-ven", "nl": "Zeven", "status": "bron", "bron": "woordenlijst"},
    {"id": "acht", "cat": "nummers", "icon": "8️⃣", "pap": "Eight", "uitspraak": "eit", "nl": "Acht", "status": "bron", "bron": "woordenlijst"},
    {"id": "negen", "cat": "nummers", "icon": "9️⃣", "pap": "Nine", "uitspraak": "nain", "nl": "Negen", "status": "bron", "bron": "woordenlijst"},
    {"id": "tien", "cat": "nummers", "icon": "🔟", "pap": "Ten", "uitspraak": "ten", "nl": "Tien", "status": "bron", "bron": "woordenlijst"},

    {"id": "papa", "cat": "familie", "icon": "👨", "pap": "Dad", "uitspraak": "ded", "nl": "Papa", "status": "bron", "bron": "woordenlijst"},
    {"id": "mama", "cat": "familie", "icon": "👩", "pap": "Mum", "uitspraak": "mom", "nl": "Mama", "status": "bron", "bron": "woordenlijst"},
    {"id": "opa", "cat": "familie", "icon": "👴", "pap": "Grandpa", "uitspraak": "grend-pa", "nl": "Opa", "status": "bron", "bron": "woordenlijst"},
    {"id": "oma", "cat": "familie", "icon": "👵", "pap": "Grandma", "uitspraak": "grend-ma", "nl": "Oma", "status": "bron", "bron": "woordenlijst"},
    {"id": "broer", "cat": "familie", "icon": "👦", "pap": "Brother", "uitspraak": "bro-der", "nl": "Broer", "status": "bron", "bron": "woordenlijst"},
    {"id": "zus", "cat": "familie", "icon": "👧", "pap": "Sister", "uitspraak": "sis-ter", "nl": "Zus", "status": "bron", "bron": "woordenlijst"},
    {"id": "tante", "cat": "familie", "icon": "🧕", "pap": "Aunt", "uitspraak": "aant", "nl": "Tante", "status": "bron", "bron": "woordenlijst"},
    {"id": "oom", "cat": "familie", "icon": "🧔", "pap": "Uncle", "uitspraak": "ong-kel", "nl": "Oom", "status": "bron", "bron": "woordenlijst"}
  ]
};
