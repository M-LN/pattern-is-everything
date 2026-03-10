/* ═══════════════════════════════════════════════════════════════
   Sound & Meter — Topics Data & Content Builder
   25 topics organized into 5 sections
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-meter', title:'Meter & Rhythm', topics:['home','iambic-pentameter','trochaic-meter','anapestic-meter','dactylic-meter','spondee-pyrrhic'] },
  { id:'sec-rhyme', title:'Rhyme', topics:['perfect-rhyme','slant-rhyme','eye-rhyme','internal-rhyme','feminine-masculine'] },
  { id:'sec-repetition', title:'Sound Repetition', topics:['alliteration','assonance','consonance','onomatopoeia','euphony-cacophony'] },
  { id:'sec-rhythm', title:'Rhythmic Devices', topics:['caesura','enjambment','end-stopped','syncopation','sprung-rhythm'] },
  { id:'sec-music', title:'Musical Structures', topics:['refrain','anaphora','epistrophe','parallelism','cadence'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'iambic-pentameter':'Iambic Pentameter',
  'trochaic-meter':'Trochaic Meter',
  'anapestic-meter':'Anapestic Meter',
  'dactylic-meter':'Dactylic Meter',
  'spondee-pyrrhic':'Spondee & Pyrrhic',
  'perfect-rhyme':'Perfect Rhyme',
  'slant-rhyme':'Slant Rhyme',
  'eye-rhyme':'Eye Rhyme',
  'internal-rhyme':'Internal Rhyme',
  'feminine-masculine':'Feminine & Masculine Rhyme',
  alliteration:'Alliteration',
  assonance:'Assonance',
  consonance:'Consonance',
  onomatopoeia:'Onomatopoeia',
  'euphony-cacophony':'Euphony & Cacophony',
  caesura:'Caesura',
  enjambment:'Enjambment',
  'end-stopped':'End-Stopped Lines',
  syncopation:'Syncopation',
  'sprung-rhythm':'Sprung Rhythm',
  refrain:'Refrain',
  anaphora:'Anaphora',
  epistrophe:'Epistrophe',
  parallelism:'Parallelism',
  cadence:'Cadence',
};

const TOPIC_DATA = [
  { id:'iambic-pentameter', num:'01', title:'Iambic Pentameter', category:'Meter & Rhythm', keywords:['iamb','da-DUM','5 feet','10 syllables','unstressed stressed','Shakespeare','Milton','blank verse'], content:'The heartbeat of English verse — five iambs (unstressed-stressed) making 10 syllables per line.' },
  { id:'trochaic-meter', num:'02', title:'Trochaic Meter', category:'Meter & Rhythm', keywords:['trochee','DUM-da','stressed-unstressed','falling rhythm','Longfellow','Hiawatha','incantation'], content:'The inverse of iambic — stressed-unstressed. A falling rhythm that sounds incantatory and insistent.' },
  { id:'anapestic-meter', num:'03', title:'Anapestic Meter', category:'Meter & Rhythm', keywords:['anapest','da-da-DUM','galloping','comic','limerick','Byron','light verse','triple meter'], content:'Two unstressed syllables then one stressed — a galloping rhythm that propels comic and narrative verse.' },
  { id:'dactylic-meter', num:'04', title:'Dactylic Meter', category:'Meter & Rhythm', keywords:['dactyl','DUM-da-da','falling triple','hexameter','Homer','classical','waltz'], content:'One stressed then two unstressed — the meter of Homer\'s epics. A rolling, waltz-like triple rhythm.' },
  { id:'spondee-pyrrhic', num:'05', title:'Spondee & Pyrrhic', category:'Meter & Rhythm', keywords:['spondee','pyrrhic','two stressed','two unstressed','substitution','variation','emphasis'], content:'The extremes — two stressed syllables (spondee) for emphasis, two unstressed (pyrrhic) for lightness. Used as substitutions within other meters.' },
  { id:'perfect-rhyme', num:'06', title:'Perfect Rhyme', category:'Rhyme', keywords:['exact rhyme','full rhyme','true rhyme','cat/hat','love/dove','masculine','stressed syllable'], content:'Identical final sounds from the last stressed vowel onward — cat/hat, moon/June, arrive/alive.' },
  { id:'slant-rhyme', num:'07', title:'Slant Rhyme', category:'Rhyme', keywords:['near rhyme','half rhyme','off rhyme','imperfect','Dickinson','consonance rhyme','moon/bone'], content:'Almost but not quite — similar but not identical sounds. Dickinson\'s signature: creates tension and surprise.' },
  { id:'eye-rhyme', num:'08', title:'Eye Rhyme', category:'Rhyme', keywords:['visual rhyme','spelling','love/move','cough/through','sight rhyme','historical'], content:'Words that look like they should rhyme but don\'t — love/move, cough/through. A trap of English spelling.' },
  { id:'internal-rhyme', num:'09', title:'Internal Rhyme', category:'Rhyme', keywords:['mid-line','within line','Poe','dreary/weary','leonine rhyme','hidden rhyme'], content:'Rhyme within a line rather than at the end — "Once upon a midnight dreary, while I pondered, weak and weary."' },
  { id:'feminine-masculine', num:'10', title:'Feminine & Masculine Rhyme', category:'Rhyme', keywords:['single rhyme','double rhyme','stressed','unstressed','ending/bending','night/light','falling'], content:'Masculine: rhyme on the final stressed syllable (night/light). Feminine: rhyme extends to unstressed syllable(s) (ending/bending).' },
  { id:'alliteration', num:'11', title:'Alliteration', category:'Sound Repetition', keywords:['initial consonant','beginning sounds','Peter Piper','Anglo-Saxon','binding','emphasis'], content:'Repetition of initial consonant sounds — the oldest sound device in English, binding words into memorable phrases.' },
  { id:'assonance', num:'12', title:'Assonance', category:'Sound Repetition', keywords:['vowel repetition','internal vowels','fleet feet','mood','tonal color','musicality'], content:'Repetition of vowel sounds within words — "fleet feet sweep the street." Creates tonal color and mood.' },
  { id:'consonance', num:'13', title:'Consonance', category:'Sound Repetition', keywords:['consonant repetition','internal consonants','pitter patter','texture','dentals','labials'], content:'Repetition of consonant sounds, especially at the end or middle of words — "pitter patter" or "odds and ends."' },
  { id:'onomatopoeia', num:'14', title:'Onomatopoeia', category:'Sound Repetition', keywords:['sound words','buzz','hiss','crash','imitation','mimicry','sensory'], content:'Words that sound like what they mean — buzz, hiss, crash, murmur. Language imitating the world.' },
  { id:'euphony-cacophony', num:'15', title:'Euphony & Cacophony', category:'Sound Repetition', keywords:['pleasant sound','harsh sound','smooth','rough','liquid consonants','plosives','beauty','discord'], content:'Euphony: smooth, pleasant sounds (liquid consonants, open vowels). Cacophony: harsh, discordant sounds (plosives, clusters).' },
  { id:'caesura', num:'16', title:'Caesura', category:'Rhythmic Devices', keywords:['pause','mid-line break','punctuation','breathing','Anglo-Saxon','dramatic pause','||'], content:'A pause or break within a line — created by punctuation, syntax, or natural breath. The silence within the sound.' },
  { id:'enjambment', num:'17', title:'Enjambment', category:'Rhythmic Devices', keywords:['run-on line','continuation','overflow','line break','momentum','surprise','tension'], content:'When a sentence or phrase runs past the end of a line without pause — creating momentum and surprise.' },
  { id:'end-stopped', num:'18', title:'End-Stopped Lines', category:'Rhythmic Devices', keywords:['pause at end','period','comma','complete thought','Pope','couplet','closure'], content:'A line that ends with a natural pause (period, comma, semicolon) — the thought completes at the line break.' },
  { id:'syncopation', num:'19', title:'Syncopation', category:'Rhythmic Devices', keywords:['off-beat','unexpected stress','jazz','disruption','variation','counterpoint','swing'], content:'Emphasis on unexpected beats — like jazz in poetry. Disrupts the established rhythm to create energy and surprise.' },
  { id:'sprung-rhythm', num:'20', title:'Sprung Rhythm', category:'Rhythmic Devices', keywords:['Hopkins','stressed syllables','variable unstressed','natural speech','Gerard Manley Hopkins','wild rhythm'], content:'Gerard Manley Hopkins\' invention — meter counted only by stressed syllables, with any number of unstressed between them.' },
  { id:'refrain', num:'21', title:'Refrain', category:'Musical Structures', keywords:['repeated line','chorus','recurring','villanelle','ballad','accumulation','meaning shift'], content:'A line or phrase that recurs throughout a poem — each repetition accumulates new meaning from its context.' },
  { id:'anaphora', num:'22', title:'Anaphora', category:'Musical Structures', keywords:['beginning repetition','I have a dream','Whitman','insistence','rhetoric','parallel beginning'], content:'Repetition of words at the beginning of successive lines or clauses — "I have a dream… I have a dream…"' },
  { id:'epistrophe', num:'23', title:'Epistrophe', category:'Musical Structures', keywords:['ending repetition','end of line','of the people','closure','echo','rhetorical'], content:'Repetition at the end of successive lines — "government of the people, by the people, for the people."' },
  { id:'parallelism', num:'24', title:'Parallelism', category:'Musical Structures', keywords:['parallel structure','balanced','syntax','Whitman','Psalms','catalogue','rhythmic echo'], content:'Repeating grammatical structures across lines — creating rhythm through syntax rather than meter.' },
  { id:'cadence', num:'25', title:'Cadence', category:'Musical Structures', keywords:['rhythm of prose','natural rhythm','falling','rising','speech rhythm','Whitman','biblical'], content:'The natural rhythm of speech — neither strict meter nor formless. The rise and fall of the voice.' },
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
  main.innerHTML = buildHome() + buildIambicPentameter() + buildTrochaicMeter() + buildAnapesticMeter()
    + buildDactylicMeter() + buildSpondeePyrrhic() + buildPerfectRhyme() + buildSlantRhyme()
    + buildEyeRhyme() + buildInternalRhyme() + buildFeminineMasculine() + buildAlliteration()
    + buildAssonance() + buildConsonance() + buildOnomatopoeia() + buildEuphonyCacophony()
    + buildCaesura() + buildEnjambment() + buildEndStopped() + buildSyncopation()
    + buildSprungRhythm() + buildRefrain() + buildAnaphora() + buildEpistrophe()
    + buildParallelism() + buildCadence();
}

function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>Sound & <em>Meter</em></h2>
    <p style="margin-top:14px">An interactive guide to 25 sound devices — from the building blocks of meter to the music of repetition. Each entry maps how sound creates meaning in verse.</p>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">←</span> <span class="kbd">→</span> navigate &nbsp;·&nbsp;
      <span class="kbd">Ctrl+K</span> search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-meter','iambic-pentameter')">
      <div class="cat-card-icon">🥁</div>
      <div class="cat-card-name">Meter & Rhythm</div>
      <div class="cat-card-count">5 topics · Iambic, Trochaic, Anapestic, Dactylic, Spondee</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-rhyme','perfect-rhyme')">
      <div class="cat-card-icon">🔔</div>
      <div class="cat-card-name">Rhyme</div>
      <div class="cat-card-count">5 topics · Perfect, Slant, Eye, Internal, Gendered</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-repetition','alliteration')">
      <div class="cat-card-icon">🔁</div>
      <div class="cat-card-name">Sound Repetition</div>
      <div class="cat-card-count">5 topics · Alliteration, Assonance, Consonance, Onomatopoeia</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-rhythm','caesura')">
      <div class="cat-card-icon">⏸️</div>
      <div class="cat-card-name">Rhythmic Devices</div>
      <div class="cat-card-count">5 topics · Caesura, Enjambment, Syncopation, Sprung Rhythm</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-music','refrain')">
      <div class="cat-card-icon">🎵</div>
      <div class="cat-card-name">Musical Structures</div>
      <div class="cat-card-count">5 topics · Refrain, Anaphora, Epistrophe, Parallelism</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS
   ═══════════════════════════════════════════════════════════════ */

