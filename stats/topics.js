/* ═══════════════════════════════════════════════════════════════
   The Toolkit — Topics Data & Content Builder
   31 practical topics for ML evaluation & market analysis
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-evaluate',    title:'Evaluate Your Model',       topics:['home','confusion-matrix','roc-auc','regression-metrics','cross-validation','comparing-runs','learning-curves'] },
  { id:'sec-features',    title:'Understand Your Features',  topics:['shap-values','permutation-importance','pdp-ice','feature-correlation','information-gain'] },
  { id:'sec-data',        title:'Analyze Your Data',         topics:['distribution-shape','outlier-detection','missing-data','data-drift','class-imbalance'] },
  { id:'sec-backtest',    title:'Backtest & Validate',       topics:['sharpe-ratio','max-drawdown','walk-forward','monte-carlo','survivorship-bias'] },
  { id:'sec-decisions',   title:'Make Decisions',            topics:['confidence-intervals','bootstrap-methods','bayesian-ab','effect-size','power-analysis'] },
  { id:'sec-python',      title:'Python Power Tools',        topics:['sklearn-eval','shap-library','optuna','pandas-ta','scipy-statsmodels'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'confusion-matrix':'Confusion Matrix & Classification Metrics',
  'roc-auc':'ROC & AUC Curves',
  'regression-metrics':'Regression Metrics',
  'cross-validation':'Cross-Validation Done Right',
  'comparing-runs':'Comparing Model Runs',
  'learning-curves':'Learning Curves & Overfitting',
  'shap-values':'SHAP Values',
  'permutation-importance':'Permutation Importance',
  'pdp-ice':'Partial Dependence & ICE',
  'feature-correlation':'Feature Correlation & Multicollinearity',
  'information-gain':'Information Gain & Mutual Information',
  'distribution-shape':'Distribution Shape',
  'outlier-detection':'Outlier Detection',
  'missing-data':'Missing Data Strategies',
  'data-drift':'Data Drift & Distribution Shift',
  'class-imbalance':'Sampling & Class Imbalance',
  'sharpe-ratio':'Sharpe Ratio & Risk-Adjusted Returns',
  'max-drawdown':'Maximum Drawdown & Recovery',
  'walk-forward':'Walk-Forward Validation',
  'monte-carlo':'Monte Carlo Simulation',
  'survivorship-bias':'Survivorship & Look-Ahead Bias',
  'confidence-intervals':'Confidence Intervals',
  'bootstrap-methods':'Bootstrap Methods',
  'bayesian-ab':'Bayesian A/B Testing',
  'effect-size':'Effect Size & Practical Significance',
  'power-analysis':'Power Analysis',
  'sklearn-eval':'scikit-learn Evaluation Suite',
  'shap-library':'SHAP Library',
  'optuna':'Optuna',
  'pandas-ta':'pandas-ta & yfinance',
  'scipy-statsmodels':'scipy.stats & statsmodels',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'confusion-matrix', num:'01', title:'Confusion Matrix & Classification Metrics', category:'Evaluate Your Model', keywords:['precision','recall','f1','accuracy','true positive','false positive','false negative','true negative','classification report','threshold'], content:'The foundation of classification evaluation — TP, FP, TN, FN and the metrics built on them.' },
  { id:'roc-auc', num:'02', title:'ROC & AUC Curves', category:'Evaluate Your Model', keywords:['receiver operating characteristic','area under curve','threshold','TPR','FPR','multi-class','comparison','sensitivity','specificity'], content:'Visualizing model performance across all thresholds — the ROC curve and the AUC score.' },
  { id:'regression-metrics', num:'03', title:'Regression Metrics', category:'Evaluate Your Model', keywords:['MAE','RMSE','R-squared','adjusted R²','mean absolute error','root mean square','residuals','explained variance'], content:'MAE, RMSE, R² — which metric for which regression problem and what the numbers actually mean.' },
  { id:'cross-validation', num:'04', title:'Cross-Validation Done Right', category:'Evaluate Your Model', keywords:['k-fold','stratified','time series split','data leakage','train test split','validation','holdout','nested'], content:'Splitting your data honestly — k-fold, stratified, time-series split, and the leakage traps.' },
  { id:'comparing-runs', num:'05', title:'Comparing Model Runs', category:'Evaluate Your Model', keywords:['paired t-test','McNemar','Wilcoxon','statistical significance','model comparison','ablation','improvement','p-value'], content:'Is this improvement real? Statistical tests for comparing model performance across runs.' },
  { id:'learning-curves', num:'06', title:'Learning Curves & Overfitting', category:'Evaluate Your Model', keywords:['training curve','validation curve','overfitting','underfitting','early stopping','bias variance','generalization','gap'], content:'Training vs validation curves — reading the gap to diagnose overfitting, underfitting, and when to stop.' },
  { id:'shap-values', num:'07', title:'SHAP Values', category:'Understand Your Features', keywords:['shapley','feature importance','explainability','force plot','summary plot','dependence plot','TreeExplainer','KernelExplainer','waterfall'], content:'Game-theoretic feature attribution — understand exactly why your model made each prediction.' },
  { id:'permutation-importance', num:'08', title:'Permutation Importance', category:'Understand Your Features', keywords:['feature importance','shuffle','model-agnostic','correlated features','baseline','drop column','sklearn'], content:'Shuffle a feature, measure the damage — a model-agnostic way to rank feature importance.' },
  { id:'pdp-ice', num:'09', title:'Partial Dependence & ICE', category:'Understand Your Features', keywords:['partial dependence plot','individual conditional expectation','marginal effect','interaction','feature effect','PDP'], content:'How does changing one feature affect predictions? PD shows the average, ICE shows every instance.' },
  { id:'feature-correlation', num:'10', title:'Feature Correlation & Multicollinearity', category:'Understand Your Features', keywords:['heatmap','VIF','variance inflation factor','collinearity','correlation matrix','redundant features','drop'], content:'Spotting redundant features — correlation heatmaps, VIF, and deciding what to drop.' },
  { id:'information-gain', num:'11', title:'Information Gain & Mutual Information', category:'Understand Your Features', keywords:['entropy','mutual information','feature selection','nonlinear','KL divergence','information theory','bits'], content:'Beyond linear correlation — information-theoretic measures that capture any kind of dependency.' },
  { id:'distribution-shape', num:'12', title:'Distribution Shape', category:'Analyze Your Data', keywords:['skewness','kurtosis','QQ plot','normal','histogram','density','heavy tails','symmetric','log transform'], content:'Skewness, kurtosis, QQ plots — is your data normal, and does it matter?' },
  { id:'outlier-detection', num:'13', title:'Outlier Detection', category:'Analyze Your Data', keywords:['IQR','z-score','isolation forest','DBSCAN','anomaly','robust','winsorize','extreme values'], content:'IQR, Z-score, Isolation Forest — finding extreme values and knowing when they are the signal.' },
  { id:'missing-data', num:'14', title:'Missing Data Strategies', category:'Analyze Your Data', keywords:['imputation','MICE','KNN impute','MCAR','MAR','MNAR','missingness','dropna','fillna'], content:'Imputation, MICE, missingness patterns — handling gaps without corrupting your analysis.' },
  { id:'data-drift', num:'15', title:'Data Drift & Distribution Shift', category:'Analyze Your Data', keywords:['PSI','population stability index','KS test','Kolmogorov-Smirnov','concept drift','covariate shift','monitoring','model decay'], content:'Is your model still valid? PSI, KS test, and detecting when the world has changed under your model.' },
  { id:'class-imbalance', num:'16', title:'Sampling & Class Imbalance', category:'Analyze Your Data', keywords:['SMOTE','undersampling','oversampling','stratification','class weights','imbalanced-learn','rare events','fraud'], content:'SMOTE, undersampling, class weights — strategies when your classes are nowhere near 50/50.' },
  { id:'sharpe-ratio', num:'17', title:'Sharpe Ratio & Risk-Adjusted Returns', category:'Backtest & Validate', keywords:['Sharpe','Sortino','Calmar','risk-adjusted','volatility','excess return','risk free rate','annualized'], content:'Interpreting Sharpe, Sortino, Calmar — the standard ways to measure return per unit of risk.' },
  { id:'max-drawdown', num:'18', title:'Maximum Drawdown & Recovery', category:'Backtest & Validate', keywords:['drawdown','peak to trough','recovery time','worst case','underwater','risk tolerance','equity curve'], content:'Measuring worst-case loss from peak — drawdown depth, duration, and recovery time.' },
  { id:'walk-forward', num:'19', title:'Walk-Forward Validation', category:'Backtest & Validate', keywords:['rolling window','anchored','expanding window','time series','look-ahead bias','out of sample','backtest'], content:'Rolling window backtesting — the right way to validate strategies on time-ordered data.' },
  { id:'monte-carlo', num:'20', title:'Monte Carlo Simulation', category:'Backtest & Validate', keywords:['simulation','random paths','confidence','bootstrapped returns','path dependence','percentile','fan chart'], content:'Simulating thousands of equity paths — confidence bands on strategy performance.' },
  { id:'survivorship-bias', num:'21', title:'Survivorship & Look-Ahead Bias', category:'Backtest & Validate', keywords:['survivorship','look-ahead','selection bias','delisted','backtest traps','data snooping','forward looking'], content:'The silent traps that make your backtest a fantasy — and how to avoid them.' },
  { id:'confidence-intervals', num:'22', title:'Confidence Intervals', category:'Make Decisions', keywords:['confidence level','margin of error','bootstrap CI','parametric','width','95%','interval estimate','uncertainty'], content:'How sure are you? — bootstrap and parametric confidence intervals, and interpreting their width.' },
  { id:'bootstrap-methods', num:'23', title:'Bootstrap Methods', category:'Make Decisions', keywords:['resampling','nonparametric','percentile method','BCa','empirical distribution','bootstrap distribution','estimate'], content:'Estimate anything with resampling — the nonparametric Swiss army knife for uncertainty.' },
  { id:'bayesian-ab', num:'24', title:'Bayesian A/B Testing', category:'Make Decisions', keywords:['credible interval','posterior','prior','probability of improvement','early stopping','conversion rate','Beta-Binomial'], content:'Is version B actually better? Bayesian credible intervals and probability of improvement.' },
  { id:'effect-size', num:'25', title:'Effect Size & Practical Significance', category:'Make Decisions', keywords:["Cohen's d",'practical significance','meaningful difference','small medium large','overlap','statistical vs practical'], content:"Statistically significant \u2260 meaningful \u2014 Cohen's d and the difference between p-values and impact." },
  { id:'power-analysis', num:'26', title:'Power Analysis', category:'Make Decisions', keywords:['sample size','MDE','minimum detectable effect','type II error','statistical power','beta','experiment planning'], content:'How much data do you need? Sample size planning for experiments that can actually detect effects.' },
  { id:'sklearn-eval', num:'27', title:'scikit-learn Evaluation Suite', category:'Python Power Tools', keywords:['classification_report','cross_val_score','learning_curve','confusion_matrix','GridSearchCV','sklearn metrics','pipeline'], content:'The Swiss army knife — classification_report, cross_val_score, learning_curve, and the metrics module.' },
  { id:'shap-library', num:'28', title:'SHAP Library', category:'Python Power Tools', keywords:['shap','TreeExplainer','force_plot','summary_plot','waterfall','dependence_plot','KernelExplainer','DeepExplainer'], content:'TreeExplainer, force_plot, summary_plot, waterfall — the complete SHAP visualization toolkit.' },
  { id:'optuna', num:'29', title:'Optuna', category:'Python Power Tools', keywords:['hyperparameter','optimization','pruning','study','TPE','random search','Bayesian optimization','trial','objective'], content:'Smart hyperparameter tuning — TPE, pruning, study visualization, and integration with any framework.' },
  { id:'pandas-ta', num:'30', title:'pandas-ta & yfinance', category:'Python Power Tools', keywords:['technical indicators','yfinance','market data','SMA','RSI','MACD','Bollinger','candlestick','OHLCV','download'], content:'Technical indicators + market data in one-liners — pandas-ta for TA, yfinance for data.' },
  { id:'scipy-statsmodels', num:'31', title:'scipy.stats & statsmodels', category:'Python Power Tools', keywords:['scipy','statsmodels','statistical tests','ttest_ind','OLS','regression diagnostics','time series','ARIMA','ADF'], content:'Statistical tests, regression diagnostics, time series — the Python stats foundation.' },
];

/* ═══════════════════════════════════════════════════════════════
   NAV BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const progressHTML = nav.innerHTML;
  let html = progressHTML;
  let num = 0;
  SECTIONS.forEach(sec => {
    html += `<div class="nav-section open" id="${sec.id}">
      <div class="nav-section-header" onclick="toggleSection('${sec.id}')">
        <span class="nav-section-title">${sec.title}</span>
        <span class="nav-section-arrow">\u25be</span>
      </div><div class="nav-items">`;
    sec.topics.forEach(tid => {
      if (tid === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">\u25c9</span>Overview</div>`;
      } else {
        num++;
        const n = String(num).padStart(2,'0');
        html += `<div class="ni" data-topic="${tid}" onclick="show('${tid}',true)"><span class="ni-num">${n}</span>${TOPIC_NAMES[tid]}</div>`;
      }
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome()
    + buildConfusionMatrix() + buildROCAUC() + buildRegressionMetrics()
    + buildCrossValidation() + buildComparingRuns() + buildLearningCurves()
    + buildSHAPValues() + buildPermutationImportance() + buildPDPICE()
    + buildFeatureCorrelation() + buildInformationGain()
    + buildDistributionShape() + buildOutlierDetection() + buildMissingData()
    + buildDataDrift() + buildClassImbalance()
    + buildSharpeRatio() + buildMaxDrawdown() + buildWalkForward()
    + buildMonteCarlo() + buildSurvivorshipBias()
    + buildConfidenceIntervals() + buildBootstrapMethods() + buildBayesianAB()
    + buildEffectSize() + buildPowerAnalysis()
    + buildSklearnEval() + buildSHAPLibrary() + buildOptuna()
    + buildPandasTA() + buildScipyStatsmodels();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>The <em>Toolkit</em></h2>
    <p style="margin-top:14px">A practical reference covering 31 topics &mdash; from model evaluation
    and feature explainability to backtesting and decision-making. Every topic has interactive visuals, real formulas, and Python code you can use today.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> arrow keys to navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-evaluate','confusion-matrix')">
      <div class="cat-card-icon">&#127919;</div>
      <div class="cat-card-name">Evaluate Your Model</div>
      <div class="cat-card-count">6 topics &middot; Confusion matrix, ROC, regression metrics, CV</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-features','shap-values')">
      <div class="cat-card-icon">&#128269;</div>
      <div class="cat-card-name">Understand Your Features</div>
      <div class="cat-card-count">5 topics &middot; SHAP, permutation importance, PDP, correlation</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-data','distribution-shape')">
      <div class="cat-card-icon">&#128202;</div>
      <div class="cat-card-name">Analyze Your Data</div>
      <div class="cat-card-count">5 topics &middot; Distributions, outliers, drift, imbalance</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-backtest','sharpe-ratio')">
      <div class="cat-card-icon">&#128200;</div>
      <div class="cat-card-name">Backtest &amp; Validate</div>
      <div class="cat-card-count">5 topics &middot; Sharpe, drawdown, walk-forward, Monte Carlo</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-decisions','confidence-intervals')">
      <div class="cat-card-icon">&#9878;&#65039;</div>
      <div class="cat-card-name">Make Decisions</div>
      <div class="cat-card-count">5 topics &middot; CI, bootstrap, Bayesian A/B, power analysis</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-python','sklearn-eval')">
      <div class="cat-card-icon">&#128013;</div>
      <div class="cat-card-name">Python Power Tools</div>
      <div class="cat-card-count">5 topics &middot; scikit-learn, SHAP, Optuna, pandas-ta, scipy</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Confusion Matrix & Classification Metrics */
