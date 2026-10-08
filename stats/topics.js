/* ═══════════════════════════════════════════════════════════════
   The Toolkit — Topics Data & Content Builder
   39 practical topics for ML evaluation, statistics & data analytics
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-evaluate',    title:'Evaluate Your Model',       topics:['home','confusion-matrix','roc-auc','regression-metrics','cross-validation','comparing-runs','learning-curves'] },
  { id:'sec-features',    title:'Understand Your Features',  topics:['shap-values','permutation-importance','pdp-ice','feature-correlation','information-gain'] },
  { id:'sec-data',        title:'Analyze Your Data',         topics:['distribution-shape','outlier-detection','missing-data','data-drift','class-imbalance'] },
  { id:'sec-backtest',    title:'Backtest & Validate',       topics:['sharpe-ratio','max-drawdown','walk-forward','monte-carlo','survivorship-bias'] },
  { id:'sec-decisions',   title:'Make Decisions',            topics:['confidence-intervals','bootstrap-methods','bayesian-ab','effect-size','power-analysis'] },
  { id:'sec-foundations', title:'Statistical Foundations',   topics:['hypothesis-testing','stat-tests','clt-sampling','correlation-causation'] },
  { id:'sec-analytics',   title:'Data Analytics',            topics:['eda-workflow','groupby-aggregation','cohort-retention','funnel-analysis'] },
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
  'hypothesis-testing':'Hypothesis Testing & p-values',
  'stat-tests':'Choosing the Right Statistical Test',
  'clt-sampling':'Central Limit Theorem & Sampling',
  'correlation-causation':"Correlation, Causation & Simpson's Paradox",
  'eda-workflow':'Exploratory Data Analysis (EDA)',
  'groupby-aggregation':'GroupBy, Pivot & Aggregation',
  'cohort-retention':'Cohort & Retention Analysis',
  'funnel-analysis':'Funnel & Conversion Analysis',
  'sklearn-eval':'scikit-learn Evaluation Suite',
  'shap-library':'SHAP Library',
  'optuna':'Optuna',
  'pandas-ta':'pandas-ta & yfinance',
  'scipy-statsmodels':'scipy.stats & statsmodels',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'confusion-matrix', evidence:'statistical', reviewed:'2026-10-02', num:'01', title:'Confusion Matrix & Classification Metrics', category:'Evaluate Your Model', keywords:['precision','recall','f1','accuracy','true positive','false positive','false negative','true negative','classification report','threshold'], content:'The foundation of classification evaluation — TP, FP, TN, FN and the metrics built on them.' },
  { id:'roc-auc', evidence:'statistical', reviewed:'2026-10-02', num:'02', title:'ROC & AUC Curves', category:'Evaluate Your Model', keywords:['receiver operating characteristic','area under curve','threshold','TPR','FPR','multi-class','comparison','sensitivity','specificity'], content:'Visualizing model performance across all thresholds — the ROC curve and the AUC score.' },
  { id:'regression-metrics', evidence:'statistical', reviewed:'2026-10-02', num:'03', title:'Regression Metrics', category:'Evaluate Your Model', keywords:['MAE','RMSE','R-squared','adjusted R²','mean absolute error','root mean square','residuals','explained variance'], content:'MAE, RMSE, R² — which metric for which regression problem and what the numbers actually mean.' },
  { id:'cross-validation', evidence:'statistical', reviewed:'2026-10-02', num:'04', title:'Cross-Validation Done Right', category:'Evaluate Your Model', keywords:['k-fold','stratified','time series split','data leakage','train test split','validation','holdout','nested'], content:'Splitting your data honestly — k-fold, stratified, time-series split, and the leakage traps.' },
  { id:'comparing-runs', evidence:'statistical', reviewed:'2026-10-02', num:'05', title:'Comparing Model Runs', category:'Evaluate Your Model', keywords:['paired t-test','McNemar','Wilcoxon','statistical significance','model comparison','ablation','improvement','p-value'], content:'Is this improvement real? Statistical tests for comparing model performance across runs.' },
  { id:'learning-curves', evidence:'statistical', reviewed:'2026-10-02', num:'06', title:'Learning Curves & Overfitting', category:'Evaluate Your Model', keywords:['training curve','validation curve','overfitting','underfitting','early stopping','bias variance','generalization','gap'], content:'Training vs validation curves — reading the gap to diagnose overfitting, underfitting, and when to stop.' },
  { id:'shap-values', evidence:'statistical', reviewed:'2026-10-02', num:'07', title:'SHAP Values', category:'Understand Your Features', keywords:['shapley','feature importance','explainability','force plot','summary plot','dependence plot','TreeExplainer','KernelExplainer','waterfall'], content:'Game-theoretic feature attribution — understand exactly why your model made each prediction.' },
  { id:'permutation-importance', evidence:'statistical', reviewed:'2026-10-02', num:'08', title:'Permutation Importance', category:'Understand Your Features', keywords:['feature importance','shuffle','model-agnostic','correlated features','baseline','drop column','sklearn'], content:'Shuffle a feature, measure the damage — a model-agnostic way to rank feature importance.' },
  { id:'pdp-ice', evidence:'statistical', reviewed:'2026-10-02', num:'09', title:'Partial Dependence & ICE', category:'Understand Your Features', keywords:['partial dependence plot','individual conditional expectation','marginal effect','interaction','feature effect','PDP'], content:'How does changing one feature affect predictions? PD shows the average, ICE shows every instance.' },
  { id:'feature-correlation', evidence:'statistical', reviewed:'2026-10-02', num:'10', title:'Feature Correlation & Multicollinearity', category:'Understand Your Features', keywords:['heatmap','VIF','variance inflation factor','collinearity','correlation matrix','redundant features','drop'], content:'Spotting redundant features — correlation heatmaps, VIF, and deciding what to drop.' },
  { id:'information-gain', evidence:'statistical', reviewed:'2026-10-02', num:'11', title:'Information Gain & Mutual Information', category:'Understand Your Features', keywords:['entropy','mutual information','feature selection','nonlinear','KL divergence','information theory','bits'], content:'Beyond linear correlation — information-theoretic measures that capture any kind of dependency.' },
  { id:'distribution-shape', evidence:'statistical', reviewed:'2026-10-02', num:'12', title:'Distribution Shape', category:'Analyze Your Data', keywords:['skewness','kurtosis','QQ plot','normal','histogram','density','heavy tails','symmetric','log transform'], content:'Skewness, kurtosis, QQ plots — is your data normal, and does it matter?' },
  { id:'outlier-detection', evidence:'statistical', reviewed:'2026-10-02', num:'13', title:'Outlier Detection', category:'Analyze Your Data', keywords:['IQR','z-score','isolation forest','DBSCAN','anomaly','robust','winsorize','extreme values'], content:'IQR, Z-score, Isolation Forest — finding extreme values and knowing when they are the signal.' },
  { id:'missing-data', evidence:'statistical', reviewed:'2026-10-02', num:'14', title:'Missing Data Strategies', category:'Analyze Your Data', keywords:['imputation','MICE','KNN impute','MCAR','MAR','MNAR','missingness','dropna','fillna'], content:'Imputation, MICE, missingness patterns — handling gaps without corrupting your analysis.' },
  { id:'data-drift', evidence:'statistical', reviewed:'2026-10-02', num:'15', title:'Data Drift & Distribution Shift', category:'Analyze Your Data', keywords:['PSI','population stability index','KS test','Kolmogorov-Smirnov','concept drift','covariate shift','monitoring','model decay'], content:'Is your model still valid? PSI, KS test, and detecting when the world has changed under your model.' },
  { id:'class-imbalance', evidence:'statistical', reviewed:'2026-10-02', num:'16', title:'Sampling & Class Imbalance', category:'Analyze Your Data', keywords:['SMOTE','undersampling','oversampling','stratification','class weights','imbalanced-learn','rare events','fraud'], content:'SMOTE, undersampling, class weights — strategies when your classes are nowhere near 50/50.' },
  { id:'sharpe-ratio', evidence:'statistical', reviewed:'2026-10-02', num:'17', title:'Sharpe Ratio & Risk-Adjusted Returns', category:'Backtest & Validate', keywords:['Sharpe','Sortino','Calmar','risk-adjusted','volatility','excess return','risk free rate','annualized'], content:'Interpreting Sharpe, Sortino, Calmar — the standard ways to measure return per unit of risk.' },
  { id:'max-drawdown', evidence:'statistical', reviewed:'2026-10-02', num:'18', title:'Maximum Drawdown & Recovery', category:'Backtest & Validate', keywords:['drawdown','peak to trough','recovery time','worst case','underwater','risk tolerance','equity curve'], content:'Measuring worst-case loss from peak — drawdown depth, duration, and recovery time.' },
  { id:'walk-forward', evidence:'statistical', reviewed:'2026-10-02', num:'19', title:'Walk-Forward Validation', category:'Backtest & Validate', keywords:['rolling window','anchored','expanding window','time series','look-ahead bias','out of sample','backtest'], content:'Rolling window backtesting — the right way to validate strategies on time-ordered data.' },
  { id:'monte-carlo', evidence:'statistical', reviewed:'2026-10-02', num:'20', title:'Monte Carlo Simulation', category:'Backtest & Validate', keywords:['simulation','random paths','confidence','bootstrapped returns','path dependence','percentile','fan chart'], content:'Simulating thousands of equity paths — confidence bands on strategy performance.' },
  { id:'survivorship-bias', evidence:'statistical', reviewed:'2026-10-02', num:'21', title:'Survivorship & Look-Ahead Bias', category:'Backtest & Validate', keywords:['survivorship','look-ahead','selection bias','delisted','backtest traps','data snooping','forward looking'], content:'The silent traps that make your backtest a fantasy — and how to avoid them.' },
  { id:'confidence-intervals', evidence:'statistical', reviewed:'2026-10-02', num:'22', title:'Confidence Intervals', category:'Make Decisions', keywords:['confidence level','margin of error','bootstrap CI','parametric','width','95%','interval estimate','uncertainty'], content:'How sure are you? — bootstrap and parametric confidence intervals, and interpreting their width.' },
  { id:'bootstrap-methods', evidence:'statistical', reviewed:'2026-10-02', num:'23', title:'Bootstrap Methods', category:'Make Decisions', keywords:['resampling','nonparametric','percentile method','BCa','empirical distribution','bootstrap distribution','estimate'], content:'Estimate anything with resampling — the nonparametric Swiss army knife for uncertainty.' },
  { id:'bayesian-ab', evidence:'statistical', reviewed:'2026-10-02', num:'24', title:'Bayesian A/B Testing', category:'Make Decisions', keywords:['credible interval','posterior','prior','probability of improvement','early stopping','conversion rate','Beta-Binomial'], content:'Is version B actually better? Bayesian credible intervals and probability of improvement.' },
  { id:'effect-size', evidence:'statistical', reviewed:'2026-10-02', num:'25', title:'Effect Size & Practical Significance', category:'Make Decisions', keywords:["Cohen's d",'practical significance','meaningful difference','small medium large','overlap','statistical vs practical'], content:"Statistically significant \u2260 meaningful \u2014 Cohen's d and the difference between p-values and impact." },
  { id:'power-analysis', evidence:'statistical', reviewed:'2026-10-02', num:'26', title:'Power Analysis', category:'Make Decisions', keywords:['sample size','MDE','minimum detectable effect','type II error','statistical power','beta','experiment planning'], content:'How much data do you need? Sample size planning for experiments that can actually detect effects.' },
  { id:'hypothesis-testing', evidence:'statistical', reviewed:'2026-10-02', num:'27', title:'Hypothesis Testing & p-values', category:'Statistical Foundations', keywords:['null hypothesis','alternative hypothesis','p-value','significance','alpha','type I error','type II error','rejection region','two-tailed','test statistic'], content:'The grammar of statistical claims — null vs alternative, what a p-value actually means, and the two ways to be wrong.' },
  { id:'stat-tests', evidence:'statistical', reviewed:'2026-10-02', num:'28', title:'Choosing the Right Statistical Test', category:'Statistical Foundations', keywords:['t-test','chi-square','ANOVA','Mann-Whitney','Wilcoxon','Kruskal-Wallis','parametric','nonparametric','paired','normality'], content:'A decision map for statistical tests — t-test, chi-square, ANOVA, and their nonparametric cousins, and when each applies.' },
  { id:'clt-sampling', evidence:'mathematical', reviewed:'2026-10-02', num:'29', title:'Central Limit Theorem & Sampling', category:'Statistical Foundations', keywords:['central limit theorem','CLT','sampling distribution','standard error','sample mean','normal approximation','law of large numbers','sample size'], content:'Why averages become normal — the theorem underneath every confidence interval and t-test you have ever run.' },
  { id:'correlation-causation', evidence:'statistical', reviewed:'2026-10-02', num:'30', title:"Correlation, Causation & Simpson's Paradox", category:'Statistical Foundations', keywords:['correlation','causation','confounder','Simpson paradox','spurious correlation','lurking variable','selection bias','reverse causality','subgroup'], content:'Why correlated is not caused — confounders, Simpson’s paradox, and trends that reverse when you split the data.' },
  { id:'eda-workflow', evidence:'practice', reviewed:'2026-10-02', num:'31', title:'Exploratory Data Analysis (EDA)', category:'Data Analytics', keywords:['EDA','describe','summary statistics','data profiling','histogram','box plot','missing values','data types','value counts','skew'], content:'The first hour with any dataset — a repeatable workflow for profiling shape, types, gaps, and distributions before modeling.' },
  { id:'groupby-aggregation', evidence:'practice', reviewed:'2026-10-02', num:'32', title:'GroupBy, Pivot & Aggregation', category:'Data Analytics', keywords:['groupby','pivot table','aggregation','split-apply-combine','crosstab','resample','mean sum count','SQL GROUP BY','segment'], content:'Split-apply-combine — the single most-used pattern in data analytics, from pandas groupby to SQL GROUP BY.' },
  { id:'cohort-retention', evidence:'statistical', reviewed:'2026-10-02', num:'33', title:'Cohort & Retention Analysis', category:'Data Analytics', keywords:['cohort','retention','churn','retention curve','heatmap','user analytics','LTV','signup month','engagement','triangle chart'], content:'Group users by when they arrived, track them over time — the retention heatmap that reveals whether your product actually keeps people.' },
  { id:'funnel-analysis', evidence:'statistical', reviewed:'2026-10-02', num:'34', title:'Funnel & Conversion Analysis', category:'Data Analytics', keywords:['funnel','conversion rate','drop-off','landing page','checkout','signup flow','stage','bottleneck','product analytics','events'], content:'Where do users leak out? Multiplying stage conversions, finding the biggest drop-off, and fixing the right bottleneck.' },
  { id:'sklearn-eval', evidence:'practice', reviewed:'2026-10-02', num:'35', title:'scikit-learn Evaluation Suite', category:'Python Power Tools', keywords:['classification_report','cross_val_score','learning_curve','confusion_matrix','GridSearchCV','sklearn metrics','pipeline'], content:'The Swiss army knife — classification_report, cross_val_score, learning_curve, and the metrics module.' },
  { id:'shap-library', evidence:'practice', reviewed:'2026-10-02', num:'36', title:'SHAP Library', category:'Python Power Tools', keywords:['shap','TreeExplainer','force_plot','summary_plot','waterfall','dependence_plot','KernelExplainer','DeepExplainer'], content:'TreeExplainer, force_plot, summary_plot, waterfall — the complete SHAP visualization toolkit.' },
  { id:'optuna', evidence:'practice', reviewed:'2026-10-02', num:'37', title:'Optuna', category:'Python Power Tools', keywords:['hyperparameter','optimization','pruning','study','TPE','random search','Bayesian optimization','trial','objective'], content:'Smart hyperparameter tuning — TPE, pruning, study visualization, and integration with any framework.' },
  { id:'pandas-ta', evidence:'practice', reviewed:'2026-10-02', num:'38', title:'pandas-ta & yfinance', category:'Python Power Tools', keywords:['technical indicators','yfinance','market data','SMA','RSI','MACD','Bollinger','candlestick','OHLCV','download'], content:'Technical indicators + market data in one-liners — pandas-ta for TA, yfinance for data.' },
  { id:'scipy-statsmodels', evidence:'practice', reviewed:'2026-10-02', num:'39', title:'scipy.stats & statsmodels', category:'Python Power Tools', keywords:['scipy','statsmodels','statistical tests','ttest_ind','OLS','regression diagnostics','time series','ARIMA','ADF'], content:'Statistical tests, regression diagnostics, time series — the Python stats foundation.' },
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
/* selfcheck:start — "Check yourself" questions; js/self-check.js renders them. */
const SELF_CHECK = {
 "hypothesis-testing": [
  {
   "q": "A test gives p = 0.03. Which statement is correct?",
   "options": [
    "There is a 3% chance that the null hypothesis is true.",
    "If the null hypothesis were true, data at least this extreme would turn up about 3% of the time.",
    "The effect is large enough to matter in practice."
   ],
   "answer": 1,
   "why": "A p-value is computed <em>assuming</em> the null is true, so it cannot be the probability that the null is true. It also says nothing about size: a tiny effect in a huge sample can give a tiny p-value."
  },
  {
   "q": "You test 20 independent metrics at α = 0.05, and none of them is really affected. How likely is at least one “significant” result?",
   "options": [
    "About 64%",
    "About 5%",
    "Certain — exactly one will be"
   ],
   "answer": 0,
   "why": "Each test has a 95% chance of staying quiet, so all twenty stay quiet with probability 0.95<sup>20</sup> ≈ 0.36. The other 64% of the time something crosses the line by chance — the garden of forking paths."
  },
  {
   "q": "A study reports p = 0.20 for a new treatment. What can you conclude?",
   "options": [
    "The treatment has been shown to have no effect.",
    "The null hypothesis is true.",
    "The data are not strong enough to rule out chance; an effect may still exist."
   ],
   "answer": 2,
   "why": "Failing to reject is not proof of the null. With a small sample (low power) a real effect often gives p &gt; 0.05; report the effect size and its confidence interval instead."
  }
 ],
 "confidence-intervals": [
  {
   "q": "A 95% confidence interval for a mean is [4.1, 5.3]. What does the “95%” describe?",
   "options": [
    "95% of the data lie between 4.1 and 5.3.",
    "The method: intervals built this way contain the true mean in 95% of repeated samples.",
    "There is a 95% probability that the true mean is in this particular interval."
   ],
   "answer": 1,
   "why": "The 95% belongs to the procedure, not to one interval: this one either contains the true mean or it does not. The probability reading in C is what a Bayesian credible interval gives. A describes the spread of the data, which is a different, much wider thing."
  },
  {
   "q": "You collect four times as much data. Roughly what happens to the width of the interval?",
   "options": [
    "It shrinks to a quarter.",
    "It halves.",
    "It stays the same; only the centre moves."
   ],
   "answer": 1,
   "why": "The width scales with 1/√n, so four times the data halves it. Halving it again takes four times as much data again — precision gets expensive."
  },
  {
   "q": "The 95% intervals for two groups overlap a little. Is the difference between them therefore not significant?",
   "options": [
    "Not necessarily — the difference can still be significant at the 5% level.",
    "Yes — any overlap means p &gt; 0.05.",
    "Yes — overlapping intervals mean the groups are the same."
   ],
   "answer": 0,
   "why": "Checking whether two intervals overlap is a much stricter test than p &lt; 0.05; intervals can overlap by a fair amount while the difference is significant. Build an interval for the <em>difference</em> instead."
  }
 ],
 "correlation-causation": [
  {
   "q": "Across a year, ice-cream sales and drownings rise and fall together. What is the best explanation?",
   "options": [
    "Eating ice cream makes swimming more dangerous.",
    "A third factor — hot weather — drives both.",
    "It is a coincidence; correlations like this mean nothing."
   ],
   "answer": 1,
   "why": "Warm days bring both ice cream and swimming. The correlation is real and even useful for forecasting; it just runs through a confounder rather than from one to the other."
  },
  {
   "q": "Two variables have a correlation of r = 0. What does that tell you?",
   "options": [
    "They are independent.",
    "Neither can be used to predict the other.",
    "There is no <em>linear</em> relationship — a strong curved one may still exist."
   ],
   "answer": 2,
   "why": "Pearson’s r only measures straight-line association. If x is symmetric around zero, y = x² is completely determined by x and still has r ≈ 0. Plot the data."
  },
  {
   "q": "Which evidence best supports a causal claim?",
   "options": [
    "A randomized experiment in which only the treatment differs between groups.",
    "A very large observational dataset with a strong correlation.",
    "The same correlation found in many different countries."
   ],
   "answer": 0,
   "why": "Randomization makes the groups alike in everything except the treatment, confounders included. More observational data makes a biased estimate more precise, not less biased."
  }
 ],
 "cross-validation": [
  {
   "q": "You standardize all features with the mean and standard deviation of the whole dataset, then run 5-fold cross-validation. What is wrong?",
   "options": [
    "Nothing; scaling does not affect cross-validation.",
    "Statistics from the validation folds leaked into training, so the score is optimistic.",
    "Cross-validation needs at least 10 folds."
   ],
   "answer": 1,
   "why": "Every preprocessing step that learns from data has to be fitted inside each training fold. In scikit-learn, put the scaler and the model in one <code>Pipeline</code> and cross-validate the pipeline."
  },
  {
   "q": "Why is shuffled k-fold a poor choice for a daily price series?",
   "options": [
    "It is too slow for long series.",
    "It leaves too little data for training.",
    "It trains on the future and tests on the past, leaking information across time."
   ],
   "answer": 2,
   "why": "Neighbouring days are related, and shuffling puts tomorrow in the training set while testing on today. Use walk-forward validation or <code>TimeSeriesSplit</code>, ideally with a gap between training and test."
  },
  {
   "q": "You try 200 hyperparameter settings and report the best cross-validated score. That score is…",
   "options": [
    "optimistically biased — the best of 200 was partly chosen for luck.",
    "an unbiased estimate of performance on new data.",
    "pessimistic, because each fold trains on less data."
   ],
   "answer": 0,
   "why": "Selecting the maximum of many noisy scores flatters it. Nested cross-validation, or a test set touched only once at the end, gives an honest estimate."
  }
 ],
 "class-imbalance": [
  {
   "q": "1% of transactions are fraud. What accuracy does a model get by predicting “not fraud” every time?",
   "options": [
    "50%",
    "99%",
    "1%"
   ],
   "answer": 1,
   "why": "It is right on all 99% of normal transactions and catches no fraud at all. With rare classes, look at precision and recall for the class you care about."
  },
  {
   "q": "You oversample the fraud cases to 50/50 for training. The model’s predicted probabilities are now…",
   "options": [
    "too high for fraud, and need recalibrating to the real 1% rate.",
    "calibrated to the real 1% rate.",
    "unchanged by the resampling."
   ],
   "answer": 0,
   "why": "The model learned that fraud is common because that is what it saw. Rankings may be fine, but if you use the probabilities — for thresholds, costs or reporting — recalibrate them to the true base rate."
  },
  {
   "q": "Which is usually most informative when the positive class is rare?",
   "options": [
    "Accuracy",
    "ROC-AUC on its own",
    "Precision and recall, e.g. the area under the precision–recall curve"
   ],
   "answer": 2,
   "why": "ROC-AUC counts true negatives, which are plentiful, so it can look good while most alarms are false. Precision–recall focuses on the rare class (Saito &amp; Rehmsmeier 2015)."
  }
 ],
 "power-analysis": [
  {
   "q": "An A/B test was planned with 80% power to detect a 2-point lift. What does the 80% mean?",
   "options": [
    "There is an 80% chance that the lift is real.",
    "The result will be within 2 points of the truth 80% of the time.",
    "If the true lift is 2 points, the test will come out significant about 80% of the time."
   ],
   "answer": 2,
   "why": "Power is a property of the design: the probability of a significant result <em>given</em> an effect of the stated size. It says nothing about how likely the effect is to exist."
  },
  {
   "q": "To detect an effect half as large with the same power and significance level, the sample size must be about…",
   "options": [
    "four times as large.",
    "twice as large.",
    "the same — power does not depend on the effect size."
   ],
   "answer": 0,
   "why": "The standard error shrinks with √n, so halving the effect you want to see requires √n to double — four times the sample."
  },
  {
   "q": "A small study finds a significant and surprisingly large effect. Why be cautious?",
   "options": [
    "In underpowered studies, the estimates that reach significance are biased upward — only the lucky overestimates clear the bar.",
    "Small studies cannot produce significant results, so it must be an error.",
    "Significance guarantees the size of the effect is accurate."
   ],
   "answer": 0,
   "why": "Gelman &amp; Carlin call this a Type M (magnitude) error: with low power, a significant estimate is often several times the true effect."
  }
 ],
 "effect-size": [
  {
   "q": "Study A reports p = 0.001 with 100,000 people; study B reports p = 0.04 with 50. Which found the larger effect?",
   "options": [
    "A — a smaller p-value means a bigger effect.",
    "You cannot tell from the p-values: a p-value mixes the size of the effect with the size of the sample.",
    "B — significance is harder to reach in small samples, so its effect must be the same."
   ],
   "answer": 1,
   "why": "A huge sample makes even a trivial difference significant. Compare effect sizes (and their confidence intervals), not p-values."
  },
  {
   "q": "Two groups differ by Cohen’s d = 0.2. Which description fits?",
   "options": [
    "20% of the people in one group are affected.",
    "The means differ by a fifth of a standard deviation; the two distributions overlap by about 92%.",
    "The difference is too small to matter in any context."
   ],
   "answer": 1,
   "why": "Cohen called 0.2 “small”, but whether it matters depends on the setting: a small shift applied to millions of people, or to money, can be important."
  },
  {
   "q": "A huge trial finds a drug lowers blood pressure by 1 mmHg on average, p &lt; 0.001. The best summary is:",
   "options": [
    "Highly significant, so it is clinically important.",
    "The effect is too small to be real.",
    "The effect is clearly real, and whether 1 mmHg matters is a clinical question, not a statistical one."
   ],
   "answer": 2,
   "why": "Statistical significance answers “is it distinguishable from zero?”; practical significance asks “is it big enough to care about?”."
  }
 ],
 "walk-forward": [
  {
   "q": "Why not use ordinary shuffled k-fold cross-validation on a trading strategy’s daily data?",
   "options": [
    "Shuffled folds train on the future to predict the past, and neighbouring days share information across the split.",
    "k-fold needs more data than a backtest has.",
    "Cross-validation only works for classification."
   ],
   "answer": 0,
   "why": "Walk-forward testing keeps time order: fit on the past, test on the next period, roll forward."
  },
  {
   "q": "You test 200 parameter sets walk-forward and report the out-of-sample Sharpe ratio of the best one. What is wrong?",
   "options": [
    "Picking the winner by its out-of-sample result makes that result in-sample; the reported Sharpe is biased upward.",
    "Nothing — walk-forward results are out-of-sample by construction.",
    "Walk-forward only allows one parameter set."
   ],
   "answer": 0,
   "why": "Selection is fitting. Either choose parameters inside each training window, or correct for the number of trials (e.g. the deflated Sharpe ratio)."
  },
  {
   "q": "What is the trade-off between an expanding (anchored) training window and a rolling one?",
   "options": [
    "Expanding windows leak future data; rolling windows do not.",
    "Expanding keeps all history — more stable estimates, slower to adapt to regime changes; rolling adapts faster but is noisier.",
    "There is none: they give the same results."
   ],
   "answer": 1,
   "why": "Neither leaks if every training window ends before its test period. The choice is about stability versus adaptivity."
  }
 ],
 "survivorship-bias": [
  {
   "q": "You backtest a strategy over 20 years on today’s S&amp;P 500 members. What bias does this introduce?",
   "options": [
    "Survivorship bias: companies that were removed or went bankrupt are missing, so returns are overstated.",
    "Look-ahead bias in the prices.",
    "None, as long as prices are adjusted for splits and dividends."
   ],
   "answer": 0,
   "why": "Today’s index is a list of winners. A fair test uses the members as they were on each date."
  },
  {
   "q": "A fund database lists the average past return of funds that exist today. Why is it too high?",
   "options": [
    "Funds that did badly were closed or merged and dropped out, taking their poor returns with them.",
    "Fees are not included in fund returns.",
    "Surviving funds take more risk."
   ],
   "answer": 0,
   "why": "Studies of mutual funds find that ignoring dead funds raises measured average returns noticeably — the losers are exactly the ones that disappear."
  },
  {
   "q": "A backtest uses quarterly earnings dated at the quarter’s end, although they are published weeks later. The problem is:",
   "options": [
    "Look-ahead bias: the strategy trades on information that was not yet public.",
    "Survivorship bias.",
    "None — the numbers are the same whenever they are published."
   ],
   "answer": 0,
   "why": "Use point-in-time data: each value stamped with the date it became known, not the period it describes."
  }
 ],
 "roc-auc": [
  {
   "q": "A classifier has AUC = 0.80. What does that mean?",
   "options": [
    "A randomly chosen positive gets a higher score than a randomly chosen negative 80% of the time.",
    "The model is 80% accurate.",
    "80% of the positives are caught."
   ],
   "answer": 0,
   "why": "AUC measures ranking. Accuracy and recall depend on the threshold you choose, which AUC averages over."
  },
  {
   "q": "Your model’s AUC on the test set is 0.30. What is the quickest fix?",
   "options": [
    "Reverse the scores: the ranking is informative but inverted, and the AUC becomes 0.70.",
    "Nothing can be done — the model is worse than random.",
    "Lower the threshold."
   ],
   "answer": 0,
   "why": "AUC below 0.5 usually means a sign or label flip somewhere. 0.5 is the uninformative point, not 0."
  },
  {
   "q": "Which of these does AUC <em>not</em> tell you?",
   "options": [
    "How well the model ranks positives above negatives.",
    "How the model trades off true and false positives across thresholds.",
    "Whether the predicted probabilities are calibrated."
   ],
   "answer": 2,
   "why": "AUC is unchanged by any order-preserving transformation of the scores, so a model can rank well and still give badly calibrated probabilities."
  }
 ]
};
function selfCheck(id) {
  return typeof renderSelfCheck === 'function' ? renderSelfCheck('stats/' + id, SELF_CHECK[id]) : '';
}
/* selfcheck:end */

