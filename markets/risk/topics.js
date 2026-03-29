/* ── Risk & Portfolio  topics.js ── */

const SECTIONS=[
{id:'sec-risk',title:'Risk Measures',icon:'⚠',items:['home','value-at-risk','expected-shortfall','volatility-modeling','correlation-risk','tail-risk']},
{id:'sec-port',title:'Portfolio Construction',icon:'🏗',items:['home','mean-variance','risk-parity','factor-models','rebalancing','diversification']},
{id:'sec-size',title:'Position Sizing',icon:'📐',items:['home','kelly-criterion','fixed-fractional','volatility-sizing','pyramiding','max-position']},
{id:'sec-hedge',title:'Hedging & Protection',icon:'🛡',items:['home','options-hedging','stop-losses','pairs-trading','portfolio-insurance','currency-hedging']},
{id:'sec-perf',title:'Performance & Attribution',icon:'📊',items:['home','return-attribution','benchmark-tracking','alpha-generation','risk-adjusted-perf','drawdown-analysis']}
];

const TOPICS=SECTIONS.flatMap(s=>s.items).filter((v,i,a)=>a.indexOf(v)===i);

const TOPIC_NAMES={
'home':'Overview',
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
'drawdown-analysis':'Drawdown Analysis'
};

const TOPIC_DATA=[
{id:'value-at-risk',title:'Value at Risk (VaR)',category:'Risk Measures',num:1,keywords:['var','value at risk','confidence','loss','parametric','historical','monte carlo'],content:'Maximum expected loss over a holding period at a given confidence level.'},
{id:'expected-shortfall',title:'Expected Shortfall (CVaR)',category:'Risk Measures',num:2,keywords:['cvar','expected shortfall','conditional','tail','average','beyond'],content:'Average loss in the worst tail scenarios beyond the VaR threshold.'},
{id:'volatility-modeling',title:'Volatility Modeling',category:'Risk Measures',num:3,keywords:['garch','ewma','realized','implied','stochastic','vol','variance'],content:'Forecasting asset volatility using GARCH, EWMA, and realized measures.'},
{id:'correlation-risk',title:'Correlation Risk',category:'Risk Measures',num:4,keywords:['correlation','covariance','regime','breakdown','contagion','copula'],content:'Portfolio correlations shift in crises — diversification can vanish when needed most.'},
{id:'tail-risk',title:'Tail Risk',category:'Risk Measures',num:5,keywords:['tail','kurtosis','fat tails','black swan','extreme','GPD'],content:'Extreme events beyond normal distribution assumptions drive outsized losses.'},
{id:'mean-variance',title:'Mean-Variance Optimization',category:'Portfolio Construction',num:6,keywords:['markowitz','efficient frontier','optimization','sharpe','quadratic','mvo'],content:'Classic Markowitz framework balancing expected return against portfolio variance.'},
{id:'risk-parity',title:'Risk Parity',category:'Portfolio Construction',num:7,keywords:['risk parity','equal risk','contribution','all weather','bridgewater'],content:'Weight assets so each contributes equally to total portfolio risk.'},
{id:'factor-models',title:'Factor Models',category:'Portfolio Construction',num:8,keywords:['factor','fama french','capm','beta','momentum','value','size'],content:'Decompose returns into systematic factor exposures for construction and attribution.'},
{id:'rebalancing',title:'Rebalancing Strategies',category:'Portfolio Construction',num:9,keywords:['rebalance','threshold','calendar','drift','transaction cost','band'],content:'Maintain target allocations through calendar or threshold-based rebalancing.'},
{id:'diversification',title:'Diversification',category:'Portfolio Construction',num:10,keywords:['diversification','asset class','cross-asset','regime','correlation','free lunch'],content:'Spread risk across uncorrelated assets, geographies, and time horizons.'},
{id:'kelly-criterion',title:'Kelly Criterion',category:'Position Sizing',num:11,keywords:['kelly','optimal','fraction','edge','odds','growth','geometric'],content:'Optimal bet size that maximizes long-run geometric growth rate of capital.'},
{id:'fixed-fractional',title:'Fixed Fractional Sizing',category:'Position Sizing',num:12,keywords:['fixed fractional','percent risk','constant','position','lot size'],content:'Risk a constant percentage of equity on each trade for consistent exposure.'},
{id:'volatility-sizing',title:'Volatility-Based Sizing',category:'Position Sizing',num:13,keywords:['volatility','atr','normalize','size','turtle','adaptive'],content:'Scale position size inversely with volatility for equal dollar-risk across assets.'},
{id:'pyramiding',title:'Pyramiding',category:'Position Sizing',num:14,keywords:['pyramid','add','scale in','winner','trend','momentum'],content:'Add to winning positions in tiers as the trade moves in your favor.'},
{id:'max-position',title:'Maximum Position Limits',category:'Position Sizing',num:15,keywords:['max position','concentration','limit','exposure','single name','cap'],content:'Hard caps on single-name and sector exposure to prevent catastrophic concentration.'},
{id:'options-hedging',title:'Options Hedging',category:'Hedging & Protection',num:16,keywords:['options','put','collar','protective','delta','hedge','premium'],content:'Protective puts, collars, and delta-neutral overlays to cap downside risk.'},
{id:'stop-losses',title:'Stop-Loss Strategies',category:'Hedging & Protection',num:17,keywords:['stop loss','trailing','hard stop','percentage','atr stop','exit'],content:'Mechanical exit rules — fixed, trailing, or volatility-adjusted — to limit drawdowns.'},
{id:'pairs-trading',title:'Pairs Trading',category:'Hedging & Protection',num:18,keywords:['pairs','spread','cointegration','mean reversion','market neutral','long short'],content:'Long/short correlated pairs to profit from spread convergence while hedging market risk.'},
{id:'portfolio-insurance',title:'Portfolio Insurance',category:'Hedging & Protection',num:19,keywords:['cppi','obpi','insurance','floor','cushion','dynamic','protection'],content:'CPPI and OBPI strategies that dynamically shift between risky and safe assets.'},
{id:'currency-hedging',title:'Currency Hedging',category:'Hedging & Protection',num:20,keywords:['currency','fx','forward','cross-currency','unhedged','hedge ratio'],content:'Forward contracts and options to neutralize foreign exchange exposure in global portfolios.'},
{id:'return-attribution',title:'Return Attribution',category:'Performance & Attribution',num:21,keywords:['attribution','brinson','allocation','selection','interaction','sector'],content:'Brinson decomposition of returns into allocation, selection, and interaction effects.'},
{id:'benchmark-tracking',title:'Benchmark Tracking',category:'Performance & Attribution',num:22,keywords:['tracking error','benchmark','index','passive','active share','deviation'],content:'Tracking error measures how closely a portfolio mirrors its benchmark.'},
{id:'alpha-generation',title:'Alpha Generation',category:'Performance & Attribution',num:23,keywords:['alpha','excess return','skill','information ratio','active management'],content:'Identifying and capturing risk-adjusted excess returns above the benchmark.'},
{id:'risk-adjusted-perf',title:'Risk-Adjusted Performance',category:'Performance & Attribution',num:24,keywords:['sharpe','sortino','calmar','treynor','information ratio','risk-adjusted'],content:'Ratios that normalize returns by risk — Sharpe, Sortino, Calmar, Treynor.'},
{id:'drawdown-analysis',title:'Drawdown Analysis',category:'Performance & Attribution',num:25,keywords:['drawdown','maximum drawdown','recovery','underwater','peak to trough','mdd'],content:'Peak-to-trough loss analysis and recovery time for assessing strategy resilience.'}
];