function buildConfusionMatrix() {
  return `<div class="topic" id="confusion-matrix">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Evaluate Your Model</div><h2>Confusion Matrix &amp; <em>Classification Metrics</em></h2></div>
    <span class="topic-badge">Classification</span>
  </div>
  <p class="sub">// The foundation of classification evaluation — TP, FP, TN, FN and the metrics built on them</p>
  <p class="prose">Every classifier's performance starts here. The <strong>confusion matrix</strong> gives you four counts: true positives (TP), false positives (FP), true negatives (TN), and false negatives (FN). Every classification metric is built from these four numbers.</p>
  <div class="fb"><div class="fm">Precision = TP / (TP + FP)</div><div class="fd"><span>Precision</span> = of all predicted positives, how many were correct? High when you can't afford false alarms.</div></div>
  <div class="fb c2"><div class="fm">Recall = TP / (TP + FN)</div><div class="fd"><span>Recall</span> = of all actual positives, how many did we catch? High when you can't afford to miss cases.</div></div>
  <div class="fb c3"><div class="fm">F1 = 2 &middot; (P &middot; R) / (P + R)</div><div class="fd"><span>F1</span> = harmonic mean of precision and recall. Balanced score when both matter equally.</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust threshold, see all metrics update</div>
    <canvas id="cmCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Threshold</span><input type="range" id="cmThresh" min="0" max="100" step="1" value="50"><span class="vd" id="cmThreshV">0.50</span></div>
      <div class="cg"><span class="cl">Precision</span><span class="vd" id="cmPrec" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Recall</span><span class="vd" id="cmRec" style="color:#4fc3f7">—</span></div>
      <div class="cg"><span class="cl">F1</span><span class="vd" id="cmF1" style="color:#81c784">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Metric</th><th>Formula</th><th>When to use</th></tr></thead>
    <tbody>
      <tr><td>Accuracy</td><td>(TP+TN)/(TP+TN+FP+FN)</td><td>Balanced classes only</td></tr>
      <tr><td>Precision</td><td>TP/(TP+FP)</td><td>Cost of false positives is high (spam)</td></tr>
      <tr><td>Recall</td><td>TP/(TP+FN)</td><td>Cost of misses is high (cancer)</td></tr>
      <tr><td>F1</td><td>2PR/(P+R)</td><td>Balance precision &amp; recall</td></tr>
      <tr><td>MCC</td><td>(TP&middot;TN&minus;FP&middot;FN)/&radic;(...)</td><td>Imbalanced datasets</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — classification metrics</span>
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> (
    confusion_matrix, classification_report,
    precision_score, recall_score, f1_score
)

y_true = [<span class="st">1</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">1</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">0</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">0</span>]
y_pred = [<span class="st">1</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">0</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">1</span>,<span class="st">0</span>,<span class="st">1</span>,<span class="st">0</span>]

<span class="cm"># Full report</span>
print(classification_report(y_true, y_pred))

<span class="cm"># Individual metrics</span>
p = precision_score(y_true, y_pred)
r = recall_score(y_true, y_pred)
f = f1_score(y_true, y_pred)</pre></div>
  <div class="callout info"><strong>Threshold matters:</strong> Most classifiers output probabilities. Changing the threshold trades precision for recall. Don't just use 0.5 — tune it for your problem.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Precision vs recall is the same trade-off you see in <a href="#roc-auc">ROC curves</a> and in <a href="../markets/psychology/#fear-greed" target="_blank" rel="noopener">market fear/greed</a> — cautious vs aggressive, and the cost of being wrong in each direction.</div>
  <div class="topic-nav" id="nav-confusion-matrix"></div>
</div>`;
}

/* 02 — ROC & AUC Curves */
function buildROCAUC() {
  return `<div class="topic" id="roc-auc">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Evaluate Your Model</div><h2>ROC &amp; <em>AUC</em> Curves</h2></div>
    <span class="topic-badge">Classification</span>
  </div>
  <p class="sub">// Visualising model performance across all thresholds</p>
  <p class="prose">The <strong>ROC curve</strong> plots True Positive Rate vs False Positive Rate at every threshold. The <strong>AUC</strong> (area under curve) collapses this into a single number: 1.0 = perfect, 0.5 = random. It's threshold-independent, making it ideal for comparing models.</p>
  <div class="fb"><div class="fm">TPR = TP / (TP + FN) &nbsp;&nbsp; FPR = FP / (FP + TN)</div><div class="fd"><span>TPR</span> = sensitivity/recall &nbsp;|&nbsp; <span>FPR</span> = 1 &minus; specificity &nbsp;|&nbsp; plotted as (FPR, TPR)</div></div>
  <div class="fb c2"><div class="fm">AUC = &int; TPR(FPR) dFPR &isin; [0, 1]</div><div class="fd"><span>AUC</span> = probability that the model ranks a random positive higher than a random negative</div></div>
  <div class="va">
    <div class="vl">// Interactive ROC — adjust model separability</div>
    <canvas id="rocCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Separability</span><input type="range" id="rocSep" min="0" max="100" step="1" value="65"><span class="vd" id="rocSepV">0.65</span></div>
      <div class="cg"><span class="cl">AUC</span><span class="vd" id="rocAuc" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — ROC & AUC</span>
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> roc_curve, roc_auc_score
<span class="kw">import</span> matplotlib.pyplot <span class="kw">as</span> plt

fpr, tpr, thresholds = roc_curve(y_true, y_prob)
auc = roc_auc_score(y_true, y_prob)

plt.plot(fpr, tpr, label=<span class="st">f'AUC = {auc:.3f}'</span>)
plt.plot([<span class="st">0</span>,<span class="st">1</span>],[<span class="st">0</span>,<span class="st">1</span>], <span class="st">'--'</span>, color=<span class="st">'gray'</span>)
plt.xlabel(<span class="st">'FPR'</span>); plt.ylabel(<span class="st">'TPR'</span>)
plt.legend(); plt.show()</pre></div>
  <div class="callout info"><strong>Multi-class:</strong> Use <code>roc_auc_score(y, y_prob, multi_class='ovr')</code> with one-vs-rest for multi-class problems.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> AUC measures discrimination — can the model separate classes? In <a href="../markets/indicators/#rsi" target="_blank" rel="noopener">RSI</a>, you're doing the same thing: separating overbought from oversold regimes across different threshold levels.</div>
  <div class="topic-nav" id="nav-roc-auc"></div>
</div>`;
}

/* 03 — Regression Metrics */
function buildRegressionMetrics() {
  return `<div class="topic" id="regression-metrics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Evaluate Your Model</div><h2>Regression <em>Metrics</em></h2></div>
    <span class="topic-badge">Regression</span>
  </div>
  <p class="sub">// MAE, RMSE, R² — which metric for which problem and what the numbers actually mean</p>
  <p class="prose">Regression metrics measure how far predictions are from truth. <strong>MAE</strong> treats every error equally, <strong>RMSE</strong> penalises big errors more, and <strong>R&sup2;</strong> tells you how much variance your model explains vs a baseline mean prediction.</p>
  <div class="fb"><div class="fm">MAE = (1/n) &middot; &Sigma; |y&#x1D62; &minus; &ycirc;&#x1D62;|</div><div class="fd"><span>MAE</span> = average absolute error. Robust to outliers, interpretable in target units.</div></div>
  <div class="fb c2"><div class="fm">RMSE = &radic;((1/n) &middot; &Sigma; (y&#x1D62; &minus; &ycirc;&#x1D62;)&sup2;)</div><div class="fd"><span>RMSE</span> = penalises large errors disproportionately. Same units as target.</div></div>
  <div class="fb c3"><div class="fm">R&sup2; = 1 &minus; SS<sub>res</sub> / SS<sub>tot</sub></div><div class="fd"><span>R&sup2;</span> = fraction of variance explained. 1 = perfect, 0 = no better than predicting the mean.</div></div>
  <div class="va">
    <div class="vl">// Interactive — drag points, see metrics update</div>
    <canvas id="regCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Noise</span><input type="range" id="regNoise" min="0" max="100" step="1" value="30"><span class="vd" id="regNoiseV">0.30</span></div>
      <div class="cg"><span class="cl">MAE</span><span class="vd" id="regMAE" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">RMSE</span><span class="vd" id="regRMSE" style="color:#4fc3f7">—</span></div>
      <div class="cg"><span class="cl">R&sup2;</span><span class="vd" id="regR2" style="color:#81c784">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — regression metrics</span>
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> (
    mean_absolute_error, mean_squared_error, r2_score
)

mae  = mean_absolute_error(y_true, y_pred)
rmse = mean_squared_error(y_true, y_pred, squared=<span class="st">False</span>)
r2   = r2_score(y_true, y_pred)

print(<span class="st">f"MAE: {mae:.3f}  RMSE: {rmse:.3f}  R²: {r2:.3f}"</span>)</pre></div>
  <div class="callout"><strong>Adjusted R&sup2;:</strong> R&sup2;<sub>adj</sub> = 1 &minus; (1&minus;R&sup2;)(n&minus;1)/(n&minus;p&minus;1). Penalises adding features. Always use adjusted R&sup2; when comparing models with different feature counts.</div>
  <div class="topic-nav" id="nav-regression-metrics"></div>
</div>`;
}

