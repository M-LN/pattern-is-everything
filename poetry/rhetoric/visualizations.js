/* ═══════════════════════════════════════════════════════════════
   Rhetoric & Figures — Interactive Visualizations
   25 canvas-based DRAWS + helper utilities
   ═══════════════════════════════════════════════════════════════ */

function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, rect.width, rect.height);
  return { ctx, w: rect.width, h: rect.height };
}

function getColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const DRAWS = {
/* ─────────── 01 Metaphor ─────────── */
metaphor(canvas) {
  const s = setupCanvas('metaphorCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Tenor circle
  ctx.beginPath(); ctx.arc(w*0.25, h*0.5, 50, 0, Math.PI*2);
  ctx.fillStyle = accent + '30'; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '13px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('TENOR', w*0.25, h*0.5-5); ctx.fillText('"Life"', w*0.25, h*0.5+15);
  // Vehicle circle
  ctx.beginPath(); ctx.arc(w*0.75, h*0.5, 50, 0, Math.PI*2);
  ctx.fillStyle = accent + '30'; ctx.fill();
  ctx.strokeStyle = accent; ctx.stroke();
  ctx.fillText('VEHICLE', w*0.75, h*0.5-5); ctx.fillText('"Journey"', w*0.75, h*0.5+15);
  // Arrow IS
  ctx.beginPath(); ctx.moveTo(w*0.25+55, h*0.5); ctx.lineTo(w*0.75-55, h*0.5);
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.75-55, h*0.5); ctx.lineTo(w*0.75-65, h*0.5-6); ctx.lineTo(w*0.75-65, h*0.5+6); ctx.closePath();
  ctx.fillStyle = fg; ctx.fill();
  ctx.fillStyle = accent; ctx.font = 'bold 14px Inter,sans-serif';
  ctx.fillText('IS', w*0.5, h*0.5-8);
  ctx.fillStyle = muted; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('(identity, not similarity)', w*0.5, h*0.5+12);
  ctx.fillText('"Life IS a journey"', w*0.5, h*0.12);
},

/* ─────────── 02 Simile ─────────── */
simile(canvas) {
  const s = setupCanvas('simileCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  // Thing A
  ctx.beginPath(); ctx.arc(w*0.25, h*0.5, 40, 0, Math.PI*2);
  ctx.fillStyle = accent + '25'; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Love', w*0.25, h*0.5+4);
  // Thing B
  ctx.beginPath(); ctx.arc(w*0.75, h*0.5, 40, 0, Math.PI*2);
  ctx.fillStyle = accent2 + '25'; ctx.fill();
  ctx.strokeStyle = accent2; ctx.stroke();
  ctx.fillText('Red Rose', w*0.75, h*0.5+4);
  // Dashed bridge with LIKE
  ctx.setLineDash([6,4]);
  ctx.beginPath(); ctx.moveTo(w*0.25+45, h*0.5); ctx.lineTo(w*0.75-45, h*0.5);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = 'bold 13px Inter,sans-serif';
  ctx.fillText('LIKE', w*0.5, h*0.5-8);
  ctx.fillStyle = getColor('--muted') || '#666'; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('(distance maintained)', w*0.5, h*0.5+14);
  ctx.fillText('"My love is like a red red rose"', w*0.5, h*0.12);
},

/* ─────────── 03 Analogy ─────────── */
analogy(canvas) {
  const s = setupCanvas('analogyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent3 = getColor('--accent3') || '#2955a0';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pairs = [
    { a:'Electron', b:'Nucleus', c:'Planet', d:'Sun' },
  ];
  // Domain A (left)
  ctx.fillStyle = accent + '20';
  ctx.fillRect(20, 30, w*0.42, h-60);
  ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.strokeRect(20, 30, w*0.42, h-60);
  ctx.fillStyle = fg; ctx.font = 'bold 12px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('FAMILIAR DOMAIN', 20+w*0.21, 22);
  // Domain B (right)
  ctx.fillStyle = accent3 + '20';
  ctx.fillRect(w*0.58, 30, w*0.42-20, h-60);
  ctx.strokeStyle = accent3; ctx.strokeRect(w*0.58, 30, w*0.42-20, h-60);
  ctx.fillText('TARGET DOMAIN', w*0.58+(w*0.42-20)/2, 22);
  // Items
  ctx.font = '13px Inter,sans-serif';
  const cx1 = 20+w*0.21, cx2 = w*0.58+(w*0.42-20)/2;
  ctx.fillStyle = fg;
  ctx.fillText('Planet', cx1, h*0.38); ctx.fillText('orbits', cx1, h*0.52); ctx.fillText('Sun', cx1, h*0.66);
  ctx.fillText('Electron', cx2, h*0.38); ctx.fillText('orbits', cx2, h*0.52); ctx.fillText('Nucleus', cx2, h*0.66);
  // Mapping arrows
  ctx.setLineDash([4,3]);
  [[h*0.38, h*0.38],[h*0.52, h*0.52],[h*0.66, h*0.66]].forEach(([y1,y2]) => {
    ctx.beginPath(); ctx.moveTo(20+w*0.42+5, y1-4); ctx.lineTo(w*0.58-5, y2-4);
    ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('structural mapping', w*0.5, h-10);
},

/* ─────────── 04 Conceit ─────────── */
conceit(canvas) {
  const s = setupCanvas('conceitCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Compass visual
  const cx = w*0.5, cy = h*0.55;
  // Fixed leg
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy-70);
  ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy-70, 5, 0, Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  // Moving leg
  const angle = Math.PI*0.25;
  const ex = cx + Math.sin(angle)*70, ey = cy - Math.cos(angle)*70;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey);
  ctx.strokeStyle = fg; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI*2);
  ctx.fillStyle = fg; ctx.fill();
  // Labels
  ctx.fillStyle = accent; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Fixed Foot', cx, cy-80);
  ctx.fillText('(Beloved stays)', cx-50, cy-60);
  ctx.fillStyle = fg;
  ctx.fillText('Moving Foot', ex+40, ey);
  ctx.fillText('(Lover travels)', ex+40, ey+14);
  // Hinge
  ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI*2);
  ctx.fillStyle = getColor('--accent') || '#c84b2f'; ctx.fill();
  // Title
  ctx.fillStyle = muted; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('Donne\'s compass conceit — sustained for 9 stanzas', w*0.5, 16);
  ctx.fillText('Unlikely comparison, elaborated completely', w*0.5, h-8);
},

/* ─────────── 05 Allegory ─────────── */
allegory(canvas) {
  const s = setupCanvas('allegoryCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent2') || '#2a7d5f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Two parallel tracks
  const y1 = h*0.32, y2 = h*0.68;
  ctx.fillStyle = fg; ctx.font = 'bold 11px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Surface Story:', 15, y1-25);
  ctx.fillText('Hidden Meaning:', 15, y2-25);
  const items = [
    ['Farm', 'Russia'], ['Pigs', 'Bolsheviks'], ['Napoleon', 'Stalin'], ['Windmill', 'Industrialization']
  ];
  const gap = (w-80) / items.length;
  items.forEach(([top, bot], i) => {
    const x = 40 + i*gap + gap/2;
    // Surface
    ctx.beginPath(); ctx.arc(x, y1, 22, 0, Math.PI*2);
    ctx.fillStyle = accent + '25'; ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(top, x, y1+4);
    // Hidden
    ctx.beginPath(); ctx.arc(x, y2, 22, 0, Math.PI*2);
    ctx.fillStyle = accent2 + '25'; ctx.fill();
    ctx.strokeStyle = accent2; ctx.stroke();
    ctx.fillText(bot, x, y2+4);
    // Mapping line
    ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(x, y1+25); ctx.lineTo(x, y2-25);
    ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke();
    ctx.setLineDash([]);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Animal Farm — every element has a symbolic counterpart', w*0.5, h-6);
},

/* ─────────── 06 Metonymy ─────────── */
metonymy(canvas) {
  const s = setupCanvas('metonymyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pairs = [
    ['Crown', '→', 'Monarchy'],
    ['Pen', '→', 'Writing'],
    ['Sword', '→', 'Military'],
    ['Washington', '→', 'U.S. Gov.'],
    ['Hollywood', '→', 'Film Industry'],
  ];
  ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
  pairs.forEach(([from, arrow, to], i) => {
    const y = 25 + i*(h-40)/pairs.length + 12;
    ctx.fillStyle = accent; ctx.fillText(from, w*0.22, y);
    ctx.fillStyle = muted; ctx.fillText(arrow, w*0.5, y);
    ctx.fillStyle = fg; ctx.fillText(to, w*0.78, y);
    // Connection line
    ctx.beginPath(); ctx.moveTo(w*0.32, y-4); ctx.lineTo(w*0.45, y-4);
    ctx.strokeStyle = accent + '50'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w*0.55, y-4); ctx.lineTo(w*0.65, y-4);
    ctx.stroke();
  });
  ctx.fillStyle = accent; ctx.font = 'bold 10px Inter,sans-serif';
  ctx.fillText('ASSOCIATED TERM', w*0.22, h-5);
  ctx.fillStyle = fg; ctx.fillText('ACTUAL MEANING', w*0.78, h-5);
},

/* ─────────── 07 Synecdoche ─────────── */
synecdoche(canvas) {
  const s = setupCanvas('synecdocheCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const cx = w*0.5, cy = h*0.5;
  // Whole circle
  ctx.beginPath(); ctx.arc(cx, cy, 65, 0, Math.PI*2);
  ctx.fillStyle = accent + '15'; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('WHOLE', cx, cy-50);
  ctx.fillText('(Sailor)', cx, cy-36);
  // Part circle inside
  ctx.beginPath(); ctx.arc(cx, cy+15, 28, 0, Math.PI*2);
  ctx.fillStyle = accent + '40'; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = 'bold 12px Inter,sans-serif';
  ctx.fillText('PART', cx, cy+12);
  ctx.font = '11px Inter,sans-serif';
  ctx.fillText('"Hands"', cx, cy+28);
  // Arrows
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('"All hands on deck" = All sailors on deck', cx, h-8);
  ctx.fillText('Part stands for Whole', cx+90, cy+15);
},

/* ─────────── 08 Personification ─────────── */
personification(canvas) {
  const s = setupCanvas('personificationCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const items = [
    { thing:'Death', action:'knocks', y:h*0.22 },
    { thing:'Time', action:'marches', y:h*0.44 },
    { thing:'Wind', action:'whispers', y:h*0.66 },
    { thing:'Justice', action:'is blind', y:h*0.88 },
  ];
  items.forEach(({thing, action, y}) => {
    // Non-human box
    ctx.fillStyle = accent + '20';
    ctx.fillRect(w*0.08, y-14, w*0.28, 28);
    ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.strokeRect(w*0.08, y-14, w*0.28, 28);
    ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(thing, w*0.22, y+4);
    // Arrow
    ctx.beginPath(); ctx.moveTo(w*0.38, y); ctx.lineTo(w*0.55, y);
    ctx.strokeStyle = muted; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w*0.55, y); ctx.lineTo(w*0.52, y-4); ctx.lineTo(w*0.52, y+4); ctx.closePath();
    ctx.fillStyle = muted; ctx.fill();
    // Human action
    ctx.fillStyle = accent; ctx.font = 'bold 12px Inter,sans-serif';
    ctx.fillText(action, w*0.72, y+4);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Non-human → human qualities', w*0.5, 10);
},

/* ─────────── 09 Apostrophe ─────────── */
apostrophe(canvas) {
  const s = setupCanvas('apostropheCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Speaker
  ctx.beginPath(); ctx.arc(w*0.2, h*0.5, 25, 0, Math.PI*2);
  ctx.fillStyle = accent + '30'; ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Speaker', w*0.2, h*0.5+4);
  // Speech arc toward absent entity
  ctx.beginPath();
  ctx.moveTo(w*0.2+30, h*0.5);
  ctx.quadraticCurveTo(w*0.5, h*0.15, w*0.8-25, h*0.5);
  ctx.setLineDash([5,4]);
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.setLineDash([]);
  // Absent entity (dashed)
  ctx.beginPath(); ctx.arc(w*0.8, h*0.5, 25, 0, Math.PI*2);
  ctx.setLineDash([4,4]);
  ctx.strokeStyle = muted; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('Absent /', w*0.8, h*0.5-4);
  ctx.fillText('Abstract', w*0.8, h*0.5+10);
  // Label
  ctx.fillStyle = accent; ctx.font = 'italic 12px Inter,sans-serif';
  ctx.fillText('"O Death, where is thy sting?"', w*0.5, h*0.18);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Addressing the impossible — as if it could hear', w*0.5, h-8);
},

/* ─────────── 10 Periphrasis ─────────── */
periphrasis(canvas) {
  const s = setupCanvas('periphrasislCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const examples = [
    { short:'Sea', long:'Whale-road' },
    { short:'King', long:'Ring-giver' },
    { short:'Shakespeare', long:'The Bard' },
    { short:'NYC', long:'The Big Apple' },
  ];
  const colW = w*0.35;
  ctx.font = 'bold 11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillStyle = muted; ctx.fillText('Direct Name', w*0.25, 16);
  ctx.fillText('Periphrasis', w*0.75, 16);
  examples.forEach(({short, long}, i) => {
    const y = 40 + i*38;
    ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif';
    ctx.fillText(short, w*0.25, y);
    ctx.fillStyle = accent; ctx.fillText(long, w*0.75, y);
    // Arrow
    ctx.beginPath(); ctx.moveTo(w*0.38, y-4); ctx.lineTo(w*0.58, y-4);
    ctx.strokeStyle = muted+'80'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w*0.58, y-4); ctx.lineTo(w*0.55, y-8); ctx.lineTo(w*0.55, y); ctx.closePath();
    ctx.fillStyle = muted; ctx.fill();
  });
},

/* ─────────── 11 Irony ─────────── */
irony(canvas) {
  const s = setupCanvas('ironyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent2') || '#2a7d5f';
  const accent3 = getColor('--accent3') || '#2955a0';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const types = [
    { name:'Verbal', desc:'Says ≠ Means', color:accent, example:'"Lovely weather" in a storm', y:h*0.22 },
    { name:'Dramatic', desc:'Audience > Character', color:accent2, example:'Oedipus hunts himself', y:h*0.50 },
    { name:'Situational', desc:'Expected ≠ Actual', color:accent3, example:'Fire station burns down', y:h*0.78 },
  ];
  types.forEach(({name, desc, color, example, y}) => {
    ctx.fillStyle = color+'20'; ctx.fillRect(20, y-20, w-40, 40);
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.strokeRect(20, y-20, w-40, 40);
    ctx.fillStyle = fg; ctx.font = 'bold 12px Inter,sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(name, 30, y-2);
    ctx.fillStyle = color; ctx.font = '11px Inter,sans-serif';
    ctx.fillText(desc, 120, y-2);
    ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
    ctx.fillText(example, 30, y+14);
  });
},

/* ─────────── 12 Oxymoron ─────────── */
oxymoron(canvas) {
  const s = setupCanvas('oxymoronCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pairs = [
    ['Bitter','Sweet'], ['Deafening','Silence'], ['Living','Dead'], ['Cruel','Kindness']
  ];
  const rowH = (h-30)/pairs.length;
  pairs.forEach(([a,b], i) => {
    const y = 20 + i*rowH + rowH/2;
    const cx = w*0.5;
    // Term A
    ctx.fillStyle = accent2; ctx.font = 'bold 13px Inter,sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(a, cx-20, y+4);
    // collision point
    ctx.beginPath(); ctx.arc(cx, y, 3, 0, Math.PI*2);
    ctx.fillStyle = fg; ctx.fill();
    // Term B
    ctx.fillStyle = accent; ctx.font = 'bold 13px Inter,sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(b, cx+20, y+4);
    // Spark lines
    for (let j = 0; j < 4; j++) {
      const ang = (j/4)*Math.PI*2 + i;
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(ang)*5, y+Math.sin(ang)*5);
      ctx.lineTo(cx+Math.cos(ang)*12, y+Math.sin(ang)*12);
      ctx.strokeStyle = fg+'60'; ctx.lineWidth = 1; ctx.stroke();
    }
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Opposites collide → new meaning sparks', w*0.5, h-5);
},

/* ─────────── 13 Paradox ─────────── */
paradox(canvas) {
  const s = setupCanvas('paradoxCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const cx = w*0.5, cy = h*0.5;
  // Contradiction layer
  ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI*2);
  ctx.fillStyle = accent+'15'; ctx.fill();
  ctx.strokeStyle = accent+'60'; ctx.lineWidth = 2; ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Apparent', cx, cy-35);
  ctx.fillText('Contradiction', cx, cy-22);
  // Truth core
  ctx.beginPath(); ctx.arc(cx, cy+10, 22, 0, Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Inter,sans-serif';
  ctx.fillText('TRUTH', cx, cy+14);
  // Examples
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('"Less is more"', cx, h-22);
  ctx.fillText('"I must be cruel to be kind"', cx, h-8);
},

/* ─────────── 14 Antithesis ─────────── */
antithesis(canvas) {
  const s = setupCanvas('antithesisCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const pairs = [
    ['best of times', 'worst of times'],
    ['one small step', 'one giant leap'],
    ['to be', 'not to be'],
  ];
  pairs.forEach(([a,b], i) => {
    const y = 30 + i*55;
    const mid = w*0.5;
    // Left
    ctx.fillStyle = accent+'20'; ctx.fillRect(20, y, mid-30, 36);
    ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.strokeRect(20, y, mid-30, 36);
    ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(a, 20+(mid-30)/2, y+22);
    // Right
    ctx.fillStyle = accent2+'20'; ctx.fillRect(mid+10, y, mid-30, 36);
    ctx.strokeStyle = accent2; ctx.strokeRect(mid+10, y, mid-30, 36);
    ctx.fillText(b, mid+10+(mid-30)/2, y+22);
    // Mirror symbol
    ctx.fillStyle = muted; ctx.font = '14px Inter,sans-serif';
    ctx.fillText('⟷', mid, y+22);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Parallel structure + opposing content', w*0.5, h-5);
},

/* ─────────── 15 Litotes ─────────── */
litotes(canvas) {
  const s = setupCanvas('litotesCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Scale from negative to positive
  const y = h*0.5;
  ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w-40, y);
  ctx.strokeStyle = muted; ctx.lineWidth = 2; ctx.stroke();
  // Markers
  const marks = [
    { x:w*0.15, label:'Bad', color:getColor('--accent')||'#c84b2f' },
    { x:w*0.5, label:'NOT Bad', color:accent },
    { x:w*0.85, label:'Good', color:getColor('--accent2')||'#2a7d5f' },
  ];
  marks.forEach(({x, label, color}) => {
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI*2);
    ctx.fillStyle = color; ctx.fill();
    ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(label, x, y-16);
  });
  // Arrow showing litotes meaning
  ctx.beginPath(); ctx.moveTo(w*0.5, y+20); ctx.quadraticCurveTo(w*0.67, y+40, w*0.85, y+20);
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('actually means →', w*0.67, y+42);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Litotes affirms by denying the negative', w*0.5, h-8);
},

/* ─────────── 16 Hyperbole ─────────── */
hyperbole(canvas) {
  const s = setupCanvas('hyperboleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Bar chart: reality vs. hyperbole
  const items = [
    { label:'Times told', real:3, hyper:100 },
    { label:'Wait time', real:10, hyper:90 },
    { label:'Weight', real:15, hyper:85 },
  ];
  const barW = 50, gap = (w - items.length*barW*2 - 40) / (items.length+1);
  items.forEach((item, i) => {
    const x = 30 + gap*(i+1) + i*barW*2;
    const maxH = h-60;
    // Reality bar
    const rH = (item.real/100)*maxH;
    ctx.fillStyle = muted+'60';
    ctx.fillRect(x, h-30-rH, barW-5, rH);
    // Hyperbole bar
    const hH = (item.hyper/100)*maxH;
    ctx.fillStyle = accent;
    ctx.fillRect(x+barW, h-30-hH, barW-5, hH);
    // Label
    ctx.fillStyle = fg; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(item.label, x+barW-2, h-16);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('■ Reality', 20, 14);
  ctx.fillStyle = accent; ctx.fillText('■ Hyperbole', 90, 14);
},

/* ─────────── 17 Understatement ─────────── */
understatement(canvas) {
  const s = setupCanvas('understatementCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const mid = w*0.5;
  // Hyperbole side (left)
  ctx.fillStyle = accent2+'20'; ctx.fillRect(10, 25, mid-20, h-50);
  ctx.strokeStyle = accent2; ctx.lineWidth = 1; ctx.strokeRect(10, 25, mid-20, h-50);
  ctx.fillStyle = fg; ctx.font = 'bold 11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('HYPERBOLE', mid/2, 18);
  ctx.font = '11px Inter,sans-serif';
  ctx.fillStyle = accent2; ctx.fillText('"A million times"', mid/2, h*0.42);
  ctx.fillText('"I died laughing"', mid/2, h*0.58);
  // Understatement side (right)
  ctx.fillStyle = accent+'20'; ctx.fillRect(mid+10, 25, mid-20, h-50);
  ctx.strokeStyle = accent; ctx.strokeRect(mid+10, 25, mid-20, h-50);
  ctx.fillStyle = fg; ctx.font = 'bold 11px Inter,sans-serif';
  ctx.fillText('UNDERSTATEMENT', mid+mid/2, 18);
  ctx.font = '11px Inter,sans-serif';
  ctx.fillStyle = accent; ctx.fillText('"It\'s just a scratch"', mid+mid/2, h*0.42);
  ctx.fillText('"A bit of a problem"', mid+mid/2, h*0.58);
  // Arrows
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('↑ amplifies', mid/2, h*0.74);
  ctx.fillText('↓ minimizes', mid+mid/2, h*0.74);
},

/* ─────────── 18 Climax ─────────── */
climax(canvas) {
  const s = setupCanvas('climaxCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const steps = ['I came', 'I saw', 'I conquered'];
  const stepW = (w-60) / steps.length;
  steps.forEach((text, i) => {
    const x = 30 + i*stepW;
    const barH = (i+1) * ((h-60)/steps.length);
    const y = h - 30 - barH;
    ctx.fillStyle = accent + (30 + i*25).toString(16).padStart(2,'0');
    ctx.fillRect(x+5, y, stepW-10, barH);
    ctx.strokeStyle = accent; ctx.lineWidth = 1; ctx.strokeRect(x+5, y, stepW-10, barH);
    ctx.fillStyle = fg; ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(text, x+stepW/2, y-8);
  });
  // Rising arrow
  ctx.beginPath(); ctx.moveTo(40, h-35); ctx.lineTo(w-40, 30);
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.setLineDash([4,4]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Ascending intensity → dramatic peak', w*0.5, h-8);
},

/* ─────────── 19 Anadiplosis ─────────── */
anadiplosis(canvas) {
  const s = setupCanvas('anadiplosisCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const chain = ['Fear', 'Anger', 'Hate', 'Suffering'];
  const gap = (w-60) / (chain.length);
  chain.forEach((word, i) => {
    const x = 30 + i*gap + gap/2;
    const y = h*0.5;
    ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI*2);
    ctx.fillStyle = accent + (25 + i*20).toString(16).padStart(2,'0');
    ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(word, x, y+4);
    // Chain link to next
    if (i < chain.length-1) {
      const nx = 30 + (i+1)*gap + gap/2;
      ctx.beginPath(); ctx.moveTo(x+26, y); ctx.lineTo(nx-26, y);
      ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(nx-26, y); ctx.lineTo(nx-32, y-4); ctx.lineTo(nx-32, y+4); ctx.closePath();
      ctx.fillStyle = accent; ctx.fill();
    }
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('"Fear leads to anger. Anger leads to hate. Hate…"', w*0.5, h-8);
},

/* ─────────── 20 Chiasmus ─────────── */
chiasmus(canvas) {
  const s = setupCanvas('chiasmusCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // ABBA structure
  const y1 = h*0.3, y2 = h*0.7;
  const labels1 = ['your country', 'can do', 'for you'];
  const labels2 = ['you', 'can do', 'for your country'];
  const cols = [accent, fg, accent2];
  const positions = [w*0.25, w*0.5, w*0.75];
  ctx.font = '12px Inter,sans-serif'; ctx.textAlign = 'center';
  labels1.forEach((l,i) => { ctx.fillStyle = cols[i]; ctx.fillText(l, positions[i], y1); });
  labels2.forEach((l,i) => { ctx.fillStyle = cols[2-i]; ctx.fillText(l, positions[i], y2); });
  // X crossing lines
  ctx.beginPath(); ctx.moveTo(positions[0], y1+8); ctx.lineTo(positions[2], y2-12);
  ctx.strokeStyle = accent+'80'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(positions[2], y1+8); ctx.lineTo(positions[0], y2-12);
  ctx.strokeStyle = accent2+'80'; ctx.stroke();
  ctx.setLineDash([]);
  // X label
  ctx.fillStyle = muted; ctx.font = 'bold 16px Inter,sans-serif';
  ctx.fillText('χ', w*0.5, h*0.5+5);
  ctx.font = '10px Inter,sans-serif';
  ctx.fillText('A-B-B-A reversed structure', w*0.5, h-8);
},

/* ─────────── 21 Imagery ─────────── */
imagery(canvas) {
  const s = setupCanvas('imageryCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const senses = [
    { name:'Visual', icon:'👁', color:'#e07b39' },
    { name:'Auditory', icon:'👂', color:'#4a90d9' },
    { name:'Tactile', icon:'🤚', color:'#2a7d5f' },
    { name:'Gustatory', icon:'👅', color:'#c84b2f' },
    { name:'Olfactory', icon:'👃', color:accent },
  ];
  const cx = w*0.5, cy = h*0.5;
  senses.forEach((sense, i) => {
    const angle = (i/senses.length)*Math.PI*2 - Math.PI/2;
    const r = 65;
    const x = cx + Math.cos(angle)*r;
    const y = cy + Math.sin(angle)*r;
    ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI*2);
    ctx.fillStyle = sense.color+'25'; ctx.fill();
    ctx.strokeStyle = sense.color; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = fg; ctx.font = '16px serif'; ctx.textAlign = 'center';
    ctx.fillText(sense.icon, x, y-2);
    ctx.font = '9px Inter,sans-serif';
    ctx.fillText(sense.name, x, y+16);
    // Line to center
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x-Math.cos(angle)*28, y-Math.sin(angle)*28);
    ctx.strokeStyle = sense.color+'40'; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.fillStyle = fg; ctx.font = 'bold 10px Inter,sans-serif';
  ctx.fillText('IMAGERY', cx, cy+4);
},

/* ─────────── 22 Synesthesia ─────────── */
synesthesia(canvas) {
  const s = setupCanvas('synesthesiaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const mappings = [
    { from:'Sound', to:'Color', example:'"blue note"', fromC:'#4a90d9', toC:'#4a90d9' },
    { from:'Sight', to:'Sound', example:'"loud shirt"', fromC:'#e07b39', toC:'#4a90d9' },
    { from:'Sound', to:'Taste', example:'"sweet melody"', fromC:'#4a90d9', toC:'#c84b2f' },
    { from:'Touch', to:'Sight', example:'"warm colors"', fromC:'#2a7d5f', toC:'#e07b39' },
  ];
  const rowH = (h-20)/mappings.length;
  mappings.forEach(({from, to, example, fromC, toC}, i) => {
    const y = 15 + i*rowH + rowH/2;
    // From sense
    ctx.fillStyle = fromC; ctx.font = 'bold 11px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(from, w*0.15, y);
    // Arrow
    ctx.beginPath(); ctx.moveTo(w*0.25, y-3); ctx.lineTo(w*0.38, y-3);
    ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.stroke();
    // To sense
    ctx.fillStyle = toC; ctx.fillText(to, w*0.48, y);
    // Example
    ctx.fillStyle = accent; ctx.font = 'italic 11px Inter,sans-serif';
    ctx.fillText(example, w*0.75, y);
  });
},

/* ─────────── 23 Symbol ─────────── */
symbol(canvas) {
  const s = setupCanvas('symbolCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const cx = w*0.5, cy = h*0.45;
  // Core symbol
  ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 16px serif'; ctx.textAlign = 'center';
  ctx.fillText('🌹', cx, cy+6);
  // Radiating meanings
  const meanings = ['Love', 'Beauty', 'Mortality', 'Passion', 'Secrecy'];
  meanings.forEach((m, i) => {
    const angle = (i/meanings.length)*Math.PI*2 - Math.PI/2;
    const r = 70;
    const x = cx + Math.cos(angle)*r;
    const y = cy + Math.sin(angle)*r;
    // Radiating line
    ctx.beginPath(); ctx.moveTo(cx+Math.cos(angle)*25, cy+Math.sin(angle)*25);
    ctx.lineTo(x, y);
    ctx.strokeStyle = accent+'50'; ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif';
    ctx.fillText(m, x, y+14);
  });
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('A symbol radiates multiple meanings', cx, h-6);
},

/* ─────────── 24 Motif ─────────── */
motif(canvas) {
  const s = setupCanvas('motifCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  // Timeline with recurring motif marks
  const y = h*0.5;
  ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(w-30, y);
  ctx.strokeStyle = muted; ctx.lineWidth = 2; ctx.stroke();
  // Acts/chapters
  const acts = ['Act I', 'Act II', 'Act III', 'Act IV', 'Act V'];
  const gap = (w-60)/acts.length;
  acts.forEach((act, i) => {
    const x = 30 + i*gap + gap/2;
    ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(act, x, y+20);
    // Blood motif mark (grows)
    const r = 6 + i*4;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = accent2 + (30+i*15).toString(16).padStart(2,'0');
    ctx.fill();
    ctx.strokeStyle = accent2; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.fillStyle = fg; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Blood in Macbeth — grows with each recurrence', w*0.5, 18);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('Each appearance deepens the theme of guilt', w*0.5, h-6);
},

/* ─────────── 25 Juxtaposition ─────────── */
juxtaposition(canvas) {
  const s = setupCanvas('juxtapositionCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent4') || '#8b4fa8';
  const accent2 = getColor('--accent') || '#c84b2f';
  const fg = getColor('--fg') || '#c9c9c9';
  const muted = getColor('--muted') || '#666';
  const mid = w*0.5;
  // Element A (left)
  ctx.fillStyle = accent+'20';
  ctx.fillRect(15, 20, mid-25, h-40);
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.strokeRect(15, 20, mid-25, h-40);
  // Element B (right)
  ctx.fillStyle = accent2+'20';
  ctx.fillRect(mid+10, 20, mid-25, h-40);
  ctx.strokeStyle = accent2; ctx.strokeRect(mid+10, 20, mid-25, h-40);
  ctx.fillStyle = fg; ctx.font = 'bold 14px Inter,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Beauty', 15+(mid-25)/2, h*0.4);
  ctx.fillText('Ugliness', mid+10+(mid-25)/2, h*0.4);
  ctx.fillStyle = accent; ctx.font = '11px Inter,sans-serif';
  ctx.fillText('Palace', 15+(mid-25)/2, h*0.58);
  ctx.fillStyle = accent2;
  ctx.fillText('Slum', mid+10+(mid-25)/2, h*0.58);
  // Divider
  ctx.beginPath(); ctx.moveTo(mid, 20); ctx.lineTo(mid, h-20);
  ctx.strokeStyle = fg; ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = muted; ctx.font = '10px Inter,sans-serif';
  ctx.fillText('‖', mid, h*0.5+4);
  ctx.fillText('Proximity creates meaning', mid, h-6);
},
};