/* depth:start — generated from the scratch scripts toolkit_snippets.py / toolkit_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "confusion-matrix": {
  "example": "2,000 cases, 20% positive, and one model’s scores. At a threshold of 0.3 the model catches <strong>97%</strong> of positives with <strong>30%</strong> precision; at 0.5, <strong>79%</strong> recall and <strong>51%</strong> precision; at 0.7, <strong>39%</strong> recall and <strong>78%</strong> precision. One model, three confusion matrices: the threshold is a business decision, not a property of the model.",
  "fails": [
   "The default 0.5 threshold is only sensible if the scores are calibrated probabilities and both errors cost the same.",
   "Precision depends on how common positives are; the same matrix means something different in another population.",
   "Aggregated matrices hide which subgroups bear the errors; break them down by segment."
  ],
  "code": "rng = np.random.default_rng(0)\ny = rng.random(2_000) &lt; 0.2                                   # 20% positives\nscore = np.clip(rng.normal(np.where(y, 0.65, 0.35), 0.18), 0, 1)\ntable = {}\nfor th in (0.3, 0.5, 0.7):\n    pred = score &gt;= th\n    tp, fp, fn = (pred &amp; y).sum(), (pred &amp; ~y).sum(), (~pred &amp; y).sum()\n    table[th] = (round(tp / (tp + fp), 2), round(tp / (tp + fn), 2))     # (precision, recall)",
  "sources": [
   "D. M. W. Powers, “Evaluation: From Precision, Recall and F-Measure to ROC, Informedness, Markedness and Correlation”, <em>Journal of Machine Learning Technologies</em> 2(1), 2011",
   "C. Elkan, “The Foundations of Cost-Sensitive Learning”, <em>IJCAI</em>, 2001"
  ]
 },
 "roc-auc": {
  "example": "300 positives and 700 negatives. The area under the ROC curve computed from ranks is <strong>0.7531</strong>; the share of all positive–negative pairs in which the positive scores higher is also <strong>0.7531</strong>. That is what AUC means: the probability that a random positive outranks a random negative — a ranking measure, blind to the threshold you will actually use.",
  "fails": [
   "A good AUC can hide poor performance in the region you operate in; look at the curve near your threshold, or at partial AUC.",
   "AUC is insensitive to calibration: multiplying all scores by 0.1 leaves it unchanged.",
   "With rare positives, the ROC curve looks good while precision is poor; check the precision–recall curve too."
  ],
  "code": "from scipy.stats import rankdata\nrng = np.random.default_rng(1)\npos, neg = rng.normal(1.0, 1, 300), rng.normal(0, 1, 700)\nranks = rankdata(np.r_[pos, neg])\nauc_rank = (ranks[:300].sum() - 300 * 301 / 2) / (300 * 700)      # Mann-Whitney U, scaled\nauc_pairs = (pos[:, None] &gt; neg[None, :]).mean()                   # P(random positive outranks random negative)",
  "sources": [
   "J. A. Hanley &amp; B. J. McNeil, “The Meaning and Use of the Area under a Receiver Operating Characteristic (ROC) Curve”, <em>Radiology</em> 143(1), 1982",
   "T. Fawcett, “An Introduction to ROC Analysis”, <em>Pattern Recognition Letters</em> 27(8), 2006"
  ]
 },
 "regression-metrics": {
  "example": "A model that learned the wrong pattern on eight held-out points: MAE <strong>2.12</strong>, RMSE <strong>2.14</strong> — and an R² of <strong>−2.04</strong>. On new data R² can go below zero: the model is worse than predicting the mean every time. R² is a comparison with that baseline, not a number guaranteed to sit between 0 and 1.",
  "fails": [
   "R² rises with every added feature on training data; judge it on held-out data, or use adjusted R².",
   "RMSE and MAE answer different questions (the mean versus the median of the error); pick the one that matches the cost of mistakes.",
   "R² depends on the spread of the target; the same model scores higher on a more varied test set."
  ],
  "code": "y = np.array([10.0, 12, 11, 13, 12, 14, 11, 13])\nmodel = np.array([12.5, 10, 13, 11, 14, 12, 13.5, 11])          # a model that learned the wrong pattern\nr2 = 1 - ((y - model) ** 2).sum() / ((y - y.mean()) ** 2).sum()\nmae, rmse = np.abs(y - model).mean(), np.sqrt(((y - model) ** 2).mean())",
  "sources": [
   "T. O. Kvålseth, “Cautionary Note about R²”, <em>The American Statistician</em> 39(4), 1985",
   "C. J. Willmott &amp; K. Matsuura, “Advantages of the Mean Absolute Error (MAE) over the Root Mean Square Error (RMSE) in Assessing Average Model Performance”, <em>Climate Research</em> 30, 2005",
   "T. Chai &amp; R. R. Draxler, “Root Mean Square Error (RMSE) or Mean Absolute Error (MAE)?”, <em>Geoscientific Model Development</em> 7, 2014"
  ]
 },
 "cross-validation": {
  "example": "100 examples, 5 of them positive, split into 5 folds of 20 at random. In <strong>96%</strong> of random splits at least one fold contains no positives at all, so recall cannot even be computed on it. Stratified folds put exactly one positive in each. With rare classes, how you split matters as much as how many folds you use.",
  "fails": [
   "Stratification fixes the class balance, not group structure; patients, users or time periods still need grouped or time-ordered folds.",
   "Fold scores share most of their training data, so their spread understates the true uncertainty.",
   "Five folds of a tiny dataset give five very noisy estimates; repeated cross-validation helps."
  ],
  "code": "rng = np.random.default_rng(2)\ny = np.r_[np.ones(5), np.zeros(95)]                 # 5 positives in 100\nempty = 0\nfor _ in range(10_000):                              # plain 5-fold on a shuffled order\n    folds = rng.permutation(y).reshape(5, 20)\n    empty += (folds.sum(axis=1) == 0).any()\np_some_fold_without_positives = empty / 10_000",
  "sources": [
   "R. Kohavi, “A Study of Cross-Validation and Bootstrap for Accuracy Estimation and Model Selection”, <em>IJCAI</em>, 1995",
   "S. Arlot &amp; A. Celisse, “A Survey of Cross-Validation Procedures for Model Selection”, <em>Statistics Surveys</em> 4, 2010",
   "S. Varma &amp; R. Simon, “Bias in Error Estimation When Using Cross-Validation for Model Selection”, <em>BMC Bioinformatics</em> 7, 2006"
  ]
 },
 "comparing-runs": {
  "example": "Model B beats model A by about one point on each of five CV folds, while the folds themselves vary from 0.78 to 0.90. An unpaired t-test sees the fold-to-fold variation and gives p = <strong>0.736</strong>. A paired test compares the models fold by fold and gives p = <strong>0.00015</strong>. When two models are scored on the same splits, compare them on the same splits.",
  "fails": [
   "Folds share training data, so even the paired test is too optimistic; the corrected resampled t-test adjusts for it (Nadeau &amp; Bengio 2003).",
   "Across many datasets, use rank-based tests such as Wilcoxon or Friedman (Demšar 2006).",
   "A significant difference can still be too small to matter; report the size of the gain."
  ],
  "code": "from scipy.stats import ttest_ind, ttest_rel\na = np.array([0.81, 0.86, 0.78, 0.90, 0.84])        # model A, five CV folds\nb = a + np.array([0.012, 0.009, 0.011, 0.008, 0.010])   # B is a little better on every fold\np_unpaired = ttest_ind(b, a).pvalue\np_paired = ttest_rel(b, a).pvalue",
  "sources": [
   "T. G. Dietterich, “Approximate Statistical Tests for Comparing Supervised Classification Learning Algorithms”, <em>Neural Computation</em> 10(7), 1998",
   "C. Nadeau &amp; Y. Bengio, “Inference for the Generalization Error”, <em>Machine Learning</em> 52(3), 2003",
   "J. Demšar, “Statistical Comparisons of Classifiers over Multiple Data Sets”, <em>Journal of Machine Learning Research</em> 7, 2006"
  ]
 },
 "learning-curves": {
  "example": "A degree-7 polynomial fitted to a noisy sine wave. With 20 points the training error is <strong>0.050</strong> and the validation error <strong>0.155</strong>; with 80, <strong>0.079</strong> and <strong>0.102</strong>; with 320, <strong>0.094</strong> and <strong>0.095</strong>. Training error rises and validation error falls until they meet near the noise level (0.09). A gap that is still closing says more data will help.",
  "fails": [
   "Curves from a single split are noisy; average several before reading a trend into them.",
   "Learning curves for different models cross: the best model for small data is often not the best for large (Perlich, Provost &amp; Simonoff 2003).",
   "A flat validation curve can mean the model is limited, or that the labels are too noisy to learn more from."
  ],
  "code": "rng = np.random.default_rng(3)\nf = lambda x: np.sin(3 * x)\nx_val = rng.uniform(-1, 1, 2_000); y_val = f(x_val) + rng.normal(0, 0.3, 2_000)\ngaps = {}\nfor n in (20, 80, 320):\n    x = rng.uniform(-1, 1, n); y = f(x) + rng.normal(0, 0.3, n)\n    c = np.polyfit(x, y, 7)\n    train = ((np.polyval(c, x) - y) ** 2).mean(); val = ((np.polyval(c, x_val) - y_val) ** 2).mean()\n    gaps[n] = (round(train, 3), round(val, 3))",
  "sources": [
   "C. Perlich, F. Provost &amp; J. S. Simonoff, “Tree Induction vs. Logistic Regression: A Learning-Curve Analysis”, <em>Journal of Machine Learning Research</em> 4, 2003",
   "P. Domingos, “A Few Useful Things to Know about Machine Learning”, <em>Communications of the ACM</em> 55(10), 2012"
  ]
 },
 "shap-values": {
  "example": "For a linear model the SHAP value of each feature is exactly its weight times the distance from the average input. Here the contributions are <strong>2, 0 and −1</strong>, the base value is <strong>5</strong>, and base plus contributions gives <strong>6</strong> — the prediction, every time. Duplicate the first feature and the model can split its weight; SHAP then gives each copy <strong>1</strong>, half the credit.",
  "fails": [
   "Credit is shared among correlated features in ways that depend on the model, not on the world.",
   "SHAP explains the model, not the outcome; a feature with large SHAP values is not shown to cause anything.",
   "Different background datasets give different SHAP values for the same prediction."
  ],
  "code": "w, b = np.array([2.0, -1.0, 0.5]), 1.0          # a linear model\nX = np.array([[1.0, 2.0, 3.0], [3.0, 0.0, 1.0], [2.0, 1.0, 2.0]])   # background data\nx = np.array([3.0, 1.0, 0.0])\nphi = w * (x - X.mean(axis=0))                    # exact SHAP values for a linear model\nbase = w @ X.mean(axis=0) + b\ncheck = (base + phi.sum(), w @ x + b)             # additivity\ndup = np.array([1.0, 1.0]) * w[0] / 2 * (x[0] - X[:, 0].mean())   # feature 1 copied twice, weight split",
  "sources": [
   "S. M. Lundberg &amp; S.-I. Lee, “A Unified Approach to Interpreting Model Predictions”, <em>NeurIPS</em>, 2017",
   "E. Štrumbelj &amp; I. Kononenko, “Explaining Prediction Models and Individual Predictions with Feature Contributions”, <em>Knowledge and Information Systems</em> 41(3), 2014",
   "K. Aas, M. Jullum &amp; A. Løland, “Explaining Individual Predictions When Features Are Dependent”, <em>Artificial Intelligence</em> 298, 2021"
  ]
 },
 "permutation-importance": {
  "example": "y depends on x₁ alone. Shuffling x₁ in a model that uses only x₁ raises the error by <strong>7.95</strong>. Add x₂, an almost exact copy, and let the model split the weight: shuffling x₁ now raises the error by just <strong>1.95</strong>, because x₂ still carries the information. Correlated features make each other look unimportant.",
  "fails": [
   "Permuting a feature that is correlated with others creates impossible rows, and the model is judged on data it never saw (Hooker, Mentch &amp; Zhou 2021).",
   "Importance on the training set reflects memorisation; compute it on held-out data.",
   "Low importance does not mean a feature is irrelevant to the outcome — only that this model does not need it."
  ],
  "code": "rng = np.random.default_rng(4)\nn = 5_000\nx1 = rng.normal(size=n); x2 = x1 + rng.normal(0, 0.05, n)    # x2 almost a copy of x1\ny = 2 * x1 + rng.normal(0, 0.5, n)\n\ndef importance(X, w, col):\n    base = ((X @ w - y) ** 2).mean()\n    Xp = X.copy(); Xp[:, col] = rng.permutation(Xp[:, col])\n    return ((Xp @ w - y) ** 2).mean() - base\n\nalone = importance(x1[:, None], np.array([2.0]), 0)\nboth = importance(np.c_[x1, x2], np.array([1.0, 1.0]), 0)     # a model that split the weight",
  "sources": [
   "L. Breiman, “Random Forests”, <em>Machine Learning</em> 45(1), 2001",
   "C. Strobl, A.-L. Boulesteix, T. Kneib, T. Augustin &amp; A. Zeileis, “Conditional Variable Importance for Random Forests”, <em>BMC Bioinformatics</em> 9, 2008",
   "G. Hooker, L. Mentch &amp; S. Zhou, “Unrestricted Permutation Forces Extrapolation”, <em>Statistics and Computing</em> 31, 2021"
  ]
 },
 "pdp-ice": {
  "example": "A model that predicts x₁ × x₂, where x₂ is +1 for half the rows and −1 for the other half. The partial dependence on x₁ is nearly flat — <strong>0.08 … −0.08</strong> across the grid — as if x₁ did nothing. The individual (ICE) curves have slopes of <strong>+1</strong> and <strong>−1</strong>: x₁ matters a lot, in opposite directions. Averages hide interactions; ICE shows them.",
  "fails": [
   "PDPs evaluate the model on combinations that may never occur when features are correlated; ALE plots avoid this (Apley &amp; Zhu 2020).",
   "A flat PDP is not evidence that a feature is unimportant.",
   "Many ICE lines become unreadable; centre them, or cluster them."
  ],
  "code": "rng = np.random.default_rng(5)\nx2 = rng.choice([-1.0, 1.0], 1_000)                 # half the rows have x2 = -1, half +1\npredict = lambda x1, x2: x1 * x2                     # a pure interaction\ngrid = np.linspace(-2, 2, 5)\npdp = [predict(g, x2).mean() for g in grid]          # average over the data\nice_slopes = sorted({float(predict(1, v) - predict(0, v)) for v in x2})",
  "sources": [
   "J. H. Friedman, “Greedy Function Approximation: A Gradient Boosting Machine”, <em>Annals of Statistics</em> 29(5), 2001",
   "A. Goldstein, A. Kapelner, J. Bleich &amp; E. Pitkin, “Peeking Inside the Black Box: Visualizing Statistical Learning with Plots of Individual Conditional Expectation”, <em>Journal of Computational and Graphical Statistics</em> 24(1), 2015",
   "D. W. Apley &amp; J. Zhu, “Visualizing the Effects of Predictor Variables in Black Box Supervised Learning Models”, <em>Journal of the Royal Statistical Society B</em> 82(4), 2020"
  ]
 },
 "feature-correlation": {
  "example": "Three features where the third is almost a mix of the other two. No pair is correlated above <strong>0.73</strong>, so a correlation heatmap looks unremarkable. Yet the variance inflation factors are <strong>48, 50 and 103</strong> — far past the usual worry level of 10. Multicollinearity can involve several features at once, which pairwise correlations cannot show.",
  "fails": [
   "VIF rules of thumb (5, 10) are conventions, not tests; what matters is whether the coefficients you interpret are stable (O’Brien 2007).",
   "Collinearity hurts the interpretation of coefficients far more than predictions.",
   "Dropping one of two correlated features changes the meaning of the other’s coefficient."
  ],
  "code": "rng = np.random.default_rng(6)\nn = 1_000\na = rng.normal(size=n); b = rng.normal(size=n)\nc = 0.7 * a + 0.7 * b + rng.normal(0, 0.1, n)      # almost a combination of a and b\nX = np.c_[a, b, c]\n\ndef vif(X, j):\n    others = np.c_[np.delete(X, j, axis=1), np.ones(len(X))]\n    fit = others @ np.linalg.lstsq(others, X[:, j], rcond=None)[0]\n    r2 = 1 - ((X[:, j] - fit) ** 2).sum() / ((X[:, j] - X[:, j].mean()) ** 2).sum()\n    return 1 / (1 - r2)\n\nvifs = [round(vif(X, j), 1) for j in range(3)]\nmax_pairwise = np.abs(np.corrcoef(X.T)[np.triu_indices(3, 1)]).max()",
  "sources": [
   "<em>Regression Diagnostics</em>, D. A. Belsley, E. Kuh &amp; R. E. Welsch, Wiley, 1980",
   "R. M. O’Brien, “A Caution Regarding Rules of Thumb for Variance Inflation Factors”, <em>Quality &amp; Quantity</em> 41, 2007"
  ]
 },
 "information-gain": {
  "example": "y = x² plus a little noise: y is almost entirely determined by x. The Pearson correlation is <strong>0.008</strong>. Mutual information, estimated on a 10×10 grid, is <strong>1.56 bits</strong>. Correlation measures straight-line dependence; mutual information measures any dependence.",
  "fails": [
   "Histogram estimates of mutual information depend on the bin count and are biased with little data; nearest-neighbour estimators help (Kraskov et al. 2004).",
   "Mutual information has no sign and no units you can act on directly; it says that there is a relationship, not which.",
   "Ranking many features by information on the same data overfits; validate the selection."
  ],
  "code": "rng = np.random.default_rng(7)\nx = rng.uniform(-1, 1, 20_000)\ny = x ** 2 + rng.normal(0, 0.05, 20_000)           # fully dependent, not linear\nr = np.corrcoef(x, y)[0, 1]\njoint, _, _ = np.histogram2d(x, y, bins=10)\npxy = joint / joint.sum(); px = pxy.sum(1, keepdims=True); py = pxy.sum(0, keepdims=True)\nnz = pxy &gt; 0\nmi_bits = (pxy[nz] * np.log2(pxy[nz] / (px @ py)[nz])).sum()",
  "sources": [
   "<em>Elements of Information Theory</em> (2nd ed.), T. M. Cover &amp; J. A. Thomas, Wiley, 2006",
   "A. Kraskov, H. Stögbauer &amp; P. Grassberger, “Estimating Mutual Information”, <em>Physical Review E</em> 69, 2004",
   "D. N. Reshef et al., “Detecting Novel Associations in Large Data Sets”, <em>Science</em> 334(6062), 2011"
  ]
 },
 "distribution-shape": {
  "example": "10,000 simulated incomes from a lognormal distribution: skewness <strong>3.57</strong>, a mean of <strong>49,351</strong> and a median of <strong>36,160</strong>. The “average” earner earns less than the average. On a log scale the skewness is <strong>0.0</strong>: the data are symmetric in ratios, which is often the right scale to model them on.",
  "fails": [
   "Skewness and kurtosis estimates are dominated by a few extreme points and are unstable in small samples.",
   "Normality tests reject trivial departures in large samples and miss big ones in small samples; look at a QQ plot instead.",
   "Transforming the target changes what a model predicts (a median rather than a mean on the original scale)."
  ],
  "code": "from scipy.stats import skew\nrng = np.random.default_rng(8)\nincome = rng.lognormal(mean=10.5, sigma=0.8, size=10_000)   # right-skewed, like incomes\nstats_raw = (round(skew(income), 2), round(income.mean()), round(np.median(income)))\nskew_log = round(skew(np.log(income)), 2)",
  "sources": [
   "D. N. Joanes &amp; C. A. Gill, “Comparing Measures of Sample Skewness and Kurtosis”, <em>Journal of the Royal Statistical Society D</em> 47(1), 1998",
   "G. E. P. Box &amp; D. R. Cox, “An Analysis of Transformations”, <em>Journal of the Royal Statistical Society B</em> 26(2), 1964"
  ]
 },
 "outlier-detection": {
  "example": "Twelve values around 10, plus 25 and 300. The z-score rule flags only <strong>300</strong>: that one value inflates the standard deviation so much that 25 hides behind it (“masking”). The median-based modified z-score flags <strong>both 25 and 300</strong>. Outlier rules should not be built from statistics the outliers themselves distort.",
  "fails": [
   "An outlier is defined relative to a model; a value extreme in one feature can be normal given the others.",
   "Deleting outliers automatically can delete the most important cases (fraud, failures, rare events).",
   "Thresholds such as 3 or 3.5 are conventions; the expected number of false flags grows with the data."
  ],
  "code": "x = np.array([10, 11, 9, 10, 12, 11, 10, 9, 11, 10, 25, 300.0])   # two outliers: 25 and 300\nz = (x - x.mean()) / x.std()\nmad = np.median(np.abs(x - np.median(x)))\nrobust = 0.6745 * (x - np.median(x)) / mad          # modified z-score\nflag_z = x[np.abs(z) &gt; 3].tolist()\nflag_robust = x[np.abs(robust) &gt; 3.5].tolist()",
  "sources": [
   "B. Iglewicz &amp; D. C. Hoaglin, <em>How to Detect and Handle Outliers</em>, ASQC Quality Press, 1993 — the modified z-score",
   "C. Leys, C. Ley, O. Klein, P. Bernard &amp; L. Licata, “Detecting Outliers: Do Not Use Standard Deviation around the Mean, Use Absolute Deviation around the Median”, <em>Journal of Experimental Social Psychology</em> 49(4), 2013",
   "F. T. Liu, K. M. Ting &amp; Z.-H. Zhou, “Isolation Forest”, <em>IEEE ICDM</em>, 2008"
  ]
 },
 "missing-data": {
  "example": "10,000 incomes with a true mean of <strong>43,741</strong>, where higher earners skip the question more often (<strong>17%</strong> missing overall). The mean of the answers is <strong>36,509</strong> — and imputing the mean for the gaps keeps exactly that bias, while also shrinking the spread. When missingness depends on the value itself, no method on the observed data alone can fully recover it.",
  "fails": [
   "Missing not at random (MNAR) cannot be detected from the data; it needs domain knowledge or a sensitivity analysis.",
   "Multiple imputation handles missing-at-random well; it does not fix MNAR.",
   "A missingness indicator can itself be predictive, and dropping it throws information away."
  ],
  "code": "rng = np.random.default_rng(9)\nincome = rng.lognormal(10.5, 0.6, 10_000)\np_missing = np.clip((income - 30_000) / 100_000, 0, 0.8)     # higher earners skip the question more\nobserved = np.where(rng.random(10_000) &lt; p_missing, np.nan, income)\ntrue_mean = income.mean()\ncomplete_case = np.nanmean(observed)                          # what mean imputation also centres on\nshare_missing = np.isnan(observed).mean()",
  "sources": [
   "D. B. Rubin, “Inference and Missing Data”, <em>Biometrika</em> 63(3), 1976",
   "<em>Statistical Analysis with Missing Data</em> (3rd ed.), R. J. A. Little &amp; D. B. Rubin, Wiley, 2019",
   "S. van Buuren &amp; K. Groothuis-Oudshoorn, “mice: Multivariate Imputation by Chained Equations in R”, <em>Journal of Statistical Software</em> 45(3), 2011"
  ]
 },
 "data-drift": {
  "example": "A classifier that catches 80% of positives with 10% false alarms, unchanged. When 10% of cases are positive its precision is <strong>0.471</strong>; when 20% are, <strong>0.667</strong>. Nothing about the features’ distribution within each class moved — only the share of positives (label shift) — yet a key metric changed by 20 points.",
  "fails": [
   "Monitoring input features alone misses label shift and concept drift; track outcomes when they arrive.",
   "Covariate shift, label shift and concept shift need different fixes; diagnose which one you have first (Moreno-Torres et al. 2012).",
   "Thresholds tuned under one prevalence are wrong under another; re-tune when the base rate moves."
  ],
  "code": "tpr, fpr = 0.80, 0.10                               # the model's behaviour within each class, unchanged\ndef precision(prevalence):\n    return tpr * prevalence / (tpr * prevalence + fpr * (1 - prevalence))\nbefore, after = precision(0.10), precision(0.20)       # only the share of positives changed",
  "sources": [
   "J. G. Moreno-Torres, T. Raeder, R. Alaiz-Rodríguez, N. V. Chawla &amp; F. Herrera, “A Unifying View on Dataset Shift in Classification”, <em>Pattern Recognition</em> 45(1), 2012",
   "Z. C. Lipton, Y.-X. Wang &amp; A. Smola, “Detecting and Correcting for Label Shift with Black Box Predictors”, <em>ICML</em>, 2018",
   "<em>Dataset Shift in Machine Learning</em>, J. Quiñonero-Candela, M. Sugiyama, A. Schwaighofer &amp; N. D. Lawrence (eds.), MIT Press, 2009"
  ]
 },
 "class-imbalance": {
  "example": "If a missed case costs ten false alarms, the right decision threshold for a calibrated probability is 1/(1 + 10) = <strong>0.091</strong>. A case with P = 0.15 then costs <strong>0.85</strong> in expectation if you act and <strong>1.5</strong> if you do not, so you act. Choosing the threshold from the costs handles imbalance without resampling the data.",
  "fails": [
   "The rule needs calibrated probabilities; scores from a resampled or class-weighted model are not.",
   "For risk prediction, imbalance corrections such as SMOTE often harm calibration without improving discrimination (van den Goorbergh et al. 2022).",
   "Costs are rarely known exactly; check how sensitive the decision is to them."
  ],
  "code": "cost_fp, cost_fn = 1.0, 10.0                        # a missed case costs ten false alarms\nthreshold = cost_fp / (cost_fp + cost_fn)           # act when P(positive) exceeds this\nexpected_cost = lambda p, act: cost_fp * (1 - p) if act else cost_fn * p\nat_15 = (expected_cost(0.15, True), expected_cost(0.15, False))   # a case with P = 0.15",
  "sources": [
   "C. Elkan, “The Foundations of Cost-Sensitive Learning”, <em>IJCAI</em>, 2001",
   "H. He &amp; E. A. Garcia, “Learning from Imbalanced Data”, <em>IEEE Transactions on Knowledge and Data Engineering</em> 21(9), 2009",
   "R. van den Goorbergh, M. van Smeden, D. Timmerman &amp; B. Van Calster, “The Harm of Class Imbalance Corrections for Risk Prediction Models”, <em>Journal of the American Medical Informatics Association</em> 29(9), 2022"
  ]
 },
 "sharpe-ratio": {
  "example": "A strategy with an annual Sharpe ratio of 1, measured on three years of monthly returns. Its standard error is about <strong>0.59</strong>, so the 95% interval runs from <strong>−0.15</strong> to <strong>2.15</strong>. Three years cannot tell a good strategy from a useless one — or from an excellent one.",
  "fails": [
   "Autocorrelated returns (smoothed or illiquid assets) make the usual √12 annualisation overstate the Sharpe ratio (Lo 2002).",
   "The ratio treats upside and downside volatility alike; skewed strategies (option selling) look better than they are.",
   "Comparing the best of many strategies by Sharpe needs a correction for the number tried."
  ],
  "code": "sr_annual, months = 1.0, 36                         # a Sharpe of 1, from three years of monthly returns\nsr_m = sr_annual / np.sqrt(12)\nse_m = np.sqrt((1 + 0.5 * sr_m ** 2) / months)       # Lo (2002), i.i.d. returns\nse_annual = se_m * np.sqrt(12)\nci = (sr_annual - 1.96 * se_annual, sr_annual + 1.96 * se_annual)",
  "sources": [
   "A. W. Lo, “The Statistics of Sharpe Ratios”, <em>Financial Analysts Journal</em> 58(4), 2002",
   "W. F. Sharpe, “The Sharpe Ratio”, <em>Journal of Portfolio Management</em> 21(1), 1994",
   "D. H. Bailey &amp; M. López de Prado, “The Sharpe Ratio Efficient Frontier”, <em>Journal of Risk</em> 15(2), 2012"
  ]
 },
 "max-drawdown": {
  "example": "Simulated stock-like returns — 7% a year on average with 16% volatility. The median maximum drawdown is <strong>13.7%</strong> over one year, <strong>25.7%</strong> over five and <strong>38.0%</strong> over twenty. The same strategy has a deeper worst drawdown the longer you watch it, so drawdowns from histories of different lengths cannot be compared directly.",
  "fails": [
   "A backtest’s maximum drawdown is one draw from a distribution; expect worse live.",
   "Limits set from a short history will be breached by a perfectly normal strategy.",
   "Drawdown depends on the order of returns (see Monte Carlo); the same trades can produce very different worst cases."
  ],
  "code": "rng = np.random.default_rng(10)\ndef median_mdd(years, paths=2_000, mu=0.07, sigma=0.16):\n    r = rng.normal(mu / 252, sigma / np.sqrt(252), (paths, 252 * years))\n    wealth = np.exp(np.cumsum(r, axis=1))\n    return np.median((1 - wealth / np.maximum.accumulate(wealth, axis=1)).max(axis=1))\ntable = {y: round(median_mdd(y), 3) for y in (1, 5, 20)}",
  "sources": [
   "M. Magdon-Ismail, A. F. Atiya, A. Pratap &amp; Y. S. Abu-Mostafa, “On the Maximum Drawdown of a Brownian Motion”, <em>Journal of Applied Probability</em> 41(1), 2004",
   "M. Magdon-Ismail &amp; A. F. Atiya, “Maximum Drawdown”, <em>Risk</em> 17(10), 2004"
  ]
 },
 "walk-forward": {
  "example": "200 strategies with no edge at all, tested on two years of daily data. The best one on the first year has a Sharpe ratio of <strong>1.74</strong>; on the second year the same strategy scores <strong>−1.07</strong>, and the average out of sample is <strong>−0.07</strong>. Selecting on in-sample results is selecting on luck; only the out-of-sample period says anything.",
  "fails": [
   "Re-optimising at every walk-forward step and then reporting the combined result is still a search; count every variant you tried.",
   "Short out-of-sample windows are noisy; one good year proves little.",
   "Walk-forward cannot fix data problems such as survivorship or look-ahead in the inputs."
  ],
  "code": "rng = np.random.default_rng(11)\nr = rng.normal(0, 0.01, (200, 1_000))               # 200 strategies with no edge, 1,000 days\nins, outs = r[:, :500], r[:, 500:]\nsharpe = lambda x: x.mean(axis=-1) / x.std(axis=-1) * np.sqrt(252)\nbest = np.argmax(sharpe(ins))\nresult = (round(sharpe(ins)[best], 2), round(sharpe(outs)[best], 2), round(sharpe(outs).mean(), 2))",
  "sources": [
   "D. H. Bailey, J. M. Borwein, M. López de Prado &amp; Q. J. Zhu, “Pseudo-Mathematics and Financial Charlatanism: The Effects of Backtest Overfitting on Out-of-Sample Performance”, <em>Notices of the AMS</em> 61(5), 2014",
   "R. Pardo, <em>The Evaluation and Optimization of Trading Strategies</em> (2nd ed.), Wiley, 2008",
   "H. White, “A Reality Check for Data Snooping”, <em>Econometrica</em> 68(5), 2000"
  ]
 },
 "monte-carlo": {
  "example": "One year of 250 trade returns has a maximum drawdown of <strong>12.5%</strong>. Shuffle the same trades into 5,000 other orders: the final result is identical (<strong>True</strong>), but the maximum drawdown ranges from <strong>12.6%</strong> to <strong>26.8%</strong> (5th to 95th percentile). The order you happened to get was among the luckiest; plan for the distribution, not the history.",
  "fails": [
   "Shuffling assumes trades are independent; strategies with streaks or regimes need block resampling.",
   "Simulated paths can only recombine what happened; they cannot produce a crash larger than any in the data.",
   "A thousand simulated paths from a wrong model are a thousand wrong answers."
  ],
  "code": "rng = np.random.default_rng(12)\ntrades = rng.normal(0.002, 0.02, 250)                 # one year of trade returns\ndef mdd(rets):\n    w = np.cumprod(1 + rets); return (1 - w / np.maximum.accumulate(w)).max()\nactual = mdd(trades)\nshuffled = [mdd(rng.permutation(trades)) for _ in range(5_000)]   # same trades, other orders\nlo, hi = np.percentile(shuffled, [5, 95])\nfinal_same = np.isclose(np.prod(1 + trades), np.prod(1 + rng.permutation(trades)))",
  "sources": [
   "<em>An Introduction to the Bootstrap</em>, B. Efron &amp; R. J. Tibshirani, Chapman &amp; Hall, 1993",
   "<em>Monte Carlo Methods in Financial Engineering</em>, P. Glasserman, Springer, 2003"
  ]
 },
 "survivorship-bias": {
  "example": "1,000 funds with no skill at all, each year closing the worst 10% of those still alive. After five years <strong>590</strong> survive. Across all funds the average annual return is <strong>0.26%</strong> — zero, as it should be. Across the survivors it is <strong>2.16%</strong>. A database of today’s funds reports skill that never existed.",
  "fails": [
   "Survivorship hides in index constituents, delisted stocks and closed funds; the data vendor’s history must include the dead.",
   "The bias is largest exactly where returns are most volatile.",
   "Selection on success happens in research too: only working strategies get written up."
  ],
  "code": "rng = np.random.default_rng(13)\nfunds, years = 1_000, 5\nreturns = rng.normal(0.0, 0.10, (funds, years))      # no fund has any skill\nalive = np.ones(funds, bool)\nfor t in range(years):                                # each year the worst 10% of survivors close\n    cut = np.quantile(returns[alive, t], 0.10)\n    alive &amp;= ~(returns[:, t] &lt; cut)\nall_avg, survivors_avg = returns.mean(), returns[alive].mean()",
  "sources": [
   "S. J. Brown, W. Goetzmann, R. G. Ibbotson &amp; S. A. Ross, “Survivorship Bias in Performance Studies”, <em>Review of Financial Studies</em> 5(4), 1992",
   "E. J. Elton, M. J. Gruber &amp; C. R. Blake, “Survivor Bias and Mutual Fund Performance”, <em>Review of Financial Studies</em> 9(4), 1996"
  ]
 },
 "confidence-intervals": {
  "example": "A t-interval from 10 observations is promised to cover the true mean 95% of the time. With normal data it does: <strong>95.0%</strong> in 20,000 simulations. With skewed (lognormal) data it covers only <strong>83.6%</strong>. The nominal level is a promise conditional on assumptions; small, skewed samples break it.",
  "fails": [
   "Bootstrap intervals help with skew but need enough data themselves; BCa intervals correct for bias and skew (Efron 1987).",
   "An interval for the mean says nothing about where individual values will fall; that is a prediction interval.",
   "Overlapping intervals are not a significance test for a difference."
  ],
  "code": "from scipy import stats\nrng = np.random.default_rng(14)\ndef coverage(draw, true_mean, n=10, reps=20_000):\n    x = draw((reps, n))\n    half = stats.t.ppf(0.975, n - 1) * x.std(axis=1, ddof=1) / np.sqrt(n)\n    return (np.abs(x.mean(axis=1) - true_mean) &lt;= half).mean()\nnormal = coverage(lambda s: rng.normal(1, 1, s), 1)\nskewed = coverage(lambda s: rng.lognormal(0, 1, s), np.exp(0.5))   # lognormal, mean e^0.5",
  "sources": [
   "J. Neyman, “Outline of a Theory of Statistical Estimation Based on the Classical Theory of Probability”, <em>Philosophical Transactions of the Royal Society A</em> 236, 1937",
   "B. Efron, “Better Bootstrap Confidence Intervals”, <em>Journal of the American Statistical Association</em> 82(397), 1987",
   "<em>Introduction to Robust Estimation and Hypothesis Testing</em> (4th ed.), R. R. Wilcox, Academic Press, 2017"
  ]
 },
 "bootstrap-methods": {
  "example": "Bootstrapping the maximum of 50 values: in <strong>63.8%</strong> of resamples the “new” maximum is just the original maximum, matching the theoretical 1 − (1 − 1/50)⁵⁰ = <strong>63.6%</strong>. The bootstrap distribution piles up on one value and cannot see beyond the sample. The bootstrap works for smooth statistics like means; it fails for extremes.",
  "fails": [
   "Other failures: very small samples, heavy tails with infinite variance, and dependent data resampled as if independent.",
   "Dependent data need block or stationary bootstraps that keep neighbours together.",
   "The bootstrap estimates sampling variability, not bias from a flawed design."
  ],
  "code": "rng = np.random.default_rng(15)\nx = rng.uniform(0, 1, 50)\nboot_max = np.array([rng.choice(x, 50).max() for _ in range(10_000)])\nshare_equal = (boot_max == x.max()).mean()            # resamples whose max is just the sample max\ntheory = 1 - (1 - 1 / 50) ** 50",
  "sources": [
   "B. Efron, “Bootstrap Methods: Another Look at the Jackknife”, <em>Annals of Statistics</em> 7(1), 1979",
   "P. J. Bickel &amp; D. A. Freedman, “Some Asymptotic Theory for the Bootstrap”, <em>Annals of Statistics</em> 9(6), 1981",
   "<em>An Introduction to the Bootstrap</em>, B. Efron &amp; R. J. Tibshirani, Chapman &amp; Hall, 1993"
  ]
 },
 "bayesian-ab": {
  "example": "A converts 120 of 1,000 visitors, B 135 of 1,000. With uniform priors, the posterior probability that B is better is <strong>84.3%</strong>, and the expected loss from choosing B — how much conversion you give up on average in the worlds where A is better — is just <strong>0.12</strong> percentage points. A decision rule on expected loss can ship B even though a significance test would not reject.",
  "fails": [
   "“Probability that B is better” is not immune to peeking: stopping when it crosses a line still raises error rates unless the decision rule accounts for it.",
   "Priors matter with little data; report how the conclusion changes under a sceptical prior.",
   "A posterior on conversion says nothing about long-term effects such as retention or novelty wearing off."
  ],
  "code": "rng = np.random.default_rng(16)\na = rng.beta(1 + 120, 1 + 880, 200_000)              # 120 of 1,000 converted, uniform prior\nb = rng.beta(1 + 135, 1 + 865, 200_000)              # 135 of 1,000\np_b_better = (b &gt; a).mean()\nexpected_loss_b = np.maximum(a - b, 0).mean()        # what choosing B costs on average if wrong",
  "sources": [
   "<em>Bayesian Data Analysis</em> (3rd ed.), A. Gelman, J. B. Carlin, H. S. Stern, D. B. Dunson, A. Vehtari &amp; D. B. Rubin, CRC Press, 2013",
   "C. Stucchio, “Bayesian A/B Testing at VWO”, VWO whitepaper, 2015 — expected-loss decision rules",
   "<em>Trustworthy Online Controlled Experiments</em>, R. Kohavi, D. Tang &amp; Y. Xu, Cambridge University Press, 2020"
  ]
 },
 "effect-size": {
  "example": "Two groups of 100,000 whose means differ by 0.75 points on a standard deviation of 15. The p-value is <strong>1.6×10⁻³⁴</strong> — overwhelming evidence that a difference exists. Cohen’s d is <strong>0.055</strong>, a tenth of what is usually called small. With enough data, significance only tells you the effect is not exactly zero.",
  "fails": [
   "Cohen’s benchmarks (0.2, 0.5, 0.8) were meant as a last resort; what counts as meaningful depends on the field and the cost of the change.",
   "Standardised effect sizes depend on the spread of the sample; the same effect looks bigger in a homogeneous group.",
   "Effects reported from small significant studies are inflated on average (see Hypothesis Testing)."
  ],
  "code": "from scipy.stats import ttest_ind\nrng = np.random.default_rng(17)\na = rng.normal(100, 15, 100_000)\nb = rng.normal(100.75, 15, 100_000)                  # a 0.75-point difference on an SD of 15\np = ttest_ind(a, b).pvalue\nd = (b.mean() - a.mean()) / np.sqrt((a.var(ddof=1) + b.var(ddof=1)) / 2)",
  "sources": [
   "<em>Statistical Power Analysis for the Behavioral Sciences</em> (2nd ed.), J. Cohen, Lawrence Erlbaum, 1988",
   "G. M. Sullivan &amp; R. Feinn, “Using Effect Size — or Why the P Value Is Not Enough”, <em>Journal of Graduate Medical Education</em> 4(3), 2012",
   "R. L. Wasserstein &amp; N. A. Lazar, “The ASA Statement on p-Values: Context, Process, and Purpose”, <em>The American Statistician</em> 70(2), 2016"
  ]
 },
 "power-analysis": {
  "example": "To detect a standardised effect with 80% power at the 5% level takes about <strong>393</strong> people per group for d = 0.2, <strong>63</strong> for d = 0.5 and <strong>25</strong> for d = 0.8. A study with 30 per group has only <strong>49%</strong> power for a medium effect of 0.5 — a coin flip whether it finds an effect that is really there.",
  "fails": [
   "Power calculations need a guess of the effect size; guessing from a small pilot study usually overestimates it.",
   "Computing “observed power” after a study is uninformative; it is just a restatement of the p-value.",
   "Low-powered studies that do find effects tend to exaggerate them (Button et al. 2013)."
  ],
  "code": "from scipy.stats import norm\nz = norm.ppf(0.975) + norm.ppf(0.80)\nn_per_group = {d: int(np.ceil(2 * z ** 2 / d ** 2)) for d in (0.2, 0.5, 0.8)}   # normal approximation\npower_30 = norm.cdf(0.5 * np.sqrt(30 / 2) - norm.ppf(0.975))                   # d = 0.5 with 30 per group",
  "sources": [
   "<em>Statistical Power Analysis for the Behavioral Sciences</em> (2nd ed.), J. Cohen, Lawrence Erlbaum, 1988",
   "K. S. Button et al., “Power Failure: Why Small Sample Size Undermines the Reliability of Neuroscience”, <em>Nature Reviews Neuroscience</em> 14, 2013",
   "<em>Trustworthy Online Controlled Experiments</em>, R. Kohavi, D. Tang &amp; Y. Xu, Cambridge University Press, 2020"
  ]
 },
 "hypothesis-testing": {
  "example": "5,000 experiments with no real effect: <strong>5.0%</strong> come out significant, exactly the false-positive rate promised. 5,000 experiments with a real effect of 0.4 standard deviations and 30 per group: only <strong>32.3%</strong> come out significant, and <strong>18.2%</strong> land between 0.01 and 0.05. With low power, a real effect usually looks like nothing, and when it does show, it barely clears the line.",
  "fails": [
   "Significant results from low-powered studies exaggerate the effect size and can even get its sign wrong (Gelman &amp; Carlin 2014).",
   "When most tested hypotheses are false, most significant findings can be false too (Ioannidis 2005).",
   "p &lt; 0.05 is a convention, not a law; report the estimate and its interval."
  ],
  "code": "from scipy.stats import ttest_ind\nrng = np.random.default_rng(18)\nx = rng.normal(0, 1, (5_000, 60))                        # 5,000 experiments, two groups of 30, no effect\ny = rng.normal(0, 1, (5_000, 60)); y[:, 30:] += 0.4      # 5,000 more with a real effect of 0.4 SD\nnull = ttest_ind(x[:, :30], x[:, 30:], axis=1).pvalue    # one t-test per row\nreal = ttest_ind(y[:, :30], y[:, 30:], axis=1).pvalue\nshare = (round((null &lt; 0.05).mean(), 3), round((real &lt; 0.05).mean(), 3))\nnear_miss = round(((real &gt; 0.01) &amp; (real &lt; 0.05)).mean(), 3)",
  "sources": [
   "R. L. Wasserstein &amp; N. A. Lazar, “The ASA Statement on p-Values: Context, Process, and Purpose”, <em>The American Statistician</em> 70(2), 2016",
   "J. P. A. Ioannidis, “Why Most Published Research Findings Are False”, <em>PLoS Medicine</em> 2(8), 2005",
   "A. Gelman &amp; J. Carlin, “Beyond Power Calculations: Assessing Type S (Sign) and Type M (Magnitude) Errors”, <em>Perspectives on Psychological Science</em> 9(6), 2014"
  ]
 },
 "stat-tests": {
  "example": "Two groups of 40 from a heavy-tailed distribution (Student t with 2 degrees of freedom), with a real shift of 0.5. The t-test detects it <strong>18%</strong> of the time; the Mann–Whitney test <strong>35%</strong> — nearly double. With heavy tails a few extreme values swamp the mean, while ranks barely notice them. The right test depends on the shape of the data, not only on its type.",
  "fails": [
   "Mann–Whitney tests whether one group tends to be larger, not whether the means or medians differ, unless the shapes are the same.",
   "With large samples the t-test is robust to non-normality of the data; the problem is heavy tails and outliers, not skew alone.",
   "Running several tests and reporting the one that worked is a forking path."
  ],
  "code": "from scipy.stats import ttest_ind, mannwhitneyu\nrng = np.random.default_rng(19)\nhits_t = hits_u = 0\nfor _ in range(2_000):                               # heavy-tailed data with a real shift of 0.5\n    a, b = rng.standard_t(2, 40), rng.standard_t(2, 40) + 0.5\n    hits_t += ttest_ind(a, b).pvalue &lt; 0.05\n    hits_u += mannwhitneyu(a, b).pvalue &lt; 0.05\npower = (hits_t / 2_000, hits_u / 2_000)",
  "sources": [
   "H. B. Mann &amp; D. R. Whitney, “On a Test of Whether One of Two Random Variables Is Stochastically Larger than the Other”, <em>Annals of Mathematical Statistics</em> 18(1), 1947",
   "M. W. Fagerland, “t-Tests, Non-Parametric Tests, and Large Studies — a Paradox of Statistical Practice?”, <em>BMC Medical Research Methodology</em> 12, 2012",
   "<em>Introduction to Robust Estimation and Hypothesis Testing</em> (4th ed.), R. R. Wilcox, Academic Press, 2017"
  ]
 },
 "clt-sampling": {
  "example": "Means of exponential samples: the skewness is <strong>1.99</strong> for single values, <strong>0.87</strong> for means of 5 and <strong>0.35</strong> for means of 30 — falling as 2/√n, the CLT at work. Cauchy data never get there: the spread (interquartile range) of a single draw is <strong>2.10</strong>, and of the mean of 1,000 draws still <strong>2.06</strong>. Without a finite variance, averaging does not help at all.",
  "fails": [
   "“n = 30 is enough” is a rule of thumb that fails for strongly skewed or heavy-tailed data.",
   "The CLT is about the mean; medians, maxima and ratios converge differently, or not at all.",
   "Dependent observations converge much more slowly than independent ones."
  ],
  "code": "from scipy.stats import skew\nrng = np.random.default_rng(20)\nskew_of_mean = {n: round(skew(rng.exponential(1, (20_000, n)).mean(axis=1)), 2) for n in (1, 5, 30)}\ncauchy = rng.standard_cauchy((2_000, 1_000))\nspread = (round(np.subtract(*np.percentile(cauchy[:, 0], [75, 25])), 2),          # one draw\n          round(np.subtract(*np.percentile(cauchy.mean(axis=1), [75, 25])), 2))   # mean of 1,000",
  "sources": [
   "<em>An Introduction to Probability Theory and Its Applications</em>, Vol. 2 (2nd ed.), W. Feller, Wiley, 1971",
   "<em>Introduction to Robust Estimation and Hypothesis Testing</em> (4th ed.), R. R. Wilcox, Academic Press, 2017"
  ]
 },
 "correlation-causation": {
  "example": "Talent and looks are independent in 20,000 people (r = <strong>−0.002</strong>). Look only at the <strong>1,568</strong> who are noticed because their sum is high, and the correlation is <strong>−0.75</strong>: among the famous, the talented seem plain and the beautiful seem untalented. Selecting on an outcome creates correlations that do not exist — Berkson’s paradox, or collider bias.",
  "fails": [
   "Collider bias is created by conditioning — through selection, filtering or “controlling for” a variable that both causes affect.",
   "Datasets of applicants, patients or customers are already selected; correlations inside them can be artefacts.",
   "Adding more variables to a regression does not fix this; adding the wrong one causes it."
  ],
  "code": "rng = np.random.default_rng(21)\ntalent, looks = rng.normal(size=(2, 20_000))         # independent in the population\nfamous = talent + looks &gt; 2                          # only the top on the sum get noticed\nr_all = np.corrcoef(talent, looks)[0, 1]\nr_famous = np.corrcoef(talent[famous], looks[famous])[0, 1]",
  "sources": [
   "J. Berkson, “Limitations of the Application of Fourfold Table Analysis to Hospital Data”, <em>Biometrics Bulletin</em> 2(3), 1946",
   "<em>Causal Inference in Statistics: A Primer</em>, J. Pearl, M. Glymour &amp; N. P. Jewell, Wiley, 2016",
   "F. Elwert &amp; C. Winship, “Endogenous Selection Bias: The Problem of Conditioning on a Collider Variable”, <em>Annual Review of Sociology</em> 40, 2014"
  ]
 },
 "eda-workflow": {
  "example": "Five rows that look harmless. Ages stored as text become numbers only after conversion, with <strong>1</strong> entry (“n/a”) turning into a missing value. Incomes use −999 for “unknown”: the naive mean is <strong>31,800</strong>, the mean without the placeholders <strong>53,667</strong>. The first hour of EDA is mostly about finding what the numbers really are.",
  "fails": [
   "Summary statistics hide placeholders, duplicated rows and unit changes; look at value counts and the extremes.",
   "Every chart you look at during EDA is a test; the patterns you find need confirming on fresh data.",
   "Cleaning rules decided after seeing results can quietly favour the answer you wanted."
  ],
  "code": "df = pd.DataFrame({'age': ['34', '51', '29', 'n/a', '45'],      # numbers stored as text\n                   'income': [52_000, -999, 61_000, 48_000, -999]})   # -999 means \"unknown\"\nage = pd.to_numeric(df.age, errors='coerce')\nnaive_mean = df.income.mean()\nclean_mean = df.income.replace(-999, np.nan).mean()",
  "sources": [
   "<em>Exploratory Data Analysis</em>, J. W. Tukey, Addison-Wesley, 1977",
   "K. W. Broman &amp; K. H. Woo, “Data Organization in Spreadsheets”, <em>The American Statistician</em> 72(1), 2018",
   "H. Wickham, “Tidy Data”, <em>Journal of Statistical Software</em> 59(10), 2014"
  ]
 },
 "groupby-aggregation": {
  "example": "900 baskets of 40 in a big store and 100 baskets of 80 in a small one. The per-store means are 40 and 80; their average is <strong>60</strong>. The average basket is <strong>44</strong>. Both are “the mean”: one counts stores, the other counts baskets. Aggregating aggregates silently changes the question.",
  "fails": [
   "Averages of ratios and ratios of averages differ; decide which one the question needs.",
   "Grouped results can reverse when the groups are combined (Simpson’s paradox).",
   "Small groups produce extreme means by chance; rank them with care."
  ],
  "code": "df = pd.DataFrame({'store': ['big'] * 900 + ['small'] * 100,\n                   'basket': np.r_[np.full(900, 40.0), np.full(100, 80.0)]})\nper_store = df.groupby('store').basket.mean()\nmean_of_means = per_store.mean()                    # each store counts once\npooled = df.basket.mean()                           # each basket counts once",
  "sources": [
   "H. Wickham, “The Split-Apply-Combine Strategy for Data Analysis”, <em>Journal of Statistical Software</em> 40(1), 2011",
   "<em>Python for Data Analysis</em> (3rd ed.), W. McKinney, O’Reilly, 2022",
   "E. H. Simpson, “The Interpretation of Interaction in Contingency Tables”, <em>Journal of the Royal Statistical Society B</em> 13(2), 1951"
  ]
 },
 "cohort-retention": {
  "example": "From January to June, retention improved in both channels: search from <strong>50.0%</strong> to <strong>53.3%</strong>, ads from <strong>30.0%</strong> to <strong>32.0%</strong>. The overall rate fell from <strong>46.0%</strong> to <strong>38.4%</strong>, because the June cohort came mostly from ads. Reading retention without breaking it down by acquisition mix can report a decline that is really a change in who arrived.",
  "fails": [
   "Recent cohorts have not yet had time to churn; averaging curves of different ages biases them.",
   "Retention definitions (active in month k, or in any month since) change the curve’s shape.",
   "Extrapolating early churn forward understates lifetime when the curve flattens (Fader &amp; Hardie 2007)."
  ],
  "code": "cohorts = pd.DataFrame({'channel': ['search', 'ads'] * 2, 'month': ['Jan', 'Jan', 'Jun', 'Jun'],\n                        'users': [800, 200, 300, 700], 'retained': [400, 60, 160, 224]})\ncohorts['rate'] = cohorts.retained / cohorts.users\noverall = cohorts.groupby('month')[['users', 'retained']].sum()\noverall['rate'] = overall.retained / overall.users",
  "sources": [
   "P. S. Fader &amp; B. G. S. Hardie, “How to Project Customer Retention”, <em>Journal of Interactive Marketing</em> 21(1), 2007",
   "E. H. Simpson, “The Interpretation of Interaction in Contingency Tables”, <em>Journal of the Royal Statistical Society B</em> 13(2), 1951",
   "P. J. Bickel, E. A. Hammel &amp; J. W. O’Connell, “Sex Bias in Graduate Admissions: Data from Berkeley”, <em>Science</em> 187(4175), 1975"
  ]
 },
 "funnel-analysis": {
  "example": "A funnel converting 40%, 50% and 20% at its three steps: <strong>4.0%</strong> end to end. Ten more points on the weakest step (20 → 30%) lift it to <strong>6.0%</strong>; ten more points on the 50% step only to <strong>4.8%</strong>. Steps multiply, so the same absolute gain is worth most where the rate is lowest — it is the biggest relative change.",
  "fails": [
   "Steps are not independent: pushing more people through one step often lowers the quality of those reaching the next.",
   "Funnels built from sessions double-count users who return; decide whether you are counting people or visits.",
   "A funnel shows where people leave, not why; pair it with experiments."
  ],
  "code": "stages = np.array([0.40, 0.50, 0.20])               # visit -&gt; signup -&gt; trial -&gt; paid\noverall = stages.prod()\nfix_small = np.array([0.40, 0.50, 0.30]).prod()      # +10 points on the weakest step\nfix_large = np.array([0.40, 0.60, 0.20]).prod()      # +10 points on a stronger one",
  "sources": [
   "<em>Trustworthy Online Controlled Experiments</em>, R. Kohavi, D. Tang &amp; Y. Xu, Cambridge University Press, 2020",
   "<em>Lean Analytics</em>, A. Croll &amp; B. Yoskovitz, O’Reilly, 2013"
  ]
 },
 "sklearn-eval": {
  "example": "Three classes with 900, 80 and 20 examples and per-class F1 of 0.95, 0.60 and 0.20. The macro average, which counts each class once, is <strong>0.583</strong>; the weighted average, which counts each example once, is <strong>0.907</strong>. classification_report prints both. The weighted number mostly describes the big class.",
  "fails": [
   "Micro, macro and weighted averages answer different questions; report the one that matches what you care about.",
   "Default scorers in cross_val_score (accuracy, R²) may not be the metric you need; set scoring explicitly.",
   "Reports on the training data say nothing about generalisation; evaluate on held-out folds."
  ],
  "code": "support = np.array([900, 80, 20])                    # three classes, very unequal\nf1 = np.array([0.95, 0.60, 0.20])                      # per-class F1 from a classification report\nmacro = f1.mean()                                      # every class counts the same\nweighted = (f1 * support).sum() / support.sum()        # every example counts the same",
  "sources": [
   "F. Pedregosa et al., “Scikit-learn: Machine Learning in Python”, <em>Journal of Machine Learning Research</em> 12, 2011",
   "M. Sokolova &amp; G. Lapalme, “A Systematic Analysis of Performance Measures for Classification Tasks”, <em>Information Processing &amp; Management</em> 45(4), 2009",
   "J. Opitz &amp; S. Burst, “Macro F1 and Macro F1”, arXiv:1911.03347, 2019"
  ]
 },
 "shap-library": {
  "example": "TreeExplainer on a classifier reports in log-odds. With a 20% base rate the base value is <strong>−1.386</strong>; two features adding 1.2 and 0.9 give a predicted probability of <strong>0.671</strong>. Read the same contributions as probability points and you would get <strong>2.3</strong> — an impossible “230%”. Check the output space before reading a waterfall plot.",
  "fails": [
   "TreeExplainer’s default interventional or path-dependent settings give different values for correlated features.",
   "Global importance from mean |SHAP| is not the same as the importance of a feature for the outcome (Kumar et al. 2020).",
   "Explanations of a model trained on biased data explain the bias faithfully."
  ],
  "code": "sigmoid = lambda z: 1 / (1 + np.exp(-z))\nbase_logodds = np.log(0.2 / 0.8)                      # TreeExplainer's base value for a 20% base rate\ncontrib = np.array([1.2, 0.9])                        # two features' SHAP values, in log-odds\np = sigmoid(base_logodds + contrib.sum())\nnaive = 0.2 + contrib.sum()                           # treating them as probability points",
  "sources": [
   "S. M. Lundberg et al., “From Local Explanations to Global Understanding with Explainable AI for Trees”, <em>Nature Machine Intelligence</em> 2, 2020",
   "S. M. Lundberg &amp; S.-I. Lee, “A Unified Approach to Interpreting Model Predictions”, <em>NeurIPS</em>, 2017",
   "I. E. Kumar, S. Venkatasubramanian, C. Scheidegger &amp; S. Friedler, “Problems with Shapley-Value-Based Explanations as Feature Importance Measures”, <em>ICML</em>, 2020"
  ]
 },
 "optuna": {
  "example": "Pure random search lands at least one trial in the best 5% of a search space with probability <strong>64%</strong> after 20 trials, <strong>95%</strong> after 60 and near certainty after 200 — whatever the number of dimensions, if only a few really matter (Bergstra &amp; Bengio 2012). Smarter samplers such as TPE beat this baseline; it is the bar they have to clear.",
  "fails": [
   "The best of many trials is optimistically biased; evaluate it on data the search never saw.",
   "Pruning stops slow starters that might finish best; it is a heuristic, not a guarantee.",
   "A wide, poorly scaled space (learning rate on a linear rather than log scale) wastes most trials."
  ],
  "code": "p_top5 = {n: round(1 - 0.95 ** n, 3) for n in (20, 60, 200)}   # random search: at least one trial in the top 5%",
  "sources": [
   "T. Akiba, S. Sano, T. Yanase, T. Ohta &amp; M. Koyama, “Optuna: A Next-generation Hyperparameter Optimization Framework”, <em>KDD</em>, 2019",
   "J. Bergstra &amp; Y. Bengio, “Random Search for Hyper-Parameter Optimization”, <em>Journal of Machine Learning Research</em> 13, 2012",
   "J. Bergstra, R. Bardenet, Y. Bengio &amp; B. Kégl, “Algorithms for Hyper-Parameter Optimization”, <em>NeurIPS</em>, 2011"
  ]
 },
 "pandas-ta": {
  "example": "The same 20 closing prices, two “RSI(14)”s. Wilder’s smoothing gives <strong>52.01</strong>; a plain 14-day average of gains and losses gives <strong>63.46</strong>. Libraries and platforms differ in exactly these choices — and Wilder’s version also depends on how much history came before, because its average never fully forgets.",
  "fails": [
   "Indicators computed on short histories have not “warmed up”; discard the first few dozen values.",
   "Two libraries with the same indicator name can give different numbers; pin the implementation and test it against a known reference.",
   "Downloaded prices may be adjusted or unadjusted for splits and dividends; indicators on mixed data are wrong."
  ],
  "code": "close = pd.Series([44.3, 44.1, 44.2, 43.6, 44.3, 44.8, 45.1, 45.4, 45.8, 46.1,\n                   45.9, 46.2, 45.6, 46.3, 46.3, 46.0, 46.4, 46.2, 45.6, 46.2])\nd = close.diff()\nup, down = d.clip(lower=0), -d.clip(upper=0)\ndef rsi(u, v): return (100 - 100 / (1 + u / v)).iloc[-1]\nwilder = rsi(up.ewm(alpha=1 / 14, adjust=False).mean(), down.ewm(alpha=1 / 14, adjust=False).mean())\nsimple = rsi(up.rolling(14).mean(), down.rolling(14).mean())   # \"RSI\" with a plain average",
  "sources": [
   "J. W. Wilder Jr., <em>New Concepts in Technical Trading Systems</em>, Trend Research, 1978",
   "pandas-ta documentation, github.com/twopirllc/pandas-ta",
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000"
  ]
 },
 "scipy-statsmodels": {
  "example": "Ten p-values, eight of them below 0.05. Bonferroni keeps <strong>2</strong> as significant; the Benjamini–Hochberg procedure keeps <strong>6</strong>, controlling the expected share of false discoveries instead of the chance of any. statsmodels’ <code>multipletests</code> does both; which one is right depends on whether a single false positive is costly or a few are acceptable.",
  "fails": [
   "Corrections apply to the family of tests you actually ran, including the ones you did not report.",
   "Benjamini–Hochberg assumes independent or positively dependent tests; under other dependence use Benjamini–Yekutieli.",
   "A non-significant result after correction is not evidence of no effect."
  ],
  "code": "p = np.array([0.001, 0.004, 0.008, 0.012, 0.02, 0.03, 0.04, 0.045, 0.2, 0.5])\nm = len(p)\nbonferroni = (p &lt; 0.05 / m).sum()\norder = np.sort(p)\npassed = order &lt;= 0.05 * np.arange(1, m + 1) / m    # Benjamini-Hochberg step-up\nbh = (np.max(np.nonzero(passed)) + 1) if passed.any() else 0",
  "sources": [
   "Y. Benjamini &amp; Y. Hochberg, “Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing”, <em>Journal of the Royal Statistical Society B</em> 57(1), 1995",
   "S. Holm, “A Simple Sequentially Rejective Multiple Test Procedure”, <em>Scandinavian Journal of Statistics</em> 6(2), 1979",
   "S. Seabold &amp; J. Perktold, “Statsmodels: Econometric and Statistical Modeling with Python”, <em>Proceedings of the 9th Python in Science Conference</em>, 2010",
   "P. Virtanen et al., “SciPy 1.0: Fundamental Algorithms for Scientific Computing in Python”, <em>Nature Methods</em> 17, 2020"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, id, run: 'stats/' + id, codeNote: 'Assumes <code>import numpy as np</code> and <code>import pandas as pd</code> (and SciPy where imported). Each snippet simulates or makes up its own data, as the comments say.' });
}
/* depth:end */

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
    + buildHypothesisTesting() + buildStatTests() + buildCLTSampling()
    + buildCorrelationCausation()
    + buildEDAWorkflow() + buildGroupbyAggregation() + buildCohortRetention()
    + buildFunnelAnalysis()
    + buildSklearnEval() + buildSHAPLibrary() + buildOptuna()
    + buildPandasTA() + buildScipyStatsmodels();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <div class="home-kicker">// The Toolkit</div>
    <h2>Statistics &amp; Data <em>Analytics</em></h2>
    <p style="margin-top:14px">A practical reference covering 39 topics &mdash; from model evaluation
    and feature explainability to statistical foundations, data analytics, backtesting, and decision-making. Every topic has interactive visuals, real formulas, and Python code you can use today.</p>
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">39</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">39</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">8</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:18px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> arrow keys to navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-evaluate','confusion-matrix')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg></div>
      <div class="cat-card-name">Evaluate Your Model</div>
      <div class="cat-card-count">6 topics &middot; Confusion matrix, ROC, regression metrics, CV</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-features','shap-values')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="15"/></svg></div>
      <div class="cat-card-name">Understand Your Features</div>
      <div class="cat-card-count">5 topics &middot; SHAP, permutation importance, PDP, correlation</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-data','distribution-shape')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M6.5 16c4.5 0 6-8 11.5-9"/></svg></div>
      <div class="cat-card-name">Analyze Your Data</div>
      <div class="cat-card-count">5 topics &middot; Distributions, outliers, drift, imbalance</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-backtest','sharpe-ratio')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12c2.5 0 2.5-5 5-5s2.5 8 5 8 2.5-6 5-6 3 3 3 3"/></svg></div>
      <div class="cat-card-name">Backtest &amp; Validate</div>
      <div class="cat-card-count">5 topics &middot; Sharpe, drawdown, walk-forward, Monte Carlo</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-decisions','confidence-intervals')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M7.5 12h2l1-3 2 6 1-3h3"/></svg></div>
      <div class="cat-card-name">Make Decisions</div>
      <div class="cat-card-count">5 topics &middot; CI, bootstrap, Bayesian A/B, power analysis</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-foundations','hypothesis-testing')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19c4 0 4.5-11 9-11s5 11 9 11"/><line x1="3" y1="19" x2="21" y2="19"/></svg></div>
      <div class="cat-card-name">Statistical Foundations</div>
      <div class="cat-card-count">4 topics &middot; Hypothesis tests, p-values, CLT, causation</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-analytics','eda-workflow')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16l-6 7v6l-4 2v-8z"/></svg></div>
      <div class="cat-card-name">Data Analytics</div>
      <div class="cat-card-count">4 topics &middot; EDA, groupby, cohorts, funnels</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-python','sklearn-eval')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5 7 10 12 5 17"/><line x1="12" y1="17" x2="19" y2="17"/></svg></div>
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
    <span class="topic-badge">Classification</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The foundation of classification evaluation — TP, FP, TN, FN and the metrics built on them</p>
  <p class="prose">Every classifier's performance starts here. The <strong>confusion matrix</strong> gives you four counts: true positives (TP), false positives (FP), true negatives (TN), and false negatives (FN). Every classification metric is built from these four numbers.</p>
  <div class="fb"><div class="fm">Precision = TP / (TP + FP)</div><div class="fd"><span>Precision</span> = of all predicted positives, how many were correct? High when you can't afford false alarms.</div></div>
  <div class="fb c2"><div class="fm">Recall = TP / (TP + FN)</div><div class="fd"><span>Recall</span> = of all actual positives, how many did we catch? High when you can't afford to miss cases.</div></div>
  <div class="fb c3"><div class="fm">F1 = 2 &middot; (P &middot; R) / (P + R)</div><div class="fd"><span>F1</span> = harmonic mean of precision and recall. Balanced score when both matter equally.</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust threshold, see all metrics update</div>
    <canvas id="cmCanvas" role="img" aria-label="Confusion Matrix &amp; Classification Metrics: Interactive — adjust threshold, see all metrics update" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Threshold</span><input type="range" aria-label="Threshold" id="cmThresh" min="0" max="100" step="1" value="50"><span class="vd" id="cmThreshV">0.50</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Precision vs recall is the same trade-off you see in <a href="#roc-auc">ROC curves</a> and in <a href="../markets/psychology/#fear-and-greed">market fear/greed</a> — cautious vs aggressive, and the cost of being wrong in each direction.</div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Train your model and get <code>y_pred</code> probabilities on your <strong>validation set</strong> (never train set)</li>
      <li>Plot the confusion matrix at threshold 0.5 — check if FP or FN is the bigger problem</li>
      <li>If FP is costly (spam filter, fraud alert) → optimize for <strong>precision</strong> — raise threshold</li>
      <li>If FN is costly (cancer screening, security) → optimize for <strong>recall</strong> — lower threshold</li>
      <li>Use <code>classification_report()</code> to get all metrics at once — report this in your model card</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — data leakage:</strong> If you tune the threshold on your test set, you're overfitting to it. Use a separate validation split or nested cross-validation to select the threshold, then evaluate once on the held-out test set.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <p>In production fraud detection at scale (millions of transactions/day), the precision-recall trade-off has real dollar costs:</p>
    <ul>
      <li><strong>Low precision</strong> (many false positives) → customer friction, blocked legitimate purchases, support costs ~$5-15 per case</li>
      <li><strong>Low recall</strong> (missed fraud) → direct financial loss, average $150+ per missed case</li>
      <li>Where an operating point lands — high precision, or high recall — depends on what each kind of error costs</li>
      <li>At Stripe/PayPal scale, moving the threshold by 0.01 can shift millions of dollars annually</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Any binary classification task. Always your first evaluation step. Essential for imbalanced datasets where accuracy is misleading (99% accuracy on 1% fraud rate = useless).</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Regression tasks (use MSE/MAE instead), ranking problems (use NDCG/MAP), or when you only care about ordering (use ROC-AUC instead of fixed-threshold metrics).</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" target="_blank" rel="noopener">Kaggle: Credit Card Fraud Detection (284K transactions, 492 frauds)</a>
    <a href="https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic" target="_blank" rel="noopener">UCI: Breast Cancer Wisconsin (569 samples, binary diagnosis)</a>
    <div class="ds-note">The credit card dataset is extremely imbalanced (0.17% positive) — perfect for seeing why accuracy fails and precision/recall matters.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install scikit-learn pandas matplotlib seaborn
