/* ============================================================
   Aprende Papiamentu - audio-engine  (js/audio.js)  v0.4.0
   Created by DieOuwe · www.dieouwe.nl
   v0.4.0: meerdere stemmen in eigen mappen. Echte opnames (vrouw) winnen van de computerstem (mms).
   Volgorde per woord, de eerste die bestaat wordt gespeeld:
     1. mp3/vrouw/[dialect/]<id>.mp3   echte opname
     2. mp3/mms/[dialect/]<id>.mp3     computerstem (tools/maak_audio.py)
     3. mp3/<id>.mp3                   losse mp3 (oude opzet, blijft werken)
     4. browserstem (Spaans/Portugees), een noodoplossing
     5. niets: de app meldt netjes "nog geen geluid"
   Het dialect-mapje (aw, bn) wordt alleen gebruikt voor Aruba en Bonaire;
   Curacao (cw) staat direct in de stem-map.
   play() geeft altijd een Promise terug met
   { via: "mp3"|"tts"|"none"|"muted"|"blocked", stem: "vrouw"|"mms"|"los"|null }
   en gooit nooit een fout.
   ============================================================ */
(function () {
  'use strict';

  var failed = {};          // url -> true: bestanden die niet bestaan, niet opnieuw proberen
  var current = null;       // huidig <audio>-element
  var token = 0;            // om oude, trage aanroepen te negeren
  var muted = false;
  var sfxAan = true;     // geluidjes (goed/fout/badge) los aan of uit te zetten
  var sfxVol = 0.5;      // 0 ... 1
  var computerStem = true; // false: geen computerstem (browserstem en MMS-mp3's), echte opnames blijven
  var voices = [];

  function laadStemmen() {
    if (!('speechSynthesis' in window)) return;
    voices = window.speechSynthesis.getVoices() || [];
  }
  if ('speechSynthesis' in window) {
    laadStemmen();
    window.speechSynthesis.addEventListener('voiceschanged', laadStemmen);
  }

  var STEMMEN = ['vrouw', 'mms'];   // voorkeursvolgorde: eerst echte opnames
  var STANDAARD = (window.PAP_DATA && window.PAP_DATA.meta && window.PAP_DATA.meta.standaardDialect) || 'cw';

  // [{ url, stem }] in de volgorde waarin ze geprobeerd worden
  function kandidaten(w, dialect) {
    var lijst = [];
    STEMMEN.forEach(function (stem) {
      if (stem === 'mms' && !computerStem) return;
      if (dialect && dialect !== STANDAARD) lijst.push({ url: 'mp3/' + stem + '/' + dialect + '/' + w.id + '.mp3', stem: stem });
      lijst.push({ url: 'mp3/' + stem + '/' + w.id + '.mp3', stem: stem });
    });
    lijst.push({ url: 'mp3/' + w.id + '.mp3', stem: 'los' });
    return lijst;
  }

  function stopAlles() {
    if (current) { try { current.pause(); } catch (e) { /* niets */ } current = null; }
    if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch (e) { /* niets */ } }
  }

  // Probeert één mp3. Resolve: 'mp3' | 'blocked'. Reject: bestand ontbreekt of is kapot.
  function probeerMp3(url, mijnToken) {
    return new Promise(function (resolve, reject) {
      if (failed[url]) { reject(new Error('eerder mislukt')); return; }
      var a = new Audio(url);
      var p;
      try { p = a.play(); } catch (e) { failed[url] = true; reject(e); return; }
      if (!p || typeof p.then !== 'function') { current = a; resolve('mp3'); return; }
      p.then(function () {
        if (mijnToken !== token) { a.pause(); resolve('mp3'); return; }
        current = a;
        resolve('mp3');
      }).catch(function (err) {
        if (err && err.name === 'NotAllowedError') { resolve('blocked'); return; }
        failed[url] = true;   // ontbrekend of niet af te spelen
        reject(err);
      });
    });
  }

  function kiesStem() {
    var talen = (window.PAP_DATA && window.PAP_DATA.meta && window.PAP_DATA.meta.ttsTalen) || ['es', 'pt'];
    var t, i;
    for (t = 0; t < talen.length; t++) {          // eerste taal in de lijst die een stem heeft wint
      for (i = 0; i < voices.length; i++) {
        if (voices[i].lang && voices[i].lang.toLowerCase().indexOf(talen[t].toLowerCase()) === 0) return voices[i];
      }
    }
    return null;
  }

  function spreek(tekst) {
    if (!('speechSynthesis' in window)) return 'none';
    var stem = kiesStem();
    if (voices.length && !stem) return 'none';   // alleen Nederlands/Engels beschikbaar: liever stil dan fout
    var u = new SpeechSynthesisUtterance(tekst);
    u.lang = stem ? stem.lang : ((window.PAP_DATA.meta && window.PAP_DATA.meta.ttsFallback) || 'es-ES');
    if (stem) u.voice = stem;
    u.rate = 0.8;
    u.pitch = 1.1;
    window.speechSynthesis.speak(u);
    return 'tts';
  }

  function play(woord, dialect, tekst) {
    token++;
    var mijnToken = token;
    stopAlles();
    if (muted) return Promise.resolve({ via: 'muted' });

    var lijst = kandidaten(woord, dialect);
    var i = 0;

    function volgende() {
      if (i >= lijst.length) {
        if (!computerStem) return Promise.resolve({ via: 'stemuit', stem: null });
        var via = spreek(tekst || woord.pap);
        return Promise.resolve({ via: via, stem: null });
      }
      var kand = lijst[i++];
      return probeerMp3(kand.url, mijnToken).then(
        function (res) { return { via: res, stem: kand.stem }; },
        function () { return volgende(); }
      );
    }
    return volgende();
  }

  /* ---------- welke mp3's bestaan er? (voor "luister en kies"-vragen) ---------- */
  var bestaat = {};   // url -> true/false

  function testUrl(url) {
    if (url in bestaat) return Promise.resolve(bestaat[url]);
    return new Promise(function (resolve) {
      var a = new Audio();
      var klaar = false;
      function fin(v) {
        if (klaar) return;
        klaar = true;
        bestaat[url] = v;
        a.removeAttribute('src');
        resolve(v);
      }
      a.preload = 'metadata';
      a.addEventListener('loadedmetadata', function () { fin(true); });
      a.addEventListener('error', function () { fin(false); });
      setTimeout(function () { fin(false); }, 2000);
      a.src = url;
      a.load();
    });
  }

  function heeftMp3(woord, dialect) {
    var lijst = kandidaten(woord, dialect);
    return lijst.reduce(function (belofte, kand) {
      return belofte.then(function (gevonden) { return gevonden || testUrl(kand.url); });
    }, Promise.resolve(false));
  }

  // Geeft { id: true/false } voor alle woorden.
  function scan(woorden, dialect) {
    return Promise.all(woorden.map(function (w) {
      return heeftMp3(w, dialect).then(function (ok) { return [w.id, ok]; });
    })).then(function (paren) {
      var kaart = {};
      paren.forEach(function (p) { kaart[p[0]] = p[1]; });
      return kaart;
    });
  }

  /* ---------- korte geluidjes (zonder bestanden) ---------- */
  var ctx = null;
  var SFX = {
    goed:  [[660, 0], [880, 0.11]],
    fout:  [[260, 0], [200, 0.14]],
    badge: [[523, 0], [659, 0.12], [784, 0.24], [1047, 0.36]]
  };

  function sfx(naam) {
    if (muted || !sfxAan || sfxVol <= 0 || !SFX[naam]) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = ctx || new AC();
      if (ctx.state === 'suspended') ctx.resume();
      SFX[naam].forEach(function (n) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        var t0 = ctx.currentTime + n[1];
        osc.type = 'sine';
        osc.frequency.value = n[0];
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.32 * sfxVol), t0 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.25);
      });
    } catch (e) { /* geen geluidjes: geen probleem */ }
  }

  window.PapAudio = {
    play: play,
    stop: stopAlles,
    scan: scan,
    sfx: sfx,
    setMuted: function (b) { muted = !!b; if (muted) stopAlles(); },
    setSfx: function (aan, vol) { sfxAan = !!aan; if (typeof vol === 'number') sfxVol = Math.min(1, Math.max(0, vol)); },
    setComputerStem: function (b) { computerStem = !!b; if (!computerStem) stopAlles(); },
    isMuted: function () { return muted; }
  };
})();