function buildIambicPentameter() {
  return `<div class="topic" id="iambic-pentameter">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">01 — Meter & Rhythm</div><h2>Iambic <em>Pentameter</em></h2></div><span class="topic-badge">5 Iambs</span></div>
  <p class="sub">// The heartbeat of English verse — da-DUM × 5</p>
  <p class="prose">An <strong>iamb</strong> is an unstressed syllable followed by a stressed one (◡ /). <strong>Pentameter</strong> means five feet per line. Together: 10 syllables alternating unstressed-stressed. It dominates English poetry because it closely mirrors natural speech rhythms.</p>
  <div class="fb"><div class="fm">◡ / ◡ / ◡ / ◡ / ◡ /</div><div class="fd"><span>5 iambs = 10 syllables.</span> "Shall I | com-PARE | thee TO | a SUM | mer's DAY?"</div></div>
  <div class="va"><div class="vl">// Iambic pentameter — stress pattern visualization</div>
    <canvas id="iambicCanvas" height="260"></canvas>
    <div class="ctrl"><div class="cg"><span class="cl">Variation</span><input type="range" id="iambVar" min="0" max="3" value="0"><span class="vd" id="iambVarV">Regular</span></div></div>
  </div>
  <div class="callout info"><strong>Key insight:</strong> Pure iambic pentameter is rare — poets constantly substitute feet (trochee in position 1, spondee for emphasis) to keep it alive.</div>
  <div class="topic-nav" id="nav-iambic-pentameter"></div>
</div>`;
}

