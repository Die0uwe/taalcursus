/* ============================================================
   Taalcursus - lijst met cursussen  (cursussen.js)  v0.2.0
   Created by DieOuwe · www.dieouwe.nl
   De hoofdpagina (index.html) bouwt de taalkaarten uit deze lijst.
   Een nieuwe cursus erbij = één blok toevoegen (zie docs/NIEUWE-CURSUS.md).

   id       naam van de map (kleine letters, geen spaties)
   naam     naam van de taal zoals de kaart hem toont
   eigen    naam in die taal zelf
   sub      kleine regel onder de naam
   vlag     emoji
   kleur    pink | green | yellow | purple | red | blue | orange
   status   "beschikbaar" of "binnenkort"
   opslag   sleutel waarmee de cursus zijn voortgang in localStorage bewaart
            (de kaart leest daar sterren en geleerde woorden uit; alleen nodig bij "beschikbaar")
   ============================================================ */
window.CURSUSSEN = [
  { id: "papiamento", naam: "Papiamentu", eigen: "Papiamento", sub: "Curaçao, Aruba en Bonaire", vlag: "🇨🇼", kleur: "pink",   status: "beschikbaar", opslag: "papiweb.v1" },
  { id: "engels",     naam: "Engels",     eigen: "English",    sub: "De wereldtaal",             vlag: "🇬🇧", kleur: "blue",   status: "beschikbaar", opslag: "engels.v1" },
  { id: "spaans",     naam: "Spaans",     eigen: "Español",    sub: "Spanje en Latijns-Amerika", vlag: "🇪🇸", kleur: "yellow", status: "beschikbaar", opslag: "spaans.v1" },
  { id: "duits",      naam: "Duits",      eigen: "Deutsch",    sub: "Duitsland, Oostenrijk, Zwitserland", vlag: "🇩🇪", kleur: "orange", status: "beschikbaar", opslag: "duits.v1" },
  { id: "frans",      naam: "Frans",      eigen: "Français",   sub: "Frankrijk en ver daarbuiten", vlag: "🇫🇷", kleur: "purple", status: "beschikbaar", opslag: "frans.v1" },
  { id: "oekraiens",  naam: "Oekraïens",  eigen: "Українська", sub: "Oekraïne",                  vlag: "🇺🇦", kleur: "green",  status: "beschikbaar", opslag: "oekraiens.v1" }
];
