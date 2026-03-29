/* ═══════════════════════════════════════════════════════════════
   Timeseries Engineering — Canvas Visualizations
   25 interactive drawings, one per topic
   ═══════════════════════════════════════════════════════════════ */

const DPR = window.devicePixelRatio || 1;
function getCSS(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a,b,t){ return a + (b - a) * t; }

function setupCanvas(id){
  const c = document.getElementById(id); if(!c) return null;
  const r = c.parentElement.getBoundingClientRect();
  c.width = r.width * DPR; c.height = c.height * DPR;
  c.style.width = r.width + 'px';
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w: r.width, h: c.height / DPR };
}

/* Seeded PRNG for reproducible randomness */
let _seed = 42;
function srand(s){ _seed = s; }
function rand(){ _seed = (_seed * 16807 + 0) % 2147483647; return (_seed & 0x7fffffff) / 0x7fffffff; }
function randN(){ return (rand() + rand() + rand() - 1.5) * 2; } // approx normal

function colors(){
  return {
    fg: getCSS('--fg') || '#eeeeee',
    mt: getCSS('--muted') || '#888888',
    ac: getCSS('--accent') || '#4fc3f7',
    ac2: getCSS('--accent2') || '#81c784',
    bg: getCSS('--bg') || '#111111',
    br: getCSS('--border') || '#333333',
  };
}

/* Draw axes helper */
function drawAxes(ctx, w, h, pad, col) {
  ctx.strokeStyle = col.br; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
}

