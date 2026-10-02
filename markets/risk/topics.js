/* ═══════════════════════════════════════════════════════════════
   Risk & Portfolio — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-risk', title:'Risk Measures', topics:['home','value-at-risk','expected-shortfall','volatility-modeling','correlation-risk','tail-risk'] },
  { id:'sec-port', title:'Portfolio Construction', topics:['mean-variance','risk-parity','factor-models','rebalancing','diversification'] },
  { id:'sec-size', title:'Position Sizing', topics:['kelly-criterion','fixed-fractional','volatility-sizing','pyramiding','max-position'] },
  { id:'sec-hedge', title:'Hedging & Protection', topics:['options-hedging','stop-losses','pairs-trading','portfolio-insurance','currency-hedging'] },
  { id:'sec-perf', title:'Performance & Attribution', topics:['return-attribution','benchmark-tracking','alpha-generation','risk-adjusted-perf','drawdown-analysis'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'value-at-risk':'Value at Risk (VaR)',
  'expected-shortfall':'Expected Shortfall (CVaR)',
  'volatility-modeling':'Volatility Modeling',
  'correlation-risk':'Correlation Risk',
  'tail-risk':'Tail Risk',
  'mean-variance':'Mean-Variance Optimization',
  'risk-parity':'Risk Parity',
  'factor-models':'Factor Models',
  'rebalancing':'Rebalancing Strategies',
  'diversification':'Diversification',
  'kelly-criterion':'Kelly Criterion',
  'fixed-fractional':'Fixed Fractional Sizing',
  'volatility-sizing':'Volatility-Based Sizing',
  'pyramiding':'Pyramiding',
  'max-position':'Maximum Position Limits',
  'options-hedging':'Options Hedging',
  'stop-losses':'Stop-Loss Strategies',
  'pairs-trading':'Pairs Trading',
  'portfolio-insurance':'Portfolio Insurance',
  'currency-hedging':'Currency Hedging',
  'return-attribution':'Return Attribution',
  'benchmark-tracking':'Benchmark Tracking',
  'alpha-generation':'Alpha Generation',
  'risk-adjusted-perf':'Risk-Adjusted Performance',
  'drawdown-analysis':'Drawdown Analysis',
};

const TOPIC_DATA = [
  { id:'value-at-risk', num:'01', title:'Value at Risk (VaR)', category:'Risk Measures', keywords:['var','value at risk','confidence','loss','parametric','historical','monte carlo'], content:'Maximum expected loss over a holding period at a given confidence level.' },
  { id:'expected-shortfall', num:'02', title:'Expected Shortfall (CVaR)', category:'Risk Measures', keywords:['cvar','expected shortfall','conditional','tail','average','beyond'], content:'Average loss in the worst tail scenarios beyond the VaR threshold.' },
  { id:'volatility-modeling', num:'03', title:'Volatility Modeling', category:'Risk Measures', keywords:['garch','ewma','realized','implied','stochastic','vol','variance'], content:'Forecasting asset volatility using GARCH, EWMA, and realized measures.' },
  { id:'correlation-risk', num:'04', title:'Correlation Risk', category:'Risk Measures', keywords:['correlation','covariance','regime','breakdown','contagion','copula'], content:'Portfolio correlations shift in crises — diversification can vanish when needed most.' },
  { id:'tail-risk', num:'05', title:'Tail Risk', category:'Risk Measures', keywords:['tail','kurtosis','fat tails','black swan','extreme','GPD'], content:'Extreme events beyond normal distribution assumptions drive outsized losses.' },
  { id:'mean-variance', num:'06', title:'Mean-Variance Optimization', category:'Portfolio Construction', keywords:['markowitz','efficient frontier','optimization','sharpe','quadratic','mvo'], content:'Classic Markowitz framework balancing expected return against portfolio variance.' },
  { id:'risk-parity', num:'07', title:'Risk Parity', category:'Portfolio Construction', keywords:['risk parity','equal risk','contribution','all weather','bridgewater'], content:'Weight assets so each contributes equally to total portfolio risk.' },
  { id:'factor-models', num:'08', title:'Factor Models', category:'Portfolio Construction', keywords:['factor','fama french','capm','beta','momentum','value','size'], content:'Decompose returns into systematic factor exposures for construction and attribution.' },
  { id:'rebalancing', num:'09', title:'Rebalancing Strategies', category:'Portfolio Construction', keywords:['rebalance','threshold','calendar','drift','transaction cost','band'], content:'Maintain target allocations through calendar or threshold-based rebalancing.' },
  { id:'diversification', num:'10', title:'Diversification', category:'Portfolio Construction', keywords:['diversification','asset class','cross-asset','regime','correlation','free lunch'], content:'Spread risk across uncorrelated assets, geographies, and time horizons.' },
  { id:'kelly-criterion', num:'11', title:'Kelly Criterion', category:'Position Sizing', keywords:['kelly','optimal','fraction','edge','odds','growth','geometric'], content:'Optimal bet size that maximizes long-run geometric growth rate of capital.' },
  { id:'fixed-fractional', num:'12', title:'Fixed Fractional Sizing', category:'Position Sizing', keywords:['fixed fractional','percent risk','constant','position','lot size'], content:'Risk a constant percentage of equity on each trade for consistent exposure.' },
  { id:'volatility-sizing', num:'13', title:'Volatility-Based Sizing', category:'Position Sizing', keywords:['volatility','atr','normalize','size','turtle','adaptive'], content:'Scale position size inversely with volatility for equal dollar-risk across assets.' },
  { id:'pyramiding', num:'14', title:'Pyramiding', category:'Position Sizing', keywords:['pyramid','add','scale in','winner','trend','momentum'], content:'Add to winning positions in tiers as the trade moves in your favor.' },
  { id:'max-position', num:'15', title:'Maximum Position Limits', category:'Position Sizing', keywords:['max position','concentration','limit','exposure','single name','cap'], content:'Hard caps on single-name and sector exposure to prevent catastrophic concentration.' },
  { id:'options-hedging', num:'16', title:'Options Hedging', category:'Hedging & Protection', keywords:['options','put','collar','protective','delta','hedge','premium'], content:'Protective puts, collars, and delta-neutral overlays to cap downside risk.' },
  { id:'stop-losses', num:'17', title:'Stop-Loss Strategies', category:'Hedging & Protection', keywords:['stop loss','trailing','hard stop','percentage','atr stop','exit'], content:'Mechanical exit rules — fixed, trailing, or volatility-adjusted — to limit drawdowns.' },
  { id:'pairs-trading', num:'18', title:'Pairs Trading', category:'Hedging & Protection', keywords:['pairs','spread','cointegration','mean reversion','market neutral','long short'], content:'Long/short correlated pairs to profit from spread convergence while hedging market risk.' },
  { id:'portfolio-insurance', num:'19', title:'Portfolio Insurance', category:'Hedging & Protection', keywords:['cppi','obpi','insurance','floor','cushion','dynamic','protection'], content:'CPPI and OBPI strategies that dynamically shift between risky and safe assets.' },
  { id:'currency-hedging', num:'20', title:'Currency Hedging', category:'Hedging & Protection', keywords:['currency','fx','forward','cross-currency','unhedged','hedge ratio'], content:'Forward contracts and options to neutralize foreign exchange exposure in global portfolios.' },
  { id:'return-attribution', num:'21', title:'Return Attribution', category:'Performance & Attribution', keywords:['attribution','brinson','allocation','selection','interaction','sector'], content:'Brinson decomposition of returns into allocation, selection, and interaction effects.' },
  { id:'benchmark-tracking', num:'22', title:'Benchmark Tracking', category:'Performance & Attribution', keywords:['tracking error','benchmark','index','passive','active share','deviation'], content:'Tracking error measures how closely a portfolio mirrors its benchmark.' },
  { id:'alpha-generation', num:'23', title:'Alpha Generation', category:'Performance & Attribution', keywords:['alpha','excess return','skill','information ratio','active management'], content:'Identifying and capturing risk-adjusted excess returns above the benchmark.' },
  { id:'risk-adjusted-perf', num:'24', title:'Risk-Adjusted Performance', category:'Performance & Attribution', keywords:['sharpe','sortino','calmar','treynor','information ratio','risk-adjusted'], content:'Ratios that normalize returns by risk — Sharpe, Sortino, Calmar, Treynor.' },
  { id:'drawdown-analysis', num:'25', title:'Drawdown Analysis', category:'Performance & Attribution', keywords:['drawdown','maximum drawdown','recovery','underwater','peak to trough','mdd'], content:'Peak-to-trough loss analysis and recovery time for assessing strategy resilience.' },
];

/* ═══════════════════════════════════════════════════════════════ */
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

