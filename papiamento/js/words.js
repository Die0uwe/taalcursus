/* ============================================================
   Aprende Papiamentu - woordenlijst  (js/words.js)  v0.4.0
   Created by DieOuwe · www.dieouwe.nl
   Dialect-hoofdlijn: Curacao (cw). Aruba (aw) en Bonaire (bn) via "dialect".
   meta: taal (naam), kampioen (naam van de laatste badge), opslag (localStorage-sleutel, uniek per cursus),
         ttsTalen (taalcodes van de browserstem, in voorkeursvolgorde), ttsFallback (taalcode als er geen stem is gekozen).
   Het veld "pap" is in elke cursus het woord in de DOELTAAL (de naam is historisch).
   Met 1 dialect (zoals bij Engels) verdwijnt de dialectbalk vanzelf.
   LET OP: dit bestand bevat STRIKTE JSON na "window.PAP_DATA =".
   tools/maak_audio.py leest dit bestand ook. Dus: dubbele quotes,
   geen commentaar binnen het object, geen komma na het laatste item.

   status : "bron"  = woord gevonden in een bron (zie bron-code)
            "check" = nog te controleren door een Papiamentu-sprekende
   bron   : swadesh = Swadesh-100 Papiamentu (Jacobs, MPI-EVA)
            dbnl1930 = Woordenlijst Nederlandsch-Papiamentu (1930, DBNL)
            cw-pdf   = Curacao Twinning Challenge (Girl Guides Canada)
            wiki-ak  = Academic Kids, Papiamento-artikel
   uitspraak: gids voor Nederlandstalige kinderen (indicatief)
   dialect : per dialect (cw/aw/bn) overschrijfbare velden: pap, uitspraak
   ============================================================ */
