/* ═══════════════════════════════════════════════════════════════
   Statistics & Probability — Topics Data & Content Builder
   30 topics organized into 6 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-descriptive', title:'Descriptive Stats', topics:['home','mean-median','variance-std','percentiles','correlation','covariance'] },
  { id:'sec-probability', title:'Probability', topics:['prob-basics','conditional','independence','combinatorics','law-large-numbers'] },
  { id:'sec-distributions', title:'Distributions', topics:['normal','binomial','poisson','exponential','uniform','beta','chi-squared'] },
  { id:'sec-inference', title:'Inference', topics:['clt','confidence','hypothesis','p-value','t-test','anova'] },
  { id:'sec-bayesian', title:'Bayesian Methods', topics:['bayesian-inference','conjugate-priors','mcmc','hierarchical','bayesian-regression'] },
  { id:'sec-applied', title:'Applied', topics:['ab-testing','bootstrap','power-analysis','mle-stats','correlation-vs-causation','simpsons-paradox'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'mean-median':'Mean, Median & Mode',
  'variance-std':'Variance & Std Dev',
  percentiles:'Percentiles & Quartiles',
  correlation:'Correlation',
  covariance:'Covariance',
  'prob-basics':'Probability Basics',
  conditional:'Conditional Probability',
  independence:'Independence',
  combinatorics:'Combinatorics',
  'law-large-numbers':'Law of Large Numbers',
  normal:'Normal Distribution',
  binomial:'Binomial Distribution',
  poisson:'Poisson Distribution',
  exponential:'Exponential Distribution',
  uniform:'Uniform Distribution',
  beta:'Beta Distribution',
  'chi-squared':'Chi-Squared Distribution',
  clt:'Central Limit Theorem',
  confidence:'Confidence Intervals',
  hypothesis:'Hypothesis Testing',
  'p-value':'P-Values',
  't-test':'T-Test',
  anova:'ANOVA',
  'bayesian-inference':'Bayesian Inference',
  'conjugate-priors':'Conjugate Priors',
  mcmc:'MCMC',
  hierarchical:'Hierarchical Models',
  'bayesian-regression':'Bayesian Regression',
  'ab-testing':'A/B Testing',
  bootstrap:'Bootstrap',
  'power-analysis':'Power Analysis',
  'mle-stats':'MLE (Statistics)',
  'correlation-vs-causation':'Correlation vs Causation',
  'simpsons-paradox':"Simpson's Paradox",
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'mean-median', num:'01', title:'Mean, Median & Mode', category:'Descriptive Stats', keywords:['average','central tendency','median','mode','mean','arithmetic','geometric','trimmed'], content:'The three measures of central tendency — when to use each and how they differ.' },
  { id:'variance-std', num:'02', title:'Variance & Std Dev', category:'Descriptive Stats', keywords:['spread','dispersion','standard deviation','variance','range','IQR'], content:'Measuring how spread out data is — variance, standard deviation, and their properties.' },
  { id:'percentiles', num:'03', title:'Percentiles & Quartiles', category:'Descriptive Stats', keywords:['quartile','percentile','IQR','box plot','five number summary','outlier'], content:'Dividing data into equal parts — quartiles, percentiles, and the five-number summary.' },
  { id:'correlation', num:'04', title:'Correlation', category:'Descriptive Stats', keywords:['pearson','spearman','r-value','linear relationship','scatter plot'], content:'Measuring the strength and direction of linear relationships between variables.' },
  { id:'covariance', num:'05', title:'Covariance', category:'Descriptive Stats', keywords:['joint variability','covariance matrix','positive','negative','zero'], content:'How two variables move together — the building block of correlation and PCA.' },
  { id:'prob-basics', num:'06', title:'Probability Basics', category:'Probability', keywords:['event','sample space','union','intersection','complement','axioms','kolmogorov'], content:'The axioms and rules of probability — events, sample spaces, and fundamental operations.' },
  { id:'conditional', num:'07', title:'Conditional Probability', category:'Probability', keywords:['given','bayes','posterior','likelihood','prior','conditional'], content:'Probability of an event given that another has occurred — the gateway to Bayesian thinking.' },
  { id:'independence', num:'08', title:'Independence', category:'Probability', keywords:['independent events','dependent','joint probability','marginal','multiplication rule'], content:'When knowing one event tells you nothing about another — independence and dependence.' },
  { id:'combinatorics', num:'09', title:'Combinatorics', category:'Probability', keywords:['permutation','combination','factorial','counting','choose','binomial coefficient','multinomial'], content:'Counting outcomes — permutations, combinations, and the mathematics of choice.' },
  { id:'law-large-numbers', num:'10', title:'Law of Large Numbers', category:'Probability', keywords:['convergence','sample mean','expected value','weak law','strong law','iid'], content:'Why casino always wins — sample averages converge to the expected value.' },
  { id:'normal', num:'11', title:'Normal Distribution', category:'Distributions', keywords:['gaussian','bell curve','z-score','standard normal','68-95-99.7','CLT'], content:'The bell curve — the most important distribution in statistics, arising everywhere via CLT.' },
  { id:'binomial', num:'12', title:'Binomial Distribution', category:'Distributions', keywords:['bernoulli','trials','success','failure','n choose k','binary outcome'], content:'Counting successes in n independent trials — the foundation of binary experiments.' },
  { id:'poisson', num:'13', title:'Poisson Distribution', category:'Distributions', keywords:['rare events','rate','lambda','count data','arrivals','queuing'], content:'Counting rare events in fixed intervals — arrivals, defects, and natural phenomena.' },
  { id:'exponential', num:'14', title:'Exponential Distribution', category:'Distributions', keywords:['waiting time','memoryless','decay','half-life','rate parameter','survival'], content:'Time between events — the memoryless distribution for waiting and survival analysis.' },
  { id:'uniform', num:'15', title:'Uniform Distribution', category:'Distributions', keywords:['equal probability','flat','rectangular','continuous','discrete','random number'], content:'Every outcome equally likely — the simplest distribution, foundation of random sampling.' },
  { id:'beta', num:'16', title:'Beta Distribution', category:'Distributions', keywords:['prior','proportion','bayesian','alpha','beta parameters','conjugate'], content:'The distribution of probabilities — flexible shape for modeling proportions and priors.' },
  { id:'chi-squared', num:'17', title:'Chi-Squared Distribution', category:'Distributions', keywords:['goodness of fit','degrees of freedom','test statistic','categorical','contingency table'], content:'Sum of squared standard normals — used in goodness-of-fit and independence tests.' },
  { id:'clt', num:'18', title:'Central Limit Theorem', category:'Inference', keywords:['sample mean','normal approximation','n>30','sampling distribution','standard error'], content:'The most important theorem in statistics — sample means become normal regardless of the population.' },
  { id:'confidence', num:'19', title:'Confidence Intervals', category:'Inference', keywords:['margin of error','95%','interval estimate','z-interval','t-interval','coverage'], content:'Quantifying uncertainty in estimates — what a 95% confidence interval really means.' },
  { id:'hypothesis', num:'20', title:'Hypothesis Testing', category:'Inference', keywords:['null hypothesis','alternative','type I error','type II error','significance','alpha','reject'], content:'Making decisions from data — the framework of null vs alternative hypotheses.' },
  { id:'p-value', num:'21', title:'P-Values', category:'Inference', keywords:['significance','alpha','reject','fail to reject','probability','test statistic','misinterpretation'], content:'The most misunderstood concept in statistics — what p-values actually mean.' },
  { id:'t-test', num:'22', title:'T-Test', category:'Inference', keywords:['student t','two sample','paired','one sample','degrees of freedom','small sample'], content:'Comparing means when sample sizes are small — the workhorse of A/B testing.' },
  { id:'anova', num:'23', title:'ANOVA', category:'Inference', keywords:['analysis of variance','F-test','between groups','within groups','one-way','two-way','factor'], content:'Comparing means across three or more groups simultaneously.' },
  { id:'bayesian-inference', num:'24', title:'Bayesian Inference', category:'Bayesian Methods', keywords:['posterior','prior','likelihood','update','credible interval','subjective'], content:'Updating beliefs with data — the Bayesian framework for learning from evidence.' },
  { id:'conjugate-priors', num:'25', title:'Conjugate Priors', category:'Bayesian Methods', keywords:['beta-binomial','normal-normal','gamma-poisson','closed form','posterior update'], content:'Prior-likelihood pairs that yield closed-form posteriors — the efficient path to Bayesian updating.' },
  { id:'mcmc', num:'26', title:'MCMC', category:'Bayesian Methods', keywords:['markov chain','monte carlo','metropolis','gibbs','sampling','posterior sampling','trace plot'], content:'Sampling from complex posteriors — Metropolis-Hastings and Gibbs sampling algorithms.' },
  { id:'hierarchical', num:'27', title:'Hierarchical Models', category:'Bayesian Methods', keywords:['multilevel','random effects','partial pooling','hyperparameters','nested'], content:'Models with structure — sharing information across groups via partial pooling.' },
  { id:'bayesian-regression', num:'28', title:'Bayesian Regression', category:'Bayesian Methods', keywords:['posterior distribution','credible interval','predictive','uncertainty','weight distribution'], content:'Linear regression with full uncertainty quantification — distributions over weights, not points.' },
  { id:'ab-testing', num:'29', title:'A/B Testing', category:'Applied', keywords:['experiment','control','treatment','conversion','sample size','significance','uplift','MDE'], content:'Running controlled experiments — design, analysis, and common pitfalls of A/B tests.' },
  { id:'bootstrap', num:'30', title:'Bootstrap', category:'Applied', keywords:['resampling','confidence interval','nonparametric','empirical distribution','percentile method'], content:'Estimating distributions by resampling — no assumptions about the population needed.' },
  { id:'power-analysis', num:'31', title:'Power Analysis', category:'Applied', keywords:['sample size','effect size','beta','type II error','statistical power','MDE'], content:'How many samples do you need? — planning experiments with sufficient statistical power.' },
  { id:'mle-stats', num:'32', title:'MLE (Statistics)', category:'Applied', keywords:['maximum likelihood','likelihood function','log-likelihood','fisher information','asymptotic'], content:'Finding parameters that make data most probable — the frequentist workhorse.' },
  { id:'correlation-vs-causation', num:'33', title:'Correlation vs Causation', category:'Applied', keywords:['confounding','spurious','causal inference','randomization','DAG','intervention'], content:'Why ice cream sales don\'t cause drowning — the critical distinction in data analysis.' },
  { id:'simpsons-paradox', num:'34', title:"Simpson's Paradox", category:'Applied', keywords:['aggregation','subgroup','reversal','confounding','lurking variable','marginal'], content:'When trends reverse upon aggregation — a paradox that catches even experts off guard.' },
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
function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome() + buildMeanMedian() + buildVarianceStd() + buildPercentiles()
    + buildCorrelation() + buildCovariance() + buildProbBasics() + buildConditional()
    + buildIndependence() + buildCombinatorics() + buildLLN() + buildNormal() + buildBinomial()
    + buildPoisson() + buildExponential() + buildUniform() + buildBeta() + buildChiSquared()
    + buildCLT() + buildConfidence() + buildHypothesis() + buildPValue() + buildTTest()
    + buildAnova() + buildBayesianInference() + buildConjugatePriors() + buildMCMC()
    + buildHierarchical() + buildBayesianRegression() + buildABTesting() + buildBootstrap()
    + buildPowerAnalysis() + buildMLEStats() + buildCorrelationVsCausation() + buildSimpsonsParadox();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2><em>Statistics</em> &<br>Probability</h2>
    <p style="margin-top:14px">An interactive reference covering 34 topics — from descriptive
    statistics to Bayesian methods. Every topic has the core formulas, visual intuition, and Python/NumPy code.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> arrow keys to navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-descriptive','mean-median')">
      <div class="cat-card-icon">📊</div>
      <div class="cat-card-name">Descriptive Stats</div>
      <div class="cat-card-count">5 topics · Mean, variance, percentiles, correlation</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-probability','prob-basics')">
      <div class="cat-card-icon">🎲</div>
      <div class="cat-card-name">Probability</div>
      <div class="cat-card-count">5 topics · Axioms, conditional, independence, counting</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-distributions','normal')">
      <div class="cat-card-icon">📈</div>
      <div class="cat-card-name">Distributions</div>
      <div class="cat-card-count">7 topics · Normal, binomial, Poisson, beta, and more</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-inference','clt')">
      <div class="cat-card-icon">🔬</div>
      <div class="cat-card-name">Inference</div>
      <div class="cat-card-count">6 topics · CLT, confidence intervals, hypothesis testing</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-bayesian','bayesian-inference')">
      <div class="cat-card-icon">🧮</div>
      <div class="cat-card-name">Bayesian Methods</div>
      <div class="cat-card-count">5 topics · Bayesian inference, MCMC, priors</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-applied','ab-testing')">
      <div class="cat-card-icon">🧪</div>
      <div class="cat-card-name">Applied</div>
      <div class="cat-card-count">6 topics · A/B testing, bootstrap, power analysis</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Mean, Median & Mode */
