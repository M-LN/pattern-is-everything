const SAMPLES = {
  regression: {
    title: 'Linear Regression',
    code: `import numpy as np

rng = np.random.default_rng(7)
x = np.linspace(0, 10, 40)
y = 2.4 * x + 3.0 + rng.normal(0, 2.2, size=x.size)

x_mean = x.mean()
y_mean = y.mean()
slope = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean) ** 2)
intercept = y_mean - slope * x_mean
pred = slope * x + intercept
mae = np.mean(np.abs(y - pred))
rmse = np.sqrt(np.mean((y - pred) ** 2))

print('model: y = {:.3f}x + {:.3f}'.format(slope, intercept))
print('MAE:', round(float(mae), 3))
print('RMSE:', round(float(rmse), 3))
print('first five predictions:')
for actual, estimate in list(zip(y, pred))[:5]:
    print('  actual={:.2f}  pred={:.2f}'.format(actual, estimate))`
  },
  drift: {
    title: 'Data Drift PSI',
    code: `import numpy as np

rng = np.random.default_rng(12)
reference = rng.normal(0, 1, 2_000)
production = rng.normal(0.45, 1.15, 2_000)

def psi(ref, new, bins=10):
    edges = np.histogram_bin_edges(ref, bins=bins)
    p = np.histogram(ref, bins=edges)[0] / len(ref) + 1e-6
    q = np.histogram(new, bins=edges)[0] / len(new) + 1e-6
    return np.sum((p - q) * np.log(p / q))

score = psi(reference, production)
label = 'none' if score < 0.1 else 'moderate' if score < 0.25 else 'significant'
print('PSI:', round(float(score), 4))
print('drift:', label)
print('reference mean:', round(float(reference.mean()), 3))
print('production mean:', round(float(production.mean()), 3))`
  },
  timeseries: {
    title: 'Walk-Forward Forecast',
    code: `import numpy as np

rng = np.random.default_rng(21)
t = np.arange(160)
y = 40 + 0.08 * t + 4 * np.sin(t / 7) + rng.normal(0, 1.4, size=t.size)

window = 28
predictions = []
actuals = []
for i in range(window, len(y)):
    history = y[i-window:i]
    seasonal_naive = history[-7]
    rolling_mean = history.mean()
    pred = 0.65 * seasonal_naive + 0.35 * rolling_mean
    predictions.append(pred)
    actuals.append(y[i])

predictions = np.array(predictions)
actuals = np.array(actuals)
mae = np.mean(np.abs(actuals - predictions))
naive = y[window-1:-1]
naive_mae = np.mean(np.abs(actuals - naive))

print('walk-forward MAE:', round(float(mae), 3))
print('one-step naive MAE:', round(float(naive_mae), 3))
print('lift vs naive:', round(float((naive_mae - mae) / naive_mae * 100), 2), '%')`
  },
  market: {
    title: 'Indicator Backtest',
    code: `import numpy as np

rng = np.random.default_rng(99)
returns = rng.normal(0.00035, 0.011, 600)
price = 100 * np.cumprod(1 + returns)

def moving_average(values, window):
    out = np.full(values.shape, np.nan)
    for i in range(window - 1, len(values)):
        out[i] = values[i-window+1:i+1].mean()
    return out

fast = moving_average(price, 20)
slow = moving_average(price, 80)
signal = (fast > slow).astype(float)
signal[np.isnan(fast) | np.isnan(slow)] = 0
signal = np.roll(signal, 1)
signal[0] = 0

turnover = np.abs(np.diff(signal, prepend=0))
costs = turnover * 0.0005
strategy = signal * returns - costs
equity = np.cumprod(1 + strategy)
peak = np.maximum.accumulate(equity)
drawdown = equity / peak - 1
sharpe = strategy.mean() / strategy.std() * np.sqrt(252)

print('Sharpe:', round(float(sharpe), 3))
print('Max drawdown:', round(float(drawdown.min()), 3))
print('Trades:', int(turnover.sum()))
print('Final equity:', round(float(equity[-1]), 3))`
  }
};

