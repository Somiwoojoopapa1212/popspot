// v:2026-05-14T06:52:26
const CACHE = 'popspot-v:2026-05-14T06:52:26';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); return; }
  if (/firebase|googleapis|openstreetmap|cartocdn|unpkg|kakao|fonts/.test(e.request.url)) { e.respondWith(fetch(e.request)); return; }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
