const CACHE_NAME = 'pattern-v25';
const SHELL = [
  '/index.html',
  '/css/main.css',
  '/css/sandbox.css',
  '/js/evidence-taxonomy.js',
  '/js/practical-template.js',
  '/js/market-evidence-warning.js',
  '/js/sandbox-build-mode.js',
  '/start/index.html',
  '/ml/index.html',
  '/markets/index.html',
  '/essays/index.html',
  '/essays/topics.js',
  '/essays/visualizations.js',
  '/cases/index.html',
  '/cases/cases.js',
  '/cases/datasets/fraud_sample.csv',
  '/cases/datasets/housing_sample.csv',
  '/cases/datasets/energy_demand_sample.csv',
  '/cases/datasets/market_ohlcv_sample.csv',
  '/notebooks/README.md',
  '/notebooks/lab.html',
  '/notebooks/lab.js',
  '/notebooks/pattern-portal-real-data-lab.ipynb',
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