const editor = document.getElementById('pythonEditor');
const output = document.getElementById('labOutput');
const metricGrid = document.getElementById('metricGrid');
const resultCanvas = document.getElementById('resultCanvas');
const chartTitle = document.getElementById('chartTitle');
const chartMeta = document.getElementById('chartMeta');
const runBtn = document.getElementById('runBtn');
const saveRunBtn = document.getElementById('saveRunBtn');
const exportRunsBtn = document.getElementById('exportRunsBtn');
const importRunsBtn = document.getElementById('importRunsBtn');
const importRunsInput = document.getElementById('importRunsInput');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const sampleList = document.getElementById('sampleList');
const savedRunsList = document.getElementById('savedRunsList');
const sampleTitle = document.getElementById('sampleTitle');
const runtimeStatus = document.getElementById('runtimeStatus');
const cellMeta = document.getElementById('cellMeta');

const RUNS_KEY = 'pattern-browser-lab-runs';
let pyodide;
let activeSample = 'regression';
let lastRun = null;

function setOutput(text) {
  output.textContent = text || '';
}

function clearSummary() {
  renderMetrics({});
  drawPreview(activeSample, null);
}

function setStatus(text, state = '') {
  runtimeStatus.textContent = text;
  runtimeStatus.classList.remove('ready', 'running', 'error');
  if (state) runtimeStatus.classList.add(state);
}

function updateCellMeta(text) {
  if (cellMeta) cellMeta.textContent = text;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function readRuns() {
  try { return JSON.parse(localStorage.getItem(RUNS_KEY) || '[]'); }
  catch { return []; }
}

function writeRuns(runs) {
  localStorage.setItem(RUNS_KEY, JSON.stringify(runs.slice(-40)));
  renderSavedRuns();
}

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function extractMetrics(text) {
  const metrics = {};
  String(text).split('\n').forEach(line => {
    const match = line.match(/^([^:]{2,40}):\s*(.+)$/);
    if (match) metrics[match[1].trim()] = match[2].trim();
  });
  return metrics;
}

function renderMetrics(metrics) {
  if (!metricGrid) return;
  const entries = Object.entries(metrics || {}).slice(0, 6);
  if (!entries.length) {
    metricGrid.innerHTML = '<div class="metric-card empty"><div class="metric-label">Metrics</div><div class="saved-run-meta">Run a cell to parse key values.</div></div>';
    return;
  }
  metricGrid.innerHTML = entries.map(([label, value]) => `
    <div class="metric-card">
      <div class="metric-label">${escapeHTML(label)}</div>
      <div class="metric-value">${escapeHTML(value)}</div>
    </div>`).join('');
}

function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawAxes(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#ddd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(32, 14);
  ctx.lineTo(32, height - 24);
  ctx.lineTo(width - 12, height - 24);
  ctx.stroke();
}

function scalePoints(values, width, height) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return value => height - 24 - ((value - min) / span) * (height - 44);
}

function line(ctx, points, color) {
  if (!points.length) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  });
  ctx.stroke();
}