# ────────────────────────────────────────
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

df = pd.read_csv('creditcard.csv')
X, y = df.drop('Class', axis=1), df['Class']
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y)
model = LogisticRegression(max_iter=1000).fit(X_train, y_train)
print(classification_report(y_test, y_pred=model.predict(X_test)))
ConfusionMatrixDisplay.from_estimator(model, X_test, y_test)
plt.show()</code></pre>
  </div>
  ${depthHtml('confusion-matrix')}
  <div class="topic-nav" id="nav-confusion-matrix"></div>
</div>`;
}

/* 02 — ROC & AUC Curves */
function buildROCAUC() {
  return `<div class="topic" id="roc-auc">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Evaluate Your Model</div><h2>ROC &amp; <em>AUC</em> Curves</h2></div>
    <span class="topic-badge">Classification</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Visualising model performance across all thresholds</p>
  <p class="prose">The <strong>ROC curve</strong> plots True Positive Rate vs False Positive Rate at every threshold. The <strong>AUC</strong> (area under curve) collapses this into a single number: 1.0 = perfect, 0.5 = random. It's threshold-independent, making it ideal for comparing models.</p>
  <div class="fb"><div class="fm">TPR = TP / (TP + FN) &nbsp;&nbsp; FPR = FP / (FP + TN)</div><div class="fd"><span>TPR</span> = sensitivity/recall &nbsp;|&nbsp; <span>FPR</span> = 1 &minus; specificity &nbsp;|&nbsp; plotted as (FPR, TPR)</div></div>
  <div class="fb c2"><div class="fm">AUC = &int; TPR(FPR) dFPR &isin; [0, 1]</div><div class="fd"><span>AUC</span> = probability that the model ranks a random positive higher than a random negative</div></div>
  <div class="va">
    <div class="vl">// Interactive ROC — adjust model separability</div>
    <canvas id="rocCanvas" role="img" aria-label="ROC &amp; AUC Curves: Interactive ROC — adjust model separability" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Separability</span><input type="range" aria-label="Separability" id="rocSep" min="0" max="100" step="1" value="65"><span class="vd" id="rocSepV">0.65</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> AUC measures discrimination — can the model separate classes? In <a href="../markets/indicators/#rsi">RSI</a>, you're doing the same thing: separating overbought from oversold regimes across different threshold levels.</div>
  ${depthHtml('roc-auc')}
  ${selfCheck('roc-auc')}
  <div class="topic-nav" id="nav-roc-auc"></div>
