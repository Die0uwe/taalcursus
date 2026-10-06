/* ============================================================
   Leer Oekraïens - woordenlijst  (js/words.js)  v0.5.0
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
  "meta": {"versie": "0.5.0", "standaardDialect": "std", "taal": "Oekraïens", "kampioen": "Oekraïens-kampioen!", "opslag": "oekraiens.v1", "ttsTalen": ["uk"], "ttsFallback": "uk-UA"},
  "dialecten": [ {"id": "std", "naam": "Oekraïens", "vlag": "🇺🇦"} ],
  "categorieen": [
    {"id": "basis", "naam": "Basiswoorden", "sub": "Kijk & luister", "icon": "📚", "kleur": "pink"},
    {"id": "dieren", "naam": "Dieren", "sub": "Leer de dieren", "icon": "🐾", "kleur": "green"},
    {"id": "kleuren", "naam": "Kleuren", "sub": "Kleurige woorden", "icon": "🎨", "kleur": "yellow"},
    {"id": "nummers", "naam": "Nummers", "sub": "Tel mee tot 10", "icon": "🔢", "kleur": "purple"},
    {"id": "familie", "naam": "Familie", "sub": "Тато, Мама, Дідусь, Бабуся...", "icon": "👨‍👩‍👧‍👦", "kleur": "red"}
  ],
  "woorden": [
    {"id": "zon", "cat": "basis", "icon": "☀️", "pap": "Сонце", "uitspraak": "son-tse", "nl": "Zon", "status": "check"},
    {"id": "maan", "cat": "basis", "icon": "🌙", "pap": "Місяць", "uitspraak": "mie-sjats", "nl": "Maan", "status": "check"},
    {"id": "water", "cat": "basis", "icon": "💧", "pap": "Вода", "uitspraak": "vo-da", "nl": "Water", "status": "check"},
    {"id": "vuur", "cat": "basis", "icon": "🔥", "pap": "Вогонь", "uitspraak": "vo-gon", "nl": "Vuur", "status": "check"},
    {"id": "huis", "cat": "basis", "icon": "🏠", "pap": "Будинок", "uitspraak": "boe-die-nok", "nl": "Huis", "status": "check"},
    {"id": "goedemorgen", "cat": "basis", "icon": "👋", "pap": "Доброго ранку", "uitspraak": "do-bro-go ran-koe", "nl": "Goedemorgen", "status": "check"},
    {"id": "appel", "cat": "basis", "icon": "🍎", "pap": "Яблуко", "uitspraak": "jab-loe-ko", "nl": "Appel", "status": "check"},
    {"id": "melk", "cat": "basis", "icon": "🥛", "pap": "Молоко", "uitspraak": "mo-lo-ko", "nl": "Melk", "status": "check"},

    {"id": "hond", "cat": "dieren", "icon": "🐕", "pap": "Собака", "uitspraak": "so-ba-ka", "nl": "Hond", "status": "check"},
    {"id": "kat", "cat": "dieren", "icon": "🐈", "pap": "Кіт", "uitspraak": "kiet", "nl": "Kat", "status": "check"},
    {"id": "vogel", "cat": "dieren", "icon": "🐦", "pap": "Птах", "uitspraak": "ptach", "nl": "Vogel", "status": "check"},
    {"id": "vis", "cat": "dieren", "icon": "🐟", "pap": "Риба", "uitspraak": "rie-ba", "nl": "Vis", "status": "check"},
    {"id": "geit", "cat": "dieren", "icon": "🐐", "pap": "Коза", "uitspraak": "ko-za", "nl": "Geit", "status": "check"},
    {"id": "paard", "cat": "dieren", "icon": "🐴", "pap": "Кінь", "uitspraak": "kien", "nl": "Paard", "status": "check"},
    {"id": "koe", "cat": "dieren", "icon": "🐄", "pap": "Корова", "uitspraak": "ko-ro-va", "nl": "Koe", "status": "check"},
    {"id": "kip", "cat": "dieren", "icon": "🐔", "pap": "Курка", "uitspraak": "koer-ka", "nl": "Kip", "status": "check"},

    {"id": "rood", "cat": "kleuren", "icon": "🔴", "pap": "Червоний", "uitspraak": "tsjer-vo-nie", "nl": "Rood", "status": "check"},
    {"id": "blauw", "cat": "kleuren", "icon": "🔵", "pap": "Синій", "uitspraak": "sie-nie", "nl": "Blauw", "status": "check"},
    {"id": "groen", "cat": "kleuren", "icon": "🟢", "pap": "Зелений", "uitspraak": "ze-le-nie", "nl": "Groen", "status": "check"},
    {"id": "geel", "cat": "kleuren", "icon": "🟡", "pap": "Жовтий", "uitspraak": "zjov-tie", "nl": "Geel", "status": "check"},
    {"id": "zwart", "cat": "kleuren", "icon": "⚫", "pap": "Чорний", "uitspraak": "tsjor-nie", "nl": "Zwart", "status": "check"},
    {"id": "wit", "cat": "kleuren", "icon": "⚪", "pap": "Білий", "uitspraak": "bie-lie", "nl": "Wit", "status": "check"},
    {"id": "oranje", "cat": "kleuren", "icon": "🟠", "pap": "Помаранчевий", "uitspraak": "po-ma-ran-tsje-vie", "nl": "Oranje", "status": "check"},
    {"id": "paars", "cat": "kleuren", "icon": "🟣", "pap": "Фіолетовий", "uitspraak": "fie-o-le-to-vie", "nl": "Paars", "status": "check"},

    {"id": "een", "cat": "nummers", "icon": "1️⃣", "pap": "Один", "uitspraak": "o-dien", "nl": "Eén", "status": "check"},
    {"id": "twee", "cat": "nummers", "icon": "2️⃣", "pap": "Два", "uitspraak": "dva", "nl": "Twee", "status": "check"},
    {"id": "drie", "cat": "nummers", "icon": "3️⃣", "pap": "Три", "uitspraak": "trie", "nl": "Drie", "status": "check"},
    {"id": "vier", "cat": "nummers", "icon": "4️⃣", "pap": "Чотири", "uitspraak": "tsjo-tie-rie", "nl": "Vier", "status": "check"},
    {"id": "vijf", "cat": "nummers", "icon": "5️⃣", "pap": "П'ять", "uitspraak": "pjat", "nl": "Vijf", "status": "check"},
    {"id": "zes", "cat": "nummers", "icon": "6️⃣", "pap": "Шість", "uitspraak": "sjiest", "nl": "Zes", "status": "check"},
    {"id": "zeven", "cat": "nummers", "icon": "7️⃣", "pap": "Сім", "uitspraak": "siem", "nl": "Zeven", "status": "check"},
    {"id": "acht", "cat": "nummers", "icon": "8️⃣", "pap": "Вісім", "uitspraak": "vie-siem", "nl": "Acht", "status": "check"},
    {"id": "negen", "cat": "nummers", "icon": "9️⃣", "pap": "Дев'ять", "uitspraak": "de-vjat", "nl": "Negen", "status": "check"},
    {"id": "tien", "cat": "nummers", "icon": "🔟", "pap": "Десять", "uitspraak": "de-sjat", "nl": "Tien", "status": "check"},

    {"id": "papa", "cat": "familie", "icon": "👨", "pap": "Тато", "uitspraak": "ta-to", "nl": "Papa", "status": "check"},
    {"id": "mama", "cat": "familie", "icon": "👩", "pap": "Мама", "uitspraak": "ma-ma", "nl": "Mama", "status": "check"},
    {"id": "opa", "cat": "familie", "icon": "👴", "pap": "Дідусь", "uitspraak": "die-does", "nl": "Opa", "status": "check"},
    {"id": "oma", "cat": "familie", "icon": "👵", "pap": "Бабуся", "uitspraak": "ba-boe-sja", "nl": "Oma", "status": "check"},
    {"id": "broer", "cat": "familie", "icon": "👦", "pap": "Брат", "uitspraak": "brat", "nl": "Broer", "status": "check"},
    {"id": "zus", "cat": "familie", "icon": "👧", "pap": "Сестра", "uitspraak": "ses-tra", "nl": "Zus", "status": "check"},
    {"id": "tante", "cat": "familie", "icon": "🧕", "pap": "Тітка", "uitspraak": "tiet-ka", "nl": "Tante", "status": "check"},
    {"id": "oom", "cat": "familie", "icon": "🧔", "pap": "Дядько", "uitspraak": "djad-ko", "nl": "Oom", "status": "check"}
  ]
};
