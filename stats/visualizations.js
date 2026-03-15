/* ═══════════════════════════════════════════════════════════════
   Statistics & Probability — Interactive Visualizations
   Canvas-based visual engine for every topic
   ═══════════════════════════════════════════════════════════════ */

const DPR = window.devicePixelRatio || 1;
function getCSS(v){ return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); }
function lerp(a,b,t){ return a+(b-a)*t; }

function setupCanvas(id){
  const c = document.getElementById(id);
  if(!c) return null;
  if(!c.dataset.origH) c.dataset.origH = c.getAttribute('height') || '240';
  const rect = c.parentElement.getBoundingClientRect();
  const w = rect.width - 2;
  const h = parseInt(c.dataset.origH);
  c.style.width = w + 'px';
  c.style.height = h + 'px';
  c.width = w * DPR;
  c.height = h * DPR;
  const ctx = c.getContext('2d');
  ctx.scale(DPR, DPR);
  return { c, ctx, w, h };
}

/* ── Seeded PRNG for reproducible demos ── */
let _seed = 42;
function srand(s){ _seed = s; }
function rand(){ _seed = (_seed * 16807 + 0) % 2147483647; return (_seed & 0x7fffffff) / 0x7fffffff; }
function randN(){ let u=0,v=0; while(!u) u=rand(); v=rand(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }

/* ── Gamma / factorial helpers ── */
function factorial(n){ let r=1; for(let i=2;i<=n;i++) r*=i; return r; }
function lnGamma(z){ const c=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5]; let x=z,y=z,tmp=x+5.5; tmp-=(x+0.5)*Math.log(tmp); let ser=1.000000000190015; for(let j=0;j<6;j++) ser+=c[j]/++y; return -tmp+Math.log(2.5066282746310005*ser/x); }
function beta(a,b){ return Math.exp(lnGamma(a)+lnGamma(b)-lnGamma(a+b)); }
function betaPDF(x,a,b){ if(x<=0||x>=1) return 0; return Math.pow(x,a-1)*Math.pow(1-x,b-1)/beta(a,b); }

