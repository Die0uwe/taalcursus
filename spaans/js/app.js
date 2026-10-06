/* ============================================================
   Leer Spaans - schermen en navigatie  (js/app.js)  v0.4.0
   Startscherm, leerscherm, quiz, badges, confetti en badge-popups.
   v0.2.0: quiz, badges en confetti toegevoegd.
   v0.3.0: quiz scrollt naar de vraag en naar de Volgende-knop (kleine telefoons).
   v0.4.0: nieuwe opmaak (menu met voortgangsbalken), eigen plaatjes via PapImg, voortgangsbalk in de quiz.
           Na een antwoord in de quiz: leerkaartje met "wat is dit?" en tik/mouseover op elk antwoord.
   Created by DieOuwe · www.dieouwe.nl
   ============================================================ */
(function () {
  'use strict';

  var G = window.PapGame;
  var A = window.PapAudio;
  var I = window.PapImg;
  var D = G.data;

  var lijst = [];       // woorden van de gekozen categorie (leerscherm)
  var index = 0;
  var quizToken = 0;    // om trage laadacties te negeren als je al terug bent gegaan
  var minderBeweging = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(id) { return document.getElementById(id); }

  function maak(tag, klasse, tekst) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (tekst !== undefined) e.textContent = tekst;
    return e;
  }

  // Plaatje van een woord: eerst de emoji, en zodra er een eigen plaatje in img/ staat, dat plaatje.
  function plaatje(w) {
    var s = maak('span', 'pic');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', w.nl);
    I.vul(s, w);
    return s;
  }

  /* ---------- schermen ---------- */
  function toon(id) {
    var schermen = document.querySelectorAll('.screen');
    for (var i = 0; i < schermen.length; i++) schermen[i].classList.remove('active');
    el(id).classList.add('active');
    window.scrollTo(0, 0);
  }

  function actief(id) { return el(id).classList.contains('active'); }

  /* ---------- sterren en geluid ---------- */
  function updateSterren(pulse) {
    el('starCount').textContent = G.state().stars;
    if (pulse) {
      var bar = el('starsBar');
      bar.classList.remove('pulse');
      void bar.offsetWidth;            // animatie opnieuw starten
      bar.classList.add('pulse');
    }
  }

  function updateMute() {
    var m = G.state().muted;
    A.setMuted(m);
    el('muteBtn').textContent = m ? '🔇' : '🔊';
  }

  /* ---------- confetti en badge-popups ---------- */
  var KLEUREN = ['#ff5c8a', '#ffd93d', '#7cc4ff', '#8ed86c', '#b28dff', '#ffa94d'];

  function confetti(x, y, aantal) {
    if (minderBeweging) return;
    for (var i = 0; i < aantal; i++) {
      var c = maak('div', 'confetti');
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      c.style.background = KLEUREN[Math.floor(Math.random() * KLEUREN.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      var hoek = Math.random() * Math.PI * 2;
      var afstand = 100 + Math.random() * 150;
      c.style.setProperty('--dx', Math.cos(hoek) * afstand + 'px');
      c.style.setProperty('--dy', Math.sin(hoek) * afstand + 'px');
      document.body.appendChild(c);
      setTimeout(function (k) { return function () { k.remove(); }; }(c), 1500);
    }
  }

  var popupWachtrij = [];
  var popupBezig = false;

  function badgePopup(def) {
    popupWachtrij.push(def);
    if (!popupBezig) volgendePopup();
  }

  function volgendePopup() {
    var def = popupWachtrij.shift();
    if (!def) { popupBezig = false; return; }
    popupBezig = true;
    // In de quiz eerst even het goede antwoord laten zien, dan pas de popup
    var wacht = actief('quizScreen') ? 1400 : 0;
    setTimeout(function () {
      var pop = maak('div', 'badge-popup');
      pop.setAttribute('role', 'status');
      pop.appendChild(maak('span', 'badge-icon', def.icon));
      pop.appendChild(maak('h3', '', def.naam));
      pop.appendChild(maak('p', '', 'Je hebt een nieuwe badge! 🎉'));
      document.body.appendChild(pop);
      A.sfx('badge');
      confetti(window.innerWidth / 2, window.innerHeight / 2, 40);
      setTimeout(function () { pop.remove(); volgendePopup(); }, 2400);
    }, wacht);
  }

  /* ---------- startscherm ---------- */
  function bouwDialectBalk() {
    var balk = el('dialectBar');
    balk.textContent = '';
    balk.hidden = D.dialecten.length < 2;     // één dialect (bijv. Engels): geen keuzebalk
    if (balk.hidden) return;
    D.dialecten.forEach(function (d) {
      var b = maak('button', 'dialect-btn' + (d.id === G.dialect() ? ' on' : ''), d.vlag + ' ' + d.naam);
      b.type = 'button';
      b.addEventListener('click', function () { G.setDialect(d.id); });
      balk.appendChild(b);
    });
  }

  function menuKaart(icon, titel, kleur, sub, extra, onClick, fractie, actie) {
    var kaart = maak('button', 'menu-card' + (actie ? ' action' : ''));
    kaart.type = 'button';
    kaart.setAttribute('data-color', kleur);
    kaart.appendChild(maak('span', 'big-icon', icon));
    var doos = actie ? maak('span', 'txt') : kaart;
    doos.appendChild(maak('h2', '', titel));
    doos.appendChild(maak('span', 'sub', sub));
    if (extra) doos.appendChild(maak('span', 'cat-count', extra));
    if (typeof fractie === 'number') {
      var meter = maak('span', 'meter');
      var vul = maak('i');
      vul.style.width = Math.round(fractie * 100) + '%';
      meter.appendChild(vul);
      doos.appendChild(meter);
    }
    if (actie) kaart.appendChild(doos);
    kaart.addEventListener('click', onClick);
    return kaart;
  }

  function menuSectie(titel, klasse) {
    var sec = maak('section', 'menu-section');
    sec.appendChild(maak('h3', '', titel));
    var rooster = maak('div', klasse);
    sec.appendChild(rooster);
    el('menu').appendChild(sec);
    return rooster;
  }

  function bouwMenu() {
    var menu = el('menu');
    menu.textContent = '';
    var s = G.state();

    var acties = menuSectie('Spelen', 'menu-actions');
    acties.appendChild(menuKaart('🎯', 'Quiz', 'blue', 'Kies het juiste woord',
      '🔥 Beste reeks: ' + s.bestStreak, startQuiz, undefined, true));
    var lijstB = G.badgeLijst();
    var behaald = lijstB.filter(function (b) { return b.behaald; }).length;
    acties.appendChild(menuKaart('🏆', 'Badges', 'orange', 'Bekijk je prijzen',
      behaald + ' / ' + lijstB.length + ' behaald', toonBadges, undefined, true));

    var cats = menuSectie('Woorden leren', 'menu-cats');
    D.categorieen.forEach(function (c) {
      var totaal = G.woordenVan(c.id).length;
      var gezien = G.aantalGezien(c.id);
      cats.appendChild(menuKaart(c.icon, c.naam, c.kleur, c.sub,
        gezien + ' / ' + totaal + ' geleerd',
        function () { startLeren(c.id); }, totaal ? gezien / totaal : 0));
    });
  }

  /* ---------- leerscherm ---------- */
  function startLeren(id) {
    lijst = G.woordenVan(id);
    index = 0;
    var c = G.categorie(id);
    el('learnTitle').textContent = c.icon + ' ' + c.naam;
    el('learnCard').setAttribute('data-color', c.kleur);
    toon('learnScreen');
    toonKaart(true);
  }

  function toonKaart(speel) {
    var w = lijst[index];
    var kaart = el('learnCard');
    kaart.textContent = '';
    var podium = maak('div', 'stage');
    podium.appendChild(plaatje(w));
    kaart.appendChild(podium);
    kaart.appendChild(maak('div', 'pap-word', G.pap(w)));
    kaart.appendChild(maak('div', 'phonetic', 'uitspraak: [' + G.uitspraak(w) + ']'));
    kaart.appendChild(maak('div', 'nl-word', w.nl));
    el('audioNote').textContent = '';
    if (!minderBeweging) {              // zachte "kaartje schuift binnen"-animatie opnieuw starten
      kaart.classList.remove('slide');
      void kaart.offsetWidth;
      kaart.classList.add('slide');
    }

    G.markeerGezien(w.id);     // eerst markeren (+1 ster, eenmalig), dan de stippen tekenen
    bouwVoortgang();
    if (speel) zegHet();
  }

  function bouwVoortgang() {
    var p = el('progress');
    p.textContent = '';
    lijst.forEach(function (w, i) {
      var klasse = 'dot' + (i === index ? ' now' : '') + (G.state().seen[w.id] ? ' seen' : '');
      p.appendChild(maak('span', klasse));
    });
    p.appendChild(maak('div', 'progress-text', 'Woord ' + (index + 1) + ' van ' + lijst.length));
  }

  function zegHet() {
    var w = lijst[index];
    A.play(w, G.dialect(), G.pap(w)).then(function (res) {
      if (lijst[index] !== w) return;                 // ondertussen naar ander woord
      var note = el('audioNote');
      if (res.via === 'tts') note.textContent = '🗣️ Dit is een computerstem. Een echte opname komt nog.';
      else if (res.via === 'none') note.textContent = '🔇 Voor dit woord is nog geen geluid.';
      else if (res.via === 'blocked') note.textContent = '👆 Tik op "Zeg het" om het te horen.';
      else note.textContent = '';
    });
  }

  function volgende() { index = (index + 1) % lijst.length; toonKaart(true); }
  function vorige() { index = (index - 1 + lijst.length) % lijst.length; toonKaart(true); }

  /* ---------- quiz ---------- */
  function startQuiz() {
    var mijn = ++quizToken;
    toon('quizScreen');
    el('resultBox').hidden = true;
    el('quizBody').hidden = false;
    el('qVoortgang').textContent = '';
    el('qStreak').textContent = '';
    el('optionsBox').textContent = '';
    el('feedback').textContent = '';
    el('qNext').hidden = true;
    el('qBar').style.width = '0%';
    el('questionBox').textContent = 'Even laden…';

    A.scan(D.woorden, G.dialect()).then(function (kaart) {
      if (mijn !== quizToken || !actief('quizScreen')) return;
      G.startRonde(function (w) { return !!kaart[w.id]; });
      toonVraag();
    });
  }

  function toonVraag() {
    var v = G.huidige();
    var info = G.rondeInfo();
    window.scrollTo(0, 0);              // nieuwe vraag: weer bovenaan beginnen
    el('qVoortgang').textContent = 'Vraag ' + (info.i + 1) + ' / ' + info.totaal;
    el('qBar').style.width = Math.round((info.i / info.totaal) * 100) + '%';
    el('qStreak').textContent = info.streak > 0 ? '🔥 ' + info.streak + ' op rij' : '';
    el('feedback').textContent = '';
    el('leerKaart').hidden = true;
    el('leerKaart').textContent = '';
    el('qNext').hidden = true;

    var vraag = el('questionBox');
    vraag.textContent = '';
    if (v.type === 'luister') {
      vraag.appendChild(maak('div', '', 'Luister en kies het plaatje!'));
      var luister = maak('button', 'listen-btn', '🔊 Luister');
      luister.type = 'button';
      luister.addEventListener('click', function () { A.play(v.woord, G.dialect(), G.pap(v.woord)); });
      vraag.appendChild(luister);
      A.play(v.woord, G.dialect(), G.pap(v.woord));
    } else {
      vraag.appendChild(maak('div', '', 'Welk woord hoort bij dit plaatje?'));
      vraag.appendChild(maak('br'));
      vraag.appendChild(plaatje(v.woord));
    }

    var box = el('optionsBox');
    box.textContent = '';
    box.classList.remove('beantwoord');
    v.opties.forEach(function (opt) {
      var knop = maak('button', 'option' + (v.type === 'luister' ? ' emoji-opt' : ''));
      if (v.type === 'luister') knop.appendChild(plaatje(opt));
      else knop.textContent = G.pap(opt);
      knop.type = 'button';
      knop.setAttribute('data-id', opt.id);
      knop.setAttribute('aria-label', v.type === 'luister' ? opt.nl : G.pap(opt));
      knop.addEventListener('click', function (e) {
        if (box.classList.contains('beantwoord')) toonInfo(opt, true);   // na het antwoord: "wat is dit?"
        else kies(knop, opt, e);
      });
      box.appendChild(knop);
    });
  }

  function kies(knop, opt) {
    var v = G.huidige();
    var res = G.antwoord(opt.id);
    if (!res) return;
    var knoppen = el('optionsBox').querySelectorAll('.option');
    el('optionsBox').classList.add('beantwoord');
    Array.prototype.forEach.call(knoppen, function (k) {
      k.classList.add('done');
      if (k.getAttribute('data-id') === res.juistId) k.classList.add('correct');
      // mouseover (computer): wat betekent dit antwoord?
      var o = D.woorden.filter(function (x) { return x.id === k.getAttribute('data-id'); })[0];
      if (o) k.title = o.icon + ' ' + G.pap(o) + ' = ' + o.nl;
    });

    var fb = el('feedback');
    if (res.goed) {
      var tekst = '🎉 Bon! Goed gedaan! +' + res.sterren + ' ⭐';
      if (res.bonus) tekst += '  🔥 Reeks-bonus!';
      fb.textContent = tekst;
      A.sfx('goed');
      var r = knop.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2, 30);
    } else {
      knop.classList.add('wrong');
      fb.textContent = '😊 Bijna! Het is: ' + v.woord.icon + ' ' + G.pap(v.woord);
      A.sfx('fout');
    }
    var info = G.rondeInfo();
    el('qStreak').textContent = info.streak > 0 ? '🔥 ' + info.streak + ' op rij' : '';
    el('qBar').style.width = Math.round(((info.i + 1) / info.totaal) * 100) + '%';

    // Laat het goede woord horen, zodat je het leert
    if (v.type === 'plaatje') {
      setTimeout(function () {
        if (G.huidige() === v) A.play(v.woord, G.dialect(), G.pap(v.woord));
      }, 450);
    }

    toonInfo(v.woord, false);            // direct het goede woord uitleggen (audio speelt hierboven al)

    var laatste = info.i === info.totaal - 1;
    var next = el('qNext');
    next.textContent = laatste ? 'Klaar ✔' : 'Volgende ➡';
    next.hidden = false;
    next.focus({ preventScroll: true });
    if (next.scrollIntoView) next.scrollIntoView({ block: 'nearest', behavior: minderBeweging ? 'auto' : 'smooth' });
  }

  // Leerkaartje onder de antwoorden: plaatje, woord, uitspraak, vertaling en een luisterknop.
  function toonInfo(w, speel) {
    var kaart = el('leerKaart');
    kaart.textContent = '';
    kaart.hidden = false;
    Array.prototype.forEach.call(el('optionsBox').querySelectorAll('.option'), function (k) {
      k.classList.toggle('bekeken', k.getAttribute('data-id') === w.id);
    });
    kaart.appendChild(plaatje(w));
    var tekst = maak('div', 'lk-tekst');
    tekst.appendChild(maak('div', 'lk-pap', G.pap(w)));
    tekst.appendChild(maak('div', 'lk-uitspraak', '[' + G.uitspraak(w) + ']'));
    tekst.appendChild(maak('div', 'lk-nl', '= ' + w.nl));
    kaart.appendChild(tekst);
    var luister = maak('button', 'lk-knop', '🔊');
    luister.type = 'button';
    luister.setAttribute('aria-label', 'Luister: ' + G.pap(w));
    luister.addEventListener('click', function () { A.play(w, G.dialect(), G.pap(w)); });
    kaart.appendChild(luister);
    if (speel) A.play(w, G.dialect(), G.pap(w));
  }

  function volgendeVraag() {
    A.stop();
    if (G.volgende()) toonVraag();
    else toonResultaat();
  }

  function toonResultaat() {
    var info = G.rondeInfo();
    el('quizBody').hidden = true;
    var rb = el('resultBox');
    rb.textContent = '';
    rb.hidden = false;

    var verhouding = info.score / info.totaal;
    var icon = verhouding === 1 ? '🏆' : verhouding >= 0.7 ? '🎉' : verhouding >= 0.4 ? '😊' : '💪';
    var kop = verhouding === 1 ? 'Perfect!' : verhouding >= 0.7 ? 'Super gedaan!' : verhouding >= 0.4 ? 'Goed bezig!' : 'Blijf oefenen!';

    var kaart = maak('div', 'learn-card result-card');
    kaart.setAttribute('data-color', verhouding === 1 ? 'yellow' : 'purple');
    var podium = maak('div', 'stage');
    podium.appendChild(maak('span', 'big-emoji', icon));
    kaart.appendChild(podium);
    kaart.appendChild(maak('div', 'pap-word', kop));
    kaart.appendChild(maak('div', 'nl-word', info.score + ' van de ' + info.totaal + ' goed'));
    kaart.appendChild(maak('div', 'phonetic', '+' + info.sterren + ' ⭐ verdiend'));
    rb.appendChild(kaart);

    var knoppen = maak('div', 'nav-card');
    var opnieuw = maak('button', 'big-btn', '🎯 Nog een ronde');
    opnieuw.type = 'button';
    opnieuw.addEventListener('click', startQuiz);
    var menu = maak('button', 'big-btn alt', '🏠 Menu');
    menu.type = 'button';
    menu.addEventListener('click', terug);
    knoppen.appendChild(opnieuw);
    knoppen.appendChild(menu);
    rb.appendChild(knoppen);

    if (info.score === info.totaal) {
      confetti(window.innerWidth / 2, window.innerHeight / 3, 60);
    }
  }

  /* ---------- badges ---------- */
  function toonBadges() {
    var box = el('badgesBox');
    box.textContent = '';
    G.badgeLijst().forEach(function (b) {
      var kaart = maak('div', 'badge-card' + (b.behaald ? ' earned' : ''));
      kaart.appendChild(maak('div', 'badge-big', b.behaald ? b.icon : '❔'));
      kaart.appendChild(maak('div', 'badge-naam', b.behaald ? b.naam : '???'));
      kaart.appendChild(maak('div', 'badge-uitleg', b.uitleg));
      box.appendChild(kaart);
    });
    toon('badgesScreen');
  }

  /* ---------- terug naar het menu ---------- */
  function terug() {
    quizToken++;           // lopende quizlading annuleren
    A.stop();
    bouwMenu();
    toon('menuScreen');
  }

  /* ---------- opstarten ---------- */
  G.on(function (gebeurtenis, state, data) {
    if (gebeurtenis === 'stars') updateSterren(true);
    if (gebeurtenis === 'muted') updateMute();
    if (gebeurtenis === 'badge') badgePopup(data);
    if (gebeurtenis === 'dialect') {
      bouwDialectBalk();
      bouwMenu();
    }
  });

  el('muteBtn').addEventListener('click', function () { G.setMuted(!G.state().muted); });
  el('nextBtn').addEventListener('click', volgende);
  el('prevBtn').addEventListener('click', vorige);
  el('speakBtn').addEventListener('click', zegHet);
  el('qNext').addEventListener('click', volgendeVraag);
  Array.prototype.forEach.call(document.querySelectorAll('[data-back]'), function (b) {
    b.addEventListener('click', terug);
  });
  document.addEventListener('keydown', function (e) {
    if (actief('learnScreen')) {
      if (e.key === 'ArrowRight') volgende();
      else if (e.key === 'ArrowLeft') vorige();
      else if (e.key === 'Escape') terug();
    } else if (actief('quizScreen') || actief('badgesScreen')) {
      if (e.key === 'Escape') terug();
    }
  });

  updateSterren(false);
  updateMute();
  bouwDialectBalk();
  bouwMenu();
})();