/* 04 — Cross-Validation Done Right */
function buildCrossValidation() {
  return `<div class="topic" id="cross-validation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Evaluate Your Model</div><h2>Cross-Validation <em>Done Right</em></h2></div>
    <span class="topic-badge">Validation</span>
  </div>
  <p class="sub">// Splitting your data honestly — k-fold, stratified, time-series split, and the leakage traps</p>
  <p class="prose"><strong>Cross-validation</strong> rotates which data is used for training and testing. <strong>K-fold</strong> splits data into k parts, trains on k&minus;1, tests on the held-out fold, and repeats. The mean score across folds is a robust estimate of generalisation.</p>
  <div class="fb"><div class="fm">CV Score = (1/k) &middot; &Sigma; Score(fold&#x1D62;)</div><div class="fd">Average <span>test score</span> across k folds. Standard deviation shows stability.</div></div>
  <div class="va">
    <div class="vl">// Interactive — k folds visualised with train/test splits</div>
    <canvas id="cvCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">K folds</span><input type="range" id="cvK" min="2" max="10" step="1" value="5"><span class="vd" id="cvKv">5</span></div>
      <div class="cg"><span class="cl">Mode</span><button class="btn" id="cvMode" onclick="toggleCVMode()">K-Fold</button></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Method</th><th>Use when</th><th>Watch out</th></tr></thead>
    <tbody>
      <tr><td>K-Fold</td><td>General purpose, enough data</td><td>Shuffling breaks time order</td></tr>
      <tr><td>Stratified K-Fold</td><td>Imbalanced classes</td><td>Preserves class ratios per fold</td></tr>
      <tr><td>Time Series Split</td><td>Temporal data (stocks, logs)</td><td>Train always before test</td></tr>
      <tr><td>Leave-One-Out</td><td>Tiny datasets</td><td>Expensive, high variance</td></tr>
      <tr><td>Nested CV</td><td>Hyperparameter tuning + eval</td><td>Inner loop tunes, outer evaluates</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — cross-validation</span>
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> (
    cross_val_score, StratifiedKFold, TimeSeriesSplit
)

<span class="cm"># Standard k-fold</span>
scores = cross_val_score(model, X, y, cv=<span class="st">5</span>, scoring=<span class="st">'f1'</span>)
print(<span class="st">f"F1: {scores.mean():.3f} ± {scores.std():.3f}"</span>)

<span class="cm"># Time series — never leak future data</span>
tscv = TimeSeriesSplit(n_splits=<span class="st">5</span>)
scores = cross_val_score(model, X, y, cv=tscv)</pre></div>
  <div class="callout info"><strong>Data leakage trap:</strong> If you scale or impute <em>before</em> splitting, information from the test fold leaks into training. Always put preprocessing inside a <code>Pipeline</code>.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Cross-validation in ML and <a href="#walk-forward">walk-forward validation</a> in backtesting are the same principle — testing on data the model has never seen. The time-series variant here connects directly to market backtesting.</div>
  <div class="topic-nav" id="nav-cross-validation"></div>
</div>`;
}

/* 05 — Comparing Model Runs */
function buildComparingRuns() {
  return `<div class="topic" id="comparing-runs">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Evaluate Your Model</div><h2>Comparing <em>Model Runs</em></h2></div>
    <span class="topic-badge">Testing</span>
  </div>
  <p class="sub">// Is this improvement real? Statistical tests for comparing model performance across runs</p>
  <p class="prose">Model A got 0.87 F1. Model B got 0.89. Is that difference real or just noise? You need <strong>statistical tests</strong> on paired cross-validation scores to answer confidently. Without them, you're just reading tea leaves.</p>
  <div class="fb"><div class="fm">t = (&mu;<sub>A</sub> &minus; &mu;<sub>B</sub>) / SE(&mu;<sub>A</sub> &minus; &mu;<sub>B</sub>)</div><div class="fd"><span>Paired t-test</span> on k-fold scores — the simplest comparison. Assumes normality of differences.</div></div>
  <div class="fb c2"><div class="fm">McNemar: &chi;&sup2; = (b &minus; c)&sup2; / (b + c)</div><div class="fd"><span>McNemar&rsquo;s test</span> &mdash; compares errors on the same test set. b,c = discordant predictions.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two model score distributions, see p-value</div>
    <canvas id="compCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model A mean</span><input type="range" id="compA" min="70" max="95" step="1" value="85"><span class="vd" id="compAv">0.85</span></div>
      <div class="cg"><span class="cl">Model B mean</span><input type="range" id="compB" min="70" max="95" step="1" value="88"><span class="vd" id="compBv">0.88</span></div>
      <div class="cg"><span class="cl">p-value</span><span class="vd" id="compP" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — comparing two models</span>
<span class="kw">from</span> scipy.stats <span class="kw">import</span> ttest_rel, wilcoxon

<span class="cm"># Paired t-test on k-fold scores</span>
scores_a = cross_val_score(model_a, X, y, cv=<span class="st">10</span>)
scores_b = cross_val_score(model_b, X, y, cv=<span class="st">10</span>)
t_stat, p_val = ttest_rel(scores_a, scores_b)

<span class="cm"># Non-parametric alternative</span>
w_stat, p_val = wilcoxon(scores_a, scores_b)
print(<span class="st">f"p = {p_val:.4f}"</span>)</pre></div>
  <div class="callout"><strong>Rule of thumb:</strong> If p &lt; 0.05, the difference is statistically significant — but also check <a href="#effect-size">effect size</a>. A significant p-value with tiny effect size means the improvement is real but may not matter.</div>
  <div class="topic-nav" id="nav-comparing-runs"></div>
</div>`;
}

/* 06 — Learning Curves & Overfitting */
function buildLearningCurves() {
  return `<div class="topic" id="learning-curves">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Evaluate Your Model</div><h2>Learning Curves &amp; <em>Overfitting</em></h2></div>
    <span class="topic-badge">Diagnostics</span>
  </div>
  <p class="sub">// Training vs validation curves — reading the gap to diagnose models</p>
  <p class="prose">A <strong>learning curve</strong> plots training and validation scores as data increases. The <strong>gap</strong> between them tells you everything: large gap = overfitting, both low = underfitting, converging = sweet spot. It also tells you if more data would help.</p>
  <div class="fb"><div class="fm">Gap = Score<sub>train</sub> &minus; Score<sub>val</sub></div><div class="fd"><span>Large gap</span> = overfitting (model memorises) &nbsp;|&nbsp; <span>Both low</span> = underfitting (model too simple)</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust complexity, see the gap</div>
    <canvas id="lcCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model complexity</span><input type="range" id="lcComp" min="1" max="100" step="1" value="50"><span class="vd" id="lcCompV">50</span></div>
      <div class="cg"><span class="cl">Diagnosis</span><span class="vd" id="lcDiag" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — learning curves</span>
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> learning_curve
<span class="kw">import</span> matplotlib.pyplot <span class="kw">as</span> plt

sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=<span class="st">5</span>, n_jobs=-<span class="st">1</span>,
    train_sizes=np.linspace(<span class="st">0.1</span>, <span class="st">1.0</span>, <span class="st">10</span>),
    scoring=<span class="st">'accuracy'</span>
)
plt.plot(sizes, train_scores.mean(axis=<span class="st">1</span>), label=<span class="st">'Train'</span>)
plt.plot(sizes, val_scores.mean(axis=<span class="st">1</span>), label=<span class="st">'Val'</span>)
plt.legend(); plt.show()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The learning curve gap is the visual form of the <a href="../ml-math/#bias-variance" target="_blank" rel="noopener">bias-variance tradeoff</a>. The same tension appears in <a href="#walk-forward">walk-forward backtesting</a> — overfitting to past market conditions.</div>
  <div class="topic-nav" id="nav-learning-curves"></div>
</div>`;
}

/* 07 — SHAP Values */
function buildSHAPValues() {
  return `<div class="topic" id="shap-values">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Understand Your Features</div><h2>SHAP <em>Values</em></h2></div>
    <span class="topic-badge">Explainability</span>
  </div>
  <p class="sub">// Game-theoretic feature attribution — understand exactly why your model made each prediction</p>
  <p class="prose"><strong>SHAP</strong> (SHapley Additive exPlanations) assigns each feature a contribution to each prediction. Based on Shapley values from cooperative game theory, SHAP is the only method with mathematical guarantees: consistency, local accuracy, and missingness.</p>
  <div class="fb"><div class="fm">&phi;&#x1D62; = &Sigma;<sub>S</sub> |S|!(M&minus;|S|&minus;1)!/M! &middot; [f(S&cup;{i}) &minus; f(S)]</div><div class="fd"><span>&phi;&#x1D62;</span> = SHAP value for feature i &nbsp;|&nbsp; averaged marginal contribution across all coalitions</div></div>
  <div class="fb c2"><div class="fm">f(x) = E[f(X)] + &Sigma; &phi;&#x1D62;</div><div class="fd">Prediction = base value + sum of all SHAP values. <span>Additive:</span> contributions always sum to prediction.</div></div>
  <div class="va">
    <div class="vl">// Interactive — feature contributions to a prediction</div>
    <canvas id="shapCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Feature count</span><input type="range" id="shapN" min="3" max="10" step="1" value="6"><span class="vd" id="shapNv">6</span></div>
      <button class="btn" onclick="reshapSHAP()">NEW SAMPLE</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — SHAP waterfall for a single prediction</span>
<span class="kw">import</span> shap

explainer = shap.TreeExplainer(model)
shap_values = explainer(X_test)

<span class="cm"># Waterfall for one prediction</span>
shap.plots.waterfall(shap_values[<span class="st">0</span>])

<span class="cm"># Global summary</span>
shap.plots.beeswarm(shap_values)</pre></div>
  <div class="callout info"><strong>Explainer choice:</strong> Use <code>TreeExplainer</code> for tree models (fast, exact). <code>KernelExplainer</code> for any model (slow, approximate). <code>DeepExplainer</code> for deep learning.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> SHAP reveals which features drive a prediction. In markets, <a href="../markets/indicators/#volume" target="_blank" rel="noopener">volume analysis</a> asks the same question — which factors are driving price? Decomposing into contributions is a universal pattern.</div>
  <div class="topic-nav" id="nav-shap-values"></div>
</div>`;
}

