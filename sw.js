// Service worker (GitHub Pages build only; build.py writes it to sw.js with the two hashes filled in).
// - vendor/ (Pyodide, the Java and C++ compilers, CodeMirror): cache first, kept until vendor/ itself changes,
//   so the 59 MB Python runtime downloads once, not on every visit.
// - js/, content/, assets/: cache first per site version (their URLs carry ?v=), older versions are dropped.
// - The page itself: network first, the cached copy when offline.
// Other hosts (fonts, Supabase) are not touched.
const APP = 'tolqyn-app-0846ec9b50', VENDOR = 'tolqyn-vendor-bfb2c920f6';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('tolqyn-') && k !== APP && k !== VENDOR).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function cacheFirst(name, req) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.type === 'basic') cache.put(req, res.clone()).catch(() => {});   // a full disk only skips caching
  return res;
}
async function networkFirst(req) {
  const cache = await caches.open(APP);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  } catch (e) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw e;
  }
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const path = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (req.mode === 'navigate') return e.respondWith(networkFirst(req));
  if (/^vendor\//.test(path)) return e.respondWith(cacheFirst(VENDOR, req));
  if (/^(js|content|assets)\//.test(path)) return e.respondWith(cacheFirst(APP, req));
});
