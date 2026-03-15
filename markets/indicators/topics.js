/* ═══════════════════════════════════════════════════════════════
   Technical Indicators — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-moving-avg', title:'Moving Averages', topics:['home','sma','ema','wma','dema','vwap'] },
  { id:'sec-oscillators', title:'Oscillators', topics:['rsi','stochastic','cci','williams-r','roc'] },
  { id:'sec-trend', title:'Trend & Momentum', topics:['macd','adx','parabolic-sar','ichimoku','aroon'] },
  { id:'sec-volatility', title:'Volatility', topics:['bollinger-bands','atr','keltner-channels','donchian-channels','standard-deviation'] },
  { id:'sec-volume', title:'Volume Indicators', topics:['obv','accumulation-distribution','mfi','chaikin-oscillator','vwap-bands'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  sma:'SMA',
  ema:'EMA',
  wma:'WMA',
  dema:'DEMA',
  vwap:'VWAP',
  rsi:'RSI',
  stochastic:'Stochastic',
  cci:'CCI',
  'williams-r':'Williams %R',
  roc:'Rate of Change',
  macd:'MACD',
  adx:'ADX',
  'parabolic-sar':'Parabolic SAR',
  ichimoku:'Ichimoku Cloud',
  aroon:'Aroon',
  'bollinger-bands':'Bollinger Bands',
  atr:'ATR',
  'keltner-channels':'Keltner Channels',
  'donchian-channels':'Donchian Channels',
  'standard-deviation':'Standard Deviation',
  obv:'OBV',
  'accumulation-distribution':'Accum/Dist',
  mfi:'MFI',
  'chaikin-oscillator':'Chaikin Oscillator',
  'vwap-bands':'VWAP Bands',
};

const TOPIC_DATA = [
  { id:'sma', num:'01', title:'Simple Moving Average', category:'Moving Averages', keywords:['average','mean','smoothing','trend','crossover','lag','period','20-day','50-day','200-day'], content:'The arithmetic mean of the last N closing prices. SMA smooths noise and reveals trend direction. Common periods: 20 (short), 50 (medium), 200 (long). The golden cross (50 over 200) and death cross (50 under 200) are classic signals.' },
  { id:'ema', num:'02', title:'Exponential Moving Average', category:'Moving Averages', keywords:['weighted','recent','responsive','smoothing factor','multiplier','12-day','26-day','crossover'], content:'Weights recent prices more heavily using an exponential smoothing factor: multiplier = 2/(N+1). More responsive to new data than SMA. The 12/26 EMA pair forms the basis of MACD.' },
  { id:'wma', num:'03', title:'Weighted Moving Average', category:'Moving Averages', keywords:['linear weight','recent bias','triangle number','smooth','less lag'], content:'Assigns linearly increasing weights to recent prices — the most recent gets weight N, the previous N\u22121, etc. Divided by the triangle number N(N+1)/2. Falls between SMA (equal weight) and EMA (exponential weight) in responsiveness.' },
  { id:'dema', num:'04', title:'Double Exponential MA', category:'Moving Averages', keywords:['Patrick Mulloy','reduced lag','double smoothing','fast','trend following','formula'], content:'DEMA = 2·EMA(N) \u2212 EMA(EMA(N)). By subtracting the double-smoothed EMA, Patrick Mulloy\'s formula significantly reduces lag while maintaining smoothness. Tracks price more closely in trending markets.' },
  { id:'vwap', num:'05', title:'VWAP', category:'Moving Averages', keywords:['volume weighted','institutional','benchmark','intraday','cumulative','fair value','slippage'], content:'Volume-Weighted Average Price = \u03A3(Price \u00D7 Volume) / \u03A3(Volume). Resets daily. Institutional benchmark — trading above VWAP suggests upward pressure, below suggests downward. Used to measure execution quality.' },
  { id:'rsi', num:'06', title:'Relative Strength Index', category:'Oscillators', keywords:['Wilder','overbought','oversold','70','30','momentum','divergence','14-period'], content:'RSI = 100 \u2212 100/(1 + RS), where RS = Avg Gain / Avg Loss over N periods (default 14). Ranges 0\u2013100. Above 70 = overbought, below 30 = oversold. Divergences between RSI and price often precede reversals.' },
  { id:'stochastic', num:'07', title:'Stochastic Oscillator', category:'Oscillators', keywords:['George Lane','%K','%D','overbought','oversold','80','20','crossover','momentum'], content:'%K = (Close \u2212 Lowest Low) / (Highest High \u2212 Lowest Low) \u00D7 100. %D = 3-period SMA of %K. Ranges 0\u2013100. Above 80 = overbought, below 20 = oversold. %K/%D crossovers generate signals.' },
  { id:'cci', num:'08', title:'Commodity Channel Index', category:'Oscillators', keywords:['Donald Lambert','typical price','mean deviation','+100','-100','overbought','oversold','cycle'], content:'CCI = (Typical Price \u2212 SMA) / (0.015 \u00D7 Mean Deviation). Measures how far price deviates from its statistical mean. Above +100 signals strength (or overbought), below \u2212100 signals weakness. Originally designed for commodity cycles.' },
  { id:'williams-r', num:'09', title:'Williams %R', category:'Oscillators', keywords:['Larry Williams','overbought','oversold','-20','-80','range','fast stochastic','inverse'], content:'%R = (Highest High \u2212 Close) / (Highest High \u2212 Lowest Low) \u00D7 \u2212100. Ranges \u22120 to \u2212100. Above \u221220 = overbought, below \u221280 = oversold. Essentially an inverted fast stochastic. Very responsive to price changes.' },
  { id:'roc', num:'10', title:'Rate of Change', category:'Oscillators', keywords:['momentum','percentage change','zero line','speed','acceleration','divergence','cyclical'], content:'ROC = ((Close \u2212 Close_N) / Close_N) \u00D7 100. Measures percentage price change over N periods. Oscillates around zero — positive = upward momentum, negative = downward. Simple but effective for identifying momentum shifts.' },
  { id:'macd', num:'11', title:'MACD', category:'Trend & Momentum', keywords:['Gerald Appel','12','26','9','signal line','histogram','convergence','divergence','crossover'], content:'MACD Line = EMA(12) \u2212 EMA(26). Signal Line = EMA(9) of MACD. Histogram = MACD \u2212 Signal. Crossovers of MACD/Signal generate buy/sell signals. Histogram shows momentum acceleration.' },
  { id:'adx', num:'12', title:'Average Directional Index', category:'Trend & Momentum', keywords:['Wilder','trend strength','DI+','DI\u2212','directional movement','25','non-directional','ranging'], content:'ADX measures trend strength (not direction) on a 0\u2013100 scale. Below 25 = weak/no trend, above 25 = trending. Uses +DI (bullish pressure) and \u2212DI (bearish pressure). Rising ADX = strengthening trend, falling = weakening.' },
  { id:'parabolic-sar', num:'13', title:'Parabolic SAR', category:'Trend & Momentum', keywords:['Wilder','stop and reverse','trailing stop','dots','acceleration factor','0.02','0.20','trend following'], content:'SAR = prior SAR + AF \u00D7 (EP \u2212 prior SAR). Dots appear below price in uptrends, above in downtrends. The acceleration factor (starting 0.02, max 0.20) causes dots to converge on price. When price touches SAR, the trend reverses.' },
  { id:'ichimoku', num:'14', title:'Ichimoku Cloud', category:'Trend & Momentum', keywords:['Goichi Hosoda','tenkan','kijun','senkou','chikou','cloud','kumo','one glance','Japanese'], content:'Five lines: Tenkan-sen (9-period midpoint), Kijun-sen (26-period midpoint), Senkou Span A & B (cloud boundaries), Chikou (lagging close). Price above cloud = bullish. Cloud color changes signal trend shifts. A complete system in "one glance."' },
  { id:'aroon', num:'15', title:'Aroon', category:'Trend & Momentum', keywords:['Tushar Chande','Aroon Up','Aroon Down','25-period','new high','new low','trend identification','dawn'], content:'Aroon Up = ((25 \u2212 periods since 25-period high) / 25) \u00D7 100. Aroon Down uses lowest low. When Up > 70 and Down < 30, strong uptrend. Crossovers signal trend changes. "Aroon" means "dawn" in Sanskrit.' },
  { id:'bollinger-bands', num:'16', title:'Bollinger Bands', category:'Volatility', keywords:['John Bollinger','standard deviation','20-period','2 sigma','squeeze','expansion','mean reversion','bandwidth'], content:'Middle = SMA(20), Upper = SMA + 2\u03C3, Lower = SMA \u2212 2\u03C3. Bands expand with volatility, contract during calm. The "squeeze" (narrow bands) often precedes big moves. ~95% of price stays within 2\u03C3 bands.' },
  { id:'atr', num:'17', title:'Average True Range', category:'Volatility', keywords:['Wilder','true range','volatility','position sizing','stop loss','14-period','abs','gap'], content:'True Range = max(High\u2212Low, |High\u2212Prev Close|, |Low\u2212Prev Close|). ATR = smoothed average of TR over N periods (default 14). NOT directional — purely measures volatility. Used for position sizing (e.g., risk 1 ATR) and stop placement.' },
  { id:'keltner-channels', num:'18', title:'Keltner Channels', category:'Volatility', keywords:['Chester Keltner','ATR','EMA','channel','trend','breakout','smoother','versus Bollinger'], content:'Middle = EMA(20), Upper = EMA + 2\u00D7ATR(10), Lower = EMA \u2212 2\u00D7ATR(10). Unlike Bollinger Bands (which use \u03C3), Keltner uses ATR — producing smoother channels. Used in the "TTM Squeeze" setup when Bollinger bands move inside Keltner.' },
  { id:'donchian-channels', num:'19', title:'Donchian Channels', category:'Volatility', keywords:['Richard Donchian','highest high','lowest low','20-period','turtle traders','breakout','channel'], content:'Upper = highest high of N periods. Lower = lowest low of N periods. Middle = (Upper+Lower)/2. Richard Donchian\'s system — the basis of the famous Turtle Traders strategy. Breakout above the upper channel = buy signal.' },
  { id:'standard-deviation', num:'20', title:'Standard Deviation', category:'Volatility', keywords:['sigma','variance','dispersion','normal distribution','volatility measure','statistical','Bollinger building block'], content:'\u03C3 = \u221A(\u03A3(x\u2212\u03BC)\u00B2/N). Measures how dispersed prices are from their mean. The building block of Bollinger Bands. Historical volatility is often expressed as the annualized standard deviation of returns (\u03C3\u22C5\u221A252).' },
  { id:'obv', num:'21', title:'On-Balance Volume', category:'Volume Indicators', keywords:['Joe Granville','cumulative volume','confirmation','divergence','breakout','volume precedes price'], content:'If close > prior close, OBV += volume. If close < prior close, OBV \u2212= volume. The absolute value doesn\'t matter — the slope does. "Volume precedes price" — OBV rising while price is flat often precedes a breakout.' },
  { id:'accumulation-distribution', num:'22', title:'Accumulation/Distribution', category:'Volume Indicators', keywords:['Marc Chaikin','money flow multiplier','CLV','cumulative','divergence','smart money'], content:'A/D = \u03A3 CLV \u00D7 Volume, where CLV = ((Close\u2212Low) \u2212 (High\u2212Close)) / (High\u2212Low). Unlike OBV, A/D accounts for WHERE within the bar the close falls. Weighted toward closes near the high (accumulation) or low (distribution).' },
  { id:'mfi', num:'23', title:'Money Flow Index', category:'Volume Indicators', keywords:['volume RSI','typical price','money flow','overbought','oversold','80','20','14-period'], content:'MFI is "RSI with volume." Uses Typical Price \u00D7 Volume as "money flow." Money Ratio = Positive Flow / Negative Flow. MFI = 100 \u2212 100/(1+MR). Same 0\u2013100 scale as RSI but volume-weighted. Better at catching extremes in liquid markets.' },
  { id:'chaikin-oscillator', num:'24', title:'Chaikin Oscillator', category:'Volume Indicators', keywords:['Marc Chaikin','A/D line','3-day EMA','10-day EMA','MACD of A/D','momentum','money flow'], content:'Chaikin Osc = EMA(3) of A/D Line \u2212 EMA(10) of A/D Line. It\'s essentially MACD applied to the Accumulation/Distribution line. Crossovers of zero signal shifts in money flow momentum.' },
  { id:'vwap-bands', num:'25', title:'VWAP Bands', category:'Volume Indicators', keywords:['VWAP','standard deviation bands','1\u03C3','2\u03C3','intraday','institutional levels','mean reversion'], content:'Standard deviation bands around VWAP: VWAP \u00B1 1\u03C3, 2\u03C3, 3\u03C3. The 1\u03C3 band captures ~68% of trades, 2\u03C3 captures ~95%. Institutional traders use these as intraday support/resistance and mean-reversion targets.' },
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
    sec.topics.forEach(t => {
      if (t === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">◉</span>Overview</div>`;
      } else {
        num++;
        const n = String(num).padStart(2,'0');
        html += `<div class="ni" data-topic="${t}" onclick="show('${t}',true)"><span class="ni-num">${n}</span>${TOPIC_NAMES[t]}</div>`;
      }
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}


const PATTERN_BRIDGES = {
  'sma': '<div class="callout bridge"><strong>Pattern bridge:</strong> The simple moving average is <a href="../../stats/#mean-median" target="_blank" rel="noopener">the arithmetic mean</a> on a rolling window. The same smoothing kernel powers <a href="../../ml-math/#cnn" target="_blank" rel="noopener">CNN convolutions</a> — a filter sliding across data.</div>',
  'ema': '<div class="callout bridge"><strong>Pattern bridge:</strong> Exponential weighting of recent data is exactly how <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">Adam’s momentum</a> tracks gradient history. In poetry, <a href="../../poetry/sound/#refrain" target="_blank" rel="noopener">refrain</a> gives recent repetitions more emotional weight.</div>',
  'wma': '<div class="callout bridge"><strong>Pattern bridge:</strong> Weighted averages assign importance by position — the same principle behind <a href="../../ml-math/#attention" target="_blank" rel="noopener">attention weights</a> in transformers and <a href="../../stats/#mean-median" target="_blank" rel="noopener">weighted means</a> in statistics.</div>',
  'dema': '<div class="callout bridge"><strong>Pattern bridge:</strong> Double smoothing to reduce lag mirrors <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">momentum with bias correction</a> in Adam. Both use exponential averaging twice to get closer to the true signal.</div>',
  'vwap': '<div class="callout bridge"><strong>Pattern bridge:</strong> Volume-weighted price is <a href="../../ml-math/#attention" target="_blank" rel="noopener">attention</a> over the trading day — each price weighted by how much the market cared. In statistics, it’s a <a href="../../stats/#mean-median" target="_blank" rel="noopener">weighted mean</a>.</div>',
  'rsi': '<div class="callout bridge"><strong>Pattern bridge:</strong> RSI normalizes momentum to [0,100] — a <a href="../../ml-math/#activation" target="_blank" rel="noopener">sigmoid-like activation</a> bounding raw gains and losses. In statistics, it’s a ratio of <a href="../../stats/#mean-median" target="_blank" rel="noopener">mean gains to mean losses</a>.</div>',
  'stochastic': '<div class="callout bridge"><strong>Pattern bridge:</strong> Where price sits in its recent range is a <a href="../../stats/#percentiles" target="_blank" rel="noopener">percentile rank</a>. The smoothed %D line is an <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">EMA applied to the oscillator</a> — momentum of momentum.</div>',
  'cci': '<div class="callout bridge"><strong>Pattern bridge:</strong> CCI measures deviation from the mean in units of mean absolute deviation — a <a href="../../stats/#z-scores" target="_blank" rel="noopener">z-score variant</a>. In ML, <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch normalization</a> does the same: center and scale.</div>',
  'williams-r': '<div class="callout bridge"><strong>Pattern bridge:</strong> Williams %R is the stochastic oscillator inverted — same math, different perspective. Like <a href="../../poetry/rhetoric/#litotes" target="_blank" rel="noopener">litotes</a> restating a positive as a negated negative, or <a href="../../stats/#percentiles" target="_blank" rel="noopener">percentiles</a> read from top instead of bottom.</div>',
  'roc': '<div class="callout bridge"><strong>Pattern bridge:</strong> Rate of change is the discrete <a href="../../ml-math/#gradient" target="_blank" rel="noopener">gradient</a> of price — the slope at each point. In statistics, it’s the <a href="../../stats/#correlation" target="_blank" rel="noopener">first difference</a> used to make time series stationary.</div>',
  'macd': '<div class="callout bridge"><strong>Pattern bridge:</strong> The difference between two EMAs is a <a href="../../ml-math/#loss" target="_blank" rel="noopener">residual</a> — what the fast signal sees that the slow one doesn’t. In poetry, <a href="../../poetry/rhetoric/#antithesis" target="_blank" rel="noopener">antithesis</a> sets two things side by side to reveal the gap.</div>',
  'adx': '<div class="callout bridge"><strong>Pattern bridge:</strong> ADX measures trend strength without direction — like <a href="../../stats/#variance-std" target="_blank" rel="noopener">standard deviation</a> measuring spread without sign. In ML, <a href="../../ml-math/#pca" target="_blank" rel="noopener">PCA eigenvalues</a> measure how much variance each component explains.</div>',
  'parabolic-sar': '<div class="callout bridge"><strong>Pattern bridge:</strong> SAR’s acceleration factor increases with each new extreme — the same <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">momentum accumulation</a> used in gradient descent. The trailing stop tightens like a <a href="../../poetry/forms/#villanelle" target="_blank" rel="noopener">villanelle’s</a> repeating constraint.</div>',
  'ichimoku': '<div class="callout bridge"><strong>Pattern bridge:</strong> Five components forming a cloud is a multi-signal consensus system — like an <a href="../../ml-math/#metrics" target="_blank" rel="noopener">ensemble of metrics</a> in ML. The cloud itself is a visual <a href="../../stats/#confidence-intervals" target="_blank" rel="noopener">confidence interval</a>.</div>',
  'aroon': '<div class="callout bridge"><strong>Pattern bridge:</strong> Time since highest high vs. lowest low measures where you are in a cycle. The same temporal awareness drives <a href="../../ml-math/#rnn" target="_blank" rel="noopener">RNN hidden states</a> and the <a href="../../poetry/sound/#cadence" target="_blank" rel="noopener">cadence</a> of a poem’s rhythm.</div>',
  'bollinger-bands': '<div class="callout bridge"><strong>Pattern bridge:</strong> Price mean ± 2σ is a <a href="../../stats/#normal" target="_blank" rel="noopener">normal distribution</a> confidence band applied to price. In ML, <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch normalization</a> standardizes activations the same way — center, then scale by deviation.</div>',
  'atr': '<div class="callout bridge"><strong>Pattern bridge:</strong> Average True Range measures volatility as mean absolute deviation — a close cousin of <a href="../../stats/#variance-std" target="_blank" rel="noopener">standard deviation</a>. In ML, <a href="../../ml-math/#grad-clip" target="_blank" rel="noopener">gradient clipping</a> uses a similar magnitude threshold.</div>',
  'keltner-channels': '<div class="callout bridge"><strong>Pattern bridge:</strong> EMA ± ATR multiples blend trend and volatility — like <a href="../../stats/#confidence-intervals" target="_blank" rel="noopener">confidence intervals</a> around a moving center. In poetry, <a href="../../poetry/forms/#ballad" target="_blank" rel="noopener">ballad meter</a> sets a rhythmic channel the voice moves within.</div>',
  'donchian-channels': '<div class="callout bridge"><strong>Pattern bridge:</strong> Highest high and lowest low over N periods is the <a href="../../stats/#percentiles" target="_blank" rel="noopener">range (max-min)</a> from descriptive statistics. In poetry, <a href="../../poetry/forms/#ode" target="_blank" rel="noopener">an ode</a> spans from the most intimate to the most elevated register.</div>',
  'standard-deviation': '<div class="callout bridge"><strong>Pattern bridge:</strong> This is <a href="../../stats/#variance-std" target="_blank" rel="noopener">standard deviation</a> from statistics, applied to price returns. In ML, it’s the denominator in <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch normalization</a> and the width of <a href="../../ml-math/#mle" target="_blank" rel="noopener">Gaussian distributions</a>.</div>',
  'obv': '<div class="callout bridge"><strong>Pattern bridge:</strong> Cumulative volume adds up conviction — a <a href="../../stats/#cumulative-distribution" target="_blank" rel="noopener">cumulative sum</a> (CDF-like) of directional volume. In ML, <a href="../../ml-math/#backprop" target="_blank" rel="noopener">backpropagation</a> accumulates gradients through the graph.</div>',
  'accumulation-distribution': '<div class="callout bridge"><strong>Pattern bridge:</strong> A/D line weights volume by where price closes in its range — an <a href="../../ml-math/#attention" target="_blank" rel="noopener">attention-weighted</a> running total. In poetry, <a href="../../poetry/rhetoric/#climax" target="_blank" rel="noopener">gradatio</a> accumulates intensity line by line.</div>',
  'mfi': '<div class="callout bridge"><strong>Pattern bridge:</strong> Money Flow Index is <a href="../../markets/indicators/#rsi" target="_blank" rel="noopener">RSI</a> weighted by volume — the same normalization to [0,100]. In statistics, weighting by a second variable is a <a href="../../stats/#covariance" target="_blank" rel="noopener">covariance-aware</a> approach.</div>',
  'chaikin-oscillator': '<div class="callout bridge"><strong>Pattern bridge:</strong> The difference between fast and slow A/D smoothing is a <a href="../../markets/indicators/#macd" target="_blank" rel="noopener">MACD-like divergence</a> applied to volume flow. In ML, <a href="../../ml-math/#optimizers" target="_blank" rel="noopener">bias correction in Adam</a> compares fast and slow estimates the same way.</div>',
  'vwap-bands': '<div class="callout bridge"><strong>Pattern bridge:</strong> VWAP ± standard deviation bands combine <a href="../../stats/#mean-median" target="_blank" rel="noopener">weighted mean</a> with <a href="../../stats/#variance-std" target="_blank" rel="noopener">dispersion</a>. The same construction as <a href="../../ml-math/#batchnorm" target="_blank" rel="noopener">batch norm’s</a> mean-and-variance framing.</div>'
};

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  let html = buildHome();
  TOPIC_DATA.forEach(t => {
    html += `<div class="topic" id="${t.id}">`;
    html += `<div class="topic-header"><div class="topic-meta"><div class="topic-num">${t.num} — ${t.category}</div><h2>${t.title}</h2></div></div>`;
    html += `<p class="sub">// ${t.content.split('.')[0]}.</p>`;
    html += `<div class="va"><canvas id="${t.id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}Canvas"></canvas></div>`;
    html += `<div class="topic-body">${builders[t.id] ? builders[t.id]() : `<p>${t.content}</p>`}</div>`;
    if (PATTERN_BRIDGES[t.id]) html += PATTERN_BRIDGES[t.id];
    html += `<div class="topic-nav" id="nav-${t.id}"></div>`;
    html += '</div>';
  });
  main.innerHTML = html;
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Technical <em>Indicators</em></h2>
    <p style="margin-top:14px">25 indicators across moving averages, oscillators, trend/momentum, volatility, and volume — the quantitative toolkit for reading price action.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-moving-avg','sma')">
      <div class="cat-card-icon">📊</div>
      <div class="cat-card-name">Moving Averages</div>
      <div class="cat-card-count">5 topics · SMA, EMA, WMA, DEMA, VWAP</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-oscillators','rsi')">
      <div class="cat-card-icon">〰️</div>
      <div class="cat-card-name">Oscillators</div>
      <div class="cat-card-count">5 topics · RSI, Stochastic, CCI, Williams, ROC</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-trend','macd')">
      <div class="cat-card-icon">📈</div>
      <div class="cat-card-name">Trend & Momentum</div>
      <div class="cat-card-count">5 topics · MACD, ADX, SAR, Ichimoku, Aroon</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-volatility','bollinger-bands')">
      <div class="cat-card-icon">🌊</div>
      <div class="cat-card-name">Volatility</div>
      <div class="cat-card-count">5 topics · Bollinger, ATR, Keltner, Donchian, StdDev</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-volume','obv')">
      <div class="cat-card-icon">🔊</div>
      <div class="cat-card-name">Volume Indicators</div>
      <div class="cat-card-count">5 topics · OBV, A/D, MFI, Chaikin, VWAP Bands</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   Individual Topic Builders
   ═══════════════════════════════════════════════════════════════ */