function buildMeanMedian() {
  return `<div class="topic" id="mean-median">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Descriptive Stats</div><h2>Mean, Median & <em>Mode</em></h2></div>
    <span class="topic-badge">Central Tendency</span>
  </div>
  <p class="sub">// Three ways to answer "what's typical?" — each with different strengths</p>
  <p class="prose">The <strong>mean</strong> is the arithmetic average — sensitive to outliers. The <strong>median</strong> is the middle value — robust to outliers. The <strong>mode</strong> is the most frequent value — works for categorical data too.</p>
  <div class="fb"><div class="fm">Mean: x̄ = (1/n) · Σxᵢ</div><div class="fd">Sum all values, divide by count. Pulled by extreme values.</div></div>
  <div class="fb c2"><div class="fm">Median: middle value when sorted</div><div class="fd">50th percentile. Robust — unaffected by outliers.</div></div>
  <div class="va">
    <div class="vl">// Drag the outlier — watch mean vs median diverge</div>
    <canvas id="meanCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Outlier position</span><input type="range" id="outlierPos" min="5" max="50" step="0.5" value="8" oninput="drawMeanMedian()"><span class="vd" id="outlierPosV">8</span></div>
      <div class="cg"><span class="cl">Mean</span><span class="vd" id="meanV" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Median</span><span class="vd" id="medianV" style="color:var(--accent2)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># NumPy</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
data = [<span class="st">2</span>, <span class="st">3</span>, <span class="st">3</span>, <span class="st">4</span>, <span class="st">5</span>, <span class="st">100</span>]
np.mean(data)         <span class="cm"># 19.5 — pulled by outlier</span>
np.median(data)       <span class="cm"># 3.5 — robust</span>
<span class="kw">from</span> scipy <span class="kw">import</span> stats
stats.mode(data)      <span class="cm"># 3 — most frequent</span></pre></div>
  <div class="callout info"><strong>When to use which:</strong> Mean for symmetric data. Median for skewed data or when outliers exist. Mode for categorical data.</div>
  <div class="topic-nav" id="nav-mean-median"></div>
</div>`;
}

/* 02 — Variance & Standard Deviation */
function buildVarianceStd() {
  return `<div class="topic" id="variance-std">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Descriptive Stats</div><h2>Variance & <em>Standard Deviation</em></h2></div>
    <span class="topic-badge">Spread</span>
  </div>
  <p class="sub">// How spread out is your data? The most fundamental measure of dispersion</p>
  <p class="prose"><strong>Variance</strong> measures the average squared deviation from the mean. <strong>Standard deviation</strong> is its square root — same units as data. Bessel's correction (n−1) gives an unbiased estimate.</p>
  <div class="fb"><div class="fm">σ² = (1/n) · Σ(xᵢ − x̄)²</div><div class="fd">Population variance — use when you have the full population</div></div>
  <div class="fb c2"><div class="fm">s² = (1/(n−1)) · Σ(xᵢ − x̄)²</div><div class="fd">Sample variance — Bessel's correction (n−1) makes it unbiased</div></div>
  <div class="fb c3"><div class="fm">σ = √σ² &nbsp;&nbsp; s = √s²</div><div class="fd">Standard deviation — back in original units. ~68% of data within ±1σ of the mean (if normal).</div></div>
  <div class="va">
    <div class="vl">// Adjust spread — see how variance and std change</div>
    <canvas id="varCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Spread</span><input type="range" id="varSpread" min="0.2" max="4" step="0.1" value="1" oninput="drawVariance()"><span class="vd" id="varSpreadV">1.0</span></div>
      <div class="cg"><span class="cl">Variance</span><span class="vd" id="varValV" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">Std Dev</span><span class="vd" id="stdValV" style="color:var(--accent3)">—</span></div>
    </div>
  </div>
  <div class="callout"><strong>Why n−1?</strong> The sample mean x̄ is already estimated from the data, "using up" one degree of freedom. Dividing by n−1 corrects for this and gives an unbiased estimator of σ².</div>
  <div class="topic-nav" id="nav-variance-std"></div>
</div>`;
}