/* depth:start — generated from the scratch scripts risk_snippets.py / risk_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "value-at-risk": {
  "example": "Twenty daily returns on a 1,000,000 portfolio. Historical 95% VaR reads the 5% quantile straight off the data: <strong>28,400</strong>. Parametric VaR assumes a normal distribution with the same mean and standard deviation: <strong>23,512</strong>. The two worst days (−3.6% and −2.8%) drive the gap — the normal curve says such days are rarer than the data does.",
  "fails": [
   "With 20 days the 5% quantile sits between the two worst observations; one more bad day moves it a lot. Historical VaR needs hundreds of days to be stable.",
   "VaR says nothing about how bad the bad days are beyond the cutoff, and it is not sub-additive: two portfolios’ VaR can add up to less than the VaR of the two combined (Artzner et al. 1999).",
   "A calm sample gives a small VaR just before volatility returns; the number is backward-looking."
  ],
  "code": "r = pd.Series([0.4, -1.2, 0.8, 0.1, -0.6, 1.5, -2.8, 0.3, 0.9, -0.4,\n               0.2, -1.7, 0.6, 1.1, -0.9, 0.5, -3.6, 0.7, 0.0, -0.3]) / 100   # 20 daily returns, made up\nvalue = 1_000_000\nhistorical = -np.quantile(r, 0.05) * value                 # read the 5% quantile off the data\nparametric = -(r.mean() - 1.645 * r.std()) * value         # assume a normal distribution",
  "sources": [
   "<em>Value at Risk: The New Benchmark for Managing Financial Risk</em>, P. Jorion, McGraw-Hill, 3rd ed. 2007",
   "J.P. Morgan/Reuters, <em>RiskMetrics — Technical Document</em>, 4th ed., 1996",
   "P. Artzner, F. Delbaen, J.-M. Eber &amp; D. Heath, “Coherent Measures of Risk”, <em>Mathematical Finance</em> 9(3), 1999"
  ]
 },
 "expected-shortfall": {
  "example": "10,000 days of fat-tailed returns with 1% daily volatility. At 97.5% the VaR is <strong>1.83%</strong> — <em>below</em> the 1.96% a normal distribution would give. Expected Shortfall, the average loss beyond the VaR, is <strong>2.92%</strong>, against <strong>2.34%</strong> for the normal. Fat tails can make VaR look safer while the losses past it are bigger; ES sees what VaR misses.",
  "fails": [
   "ES averages very few observations — 2.5% of the sample — so it is noisier than VaR and needs a long history or a model of the tail.",
   "It is harder to backtest than VaR, because there is no simple count of breaches to check.",
   "Like VaR it is only as good as the data behind it: a sample without a crisis gives an ES without one."
  ],
  "code": "rng = np.random.default_rng(4)\nr = rng.standard_t(3, 10_000) * 0.01 / np.sqrt(3)          # fat-tailed daily returns, 1% volatility\nvar = -np.quantile(r, 0.025)                               # VaR at 97.5%\nes = -r[r &lt;= -var].mean()                                  # the average loss beyond it\nes_normal = 0.01 * np.exp(-1.96**2 / 2) / np.sqrt(2 * np.pi) / 0.025   # ES of a normal with the same volatility",
  "sources": [
   "P. Artzner, F. Delbaen, J.-M. Eber &amp; D. Heath, “Coherent Measures of Risk”, <em>Mathematical Finance</em> 9(3), 1999",
   "C. Acerbi &amp; D. Tasche, “On the Coherence of Expected Shortfall”, <em>Journal of Banking &amp; Finance</em> 26(7), 2002",
   "Basel Committee on Banking Supervision, <em>Minimum Capital Requirements for Market Risk</em>, 2019 — ES at 97.5% for the trading book"
  ]
 },
 "volatility-modeling": {
  "example": "Thirty calm days of ±0.5%, then one −4% day, then calm again. EWMA with λ = 0.94 estimates <strong>7.9%</strong> annualized volatility before the shock, <strong>17.4%</strong> the day after, and <strong>14.1%</strong> nine days later as it decays. A 20-day equal-weight window jumps from 8.1% to <strong>16.2%</strong> and is still at <strong>16.3%</strong> nine days later — it will stay high until the shock leaves the window, then drop all at once.",
  "fails": [
   "EWMA has no long-run level: after a quiet spell its estimate keeps falling toward zero. GARCH adds a pull back to an average (the ω term).",
   "λ = 0.94 was chosen for daily data across many markets in 1994; it is a convention, not a fitted value for your asset.",
   "Any model built on past returns reacts after the shock. Implied volatility from options looks forward, but includes a risk premium."
  ],
  "code": "r = np.r_[np.tile([0.005, -0.005], 15), [-0.04], np.tile([0.005, -0.005], 10)]   # calm, one shock, calm\nlam = 0.94                                                 # RiskMetrics' daily decay\nvar = np.empty(len(r)); var[0] = r[0] ** 2\nfor t in range(1, len(r)):\n    var[t] = lam * var[t - 1] + (1 - lam) * r[t - 1] ** 2   # tomorrow's variance from today's\newma = np.sqrt(var * 252)                                  # annualized\nwindow = pd.Series(r).rolling(20).std().shift().values * np.sqrt(252)   # equal-weight 20-day estimate\ndays = [30, 31, 40]                                        # the shock day, the day after, nine days later",
  "sources": [
   "R. F. Engle, “Autoregressive Conditional Heteroscedasticity with Estimates of the Variance of United Kingdom Inflation”, <em>Econometrica</em> 50(4), 1982",
   "T. Bollerslev, “Generalized Autoregressive Conditional Heteroskedasticity”, <em>Journal of Econometrics</em> 31(3), 1986",
   "J.P. Morgan/Reuters, <em>RiskMetrics — Technical Document</em>, 4th ed., 1996"
  ]
 },
 "correlation-risk": {
  "example": "Two assets, each 20% volatile, held 50/50. At a correlation of 0.2 the portfolio’s volatility is <strong>15.5%</strong>. If the correlation rises to 0.9 in a crisis it is <strong>19.5%</strong> — almost the volatility of either asset alone. The diversification you counted on in calm markets is mostly gone exactly when losses come.",
  "fails": [
   "Correlations measured in high-volatility periods are biased upwards even if the underlying link has not changed (Forbes &amp; Rigobon 2002); some of the “breakdown” is a measurement effect.",
   "The rise is real in the tails, though: equity markets are more correlated in big down-moves than in big up-moves (Longin &amp; Solnik 2001; Ang &amp; Chen 2002).",
   "One number cannot describe dependence in the tails; that is what copulas and stress scenarios are for."
  ],
  "code": "vol = np.array([0.20, 0.20])                               # two assets, 20% volatility each\nw = np.array([0.5, 0.5])\n\ndef port_vol(rho):\n    cov = np.outer(vol, vol) * np.array([[1, rho], [rho, 1]])\n    return np.sqrt(w @ cov @ w)\n\ncalm, stress = port_vol(0.2), port_vol(0.9)",
  "sources": [
   "K. J. Forbes &amp; R. Rigobon, “No Contagion, Only Interdependence: Measuring Stock Market Comovements”, <em>Journal of Finance</em> 57(5), 2002",
   "F. Longin &amp; B. Solnik, “Extreme Correlation of International Equity Markets”, <em>Journal of Finance</em> 56(2), 2001",
   "A. Ang &amp; J. Chen, “Asymmetric Correlations of Equity Portfolios”, <em>Journal of Financial Economics</em> 63(3), 2002"
  ]
 },
 "tail-risk": {
  "example": "How often should a five-standard-deviation down day happen? Under a normal distribution the probability is <strong>2.9 in 10 million</strong> — about once every <strong>13,800 years</strong> of trading. Under a Student-t with 3 degrees of freedom, scaled to the same volatility, it is <strong>0.16%</strong> — roughly once every <strong>2.5 years</strong>. Same volatility, a different tail, and a different world.",
  "fails": [
   "The tail shape is hard to estimate: by definition there are few tail observations, and the choice of model (t, GPD threshold) drives the answer.",
   "Fat tails partly come from changing volatility; scaling returns by a GARCH estimate makes them look much less extreme (McNeil &amp; Frey 2000).",
   "Kurtosis is a noisy statistic dominated by a handful of days; one crash can double it."
  ],
  "code": "from scipy import stats\nk = 5                                                      # a five-standard-deviation down day\np_normal = stats.norm.cdf(-k)\np_fat = stats.t.cdf(-k * np.sqrt(3), df=3)                 # Student-t with 3 d.o.f., scaled to the same volatility\nyears_normal, years_fat = 1 / (p_normal * 252), 1 / (p_fat * 252)   # how often, in trading years",
  "sources": [
   "B. Mandelbrot, “The Variation of Certain Speculative Prices”, <em>Journal of Business</em> 36(4), 1963",
   "R. Cont, “Empirical Properties of Asset Returns: Stylized Facts and Statistical Issues”, <em>Quantitative Finance</em> 1(2), 2001",
   "A. J. McNeil &amp; R. Frey, “Estimation of Tail-Related Risk Measures for Heteroscedastic Financial Time Series: An Extreme Value Approach”, <em>Journal of Empirical Finance</em> 7(3–4), 2000"
  ]
 },
 "mean-variance": {
  "example": "Three assets: stocks (7% expected, 16% volatile), bonds (3%, 5%) and real estate (5%, 12%). The maximum-Sharpe portfolio holds <strong>29% / 57% / 14%</strong>. Raise the stocks’ expected return by a single point — well inside anyone’s margin of error — and it becomes <strong>37% / 55% / 8%</strong>: real estate nearly halves. The optimizer treats guesses as facts.",
  "fails": [
   "Small errors in expected returns produce large swings in weights (Best &amp; Grauer 1991); Michaud (1989) called optimizers “estimation-error maximizers”.",
   "Out of sample, simple 1/N weights are hard to beat with sample estimates (DeMiguel, Garlappi &amp; Uppal 2009).",
   "Shrinking the covariance matrix (Ledoit &amp; Wolf 2004), adding constraints or starting from market weights (Black–Litterman) makes the results usable."
  ],
  "code": "mu = np.array([0.07, 0.03, 0.05])                         # stocks, bonds, real estate: expected returns\nvol = np.array([0.16, 0.05, 0.12])\nrho = np.array([[1, 0.1, 0.5], [0.1, 1, 0.2], [0.5, 0.2, 1]])\ncov = np.outer(vol, vol) * rho\nrf = 0.02\n\ndef tangency(mu):                                          # the maximum-Sharpe portfolio\n    w = np.linalg.solve(cov, mu - rf)\n    return w / w.sum()\n\nbase = tangency(mu)\nnudged = tangency(mu + [0.01, 0, 0])                       # one point more expected from stocks",
  "sources": [
   "H. Markowitz, “Portfolio Selection”, <em>Journal of Finance</em> 7(1), 1952",
   "R. O. Michaud, “The Markowitz Optimization Enigma: Is ‘Optimized’ Optimal?”, <em>Financial Analysts Journal</em> 45(1), 1989",
   "M. J. Best &amp; R. R. Grauer, “On the Sensitivity of Mean-Variance-Efficient Portfolios to Changes in Asset Means”, <em>Review of Financial Studies</em> 4(2), 1991",
   "V. DeMiguel, L. Garlappi &amp; R. Uppal, “Optimal Versus Naive Diversification: How Inefficient Is the 1/N Portfolio Strategy?”, <em>Review of Financial Studies</em> 22(5), 2009"
  ]
 },
 "risk-parity": {
  "example": "A 60/40 portfolio of stocks (16% volatile) and bonds (5%) looks balanced by money, but stocks supply <strong>94%</strong> of its risk. Weighting by inverse volatility gives <strong>24% stocks, 76% bonds</strong>, with each contributing <strong>50%</strong> of the risk. That portfolio is much less volatile, so to match 60/40’s risk it needs about <strong>1.77×</strong> leverage — which is where the bond leverage in risk parity comes from.",
  "fails": [
   "Inverse volatility only equalizes risk for two assets or when correlations are equal; with more assets you need to solve for equal contributions.",
   "It relies on leverage being cheap and available; the bet is that low-volatility assets pay more per unit of risk (Asness, Frazzini &amp; Pedersen 2012).",
   "When bonds and stocks fall together, as in 2022, the “balance” offers little protection."
  ],
  "code": "vol = np.array([0.16, 0.05])                               # stocks, bonds\ncov = np.outer(vol, vol) * np.array([[1, 0.1], [0.1, 1]])\n\ndef contributions(w):                                      # each asset's share of portfolio variance\n    return w * (cov @ w) / (w @ cov @ w)\n\nsixty_forty = contributions(np.array([0.6, 0.4]))\nw_rp = (1 / vol) / (1 / vol).sum()                         # inverse volatility: equal risk for two assets\nparity = contributions(w_rp)\nrp_vol = np.sqrt(w_rp @ cov @ w_rp)\nleverage = np.sqrt(np.array([0.6, 0.4]) @ cov @ np.array([0.6, 0.4])) / rp_vol   # to match 60/40's risk",
  "sources": [
   "S. Maillard, T. Roncalli &amp; J. Teïletche, “The Properties of Equally Weighted Risk Contribution Portfolios”, <em>Journal of Portfolio Management</em> 36(4), 2010",
   "C. S. Asness, A. Frazzini &amp; L. H. Pedersen, “Leverage Aversion and Risk Parity”, <em>Financial Analysts Journal</em> 68(1), 2012",
   "E. Qian, “Risk Parity Portfolios: Efficient Portfolios Through True Diversification”, PanAgora Asset Management, 2005"
  ]
 },
 "factor-models": {
  "example": "Five years of simulated monthly returns for a fund that is 1.1 × the market plus 0.4 × a size factor, and <em>no</em> alpha. Regressing on both factors recovers betas of <strong>1.08</strong> and <strong>0.33</strong>, an R² of <strong>0.97</strong> and an annual alpha of just <strong>0.3%</strong>. Leave out the size factor and the same fund shows an alpha of <strong>1.5%</strong> a year — skill invented by a missing factor.",
  "fails": [
   "Alpha is defined relative to the factors you include; change the model and the “skill” changes.",
   "Hundreds of factors have been published; many are likely false discoveries, and Harvey, Liu &amp; Zhu (2016) argue for a t-statistic above 3 for new ones.",
   "Betas drift over time; a five-year regression averages over regimes."
  ],
  "code": "rng = np.random.default_rng(8)\nn = 60                                                     # five years of monthly returns, simulated\nmkt = rng.normal(0.007, 0.045, n)\nsmb = rng.normal(0.002, 0.03, n)                           # small minus big\nfund = 0.000 + 1.1 * mkt + 0.4 * smb + rng.normal(0, 0.01, n)   # no true alpha\nX = np.column_stack([np.ones(n), mkt, smb])\ncoef, *_ = np.linalg.lstsq(X, fund, rcond=None)\nalpha, b_mkt, b_smb = coef\nresid = fund - X @ coef\nr2 = 1 - resid.var() / fund.var()\ncapm_alpha = np.linalg.lstsq(X[:, :2], fund, rcond=None)[0][0]   # leaving out the size factor",
  "sources": [
   "W. F. Sharpe, “Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk”, <em>Journal of Finance</em> 19(3), 1964",
   "E. F. Fama &amp; K. R. French, “Common Risk Factors in the Returns on Stocks and Bonds”, <em>Journal of Financial Economics</em> 33(1), 1993",
   "C. R. Harvey, Y. Liu &amp; H. Zhu, “… and the Cross-Section of Expected Returns”, <em>Review of Financial Studies</em> 29(1), 2016"
  ]
 },
 "rebalancing": {
  "example": "Ten years of simulated monthly returns on a 60/40 portfolio. A threshold rule — trade back to 60/40 only when stocks drift more than 5 points away — trades just <strong>3 times</strong>. Left alone, the same portfolio ends at <strong>45/55</strong>: in this run stocks lagged, and doing nothing would have quietly halved the gap between them and bonds. Drift can go either way; the point is that it is not a choice.",
  "fails": [
   "Rebalancing controls risk; it does not reliably add return. When one asset trends for years, it sells the winner all the way up.",
   "The “diversification return” from rebalancing is real but small, and depends on volatility and low correlation (Booth &amp; Fama 1992).",
   "Costs and taxes make tight bands expensive; most of the risk control comes from wide bands checked now and then (Jaconetti, Kinniry &amp; Zilbering 2010)."
  ],
  "code": "rng = np.random.default_rng(5)\nr = np.column_stack([rng.normal(0.008, 0.045, 120), rng.normal(0.003, 0.012, 120)])   # ten years, monthly, simulated\ntarget, band = np.array([0.6, 0.4]), 0.05\nw, trades, drift = target.copy(), 0, target.copy()\nfor m in r:\n    w = w * (1 + m); w /= w.sum()                          # weights drift with returns\n    drift = drift * (1 + m); drift /= drift.sum()          # never rebalanced\n    if abs(w[0] - target[0]) &gt; band:                       # threshold rule: back to 60/40 when 5 points off\n        w, trades = target.copy(), trades + 1",
  "sources": [
   "D. G. Booth &amp; E. F. Fama, “Diversification Returns and Asset Contributions”, <em>Financial Analysts Journal</em> 48(3), 1992",
   "C. M. Jaconetti, F. M. Kinniry Jr. &amp; Y. Zilbering, <em>Best Practices for Portfolio Rebalancing</em>, Vanguard research, 2010"
  ]
 },
 "diversification": {
  "example": "Stocks that are each 30% volatile, with an average correlation of 0.3, held in equal weights. One stock: <strong>30%</strong>. Five: <strong>19.9%</strong>. Twenty: <strong>17.4%</strong>. A hundred: <strong>16.6%</strong>. Ten thousand: <strong>16.4%</strong>. The 1/√N rule only holds for uncorrelated assets; with correlation there is a floor — σ√ρ, here 16.4% — that no number of similar stocks removes.",
  "fails": [
   "“15–20 stocks is enough” comes from the 1960s and 80s (Evans &amp; Archer 1968; Statman 1987). As individual stocks became more volatile, more were needed for the same effect (Campbell et al. 2001).",
   "Volatility is not the only risk: a portfolio of 30 stocks can still miss the few big winners that drive index returns.",
   "Correlations rise in crises (see Correlation Risk), so the floor moves up when it matters."
  ],
  "code": "sigma, rho = 0.30, 0.30                                   # each stock 30% volatile, average correlation 0.3\nn = np.array([1, 5, 20, 100, 10_000])\nport = sigma * np.sqrt(rho + (1 - rho) / n)                # equal weights\nfloor = sigma * np.sqrt(rho)                               # what no number of such stocks removes",
  "sources": [
   "J. L. Evans &amp; S. H. Archer, “Diversification and the Reduction of Dispersion: An Empirical Analysis”, <em>Journal of Finance</em> 23(5), 1968",
   "M. Statman, “How Many Stocks Make a Diversified Portfolio?”, <em>Journal of Financial and Quantitative Analysis</em> 22(3), 1987",
   "J. Y. Campbell, M. Lettau, B. G. Malkiel &amp; Y. Xu, “Have Individual Stocks Become More Volatile? An Empirical Exploration of Idiosyncratic Risk”, <em>Journal of Finance</em> 56(1), 2001"
  ]
 },
 "kelly-criterion": {
  "example": "Even-money bets you win 55% of the time: Kelly says bet <strong>10%</strong>. Expected log growth per bet is <strong>0.00501</strong> at full Kelly and <strong>0.00375</strong> at half Kelly — three-quarters of the growth for half the risk. At double Kelly growth is <strong>−0.00014</strong>, already shrinking, and at 2.5× it is clearly negative. Betting too little only slows growth; betting more than about twice Kelly turns a winning edge into a losing strategy.",
  "fails": [
   "Kelly assumes you know p and b. With an estimated edge, an overestimate pushes you past the peak, which is why practitioners use half Kelly or less (Thorp 2006).",
   "Full Kelly has deep drawdowns: there is a 50% chance of halving your capital at some point.",
   "It maximizes long-run growth, which is not the same as what an investor with a horizon or liabilities wants."
  ],
  "code": "p, b = 0.55, 1.0                                           # win 55% of even-money bets\nkelly = (p * b - (1 - p)) / b\n\ndef growth(f):                                             # expected log growth per bet\n    return p * np.log(1 + b * f) + (1 - p) * np.log(1 - f)\n\nrates = {m: growth(m * kelly) for m in (0.5, 1, 2, 2.5)}",
  "sources": [
   "J. L. Kelly Jr., “A New Interpretation of Information Rate”, <em>Bell System Technical Journal</em> 35(4), 1956",
   "E. O. Thorp, “The Kelly Criterion in Blackjack, Sports Betting and the Stock Market”, in <em>Handbook of Asset and Liability Management</em>, vol. 1, Elsevier, 2006",
   "<em>Fortune’s Formula</em>, W. Poundstone, Hill and Wang, 2005"
  ]
 },
 "fixed-fractional": {
  "example": "50,000 of equity, 1% risk per trade, entry 40 and stop 37: <strong>166 shares</strong>, so a stopped-out trade loses about 500. Because each bet is 1% of what is left, losses shrink as equity falls. Twenty losers in a row leave <strong>40,895</strong> (82%); even a hundred leave <strong>18,302</strong>. You never quite reach zero — but you do need ever larger gains to climb back.",
  "fails": [
   "The stop is assumed to fill at 37. Gaps and fast markets fill below it, so the real risk per trade is higher than 1%.",
   "Correlated positions are one bet: five trades at 1% on the same theme risk closer to 5%.",
   "It controls the size of losses, not whether the strategy has an edge."
  ],
  "code": "equity, risk = 50_000, 0.01                               # risk 1% of equity per trade\nentry, stop = 40.0, 37.0\nshares = int(equity * risk / (entry - stop))\nafter_20_losses = equity * (1 - risk) ** 20\nafter_100_losses = equity * (1 - risk) ** 100",
  "sources": [
   "<em>Portfolio Management Formulas</em>, R. Vince, Wiley, 1990",
   "<em>Trade Your Way to Financial Freedom</em>, V. K. Tharp, McGraw-Hill, 1998",
   "J. L. Kelly Jr., “A New Interpretation of Information Rate”, <em>Bell System Technical Journal</em> 35(4), 1956"
  ]
 },
 "volatility-sizing": {
  "example": "Two 50-dollar stocks, one with an ATR of 1.0 and one with 2.5. Risking 1,000 per trade with a stop at 2 × ATR gives <strong>500 shares</strong> (25,000) of the steady stock and <strong>200 shares</strong> (10,000) of the jumpy one. Different position sizes, the same loss if the stop is hit.",
  "fails": [
   "ATR measures recent volatility; the position is sized for the last two weeks, not the next shock.",
   "It equalizes each position’s risk but ignores correlation between them.",
   "Scaling exposure down when volatility is high has helped historically (Moreira &amp; Muir 2017), but it means selling into turbulence."
  ],
  "code": "risk_per_trade, n = 1_000, 2                              # dollars at risk, stop at 2 x ATR\nassets = pd.DataFrame({'price': [50, 50], 'atr': [1.0, 2.5]}, index=['steady', 'jumpy'])\nassets['shares'] = (risk_per_trade / (n * assets.atr)).astype(int)\nassets['position'] = assets.shares * assets.price",
  "sources": [
   "<em>Way of the Turtle</em>, C. Faith, McGraw-Hill, 2007",
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder Jr., 1978 — ATR",
   "A. Moreira &amp; T. Muir, “Volatility-Managed Portfolios”, <em>Journal of Finance</em> 72(4), 2017"
  ]
 },
 "pyramiding": {
  "example": "Buy 100 shares at 100, add 50 at 105 and 25 at 110. The average cost is <strong>102.86</strong>. With the stop raised to 103, under the second add, the whole position stopped out still makes about <strong>+25</strong>. Had the same 175 shares been bought at 110, the same stop would lose <strong>1,225</strong>. Adding smaller as the trade works keeps the average cost behind the price.",
  "fails": [
   "Each add raises the average cost; adding equal or larger amounts can turn a winner into a loser on a small pullback.",
   "It only pays in trends. In a range, every add is bought near the top of it.",
   "Raising the stop is what makes it safe; without that, pyramiding is just a bigger bet."
  ],
  "code": "tiers = pd.DataFrame({'price': [100, 105, 110], 'shares': [100, 50, 25]})   # each add half the last\navg = (tiers.price * tiers.shares).sum() / tiers.shares.sum()\nstop = 103                                                 # stop raised under the second add\nat_stop = (stop - avg) * tiers.shares.sum()\nflat = (stop - 110) * 175                                  # the same 175 shares bought all at 110",
  "sources": [
   "<em>Way of the Turtle</em>, C. Faith, McGraw-Hill, 2007",
   "B. Hurst, Y. H. Ooi &amp; L. H. Pedersen, “A Century of Evidence on Trend-Following Investing”, <em>Journal of Portfolio Management</em> 44(1), 2017",
   "<em>Reminiscences of a Stock Operator</em>, E. Lefèvre, 1923"
  ]
 },
 "max-position": {
  "example": "Seven positions, the largest at 30% and 20%. Capping each at 15% and spreading the excess over the others pro rata gives <strong>15, 15, 15, 15, 15, 13.3 and 11.7%</strong>. If the top name then halves, the portfolio loses <strong>7.5%</strong> instead of <strong>15%</strong>. The cap does not make the picks better; it bounds what one mistake can cost.",
  "fails": [
   "Caps on single names miss correlated exposure: seven positions in one sector are one position.",
   "Limits on market value miss leverage and derivatives; Archegos built huge exposure through swaps that did not show up as holdings.",
   "Rules like UCITS 5/10/40 and the U.S. 75-5-10 test set minimums for funds, not good practice for every portfolio."
  ],
  "code": "w = pd.Series({'A': 0.30, 'B': 0.20, 'C': 0.15, 'D': 0.10, 'E': 0.10, 'F': 0.08, 'G': 0.07})\ncap = 0.15\nwhile (w &gt; cap + 1e-12).any():                             # trim to the cap, share the excess pro rata\n    excess = (w - cap).clip(lower=0).sum()\n    w = w.clip(upper=cap)\n    room = w &lt; cap\n    w[room] += excess * w[room] / w[room].sum()\nhit_before = 0.30 * 0.5                                    # the top name halves\nhit_after = w.max() * 0.5",
  "sources": [
   "Directive 2009/65/EC (UCITS), Article 52 — the 5/10/40 rule",
   "Investment Company Act of 1940, Section 5(b)(1) — the 75-5-10 test for a diversified fund",
   "Paul, Weiss, <em>Credit Suisse Group Special Committee of the Board of Directors Report on Archegos Capital Management</em>, 2021"
  ]
 },
 "options-hedging": {
  "example": "A stock at 100, a 90 put for 2.5 and a 115 call sold for 2.0. With the put alone, the worst case is <strong>−12.5</strong> whether the stock ends at 90 or 70, and at 130 you keep <strong>+27.5</strong>. The collar uses the call premium to cut the floor to <strong>−10.5</strong>, but caps the gain at <strong>+14.5</strong>. Protection is paid for either in premium or in upside.",
  "fails": [
   "Puts are usually priced above the volatility that follows, so rolling them continuously costs more over time than the losses they prevent for most investors (Israelov 2019).",
   "The hedge only covers the period you bought; crashes that start just after an expiry are not covered.",
   "Delta hedging needs continuous trading; in a gap it fails the way portfolio insurance did in 1987."
  ],
  "code": "S0, put_k, put_cost, call_k, call_premium = 100, 90, 2.5, 115, 2.0   # premiums made up\nST = np.array([70, 90, 100, 115, 130])                     # where the stock ends\nstock = ST - S0\nprotective = stock + np.maximum(put_k - ST, 0) - put_cost\ncollar = protective - np.maximum(ST - call_k, 0) + call_premium",
  "sources": [
   "<em>Options, Futures, and Other Derivatives</em>, J. C. Hull, Pearson (any recent edition)",
   "F. Black &amp; M. Scholes, “The Pricing of Options and Corporate Liabilities”, <em>Journal of Political Economy</em> 81(3), 1973",
   "R. Israelov, “Pathetic Protection: The Elusive Benefits of Protective Puts”, <em>Journal of Alternative Investments</em>, 2019"
  ]
 },
 "stop-losses": {
  "example": "Entry at 50, a rise to 59, then a fall to 48. A trailing stop 2 × ATR (1.5) under the highest close sits at <strong>56</strong> once the price reaches 59; the close of <strong>55</strong> on day 10 triggers it, locking in about +10%. A fixed 10% stop at 45 never triggers, and the trade ends at <strong>48</strong>, a loss. The trailing stop protects gains; the fixed one only limits the worst case.",
  "fails": [
   "Stops cost money in random-walk markets: you sell after falls and buy back after rises. They help when returns trend (Kaminski &amp; Lo 2014).",
   "Tight stops are hit by ordinary noise; wide stops let a loser run. ATR-based stops are a compromise, not an answer.",
   "A stop order becomes a market order: in a gap it fills below the stop."
  ],
  "code": "close = pd.Series([50, 51, 53, 52, 55, 57, 56, 59, 58, 55, 56, 53, 51, 52, 48])   # made up\natr = 1.5\ntrail = (close.cummax() - 2 * atr)                         # 2 x ATR under the highest close so far\nexit_trail = close[close &lt; trail].index[0]\nfixed = 50 * 0.90                                          # a fixed 10% stop from the entry\nfixed_hit = (close &lt; fixed).any()",
  "sources": [
   "K. M. Kaminski &amp; A. W. Lo, “When Do Stop-Loss Rules Stop Losses?”, <em>Journal of Financial Markets</em> 18, 2014",
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder Jr., 1978 — ATR",
   "<em>Way of the Turtle</em>, C. Faith, McGraw-Hill, 2007"
  ]
 },
 "pairs-trading": {
  "example": "Two simulated log prices that share a random walk, with a mean-reverting gap between them. Regression recovers the hedge ratio: <strong>1.21</strong> (the true value is 1.2). Today the spread sits <strong>0.54</strong> standard deviations below its mean — no trade at a usual entry of 2. The spread’s half-life is <strong>7.2 days</strong>, a guide to how long a trade should take.",
  "fails": [
   "A good fit in the past is not cointegration in the future; mergers, new business lines or regulation can break a pair for good.",
   "Testing many pairs and keeping the best guarantees some false ones. Use a proper test (Engle–Granger) and out-of-sample data.",
   "Profits from simple pairs trading have fallen since it was published (Do &amp; Faff 2010)."
  ],
  "code": "rng = np.random.default_rng(11)\ncommon = np.cumsum(rng.normal(0, 0.01, 500))               # a shared random walk (log prices)\nspread_true = np.zeros(500)\nfor t in range(1, 500):\n    spread_true[t] = 0.9 * spread_true[t - 1] + rng.normal(0, 0.005)   # a mean-reverting gap\na, b = 4.0 + 1.2 * common + spread_true, 3.0 + common\nbeta = np.polyfit(b, a, 1)[0]                              # hedge ratio\nspread = a - beta * b\nz = (spread[-1] - spread.mean()) / spread.std()\nphi = np.polyfit(spread[:-1], spread[1:], 1)[0]            # AR(1) persistence of the spread\nhalf_life = -np.log(2) / np.log(phi)",
  "sources": [
   "E. Gatev, W. N. Goetzmann &amp; K. G. Rouwenhorst, “Pairs Trading: Performance of a Relative-Value Arbitrage Rule”, <em>Review of Financial Studies</em> 19(3), 2006",
   "R. F. Engle &amp; C. W. J. Granger, “Co-Integration and Error Correction: Representation, Estimation, and Testing”, <em>Econometrica</em> 55(2), 1987",
   "B. Do &amp; R. Faff, “Does Simple Pairs Trading Still Work?”, <em>Financial Analysts Journal</em> 66(4), 2010"
  ]
 },
 "portfolio-insurance": {
  "example": "CPPI on 100 with a floor of 80 and a multiplier of 4: start with 80 in the risky asset. After +5% and +3% the exposure grows to 96 and the value to 106.9; after −10% the value is 96.2. Then a one-day −30% crash: exposure was 64.8, the loss is 19.4, and the value ends at <strong>76.8</strong> — <strong>below the 80 floor</strong>. CPPI protects the floor only if prices move smoothly enough to sell in time.",
  "fails": [
   "The floor breaks in a gap larger than 1/m (here 25%); with a higher multiplier the crash needed is smaller.",
   "It sells after falls and buys after rises. When many follow the same rule, the selling feeds the fall — the Brady Commission pointed to portfolio insurance in the 1987 crash.",
   "After a fall it can lock into cash and miss the recovery: the cushion is gone."
  ],
  "code": "value, floor, m = 100.0, 80.0, 4                          # CPPI: risky exposure = 4 x cushion\nfor move in [0.05, 0.03, -0.10, -0.30]:                    # the last day is a crash\n    risky = min(m * (value - floor), value)\n    value = value + risky * move\n    print(f\"{move:+.0%}  exposure {risky:5.1f}  value {value:5.1f}  floor {floor}\")",
  "sources": [
   "F. Black &amp; R. Jones, “Simplifying Portfolio Insurance”, <em>Journal of Portfolio Management</em> 14(1), 1987",
   "F. Black &amp; A. F. Perold, “Theory of Constant Proportion Portfolio Insurance”, <em>Journal of Economic Dynamics and Control</em> 16(3–4), 1992",
   "<em>Report of the Presidential Task Force on Market Mechanisms</em> (the Brady Report), 1988"
  ]
 },
 "currency-hedging": {
  "example": "A U.S. investor buys 100 euros of European stocks at 1.10. The stocks gain 8% in euros, but the euro falls 10% to 0.99. Unhedged the return in dollars is <strong>−2.8%</strong>. Selling 100 euros forward at the start — at <strong>1.1214</strong>, set by U.S. and euro rates of 5% and 3% — turns it into <strong>+9.1%</strong>: the stock return plus the rate difference, minus a small mismatch on the 8 euros of gain left unhedged.",
  "fails": [
   "The hedge has a cost or a gain set by the interest-rate difference; hedging a high-rate currency back to a low-rate one costs every year.",
   "Over long horizons currency moves partly cancel, and some currencies (the dollar, the yen, the Swiss franc) tend to rise in crises, so leaving them unhedged can reduce risk (Campbell, Serfaty-de Medeiros &amp; Viceira 2010).",
   "Hedging a fixed amount leaves the gains or losses on top of it exposed; hedges need rolling and resizing."
  ],
  "code": "eur, s0, s1 = 100, 1.10, 0.99                             # 100 EUR of stocks; EUR/USD falls 10%\nlocal = 0.08                                               # the stocks return 8% in euros\nfwd = s0 * 1.05 / 1.03                                     # 1-year forward from USD and EUR rates of 5% and 3%\ncost = eur * s0\nunhedged = eur * (1 + local) * s1 / cost - 1\nhedged = (eur * (1 + local) * s1 + eur * (fwd - s1)) / cost - 1   # sell the starting 100 EUR forward",
  "sources": [
   "A. F. Perold &amp; E. C. Schulman, “The Free Lunch in Currency Hedging: Implications for Investment Policy and Performance Standards”, <em>Financial Analysts Journal</em> 44(3), 1988",
   "J. Y. Campbell, K. Serfaty-de Medeiros &amp; L. M. Viceira, “Global Currency Hedging”, <em>Journal of Finance</em> 65(1), 2010",
   "<em>Options, Futures, and Other Derivatives</em>, J. C. Hull, Pearson (any recent edition)"
  ]
 },
 "return-attribution": {
  "example": "Three sectors. The portfolio overweights tech (50% against 40%), which beat the benchmark, and picks better stocks in tech and energy. Brinson–Fachler splits the <strong>1.2%</strong> active return into allocation <strong>0.3%</strong>, selection <strong>0.6%</strong> and interaction <strong>0.3%</strong> — and the three add up exactly.",
  "fails": [
   "Interaction has no natural owner; many reports fold it into selection, which changes the story.",
   "Over several periods the effects do not add up without a linking method, and different methods give different splits (Bacon 2008).",
   "Sectors are not the only way to slice; a factor tilt can show up as “selection” in a sector model."
  ],
  "code": "t = pd.DataFrame({'wp': [0.50, 0.30, 0.20], 'wb': [0.40, 0.40, 0.20],    # portfolio and benchmark weights\n                  'rp': [0.10, 0.04, 0.02], 'rb': [0.08, 0.05, 0.01]},  # sector returns\n                 index=['tech', 'finance', 'energy'])\nRb = (t.wb * t.rb).sum()\nallocation = ((t.wp - t.wb) * (t.rb - Rb)).sum()           # Brinson-Fachler\nselection = (t.wb * (t.rp - t.rb)).sum()\ninteraction = ((t.wp - t.wb) * (t.rp - t.rb)).sum()\nactive = (t.wp * t.rp).sum() - Rb",
  "sources": [
   "G. P. Brinson &amp; N. Fachler, “Measuring Non-U.S. Equity Portfolio Performance”, <em>Journal of Portfolio Management</em> 11(3), 1985",
   "G. P. Brinson, L. R. Hood &amp; G. L. Beebower, “Determinants of Portfolio Performance”, <em>Financial Analysts Journal</em> 42(4), 1986",
   "<em>Practical Portfolio Performance Measurement and Attribution</em>, C. R. Bacon, Wiley, 2nd ed. 2008"
  ]
 },
 "benchmark-tracking": {
  "example": "Twelve months of portfolio and benchmark returns. The portfolio is ahead by <strong>1.9%</strong> a year with a tracking error of <strong>0.94%</strong>: an information ratio of <strong>2.0</strong>. That looks superb, but it is one year — twelve numbers — and an IR estimated from twelve months has a standard error of about 1.",
  "fails": [
   "Low tracking error can mean a closet indexer charging active fees; active share (Cremers &amp; Petajisto 2009) shows how different the holdings really are.",
   "Tracking error from the past understates future risk if the portfolio’s bets have changed.",
   "Minimizing tracking error alone can push a portfolio away from the mean-variance frontier (Roll 1992)."
  ],
  "code": "port  = np.array([1.2, -0.5, 2.1, 0.8, -1.9, 1.5, 0.3, 2.4, -0.7, 1.0, 0.6, -0.2]) / 100   # 12 months, made up\nbench = np.array([1.0, -0.8, 1.8, 1.1, -2.3, 1.2, 0.5, 2.0, -0.4, 0.9, 0.2, -0.5]) / 100\nactive = port - bench\nte = active.std(ddof=1) * np.sqrt(12)                      # annualized tracking error\nir = active.mean() * 12 / te                               # information ratio",
  "sources": [
   "K. J. M. Cremers &amp; A. Petajisto, “How Active Is Your Fund Manager? A New Measure That Predicts Performance”, <em>Review of Financial Studies</em> 22(9), 2009",
   "R. Roll, “A Mean/Variance Analysis of Tracking Error”, <em>Journal of Portfolio Management</em> 18(4), 1992",
   "R. C. Grinold, “The Fundamental Law of Active Management”, <em>Journal of Portfolio Management</em> 15(3), 1989"
  ]
 },
 "alpha-generation": {
  "example": "A manager beats the benchmark by 2% a year with 5% tracking error: an information ratio of <strong>0.4</strong>, which is good. To show that alpha is not luck at the usual t-statistic of 2 takes <strong>25 years</strong> of data. Grinold’s fundamental law says where IR comes from: a small edge per bet (an IC of 0.05) across 100 independent bets a year gives <strong>0.5</strong>.",
  "fails": [
   "Most measured alpha in mutual funds is what luck would produce (Fama &amp; French 2010).",
   "Published anomalies earn much less after publication — over half less on average (McLean &amp; Pontiff 2016); alpha decays as others find and trade it.",
   "Breadth is the number of <em>independent</em> bets; 100 positions on one theme are not 100 bets."
  ],
  "code": "alpha, te = 0.02, 0.05                                   # 2% a year above the benchmark, 5% tracking error\nir = alpha / te\nyears_for_t2 = (2 / ir) ** 2                               # t-stat = IR x sqrt(years); 2 is the usual bar\nic, breadth = 0.05, 100                                    # Grinold: skill per bet and independent bets a year\nir_fundamental = ic * np.sqrt(breadth)",
  "sources": [
   "M. C. Jensen, “The Performance of Mutual Funds in the Period 1945–1964”, <em>Journal of Finance</em> 23(2), 1968",
   "R. C. Grinold, “The Fundamental Law of Active Management”, <em>Journal of Portfolio Management</em> 15(3), 1989",
   "E. F. Fama &amp; K. R. French, “Luck versus Skill in the Cross-Section of Mutual Fund Returns”, <em>Journal of Finance</em> 65(5), 2010",
   "R. D. McLean &amp; J. Pontiff, “Does Academic Research Destroy Stock Return Predictability?”, <em>Journal of Finance</em> 71(1), 2016"
  ]
 },
 "risk-adjusted-perf": {
  "example": "Twelve monthly returns and a 3% risk-free rate. The Sharpe ratio is <strong>0.78</strong>; the Sortino ratio, which only counts downside, is <strong>1.31</strong>, because most of the volatility here was upside. The maximum drawdown was only <strong>2.5%</strong>, so the Calmar ratio is <strong>3.1</strong>. Three ratios, three impressions, from the same twelve numbers.",
  "fails": [
   "Sharpe ratios from short samples are very noisy, and monthly returns that are autocorrelated (smoothed, illiquid assets) inflate them (Lo 2002).",
   "Trying many strategies and reporting the best inflates the Sharpe ratio; the deflated Sharpe ratio corrects for that (Bailey &amp; López de Prado 2014).",
   "Calmar is normally measured over 36 months; one year’s drawdown is too short to say much."
  ],
  "code": "r = np.array([2.1, -1.0, 3.2, 0.5, -2.5, 1.8, 0.9, -0.4, 2.6, -1.6, 1.4, 0.7]) / 100   # 12 months, made up\nrf = 0.03 / 12\nex = r - rf\nsharpe = ex.mean() / ex.std(ddof=1) * np.sqrt(12)\ndownside = np.sqrt((np.minimum(ex, 0) ** 2).mean()) * np.sqrt(12)\nsortino = ex.mean() * 12 / downside\nwealth = np.cumprod(1 + r)\nmdd = (1 - wealth / np.maximum.accumulate(wealth)).max()\ncalmar = (wealth[-1] - 1) / mdd                            # one year, so the total return is the annual one",
  "sources": [
   "W. F. Sharpe, “Mutual Fund Performance”, <em>Journal of Business</em> 39(1), 1966",
   "W. F. Sharpe, “The Sharpe Ratio”, <em>Journal of Portfolio Management</em> 21(1), 1994",
   "F. A. Sortino &amp; L. N. Price, “Performance Measurement in a Downside Risk Framework”, <em>Journal of Investing</em> 3(3), 1994",
   "A. W. Lo, “The Statistics of Sharpe Ratios”, <em>Financial Analysts Journal</em> 58(4), 2002",
   "D. H. Bailey &amp; M. López de Prado, “The Deflated Sharpe Ratio: Correcting for Selection Bias, Backtest Overfitting, and Non-Normality”, <em>Journal of Portfolio Management</em> 40(5), 2014"
  ]
 },
 "drawdown-analysis": {
  "example": "A year of month-end equity. The peak of 108 comes in the third month; the trough of 89 five months later: a maximum drawdown of <strong>17.6%</strong>. Getting back to 108 needed <strong>+21.3%</strong>, and took four months after the bottom. The deeper the fall, the steeper the climb: −50% needs +100%.",
  "fails": [
   "Maximum drawdown is one path. A strategy with the same returns in a different order would have a different number, and a longer history almost always shows a deeper one (Magdon-Ismail &amp; Atiya 2004).",
   "A backtest drawdown is a minimum, not a forecast of the worst.",
   "Duration matters as much as depth: a long shallow drawdown can be harder to sit through than a short deep one."
  ],
  "code": "equity = pd.Series([100, 104, 108, 103, 97, 91, 94, 89, 95, 99, 104, 110, 113])   # month-end, made up\npeak = equity.cummax()\ndd = equity / peak - 1\nmdd = dd.min()\ntrough = dd.idxmin()\nstart = equity[:trough].idxmax()\nrecovered = equity[(equity.index &gt; trough) &amp; (equity &gt;= peak[trough])].index.min()\nto_recover = 1 / (1 + mdd) - 1                             # gain needed from the bottom",
  "sources": [
   "M. Magdon-Ismail &amp; A. F. Atiya, “Maximum Drawdown”, <em>Risk</em> 17(10), 2004",
   "A. Chekhlov, S. Uryasev &amp; M. Zabarankin, “Drawdown Measure in Portfolio Optimization”, <em>International Journal of Theoretical and Applied Finance</em> 8(1), 2005",
   "A. W. Lo, “The Statistics of Sharpe Ratios”, <em>Financial Analysts Journal</em> 58(4), 2002"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, run: 'markets-risk/' + id, codeNote: 'Assumes <code>import numpy as np</code> and <code>import pandas as pd</code>. Each snippet carries its own example numbers; the comments say which are made up or simulated.' });
}
/* depth:end */

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome()
    + buildValueAtRisk() + buildExpectedShortfall() + buildVolatilityModeling()
    + buildCorrelationRisk() + buildTailRisk()
    + buildMeanVariance() + buildRiskParity() + buildFactorModels()
    + buildRebalancing() + buildDiversification()
    + buildKellyCriterion() + buildFixedFractional() + buildVolatilitySizing()
    + buildPyramiding() + buildMaxPosition()
    + buildOptionsHedging() + buildStopLosses() + buildPairsTrading()
    + buildPortfolioInsurance() + buildCurrencyHedging()
    + buildReturnAttribution() + buildBenchmarkTracking() + buildAlphaGeneration()
    + buildRiskAdjustedPerf() + buildDrawdownAnalysis();
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Risk &amp; <em>Portfolio</em></h2>
    <p style="margin-top:14px">25 interactive topics &mdash; quantify risk, construct portfolios, size positions, hedge exposure, and measure performance.</p>
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-risk','value-at-risk')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5 21 19.5H3z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="16.6" r=".6" fill="currentColor" stroke="none"/></svg></div>
      <div class="cat-card-name">Risk Measures</div>
      <div class="cat-card-count">5 topics &middot; VaR, CVaR, GARCH, Correlation, Tail</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-port','mean-variance')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="10" y1="10" x2="10" y2="19"/></svg></div>
      <div class="cat-card-name">Portfolio Construction</div>
      <div class="cat-card-count">5 topics &middot; MVO, Risk Parity, Factors, Rebalancing</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-size','kelly-criterion')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="9" cy="8" r="2.3"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="15" cy="16" r="2.3"/></svg></div>
      <div class="cat-card-name">Position Sizing</div>
      <div class="cat-card-count">5 topics &middot; Kelly, Fractional, Volatility, Pyramiding</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-hedge','options-hedging')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z"/></svg></div>
      <div class="cat-card-name">Hedging &amp; Protection</div>
      <div class="cat-card-count">5 topics &middot; Options, Stops, Pairs, Insurance, FX</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-perf','return-attribution')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="15"/></svg></div>
      <div class="cat-card-name">Performance &amp; Attribution</div>
      <div class="cat-card-count">5 topics &middot; Brinson, Tracking, Alpha, Sharpe, Drawdown</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildValueAtRisk() {
  return `<div class="topic" id="value-at-risk">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">01 — Risk Measures</div><h2>Value at <em>Risk</em> (VaR)</h2></div><span class="topic-badge">Quantile Loss</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Maximum expected loss at a chosen confidence level over a given horizon</p>
  <p class="prose">VaR answers one question: <em>"What is the worst loss I should expect on a normal day?"</em> Three methods dominate — parametric (variance-covariance), historical simulation, and Monte Carlo. Parametric VaR assumes normally distributed returns:</p>
  <div class="fb"><div class="fm">VaR<sub>&alpha;</sub> = &mu; &minus; z<sub>&alpha;</sub> &middot; &sigma;</div><div class="fd"><span>z<sub>&alpha;</sub></span> is the inverse-normal quantile (e.g. 1.645 for 95 %). Historical simulation makes no distributional assumption — it ranks past P&amp;L and reads the quantile directly.</div></div>
  <div class="va">
    <div class="vl">// Interactive — confidence level vs. VaR threshold</div>
    <canvas id="cvs-value-at-risk" role="img" aria-label="Value at Risk (VaR): Interactive — confidence level vs. VaR threshold" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Confidence %</span><input type="range" min="90" max="99" value="95" data-ctrl="varConf"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Method</th><th>Assumption</th><th>Strength</th></tr></thead>
    <tbody>
      <tr><td>Parametric</td><td>Normal returns</td><td>Fastest to compute</td></tr>
      <tr><td>Historical</td><td>None (empirical)</td><td>Captures fat tails</td></tr>
      <tr><td>Monte Carlo</td><td>Model-dependent</td><td>Flexible payoff profiles</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Limitation.</strong> VaR says nothing about the <em>magnitude</em> of losses beyond the threshold — Expected Shortfall fills that gap.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Confidence intervals and quantiles are foundational in <a href="../../stats/index.html#confidence-intervals">The Toolkit — Confidence Intervals</a>.</div>
  <div class="playground">
    <div class="playground-title">Experiment — your portfolio's VaR</div>
    <div class="pg-controls">
      <label>Portfolio ($) <input type="range" id="varPortfolio" min="10000" max="1000000" step="10000" value="100000" oninput="updateVaRPlayground()"><span class="pg-val" id="varPortV">$100K</span></label>
      <label>Annual vol (%) <input type="range" id="varVol" min="5" max="60" step="1" value="20" oninput="updateVaRPlayground()"><span class="pg-val" id="varVolV">20%</span></label>
      <label>Confidence <input type="range" id="varConfPg" min="90" max="99" step="1" value="95" oninput="updateVaRPlayground()"><span class="pg-val" id="varConfV">95%</span></label>
    </div>
    <div class="pg-output" id="varPlayground">
      <span id="varResult">Adjust sliders to calculate your portfolio's Value at Risk.</span>
    </div>
  </div>
  <div class="perf-insight">
    <div class="perf-insight-title">Performance in practice</div>
    <ul>
      <li>Under the 1996 Basel Market Risk Amendment, market-risk capital was based on 99% 10-day VaR times a multiplier of at least 3. Basel III’s FRTB replaces it with 97.5% Expected Shortfall</li>
      <li>In 2008 many banks saw far more days with losses beyond VaR than their models allowed — normal assumptions and calm-period data understated the tails</li>
      <li>J.P. Morgan’s RiskMetrics (1994) popularised VaR, modelling returns as conditionally normal with EWMA volatility (λ = 0.94)</li>
      <li>Modern practice: run all three methods and report the worst case. If they disagree significantly, your risk model has a blind spot</li>
    </ul>
  </div>
  <div class="why-matters">
    <div class="why-matters-title">When to use this</div>
    <div class="use-when">✓ <strong>Use when:</strong> Setting position sizes. Regulatory reporting (Basel III). Communicating risk to non-technical stakeholders. Comparing risk across different portfolios or strategies.</div>
    <div class="skip-when">✗ <strong>Skip when:</strong> You need to understand tail risk severity (use Expected Shortfall). Illiquid positions where you can't exit at market price. Options/derivatives with non-linear payoffs (use Monte Carlo or stress tests instead).</div>
  </div>
  <div class="dev-export">
    <div class="dev-export-title">Quick start — copy to notebook</div>
    <pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install numpy pandas yfinance scipy
# ────────────────────────────────────────
import numpy as np, pandas as pd, yfinance as yf
from scipy.stats import norm

prices = yf.download('SPY', period='2y')['Close']
returns = prices.pct_change().dropna()

# Parametric VaR (95%, 1-day)
mu, sigma = returns.mean(), returns.std()
var_95 = -(mu + norm.ppf(0.05) * sigma)
print(f"Parametric VaR (95%): {var_95:.2%}")

# Historical VaR
var_hist = -np.percentile(returns, 5)
print(f"Historical VaR (95%): {var_hist:.2%}")

# Dollar VaR for $100K portfolio
portfolio = 100_000
print(f"1-day dollar VaR: \${portfolio * var_95:,.0f}")</code></pre>
  </div>
  ${depthHtml('value-at-risk')}
  <div class="topic-nav" id="nav-value-at-risk"></div>
</div>`;
}

