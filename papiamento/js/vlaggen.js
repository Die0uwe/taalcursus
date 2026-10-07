/* ============================================================
   Taalcursus - vlaggen  (vlaggen.js)  v0.1.0
   Created by DieOuwe · www.dieouwe.nl
   Windows heeft geen vlag-emoji (je ziet dan letters als "GB" of "CW"). Deze hulp zet daar kleine
   vlagplaatjes (SVG) voor in. Op telefoon, Mac en Linux blijft de gewone emoji staan.
   Gebruik: Vlaggen.vul(element, '🇬🇧')   (map met de plaatjes: data-map op het script, standaard 'vlaggen/')
   ============================================================ */
(function () {
  'use strict';

  var map = (document.currentScript && document.currentScript.getAttribute('data-map')) || 'vlaggen/';
  var BESTAND = { '🇬🇧': 'gb', '🇪🇸': 'es', '🇩🇪': 'de', '🇫🇷': 'fr', '🇺🇦': 'ua', '🇨🇼': 'cw', '🇦🇼': 'aw', '🇧🇶': 'bn' };

  // Test: een echte vlag-emoji ziet er anders uit dan dezelfde twee tekens los van elkaar (dan zijn het gewoon letters).
  function emojiVlaggen() {
    try {
      var ua = navigator.userAgent || '';
      if (/Windows/.test(ua)) return false;                       // Windows tekent geen vlag-emoji, altijd plaatjes
      if (/[?&]vlaggen=plaatje/.test(location.search)) return false;   // om te testen
      function teken(tekst) {
        var c = document.createElement('canvas');
        c.width = 80; c.height = 40;
        var x = c.getContext('2d', { willReadFrequently: true });
        if (!x) return null;
        x.textBaseline = 'top';
        x.font = '32px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
        x.fillText(tekst, 0, 2);
        return x.getImageData(0, 0, 80, 40).data;
      }
      var vlag = teken('\u{1F1EB}\u{1F1F7}');
      var los = teken('\u{1F1EB}\u200B\u{1F1F7}');
      if (!vlag || !los) return true;
      for (var i = 0; i < vlag.length; i++) if (vlag[i] !== los[i]) return true;   // verschil: het is echt een vlag
      return false;
    } catch (e) { return true; }
  }

  var gewoon = emojiVlaggen();

  function vul(knoop, emoji) {
    var f = BESTAND[emoji];
    if (gewoon || !f) { knoop.appendChild(document.createTextNode(emoji)); return knoop; }
    var img = document.createElement('img');
    img.className = 'vlag-img';
    img.src = map + f + '.svg';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    knoop.appendChild(img);
    return knoop;
  }

  window.Vlaggen = { vul: vul, emoji: gewoon };
})();