/* 03 — Percentiles & Quartiles */
function buildPercentiles() {
  return `<div class="topic" id="percentiles">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Descriptive Stats</div><h2>Percentiles & <em>Quartiles</em></h2></div>
    <span class="topic-badge">Distribution</span>
  </div>
  <p class="sub">// Dividing data into equal chunks — the backbone of box plots and outlier detection</p>
  <p class="prose">The <strong>p-th percentile</strong> is the value below which p% of data falls. <strong>Quartiles</strong> divide data into 4 equal parts. The <strong>IQR</strong> (Q3−Q1) measures spread robustly.</p>
  <div class="fb"><div class="fm">Q1 = 25th %ile &nbsp; Q2 = Median &nbsp; Q3 = 75th %ile</div><div class="fd">Quartiles split data into four equal-sized groups</div></div>
  <div class="fb c2"><div class="fm">IQR = Q3 − Q1</div><div class="fd">Interquartile range — the middle 50% of data. Outliers: < Q1 − 1.5·IQR or > Q3 + 1.5·IQR</div></div>
  <div class="va">
    <div class="vl">// Interactive box plot — drag sample size to see quartile stability</div>
    <canvas id="percCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sample size</span><input type="range" id="percN" min="10" max="200" step="5" value="50" oninput="drawPercentiles()"><span class="vd" id="percNV">50</span></div>
      <button class="btn" onclick="drawPercentiles()">↺ RESAMPLE</button>
    </div>
  </div>
  <div class="code-block"><pre>np.percentile(data, [<span class="st">25</span>, <span class="st">50</span>, <span class="st">75</span>])   <span class="cm"># Q1, Q2 (median), Q3</span>
np.quantile(data, <span class="st">0.95</span>)               <span class="cm"># 95th percentile</span>
iqr = np.percentile(data, <span class="st">75</span>) - np.percentile(data, <span class="st">25</span>)</pre></div>
  <div class="topic-nav" id="nav-percentiles"></div>
</div>`;
}

/* 04 — Correlation */
function buildCorrelation() {
  return `<div class="topic" id="correlation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Descriptive Stats</div><h2><em>Correlation</em></h2></div>
    <span class="topic-badge">Relationship</span>
  </div>
  <p class="sub">// Measuring linear association between two variables — normalized to [−1, +1]</p>
  <p class="prose"><strong>Pearson's r</strong> measures linear correlation. +1 = perfect positive, −1 = perfect negative, 0 = no linear relationship. It's just <strong>normalized covariance</strong>.</p>
  <div class="fb"><div class="fm">r = Cov(X,Y) / (σₓ · σᵧ) = Σ(xᵢ−x̄)(yᵢ−ȳ) / √(Σ(xᵢ−x̄)² · Σ(yᵢ−ȳ)²)</div><div class="fd">Range [−1,1]. Dimensionless — unaffected by scaling.</div></div>
  <div class="va">
    <div class="vl">// Adjust correlation — watch the scatter plot reshape</div>
    <canvas id="corrCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Target r</span><input type="range" id="corrR" min="-1" max="1" step="0.05" value="0.7" oninput="drawCorrelation()"><span class="vd" id="corrRV">0.70</span></div>
      <div class="cg"><span class="cl">Actual r</span><span class="vd" id="corrActV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Critical warning:</strong> r measures only <em>linear</em> relationships. A perfect parabola has r=0. Always plot your data — Anscombe's quartet proves numbers lie without visuals.</div>
  <div class="topic-nav" id="nav-correlation"></div>
</div>`;
}

/* 05 — Covariance */
function buildCovariance() {
  return `<div class="topic" id="covariance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Descriptive Stats</div><h2><em>Covariance</em></h2></div>
    <span class="topic-badge">Joint Variability</span>
  </div>
  <p class="sub">// How two variables move together — the unnormalized version of correlation</p>
  <p class="prose">Covariance measures whether two variables tend to increase together (positive), decrease together (negative), or are unrelated (zero). Unlike correlation, it's <strong>not bounded</strong> and depends on scale.</p>
  <div class="fb"><div class="fm">Cov(X,Y) = (1/n) · Σ(xᵢ − x̄)(yᵢ − ȳ)</div><div class="fd">Positive → both rise together. Negative → one rises while other falls.</div></div>
  <div class="fb c2"><div class="fm">Cov(X,Y) = E[XY] − E[X]·E[Y]</div><div class="fd">Shortcut formula. If independent, Cov = 0. (But Cov = 0 ≠ independent!)</div></div>
  <div class="va">
    <div class="vl">// Covariance matrix visualization — adjust joint movement</div>
    <canvas id="covCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Cov(X,Y)</span><input type="range" id="covVal" min="-3" max="3" step="0.1" value="1.5" oninput="drawCovariance()"><span class="vd" id="covValV">1.5</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Covariance matrix:</strong> For d variables, the d×d covariance matrix Σ has variances on the diagonal and covariances off-diagonal. It's the foundation of PCA, Gaussian distributions, and portfolio theory.</div>
  <div class="topic-nav" id="nav-covariance"></div>
</div>`;
}

/* 06 — Probability Basics */
function buildProbBasics() {
  return `<div class="topic" id="prob-basics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Probability</div><h2>Probability <em>Basics</em></h2></div>
    <span class="topic-badge">Foundations</span>
  </div>
  <p class="sub">// Events, sample spaces, and the three axioms everything is built on</p>
  <p class="prose">Probability assigns a number between 0 and 1 to events. All of probability theory follows from <strong>Kolmogorov's three axioms</strong>: non-negativity, normalization, and additivity.</p>
  <div class="fb"><div class="fm">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div><div class="fd">Addition rule. For mutually exclusive events: P(A ∪ B) = P(A) + P(B)</div></div>
  <div class="fb c2"><div class="fm">P(A') = 1 − P(A)</div><div class="fd">Complement rule. Often easier to compute "not A" than "A" directly.</div></div>
  <div class="va">
    <div class="vl">// Venn diagram — adjust overlap to see union and intersection</div>
    <canvas id="probCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">P(A)</span><input type="range" id="pA" min="0.05" max="0.8" step="0.05" value="0.4" oninput="drawProbBasics()"><span class="vd" id="pAV">0.40</span></div>
      <div class="cg"><span class="cl">P(B)</span><input type="range" id="pB" min="0.05" max="0.8" step="0.05" value="0.3" oninput="drawProbBasics()"><span class="vd" id="pBV">0.30</span></div>
      <div class="cg"><span class="cl">P(A∩B)</span><input type="range" id="pAB" min="0" max="0.3" step="0.01" value="0.1" oninput="drawProbBasics()"><span class="vd" id="pABV">0.10</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-prob-basics"></div>
</div>`;
}

/* 07 — Conditional Probability */
function buildConditional() {
  return `<div class="topic" id="conditional">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Probability</div><h2>Conditional <em>Probability</em></h2></div>
    <span class="topic-badge">Dependence</span>
  </div>
  <p class="sub">// "Given that B happened, what's the probability of A?"</p>
  <p class="prose">Conditional probability restricts the sample space. <strong>P(A|B)</strong> asks: among outcomes where B occurred, how many also have A?</p>
  <div class="fb"><div class="fm">P(A|B) = P(A ∩ B) / P(B)</div><div class="fd">Probability of A given B. Requires P(B) > 0.</div></div>
  <div class="fb c2"><div class="fm">P(A ∩ B) = P(A|B) · P(B) = P(B|A) · P(A)</div><div class="fd">Multiplication rule — the chain rule of probability.</div></div>
  <div class="va">
    <div class="vl">// Tree diagram — adjust probabilities to explore conditional paths</div>
    <canvas id="condCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">P(B)</span><input type="range" id="condPB" min="0.1" max="0.9" step="0.05" value="0.5" oninput="drawConditional()"><span class="vd" id="condPBV">0.50</span></div>
      <div class="cg"><span class="cl">P(A|B)</span><input type="range" id="condPAB" min="0.05" max="0.95" step="0.05" value="0.7" oninput="drawConditional()"><span class="vd" id="condPABV">0.70</span></div>
      <div class="cg"><span class="cl">P(A∩B)</span><span class="vd" id="condJoint" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-conditional"></div>
</div>`;
}