const builders = {};

builders['sma'] = () => `
<p>The <strong>Simple Moving Average</strong> is the arithmetic mean of the last <em>N</em> closing prices.</p>
<div class="fb">SMA = (C₁ + C₂ + … + Cₙ) / N</div>
<p>Common periods: <strong>20</strong> (short-term), <strong>50</strong> (medium), <strong>200</strong> (long-term).</p>
<div class="callout"><strong>Golden Cross:</strong> 50-day SMA crosses above 200-day → bullish signal.<br><strong>Death Cross:</strong> 50-day crosses below 200-day → bearish.</div>
<p>Limitations: equal weighting means SMA lags price — old data has the same influence as new data.</p>`;

builders['ema'] = () => `
<p>The <strong>Exponential Moving Average</strong> applies an exponential smoothing factor that weights recent prices more heavily.</p>
<div class="fb">Multiplier k = 2 / (N + 1)<br>EMA = (Close − EMA_prev) × k + EMA_prev</div>
<p>Because each new EMA is built on the previous, all past prices influence the result — but their weight decays exponentially.</p>
<div class="callout"><strong>Key pair:</strong> The 12-period and 26-period EMAs form the foundation of the MACD indicator.</div>
<p>More responsive than SMA to sudden price changes — preferred in faster-moving markets.</p>`;

