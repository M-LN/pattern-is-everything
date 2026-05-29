const CACHE_NAME = 'pattern-v62';
const OFFLINE_URL = '/404.html';
const SHELL = [
  '/index.html',
  '/404.html',
  '/css/main.css',
  '/css/sandbox.css',
  '/js/evidence-taxonomy.js',
  '/js/practical-template.js',
  '/js/market-evidence-warning.js',
  '/js/sandbox-build-mode.js',
  '/js/learning-path.js',
  '/js/ui-enhance.js',
  '/start/index.html',
  '/stats/index.html',
  '/ml-math/index.html',
  '/ml/index.html',
  '/markets/index.html',
  '/markets/indicators/index.html',
  '/markets/psychology/index.html',
  '/markets/charts/index.html',
  '/llm/index.html',
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
  '/notebooks/case-credit-fraud.ipynb',
  '/notebooks/case-housing-regression.ipynb',
  '/notebooks/case-energy-forecast.ipynb',
  '/notebooks/case-market-backtest.ipynb',
  '/notebooks/pattern-portal-real-data-lab-browser.ipynb',
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
  // Do NOT skipWaiting here — let the page show an update banner and
  // call SKIP_WAITING when the user clicks Reload.
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
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
  const url = new URL(e.request.url);
  if (url.pathname === '/lite' || url.pathname.startsWith('/lite/')) return;
  const isNavigation = e.request.mode === 'navigate';
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Only cache successful responses (avoid caching 404s/errors)
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        // If the navigation returned a 404 from the network, serve the offline page
        if (isNavigation && res && res.status === 404) {
          return caches.match(OFFLINE_URL).then(m => m || res);
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => {
        if (cached) return cached;
        if (isNavigation) return caches.match(OFFLINE_URL);
        return new Response('', { status: 504, statusText: 'Offline' });
      }))
  );
});