/* 08 — Independence */
function buildIndependence() {
  return `<div class="topic" id="independence">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Probability</div><h2><em>Independence</em></h2></div>
    <span class="topic-badge">Relationship</span>
  </div>
  <p class="sub">// When knowing one event tells you nothing about another</p>
  <p class="prose">Two events are <strong>independent</strong> if the occurrence of one doesn't change the probability of the other. Formally: P(A|B) = P(A). Equivalent: P(A∩B) = P(A)·P(B).</p>
  <div class="fb"><div class="fm">Independent: P(A ∩ B) = P(A) · P(B)</div><div class="fd">Joint probability factors into the product of marginals.</div></div>
  <div class="va">
    <div class="vl">// Compare actual joint probability to P(A)·P(B)</div>
    <canvas id="indepCanvas" height="200"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">P(A)</span><input type="range" id="indA" min="0.1" max="0.9" step="0.05" value="0.5" oninput="drawIndependence()"><span class="vd" id="indAV">0.50</span></div>
      <div class="cg"><span class="cl">P(B)</span><input type="range" id="indB" min="0.1" max="0.9" step="0.05" value="0.4" oninput="drawIndependence()"><span class="vd" id="indBV">0.40</span></div>
      <div class="cg"><span class="cl">P(A∩B)</span><input type="range" id="indAB" min="0" max="0.5" step="0.01" value="0.2" oninput="drawIndependence()"><span class="vd" id="indABV">0.20</span></div>
      <div class="cg"><span class="cl">Status</span><span class="vd" id="indStatus" style="color:var(--accent2)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Common trap:</strong> Independence ≠ mutually exclusive. Mutually exclusive events are maximally <em>dependent</em> — if A happens, B definitely didn't!</div>
  <div class="topic-nav" id="nav-independence"></div>
</div>`;
}

/* 09 — Combinatorics */
function buildCombinatorics() {
  return `<div class="topic" id="combinatorics">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Probability</div><h2><em>Combinatorics</em></h2></div>
    <span class="topic-badge">Counting</span>
  </div>
  <p class="sub">// Counting outcomes — how many possible arrangements, selections, and orderings exist</p>
  <p class="prose"><strong>Permutations</strong> count ordered arrangements. <strong>Combinations</strong> count unordered selections. The difference: does the order of selection matter?</p>
  <div class="fb"><div class="fm">Permutations: P(n,k) = n! / (n−k)!</div><div class="fd">Ordered selections of k items from n. Order matters.</div></div>
  <div class="fb c2"><div class="fm">Combinations: C(n,k) = n! / (k!(n−k)!)</div><div class="fd">"n choose k" — unordered selections. C(n,k) = P(n,k) / k!</div></div>
  <div class="va">
    <div class="vl">// Permutations vs combinations — adjust n and k</div>
    <canvas id="combCanvas" height="200"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">n (total)</span><input type="range" id="combN" min="2" max="20" step="1" value="10" oninput="drawCombinatorics()"><span class="vd" id="combNV">10</span></div>
      <div class="cg"><span class="cl">k (choose)</span><input type="range" id="combK" min="1" max="10" step="1" value="3" oninput="drawCombinatorics()"><span class="vd" id="combKV">3</span></div>
      <div class="cg"><span class="cl">P(n,k)</span><span class="vd" id="combPerms" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">C(n,k)</span><span class="vd" id="combCombs" style="color:var(--accent3)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="kw">from</span> math <span class="kw">import</span> comb, perm, factorial
comb(<span class="st">52</span>, <span class="st">5</span>)     <span class="cm"># 2,598,960 poker hands</span>
perm(<span class="st">10</span>, <span class="st">3</span>)     <span class="cm"># 720 ordered selections</span>
factorial(<span class="st">10</span>)   <span class="cm"># 3,628,800</span></pre></div>
  <div class="topic-nav" id="nav-combinatorics"></div>
</div>`;
}

/* 10 — Law of Large Numbers */
function buildLLN() {
  return `<div class="topic" id="law-large-numbers">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Probability</div><h2>Law of <em>Large Numbers</em></h2></div>
    <span class="topic-badge">Convergence</span>
  </div>
  <p class="sub">// Why casinos always win — sample averages converge to the expected value</p>
  <p class="prose">As sample size n → ∞, the sample mean <strong>converges to the true expected value</strong>. This is why insurance, casinos, and machine learning all work — large samples wash out randomness.</p>
  <div class="fb"><div class="fm">x̄ₙ → μ as n → ∞</div><div class="fd">Weak LLN: convergence in probability. Strong LLN: almost sure convergence.</div></div>
  <div class="va">
    <div class="vl">// Watch the running average converge to the true mean</div>
    <canvas id="llnCanvas" height="220"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animLLN()">▶ SIMULATE</button>
      <button class="btn" onclick="resetLLN()">↺ RESET</button>
      <div class="cg"><span class="cl">True μ = 3.5</span><span class="vd" id="llnCurrent" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout"><strong>Gambler's fallacy:</strong> LLN does NOT mean "the universe remembers." After 10 heads in a row, the next flip is still 50/50. LLN works via dilution, not correction.</div>
  <div class="topic-nav" id="nav-law-large-numbers"></div>
</div>`;
}

/* 11 — Normal Distribution */
function buildNormal() {
  return `<div class="topic" id="normal">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Distributions</div><h2>Normal <em>Distribution</em></h2></div>
    <span class="topic-badge">Continuous</span>
  </div>
  <p class="sub">// The bell curve — arises everywhere via the Central Limit Theorem</p>
  <p class="prose">The normal (Gaussian) distribution is fully described by <strong>mean μ</strong> and <strong>variance σ²</strong>. The 68-95-99.7 rule: ~68% within ±1σ, ~95% within ±2σ, ~99.7% within ±3σ.</p>
  <div class="fb"><div class="fm">f(x) = (1/√(2πσ²)) · exp(−(x−μ)²/(2σ²))</div><div class="fd">The probability density function. Bell-shaped, symmetric around μ.</div></div>
  <div class="fb c2"><div class="fm">Z = (X − μ) / σ</div><div class="fd">Z-score: how many standard deviations from the mean. Z ~ N(0,1).</div></div>
  <div class="va">
    <div class="vl">// Adjust μ and σ — see the 68-95-99.7 rule in action</div>
    <canvas id="normCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Mean μ</span><input type="range" id="normMu" min="-3" max="3" step="0.1" value="0" oninput="drawNormal()"><span class="vd" id="normMuV">0.0</span></div>
      <div class="cg"><span class="cl">Std σ</span><input type="range" id="normSig" min="0.3" max="3" step="0.1" value="1" oninput="drawNormal()"><span class="vd" id="normSigV">1.0</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="kw">from</span> scipy.stats <span class="kw">import</span> norm
norm.pdf(<span class="st">0</span>, loc=<span class="st">0</span>, scale=<span class="st">1</span>)       <span class="cm"># density at x=0</span>
norm.cdf(<span class="st">1.96</span>)                       <span class="cm"># P(Z ≤ 1.96) = 0.975</span>
norm.ppf(<span class="st">0.975</span>)                      <span class="cm"># z-value for 97.5th %ile = 1.96</span>
samples = norm.rvs(size=<span class="st">1000</span>)        <span class="cm"># random samples</span></pre></div>
  <div class="topic-nav" id="nav-normal"></div>
</div>`;
}

/* 12 — Binomial Distribution */
function buildBinomial() {
  return `<div class="topic" id="binomial">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Distributions</div><h2>Binomial <em>Distribution</em></h2></div>
    <span class="topic-badge">Discrete</span>
  </div>
  <p class="sub">// Counting successes in n independent yes/no trials</p>
  <p class="prose">The binomial distribution models the <strong>number of successes in n Bernoulli trials</strong>, each with probability p. It's the foundation of A/B testing and binary experiments.</p>
  <div class="fb"><div class="fm">P(X=k) = C(n,k) · pᵏ · (1−p)ⁿ⁻ᵏ</div><div class="fd"><span>n</span> = trials, <span>k</span> = successes, <span>p</span> = success probability per trial</div></div>
  <div class="fb c2"><div class="fm">E[X] = np &nbsp;&nbsp; Var(X) = np(1−p)</div><div class="fd">Mean and variance have simple closed forms.</div></div>
  <div class="va">
    <div class="vl">// Adjust n and p — see the PMF reshape</div>
    <canvas id="binomCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">n trials</span><input type="range" id="binomN" min="1" max="50" step="1" value="20" oninput="drawBinomial()"><span class="vd" id="binomNV">20</span></div>
      <div class="cg"><span class="cl">p (success)</span><input type="range" id="binomP" min="0.01" max="0.99" step="0.01" value="0.5" oninput="drawBinomial()"><span class="vd" id="binomPV">0.50</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Approximation:</strong> When n is large and p isn't extreme, Binomial(n,p) ≈ Normal(np, np(1−p)). Rule of thumb: np ≥ 10 and n(1−p) ≥ 10.</div>
  <div class="topic-nav" id="nav-binomial"></div>
</div>`;
}