function buildTrochaicMeter() {
  return `<div class="topic" id="trochaic-meter">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">02 — Meter & Rhythm</div><h2>Trochaic <em>Meter</em></h2></div><span class="topic-badge">DUM-da</span></div>
  <p class="sub">// The falling foot — stressed then unstressed</p>
  <p class="prose">A <strong>trochee</strong> reverses the iamb: stressed-unstressed (/ ◡). Trochaic meter has a driving, incantatory quality — "DOU-ble, DOU-ble, TOIL and TROU-ble." Longfellow's <em>Hiawatha</em> uses trochaic tetrameter throughout.</p>
  <div class="fb"><div class="fm">/ ◡ / ◡ / ◡ / ◡</div><div class="fd"><span>Falling rhythm:</span> each foot starts strong and falls. Common in chants, spells, and children's verse.</div></div>
  <div class="va"><div class="vl">// Trochaic pattern — stressed-unstressed visualization</div><canvas id="trochaicCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Trochaic meter often feels more forceful and urgent than iambic — that's why it's the meter of incantation and command.</div>
  <div class="topic-nav" id="nav-trochaic-meter"></div>
</div>`;
}

function buildAnapesticMeter() {
  return `<div class="topic" id="anapestic-meter">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">03 — Meter & Rhythm</div><h2>Anapestic <em>Meter</em></h2></div><span class="topic-badge">da-da-DUM</span></div>
  <p class="sub">// The galloping foot — two light beats then one heavy</p>
  <p class="prose">An <strong>anapest</strong> is two unstressed syllables followed by one stressed (◡ ◡ /). The triple rhythm creates a galloping, forward-rushing energy — perfect for limericks, comic verse, and energetic narratives.</p>
  <div class="fb"><div class="fm">◡ ◡ / ◡ ◡ / ◡ ◡ / ◡ ◡ /</div><div class="fd"><span>"'Twas the NIGHT before CHRIST-mas"</span> — anapestic tetrameter in action.</div></div>
  <div class="va"><div class="vl">// Anapestic rhythm — galloping triple pattern</div><canvas id="anapesticCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The extra unstressed syllable gives anapestic meter a sense of acceleration — each foot builds speed toward the stress.</div>
  <div class="topic-nav" id="nav-anapestic-meter"></div>
</div>`;
}