/* ── Build Navigation ── */
function buildNav(){
const nav=document.getElementById('mainNav');
SECTIONS.forEach(sec=>{
const s=document.createElement('div');s.className='nav-section';s.id=sec.id;
const h=document.createElement('div');h.className='nav-section-header';h.onclick=()=>toggleSection(sec.id);
h.innerHTML=`<span>${sec.icon} ${sec.title}</span><span class="arrow">▸</span>`;
s.appendChild(h);
sec.items.forEach(it=>{
if(it==='home')return;
const d=document.createElement('div');d.className='ni';d.dataset.topic=it;
d.textContent=TOPIC_NAMES[it];d.onclick=()=>showSection(sec.id,it);
s.appendChild(d);
});
nav.appendChild(s);
});
}

/* ── Build Content ── */
function buildContent(){
const main=document.getElementById('mainContent');
main.innerHTML='';
main.appendChild(buildHome());
const builders={
'value-at-risk':buildValueAtRisk,'expected-shortfall':buildExpectedShortfall,'volatility-modeling':buildVolatilityModeling,'correlation-risk':buildCorrelationRisk,'tail-risk':buildTailRisk,
'mean-variance':buildMeanVariance,'risk-parity':buildRiskParity,'factor-models':buildFactorModels,'rebalancing':buildRebalancing,'diversification':buildDiversification,
'kelly-criterion':buildKellyCriterion,'fixed-fractional':buildFixedFractional,'volatility-sizing':buildVolatilitySizing,'pyramiding':buildPyramiding,'max-position':buildMaxPosition,
'options-hedging':buildOptionsHedging,'stop-losses':buildStopLosses,'pairs-trading':buildPairsTrading,'portfolio-insurance':buildPortfolioInsurance,'currency-hedging':buildCurrencyHedging,
'return-attribution':buildReturnAttribution,'benchmark-tracking':buildBenchmarkTracking,'alpha-generation':buildAlphaGeneration,'risk-adjusted-perf':buildRiskAdjustedPerf,'drawdown-analysis':buildDrawdownAnalysis
};
TOPICS.forEach(id=>{if(id==='home')return;const d=document.createElement('div');d.id=id;d.className='topic';d.innerHTML=builders[id]();main.appendChild(d);});
}

/* ── Home ── */
function buildHome(){
const d=document.createElement('div');d.id='home';d.className='home active';
d.innerHTML=`
<div class="home-intro">
<h2>Risk &amp; Portfolio</h2>
<p class="sub">25 interactive topics — quantify risk, construct portfolios, size positions, hedge exposure, and measure performance.</p>
</div>
<div class="cat-grid">
${SECTIONS.map(s=>`<div class="cat-card" onclick="toggleSection('${s.id}');showSection('${s.id}','${s.items[1]}')">
<div class="cc-icon">${s.icon}</div><div class="cc-title">${s.title}</div><div class="cc-count">${s.items.length-1} topics</div></div>`).join('')}
</div>`;
return d;
}

/* ═══════════════════════════════════════
   Topic Builders (25)
   ═══════════════════════════════════════ */

