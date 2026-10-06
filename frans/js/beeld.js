/* ============================================================
   Leer Frans - eigen plaatjes  (js/beeld.js)  v0.4.0
   Created by DieOuwe · www.dieouwe.nl
   Spiegel van de audio-opzet: img/<id>.<ext> naast mp3/.../<id>.mp3.
   Heeft een woord een plaatje in img/, dan wordt dat getoond. Anders blijft de emoji staan.
   Zoekvolgorde per woord: webp, png, jpg, jpeg, svg. De eerste die bestaat wint.
   Voorbeeld: img/opa.png  of  img/opa.webp  (id uit js/words.js)
   PapImg.vul(span, woord) zet de emoji en vervangt die zodra een plaatje gevonden is.
   Gooit nooit een fout; ontbrekende plaatjes zijn gewoon "geen plaatje".
   ============================================================ */
(function () {
  'use strict';

  var EXTENSIES = ['webp', 'png', 'jpg', 'jpeg', 'svg'];
  var gevonden = {};       // id -> url of null (geen plaatje)
  var bezig = {};          // id -> Promise, zodat een woord maar één keer gezocht wordt

  function probeer(url) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.onload = function () { resolve(true); };
      im.onerror = function () { resolve(false); };
      im.src = url;
    });
  }

  // Resolve: url (string) of null
  function zoek(woord) {
    var id = woord.id;
    if (id in gevonden) return Promise.resolve(gevonden[id]);
    if (bezig[id]) return bezig[id];
    var i = 0;
    function volgende() {
      if (i >= EXTENSIES.length) { gevonden[id] = null; return Promise.resolve(null); }
      var url = 'img/' + id + '.' + EXTENSIES[i++];
      return probeer(url).then(function (ok) {
        if (ok) { gevonden[id] = url; return url; }
        return volgende();
      });
    }
    bezig[id] = volgende();
    return bezig[id];
  }

  // Maakt de emoji zichtbaar en zet er een plaatje overheen als dat bestaat.
  function vul(span, woord) {
    span.textContent = woord.icon;
    span.classList.add('pic-emoji');
    zoek(woord).then(function (url) {
      if (!url || !span.isConnected) return;
      var img = document.createElement('img');
      img.alt = woord.nl;
      img.decoding = 'async';
      img.draggable = false;
      img.src = url;
      span.textContent = '';
      span.classList.remove('pic-emoji');
      span.classList.add('pic-img');
      span.appendChild(img);
    });
  }

  window.PapImg = { zoek: zoek, vul: vul };
})();
