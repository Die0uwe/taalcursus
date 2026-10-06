/* ============================================================
   Taalcursus - delen  (delen.js)  v0.1.0
   Created by DieOuwe · www.dieouwe.nl
   Voegt een Deel-knop (📤) toe aan de bovenbalk. Op telefoon opent het eigen deelmenu van het toestel
   (WhatsApp, Facebook, Instagram, Berichten...). In een gewone browser opent een paneel met knoppen
   voor WhatsApp, Facebook, X, Telegram, e-mail en link kopiëren. Geen tracking, geen externe scripts.
   Dezelfde file staat in de hoofdmap en in papiamento/js/ (de generator kopieert hem).
   ============================================================ */
(function () {
  'use strict';

  var balk = document.querySelector('.topbar-inner');
  if (!balk) return;

  // Wat delen we: de hoofdpagina deelt de hoofdsite, een cursus deelt die cursus (zonder zoekopdracht of #)
  function gegevens() {
    var url = location.origin + location.pathname.replace(/index\.html$/, '');
    var titel = document.title.replace(/\s+/g, ' ').trim();
    var meta = document.querySelector('meta[name="description"]');
    var tekst = (meta && meta.content) ? meta.content : 'Leer talen spelenderwijs!';
    return { url: url, titel: titel, tekst: tekst };
  }

  var knop = document.createElement('button');
  knop.type = 'button';
  knop.className = 'top-btn delen-btn';
  knop.id = 'delenBtn';
  knop.title = 'Deel met vrienden en familie';
  knop.setAttribute('aria-label', 'Deel met vrienden en familie');
  knop.textContent = '📤';
  var installeer = document.getElementById('installBtn');
  balk.insertBefore(knop, installeer || null);

  var overlay = null;

  function el(tag, klasse, tekst) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (tekst) e.textContent = tekst;
    return e;
  }

  function sluit() {
    if (overlay) { overlay.remove(); overlay = null; }
    knop.focus();
  }

  function kopieer(url, status) {
    function klaar(ok) { status.textContent = ok ? '✅ Link gekopieerd!' : 'Kopiëren lukte niet. Selecteer de link zelf.'; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { klaar(true); }, function () { klaar(false); });
      return;
    }
    var t = document.createElement('textarea');
    t.value = url; t.setAttribute('readonly', ''); t.className = 'delen-verborgen';
    document.body.appendChild(t); t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    t.remove(); klaar(ok);
  }

  function paneel() {
    var g = gegevens();
    var bericht = g.tekst;
    var enc = encodeURIComponent;
    var kanalen = [
      ['💬', 'WhatsApp', 'https://wa.me/?text=' + enc(bericht + ' ' + g.url)],
      ['📘', 'Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + enc(g.url)],
      ['✈️', 'Telegram', 'https://t.me/share/url?url=' + enc(g.url) + '&text=' + enc(bericht)],
      ['𝕏', 'X', 'https://twitter.com/intent/tweet?text=' + enc(bericht) + '&url=' + enc(g.url)],
      ['✉️', 'E-mail', 'mailto:?subject=' + enc(g.titel) + '&body=' + enc(bericht + '\n' + g.url)]
    ];

    overlay = el('div', 'overlay');
    var blad = el('div', 'sheet');
    blad.setAttribute('role', 'dialog');
    blad.setAttribute('aria-modal', 'true');
    blad.setAttribute('aria-labelledby', 'delenTitel');
    var h = el('h2', '', '📤 Deel met vrienden en familie');
    h.id = 'delenTitel';
    blad.appendChild(h);
    blad.appendChild(el('p', 'delen-tekst', bericht));

    var lijst = el('div', 'delen-lijst');
    kanalen.forEach(function (k) {
      var a = el('a', 'delen-kanaal');
      a.href = k[2];
      if (k[1] !== 'E-mail') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.appendChild(el('span', 'delen-icoon', k[0]));
      a.appendChild(el('span', '', k[1]));
      lijst.appendChild(a);
    });
    var kop = el('button', 'delen-kanaal');
    kop.type = 'button';
    kop.appendChild(el('span', 'delen-icoon', '🔗'));
    kop.appendChild(el('span', '', 'Link kopiëren'));
    lijst.appendChild(kop);
    blad.appendChild(lijst);

    var status = el('p', 'delen-status');
    status.setAttribute('role', 'status');
    blad.appendChild(status);
    kop.addEventListener('click', function () { kopieer(g.url, status); });

    var dicht = el('button', 'sheet-close', 'Sluiten');
    dicht.type = 'button';
    dicht.addEventListener('click', sluit);
    blad.appendChild(dicht);

    overlay.appendChild(blad);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) sluit(); });
    document.body.appendChild(overlay);
    dicht.focus();
  }

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay) sluit(); });

  knop.addEventListener('click', function () {
    var g = gegevens();
    // Telefoon/tablet (en nieuwere browsers): het eigen deelmenu van het toestel
    if (navigator.share) {
      navigator.share({ title: g.titel, text: g.tekst, url: g.url }).catch(function (err) {
        if (err && err.name === 'AbortError') return;   // gebruiker liet het deelmenu los: niets doen
        paneel();
      });
      return;
    }
    paneel();
  });
})();