function buildValueAtRisk(){return `
<div class="topic-header"><span class="topic-num">01</span><h2>Value at Risk (VaR)</h2><p class="sub">Maximum expected loss at a chosen confidence level over a given horizon.</p></div>
<div class="prose">
<p>VaR answers one question: <em>"What is the worst loss I should expect on a normal day?"</em>  Three methods dominate — parametric (variance-covariance), historical simulation, and Monte Carlo.</p>
<p>Parametric VaR assumes normally distributed returns:</p>
</div>
<div class="formula">VaR<sub>α</sub> = μ − z<sub>α</sub> · σ</div>
<div class="prose"><p>where z<sub>α</sub> is the inverse-normal quantile (e.g. 1.645 for 95 %).  Historical simulation makes no distributional assumption — it ranks past P&L and reads the quantile directly.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Confidence %<input type="range" min="90" max="99" value="95" data-ctrl="varConf"></label></div><canvas id="cvs-value-at-risk" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Method</th><th>Assumption</th><th>Strength</th></tr>
<tr><td>Parametric</td><td>Normal returns</td><td>Fastest to compute</td></tr>
<tr><td>Historical</td><td>None (empirical)</td><td>Captures fat tails</td></tr>
<tr><td>Monte Carlo</td><td>Model-dependent</td><td>Flexible payoff profiles</td></tr></table>
<div class="callout info"><strong>Limitation.</strong> VaR says nothing about the <em>magnitude</em> of losses beyond the threshold — Expected Shortfall fills that gap.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Confidence intervals and quantiles are foundational in <a href="../../stats/index.html#confidence-intervals">The Toolkit — Confidence Intervals</a>.</div>
<div class="topic-nav" id="nav-value-at-risk"></div>`;}

function buildExpectedShortfall(){return `
<div class="topic-header"><span class="topic-num">02</span><h2>Expected Shortfall (CVaR)</h2><p class="sub">Average loss in the worst α % of scenarios.</p></div>
<div class="prose">
<p>Expected Shortfall (ES), also called Conditional VaR, is the <em>mean</em> of all losses exceeding the VaR cutoff.  It is <strong>sub-additive</strong> — combining portfolios never makes ES worse — so regulators prefer it to VaR.</p>
</div>
<div class="formula">ES<sub>α</sub> = E[ L | L &gt; VaR<sub>α</sub> ]</div>
<div class="prose"><p>For a normal distribution ES has a closed-form: ES = μ + σ · φ(z<sub>α</sub>) / (1 − α), where φ is the standard normal PDF.  For fat-tailed distributions Monte Carlo or historical methods are used.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Tail α %<input type="range" min="1" max="10" value="5" data-ctrl="esTail"></label></div><canvas id="cvs-expected-shortfall" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Basel III.</strong> Banks must now report Expected Shortfall at 97.5 % under the Fundamental Review of the Trading Book (FRTB).</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Expectation and conditioning connect to <a href="../../stats/index.html#probability">Probability Distributions</a>.</div>
<div class="topic-nav" id="nav-expected-shortfall"></div>`;}

function buildVolatilityModeling(){return `
<div class="topic-header"><span class="topic-num">03</span><h2>Volatility Modeling</h2><p class="sub">Estimate and forecast return variance with GARCH, EWMA, and realized measures.</p></div>
<div class="prose">
<p>Volatility clusters — large moves beget large moves.  GARCH(1,1) captures this:</p>
</div>
<div class="formula">σ²<sub>t</sub> = ω + α · r²<sub>t−1</sub> + β · σ²<sub>t−1</sub></div>
<div class="prose"><p>EWMA is a special case with ω = 0 and α + β = 1 (RiskMetrics uses λ = 0.94).  Realized volatility sums intraday squared returns for a model-free estimate.</p></div>
<div class="viz-box"><div class="viz-controls"><label>EWMA λ<input type="range" min="80" max="99" value="94" data-ctrl="ewmaLambda"></label></div><canvas id="cvs-volatility-modeling" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Model</th><th>Parameters</th><th>Use Case</th></tr>
<tr><td>EWMA</td><td>λ</td><td>Quick daily VaR</td></tr>
<tr><td>GARCH(1,1)</td><td>ω, α, β</td><td>Conditional forecasting</td></tr>
<tr><td>Realized Vol</td><td>Sampling freq</td><td>High-frequency data</td></tr></table>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Variance estimation underpins <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
<div class="topic-nav" id="nav-volatility-modeling"></div>`;}

function buildCorrelationRisk(){return `
<div class="topic-header"><span class="topic-num">04</span><h2>Correlation Risk</h2><p class="sub">Correlations shift in crises — diversification can vanish when you need it most.</p></div>
<div class="prose">
<p>In calm markets, asset correlations are moderate and diversification works.  During stress, correlations spike toward 1 — a phenomenon called <strong>correlation breakdown</strong>.</p>
<p>The correlation matrix Σ drives portfolio variance:</p>
</div>
<div class="formula">σ²<sub>p</sub> = w' Σ w</div>
<div class="prose"><p>Copula models separate marginal distributions from the dependence structure, allowing non-linear tail dependence to be modeled explicitly.  Regime-switching models capture correlation shifts by toggling between calm and crisis states.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Stress level<input type="range" min="0" max="100" value="20" data-ctrl="stressLevel"></label></div><canvas id="cvs-correlation-risk" width="720" height="340"></canvas></div>
<div class="callout info"><strong>2008 lesson.</strong> Structured-credit losses soared because default correlations jumped far beyond historical norms.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Correlation and covariance matrices are explored in <a href="../../stats/index.html#correlation">The Toolkit — Correlation</a>.</div>
<div class="topic-nav" id="nav-correlation-risk"></div>`;}

