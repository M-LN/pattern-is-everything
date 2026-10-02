/* ═══════════════════════════════════════════════════════════════
   Timeseries Engineering — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-foundations', title:'Foundations',        topics:['home','stationarity','autocorrelation','decomposition','differencing','resampling'] },
  { id:'sec-classical',  title:'Classical Models',   topics:['ar-models','ma-models','arima','sarima','exponential-smoothing'] },
  { id:'sec-advanced',   title:'Advanced Models',    topics:['prophet','state-space','garch','var-models','changepoint-detection'] },
  { id:'sec-deep',       title:'Deep Learning',      topics:['rnn-for-ts','lstm-for-ts','temporal-cnn','transformers-for-ts','nbeats'] },
  { id:'sec-practice',   title:'Practice & Tooling', topics:['feature-engineering','cross-validation-ts','backtesting-forecasts','anomaly-detection','forecast-ensembles'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  stationarity:'Stationarity',
  autocorrelation:'Autocorrelation (ACF/PACF)',
  decomposition:'Decomposition',
  differencing:'Differencing',
  resampling:'Resampling & Frequency',
  'ar-models':'AR Models',
  'ma-models':'MA Models',
  arima:'ARIMA',
  sarima:'SARIMA',
  'exponential-smoothing':'Exponential Smoothing',
  prophet:'Prophet',
  'state-space':'State-Space Models',
  garch:'GARCH',
  'var-models':'VAR Models',
  'changepoint-detection':'Changepoint Detection',
  'rnn-for-ts':'RNNs for Time Series',
  'lstm-for-ts':'LSTM & GRU',
  'temporal-cnn':'Temporal CNN (TCN)',
  'transformers-for-ts':'Transformers for Time Series',
  nbeats:'N-BEATS & N-HiTS',
  'feature-engineering':'Feature Engineering',
  'cross-validation-ts':'Cross-Validation for TS',
  'backtesting-forecasts':'Backtesting Forecasts',
  'anomaly-detection':'Anomaly Detection',
  'forecast-ensembles':'Forecast Ensembles',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'stationarity', num:'01', title:'Stationarity', category:'Foundations', keywords:['mean','variance','ADF test','KPSS','unit root','trend','stationary','non-stationary','covariance'], content:'A stationary series has constant mean and variance — the foundation that most classical models require.' },
  { id:'autocorrelation', num:'02', title:'Autocorrelation (ACF/PACF)', category:'Foundations', keywords:['ACF','PACF','lag','correlogram','serial correlation','Ljung-Box','white noise','partial autocorrelation'], content:'How a series correlates with its own past — ACF and PACF plots reveal the memory structure of your data.' },
  { id:'decomposition', num:'03', title:'Decomposition', category:'Foundations', keywords:['trend','seasonality','residual','additive','multiplicative','STL','seasonal decompose','Loess'], content:'Splitting a series into trend, seasonal, and residual components — additive vs multiplicative decomposition.' },
  { id:'differencing', num:'04', title:'Differencing', category:'Foundations', keywords:['first difference','second difference','seasonal differencing','integration','d parameter','remove trend','unit root'], content:'Removing trends and seasonality by subtracting lagged values — the I in ARIMA.' },
  { id:'resampling', num:'05', title:'Resampling & Frequency', category:'Foundations', keywords:['downsampling','upsampling','interpolation','frequency conversion','resample','aggregate','asfreq','fill'], content:'Converting between frequencies — aggregating ticks to daily bars, interpolating gaps, and alignment.' },
  { id:'ar-models', num:'06', title:'AR Models', category:'Classical Models', keywords:['autoregressive','AR(p)','lag coefficients','Yule-Walker','past values','linear','order selection','regression on self'], content:'Predicting from past values — AR(p) models regress a series on its own lagged observations.' },
  { id:'ma-models', num:'07', title:'MA Models', category:'Classical Models', keywords:['moving average','MA(q)','error terms','white noise','shock','impulse response','past errors','invertibility'], content:'Predicting from past errors — MA(q) models express each value as a linear combination of past shocks.' },
  { id:'arima', num:'08', title:'ARIMA', category:'Classical Models', keywords:['ARIMA','p d q','Box-Jenkins','AIC','BIC','auto-arima','integrated','model selection','forecast'], content:'The workhorse of classical forecasting — combining autoregression, differencing, and moving average.' },
  { id:'sarima', num:'09', title:'SARIMA', category:'Classical Models', keywords:['seasonal ARIMA','P D Q m','seasonal order','monthly','weekly','annual cycle','seasonal pattern','periodic'], content:'Extending ARIMA with seasonal terms — capturing weekly, monthly, or annual cycles in data.' },
  { id:'exponential-smoothing', num:'10', title:'Exponential Smoothing', category:'Classical Models', keywords:['ETS','Holt','Holt-Winters','alpha','beta','gamma','simple exponential','double','triple','level','trend','season'], content:'Weighted averages of past observations — from simple smoothing to Holt-Winters with trend and seasonality.' },
  { id:'prophet', num:'11', title:'Prophet', category:'Advanced Models', keywords:['Facebook Prophet','additive model','holidays','changepoints','yearly','weekly','fourier','growth','logistic','saturating'], content:'Facebooks decomposable additive model — trend + seasonality + holidays with automatic changepoint detection.' },
  { id:'state-space', num:'12', title:'State-Space Models', category:'Advanced Models', keywords:['Kalman filter','hidden state','observation equation','state equation','innovation','smoothing','dynamic linear model','structural'], content:'A hidden state evolves over time, and we observe it with noise — Kalman filters and structural time series.' },
  { id:'garch', num:'13', title:'GARCH', category:'Advanced Models', keywords:['volatility clustering','ARCH','GARCH(1,1)','conditional variance','heteroscedasticity','financial volatility','risk','VaR'], content:'Modeling time-varying volatility — when the variance of returns itself has memory and clusters.' },
  { id:'var-models', num:'14', title:'VAR Models', category:'Advanced Models', keywords:['vector autoregression','multivariate','Granger causality','impulse response','cointegration','endogenous','cross-series'], content:'Modeling multiple interrelated time series simultaneously — each variable depends on its own and others lags.' },
  { id:'changepoint-detection', num:'15', title:'Changepoint Detection', category:'Advanced Models', keywords:['structural break','regime change','PELT','BOCPD','Bayesian online','cusum','shift detection','breakpoint'], content:'Finding where the statistical properties of a series change — structural breaks, regime shifts, and CUSUM.' },
  { id:'rnn-for-ts', num:'16', title:'RNNs for Time Series', category:'Deep Learning', keywords:['recurrent neural network','sequence','hidden state','backpropagation through time','BPTT','vanishing gradient','Elman'], content:'Processing sequences step by step with memory — the basics of recurrent networks for temporal data.' },
  { id:'lstm-for-ts', num:'17', title:'LSTM & GRU', category:'Deep Learning', keywords:['long short-term memory','gated recurrent unit','forget gate','input gate','output gate','cell state','long-range dependency'], content:'Gated recurrent architectures that learn long-range dependencies — the default deep learning baseline for time series.' },
  { id:'temporal-cnn', num:'18', title:'Temporal CNN (TCN)', category:'Deep Learning', keywords:['temporal convolutional network','dilated convolution','causal convolution','WaveNet','receptive field','1D convolution','parallel'], content:'Applying dilated causal convolutions to sequences — large receptive fields with parallelisable training.' },
  { id:'transformers-for-ts', num:'19', title:'Transformers for Time Series', category:'Deep Learning', keywords:['attention','Informer','Autoformer','PatchTST','time series transformer','positional encoding','self-attention','token'], content:'Attention-based architectures adapted for forecasting — from Informer to PatchTST and beyond.' },
  { id:'nbeats', num:'20', title:'N-BEATS & N-HiTS', category:'Deep Learning', keywords:['neural basis expansion','backward forecast','forward forecast','interpretable','generic','hierarchical','stack','block'], content:'Pure neural architectures with interpretable/generic stacks — no recurrence, no attention, just MLPs on lookback windows.' },
  { id:'feature-engineering', num:'21', title:'Feature Engineering', category:'Practice & Tooling', keywords:['lag features','rolling mean','rolling std','calendar features','Fourier features','holiday','day of week','cyclical encoding'], content:'Turning raw timestamps into predictive features — lags, rolling statistics, calendar variables, and Fourier terms.' },
  { id:'cross-validation-ts', num:'22', title:'Cross-Validation for TS', category:'Practice & Tooling', keywords:['expanding window','sliding window','walk-forward','temporal split','no shuffle','time split','train test split','purging'], content:'Never shuffle time series — expanding window, sliding window, and walk-forward validation strategies.' },
  { id:'backtesting-forecasts', num:'23', title:'Backtesting Forecasts', category:'Practice & Tooling', keywords:['MAE','RMSE','MAPE','SMAPE','forecast horizon','multi-step','rolling origin','out-of-sample','accuracy'], content:'Evaluating forecast quality with rolling-origin backtests — MAE, RMSE, MAPE, and multi-horizon metrics.' },
  { id:'anomaly-detection', num:'24', title:'Anomaly Detection', category:'Practice & Tooling', keywords:['outlier','spike','dip','z-score','isolation forest','autoencoder','threshold','contextual anomaly','seasonal anomaly'], content:'Finding abnormal observations in temporal data — statistical thresholds, isolation forests, and autoencoder methods.' },
  { id:'forecast-ensembles', num:'25', title:'Forecast Ensembles', category:'Practice & Tooling', keywords:['ensemble','stacking','weighted average','model combination','diverse','bagging','boosting','meta-learner','blend'], content:'Combining multiple forecasters for better accuracy — simple averages, weighted blends, and stacking.' },
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
        <span class="nav-section-arrow">▾</span>
      </div><div class="nav-items">`;
    sec.topics.forEach(tid => {
      if (tid === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">◉</span>Overview</div>`;
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
   CONTENT BUILDER — generates all topic HTML
   ═══════════════════════════════════════════════════════════════ */