/* 13 — Poisson Distribution */
function buildPoisson() {
  return `<div class="topic" id="poisson">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Distributions</div><h2>Poisson <em>Distribution</em></h2></div>
    <span class="topic-badge">Discrete</span>
  </div>
  <p class="sub">// Counting rare events — arrivals, defects, and natural phenomena</p>
  <p class="prose">The Poisson distribution models <strong>count of events in a fixed interval</strong> when events occur independently at a constant rate λ. Perfect for rare events.</p>
  <div class="fb"><div class="fm">P(X=k) = e⁻λ · λᵏ / k!</div><div class="fd"><span>λ</span> = expected rate (mean = variance). k = number of events.</div></div>
  <div class="fb c2"><div class="fm">E[X] = Var(X) = λ</div><div class="fd">Unique property: the mean <em>equals</em> the variance. If not, it's probably not Poisson.</div></div>
  <div class="va">
    <div class="vl">// Adjust rate λ — watch the PMF shift and spread</div>
    <canvas id="poissonCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Rate λ</span><input type="range" id="poisLambda" min="0.5" max="15" step="0.5" value="4" oninput="drawPoisson()"><span class="vd" id="poisLambdaV">4.0</span></div>
    </div>
  </div>
  <div class="callout"><strong>Connection:</strong> Poisson is the limit of Binomial(n,p) as n→∞, p→0, with np=λ. It's also the arrival count in a Poisson process.</div>
  <div class="topic-nav" id="nav-poisson"></div>
</div>`;
}

/* 14 — Exponential Distribution */
function buildExponential() {
  return `<div class="topic" id="exponential">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Distributions</div><h2>Exponential <em>Distribution</em></h2></div>
    <span class="topic-badge">Continuous</span>
  </div>
  <p class="sub">// Time between events — the memoryless waiting-time distribution</p>
  <p class="prose">If events arrive as a Poisson process at rate λ, the <strong>time between events</strong> follows an exponential distribution. It's <strong>memoryless</strong>: P(X > s+t | X > s) = P(X > t).</p>
  <div class="fb"><div class="fm">f(x) = λ · e⁻λˣ &nbsp;&nbsp; (x ≥ 0)</div><div class="fd"><span>λ</span> = rate parameter. Higher λ = shorter waits.</div></div>
  <div class="fb c2"><div class="fm">E[X] = 1/λ &nbsp;&nbsp; Var(X) = 1/λ²</div><div class="fd">Mean waiting time is the reciprocal of the rate.</div></div>
  <div class="va">
    <div class="vl">// Adjust rate — see how the distribution stretches</div>
    <canvas id="expCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Rate λ</span><input type="range" id="expLambda" min="0.2" max="3" step="0.1" value="1" oninput="drawExponential()"><span class="vd" id="expLambdaV">1.0</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Memoryless property:</strong> If you've already waited 5 minutes, the expected remaining wait is the same as if you just started. No other continuous distribution has this property.</div>
  <div class="topic-nav" id="nav-exponential"></div>
</div>`;
}

/* 15 — Uniform Distribution */
function buildUniform() {
  return `<div class="topic" id="uniform">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Distributions</div><h2>Uniform <em>Distribution</em></h2></div>
    <span class="topic-badge">Continuous</span>
  </div>
  <p class="sub">// Every outcome equally likely — flat and simple</p>
  <p class="prose">The continuous uniform distribution assigns <strong>equal probability density</strong> everywhere on [a, b]. Used as a non-informative prior and the foundation of random number generation.</p>
  <div class="fb"><div class="fm">f(x) = 1/(b−a) &nbsp;&nbsp; for a ≤ x ≤ b</div><div class="fd">Constant density. Flat "rectangular" shape.</div></div>
  <div class="fb c2"><div class="fm">E[X] = (a+b)/2 &nbsp;&nbsp; Var(X) = (b−a)²/12</div><div class="fd">Mean is the midpoint. Variance depends only on range width.</div></div>
  <div class="va">
    <div class="vl">// Adjust bounds — see the rectangle change</div>
    <canvas id="uniCanvas" height="200"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">a (min)</span><input type="range" id="uniA" min="-5" max="0" step="0.5" value="-2" oninput="drawUniform()"><span class="vd" id="uniAV">-2.0</span></div>
      <div class="cg"><span class="cl">b (max)</span><input type="range" id="uniB" min="1" max="8" step="0.5" value="4" oninput="drawUniform()"><span class="vd" id="uniBV">4.0</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-uniform"></div>
</div>`;
}

/* 16 — Beta Distribution */
function buildBeta() {
  return `<div class="topic" id="beta">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Distributions</div><h2>Beta <em>Distribution</em></h2></div>
    <span class="topic-badge">Continuous</span>
  </div>
  <p class="sub">// The distribution of probabilities — infinitely flexible on [0, 1]</p>
  <p class="prose">The Beta distribution is defined on [0, 1] — perfect for modeling <strong>proportions, probabilities, and success rates</strong>. Parameters α and β control the shape. It's the conjugate prior for the binomial.</p>
  <div class="fb"><div class="fm">f(x; α,β) = x^(α−1)·(1−x)^(β−1) / B(α,β)</div><div class="fd"><span>B(α,β)</span> = beta function (normalizing constant). α, β > 0.</div></div>
  <div class="fb c2"><div class="fm">E[X] = α/(α+β) &nbsp;&nbsp; Mode = (α−1)/(α+β−2)</div><div class="fd">Mean moves toward whichever parameter is larger.</div></div>
  <div class="va">
    <div class="vl">// Adjust α and β — see the infinite variety of shapes</div>
    <canvas id="betaCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">α</span><input type="range" id="betaA" min="0.1" max="10" step="0.1" value="2" oninput="drawBeta()"><span class="vd" id="betaAV">2.0</span></div>
      <div class="cg"><span class="cl">β</span><input type="range" id="betaB" min="0.1" max="10" step="0.1" value="5" oninput="drawBeta()"><span class="vd" id="betaBV">5.0</span></div>
    </div>
  </div>
  <div class="callout"><strong>Bayesian magic:</strong> Start with Beta(α,β) prior. Observe k successes in n trials. Posterior = Beta(α+k, β+n−k). No integration needed!</div>
  <div class="topic-nav" id="nav-beta"></div>
</div>`;
}

/* 17 — Chi-Squared Distribution */
function buildChiSquared() {
  return `<div class="topic" id="chi-squared">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Distributions</div><h2>Chi-Squared <em>Distribution</em></h2></div>
    <span class="topic-badge">Test Statistic</span>
  </div>
  <p class="sub">// Sum of squared standard normals — the distribution behind goodness-of-fit tests</p>
  <p class="prose">If Z₁,…,Zₖ are independent standard normals, then <strong>Q = ΣZᵢ²</strong> follows a χ² distribution with k degrees of freedom. Used for goodness-of-fit and independence testing.</p>
  <div class="fb"><div class="fm">χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ</div><div class="fd"><span>O</span> = observed count, <span>E</span> = expected count. Large χ² → data doesn't fit the model.</div></div>
  <div class="fb c2"><div class="fm">E[χ²] = k &nbsp;&nbsp; Var(χ²) = 2k</div><div class="fd"><span>k</span> = degrees of freedom. Distribution shifts right and widens as k increases.</div></div>
  <div class="va">
    <div class="vl">// Adjust degrees of freedom — watch the shape evolve</div>
    <canvas id="chiCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">d.f. (k)</span><input type="range" id="chiDF" min="1" max="15" step="1" value="3" oninput="drawChiSquared()"><span class="vd" id="chiDFV">3</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-chi-squared"></div>
</div>`;
}

/* 18 — Central Limit Theorem */
function buildCLT() {
  return `<div class="topic" id="clt">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Inference</div><h2>Central Limit <em>Theorem</em></h2></div>
    <span class="topic-badge">Fundamental</span>
  </div>
  <p class="sub">// The most important theorem in statistics — sample means become normal</p>
  <p class="prose">Regardless of the population distribution, the distribution of the <strong>sample mean x̄</strong> approaches a normal distribution as n increases. This is why the normal distribution appears everywhere.</p>
  <div class="fb"><div class="fm">x̄ ~ N(μ, σ²/n) &nbsp; as n → ∞</div><div class="fd">Sample mean is approximately normal. Standard error = σ/√n.</div></div>
  <div class="va">
    <div class="vl">// Pick any distribution — watch sample means become normal</div>
    <canvas id="cltCanvas" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="runCLT('uniform')">UNIFORM</button>
      <button class="btn b2" onclick="runCLT('exponential')">EXPONENTIAL</button>
      <button class="btn b3" onclick="runCLT('bimodal')">BIMODAL</button>
      <div class="cg"><span class="cl">Sample size n</span><input type="range" id="cltN" min="1" max="100" step="1" value="30" oninput="runCLT(currentCLTDist)"><span class="vd" id="cltNV">30</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Rule of thumb:</strong> n ≥ 30 is often sufficient for CLT to kick in. But for very skewed distributions, you may need larger samples.</div>
  <div class="topic-nav" id="nav-clt"></div>
</div>`;
}