builders['wma'] = () => `
<p>The <strong>Weighted Moving Average</strong> assigns linearly increasing weights to more recent prices.</p>
<div class="fb">WMA = (N·Cₙ + (N−1)·Cₙ₋₁ + … + 1·C₁) / (N(N+1)/2)</div>
<p>The denominator is the triangle number — the sum of weights 1 + 2 + … + N.</p>
<p>WMA falls between SMA and EMA in responsiveness. Less common in practice than EMA, but useful when you want linear rather than exponential decay of older data.</p>`;

builders['dema'] = () => `
<p><strong>Double Exponential Moving Average</strong> — developed by Patrick Mulloy (1994) to reduce the lag inherent in standard EMAs.</p>
<div class="fb">DEMA = 2 × EMA(N) − EMA(EMA(N))</div>
<p>The trick: by subtracting the double-smoothed EMA, the extra lag is removed. Result: a much tighter fit to price in trending markets.</p>
<div class="callout"><strong>Trade-off:</strong> Reduced lag means DEMA is more prone to whipsaws in choppy markets. Best used when a trend is established.</div>`;

builders['vwap'] = () => `
<p><strong>Volume-Weighted Average Price</strong> — the institutional benchmark for trade execution quality.</p>
<div class="fb">VWAP = Σ(Typical Price × Volume) / Σ(Volume)<br>Typical Price = (High + Low + Close) / 3</div>
<p>Resets at the start of each trading day (intraday indicator).</p>
<div class="callout"><strong>Interpretation:</strong><br>• Price > VWAP → buyers in control, upward pressure<br>• Price < VWAP → sellers in control, downward pressure<br>• Algorithmic traders use VWAP to minimize market impact</div>`;