/* ── DRAWS object ── */
const DRAWS = {

/* 01 — Stationarity */
'stationarity': function(){
  const s = setupCanvas('stationCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('stationTrend');
  const disp = document.getElementById('stationTrendV');
  function draw(){
    const trend = (slider ? +slider.value : 0) / 100;
    if(disp) disp.textContent = slider.value;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(7);
    const n = 200, dx = (w - 2*pad) / n;
    // stationary
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){
      const x = pad + i*dx, y = h/2 + randN()*30 + trend * i * 0.5;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    // mean line
    ctx.setLineDash([4,4]); ctx.strokeStyle = col.mt; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad, h/2); ctx.lineTo(w-pad, h/2 + trend*(n)*0.5); ctx.stroke();
    ctx.setLineDash([]);
    // labels
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText('t', w - pad + 6, h - pad + 4);
    ctx.fillText(trend > 0.3 ? 'Non-stationary (trending)' : 'Stationary', pad + 4, pad - 8);
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 02 — Autocorrelation (ACF/PACF) */
'autocorrelation': function(){
  const s = setupCanvas('acfCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const pSlider = document.getElementById('acfP');
  const qSlider = document.getElementById('acfQ');
  const pDisp = document.getElementById('acfPV');
  const qDisp = document.getElementById('acfQV');
  function draw(){
    const p = pSlider ? +pSlider.value : 1;
    const q = qSlider ? +qSlider.value : 0;
    if(pDisp) pDisp.textContent = p;
    if(qDisp) qDisp.textContent = q;
    ctx.clearRect(0,0,w,h);
    const mid = h/2, barW = 12, maxLag = 20;
    const acfX = pad, acfW = w/2 - pad*1.5;
    const pacfX = w/2 + pad*0.5, pacfW = w/2 - pad*1.5;
    // ACF section
    ctx.fillStyle = col.mt; ctx.font = '10px monospace';
    ctx.fillText('ACF', acfX, pad - 6);
    ctx.strokeStyle = col.br; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(acfX, mid); ctx.lineTo(acfX + acfW, mid); ctx.stroke();
    // confidence bands
    ctx.setLineDash([3,3]); ctx.strokeStyle = col.ac2 + '55';
    const cb = mid * 0.3;
    ctx.beginPath(); ctx.moveTo(acfX, mid - cb); ctx.lineTo(acfX + acfW, mid - cb); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(acfX, mid + cb); ctx.lineTo(acfX + acfW, mid + cb); ctx.stroke();
    ctx.setLineDash([]);
    for(let k=1;k<=maxLag;k++){
      const x = acfX + k * (acfW/maxLag);
      let val = Math.pow(0.7, k) * (k <= p ? 1 : 0.3);
      if(q > 0 && k <= q) val = Math.max(val, 0.8 - 0.15*k);
      if(k > Math.max(p+2,q)) val *= 0.15;
      const bh = val * (mid - pad - 10);
      ctx.fillStyle = col.ac; ctx.fillRect(x - barW/2, mid - bh, barW, bh);
    }
    // PACF section
    ctx.fillStyle = col.mt; ctx.fillText('PACF', pacfX, pad - 6);
    ctx.strokeStyle = col.br; ctx.beginPath(); ctx.moveTo(pacfX, mid); ctx.lineTo(pacfX + pacfW, mid); ctx.stroke();
    ctx.setLineDash([3,3]); ctx.strokeStyle = col.ac2 + '55';
    ctx.beginPath(); ctx.moveTo(pacfX, mid - cb); ctx.lineTo(pacfX + pacfW, mid - cb); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pacfX, mid + cb); ctx.lineTo(pacfX + pacfW, mid + cb); ctx.stroke();
    ctx.setLineDash([]);
    for(let k=1;k<=maxLag;k++){
      const x = pacfX + k * (pacfW/maxLag);
      let val = k <= p ? 0.8 / k : 0.05 * rand();
      const bh = val * (mid - pad - 10);
      ctx.fillStyle = col.ac2; ctx.fillRect(x - barW/2, mid - bh, barW, bh);
    }
  }
  draw();
  if(pSlider) pSlider.oninput = draw;
  if(qSlider) qSlider.oninput = draw;
},

/* 03 — Decomposition */
'decomposition': function(){
  const s = setupCanvas('decompCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 20;
  const pSlider = document.getElementById('decompPeriod');
  const tSlider = document.getElementById('decompTrend');
  const pDisp = document.getElementById('decompPeriodV');
  const tDisp = document.getElementById('decompTrendV');
  function draw(){
    const period = pSlider ? +pSlider.value : 12;
    const trend = (tSlider ? +tSlider.value : 50) / 100;
    if(pDisp) pDisp.textContent = period;
    if(tDisp) tDisp.textContent = tSlider ? tSlider.value : 50;
    ctx.clearRect(0,0,w,h);
    srand(42);
    const n = 200, dx = (w - 2*pad) / n;
    const rows = 4, rh = (h - pad) / rows;
    const labels = ['Original','Trend','Seasonal','Residual'];
    const clrs = [col.fg, col.ac, col.ac2, col.mt];
    for(let r=0;r<rows;r++){
      const cy = pad + r*rh + rh/2;
      ctx.fillStyle = col.mt; ctx.font = '9px monospace';
      ctx.fillText(labels[r], pad, cy - rh/2 + 10);
      ctx.strokeStyle = col.br; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(w-pad, cy); ctx.stroke();
      ctx.strokeStyle = clrs[r]; ctx.lineWidth = 1.2;
      ctx.beginPath();
      srand(42);
      for(let i=0;i<n;i++){
        const x = pad + i*dx;
        const t_val = trend * (i/n) * rh * 0.4;
        const s_val = Math.sin(2*Math.PI*i/period) * rh * 0.25;
        const noise = randN() * rh * 0.08;
        let y;
        if(r===0) y = cy - t_val - s_val - noise;
        else if(r===1) y = cy - t_val;
        else if(r===2) y = cy - s_val;
        else y = cy - noise;
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
  }
  draw();
  if(pSlider) pSlider.oninput = draw;
  if(tSlider) tSlider.oninput = draw;
},

/* 04 — Differencing */
'differencing': function(){
  const s = setupCanvas('diffCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('diffD');
  const disp = document.getElementById('diffDV');
  function draw(){
    const d = slider ? +slider.value : 0;
    if(disp) disp.textContent = d;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(11);
    const n = 150, dx = (w - 2*pad) / n;
    // Generate original with trend
    const orig = [];
    let val = 0;
    for(let i=0;i<n;i++){
      val += 0.3 + randN()*2;
      orig.push(val);
    }
    // Apply differencing
    let data = [...orig];
    for(let dd=0;dd<d;dd++){
      const next = [];
      for(let i=1;i<data.length;i++) next.push(data[i] - data[i-1]);
      data = next;
    }
    // Normalize and draw
    const mn = Math.min(...data), mx = Math.max(...data);
    const range = mx - mn || 1;
    ctx.beginPath(); ctx.strokeStyle = d===0 ? col.ac : col.ac2; ctx.lineWidth = 1.5;
    for(let i=0;i<data.length;i++){
      const x = pad + i * (w - 2*pad) / data.length;
      const y = h - pad - ((data[i] - mn) / range) * (h - 2*pad);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(d===0 ? 'Original (trending)' : d===1 ? 'First difference (≈ stationary)' : 'Second difference', pad+4, pad-6);
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 05 — Resampling & Frequency */
'resampling': function(){
  const s = setupCanvas('resampleCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('resampleFreq');
  const disp = document.getElementById('resampleFreqV');
  const freqLabels = ['1x (raw)','2x down','4x down','8x down','16x down'];
  function draw(){
    const level = slider ? +slider.value : 1;
    if(disp) disp.textContent = freqLabels[level-1] || level+'x';
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(99);
    const n = 200;
    const orig = [];
    for(let i=0;i<n;i++) orig.push(Math.sin(i*0.15)*40 + randN()*15);
    const step = Math.pow(2, level - 1);
    // Draw original faintly
    ctx.strokeStyle = col.br; ctx.lineWidth = 1;
    ctx.beginPath();
    const dx = (w - 2*pad) / n;
    for(let i=0;i<n;i++){
      const x = pad + i*dx, y = h/2 - orig[i];
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    // Draw resampled
    ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
    ctx.beginPath();
    for(let i=0;i<n;i+=step){
      let avg = 0, cnt = 0;
      for(let j=i;j<Math.min(i+step,n);j++){ avg += orig[j]; cnt++; }
      avg /= cnt;
      const x = pad + (i + step/2) * dx, y = h/2 - avg;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      ctx.fillStyle = col.ac; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2); ctx.fill();
    }
    ctx.stroke();
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 06 — AR Models */
'ar-models': function(){
  const s = setupCanvas('arCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const phiSlider = document.getElementById('arPhi1');
  const ordSlider = document.getElementById('arOrder');
  const phiDisp = document.getElementById('arPhi1V');
  const ordDisp = document.getElementById('arOrderV');
  function draw(){
    const phi = (phiSlider ? +phiSlider.value : 70) / 100;
    const order = ordSlider ? +ordSlider.value : 1;
    if(phiDisp) phiDisp.textContent = phi.toFixed(2);
    if(ordDisp) ordDisp.textContent = order;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(3);
    const n = 200, buf = [];
    for(let i=0;i<order;i++) buf.push(0);
    for(let i=order;i<n;i++){
      let val = randN() * 8;
      for(let p=1;p<=order;p++) val += (phi / p) * buf[i-p];
      buf.push(val);
    }
    const mn = Math.min(...buf), mx = Math.max(...buf), range = mx - mn || 1;
    const dx = (w - 2*pad) / n;
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){
      const x = pad + i*dx, y = pad + (1 - (buf[i]-mn)/range) * (h - 2*pad);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`AR(${order}), φ₁=${phi.toFixed(2)}`, pad+4, pad-6);
  }
  draw();
  if(phiSlider) phiSlider.oninput = draw;
  if(ordSlider) ordSlider.oninput = draw;
},

/* 07 — MA Models */
'ma-models': function(){
  const s = setupCanvas('maCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const thetaSlider = document.getElementById('maTheta1');
  const ordSlider = document.getElementById('maOrder');
  const thetaDisp = document.getElementById('maTheta1V');
  const ordDisp = document.getElementById('maOrderV');
  function draw(){
    const theta = (thetaSlider ? +thetaSlider.value : 60) / 100;
    const order = ordSlider ? +ordSlider.value : 1;
    if(thetaDisp) thetaDisp.textContent = theta.toFixed(2);
    if(ordDisp) ordDisp.textContent = order;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(5);
    const n = 200, eps = [], vals = [];
    for(let i=0;i<n;i++) eps.push(randN() * 10);
    for(let i=0;i<n;i++){
      let val = eps[i];
      for(let q=1;q<=order;q++) if(i-q>=0) val += (theta / q) * eps[i-q];
      vals.push(val);
    }
    const mn = Math.min(...vals), mx = Math.max(...vals), range = mx - mn || 1;
    const dx = (w - 2*pad) / n;
    ctx.beginPath(); ctx.strokeStyle = col.ac2; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){
      const x = pad + i*dx, y = pad + (1 - (vals[i]-mn)/range) * (h - 2*pad);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`MA(${order}), θ₁=${theta.toFixed(2)}`, pad+4, pad-6);
  }
  draw();
  if(thetaSlider) thetaSlider.oninput = draw;
  if(ordSlider) ordSlider.oninput = draw;
},

/* 08 — ARIMA */
'arima': function(){
  const s = setupCanvas('arimaCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const pS = document.getElementById('arimaP'), dS = document.getElementById('arimaD'), qS = document.getElementById('arimaQ');
  const pD = document.getElementById('arimaPV'), dD = document.getElementById('arimaDV'), qD = document.getElementById('arimaQV');
  function draw(){
    const p = pS ? +pS.value : 1, d = dS ? +dS.value : 1, q = qS ? +qS.value : 1;
    if(pD) pD.textContent = p; if(dD) dD.textContent = d; if(qD) qD.textContent = q;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(17);
    const n = 160, fh = 30;
    // generate series
    const vals = []; let v = 50;
    for(let i=0;i<n;i++){ v += 0.2*d + randN()*3 - 0.05*(p+1)*(v-50); vals.push(v); }
    const mn = Math.min(...vals) - 10, mx = Math.max(...vals) + 10, rng = mx - mn;
    const dx = (w - 2*pad) / (n + fh);
    // observed
    ctx.beginPath(); ctx.strokeStyle = col.fg; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){ const x = pad+i*dx, y = pad + (1-(vals[i]-mn)/rng)*(h-2*pad); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.stroke();
    // forecast
    const last = vals[n-1];
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
    ctx.moveTo(pad+n*dx, pad + (1-(last-mn)/rng)*(h-2*pad));
    srand(42);
    let fv = last;
    for(let i=1;i<=fh;i++){
      fv += 0.1*d + randN()*1.5;
      const x = pad+(n+i)*dx, y = pad + (1-(fv-mn)/rng)*(h-2*pad);
      ctx.lineTo(x,y);
    }
    ctx.stroke();
    // confidence ribbons
    ctx.fillStyle = col.ac + '22';
    ctx.beginPath();
    srand(42); fv = last;
    for(let i=1;i<=fh;i++){ fv += 0.1*d+randN()*1.5; const x=pad+(n+i)*dx, spread=i*(2+q)*1.2; ctx.lineTo(x, pad+(1-(fv+spread-mn)/rng)*(h-2*pad)); }
    srand(42); fv = last;
    for(let i=fh;i>=1;i--){ fv=last; srand(42); for(let j=1;j<=i;j++) fv+=0.1*d+randN()*1.5; const x=pad+(n+i)*dx, spread=i*(2+q)*1.2; ctx.lineTo(x, pad+(1-(fv-spread-mn)/rng)*(h-2*pad)); }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`ARIMA(${p},${d},${q})`, pad+4, pad-6);
    ctx.fillText('Forecast →', pad + n*dx + 4, pad - 6);
  }
  draw();
  [pS,dS,qS].forEach(s => { if(s) s.oninput = draw; });
},

/* 09 — SARIMA */
'sarima': function(){
  const s = setupCanvas('sarimaCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const mS = document.getElementById('sarimaM');
  const sS = document.getElementById('sarimaS');
  const mD = document.getElementById('sarimaMV');
  const sD = document.getElementById('sarimaSV');
  function draw(){
    const m = mS ? +mS.value : 12;
    const str = (sS ? +sS.value : 60) / 100;
    if(mD) mD.textContent = m; if(sD) sD.textContent = sS ? sS.value : 60;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(21);
    const n = 200, dx = (w - 2*pad) / n;
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
    let v = 0;
    for(let i=0;i<n;i++){
      const seasonal = Math.sin(2*Math.PI*i/m) * str * 40;
      const trend = i * 0.1;
      const noise = randN() * 8;
      v = trend + seasonal + noise;
      const x = pad + i*dx, y = h/2 - v;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`Period m=${m}, seasonal strength=${(str*100).toFixed(0)}%`, pad+4, pad-6);
  }
  draw();
  if(mS) mS.oninput = draw;
  if(sS) sS.oninput = draw;
},

/* 10 — Exponential Smoothing */
'exponential-smoothing': function(){
  const s = setupCanvas('etsCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('etsAlpha');
  const disp = document.getElementById('etsAlphaV');
  function draw(){
    const alpha = (slider ? +slider.value : 30) / 100;
    if(disp) disp.textContent = alpha.toFixed(2);
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(33);
    const n = 150, dx = (w - 2*pad) / n;
    const orig = [];
    for(let i=0;i<n;i++) orig.push(Math.sin(i*0.1)*30 + randN()*20);
    // Draw original
    ctx.beginPath(); ctx.strokeStyle = col.fg + '44'; ctx.lineWidth = 1;
    for(let i=0;i<n;i++){ const x=pad+i*dx, y=h/2-orig[i]; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.stroke();
    // Smoothed
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
    let sm = orig[0];
    for(let i=0;i<n;i++){
      sm = alpha * orig[i] + (1 - alpha) * sm;
      const x = pad + i*dx, y = h/2 - sm;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`α = ${alpha.toFixed(2)}`, pad + 4, pad - 6);
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 11 — Prophet */
'prophet': function(){
  const s = setupCanvas('prophetCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 20;
  srand(55);
  const n = 200, dx = (w - 2*pad) / n;
  const rows = 3, rh = (h - pad) / rows;
  const labels = ['Trend + Changepoints','Weekly Seasonality','Combined Forecast'];
  const clrs = [col.ac, col.ac2, col.fg];
  // changepoint at 100
  for(let r=0;r<rows;r++){
    const cy = pad + r*rh + rh/2;
    ctx.fillStyle = col.mt; ctx.font = '9px monospace';
    ctx.fillText(labels[r], pad, cy - rh/2 + 10);
    ctx.strokeStyle = col.br; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, cy); ctx.lineTo(w-pad, cy); ctx.stroke();
    ctx.strokeStyle = clrs[r]; ctx.lineWidth = 1.3;
    ctx.beginPath();
    srand(55);
    for(let i=0;i<n;i++){
      const x = pad + i*dx;
      const trend = i < 100 ? i*0.15 : 15 + (i-100)*0.05;
      const season = Math.sin(2*Math.PI*i/7)*rh*0.15;
      const noise = randN() * rh * 0.05;
      let y;
      if(r===0) y = cy - trend * rh * 0.012;
      else if(r===1) y = cy - season;
      else y = cy - trend * rh * 0.012 - season - noise;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  // mark changepoint
  ctx.setLineDash([4,4]); ctx.strokeStyle = '#f44336'; ctx.lineWidth = 1;
  const cpX = pad + 100*dx;
  ctx.beginPath(); ctx.moveTo(cpX, pad); ctx.lineTo(cpX, h - pad); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#f44336'; ctx.font = '9px monospace'; ctx.fillText('changepoint', cpX + 4, pad + 12);
},

/* 12 — State-Space / Kalman */
'state-space': function(){
  const s = setupCanvas('kalmanCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const qSlider = document.getElementById('kalmanQ');
  const rSlider = document.getElementById('kalmanR');
  const qDisp = document.getElementById('kalmanQV');
  const rDisp = document.getElementById('kalmanRV');
  function draw(){
    const Q = (qSlider ? +qSlider.value : 20) / 100;
    const R = (rSlider ? +rSlider.value : 50) / 100;
    if(qDisp) qDisp.textContent = qSlider ? qSlider.value : 20;
    if(rDisp) rDisp.textContent = rSlider ? rSlider.value : 50;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(13);
    const n = 150, dx = (w - 2*pad) / n;
    // True state
    const truth = []; let st = 0;
    for(let i=0;i<n;i++){ st += Math.sin(i*0.05)*0.5 + randN()*Q*2; truth.push(st); }
    // Observations
    srand(77);
    const obs = truth.map(v => v + randN() * R * 30);
    // Kalman filter
    let xhat = 0, P = 1;
    const filtered = [];
    for(let i=0;i<n;i++){
      // predict
      const xpred = xhat, Ppred = P + Q*5;
      // update
      const K = Ppred / (Ppred + R*20);
      xhat = xpred + K * (obs[i] - xpred);
      P = (1 - K) * Ppred;
      filtered.push(xhat);
    }
    const all = [...obs, ...truth, ...filtered];
    const mn = Math.min(...all), mx = Math.max(...all), rng = mx - mn || 1;
    const toY = v => pad + (1 - (v-mn)/rng) * (h - 2*pad);
    // observations
    ctx.fillStyle = col.fg + '33';
    obs.forEach((v,i) => { ctx.beginPath(); ctx.arc(pad+i*dx, toY(v), 2, 0, Math.PI*2); ctx.fill(); });
    // truth
    ctx.beginPath(); ctx.strokeStyle = col.mt; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    truth.forEach((v,i) => { const x=pad+i*dx; i===0?ctx.moveTo(x,toY(v)):ctx.lineTo(x,toY(v)); });
    ctx.stroke(); ctx.setLineDash([]);
    // filtered
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
    filtered.forEach((v,i) => { const x=pad+i*dx; i===0?ctx.moveTo(x,toY(v)):ctx.lineTo(x,toY(v)); });
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '10px monospace';
    ctx.fillText('— filtered', w - 120, pad + 12);
    ctx.fillText('... true state', w - 120, pad + 24);
    ctx.fillText('· observations', w - 120, pad + 36);
  }
  draw();
  if(qSlider) qSlider.oninput = draw;
  if(rSlider) rSlider.oninput = draw;
},

/* 13 — GARCH */
'garch': function(){
  const s = setupCanvas('garchCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const aSlider = document.getElementById('garchA');
  const bSlider = document.getElementById('garchB');
  const aDisp = document.getElementById('garchAV');
  const bDisp = document.getElementById('garchBV');
  function draw(){
    const alpha = (aSlider ? +aSlider.value : 10) / 100;
    const beta = (bSlider ? +bSlider.value : 85) / 100;
    if(aDisp) aDisp.textContent = alpha.toFixed(2);
    if(bDisp) bDisp.textContent = beta.toFixed(2);
    ctx.clearRect(0,0,w,h);
    srand(7);
    const n = 200, dx = (w - 2*pad) / n;
    const omega = 0.01;
    let sigma2 = 1, eps;
    const returns = [], vols = [];
    for(let i=0;i<n;i++){
      eps = randN() * Math.sqrt(sigma2);
      returns.push(eps);
      vols.push(Math.sqrt(sigma2));
      sigma2 = omega + alpha * eps * eps + beta * sigma2;
    }
    // Returns
    const mid = h / 2;
    ctx.strokeStyle = col.br; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, mid); ctx.lineTo(w-pad, mid); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = col.fg + '88'; ctx.lineWidth = 1;
    for(let i=0;i<n;i++){
      const x = pad+i*dx, y = mid - returns[i]*15;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    // Volatility envelope
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){ const x=pad+i*dx, y=mid-vols[i]*15; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
    for(let i=0;i<n;i++){ const x=pad+i*dx, y=mid+vols[i]*15; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.stroke();
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`GARCH(1,1) α=${alpha.toFixed(2)} β=${beta.toFixed(2)}`, pad+4, pad-6);
    ctx.fillText('— σ envelope', w - 120, pad + 4);
  }
  draw();
  if(aSlider) aSlider.oninput = draw;
  if(bSlider) bSlider.oninput = draw;
},

/* 14 — VAR Models */
'var-models': function(){
  const s = setupCanvas('varCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  drawAxes(ctx, w, h, pad, col);
  srand(19);
  const n = 150, dx = (w - 2*pad) / n;
  // Two coupled series
  let x1 = 0, x2 = 0;
  const s1 = [], s2 = [];
  for(let i=0;i<n;i++){
    const nx1 = 0.6*x1 + 0.3*x2 + randN()*5;
    const nx2 = 0.2*x1 + 0.5*x2 + randN()*5;
    x1 = nx1; x2 = nx2;
    s1.push(x1); s2.push(x2);
  }
  const all = [...s1,...s2];
  const mn = Math.min(...all), mx = Math.max(...all), rng = mx - mn || 1;
  const toY = v => pad + (1-(v-mn)/rng)*(h-2*pad);
  ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5;
  s1.forEach((v,i) => { i===0?ctx.moveTo(pad+i*dx,toY(v)):ctx.lineTo(pad+i*dx,toY(v)); });
  ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = col.ac2; ctx.lineWidth = 1.5;
  s2.forEach((v,i) => { i===0?ctx.moveTo(pad+i*dx,toY(v)):ctx.lineTo(pad+i*dx,toY(v)); });
  ctx.stroke();
  ctx.fillStyle = col.ac; ctx.font = '10px monospace'; ctx.fillText('Series 1 (GDP)', pad+4, pad-6);
  ctx.fillStyle = col.ac2; ctx.fillText('Series 2 (Inflation)', pad+120, pad-6);
},

/* 15 — Changepoint Detection */
'changepoint-detection': function(){
  const s = setupCanvas('cpCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('cpSens');
  const disp = document.getElementById('cpSensV');
  function draw(){
    const sens = slider ? +slider.value : 50;
    if(disp) disp.textContent = sens;
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(31);
    const n = 200, dx = (w - 2*pad) / n;
    // Piecewise series with mean shifts
    const cps = [60, 120, 160];
    const means = [0, 25, -10, 30];
    const vals = [];
    for(let i=0;i<n;i++){
      let seg = 0;
      for(const cp of cps) if(i >= cp) seg++;
      vals.push(means[seg] + randN() * 12);
    }
    const mn = Math.min(...vals), mx = Math.max(...vals), rng = mx-mn||1;
    const toY = v => pad + (1-(v-mn)/rng)*(h-2*pad);
    ctx.beginPath(); ctx.strokeStyle = col.fg + '88'; ctx.lineWidth = 1.2;
    vals.forEach((v,i) => { i===0?ctx.moveTo(pad+i*dx,toY(v)):ctx.lineTo(pad+i*dx,toY(v)); });
    ctx.stroke();
    // detected changepoints (sensitivity affects which ones show)
    const threshold = 110 - sens;
    for(const cp of cps){
      const diff = Math.abs(means[cps.indexOf(cp)+1] - means[cps.indexOf(cp)]);
      if(diff * 4 > threshold){
        const x = pad + cp * dx;
        ctx.setLineDash([4,3]); ctx.strokeStyle = '#f44336'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, h-pad); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#f44336'; ctx.font = '9px monospace';
        ctx.fillText('CP', x + 3, pad + 12);
      }
    }
    // segment means
    let prev = 0;
    ctx.setLineDash([6,3]); ctx.strokeStyle = col.ac; ctx.lineWidth = 1;
    [...cps, n].forEach((cp,i) => {
      ctx.beginPath(); ctx.moveTo(pad+prev*dx, toY(means[i])); ctx.lineTo(pad+cp*dx, toY(means[i])); ctx.stroke();
      prev = cp;
    });
    ctx.setLineDash([]);
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 16 — RNNs for Time Series */
'rnn-for-ts': function(){
  const s = setupCanvas('rnnCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const steps = 6, gap = (w - 2*pad) / (steps + 1), r = 18;
  const y1 = h * 0.7, y2 = h * 0.3;
  for(let i=0;i<steps;i++){
    const x = pad + (i+1)*gap;
    // input
    ctx.fillStyle = col.ac + '44'; ctx.beginPath(); ctx.arc(x, y1, r, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = col.ac; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y1, r, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = col.fg; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(`x${i+1}`, x, y1 + 4);
    // hidden
    ctx.fillStyle = col.ac2 + '44'; ctx.beginPath(); ctx.arc(x, y2, r, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = col.ac2; ctx.beginPath(); ctx.arc(x, y2, r, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = col.fg; ctx.fillText(`h${i+1}`, x, y2 + 4);
    // input → hidden arrow
    ctx.strokeStyle = col.mt; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y1 - r); ctx.lineTo(x, y2 + r); ctx.stroke();
    // recurrent arrow
    if(i < steps - 1){
      const nx = pad + (i+2)*gap;
      ctx.strokeStyle = col.ac2; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x + r, y2); ctx.lineTo(nx - r, y2); ctx.stroke();
      // arrowhead
      ctx.beginPath(); ctx.moveTo(nx-r-6, y2-4); ctx.lineTo(nx-r, y2); ctx.lineTo(nx-r-6, y2+4); ctx.stroke();
    }
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = col.mt; ctx.font = '10px monospace';
  ctx.fillText('Unrolled RNN', pad, pad - 6);
},

/* 17 — LSTM & GRU */
'lstm-for-ts': function(){
  const s = setupCanvas('lstmCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 20;
  // Draw simplified LSTM cell
  const cx = w/2, cy = h/2, bw = 160, bh = 80;
  ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
  ctx.strokeRect(cx - bw/2, cy - bh/2, bw, bh);
  ctx.fillStyle = col.ac + '11'; ctx.fillRect(cx - bw/2, cy - bh/2, bw, bh);
  // Gates
  const gates = [
    { label: 'f', x: cx - 50, desc: 'forget' },
    { label: 'i', x: cx, desc: 'input' },
    { label: 'o', x: cx + 50, desc: 'output' },
  ];
  gates.forEach(g => {
    ctx.fillStyle = col.ac2 + '44'; ctx.beginPath(); ctx.arc(g.x, cy, 14, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = col.ac2; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(g.x, cy, 14, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = col.fg; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
    ctx.fillText(g.label, g.x, cy + 4);
    ctx.fillStyle = col.mt; ctx.font = '9px monospace';
    ctx.fillText(g.desc, g.x, cy + bh/2 + 16);
  });
  // Cell state line
  ctx.strokeStyle = col.ac; ctx.lineWidth = 2; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(cx - bw/2 - 30, cy - bh/2 + 10); ctx.lineTo(cx + bw/2 + 30, cy - bh/2 + 10); ctx.stroke();
  ctx.fillStyle = col.ac; ctx.font = '10px monospace'; ctx.textAlign = 'left';
  ctx.fillText('cell state →', cx + bw/2 + 34, cy - bh/2 + 14);
  // h input/output
  ctx.setLineDash([4,3]); ctx.strokeStyle = col.ac2;
  ctx.beginPath(); ctx.moveTo(cx - bw/2 - 30, cy); ctx.lineTo(cx - bw/2, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + bw/2, cy); ctx.lineTo(cx + bw/2 + 30, cy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = col.ac2; ctx.fillText(' h(t-1)', cx - bw/2 - 60, cy + 4);
  ctx.fillText('h(t) →', cx + bw/2 + 34, cy + 4);
  // x input
  ctx.strokeStyle = col.mt; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy + bh/2); ctx.lineTo(cx, cy + bh/2 + 30); ctx.stroke();
  ctx.fillStyle = col.mt; ctx.textAlign = 'center'; ctx.fillText('x(t)', cx, cy + bh/2 + 44);
  ctx.textAlign = 'left';
  ctx.fillStyle = col.mt; ctx.font = '10px monospace';
  ctx.fillText('LSTM Cell', pad, pad);
},

/* 18 — Temporal CNN (TCN) */
'temporal-cnn': function(){
  const s = setupCanvas('tcnCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const lSlider = document.getElementById('tcnLayers');
  const kSlider = document.getElementById('tcnKernel');
  const lDisp = document.getElementById('tcnLayersV');
  const kDisp = document.getElementById('tcnKernelV');
  function draw(){
    const layers = lSlider ? +lSlider.value : 4;
    const kernel = kSlider ? +kSlider.value : 3;
    if(lDisp) lDisp.textContent = layers;
    if(kDisp) kDisp.textContent = kernel;
    ctx.clearRect(0,0,w,h);
    const nodeR = 6, layerH = (h - 2*pad) / (layers + 1);
    const nInputs = 16;
    const nodeW = (w - 2*pad) / nInputs;
    // Draw layers bottom-up
    for(let l=0;l<=layers;l++){
      const y = h - pad - l * layerH;
      const dilation = Math.pow(2, l);
      const rf = 1 + (kernel - 1) * dilation;
      for(let n=0;n<nInputs;n++){
        const x = pad + n * nodeW + nodeW/2;
        ctx.fillStyle = l === 0 ? col.ac + '66' : l === layers ? col.ac2 + '66' : col.mt + '44';
        ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI*2); ctx.fill();
        // connections to lower layer
        if(l > 0){
          const prevDil = Math.pow(2, l-1);
          ctx.strokeStyle = col.ac + '33'; ctx.lineWidth = 0.8;
          for(let k=0;k<kernel;k++){
            const srcIdx = n - k * prevDil;
            if(srcIdx >= 0 && srcIdx < nInputs){
              const sx = pad + srcIdx * nodeW + nodeW/2;
              const sy = h - pad - (l-1) * layerH;
              ctx.beginPath(); ctx.moveTo(sx, sy - nodeR); ctx.lineTo(x, y + nodeR); ctx.stroke();
            }
          }
        }
      }
      ctx.fillStyle = col.mt; ctx.font = '9px monospace'; ctx.textAlign = 'right';
      if(l === 0) ctx.fillText('input', pad - 6, y + 4);
      else ctx.fillText(`d=${dilation}`, pad - 6, y + 4);
    }
    ctx.textAlign = 'left';
    const totalRF = 1 + (kernel - 1) * (Math.pow(2, layers) - 1);
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`Receptive field: ${totalRF}`, pad + 4, pad - 6);
  }
  draw();
  if(lSlider) lSlider.oninput = draw;
  if(kSlider) kSlider.oninput = draw;
},

/* 19 — Transformers for Time Series */
'transformers-for-ts': function(){
  const s = setupCanvas('tsfmCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  // Show patches being attended
  const nPatches = 8, patchW = (w - 2*pad) / nPatches, patchH = 30;
  const patchY = h - pad - patchH;
  // Draw patches
  for(let i=0;i<nPatches;i++){
    const x = pad + i * patchW;
    ctx.fillStyle = col.ac + '33'; ctx.fillRect(x+2, patchY, patchW-4, patchH);
    ctx.strokeStyle = col.ac; ctx.lineWidth = 1; ctx.strokeRect(x+2, patchY, patchW-4, patchH);
    ctx.fillStyle = col.fg; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText(`P${i+1}`, x + patchW/2, patchY + patchH/2 + 3);
  }
  // Attention matrix (upper area)
  const matSize = Math.min(120, (h - 80) * 0.6);
  const matX = (w - matSize) / 2, matY = pad;
  srand(42);
  for(let i=0;i<nPatches;i++){
    for(let j=0;j<nPatches;j++){
      const val = Math.max(0, 1 - Math.abs(i-j)*0.15 - rand()*0.3);
      const cellW = matSize/nPatches, cellH = matSize/nPatches;
      ctx.fillStyle = `rgba(79,195,247,${val * 0.8})`;
      ctx.fillRect(matX + j*cellW, matY + i*cellH, cellW-1, cellH-1);
    }
  }
  ctx.fillStyle = col.mt; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('Self-Attention Matrix', w/2, matY + matSize + 14);
  // Arrows from patches to matrix
  ctx.strokeStyle = col.mt + '44'; ctx.lineWidth = 0.8;
  for(let i=0;i<nPatches;i++){
    const px = pad + i*patchW + patchW/2;
    const my = matY + matSize;
    ctx.beginPath(); ctx.moveTo(px, patchY); ctx.lineTo(matX + i*matSize/nPatches + matSize/nPatches/2, my + 20); ctx.stroke();
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = col.mt; ctx.font = '10px monospace';
  ctx.fillText('PatchTST-style temporal attention', pad, pad - 6);
},

/* 20 — N-BEATS & N-HiTS */
'nbeats': function(){
  const s = setupCanvas('nbeatsCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  // Draw block architecture
  const nBlocks = 4, blockW = 80, blockH = 50;
  const startX = pad + 30, gap = (w - 2*pad - blockW) / nBlocks;
  const midY = h / 2;
  for(let i=0;i<nBlocks;i++){
    const x = startX + i * gap;
    // Block box
    ctx.fillStyle = i < 2 ? col.ac + '22' : col.ac2 + '22';
    ctx.fillRect(x, midY - blockH/2, blockW, blockH);
    ctx.strokeStyle = i < 2 ? col.ac : col.ac2;
    ctx.lineWidth = 1.5; ctx.strokeRect(x, midY - blockH/2, blockW, blockH);
    ctx.fillStyle = col.fg; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(`Block ${i+1}`, x + blockW/2, midY + 4);
    ctx.fillStyle = col.mt; ctx.font = '8px monospace';
    ctx.fillText(i < 2 ? 'Trend' : 'Seasonal', x + blockW/2, midY + blockH/2 + 14);
    // Backward arrow (up)
    ctx.strokeStyle = col.ac + '88'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + blockW*0.3, midY - blockH/2); ctx.lineTo(x + blockW*0.3, midY - blockH/2 - 20); ctx.stroke();
    ctx.fillStyle = col.mt; if(i===0){ ctx.font = '8px monospace'; ctx.fillText('backcast', x + blockW*0.3, midY - blockH/2 - 24); }
    // Forward arrow (down)
    ctx.strokeStyle = col.ac2 + '88';
    ctx.beginPath(); ctx.moveTo(x + blockW*0.7, midY + blockH/2); ctx.lineTo(x + blockW*0.7, midY + blockH/2 + 20); ctx.stroke();
    if(i===0){ ctx.fillText('forecast', x + blockW*0.7, midY + blockH/2 + 32); }
    // Residual connection to next
    if(i < nBlocks - 1){
      const nx = startX + (i+1)*gap;
      ctx.strokeStyle = col.fg + '44'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x + blockW, midY); ctx.lineTo(nx, midY); ctx.stroke();
      ctx.fillStyle = col.mt; ctx.font = '8px monospace';
      ctx.fillText('residual', (x+blockW+nx)/2, midY - 8);
    }
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = col.mt; ctx.font = '10px monospace';
  ctx.fillText('N-BEATS Stack', pad, pad - 6);
},

/* 21 — Feature Engineering */
'feature-engineering': function(){
  const s = setupCanvas('feCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  drawAxes(ctx, w, h, pad, col);
  srand(41);
  const n = 100, dx = (w - 2*pad) / n;
  const orig = [];
  for(let i=0;i<n;i++) orig.push(Math.sin(i*0.15)*25 + randN()*8 + i*0.1);
  // Original
  ctx.beginPath(); ctx.strokeStyle = col.fg + '66'; ctx.lineWidth = 1;
  orig.forEach((v,i) => { const x=pad+i*dx, y=h/2-v; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
  ctx.stroke();
  // Rolling mean (7)
  ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2;
  for(let i=6;i<n;i++){
    let sum = 0; for(let j=i-6;j<=i;j++) sum += orig[j]; sum /= 7;
    const x = pad+i*dx, y = h/2-sum;
    i===6 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  }
  ctx.stroke();
  // Rolling std (7)
  ctx.beginPath(); ctx.strokeStyle = col.ac2; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  for(let i=6;i<n;i++){
    let sum=0, sum2=0;
    for(let j=i-6;j<=i;j++){ sum+=orig[j]; sum2+=orig[j]*orig[j]; }
    const std = Math.sqrt(sum2/7 - (sum/7)**2);
    const x = pad+i*dx, y = h - pad - std*4;
    i===6 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = col.ac; ctx.font = '10px monospace';
  ctx.fillText('— rolling mean(7)', w - 180, pad + 4);
  ctx.fillStyle = col.ac2;
  ctx.fillText('--- rolling std(7)', w - 180, pad + 18);
},

/* 22 — Cross-Validation for TS */
'cross-validation-ts': function(){
  const s = setupCanvas('tscvCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const fSlider = document.getElementById('tscvFolds');
  const mSlider = document.getElementById('tscvMode');
  const fDisp = document.getElementById('tscvFoldsV');
  const mDisp = document.getElementById('tscvModeV');
  function draw(){
    const folds = fSlider ? +fSlider.value : 5;
    const mode = mSlider ? +mSlider.value : 1;
    if(fDisp) fDisp.textContent = folds;
    if(mDisp) mDisp.textContent = mode === 1 ? 'Expanding' : 'Sliding';
    ctx.clearRect(0,0,w,h);
    const rowH = (h - 2*pad) / folds;
    const barH = rowH * 0.6;
    const totalW = w - 2*pad;
    for(let f=0;f<folds;f++){
      const y = pad + f * rowH;
      const testEnd = (f + 1) / folds;
      const testStart = testEnd - 1 / (folds + 1);
      const trainStart = mode === 1 ? 0 : Math.max(0, testStart - 2 / folds);
      // Train
      ctx.fillStyle = col.ac + '55';
      const tx = pad + trainStart * totalW;
      const tw = (testStart - trainStart) * totalW;
      ctx.fillRect(tx, y + (rowH-barH)/2, tw, barH);
      // Test
      ctx.fillStyle = col.ac2 + '77';
      const testX = pad + testStart * totalW;
      const testW = (testEnd - testStart) * totalW;
      ctx.fillRect(testX, y + (rowH-barH)/2, testW, barH);
      // Label
      ctx.fillStyle = col.mt; ctx.font = '9px monospace';
      ctx.fillText(`Fold ${f+1}`, pad - 2, y + rowH/2 + 3);
    }
    // Legend
    ctx.fillStyle = col.ac + '55'; ctx.fillRect(w - 160, pad - 16, 20, 10);
    ctx.fillStyle = col.mt; ctx.font = '10px monospace'; ctx.fillText('Train', w - 134, pad - 7);
    ctx.fillStyle = col.ac2 + '77'; ctx.fillRect(w - 80, pad - 16, 20, 10);
    ctx.fillStyle = col.mt; ctx.fillText('Test', w - 54, pad - 7);
  }
  draw();
  if(fSlider) fSlider.oninput = draw;
  if(mSlider) mSlider.oninput = draw;
},

/* 23 — Backtesting Forecasts */
'backtesting-forecasts': function(){
  const s = setupCanvas('btCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  drawAxes(ctx, w, h, pad, col);
  srand(77);
  const n = 120, fh = 20, dx = (w - 2*pad) / (n + fh);
  const vals = [];
  let v = 50;
  for(let i=0;i<n+fh;i++){ v += Math.sin(i*0.1)*2 + randN()*3; vals.push(v); }
  const mn = Math.min(...vals)-5, mx = Math.max(...vals)+5, rng = mx-mn;
  const toY = v => pad + (1-(v-mn)/rng)*(h-2*pad);
  // Actual
  ctx.beginPath(); ctx.strokeStyle = col.fg; ctx.lineWidth = 1.5;
  vals.forEach((v,i) => { const x=pad+i*dx; i===0?ctx.moveTo(x,toY(v)):ctx.lineTo(x,toY(v)); });
  ctx.stroke();
  // Forecast
  srand(88);
  ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2; ctx.setLineDash([6,3]);
  for(let i=n;i<n+fh;i++){
    const x = pad+i*dx;
    const fv = vals[n-1] + (i-n)*0.5 + randN()*4;
    i===n ? ctx.moveTo(x,toY(fv)) : ctx.lineTo(x,toY(fv));
  }
  ctx.stroke(); ctx.setLineDash([]);
  // Split line
  const splitX = pad + n*dx;
  ctx.strokeStyle = col.mt; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(splitX, pad); ctx.lineTo(splitX, h-pad); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = col.mt; ctx.font = '10px monospace';
  ctx.fillText('← History', pad + 4, pad - 6);
  ctx.fillStyle = col.ac; ctx.fillText('Forecast →', splitX + 4, pad - 6);
},

/* 24 — Anomaly Detection */
'anomaly-detection': function(){
  const s = setupCanvas('anomCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  const slider = document.getElementById('anomThresh');
  const disp = document.getElementById('anomThreshV');
  function draw(){
    const thresh = slider ? +slider.value : 2;
    if(disp) disp.textContent = parseFloat(thresh).toFixed(1);
    ctx.clearRect(0,0,w,h);
    drawAxes(ctx, w, h, pad, col);
    srand(53);
    const n = 150, dx = (w - 2*pad) / n;
    const vals = [];
    for(let i=0;i<n;i++){
      let v = Math.sin(i*0.1)*20 + randN()*8;
      if(i===40) v += 50;
      if(i===90) v -= 45;
      if(i===120) v += 35;
      vals.push(v);
    }
    // rolling mean/std
    const win = 20;
    ctx.beginPath(); ctx.strokeStyle = col.fg + '88'; ctx.lineWidth = 1;
    vals.forEach((v,i) => { const x=pad+i*dx, y=h/2-v; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.stroke();
    // threshold bands & anomalies
    for(let i=win;i<n;i++){
      let sum=0, sum2=0;
      for(let j=i-win;j<i;j++){ sum+=vals[j]; sum2+=vals[j]*vals[j]; }
      const mean = sum/win, std = Math.sqrt(sum2/win - mean*mean);
      const x = pad+i*dx;
      const z = Math.abs(vals[i] - mean) / (std || 1);
      if(z > thresh){
        ctx.fillStyle = '#f4433688';
        ctx.beginPath(); ctx.arc(x, h/2 - vals[i], 6, 0, Math.PI*2); ctx.fill();
      }
    }
    ctx.fillStyle = col.mt; ctx.font = '11px monospace';
    ctx.fillText(`Threshold: ${parseFloat(thresh).toFixed(1)}σ`, pad+4, pad-6);
  }
  draw();
  if(slider) slider.oninput = draw;
},

/* 25 — Forecast Ensembles */
'forecast-ensembles': function(){
  const s = setupCanvas('ensembleCanvas'); if(!s) return;
  const {ctx,w,h} = s, col = colors(), pad = 30;
  drawAxes(ctx, w, h, pad, col);
  srand(99);
  const n = 100, fh = 30, dx = (w - 2*pad) / (n + fh);
  const base = []; let v = 0;
  for(let i=0;i<n+fh;i++){ v += Math.sin(i*0.08)*1.5 + randN()*2; base.push(v); }
  const mn = Math.min(...base)-10, mx = Math.max(...base)+10, rng = mx-mn;
  const toY = v => pad + (1-(v-mn)/rng)*(h-2*pad);
  // Actual
  ctx.beginPath(); ctx.strokeStyle = col.fg + '66'; ctx.lineWidth = 1;
  base.forEach((v,i) => { if(i<=n){ const x=pad+i*dx; i===0?ctx.moveTo(x,toY(v)):ctx.lineTo(x,toY(v)); }});
  ctx.stroke();
  // Individual forecasts
  const modelColors = ['#e57373','#64b5f6','#81c784'];
  const modelNames = ['ARIMA','ETS','LSTM'];
  const forecasts = [];
  for(let m=0;m<3;m++){
    srand(m*17+1);
    const f = [];
    for(let i=0;i<fh;i++){ f.push(base[n] + (i+1)*0.3*(m-1) + randN()*5*(1+m*0.3)); }
    forecasts.push(f);
    ctx.beginPath(); ctx.strokeStyle = modelColors[m] + '88'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
    for(let i=0;i<fh;i++){ const x=pad+(n+i)*dx; i===0?ctx.moveTo(x,toY(f[i])):ctx.lineTo(x,toY(f[i])); }
    ctx.stroke(); ctx.setLineDash([]);
  }
  // Ensemble (average)
  ctx.beginPath(); ctx.strokeStyle = col.ac; ctx.lineWidth = 2.5;
  for(let i=0;i<fh;i++){
    const avg = (forecasts[0][i] + forecasts[1][i] + forecasts[2][i]) / 3;
    const x = pad+(n+i)*dx;
    i===0 ? ctx.moveTo(x,toY(avg)) : ctx.lineTo(x,toY(avg));
  }
  ctx.stroke();
  // Legend
  const lx = w - 140, ly = pad;
  modelNames.forEach((name, i) => {
    ctx.fillStyle = modelColors[i]; ctx.font = '9px monospace';
    ctx.fillRect(lx, ly + i*14, 10, 8); ctx.fillText(name, lx + 14, ly + i*14 + 8);
  });
  ctx.fillStyle = col.ac; ctx.fillRect(lx, ly + 42, 10, 8); ctx.fillText('Ensemble', lx + 14, ly + 50);
},

}; /* end DRAWS */