function buildExpectedShortfall() {
  return `<div class="topic" id="expected-shortfall">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Risk Measures</div><h2>Expected <em>Shortfall</em> (CVaR)</h2></div><span class="topic-badge">Tail Average</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Average loss in the worst &alpha; % of scenarios</p>
  <p class="prose">Expected Shortfall (ES), also called Conditional VaR, is the <em>mean</em> of all losses exceeding the VaR cutoff. It is <strong>sub-additive</strong> — the ES of a combined portfolio is never more than the sum of the parts’ ES — so regulators prefer it to VaR.</p>
  <div class="fb"><div class="fm">ES<sub>&alpha;</sub> = E[ L | L &gt; VaR<sub>&alpha;</sub> ]</div><div class="fd"><span>For a normal distribution</span> ES has a closed-form: ES = &mu; + &sigma; &middot; &phi;(z<sub>&alpha;</sub>) / (1 &minus; &alpha;). For fat-tailed distributions Monte Carlo or historical methods are used.</div></div>
  <div class="va">
    <div class="vl">// Interactive — tail threshold and expected shortfall region</div>
    <canvas id="cvs-expected-shortfall" role="img" aria-label="Expected Shortfall (CVaR): Interactive — tail threshold and expected shortfall region" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Tail &alpha; %</span><input type="range" min="1" max="10" value="5" data-ctrl="esTail"></div>
    </div>
  </div>
  <div class="callout info"><strong>Basel III.</strong> Banks must now report Expected Shortfall at 97.5 % under the Fundamental Review of the Trading Book (FRTB).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Expectation and conditioning connect to <a href="../../stats/index.html#distribution-shape">The Toolkit — Distribution Shape</a>.</div>
  ${depthHtml('expected-shortfall')}
  <div class="topic-nav" id="nav-expected-shortfall"></div>
</div>`;
}