function drawPreview(sampleKey, metrics) {
  if (!resultCanvas) return;
  const { ctx, width, height } = resizeCanvas(resultCanvas);
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--accent').trim() || '#c84b2f';
  const accent2 = styles.getPropertyValue('--accent2').trim() || '#2a7d5f';
  const accent3 = styles.getPropertyValue('--accent3').trim() || '#2955a0';
  drawAxes(ctx, width, height);
  chartTitle.textContent = SAMPLES[sampleKey]?.title || 'Preview';
  chartMeta.textContent = metrics ? 'Generated from sample pattern' : 'Run a cell';

  if (!metrics) {
    ctx.fillStyle = styles.getPropertyValue('--muted').trim() || '#888';
    ctx.font = '12px IBM Plex Mono, monospace';
    ctx.fillText('Preview appears after run', 44, height / 2);
    return;
  }

  if (sampleKey === 'regression') {
    const xs = Array.from({ length: 24 }, (_, i) => i / 23 * 10);
    const actual = xs.map(x => 2.4 * x + 3 + Math.sin(x * 1.7) * 1.8);
    const pred = xs.map(x => 2.4 * x + 3);
    const yScale = scalePoints(actual.concat(pred), width, height);
    actual.forEach((y, i) => {
      const x = 32 + i / (actual.length - 1) * (width - 48);
      ctx.beginPath();
      ctx.arc(x, yScale(y), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
    });
    line(ctx, pred.map((y, i) => [32 + i / (pred.length - 1) * (width - 48), yScale(y)]), accent2);
    return;
  }

  if (sampleKey === 'drift') {
    const ref = [2, 7, 18, 31, 25, 12, 5];
    const prod = [1, 3, 9, 19, 30, 24, 12];
    const yScale = scalePoints(ref.concat(prod), width, height);
    const barW = (width - 52) / ref.length;
    ref.forEach((value, i) => {
      const x = 36 + i * barW;
      ctx.fillStyle = 'rgba(42,125,95,.42)';
      ctx.fillRect(x, yScale(value), barW * .38, height - 24 - yScale(value));
      ctx.fillStyle = 'rgba(200,75,47,.42)';
      ctx.fillRect(x + barW * .42, yScale(prod[i]), barW * .38, height - 24 - yScale(prod[i]));
    });
    return;
  }

  const values = Array.from({ length: 70 }, (_, i) => 50 + i * .12 + Math.sin(i / 6) * 4 + Math.cos(i / 11) * 2);
  const yScale = scalePoints(values, width, height);
  const points = values.map((value, i) => [32 + i / (values.length - 1) * (width - 48), yScale(value)]);
  line(ctx, points, sampleKey === 'market' ? accent : accent3);
  if (sampleKey === 'market') {
    const equity = values.map((value, i) => value + Math.sin(i / 4) * 2);
    const equityScale = scalePoints(equity, width, height);
    line(ctx, equity.map((value, i) => [32 + i / (equity.length - 1) * (width - 48), equityScale(value)]), accent2);
  }
}

function selectSample(key) {
  activeSample = key;
  const sample = SAMPLES[key];
  sampleTitle.textContent = sample.title;
  editor.value = sample.code;
  lastRun = null;
  updateCellMeta(`${editor.value.split('\n').length} lines · editable sample`);
  clearSummary();
  document.querySelectorAll('.sample-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.sample === key);
  });
}

function loadRun(runId) {
  const run = readRuns().find(item => item.id === runId);
  if (!run) return;
  if (SAMPLES[run.sample]) activeSample = run.sample;
  sampleTitle.textContent = run.title;
  editor.value = run.code;
  setOutput(run.output);
  lastRun = run;
  renderMetrics(run.metrics || extractMetrics(run.output));
  drawPreview(run.sample || activeSample, run.metrics || {});
  updateCellMeta(`Loaded run · ${editor.value.split('\n').length} lines`);
  document.querySelectorAll('.sample-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.sample === run.sample);
  });
}

function deleteRun(runId) {
  writeRuns(readRuns().filter(item => item.id !== runId));
}

function renderSavedRuns() {
  const runs = readRuns().slice(-8).reverse();
  if (!savedRunsList) return;
  if (!runs.length) {
    savedRunsList.innerHTML = '<div class="saved-run empty"><div class="saved-run-title">No saved runs</div><div class="saved-run-meta">Saved experiments will appear here.</div></div>';
    return;
  }
  savedRunsList.innerHTML = runs.map(run => {
    const metrics = Object.entries(run.metrics || {}).slice(0, 3).map(([key, value]) => `${key}: ${value}`).join(' · ') || 'No metrics parsed';
    const runId = escapeHTML(run.id);
    return `<div class="saved-run">
      <div class="saved-run-title">${escapeHTML(run.title)}</div>
      <div class="saved-run-meta">${escapeHTML(new Date(run.savedAt).toLocaleString())}<br>${escapeHTML(metrics)}</div>
      <div class="saved-run-actions">
        <button type="button" data-run-load="${runId}">Load</button>
        <button type="button" data-run-delete="${runId}">Delete</button>
      </div>
    </div>`;
  }).join('');
  savedRunsList.querySelectorAll('[data-run-load]').forEach(button => button.addEventListener('click', () => loadRun(button.dataset.runLoad)));
  savedRunsList.querySelectorAll('[data-run-delete]').forEach(button => button.addEventListener('click', () => deleteRun(button.dataset.runDelete)));
}

function renderSamples() {
  sampleList.innerHTML = '';
  Object.entries(SAMPLES).forEach(([key, sample]) => {
    const button = document.createElement('button');
    button.className = 'sample-btn';
    button.type = 'button';
    button.dataset.sample = key;
    button.textContent = sample.title;
    button.addEventListener('click', () => selectSample(key));
    sampleList.appendChild(button);
  });
  selectSample(activeSample);
}

