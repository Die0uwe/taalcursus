/* ============================================================
   Leer Spaans - woordenlijst  (js/words.js)  v0.10.1
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
  "meta": {"versie": "0.10.1", "standaardDialect": "std", "taal": "Spaans", "kampioen": "Español-kampioen!", "opslag": "spaans.v1", "ttsTalen": ["es"], "ttsFallback": "es-ES"},
  "dialecten": [ {"id": "std", "naam": "Spaans", "vlag": "🇪🇸"} ],
  "categorieen": [
    {"id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink"},
    {"id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green"},
    {"id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow"},
    {"id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple"},
    {"id": "familie", "naam": "Familie", "sub": "Papá, Mamá, Abuelo, Abuela...", "icon": "👨‍👩‍👧‍👦", "kleur": "red"}
  ],
  "woorden": [
    {"id": "zon", "cat": "basis", "icon": "☀️", "pap": "Sol", "uitspraak": "sol", "nl": "Zon", "status": "bron", "bron": "woordenlijst"},
    {"id": "maan", "cat": "basis", "icon": "🌙", "pap": "Luna", "uitspraak": "loe-na", "nl": "Maan", "status": "bron", "bron": "woordenlijst"},
    {"id": "water", "cat": "basis", "icon": "💧", "pap": "Agua", "uitspraak": "a-gwa", "nl": "Water", "status": "bron", "bron": "woordenlijst"},
    {"id": "vuur", "cat": "basis", "icon": "🔥", "pap": "Fuego", "uitspraak": "fwe-go", "nl": "Vuur", "status": "bron", "bron": "woordenlijst"},
    {"id": "huis", "cat": "basis", "icon": "🏠", "pap": "Casa", "uitspraak": "ka-sa", "nl": "Huis", "status": "bron", "bron": "woordenlijst"},
    {"id": "goedemorgen", "cat": "basis", "icon": "👋", "pap": "Buenos días", "uitspraak": "bwe-nos die-as", "nl": "Goedemorgen", "status": "bron", "bron": "woordenlijst"},
    {"id": "appel", "cat": "basis", "icon": "🍎", "pap": "Manzana", "uitspraak": "man-sa-na", "nl": "Appel", "status": "bron", "bron": "woordenlijst"},
    {"id": "melk", "cat": "basis", "icon": "🥛", "pap": "Leche", "uitspraak": "le-tsje", "nl": "Melk", "status": "bron", "bron": "woordenlijst"},

    {"id": "hond", "cat": "dieren", "icon": "🐕", "pap": "Perro", "uitspraak": "pe-ro", "nl": "Hond", "status": "bron", "bron": "woordenlijst"},
    {"id": "kat", "cat": "dieren", "icon": "🐈", "pap": "Gato", "uitspraak": "ga-to", "nl": "Kat", "status": "bron", "bron": "woordenlijst"},
    {"id": "vogel", "cat": "dieren", "icon": "🐦", "pap": "Pájaro", "uitspraak": "pa-ha-ro", "nl": "Vogel", "status": "bron", "bron": "woordenlijst"},
    {"id": "vis", "cat": "dieren", "icon": "🐟", "pap": "Pez", "uitspraak": "pes", "nl": "Vis", "status": "bron", "bron": "woordenlijst"},
    {"id": "geit", "cat": "dieren", "icon": "🐐", "pap": "Cabra", "uitspraak": "ka-bra", "nl": "Geit", "status": "bron", "bron": "woordenlijst"},
    {"id": "paard", "cat": "dieren", "icon": "🐴", "pap": "Caballo", "uitspraak": "ka-ba-jo", "nl": "Paard", "status": "bron", "bron": "woordenlijst"},
    {"id": "koe", "cat": "dieren", "icon": "🐄", "pap": "Vaca", "uitspraak": "ba-ka", "nl": "Koe", "status": "bron", "bron": "woordenlijst"},
    {"id": "kip", "cat": "dieren", "icon": "🐔", "pap": "Gallina", "uitspraak": "ga-jie-na", "nl": "Kip", "status": "bron", "bron": "woordenlijst"},

    {"id": "rood", "cat": "kleuren", "icon": "🔴", "pap": "Rojo", "uitspraak": "ro-ho", "nl": "Rood", "status": "bron", "bron": "woordenlijst"},
    {"id": "blauw", "cat": "kleuren", "icon": "🔵", "pap": "Azul", "uitspraak": "a-soel", "nl": "Blauw", "status": "bron", "bron": "woordenlijst"},
    {"id": "groen", "cat": "kleuren", "icon": "🟢", "pap": "Verde", "uitspraak": "ber-de", "nl": "Groen", "status": "bron", "bron": "woordenlijst"},
    {"id": "geel", "cat": "kleuren", "icon": "🟡", "pap": "Amarillo", "uitspraak": "a-ma-rie-jo", "nl": "Geel", "status": "bron", "bron": "woordenlijst"},
    {"id": "zwart", "cat": "kleuren", "icon": "⚫", "pap": "Negro", "uitspraak": "ne-gro", "nl": "Zwart", "status": "bron", "bron": "woordenlijst"},
    {"id": "wit", "cat": "kleuren", "icon": "⚪", "pap": "Blanco", "uitspraak": "blan-ko", "nl": "Wit", "status": "bron", "bron": "woordenlijst"},
    {"id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Naranja", "uitspraak": "na-ran-ha", "nl": "Oranje", "status": "bron", "bron": "woordenlijst"},
    {"id": "paars", "cat": "kleuren", "icon": "🟣", "pap": "Morado", "uitspraak": "mo-ra-do", "nl": "Paars", "status": "bron", "bron": "woordenlijst"},

    {"id": "een", "cat": "nummers", "icon": "1️⃣", "pap": "Uno", "uitspraak": "oe-no", "nl": "Eén", "status": "bron", "bron": "woordenlijst"},
    {"id": "twee", "cat": "nummers", "icon": "2️⃣", "pap": "Dos", "uitspraak": "dos", "nl": "Twee", "status": "bron", "bron": "woordenlijst"},
    {"id": "drie", "cat": "nummers", "icon": "3️⃣", "pap": "Tres", "uitspraak": "tres", "nl": "Drie", "status": "bron", "bron": "woordenlijst"},
    {"id": "vier", "cat": "nummers", "icon": "4️⃣", "pap": "Cuatro", "uitspraak": "kwa-tro", "nl": "Vier", "status": "bron", "bron": "woordenlijst"},
    {"id": "vijf", "cat": "nummers", "icon": "5️⃣", "pap": "Cinco", "uitspraak": "sin-ko", "nl": "Vijf", "status": "bron", "bron": "woordenlijst"},
    {"id": "zes", "cat": "nummers", "icon": "6️⃣", "pap": "Seis", "uitspraak": "seis", "nl": "Zes", "status": "bron", "bron": "woordenlijst"},
    {"id": "zeven", "cat": "nummers", "icon": "7️⃣", "pap": "Siete", "uitspraak": "sje-te", "nl": "Zeven", "status": "bron", "bron": "woordenlijst"},
    {"id": "acht", "cat": "nummers", "icon": "8️⃣", "pap": "Ocho", "uitspraak": "o-tsjo", "nl": "Acht", "status": "bron", "bron": "woordenlijst"},
    {"id": "negen", "cat": "nummers", "icon": "9️⃣", "pap": "Nueve", "uitspraak": "nwe-be", "nl": "Negen", "status": "bron", "bron": "woordenlijst"},
    {"id": "tien", "cat": "nummers", "icon": "🔟", "pap": "Diez", "uitspraak": "djes", "nl": "Tien", "status": "bron", "bron": "woordenlijst"},

    {"id": "papa", "cat": "familie", "icon": "👨", "pap": "Papá", "uitspraak": "pa-pa", "nl": "Papa", "status": "bron", "bron": "woordenlijst"},
    {"id": "mama", "cat": "familie", "icon": "👩", "pap": "Mamá", "uitspraak": "ma-ma", "nl": "Mama", "status": "bron", "bron": "woordenlijst"},
    {"id": "opa", "cat": "familie", "icon": "👴", "pap": "Abuelo", "uitspraak": "a-bwe-lo", "nl": "Opa", "status": "bron", "bron": "woordenlijst"},
    {"id": "oma", "cat": "familie", "icon": "👵", "pap": "Abuela", "uitspraak": "a-bwe-la", "nl": "Oma", "status": "bron", "bron": "woordenlijst"},
    {"id": "broer", "cat": "familie", "icon": "👦", "pap": "Hermano", "uitspraak": "er-ma-no", "nl": "Broer", "status": "bron", "bron": "woordenlijst"},
    {"id": "zus", "cat": "familie", "icon": "👧", "pap": "Hermana", "uitspraak": "er-ma-na", "nl": "Zus", "status": "bron", "bron": "woordenlijst"},
    {"id": "tante", "cat": "familie", "icon": "🧕", "pap": "Tía", "uitspraak": "tie-a", "nl": "Tante", "status": "bron", "bron": "woordenlijst"},
    {"id": "oom", "cat": "familie", "icon": "🧔", "pap": "Tío", "uitspraak": "tie-o", "nl": "Oom", "status": "bron", "bron": "woordenlijst"}
  ]
};
