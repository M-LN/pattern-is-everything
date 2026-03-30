/* ═══════════════════════════════════════════════════════════════
   Stats Lab — Activities Data & Content Builder
   Interactive statistics sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-stats-lab', title:'Stats Lab', topics:['distribution-explorer','hypothesis-testing','correlation-playground','central-limit-theorem'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'distribution-explorer':    'Distribution Explorer',
  'hypothesis-testing':       'Hypothesis Testing',
  'correlation-playground':   'Correlation Playground',
  'central-limit-theorem':    'Central Limit Theorem',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'distribution-explorer', num:'01', title:'Distribution Explorer', category:'Stats Lab', keywords:['normal','uniform','exponential','poisson','distribution','probability','histogram','PDF','CDF','mean','variance','standard deviation','bell curve','skew'], content:'Explore different probability distributions — adjust parameters and see how the shape, mean, and variance change in real-time.' },
  { id:'hypothesis-testing', num:'02', title:'Hypothesis Testing', category:'Stats Lab', keywords:['hypothesis','p-value','significance','null','alternative','type I','type II','alpha','beta','power','t-test','z-test','rejection region'], content:'Simulate hypothesis tests — see how sample size, effect size, and significance level affect p-values and error rates.' },
  { id:'correlation-playground', num:'03', title:'Correlation Playground', category:'Stats Lab', keywords:['correlation','scatter plot','r-value','Pearson','regression','linear','relationship','positive','negative','outlier'], content:'Place points on a scatter plot and watch the correlation coefficient update live. Discover how outliers and patterns affect r.' },
  { id:'central-limit-theorem', num:'04', title:'Central Limit Theorem', category:'Stats Lab', keywords:['CLT','central limit','sampling','sample mean','normal approximation','population','sample size','distribution of means'], content:'Draw samples from any population shape and watch the distribution of sample means converge to a normal distribution.' },
];

/* ── Hints system ── */
const HINTS = {
  'distribution-explorer': [
    { id:'de-normal',       trigger:'distNormal',       message:'The normal distribution (bell curve) is defined by its mean μ and standard deviation σ.' },
    { id:'de-uniform',      trigger:'distUniform',      message:'The uniform distribution gives equal probability to all values in the range.' },
    { id:'de-exp',          trigger:'distExponential',   message:'The exponential distribution models wait times — it has a long right tail.' },
    { id:'de-high-sd',      trigger:'sdHigh',           message:'A larger standard deviation spreads the distribution wider — more uncertainty.' },
    { id:'de-cdf',          trigger:'showCDF',          message:'The CDF shows the probability of getting a value ≤ x. It always goes from 0 to 1.' },
  ],
  'hypothesis-testing': [
    { id:'ht-low-p',        trigger:'pLow',             message:'A low p-value (< α) means the data is unlikely under H₀ — we reject the null hypothesis.' },
    { id:'ht-high-p',       trigger:'pHigh',            message:'A high p-value means we don\'t have enough evidence to reject H₀. This is NOT proof that H₀ is true.' },
    { id:'ht-small-n',      trigger:'nSmall',           message:'With a small sample size, random variation is large — harder to detect a real effect.' },
    { id:'ht-type1',        trigger:'type1Risk',        message:'Type I error: rejecting H₀ when it\'s actually true. The rate equals α (significance level).' },
    { id:'ht-power',        trigger:'highPower',        message:'High power means you\'re unlikely to miss a real effect. Increase n or effect size to boost power.' },
  ],
  'correlation-playground': [
    { id:'cp-first',        trigger:'pointCount>=3',    message:'Add more points to get a reliable correlation estimate. With few points, r is unstable.' },
    { id:'cp-strong',       trigger:'rStrong',          message:'|r| close to 1 means a strong linear relationship — but not necessarily causation!' },
    { id:'cp-weak',         trigger:'rWeak',            message:'|r| close to 0 means no linear relationship — but there could be a nonlinear one.' },
    { id:'cp-outlier',      trigger:'hasOutlier',       message:'A single outlier can dramatically change the correlation. Try removing it to see the effect.' },
    { id:'cp-negative',     trigger:'rNegative',        message:'Negative r means as one variable increases, the other tends to decrease.' },
  ],
  'central-limit-theorem': [
    { id:'clt-first',       trigger:'sampleCount>=5',   message:'Keep drawing samples! The magic of CLT appears as sample count grows.' },
    { id:'clt-small-n',     trigger:'sampleSizeSmall',  message:'With a small sample size (n), the sampling distribution may still look like the population.' },
    { id:'clt-big-n',       trigger:'sampleSizeBig',    message:'With n ≥ 30, the sampling distribution is nearly normal — regardless of the population shape!' },
    { id:'clt-converged',   trigger:'looksNormal',      message:'The sampling distribution is becoming bell-shaped — that\'s the Central Limit Theorem in action!' },
    { id:'clt-sem',         trigger:'showSEM',          message:'Standard Error = σ/√n. Larger samples → smaller standard error → tighter distribution of means.' },
  ],
};