/* depth:start — generated from the scratch scripts ts_snippets.py / ts_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "stationarity": {
  "example": "A thousand pairs of completely independent random walks. Correlating their levels gives an average absolute correlation of <strong>0.43</strong>, and <strong>41%</strong> of pairs exceed 0.5 — strong relationships that do not exist. Correlating their day-to-day changes gives <strong>0.05</strong>. Non-stationary series trend, and two trending series look related; this is Granger and Newbold’s “spurious regression”.",
  "fails": [
   "Stationarity tests have low power on short series; failing to reject a unit root is not proof of one.",
   "Differencing removes the trend and the spurious correlation, but also the long-run level information; cointegrated series need an error-correction model instead.",
   "Many real series are only stationary piecewise; a structural break looks like a unit root to the test (see Changepoint Detection)."
  ],
  "code": "rng = np.random.default_rng(0)\ncorr_levels, corr_diffs = [], []\nfor _ in range(1_000):                          # pairs of independent random walks\n    a, b = rng.normal(size=(2, 250)).cumsum(axis=1)\n    corr_levels.append(abs(np.corrcoef(a, b)[0, 1]))\n    corr_diffs.append(abs(np.corrcoef(np.diff(a), np.diff(b))[0, 1]))\nlevels, diffs = np.mean(corr_levels), np.mean(corr_diffs)\nshare_big = np.mean(np.array(corr_levels) &gt; 0.5)",
  "sources": [
   "C. W. J. Granger &amp; P. Newbold, “Spurious Regressions in Econometrics”, <em>Journal of Econometrics</em> 2(2), 1974",
   "D. A. Dickey &amp; W. A. Fuller, “Distribution of the Estimators for Autoregressive Time Series with a Unit Root”, <em>Journal of the American Statistical Association</em> 74(366), 1979",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "autocorrelation": {
  "example": "2,000 points from an AR(1) process with φ = 0.7. The sample ACF at lags 1–3 is <strong>0.698, 0.486, 0.345</strong>, against a theoretical 0.7, 0.49, 0.343 — a geometric decay. The PACF at lag 2 is <strong>−0.003</strong>: once lag 1 is known, lag 2 adds nothing, which is how the plot identifies an AR(1). The usual significance band is ±<strong>0.044</strong>.",
  "fails": [
   "The ±1.96/√n band assumes white noise and is checked at many lags at once; a few “significant” spikes are expected by chance.",
   "Trend and seasonality dominate the ACF; read it after making the series stationary.",
   "ACF and PACF patterns are clear for textbook processes and ambiguous for real data; use them to shortlist models, then compare forecasts."
  ],
  "code": "rng = np.random.default_rng(1)\nn, phi = 2_000, 0.7\ny = np.zeros(n)\nfor t in range(1, n): y[t] = phi * y[t - 1] + rng.normal()   # AR(1)\n\ndef acf(x, k):\n    x = x - x.mean(); return (x[:-k] * x[k:]).sum() / (x * x).sum()\n\nsample = [round(acf(y, k), 3) for k in (1, 2, 3)]\ntheory = [round(phi ** k, 3) for k in (1, 2, 3)]\nX = np.column_stack([y[1:-1], y[:-2]])           # PACF at lag 2: the lag-2 coefficient given lag 1\npacf2 = np.linalg.lstsq(X, y[2:], rcond=None)[0][1]\nband = 1.96 / np.sqrt(n)",
  "sources": [
   "<em>Time Series Analysis: Forecasting and Control</em> (5th ed.), G. E. P. Box, G. M. Jenkins, G. C. Reinsel &amp; G. M. Ljung, Wiley, 2015",
   "G. M. Ljung &amp; G. E. P. Box, “On a Measure of Lack of Fit in Time Series Models”, <em>Biometrika</em> 65(2), 1978",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "decomposition": {
  "example": "Ten years of monthly data: a trend, a seasonal wave of amplitude 10, and noise with standard deviation 3. Classical decomposition — a centred 2×12 moving average for the trend, then the average deviation for each month — recovers a seasonal amplitude of <strong>9.18</strong> and leaves residuals with a standard deviation of <strong>2.67</strong>, close to the noise that was put in.",
  "fails": [
   "Classical decomposition assumes the seasonal pattern never changes; STL lets it evolve.",
   "The centred moving average leaves no trend estimate for the first and last six months — exactly the most recent data you care about.",
   "Additive and multiplicative seasonality give different pictures; if the swings grow with the level, take logs first."
  ],
  "code": "rng = np.random.default_rng(2)\nt = np.arange(120)                                # ten years, monthly\nseason = 10 * np.sin(2 * np.pi * t / 12)\ny = pd.Series(0.5 * t + season + rng.normal(0, 3, 120))\ntrend = y.rolling(12, center=True).mean().rolling(2, center=True).mean()   # centred 2x12 moving average\ndetr = y - trend\nseasonal = detr.groupby(t % 12).transform('mean')\nresid = y - trend - seasonal\namp = (seasonal.max() - seasonal.min()) / 2       # true amplitude is 10",
  "sources": [
   "R. B. Cleveland, W. S. Cleveland, J. E. McRae &amp; I. Terpenning, “STL: A Seasonal-Trend Decomposition Procedure Based on Loess”, <em>Journal of Official Statistics</em> 6(1), 1990",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "differencing": {
  "example": "A series with a trend of 0.3 per step: its first difference has mean <strong>0.298</strong> and no trend left. But differencing a series that was already stationary does harm: white noise, differenced, gets a lag-1 autocorrelation of <strong>−0.49</strong> (theory: −0.5) and <strong>1.98×</strong> the variance. Over-differencing invents structure and adds noise.",
  "fails": [
   "Check whether differencing is needed (KPSS, ADF, the ACF) rather than differencing by habit.",
   "A deterministic trend is better modelled as a trend; differencing it creates a non-invertible MA term.",
   "Seasonal and ordinary differencing together can over-difference quickly; one seasonal difference is often enough."
  ],
  "code": "rng = np.random.default_rng(3)\nt = np.arange(500)\ntrend = 0.3 * t + rng.normal(0, 1, 500)\nd1 = np.diff(trend)\nnoise = rng.normal(0, 1, 500)                    # already stationary\nover = np.diff(noise)                            # differenced anyway\n\ndef acf1(x):\n    x = x - x.mean(); return (x[:-1] * x[1:]).sum() / (x * x).sum()",
  "sources": [
   "<em>Time Series Analysis: Forecasting and Control</em> (5th ed.), G. E. P. Box, G. M. Jenkins, G. C. Reinsel &amp; G. M. Ljung, Wiley, 2015",
   "D. Kwiatkowski, P. C. B. Phillips, P. Schmidt &amp; Y. Shin, “Testing the Null Hypothesis of Stationarity against the Alternative of a Unit Root”, <em>Journal of Econometrics</em> 54(1–3), 1992",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "resampling": {
  "example": "A day of +10% and a day of −10%: summing the returns says <strong>0%</strong>, compounding says <strong>−1%</strong>. Summing <em>log</em> returns gives the right <strong>−1%</strong>. And a week of prices ending at 95 has a closing price of <strong>95</strong> but an average of <strong>101.2</strong>: whether you take the last value, the mean, the sum or the maximum is a modelling decision.",
  "fails": [
   "Downsampling with the wrong aggregate (mean of prices, sum of rates) silently changes what the series means.",
   "Upsampling invents data points; forward-filling makes series look smoother and more autocorrelated than they are.",
   "Calendar periods differ in length (months, trading days), which matters for sums and rates."
  ],
  "code": "daily = np.array([0.10, -0.10])                  # +10% then -10%\nsummed = daily.sum()\ncompounded = np.prod(1 + daily) - 1\nlog_sum = np.expm1(np.log1p(daily).sum())        # log returns add up correctly\nprices = pd.Series([100, 102, 101, 108, 95], index=pd.date_range('2026-03-02', periods=5))\nweek = dict(last=prices.iloc[-1], mean=prices.mean())   # a weekly 'close' vs a weekly average",
  "sources": [
   "R. S. Tsay, <em>Analysis of Financial Time Series</em> (3rd ed.), Wiley, 2010 — simple versus log returns",
   "pandas documentation, “Time series / date functionality: resampling”, pandas.pydata.org",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "ar-models": {
  "example": "200 points from an AR(1) with φ = 0.8: least squares estimates <strong>0.763</strong>. From a value 3 above the mean, the forecasts are <strong>2.40, 1.92, 0.98, 0.32</strong> at 1, 2, 5 and 10 steps — decaying towards the mean, with a half-life of <strong>3.1</strong> steps. An AR forecast is a memory that fades geometrically.",
  "fails": [
   "Least squares underestimates φ in small samples, more so as φ approaches 1.",
   "Near φ = 1 the series behaves like a random walk and AR forecasts become fragile.",
   "Choosing p by in-sample fit overfits; compare information criteria or out-of-sample error."
  ],
  "code": "rng = np.random.default_rng(4)\nphi, n = 0.8, 200\ny = np.zeros(n)\nfor t in range(1, n): y[t] = phi * y[t - 1] + rng.normal()\nphi_hat = np.linalg.lstsq(y[:-1, None], y[1:], rcond=None)[0][0]\nlast = 3.0                                        # forecast from a value 3 above the mean of 0\nforecast = [round(last * phi ** h, 2) for h in (1, 2, 5, 10)]\nhalf_life = np.log(0.5) / np.log(phi)",
  "sources": [
   "<em>Time Series Analysis: Forecasting and Control</em> (5th ed.), G. E. P. Box, G. M. Jenkins, G. C. Reinsel &amp; G. M. Ljung, Wiley, 2015",
   "<em>Time Series Analysis</em>, J. D. Hamilton, Princeton University Press, 1994"
  ]
 },
 "ma-models": {
  "example": "An MA(1) process with θ = 0.6 has a lag-1 autocorrelation of θ/(1 + θ²) = <strong>0.441</strong> and none beyond. Simulated over 5,000 points, the sample ACF is <strong>0.447, 0.000, 0.009</strong>: one spike, then nothing. A shock is remembered for exactly one step, and so is anything a forecast can say about it.",
  "fails": [
   "Different θ values can give the same ACF (θ and 1/θ); only the invertible one is used.",
   "Beyond q steps an MA forecast is just the mean — useful to know before trusting long horizons.",
   "MA terms are estimated from unobserved errors, so fitting is harder and less stable than for AR terms."
  ],
  "code": "rng = np.random.default_rng(5)\ntheta, n = 0.6, 5_000\ne = rng.normal(size=n + 1)\ny = e[1:] + theta * e[:-1]                        # MA(1)\n\ndef acf(x, k):\n    x = x - x.mean(); return (x[:-k] * x[k:]).sum() / (x * x).sum()\n\ntheory1 = theta / (1 + theta ** 2)\nsample = [round(acf(y, k), 3) for k in (1, 2, 3)]",
  "sources": [
   "<em>Time Series Analysis: Forecasting and Control</em> (5th ed.), G. E. P. Box, G. M. Jenkins, G. C. Reinsel &amp; G. M. Ljung, Wiley, 2015",
   "<em>Time Series Analysis</em>, J. D. Hamilton, Princeton University Press, 1994"
  ]
 },
 "arima": {
  "example": "For a random walk — ARIMA(0,1,0) — with one-step error 1, the 95% interval is ±<strong>1.96</strong> one step ahead, ±<strong>3.92</strong> at 4, ±<strong>6.79</strong> at 12 and ±<strong>14.13</strong> at 52. Uncertainty grows with the square root of the horizon, without limit. For integrated series the forecast itself is easy; honest intervals are the point.",
  "fails": [
   "Automatic order selection (auto.arima and its kin) is a search; the chosen model is optimistic about its own fit.",
   "Intervals assume the model is right and the errors normal; real coverage is usually lower than stated.",
   "Simple benchmarks such as naive or seasonal naive often come close; always report them alongside."
  ],
  "code": "sigma = 1.0                                       # one-step error of a random walk, ARIMA(0,1,0)\nwidth = {h: round(1.96 * sigma * np.sqrt(h), 2) for h in (1, 4, 12, 52)}   # 95% interval half-width",
  "sources": [
   "G. E. P. Box &amp; G. M. Jenkins, <em>Time Series Analysis: Forecasting and Control</em>, Holden-Day, 1970",
   "R. J. Hyndman &amp; Y. Khandakar, “Automatic Time Series Forecasting: The forecast Package for R”, <em>Journal of Statistical Software</em> 27(3), 2008",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "sarima": {
  "example": "Eight years of monthly data with a strong annual cycle. Forecasting the last year by repeating the last month gives a mean absolute error of <strong>11.48</strong>; repeating the same month last year — the seasonal naive forecast — gives <strong>2.86</strong>. Any seasonal model has to beat that second number to earn its parameters.",
  "fails": [
   "Seasonal differencing assumes a season of fixed length and shape; moving holidays such as Easter, or several seasonalities at once (daily and weekly in hourly data), break it.",
   "Searching the many (p,d,q)(P,D,Q) orders for the best AIC is a <a href=\"../essays/#essay-forking\">garden of forking paths</a> of its own: check the chosen model on data it was not selected on.",
   "Long seasonal periods (52 weeks, 24 hours × 7 days) make SARIMA slow and unstable; Fourier terms or other models handle them better."
  ],
  "code": "rng = np.random.default_rng(6)\nt = np.arange(96)\ny = 100 + 0.2 * t + 15 * np.sin(2 * np.pi * t / 12) + rng.normal(0, 2, 96)   # eight years, monthly\ntrain, test = y[:84], y[84:]\nnaive = np.full(12, train[-1])                    # repeat the last month\nseasonal_naive = train[-12:]                      # repeat the same month last year\nmae = lambda f: np.abs(test - f).mean()",
  "sources": [
   "<em>Time Series Analysis: Forecasting and Control</em> (5th ed.), G. E. P. Box, G. M. Jenkins, G. C. Reinsel &amp; G. M. Ljung, Wiley, 2015",
   "R. J. Hyndman &amp; Y. Khandakar, “Automatic Time Series Forecasting: The forecast Package for R”, <em>Journal of Statistical Software</em> 27(3), 2008",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "exponential-smoothing": {
  "example": "After a level shift, simple exponential smoothing needs <strong>10.3</strong> steps to cover 90% of the jump with α = 0.2, <strong>3.3</strong> with 0.5 and <strong>1.4</strong> with 0.8 — smoothness against speed. A trend of 1 per period damped by φ = 0.9 adds at most <strong>9</strong> more in total, while an undamped trend adds <strong>24</strong> in 24 periods.",
  "fails": [
   "Simple smoothing forecasts a flat line, so on trending or seasonal data it lags behind; that is what Holt’s and Holt–Winters’ extensions are for.",
   "Over long horizons a damped trend usually forecasts better than a straight one (Gardner &amp; McKenzie 1985), because trends rarely continue unchanged.",
   "α fitted to minimise one-step error may be wrong for the horizon you actually forecast."
  ],
  "code": "steps_to_90 = {a: round(np.log(0.1) / np.log(1 - a), 1) for a in (0.2, 0.5, 0.8)}   # after a level shift\nb, phi = 1.0, 0.9                                  # trend per period, damping\ndamped_total = b * phi / (1 - phi)                 # where a damped trend's extra growth levels off\nstraight_24 = b * 24                               # an undamped trend 24 periods ahead",
  "sources": [
   "C. C. Holt, “Forecasting Seasonals and Trends by Exponentially Weighted Moving Averages”, <em>International Journal of Forecasting</em> 20(1), 2004 (1957 report reprinted)",
   "P. R. Winters, “Forecasting Sales by Exponentially Weighted Moving Averages”, <em>Management Science</em> 6(3), 1960",
   "E. S. Gardner Jr. &amp; E. McKenzie, “Forecasting Trends in Time Series”, <em>Management Science</em> 31(10), 1985"
  ]
 },
 "prophet": {
  "example": "Four years of growth at 1 a month, then 8 months at 3 a month. A trend model that extends the latest segment forecasts <strong>227</strong> two years out; the overall slope (<strong>1.13</strong>) gives <strong>188</strong>. Prophet’s piecewise trend behaves like the first: whatever happened since the last changepoint is projected forward with confidence.",
  "fails": [
   "Its intervals capture trend uncertainty only roughly, so they are often too narrow for long horizons.",
   "Independent comparisons have often found well-tuned exponential smoothing or ARIMA as accurate or better; treat Prophet as one candidate, not a default.",
   "Holiday and changepoint settings are powerful and easy to overfit."
  ],
  "code": "t = np.arange(48)                                 # four years, monthly\ny = np.where(t &lt; 40, 100 + 1.0 * t, 140 + 3.0 * (t - 40))   # growth triples in the last 8 months\nh = 24\nlast_slope = (y[-1] - y[-9]) / 8                  # the most recent trend segment\noverall = np.polyfit(t, y, 1)[0]\nf_last = y[-1] + last_slope * h\nf_overall = y[-1] + overall * h",
  "sources": [
   "S. J. Taylor &amp; B. Letham, “Forecasting at Scale”, <em>The American Statistician</em> 72(1), 2018",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "state-space": {
  "example": "In the local level model the Kalman filter settles to a fixed gain set by how noisy the state is compared with the measurements. With a signal-to-noise ratio of 0.01 the gain is <strong>0.095</strong>; at 0.1, <strong>0.27</strong>; at 1, <strong>0.618</strong>; at 10, <strong>0.916</strong>. That gain is exactly simple exponential smoothing’s α — smoothing is a Kalman filter with a particular model.",
  "fails": [
   "The filter is only optimal if the noise variances are right; misjudged variances give confident but wrong estimates.",
   "Linear Gaussian assumptions break with outliers; one bad measurement moves the state a lot.",
   "Many parametrisations fit the same data; a good fit does not identify the “true” hidden states."
  ],
  "code": "def steady_gain(q, r=1.0):                     # local level model: state noise q, observation noise r\n    P = (q + np.sqrt(q * q + 4 * q * r)) / 2       # steady-state prior variance\n    return P / (P + r)                              # Kalman gain = the SES smoothing weight\n\ngains = {q: round(steady_gain(q), 3) for q in (0.01, 0.1, 1, 10)}",
  "sources": [
   "R. E. Kalman, “A New Approach to Linear Filtering and Prediction Problems”, <em>Journal of Basic Engineering</em> 82(1), 1960",
   "<em>Time Series Analysis by State Space Methods</em> (2nd ed.), J. Durbin &amp; S. J. Koopman, Oxford University Press, 2012",
   "<em>Forecasting, Structural Time Series Models and the Kalman Filter</em>, A. C. Harvey, Cambridge University Press, 1989"
  ]
 },
 "garch": {
  "example": "GARCH(1,1) with ω = 0.05, α = 0.10 and β = 0.85 has a long-run variance of ω/(1 − α − β) = <strong>1</strong>, and a volatility shock halves in <strong>13.5</strong> days. Simulated returns are fat-tailed — kurtosis <strong>3.58</strong> against 3 for a normal — even though every day’s shock is normal. Clustering alone produces fat tails.",
  "fails": [
   "GARCH(1,1) is hard to beat (Hansen &amp; Lunde 2005), but it reacts to large moves after they happen; it does not foresee them.",
   "Persistence close to 1 may be an artefact of structural breaks in the data.",
   "Symmetric GARCH misses the leverage effect: falls raise volatility more than rises (EGARCH, GJR)."
  ],
  "code": "rng = np.random.default_rng(7)\nomega, alpha, beta, n = 0.05, 0.10, 0.85, 20_000\nlong_run = omega / (1 - alpha - beta)\nhalf_life = np.log(0.5) / np.log(alpha + beta)     # days for a volatility shock to halve\nr, s2 = np.zeros(n), np.full(n, long_run)\nfor t in range(1, n):\n    s2[t] = omega + alpha * r[t - 1] ** 2 + beta * s2[t - 1]\n    r[t] = np.sqrt(s2[t]) * rng.normal()\nkurt = ((r - r.mean()) ** 4).mean() / r.var() ** 2   # normal = 3",
  "sources": [
   "R. F. Engle, “Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of United Kingdom Inflation”, <em>Econometrica</em> 50(4), 1982",
   "T. Bollerslev, “Generalized Autoregressive Conditional Heteroskedasticity”, <em>Journal of Econometrics</em> 31(3), 1986",
   "P. R. Hansen &amp; A. Lunde, “A Forecast Comparison of Volatility Models: Does Anything Beat a GARCH(1,1)?”, <em>Journal of Applied Econometrics</em> 20(7), 2005"
  ]
 },
 "var-models": {
  "example": "Two series where x drives y with a one-step lag (true effect 0.6). A VAR(1) fitted to 500 points recovers it: in y’s equation the coefficient on yesterday’s x is <strong>0.60</strong>, while x’s equation puts only <strong>0.03</strong> on yesterday’s y. That asymmetry is what Granger causality tests — x helps predict y, not the reverse.",
  "fails": [
   "Granger causality is about prediction, not cause: a third series driving both with different lags produces it too.",
   "Parameters grow with the square of the number of series times the lags; VARs overfit fast without shrinkage.",
   "Non-stationary series need differencing or a cointegrated VAR (VECM)."
  ],
  "code": "rng = np.random.default_rng(8)\nn = 500\nx, y = np.zeros(n), np.zeros(n)\nfor t in range(1, n):\n    x[t] = 0.5 * x[t - 1] + rng.normal()\n    y[t] = 0.3 * y[t - 1] + 0.6 * x[t - 1] + rng.normal()   # x leads y by one step\nZ = np.column_stack([x[:-1], y[:-1]])\nA = np.linalg.lstsq(Z, np.column_stack([x[1:], y[1:]]), rcond=None)[0].T   # rows: equations for x and y",
  "sources": [
   "C. W. J. Granger, “Investigating Causal Relations by Econometric Models and Cross-Spectral Methods”, <em>Econometrica</em> 37(3), 1969",
   "C. A. Sims, “Macroeconomics and Reality”, <em>Econometrica</em> 48(1), 1980",
   "<em>New Introduction to Multiple Time Series Analysis</em>, H. Lütkepohl, Springer, 2005"
  ]
 },
 "changepoint-detection": {
  "example": "A series whose mean moves from 0 to 1.5 at t = 60. The single best split is found at exactly <strong>60</strong>, removing <strong>42%</strong> of the squared error. On a series where nothing happens, the method still returns a “best” split (at t = 13) — but it removes only <strong>1.8%</strong>. Whether a change is real depends on a penalty, not on the method finding one.",
  "fails": [
   "A changepoint method will always find changes if you let it: the penalty, or the number of changepoints allowed, decides how many, so tune it on data with known breaks.",
   "A detected shift in the mean can also be a change in variance or a single outlier, depending on what the method assumes.",
   "An online detector can only flag a break some steps after it happened, once enough evidence has arrived."
  ],
  "code": "rng = np.random.default_rng(9)\ndef best_split(y):                                # the single split that most reduces squared error\n    total = ((y - y.mean()) ** 2).sum()\n    gains = [total - ((y[:k] - y[:k].mean()) ** 2).sum() - ((y[k:] - y[k:].mean()) ** 2).sum() for k in range(5, len(y) - 5)]\n    k = int(np.argmax(gains)); return k + 5, gains[k] / total\n\nshift = np.r_[rng.normal(0, 1, 60), rng.normal(1.5, 1, 40)]   # the mean moves at t = 60\nflat = rng.normal(0, 1, 100)                                   # nothing happens\nfound, found_flat = best_split(shift), best_split(flat)",
  "sources": [
   "E. S. Page, “Continuous Inspection Schemes”, <em>Biometrika</em> 41(1/2), 1954 — CUSUM",
   "R. Killick, P. Fearnhead &amp; I. A. Eckley, “Optimal Detection of Changepoints with a Linear Computational Cost”, <em>Journal of the American Statistical Association</em> 107(500), 2012",
   "C. Truong, L. Oudre &amp; N. Vayatis, “Selective Review of Offline Change Point Detection Methods”, <em>Signal Processing</em> 167, 2020"
  ]
 },
 "rnn-for-ts": {
  "example": "Prices around 100 fed straight into a tanh unit with small random weights: <strong>77%</strong> of the activations are saturated above 0.99, where the gradient is almost zero. Standardise the same prices first and <strong>0%</strong> are. Neural forecasters need scaled inputs — usually per series — before anything else matters.",
  "fails": [
   "Scaling with statistics from the whole series leaks the future into training; fit the scaler on the training window only.",
   "RNNs need many related series to shine; on a single short series classical models often win (Hewamalage et al. 2021).",
   "Recursive multi-step forecasting compounds errors; direct or sequence-to-sequence outputs are usually more stable."
  ],
  "code": "rng = np.random.default_rng(10)\nprices = 100 + rng.normal(0, 5, 1_000)            # raw prices around 100\nw = rng.normal(0, 0.1, 1_000)                      # small random input weights\nsaturated_raw = np.mean(np.abs(np.tanh(w * prices)) &gt; 0.99)\nz = (prices - prices.mean()) / prices.std()        # standardized\nsaturated_std = np.mean(np.abs(np.tanh(w * z)) &gt; 0.99)",
  "sources": [
   "H. Hewamalage, C. Bergmeir &amp; K. Bandara, “Recurrent Neural Networks for Time Series Forecasting: Current Status and Future Directions”, <em>International Journal of Forecasting</em> 37(1), 2021",
   "D. Salinas, V. Flunkert, J. Gasthaus &amp; T. Januschowski, “DeepAR: Probabilistic Forecasting with Autoregressive Recurrent Networks”, <em>International Journal of Forecasting</em> 36(3), 2020"
  ]
 },
 "lstm-for-ts": {
  "example": "On a random walk, “tomorrow equals today” has a mean absolute error of <strong>0.79</strong>; forecasting the training average gives <strong>8.87</strong>; adding the historical drift does no better than naive (<strong>0.79</strong>). No model — LSTM or otherwise — can beat naive on a pure random walk, which is why every forecasting result should be reported against it.",
  "fails": [
   "Plotted one step ahead, a naive-like model looks impressively accurate; the plot hides that it is just copying yesterday.",
   "In the M-competitions, machine-learning methods often trailed simple statistical ones (Makridakis et al. 2018), especially on single series.",
   "LSTMs need careful tuning and many series; their gains are real on large, related datasets."
  ],
  "code": "rng = np.random.default_rng(11)\ny = 100 + rng.normal(0, 1, 2_000).cumsum()       # a random walk, like many prices\ntest = y[1_000:]\nnaive = np.abs(test[1:] - test[:-1]).mean()       # tomorrow = today\nmean_fc = np.abs(test[1:] - y[:1_000].mean()).mean()   # tomorrow = the training average\ndrift = np.abs(test[1:] - (test[:-1] + np.diff(y[:1_000]).mean())).mean()",
  "sources": [
   "S. Hochreiter &amp; J. Schmidhuber, “Long Short-Term Memory”, <em>Neural Computation</em> 9(8), 1997",
   "S. Makridakis, E. Spiliotis &amp; V. Assimakopoulos, “Statistical and Machine Learning Forecasting Methods: Concerns and Ways Forward”, <em>PLoS ONE</em> 13(3), 2018",
   "H. Hewamalage, C. Bergmeir &amp; K. Bandara, “Recurrent Neural Networks for Time Series Forecasting: Current Status and Future Directions”, <em>International Journal of Forecasting</em> 37(1), 2021"
  ]
 },
 "temporal-cnn": {
  "example": "With kernel size 3 and two convolutions per block, dilations 1, 2, 4 and 8 give a receptive field of <strong>61</strong> steps. Doubling up to 128 over eight blocks gives <strong>1,021</strong>. The history a TCN can use is fixed by its architecture — for hourly data with a weekly pattern (168 steps), the smaller network cannot even see one week back.",
  "fails": [
   "A receptive field longer than the useful history adds parameters and noise.",
   "Causal padding must be right; a single non-causal layer leaks the future and makes results look excellent.",
   "TCNs and RNNs trade places across benchmarks (Bai, Kolter &amp; Koltun 2018); neither dominates."
  ],
  "code": "def receptive_field(k, dilations, convs_per_block=2):\n    return 1 + convs_per_block * (k - 1) * sum(dilations)\n\nsmall = receptive_field(3, [1, 2, 4, 8])\nlarge = receptive_field(3, [2 ** i for i in range(8)])     # dilations 1..128",
  "sources": [
   "S. Bai, J. Z. Kolter &amp; V. Koltun, “An Empirical Evaluation of Generic Convolutional and Recurrent Networks for Sequence Modeling”, arXiv:1803.01271, 2018",
   "A. van den Oord et al., “WaveNet: A Generative Model for Raw Audio”, arXiv:1609.03499, 2016"
  ]
 },
 "transformers-for-ts": {
  "example": "Hourly data with a daily cycle. A single linear layer mapping the last 48 hours to the next hour has a mean absolute error of <strong>0.82</strong> on held-out data, against <strong>1.08</strong> for the seasonal naive forecast. Zeng et al. (2023) showed that linear models like this match or beat several published transformer forecasters on standard benchmarks.",
  "fails": [
   "Many transformer forecasting results were not compared against strong simple baselines; check that they are.",
   "Attention over individual time steps is a poor fit for noisy series; patching (PatchTST) helped by attending over segments.",
   "Pre-trained “foundation” forecasters are promising but vary by domain; evaluate them on your own data."
  ],
  "code": "rng = np.random.default_rng(12)\nt = np.arange(600)\ny = 10 * np.sin(2 * np.pi * t / 24) + 0.01 * t + rng.normal(0, 1, 600)   # hourly with a daily cycle\nL = 48                                             # look back two days\nX = np.array([y[i:i + L] for i in range(len(y) - L)]); target = y[L:]\nsplit = 400\nw = np.linalg.lstsq(np.c_[X[:split], np.ones(split)], target[:split], rcond=None)[0]   # one linear layer\nlinear = np.abs(np.c_[X[split:], np.ones(len(X) - split)] @ w - target[split:]).mean()\nseasonal_naive = np.abs(X[split:, -24] - target[split:]).mean()",
  "sources": [
   "H. Zhou et al., “Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting”, <em>AAAI</em>, 2021",
   "A. Zeng, M. Chen, L. Zhang &amp; Q. Xu, “Are Transformers Effective for Time Series Forecasting?”, <em>AAAI</em>, 2023",
   "Y. Nie, N. H. Nguyen, P. Sinthong &amp; J. Kalagnanam, “A Time Series Is Worth 64 Words: Long-term Forecasting with Transformers”, <em>ICLR</em>, 2023"
  ]
 },
 "nbeats": {
  "example": "MASE, the scaled error used in the M4 competition where N-BEATS made its name, divides the forecast error by the in-sample error of the naive forecast. Here the naive forecast’s average in-sample error is <strong>2.82</strong>, and a three-month forecast scores a MASE of <strong>0.59</strong> — 41% better than naive on the scale of this series. Unlike MAPE it never divides by an actual value.",
  "fails": [
   "Its headline results came on the M4 competition’s univariate series and used large ensembles of models.",
   "With few series, short histories or important external covariates, simple statistical baselines often hold their own — compare against them before adopting a deep model.",
   "N-BEATS ignores covariates by design; N-HiTS and others add them."
  ],
  "code": "train = np.array([12, 15, 14, 18, 20, 17, 21, 24, 22, 26, 28, 25.0])   # made up\ntest = np.array([29, 31, 28.0])\nforecast = np.array([28, 29, 30.0])\nscale = np.abs(np.diff(train)).mean()              # in-sample error of the naive forecast\nmase = np.abs(test - forecast).mean() / scale       # &lt; 1 beats naive on the scale of the training data",
  "sources": [
   "B. N. Oreshkin, D. Carpov, N. Chapados &amp; Y. Bengio, “N-BEATS: Neural Basis Expansion Analysis for Interpretable Time Series Forecasting”, <em>ICLR</em>, 2020",
   "S. Makridakis, E. Spiliotis &amp; V. Assimakopoulos, “The M4 Competition: 100,000 Time Series and 61 Forecasting Methods”, <em>International Journal of Forecasting</em> 36(1), 2020",
   "C. Challu et al., “N-HiTS: Neural Hierarchical Interpolation for Time Series Forecasting”, <em>AAAI</em>, 2023"
  ]
 },
 "feature-engineering": {
  "example": "Daily changes of a random walk are unpredictable by construction. A 3-day rolling mean that includes today correlates <strong>0.58</strong> with today’s value — it contains it. Shift the window by one day and the correlation is <strong>−0.02</strong>. Most too-good time-series features are leaks like this one.",
  "fails": [
   "Every rolling, lag and target-encoded feature must be computed only from data available at prediction time.",
   "Features built on the full dataset (normalisation, fills, encodings) leak too; build them inside each training window.",
   "Hundreds of automatic features invite overfitting; keep the ones that survive a time-ordered validation."
  ],
  "code": "rng = np.random.default_rng(13)\ny = pd.Series(rng.normal(0, 1, 2_000).cumsum()).diff().dropna()   # daily changes: unpredictable\nleaky = y.rolling(3).mean()                        # includes today's value\nhonest = y.shift(1).rolling(3).mean()              # only yesterday and before\ncorr_leaky, corr_honest = y.corr(leaky), y.corr(honest)",
  "sources": [
   "S. Kaufman, S. Rosset, C. Perlich &amp; O. Stitelman, “Leakage in Data Mining: Formulation, Detection, and Avoidance”, <em>ACM Transactions on Knowledge Discovery from Data</em> 6(4), 2012",
   "M. Christ, N. Braun, J. Neuffer &amp; A. W. Kempa-Liehr, “Time Series FeatuRe Extraction on Basis of Scalable Hypothesis Tests (tsfresh)”, <em>Neurocomputing</em> 307, 2018",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "cross-validation-ts": {
  "example": "100 time steps, four folds of 10 test points each, with a gap of 2. The training windows grow — 0–58, 0–68, 0–78, 0–88 — and each is followed by its test window 60–70, 70–80, 80–90, 90–100. The model is always trained on the past and tested on the future, and the gap keeps lagged features from bridging the two.",
  "fails": [
   "Hyperparameters tuned on these folds still need a final, untouched test period.",
   "Early folds have little training data, so their errors are pessimistic; weight or drop them knowingly.",
   "For purely autoregressive models with uncorrelated errors, ordinary k-fold can be valid (Bergmeir et al. 2018) — but only then."
  ],
  "code": "n, folds, test_size, gap = 100, 4, 10, 2\nsplits = []\nfor i in range(folds):                             # expanding window\n    test_start = n - (folds - i) * test_size\n    splits.append(((0, test_start - gap), (test_start, test_start + test_size)))",
  "sources": [
   "C. Bergmeir &amp; J. M. Benítez, “On the Use of Cross-Validation for Time Series Predictor Evaluation”, <em>Information Sciences</em> 191, 2012",
   "C. Bergmeir, R. J. Hyndman &amp; B. Koo, “A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction”, <em>Computational Statistics &amp; Data Analysis</em> 120, 2018",
   "L. J. Tashman, “Out-of-Sample Tests of Forecasting Accuracy: An Analysis and Review”, <em>International Journal of Forecasting</em> 16(4), 2000"
  ]
 },
 "backtesting-forecasts": {
  "example": "Five forecasts. MAE is <strong>8.6</strong> and RMSE <strong>8.82</strong>, both in the units of the data. MAPE is <strong>86.6%</strong>, because one actual value is 2 and an error of 8 there counts as 400%. Leave that point out and MAPE is <strong>8.2%</strong>. Percentage errors explode near zero; scaled errors such as MASE do not.",
  "fails": [
   "MAPE punishes over-forecasts and under-forecasts differently and is undefined at zero.",
   "One backtest origin is one draw; roll the origin and report the spread.",
   "Choosing the metric after seeing the results is another forking path; decide it first."
  ],
  "code": "actual = np.array([120.0, 80.0, 2.0, 150.0, 95.0])\nforecast = np.array([110.0, 90.0, 10.0, 140.0, 100.0])\nerr = actual - forecast\nmae = np.abs(err).mean()\nrmse = np.sqrt((err ** 2).mean())\nmape = np.abs(err / actual).mean() * 100\nmape_without_small = np.abs(err / actual)[actual &gt; 10].mean() * 100",
  "sources": [
   "R. J. Hyndman &amp; A. B. Koehler, “Another Look at Measures of Forecast Accuracy”, <em>International Journal of Forecasting</em> 22(4), 2006",
   "L. J. Tashman, “Out-of-Sample Tests of Forecasting Accuracy: An Analysis and Review”, <em>International Journal of Forecasting</em> 16(4), 2000",
   "<em>Forecasting: Principles and Practice</em> (3rd ed.), R. J. Hyndman &amp; G. Athanasopoulos, OTexts, 2021"
  ]
 },
 "anomaly-detection": {
  "example": "Two years of daily temperatures with warm summers, and one 15° day in January. Against the whole series its z-score is <strong>0.58</strong> — completely normal. Against the surrounding fortnight it is <strong>7.87</strong>. Contextual anomalies need a local baseline. And a 3σ rule checked on 10,000 metrics a day raises about <strong>27</strong> false alarms a day by chance.",
  "fails": [
   "Thresholds set on normal-looking history trigger constantly once the data drifts; baselines need updating.",
   "Anomalies in the training window distort the baseline itself; use robust statistics (median, MAD).",
   "Most alerts at scale are false; tune for what the people receiving them can act on."
  ],
  "code": "rng = np.random.default_rng(14)\nday = np.arange(730)\ntemp = 10 - 12 * np.cos(2 * np.pi * day / 365) + rng.normal(0, 2, 730)   # two years, warm summers\ntemp[20] = 15                                      # a warm day in January: normal in July\nz_global = (temp - temp.mean()) / temp.std()\nresid = temp - pd.Series(temp).rolling(15, center=True, min_periods=5).median()\nz_local = resid / resid.std()\nflags = (round(z_global[20], 2), round(z_local[20], 2))\nfalse_alarms_per_day = 10_000 * 0.0027             # 10,000 metrics checked daily at 3 sigma",
  "sources": [
   "V. Chandola, A. Banerjee &amp; V. Kumar, “Anomaly Detection: A Survey”, <em>ACM Computing Surveys</em> 41(3), 2009",
   "J. Hochenbaum, O. S. Vallis &amp; A. Kejariwal, “Automatic Anomaly Detection in the Cloud Via Statistical Learning”, arXiv:1704.07706, 2017"
  ]
 },
 "forecast-ensembles": {
  "example": "Two unbiased forecasts with equal error variance and an error correlation of 0.3. Each alone has a mean squared error of <strong>1.00</strong>; their simple average has <strong>0.65</strong> — matching the theoretical (1 + ρ)/2. The less the forecasters’ errors are correlated, the more averaging helps, even when neither is better than the other.",
  "fails": [
   "Estimated optimal weights usually do worse than a simple average out of sample — the “forecast combination puzzle” (Smith &amp; Wallis 2009).",
   "Averaging biased forecasts averages the biases; it does not remove them.",
   "Highly correlated models add cost and little else; diversity is what an ensemble buys."
  ],
  "code": "rng = np.random.default_rng(15)\nrho = 0.3\ncov = [[1, rho], [rho, 1]]\ne = rng.multivariate_normal([0, 0], cov, 100_000)     # errors of two unbiased forecasts\nmse_single = (e[:, 0] ** 2).mean()\nmse_avg = (e.mean(axis=1) ** 2).mean()\ntheory = (1 + rho) / 2",
  "sources": [
   "J. M. Bates &amp; C. W. J. Granger, “The Combination of Forecasts”, <em>Operational Research Quarterly</em> 20(4), 1969",
   "R. T. Clemen, “Combining Forecasts: A Review and Annotated Bibliography”, <em>International Journal of Forecasting</em> 5(4), 1989",
   "J. Smith &amp; K. F. Wallis, “A Simple Explanation of the Forecast Combination Puzzle”, <em>Oxford Bulletin of Economics and Statistics</em> 71(3), 2009"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, codeNote: 'Assumes <code>import numpy as np</code> and <code>import pandas as pd</code>. Each snippet simulates or makes up its own series, as the comments say.' });
}
/* depth:end */

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome()
    + buildStationarity() + buildAutocorrelation() + buildDecomposition()
    + buildDifferencing() + buildResampling()
    + buildARModels() + buildMAModels() + buildARIMA()
    + buildSARIMA() + buildExponentialSmoothing()
    + buildProphet() + buildStateSpace() + buildGARCH()
    + buildVARModels() + buildChangepointDetection()
    + buildRNNForTS() + buildLSTMForTS() + buildTemporalCNN()
    + buildTransformersForTS() + buildNBEATS()
    + buildFeatureEngineering() + buildCrossValidationTS() + buildBacktestingForecasts()
    + buildAnomalyDetection() + buildForecastEnsembles();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Timeseries <em>Engineering</em></h2>
    <p style="margin-top:14px">An interactive reference covering 25 topics &mdash; from stationarity
    and decomposition to ARIMA, neural forecasters, and production backtesting.</p>
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> arrow keys to navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-foundations','stationarity')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12c2.5 0 2.5-5 5-5s2.5 8 5 8 2.5-6 5-6 3 3 3 3"/></svg></div>
      <div class="cat-card-name">Foundations</div>
      <div class="cat-card-count">5 topics &middot; Stationarity, ACF, decomposition</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-classical','ar-models')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M6.5 16c4.5 0 6-8 11.5-9"/></svg></div>
      <div class="cat-card-name">Classical Models</div>
      <div class="cat-card-count">5 topics &middot; AR, MA, ARIMA, SARIMA, ETS</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-advanced','prophet')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg></div>
      <div class="cat-card-name">Advanced Models</div>
      <div class="cat-card-count">5 topics &middot; Prophet, state-space, GARCH, VAR</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-deep','rnn-for-ts')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="6" r="1.8"/><circle cx="12" cy="18" r="1.8"/><circle cx="19" cy="12" r="1.8"/><path d="M6.6 11l3.9-4M6.6 13l3.9 4M13.4 7l4 4M13.4 17l4-4"/></svg></div>
      <div class="cat-card-name">Deep Learning</div>
      <div class="cat-card-count">5 topics &middot; LSTM, TCN, Transformers, N-BEATS</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-practice','feature-engineering')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="9" cy="8" r="2.3"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="15" cy="16" r="2.3"/></svg></div>
      <div class="cat-card-name">Practice &amp; Tooling</div>
      <div class="cat-card-count">5 topics &middot; Features, CV, backtesting, ensembles</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Stationarity */