/* 08 — Permutation Importance */
function buildPermutationImportance() {
  return `<div class="topic" id="permutation-importance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Understand Your Features</div><h2>Permutation <em>Importance</em></h2></div>
    <span class="topic-badge">Features</span>
  </div>
  <p class="sub">// Shuffle a feature, measure the damage — a model-agnostic way to rank feature importance</p>
  <p class="prose"><strong>Permutation importance</strong> randomly shuffles one feature at a time and measures how much the model's score drops. Big drop = important feature. It works with <em>any</em> model and requires no retraining.</p>
  <div class="fb"><div class="fm">PI&#x1D62; = Score<sub>original</sub> &minus; Score<sub>shuffled(i)</sub></div><div class="fd"><span>PI</span> = importance of feature i. Higher = more important. Negative = feature hurts the model.</div></div>
  <div class="va">
    <div class="vl">// Interactive — shuffle features, see score drop</div>
    <canvas id="piCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Features</span><input type="range" id="piN" min="3" max="8" step="1" value="5"><span class="vd" id="piNv">5</span></div>
      <button class="btn" onclick="reshufflePerm()">SHUFFLE</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — permutation importance</span>
<span class="kw">from</span> sklearn.inspection <span class="kw">import</span> permutation_importance

result = permutation_importance(
    model, X_test, y_test,
    n_repeats=<span class="st">30</span>, random_state=<span class="st">42</span>,
    scoring=<span class="st">'accuracy'</span>
)

<span class="cm"># Sorted importance</span>
<span class="kw">for</span> i <span class="kw">in</span> result.importances_mean.argsort()[::-<span class="st">1</span>]:
    print(<span class="st">f"{features[i]}: {result.importances_mean[i]:.3f}"</span>)</pre></div>
  <div class="callout"><strong>Correlated features trap:</strong> If two features are correlated, shuffling one leaves the other intact — importance is split between them. Consider using SHAP or drop-column importance for correlated features.</div>
  <div class="topic-nav" id="nav-permutation-importance"></div>
</div>`;
}

/* 09 — Partial Dependence & ICE */
function buildPDPICE() {
  return `<div class="topic" id="pdp-ice">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Understand Your Features</div><h2>Partial Dependence &amp; <em>ICE</em></h2></div>
    <span class="topic-badge">Explainability</span>
  </div>
  <p class="sub">// How does changing one feature affect predictions? PDP shows the average, ICE shows every instance</p>
  <p class="prose"><strong>Partial Dependence Plots (PDP)</strong> show the average effect of one feature on predictions, marginalising over all other features. <strong>ICE plots</strong> show the same for each individual instance — revealing heterogeneity the average hides.</p>
  <div class="fb"><div class="fm">PD(x<sub>s</sub>) = (1/n) &middot; &Sigma; f(x<sub>s</sub>, x<sub>c</sub><sup>(i)</sup>)</div><div class="fd"><span>PD</span> = average prediction when feature s is fixed at x<sub>s</sub>, averaging over all other features.</div></div>
  <div class="va">
    <div class="vl">// Interactive — PDP line with individual ICE curves</div>
    <canvas id="pdpCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Show ICE</span><button class="btn" id="pdpIce" onclick="toggleICE()">ICE OFF</button></div>
      <div class="cg"><span class="cl">Instances</span><input type="range" id="pdpN" min="5" max="50" step="5" value="20"><span class="vd" id="pdpNv">20</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — PDP & ICE</span>
<span class="kw">from</span> sklearn.inspection <span class="kw">import</span> PartialDependenceDisplay

<span class="cm"># PDP with ICE</span>
PartialDependenceDisplay.from_estimator(
    model, X_train,
    features=[<span class="st">'age'</span>, <span class="st">'income'</span>],
    kind=<span class="st">'both'</span>,      <span class="cm"># PDP + ICE</span>
    ice_lines_kw={<span class="st">'alpha'</span>: <span class="st">0.1</span>}
)</pre></div>
  <div class="callout info"><strong>Interactions:</strong> If ICE lines cross each other, there's a feature interaction — the effect of this feature depends on other features' values. A flat PDP with scattered ICE means the average is misleading.</div>
  <div class="topic-nav" id="nav-pdp-ice"></div>
</div>`;
}

/* 10 — Feature Correlation & Multicollinearity */
function buildFeatureCorrelation() {
  return `<div class="topic" id="feature-correlation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Understand Your Features</div><h2>Feature Correlation &amp; <em>Multicollinearity</em></h2></div>
    <span class="topic-badge">Features</span>
  </div>
  <p class="sub">// Spotting redundant features — correlation heatmaps, VIF, and deciding what to drop</p>
  <p class="prose">Highly correlated features are redundant — they inflate coefficient variance in linear models and confuse importance measures. <strong>VIF</strong> (Variance Inflation Factor) quantifies how much each feature's coefficient variance is inflated by correlation with others.</p>
  <div class="fb"><div class="fm">VIF&#x1D62; = 1 / (1 &minus; R&#x1D62;&sup2;)</div><div class="fd"><span>VIF</span> = 1 means no collinearity &nbsp;|&nbsp; &gt;5 is concerning &nbsp;|&nbsp; &gt;10 is severe. R&#x1D62;&sup2; from regressing feature i on all others.</div></div>
  <div class="va">
    <div class="vl">// Interactive correlation heatmap</div>
    <canvas id="corrCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Features</span><input type="range" id="corrN" min="3" max="8" step="1" value="6"><span class="vd" id="corrNv">6</span></div>
      <button class="btn" onclick="regenCorr()">REGENERATE</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — correlation & VIF</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd
<span class="kw">from</span> statsmodels.stats.outliers_influence <span class="kw">import</span> variance_inflation_factor

<span class="cm"># Correlation heatmap</span>
corr = df.corr()
sns.heatmap(corr, annot=<span class="st">True</span>, cmap=<span class="st">'RdBu_r'</span>, center=<span class="st">0</span>)

<span class="cm"># VIF for each feature</span>
vif = pd.DataFrame()
vif[<span class="st">'Feature'</span>] = X.columns
vif[<span class="st">'VIF'</span>] = [variance_inflation_factor(X.values, i)
            <span class="kw">for</span> i <span class="kw">in</span> range(X.shape[<span class="st">1</span>])]</pre></div>
  <div class="callout"><strong>Drop rule:</strong> If two features have |r| &gt; 0.9, drop the one less correlated with the target, or the one with higher VIF.</div>
  <div class="topic-nav" id="nav-feature-correlation"></div>
</div>`;
}

/* 11 — Information Gain & Mutual Information */
function buildInformationGain() {
  return `<div class="topic" id="information-gain">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Understand Your Features</div><h2>Information Gain &amp; <em>Mutual Information</em></h2></div>
    <span class="topic-badge">Information Theory</span>
  </div>
  <p class="sub">// Beyond linear correlation — information-theoretic measures that capture any kind of dependency</p>
  <p class="prose"><strong>Mutual information</strong> measures how much knowing one variable reduces uncertainty about another — capturing <em>any</em> dependency (linear, nonlinear, categorical). Unlike correlation, it detects complex relationships that Pearson's r misses entirely.</p>
  <div class="fb"><div class="fm">I(X;Y) = &Sigma; p(x,y) &middot; log(p(x,y) / (p(x)&middot;p(y)))</div><div class="fd"><span>MI</span> = 0 means independent &nbsp;|&nbsp; Higher = more dependency. Always &ge; 0, unbounded above.</div></div>
  <div class="fb c2"><div class="fm">IG(Y|X) = H(Y) &minus; H(Y|X)</div><div class="fd"><span>Information Gain</span> = entropy before &minus; entropy after splitting. Used in decision trees.</div></div>
  <div class="va">
    <div class="vl">// Interactive — see MI vs correlation for different relationships</div>
    <canvas id="miCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Relationship</span><button class="btn" id="miType" onclick="cycleRelation()">Linear</button></div>
      <div class="cg"><span class="cl">MI</span><span class="vd" id="miVal" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Correlation</span><span class="vd" id="miCorr" style="color:#4fc3f7">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — mutual information for feature selection</span>
<span class="kw">from</span> sklearn.feature_selection <span class="kw">import</span> mutual_info_classif

mi = mutual_info_classif(X, y, random_state=<span class="st">42</span>)
mi_series = pd.Series(mi, index=X.columns).sort_values(ascending=<span class="st">False</span>)
print(mi_series)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Information gain is how decision trees choose splits. <a href="../ml-math/#entropy" target="_blank" rel="noopener">Entropy</a> from the ML Math collection is the foundation. In markets, high mutual information between an indicator and future returns would mean that indicator has real predictive value.</div>
  <div class="topic-nav" id="nav-information-gain"></div>
</div>`;
}

/* 12 — Distribution Shape */
function buildDistributionShape() {
  return `<div class="topic" id="distribution-shape">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Analyze Your Data</div><h2>Distribution <em>Shape</em></h2></div>
    <span class="topic-badge">Data Analysis</span>
  </div>
  <p class="sub">// Skewness, kurtosis, QQ plots — is your data normal, and does it matter?</p>
  <p class="prose">Before modelling, know your data's shape. <strong>Skewness</strong> measures asymmetry (are the tails lopsided?), <strong>kurtosis</strong> measures tail heaviness (how many extreme values?), and <strong>QQ plots</strong> show deviations from normality at a glance.</p>
  <div class="fb"><div class="fm">Skew = E[(X&minus;&mu;)&sup3;] / &sigma;&sup3;</div><div class="fd"><span>Skew</span> = 0 is symmetric &nbsp;|&nbsp; &gt;0 right tail &nbsp;|&nbsp; &lt;0 left tail</div></div>
  <div class="fb c2"><div class="fm">Kurt = E[(X&minus;&mu;)&sup4;] / &sigma;&sup4; &minus; 3</div><div class="fd"><span>Excess kurtosis</span> = 0 is normal &nbsp;|&nbsp; &gt;0 heavy tails &nbsp;|&nbsp; &lt;0 light tails</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust skew and kurtosis</div>
    <canvas id="distCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Skewness</span><input type="range" id="distSkew" min="-30" max="30" step="1" value="0"><span class="vd" id="distSkewV">0.0</span></div>
      <div class="cg"><span class="cl">Tail weight</span><input type="range" id="distKurt" min="0" max="100" step="1" value="30"><span class="vd" id="distKurtV">3.0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — distribution diagnostics</span>
<span class="kw">from</span> scipy.stats <span class="kw">import</span> skew, kurtosis, probplot
<span class="kw">import</span> matplotlib.pyplot <span class="kw">as</span> plt

print(<span class="st">f"Skew: {skew(data):.3f}"</span>)
print(<span class="st">f"Kurt: {kurtosis(data):.3f}"</span>)

<span class="cm"># QQ plot — points on line = normal</span>
fig, ax = plt.subplots()
probplot(data, plot=ax)
plt.show()</pre></div>
  <div class="callout"><strong>When it matters:</strong> Linear regression assumes normal residuals. Many tests assume normality. Log-transform right-skewed data. Market returns have heavy tails (excess kurtosis) — never assume normal.</div>
  <div class="topic-nav" id="nav-distribution-shape"></div>
</div>`;
}

/* 13 — Outlier Detection */
function buildOutlierDetection() {
  return `<div class="topic" id="outlier-detection">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Analyze Your Data</div><h2>Outlier <em>Detection</em></h2></div>
    <span class="topic-badge">Data Analysis</span>
  </div>
  <p class="sub">// IQR, Z-score, Isolation Forest — finding extreme values and knowing when they're the signal</p>
  <p class="prose">Outliers can be errors to fix or signal to keep. <strong>Z-score</strong> flags points far from the mean, <strong>IQR</strong> is robust to skew, and <strong>Isolation Forest</strong> catches complex multi-dimensional outliers that univariate methods miss.</p>
  <div class="fb"><div class="fm">IQR method: outlier if x &lt; Q1 &minus; 1.5&middot;IQR or x &gt; Q3 + 1.5&middot;IQR</div><div class="fd"><span>IQR</span> = Q3 &minus; Q1 (interquartile range). Robust to skewed distributions.</div></div>
  <div class="fb c2"><div class="fm">Z = (x &minus; &mu;) / &sigma; &nbsp;&nbsp; outlier if |Z| &gt; 3</div><div class="fd"><span>Z-score</span> = standard deviations from mean. Assumes roughly normal data.</div></div>
  <div class="va">
    <div class="vl">// Interactive — scattered points with outlier detection zones</div>
    <canvas id="outCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Method</span><button class="btn" id="outMethod" onclick="cycleOutlier()">IQR</button></div>
      <div class="cg"><span class="cl">Outliers</span><span class="vd" id="outCount" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — outlier detection</span>
<span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> IsolationForest
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># IQR method</span>
Q1, Q3 = np.percentile(data, [<span class="st">25</span>, <span class="st">75</span>])
IQR = Q3 - Q1
mask = (data &lt; Q1 - <span class="st">1.5</span>*IQR) | (data &gt; Q3 + <span class="st">1.5</span>*IQR)

<span class="cm"># Isolation Forest — multi-dimensional</span>
iso = IsolationForest(contamination=<span class="st">0.05</span>)
labels = iso.fit_predict(X)  <span class="cm"># -1 = outlier</span></pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> In markets, outliers are <a href="../markets/psychology/#black-swan" target="_blank" rel="noopener">black swan events</a> — the crash days that break every model. In fraud detection, the outliers <em>are</em> the target. Context decides whether to remove or study them.</div>
  <div class="topic-nav" id="nav-outlier-detection"></div>
</div>`;
}

