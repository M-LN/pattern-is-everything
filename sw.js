const CACHE_NAME = 'pattern-v14';
const SHELL = [
  '/index.html',
  '/css/main.css',
  '/css/sandbox.css',
  '/ml/index.html',
  '/markets/index.html',
  '/mlops/index.html',
  '/timeseries/index.html',
  '/markets/risk/index.html',
  '/sandbox/index.html',
  '/sandbox/ml/index.html',
  '/sandbox/ml/activities.js',
  '/sandbox/ml/engines.js',
  '/sandbox/markets/index.html',
  '/sandbox/markets/activities.js',
  '/sandbox/markets/engines.js',
  '/sandbox/stats/index.html',
  '/sandbox/stats/activities.js',
  '/sandbox/stats/engines.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