function buildStationarity() {
  return `<div class="topic" id="stationarity">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Foundations</div><h2><em>Stationarity</em></h2></div>
    <span class="topic-badge">Foundations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The assumption that makes forecasting possible</p>
  <p class="prose">A time series is <strong>stationary</strong> if its statistical properties &mdash; mean, variance, and autocovariance &mdash; do not change over time. Most classical models (ARIMA, ETS) require stationarity. If your series has a trend or changing variance, you must transform it first.</p>
  <div class="fb"><div class="fm">E[y<sub>t</sub>] = &mu; &nbsp;&nbsp;&amp;&nbsp;&nbsp; Var(y<sub>t</sub>) = &sigma;&sup2; &nbsp;&nbsp;&amp;&nbsp;&nbsp; Cov(y<sub>t</sub>, y<sub>t&minus;k</sub>) = f(k)</div><div class="fd"><span>Stationarity</span> means the joint distribution of any collection of time steps depends only on the gaps between them, not on the absolute position in time.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; stationary vs non-stationary series</div>
    <canvas id="stationCanvas" role="img" aria-label="Stationarity: Interactive — stationary vs non-stationary series" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Trend Strength</span><input type="range" id="stationTrend" min="0" max="100" step="1" value="0"><span class="vd" id="stationTrendV">0</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Test</th><th>Null Hypothesis</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>ADF (Augmented Dickey-Fuller)</td><td>Unit root (non-stationary)</td><td>p &lt; 0.05 &rarr; stationary</td></tr>
      <tr><td>KPSS</td><td>Stationary</td><td>p &lt; 0.05 &rarr; non-stationary</td></tr>
      <tr><td>Phillips-Perron</td><td>Unit root</td><td>Robust to serial correlation</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python &mdash; test for stationarity</span>
<span class="kw">from</span> statsmodels.tsa.stattools <span class="kw">import</span> adfuller, kpss

result = adfuller(series, autolag=<span class="st">'AIC'</span>)
print(<span class="st">f"ADF stat: </span>{result[<span class="st">0</span>]:.4f}<span class="st">, p-value: </span>{result[<span class="st">1</span>]:.4f}<span class="st">"</span>)

result_kpss = kpss(series, regression=<span class="st">'c'</span>, nlags=<span class="st">'auto'</span>)
print(<span class="st">f"KPSS stat: </span>{result_kpss[<span class="st">0</span>]:.4f}<span class="st">, p-value: </span>{result_kpss[<span class="st">1</span>]:.4f}<span class="st">"</span>)</pre></div>
  <div class="callout info"><strong>Use both tests together:</strong> ADF and KPSS have opposite null hypotheses. If ADF rejects and KPSS does not, the series is likely stationary. If both fail to reject, you may have a trend-stationary process that needs detrending rather than differencing.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Stationarity is the time-series version of the <a href="../stats/#distribution-shape">distribution shape</a> assumption in statistics. In markets, <a href="../timeseries/#changepoint-detection">regime detection</a> is exactly the question: has the underlying process become non-stationary? A <a href="../markets/risk/#pairs-trading">pairs trade</a> is a bet that the spread between two prices is stationary.</div>
  ${depthHtml('stationarity')}
  <div class="topic-nav" id="nav-stationarity"></div>
</div>`;
}