function buildTailRisk(){return `
<div class="topic-header"><span class="topic-num">05</span><h2>Tail Risk</h2><p class="sub">Extreme events beyond normal-distribution assumptions.</p></div>
<div class="prose">
<p>Financial returns exhibit <strong>fat tails</strong> — extreme moves occur far more often than a Gaussian predicts.  Kurtosis > 3 signals leptokurtic behavior.</p>
<p>Extreme Value Theory (EVT) models the tail with a Generalized Pareto Distribution (GPD):</p>
</div>
<div class="formula">P(X > x | X > u) ≈ (1 + ξ · (x−u)/β)<sup>−1/ξ</sup></div>
<div class="prose"><p>A positive shape parameter ξ > 0 indicates a heavy (Pareto-type) tail.  EVT lets us extrapolate loss quantiles beyond sample extremes.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Kurtosis<input type="range" min="3" max="12" value="5" data-ctrl="kurtLevel"></label></div><canvas id="cvs-tail-risk" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Black-swan readiness.</strong> Stress tests should use EVT-calibrated scenarios, not just historical worst days.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Kurtosis and distribution shapes are covered in <a href="../../stats/index.html#distributions">The Toolkit — Distributions</a>.</div>
<div class="topic-nav" id="nav-tail-risk"></div>`;}

function buildMeanVariance(){return `
<div class="topic-header"><span class="topic-num">06</span><h2>Mean-Variance Optimization</h2><p class="sub">Markowitz efficient frontier — balance return against portfolio variance.</p></div>
<div class="prose">
<p>The 1952 Markowitz framework maximizes expected return for a given level of risk (or minimizes variance for a target return).  The <strong>efficient frontier</strong> traces optimal portfolios.</p>
</div>
<div class="formula">min  ½ w' Σ w   s.t.  w' μ ≥ r<sub>target</sub>,  w' 1 = 1</div>
<div class="prose"><p>In practice, estimation error in μ and Σ makes raw MVO unstable — shrinkage estimators (Ledoit-Wolf) and resampling improve robustness.  The tangency portfolio maximizes the Sharpe ratio.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Risk aversion<input type="range" min="1" max="20" value="5" data-ctrl="riskAversion"></label></div><canvas id="cvs-mean-variance" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Approach</th><th>Fix</th></tr>
<tr><td>Shrinkage</td><td>Reduce estimation noise in Σ</td></tr>
<tr><td>Resampling</td><td>Average across bootstrapped frontiers</td></tr>
<tr><td>Black-Litterman</td><td>Blend views with equilibrium priors</td></tr></table>
<div class="callout bridge">→ <strong>ML-Math bridge:</strong> Quadratic programming appears in <a href="../../ml-math/index.html#optimization">ML Math — Optimization</a>.</div>
<div class="topic-nav" id="nav-mean-variance"></div>`;}

function buildRiskParity(){return `
<div class="topic-header"><span class="topic-num">07</span><h2>Risk Parity</h2><p class="sub">Weight assets so each contributes equally to total portfolio risk.</p></div>
<div class="prose">
<p>Instead of targeting a return, risk parity targets equal <strong>risk contribution</strong> from each asset.  This often leads to leveraged bond allocations to match equity volatility.</p>
</div>
<div class="formula">RC<sub>i</sub> = w<sub>i</sub> · (Σw)<sub>i</sub> / σ<sub>p</sub>   →   RC<sub>i</sub> = RC<sub>j</sub>  ∀ i,j</div>
<div class="prose"><p>The simplest proxy is inverse-volatility weighting: w<sub>i</sub> ∝ 1/σ<sub>i</sub>.  True risk parity requires numerical optimization to equalize marginal risk contributions.</p></div>
<div class="viz-box"><canvas id="cvs-risk-parity" width="720" height="340"></canvas></div>
<div class="callout info"><strong>All-Weather.</strong> Ray Dalio's All-Weather fund popularized risk parity — bonds carry leverage to match equity risk.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Volatility normalization echoes <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
<div class="topic-nav" id="nav-risk-parity"></div>`;}

function buildFactorModels(){return `
<div class="topic-header"><span class="topic-num">08</span><h2>Factor Models</h2><p class="sub">Decompose returns into systematic factor exposures.</p></div>
<div class="prose">
<p>CAPM uses a single factor (market beta).  The Fama-French three-factor model adds size and value.  Modern models include momentum, quality, and low-volatility.</p>
</div>
<div class="formula">r<sub>i</sub> = α<sub>i</sub> + β<sub>1</sub>F<sub>1</sub> + β<sub>2</sub>F<sub>2</sub> + … + ε<sub>i</sub></div>
<div class="prose"><p>Factor tilts explain most of long-only active returns.  Pure alpha — returns unexplained by any factor — is exceedingly rare.</p></div>
<div class="viz-box"><canvas id="cvs-factor-models" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Factor</th><th>Premium Source</th></tr>
<tr><td>Market (β)</td><td>Equity risk premium</td></tr>
<tr><td>Size (SMB)</td><td>Small-firm illiquidity</td></tr>
<tr><td>Value (HML)</td><td>Distress / behavioral</td></tr>
<tr><td>Momentum</td><td>Under-reaction</td></tr></table>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Regression and betas are explored in <a href="../../stats/index.html#regression">The Toolkit — Regression</a>.</div>
<div class="topic-nav" id="nav-factor-models"></div>`;}

