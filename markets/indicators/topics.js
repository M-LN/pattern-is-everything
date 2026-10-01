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
  { id:'sma', pattern:'Averaging cancels noise: the longer the window, the calmer the line and the later it reacts', num:'01', title:'Simple Moving Average', category:'Moving Averages', keywords:['average','mean','smoothing','trend','crossover','lag','period','20-day','50-day','200-day'], content:'The arithmetic mean of the last N closing prices. SMA smooths noise and reveals trend direction. Common periods: 20 (short), 50 (medium), 200 (long). The golden cross (50 over 200) and death cross (50 under 200) are classic signals.' },
  { id:'ema', pattern:'Trust recent data more than old, with weights that fade exponentially, as in smoothing and optimizer momentum', num:'02', title:'Exponential Moving Average', category:'Moving Averages', keywords:['weighted','recent','responsive','smoothing factor','multiplier','12-day','26-day','crossover'], content:'Weights recent prices more heavily using an exponential smoothing factor: multiplier = 2/(N+1). More responsive to new data than SMA. The 12/26 EMA pair forms the basis of MACD.' },
  { id:'wma', pattern:'A straight-line fade of the past: the newest price counts most, older ones taper off evenly', num:'03', title:'Weighted Moving Average', category:'Moving Averages', keywords:['linear weight','recent bias','triangle number','smooth','less lag'], content:'Assigns linearly increasing weights to recent prices — the most recent gets weight N, the previous N\u22121, etc. Divided by the triangle number N(N+1)/2. Falls between SMA (equal weight) and EMA (exponential weight) in responsiveness.' },
  { id:'dema', pattern:'Subtract a smoother from itself to cancel part of its lag, and accept a noisier line in return', num:'04', title:'Double Exponential MA', category:'Moving Averages', keywords:['Patrick Mulloy','reduced lag','double smoothing','fast','trend following','formula'], content:'DEMA = 2·EMA(N) \u2212 EMA(EMA(N)). By subtracting the double-smoothed EMA, Patrick Mulloy\'s formula significantly reduces lag while maintaining smoothness. Tracks price more closely in trending markets.' },
  { id:'vwap', pattern:'The average price weighted by where the volume actually traded, used as the day’s fair-value anchor', num:'05', title:'VWAP', category:'Moving Averages', keywords:['volume weighted','institutional','benchmark','intraday','cumulative','fair value','slippage'], content:'Volume-Weighted Average Price = \u03A3(Price \u00D7 Volume) / \u03A3(Volume). Resets daily. Institutional benchmark — trading above VWAP suggests upward pressure, below suggests downward. Used to measure execution quality.' },
  { id:'rsi', pattern:'How lopsided recent gains and losses are, squeezed into a 0–100 scale and read as stretched or calm', num:'06', title:'Relative Strength Index', category:'Oscillators', keywords:['Wilder','overbought','oversold','70','30','momentum','divergence','14-period'], content:'RSI = 100 \u2212 100/(1 + RS), where RS = Avg Gain / Avg Loss over N periods (default 14). Ranges 0\u2013100. Above 70 = overbought, below 30 = oversold. Divergences between RSI and price often precede reversals.' },
  { id:'stochastic', pattern:'Where the close sits inside its recent range: near the top in strength, near the bottom in weakness', num:'07', title:'Stochastic Oscillator', category:'Oscillators', keywords:['George Lane','%K','%D','overbought','oversold','80','20','crossover','momentum'], content:'%K = (Close \u2212 Lowest Low) / (Highest High \u2212 Lowest Low) \u00D7 100. %D = 3-period SMA of %K. Ranges 0\u2013100. Above 80 = overbought, below 20 = oversold. %K/%D crossovers generate signals.' },
  { id:'cci', pattern:'How far price has strayed from its typical level, measured in units of its usual wandering', num:'08', title:'Commodity Channel Index', category:'Oscillators', keywords:['Donald Lambert','typical price','mean deviation','+100','-100','overbought','oversold','cycle'], content:'CCI = (Typical Price \u2212 SMA) / (0.015 \u00D7 Mean Deviation). Measures how far price deviates from its statistical mean. Above +100 signals strength (or overbought), below \u2212100 signals weakness. Originally designed for commodity cycles.' },
  { id:'williams-r', pattern:'The stochastic seen from the top: how far the close sits below the recent high', num:'09', title:'Williams %R', category:'Oscillators', keywords:['Larry Williams','overbought','oversold','-20','-80','range','fast stochastic','inverse'], content:'%R = (Highest High \u2212 Close) / (Highest High \u2212 Lowest Low) \u00D7 \u2212100. Ranges \u22120 to \u2212100. Above \u221220 = overbought, below \u221280 = oversold. Essentially an inverted fast stochastic. Very responsive to price changes.' },
  { id:'roc', pattern:'Speed rather than level: the percentage change over N bars, the first derivative of price', num:'10', title:'Rate of Change', category:'Oscillators', keywords:['momentum','percentage change','zero line','speed','acceleration','divergence','cyclical'], content:'ROC = ((Close \u2212 Close_N) / Close_N) \u00D7 100. Measures percentage price change over N periods. Oscillates around zero — positive = upward momentum, negative = downward. Simple but effective for identifying momentum shifts.' },
  { id:'macd', pattern:'Momentum as the gap between a fast and a slow average, and how that gap is changing', num:'11', title:'MACD', category:'Trend & Momentum', keywords:['Gerald Appel','12','26','9','signal line','histogram','convergence','divergence','crossover'], content:'MACD Line = EMA(12) \u2212 EMA(26). Signal Line = EMA(9) of MACD. Histogram = MACD \u2212 Signal. Crossovers of MACD/Signal generate buy/sell signals. Histogram shows momentum acceleration.' },
  { id:'adx', pattern:'How strongly price is trending, whichever way it goes: strength without direction', num:'12', title:'Average Directional Index', category:'Trend & Momentum', keywords:['Wilder','trend strength','DI+','DI\u2212','directional movement','25','non-directional','ranging'], content:'ADX measures trend strength (not direction) on a 0\u2013100 scale. Below 25 = weak/no trend, above 25 = trending. Uses +DI (bullish pressure) and \u2212DI (bearish pressure). Rising ADX = strengthening trend, falling = weakening.' },
  { id:'parabolic-sar', pattern:'A trailing stop that speeds up as the trend runs on, patient early and tighter as the move matures', num:'13', title:'Parabolic SAR', category:'Trend & Momentum', keywords:['Wilder','stop and reverse','trailing stop','dots','acceleration factor','0.02','0.20','trend following'], content:'SAR = prior SAR + AF \u00D7 (EP \u2212 prior SAR). Dots appear below price in uptrends, above in downtrends. The acceleration factor (starting 0.02, max 0.20) causes dots to converge on price. When price touches SAR, the trend reverses.' },
  { id:'ichimoku', pattern:'Midpoints of past highs and lows, some shifted forward in time, to show balance, trend and support at a glance', num:'14', title:'Ichimoku Cloud', category:'Trend & Momentum', keywords:['Goichi Hosoda','tenkan','kijun','senkou','chikou','cloud','kumo','one glance','Japanese'], content:'Five lines: Tenkan-sen (9-period midpoint), Kijun-sen (26-period midpoint), Senkou Span A & B (cloud boundaries), Chikou (lagging close). Price above cloud = bullish. Cloud color changes signal trend shifts. A complete system in "one glance."' },
  { id:'aroon', pattern:'How recently the high and the low were set; fresh highs mean the trend is still alive', num:'15', title:'Aroon', category:'Trend & Momentum', keywords:['Tushar Chande','Aroon Up','Aroon Down','25-period','new high','new low','trend identification','dawn'], content:'Aroon Up = ((25 \u2212 periods since 25-period high) / 25) \u00D7 100. Aroon Down uses lowest low. When Up > 70 and Down < 30, strong uptrend. Crossovers signal trend changes. "Aroon" means "dawn" in Sanskrit.' },
  { id:'bollinger-bands', pattern:'A moving average with bands two standard deviations wide: volatility drawn around the trend', num:'16', title:'Bollinger Bands', category:'Volatility', keywords:['John Bollinger','standard deviation','20-period','2 sigma','squeeze','expansion','mean reversion','bandwidth'], content:'Middle = SMA(20), Upper = SMA + 2\u03C3, Lower = SMA \u2212 2\u03C3. Bands expand with volatility, contract during calm. The "squeeze" (narrow bands) often precedes big moves. ~95% of price stays within 2\u03C3 bands.' },
  { id:'atr', pattern:'Volatility as the typical size of a bar, gaps included, the yardstick for stops and position size', num:'17', title:'Average True Range', category:'Volatility', keywords:['Wilder','true range','volatility','position sizing','stop loss','14-period','abs','gap'], content:'True Range = max(High\u2212Low, |High\u2212Prev Close|, |Low\u2212Prev Close|). ATR = smoothed average of TR over N periods (default 14). NOT directional — purely measures volatility. Used for position sizing (e.g., risk 1 ATR) and stop placement.' },
  { id:'keltner-channels', pattern:'Bands set by average range instead of standard deviation, so a single outlier moves them less', num:'18', title:'Keltner Channels', category:'Volatility', keywords:['Chester Keltner','ATR','EMA','channel','trend','breakout','smoother','versus Bollinger'], content:'Middle = EMA(20), Upper = EMA + 2\u00D7ATR(10), Lower = EMA \u2212 2\u00D7ATR(10). Unlike Bollinger Bands (which use \u03C3), Keltner uses ATR — producing smoother channels. Used in the "TTM Squeeze" setup when Bollinger bands move inside Keltner.' },
  { id:'donchian-channels', pattern:'The highest high and lowest low of the last N bars; leaving that range is the signal', num:'19', title:'Donchian Channels', category:'Volatility', keywords:['Richard Donchian','highest high','lowest low','20-period','turtle traders','breakout','channel'], content:'Upper = highest high of N periods. Lower = lowest low of N periods. Middle = (Upper+Lower)/2. Richard Donchian\'s system — the basis of the famous Turtle Traders strategy. Breakout above the upper channel = buy signal.' },
  { id:'standard-deviation', pattern:'How widely values spread around their mean, the single number most of risk measurement is built on', num:'20', title:'Standard Deviation', category:'Volatility', keywords:['sigma','variance','dispersion','normal distribution','volatility measure','statistical','Bollinger building block'], content:'\u03C3 = \u221A(\u03A3(x\u2212\u03BC)\u00B2/N). Measures how dispersed prices are from their mean. The building block of Bollinger Bands. Historical volatility is often expressed as the annualized standard deviation of returns (\u03C3\u22C5\u221A252).' },
  { id:'obv', pattern:'A running total of volume, signed by each day’s direction: does volume confirm the move or not', num:'21', title:'On-Balance Volume', category:'Volume Indicators', keywords:['Joe Granville','cumulative volume','confirmation','divergence','breakout','volume precedes price'], content:'If close > prior close, OBV += volume. If close < prior close, OBV \u2212= volume. The absolute value doesn\'t matter — the slope does. "Volume precedes price" — OBV rising while price is flat often precedes a breakout.' },
  { id:'accumulation-distribution', pattern:'Volume weighted by where the close lands in the day’s range: the buying or selling pressure under the price', num:'22', title:'Accumulation/Distribution', category:'Volume Indicators', keywords:['Marc Chaikin','money flow multiplier','CLV','cumulative','divergence','smart money'], content:'A/D = \u03A3 CLV \u00D7 Volume, where CLV = ((Close\u2212Low) \u2212 (High\u2212Close)) / (High\u2212Low). Unlike OBV, A/D accounts for WHERE within the bar the close falls. Weighted toward closes near the high (accumulation) or low (distribution).' },
  { id:'mfi', pattern:'RSI with volume in it: overbought and oversold, weighted by how much money changed hands', num:'23', title:'Money Flow Index', category:'Volume Indicators', keywords:['volume RSI','typical price','money flow','overbought','oversold','80','20','14-period'], content:'MFI is "RSI with volume." Uses Typical Price \u00D7 Volume as "money flow." Money Ratio = Positive Flow / Negative Flow. MFI = 100 \u2212 100/(1+MR). Same 0\u2013100 scale as RSI but volume-weighted. Better at catching extremes in liquid markets.' },
  { id:'chaikin-oscillator', pattern:'The momentum of accumulation and distribution, the MACD idea applied to volume flow', num:'24', title:'Chaikin Oscillator', category:'Volume Indicators', keywords:['Marc Chaikin','A/D line','3-day EMA','10-day EMA','MACD of A/D','momentum','money flow'], content:'Chaikin Osc = EMA(3) of A/D Line \u2212 EMA(10) of A/D Line. It\'s essentially MACD applied to the Accumulation/Distribution line. Crossovers of zero signal shifts in money flow momentum.' },
  { id:'vwap-bands', pattern:'Standard-deviation bands around VWAP: how far price has drifted from where volume puts fair value', num:'25', title:'VWAP Bands', category:'Volume Indicators', keywords:['VWAP','standard deviation bands','1\u03C3','2\u03C3','intraday','institutional levels','mean reversion'], content:'Standard deviation bands around VWAP: VWAP \u00B1 1\u03C3, 2\u03C3, 3\u03C3. The 1\u03C3 band captures ~68% of trades, 2\u03C3 captures ~95%. Institutional traders use these as intraday support/resistance and mean-reversion targets.' },
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
  'sma': '<div class="callout bridge"><strong>Pattern bridge:</strong> The simple moving average is <a href="../../stats/#eda-workflow">the arithmetic mean</a> on a rolling window. The same smoothing kernel powers <a href="../../ml-math/#cnn">CNN convolutions</a> — a filter sliding across data.</div>',
  'ema': '<div class="callout bridge"><strong>Pattern bridge:</strong> Exponential weighting of recent data is exactly how <a href="../../ml-math/#optimizers">Adam’s momentum</a> tracks gradient history.</div>',
  'wma': '<div class="callout bridge"><strong>Pattern bridge:</strong> Weighted averages assign importance by position — the same principle behind <a href="../../ml-math/#attention">attention weights</a> in transformers and <a href="../../timeseries/#exponential-smoothing">weighted means</a> in statistics.</div>',
  'dema': '<div class="callout bridge"><strong>Pattern bridge:</strong> Double smoothing to reduce lag mirrors <a href="../../ml-math/#optimizers">momentum with bias correction</a> in Adam. Both use exponential averaging twice to get closer to the true signal.</div>',
  'vwap': '<div class="callout bridge"><strong>Pattern bridge:</strong> Volume-weighted price is <a href="../../ml-math/#attention">attention</a> over the trading day — each price weighted by how much the market cared. In statistics, it’s a <a href="../../stats/#groupby-aggregation">weighted mean</a>.</div>',
  'rsi': '<div class="callout bridge"><strong>Pattern bridge:</strong> RSI normalizes momentum to [0,100] — a <a href="../../ml-math/#activation">sigmoid-like activation</a> bounding raw gains and losses. In statistics, it’s a ratio of mean gains to mean losses. In Python, <a href="../../stats/#pandas-ta">pandas-ta</a> computes it in one line.</div>',
  'stochastic': '<div class="callout bridge"><strong>Pattern bridge:</strong> Where price sits in its recent range is a <a href="../../stats/#eda-workflow">percentile rank</a>. The smoothed %D line is an <a href="../../ml-math/#optimizers">EMA applied to the oscillator</a> — momentum of momentum.</div>',
  'cci': '<div class="callout bridge"><strong>Pattern bridge:</strong> CCI measures deviation from the mean in units of mean absolute deviation — a <a href="../../stats/#outlier-detection">z-score variant</a>. In ML, <a href="../../ml-math/#batchnorm">batch normalization</a> does the same: center and scale.</div>',
  'williams-r': '<div class="callout bridge"><strong>Pattern bridge:</strong> Williams %R is the stochastic oscillator inverted — same math, different perspective. Like <a href="../../stats/#eda-workflow">percentiles</a> read from top instead of bottom.</div>',
  'roc': '<div class="callout bridge"><strong>Pattern bridge:</strong> Rate of change is the discrete <a href="../../ml-math/#gradient">gradient</a> of price — the slope at each point. In statistics, it’s the <a href="../../timeseries/#differencing">first difference</a> used to make time series stationary.</div>',
  'macd': '<div class="callout bridge"><strong>Pattern bridge:</strong> The difference between two EMAs is a <a href="../../ml-math/#loss">residual</a> — what the fast signal sees that the slow one doesn’t. The same fast-minus-slow construction applied to volume flow is the <a href="#chaikin-oscillator">Chaikin oscillator</a>.</div>',
  'adx': '<div class="callout bridge"><strong>Pattern bridge:</strong> ADX measures trend strength without direction — like <a href="../../markets/indicators/#standard-deviation">standard deviation</a> measuring spread without sign. In ML, <a href="../../ml-math/#pca">PCA eigenvalues</a> measure how much variance each component explains.</div>',
  'parabolic-sar': '<div class="callout bridge"><strong>Pattern bridge:</strong> SAR’s acceleration factor increases with each new extreme — the same <a href="../../ml-math/#optimizers">momentum accumulation</a> used in gradient descent.</div>',
  'ichimoku': '<div class="callout bridge"><strong>Pattern bridge:</strong> Five components forming a cloud is a multi-signal consensus system — like an <a href="../../ml-math/#metrics">ensemble of metrics</a> in ML. The cloud itself is a visual <a href="../../stats/#confidence-intervals">confidence interval</a>.</div>',
  'aroon': '<div class="callout bridge"><strong>Pattern bridge:</strong> Time since highest high vs. lowest low measures where you are in a cycle. The same temporal awareness drives <a href="../../ml-math/#rnn">RNN hidden states</a>.</div>',
  'bollinger-bands': '<div class="callout bridge"><strong>Pattern bridge:</strong> Price mean ± 2σ is a <a href="../../essays/#essay-bell">normal distribution</a> confidence band applied to price. In ML, <a href="../../ml-math/#batchnorm">batch normalization</a> standardizes activations the same way — center, then scale by deviation.</div>',
  'atr': '<div class="callout bridge"><strong>Pattern bridge:</strong> Average True Range measures volatility as mean absolute deviation — a close cousin of <a href="../../markets/indicators/#standard-deviation">standard deviation</a>. In ML, <a href="../../ml-math/#grad-clip">gradient clipping</a> uses a similar magnitude threshold.</div>',
  'keltner-channels': '<div class="callout bridge"><strong>Pattern bridge:</strong> EMA ± ATR multiples blend trend and volatility — like <a href="../../stats/#confidence-intervals">confidence intervals</a> around a moving center.</div>',
  'donchian-channels': '<div class="callout bridge"><strong>Pattern bridge:</strong> Highest high and lowest low over N periods is the <a href="../../stats/#eda-workflow">range (max-min)</a> from descriptive statistics.</div>',
  'standard-deviation': '<div class="callout bridge"><strong>Pattern bridge:</strong> This is <a href="../../stats/#eda-workflow">standard deviation</a> from statistics, applied to price returns. In ML, it’s the denominator in <a href="../../ml-math/#batchnorm">batch normalization</a> and the width of <a href="../../ml-math/#mle">Gaussian distributions</a>.</div>',
  'obv': '<div class="callout bridge"><strong>Pattern bridge:</strong> Cumulative volume adds up conviction — a <a href="../../essays/#essay-walk">cumulative sum</a> (CDF-like) of directional volume. In ML, <a href="../../ml-math/#backprop">backpropagation</a> accumulates gradients through the graph. The <a href="#accumulation-distribution">accumulation/distribution line</a> refines the idea, weighting volume by where the close lands in the day’s range.</div>',
  'accumulation-distribution': '<div class="callout bridge"><strong>Pattern bridge:</strong> A/D line weights volume by where price closes in its range — an <a href="../../ml-math/#attention">attention-weighted</a> running total. Its name comes from Wyckoff’s market phases, covered in <a href="../psychology/#accumulation-distribution">Market Psychology</a>.</div>',
  'mfi': '<div class="callout bridge"><strong>Pattern bridge:</strong> Money Flow Index is <a href="../../markets/indicators/#rsi">RSI</a> weighted by volume — the same normalization to [0,100]. In statistics, weighting by a second variable is a <a href="../../stats/#feature-correlation">covariance-aware</a> approach.</div>',
  'chaikin-oscillator': '<div class="callout bridge"><strong>Pattern bridge:</strong> The difference between fast and slow A/D smoothing is a <a href="../../markets/indicators/#macd">MACD-like divergence</a> applied to volume flow. In ML, <a href="../../ml-math/#optimizers">bias correction in Adam</a> compares fast and slow estimates the same way.</div>',
  'vwap-bands': '<div class="callout bridge"><strong>Pattern bridge:</strong> VWAP ± standard deviation bands combine <a href="../../stats/#groupby-aggregation">weighted mean</a> with <a href="../../markets/indicators/#standard-deviation">dispersion</a>. The same construction as <a href="../../ml-math/#batchnorm">batch norm’s</a> mean-and-variance framing.</div>'
};