/* 02 — Autocorrelation (ACF/PACF) */
function buildAutocorrelation() {
  return `<div class="topic" id="autocorrelation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Foundations</div><h2>Autocorrelation <em>(ACF/PACF)</em></h2></div>
    <span class="topic-badge">Foundations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Measuring how a series remembers its own past</p>
  <p class="prose">The <strong>autocorrelation function (ACF)</strong> measures correlation between a series and its lagged values. The <strong>partial autocorrelation function (PACF)</strong> removes the influence of intermediate lags. Together they reveal the memory structure and guide ARIMA order selection.</p>
  <div class="fb"><div class="fm">ACF(k) = Cov(y<sub>t</sub>, y<sub>t&minus;k</sub>) / Var(y<sub>t</sub>)</div><div class="fd"><span>ACF</span> at lag k is the Pearson correlation between a series and itself shifted by k steps. Values outside the confidence band are significant.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; ACF and PACF plots</div>
    <canvas id="acfCanvas" role="img" aria-label="Autocorrelation (ACF/PACF): Interactive — ACF and PACF plots" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">AR Order (p)</span><input type="range" id="acfP" min="0" max="5" step="1" value="1"><span class="vd" id="acfPV">1</span></div>
      <div class="cg"><span class="cl">MA Order (q)</span><input type="range" id="acfQ" min="0" max="5" step="1" value="0"><span class="vd" id="acfQV">0</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Pattern</th><th>ACF</th><th>PACF</th><th>Model</th></tr></thead>
    <tbody>
      <tr><td>Slow decay</td><td>Geometrically decaying</td><td>Cuts off at lag p</td><td>AR(p)</td></tr>
      <tr><td>Sharp cutoff</td><td>Cuts off at lag q</td><td>Geometrically decaying</td><td>MA(q)</td></tr>
      <tr><td>Both decay</td><td>Decays</td><td>Decays</td><td>ARMA(p,q)</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python &mdash; ACF/PACF plots</span>
<span class="kw">from</span> statsmodels.graphics.tsaplots <span class="kw">import</span> plot_acf, plot_pacf

fig, axes = plt.subplots(<span class="st">1</span>, <span class="st">2</span>, figsize=(<span class="st">12</span>, <span class="st">4</span>))
plot_acf(series, lags=<span class="st">30</span>, ax=axes[<span class="st">0</span>])
plot_pacf(series, lags=<span class="st">30</span>, method=<span class="st">'ywm'</span>, ax=axes[<span class="st">1</span>])
plt.tight_layout()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ACF/PACF diagnoses for time series are like <a href="../stats/#feature-correlation">correlation analysis</a> in statistics &mdash; but with yourself across time. In markets, <a href="../markets/indicators/#roc">momentum indicators</a> are practical autocorrelation measurements. Where autocorrelation is zero, a streak says nothing about the next step — the trap of the <a href="../markets/psychology/#gambler-fallacy">gambler’s fallacy</a>.</div>
  ${depthHtml('autocorrelation')}
  <div class="topic-nav" id="nav-autocorrelation"></div>
</div>`;
}

