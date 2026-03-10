/* ═══════════════════════════════════════════════════════════════
   Poetic Forms — Canvas Visualizations
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {};

function setupCanvas(id) {
  const c = document.getElementById(id);
  if (!c) return null;
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  return { c, ctx, w: rect.width, h: rect.height };
}

function getColor(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}

/* ---- Shakespearean Sonnet ---- */
DRAWS['shakespearean-sonnet'] = function () {
  const s = setupCanvas('shSonnetCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const bg = getColor('--bg'); const text = getColor('--text'); const muted = getColor('--muted');
  const accent = getColor('--accent'); const accent2 = getColor('--accent2'); const accent3 = getColor('--accent3'); const accent4 = getColor('--accent4');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  const rhyme = 'ABABCDCDEFEF GG'.split('');
  const colors = { A: accent, B: accent3, C: accent2, D: accent4, E: accent, F: accent3, G: '#e6a817', ' ': 'transparent' };
  const labels = ['Q1','Q1','Q1','Q1','Q2','Q2','Q2','Q2','Q3','Q3','Q3','Q3','','C','C'];
  const lx = 60, ly = 20, lh = 20, lw = w - 120;
  ctx.font = '11px ' + getColor('--mono');
  for (let i = 0; i < 14; i++) {
    const y = ly + i * lh;
    const r = i < 12 ? rhyme[i] : rhyme[i < 12 ? i : 12 + (i - 12)];
    const rChar = i < 12 ? 'ABABCDCDEFEF'[i] : 'GG'[i - 12];
    ctx.fillStyle = colors[rChar] || muted;
    ctx.globalAlpha = 0.15;
    ctx.fillRect(lx, y, lw, lh - 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted;
    ctx.textAlign = 'right';
    ctx.fillText('L' + (i + 1), lx - 8, y + 14);
    ctx.fillStyle = colors[rChar] || muted;
    ctx.textAlign = 'left';
    ctx.fillText(rChar, lx + lw + 10, y + 14);
    if (i === 3 || i === 7 || i === 11) {
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(lx, y + lh); ctx.lineTo(lx + lw, y + lh); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
  }
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  ctx.fillText('Quatrain 1', lx + lw / 2, ly + 2 * lh + 6);
  ctx.fillStyle = accent2;
  ctx.fillText('Quatrain 2', lx + lw / 2, ly + 6 * lh + 6);
  ctx.fillStyle = accent;
  ctx.fillText('Quatrain 3', lx + lw / 2, ly + 10 * lh + 6);
  ctx.fillStyle = '#e6a817';
  ctx.fillText('Couplet', lx + lw / 2, ly + 13 * lh + 6);
};

/* ---- Petrarchan Sonnet ---- */
DRAWS['petrarchan-sonnet'] = function () {
  const s = setupCanvas('petSonnetCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const rhymes = 'ABBAABBACDECDE'.split('');
  const lx = 60, ly = 15, lh = 20, lw = w - 120;
  ctx.font = '11px ' + getColor('--mono');
  for (let i = 0; i < 14; i++) {
    const y = ly + i * lh;
    const isOctave = i < 8;
    const col = isOctave ? accent : accent3;
    ctx.fillStyle = col; ctx.globalAlpha = 0.15;
    ctx.fillRect(lx, y, lw, lh - 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText('L' + (i + 1), lx - 8, y + 14);
    ctx.fillStyle = col; ctx.textAlign = 'left';
    ctx.fillText(rhymes[i], lx + lw + 10, y + 14);
  }
  // Volta marker
  const vy = ly + 8 * lh - 2;
  ctx.strokeStyle = '#e6a817'; ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(lx - 20, vy); ctx.lineTo(lx + lw + 30, vy); ctx.stroke();
  ctx.setLineDash([]); ctx.lineWidth = 1;
  ctx.font = 'bold 12px ' + getColor('--sans');
  ctx.fillStyle = '#e6a817'; ctx.textAlign = 'center';
  ctx.fillText('↓ VOLTA ↓', lx + lw / 2, vy + 14);
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  ctx.fillText('OCTAVE', w - 35, ly + 4 * lh);
  ctx.fillStyle = accent3;
  ctx.fillText('SESTET', w - 35, ly + 11 * lh);
};

/* ---- Spenserian Sonnet ---- */
DRAWS['spenserian-sonnet'] = function () {
  const s = setupCanvas('spenSonnetCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent2 = getColor('--accent2'); const accent3 = getColor('--accent3'); const accent4 = getColor('--accent4'); const muted = getColor('--muted');
  const rhymes = 'ABABBCBCCDCDEE'.split('');
  const colorMap = { A: accent, B: accent3, C: accent2, D: accent4, E: '#e6a817' };
  const lx = 60, ly = 15, lh = 19, lw = w - 140;
  ctx.font = '11px ' + getColor('--mono');
  for (let i = 0; i < 14; i++) {
    const y = ly + i * lh;
    const col = colorMap[rhymes[i]];
    ctx.fillStyle = col; ctx.globalAlpha = 0.15;
    ctx.fillRect(lx, y, lw, lh - 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText('L' + (i + 1), lx - 8, y + 13);
    ctx.fillStyle = col; ctx.textAlign = 'left';
    ctx.fillText(rhymes[i], lx + lw + 10, y + 13);
  }
  // Draw link arrows for B linking Q1→Q2, C linking Q2→Q3
  ctx.strokeStyle = accent3; ctx.lineWidth = 1.5;
  const ax = lx + lw + 30;
  // B chain: lines 2,4 → 5,7
  [[1, 4], [3, 6]].forEach(([from, to]) => {
    const y1 = ly + from * lh + lh / 2 - 1;
    const y2 = ly + to * lh + lh / 2 - 1;
    ctx.beginPath(); ctx.moveTo(ax, y1); ctx.quadraticCurveTo(ax + 20, (y1 + y2) / 2, ax, y2); ctx.stroke();
  });
  ctx.strokeStyle = accent2;
  [[5, 8], [7, 10]].forEach(([from, to]) => {
    const y1 = ly + from * lh + lh / 2 - 1;
    const y2 = ly + to * lh + lh / 2 - 1;
    ctx.beginPath(); ctx.moveTo(ax + 5, y1); ctx.quadraticCurveTo(ax + 25, (y1 + y2) / 2, ax + 5, y2); ctx.stroke();
  });
};

/* ---- Modern Sonnet ---- */
DRAWS['modern-sonnet'] = function () {
  const s = setupCanvas('modernSonnetCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  // Draw two side-by-side columns: strict vs. modern
  const colW = (w - 40) / 2;
  ctx.font = 'bold 12px ' + getColor('--sans');
  ctx.fillStyle = accent3; ctx.textAlign = 'center';
  ctx.fillText('Traditional (strict)', 20 + colW / 2, 20);
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  ctx.fillText('Modern (flexible)', 20 + colW + 20 + colW / 2, 20);
  const ly = 35, lh = 16;
  // Traditional: even, aligned bars
  for (let i = 0; i < 14; i++) {
    const y = ly + i * lh;
    ctx.fillStyle = accent3; ctx.globalAlpha = 0.2;
    ctx.fillRect(20, y, colW, lh - 3);
    ctx.globalAlpha = 1;
  }
  // Modern: varied length bars
  const lengths = [0.9, 0.3, 0.7, 1.0, 0.5, 0.8, 0.2, 0.95, 0.6, 0.4, 1.0, 0.35, 0.75, 0.55];
  for (let i = 0; i < 14; i++) {
    const y = ly + i * lh;
    ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
    ctx.fillRect(20 + colW + 20, y, colW * lengths[i], lh - 3);
    ctx.globalAlpha = 1;
  }
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('uniform meter + rhyme', 20 + colW / 2, h - 10);
  ctx.fillText('variable lines + slant rhyme', 20 + colW + 20 + colW / 2, h - 10);
};

/* ---- Crown of Sonnets ---- */
DRAWS['crown-of-sonnets'] = function () {
  const s = setupCanvas('crownCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 40;
  ctx.font = 'bold 12px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  ctx.fillText('Crown of Sonnets', cx, 18);
  for (let i = 0; i < 7; i++) {
    const angle = -Math.PI / 2 + (i / 7) * Math.PI * 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15; ctx.fill();
    ctx.globalAlpha = 1; ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 13px ' + getColor('--sans');
    ctx.fillText((i + 1).toString(), x, y);
    // Arrow to next
    const nextAngle = -Math.PI / 2 + ((i + 1) / 7) * Math.PI * 2;
    const nx = cx + Math.cos(nextAngle) * r;
    const ny = cy + Math.sin(nextAngle) * r;
    const dx = nx - x, dy = ny - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const sx = x + (dx / dist) * 26, sy = y + (dy / dist) * 26;
    const ex = nx - (dx / dist) * 26, ey = ny - (dy / dist) * 26;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
    ctx.strokeStyle = accent3; ctx.lineWidth = 1.5; ctx.stroke();
    // Arrow head
    const aLen = 8, aAng = Math.atan2(ey - sy, ex - sx);
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - aLen * Math.cos(aAng - 0.4), ey - aLen * Math.sin(aAng - 0.4));
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - aLen * Math.cos(aAng + 0.4), ey - aLen * Math.sin(aAng + 0.4));
    ctx.stroke();
  }
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText('Last line of each → first line of next', cx, h - 8);
};

/* ---- Villanelle ---- */
DRAWS['villanelle'] = function () {
  const s = setupCanvas('villanelleCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted'); const text = getColor('--text');
  // 19 lines: 5 tercets (aba) + 1 quatrain (abaa)
  const lines = [];
  for (let t = 0; t < 5; t++) { lines.push('a', 'b', t % 2 === 0 ? 'A1' : 'A2'); }
  lines.push('a', 'b', 'A1', 'A2');
  const lx = 70, ly = 8, lh = 17.5, lw = w - 140;
  ctx.font = '10px ' + getColor('--mono');
  let stanza = 1;
  for (let i = 0; i < 19; i++) {
    const y = ly + i * lh;
    const type = lines[i];
    const isRefrain = type === 'A1' || type === 'A2';
    ctx.fillStyle = isRefrain ? (type === 'A1' ? accent : accent3) : muted;
    ctx.globalAlpha = isRefrain ? 0.25 : 0.1;
    ctx.fillRect(lx, y, lw, lh - 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText((i + 1).toString(), lx - 8, y + 12);
    ctx.fillStyle = isRefrain ? (type === 'A1' ? accent : accent3) : text;
    ctx.textAlign = 'left';
    ctx.fillText(isRefrain ? type : type.toUpperCase(), lx + lw + 10, y + 12);
    if ((i + 1) % 3 === 0 && i < 14) {
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(lx, y + lh); ctx.lineTo(lx + lw, y + lh); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
  }
  ctx.font = 'bold 10px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'right';
  ctx.fillText('Refrain 1 ■', lx - 15, h - 6);
  ctx.fillStyle = accent3;
  ctx.fillText('Refrain 2 ■', lx + lw + 55, h - 6);
};

/* ---- Sestina ---- */
DRAWS['sestina'] = function () {
  const s = setupCanvas('sestinaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const colors = [getColor('--accent'), getColor('--accent3'), getColor('--accent2'), getColor('--accent4'), '#e6a817', '#7ec8e3'];
  const muted = getColor('--muted');
  // Permutation: 6,1,5,2,4,3
  let order = [1, 2, 3, 4, 5, 6];
  const stanzas = [order.slice()];
  for (let s = 0; s < 5; s++) {
    const prev = stanzas[stanzas.length - 1];
    const next = [prev[5], prev[0], prev[4], prev[1], prev[3], prev[2]];
    stanzas.push(next);
  }
  const cellW = (w - 80) / 6, cellH = 28, startX = 40, startY = 30;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('End-word positions across 6 stanzas', w / 2, 18);
  ctx.font = '10px ' + getColor('--mono');
  for (let si = 0; si < 6; si++) {
    const y = startY + si * (cellH + 4);
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText('S' + (si + 1), startX - 8, y + cellH / 2 + 4);
    for (let li = 0; li < 6; li++) {
      const x = startX + li * cellW;
      const wordNum = stanzas[si][li];
      ctx.fillStyle = colors[wordNum - 1]; ctx.globalAlpha = 0.2;
      ctx.fillRect(x + 2, y, cellW - 4, cellH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors[wordNum - 1]; ctx.textAlign = 'center';
      ctx.fillText('W' + wordNum, x + cellW / 2, y + cellH / 2 + 4);
    }
  }
  // Envoi
  const ey = startY + 6 * (cellH + 4) + 10;
  ctx.fillStyle = muted; ctx.textAlign = 'right';
  ctx.fillText('Envoi', startX - 8, ey + 12);
  ctx.font = '9px ' + getColor('--mono');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'left';
  ctx.fillText('3 lines containing all 6 words (2 per line)', startX + 4, ey + 12);
};

/* ---- Pantoum ---- */
DRAWS['pantoum'] = function () {
  const s = setupCanvas('pantoumCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const stanzaW = (w - 50) / 4, stanzaX = 25;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Pantoum line repetition pattern', w / 2, 18);
  const letters = [['A','B','C','D'],['B','E','D','F'],['E','G','F','H'],['G','A','H','C']];
  const ly = 35, lh = 22;
  ctx.font = '11px ' + getColor('--mono');
  for (let si = 0; si < 4; si++) {
    const x = stanzaX + si * stanzaW;
    ctx.fillStyle = muted; ctx.textAlign = 'center';
    ctx.font = 'bold 10px ' + getColor('--sans');
    ctx.fillText('Stanza ' + (si + 1), x + stanzaW / 2, ly - 6);
    ctx.font = '11px ' + getColor('--mono');
    for (let li = 0; li < 4; li++) {
      const y = ly + li * lh;
      const letter = letters[si][li];
      const isRepeated = si > 0 && (li === 0 || li === 2);
      ctx.fillStyle = isRepeated ? accent : accent3;
      ctx.globalAlpha = 0.15;
      ctx.fillRect(x + 4, y, stanzaW - 8, lh - 3);
      ctx.globalAlpha = 1;
      ctx.fillStyle = isRepeated ? accent : getColor('--text');
      ctx.textAlign = 'center';
      ctx.fillText(letter, x + stanzaW / 2, y + 15);
    }
  }
  // Draw arrows from stanza lines 2,4 to next stanza lines 1,3
  ctx.strokeStyle = accent; ctx.lineWidth = 1;
  for (let si = 0; si < 3; si++) {
    const x1 = stanzaX + si * stanzaW + stanzaW - 4;
    const x2 = stanzaX + (si + 1) * stanzaW + 4;
    [1, 3].forEach((fromLi, idx) => {
      const toLi = idx === 0 ? 0 : 2;
      const y1 = ly + fromLi * lh + lh / 2 - 1;
      const y2 = ly + toLi * lh + lh / 2 - 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 - 10, x2, y2);
      ctx.stroke();
    });
  }
};

/* ---- Ghazal ---- */
DRAWS['ghazal'] = function () {
  const s = setupCanvas('ghazalCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Ghazal — Radif (refrain) pattern', w / 2, 18);
  const ly = 35, lh = 20, lw = w - 80, lx = 40;
  const couplets = 6;
  ctx.font = '11px ' + getColor('--mono');
  for (let c = 0; c < couplets; c++) {
    for (let l = 0; l < 2; l++) {
      const i = c * 2 + l;
      const y = ly + i * lh + (c * 8);
      const hasRadif = (c === 0) || (l === 1);
      ctx.fillStyle = muted; ctx.globalAlpha = 0.1;
      ctx.fillRect(lx, y, lw - 60, lh - 3);
      ctx.globalAlpha = 1;
      if (hasRadif) {
        ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
        ctx.fillRect(lx + lw - 60, y, 60, lh - 3);
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent; ctx.textAlign = 'center';
        ctx.fillText('radif', lx + lw - 30, y + 14);
      }
      ctx.fillStyle = muted; ctx.textAlign = 'right';
      ctx.fillText(c === couplets - 1 && l === 1 ? 'maqta' : '', lx - 6, y + 14);
    }
  }
  ctx.font = '9px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('matla (opening couplet): both lines end with radif', w / 2, h - 8);
};

/* ---- Rondeau ---- */
DRAWS['rondeau'] = function () {
  const s = setupCanvas('rondeauCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Rondeau — 15 lines + rentrement', w / 2, 18);
  const lines = 15;
  const lx = 50, ly = 30, lh = 16, lw = w - 100;
  const refrainLines = [8, 14]; // rentrement appears after line 9 and 15 (we show at those lines)
  ctx.font = '10px ' + getColor('--mono');
  for (let i = 0; i < lines; i++) {
    const y = ly + i * lh;
    const isRefrain = refrainLines.includes(i);
    ctx.fillStyle = isRefrain ? accent : accent3;
    ctx.globalAlpha = isRefrain ? 0.3 : 0.1;
    ctx.fillRect(lx, y, isRefrain ? lw * 0.4 : lw, lh - 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText((i + 1).toString(), lx - 6, y + 11);
    if (isRefrain) {
      ctx.fillStyle = accent; ctx.textAlign = 'left';
      ctx.fillText('← rentrement', lx + lw * 0.4 + 8, y + 11);
    }
    if (i === 4 || i === 9) {
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(lx, y + lh); ctx.lineTo(lx + lw, y + lh); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
  }
};

/* ---- Haiku ---- */
DRAWS['haiku'] = function () {
  const s = setupCanvas('haikuCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const s1 = document.getElementById('hk1');
  const s2 = document.getElementById('hk2');
  const s3 = document.getElementById('hk3');
  function draw() {
    ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
    const v1 = parseInt(s1.value), v2 = parseInt(s2.value), v3 = parseInt(s3.value);
    document.getElementById('hk1v').textContent = v1;
    document.getElementById('hk2v').textContent = v2;
    document.getElementById('hk3v').textContent = v3;
    const total = v1 + v2 + v3;
    const isTraditional = v1 === 5 && v2 === 7 && v3 === 5;
    const maxSyl = 11;
    const barW = (w - 100) / maxSyl;
    const lines = [v1, v2, v3];
    const labels = ['Line 1', 'Line 2', 'Line 3'];
    const ly = 30, lh = 50;
    ctx.font = '11px ' + getColor('--mono');
    lines.forEach((syl, i) => {
      const y = ly + i * lh;
      ctx.fillStyle = muted; ctx.textAlign = 'right';
      ctx.fillText(labels[i], 55, y + 20);
      for (let j = 0; j < syl; j++) {
        ctx.fillStyle = accent; ctx.globalAlpha = 0.2 + (j / syl) * 0.3;
        ctx.beginPath();
        ctx.arc(70 + j * barW + barW / 2, y + 16, barW / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = accent; ctx.textAlign = 'left';
      ctx.fillText(syl.toString(), 70 + syl * barW + 8, y + 20);
    });
    ctx.font = 'bold 12px ' + getColor('--sans');
    ctx.fillStyle = isTraditional ? accent : muted;
    ctx.textAlign = 'center';
    ctx.fillText(isTraditional ? '✓ Traditional 5-7-5 (' + total + ' syllables)' : total + ' syllables (traditional = 17)', w / 2, h - 12);
  }
  draw();
  [s1, s2, s3].forEach(el => el.addEventListener('input', draw));
};

/* ---- Tanka ---- */
DRAWS['tanka'] = function () {
  const s = setupCanvas('tankaCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const syls = [5, 7, 5, 7, 7];
  const labels = ['5', '7', '5', '7', '7'];
  const barMaxW = w - 120;
  const ly = 20, lh = 40;
  ctx.font = '11px ' + getColor('--mono');
  syls.forEach((syl, i) => {
    const y = ly + i * lh;
    const barW = (syl / 7) * barMaxW;
    const isUpper = i < 3;
    ctx.fillStyle = isUpper ? accent : accent3;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(60, y, barW, lh - 10);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText('L' + (i + 1), 50, y + lh / 2);
    ctx.fillStyle = isUpper ? accent : accent3; ctx.textAlign = 'left';
    ctx.fillText(syl + ' syl', 65 + barW + 8, y + lh / 2);
  });
  // Pivot line
  const pivotY = ly + 2 * lh + lh - 5;
  ctx.strokeStyle = '#e6a817'; ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 3]);
  ctx.beginPath(); ctx.moveTo(60, pivotY); ctx.lineTo(w - 40, pivotY); ctx.stroke();
  ctx.setLineDash([]); ctx.lineWidth = 1;
  ctx.font = 'bold 10px ' + getColor('--sans');
  ctx.fillStyle = '#e6a817'; ctx.textAlign = 'center';
  ctx.fillText('PIVOT — observation → emotion', w / 2, pivotY - 4);
  ctx.font = '10px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'left';
  ctx.fillText('Upper phrase (kami-no-ku)', 60, h - 8);
  ctx.fillStyle = accent3; ctx.textAlign = 'right';
  ctx.fillText('Lower phrase (shimo-no-ku)', w - 40, h - 8);
};

/* ---- Limerick ---- */
DRAWS['limerick'] = function () {
  const s = setupCanvas('limerickCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const lines = [{ syl: 9, rhyme: 'A' }, { syl: 9, rhyme: 'A' }, { syl: 6, rhyme: 'B' }, { syl: 6, rhyme: 'B' }, { syl: 9, rhyme: 'A' }];
  const maxSyl = 9, barMax = w - 140, ly = 30, lh = 35;
  ctx.font = '11px ' + getColor('--mono');
  lines.forEach((line, i) => {
    const y = ly + i * lh;
    const barW = (line.syl / maxSyl) * barMax;
    const col = line.rhyme === 'A' ? accent : accent3;
    ctx.fillStyle = col; ctx.globalAlpha = 0.2;
    ctx.fillRect(70, y, barW, lh - 8);
    ctx.globalAlpha = 1;
    ctx.fillStyle = muted; ctx.textAlign = 'right';
    ctx.fillText('L' + (i + 1), 60, y + lh / 2);
    ctx.fillStyle = col; ctx.textAlign = 'left';
    ctx.fillText(line.rhyme + ' (~' + line.syl + ' syl)', 75 + barW + 8, y + lh / 2);
  });
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('da-da-DUM da-da-DUM da-da-DUM (anapestic)', w / 2, h - 8);
};

/* ---- Epigram ---- */
DRAWS['epigram'] = function () {
  const s = setupCanvas('epigramCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const muted = getColor('--muted');
  // Setup → Twist diagram
  const midY = h / 2;
  ctx.fillStyle = accent; ctx.globalAlpha = 0.1;
  ctx.fillRect(30, 20, w / 2 - 40, midY - 30);
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent; ctx.globalAlpha = 0.2;
  ctx.fillRect(w / 2 + 10, 20, w / 2 - 40, midY - 30);
  ctx.globalAlpha = 1;
  ctx.font = 'bold 14px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Setup', w / 4, midY / 2 + 5);
  ctx.fillText('Twist', 3 * w / 4, midY / 2 + 5);
  // Arrow
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(w / 2 - 20, midY / 2); ctx.lineTo(w / 2 + 5, midY / 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w / 2 + 5, midY / 2); ctx.lineTo(w / 2 - 2, midY / 2 - 5); ctx.moveTo(w / 2 + 5, midY / 2); ctx.lineTo(w / 2 - 2, midY / 2 + 5); ctx.stroke();
  ctx.font = '11px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('"I can resist everything"', w / 4, midY + 20);
  ctx.fillText('"except temptation."', 3 * w / 4, midY + 20);
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = accent;
  ctx.fillText('— Oscar Wilde', w / 2, h - 12);
};

/* ---- Couplet ---- */
DRAWS['couplet'] = function () {
  const s = setupCanvas('coupletCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const colW = (w - 60) / 2;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  ctx.fillText('Closed Couplet', 30 + colW / 2, 20);
  ctx.fillStyle = accent3;
  ctx.fillText('Open Couplet', 30 + colW + 20 + colW / 2, 20);
  const ly = 35, lh = 22;
  ctx.font = '10px ' + getColor('--mono');
  for (let i = 0; i < 6; i++) {
    const y = ly + i * lh;
    const isEven = i % 2 === 0;
    // Closed: each pair is a unit
    ctx.fillStyle = accent; ctx.globalAlpha = isEven ? 0.2 : 0.12;
    ctx.fillRect(30, y, colW, lh - 3);
    ctx.globalAlpha = 1;
    // Open: sentence flows across
    ctx.fillStyle = accent3; ctx.globalAlpha = 0.15;
    ctx.fillRect(30 + colW + 20, y, colW, lh - 3);
    ctx.globalAlpha = 1;
    if (i % 2 === 1 && i < 5) {
      // Closed: gap between pairs
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.3;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(30, y + lh); ctx.lineTo(30 + colW, y + lh); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
  }
  ctx.fillStyle = muted; ctx.font = '9px ' + getColor('--mono'); ctx.textAlign = 'center';
  ctx.fillText('each pair = complete thought', 30 + colW / 2, h - 8);
  ctx.fillText('sentences flow across pairs', 30 + colW + 20 + colW / 2, h - 8);
};

/* ---- Ballad ---- */
DRAWS['ballad'] = function () {
  const s = setupCanvas('balladCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Ballad Stanza — Common Meter (4-3-4-3)', w / 2, 18);
  const stresses = [4, 3, 4, 3];
  const rhyme = ['A', 'B', 'C', 'B'];
  const ly = 35, lh = 35;
  ctx.font = '11px ' + getColor('--mono');
  for (let rep = 0; rep < 2; rep++) {
    const ox = rep * (w / 2);
    for (let i = 0; i < 4; i++) {
      const y = ly + i * lh + rep * (4 * lh + 15);
      if (rep === 1 && y + lh > h - 10) break;
      const stressCount = stresses[i];
      for (let s = 0; s < stressCount; s++) {
        const x = 60 + ox + s * 36;
        ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
        ctx.beginPath(); ctx.arc(x, y + 12, 12, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = accent; ctx.textAlign = 'center';
        ctx.fillText(s % 2 === 0 ? 'da' : 'DUM', x, y + 16);
      }
      ctx.fillStyle = rhyme[i] === 'B' ? accent3 : muted;
      ctx.textAlign = 'left';
      ctx.fillText(rhyme[i], 60 + ox + stressCount * 36 + 10, y + 16);
    }
  }
};

/* ---- Ode ---- */
DRAWS['ode'] = function () {
  const s = setupCanvas('odeCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const accent2 = getColor('--accent2'); const muted = getColor('--muted');
  const types = [
    { name: 'Pindaric', parts: ['Strophe', 'Antistrophe', 'Epode'], color: accent },
    { name: 'Horatian', parts: ['Stanza 1', 'Stanza 2', 'Stanza 3'], color: accent3 },
    { name: 'Irregular', parts: ['Section A', 'Section B', 'Section C'], color: accent2 },
  ];
  const colW = (w - 40) / 3;
  ctx.font = 'bold 11px ' + getColor('--sans');
  types.forEach((t, ti) => {
    const x = 20 + ti * colW;
    ctx.fillStyle = t.color; ctx.textAlign = 'center';
    ctx.fillText(t.name, x + colW / 2, 22);
    t.parts.forEach((p, pi) => {
      const y = 35 + pi * 75;
      const bh = ti === 2 ? [50, 70, 40][pi] : 60;
      ctx.fillStyle = t.color; ctx.globalAlpha = 0.12;
      ctx.fillRect(x + 8, y, colW - 16, bh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = t.color; ctx.font = '10px ' + getColor('--mono'); ctx.textAlign = 'center';
      ctx.fillText(p, x + colW / 2, y + bh / 2 + 4);
    });
  });
};

/* ---- Elegy ---- */
DRAWS['elegy'] = function () {
  const s = setupCanvas('elegyCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const accent2 = getColor('--accent2'); const muted = getColor('--muted');
  // Arc from grief to consolation
  const phases = [
    { label: 'Lament', color: accent, x: 0.15 },
    { label: 'Praise', color: accent3, x: 0.5 },
    { label: 'Consolation', color: accent2, x: 0.85 },
  ];
  const arcY = h / 2;
  // Draw arc
  ctx.strokeStyle = muted; ctx.lineWidth = 2; ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.moveTo(40, arcY + 30);
  ctx.quadraticCurveTo(w / 2, arcY - 60, w - 40, arcY - 40);
  ctx.stroke();
  ctx.globalAlpha = 1; ctx.lineWidth = 1;
  phases.forEach(p => {
    const x = w * p.x;
    const y = p.x < 0.3 ? arcY + 20 : p.x < 0.6 ? arcY - 20 : arcY - 40;
    ctx.beginPath(); ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fillStyle = p.color; ctx.globalAlpha = 0.15; ctx.fill();
    ctx.globalAlpha = 1; ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = p.color; ctx.font = 'bold 11px ' + getColor('--sans');
    ctx.textAlign = 'center'; ctx.fillText(p.label, x, y + 4);
  });
  ctx.font = '10px ' + getColor('--mono'); ctx.lineWidth = 1;
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('grief → memory → meaning', w / 2, h - 10);
};

/* ---- Epic ---- */
DRAWS['epic'] = function () {
  const s = setupCanvas('epicCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const muted = getColor('--muted');
  const conventions = ['Invocation', 'In medias res', 'Catalogue', 'Epic Simile', 'Divine Aid', 'Underworld', 'Resolution'];
  const stepW = (w - 40) / conventions.length;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Epic Conventions — Narrative Arc', w / 2, 18);
  conventions.forEach((c, i) => {
    const x = 20 + i * stepW + stepW / 2;
    const baseY = h - 50;
    const barH = 30 + (i < 4 ? i * 25 : (6 - i) * 25);
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15 + i * 0.05;
    ctx.fillRect(x - stepW / 2 + 3, baseY - barH, stepW - 6, barH);
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.translate(x, baseY + 10);
    ctx.rotate(-0.3);
    ctx.fillStyle = muted; ctx.font = '9px ' + getColor('--mono');
    ctx.textAlign = 'left';
    ctx.fillText(c, 0, 0);
    ctx.restore();
  });
};

/* ---- Dramatic Monologue ---- */
DRAWS['dramatic-monologue'] = function () {
  const s = setupCanvas('dramaticCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  // Layers: what speaker says → what speaker reveals → what listener hears
  const layers = [
    { label: 'What the speaker says', color: accent3, y: 40, h: 50 },
    { label: 'What the speaker reveals', color: accent, y: 110, h: 50 },
    { label: 'What the reader sees', color: '#e6a817', y: 180, h: 50 },
  ];
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Dramatic Monologue — Layers of Meaning', w / 2, 20);
  layers.forEach(l => {
    ctx.fillStyle = l.color; ctx.globalAlpha = 0.12;
    ctx.fillRect(40, l.y, w - 80, l.h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = l.color; ctx.textAlign = 'center';
    ctx.font = 'bold 11px ' + getColor('--sans');
    ctx.fillText(l.label, w / 2, l.y + l.h / 2 + 4);
  });
  // Arrows
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(w / 2, 90); ctx.lineTo(w / 2, 110); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w / 2, 160); ctx.lineTo(w / 2, 180); ctx.stroke();
  ctx.setLineDash([]);
};

/* ---- Free Verse ---- */
DRAWS['free-verse'] = function () {
  const s = setupCanvas('freeVerseCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const muted = getColor('--muted');
  // Show same text with different line breaks
  const col1 = [0.9, 0.85, 0.9, 0.85, 0.9, 0.85, 0.9, 0.85]; // Prose-like
  const col2 = [0.4, 0.7, 0.3, 0.95, 0.2, 0.6, 0.5, 0.15]; // Poetic breaks
  const colW = (w - 50) / 2;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('Same words', w / 4 + 10, 20);
  ctx.fillStyle = accent;
  ctx.fillText('Different line breaks', 3 * w / 4 - 10, 20);
  const ly = 35, lh = 24;
  col1.forEach((len, i) => {
    const y = ly + i * lh;
    ctx.fillStyle = muted; ctx.globalAlpha = 0.12;
    ctx.fillRect(20, y, colW * len, lh - 5);
    ctx.globalAlpha = 1;
  });
  col2.forEach((len, i) => {
    const y = ly + i * lh;
    ctx.fillStyle = accent; ctx.globalAlpha = 0.2;
    ctx.fillRect(30 + colW, y, colW * len, lh - 5);
    ctx.globalAlpha = 1;
  });
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('The line break is the instrument', w / 2, h - 8);
};

/* ---- Blank Verse ---- */
DRAWS['blank-verse'] = function () {
  const s = setupCanvas('blankVerseCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = getColor('--text'); ctx.textAlign = 'center';
  ctx.fillText('Blank Verse — Iambic Pentameter (no rhyme)', w / 2, 18);
  const ly = 40, lh = 32;
  ctx.font = '12px ' + getColor('--mono');
  for (let line = 0; line < 5; line++) {
    const y = ly + line * lh;
    for (let foot = 0; foot < 5; foot++) {
      const x = 30 + foot * ((w - 60) / 5);
      const fw = (w - 60) / 5;
      // Unstressed
      ctx.fillStyle = muted; ctx.globalAlpha = 0.1;
      ctx.fillRect(x, y, fw / 2 - 2, lh - 6);
      ctx.globalAlpha = 1;
      // Stressed
      ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
      ctx.fillRect(x + fw / 2, y, fw / 2 - 2, lh - 6);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = muted; ctx.textAlign = 'left'; ctx.font = '9px ' + getColor('--mono');
    ctx.fillText('◡ / ◡ / ◡ / ◡ / ◡ /', 30, y + lh - 2);
  }
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('No end rhyme — rhythm alone carries the music', w / 2, h - 8);
};

/* ---- Prose Poetry ---- */
DRAWS['prose-poetry'] = function () {
  const s = setupCanvas('prosePoetryCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const colW = (w - 50) / 2;
  ctx.font = 'bold 11px ' + getColor('--sans');
  ctx.fillStyle = accent3; ctx.textAlign = 'center';
  ctx.fillText('Free Verse', 20 + colW / 2, 20);
  ctx.fillStyle = accent;
  ctx.fillText('Prose Poetry', 30 + colW + colW / 2, 20);
  // Free verse: varied lines
  const freeLines = [0.5, 0.8, 0.3, 0.65, 0.9, 0.4, 0.7, 0.55];
  const ly = 35, lh = 20;
  freeLines.forEach((len, i) => {
    ctx.fillStyle = accent3; ctx.globalAlpha = 0.15;
    ctx.fillRect(20, ly + i * lh, colW * len, lh - 4);
    ctx.globalAlpha = 1;
  });
  // Prose poetry: paragraph block
  for (let row = 0; row < 7; row++) {
    const y = ly + row * lh;
    const len = row === 6 ? 0.6 : 0.95;
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
    ctx.fillRect(30 + colW, y, colW * len, lh - 4);
    ctx.globalAlpha = 1;
  }
  ctx.font = '9px ' + getColor('--mono');
  ctx.fillStyle = muted; ctx.textAlign = 'center';
  ctx.fillText('line breaks as rhythm', 20 + colW / 2, h - 10);
  ctx.fillText('paragraph form', 30 + colW + colW / 2, h - 10);
};

/* ---- Concrete Poetry ---- */
DRAWS['concrete-poetry'] = function () {
  const s = setupCanvas('concreteCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
  const accent = getColor('--accent'); const muted = getColor('--muted');
  // Draw a simple concrete poem — words forming a diamond/wing shape
  ctx.font = '12px ' + getColor('--mono');
  ctx.fillStyle = accent; ctx.textAlign = 'center';
  const word = 'PATTERN';
  const cx = w / 2, cy = h / 2;
  const maxR = Math.min(w, h) / 2 - 30;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const r = maxR * (0.5 + 0.5 * Math.abs(Math.sin(angle * 2)));
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const letter = word[i % word.length];
    ctx.globalAlpha = 0.3 + 0.5 * (r / maxR);
    ctx.fillText(letter, x, y + 4);
  }
  ctx.globalAlpha = 1;
  ctx.font = 'bold 14px ' + getColor('--sans');
  ctx.fillStyle = accent;
  ctx.fillText('SHAPE = MEANING', cx, cy + 4);
  ctx.font = '10px ' + getColor('--mono');
  ctx.fillStyle = muted;
  ctx.fillText('words arranged as visual objects', cx, h - 10);
};

/* ---- Acrostic ---- */
DRAWS['acrostic'] = function () {
  const s = setupCanvas('acrosticCanvas'); if (!s) return;
  const { ctx, w, h } = s;
  const accent = getColor('--accent'); const accent3 = getColor('--accent3'); const muted = getColor('--muted');
  const input = document.getElementById('acrosticWord');
  const lenSpan = document.getElementById('acrosticLen');
  function draw() {
    ctx.fillStyle = getColor('--bg'); ctx.fillRect(0, 0, w, h);
    const word = (input.value || 'POETRY').toUpperCase();
    lenSpan.textContent = word.length + ' lines';
    const lh = Math.min(30, (h - 30) / word.length);
    const ly = 15;
    ctx.font = 'bold 16px ' + getColor('--mono');
    for (let i = 0; i < word.length; i++) {
      const y = ly + i * lh;
      // First letter highlighted
      ctx.fillStyle = accent; ctx.globalAlpha = 0.25;
      ctx.fillRect(30, y, 24, lh - 3);
      ctx.globalAlpha = 1;
      ctx.fillStyle = accent; ctx.textAlign = 'center';
      ctx.fillText(word[i], 42, y + lh / 2 + 5);
      // Rest of line
      const lineW = 80 + Math.random() * (w - 180);
      ctx.fillStyle = muted; ctx.globalAlpha = 0.08;
      ctx.fillRect(58, y, lineW, lh - 3);
      ctx.globalAlpha = 1;
    }
    ctx.font = '10px ' + getColor('--mono');
    ctx.fillStyle = accent; ctx.textAlign = 'center';
    ctx.fillText('Hidden word: ' + word, w / 2, h - 6);
  }
  draw();
  input.addEventListener('input', draw);
};