/* 19 — Confidence Intervals */
function buildConfidence() {
  return `<div class="topic" id="confidence">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Inference</div><h2>Confidence <em>Intervals</em></h2></div>
    <span class="topic-badge">Estimation</span>
  </div>
  <p class="sub">// Quantifying uncertainty — "the true value is probably in this range"</p>
  <p class="prose">A <strong>95% confidence interval</strong> means: if we repeated the experiment many times, 95% of computed intervals would contain the true parameter. It does NOT mean "95% chance the parameter is in this interval."</p>
  <div class="fb"><div class="fm">CI = x̄ ± z* · (σ/√n)</div><div class="fd">z* = 1.96 for 95%. Width shrinks with √n — quadruple n to halve the CI width.</div></div>
  <div class="va">
    <div class="vl">// Repeated sampling — watch how many CIs capture the true mean</div>
    <canvas id="ciCanvas" height="250"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sample size</span><input type="range" id="ciN" min="5" max="100" step="5" value="30" oninput="drawCI()"><span class="vd" id="ciNV">30</span></div>
      <button class="btn" onclick="drawCI()">↺ RESAMPLE</button>
      <div class="cg"><span class="cl">Coverage</span><span class="vd" id="ciCoverage" style="color:var(--accent2)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Common misinterpretation:</strong> "95% confident the true mean is in [2.1, 3.5]" is technically wrong. The true mean is either in the interval or not. The 95% refers to the <em>procedure</em>, not this specific interval.</div>
  <div class="topic-nav" id="nav-confidence"></div>
</div>`;
}

/* 20 — Hypothesis Testing */
function buildHypothesis() {
  return `<div class="topic" id="hypothesis">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Inference</div><h2>Hypothesis <em>Testing</em></h2></div>
    <span class="topic-badge">Decision</span>
  </div>
  <p class="sub">// Making decisions from data — null vs alternative hypothesis</p>
  <p class="prose">Hypothesis testing asks: is the observed effect real or just noise? We assume <strong>H₀ (null — no effect)</strong> and check if data provides enough evidence to reject it in favor of <strong>H₁ (there is an effect)</strong>.</p>
  <div class="fb"><div class="fm">H₀: μ = μ₀ &nbsp;&nbsp; vs &nbsp;&nbsp; H₁: μ ≠ μ₀</div><div class="fd">Null = no change/no effect. Alternative = something interesting is happening.</div></div>
  <table class="mt">
    <thead><tr><th></th><th>H₀ true</th><th>H₀ false</th></tr></thead>
    <tbody>
      <tr><td><strong>Reject H₀</strong></td><td><span class="tag t1">Type I error (α)</span></td><td><span class="tag t2">Correct! (Power)</span></td></tr>
      <tr><td><strong>Fail to reject</strong></td><td><span class="tag t2">Correct</span></td><td><span class="tag t1">Type II error (β)</span></td></tr>
    </tbody>
  </table>
  <div class="va">
    <div class="vl">// Two distributions — see where the decision boundary falls</div>
    <canvas id="htCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Effect size</span><input type="range" id="htEffect" min="0" max="3" step="0.1" value="1.5" oninput="drawHypothesis()"><span class="vd" id="htEffectV">1.5</span></div>
      <div class="cg"><span class="cl">α level</span><input type="range" id="htAlpha" min="0.01" max="0.1" step="0.01" value="0.05" oninput="drawHypothesis()"><span class="vd" id="htAlphaV">0.05</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-hypothesis"></div>
</div>`;
}

/* 21 — P-Values */
function buildPValue() {
  return `<div class="topic" id="p-value">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Inference</div><h2><em>P-Values</em></h2></div>
    <span class="topic-badge">Significance</span>
  </div>
  <p class="sub">// The most misunderstood concept in all of statistics</p>
  <p class="prose">The p-value is the probability of seeing data <strong>at least as extreme as what was observed, assuming H₀ is true</strong>. A small p-value means the data would be unlikely under H₀.</p>
  <div class="fb"><div class="fm">p = P(data at least this extreme | H₀ true)</div><div class="fd">If p < α (typically 0.05), reject H₀. The p-value is NOT the probability H₀ is true!</div></div>
  <div class="va">
    <div class="vl">// Observed test statistic — see p-value as the tail area</div>
    <canvas id="pvalCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Test statistic z</span><input type="range" id="pvalZ" min="0" max="4" step="0.1" value="1.96" oninput="drawPValue()"><span class="vd" id="pvalZV">1.96</span></div>
      <div class="cg"><span class="cl">p-value</span><span class="vd" id="pvalP" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>P-value ≠ P(H₀ is true).</strong> P-value ≠ probability of replication. P-value ≠ effect size. A tiny p-value with a huge sample can reflect a trivially small effect. Always report effect sizes and confidence intervals alongside p-values.</div>
  <div class="topic-nav" id="nav-p-value"></div>
</div>`;
}

/* 22 — T-Test */
function buildTTest() {
  return `<div class="topic" id="t-test">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Inference</div><h2><em>T-Test</em></h2></div>
    <span class="topic-badge">Comparison</span>
  </div>
  <p class="sub">// Comparing means with small samples — Student's t-distribution</p>
  <p class="prose">When sample size is small and population σ is unknown, use the <strong>t-distribution</strong> instead of the normal. It has heavier tails, accounting for extra uncertainty in estimating σ.</p>
  <div class="fb"><div class="fm">t = (x̄ − μ₀) / (s/√n)</div><div class="fd">One-sample t-test. <span>s</span> = sample std dev, <span>n−1</span> degrees of freedom.</div></div>
  <div class="fb c2"><div class="fm">t = (x̄₁ − x̄₂) / √(s₁²/n₁ + s₂²/n₂)</div><div class="fd">Two-sample t-test (Welch's). Tests if two group means differ.</div></div>
  <div class="va">
    <div class="vl">// t-distribution vs normal — see how d.f. affects the tails</div>
    <canvas id="ttestCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Degrees of freedom</span><input type="range" id="ttDF" min="1" max="30" step="1" value="5" oninput="drawTTest()"><span class="vd" id="ttDFV">5</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="kw">from</span> scipy.stats <span class="kw">import</span> ttest_ind, ttest_1samp
t_stat, p_val = ttest_ind(group_a, group_b)     <span class="cm"># two-sample</span>
t_stat, p_val = ttest_1samp(data, popmean=<span class="st">0</span>)    <span class="cm"># one-sample</span></pre></div>
  <div class="topic-nav" id="nav-t-test"></div>
</div>`;
}

/* 23 — ANOVA */
function buildAnova() {
  return `<div class="topic" id="anova">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Inference</div><h2><em>ANOVA</em></h2></div>
    <span class="topic-badge">Comparison</span>
  </div>
  <p class="sub">// Comparing means across three or more groups — the F-test</p>
  <p class="prose">ANOVA tests whether <strong>any group means differ</strong> by comparing between-group variance to within-group variance. A large F ratio → group means are likely different.</p>
  <div class="fb"><div class="fm">F = (Between-group variance) / (Within-group variance)</div><div class="fd">F ~ F(k−1, N−k). Large F → reject H₀ that all means are equal.</div></div>
  <div class="va">
    <div class="vl">// Three groups — adjust separation to see F-statistic change</div>
    <canvas id="anovaCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Group separation</span><input type="range" id="anovaSep" min="0" max="4" step="0.1" value="1.5" oninput="drawAnova()"><span class="vd" id="anovaSepV">1.5</span></div>
      <div class="cg"><span class="cl">F-statistic</span><span class="vd" id="anovaFV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout"><strong>Post-hoc tests:</strong> ANOVA only tells you "at least one group differs." Use Tukey HSD, Bonferroni, or pairwise t-tests to find <em>which</em> groups differ.</div>
  <div class="topic-nav" id="nav-anova"></div>
</div>`;
}

/* 24 — Bayesian Inference */
function buildBayesianInference() {
  return `<div class="topic" id="bayesian-inference">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Bayesian Methods</div><h2>Bayesian <em>Inference</em></h2></div>
    <span class="topic-badge">Framework</span>
  </div>
  <p class="sub">// Updating beliefs with data — the complete Bayesian workflow</p>
  <p class="prose">Bayesian inference treats parameters as <strong>random variables with probability distributions</strong>. Start with a prior belief, observe data, and update to a posterior using Bayes' theorem.</p>
  <div class="fb"><div class="fm">P(θ|data) = P(data|θ) · P(θ) / P(data)</div><div class="fd"><span>Posterior</span> ∝ <span>Likelihood</span> × <span>Prior</span></div></div>
  <div class="va">
    <div class="vl">// Watch the posterior update as data arrives</div>
    <canvas id="bayesInfCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Observations</span><input type="range" id="biObs" min="0" max="50" step="1" value="10" oninput="drawBayesianInference()"><span class="vd" id="biObsV">10</span></div>
      <div class="cg"><span class="cl">Success rate</span><input type="range" id="biRate" min="0.1" max="0.9" step="0.05" value="0.6" oninput="drawBayesianInference()"><span class="vd" id="biRateV">0.60</span></div>
    </div>
  </div>
  <div class="steps">
    <div class="step"><div class="sn">1</div><div><h4>Choose a prior</h4><p>Express your beliefs before seeing data (e.g., Beta(1,1) = uniform = "no idea")</p></div></div>
    <div class="step"><div class="sn">2</div><div><h4>Collect data</h4><p>Observe outcomes — the likelihood P(data|θ)</p></div></div>
    <div class="step"><div class="sn">3</div><div><h4>Compute posterior</h4><p>Posterior = Prior × Likelihood (normalized). This is your updated belief.</p></div></div>
  </div>
  <div class="topic-nav" id="nav-bayesian-inference"></div>
</div>`;
}