/* 03 — Decomposition */
function buildDecomposition() {
  return `<div class="topic" id="decomposition">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Foundations</div><h2><em>Decomposition</em></h2></div>
    <span class="topic-badge">Foundations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Separating signal from noise, season from trend</p>
  <p class="prose"><strong>Decomposition</strong> splits a time series into three components: <strong>trend</strong> (long-term direction), <strong>seasonality</strong> (repeating patterns), and <strong>residual</strong> (noise). This reveals the structure hidden in raw data and guides model choice.</p>
  <div class="fb"><div class="fm">y<sub>t</sub> = T<sub>t</sub> + S<sub>t</sub> + R<sub>t</sub> &nbsp;&nbsp;(additive) &nbsp;&nbsp;|&nbsp;&nbsp; y<sub>t</sub> = T<sub>t</sub> &times; S<sub>t</sub> &times; R<sub>t</sub> &nbsp;&nbsp;(multiplicative)</div><div class="fd"><span>Additive</span> when seasonal amplitude is constant. <span>Multiplicative</span> when it grows with the level.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; STL decomposition</div>
    <canvas id="decompCanvas" role="img" aria-label="Decomposition: Interactive — STL decomposition" height="320"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Seasonal Period</span><input type="range" id="decompPeriod" min="4" max="52" step="1" value="12"><span class="vd" id="decompPeriodV">12</span></div>
      <div class="cg"><span class="cl">Trend Strength</span><input type="range" id="decompTrend" min="0" max="100" step="1" value="50"><span class="vd" id="decompTrendV">50</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; STL decomposition</span>
<span class="kw">from</span> statsmodels.tsa.seasonal <span class="kw">import</span> STL

stl = STL(series, period=<span class="st">12</span>, robust=<span class="st">True</span>)
result = stl.fit()
result.plot()
<span class="cm"># result.trend, result.seasonal, result.resid</span></pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Decomposition mirrors <a href="../ml-math/#pca">eigendecomposition</a> in linear algebra &mdash; both break a complex object into orthogonal components. In markets, separating <a href="../markets/charts/#trendlines">trend</a> from <a href="../essays/#essay-signal">noise</a> is the trader&rsquo;s version of the same problem.</div>
  ${depthHtml('decomposition')}
  <div class="topic-nav" id="nav-decomposition"></div>
</div>`;
}

/* 04 — Differencing */
function buildDifferencing() {
  return `<div class="topic" id="differencing">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Foundations</div><h2><em>Differencing</em></h2></div>
    <span class="topic-badge">Foundations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The simplest way to make a series stationary</p>
  <p class="prose"><strong>Differencing</strong> subtracts the previous observation from the current one: &Delta;y<sub>t</sub> = y<sub>t</sub> &minus; y<sub>t&minus;1</sub>. This removes trends. <strong>Second differencing</strong> removes quadratic trends. <strong>Seasonal differencing</strong> (y<sub>t</sub> &minus; y<sub>t&minus;m</sub>) removes periodic patterns.</p>
  <div class="fb"><div class="fm">&Delta;y<sub>t</sub> = y<sub>t</sub> &minus; y<sub>t&minus;1</sub> &nbsp;&nbsp;|&nbsp;&nbsp; &Delta;<sup>2</sup>y<sub>t</sub> = &Delta;y<sub>t</sub> &minus; &Delta;y<sub>t&minus;1</sub> &nbsp;&nbsp;|&nbsp;&nbsp; &Delta;<sub>m</sub>y<sub>t</sub> = y<sub>t</sub> &minus; y<sub>t&minus;m</sub></div><div class="fd">The <span>d</span> parameter in ARIMA(p,d,q) is the number of regular differences needed for stationarity.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; differencing levels</div>
    <canvas id="diffCanvas" role="img" aria-label="Differencing: Interactive — differencing levels" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Differences (d)</span><input type="range" id="diffD" min="0" max="2" step="1" value="0"><span class="vd" id="diffDV">0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; differencing</span>
<span class="kw">import</span> pandas <span class="kw">as</span> pd

diff1 = series.diff().dropna()         <span class="cm"># first difference</span>
diff2 = series.diff().diff().dropna()   <span class="cm"># second difference</span>
sdiff = series.diff(<span class="st">12</span>).dropna()        <span class="cm"># seasonal difference (m=12)</span></pre></div>
  <div class="callout info"><strong>Don&rsquo;t over-difference:</strong> Each difference removes one degree of integration. If the series is already stationary, differencing adds artificial noise. Check with ADF after each step.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Differencing converts levels to returns &mdash; exactly what <a href="../sandbox/markets/index.html#candlestick-spotter">candlestick charts</a> show. In ML, the concept parallels <a href="../ml-math/#gradient">gradient computation</a>: the rate of change matters more than the absolute value.</div>
  ${depthHtml('differencing')}
  <div class="topic-nav" id="nav-differencing"></div>
</div>`;
}

/* 05 — Resampling & Frequency */
function buildResampling() {
  return `<div class="topic" id="resampling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Foundations</div><h2>Resampling &amp; <em>Frequency</em></h2></div>
    <span class="topic-badge">Foundations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Converting between time granularities</p>
  <p class="prose"><strong>Downsampling</strong> aggregates high-frequency data (e.g., ticks &rarr; daily). <strong>Upsampling</strong> fills gaps in lower-frequency data (e.g., monthly &rarr; daily with interpolation). Proper frequency alignment prevents lookahead bias and ensures your features match your target.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; resampling effects</div>
    <canvas id="resampleCanvas" role="img" aria-label="Resampling &amp; Frequency: Interactive — resampling effects" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Target Frequency</span><input type="range" id="resampleFreq" min="1" max="5" step="1" value="1"><span class="vd" id="resampleFreqV">1x</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; resampling with pandas</span>
<span class="cm"># Downsample: daily &rarr; weekly (OHLCV)</span>
weekly = df.resample(<span class="st">'W'</span>).agg({
    <span class="st">'open'</span>: <span class="st">'first'</span>, <span class="st">'high'</span>: <span class="st">'max'</span>,
    <span class="st">'low'</span>: <span class="st">'min'</span>, <span class="st">'close'</span>: <span class="st">'last'</span>,
    <span class="st">'volume'</span>: <span class="st">'sum'</span>
})
<span class="cm"># Upsample: monthly &rarr; daily (forward fill)</span>
daily = monthly.resample(<span class="st">'D'</span>).ffill()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Choosing the right frequency is the time-series equivalent of <a href="../llm/#context-windows">context window</a> sizing in LLMs &mdash; too little history and you miss patterns, too much and you drown in noise. In markets, timeframe selection is this exact tradeoff.</div>
  ${depthHtml('resampling')}
  <div class="topic-nav" id="nav-resampling"></div>
</div>`;
}

/* 06 — AR Models */
function buildARModels() {
  return `<div class="topic" id="ar-models">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Classical Models</div><h2>AR <em>Models</em></h2></div>
    <span class="topic-badge">Classical</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Regressing a series on its own past</p>
  <p class="prose">An <strong>AR(p)</strong> model predicts each value as a weighted sum of the previous p values plus noise. The weights (&phi; coefficients) capture how strongly the series depends on each lag. PACF cutoff at lag p identifies the order.</p>
  <div class="fb"><div class="fm">y<sub>t</sub> = c + &phi;<sub>1</sub>y<sub>t&minus;1</sub> + &phi;<sub>2</sub>y<sub>t&minus;2</sub> + &hellip; + &phi;<sub>p</sub>y<sub>t&minus;p</sub> + &epsilon;<sub>t</sub></div><div class="fd">Each <span>&phi;</span> coefficient tells you how much influence a past value has. Stationarity requires all roots of the characteristic polynomial to lie outside the unit circle.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; AR(p) process simulation</div>
    <canvas id="arCanvas" role="img" aria-label="AR Models: Interactive — AR(p) process simulation" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">&phi;<sub>1</sub></span><input type="range" id="arPhi1" min="-95" max="95" step="5" value="70"><span class="vd" id="arPhi1V">0.70</span></div>
      <div class="cg"><span class="cl">Order (p)</span><input type="range" id="arOrder" min="1" max="3" step="1" value="1"><span class="vd" id="arOrderV">1</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; fit AR model</span>
<span class="kw">from</span> statsmodels.tsa.ar_model <span class="kw">import</span> AutoReg

model = AutoReg(series, lags=<span class="st">3</span>).fit()
print(model.summary())
forecast = model.predict(start=len(series), end=len(series)+<span class="st">10</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> AR models are time-series <a href="../ml-math/#linear">linear regression</a> where the features are your own lagged values. In markets, the idea that past prices predict future prices is the foundation of <a href="../markets/indicators/#roc">momentum</a>.</div>
  ${depthHtml('ar-models')}
  <div class="topic-nav" id="nav-ar-models"></div>
</div>`;
}

/* 07 — MA Models */
function buildMAModels() {
  return `<div class="topic" id="ma-models">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Classical Models</div><h2>MA <em>Models</em></h2></div>
    <span class="topic-badge">Classical</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Modeling dependence through past shocks</p>
  <p class="prose">An <strong>MA(q)</strong> model expresses each value as a weighted sum of q past error terms. While AR uses past values, MA uses past surprises. ACF cutoff at lag q identifies the order.</p>
  <div class="fb"><div class="fm">y<sub>t</sub> = c + &epsilon;<sub>t</sub> + &theta;<sub>1</sub>&epsilon;<sub>t&minus;1</sub> + &theta;<sub>2</sub>&epsilon;<sub>t&minus;2</sub> + &hellip; + &theta;<sub>q</sub>&epsilon;<sub>t&minus;q</sub></div><div class="fd">Each <span>&theta;</span> coefficient controls the impact of a past shock. MA models have finite memory &mdash; the effect of a shock dies out after exactly q steps.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; MA(q) impulse response</div>
    <canvas id="maCanvas" role="img" aria-label="MA Models: Interactive — MA(q) impulse response" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">&theta;<sub>1</sub></span><input type="range" id="maTheta1" min="-95" max="95" step="5" value="60"><span class="vd" id="maTheta1V">0.60</span></div>
      <div class="cg"><span class="cl">Order (q)</span><input type="range" id="maOrder" min="1" max="3" step="1" value="1"><span class="vd" id="maOrderV">1</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; fit MA model</span>
<span class="kw">from</span> statsmodels.tsa.arima.model <span class="kw">import</span> ARIMA

model = ARIMA(series, order=(<span class="st">0</span>, <span class="st">0</span>, <span class="st">2</span>)).fit()  <span class="cm"># MA(2)</span>
print(model.summary())</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> MA models capture how surprises propagate &mdash; the same mechanism behind <a href="../markets/psychology/#recency-bias">market overreaction</a>. The finite memory of MA is the opposite of the persistent memory in <a href="#ar-models">AR models</a>.</div>
  ${depthHtml('ma-models')}
  <div class="topic-nav" id="nav-ma-models"></div>
</div>`;
}