function buildVolatilityModeling() {
  return `<div class="topic" id="volatility-modeling">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">03 — Risk Measures</div><h2>Volatility <em>Modeling</em></h2></div><span class="topic-badge">Forecasting</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Estimate and forecast return variance with GARCH, EWMA, and realized measures</p>
  <p class="prose">Volatility clusters — large moves beget large moves. GARCH(1,1) captures this:</p>
  <div class="fb"><div class="fm">&sigma;&sup2;<sub>t</sub> = &omega; + &alpha; &middot; r&sup2;<sub>t&minus;1</sub> + &beta; &middot; &sigma;&sup2;<sub>t&minus;1</sub></div><div class="fd"><span>EWMA</span> is a special case with &omega; = 0 and &alpha; + &beta; = 1 (RiskMetrics uses &lambda; = 0.94). Realized volatility sums intraday squared returns for a model-free estimate.</div></div>
  <div class="va">
    <div class="vl">// Interactive — EWMA decay parameter and conditional variance</div>
    <canvas id="cvs-volatility-modeling" role="img" aria-label="Volatility Modeling: Interactive — EWMA decay parameter and conditional variance" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">EWMA &lambda;</span><input type="range" min="80" max="99" value="94" data-ctrl="ewmaLambda"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Model</th><th>Parameters</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td>EWMA</td><td>&lambda;</td><td>Quick daily VaR</td></tr>
      <tr><td>GARCH(1,1)</td><td>&omega;, &alpha;, &beta;</td><td>Conditional forecasting</td></tr>
      <tr><td>Realized Vol</td><td>Sampling freq</td><td>High-frequency data</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Variance estimation underpins <a href="../../timeseries/index.html#garch">Time Series — GARCH</a>.</div>
  ${depthHtml('volatility-modeling')}
  <div class="topic-nav" id="nav-volatility-modeling"></div>
</div>`;
}

