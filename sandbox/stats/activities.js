/* ═══════════════════════════════════════════════════════════════
   Stats Lab — Activities Data & Content Builder
   Interactive statistics sandbox activities
   ═══════════════════════════════════════════════════════════════ */

/* ── Formula Decoder helper ─────────────────────────────────── */
function T(symbol, def) {
  const safe = def.replace(/"/g, '&quot;');
  return `<span class="fd-term" data-def="${safe}" data-sym="${symbol}">${symbol}</span>`;
}

/* ── Narrator ────────────────────────────────────────────────── */
const NARRATIONS = {
  'distribution-explorer': [
    'A probability distribution describes all possible outcomes of a random experiment and how likely each one is.',
    'The normal distribution is the famous bell curve. It appears everywhere in nature — heights, test scores, measurement errors. Mean (μ) sets the centre; standard deviation (σ) controls the width.',
    'The exponential distribution models wait times: how long until the next bus, the next earthquake. Most waits are short; a few are very long.',
    'The CDF (Cumulative Distribution Function) answers: "What is the probability of getting a value less than or equal to x?" It always starts at 0 and climbs to 1.',
  ],
  'hypothesis-testing': [
    'Hypothesis testing answers the question: "Could this result just be random chance?" We start by assuming nothing is happening — the null hypothesis (H₀).',
    'We collect data and calculate a p-value — the probability of seeing a result this extreme if H₀ were actually true. A small p-value means the data is hard to explain by chance.',
    'If p < 0.05 (alpha), the result is "statistically significant". We reject H₀ — but significance does not mean importance.',
    'Power is the probability of detecting a real effect when it exists. To increase power: collect more data, look for larger effects, or raise alpha.',
  ],
  'correlation-playground': [
    'Correlation measures how two variables move together. Pearson r ranges from −1 (perfect opposite) through 0 (no pattern) to +1 (perfect together).',
    'Place points in a diagonal line — r climbs toward 1. Add points going the other way — r drops. Scatter them randomly — r approaches 0.',
    'One outlier can dramatically change r. A single extreme point can swing a 0.2 correlation to 0.7.',
    'Important reminder: correlation does not equal causation. High r means the variables move together — not that one causes the other.',
  ],
  'central-limit-theorem': [
    'The Central Limit Theorem (CLT) is one of statistics\' greatest surprises: no matter how weird your population looks, the distribution of sample means always becomes normal.',
    'Draw samples from a skewed or uniform population. Record each sample\'s mean. After enough samples, the histogram of those means becomes a bell curve.',
    'Larger sample sizes make the bell narrower and taller. The standard error (σ/√n) tells you how tight the bell will be.',
    'This is why averages are so reliable in science and engineering — the CLT is working behind the scenes every time we compute a mean.',
  ],
  'bayesian-updater': [
    'Bayesian reasoning starts with a belief (prior), collects evidence, and updates to a new belief (posterior). It formalises how we learn from experience.',
    'We\'re estimating whether a coin is fair. Our starting distribution: equal belief in all fairness values from 0 to 1 — we know nothing yet.',
    'Each coin flip is evidence. Heads nudges the distribution toward "probably heads-biased"; tails nudges it toward "probably tails-biased".',
    'After many flips, the distribution peaks near the true probability and the uncertainty shrinks. More data = sharper, more confident beliefs.',
  ],
  'regression-diagnostics': [
    'Fitting a regression line is step one. Step two — just as important — is checking whether the model\'s assumptions actually hold.',
    'Residuals vs fitted: the gap between each prediction and the real value. Random scatter = good. A curve = the relationship is not linear.',
    'The Q-Q plot checks if residuals are normally distributed. Points on the diagonal = good. Bends at the ends = heavy tails or skew.',
    'R² tells you the fraction of variance explained. High R² is good — but always inspect the diagnostic plots too. A high R² can mask serious problems.',
  ],
  'probability-calculator': [
    'Bayes\' Theorem calculates the probability of a cause, given observed evidence. Classic question: if a test is positive, what\'s the actual chance of having the condition?',
    'P(A) is the prior — how common is the condition in the general population? Even a 99%-accurate test can mislead if the condition is rare.',
    'P(B|A) is the true positive rate: how often does the test detect the condition correctly? P(B|¬A) is the false positive rate: how often does it fire when there is no condition?',
    'The result P(A|B) is often surprising. A 1-in-1000 condition can yield only a 1-in-50 true positive rate even with a highly accurate test. This is the base rate fallacy.',
  ],
  'anova-visualizer': [
    'ANOVA tests whether multiple groups have the same mean. For example: does fertiliser A, B, or C produce different crop yields?',
    'The F-statistic compares two things: between-group variance (how much group means differ) vs within-group variance (how spread out points are inside each group).',
    'Large F means the group differences are big relative to the noise. Small F means any observed differences could easily be random.',
    'p < 0.05 means at least one group differs significantly from the others. But ANOVA doesn\'t tell you which group — you need follow-up tests for that.',
  ],
  'confidence-intervals': [
    'A 95% confidence interval is a range calculated from sample data. If you repeated the experiment many times, 95% of these intervals would contain the true population mean.',
    'Watch intervals appear one by one. Blue = the interval captured the true mean (μ). Red = it missed.',
    'After many intervals, about 95% should be blue. This is the frequentist guarantee — not about one specific interval, but about the method over the long run.',
    'Larger samples → narrower intervals. Higher confidence level (99%) → wider intervals. There is always a tradeoff between precision and certainty.',
  ],
  'chi-square-test': [
    'The chi-square test asks: do the observed counts differ meaningfully from what we would expect by chance? For example: is this die fair?',
    'Expected counts come from theory (or a null model). The χ² statistic measures total deviation: larger deviations → larger χ².',
    'Small χ² means the data fits the expected pattern well. Large χ² means something is probably off. We compare to a critical value to decide.',
    'Standardised residuals pinpoint which categories are most unusual. A residual beyond ±2 is the usual flag for "something odd here".',
  ],
  'survival-curves': [
    'Survival analysis models "how long until an event occurs?" The event might be equipment failure, disease recovery, or customer churn.',
    'The Kaplan-Meier curve is a staircase that drops each time an event occurs. It estimates the probability of still "surviving" beyond any given point in time.',
    'Censored observations (+ marks) are subjects who left the study before the event — we know they survived at least this long, but not beyond.',
    'Compare two groups: do their survival curves separate? A wide gap means meaningfully different event rates between the groups.',
  ],
  'bootstrap-resampler': [
    'Bootstrap resampling answers: how reliable is our estimate? The key insight: treat your own sample as if it were the whole population.',
    'Each bootstrap resample draws n values with replacement from your original data. Some points appear twice; some not at all.',
    'Compute the sample mean for each resample and plot all the means. This histogram approximates the true sampling distribution — without any formulas.',
    'The 2.5th and 97.5th percentiles of the histogram form a 95% confidence interval. It works for any statistic and any population shape.',
  ],
};

const _narratorStep = {};
function showNarration(topicId, stepIdx) {
  const steps = NARRATIONS[topicId];
  if (!steps) return;
  const bar = document.getElementById('narrator-' + topicId);
  if (!bar) return;
  _narratorStep[topicId] = stepIdx;
  bar.classList.add('active');
  bar.querySelector('.narrator-step').textContent = `Step ${stepIdx + 1} of ${steps.length}`;
  bar.querySelector('.narrator-text').textContent = steps[stepIdx] || '';
  bar.querySelectorAll('.narrator-dot').forEach((d, i) => d.classList.toggle('active', i === stepIdx));
  const btn = bar.querySelector('.narrator-next');
  if (btn) btn.textContent = stepIdx < steps.length - 1 ? 'Next →' : '✓ Done';
}
function hideNarration(topicId) {
  const bar = document.getElementById('narrator-' + topicId);
  if (bar) bar.classList.remove('active');
}
function buildNarratorBar(topicId) {
  const dots = (NARRATIONS[topicId] || []).map(() => '<div class="narrator-dot"></div>').join('');
  return `
    <div class="narrator-bar" id="narrator-${topicId}">
      <div class="narrator-icon">💡</div>
      <div class="narrator-body">
        <div class="narrator-step"></div>
        <div class="narrator-text"></div>
        <div class="narrator-dots">${dots}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0;">
        <button class="narrator-next" onclick="(function(){const steps=NARRATIONS['${topicId}'];const cur=_narratorStep['${topicId}']||0;if(cur<steps.length-1){showNarration('${topicId}',cur+1);}else{hideNarration('${topicId}');}})()">Next →</button>
        <button class="narrator-close" onclick="hideNarration('${topicId}')" title="Close">✕</button>
      </div>
    </div>`;
}

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


/* ── How-it-Works explainer panels ── */
const EXPLAINERS = {
  'distribution-explorer': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Probability Distributions</h3>
      <p>A probability distribution describes how likely each outcome is. The <strong>PDF</strong> (probability density function) shows the shape; the <strong>CDF</strong> shows the cumulative probability up to a value. Different distributions model different real-world processes.</p>
      <div class="exp-formula">Normal ${T('PDF','Probability Density Function — shows the shape of the distribution. The height tells you how likely values near that point are.')}: ${T('f(x)','The density at value x — proportional to the probability of being near x.')} = (1 / ${T('σ','Sigma — the standard deviation: how spread out the distribution is.')}√2π) ${T('e','Euler\'s number (≈2.718) — the base of natural exponentials.')}^(−(${T('x','A value on the x-axis.')}−${T('μ','Mu — the mean: the centre of the bell curve.')})² / 2σ²)</div>
      <p>Parameters control everything: &mu; shifts the centre, &sigma; controls the spread. Uniform gives equal probability; Exponential models wait times; Poisson counts rare events.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Increasing &sigma; flattens and widens the bell curve \u2014 more uncertainty.</li>
        <li>The exponential distribution has a long right tail; increasing &lambda; compresses it.</li>
        <li>Switch to CDF view \u2014 it always rises from 0 to 1, regardless of shape.</li>
        <li>More samples make the histogram converge toward the theoretical PDF.</li>
      </ul>
    </details>`,

  'hypothesis-testing': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Hypothesis Testing &amp; p-Values</h3>
      <p>Hypothesis testing asks: "Is the observed effect real or just random noise?" We start with a null hypothesis H\u2080 (no effect), collect data, and compute a <strong>p-value</strong> \u2014 the probability of seeing data this extreme if H\u2080 were true.</p>
      <div class="exp-formula">Reject ${T('H\u2080','Null hypothesis \u2014 the assumption that nothing is happening, no effect, no difference.')} when ${T('p-value','The probability of seeing a result this extreme if H\u2080 were actually true. Smaller = stronger evidence against H\u2080.')} &lt; ${T('\u03b1','Alpha \u2014 the significance level. Typically 0.05. If p < \u03b1, we call the result statistically significant.')} (typically 0.05)</div>
      <p><strong>Type I error</strong> rejects a true H\u2080 (false positive, rate = &alpha;). <strong>Type II error</strong> fails to reject a false H\u2080 (false negative). Power = 1 &minus; &beta; is the chance of detecting a real effect.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Larger sample sizes make the test more sensitive \u2014 it can detect smaller effects.</li>
        <li>A larger effect size makes the two distributions less overlapping.</li>
        <li>Lowering &alpha; makes it harder to reject H\u2080 but reduces false positives.</li>
        <li>Running 100 tests shows that ~5% falsely reject even when H\u2080 is true.</li>
      </ul>
    </details>`,

  'correlation-playground': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Pearson Correlation</h3>
      <p>The Pearson correlation coefficient <strong>r</strong> measures the strength and direction of the linear relationship between two variables, ranging from &minus;1 (perfect negative) through 0 (no linear relationship) to +1 (perfect positive).</p>
      <div class="exp-formula">r = &Sigma;(x&#x1D62; &minus; x\u0304)(y&#x1D62; &minus; y\u0304) / &radic;[&Sigma;(x&#x1D62; &minus; x\u0304)&sup2; &Sigma;(y&#x1D62; &minus; y\u0304)&sup2;]</div>
      <p>R&sup2; is the square of r \u2014 it tells you what fraction of the variance in y is explained by x. A single outlier can dramatically change r.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Points along a straight line give |r| close to 1; scattered points give r near 0.</li>
        <li>A circle or quadratic pattern can have r &asymp; 0 despite a clear relationship.</li>
        <li>Moving a single outlier far from the cluster can flip the sign of r.</li>
        <li>The regression line slope is proportional to r &times; (SD_y / SD_x).</li>
      </ul>
    </details>`,

  'central-limit-theorem': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>The Central Limit Theorem</h3>
      <p>No matter what the population looks like \u2014 uniform, skewed, bimodal \u2014 the distribution of <strong>sample means</strong> approaches a normal distribution as the sample size n grows. This is arguably the most important result in statistics.</p>
      <div class="exp-formula">${T('SE','Standard Error \u2014 how spread out the sample means are. Smaller SE = more precise estimates.')} = ${T('\u03c3','Sigma \u2014 the population standard deviation.')} / \u221a${T('n','The sample size. Larger n gives a smaller SE \u2014 averages become more reliable.')} &emsp;\u2014&emsp; sampling distribution \u2192 ${T('N(\u03bc, SE\u00b2)','Normal distribution centred at the true mean \u03bc, with spread equal to SE.')}</div>
      <p>The standard error (SE) shrinks with larger n, meaning sample means cluster more tightly around the true mean. With n &ge; 30, the approximation is usually excellent.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Start with a skewed or bimodal population and watch sample means form a bell curve.</li>
        <li>Increasing n from 1 to 30 dramatically changes the sampling distribution shape.</li>
        <li>The SE shrinks \u2014 larger samples give more precise estimates of the true mean.</li>
        <li>With n = 1 the sampling distribution mirrors the population; with n = 50 it is nearly Gaussian.</li>
      </ul>
    </details>`,

  'bayesian-updater': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Bayesian Inference</h3>
      <p>Bayesian inference updates a <strong>prior</strong> belief about a parameter (here, coin fairness) with observed data to produce a <strong>posterior</strong> belief. The Beta distribution is the conjugate prior for Bernoulli data, making updates elegant: each head adds 1 to &alpha;, each tail adds 1 to &beta;.</p>
      <div class="exp-formula">Posterior: Beta(&alpha; + heads, &beta; + tails) &emsp;\u2014&emsp; Mean = &alpha; / (&alpha; + &beta;)</div>
      <p>A flat prior (&alpha; = &beta; = 1) lets the data speak; a strong prior resists early observations. With enough flips, the posterior converges regardless of the prior.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The prior curve shifts and narrows with each flip \u2014 uncertainty decreases as data accumulates.</li>
        <li>A strong prior (high &alpha; or &beta;) takes many flips to overcome.</li>
        <li>The posterior mean converges toward the true probability as flips increase.</li>
        <li>With 100+ flips, the prior becomes negligible \u2014 the data dominates.</li>
      </ul>
    </details>`,

  'regression-diagnostics': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Regression Diagnostics</h3>
      <p>Fitting a regression is only half the job \u2014 the other half is checking that the model assumptions hold. The four diagnostic plots reveal <strong>non-linearity</strong>, <strong>non-normality</strong>, <strong>heteroscedasticity</strong>, and <strong>autocorrelation</strong> in the residuals.</p>
      <div class="exp-formula">R&sup2; = 1 &minus; SS<sub>res</sub> / SS<sub>tot</sub> &emsp;|&emsp; Durbin-Watson &asymp; 2 means no autocorrelation</div>
      <p>High R&sup2; does not guarantee a good model \u2014 always inspect residuals. A curved pattern in the residual plot signals a missing nonlinear term.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Linear data produces randomly scattered residuals \u2014 no visible pattern.</li>
        <li>Quadratic or sine data creates a clear U-shape or wave in the residuals.</li>
        <li>Points deviating from the Q-Q line indicate non-normal residuals.</li>
        <li>Durbin-Watson far from 2 signals autocorrelation \u2014 the residuals are not independent.</li>
      </ul>
    </details>`,

  'probability-calculator': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Bayes\u2019 Theorem</h3>
      <p>Bayes\u2019 theorem calculates the probability of an event given evidence. The classic example: even with a 99%-accurate test, a rare disease (low base rate) means most positive results are <strong>false positives</strong>.</p>
      <div class="exp-formula">${T('P(A|B)','The probability of A given that B has occurred — this is what we want to know. Example: given a positive test, what is the chance of having the disease?')} = ${T('P(B|A)','Likelihood — how probable is the evidence B if A is true? Example: how often does the test fire when the disease is present?')} · ${T('P(A)','Prior — the base rate. How common is A in the general population before seeing any evidence?')} / ${T('P(B)','The total probability of observing B, across all possible causes.')}</div>
      <p>The prior P(A) is your starting belief. The likelihood P(B|A) is how likely the evidence is if A is true. P(B) normalises everything. The likelihood ratio P(B|A) / P(B|&not;A) captures the diagnostic strength of the evidence.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Set a rare prior P(A) = 0.01 and watch how even strong evidence keeps P(A|B) surprisingly low.</li>
        <li>A high likelihood ratio dramatically shifts the posterior toward A.</li>
        <li>The tree diagram shows how the total probability P(B) splits across the A and &not;A branches.</li>
        <li>P(A|B) + P(&not;A|B) always equals 1 \u2014 the evidence supports one or the other.</li>
      </ul>
    </details>`,

  'anova-visualizer': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>One-Way ANOVA</h3>
      <p>ANOVA (Analysis of Variance) tests whether the means of multiple groups are all equal. It compares the <strong>between-group variance</strong> (how much group means differ) to the <strong>within-group variance</strong> (how much points scatter within each group).</p>
      <div class="exp-formula">F = MS<sub>between</sub> / MS<sub>within</sub> &emsp;\u2014&emsp; large F &rArr; groups likely differ</div>
      <p>A large F-statistic means the group differences are big relative to random scatter. If p &lt; 0.05, at least one group mean is significantly different.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Increasing the effect size separates group means and drives F upward.</li>
        <li>Higher within-group spread obscures differences \u2014 F drops.</li>
        <li>More points per group increase statistical power and tighten error bars.</li>
        <li>More groups increase degrees of freedom but require a larger F for significance.</li>
      </ul>
    </details>`,

  'confidence-intervals': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Confidence Intervals</h3>
      <p>A confidence interval gives a range of plausible values for the true population mean (&mu;). A 95% CI means that if you repeated sampling many times, about 95% of the intervals would capture the true &mu;.</p>
      <div class="exp-formula">CI = x\u0304 &plusmn; z* &middot; (&sigma; / &radic;n)</div>
      <p>Width depends on confidence level, sample size, and population spread. Larger n or lower confidence level produces narrower intervals. Each interval either captures &mu; or misses it \u2014 the percentage is a long-run property.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Blue intervals captured the true mean; red ones missed it.</li>
        <li>Coverage should hover around the nominal level (e.g. 95%) as you add samples.</li>
        <li>Increasing n makes intervals narrower \u2014 higher precision.</li>
        <li>Switching from 95% to 99% widens every interval but reduces the miss rate.</li>
      </ul>
    </details>`,

  'chi-square-test': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Chi-Square Goodness of Fit</h3>
      <p>The chi-square test checks if observed frequencies differ significantly from expected frequencies. It is used for categorical data \u2014 how well do observed counts match a theoretical distribution?</p>
      <div class="exp-formula">${T('χ²','Chi-squared — the total deviation between observed and expected counts. Larger = bigger discrepancy.')} = ${T('Σ','Sum over all categories.')} (${T('Oᵢ','Observed count for category i — what we actually measured.')} − ${T('Eᵢ','Expected count for category i — what we\'d predict under the null hypothesis.')})² / ${T('Eᵢ','Dividing by the expected count normalises the squared gap — categories with more data contribute proportionally.')}</div>
      <p>Large &chi;&sup2; means a big discrepancy between observed and expected. Standardised residuals pinpoint which categories deviate most. The degrees of freedom = number of categories &minus; 1.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>High skew pushes counts away from uniform, making &chi;&sup2; large and rejection likely.</li>
        <li>Standardised residuals above |2| flag the category driving the significance.</li>
        <li>More categories add nuance but require more observations for reliable results.</li>
        <li>With low skew and many observations, the test often fails to reject \u2014 counts look uniform.</li>
      </ul>
    </details>`,

  'survival-curves': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Kaplan-Meier Survival Analysis</h3>
      <p>Survival analysis models time-to-event data \u2014 how long until an event (death, failure, churn) occurs. The <strong>Kaplan-Meier estimator</strong> produces a step function that drops at each observed event, accounting for censored subjects (still alive at observation end).</p>
      <div class="exp-formula">S(t) = &Pi;<sub>t&#x1D62;&le;t</sub> (1 &minus; d&#x1D62; / n&#x1D62;)</div>
      <p>The hazard rate &lambda; controls how quickly events occur. Higher hazard means steeper decline. The median survival time is where S(t) = 0.5.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>Well-separated curves indicate meaningfully different survival between groups.</li>
        <li>The + marks are censored subjects \u2014 they were still event-free when observation ended.</li>
        <li>A low hazard rate produces a gentle decline; a high rate causes rapid drops.</li>
        <li>More patients produce smoother step functions with tighter confidence.</li>
      </ul>
    </details>`,

  'bootstrap-resampler': `
    <details class="sandbox-explainer">
      <summary>How it Works</summary>
      <h3>Bootstrap Resampling</h3>
      <p>Bootstrapping estimates the sampling distribution of a statistic (e.g. the mean) by repeatedly resampling <strong>with replacement</strong> from the observed data. Each resample has the same size as the original but different composition \u2014 some points repeat, others are omitted.</p>
      <div class="exp-formula">95% CI = [percentile 2.5%, percentile 97.5%] of bootstrap means</div>
      <p>The beauty of bootstrap is that it requires no distributional assumptions \u2014 it works for any statistic and any population shape. With enough resamples, the bootstrap distribution approximates the true sampling distribution.</p>
      <h3>What to Observe</h3>
      <ul>
        <li>The histogram of bootstrap means converges to a bell shape \u2014 the CLT in action.</li>
        <li>More resamples smooth the distribution and stabilise the CI bounds.</li>
        <li>Larger sample size n produces a narrower bootstrap distribution.</li>
        <li>Even for skewed populations, the distribution of means is nearly Gaussian with enough data.</li>
      </ul>
    </details>`,
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
    html += buildNarratorBar(id);
    html += EXPLAINERS[id] || '';

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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachDistribution()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachHypothesis()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachCorrelation()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachCLT()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachBayes()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachRegDiag()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachBayesTheorem()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachAnova()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachCI()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachChiSquare()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachSurvival()">🎓 Teach Me</button>
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
        <button class="sb-btn teach-btn" onclick="ENGINE.teachBootstrap()">🎓 Teach Me</button>
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