window.PAP_DATA = {
  "meta": { "versie": "0.5.0", "standaardDialect": "cw", "taal": "Papiamentu", "kampioen": "Papiamentu-kampioen!", "opslag": "papiweb.v1", "ttsTalen": ["es", "pt"], "ttsFallback": "es-ES" },
  "dialecten": [
    { "id": "cw", "naam": "Curaçao", "vlag": "🇨🇼" },
    { "id": "aw", "naam": "Aruba", "vlag": "🇦🇼" },
    { "id": "bn", "naam": "Bonaire", "vlag": "🇧🇶" }
  ],
  "categorieen": [
    { "id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink" },
    { "id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green" },
    { "id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow" },
    { "id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple" },
    { "id": "familie", "naam": "Familie", "sub": "Papa, mama, welo, wela...", "icon": "👨‍👩‍👧‍👦", "kleur": "red" }
  ],
  "woorden": [
    { "id": "solo", "cat": "basis", "icon": "☀️", "pap": "Solo", "uitspraak": "so-lo", "nl": "Zon", "status": "bron", "bron": "swadesh" },
    { "id": "luna", "cat": "basis", "icon": "🌙", "pap": "Luna", "uitspraak": "loe-na", "nl": "Maan", "status": "bron", "bron": "swadesh" },
    { "id": "awa", "cat": "basis", "icon": "💧", "pap": "Awa", "uitspraak": "a-wa", "nl": "Water", "status": "bron", "bron": "swadesh" },
    { "id": "kandela", "cat": "basis", "icon": "🔥", "pap": "Kandela", "uitspraak": "kan-de-la", "nl": "Vuur", "status": "bron", "bron": "swadesh" },
    { "id": "kas", "cat": "basis", "icon": "🏠", "pap": "Kas", "uitspraak": "kas", "nl": "Huis", "status": "bron", "bron": "wiki-ak",
      "dialect": { "aw": { "pap": "Cas" } } },
    { "id": "bondia", "cat": "basis", "icon": "👋", "pap": "Bon dia", "uitspraak": "bon die-a", "nl": "Goedemorgen", "status": "check" },
    { "id": "apel", "cat": "basis", "icon": "🍎", "pap": "Apel", "uitspraak": "a-pel", "nl": "Appel", "status": "check" },
    { "id": "lechi", "cat": "basis", "icon": "🥛", "pap": "Lechi", "uitspraak": "le-tsji", "nl": "Melk", "status": "check" },

    { "id": "kacho", "cat": "dieren", "icon": "🐕", "pap": "Kachó", "uitspraak": "ka-tsjo", "nl": "Hond", "status": "bron", "bron": "swadesh" },
    { "id": "pushi", "cat": "dieren", "icon": "🐈", "pap": "Pushi", "uitspraak": "poe-sji", "nl": "Kat", "status": "bron", "bron": "cw-pdf" },
    { "id": "paha", "cat": "dieren", "icon": "🐦", "pap": "Paha", "uitspraak": "pa-ha", "nl": "Vogel", "status": "bron", "bron": "swadesh" },
    { "id": "piska", "cat": "dieren", "icon": "🐟", "pap": "Piská", "uitspraak": "pis-ka", "nl": "Vis", "status": "bron", "bron": "swadesh" },
    { "id": "kabritu", "cat": "dieren", "icon": "🐐", "pap": "Kabritu", "uitspraak": "ka-brie-toe", "nl": "Geit", "status": "bron", "bron": "cw-pdf" },
    { "id": "kabai", "cat": "dieren", "icon": "🐴", "pap": "Kabai", "uitspraak": "ka-bai", "nl": "Paard", "status": "check" },
    { "id": "baka", "cat": "dieren", "icon": "🐄", "pap": "Baka", "uitspraak": "ba-ka", "nl": "Koe", "status": "check" },
    { "id": "galina", "cat": "dieren", "icon": "🐔", "pap": "Galiña", "uitspraak": "ga-lie-nja", "nl": "Kip", "status": "bron", "bron": "cw-pdf" },

    { "id": "kora", "cat": "kleuren", "icon": "🔴", "pap": "Kòrá", "uitspraak": "ko-ra", "nl": "Rood", "status": "check" },
    { "id": "blou", "cat": "kleuren", "icon": "🔵", "pap": "Blou", "uitspraak": "blau", "nl": "Blauw", "status": "check" },
    { "id": "berde", "cat": "kleuren", "icon": "🟢", "pap": "Bèrdè", "uitspraak": "bèr-dè", "nl": "Groen", "status": "bron", "bron": "swadesh" },
    { "id": "hel", "cat": "kleuren", "icon": "🟡", "pap": "Hel", "uitspraak": "hel", "nl": "Geel", "status": "bron", "bron": "swadesh" },
    { "id": "pretu", "cat": "kleuren", "icon": "⚫", "pap": "Pretu", "uitspraak": "pre-toe", "nl": "Zwart", "status": "bron", "bron": "swadesh" },
    { "id": "blanku", "cat": "kleuren", "icon": "⚪", "pap": "Blanku", "uitspraak": "blan-koe", "nl": "Wit", "status": "bron", "bron": "swadesh" },
    { "id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Oranje", "uitspraak": "o-ran-je", "nl": "Oranje", "status": "check" },
    { "id": "lila", "cat": "kleuren", "icon": "🟣", "pap": "Lila", "uitspraak": "lie-la", "nl": "Paars", "status": "check" },

    { "id": "un", "cat": "nummers", "icon": "1️⃣", "pap": "Un", "uitspraak": "oen", "nl": "Eén", "status": "bron", "bron": "swadesh" },
    { "id": "dos", "cat": "nummers", "icon": "2️⃣", "pap": "Dos", "uitspraak": "dos", "nl": "Twee", "status": "bron", "bron": "swadesh" },
    { "id": "tres", "cat": "nummers", "icon": "3️⃣", "pap": "Tres", "uitspraak": "tres", "nl": "Drie", "status": "check" },
    { "id": "kuater", "cat": "nummers", "icon": "4️⃣", "pap": "Kuater", "uitspraak": "kwa-ter", "nl": "Vier", "status": "check" },
    { "id": "sinku", "cat": "nummers", "icon": "5️⃣", "pap": "Sinku", "uitspraak": "sin-koe", "nl": "Vijf", "status": "check" },
    { "id": "seis", "cat": "nummers", "icon": "6️⃣", "pap": "Seis", "uitspraak": "seis", "nl": "Zes", "status": "check" },
    { "id": "shete", "cat": "nummers", "icon": "7️⃣", "pap": "Shete", "uitspraak": "sje-te", "nl": "Zeven", "status": "check" },
    { "id": "ocho", "cat": "nummers", "icon": "8️⃣", "pap": "Ocho", "uitspraak": "o-tsjo", "nl": "Acht", "status": "bron", "bron": "wiki-ak" },
    { "id": "nuebe", "cat": "nummers", "icon": "9️⃣", "pap": "Nuebe", "uitspraak": "nwe-be", "nl": "Negen", "status": "check" },
    { "id": "dies", "cat": "nummers", "icon": "🔟", "pap": "Dies", "uitspraak": "dies", "nl": "Tien", "status": "check" },

    { "id": "papa", "cat": "familie", "icon": "👨", "pap": "Papa", "uitspraak": "pa-pa", "nl": "Papa", "status": "bron", "bron": "wiki-ak" },
    { "id": "mama", "cat": "familie", "icon": "👩", "pap": "Mama", "uitspraak": "ma-ma", "nl": "Mama", "status": "bron", "bron": "wiki-ak" },
    { "id": "welo", "cat": "familie", "icon": "👴", "pap": "Welo", "uitspraak": "we-lo", "nl": "Opa", "status": "bron", "bron": "wiki-ak" },
    { "id": "wela", "cat": "familie", "icon": "👵", "pap": "Wela", "uitspraak": "we-la", "nl": "Oma", "status": "bron", "bron": "dbnl1930" },
    { "id": "rumanhomber", "cat": "familie", "icon": "👦", "pap": "Ruman homber", "uitspraak": "roe-man hom-ber", "nl": "Broer", "status": "bron", "bron": "dbnl1930" },
    { "id": "rumanmuhe", "cat": "familie", "icon": "👧", "pap": "Ruman muhé", "uitspraak": "roe-man moe-hè", "nl": "Zus", "status": "bron", "bron": "dbnl1930" },
    { "id": "tanta", "cat": "familie", "icon": "🧕", "pap": "Tanta", "uitspraak": "tan-ta", "nl": "Tante", "status": "bron", "bron": "dbnl1930" },
    { "id": "tio", "cat": "familie", "icon": "🧔", "pap": "Tio", "uitspraak": "tie-o", "nl": "Oom", "status": "bron", "bron": "wiki-ak" }
  ]
};
