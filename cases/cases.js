const CASES = [
  {
    id: 'credit-fraud',
    level: 'Intermediate',
    evidenceClass: 'proven',
    evidenceLabel: 'Statistical',
    badge: 'Classification',
    title: 'Credit Card <em>Fraud</em>',
    summary: 'Detect rare fraudulent transactions without letting accuracy hide the real failure mode.',
    datasetName: 'Kaggle Credit Card Fraud Detection',
    datasetUrl: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
    datasetNote: 'Highly imbalanced anonymized card transactions. Use a validation split before touching the final test set.',
    pipeline: [
      'Load anonymized transaction features and inspect class imbalance.',
      'Split train/validation/test with stratification.',
      'Train a baseline model before trying resampling or class weights.',
      'Tune the decision threshold on validation data only.',
      'Report precision, recall, F1, PR-AUC, and confusion matrix counts.'
    ],
    pitfall: 'Common pitfall - accuracy can look excellent while the model misses most fraud. Optimize for the business cost of false negatives and false positives, not for raw accuracy.',
    metrics: ['Precision/recall tradeoff', 'F1 score', 'PR-AUC', 'Confusion matrix at chosen threshold'],
    topics: [
      ['Confusion Matrix', '../stats/index.html#confusion-matrix'],
      ['ROC & AUC', '../stats/index.html#roc-auc'],
      ['Class Imbalance', '../stats/index.html#class-imbalance'],
      ['Cross-Validation', '../stats/index.html#cross-validation']
    ],
    lab: ['Classification Boundary Lab', '../sandbox/ml/index.html#classification-boundary'],
    snippet: `# pip install pandas scikit-learn
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, average_precision_score
from sklearn.model_selection import train_test_split

df = pd.read_csv('creditcard.csv')
X = df.drop(columns=['Class'])
y = df['Class']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

model = RandomForestClassifier(
    n_estimators=300, class_weight='balanced', random_state=42, n_jobs=-1
)
model.fit(X_train, y_train)

proba = model.predict_proba(X_test)[:, 1]
pred = (proba >= 0.35).astype(int)

print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred, digits=3))
print('PR-AUC:', average_precision_score(y_test, proba))`
  },
  {
    id: 'housing-regression',
    level: 'Beginner',
    evidenceClass: 'proven',
    evidenceLabel: 'Statistical',
    badge: 'Regression',
    title: 'Housing Price <em>Regression</em>',
    summary: 'Build a clean tabular regression baseline, then diagnose error instead of chasing a leaderboard score.',
    datasetName: 'California Housing via scikit-learn',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html',
    datasetNote: 'Small enough for a first model, but real enough to show scaling, leakage, residuals, and feature importance.',
    pipeline: [
      'Load the dataset and separate features from target.',
      'Build a preprocessing + model pipeline.',
      'Evaluate with cross-validation before inspecting the test set.',
      'Compare MAE and RMSE to understand average vs large errors.',
      'Inspect residuals and feature importance for failure patterns.'
    ],
    pitfall: 'Common pitfall - scaling or imputing before train/test split leaks test-set information into training. Put preprocessing inside a Pipeline.',
    metrics: ['MAE', 'RMSE', 'R2', 'Residual distribution'],
    topics: [
      ['Regression Metrics', '../stats/index.html#regression-metrics'],
      ['Cross-Validation', '../stats/index.html#cross-validation'],
      ['Regularization', '../ml-math/index.html#regularization'],
      ['SHAP Values', '../stats/index.html#shap-values']
    ],
    lab: ['Linear Regression Lab', '../sandbox/ml/index.html#linear-regression'],
    snippet: `# pip install scikit-learn pandas
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

data = fetch_california_housing(as_frame=True)
X = data.frame.drop(columns=['MedHouseVal'])
y = data.frame['MedHouseVal']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = HistGradientBoostingRegressor(random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_test)

print('MAE:', mean_absolute_error(y_test, pred))
print('RMSE:', mean_squared_error(y_test, pred, squared=False))
print('R2:', r2_score(y_test, pred))
print('Largest errors:', np.abs(y_test - pred).sort_values(ascending=False).head())`
  },
  {
    id: 'energy-forecast',
    level: 'Intermediate',
    evidenceClass: 'proven',
    evidenceLabel: 'Statistical',
    badge: 'Time Series',
    title: 'Energy Demand <em>Forecast</em>',
    summary: 'Forecast temporal demand with walk-forward validation instead of a random split that breaks time.',
    datasetName: 'UCI Individual Household Electric Power Consumption',
    datasetUrl: 'https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption',
    datasetNote: 'A practical time-series dataset for resampling, lag features, seasonality checks, and honest backtesting.',
    pipeline: [
      'Parse timestamps and resample noisy readings to an hourly or daily grain.',
      'Create lag and rolling-window features using only past values.',
      'Use walk-forward splits, never random time-series splits.',
      'Compare a naive baseline against the model.',
      'Track MAE/RMSE by horizon and inspect seasonal error.'
    ],
    pitfall: 'Common pitfall - future leakage from centered rolling windows, global scaling, or random train/test splits. All feature engineering must respect time order.',
    metrics: ['MAE by horizon', 'RMSE by horizon', 'Naive baseline lift', 'Walk-forward stability'],
    topics: [
      ['Stationarity', '../timeseries/index.html#stationarity'],
      ['ARIMA', '../timeseries/index.html#arima'],
      ['Prophet', '../timeseries/index.html#prophet'],
      ['Walk-Forward Validation', '../stats/index.html#walk-forward']
    ],
    lab: ['Timeseries Forecast Lab', '../sandbox/ml/index.html#timeseries-forecast'],
    snippet: `# pip install pandas scikit-learn
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

df = pd.read_csv('household_power_consumption.txt', sep=';', na_values='?')
dt = pd.to_datetime(df['Date'] + ' ' + df['Time'], dayfirst=True)
series = df.assign(ds=dt).set_index('ds')['Global_active_power'].astype(float)
daily = series.resample('D').mean().dropna().to_frame('y')

for lag in [1, 2, 7, 14]:
    daily[f'lag_{lag}'] = daily['y'].shift(lag)
daily['rolling_7'] = daily['y'].shift(1).rolling(7).mean()
daily = daily.dropna()

split = int(len(daily) * 0.8)
train, test = daily.iloc[:split], daily.iloc[split:]
features = [c for c in daily.columns if c != 'y']

model = RandomForestRegressor(n_estimators=300, random_state=42)
model.fit(train[features], train['y'])
pred = model.predict(test[features])
naive = test['lag_1']

print('Model MAE:', mean_absolute_error(test['y'], pred))
print('Naive MAE:', mean_absolute_error(test['y'], naive))`
  },
  {
    id: 'market-backtest',
    level: 'Advanced',
    evidenceClass: 'heuristic',
    evidenceLabel: 'Heuristic',
    badge: 'Markets',
    title: 'Market Strategy <em>Backtest</em>',
    summary: 'Test a simple indicator strategy with walk-forward discipline, costs, and risk-adjusted metrics.',
    datasetName: 'Yahoo Finance OHLCV via yfinance',
    datasetUrl: 'https://pypi.org/project/yfinance/',
    datasetNote: 'Convenient for education, but not point-in-time institutional data. Treat results as a learning artifact.',
    pipeline: [
      'Download adjusted OHLCV and compute indicators using only past prices.',
      'Define entry, exit, position sizing, and transaction costs before testing.',
      'Walk forward through time without reusing future information.',
      'Compare against buy-and-hold and cash baselines.',
      'Report Sharpe, drawdown, turnover, and sensitivity to costs.'
    ],
    pitfall: 'Common pitfall - a pattern that looks profitable before costs, slippage, survivorship bias, and regime changes may have no durable edge.',
    metrics: ['Sharpe ratio', 'Max drawdown', 'Turnover', 'Cost sensitivity'],
    topics: [
      ['Walk-Forward Validation', '../stats/index.html#walk-forward'],
      ['Sharpe Ratio', '../stats/index.html#sharpe-ratio'],
      ['Drawdown Analysis', '../markets/risk/index.html#drawdown-analysis'],
      ['RSI', '../markets/indicators/index.html#rsi']
    ],
    lab: ['Markets Paper Trading Lab', '../sandbox/markets/index.html#paper-trading'],
    snippet: `# pip install yfinance pandas numpy
import numpy as np
import pandas as pd
import yfinance as yf

px = yf.download('SPY', start='2015-01-01', auto_adjust=True, progress=False)
close = px['Close']
returns = close.pct_change()

fast = close.rolling(20).mean()
slow = close.rolling(100).mean()
signal = (fast > slow).astype(int).shift(1).fillna(0)

turnover = signal.diff().abs().fillna(0)
cost = turnover * 0.0005
strategy = signal * returns - cost

equity = (1 + strategy.fillna(0)).cumprod()
drawdown = equity / equity.cummax() - 1
sharpe = strategy.mean() / strategy.std() * np.sqrt(252)

print('Sharpe:', sharpe)
print('Max drawdown:', drawdown.min())
print('Annual turnover:', turnover.mean() * 252)`
  }
];

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCase(caseData) {
  const topicLinks = caseData.topics
    .map(([label, href]) => `<a href="${href}">${label}</a>`)
    .join('');
  const metricItems = caseData.metrics
    .map(metric => `<li>${escapeHTML(metric)}</li>`)
    .join('');
  const pipelineItems = caseData.pipeline
    .map(step => `<li>${escapeHTML(step)}</li>`)
    .join('');
  return `
    <article class="case-card" id="${caseData.id}">
      <div class="case-kicker">
        <span class="tag t1">${escapeHTML(caseData.level)}</span>
        <span class="tag t3">${escapeHTML(caseData.badge)}</span>
        <span class="evidence-badge ${caseData.evidenceClass}" title="Evidence framing for this case">${escapeHTML(caseData.evidenceLabel)}</span>
      </div>
      <h2 class="case-title">${caseData.title}</h2>
      <p class="case-summary">${escapeHTML(caseData.summary)}</p>

      <div class="dataset-card">
        <div class="dataset-card-title">Use this dataset</div>
        <a href="${caseData.datasetUrl}" target="_blank" rel="noopener">${escapeHTML(caseData.datasetName)}</a>
        <div class="ds-note">${escapeHTML(caseData.datasetNote)}</div>
      </div>

      <div class="howto">
        <div class="howto-title">Pipeline</div>
        <ol>${pipelineItems}</ol>
        <div class="howto-pitfall"><strong>${escapeHTML(caseData.pitfall.split(' - ')[0])}:</strong> ${escapeHTML(caseData.pitfall.split(' - ').slice(1).join(' - '))}</div>
      </div>

      <div class="perf-insight">
        <div class="perf-insight-title">Metrics to report</div>
        <ul>${metricItems}</ul>
      </div>

      <div class="why-matters">
        <div class="why-matters-title">Connect the pattern</div>
        <div class="case-links">${topicLinks}<a href="${caseData.lab[1]}">${escapeHTML(caseData.lab[0])}</a></div>
      </div>

      <div class="dev-export">
        <div class="dev-export-title">Quick start - copy to notebook</div>
        <pre><button class="copy-btn" type="button" onclick="copyCaseSnippet('${caseData.id}', this)">Copy</button><code>${escapeHTML(caseData.snippet)}</code></pre>
        <div class="dep-note">Snippet is a starting point. Validate assumptions, splits, and data licensing before production use.</div>
      </div>
    </article>`;
}

function copyCaseSnippet(caseId, button) {
  const caseData = CASES.find(item => item.id === caseId);
  if (!caseData) return;
  const markCopied = () => {
    const old = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = old; }, 1200);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(caseData.snippet).then(markCopied);
    return;
  }
  const textArea = document.createElement('textarea');
  textArea.value = caseData.snippet;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  markCopied();
}

function renderCases() {
  const grid = document.getElementById('caseGrid');
  if (!grid) return;
  grid.innerHTML = CASES.map(renderCase).join('');
}

document.addEventListener('DOMContentLoaded', renderCases);