function buildRebalancing(){return `
<div class="topic-header"><span class="topic-num">09</span><h2>Rebalancing Strategies</h2><p class="sub">Maintain target allocations through disciplined rebalancing.</p></div>
<div class="prose">
<p>As prices move, actual weights drift from targets.  Rebalancing is a contrarian mechanism — <em>sell winners, buy losers</em> — that harvests the diversification return.</p>
<p>Two approaches: <strong>calendar</strong> (monthly, quarterly) and <strong>threshold</strong> (rebalance when drift exceeds a band).</p>
</div>
<div class="formula">Drift<sub>i</sub> = | w<sub>actual,i</sub> − w<sub>target,i</sub> |</div>
<div class="prose"><p>Wider bands reduce transaction costs but increase tracking error.  The optimal band depends on volatility, expected return differences, and trading costs.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Band width %<input type="range" min="1" max="10" value="5" data-ctrl="rebalBand"></label></div><canvas id="cvs-rebalancing" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Tax efficiency.</strong> Threshold-based rebalancing with tax-loss harvesting can add 20-50 bps annually.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Mean-reversion logic appears in <a href="../psychology/index.html">Market Psychology</a>.</div>
<div class="topic-nav" id="nav-rebalancing"></div>`;}

function buildDiversification(){return `
<div class="topic-header"><span class="topic-num">10</span><h2>Diversification</h2><p class="sub">The only free lunch in finance — spread risk across uncorrelated bets.</p></div>
<div class="prose">
<p>Adding N uncorrelated assets reduces portfolio volatility as 1/√N.  Effective diversification requires <em>genuine independence</em> — not just different tickers.</p>
</div>
<div class="formula">σ<sub>p</sub> = σ / √N   (equal weight, zero correlation)</div>
<div class="prose"><p>True diversification spans asset classes (equity, bonds, commodities, real estate), geographies, strategies, and time horizons.  The <strong>diversification ratio</strong> measures how much idiosyncratic risk has been diversified away.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Number of assets<input type="range" min="1" max="50" value="10" data-ctrl="numAssets"></label></div><canvas id="cvs-diversification" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Diminishing returns.</strong> Most diversification benefit arrives by 15-20 uncorrelated assets — beyond that, marginal reduction is small.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> The law of large numbers formalizes this in <a href="../../stats/index.html#central-limit">The Toolkit — CLT</a>.</div>
<div class="topic-nav" id="nav-diversification"></div>`;}

function buildKellyCriterion(){return `
<div class="topic-header"><span class="topic-num">11</span><h2>Kelly Criterion</h2><p class="sub">Optimal bet size for maximum geometric growth.</p></div>
<div class="prose">
<p>Kelly sizing maximizes the expected logarithm of wealth — the fastest compounding rate without risking ruin.  For a simple win/loss bet:</p>
</div>
<div class="formula">f* = (p · b − q) / b</div>
<div class="prose"><p>where p = win probability, q = 1−p, b = win/loss ratio.  In continuous markets, Kelly fraction = expected excess return / variance.  Most practitioners use <strong>half-Kelly</strong> or less to reduce volatility.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Win rate %<input type="range" min="30" max="80" value="55" data-ctrl="kellyWin"></label></div><canvas id="cvs-kelly-criterion" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Fraction</th><th>Growth</th><th>Drawdown</th></tr>
<tr><td>Full Kelly</td><td>Max geometric</td><td>Severe</td></tr>
<tr><td>Half Kelly</td><td>75 % of max</td><td>Much lower</td></tr>
<tr><td>Quarter Kelly</td><td>~50 % of max</td><td>Mild</td></tr></table>
<div class="callout info"><strong>Overbet risk.</strong> Betting more than full Kelly guarantees sub-optimal growth and eventual ruin with parameter uncertainty.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Log-normal growth connects to <a href="../../stats/index.html#distributions">The Toolkit — Distributions</a>.</div>
<div class="topic-nav" id="nav-kelly-criterion"></div>`;}

function buildFixedFractional(){return `
<div class="topic-header"><span class="topic-num">12</span><h2>Fixed Fractional Sizing</h2><p class="sub">Risk a constant percentage of equity on each trade.</p></div>
<div class="prose">
<p>Fixed fractional sizing sets position size so the <em>dollar risk</em> (distance to stop × shares) equals a fixed fraction f of current equity.</p>
</div>
<div class="formula">Position = (Equity × f) / (Entry − Stop)</div>
<div class="prose"><p>Typical f values: 0.5 %–2 %.  This keeps risk proportional to equity — positions shrink after losses and grow after gains, providing natural anti-martingale behavior.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Risk fraction %<input type="range" min="1" max="5" value="2" data-ctrl="ffFrac"></label></div><canvas id="cvs-fixed-fractional" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Ruin probability.</strong> At 1 % risk per trade, you need 100 consecutive losers to lose everything — functionally impossible.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Stop distance interacts with <a href="../indicators/index.html#atr">ATR-based stops</a>.</div>
<div class="topic-nav" id="nav-fixed-fractional"></div>`;}

function buildVolatilitySizing(){return `
<div class="topic-header"><span class="topic-num">13</span><h2>Volatility-Based Sizing</h2><p class="sub">Normalize position size by asset volatility.</p></div>
<div class="prose">
<p>Different assets have different volatilities.  A 100-share position in a 40 % vol stock carries far more risk than a 100-share position in a 10 % vol stock.  Volatility sizing equalizes dollar-risk:</p>
</div>
<div class="formula">Shares = Target $ Risk / (N × ATR)</div>
<div class="prose"><p>where N is a multiplier (e.g. 2× ATR).  The Turtle Traders famously used this approach.  It ensures each position contributes roughly equally to portfolio P&L variance.</p></div>
<div class="viz-box"><canvas id="cvs-volatility-sizing" width="720" height="340"></canvas></div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> ATR computation is explained in <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
<div class="topic-nav" id="nav-volatility-sizing"></div>`;}