/* 14 — Missing Data Strategies */
function buildMissingData() {
  return `<div class="topic" id="missing-data">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Analyze Your Data</div><h2>Missing Data <em>Strategies</em></h2></div>
    <span class="topic-badge">Data Quality</span>
  </div>
  <p class="sub">// Imputation, MICE, missingness patterns — handling gaps without corrupting your analysis</p>
  <p class="prose">Missing data isn't just annoying — <em>why</em> it's missing matters. <strong>MCAR</strong> (completely random) is safe to drop. <strong>MAR</strong> (depends on observed data) needs smart imputation. <strong>MNAR</strong> (depends on the missing value itself) is the hardest case.</p>
  <div class="fb"><div class="fm">MCAR: P(missing) = constant</div><div class="fd">Missing <span>completely at random</span>. Dropping rows is unbiased but wasteful.</div></div>
  <div class="fb c2"><div class="fm">MAR: P(missing | observed) &ne; P(missing)</div><div class="fd">Missing <span>at random</span> given observed data. Use MICE, KNN imputation.</div></div>
  <div class="va">
    <div class="vl">// Interactive — missing data patterns and imputation</div>
    <canvas id="missCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">% Missing</span><input type="range" id="missPct" min="5" max="50" step="5" value="20"><span class="vd" id="missPctV">20%</span></div>
      <div class="cg"><span class="cl">Strategy</span><button class="btn" id="missStrat" onclick="cycleImpute()">Mean</button></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — imputation strategies</span>
<span class="kw">from</span> sklearn.impute <span class="kw">import</span> SimpleImputer, KNNImputer
<span class="kw">from</span> sklearn.experimental <span class="kw">import</span> enable_iterative_imputer
<span class="kw">from</span> sklearn.impute <span class="kw">import</span> IterativeImputer

<span class="cm"># Simple: median (robust to outliers)</span>
imp = SimpleImputer(strategy=<span class="st">'median'</span>)

<span class="cm"># KNN: uses similar rows</span>
imp = KNNImputer(n_neighbors=<span class="st">5</span>)

<span class="cm"># MICE: iterative multivariate</span>
imp = IterativeImputer(max_iter=<span class="st">10</span>)
X_filled = imp.fit_transform(X)</pre></div>
  <div class="callout info"><strong>Never impute the target.</strong> And always impute <em>inside</em> cross-validation folds to prevent data leakage.</div>
  <div class="topic-nav" id="nav-missing-data"></div>
</div>`;
}

/* 15 — Data Drift & Distribution Shift */
function buildDataDrift() {
  return `<div class="topic" id="data-drift">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Analyze Your Data</div><h2>Data Drift &amp; <em>Distribution Shift</em></h2></div>
    <span class="topic-badge">Monitoring</span>
  </div>
  <p class="sub">// Is your model still valid? PSI, KS test, and detecting when the world has changed</p>
  <p class="prose">Models decay when the data distribution shifts. <strong>PSI</strong> (Population Stability Index) detects changes in feature distributions. The <strong>KS test</strong> checks if two samples came from the same distribution. Monitor these to know when to retrain.</p>
  <div class="fb"><div class="fm">PSI = &Sigma; (p&#x1D62; &minus; q&#x1D62;) &middot; ln(p&#x1D62; / q&#x1D62;)</div><div class="fd"><span>PSI</span> &lt; 0.1 = no drift &nbsp;|&nbsp; 0.1&ndash;0.25 = moderate &nbsp;|&nbsp; &gt;0.25 = significant shift</div></div>
  <div class="fb c2"><div class="fm">KS = max|F<sub>ref</sub>(x) &minus; F<sub>new</sub>(x)|</div><div class="fd"><span>Kolmogorov-Smirnov</span> = maximum distance between two CDFs. p &lt; 0.05 → distributions differ.</div></div>
  <div class="va">
    <div class="vl">// Interactive — reference vs new distribution with drift</div>
    <canvas id="driftCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Drift amount</span><input type="range" id="driftAmt" min="0" max="100" step="1" value="0"><span class="vd" id="driftAmtV">0.0</span></div>
      <div class="cg"><span class="cl">PSI</span><span class="vd" id="driftPSI" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — PSI & KS test</span>
<span class="kw">from</span> scipy.stats <span class="kw">import</span> ks_2samp
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">def</span> <span class="fn">psi</span>(ref, new, bins=<span class="st">10</span>):
    edges = np.histogram_bin_edges(ref, bins=bins)
    p = np.histogram(ref, bins=edges)[<span class="st">0</span>] / len(ref) + <span class="st">1e-6</span>
    q = np.histogram(new, bins=edges)[<span class="st">0</span>] / len(new) + <span class="st">1e-6</span>
    <span class="kw">return</span> np.sum((p - q) * np.log(p / q))

<span class="cm"># KS test</span>
stat, p_val = ks_2samp(ref_data, new_data)
print(<span class="st">f"KS stat: {stat:.3f}, p: {p_val:.4f}"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Data drift in ML mirrors <a href="../markets/psychology/#regime" target="_blank" rel="noopener">regime changes</a> in markets. Both signal that the rules have changed — past patterns no longer predict the future.</div>
  <div class="topic-nav" id="nav-data-drift"></div>
</div>`;
}

/* 16 — Sampling & Class Imbalance */
function buildClassImbalance() {
  return `<div class="topic" id="class-imbalance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Analyze Your Data</div><h2>Sampling &amp; <em>Class Imbalance</em></h2></div>
    <span class="topic-badge">Data Prep</span>
  </div>
  <p class="sub">// SMOTE, undersampling, class weights — strategies when your classes are nowhere near 50/50</p>
  <p class="prose">Fraud detection: 0.1% positive. Disease screening: 2% positive. With severe class imbalance, a model that predicts "no" always gets 99%+ accuracy while being useless. You need <strong>resampling</strong> or <strong>cost-sensitive learning</strong>.</p>
  <div class="fb"><div class="fm">SMOTE: x<sub>new</sub> = x&#x1D62; + &lambda; &middot; (x<sub>nn</sub> &minus; x&#x1D62;)</div><div class="fd"><span>SMOTE</span> creates synthetic minority samples by interpolating between a sample and its nearest neighbour.</div></div>
  <div class="va">
    <div class="vl">// Interactive — class ratio and resampling effect</div>
    <canvas id="imbCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Imbalance ratio</span><input type="range" id="imbRatio" min="1" max="50" step="1" value="10"><span class="vd" id="imbRatioV">1:10</span></div>
      <div class="cg"><span class="cl">Strategy</span><button class="btn" id="imbStrat" onclick="cycleImbalance()">None</button></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — handling imbalance</span>
<span class="kw">from</span> imblearn.over_sampling <span class="kw">import</span> SMOTE
<span class="kw">from</span> imblearn.under_sampling <span class="kw">import</span> RandomUnderSampler
<span class="kw">from</span> imblearn.pipeline <span class="kw">import</span> Pipeline

<span class="cm"># SMOTE + undersampling combo</span>
pipeline = Pipeline([
    (<span class="st">'smote'</span>, SMOTE(sampling_strategy=<span class="st">0.5</span>)),
    (<span class="st">'under'</span>, RandomUnderSampler(sampling_strategy=<span class="st">0.8</span>)),
])
X_res, y_res = pipeline.fit_resample(X_train, y_train)

<span class="cm"># Or just use class weights</span>
model = RandomForestClassifier(class_weight=<span class="st">'balanced'</span>)</pre></div>
  <div class="callout info"><strong>Never SMOTE the test set.</strong> Apply resampling only to training data, inside the CV loop.</div>
  <div class="topic-nav" id="nav-class-imbalance"></div>
</div>`;
}

/* 17 — Sharpe Ratio & Risk-Adjusted Returns */
function buildSharpeRatio() {
  return `<div class="topic" id="sharpe-ratio">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Backtest &amp; Validate</div><h2>Sharpe Ratio &amp; <em>Risk-Adjusted Returns</em></h2></div>
    <span class="topic-badge">Performance</span>
  </div>
  <p class="sub">// Interpreting Sharpe, Sortino, Calmar — return per unit of risk</p>
  <p class="prose">Raw returns are meaningless without risk context. The <strong>Sharpe ratio</strong> measures excess return per unit of <em>total</em> volatility. <strong>Sortino</strong> only penalises downside volatility. <strong>Calmar</strong> divides return by maximum drawdown — the worst-case measure.</p>
  <div class="fb"><div class="fm">Sharpe = (R<sub>p</sub> &minus; R<sub>f</sub>) / &sigma;<sub>p</sub></div><div class="fd"><span>Sharpe</span> = annualised excess return / annualised std dev. &gt;1 is good, &gt;2 is excellent.</div></div>
  <div class="fb c2"><div class="fm">Sortino = (R<sub>p</sub> &minus; R<sub>f</sub>) / &sigma;<sub>downside</sub></div><div class="fd"><span>Sortino</span> = only penalises negative volatility. Better for asymmetric return distributions.</div></div>
  <div class="fb c3"><div class="fm">Calmar = R<sub>annual</sub> / |MaxDrawdown|</div><div class="fd"><span>Calmar</span> = return divided by worst-case loss. Sensitive to tail risk.</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust return and volatility, see ratios</div>
    <canvas id="sharpeCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Return %</span><input type="range" id="sharpeRet" min="0" max="40" step="1" value="12"><span class="vd" id="sharpeRetV">12%</span></div>
      <div class="cg"><span class="cl">Volatility %</span><input type="range" id="sharpeVol" min="5" max="40" step="1" value="15"><span class="vd" id="sharpeVolV">15%</span></div>
      <div class="cg"><span class="cl">Sharpe</span><span class="vd" id="sharpeSR" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — risk-adjusted ratios</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

returns = df[<span class="st">'returns'</span>]
rf = <span class="st">0.05</span> / <span class="st">252</span>  <span class="cm"># daily risk-free rate</span>

<span class="cm"># Sharpe (annualised)</span>
sharpe = (returns.mean() - rf) / returns.std() * np.sqrt(<span class="st">252</span>)

<span class="cm"># Sortino (downside only)</span>
down = returns[returns &lt; <span class="st">0</span>].std()
sortino = (returns.mean() - rf) / down * np.sqrt(<span class="st">252</span>)

<span class="cm"># Calmar</span>
cum = (<span class="st">1</span> + returns).cumprod()
dd = (cum / cum.cummax() - <span class="st">1</span>).min()
calmar = returns.mean() * <span class="st">252</span> / abs(dd)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The Sharpe ratio is signal-to-noise for finance. In ML, the same concept appears as <a href="#comparing-runs">comparing model runs</a> — is the improvement larger than the noise? Both ask: is this real or random?</div>
  <div class="topic-nav" id="nav-sharpe-ratio"></div>
</div>`;
}