/* 08 — ARIMA */
function buildARIMA() {
  return `<div class="topic" id="arima">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Classical Models</div><h2><em>ARIMA</em></h2></div>
    <span class="topic-badge">Classical</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// The workhorse of classical forecasting</p>
  <p class="prose"><strong>ARIMA(p,d,q)</strong> combines autoregression (AR), differencing (I), and moving average (MA). The Box-Jenkins methodology uses ACF/PACF to identify orders, fits the model, then checks residuals for white noise. Auto-ARIMA automates this.</p>
  <div class="fb"><div class="fm">&Delta;<sup>d</sup>y<sub>t</sub> = c + &phi;<sub>1</sub>&Delta;<sup>d</sup>y<sub>t&minus;1</sub> + &hellip; + &theta;<sub>1</sub>&epsilon;<sub>t&minus;1</sub> + &hellip; + &epsilon;<sub>t</sub></div><div class="fd">ARIMA unifies the three operations: <span>differentiate</span> to stationarize, <span>AR</span> for lag dependence, <span>MA</span> for shock dependence.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; ARIMA forecast with confidence intervals</div>
    <canvas id="arimaCanvas" role="img" aria-label="ARIMA: Interactive — ARIMA forecast with confidence intervals" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">p (AR)</span><input type="range" id="arimaP" min="0" max="4" step="1" value="1"><span class="vd" id="arimaPV">1</span></div>
      <div class="cg"><span class="cl">d (diff)</span><input type="range" id="arimaD" min="0" max="2" step="1" value="1"><span class="vd" id="arimaDV">1</span></div>
      <div class="cg"><span class="cl">q (MA)</span><input type="range" id="arimaQ" min="0" max="4" step="1" value="1"><span class="vd" id="arimaQV">1</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; auto ARIMA</span>
<span class="kw">from</span> pmdarima <span class="kw">import</span> auto_arima

model = auto_arima(series, seasonal=<span class="st">False</span>,
                   stepwise=<span class="st">True</span>, trace=<span class="st">True</span>)
print(model.summary())
forecast = model.predict(n_periods=<span class="st">30</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ARIMA&rsquo;s model selection via AIC/BIC is the same bias-variance tradeoff as <a href="../stats/#cross-validation">cross-validation</a> in ML. In markets, ARIMA forecasts on price returns connect directly to <a href="../markets/indicators/#sma">moving average</a> signals.</div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>In the M4 competition (100,000 series), most pure machine-learning methods were less accurate than simple statistical benchmarks; the winner combined exponential smoothing with a neural network (Makridakis et al. 2020)</li>
      <li>Automatic order selection (auto.arima, pmdarima) fits a typical univariate series in seconds; manual Box-Jenkins is mainly useful for understanding</li>
      <li>For financial returns, ARIMA captures linear dependence but misses volatility clustering — pair it with GARCH for the variance</li>
      <li>ARIMA struggles with structural breaks — test for stationarity (ADF, KPSS) and watch for regime changes</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Univariate forecasting where interpretability matters. Short-horizon forecasts (1-30 steps). As a strong baseline before trying complex models. Demand forecasting, inventory planning, economic indicators.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You have many exogenous features (use machine learning instead). Very long horizons where uncertainty dominates. Non-stationary data with structural breaks. Multivariate dependencies are important (use VAR or neural methods).</div>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Try it on real data</div>
    <a href="https://www.kaggle.com/datasets/ashfakyeafi/air-passenger-data-for-time-series-analysis" target="_blank" rel="noopener">Kaggle: Airline Passengers (classic seasonal time series, 144 monthly observations)</a>
    <a href="https://fred.stlouisfed.org/series/UNRATE" target="_blank" rel="noopener">FRED: US Unemployment Rate (macroeconomic monthly series, 900+ observations)</a>
    <div class="ds-note">The airline dataset is perfect for SARIMA (clear trend + seasonality). The FRED series tests ARIMA on regime-change data — notice how 2008 and 2020 break the model's assumptions.</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install pmdarima statsmodels pandas matplotlib
# ────────────────────────────────────────
import pandas as pd, matplotlib.pyplot as plt
from pmdarima import auto_arima
from statsmodels.tsa.stattools import adfuller

df = pd.read_csv('AirPassengers.csv', parse_dates=['Month'], index_col='Month')
print(f"ADF p-value: {adfuller(df['#Passengers'])[1]:.4f}")  # test stationarity

model = auto_arima(df, seasonal=True, m=12, stepwise=True, trace=True)
fc, ci = model.predict(24, return_conf_int=True)
plt.plot(df.index, df.values, label='Observed')
plt.fill_between(pd.date_range(df.index[-1], periods=24, freq='M'), ci[:,0], ci[:,1], alpha=.2)
plt.show()</code></pre>
  </div>
  ${depthHtml('arima')}
  <div class="topic-nav" id="nav-arima"></div>
</div>`;
}

/* 09 — SARIMA */
function buildSARIMA() {
  return `<div class="topic" id="sarima">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Classical Models</div><h2><em>SARIMA</em></h2></div>
    <span class="topic-badge">Classical</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// ARIMA with seasonal intelligence</p>
  <p class="prose"><strong>SARIMA(p,d,q)(P,D,Q)<sub>m</sub></strong> adds seasonal AR, differencing, and MA terms at seasonal lag m. This captures repeating patterns at fixed intervals &mdash; weekly (m=7), monthly (m=12), quarterly (m=4).</p>
  <div class="fb"><div class="fm">SARIMA(p,d,q)(P,D,Q)<sub>m</sub></div><div class="fd"><span>Lowercase</span> = non-seasonal orders. <span>Uppercase</span> = seasonal orders at lag m. The model simultaneously captures short-term dynamics and periodic patterns.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; seasonal pattern visualization</div>
    <canvas id="sarimaCanvas" role="img" aria-label="SARIMA: Interactive — seasonal pattern visualization" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Season (m)</span><input type="range" id="sarimaM" min="4" max="52" step="1" value="12"><span class="vd" id="sarimaMV">12</span></div>
      <div class="cg"><span class="cl">Seasonal Strength</span><input type="range" id="sarimaS" min="0" max="100" step="1" value="60"><span class="vd" id="sarimaSV">60</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; SARIMA</span>
<span class="kw">from</span> statsmodels.tsa.statespace.sarimax <span class="kw">import</span> SARIMAX

model = SARIMAX(series,
                order=(<span class="st">1</span>, <span class="st">1</span>, <span class="st">1</span>),
                seasonal_order=(<span class="st">1</span>, <span class="st">1</span>, <span class="st">1</span>, <span class="st">12</span>)).fit()
forecast = model.get_forecast(steps=<span class="st">24</span>)
ci = forecast.conf_int(alpha=<span class="st">0.05</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Seasonal patterns in time series are the same calendar seasonality that drives market cycles. The Fourier terms in SARIMA connect to <a href="../timeseries/#prophet">Fourier seasonality</a> in Prophet.</div>
  ${depthHtml('sarima')}
  <div class="topic-nav" id="nav-sarima"></div>
</div>`;
}

/* 10 — Exponential Smoothing */
function buildExponentialSmoothing() {
  return `<div class="topic" id="exponential-smoothing">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Classical Models</div><h2>Exponential <em>Smoothing</em></h2></div>
    <span class="topic-badge">Classical</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Weighted averages that fade the past</p>
  <p class="prose"><strong>Exponential smoothing (ETS)</strong> assigns exponentially decreasing weights to past observations. <strong>Simple</strong> smoothing handles level-only series. <strong>Holt&rsquo;s</strong> adds trend. <strong>Holt-Winters</strong> adds seasonality. The ETS framework (Error, Trend, Seasonality) covers 30 model variants.</p>
  <div class="fb"><div class="fm">SES: &nbsp; &#x1D453;&#x302;<sub>t+1</sub> = &alpha;y<sub>t</sub> + (1&minus;&alpha;)&#x1D453;&#x302;<sub>t</sub></div><div class="fd"><span>&alpha;</span> (0&ndash;1) balances responsiveness with stability. Close to 1 = reactive to recent data. Close to 0 = smooth, slow to adapt.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; exponential smoothing</div>
    <canvas id="etsCanvas" role="img" aria-label="Exponential Smoothing: Interactive — exponential smoothing" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Alpha (&alpha;)</span><input type="range" id="etsAlpha" min="1" max="99" step="1" value="30"><span class="vd" id="etsAlphaV">0.30</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; Holt-Winters</span>
<span class="kw">from</span> statsmodels.tsa.holtwinters <span class="kw">import</span> ExponentialSmoothing

model = ExponentialSmoothing(
    series, trend=<span class="st">'add'</span>, seasonal=<span class="st">'mul'</span>,
    seasonal_periods=<span class="st">12</span>
).fit()
forecast = model.forecast(steps=<span class="st">12</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Exponential smoothing with &alpha; is exactly how <a href="../markets/indicators/#ema">Exponential Moving Averages (EMA)</a> work in technical analysis. The same &alpha; parameter appears in <a href="../ml-math/#optimizers">momentum optimizers</a>.</div>
  ${depthHtml('exponential-smoothing')}
  <div class="topic-nav" id="nav-exponential-smoothing"></div>
</div>`;
}

/* 11 — Prophet */
function buildProphet() {
  return `<div class="topic" id="prophet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Advanced Models</div><h2><em>Prophet</em></h2></div>
    <span class="topic-badge">Advanced</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Decomposable forecasting at scale</p>
  <p class="prose">Facebook&rsquo;s <strong>Prophet</strong> fits an additive model: y(t) = g(t) + s(t) + h(t) + &epsilon;. The <strong>trend</strong> g(t) can be linear or logistic (saturating). <strong>Seasonality</strong> s(t) uses Fourier series. <strong>Holidays</strong> h(t) handle irregular events. Changepoints are detected automatically.</p>
  <div class="fb"><div class="fm">y(t) = g(t) + s(t) + h(t) + &epsilon;<sub>t</sub></div><div class="fd"><span>g(t)</span> = trend (linear/logistic), <span>s(t)</span> = seasonality (Fourier), <span>h(t)</span> = holidays/events. All components are interpretable.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; Prophet component decomposition</div>
    <canvas id="prophetCanvas" role="img" aria-label="Prophet: Interactive — Prophet component decomposition" height="300"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; Prophet</span>
<span class="kw">from</span> prophet <span class="kw">import</span> Prophet

model = Prophet(
    changepoint_prior_scale=<span class="st">0.05</span>,
    seasonality_mode=<span class="st">'additive'</span>
)
model.fit(df[['ds', 'y']])
future = model.make_future_dataframe(periods=<span class="st">365</span>)
forecast = model.predict(future)
model.plot_components(forecast)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Prophet&rsquo;s Fourier seasonality connects to <a href="../llm/#positional-encoding">sinusoidal positional encodings</a> in LLMs. Its trend changepoints are exactly the <a href="#changepoint-detection">changepoint detection</a> problem &mdash; and in markets, they correspond to <a href="../markets/charts/#support-resistance">breakout</a> moments.</div>
  ${depthHtml('prophet')}
  <div class="topic-nav" id="nav-prophet"></div>
</div>`;
}

/* 12 — State-Space Models */
function buildStateSpace() {
  return `<div class="topic" id="state-space">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Advanced Models</div><h2>State-Space <em>Models</em></h2></div>
    <span class="topic-badge">Advanced</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Hidden states evolving under noise</p>
  <p class="prose"><strong>State-space models</strong> assume a hidden state evolves over time according to a transition equation, and we observe it with noise through an observation equation. The <strong>Kalman filter</strong> optimally estimates the hidden state. ETS and ARIMA can both be written in state-space form.</p>
  <div class="fb"><div class="fm">State: &nbsp; x<sub>t</sub> = F&middot;x<sub>t&minus;1</sub> + w<sub>t</sub> &nbsp;&nbsp;|&nbsp;&nbsp; Obs: &nbsp; y<sub>t</sub> = H&middot;x<sub>t</sub> + v<sub>t</sub></div><div class="fd">The <span>Kalman filter</span> recursively estimates x<sub>t</sub> from noisy observations y<sub>t</sub>, balancing model prediction with measurement update.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; Kalman filter tracking</div>
    <canvas id="kalmanCanvas" role="img" aria-label="State-Space Models: Interactive — Kalman filter tracking" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Process Noise</span><input type="range" id="kalmanQ" min="1" max="100" step="1" value="20"><span class="vd" id="kalmanQV">20</span></div>
      <div class="cg"><span class="cl">Observation Noise</span><input type="range" id="kalmanR" min="1" max="100" step="1" value="50"><span class="vd" id="kalmanRV">50</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; Kalman-based structural model</span>
<span class="kw">from</span> statsmodels.tsa.statespace.structural <span class="kw">import</span> UnobservedComponents

model = UnobservedComponents(
    series, level=<span class="st">'local linear trend'</span>,
    seasonal=<span class="st">12</span>
).fit()
forecast = model.get_forecast(steps=<span class="st">24</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The Kalman filter is the time-series equivalent of <a href="../ml-math/#bayes">Bayesian updating</a> &mdash; prior &times; likelihood = posterior, applied recursively at each time step. In markets, the hidden state is the true &ldquo;fair value&rdquo; obscured by <a href="../essays/#essay-signal">market noise</a>.</div>
  ${depthHtml('state-space')}
  <div class="topic-nav" id="nav-state-space"></div>
</div>`;
}

/* 13 — GARCH */
function buildGARCH() {
  return `<div class="topic" id="garch">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Advanced Models</div><h2><em>GARCH</em></h2></div>
    <span class="topic-badge">Advanced</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Modeling volatility that clusters</p>
  <p class="prose">Financial returns exhibit <strong>volatility clustering</strong> &mdash; calm periods and turbulent periods tend to persist. <strong>GARCH(1,1)</strong> models the conditional variance as a function of past squared returns and past variance, capturing this self-exciting behaviour.</p>
  <div class="fb"><div class="fm">&sigma;<sup>2</sup><sub>t</sub> = &omega; + &alpha;&epsilon;<sup>2</sup><sub>t&minus;1</sub> + &beta;&sigma;<sup>2</sup><sub>t&minus;1</sub></div><div class="fd"><span>&alpha;</span> captures the reaction to recent shocks. <span>&beta;</span> captures persistence of volatility. <span>&alpha; + &beta;</span> close to 1 means high persistence.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; GARCH volatility clustering</div>
    <canvas id="garchCanvas" role="img" aria-label="GARCH: Interactive — GARCH volatility clustering" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">&alpha; (reaction)</span><input type="range" id="garchA" min="1" max="30" step="1" value="10"><span class="vd" id="garchAV">0.10</span></div>
      <div class="cg"><span class="cl">&beta; (persistence)</span><input type="range" id="garchB" min="50" max="98" step="1" value="85"><span class="vd" id="garchBV">0.85</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; GARCH(1,1)</span>
<span class="kw">from</span> arch <span class="kw">import</span> arch_model

model = arch_model(returns, vol=<span class="st">'Garch'</span>, p=<span class="st">1</span>, q=<span class="st">1</span>)
result = model.fit(disp=<span class="st">'off'</span>)
print(result.summary())
<span class="cm"># Forecast next 5 periods of volatility</span>
fcast = result.forecast(horizon=<span class="st">5</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> GARCH is the quantitative foundation behind <a href="../markets/risk/#value-at-risk">Value-at-Risk</a> calculations and <a href="../markets/indicators/#bollinger-bands">Bollinger Bands</a>. The same volatility clustering appears in heteroscedastic data across ML problems.</div>
  ${depthHtml('garch')}
  <div class="topic-nav" id="nav-garch"></div>
</div>`;
}