function buildPyramiding(){return `
<div class="topic-header"><span class="topic-num">14</span><h2>Pyramiding</h2><p class="sub">Add to winning positions in decreasing tiers.</p></div>
<div class="prose">
<p>Pyramiding builds a full position across multiple entries as a trade moves favorably.  Each additional tier is typically <em>smaller</em> than the last so average cost stays well inside the profit zone.</p>
</div>
<div class="formula">Risk<sub>total</sub> = Σ tier<sub>i</sub> × (entry<sub>i</sub> − stop)</div>
<div class="prose"><p>Common patterns: 4-3-2-1 units, or three equal tiers at predefined price milestones.  The stop is usually tightened with each add so that risk on older entries is locked to breakeven.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Tiers<input type="range" min="1" max="5" value="3" data-ctrl="pyramidTiers"></label></div><canvas id="cvs-pyramiding" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Trend following.</strong> Pyramiding is a hallmark of trend-following systems — it maximizes exposure to strong moves.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Trend identification links to <a href="../indicators/index.html">Indicators</a>.</div>
<div class="topic-nav" id="nav-pyramiding"></div>`;}

function buildMaxPosition(){return `
<div class="topic-header"><span class="topic-num">15</span><h2>Maximum Position Limits</h2><p class="sub">Hard caps on concentration to prevent catastrophic single-name losses.</p></div>
<div class="prose">
<p>No matter how attractive a trade, position limits cap exposure.  Common tiers:</p>
</div>
<table class="info-table"><tr><th>Level</th><th>Limit</th></tr>
<tr><td>Single name</td><td>2-5 % of equity</td></tr>
<tr><td>Sector</td><td>15-25 %</td></tr>
<tr><td>Asset class</td><td>30-60 %</td></tr>
<tr><td>Total leverage</td><td>1×-2× (risk parity may use more)</td></tr></table>
<div class="prose"><p>Regulatory frameworks (UCITS, 40-Act) enforce their own diversification rules.  Risk budgeting integrates position limits with volatility and correlation constraints.</p></div>
<div class="viz-box"><canvas id="cvs-max-position" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Concentration kills.</strong> Archegos lost $20 B+ in days due to massive single-name concentration with leveraged swaps.</div>
<div class="callout bridge">→ <strong>Diversification bridge:</strong> See <a onclick="show('diversification',true)">Diversification</a> for the quantitative benefit of spreading risk.</div>
<div class="topic-nav" id="nav-max-position"></div>`;}

function buildOptionsHedging(){return `
<div class="topic-header"><span class="topic-num">16</span><h2>Options Hedging</h2><p class="sub">Protective puts, collars, and delta-neutral overlays.</p></div>
<div class="prose">
<p>Options provide non-linear hedging: a <strong>protective put</strong> caps downside while preserving upside.  A <strong>collar</strong> finances the put by selling an upside call, reducing net cost.</p>
</div>
<div class="formula">Collar payoff = Stock + Put(K<sub>1</sub>) − Call(K<sub>2</sub>)</div>
<div class="prose"><p>Delta hedging continuously adjusts the hedge ratio.  The cost is realized volatility — if realized vol &lt; implied vol, the hedge is profitable; otherwise it is a drag.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Put strike %<input type="range" min="80" max="100" value="95" data-ctrl="putStrike"></label></div><canvas id="cvs-options-hedging" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Strategy</th><th>Max Loss</th><th>Max Gain</th><th>Net Cost</th></tr>
<tr><td>Protective put</td><td>Premium</td><td>Unlimited</td><td>Premium paid</td></tr>
<tr><td>Collar</td><td>Floored</td><td>Capped</td><td>Low / zero</td></tr>
<tr><td>Delta hedge</td><td>Slippage</td><td>Vol spread</td><td>Variable</td></tr></table>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Option Greeks appear in <a href="../charts/index.html">Chart Patterns</a>.</div>
<div class="topic-nav" id="nav-options-hedging"></div>`;}

function buildStopLosses(){return `
<div class="topic-header"><span class="topic-num">17</span><h2>Stop-Loss Strategies</h2><p class="sub">Mechanical exit rules to limit drawdowns.</p></div>
<div class="prose">
<p>Stops enforce discipline.  Types:</p>
</div>
<table class="info-table"><tr><th>Type</th><th>Trigger</th><th>Pro / Con</th></tr>
<tr><td>Hard stop</td><td>Fixed price</td><td>Simple / ignores context</td></tr>
<tr><td>Percentage</td><td>X % from entry</td><td>Scales with price</td></tr>
<tr><td>ATR-based</td><td>N × ATR from price</td><td>Volatility-aware</td></tr>
<tr><td>Trailing</td><td>Tracks new highs</td><td>Locks profit / whipsaw risk</td></tr></table>
<div class="prose"><p>A 2×ATR trailing stop is a popular default — tight enough to limit loss, wide enough to survive normal noise.</p></div>
<div class="viz-box"><div class="viz-controls"><label>ATR multiplier<input type="range" min="10" max="40" value="20" data-ctrl="atrMult"></label></div><canvas id="cvs-stop-losses" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Mental stops fail.</strong> Paper stops get overridden by emotion — always enter with a hard order.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> ATR calculation in <a href="../indicators/index.html#atr">Indicators — ATR</a>.</div>
<div class="topic-nav" id="nav-stop-losses"></div>`;}