/* 25 — Conjugate Priors */
function buildConjugatePriors() {
  return `<div class="topic" id="conjugate-priors">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Bayesian Methods</div><h2>Conjugate <em>Priors</em></h2></div>
    <span class="topic-badge">Bayesian</span>
  </div>
  <p class="sub">// When the posterior has the same family as the prior — closed-form Bayesian updates</p>
  <p class="prose">A <strong>conjugate prior</strong> is one where Prior × Likelihood yields a posterior in the same distribution family. This gives <strong>instant, closed-form updates</strong> without numerical integration.</p>
  <table class="mt">
    <thead><tr><th>Likelihood</th><th>Conjugate Prior</th><th>Posterior</th></tr></thead>
    <tbody>
      <tr><td>Bernoulli/Binomial</td><td>Beta(α,β)</td><td>Beta(α+k, β+n−k)</td></tr>
      <tr><td>Poisson</td><td>Gamma(α,β)</td><td>Gamma(α+Σx, β+n)</td></tr>
      <tr><td>Normal (known σ)</td><td>Normal(μ₀,σ₀²)</td><td>Normal(weighted avg)</td></tr>
      <tr><td>Exponential</td><td>Gamma(α,β)</td><td>Gamma(α+n, β+Σx)</td></tr>
    </tbody>
  </table>
  <div class="va">
    <div class="vl">// Beta-Binomial conjugate pair — prior → posterior updates</div>
    <canvas id="conjCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Prior α</span><input type="range" id="conjA" min="0.5" max="10" step="0.5" value="1" oninput="drawConjugate()"><span class="vd" id="conjAV">1.0</span></div>
      <div class="cg"><span class="cl">Prior β</span><input type="range" id="conjB" min="0.5" max="10" step="0.5" value="1" oninput="drawConjugate()"><span class="vd" id="conjBV">1.0</span></div>
      <div class="cg"><span class="cl">Successes k</span><input type="range" id="conjK" min="0" max="20" step="1" value="7" oninput="drawConjugate()"><span class="vd" id="conjKV">7</span></div>
      <div class="cg"><span class="cl">Trials n</span><input type="range" id="conjN" min="1" max="30" step="1" value="10" oninput="drawConjugate()"><span class="vd" id="conjNV">10</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-conjugate-priors"></div>
</div>`;
}

/* 26 — MCMC */
function buildMCMC() {
  return `<div class="topic" id="mcmc">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">26 — Bayesian Methods</div><h2><em>MCMC</em></h2></div>
    <span class="topic-badge">Sampling</span>
  </div>
  <p class="sub">// Sampling from complex posteriors when closed forms don't exist</p>
  <p class="prose">Markov Chain Monte Carlo generates samples from a target distribution by constructing a Markov chain whose <strong>stationary distribution is the posterior</strong>. After burn-in, samples approximate the posterior.</p>
  <div class="fb"><div class="fm">Metropolis: accept θ' with prob min(1, P(θ')/P(θ))</div><div class="fd">Propose a new point θ'. Accept if it has higher posterior density; sometimes accept even if lower.</div></div>
  <div class="va">
    <div class="vl">// Metropolis-Hastings sampling — watch the chain explore</div>
    <canvas id="mcmcCanvas" height="240"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="animMCMC()">▶ SAMPLE</button>
      <button class="btn" onclick="resetMCMC()">↺ RESET</button>
      <div class="cg"><span class="cl">Samples</span><span class="vd" id="mcmcCount" style="color:var(--accent)">0</span></div>
    </div>
  </div>
  <div class="callout"><strong>Diagnostics:</strong> Check trace plots for mixing (no stuck regions). Check R̂ ≈ 1 for convergence. Discard the burn-in period. Run multiple chains.</div>
  <div class="topic-nav" id="nav-mcmc"></div>
</div>`;
}

/* 27 — Hierarchical Models */
function buildHierarchical() {
  return `<div class="topic" id="hierarchical">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">27 — Bayesian Methods</div><h2>Hierarchical <em>Models</em></h2></div>
    <span class="topic-badge">Multilevel</span>
  </div>
  <p class="sub">// Sharing information across groups via partial pooling</p>
  <p class="prose">Hierarchical (multilevel) models have <strong>parameters that depend on hyperparameters</strong>. Groups share a common prior, enabling partial pooling — a principled middle ground between ignoring groups and treating them independently.</p>
  <div class="fb"><div class="fm">θᵢ ~ N(μ, τ²) &nbsp;&nbsp; yᵢⱼ ~ N(θᵢ, σ²)</div><div class="fd">Group means θᵢ drawn from a shared distribution. Hyperparameters μ, τ learned from all data.</div></div>
  <div class="va">
    <div class="vl">// Partial pooling — estimates shrink toward the grand mean</div>
    <canvas id="hierCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Between-group τ</span><input type="range" id="hierTau" min="0.1" max="3" step="0.1" value="1" oninput="drawHierarchical()"><span class="vd" id="hierTauV">1.0</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Shrinkage:</strong> Groups with less data get pulled more toward the grand mean. Groups with lots of data stay near their own estimates. This is rational — less data = more uncertainty = lean on the group average.</div>
  <div class="topic-nav" id="nav-hierarchical"></div>
</div>`;
}

/* 28 — Bayesian Regression */
function buildBayesianRegression() {
  return `<div class="topic" id="bayesian-regression">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">28 — Bayesian Methods</div><h2>Bayesian <em>Regression</em></h2></div>
    <span class="topic-badge">Regression</span>
  </div>
  <p class="sub">// Linear regression with uncertainty quantification — distributions over weights</p>
  <p class="prose">Instead of finding a single best-fit line, Bayesian regression gives a <strong>distribution over possible lines</strong>. More data = narrower distribution. Uncertainty is automatically quantified.</p>
  <div class="fb"><div class="fm">P(w|data) ∝ P(data|w) · P(w)</div><div class="fd">Posterior over weights = likelihood × prior. Predictive uncertainty = integration over weights.</div></div>
  <div class="va">
    <div class="vl">// Click to add data points — watch the posterior tighten</div>
    <canvas id="bayRegCanvas" height="250"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="resetBayReg()">↺ RESET</button>
      <span style="font-family:var(--mono);font-size:10px;color:var(--muted)">Click canvas to add data</span>
      <div class="cg"><span class="cl">Data points</span><span class="vd" id="bayRegN" style="color:var(--accent)">0</span></div>
    </div>
  </div>
  <div class="topic-nav" id="nav-bayesian-regression"></div>
</div>`;
}

/* 29 — A/B Testing */
function buildABTesting() {
  return `<div class="topic" id="ab-testing">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">29 — Applied</div><h2>A/B <em>Testing</em></h2></div>
    <span class="topic-badge">Experiment</span>
  </div>
  <p class="sub">// Running controlled experiments to measure the impact of changes</p>
  <p class="prose">A/B testing randomly assigns users to control (A) or treatment (B) and measures whether the treatment has a <strong>statistically significant effect</strong>. The foundation of data-driven product development.</p>
  <div class="fb"><div class="fm">n ≥ 2 · (z_α/2 + z_β)² · σ² / δ²</div><div class="fd">Minimum sample size per group. <span>δ</span> = minimum detectable effect. <span>α</span> = 0.05, <span>β</span> = 0.2 typical.</div></div>
  <div class="va">
    <div class="vl">// Simulate an A/B test — watch results accumulate</div>
    <canvas id="abCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">True uplift %</span><input type="range" id="abUplift" min="0" max="10" step="0.5" value="3" oninput="drawABTest()"><span class="vd" id="abUpliftV">3.0%</span></div>
      <div class="cg"><span class="cl">Samples/group</span><input type="range" id="abN" min="50" max="2000" step="50" value="500" oninput="drawABTest()"><span class="vd" id="abNV">500</span></div>
      <button class="btn" onclick="drawABTest()">↺ RESIMULATE</button>
    </div>
  </div>
  <div class="steps">
    <div class="step"><div class="sn">1</div><div><h4>Power analysis</h4><p>Calculate required sample size before running the test</p></div></div>
    <div class="step"><div class="sn">2</div><div><h4>Randomize</h4><p>Randomly assign users to A (control) or B (treatment)</p></div></div>
    <div class="step"><div class="sn">3</div><div><h4>Collect data</h4><p>Run until pre-planned sample size is reached. No peeking!</p></div></div>
    <div class="step"><div class="sn">4</div><div><h4>Analyze</h4><p>Compute test statistic and p-value. Report effect size + CI.</p></div></div>
  </div>
  <div class="callout warn"><strong>Peeking problem:</strong> Checking results repeatedly inflates Type I error. If you check 10 times at α=0.05, your effective α ≈ 0.19. Use sequential testing or fixed-horizon designs.</div>
  <div class="topic-nav" id="nav-ab-testing"></div>
</div>`;
}

