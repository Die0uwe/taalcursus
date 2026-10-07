/* ============================================================
   Aprende Papiamentu - service worker  (sw.js)  v0.8.0
   Created by DieOuwe · www.dieouwe.nl
   Doel: de app werkt ook zonder internet nadat hij één keer geladen is.
   - App-bestanden (html, css, js, iconen): worden bij installatie bewaard.
   - mp3/ en img/: worden bewaard zodra ze voor het eerst gebruikt zijn.
   - Verhoog VERSIE bij elke release, dan haalt de app de nieuwe bestanden op.
   ============================================================ */
const VERSIE = 'pap-v0.14.1';
const VOORVOEGSEL = VERSIE.split('-')[0] + '-';   // elke cursus ruimt alleen zijn eigen oude caches op
const SCHIL = [
  './', 'index.html', 'manifest.webmanifest',
  'css/style.css', 'css/kleuren.css',
  'js/words.js', 'js/game.js', 'js/audio.js', 'js/beeld.js', 'js/app.js', 'js/delen.js', 'js/vlaggen.js', 'img/vlag-cw.svg', 'img/vlag-aw.svg', 'img/vlag-bn.svg', 'js/pwa.js',
  'ui/meisje-boven.webp', 'ui/mascotte-goed.webp', 'ui/mascotte-fout.webp',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSIE).then((c) => c.addAll(SCHIL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n.startsWith(VOORVOEGSEL) && n !== VERSIE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Safari vraagt audio in stukjes (Range). Dan moeten we ook een stukje terugsturen.
async function metBereik(req, resp) {
  const bereik = req.headers.get('range');
  if (!bereik || !resp) return resp;
  const m = /bytes=(\d*)-(\d*)/.exec(bereik);
  if (!m) return resp;
  const buf = await resp.clone().arrayBuffer();
  const start = m[1] ? parseInt(m[1], 10) : 0;
  const eind = m[2] ? Math.min(parseInt(m[2], 10), buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, eind + 1), {
    status: 206, statusText: 'Partial Content',
    headers: {
      'Content-Type': resp.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': 'bytes ' + start + '-' + eind + '/' + buf.byteLength,
      'Content-Length': String(eind - start + 1)
    }
  });
}

async function media(req) {
  const cache = await caches.open(VERSIE);
  const url = req.url;
  let resp = await cache.match(url);
  if (!resp) {
    try {
      const vol = await fetch(url);           // altijd het hele bestand ophalen en bewaren
      if (vol.ok && vol.status === 200) { cache.put(url, vol.clone()); resp = vol; }
      else return vol;                        // 404: gewoon doorgeven, niet bewaren
    } catch (err) { return Response.error(); }
  }
  return metBereik(req, resp);
}

async function schil(req) {
  // Eerst het netwerk, zodat een nieuwe upload meteen aankomt (geen "twee keer herladen"). Offline: de bewaarde kopie.
  const cache = await caches.open(VERSIE);
  try {
    const r = await fetch(req, { cache: 'no-cache' });
    if (r && r.ok) cache.put(req, r.clone());
    return r;
  } catch (_) {
    return (await cache.match(req, { ignoreSearch: true })) || Response.error();
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (/\/(mp3|img)\//.test(url.pathname)) { e.respondWith(media(req)); return; }
  e.respondWith(schil(req));
});