function buildDactylicMeter() {
  return `<div class="topic" id="dactylic-meter">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">04 — Meter & Rhythm</div><h2>Dactylic <em>Meter</em></h2></div><span class="topic-badge">DUM-da-da</span></div>
  <p class="sub">// The waltz foot — one heavy beat then two light</p>
  <p class="prose">A <strong>dactyl</strong> is one stressed syllable followed by two unstressed (/ ◡ ◡). Named for the Greek word for "finger" (one long bone, two short), it creates a rolling, expansive rhythm — the meter of Homer's hexameter epics.</p>
  <div class="fb"><div class="fm">/ ◡ ◡ / ◡ ◡ / ◡ ◡ / ◡ ◡</div><div class="fd"><span>"THIS is the FOR-est pri-ME-val"</span> — dactylic hexameter echoes classical epic.</div></div>
  <div class="va"><div class="vl">// Dactylic rhythm — rolling triple pattern</div><canvas id="dactylicCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Dactylic meter is rare in English because English naturally tends toward iambic patterns — but when used, it creates a grand, sweeping effect.</div>
  <div class="topic-nav" id="nav-dactylic-meter"></div>
</div>`;
}

function buildSpondeePyrrhic() {
  return `<div class="topic" id="spondee-pyrrhic">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">05 — Meter & Rhythm</div><h2>Spondee & <em>Pyrrhic</em></h2></div><span class="topic-badge">Substitutions</span></div>
  <p class="sub">// Two stressed or two unstressed — the meter's spice rack</p>
  <p class="prose">A <strong>spondee</strong> (/ /) puts two stresses side by side for emphasis — "heartbreak," "stone cold." A <strong>pyrrhic</strong> (◡ ◡) is two unstressed syllables — a whisper between beats. Neither sustains a whole poem, but both are essential as substitutions within other meters.</p>
  <div class="fb"><div class="fm">SPONDEE: / / (HEART-BREAK) · PYRRHIC: ◡ ◡ (of the)</div><div class="fd"><span>Contrast:</span> spondee = maximum weight. Pyrrhic = maximum lightness.</div></div>
  <div class="va"><div class="vl">// Spondee vs. Pyrrhic — weight comparison</div><canvas id="spondeePyrrhicCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Great metrical poetry uses spondees and pyrrhics strategically — a spondee slows the line for emphasis, a pyrrhic speeds it up for lightness.</div>
  <div class="topic-nav" id="nav-spondee-pyrrhic"></div>
</div>`;
}

function buildPerfectRhyme() {
  return `<div class="topic" id="perfect-rhyme">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">06 — Rhyme</div><h2>Perfect <em>Rhyme</em></h2></div><span class="topic-badge">Exact</span></div>
  <p class="sub">// Identical sounds from the last stressed vowel onward</p>
  <p class="prose"><strong>Perfect rhyme</strong> (exact/true/full rhyme) requires identical sounds from the last stressed vowel onward: cat/hat, moon/June, desire/fire. The consonant before the vowel must differ (otherwise it's an identity, not a rhyme).</p>
  <div class="fb"><div class="fm">Same: stressed vowel + everything after · Different: onset consonant</div><div class="fd"><span>cat/hat ✓</span> (different onset, same -at). <span>cat/cat ✗</span> (identity, not rhyme).</div></div>
  <div class="va"><div class="vl">// Perfect rhyme — matching sound segments</div><canvas id="perfectRhymeCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Perfect rhyme creates a strong sense of closure and satisfaction — that's why it dominates formal verse. But too much can feel sing-song.</div>
  <div class="topic-nav" id="nav-perfect-rhyme"></div>
</div>`;
}

function buildSlantRhyme() {
  return `<div class="topic" id="slant-rhyme">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">07 — Rhyme</div><h2>Slant <em>Rhyme</em></h2></div><span class="topic-badge">Near</span></div>
  <p class="sub">// Almost-rhyme — similar but not identical sounds</p>
  <p class="prose"><strong>Slant rhyme</strong> (near/half/off rhyme) uses words with similar but not identical sounds — moon/bone, heart/hurt, time/team. Emily Dickinson made it her signature, creating an unsettling tension between expectation and delivery.</p>
  <div class="fb"><div class="fm">Shared consonants OR shared vowels — but not both perfectly</div><div class="fd"><span>moon/bone:</span> shared -n ending, different vowels. <span>time/team:</span> shared t-m frame, different vowels.</div></div>
  <div class="va"><div class="vl">// Slant rhyme — partial sound overlap</div><canvas id="slantRhymeCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Slant rhyme creates a subtle dissonance — the ear expects a match that doesn't quite arrive. That gap is where meaning lives.</div>
  <div class="topic-nav" id="nav-slant-rhyme"></div>
</div>`;
}

