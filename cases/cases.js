function jupyterLiteNotebook(path) {
  return `../lite/lab/?path=${encodeURIComponent(path)}`;
}

/* cases:start — written by scripts/build-cases.py from scripts/cases/*.py; edit those. */
const CASES = [
  {
    "id": "housing-regression",
    "level": "Beginner",
    "badge": "Regression",
    "evidenceClass": "proven",
    "evidenceLabel": "Statistical",
    "title": "California housing: <em>where the score comes from</em>",
    "kicker": "Regression · 20,640 districts · 1990 census",
    "summary": "How well can a model predict the median house value of a California district from census data — and how much of the score belongs to the model, and how much to the way it is tested?",
    "finding": "Gradient boosting scores R² 0.84 with random cross-validation and 0.68 on regions it has not seen; a model that only knows the location drops from 0.79 to 0.17.",
    "page": "/cases/housing-regression/",
    "datasetName": "California Housing",
    "datasetUrl": "https://www.dcc.fc.up.pt/~ltorgo/Regression/cal_housing.html",
    "notebookPath": "case-housing-regression.ipynb",
    "runnable": true,
    "steps": [
      "Look before modelling",
      "A baseline, then a test that matches the question",
      "A stronger model, the same gap",
      "What the cap does to the errors"
    ],
    "topics": [
      [
        "Cross-Validation Done Right",
        "/stats/cross-validation/"
      ],
      [
        "Cross-Validation for TS",
        "/timeseries/cross-validation-ts/"
      ],
      [
        "Regression Metrics",
        "/stats/regression-metrics/"
      ],
      [
        "Outlier Detection",
        "/stats/outlier-detection/"
      ],
      [
        "Bias-Variance Tradeoff",
        "/ml-math/bias-variance/"
      ]
    ],
    "lab": [
      "Linear Regression Lab",
      "/sandbox/ml/#linear-regression"
    ]
  },
  {
    "id": "credit-default",
    "level": "Intermediate",
    "badge": "Classification",
    "evidenceClass": "proven",
    "evidenceLabel": "Statistical",
    "title": "Credit card default: <em>82% accurate, most defaults missed</em>",
    "kicker": "Classification · 30,000 clients · Taiwan, 2005",
    "summary": "Which credit card clients will miss next month’s payment? A model that is right four times in five sounds useful — this case asks what it actually catches, and what the data dictionary did not say.",
    "finding": "82.3% accurate, 4.4 points better than never predicting a default. At a threshold of 0.5 it catches 36% of defaults; at the cost-based threshold, 72%.",
    "page": "/cases/credit-default/",
    "datasetName": "Default of Credit Card Clients",
    "datasetUrl": "https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients",
    "notebookPath": "case-credit-default.ipynb",
    "runnable": true,
    "steps": [
      "The number to beat",
      "The data dictionary and the data disagree",
      "Two models, and what 0.5 hides",
      "One column against the model",
      "Choose the threshold from the costs"
    ],
    "topics": [
      [
        "Sampling & Class Imbalance",
        "/stats/class-imbalance/"
      ],
      [
        "Confusion Matrix & Classification Metrics",
        "/stats/confusion-matrix/"
      ],
      [
        "ROC & AUC Curves",
        "/stats/roc-auc/"
      ],
      [
        "The Threshold",
        "/essays/essay-threshold/"
      ],
      [
        "Missing Data Strategies",
        "/stats/missing-data/"
      ]
    ],
    "lab": [
      "Classification Boundary Lab",
      "/sandbox/ml/#classification-boundary"
    ]
  },
  {
    "id": "energy-forecast",
    "level": "Beginner",
    "badge": "Time Series",
    "evidenceClass": "proven",
    "evidenceLabel": "Statistical",
    "title": "One household’s electricity: <em>the average that is hard to beat</em>",
    "kicker": "Forecasting · 4 years of minute readings · one house near Paris",
    "summary": "How much electricity will this household use tomorrow? Four years of minute-by-minute readings — and the question of how much any model adds to simply averaging the last week.",
    "finding": "The mean of the last 7 days forecasts tomorrow within 4.36 kWh on average; a 13-feature regression improves on it by 2%.",
    "page": "/cases/energy-forecast/",
    "datasetName": "Individual Household Electric Power Consumption",
    "datasetUrl": "https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption",
    "notebookPath": "case-energy-forecast.ipynb",
    "runnable": true,
    "steps": [
      "Missing minutes look like low demand",
      "Repair the days, and keep track of which ones",
      "Season and weekday",
      "Six naive forecasts, tested on the last year",
      "A model against the average"
    ],
    "topics": [
      [
        "Backtesting Forecasts",
        "/timeseries/backtesting-forecasts/"
      ],
      [
        "Decomposition",
        "/timeseries/decomposition/"
      ],
      [
        "Exponential Smoothing",
        "/timeseries/exponential-smoothing/"
      ],
      [
        "Missing Data Strategies",
        "/stats/missing-data/"
      ],
      [
        "Resampling & Frequency",
        "/timeseries/resampling/"
      ]
    ],
    "lab": [
      "Timeseries Forecast Lab",
      "/sandbox/ml/#timeseries-forecast"
    ]
  },
  {
    "id": "market-backtest",
    "level": "Advanced",
    "badge": "Markets",
    "evidenceClass": "heuristic",
    "evidenceLabel": "Heuristic",
    "title": "A century of the 200-day rule: <em>where the edge came from</em>",
    "kicker": "Backtest · US stock market, daily, 1926–2026",
    "summary": "Stay in the stock market while it is above its 200-day average, move to Treasury bills when it falls below: one of the oldest trend-following rules. Does it beat simply holding the market — and when?",
    "finding": "10.5% a year against 9.8% for buy-and-hold since 1927 — but the edge comes from 1927–1975. Since 2001: 7.1% against 9.5%. With a one-day look-ahead bug: 18.7%.",
    "page": "/cases/market-backtest/",
    "datasetName": "Fama/French research factors, daily",
    "datasetUrl": "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html",
    "notebookPath": "case-market-backtest.ipynb",
    "runnable": false,
    "steps": [
      "A hundred years of daily returns",
      "The rule, without peeking",
      "Split the century",
      "The bug that nearly doubles the result"
    ],
    "topics": [
      [
        "Walk-Forward Validation",
        "/stats/walk-forward/"
      ],
      [
        "Simple Moving Average",
        "/markets/indicators/sma/"
      ],
      [
        "Drawdown Analysis",
        "/markets/risk/drawdown-analysis/"
      ],
      [
        "The Garden of Forking Paths",
        "/essays/essay-forking/"
      ],
      [
        "Tail Risk",
        "/markets/risk/tail-risk/"
      ]
    ],
    "lab": [
      "Markets Paper Trading Lab",
      "/sandbox/markets/#paper-trading"
    ]
  }
];
/* cases:end */

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const LEVEL_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 };