async function bootRuntime() {
  try {
    setStatus('Loading', 'running');
    pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
    setStatus('Loading NumPy', 'running');
    await pyodide.loadPackage(['numpy']);
    setStatus('Ready', 'ready');
    runBtn.disabled = false;
    setOutput('Python is ready.');
  } catch (error) {
    setStatus('Runtime failed', 'error');
    setOutput(error.message || String(error));
  }
}

async function runCurrentCode() {
  if (!pyodide) return;
  runBtn.disabled = true;
  setStatus('Running', 'running');
  const chunks = [];
  pyodide.setStdout({ batched: text => chunks.push(text) });
  pyodide.setStderr({ batched: text => chunks.push(text) });
  try {
    const result = await pyodide.runPythonAsync(editor.value);
    if (result !== undefined && result !== null) chunks.push(String(result));
    const text = chunks.join('\n') || 'Done.';
    setOutput(text);
    lastRun = {
      id: `browser-lab-${Date.now()}`,
      sample: activeSample,
      title: sampleTitle.textContent,
      savedAt: new Date().toISOString(),
      code: editor.value,
      output: text,
      metrics: extractMetrics(text)
    };
    updateCellMeta(`Last run · ${Object.keys(lastRun.metrics).length || 0} metrics parsed`);
    renderMetrics(lastRun.metrics);
    drawPreview(activeSample, lastRun.metrics);
    setStatus('Ready', 'ready');
  } catch (error) {
    const text = chunks.concat(error.message || String(error)).join('\n');
    setOutput(text);
    lastRun = {
      id: `browser-lab-${Date.now()}`,
      sample: activeSample,
      title: `${sampleTitle.textContent} (error)`,
      savedAt: new Date().toISOString(),
      code: editor.value,
      output: text,
      metrics: {}
    };
    updateCellMeta('Last run failed');
    renderMetrics({});
    drawPreview(activeSample, null);
    setStatus('Error', 'error');
  } finally {
    runBtn.disabled = false;
  }
}

function saveCurrentRun() {
  const run = lastRun || {
    id: `browser-lab-${Date.now()}`,
    sample: activeSample,
    title: sampleTitle.textContent,
    savedAt: new Date().toISOString(),
    code: editor.value,
    output: output.textContent,
    metrics: extractMetrics(output.textContent)
  };
  writeRuns(readRuns().concat({ ...run, id: `browser-lab-${Date.now()}`, savedAt: new Date().toISOString() }));
  setStatus('Saved', 'ready');
  setTimeout(() => { if (pyodide) setStatus('Ready', 'ready'); }, 900);
}

function exportRuns() {
  downloadJSON('pattern-browser-lab-runs.json', {
    exportedAt: new Date().toISOString(),
    source: 'Pattern Portal Browser Python Lab',
    runs: readRuns()
  });
}

function importRuns(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const imported = Array.isArray(parsed) ? parsed : parsed.runs;
      if (!Array.isArray(imported)) throw new Error('No runs array found.');
      writeRuns(readRuns().concat(imported.filter(run => run && run.code && run.output)));
      setStatus('Imported', 'ready');
      setTimeout(() => { if (pyodide) setStatus('Ready', 'ready'); }, 900);
    } catch (error) {
      setOutput(error.message || String(error));
      setStatus('Import failed', 'error');
    }
  };
  reader.readAsText(file);
}

function copyCode() {
  navigator.clipboard.writeText(editor.value).then(() => {
    setStatus('Copied', 'ready');
    setTimeout(() => { if (pyodide) setStatus('Ready', 'ready'); }, 900);
  });
}

renderSamples();
renderSavedRuns();
clearSummary();
bootRuntime();

runBtn.addEventListener('click', runCurrentCode);
saveRunBtn.addEventListener('click', saveCurrentRun);
exportRunsBtn.addEventListener('click', exportRuns);
importRunsBtn.addEventListener('click', () => importRunsInput.click());
importRunsInput.addEventListener('change', event => importRuns(event.target.files[0]));
resetBtn.addEventListener('click', () => selectSample(activeSample));
copyBtn.addEventListener('click', copyCode);
clearBtn.addEventListener('click', () => { setOutput(''); clearSummary(); });
editor.addEventListener('input', () => updateCellMeta(`${editor.value.split('\n').length} lines · edited`));
editor.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    runCurrentCode();
  }
});
window.addEventListener('resize', () => drawPreview(activeSample, lastRun?.metrics || null));