builders['rsi'] = () => `
<p>The <strong>Relative Strength Index</strong> — J. Welles Wilder's momentum oscillator (1978).</p>
<div class="fb">RS = Average Gain / Average Loss (over N periods)<br>RSI = 100 − 100 / (1 + RS)</div>
<p>Default period: <strong>14</strong>. Scale: 0–100.</p>
<div class="callout"><strong>Zones:</strong><br>• RSI > 70 → overbought (price may pull back)<br>• RSI < 30 → oversold (price may bounce)<br><strong>Divergence:</strong> Price makes new high but RSI doesn't → bearish divergence (momentum weakening)</div>`;

builders['stochastic'] = () => `
<p>The <strong>Stochastic Oscillator</strong> — developed by George Lane in the 1950s.</p>
<div class="fb">%K = (Close − Lowest Low) / (Highest High − Lowest Low) × 100<br>%D = SMA(3) of %K</div>
<p>Scale: 0–100. Default lookback: 14 periods.</p>
<div class="callout"><strong>Signals:</strong><br>• Above 80 = overbought, below 20 = oversold<br>• %K crossing above %D = buy<br>• %K crossing below %D = sell<br>The <em>slow stochastic</em> uses smoothed %K for fewer false signals.</div>`;

builders['cci'] = () => `
<p>The <strong>Commodity Channel Index</strong> — created by Donald Lambert (1980).</p>
<div class="fb">CCI = (Typical Price − SMA(TP)) / (0.015 × Mean Deviation)</div>
<p>The 0.015 constant scales the indicator so that ~75% of values fall between −100 and +100.</p>
<div class="callout"><strong>Interpretation:</strong><br>• CCI > +100 → unusually strong (possible overbought)<br>• CCI < −100 → unusually weak (possible oversold)<br>• Zero-line crossovers indicate trend direction changes</div>`;