function buildCorrelationRisk() {
  return `<div class="topic" id="correlation-risk">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">04 — Risk Measures</div><h2>Correlation <em>Risk</em></h2></div><span class="topic-badge">Dependence</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Correlations shift in crises — diversification can vanish when you need it most</p>
  <p class="prose">In calm markets, asset correlations are moderate and diversification works. During stress, correlations spike toward 1 — a phenomenon called <strong>correlation breakdown</strong>.</p>
  <div class="fb"><div class="fm">&sigma;&sup2;<sub>p</sub> = w&prime; &Sigma; w</div><div class="fd"><span>Copula models</span> separate marginal distributions from the dependence structure, allowing non-linear tail dependence to be modeled explicitly. Regime-switching models capture correlation shifts.</div></div>
  <div class="va">
    <div class="vl">// Interactive — stress level and correlation regime shift</div>
    <canvas id="cvs-correlation-risk" role="img" aria-label="Correlation Risk: Interactive — stress level and correlation regime shift" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Stress level</span><input type="range" min="0" max="100" value="20" data-ctrl="stressLevel"></div>
    </div>
  </div>
  <div class="callout info"><strong>2008 lesson.</strong> Structured-credit losses soared because default correlations jumped far beyond historical norms.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Correlation and covariance matrices are explored in <a href="../../stats/index.html#feature-correlation">The Toolkit — Feature Correlation</a>.</div>
  ${depthHtml('correlation-risk')}
  <div class="topic-nav" id="nav-correlation-risk"></div>
</div>`;
}

