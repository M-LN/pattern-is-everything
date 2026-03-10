/* ═══════════════════════════════════════════════════════════════
   Sound & Meter — Canvas Visualizations
   25 interactive DRAWS for meter, rhyme & sound devices
   ═══════════════════════════════════════════════════════════════ */

function setupCanvas(id) {
  const c = document.getElementById(id); if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const r = c.getBoundingClientRect();
  c.width = r.width * dpr; c.height = r.height * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  c.style.width = r.width + 'px'; c.style.height = r.height + 'px';
  return { ctx, w: r.width, h: r.height };
}

function getColor(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}

const DRAWS = {
/* ── 01 Iambic Pentameter ──────────────────────────────── */
'iambic-pentameter': function() {
  const s = setupCanvas('iambicCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const labels = ['Regular','Trochaic sub','Spondaic sub','Pyrrhic sub'];
  const patterns = [
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,0,1,0,1,0,1,0,1],
    [1,1,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,1,0,1]
  ];
  const sl = document.getElementById('iambVar');
  function draw() {
    const v = sl ? parseInt(sl.value) : 0;
    ctx.clearRect(0,0,w,h);
    const accent = getColor('--accent4');
    const muted = getColor('--muted');
    const fg = getColor('--fg');
    ctx.font = '13px IBM Plex Mono';
    ctx.fillStyle = fg;
    ctx.fillText(labels[v], 16, 24);
    const pat = patterns[v];
    const bw = (w - 60) / 10;
    for (let i = 0; i < 10; i++) {
      const x = 30 + i * bw;
      const stressed = pat[i];
      const bh = stressed ? 140 : 50;
      const y = 180 - bh;
      ctx.fillStyle = stressed ? accent : muted;
      ctx.globalAlpha = stressed ? 1 : 0.4;
      ctx.beginPath();
      ctx.roundRect(x + 4, y, bw - 8, bh, 6);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = fg;
      ctx.font = '11px IBM Plex Mono';
      ctx.textAlign = 'center';
      ctx.fillText(stressed ? '/' : '◡', x + bw/2, 204);
      ctx.fillText(String(i+1), x + bw/2, 224);
    }
    ctx.textAlign = 'start';
    if (sl) {
      const vd = document.getElementById('iambVarV');
      if (vd) vd.textContent = labels[v];
    }
  }
  draw();
  if (sl) sl.addEventListener('input', draw);
},

/* ── 02 Trochaic Meter ──────────────────────────────────── */
'trochaic-meter': function() {
  const s = setupCanvas('trochaicCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const muted = getColor('--muted');
  const fg = getColor('--fg');
  const pat = [1,0,1,0,1,0,1,0]; // 4 trochees
  const bw = (w - 60) / 8;
  for (let i = 0; i < 8; i++) {
    const x = 30 + i * bw;
    const stressed = pat[i];
    const bh = stressed ? 120 : 40;
    const y = 160 - bh;
    ctx.fillStyle = stressed ? accent : muted;
    ctx.globalAlpha = stressed ? 1 : 0.35;
    ctx.beginPath(); ctx.roundRect(x+4, y, bw-8, bh, 6); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(stressed ? '/' : '◡', x + bw/2, 180);
    if (i % 2 === 0) {
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.moveTo(x, 190); ctx.lineTo(x + bw*2, 190); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.font = '10px IBM Plex Mono'; ctx.fillStyle = muted;
      ctx.fillText('foot ' + (i/2+1), x + bw, 206);
    }
  }
  ctx.textAlign = 'start';
},

/* ── 03 Anapestic Meter ─────────────────────────────────── */
'anapestic-meter': function() {
  const s = setupCanvas('anapesticCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const muted = getColor('--muted');
  const fg = getColor('--fg');
  const pat = [0,0,1, 0,0,1, 0,0,1, 0,0,1];
  const bw = (w - 60) / 12;
  for (let i = 0; i < 12; i++) {
    const x = 30 + i * bw;
    const stressed = pat[i];
    const bh = stressed ? 120 : 35;
    const y = 160 - bh;
    ctx.fillStyle = stressed ? accent : muted;
    ctx.globalAlpha = stressed ? 1 : 0.3;
    ctx.beginPath(); ctx.roundRect(x+3, y, bw-6, bh, 5); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg; ctx.font = '11px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(stressed ? '/' : '◡', x + bw/2, 178);
  }
  ctx.font = '10px IBM Plex Mono'; ctx.fillStyle = muted;
  for (let f = 0; f < 4; f++) {
    ctx.fillText('foot ' + (f+1), 30 + f*3*bw + 1.5*bw, 200);
  }
  ctx.textAlign = 'start';
},

/* ── 04 Dactylic Meter ──────────────────────────────────── */
'dactylic-meter': function() {
  const s = setupCanvas('dactylicCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const muted = getColor('--muted');
  const fg = getColor('--fg');
  const pat = [1,0,0, 1,0,0, 1,0,0, 1,0,0];
  const bw = (w - 60) / 12;
  for (let i = 0; i < 12; i++) {
    const x = 30 + i * bw;
    const stressed = pat[i];
    const bh = stressed ? 120 : 35;
    const y = 160 - bh;
    ctx.fillStyle = stressed ? accent : muted;
    ctx.globalAlpha = stressed ? 1 : 0.3;
    ctx.beginPath(); ctx.roundRect(x+3, y, bw-6, bh, 5); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg; ctx.font = '11px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(stressed ? '/' : '◡', x + bw/2, 178);
  }
  ctx.font = '10px IBM Plex Mono'; ctx.fillStyle = muted;
  for (let f = 0; f < 4; f++) {
    ctx.fillText('foot ' + (f+1), 30 + f*3*bw + 1.5*bw, 200);
  }
  ctx.textAlign = 'start';
},

/* ── 05 Spondee & Pyrrhic ───────────────────────────────── */
'spondee-pyrrhic': function() {
  const s = setupCanvas('spondeePyrrhicCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const muted = getColor('--muted');
  const fg = getColor('--fg');
  const half = w / 2;
  // Spondee side
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('SPONDEE  / /', 30, 24);
  for (let i = 0; i < 2; i++) {
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.roundRect(40 + i * 80, 44, 60, 120, 8); ctx.fill();
  }
  ctx.fillStyle = fg; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('HEART', 52, 180); ctx.fillText('BREAK', 132, 180);
  // Pyrrhic side
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('PYRRHIC  ◡ ◡', half + 20, 24);
  for (let i = 0; i < 2; i++) {
    ctx.fillStyle = muted; ctx.globalAlpha = 0.35;
    ctx.beginPath(); ctx.roundRect(half + 30 + i * 80, 124, 60, 40, 8); ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = muted; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('of', half + 52, 180); ctx.fillText('the', half + 130, 180);
},

/* ── 06 Perfect Rhyme ───────────────────────────────────── */
'perfect-rhyme': function() {
  const s = setupCanvas('perfectRhymeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const pairs = [['c','at','h','at'],['m','oon','J','une'],['d','esire','f','ire']];
  const y0 = 30;
  pairs.forEach((p, pi) => {
    const y = y0 + pi * 62;
    ctx.font = '18px IBM Plex Mono';
    // Word 1
    ctx.fillStyle = muted; ctx.fillText(p[0], 40, y + 30);
    const w1 = ctx.measureText(p[0]).width;
    ctx.fillStyle = accent; ctx.fillText(p[1], 40 + w1, y + 30);
    // Arrow
    ctx.fillStyle = muted; ctx.font = '14px IBM Plex Mono';
    ctx.fillText('↔', 180, y + 30);
    // Word 2
    ctx.font = '18px IBM Plex Mono';
    ctx.fillStyle = muted; ctx.fillText(p[2], 220, y + 30);
    const w2 = ctx.measureText(p[2]).width;
    ctx.fillStyle = accent; ctx.fillText(p[3], 220 + w2, y + 30);
    // Match indicator
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.roundRect(40 + w1 - 4, y + 6, ctx.measureText(p[1]).width + 8, 32, 4); ctx.fill();
    ctx.beginPath(); ctx.roundRect(220 + w2 - 4, y + 6, ctx.measureText(p[3]).width + 8, 32, 4); ctx.fill();
    ctx.globalAlpha = 1;
  });
},

/* ── 07 Slant Rhyme ─────────────────────────────────────── */
'slant-rhyme': function() {
  const s = setupCanvas('slantRhymeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const pairs = [['moon','bone','shared -n'],['heart','hurt','shared h-rt'],['time','team','shared t-m']];
  pairs.forEach((p, i) => {
    const y = 30 + i * 60;
    ctx.font = '16px IBM Plex Mono'; ctx.fillStyle = fg;
    ctx.fillText(p[0], 40, y + 24);
    ctx.fillStyle = muted; ctx.font = '13px IBM Plex Mono';
    ctx.fillText('≈', 130, y + 24);
    ctx.font = '16px IBM Plex Mono'; ctx.fillStyle = fg;
    ctx.fillText(p[1], 160, y + 24);
    // Partial overlap bar
    ctx.fillStyle = accent; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.roundRect(260, y + 8, 120, 22, 4); ctx.fill();
    ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.roundRect(260, y + 8, 200, 22, 4); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono';
    ctx.fillText(p[2], 270, y + 24);
  });
},

/* ── 08 Eye Rhyme ───────────────────────────────────────── */
'eye-rhyme': function() {
  const s = setupCanvas('eyeRhymeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const pairs = [['love','move','ove'],['cough','through','ough'],['wind','find','ind']];
  pairs.forEach((p, i) => {
    const y = 20 + i * 56;
    ctx.font = '16px IBM Plex Mono'; ctx.fillStyle = fg;
    ctx.fillText(p[0], 40, y + 24);
    ctx.fillStyle = muted; ctx.font = '13px IBM Plex Mono';
    ctx.fillText('👁 ≠ 👂', 120, y + 24);
    ctx.font = '16px IBM Plex Mono'; ctx.fillStyle = fg;
    ctx.fillText(p[1], 220, y + 24);
    ctx.font = '11px IBM Plex Mono'; ctx.fillStyle = accent;
    ctx.fillText('-' + p[2] + ' (same spelling, different sound)', 310, y + 24);
  });
},

/* ── 09 Internal Rhyme ──────────────────────────────────── */
'internal-rhyme': function() {
  const s = setupCanvas('internalRhymeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const line = 'Once upon a midnight dreary, while I pondered, weak and weary';
  ctx.font = '12px IBM Plex Mono'; ctx.fillStyle = fg;
  ctx.fillText(line, 20, 40);
  // Highlight rhyming words
  const words = [{ text:'dreary', x:218 }, { text:'weary', x:460 }];
  ctx.fillStyle = accent; ctx.globalAlpha = 0.2;
  words.forEach(w => {
    ctx.beginPath(); ctx.roundRect(w.x, 24, 52, 22, 4); ctx.fill();
  });
  ctx.globalAlpha = 1;
  // Draw connecting arc
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.setLineDash([4,4]);
  ctx.beginPath();
  ctx.moveTo(244, 48); ctx.quadraticCurveTo(350, 110, 486, 48);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('internal rhyme', 320, 100);
  // End rhyme comparison
  ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('End rhyme:      line 1 end ↔ line 2 end', 20, 150);
  ctx.fillText('Internal rhyme: mid-line ↔ end (or mid ↔ mid)', 20, 175);
  ctx.fillStyle = accent;
  ctx.fillText('(shown above: leonine — mid + end of same line)', 20, 200);
},

/* ── 10 Feminine & Masculine Rhyme ──────────────────────── */
'feminine-masculine': function() {
  const s = setupCanvas('femMascCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  // Masculine
  ctx.font = '13px IBM Plex Mono'; ctx.fillStyle = fg;
  ctx.fillText('MASCULINE (single)', 20, 28);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.roundRect(20, 40, 80, 60, 6); ctx.fill();
  ctx.beginPath(); ctx.roundRect(130, 40, 80, 60, 6); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = '16px IBM Plex Mono';
  ctx.fillText('NIGHT', 30, 76); ctx.fillText('LIGHT', 140, 76);
  // Feminine
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('FEMININE (double)', 20, 136);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.roundRect(20, 148, 80, 50, 6); ctx.fill();
  ctx.fillStyle = muted; ctx.globalAlpha = 0.4;
  ctx.beginPath(); ctx.roundRect(100, 148, 40, 50, 6); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.roundRect(180, 148, 80, 50, 6); ctx.fill();
  ctx.fillStyle = muted; ctx.globalAlpha = 0.4;
  ctx.beginPath(); ctx.roundRect(260, 148, 40, 50, 6); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#fff'; ctx.font = '14px IBM Plex Mono';
  ctx.fillText('END', 35, 178); ctx.fillText('ing', 106, 178);
  ctx.fillText('BEND', 192, 178); ctx.fillText('ing', 266, 178);
},

/* ── 11 Alliteration ────────────────────────────────────── */
'alliteration': function() {
  const s = setupCanvas('alliterationCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const words = ['Peter','Piper','picked','a','peck','of','pickled','peppers'];
  const highlighted = [0,1,2,4,6,7];
  let x = 20;
  ctx.font = '16px IBM Plex Mono';
  words.forEach((word, i) => {
    const isH = highlighted.includes(i);
    if (isH) {
      ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
      ctx.beginPath(); ctx.roundRect(x - 4, 50, ctx.measureText(word).width + 8, 30, 4); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = isH ? accent : fg;
    ctx.fillText(word, x, 72);
    x += ctx.measureText(word).width + 14;
  });
  // Draw connecting arcs
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.setLineDash([3,3]);
  ctx.beginPath();
  ctx.moveTo(30, 48); ctx.quadraticCurveTo(w/2, -10, x - 50, 48);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('All highlighted words share the initial /p/ sound', 20, 120);
  ctx.fillStyle = muted; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('Note: "a" and "of" are unstressed — alliteration focuses on stressed syllables', 20, 150);
  const muted2 = getColor('--muted');
},

/* ── 12 Assonance ───────────────────────────────────────── */
'assonance': function() {
  const s = setupCanvas('assonanceCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const phrase = 'fleet feet sweep the street';
  const vowelPos = [[2,3],[6,7],[12,13],[20,21]]; // positions of 'ee' sounds
  ctx.font = '20px IBM Plex Mono'; ctx.fillStyle = fg;
  ctx.fillText(phrase, 30, 60);
  // Highlight vowels
  ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
  const charW = ctx.measureText('a').width;
  vowelPos.forEach(([start]) => {
    ctx.beginPath(); ctx.roundRect(30 + start * charW - 2, 38, charW * 2 + 4, 30, 4); ctx.fill();
  });
  ctx.globalAlpha = 1;
  // Vowel spectrum
  ctx.font = '12px IBM Plex Mono'; ctx.fillStyle = fg;
  ctx.fillText('Vowel Spectrum:', 30, 110);
  const vowels = ['ee (bright)','ay (open)','ah (warm)','oh (round)','oo (dark)'];
  const colors = ['#e8435a','#e8a033','#c84b2f','#8b4fa8','#2955a0'];
  vowels.forEach((v, i) => {
    ctx.fillStyle = colors[i];
    ctx.beginPath(); ctx.roundRect(30 + i * 95, 124, 85, 28, 6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '10px IBM Plex Mono';
    ctx.fillText(v, 36 + i * 95, 142);
  });
  ctx.fillStyle = muted; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('High vowels feel bright; low vowels feel dark', 30, 180);
},

/* ── 13 Consonance ──────────────────────────────────────── */
'consonance': function() {
  const s = setupCanvas('consonanceCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const examples = [
    { phrase:'pitter patter', shared:'t-r' },
    { phrase:'odds and ends', shared:'d-s' },
    { phrase:'struts and frets', shared:'ts' }
  ];
  examples.forEach((ex, i) => {
    const y = 20 + i * 62;
    ctx.font = '16px IBM Plex Mono'; ctx.fillStyle = fg;
    ctx.fillText(ex.phrase, 30, y + 24);
    ctx.fillStyle = accent; ctx.font = '12px IBM Plex Mono';
    ctx.fillText('shared: ' + ex.shared, 280, y + 24);
    ctx.strokeStyle = accent; ctx.globalAlpha = 0.3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(30, y + 34); ctx.lineTo(400, y + 34); ctx.stroke();
    ctx.globalAlpha = 1;
  });
  ctx.fillStyle = muted; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('Consonance focuses on consonant sounds anywhere in the word', 30, 210);
},

/* ── 14 Onomatopoeia ────────────────────────────────────── */
'onomatopoeia': function() {
  const s = setupCanvas('onomatopoeiaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const words = [
    { word:'BUZZ', size:22, x:40, y:50 },
    { word:'HISS', size:18, x:160, y:40 },
    { word:'CRASH', size:26, x:270, y:60 },
    { word:'murmur', size:14, x:60, y:110 },
    { word:'SPLASH', size:20, x:170, y:120 },
    { word:'rustle', size:13, x:320, y:100 },
    { word:'BOOM', size:28, x:100, y:170 },
    { word:'sizzle', size:16, x:260, y:170 },
  ];
  words.forEach(w => {
    ctx.font = w.size + 'px IBM Plex Mono';
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    ctx.fillText(w.word, w.x, w.y);
  });
  ctx.globalAlpha = 1;
},

/* ── 15 Euphony & Cacophony ─────────────────────────────── */
'euphony-cacophony': function() {
  const s = setupCanvas('euphCacCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const half = w / 2;
  // Euphony - smooth wave
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('EUPHONY', 20, 24);
  ctx.strokeStyle = accent; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 20; x < half - 20; x++) {
    const y = 90 + Math.sin((x - 20) * 0.04) * 30;
    x === 20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('l, m, n, r + open vowels', 20, 150);
  ctx.fillText('"mellow fruitfulness"', 20, 170);
  // Cacophony - jagged wave
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('CACOPHONY', half + 10, 24);
  ctx.strokeStyle = '#c84b2f'; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = half + 10; x < w - 10; x++) {
    const y = 90 + (Math.random() - 0.5) * 60;
    x === half + 10 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = '#c84b2f'; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('k, t, p, g + clusters', half + 10, 150);
  ctx.fillText('"black crack of blood"', half + 10, 170);
  // Labels
  ctx.fillStyle = muted; ctx.font = '10px IBM Plex Mono';
  ctx.fillText('smooth, flowing → beauty', 20, 200);
  ctx.fillText('harsh, jagged → violence', half + 10, 200);
},

/* ── 16 Caesura ─────────────────────────────────────────── */
'caesura': function() {
  const s = setupCanvas('caesuraCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const examples = [
    { text:'To be, or not to be:', pause:0.48, label:'medial' },
    { text:'Stop. Look. Listen.', pause:0.15, label:'initial' },
    { text:'The world goes on —', pause:0.82, label:'terminal' },
  ];
  examples.forEach((ex, i) => {
    const y = 20 + i * 60;
    const lineW = w - 60;
    // Draw line
    ctx.fillStyle = accent; ctx.globalAlpha = 0.3;
    ctx.beginPath(); ctx.roundRect(30, y + 15, lineW, 24, 4); ctx.fill();
    ctx.globalAlpha = 1;
    // Draw caesura break
    const cx = 30 + lineW * ex.pause;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.roundRect(cx - 3, y + 10, 6, 34, 2); ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, y + 6); ctx.lineTo(cx, y + 48); ctx.stroke();
    ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
    ctx.fillText(ex.text, 34, y + 32);
    ctx.fillStyle = accent; ctx.font = '10px IBM Plex Mono';
    ctx.fillText('‖ ' + ex.label, cx + 10, y + 8);
  });
},

/* ── 17 Enjambment ──────────────────────────────────────── */
'enjambment': function() {
  const s = setupCanvas('enjambmentCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  // Enjambed lines
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('ENJAMBED:', 20, 24);
  const enjLines = ['I am not yet','born; O hear me.','Let not the','bloodsucking bat come near me.'];
  enjLines.forEach((line, i) => {
    const y = 40 + i * 26;
    ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
    ctx.fillText(line, 40, y + 16);
    if (i < 3 && i % 2 === 0) {
      ctx.strokeStyle = accent; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40 + ctx.measureText(line).width + 5, y + 10);
      ctx.quadraticCurveTo(40 + ctx.measureText(line).width + 20, y + 26, 40, y + 36);
      ctx.stroke();
    }
  });
  // End-stopped comparison
  ctx.fillStyle = fg; ctx.font = '13px IBM Plex Mono';
  ctx.fillText('END-STOPPED:', w/2 + 20, 24);
  const esLines = ['True wit is nature dressed,','What oft was thought expressed.'];
  esLines.forEach((line, i) => {
    const y = 44 + i * 30;
    ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
    ctx.fillText(line, w/2 + 40, y + 16);
    ctx.fillStyle = muted; ctx.fillText('⏸', w/2 + 40 + ctx.measureText(line).width + 6, y + 16);
  });
  ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('→ flows across break', 20, 180);
  ctx.fillStyle = muted;
  ctx.fillText('⏸ pauses at break', w/2 + 20, 180);
},

/* ── 18 End-Stopped Lines ───────────────────────────────── */
'end-stopped': function() {
  const s = setupCanvas('endStoppedCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const lines = [
    'True wit is nature to advantage dressed,',
    'What oft was thought, but ne\'er so well expressed.',
    'Something whose truth convinced at sight we find,',
    'That gives us back the image of our mind.'
  ];
  lines.forEach((line, i) => {
    const y = 20 + i * 40;
    ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
    ctx.fillText(line, 20, y + 20);
    // End marker
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(w - 30, y + 16, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '10px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(i % 2 === 0 ? ',' : '.', w - 30, y + 20);
    ctx.textAlign = 'start';
  });
},

/* ── 19 Syncopation ─────────────────────────────────────── */
'syncopation': function() {
  const s = setupCanvas('syncopationCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const bw = (w - 60) / 8;
  // Regular
  ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('Regular:', 10, 20);
  const regular = [0,1,0,1,0,1,0,1];
  regular.forEach((s2, i) => {
    const x = 30 + i * bw;
    ctx.fillStyle = s2 ? accent : muted;
    ctx.globalAlpha = s2 ? 1 : 0.3;
    ctx.beginPath(); ctx.roundRect(x+3, 30, bw-6, s2 ? 50 : 20, 4); ctx.fill();
    ctx.globalAlpha = 1;
  });
  // Syncopated
  ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('Syncopated:', 10, 110);
  const syncopated = [0,1,1,0,0,1,0,1];
  syncopated.forEach((s2, i) => {
    const x = 30 + i * bw;
    const unexpected = (i === 2 || i === 3);
    ctx.fillStyle = unexpected ? '#c84b2f' : (s2 ? accent : muted);
    ctx.globalAlpha = s2 ? 1 : 0.3;
    ctx.beginPath(); ctx.roundRect(x+3, 120, bw-6, s2 ? 50 : 20, 4); ctx.fill();
    ctx.globalAlpha = 1;
  });
  ctx.fillStyle = '#c84b2f'; ctx.font = '10px IBM Plex Mono';
  ctx.fillText('↑ unexpected stress shifts', 30 + 2*bw, 190);
},

/* ── 20 Sprung Rhythm ───────────────────────────────────── */
'sprung-rhythm': function() {
  const s = setupCanvas('sprungCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  // Show stresses as pillars with variable gaps
  const stresses = [
    { x:40, label:'WORLD' },
    { x:120, label:'CHARGED' },
    { x:260, label:'GRAN-' },
    { x:380, label:'GOD' },
  ];
  stresses.forEach(s2 => {
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.roundRect(s2.x, 30, 60, 100, 6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '12px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(s2.label, s2.x + 30, 86);
    ctx.textAlign = 'start';
  });
  // Unstressed between (variable count)
  ctx.fillStyle = muted; ctx.globalAlpha = 0.3;
  const unstressed = [[80,3],[170,5],[340,1]]; // [start x, count]
  unstressed.forEach(([sx, count]) => {
    for (let i = 0; i < count; i++) {
      ctx.beginPath(); ctx.roundRect(sx + i*14, 105, 10, 25, 3); ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('"The WORLD is CHARGED with the GRAN-deur of GOD"', 20, 165);
  ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('4 stresses · variable unstressed syllables between', 20, 190);
},

/* ── 21 Refrain ─────────────────────────────────────────── */
'refrain': function() {
  const s = setupCanvas('refrainCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const stanzas = ['Stanza 1','Stanza 2','Stanza 3','Stanza 4'];
  const refText = '"Do not go gentle…"';
  const sw = (w - 80) / 4;
  stanzas.forEach((st, i) => {
    const x = 40 + i * sw;
    // Stanza block
    ctx.fillStyle = muted; ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.roundRect(x, 20, sw - 16, 100, 6); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = fg; ctx.font = '11px IBM Plex Mono'; ctx.textAlign = 'center';
    ctx.fillText(st, x + (sw-16)/2, 70);
    // Refrain bar
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.roundRect(x, 130, sw - 16, 34, 6); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '10px IBM Plex Mono';
    ctx.fillText('REFRAIN', x + (sw-16)/2, 152);
    ctx.textAlign = 'start';
  });
  // Connecting line through refrains
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(40, 147); ctx.lineTo(w - 40, 147); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = '11px IBM Plex Mono'; ctx.textAlign = 'center';
  ctx.fillText(refText, w/2, 195);
  ctx.fillStyle = muted; ctx.font = '10px IBM Plex Mono';
  ctx.fillText('same words, shifting meaning with each return', w/2, 215);
  ctx.textAlign = 'start';
},

/* ── 22 Anaphora ────────────────────────────────────────── */
'anaphora': function() {
  const s = setupCanvas('anaphoraCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const lines = [
    'I have a dream that one day…',
    'I have a dream that my children…',
    'I have a dream that one day…',
    'I have a dream today!'
  ];
  lines.forEach((line, i) => {
    const y = 20 + i * 44;
    // Highlight beginning
    ctx.fillStyle = accent; ctx.globalAlpha = 0.2;
    ctx.beginPath(); ctx.roundRect(20, y + 2, 130, 28, 4); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent; ctx.font = '13px IBM Plex Mono';
    ctx.fillText('I have a dream', 24, y + 22);
    ctx.fillStyle = fg;
    ctx.fillText(line.slice(14), 24 + ctx.measureText('I have a dream').width, y + 22);
  });
  ctx.fillStyle = muted; ctx.font = '10px IBM Plex Mono';
  ctx.fillText('← same words launch each line', 160, 205);
},

/* ── 23 Epistrophe ──────────────────────────────────────── */
'epistrophe': function() {
  const s = setupCanvas('epistropheCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const lines = [
    '…of the people',
    '…by the people',
    '…for the people'
  ];
  lines.forEach((line, i) => {
    const y = 30 + i * 56;
    ctx.font = '14px IBM Plex Mono'; ctx.fillStyle = fg;
    const prefix = line.slice(0, line.length - 10);
    ctx.fillText(prefix, 40, y + 20);
    const px = 40 + ctx.measureText(prefix).width;
    ctx.fillStyle = accent; ctx.globalAlpha = 0.2;
    ctx.beginPath(); ctx.roundRect(px - 4, y + 2, 110, 28, 4); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.fillText('the people', px, y + 20);
  });
  ctx.fillStyle = getColor('--muted'); ctx.font = '10px IBM Plex Mono';
  ctx.fillText('same words close each line →', 40, 205);
},

/* ── 24 Parallelism ─────────────────────────────────────── */
'parallelism': function() {
  const s = setupCanvas('parallelismCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  const structures = [
    { pattern:'To ______ is ______', example:'To err is human' },
    { pattern:'To ______ is ______', example:'To forgive, divine' },
  ];
  structures.forEach((s2, i) => {
    const y = 20 + i * 80;
    // Pattern template
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
    ctx.beginPath(); ctx.roundRect(20, y, w - 40, 30, 6); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent; ctx.font = '12px IBM Plex Mono';
    ctx.fillText(s2.pattern, 30, y + 20);
    // Example
    ctx.fillStyle = fg; ctx.font = '14px IBM Plex Mono';
    ctx.fillText(s2.example, 30, y + 56);
  });
  ctx.fillStyle = muted; ctx.font = '11px IBM Plex Mono';
  ctx.fillText('Same structure → different content → rhythm through syntax', 20, 200);
},

/* ── 25 Cadence ─────────────────────────────────────────── */
'cadence': function() {
  const s = setupCanvas('cadenceCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4');
  const fg = getColor('--fg');
  const muted = getColor('--muted');
  // Draw natural speech wave
  ctx.strokeStyle = accent; ctx.lineWidth = 3;
  ctx.beginPath();
  const points = [
    [20,100],[60,70],[100,80],[140,50],[180,60],[220,40],[260,90],[300,110],
    [340,80],[380,60],[420,70],[460,100]
  ];
  points.forEach(([x,y], i) => i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y));
  ctx.stroke();
  // Labels
  ctx.fillStyle = accent; ctx.font = '10px IBM Plex Mono';
  ctx.fillText('rising', 130, 34);
  ctx.fillText('falling', 280, 120);
  ctx.fillText('rising', 370, 54);
  // Breath markers
  ctx.fillStyle = muted; ctx.globalAlpha = 0.5;
  [140, 300].forEach(x => {
    ctx.beginPath(); ctx.arc(x, 140, 3, 0, Math.PI*2); ctx.fill();
    ctx.font = '9px IBM Plex Mono'; ctx.fillText('breath', x - 14, 158);
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = fg; ctx.font = '12px IBM Plex Mono';
  ctx.fillText('Natural speech rhythm — not meter, but shaped by breath and syntax', 20, 195);
},

};