/* ── Normal PDF/CDF helpers ── */
function normPDF(x,mu,sig){ const z=(x-mu)/sig; return Math.exp(-0.5*z*z)/(sig*Math.sqrt(2*Math.PI)); }
function normCDF(x){ const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429; const sign=x<0?-1:1; x=Math.abs(x)/Math.SQRT2; const t=1/(1+0.3275911*x); const y=1-((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t*Math.exp(-x*x); return 0.5*(1+sign*y); }

/* ── Binomial PMF ── */
function binomPMF(k,n,p){ return Math.exp(lnGamma(n+1)-lnGamma(k+1)-lnGamma(n-k+1)+k*Math.log(p)+(n-k)*Math.log(1-p)); }

/* ── Poisson PMF ── */
function poissonPMF(k,lam){ return Math.exp(-lam+k*Math.log(lam)-lnGamma(k+1)); }

/* ── Chi-squared PDF ── */
function chiPDF(x,k){ if(x<=0) return 0; const hk=k/2; return Math.pow(x,hk-1)*Math.exp(-x/2)/(Math.pow(2,hk)*Math.exp(lnGamma(hk))); }

/* ── t-distribution PDF ── */
function tPDF(x,df){ return Math.exp(lnGamma((df+1)/2)-lnGamma(df/2))/(Math.sqrt(df*Math.PI))*Math.pow(1+x*x/df,-(df+1)/2); }

/* ═══════════════════════════════════════════════════════════════
   DRAWS — one entry per topic, keyed by topic id
   ═══════════════════════════════════════════════════════════════ */
const DRAWS = {

/* ── 01 Mean, Median & Mode ── */
'mean-median': function(){
  const s = setupCanvas('meanCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const outPos = parseFloat(document.getElementById('outlierPos')?.value||8);
  document.getElementById('outlierPosV').textContent = outPos.toFixed(1);
  const data = [1, 2, 3, 3, 4, 4, 4, 5, 5, 6, 7, outPos];
  const sorted = [...data].sort((a,b)=>a-b);
  const mean = data.reduce((a,b)=>a+b,0)/data.length;
  const mid = Math.floor(sorted.length/2);
  const median = sorted.length%2 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
  document.getElementById('meanV').textContent = mean.toFixed(2);
  document.getElementById('medianV').textContent = median.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad = 40, plotW = w-2*pad, plotH = h-80;
  const minX = 0, maxX = Math.max(55, outPos+2);
  const toX = v => pad + (v-minX)/(maxX-minX)*plotW;
  // Axis
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, h-40); ctx.lineTo(w-pad, h-40); ctx.stroke();
  for(let t=0;t<=maxX;t+=5){ const x=toX(t); ctx.fillStyle=muted; ctx.font='10px Inter'; ctx.textAlign='center'; ctx.fillText(t,x,h-26); }
  // Data points
  data.forEach((v,i)=>{
    const x = toX(v);
    ctx.beginPath(); ctx.arc(x, h-60-(i%3)*16, 5, 0, Math.PI*2);
    ctx.fillStyle = v===outPos ? '#e74c3c' : fg+'88';
    ctx.fill();
  });
  // Mean line
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.setLineDash([5,3]);
  ctx.beginPath(); ctx.moveTo(toX(mean),30); ctx.lineTo(toX(mean),h-40); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Mean = '+mean.toFixed(2), toX(mean), 24);
  // Median line
  ctx.strokeStyle = accent2; ctx.lineWidth = 2; ctx.setLineDash([5,3]);
  ctx.beginPath(); ctx.moveTo(toX(median),30); ctx.lineTo(toX(median),h-40); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent2; ctx.font = 'bold 11px Inter';
  ctx.fillText('Median = '+median.toFixed(2), toX(median), 14);
},

/* ── 02 Variance & Std Dev ── */
'variance-std': function(){
  const s = setupCanvas('varCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const spread = parseFloat(document.getElementById('varSpread')?.value||1);
  document.getElementById('varSpreadV').textContent = spread.toFixed(1);
  srand(77);
  const data = []; for(let i=0;i<60;i++) data.push(5 + randN()*spread);
  const mean = data.reduce((a,b)=>a+b,0)/data.length;
  const variance = data.reduce((a,v)=>a+(v-mean)**2,0)/(data.length-1);
  const std = Math.sqrt(variance);
  document.getElementById('varValV').textContent = variance.toFixed(3);
  document.getElementById('stdValV').textContent = std.toFixed(3);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, minX=0, maxX=10;
  const toX = v => pad + (v-minX)/(maxX-minX)*(w-2*pad);
  // axis
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  // dots
  data.forEach(v => {
    const x = toX(Math.max(minX, Math.min(maxX,v)));
    ctx.beginPath(); ctx.arc(x, h-50, 3, 0, Math.PI*2);
    ctx.fillStyle = fg+'66'; ctx.fill();
  });
  // mean
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toX(mean),20); ctx.lineTo(toX(mean),h-30); ctx.stroke();
  ctx.fillStyle = accent; ctx.font='bold 11px Inter'; ctx.textAlign='center';
  ctx.fillText('x̄ = '+mean.toFixed(2), toX(mean), 16);
  // ±1 std
  ctx.fillStyle = accent3+'22';
  const left = toX(mean-std), right = toX(mean+std);
  ctx.fillRect(left, 30, right-left, h-60);
  ctx.strokeStyle = accent3; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(left,30); ctx.lineTo(left,h-30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(right,30); ctx.lineTo(right,h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent3; ctx.font='10px Inter';
  ctx.fillText('−1σ', left, h-18);
  ctx.fillText('+1σ', right, h-18);
},

/* ── 03 Percentiles & Quartiles ── */
'percentiles': function(){
  const s = setupCanvas('percCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const n = parseInt(document.getElementById('percN')?.value||50);
  document.getElementById('percNV').textContent = n;
  const data = []; for(let i=0;i<n;i++) data.push(randN()*2 + 5);
  data.sort((a,b)=>a-b);
  const q1 = data[Math.floor(n*0.25)], med = data[Math.floor(n*0.5)], q3 = data[Math.floor(n*0.75)];
  const iqr = q3 - q1;
  const lo = q1 - 1.5*iqr, hi = q3 + 1.5*iqr;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, minV=Math.min(...data)-1, maxV=Math.max(...data)+1;
  const toX = v => pad + (v-minV)/(maxV-minV)*(w-2*pad);
  const cy = h/2;
  // box
  ctx.fillStyle = accent3+'33';
  ctx.fillRect(toX(q1), cy-25, toX(q3)-toX(q1), 50);
  ctx.strokeStyle = accent3; ctx.lineWidth = 2;
  ctx.strokeRect(toX(q1), cy-25, toX(q3)-toX(q1), 50);
  // median line
  ctx.strokeStyle = accent; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(toX(med), cy-25); ctx.lineTo(toX(med), cy+25); ctx.stroke();
  // whiskers
  const wLo = Math.max(data[0], lo), wHi = Math.min(data[data.length-1], hi);
  ctx.strokeStyle = fg; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(toX(wLo), cy); ctx.lineTo(toX(q1), cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(q3), cy); ctx.lineTo(toX(wHi), cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(wLo), cy-10); ctx.lineTo(toX(wLo), cy+10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(wHi), cy-10); ctx.lineTo(toX(wHi), cy+10); ctx.stroke();
  // outliers
  data.forEach(v => {
    if(v < lo || v > hi){
      ctx.beginPath(); ctx.arc(toX(v), cy, 4, 0, Math.PI*2);
      ctx.fillStyle = accent+'cc'; ctx.fill();
    }
  });
  // labels
  ctx.fillStyle = muted; ctx.font = '10px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Q1='+q1.toFixed(1), toX(q1), cy+44);
  ctx.fillText('Med='+med.toFixed(1), toX(med), cy-32);
  ctx.fillText('Q3='+q3.toFixed(1), toX(q3), cy+44);
  ctx.fillText('IQR='+iqr.toFixed(2), (toX(q1)+toX(q3))/2, cy+58);
},

/* ── 04 Correlation ── */
'correlation': function(){
  const s = setupCanvas('corrCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const targetR = parseFloat(document.getElementById('corrR')?.value||0.7);
  document.getElementById('corrRV').textContent = targetR.toFixed(2);
  srand(55);
  const n=80, xs=[], ys=[];
  for(let i=0;i<n;i++){
    const x = randN();
    const noise = randN();
    const y = targetR*x + Math.sqrt(1-targetR*targetR)*noise;
    xs.push(x); ys.push(y);
  }
  // compute actual r
  const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0,syy=0;
  for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; syy+=(ys[i]-my)**2; }
  const actualR = sxy/Math.sqrt(sxx*syy);
  document.getElementById('corrActV').textContent = actualR.toFixed(3);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-2*pad;
  const xMin=-3.5, xMax=3.5, yMin=-3.5, yMax=3.5;
  const toSX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const toSY = v => h-pad - (v-yMin)/(yMax-yMin)*pH;
  // axes
  ctx.strokeStyle = muted; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.stroke();
  // points
  for(let i=0;i<n;i++){
    ctx.beginPath(); ctx.arc(toSX(xs[i]), toSY(ys[i]), 3, 0, Math.PI*2);
    ctx.fillStyle = accent+'88'; ctx.fill();
  }
  // best fit line
  const slope = sxy/sxx, intercept = my - slope*mx;
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toSX(xMin), toSY(slope*xMin+intercept)); ctx.lineTo(toSX(xMax), toSY(slope*xMax+intercept)); ctx.stroke();
  // r label
  ctx.fillStyle = fg; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'right';
  ctx.fillText('r = '+actualR.toFixed(3), w-pad-4, pad+16);
},

/* ── 05 Covariance ── */
'covariance': function(){
  const s = setupCanvas('covCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const covVal = parseFloat(document.getElementById('covVal')?.value||1.5);
  document.getElementById('covValV').textContent = covVal.toFixed(1);
  srand(33);
  const n=60, xs=[], ys=[];
  const r = covVal/3; // normalize
  for(let i=0;i<n;i++){
    const x = randN(); const noise = randN();
    const y = r*x + Math.sqrt(Math.max(0.01,1-r*r))*noise;
    xs.push(x); ys.push(y);
  }
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40,pW=w-2*pad,pH=h-2*pad;
  const toSX = v => pad + (v+4)/8*pW;
  const toSY = v => h-pad - (v+4)/8*pH;
  ctx.strokeStyle = muted; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(toSX(0),pad); ctx.lineTo(toSX(0),h-pad); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,toSY(0)); ctx.lineTo(w-pad,toSY(0)); ctx.stroke();
  for(let i=0;i<n;i++){
    const q = (xs[i]>0&&ys[i]>0)||(xs[i]<0&&ys[i]<0) ? 1 : 0;
    ctx.beginPath(); ctx.arc(toSX(xs[i]),toSY(ys[i]),3,0,Math.PI*2);
    ctx.fillStyle = covVal>0 ? (q?accent+'aa':'#88888866') : (q?'#88888866':accent+'aa');
    ctx.fill();
  }
  ctx.fillStyle = fg; ctx.font='bold 11px Inter'; ctx.textAlign='center';
  ctx.fillText('Cov = '+covVal.toFixed(1), w/2, 20);
},

/* ── 06 Probability Basics ── */
'prob-basics': function(){
  const s = setupCanvas('probCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const pA = parseFloat(document.getElementById('pA')?.value||0.4);
  const pB = parseFloat(document.getElementById('pB')?.value||0.3);
  let pAB = parseFloat(document.getElementById('pAB')?.value||0.1);
  pAB = Math.min(pAB, Math.min(pA, pB));
  document.getElementById('pAV').textContent = pA.toFixed(2);
  document.getElementById('pBV').textContent = pB.toFixed(2);
  document.getElementById('pABV').textContent = pAB.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const cx = w/2, cy = h/2 + 10, rA = 70, rB = 65;
  const sep = 100 - pAB*150;
  // A circle
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.arc(cx - sep/2, cy, rA, 0, Math.PI*2); ctx.fill();
  // B circle
  ctx.fillStyle = accent3;
  ctx.beginPath(); ctx.arc(cx + sep/2, cy, rB, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;
  // outlines
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx - sep/2, cy, rA, 0, Math.PI*2); ctx.stroke();
  ctx.strokeStyle = accent3;
  ctx.beginPath(); ctx.arc(cx + sep/2, cy, rB, 0, Math.PI*2); ctx.stroke();
  // labels
  ctx.fillStyle = fg; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('A', cx - sep/2 - 30, cy);
  ctx.fillText('B', cx + sep/2 + 30, cy);
  ctx.fillStyle = muted; ctx.font = '11px Inter';
  ctx.fillText('P(A∪B) = '+(pA+pB-pAB).toFixed(2), w/2, h-8);
  ctx.fillText('P(A∩B) = '+pAB.toFixed(2), w/2, 16);
},

/* ── 07 Conditional Probability ── */
'conditional': function(){
  const s = setupCanvas('condCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const pB = parseFloat(document.getElementById('condPB')?.value||0.5);
  const pAgivenB = parseFloat(document.getElementById('condPAB')?.value||0.7);
  const joint = pB * pAgivenB;
  document.getElementById('condPBV').textContent = pB.toFixed(2);
  document.getElementById('condPABV').textContent = pAgivenB.toFixed(2);
  document.getElementById('condJoint').textContent = joint.toFixed(3);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // tree diagram
  const startX = 60, startY = h/2;
  ctx.strokeStyle = fg; ctx.lineWidth = 2;
  // B branch
  ctx.beginPath(); ctx.moveTo(startX,startY); ctx.lineTo(startX+120, startY-60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(startX,startY); ctx.lineTo(startX+120, startY+60); ctx.stroke();
  ctx.fillStyle = accent2; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('B: '+pB.toFixed(2), startX+60, startY-68);
  ctx.fillStyle = muted;
  ctx.fillText("B': "+(1-pB).toFixed(2), startX+60, startY+75);
  // A|B branches
  const bx = startX+120, by1 = startY-60, by2 = startY+60;
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(bx,by1); ctx.lineTo(bx+120, by1-35); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx,by1); ctx.lineTo(bx+120, by1+35); ctx.stroke();
  ctx.fillStyle = accent; ctx.font = '11px Inter';
  ctx.fillText('A|B: '+pAgivenB.toFixed(2), bx+60, by1-42);
  ctx.fillStyle = muted;
  ctx.fillText("A'|B: "+(1-pAgivenB).toFixed(2), bx+60, by1+48);
  // result
  const rx = bx+140;
  ctx.fillStyle = fg; ctx.font = 'bold 12px Inter';
  ctx.fillText('P(A∩B)='+joint.toFixed(3), rx, by1-35);
  // circle at each node
  [{ x:startX, y:startY }, { x:bx, y:by1 }, { x:bx, y:by2 }].forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
    ctx.fillStyle = fg; ctx.fill();
  });
},

/* ── 08 Independence ── */
'independence': function(){
  const s = setupCanvas('indepCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const pA = parseFloat(document.getElementById('indA')?.value||0.5);
  const pB = parseFloat(document.getElementById('indB')?.value||0.4);
  const pAB = parseFloat(document.getElementById('indAB')?.value||0.2);
  document.getElementById('indAV').textContent = pA.toFixed(2);
  document.getElementById('indBV').textContent = pB.toFixed(2);
  document.getElementById('indABV').textContent = pAB.toFixed(2);
  const product = pA * pB;
  const isIndep = Math.abs(pAB - product) < 0.015;
  document.getElementById('indStatus').textContent = isIndep ? '✓ Independent' : '✗ Dependent';
  document.getElementById('indStatus').style.color = isIndep ? getCSS('--accent2') : getCSS('--accent');
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // bar comparison
  const barW = 80, gap = 40;
  const cx1 = w/2 - barW - gap/2, cx2 = w/2 + gap/2;
  const maxH = h - 60;
  const h1 = pAB * maxH / 0.5, h2 = product * maxH / 0.5;
  ctx.fillStyle = accent+'88';
  ctx.fillRect(cx1, h-30-h1, barW, h1);
  ctx.fillStyle = accent2+'88';
  ctx.fillRect(cx2, h-30-h2, barW, h2);
  ctx.strokeStyle = fg; ctx.lineWidth = 1;
  ctx.strokeRect(cx1, h-30-h1, barW, h1);
  ctx.strokeRect(cx2, h-30-h2, barW, h2);
  ctx.fillStyle = fg; ctx.font = '11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('P(A∩B) = '+pAB.toFixed(2), cx1+barW/2, h-14);
  ctx.fillText('P(A)·P(B) = '+product.toFixed(3), cx2+barW/2, h-14);
  ctx.font = 'bold 12px Inter';
  ctx.fillText(isIndep ? 'Equal → Independent' : 'Not equal → Dependent', w/2, 20);
},

/* ── 09 Combinatorics ── */
'combinatorics': function(){
  const s = setupCanvas('combCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  let nVal = parseInt(document.getElementById('combN')?.value||10);
  let kVal = parseInt(document.getElementById('combK')?.value||3);
  if(kVal > nVal) kVal = nVal;
  document.getElementById('combNV').textContent = nVal;
  document.getElementById('combKV').textContent = kVal;
  const perms = factorial(nVal)/factorial(nVal-kVal);
  const combs = factorial(nVal)/(factorial(kVal)*factorial(nVal-kVal));
  document.getElementById('combPerms').textContent = perms > 1e9 ? perms.toExponential(2) : perms.toLocaleString();
  document.getElementById('combCombs').textContent = combs > 1e9 ? combs.toExponential(2) : combs.toLocaleString();
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // draw Pascal's triangle rows up to min(nVal, 10)
  const maxRow = Math.min(nVal, 10);
  const cellW = Math.min(36, (w-20)/(maxRow+2));
  ctx.font = '10px "IBM Plex Mono"'; ctx.textAlign = 'center';
  for(let r=0;r<=maxRow;r++){
    for(let c=0;c<=r;c++){
      const val = factorial(r)/(factorial(c)*factorial(r-c));
      const x = w/2 + (c - r/2)*cellW;
      const y = 16 + r*(h-30)/(maxRow+1);
      const highlight = r===nVal && c===kVal;
      ctx.fillStyle = highlight ? accent : fg+'88';
      ctx.fillText(val > 999 ? '…' : val, x, y);
    }
  }
  ctx.fillStyle = muted; ctx.font = '10px Inter'; ctx.textAlign = 'left';
  ctx.fillText("Pascal's triangle (rows 0–"+maxRow+")", 6, h-6);
},

/* ── 10 Law of Large Numbers ── */
'law-large-numbers': function(){
  const s = setupCanvas('llnCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  ctx.fillStyle = getCSS('--bg'); ctx.fillRect(0,0,w,h);
  const muted = getCSS('--muted'), accent = getCSS('--accent'), accent2 = getCSS('--accent2'), fg = getCSS('--text');
  // true mean for a die = 3.5
  ctx.strokeStyle = accent2; ctx.lineWidth = 1; ctx.setLineDash([5,3]);
  const pad=40, plotH=h-60;
  const y35 = pad + plotH*(1 - (3.5-1)/5);
  ctx.beginPath(); ctx.moveTo(pad,y35); ctx.lineTo(w-pad,y35); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent2; ctx.font='10px Inter'; ctx.textAlign='left';
  ctx.fillText('μ = 3.5', w-pad+4, y35+4);
  // axes
  ctx.strokeStyle = muted; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,h-20); ctx.lineTo(w-pad,h-20); ctx.stroke();
  ctx.fillStyle = muted; ctx.font='9px Inter'; ctx.textAlign='center';
  ctx.fillText('n (rolls)', w/2, h-4);
  document.getElementById('llnCurrent').textContent = 'Press play';
},

/* ── 11 Normal Distribution ── */
'normal': function(){
  const s = setupCanvas('normCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const mu = parseFloat(document.getElementById('normMu')?.value||0);
  const sig = parseFloat(document.getElementById('normSig')?.value||1);
  document.getElementById('normMuV').textContent = mu.toFixed(1);
  document.getElementById('normSigV').textContent = sig.toFixed(1);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-60;
  // Fixed axis so the curve visibly moves and reshapes
  const xMin=-10, xMax=10;
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const maxPDF = 1/(0.3*Math.sqrt(2*Math.PI)); // max possible PDF (at sig=0.3)
  const toY = v => h-30 - (v/maxPDF)*pH;
  // fill 1σ, 2σ, 3σ regions
  const regions = [
    { lo:mu-3*sig, hi:mu+3*sig, color:accent3+'11' },
    { lo:mu-2*sig, hi:mu+2*sig, color:accent3+'1a' },
    { lo:mu-sig, hi:mu+sig, color:accent3+'33' },
  ];
  regions.forEach(r => {
    const lo = Math.max(r.lo, xMin), hi = Math.min(r.hi, xMax);
    if(lo >= hi) return;
    ctx.fillStyle = r.color;
    ctx.beginPath(); ctx.moveTo(toX(lo), h-30);
    for(let x=lo;x<=hi;x+=(xMax-xMin)/300){ ctx.lineTo(toX(x), toY(normPDF(x,mu,sig))); }
    ctx.lineTo(toX(hi), h-30); ctx.closePath(); ctx.fill();
  });
  // curve
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  let first = true;
  for(let x=xMin;x<=xMax;x+=(xMax-xMin)/300){
    const sx=toX(x), sy=toY(normPDF(x,mu,sig));
    first ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
    first = false;
  }
  ctx.stroke();
  // axis
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  // tick marks
  ctx.fillStyle = muted; ctx.font = '10px Inter'; ctx.textAlign = 'center';
  for(let t=Math.ceil(xMin);t<=Math.floor(xMax);t+=1){
    if(t%2!==0 && xMax-xMin>10) continue;
    const tx = toX(t);
    ctx.beginPath(); ctx.moveTo(tx,h-30); ctx.lineTo(tx,h-26); ctx.stroke();
    ctx.fillText(t, tx, h-16);
  }
  // σ markers
  ctx.setLineDash([4,3]);
  [-1,1].forEach(z => {
    const v = mu + z*sig;
    if(v>=xMin && v<=xMax){
      ctx.strokeStyle = accent2+'88'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(toX(v),h-30); ctx.lineTo(toX(v),toY(normPDF(v,mu,sig))); ctx.stroke();
    }
  });
  ctx.setLineDash([]);
  // labels
  ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='left';
  const peakY = toY(normPDF(mu,mu,sig));
  if(mu>=xMin && mu<=xMax){
    ctx.fillText('μ='+mu.toFixed(1)+', σ='+sig.toFixed(1), toX(mu)+6, Math.max(peakY-4, 14));
  }
  ctx.fillStyle = accent2; ctx.font='9px Inter';
  const s1x = toX(Math.min(mu+sig, xMax));
  if(mu+sig<=xMax && mu-sig>=xMin){
    ctx.fillText('68%', toX(mu)+2, toY(normPDF(mu,mu,sig)*0.55));
  }
},

/* ── 12 Binomial Distribution ── */
'binomial': function(){
  const s = setupCanvas('binomCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const n = parseInt(document.getElementById('binomN')?.value||20);
  const p = parseFloat(document.getElementById('binomP')?.value||0.5);
  document.getElementById('binomNV').textContent = n;
  document.getElementById('binomPV').textContent = p.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-50;
  const barW = Math.min(20, pW/(n+2));
  let maxP = 0;
  for(let k=0;k<=n;k++) maxP = Math.max(maxP, binomPMF(k,n,p));
  for(let k=0;k<=n;k++){
    const pmf = binomPMF(k,n,p);
    const x = pad + (k/(n))*pW;
    const bh = (pmf/maxP)*pH;
    ctx.fillStyle = accent+'88';
    ctx.fillRect(x - barW/2, h-30-bh, barW, bh);
    ctx.strokeStyle = accent; ctx.lineWidth = 0.5;
    ctx.strokeRect(x - barW/2, h-30-bh, barW, bh);
  }
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  // mean line
  const meanX = pad + (n*p/n)*pW;
  ctx.strokeStyle = getCSS('--accent2'); ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(meanX,20); ctx.lineTo(meanX,h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = getCSS('--accent2'); ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('E[X]='+((n*p).toFixed(1)), meanX, 14);
  ctx.fillStyle = muted; ctx.font='9px Inter';
  ctx.fillText('k', w/2, h-14);
},

/* ── 13 Poisson Distribution ── */
'poisson': function(){
  const s = setupCanvas('poissonCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const lam = parseFloat(document.getElementById('poisLambda')?.value||4);
  document.getElementById('poisLambdaV').textContent = lam.toFixed(1);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const maxK = Math.max(15, Math.ceil(lam+4*Math.sqrt(lam)));
  const pad=40, pW=w-2*pad, pH=h-50;
  const barW = Math.min(20, pW/(maxK+2));
  let maxP=0;
  for(let k=0;k<=maxK;k++) maxP = Math.max(maxP, poissonPMF(k,lam));
  for(let k=0;k<=maxK;k++){
    const pmf = poissonPMF(k,lam);
    const x = pad + (k/maxK)*pW;
    const bh = (pmf/maxP)*pH;
    ctx.fillStyle = accent+'88';
    ctx.fillRect(x-barW/2, h-30-bh, barW, bh);
  }
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = muted; ctx.font='9px Inter'; ctx.textAlign='center';
  ctx.fillText('k', w/2, h-14);
},

/* ── 14 Exponential Distribution ── */
'exponential': function(){
  const s = setupCanvas('expCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const lam = parseFloat(document.getElementById('expLambda')?.value||1);
  document.getElementById('expLambdaV').textContent = lam.toFixed(1);
  const bg = getCSS('--bg'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-50;
  const xMax = 5/lam + 1;
  const toX = v => pad + v/xMax*pW;
  const toY = v => h-30 - v/(lam*1.1)*pH;
  ctx.fillStyle = accent+'22';
  ctx.beginPath(); ctx.moveTo(toX(0), h-30);
  for(let x=0;x<=xMax;x+=xMax/200){ ctx.lineTo(toX(x), toY(lam*Math.exp(-lam*x))); }
  ctx.lineTo(toX(xMax),h-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=0;x<=xMax;x+=xMax/200){ const sx=toX(x),sy=toY(lam*Math.exp(-lam*x)); x===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  // mean line
  const meanX = toX(1/lam);
  ctx.strokeStyle = getCSS('--accent2'); ctx.setLineDash([4,3]); ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(meanX,20); ctx.lineTo(meanX,h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = getCSS('--accent2'); ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('E[X]=1/λ='+(1/lam).toFixed(2), meanX, 14);
},

/* ── 15 Uniform Distribution ── */
'uniform': function(){
  const s = setupCanvas('uniCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const a = parseFloat(document.getElementById('uniA')?.value||-2);
  const b = parseFloat(document.getElementById('uniB')?.value||4);
  document.getElementById('uniAV').textContent = a.toFixed(1);
  document.getElementById('uniBV').textContent = b.toFixed(1);
  const bg = getCSS('--bg'), muted = getCSS('--muted'), accent = getCSS('--accent'), fg = getCSS('--text');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-50;
  const xMin=a-2, xMax=b+2;
  const density = 1/(b-a);
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const maxD = density*1.3;
  const toY = v => h-30 - v/maxD*pH;
  // fill
  ctx.fillStyle = accent+'33';
  ctx.fillRect(toX(a), toY(density), toX(b)-toX(a), toY(0)-toY(density));
  // border
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(xMin), toY(0)); ctx.lineTo(toX(a), toY(0)); ctx.lineTo(toX(a), toY(density));
  ctx.lineTo(toX(b), toY(density)); ctx.lineTo(toX(b), toY(0)); ctx.lineTo(toX(xMax), toY(0));
  ctx.stroke();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('1/(b-a) = '+density.toFixed(3), (toX(a)+toX(b))/2, toY(density)-8);
},

/* ── 16 Beta Distribution ── */
'beta': function(){
  const s = setupCanvas('betaCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const a = parseFloat(document.getElementById('betaA')?.value||2);
  const b = parseFloat(document.getElementById('betaB')?.value||5);
  document.getElementById('betaAV').textContent = a.toFixed(1);
  document.getElementById('betaBV').textContent = b.toFixed(1);
  const bg = getCSS('--bg'), muted = getCSS('--muted'), accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-50;
  const toX = v => pad + v*pW;
  // find max
  let maxY = 0;
  for(let x=0.005;x<1;x+=0.005) maxY = Math.max(maxY, betaPDF(x,a,b));
  const toY = v => h-30 - (v/(maxY*1.1))*pH;
  // fill
  ctx.fillStyle = accent+'22';
  ctx.beginPath(); ctx.moveTo(toX(0),h-30);
  for(let x=0.005;x<=0.995;x+=0.005) ctx.lineTo(toX(x), toY(betaPDF(x,a,b)));
  ctx.lineTo(toX(1),h-30); ctx.closePath(); ctx.fill();
  // line
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=0.005;x<=0.995;x+=0.005){ const sx=toX(x),sy=toY(betaPDF(x,a,b)); x<0.01?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  // mean
  const mean = a/(a+b);
  ctx.strokeStyle = accent2; ctx.setLineDash([4,3]); ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(toX(mean),20); ctx.lineTo(toX(mean),h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent2; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('E = '+mean.toFixed(3), toX(mean), 14);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = muted; ctx.font='9px Inter';
  ctx.fillText('0', pad, h-16); ctx.textAlign='right'; ctx.fillText('1', w-pad, h-16);
},

/* ── 17 Chi-Squared Distribution ── */
'chi-squared': function(){
  const s = setupCanvas('chiCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const df = parseInt(document.getElementById('chiDF')?.value||3);
  document.getElementById('chiDFV').textContent = df;
  const bg = getCSS('--bg'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad, pH=h-50;
  const xMax = df + 4*Math.sqrt(2*df) + 5;
  const toX = v => pad + v/xMax*pW;
  let maxY=0;
  for(let x=0.1;x<xMax;x+=0.1) maxY = Math.max(maxY, chiPDF(x,df));
  const toY = v => h-30 - (v/(maxY*1.1))*pH;
  ctx.fillStyle = accent+'22';
  ctx.beginPath(); ctx.moveTo(toX(0.1),h-30);
  for(let x=0.1;x<xMax;x+=0.1) ctx.lineTo(toX(x),toY(chiPDF(x,df)));
  ctx.lineTo(toX(xMax),h-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=0.1;x<xMax;x+=0.1){ const sx=toX(x),sy=toY(chiPDF(x,df)); x<0.2?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = getCSS('--text'); ctx.font='11px Inter'; ctx.textAlign='right';
  ctx.fillText('df = '+df, w-pad-4, 20);
},

/* ── 18 Central Limit Theorem ── */
'clt': function(){
  const s = setupCanvas('cltCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  ctx.fillStyle = getCSS('--bg'); ctx.fillRect(0,0,w,h);
  ctx.fillStyle = getCSS('--muted'); ctx.font = '12px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Click a distribution button to simulate', w/2, h/2);
},

/* ── 19 Confidence Intervals ── */
'confidence': function(){
  const s = setupCanvas('ciCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const n = parseInt(document.getElementById('ciN')?.value||30);
  document.getElementById('ciNV').textContent = n;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const trueMu = 0, trueSig = 1;
  const numCI = 25;
  let hits = 0;
  const pad = 40, pW = w-2*pad;
  const xMin = -1, xMax = 1;
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const rowH = (h-40)/numCI;
  // true mean line
  ctx.strokeStyle = accent2; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toX(trueMu),10); ctx.lineTo(toX(trueMu),h-10); ctx.stroke();
  for(let i=0;i<numCI;i++){
    let sum=0; for(let j=0;j<n;j++) sum += randN()*trueSig+trueMu;
    const xbar = sum/n;
    const se = trueSig/Math.sqrt(n);
    const lo = xbar - 1.96*se, hi = xbar + 1.96*se;
    const contains = lo <= trueMu && hi >= trueMu;
    if(contains) hits++;
    const y = 16 + i*rowH;
    ctx.strokeStyle = contains ? accent2 : accent;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(toX(lo),y); ctx.lineTo(toX(hi),y); ctx.stroke();
    ctx.beginPath(); ctx.arc(toX(xbar),y,2.5,0,Math.PI*2);
    ctx.fillStyle = contains ? accent2 : accent; ctx.fill();
  }
  document.getElementById('ciCoverage').textContent = ((hits/numCI)*100).toFixed(0)+'% captured μ';
},

/* ── 20 Hypothesis Testing ── */
'hypothesis': function(){
  const s = setupCanvas('htCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const effect = parseFloat(document.getElementById('htEffect')?.value||1.5);
  const alpha = parseFloat(document.getElementById('htAlpha')?.value||0.05);
  document.getElementById('htEffectV').textContent = effect.toFixed(1);
  document.getElementById('htAlphaV').textContent = alpha.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-60;
  const xMin=-3.5, xMax=effect+3.5;
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const maxP = normPDF(0,0,1);
  const toY = v => h-30 - (v/maxP)*pH*0.9;
  // H0 distribution
  ctx.fillStyle = accent3+'22';
  ctx.beginPath(); ctx.moveTo(toX(xMin),h-30);
  for(let x=xMin;x<=xMax;x+=0.02) ctx.lineTo(toX(x),toY(normPDF(x,0,1)));
  ctx.lineTo(toX(xMax),h-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = accent3; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=xMin;x<=xMax;x+=0.02){ const sx=toX(x),sy=toY(normPDF(x,0,1)); x===xMin?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  // H1 distribution
  ctx.strokeStyle = accent2; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=xMin;x<=xMax;x+=0.02){ const sx=toX(x),sy=toY(normPDF(x,effect,1)); x===xMin?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  // critical value
  // For two-sided, z_alpha/2
  const zCrit = -normCDFInv(alpha/2);
  ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(toX(zCrit),20); ctx.lineTo(toX(zCrit),h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('H₀', toX(0), 16);
  ctx.fillText('H₁', toX(effect), 16);
  ctx.fillStyle = accent; ctx.fillText('z* = '+zCrit.toFixed(2), toX(zCrit), h-16);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
},

/* ── 21 P-Values ── */
'p-value': function(){
  const s = setupCanvas('pvalCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const z = parseFloat(document.getElementById('pvalZ')?.value||1.96);
  document.getElementById('pvalZV').textContent = z.toFixed(2);
  const pval = 2*(1 - normCDF(z));
  document.getElementById('pvalP').textContent = pval < 0.001 ? pval.toExponential(2) : pval.toFixed(4);
  const bg = getCSS('--bg'), muted = getCSS('--muted'), accent = getCSS('--accent'), fg = getCSS('--text');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-50;
  const xMin=-4, xMax=4;
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const maxP = normPDF(0,0,1);
  const toY = v => h-30 - v/maxP*pH*0.9;
  // curve
  ctx.strokeStyle = fg+'88'; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=xMin;x<=xMax;x+=0.02){ const sx=toX(x),sy=toY(normPDF(x,0,1)); x===xMin?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  // right tail
  ctx.fillStyle = accent+'44';
  ctx.beginPath(); ctx.moveTo(toX(z), h-30);
  for(let x=z;x<=xMax;x+=0.02) ctx.lineTo(toX(x), toY(normPDF(x,0,1)));
  ctx.lineTo(toX(xMax), h-30); ctx.closePath(); ctx.fill();
  // left tail
  ctx.beginPath(); ctx.moveTo(toX(-z), h-30);
  for(let x=-z;x>=xMin;x-=0.02) ctx.lineTo(toX(x), toY(normPDF(x,0,1)));
  ctx.lineTo(toX(xMin), h-30); ctx.closePath(); ctx.fill();
  // z lines
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(toX(z),20); ctx.lineTo(toX(z),h-30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(toX(-z),20); ctx.lineTo(toX(-z),h-30); ctx.stroke();
  ctx.fillStyle = accent; ctx.font='bold 11px Inter'; ctx.textAlign='center';
  ctx.fillText('z = '+z.toFixed(2), toX(z), 16);
  ctx.fillText('z = −'+z.toFixed(2), toX(-z), 16);
  ctx.fillStyle = muted; ctx.font='10px Inter';
  ctx.fillText('p = '+pval.toFixed(4), w/2, h-10);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
},

/* ── 22 T-Test ── */
't-test': function(){
  const s = setupCanvas('ttestCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const df = parseInt(document.getElementById('ttDF')?.value||5);
  document.getElementById('ttDFV').textContent = df;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-50;
  const xMin=-4, xMax=4;
  const toX = v => pad + (v-xMin)/(xMax-xMin)*pW;
  const maxP = Math.max(normPDF(0,0,1), tPDF(0,df));
  const toY = v => h-30 - v/maxP*pH*0.9;
  // normal
  ctx.strokeStyle = muted; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath();
  for(let x=xMin;x<=xMax;x+=0.02){ const sx=toX(x),sy=toY(normPDF(x,0,1)); x===xMin?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke(); ctx.setLineDash([]);
  // t-distribution
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=xMin;x<=xMax;x+=0.02){ const sx=toX(x),sy=toY(tPDF(x,df)); x===xMin?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = accent; ctx.font='bold 11px Inter'; ctx.textAlign='right';
  ctx.fillText('t(df='+df+')', w-pad-4, 20);
  ctx.fillStyle = muted; ctx.font='10px Inter';
  ctx.fillText('Normal (df=∞)', w-pad-4, 36);
},

/* ── 23 ANOVA ── */
'anova': function(){
  const s = setupCanvas('anovaCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const sep = parseFloat(document.getElementById('anovaSep')?.value||1.5);
  document.getElementById('anovaSepV').textContent = sep.toFixed(1);
  srand(88);
  const groups = [[], [], []];
  const means = [0, sep, sep*2];
  const colors = [getCSS('--accent'), getCSS('--accent2'), getCSS('--accent3')];
  const n = 20;
  means.forEach((mu,g) => { for(let i=0;i<n;i++) groups[g].push(mu + randN()); });
  // F-statistic
  const grandMean = groups.flat().reduce((a,b)=>a+b)/(3*n);
  let ssB=0, ssW=0;
  groups.forEach((g,idx) => {
    const gm = g.reduce((a,b)=>a+b)/n;
    ssB += n*(gm-grandMean)**2;
    g.forEach(v => ssW += (v-gm)**2);
  });
  const F = (ssB/2)/(ssW/(3*n-3));
  document.getElementById('anovaFV').textContent = F.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=40, pW=w-2*pad;
  const allVals = groups.flat();
  const minV = Math.min(...allVals)-1, maxV = Math.max(...allVals)+1;
  const toX = v => pad + (v-minV)/(maxV-minV)*pW;
  groups.forEach((g,idx) => {
    const y = 50 + idx*65;
    ctx.fillStyle = colors[idx]+'22';
    ctx.fillRect(pad, y-15, pW, 30);
    g.forEach(v => {
      ctx.beginPath(); ctx.arc(toX(v), y, 3.5, 0, Math.PI*2);
      ctx.fillStyle = colors[idx]+'aa'; ctx.fill();
    });
    const gm = g.reduce((a,b)=>a+b)/n;
    ctx.strokeStyle = colors[idx]; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(toX(gm),y-15); ctx.lineTo(toX(gm),y+15); ctx.stroke();
    ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='left';
    ctx.fillText('Group '+(idx+1)+' (μ̂='+gm.toFixed(2)+')', pad+4, y-18);
  });
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = fg; ctx.font='bold 12px Inter'; ctx.textAlign='center';
  ctx.fillText('F = '+F.toFixed(2), w/2, h-12);
},

/* ── 24 Bayesian Inference ── */
'bayesian-inference': function(){
  const s = setupCanvas('bayesInfCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const obs = parseInt(document.getElementById('biObs')?.value||10);
  const rate = parseFloat(document.getElementById('biRate')?.value||0.6);
  document.getElementById('biObsV').textContent = obs;
  document.getElementById('biRateV').textContent = rate.toFixed(2);
  const k = Math.round(obs*rate); // successes
  const priorA=1, priorB=1; // uniform prior
  const postA = priorA+k, postB = priorB+(obs-k);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-60;
  const toX = v => pad + v*pW;
  // find max for scaling
  let maxY = 0;
  for(let x=0.01;x<1;x+=0.01){
    maxY = Math.max(maxY, betaPDF(x,priorA,priorB), betaPDF(x,postA,postB));
  }
  const toY = v => h-30 - (v/(maxY*1.1))*pH;
  // prior
  ctx.strokeStyle = muted; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath();
  for(let x=0.01;x<1;x+=0.01){ const sx=toX(x),sy=toY(betaPDF(x,priorA,priorB)); x<0.02?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke(); ctx.setLineDash([]);
  // posterior
  ctx.fillStyle = accent+'22';
  ctx.beginPath(); ctx.moveTo(toX(0.01),h-30);
  for(let x=0.01;x<1;x+=0.01) ctx.lineTo(toX(x),toY(betaPDF(x,postA,postB)));
  ctx.lineTo(toX(0.99),h-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=0.01;x<1;x+=0.01){ const sx=toX(x),sy=toY(betaPDF(x,postA,postB)); x<0.02?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  // true rate
  ctx.strokeStyle = accent2; ctx.lineWidth = 1.5; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(toX(rate),20); ctx.lineTo(toX(rate),h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('Prior: Beta(1,1)', pad+60, 16);
  ctx.fillStyle = accent; ctx.fillText('Post: Beta('+postA+','+postB+')', w-pad-70, 16);
  ctx.fillStyle = accent2; ctx.fillText('true p='+rate.toFixed(2), toX(rate), h-10);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
},

/* ── 25 Conjugate Priors ── */
'conjugate-priors': function(){
  const s = setupCanvas('conjCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const a = parseFloat(document.getElementById('conjA')?.value||1);
  const b = parseFloat(document.getElementById('conjB')?.value||1);
  const k = parseInt(document.getElementById('conjK')?.value||7);
  const n = parseInt(document.getElementById('conjN')?.value||10);
  document.getElementById('conjAV').textContent = a.toFixed(1);
  document.getElementById('conjBV').textContent = b.toFixed(1);
  document.getElementById('conjKV').textContent = k;
  document.getElementById('conjNV').textContent = n;
  const postA = a+k, postB = b+(n-k);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-50;
  const toX = v => pad + v*pW;
  let maxY = 0;
  for(let x=0.01;x<1;x+=0.005){
    maxY = Math.max(maxY, betaPDF(x,a,b), betaPDF(x,postA,postB));
  }
  const toY = v => h-30 - (v/(maxY*1.1))*pH;
  // prior
  ctx.strokeStyle = accent3; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath();
  for(let x=0.01;x<1;x+=0.005){ const sx=toX(x),sy=toY(betaPDF(x,a,b)); x<0.015?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke(); ctx.setLineDash([]);
  // posterior
  ctx.fillStyle = accent+'22';
  ctx.beginPath(); ctx.moveTo(toX(0.01), h-30);
  for(let x=0.01;x<1;x+=0.005) ctx.lineTo(toX(x), toY(betaPDF(x,postA,postB)));
  ctx.lineTo(toX(0.99), h-30); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=0.01;x<1;x+=0.005){ const sx=toX(x),sy=toY(betaPDF(x,postA,postB)); x<0.015?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy); }
  ctx.stroke();
  ctx.fillStyle = accent3; ctx.font='10px Inter'; ctx.textAlign='left';
  ctx.fillText('Prior: Beta('+a.toFixed(1)+','+b.toFixed(1)+')', pad, 16);
  ctx.fillStyle = accent; ctx.textAlign='right';
  ctx.fillText('Post: Beta('+postA.toFixed(1)+','+postB.toFixed(1)+')', w-pad, 16);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
},

/* ── 26 MCMC ── */
'mcmc': function(){
  const s = setupCanvas('mcmcCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  ctx.fillStyle = getCSS('--bg'); ctx.fillRect(0,0,w,h);
  const muted = getCSS('--muted'), accent = getCSS('--accent');
  // draw target distribution contours
  const pad=40, pW=w*0.5-pad, pH=h-60;
  ctx.fillStyle = muted; ctx.font='11px Inter'; ctx.textAlign='center';
  ctx.fillText('Target posterior', w*0.25+pad/2, 16);
  ctx.fillText('Trace plot', w*0.75-pad/2, 16);
  // simple 2D Gaussian target contour
  for(let r=3;r>=1;r--){
    ctx.strokeStyle = accent + (r===1?'88':r===2?'44':'22');
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(w*0.25, h/2+10, r*30, r*20, 0, 0, Math.PI*2); ctx.stroke();
  }
  ctx.fillStyle = muted; ctx.font='10px Inter';
  ctx.fillText('Press SAMPLE to run Metropolis-Hastings', w/2, h-8);
  document.getElementById('mcmcCount').textContent = '0';
},

/* ── 27 Hierarchical Models ── */
'hierarchical': function(){
  const s = setupCanvas('hierCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const tau = parseFloat(document.getElementById('hierTau')?.value||1);
  document.getElementById('hierTauV').textContent = tau.toFixed(1);
  srand(123);
  const nGroups = 6, nPerGroup = 8;
  const grandMu = 5;
  const groupMu = []; for(let g=0;g<nGroups;g++) groupMu.push(grandMu + randN()*tau);
  const groupData = []; const groupMeans = [];
  for(let g=0;g<nGroups;g++){
    const d = []; for(let i=0;i<nPerGroup;i++) d.push(groupMu[g] + randN()*0.8);
    groupData.push(d);
    groupMeans.push(d.reduce((a,b)=>a+b)/nPerGroup);
  }
  // partial pooling means (shrinkage toward grand mean)
  const allMean = groupData.flat().reduce((a,b)=>a+b)/(nGroups*nPerGroup);
  const shrunk = groupMeans.map(m => {
    const shrink = (0.8**2/nPerGroup) / (0.8**2/nPerGroup + tau**2);
    return m * (1-shrink) + allMean * shrink;
  });
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50;
  const allVals = groupData.flat();
  const minV = Math.min(...allVals)-1, maxV = Math.max(...allVals)+1;
  const pW = w-2*pad;
  const toX = v => pad + (v-minV)/(maxV-minV)*pW;
  // grand mean line
  ctx.strokeStyle = accent2; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(toX(allMean),10); ctx.lineTo(toX(allMean),h-10); ctx.stroke();
  ctx.setLineDash([]); ctx.fillStyle=accent2; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('Grand μ', toX(allMean), h-4);
  // groups
  for(let g=0;g<nGroups;g++){
    const y = 30 + g*33;
    // raw mean
    ctx.beginPath(); ctx.arc(toX(groupMeans[g]),y,4,0,Math.PI*2);
    ctx.fillStyle = accent+'88'; ctx.fill();
    // shrunk mean
    ctx.beginPath(); ctx.arc(toX(shrunk[g]),y,5,0,Math.PI*2);
    ctx.fillStyle = accent3; ctx.fill();
    // arrow
    ctx.strokeStyle = muted; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(toX(groupMeans[g]),y); ctx.lineTo(toX(shrunk[g]),y); ctx.stroke();
    ctx.fillStyle = fg; ctx.font='9px Inter'; ctx.textAlign='right';
    ctx.fillText('G'+(g+1), pad-6, y+3);
  }
  ctx.fillStyle = accent; ctx.font='10px Inter'; ctx.textAlign='left';
  ctx.fillText('○ Raw mean', pad, h-18);
  ctx.fillStyle = accent3;
  ctx.fillText('● Shrunk (partial pooling)', pad+100, h-18);
},

/* ── 28 Bayesian Regression ── */
'bayesian-regression': function(){
  const s = setupCanvas('bayRegCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  ctx.fillStyle = getCSS('--bg'); ctx.fillRect(0,0,w,h);
  window._bayRegData = window._bayRegData || [];
  const data = window._bayRegData;
  document.getElementById('bayRegN').textContent = data.length;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  const pad=40, pW=w-2*pad, pH=h-2*pad;
  // axes
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.stroke();
  const toX = v => pad + v*pW;
  const toY = v => h-pad - v*pH;
  // data points
  data.forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(toX(x),toY(y),4,0,Math.PI*2);
    ctx.fillStyle = fg; ctx.fill();
  });
  // draw sample regression lines from "posterior"
  if(data.length >= 2){
    const xs = data.map(d=>d[0]), ys = data.map(d=>d[1]);
    const mx = xs.reduce((a,b)=>a+b)/xs.length, my = ys.reduce((a,b)=>a+b)/ys.length;
    let sxy=0, sxx=0;
    for(let i=0;i<xs.length;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; }
    const slope = sxx>0 ? sxy/sxx : 0;
    const intercept = my - slope*mx;
    const se = 0.3/Math.sqrt(data.length);
    for(let i=0;i<20;i++){
      const s2 = slope + randN()*se*2;
      const i2 = intercept + randN()*se;
      ctx.strokeStyle = accent+'22'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(toX(0),toY(i2)); ctx.lineTo(toX(1),toY(s2+i2)); ctx.stroke();
    }
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(toX(0),toY(intercept)); ctx.lineTo(toX(1),toY(slope+intercept)); ctx.stroke();
  }
  // click handler
  const c = s.c;
  if(!c._bayRegBound){
    c.addEventListener('click', e => {
      const rect = c.getBoundingClientRect();
      const mx = (e.clientX - rect.left - pad) / (rect.width - 2*pad);
      const my = 1 - (e.clientY - rect.top - pad) / (rect.height - 2*pad);
      if(mx >= 0 && mx <= 1 && my >= 0 && my <= 1){
        window._bayRegData.push([mx, my]);
        DRAWS['bayesian-regression']();
      }
    });
    c._bayRegBound = true;
  }
},

/* ── 29 A/B Testing ── */
'ab-testing': function(){
  const s = setupCanvas('abCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const uplift = parseFloat(document.getElementById('abUplift')?.value||3);
  const n = parseInt(document.getElementById('abN')?.value||500);
  document.getElementById('abUpliftV').textContent = uplift.toFixed(1)+'%';
  document.getElementById('abNV').textContent = n;
  srand(42);
  const baseRate = 0.10;
  const treatRate = baseRate * (1 + uplift/100);
  let ctrlSuccess=0, treatSuccess=0;
  for(let i=0;i<n;i++){ if(rand()<baseRate) ctrlSuccess++; if(rand()<treatRate) treatSuccess++; }
  const pC = ctrlSuccess/n, pT = treatSuccess/n;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // bars
  const barW = 80, gap = 50;
  const cx1 = w/2 - barW - gap/2, cx2 = w/2 + gap/2;
  const maxRate = Math.max(pC, pT)*1.3;
  const barH1 = pC/maxRate*(h-80), barH2 = pT/maxRate*(h-80);
  ctx.fillStyle = accent+'88'; ctx.fillRect(cx1, h-40-barH1, barW, barH1);
  ctx.fillStyle = accent2+'88'; ctx.fillRect(cx2, h-40-barH2, barW, barH2);
  ctx.strokeStyle = fg; ctx.lineWidth=1;
  ctx.strokeRect(cx1, h-40-barH1, barW, barH1);
  ctx.strokeRect(cx2, h-40-barH2, barW, barH2);
  ctx.fillStyle = fg; ctx.font='bold 12px Inter'; ctx.textAlign='center';
  ctx.fillText((pC*100).toFixed(1)+'%', cx1+barW/2, h-40-barH1-8);
  ctx.fillText((pT*100).toFixed(1)+'%', cx2+barW/2, h-40-barH2-8);
  ctx.font='11px Inter';
  ctx.fillText('Control (A)', cx1+barW/2, h-24);
  ctx.fillText('Treatment (B)', cx2+barW/2, h-24);
  // z-test
  const poolP = (ctrlSuccess+treatSuccess)/(2*n);
  const se = Math.sqrt(poolP*(1-poolP)*2/n);
  const z = se>0?(pT-pC)/se:0;
  const pval = 2*(1-normCDF(Math.abs(z)));
  ctx.fillStyle = pval<0.05?accent2:accent; ctx.font='bold 11px Inter';
  ctx.fillText('z = '+z.toFixed(2)+', p = '+pval.toFixed(4), w/2, 20);
  ctx.fillText(pval<0.05?'✓ Significant at α=0.05':'✗ Not significant at α=0.05', w/2, 36);
},

/* ── 30 Bootstrap ── */
'bootstrap': function(){
  const s = setupCanvas('bootCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const B = parseInt(document.getElementById('bootB')?.value||1000);
  document.getElementById('bootBV').textContent = B;
  srand(99);
  const data = []; for(let i=0;i<20;i++) data.push(randN()*2+5);
  const means = [];
  for(let b=0;b<B;b++){
    let sum=0; for(let i=0;i<data.length;i++) sum += data[Math.floor(rand()*data.length)];
    means.push(sum/data.length);
  }
  means.sort((a,b)=>a-b);
  const ci025 = means[Math.floor(B*0.025)], ci975 = means[Math.floor(B*0.975)];
  document.getElementById('bootCI').textContent = '['+ci025.toFixed(2)+', '+ci975.toFixed(2)+']';
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted'), accent = getCSS('--accent');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // histogram of bootstrap means
  const pad=40, pW=w-2*pad, pH=h-50;
  const minM = means[0]-0.5, maxM = means[means.length-1]+0.5;
  const nBins = 40;
  const bins = new Array(nBins).fill(0);
  means.forEach(m => { const idx = Math.min(nBins-1, Math.floor((m-minM)/(maxM-minM)*nBins)); bins[idx]++; });
  const maxBin = Math.max(...bins);
  const barW = pW/nBins;
  bins.forEach((count,i) => {
    const bh = (count/maxBin)*pH;
    const inCI = (minM + i/nBins*(maxM-minM)) >= ci025 && (minM + (i+1)/nBins*(maxM-minM)) <= ci975;
    ctx.fillStyle = inCI ? accent+'66' : accent+'22';
    ctx.fillRect(pad + i*barW, h-30-bh, barW-1, bh);
  });
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('Bootstrap distribution of x̄ (B='+B+')', w/2, 14);
},

/* ── 31 Power Analysis ── */
'power-analysis': function(){
  const s = setupCanvas('powerCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const d = parseFloat(document.getElementById('powEffect')?.value||0.5);
  const n = parseInt(document.getElementById('powN')?.value||50);
  document.getElementById('powEffectV').textContent = d.toFixed(2);
  document.getElementById('powNV').textContent = n;
  const se = 1/Math.sqrt(n);
  const zAlpha = 1.96;
  const power = 1 - normCDF(zAlpha - d/se);
  document.getElementById('powVal').textContent = (power*100).toFixed(1)+'%';
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // power curve: power vs n for current d
  const pad=50, pW=w-2*pad, pH=h-60;
  const maxN = 200;
  const toX = v => pad + v/maxN*pW;
  const toY = v => h-30 - v*pH;
  // curve
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let nn=5;nn<=maxN;nn+=2){
    const se2 = 1/Math.sqrt(nn);
    const pow = 1 - normCDF(zAlpha - d/se2);
    const sx = toX(nn), sy = toY(pow);
    nn===5?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
  }
  ctx.stroke();
  // 80% line
  ctx.strokeStyle = accent2; ctx.lineWidth=1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(pad, toY(0.8)); ctx.lineTo(w-pad, toY(0.8)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent2; ctx.font='10px Inter'; ctx.textAlign='right';
  ctx.fillText('80%', pad-4, toY(0.8)+3);
  // current n marker
  ctx.beginPath(); ctx.arc(toX(n), toY(power), 5, 0, Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-30); ctx.stroke();
  ctx.fillStyle = muted; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('Sample size (n per group)', w/2, h-10);
  ctx.save(); ctx.translate(14, h/2); ctx.rotate(-Math.PI/2); ctx.fillText('Power', 0, 0); ctx.restore();
},

/* ── 32 MLE ── */
'mle-stats': function(){
  const s = setupCanvas('mleCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const estMu = parseFloat(document.getElementById('mleMu')?.value||0);
  document.getElementById('mleMuV').textContent = estMu.toFixed(1);
  srand(66);
  const trueMu = 0.8;
  const data = []; for(let i=0;i<25;i++) data.push(trueMu + randN());
  const ll = data.reduce((s,x) => s - 0.5*(x-estMu)**2, 0);
  document.getElementById('mleLL').textContent = ll.toFixed(2);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=w-2*pad, pH=h-50;
  const toX = v => pad + (v+3)/6*pW;
  const toY = v => h-30 - (v+40)/45*pH;
  // log-likelihood curve
  ctx.strokeStyle = accent; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let mu=-3;mu<=3;mu+=0.02){
    const l = data.reduce((s,x) => s - 0.5*(x-mu)**2, 0);
    const sx=toX(mu), sy=toY(l);
    mu===-3?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
  }
  ctx.stroke();
  // current estimate
  ctx.beginPath(); ctx.arc(toX(estMu), toY(ll), 5, 0, Math.PI*2);
  ctx.fillStyle = accent; ctx.fill();
  // MLE line
  const mleMu = data.reduce((a,b)=>a+b)/data.length;
  ctx.strokeStyle = accent2; ctx.setLineDash([4,3]); ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(toX(mleMu),20); ctx.lineTo(toX(mleMu),h-30); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent2; ctx.font='10px Inter'; ctx.textAlign='center';
  ctx.fillText('MLE μ̂='+mleMu.toFixed(3), toX(mleMu), 14);
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = muted; ctx.font='9px Inter'; ctx.textAlign='center';
  ctx.fillText('μ', w/2, h-14);
},

/* ── 33 Correlation vs Causation ── */
'correlation-vs-causation': function(){
  const s = setupCanvas('causalCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const str = parseFloat(document.getElementById('causalStr')?.value||0.8);
  document.getElementById('causalStrV').textContent = str.toFixed(2);
  srand(44);
  const n = 60;
  const zs = []; for(let i=0;i<n;i++) zs.push(randN()); // confounder
  const xs = zs.map(z => z*str + randN()*0.5);
  const ys = zs.map(z => z*str + randN()*0.5);
  // r(X,Y)
  const mx=xs.reduce((a,b)=>a+b)/n, my=ys.reduce((a,b)=>a+b)/n;
  let sxy=0,sxx=0,syy=0;
  for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; syy+=(ys[i]-my)**2; }
  const r = sxy/Math.sqrt(sxx*syy);
  document.getElementById('causalR').textContent = r.toFixed(3);
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  const pad=50, pW=(w-pad*2), pH=h-2*pad;
  const toSX = v => pad + (v+4)/8*pW;
  const toSY = v => h-pad - (v+4)/8*pH;
  ctx.strokeStyle = muted; ctx.lineWidth=0.5;
  ctx.beginPath(); ctx.moveTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.stroke();
  // points colored by confounder
  for(let i=0;i<n;i++){
    const t = (zs[i]+3)/6;
    ctx.beginPath(); ctx.arc(toSX(xs[i]), toSY(ys[i]), 3.5, 0, Math.PI*2);
    ctx.fillStyle = t>0.5 ? accent+'aa' : accent3+'aa'; ctx.fill();
  }
  // DAG
  ctx.fillStyle = fg; ctx.font='bold 11px Inter'; ctx.textAlign='center';
  ctx.fillText('Z (confounder)', w-90, pad+14);
  ctx.fillText('↙     ↘', w-90, pad+28);
  ctx.fillText('X          Y', w-90, pad+42);
  ctx.fillStyle = muted; ctx.font='10px Inter'; ctx.textAlign='left';
  ctx.fillText('X', pad+4, h-pad+14);
  ctx.save(); ctx.translate(pad-10, h/2); ctx.rotate(-Math.PI/2); ctx.textAlign='center'; ctx.fillText('Y', 0, 0); ctx.restore();
},

/* ── 34 Simpson's Paradox ── */
'simpsons-paradox': function(){
  const s = setupCanvas('simpsonCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  ctx.fillStyle = getCSS('--bg'); ctx.fillRect(0,0,w,h);
  drawSimpsonViz('combined', s);
},

};

/* ═══════════════════════════════════════════════════════════════
   Global functions exposed to window for onclick/oninput handlers
   ═══════════════════════════════════════════════════════════════ */

window.drawMeanMedian = () => DRAWS['mean-median']();
window.drawVariance = () => DRAWS['variance-std']();
window.drawPercentiles = () => DRAWS['percentiles']();
window.drawCorrelation = () => DRAWS['correlation']();
window.drawCovariance = () => DRAWS['covariance']();
window.drawProbBasics = () => DRAWS['prob-basics']();
window.drawConditional = () => DRAWS['conditional']();
window.drawIndependence = () => DRAWS['independence']();
window.drawCombinatorics = () => DRAWS['combinatorics']();
window.drawNormal = () => DRAWS['normal']();
window.drawBinomial = () => DRAWS['binomial']();
window.drawPoisson = () => DRAWS['poisson']();
window.drawExponential = () => DRAWS['exponential']();
window.drawUniform = () => DRAWS['uniform']();
window.drawBeta = () => DRAWS['beta']();
window.drawChiSquared = () => DRAWS['chi-squared']();
window.drawCI = () => DRAWS['confidence']();
window.drawHypothesis = () => DRAWS['hypothesis']();
window.drawPValue = () => DRAWS['p-value']();
window.drawTTest = () => DRAWS['t-test']();
window.drawAnova = () => DRAWS['anova']();
window.drawBayesianInference = () => DRAWS['bayesian-inference']();
window.drawConjugate = () => DRAWS['conjugate-priors']();
window.drawHierarchical = () => DRAWS['hierarchical']();
window.drawPower = () => DRAWS['power-analysis']();
window.drawMLEStats = () => DRAWS['mle-stats']();
window.drawCausal = () => DRAWS['correlation-vs-causation']();
window.drawABTest = () => DRAWS['ab-testing']();
window.drawBootstrap = () => DRAWS['bootstrap']();

/* ── Inverse normal CDF (approximation) ── */
function normCDFInv(p){
  // Rational approximation (Abramowitz & Stegun)
  if(p<=0) return -Infinity; if(p>=1) return Infinity;
  if(p>0.5) return -normCDFInv(1-p);
  const t = Math.sqrt(-2*Math.log(p));
  const c0=2.515517, c1=0.802853, c2=0.010328;
  const d1=1.432788, d2=0.189269, d3=0.001308;
  return -(t - (c0+c1*t+c2*t*t)/(1+d1*t+d2*t*t+d3*t*t*t));
}

/* ── CLT simulation ── */
let currentCLTDist = 'uniform';
window.currentCLTDist = currentCLTDist;
window.runCLT = function(dist){
  currentCLTDist = dist;
  window.currentCLTDist = dist;
  const s = setupCanvas('cltCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const n = parseInt(document.getElementById('cltN')?.value||30);
  document.getElementById('cltNV').textContent = n;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // generate sample means
  srand(42);
  const nSamples = 2000;
  const means = [];
  for(let i=0;i<nSamples;i++){
    let sum = 0;
    for(let j=0;j<n;j++){
      if(dist==='uniform') sum += rand()*6;
      else if(dist==='exponential') sum += -Math.log(rand()+1e-10);
      else sum += (rand()<0.5?randN()-2:randN()+2); // bimodal
    }
    means.push(sum/n);
  }
  // histogram
  const pad=40, pW=w-2*pad, pH=h-60;
  means.sort((a,b)=>a-b);
  const minM=means[0]-0.5, maxM=means[means.length-1]+0.5;
  const nBins=50, bins=new Array(nBins).fill(0);
  means.forEach(m=>{ const idx=Math.min(nBins-1,Math.floor((m-minM)/(maxM-minM)*nBins)); bins[idx]++; });
  const maxBin=Math.max(...bins), barW=pW/nBins;
  bins.forEach((c,i)=>{
    const bh = c/maxBin*pH;
    ctx.fillStyle = accent+'66';
    ctx.fillRect(pad+i*barW, h-30-bh, barW-1, bh);
  });
  // normal overlay
  const mu = means.reduce((a,b)=>a+b)/nSamples;
  const variance = means.reduce((a,v)=>a+(v-mu)**2,0)/(nSamples-1);
  const sigma = Math.sqrt(variance);
  ctx.strokeStyle = accent2; ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x=minM;x<=maxM;x+=(maxM-minM)/200){
    const px = pad + (x-minM)/(maxM-minM)*pW;
    const py = h-30 - normPDF(x,mu,sigma)*(maxM-minM)/nBins*nSamples/maxBin*pH;
    x===minM?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.stroke();
  ctx.strokeStyle = muted; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(pad,h-30); ctx.lineTo(w-pad,h-30); ctx.stroke();
  ctx.fillStyle = fg; ctx.font='bold 11px Inter'; ctx.textAlign='center';
  ctx.fillText('Sample means (n='+n+') from '+dist+' distribution', w/2, 16);
  ctx.fillStyle = accent2; ctx.font='10px Inter';
  ctx.fillText('Normal fit overlay', w/2, 30);
};

/* ── LLN animation ── */
let llnAnim = null;
window.animLLN = function(){
  if(llnAnim) return;
  const s = setupCanvas('llnCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), muted = getCSS('--muted'), bg = getCSS('--bg'), fg = getCSS('--text');
  const pad = 40, plotW = w-2*pad, plotH = h-60;
  let rolls = [], runSum = 0, frame = 0;
  const maxRolls = 500;
  srand(Date.now() & 0xffffff);
  function step(){
    const die = Math.floor(rand()*6)+1;
    rolls.push(die);
    runSum += die;
    const avg = runSum / rolls.length;
    frame++;
    ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
    // true mean
    const y35 = pad + plotH*(1-(3.5-1)/5);
    ctx.strokeStyle = accent2; ctx.lineWidth=1; ctx.setLineDash([5,3]);
    ctx.beginPath(); ctx.moveTo(pad,y35); ctx.lineTo(w-pad,y35); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = accent2; ctx.font='10px Inter'; ctx.textAlign='left';
    ctx.fillText('μ = 3.5', w-pad+4, y35+4);
    // axes
    ctx.strokeStyle = muted; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad,h-20); ctx.lineTo(w-pad,h-20); ctx.stroke();
    // running average line
    ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath();
    let rSum = 0;
    for(let i=0;i<rolls.length;i++){
      rSum += rolls[i];
      const a = rSum/(i+1);
      const x = pad + (i/(maxRolls-1))*plotW;
      const y = pad + plotH*(1-(a-1)/5);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
    document.getElementById('llnCurrent').textContent = 'x̄ = '+avg.toFixed(4)+' (n='+rolls.length+')';
    if(frame < maxRolls) llnAnim = requestAnimationFrame(step);
    else llnAnim = null;
  }
  step();
};
window.resetLLN = function(){
  if(llnAnim){ cancelAnimationFrame(llnAnim); llnAnim = null; }
  DRAWS['law-large-numbers']();
};

/* ── MCMC animation ── */
let mcmcAnim = null, mcmcSamples = [];
window.animMCMC = function(){
  if(mcmcAnim) return;
  const s = setupCanvas('mcmcCanvas'); if(!s) return;
  const {ctx,w,h} = s;
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), muted = getCSS('--muted'), bg = getCSS('--bg'), fg = getCSS('--text');
  const target = (x,y) => Math.exp(-0.5*(x*x + y*y*2)); // 2D Gaussian
  let cx = randN()*2, cy = randN();
  let frame = 0;
  const maxFrames = 300;
  mcmcSamples = [];
  function step(){
    // Metropolis step
    const px = cx + randN()*0.5, py = cy + randN()*0.3;
    const ratio = target(px,py)/target(cx,cy);
    if(rand() < ratio){ cx=px; cy=py; }
    mcmcSamples.push([cx,cy]);
    frame++;
    ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
    // left panel: 2D scatter
    const lw = w*0.5, pad=40;
    // contours
    for(let r=3;r>=1;r--){
      ctx.strokeStyle = accent + (r===1?'88':r===2?'44':'22');
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(lw/2, h/2+10, r*30, r*20, 0, 0, Math.PI*2); ctx.stroke();
    }
    // samples
    const toX = v => lw/2 + v*25;
    const toY = v => h/2+10 - v*25;
    mcmcSamples.forEach(([sx,sy],i)=>{
      const alpha = Math.min(1, 0.2 + i/mcmcSamples.length*0.8);
      ctx.beginPath(); ctx.arc(toX(sx), toY(sy), 2, 0, Math.PI*2);
      ctx.fillStyle = accent + Math.floor(alpha*255).toString(16).padStart(2,'0');
      ctx.fill();
    });
    // right panel: trace plot
    const rpad = lw + 20;
    ctx.strokeStyle = muted; ctx.lineWidth=0.5;
    ctx.beginPath(); ctx.moveTo(rpad, h-20); ctx.lineTo(w-10, h-20); ctx.stroke();
    ctx.strokeStyle = accent; ctx.lineWidth=1;
    ctx.beginPath();
    mcmcSamples.forEach(([sx],i)=>{
      const x = rpad + i/(maxFrames-1)*(w-rpad-10);
      const y = h/2+10 - sx*20;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
    ctx.fillStyle = fg; ctx.font='10px Inter'; ctx.textAlign='center';
    ctx.fillText('Target posterior', lw/2, 16);
    ctx.fillText('Trace (x)', (rpad+w)/2, 16);
    document.getElementById('mcmcCount').textContent = mcmcSamples.length;
    if(frame < maxFrames) mcmcAnim = requestAnimationFrame(step);
    else mcmcAnim = null;
  }
  step();
};
window.resetMCMC = function(){
  if(mcmcAnim){ cancelAnimationFrame(mcmcAnim); mcmcAnim = null; }
  mcmcSamples = [];
  DRAWS['mcmc']();
};

/* ── Bayesian Regression reset ── */
window.resetBayReg = function(){
  window._bayRegData = [];
  DRAWS['bayesian-regression']();
};

/* ── Simpson's Paradox ── */
function drawSimpsonViz(view, s){
  if(!s) s = setupCanvas('simpsonCanvas');
  if(!s) return;
  const {ctx,w,h} = s;
  const bg = getCSS('--bg'), fg = getCSS('--text'), muted = getCSS('--muted');
  const accent = getCSS('--accent'), accent2 = getCSS('--accent2'), accent3 = getCSS('--accent3');
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  // Data: Treatment A vs B across 2 departments
  // Dept 1: A: 8/10=80%, B: 60/80=75% → A better
  // Dept 2: A: 30/80=37.5%, B: 3/10=30% → A better
  // Overall: A: 38/90=42.2%, B: 63/90=70% → B looks better!
  const data = {
    dept1: { aSuccess:8, aTotal:10, bSuccess:60, bTotal:80 },
    dept2: { aSuccess:30, aTotal:80, bSuccess:3, bTotal:10 },
  };
  const overallA = (data.dept1.aSuccess+data.dept2.aSuccess)/(data.dept1.aTotal+data.dept2.aTotal);
  const overallB = (data.dept1.bSuccess+data.dept2.bSuccess)/(data.dept1.bTotal+data.dept2.bTotal);
  const pad=60, barW=50, gap=30;
  const msg = document.getElementById('simpsonMsg');
  if(view === 'combined'){
    // overall bars
    const maxH = h-100;
    const bx1 = w/2 - barW - gap/2, bx2 = w/2 + gap/2;
    ctx.fillStyle = accent+'88'; ctx.fillRect(bx1, h-40-overallA*maxH, barW, overallA*maxH);
    ctx.fillStyle = accent3+'88'; ctx.fillRect(bx2, h-40-overallB*maxH, barW, overallB*maxH);
    ctx.fillStyle = fg; ctx.font='bold 12px Inter'; ctx.textAlign='center';
    ctx.fillText((overallA*100).toFixed(1)+'%', bx1+barW/2, h-40-overallA*maxH-8);
    ctx.fillText((overallB*100).toFixed(1)+'%', bx2+barW/2, h-40-overallB*maxH-8);
    ctx.font='11px Inter';
    ctx.fillText('Treatment A', bx1+barW/2, h-24);
    ctx.fillText('Treatment B', bx2+barW/2, h-24);
    ctx.font='bold 13px Inter';
    ctx.fillText('Overall: B looks better!', w/2, 24);
    if(msg) msg.textContent = 'But is it really? Click BY SUBGROUP →';
  } else {
    // by department
    const depts = [data.dept1, data.dept2];
    const labels = ['Dept 1 (easy)', 'Dept 2 (hard)'];
    const maxH = h-120;
    depts.forEach((d,i) => {
      const cx = pad + i*(w-2*pad)/2 + (w-2*pad)/4;
      const rateA = d.aSuccess/d.aTotal, rateB = d.bSuccess/d.bTotal;
      const bx1 = cx - barW - 5, bx2 = cx + 5;
      ctx.fillStyle = accent+'88'; ctx.fillRect(bx1, h-50-rateA*maxH, barW, rateA*maxH);
      ctx.fillStyle = accent3+'88'; ctx.fillRect(bx2, h-50-rateB*maxH, barW, rateB*maxH);
      ctx.fillStyle = fg; ctx.font='bold 11px Inter'; ctx.textAlign='center';
      ctx.fillText((rateA*100).toFixed(0)+'%', bx1+barW/2, h-50-rateA*maxH-6);
      ctx.fillText((rateB*100).toFixed(0)+'%', bx2+barW/2, h-50-rateB*maxH-6);
      ctx.font='10px Inter';
      ctx.fillText(labels[i], cx, h-14);
      ctx.fillStyle = muted; ctx.font='9px Inter';
      ctx.fillText('A: '+d.aSuccess+'/'+d.aTotal, bx1+barW/2, h-34);
      ctx.fillText('B: '+d.bSuccess+'/'+d.bTotal, bx2+barW/2, h-34);
    });
    ctx.fillStyle = accent2; ctx.font='bold 13px Inter'; ctx.textAlign='center';
    ctx.fillText('In EVERY subgroup, A is better!', w/2, 24);
    if(msg) msg.textContent = 'Paradox: B had more easy cases → higher overall rate';
  }
}
window.drawSimpson = function(view){
  drawSimpsonViz(view);
};

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
function initVisualizations(){
  // Called from the shell page when ready
}

window.DRAWS = DRAWS;
window.initVisualizations = initVisualizations;
