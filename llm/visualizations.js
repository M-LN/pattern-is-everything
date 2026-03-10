/* ═══════════════════════════════════════════════════════════════
   LLM Engineering — Interactive Visualizations
   Canvas-based visual engine for every topic
   ═══════════════════════════════════════════════════════════════ */

const DPR = window.devicePixelRatio || 1;
function getCSS(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a,b,t){ return a+(b-a)*t; }

function setupCanvas(id){
  const c = document.getElementById(id);
  if(!c) return null;
  const r = c.getBoundingClientRect();
  if(r.width < 1 || r.height < 1) return null;
  c.width = r.width * DPR;
  c.height = r.height * DPR;
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w: r.width, h: r.height };
}

/* ── Seeded PRNG ── */
let _seed = 42;
function srand(s){ _seed = s; }
function rand(){ _seed = (_seed * 16807 + 0) % 2147483647; return (_seed & 0x7fffffff) / 0x7fffffff; }
function randN(){ let u=0,v=0; while(!u) u=rand(); v=rand(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }

/* ── Color palette ── */
function colors(){
  return {
    bg: getCSS('--bg'), fg: getCSS('--fg'), muted: getCSS('--muted'),
    accent: getCSS('--accent'), accent2: getCSS('--accent2'),
    accent3: getCSS('--accent3'), accent4: getCSS('--accent4'),
    surface: getCSS('--surface'), border: getCSS('--border')
  };
}

/* ═══════════════════════════════════════════════════════════════
   DRAWS — one function per topic
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {

/* ── 01 Tokenization ── */
'tokenization': function(){
  const s = setupCanvas('tokenCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  const input = document.getElementById('tokenInput')?.value || 'Hello, tokenization!';
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  // Simulate BPE — split into character groups then merge common pairs
  const tokenColors = [C.accent, C.accent2, C.accent3, C.accent4, '#e07020','#5090c0','#a05090','#50a070'];
  // Simple tokenization: split on spaces/punctuation, then sub-word split long tokens
  const rawTokens = input.match(/[A-Za-z]+|[^A-Za-z\s]|\s+/g) || [input];
  const tokens = [];
  rawTokens.forEach(t => {
    if(t.length > 4 && /[A-Za-z]/.test(t)){
      // Simulate sub-word split
      const mid = Math.ceil(t.length * 0.6);
      tokens.push(t.slice(0, mid));
      tokens.push(t.slice(mid));
    } else {
      tokens.push(t);
    }
  });

  // Draw tokens
  ctx.font = '15px "IBM Plex Mono"';
  let x = 20, y = 50;
  ctx.fillStyle = C.fg; ctx.font = '11px Inter';
  ctx.fillText('Tokens (' + tokens.length + '):', 20, 24);
  ctx.font = '15px "IBM Plex Mono"';
  tokens.forEach((t, i) => {
    const tw = ctx.measureText(t).width + 16;
    if(x + tw > w - 20){ x = 20; y += 36; }
    const col = tokenColors[i % tokenColors.length];
    // Background pill
    ctx.fillStyle = col + '22';
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.5;
    const rr = 6;
    ctx.beginPath(); ctx.roundRect(x, y - 14, tw, 26, rr); ctx.fill(); ctx.stroke();
    // Text
    ctx.fillStyle = col;
    ctx.fillText(t, x + 8, y + 4);
    // ID below
    ctx.fillStyle = C.muted; ctx.font = '9px "IBM Plex Mono"';
    ctx.fillText('id:' + (1000 + i*7), x + 4, y + 18);
    ctx.font = '15px "IBM Plex Mono"';
    x += tw + 6;
  });

  // Show bytes vs tokens ratio
  const ratio = (new TextEncoder().encode(input).length / tokens.length).toFixed(1);
  ctx.fillStyle = C.muted; ctx.font = '11px Inter';
  ctx.fillText(`Compression: ${new TextEncoder().encode(input).length} bytes → ${tokens.length} tokens (${ratio} bytes/token)`, 20, h - 16);
},

/* ── 02 Token Embeddings ── */
'embeddings': function(){
  const s = setupCanvas('embedCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  srand(Date.now() & 0xFFFF);
  // Generate clusters of "tokens" in 2D
  const clusters = [
    { label:'animals', color:C.accent, cx:0.25, cy:0.3 },
    { label:'colors', color:C.accent2, cx:0.7, cy:0.25 },
    { label:'numbers', color:C.accent3, cx:0.5, cy:0.7 },
    { label:'verbs', color:C.accent4, cx:0.2, cy:0.75 },
  ];
  const words = {
    animals: ['cat','dog','fish','bird','horse','bear'],
    colors: ['red','blue','green','yellow','purple','orange'],
    numbers: ['one','two','three','four','five','six'],
    verbs: ['run','jump','eat','sleep','think','write'],
  };

  const pad = 40;
  clusters.forEach(cl => {
    const ws = words[cl.label];
    ws.forEach((word,i) => {
      const angle = (i/ws.length)*Math.PI*2;
      const r = 30 + rand()*25;
      const px = pad + cl.cx*(w-2*pad) + Math.cos(angle)*r;
      const py = pad + cl.cy*(h-2*pad) + Math.sin(angle)*r;
      // Dot
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI*2);
      ctx.fillStyle = cl.color; ctx.fill();
      // Label
      ctx.fillStyle = cl.color; ctx.font = '10px "IBM Plex Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(word, px, py - 8);
    });
    // Cluster label
    ctx.fillStyle = cl.color + '44'; ctx.font = '12px Inter';
    ctx.fillText(cl.label, pad + cl.cx*(w-2*pad), pad + cl.cy*(h-2*pad) - 50);
  });
  ctx.textAlign = 'left';
  // Axes
  ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
  ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(pad,h/2); ctx.lineTo(w-pad,h/2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w/2,pad); ctx.lineTo(w/2,h-pad); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.muted; ctx.font = '10px Inter';
  ctx.fillText('dim 1 →', w-80, h/2-6);
  ctx.fillText('dim 2 →', w/2+6, pad+12);
},

/* ── 03 Positional Encoding ── */
'positional-encoding': function(mode){
  const s = setupCanvas('posEncCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'sin';
  const pad = 50, pw = w-2*pad, ph = h-2*pad;
  const positions = 64, dims = 32;

  // Draw heatmap
  const cellW = pw/positions, cellH = ph/dims;
  for(let p=0; p<positions; p++){
    for(let d=0; d<dims; d++){
      let val;
      if(m === 'sin'){
        const freq = 1/Math.pow(10000, (2*Math.floor(d/2))/64);
        val = d%2===0 ? Math.sin(p*freq) : Math.cos(p*freq);
      } else if(m === 'rope'){
        const theta = p / Math.pow(10000, (2*Math.floor(d/2))/64);
        val = Math.sin(theta + d*0.1);
      } else { // alibi
        val = -Math.abs(p - positions/2) * (d+1)/dims * 0.1;
        val = Math.max(-1, Math.min(1, val));
      }
      // Map [-1,1] to color
      const r = val > 0 ? Math.round(200*val) : 0;
      const b = val < 0 ? Math.round(200*(-val)) : 0;
      const g = Math.round(40*(1-Math.abs(val)));
      ctx.fillStyle = `rgb(${r+40},${g+40},${b+40})`;
      ctx.fillRect(pad+p*cellW, pad+d*cellH, cellW+0.5, cellH+0.5);
    }
  }
  // Labels
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Position →', w/2, h-8);
  ctx.save(); ctx.translate(14, h/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('Dimension →', 0, 0); ctx.restore();
  const titles = { sin:'Sinusoidal', rope:'RoPE', alibi:'ALiBi' };
  ctx.font = '13px Inter'; ctx.fillStyle = C.fg;
  ctx.fillText(titles[m] + ' Positional Encoding', w/2, pad-10);
  ctx.textAlign = 'left';
},

/* ── 04 Self-Attention ── */
'self-attention': function(){
  const s = setupCanvas('selfAttnCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const temp = parseFloat(document.getElementById('attnTemp')?.value||1);

  srand(Date.now() & 0xFF);
  const tokens = ['The','cat','sat','on','the','mat','.']; // fixed sequence
  const n = tokens.length;
  const pad = 90, sz = Math.min((w-2*pad)/n, (h-pad-50)/n, 30);
  const ox = (w - n*sz)/2, oy = 50;

  // Random Q*K scores
  const scores = [];
  for(let i=0;i<n;i++){
    scores[i] = [];
    for(let j=0;j<n;j++){
      // Make diagonal + adjacent stronger
      const dist = Math.abs(i-j);
      scores[i][j] = (2-dist*0.3 + (rand()-0.5)*1.5) / temp;
    }
  }
  // Softmax per row
  const weights = scores.map(row => {
    const max = Math.max(...row);
    const exp = row.map(v => Math.exp(v-max));
    const sum = exp.reduce((a,b)=>a+b);
    return exp.map(v => v/sum);
  });

  // Draw heatmap
  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      const v = weights[i][j];
      const r = Math.round(lerp(40,200,v));
      const g = Math.round(lerp(40,80,v));
      const b = Math.round(lerp(60,60,v));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(ox+j*sz, oy+i*sz, sz-1, sz-1);
      // Show value
      if(sz > 20){
        ctx.fillStyle = v > 0.3 ? '#fff' : C.muted;
        ctx.font = '9px "IBM Plex Mono"'; ctx.textAlign = 'center';
        ctx.fillText(v.toFixed(2), ox+j*sz+sz/2, oy+i*sz+sz/2+3);
      }
    }
  }
  // Labels
  ctx.textAlign = 'center'; ctx.font = '11px "IBM Plex Mono"';
  tokens.forEach((t,i) => {
    ctx.fillStyle = C.fg;
    ctx.fillText(t, ox+i*sz+sz/2, oy-6);
    ctx.save(); ctx.translate(ox-6, oy+i*sz+sz/2);
    ctx.rotate(-Math.PI/2); ctx.fillText(t, 0, 0); ctx.restore();
  });
  ctx.textAlign = 'left'; ctx.fillStyle = C.accent; ctx.font = '11px Inter';
  ctx.fillText('Q (rows) attending to K (cols) — softmax(QKᵀ/√d)', ox, h-12);
  ctx.fillStyle = C.muted;
  ctx.fillText(`temperature: ${temp.toFixed(1)}`, w-140, h-12);
},

/* ── 05 Multi-Head Attention ── */
'multi-head-attention': function(mode){
  const s = setupCanvas('mhaCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'mha';

  const configs = {
    mha: { qh:8, kvh:8, label:'MHA — 8 Q heads, 8 KV heads' },
    mqa: { qh:8, kvh:1, label:'MQA — 8 Q heads, 1 KV head' },
    gqa: { qh:8, kvh:2, label:'GQA — 8 Q heads, 2 KV groups' },
  };
  const cfg = configs[m];
  const boxW = 50, boxH = 30, gap = 12;
  const totalW = cfg.qh * (boxW + gap) - gap;
  const startX = (w - totalW)/2;
  const qY = 50, kvY = 140;

  // Title
  ctx.fillStyle = C.fg; ctx.font = '13px Inter'; ctx.textAlign = 'center';
  ctx.fillText(cfg.label, w/2, 28);

  // Draw Q heads
  ctx.font = '10px "IBM Plex Mono"';
  for(let i=0; i<cfg.qh; i++){
    const x = startX + i*(boxW+gap);
    ctx.fillStyle = C.accent + '33'; ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(x, qY, boxW, boxH, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent; ctx.textAlign = 'center';
    ctx.fillText('Q'+i, x+boxW/2, qY+boxH/2+4);
  }
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'left';
  ctx.fillText('Query heads', 10, qY+boxH/2+4);

  // Draw KV heads
  const kvW = m === 'mqa' ? boxW*2 : (m === 'gqa' ? (totalW - (cfg.kvh-1)*gap)/cfg.kvh : boxW);
  const kvStartX = m === 'mqa' ? w/2 - kvW/2 : startX;
  for(let i=0; i<cfg.kvh; i++){
    const x = kvStartX + i*(kvW+gap);
    ctx.fillStyle = C.accent2 + '33'; ctx.strokeStyle = C.accent2; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(x, kvY, kvW, boxH, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent2; ctx.font = '10px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText('K'+i+'/V'+i, x+kvW/2, kvY+boxH/2+4);
  }
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'left';
  ctx.fillText('KV heads', 10, kvY+boxH/2+4);

  // Draw connections
  ctx.globalAlpha = 0.4;
  for(let qi=0; qi<cfg.qh; qi++){
    const qx = startX + qi*(boxW+gap) + boxW/2;
    const kvi = m === 'mha' ? qi : (m === 'mqa' ? 0 : Math.floor(qi / (cfg.qh/cfg.kvh)));
    const kvx = kvStartX + kvi*(kvW+gap) + kvW/2;
    ctx.strokeStyle = C.accent3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(qx, qY+boxH); ctx.lineTo(kvx, kvY); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Memory label
  const kvMem = cfg.kvh;
  ctx.fillStyle = C.muted; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`KV-cache: ${kvMem}/${cfg.qh} of MHA memory (${(kvMem/cfg.qh*100).toFixed(0)}%)`, w/2, h-20);
  ctx.textAlign = 'left';
},

/* ── 06 Feed-Forward Networks ── */
'feed-forward': function(mode){
  const s = setupCanvas('ffnCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'gelu';

  const pad = 60, pw = w-2*pad, ph = h-2*pad;
  const xMin = -4, xMax = 4;
  const funcs = {
    relu: x => Math.max(0,x),
    gelu: x => 0.5*x*(1+Math.tanh(Math.sqrt(2/Math.PI)*(x+0.044715*x*x*x))),
    swish: x => x/(1+Math.exp(-x)),
    swiglu: x => { const s = x/(1+Math.exp(-x)); return s * Math.max(0.1*x, x); }, // simplified
  };
  const fn = funcs[m] || funcs.gelu;

  // Axes
  ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
  const zeroX = pad + (-xMin)/(xMax-xMin)*pw;
  const zeroY = pad + ph*0.6;
  ctx.beginPath(); ctx.moveTo(pad,zeroY); ctx.lineTo(w-pad,zeroY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(zeroX,pad); ctx.lineTo(zeroX,h-pad); ctx.stroke();

  // Ticks
  ctx.fillStyle = C.muted; ctx.font = '9px "IBM Plex Mono"'; ctx.textAlign = 'center';
  for(let t=xMin; t<=xMax; t++){
    const x = pad+(t-xMin)/(xMax-xMin)*pw;
    ctx.fillText(t, x, zeroY+14);
  }

  // Draw function
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
  ctx.beginPath();
  for(let px=0; px<=pw; px++){
    const x = xMin + (px/pw)*(xMax-xMin);
    const y = fn(x);
    const sy = zeroY - y * (ph*0.25);
    if(px===0) ctx.moveTo(pad+px, sy); else ctx.lineTo(pad+px, sy);
  }
  ctx.stroke();

  // Label
  const titles = { relu:'ReLU(x) = max(0, x)', gelu:'GELU(x) ≈ 0.5x(1+tanh(...))', swish:'Swish(x) = x·σ(x)', swiglu:'SwiGLU gate visualization' };
  ctx.fillStyle = C.fg; ctx.font = '13px Inter'; ctx.textAlign = 'center';
  ctx.fillText(titles[m], w/2, pad-8);
  ctx.textAlign = 'left';
},

/* ── 07 Transformer Block ── */
'transformer-block': function(){
  const s = setupCanvas('tfBlockCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  const cx = w/2, boxW = 120, boxH = 32, gap = 12;
  const stages = [
    { y:30, label:'Input x', color:C.muted },
    { y:70, label:'RMSNorm', color:C.accent4 },
    { y:110, label:'Self-Attention', color:C.accent },
    { y:155, label:'+ Residual', color:C.accent2 },
    { y:195, label:'RMSNorm', color:C.accent4 },
    { y:235, label:'FFN (SwiGLU)', color:C.accent3 },
    { y:280, label:'+ Residual', color:C.accent2 },
    { y:320, label:'Output', color:C.muted },
  ];

  stages.forEach((st,i) => {
    const x = cx - boxW/2;
    // Box
    ctx.fillStyle = st.color + '22'; ctx.strokeStyle = st.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(x, st.y, boxW, boxH, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = st.color; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    ctx.fillText(st.label, cx, st.y + boxH/2 + 4);
    // Arrow down
    if(i < stages.length-1){
      const ny = stages[i+1].y;
      ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, st.y+boxH); ctx.lineTo(cx, ny); ctx.stroke();
      // arrowhead
      ctx.beginPath(); ctx.moveTo(cx-4, ny-4); ctx.lineTo(cx, ny); ctx.lineTo(cx+4, ny-4); ctx.stroke();
    }
  });

  // Skip connections (residual arcs)
  ctx.strokeStyle = C.accent2; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  // Skip 1: from Input past Attn to +Residual
  ctx.beginPath();
  ctx.moveTo(cx+boxW/2+10, stages[0].y+boxH/2);
  ctx.quadraticCurveTo(cx+boxW/2+40, stages[1].y+boxH, cx+boxW/2+10, stages[3].y+boxH/2);
  ctx.stroke();
  // Skip 2: from +Residual past FFN to +Residual
  ctx.beginPath();
  ctx.moveTo(cx+boxW/2+10, stages[3].y+boxH/2);
  ctx.quadraticCurveTo(cx+boxW/2+40, stages[4].y+boxH, cx+boxW/2+10, stages[6].y+boxH/2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Labels for skip connections
  ctx.fillStyle = C.accent2; ctx.font = '9px Inter'; ctx.textAlign = 'left';
  ctx.fillText('residual', cx+boxW/2+44, stages[1].y+boxH);
  ctx.fillText('residual', cx+boxW/2+44, stages[4].y+boxH);
  ctx.textAlign = 'left';
},

/* ── 08 Decoder-Only ── */
'decoder-only': function(){
  const s = setupCanvas('decoderCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  const tokens = ['The','cat','sat','on','the','mat'];
  const n = tokens.length;
  const sz = 36, pad = 80;
  const ox = (w - n*sz)/2, oy = 40;

  // Draw causal mask
  ctx.font = '11px Inter'; ctx.textAlign = 'center'; ctx.fillStyle = C.fg;
  ctx.fillText('Causal Attention Mask', w/2, 24);

  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      const canAttend = j <= i;
      ctx.fillStyle = canAttend ? C.accent2 + '55' : C.accent + '15';
      ctx.fillRect(ox+j*sz, oy+i*sz, sz-2, sz-2);
      ctx.fillStyle = canAttend ? C.accent2 : C.muted + '44';
      ctx.font = '10px "IBM Plex Mono"';
      ctx.fillText(canAttend ? '✓' : '×', ox+j*sz+sz/2, oy+i*sz+sz/2+4);
    }
  }
  // Token labels
  ctx.font = '10px "IBM Plex Mono"'; ctx.fillStyle = C.fg;
  tokens.forEach((t,i) => {
    ctx.fillText(t, ox+i*sz+sz/2, oy-6);
    ctx.save(); ctx.translate(ox-8, oy+i*sz+sz/2); ctx.rotate(-Math.PI/2);
    ctx.fillText(t, 0, 0); ctx.restore();
  });

  // Autoregressive arrow at bottom
  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'left';
  ctx.fillText('← can attend to    |    × masked (future tokens)', ox, oy+n*sz+20);
  ctx.textAlign = 'left';
},

/* ── 09 KV-Cache ── */
'kv-cache': function(){
  const s = setupCanvas('kvCacheCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const layers = parseInt(document.getElementById('kvLayers')?.value||16);
  const step = window._kvStep || 0;

  const padL = 80, padR = 20, padT = 40, padB = 30;
  const barH = Math.min(16, (h-padT-padB)/layers - 2);
  const maxTokens = 20;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`KV-Cache — ${layers} layers, ${step} tokens generated`, w/2, 22);

  for(let l=0; l<layers; l++){
    const y = padT + l*(barH+2);
    // Layer label
    ctx.fillStyle = C.muted; ctx.font = '9px "IBM Plex Mono"'; ctx.textAlign = 'right';
    ctx.fillText('Layer '+l, padL-6, y+barH/2+3);
    // Background bar
    const barW = w - padL - padR;
    ctx.fillStyle = C.surface; ctx.strokeStyle = C.border; ctx.lineWidth = 0.5;
    ctx.fillRect(padL, y, barW, barH); ctx.strokeRect(padL, y, barW, barH);
    // Filled portion (K cache)
    const fillW = (step/maxTokens) * barW;
    ctx.fillStyle = C.accent3 + '66';
    ctx.fillRect(padL, y, fillW, barH/2);
    // V cache
    ctx.fillStyle = C.accent4 + '66';
    ctx.fillRect(padL, y+barH/2, fillW, barH/2);
  }
  // Legend
  ctx.textAlign = 'left'; ctx.font = '10px Inter';
  ctx.fillStyle = C.accent3; ctx.fillText('■ K cache', padL, h-8);
  ctx.fillStyle = C.accent4; ctx.fillText('■ V cache', padL+80, h-8);
  const mem = (2 * layers * step * 128 * 2 / 1024).toFixed(1);
  ctx.fillStyle = C.muted; ctx.fillText(`~${mem} KB (d_k=128, FP16)`, padL+170, h-8);
  ctx.textAlign = 'left';
},

/* ── 10 Context Windows ── */
'context-windows': function(mode){
  const s = setupCanvas('ctxCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'full';
  const n = parseInt(document.getElementById('ctxLen')?.value||32);
  const pad = 50, sz = Math.min((w-2*pad)/n, (h-80)/n, 8);
  const ox = (w-n*sz)/2, oy = 40;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  const titles = {full:'Full Attention (O(n²))', sliding:'Sliding Window (w=8)', sparse:'Sparse Attention'};
  ctx.fillText(titles[m]+` — n=${n}`, w/2, 24);

  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      let active = false;
      if(m==='full'){ active = j<=i; }
      else if(m==='sliding'){ active = j<=i && (i-j)<8; }
      else { active = j<=i && ((i-j)<4 || j%8===0); } // sparse: local + strided
      ctx.fillStyle = active ? C.accent2+'88' : C.surface;
      ctx.fillRect(ox+j*sz, oy+i*sz, sz-0.5, sz-0.5);
    }
  }
  const active = m==='full' ? n*(n+1)/2 : m==='sliding' ? Math.min(8,n)*n : 'fewer';
  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Active cells: ${active}${typeof active==='number'?'/'+n*n:''}`, w/2, h-10);
  ctx.textAlign = 'left';
},

/* ── 11 Mixture of Experts ── */
'mixture-of-experts': function(){
  const s = setupCanvas('moeCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const nExperts = parseInt(document.getElementById('moeExperts')?.value||8);

  // Token at top
  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Token x', w/2, 30);

  // Router
  ctx.fillStyle = C.accent4+'22'; ctx.strokeStyle = C.accent4; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(w/2-50, 40, 100, 28, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.accent4; ctx.font = '11px Inter';
  ctx.fillText('Router', w/2, 58);

  // Experts
  const ew = Math.min(60, (w-40)/nExperts-8);
  const totalW = nExperts*(ew+8)-8;
  const exStartX = (w-totalW)/2;
  const eY = 100;
  // Pick top-2 randomly
  srand(window._moeToken||42);
  const weights = Array.from({length:nExperts}, ()=>rand());
  const wSum = weights.reduce((a,b)=>a+b);
  const probs = weights.map(v=>v/wSum);
  const sorted = probs.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v);
  const active = [sorted[0].i, sorted[1].i];

  for(let e=0; e<nExperts; e++){
    const x = exStartX + e*(ew+8);
    const isActive = active.includes(e);
    ctx.fillStyle = isActive ? C.accent2+'33' : C.surface;
    ctx.strokeStyle = isActive ? C.accent2 : C.border;
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.beginPath(); ctx.roundRect(x, eY, ew, 36, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = isActive ? C.accent2 : C.muted;
    ctx.font = '10px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText('E'+e, x+ew/2, eY+16);
    ctx.font = '8px "IBM Plex Mono"';
    ctx.fillText((probs[e]*100).toFixed(0)+'%', x+ew/2, eY+28);
    // Line from router
    ctx.strokeStyle = isActive ? C.accent2 : C.border+'44';
    ctx.lineWidth = isActive ? 2 : 0.5;
    ctx.beginPath(); ctx.moveTo(w/2, 68); ctx.lineTo(x+ew/2, eY); ctx.stroke();
  }

  // Output
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('→ Weighted sum of top-2 expert outputs →', w/2, eY+60);
  ctx.fillStyle = C.muted; ctx.font = '10px Inter';
  ctx.fillText(`${nExperts} experts, top-2 active → ${(2/nExperts*100).toFixed(0)}% compute used`, w/2, h-14);
  ctx.textAlign = 'left';
},

/* ── 12 Scaling Laws ── */
'scaling-laws': function(mode){
  const s = setupCanvas('scalingCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'params';

  const pad = 60, pw = w-2*pad, ph = h-2*pad-10;
  const configs = {
    params: { xlabel:'Parameters (log)', ylabel:'Loss', title:'Loss vs Parameters', a:5, b:0.076 },
    data: { xlabel:'Tokens (log)', ylabel:'Loss', title:'Loss vs Training Data', a:5, b:0.095 },
    compute: { xlabel:'FLOPs (log)', ylabel:'Loss', title:'Loss vs Compute', a:6, b:0.05 },
  };
  const cfg = configs[m];

  // Axes
  ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(cfg.xlabel, w/2, h-12);
  ctx.fillText(cfg.title, w/2, pad-10);
  ctx.save(); ctx.translate(16,h/2); ctx.rotate(-Math.PI/2);
  ctx.fillText(cfg.ylabel, 0, 0); ctx.restore();

  // Power law curve
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
  ctx.beginPath();
  for(let px=0; px<=pw; px++){
    const t = px/pw;
    const loss = cfg.a * Math.pow(0.01+t*0.99, -cfg.b) - (cfg.a-3);
    const sy = pad + (1 - (loss-1.5)/2.5)*ph;
    if(px===0) ctx.moveTo(pad+px, Math.max(pad,Math.min(h-pad,sy)));
    else ctx.lineTo(pad+px, Math.max(pad,Math.min(h-pad,sy)));
  }
  ctx.stroke();

  // Scatter points
  srand(123);
  ctx.fillStyle = C.accent3;
  for(let i=0;i<12;i++){
    const t = 0.05+rand()*0.9;
    const loss = cfg.a * Math.pow(0.01+t*0.99, -cfg.b) - (cfg.a-3) + (rand()-0.5)*0.15;
    const sx = pad + t*pw;
    const sy = pad + (1 - (loss-1.5)/2.5)*ph;
    ctx.beginPath(); ctx.arc(sx, Math.max(pad,Math.min(h-pad,sy)), 4, 0, Math.PI*2); ctx.fill();
  }
  ctx.textAlign = 'left';
},

/* ── 13 Pre-Training ── */
'pre-training': function(){
  const s = setupCanvas('pretrainCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const step = window._pretrainStep || 0;
  const maxSteps = 200;

  const pad = 60, pw = w-2*pad, ph = h-2*pad;
  // Axes
  ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Training Steps', w/2, h-10);
  ctx.fillText('Training Loss Curve', w/2, pad-10);
  ctx.save(); ctx.translate(16,h/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('Loss', 0, 0); ctx.restore();

  // Loss curve
  srand(42);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let t=0; t<=Math.min(step,maxSteps); t++){
    const x = pad + (t/maxSteps)*pw;
    const base = 4.5*Math.exp(-t*0.02) + 1.8;
    const noise = (rand()-0.5)*0.15*Math.exp(-t*0.01);
    const y = pad + (1-(base+noise-1.5)/3.5)*ph;
    if(t===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();

  // LR schedule (cosine) - secondary axis
  if(step > 0){
    ctx.strokeStyle = C.accent3+'88'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath();
    for(let t=0; t<=Math.min(step,maxSteps); t++){
      const x = pad + (t/maxSteps)*pw;
      const warmup = Math.min(1, t/10);
      const cosine = 0.5*(1+Math.cos(Math.PI*t/maxSteps));
      const lr = warmup * cosine;
      const y = pad + (1-lr)*ph;
      if(t===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.accent3; ctx.font = '9px Inter';
    ctx.textAlign = 'right'; ctx.fillText('LR schedule', w-pad, pad+12);
  }
  ctx.textAlign = 'left';
},

/* ── 14 Fine-Tuning ── */
'fine-tuning': function(mode){
  const s = setupCanvas('finetuneCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'base';

  const pad = 50, pw = w-2*pad;
  const labels = ['helpful','code','math','creative','toxic','refusal','factual','concise'];
  const n = labels.length;
  const barH = 18, gap = 6;
  const startY = 50;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  const titles = {base:'Base Model Distribution', sft:'After SFT', overfit:'Overfitted (catastrophic forgetting)'};
  ctx.fillText(titles[m], w/2, 30);

  srand(42);
  const baseVals = labels.map(() => 0.3 + rand()*0.4);
  const sftVals = [0.85, 0.75, 0.7, 0.65, 0.05, 0.8, 0.8, 0.7];
  const overfitVals = [0.9, 0.3, 0.2, 0.4, 0.02, 0.95, 0.3, 0.85];

  const vals = m === 'base' ? baseVals : (m === 'sft' ? sftVals : overfitVals);

  labels.forEach((label, i) => {
    const y = startY + i*(barH+gap);
    ctx.fillStyle = C.muted; ctx.font = '10px "IBM Plex Mono"'; ctx.textAlign = 'right';
    ctx.fillText(label, pad-6, y+barH/2+4);
    // Bar bg
    ctx.fillStyle = C.surface;
    ctx.fillRect(pad, y, pw, barH);
    // Bar fill
    const v = vals[i];
    const col = label === 'toxic' ? C.accent : (v > 0.6 ? C.accent2 : C.accent3);
    ctx.fillStyle = col + '88';
    ctx.fillRect(pad, y, pw*v, barH);
    // Value
    ctx.fillStyle = C.fg; ctx.font = '9px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText((v*100).toFixed(0)+'%', pad+pw*v+4, y+barH/2+3);
  });
  ctx.textAlign = 'left';
},

/* ── 15 LoRA & QLoRA ── */
'lora-qlora': function(){
  const s = setupCanvas('loraCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const rank = parseInt(document.getElementById('loraRank')?.value||8);
  const alpha = parseInt(document.getElementById('loraAlpha')?.value||16);

  const d = 64; // visual dimension
  const cx = w/2, cy = h/2;
  const scale = 3;

  // Draw W₀ (large, frozen)
  const w0x = 80, w0y = 40, w0w = d*scale, w0h = d*scale;
  ctx.fillStyle = C.muted + '22'; ctx.strokeStyle = C.muted; ctx.lineWidth = 1;
  ctx.fillRect(w0x, w0y, Math.min(w0w,160), Math.min(w0h,160));
  ctx.strokeRect(w0x, w0y, Math.min(w0w,160), Math.min(w0h,160));
  ctx.fillStyle = C.muted; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('W₀ (frozen)', w0x+80, w0y-6);
  ctx.font = '9px "IBM Plex Mono"';
  ctx.fillText(`${d}×${d}`, w0x+80, w0y+85);

  // Plus sign
  ctx.fillStyle = C.fg; ctx.font = '20px Inter';
  ctx.fillText('+', w0x+190, w0y+80);

  // Draw B matrix
  const bx = w0x+220, by = w0y;
  const bw = rank*scale, bh = Math.min(d*scale,160);
  ctx.fillStyle = C.accent+'33'; ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
  ctx.fillRect(bx, by, Math.max(bw,20), bh);
  ctx.strokeRect(bx, by, Math.max(bw,20), bh);
  ctx.fillStyle = C.accent; ctx.font = '11px Inter';
  ctx.fillText('B', bx+Math.max(bw,20)/2, by-6);
  ctx.font = '9px "IBM Plex Mono"';
  ctx.fillText(`${d}×${rank}`, bx+Math.max(bw,20)/2, by+bh+14);

  // × sign
  ctx.fillStyle = C.fg; ctx.font = '16px Inter';
  ctx.fillText('×', bx+Math.max(bw,20)+14, by+80);

  // Draw A matrix
  const ax = bx+Math.max(bw,20)+30, ay = w0y+40;
  const aw = Math.min(d*scale,160), ah = rank*scale;
  ctx.fillStyle = C.accent3+'33'; ctx.strokeStyle = C.accent3; ctx.lineWidth = 1.5;
  ctx.fillRect(ax, ay, aw, Math.max(ah,16));
  ctx.strokeRect(ax, ay, aw, Math.max(ah,16));
  ctx.fillStyle = C.accent3; ctx.font = '11px Inter';
  ctx.fillText('A', ax+aw/2, ay-6);
  ctx.font = '9px "IBM Plex Mono"';
  ctx.fillText(`${rank}×${d}`, ax+aw/2, ay+Math.max(ah,16)+14);

  // Stats
  const fullParams = d*d;
  const loraParams = 2*d*rank;
  const pct = (loraParams/fullParams*100).toFixed(1);
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'left';
  ctx.fillText(`Rank r=${rank}, α=${alpha}, scale=α/r=${(alpha/rank).toFixed(1)}`, 20, h-30);
  ctx.fillText(`Trainable: ${loraParams} / ${fullParams} = ${pct}% of full matrix`, 20, h-12);
  ctx.textAlign = 'left';
},

/* ── 16 RLHF ── */
'rlhf': function(stage){
  const s = setupCanvas('rlhfCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const st = stage || 1;

  const boxes = [
    [
      { x:80, y:40, w:140, h:36, label:'Base Model', color:C.muted },
      { x:280, y:40, w:140, h:36, label:'SFT Dataset', color:C.accent3 },
      { x:480, y:40, w:140, h:36, label:'SFT Model', color:C.accent2 },
    ],
    [
      { x:40, y:120, w:120, h:36, label:'Prompt', color:C.muted },
      { x:190, y:100, w:120, h:30, label:'Response A ✓', color:C.accent2 },
      { x:190, y:140, w:120, h:30, label:'Response B ✗', color:C.accent },
      { x:380, y:120, w:140, h:36, label:'Reward Model', color:C.accent4 },
    ],
    [
      { x:40, y:210, w:120, h:36, label:'SFT Model', color:C.accent2 },
      { x:210, y:210, w:130, h:36, label:'Reward Model', color:C.accent4 },
      { x:390, y:210, w:100, h:36, label:'PPO', color:C.accent3 },
      { x:540, y:210, w:120, h:36, label:'RLHF Model', color:C.accent },
    ],
  ];

  const titles = ['Stage 1: Supervised Fine-Tuning', 'Stage 2: Reward Model Training', 'Stage 3: PPO Optimization'];

  boxes.forEach((stage_boxes, si) => {
    const isActive = si < st;
    const opacity = isActive ? 'ff' : '44';
    ctx.fillStyle = (isActive ? C.fg : C.muted); ctx.font = '10px Inter'; ctx.textAlign = 'left';
    ctx.fillText(titles[si], 10, stage_boxes[0].y - 4);

    stage_boxes.forEach((b, bi) => {
      ctx.fillStyle = b.color + (isActive ? '33' : '11');
      ctx.strokeStyle = b.color + opacity; ctx.lineWidth = isActive ? 1.5 : 0.5;
      ctx.beginPath(); ctx.roundRect(b.x, b.y, b.w, b.h, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = b.color + opacity; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(b.label, b.x+b.w/2, b.y+b.h/2+4);
      // Arrow to next
      if(bi < stage_boxes.length-1){
        const nb = stage_boxes[bi+1];
        const fromX = b.x+b.w, toX = nb.x;
        const fromY = b.y+b.h/2, toY = nb.y+nb.h/2;
        ctx.strokeStyle = C.muted + opacity; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(fromX, fromY); ctx.lineTo(toX, toY); ctx.stroke();
      }
    });
  });
  ctx.textAlign = 'left';
},

/* ── 17 DPO ── */
'dpo': function(){
  const s = setupCanvas('dpoCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const beta = parseFloat(document.getElementById('dpoBeta')?.value||0.1);
  const step = window._dpoStep || 0;

  const pad = 50, pw = w-2*pad;
  // Show chosen vs rejected log-prob bars
  const chosenBase = -2.5, rejectedBase = -2.8;
  const chosenNow = chosenBase + step*0.15;
  const rejectedNow = rejectedBase - step*0.1;
  const margin = chosenNow - rejectedNow;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`DPO Optimization — β=${beta.toFixed(2)}, step ${step}`, w/2, 26);

  // Chosen bar
  const barY1 = 60, barY2 = 100, barH = 28;
  const mapX = v => pad + (v+4)/5*pw;

  ctx.fillStyle = C.accent2+'33'; ctx.strokeStyle = C.accent2; ctx.lineWidth = 1.5;
  ctx.fillRect(pad, barY1, mapX(chosenNow)-pad, barH);
  ctx.strokeRect(pad, barY1, mapX(chosenNow)-pad, barH);
  ctx.fillStyle = C.accent2; ctx.font = '11px Inter'; ctx.textAlign = 'left';
  ctx.fillText(`Chosen: log π(y_w) = ${chosenNow.toFixed(2)}`, pad+6, barY1+barH/2+4);

  ctx.fillStyle = C.accent+'33'; ctx.strokeStyle = C.accent; ctx.lineWidth = 1.5;
  ctx.fillRect(pad, barY2, mapX(rejectedNow)-pad, barH);
  ctx.strokeRect(pad, barY2, mapX(rejectedNow)-pad, barH);
  ctx.fillStyle = C.accent; ctx.font = '11px Inter';
  ctx.fillText(`Rejected: log π(y_l) = ${rejectedNow.toFixed(2)}`, pad+6, barY2+barH/2+4);

  // Margin
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Margin: ${margin.toFixed(2)} (higher = better separation)`, w/2, barY2+barH+24);

  // Sigmoid of margin
  const sigVal = 1/(1+Math.exp(-beta*margin));
  const lossVal = -Math.log(sigVal);
  ctx.fillStyle = C.muted; ctx.font = '10px Inter';
  ctx.fillText(`σ(β·margin) = ${sigVal.toFixed(3)}    Loss = ${lossVal.toFixed(3)}`, w/2, h-14);
  ctx.textAlign = 'left';
},

/* ── 18 Data Curation ── */
'data-curation': function(){
  const s = setupCanvas('dataCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  const stages = [
    { label:'Raw Crawl', count:'250B pages', pct:1.0, color:C.muted },
    { label:'Language Filter', count:'~150B', pct:0.6, color:C.accent3 },
    { label:'Quality Classifier', count:'~40B', pct:0.16, color:C.accent },
    { label:'Deduplication', count:'~25B', pct:0.10, color:C.accent4 },
    { label:'Decontamination', count:'~24B', pct:0.096, color:C.accent2 },
    { label:'Final Dataset', count:'~15T tokens', pct:0.08, color:C.accent2 },
  ];

  const pad = 40, maxW = w-2*pad-120;
  const barH = 28, gap = 10;
  const startY = 30;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Data Curation Pipeline — Funnel', w/2, 18);

  stages.forEach((st, i) => {
    const y = startY + i*(barH+gap);
    const barW = maxW * st.pct;
    const x = pad + (maxW-barW)/2;
    // Bar
    ctx.fillStyle = st.color + '33'; ctx.strokeStyle = st.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(x, y, barW, barH, 4); ctx.fill(); ctx.stroke();
    // Label
    ctx.fillStyle = st.color; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(st.label, pad+maxW/2, y+barH/2+4);
    // Count
    ctx.fillStyle = C.muted; ctx.font = '10px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText(st.count, x+barW+8, y+barH/2+4);
  });
  ctx.textAlign = 'left';
},

/* ── 19 Decoding Strategies ── */
'decoding-strategies': function(){
  const s = setupCanvas('decodingCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const beamW = parseInt(document.getElementById('beamWidth')?.value||3);
  const step = window._decodingStep || 0;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Beam Search — width=${beamW}`, w/2, 20);

  // Draw beam search tree
  srand(77);
  const words = ['the','a','is','was','cat','dog','sat','ran','on','in','big','red','and','tree'];
  const nodeR = 14, levelH = 50;
  const levels = Math.min(step+1, 5);

  function drawNode(x, y, word, score, active){
    ctx.fillStyle = active ? C.accent2+'33' : C.surface;
    ctx.strokeStyle = active ? C.accent2 : C.border;
    ctx.lineWidth = active ? 2 : 1;
    ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = active ? C.accent2 : C.fg;
    ctx.font = '8px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText(word, x, y+3);
    ctx.fillStyle = C.muted; ctx.font = '7px "IBM Plex Mono"';
    ctx.fillText(score.toFixed(1), x, y+nodeR+10);
  }

  // Simple tree
  const root = { x:w/2, y:50, word:'<s>', score:0, children:[] };
  let currentLevel = [root];
  for(let lv=0; lv<levels; lv++){
    const nextLevel = [];
    const spread = (w-80) / Math.max(currentLevel.length*beamW, 1);
    let idx = 0;
    currentLevel.forEach(node => {
      for(let b=0; b<Math.min(beamW,3); b++){
        const childX = 40 + idx*spread + spread/2;
        const childY = node.y + levelH;
        const word = words[(lv*3+b+Math.floor(rand()*5)) % words.length];
        const score = node.score - (0.5+rand()*2);
        const child = { x:childX, y:childY, word, score, parent:node };
        nextLevel.push(child);
        idx++;
      }
    });
    // Keep top beamW
    nextLevel.sort((a,b)=>b.score-a.score);
    currentLevel = nextLevel.slice(0, beamW);
  }

  // Draw connections and nodes (BFS from root)
  function drawTree(node, depth){
    drawNode(node.x, node.y, node.word, node.score, depth < levels);
    if(node.children) node.children.forEach(c => {
      ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(node.x, node.y+nodeR); ctx.lineTo(c.x, c.y-nodeR); ctx.stroke();
      drawTree(c, depth+1);
    });
  }
  drawNode(root.x, root.y, root.word, root.score, true);
  currentLevel.forEach(node => {
    // Trace back to draw path
    let n = node;
    while(n.parent){
      ctx.strokeStyle = C.accent2+'88'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(n.x, n.y-nodeR); ctx.lineTo(n.parent.x, n.parent.y+nodeR); ctx.stroke();
      drawNode(n.x, n.y, n.word, n.score, true);
      n = n.parent;
    }
  });

  ctx.textAlign = 'left';
},

/* ── 20 Sampling ── */
'sampling': function(){
  const s = setupCanvas('samplingCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);

  const temp = parseFloat(document.getElementById('sampTemp')?.value||1);
  const topK = parseInt(document.getElementById('sampTopK')?.value||50);
  const topP = parseFloat(document.getElementById('sampTopP')?.value||1);

  // Raw logits for ~20 tokens
  const rawLogits = [3.2, 2.8, 2.5, 2.1, 1.8, 1.5, 1.2, 0.9, 0.6, 0.4, 0.2, 0.0, -0.2, -0.5, -0.8, -1.2, -1.5, -2.0, -2.5, -3.0];
  const tokenLabels = ['the','cat','a','sat','is','dog','on','was','in','big','red','ran','and','but','at','to','my','or','so','up'];
  const n = rawLogits.length;

  // Apply temperature
  const scaled = rawLogits.map(l => l/temp);
  // Softmax
  const maxL = Math.max(...scaled);
  const exps = scaled.map(l => Math.exp(l-maxL));
  const sumExp = exps.reduce((a,b)=>a+b);
  let probs = exps.map(e => e/sumExp);

  // Apply top-K
  const sorted = probs.map((p,i)=>({p,i})).sort((a,b)=>b.p-a.p);
  if(topK < n){
    for(let i=topK; i<n; i++) probs[sorted[i].i] = 0;
  }
  // Apply top-P
  let cumSum = 0;
  for(let i=0; i<n; i++){
    cumSum += sorted[i].p;
    if(cumSum > topP){
      for(let j=i+1; j<n; j++) probs[sorted[j].i] = 0;
      break;
    }
  }
  // Renormalize
  const probSum = probs.reduce((a,b)=>a+b);
  if(probSum > 0) probs = probs.map(p => p/probSum);

  // Draw bars
  const pad = 50, barW = (w-2*pad)/n - 2, maxBarH = h-100;
  const maxProb = Math.max(...probs, 0.01);

  probs.forEach((p, i) => {
    const x = pad + i*(barW+2);
    const barH = (p/maxProb)*maxBarH;
    const isActive = p > 0;
    ctx.fillStyle = isActive ? C.accent+'88' : C.surface;
    ctx.fillRect(x, h-50-barH, barW, barH);
    // Label
    ctx.fillStyle = isActive ? C.fg : C.muted+'66';
    ctx.font = '7px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.save(); ctx.translate(x+barW/2, h-36); ctx.rotate(-Math.PI/4);
    ctx.fillText(tokenLabels[i], 0, 0); ctx.restore();
    // Prob value
    if(p > 0.01){
      ctx.fillStyle = C.accent; ctx.font = '7px "IBM Plex Mono"'; ctx.textAlign = 'center';
      ctx.fillText((p*100).toFixed(0)+'%', x+barW/2, h-52-barH);
    }
  });

  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`T=${temp.toFixed(1)}  top-K=${topK}  top-P=${topP.toFixed(2)}`, w/2, 20);
  ctx.textAlign = 'left';
},

/* ── 21 Speculative Decoding ── */
'speculative-decoding': function(){
  const s = setupCanvas('specCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const K = parseInt(document.getElementById('specK')?.value||4);

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Speculative Decoding — K=${K} draft tokens`, w/2, 22);

  const pad = 40, rowH = 40;
  // Standard autoregressive
  const stdY = 55;
  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'left';
  ctx.fillText('Standard:', pad, stdY+14);
  for(let i=0; i<6; i++){
    const x = pad+80 + i*85;
    ctx.fillStyle = C.accent+'33'; ctx.strokeStyle = C.accent; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(x, stdY, 75, 24, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent; ctx.font = '9px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText(`token ${i+1}`, x+37, stdY+15);
    ctx.fillStyle = C.muted; ctx.font = '7px Inter';
    ctx.fillText('full model', x+37, stdY+36);
  }

  // Speculative
  const specY = 130;
  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'left';
  ctx.fillText('Speculative:', pad, specY+14);

  // Draft phase
  srand(Date.now()&0xFF);
  const accepted = Math.floor(rand()*K) + 1;
  for(let i=0; i<K; i++){
    const x = pad+80 + i*65;
    const ok = i < accepted;
    ctx.fillStyle = C.accent3+'33'; ctx.strokeStyle = C.accent3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(x, specY, 55, 24, 3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent3; ctx.font = '8px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText(`draft ${i+1}`, x+27, specY+10);
    ctx.fillStyle = ok ? C.accent2 : C.accent;
    ctx.fillText(ok ? '✓ accept' : '✗ reject', x+27, specY+22);
  }
  // Verify block
  const vx = pad+80 + K*65 + 10;
  ctx.fillStyle = C.accent2+'33'; ctx.strokeStyle = C.accent2; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(vx, specY, 80, 24, 3); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.accent2; ctx.font = '8px "IBM Plex Mono"'; ctx.textAlign = 'center';
  ctx.fillText('verify all', vx+40, specY+15);

  // Summary
  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Result: ${accepted}/${K} accepted → ${accepted+1} tokens in ~1 forward pass`, w/2, specY+60);
  ctx.fillStyle = C.accent2; ctx.font = '10px Inter';
  ctx.fillText(`Speedup: ~${((accepted+1)/1).toFixed(1)}× vs standard`, w/2, specY+78);
  ctx.textAlign = 'left';
},

/* ── 22 Quantization ── */
'quantization': function(mode){
  const s = setupCanvas('quantCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'fp16';

  const configs = {
    fp16: { bits:16, levels:65536, label:'FP16 (16-bit)', color:C.accent3, bytes:2 },
    int8: { bits:8, levels:256, label:'INT8 (8-bit)', color:C.accent2, bytes:1 },
    int4: { bits:4, levels:16, label:'INT4 (4-bit)', color:C.accent, bytes:0.5 },
  };
  const cfg = configs[m];

  // Draw a "wave" of weights with quantization grid
  const pad = 50, pw = w-2*pad, ph = h-120;
  const nWeights = 100;

  // Draw continuous curve
  srand(42);
  const weights = [];
  for(let i=0;i<nWeights;i++){ weights.push(randN()*0.5); }

  // Quantization grid
  const gridLines = Math.min(cfg.levels, 32);
  const wMin = -2, wMax = 2;
  const step = (wMax-wMin)/gridLines;
  ctx.strokeStyle = C.muted+'33'; ctx.lineWidth = 0.5;
  for(let g=0;g<=gridLines;g++){
    const v = wMin + g*step;
    const y = pad+10 + (1-(v-wMin)/(wMax-wMin))*ph;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w-pad, y); ctx.stroke();
  }

  // Draw original weights
  ctx.strokeStyle = C.muted+'66'; ctx.lineWidth = 1;
  ctx.beginPath();
  weights.forEach((v, i) => {
    const x = pad + (i/nWeights)*pw;
    const y = pad+10 + (1-(v-wMin)/(wMax-wMin))*ph;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Draw quantized weights
  ctx.strokeStyle = cfg.color; ctx.lineWidth = 2;
  ctx.beginPath();
  weights.forEach((v, i) => {
    const q = Math.round((v-wMin)/step)*step + wMin;
    const x = pad + (i/nWeights)*pw;
    const y = pad+10 + (1-(q-wMin)/(wMax-wMin))*ph;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Error highlight
  const errors = weights.map(v => {
    const q = Math.round((v-wMin)/step)*step + wMin;
    return Math.abs(v-q);
  });
  const avgErr = errors.reduce((a,b)=>a+b)/errors.length;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(cfg.label, w/2, 22);
  ctx.fillStyle = C.muted; ctx.font = '10px Inter';
  ctx.fillText(`${cfg.bits}-bit → ${cfg.levels} distinct levels → ${cfg.bytes}B per weight → avg error: ${avgErr.toFixed(4)}`, w/2, h-16);
  ctx.fillText(`70B model: ${(70*cfg.bytes).toFixed(0)} GB`, w/2, h-34);

  // Legend
  ctx.font = '9px Inter'; ctx.textAlign = 'left';
  ctx.fillStyle = C.muted; ctx.fillText('— original (continuous)', pad, h-50);
  ctx.fillStyle = cfg.color; ctx.fillText('— quantized', pad+150, h-50);
  ctx.textAlign = 'left';
},

/* ── 23 KV-Cache Optimization ── */
'kv-cache-opt': function(mode){
  const s = setupCanvas('kvOptCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'paged';

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  const titles = { contiguous:'Contiguous Allocation (naive)', paged:'PagedAttention' };
  ctx.fillText(titles[m] || 'PagedAttention', w/2, 22);

  const pad = 30, blockW = 28, blockH = 20, gap = 2;
  const cols = Math.floor((w-2*pad)/(blockW+gap));
  const rows = 8;
  const startY = 40;

  if(m === 'contiguous'){
    // 3 requests with different lengths, pre-allocated to max
    const reqs = [
      { len:5, max:12, color:C.accent },
      { len:8, max:12, color:C.accent2 },
      { len:3, max:12, color:C.accent3 },
    ];
    let row = 0;
    reqs.forEach((req, ri) => {
      for(let c=0; c<req.max && c<cols; c++){
        const x = pad + c*(blockW+gap);
        const y = startY + row*(blockH+gap+20);
        const active = c < req.len;
        ctx.fillStyle = active ? req.color+'55' : C.surface;
        ctx.strokeStyle = active ? req.color : C.border;
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, blockW, blockH);
        ctx.strokeRect(x, y, blockW, blockH);
      }
      ctx.fillStyle = C.muted; ctx.font = '9px Inter'; ctx.textAlign = 'left';
      ctx.fillText(`Req ${ri+1}: ${req.len}/${req.max} used → ${((1-req.len/req.max)*100).toFixed(0)}% wasted`, pad, startY+row*(blockH+gap+20)+blockH+14);
      row++;
    });
    ctx.fillStyle = C.accent; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    ctx.fillText('⚠ Pre-allocates max_len per request → memory fragmentation', w/2, h-14);
  } else {
    // Paged: blocks allocated on-demand, interleaved
    srand(42);
    const blocks = [];
    const reqColors = [C.accent, C.accent2, C.accent3, C.accent4];
    const reqLens = [5, 8, 3, 6];
    reqLens.forEach((len, ri) => {
      for(let b=0; b<len; b++) blocks.push({ req:ri, color:reqColors[ri] });
    });
    // Shuffle to show non-contiguous
    for(let i=blocks.length-1;i>0;i--){
      const j=Math.floor(rand()*i); [blocks[i],blocks[j]]=[blocks[j],blocks[i]];
    }
    // Fill grid
    for(let i=0;i<rows*cols;i++){
      const col = i%cols, row = Math.floor(i/cols);
      const x = pad + col*(blockW+gap);
      const y = startY + row*(blockH+gap);
      if(i < blocks.length){
        ctx.fillStyle = blocks[i].color+'55';
        ctx.strokeStyle = blocks[i].color;
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, blockW, blockH);
        ctx.strokeRect(x, y, blockW, blockH);
        ctx.fillStyle = blocks[i].color; ctx.font = '7px "IBM Plex Mono"'; ctx.textAlign = 'center';
        ctx.fillText('R'+blocks[i].req, x+blockW/2, y+blockH/2+3);
      } else {
        ctx.fillStyle = C.surface;
        ctx.strokeStyle = C.border; ctx.lineWidth = 0.5;
        ctx.fillRect(x, y, blockW, blockH);
        ctx.strokeRect(x, y, blockW, blockH);
      }
    }
    ctx.fillStyle = C.accent2; ctx.font = '11px Inter'; ctx.textAlign = 'center';
    ctx.fillText('✓ Blocks allocated on-demand, no fragmentation, ~0% waste', w/2, h-14);
  }
  ctx.textAlign = 'left';
},

/* ── 24 Batching & Throughput ── */
'batching': function(mode){
  const s = setupCanvas('batchCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'continuous';

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText(m==='static' ? 'Static Batching' : 'Continuous Batching', w/2, 22);

  const pad = 70, pw = w-pad-20;
  const reqColors = [C.accent, C.accent2, C.accent3, C.accent4, '#e07020'];
  const reqs = [
    {start:0, prefill:2, decode:5},
    {start:0, prefill:3, decode:8},
    {start:0, prefill:1, decode:3},
    {start:4, prefill:2, decode:4},
    {start:6, prefill:1, decode:6},
  ];
  const rowH = 30, gap = 6;

  if(m === 'static'){
    // All start together, padded to longest
    const maxEnd = Math.max(...reqs.slice(0,3).map(r=>r.prefill+r.decode));
    for(let i=0;i<3;i++){
      const y = 45 + i*(rowH+gap);
      const r = reqs[i];
      ctx.fillStyle = C.muted; ctx.font = '9px Inter'; ctx.textAlign = 'right';
      ctx.fillText(`Req ${i+1}`, pad-6, y+rowH/2+3);
      // Prefill
      const scale = pw/maxEnd;
      ctx.fillStyle = reqColors[i]+'88';
      ctx.fillRect(pad, y, r.prefill*scale, rowH);
      // Decode
      ctx.fillStyle = reqColors[i]+'55';
      ctx.fillRect(pad+r.prefill*scale, y, r.decode*scale, rowH);
      // Padding
      ctx.fillStyle = C.surface;
      ctx.fillRect(pad+(r.prefill+r.decode)*scale, y, (maxEnd-r.prefill-r.decode)*scale, rowH);
      ctx.strokeStyle = C.border; ctx.lineWidth = 0.5;
      ctx.strokeRect(pad, y, maxEnd*scale, rowH);
    }
    ctx.fillStyle = C.accent; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('⚠ Batch 2 waits for Batch 1 to finish. GPU idle on padding.', w/2, h-14);
  } else {
    // Continuous: requests arrive and leave dynamically
    const scale = pw/16;
    for(let i=0;i<5;i++){
      const y = 40 + i*(rowH+gap);
      const r = reqs[i];
      ctx.fillStyle = C.muted; ctx.font = '9px Inter'; ctx.textAlign = 'right';
      ctx.fillText(`Req ${i+1}`, pad-6, y+rowH/2+3);
      // Prefill
      ctx.fillStyle = reqColors[i]+'88';
      ctx.fillRect(pad+r.start*scale, y, r.prefill*scale, rowH);
      // Decode
      ctx.fillStyle = reqColors[i]+'55';
      ctx.fillRect(pad+(r.start+r.prefill)*scale, y, r.decode*scale, rowH);
      ctx.strokeStyle = reqColors[i]; ctx.lineWidth = 1;
      ctx.strokeRect(pad+r.start*scale, y, (r.prefill+r.decode)*scale, rowH);
    }
    // Time axis
    ctx.strokeStyle = C.muted; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, h-30); ctx.lineTo(w-20, h-30); ctx.stroke();
    ctx.fillStyle = C.muted; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    for(let t=0;t<=16;t+=2) ctx.fillText(t, pad+t*scale, h-18);
    ctx.fillStyle = C.accent2; ctx.font = '10px Inter';
    ctx.fillText('✓ New requests join mid-batch. GPU always busy.', w/2, h-4);
  }
  ctx.textAlign = 'left';
},

/* ── 25 Prompt Engineering ── */
'prompt-engineering': function(mode){
  const s = setupCanvas('promptCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'zero';

  const pad = 30;
  const blocks = {
    zero: [
      { label:'System', text:'You are a helpful assistant.', color:C.accent4, h:40 },
      { label:'User', text:'Translate "hello" to French.', color:C.accent3, h:40 },
      { label:'Assistant', text:'Bonjour.', color:C.accent2, h:35 },
    ],
    few: [
      { label:'System', text:'Translate English to French.', color:C.accent4, h:35 },
      { label:'User', text:'hello → bonjour', color:C.muted, h:30 },
      { label:'User', text:'goodbye → au revoir', color:C.muted, h:30 },
      { label:'User', text:'thank you → ?', color:C.accent3, h:30 },
      { label:'Assistant', text:'merci', color:C.accent2, h:30 },
    ],
    cot: [
      { label:'System', text:'Think step by step.', color:C.accent4, h:35 },
      { label:'User', text:'If a train goes 120km in 1.5h, speed in m/s?', color:C.accent3, h:35 },
      { label:'Assistant', text:'Step 1: 120/1.5 = 80 km/h', color:C.accent2, h:30 },
      { label:'', text:'Step 2: 80 × 1000/3600 = 22.2 m/s', color:C.accent2, h:30 },
      { label:'', text:'Answer: 22.2 m/s', color:C.accent, h:30 },
    ],
  };
  const items = blocks[m] || blocks.zero;

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  const titles = { zero:'Zero-Shot Prompting', few:'Few-Shot Prompting', cot:'Chain-of-Thought' };
  ctx.fillText(titles[m], w/2, 22);

  let y = 40;
  items.forEach(item => {
    ctx.fillStyle = item.color+'22'; ctx.strokeStyle = item.color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(pad, y, w-2*pad, item.h, 6); ctx.fill(); ctx.stroke();
    if(item.label){
      ctx.fillStyle = item.color; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'left';
      ctx.fillText(item.label, pad+10, y+16);
    }
    ctx.fillStyle = C.fg; ctx.font = '11px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText(item.text, pad+10+(item.label?60:0), y+item.h/2+4);
    y += item.h + 6;
  });
  ctx.textAlign = 'left';
},

/* ── 26 RAG ── */
'rag': function(){
  const s = setupCanvas('ragCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const step = window._ragStep || 0;

  // Spread stages across full width with padding
  const pad = 30, boxW = 90, boxH = 50;
  const gap = (w - 2*pad - 6*boxW) / 5;
  const stages = [
    { label:'Query', icon:'?', color:C.accent3 },
    { label:'Embed', icon:'→', color:C.accent4 },
    { label:'Search', icon:'🔍', color:C.accent },
    { label:'Rerank', icon:'↕', color:C.accent2 },
    { label:'Augment', icon:'+', color:C.accent3 },
    { label:'Generate', icon:'✦', color:C.accent2 },
  ];
  stages.forEach((st,i) => { st.x = pad + i*(boxW+gap); });
  const y = 40;

  stages.forEach((st, i) => {
    const reached = i <= step;
    const active = i === step;
    ctx.fillStyle = reached ? st.color+(active?'44':'22') : C.surface;
    ctx.strokeStyle = reached ? st.color : C.border;
    ctx.lineWidth = active ? 2.5 : 1.5;
    ctx.beginPath(); ctx.roundRect(st.x, y, boxW, boxH, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = reached ? st.color : C.muted+'66';
    ctx.font = active ? 'bold 20px Inter' : '18px Inter'; ctx.textAlign = 'center';
    ctx.fillText(st.icon, st.x+boxW/2, y+24);
    ctx.font = active ? 'bold 11px Inter' : '11px Inter';
    ctx.fillText(st.label, st.x+boxW/2, y+43);
    // Arrow
    if(i < stages.length-1){
      const nx = stages[i+1].x;
      ctx.strokeStyle = i < step ? st.color+'88' : C.muted+'44';
      ctx.lineWidth = i < step ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(st.x+boxW+2, y+boxH/2); ctx.lineTo(nx-2, y+boxH/2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(nx-6, y+boxH/2-4); ctx.lineTo(nx-2, y+boxH/2); ctx.lineTo(nx-6, y+boxH/2+4); ctx.stroke();
    }
  });

  // Document chunks below — appear at Search stage (step >= 2)
  if(step >= 2){
    const chY = 120;
    ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'left';
    ctx.fillText('Retrieved chunks:', pad, chY);
    const chunks = ['doc1 §3: "The refund policy allows returns within 30 days of purchase..."','doc2 §1: "Returns are accepted for unopened items in original packaging..."','doc4 §7: "No refunds on digital purchases, subscriptions, or gift cards..."'];
    const showReranked = step >= 3;
    chunks.forEach((ch, i) => {
      const cy = chY+18+i*32;
      ctx.fillStyle = (showReranked && i===0) ? C.accent2+'33' : C.surface;
      ctx.strokeStyle = (showReranked && i===0) ? C.accent2 : C.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(pad+10, cy, w-2*pad-20, 24, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = (showReranked && i===0) ? C.accent2 : C.muted;
      ctx.font = '10px "IBM Plex Mono"';
      ctx.fillText(ch, pad+18, cy+16);
      if(showReranked){
        ctx.fillStyle = C.muted; ctx.font = '9px Inter'; ctx.textAlign = 'right';
        const scores = [0.94, 0.87, 0.62];
        ctx.fillText('score: '+scores[i].toFixed(2), w-pad-18, cy+16);
        ctx.textAlign = 'left';
      }
    });
  }

  // Augmented prompt — appears at step >= 4
  if(step >= 4){
    ctx.fillStyle = C.accent3+'22'; ctx.strokeStyle = C.accent3; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(pad, 240, w-2*pad, 30, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent3; ctx.font = '11px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText('Prompt: "Given context: [doc1§3, doc2§1, doc4§7] — Question: What is the refund policy?"', pad+12, 260);
  }

  // Generated answer — appears at step 5
  if(step >= 5){
    ctx.fillStyle = C.accent2+'22'; ctx.strokeStyle = C.accent2; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(pad, 280, w-2*pad, 30, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.accent2; ctx.font = '11px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText('Answer: "Returns are accepted within 30 days. Digital purchases are non-refundable."', pad+12, 300);
  }

  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Stage ${step+1}/${stages.length}`, w/2, h-10);
  ctx.textAlign = 'left';
},

/* ── 27 Embedding Search ── */
'embedding-search': function(){
  const s = setupCanvas('searchCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const K = parseInt(document.getElementById('searchK')?.value||3);

  srand(Date.now() & 0xFFFF);
  const pad = 30, pw = w-2*pad, ph = h-2*pad-20;
  // Random points (documents)
  const nDocs = 40;
  const docs = [];
  for(let i=0;i<nDocs;i++){ docs.push({ x:rand(), y:rand() }); }
  // Query point
  const qx = 0.3+rand()*0.4, qy = 0.3+rand()*0.4;

  // Compute distances
  docs.forEach(d => { d.dist = Math.sqrt((d.x-qx)**2 + (d.y-qy)**2); });
  docs.sort((a,b)=>a.dist-b.dist);
  const neighbors = new Set(docs.slice(0,K));

  // Draw docs
  docs.forEach(d => {
    const px = pad+d.x*pw, py = pad+d.y*ph;
    const isNear = neighbors.has(d);
    ctx.fillStyle = isNear ? C.accent2 : C.muted+'88';
    ctx.beginPath(); ctx.arc(px, py, isNear?6:3, 0, Math.PI*2); ctx.fill();
    if(isNear){
      // Line to query
      ctx.strokeStyle = C.accent2+'66'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(pad+qx*pw, pad+qy*ph); ctx.lineTo(px, py); ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  // Query point
  ctx.fillStyle = C.accent; ctx.strokeStyle = C.accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(pad+qx*pw, pad+qy*ph, 8, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Q', pad+qx*pw, pad+qy*ph+4);

  // Radius circle
  const maxNDist = docs[K-1].dist;
  const radiusR = Math.max(1, maxNDist*Math.min(pw,ph));
  ctx.strokeStyle = C.accent+'44'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(pad+qx*pw, pad+qy*ph, radiusR, 0, Math.PI*2); ctx.stroke();

  ctx.fillStyle = C.fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`K=${K} nearest neighbors (cosine similarity in embedding space)`, w/2, h-8);
  ctx.textAlign = 'left';
},

/* ── 28 Function Calling ── */
'function-calling': function(){
  const s = setupCanvas('funcCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const step = window._funcStep || 0;

  const flow = [
    { label:'User: "Weather in Oslo?"', x:50, y:30, w:190, color:C.accent3, note:'' },
    { label:'LLM decides: call get_weather', x:50, y:80, w:260, color:C.accent4, note:'Model recognizes tool is needed' },
    { label:'→ {name:"get_weather", args:{loc:"Oslo"}}', x:50, y:130, w:300, color:C.accent, note:'Model outputs structured JSON' },
    { label:'⚙ Execute API → result: {temp:12°C}', x:50, y:180, w:280, color:C.muted, note:'Your code executes the function' },
    { label:'LLM: "It\'s 12°C in Oslo."', x:50, y:230, w:220, color:C.accent2, note:'Result fed back as tool message' },
  ];

  const visible = Math.min(step+1, flow.length);
  for(let i=0; i<visible; i++){
    const st = flow[i];
    const active = i === step;
    ctx.fillStyle = st.color+(active?'44':'22');
    ctx.strokeStyle = st.color;
    ctx.lineWidth = active ? 2.5 : 1.5;
    ctx.beginPath(); ctx.roundRect(st.x, st.y, st.w, 34, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = st.color; ctx.font = (active?'bold ':'')+' 11px "IBM Plex Mono"'; ctx.textAlign = 'left';
    ctx.fillText(st.label, st.x+10, st.y+21);
    // Arrow to next
    if(i < visible-1){
      ctx.strokeStyle = st.color+'88'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(st.x+20, st.y+34); ctx.lineTo(flow[i+1].x+20, flow[i+1].y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(flow[i+1].x+16, flow[i+1].y-4); ctx.lineTo(flow[i+1].x+20, flow[i+1].y); ctx.lineTo(flow[i+1].x+24, flow[i+1].y-4); ctx.stroke();
    }
    // Side note
    if(active && st.note){
      ctx.fillStyle = C.muted; ctx.font = '10px Inter';
      ctx.fillText('← '+st.note, st.x+st.w+16, st.y+21);
    }
  }

  ctx.fillStyle = C.muted; ctx.font = '10px Inter'; ctx.textAlign = 'center';
  ctx.fillText(`Step ${step+1}/${flow.length}`, w/2, h-8);
  ctx.textAlign = 'left';
},

/* ── 29 Agents & Planning ── */
'agents': function(){
  const s = setupCanvas('agentCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const step = window._agentStep || 0;

  const loop = [
    { label:'Thought', sub:'I need to search for...', color:C.accent4 },
    { label:'Action', sub:'search("LLM scaling laws")', color:C.accent },
    { label:'Observation', sub:'Found: Kaplan et al. 2020...', color:C.accent3 },
    { label:'Thought', sub:'I should verify with...', color:C.accent4 },
    { label:'Action', sub:'read_paper("chinchilla")', color:C.accent },
    { label:'Observation', sub:'Hoffmann et al. — 20× tokens...', color:C.accent3 },
    { label:'Final Answer', sub:'Scaling laws show...', color:C.accent2 },
  ];

  const cx = w/2, radius = 90;
  const visible = Math.min(step+1, loop.length);

  // Draw circle path
  ctx.strokeStyle = C.border; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.arc(cx, h/2-10, radius, 0, Math.PI*2); ctx.stroke();
  ctx.setLineDash([]);

  // Draw nodes
  for(let i=0; i<visible; i++){
    const angle = -Math.PI/2 + (i/loop.length)*Math.PI*2;
    const x = cx + Math.cos(angle)*radius;
    const y = h/2-10 + Math.sin(angle)*radius;
    const item = loop[i];
    const isActive = i === step;

    ctx.fillStyle = item.color + (isActive?'44':'22');
    ctx.strokeStyle = item.color + (isActive?'ff':'66');
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = item.color; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText(item.label, x, y+3);

    // Subtitle outside
    if(isActive){
      const ox = cx + Math.cos(angle)*(radius+50);
      const oy = h/2-10 + Math.sin(angle)*(radius+50);
      ctx.fillStyle = C.fg; ctx.font = '10px "IBM Plex Mono"';
      ctx.fillText(item.sub, ox, oy);
    }
  }

  ctx.fillStyle = C.fg; ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('ReAct Loop', cx, 18);
  ctx.fillStyle = C.muted; ctx.font = '10px Inter';
  ctx.fillText(`Step ${step+1}/${loop.length}`, cx, h-10);
  ctx.textAlign = 'left';
},

/* ── 30 Evaluation & Benchmarks ── */
'evaluation': function(mode){
  const s = setupCanvas('evalCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const C = colors();
  ctx.fillStyle = C.bg; ctx.fillRect(0,0,w,h);
  const m = mode || 'compare';

  const benchmarks = ['MMLU','HumanEval','GSM8K','HellaSwag','ARC','TruthfulQA'];
  const models = {
    gpt4: { label:'GPT-4o', color:C.accent, scores:[88,92,95,96,96,76] },
    llama3: { label:'LLaMA-3-70B', color:C.accent2, scores:[82,81,93,88,93,62] },
    mistral: { label:'Mistral-Large', color:C.accent3, scores:[81,75,87,86,90,58] },
  };
  const show = m === 'compare' ? ['gpt4','llama3','mistral'] : [m];

  const cx = w/2, cy = h/2+10, radius = Math.min(w,h)/2-60;
  const n = benchmarks.length;

  // Draw radar
  for(let ring=20; ring<=100; ring+=20){
    ctx.strokeStyle = C.border; ctx.lineWidth = 0.5;
    ctx.beginPath();
    for(let i=0;i<=n;i++){
      const angle = -Math.PI/2 + (i%n)/n*Math.PI*2;
      const r = radius*ring/100;
      const x = cx + Math.cos(angle)*r;
      const y = cy + Math.sin(angle)*r;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.closePath(); ctx.stroke();
    // Ring label
    ctx.fillStyle = C.muted; ctx.font = '8px "IBM Plex Mono"'; ctx.textAlign = 'center';
    ctx.fillText(ring+'%', cx+4, cy-radius*ring/100-2);
  }

  // Axes
  benchmarks.forEach((b,i) => {
    const angle = -Math.PI/2 + i/n*Math.PI*2;
    const x = cx + Math.cos(angle)*radius;
    const y = cy + Math.sin(angle)*radius;
    ctx.strokeStyle = C.border; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(x,y); ctx.stroke();
    // Label
    const lx = cx + Math.cos(angle)*(radius+18);
    const ly = cy + Math.sin(angle)*(radius+18);
    ctx.fillStyle = C.fg; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(b, lx, ly+4);
  });

  // Plot each model
  show.forEach(key => {
    const mod = models[key]; if(!mod) return;
    ctx.strokeStyle = mod.color; ctx.lineWidth = 2; ctx.fillStyle = mod.color+'22';
    ctx.beginPath();
    mod.scores.forEach((score, i) => {
      const angle = -Math.PI/2 + i/n*Math.PI*2;
      const r = radius*score/100;
      const x = cx + Math.cos(angle)*r;
      const y = cy + Math.sin(angle)*r;
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // Dots
    mod.scores.forEach((score, i) => {
      const angle = -Math.PI/2 + i/n*Math.PI*2;
      const r = radius*score/100;
      ctx.beginPath(); ctx.arc(cx+Math.cos(angle)*r, cy+Math.sin(angle)*r, 3, 0, Math.PI*2);
      ctx.fillStyle = mod.color; ctx.fill();
    });
  });

  // Legend
  ctx.textAlign = 'left'; let lx = 10, ly = h-16;
  show.forEach(key => {
    const mod = models[key];
    ctx.fillStyle = mod.color; ctx.font = '10px Inter';
    ctx.fillText('■ '+mod.label, lx, ly);
    lx += ctx.measureText('■ '+mod.label).width + 16;
  });
  ctx.textAlign = 'left';
},

};  /* end DRAWS */


/* ═══════════════════════════════════════════════════════════════
   GLOBAL DRAW TRIGGERS — called from topic HTML controls
   ═══════════════════════════════════════════════════════════════ */

/* Positional Encoding */
function drawPosEnc(m){ DRAWS['positional-encoding'](m); }

/* Self-Attention */
function drawSelfAttn(){ DRAWS['self-attention'](); }

/* Multi-Head Attention */
function drawMHA(m){ DRAWS['multi-head-attention'](m); }

/* Feed-Forward */
function drawFFN(m){ DRAWS['feed-forward'](m); }

/* Transformer Block */
function drawTFBlock(){ DRAWS['transformer-block'](); }
function animTFBlock(){ drawTFBlock(); /* simple for now */ }

/* Decoder-Only */
function animDecoder(){ DRAWS['decoder-only'](); }
function resetDecoder(){ DRAWS['decoder-only'](); }

/* Embeddings */
function resetEmbed(){ DRAWS['embeddings'](); }

/* KV-Cache */
window._kvStep = 0;
function animKVCache(){ window._kvStep = Math.min(20, (window._kvStep||0)+1); DRAWS['kv-cache'](); }
function resetKVCache(){ window._kvStep = 0; DRAWS['kv-cache'](); }

/* Context Windows */
function drawCtx(m){ DRAWS['context-windows'](m); }

/* Mixture of Experts */
window._moeToken = 42;
function animMoE(){ window._moeToken = (window._moeToken||42)+7; DRAWS['mixture-of-experts'](); }
function resetMoE(){ window._moeToken = 42; DRAWS['mixture-of-experts'](); }

/* Scaling Laws */
function drawScaling(m){ DRAWS['scaling-laws'](m); }

/* Pre-Training */
window._pretrainStep = 0;
let _pretrainAnim = null;
function animPretrain(){
  window._pretrainStep = 0;
  if(_pretrainAnim) cancelAnimationFrame(_pretrainAnim);
  function step(){ window._pretrainStep+=2; DRAWS['pre-training'](); if(window._pretrainStep<200) _pretrainAnim=requestAnimationFrame(step); }
  step();
}
function resetPretrain(){ if(_pretrainAnim) cancelAnimationFrame(_pretrainAnim); window._pretrainStep=0; DRAWS['pre-training'](); }

/* Fine-Tuning */
function drawFinetune(m){ DRAWS['fine-tuning'](m); }

/* LoRA */
function drawLoRA(){ DRAWS['lora-qlora'](); }

/* RLHF */
function drawRLHF(stage){ DRAWS['rlhf'](stage); }

/* DPO */
window._dpoStep = 0;
function animDPO(){ window._dpoStep = Math.min(8, (window._dpoStep||0)+1); DRAWS['dpo'](); }
function resetDPO(){ window._dpoStep = 0; DRAWS['dpo'](); }

/* Data Curation */
function animData(){ DRAWS['data-curation'](); }
function resetData(){ DRAWS['data-curation'](); }

/* Decoding Strategies */
window._decodingStep = 0;
function animDecoding(){ window._decodingStep = Math.min(4, (window._decodingStep||0)+1); DRAWS['decoding-strategies'](); }
function resetDecoding(){ window._decodingStep = 0; DRAWS['decoding-strategies'](); }

/* Sampling */
function drawSampling(){ DRAWS['sampling'](); }

/* Speculative Decoding */
function animSpec(){ DRAWS['speculative-decoding'](); }
function resetSpec(){ DRAWS['speculative-decoding'](); }

/* Quantization */
function drawQuant(m){ DRAWS['quantization'](m); }

/* KV-Cache Optimization */
function drawKVOpt(m){ DRAWS['kv-cache-opt'](m); }
function animKVOpt(){ drawKVOpt('paged'); }

/* Batching */
function drawBatch(m){ DRAWS['batching'](m); }

/* Prompt Engineering */
function drawPrompt(m){ DRAWS['prompt-engineering'](m); }

/* RAG */
window._ragStep = 0;
function animRAG(){ window._ragStep = (window._ragStep+1)%6; DRAWS['rag'](); }
function resetRAG(){ window._ragStep = 0; DRAWS['rag'](); }

/* Embedding Search */
function drawSearch(){ DRAWS['embedding-search'](); }

/* Function Calling */
window._funcStep = 0;
function animFunc(){ window._funcStep = (window._funcStep+1)%5; DRAWS['function-calling'](); }
function resetFunc(){ window._funcStep = 0; DRAWS['function-calling'](); }

/* Agents */
window._agentStep = 0;
function animAgent(){ window._agentStep = (window._agentStep+1)%7; DRAWS['agents'](); }
function resetAgent(){ window._agentStep = 0; DRAWS['agents'](); }

/* Evaluation */
function drawEval(m){ DRAWS['evaluation'](m); }