builders['williams-r'] = () => `
<p><strong>Williams %R</strong> — Larry Williams' fast momentum oscillator.</p>
<div class="fb">%R = (Highest High − Close) / (Highest High − Lowest Low) × −100</div>
<p>Scale: 0 to −100. Default: 14 periods. Essentially an inverted fast stochastic (%K).</p>
<div class="callout"><strong>Zones:</strong><br>• Above −20 → overbought<br>• Below −80 → oversold<br>Very responsive — useful for short-term timing but prone to false signals in trending markets.</div>`;

builders['roc'] = () => `
<p><strong>Rate of Change</strong> — a pure momentum oscillator measuring percentage price change.</p>
<div class="fb">ROC = ((Close − Close_N) / Close_N) × 100</div>
<p>Oscillates around zero. Positive = upward momentum; negative = downward.</p>
<div class="callout"><strong>Uses:</strong><br>• ROC crossing above zero → bullish shift<br>• Divergences between ROC and price signal weakening trends<br>• Common period: 12 or 14</div>`;

builders['macd'] = () => `
<p>The <strong>Moving Average Convergence Divergence</strong> — Gerald Appel's trend-momentum hybrid (1979).</p>
<div class="fb">MACD Line = EMA(12) − EMA(26)<br>Signal Line = EMA(9) of MACD<br>Histogram = MACD − Signal</div>
<div class="callout"><strong>Three signals:</strong><br>1. <strong>Signal crossover:</strong> MACD crosses above Signal → buy; below → sell<br>2. <strong>Zero-line crossover:</strong> MACD crosses above zero → bullish trend<br>3. <strong>Divergence:</strong> Price makes new high but MACD doesn't → weakening momentum</div>
<p>The histogram shows the <em>rate of change</em> of the MACD/Signal relationship — when bars shrink, a crossover is coming.</p>`;

