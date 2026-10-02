/* ── Guides: content ──
   Task-first entry points into the topics. Two kinds:
   - tree: a question with options; each option leads to another question or
     to a result. Results name a method and link to the topics behind it.
   - checklist: grouped items, each with the topics that explain it.
   Topic references are connection keys without the leading slash and hash
   ("stats/stat-tests", "essays/essay-forking"); scripts/build-guides.mjs
   resolves them against connections.json and fails on any it cannot find. */

export const GUIDES = [
  {
    id: 'which-test',
    kind: 'tree',
    title: 'Which statistical test should I use?',
    blurb: 'Answer a few questions about your data and get the test, the SciPy call, and what to report with it.',
    minutes: 3,
    before: 'Decide the test before you look at the results — choosing it afterwards is a forking path. Whatever the test says, report the effect size and a confidence interval alongside the p-value.',
    beforeLinks: ['stats/hypothesis-testing', 'stats/effect-size', 'essays/essay-forking'],
    root: {
      q: 'What are you comparing?',
      options: [
        { a: 'One group’s average against a fixed value', next: {
          q: 'Is the data roughly normal, or do you have 30+ observations?',
          options: [
            { a: 'Yes', result: { name: 'One-sample t-test', code: 'scipy.stats.ttest_1samp(x, popmean)', why: 'Compares the sample mean with the fixed value, scaled by its standard error.', links: ['stats/stat-tests', 'stats/confidence-intervals'] } },
            { a: 'No — small and skewed', result: { name: 'Wilcoxon signed-rank test (or a bootstrap interval)', code: 'scipy.stats.wilcoxon(x - value)', why: 'Uses ranks of the differences, so a few extreme values cannot dominate.', links: ['stats/stat-tests', 'stats/bootstrap-methods'] } },
          ] } },
        { a: 'Two groups', next: {
          q: 'Are the measurements paired — the same units measured twice?',
          options: [
            { a: 'Paired (before/after, same users, same folds)', next: {
              q: 'Are the differences roughly normal, or are there 30+ pairs?',
              options: [
                { a: 'Yes', result: { name: 'Paired t-test', code: 'scipy.stats.ttest_rel(after, before)', why: 'Tests the mean of the paired differences; far more sensitive than treating the groups as independent.', links: ['stats/stat-tests', 'stats/comparing-runs'] } },
                { a: 'No', result: { name: 'Wilcoxon signed-rank test', code: 'scipy.stats.wilcoxon(after, before)', why: 'The rank-based version of the paired test.', links: ['stats/stat-tests'] } },
              ] } },
            { a: 'Independent groups', next: {
              q: 'What kind of outcome?',
              options: [
                { a: 'A number, roughly normal or with large samples', result: { name: 'Welch’s t-test', code: 'scipy.stats.ttest_ind(a, b, equal_var=False)', why: 'The safe default for two means: it does not assume equal variances.', links: ['stats/stat-tests', 'stats/hypothesis-testing', 'stats/power-analysis'] } },
                { a: 'A number with heavy tails, outliers, or ranks', result: { name: 'Mann–Whitney U test', code: 'scipy.stats.mannwhitneyu(a, b)', why: 'Tests whether one group tends to have larger values; with heavy tails it can be far more powerful than the t-test.', links: ['stats/stat-tests', 'stats/distribution-shape'] } },
                { a: 'Yes/no — a proportion (conversion, defect rate)', next: {
                  q: 'Do you expect at least 5 cases in every cell of the 2×2 table?',
                  options: [
                    { a: 'Yes', result: { name: 'Chi-square test (or two-proportion z-test)', code: 'scipy.stats.chi2_contingency(table)', why: 'Compares observed counts with those expected if the groups did not differ. For A/B tests, a Bayesian view is in Bayesian A/B.', links: ['stats/stat-tests', 'stats/bayesian-ab'] } },
                    { a: 'No — small counts', result: { name: 'Fisher’s exact test', code: 'scipy.stats.fisher_exact(table)', why: 'Exact for small samples, where the chi-square approximation breaks down.', links: ['stats/stat-tests'] } },
                  ] } },
              ] } },
          ] } },
        { a: 'Three or more groups', next: {
          q: 'What kind of outcome?',
          options: [
            { a: 'A number, roughly normal', result: { name: 'One-way ANOVA, then Tukey’s HSD', code: 'scipy.stats.f_oneway(a, b, c)  # then statsmodels pairwise_tukeyhsd', why: 'ANOVA says whether any group differs; the post-hoc test says which, while controlling for the extra comparisons. Use Welch’s ANOVA if the spreads differ a lot.', links: ['stats/stat-tests', 'stats/scipy-statsmodels'] } },
            { a: 'A number, skewed or with outliers', result: { name: 'Kruskal–Wallis test', code: 'scipy.stats.kruskal(a, b, c)', why: 'The rank-based version of ANOVA; follow up with pairwise tests and a multiple-testing correction.', links: ['stats/stat-tests', 'stats/scipy-statsmodels'] } },
            { a: 'A category', result: { name: 'Chi-square test of independence', code: 'scipy.stats.chi2_contingency(table)', why: 'Tests whether the category mix differs between groups.', links: ['stats/stat-tests'] } },
          ] } },
        { a: 'Whether two variables are related', next: {
          q: 'What do the variables look like?',
          options: [
            { a: 'Both numeric, roughly linear', result: { name: 'Pearson correlation', code: 'scipy.stats.pearsonr(x, y)', why: 'Measures straight-line association. Plot it first — r = 0 can hide a strong curved relationship.', links: ['stats/feature-correlation', 'stats/correlation-causation'] } },
            { a: 'Numeric but curved, ranked, or with outliers', result: { name: 'Spearman rank correlation (or mutual information)', code: 'scipy.stats.spearmanr(x, y)', why: 'Captures any monotonic relationship; mutual information captures non-monotonic ones too.', links: ['stats/feature-correlation', 'stats/information-gain'] } },
            { a: 'Both categories', result: { name: 'Chi-square test of independence', code: 'scipy.stats.chi2_contingency(table)', why: 'Tests whether the two categorisations are associated.', links: ['stats/stat-tests', 'stats/correlation-causation'] } },
          ] } },
        { a: 'Whether data follow a distribution, or two samples share one', result: { name: 'Kolmogorov–Smirnov test — plus a QQ plot', code: 'scipy.stats.ks_2samp(a, b)', why: 'With large samples the test flags differences too small to matter; judge the size of the difference on the plot.', links: ['stats/distribution-shape', 'stats/data-drift'] } },
      ] },
  },
  {
    id: 'which-metric',
    kind: 'tree',
    title: 'Which metric should I evaluate my model with?',
    blurb: 'From what your model predicts and what its mistakes cost to the metric that measures it honestly.',
    minutes: 3,
    before: 'Pick the metric before you run experiments, compare every model against a simple baseline, and measure on held-out data with a validation scheme that matches how the model will be used.',
    beforeLinks: ['stats/cross-validation', 'stats/sklearn-eval', 'essays/essay-forking'],
    root: {
      q: 'What does the model predict?',
      options: [
        { a: 'A class (yes/no, or one of several)', next: {
          q: 'How common is the class you care about?',
          options: [
            { a: 'Reasonably common (20–80%)', next: {
              q: 'Will you use the predicted probabilities, or only the decisions?',
              options: [
                { a: 'The probabilities (risk scores, pricing, ranking with thresholds later)', result: { name: 'Log loss or Brier score, plus a calibration plot', why: 'Rewards probabilities that are both sharp and honest; accuracy ignores how confident the model was.', links: ['ml-math/entropy', 'stats/confusion-matrix'] } },
                { a: 'Only the decisions', result: { name: 'Accuracy with the confusion matrix (F1 if errors cost about the same)', why: 'With balanced classes accuracy is meaningful — but always read the matrix behind it.', links: ['stats/confusion-matrix', 'ml-math/metrics'] } },
              ] } },
            { a: 'Rare (below 10%) — fraud, failures, disease', next: {
              q: 'Which mistake costs more?',
              options: [
                { a: 'Missing a real case', result: { name: 'Recall at a fixed precision, and the area under the precision–recall curve', why: 'Accuracy is meaningless here (predicting “no” for everything scores 99%). Set the threshold from the cost of each error.', links: ['stats/class-imbalance', 'stats/confusion-matrix', 'stats/roc-auc'] } },
                { a: 'A false alarm', result: { name: 'Precision at a fixed recall', why: 'Holds the alert volume to what people can handle, then asks how many alerts are real.', links: ['stats/confusion-matrix', 'stats/class-imbalance'] } },
                { a: 'I need one number for comparing models', result: { name: 'PR-AUC (precision–recall area)', why: 'With rare positives ROC-AUC can look good while most alarms are false; PR-AUC focuses on the rare class.', links: ['stats/roc-auc', 'stats/class-imbalance'] } },
              ] } },
          ] } },
        { a: 'A score used to rank or sort', next: {
          q: 'Does the whole ranking matter, or only the top of the list?',
          options: [
            { a: 'The whole ranking', result: { name: 'ROC-AUC', why: 'The probability that a random positive ranks above a random negative — threshold-free.', links: ['stats/roc-auc'] } },
            { a: 'Only the top results', result: { name: 'Precision@k (or recall@k)', why: 'Measures what users actually see. Common for retrieval and recommendation.', links: ['stats/roc-auc', 'llm/rag'] } },
          ] } },
        { a: 'A number (price, demand, duration)', next: {
          q: 'What do large errors cost?',
          options: [
            { a: 'In proportion to their size', result: { name: 'MAE (mean absolute error)', why: 'In the units of the target and robust to outliers; it rewards predicting the median.', links: ['stats/regression-metrics', 'ml-math/loss'] } },
            { a: 'Big errors are much worse than small ones', result: { name: 'RMSE', why: 'Squares errors before averaging, so big misses dominate; it rewards predicting the mean.', links: ['stats/regression-metrics', 'ml-math/loss'] } },
            { a: 'I compare across series of very different scale', result: { name: 'MASE (not MAPE)', why: 'Scales error by a naive forecast’s error; MAPE explodes near zero and treats over- and under-forecasts differently.', links: ['timeseries/backtesting-forecasts', 'timeseries/nbeats'] } },
            { a: 'I need to say how much variation is explained', result: { name: 'R² on held-out data', why: 'A comparison with predicting the mean; on new data it can be negative.', links: ['stats/regression-metrics'] } },
          ] } },
        { a: 'Future values of a time series', result: { name: 'MASE against seasonal naive, on a rolling-origin backtest — plus interval coverage', why: 'Forecasts must beat the obvious baseline across many forecast origins, and their intervals should contain the outcome as often as promised.', links: ['timeseries/backtesting-forecasts', 'timeseries/cross-validation-ts', 'timeseries/sarima'] } },
      ] },
  },
  {
    id: 'which-forecast',
    kind: 'tree',
    title: 'Which forecasting model should I start with?',
    blurb: 'Start simple, beat the baseline, then add complexity only where it earns its keep.',
    minutes: 3,
    before: 'Before any model: plot the series, forecast it with naive and seasonal-naive methods, and set up a rolling-origin backtest. Every model below has to beat those baselines on it.',
    beforeLinks: ['timeseries/decomposition', 'timeseries/backtesting-forecasts', 'timeseries/cross-validation-ts'],
    root: {
      q: 'What are you forecasting?',
      options: [
        { a: 'One series, or a handful', next: {
          q: 'Does it have a repeating seasonal pattern?',
          options: [
            { a: 'Yes, one season (e.g. yearly in monthly data)', result: { name: 'Exponential smoothing (Holt–Winters) or SARIMA', why: 'Both model trend and one season well; fit both and keep the one that wins the backtest. Damp the trend for long horizons.', links: ['timeseries/exponential-smoothing', 'timeseries/sarima', 'timeseries/arima'] } },
            { a: 'Yes, several at once (e.g. daily and weekly in hourly data)', result: { name: 'Regression with Fourier terms, or gradient boosting on lag and calendar features', why: 'Classical seasonal models assume one season of fixed length; Fourier terms and calendar features handle several.', links: ['timeseries/feature-engineering', 'timeseries/decomposition'] } },
            { a: 'No clear season', next: {
              q: 'Is there a trend?',
              options: [
                { a: 'Yes', result: { name: 'Damped-trend exponential smoothing, or ARIMA with differencing', why: 'Trends rarely continue unchanged; damping keeps long forecasts sensible.', links: ['timeseries/exponential-smoothing', 'timeseries/differencing', 'timeseries/arima'] } },
                { a: 'No', result: { name: 'Simple exponential smoothing or a low-order ARIMA', why: 'A level that moves slowly is all there is to model — anything more will fit noise.', links: ['timeseries/exponential-smoothing', 'timeseries/ar-models', 'timeseries/stationarity'] } },
              ] } },
          ] } },
        { a: 'Hundreds or more related series (products, stores, sensors)', result: { name: 'A global model across all series: gradient boosting on lag features, or N-BEATS / DeepAR with long histories', why: 'Learning across series beats fitting each alone once there are many; deep models pay off with many long, related histories.', links: ['timeseries/feature-engineering', 'timeseries/nbeats', 'timeseries/rnn-for-ts', 'timeseries/forecast-ensembles'] } },
        { a: 'A series driven by known factors (price, weather, promotions)', result: { name: 'Regression with ARIMA errors, or gradient boosting with those factors as features', why: 'Uses the drivers directly — but only if their future values are known or forecastable at prediction time.', links: ['timeseries/arima', 'timeseries/feature-engineering', 'timeseries/var-models'] } },
        { a: 'How much a price will move, not where it goes', result: { name: 'GARCH-type volatility model', why: 'Returns are close to unpredictable; their size clusters and can be forecast.', links: ['timeseries/garch', 'markets/risk/volatility-modeling'] } },
        { a: 'When something changes or goes wrong', result: { name: 'Changepoint or anomaly detection', why: 'A different question from forecasting: finding breaks and outliers rather than predicting values.', links: ['timeseries/changepoint-detection', 'timeseries/anomaly-detection'] } },
      ] },
  },
  {
    id: 'not-generalising',
    kind: 'tree',
    title: 'Why is my model not generalising?',
    blurb: 'A diagnosis in a few questions — from the gap between training and validation error to leakage and drift.',
    minutes: 3,
    before: 'Have three numbers ready: the training error, the validation error, and — if the model is live — the error in production.',
    beforeLinks: ['ml-math/bias-variance', 'stats/learning-curves'],
    root: {
      q: 'Compare the training and validation error. What do you see?',
      options: [
        { a: 'Both are high', result: { name: 'Underfitting (high bias)', why: 'The model cannot express the pattern. Try a more flexible model, better features or weaker regularisation — and check whether the labels are too noisy to learn from.', links: ['ml-math/bias-variance', 'ml-math/regularization', 'timeseries/feature-engineering'] } },
        { a: 'Training is low, validation much higher', next: {
          q: 'On a learning curve, is the validation error still falling as you add data?',
          options: [
            { a: 'Yes, the gap is still closing', result: { name: 'Overfitting that more data will fix', why: 'Collect more data or augment it; until then, regularise.', links: ['stats/learning-curves', 'ml-math/regularization'] } },
            { a: 'No, it has flattened', result: { name: 'Overfitting from too much flexibility', why: 'Regularise, simplify, stop earlier, or prune features — more data alone will not close the gap.', links: ['ml-math/regularization', 'ml-math/bias-variance', 'stats/permutation-importance'] } },
          ] } },
        { a: 'Validation looks good, but production is worse', next: {
          q: 'Which of these is true?',
          options: [
            { a: 'Preprocessing was fitted on all the data, or time-ordered data were split at random', result: { name: 'Leakage', why: 'The validation score saw information the live model never gets. Fit every step inside each fold and split time series by time.', links: ['stats/cross-validation', 'timeseries/cross-validation-ts', 'mlops/feature-stores'] } },
            { a: 'The best of many settings was picked on the validation set', result: { name: 'Selection bias (the forking paths)', why: 'The winning score was partly luck. Use nested cross-validation or a test set touched once.', links: ['stats/optuna', 'stats/cross-validation', 'essays/essay-forking'] } },
            { a: 'The live data look different from the training data', result: { name: 'Drift', why: 'Inputs, base rates or the relationship itself have moved. Monitor them and retrain on recent data.', links: ['stats/data-drift', 'mlops/drift-detection', 'mlops/model-monitoring'] } },
          ] } },
        { a: 'The validation score jumps between runs', result: { name: 'Noise in the measurement', why: 'A small validation set or random seeds move the score more than the change you are testing. Use repeated cross-validation and several seeds, and compare runs with a paired test.', links: ['mlops/experiment-tracking', 'stats/comparing-runs', 'ml-math/crossval'] } },
      ] },
  },
  {
    id: 'honest-backtest',
    kind: 'checklist',
    title: 'Is my backtest honest?',
    blurb: 'Fourteen checks that separate a strategy from a story. Tick them off; your progress stays in your browser.',
    minutes: 5,
    before: 'A backtest is a search through the past. Most of these checks guard against finding something that was never there.',
    beforeLinks: ['essays/essay-forking', 'stats/walk-forward'],
    groups: [
      { title: 'Data', items: [
        { t: 'Every input uses only information available at the moment of the decision — no look-ahead.', links: ['mlops/feature-stores', 'timeseries/feature-engineering'] },
        { t: 'The universe includes companies that were later delisted, acquired or went bankrupt.', links: ['stats/survivorship-bias', 'essays/essay-survivor'] },
        { t: 'Prices are adjusted for splits and dividends, consistently.', links: ['stats/pandas-ta', 'timeseries/resampling'] },
      ] },
      { title: 'Costs and capacity', items: [
        { t: 'Commissions, spreads and slippage are included — and the result survives doubling them.', links: ['markets/risk/stop-losses', 'stats/walk-forward'] },
        { t: 'Positions are small relative to traded volume; the strategy could actually be executed.', links: ['markets/risk/max-position'] },
      ] },
      { title: 'Validation', items: [
        { t: 'The rule was written down before testing, and the test period was never used for tuning.', links: ['stats/hypothesis-testing', 'stats/walk-forward'] },
        { t: 'Results come from walk-forward or out-of-sample periods, not from the period used to choose the rule.', links: ['stats/walk-forward', 'timeseries/cross-validation-ts'] },
        { t: 'Every variant tried is counted, and the result is judged against that number.', links: ['essays/essay-forking', 'stats/scipy-statsmodels'] },
        { t: 'Nearby parameter values work too — the result is not a single lucky setting.', links: ['stats/optuna', 'stats/monte-carlo'] },
        { t: 'The test covers different regimes: calm and crisis, rising and falling markets.', links: ['markets/risk/correlation-risk', 'timeseries/changepoint-detection'] },
      ] },
      { title: 'Results', items: [
        { t: 'Performance is compared with buy-and-hold or the relevant benchmark, risk-adjusted.', links: ['markets/risk/risk-adjusted-perf', 'markets/risk/benchmark-tracking'] },
        { t: 'The Sharpe ratio comes with a confidence interval, from enough history to mean something.', links: ['stats/sharpe-ratio', 'stats/confidence-intervals'] },
        { t: 'Drawdowns are studied as a distribution (resampled orders), not one historical path.', links: ['stats/monte-carlo', 'stats/max-drawdown'] },
        { t: 'The strategy’s edge has a reason to exist — and a reason it has not been competed away.', links: ['markets/risk/alpha-generation', 'markets/risk/factor-models'] },
      ] },
    ],
  },
  {
    id: 'production-ready',
    kind: 'checklist',
    title: 'Is my model ready for production?',
    blurb: 'Fourteen checks from packaging to rollback. Tick them off; your progress stays in your browser.',
    minutes: 5,
    before: 'Production is where a model meets data it was not trained on, at a scale nobody tested by hand. Most incidents trace back to a missing item below.',
    beforeLinks: ['essays/essay-reversible', 'mlops/incident-response'],
    groups: [
      { title: 'Build', items: [
        { t: 'The model is packaged with its exact environment, and the artifact is versioned.', links: ['mlops/model-packaging'] },
        { t: 'Training can be reproduced: pinned dependencies, seeds and a versioned dataset.', links: ['mlops/reproducibility', 'mlops/experiment-tracking'] },
        { t: 'It is registered with its lineage — which data, code and parameters produced it.', links: ['mlops/model-registry', 'mlops/lineage-tracking'] },
      ] },
      { title: 'Test', items: [
        { t: 'Input data pass quality gates (schema, ranges, missing values, freshness).', links: ['mlops/data-quality'] },
        { t: 'The release gate checks metrics per segment, not only overall.', links: ['mlops/ci-cd-ml'] },
        { t: 'Performance has been compared across relevant groups for fairness.', links: ['mlops/fairness-audits'] },
        { t: 'Latency is load-tested at the 99th percentile, at expected peak traffic.', links: ['mlops/latency-throughput', 'mlops/auto-scaling'] },
      ] },
      { title: 'Release', items: [
        { t: 'It runs in shadow mode or as a canary first, with enough traffic to detect a regression.', links: ['mlops/shadow-scoring', 'mlops/ab-rollout'] },
        { t: 'Rolling back is a single, tested step.', links: ['mlops/model-registry', 'mlops/incident-response'] },
      ] },
      { title: 'Operate', items: [
        { t: 'Inputs, predictions and — when they arrive — outcomes are monitored.', links: ['mlops/model-monitoring', 'mlops/drift-detection'] },
        { t: 'There are SLOs with burn-rate alerts, and an owner who gets paged.', links: ['mlops/alerting-slos'] },
        { t: 'A fallback answers when the model cannot (rules, cache, previous model).', links: ['mlops/incident-response', 'mlops/caching-layers'] },
        { t: 'The cost per prediction is known and tracked.', links: ['mlops/cost-governance'] },
        { t: 'Retraining has a trigger, a schedule and a validation gate.', links: ['mlops/ml-pipelines', 'mlops/orchestration'] },
      ] },
    ],
  },
];