/* 18 — Maximum Drawdown & Recovery */
function buildMaxDrawdown() {
  return `<div class="topic" id="max-drawdown">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Backtest &amp; Validate</div><h2>Maximum Drawdown &amp; <em>Recovery</em></h2></div>
    <span class="topic-badge">Risk</span>
  </div>
  <p class="sub">// Measuring worst-case loss from peak — depth, duration, and recovery time</p>
  <p class="prose"><strong>Maximum drawdown</strong> is the largest peak-to-trough decline in portfolio value. It answers the question every investor asks: "How bad can it get?" <strong>Recovery time</strong> — how long to reach a new high — is equally important.</p>
  <div class="fb"><div class="fm">DD(t) = (Peak(t) &minus; Value(t)) / Peak(t)</div><div class="fd"><span>Drawdown</span> at time t. <span>Max Drawdown</span> = max over all t. Expressed as percentage.</div></div>
  <div class="va">
    <div class="vl">// Interactive equity curve with drawdown shading</div>
    <canvas id="ddCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Volatility</span><input type="range" id="ddVol" min="5" max="50" step="1" value="20"><span class="vd" id="ddVolV">20%</span></div>
      <div class="cg"><span class="cl">Max DD</span><span class="vd" id="ddMax" style="color:var(--accent)">—</span></div>
      <button class="btn" onclick="regenDD()">NEW PATH</button>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — drawdown analysis</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

cum_returns = (<span class="st">1</span> + returns).cumprod()
running_max = cum_returns.cummax()
drawdown = (cum_returns - running_max) / running_max
max_dd = drawdown.min()
print(<span class="st">f"Max Drawdown: {max_dd:.1%}"</span>)

<span class="cm"># Recovery time</span>
underwater = drawdown &lt; <span class="st">0</span>
recovery_periods = underwater.astype(int).groupby(
    (~underwater).cumsum()
).sum()</pre></div>
  <div class="callout"><strong>Psychology:</strong> A 50% drawdown requires a 100% gain to recover. A 33% drawdown needs 50%. The math is against you — managing drawdown is as important as maximising return.</div>
  <div class="topic-nav" id="nav-max-drawdown"></div>
</div>`;
}

/* 19 — Walk-Forward Validation */
function buildWalkForward() {
  return `<div class="topic" id="walk-forward">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Backtest &amp; Validate</div><h2>Walk-Forward <em>Validation</em></h2></div>
    <span class="topic-badge">Backtesting</span>
  </div>
  <p class="sub">// Rolling window backtesting — the right way to validate strategies on time-ordered data</p>
  <p class="prose"><strong>Walk-forward</strong> slides a training window through time, always testing on the next unseen period. It simulates real deployment: train on the past, predict the future. <strong>Anchored</strong> mode grows the training window. <strong>Rolling</strong> keeps it fixed.</p>
  <div class="fb"><div class="fm">Train: [t&minus;W, t] &rarr; Test: [t+1, t+S]</div><div class="fd"><span>W</span> = training window &nbsp;|&nbsp; <span>S</span> = test step &nbsp;|&nbsp; then slide forward by S and repeat.</div></div>
  <div class="va">
    <div class="vl">// Interactive — rolling vs anchored walk-forward</div>
    <canvas id="wfCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Window size</span><input type="range" id="wfWin" min="3" max="15" step="1" value="8"><span class="vd" id="wfWinV">8</span></div>
      <div class="cg"><span class="cl">Mode</span><button class="btn" id="wfMode" onclick="toggleWFMode()">Rolling</button></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — walk-forward with TimeSeriesSplit</span>
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=<span class="st">5</span>)
results = []
<span class="kw">for</span> train_idx, test_idx <span class="kw">in</span> tscv.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    model.fit(X_train, y[train_idx])
    score = model.score(X_test, y[test_idx])
    results.append(score)

print(<span class="st">f"Walk-forward: {np.mean(results):.3f}"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Walk-forward validation is <a href="#cross-validation">cross-validation</a> adapted for time. The same "never test on training data" principle, but respecting temporal order — critical in both ML deployment and <a href="../markets/charts/#trends" target="_blank" rel="noopener">market trend analysis</a>.</div>
  <div class="topic-nav" id="nav-walk-forward"></div>
</div>`;
}

/* 20 — Monte Carlo Simulation */
function buildMonteCarlo() {
  return `<div class="topic" id="monte-carlo">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Backtest &amp; Validate</div><h2>Monte Carlo <em>Simulation</em></h2></div>
    <span class="topic-badge">Simulation</span>
  </div>
  <p class="sub">// Simulating thousands of paths — confidence bands on strategy performance</p>
  <p class="prose"><strong>Monte Carlo</strong> generates thousands of possible equity paths by resampling or simulating returns. Instead of one backtest (which is one path through history), you get a <em>distribution</em> of outcomes. The 5th percentile shows your realistic worst case.</p>
  <div class="fb"><div class="fm">Path&#x1D62;(t) = &Pi;<sub>d=1</sub><sup>t</sup> (1 + r<sub>d</sub><sup>(i)</sup>)</div><div class="fd">Each path is a product of randomly sampled daily returns. <span>N paths</span> give a fan of possible outcomes.</div></div>
  <div class="va">
    <div class="vl">// Interactive — simulated equity paths with confidence bands</div>
    <canvas id="mcCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Paths</span><input type="range" id="mcPaths" min="10" max="500" step="10" value="100"><span class="vd" id="mcPathsV">100</span></div>
      <button class="btn" onclick="regenMC()">SIMULATE</button>
      <div class="cg"><span class="cl">5th %ile</span><span class="vd" id="mc5" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Monte Carlo equity simulation</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

daily_returns = df[<span class="st">'returns'</span>].values
n_sims, n_days = <span class="st">1000</span>, <span class="st">252</span>

<span class="cm"># Resample with replacement</span>
paths = np.zeros((n_sims, n_days))
<span class="kw">for</span> i <span class="kw">in</span> range(n_sims):
    sampled = np.random.choice(daily_returns, size=n_days)
    paths[i] = np.cumprod(<span class="st">1</span> + sampled)

<span class="cm"># Confidence bands</span>
p5  = np.percentile(paths, <span class="st">5</span>, axis=<span class="st">0</span>)
p95 = np.percentile(paths, <span class="st">95</span>, axis=<span class="st">0</span>)</pre></div>
  <div class="callout"><strong>Limitation:</strong> Monte Carlo assumes returns are i.i.d. Real markets have autocorrelation, volatility clustering, and regime changes. Use block bootstrap to preserve some time structure.</div>
  <div class="topic-nav" id="nav-monte-carlo"></div>
</div>`;
}

/* 21 — Survivorship & Look-Ahead Bias */
function buildSurvivorshipBias() {
  return `<div class="topic" id="survivorship-bias">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Backtest &amp; Validate</div><h2>Survivorship &amp; <em>Look-Ahead Bias</em></h2></div>
    <span class="topic-badge">Bias</span>
  </div>
  <p class="sub">// The silent traps that make your backtest a fantasy</p>
  <p class="prose"><strong>Survivorship bias</strong>: testing only on stocks that still exist today (ignoring delisted failures). <strong>Look-ahead bias</strong>: using data that wasn't available at the time of the decision. Both make backtests look better than reality.</p>
  <div class="fb"><div class="fm">Survivorship: Universe(t) &ne; Universe(today)</div><div class="fd">The S&amp;P 500 today excluded hundreds of failed companies that were in it in 2005.</div></div>
  <div class="fb c2"><div class="fm">Look-ahead: f(t) must use only data from [0, t]</div><div class="fd">Earnings announced on day t+3 can't inform a decision on day t, even if your database has it.</div></div>
  <div class="va">
    <div class="vl">// Interactive — survivorship bias impact on backtest returns</div>
    <canvas id="survCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Delisted %</span><input type="range" id="survDel" min="0" max="40" step="1" value="15"><span class="vd" id="survDelV">15%</span></div>
      <div class="cg"><span class="cl">Biased return</span><span class="vd" id="survBias" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Real return</span><span class="vd" id="survReal" style="color:#81c784">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Checklist — is your backtest honest?</span>
<span class="cm"># 1. Does your universe include delisted stocks?</span>
<span class="cm"># 2. Are you using point-in-time data?</span>
<span class="cm"># 3. Are fundamentals lagged by reporting delay?</span>
<span class="cm"># 4. Is there any future information leaking?</span>
<span class="cm"># 5. Did you optimise parameters on the test period?</span>
<span class="cm"># 6. How many strategies did you test? (data snooping)</span>

<span class="cm"># Point-in-time fundamental data</span>
<span class="cm"># Use 'as_of' date columns, not 'period_end'</span>
df = df[df[<span class="st">'report_date'</span>] &lt;= df[<span class="st">'trade_date'</span>]]</pre></div>
  <div class="callout info"><strong>Data snooping:</strong> If you tested 100 strategies, 5 will look significant at p &lt; 0.05 by pure chance. Adjust for multiple comparisons (Bonferroni) or use a holdout period you never touch.</div>
  <div class="topic-nav" id="nav-survivorship-bias"></div>
</div>`;
}

/* 22 — Confidence Intervals */
function buildConfidenceIntervals() {
  return `<div class="topic" id="confidence-intervals">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Make Decisions</div><h2>Confidence <em>Intervals</em></h2></div>
    <span class="topic-badge">Inference</span>
  </div>
  <p class="sub">// How sure are you? — bootstrap and parametric CIs, and interpreting their width</p>
  <p class="prose">A <strong>confidence interval</strong> gives a range of plausible values for an unknown parameter. A 95% CI means: if we repeated this experiment many times, 95% of the intervals computed this way would contain the true value. Width = uncertainty.</p>
  <div class="fb"><div class="fm">CI = x&#772; &plusmn; z &middot; (&sigma; / &radic;n)</div><div class="fd"><span>Parametric CI</span> for means. z = 1.96 for 95%. Width shrinks with &radic;n.</div></div>
  <div class="fb c2"><div class="fm">Bootstrap CI: [&theta;*<sub>2.5%</sub>, &theta;*<sub>97.5%</sub>]</div><div class="fd"><span>Bootstrap CI</span> = percentiles of the resampled distribution. No normality assumption needed.</div></div>
  <div class="va">
    <div class="vl">// Interactive — sample size vs CI width</div>
    <canvas id="ciCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sample size</span><input type="range" id="ciN" min="10" max="500" step="10" value="50"><span class="vd" id="ciNv">50</span></div>
      <div class="cg"><span class="cl">Confidence</span><input type="range" id="ciConf" min="80" max="99" step="1" value="95"><span class="vd" id="ciConfV">95%</span></div>
      <div class="cg"><span class="cl">Width</span><span class="vd" id="ciWidth" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — confidence intervals</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">from</span> scipy.stats <span class="kw">import</span> sem, t

<span class="cm"># Parametric (t-distribution for small samples)</span>
n = len(data)
ci = t.interval(<span class="st">0.95</span>, df=n-<span class="st">1</span>, loc=np.mean(data), scale=sem(data))

<span class="cm"># Bootstrap</span>
boots = [np.mean(np.random.choice(data, size=n, replace=<span class="st">True</span>))
         <span class="kw">for</span> _ <span class="kw">in</span> range(<span class="st">10000</span>)]
ci_boot = np.percentile(boots, [<span class="st">2.5</span>, <span class="st">97.5</span>])</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> CIs quantify uncertainty. In ML, report metric &plusmn; CI from <a href="#cross-validation">cross-validation</a>. In markets, <a href="#monte-carlo">Monte Carlo</a> confidence bands are CIs for portfolio outcomes.</div>
  <div class="topic-nav" id="nav-confidence-intervals"></div>
</div>`;
}