builders['adx'] = () => `
<p>The <strong>Average Directional Index</strong> — Wilder's trend strength indicator (1978).</p>
<div class="fb">+DI = smoothed +DM / ATR<br>−DI = smoothed −DM / ATR<br>DX = |+DI − −DI| / (+DI + −DI) × 100<br>ADX = smoothed DX (default 14)</div>
<div class="callout"><strong>ADX values:</strong><br>• 0–25 → absent or weak trend → avoid trend-following strategies<br>• 25–50 → strong trend<br>• 50–75 → very strong trend<br>• 75–100 → extremely strong (rare)<br>ADX doesn't tell direction — use +DI vs −DI for that.</div>`;

builders['parabolic-sar'] = () => `
<p>The <strong>Parabolic Stop and Reverse</strong> — Wilder's trend-following trailing stop system.</p>
<div class="fb">SAR = Prior SAR + AF × (EP − Prior SAR)<br>AF starts at 0.02, increments by 0.02 each new EP, max 0.20<br>EP = Extreme Point (highest high or lowest low in current trend)</div>
<div class="callout"><strong>Visual:</strong> Dots below price = uptrend. Dots above = downtrend. When price touches the SAR dot, flip direction.<br><strong>Best for:</strong> Trending markets. In sideways markets, SAR generates frequent whipsaws.</div>`;

