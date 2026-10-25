const CACHE = 'villa-deux-palmiers-finance-v4';
const SUPABASE_CLIENT = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.58.0/dist/umd/supabase.min.js';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);
    try {
      const request = new Request(SUPABASE_CLIENT, { mode: 'no-cors' });
      const response = await fetch(request);
      if (response.ok || response.type === 'opaque') await cache.put(request, response.clone());
    } catch (_) {
      // The app can still install online; CDN caching is retried on a later fetch.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Database and authentication responses are always live and are never cached.
  if (url.hostname.endsWith('supabase.co')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(new Request(request, { cache: 'reload' })).then(response => {
        if (response.ok) caches.open(CACHE).then(cache => cache.put('./index.html', response.clone()));
        return response;
      }).catch(async () => (await caches.match('./index.html')) || Response.error())
    );
    return;
  }

  if (url.origin === self.location.origin || url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok || response.type === 'opaque') {
          caches.open(CACHE).then(cache => cache.put(request, response.clone()));
        }
        return response;
      }).catch(async () => (await caches.match(request)) || Response.error())
    );
  }
});