function buildPairsTrading(){return `
<div class="topic-header"><span class="topic-num">18</span><h2>Pairs Trading</h2><p class="sub">Long/short correlated pairs to profit from spread convergence.</p></div>
<div class="prose">
<p>Pairs trading exploits temporary mispricings between cointegrated securities.  The spread = log(P<sub>A</sub>) − β · log(P<sub>B</sub>) should be stationary.</p>
</div>
<div class="formula">z<sub>t</sub> = (spread<sub>t</sub> − μ) / σ   →   enter at |z| > 2, exit at |z| < 0.5</div>
<div class="prose"><p>Cointegration (Engle-Granger or Johansen test) is stronger than correlation — it means the spread is mean-reverting.  The Augmented Dickey-Fuller test checks stationarity.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Entry z-score<input type="range" min="10" max="30" value="20" data-ctrl="pairsZ"></label></div><canvas id="cvs-pairs-trading" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Regime risk.</strong> Structural breaks (e.g. mergers, sector shifts) can permanently break a pair's relationship.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Stationarity tests connect to <a href="../../stats/index.html#hypothesis">The Toolkit — Hypothesis Testing</a>.</div>
<div class="topic-nav" id="nav-pairs-trading"></div>`;}

function buildPortfolioInsurance(){return `
<div class="topic-header"><span class="topic-num">19</span><h2>Portfolio Insurance</h2><p class="sub">CPPI and OBPI — dynamic protection with a floor.</p></div>
<div class="prose">
<p>Constant Proportion Portfolio Insurance (CPPI) dynamically allocates between a risky asset and a safe asset (cash/bonds) to protect a minimum floor:</p>
</div>
<div class="formula">Risky allocation = m × (Portfolio − Floor)</div>
<div class="prose"><p>where m is the multiplier (typically 3–5).  As the portfolio falls toward the floor, the risky allocation shrinks.  OBPI uses a put option to guarantee the floor directly.</p>
<p>Gap risk is the main danger — if markets crash through the cushion before rebalancing, the floor is breached.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Multiplier m<input type="range" min="2" max="8" value="4" data-ctrl="cppiMult"></label></div><canvas id="cvs-portfolio-insurance" width="720" height="340"></canvas></div>
<div class="callout info"><strong>1987 crash.</strong> Program-trading-driven CPPI selling amplified Black Monday — a cautionary tale about mechanical hedging.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Dynamic allocation connects to <a href="../psychology/index.html">Market Psychology</a> on behavioral biases.</div>
<div class="topic-nav" id="nav-portfolio-insurance"></div>`;}

function buildCurrencyHedging(){return `
<div class="topic-header"><span class="topic-num">20</span><h2>Currency Hedging</h2><p class="sub">Neutralize FX exposure in global portfolios.</p></div>
<div class="prose">
<p>International allocations introduce currency risk.  A US investor buying European equities profits (or loses) from EUR/USD moves on top of the equity return.</p>
</div>
<div class="formula">R<sub>unhedged</sub> ≈ R<sub>local</sub> + R<sub>FX</sub></div>
<div class="prose"><p>Forward contracts lock future exchange rates.  Full hedging eliminates FX variance but costs the interest-rate differential (covered interest parity).  Partial hedging (50 %) is a common compromise.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Hedge ratio %<input type="range" min="0" max="100" value="50" data-ctrl="hedgeRatio"></label></div><canvas id="cvs-currency-hedging" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Approach</th><th>Cost</th><th>Residual FX</th></tr>
<tr><td>Unhedged</td><td>None</td><td>Full</td></tr>
<tr><td>50 % hedged</td><td>Moderate</td><td>Half</td></tr>
<tr><td>Fully hedged</td><td>Interest diff</td><td>Near zero</td></tr></table>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Interest-rate fundamentals connect to <a href="../indicators/index.html">Indicators</a>.</div>
<div class="topic-nav" id="nav-currency-hedging"></div>`;}

function buildReturnAttribution(){return `
<div class="topic-header"><span class="topic-num">21</span><h2>Return Attribution</h2><p class="sub">Brinson decomposition — allocation, selection, interaction.</p></div>
<div class="prose">
<p>Return attribution answers: <em>"Where did excess return come from?"</em>  The Brinson-Fachler model splits active return into three effects:</p>
</div>
<div class="formula">Active Return = Allocation + Selection + Interaction</div>
<div class="prose"><p><strong>Allocation</strong>: over/underweighting sectors that outperform.  <strong>Selection</strong>: picking better stocks within sectors.  <strong>Interaction</strong>: the cross-term.  Multi-period attribution chains single-period results.</p></div>
<div class="viz-box"><canvas id="cvs-return-attribution" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Daily practice.</strong> Institutional managers report monthly attribution to explain why they beat (or missed) the benchmark.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Decomposing variance is explored in <a href="../../stats/index.html#anova">The Toolkit — ANOVA</a>.</div>
<div class="topic-nav" id="nav-return-attribution"></div>`;}