builders['ichimoku'] = () => `
<p>The <strong>Ichimoku Kinko Hyo</strong> ("one glance equilibrium chart") — Goichi Hosoda, 1960s Japan.</p>
<div class="fb">Tenkan-sen = (9-period high + 9-period low) / 2<br>Kijun-sen = (26-period high + 26-period low) / 2<br>Senkou A = (Tenkan + Kijun) / 2, plotted 26 periods ahead<br>Senkou B = (52-period high + 52-period low) / 2, plotted 26 ahead<br>Chikou = Close, plotted 26 periods back</div>
<div class="callout"><strong>Quick read:</strong><br>• Price above cloud → bullish<br>• Price below cloud → bearish<br>• Cloud color flip → trend change<br>• Tenkan/Kijun cross → entry signal<br>• Thick cloud → strong support/resistance</div>`;

builders['aroon'] = () => `
<p>The <strong>Aroon Indicator</strong> — Tushar Chande (1995). "Aroon" means "dawn" in Sanskrit.</p>
<div class="fb">Aroon Up = ((25 − periods since 25-day high) / 25) × 100<br>Aroon Down = ((25 − periods since 25-day low) / 25) × 100</div>
<div class="callout"><strong>Interpretation:</strong><br>• Aroon Up > 70, Down < 30 → strong uptrend<br>• Aroon Down > 70, Up < 30 → strong downtrend<br>• Both below 50 → consolidation<br>• Crossovers signal trend changes</div>`;

builders['bollinger-bands'] = () => `
<p><strong>Bollinger Bands</strong> — John Bollinger's volatility envelope (1983).</p>
<div class="fb">Middle Band = SMA(20)<br>Upper Band = SMA(20) + 2σ<br>Lower Band = SMA(20) − 2σ</div>
<p>Bands expand with volatility, contract during quiet periods.</p>
<div class="callout"><strong>Key concepts:</strong><br>• <strong>Squeeze:</strong> Narrow bands → low volatility → big move coming<br>• <strong>Walk the band:</strong> In strong trends, price can ride the upper/lower band<br>• <strong>Mean reversion:</strong> Price touching outer band → may return to middle<br>• ~95% of closes fall within the 2σ bands</div>`;

builders['atr'] = () => `
<p>The <strong>Average True Range</strong> — Wilder's volatility measure (1978). Purely measures volatility, NOT direction.</p>
<div class="fb">True Range = max(H−L, |H−Prev Close|, |L−Prev Close|)<br>ATR = Smoothed average of TR over N periods (default 14)</div>
<div class="callout"><strong>Practical uses:</strong><br>• <strong>Position sizing:</strong> Risk 1–2 ATR per trade → adapts to current volatility<br>• <strong>Stop loss:</strong> Place stops 1.5–2× ATR from entry<br>• <strong>Volatility filter:</strong> High ATR = trending market; low ATR = ranging</div>`;

