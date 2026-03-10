/* ═══════════════════════════════════════════════════════════════
   Poetic Forms — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-sonnets', title:'Sonnets', topics:['home','shakespearean-sonnet','petrarchan-sonnet','spenserian-sonnet','modern-sonnet','crown-of-sonnets'] },
  { id:'sec-fixed', title:'Fixed Forms', topics:['villanelle','sestina','pantoum','ghazal','rondeau'] },
  { id:'sec-short', title:'Short Forms', topics:['haiku','tanka','limerick','epigram','couplet'] },
  { id:'sec-narrative', title:'Narrative & Long Forms', topics:['ballad','ode','elegy','epic','dramatic-monologue'] },
  { id:'sec-free', title:'Free & Experimental', topics:['free-verse','blank-verse','prose-poetry','concrete-poetry','acrostic'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'shakespearean-sonnet':'Shakespearean Sonnet',
  'petrarchan-sonnet':'Petrarchan Sonnet',
  'spenserian-sonnet':'Spenserian Sonnet',
  'modern-sonnet':'Modern Sonnet',
  'crown-of-sonnets':'Crown of Sonnets',
  villanelle:'Villanelle',
  sestina:'Sestina',
  pantoum:'Pantoum',
  ghazal:'Ghazal',
  rondeau:'Rondeau',
  haiku:'Haiku',
  tanka:'Tanka',
  limerick:'Limerick',
  epigram:'Epigram',
  couplet:'Couplet',
  ballad:'Ballad',
  ode:'Ode',
  elegy:'Elegy',
  epic:'Epic',
  'dramatic-monologue':'Dramatic Monologue',
  'free-verse':'Free Verse',
  'blank-verse':'Blank Verse',
  'prose-poetry':'Prose Poetry',
  'concrete-poetry':'Concrete Poetry',
  acrostic:'Acrostic',
};

const TOPIC_DATA = [
  { id:'shakespearean-sonnet', num:'01', title:'Shakespearean Sonnet', category:'Sonnets', keywords:['english sonnet','14 lines','iambic pentameter','ABAB CDCD EFEF GG','three quatrains','couplet','volta'], content:'The English sonnet: three quatrains and a couplet in iambic pentameter with an ABAB CDCD EFEF GG rhyme scheme.' },
  { id:'petrarchan-sonnet', num:'02', title:'Petrarchan Sonnet', category:'Sonnets', keywords:['italian sonnet','octave','sestet','ABBAABBA','volta','turn','14 lines'], content:'The Italian sonnet: an octave (ABBAABBA) poses a problem, and the sestet resolves it after the volta.' },
  { id:'spenserian-sonnet', num:'03', title:'Spenserian Sonnet', category:'Sonnets', keywords:['interlocking rhyme','ABAB BCBC CDCD EE','Edmund Spenser','linked quatrains'], content:'Spenser\'s hybrid: interlocking rhyme (ABAB BCBC CDCD EE) that links quatrains together like chain mail.' },
  { id:'modern-sonnet', num:'04', title:'Modern Sonnet', category:'Sonnets', keywords:['contemporary','slant rhyme','free sonnet','14 lines','loose form','Terrance Hayes','Wanda Coleman'], content:'The sonnet unshackled — 14 lines as a container for experimentation with slant rhyme, enjambment, and broken meter.' },
  { id:'crown-of-sonnets', num:'05', title:'Crown of Sonnets', category:'Sonnets', keywords:['corona','seven sonnets','linked','last line first line','heroic crown','maestro'], content:'Seven interlocked sonnets where each begins with the last line of the previous, culminating in a master sonnet.' },
  { id:'villanelle', num:'06', title:'Villanelle', category:'Fixed Forms', keywords:['19 lines','5 tercets','quatrain','refrain','ABA','Dylan Thomas','repetition','obsession'], content:'19 lines of obsessive repetition — two refrains weave through five tercets and a final quatrain.' },
  { id:'sestina', num:'07', title:'Sestina', category:'Fixed Forms', keywords:['39 lines','6 stanzas','end words','rotation','envoi','spiral','Elizabeth Bishop'], content:'Six end-words spiral through six stanzas in a mathematical rotation pattern, ending with a three-line envoi.' },
  { id:'pantoum', num:'08', title:'Pantoum', category:'Fixed Forms', keywords:['malay','interlocking quatrains','repeated lines','circular','hypnotic','ABAB'], content:'Interlocking quatrains where lines 2 and 4 become lines 1 and 3 of the next stanza, creating a hypnotic loop.' },
  { id:'ghazal', num:'09', title:'Ghazal', category:'Fixed Forms', keywords:['arabic','persian','urdu','couplets','radif','qafia','maqta','Agha Shahid Ali','longing'], content:'Autonomous couplets linked by a repeated refrain (radif) and rhyme (qafia), traditionally exploring themes of love and loss.' },
  { id:'rondeau', num:'10', title:'Rondeau', category:'Fixed Forms', keywords:['french','15 lines','rentrement','refrain','AABBA','John McCrae','In Flanders Fields'], content:'15 lines in three stanzas with a recurring rentrement — the opening phrase returns as a refrain.' },
  { id:'haiku', num:'11', title:'Haiku', category:'Short Forms', keywords:['japanese','5-7-5','syllable','kireji','kigo','season','nature','moment','juxtaposition','Basho'], content:'Three lines capturing a moment — traditionally 5-7-5 syllables with a seasonal reference (kigo) and a cutting word (kireji).' },
  { id:'tanka', num:'12', title:'Tanka', category:'Short Forms', keywords:['japanese','5-7-5-7-7','31 syllables','waka','upper phrase','lower phrase','pivot','emotional'], content:'The haiku\'s older sibling — five lines (5-7-5-7-7) that pivot from the observed world to inner emotion.' },
  { id:'limerick', num:'13', title:'Limerick', category:'Short Forms', keywords:['AABBA','5 lines','humor','anapestic','Edward Lear','Nantucket','comic'], content:'Five lines of comic verse in AABBA rhyme — bouncing anapestic rhythm built for wit and surprise.' },
  { id:'epigram', num:'14', title:'Epigram', category:'Short Forms', keywords:['wit','brevity','paradox','satirical','Oscar Wilde','couplet','concise','aphorism'], content:'A brief, witty statement — often a couplet — that delivers a surprising truth or satirical sting.' },
  { id:'couplet', num:'15', title:'Couplet', category:'Short Forms', keywords:['two lines','rhyme','heroic couplet','iambic pentameter','closed','open','Pope'], content:'Two rhyming lines — complete in themselves. The heroic couplet (iambic pentameter) was the workhorse of English verse.' },
  { id:'ballad', num:'16', title:'Ballad', category:'Narrative & Long Forms', keywords:['story','ABCB','quatrain','folk','narrative','refrain','common meter','oral tradition'], content:'Storytelling verse in quatrains (typically ABCB) — born from oral tradition with refrains and dramatic action.' },
  { id:'ode', num:'17', title:'Ode', category:'Narrative & Long Forms', keywords:['praise','Pindaric','Horatian','irregular','strophe','antistrophe','Keats','celebration'], content:'An elevated poem of praise or meditation — Pindaric (triadic), Horatian (regular stanzas), or irregular in structure.' },
  { id:'elegy', num:'18', title:'Elegy', category:'Narrative & Long Forms', keywords:['mourning','grief','loss','lament','consolation','pastoral elegy','In Memoriam','Lycidas'], content:'A poem of mourning that moves from grief through memory toward consolation — from Lycidas to modern loss.' },
  { id:'epic', num:'19', title:'Epic', category:'Narrative & Long Forms', keywords:['long narrative','hero','invocation','in medias res','Homer','Milton','catalogue','elevated style'], content:'The grand narrative — heroes, gods, and the fate of nations told in elevated style with invocations and catalogues.' },
  { id:'dramatic-monologue', num:'20', title:'Dramatic Monologue', category:'Narrative & Long Forms', keywords:['speaker','persona','audience','Browning','My Last Duchess','revelation','mask','voice'], content:'A single speaker reveals their character — often unintentionally — to a silent listener. Browning\'s signature form.' },
  { id:'free-verse', num:'21', title:'Free Verse', category:'Free & Experimental', keywords:['no fixed meter','no rhyme scheme','Whitman','vers libre','breath','line break','organic form'], content:'Poetry liberated from fixed meter and rhyme — where the line break becomes the primary unit of rhythm.' },
  { id:'blank-verse', num:'22', title:'Blank Verse', category:'Free & Experimental', keywords:['unrhymed iambic pentameter','Shakespeare','Milton','Paradise Lost','dramatic','natural speech'], content:'Unrhymed iambic pentameter — the backbone of English dramatic and narrative poetry from Shakespeare to Frost.' },
  { id:'prose-poetry', num:'23', title:'Prose Poetry', category:'Free & Experimental', keywords:['no line breaks','paragraph','Baudelaire','hybrid','poetic prose','compression','image'], content:'Poetry in paragraph form — no line breaks, but all the compression, imagery, and rhythm of verse.' },
  { id:'concrete-poetry', num:'24', title:'Concrete Poetry', category:'Free & Experimental', keywords:['visual','shape','typography','space','pattern','George Herbert','Apollinaire','calligram'], content:'The poem as visual object — words arranged in shapes where typography and white space carry meaning.' },
  { id:'acrostic', num:'25', title:'Acrostic', category:'Free & Experimental', keywords:['hidden message','first letters','names','dedication','puzzle','wordplay','constraint'], content:'A hidden pattern — the first (or last) letters of each line spell out a word, name, or message.' },
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
  main.innerHTML = buildHome() + buildShakespeareanSonnet() + buildPetrarchanSonnet() + buildSpenserianSonnet()
    + buildModernSonnet() + buildCrownOfSonnets() + buildVillanelle() + buildSestina() + buildPantoum()
    + buildGhazal() + buildRondeau() + buildHaiku() + buildTanka() + buildLimerick() + buildEpigram()
    + buildCouplet() + buildBallad() + buildOde() + buildElegy() + buildEpic() + buildDramaticMonologue()
    + buildFreeVerse() + buildBlankVerse() + buildProsePoetry() + buildConcretePoetry() + buildAcrostic();
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Poetic <em>Forms</em></h2>
    <p style="margin-top:14px">An interactive reference covering 25 verse forms — from the strict architecture of sonnets to the freedom of open forms. Each entry maps the structure, rules, and spirit of the form.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-sonnets','shakespearean-sonnet')">
      <div class="cat-card-icon">📜</div>
      <div class="cat-card-name">Sonnets</div>
      <div class="cat-card-count">5 topics · Shakespearean, Petrarchan, Spenserian, Modern, Crown</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-fixed','villanelle')">
      <div class="cat-card-icon">🔗</div>
      <div class="cat-card-name">Fixed Forms</div>
      <div class="cat-card-count">5 topics · Villanelle, Sestina, Pantoum, Ghazal, Rondeau</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-short','haiku')">
      <div class="cat-card-icon">✂️</div>
      <div class="cat-card-name">Short Forms</div>
      <div class="cat-card-count">5 topics · Haiku, Tanka, Limerick, Epigram, Couplet</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-narrative','ballad')">
      <div class="cat-card-icon">📖</div>
      <div class="cat-card-name">Narrative & Long</div>
      <div class="cat-card-count">5 topics · Ballad, Ode, Elegy, Epic, Dramatic Monologue</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-free','free-verse')">
      <div class="cat-card-icon">🌊</div>
      <div class="cat-card-name">Free & Experimental</div>
      <div class="cat-card-count">5 topics · Free Verse, Blank Verse, Prose, Concrete, Acrostic</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildShakespeareanSonnet() {
  return `<div class="topic" id="shakespearean-sonnet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Sonnets</div><h2>Shakespearean <em>Sonnet</em></h2></div>
    <span class="topic-badge">English Sonnet</span>
  </div>
  <p class="sub">// Three quatrains and a couplet — 14 lines of iambic pentameter</p>
  <p class="prose">The <strong>Shakespearean sonnet</strong> (or English sonnet) organizes 14 lines into three quatrains and a final couplet. Each quatrain develops an idea, and the couplet delivers the turn — a twist, resolution, or reversal. The rhyme scheme <strong>ABAB CDCD EFEF GG</strong> gives each quatrain its own pair of rhymes, creating forward momentum.</p>
  <div class="fb"><div class="fm">ABAB CDCD EFEF GG</div><div class="fd"><span>Rhyme scheme:</span> three independent quatrains + closing couplet. Volta typically at line 13.</div></div>
  <div class="fb c2"><div class="fm">da-DUM da-DUM da-DUM da-DUM da-DUM</div><div class="fd"><span>Iambic pentameter:</span> 5 iambs per line = 10 syllables. Unstressed-stressed pattern (◡ /).</div></div>
  <div class="va">
    <div class="vl">// Rhyme scheme structure — color-coded quatrains</div>
    <canvas id="shSonnetCanvas" height="320"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Element</th><th>Detail</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td>Quatrain 1 (L1–4)</td><td>ABAB</td><td>Introduce the subject or problem</td></tr>
      <tr><td>Quatrain 2 (L5–8)</td><td>CDCD</td><td>Develop, complicate, or contrast</td></tr>
      <tr><td>Quatrain 3 (L9–12)</td><td>EFEF</td><td>Pivot or deepen the argument</td></tr>
      <tr><td>Couplet (L13–14)</td><td>GG</td><td>Resolve, reverse, or crystallize</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Sonnet 18 — Shakespeare</span>
Shall I compare thee to a summer's day?      <span class="cm"># A</span>
Thou art more lovely and more temperate:     <span class="cm"># B</span>
Rough winds do shake the darling buds of May, <span class="cm"># A</span>
And summer's lease hath all too short a date.  <span class="cm"># B</span></pre></div>
  <div class="callout info"><strong>Key insight:</strong> The Shakespearean sonnet's power is in the <em>couplet</em>. After 12 lines of development, two lines must deliver the punch. The best couplets reframe everything that came before.</div>
  <div class="topic-nav" id="nav-shakespearean-sonnet"></div>
</div>`;
}

function buildPetrarchanSonnet() {
  return `<div class="topic" id="petrarchan-sonnet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Sonnets</div><h2>Petrarchan <em>Sonnet</em></h2></div>
    <span class="topic-badge">Italian Sonnet</span>
  </div>
  <p class="sub">// Octave and sestet — a problem posed, then answered</p>
  <p class="prose">The <strong>Petrarchan sonnet</strong> divides into two unequal parts: an <strong>octave</strong> (8 lines, ABBAABBA) and a <strong>sestet</strong> (6 lines, typically CDECDE or CDCDCD). The octave presents a situation, question, or emotional tension; the <strong>volta</strong> (turn) at line 9 shifts the poem toward resolution, counter-argument, or deeper insight.</p>
  <div class="fb"><div class="fm">ABBAABBA · CDECDE</div><div class="fd"><span>Rhyme scheme:</span> octave is always ABBAABBA. Sestet varies: CDECDE, CDCDCD, CDDCEE, etc.</div></div>
  <div class="fb c3"><div class="fm">Volta at Line 9</div><div class="fd"><span>The turn:</span> the pivotal shift between octave and sestet. Often signaled by "But," "Yet," "And yet—"</div></div>
  <div class="va">
    <div class="vl">// Octave-sestet structure with volta</div>
    <canvas id="petSonnetCanvas" height="320"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Element</th><th>Lines</th><th>Function</th></tr></thead>
    <tbody>
      <tr><td>Octave</td><td>1–8 (ABBAABBA)</td><td>Pose the problem, describe a situation</td></tr>
      <tr><td>Volta</td><td>Line 9</td><td>The turn — shift in argument or tone</td></tr>
      <tr><td>Sestet</td><td>9–14 (varies)</td><td>Resolve, answer, or complicate</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Key insight:</strong> The Petrarchan sonnet's strength is the <em>volta</em>. The hard break between octave and sestet creates a dramatic structural tension that the English sonnet's gradual quatrains lack.</div>
  <div class="topic-nav" id="nav-petrarchan-sonnet"></div>
</div>`;
}

function buildSpenserianSonnet() {
  return `<div class="topic" id="spenserian-sonnet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Sonnets</div><h2>Spenserian <em>Sonnet</em></h2></div>
    <span class="topic-badge">Interlocking</span>
  </div>
  <p class="sub">// Chain-linked quatrains — each rhyme connects to the next</p>
  <p class="prose">Edmund Spenser created a hybrid: the <strong>three-quatrain-plus-couplet</strong> structure of the English sonnet, but with <strong>interlocking rhymes</strong> (ABAB BCBC CDCD EE). Each quatrain shares a rhyme with the next, creating continuity — the poem flows rather than resets.</p>
  <div class="fb"><div class="fm">ABAB BCBC CDCD EE</div><div class="fd"><span>Interlocking rhyme:</span> the B of quatrain 1 becomes the B of quatrain 2, chaining stanzas together.</div></div>
  <div class="va">
    <div class="vl">// Interlocking rhyme chain visualization</div>
    <canvas id="spenSonnetCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The interlocking rhymes make the Spenserian sonnet harder to write than either Shakespearean or Petrarchan — you need more rhyming words. But the payoff is a sense of inevitable, linked progression.</div>
  <div class="topic-nav" id="nav-spenserian-sonnet"></div>
</div>`;
}

function buildModernSonnet() {
  return `<div class="topic" id="modern-sonnet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Sonnets</div><h2>Modern <em>Sonnet</em></h2></div>
    <span class="topic-badge">Contemporary</span>
  </div>
  <p class="sub">// 14 lines as a container — the rules bend but don't break</p>
  <p class="prose">Modern poets keep the <strong>14-line container</strong> but loosen everything else. Slant rhyme replaces perfect rhyme, meter becomes variable, and the volta can land anywhere — or not at all. The constraint of length creates compression; the freedom within creates surprise.</p>
  <div class="fb"><div class="fm">14 lines · variable meter · slant/no rhyme · flexible volta</div><div class="fd"><span>The modern sonnet:</span> the form's DNA (14 lines, compression, turn) without its strict rules.</div></div>
  <div class="va">
    <div class="vl">// Modern sonnet — comparing strict vs. free structures</div>
    <canvas id="modernSonnetCanvas" height="280"></canvas>
  </div>
  <div class="callout info"><strong>Key figures:</strong> Terrance Hayes (Golden Shovel sonnets), Wanda Coleman ("American Sonnets"), Claudia Rankine, and others have reinvented the sonnet for contemporary voices.</div>
  <div class="topic-nav" id="nav-modern-sonnet"></div>
</div>`;
}

function buildCrownOfSonnets() {
  return `<div class="topic" id="crown-of-sonnets">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Sonnets</div><h2>Crown of <em>Sonnets</em></h2></div>
    <span class="topic-badge">Corona</span>
  </div>
  <p class="sub">// Seven sonnets linked end-to-beginning — a circular chain</p>
  <p class="prose">A <strong>crown of sonnets</strong> (corona) is seven sonnets where the last line of each becomes the first line of the next. The seventh sonnet's last line is the first sonnet's first line, closing the circle. A <strong>heroic crown</strong> adds a 15th "master" sonnet made entirely of the linking lines.</p>
  <div class="fb"><div class="fm">Sonnet₁ last line → Sonnet₂ first line → … → Sonnet₇ last line → Sonnet₁ first line</div><div class="fd"><span>The chain:</span> 7 × 14 = 98 lines linked in a circle</div></div>
  <div class="va">
    <div class="vl">// Crown structure — circular linking visualization</div>
    <canvas id="crownCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The crown is a test of thematic coherence — each linking line must work as both a conclusion and a beginning, forcing the poet to find lines that resonate in two contexts.</div>
  <div class="topic-nav" id="nav-crown-of-sonnets"></div>
</div>`;
}

function buildVillanelle() {
  return `<div class="topic" id="villanelle">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Fixed Forms</div><h2><em>Villanelle</em></h2></div>
    <span class="topic-badge">19 Lines</span>
  </div>
  <p class="sub">// Two refrains, five tercets, one quatrain — obsessive repetition</p>
  <p class="prose">The <strong>villanelle</strong> is built on obsessive repetition. Two lines — the first and third of the opening tercet — alternate as refrains through five tercets and join together in the final quatrain. The form's power comes from how meaning shifts each time the refrain returns in a new context.</p>
  <div class="fb"><div class="fm">A¹bA² abA¹ abA² abA¹ abA² abA¹A²</div><div class="fd"><span>Structure:</span> A¹ and A² are the two refrains. Five tercets (aba) + final quatrain (abaa).</div></div>
  <div class="va">
    <div class="vl">// Villanelle refrain pattern — watch the refrains weave</div>
    <canvas id="villanelleCanvas" height="360"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># "Do Not Go Gentle" — Dylan Thomas</span>
Do not go gentle into that good night,    <span class="cm"># A¹ (refrain 1)</span>
Old age should burn and rave at close of day; <span class="cm"># b</span>
Rage, rage against the dying of the light.  <span class="cm"># A² (refrain 2)</span></pre></div>
  <div class="callout info"><strong>Key insight:</strong> The villanelle works best when the refrains gain new meaning with each repetition. Thomas's "Do not go gentle" grows from advice to plea to prayer.</div>
  <div class="topic-nav" id="nav-villanelle"></div>
</div>`;
}

function buildSestina() {
  return `<div class="topic" id="sestina">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Fixed Forms</div><h2><em>Sestina</em></h2></div>
    <span class="topic-badge">39 Lines</span>
  </div>
  <p class="sub">// Six end-words spiral through six stanzas in a mathematical rotation</p>
  <p class="prose">The <strong>sestina</strong> uses six end-words that rotate through six six-line stanzas following a fixed permutation pattern, then reappear in a three-line envoi. No rhyme — just the obsessive recurrence of six words in shifting positions, creating a spiral of meaning.</p>
  <div class="fb"><div class="fm">End-word rotation: 615243</div><div class="fd"><span>Permutation:</span> if stanza N ends 1-2-3-4-5-6, stanza N+1 ends 6-1-5-2-4-3</div></div>
  <div class="va">
    <div class="vl">// Sestina end-word rotation — 6 words through 6 stanzas</div>
    <canvas id="sestinaCanvas" height="340"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The sestina is essentially a mathematical object — the permutation (6,1,5,2,4,3) generates the entire structure. Elizabeth Bishop's "Sestina" is the modern masterpiece of the form.</div>
  <div class="topic-nav" id="nav-sestina"></div>
</div>`;
}

function buildPantoum() {
  return `<div class="topic" id="pantoum">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Fixed Forms</div><h2><em>Pantoum</em></h2></div>
    <span class="topic-badge">Interlocking</span>
  </div>
  <p class="sub">// Lines echo forward — each stanza carries ghosts of the last</p>
  <p class="prose">The <strong>pantoum</strong> (from the Malay pantun) uses interlocking quatrains: lines 2 and 4 of each stanza become lines 1 and 3 of the next. The final stanza often uses lines 1 and 3 of the first stanza as its lines 2 and 4, creating a closed loop.</p>
  <div class="fb"><div class="fm">Stanza 1: A B C D → Stanza 2: B E D F → Stanza 3: E G F H → …</div><div class="fd"><span>Rule:</span> lines 2,4 of stanza N become lines 1,3 of stanza N+1</div></div>
  <div class="va">
    <div class="vl">// Pantoum line-linking pattern</div>
    <canvas id="pantoumCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The pantoum's repetition creates a dreamlike, obsessive quality — perfect for themes of memory, grief, or time. Each repeated line gains new meaning in its new context.</div>
  <div class="topic-nav" id="nav-pantoum"></div>
</div>`;
}

function buildGhazal() {
  return `<div class="topic" id="ghazal">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Fixed Forms</div><h2><em>Ghazal</em></h2></div>
    <span class="topic-badge">Arabic/Persian</span>
  </div>
  <p class="sub">// Autonomous couplets bound by a repeated refrain — structured longing</p>
  <p class="prose">The <strong>ghazal</strong> is a series of 5–15 couplets (sher), each thematically independent but linked by a repeated refrain word (radif) and a rhyme preceding it (qafia). The final couplet (maqta) traditionally includes the poet's name or pen-name.</p>
  <div class="fb"><div class="fm">AA BA CA DA EA … (radif at end of each couplet's second line)</div><div class="fd"><span>Structure:</span> first couplet sets the pattern (both lines end with radif), subsequent couplets repeat it only in line 2.</div></div>
  <div class="va">
    <div class="vl">// Ghazal couplet structure — radif and qafia pattern</div>
    <canvas id="ghazalCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Each couplet must be a self-contained poem — a complete thought. Agha Shahid Ali championed the ghazal in English, insisting on strict formal adherence. The form's beauty is in the tension between autonomy and connection.</div>
  <div class="topic-nav" id="nav-ghazal"></div>
</div>`;
}

function buildRondeau() {
  return `<div class="topic" id="rondeau">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Fixed Forms</div><h2><em>Rondeau</em></h2></div>
    <span class="topic-badge">French</span>
  </div>
  <p class="sub">// 15 lines, two rhymes, and a recurring refrain from the opening phrase</p>
  <p class="prose">The <strong>rondeau</strong> is a 15-line French form in three stanzas (5-4-6 or similar) using only two rhymes throughout. The opening phrase (rentrement) returns as an unrhymed refrain at the end of the second and third stanzas. "In Flanders Fields" by John McCrae is the most famous English rondeau.</p>
  <div class="fb"><div class="fm">AABBA AABC AABBAC (C = rentrement)</div><div class="fd"><span>Rentrement:</span> the opening half-line returns as a refrain, gaining weight through repetition.</div></div>
  <div class="va">
    <div class="vl">// Rondeau structure with rentrement refrain</div>
    <canvas id="rondeauCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The rentrement's power comes from brevity — it's just the first few words of line 1. By the time it returns, those words carry the full emotional weight of the poem.</div>
  <div class="topic-nav" id="nav-rondeau"></div>
</div>`;
}

function buildHaiku() {
  return `<div class="topic" id="haiku">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Short Forms</div><h2><em>Haiku</em></h2></div>
    <span class="topic-badge">Japanese</span>
  </div>
  <p class="sub">// Three lines, one moment — the art of seeing clearly</p>
  <p class="prose">The <strong>haiku</strong> captures a single moment in three lines. The traditional Japanese form uses 5-7-5 morae (sound units, not syllables exactly), a <strong>kireji</strong> (cutting word) that creates juxtaposition, and a <strong>kigo</strong> (seasonal reference). In English, the 5-7-5 syllable count is common but debated — many modern haiku favor brevity over strict count.</p>
  <div class="fb"><div class="fm">5 · 7 · 5 syllables</div><div class="fd"><span>Structure:</span> three lines, typically with a juxtaposition between an observation and a feeling or between two images.</div></div>
  <div class="va">
    <div class="vl">// Haiku syllable counter — interactive</div>
    <canvas id="haikuCanvas" height="240"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Line 1 syllables</span><input type="range" id="hk1" min="1" max="9" value="5"><span class="vd" id="hk1v">5</span></div>
      <div class="cg"><span class="cl">Line 2 syllables</span><input type="range" id="hk2" min="1" max="11" value="7"><span class="vd" id="hk2v">7</span></div>
      <div class="cg"><span class="cl">Line 3 syllables</span><input type="range" id="hk3" min="1" max="9" value="5"><span class="vd" id="hk3v">5</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Matsuo Bashō (1686)</span>
An old silent pond        <span class="cm"># 5 syllables — the scene</span>
A frog jumps into the pond <span class="cm"># 7 syllables — the action</span>
Splash! Silence again      <span class="cm"># 5 syllables — the resonance</span></pre></div>
  <div class="callout info"><strong>Key insight:</strong> A great haiku is not description — it's a collision of two images that sparks meaning in the gap. The kireji (cutting word) creates that gap.</div>
  <div class="topic-nav" id="nav-haiku"></div>
</div>`;
}

function buildTanka() {
  return `<div class="topic" id="tanka">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Short Forms</div><h2><em>Tanka</em></h2></div>
    <span class="topic-badge">Japanese</span>
  </div>
  <p class="sub">// 5-7-5-7-7 — the haiku's older, more emotional sibling</p>
  <p class="prose">The <strong>tanka</strong> (短歌, "short poem") predates haiku by centuries. Five lines of 5-7-5-7-7 syllables divide into an <strong>upper phrase</strong> (kami-no-ku, 5-7-5) and a <strong>lower phrase</strong> (shimo-no-ku, 7-7). The pivot between them — the turn — shifts from external observation to internal emotion.</p>
  <div class="fb"><div class="fm">5 · 7 · 5 · 7 · 7 = 31 syllables</div><div class="fd"><span>Upper phrase</span> (observation) → <span>pivot</span> → <span>lower phrase</span> (emotion/reflection)</div></div>
  <div class="va">
    <div class="vl">// Tanka structure — upper and lower phrases</div>
    <canvas id="tankaCanvas" height="260"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Where haiku aims for objectivity and the present moment, tanka embraces subjectivity and emotional response. The two extra lines allow the poet to react, reflect, and feel.</div>
  <div class="topic-nav" id="nav-tanka"></div>
</div>`;
}

function buildLimerick() {
  return `<div class="topic" id="limerick">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Short Forms</div><h2><em>Limerick</em></h2></div>
    <span class="topic-badge">Comic</span>
  </div>
  <p class="sub">// AABBA bouncing rhythm — five lines built for a punchline</p>
  <p class="prose">The <strong>limerick</strong> is a five-line form with an AABBA rhyme scheme and a distinctive bouncing rhythm (anapestic meter). Lines 1, 2, and 5 are longer (7-10 syllables); lines 3 and 4 are shorter (5-7 syllables). The form is almost always comic, with the fifth line delivering a twist or punchline.</p>
  <div class="fb"><div class="fm">AABBA · anapestic (da-da-DUM)</div><div class="fd"><span>Lines 1,2,5:</span> 3 feet (longer). <span>Lines 3,4:</span> 2 feet (shorter). Line 5 = punchline.</div></div>
  <div class="va">
    <div class="vl">// Limerick rhythm pattern — long and short lines</div>
    <canvas id="limerickCanvas" height="240"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The limerick's comedy lives in the mismatch between the short middle lines and the return to the long line — the rhythm creates expectation, and the punchline breaks it.</div>
  <div class="topic-nav" id="nav-limerick"></div>
</div>`;
}

function buildEpigram() {
  return `<div class="topic" id="epigram">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Short Forms</div><h2><em>Epigram</em></h2></div>
    <span class="topic-badge">Wit</span>
  </div>
  <p class="sub">// Brevity is the soul of wit — a pointed statement in minimal lines</p>
  <p class="prose">The <strong>epigram</strong> is a brief, clever poem — often a couplet — that delivers a witty observation, paradox, or satirical sting. It prizes compression above all: every word must earn its place. From Martial to Oscar Wilde, the epigram is the tweet of classical literature.</p>
  <div class="fb"><div class="fm">Setup → Twist (in 2–4 lines)</div><div class="fd"><span>Structure:</span> build expectation, then reverse it. The fewer words, the sharper the point.</div></div>
  <div class="va">
    <div class="vl">// Epigram structure — setup and reversal</div>
    <canvas id="epigramCanvas" height="200"></canvas>
  </div>
  <div class="callout info"><strong>Wilde:</strong> "I can resist everything except temptation." The epigram's power is the gap between expectation and delivery — maximum surprise in minimum space.</div>
  <div class="topic-nav" id="nav-epigram"></div>
</div>`;
}

function buildCouplet() {
  return `<div class="topic" id="couplet">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Short Forms</div><h2><em>Couplet</em></h2></div>
    <span class="topic-badge">Two Lines</span>
  </div>
  <p class="sub">// Two lines, one rhyme — the smallest unit of paired verse</p>
  <p class="prose">The <strong>couplet</strong> is two consecutive lines that rhyme. A <strong>heroic couplet</strong> (iambic pentameter, closed — each couplet a complete thought) dominated English poetry for centuries. An <strong>open couplet</strong> lets the sentence flow across the rhyme into the next couplet.</p>
  <div class="fb"><div class="fm">AA BB CC … (heroic = iambic pentameter)</div><div class="fd"><span>Closed:</span> each couplet = complete sentence. <span>Open:</span> enjambment across couplets.</div></div>
  <div class="va">
    <div class="vl">// Closed vs. open couplet visualization</div>
    <canvas id="coupletCanvas" height="220"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Pope's heroic couplets are like epigrammatic bullets — each pair is a polished, self-contained unit. Open couplets (Keats, Browning) trade that punch for narrative flow.</div>
  <div class="topic-nav" id="nav-couplet"></div>
</div>`;
}

function buildBallad() {
  return `<div class="topic" id="ballad">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Narrative & Long Forms</div><h2><em>Ballad</em></h2></div>
    <span class="topic-badge">Narrative</span>
  </div>
  <p class="sub">// Storytelling in quatrains — born from oral tradition</p>
  <p class="prose">The <strong>ballad</strong> tells a story in quatrains, typically with an ABCB or ABAB rhyme scheme and <strong>common meter</strong> (alternating 4-3-4-3 stresses). Born from oral tradition, ballads use repetition, refrains, and dramatic dialogue to propel narrative. They favor action and emotion over description.</p>
  <div class="fb"><div class="fm">ABCB or ABAB · Common meter (4-3-4-3 stresses)</div><div class="fd"><span>Ballad stanza:</span> 4 lines, alternating tetrameter and trimeter. Often with refrain.</div></div>
  <div class="va">
    <div class="vl">// Ballad stanza pattern with refrain</div>
    <canvas id="balladCanvas" height="280"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The ballad's quatrain is the same as hymn meter (common meter) — Emily Dickinson used it for almost every poem. You can sing any Dickinson poem to the tune of "Amazing Grace."</div>
  <div class="topic-nav" id="nav-ballad"></div>
</div>`;
}

function buildOde() {
  return `<div class="topic" id="ode">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Narrative & Long Forms</div><h2><em>Ode</em></h2></div>
    <span class="topic-badge">Praise</span>
  </div>
  <p class="sub">// Elevated verse of praise, address, or deep meditation</p>
  <p class="prose">The <strong>ode</strong> is an elevated lyric poem that addresses a subject with praise, wonder, or deep contemplation. Three types: the <strong>Pindaric</strong> (triadic: strophe, antistrophe, epode), the <strong>Horatian</strong> (regular stanzas, calm meditation), and the <strong>irregular</strong> (Keats's great odes — no fixed pattern but sustained elevation).</p>
  <div class="fb"><div class="fm">Pindaric: strophe + antistrophe + epode | Horatian: uniform stanzas | Irregular: free</div><div class="fd"><span>Ode types:</span> three distinct structural traditions, all sharing elevated tone and direct address.</div></div>
  <div class="va">
    <div class="vl">// Three ode types — structural comparison</div>
    <canvas id="odeCanvas" height="280"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Keats's irregular odes ("Ode to a Nightingale," "Ode on a Grecian Urn") transcend the categories — they combine Pindaric elevation with Horatian intimacy in a form unique to each poem.</div>
  <div class="topic-nav" id="nav-ode"></div>
</div>`;
}

function buildElegy() {
  return `<div class="topic" id="elegy">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Narrative & Long Forms</div><h2><em>Elegy</em></h2></div>
    <span class="topic-badge">Mourning</span>
  </div>
  <p class="sub">// From grief through memory toward consolation</p>
  <p class="prose">The <strong>elegy</strong> is a poem of mourning — not a fixed form but a modal tradition. The classical elegy moves through three stages: <strong>lament</strong> (expression of grief), <strong>praise</strong> (celebrating what was lost), and <strong>consolation</strong> (finding meaning in or beyond the loss). Pastoral elegies add nature imagery and the convention of shepherds mourning.</p>
  <div class="fb"><div class="fm">Lament → Praise → Consolation</div><div class="fd"><span>Three movements:</span> grief expressed, the lost celebrated, meaning found.</div></div>
  <div class="va">
    <div class="vl">// Elegiac arc — from grief to consolation</div>
    <canvas id="elegyCanvas" height="240"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The elegy's real subject is often the living speaker, not the dead — how grief transforms the mourner, how language both fails and consoles.</div>
  <div class="topic-nav" id="nav-elegy"></div>
</div>`;
}

function buildEpic() {
  return `<div class="topic" id="epic">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Narrative & Long Forms</div><h2><em>Epic</em></h2></div>
    <span class="topic-badge">Grand Narrative</span>
  </div>
  <p class="sub">// Heroes, gods, and civilizations — the poem as a world</p>
  <p class="prose">The <strong>epic</strong> is a long narrative poem in elevated style about a hero's journey, a nation's founding, or cosmic events. Conventions include: <strong>invocation of the muse</strong>, starting <strong>in medias res</strong>, extended <strong>catalogues</strong>, epic <strong>similes</strong>, and a journey to the underworld. From Homer to Milton to Walcott.</p>
  <div class="fb"><div class="fm">Invocation → In medias res → Catalogues → Epic similes → Divine machinery → Underworld</div><div class="fd"><span>Epic conventions:</span> the toolkit every epic poet draws from (and sometimes subverts).</div></div>
  <div class="va">
    <div class="vl">// Epic structure — conventions and narrative arc</div>
    <canvas id="epicCanvas" height="280"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Milton's <em>Paradise Lost</em> (blank verse epic) and Walcott's <em>Omeros</em> (Caribbean epic in terza rima-influenced stanzas) show how the epic adapts to new cultures and languages while keeping its conventions.</div>
  <div class="topic-nav" id="nav-epic"></div>
</div>`;
}

function buildDramaticMonologue() {
  return `<div class="topic" id="dramatic-monologue">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Narrative & Long Forms</div><h2>Dramatic <em>Monologue</em></h2></div>
    <span class="topic-badge">Persona</span>
  </div>
  <p class="sub">// A speaker reveals themselves — often more than they intend</p>
  <p class="prose">The <strong>dramatic monologue</strong> is a poem spoken by a character (not the poet) to a silent listener, at a critical moment. The art is in the gap between what the speaker says and what they unconsciously reveal. Robert Browning perfected it with "My Last Duchess" — a duke describing his dead wife's portrait exposes his own murderous jealousy.</p>
  <div class="fb"><div class="fm">Speaker ≠ Poet · Silent listener · Critical moment · Self-revelation</div><div class="fd"><span>Key elements:</span> the speaker's unreliability is the poem's dramatic engine.</div></div>
  <div class="va">
    <div class="vl">// Dramatic monologue — layers of revelation</div>
    <canvas id="dramaticCanvas" height="260"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The dramatic monologue is a precursor to the unreliable narrator in fiction. What makes it poetic rather than dramatic is the compression — a whole character revealed in a single speech act.</div>
  <div class="topic-nav" id="nav-dramatic-monologue"></div>
</div>`;
}

function buildFreeVerse() {
  return `<div class="topic" id="free-verse">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Free & Experimental</div><h2>Free <em>Verse</em></h2></div>
    <span class="topic-badge">Open Form</span>
  </div>
  <p class="sub">// No fixed meter, no rhyme scheme — the line break is the instrument</p>
  <p class="prose"><strong>Free verse</strong> (vers libre) abandons fixed meter and rhyme in favor of organic rhythm — the poem finds its own form. The <strong>line break</strong> becomes the primary tool: where you break the line creates emphasis, surprise, and pacing. Whitman pioneered it; nearly all modern poetry lives here.</p>
  <div class="fb"><div class="fm">No fixed meter · No rhyme scheme · The line break = the unit of rhythm</div><div class="fd"><span>"Free" doesn't mean formless:</span> it means the form is discovered, not prescribed.</div></div>
  <div class="va">
    <div class="vl">// Line break effects — same words, different breaks, different poems</div>
    <canvas id="freeVerseCanvas" height="280"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> "Writing free verse is like playing tennis with the net down" (Frost). The counterargument: free verse replaces external constraints with internal ones — every line break is a decision about rhythm, meaning, and breath.</div>
  <div class="topic-nav" id="nav-free-verse"></div>
</div>`;
}

function buildBlankVerse() {
  return `<div class="topic" id="blank-verse">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Free & Experimental</div><h2>Blank <em>Verse</em></h2></div>
    <span class="topic-badge">Unrhymed Iambic</span>
  </div>
  <p class="sub">// Iambic pentameter without rhyme — the workhorse of English verse</p>
  <p class="prose"><strong>Blank verse</strong> is unrhymed iambic pentameter. It's the backbone of English dramatic and narrative poetry — Shakespeare's plays, Milton's <em>Paradise Lost</em>, Wordsworth's <em>Prelude</em>, Frost's "Birches." Without rhyme pulling the ear forward, the verse relies on rhythm, enjambment, and caesura for its music.</p>
  <div class="fb"><div class="fm">da-DUM da-DUM da-DUM da-DUM da-DUM (no rhyme)</div><div class="fd"><span>Iambic pentameter:</span> 5 iambs, 10 syllables. Blank = no end rhyme. Not to be confused with free verse.</div></div>
  <div class="va">
    <div class="vl">// Blank verse rhythm — stressed/unstressed pattern</div>
    <canvas id="blankVerseCanvas" height="240"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Blank verse is the closest English meter to natural speech — that's why Shakespeare and Milton chose it. The regularity is there, but it's flexible enough to sound like a person thinking aloud.</div>
  <div class="topic-nav" id="nav-blank-verse"></div>
</div>`;
}

function buildProsePoetry() {
  return `<div class="topic" id="prose-poetry">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Free & Experimental</div><h2>Prose <em>Poetry</em></h2></div>
    <span class="topic-badge">Hybrid</span>
  </div>
  <p class="sub">// Poetry without line breaks — compression and image in paragraph form</p>
  <p class="prose"><strong>Prose poetry</strong> looks like prose (paragraphs, no line breaks) but acts like poetry (compression, imagery, rhythm, leaps). Baudelaire's <em>Paris Spleen</em> established the form. What makes it poetry rather than short fiction: the focus on <strong>image over narrative</strong>, the density of language, and the refusal to explain.</p>
  <div class="fb"><div class="fm">Paragraph form · No line breaks · Poetic compression + imagery</div><div class="fd"><span>The question:</span> without line breaks, what makes it a poem? Density, image, and the gap between sentences.</div></div>
  <div class="va">
    <div class="vl">// Prose poetry vs. free verse — same content, different containers</div>
    <canvas id="prosePoetryCanvas" height="240"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Prose poetry is the form that asks "what is poetry?" most directly. If you remove the line break — the poet's most visible tool — what remains?</div>
  <div class="topic-nav" id="nav-prose-poetry"></div>
</div>`;
}

function buildConcretePoetry() {
  return `<div class="topic" id="concrete-poetry">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Free & Experimental</div><h2>Concrete <em>Poetry</em></h2></div>
    <span class="topic-badge">Visual</span>
  </div>
  <p class="sub">// The poem as visual object — shape carries meaning</p>
  <p class="prose"><strong>Concrete poetry</strong> (also: visual poetry, pattern poetry) arranges words on the page so that their visual shape reinforces or creates meaning. George Herbert's "Easter Wings" (1633) shaped the poem like wings; Apollinaire's calligrams shaped text into images. The form treats the page as a canvas, not just a container.</p>
  <div class="fb"><div class="fm">Typography + Spatial arrangement = Meaning</div><div class="fd"><span>The page is the canvas:</span> white space, font size, word placement, and shape all carry semantic weight.</div></div>
  <div class="va">
    <div class="vl">// Concrete poetry — words forming shapes</div>
    <canvas id="concreteCanvas" height="300"></canvas>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Concrete poetry collapses the distinction between reading and seeing. The meaning is inseparable from the shape — you can't "read it aloud" without losing something essential.</div>
  <div class="topic-nav" id="nav-concrete-poetry"></div>
</div>`;
}

function buildAcrostic() {
  return `<div class="topic" id="acrostic">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Free & Experimental</div><h2><em>Acrostic</em></h2></div>
    <span class="topic-badge">Hidden Message</span>
  </div>
  <p class="sub">// A secret pattern — first letters spell something out</p>
  <p class="prose">An <strong>acrostic</strong> poem conceals a word, name, or message in the first (or last, or middle) letters of each line. It's one of the oldest forms of constrained writing — a hidden architecture that rewards the careful reader. Variations include the <strong>double acrostic</strong> (first and last letters) and <strong>mesostic</strong> (middle letters).</p>
  <div class="fb"><div class="fm">First letters of each line → spell a hidden word/name</div><div class="fd"><span>Variants:</span> telestich (last letters), mesostic (middle), double acrostic (first + last).</div></div>
  <div class="va">
    <div class="vl">// Acrostic — hidden words in first letters</div>
    <canvas id="acrosticCanvas" height="280"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Hidden word</span><input type="text" id="acrosticWord" value="POETRY" maxlength="10" style="width:120px;font-family:var(--mono);font-size:13px;padding:4px 8px;background:var(--surface);border:1px solid var(--border);border-radius:4px;color:var(--text);"><span class="vd" id="acrosticLen">6 lines</span></div>
    </div>
  </div>
  <div class="callout info"><strong>Key insight:</strong> The acrostic is a constraint that feels like a game — but it can produce real art. The discipline of starting each line with a given letter forces unexpected word choices and images.</div>
  <div class="topic-nav" id="nav-acrostic"></div>
</div>`;
}