/* ── Challenges ── */
const CHALLENGES = {
  'distribution-explorer': [
    { id:'de-c1', title:'Shape Shifter',     objective:'View all 4 distribution types',                    checkFn:'seenAll' },
    { id:'de-c2', title:'Tight Fit',         objective:'Create a normal distribution with σ < 0.5',        checkFn:'tightNormal' },
  ],
  'hypothesis-testing': [
    { id:'ht-c1', title:'Significant!',      objective:'Get a p-value below 0.05',                         checkFn:'pBelow05' },
    { id:'ht-c2', title:'Power Up',          objective:'Achieve 90%+ power with n ≤ 50',                   checkFn:'highPowerSmallN' },
  ],
  'correlation-playground': [
    { id:'cp-c1', title:'Perfect Line',      objective:'Create a near-perfect correlation (|r| > 0.95)',    checkFn:'nearPerfect' },
    { id:'cp-c2', title:'Zero Zone',         objective:'Place 10+ points with |r| < 0.1',                  checkFn:'zeroCorrelation' },
  ],
  'central-limit-theorem': [
    { id:'clt-c1', title:'Bell Builder',     objective:'Make the sampling distribution look normal (50+ samples)', checkFn:'bellShaped' },
    { id:'clt-c2', title:'Precision Machine', objective:'Get standard error below 1.0 with n ≥ 30',        checkFn:'lowSE' },
  ],
};


/* ═══════════════════════════════════════════════════════════════
   BUILD CONTENT — generates sidebar + main HTML for all activities
   ═══════════════════════════════════════════════════════════════ */

function buildContent() {
  const nav = document.getElementById('mainNav');
  const main = document.getElementById('mainContent');

  SECTIONS.forEach(sec => {
    const g = document.createElement('div');
    g.className = 'nav-group';
    g.innerHTML = `<div class="nav-group-title">${sec.title}</div>`;
    sec.topics.forEach(t => {
      const ni = document.createElement('div');
      ni.className = 'ni';
      ni.dataset.topic = t;
      ni.innerHTML = `<span class="ni-num">${TOPIC_DATA.find(d=>d.id===t).num}</span> ${TOPIC_NAMES[t]}`;
      ni.onclick = () => show(t);
      g.appendChild(ni);
    });
    nav.appendChild(g);
  });

  TOPICS.forEach(id => {
    const div = document.createElement('div');
    div.className = 'topic';
    div.id = id;
    div.setAttribute('data-topic', id);

    const topicData = TOPIC_DATA.find(d => d.id === id);
    let html = `<h2 class="topic-title">${TOPIC_NAMES[id]}</h2>
      <p class="topic-desc" style="font-family:var(--mono);font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:24px;">${topicData.content}</p>`;

    switch (id) {
      case 'distribution-explorer':   html += buildDistributionExplorer(); break;
      case 'hypothesis-testing':      html += buildHypothesisTesting(); break;
      case 'correlation-playground':  html += buildCorrelationPlayground(); break;
      case 'central-limit-theorem':   html += buildCentralLimitTheorem(); break;
    }

    html += `<div id="hints-${id}" class="hint-panel"></div>`;
    html += `<div id="challenge-${id}" class="challenge-panel" style="display:none"></div>`;

    div.innerHTML = html;
    main.appendChild(div);
  });
}


/* ── Distribution Explorer ── */
function buildDistributionExplorer() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="deCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Mean (μ)</div><div class="metric-val" id="deMean">0.00</div></div>
      <div class="metric"><div class="metric-label">Std Dev (σ)</div><div class="metric-val" id="deSD">1.00</div></div>
      <div class="metric"><div class="metric-label">Variance</div><div class="metric-val" id="deVar">1.00</div></div>
      <div class="metric"><div class="metric-label">Skewness</div><div class="metric-val" id="deSkew">0.00</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Distribution</span>
        <select id="deDist" class="sb-select" onchange="ENGINE.setDist(this.value)">
          <option value="normal">Normal</option>
          <option value="uniform">Uniform</option>
          <option value="exponential">Exponential</option>
          <option value="poisson">Poisson</option>
        </select>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Param 1 (μ / a / λ)</span>
        <input type="range" id="deParam1" min="-5" max="5" step="0.1" value="0" oninput="ENGINE.setParam1(+this.value);document.getElementById('deP1V').textContent=this.value">
        <span class="ctrl-val" id="deP1V">0</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Param 2 (σ / b)</span>
        <input type="range" id="deParam2" min="0.1" max="5" step="0.1" value="1" oninput="ENGINE.setParam2(+this.value);document.getElementById('deP2V').textContent=this.value">
        <span class="ctrl-val" id="deP2V">1</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Samples</span>
        <input type="range" id="deSamples" min="100" max="5000" step="100" value="1000" oninput="ENGINE.setSamples(+this.value);document.getElementById('deSampV').textContent=this.value">
        <span class="ctrl-val" id="deSampV">1000</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateDE()">Generate</button>
        <button class="sb-btn" onclick="ENGINE.toggleCDF()">Toggle CDF</button>
        <button class="sb-btn" onclick="ENGINE.resetDE()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('distribution-explorer')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Hypothesis Testing ── */
