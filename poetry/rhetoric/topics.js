/* ═══════════════════════════════════════════════════════════════
   Rhetoric & Figures — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-comparison', title:'Comparison & Analogy', topics:['home','metaphor','simile','analogy','conceit','allegory'] },
  { id:'sec-substitution', title:'Substitution & Renaming', topics:['metonymy','synecdoche','personification','apostrophe','periphrasis'] },
  { id:'sec-contrast', title:'Contrast & Contradiction', topics:['irony','oxymoron','paradox','antithesis','litotes'] },
  { id:'sec-amplification', title:'Amplification & Emphasis', topics:['hyperbole','understatement','climax','anadiplosis','chiasmus'] },
  { id:'sec-imagery', title:'Imagery & Sensory', topics:['imagery','synesthesia','symbol','motif','juxtaposition'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  metaphor:'Metaphor',
  simile:'Simile',
  analogy:'Analogy',
  conceit:'Conceit',
  allegory:'Allegory',
  metonymy:'Metonymy',
  synecdoche:'Synecdoche',
  personification:'Personification',
  apostrophe:'Apostrophe',
  periphrasis:'Periphrasis',
  irony:'Irony',
  oxymoron:'Oxymoron',
  paradox:'Paradox',
  antithesis:'Antithesis',
  litotes:'Litotes',
  hyperbole:'Hyperbole',
  understatement:'Understatement',
  climax:'Climax (Gradatio)',
  anadiplosis:'Anadiplosis',
  chiasmus:'Chiasmus',
  imagery:'Imagery',
  synesthesia:'Synesthesia',
  symbol:'Symbol',
  motif:'Motif',
  juxtaposition:'Juxtaposition',
};

const TOPIC_DATA = [
  { id:'metaphor', num:'01', title:'Metaphor', category:'Comparison & Analogy', keywords:['comparison','is','identity','tenor','vehicle','implied','direct'], content:'A direct comparison that says one thing IS another — "Life is a stage." No "like" or "as" needed.' },
  { id:'simile', num:'02', title:'Simile', category:'Comparison & Analogy', keywords:['like','as','comparison','explicit','Homer','epic simile','analogy'], content:'Comparison using "like" or "as" — "My love is like a red red rose." The comparison is explicit and acknowledged.' },
  { id:'analogy', num:'03', title:'Analogy', category:'Comparison & Analogy', keywords:['extended comparison','proportion','A is to B','reasoning','explanation','teaching'], content:'An extended comparison that maps structures from one domain to another for explanation or argument.' },
  { id:'conceit', num:'04', title:'Conceit', category:'Comparison & Analogy', keywords:['extended metaphor','Donne','Petrarchan','elaborated','compass','flea','unlikely'], content:'An extended, elaborate metaphor comparing two very unlike things — Donne\'s lovers as compass legs.' },
  { id:'allegory', num:'05', title:'Allegory', category:'Comparison & Analogy', keywords:['sustained metaphor','Pilgrim\'s Progress','Animal Farm','moral','hidden meaning','narrative'], content:'A sustained metaphor that runs through an entire work — every character and event has a symbolic meaning.' },
  { id:'metonymy', num:'06', title:'Metonymy', category:'Substitution & Renaming', keywords:['associated name','the Crown','the pen','substitution','adjacency','related term'], content:'Replacing a name with something closely associated — "the Crown" for the monarchy, "the pen" for writing.' },
  { id:'synecdoche', num:'07', title:'Synecdoche', category:'Substitution & Renaming', keywords:['part for whole','whole for part','hands','all hands','sails','roof'], content:'Using a part to represent the whole (or vice versa) — "all hands on deck," "nice wheels."' },
  { id:'personification', num:'08', title:'Personification', category:'Substitution & Renaming', keywords:['human qualities','animate','Death','Time','nature speaks','anthropomorphism'], content:'Giving human qualities to non-human things — "Death knocked at the door," "the wind whispered."' },
  { id:'apostrophe', num:'09', title:'Apostrophe', category:'Substitution & Renaming', keywords:['direct address','O Death','absent person','abstract','invocation','turning away'], content:'Addressing an absent person, abstract idea, or thing as if present — "O Death, where is thy sting?"' },
  { id:'periphrasis', num:'10', title:'Periphrasis', category:'Substitution & Renaming', keywords:['roundabout','circumlocution','kenning','whale-road','ring-giver','elaborate name'], content:'Using a longer phrase instead of a short name — "whale-road" for sea, "the Bard" for Shakespeare.' },
  { id:'irony', num:'11', title:'Irony', category:'Contrast & Contradiction', keywords:['opposite meaning','verbal','dramatic','situational','sarcasm','Swift','Socratic'], content:'Saying the opposite of what you mean, or events contradicting expectations. Three types: verbal, dramatic, situational.' },
  { id:'oxymoron', num:'12', title:'Oxymoron', category:'Contrast & Contradiction', keywords:['contradictory terms','bitter sweet','living dead','jumbo shrimp','deafening silence'], content:'Pairing contradictory terms — "bittersweet," "deafening silence," "living dead." The tension creates new meaning.' },
  { id:'paradox', num:'13', title:'Paradox', category:'Contrast & Contradiction', keywords:['self-contradiction','truth','impossible','Donne','war is peace','less is more'], content:'A statement that contradicts itself yet reveals a truth — "I must be cruel to be kind."' },
  { id:'antithesis', num:'14', title:'Antithesis', category:'Contrast & Contradiction', keywords:['balanced opposites','parallel','contrast','not','but','Dickens','best of times'], content:'Placing contrasting ideas in balanced parallel structures — "It was the best of times, it was the worst of times."' },
  { id:'litotes', num:'15', title:'Litotes', category:'Contrast & Contradiction', keywords:['double negative','not bad','not unlike','understatement','affirmation by denial'], content:'Affirming by denying the opposite — "not bad" meaning quite good. The double negative creates understatement.' },
  { id:'hyperbole', num:'16', title:'Hyperbole', category:'Amplification & Emphasis', keywords:['exaggeration','overstatement','million times','died laughing','emphasis','comic'], content:'Deliberate exaggeration for effect — "I\'ve told you a million times." Not meant literally but creates emphasis.' },
  { id:'understatement', num:'17', title:'Understatement', category:'Amplification & Emphasis', keywords:['meiosis','less than expected','a bit','Titanic was unsinkable','deliberate minimize'], content:'Presenting something as less significant than it is — the opposite of hyperbole. British humor\'s secret weapon.' },
  { id:'climax', num:'18', title:'Climax (Gradatio)', category:'Amplification & Emphasis', keywords:['ascending order','building','crescendo','least to greatest','escalation','rhetoric'], content:'Arranging ideas in ascending order of importance — building from least to most significant for dramatic effect.' },
  { id:'anadiplosis', num:'19', title:'Anadiplosis', category:'Amplification & Emphasis', keywords:['end-beginning','linking','chain','last word becomes first','Yoda','fear leads to anger'], content:'The last word of one clause becomes the first word of the next — "Fear leads to anger. Anger leads to hate."' },
  { id:'chiasmus', num:'20', title:'Chiasmus', category:'Amplification & Emphasis', keywords:['ABBA','reversed parallel','crossing','Kennedy','mirror','inverted structure'], content:'Reversing the order of words in parallel phrases — "Ask not what your country can do for you, but what you can do for your country."' },
  { id:'imagery', num:'21', title:'Imagery', category:'Imagery & Sensory', keywords:['sensory detail','visual','auditory','tactile','gustatory','olfactory','concrete'], content:'Language that appeals to the senses — visual, auditory, tactile, gustatory, olfactory. Making abstract concrete.' },
  { id:'synesthesia', num:'22', title:'Synesthesia', category:'Imagery & Sensory', keywords:['mixed senses','loud color','sweet sound','blue note','cross-sensory','Baudelaire'], content:'Describing one sense in terms of another — "loud colors," "sweet music," "blue note." Senses bleed together.' },
  { id:'symbol', num:'23', title:'Symbol', category:'Imagery & Sensory', keywords:['concrete for abstract','rose','dove','skull','flag','recurring','cultural','literary'], content:'A concrete thing that represents an abstract idea — a rose for love, a skull for death, a dove for peace.' },
  { id:'motif', num:'24', title:'Motif', category:'Imagery & Sensory', keywords:['recurring element','pattern','theme','blood in Macbeth','water','light/darkness'], content:'A recurring image, symbol, or idea that develops a theme — blood in Macbeth, water in T.S. Eliot.' },
  { id:'juxtaposition', num:'25', title:'Juxtaposition', category:'Imagery & Sensory', keywords:['side by side','contrast','comparison','placing together','beauty and ugliness','rich and poor'], content:'Placing two things side by side to highlight their contrast — beauty next to ugliness, wealth next to poverty.' },
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
  main.innerHTML = buildHome() + buildMetaphor() + buildSimile() + buildAnalogy()
    + buildConceit() + buildAllegory() + buildMetonymy() + buildSynecdoche()
    + buildPersonification() + buildApostrophe() + buildPeriphrasis() + buildIrony()
    + buildOxymoron() + buildParadox() + buildAntithesis() + buildLitotes()
    + buildHyperbole() + buildUnderstatement() + buildClimax() + buildAnadiplosis()
    + buildChiasmus() + buildImagery() + buildSynesthesia() + buildSymbol()
    + buildMotif() + buildJuxtaposition();
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Rhetoric & <em>Figures</em></h2>
    <p style="margin-top:14px">An interactive guide to 25 figures of speech and rhetorical devices — from metaphor and irony to symbol and chiasmus. Each entry shows how language bends toward meaning.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-comparison','metaphor')">
      <div class="cat-card-icon">🔗</div>
      <div class="cat-card-name">Comparison & Analogy</div>
      <div class="cat-card-count">5 topics · Metaphor, Simile, Conceit, Allegory</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-substitution','metonymy')">
      <div class="cat-card-icon">🔄</div>
      <div class="cat-card-name">Substitution & Renaming</div>
      <div class="cat-card-count">5 topics · Metonymy, Synecdoche, Personification</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-contrast','irony')">
      <div class="cat-card-icon">⚡</div>
      <div class="cat-card-name">Contrast & Contradiction</div>
      <div class="cat-card-count">5 topics · Irony, Oxymoron, Paradox, Antithesis</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-amplification','hyperbole')">
      <div class="cat-card-icon">📢</div>
      <div class="cat-card-name">Amplification & Emphasis</div>
      <div class="cat-card-count">5 topics · Hyperbole, Climax, Chiasmus</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-imagery','imagery')">
      <div class="cat-card-icon">🎨</div>
      <div class="cat-card-name">Imagery & Sensory</div>
      <div class="cat-card-count">5 topics · Imagery, Synesthesia, Symbol, Motif</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildMetaphor() {
  return `<div class="topic" id="metaphor">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">01 — Comparison & Analogy</div><h2><em>Metaphor</em></h2></div><span class="topic-badge">A IS B</span></div>
  <p class="sub">// Direct identity — one thing becomes another</p>
  <p class="prose"><strong>Metaphor</strong> asserts identity between unlike things without "like" or "as": "All the world's a stage." It has a <strong>tenor</strong> (what's described — the world) and a <strong>vehicle</strong> (what it's compared to — a stage). The gap between them is where meaning sparks.</p>
  <div class="fb"><div class="fm">Tenor + Vehicle = Metaphor</div><div class="fd"><span>"Life is a journey"</span> — tenor: life, vehicle: journey. The mapping transfers structure from one domain to another.</div></div>
  <div class="va"><div class="vl">// Metaphor mapping — tenor → vehicle</div><canvas id="metaphorCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Metaphor doesn't just describe — it structures thought. "Argument is war" makes us see debate as combat. The vehicle shapes how we understand the tenor.</div>
  <div class="topic-nav" id="nav-metaphor"></div>
</div>`;
}

function buildSimile() {
  return `<div class="topic" id="simile">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Comparison & Analogy</div><h2><em>Simile</em></h2></div><span class="topic-badge">A LIKE B</span></div>
  <p class="sub">// Explicit comparison — acknowledged similarity</p>
  <p class="prose"><strong>Simile</strong> compares using "like" or "as": "My love is <em>like</em> a red red rose." Unlike metaphor, it keeps the two things separate — acknowledging the comparison while maintaining distance.</p>
  <div class="fb"><div class="fm">A is LIKE B / A is AS [adjective] AS B</div><div class="fd"><span>"Shall I compare thee to a summer's day?"</span> — the comparison is overt and exploratory.</div></div>
  <div class="va"><div class="vl">// Simile vs. Metaphor — distance of comparison</div><canvas id="simileCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Simile is more tentative than metaphor — "like" signals that the comparison is approximate. This honesty can make it more persuasive.</div>
  <div class="topic-nav" id="nav-simile"></div>
</div>`;
}

function buildAnalogy() {
  return `<div class="topic" id="analogy">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">03 — Comparison & Analogy</div><h2><em>Analogy</em></h2></div><span class="topic-badge">Structural Map</span></div>
  <p class="sub">// Extended comparison that maps relationships between domains</p>
  <p class="prose"><strong>Analogy</strong> maps structural relationships between two domains: "Electrons orbit the nucleus like planets orbit the sun." It's persuasive because understanding the familiar domain helps illuminate the unfamiliar one.</p>
  <div class="fb"><div class="fm">A : B :: C : D (A is to B as C is to D)</div><div class="fd"><span>Eye : Seeing :: Ear : Hearing</span> — the relationship, not the things, is what matters.</div></div>
  <div class="va"><div class="vl">// Analogy — structural mapping between domains</div><canvas id="analogyCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Good analogies illuminate; bad ones mislead. The power is in what the mapping reveals — but every analogy also hides what doesn't fit.</div>
  <div class="topic-nav" id="nav-analogy"></div>
</div>`;
}

function buildConceit() {
  return `<div class="topic" id="conceit">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">04 — Comparison & Analogy</div><h2><em>Conceit</em></h2></div><span class="topic-badge">Extended</span></div>
  <p class="sub">// An elaborate, surprising metaphor sustained across a poem</p>
  <p class="prose">A <strong>conceit</strong> is an extended, elaborate metaphor comparing two very unlike things — Donne compares separated lovers to the legs of a compass, one fixed while the other roams. The Petrarchan conceit uses stock comparisons (eyes as stars); the Metaphysical conceit shocks with ingenuity.</p>
  <div class="fb"><div class="fm">Unlikely Tenor + Unlikely Vehicle → sustained for entire poem</div><div class="fd"><span>Donne's "A Valediction":</span> lovers = two legs of a compass. Elaborated through 9 stanzas.</div></div>
  <div class="va"><div class="vl">// Conceit — sustained unlikely comparison</div><canvas id="conceitCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The conceit's power comes from the gap between its terms — the more unlikely the comparison, the more wit and insight required to sustain it.</div>
  <div class="topic-nav" id="nav-conceit"></div>
</div>`;
}

function buildAllegory() {
  return `<div class="topic" id="allegory">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">05 — Comparison & Analogy</div><h2><em>Allegory</em></h2></div><span class="topic-badge">Sustained</span></div>
  <p class="sub">// A story where everything stands for something else</p>
  <p class="prose"><strong>Allegory</strong> is a sustained metaphor that runs through an entire work. Every character, event, and setting has both a literal and symbolic meaning. Orwell's <em>Animal Farm</em>: farm = Russia, pigs = Bolsheviks, Napoleon = Stalin.</p>
  <div class="fb"><div class="fm">Surface Story ↔ Hidden Meaning (mapped throughout)</div><div class="fd"><span>Pilgrim's Progress:</span> Christian's journey = the soul's path to salvation. Every obstacle = a spiritual challenge.</div></div>
  <div class="va"><div class="vl">// Allegory — parallel narrative layers</div><canvas id="allegoryCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Allegory risks becoming heavy-handed — the best allegories work as compelling literal stories too, so the symbolic layer enriches rather than replaces the surface.</div>
  <div class="topic-nav" id="nav-allegory"></div>
</div>`;
}

function buildMetonymy() {
  return `<div class="topic" id="metonymy">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">06 — Substitution & Renaming</div><h2><em>Metonymy</em></h2></div><span class="topic-badge">Adjacent</span></div>
  <p class="sub">// Naming something by its association</p>
  <p class="prose"><strong>Metonymy</strong> replaces a name with something closely associated: "the Crown" for monarchy, "the pen" for writing, "Washington" for the U.S. government. The substitution works because of adjacency — the thing named is always near what it represents.</p>
  <div class="fb"><div class="fm">Associated thing → stands for the actual thing</div><div class="fd"><span>"The pen is mightier than the sword"</span> — pen = writing/ideas, sword = military force.</div></div>
  <div class="va"><div class="vl">// Metonymy — association mapping</div><canvas id="metonymyCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Metonymy reveals what we associate with things — calling government "Washington" emphasizes its location; calling it "the administration" emphasizes its function.</div>
  <div class="topic-nav" id="nav-metonymy"></div>
</div>`;
}

function buildSynecdoche() {
  return `<div class="topic" id="synecdoche">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">07 — Substitution & Renaming</div><h2><em>Synecdoche</em></h2></div><span class="topic-badge">Part / Whole</span></div>
  <p class="sub">// A part stands for the whole, or vice versa</p>
  <p class="prose"><strong>Synecdoche</strong> uses a part to represent the whole: "all hands on deck" (hands = sailors), "nice wheels" (wheels = car). Or the whole for a part: "the law" for a police officer. It's metonymy's cousin, but the relation is containment.</p>
  <div class="fb"><div class="fm">Part → Whole OR Whole → Part</div><div class="fd"><span>"Hired hands," "head count," "boots on the ground"</span> — body parts standing for whole people.</div></div>
  <div class="va"><div class="vl">// Synecdoche — part↔whole relationships</div><canvas id="synecdocheCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Synecdoche reveals what we consider essential — calling sailors "hands" reduces them to their labor; calling them "souls" invokes their humanity.</div>
  <div class="topic-nav" id="nav-synecdoche"></div>
</div>`;
}

function buildPersonification() {
  return `<div class="topic" id="personification">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">08 — Substitution & Renaming</div><h2><em>Personification</em></h2></div><span class="topic-badge">Human Form</span></div>
  <p class="sub">// Non-human things given human qualities</p>
  <p class="prose"><strong>Personification</strong> attributes human characteristics to non-human things: "Death knocked at the door," "the wind whispered secrets," "justice is blind." It makes abstract concepts tangible and relatable.</p>
  <div class="fb"><div class="fm">Non-human thing + human action/quality = Personification</div><div class="fd"><span>"Time marches on"</span> — time given the human ability to march.</div></div>
  <div class="va"><div class="vl">// Personification — human traits mapped to non-human</div><canvas id="personificationCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Personification makes us care about abstractions — we can fear Death-the-person in a way we can't fear death-the-concept.</div>
  <div class="topic-nav" id="nav-personification"></div>
</div>`;
}

function buildApostrophe() {
  return `<div class="topic" id="apostrophe">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">09 — Substitution & Renaming</div><h2><em>Apostrophe</em></h2></div><span class="topic-badge">O!</span></div>
  <p class="sub">// Addressing the absent as if present</p>
  <p class="prose"><strong>Apostrophe</strong> (not the punctuation mark) turns to address someone absent, dead, or abstract as if they could hear: "O Romeo, Romeo!" "Death, be not proud." The speaker breaks the fourth wall of reality to speak to the impossible.</p>
  <div class="fb"><div class="fm">"O ______!" / Direct address to absent/abstract</div><div class="fd"><span>"O Death, where is thy sting?"</span> — Paul addresses Death as a defeated opponent.</div></div>
  <div class="va"><div class="vl">// Apostrophe — speaking to the absent</div><canvas id="apostropheCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Apostrophe is an act of faith — it assumes the addressed can hear. That assumption reveals the speaker's emotional state more than any description could.</div>
  <div class="topic-nav" id="nav-apostrophe"></div>
</div>`;
}

function buildPeriphrasis() {
  return `<div class="topic" id="periphrasis">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">10 — Substitution & Renaming</div><h2><em>Periphrasis</em></h2></div><span class="topic-badge">Roundabout</span></div>
  <p class="sub">// Saying it the long way around — circumlocution for effect</p>
  <p class="prose"><strong>Periphrasis</strong> uses a longer, descriptive phrase instead of a direct name: "whale-road" for sea (Anglo-Saxon <em>kenning</em>), "the Bard" for Shakespeare, "the Big Apple" for New York City. The roundabout reveals something the direct name doesn't.</p>
  <div class="fb"><div class="fm">Descriptive phrase → replaces proper name</div><div class="fd"><span>"He who must not be named"</span> — periphrasis driven by fear. <span>"The Iron Lady"</span> — periphrasis as characterization.</div></div>
  <div class="va"><div class="vl">// Periphrasis — the long way around</div><canvas id="periphrasislCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Every periphrasis makes a choice about what to emphasize — "the Great Emancipator" highlights Lincoln's role in abolition; "the 16th President" highlights his place in sequence.</div>
  <div class="topic-nav" id="nav-periphrasis"></div>
</div>`;
}

function buildIrony() {
  return `<div class="topic" id="irony">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">11 — Contrast & Contradiction</div><h2><em>Irony</em></h2></div><span class="topic-badge">Opposite</span></div>
  <p class="sub">// Meaning the opposite — or reality defying expectation</p>
  <p class="prose"><strong>Irony</strong> operates in the gap between appearance and reality. <strong>Verbal:</strong> saying the opposite of what you mean ("What lovely weather" in a storm). <strong>Dramatic:</strong> the audience knows what characters don't. <strong>Situational:</strong> events contradict expectations.</p>
  <div class="fb"><div class="fm">Surface meaning ≠ True meaning (or Expected outcome ≠ Actual outcome)</div><div class="fd"><span>Fire station burns down</span> (situational). <span>"Nice job"</span> after dropping plates (verbal). <span>Audience watches Oedipus search for a killer who is himself</span> (dramatic).</div></div>
  <div class="va"><div class="vl">// Three types of irony</div><canvas id="ironyCanvas" height="240"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Irony creates a community of the knowing — those who get it feel complicity with the speaker, while those who don't remain outside.</div>
  <div class="topic-nav" id="nav-irony"></div>
</div>`;
}

function buildOxymoron() {
  return `<div class="topic" id="oxymoron">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">12 — Contrast & Contradiction</div><h2><em>Oxymoron</em></h2></div><span class="topic-badge">Contradictory</span></div>
  <p class="sub">// Two contradictory terms forced together</p>
  <p class="prose"><strong>Oxymoron</strong> pairs contradictory terms in a compressed phrase: "bittersweet," "deafening silence," "living dead," "cruel kindness." The contradiction isn't a mistake — it's the point. The tension between the terms creates a meaning neither word has alone.</p>
  <div class="fb"><div class="fm">Contradictory Term A + Contradictory Term B = New Meaning</div><div class="fd"><span>"Sweet sorrow"</span> — neither sweet nor sorrow alone captures the feeling of parting from a loved one.</div></div>
  <div class="va"><div class="vl">// Oxymoron — opposites colliding</div><canvas id="oxymoronCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Oxymoron works because reality is often contradictory — parting IS both sweet and sorrowful, silence CAN be deafening. The figure captures what plain speech can't.</div>
  <div class="topic-nav" id="nav-oxymoron"></div>
</div>`;
}

function buildParadox() {
  return `<div class="topic" id="paradox">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">13 — Contrast & Contradiction</div><h2><em>Paradox</em></h2></div><span class="topic-badge">True Contradiction</span></div>
  <p class="sub">// Self-contradicting statement that reveals a truth</p>
  <p class="prose"><strong>Paradox</strong> is a statement that seems self-contradictory but reveals a deeper truth: "less is more," "the child is father of the man," "I must be cruel to be kind." Unlike oxymoron (which compresses two words), paradox works at the level of ideas.</p>
  <div class="fb"><div class="fm">Apparent contradiction → Hidden truth</div><div class="fd"><span>"The only thing I know is that I know nothing"</span> (Socrates) — acknowledging ignorance is itself a form of wisdom.</div></div>
  <div class="va"><div class="vl">// Paradox — contradiction resolving to truth</div><canvas id="paradoxCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Paradox forces the reader to think — the surface contradiction demands resolution, and the resolution is the insight the writer wanted you to reach.</div>
  <div class="topic-nav" id="nav-paradox"></div>
</div>`;
}

function buildAntithesis() {
  return `<div class="topic" id="antithesis">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">14 — Contrast & Contradiction</div><h2><em>Antithesis</em></h2></div><span class="topic-badge">Balanced</span></div>
  <p class="sub">// Contrasting ideas in balanced parallel structures</p>
  <p class="prose"><strong>Antithesis</strong> places opposing ideas in grammatically parallel structures: "It was the best of times, it was the worst of times." The balance of form highlights the contrast of content. It's one of rhetoric's most powerful tools for creating memorable, punchy statements.</p>
  <div class="fb"><div class="fm">[A] not [B] / [A] but [B] / [positive], [negative]</div><div class="fd"><span>"That's one small step for man, one giant leap for mankind."</span></div></div>
  <div class="va"><div class="vl">// Antithesis — balanced opposites</div><canvas id="antithesisCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Antithesis derives its power from the parallel structure — if the grammar matches, the contrast of the ideas becomes unmissable.</div>
  <div class="topic-nav" id="nav-antithesis"></div>
</div>`;
}

function buildLitotes() {
  return `<div class="topic" id="litotes">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">15 — Contrast & Contradiction</div><h2><em>Litotes</em></h2></div><span class="topic-badge">Double Negative</span></div>
  <p class="sub">// Affirming by negating the opposite</p>
  <p class="prose"><strong>Litotes</strong> uses understatement through double negation: "not bad" (meaning quite good), "not unlike" (meaning similar), "no small achievement" (meaning a great one). It's a characteristic device of English understatement and Old English poetry.</p>
  <div class="fb"><div class="fm">NOT + NEGATIVE = Understated positive</div><div class="fd"><span>"He's not the brightest"</span> — litotes understates to imply the person is dim, without saying so directly.</div></div>
  <div class="va"><div class="vl">// Litotes — negation of the negative</div><canvas id="litotesCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Litotes creates social distance — saying "not bad" rather than "great" keeps the speaker from committing fully, maintaining reserve and irony.</div>
  <div class="topic-nav" id="nav-litotes"></div>
</div>`;
}

function buildHyperbole() {
  return `<div class="topic" id="hyperbole">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">16 — Amplification & Emphasis</div><h2><em>Hyperbole</em></h2></div><span class="topic-badge">Exaggeration</span></div>
  <p class="sub">// Deliberate exaggeration for emphasis or humor</p>
  <p class="prose"><strong>Hyperbole</strong> exaggerates beyond literal truth for effect: "I've told you a million times," "I'm so hungry I could eat a horse," "This bag weighs a ton." Everyone knows it's not literally true — that's the point. The exaggeration communicates intensity.</p>
  <div class="fb"><div class="fm">Literal meaning × Extreme multiplier = Emotional truth</div><div class="fd"><span>"I died laughing"</span> — obviously not dead, but the exaggeration conveys extreme amusement effectively.</div></div>
  <div class="va"><div class="vl">// Hyperbole — exaggeration scale</div><canvas id="hyperboleCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Hyperbole works because we process it automatically — no one takes it literally, so it communicates emotional intensity without ambiguity.</div>
  <div class="topic-nav" id="nav-hyperbole"></div>
</div>`;
}

function buildUnderstatement() {
  return `<div class="topic" id="understatement">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">17 — Amplification & Emphasis</div><h2><em>Understatement</em></h2></div><span class="topic-badge">Meiosis</span></div>
  <p class="sub">// Saying less than you mean — the quiet emphasis</p>
  <p class="prose"><strong>Understatement</strong> (meiosis) deliberately presents something as less significant than it is: "It's just a scratch" (on a totaled car), "a bit of a problem" (on a catastrophe). The contrast between expression and reality creates emphasis by restraint.</p>
  <div class="fb"><div class="fm">Literal meaning ÷ Extreme reduction = Wry emphasis</div><div class="fd"><span>"That went well"</span> (after a disaster) — understatement lets the listener fill in the gap with their own reaction.</div></div>
  <div class="va"><div class="vl">// Understatement vs. Hyperbole — opposite strategies</div><canvas id="understatementCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Understatement respects the listener's intelligence — it trusts them to see the gap between what's said and what's meant, creating complicity.</div>
  <div class="topic-nav" id="nav-understatement"></div>
</div>`;
}

function buildClimax() {
  return `<div class="topic" id="climax">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">18 — Amplification & Emphasis</div><h2>Climax <em>(Gradatio)</em></h2></div><span class="topic-badge">Ascending</span></div>
  <p class="sub">// Building from least to greatest — the rhetorical crescendo</p>
  <p class="prose"><strong>Climax</strong> (gradatio) arranges ideas in ascending order of intensity: "I came, I saw, I conquered." Each element is more significant than the last, building towards a peak. The escalation creates momentum and makes the final item feel inevitable and powerful.</p>
  <div class="fb"><div class="fm">Small → Medium → Large → PEAK</div><div class="fd"><span>"Life, liberty, and the pursuit of happiness"</span> — ascending from basic survival to the highest aspiration.</div></div>
  <div class="va"><div class="vl">// Climax — ascending intensity</div><canvas id="climaxCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Climax works because it mirrors how emotions build — each step prepares the audience for the next, so the peak hits with accumulated force.</div>
  <div class="topic-nav" id="nav-climax"></div>
</div>`;
}

function buildAnadiplosis() {
  return `<div class="topic" id="anadiplosis">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">19 — Amplification & Emphasis</div><h2><em>Anadiplosis</em></h2></div><span class="topic-badge">Chain Link</span></div>
  <p class="sub">// The last word becomes the first — a chain of thought</p>
  <p class="prose"><strong>Anadiplosis</strong> repeats the last word of one clause at the beginning of the next: "Fear leads to anger. Anger leads to hate. Hate leads to suffering." It creates a logical or emotional chain, each link forged by the repeated word.</p>
  <div class="fb"><div class="fm">…word A. Word A leads to B. B leads to C…</div><div class="fd"><span>"When I give, I give myself."</span> (Whitman) — the repeated "give" bridges two meanings.</div></div>
  <div class="va"><div class="vl">// Anadiplosis — chain-link repetition</div><canvas id="anadiplosisCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Anadiplosis makes causation feel inevitable — each step seems to follow naturally from the last, which is why it's powerful in both poetry and propaganda.</div>
  <div class="topic-nav" id="nav-anadiplosis"></div>
</div>`;
}

function buildChiasmus() {
  return `<div class="topic" id="chiasmus">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">20 — Amplification & Emphasis</div><h2><em>Chiasmus</em></h2></div><span class="topic-badge">A-B-B-A</span></div>
  <p class="sub">// Reversed parallel — the X-shaped structure</p>
  <p class="prose"><strong>Chiasmus</strong> reverses the order of terms in parallel phrases, creating an A-B-B-A pattern: "Ask not what your country can do for you — ask what you can do for your country." Named for the Greek letter chi (X), it crosses the structure for emphasis.</p>
  <div class="fb"><div class="fm">A B ← → B A (mirrored structure)</div><div class="fd"><span>"Never let a fool kiss you, or a kiss fool you."</span> — the reversed structure creates wit.</div></div>
  <div class="va"><div class="vl">// Chiasmus — crossed structure (ABBA)</div><canvas id="chiasmusCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Chiasmus embeds its meaning in its form — the reversal of structure mirrors a reversal of perspective. The shape IS the argument.</div>
  <div class="topic-nav" id="nav-chiasmus"></div>
</div>`;
}

function buildImagery() {
  return `<div class="topic" id="imagery">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">21 — Imagery & Sensory</div><h2><em>Imagery</em></h2></div><span class="topic-badge">5 Senses</span></div>
  <p class="sub">// Language that appeals to the senses — making the reader see, hear, feel</p>
  <p class="prose"><strong>Imagery</strong> uses concrete, sensory language to create vivid mental pictures. Five types: <strong>visual</strong> (sight), <strong>auditory</strong> (sound), <strong>tactile</strong> (touch), <strong>gustatory</strong> (taste), <strong>olfactory</strong> (smell). Good imagery makes abstractions concrete and ideas visceral.</p>
  <div class="fb"><div class="fm">Abstract idea → Concrete sensory language → Vivid experience</div><div class="fd"><span>"The yellow smoke that rubs its muzzle on the window-panes"</span> (Eliot) — visual + tactile.</div></div>
  <div class="va"><div class="vl">// Five types of imagery</div><canvas id="imageryCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> "Show, don't tell" is really "use imagery" — instead of saying "she was sad," show the sensory details that let the reader feel the sadness.</div>
  <div class="topic-nav" id="nav-imagery"></div>
</div>`;
}

function buildSynesthesia() {
  return `<div class="topic" id="synesthesia">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">22 — Imagery & Sensory</div><h2><em>Synesthesia</em></h2></div><span class="topic-badge">Mixed Senses</span></div>
  <p class="sub">// Describing one sense in terms of another</p>
  <p class="prose"><strong>Synesthesia</strong> cross-wires the senses in language: "loud colors," "sweet music," "bitter cold," "warm voice," "sharp taste." By describing one sense through another, it creates a richer, more layered sensory experience than either sense alone.</p>
  <div class="fb"><div class="fm">Sense A described through Sense B vocabulary</div><div class="fd"><span>"Blue notes"</span> (color → sound), <span>"loud shirt"</span> (sound → sight), <span>"sweet melody"</span> (taste → sound).</div></div>
  <div class="va"><div class="vl">// Synesthesia — cross-sensory mapping</div><canvas id="synesthesiaCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Synesthesia suggests that our senses aren't really separate — music CAN feel blue, colors CAN feel warm. The figure reveals a deep truth about perception.</div>
  <div class="topic-nav" id="nav-synesthesia"></div>
</div>`;
}

function buildSymbol() {
  return `<div class="topic" id="symbol">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">23 — Imagery & Sensory</div><h2><em>Symbol</em></h2></div><span class="topic-badge">Concrete → Abstract</span></div>
  <p class="sub">// A concrete thing that represents an abstract idea</p>
  <p class="prose">A <strong>symbol</strong> is something concrete that represents something abstract: a rose for love, a skull for death, a flag for a nation. Unlike allegory (where meaning is systematic), symbols have a penumbra of meaning — they suggest more than they state.</p>
  <div class="fb"><div class="fm">Concrete object → Abstract meaning(s)</div><div class="fd"><span>Water:</span> purity, rebirth, danger, the unconscious, time. A symbol radiates multiple meanings.</div></div>
  <div class="va"><div class="vl">// Symbol — concrete radiating meaning</div><canvas id="symbolCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The best symbols are irreducible — you can't replace them with a single abstract word without losing meaning. "The green light" in Gatsby means more than just "hope."</div>
  <div class="topic-nav" id="nav-symbol"></div>
</div>`;
}

function buildMotif() {
  return `<div class="topic" id="motif">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">24 — Imagery & Sensory</div><h2><em>Motif</em></h2></div><span class="topic-badge">Recurring</span></div>
  <p class="sub">// A recurring image or idea that develops a theme</p>
  <p class="prose">A <strong>motif</strong> is a recurring element — image, phrase, situation, or idea — that develops and reinforces a theme. Blood in <em>Macbeth</em>, water in <em>The Waste Land</em>, eyes in <em>The Great Gatsby</em>. Each recurrence adds a layer, creating a pattern of meaning.</p>
  <div class="fb"><div class="fm">Element₁ → Element₂ → Element₃ → … → Theme emerges</div><div class="fd"><span>Blood in Macbeth:</span> appears after each murder, spreading from hands to water to the entire world — guilt expanding.</div></div>
  <div class="va"><div class="vl">// Motif — recurrence building theme</div><canvas id="motifCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> A motif is a symbol in motion — it moves through the text, and its meaning changes with each appearance. Track the changes and you track the theme.</div>
  <div class="topic-nav" id="nav-motif"></div>
</div>`;
}

function buildJuxtaposition() {
  return `<div class="topic" id="juxtaposition">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">25 — Imagery & Sensory</div><h2><em>Juxtaposition</em></h2></div><span class="topic-badge">Side by Side</span></div>
  <p class="sub">// Placing things side by side to reveal contrast</p>
  <p class="prose"><strong>Juxtaposition</strong> places two things side by side so the reader sees their differences more clearly: beauty next to ugliness, wealth next to poverty, innocence next to corruption. The contrast illuminates both elements more sharply than either alone.</p>
  <div class="fb"><div class="fm">Element A ‖ Element B → contrast illuminates both</div><div class="fd"><span>A palace beside a slum</span> — neither would strike the viewer the same way alone. Proximity creates meaning.</div></div>
  <div class="va"><div class="vl">// Juxtaposition — contrast through proximity</div><canvas id="juxtapositionCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Juxtaposition is the most fundamental literary device — all meaning comes from contrast, and juxtaposition is contrast made visible.</div>
  <div class="topic-nav" id="nav-juxtaposition"></div>
</div>`;
}