function buildTailRisk() {
  return `<div class="topic" id="tail-risk">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">05 — Risk Measures</div><h2>Tail <em>Risk</em></h2></div><span class="topic-badge">Extremes</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Extreme events beyond normal-distribution assumptions</p>
  <p class="prose">Financial returns exhibit <strong>fat tails</strong> — extreme moves occur far more often than a Gaussian predicts. Kurtosis &gt; 3 signals leptokurtic behavior. Extreme Value Theory (EVT) models the tail with a Generalized Pareto Distribution (GPD):</p>
  <div class="fb"><div class="fm">P(X &gt; x | X &gt; u) &asymp; (1 + &xi; &middot; (x&minus;u)/&beta;)<sup>&minus;1/&xi;</sup></div><div class="fd"><span>A positive &xi; &gt; 0</span> indicates a heavy (Pareto-type) tail. EVT lets us extrapolate loss quantiles beyond sample extremes.</div></div>
  <div class="va">
    <div class="vl">// Interactive — kurtosis and tail weight visualization</div>
    <canvas id="cvs-tail-risk" role="img" aria-label="Tail Risk: Interactive — kurtosis and tail weight visualization" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Kurtosis</span><input type="range" min="3" max="12" value="5" data-ctrl="kurtLevel"></div>
    </div>
  </div>
  <div class="callout info"><strong>Black-swan readiness.</strong> Stress tests should use EVT-calibrated scenarios, not just historical worst days.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Kurtosis and distribution shapes are covered in <a href="../../stats/index.html#distribution-shape">The Toolkit — Distribution Shape</a>. Why the last crash feels likelier than the record says is the <a href="../psychology/#availability-heuristic">availability heuristic</a>.</div>
  ${depthHtml('tail-risk')}
  <div class="topic-nav" id="nav-tail-risk"></div>
</div>`;
}

function buildMeanVariance() {
  return `<div class="topic" id="mean-variance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">06 — Portfolio Construction</div><h2>Mean-Variance <em>Optimization</em></h2></div><span class="topic-badge">Efficient Frontier</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Markowitz efficient frontier — balance return against portfolio variance</p>
  <p class="prose">The 1952 Markowitz framework maximizes expected return for a given level of risk (or minimizes variance for a target return). The <strong>efficient frontier</strong> traces optimal portfolios.</p>
  <div class="fb"><div class="fm">min &frac12; w&prime; &Sigma; w &nbsp; s.t. &nbsp; w&prime; &mu; &ge; r<sub>target</sub>, &nbsp; w&prime; 1 = 1</div><div class="fd"><span>Estimation error</span> in &mu; and &Sigma; makes raw MVO unstable — shrinkage estimators (Ledoit-Wolf) and resampling improve robustness. The tangency portfolio maximizes the Sharpe ratio.</div></div>
  <div class="va">
    <div class="vl">// Interactive — risk aversion and efficient frontier</div>
    <canvas id="cvs-mean-variance" role="img" aria-label="Mean-Variance Optimization: Interactive — risk aversion and efficient frontier" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Risk aversion</span><input type="range" min="1" max="20" value="5" data-ctrl="riskAversion"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Approach</th><th>Fix</th></tr></thead>
    <tbody>
      <tr><td>Shrinkage</td><td>Reduce estimation noise in &Sigma;</td></tr>
      <tr><td>Resampling</td><td>Average across bootstrapped frontiers</td></tr>
      <tr><td>Black-Litterman</td><td>Blend views with equilibrium priors</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Quadratic programming appears in <a href="../../ml-math/index.html#optimizers">ML Math — Optimizers</a>.</div>
  ${depthHtml('mean-variance')}
  <div class="topic-nav" id="nav-mean-variance"></div>
</div>`;
}

function buildRiskParity() {
  return `<div class="topic" id="risk-parity">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">07 — Portfolio Construction</div><h2>Risk <em>Parity</em></h2></div><span class="topic-badge">Equal Risk</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Weight assets so each contributes equally to total portfolio risk</p>
  <p class="prose">Instead of targeting a return, risk parity targets equal <strong>risk contribution</strong> from each asset. This often leads to leveraged bond allocations to match equity volatility.</p>
  <div class="fb"><div class="fm">RC<sub>i</sub> = w<sub>i</sub> &middot; (&Sigma;w)<sub>i</sub> / &sigma;<sub>p</sub> &nbsp; &rarr; &nbsp; RC<sub>i</sub> = RC<sub>j</sub> &nbsp; &forall; i,j</div><div class="fd"><span>Simplest proxy</span> is inverse-volatility weighting: w<sub>i</sub> &prop; 1/&sigma;<sub>i</sub>. True risk parity requires numerical optimization to equalize marginal risk contributions.</div></div>
  <div class="va">
    <div class="vl">// Risk parity — equal contribution allocation</div>
    <canvas id="cvs-risk-parity" role="img" aria-label="Risk parity — equal contribution allocation" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>All-Weather.</strong> Ray Dalio's All-Weather fund popularized risk parity — bonds carry leverage to match equity risk.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Volatility normalization echoes <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
  ${depthHtml('risk-parity')}
  <div class="topic-nav" id="nav-risk-parity"></div>
</div>`;
}

function buildFactorModels() {
  return `<div class="topic" id="factor-models">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">08 — Portfolio Construction</div><h2>Factor <em>Models</em></h2></div><span class="topic-badge">Decomposition</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Decompose returns into systematic factor exposures</p>
  <p class="prose">CAPM uses a single factor (market beta). The Fama-French three-factor model adds size and value. Modern models include momentum, quality, and low-volatility.</p>
  <div class="fb"><div class="fm">r<sub>i</sub> = &alpha;<sub>i</sub> + &beta;<sub>1</sub>F<sub>1</sub> + &beta;<sub>2</sub>F<sub>2</sub> + &hellip; + &epsilon;<sub>i</sub></div><div class="fd"><span>Factor tilts</span> explain most of long-only active returns. Pure alpha — returns unexplained by any factor — is exceedingly rare.</div></div>
  <div class="va">
    <div class="vl">// Factor decomposition — beta exposures</div>
    <canvas id="cvs-factor-models" role="img" aria-label="Factor Models: Factor decomposition — beta exposures" width="720" height="340"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Factor</th><th>Premium Source</th></tr></thead>
    <tbody>
      <tr><td>Market (&beta;)</td><td>Equity risk premium</td></tr>
      <tr><td>Size (SMB)</td><td>Small-firm illiquidity</td></tr>
      <tr><td>Value (HML)</td><td>Distress / behavioral</td></tr>
      <tr><td>Momentum</td><td>Under-reaction</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Regression and betas are explored in <a href="../../ml-math/index.html#linear">ML Math — Linear Regression</a>.</div>
  ${depthHtml('factor-models')}
  <div class="topic-nav" id="nav-factor-models"></div>
</div>`;
}

function buildRebalancing() {
  return `<div class="topic" id="rebalancing">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">09 — Portfolio Construction</div><h2>Rebalancing <em>Strategies</em></h2></div><span class="topic-badge">Maintenance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Maintain target allocations through disciplined rebalancing</p>
  <p class="prose">As prices move, actual weights drift from targets. Rebalancing is a contrarian mechanism — <em>sell winners, buy losers</em> — that harvests the diversification return. Two approaches: <strong>calendar</strong> (monthly, quarterly) and <strong>threshold</strong> (rebalance when drift exceeds a band).</p>
  <div class="fb"><div class="fm">Drift<sub>i</sub> = | w<sub>actual,i</sub> &minus; w<sub>target,i</sub> |</div><div class="fd"><span>Wider bands</span> reduce transaction costs but increase tracking error. The optimal band depends on volatility, expected return differences, and trading costs.</div></div>
  <div class="va">
    <div class="vl">// Interactive — rebalancing bands and drift over time</div>
    <canvas id="cvs-rebalancing" role="img" aria-label="Rebalancing Strategies: Interactive — rebalancing bands and drift over time" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Band width %</span><input type="range" min="1" max="10" value="5" data-ctrl="rebalBand"></div>
    </div>
  </div>
  <div class="callout info"><strong>Tax efficiency.</strong> Threshold-based rebalancing combined with tax-loss harvesting can add value after tax, but the size depends on the tax regime and market path.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Rebalancing sells what ran ahead and buys what fell behind — a standing bet that <a href="../../essays/#essay-mean">regression to the mean</a> holds, and the disciplined opposite of <a href="../../markets/psychology/#herd-behavior">herd behaviour</a>.</div>
  ${depthHtml('rebalancing')}
  <div class="topic-nav" id="nav-rebalancing"></div>
</div>`;
}

function buildDiversification() {
  return `<div class="topic" id="diversification">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">10 — Portfolio Construction</div><h2><em>Diversification</em></h2></div><span class="topic-badge">Free Lunch</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// The only free lunch in finance — spread risk across uncorrelated bets</p>
  <p class="prose">Adding N uncorrelated assets reduces portfolio volatility as 1/&radic;N. Effective diversification requires <em>genuine independence</em> — not just different tickers.</p>
  <div class="fb"><div class="fm">&sigma;<sub>p</sub> = &sigma; / &radic;N &nbsp; (equal weight, zero correlation)</div><div class="fd"><span>True diversification</span> spans asset classes (equity, bonds, commodities, real estate), geographies, strategies, and time horizons. The <strong>diversification ratio</strong> measures how much idiosyncratic risk has been diversified away.</div></div>
  <div class="va">
    <div class="vl">// Interactive — number of assets vs. portfolio volatility</div>
    <canvas id="cvs-diversification" role="img" aria-label="Diversification: Interactive — number of assets vs. portfolio volatility" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Number of assets</span><input type="range" min="1" max="50" value="10" data-ctrl="numAssets"></div>
    </div>
  </div>
  <div class="callout info"><strong>Diminishing returns.</strong> Most diversification benefit arrives by 15-20 uncorrelated assets — beyond that, marginal reduction is small.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The law of large numbers formalizes this in <a href="../../stats/index.html#clt-sampling">The Toolkit — CLT</a>. Equalising risk rather than money across assets is <a href="#risk-parity">risk parity</a>.</div>
  ${depthHtml('diversification')}
  <div class="topic-nav" id="nav-diversification"></div>
</div>`;
}