function buildEyeRhyme() {
  return `<div class="topic" id="eye-rhyme">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">08 — Rhyme</div><h2>Eye <em>Rhyme</em></h2></div><span class="topic-badge">Visual</span></div>
  <p class="sub">// Looks like a rhyme, sounds like a trick</p>
  <p class="prose"><strong>Eye rhyme</strong> (sight rhyme) pairs words that look alike in spelling but don't sound alike: love/move, cough/through, blood/mood. Many eye rhymes were perfect rhymes in earlier English — pronunciation shifted but spelling didn't.</p>
  <div class="fb"><div class="fm">Same spelling pattern ≠ Same sound</div><div class="fd"><span>love/move, cough/through, wind/find</span> — English spelling at its most treacherous.</div></div>
  <div class="va"><div class="vl">// Eye rhyme — visual match vs. sound mismatch</div><canvas id="eyeRhymeCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Eye rhyme reminds us that written poetry and spoken poetry are different experiences — the page and the ear don't always agree.</div>
  <div class="topic-nav" id="nav-eye-rhyme"></div>
</div>`;
}

function buildInternalRhyme() {
  return `<div class="topic" id="internal-rhyme">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">09 — Rhyme</div><h2>Internal <em>Rhyme</em></h2></div><span class="topic-badge">Within Lines</span></div>
  <p class="sub">// Rhyme buried inside the line — hidden music</p>
  <p class="prose"><strong>Internal rhyme</strong> places rhyming words within a line rather than at the end. Poe's "Once upon a midnight <em>dreary</em>, while I pondered, weak and <em>weary</em>" uses internal rhyme to create a hypnotic, almost musical quality.</p>
  <div class="fb"><div class="fm">Rhyme at mid-line ↔ end-line, or mid-line ↔ mid-line</div><div class="fd"><span>Types:</span> leonine (mid + end), cross-rhyme (mid of one line + end of next).</div></div>
  <div class="va"><div class="vl">// Internal rhyme — sounds echoing within lines</div><canvas id="internalRhymeCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Internal rhyme makes poetry more musical without the predictability of end rhyme — the echoes surprise the ear.</div>
  <div class="topic-nav" id="nav-internal-rhyme"></div>
</div>`;
}

function buildFeminineMasculine() {
  return `<div class="topic" id="feminine-masculine">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">10 — Rhyme</div><h2>Feminine & <em>Masculine</em> Rhyme</h2></div><span class="topic-badge">Gendered</span></div>
  <p class="sub">// Where the rhyme falls — on the beat or after it</p>
  <p class="prose"><strong>Masculine rhyme</strong> matches final stressed syllables: night/light, desire/fire. <strong>Feminine rhyme</strong> (double rhyme) extends the match into the following unstressed syllable(s): ending/bending, glorious/victorious. Triple rhyme adds another: beautiful/dutiful.</p>
  <div class="fb"><div class="fm">Masculine: STRESS (cat/hat) · Feminine: STRESS-unstress (ending/bending)</div><div class="fd"><span>Effect:</span> masculine = closure. Feminine = lighter, sometimes comic.</div></div>
  <div class="va"><div class="vl">// Masculine vs. feminine rhyme comparison</div><canvas id="femMascCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Feminine rhyme often sounds comic in English (which is why Byron uses it in <em>Don Juan</em>) — the extra unstressed syllable deflates the line's weight.</div>
  <div class="topic-nav" id="nav-feminine-masculine"></div>
</div>`;
}

function buildAlliteration() {
  return `<div class="topic" id="alliteration">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">11 — Sound Repetition</div><h2><em>Alliteration</em></h2></div><span class="topic-badge">Initial Sounds</span></div>
  <p class="sub">// Repeated initial consonants — the oldest sound binding</p>
  <p class="prose"><strong>Alliteration</strong> repeats the initial consonant sound in nearby words. Before English had rhyme, it had alliteration — Anglo-Saxon verse was built on it. It binds words together, creates emphasis, and makes phrases memorable ("dead as a doornail").</p>
  <div class="fb"><div class="fm">Same initial consonant sound in stressed syllables</div><div class="fd"><span>"Peter Piper picked a peck"</span> — the P sound links every key word.</div></div>
  <div class="va"><div class="vl">// Alliteration — initial sounds highlighted</div><canvas id="alliterationCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Alliteration works on <em>sound</em>, not spelling. "City" and "science" alliterate; "city" and "cat" alliterate. It's the ear, not the eye.</div>
  <div class="topic-nav" id="nav-alliteration"></div>
</div>`;
}

