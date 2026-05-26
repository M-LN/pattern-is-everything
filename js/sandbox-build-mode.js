(function() {
  const lab = document.documentElement.getAttribute('data-lab') || 'sandbox';
  const storageKey = `pattern-build-runs:${lab}`;

  const PY_TEMPLATES = {
    'linear-regression': `# Linear regression experiment exported from Pattern Portal
import json
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

experiment = __EXPERIMENT_JSON__
points = np.array(experiment['state'].get('points', []), dtype=float)
if len(points) >= 2:
    X = points[:, [0]]
    y = points[:, 1]
    model = LinearRegression().fit(X, y)
    pred = model.predict(X)
    print({'slope': model.coef_[0], 'intercept': model.intercept_, 'mse': mean_squared_error(y, pred)})`,
    'classification-boundary': `# Classification boundary starter exported from Pattern Portal
import json
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

experiment = __EXPERIMENT_JSON__
print('Controls:', experiment['controls'])
print('Metrics:', experiment['metrics'])
# Recreate with your dataset: X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y)
# model = KNeighborsClassifier(n_neighbors=int(experiment['controls'].get('K (for KNN)', 5))).fit(X_train, y_train)
# print(classification_report(y_test, model.predict(X_test)))`,
    'timeseries-forecast': `# Time-series forecast starter exported from Pattern Portal
import json
from sklearn.metrics import mean_absolute_error, mean_squared_error

experiment = __EXPERIMENT_JSON__
print('Forecast setup:', experiment['controls'])
print('Sandbox metrics:', experiment['metrics'])
# Use the same discipline in notebooks: split by time, compare against a naive baseline, report MAE/RMSE by horizon.`,
    'paper-trading': `# Market backtest starter exported from Pattern Portal
import json

experiment = __EXPERIMENT_JSON__
print('Strategy controls:', experiment['controls'])
print('Run metrics:', experiment['metrics'])
# Treat this as an educational run. Validate with point-in-time data, transaction costs, slippage, and walk-forward testing.`
  };

  function readRuns() {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); }
    catch { return []; }
  }

  function writeRuns(runs) {
    localStorage.setItem(storageKey, JSON.stringify(runs.slice(-40)));
  }

  function activeTopic() {
    return document.querySelector('.topic.active');
  }

  function titleFor(id) {
    if (window.TOPIC_NAMES && window.TOPIC_NAMES[id]) return window.TOPIC_NAMES[id];
    return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function collectControls(scope) {
    const controls = {};
    scope.querySelectorAll('.ctrl-row').forEach(row => {
      const label = row.querySelector('.ctrl-label')?.textContent?.trim();
      const input = row.querySelector('input, select');
      if (!label || !input) return;
      const selected = input.tagName === 'SELECT' ? input.options[input.selectedIndex]?.textContent : input.value;
      controls[label] = selected || input.value;
    });
    return controls;
  }

  function collectMetrics(scope) {
    const metrics = {};
    scope.querySelectorAll('.metric').forEach(metric => {
      const label = metric.querySelector('.metric-label')?.textContent?.trim();
      const value = metric.querySelector('.metric-val')?.textContent?.trim();
      if (label && value) metrics[label] = value;
    });
    return metrics;
  }

  function collectState(topicId) {
    const state = {};
    if (topicId === 'linear-regression' && window.LR) {
      state.points = LR.points.map(p => [Number(p.x.toFixed(4)), Number(p.y.toFixed(4))]);
      state.model = { slope: LR.m, intercept: LR.b, mse: LR.mse, iterations: LR.iteration };
    }
    return state;
  }

  function currentExperiment() {
    const topic = activeTopic();
    if (!topic) return null;
    const id = topic.id;
    return {
      id: `${lab}-${id}-${Date.now()}`,
      lab,
      topicId: id,
      topic: titleFor(id),
      savedAt: new Date().toISOString(),
      controls: collectControls(topic),
      metrics: collectMetrics(topic),
      state: collectState(id),
      evidence: lab === 'markets' ? 'Heuristic / educational simulation' : 'Educational simulation',
    };
  }

  function download(filename, text) {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyText(text, button) {
    const done = () => {
      const old = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = old; }, 1200);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done);
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    done();
  }

  function saveRun(button) {
    const experiment = currentExperiment();
    if (!experiment) return;
    const runs = readRuns();
    runs.push(experiment);
    writeRuns(runs);
    button.textContent = 'Saved';
    setTimeout(() => { button.textContent = 'Save'; }, 1200);
    renderCompare();
  }

  function exportRun() {
    const experiment = currentExperiment();
    if (!experiment) return;
    download(`${experiment.lab}-${experiment.topicId}-experiment.json`, JSON.stringify(experiment, null, 2));
  }

  function copyPython(button) {
    const experiment = currentExperiment();
    if (!experiment) return;
    const json = JSON.stringify(experiment, null, 2);
    const template = PY_TEMPLATES[experiment.topicId] || `# Pattern Portal sandbox experiment\nimport json\n\nexperiment = __EXPERIMENT_JSON__\nprint(experiment['topic'])\nprint(experiment['controls'])\nprint(experiment['metrics'])`;
    copyText(template.replace('__EXPERIMENT_JSON__', json), button);
  }

  function resetActivity() {
    const topic = activeTopic();
    if (!topic) return;
    const resetButton = Array.from(topic.querySelectorAll('button')).find(btn => /reset/i.test(btn.textContent) || /reset/i.test(btn.getAttribute('onclick') || ''));
    if (resetButton) resetButton.click();
  }

  function renderCompare() {
    const topic = activeTopic();
    if (!topic) return;
    const rows = readRuns().filter(run => run.topicId === topic.id).slice(-5).reverse();
    const target = topic.querySelector('.build-mode-runs');
    if (!target) return;
    if (!rows.length) {
      target.innerHTML = '<div class="build-mode-empty">No saved runs yet.</div>';
      return;
    }
    target.innerHTML = `<table class="build-mode-table"><thead><tr><th>Saved</th><th>Key metrics</th><th>Setup</th></tr></thead><tbody>${rows.map(run => {
      const metrics = Object.entries(run.metrics).slice(0, 4).map(([k, v]) => `${k}: ${v}`).join(' · ') || 'No metrics yet';
      const controls = Object.entries(run.controls).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(' · ') || 'Default controls';
      return `<tr><td>${new Date(run.savedAt).toLocaleTimeString()}</td><td>${metrics}</td><td>${controls}</td></tr>`;
    }).join('')}</tbody></table>`;
  }

  function renderPanel() {
    const topic = activeTopic();
    if (!topic || topic.querySelector('.build-mode-panel')) return;
    const anchor = topic.querySelector('.sandbox-metrics') || topic.querySelector('.sandbox-controls') || topic.firstElementChild;
    if (!anchor) return;
    const panel = document.createElement('section');
    panel.className = 'build-mode-panel';
    panel.innerHTML = `
      <div class="build-mode-head">
        <div>
          <div class="build-mode-kicker">Build Mode</div>
          <div class="build-mode-title">Save, export, and reuse this experiment</div>
        </div>
        <span class="build-mode-evidence">${lab === 'markets' ? 'Heuristic simulation' : 'Educational simulation'}</span>
      </div>
      <div class="build-mode-actions">
        <button class="sb-btn primary" type="button" data-build-action="save">Save</button>
        <button class="sb-btn" type="button" data-build-action="export">Export JSON</button>
        <button class="sb-btn" type="button" data-build-action="python">Copy Python</button>
        <button class="sb-btn" type="button" data-build-action="reset">Reset</button>
      </div>
      <div class="build-mode-runs"></div>`;
    anchor.insertAdjacentElement('afterend', panel);
    panel.querySelector('[data-build-action="save"]').addEventListener('click', e => saveRun(e.currentTarget));
    panel.querySelector('[data-build-action="export"]').addEventListener('click', exportRun);
    panel.querySelector('[data-build-action="python"]').addEventListener('click', e => copyPython(e.currentTarget));
    panel.querySelector('[data-build-action="reset"]').addEventListener('click', resetActivity);
    renderCompare();
  }

  function install() {
    if (window.show && !window.show.__buildModeWrapped) {
      const originalShow = window.show;
      window.show = function() {
        const result = originalShow.apply(this, arguments);
        setTimeout(renderPanel, 140);
        return result;
      };
      window.show.__buildModeWrapped = true;
    }
    setTimeout(renderPanel, 300);
  }

  window.SANDBOX_BUILD_MODE = { currentExperiment, saveRun, exportRun, copyPython, renderPanel };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install);
  else install();
  window.addEventListener('load', () => setTimeout(install, 250));
})();