/* 14 — VAR Models */
function buildVARModels() {
  return `<div class="topic" id="var-models">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Advanced Models</div><h2>VAR <em>Models</em></h2></div>
    <span class="topic-badge">Advanced</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Multiple series forecasting each other</p>
  <p class="prose"><strong>Vector Autoregression (VAR)</strong> generalises AR to multiple interrelated series. Each variable is modeled as a linear function of all variables&rsquo; lags. <strong>Granger causality</strong> tests whether one series helps predict another. <strong>Impulse response</strong> functions show how shocks propagate.</p>
  <div class="fb"><div class="fm">Y<sub>t</sub> = c + A<sub>1</sub>Y<sub>t&minus;1</sub> + A<sub>2</sub>Y<sub>t&minus;2</sub> + &hellip; + A<sub>p</sub>Y<sub>t&minus;p</sub> + &epsilon;<sub>t</sub></div><div class="fd"><span>Y</span> is a vector of all variables. Each <span>A</span> is a coefficient matrix capturing cross-series dependencies at that lag.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; VAR impulse response</div>
    <canvas id="varCanvas" role="img" aria-label="VAR Models: Interactive — VAR impulse response" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; VAR</span>
<span class="kw">from</span> statsmodels.tsa.api <span class="kw">import</span> VAR

model = VAR(df[['gdp', 'inflation', 'unemployment']])
results = model.fit(maxlags=<span class="st">4</span>, ic=<span class="st">'aic'</span>)
<span class="cm"># Granger causality test</span>
results.test_causality(<span class="st">'gdp'</span>, [<span class="st">'inflation'</span>], kind=<span class="st">'f'</span>)
<span class="cm"># Impulse response</span>
irf = results.irf(<span class="st">20</span>)
irf.plot()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> VAR captures how variables influence each other &mdash; the same idea as <a href="../stats/#feature-correlation">correlation matrices</a> but with temporal structure. In markets, <a href="../markets/risk/#correlation-risk">cross-asset correlations</a> and intermarket analysis are VAR in practice.</div>
  ${depthHtml('var-models')}
  <div class="topic-nav" id="nav-var-models"></div>
</div>`;
}

/* 15 — Changepoint Detection */
function buildChangepointDetection() {
  return `<div class="topic" id="changepoint-detection">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Advanced Models</div><h2>Changepoint <em>Detection</em></h2></div>
    <span class="topic-badge">Advanced</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Finding where the rules change</p>
  <p class="prose">A <strong>changepoint</strong> is where the statistical properties of a series abruptly shift &mdash; a new mean, variance, or trend slope. <strong>PELT</strong> (Pruned Exact Linear Time) finds optimal changepoints efficiently. <strong>BOCPD</strong> (Bayesian Online Changepoint Detection) detects them in real-time.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; changepoint detection</div>
    <canvas id="cpCanvas" role="img" aria-label="Changepoint Detection: Interactive — changepoint detection" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sensitivity</span><input type="range" id="cpSens" min="1" max="100" step="1" value="50"><span class="vd" id="cpSensV">50</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; changepoint detection with ruptures</span>
<span class="kw">import</span> ruptures <span class="kw">as</span> rpt

algo = rpt.Pelt(model=<span class="st">"rbf"</span>).fit(signal)
breakpoints = algo.predict(pen=<span class="st">10</span>)
rpt.display(signal, breakpoints)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Changepoint detection is the formal version of <a href="../markets/psychology/#market-sentiment-cycle">regime detection</a> in markets &mdash; finding when bull turns to bear. In ML production systems, <a href="../mlops/#drift-detection">drift detection</a> is exactly a changepoint problem on model inputs.</div>
  ${depthHtml('changepoint-detection')}
  <div class="topic-nav" id="nav-changepoint-detection"></div>
</div>`;
}

/* 16 — RNNs for Time Series */
function buildRNNForTS() {
  return `<div class="topic" id="rnn-for-ts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Deep Learning</div><h2>RNNs for <em>Time Series</em></h2></div>
    <span class="topic-badge">Deep Learning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Sequence processing with recurrent memory</p>
  <p class="prose"><strong>Recurrent Neural Networks</strong> process sequences step by step, carrying a hidden state that summarises the past. Each step updates the hidden state and optionally produces an output. The RNN learns temporal patterns through backpropagation through time (BPTT), though vanilla RNNs struggle with long-range dependencies.</p>
  <div class="fb"><div class="fm">h<sub>t</sub> = tanh(W<sub>h</sub>h<sub>t&minus;1</sub> + W<sub>x</sub>x<sub>t</sub> + b)</div><div class="fd">The hidden state <span>h<sub>t</sub></span> is a compressed summary of all inputs seen so far. <span>Vanishing gradients</span> make plain RNNs forget early inputs.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; RNN unrolled through time</div>
    <canvas id="rnnCanvas" role="img" aria-label="RNNs for Time Series: Interactive — RNN unrolled through time" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch &mdash; basic RNN for forecasting</span>
<span class="kw">import</span> torch.nn <span class="kw">as</span> nn

<span class="kw">class</span> TSRNN(nn.Module):
    <span class="kw">def</span> __init__(self, input_dim, hidden_dim):
        super().__init__()
        self.rnn = nn.RNN(input_dim, hidden_dim, batch_first=<span class="st">True</span>)
        self.fc = nn.Linear(hidden_dim, <span class="st">1</span>)
    <span class="kw">def</span> forward(self, x):
        out, _ = self.rnn(x)
        <span class="kw">return</span> self.fc(out[:, -<span class="st">1</span>, :])</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> RNN hidden states are a temporal version of <a href="../ml-math/#embeddings">embeddings</a> &mdash; compressed representations of input context. The vanishing gradient problem connects to <a href="../ml-math/#gradient">gradient dynamics</a> in deep networks and the <a href="../llm/#feed-forward">residual connections</a> that solve it in transformers.</div>
  ${depthHtml('rnn-for-ts')}
  <div class="topic-nav" id="nav-rnn-for-ts"></div>
</div>`;
}

/* 17 — LSTM & GRU */
function buildLSTMForTS() {
  return `<div class="topic" id="lstm-for-ts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Deep Learning</div><h2>LSTM &amp; <em>GRU</em></h2></div>
    <span class="topic-badge">Deep Learning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Gated architectures for long-range memory</p>
  <p class="prose"><strong>LSTM</strong> adds a cell state and three gates (forget, input, output) to control information flow, solving the vanishing gradient problem. <strong>GRU</strong> simplifies this to two gates (reset, update) with comparable performance. Both are the default deep learning baseline for time series.</p>
  <div class="fb"><div class="fm">LSTM: &nbsp; f<sub>t</sub> = &sigma;(W<sub>f</sub>[h<sub>t&minus;1</sub>,x<sub>t</sub>]) &nbsp;&nbsp;|&nbsp;&nbsp; i<sub>t</sub> = &sigma;(W<sub>i</sub>[h<sub>t&minus;1</sub>,x<sub>t</sub>]) &nbsp;&nbsp;|&nbsp;&nbsp; o<sub>t</sub> = &sigma;(W<sub>o</sub>[h<sub>t&minus;1</sub>,x<sub>t</sub>])</div><div class="fd">The <span>forget gate</span> decides what to discard, the <span>input gate</span> what to write, and the <span>output gate</span> what to expose.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; LSTM gate activations</div>
    <canvas id="lstmCanvas" role="img" aria-label="LSTM &amp; GRU: Interactive — LSTM gate activations" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch &mdash; LSTM for multi-step forecasting</span>
<span class="kw">class</span> LSTMForecaster(nn.Module):
    <span class="kw">def</span> __init__(self, n_features, hidden, n_out):
        super().__init__()
        self.lstm = nn.LSTM(n_features, hidden,
                            num_layers=<span class="st">2</span>, batch_first=<span class="st">True</span>, dropout=<span class="st">0.2</span>)
        self.fc = nn.Linear(hidden, n_out)
    <span class="kw">def</span> forward(self, x):
        out, _ = self.lstm(x)
        <span class="kw">return</span> self.fc(out[:, -<span class="st">1</span>, :])</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> LSTM gates are an attention mechanism before attention existed &mdash; they learn <em>what to remember</em>, connecting to the formal <a href="../llm/#self-attention">self-attention</a> in transformers. The GRU/LSTM choice mirrors <a href="../ml-math/#gru">the GRU topic</a> in ML Math.</div>
  ${depthHtml('lstm-for-ts')}
  <div class="topic-nav" id="nav-lstm-for-ts"></div>
</div>`;
}

/* 18 — Temporal CNN (TCN) */
function buildTemporalCNN() {
  return `<div class="topic" id="temporal-cnn">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Deep Learning</div><h2>Temporal <em>CNN (TCN)</em></h2></div>
    <span class="topic-badge">Deep Learning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Convolutions that see the past, never the future</p>
  <p class="prose"><strong>Temporal Convolutional Networks</strong> apply 1D causal convolutions with increasing dilation rates to capture long-range dependencies. Unlike RNNs, they are fully parallelisable during training. The <strong>receptive field</strong> grows exponentially with depth, allowing efficient long-context processing.</p>
  <div class="fb"><div class="fm">Receptive field = 1 + 2 &times; (k&minus;1) &times; &sum; d<sub>i</sub></div><div class="fd"><span>k</span> = kernel size, <span>d<sub>i</sub></span> = dilation at layer i. Doubling dilation each layer (1,2,4,8&hellip;) yields exponential growth.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; dilated causal convolutions</div>
    <canvas id="tcnCanvas" role="img" aria-label="Temporal CNN (TCN): Interactive — dilated causal convolutions" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Layers</span><input type="range" id="tcnLayers" min="2" max="6" step="1" value="4"><span class="vd" id="tcnLayersV">4</span></div>
      <div class="cg"><span class="cl">Kernel Size</span><input type="range" id="tcnKernel" min="2" max="5" step="1" value="3"><span class="vd" id="tcnKernelV">3</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># PyTorch &mdash; basic TCN block</span>
<span class="kw">class</span> TCNBlock(nn.Module):
    <span class="kw">def</span> __init__(self, in_ch, out_ch, k, d):
        super().__init__()
        self.conv = nn.Conv1d(in_ch, out_ch, k, padding=(k-<span class="st">1</span>)*d, dilation=d)
        self.relu = nn.ReLU()
    <span class="kw">def</span> forward(self, x):
        out = self.conv(x)[:, :, :x.size(<span class="st">2</span>)]  <span class="cm"># causal trim</span>
        <span class="kw">return</span> self.relu(out) + x</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Dilated convolutions trade sequential processing for parallelism &mdash; the same tradeoff that led from <a href="#lstm-for-ts">LSTMs</a> to <a href="#transformers-for-ts">Transformers</a>. The receptive field concept maps to <a href="../llm/#context-windows">context windows</a> in LLMs.</div>
  ${depthHtml('temporal-cnn')}
  <div class="topic-nav" id="nav-temporal-cnn"></div>
</div>`;
}

/* 19 — Transformers for Time Series */
function buildTransformersForTS() {
  return `<div class="topic" id="transformers-for-ts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Deep Learning</div><h2>Transformers for <em>Time Series</em></h2></div>
    <span class="topic-badge">Deep Learning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Attention-based forecasting at scale</p>
  <p class="prose"><strong>Time-series transformers</strong> adapt the attention mechanism from NLP for temporal data. <strong>Informer</strong> uses ProbSparse attention for long sequences. <strong>Autoformer</strong> integrates decomposition into the architecture. <strong>PatchTST</strong> treats time windows as patches, achieving state-of-the-art results with channel-independent processing.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; patched attention for time series</div>
    <canvas id="tsfmCanvas" role="img" aria-label="Transformers for Time Series: Interactive — patched attention for time series" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Model</th><th>Key Innovation</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td>Informer</td><td>ProbSparse attention</td><td>Long sequence forecasting</td></tr>
      <tr><td>Autoformer</td><td>Built-in decomposition</td><td>Seasonal data</td></tr>
      <tr><td>PatchTST</td><td>Channel-independent patches</td><td>Multivariate benchmarks</td></tr>
      <tr><td>TimesFM</td><td>Pre-trained foundation model</td><td>Zero-shot forecasting</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python &mdash; PatchTST with HuggingFace</span>
<span class="kw">from</span> transformers <span class="kw">import</span> PatchTSTForPrediction

model = PatchTSTForPrediction.from_pretrained(
    <span class="st">"ibm/patchtst-etth1-forecasting"</span>
)
<span class="cm"># Or with Darts library</span>
<span class="kw">from</span> darts.models <span class="kw">import</span> TFTModel
model = TFTModel(input_chunk_length=<span class="st">96</span>, output_chunk_length=<span class="st">24</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Time-series transformers borrow directly from the <a href="../llm/#self-attention">self-attention</a> and <a href="../llm/#positional-encoding">positional encoding</a> in LLMs. The patching strategy in PatchTST is analogous to <a href="../llm/#tokenization">tokenization</a> &mdash; chunking continuous signals into digestible pieces.</div>
  ${depthHtml('transformers-for-ts')}
  <div class="topic-nav" id="nav-transformers-for-ts"></div>
</div>`;
}

