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
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const sampleList = document.getElementById('sampleList');
const sampleTitle = document.getElementById('sampleTitle');
const runtimeStatus = document.getElementById('runtimeStatus');

let pyodide;
let activeSample = 'regression';

function setOutput(text) {
  output.textContent = text || '';
}

function selectSample(key) {
  activeSample = key;
  const sample = SAMPLES[key];
  sampleTitle.textContent = sample.title;
  editor.value = sample.code;
  document.querySelectorAll('.sample-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.sample === key);
  });
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
    runtimeStatus.textContent = 'Loading Pyodide...';
    pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
    runtimeStatus.textContent = 'Loading NumPy...';
    await pyodide.loadPackage(['numpy']);
    runtimeStatus.textContent = 'Ready';
    runBtn.disabled = false;
    setOutput('Python is ready. Choose an experiment or edit the code, then run it.');
  } catch (error) {
    runtimeStatus.textContent = 'Runtime failed';
    setOutput(error.message || String(error));
  }
}

async function runCurrentCode() {
  if (!pyodide) return;
  runBtn.disabled = true;
  runtimeStatus.textContent = 'Running...';
  const chunks = [];
  pyodide.setStdout({ batched: text => chunks.push(text) });
  pyodide.setStderr({ batched: text => chunks.push(text) });
  try {
    const result = await pyodide.runPythonAsync(editor.value);
    if (result !== undefined && result !== null) chunks.push(String(result));
    setOutput(chunks.join('\n') || 'Done.');
    runtimeStatus.textContent = 'Ready';
  } catch (error) {
    setOutput(chunks.concat(error.message || String(error)).join('\n'));
    runtimeStatus.textContent = 'Error';
  } finally {
    runBtn.disabled = false;
  }
}

function copyCode() {
  navigator.clipboard.writeText(editor.value).then(() => {
    runtimeStatus.textContent = 'Copied';
    setTimeout(() => { if (pyodide) runtimeStatus.textContent = 'Ready'; }, 900);
  });
}

renderSamples();
bootRuntime();

runBtn.addEventListener('click', runCurrentCode);
resetBtn.addEventListener('click', () => selectSample(activeSample));
copyBtn.addEventListener('click', copyCode);
clearBtn.addEventListener('click', () => setOutput(''));