/* 23 — Bootstrap Methods */
function buildBootstrapMethods() {
  return `<div class="topic" id="bootstrap-methods">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Make Decisions</div><h2>Bootstrap <em>Methods</em></h2></div>
    <span class="topic-badge">Resampling</span>
  </div>
  <p class="sub">// Estimate anything with resampling — the nonparametric Swiss army knife for uncertainty</p>
  <p class="prose"><strong>Bootstrap</strong> resamples your data with replacement thousands of times, computing your statistic each time. The distribution of bootstrap estimates approximates the sampling distribution of your statistic — giving you standard errors and CIs without formulas.</p>
  <div class="fb"><div class="fm">&theta;* = statistic(resample(data))</div><div class="fd">Repeat B times &rarr; distribution of &theta;* &rarr; <span>SE</span> = std(&theta;*) &nbsp;|&nbsp; <span>CI</span> = percentiles</div></div>
  <div class="va">
    <div class="vl">// Interactive — bootstrap distribution of the mean</div>
    <canvas id="bootCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Resamples</span><input type="range" id="bootB" min="100" max="5000" step="100" value="1000"><span class="vd" id="bootBv">1000</span></div>
      <button class="btn" onclick="regenBoot()">RESAMPLE</button>
      <div class="cg"><span class="cl">SE</span><span class="vd" id="bootSE" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — bootstrap for any statistic</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">def</span> <span class="fn">bootstrap</span>(data, stat_fn, B=<span class="st">10000</span>):
    n = len(data)
    estimates = [stat_fn(np.random.choice(data, n, replace=<span class="st">True</span>))
                 <span class="kw">for</span> _ <span class="kw">in</span> range(B)]
    <span class="kw">return</span> np.array(estimates)

<span class="cm"># Bootstrap the median (no formula needed!)</span>
boots = bootstrap(data, np.median)
ci = np.percentile(boots, [<span class="st">2.5</span>, <span class="st">97.5</span>])
se = boots.std()</pre></div>
  <div class="callout"><strong>BCa (bias-corrected and accelerated):</strong> The basic percentile method works but BCa is more accurate for skewed distributions. <code>scipy.stats.bootstrap</code> offers this.</div>
  <div class="topic-nav" id="nav-bootstrap-methods"></div>
</div>`;
}

/* 24 — Bayesian A/B Testing */
function buildBayesianAB() {
  return `<div class="topic" id="bayesian-ab">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Make Decisions</div><h2>Bayesian <em>A/B Testing</em></h2></div>
    <span class="topic-badge">Experimentation</span>
  </div>
  <p class="sub">// Is version B actually better? Credible intervals and probability of improvement</p>
  <p class="prose"><strong>Bayesian A/B testing</strong> gives you what you actually want: "the probability that B is better than A." Unlike frequentist tests, you can check results early, get direct probability statements, and don't need fixed sample sizes.</p>
  <div class="fb"><div class="fm">P(B &gt; A | data) = &int; P(&theta;<sub>B</sub> &gt; &theta;<sub>A</sub>) d&theta;</div><div class="fd"><span>P(B &gt; A)</span> = direct probability of improvement. No p-values, no confusion.</div></div>
  <div class="fb c2"><div class="fm">Beta(a + successes, b + failures)</div><div class="fd">For conversion rates, the <span>Beta-Binomial</span> model gives exact posteriors. a=b=1 is a uniform prior.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two posteriors, see probability of B &gt; A</div>
    <canvas id="abCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">A conversions</span><input type="range" id="abA" min="5" max="200" step="5" value="50"><span class="vd" id="abAv">50</span></div>
      <div class="cg"><span class="cl">B conversions</span><input type="range" id="abB" min="5" max="200" step="5" value="60"><span class="vd" id="abBv">60</span></div>
      <div class="cg"><span class="cl">P(B&gt;A)</span><span class="vd" id="abProb" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Bayesian A/B test</span>
<span class="kw">from</span> scipy.stats <span class="kw">import</span> beta
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Observed data</span>
a_conv, a_total = <span class="st">50</span>, <span class="st">1000</span>
b_conv, b_total = <span class="st">60</span>, <span class="st">1000</span>

<span class="cm"># Posterior distributions (uniform prior)</span>
post_a = beta(a_conv + <span class="st">1</span>, a_total - a_conv + <span class="st">1</span>)
post_b = beta(b_conv + <span class="st">1</span>, b_total - b_conv + <span class="st">1</span>)

<span class="cm"># P(B > A) via simulation</span>
samples = <span class="st">100000</span>
p_b_wins = (post_b.rvs(samples) &gt; post_a.rvs(samples)).mean()
print(<span class="st">f"P(B > A) = {p_b_wins:.3f}"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Bayesian updating is the same <a href="../ml-math/#bayes" target="_blank" rel="noopener">Bayes' theorem</a> from ML. Prior belief + data = posterior. This connects to <a href="../markets/psychology/#sentiment" target="_blank" rel="noopener">market sentiment</a> — prices update beliefs with every new trade.</div>
  <div class="topic-nav" id="nav-bayesian-ab"></div>
</div>`;
}

/* 25 — Effect Size & Practical Significance */
function buildEffectSize() {
  return `<div class="topic" id="effect-size">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Make Decisions</div><h2>Effect Size &amp; <em>Practical Significance</em></h2></div>
    <span class="topic-badge">Significance</span>
  </div>
  <p class="sub">// Statistically significant &ne; meaningful — Cohen's d and the difference between p-values and impact</p>
  <p class="prose">With enough data, <em>any</em> tiny difference becomes statistically significant. <strong>Effect size</strong> measures how <em>big</em> the difference is, independent of sample size. <strong>Cohen's d</strong> expresses the difference in standard deviation units.</p>
  <div class="fb"><div class="fm">d = (&mu;<sub>1</sub> &minus; &mu;<sub>2</sub>) / s<sub>pooled</sub></div><div class="fd"><span>Cohen's d</span>: 0.2 = small, 0.5 = medium, 0.8 = large. Tells you the <em>magnitude</em> of the effect.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two distributions, see effect size and overlap</div>
    <canvas id="esCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Mean difference</span><input type="range" id="esDiff" min="0" max="200" step="5" value="50"><span class="vd" id="esDiffV">0.50</span></div>
      <div class="cg"><span class="cl">Cohen's d</span><span class="vd" id="esD" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Overlap %</span><span class="vd" id="esOverlap" style="color:#4fc3f7">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — effect size</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">def</span> <span class="fn">cohens_d</span>(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = group1.var(), group2.var()
    pooled_std = np.sqrt(((n1-<span class="st">1</span>)*var1 + (n2-<span class="st">1</span>)*var2) / (n1+n2-<span class="st">2</span>))
    <span class="kw">return</span> (group1.mean() - group2.mean()) / pooled_std

d = cohens_d(model_a_scores, model_b_scores)
print(<span class="st">f"Cohen's d = {d:.3f}"</span>)</pre></div>
  <div class="callout info"><strong>Always report both:</strong> "The improvement was statistically significant (p = 0.02) with a medium effect size (d = 0.55)." p-value alone is meaningless.</div>
  <div class="topic-nav" id="nav-effect-size"></div>
</div>`;
}

/* 26 — Power Analysis */
function buildPowerAnalysis() {
  return `<div class="topic" id="power-analysis">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Make Decisions</div><h2>Power <em>Analysis</em></h2></div>
    <span class="topic-badge">Planning</span>
  </div>
  <p class="sub">// How much data do you need? Sample size planning for experiments that can actually detect effects</p>
  <p class="prose"><strong>Statistical power</strong> is the probability of detecting a real effect if one exists. Convention: aim for 80% power. <strong>Power analysis</strong> links four quantities — sample size, effect size, significance level, and power — so you can solve for any one given the other three.</p>
  <div class="fb"><div class="fm">Power = 1 &minus; &beta; = P(reject H<sub>0</sub> | H<sub>1</sub> true)</div><div class="fd"><span>Power</span> = 0.80 means 80% chance of detecting a real effect. &beta; = Type II error rate.</div></div>
  <div class="va">
    <div class="vl">// Interactive — sample size vs power curve</div>
    <canvas id="powCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Effect size d</span><input type="range" id="powD" min="10" max="100" step="5" value="50"><span class="vd" id="powDv">0.50</span></div>
      <div class="cg"><span class="cl">Alpha</span><input type="range" id="powAlpha" min="1" max="10" step="1" value="5"><span class="vd" id="powAlphaV">0.05</span></div>
      <div class="cg"><span class="cl">N needed</span><span class="vd" id="powN" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — power analysis</span>
<span class="kw">from</span> statsmodels.stats.power <span class="kw">import</span> TTestIndPower

analysis = TTestIndPower()

<span class="cm"># How many samples for d=0.5, power=0.8?</span>
n = analysis.solve_power(
    effect_size=<span class="st">0.5</span>, power=<span class="st">0.8</span>, alpha=<span class="st">0.05</span>
)
print(<span class="st">f"Need {n:.0f} per group"</span>)

<span class="cm"># Power curve</span>
<span class="kw">import</span> matplotlib.pyplot <span class="kw">as</span> plt
ns = range(<span class="st">10</span>, <span class="st">200</span>)
powers = [analysis.power(effect_size=<span class="st">0.5</span>, nobs1=n, alpha=<span class="st">0.05</span>) <span class="kw">for</span> n <span class="kw">in</span> ns]
plt.plot(ns, powers); plt.axhline(<span class="st">0.8</span>, ls=<span class="st">'--'</span>); plt.show()</pre></div>
  <div class="callout"><strong>Before you experiment:</strong> Do the power analysis first. If you need 500 samples per group and can only get 50, the experiment is doomed before it starts.</div>
  <div class="topic-nav" id="nav-power-analysis"></div>
</div>`;
}

/* 27 — scikit-learn Evaluation Suite */
function buildSklearnEval() {
  return `<div class="topic" id="sklearn-eval">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Python Power Tools</div><h2>scikit-learn <em>Evaluation Suite</em></h2></div>
    <span class="topic-badge">Python</span>
  </div>
  <p class="sub">// The Swiss army knife — classification_report, cross_val_score, learning_curve, and the metrics module</p>
  <p class="prose"><strong>scikit-learn</strong> includes everything covered in this toolkit under one roof. The <code>metrics</code> module has every scorer, <code>model_selection</code> has every CV strategy, and <code>inspection</code> has permutation importance and partial dependence.</p>
  <div class="va">
    <div class="vl">// The scikit-learn evaluation workflow</div>
    <canvas id="skCanvas" height="220"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Complete sklearn evaluation workflow</span>
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> (
    cross_val_score, learning_curve, GridSearchCV
)
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> (
    classification_report, confusion_matrix,
    roc_auc_score, mean_squared_error
)
<span class="kw">from</span> sklearn.inspection <span class="kw">import</span> permutation_importance

<span class="cm"># 1. Cross-validated scores</span>
scores = cross_val_score(model, X, y, cv=<span class="st">5</span>, scoring=<span class="st">'f1'</span>)

<span class="cm"># 2. Full classification report</span>
model.fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))

<span class="cm"># 3. Learning curves</span>
sizes, train_s, val_s = learning_curve(model, X, y, cv=<span class="st">5</span>)

<span class="cm"># 4. Feature importance</span>
pi = permutation_importance(model, X_test, y_test, n_repeats=<span class="st">30</span>)

<span class="cm"># 5. Hyperparameter tuning</span>
grid = GridSearchCV(model, param_grid, cv=<span class="st">5</span>, scoring=<span class="st">'f1'</span>)
grid.fit(X_train, y_train)</pre></div>
  <table class="mt">
    <thead><tr><th>Module</th><th>Key functions</th><th>This toolkit topic</th></tr></thead>
    <tbody>
      <tr><td>sklearn.metrics</td><td>classification_report, roc_auc_score, r2_score</td><td><a href="#confusion-matrix">Confusion Matrix</a>, <a href="#regression-metrics">Regression</a></td></tr>
      <tr><td>sklearn.model_selection</td><td>cross_val_score, TimeSeriesSplit, learning_curve</td><td><a href="#cross-validation">CV</a>, <a href="#learning-curves">Learning Curves</a></td></tr>
      <tr><td>sklearn.inspection</td><td>permutation_importance, PartialDependenceDisplay</td><td><a href="#permutation-importance">Permutation</a>, <a href="#pdp-ice">PDP/ICE</a></td></tr>
      <tr><td>sklearn.feature_selection</td><td>mutual_info_classif, SelectKBest</td><td><a href="#information-gain">Information Gain</a></td></tr>
    </tbody>
  </table>
  <div class="callout"><strong>Tip:</strong> Always use <code>Pipeline</code> to chain preprocessing + model. This prevents data leakage in CV and makes deployment trivial.</div>
  <div class="topic-nav" id="nav-sklearn-eval"></div>
</div>`;
}