function buildAssonance() {
  return `<div class="topic" id="assonance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">12 — Sound Repetition</div><h2><em>Assonance</em></h2></div><span class="topic-badge">Vowels</span></div>
  <p class="sub">// Repeated vowel sounds — the color of sound</p>
  <p class="prose"><strong>Assonance</strong> repeats vowel sounds within words — "fleet feet sweep the street" (long e), "the rain in Spain" (long a). It creates tonal color and mood, subtler than rhyme but powerful in building atmosphere.</p>
  <div class="fb"><div class="fm">Same vowel sound in nearby words (consonants differ)</div><div class="fd"><span>"Hear the mellow wedding bells"</span> (Poe) — the short e creates a warm resonance.</div></div>
  <div class="va"><div class="vl">// Assonance — vowel sound patterns</div><canvas id="assonanceCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> High vowels (ee, ay) tend to feel bright and sharp; low vowels (oo, aw) feel dark and heavy. Assonance creates mood through vowel selection.</div>
  <div class="topic-nav" id="nav-assonance"></div>
</div>`;
}

function buildConsonance() {
  return `<div class="topic" id="consonance">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">13 — Sound Repetition</div><h2><em>Consonance</em></h2></div><span class="topic-badge">Consonants</span></div>
  <p class="sub">// Repeated consonant sounds — the texture of language</p>
  <p class="prose"><strong>Consonance</strong> repeats consonant sounds, especially in the middle or end of words — "pitter patter," "odds and ends," "struts and frets." Where alliteration focuses on beginnings, consonance weaves through the entire word.</p>
  <div class="fb"><div class="fm">Same consonant sounds in nearby words (position varies)</div><div class="fd"><span>"stroke of luck"</span> — the k sound at the end of stroke and luck.</div></div>
  <div class="va"><div class="vl">// Consonance — consonant sound patterns</div><canvas id="consonanceCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Consonance is the most subtle of the sound-repetition devices — it works below conscious hearing, creating a feeling of cohesion without being obvious.</div>
  <div class="topic-nav" id="nav-consonance"></div>
</div>`;
}

function buildOnomatopoeia() {
  return `<div class="topic" id="onomatopoeia">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">14 — Sound Repetition</div><h2><em>Onomatopoeia</em></h2></div><span class="topic-badge">Sound Words</span></div>
  <p class="sub">// Words that sound like what they mean</p>
  <p class="prose"><strong>Onomatopoeia</strong> uses words whose sounds imitate their meanings — buzz, hiss, crash, murmur, sizzle. It's language at its most primal: sound directly conveying sense.</p>
  <div class="fb"><div class="fm">Sound → Word → Meaning (direct imitation)</div><div class="fd"><span>buzz, hiss, crack, splash, whisper, boom, rustle, sizzle</span></div></div>
  <div class="va"><div class="vl">// Onomatopoeia — sound-sense mapping</div><canvas id="onomatopoeiaCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Onomatopoeia varies by language — a dog says "woof" in English, "wan-wan" in Japanese, "guau" in Spanish. Even sound imitation is culturally shaped.</div>
  <div class="topic-nav" id="nav-onomatopoeia"></div>
</div>`;
}

function buildEuphonyCacophony() {
  return `<div class="topic" id="euphony-cacophony">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">15 — Sound Repetition</div><h2>Euphony & <em>Cacophony</em></h2></div><span class="topic-badge">Beautiful / Harsh</span></div>
  <p class="sub">// The sweet and the savage — sound as emotional texture</p>
  <p class="prose"><strong>Euphony</strong> uses smooth, pleasant sounds — liquid consonants (l, m, n, r), open vowels, flowing combinations. <strong>Cacophony</strong> uses harsh, discordant sounds — plosives (b, d, g, k, p, t), consonant clusters, hard stops. Poets choose deliberately.</p>
  <div class="fb"><div class="fm">Euphony: l, m, n, r + open vowels · Cacophony: k, t, p, g + clusters</div><div class="fd"><span>"Season of mists and mellow fruitfulness"</span> (euphony) vs. <span>"black crack of blood"</span> (cacophony).</div></div>
  <div class="va"><div class="vl">// Euphony vs. cacophony — smooth vs. harsh sounds</div><canvas id="euphCacCanvas" height="240"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Euphony and cacophony are relative — a cacophonous passage gains power by following euphony, and vice versa. Contrast is the key.</div>
  <div class="topic-nav" id="nav-euphony-cacophony"></div>
</div>`;
}

function buildCaesura() {
  return `<div class="topic" id="caesura">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">16 — Rhythmic Devices</div><h2><em>Caesura</em></h2></div><span class="topic-badge">Pause</span></div>
  <p class="sub">// The silence within the line — a breath, a break, a beat</p>
  <p class="prose">A <strong>caesura</strong> is a pause or break within a line of verse, created by punctuation, syntax, or natural breath. It divides the line into two hemistich (half-lines). In Anglo-Saxon verse, the caesura was the structural center of every line.</p>
  <div class="fb"><div class="fm">Line… ‖ …continues (medial caesura)</div><div class="fd"><span>"To be, or not to be: ‖ that is the question"</span> — the colon creates a dramatic pause.</div></div>
  <div class="va"><div class="vl">// Caesura positions — initial, medial, terminal</div><canvas id="caesuraCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The caesura is silence as rhythm — the pause carries as much weight as the words. It's where the reader breathes and the line pivots.</div>
  <div class="topic-nav" id="nav-caesura"></div>
</div>`;
}