</div>`;
}

/* 03 — Regression Metrics */
function buildRegressionMetrics() {
  return `<div class="topic" id="regression-metrics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Evaluate Your Model</div><h2>Regression <em>Metrics</em></h2></div>
    <span class="topic-badge">Regression</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// MAE, RMSE, R² — which metric for which problem and what the numbers actually mean</p>
  <p class="prose">Regression metrics measure how far predictions are from truth. <strong>MAE</strong> treats every error equally, <strong>RMSE</strong> penalises big errors more, and <strong>R&sup2;</strong> tells you how much variance your model explains vs a baseline mean prediction.</p>
  <div class="fb"><div class="fm">MAE = (1/n) &middot; &Sigma; |y&#x1D62; &minus; &ycirc;&#x1D62;|</div><div class="fd"><span>MAE</span> = average absolute error. Robust to outliers, interpretable in target units.</div></div>
  <div class="fb c2"><div class="fm">RMSE = &radic;((1/n) &middot; &Sigma; (y&#x1D62; &minus; &ycirc;&#x1D62;)&sup2;)</div><div class="fd"><span>RMSE</span> = penalises large errors disproportionately. Same units as target.</div></div>
  <div class="fb c3"><div class="fm">R&sup2; = 1 &minus; SS<sub>res</sub> / SS<sub>tot</sub></div><div class="fd"><span>R&sup2;</span> = fraction of variance explained. 1 = perfect, 0 = no better than predicting the mean.</div></div>
  <div class="va">
    <div class="vl">// Interactive — drag points, see metrics update</div>
    <canvas id="regCanvas" role="img" aria-label="Regression Metrics: Interactive — drag points, see metrics update" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Noise</span><input type="range" aria-label="Noise" id="regNoise" min="0" max="100" step="1" value="30"><span class="vd" id="regNoiseV">0.30</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Choosing between MAE and RMSE is choosing how hard to punish the big misses — the same choice a <a href="../ml-math/#loss">loss function</a> makes during training, and the one you face again when <a href="../timeseries/#backtesting-forecasts">backtesting forecasts</a>. Guide: <a href="/guides/which-metric/">Which metric should I evaluate my model with?</a></div>
  ${depthHtml('regression-metrics')}
  <div class="topic-nav" id="nav-regression-metrics"></div>
</div>`;
}

/* 04 — Cross-Validation Done Right */
function buildCrossValidation() {
  return `<div class="topic" id="cross-validation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Evaluate Your Model</div><h2>Cross-Validation <em>Done Right</em></h2></div>
    <span class="topic-badge">Validation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Splitting your data honestly — k-fold, stratified, time-series split, and the leakage traps</p>
  <p class="prose"><strong>Cross-validation</strong> rotates which data is used for training and testing. <strong>K-fold</strong> splits data into k parts, trains on k&minus;1, tests on the held-out fold, and repeats. The mean score across folds is a robust estimate of generalisation.</p>
  <div class="fb"><div class="fm">CV Score = (1/k) &middot; &Sigma; Score(fold&#x1D62;)</div><div class="fd">Average <span>test score</span> across k folds. Standard deviation shows stability.</div></div>
  <div class="va">
    <div class="vl">// Interactive — k folds visualised with train/test splits</div>
    <canvas id="cvCanvas" role="img" aria-label="Cross-Validation Done Right: Interactive — k folds visualised with train/test splits" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">K folds</span><input type="range" aria-label="K folds" id="cvK" min="2" max="10" step="1" value="5"><span class="vd" id="cvKv">5</span></div>
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
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Pick your CV strategy: <strong>StratifiedKFold</strong> for classification, <strong>TimeSeriesSplit</strong> for temporal data, standard KFold for regression</li>
      <li>Wrap all preprocessing in a <code>sklearn.pipeline.Pipeline</code> — scaling, imputation, encoding must happen <em>inside</em> each fold</li>
      <li>Use <code>cross_val_score()</code> for a quick check — report <strong>mean ± std</strong> across folds</li>
      <li>For hyperparameter tuning, use <strong>nested CV</strong>: inner loop tunes (GridSearchCV), outer loop evaluates</li>
      <li>If scores vary a lot across folds, your model or data is unstable — investigate data quality or try more folds</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — overfitting to CV score:</strong> If you run CV many times with different hyperparameters and pick the best, you're overfitting to the CV folds. Use nested CV or hold out a final test set that you touch only once.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <p>CV fold count impacts both reliability and compute cost:</p>
    <ul>
      <li><strong>k=5</strong> is the standard — good bias-variance trade-off, 5x training cost</li>
      <li><strong>k=10</strong> reduces variance slightly but doubles compute vs k=5. Rarely worth it for large datasets</li>
      <li><strong>LOOCV</strong> (k=n) is nearly unbiased but has high variance and n× compute — avoid for n > 10K</li>
      <li>On very large datasets even 5-fold CV is expensive. For quick iteration, use a single holdout, then CV for the final report</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Small-to-medium datasets where every sample matters. Model comparison and selection. Hyperparameter tuning (inside nested CV). Reporting final model performance for publication.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Very large datasets (>500K samples) where a single 80/20 split gives stable estimates. Real-time/streaming data where temporal order matters — use walk-forward instead. Quick prototyping where a holdout split is sufficient.</div>
  </div>
  ${depthHtml('cross-validation')}
  ${selfCheck('cross-validation')}
  <div class="topic-nav" id="nav-cross-validation"></div>
</div>`;
}

/* 05 — Comparing Model Runs */
function buildComparingRuns() {
  return `<div class="topic" id="comparing-runs">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Evaluate Your Model</div><h2>Comparing <em>Model Runs</em></h2></div>
    <span class="topic-badge">Testing</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Is this improvement real? Statistical tests for comparing model performance across runs</p>
  <p class="prose">Model A got 0.87 F1. Model B got 0.89. Is that difference real or just noise? You need <strong>statistical tests</strong> on paired cross-validation scores to answer confidently. Without them, you're just reading tea leaves.</p>
  <div class="fb"><div class="fm">t = (&mu;<sub>A</sub> &minus; &mu;<sub>B</sub>) / SE(&mu;<sub>A</sub> &minus; &mu;<sub>B</sub>)</div><div class="fd"><span>Paired t-test</span> on k-fold scores — the simplest comparison. Assumes normality of differences.</div></div>
  <div class="fb c2"><div class="fm">McNemar: &chi;&sup2; = (b &minus; c)&sup2; / (b + c)</div><div class="fd"><span>McNemar&rsquo;s test</span> &mdash; compares errors on the same test set. b,c = discordant predictions.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two model score distributions, see p-value</div>
    <canvas id="compCanvas" role="img" aria-label="Comparing Model Runs: Interactive — two model score distributions, see p-value" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model A mean</span><input type="range" aria-label="Model A mean" id="compA" min="70" max="95" step="1" value="85"><span class="vd" id="compAv">0.85</span></div>
      <div class="cg"><span class="cl">Model B mean</span><input type="range" aria-label="Model B mean" id="compB" min="70" max="95" step="1" value="88"><span class="vd" id="compBv">0.88</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Two runs differ by 0.4 points: signal or seed? <a href="../mlops/#experiment-tracking">Experiment tracking</a> keeps the runs to compare, and traders ask the same of two strategies through <a href="../markets/risk/#risk-adjusted-perf">risk-adjusted performance</a>.</div>
  ${depthHtml('comparing-runs')}
  <div class="topic-nav" id="nav-comparing-runs"></div>
</div>`;
}

/* 06 — Learning Curves & Overfitting */
function buildLearningCurves() {
  return `<div class="topic" id="learning-curves">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Evaluate Your Model</div><h2>Learning Curves &amp; <em>Overfitting</em></h2></div>
    <span class="topic-badge">Diagnostics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Training vs validation curves — reading the gap to diagnose models</p>
  <p class="prose">A <strong>learning curve</strong> plots training and validation scores as data increases. The <strong>gap</strong> between them tells you everything: large gap = overfitting, both low = underfitting, converging = sweet spot. It also tells you if more data would help.</p>
  <div class="fb"><div class="fm">Gap = Score<sub>train</sub> &minus; Score<sub>val</sub></div><div class="fd"><span>Large gap</span> = overfitting (model memorises) &nbsp;|&nbsp; <span>Both low</span> = underfitting (model too simple)</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust complexity, see the gap</div>
    <canvas id="lcCanvas" role="img" aria-label="Learning Curves &amp; Overfitting: Interactive — adjust complexity, see the gap" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model complexity</span><input type="range" aria-label="Model complexity" id="lcComp" min="1" max="100" step="1" value="50"><span class="vd" id="lcCompV">50</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The learning curve gap is the visual form of the <a href="../ml-math/#bias-variance">bias-variance tradeoff</a>. The same tension appears in <a href="#walk-forward">walk-forward backtesting</a> — overfitting to past market conditions. Guide: <a href="/guides/not-generalising/">Why is my model not generalising?</a></div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Plot learning curves <strong>early</strong> in your project — before spending time on feature engineering</li>
      <li><strong>Large gap</strong> (overfit) → try regularization, dropout, less complex model, or more data</li>
      <li><strong>Both scores low</strong> (underfit) → try more features, more complex model, or feature engineering</li>
      <li><strong>Curves converging but slowly</strong> → more data will help — go collect it</li>
      <li><strong>Curves flat and apart</strong> → more data won't help — simplify the model instead</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — early stopping too early:</strong> If your validation curve is still improving, you're stopping before convergence. If your training curve keeps rising while validation drops, you've gone past the sweet spot. Use a patience parameter (e.g. 10 epochs with no improvement) to find the right moment.</div>
  </div>
  <div class="playground">
    <div class="playground-title">Experiment — diagnose the learning curve</div>
    <div class="pg-controls">
      <label>Model complexity <input type="range" id="lcComplexity" min="1" max="10" step="1" value="5" oninput="updateLCPlayground()"><span class="pg-val" id="lcComplexV">5</span></label>
      <label>Training size <input type="range" id="lcSize" min="50" max="1000" step="50" value="200" oninput="updateLCPlayground()"><span class="pg-val" id="lcSizeV">200</span></label>
      <label>Noise level <input type="range" id="lcNoise" min="1" max="10" step="1" value="3" oninput="updateLCPlayground()"><span class="pg-val" id="lcNoiseV">3</span></label>
    </div>
    <div class="pg-output" id="lcPlayground">
      <strong>Diagnosis:</strong> Adjust the sliders to see how model complexity, data size, and noise affect the learning curve gap.<br>
      <span id="lcDiagnosis">→ Balanced setup — moderate gap between train and val scores</span>
    </div>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> You need to decide between getting more data vs. improving the model. Diagnosing overfitting vs underfitting. Justifying compute budget — will more training help? Before deploying to production as a sanity check.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You're doing a quick prototype where directional results are enough. Using pre-trained models where the learning dynamics are already well-studied. The dataset is fixed and you can't get more data anyway.</div>
  </div>
  ${depthHtml('learning-curves')}
  <div class="topic-nav" id="nav-learning-curves"></div>
</div>`;
}

/* 07 — SHAP Values */
function buildSHAPValues() {
  return `<div class="topic" id="shap-values">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Understand Your Features</div><h2>SHAP <em>Values</em></h2></div>
    <span class="topic-badge">Explainability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Game-theoretic feature attribution — understand exactly why your model made each prediction</p>
  <p class="prose"><strong>SHAP</strong> (SHapley Additive exPlanations) assigns each feature a contribution to each prediction. Based on Shapley values from cooperative game theory, SHAP is the only method with mathematical guarantees: consistency, local accuracy, and missingness.</p>
  <div class="fb"><div class="fm">&phi;&#x1D62; = &Sigma;<sub>S</sub> |S|!(M&minus;|S|&minus;1)!/M! &middot; [f(S&cup;{i}) &minus; f(S)]</div><div class="fd"><span>&phi;&#x1D62;</span> = SHAP value for feature i &nbsp;|&nbsp; averaged marginal contribution across all coalitions</div></div>
  <div class="fb c2"><div class="fm">f(x) = E[f(X)] + &Sigma; &phi;&#x1D62;</div><div class="fd">Prediction = base value + sum of all SHAP values. <span>Additive:</span> contributions always sum to prediction.</div></div>
  <div class="va">
    <div class="vl">// Interactive — feature contributions to a prediction</div>
    <canvas id="shapCanvas" role="img" aria-label="SHAP Values: Interactive — feature contributions to a prediction" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Feature count</span><input type="range" aria-label="Feature count" id="shapN" min="3" max="10" step="1" value="6"><span class="vd" id="shapNv">6</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> SHAP reveals which features drive a prediction. In markets, <a href="../markets/indicators/#obv">volume analysis</a> asks the same question — which factors are driving price? Decomposing into contributions is a universal pattern. The tooling — explainers and plots — is in the <a href="#shap-library">SHAP library</a> topic.</div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Train your model first — SHAP explains a <em>trained</em> model, it doesn't improve it</li>
      <li>Use <code>shap.plots.waterfall()</code> to explain <strong>individual predictions</strong> (e.g. "why was this loan denied?")</li>
      <li>Use <code>shap.plots.beeswarm()</code> for <strong>global feature importance</strong> — which features matter most overall</li>
      <li>Check for <strong>feature interactions</strong> with <code>shap.plots.scatter()</code> — colored by another feature</li>
      <li>Compare SHAP with <a href="#permutation-importance">permutation importance</a> — if they disagree, you likely have correlated features</li>
    </ol>
    <div class="howto-pitfall"><strong>When SHAP misleads:</strong> SHAP assumes feature independence when computing marginal contributions. With highly correlated features (e.g. height and weight), SHAP may distribute credit unevenly. Always check the correlation matrix first. For critical decisions, combine SHAP with domain knowledge.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <p>SHAP compute cost varies dramatically by explainer type:</p>
    <ul>
      <li><strong>TreeExplainer</strong>: O(TLD²) per prediction — fast, handles 100K samples in seconds for XGBoost/LightGBM</li>
      <li><strong>KernelExplainer</strong>: O(2^M) where M=features — exponential. With 50 features, use background subsampling (100-200 samples) or wait hours</li>
      <li><strong>Production tip:</strong> Pre-compute SHAP for common feature ranges and cache them. Real-time SHAP on every API call is expensive — batch process nightly</li>
      <li>EU AI Act and US lending regulations increasingly require explainability — SHAP is widely used for this</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Regulatory compliance requires explanations (finance, healthcare). Debugging model behavior on specific predictions. Stakeholder communication about model decisions. Feature selection guided by contribution analysis.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Prototyping where speed matters more than explanation. Linear models where coefficients already tell the story. Very high-dimensional data (1000+ features) — use permutation importance first to narrow down, then SHAP on the top features.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/uciml/default-of-credit-card-clients-dataset" target="_blank" rel="noopener">Kaggle: Credit Card Default (30K clients, explain why predictions differ)</a>
    <a href="https://www.kaggle.com/c/home-credit-default-risk/data" target="_blank" rel="noopener">Kaggle: Home Credit Default Risk (300K loans, real feature interactions)</a>
    <div class="ds-note">Train any tree model, then run SHAP — you'll immediately see which features the model relies on most. Compare waterfall plots for approved vs denied loans.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install shap xgboost pandas matplotlib
# ────────────────────────────────────────
import shap, xgboost, pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv('your_data.csv')
X_train, X_test, y_train, y_test = train_test_split(df.drop('target',1), df['target'])
model = xgboost.XGBClassifier().fit(X_train, y_train)

explainer = shap.TreeExplainer(model)
sv = explainer(X_test)
shap.plots.beeswarm(sv)           # global importance
shap.plots.waterfall(sv[0])       # explain one prediction</code></pre>
  </div>
  ${depthHtml('shap-values')}
  <div class="topic-nav" id="nav-shap-values"></div>
</div>`;
}

/* 08 — Permutation Importance */
function buildPermutationImportance() {
  return `<div class="topic" id="permutation-importance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Understand Your Features</div><h2>Permutation <em>Importance</em></h2></div>
    <span class="topic-badge">Features</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Shuffle a feature, measure the damage — a model-agnostic way to rank feature importance</p>
  <p class="prose"><strong>Permutation importance</strong> randomly shuffles one feature at a time and measures how much the model's score drops. Big drop = important feature. It works with <em>any</em> model and requires no retraining.</p>
  <div class="fb"><div class="fm">PI&#x1D62; = Score<sub>original</sub> &minus; Score<sub>shuffled(i)</sub></div><div class="fd"><span>PI</span> = importance of feature i. Higher = more important. Negative = feature hurts the model.</div></div>
  <div class="va">
    <div class="vl">// Interactive — shuffle features, see score drop</div>
    <canvas id="piCanvas" role="img" aria-label="Permutation Importance: Interactive — shuffle features, see score drop" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Features</span><input type="range" aria-label="Features" id="piN" min="3" max="8" step="1" value="5"><span class="vd" id="piNv">5</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Shuffle an input and see if anything breaks — a controlled experiment that also tests a trading signal in <a href="../markets/risk/#alpha-generation">alpha research</a>. Importances that shift over time are an early warning in <a href="../mlops/#model-monitoring">model monitoring</a>.</div>
  ${depthHtml('permutation-importance')}
  <div class="topic-nav" id="nav-permutation-importance"></div>
</div>`;
}

/* 09 — Partial Dependence & ICE */
function buildPDPICE() {
  return `<div class="topic" id="pdp-ice">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Understand Your Features</div><h2>Partial Dependence &amp; <em>ICE</em></h2></div>
    <span class="topic-badge">Explainability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How does changing one feature affect predictions? PDP shows the average, ICE shows every instance</p>
  <p class="prose"><strong>Partial Dependence Plots (PDP)</strong> show the average effect of one feature on predictions, marginalising over all other features. <strong>ICE plots</strong> show the same for each individual instance — revealing heterogeneity the average hides.</p>
  <div class="fb"><div class="fm">PD(x<sub>s</sub>) = (1/n) &middot; &Sigma; f(x<sub>s</sub>, x<sub>c</sub><sup>(i)</sup>)</div><div class="fd"><span>PD</span> = average prediction when feature s is fixed at x<sub>s</sub>, averaging over all other features.</div></div>
  <div class="va">
    <div class="vl">// Interactive — PDP line with individual ICE curves</div>
    <canvas id="pdpCanvas" role="img" aria-label="Partial Dependence &amp; ICE: Interactive — PDP line with individual ICE curves" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Show ICE</span><button class="btn" id="pdpIce" onclick="toggleICE()">ICE ON</button></div>
      <div class="cg"><span class="cl">Instances</span><input type="range" aria-label="Instances" id="pdpN" min="5" max="50" step="5" value="20"><span class="vd" id="pdpNv">20</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> A partial-dependence average can hide individual curves pointing the other way — the same trap as <a href="../essays/#essay-simpson">Simpson’s paradox</a>. A signal that works on average can likewise fail in exactly the regimes that matter, as <a href="../markets/risk/#correlation-risk">correlation risk</a> shows.</div>
  ${depthHtml('pdp-ice')}
  <div class="topic-nav" id="nav-pdp-ice"></div>
</div>`;
}

/* 10 — Feature Correlation & Multicollinearity */
function buildFeatureCorrelation() {
  return `<div class="topic" id="feature-correlation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Understand Your Features</div><h2>Feature Correlation &amp; <em>Multicollinearity</em></h2></div>
    <span class="topic-badge">Features</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Spotting redundant features — correlation heatmaps, VIF, and deciding what to drop</p>
  <p class="prose">Highly correlated features are redundant — they inflate coefficient variance in linear models and confuse importance measures. <strong>VIF</strong> (Variance Inflation Factor) quantifies how much each feature's coefficient variance is inflated by correlation with others.</p>
  <div class="fb"><div class="fm">VIF&#x1D62; = 1 / (1 &minus; R&#x1D62;&sup2;)</div><div class="fd"><span>VIF</span> = 1 means no collinearity &nbsp;|&nbsp; &gt;5 is concerning &nbsp;|&nbsp; &gt;10 is severe. R&#x1D62;&sup2; from regressing feature i on all others.</div></div>
  <div class="va">
    <div class="vl">// Interactive correlation heatmap</div>
    <canvas id="corrCanvas" role="img" aria-label="Feature Correlation &amp; Multicollinearity: Interactive correlation heatmap" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Features</span><input type="range" aria-label="Features" id="corrN" min="3" max="8" step="1" value="6"><span class="vd" id="corrNv">6</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Correlated features split the credit, so neither looks important alone. Portfolios have the same problem: assets that move together give less <a href="../markets/risk/#diversification">diversification</a> than their count suggests, and <a href="../markets/risk/#correlation-risk">correlations rise in a crisis</a>.</div>
  ${depthHtml('feature-correlation')}
  <div class="topic-nav" id="nav-feature-correlation"></div>
</div>`;
}

/* 11 — Information Gain & Mutual Information */
function buildInformationGain() {
  return `<div class="topic" id="information-gain">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Understand Your Features</div><h2>Information Gain &amp; <em>Mutual Information</em></h2></div>
    <span class="topic-badge">Information Theory</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Beyond linear correlation — information-theoretic measures that capture any kind of dependency</p>
  <p class="prose"><strong>Mutual information</strong> measures how much knowing one variable reduces uncertainty about another — capturing <em>any</em> dependency (linear, nonlinear, categorical). Unlike correlation, it detects complex relationships that Pearson's r misses entirely.</p>
  <div class="fb"><div class="fm">I(X;Y) = &Sigma; p(x,y) &middot; log(p(x,y) / (p(x)&middot;p(y)))</div><div class="fd"><span>MI</span> = 0 means independent &nbsp;|&nbsp; Higher = more dependency. Always &ge; 0, unbounded above.</div></div>
  <div class="fb c2"><div class="fm">IG(Y|X) = H(Y) &minus; H(Y|X)</div><div class="fd"><span>Information Gain</span> = entropy before &minus; entropy after splitting. Used in decision trees.</div></div>
  <div class="va">
    <div class="vl">// Interactive — see MI vs correlation for different relationships</div>
    <canvas id="miCanvas" role="img" aria-label="Information Gain &amp; Mutual Information: Interactive — see MI vs correlation for different relationships" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Information gain is how decision trees choose splits. <a href="../ml-math/#entropy">Entropy</a> from the ML Math collection is the foundation. In markets, high mutual information between an indicator and future returns would mean that indicator has real predictive value.</div>
  ${depthHtml('information-gain')}
  <div class="topic-nav" id="nav-information-gain"></div>
</div>`;
}

/* 12 — Distribution Shape */
function buildDistributionShape() {
  return `<div class="topic" id="distribution-shape">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Analyze Your Data</div><h2>Distribution <em>Shape</em></h2></div>
    <span class="topic-badge">Data Analysis</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Skewness, kurtosis, QQ plots — is your data normal, and does it matter?</p>
  <p class="prose">Before modelling, know your data's shape. <strong>Skewness</strong> measures asymmetry (are the tails lopsided?), <strong>kurtosis</strong> measures tail heaviness (how many extreme values?), and <strong>QQ plots</strong> show deviations from normality at a glance.</p>
  <div class="fb"><div class="fm">Skew = E[(X&minus;&mu;)&sup3;] / &sigma;&sup3;</div><div class="fd"><span>Skew</span> = 0 is symmetric &nbsp;|&nbsp; &gt;0 right tail &nbsp;|&nbsp; &lt;0 left tail</div></div>
  <div class="fb c2"><div class="fm">Kurt = E[(X&minus;&mu;)⁴] / &sigma;⁴ &minus; 3</div><div class="fd"><span>Excess kurtosis</span> = 0 is normal &nbsp;|&nbsp; &gt;0 heavy tails &nbsp;|&nbsp; &lt;0 light tails</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust skew and kurtosis</div>
    <canvas id="distCanvas" role="img" aria-label="Distribution Shape: Interactive — adjust skew and kurtosis" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Skewness</span><input type="range" aria-label="Skewness" id="distSkew" min="-30" max="30" step="1" value="0"><span class="vd" id="distSkewV">0.0</span></div>
      <div class="cg"><span class="cl">Tail weight</span><input type="range" aria-label="Tail weight" id="distKurt" min="0" max="100" step="1" value="30"><span class="vd" id="distKurtV">3.0</span></div>
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
  <div class="callout"><strong>When it matters:</strong> Linear regression’s tests and intervals assume roughly normal residuals (the fit itself does not). Many tests assume normality. Log-transform right-skewed data. Market returns have heavy tails (excess kurtosis) — never assume normal.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Fat tails are why risk models that assume a bell curve underestimate the bad days — see <a href="../markets/risk/#tail-risk">tail risk</a> and <a href="../markets/risk/#expected-shortfall">expected shortfall</a>, which looks at how bad the worst cases are rather than just where they start.</div>
  ${depthHtml('distribution-shape')}
  <div class="topic-nav" id="nav-distribution-shape"></div>
</div>`;
}

/* 13 — Outlier Detection */
function buildOutlierDetection() {
  return `<div class="topic" id="outlier-detection">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Analyze Your Data</div><h2>Outlier <em>Detection</em></h2></div>
    <span class="topic-badge">Data Analysis</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// IQR, Z-score, Isolation Forest — finding extreme values and knowing when they're the signal</p>
  <p class="prose">Outliers can be errors to fix or signal to keep. <strong>Z-score</strong> flags points far from the mean, <strong>IQR</strong> is robust to skew, and <strong>Isolation Forest</strong> catches complex multi-dimensional outliers that univariate methods miss.</p>
  <div class="fb"><div class="fm">IQR method: outlier if x &lt; Q1 &minus; 1.5&middot;IQR or x &gt; Q3 + 1.5&middot;IQR</div><div class="fd"><span>IQR</span> = Q3 &minus; Q1 (interquartile range). Robust to skewed distributions.</div></div>
  <div class="fb c2"><div class="fm">Z = (x &minus; &mu;) / &sigma; &nbsp;&nbsp; outlier if |Z| &gt; 3</div><div class="fd"><span>Z-score</span> = standard deviations from mean. Assumes roughly normal data.</div></div>
  <div class="va">
    <div class="vl">// Interactive — scattered points with outlier detection zones</div>
    <canvas id="outCanvas" role="img" aria-label="Outlier Detection: Interactive — scattered points with outlier detection zones" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> In markets, outliers are <a href="../markets/risk/#tail-risk">black swan events</a> — the crash days that break every model. In fraud detection, the outliers <em>are</em> the target. Context decides whether to remove or study them.</div>
  ${depthHtml('outlier-detection')}
  <div class="topic-nav" id="nav-outlier-detection"></div>
</div>`;
}

/* 14 — Missing Data Strategies */
function buildMissingData() {
  return `<div class="topic" id="missing-data">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Analyze Your Data</div><h2>Missing Data <em>Strategies</em></h2></div>
    <span class="topic-badge">Data Quality</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Imputation, MICE, missingness patterns — handling gaps without corrupting your analysis</p>
  <p class="prose">Missing data isn't just annoying — <em>why</em> it's missing matters. <strong>MCAR</strong> (completely random) is safe to drop. <strong>MAR</strong> (depends on observed data) needs smart imputation. <strong>MNAR</strong> (depends on the missing value itself) is the hardest case.</p>
  <div class="fb"><div class="fm">MCAR: P(missing) = constant</div><div class="fd">Missing <span>completely at random</span>. Dropping rows is unbiased but wasteful.</div></div>
  <div class="fb c2"><div class="fm">MAR: P(missing | observed) &ne; P(missing)</div><div class="fd">Missing <span>at random</span> given observed data. Use MICE, KNN imputation.</div></div>
  <div class="va">
    <div class="vl">// Interactive — missing data patterns and imputation</div>
    <canvas id="missCanvas" role="img" aria-label="Missing Data Strategies: Interactive — missing data patterns and imputation" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">% Missing</span><input type="range" aria-label="% Missing" id="missPct" min="5" max="50" step="5" value="20"><span class="vd" id="missPctV">20%</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Gaps are rarely random: a missing price can mean a halted stock, a missing reading a failed sensor. Handling them is part of <a href="../mlops/#data-quality">data quality</a> in production and of <a href="../timeseries/#resampling">resampling</a> irregular time series.</div>
  ${depthHtml('missing-data')}
  <div class="topic-nav" id="nav-missing-data"></div>
</div>`;
}

/* 15 — Data Drift & Distribution Shift */
function buildDataDrift() {
  return `<div class="topic" id="data-drift">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Analyze Your Data</div><h2>Data Drift &amp; <em>Distribution Shift</em></h2></div>
    <span class="topic-badge">Monitoring</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Is your model still valid? PSI, KS test, and detecting when the world has changed</p>
  <p class="prose">Models decay when the data distribution shifts. <strong>PSI</strong> (Population Stability Index) detects changes in feature distributions. The <strong>KS test</strong> checks if two samples came from the same distribution. Monitor these to know when to retrain.</p>
  <div class="fb"><div class="fm">PSI = &Sigma; (p&#x1D62; &minus; q&#x1D62;) &middot; ln(p&#x1D62; / q&#x1D62;)</div><div class="fd"><span>PSI</span> &lt; 0.1 = no drift &nbsp;|&nbsp; 0.1&ndash;0.25 = moderate &nbsp;|&nbsp; &gt;0.25 = significant shift</div></div>
  <div class="fb c2"><div class="fm">KS = max|F<sub>ref</sub>(x) &minus; F<sub>new</sub>(x)|</div><div class="fd"><span>Kolmogorov-Smirnov</span> = maximum distance between two CDFs. p &lt; 0.05 → distributions differ.</div></div>
  <div class="va">
    <div class="vl">// Interactive — reference vs new distribution with drift</div>
    <canvas id="driftCanvas" role="img" aria-label="Data Drift &amp; Distribution Shift: Interactive — reference vs new distribution with drift" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Drift amount</span><input type="range" aria-label="Drift amount" id="driftAmt" min="0" max="100" step="1" value="0"><span class="vd" id="driftAmtV">0.0</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Data drift in ML mirrors <a href="../timeseries/#changepoint-detection">regime changes</a> in markets. Both signal that the rules have changed — past patterns no longer predict the future.</div>
  <div class="howto">
    <div class="howto-title">Real-world pipeline: monitoring for drift</div>
    <ol>
      <li><strong>Baseline:</strong> Save reference distributions from your training data (histograms, quantiles per feature)</li>
      <li><strong>Schedule:</strong> Run PSI or KS test on each feature weekly (or per batch in streaming)</li>
      <li><strong>Alert thresholds:</strong> PSI &gt; 0.1 = moderate drift, PSI &gt; 0.25 = significant — trigger investigation</li>
      <li><strong>Investigate:</strong> Check if drift is in inputs (covariate shift) or in the target (concept drift)</li>
      <li><strong>Retrain or adapt:</strong> If performance has degraded, retrain on recent data. For gradual drift, use a sliding training window</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — feature drift ≠ model decay:</strong> A feature's distribution can shift without affecting model performance (if it's a low-importance feature). Always cross-check drift detection with actual model metrics on labelled data.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Platforms such as Uber’s Michelangelo track feature and prediction distributions for every deployed model, and alert or retrain when they shift</li>
      <li>COVID-19 shifted income, spending and employment features at once, and many credit and demand models degraded within weeks — drift can be sudden and hit every feature together</li>
      <li>Gradual (seasonal) drift is normal — build it into the retraining schedule. Sudden drift (a pandemic, a regulatory change) needs an immediate response</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Any production ML model. The longer a model runs without monitoring, the more likely it has silently degraded. Especially critical for high-stakes decisions (lending, healthcare, fraud).</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> One-off analyses where the model won't be reused. Static datasets that never change (benchmark competitions). Models retrained on every batch already (online learning).</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" target="_blank" rel="noopener">Kaggle: Credit Card Fraud — split by time to simulate temporal drift</a>
    <div class="ds-note">Split the dataset at the midpoint (Time column). Compute PSI between first-half and second-half feature distributions — you'll see real drift in V1-V28.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install scipy pandas numpy
import numpy as np
from scipy.stats import ks_2samp

def psi(ref, new, bins=10):
    edges = np.histogram_bin_edges(ref, bins=bins)
    p = np.histogram(ref, bins=edges)[0] / len(ref) + 1e-6
    q = np.histogram(new, bins=edges)[0] / len(new) + 1e-6
    return np.sum((p - q) * np.log(p / q))

feature = 'V14'
ref = train_df[feature].dropna().to_numpy()
new = production_df[feature].dropna().to_numpy()
ks_stat, p_value = ks_2samp(ref, new)
print({'psi': psi(ref, new), 'ks': ks_stat, 'p_value': p_value})</code></pre>
  </div>
  ${depthHtml('data-drift')}
  <div class="topic-nav" id="nav-data-drift"></div>
</div>`;
}

/* 16 — Sampling & Class Imbalance */
function buildClassImbalance() {
  return `<div class="topic" id="class-imbalance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Analyze Your Data</div><h2>Sampling &amp; <em>Class Imbalance</em></h2></div>
    <span class="topic-badge">Data Prep</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// SMOTE, undersampling, class weights — strategies when your classes are nowhere near 50/50</p>
  <p class="prose">Fraud detection: 0.1% positive. Disease screening: 2% positive. With severe class imbalance, a model that predicts "no" always gets 99%+ accuracy while being useless. You need <strong>resampling</strong> or <strong>cost-sensitive learning</strong>.</p>
  <div class="fb"><div class="fm">SMOTE: x<sub>new</sub> = x&#x1D62; + &lambda; &middot; (x<sub>nn</sub> &minus; x&#x1D62;)</div><div class="fd"><span>SMOTE</span> creates synthetic minority samples by interpolating between a sample and its nearest neighbour.</div></div>
  <div class="va">
    <div class="vl">// Interactive — class ratio and resampling effect</div>
    <canvas id="imbCanvas" role="img" aria-label="Sampling &amp; Class Imbalance: Interactive — class ratio and resampling effect" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Imbalance ratio</span><input type="range" aria-label="Imbalance ratio" id="imbRatio" min="1" max="50" step="1" value="10"><span class="vd" id="imbRatioV">1:10</span></div>
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
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li><code>class_weight='balanced'</code> is a cheap first try: no extra data, and supported by most scikit-learn models</li>
      <li>Oversampling (SMOTE and kin) usually trades precision for recall and distorts predicted probabilities; for risk scores it can do more harm than good (van den Goorbergh et al. 2022)</li>
      <li>At extreme ratios (1:10,000 and beyond) consider treating the problem as anomaly detection rather than classification</li>
      <li>Often the simplest fix is to choose the decision threshold from the cost of each error (see the worked example)</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Your minority class is < 10% of data. Your model's recall on the minority class is poor. You're working in fraud, disease detection, churn prediction, or any domain with naturally rare events.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Classes are roughly balanced (30-70% split). You have enough minority samples (>5K). You're using models that handle imbalance natively (like focal loss in neural nets).</div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rare events are the usual case in practice — fraud, failures and crashes are all minority classes. The same imbalance shapes <a href="../timeseries/#anomaly-detection">anomaly detection</a> and is why <a href="../markets/risk/#tail-risk">tail risk</a> is so hard to estimate from history.</div>
  ${depthHtml('class-imbalance')}
  ${selfCheck('class-imbalance')}
  <div class="topic-nav" id="nav-class-imbalance"></div>
</div>`;
}

/* 17 — Sharpe Ratio & Risk-Adjusted Returns */
function buildSharpeRatio() {
  return `<div class="topic" id="sharpe-ratio">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Backtest &amp; Validate</div><h2>Sharpe Ratio &amp; <em>Risk-Adjusted Returns</em></h2></div>
    <span class="topic-badge">Performance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Interpreting Sharpe, Sortino, Calmar — return per unit of risk</p>
  <p class="prose">Raw returns are meaningless without risk context. The <strong>Sharpe ratio</strong> measures excess return per unit of <em>total</em> volatility. <strong>Sortino</strong> only penalises downside volatility. <strong>Calmar</strong> divides return by maximum drawdown — the worst-case measure.</p>
  <div class="fb"><div class="fm">Sharpe = (R<sub>p</sub> &minus; R<sub>f</sub>) / &sigma;<sub>p</sub></div><div class="fd"><span>Sharpe</span> = annualised excess return / annualised std dev. &gt;1 is good, &gt;2 is excellent.</div></div>
  <div class="fb c2"><div class="fm">Sortino = (R<sub>p</sub> &minus; R<sub>f</sub>) / &sigma;<sub>downside</sub></div><div class="fd"><span>Sortino</span> = only penalises negative volatility. Better for asymmetric return distributions.</div></div>
  <div class="fb c3"><div class="fm">Calmar = R<sub>annual</sub> / |MaxDrawdown|</div><div class="fd"><span>Calmar</span> = return divided by worst-case loss. Sensitive to tail risk.</div></div>
  <div class="va">
    <div class="vl">// Interactive — adjust return and volatility, see ratios</div>
    <canvas id="sharpeCanvas" role="img" aria-label="Sharpe Ratio &amp; Risk-Adjusted Returns: Interactive — adjust return and volatility, see ratios" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Return %</span><input type="range" aria-label="Return %" id="sharpeRet" min="0" max="40" step="1" value="12"><span class="vd" id="sharpeRetV">12%</span></div>
      <div class="cg"><span class="cl">Volatility %</span><input type="range" aria-label="Volatility %" id="sharpeVol" min="5" max="40" step="1" value="15"><span class="vd" id="sharpeVolV">15%</span></div>
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
  ${depthHtml('sharpe-ratio')}
  <div class="topic-nav" id="nav-sharpe-ratio"></div>
</div>`;
}

/* 18 — Maximum Drawdown & Recovery */
function buildMaxDrawdown() {
  return `<div class="topic" id="max-drawdown">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Backtest &amp; Validate</div><h2>Maximum Drawdown &amp; <em>Recovery</em></h2></div>
    <span class="topic-badge">Risk</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring worst-case loss from peak — depth, duration, and recovery time</p>
  <p class="prose"><strong>Maximum drawdown</strong> is the largest peak-to-trough decline in portfolio value. It answers the question every investor asks: "How bad can it get?" <strong>Recovery time</strong> — how long to reach a new high — is equally important.</p>
  <div class="fb"><div class="fm">DD(t) = (Peak(t) &minus; Value(t)) / Peak(t)</div><div class="fd"><span>Drawdown</span> at time t. <span>Max Drawdown</span> = max over all t. Expressed as percentage.</div></div>
  <div class="va">
    <div class="vl">// Interactive equity curve with drawdown shading</div>
    <canvas id="ddCanvas" role="img" aria-label="Maximum Drawdown &amp; Recovery: Interactive equity curve with drawdown shading" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Volatility</span><input type="range" aria-label="Volatility" id="ddVol" min="5" max="50" step="1" value="20"><span class="vd" id="ddVolV">20%</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drawdown measures the path, not just the endpoint, and recovery is harder than the fall: a 50% loss needs a 100% gain. That arithmetic drives <a href="../markets/risk/#drawdown-analysis">drawdown analysis</a> and <a href="../markets/risk/#stop-losses">stop-loss rules</a>.</div>
  ${depthHtml('max-drawdown')}
  <div class="topic-nav" id="nav-max-drawdown"></div>
</div>`;
}

/* 19 — Walk-Forward Validation */
function buildWalkForward() {
  return `<div class="topic" id="walk-forward">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Backtest &amp; Validate</div><h2>Walk-Forward <em>Validation</em></h2></div>
    <span class="topic-badge">Backtesting</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Rolling window backtesting — the right way to validate strategies on time-ordered data</p>
  <p class="prose"><strong>Walk-forward</strong> slides a training window through time, always testing on the next unseen period. It simulates real deployment: train on the past, predict the future. <strong>Anchored</strong> mode grows the training window. <strong>Rolling</strong> keeps it fixed.</p>
  <div class="fb"><div class="fm">Train: [t&minus;W, t] &rarr; Test: [t+1, t+S]</div><div class="fd"><span>W</span> = training window &nbsp;|&nbsp; <span>S</span> = test step &nbsp;|&nbsp; then slide forward by S and repeat.</div></div>
  <div class="va">
    <div class="vl">// Interactive — rolling vs anchored walk-forward</div>
    <canvas id="wfCanvas" role="img" aria-label="Walk-Forward Validation: Interactive — rolling vs anchored walk-forward" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Window size</span><input type="range" aria-label="Window size" id="wfWin" min="3" max="15" step="1" value="8"><span class="vd" id="wfWinV">8</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Walk-forward validation is <a href="#cross-validation">cross-validation</a> adapted for time. The same "never test on training data" principle, but respecting temporal order — critical in both ML deployment and <a href="../markets/charts/#trendlines">market trend analysis</a>. Guide: <a href="/guides/honest-backtest/">Is my backtest honest?</a></div>
  <div class="howto">
    <div class="howto-title">Real-world pipeline: backtesting a strategy</div>
    <ol>
      <li><strong>Define windows:</strong> Train on 2 years, test on next 3 months, slide forward by 3 months</li>
      <li><strong>Feature engineering inside each fold</strong> — never compute indicators on future data</li>
      <li><strong>Track per-window metrics:</strong> Sharpe, drawdown, hit rate — look for consistency, not just the average</li>
      <li><strong>Compare to benchmark:</strong> Does your model beat buy-and-hold in each window, or just on average?</li>
      <li><strong>Stress test:</strong> Include windows with crashes (2008, 2020, 2022) — how does the model perform under stress?</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — look-ahead bias:</strong> Using indicators like 52-week high/low that peek into the future of your test window. Also: survivorship bias — backtesting on today's S&P 500 ignores all the companies that went bankrupt. Use point-in-time datasets.</div>
  </div>
  ${depthHtml('walk-forward')}
  ${selfCheck('walk-forward')}
  <div class="topic-nav" id="nav-walk-forward"></div>
</div>`;
}

/* 20 — Monte Carlo Simulation */
function buildMonteCarlo() {
  return `<div class="topic" id="monte-carlo">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Backtest &amp; Validate</div><h2>Monte Carlo <em>Simulation</em></h2></div>
    <span class="topic-badge">Simulation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Simulating thousands of paths — confidence bands on strategy performance</p>
  <p class="prose"><strong>Monte Carlo</strong> generates thousands of possible equity paths by resampling or simulating returns. Instead of one backtest (which is one path through history), you get a <em>distribution</em> of outcomes. The 5th percentile shows your realistic worst case.</p>
  <div class="fb"><div class="fm">Path&#x1D62;(t) = &Pi;<sub>d=1</sub><sup>t</sup> (1 + r<sub>d</sub><sup>(i)</sup>)</div><div class="fd">Each path is a product of randomly sampled daily returns. <span>N paths</span> give a fan of possible outcomes.</div></div>
  <div class="va">
    <div class="vl">// Interactive — simulated equity paths with confidence bands</div>
    <canvas id="mcCanvas" role="img" aria-label="Monte Carlo Simulation: Interactive — simulated equity paths with confidence bands" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Paths</span><input type="range" aria-label="Paths" id="mcPaths" min="10" max="500" step="10" value="100"><span class="vd" id="mcPathsV">100</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Each simulated path is a <a href="../essays/#essay-walk">random walk</a>; thousands of them turn one backtest into a distribution of outcomes. The same simulation gives <a href="../markets/risk/#value-at-risk">value at risk</a> its Monte Carlo variant.</div>
  ${depthHtml('monte-carlo')}
  <div class="topic-nav" id="nav-monte-carlo"></div>
</div>`;
}

/* 21 — Survivorship & Look-Ahead Bias */
function buildSurvivorshipBias() {
  return `<div class="topic" id="survivorship-bias">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Backtest &amp; Validate</div><h2>Survivorship &amp; <em>Look-Ahead Bias</em></h2></div>
    <span class="topic-badge">Bias</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The silent traps that make your backtest a fantasy</p>
  <p class="prose"><strong>Survivorship bias</strong>: testing only on stocks that still exist today (ignoring delisted failures). <strong>Look-ahead bias</strong>: using data that wasn't available at the time of the decision. Both make backtests look better than reality.</p>
  <div class="fb"><div class="fm">Survivorship: Universe(t) &ne; Universe(today)</div><div class="fd">Hundreds of the S&amp;P 500’s 2005 members are no longer in it — acquired, shrunk or bankrupt; a backtest on today’s members silently drops them.</div></div>
  <div class="fb c2"><div class="fm">Look-ahead: f(t) must use only data from [0, t]</div><div class="fd">Earnings announced on day t+3 can't inform a decision on day t, even if your database has it.</div></div>
  <div class="va">
    <div class="vl">// Interactive — survivorship bias impact on backtest returns</div>
    <canvas id="survCanvas" role="img" aria-label="Survivorship &amp; Look-Ahead Bias: Interactive — survivorship bias impact on backtest returns" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Delisted %</span><input type="range" aria-label="Delisted %" id="survDel" min="0" max="40" step="1" value="15"><span class="vd" id="survDelV">15%</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Backtests are one case of a general pattern — <a href="../essays/#essay-survivor">we study what survived</a> and forget the rest. Its psychological twin is <a href="../markets/psychology/#hindsight-bias">hindsight bias</a>: after the fact, the winners look obvious.</div>
  ${depthHtml('survivorship-bias')}
  ${selfCheck('survivorship-bias')}
  <div class="topic-nav" id="nav-survivorship-bias"></div>
</div>`;
}

/* 22 — Confidence Intervals */
function buildConfidenceIntervals() {
  return `<div class="topic" id="confidence-intervals">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Make Decisions</div><h2>Confidence <em>Intervals</em></h2></div>
    <span class="topic-badge">Inference</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How sure are you? — bootstrap and parametric CIs, and interpreting their width</p>
  <p class="prose">A <strong>confidence interval</strong> gives a range of plausible values for an unknown parameter. A 95% CI means: if we repeated this experiment many times, 95% of the intervals computed this way would contain the true value. Width = uncertainty.</p>
  <div class="fb"><div class="fm">CI = x&#772; &plusmn; z &middot; (&sigma; / &radic;n)</div><div class="fd"><span>Parametric CI</span> for means. z = 1.96 for 95%. Width shrinks with &radic;n.</div></div>
  <div class="fb c2"><div class="fm">Bootstrap CI: [&theta;*<sub>2.5%</sub>, &theta;*<sub>97.5%</sub>]</div><div class="fd"><span>Bootstrap CI</span> = percentiles of the resampled distribution. No normality assumption needed.</div></div>
  <div class="va">
    <div class="vl">// Interactive — sample size vs CI width</div>
    <canvas id="ciCanvas" role="img" aria-label="Confidence Intervals: Interactive — sample size vs CI width" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sample size</span><input type="range" aria-label="Sample size" id="ciN" min="10" max="500" step="10" value="50"><span class="vd" id="ciNv">50</span></div>
      <div class="cg"><span class="cl">Confidence</span><input type="range" aria-label="Confidence" id="ciConf" min="80" max="99" step="1" value="95"><span class="vd" id="ciConfV">95%</span></div>
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
  ${depthHtml('confidence-intervals')}
  ${selfCheck('confidence-intervals')}
  <div class="topic-nav" id="nav-confidence-intervals"></div>
</div>`;
}

/* 23 — Bootstrap Methods */
function buildBootstrapMethods() {
  return `<div class="topic" id="bootstrap-methods">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Make Decisions</div><h2>Bootstrap <em>Methods</em></h2></div>
    <span class="topic-badge">Resampling</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Estimate anything with resampling — the nonparametric Swiss army knife for uncertainty</p>
  <p class="prose"><strong>Bootstrap</strong> resamples your data with replacement thousands of times, computing your statistic each time. The distribution of bootstrap estimates approximates the sampling distribution of your statistic — giving you standard errors and CIs without formulas.</p>
  <div class="fb"><div class="fm">&theta;* = statistic(resample(data))</div><div class="fd">Repeat B times &rarr; distribution of &theta;* &rarr; <span>SE</span> = std(&theta;*) &nbsp;|&nbsp; <span>CI</span> = percentiles</div></div>
  <div class="va">
    <div class="vl">// Interactive — bootstrap distribution of the mean</div>
    <canvas id="bootCanvas" role="img" aria-label="Bootstrap Methods: Interactive — bootstrap distribution of the mean" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Resamples</span><input type="range" aria-label="Resamples" id="bootB" min="100" max="5000" step="100" value="1000"><span class="vd" id="bootBv">1000</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Resampling with replacement is also how bagging builds varied models — see <a href="../timeseries/#forecast-ensembles">forecast ensembles</a> — and resampling past returns is how historical <a href="../markets/risk/#value-at-risk">value at risk</a> estimates a bad day without assuming a bell curve.</div>
  ${depthHtml('bootstrap-methods')}
  <div class="topic-nav" id="nav-bootstrap-methods"></div>
</div>`;
}

/* 24 — Bayesian A/B Testing */
function buildBayesianAB() {
  return `<div class="topic" id="bayesian-ab">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Make Decisions</div><h2>Bayesian <em>A/B Testing</em></h2></div>
    <span class="topic-badge">Experimentation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Is version B actually better? Credible intervals and probability of improvement</p>
  <p class="prose"><strong>Bayesian A/B testing</strong> gives you what you actually want: "the probability that B is better than A." Unlike frequentist tests, you can check results early, get direct probability statements, and don't need fixed sample sizes.</p>
  <div class="fb"><div class="fm">P(B &gt; A | data) = &int; P(&theta;<sub>B</sub> &gt; &theta;<sub>A</sub>) d&theta;</div><div class="fd"><span>P(B &gt; A)</span> = direct probability of improvement. No p-values, no confusion.</div></div>
  <div class="fb c2"><div class="fm">Beta(a + successes, b + failures)</div><div class="fd">For conversion rates, the <span>Beta-Binomial</span> model gives exact posteriors. a=b=1 is a uniform prior.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two posteriors, see probability of B &gt; A</div>
    <canvas id="abCanvas" role="img" aria-label="Bayesian A/B Testing: Interactive — two posteriors, see probability of B &gt; A" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">A conversions</span><input type="range" aria-label="A conversions" id="abA" min="5" max="200" step="5" value="50"><span class="vd" id="abAv">50</span></div>
      <div class="cg"><span class="cl">B conversions</span><input type="range" aria-label="B conversions" id="abB" min="5" max="200" step="5" value="60"><span class="vd" id="abBv">60</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Bayesian updating is the same <a href="../ml-math/#bayes">Bayes' theorem</a> from ML. Prior belief + data = posterior. This connects to <a href="../markets/psychology/#market-sentiment-cycle">market sentiment</a> — prices update beliefs with every new trade.</div>
  ${depthHtml('bayesian-ab')}
  <div class="topic-nav" id="nav-bayesian-ab"></div>
</div>`;
}

/* 25 — Effect Size & Practical Significance */
function buildEffectSize() {
  return `<div class="topic" id="effect-size">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Make Decisions</div><h2>Effect Size &amp; <em>Practical Significance</em></h2></div>
    <span class="topic-badge">Significance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Statistically significant &ne; meaningful — Cohen's d and the difference between p-values and impact</p>
  <p class="prose">With enough data, <em>any</em> tiny difference becomes statistically significant. <strong>Effect size</strong> measures how <em>big</em> the difference is, independent of sample size. <strong>Cohen's d</strong> expresses the difference in standard deviation units.</p>
  <div class="fb"><div class="fm">d = (&mu;<sub>1</sub> &minus; &mu;<sub>2</sub>) / s<sub>pooled</sub></div><div class="fd"><span>Cohen's d</span>: 0.2 = small, 0.5 = medium, 0.8 = large. Tells you the <em>magnitude</em> of the effect.</div></div>
  <div class="va">
    <div class="vl">// Interactive — two distributions, see effect size and overlap</div>
    <canvas id="esCanvas" role="img" aria-label="Effect Size &amp; Practical Significance: Interactive — two distributions, see effect size and overlap" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Mean difference</span><input type="range" aria-label="Mean difference" id="esDiff" min="0" max="200" step="5" value="50"><span class="vd" id="esDiffV">0.50</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> A significant result can still be too small to matter. A model in an <a href="../mlops/#ab-rollout">A/B rollout</a> can win by a margin that does not pay for itself, and a trading edge can be real yet vanish in <a href="../markets/risk/#risk-adjusted-perf">risk-adjusted terms</a>.</div>
  ${depthHtml('effect-size')}
  ${selfCheck('effect-size')}
  <div class="topic-nav" id="nav-effect-size"></div>
</div>`;
}

/* 26 — Power Analysis */
function buildPowerAnalysis() {
  return `<div class="topic" id="power-analysis">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Make Decisions</div><h2>Power <em>Analysis</em></h2></div>
    <span class="topic-badge">Planning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How much data do you need? Sample size planning for experiments that can actually detect effects</p>
  <p class="prose"><strong>Statistical power</strong> is the probability of detecting a real effect if one exists. Convention: aim for 80% power. <strong>Power analysis</strong> links four quantities — sample size, effect size, significance level, and power — so you can solve for any one given the other three.</p>
  <div class="fb"><div class="fm">Power = 1 &minus; &beta; = P(reject H<sub>0</sub> | H<sub>1</sub> true)</div><div class="fd"><span>Power</span> = 0.80 means 80% chance of detecting a real effect. &beta; = Type II error rate.</div></div>
  <div class="va">
    <div class="vl">// Interactive — sample size vs power curve</div>
    <canvas id="powCanvas" role="img" aria-label="Power Analysis: Interactive — sample size vs power curve" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Effect size d</span><input type="range" aria-label="Effect size d" id="powD" min="10" max="100" step="5" value="50"><span class="vd" id="powDv">0.50</span></div>
      <div class="cg"><span class="cl">Alpha</span><input type="range" aria-label="Alpha" id="powAlpha" min="1" max="10" step="1" value="5"><span class="vd" id="powAlphaV">0.05</span></div>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Too little data and a real effect stays invisible. The same arithmetic decides how long an <a href="../mlops/#ab-rollout">A/B rollout</a> has to run, and how much history you need before <a href="../timeseries/#backtesting-forecasts">a backtest</a> can tell skill from luck.</div>
  ${depthHtml('power-analysis')}
  ${selfCheck('power-analysis')}
  <div class="topic-nav" id="nav-power-analysis"></div>
</div>`;
}

/* 27 — Hypothesis Testing & p-values */
function buildHypothesisTesting() {
  return `<div class="topic" id="hypothesis-testing">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Statistical Foundations</div><h2>Hypothesis Testing &amp; <em>p-values</em></h2></div>
    <span class="topic-badge">Statistics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Null vs alternative, what a p-value actually means, and the two ways to be wrong</p>
  <p class="prose">Every statistical claim follows the same script. Assume nothing interesting is happening (the <strong>null hypothesis</strong> H&#8320;), collect data, and ask: <em>if H&#8320; were true, how surprising would this data be?</em> That surprise, quantified, is the <strong>p-value</strong>. If it drops below a pre-chosen threshold &alpha; (usually 0.05), you reject H&#8320; in favour of the <strong>alternative</strong> H&#8321;.</p>
  <div class="fb"><div class="fm">p = P(data at least this extreme | H&#8320; true)</div><div class="fd"><span>p-value</span> = probability of seeing a test statistic this extreme <em>assuming the null is true</em>. It is NOT the probability that H&#8320; is true.</div></div>
  <div class="fb c2"><div class="fm">z = (x&#772; &minus; &mu;&#8320;) / (&sigma; / &radic;n)</div><div class="fd"><span>Test statistic</span> = how many standard errors the observed mean sits from the null value. Big |z| &rarr; small p.</div></div>
  <div class="fb c3"><div class="fm">&alpha; = P(Type I) &nbsp;&nbsp; &beta; = P(Type II) &nbsp;&nbsp; Power = 1 &minus; &beta;</div><div class="fd"><span>Type I</span> = false alarm (reject a true null) &nbsp;|&nbsp; <span>Type II</span> = miss (fail to reject a false null)</div></div>
  <div class="va">
    <div class="vl">// Interactive — slide the observed statistic and &alpha;, watch the p-value and the decision flip</div>
    <canvas id="hypCanvas" role="img" aria-label="Hypothesis Testing &amp; p-values: Interactive — slide the observed statistic and α, watch the p-value and the decision flip" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Observed z</span><input type="range" aria-label="Observed z" id="hypZ" min="-400" max="400" step="5" value="180"><span class="vd" id="hypZV">1.80</span></div>
      <div class="cg"><span class="cl">&alpha;</span><input type="range" aria-label="α" id="hypAlpha" min="1" max="10" step="1" value="5"><span class="vd" id="hypAlphaV">0.05</span></div>
      <div class="cg"><span class="cl">p-value</span><span class="vd" id="hypP" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Decision</span><span class="vd" id="hypDecision" style="color:#81c784">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th></th><th>H&#8320; is true</th><th>H&#8320; is false</th></tr></thead>
    <tbody>
      <tr><td>Reject H&#8320;</td><td>Type I error (prob &alpha;)</td><td>Correct — power (1&minus;&beta;)</td></tr>
      <tr><td>Fail to reject</td><td>Correct</td><td>Type II error (prob &beta;)</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — one-sample and two-sample tests</span>
<span class="kw">from</span> scipy <span class="kw">import</span> stats
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Does this sample's mean differ from 100?</span>
sample = np.random.normal(<span class="st">103</span>, <span class="st">15</span>, size=<span class="st">50</span>)
t_stat, p_val = stats.ttest_1samp(sample, popmean=<span class="st">100</span>)
print(<span class="st">f"t = {t_stat:.2f}, p = {p_val:.4f}"</span>)

<span class="cm"># Do two groups differ?</span>
t_stat, p_val = stats.ttest_ind(group_a, group_b)

alpha = <span class="st">0.05</span>
<span class="kw">if</span> p_val &lt; alpha:
    print(<span class="st">"Reject H0 — difference is statistically significant"</span>)
<span class="kw">else</span>:
    print(<span class="st">"Fail to reject H0 — not enough evidence"</span>)</pre></div>
  <div class="callout info"><strong>What a p-value is NOT:</strong> it is not the probability the null is true, not the probability the result is a fluke, and not a measure of effect size. p = 0.001 with a tiny, irrelevant effect is common with big data — always pair p-values with <a href="#effect-size">effect size</a>.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> This machinery powers <a href="#comparing-runs">comparing model runs</a> and A/B tests, and <a href="#power-analysis">power analysis</a> tells you how much data the test needs before you run it.</div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>State H&#8320; and H&#8321; <strong>before</strong> looking at the data, and fix &alpha; up front</li>
      <li>Pick the test that matches your data — see <a href="#stat-tests">choosing the right test</a></li>
      <li>Run the test, report the p-value <strong>and</strong> the effect size with a confidence interval</li>
      <li>Interpret: p &lt; &alpha; means "surprising if nothing were going on" — not "large" or "important"</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — p-hacking:</strong> testing many metrics, subgroups, or stopping rules until something crosses 0.05 guarantees false positives. With 20 independent tests at &alpha; = 0.05, you expect one significant result by pure chance. Pre-register your analysis or correct for multiple comparisons (Bonferroni, Benjamini-Hochberg).</div>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Comparing groups, validating that a change moved a metric, checking whether a model improvement is real — any decision that should survive sampling noise.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You have the full population (no sampling uncertainty), or the question is "how big is the effect?" rather than "is there an effect?" — go straight to estimation with <a href="#confidence-intervals">confidence intervals</a>.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/yufengsui/mobile-games-ab-testing" target="_blank" rel="noopener">Kaggle: Mobile Games A/B Testing — Cookie Cats (90K players)</a>
    <a href="https://archive.ics.uci.edu/dataset/186/wine+quality" target="_blank" rel="noopener">UCI: Wine Quality (red vs white — a natural two-group comparison)</a>
    <div class="ds-note">Cookie Cats is a real product experiment: did moving a gate from level 30 to 40 change retention? Perfect first hypothesis test.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install scipy numpy
# ────────────────────────────────────────
import numpy as np
from scipy import stats

rng = np.random.default_rng(7)
control = rng.normal(100, 15, 200)
variant = rng.normal(104, 15, 200)

t, p = stats.ttest_ind(variant, control, equal_var=False)
d = (variant.mean() - control.mean()) / np.sqrt(
    (control.var() + variant.var()) / 2)
print(f"t = {t:.2f}, p = {p:.4f}, Cohen's d = {d:.2f}")</code></pre>
  </div>
  ${depthHtml('hypothesis-testing')}
  ${selfCheck('hypothesis-testing')}
  <div class="topic-nav" id="nav-hypothesis-testing"></div>
</div>`;
}

/* 28 — Choosing the Right Statistical Test */
function buildStatTests() {
  return `<div class="topic" id="stat-tests">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Statistical Foundations</div><h2>Choosing the Right <em>Statistical Test</em></h2></div>
    <span class="topic-badge">Statistics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// t-test, chi-square, ANOVA and their nonparametric cousins — a decision map</p>
  <p class="prose">Most real questions reduce to three: <em>how many groups am I comparing, are the measurements paired, and can I assume normality?</em> Answer those and the test picks itself. Parametric tests (t-test, ANOVA) assume roughly normal data and are more powerful; nonparametric tests (Mann-Whitney, Wilcoxon, Kruskal-Wallis) rank the data instead and work almost anywhere.</p>
  <div class="fb"><div class="fm">t = (x&#772;&#8321; &minus; x&#772;&#8322;) / &radic;(s&#8321;&sup2;/n&#8321; + s&#8322;&sup2;/n&#8322;)</div><div class="fd"><span>Two-sample t</span> (Welch) = difference in means scaled by its standard error. Default choice for two independent groups.</div></div>
  <div class="fb c2"><div class="fm">&chi;&sup2; = &Sigma; (observed &minus; expected)&sup2; / expected</div><div class="fd"><span>Chi-square</span> = for counts and categories — is the observed table compatible with independence?</div></div>
  <div class="va">
    <div class="vl">// Interactive decision map — set your situation, the recommended test lights up</div>
    <canvas id="testCanvas" role="img" aria-label="Choosing the Right Statistical Test: Interactive decision map — set your situation, the recommended test lights up" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Groups</span><input type="range" aria-label="Groups" id="testGroups" min="2" max="3" step="1" value="2"><span class="vd" id="testGroupsV">2</span></div>
      <div class="cg"><span class="cl">Paired</span><input type="range" aria-label="Paired" id="testPaired" min="0" max="1" step="1" value="0"><span class="vd" id="testPairedV">No</span></div>
      <div class="cg"><span class="cl">Normal-ish</span><input type="range" aria-label="Normal-ish" id="testNormal" min="0" max="1" step="1" value="1"><span class="vd" id="testNormalV">Yes</span></div>
      <div class="cg"><span class="cl">Use</span><span class="vd" id="testRec" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Question</th><th>Parametric</th><th>Nonparametric</th></tr></thead>
    <tbody>
      <tr><td>2 independent groups differ?</td><td>Welch t-test</td><td>Mann-Whitney U</td></tr>
      <tr><td>Before vs after (paired)?</td><td>Paired t-test</td><td>Wilcoxon signed-rank</td></tr>
      <tr><td>3+ groups differ?</td><td>One-way ANOVA</td><td>Kruskal-Wallis</td></tr>
      <tr><td>Two categorical variables related?</td><td colspan="2">Chi-square test of independence</td></tr>
      <tr><td>Two numeric variables related?</td><td>Pearson r</td><td>Spearman &rho;</td></tr>
      <tr><td>Sample from this distribution?</td><td colspan="2">Kolmogorov-Smirnov / Shapiro-Wilk</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — the whole decision map in scipy</span>
<span class="kw">from</span> scipy <span class="kw">import</span> stats

<span class="cm"># 2 independent groups</span>
stats.ttest_ind(a, b, equal_var=<span class="st">False</span>)   <span class="cm"># Welch t-test</span>
stats.mannwhitneyu(a, b)                    <span class="cm"># nonparametric</span>

<span class="cm"># Paired (same subjects, before/after)</span>
stats.ttest_rel(before, after)
stats.wilcoxon(before, after)               <span class="cm"># nonparametric</span>

<span class="cm"># 3+ groups</span>
stats.f_oneway(g1, g2, g3)                  <span class="cm"># ANOVA</span>
stats.kruskal(g1, g2, g3)                   <span class="cm"># nonparametric</span>

<span class="cm"># Categorical vs categorical</span>
chi2, p, dof, exp = stats.chi2_contingency(contingency_table)

<span class="cm"># Check normality first (n &lt; ~50)</span>
stat, p = stats.shapiro(a)</pre></div>
  <div class="callout info"><strong>Normality worries less than you think:</strong> with n &gt; ~30 per group, the <a href="#clt-sampling">Central Limit Theorem</a> makes the t-test robust to non-normal data. Reach for nonparametric tests when samples are small, heavily skewed, or ordinal.</div>
  <div class="callout"><strong>ANOVA says "some group differs" — not which.</strong> Follow a significant ANOVA with pairwise post-hoc tests (Tukey HSD) rather than running raw t-tests between every pair, which inflates the false-positive rate.</div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> You have a concrete comparison question and need the defensible test — experiments, feature launches, model comparisons, survey analysis.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> The dataset is the full population, or you need effect estimates rather than yes/no answers — estimate with <a href="#bootstrap-methods">bootstrap</a> or regression instead.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://github.com/allisonhorst/palmerpenguins" target="_blank" rel="noopener">Palmer Penguins (3 species — made for ANOVA and chi-square)</a>
    <a href="https://archive.ics.uci.edu/dataset/186/wine+quality" target="_blank" rel="noopener">UCI: Wine Quality (rating groups, skewed features)</a>
    <div class="ds-note">Penguins ships with seaborn (sns.load_dataset('penguins')) — three species, numeric and categorical columns, a few NaNs. Every test in the table above has a natural question here.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install scipy pandas seaborn
# ────────────────────────────────────────
import pandas as pd
import seaborn as sns
from scipy import stats

df = sns.load_dataset('penguins').dropna()
groups = [g for _, g in df.groupby('species')['body_mass_g']]

print(stats.f_oneway(*groups))     # 3 groups, parametric
print(stats.kruskal(*groups))      # 3 groups, rank-based

chi2, p, dof, _ = stats.chi2_contingency(
    pd.crosstab(df['species'], df['island']))
print(f"chi2 = {chi2:.1f}, p = {p:.4g}")</code></pre>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Choosing a test is choosing your assumptions. <a href="../mlops/#drift-detection">Drift detection</a> uses the same tests — KS, chi-square — to ask whether production data still looks like training data, and <a href="../timeseries/#stationarity">stationarity tests</a> ask whether a series keeps its statistics over time. Guide: <a href="/guides/which-test/">Which statistical test should I use?</a></div>
  ${depthHtml('stat-tests')}
  <div class="topic-nav" id="nav-stat-tests"></div>
</div>`;
}

/* 29 — Central Limit Theorem & Sampling */
function buildCLTSampling() {
  return `<div class="topic" id="clt-sampling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Statistical Foundations</div><h2>Central Limit Theorem &amp; <em>Sampling</em></h2></div>
    <span class="topic-badge">Statistics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Why averages become normal — the theorem underneath every CI and t-test</p>
  <p class="prose">Take any population — skewed, lumpy, weird. Draw samples of size n and compute each sample's mean. The <strong>Central Limit Theorem</strong> says the distribution of those means approaches a normal distribution as n grows, <em>regardless of the population's shape</em>. That single fact is why confidence intervals, t-tests, and A/B testing work at all.</p>
  <div class="fb"><div class="fm">x&#772; &nbsp;&rarr;&nbsp; N(&mu;, &sigma;&sup2;/n)</div><div class="fd"><span>Sampling distribution</span> of the mean: centred on the true mean &mu;, with variance shrinking as 1/n.</div></div>
  <div class="fb c2"><div class="fm">SE = &sigma; / &radic;n</div><div class="fd"><span>Standard error</span> = the standard deviation of the sample mean. Quadruple the sample to halve the error.</div></div>
  <div class="va">
    <div class="vl">// Interactive — skew the population, grow n, watch the sample means turn normal</div>
    <canvas id="cltCanvas" role="img" aria-label="Central Limit Theorem &amp; Sampling: Interactive — skew the population, grow n, watch the sample means turn normal" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Population skew</span><input type="range" aria-label="Population skew" id="cltSkew" min="0" max="100" step="1" value="70"><span class="vd" id="cltSkewV">0.70</span></div>
      <div class="cg"><span class="cl">Sample size n</span><input type="range" aria-label="Sample size n" id="cltN" min="1" max="64" step="1" value="5"><span class="vd" id="cltNV">5</span></div>
      <div class="cg"><span class="cl">SE &prop; 1/&radic;n</span><span class="vd" id="cltSE" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — watch the CLT happen</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">import</span> matplotlib.pyplot <span class="kw">as</span> plt

<span class="cm"># A very non-normal population (exponential)</span>
population = np.random.exponential(scale=<span class="st">1.0</span>, size=<span class="st">1_000_000</span>)

<span class="kw">for</span> n <span class="kw">in</span> [<span class="st">1</span>, <span class="st">5</span>, <span class="st">30</span>]:
    means = [np.mean(np.random.choice(population, n))
             <span class="kw">for</span> _ <span class="kw">in</span> range(<span class="st">10_000</span>)]
    plt.hist(means, bins=<span class="st">60</span>, alpha=<span class="st">0.5</span>, label=<span class="st">f"n={n}"</span>)

plt.legend(); plt.title(<span class="st">"Sampling distribution of the mean"</span>)
plt.show()

<span class="cm"># Standard error shrinks as 1/sqrt(n)</span>
print(population.std() / np.sqrt(<span class="st">30</span>))</pre></div>
  <table class="mt">
    <thead><tr><th>Concept</th><th>What it says</th><th>Practical use</th></tr></thead>
    <tbody>
      <tr><td>Law of Large Numbers</td><td>x&#772; &rarr; &mu; as n grows</td><td>More data &rarr; estimates converge</td></tr>
      <tr><td>Central Limit Theorem</td><td>x&#772; becomes normally distributed</td><td>Justifies CIs, t-tests, z-tests</td></tr>
      <tr><td>Standard error</td><td>Spread of x&#772; is &sigma;/&radic;n</td><td>Sizing experiments, error bars</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Rule of thumb:</strong> n &ge; 30 usually suffices for the normal approximation — but the more skewed the population, the more n you need. Very heavy-tailed data (rare in nature, common in finance) converges slowly or, with infinite variance, not at all.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The CLT also assumes <em>independent</em> draws. Market returns are autocorrelated and fat-tailed — see <a href="#distribution-shape">distribution shape</a> and <a href="#monte-carlo">Monte Carlo simulation</a> for why financial error bars deserve extra suspicion.</div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Reasoning about any average, proportion, or error bar — experiment metrics, survey estimates, batch statistics in monitoring.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Data is strongly dependent (time series), heavy-tailed, or you care about extremes rather than means — the CLT says nothing about the tails of the original distribution.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install numpy matplotlib
# ────────────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

population = np.random.exponential(1.0, 1_000_000)

fig, axes = plt.subplots(1, 3, figsize=(12, 3), sharex=True)
for ax, n in zip(axes, [1, 5, 30]):
    idx = np.random.randint(0, len(population), (10_000, n))
    ax.hist(population[idx].mean(axis=1), bins=60)
    ax.set_title(f"sample means, n = {n}")
plt.tight_layout(); plt.show()</code></pre>
  </div>
  ${depthHtml('clt-sampling')}
  <div class="topic-nav" id="nav-clt-sampling"></div>
</div>`;
}

/* 30 — Correlation, Causation & Simpson's Paradox */
function buildCorrelationCausation() {
  return `<div class="topic" id="correlation-causation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Statistical Foundations</div><h2>Correlation, Causation &amp; <em>Simpson's Paradox</em></h2></div>
    <span class="topic-badge">Statistics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Confounders, spurious correlations, and trends that reverse when you split the data</p>
  <p class="prose">Correlation measures whether two variables move together — nothing more. A strong r can come from X causing Y, Y causing X, a hidden <strong>confounder</strong> Z driving both, selection effects, or plain chance. <strong>Simpson's paradox</strong> is the most dramatic failure: a trend that holds in every subgroup can <em>reverse</em> when the groups are pooled.</p>
  <div class="fb"><div class="fm">r = cov(X, Y) / (&sigma;<sub>X</sub> &middot; &sigma;<sub>Y</sub>) &isin; [&minus;1, 1]</div><div class="fd"><span>Pearson r</span> = linear co-movement only. r = 0 does not mean independent; r = 0.9 does not mean causal.</div></div>
  <div class="va">
    <div class="vl">// Interactive Simpson's paradox — increase the confounder, watch the pooled trend flip against the groups</div>
    <canvas id="causCanvas" role="img" aria-label="Correlation, Causation &amp; Simpson's Paradox: Interactive Simpson's paradox — increase the confounder, watch the pooled trend flip against the groups" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Confounder strength</span><input type="range" aria-label="Confounder strength" id="causConf" min="0" max="100" step="1" value="70"><span class="vd" id="causConfV">0.70</span></div>
      <div class="cg"><span class="cl">Pooled r</span><span class="vd" id="causPooled" style="color:#e57373">—</span></div>
      <div class="cg"><span class="cl">Within-group r</span><span class="vd" id="causWithin" style="color:#81c784">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Why X and Y correlate</th><th>Example</th><th>Antidote</th></tr></thead>
    <tbody>
      <tr><td>X causes Y</td><td>Price cut &rarr; more sales</td><td>Randomized experiment confirms it</td></tr>
      <tr><td>Y causes X</td><td>More police &harr; more crime (reverse)</td><td>Temporal ordering, natural experiments</td></tr>
      <tr><td>Confounder Z</td><td>Ice cream &harr; drownings (summer)</td><td>Stratify or control for Z</td></tr>
      <tr><td>Selection bias</td><td>Only survivors measured</td><td>Audit how the sample was formed</td></tr>
      <tr><td>Chance</td><td>Any two trending series</td><td>Out-of-sample checks, corrections</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — Simpson's paradox in three lines of groupby</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

<span class="cm"># Pooled correlation says one thing…</span>
print(df[[<span class="st">'dose'</span>, <span class="st">'recovery'</span>]].corr().iloc[<span class="st">0</span>, <span class="st">1</span>])

<span class="cm"># …every subgroup says the opposite</span>
print(df.groupby(<span class="st">'severity'</span>)
        .apply(<span class="kw">lambda</span> g: g[<span class="st">'dose'</span>].corr(g[<span class="st">'recovery'</span>])))

<span class="cm"># Always check candidate confounders before trusting a trend</span>
pd.crosstab(df[<span class="st">'severity'</span>], df[<span class="st">'treatment'</span>], normalize=<span class="st">'index'</span>)</pre></div>
  <div class="callout info"><strong>Which number is right?</strong> Neither, automatically. If severity drives both dose and recovery, the within-group trend is the honest one. The answer depends on the causal structure — what drives what — not on the arithmetic.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> <a href="#feature-correlation">Feature correlation</a> shows the same trap inside models, and <a href="#survivorship-bias">survivorship bias</a> is selection-driven correlation in backtests. The only clean escape is randomization — the logic behind <a href="#bayesian-ab">A/B testing</a>.</div>
  <div class="howto">
    <div class="howto-title">How to use this in practice</div>
    <ol>
      <li>Before trusting any correlation, list plausible confounders — time, size, cohort, seasonality are the usual suspects</li>
      <li>Recompute the relationship <strong>within</strong> each stratum of the confounder (groupby is enough)</li>
      <li>If pooled and stratified trends disagree, resolve it with causal knowledge, not with more data</li>
      <li>For decisions that matter, push for a randomized test — it severs every confounder at once</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — controlling for everything:</strong> conditioning on a variable that sits <em>between</em> cause and effect (a mediator), or on a common effect (a collider), <em>creates</em> bias instead of removing it. Adding every column to a regression is not caution — think about the causal graph first.</div>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Any observational comparison — dashboards, cohort metrics, "users who do X retain better" claims, feature-importance readings you are tempted to act on.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> The data comes from a properly randomized experiment — randomization already balances confounders (but check the randomization actually held).</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://en.wikipedia.org/wiki/Simpson%27s_paradox" target="_blank" rel="noopener">The classic case: UC Berkeley admissions (Simpson's paradox)</a>
    <a href="https://github.com/allisonhorst/palmerpenguins" target="_blank" rel="noopener">Palmer Penguins (pooled vs per-species correlations flip sign)</a>
    <div class="ds-note">In the penguins data, bill length vs bill depth correlates negatively pooled — and positively within every species. A Simpson's paradox you can groupby in one line.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pandas seaborn
# ────────────────────────────────────────
import seaborn as sns

df = sns.load_dataset('penguins').dropna()

pooled = df['bill_length_mm'].corr(df['bill_depth_mm'])
within = df.groupby('species').apply(
    lambda g: g['bill_length_mm'].corr(g['bill_depth_mm']))

print(f"pooled r = {pooled:.2f}")   # negative!
print(within.round(2))              # all positive</code></pre>
  </div>
  ${depthHtml('correlation-causation')}
  ${selfCheck('correlation-causation')}
  <div class="topic-nav" id="nav-correlation-causation"></div>
</div>`;
}

/* 31 — Exploratory Data Analysis (EDA) */
function buildEDAWorkflow() {
  return `<div class="topic" id="eda-workflow">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">31 — Data Analytics</div><h2>Exploratory <em>Data Analysis</em></h2></div>
    <span class="topic-badge">Analytics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The first hour with any dataset — a repeatable profiling workflow</p>
  <p class="prose"><strong>EDA</strong> is the disciplined version of "poking at the data": shape and types first, then missingness, then each variable's distribution, then relationships between variables. The goal is not pretty plots — it is a list of <em>surprises and decisions</em>: columns to fix, outliers to investigate, transformations to apply, hypotheses worth testing.</p>
  <div class="fb"><div class="fm">shape &rarr; types &rarr; missing &rarr; distributions &rarr; relationships</div><div class="fd"><span>The EDA loop</span> — always in this order. Each step decides what the next one means.</div></div>
  <div class="va">
    <div class="vl">// Interactive — skew the data and inject outliers, watch mean vs median diverge</div>
    <canvas id="edaCanvas" role="img" aria-label="Exploratory Data Analysis (EDA): Interactive — skew the data and inject outliers, watch mean vs median diverge" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Skew</span><input type="range" aria-label="Skew" id="edaSkew" min="0" max="100" step="1" value="40"><span class="vd" id="edaSkewV">0.40</span></div>
      <div class="cg"><span class="cl">Outliers %</span><input type="range" aria-label="Outliers %" id="edaOut" min="0" max="10" step="1" value="0"><span class="vd" id="edaOutV">0%</span></div>
      <div class="cg"><span class="cl">Mean</span><span class="vd" id="edaMean" style="color:#e57373">—</span></div>
      <div class="cg"><span class="cl">Median</span><span class="vd" id="edaMedian" style="color:#81c784">—</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Step</th><th>pandas</th><th>You're looking for</th></tr></thead>
    <tbody>
      <tr><td>Shape &amp; types</td><td>df.shape, df.info()</td><td>Row count, wrong dtypes, IDs read as numbers</td></tr>
      <tr><td>Missingness</td><td>df.isna().mean()</td><td>Columns to drop, impute, or flag — see <a href="#missing-data">missing data</a></td></tr>
      <tr><td>Numeric profile</td><td>df.describe()</td><td>Impossible values, skew (mean &ne; median), scale</td></tr>
      <tr><td>Categorical profile</td><td>value_counts()</td><td>Cardinality, typos ("NY" vs "N.Y."), rare levels</td></tr>
      <tr><td>Distributions</td><td>df.hist(), boxplot</td><td>Shape, outliers — see <a href="#distribution-shape">distribution shape</a></td></tr>
      <tr><td>Relationships</td><td>df.corr(), scatter_matrix</td><td>Redundancy, leakage candidates, target signal</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — the 10-line EDA opener</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

df = pd.read_csv(<span class="st">'data.csv'</span>)

print(df.shape)
print(df.info())                          <span class="cm"># dtypes + non-null counts</span>
print(df.describe(include=<span class="st">'all'</span>).T)      <span class="cm"># numeric + categorical profile</span>
print(df.isna().mean().sort_values(ascending=<span class="st">False</span>).head(<span class="st">10</span>))

<span class="kw">for</span> col <span class="kw">in</span> df.select_dtypes(<span class="st">'object'</span>):
    print(col, df[col].nunique(), df[col].value_counts().head(<span class="st">3</span>).to_dict())

df.hist(bins=<span class="st">40</span>, figsize=(<span class="st">12</span>, <span class="st">8</span>))     <span class="cm"># every numeric at once</span></pre></div>
  <div class="callout info"><strong>Mean vs median is a free skew detector:</strong> when they disagree badly (as in the visual above), the distribution is skewed or contaminated by outliers — report medians, and consider a log transform before modeling.</div>
  <div class="callout"><strong>EDA before splitting? Careful.</strong> Profile structure on everything, but tune decisions (imputation values, outlier caps, transformations) on the <em>training split only</em> — otherwise test-set information leaks into your pipeline.</div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/competitions/titanic/data" target="_blank" rel="noopener">Kaggle: Titanic (classic messy mix of numeric, categorical, and missing)</a>
    <a href="https://archive.ics.uci.edu/dataset/2/adult" target="_blank" rel="noopener">UCI: Adult Income (48K rows, categorical-heavy, "?" as missing marker)</a>
    <div class="ds-note">Adult hides its missing values as the string "?" — a perfect first test of whether your EDA actually catches what df.isna() misses.</div>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Every new dataset, every refreshed pipeline, before every model. Ten minutes of EDA routinely saves days of debugging silent data problems.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Never entirely — but for a stable, monitored pipeline the ongoing version of EDA is <a href="#data-drift">drift detection</a>, not manual re-profiling.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pandas seaborn matplotlib
# ────────────────────────────────────────
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset('titanic')

print(df.shape)
print(df.describe(include='all').T)
print(df.isna().mean().sort_values(ascending=False).head())

df.hist(bins=40, figsize=(12, 6))
sns.heatmap(df.isna(), cbar=False)   # missingness at a glance
plt.show()</code></pre>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The first hour with a dataset is where you catch what <a href="../mlops/#data-quality">data-quality checks</a> later automate, and where a time series first shows its trend and seasons — the starting point for <a href="../timeseries/#decomposition">decomposition</a>.</div>
  ${depthHtml('eda-workflow')}
  <div class="topic-nav" id="nav-eda-workflow"></div>
</div>`;
}

/* 32 — GroupBy, Pivot & Aggregation */
function buildGroupbyAggregation() {
  return `<div class="topic" id="groupby-aggregation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">32 — Data Analytics</div><h2>GroupBy, Pivot &amp; <em>Aggregation</em></h2></div>
    <span class="topic-badge">Analytics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Split-apply-combine — the single most-used pattern in data analytics</p>
  <p class="prose">Nearly every analytics question is "metric X <em>by</em> segment Y" — revenue by region, churn by plan, latency by endpoint. The engine underneath is always <strong>split-apply-combine</strong>: split rows into groups, apply an aggregation to each, combine the results into a table. pandas <code>groupby</code>, SQL <code>GROUP BY</code>, and spreadsheet pivot tables are the same idea in three dialects.</p>
  <div class="fb"><div class="fm">split(rows, key) &rarr; apply(agg) &rarr; combine</div><div class="fd"><span>Split-apply-combine</span> — group rows by key, reduce each group with mean/sum/count/…, stack the results.</div></div>
  <div class="va">
    <div class="vl">// Interactive — raw rows on the left, one aggregated bar per group on the right</div>
    <canvas id="gbCanvas" role="img" aria-label="GroupBy, Pivot &amp; Aggregation: Interactive — raw rows on the left, one aggregated bar per group on the right" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Aggregation</span><input type="range" aria-label="Aggregation" id="gbAgg" min="0" max="3" step="1" value="2"><span class="vd" id="gbAggV">mean</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Tool</th><th>Best for</th><th>One-liner</th></tr></thead>
    <tbody>
      <tr><td>groupby + agg</td><td>Metrics by one or more keys</td><td>df.groupby('region')['rev'].sum()</td></tr>
      <tr><td>pivot_table</td><td>Two keys &rarr; rows &times; columns grid</td><td>df.pivot_table('rev', 'region', 'month')</td></tr>
      <tr><td>crosstab</td><td>Counts of category &times; category</td><td>pd.crosstab(df.plan, df.churned)</td></tr>
      <tr><td>resample</td><td>Time-based grouping</td><td>df.resample('W')['rev'].sum()</td></tr>
      <tr><td>transform</td><td>Group stat broadcast back to rows</td><td>g['rev'].transform('mean')</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — the aggregation toolbox</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

<span class="cm"># Multiple metrics per group, named columns</span>
summary = (df.groupby(<span class="st">'region'</span>)
             .agg(orders=(<span class="st">'order_id'</span>, <span class="st">'count'</span>),
                  revenue=(<span class="st">'amount'</span>, <span class="st">'sum'</span>),
                  avg_basket=(<span class="st">'amount'</span>, <span class="st">'mean'</span>))
             .sort_values(<span class="st">'revenue'</span>, ascending=<span class="st">False</span>))

<span class="cm"># Rows × columns grid</span>
pivot = df.pivot_table(values=<span class="st">'amount'</span>, index=<span class="st">'region'</span>,
                       columns=<span class="st">'month'</span>, aggfunc=<span class="st">'sum'</span>, fill_value=<span class="st">0</span>)

<span class="cm"># Same thing in SQL</span>
<span class="cm"># SELECT region, COUNT(*), SUM(amount), AVG(amount)</span>
<span class="cm"># FROM orders GROUP BY region ORDER BY SUM(amount) DESC;</span>

<span class="cm"># Group stat next to each row (for "% of segment" columns)</span>
df[<span class="st">'pct_of_region'</span>] = df[<span class="st">'amount'</span>] / df.groupby(<span class="st">'region'</span>)[<span class="st">'amount'</span>].transform(<span class="st">'sum'</span>)</pre></div>
  <div class="callout info"><strong>Mean of means &ne; overall mean.</strong> Averaging per-group averages weights every group equally regardless of size. Aggregate from raw rows (or weight by group size) — this is <a href="#correlation-causation">Simpson's paradox</a> waiting to happen in a dashboard.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Aggregation is also feature engineering — per-entity groupby stats ("customer's average order", "merchant's txn count") are among the strongest features in tabular ML and fraud models.</div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Building any report, dashboard metric, or segment comparison — and when engineering aggregate features for models.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You need row-level detail (aggregation destroys it) — or the "groups" are time windows with order mattering, where rolling windows beat plain groupby.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/vivek468/superstore-dataset-final" target="_blank" rel="noopener">Kaggle: Superstore Sales (10K orders — region, category, segment)</a>
    <a href="https://archive.ics.uci.edu/dataset/352/online+retail" target="_blank" rel="noopener">UCI: Online Retail (540K transactions, invoice-level)</a>
    <div class="ds-note">Superstore is the canonical groupby playground: every business question is a two-line aggregation away.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pandas seaborn
# ────────────────────────────────────────
import seaborn as sns

tips = sns.load_dataset('tips')

summary = (tips.groupby(['day', 'time'], observed=True)
               .agg(orders=('total_bill', 'count'),
                    revenue=('total_bill', 'sum'),
                    avg_bill=('total_bill', 'mean'))
               .round(2))
print(summary)

print(tips.pivot_table('total_bill', index='day',
                       columns='time', aggfunc='sum', observed=True))</code></pre>
  </div>
  ${depthHtml('groupby-aggregation')}
  <div class="topic-nav" id="nav-groupby-aggregation"></div>
</div>`;
}

/* 33 — Cohort & Retention Analysis */
function buildCohortRetention() {
  return `<div class="topic" id="cohort-retention">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">33 — Data Analytics</div><h2>Cohort &amp; <em>Retention</em> Analysis</h2></div>
    <span class="topic-badge">Analytics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Group users by when they arrived, track them over time — the retention heatmap</p>
  <p class="prose">Averages hide everything in user analytics: growth pumps new users into the numerator and masks that older users are quietly leaving. <strong>Cohort analysis</strong> fixes this by grouping users by their start month and tracking each cohort separately. The classic output is the <strong>retention triangle</strong> — rows are cohorts, columns are months since signup, cells are the share still active.</p>
  <div class="fb"><div class="fm">retention(c, t) = active(c, t) / size(c)</div><div class="fd"><span>Retention</span> = share of cohort c still active t periods after joining. Read down a column to compare cohorts at the same age.</div></div>
  <div class="fb c2"><div class="fm">churn = 1 &minus; retention&nbsp;&nbsp;&middot;&nbsp;&nbsp;LTV &asymp; ARPU / churn</div><div class="fd"><span>Churn</span> is retention's complement — and the denominator of the standard lifetime-value approximation.</div></div>
  <div class="va">
    <div class="vl">// Interactive retention triangle — set churn, then let newer cohorts improve</div>
    <canvas id="cohortCanvas" role="img" aria-label="Cohort &amp; Retention Analysis: Interactive retention triangle — set churn, then let newer cohorts improve" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Monthly churn</span><input type="range" aria-label="Monthly churn" id="cohChurn" min="5" max="50" step="1" value="25"><span class="vd" id="cohChurnV">25%</span></div>
      <div class="cg"><span class="cl">Newer cohorts improve</span><input type="range" aria-label="Newer cohorts improve" id="cohImprove" min="0" max="30" step="1" value="0"><span class="vd" id="cohImproveV">0%</span></div>
      <div class="cg"><span class="cl">Month-3 retention (latest)</span><span class="vd" id="cohM3" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — retention triangle in pandas</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

<span class="cm"># events: user_id, event_date</span>
events[<span class="st">'month'</span>] = events[<span class="st">'event_date'</span>].dt.to_period(<span class="st">'M'</span>)
events[<span class="st">'cohort'</span>] = events.groupby(<span class="st">'user_id'</span>)[<span class="st">'month'</span>].transform(<span class="st">'min'</span>)
events[<span class="st">'age'</span>] = (events[<span class="st">'month'</span>] - events[<span class="st">'cohort'</span>]).apply(<span class="kw">lambda</span> p: p.n)

counts = (events.drop_duplicates([<span class="st">'user_id'</span>, <span class="st">'month'</span>])
                .pivot_table(index=<span class="st">'cohort'</span>, columns=<span class="st">'age'</span>,
                             values=<span class="st">'user_id'</span>, aggfunc=<span class="st">'nunique'</span>))

retention = counts.div(counts[<span class="st">0</span>], axis=<span class="st">0</span>)   <span class="cm"># normalize by cohort size</span>
print((retention * <span class="st">100</span>).round(<span class="st">1</span>))</pre></div>
  <table class="mt">
    <thead><tr><th>Read the triangle</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td>Down a column</td><td>Same-age comparison — are newer cohorts retaining better? (Product is improving)</td></tr>
      <tr><td>Along a row</td><td>One cohort's decay curve — where is the steepest drop?</td></tr>
      <tr><td>Flattening rows</td><td>A retained core exists — the curve's plateau is your product-market-fit signal</td></tr>
      <tr><td>Rows hitting zero</td><td>Leaky bucket — growth is refilling, not compounding</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Define "active" first.</strong> Logged in? Performed the core action? Paid? Retention numbers are meaningless without a stated activity definition and period — and comparisons across products even more so.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Averaging metrics over <em>current</em> users only is <a href="#survivorship-bias">survivorship bias</a> — cohort analysis is the antidote, because the churned users stay in their cohort's denominator.</div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Any subscription or repeat-use product — separating growth from stickiness, judging whether product changes moved long-term behaviour, computing honest LTV.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> One-shot transactions with no expected repeat behaviour, or cohorts too small for stable percentages (a 20-user cohort moves 5 points per person).</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://archive.ics.uci.edu/dataset/352/online+retail" target="_blank" rel="noopener">UCI: Online Retail (540K transactions — build real purchase cohorts)</a>
    <div class="ds-note">Assign each customer to their first-invoice month, pivot by months-since, and you have a genuine retention triangle from real e-commerce data.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pandas numpy
# ────────────────────────────────────────
import numpy as np
import pandas as pd

rng = np.random.default_rng(5)
rows = []
for cohort in range(6):                      # signup month
    months_active = rng.geometric(0.25, 500).clip(max=8 - cohort)
    for uid, life in enumerate(months_active):
        rows += [(f"{cohort}-{uid}", cohort, cohort + m)
                 for m in range(life)]

ev = pd.DataFrame(rows, columns=['user_id', 'cohort', 'month'])
ev['age'] = ev['month'] - ev['cohort']
counts = ev.pivot_table(index='cohort', columns='age',
                        values='user_id', aggfunc='nunique')
print((counts.div(counts[0], axis=0) * 100).round(1))</code></pre>
  </div>
  ${depthHtml('cohort-retention')}
  <div class="topic-nav" id="nav-cohort-retention"></div>
</div>`;
}

/* 34 — Funnel & Conversion Analysis */
function buildFunnelAnalysis() {
  return `<div class="topic" id="funnel-analysis">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">34 — Data Analytics</div><h2>Funnel &amp; <em>Conversion</em> Analysis</h2></div>
    <span class="topic-badge">Analytics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Where do users leak out? Stage conversions, drop-offs, and fixing the right bottleneck</p>
  <p class="prose">A <strong>funnel</strong> is an ordered sequence of steps — visit &rarr; view product &rarr; add to cart &rarr; checkout &rarr; purchase. Because overall conversion is the <em>product</em> of stage conversions, small stage improvements compound, and one bad stage caps everything downstream. The job of funnel analysis is finding the stage where fixing the leak buys the most.</p>
  <div class="fb"><div class="fm">overall = &prod; stage&#7522; &nbsp;&nbsp;&nbsp; e.g. 0.40 &times; 0.30 &times; 0.60 &times; 0.75 = 5.4%</div><div class="fd"><span>Overall conversion</span> = product of per-stage rates. A 10% relative lift at any stage lifts the whole funnel 10%.</div></div>
  <div class="va">
    <div class="vl">// Interactive funnel — tune two stages, watch the overall conversion and the biggest leak</div>
    <canvas id="funnelCanvas" role="img" aria-label="Funnel &amp; Conversion Analysis: Interactive funnel — tune two stages, watch the overall conversion and the biggest leak" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">View &rarr; Cart</span><input type="range" aria-label="View → Cart" id="funMid" min="5" max="80" step="1" value="30"><span class="vd" id="funMidV">30%</span></div>
      <div class="cg"><span class="cl">Checkout &rarr; Purchase</span><input type="range" aria-label="Checkout → Purchase" id="funCheckout" min="10" max="95" step="1" value="60"><span class="vd" id="funCheckoutV">60%</span></div>
      <div class="cg"><span class="cl">Overall</span><span class="vd" id="funOverall" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — funnel from an event log</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

stages = [<span class="st">'visit'</span>, <span class="st">'view_product'</span>, <span class="st">'add_to_cart'</span>, <span class="st">'checkout'</span>, <span class="st">'purchase'</span>]

<span class="cm"># events: user_id, event — count users reaching each stage</span>
reached = {s: events.loc[events.event == s, <span class="st">'user_id'</span>].nunique()
           <span class="kw">for</span> s <span class="kw">in</span> stages}

funnel = pd.DataFrame({<span class="st">'users'</span>: reached.values()}, index=stages)
funnel[<span class="st">'stage_conv'</span>] = funnel[<span class="st">'users'</span>] / funnel[<span class="st">'users'</span>].shift(<span class="st">1</span>)
funnel[<span class="st">'overall'</span>] = funnel[<span class="st">'users'</span>] / funnel[<span class="st">'users'</span>].iloc[<span class="st">0</span>]
print(funnel.round(<span class="st">3</span>))

<span class="cm"># Biggest leak = stage with lowest stage_conv</span>
print(<span class="st">"Fix first:"</span>, funnel[<span class="st">'stage_conv'</span>].idxmin())</pre></div>
  <table class="mt">
    <thead><tr><th>Metric</th><th>Definition</th><th>Watch for</th></tr></thead>
    <tbody>
      <tr><td>Stage conversion</td><td>users(stage) / users(previous)</td><td>The bottleneck — lowest rate first</td></tr>
      <tr><td>Overall conversion</td><td>users(last) / users(first)</td><td>Topline; hides <em>where</em> the leak is</td></tr>
      <tr><td>Drop-off</td><td>1 &minus; stage conversion</td><td>Multiply by traffic to rank by impact</td></tr>
      <tr><td>Time-to-convert</td><td>Median time between stages</td><td>Slow stages often precede abandonment</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Fix by impact, not by rate:</strong> the lowest-converting stage isn't automatically the best fix — weight each leak by the users flowing into it and by how movable it plausibly is. A 2-point lift on a high-traffic early stage often beats 10 points at the bottom.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Found the bottleneck? Verify the fix with <a href="#bayesian-ab">Bayesian A/B testing</a>, and size the experiment with <a href="#power-analysis">power analysis</a> — conversion deltas of a few percent need surprisingly many users.</div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Any multi-step flow — signup, onboarding, checkout, sales pipelines, even ML pipeline stage attrition (candidates &rarr; labeled &rarr; trained &rarr; deployed).</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> Steps aren't genuinely ordered, or users routinely loop and skip — session-path analysis fits exploratory browsing better than a strict funnel.</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/mkechinov/ecommerce-events-history-in-cosmetics-shop" target="_blank" rel="noopener">Kaggle: eCommerce Events — Cosmetics Shop (20M view/cart/purchase events)</a>
    <div class="ds-note">Real view → cart → purchase events with timestamps — build the funnel, then measure time-to-convert between stages.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pandas numpy
# ────────────────────────────────────────
import numpy as np
import pandas as pd

rng = np.random.default_rng(11)
stages = ['visit', 'view_product', 'add_to_cart', 'checkout', 'purchase']
rates  = [1.0, .55, .30, .70, .60]

events = []
for uid in range(10_000):
    for stage, rate in zip(stages, rates):
        if rng.random() &gt; rate:
            break
        events.append((uid, stage))

ev = pd.DataFrame(events, columns=['user_id', 'event'])
funnel = ev.groupby('event')['user_id'].nunique().reindex(stages)
print((funnel / funnel.iloc[0]).round(3))
print("fix first:", (funnel / funnel.shift(1)).idxmin())</code></pre>
  </div>
  ${depthHtml('funnel-analysis')}
  <div class="topic-nav" id="nav-funnel-analysis"></div>
</div>`;
}

/* 35 — scikit-learn Evaluation Suite */
function buildSklearnEval() {
  return `<div class="topic" id="sklearn-eval">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">35 — Python Power Tools</div><h2>scikit-learn <em>Evaluation Suite</em></h2></div>
    <span class="topic-badge">Python</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The Swiss army knife — classification_report, cross_val_score, learning_curve, and the metrics module</p>
  <p class="prose"><strong>scikit-learn</strong> includes everything covered in this toolkit under one roof. The <code>metrics</code> module has every scorer, <code>model_selection</code> has every CV strategy, and <code>inspection</code> has permutation importance and partial dependence.</p>
  <div class="va">
    <div class="vl">// The scikit-learn evaluation workflow</div>
    <canvas id="skCanvas" role="img" aria-label="scikit-learn Evaluation Suite: The scikit-learn evaluation workflow" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> The same metrics follow a model into production, where <a href="../mlops/#model-monitoring">model monitoring</a> tracks them over time. For ordered data, <a href="../timeseries/#cross-validation-ts">time-series cross-validation</a> replaces the shuffled folds.</div>
  ${depthHtml('sklearn-eval')}
  <div class="topic-nav" id="nav-sklearn-eval"></div>
</div>`;
}

/* 36 — SHAP Library */
function buildSHAPLibrary() {
  return `<div class="topic" id="shap-library">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">36 — Python Power Tools</div><h2>SHAP <em>Library</em></h2></div>
    <span class="topic-badge">Python</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// TreeExplainer, force_plot, summary_plot, waterfall — the complete SHAP toolkit</p>
  <p class="prose">The <code>shap</code> library implements everything from <a href="#shap-values">SHAP Values</a> in production-ready code. <strong>TreeExplainer</strong> is exact and fast for tree models. The visualisations — waterfall, beeswarm, dependence — are publication-ready out of the box.</p>
  <div class="va">
    <div class="vl">// SHAP plot types overview</div>
    <canvas id="shapLibCanvas" role="img" aria-label="SHAP Library: SHAP plot types overview" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> SHAP splits a prediction into each feature’s share, as <a href="../markets/risk/#return-attribution">return attribution</a> splits a portfolio’s result into its sources. In production, <a href="../mlops/#fairness-audits">fairness audits</a> use the same attributions to check what a model relies on.</div>
  ${depthHtml('shap-library')}
  <div class="topic-nav" id="nav-shap-library"></div>
</div>`;
}

/* 37 — Optuna */
function buildOptuna() {
  return `<div class="topic" id="optuna">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">37 — Python Power Tools</div><h2><em>Optuna</em></h2></div>
    <span class="topic-badge">Python</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Smart hyperparameter tuning — TPE, pruning, study visualisation, any framework</p>
  <p class="prose"><strong>Optuna</strong> is a hyperparameter optimisation framework that uses <strong>TPE</strong> (Tree-structured Parzen Estimator) to intelligently search the parameter space. It supports <strong>pruning</strong> (killing bad trials early) and integrates with scikit-learn, XGBoost, PyTorch, and more.</p>
  <div class="va">
    <div class="vl">// Optuna search space exploration</div>
    <canvas id="optunaCanvas" role="img" aria-label="Optuna search space exploration" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Hyperparameter search is the outer loop around <a href="../ml-math/#gradient">gradient descent</a>: optimising the settings rather than the weights. Tune too hard on one validation set and you fit its noise — the trap described in <a href="../essays/#essay-signal">signal in the noise</a>.</div>
  ${depthHtml('optuna')}
  <div class="topic-nav" id="nav-optuna"></div>
</div>`;
}

/* 38 — pandas-ta & yfinance */
function buildPandasTA() {
  return `<div class="topic" id="pandas-ta">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">38 — Python Power Tools</div><h2>pandas-ta &amp; <em>yfinance</em></h2></div>
    <span class="topic-badge">Python</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Technical indicators + market data in one-liners</p>
  <p class="prose"><strong>yfinance</strong> downloads free historical market data from Yahoo Finance. <strong>pandas-ta</strong> computes 130+ technical indicators as DataFrame operations. Together, they're the fastest way to go from idea to analysis for any market strategy.</p>
  <div class="va">
    <div class="vl">// Price data with technical indicators</div>
    <canvas id="ptaCanvas" role="img" aria-label="pandas-ta &amp; yfinance: Price data with technical indicators" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> These are the same indicators explored in the <a href="../markets/indicators/">Markets &rarr; Indicators</a> collection — <a href="../markets/indicators/#rsi">RSI</a>, <a href="../markets/indicators/#macd">MACD</a>, <a href="../markets/indicators/#bollinger-bands">Bollinger Bands</a> and the rest — but here you can compute them yourself in Python and feed them into ML models as features.</div>
  ${depthHtml('pandas-ta')}
  <div class="topic-nav" id="nav-pandas-ta"></div>
</div>`;
}

/* 39 — scipy.stats & statsmodels */
function buildScipyStatsmodels() {
  return `<div class="topic" id="scipy-statsmodels">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">39 — Python Power Tools</div><h2>scipy.stats &amp; <em>statsmodels</em></h2></div>
    <span class="topic-badge">Python</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Statistical tests, regression diagnostics, time series — the Python stats foundation</p>
  <p class="prose"><strong>scipy.stats</strong> has every distribution and statistical test. <strong>statsmodels</strong> adds regression diagnostics, time series models (ARIMA, ADF), and proper statistical inference with confidence intervals — what sklearn deliberately leaves out.</p>
  <div class="va">
    <div class="vl">// scipy.stats + statsmodels workflow</div>
    <canvas id="ssCanvas" role="img" aria-label="scipy.stats &amp; statsmodels: scipy.stats + statsmodels workflow" height="220"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> statsmodels fits the <a href="../timeseries/#arima">ARIMA</a> and <a href="../timeseries/#garch">GARCH</a> models used across the Timeseries collection, so the diagnostics here are the ones you run on every forecast model there.</div>
  ${depthHtml('scipy-statsmodels')}
  <div class="topic-nav" id="nav-scipy-statsmodels"></div>
</div>`;
}