function buildKellyCriterion() {
  return `<div class="topic" id="kelly-criterion">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">11 — Position Sizing</div><h2>Kelly <em>Criterion</em></h2></div><span class="topic-badge">Optimal Growth</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Optimal bet size for maximum geometric growth</p>
  <p class="prose">Kelly sizing maximizes the expected logarithm of wealth — the fastest compounding rate without risking ruin. For a simple win/loss bet:</p>
  <div class="fb"><div class="fm">f* = (p &middot; b &minus; q) / b</div><div class="fd"><span>p = win probability,</span> q = 1&minus;p, b = win/loss ratio. In continuous markets, Kelly fraction = expected excess return / variance. Most practitioners use <strong>half-Kelly</strong> or less to reduce volatility.</div></div>
  <div class="va">
    <div class="vl">// Interactive — win rate and Kelly fraction</div>
    <canvas id="cvs-kelly-criterion" role="img" aria-label="Kelly Criterion: Interactive — win rate and Kelly fraction" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Win rate %</span><input type="range" min="30" max="80" value="55" data-ctrl="kellyWin"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Fraction</th><th>Growth</th><th>Drawdown</th></tr></thead>
    <tbody>
      <tr><td>Full Kelly</td><td>Max geometric</td><td>Severe</td></tr>
      <tr><td>Half Kelly</td><td>75 % of max</td><td>Much lower</td></tr>
      <tr><td>Quarter Kelly</td><td>~44 % of max</td><td>Mild</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Overbet risk.</strong> Betting more than full Kelly guarantees sub-optimal growth and eventual ruin with parameter uncertainty.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Log-normal growth connects to <a href="../../stats/index.html#distribution-shape">The Toolkit — Distribution Shape</a>.</div>
  ${depthHtml('kelly-criterion')}
  <div class="topic-nav" id="nav-kelly-criterion"></div>
</div>`;
}

function buildFixedFractional() {
  return `<div class="topic" id="fixed-fractional">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">12 — Position Sizing</div><h2>Fixed Fractional <em>Sizing</em></h2></div><span class="topic-badge">Constant %</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Risk a constant percentage of equity on each trade</p>
  <p class="prose">Fixed fractional sizing sets position size so the <em>dollar risk</em> (distance to stop &times; shares) equals a fixed fraction f of current equity.</p>
  <div class="fb"><div class="fm">Position = (Equity &times; f) / (Entry &minus; Stop)</div><div class="fd"><span>Typical f values:</span> 0.5 %&ndash;2 %. This keeps risk proportional to equity — positions shrink after losses and grow after gains, providing natural anti-martingale behavior.</div></div>
  <div class="va">
    <div class="vl">// Interactive — risk fraction and equity curve</div>
    <canvas id="cvs-fixed-fractional" role="img" aria-label="Fixed Fractional Sizing: Interactive — risk fraction and equity curve" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Risk fraction %</span><input type="range" min="1" max="5" value="2" data-ctrl="ffFrac"></div>
    </div>
  </div>
  <div class="callout info"><strong>Ruin probability.</strong> At 1 % risk per trade each loss is 1 % of what is left, so the account shrinks but never reaches zero: 20 straight losers still leave 82 %.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Stop distance interacts with <a href="../indicators/index.html#atr">ATR-based stops</a>.</div>
  ${depthHtml('fixed-fractional')}
  <div class="topic-nav" id="nav-fixed-fractional"></div>
</div>`;
}

function buildVolatilitySizing() {
  return `<div class="topic" id="volatility-sizing">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">13 — Position Sizing</div><h2>Volatility-Based <em>Sizing</em></h2></div><span class="topic-badge">Adaptive</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Normalize position size by asset volatility</p>
  <p class="prose">Different assets have different volatilities. A 100-share position in a 40 % vol stock carries far more risk than in a 10 % vol stock. Volatility sizing equalizes dollar-risk:</p>
  <div class="fb"><div class="fm">Shares = Target $ Risk / (N &times; ATR)</div><div class="fd"><span>N is a multiplier</span> (e.g. 2&times; ATR). The Turtle Traders famously used this approach. Each position contributes roughly equally to portfolio P&amp;L variance.</div></div>
  <div class="va">
    <div class="vl">// Volatility sizing — equal dollar-risk positions</div>
    <canvas id="cvs-volatility-sizing" role="img" aria-label="Volatility-Based Sizing: Volatility sizing — equal dollar-risk positions" width="720" height="340"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ATR computation is explained in <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
  ${depthHtml('volatility-sizing')}
  <div class="topic-nav" id="nav-volatility-sizing"></div>
</div>`;
}

function buildPyramiding() {
  return `<div class="topic" id="pyramiding">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">14 — Position Sizing</div><h2><em>Pyramiding</em></h2></div><span class="topic-badge">Scale In</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Add to winning positions in decreasing tiers</p>
  <p class="prose">Pyramiding builds a full position across multiple entries as a trade moves favorably. Each additional tier is typically <em>smaller</em> than the last so average cost stays well inside the profit zone.</p>
  <div class="fb"><div class="fm">Risk<sub>total</sub> = &Sigma; tier<sub>i</sub> &times; (entry<sub>i</sub> &minus; stop)</div><div class="fd"><span>Common patterns:</span> 4-3-2-1 units, or three equal tiers at predefined price milestones. The stop is usually tightened with each add so that risk on older entries is locked to breakeven.</div></div>
  <div class="va">
    <div class="vl">// Interactive — pyramid tiers and position build-up</div>
    <canvas id="cvs-pyramiding" role="img" aria-label="Pyramiding: Interactive — pyramid tiers and position build-up" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Tiers</span><input type="range" min="1" max="5" value="3" data-ctrl="pyramidTiers"></div>
    </div>
  </div>
  <div class="callout info"><strong>Trend following.</strong> Pyramiding is a hallmark of trend-following systems — it maximizes exposure to strong moves.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Adding to winners is a bet that the trend continues, so it needs a trend gauge such as <a href="../../markets/indicators/#adx">ADX</a> and a volatility yardstick such as <a href="../../markets/indicators/#atr">ATR</a> to size each new tier.</div>
  ${depthHtml('pyramiding')}
  <div class="topic-nav" id="nav-pyramiding"></div>
</div>`;
}

function buildMaxPosition() {
  return `<div class="topic" id="max-position">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">15 — Position Sizing</div><h2>Maximum Position <em>Limits</em></h2></div><span class="topic-badge">Concentration</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Hard caps on concentration to prevent catastrophic single-name losses</p>
  <p class="prose">No matter how attractive a trade, position limits cap exposure. Common tiers:</p>
  <table class="mt">
    <thead><tr><th>Level</th><th>Limit</th></tr></thead>
    <tbody>
      <tr><td>Single name</td><td>2-5 % of equity</td></tr>
      <tr><td>Sector</td><td>15-25 %</td></tr>
      <tr><td>Asset class</td><td>30-60 %</td></tr>
      <tr><td>Total leverage</td><td>1&times;-2&times; (risk parity may use more)</td></tr>
    </tbody>
  </table>
  <p class="prose">Regulatory frameworks (UCITS, 40-Act) enforce their own diversification rules. Risk budgeting integrates position limits with volatility and correlation constraints.</p>
  <div class="va">
    <div class="vl">// Position limits — concentration caps</div>
    <canvas id="cvs-max-position" role="img" aria-label="Maximum Position Limits: Position limits — concentration caps" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Concentration kills.</strong> Archegos lost $20 B+ in days due to massive single-name concentration with leveraged swaps.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Position caps exist because of <a href="../../markets/psychology/#overconfidence">overconfidence</a>: the bigger the conviction, the bigger the bet. Models get the same guard rail from <a href="../../ml-math/#regularization">regularization</a>, which caps how much any one weight can matter.</div>
  ${depthHtml('max-position')}
  <div class="topic-nav" id="nav-max-position"></div>
</div>`;
}

function buildOptionsHedging() {
  return `<div class="topic" id="options-hedging">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">16 — Hedging &amp; Protection</div><h2>Options <em>Hedging</em></h2></div><span class="topic-badge">Non-Linear</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Protective puts, collars, and delta-neutral overlays</p>
  <p class="prose">Options provide non-linear hedging: a <strong>protective put</strong> caps downside while preserving upside. A <strong>collar</strong> finances the put by selling an upside call, reducing net cost.</p>
  <div class="fb"><div class="fm">Collar payoff = Stock + Put(K<sub>1</sub>) &minus; Call(K<sub>2</sub>)</div><div class="fd"><span>Delta hedging</span> continuously adjusts the hedge ratio. The cost is realized volatility — if realized vol &lt; implied vol, the hedge is profitable; otherwise it is a drag.</div></div>
  <div class="va">
    <div class="vl">// Interactive — put strike and payoff profile</div>
    <canvas id="cvs-options-hedging" role="img" aria-label="Options Hedging: Interactive — put strike and payoff profile" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Put strike %</span><input type="range" min="80" max="100" value="95" data-ctrl="putStrike"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Strategy</th><th>Max Loss</th><th>Max Gain</th><th>Net Cost</th></tr></thead>
    <tbody>
      <tr><td>Protective put</td><td>Premium</td><td>Unlimited</td><td>Premium paid</td></tr>
      <tr><td>Collar</td><td>Floored</td><td>Capped</td><td>Low / zero</td></tr>
      <tr><td>Delta hedge</td><td>Slippage</td><td>Vol spread</td><td>Variable</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> A protective put pays max(K − S, 0) — the same hinge as the ReLU in <a href="../../ml-math/#activation">activation functions</a>, flat on one side and linear on the other. <a href="../../markets/psychology/#loss-aversion">Loss aversion</a> is why investors pay for that floor. The same idea for exchange-rate exposure, usually with forwards, is <a href="#currency-hedging">currency hedging</a>.</div>
  ${depthHtml('options-hedging')}
  <div class="topic-nav" id="nav-options-hedging"></div>
</div>`;
}

function buildStopLosses() {
  return `<div class="topic" id="stop-losses">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">17 — Hedging &amp; Protection</div><h2>Stop-Loss <em>Strategies</em></h2></div><span class="topic-badge">Exit Rules</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Mechanical exit rules to limit drawdowns</p>
  <p class="prose">Stops enforce discipline. Types:</p>
  <table class="mt">
    <thead><tr><th>Type</th><th>Trigger</th><th>Pro / Con</th></tr></thead>
    <tbody>
      <tr><td>Hard stop</td><td>Fixed price</td><td>Simple / ignores context</td></tr>
      <tr><td>Percentage</td><td>X % from entry</td><td>Scales with price</td></tr>
      <tr><td>ATR-based</td><td>N &times; ATR from price</td><td>Volatility-aware</td></tr>
      <tr><td>Trailing</td><td>Tracks new highs</td><td>Locks profit / whipsaw risk</td></tr>
    </tbody>
  </table>
  <p class="prose">A 2&times;ATR trailing stop is a popular default — tight enough to limit loss, wide enough to survive normal noise.</p>
  <div class="va">
    <div class="vl">// Interactive — ATR multiplier and stop placement</div>
    <canvas id="cvs-stop-losses" role="img" aria-label="Stop-Loss Strategies: Interactive — ATR multiplier and stop placement" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">ATR multiplier</span><input type="range" min="10" max="40" value="20" data-ctrl="atrMult"></div>
    </div>
  </div>
  <div class="callout info"><strong>Mental stops fail.</strong> Paper stops get overridden by emotion — always enter with a hard order.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ATR calculation in <a href="../indicators/index.html#atr">Indicators — ATR</a>. A trailing stop that tightens as a trend matures is the <a href="../indicators/#parabolic-sar">Parabolic SAR</a>.</div>
  ${depthHtml('stop-losses')}
  <div class="topic-nav" id="nav-stop-losses"></div>
</div>`;
}

function buildPairsTrading() {
  return `<div class="topic" id="pairs-trading">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">18 — Hedging &amp; Protection</div><h2>Pairs <em>Trading</em></h2></div><span class="topic-badge">Market Neutral</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Long/short correlated pairs to profit from spread convergence</p>
  <p class="prose">Pairs trading exploits temporary mispricings between cointegrated securities. The spread = log(P<sub>A</sub>) &minus; &beta; &middot; log(P<sub>B</sub>) should be stationary.</p>
  <div class="fb"><div class="fm">z<sub>t</sub> = (spread<sub>t</sub> &minus; &mu;) / &sigma; &nbsp; &rarr; &nbsp; enter at |z| &gt; 2, exit at |z| &lt; 0.5</div><div class="fd"><span>Cointegration</span> (Engle-Granger or Johansen test) is stronger than correlation — it means the spread is mean-reverting. The Augmented Dickey-Fuller test checks stationarity.</div></div>
  <div class="va">
    <div class="vl">// Interactive — entry z-score and spread convergence</div>
    <canvas id="cvs-pairs-trading" role="img" aria-label="Pairs Trading: Interactive — entry z-score and spread convergence" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Entry z-score</span><input type="range" min="10" max="30" value="20" data-ctrl="pairsZ"></div>
    </div>
  </div>
  <div class="callout info"><strong>Regime risk.</strong> Structural breaks (e.g. mergers, sector shifts) can permanently break a pair's relationship.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Stationarity tests connect to <a href="../../stats/index.html#hypothesis-testing">The Toolkit — Hypothesis Testing</a>.</div>
  ${depthHtml('pairs-trading')}
  <div class="topic-nav" id="nav-pairs-trading"></div>
</div>`;
}