/* 28 — SHAP Library */
function buildSHAPLibrary() {
  return `<div class="topic" id="shap-library">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Python Power Tools</div><h2>SHAP <em>Library</em></h2></div>
    <span class="topic-badge">Python</span>
  </div>
  <p class="sub">// TreeExplainer, force_plot, summary_plot, waterfall — the complete SHAP toolkit</p>
  <p class="prose">The <code>shap</code> library implements everything from <a href="#shap-values">SHAP Values</a> in production-ready code. <strong>TreeExplainer</strong> is exact and fast for tree models. The visualisations — waterfall, beeswarm, dependence — are publication-ready out of the box.</p>
  <div class="va">
    <div class="vl">// SHAP plot types overview</div>
    <canvas id="shapLibCanvas" height="220"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># SHAP — complete reference</span>
<span class="kw">import</span> shap

<span class="cm"># 1. Choose the right explainer</span>
explainer = shap.TreeExplainer(model)     <span class="cm"># XGBoost, LightGBM, RF</span>
<span class="cm"># explainer = shap.KernelExplainer(model.predict, X_bg)</span>
<span class="cm"># explainer = shap.DeepExplainer(model, X_bg)</span>

<span class="cm"># 2. Compute SHAP values</span>
shap_values = explainer(X_test)

<span class="cm"># 3. Visualisations</span>
shap.plots.waterfall(shap_values[<span class="st">0</span>])       <span class="cm"># single prediction</span>
shap.plots.beeswarm(shap_values)            <span class="cm"># global summary</span>
shap.plots.bar(shap_values)                 <span class="cm"># mean |SHAP|</span>
shap.plots.scatter(shap_values[:,<span class="st">"age"</span>])   <span class="cm"># dependence</span>

<span class="cm"># 4. Interaction values (slow but powerful)</span>
inter = explainer.shap_interaction_values(X_test)</pre></div>
  <table class="mt">
    <thead><tr><th>Explainer</th><th>Models</th><th>Speed</th></tr></thead>
    <tbody>
      <tr><td>TreeExplainer</td><td>XGBoost, LightGBM, CatBoost, RF</td><td>Fast, exact</td></tr>
      <tr><td>KernelExplainer</td><td>Any model (black-box)</td><td>Slow, approximate</td></tr>
      <tr><td>DeepExplainer</td><td>TensorFlow, PyTorch</td><td>Medium, approximate</td></tr>
      <tr><td>LinearExplainer</td><td>Linear/logistic regression</td><td>Instant, exact</td></tr>
    </tbody>
  </table>
  <div class="callout"><strong>Performance tip:</strong> For KernelExplainer, use a small background dataset (e.g., <code>shap.kmeans(X_train, 50)</code>) to speed things up dramatically.</div>
  <div class="topic-nav" id="nav-shap-library"></div>
</div>`;
}

/* 29 — Optuna */
function buildOptuna() {
  return `<div class="topic" id="optuna">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Python Power Tools</div><h2><em>Optuna</em></h2></div>
    <span class="topic-badge">Python</span>
  </div>
  <p class="sub">// Smart hyperparameter tuning — TPE, pruning, study visualisation, any framework</p>
  <p class="prose"><strong>Optuna</strong> is a hyperparameter optimisation framework that uses <strong>TPE</strong> (Tree-structured Parzen Estimator) to intelligently search the parameter space. It supports <strong>pruning</strong> (killing bad trials early) and integrates with scikit-learn, XGBoost, PyTorch, and more.</p>
  <div class="va">
    <div class="vl">// Optuna search space exploration</div>
    <canvas id="optunaCanvas" height="220"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Optuna — hyperparameter optimisation</span>
<span class="kw">import</span> optuna
<span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> RandomForestClassifier
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> cross_val_score

<span class="kw">def</span> <span class="fn">objective</span>(trial):
    params = {
        <span class="st">'n_estimators'</span>: trial.suggest_int(<span class="st">'n_estimators'</span>, <span class="st">50</span>, <span class="st">500</span>),
        <span class="st">'max_depth'</span>: trial.suggest_int(<span class="st">'max_depth'</span>, <span class="st">3</span>, <span class="st">20</span>),
        <span class="st">'min_samples_split'</span>: trial.suggest_int(<span class="st">'min_samples_split'</span>, <span class="st">2</span>, <span class="st">20</span>),
        <span class="st">'max_features'</span>: trial.suggest_categorical(
            <span class="st">'max_features'</span>, [<span class="st">'sqrt'</span>, <span class="st">'log2'</span>, <span class="st">None</span>]
        ),
    }
    model = RandomForestClassifier(**params)
    <span class="kw">return</span> cross_val_score(model, X, y, cv=<span class="st">5</span>, scoring=<span class="st">'f1'</span>).mean()

study = optuna.create_study(direction=<span class="st">'maximize'</span>)
study.optimize(objective, n_trials=<span class="st">100</span>)

print(study.best_params)
optuna.visualization.plot_optimization_history(study)</pre></div>
  <table class="mt">
    <thead><tr><th>Feature</th><th>What it does</th></tr></thead>
    <tbody>
      <tr><td>TPE sampler</td><td>Bayesian sampling — learns from previous trials</td></tr>
      <tr><td>Pruning</td><td>Early stopping for bad trials (MedianPruner)</td></tr>
      <tr><td>Study dashboard</td><td>optuna-dashboard for real-time monitoring</td></tr>
      <tr><td>Multi-objective</td><td>Optimise accuracy AND speed simultaneously</td></tr>
    </tbody>
  </table>
  <div class="callout"><strong>vs GridSearch:</strong> GridSearch tests every combination (exponential). Optuna uses Bayesian optimization — it learns which regions are promising and explores them more.</div>
  <div class="topic-nav" id="nav-optuna"></div>
</div>`;
}

/* 30 — pandas-ta & yfinance */
function buildPandasTA() {
  return `<div class="topic" id="pandas-ta">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Python Power Tools</div><h2>pandas-ta &amp; <em>yfinance</em></h2></div>
    <span class="topic-badge">Python</span>
  </div>
  <p class="sub">// Technical indicators + market data in one-liners</p>
  <p class="prose"><strong>yfinance</strong> downloads free historical market data from Yahoo Finance. <strong>pandas-ta</strong> computes 130+ technical indicators as DataFrame operations. Together, they're the fastest way to go from idea to analysis for any market strategy.</p>
  <div class="va">
    <div class="vl">// Price data with technical indicators</div>
    <canvas id="ptaCanvas" height="220"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># pandas-ta + yfinance — quick market analysis</span>
<span class="kw">import</span> yfinance <span class="kw">as</span> yf
<span class="kw">import</span> pandas_ta <span class="kw">as</span> ta

<span class="cm"># Download data</span>
df = yf.download(<span class="st">'AAPL'</span>, start=<span class="st">'2023-01-01'</span>)

<span class="cm"># Add indicators as columns</span>
df.ta.sma(length=<span class="st">20</span>, append=<span class="st">True</span>)
df.ta.rsi(length=<span class="st">14</span>, append=<span class="st">True</span>)
df.ta.macd(append=<span class="st">True</span>)
df.ta.bbands(length=<span class="st">20</span>, append=<span class="st">True</span>)

<span class="cm"># Or run a full strategy</span>
df.ta.strategy(<span class="st">'all'</span>)  <span class="cm"># adds 130+ indicators</span>

<span class="cm"># Quick signal</span>
df[<span class="st">'signal'</span>] = (df[<span class="st">'RSI_14'</span>] &lt; <span class="st">30</span>).astype(int)
print(df[[<span class="st">'Close'</span>, <span class="st">'SMA_20'</span>, <span class="st">'RSI_14'</span>]].tail())</pre></div>
  <table class="mt">
    <thead><tr><th>Category</th><th>Indicators</th><th>pandas-ta function</th></tr></thead>
    <tbody>
      <tr><td>Trend</td><td>SMA, EMA, MACD</td><td>ta.sma(), ta.ema(), ta.macd()</td></tr>
      <tr><td>Momentum</td><td>RSI, Stochastic, CCI</td><td>ta.rsi(), ta.stoch(), ta.cci()</td></tr>
      <tr><td>Volatility</td><td>Bollinger, ATR, Keltner</td><td>ta.bbands(), ta.atr()</td></tr>
      <tr><td>Volume</td><td>OBV, VWAP, MFI</td><td>ta.obv(), ta.vwap(), ta.mfi()</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> These are the same indicators explored in the <a href="../markets/indicators/" target="_blank" rel="noopener">Markets &rarr; Indicators</a> collection — but here you can compute them yourself in Python and feed them into ML models as features.</div>
  <div class="topic-nav" id="nav-pandas-ta"></div>
</div>`;
}

/* 31 — scipy.stats & statsmodels */
function buildScipyStatsmodels() {
  return `<div class="topic" id="scipy-statsmodels">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">31 — Python Power Tools</div><h2>scipy.stats &amp; <em>statsmodels</em></h2></div>
    <span class="topic-badge">Python</span>
  </div>
  <p class="sub">// Statistical tests, regression diagnostics, time series — the Python stats foundation</p>
  <p class="prose"><strong>scipy.stats</strong> has every distribution and statistical test. <strong>statsmodels</strong> adds regression diagnostics, time series models (ARIMA, ADF), and proper statistical inference with confidence intervals — what sklearn deliberately leaves out.</p>
  <div class="va">
    <div class="vl">// scipy.stats + statsmodels workflow</div>
    <canvas id="ssCanvas" height="220"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># scipy.stats — statistical tests</span>
<span class="kw">from</span> scipy.stats <span class="kw">import</span> (
    ttest_ind, ttest_rel, mannwhitneyu,
    ks_2samp, shapiro, spearmanr
)

<span class="cm"># Two-sample t-test</span>
t_stat, p_val = ttest_ind(group_a, group_b)

<span class="cm"># Normality check</span>
stat, p = shapiro(data)

<span class="cm"># statsmodels — regression with full diagnostics</span>
<span class="kw">import</span> statsmodels.api <span class="kw">as</span> sm

X_sm = sm.add_constant(X)
model = sm.OLS(y, X_sm).fit()
print(model.summary())  <span class="cm"># R², coefficients, p-values, CI</span>

<span class="cm"># Time series — ADF stationarity test</span>
<span class="kw">from</span> statsmodels.tsa.stattools <span class="kw">import</span> adfuller
result = adfuller(series)
print(<span class="st">f"ADF Stat: {result[0]:.3f}, p: {result[1]:.4f}"</span>)</pre></div>
  <table class="mt">
    <thead><tr><th>Task</th><th>scipy.stats</th><th>statsmodels</th></tr></thead>
    <tbody>
      <tr><td>Compare two groups</td><td>ttest_ind, mannwhitneyu</td><td>—</td></tr>
      <tr><td>Normality</td><td>shapiro, normaltest</td><td>—</td></tr>
      <tr><td>Regression</td><td>—</td><td>OLS with summary()</td></tr>
      <tr><td>Time series</td><td>—</td><td>ARIMA, adfuller, acf</td></tr>
      <tr><td>Distributions</td><td>norm, beta, gamma, etc.</td><td>—</td></tr>
    </tbody>
  </table>
  <div class="callout"><strong>sklearn vs statsmodels:</strong> sklearn is for prediction (fit/predict). statsmodels is for inference (coefficients, p-values, diagnostics). Use both — they complement each other.</div>
  <div class="topic-nav" id="nav-scipy-statsmodels"></div>
</div>`;
}