const TOPIC_EXTRAS = {
  'rsi': `<div class="howto"><div class="howto-title">How to validate this in practice</div><ol><li>Download OHLCV data and compute RSI using only historical closes.</li><li>Define the trading rule before testing: threshold, hold period, stop, and transaction cost.</li><li>Use walk-forward validation; tune thresholds on one period and test on the next.</li><li>Compare against buy-and-hold and cash baselines.</li><li>Report Sharpe, max drawdown, hit rate, turnover, and cost sensitivity.</li></ol><div class="howto-pitfall"><strong>Common pitfall — indicator worship:</strong> RSI is a deterministic formula, not proof of predictive edge. The trading claim is heuristic until validated out of sample.</div></div><div class="perf-insight"><div class="perf-insight-title">Performance in practice</div><ul><li><strong>RSI(14) overbought/oversold</strong> alone has a ~50% hit rate — no better than a coin flip. The edge comes from <em>divergences</em>: when price makes new highs but RSI doesn't, reversal probability rises to ~65%</li><li>In strong trends, RSI can stay above 70 for weeks. Treating every "overbought" as a sell signal will lose money in trending markets</li><li>Andrew Cardwell's updated RSI framework uses 40-80 in bull markets, 20-60 in bear markets — dynamic zones adapted to regime</li></ul></div><div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> Ranging/sideways markets. Looking for divergences as confirmation. Setting stop-loss levels. Combining with trend filters (only buy oversold in uptrends).</div><div class="skip-when">✗ <strong>Skip when:</strong> Strong trending markets (RSI stays pinned). As a standalone entry signal. Low timeframes with high noise. News-driven moves where momentum is fundamentals-driven.</div></div><div class="dataset-card"><div class="dataset-card-title">Use this pattern on real data</div><a href="../../cases/index.html#market-backtest">Pattern Portal Case: Market Strategy Backtest</a><div class="ds-note">Treat the indicator as a hypothesis. Validate with costs, walk-forward periods, and drawdown metrics.</div></div><div class="dev-export"><div class="dev-export-title">Quick start — copy to notebook</div><pre style="position:relative"><button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">Copy</button><code>pip install yfinance pandas pandas-ta
import yfinance as yf
import pandas_ta as ta

df = yf.download('SPY', start='2018-01-01', auto_adjust=True)
df['RSI_14'] = ta.rsi(df['Close'], length=14)
df['signal'] = (df['RSI_14'] < 30).astype(int).shift(1).fillna(0)
df['strategy'] = df['signal'] * df['Close'].pct_change()
print(df[['Close', 'RSI_14', 'signal', 'strategy']].tail())</code></pre></div>`,
  'macd': `<div class="perf-insight"><div class="perf-insight-title">Performance in practice</div><ul><li>MACD signal line crossovers generate ~60% winning trades in trending markets but ~40% in ranging — the key is filtering with ADX (only trade MACD when ADX > 25)</li><li>MACD histogram divergence is one of the most reliable early warning signals — appearing 1-3 bars before actual reversals</li><li>Default 12/26/9 settings were designed for weekly charts in the 1970s. Many modern traders use 8/17/9 for faster signals on daily charts</li></ul></div><div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> Trending markets with clear directional moves. As a momentum confirmation alongside price action. Histogram divergences for early reversal warnings. Medium-term swing trading.</div><div class="skip-when">✗ <strong>Skip when:</strong> Choppy, range-bound markets (many false signals). Very short timeframes (1-5 min). When you need a leading indicator — MACD is lagging by design. As your sole entry trigger.</div></div>`,
  'bollinger-bands': `<div class="perf-insight"><div class="perf-insight-title">Performance in practice</div><ul><li>The <strong>Bollinger Squeeze</strong> (bandwidth < 6-month low) precedes large moves ~75% of the time — but doesn't tell you which direction</li><li>Mean-reversion trades (buy lower band, sell upper) work well in ranging markets. In trends, price "walks the band" — touching the upper band is confirmation, not a sell signal</li><li>Combining Bollinger with Keltner Channels creates the "TTM Squeeze" — a popular volatility breakout system used by active traders</li></ul></div><div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> Measuring current volatility vs historical norms. Mean-reversion strategies in ranging markets. Identifying squeeze setups before breakouts. Setting dynamic stop-loss levels.</div><div class="skip-when">✗ <strong>Skip when:</strong> As a standalone buy/sell at the bands. During news events (bands widen after the move, not before). When you need directional bias — bands are non-directional.</div></div>`
};