function difficultyDots(level) {
  const rank = LEVEL_RANK[level] || 1;
  let dots = '';
  for (let i = 1; i <= 3; i++) {
    dots += `<span class="dd-dot${i <= rank ? ' on' : ''}"></span>`;
  }
  return `<span class="difficulty" role="img" title="${escapeHTML(level)} difficulty" aria-label="${escapeHTML(level)} difficulty">${dots}</span>`;
}

function renderCase(caseData) {
  const topicLinks = caseData.topics
    .map(([label, href]) => `<a href="${href}">${escapeHTML(label)}</a>`)
    .join('');
  const stepItems = caseData.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('');
  return `
    <article class="case-card" id="${caseData.id}" data-badge="${escapeHTML(caseData.badge)}" data-level="${escapeHTML(caseData.level)}">
      <div class="case-kicker">
        <span class="tag t1">${escapeHTML(caseData.level)}</span>
        ${difficultyDots(caseData.level)}
        <span class="tag t3">${escapeHTML(caseData.badge)}</span>
        <span class="evidence-badge ${caseData.evidenceClass}" title="Evidence framing for this case">${escapeHTML(caseData.evidenceLabel)}</span>
      </div>
      <h2 class="case-title"><a href="${caseData.page}">${caseData.title}</a></h2>
      <p class="case-summary">${escapeHTML(caseData.summary)}</p>
      <div class="howto-pitfall case-finding"><strong>Finding:</strong> ${escapeHTML(caseData.finding)}</div>
      <div class="case-primary-actions">
        <a class="case-jupyterlite-cta" href="${caseData.page}">Read the case study →</a>
      </div>

      <div class="dataset-card">
        <div class="dataset-card-title">Real data</div>
        <a href="${caseData.datasetUrl}" target="_blank" rel="noopener">${escapeHTML(caseData.datasetName)}</a>
        <div class="ds-note">${escapeHTML(caseData.kicker)}</div>
      </div>

      <div class="howto">
        <div class="howto-title">The steps</div>
        <ol>${stepItems}</ol>
        <div class="dep-note">${caseData.runnable ? 'Every step runs in the browser, on the real data.' : 'Shown with its results; run it in the notebook, which downloads the data.'}</div>
      </div>

      <div class="why-matters">
        <div class="why-matters-title">Connect the pattern</div>
        <div class="case-links">${topicLinks}<a href="${caseData.lab[1]}">${escapeHTML(caseData.lab[0])}</a></div>
      </div>

      <div class="case-links">
        <a href="${jupyterLiteNotebook(caseData.notebookPath)}" target="_blank" rel="noopener">Open the notebook in JupyterLite</a>
        <a href="../notebooks/${caseData.notebookPath}" download>Download the notebook</a>
      </div>
    </article>`;
}

