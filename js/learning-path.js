(function() {
  const PATHS = {
    'start-ml-foundations': {
      title: 'ML Foundations',
      start: '/start/#start-ml-foundations',
      steps: [
        ['Know Your Data', '/stats/?lp=start-ml-foundations&lstep=1#distribution-shape'],
        ['How Models Learn', '/ml-math/?lp=start-ml-foundations&lstep=2#gradient'],
        ['Classification Metrics', '/stats/?lp=start-ml-foundations&lstep=3#confusion-matrix'],
        ['Honest Evaluation', '/stats/?lp=start-ml-foundations&lstep=4#cross-validation']
      ]
    },
    'start-real-data-workflow': {
      title: 'First Real-Data Workflow',
      start: '/start/#start-real-data-workflow',
      steps: [
        ['Housing Regression', '/cases/?lp=start-real-data-workflow&lstep=1#housing-regression'],
        ['Bias vs Variance', '/ml-math/?lp=start-real-data-workflow&lstep=2#bias-variance'],
        ['Regularization', '/ml-math/?lp=start-real-data-workflow&lstep=3#regularization'],
        ['Housing Notebook', '/lite/lab/?path=case-housing-regression.ipynb&lp=start-real-data-workflow&lstep=4']
      ]
    },
    'start-time-series-drift': {
      title: 'Time Series and Drift',
      start: '/start/#start-time-series-drift',
      steps: [
        ['Stationarity', '/timeseries/?lp=start-time-series-drift&lstep=1#stationarity'],
        ['Walk-Forward Validation', '/timeseries/?lp=start-time-series-drift&lstep=2#cross-validation-ts'],
        ['Data Drift', '/stats/?lp=start-time-series-drift&lstep=3#data-drift'],
        ['Energy Forecast', '/cases/?lp=start-time-series-drift&lstep=4#energy-forecast']
      ]
    },
    'start-market-evidence': {
      title: 'Explainability and Market Evidence',
      start: '/start/#start-market-evidence',
      steps: [
        ['SHAP Values', '/stats/?lp=start-market-evidence&lstep=1#shap-values'],
        ['Market Evidence Legend', '/markets/?lp=start-market-evidence&lstep=2'],
        ['Validate Indicators', '/markets/indicators/?lp=start-market-evidence&lstep=3#rsi'],
        ['Market Backtest', '/cases/?lp=start-market-evidence&lstep=4#market-backtest']
      ]
    },
    'home-ml-fundamentals': {
      title: 'ML Fundamentals',
      start: '/#home-ml-fundamentals',
      steps: [
        ['Distribution Shape', '/stats/?lp=home-ml-fundamentals&lstep=1#distribution-shape'],
        ['Gradient Descent', '/ml-math/?lp=home-ml-fundamentals&lstep=2#gradient'],
        ['Confusion Matrix', '/stats/?lp=home-ml-fundamentals&lstep=3#confusion-matrix'],
        ['ROC & AUC', '/stats/?lp=home-ml-fundamentals&lstep=4#roc-auc'],
        ['Cross-Validation', '/stats/?lp=home-ml-fundamentals&lstep=5#cross-validation']
      ]
    },
    'home-real-data-model': {
      title: 'First Real-Data Model',
      start: '/#home-real-data-model',
      steps: [
        ['Housing Regression', '/cases/?lp=home-real-data-model&lstep=1#housing-regression'],
        ['Regression Metrics', '/stats/?lp=home-real-data-model&lstep=2#regression-metrics'],
        ['Cross-Validation', '/stats/?lp=home-real-data-model&lstep=3#cross-validation'],
        ['SHAP Values', '/stats/?lp=home-real-data-model&lstep=4#shap-values'],
        ['ML Lab', '/sandbox/ml/?lp=home-real-data-model&lstep=5#linear-regression']
      ]
    },
    'home-time-series-mastery': {
      title: 'Time Series Mastery',
      start: '/#home-time-series-mastery',
      steps: [
        ['Stationarity', '/timeseries/?lp=home-time-series-mastery&lstep=1#stationarity'],
        ['ARIMA', '/timeseries/?lp=home-time-series-mastery&lstep=2#arima'],
        ['Prophet', '/timeseries/?lp=home-time-series-mastery&lstep=3#prophet'],
        ['Walk-Forward Validation', '/stats/?lp=home-time-series-mastery&lstep=4#walk-forward'],
        ['Anomaly Detection', '/timeseries/?lp=home-time-series-mastery&lstep=5#anomaly-detection']
      ]
    },
    'home-llm-engineering': {
      title: 'LLM Engineering',
      start: '/#home-llm-engineering',
      steps: [
        ['Tokenization', '/llm/?lp=home-llm-engineering&lstep=1#tokenization'],
        ['Self-Attention', '/llm/?lp=home-llm-engineering&lstep=2#self-attention'],
        ['RAG', '/llm/?lp=home-llm-engineering&lstep=3#rag'],
        ['RLHF', '/llm/?lp=home-llm-engineering&lstep=4#rlhf'],
        ['Quantization', '/llm/?lp=home-llm-engineering&lstep=5#quantization']
      ]
    },
    'home-market-intuition': {
      title: 'Market Intuition',
      start: '/#home-market-intuition',
      steps: [
        ['Fear & Greed', '/markets/psychology/?lp=home-market-intuition&lstep=1#fear-and-greed'],
        ['Value at Risk', '/markets/risk/?lp=home-market-intuition&lstep=2#value-at-risk'],
        ['Moving Averages', '/markets/indicators/?lp=home-market-intuition&lstep=3#sma'],
        ['Sharpe Ratio', '/stats/?lp=home-market-intuition&lstep=4#sharpe-ratio'],
        ['Support & Resistance', '/markets/charts/?lp=home-market-intuition&lstep=5#support-resistance']
      ]
    }
  };
  const STORAGE_PREFIX = 'patternPortal.learningPathProgress.';

  function toUrl(path) {
    return new URL(path, window.location.origin).href;
  }

  function html(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function storageKey(pathId) {
    return STORAGE_PREFIX + pathId;
  }

  function readProgress(pathId) {
    try {
      const values = JSON.parse(localStorage.getItem(storageKey(pathId)) || '[]');
      return new Set(Array.isArray(values) ? values.map(Number).filter(Boolean) : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveProgress(pathId, progress) {
    try {
      localStorage.setItem(storageKey(pathId), JSON.stringify(Array.from(progress).sort((a, b) => a - b)));
    } catch (error) {}
  }

  function markStep(pathId, stepNumber) {
    const progress = readProgress(pathId);
    progress.add(stepNumber);
    saveProgress(pathId, progress);
    return progress;
  }

  function renderStepPills(pathId, path, currentStep, progress) {
    return path.steps.map((step, index) => {
      const number = index + 1;
      const isComplete = progress.has(number);
      const isCurrent = number === currentStep;
      const classes = ['learning-path-step'];
      if (isComplete) classes.push('is-complete');
      if (isCurrent) classes.push('is-current');
      return `<a class="${classes.join(' ')}" href="${toUrl(step[1])}" title="Step ${number}: ${html(step[0])}" aria-label="Step ${number}: ${html(step[0])}${isComplete ? ', completed' : ''}">${isComplete ? '&#10003;' : number}</a>`;
    }).join('');
  }

  function progressCount(path, progress) {
    return path.steps.filter((_, stepIndex) => progress.has(stepIndex + 1)).length;
  }

  function progressFromUrl(href) {
    try {
      const url = new URL(href, window.location.href);
      const pathId = url.searchParams.get('lp');
      const stepNumber = Number(url.searchParams.get('lstep'));
      if (!pathId || !PATHS[pathId] || !stepNumber) return null;
      return { pathId, stepNumber };
    } catch (error) {
      return null;
    }
  }

  function markLiteStepOnClick(event) {
    const link = event.target.closest('a[href]');
    if (!link || !link.href.includes('/lite/')) return;
    const progress = progressFromUrl(link.href);
    if (progress) markStep(progress.pathId, progress.stepNumber);
  }

  function decorateOverviewLinks(container, pathId, progress) {
    container.querySelectorAll('a[href]').forEach(link => {
      const linkProgress = progressFromUrl(link.href);
      if (!linkProgress || linkProgress.pathId !== pathId) return;

      link.classList.add('learning-path-step-link');
      if (!progress.has(linkProgress.stepNumber)) return;

      link.classList.add('is-complete');
      if (link.classList.contains('step-card')) {
        if (!link.querySelector('.learning-path-card-check')) {
          link.insertAdjacentHTML('beforeend', '<div class="learning-path-card-check">&#10003; Completed</div>');
        }
        return;
      }

      const next = link.nextElementSibling;
      if (!next || !next.classList.contains('learning-path-inline-check')) {
        link.insertAdjacentHTML('afterend', ' <span class="learning-path-inline-check">&#10003; Done</span>');
      }
    });
  }

  function renderOverviewProgress() {
    let rendered = false;
    Object.entries(PATHS).forEach(([pathId, path]) => {
      const container = document.getElementById(pathId);
      if (!container) return;

      rendered = true;
      const progress = readProgress(pathId);
      const completedCount = progressCount(path, progress);
      const target = container.querySelector('.path-head') || container.querySelector('.lp-desc') || container;
      const status = container.querySelector('.learning-path-overview-status') || document.createElement('div');

      container.classList.add('learning-path-overview');
      container.classList.toggle('is-complete', completedCount === path.steps.length && path.steps.length > 0);
      status.className = 'learning-path-overview-status';
      status.innerHTML = `
        <div class="learning-path-overview-count">${completedCount} / ${path.steps.length} done</div>
        <div class="learning-path-overview-steps">${renderStepPills(pathId, path, null, progress)}</div>
      `;

      if (!status.parentElement) target.insertAdjacentElement('afterend', status);
      decorateOverviewLinks(container, pathId, progress);
    });

    if (rendered) injectStyles();
  }

  function injectStyles() {
    if (document.getElementById('learning-path-style')) return;
    const style = document.createElement('style');
    style.id = 'learning-path-style';
    style.textContent = `
      .learning-path-bar {
        position: fixed;
        left: 50%;
        bottom: 18px;
        transform: translateX(-50%);
        width: min(920px, calc(100vw - 28px));
        z-index: 260;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 14px;
        align-items: center;
        padding: 12px 14px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: color-mix(in srgb, var(--surface) 94%, transparent);
        box-shadow: var(--shadow-lg);
        backdrop-filter: blur(14px);
      }
      .learning-path-meta { min-width: 0; }
      .learning-path-kicker {
        font: 700 9px var(--mono);
        letter-spacing: .16em;
        text-transform: uppercase;
        color: var(--accent2);
        margin-bottom: 3px;
      }
      .learning-path-title {
        font: 700 13px var(--sans);
        color: var(--text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .learning-path-title span {
        color: var(--muted);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 400;
      }
      .learning-path-steps {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 8px;
      }
      .learning-path-step {
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--border);
        background: var(--surface2);
        color: var(--muted);
        font: 700 10px var(--mono);
        text-decoration: none;
      }
      .learning-path-step.is-complete {
        border-color: rgba(42,125,95,.36);
        background: rgba(42,125,95,.12);
        color: var(--accent2);
      }
      .learning-path-step.is-current {
        border-color: var(--accent3);
        box-shadow: 0 0 0 3px rgba(41,85,160,.12);
      }
      .learning-path-overview-status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 0 0 14px;
        padding: 10px 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
      }
      .lp-card .learning-path-overview-status {
        margin: 14px 0 0;
        padding: 9px 0 0;
        border-width: 1px 0 0;
        border-radius: 0;
        background: transparent;
      }
      .learning-path-overview-count {
        color: var(--accent2);
        font: 700 10px var(--mono);
        letter-spacing: .14em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .learning-path-overview-steps {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 5px;
      }
      .learning-path-step-link.is-complete.step-card {
        border-color: rgba(42,125,95,.36);
        background: linear-gradient(180deg, rgba(42,125,95,.09), transparent 58%), var(--surface);
      }
      .learning-path-card-check {
        display: inline-flex;
        margin-top: 14px;
        color: var(--accent2);
        font: 700 10px var(--mono);
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .learning-path-inline-check {
        color: var(--accent2);
        font: 700 10px var(--mono);
        letter-spacing: .08em;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .learning-path-overview.is-complete .learning-path-overview-status {
        border-color: rgba(42,125,95,.36);
        background: rgba(42,125,95,.06);
      }
      .learning-path-actions {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .learning-path-actions a {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font: 700 10px var(--mono);
        text-decoration: none;
        color: var(--accent3);
        border: 1px solid rgba(41,85,160,.22);
        background: rgba(41,85,160,.06);
        border-radius: 5px;
        padding: 6px 9px;
        white-space: nowrap;
      }
      .learning-path-actions a.learning-path-next {
        color: #fff;
        background: var(--accent3);
        border-color: var(--accent3);
      }
      .learning-path-actions a.is-disabled {
        color: var(--border2);
        border-color: var(--border);
        background: transparent;
        pointer-events: none;
      }
      @media (max-width: 720px) {
        .learning-path-bar { grid-template-columns: 1fr; bottom: 10px; }
        .learning-path-actions { justify-content: flex-start; }
        .learning-path-actions a { flex: 1 1 auto; text-align: center; }
        .learning-path-overview-status { align-items: flex-start; flex-direction: column; }
        .learning-path-overview-steps { justify-content: flex-start; }
        .learning-path-step { width: 40px; height: 40px; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderBar() {
    const params = new URLSearchParams(window.location.search);
    const pathId = params.get('lp');
    if (!pathId || !PATHS[pathId]) return;

    const path = PATHS[pathId];
    const stepNumber = Math.max(1, Math.min(path.steps.length, Number(params.get('lstep')) || 1));
    const index = stepNumber - 1;
    const current = path.steps[index];
    const previous = path.steps[index - 1];
    const next = path.steps[index + 1];
    const progress = markStep(pathId, stepNumber);
    const completedCount = progressCount(path, progress);

    injectStyles();
    const bar = document.createElement('aside');
    bar.className = 'learning-path-bar';
    bar.setAttribute('aria-label', 'Learning path progress');
    bar.innerHTML = `
      <div class="learning-path-meta">
        <div class="learning-path-kicker">Learning Path · ${completedCount} / ${path.steps.length} done</div>
        <div class="learning-path-title">${html(path.title)} <span>· ${html(current[0])}</span></div>
        <div class="learning-path-steps" aria-label="Completed learning path steps">
          ${renderStepPills(pathId, path, stepNumber, progress)}
        </div>
      </div>
      <div class="learning-path-actions">
        <a href="${toUrl(path.start)}">Path Overview</a>
        <a class="${previous ? '' : 'is-disabled'}" href="${previous ? toUrl(previous[1]) : '#'}">Previous</a>
        <a class="learning-path-next ${next ? '' : 'is-disabled'}" href="${next ? toUrl(next[1]) : '#'}">${next ? `Next: ${html(next[0])}` : 'Path Complete'}</a>
      </div>
    `;
    document.body.appendChild(bar);
  }

  function scrollToHashAfterRender() {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: 'start' });
    }, 180);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderBar();
      renderOverviewProgress();
      document.addEventListener('click', markLiteStepOnClick);
      scrollToHashAfterRender();
    });
  } else {
    renderBar();
    renderOverviewProgress();
    document.addEventListener('click', markLiteStepOnClick);
    scrollToHashAfterRender();
  }
})();