/* depth:start — generated from the scratch scripts ind_snippets.py / ind_depth.py; the worked
   examples are the output of the code shown, run on EXAMPLE_DATA. */
const EXAMPLE_DATA_HTML = "<details class=\"depth-data\"><summary>The example data: 15 days, used in every indicator here</summary><div class=\"depth-table\"><table><thead><tr><th>Day</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th></tr></thead><tbody><tr><td>1</td><td>101</td><td>99</td><td>100</td><td>50,000</td></tr><tr><td>2</td><td>103</td><td>100</td><td>102</td><td>62,000</td></tr><tr><td>3</td><td>103</td><td>100</td><td>101</td><td>48,000</td></tr><tr><td>4</td><td>105</td><td>101</td><td>104</td><td>70,000</td></tr><tr><td>5</td><td>108</td><td>104</td><td>107</td><td>85,000</td></tr><tr><td>6</td><td>108</td><td>105</td><td>106</td><td>60,000</td></tr><tr><td>7</td><td>110</td><td>106</td><td>109</td><td>90,000</td></tr><tr><td>8</td><td>110</td><td>107</td><td>108</td><td>72,000</td></tr><tr><td>9</td><td>108</td><td>104</td><td>105</td><td>80,000</td></tr><tr><td>10</td><td>105</td><td>102</td><td>103</td><td>66,000</td></tr><tr><td>11</td><td>105</td><td>102</td><td>104</td><td>55,000</td></tr><tr><td>12</td><td>104</td><td>101</td><td>102</td><td>75,000</td></tr><tr><td>13</td><td>102</td><td>98</td><td>99</td><td>95,000</td></tr><tr><td>14</td><td>102</td><td>99</td><td>101</td><td>64,000</td></tr><tr><td>15</td><td>105</td><td>101</td><td>104</td><td>71,000</td></tr></tbody></table></div></details>";
const TOPIC_DEPTH = {
 "sma": {
  "example": "Five-day SMA on day 15: the last five closes are 104, 102, 99, 101 and 104, so (104 + 102 + 99 + 101 + 104) / 5 = <strong>102.0</strong>. The average peaked at 107.0 on day 9, two days after the highest close (109 on day 7) — the lag the averaging pays for its smoothness.",
  "fails": [
   "Lag: the average turns only after enough of the window has turned, so crossover signals arrive late and give back part of the move.",
   "Whipsaw in sideways markets: price crosses the average back and forth, and each cross is a losing trade.",
   "An old price leaving the window moves the average as much as a new one entering it, so the line can jump on a day when nothing happened."
  ],
  "code": "df['sma5'] = df['close'].rolling(5).mean()",
  "sources": [
   "W. Brock, J. Lakonishok &amp; B. LeBaron, “Simple Technical Trading Rules and the Stochastic Properties of Stock Returns”, <em>Journal of Finance</em> 47(5), 1992 — moving-average rules on the Dow, 1897–1986",
   "R. Sullivan, A. Timmermann &amp; H. White, “Data-Snooping, Technical Trading Rule Performance, and the Bootstrap”, <em>Journal of Finance</em> 54(5), 1999 — the same rules after correcting for testing many of them; the edge does not hold out of sample"
  ]
 },
 "ema": {
  "example": "Five-day EMA, so k = 2 / (5 + 1) = 1/3. On day 14 the EMA is 101.80; day 15 closes at 104, so EMA = 101.80 + (104 − 101.80) × 1/3 = <strong>102.53</strong>. That is already above the five-day SMA (102.0): today’s close carries a third of the weight.",
  "fails": [
   "It still lags, only less: it reacts faster than the SMA but still turns after the price has.",
   "Faster also means noisier — more crossovers, and more false ones, in a choppy market.",
   "The starting value matters. Seeded from the first close (as here) or from a simple average, the first values differ until the old weight has faded."
  ],
  "code": "df['ema5'] = df['close'].ewm(span=5, adjust=False).mean()   # k = 2/(5+1)",
  "sources": [
   "J. S. Hunter, “The Exponentially Weighted Moving Average”, <em>Journal of Quality Technology</em> 18(4), 1986 — the same smoother in industrial process control",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ]
 },
 "wma": {
  "example": "Weights 1 to 5, newest heaviest. Day 15: (1×104 + 2×102 + 3×99 + 4×101 + 5×104) / 15 = 1529 / 15 = <strong>101.93</strong>. On day 8, at the end of the rally, it led the SMA by 0.67 (107.47 against 106.80): the heavy weights sit on the latest prices.",
  "fails": [
   "The weights drop to zero at the edge of the window, so a price leaving it still makes the line jump a little.",
   "Linear weights are a choice, not a finding — there is no evidence they beat exponential ones. Pick by how quickly you want old data to fade.",
   "Like every average, it confirms a turn rather than predicting it."
  ],
  "code": "w = np.arange(1, 6)                      # weights 1..5, newest heaviest\ndf['wma5'] = df['close'].rolling(5).apply(lambda x: (x * w).sum() / w.sum(), raw=True)",
  "sources": [
   "<em>Trading Systems and Methods</em> (5th ed.), P. J. Kaufman, Wiley, 2013 — the moving-average family compared",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ]
 },
 "dema": {
  "example": "Day 8, the end of the rally: EMA(5) = 106.61 and the EMA of that EMA = 104.69, so DEMA = 2 × 106.61 − 104.69 = <strong>108.53</strong> — about half a point from that day’s close of 108, where the plain EMA is 1.4 behind. On day 13, after the fall, DEMA is 100.61 against a close of 99 and an EMA of 102.20.",
  "fails": [
   "It overshoots: cancelling the lag amplifies the latest moves, so after a sharp bar the line can run past the price.",
   "Less smoothing means more false signals in a range — the noise the plain EMA was absorbing comes back.",
   "The name misleads: it is not an EMA applied twice but a lag-correcting combination of two."
  ],
  "code": "e1 = df['close'].ewm(span=5, adjust=False).mean()\ne2 = e1.ewm(span=5, adjust=False).mean()     # the EMA of the EMA\ndf['dema5'] = 2 * e1 - e2",
  "sources": [
   "P. Mulloy, “Smoothing Data with Faster Moving Averages”, <em>Technical Analysis of Stocks &amp; Commodities</em> 12(1), 1994",
   "W. Brock, J. Lakonishok &amp; B. LeBaron, “Simple Technical Trading Rules and the Stochastic Properties of Stock Returns”, <em>Journal of Finance</em> 47(5), 1992 — moving-average rules on the Dow, 1897–1986"
  ]
 },
 "vwap": {
  "example": "Each day’s typical price (high + low + close) / 3, weighted by its volume, from day 1. Over the 15 days 1,043,000 shares traded with a typical-price value of 108,266,700, so VWAP = 108,266,700 / 1,043,000 = <strong>103.80</strong>; day 15 closes just above it, at 104. Day 13’s heavy volume (95,000 shares near 99.67) pulled VWAP down more than any day before it. On real intraday data VWAP restarts every session; here the 15 days stand in for 15 bars.",
  "fails": [
   "It is a benchmark, not a forecast. Trading desks use it to judge execution; its pull as support or resistance is a heuristic.",
   "It goes stale through the day: late in the session it barely moves, because so much volume is already behind it.",
   "It assumes each bar traded at its typical price; on wide-range bars that can be far from where the volume actually went through."
  ],
  "code": "tp = (df['high'] + df['low'] + df['close']) / 3\ndf['vwap'] = (tp * df['volume']).cumsum() / df['volume'].cumsum()\n# intraday: group by session date and take the cumulative sums per day",
  "sources": [
   "S. Berkowitz, D. Logue &amp; E. Noser, “The Total Cost of Transactions on the NYSE”, <em>Journal of Finance</em> 43(1), 1988 — VWAP as an execution benchmark",
   "R. Kissell, <em>The Science of Algorithmic Trading and Portfolio Management</em>, Academic Press, 2013 — VWAP execution in practice"
  ]
 },
 "rsi": {
  "example": "Five-day RSI with Wilder’s smoothing (seeded here from the first change; the textbook seeds with a simple average, which only changes the first values). After the run-up it read <strong>94.3</strong> on day 5 — “overbought” — yet the price kept rising to 109 on day 7. On day 13, after four down days in five, it reached <strong>29.9</strong>, below 30; by day 15 the close had climbed from 99 to 104.",
  "fails": [
   "Overbought is not a sell signal in a trend: in a strong rise RSI can stay above 70 for weeks while the price keeps climbing.",
   "The 70 and 30 lines are convention, not calibration; the useful levels depend on the asset and the period.",
   "Divergences (a new price high without a new RSI high) look clear in hindsight; in real time they are frequent, and most do not lead to a reversal."
  ],
  "code": "d = df['close'].diff()\ngain = d.clip(lower=0).ewm(alpha=1/5, adjust=False).mean()    # Wilder smoothing\nloss = (-d.clip(upper=0)).ewm(alpha=1/5, adjust=False).mean()\ndf['rsi5'] = 100 - 100 / (1 + gain / loss)",
  "sources": [
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder, Trend Research, 1978",
   "C.-H. Park &amp; S. H. Irwin, “What Do We Know About the Profitability of Technical Analysis?”, <em>Journal of Economic Surveys</em> 21(4), 2007 — a review of the evidence across studies"
  ]
 },
 "stochastic": {
  "example": "Day 15, five-day window: lowest low 98 (day 13), highest high 105, close 104. %K = 100 × (104 − 98) / (105 − 98) = <strong>85.7</strong> — after the rebound the close sits near the top of its range. %D, the three-day average of %K, is only 46.2, because days 13 and 14 were low (10.0 and 42.9).",
  "fails": [
   "In a strong trend %K stays near 100 (or 0) for long stretches, so overbought and oversold readings fight the trend.",
   "A narrow range makes it jumpy: when the window’s high and low are close, a small move swings %K across the whole scale.",
   "%K and %D cross often; without a trend filter most crossings are noise."
  ],
  "code": "ll = df['low'].rolling(5).min()\nhh = df['high'].rolling(5).max()\ndf['k'] = 100 * (df['close'] - ll) / (hh - ll)\ndf['d'] = df['k'].rolling(3).mean()",
  "sources": [
   "G. C. Lane, “Lane’s Stochastics”, <em>Technical Analysis of Stocks &amp; Commodities</em> 2(3), 1984",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ]
 },
 "cci": {
  "example": "Day 15: the typical prices of days 11–15 are 103.67, 102.33, 99.67, 100.67 and 103.33. Their mean is 101.93 and their mean absolute deviation 1.41, so CCI = (103.33 − 101.93) / (0.015 × 1.41) = <strong>66</strong>. Two days earlier, at the low, it read <strong>−141</strong>, below Lambert’s −100 line. The 0.015 was chosen so that most readings land between −100 and +100.",
  "fails": [
   "It has no bound: readings of ±200 or ±300 happen in strong moves, and fading them means fading a trend.",
   "The mean deviation shrinks in quiet periods, so a modest move after a calm stretch gives an extreme reading.",
   "Lambert built it to catch cycles in commodities; where there is no regular cycle the ±100 lines have no special meaning."
  ],
  "code": "tp = (df['high'] + df['low'] + df['close']) / 3\nma = tp.rolling(5).mean()\nmd = tp.rolling(5).apply(lambda x: np.abs(x - x.mean()).mean(), raw=True)\ndf['cci5'] = (tp - ma) / (0.015 * md)",
  "sources": [
   "D. R. Lambert, “Commodity Channel Index: Tools for Trading Cyclic Trends”, <em>Commodities</em> magazine, 1980",
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000",
   "C.-H. Park &amp; S. H. Irwin, “What Do We Know About the Profitability of Technical Analysis?”, <em>Journal of Economic Surveys</em> 21(4), 2007 — a review of the evidence across studies"
  ]
 },
 "williams-r": {
  "example": "Day 15: highest high 105, lowest low 98, close 104, so %R = −100 × (105 − 104) / (105 − 98) = <strong>−14.3</strong>, inside the “overbought” zone above −20. It is the stochastic’s %K seen from the top: 85.7 − 100 = −14.3.",
  "fails": [
   "It shares the stochastic’s weakness: it stays at an extreme for as long as a trend lasts.",
   "Unsmoothed, it is the noisiest of the range oscillators — one wide bar can move it across the scale.",
   "The negative scale carries no information beyond %K; it mostly causes confusion."
  ],
  "code": "hh = df['high'].rolling(5).max()\nll = df['low'].rolling(5).min()\ndf['wr5'] = -100 * (hh - df['close']) / (hh - ll)",
  "sources": [
   "L. Williams, <em>How I Made One Million Dollars Last Year Trading Commodities</em>, Windsor Books, 1973",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ]
 },
 "roc": {
  "example": "Five-day ROC on day 13: the close of 99 against 108 five days earlier (day 8) gives 100 × (99 / 108 − 1) = <strong>−8.3%</strong>. On day 15 it is +0.97% (104 against 103 on day 10): the fall has stopped, not reversed.",
  "fails": [
   "It rests on a single price N bars back, so one unusual day enters the reading and later drops out of it.",
   "Zero-line crossings come late in a reversal and often in a range.",
   "Percent changes are not comparable across volatility: −8% means something different for a utility than for a crypto asset."
  ],
  "code": "df['roc5'] = 100 * (df['close'] / df['close'].shift(5) - 1)",
  "sources": [
   "N. Jegadeesh &amp; S. Titman, “Returns to Buying Winners and Selling Losers”, <em>Journal of Finance</em> 48(1), 1993 — momentum measured as past returns",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999"
  ]
 },
 "macd": {
  "example": "With fast 3, slow 6 and signal 3 (the standard 12/26/9 needs more than 15 days). MACD peaked at <strong>1.77</strong> on day 7 with the rally. The histogram turned negative on day 8 (−0.03), the first down day after the peak, and back to positive on day 15 (+0.44), one day into the rebound.",
  "fails": [
   "Both lines come from lagging averages, so crossovers confirm turns rather than anticipate them.",
   "In a sideways market MACD hovers around zero and produces a crossover every few bars.",
   "Values are in price units, so readings cannot be compared across assets, or across very different price levels, without scaling."
  ],
  "code": "fast = df['close'].ewm(span=3, adjust=False).mean()\nslow = df['close'].ewm(span=6, adjust=False).mean()\ndf['macd'] = fast - slow\ndf['signal'] = df['macd'].ewm(span=3, adjust=False).mean()\ndf['hist'] = df['macd'] - df['signal']",
  "sources": [
   "G. Appel, <em>Technical Analysis: Power Tools for Active Investors</em>, FT Prentice Hall, 2005",
   "C.-H. Park &amp; S. H. Irwin, “What Do We Know About the Profitability of Technical Analysis?”, <em>Journal of Economic Surveys</em> 21(4), 2007 — a review of the evidence across studies"
  ]
 },
 "adx": {
  "example": "Five-day ADX with Wilder’s smoothing. Through the rally there are no down-moves, so −DI is 0 and ADX is pinned at 100 — a start-up effect of such a short series. By day 13 −DI (36.4) is far above +DI (8.8): a downtrend, with ADX at 56. On day 15 the two cross (+DI 23.1, −DI 22.7) while ADX is still <strong>46</strong>: it reports how strong the move was, and is slow to notice that it has ended.",
  "fails": [
   "It says nothing about direction: a high ADX fits a crash as well as a rally.",
   "It lags badly, rising after a trend has peaked and staying high into the reversal.",
   "The 25 line for “trending” comes from Wilder’s commodity work; it is a convention, not a calibrated level."
  ],
  "code": "up, down = df['high'].diff(), -df['low'].diff()\nplus_dm = np.where((up &gt; down) &amp; (up &gt; 0), up, 0.0)\nminus_dm = np.where((down &gt; up) &amp; (down &gt; 0), down, 0.0)\npc = df['close'].shift()\ntr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)\nw = lambda s: pd.Series(s, index=df.index).ewm(alpha=1/5, adjust=False).mean()   # Wilder\natr = w(tr)\ndf['+di'] = 100 * w(plus_dm) / atr\ndf['-di'] = 100 * w(minus_dm) / atr\ndx = 100 * (df['+di'] - df['-di']).abs() / (df['+di'] + df['-di'])\ndf['adx5'] = w(dx)",
  "sources": [
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder, Trend Research, 1978",
   "<em>Technical Analysis of the Financial Markets</em>, J. J. Murphy, New York Institute of Finance, 1999",
   "C.-H. Park &amp; S. H. Irwin, “What Do We Know About the Profitability of Technical Analysis?”, <em>Journal of Economic Surveys</em> 21(4), 2007 — a review of the evidence across studies"
  ]
 },
 "parabolic-sar": {
  "example": "The acceleration factor starts at 0.02 and rises by 0.02 with each new high, up to 0.20. During the rally the SAR climbs from 99 to <strong>102.56</strong> by day 9. On day 10 the low of 102 breaks below it: the position flips short and the SAR jumps to the rally’s extreme, <strong>110</strong>, then trails down to 108.02 by day 15.",
  "fails": [
   "It is always in the market, long or short, so in a range it flips back and forth and loses on each flip.",
   "Late in a long trend the acceleration factor is at its cap and the stop hugs the price; an ordinary pullback stops you out.",
   "At a flip the stop jumps to the last extreme, which can be far from the price just after a reversal."
  ],
  "code": "af0, step, af_max = 0.02, 0.02, 0.20\nhigh, low = df['high'].values, df['low'].values\nsar = np.zeros(len(df)); up = True; af = af0\nep, sar[0] = high[0], low[0]\nfor i in range(1, len(df)):\n    sar[i] = sar[i-1] + af * (ep - sar[i-1])\n    if up:\n        sar[i] = min(sar[i], low[i-1], low[max(i-2, 0)])   # never above the last two lows\n        if low[i] &lt; sar[i]:                                 # stop hit: flip short\n            up, sar[i], ep, af = False, ep, low[i], af0\n        elif high[i] &gt; ep:\n            ep, af = high[i], min(af + step, af_max)\n    else:\n        sar[i] = max(sar[i], high[i-1], high[max(i-2, 0)])\n        if high[i] &gt; sar[i]:                                # stop hit: flip long\n            up, sar[i], ep, af = True, ep, high[i], af0\n        elif low[i] &lt; ep:\n            ep, af = low[i], min(af + step, af_max)\ndf['sar'] = sar",
  "sources": [
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder, Trend Research, 1978",
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000",
   "C.-H. Park &amp; S. H. Irwin, “What Do We Know About the Profitability of Technical Analysis?”, <em>Journal of Economic Surveys</em> 21(4), 2007 — a review of the evidence across studies"
  ]
 },
 "ichimoku": {
  "example": "With periods 3, 6 and 12 instead of the standard 9, 26 and 52. On day 15 the conversion line (3-day midpoint) and the base line (6-day midpoint) are both <strong>101.5</strong>, below leading span A (106.25), which was projected from six days earlier. The close of 104 sits below that edge of the cloud. Span B needs 12 + 6 = 18 days, more than the example has: the long look-back is part of the method.",
  "fails": [
   "The standard periods (9, 26, 52) date from a six-day trading week in Japan; on today’s calendar they are convention.",
   "Five lines and a cloud invite reading something into every configuration; more signals mean more chances to find one after the fact.",
   "The cloud is shifted forward, but it is drawn from past prices: it shows old support and resistance, not a forecast."
  ],
  "code": "mid = lambda n: (df['high'].rolling(n).max() + df['low'].rolling(n).min()) / 2\ndf['tenkan'] = mid(3)                     # 9 in the standard settings\ndf['kijun'] = mid(6)                      # 26\ndf['span_a'] = ((df['tenkan'] + df['kijun']) / 2).shift(6)\ndf['span_b'] = mid(12).shift(6)           # 52, shifted 26 ahead",
  "sources": [
   "G. Hosoda (“Ichimoku Sanjin”), <em>Ichimoku Kinko Hyo</em>, published in Japanese from 1969",
   "M. Patel, <em>Trading with Ichimoku Clouds</em>, Wiley, 2010"
  ]
 },
 "aroon": {
  "example": "Five-period Aroon looks back over six bars. On day 7 the high of 110 is today, so Aroon Up = <strong>100</strong>; it stays there on day 8 (another 110), then loses 20 points a bar as that high ages, reaching 0 on day 13. The new lows of days 10–13 keep Aroon Down at 100 through the fall. On day 15 the high of 105 equals day 11’s and is today, so Aroon Up jumps back to 100 while Aroon Down is still 60: both high at once means no clear trend.",
  "fails": [
   "It only knows when the extremes happened, not how far price moved, so a tiny new high counts as fully as a large one.",
   "Ties and short windows make it jumpy: one bar can swing a line from 0 to 100.",
   "Crossovers of the two lines lag the turn by roughly the look-back period."
  ],
  "code": "last = lambda f: (lambda x: len(x) - 1 - f(x[::-1]))     # position of the latest extreme\npos_hi = df['high'].rolling(6).apply(last(np.argmax), raw=True)   # 0 = oldest of 6 bars, 5 = today\npos_lo = df['low'].rolling(6).apply(last(np.argmin), raw=True)\ndf['aroon_up'] = 100 * pos_hi / 5           # 100 = the high is today\ndf['aroon_down'] = 100 * pos_lo / 5",
  "sources": [
   "T. Chande introduced Aroon in <em>Technical Analysis of Stocks &amp; Commodities</em>, 1995",
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000"
  ]
 },
 "bollinger-bands": {
  "example": "The standard 20-day bands need 20 days, so this uses 5. On day 15 the last five closes average 102.0 with a standard deviation of 1.90, so the bands are 102.0 ± 3.79: <strong>98.21 to 105.79</strong>. They were widest on day 7 (110.86 − 99.94 = 10.92), when the rally was fastest. On day 13 the close of 99 sat just above the lower band (98.48).",
  "fails": [
   "A touch of a band is not a signal on its own: in a trend the price “walks the band” for weeks.",
   "Two standard deviations would hold about 95% of closes only if they were normal and independent; prices are neither, so breaks are more frequent than that.",
   "A squeeze (narrow bands) says volatility is low and a move may follow — not which way."
  ],
  "code": "mid = df['close'].rolling(5).mean()\nsd = df['close'].rolling(5).std(ddof=0)       # population SD, as Bollinger uses\ndf['bb_up'], df['bb_mid'], df['bb_lo'] = mid + 2 * sd, mid, mid - 2 * sd",
  "sources": [
   "J. Bollinger, <em>Bollinger on Bollinger Bands</em>, McGraw-Hill, 2001",
   "J. Lento, N. Gradojevic &amp; C. Wright, “Investment information content in Bollinger Bands?”, <em>Applied Financial Economics Letters</em> 3(4), 2007"
  ]
 },
 "atr": {
  "example": "True range looks at yesterday’s close as well as today’s high and low, so gaps count. Day 13: high 102, low 98, previous close 102, so TR = max(4, 0, 4) = 4. Five-day ATR with Wilder’s smoothing is <strong>3.41</strong> on day 15: the typical bar is about 3.4 points, 3.3% of the price.",
  "fails": [
   "It measures size, not direction; a high ATR comes with rallies and crashes alike.",
   "It is in price units. Compare it as a percentage of price across assets or long periods.",
   "Wilder’s smoothing is slow: after a shock ATR takes several bars to reflect the new volatility, and as long to forget it."
  ],
  "code": "pc = df['close'].shift()\ntr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)\ndf['atr5'] = tr.ewm(alpha=1/5, adjust=False).mean()   # Wilder smoothing",
  "sources": [
   "<em>New Concepts in Technical Trading Systems</em>, J. W. Wilder, Trend Research, 1978",
   "C. Faith, <em>Way of the Turtle</em>, McGraw-Hill, 2007 — ATR (“N”) for stops and position size"
  ]
 },
 "keltner-channels": {
  "example": "Middle line EMA(5), bands two ATR(5) away. Day 15: 102.53 ± 2 × 3.41, so <strong>95.72 to 109.35</strong>. On the same day Bollinger’s bands are 98.21 to 105.79: the ATR bands are wider, and moved less on day 13’s drop (lower band 95.55, against Bollinger’s 98.48).",
  "fails": [
   "Band breaks are rarer than with Bollinger: fewer signals, and later ones.",
   "Band width comes from ATR, so one gap day widens the channel for several bars.",
   "Settings vary (an EMA of 20 with 2 × ATR of 10 is common; Keltner’s original used a 10-day average of the daily range), and results depend on which you pick."
  ],
  "code": "pc = df['close'].shift()\ntr = pd.concat([df['high'] - df['low'], (df['high'] - pc).abs(), (df['low'] - pc).abs()], axis=1).max(axis=1)\natr = tr.ewm(alpha=1/5, adjust=False).mean()\nmid = df['close'].ewm(span=5, adjust=False).mean()\ndf['kc_up'], df['kc_mid'], df['kc_lo'] = mid + 2 * atr, mid, mid - 2 * atr",
  "sources": [
   "C. W. Keltner, <em>How to Make Money in Commodities</em>, Keltner Statistical Service, 1960",
   "<em>Trading Systems and Methods</em> (5th ed.), P. J. Kaufman, Wiley, 2013"
  ]
 },
 "donchian-channels": {
  "example": "Five-day channel. On day 7 the close of 109 tops the previous five days’ highest high of 108: a <strong>breakout</strong>. On day 15 the channel runs from 98 to 105, and the close of 104 sits just inside the top.",
  "fails": [
   "Most breakouts in a range fail. The system lives on a few long trends and loses small amounts often in between.",
   "Exits are slow: when a trend ends, the opposite edge of the channel can be far away.",
   "The look-back is the whole strategy — 20 days and 55 days give very different trades — and tuning it on history overfits."
  ],
  "code": "df['dc_up'] = df['high'].rolling(5).max()\ndf['dc_lo'] = df['low'].rolling(5).min()\ndf['dc_mid'] = (df['dc_up'] + df['dc_lo']) / 2\ndf['breakout'] = df['close'] &gt; df['dc_up'].shift()   # close above the prior range",
  "sources": [
   "C. Faith, <em>Way of the Turtle</em>, McGraw-Hill, 2007 — the Turtle traders’ Donchian breakout rules",
   "<em>Trading Systems and Methods</em> (5th ed.), P. J. Kaufman, Wiley, 2013"
  ]
 },
 "standard-deviation": {
  "example": "Day 15: the last five closes (104, 102, 99, 101, 104) average 102.0. The deviations are 2, 0, −3, −1 and 2; squared, 4, 0, 9, 1 and 4; their mean is 3.6, and its square root <strong>1.90</strong>. Measured on daily returns instead of prices it is about 2.6% a day — returns are what risk models use.",
  "fails": [
   "It treats moves up and down alike, so a sharp rally counts as “risk” the same as a fall.",
   "It assumes the spread is stable. Volatility clusters, so after a calm spell yesterday’s figure understates tomorrow’s.",
   "Returns have fat tails: extreme days come far more often than a bell curve with this standard deviation predicts."
  ],
  "code": "df['sd5'] = df['close'].rolling(5).std(ddof=0)\ndf['ret_sd5'] = df['close'].pct_change().rolling(5).std()   # the same idea on returns",
  "sources": [
   "B. Mandelbrot, “The Variation of Certain Speculative Prices”, <em>Journal of Business</em> 36(4), 1963 — fat tails in prices",
   "J. C. Hull, <em>Options, Futures, and Other Derivatives</em>, Pearson — estimating volatility from returns"
  ]
 },
 "obv": {
  "example": "Add the day’s volume on an up close, subtract it on a down close. Days 13–15 add −95,000, +64,000 and +71,000, taking OBV from −39,000 to <strong>+1,000</strong>. Days 11 and 15 both close at 104, but OBV was 36,000 then and 1,000 now: the same price, with less volume behind the way back.",
  "fails": [
   "A day’s whole volume is counted as buying or selling from the sign of the close, so a day up one cent counts as much as a day up 5%.",
   "The level is arbitrary — it depends on where you start counting. Only its direction and divergences carry information.",
   "Divergences between OBV and price are common, and most resolve without a reversal."
  ],
  "code": "direction = np.sign(df['close'].diff()).fillna(0)\ndf['obv'] = (direction * df['volume']).cumsum()",
  "sources": [
   "J. Granville, <em>Granville’s New Key to Stock Market Profits</em>, Prentice-Hall, 1963",
   "L. Blume, D. Easley &amp; M. O’Hara, “Market Statistics and Technical Analysis: The Role of Volume”, <em>Journal of Finance</em> 49(1), 1994 — why volume can carry information"
  ]
 },
 "accumulation-distribution": {
  "example": "The close location value says where the close sits in the day’s range: +1 at the high, −1 at the low. Day 15: high 105, low 101, close 104, so CLV = ((104 − 101) − (105 − 104)) / 4 = 0.5, and 0.5 × 71,000 shares = +35,500. A/D ends at <strong>23,833</strong>, against OBV’s 1,000: it credits the closes near the highs of days 14 and 15 more than the falls before them.",
  "fails": [
   "It ignores gaps: a stock that gaps down 5% and closes at the day’s high counts as accumulation.",
   "Like OBV, its level depends on the start date; only the direction means anything.",
   "On a day when the high equals the low, CLV is 0 / 0 and has to be set to zero by convention."
  ],
  "code": "clv = ((df['close'] - df['low']) - (df['high'] - df['close'])) / (df['high'] - df['low'])\ndf['ad'] = (clv * df['volume']).cumsum()",
  "sources": [
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000 — Chaikin’s accumulation/distribution line",
   "L. Blume, D. Easley &amp; M. O’Hara, “Market Statistics and Technical Analysis: The Role of Volume”, <em>Journal of Finance</em> 49(1), 1994 — why volume can carry information"
  ]
 },
 "mfi": {
  "example": "Money flow is typical price × volume, counted as positive on days the typical price rose and negative when it fell. Over days 11–15 the falls (days 12 and 13) slightly outweigh the rises (days 11, 14 and 15) in volume, and MFI = <strong>53.2</strong>. Two days earlier, at the low, it read 15.0, below the 20 line for “oversold”.",
  "fails": [
   "Volume spikes dominate it: one heavy day can move it more than a week of price changes.",
   "Like RSI, it can stay “overbought” for as long as a trend lasts.",
   "The split into positive and negative ignores how far the price moved; a tiny rise on huge volume counts as heavy buying."
  ],
  "code": "tp = (df['high'] + df['low'] + df['close']) / 3\nflow = tp * df['volume']\npos = flow.where(tp &gt; tp.shift(), 0).rolling(5).sum()\nneg = flow.where(tp &lt; tp.shift(), 0).rolling(5).sum()\ndf['mfi5'] = 100 - 100 / (1 + pos / neg)",
  "sources": [
   "G. Quong &amp; A. Soudack, “Volume-Weighted RSI: Money Flow”, <em>Technical Analysis of Stocks &amp; Commodities</em> 7(3), 1989",
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000"
  ]
 },
 "chaikin-oscillator": {
  "example": "EMA(3) minus EMA(10) of the accumulation/distribution line — MACD’s idea applied to volume flow. It peaked at <strong>+37,902</strong> on day 7 with the rally, turned negative on day 10, and on day 15 is still −11,315 but rising: money flow has turned up before the oscillator has crossed zero.",
  "fails": [
   "It is a difference of two averages of a running total, so noise in the A/D line is amplified.",
   "It is measured in shares, so readings cannot be compared across stocks with different volume.",
   "It inherits the A/D line’s blindness to gaps."
  ],
  "code": "clv = ((df['close'] - df['low']) - (df['high'] - df['close'])) / (df['high'] - df['low'])\nad = (clv * df['volume']).cumsum()\ndf['chaikin'] = ad.ewm(span=3, adjust=False).mean() - ad.ewm(span=10, adjust=False).mean()",
  "sources": [
   "<em>Technical Analysis from A to Z</em> (2nd ed.), S. B. Achelis, McGraw-Hill, 2000",
   "L. Blume, D. Easley &amp; M. O’Hara, “Market Statistics and Technical Analysis: The Role of Volume”, <em>Journal of Finance</em> 49(1), 1994 — why volume can carry information"
  ]
 },
 "vwap-bands": {
  "example": "Bands two volume-weighted standard deviations of the typical price either side of VWAP. Day 15: VWAP 103.80, bands <strong>98.64 to 108.97</strong>. On day 13 the low of 98 dipped below the lower band (98.80), on the heaviest volume of the period.",
  "fails": [
   "The “68% within one band, 95% within two” rule assumes a bell curve; intraday prices rarely follow one.",
   "Early in a session there is too little volume behind the bands, and they swing widely in the first bars.",
   "Like VWAP itself, they are a reference for execution and context, not a signal with a tested edge."
  ],
  "code": "tp = (df['high'] + df['low'] + df['close']) / 3\nv = df['volume']\nvwap = (tp * v).cumsum() / v.cumsum()\nsd = np.sqrt((v * (tp - vwap) ** 2).cumsum() / v.cumsum())   # volume-weighted SD\ndf['vwap'], df['vb_up'], df['vb_lo'] = vwap, vwap + 2 * sd, vwap - 2 * sd",
  "sources": [
   "S. Berkowitz, D. Logue &amp; E. Noser, “The Total Cost of Transactions on the NYSE”, <em>Journal of Finance</em> 43(1), 1988 — VWAP as an execution benchmark",
   "The bands are a practitioner construction; there is no canonical paper for them."
  ]
 }
};
/* depth:end */

