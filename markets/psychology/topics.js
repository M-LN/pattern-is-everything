/* ═══════════════════════════════════════════════════════════════
   Market Psychology — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-biases', title:'Cognitive Biases', topics:['home','confirmation-bias','anchoring','recency-bias','availability-heuristic','hindsight-bias'] },
  { id:'sec-emotional', title:'Emotional Drivers', topics:['fear-and-greed','loss-aversion','regret-aversion','overconfidence','disposition-effect'] },
  { id:'sec-herd', title:'Herd & Social', topics:['herd-behavior','fomo','social-proof','contrarian-thinking','information-cascades'] },
  { id:'sec-decision', title:'Decision Traps', topics:['sunk-cost-fallacy','gambler-fallacy','framing-effect','mental-accounting','status-quo-bias'] },
  { id:'sec-cycles', title:'Market Cycles', topics:['market-sentiment-cycle','accumulation-distribution','euphoria-panic','smart-money-dumb-money','mean-reversion-psychology'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'confirmation-bias':'Confirmation Bias',
  anchoring:'Anchoring',
  'recency-bias':'Recency Bias',
  'availability-heuristic':'Availability Heuristic',
  'hindsight-bias':'Hindsight Bias',
  'fear-and-greed':'Fear & Greed',
  'loss-aversion':'Loss Aversion',
  'regret-aversion':'Regret Aversion',
  overconfidence:'Overconfidence',
  'disposition-effect':'Disposition Effect',
  'herd-behavior':'Herd Behavior',
  fomo:'FOMO',
  'social-proof':'Social Proof',
  'contrarian-thinking':'Contrarian Thinking',
  'information-cascades':'Information Cascades',
  'sunk-cost-fallacy':'Sunk Cost Fallacy',
  'gambler-fallacy':'Gambler\'s Fallacy',
  'framing-effect':'Framing Effect',
  'mental-accounting':'Mental Accounting',
  'status-quo-bias':'Status Quo Bias',
  'market-sentiment-cycle':'Sentiment Cycle',
  'accumulation-distribution':'Accum / Distrib',
  'euphoria-panic':'Euphoria & Panic',
  'smart-money-dumb-money':'Smart vs. Dumb Money',
  'mean-reversion-psychology':'Mean Reversion',
};

const TOPIC_DATA = [
  { id:'confirmation-bias', num:'01', title:'Confirmation Bias', category:'Cognitive Biases', keywords:['selective','seeking evidence','ignoring contrary','belief','filter','echo chamber'], content:'The tendency to search for, interpret, and remember information that confirms your existing beliefs — while ignoring contradictory evidence. In trading: you\'re bullish, so you only read bullish analysis.' },
  { id:'anchoring', num:'02', title:'Anchoring', category:'Cognitive Biases', keywords:['reference point','first number','price anchor','adjustment','insufficient','52-week high'], content:'Over-relying on the first piece of information encountered (the "anchor"). In markets: traders anchor to purchase price, 52-week highs, or round numbers — leading to irrational support/resistance behavior.' },
  { id:'recency-bias', num:'03', title:'Recency Bias', category:'Cognitive Biases', keywords:['recent events','extrapolation','short memory','trend chasing','last quarter','performance'], content:'Weighting recent events more heavily than historical ones. After a bull run, investors expect it to continue. After a crash, they expect more pain. The recent past feels like the permanent future.' },
  { id:'availability-heuristic', num:'04', title:'Availability Heuristic', category:'Cognitive Biases', keywords:['vivid memories','media','dramatic events','probability','overweight','Tversky','Kahneman'], content:'Judging probability by how easily examples come to mind. Dramatic crashes (1929, 2008) are vivid, so risk feels higher after media coverage. Quiet, steady gains are forgotten because they\'re not dramatic.' },
  { id:'hindsight-bias', pattern:'Once the outcome is known it feels as if it was predictable all along, and memory quietly rewrites the odds', num:'05', title:'Hindsight Bias', category:'Cognitive Biases', keywords:['knew it all along','predictable','retroactive','overestimate','narrative fallacy','obvious'], content:'"I knew it all along." After an event, people believe they predicted it. This prevents learning from mistakes — if you "knew" the crash was coming, there\'s nothing to learn. Dangerous for improving trading decisions.' },
  { id:'fear-and-greed', num:'06', title:'Fear & Greed', category:'Emotional Drivers', keywords:['emotion cycle','index','extreme fear','extreme greed','Buffett','pendulum','sentiment'], content:'The two dominant market emotions. Greed drives bubbles — "I need to get in before it\'s too late." Fear drives crashes — "I need to get out before I lose everything." Buffett: "Be fearful when others are greedy, greedy when others are fearful."' },
  { id:'loss-aversion', num:'07', title:'Loss Aversion', category:'Emotional Drivers', keywords:['Kahneman','Tversky','prospect theory','2x pain','losses loom larger','risk averse gains','risk seeking losses'], content:'Losses hurt ~2× more than equivalent gains feel good (Kahneman & Tversky, Prospect Theory). This causes traders to hold losers too long (hoping to avoid realizing the loss) and sell winners too quickly (locking in gains).' },
  { id:'regret-aversion', num:'08', title:'Regret Aversion', category:'Emotional Drivers', keywords:['anticipated regret','inaction','omission','commission','paralysis','should have'], content:'Fear of making a decision you\'ll regret. Leads to inaction (paralysis) or following the crowd (if everyone else does it, at least I won\'t regret alone). People regret actions (commission) more than inactions (omission) short-term, but the reverse long-term.' },
  { id:'overconfidence', num:'09', title:'Overconfidence', category:'Emotional Drivers', keywords:['illusion of control','above average','excessive trading','Barber','Odean','prediction','calibration'], content:'Believing you know more than you do. Overconfident traders trade too frequently (Barber & Odean: higher turnover = lower returns), underestimate risk, and use insufficient diversification. In one U.S. student sample, 93% rated themselves above-median drivers.' },
  { id:'disposition-effect', num:'10', title:'Disposition Effect', category:'Emotional Drivers', keywords:['sell winners','hold losers','Shefrin','Statman','tax inefficient','loss aversion','pride'], content:'The tendency to sell winning positions too early (pride) and hold losing positions too long (hope). Documented by Shefrin & Statman (1985). It\'s tax-inefficient and performance-destroying — the mirror of what rational investors should do.' },
  { id:'herd-behavior', num:'11', title:'Herd Behavior', category:'Herd & Social', keywords:['crowd','following','momentum','bubble','crash','safety in numbers','collective irrationality'], content:'Following the crowd\'s actions rather than your own analysis. Evolutionary — safety in numbers. In markets, herding creates momentum, inflates bubbles, and accelerates crashes. "The market can remain irrational longer than you can remain solvent."' },
  { id:'fomo', num:'12', title:'FOMO', category:'Herd & Social', keywords:['fear of missing out','buying tops','late entry','anxiety','social media','parabolic','mania'], content:'Fear Of Missing Out — the anxiety that others are profiting while you\'re not. Drives investors to buy at tops, chase parabolic moves, and abandon risk management. Social media amplifies FOMO by making others\' gains hyper-visible.' },
  { id:'social-proof', num:'13', title:'Social Proof', category:'Herd & Social', keywords:['Cialdini','mimicry','influencer','expert opinion','crowd wisdom','bandwagon','consensus'], content:'Using others\' behavior as evidence of the "correct" action (Cialdini). In markets: "If everyone is buying, it must be good." Works in stable environments but catastrophically fails when the crowd is wrong at extremes.' },
  { id:'contrarian-thinking', num:'14', title:'Contrarian Thinking', category:'Herd & Social', keywords:['opposite','against the crowd','buy fear','sell greed','value investing','extreme sentiment','uncomfortable'], content:'Deliberately going against prevailing market sentiment. Buy when others panic, sell when others are euphoric. Requires emotional discipline — being contrarian FEELS wrong because humans are social. Not about always opposing — only at sentiment extremes.' },
  { id:'information-cascades', num:'15', title:'Information Cascades', category:'Herd & Social', keywords:['sequential decisions','ignore private signal','rational herding','domino','Banerjee','Bikhchandani','fragile'], content:'When individuals rationally ignore their own private information and follow predecessors\' actions. Each person infers from others\' choices. The cascade is informational — and fragile: a small piece of contrary information can shatter it, causing sudden reversals.' },
  { id:'sunk-cost-fallacy', num:'16', title:'Sunk Cost Fallacy', category:'Decision Traps', keywords:['throwing good money after bad','past investment','irreversible','doubling down','committed','escalation'], content:'Continuing an action because of previously invested resources (time, money, effort) rather than future value. "I\'ve already lost $5K, I can\'t sell now." The $5K is gone regardless — only future expected value should drive the decision.' },
  { id:'gambler-fallacy', num:'17', title:'Gambler\'s Fallacy', category:'Decision Traps', keywords:['hot hand','due','independent events','pattern','randomness','streaks','Monte Carlo'], content:'Believing that past random events affect future probabilities. "The stock has fallen 5 days in a row — it\'s due for a bounce." Each day is (largely) independent. Also called the Monte Carlo fallacy — in 1913, black came up 26 times in roulette.' },
  { id:'framing-effect', num:'18', title:'Framing Effect', category:'Decision Traps', keywords:['presentation','wording','gain frame','loss frame','Tversky','Kahneman','choice architecture'], content:'Decisions change based on how information is presented. "90% survival rate" vs. "10% mortality rate" — same fact, different emotional impact. In investing: a "20% discount from highs" vs. "this stock fell 20%" trigger different reactions.' },
  { id:'mental-accounting', num:'19', title:'Mental Accounting', category:'Decision Traps', keywords:['Thaler','separate buckets','house money','found money','fungibility','treat differently','risk'], content:'Treating money differently based on its source or intended use (Richard Thaler). "House money effect" — profits from winning trades are risked more freely than original capital. But a dollar is a dollar regardless of where it came from.' },
  { id:'status-quo-bias', num:'20', title:'Status Quo Bias', category:'Decision Traps', keywords:['inertia','default option','endowment','change aversion','rebalancing','portfolio drift'], content:'Preference for the current state. In investing, this means failing to rebalance, sticking with underperforming funds, and not adapting to changed conditions. The "default option" in retirement plans exploits this — most people never change it.' },
  { id:'market-sentiment-cycle', num:'21', title:'Market Sentiment Cycle', category:'Market Cycles', keywords:['disbelief','hope','optimism','euphoria','anxiety','denial','panic','capitulation','depression','relief'], content:'Markets cycle through emotional phases: Disbelief → Hope → Optimism → Euphoria (buy here at maximum risk) → Anxiety → Denial → Panic → Capitulation (sell here at maximum opportunity) → Depression → Relief → back to Hope.' },
  { id:'accumulation-distribution', num:'22', title:'Accumulation & Distribution', category:'Market Cycles', keywords:['Wyckoff','smart money','phases','markup','markdown','trading range','composite man'], content:'Richard Wyckoff\'s four market phases: Accumulation (smart money buys quietly), Markup (trend up, public joins), Distribution (smart money sells to public), Markdown (trend down, public panics). The "Composite Man" narrative.' },
  { id:'euphoria-panic', num:'23', title:'Euphoria & Panic', category:'Market Cycles', keywords:['mania','bubble','crash','capitulation','extreme emotion','maximum risk','maximum opportunity','irrational'], content:'The two emotional extremes of market cycles. Euphoria: "This time is different," P/E ratios don\'t matter, taxi drivers give stock tips. Panic: "The world is ending," selling at any price, margin calls cascade. Both are brief but violent.' },
  { id:'smart-money-dumb-money', num:'24', title:'Smart Money vs. Dumb Money', category:'Market Cycles', keywords:['institutional','retail','COT report','insider buying','late buyers','early movers','accumulation','distribution'], content:'"Smart money" (institutions, insiders) tends to buy during fear and sell during euphoria. "Dumb money" (retail, latecomers) does the opposite. COT (Commitment of Traders) reports and insider buying/selling data track this divergence.' },
  { id:'mean-reversion-psychology', num:'25', title:'Mean Reversion Psychology', category:'Market Cycles', keywords:['regression to mean','overshoot','undershoot','extremes revert','patience','contrarian','equilibrium'], content:'Extremes revert to the mean — in statistics AND in psychology. After euphoria, sentiment (and prices) revert down. After panic, they revert up. Understanding this principle provides patience to wait for extremes and confidence to act when they arrive.' },
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
  'confirmation-bias': '<div class="callout bridge"><strong>Pattern bridge:</strong> Seeing what you expect to see is <a href="../../ml-math/#bias-variance">high bias</a> in ML — the model only fits its prior assumption.</div>',
  'anchoring': '<div class="callout bridge"><strong>Pattern bridge:</strong> Anchoring to a reference price is the psychological cousin of <a href="../../essays/#essay-mean">the mean</a> — a central value everything is measured from. In ML, <a href="../../ml-math/#weight-init">weight initialization</a> anchors where training begins.</div>',
  'recency-bias': '<div class="callout bridge"><strong>Pattern bridge:</strong> Overweighting recent events is the human version of <a href="../../markets/indicators/#ema">exponential moving averages</a>. In ML, <a href="../../ml-math/#crossval">cross-validation</a> exists specifically to prevent this — don’t just test on the latest fold.</div>',
  'availability-heuristic': '<div class="callout bridge"><strong>Pattern bridge:</strong> Judging probability by what comes to mind is <a href="../../ml-math/#bayes">probability estimation</a> gone wrong — confusing salience with frequency. In ML, <a href="../../ml-math/#metrics">accuracy vs. recall</a> captures the same distortion.</div>',
  'hindsight-bias': '<div class="callout bridge"><strong>Pattern bridge:</strong> Believing you knew it all along is <a href="../../ml-math/#bias-variance">overfitting to the training set</a> — perfect past fit, no future predictive power. In statistics, <a href="../../stats/#hypothesis-testing">p-hacking</a> manufactures the same false certainty.</div>',
  'fear-and-greed': '<div class="callout bridge"><strong>Pattern bridge:</strong> The cycle between fear and greed drives volatility — the emotional driver behind <a href="../indicators/#standard-deviation">variance</a>. In ML, <a href="../../ml-math/#softmax">softmax temperature</a> mimics this: cold = greedy certainty, hot = fearful uniformity.</div>',
  'loss-aversion': '<div class="callout bridge"><strong>Pattern bridge:</strong> Losses hurt twice as much as equivalent gains — an asymmetric <a href="../../ml-math/#loss">loss function</a>. In statistics, it’s why <a href="../../stats/#distribution-shape">skewness</a> matters: symmetric distributions don’t capture human perception.</div>',
  'regret-aversion': '<div class="callout bridge"><strong>Pattern bridge:</strong> Avoiding regret over avoiding loss is a second-order bias. In ML, <a href="../../ml-math/#regularization">regularization</a> trades some training error for less regret on unseen data.</div>',
  'overconfidence': '<div class="callout bridge"><strong>Pattern bridge:</strong> Too-narrow confidence intervals from too much certainty. In statistics, this is literally <a href="../../stats/#confidence-intervals">miscalibrated confidence intervals</a>. In ML, <a href="../../ml-math/#bias-variance">low bias, high variance</a> — the overfit model that’s sure it’s right.</div>',
  'disposition-effect': '<div class="callout bridge"><strong>Pattern bridge:</strong> Selling winners too early, holding losers too long. In ML, <a href="../../ml-math/#lr-schedule">learning rate scheduling</a> fights the same instinct: slow down on gains, keep going through losses.</div>',
  'herd-behavior': '<div class="callout bridge"><strong>Pattern bridge:</strong> Following the crowd is a <a href="../../ml-math/#rlhf">collective reward signal</a> — the market’s version of RLHF. In statistics, it produces <a href="../../stats/#correlation-causation">spurious correlation</a> as everyone moves together. The individual version, taking others’ choices as evidence, is <a href="#social-proof">social proof</a>.</div>',
  'fomo': '<div class="callout bridge"><strong>Pattern bridge:</strong> Fear of missing out drives late entries at peaks. In ML, <a href="../../ml-math/#optimizers">momentum overshoot</a> is the same — too much velocity past the optimum.</div>',
  'social-proof': '<div class="callout bridge"><strong>Pattern bridge:</strong> Copying others as a decision shortcut is an <a href="../../ml-math/#embeddings">embedding heuristic</a> — if nearby vectors do it, so should I. In statistics, it’s the <a href="../../stats/#clt-sampling">law of large numbers</a> misapplied: consensus ≠ correctness.</div>',
  'contrarian-thinking': '<div class="callout bridge"><strong>Pattern bridge:</strong> Going against the crowd is the <a href="../../ml-math/#gan">discriminator in a GAN</a> — an adversary that bets against the prevailing signal.</div>',
  'information-cascades': '<div class="callout bridge"><strong>Pattern bridge:</strong> Sequential decisions amplifying a signal regardless of private information. In ML, this mirrors <a href="../../ml-math/#backprop">gradient cascading</a> in deep networks.</div>',
  'sunk-cost-fallacy': '<div class="callout bridge"><strong>Pattern bridge:</strong> Weighting past investment that can’t be recovered. In ML, <a href="../../ml-math/#regularization">early stopping</a> fights sunk-cost thinking: stop training even though you’ve invested epochs.</div>',
  'gambler-fallacy': '<div class="callout bridge"><strong>Pattern bridge:</strong> Expecting past outcomes to influence independent future ones. In statistics, this is misunderstanding <a href="../../essays/#essay-walk">independent probability</a>. In ML, each <a href="../../ml-math/#crossval">cross-validation fold</a> is an independent trial.</div>',
  'framing-effect': '<div class="callout bridge"><strong>Pattern bridge:</strong> How information is presented changes the decision — the same data, different conclusions. In statistics, <a href="../../stats/#distribution-shape">mean vs. median</a> can frame the same dataset differently.</div>',
  'mental-accounting': '<div class="callout bridge"><strong>Pattern bridge:</strong> Treating money differently based on its source or bucket. In ML, <a href="../../ml-math/#batchnorm">batch normalization</a> per-group treats each layer’s activations as separate accounts. In statistics, <a href="../../essays/#essay-simpson">Simpson’s paradox</a> shows how grouping changes conclusions.</div>',
  'status-quo-bias': '<div class="callout bridge"><strong>Pattern bridge:</strong> Preferring the current state over change. In ML, <a href="../../ml-math/#regularization">L2 regularization</a> pulls weights toward zero — a mathematical preference for the status quo. The mechanical cure for drift is a <a href="../risk/#rebalancing">rebalancing rule</a>.</div>',
  'market-sentiment-cycle': '<div class="callout bridge"><strong>Pattern bridge:</strong> The emotional arc from optimism to euphoria to panic to hope is a distribution cycle. In ML, <a href="../../ml-math/#lr-schedule">cyclic learning rates</a> deliberately walk through this arc.</div>',
  'accumulation-distribution': '<div class="callout bridge"><strong>Pattern bridge:</strong> Smart money quietly building positions before the crowd notices. In ML, <a href="../../ml-math/#optimizers">gradient accumulation</a> before an optimizer step is the same: gather signals silently, then act.</div>',
  'euphoria-panic': '<div class="callout bridge"><strong>Pattern bridge:</strong> Extreme sentiment at both ends of the <a href="../../essays/#essay-tail">distribution tails</a>. In ML, <a href="../../ml-math/#diffusion">diffusion models</a> add noise (panic) then learn to reverse it (recovery).</div>',
  'smart-money-dumb-money': '<div class="callout bridge"><strong>Pattern bridge:</strong> The information asymmetry between sophisticated and retail traders. In ML, <a href="../../ml-math/#kl-div">KL divergence</a> measures the gap between what one model knows and another doesn’t. In statistics, it’s the difference between the <a href="../../stats/#bayesian-ab">prior and the posterior</a>.</div>',
  'mean-reversion-psychology': '<div class="callout bridge"><strong>Pattern bridge:</strong> The belief that extremes return to average — a psychological trust in the <a href="../../stats/#clt-sampling">central limit theorem</a>. In ML, <a href="../../ml-math/#batchnorm">normalization layers</a> enforce mean reversion on activations.</div>'
};

const TOPIC_EXTRAS = {
  'loss-aversion': `<div class="perf-insight"><div class="perf-insight-title">Performance in practice</div><ul>
      <li>Tversky &amp; Kahneman’s (1992) median estimate: losses weigh about 2.25× as much as equal gains</li>
      <li>In trading: investors tend to hold losers and sell winners — Odean (1998) found individual investors realised gains about 1.5× as readily as losses</li>
      <li>Pre-committed stop-losses and systematic exit rules are a common defence, because they take the decision away from the moment of loss</li>
    </ul></div><div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> Designing your trading plan — set exit rules before entering. Portfolio review to check if you're holding "hope trades." Understanding why you feel worse about losses than good about wins.</div><div class="skip-when">✗ <strong>Skip when:</strong> You have a fully systematic/algorithmic approach with pre-defined rules. Long-term index investing where short-term losses are irrelevant to the strategy.</div></div>`,
  'fear-and-greed': `<div class="perf-insight"><div class="perf-insight-title">Performance in practice</div><ul>
      <li>Sentiment measures carry some information about future returns — mostly for small, hard-to-value stocks, and modestly (Baker &amp; Wurgler 2006, 2007)</li>
      <li>The CNN Fear &amp; Greed Index is recent, so long backtests of it are not possible. The VIX goes further back: readings above 30 coincided with the sell-offs of 2008, 2011 and 2020 — and in 2008–09 it stayed above 30 for months, before and after the bottom</li>
      <li>“Extreme greed” is a weak sell signal on its own — euphoric markets can keep rising for a long time</li>
    </ul></div><div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> Timing lump-sum additions to a portfolio. Gauging whether a sell-off is panic-driven or fundamentally justified. As a contrarian filter — consider buying when others are fearful.</div><div class="skip-when">✗ <strong>Skip when:</strong> Day trading — sentiment indices update too slowly. Ignoring in a disciplined DCA strategy where emotions shouldn't affect contributions. As a standalone timing signal — always combine with price/volume.</div></div>`,
  'herd-behavior': `<div class="why-matters"><div class="why-matters-title">When to use this</div><div class="use-when">✓ <strong>Use when:</strong> You notice everyone around you talking about the same trade. Social media is flooded with one-directional conviction. Volume spikes massively with no fundamental catalyst. A contrarian position has become very painful.</div><div class="skip-when">✗ <strong>Skip when:</strong> The "herd" is responding to genuine fundamental changes (earnings beat, regulatory approval). Early in a trend — herding is most dangerous at extremes, not at the start. In highly efficient markets (large-cap liquid stocks) where herding is arbitraged away quickly.</div></div>`
};

/* Canvas visualizations carry no text of their own, so each one is given an
   accessible name built from its topic. Titles can contain characters that
   would break out of the attribute, hence the escape. */
function ariaAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* depth:start — generated from the scratch scripts psych_snippets.py / psych_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "confirmation-bias": {
  "example": "You start 60% sure of a bullish thesis and then meet six pieces of evidence: three for it and three just as strong against. Weighed fairly they cancel, and you should end where you began: <strong>60%</strong>. Give the contrary evidence half its weight and the same pile leaves you at <strong>73%</strong>. Five rounds of the same balanced news later you are <strong>97%</strong> sure — certainty built entirely from the filter, not from the evidence.",
  "fails": [
   "Not every strong prior is a bias. Discounting a weak or unreliable source is correct; the bias is discounting evidence <em>because</em> it disagrees.",
   "Searching for confirming cases can be an efficient test when the hypothesis is rare (Klayman &amp; Ha 1987); the trouble is treating the search as proof.",
   "Knowing about the bias does not remove it. A written “what would make me wrong” before the trade works better than good intentions."
  ],
  "code": "prior = 0.60                                    # how sure you are the bullish thesis is right\nlr = [1.5, 1.5, 1.5, 1 / 1.5, 1 / 1.5, 1 / 1.5]  # three pieces of evidence for it, three equally strong against\n\ndef update(p, lrs, w_against=1.0):               # Bayes in log-odds; w_against &lt; 1 discounts contrary evidence\n    logit = np.log(p / (1 - p))\n    for x in lrs:\n        logit += np.log(x) * (w_against if x &lt; 1 else 1)\n    return 1 / (1 + np.exp(-logit))\n\nfair = update(prior, lr)\nbiased = update(prior, lr, w_against=0.5)\nbiased_after_5_rounds = update(prior, lr * 5, w_against=0.5)",
  "sources": [
   "R. S. Nickerson, “Confirmation Bias: A Ubiquitous Phenomenon in Many Guises”, <em>Review of General Psychology</em> 2(2), 1998",
   "P. C. Wason, “On the Failure to Eliminate Hypotheses in a Conceptual Task”, <em>Quarterly Journal of Experimental Psychology</em> 12(3), 1960 — the 2-4-6 task",
   "J. Klayman &amp; Y.-W. Ha, “Confirmation, Disconfirmation, and Information in Hypothesis Testing”, <em>Psychological Review</em> 94(2), 1987",
   "J. Park, P. Konana, B. Gu, A. Kumar &amp; R. Raghunathan, “Information Valuation and Confirmation Bias in Virtual Communities: Evidence from Stock Message Boards”, <em>Information Systems Research</em> 24(4), 2013"
  ]
 },
 "anchoring": {
  "example": "The stock’s 52-week high is 80 and it now trades at 62: <strong>0.775</strong> of the high, or “22.5% off”. To someone who bought at 75 it is also <strong>17.3% below cost</strong>. Both numbers feel like information about value; neither is. The 80 is where other people traded last year, and the 75 is where you did.",
  "fails": [
   "Anchors are not always irrational: the 52-week high is watched by so many traders that it can matter for behaviour around it, even though it says nothing about value.",
   "George &amp; Hwang (2004) found that stocks near their 52-week high go on to <em>outperform</em> — investors anchor and underreact to good news, so “too close to the high” is not a sell signal.",
   "Replacing one anchor with another (an analyst’s target) is not a cure. A valuation built from expected cash flows is."
  ],
  "code": "close = pd.Series([80, 78, 74, 70, 66, 63, 61, 64, 62, 60, 63, 62])   # twelve month-end closes, made up\nhigh52 = close.max()                     # the anchor: the 52-week high\nratio = close.iloc[-1] / high52          # George &amp; Hwang's measure, price over its 52-week high\noff_high = 1 - ratio\ncost = 75                                # where this holder bought: a second anchor\nvs_cost = close.iloc[-1] / cost - 1",
  "sources": [
   "A. Tversky &amp; D. Kahneman, “Judgment under Uncertainty: Heuristics and Biases”, <em>Science</em> 185(4157), 1974",
   "T. J. George &amp; C.-Y. Hwang, “The 52-Week High and Momentum Investing”, <em>Journal of Finance</em> 59(5), 2004",
   "G. B. Northcraft &amp; M. A. Neale, “Experts, Amateurs, and Real Estate: An Anchoring-and-Adjustment Perspective on Property Pricing Decisions”, <em>Organizational Behavior and Human Decision Processes</em> 39(1), 1987"
  ]
 },
 "recency-bias": {
  "example": "Ten years of returns average <strong>9.6%</strong>. The last three averaged <strong>22.3%</strong>, and an expectation that halves the weight of each older year lands at <strong>18.4%</strong> — nearly double the long-run figure, just after the best stretch in the sample.",
  "fails": [
   "Recent data is not worthless: volatility really does cluster, so recent volatility is a better guide to next month’s than a ten-year average is. The bias is extrapolating <em>returns</em>.",
   "Surveys show investors expect high returns after high returns (Greenwood &amp; Shleifer 2014) — and those are the periods followed by lower returns on average.",
   "A long-run mean is itself an estimate; ten years is a short sample, and the “base rate” can be just as wrong in a different way."
  ],
  "code": "r = pd.Series([0.12, 0.08, -0.05, 0.15, 0.10, 0.07, -0.18, 0.22, 0.25, 0.20])   # ten years of returns, made up\nlong_run = r.mean()\nlast_three = r.tail(3).mean()\nfelt = r.ewm(alpha=0.5).mean().iloc[-1]  # each year counts half as much as the one after it",
  "sources": [
   "R. Greenwood &amp; A. Shleifer, “Expectations of Returns and Expected Returns”, <em>Review of Financial Studies</em> 27(3), 2014",
   "U. Malmendier &amp; S. Nagel, “Depression Babies: Do Macroeconomic Experiences Affect Risk Taking?”, <em>Quarterly Journal of Economics</em> 126(1), 2011",
   "W. F. M. De Bondt &amp; R. Thaler, “Does the Stock Market Overreact?”, <em>Journal of Finance</em> 40(3), 1985"
  ]
 },
 "availability-heuristic": {
  "example": "Thirty years with two crash years: a base rate of <strong>6.7%</strong>. Now let a crash year come to mind five times as easily as a quiet one, and let memories fade by 10% a year. The latest crash is three years old and still vivid, so the probability that <em>feels</em> right is <strong>34.7%</strong> — five times the record. The weights are made up; the shape is the point.",
  "fails": [
   "Ease of recall is a decent cue when what you remember is a fair sample; it fails when media and memory over-select the dramatic.",
   "Barber &amp; Odean (2008) found individual investors are net buyers of attention-grabbing stocks — those in the news, with high volume or extreme returns. Attention drives the trade, not the odds.",
   "The cure is not “ignore crashes”: tail risk is real (see Risk &amp; Portfolio). The cure is to count them."
  ],
  "code": "years = 30\ncrash = np.zeros(years); crash[[8, 27]] = 1       # two crash years in thirty, the latest three years ago\nbase_rate = crash.mean()\n\nvivid = np.where(crash == 1, 5.0, 1.0)            # a crash year comes to mind five times as easily\nfresh = 0.9 ** np.arange(years)[::-1]             # and memories fade by 10% a year\nw = vivid * fresh\nfelt = (w * crash).sum() / w.sum()                # the probability that \"feels\" right",
  "sources": [
   "A. Tversky &amp; D. Kahneman, “Availability: A Heuristic for Judging Frequency and Probability”, <em>Cognitive Psychology</em> 5(2), 1973",
   "S. Lichtenstein, P. Slovic, B. Fischhoff, M. Layman &amp; B. Combs, “Judged Frequency of Lethal Events”, <em>Journal of Experimental Psychology: Human Learning and Memory</em> 4(6), 1978",
   "B. M. Barber &amp; T. Odean, “All That Glitters: The Effect of Attention and News on the Buying Behavior of Individual and Institutional Investors”, <em>Review of Financial Studies</em> 21(2), 2008"
  ]
 },
 "hindsight-bias": {
  "example": "Five forecasts written down beforehand, then recalled after the outcome. On average the remembered forecast moved <strong>22 points</strong> toward what happened. Scored honestly the forecasts have a Brier score of <strong>0.35</strong> (0 is perfect, 0.25 is a coin); the remembered ones score <strong>0.14</strong>. Memory turned a below-coin forecaster into a good one.",
  "fails": [
   "It is invisible from the inside. Only a record made <em>before</em> the outcome can show it, which is why a decision journal works and reflection alone does not.",
   "The opposite mistake exists too: judging a good decision by a bad outcome. Some bets are right and still lose.",
   "Biais &amp; Weber (2009) found investment bankers with more hindsight bias earned less — it blocks learning, not just pride."
  ],
  "code": "log = pd.DataFrame({\n    'event':      ['rate cut', 'earnings beat', 'recession', 'oil above 100', 'index new high'],\n    'said':       [0.30, 0.55, 0.20, 0.40, 0.60],      # written down beforehand\n    'happened':   [1, 0, 1, 0, 1],\n    'remembered': [0.60, 0.35, 0.45, 0.25, 0.80]})     # what you later recall having said\ntoward_outcome = np.where(log.happened == 1, log.remembered - log.said, log.said - log.remembered)\nbrier_said = ((log.said - log.happened) ** 2).mean()   # lower is better\nbrier_remembered = ((log.remembered - log.happened) ** 2).mean()",
  "sources": [
   "B. Fischhoff, “Hindsight ≠ Foresight: The Effect of Outcome Knowledge on Judgment under Uncertainty”, <em>Journal of Experimental Psychology: Human Perception and Performance</em> 1(3), 1975",
   "N. J. Roese &amp; K. D. Vohs, “Hindsight Bias”, <em>Perspectives on Psychological Science</em> 7(5), 2012",
   "B. Biais &amp; M. Weber, “Hindsight Bias, Risk Perception, and Investment Performance”, <em>Management Science</em> 55(6), 2009"
  ]
 },
 "fear-and-greed": {
  "example": "Three readings — the VIX, the put/call ratio and the share of stocks above their 200-day average — turned into z-scores and averaged, with the last one flipped. Week 2 scores <strong>−1.10</strong> (extreme greed); weeks 5 and 6 score <strong>1.31</strong> and <strong>1.74</strong> (extreme fear). Everything else is neutral. That is all a fear-and-greed index is: a few market measures scaled and added up.",
  "fails": [
   "The scale is relative to the window: “extreme” here means extreme for these ten weeks. In 2008 fear readings that looked extreme were followed by more extreme ones.",
   "The ingredients are partly the price itself, so the index often just restates what the market already did.",
   "Sentiment predicts returns best for hard-to-value stocks, and the effect is modest (Baker &amp; Wurgler 2006). As a stand-alone timing signal it is weak."
  ],
  "code": "s = pd.DataFrame({                               # ten weekly readings, made up\n    'vix':      [14, 13, 15, 22, 35, 41, 30, 24, 18, 16],\n    'put_call': [0.80, 0.75, 0.85, 1.00, 1.25, 1.30, 1.10, 0.95, 0.85, 0.80],\n    'above_200d': [72, 75, 68, 50, 28, 20, 33, 45, 60, 66]})   # % of stocks above their 200-day average\nz = (s - s.mean()) / s.std()\nfear = (z.vix + z.put_call - z.above_200d) / 3    # high = fear, low = greed\nlabel = np.select([fear &gt; 1, fear &lt; -1], ['extreme fear', 'extreme greed'], 'neutral')",
  "sources": [
   "R. E. Whaley, “The Investor Fear Gauge”, <em>Journal of Portfolio Management</em> 26(3), 2000",
   "M. Baker &amp; J. Wurgler, “Investor Sentiment and the Cross-Section of Stock Returns”, <em>Journal of Finance</em> 61(4), 2006",
   "M. Baker &amp; J. Wurgler, “Investor Sentiment in the Stock Market”, <em>Journal of Economic Perspectives</em> 21(2), 2007",
   "W. E. Buffett, letter to Berkshire Hathaway shareholders, 1986 — “fearful when others are greedy”"
  ]
 },
 "loss-aversion": {
  "example": "A fair coin: win 110 or lose 100. The expected value is <strong>+5</strong>, yet with Tversky &amp; Kahneman’s estimates (curvature 0.88, losses weighted 2.25×) it <em>feels</em> like <strong>−33</strong>. To make losing 100 feel even, the win would have to be about <strong>251</strong>. Repeated small bets like this one are where loss aversion costs most: refused one at a time, a profitable series is never played (Benartzi &amp; Thaler’s “myopic loss aversion”).",
  "fails": [
   "“Losses hurt twice as much” is a median from lab gambles, not a constant. Estimates vary widely by person, stakes and method, and some find little loss aversion for small, routine amounts (Gal &amp; Rucker 2018).",
   "Being careful with losses is not a bias when a loss would ruin you; with real survival constraints, refusing a positive bet can be correct.",
   "Holding losers and selling winners is a related but separate effect (see Disposition Effect)."
  ],
  "code": "def v(x, a=0.88, lam=2.25):                      # Tversky &amp; Kahneman's (1992) median estimates\n    return np.where(x &gt;= 0, np.abs(x) ** a, -lam * np.abs(x) ** a)\n\nev = 0.5 * 110 + 0.5 * -100                      # a fair coin: win 110 or lose 100\nfelt = 0.5 * v(110) + 0.5 * v(-100)\nwin_needed = 100 * 2.25 ** (1 / 0.88)            # the win that makes losing 100 feel even",
  "sources": [
   "D. Kahneman &amp; A. Tversky, “Prospect Theory: An Analysis of Decision under Risk”, <em>Econometrica</em> 47(2), 1979",
   "A. Tversky &amp; D. Kahneman, “Advances in Prospect Theory: Cumulative Representation of Uncertainty”, <em>Journal of Risk and Uncertainty</em> 5(4), 1992 — the 0.88 and 2.25 used here",
   "S. Benartzi &amp; R. H. Thaler, “Myopic Loss Aversion and the Equity Premium Puzzle”, <em>Quarterly Journal of Economics</em> 110(1), 1995",
   "D. Gal &amp; D. D. Rucker, “The Loss of Loss Aversion: Will It Loom Larger Than Its Gain?”, <em>Journal of Consumer Psychology</em> 28(3), 2018"
  ]
 },
 "regret-aversion": {
  "example": "Three choices for a position you are up on, scored in a rally, a flat market and a drop. By expected profit, holding wins: <strong>6.25</strong>, against 3.13 for selling half and 0 for selling now. Now score each by its worst regret — how far it falls short of the best choice in hindsight. Selling now can miss 30, holding can miss 20, selling half at most <strong>15</strong>. The regret-minimiser sells half, giving up half the expected profit to never feel too foolish.",
  "fails": [
   "Splitting a decision is not always regret-dodging; it can be sensible sizing when you are unsure. The question is whether the split is chosen for the odds or for the feelings.",
   "People regret actions more in the short run and inactions more in the long run (Gilovich &amp; Medvec 1995), so the same rule pushes in different directions over time.",
   "Rules set in advance — when to sell, how much — remove most of the room regret has to work in."
  ],
  "code": "pay = pd.DataFrame({'sell now': [0, 0, 0], 'sell half': [15, 2.5, -10], 'hold': [30, 5, -20]},\n                   index=['rally', 'flat', 'drop'])      # profit from here in each outcome\np = np.array([0.35, 0.35, 0.30])                         # your odds for the three outcomes\nev = pay.T @ p\nregret = pay.max(axis=1).values[:, None] - pay.values    # best choice in hindsight minus yours\nworst_regret = pd.Series(regret.max(axis=0), index=pay.columns)",
  "sources": [
   "G. Loomes &amp; R. Sugden, “Regret Theory: An Alternative Theory of Rational Choice Under Uncertainty”, <em>Economic Journal</em> 92(368), 1982",
   "D. E. Bell, “Regret in Decision Making under Uncertainty”, <em>Operations Research</em> 30(5), 1982",
   "T. Gilovich &amp; V. H. Medvec, “The Experience of Regret: What, When, and Why”, <em>Psychological Review</em> 102(2), 1995"
  ]
 },
 "overconfidence": {
  "example": "Ten price ranges, each one given with “90% confidence”. Only <strong>5 of 10</strong> contained the actual value. A calibrated forecaster would hit about nine; hitting half means the ranges should have been much wider. This is overprecision, the most robust form of overconfidence, and you only see it by scoring a batch of forecasts.",
  "fails": [
   "Barber &amp; Odean (2000) found the 20% of households that traded most earned 11.4% a year net, against 17.9% for the market — but trading costs, not bad picks alone, did much of the damage.",
   "“93% think they are above-average drivers” comes from a small U.S. student sample (Svenson 1981); the Swedish sample was 69%. The effect is real, the number is not universal.",
   "Confidence is useful when it is earned and calibrated; the fix is scoring, not self-doubt."
  ],
  "code": "fc = pd.DataFrame({                              # ten ranges you were \"90% sure\" of, made up\n    'low':    [95, 40, 1.8, 210, 70, 12, 3.1, 150, 88, 25],\n    'high':   [105, 48, 2.2, 240, 80, 15, 3.5, 170, 96, 30],\n    'actual': [108, 44, 2.5, 236, 64, 13, 3.4, 181, 90, 31]})\nhit_rate = fc.actual.between(fc.low, fc.high).mean()",
  "sources": [
   "B. M. Barber &amp; T. Odean, “Trading Is Hazardous to Your Wealth: The Common Stock Investment Performance of Individual Investors”, <em>Journal of Finance</em> 55(2), 2000",
   "B. M. Barber &amp; T. Odean, “Boys Will Be Boys: Gender, Overconfidence, and Common Stock Investment”, <em>Quarterly Journal of Economics</em> 116(1), 2001",
   "O. Svenson, “Are We All Less Risky and More Skillful Than Our Fellow Drivers?”, <em>Acta Psychologica</em> 47(2), 1981",
   "D. A. Moore &amp; P. J. Healy, “The Trouble with Overconfidence”, <em>Psychological Review</em> 115(2), 2008"
  ]
 },
 "disposition-effect": {
  "example": "Odean’s measure: on each day something was sold, look at every position held. Here 4 of 8 positions in profit were sold — a proportion of gains realized of <strong>0.50</strong>. Only 1 of 9 in loss was sold: <strong>0.11</strong>. Gains were realized <strong>4.5 times</strong> as readily as losses. In 10,000 real brokerage accounts Odean (1998) found 0.148 against 0.098.",
  "fails": [
   "Taxes push the other way: in most countries a realized loss lowers your tax, which makes holding losers more costly still.",
   "Some selling of winners is rebalancing, which is a good habit; the test is whether the sell would happen with the gain removed.",
   "Ben-David &amp; Hirshleifer (2012) found people sell after large moves either way; the pattern may come from beliefs about the stock more than from the pain of a realized loss."
  ],
  "code": "book = pd.DataFrame({                            # every position held on the days something was sold\n    'gain': [1, 1, 1, 0, 0, 0, 0,  1, 1, 0, 0, 0,  1, 1, 1, 0, 0],\n    'sold': [1, 0, 1, 0, 0, 0, 0,  1, 0, 0, 1, 0,  1, 0, 0, 0, 0]})\ng, s = book.gain == 1, book.sold == 1\nPGR = (g &amp; s).sum() / g.sum()                    # proportion of gains realized (Odean 1998)\nPLR = (~g &amp; s).sum() / (~g).sum()                # proportion of losses realized",
  "sources": [
   "H. Shefrin &amp; M. Statman, “The Disposition to Sell Winners Too Early and Ride Losers Too Long: Theory and Evidence”, <em>Journal of Finance</em> 40(3), 1985",
   "T. Odean, “Are Investors Reluctant to Realize Their Losses?”, <em>Journal of Finance</em> 53(5), 1998",
   "I. Ben-David &amp; D. Hirshleifer, “Are Investors Really Reluctant to Realize Their Losses? Trading Responses to Past Returns and the Disposition Effect”, <em>Review of Financial Studies</em> 25(8), 2012"
  ]
 },
 "herd-behavior": {
  "example": "Five stocks, with the funds buying and selling each in one quarter. Across all of them 57% of trades were buys. Lakonishok, Shleifer and Vishny measure herding as how far each stock’s buy share sits from 57%, minus how far it would sit by chance. Stock A (18 buyers, 2 sellers) scores <strong>0.24</strong>, stock D (5 and 15) <strong>0.23</strong>; E scores <strong>−0.07</strong>, no more lopsided than chance. The average is <strong>0.09</strong>.",
  "fails": [
   "Trading together is not proof of copying: funds reacting to the same news will look like a herd.",
   "Using the same measure, LSV (1992) found only a little herding among U.S. pension fund managers — far less than the stories suggest.",
   "Herding can be rational for each person (see Information Cascades); it is the collective result that goes wrong."
  ],
  "code": "from math import comb\nq = pd.DataFrame({'buyers': [18, 9, 14, 5, 11], 'sellers': [2, 11, 6, 15, 9]},\n                 index=list('ABCDE'))            # funds buying and selling five stocks in one quarter, made up\nn = q.buyers + q.sellers\np = q.buyers / n\np_all = q.buyers.sum() / n.sum()                 # share of all trades that are buys\n\ndef af(n, p):                                    # |p_i - p_all| expected by chance alone\n    return sum(comb(n, k) * p**k * (1 - p)**(n - k) * abs(k / n - p) for k in range(n + 1))\n\nH = (p - p_all).abs() - n.apply(af, p=p_all)     # Lakonishok, Shleifer &amp; Vishny's herding measure",
  "sources": [
   "J. Lakonishok, A. Shleifer &amp; R. W. Vishny, “The Impact of Institutional Trading on Stock Prices”, <em>Journal of Financial Economics</em> 32(1), 1992",
   "D. S. Scharfstein &amp; J. C. Stein, “Herd Behavior and Investment”, <em>American Economic Review</em> 80(3), 1990",
   "A. V. Banerjee, “A Simple Model of Herd Behavior”, <em>Quarterly Journal of Economics</em> 107(3), 1992"
  ]
 },
 "fomo": {
  "example": "A stock runs from 10 to 21 in seven months and then unwinds to 13. The buyer who waits until it has doubled gets in at <strong>21</strong>, the top, and ends <strong>−38%</strong>. Someone who bought at the start and did nothing ends <strong>+30%</strong> on the same stock. The fear was of missing a gain that had already happened.",
  "fails": [
   "Strong past performance is not in itself a reason to stay out: momentum over 3–12 months is one of the better-documented patterns. FOMO is about how you enter, not whether.",
   "The danger is in what FOMO does to process — skipping sizing and stops — more than in the entry price alone.",
   "Barber, Huang, Odean &amp; Schwarz (2022) found that stocks heavily bought by attention-driven retail traders had negative returns afterwards on average."
  ],
  "code": "close = pd.Series([10, 10.5, 11, 12, 13.5, 15.5, 18, 21, 19, 16, 14, 13])   # a run-up and its unwind, made up\nentry = close[close &gt;= 2 * close.iloc[0]].index[0]   # the FOMO buyer waits until it has doubled\nfomo = close.iloc[-1] / close[entry] - 1\nearly = close.iloc[-1] / close.iloc[0] - 1",
  "sources": [
   "A. K. Przybylski, K. Murayama, C. R. DeHaan &amp; V. Gladwell, “Motivational, Emotional, and Behavioral Correlates of Fear of Missing Out”, <em>Computers in Human Behavior</em> 29(4), 2013",
   "B. M. Barber, X. Huang, T. Odean &amp; C. Schwarz, “Attention-Induced Trading and Returns: Evidence from Robinhood Users”, <em>Journal of Finance</em> 77(6), 2022",
   "B. M. Barber &amp; T. Odean, “All That Glitters: The Effect of Attention and News on the Buying Behavior of Individual and Institutional Investors”, <em>Review of Financial Studies</em> 21(2), 2008"
  ]
 },
 "social-proof": {
  "example": "Ten songs of equal quality and 2,000 listeners, run five times. When each listener picks at random, the top song gets <strong>11–12%</strong> of plays every time. When each picks in proportion to plays so far, the top song gets <strong>18–46%</strong> — and a different song wins in every run. Popularity says more about who went first than about quality. Salganik, Dodds &amp; Watts (2006) found the same in a real music market.",
  "fails": [
   "Copying others is often a good shortcut: when they know more than you and decide independently, the crowd is informative.",
   "It breaks when the crowd is copying itself, as in the simulation; then the signal is mostly noise amplified.",
   "Asch’s conformity experiments (1956) are often cited for markets, but they were about visible group pressure on simple judgments, not about prices."
  ],
  "code": "rng = np.random.default_rng(1)\n\ndef market(social, songs=10, listeners=2000):    # ten songs of equal quality\n    plays = np.ones(songs)\n    for _ in range(listeners):\n        p = plays / plays.sum() if social else np.full(songs, 1 / songs)   # social: pick in proportion to plays so far\n        plays[rng.choice(songs, p=p)] += 1\n    return plays\n\ntop_share = lambda w: w.max() / w.sum()\nalone = [top_share(market(False)) for _ in range(5)]\nseen = [market(True) for _ in range(5)]\ntogether = [top_share(w) for w in seen]\nwinners = [int(w.argmax()) for w in seen]",
  "sources": [
   "<em>Influence: The Psychology of Persuasion</em>, R. B. Cialdini, 1984",
   "M. J. Salganik, P. S. Dodds &amp; D. J. Watts, “Experimental Study of Inequality and Unpredictability in an Artificial Cultural Market”, <em>Science</em> 311(5762), 2006",
   "S. E. Asch, “Studies of Independence and Conformity: I. A Minority of One Against a Unanimous Majority”, <em>Psychological Monographs</em> 70(9), 1956"
  ]
 },
 "contrarian-thinking": {
  "example": "A stock falls from 100 and the contrarian buys into the panic at <strong>70</strong>, 30% off the high. The bottom is still ahead: from the entry the position falls a further <strong>29%</strong> before it turns, and only then ends <strong>+17%</strong>. Right in the end, with a stop at −15% you would have been out before it worked. Being early is the contrarian’s usual condition.",
  "fails": [
   "Over 3–12 months the crowd’s direction tends to persist (momentum, Jegadeesh &amp; Titman 1993). Contrarian returns show up over years: De Bondt &amp; Thaler (1985) found past losers beat past winners by about 25% over the following three years.",
   "Disagreeing is not an edge. The edge is a view on value that turns out right; going against a correct crowd just loses.",
   "Sentiment extremes are clearest afterwards (see Hindsight Bias)."
  ],
  "code": "close = pd.Series([100, 92, 85, 70, 72, 60, 55, 50, 58, 66, 75, 82])   # a sell-off and recovery, made up\nentry = close[close &lt;= 0.7 * close.iloc[0]].index[0]   # buy into the panic, 30% below the high\nworst = close[entry:].min() / close[entry] - 1        # what you sit through first\nfinal = close.iloc[-1] / close[entry] - 1",
  "sources": [
   "W. F. M. De Bondt &amp; R. Thaler, “Does the Stock Market Overreact?”, <em>Journal of Finance</em> 40(3), 1985",
   "J. Lakonishok, A. Shleifer &amp; R. W. Vishny, “Contrarian Investment, Extrapolation, and Risk”, <em>Journal of Finance</em> 49(5), 1994",
   "N. Jegadeesh &amp; S. Titman, “Returns to Buying Winners and Selling Losers: Implications for Stock Market Efficiency”, <em>Journal of Finance</em> 48(1), 1993"
  ]
 },
 "information-cascades": {
  "example": "Twenty people choose in turn. Each has a private signal that is right 60% of the time and sees everyone before them. Once one choice leads by two, the rest copy it and ignore their own signal. In 10,000 runs the queue ends in the <strong>wrong</strong> choice <strong>31%</strong> of the time. Had all twenty signals been pooled and counted, the majority would be right <strong>76%</strong> of the time (ties counting as wrong). Everyone acted sensibly; the information was lost because only actions were seen.",
  "fails": [
   "Cascades are fragile: a public piece of news can break one at once, which is why herds reverse so sharply.",
   "In the lab people follow their own signal more than the theory predicts, so real cascades form less often (Anderson &amp; Holt 1997).",
   "In markets prices move as people trade, which weakens pure cascades; the model is a lens, not a description."
  ],
  "code": "rng = np.random.default_rng(7)\n\ndef queue(n=20, q=0.6):                           # the right choice is 1; each private signal is right 60% of the time\n    acts, lead = [], 0                            # lead = adopters minus rejecters seen so far\n    for _ in range(n):\n        signal = 1 if rng.random() &lt; q else 0\n        act = (1 if lead &gt; 0 else 0) if abs(lead) &gt;= 2 else signal   # two ahead: copy the crowd, ignore the signal\n        acts.append(act); lead += 1 if act else -1\n    return acts\n\nwrong_cascade = np.mean([queue()[-1] == 0 for _ in range(10_000)])\npooled_right = np.mean(rng.binomial(20, 0.6, 10_000) &gt; 10)   # if all 20 signals were shared and counted",
  "sources": [
   "S. Bikhchandani, D. Hirshleifer &amp; I. Welch, “A Theory of Fads, Fashion, Custom, and Cultural Change as Informational Cascades”, <em>Journal of Political Economy</em> 100(5), 1992",
   "A. V. Banerjee, “A Simple Model of Herd Behavior”, <em>Quarterly Journal of Economics</em> 107(3), 1992",
   "L. R. Anderson &amp; C. A. Holt, “Information Cascades in the Laboratory”, <em>American Economic Review</em> 87(5), 1997"
  ]
 },
 "sunk-cost-fallacy": {
  "example": "100 shares bought at 50, now at 35: <strong>1,500</strong> is gone whether you sell or not. The only live question is where the 3,500 should sit. If your honest expectation for the stock is 4% a year and an index fund’s is 7%, holding costs about <strong>105</strong> a year in expected return. “Waiting to get back to even” needs a <strong>43%</strong> rise — a target set by the past, not by the stock.",
  "fails": [
   "Past costs can still carry information: why you bought, and whether that reason still holds, is relevant; what you paid is not.",
   "Taxes can make the price paid matter: a realized loss may be deductible, which favours selling.",
   "Sticking with a plan through a drawdown is not the fallacy if the plan was right; the test is whether you would buy it today."
  ],
  "code": "shares, paid, now = 100, 50.0, 35.0\nsunk = (paid - now) * shares                     # lost whether you sell or not\nhold_view = 0.04                                 # your honest expected return from here\nbest_other = 0.07                                # e.g. an index fund\ncost_of_holding = (best_other - hold_view) * now * shares   # a year's expected shortfall\nback_to_even = paid / now - 1                    # the rise \"getting out at even\" needs",
  "sources": [
   "H. R. Arkes &amp; C. Blumer, “The Psychology of Sunk Cost”, <em>Organizational Behavior and Human Decision Processes</em> 35(1), 1985",
   "B. M. Staw, “Knee-Deep in the Big Muddy: A Study of Escalating Commitment to a Chosen Course of Action”, <em>Organizational Behavior and Human Performance</em> 16(1), 1976",
   "R. Thaler, “Toward a Positive Theory of Consumer Choice”, <em>Journal of Economic Behavior &amp; Organization</em> 1(1), 1980"
  ]
 },
 "gambler-fallacy": {
  "example": "100,000 independent up/down days, each a coin flip. After five down days in a row (3,153 cases) the next day is up <strong>50.5%</strong> of the time — no bounce is due. A twist: flip a coin four times and record the share of heads right after a head. Averaged over many four-flip samples it is <strong>0.41</strong>, not 0.5 (Miller &amp; Sanjurjo 2018). In short samples even a fair coin looks as if it avoids streaks.",
  "fails": [
   "Markets are not coins. Daily returns show weak short-term reversal and medium-term momentum, so “independent” is an approximation.",
   "The famous hot-hand “fallacy” study (Gilovich, Vallone &amp; Tversky 1985) used the very statistic Miller &amp; Sanjurjo showed is biased; corrected, some hot-hand effect reappears.",
   "A strategy losing several times in a row is information about the strategy, not about the next trade’s odds."
  ],
  "code": "rng = np.random.default_rng(0)\nup = rng.random(100_000) &lt; 0.5                   # independent up and down days\nafter_5_down = [up[i] for i in range(5, len(up)) if not up[i - 5:i].any()]\nbounce = np.mean(after_5_down)                   # P(up | five down days in a row)\n\n# Miller &amp; Sanjurjo: in short samples, the average share of heads right after a head is below 1/2\nflips = rng.random((100_000, 4)) &lt; 0.5\nafter_h = flips[:, :-1]\nshares_hh = (flips[:, 1:] &amp; after_h).sum(1)[after_h.any(1)] / after_h.sum(1)[after_h.any(1)]",
  "sources": [
   "A. Tversky &amp; D. Kahneman, “Belief in the Law of Small Numbers”, <em>Psychological Bulletin</em> 76(2), 1971",
   "T. Gilovich, R. Vallone &amp; A. Tversky, “The Hot Hand in Basketball: On the Misperception of Random Sequences”, <em>Cognitive Psychology</em> 17(3), 1985",
   "J. B. Miller &amp; A. Sanjurjo, “Surprised by the Hot Hand Fallacy? A Truth in the Law of Small Numbers”, <em>Econometrica</em> 86(6), 2018"
  ]
 },
 "framing-effect": {
  "example": "Tversky &amp; Kahneman’s 600 lives: both programmes save 200 in expectation. Framed as lives saved, the sure option values at <strong>105.9</strong> against <strong>92.8</strong> for the gamble, so the sure thing wins — 72% chose it in the study. Framed as deaths, the sure loss values at <strong>−438.5</strong> against <strong>−417.7</strong> for the gamble, so the gamble wins — 78% chose it. Same facts; the reference point moved.",
  "fails": [
   "A frame can carry real information: what a seller chooses to emphasise tells you something about them.",
   "Effects are strongest in one-off hypothetical choices; experience and incentives shrink them.",
   "Reframing your own position (“would I buy it at today’s price?”) is a deliberate use of the effect, and a useful one."
  ],
  "code": "def v(x, a=0.88, lam=2.25):                      # prospect theory's value function\n    return np.where(x &gt;= 0, np.abs(x) ** a, -lam * np.abs(x) ** a)\n\n# Tversky &amp; Kahneman (1981): 600 lives at stake, the same two programmes described two ways\nsaved_sure, saved_gamble = v(200), (1 / 3) * v(600)        # \"200 will be saved\" vs \"1/3 chance all 600 are saved\"\ndie_sure, die_gamble = v(-400), (2 / 3) * v(-600)          # \"400 will die\" vs \"2/3 chance all 600 die\"\nexpected_saved = (200, 600 / 3)",
  "sources": [
   "A. Tversky &amp; D. Kahneman, “The Framing of Decisions and the Psychology of Choice”, <em>Science</em> 211(4481), 1981",
   "B. J. McNeil, S. G. Pauker, H. C. Sox &amp; A. Tversky, “On the Elicitation of Preferences for Alternative Therapies”, <em>New England Journal of Medicine</em> 306(21), 1982 — survival versus mortality",
   "D. Kahneman &amp; A. Tversky, “Prospect Theory: An Analysis of Decision under Risk”, <em>Econometrica</em> 47(2), 1979"
  ]
 },
 "mental-accounting": {
  "example": "14,000 in one account, thought of as 10,000 of “my money” and 4,000 of profit. Risking 1% of the first and 25% of the “house money” puts <strong>1,100</strong> at risk, <strong>7.9%</strong> of the account. The same 1% rule on all of it would risk <strong>140</strong>. Where the money came from changed nothing about what losing it would cost.",
  "fails": [
   "Separate buckets can be useful self-control: an emergency fund you do not trade with is a sensible account, even if money is fungible.",
   "Thaler &amp; Johnson (1990) found the house-money effect alongside a “break-even effect”: after losses, people take risks that offer a chance to get back to even.",
   "Measuring each trade on its own also hides correlation: five “separate” bets on the same theme are one bet."
  ],
  "code": "capital, profit = 10_000, 4_000                  # the same 14,000, in two mental accounts\nrisk = 0.01 * capital + 0.25 * profit            # 1% of \"my money\", 25% of \"house money\"\nshare_at_risk = risk / (capital + profit)\none_account = 0.01 * (capital + profit)          # the same 1% rule on all of it",
  "sources": [
   "R. Thaler, “Mental Accounting and Consumer Choice”, <em>Marketing Science</em> 4(3), 1985",
   "R. H. Thaler, “Mental Accounting Matters”, <em>Journal of Behavioral Decision Making</em> 12(3), 1999",
   "R. H. Thaler &amp; E. J. Johnson, “Gambling with the House Money and Trying to Break Even: The Effects of Prior Outcomes on Risky Choice”, <em>Management Science</em> 36(6), 1990"
  ]
 },
 "status-quo-bias": {
  "example": "A 60/40 portfolio left alone through five good years for stocks ends at <strong>75% stocks, 25% bonds</strong>. Nobody chose 75/25; it is what doing nothing produced. In retirement plans the effect is large: when Madrian &amp; Shea (2001) studied a firm that switched to automatic enrolment, participation among new hires went from 37% to 86%, and most kept the default contribution.",
  "fails": [
   "Inaction is sometimes optimal: trading costs and taxes make small adjustments not worth it (see Rebalancing in Risk &amp; Portfolio).",
   "A default can be a quiet recommendation; following it is not always bias.",
   "The same force can be used for good — automatic escalation of savings works because people stay put (Thaler &amp; Benartzi 2004)."
  ],
  "code": "w0 = np.array([0.60, 0.40])                       # target: 60% stocks, 40% bonds\nr = np.array([[0.20, 0.02], [0.15, 0.03], [0.25, -0.01], [0.10, 0.04], [0.18, 0.02]])   # five years, made up\ngrown = w0 * np.prod(1 + r, axis=0)\nw_now = grown / grown.sum()                      # what you hold after five years of doing nothing",
  "sources": [
   "W. Samuelson &amp; R. Zeckhauser, “Status Quo Bias in Decision Making”, <em>Journal of Risk and Uncertainty</em> 1(1), 1988",
   "B. C. Madrian &amp; D. F. Shea, “The Power of Suggestion: Inertia in 401(k) Participation and Savings Behavior”, <em>Quarterly Journal of Economics</em> 116(4), 2001",
   "R. H. Thaler &amp; S. Benartzi, “Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving”, <em>Journal of Political Economy</em> 112(S1), 2004"
  ]
 },
 "market-sentiment-cycle": {
  "example": "A mechanical version of the cycle: price above or below its six-month average, and rising or falling. On 22 made-up months it reads optimism from the 6th month (130), anxiety for one month at 132, panic from the 10th month (129) all the way down, hope for one month at 85, and optimism again from 88. The eleven-phase chart collapses to four, and the in-between phases last a single month — which is why they are so hard to spot live.",
  "fails": [
   "The popular cycle chart is an illustration, not a finding; no study fixes the phases, their order or their length.",
   "Real cycles skip phases, repeat them, and stall for years. Labelling the present is far harder than labelling the past.",
   "Survey-based sentiment does carry some information about returns (Baker &amp; Wurgler 2007), but as a tilt, not as a clock."
  ],
  "code": "close = pd.Series([100, 104, 109, 115, 123, 130, 133, 134, 132, 129, 124, 116,\n                   106, 96, 88, 84, 83, 85, 88, 93, 99, 106])   # 22 months, made up\ntrend = close.rolling(6).mean()\nrising = close.diff() &gt; 0\nphase = np.select([(close &gt; trend) &amp; rising, (close &gt; trend) &amp; ~rising,\n                   (close &lt;= trend) &amp; ~rising, (close &lt;= trend) &amp; rising],\n                  ['optimism-euphoria', 'anxiety-denial', 'panic-capitulation', 'hope-relief'], '')\nstarts = [(i, ph) for i, ph in enumerate(phase) if ph and phase[i - 1] != ph]   # month each phase begins",
  "sources": [
   "<em>Irrational Exuberance</em>, R. J. Shiller, Princeton University Press, 2000",
   "<em>Manias, Panics, and Crashes: A History of Financial Crises</em>, C. P. Kindleberger (later editions with R. Z. Aliber), 1978",
   "M. Baker &amp; J. Wurgler, “Investor Sentiment in the Stock Market”, <em>Journal of Economic Perspectives</em> 21(2), 2007"
  ]
 },
 "accumulation-distribution": {
  "example": "After a fall from 60, the last ten days trade in a box <strong>7.3%</strong> wide. Inside it, average volume on up days is <strong>1.5 times</strong> volume on down days. A Wyckoff reader calls that accumulation: someone buying on rallies while sellers dry up. The code finds the pattern; the story about who is behind it is an interpretation.",
  "fails": [
   "The “Composite Man” is a narrative device. The same volume can be read as accumulation or distribution, and no peer-reviewed test has validated Wyckoff’s schematics.",
   "Volume does carry information about prices (Blume, Easley &amp; O’Hara 1994), which is the part worth keeping.",
   "A range can resolve either way; the label is only confirmed by the breakout."
  ],
  "code": "df = pd.DataFrame({                              # a fall, then a sideways range, made up\n    'close':  [60, 56, 52, 49, 47, 48, 46, 47.5, 47, 48.5, 47.5, 49, 48, 49.5],\n    'volume': [30, 35, 40, 45, 50, 38, 22, 36, 20, 40, 21, 42, 19, 44]})\nbox = df.tail(10)                                    # the last ten days\nwidth = (box.close.max() - box.close.min()) / box.close.mean()\nup = box.close.diff() &gt; 0\nup_down_volume = box.volume[up].mean() / box.volume[~up].mean()   # &gt; 1 is read as quiet buying",
  "sources": [
   "R. D. Wyckoff, <em>The Richard D. Wyckoff Method of Trading and Investing in Stocks</em>, course, 1931",
   "L. Blume, D. Easley &amp; M. O’Hara, “Market Statistics and Technical Analysis: The Role of Volume”, <em>Journal of Finance</em> 49(1), 1994",
   "<em>The Three Skills of Top Trading</em>, H. O. Pruden, Wiley, 2007"
  ]
 },
 "euphoria-panic": {
  "example": "The Nasdaq Composite closed at 5,048.62 on 10 March 2000 and at 1,114.11 on 9 October 2002: a fall of <strong>78%</strong>. Getting back needed a rise of <strong>353%</strong>; it did not close above the 2000 peak again until 2015. The asymmetry is the whole lesson: a +150% run followed by a −60% fall leaves you at exactly <strong>0%</strong>.",
  "fails": [
   "Big run-ups do not reliably predict lower average returns, but they do predict a higher chance of a crash (Greenwood, Shleifer &amp; You 2019).",
   "“This time is different” is sometimes true; the internet did change the economy. Euphoria is about price relative to plausible outcomes, not about the story being false.",
   "Panic bottoms are only clear afterwards; buying the first panic is often early."
  ],
  "code": "peak, trough = 5048.62, 1114.11                  # Nasdaq Composite closes, 10 Mar 2000 and 9 Oct 2002\nfall = trough / peak - 1\nneeded = peak / trough - 1                       # the rise needed just to get back\nup, down = 1.50, -0.60\nround_trip = (1 + up) * (1 + down) - 1           # +150% then -60%",
  "sources": [
   "R. Greenwood, A. Shleifer &amp; Y. You, “Bubbles for Fama”, <em>Journal of Financial Economics</em> 131(1), 2019",
   "<em>Manias, Panics, and Crashes: A History of Financial Crises</em>, C. P. Kindleberger (later editions with R. Z. Aliber), 1978",
   "<em>Irrational Exuberance</em>, R. J. Shiller, Princeton University Press, 2000"
  ]
 },
 "smart-money-dumb-money": {
  "example": "A fund returns +30%, +25%, −20%, −10% and +15%: <strong>6.1%</strong> a year. Its investors put in 100, then 200 and 400 after the two good years, and take out 300 and 100 after the bad ones. Their money-weighted return is <strong>−3.1%</strong> a year, and they end with 247 for a net 300 put in. Same fund, opposite results; the difference is timing the flows. Dichev (2007) found this gap in market-wide data.",
  "fails": [
   "“Smart” and “dumb” are labels for after the fact. Institutions herd and chase too; retail flows are not always wrong.",
   "Insider purchases are informative on average (Lakonishok &amp; Lee 2001), insider sales much less so — many sales are for diversification or tax.",
   "Commercials in the COT report are mostly hedgers; their positions reflect hedging needs as well as views."
  ],
  "code": "r = np.array([0.30, 0.25, -0.20, -0.10, 0.15])   # a fund's return each year, made up\nflow = np.array([100, 200, 400, -300, -100])     # money investors put in (+) or take out (-) at each year's start\n\nvalue = 0.0\nfor f, x in zip(flow, r):\n    value = (value + f) * (1 + x)\nfund = np.prod(1 + r) ** (1 / len(r)) - 1        # time-weighted: what the fund earned\n\ncash = np.append(-flow, value)                   # the investors' own cash flows\nroots = np.roots(cash[::-1])                     # money-weighted: the IRR of those flows\nirr = [z.real - 1 for z in 1 / roots if abs(z.imag) &lt; 1e-9 and z.real &gt; 0]   # per-year rate",
  "sources": [
   "I. D. Dichev, “What Are Stock Investors’ Actual Historical Returns? Evidence from Dollar-Weighted Returns”, <em>American Economic Review</em> 97(1), 2007",
   "A. Frazzini &amp; O. A. Lamont, “Dumb Money: Mutual Fund Flows and the Cross-Section of Stock Returns”, <em>Journal of Financial Economics</em> 88(2), 2008",
   "J. Lakonishok &amp; I. Lee, “Are Insider Trades Informative?”, <em>Review of Financial Studies</em> 14(1), 2001"
  ]
 },
 "mean-reversion-psychology": {
  "example": "10,000 managers whose results are a little skill and a lot of luck. Last year’s top 10% averaged <strong>3.93</strong>; the same managers average <strong>0.83</strong> this year. They kept <strong>21%</strong> of their lead, close to the theoretical one in five — the share of the variation that is skill. Nobody lost their touch; most of the lead was luck, and luck does not repeat.",
  "fails": [
   "Regression to the mean is about noisy measurements, not a force pulling prices back. A price has no fixed mean to return to.",
   "Evidence for mean reversion in stock prices is weak over short horizons and debated over long ones (Poterba &amp; Summers 1988; Fama &amp; French 1988).",
   "Waiting for “the extreme” assumes you know where the mean is. If it has moved, what looks extreme is the new normal."
  ],
  "code": "rng = np.random.default_rng(3)\nskill = rng.normal(0, 1, 10_000)                 # 10,000 managers: a little skill,\nyear1 = skill + rng.normal(0, 2, 10_000)         # a lot of luck\nyear2 = skill + rng.normal(0, 2, 10_000)\ntop = year1 &gt;= np.quantile(year1, 0.9)           # last year's top 10%\nkept = year2[top].mean() / year1[top].mean()     # theory: var(skill) / var(total) = 1 / 5",
  "sources": [
   "D. Kahneman &amp; A. Tversky, “On the Psychology of Prediction”, <em>Psychological Review</em> 80(4), 1973",
   "J. M. Poterba &amp; L. H. Summers, “Mean Reversion in Stock Prices: Evidence and Implications”, <em>Journal of Financial Economics</em> 22(1), 1988",
   "E. F. Fama &amp; K. R. French, “Permanent and Temporary Components of Stock Prices”, <em>Journal of Political Economy</em> 96(2), 1988",
   "M. M. Carhart, “On Persistence in Mutual Fund Performance”, <em>Journal of Finance</em> 52(1), 1997"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
/* selfcheck:start — "Check yourself" questions; js/self-check.js renders them. */
const SELF_CHECK = {
 "loss-aversion": [
  {
   "q": "According to Tversky and Kahneman’s 1992 estimates, a loss feels about how many times as strong as an equal gain?",
   "options": [
    "About the same.",
    "About twice (λ ≈ 2.25).",
    "About ten times."
   ],
   "answer": 1,
   "why": "Later studies find a range of values, but the asymmetry itself is one of the most replicated findings in behavioural economics."
  },
  {
   "q": "Many people refuse a 50/50 bet to lose $100 or win $150. Why?",
   "options": [
    "The bet has a negative expected value.",
    "They misread the odds.",
    "Loss aversion: the possible loss weighs more than the larger possible gain."
   ],
   "answer": 2,
   "why": "The expected value is +$25, but with losses weighted about twice, the bet feels like a loss."
  },
  {
   "q": "What is myopic loss aversion?",
   "options": [
    "Being unable to see losses coming.",
    "Preferring short-term investments.",
    "Checking a portfolio often makes it feel riskier, because short periods show more losses."
   ],
   "answer": 2,
   "why": "Benartzi &amp; Thaler (1995) used it to explain why investors demand such a high premium for holding stocks."
  }
 ],
 "gambler-fallacy": [
  {
   "q": "A roulette wheel has come up red five times in a row. The chance of black on the next spin is…",
   "options": [
    "unchanged — each spin is independent.",
    "higher, because black is due.",
    "lower, because red is on a streak."
   ],
   "answer": 0,
   "why": "The wheel has no memory. Believing black is “due” is the gambler’s fallacy; believing red is “hot” is its mirror image."
  },
  {
   "q": "“The stock fell five days in a row, so it must bounce.” What is wrong with that reasoning?",
   "options": [
    "Nothing — streaks always end with a bounce.",
    "The streak shows a downtrend, so it will keep falling.",
    "Without evidence of mean reversion at that horizon, a streak says little about the next day."
   ],
   "answer": 2,
   "why": "Daily stock returns are close to independent. Patterns must be tested, not assumed from a streak."
  },
  {
   "q": "What does the law of large numbers actually say?",
   "options": [
    "The proportion settles down as trials accumulate — early deviations are diluted, not corrected.",
    "Outcomes balance out, so an excess of reds must be followed by blacks.",
    "Small samples look like the whole population."
   ],
   "answer": 0,
   "why": "After 10 extra reds, the proportion still tends to 50% because the 10 become a vanishing share of thousands of spins."
  }
 ],
 "disposition-effect": [
  {
   "q": "What is the disposition effect?",
   "options": [
    "Buying stocks that have risen recently.",
    "Selling winners too early and holding on to losers too long.",
    "Refusing to sell anything."
   ],
   "answer": 1,
   "why": "Shefrin &amp; Statman (1985) named it; realising a loss is painful, realising a gain feels good."
  },
  {
   "q": "In Odean’s (1998) study of brokerage accounts, how did the winners investors sold compare with the losers they kept?",
   "options": [
    "The losers kept recovered and beat the winners sold.",
    "There was no difference.",
    "The winners sold went on to beat the losers kept over the following year."
   ],
   "answer": 2,
   "why": "The difference was about 3.4 percentage points over the next year — the habit cost money, not just taxes."
  },
  {
   "q": "Why is the disposition effect costly for taxes too?",
   "options": [
    "Losses are taxed more heavily than gains.",
    "Selling winners realises taxable gains, while held losses could have offset them.",
    "It is not — taxes are the same either way."
   ],
   "answer": 1,
   "why": "Tax rules usually reward the opposite: realise losses, defer gains."
  }
 ],
 "overconfidence": [
  {
   "q": "Barber and Odean (2000) sorted households by how much they traded. What did the most active traders earn?",
   "options": [
    "The highest returns.",
    "Clearly lower returns after costs than those who traded least.",
    "The same as everyone else."
   ],
   "answer": 1,
   "why": "Their paper is titled “Trading Is Hazardous to Your Wealth”: costs ate the gains that confident trading was supposed to bring."
  },
  {
   "q": "People asked for 90% confidence intervals on quantities they do not know contain the truth…",
   "options": [
    "about 90% of the time.",
    "more than 90% of the time.",
    "far less than 90% of the time — often only about half."
   ],
   "answer": 2,
   "why": "Intervals are too narrow: people are more sure than their knowledge justifies."
  },
  {
   "q": "Which habit helps against overconfidence?",
   "options": [
    "Writing forecasts down with a probability, then scoring them later.",
    "Trading more often to gain experience.",
    "Relying on gut feeling."
   ],
   "answer": 0,
   "why": "A decision journal turns vague memories of being right into a calibration record."
  }
 ],
 "anchoring": [
  {
   "q": "What is anchoring?",
   "options": [
    "Estimates pulled towards a number seen first, even an irrelevant one.",
    "Holding a position too long.",
    "Following the crowd."
   ],
   "answer": 0,
   "why": "In Tversky &amp; Kahneman’s 1974 experiment, a spun wheel of fortune shifted people’s estimates of a factual quantity."
  },
  {
   "q": "George and Hwang (2004) linked the 52-week high to momentum. What did they find?",
   "options": [
    "Stocks near their 52-week high tended to keep outperforming, as if investors under-reacted near that anchor.",
    "Stocks near their 52-week high tended to fall back.",
    "The 52-week high had no relation to returns."
   ],
   "answer": 0,
   "why": "Nearness to the 52-week high explained much of the momentum effect in their sample."
  },
  {
   "q": "A common anchor in your own portfolio is…",
   "options": [
    "the index level.",
    "the price you paid, which says nothing about where the stock goes next.",
    "the dividend yield."
   ],
   "answer": 1,
   "why": "Judge a holding on its prospects from today’s price, not on whether it is above or below your entry."
  }
 ],
 "sunk-cost-fallacy": [
  {
   "q": "What is the sunk cost fallacy?",
   "options": [
    "Continuing something because of what has already been spent and cannot be recovered.",
    "Cutting losses too early.",
    "Spending too little on research."
   ],
   "answer": 0,
   "why": "Past costs are the same whichever way you decide now, so they should not affect the choice."
  },
  {
   "q": "Which question cuts through it for an investment?",
   "options": [
    "“Would I buy this today, at today’s price, knowing what I know now?”",
    "“How much have I lost on it?”",
    "“What did I pay for it?”"
   ],
   "answer": 0,
   "why": "If the answer is no, holding it is the same decision as buying it."
  },
  {
   "q": "Buying more of a losing position to “win back” what was lost is…",
   "options": [
    "always a sound strategy.",
    "sunk-cost reasoning — the decision should rest on expected future returns.",
    "required by risk management."
   ],
   "answer": 1,
   "why": "Averaging down can be reasonable when the outlook justifies it; the size of the past loss is not a reason."
  }
 ]
};
function selfCheck(id) {
  return typeof renderSelfCheck === 'function' ? renderSelfCheck('markets/psychology/' + id, SELF_CHECK[id]) : '';
}
/* selfcheck:end */
function depthHtml(id) {
  return depthOnly(id) + selfCheck(id);
}
function depthOnly(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, run: 'markets-psychology/' + id, codeNote: 'Assumes <code>import numpy as np</code> and <code>import pandas as pd</code>. Each snippet carries its own example numbers; the comments say which are made up.' });
}
/* depth:end */

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  let html = buildHome();
  TOPIC_DATA.forEach(t => {
    html += `<div class="topic" id="${t.id}">`;
    html += `<div class="topic-header"><div class="topic-meta"><div class="topic-num">${t.num} — ${t.category}</div><h2>${t.title}</h2></div><span class="evidence-badge heuristic" title="Behavioral concept — supported by research in behavioral economics but application to trading is heuristic">◐ Behavioral</span></div>`;
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
    <h2>Market <em>Psychology</em></h2>
    <p style="margin-top:14px">25 behavioral patterns across cognitive biases, emotional drivers, herd dynamics, decision traps, and market cycles — the human side of price action.</p>
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
    <div class="cat-card" onclick="showSection('sec-biases','confirmation-bias')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M7.5 12h2l1-3 2 6 1-3h3"/></svg></div>
      <div class="cat-card-name">Cognitive Biases</div>
      <div class="cat-card-count">5 topics · Confirmation, Anchoring, Recency</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-emotional','fear-and-greed')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7.5-4.8-9.3-9.2A5 5 0 0 1 12 7a5 5 0 0 1 9.3 3.8C19.5 15.2 12 20 12 20z"/></svg></div>
      <div class="cat-card-name">Emotional Drivers</div>
      <div class="cat-card-count">5 topics · Fear & Greed, Loss Aversion</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-herd','herd-behavior')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="9" r="2.6"/><circle cx="16.5" cy="10.5" r="2.2"/><path d="M3.5 19a4.8 4.8 0 0 1 9 0M13.5 19a4 4 0 0 1 7 0"/></svg></div>
      <div class="cat-card-name">Herd & Social</div>
      <div class="cat-card-count">5 topics · Herding, FOMO, Social Proof</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-decision','sunk-cost-fallacy')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5 21 19.5H3z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="16.6" r=".6" fill="currentColor" stroke="none"/></svg></div>
      <div class="cat-card-name">Decision Traps</div>
      <div class="cat-card-count">5 topics · Sunk Cost, Gambler's, Framing</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-cycles','market-sentiment-cycle')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.4-5.7"/><polyline points="20.5 2.5 20.5 7 16 7"/></svg></div>
      <div class="cat-card-name">Market Cycles</div>
      <div class="cat-card-count">5 topics · Sentiment, Euphoria & Panic</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   Individual Topic Builders
   ═══════════════════════════════════════════════════════════════ */
const builders = {};

builders['confirmation-bias'] = () => `
<p><strong>Confirmation bias</strong> is the tendency to search for, interpret, and recall information that confirms existing beliefs.</p>
<div class="callout"><strong>In trading:</strong> You believe Tesla will go up → you read only bullish analyses → ignore bearish data → feel increasingly "certain" → but your certainty is built on a filtered dataset.</div>
<p><strong>Mitigation:</strong> Actively seek the strongest opposing argument. Write down <em>what would make me wrong</em> before every trade. Track whether your "confirming" sources were actually predictive.</p>`;

builders['anchoring'] = () => `
<p><strong>Anchoring</strong> — over-relying on the first or most prominent piece of information as a reference point.</p>
<div class="fb">Your buy price ($50) → stock drops to $30 → "it's cheap" ← anchored to $50, not to intrinsic value</div>
<div class="callout"><strong>Common anchors:</strong><br>• Purchase price ("I'll sell when I get back to even")<br>• 52-week highs ("it was $100, now $60 — bargain!")<br>• Round numbers ($100, $10,000 Bitcoin)<br>• Analyst price targets</div>
<p>Solution: value assets on future fundamentals, not past prices.</p>`;

builders['recency-bias'] = () => `
<p><strong>Recency bias</strong> — weighting recent events disproportionately when forming expectations.</p>
<div class="callout"><strong>Mechanism:</strong><br>• Bull market for 5 years → "stocks always go up" (extrapolation)<br>• Crash last month → "the market is too dangerous" (fear persistence)<br>• Recent quarter's earnings → overshadows decade of data</div>
<p>Historical base rates are more reliable than recent anecdotes. The recent past <em>feels</em> like the permanent future — it isn't.</p>`;

builders['availability-heuristic'] = () => `
<p>The <strong>availability heuristic</strong> (Tversky & Kahneman, 1973) — judging probability by how easily examples come to mind.</p>
<div class="callout"><strong>Why it distorts:</strong><br>• Dramatic events (crashes, bankruptcies) are <em>vivid</em> and <em>memorable</em><br>• Steady compounding is <em>boring</em> and <em>forgettable</em><br>• Media amplifies dramatic events → they feel more probable<br>• Result: overestimate crash risk, underestimate steady-growth scenarios</div>
<p>Counter: use <strong>base rates</strong> (actual historical frequencies) not <strong>vivid memories</strong>.</p>`;

builders['hindsight-bias'] = () => `
<p><strong>Hindsight bias</strong> — "I knew it all along." After an outcome, people believe they predicted it.</p>
<div class="callout"><strong>The damage:</strong><br>1. Prevents learning — if you "knew," there's nothing to improve<br>2. Creates overconfidence in future predictions<br>3. Makes past decisions look obvious when they weren't<br>4. Leads to unfair self-criticism ("how could I miss that?")</div>
<p><strong>Fix:</strong> Keep a <em>decision journal</em>. Record your reasoning <em>before</em> the outcome. Compare predictions to results. Humbling — and educational.</p>`;

builders['fear-and-greed'] = () => `
<p>The two primal market emotions — <strong>fear</strong> and <strong>greed</strong> — drive the pendulum of market psychology.</p>
<div class="callout"><strong>Greed cycle:</strong> opportunity → interest → excitement → euphoria → "I can't lose"<br><strong>Fear cycle:</strong> concern → worry → anxiety → panic → "I must get out at any price"</div>
<p>Warren Buffett's famous rule: <em>"Be fearful when others are greedy, and greedy when others are fearful."</em></p>
<p>The CNN Fear & Greed Index aggregates 7 market signals into a 0–100 scale measuring current dominant emotion.</p>`;

builders['loss-aversion'] = () => `
<p><strong>Loss aversion</strong> (Kahneman & Tversky, Prospect Theory, 1979) — losses are felt approximately <strong>2× more strongly</strong> than equivalent gains.</p>
<div class="fb">Utility of losing $100 ≈ −2 × Utility of gaining $100</div>
<div class="callout"><strong>Trading consequences:</strong><br>• Hold losers too long (to avoid realizing the painful loss)<br>• Sell winners too quickly (to lock in the pleasurable gain)<br>• Refuse to take small calculated losses → small loss becomes catastrophic<br>• Trading costs and overtrading explain much of retail underperformance (Barber &amp; Odean 2000); loss aversion adds to it</div>`;

builders['regret-aversion'] = () => `
<p><strong>Regret aversion</strong> — making decisions to minimize future regret rather than maximize expected value.</p>
<div class="callout"><strong>Two forms:</strong><br>• <strong>Errors of commission:</strong> "I bought → it crashed → I regret acting"<br>• <strong>Errors of omission:</strong> "I didn't buy → it soared → I regret NOT acting"<br><br>Short-term: we regret actions more. Long-term: we regret inactions more.</div>
<p>In markets, regret aversion causes paralysis, herd-following ("at least I won't be the only one who's wrong"), and excessive conservatism.</p>`;

builders['overconfidence'] = () => `
<p><strong>Overconfidence</strong> — systematically overestimating one's ability to predict, analyze, and control outcomes.</p>
<div class="callout"><strong>Three types:</strong><br>1. <strong>Overestimation:</strong> "I'll beat the market" (in one U.S. student sample, 93% rated themselves above-median drivers — Svenson 1981)<br>2. <strong>Overprecision:</strong> Confidence intervals too narrow ("I'm 95% sure it'll hit $50" — it won't)<br>3. <strong>Overplacement:</strong> "I'm a better trader than most people"</div>
<p>Barber & Odean (2000): the most active fifth of households earned <strong>7.1 percentage points a year less</strong>, after costs, than the least active fifth. Overconfidence → overtrading → underperformance.</p>`;

builders['disposition-effect'] = () => `
<p>The <strong>disposition effect</strong> (Shefrin & Statman, 1985) — selling winners too early and holding losers too long.</p>
<div class="callout"><strong>Mechanism:</strong><br>• Winner: feels good → sell to "lock in" pleasure → miss further gains<br>• Loser: feels painful → hold to avoid realizing pain → loss deepens<br><br><strong>Result:</strong> The exact opposite of the rational strategy — let winners run, cut losers short.</div>
<p>It's also tax-inefficient: you pay capital gains tax on winners early but can't deduct unrealized losses.</p>`;

builders['herd-behavior'] = () => `
<p><strong>Herd behavior</strong> — following the crowd's actions regardless of your own analysis.</p>
<div class="callout"><strong>Why we herd:</strong><br>• <strong>Evolutionary:</strong> safety in numbers (wildebeest at the river)<br>• <strong>Informational:</strong> "They must know something I don't"<br>• <strong>Social:</strong> fear of standing out, career risk ("no one got fired for buying IBM")<br><br><strong>Market impact:</strong> Creates momentum that overshoots fair value in both directions</div>
<p>Keynes: <em>"It is better for reputation to fail conventionally than to succeed unconventionally."</em></p>`;

builders['fomo'] = () => `
<p><strong>FOMO</strong> (Fear Of Missing Out) — the anxiety that others are profiting from an opportunity you're not participating in.</p>
<div class="callout"><strong>FOMO escalation spiral:</strong><br>1. See others posting gains on social media<br>2. Anxiety builds — "I'm missing the move"<br>3. Abandon risk management and buy at elevated prices<br>4. Price reverses — you bought the top<br>5. Now you're both losing money AND regretting the decision</div>
<p>FOMO is strongest at <em>market tops</em> — exactly when risk is highest.</p>`;

builders['social-proof'] = () => `
<p><strong>Social proof</strong> (Cialdini, 1984) — using others' behavior as evidence of the correct action.</p>
<div class="callout"><strong>Market expressions:</strong><br>• "Everyone is buying crypto — it must be good"<br>• Following influencer/expert recommendations blindly<br>• Popularity of a stock = perceived quality<br>• Crowded trades feel safe — until they reverse simultaneously</div>
<p>Social proof works well in <strong>stable, familiar</strong> environments. It fails catastrophically in <strong>uncertain, novel</strong> situations — exactly when you need independent thinking most.</p>`;

builders['contrarian-thinking'] = () => `
<p><strong>Contrarian thinking</strong> — deliberately going against prevailing consensus at sentiment extremes.</p>
<div class="callout"><strong>Not simply "always disagree":</strong><br>• Contrarian ≠ always opposite<br>• Only at <em>sentiment extremes</em> (extreme fear or greed)<br>• Requires: measuring sentiment objectively + having a thesis + emotional discipline<br>• Feels deeply uncomfortable — humans are hardwired for social conformity</div>
<p>Howard Marks’s point, in paraphrase: superior results need views that differ from the consensus <em>and</em> turn out to be right.</p>`;

builders['information-cascades'] = () => `
<p><strong>Information cascades</strong> (Banerjee, 1992; Bikhchandani et al., 1992) — when individuals rationally follow others, ignoring their own private signals.</p>
<div class="callout"><strong>How a cascade forms:</strong><br>1. Person A acts on their signal → buys<br>2. Person B sees A buy, combines with own signal → buys too<br>3. Person C infers from A+B → buys regardless of own signal<br>4. Everyone follows — even though total information is thin<br><br><strong>Key insight:</strong> Cascades are <em>fragile</em>. A small credible contrary signal can shatter them → sudden reversal.</div>`;

builders['sunk-cost-fallacy'] = () => `
<p>The <strong>sunk cost fallacy</strong> — continuing a course of action because of past investment, rather than future expected value.</p>
<div class="fb">Past cost = irrelevant → Only future costs and benefits should drive decisions</div>
<div class="callout"><strong>In trading:</strong><br>• "I've already lost $5K — I can't sell now" → the $5K is gone either way<br>• "I've spent 6 months researching this company" → past time doesn't change future outlook<br>• Doubling down on a loser to "make it back" → escalation of commitment</div>
<p>Rational rule: ignore what you can't change (past), decide based on what you can (future).</p>`;

builders['gambler-fallacy'] = () => `
<p>The <strong>gambler's fallacy</strong> — believing past random events affect future probabilities.</p>
<div class="callout"><strong>Classic example:</strong> Monte Carlo, 1913 — black came up 26 times in a row. Gamblers bet massively on red, believing it was "due."<br><br><strong>In markets:</strong><br>• "It's fallen 5 days — it's due for a bounce" (each day is largely independent)<br>• "This strategy has lost 3 times — the next one must win"<br>• Confusing <em>statistical expectation over many trials</em> with <em>the next single event</em></div>
<p>Independent events have no memory. Previous outcomes don't affect future outcomes.</p>`;

builders['framing-effect'] = () => `
<p>The <strong>framing effect</strong> (Tversky & Kahneman, 1981) — identical information presented differently leads to different decisions.</p>
<div class="callout"><strong>Gain frame:</strong> "This trade has a 70% success rate" → people take it<br><strong>Loss frame:</strong> "This trade has a 30% failure rate" → people avoid it<br><br><strong>Same fact, different emotions, different decisions.</strong></div>
<p>In investing: "stock is 20% off its highs" (bargain frame) vs. "stock fell 20%" (danger frame). Reframing a situation always changes your emotional response — be aware of which frame you're in.</p>`;

builders['mental-accounting'] = () => `
<p><strong>Mental accounting</strong> (Richard Thaler, 1985) — treating money differently based on arbitrary categories.</p>
<div class="callout"><strong>Examples:</strong><br>• <strong>House money effect:</strong> Profits from winning trades are risked more freely — "it's house money"<br>• <strong>Found money:</strong> A tax refund or bonus spent more frivolously than salary<br>• <strong>Separate buckets:</strong> "My retirement account" vs. "my trading account" — but it's all your wealth<br><br>Money is fungible. A dollar of profit = a dollar of salary = a dollar of savings.</div>`;

builders['status-quo-bias'] = () => `
<p><strong>Status quo bias</strong> — preference for the current state of affairs; any change is perceived as a loss.</p>
<div class="callout"><strong>In investing:</strong><br>• Never rebalancing a portfolio → allocation drifts far from target<br>• Sticking with an underperforming fund because switching feels risky<br>• Default 401(k) allocation → most employees never change it<br>• Holding inherited stocks forever regardless of fundamentals</div>
<p>Related to <strong>loss aversion</strong>: changing feels like a potential loss (of the current state), while the current state feels "free." It isn't.</p>`;

builders['market-sentiment-cycle'] = () => `
<p>The <strong>market sentiment cycle</strong> — the emotional journey investors collectively experience through a full market cycle.</p>
<div class="callout"><strong>The phases:</strong><br>
<strong>Bottoming:</strong> Disbelief → Hope → Relief<br>
<strong>Rising:</strong> Optimism → Excitement → Thrill<br>
<strong>Topping:</strong> <span style="color:var(--accent)">Euphoria ← Maximum financial risk</span><br>
<strong>Falling:</strong> Anxiety → Denial → Fear → Panic<br>
<strong>Bottoming:</strong> <span style="color:var(--accent2)">Capitulation ← Maximum financial opportunity</span> → Depression
</div>
<p>Maximum risk arrives at the point of maximum emotional comfort. Maximum opportunity arrives at maximum discomfort.</p>`;

builders['accumulation-distribution'] = () => `
<p><strong>Accumulation & Distribution</strong> — Wyckoff's framework for understanding market phases through the lens of "smart money" behavior.</p>
<div class="callout"><strong>Four phases:</strong><br>1. <strong>Accumulation:</strong> Smart money quietly buys. Volume low. Public uninterested.<br>2. <strong>Markup:</strong> Price rises. Public notices. Volume increases. FOMO begins.<br>3. <strong>Distribution:</strong> Smart money sells to eager public. High volume. Media attention peaks.<br>4. <strong>Markdown:</strong> Price falls. Public panics. Smart money waits to re-accumulate.</div>
<p>Wyckoff's "Composite Man" = the aggregate of well-informed money deliberately accumulating or distributing.</p>`;

builders['euphoria-panic'] = () => `
<p><strong>Euphoria and Panic</strong> — the two emotional extremes that mark market tops and bottoms.</p>
<div class="callout"><strong>Signs of euphoria:</strong><br>• "This time is different" — the four most expensive words<br>• Retail investor participation surges<br>• IPOs of marginal companies succeed wildly<br>• Taxi drivers / neighbors give stock tips<br><br><strong>Signs of panic:</strong><br>• "I can't take it anymore" — capitulation<br>• Margin calls force selling at any price<br>• VIX spikes to 40+<br>• "Stocks are dead" headlines</div>`;

builders['smart-money-dumb-money'] = () => `
<p><strong>Smart Money vs. Dumb Money</strong> — the persistent pattern of institutional (informed) and retail (uninformed) behavior.</p>
<div class="callout"><strong>Tracking tools:</strong><br>• <strong>COT Report:</strong> Commitment of Traders — shows positioning of commercials (hedgers) vs. speculators<br>• <strong>Insider buying/selling:</strong> Insider purchases have been followed by above-average returns on average (Lakonishok &amp; Lee 2001); insider sales say much less<br>• <strong>Put/Call ratio:</strong> often read as a contrarian gauge — very high readings tend to occur in sell-offs<br>• <strong>Fund flows:</strong> Money tends to arrive after strong returns and leave after weak ones; stocks that flows chase go on to underperform (Frazzini &amp; Lamont 2008)</div>
<p>The key insight: smart money acts <em>before</em> the move; dumb money reacts <em>after</em> the move is largely complete.</p>`;

builders['mean-reversion-psychology'] = () => `
<p><strong>Mean reversion psychology</strong> — the principle that extremes in both price and sentiment revert toward their long-term average.</p>
<div class="callout"><strong>Statistical basis:</strong> Regression to the mean (Galton, 1886). Extreme observations are followed by less extreme ones — not by "correction" but by probability.<br><br><strong>Market application:</strong><br>• Extreme euphoria → sentiment reverts toward neutral (prices fall)<br>• Extreme panic → sentiment reverts toward neutral (prices rise)<br>• The VIX and credit spreads tend to mean-revert; valuation ratios such as P/E do too, but slowly, and where their “mean” lies is debated</div>
<p>Patience is the key: wait for the extreme, then let mean reversion work in your favor.</p>`;