/* 20 — N-BEATS & N-HiTS */
function buildNBEATS() {
  return `<div class="topic" id="nbeats">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Deep Learning</div><h2>N-BEATS &amp; <em>N-HiTS</em></h2></div>
    <span class="topic-badge">Deep Learning</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Pure MLP architectures for forecasting</p>
  <p class="prose"><strong>N-BEATS</strong> uses stacks of fully-connected blocks that produce both a <strong>backward forecast</strong> (reconstructing the input) and a <strong>forward forecast</strong>. Residual connections between blocks let each stack focus on what previous stacks missed. The interpretable variant decomposes into trend and seasonal basis functions. <strong>N-HiTS</strong> adds hierarchical interpolation for efficiency.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; N-BEATS block architecture</div>
    <canvas id="nbeatsCanvas" role="img" aria-label="N-BEATS &amp; N-HiTS: Interactive — N-BEATS block architecture" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; N-BEATS with Darts</span>
<span class="kw">from</span> darts.models <span class="kw">import</span> NBEATSModel

model = NBEATSModel(
    input_chunk_length=<span class="st">96</span>,
    output_chunk_length=<span class="st">24</span>,
    generic_architecture=<span class="st">True</span>,
    num_stacks=<span class="st">30</span>,
    num_layers=<span class="st">4</span>
)
model.fit(train_series)
pred = model.predict(n=<span class="st">24</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> N-BEATS&rsquo; residual stacking works like <a href="../timeseries/#forecast-ensembles">boosting</a> &mdash; each block fits the residual from the previous one. The backward/forward forecast split mirrors the <a href="../stats/#cross-validation">train/validation</a> concept built into the architecture itself.</div>
  ${depthHtml('nbeats')}
  <div class="topic-nav" id="nav-nbeats"></div>
</div>`;
}

/* 21 — Feature Engineering */
function buildFeatureEngineering() {
  return `<div class="topic" id="feature-engineering">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Practice & Tooling</div><h2>Feature <em>Engineering</em></h2></div>
    <span class="topic-badge">Practice</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Turning raw timestamps into predictive signals</p>
  <p class="prose">Time series features fall into three categories: <strong>lag features</strong> (past values), <strong>rolling statistics</strong> (windowed mean/std/min/max), and <strong>calendar features</strong> (day of week, month, holiday flags). Fourier features encode seasonality as continuous sine/cosine pairs.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; feature construction</div>
    <canvas id="feCanvas" role="img" aria-label="Feature Engineering: Interactive — feature construction" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Feature Type</th><th>Examples</th><th>Captures</th></tr></thead>
    <tbody>
      <tr><td>Lag features</td><td>y(t-1), y(t-7), y(t-30)</td><td>Autoregressive patterns</td></tr>
      <tr><td>Rolling stats</td><td>rolling_mean(7), rolling_std(30)</td><td>Trend, volatility</td></tr>
      <tr><td>Calendar</td><td>day_of_week, month, is_holiday</td><td>Seasonal effects</td></tr>
      <tr><td>Fourier</td><td>sin(2&pi;t/365), cos(2&pi;t/365)</td><td>Smooth cyclicality</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python &mdash; time series features</span>
df[<span class="st">'lag_1'</span>] = df[<span class="st">'y'</span>].shift(<span class="st">1</span>)
df[<span class="st">'lag_7'</span>] = df[<span class="st">'y'</span>].shift(<span class="st">7</span>)
df[<span class="st">'roll_mean_7'</span>] = df[<span class="st">'y'</span>].rolling(<span class="st">7</span>).mean()
df[<span class="st">'roll_std_30'</span>] = df[<span class="st">'y'</span>].rolling(<span class="st">30</span>).std()
df[<span class="st">'dow'</span>] = df.index.dayofweek
df[<span class="st">'month'</span>] = df.index.month
<span class="cm"># Fourier features for yearly seasonality</span>
df[<span class="st">'sin_365'</span>] = np.sin(<span class="st">2</span> * np.pi * df.index.dayofyear / <span class="st">365</span>)
df[<span class="st">'cos_365'</span>] = np.cos(<span class="st">2</span> * np.pi * df.index.dayofyear / <span class="st">365</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Lag features are the tabular version of what <a href="#ar-models">AR models</a> learn implicitly. Rolling statistics like rolling mean and rolling std are exactly <a href="../markets/indicators/#sma">moving averages</a> and <a href="../markets/indicators/#bollinger-bands">Bollinger Bands</a> from technical analysis.</div>
  ${depthHtml('feature-engineering')}
  <div class="topic-nav" id="nav-feature-engineering"></div>
</div>`;
}

/* 22 — Cross-Validation for TS */
function buildCrossValidationTS() {
  return `<div class="topic" id="cross-validation-ts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Practice & Tooling</div><h2>Cross-Validation <em>for TS</em></h2></div>
    <span class="topic-badge">Practice</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Never shuffle time series</p>
  <p class="prose">Standard k-fold cross-validation breaks temporal ordering and causes <strong>data leakage</strong>. Time series requires <strong>expanding window</strong> (growing training set), <strong>sliding window</strong> (fixed-size window), or <strong>walk-forward</strong> validation. A <strong>purge gap</strong> between train and test prevents contamination from lagged features.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; temporal cross-validation splits</div>
    <canvas id="tscvCanvas" role="img" aria-label="Cross-Validation for TS: Interactive — temporal cross-validation splits" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Folds</span><input type="range" id="tscvFolds" min="3" max="8" step="1" value="5"><span class="vd" id="tscvFoldsV">5</span></div>
      <div class="cg"><span class="cl">Strategy</span><input type="range" id="tscvMode" min="1" max="2" step="1" value="1"><span class="vd" id="tscvModeV">Expanding</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; time series cross validation</span>
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=<span class="st">5</span>, gap=<span class="st">7</span>)
<span class="kw">for</span> train_idx, test_idx <span class="kw">in</span> tscv.split(X):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
    <span class="cm"># fit and evaluate</span></pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Walk-forward validation is the forecasting equivalent of <a href="../stats/#cross-validation">cross-validation</a> from The Toolkit. In markets, this is exactly how <a href="../stats/#survivorship-bias">trading strategy backtesting</a> disciplines prevent look-ahead bias.</div>
  <div class="howto">
    <div class="howto-title">Real-world pipeline: time-series validation</div>
    <ol>
      <li>Sort data by timestamp and freeze a final holdout period before feature engineering.</li>
      <li>Create lag and rolling features using only past values; shift rolling features by one period.</li>
      <li>Use expanding-window validation for growing history or sliding-window validation for changing regimes.</li>
      <li>Add a purge gap when features use delayed labels, rolling windows, or overlapping horizons.</li>
      <li>Report metrics by horizon, not just one average score.</li>
    </ol>
    <div class="howto-pitfall"><strong>Common pitfall — shuffled folds:</strong> Random k-fold makes future observations available to the model indirectly. It usually overstates forecast quality.</div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Metrics in practice</div>
    <ul>
      <li><strong>MAE</strong> is easiest to explain in original units.</li>
      <li><strong>RMSE</strong> is better when large forecast misses are expensive.</li>
      <li><strong>MAPE</strong> is readable for stakeholders but unstable near zero.</li>
      <li>Always compare against naive and seasonal-naive baselines.</li>
    </ul>
  </div>
  <div class="dataset-card">
    <div class="dataset-card-title">Use this pattern on real data</div>
    <a href="../cases/index.html#energy-forecast">Pattern Portal Case: Energy Demand Forecast</a>
    <div class="ds-note">Use the case workflow to test lag features, rolling windows, naive baselines, and walk-forward validation.</div>
  </div>
  ${depthHtml('cross-validation-ts')}
  <div class="topic-nav" id="nav-cross-validation-ts"></div>
</div>`;
}

/* 23 — Backtesting Forecasts */
function buildBacktestingForecasts() {
  return `<div class="topic" id="backtesting-forecasts">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Practice & Tooling</div><h2>Backtesting <em>Forecasts</em></h2></div>
    <span class="topic-badge">Practice</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// How good are your predictions, really?</p>
  <p class="prose"><strong>Rolling-origin backtesting</strong> simulates how your model would have performed if deployed at each past point. Evaluate with <strong>MAE</strong> (robust to outliers), <strong>RMSE</strong> (penalises large errors), <strong>MAPE</strong> (scale-free), and <strong>SMAPE</strong> (symmetric). Always evaluate across multiple horizons.</p>
  <div class="fb"><div class="fm">MAE = (1/n)&sum;|y<sub>t</sub> &minus; &#x1D453;&#x302;<sub>t</sub>| &nbsp;&nbsp;|&nbsp;&nbsp; MAPE = (100/n)&sum;|y<sub>t</sub> &minus; &#x1D453;&#x302;<sub>t</sub>| / |y<sub>t</sub>|</div><div class="fd">Choose your metric based on your decision context. <span>MAE</span> in original units, <span>MAPE</span> for stakeholder communication, <span>RMSE</span> when large errors are costly.</div></div>
  <div class="va">
    <div class="vl">// Interactive &mdash; forecast accuracy metrics</div>
    <canvas id="btCanvas" role="img" aria-label="Backtesting Forecasts: Interactive — forecast accuracy metrics" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; backtesting with Darts</span>
<span class="kw">from</span> darts.metrics <span class="kw">import</span> mae, rmse, mape

backtest = model.historical_forecasts(
    series, start=<span class="st">0.7</span>, forecast_horizon=<span class="st">12</span>,
    stride=<span class="st">1</span>, retrain=<span class="st">False</span>
)
print(<span class="st">f"MAE: </span>{mae(series, backtest):.3f}<span class="st">"</span>)
print(<span class="st">f"RMSE: </span>{rmse(series, backtest):.3f}<span class="st">"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Forecast backtesting is the time-series version of <a href="../stats/#regression-metrics">loss metrics</a> from statistics. In markets, this directly maps to <a href="../stats/#walk-forward">strategy backtesting</a> &mdash; both test historical performance without look-ahead bias. Guide: <a href="/guides/which-forecast/">Which forecasting model should I start with?</a></div>
  ${depthHtml('backtesting-forecasts')}
  <div class="topic-nav" id="nav-backtesting-forecasts"></div>
</div>`;
}

/* 24 — Anomaly Detection */
function buildAnomalyDetection() {
  return `<div class="topic" id="anomaly-detection">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Practice & Tooling</div><h2>Anomaly <em>Detection</em></h2></div>
    <span class="topic-badge">Practice</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Finding the signal in the noise</p>
  <p class="prose">Temporal anomalies are observations that deviate from expected patterns. <strong>Point anomalies</strong> are individual outliers. <strong>Contextual anomalies</strong> are normal values at the wrong time (e.g., summer demand in winter). Methods range from simple z-score thresholds to autoencoders that learn the normal pattern.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; anomaly detection methods</div>
    <canvas id="anomCanvas" role="img" aria-label="Anomaly Detection: Interactive — anomaly detection methods" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Threshold (&sigma;)</span><input type="range" id="anomThresh" min="1" max="5" step="0.5" value="2"><span class="vd" id="anomThreshV">2.0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python &mdash; anomaly detection</span>
<span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> IsolationForest

<span class="cm"># Z-score method</span>
z = (series - series.rolling(<span class="st">30</span>).mean()) / series.rolling(<span class="st">30</span>).std()
anomalies = series[z.abs() > <span class="st">2.5</span>]

<span class="cm"># Isolation Forest on features</span>
clf = IsolationForest(contamination=<span class="st">0.05</span>)
labels = clf.fit_predict(features)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Anomaly detection in time series uses the same <a href="../stats/#outlier-detection">z-score</a> logic from statistics. In markets, anomalies are <a href="../markets/charts/#gaps">price gaps</a> and volume spikes. In MLOps, <a href="../mlops/#data-quality">data quality gates</a> perform anomaly detection on incoming features.</div>
  ${depthHtml('anomaly-detection')}
  <div class="topic-nav" id="nav-anomaly-detection"></div>
</div>`;
}

/* 25 — Forecast Ensembles */
function buildForecastEnsembles() {
  return `<div class="topic" id="forecast-ensembles">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Practice & Tooling</div><h2>Forecast <em>Ensembles</em></h2></div>
    <span class="topic-badge">Practice</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Combining models for better accuracy</p>
  <p class="prose">No single model wins everywhere. <strong>Ensemble forecasting</strong> combines diverse models &mdash; ARIMA, ETS, neural nets &mdash; for more robust predictions. The simplest approach (equal-weight average) is surprisingly hard to beat. More sophisticated methods include <strong>inverse-error weighting</strong> and <strong>stacking</strong> with a meta-learner.</p>
  <div class="va">
    <div class="vl">// Interactive &mdash; ensemble vs individual forecasts</div>
    <canvas id="ensembleCanvas" role="img" aria-label="Forecast Ensembles: Interactive — ensemble vs individual forecasts" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Method</th><th>Approach</th><th>When</th></tr></thead>
    <tbody>
      <tr><td>Simple Average</td><td>Mean of all forecasts</td><td>Default baseline &mdash; often the best</td></tr>
      <tr><td>Weighted Average</td><td>Weight by inverse validation error</td><td>When model quality varies</td></tr>
      <tr><td>Stacking</td><td>Train meta-model on forecasts</td><td>When interaction effects exist</td></tr>
      <tr><td>Median</td><td>Median of all forecasts</td><td>When outlier models are present</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python &mdash; forecast ensemble</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Simple average ensemble</span>
forecasts = [arima_pred, ets_pred, lstm_pred]
ensemble = np.mean(forecasts, axis=<span class="st">0</span>)

<span class="cm"># Inverse-error weighted</span>
errors = [mae_arima, mae_ets, mae_lstm]
weights = [<span class="st">1</span>/e <span class="kw">for</span> e <span class="kw">in</span> errors]
w_sum = sum(weights)
ensemble_w = sum(f*w/w_sum <span class="kw">for</span> f,w <span class="kw">in</span> zip(forecasts, weights))</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Forecast ensembling is the time-series version of ensemble methods from statistics. In markets, <a href="../markets/risk/#diversification">portfolio diversification</a> applies exactly the same principle &mdash; combining uncorrelated assets (models) reduces risk (error).</div>
  ${depthHtml('forecast-ensembles')}
  <div class="topic-nav" id="nav-forecast-ensembles"></div>
</div>`;
}