function buildEnjambment() {
  return `<div class="topic" id="enjambment">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">17 — Rhythmic Devices</div><h2><em>Enjambment</em></h2></div><span class="topic-badge">Run-on</span></div>
  <p class="sub">// The sentence flows past the line break — no pause, just momentum</p>
  <p class="prose"><strong>Enjambment</strong> occurs when a sentence or phrase continues past the end of a line without punctuation or pause. The eye drops to the next line; the meaning is suspended. It creates momentum, surprise, and tension between the line as a unit and the sentence as a unit.</p>
  <div class="fb"><div class="fm">End of line ≠ end of thought → momentum carries forward</div><div class="fd"><span>"I am not yet born; // O hear me."</span> — the sentence pulls across the break.</div></div>
  <div class="va"><div class="vl">// Enjambment vs. end-stopped — flow comparison</div><canvas id="enjambmentCanvas" height="240"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Enjambment creates a double reading — the line ending pauses the eye while the syntax pulls it forward. The tension between these two forces is the device's power.</div>
  <div class="topic-nav" id="nav-enjambment"></div>
</div>`;
}

function buildEndStopped() {
  return `<div class="topic" id="end-stopped">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">18 — Rhythmic Devices</div><h2>End-Stopped <em>Lines</em></h2></div><span class="topic-badge">Closure</span></div>
  <p class="sub">// Each line ends with a pause — thought and line align</p>
  <p class="prose"><strong>End-stopped lines</strong> pause at the line break — a period, comma, semicolon, or natural breath creates closure. The line unit and the sentence unit align. Pope's heroic couplets are almost entirely end-stopped, creating a sense of epigrammatic precision.</p>
  <div class="fb"><div class="fm">Line break = natural pause · Thought completes at line end</div><div class="fd"><span>"True wit is nature to advantage dressed, / What oft was thought, but ne'er so well expressed."</span></div></div>
  <div class="va"><div class="vl">// End-stopped lines — pause at each break</div><canvas id="endStoppedCanvas" height="200"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> End-stopped lines feel measured and controlled — each line is a closed unit. Too many feel monotonous; the best poets vary end-stopping with enjambment.</div>
  <div class="topic-nav" id="nav-end-stopped"></div>
</div>`;
}

function buildSyncopation() {
  return `<div class="topic" id="syncopation">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">19 — Rhythmic Devices</div><h2><em>Syncopation</em></h2></div><span class="topic-badge">Off-beat</span></div>
  <p class="sub">// Stress where you don't expect it — jazz in verse</p>
  <p class="prose"><strong>Syncopation</strong> in poetry is emphasis on unexpected beats — disrupting the established meter to create energy, surprise, or emotional intensity. Like jazz, it works because the listener hears the expected rhythm underneath the deviation.</p>
  <div class="fb"><div class="fm">Expected: ◡ / ◡ / ◡ / · Syncopated: ◡ / / ◡ ◡ /</div><div class="fd"><span>The disruption creates tension</span> between what the ear expects and what it hears.</div></div>
  <div class="va"><div class="vl">// Regular vs. syncopated rhythm</div><canvas id="syncopationCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Syncopation only works when there's a regular pattern to play against — the surprise depends on the expectation.</div>
  <div class="topic-nav" id="nav-syncopation"></div>
</div>`;
}

function buildSprungRhythm() {
  return `<div class="topic" id="sprung-rhythm">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">20 — Rhythmic Devices</div><h2>Sprung <em>Rhythm</em></h2></div><span class="topic-badge">Hopkins</span></div>
  <p class="sub">// Count the stresses, ignore the rest — poetic wildness</p>
  <p class="prose"><strong>Sprung rhythm</strong> is Gerard Manley Hopkins' invention: only stressed syllables are counted, with any number of unstressed syllables between them. It creates a wild, irregular surface over a deep structural regularity — like natural speech intensified.</p>
  <div class="fb"><div class="fm">Fixed number of stresses per line · Variable unstressed syllables</div><div class="fd"><span>"The WORLD is CHARGED with the GRAN-deur of GOD"</span> — 4 stresses, variable unstressed.</div></div>
  <div class="va"><div class="vl">// Sprung rhythm — stresses as anchor points</div><canvas id="sprungCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Hopkins called sprung rhythm "the rhythm of natural speech" — and indeed, when we speak, we time our stresses roughly evenly regardless of how many unstressed syllables fall between.</div>
  <div class="topic-nav" id="nav-sprung-rhythm"></div>
</div>`;
}