/* The content standard's depth for a topic: a worked example on the shared
   15-day data, where the indicator misleads, the pandas that computes it,
   and sources. Empty for a topic without an entry. */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, dataHtml: EXAMPLE_DATA_HTML,
    codeNote: 'Assumes <code>import numpy as np</code>, <code>import pandas as pd</code>, and a DataFrame <code>df</code> with columns high, low, close and volume — the 15 days above.' });
}

/* Canvas visualizations carry no text of their own, so each one is given an
   accessible name built from its topic. Titles can contain characters that
   would break out of the attribute, hence the escape. */
function ariaAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  let html = buildHome();
  TOPIC_DATA.forEach(t => {
    html += `<div class="topic" id="${t.id}">`;
    html += `<div class="topic-header"><div class="topic-meta"><div class="topic-num">${t.num} — ${t.category}</div><h2>${t.title}</h2></div><span class="evidence-badge proven" title="Mathematically defined formula — interpretation as trading signal is heuristic">✓ Mathematical</span></div>`;
    // The pattern line: a topic's own, cross-collection insight when it has one;
    // otherwise the first sentence of its content (which for a formula-led topic
    // was the formula, cut at its first decimal point).
    html += `<p class="sub">// ${t.pattern || t.content.split('.')[0] + '.'}</p>`;
    html += `<div class="va"><canvas id="${t.id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}Canvas" role="img" aria-label="${ariaAttr(t.title)} \u2014 visualization"></canvas></div>`;
    html += `<div class="topic-body">${builders[t.id] ? builders[t.id]() : `<p>${t.content}</p>`}</div>`;
    html += depthHtml(t.id);
    if (PATTERN_BRIDGES[t.id]) html += PATTERN_BRIDGES[t.id];
    if (TOPIC_EXTRAS[t.id]) html += TOPIC_EXTRAS[t.id];
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
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-moving-avg','sma')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M6.5 16c4.5 0 6-8 11.5-9"/></svg></div>
      <div class="cat-card-name">Moving Averages</div>
      <div class="cat-card-count">5 topics · SMA, EMA, WMA, DEMA, VWAP</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-oscillators','rsi')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12c2.5 0 2.5-5 5-5s2.5 8 5 8 2.5-6 5-6 3 3 3 3"/></svg></div>
      <div class="cat-card-name">Oscillators</div>
      <div class="cat-card-count">5 topics · RSI, Stochastic, CCI, Williams, ROC</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-trend','macd')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 18 9 12.5 13 15 20 6.5"/></svg></div>
      <div class="cat-card-name">Trend & Momentum</div>
      <div class="cat-card-count">5 topics · MACD, ADX, SAR, Ichimoku, Aroon</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-volatility','bollinger-bands')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 18 6.5 12 9.5 15 12 6 14.5 15 17.5 12 21 18"/></svg></div>
      <div class="cat-card-name">Volatility</div>
      <div class="cat-card-count">5 topics · Bollinger, ATR, Keltner, Donchian, StdDev</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-volume','obv')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="5"/><line x1="18" y1="20" x2="18" y2="15"/></svg></div>
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
