// Villa Les Deux Palmiers — Gestion Pro : interface disponible hors ligne.
// Les données ne passent jamais par ce cache : elles sont dans la base locale de l’appareil (IndexedDB) puis synchronisées.
const VERSION = '1.5.6';
const CACHE = 'villa-gestion-pro-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './vendor/supabase-2.58.0.min.js'];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('villa-') && key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Réseau d’abord (pour recevoir les mises à jour), mais bascule sur la copie locale si Internet est coupé ou trop lent.
function networkFirst(request, cacheKey) {
  return new Promise(resolve => {
    let settled = false;
    const fallback = async () => {
      if (settled) return;
      const hit = await caches.match(cacheKey || request, { ignoreSearch: true });
      if (hit) { settled = true; resolve(hit); }
    };
    const timer = setTimeout(fallback, NETWORK_TIMEOUT_MS);
    fetch(request).then(response => {
      clearTimeout(timer);
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(cacheKey || request, copy));
      }
      if (!settled) { settled = true; resolve(response); }
    }).catch(async () => {
      clearTimeout(timer);
      await fallback();
      if (!settled) { settled = true; resolve(Response.error()); }
    });
  });
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Base de données, connexion et temps réel : toujours en direct, jamais en cache.
  if (url.hostname.endsWith('supabase.co')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(new Request(request.url, { cache: 'reload' }), './index.html'));
    return;
  }
  if (url.origin === self.location.origin) event.respondWith(networkFirst(request));
});