builders['keltner-channels'] = () => `
<p><strong>Keltner Channels</strong> — Chester Keltner (1960), modernized by Linda Raschke.</p>
<div class="fb">Middle = EMA(20)<br>Upper = EMA(20) + 2 × ATR(10)<br>Lower = EMA(20) − 2 × ATR(10)</div>
<div class="callout"><strong>vs. Bollinger Bands:</strong><br>• Bollinger uses σ (standard deviation) → more jagged<br>• Keltner uses ATR → smoother channels<br>• <strong>TTM Squeeze:</strong> Bollinger Bands move INSIDE Keltner Channels → extreme low volatility → explosive move imminent</div>`;

builders['donchian-channels'] = () => `
<p><strong>Donchian Channels</strong> — Richard Donchian, the "father of trend following."</p>
<div class="fb">Upper = Highest High of N periods<br>Lower = Lowest Low of N periods<br>Middle = (Upper + Lower) / 2</div>
<div class="callout"><strong>Turtle Traders:</strong> Richard Dennis's famous experiment used Donchian channel breakouts:<br>• Buy when price breaks above 20-day high<br>• Sell when price breaks below 20-day low<br>• Exit at 10-day opposite channel</div>`;

builders['standard-deviation'] = () => `
<p><strong>Standard Deviation</strong> — the statistical building block of volatility measurement.</p>
<div class="fb">σ = √(Σ(x − μ)² / N)<br>where μ = mean, N = number of observations</div>
<p>Higher σ = more volatility = prices are spread far from the mean.</p>
<div class="callout"><strong>In markets:</strong><br>• Historical Volatility = σ of returns × √252 (annualized)<br>• 1σ covers ~68% of observations<br>• 2σ covers ~95% → basis of Bollinger Bands<br>• 3σ events are "rare" but happen more often in markets than normal distributions predict (fat tails)</div>`;

builders['obv'] = () => `
<p><strong>On-Balance Volume</strong> — Joe Granville's cumulative volume indicator (1963).</p>
<div class="fb">If Close > Prior Close → OBV += Volume<br>If Close < Prior Close → OBV -= Volume<br>If Close = Prior Close → OBV unchanged</div>
<p>The absolute value doesn't matter — the <em>slope</em> reveals accumulation or distribution.</p>
<div class="callout"><strong>"Volume precedes price":</strong><br>• OBV rising + price flat → accumulation → expect breakout UP<br>• OBV falling + price flat → distribution → expect breakdown DOWN<br>• Divergence between OBV and price = powerful signal</div>`;

builders['accumulation-distribution'] = () => `
<p>The <strong>Accumulation/Distribution Line</strong> — Marc Chaikin's volume-weighted indicator.</p>
<div class="fb">CLV = ((Close − Low) − (High − Close)) / (High − Low)<br>A/D = Σ(CLV × Volume)</div>
<p>CLV (Close Location Value) ranges from −1 to +1. Close near the high → CLV near +1 (accumulation). Close near the low → CLV near −1 (distribution).</p>
<div class="callout">Unlike OBV which uses the full volume, A/D weights by WHERE price closes within the bar — giving a more nuanced view of buying vs. selling pressure.</div>`;

builders['mfi'] = () => `
<p>The <strong>Money Flow Index</strong> — often called "volume-weighted RSI."</p>
<div class="fb">Typical Price = (High + Low + Close) / 3<br>Money Flow = TP × Volume<br>MF Ratio = Positive Flow / Negative Flow<br>MFI = 100 − 100 / (1 + MF Ratio)</div>
<p>Scale: 0–100. Default period: 14.</p>
<div class="callout"><strong>Zones:</strong><br>• MFI > 80 → overbought (potential reversal)<br>• MFI < 20 → oversold (potential bounce)<br>• MFI divergence from price → strong reversal signal<br>More reliable than RSI in liquid, volume-rich markets</div>`;

builders['chaikin-oscillator'] = () => `
<p>The <strong>Chaikin Oscillator</strong> — "MACD applied to A/D" by Marc Chaikin.</p>
<div class="fb">Chaikin Osc = EMA(3) of A/D Line − EMA(10) of A/D Line</div>
<p>It measures the momentum of the Accumulation/Distribution line.</p>
<div class="callout"><strong>Signals:</strong><br>• Crosses above zero → positive money flow momentum (buy)<br>• Crosses below zero → negative money flow momentum (sell)<br>• Divergence from price → early warning of trend change<br>Best used as confirmation alongside price-based indicators</div>`;

builders['vwap-bands'] = () => `
<p><strong>VWAP Bands</strong> — standard deviation envelopes around VWAP.</p>
<div class="fb">VWAP ± 1σ, ± 2σ, ± 3σ<br>where σ = standard deviation of (Price − VWAP) weighted by volume</div>
<div class="callout"><strong>Institutional levels:</strong><br>• ±1σ → ~68% of trades → short-term mean reversion zone<br>• ±2σ → ~95% of trades → stretched, likely to snap back<br>• ±3σ → extreme → strong rubber-band effect<br>Day traders use these as dynamic support/resistance levels that adapt to volume distribution.</div>`;
