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
    <canvas id="cvs-value-at-risk" width="720" height="340"></canvas>
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
      <li>Basel III requires banks to report <strong>99% 10-day VaR</strong> daily. Capital reserves must cover 3× this number — a $10M VaR means $30M in regulatory capital</li>
      <li>Parametric VaR underestimated tail risk in 2008 by ~50% because returns were far from normal. Historical VaR caught the fat tails but missed unprecedented correlations</li>
      <li>JPMorgan's RiskMetrics (1994) popularized VaR. Their original assumption of i.i.d. normal returns is still the baseline, despite known limitations</li>
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
  <div class="topic-nav" id="nav-value-at-risk"></div>
</div>`;
}

function buildExpectedShortfall() {
  return `<div class="topic" id="expected-shortfall">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Risk Measures</div><h2>Expected <em>Shortfall</em> (CVaR)</h2></div><span class="topic-badge">Tail Average</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span></div>
  <p class="sub">// Average loss in the worst &alpha; % of scenarios</p>
  <p class="prose">Expected Shortfall (ES), also called Conditional VaR, is the <em>mean</em> of all losses exceeding the VaR cutoff. It is <strong>sub-additive</strong> — combining portfolios never makes ES worse — so regulators prefer it to VaR.</p>
  <div class="fb"><div class="fm">ES<sub>&alpha;</sub> = E[ L | L &gt; VaR<sub>&alpha;</sub> ]</div><div class="fd"><span>For a normal distribution</span> ES has a closed-form: ES = &mu; + &sigma; &middot; &phi;(z<sub>&alpha;</sub>) / (1 &minus; &alpha;). For fat-tailed distributions Monte Carlo or historical methods are used.</div></div>
  <div class="va">
    <div class="vl">// Interactive — tail threshold and expected shortfall region</div>
    <canvas id="cvs-expected-shortfall" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Tail &alpha; %</span><input type="range" min="1" max="10" value="5" data-ctrl="esTail"></div>
    </div>
  </div>
  <div class="callout info"><strong>Basel III.</strong> Banks must now report Expected Shortfall at 97.5 % under the Fundamental Review of the Trading Book (FRTB).</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Expectation and conditioning connect to <a href="../../stats/index.html#probability">Probability Distributions</a>.</div>
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
    <canvas id="cvs-volatility-modeling" width="720" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Variance estimation underpins <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
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
    <canvas id="cvs-correlation-risk" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Stress level</span><input type="range" min="0" max="100" value="20" data-ctrl="stressLevel"></div>
    </div>
  </div>
  <div class="callout info"><strong>2008 lesson.</strong> Structured-credit losses soared because default correlations jumped far beyond historical norms.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Correlation and covariance matrices are explored in <a href="../../stats/index.html#correlation">The Toolkit — Correlation</a>.</div>
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
    <canvas id="cvs-tail-risk" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Kurtosis</span><input type="range" min="3" max="12" value="5" data-ctrl="kurtLevel"></div>
    </div>
  </div>
  <div class="callout info"><strong>Black-swan readiness.</strong> Stress tests should use EVT-calibrated scenarios, not just historical worst days.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Kurtosis and distribution shapes are covered in <a href="../../stats/index.html#distributions">The Toolkit — Distributions</a>.</div>
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
    <canvas id="cvs-mean-variance" width="720" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Quadratic programming appears in <a href="../../ml-math/index.html#optimization">ML Math — Optimization</a>.</div>
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
    <canvas id="cvs-risk-parity" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>All-Weather.</strong> Ray Dalio's All-Weather fund popularized risk parity — bonds carry leverage to match equity risk.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Volatility normalization echoes <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
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
    <canvas id="cvs-factor-models" width="720" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Regression and betas are explored in <a href="../../stats/index.html#regression">The Toolkit — Regression</a>.</div>
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
    <canvas id="cvs-rebalancing" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Band width %</span><input type="range" min="1" max="10" value="5" data-ctrl="rebalBand"></div>
    </div>
  </div>
  <div class="callout info"><strong>Tax efficiency.</strong> Threshold-based rebalancing with tax-loss harvesting can add 20-50 bps annually.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Mean-reversion logic appears in <a href="../psychology/index.html">Market Psychology</a>.</div>
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
    <canvas id="cvs-diversification" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Number of assets</span><input type="range" min="1" max="50" value="10" data-ctrl="numAssets"></div>
    </div>
  </div>
  <div class="callout info"><strong>Diminishing returns.</strong> Most diversification benefit arrives by 15-20 uncorrelated assets — beyond that, marginal reduction is small.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> The law of large numbers formalizes this in <a href="../../stats/index.html#central-limit">The Toolkit — CLT</a>.</div>
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
    <canvas id="cvs-kelly-criterion" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Win rate %</span><input type="range" min="30" max="80" value="55" data-ctrl="kellyWin"></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Fraction</th><th>Growth</th><th>Drawdown</th></tr></thead>
    <tbody>
      <tr><td>Full Kelly</td><td>Max geometric</td><td>Severe</td></tr>
      <tr><td>Half Kelly</td><td>75 % of max</td><td>Much lower</td></tr>
      <tr><td>Quarter Kelly</td><td>~50 % of max</td><td>Mild</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Overbet risk.</strong> Betting more than full Kelly guarantees sub-optimal growth and eventual ruin with parameter uncertainty.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Log-normal growth connects to <a href="../../stats/index.html#distributions">The Toolkit — Distributions</a>.</div>
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
    <canvas id="cvs-fixed-fractional" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Risk fraction %</span><input type="range" min="1" max="5" value="2" data-ctrl="ffFrac"></div>
    </div>
  </div>
  <div class="callout info"><strong>Ruin probability.</strong> At 1 % risk per trade, you need 100 consecutive losers to lose everything — functionally impossible.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Stop distance interacts with <a href="../indicators/index.html#atr">ATR-based stops</a>.</div>
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
    <canvas id="cvs-volatility-sizing" width="720" height="340"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ATR computation is explained in <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
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
    <canvas id="cvs-pyramiding" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Tiers</span><input type="range" min="1" max="5" value="3" data-ctrl="pyramidTiers"></div>
    </div>
  </div>
  <div class="callout info"><strong>Trend following.</strong> Pyramiding is a hallmark of trend-following systems — it maximizes exposure to strong moves.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Trend identification links to <a href="../indicators/index.html">Indicators</a>.</div>
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
    <canvas id="cvs-max-position" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Concentration kills.</strong> Archegos lost $20 B+ in days due to massive single-name concentration with leveraged swaps.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> See <a onclick="show('diversification',true)">Diversification</a> for the quantitative benefit of spreading risk.</div>
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
    <canvas id="cvs-options-hedging" width="720" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Option Greeks appear in <a href="../charts/index.html">Chart Patterns</a>.</div>
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
    <canvas id="cvs-stop-losses" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">ATR multiplier</span><input type="range" min="10" max="40" value="20" data-ctrl="atrMult"></div>
    </div>
  </div>
  <div class="callout info"><strong>Mental stops fail.</strong> Paper stops get overridden by emotion — always enter with a hard order.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ATR calculation in <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
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
    <canvas id="cvs-pairs-trading" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Entry z-score</span><input type="range" min="10" max="30" value="20" data-ctrl="pairsZ"></div>
    </div>
  </div>
  <div class="callout info"><strong>Regime risk.</strong> Structural breaks (e.g. mergers, sector shifts) can permanently break a pair's relationship.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Stationarity tests connect to <a href="../../stats/index.html#hypothesis">The Toolkit — Hypothesis Testing</a>.</div>
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
    <canvas id="cvs-portfolio-insurance" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Multiplier m</span><input type="range" min="2" max="8" value="4" data-ctrl="cppiMult"></div>
    </div>
  </div>
  <div class="callout info"><strong>1987 crash.</strong> Program-trading-driven CPPI selling amplified Black Monday — a cautionary tale about mechanical hedging.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Dynamic allocation connects to <a href="../psychology/index.html">Market Psychology</a> on behavioral biases.</div>
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
    <canvas id="cvs-currency-hedging" width="720" height="340"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Interest-rate fundamentals connect to <a href="../indicators/index.html">Indicators</a>.</div>
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
    <canvas id="cvs-return-attribution" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Daily practice.</strong> Institutional managers report monthly attribution to explain why they beat (or missed) the benchmark.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Decomposing variance is explored in <a href="../../stats/index.html#anova">The Toolkit — ANOVA</a>.</div>
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
    <canvas id="cvs-benchmark-tracking" width="720" height="340"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Active share %</span><input type="range" min="10" max="90" value="50" data-ctrl="activeShare"></div>
    </div>
  </div>
  <div class="callout info"><strong>Closet indexing.</strong> A fund with high fees but low active share is a bad deal — pay passive fees for passive exposure.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Standard deviation and variance are core in <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
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
    <canvas id="cvs-alpha-generation" width="720" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Alpha decay.</strong> The half-life of a quantitative signal is typically 2-5 years before crowding erodes it.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Feature importance for signal research connects to <a href="../../ml-math/index.html">ML Math</a>.</div>
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
    <canvas id="cvs-risk-adjusted-perf" width="720" height="340"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Standard deviation and downside deviation connect to <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
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
    <canvas id="cvs-drawdown-analysis" width="720" height="340"></canvas>
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
  <div class="callout info"><strong>Behavioral impact.</strong> Drawdowns are the #1 reason investors abandon strategies — even profitable ones.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Psychological aspects of drawdowns appear in <a href="../psychology/index.html">Market Psychology</a>.</div>
  <div class="topic-nav" id="nav-drawdown-analysis"></div>
</div>`;
}
