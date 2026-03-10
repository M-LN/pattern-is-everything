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
  { id:'hindsight-bias', num:'05', title:'Hindsight Bias', category:'Cognitive Biases', keywords:['knew it all along','predictable','retroactive','overestimate','narrative fallacy','obvious'], content:'"I knew it all along." After an event, people believe they predicted it. This prevents learning from mistakes — if you "knew" the crash was coming, there\'s nothing to learn. Dangerous for improving trading decisions.' },
  { id:'fear-and-greed', num:'06', title:'Fear & Greed', category:'Emotional Drivers', keywords:['emotion cycle','index','extreme fear','extreme greed','Buffett','pendulum','sentiment'], content:'The two dominant market emotions. Greed drives bubbles — "I need to get in before it\'s too late." Fear drives crashes — "I need to get out before I lose everything." Buffett: "Be fearful when others are greedy, greedy when others are fearful."' },
  { id:'loss-aversion', num:'07', title:'Loss Aversion', category:'Emotional Drivers', keywords:['Kahneman','Tversky','prospect theory','2x pain','losses loom larger','risk averse gains','risk seeking losses'], content:'Losses hurt ~2× more than equivalent gains feel good (Kahneman & Tversky, Prospect Theory). This causes traders to hold losers too long (hoping to avoid realizing the loss) and sell winners too quickly (locking in gains).' },
  { id:'regret-aversion', num:'08', title:'Regret Aversion', category:'Emotional Drivers', keywords:['anticipated regret','inaction','omission','commission','paralysis','should have'], content:'Fear of making a decision you\'ll regret. Leads to inaction (paralysis) or following the crowd (if everyone else does it, at least I won\'t regret alone). People regret actions (commission) more than inactions (omission) short-term, but the reverse long-term.' },
  { id:'overconfidence', num:'09', title:'Overconfidence', category:'Emotional Drivers', keywords:['illusion of control','above average','excessive trading','Barber','Odean','prediction','calibration'], content:'Believing you know more than you do. Overconfident traders trade too frequently (Barber & Odean: higher turnover = lower returns), underestimate risk, and use insufficient diversification. 93% of drivers think they\'re "above average" — same in markets.' },
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

function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  let html = buildHome();
  TOPIC_DATA.forEach(t => {
    html += `<div class="topic" id="${t.id}">`;
    html += `<div class="topic-header"><div class="topic-meta"><div class="topic-num">${t.num} — ${t.category}</div><h2>${t.title}</h2></div></div>`;
    html += `<div class="va"><canvas id="${t.id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}Canvas"></canvas></div>`;
    html += `<div class="topic-body">${builders[t.id] ? builders[t.id]() : `<p>${t.content}</p>`}</div>`;
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
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-biases','confirmation-bias')">
      <div class="cat-card-icon">🧠</div>
      <div class="cat-card-name">Cognitive Biases</div>
      <div class="cat-card-count">5 topics · Confirmation, Anchoring, Recency</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-emotional','fear-and-greed')">
      <div class="cat-card-icon">💓</div>
      <div class="cat-card-name">Emotional Drivers</div>
      <div class="cat-card-count">5 topics · Fear & Greed, Loss Aversion</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-herd','herd-behavior')">
      <div class="cat-card-icon">🐑</div>
      <div class="cat-card-name">Herd & Social</div>
      <div class="cat-card-count">5 topics · Herding, FOMO, Social Proof</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-decision','sunk-cost-fallacy')">
      <div class="cat-card-icon">🪤</div>
      <div class="cat-card-name">Decision Traps</div>
      <div class="cat-card-count">5 topics · Sunk Cost, Gambler's, Framing</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-cycles','market-sentiment-cycle')">
      <div class="cat-card-icon">🔄</div>
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
<div class="callout"><strong>Trading consequences:</strong><br>• Hold losers too long (to avoid realizing the painful loss)<br>• Sell winners too quickly (to lock in the pleasurable gain)<br>• Refuse to take small calculated losses → small loss becomes catastrophic<br>• "The pain of loss" explains why most retail traders underperform</div>`;

builders['regret-aversion'] = () => `
<p><strong>Regret aversion</strong> — making decisions to minimize future regret rather than maximize expected value.</p>
<div class="callout"><strong>Two forms:</strong><br>• <strong>Errors of commission:</strong> "I bought → it crashed → I regret acting"<br>• <strong>Errors of omission:</strong> "I didn't buy → it soared → I regret NOT acting"<br><br>Short-term: we regret actions more. Long-term: we regret inactions more.</div>
<p>In markets, regret aversion causes paralysis, herd-following ("at least I won't be the only one who's wrong"), and excessive conservatism.</p>`;

builders['overconfidence'] = () => `
<p><strong>Overconfidence</strong> — systematically overestimating one's ability to predict, analyze, and control outcomes.</p>
<div class="callout"><strong>Three types:</strong><br>1. <strong>Overestimation:</strong> "I'll beat the market" (93% think they're above-average drivers)<br>2. <strong>Overprecision:</strong> Confidence intervals too narrow ("I'm 95% sure it'll hit $50" — it won't)<br>3. <strong>Overplacement:</strong> "I'm a better trader than most people"</div>
<p>Barber & Odean (2000): the most frequent traders earned <strong>7.1% less annually</strong> than the least frequent. Overconfidence → overtrading → underperformance.</p>`;

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
<p>Howard Marks: <em>"To achieve superior results, you have to hold non-consensus views about value — and you have to be right."</em></p>`;

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
<div class="callout"><strong>Tracking tools:</strong><br>• <strong>COT Report:</strong> Commitment of Traders — shows positioning of commercials (hedgers) vs. speculators<br>• <strong>Insider buying/selling:</strong> Corporate insiders buy ahead of good news<br>• <strong>Put/Call ratio:</strong> Retail buys calls at tops, puts at bottoms<br>• <strong>Fund flows:</strong> Record mutual fund inflows → market tops. Record outflows → bottoms</div>
<p>The key insight: smart money acts <em>before</em> the move; dumb money reacts <em>after</em> the move is largely complete.</p>`;

builders['mean-reversion-psychology'] = () => `
<p><strong>Mean reversion psychology</strong> — the principle that extremes in both price and sentiment revert toward their long-term average.</p>
<div class="callout"><strong>Statistical basis:</strong> Regression to the mean (Galton, 1886). Extreme observations are followed by less extreme ones — not by "correction" but by probability.<br><br><strong>Market application:</strong><br>• Extreme euphoria → sentiment reverts toward neutral (prices fall)<br>• Extreme panic → sentiment reverts toward neutral (prices rise)<br>• P/E ratios, VIX, and yield spreads all exhibit mean-reverting behavior</div>
<p>Patience is the key: wait for the extreme, then let mean reversion work in your favor.</p>`;
