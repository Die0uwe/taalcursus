/* ============================================================
   Taalcursus - service worker hoofdpagina  (sw.js)  v0.1.0
   Created by DieOuwe · www.dieouwe.nl
   Bewaart alleen de hoofdpagina zelf voor offline gebruik. De cursussen (papiamento/ ...)
   hebben elk hun eigen service worker en worden hier met rust gelaten.
   ============================================================ */
const VERSIE = 'hub-v0.2.0';
const VOORVOEGSEL = VERSIE.split('-')[0] + '-';
const SCHIL = [
  './', 'index.html', 'hub.css', 'sfeer.css', 'sfeer.js', 'hub.js', 'cursussen.js', 'pwa.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];
const BEKEND = new Set(SCHIL.map((p) => new URL(p, self.registration.scope).href));

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

async function schil(req) {
  const cache = await caches.open(VERSIE);
  const bewaard = await cache.match(req, { ignoreSearch: true });
  const net = fetch(req).then((r) => { if (r && r.ok) cache.put(req, r.clone()); return r; }).catch(() => null);
  return bewaard || (await net) || Response.error();   // eerst bewaard (snel), ondertussen verversen
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  url.search = ''; url.hash = '';
  if (!BEKEND.has(url.href)) return;     // alles anders (cursussen, geluid, plaatjes): niet onze zaak
  e.respondWith(schil(req));
});
