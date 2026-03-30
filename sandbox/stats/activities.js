/* ═══════════════════════════════════════════════════════════════
   Stats Lab — Activities Data & Content Builder
   Interactive statistics sandbox activities
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-stats-lab', title:'Stats Lab', topics:['distribution-explorer','hypothesis-testing','correlation-playground','central-limit-theorem','bayesian-updater','regression-diagnostics','probability-calculator','anova-visualizer','confidence-intervals','chi-square-test','survival-curves','bootstrap-resampler'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  'distribution-explorer':    'Distribution Explorer',
  'hypothesis-testing':       'Hypothesis Testing',
  'correlation-playground':   'Correlation Playground',
  'central-limit-theorem':    'Central Limit Theorem',
  'bayesian-updater':         'Bayesian Updater',
  'regression-diagnostics':   'Regression Diagnostics',
  'probability-calculator':   'Probability Calculator',
  'anova-visualizer':         'ANOVA Visualizer',
  'confidence-intervals':     'Confidence Intervals',
  'chi-square-test':          'Chi-Square Test',
  'survival-curves':          'Survival Curves',
  'bootstrap-resampler':      'Bootstrap Resampler',
};

/* ── Full activity data for search ── */
const TOPIC_DATA = [
  { id:'distribution-explorer', num:'01', title:'Distribution Explorer', category:'Stats Lab', keywords:['normal','uniform','exponential','poisson','distribution','probability','histogram','PDF','CDF','mean','variance','standard deviation','bell curve','skew'], content:'Explore different probability distributions — adjust parameters and see how the shape, mean, and variance change in real-time.' },
  { id:'hypothesis-testing', num:'02', title:'Hypothesis Testing', category:'Stats Lab', keywords:['hypothesis','p-value','significance','null','alternative','type I','type II','alpha','beta','power','t-test','z-test','rejection region'], content:'Simulate hypothesis tests — see how sample size, effect size, and significance level affect p-values and error rates.' },
  { id:'correlation-playground', num:'03', title:'Correlation Playground', category:'Stats Lab', keywords:['correlation','scatter plot','r-value','Pearson','regression','linear','relationship','positive','negative','outlier'], content:'Place points on a scatter plot and watch the correlation coefficient update live. Discover how outliers and patterns affect r.' },
  { id:'central-limit-theorem', num:'04', title:'Central Limit Theorem', category:'Stats Lab', keywords:['CLT','central limit','sampling','sample mean','normal approximation','population','sample size','distribution of means'], content:'Draw samples from any population shape and watch the distribution of sample means converge to a normal distribution.' },
  { id:'bayesian-updater', num:'05', title:'Bayesian Updater', category:'Stats Lab', keywords:['Bayes','posterior','prior','beta','binomial','coin flip','Bernoulli','updating','belief'], content:'Start with a Beta prior, flip coins, and watch the posterior distribution update in real time — see Bayesian inference in action.' },
  { id:'regression-diagnostics', num:'06', title:'Regression Diagnostics', category:'Stats Lab', keywords:['regression','residuals','OLS','R-squared','Q-Q plot','diagnostics','heteroscedasticity','fitted','RMSE','Durbin-Watson'], content:'Generate data, fit a regression, and inspect 4-panel diagnostic plots — residuals, Q-Q, and more.' },
  { id:'probability-calculator', num:'07', title:'Probability Calculator', category:'Stats Lab', keywords:['Bayes theorem','probability tree','conditional','prior','posterior','likelihood','base rate','P(A|B)'], content:'Visualize Bayes\' theorem with an interactive probability tree — adjust priors and likelihoods to see how evidence updates beliefs.' },
  { id:'anova-visualizer', num:'08', title:'ANOVA Visualizer', category:'Stats Lab', keywords:['ANOVA','F-test','group comparison','between-group','within-group','variance','one-way','mean comparison','effect size','sum of squares'], content:'Compare means across multiple groups with one-way ANOVA — see jittered data, group means, and the F-statistic update live.' },
  { id:'confidence-intervals', num:'09', title:'Confidence Intervals', category:'Stats Lab', keywords:['confidence interval','CI','coverage','sampling','margin of error','95%','99%','capture rate','standard error'], content:'Generate confidence intervals one by one and watch coverage converge — see how sample size and confidence level affect interval width.' },
  { id:'chi-square-test', num:'10', title:'Chi-Square Test', category:'Stats Lab', keywords:['chi-square','goodness of fit','observed','expected','residuals','categorical','contingency','degrees of freedom'], content:'Test whether observed frequencies differ from expected — side-by-side bars with standardized residuals and the χ² statistic.' },
  { id:'survival-curves', num:'11', title:'Survival Curves', category:'Stats Lab', keywords:['Kaplan-Meier','survival analysis','hazard rate','censoring','median survival','time-to-event','step function'], content:'Generate Kaplan-Meier survival curves for two groups — see how hazard rates shape the step function, with censoring marks.' },
  { id:'bootstrap-resampler', num:'12', title:'Bootstrap Resampler', category:'Stats Lab', keywords:['bootstrap','resampling','confidence interval','percentile','sample mean','non-parametric','distribution-free','standard error'], content:'Build a bootstrap distribution of sample means — resample with replacement and watch the histogram and percentile CI grow.' },
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
  'bayesian-updater': [
    { id:'bay-update',      trigger:'flips>=1',         message:'Each coin flip is a new piece of evidence — the posterior moves toward the data.' },
    { id:'bay-flat',        trigger:'flatPrior',        message:'A flat prior (α=β=1) means you start with no strong belief — the data speaks for itself.' },
    { id:'bay-strong',      trigger:'strongPrior',      message:'A strong prior (α or β > 5) resists early data — you need more evidence to shift it.' },
    { id:'bay-converge',    trigger:'converging',       message:'The posterior is converging — with enough data, the prior becomes irrelevant!' },
    { id:'bay-mean',        trigger:'meanClose',        message:'The posterior mean is approaching the true coin probability — Bayes at work!' },
  ],
  'regression-diagnostics': [
    { id:'rd-residual',     trigger:'hasResidualPattern', message:'A pattern in the residuals suggests the model is missing something — maybe a nonlinear term.' },
    { id:'rd-qq',           trigger:'qqDeviation',       message:'Deviations from the Q-Q line suggest residuals aren\'t normally distributed.' },
    { id:'rd-hetero',       trigger:'heteroscedastic',   message:'Residuals fanning out? That\'s heteroscedasticity — variance isn\'t constant across fitted values.' },
    { id:'rd-highr2',       trigger:'r2High',            message:'High R² — the model explains most of the variance. But always check residuals too!' },
    { id:'rd-autocorr',     trigger:'autocorrelated',    message:'Durbin-Watson far from 2 suggests autocorrelation in residuals.' },
  ],
  'probability-calculator': [
    { id:'pc-baserate',     trigger:'baseRateTrap',      message:'The base rate fallacy: even with a good test, rare events keep P(A|B) low!' },
    { id:'pc-lr',           trigger:'highLR',            message:'A high likelihood ratio means the evidence strongly favors A over ¬A.' },
    { id:'pc-prior',        trigger:'priorMatters',      message:'The prior P(A) is crucial — it\'s your starting belief before seeing evidence.' },
    { id:'pc-complement',   trigger:'complementShown',   message:'P(A|B) + P(¬A|B) = 1 — the evidence either supports A or ¬A, nothing else.' },
    { id:'pc-rare',         trigger:'rareEvent',         message:'When P(A) is very small, even strong evidence may not make P(A|B) large.' },
  ],
  'anova-visualizer': [
    { id:'av-fhigh',       trigger:'fHigh',              message:'A large F-statistic means between-group variance dominates within-group variance — groups likely differ.' },
    { id:'av-plow',        trigger:'pLow',               message:'p < 0.05 — we reject H₀ that all group means are equal. At least one group is different.' },
    { id:'av-groups',      trigger:'manyGroups',         message:'More groups increases degrees of freedom — you need a larger F to reach significance.' },
    { id:'av-spread',      trigger:'lowSpread',          message:'Low within-group spread makes group differences easier to detect — F goes up.' },
    { id:'av-effect',      trigger:'highEffect',         message:'A large effect size separates group means — making the F-test more powerful.' },
  ],
  'confidence-intervals': [
    { id:'ci-first',       trigger:'firstSample',        message:'Each interval either captures μ or misses it — the confidence level is a long-run property.' },
    { id:'ci-many',        trigger:'manySamples',        message:'With many intervals, coverage should converge to the confidence level (e.g. 95%).' },
    { id:'ci-coverage',    trigger:'highCoverage',       message:'Coverage matching the confidence level? That\'s the frequentist guarantee in action!' },
    { id:'ci-miss',        trigger:'missedOne',          message:'A red interval missed μ. This is expected — 5% of 95% CIs will miss by design.' },
    { id:'ci-narrow',      trigger:'narrowCI',           message:'Narrow CI means high precision. Increase n to make intervals even tighter.' },
  ],
  'chi-square-test': [
    { id:'chi-sig',        trigger:'significant',        message:'χ² is significant — observed counts deviate meaningfully from expected.' },
    { id:'chi-nosig',      trigger:'notSignificant',     message:'Not significant — the data is consistent with the expected distribution.' },
    { id:'chi-resid',      trigger:'highResidual',       message:'A large standardized residual (|r| > 2) pinpoints which category deviates most.' },
    { id:'chi-cats',       trigger:'manyCategories',     message:'More categories means more degrees of freedom — the test becomes more nuanced.' },
    { id:'chi-skew',       trigger:'lowSkew',            message:'Low skew generates near-uniform counts — harder to reject H₀.' },
  ],
  'survival-curves': [
    { id:'surv-sep',       trigger:'separation',         message:'The curves are well separated — groups have meaningfully different survival trajectories.' },
    { id:'surv-censor',    trigger:'censorHeavy',        message:'Heavy censoring (+ marks) means many subjects were still alive at observation end.' },
    { id:'surv-lowh',      trigger:'lowHazard',          message:'A low hazard rate means events are rare — the survival curve drops slowly.' },
    { id:'surv-highh',     trigger:'highHazard',         message:'A high hazard rate causes rapid decline — median survival falls sharply.' },
    { id:'surv-many',      trigger:'manyPatients',       message:'More patients smooth the step function and give tighter estimates.' },
  ],
  'bootstrap-resampler': [
    { id:'boot-first',     trigger:'firstBoot',          message:'Each resample draws n values with replacement from your original data — some points repeat, some are skipped.' },
    { id:'boot-many',      trigger:'manyBoot',           message:'500+ resamples gives a smooth bootstrap distribution — the shape reveals sampling variability.' },
    { id:'boot-bell',      trigger:'bellShaped',         message:'The bootstrap distribution is bell-shaped — the CLT in action, even for non-normal data!' },
    { id:'boot-narrow',    trigger:'narrowCI',           message:'A narrow CI means the sample mean is estimated precisely. Larger n → narrower CI.' },
    { id:'boot-skew',      trigger:'skewedPop',          message:'Bootstrapping a skewed population — the distribution of means still tends toward normal!' },
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
  'bayesian-updater': [
    { id:'bay-c1', title:'Flat Start',       objective:'Start with α=β=1 and flip 50+ coins',              checkFn:'flatStart&&flips>=50' },
    { id:'bay-c2', title:'True Believer',    objective:'Posterior mean within 0.05 of true prob (100+ flips)', checkFn:'trueBeliever&&flips>=100' },
  ],
  'regression-diagnostics': [
    { id:'rd-c1', title:'Perfect Fit',       objective:'Achieve R² > 0.95 with linear relationship',       checkFn:'perfectFit' },
    { id:'rd-c2', title:'Pattern Hunter',    objective:'Use quadratic relationship to reveal residual pattern', checkFn:'patternHunter' },
  ],
  'probability-calculator': [
    { id:'pc-c1', title:'Base Rate Trap',    objective:'Set rare P(A)=0.01, P(B|A)=0.99, P(B|¬A)=0.05 and see P(A|B) < 0.2', checkFn:'baseRateChallenge' },
    { id:'pc-c2', title:'Certainty',         objective:'Get P(A|B) > 0.95',                               checkFn:'certaintyCh' },
  ],
  'anova-visualizer': [
    { id:'av-c1', title:'Significant Split',  objective:'Reject H₀ with p < 0.05',                          checkFn:'rejectNull' },
    { id:'av-c2', title:'Five-Way Split',     objective:'Get a significant result with all 5 groups',        checkFn:'fiveGroups' },
  ],
  'confidence-intervals': [
    { id:'ci-c1', title:'Coverage Check',     objective:'Generate 50+ intervals with coverage within 5% of nominal', checkFn:'coverage90' },
    { id:'ci-c2', title:'Narrow Band',        objective:'Create a CI narrower than 0.5 units',               checkFn:'narrowBand' },
  ],
  'chi-square-test': [
    { id:'chi-c1', title:'Reject χ²',         objective:'Reject the null with p < 0.05',                     checkFn:'rejectChi' },
    { id:'chi-c2', title:'Perfect Fit',        objective:'Get χ² < 1 with 4+ categories',                    checkFn:'perfectFit' },
  ],
  'survival-curves': [
    { id:'surv-c1', title:'Double Survival',   objective:'Make Group A median survival 2× Group B',           checkFn:'doubleSurvival' },
    { id:'surv-c2', title:'Event Rich',        objective:'Get 80%+ event rate across both groups',            checkFn:'allEvents' },
  ],
  'bootstrap-resampler': [
    { id:'boot-c1', title:'Thousand Boots',    objective:'Run 1000+ bootstrap resamples',                     checkFn:'thousandBoots' },
    { id:'boot-c2', title:'Tight Estimate',    objective:'Achieve a CI width < 0.5 with 500+ resamples',      checkFn:'tightCI' },
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
      case 'bayesian-updater':        html += buildBayesianUpdater(); break;
      case 'regression-diagnostics':  html += buildRegressionDiagnostics(); break;
      case 'probability-calculator':  html += buildProbabilityCalculator(); break;
      case 'anova-visualizer':       html += buildAnovaVisualizer(); break;
      case 'confidence-intervals':   html += buildConfidenceIntervals(); break;
      case 'chi-square-test':        html += buildChiSquareTest(); break;
      case 'survival-curves':        html += buildSurvivalCurves(); break;
      case 'bootstrap-resampler':    html += buildBootstrapResampler(); break;
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


/* ── Bayesian Updater ── */
function buildBayesianUpdater() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="bayCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Prior α</div><div class="metric-val" id="bayPriorA">1.00</div></div>
      <div class="metric"><div class="metric-label">Prior β</div><div class="metric-val" id="bayPriorB">1.00</div></div>
      <div class="metric"><div class="metric-label">Posterior α</div><div class="metric-val" id="bayPostA">1.00</div></div>
      <div class="metric"><div class="metric-label">Posterior β</div><div class="metric-val" id="bayPostB">1.00</div></div>
      <div class="metric"><div class="metric-label">Flips</div><div class="metric-val" id="bayFlips">0</div></div>
      <div class="metric"><div class="metric-label">Heads</div><div class="metric-val" id="bayHeads">0</div></div>
      <div class="metric"><div class="metric-label">Posterior Mean</div><div class="metric-val" id="bayMean">0.50</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Prior α</span>
        <input type="range" id="bayAlpha" min="0.5" max="10" step="0.5" value="1" oninput="ENGINE.setPriorA(+this.value);document.getElementById('bayAV').textContent=this.value">
        <span class="ctrl-val" id="bayAV">1</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Prior β</span>
        <input type="range" id="bayBeta" min="0.5" max="10" step="0.5" value="1" oninput="ENGINE.setPriorB(+this.value);document.getElementById('bayBV').textContent=this.value">
        <span class="ctrl-val" id="bayBV">1</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">True Probability</span>
        <input type="range" id="bayProb" min="0.1" max="0.9" step="0.05" value="0.5" oninput="ENGINE.setTrueProb(+this.value);document.getElementById('bayProbV').textContent=this.value">
        <span class="ctrl-val" id="bayProbV">0.5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.flipBayes(1)">Flip 1</button>
        <button class="sb-btn" onclick="ENGINE.flipBayes(10)">Flip 10</button>
        <button class="sb-btn" onclick="ENGINE.flipBayes(100)">Flip 100</button>
        <button class="sb-btn" onclick="ENGINE.resetBayes()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('bayesian-updater')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Regression Diagnostics ── */
function buildRegressionDiagnostics() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="rdCanvas" height="500"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">R²</div><div class="metric-val" id="rdR2">—</div></div>
      <div class="metric"><div class="metric-label">Adj. R²</div><div class="metric-val" id="rdAdjR2">—</div></div>
      <div class="metric"><div class="metric-label">RMSE</div><div class="metric-val" id="rdRMSE">—</div></div>
      <div class="metric"><div class="metric-label">Durbin-Watson</div><div class="metric-val" id="rdDW">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Sample Size</span>
        <input type="range" id="rdN" min="10" max="200" step="5" value="50" oninput="ENGINE.setRDN(+this.value);document.getElementById('rdNV').textContent=this.value">
        <span class="ctrl-val" id="rdNV">50</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Noise</span>
        <input type="range" id="rdNoise" min="0.1" max="5" step="0.1" value="1" oninput="ENGINE.setRDNoise(+this.value);document.getElementById('rdNoiseV').textContent=this.value">
        <span class="ctrl-val" id="rdNoiseV">1</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Relationship</span>
        <select id="rdRel" class="sb-select" onchange="ENGINE.setRDRel(this.value)">
          <option value="linear">Linear</option>
          <option value="quadratic">Quadratic</option>
          <option value="sine">Sine</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateRD()">Generate</button>
        <button class="sb-btn" onclick="ENGINE.resetRD()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('regression-diagnostics')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Probability Calculator ── */
function buildProbabilityCalculator() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="pcCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">P(B)</div><div class="metric-val" id="pcPB">—</div></div>
      <div class="metric"><div class="metric-label">P(A|B)</div><div class="metric-val" id="pcPAB">—</div></div>
      <div class="metric"><div class="metric-label">P(¬A|B)</div><div class="metric-val" id="pcPNotAB">—</div></div>
      <div class="metric"><div class="metric-label">Likelihood Ratio</div><div class="metric-val" id="pcLR">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">P(A)</span>
        <input type="range" id="pcPA" min="0.01" max="0.99" step="0.01" value="0.3" oninput="ENGINE.setPCA(+this.value);document.getElementById('pcPAV').textContent=this.value">
        <span class="ctrl-val" id="pcPAV">0.3</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">P(B|A)</span>
        <input type="range" id="pcPBA" min="0.01" max="0.99" step="0.01" value="0.8" oninput="ENGINE.setPCBA(+this.value);document.getElementById('pcPBAV').textContent=this.value">
        <span class="ctrl-val" id="pcPBAV">0.8</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">P(B|¬A)</span>
        <input type="range" id="pcPBNA" min="0.01" max="0.99" step="0.01" value="0.1" oninput="ENGINE.setPCBNotA(+this.value);document.getElementById('pcPBNAV').textContent=this.value">
        <span class="ctrl-val" id="pcPBNAV">0.1</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.calcPC()">Calculate</button>
        <button class="sb-btn" onclick="ENGINE.resetPC()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('probability-calculator')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── ANOVA Visualizer ── */
function buildAnovaVisualizer() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="anovaCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">F-statistic</div><div class="metric-val" id="anovaF">—</div></div>
      <div class="metric"><div class="metric-label">p-value</div><div class="metric-val" id="anovaP">—</div></div>
      <div class="metric"><div class="metric-label">SS Between</div><div class="metric-val" id="anovaSSB">—</div></div>
      <div class="metric"><div class="metric-label">SS Within</div><div class="metric-val" id="anovaSSW">—</div></div>
      <div class="metric"><div class="metric-label">Decision</div><div class="metric-val" id="anovaDecision">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Groups</span>
        <input type="range" id="anovaGroups" min="2" max="5" step="1" value="3" oninput="ENGINE.setAnovaGroups(+this.value);document.getElementById('anovaGroupsV').textContent=this.value">
        <span class="ctrl-val" id="anovaGroupsV">3</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Points per Group</span>
        <input type="range" id="anovaN" min="5" max="60" step="1" value="20" oninput="ENGINE.setAnovaN(+this.value);document.getElementById('anovaNV').textContent=this.value">
        <span class="ctrl-val" id="anovaNV">20</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Within-Group Spread</span>
        <input type="range" id="anovaSpread" min="0.2" max="3" step="0.1" value="1" oninput="ENGINE.setAnovaSpread(+this.value);document.getElementById('anovaSpreadV').textContent=this.value">
        <span class="ctrl-val" id="anovaSpreadV">1</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Effect Size</span>
        <input type="range" id="anovaEffect" min="0" max="4" step="0.1" value="1.5" oninput="ENGINE.setAnovaEffect(+this.value);document.getElementById('anovaEffectV').textContent=this.value">
        <span class="ctrl-val" id="anovaEffectV">1.5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateAnova()">Generate</button>
        <button class="sb-btn" onclick="ENGINE.resetAnova()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('anova-visualizer')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Confidence Intervals ── */
function buildConfidenceIntervals() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="ciCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Intervals</div><div class="metric-val" id="ciTotal">0</div></div>
      <div class="metric"><div class="metric-label">Captured μ</div><div class="metric-val" id="ciCaptured">0</div></div>
      <div class="metric"><div class="metric-label">Coverage</div><div class="metric-val" id="ciCoverage">—</div></div>
      <div class="metric"><div class="metric-label">Last Width</div><div class="metric-val" id="ciWidth">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">True Mean (μ)</span>
        <input type="range" id="ciMean" min="-5" max="5" step="0.5" value="0" oninput="ENGINE.setCIMean(+this.value);document.getElementById('ciMeanV').textContent=this.value">
        <span class="ctrl-val" id="ciMeanV">0</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">True SD (σ)</span>
        <input type="range" id="ciSD" min="0.5" max="5" step="0.5" value="2" oninput="ENGINE.setCISD(+this.value);document.getElementById('ciSDV').textContent=this.value">
        <span class="ctrl-val" id="ciSDV">2</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Sample Size (n)</span>
        <input type="range" id="ciN" min="5" max="200" step="5" value="25" oninput="ENGINE.setCIN(+this.value);document.getElementById('ciNV').textContent=this.value">
        <span class="ctrl-val" id="ciNV">25</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Confidence Level</span>
        <select id="ciConf" class="sb-select" onchange="ENGINE.setCIConf(+this.value)">
          <option value="0.90">90%</option>
          <option value="0.95" selected>95%</option>
          <option value="0.99">99%</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.sampleCI(1)">Sample 1</button>
        <button class="sb-btn" onclick="ENGINE.sampleCI(10)">Sample 10</button>
        <button class="sb-btn" onclick="ENGINE.sampleCI(50)">Sample 50</button>
        <button class="sb-btn" onclick="ENGINE.resetCI()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('confidence-intervals')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Chi-Square Test ── */
function buildChiSquareTest() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="chiCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">χ²</div><div class="metric-val" id="chiSq">—</div></div>
      <div class="metric"><div class="metric-label">p-value</div><div class="metric-val" id="chiP">—</div></div>
      <div class="metric"><div class="metric-label">df</div><div class="metric-val" id="chiDF">—</div></div>
      <div class="metric"><div class="metric-label">Decision</div><div class="metric-val" id="chiDecision">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Categories</span>
        <input type="range" id="chiCats" min="2" max="6" step="1" value="4" oninput="ENGINE.setChiCategories(+this.value);document.getElementById('chiCatsV').textContent=this.value">
        <span class="ctrl-val" id="chiCatsV">4</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Total Observations</span>
        <input type="range" id="chiTotal" min="50" max="500" step="10" value="200" oninput="ENGINE.setChiTotal(+this.value);document.getElementById('chiTotalV').textContent=this.value">
        <span class="ctrl-val" id="chiTotalV">200</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Skew</span>
        <input type="range" id="chiSkew" min="0" max="1" step="0.05" value="0.5" oninput="ENGINE.setChiSkew(+this.value);document.getElementById('chiSkewV').textContent=this.value">
        <span class="ctrl-val" id="chiSkewV">0.5</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateChi()">Generate</button>
        <button class="sb-btn" onclick="ENGINE.resetChi()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('chi-square-test')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Survival Curves ── */
function buildSurvivalCurves() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="survCanvas" height="400"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Median A</div><div class="metric-val" id="survMedianA">—</div></div>
      <div class="metric"><div class="metric-label">Median B</div><div class="metric-val" id="survMedianB">—</div></div>
      <div class="metric"><div class="metric-label">Events A</div><div class="metric-val" id="survEventsA">—</div></div>
      <div class="metric"><div class="metric-label">Events B</div><div class="metric-val" id="survEventsB">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Total Patients</span>
        <input type="range" id="survN" min="20" max="120" step="2" value="60" oninput="ENGINE.setSurvN(+this.value);document.getElementById('survNV').textContent=this.value">
        <span class="ctrl-val" id="survNV">60</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Hazard A (λ)</span>
        <input type="range" id="survHA" min="0.01" max="0.1" step="0.005" value="0.03" oninput="ENGINE.setSurvHazardA(+this.value);document.getElementById('survHAV').textContent=this.value">
        <span class="ctrl-val" id="survHAV">0.03</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Hazard B (λ)</span>
        <input type="range" id="survHB" min="0.01" max="0.15" step="0.005" value="0.06" oninput="ENGINE.setSurvHazardB(+this.value);document.getElementById('survHBV').textContent=this.value">
        <span class="ctrl-val" id="survHBV">0.06</span>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.generateSurv()">Generate</button>
        <button class="sb-btn" onclick="ENGINE.resetSurv()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('survival-curves')">🎯 Challenges</button>
      </div>
    </div>`;
}


/* ── Bootstrap Resampler ── */
function buildBootstrapResampler() {
  return `
    <div class="sandbox-canvas-wrap"><canvas id="bootCanvas" height="450"></canvas></div>
    <div class="sandbox-metrics">
      <div class="metric"><div class="metric-label">Resamples</div><div class="metric-val" id="bootCount">0</div></div>
      <div class="metric"><div class="metric-label">Boot SE</div><div class="metric-val" id="bootSE">—</div></div>
      <div class="metric"><div class="metric-label">CI Lower</div><div class="metric-val" id="bootCILo">—</div></div>
      <div class="metric"><div class="metric-label">CI Upper</div><div class="metric-val" id="bootCIHi">—</div></div>
    </div>
    <div class="sandbox-controls">
      <div class="ctrl-row">
        <span class="ctrl-label">Population</span>
        <select id="bootPop" class="sb-select" onchange="ENGINE.setBootPop(this.value)">
          <option value="normal">Normal</option>
          <option value="skewed">Right-Skewed</option>
          <option value="bimodal">Bimodal</option>
          <option value="uniform">Uniform</option>
        </select>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Sample Size (n)</span>
        <input type="range" id="bootSampleN" min="10" max="100" step="5" value="30" oninput="ENGINE.setBootN(+this.value);document.getElementById('bootSampleNV').textContent=this.value">
        <span class="ctrl-val" id="bootSampleNV">30</span>
      </div>
      <div class="ctrl-row">
        <span class="ctrl-label">Confidence Level</span>
        <select id="bootConf" class="sb-select" onchange="ENGINE.setBootConf(+this.value)">
          <option value="0.90">90%</option>
          <option value="0.95" selected>95%</option>
          <option value="0.99">99%</option>
        </select>
      </div>
      <div class="ctrl-buttons">
        <button class="sb-btn primary" onclick="ENGINE.resampleBoot(1)">Resample 1</button>
        <button class="sb-btn" onclick="ENGINE.resampleBoot(100)">Resample 100</button>
        <button class="sb-btn" onclick="ENGINE.resampleBoot(500)">Resample 500</button>
        <button class="sb-btn" onclick="ENGINE.resetBoot()">Reset</button>
        <button class="sb-btn challenge-btn" onclick="toggleChallenges('bootstrap-resampler')">🎯 Challenges</button>
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
