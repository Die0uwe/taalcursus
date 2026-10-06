/* ============================================================
   Leer Duits - spellogica  (js/game.js)  v0.4.0
   Created by DieOuwe · www.dieouwe.nl
   Bewaart sterren, geziene woorden, dialect, geluid en badges in localStorage.
   Bevat ook de quizronde (10 vragen, zonder herhaling) en de badge-regels.
   v0.2.0: quiz + badges toegevoegd.
   ============================================================ */
(function () {
  'use strict';

  var D = window.PAP_DATA;
  var KEY = (D.meta && D.meta.opslag) || 'papiweb.v1';
  var RONDE_LENGTE = 10;
  var state = {
    stars: 0, seen: {}, muted: false, dialect: D.meta.standaardDialect,
    badges: [], bestStreak: 0, rondes: 0, perfect: 0
  };
  var luisteraars = [];
  var ronde = null;

  /* ---------- opslag ---------- */
  function laad() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (typeof p.stars === 'number') state.stars = p.stars;
        if (p.seen && typeof p.seen === 'object') state.seen = p.seen;
        if (typeof p.muted === 'boolean') state.muted = p.muted;
        if (typeof p.dialect === 'string') state.dialect = p.dialect;
        if (Array.isArray(p.badges)) state.badges = p.badges;
        if (typeof p.bestStreak === 'number') state.bestStreak = p.bestStreak;
        if (typeof p.rondes === 'number') state.rondes = p.rondes;
        if (typeof p.perfect === 'number') state.perfect = p.perfect;
      }
    } catch (e) { /* opslag niet beschikbaar: gewoon doorgaan */ }
    var bekend = D.dialecten.some(function (d) { return d.id === state.dialect; });
    if (!bekend) state.dialect = D.meta.standaardDialect;
  }

  function bewaar() {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* niets */ }
  }

  function meld(gebeurtenis, data) {
    luisteraars.forEach(function (fn) { fn(gebeurtenis, state, data); });
  }

  /* ---------- woorden ---------- */
  function woordenVan(catId) {
    return D.woorden.filter(function (w) { return w.cat === catId; });
  }

  function veld(w, naam) {
    var o = w.dialect && w.dialect[state.dialect];
    return (o && o[naam]) || w[naam];
  }

  function aantalGezien(catId) {
    return woordenVan(catId).filter(function (w) { return state.seen[w.id]; }).length;
  }

  function totaalGezien() {
    return D.woorden.filter(function (w) { return state.seen[w.id]; }).length;
  }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- badges ---------- */
  var CAT_BADGE = {
    basis: 'Basis-held!', dieren: 'Dierenvriend!', kleuren: 'Kleurenkenner!',
    nummers: 'Rekenmeester!', familie: 'Familieman!'
  };

  var badgeDefs = [
    { id: 'ster1',   icon: '🌟', naam: 'Eerste ster!',     uitleg: 'Verdien je eerste ster',        check: function () { return state.stars >= 1; } },
    { id: 'ster10',  icon: '⭐', naam: '10 sterren!',      uitleg: 'Verdien 10 sterren',            check: function () { return state.stars >= 10; } },
    { id: 'ster50',  icon: '💫', naam: 'Sterrenkampioen!', uitleg: 'Verdien 50 sterren',            check: function () { return state.stars >= 50; } },
    { id: 'ster100', icon: '🏅', naam: '100 sterren!',     uitleg: 'Verdien 100 sterren',           check: function () { return state.stars >= 100; } }
  ];
  D.categorieen.forEach(function (c) {
    badgeDefs.push({
      id: 'cat_' + c.id, icon: c.icon, naam: CAT_BADGE[c.id] || ('Alle ' + c.naam + '!'),
      uitleg: 'Leer alle woorden bij ' + c.naam,
      check: function () { return aantalGezien(c.id) === woordenVan(c.id).length; }
    });
  });
  badgeDefs.push(
    { id: 'streak5', icon: '🔥', naam: '5 op rij!',         uitleg: 'Beantwoord 5 quizvragen achter elkaar goed', check: function () { return state.bestStreak >= 5; } },
    { id: 'perfect', icon: '🏆', naam: 'Perfecte ronde!',   uitleg: 'Alles goed in één quizronde',               check: function () { return state.perfect >= 1; } },
    { id: 'alles',   icon: '👑', naam: (D.meta && D.meta.kampioen) || 'Kampioen!', uitleg: 'Leer alle woorden',                      check: function () { return totaalGezien() === D.woorden.length; } }
  );

  function checkBadges(stil) {
    var nieuw = [];
    badgeDefs.forEach(function (b) {
      if (state.badges.indexOf(b.id) === -1 && b.check()) {
        state.badges.push(b.id);
        nieuw.push(b);
      }
    });
    if (nieuw.length) {
      bewaar();
      if (!stil) nieuw.forEach(function (b) { meld('badge', b); });
    }
  }

  /* ---------- quizronde ---------- */
  // luisterOk(w) mag true geven als dat woord een echte mp3 heeft (voor "luister en kies"-vragen)
  function startRonde(luisterOk, n) {
    n = Math.min(n || RONDE_LENGTE, D.woorden.length);
    var pool = shuffle(D.woorden).slice(0, n);
    var vragen = pool.map(function (w) {
      var type = (luisterOk && luisterOk(w) && Math.random() < 0.4) ? 'luister' : 'plaatje';
      var zelfde = shuffle(woordenVan(w.cat).filter(function (x) { return x.id !== w.id; }));
      var rest = shuffle(D.woorden.filter(function (x) { return x.cat !== w.cat; }));
      var fout = zelfde.slice(0, 3);
      if (fout.length < 3) fout = fout.concat(rest.slice(0, 3 - fout.length));
      return { woord: w, type: type, opties: shuffle([w].concat(fout)) };
    });
    ronde = { vragen: vragen, i: 0, score: 0, streak: 0, sterren: 0, beantwoord: false };
    return ronde;
  }

  function huidige() { return ronde ? ronde.vragen[ronde.i] : null; }

  function antwoord(id) {
    if (!ronde || ronde.beantwoord) return null;
    var v = huidige();
    var goed = id === v.woord.id;
    var sterren = 0, bonus = false;
    ronde.beantwoord = true;
    if (goed) {
      ronde.score++;
      ronde.streak++;
      sterren = 2;
      if (ronde.streak % 5 === 0) { sterren += 1; bonus = true; }
      if (ronde.streak > state.bestStreak) state.bestStreak = ronde.streak;
    } else {
      ronde.streak = 0;
    }
    ronde.sterren += sterren;
    if (sterren) { state.stars += sterren; }
    bewaar();
    if (sterren) meld('stars');
    checkBadges();
    return { goed: goed, juistId: v.woord.id, sterren: sterren, bonus: bonus, streak: ronde.streak };
  }

  // true: er komt nog een vraag. false: ronde is klaar.
  function volgende() {
    if (!ronde) return false;
    ronde.i++;
    ronde.beantwoord = false;
    if (ronde.i >= ronde.vragen.length) {
      state.rondes++;
      if (ronde.score === ronde.vragen.length) state.perfect++;
      bewaar();
      checkBadges();
      return false;
    }
    return true;
  }

  function rondeInfo() {
    if (!ronde) return null;
    return { i: ronde.i, totaal: ronde.vragen.length, score: ronde.score, streak: ronde.streak, sterren: ronde.sterren };
  }

  /* ---------- start ---------- */
  laad();
  checkBadges(true);   // eerder verdiende badges stil bijwerken, zonder popups

  window.PapGame = {
    data: D,
    state: function () { return state; },
    on: function (fn) { luisteraars.push(fn); },
    woordenVan: woordenVan,
    categorie: function (id) { return D.categorieen.filter(function (c) { return c.id === id; })[0]; },
    pap: function (w) { return veld(w, 'pap'); },
    uitspraak: function (w) { return veld(w, 'uitspraak'); },
    dialect: function () { return state.dialect; },
    setDialect: function (id) {
      if (!D.dialecten.some(function (d) { return d.id === id; })) return;
      state.dialect = id; bewaar(); meld('dialect');
    },
    setMuted: function (b) { state.muted = !!b; bewaar(); meld('muted'); },
    addStars: function (n) { state.stars += n; bewaar(); meld('stars'); checkBadges(); },
    // Eén ster per woord, één keer in totaal. Zo kun je niet eindeloos "volgende" klikken.
    markeerGezien: function (id) {
      if (state.seen[id]) return false;
      state.seen[id] = 1;
      state.stars += 1;
      bewaar(); meld('stars');
      checkBadges();
      return true;
    },
    aantalGezien: aantalGezien,
    totaalGezien: totaalGezien,
    badgeLijst: function () {
      return badgeDefs.map(function (b) {
        return { id: b.id, icon: b.icon, naam: b.naam, uitleg: b.uitleg, behaald: state.badges.indexOf(b.id) !== -1 };
      });
    },
    startRonde: startRonde,
    huidige: huidige,
    antwoord: antwoord,
    volgende: volgende,
    rondeInfo: rondeInfo
  };
})();