/* 30 — Bootstrap */
function buildBootstrap() {
  return `<div class="topic" id="bootstrap">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">30 — Applied</div><h2><em>Bootstrap</em></h2></div>
    <span class="topic-badge">Resampling</span>
  </div>
  <p class="sub">// Estimating distributions by resampling — no parametric assumptions needed</p>
  <p class="prose">The bootstrap creates many <strong>resampled datasets</strong> (sampling with replacement from the original), computes the statistic on each, and uses the distribution of those statistics for inference.</p>
  <div class="fb"><div class="fm">For b = 1 to B: sample n points with replacement → compute θ̂_b</div><div class="fd">The distribution of {θ̂₁, …, θ̂_B} estimates the sampling distribution of θ̂.</div></div>
  <div class="va">
    <div class="vl">// Bootstrap distribution of the mean — B resamples</div>
    <canvas id="bootCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">B resamples</span><input type="range" id="bootB" min="100" max="5000" step="100" value="1000" oninput="drawBootstrap()"><span class="vd" id="bootBV">1000</span></div>
      <button class="btn" onclick="drawBootstrap()">↺ RESAMPLE</button>
      <div class="cg"><span class="cl">95% CI</span><span class="vd" id="bootCI" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># NumPy bootstrap</span>
data = np.array([<span class="st">3.1</span>, <span class="st">4.2</span>, <span class="st">2.8</span>, <span class="st">5.1</span>, <span class="st">3.9</span>, <span class="st">4.4</span>])
B = <span class="st">10000</span>
means = [np.mean(np.random.choice(data, size=len(data), replace=<span class="st">True</span>)) <span class="kw">for</span> _ <span class="kw">in</span> range(B)]
ci = np.percentile(means, [<span class="st">2.5</span>, <span class="st">97.5</span>])</pre></div>
  <div class="topic-nav" id="nav-bootstrap"></div>
</div>`;
}

/* 31 — Power Analysis */
function buildPowerAnalysis() {
  return `<div class="topic" id="power-analysis">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">31 — Applied</div><h2>Power <em>Analysis</em></h2></div>
    <span class="topic-badge">Design</span>
  </div>
  <p class="sub">// How many samples do you need to detect a real effect?</p>
  <p class="prose"><strong>Statistical power</strong> = P(reject H₀ | H₁ is true). Typically target 80%. Power depends on effect size, sample size, significance level, and variance. Trade-offs everywhere.</p>
  <div class="fb"><div class="fm">Power = 1 − β = P(reject H₀ | H₁ true)</div><div class="fd">β = Type II error (missing a real effect). Power = probability of catching it.</div></div>
  <div class="va">
    <div class="vl">// Power curves — how sample size affects detection ability</div>
    <canvas id="powerCanvas" height="230"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Effect size d</span><input type="range" id="powEffect" min="0.1" max="1.5" step="0.1" value="0.5" oninput="drawPower()"><span class="vd" id="powEffectV">0.50</span></div>
      <div class="cg"><span class="cl">n per group</span><input type="range" id="powN" min="5" max="200" step="5" value="50" oninput="drawPower()"><span class="vd" id="powNV">50</span></div>
      <div class="cg"><span class="cl">Power</span><span class="vd" id="powVal" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Cohen's conventions:</strong> d=0.2 (small), d=0.5 (medium), d=0.8 (large). Most published "surprising" findings have small effect sizes, requiring hundreds of samples.</div>
  <div class="topic-nav" id="nav-power-analysis"></div>
</div>`;
}

/* 32 — MLE (Statistics) */
function buildMLEStats() {
  return `<div class="topic" id="mle-stats">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">32 — Applied</div><h2>MLE <em>(Statistics)</em></h2></div>
    <span class="topic-badge">Estimation</span>
  </div>
  <p class="sub">// Finding the parameters that make observed data most probable</p>
  <p class="prose">Maximum Likelihood Estimation finds <strong>parameter values θ that maximise the likelihood function</strong> — the probability of the observed data given the parameters.</p>
  <div class="fb"><div class="fm">θ̂_MLE = argmax_θ L(θ) = argmax_θ Π P(xᵢ | θ)</div><div class="fd">In practice: argmax log L(θ) = argmax Σ log P(xᵢ | θ).</div></div>
  <div class="va">
    <div class="vl">// MLE for normal distribution — find the best-fit μ and σ</div>
    <canvas id="mleCanvas" height="220"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Estimated μ</span><input type="range" id="mleMu" min="-3" max="3" step="0.1" value="0" oninput="drawMLEStats()"><span class="vd" id="mleMuV">0.0</span></div>
      <div class="cg"><span class="cl">Log-likelihood</span><span class="vd" id="mleLL" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout"><strong>Properties of MLE:</strong> Consistent (converges to true θ as n→∞), asymptotically normal, asymptotically efficient (achieves Cramér-Rao lower bound). But can overfit with small samples — Bayesian methods add regularization via priors.</div>
  <div class="topic-nav" id="nav-mle-stats"></div>
</div>`;
}

/* 33 — Correlation vs Causation */
function buildCorrelationVsCausation() {
  return `<div class="topic" id="correlation-vs-causation">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">33 — Applied</div><h2>Correlation vs <em>Causation</em></h2></div>
    <span class="topic-badge">Causal Inference</span>
  </div>
  <p class="sub">// Why ice cream sales don't cause drowning — the most important lesson in data science</p>
  <p class="prose">Correlation measures association. Causation requires <strong>intervention changes the outcome</strong>. Confounders create spurious correlations. Randomized experiments (A/B tests) establish causation; observational data almost never can.</p>
  <div class="fb"><div class="fm">X → Y (causal) &nbsp;&nbsp; vs &nbsp;&nbsp; X ← Z → Y (confounded)</div><div class="fd">Confounders create correlation without causation. Control for Z to reveal the true relationship.</div></div>
  <div class="va">
    <div class="vl">// Spurious correlation — a confounding variable creates artificial association</div>
    <canvas id="causalCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Confounder strength</span><input type="range" id="causalStr" min="0" max="1" step="0.05" value="0.8" oninput="drawCausal()"><span class="vd" id="causalStrV">0.80</span></div>
      <div class="cg"><span class="cl">Obs. r(X,Y)</span><span class="vd" id="causalR" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout warn"><strong>Remember:</strong> Randomization breaks confounders. In an A/B test, treatment assignment is independent of all confounders — that's what makes it the gold standard.</div>
  <div class="topic-nav" id="nav-correlation-vs-causation"></div>
</div>`;
}

/* 34 — Simpson's Paradox */
function buildSimpsonsParadox() {
  return `<div class="topic" id="simpsons-paradox">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">34 — Applied</div><h2>Simpson's <em>Paradox</em></h2></div>
    <span class="topic-badge">Paradox</span>
  </div>
  <p class="sub">// When trends reverse upon aggregation — a paradox that catches everyone</p>
  <p class="prose">Simpson's paradox occurs when a trend that appears in several subgroups <strong>reverses when the groups are combined</strong>. It's caused by a lurking variable that creates unequal group sizes and confounds the relationship.</p>
  <div class="va">
    <div class="vl">// Treatment success rates — overall vs by subgroup</div>
    <canvas id="simpsonCanvas" height="260"></canvas>
    <div class="ctrl">
      <button class="btn" onclick="drawSimpson('combined')">COMBINED</button>
      <button class="btn b2" onclick="drawSimpson('subgroups')">BY SUBGROUP</button>
      <span id="simpsonMsg" style="font-family:var(--mono);font-size:11px;color:var(--muted);margin-left:8px"></span>
    </div>
  </div>
  <div class="callout"><strong>Classic example (UC Berkeley):</strong> Overall, women had lower admission rates. But in every department, women were admitted at equal or higher rates. The paradox: women applied to more competitive departments.</div>
  <div class="topic-nav" id="nav-simpsons-paradox"></div>
</div>`;
}