function buildPortfolioInsurance() {
  return `<div class="topic" id="portfolio-insurance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">19 — Hedging &amp; Protection</div><h2>Portfolio <em>Insurance</em></h2></div><span class="topic-badge">Dynamic Floor</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// CPPI and OBPI — dynamic protection with a floor</p>
  <p class="prose">Constant Proportion Portfolio Insurance (CPPI) dynamically allocates between a risky asset and a safe asset (cash/bonds) to protect a minimum floor:</p>
  <div class="fb"><div class="fm">Risky allocation = m &times; (Portfolio &minus; Floor)</div><div class="fd"><span>m is the multiplier</span> (typically 3&ndash;5). As the portfolio falls toward the floor, the risky allocation shrinks. OBPI uses a put option to guarantee the floor directly. Gap risk is the main danger.</div></div>
  <div class="va">
    <div class="vl">// Interactive — CPPI multiplier and portfolio path</div>
    <canvas id="cvs-portfolio-insurance" role="img" aria-label="Portfolio Insurance: Interactive — CPPI multiplier and portfolio path" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Multiplier m</span><input type="range" min="2" max="8" value="4" data-ctrl="cppiMult"></div>
    </div>
  </div>
  <div class="callout info"><strong>1987 crash.</strong> Portfolio-insurance selling through index futures amplified Black Monday, according to the Brady Report — a cautionary tale about mechanical hedging.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> CPPI buys as prices rise and sells as they fall, a mechanical <a href="../../essays/#essay-feedback">feedback loop</a>. In October 1987 portfolio-insurance selling fed the crash it was meant to protect against — an <a href="../../markets/psychology/#information-cascades">information cascade</a> run by rules.</div>
  ${depthHtml('portfolio-insurance')}
  <div class="topic-nav" id="nav-portfolio-insurance"></div>
</div>`;
}

function buildCurrencyHedging() {
  return `<div class="topic" id="currency-hedging">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">20 — Hedging &amp; Protection</div><h2>Currency <em>Hedging</em></h2></div><span class="topic-badge">FX Neutral</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Neutralize FX exposure in global portfolios</p>
  <p class="prose">International allocations introduce currency risk. A US investor buying European equities profits (or loses) from EUR/USD moves on top of the equity return.</p>
  <div class="fb"><div class="fm">R<sub>unhedged</sub> &asymp; R<sub>local</sub> + R<sub>FX</sub></div><div class="fd"><span>Forward contracts</span> lock future exchange rates. Full hedging eliminates FX variance but costs the interest-rate differential (covered interest parity). Partial hedging (50 %) is a common compromise.</div></div>
  <div class="va">
    <div class="vl">// Interactive — hedge ratio and FX exposure</div>
    <canvas id="cvs-currency-hedging" role="img" aria-label="Currency Hedging: Interactive — hedge ratio and FX exposure" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Hedge ratio %</span><input type="range" min="0" max="100" value="50" data-ctrl="hedgeRatio"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Approach</th><th>Cost</th><th>Residual FX</th></tr></thead>
    <tbody>
      <tr><td>Unhedged</td><td>None</td><td>Full</td></tr>
      <tr><td>50 % hedged</td><td>Moderate</td><td>Half</td></tr>
      <tr><td>Fully hedged</td><td>Interest diff</td><td>Near zero</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Hedging strips out a risk you did not choose to take. How much it matters depends on how volatile the currency is, and that volatility clusters — see <a href="../../timeseries/#garch">GARCH</a> and <a href="../../markets/indicators/#standard-deviation">standard deviation</a>.</div>
  ${depthHtml('currency-hedging')}
  <div class="topic-nav" id="nav-currency-hedging"></div>
</div>`;
}

function buildReturnAttribution() {
  return `<div class="topic" id="return-attribution">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">21 — Performance &amp; Attribution</div><h2>Return <em>Attribution</em></h2></div><span class="topic-badge">Decomposition</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Brinson decomposition — allocation, selection, interaction</p>
  <p class="prose">Return attribution answers: <em>"Where did excess return come from?"</em> The Brinson-Fachler model splits active return into three effects:</p>
  <div class="fb"><div class="fm">Active Return = Allocation + Selection + Interaction</div><div class="fd"><span>Allocation:</span> over/underweighting sectors that outperform. <strong>Selection:</strong> picking better stocks within sectors. <strong>Interaction:</strong> the cross-term. Multi-period attribution chains single-period results.</div></div>
  <div class="va">
    <div class="vl">// Return attribution — Brinson decomposition</div>
    <canvas id="cvs-return-attribution" role="img" aria-label="Return attribution — Brinson decomposition" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Daily practice.</strong> Institutional managers report monthly attribution to explain why they beat (or missed) the benchmark.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Decomposing variance is explored in <a href="../../stats/index.html#stat-tests">The Toolkit — Statistical Tests</a>.</div>
  ${depthHtml('return-attribution')}
  <div class="topic-nav" id="nav-return-attribution"></div>
</div>`;
}

function buildBenchmarkTracking() {
  return `<div class="topic" id="benchmark-tracking">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">22 — Performance &amp; Attribution</div><h2>Benchmark <em>Tracking</em></h2></div><span class="topic-badge">Passive/Active</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Tracking error measures deviation from the benchmark</p>
  <p class="prose">Tracking error (TE) is the standard deviation of the difference between portfolio and benchmark returns:</p>
  <div class="fb"><div class="fm">TE = &sigma;(R<sub>p</sub> &minus; R<sub>b</sub>)</div><div class="fd"><span>Passive index funds</span> target TE &lt; 10 bps. Active managers accept TE of 2&ndash;8 % depending on mandate. <strong>Active share</strong> measures the fraction of holdings that differ from the benchmark — high active share combined with low TE signals closet indexing.</div></div>
  <div class="va">
    <div class="vl">// Interactive — active share and tracking error</div>
    <canvas id="cvs-benchmark-tracking" role="img" aria-label="Benchmark Tracking: Interactive — active share and tracking error" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Active share %</span><input type="range" min="10" max="90" value="50" data-ctrl="activeShare"></div>
    </div>
  </div>
  <div class="callout info"><strong>Closet indexing.</strong> A fund with high fees but low active share is a bad deal — pay passive fees for passive exposure.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Standard deviation and variance are core in <a href="../indicators/index.html#standard-deviation">Indicators — Standard Deviation</a>.</div>
  ${depthHtml('benchmark-tracking')}
  <div class="topic-nav" id="nav-benchmark-tracking"></div>
</div>`;
}

function buildAlphaGeneration() {
  return `<div class="topic" id="alpha-generation">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">23 — Performance &amp; Attribution</div><h2>Alpha <em>Generation</em></h2></div><span class="topic-badge">Excess Return</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Capturing risk-adjusted excess returns</p>
  <p class="prose">Alpha (&alpha;) is the intercept of a factor regression — the return not explained by systematic risk exposures. Positive alpha means the manager added value beyond factor tilts.</p>
  <div class="fb"><div class="fm">&alpha; = R<sub>p</sub> &minus; [ R<sub>f</sub> + &beta;<sub>1</sub>F<sub>1</sub> + &beta;<sub>2</sub>F<sub>2</sub> + &hellip; ]</div><div class="fd"><span>Sources of alpha:</span> information edges, execution speed, behavioral exploitation, or structural advantages (tax, regulation). Alpha decays — once a signal is widely known, it gets arbitraged away.</div></div>
  <div class="va">
    <div class="vl">// Alpha generation — excess return decomposition</div>
    <canvas id="cvs-alpha-generation" role="img" aria-label="Alpha generation — excess return decomposition" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Alpha decay.</strong> Published anomalies lose much of their return once known: on average more than half after publication (McLean &amp; Pontiff 2016).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Alpha research is feature selection under heavy noise: <a href="../../stats/#permutation-importance">permutation importance</a> tests whether a signal does the work, and <a href="../../stats/#walk-forward">walk-forward validation</a> tests whether it survives out of sample. The tracking error in the information ratio has its own topic: <a href="#benchmark-tracking">benchmark tracking</a>.</div>
  ${depthHtml('alpha-generation')}
  <div class="topic-nav" id="nav-alpha-generation"></div>
</div>`;
}

function buildRiskAdjustedPerf() {
  return `<div class="topic" id="risk-adjusted-perf">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">24 — Performance &amp; Attribution</div><h2>Risk-Adjusted <em>Performance</em></h2></div><span class="topic-badge">Ratios</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Sharpe, Sortino, Calmar — normalize returns by the risk taken</p>
  <p class="prose">Raw returns are misleading without context. Risk-adjusted ratios level the playing field:</p>
  <table class="mt">
    <thead><tr><th>Ratio</th><th>Formula</th><th>Risk measure</th></tr></thead>
    <tbody>
      <tr><td>Sharpe</td><td>(R<sub>p</sub>&minus;R<sub>f</sub>)/&sigma;</td><td>Total volatility</td></tr>
      <tr><td>Sortino</td><td>(R<sub>p</sub>&minus;R<sub>f</sub>)/&sigma;<sub>down</sub></td><td>Downside deviation</td></tr>
      <tr><td>Calmar</td><td>CAGR / Max DD</td><td>Max drawdown</td></tr>
      <tr><td>Treynor</td><td>(R<sub>p</sub>&minus;R<sub>f</sub>)/&beta;</td><td>Market beta</td></tr>
      <tr><td>Information</td><td>&alpha; / TE</td><td>Tracking error</td></tr>
    </tbody>
  </table>
  <p class="prose">Sharpe &gt; 1 is good, &gt; 2 is excellent, &gt; 3 is suspicious (likely overfitting or illiquidity premium). Sortino is preferred for asymmetric return distributions since it penalizes only downside.</p>
  <div class="va">
    <div class="vl">// Risk-adjusted performance ratios</div>
    <canvas id="cvs-risk-adjusted-perf" role="img" aria-label="Risk-adjusted performance ratios" width="720" height="340"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Standard deviation and downside deviation connect to <a href="../../stats/index.html#sharpe-ratio">The Toolkit — Sharpe Ratio</a>.</div>
  ${depthHtml('risk-adjusted-perf')}
  <div class="topic-nav" id="nav-risk-adjusted-perf"></div>
</div>`;
}

function buildDrawdownAnalysis() {
  return `<div class="topic" id="drawdown-analysis">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">25 — Performance &amp; Attribution</div><h2>Drawdown <em>Analysis</em></h2></div><span class="topic-badge">Peak-to-Trough</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Peak-to-trough losses and recovery time</p>
  <p class="prose">Maximum drawdown (MDD) is the largest peak-to-trough decline in portfolio equity. It measures the <em>worst pain</em> an investor endures.</p>
  <div class="fb"><div class="fm">MDD = max<sub>t</sub> [ (Peak<sub>t</sub> &minus; Trough<sub>t</sub>) / Peak<sub>t</sub> ]</div><div class="fd"><span>Recovery time</span> — how long to regain the prior peak — matters as much as depth. A 50 % drawdown requires a 100 % gain to recover. The <strong>underwater curve</strong> plots drawdown depth over time.</div></div>
  <div class="va">
    <div class="vl">// Interactive — volatility and underwater equity curve</div>
    <canvas id="cvs-drawdown-analysis" role="img" aria-label="Drawdown Analysis: Interactive — volatility and underwater equity curve" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Volatility</span><input type="range" min="5" max="40" value="15" data-ctrl="ddVol"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Drawdown</th><th>Required Gain</th></tr></thead>
    <tbody>
      <tr><td>10 %</td><td>11.1 %</td></tr>
      <tr><td>25 %</td><td>33.3 %</td></tr>
      <tr><td>50 %</td><td>100 %</td></tr>
      <tr><td>75 %</td><td>300 %</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Behavioral impact.</strong> Drawdowns are a leading reason investors abandon strategies — even profitable ones.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drawdowns test behaviour as much as capital: <a href="../../markets/psychology/#loss-aversion">loss aversion</a> and <a href="../../markets/psychology/#regret-aversion">regret aversion</a> are why investors sell near the bottom. The measurement itself is in <a href="../../stats/#max-drawdown">maximum drawdown</a>.</div>
  ${depthHtml('drawdown-analysis')}
  <div class="topic-nav" id="nav-drawdown-analysis"></div>
</div>`;
}