function renderCases() {
  const grid = document.getElementById('caseGrid');
  if (!grid) return;
  grid.innerHTML = CASES.map(renderCase).join('');
  buildFilters();
  applyFilters();
}

let activeDomain = 'all';
let activeLevel = 'all';

function buildFilters() {
  const bar = document.getElementById('caseFilters');
  if (!bar) return;
  const domains = ['all', ...Array.from(new Set(CASES.map(c => c.badge)))];
  const levels = ['all', ...Array.from(new Set(CASES.map(c => c.level)))
    .sort((a, b) => (LEVEL_RANK[a] || 0) - (LEVEL_RANK[b] || 0))];
  const chip = (type, value) =>
    `<button class="fchip${value === 'all' ? ' active' : ''}" type="button" data-type="${type}" data-value="${escapeHTML(value)}">${value === 'all' ? 'All' : escapeHTML(value)}</button>`;
  bar.innerHTML =
    `<div class="filter-row"><span class="filter-label">Domain</span>${domains.map(d => chip('domain', d)).join('')}</div>` +
    `<div class="filter-row"><span class="filter-label">Level</span>${levels.map(l => chip('level', l)).join('')}</div>`;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.fchip');
    if (!btn) return;
    const { type, value } = btn.dataset;
    if (type === 'domain') activeDomain = value;
    else if (type === 'level') activeLevel = value;
    bar.querySelectorAll(`.fchip[data-type="${type}"]`).forEach(b => b.classList.toggle('active', b === btn));
    applyFilters();
  });
}

function applyFilters() {
  let shown = 0;
  document.querySelectorAll('.case-card').forEach(card => {
    const okD = activeDomain === 'all' || card.dataset.badge === activeDomain;
    const okL = activeLevel === 'all' || card.dataset.level === activeLevel;
    const show = okD && okL;
    card.hidden = !show;
    if (show) shown++;
  });
  const count = document.getElementById('filterCount');
  if (count) {
    count.textContent = (activeDomain === 'all' && activeLevel === 'all')
      ? `${CASES.length} cases`
      : `Showing ${shown} of ${CASES.length} cases`;
  }
  const empty = document.getElementById('casesEmpty');
  if (empty) empty.hidden = shown !== 0;
  // Keep the floating "On this page" outline in sync with visible cases
  if (typeof window.__refreshOutline === 'function') window.__refreshOutline();
}

function resetFilters() {
  activeDomain = 'all';
  activeLevel = 'all';
  document.querySelectorAll('#caseFilters .fchip').forEach(b =>
    b.classList.toggle('active', b.dataset.value === 'all'));
  applyFilters();
}

document.addEventListener('DOMContentLoaded', renderCases);