function buildBenchmarkTracking(){return `
<div class="topic-header"><span class="topic-num">22</span><h2>Benchmark Tracking</h2><p class="sub">Tracking error measures deviation from the benchmark.</p></div>
<div class="prose">
<p>Tracking error (TE) is the standard deviation of the difference between portfolio and benchmark returns:</p>
</div>
<div class="formula">TE = σ(R<sub>p</sub> − R<sub>b</sub>)</div>
<div class="prose"><p>Passive index funds target TE &lt; 10 bps.  Active managers accept TE of 2–8 % depending on mandate.  <strong>Active share</strong> measures the fraction of holdings that differ from the benchmark — high active share combined with low TE signals closet indexing.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Active share %<input type="range" min="10" max="90" value="50" data-ctrl="activeShare"></label></div><canvas id="cvs-benchmark-tracking" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Closet indexing.</strong> A fund with high fees but low active share is a bad deal — pay passive fees for passive exposure.</div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Standard deviation and variance are core in <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
<div class="topic-nav" id="nav-benchmark-tracking"></div>`;}

function buildAlphaGeneration(){return `
<div class="topic-header"><span class="topic-num">23</span><h2>Alpha Generation</h2><p class="sub">Capturing risk-adjusted excess returns.</p></div>
<div class="prose">
<p>Alpha (α) is the intercept of a factor regression — the return not explained by systematic risk exposures.  Positive alpha means the manager added value beyond factor tilts.</p>
</div>
<div class="formula">α = R<sub>p</sub> − [ R<sub>f</sub> + β<sub>1</sub>F<sub>1</sub> + β<sub>2</sub>F<sub>2</sub> + … ]</div>
<div class="prose"><p>Sources of alpha: information edges, execution speed, behavioral exploitation, or structural advantages (tax, regulation).  Alpha decays — once a signal is widely known, it gets arbitraged away.</p></div>
<div class="viz-box"><canvas id="cvs-alpha-generation" width="720" height="340"></canvas></div>
<div class="callout info"><strong>Alpha decay.</strong> The half-life of a quantitative signal is typically 2-5 years before crowding erodes it.</div>
<div class="callout bridge">→ <strong>ML bridge:</strong> Feature importance for signal research connects to <a href="../../ml-math/index.html">ML Math</a>.</div>
<div class="topic-nav" id="nav-alpha-generation"></div>`;}

function buildRiskAdjustedPerf(){return `
<div class="topic-header"><span class="topic-num">24</span><h2>Risk-Adjusted Performance</h2><p class="sub">Sharpe, Sortino, Calmar — normalize returns by the risk taken.</p></div>
<div class="prose">
<p>Raw returns are misleading without context.  Risk-adjusted ratios level the playing field:</p>
</div>
<table class="info-table"><tr><th>Ratio</th><th>Formula</th><th>Risk measure</th></tr>
<tr><td>Sharpe</td><td>(R<sub>p</sub>−R<sub>f</sub>)/σ</td><td>Total volatility</td></tr>
<tr><td>Sortino</td><td>(R<sub>p</sub>−R<sub>f</sub>)/σ<sub>down</sub></td><td>Downside deviation</td></tr>
<tr><td>Calmar</td><td>CAGR / Max DD</td><td>Max drawdown</td></tr>
<tr><td>Treynor</td><td>(R<sub>p</sub>−R<sub>f</sub>)/β</td><td>Market beta</td></tr>
<tr><td>Information</td><td>α / TE</td><td>Tracking error</td></tr></table>
<div class="prose"><p>Sharpe > 1 is good, > 2 is excellent, > 3 is suspicious (likely overfitting or illiquidity premium).  Sortino is preferred for asymmetric return distributions since it penalizes only downside.</p></div>
<div class="viz-box"><canvas id="cvs-risk-adjusted-perf" width="720" height="340"></canvas></div>
<div class="callout bridge">→ <strong>Stats bridge:</strong> Standard deviation and downside deviation connect to <a href="../../stats/index.html#variance">The Toolkit — Variance</a>.</div>
<div class="topic-nav" id="nav-risk-adjusted-perf"></div>`;}

function buildDrawdownAnalysis(){return `
<div class="topic-header"><span class="topic-num">25</span><h2>Drawdown Analysis</h2><p class="sub">Peak-to-trough losses and recovery time.</p></div>
<div class="prose">
<p>Maximum drawdown (MDD) is the largest peak-to-trough decline in portfolio equity.  It measures the <em>worst pain</em> an investor endures.</p>
</div>
<div class="formula">MDD = max<sub>t</sub> [ (Peak<sub>t</sub> − Trough<sub>t</sub>) / Peak<sub>t</sub> ]</div>
<div class="prose"><p>Recovery time — how long to regain the prior peak — matters as much as depth.  A 50 % drawdown requires a 100 % gain to recover.  The <strong>underwater curve</strong> plots drawdown depth over time.</p></div>
<div class="viz-box"><div class="viz-controls"><label>Volatility<input type="range" min="5" max="40" value="15" data-ctrl="ddVol"></label></div><canvas id="cvs-drawdown-analysis" width="720" height="340"></canvas></div>
<table class="info-table"><tr><th>Drawdown</th><th>Required Gain</th></tr>
<tr><td>10 %</td><td>11.1 %</td></tr>
<tr><td>25 %</td><td>33.3 %</td></tr>
<tr><td>50 %</td><td>100 %</td></tr>
<tr><td>75 %</td><td>300 %</td></tr></table>
<div class="callout info"><strong>Behavioral impact.</strong> Drawdowns are the #1 reason investors abandon strategies — even profitable ones.</div>
<div class="callout bridge">→ <strong>Markets bridge:</strong> Psychological aspects of drawdowns appear in <a href="../psychology/index.html">Market Psychology</a>.</div>
<div class="topic-nav" id="nav-drawdown-analysis"></div>`;}