function buildHypothesisTesting() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="htCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">p-value</div><div class="metric-val" id="htPVal">—</div></div>
      <div class="metric"><div class="metric-label">Test Statistic</div><div class="metric-val" id="htStat">—</div></div>
      <div class="metric"><div class="metric-label">Power</div><div class="metric-val" id="htPower">—</div></div>
      <div class="metric"><div class="metric-label">Decision</div><div class="metric-val" id="htDecision">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Effect Size (d)</span>
        <input type="range" id="htEffect" min="0" max="2" step="0.05" value="0.5" oninput="ENGINE.setHTEffect(+this.value);document.getElementById('htEffV').textContent=this.value">
        <span class="ctrl-val" id="htEffV">0.5</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Sample Size (n)</span>
        <input type="range" id="htN" min="5" max="200" step="1" value="30" oninput="ENGINE.setHTN(+this.value);document.getElementById('htNV').textContent=this.value">
        <span class="ctrl-val" id="htNV">30</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Alpha (α)</span>
        <input type="range" id="htAlpha" min="0.01" max="0.2" step="0.01" value="0.05" oninput="ENGINE.setHTAlpha(+this.value);document.getElementById('htAlphaV').textContent=this.value">
        <span class="ctrl-val" id="htAlphaV">0.05</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.runTest()">Run Test</button>
        <button class="sb-btn" onclick="ENGINE.runMany()">Run 100 Tests</button>
        <button class="sb-btn" onclick="ENGINE.resetHT()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('hypothesis-testing')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Correlation Playground ── */
function buildCorrelationPlayground() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="cpCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Pearson r</div><div class="metric-val" id="cpR">—</div></div>
      <div class="metric"><div class="metric-label">R²</div><div class="metric-val" id="cpR2">—</div></div>
      <div class="metric"><div class="metric-label">Points</div><div class="metric-val" id="cpCount">0</div></div>
      <div class="metric"><div class="metric-label">Slope</div><div class="metric-val" id="cpSlope">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Preset</span>
        <select id="cpPreset" class="sb-select" onchange="ENGINE.cpPreset(this.value)">
          <option value="none">Free draw</option>
          <option value="positive">Strong positive</option>
          <option value="negative">Strong negative</option>
          <option value="circle">Circle (no linear)</option>
          <option value="quadratic">Quadratic</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn" onclick="ENGINE.cpToggleLine()">Toggle Regression Line</button>
        <button class="sb-btn" onclick="ENGINE.cpClear()">Clear All</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('correlation-playground')">🎯 Challenges</button>
      </div>
      <p style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:4px;">Click to place points · Shift+click to remove nearest point</p>
    </div>`;
}


/* ── Central Limit Theorem ── */
function buildCentralLimitTheorem() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="cltCanvas" height="500"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Samples Drawn</div><div class="metric-val" id="cltCount">0</div></div>
      <div class="metric"><div class="metric-label">Mean of Means</div><div class="metric-val" id="cltMeanMeans">—</div></div>
      <div class="metric"><div class="metric-label">Std Error</div><div class="metric-val" id="cltSE">—</div></div>
      <div class="metric"><div class="metric-label">Population Shape</div><div class="metric-val" id="cltShape">Uniform</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Population</span>
        <select id="cltPop" class="sb-select" onchange="ENGINE.setCLTPop(this.value)">
          <option value="uniform">Uniform</option>
          <option value="skewed">Right-Skewed</option>
          <option value="bimodal">Bimodal</option>
          <option value="custom">Custom (click to draw)</option>
        </select>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Sample Size (n)</span>
        <input type="range" id="cltN" min="1" max="100" step="1" value="5" oninput="ENGINE.setCLTN(+this.value);document.getElementById('cltNV').textContent=this.value">
        <span class="ctrl-val" id="cltNV">5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.drawSample()">Draw 1 Sample</button>
        <button class="sb-btn" onclick="ENGINE.drawMany(50)">Draw 50</button>
        <button class="sb-btn" onclick="ENGINE.drawMany(500)">Draw 500</button>
        <button class="sb-btn" onclick="ENGINE.resetCLT()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('central-limit-theorem')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Challenge toggle helper ── */
function toggleChallenges(topicId) {
  const panel = document.getElementById('challenge-' + topicId);
  if (!panel) return;
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    renderChallenges(topicId);
  } else {
    panel.style.display = 'none';
  }
}

function renderChallenges(topicId) {
  const panel = document.getElementById('challenge-' + topicId);
  if (!panel) return;
  const saved = JSON.parse(localStorage.getItem('sb-stats-challenges') || '{}');
  const items = CHALLENGES[topicId] || [];
  panel.innerHTML = `<div class="challenge-header">🎯 Challenges</div>` +
    items.map(ch => {
      const done = saved[ch.id];
      return `<div class="challenge-item${done ? ' done' : ''}">
        <div class="challenge-status">${done ? '✓' : '○'}</div>
        <div class="challenge-info">
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-obj">${ch.objective}</div>
        </div>
      </div>`;
    }).join('');
}
