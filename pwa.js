/* ============================================================
   Taalcursus - app installeren  (pwa.js)  v0.1.0 (kopie van papiamento/js/pwa.js)
   Created by DieOuwe · www.dieouwe.nl
   - Registreert sw.js (offline spelen) zodra de app via http(s) draait.
   - Installeer-knop: gebruikt de installeer-prompt van de browser als die er is,
     anders een korte uitleg per apparaat (iPhone, Android, computer).
   Vanaf file:// (dubbelklik op index.html) kan een app niet geinstalleerd worden:
   dan legt de knop uit hoe je de app wel via een webadres opent.
   ============================================================ */
(function () {
  'use strict';

  var knop = document.getElementById('installBtn');
  var overlay = document.getElementById('hulp');
  var tekst = document.getElementById('hulpTekst');
  var sluit = document.getElementById('hulpSluit');
  var uitgesteld = null;          // de installeer-prompt van de browser
  var vorigeFocus = null;

  var ua = navigator.userAgent || '';
  var isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isFirefox = /Firefox|FxiOS/i.test(ua);
  var isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|Chrome|Android/i.test(ua);
  var web = location.protocol === 'http:' || location.protocol === 'https:';
  var alApp = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;

  if (alApp) knop.hidden = true;

  /* ---------- offline: service worker ---------- */
  if (web && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* geen offline-modus, de app werkt gewoon */ });
    });
  }

  /* ---------- installeer-prompt ---------- */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    uitgesteld = e;
  });
  window.addEventListener('appinstalled', function () {
    uitgesteld = null;
    knop.hidden = true;
    sluitHulp();
  });

  /* ---------- uitleg ---------- */
  function uitleg() {
    if (!web) {
      return '<p>Je opent de app nu rechtstreeks vanaf je computer. Zo kan een browser hem <b>niet</b> als app installeren.</p>' +
        '<div class="warn">Dubbelklik op <b>start-server.bat</b> in de projectmap en open dan <b>http://localhost:8080</b>. ' +
        'Of zet de app online (bijvoorbeeld met GitHub Pages), dan werkt installeren ook op je telefoon.</div>';
    }
    if (isIos) {
      return isSafari
        ? '<ol><li>Tik onderin op <b>Deel</b> (het vierkantje met een pijl omhoog).</li><li>Kies <b>Zet op beginscherm</b>.</li><li>Tik op <b>Voeg toe</b>.</li></ol><p>Daarna staat Papiamentu als app op je beginscherm.</p>'
        : '<p>Open deze pagina in <b>Safari</b>. Tik dan op <b>Deel</b> en kies <b>Zet op beginscherm</b>.</p>';
    }
    if (isFirefox && !isAndroid) {
      return '<p>Firefox op de computer kan geen apps installeren. Open deze pagina in <b>Chrome</b> of <b>Edge</b> en klik op de installeer-knop.</p>';
    }
    if (isAndroid) {
      return '<ol><li>Tik rechtsboven op het menu <b>⋮</b>.</li><li>Kies <b>App installeren</b> (of <b>Toevoegen aan startscherm</b>).</li><li>Bevestig met <b>Installeren</b>.</li></ol>';
    }
    return '<ol><li>Klik rechts in de adresbalk op het <b>installeer-icoon</b> (een schermpje met een pijltje).</li><li>Of open het menu <b>⋮</b> en kies <b>App installeren</b>.</li></ol>' +
      '<p>Lukt het niet? Laad de pagina één keer opnieuw en probeer het nog eens.</p>';
  }

  function toonHulp() {
    tekst.innerHTML = uitleg();       // vaste tekst uit dit bestand, geen invoer van buiten
    vorigeFocus = document.activeElement;
    overlay.hidden = false;
    sluit.focus();
  }

  function sluitHulp() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    if (vorigeFocus && vorigeFocus.focus) vorigeFocus.focus();
  }

  knop.addEventListener('click', function () {
    if (uitgesteld) {
      var p = uitgesteld;
      uitgesteld = null;
      p.prompt();
      p.userChoice.then(function () { /* keuze wordt door de browser afgehandeld */ }, function () { });
    } else {
      toonHulp();
    }
  });
  sluit.addEventListener('click', sluitHulp);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) sluitHulp(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') sluitHulp(); });
})();
