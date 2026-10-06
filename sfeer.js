/* ============================================================
   Taalcursus - sfeer  (sfeer.js)  v0.1.0
   Created by DieOuwe · www.dieouwe.nl
   Maakt zon, wolken, ballonnen, sterretjes en opduikende vlaggetjes (stijl: sfeer.css).
   <body data-sfeer="vol"> voegt ook de politie- en brandweerauto toe (onderhoudspagina).
   Alleen versiering: geen klik, geen tekst die ertoe doet, en stil bij "minder beweging".
   ============================================================ */
(function () {
  'use strict';

  var body = document.body;
  var vol = body.getAttribute('data-sfeer') === 'vol';
  var stil = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function maak(klasse, tekst) {
    var e = document.createElement('div');
    e.className = klasse;
    if (tekst) e.textContent = tekst;
    e.setAttribute('aria-hidden', 'true');
    body.appendChild(e);
    return e;
  }

  var zon = maak('sun');
  ['eye left', 'eye right', 'mouth'].forEach(function (k) {
    var d = document.createElement('div'); d.className = k; zon.appendChild(d);
  });
  maak('cloud cloud1'); maak('cloud cloud2'); maak('cloud cloud3');
  if (stil) return;

  var kleuren = ['#ff5252', '#ff4081', '#ffb300', '#ffee58', '#66bb6a', '#42a5f5', '#ab47bc', '#26c6da', '#ff7043'];
  var aantalBallonnen = vol ? 14 : 8;
  for (var i = 0; i < aantalBallonnen; i++) {
    var b = maak('balloon');
    var maat = Math.random() * 30 + 45;
    b.style.width = maat + 'px';
    b.style.height = (maat * 1.3) + 'px';
    b.style.left = (Math.random() * 100) + 'vw';
    b.style.background = kleuren[Math.floor(Math.random() * kleuren.length)];
    b.style.animationDuration = (Math.random() * 10 + 12) + 's';
    b.style.animationDelay = (Math.random() * 12) + 's';
  }

  var sterren = ['⭐', '✨', '🌟', '💫'];
  var aantalSterren = vol ? 12 : 8;
  for (var j = 0; j < aantalSterren; j++) {
    var s = maak('star', sterren[Math.floor(Math.random() * sterren.length)]);
    s.style.left = (Math.random() * 100) + 'vw';
    s.style.top = (Math.random() * 100) + 'vh';
    s.style.animationDelay = (Math.random() * 2) + 's';
  }

  if (vol) {
    maak('road');
    var p = maak('vehicle police'); p.appendChild(document.createElement('span')).className = 'light'; p.appendChild(document.createTextNode('🚓'));
    var f = maak('vehicle fire'); f.appendChild(document.createElement('span')).className = 'light'; f.appendChild(document.createTextNode('🚒'));
  }

  // vlaggetjes met de naam van een taal, steeds op een andere plek aan de rand
  var talen = (window.CURSUSSEN || []).map(function (c) { return { vlag: c.vlag, naam: c.naam }; });
  if (!talen.length) {
    talen = [{ vlag: '🇨🇼', naam: 'Papiamentu' }, { vlag: '🇬🇧', naam: 'Engels' }, { vlag: '🇪🇸', naam: 'Spaans' },
             { vlag: '🇩🇪', naam: 'Duits' }, { vlag: '🇫🇷', naam: 'Frans' }, { vlag: '🇺🇦', naam: 'Oekraïens' }];
  }
  var zones = [{ x: 8, y: 6 }, { x: 32, y: 4 }, { x: 68, y: 4 }, { x: 90, y: 6 }, { x: 10, y: 78 }, { x: 35, y: 82 },
               { x: 65, y: 82 }, { x: 90, y: 78 }, { x: 4, y: 30 }, { x: 4, y: 55 }, { x: 92, y: 30 }, { x: 92, y: 55 }];
  var laatste = -1;

  function vlaggetje() {
    if (document.hidden) return;
    var taal = talen[Math.floor(Math.random() * talen.length)];
    var z;
    do { z = Math.floor(Math.random() * zones.length); } while (z === laatste);
    laatste = z;
    var w = maak('vlag-popup');
    w.style.left = zones[z].x + 'vw';
    w.style.top = zones[z].y + 'vh';
    w.style.translate = '-50% -50%';
    var v = document.createElement('div'); v.className = 'vlag-groot'; v.textContent = taal.vlag;
    var n = document.createElement('div'); n.className = 'naam'; n.textContent = taal.naam;
    w.appendChild(v); w.appendChild(n);
    setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); }, 5100);
  }
  vlaggetje();
  setInterval(vlaggetje, vol ? 2200 : 3600);
})();