function buildRefrain() {
  return `<div class="topic" id="refrain">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">21 — Musical Structures</div><h2><em>Refrain</em></h2></div><span class="topic-badge">Repetition</span></div>
  <p class="sub">// The recurring line — same words, shifting meaning</p>
  <p class="prose">A <strong>refrain</strong> is a line or phrase repeated at intervals throughout a poem, typically at the end of each stanza. Its power comes from accumulation — the same words return in a new context, gaining or losing meaning with each repetition.</p>
  <div class="fb"><div class="fm">Stanza 1 → refrain → Stanza 2 → refrain → … (meaning shifts)</div><div class="fd"><span>Villanelle, ballad, rondeau</span> — all built on the refrain's power.</div></div>
  <div class="va"><div class="vl">// Refrain pattern — recurring line through stanzas</div><canvas id="refrainCanvas" height="240"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> The best refrains are emotionally ambiguous — words that can mean different things depending on what came before. "Do not go gentle" changes from advice to plea to prayer.</div>
  <div class="topic-nav" id="nav-refrain"></div>
</div>`;
}

function buildAnaphora() {
  return `<div class="topic" id="anaphora">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">22 — Musical Structures</div><h2><em>Anaphora</em></h2></div><span class="topic-badge">Beginning Repetition</span></div>
  <p class="sub">// Same words at the start of each line — insistence as form</p>
  <p class="prose"><strong>Anaphora</strong> repeats a word or phrase at the beginning of successive lines, clauses, or sentences. It's one of the most powerful rhetorical devices — "I have a dream," Whitman's "I" catalogues, Ginsberg's "who." The repetition creates rhythm, emphasis, and accumulative force.</p>
  <div class="fb"><div class="fm">Line 1: "I saw…" · Line 2: "I saw…" · Line 3: "I saw…" (same beginning)</div><div class="fd"><span>Each repetition adds weight</span> — the pattern becomes an incantation.</div></div>
  <div class="va"><div class="vl">// Anaphora — beginning repetition pattern</div><canvas id="anaphoraCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Anaphora democratizes what follows — by giving every line the same launch pad, it says each experience/image is equally important.</div>
  <div class="topic-nav" id="nav-anaphora"></div>
</div>`;
}

function buildEpistrophe() {
  return `<div class="topic" id="epistrophe">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">23 — Musical Structures</div><h2><em>Epistrophe</em></h2></div><span class="topic-badge">Ending Repetition</span></div>
  <p class="sub">// Same words at the end of each line — the echo of closure</p>
  <p class="prose"><strong>Epistrophe</strong> repeats a word or phrase at the end of successive clauses or lines — "government of the people, by the people, for the people." Where anaphora launches, epistrophe lands. It drives the repeated word home with the force of a closing bell.</p>
  <div class="fb"><div class="fm">Line 1: "…the people" · Line 2: "…the people" · Line 3: "…the people"</div><div class="fd"><span>Each line arrives at the same word</span> — the ending reinforced by repetition.</div></div>
  <div class="va"><div class="vl">// Epistrophe — ending repetition pattern</div><canvas id="epistropheCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Epistrophe places emphasis on the repeated word because it lands in the position of maximum stress — the end of the line. It's anaphora's more forceful sibling.</div>
  <div class="topic-nav" id="nav-epistrophe"></div>
</div>`;
}

function buildParallelism() {
  return `<div class="topic" id="parallelism">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">24 — Musical Structures</div><h2><em>Parallelism</em></h2></div><span class="topic-badge">Syntax Echo</span></div>
  <p class="sub">// Matched grammatical structures — rhythm through syntax</p>
  <p class="prose"><strong>Parallelism</strong> repeats grammatical structures across lines or clauses — not the same words, but the same shape. "Easy to love, hard to leave" uses parallel adjective-infinitive constructions. It creates rhythm through syntax rather than sound.</p>
  <div class="fb"><div class="fm">Same grammatical pattern → different content</div><div class="fd"><span>"To err is human; to forgive, divine"</span> — parallel infinitive phrases.</div></div>
  <div class="va"><div class="vl">// Parallelism — matching syntactic structures</div><canvas id="parallelismCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Parallelism is the basis of Whitman's free verse and the Psalms — without meter or rhyme, the repeated grammatical structure becomes the primary source of rhythm.</div>
  <div class="topic-nav" id="nav-parallelism"></div>
</div>`;
}

function buildCadence() {
  return `<div class="topic" id="cadence">
  <div class="topic-header"><div class="topic-meta"><div class="topic-num">25 — Musical Structures</div><h2><em>Cadence</em></h2></div><span class="topic-badge">Natural Rhythm</span></div>
  <p class="sub">// The rhythm of natural speech — neither meter nor chaos</p>
  <p class="prose"><strong>Cadence</strong> is the natural rise and fall of the speaking voice — the rhythm that remains when meter is removed. Free verse relies on cadence: the voice rises toward emphasis and falls toward rest. Biblical poetry, Whitman, and modern free verse all build on cadential rhythm.</p>
  <div class="fb"><div class="fm">Rising cadence → climax / Falling cadence → rest</div><div class="fd"><span>Not meter:</span> no fixed pattern. <span>Not random:</span> shaped by breath and syntax.</div></div>
  <div class="va"><div class="vl">// Cadence — natural speech rhythm waves</div><canvas id="cadenceCanvas" height="220"></canvas></div>
  <div class="callout info"><strong>Key insight:</strong> Cadence is what separates free verse from prose — the poet shapes the natural speech rhythm into patterns that carry emotional meaning, even without meter.</div>
  <div class="topic-nav" id="nav-cadence"></div>
</div>`;
}
