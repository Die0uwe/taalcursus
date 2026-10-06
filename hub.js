/* ============================================================
   Taalcursus - hoofdpagina  (hub.js)  v0.1.0
   Created by DieOuwe · www.dieouwe.nl
   Bouwt de taalkaarten uit cursussen.js. Per beschikbare cursus lezen we de voortgang
   (sterren en geleerde woorden) uit localStorage. Dat mag mislukken: dan zie je gewoon "Begin met leren".
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('taalGrid');

  function maak(tag, klasse, tekst) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (tekst !== undefined) e.textContent = tekst;
    return e;
  }

  // { sterren, woorden } of null als er nog niets is bewaard
  function voortgang(c) {
    if (!c.opslag) return null;
    try {
      var raw = window.localStorage.getItem(c.opslag);
      if (!raw) return null;
      var p = JSON.parse(raw);
      var sterren = typeof p.stars === 'number' ? p.stars : 0;
      var woorden = p.seen && typeof p.seen === 'object' ? Object.keys(p.seen).length : 0;
      return (sterren || woorden) ? { sterren: sterren, woorden: woorden } : null;
    } catch (e) { return null; }
  }

  function kaart(c) {
    var klaar = c.status === 'beschikbaar';
    var a = maak('a', 'taal-card' + (klaar ? '' : ' soon'));
    a.href = c.id + '/index.html';          // met index.html, zodat het ook werkt zonder webserver
    a.setAttribute('data-color', c.kleur);
    a.setAttribute('data-cursus', c.id);

    a.appendChild(maak('span', 'vlag', c.vlag));
    var tekst = maak('span', 'taal-tekst');
    tekst.appendChild(maak('h2', '', c.naam));
    tekst.appendChild(maak('span', 'eigen', c.eigen));
    tekst.appendChild(maak('span', 'sub', c.sub));
    a.appendChild(tekst);

    var voet = maak('span', 'taal-voet');
    if (!klaar) {
      voet.appendChild(maak('span', 'badge-soon', 'Binnenkort'));
    } else {
      var v = voortgang(c);
      if (v) {
        voet.appendChild(maak('span', 'stat', '⭐ ' + v.sterren));
        voet.appendChild(maak('span', 'stat', '📖 ' + v.woorden + (v.woorden === 1 ? ' woord' : ' woorden')));
      } else {
        voet.appendChild(maak('span', 'badge-go', 'Begin met leren ▶'));
      }
    }
    a.appendChild(voet);
    return a;
  }

  var totaal = 0;
  (window.CURSUSSEN || []).forEach(function (c) {
    grid.appendChild(kaart(c));
    var v = c.status === 'beschikbaar' ? voortgang(c) : null;
    if (v) totaal += v.sterren;
  });

  if (totaal > 0) {
    document.getElementById('totaalCount').textContent = totaal;
    document.getElementById('totaalSterren').hidden = false;
  }
})();
