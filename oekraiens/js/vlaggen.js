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

  // Test: tekent een vlag-emoji en kijkt of er kleur te zien is. Zonder vlag-emoji worden het zwarte letters.
  function emojiVlaggen() {
    try {
      var c = document.createElement('canvas');
      c.width = 64; c.height = 32;
      var x = c.getContext('2d', { willReadFrequently: true });
      if (!x) return true;
      x.textBaseline = 'top';
      x.font = '28px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
      x.fillStyle = '#000';
      x.fillText('🇫🇷', 0, 0);
      var d = x.getImageData(0, 0, 64, 32).data;
      for (var i = 0; i < d.length; i += 4) {
        if (d[i + 3] > 200 && (Math.abs(d[i] - d[i + 1]) > 40 || Math.abs(d[i + 1] - d[i + 2]) > 40)) return true;
      }
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
