/* ============================================================
   Taalcursus - onderhoudspagina  (onderhoud.js)  v0.2.0
   Created by DieOuwe · www.dieouwe.nl
   Verbergt het meisje-plaatje als het bestand ontbreekt (zodat er geen kapot plaatje met tekst "Meisje" staat).
   De rest (zon, ballonnen, vlaggetjes) doet sfeer.js.
   ============================================================ */
(function () {
  'use strict';
  var plaatje = document.querySelector('.girl');
  if (!plaatje) return;
  function weg() { plaatje.hidden = true; }
  plaatje.addEventListener('error', weg);
  if (plaatje.complete && plaatje.naturalWidth === 0) weg();
})();
