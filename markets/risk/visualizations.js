/* ── Risk & Portfolio  visualizations.js ── */

const DRAWS={};

/* ── helpers ── */
function setupCanvas(id){const c=document.getElementById(id);if(!c)return null;const x=c.getContext('2d');const dpr=window.devicePixelRatio||1;const w=c.clientWidth||720,h=c.clientHeight||340;c.width=w*dpr;c.height=h*dpr;x.scale(dpr,dpr);x.clearRect(0,0,w,h);return{c,x,w,h};}
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim();}
function lerp(a,b,t){return a+(b-a)*t;}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
const ACCENT=()=>css('--accent')||'#c84b2f';
const MUTED=()=>css('--muted')||'#888';
const BORDER=()=>css('--border')||'#ddd';
const MONO=()=>css('--mono')||'monospace';
const BG=()=>css('--bg')||'#fff';
const BLUE='#60a5fa',GREEN='#34d399',RED='#f87171',PURPLE='#c084fc',ORANGE='#fb923c';

function drawArrow(x,x1,y1,x2,y2,color){x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.strokeStyle=color;x.lineWidth=1.5;x.stroke();const a=Math.atan2(y2-y1,x2-x1);const s=6;x.beginPath();x.moveTo(x2,y2);x.lineTo(x2-s*Math.cos(a-0.4),y2-s*Math.sin(a-0.4));x.lineTo(x2-s*Math.cos(a+0.4),y2-s*Math.sin(a+0.4));x.closePath();x.fillStyle=color;x.fill();}
function roundRect(x,rx,ry,rw,rh,r){x.beginPath();x.moveTo(rx+r,ry);x.lineTo(rx+rw-r,ry);x.quadraticCurveTo(rx+rw,ry,rx+rw,ry+r);x.lineTo(rx+rw,ry+rh-r);x.quadraticCurveTo(rx+rw,ry+rh,rx+rw-r,ry+rh);x.lineTo(rx+r,ry+rh);x.quadraticCurveTo(rx,ry+rh,rx,ry+rh-r);x.lineTo(rx,ry+r);x.quadraticCurveTo(rx,ry,rx+r,ry);x.closePath();}
function gaussian(x,mu,sigma){return Math.exp(-0.5*((x-mu)/sigma)**2)/(sigma*Math.sqrt(2*Math.PI));}

/* ═══════════════════════════════════════
   1 — Value at Risk
   ═══════════════════════════════════════ */
DRAWS['value-at-risk']=function(){
const s=setupCanvas('cvs-value-at-risk');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="varConf"]');
const conf=(ctrl?+ctrl.value:95)/100;
const zLookup={0.90:1.282,0.91:1.341,0.92:1.405,0.93:1.476,0.94:1.555,0.95:1.645,0.96:1.751,0.97:1.881,0.98:2.054,0.99:2.326};
const z=zLookup[Math.round(conf*100)/100]||1.645;
const mu=0,sigma=1;
const pad={l:60,r:20,t:30,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
// draw normal curve
const xMin=-4,xMax=4;
const toX=v=>pad.l+(v-xMin)/(xMax-xMin)*pw;
const toY=v=>pad.t+ph-v/(0.42)*ph;
// fill full area
x.beginPath();
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=gaussian(xv,mu,sigma);const px=toX(xv),py=toY(yv);i===0?x.moveTo(px,py):x.lineTo(px,py);}
x.lineTo(toX(xMax),toY(0));x.lineTo(toX(xMin),toY(0));x.closePath();
x.fillStyle=BLUE+'30';x.fill();
// fill tail (left tail = loss)
const varLine=-z;
x.beginPath();x.moveTo(toX(xMin),toY(0));
for(let i=0;i<=100;i++){const xv=xMin+i/100*(varLine-xMin);const yv=gaussian(xv,mu,sigma);x.lineTo(toX(xv),toY(yv));}
x.lineTo(toX(varLine),toY(0));x.closePath();
x.fillStyle=RED+'60';x.fill();
// draw outline
x.beginPath();
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=gaussian(xv,mu,sigma);const px=toX(xv),py=toY(yv);i===0?x.moveTo(px,py):x.lineTo(px,py);}
x.strokeStyle=BLUE;x.lineWidth=2;x.stroke();
// VaR line
x.beginPath();x.moveTo(toX(varLine),toY(0));x.lineTo(toX(varLine),toY(gaussian(varLine,mu,sigma)));
x.strokeStyle=RED;x.lineWidth=2;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
// labels
x.font='bold 12px sans-serif';x.fillStyle=RED;
x.fillText(`VaR ${Math.round(conf*100)}% = ${z.toFixed(2)}σ`,toX(varLine)-40,pad.t+15);
x.font='11px sans-serif';x.fillStyle=MUTED();
x.fillText('Loss ←',pad.l+5,h-10);
x.textAlign='right';x.fillText('→ Gain',w-pad.r-5,h-10);x.textAlign='left';
x.fillStyle=RED+'aa';x.font='10px sans-serif';
x.fillText(`${((1-conf)*100).toFixed(0)}% tail`,toX(varLine)-50,toY(0)-10);
if(ctrl)ctrl.oninput=()=>DRAWS['value-at-risk']();
};

/* ═══════════════════════════════════════
   2 — Expected Shortfall
   ═══════════════════════════════════════ */
DRAWS['expected-shortfall']=function(){
const s=setupCanvas('cvs-expected-shortfall');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="esTail"]');
const alpha=(ctrl?+ctrl.value:5)/100;
const z_alpha={0.01:2.326,0.02:2.054,0.03:1.881,0.04:1.751,0.05:1.645,0.06:1.555,0.07:1.476,0.08:1.405,0.09:1.341,0.10:1.282};
const z=z_alpha[Math.round(alpha*100)/100]||1.645;
const phi_z=gaussian(z,0,1);
const es_val=phi_z/alpha;
const pad={l:60,r:20,t:30,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const xMin=-4,xMax=4;
const toX=v=>pad.l+(v-xMin)/(xMax-xMin)*pw;
const toY=v=>pad.t+ph-v/0.42*ph;
// full curve
x.beginPath();
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=gaussian(xv,0,1);i===0?x.moveTo(toX(xv),toY(yv)):x.lineTo(toX(xv),toY(yv));}
x.lineTo(toX(xMax),toY(0));x.lineTo(toX(xMin),toY(0));x.closePath();x.fillStyle=BLUE+'20';x.fill();
// tail fill
const varLine=-z;
x.beginPath();x.moveTo(toX(xMin),toY(0));
for(let i=0;i<=100;i++){const xv=xMin+i/100*(varLine-xMin);const yv=gaussian(xv,0,1);x.lineTo(toX(xv),toY(yv));}
x.lineTo(toX(varLine),toY(0));x.closePath();x.fillStyle=RED+'50';x.fill();
// outline
x.beginPath();
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=gaussian(xv,0,1);i===0?x.moveTo(toX(xv),toY(yv)):x.lineTo(toX(xv),toY(yv));}
x.strokeStyle=BLUE;x.lineWidth=2;x.stroke();
// VaR line
x.beginPath();x.moveTo(toX(varLine),toY(0));x.lineTo(toX(varLine),toY(gaussian(varLine,0,1)));
x.strokeStyle=RED;x.lineWidth=2;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
// ES line
const esLine=-es_val;
x.beginPath();x.moveTo(toX(esLine),toY(0));x.lineTo(toX(esLine),toY(0)-30);
x.strokeStyle=ORANGE;x.lineWidth=2.5;x.stroke();
// labels
x.font='bold 11px sans-serif';x.fillStyle=RED;
x.fillText(`VaR (${Math.round(alpha*100)}%)`,toX(varLine)+4,pad.t+20);
x.fillStyle=ORANGE;x.fillText(`ES = ${es_val.toFixed(2)}σ`,toX(esLine)+4,pad.t+36);
x.font='10px sans-serif';x.fillStyle=MUTED();
x.fillText('ES = avg of shaded tail',pad.l+10,h-10);
if(ctrl)ctrl.oninput=()=>DRAWS['expected-shortfall']();
};

/* ═══════════════════════════════════════
   3 — Volatility Modeling
   ═══════════════════════════════════════ */
DRAWS['volatility-modeling']=function(){
const s=setupCanvas('cvs-volatility-modeling');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="ewmaLambda"]');
const lam=(ctrl?+ctrl.value:94)/100;
const pad={l:50,r:20,t:20,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=120;
// simulate returns with volatility clustering
const seed=42;let rng=seed;
function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return rng/0x7fffffff;}
function randn(){const u1=rand()||0.001,u2=rand();return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);}
const returns=[];let trueVol=0.01;
for(let i=0;i<N;i++){
  if(i===40)trueVol=0.04;if(i===70)trueVol=0.015;if(i===100)trueVol=0.03;
  returns.push(randn()*trueVol);
}
// EWMA vol
const ewma=[Math.abs(returns[0])];
for(let i=1;i<N;i++){ewma.push(Math.sqrt(lam*ewma[i-1]**2+(1-lam)*returns[i]**2));}
const maxR=Math.max(...returns.map(Math.abs)),maxV=Math.max(...ewma);
// draw returns as bars
for(let i=0;i<N;i++){
  const bx=pad.l+i/N*pw;const bw=pw/N*0.7;
  const barH=Math.abs(returns[i])/maxR*(ph/2)*0.8;
  x.fillStyle=returns[i]>0?GREEN+'80':RED+'80';
  x.fillRect(bx,pad.t+ph/2-barH*(returns[i]>0?1:0),bw,barH);
}
// draw EWMA line
x.beginPath();
for(let i=0;i<N;i++){const px=pad.l+i/N*pw+pw/N*0.35;const py=pad.t+ph-ewma[i]/maxV*(ph/2)*0.9;i===0?x.moveTo(px,py):x.lineTo(px,py);}
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// labels
x.font='11px sans-serif';x.fillStyle=ACCENT();x.fillText(`EWMA σ (λ=${lam.toFixed(2)})`,pad.l+pw-140,pad.t+15);
x.fillStyle=MUTED();x.font='10px sans-serif';x.fillText('Returns',pad.l+5,pad.t+15);
if(ctrl)ctrl.oninput=()=>DRAWS['volatility-modeling']();
};

/* ═══════════════════════════════════════
   4 — Correlation Risk
   ═══════════════════════════════════════ */
DRAWS['correlation-risk']=function(){
const s=setupCanvas('cvs-correlation-risk');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="stressLevel"]');
const stress=(ctrl?+ctrl.value:20)/100;
const pad={l:50,r:20,t:30,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const assets=['Equity','Bonds','Cmdty','RE','Gold'];
const n=assets.length;
const calmCorr=[[1,.3,.2,.4,-.1],[.3,1,-.1,.2,.3],[.2,-.1,1,.15,.4],[.4,.2,.15,1,.1],[-.1,.3,.4,.1,1]];
const stressCorr=[[1,.85,.7,.8,.3],[.85,1,.6,.75,.5],[.7,.6,1,.65,.6],[.8,.75,.65,1,.55],[.3,.5,.6,.55,1]];
const cellW=pw/n,cellH=ph/n;
for(let i=0;i<n;i++){
  for(let j=0;j<n;j++){
    const calm=calmCorr[i][j],strs=stressCorr[i][j];
    const val=lerp(calm,strs,stress);
    const intensity=Math.abs(val);
    const r=val>0?Math.round(220*intensity):50;
    const g=val>0?50:Math.round(220*intensity);
    const b=80;
    x.fillStyle=`rgba(${r},${g},${b},${0.3+intensity*0.6})`;
    x.fillRect(pad.l+j*cellW,pad.t+i*cellH,cellW-2,cellH-2);
    x.font='bold 11px sans-serif';x.fillStyle='#fff';x.textAlign='center';
    x.fillText(val.toFixed(2),pad.l+j*cellW+cellW/2-1,pad.t+i*cellH+cellH/2+4);
  }
}
x.textAlign='center';x.font='10px sans-serif';x.fillStyle=MUTED();
for(let i=0;i<n;i++){
  x.fillText(assets[i],pad.l+i*cellW+cellW/2,h-5);
  x.save();x.translate(pad.l-8,pad.t+i*cellH+cellH/2);x.rotate(-Math.PI/2);x.fillText(assets[i],0,0);x.restore();
}
x.textAlign='left';x.font='bold 11px sans-serif';x.fillStyle=ACCENT();
x.fillText(`Stress: ${Math.round(stress*100)}%`,pad.l+pw-110,pad.t-8);
if(ctrl)ctrl.oninput=()=>DRAWS['correlation-risk']();
};

/* ═══════════════════════════════════════
   5 — Tail Risk
   ═══════════════════════════════════════ */
DRAWS['tail-risk']=function(){
const s=setupCanvas('cvs-tail-risk');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="kurtLevel"]');
const kurt=ctrl?+ctrl.value:5;
const pad={l:50,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const xMin=-5,xMax=5;
const toX=v=>pad.l+(v-xMin)/(xMax-xMin)*pw;
// t-distribution approximation with adjustable tails
function tPdf(xv,df){const c=Math.exp(lgamma((df+1)/2)-lgamma(df/2))/(Math.sqrt(df*Math.PI));return c*Math.pow(1+xv*xv/df,-(df+1)/2);}
function lgamma(z){const g=7;const C=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];let sum=C[0];for(let i=1;i<g+2;i++)sum+=C[i]/(z+i-1);const t=z+g-0.5;return 0.5*Math.log(2*Math.PI)+(z-0.5)*Math.log(t)-t+Math.log(sum);}
// map kurtosis to df: kurtosis = 3 + 6/(df-4) for df>4
const df=Math.max(4.1,6/(kurt-3)+4);
// draw normal
x.beginPath();
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=gaussian(xv,0,1);const px=toX(xv),py=pad.t+ph-yv/0.42*ph;i===0?x.moveTo(px,py):x.lineTo(px,py);}
x.strokeStyle=BLUE+'80';x.lineWidth=1.5;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
// draw fat-tailed
x.beginPath();
let maxY=0;
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=tPdf(xv,df);if(yv>maxY)maxY=yv;}
for(let i=0;i<=200;i++){const xv=xMin+i/200*(xMax-xMin);const yv=tPdf(xv,df);const px=toX(xv),py=pad.t+ph-yv/0.42*ph;i===0?x.moveTo(px,py):x.lineTo(px,py);}
x.strokeStyle=RED;x.lineWidth=2.5;x.stroke();
// shade tails beyond ±3
for(const side of[-1,1]){
  x.beginPath();
  const start=side===-1?xMin:-3,end=side===-1?-3:xMax;
  x.moveTo(toX(start),pad.t+ph);
  for(let i=0;i<=50;i++){const xv=start+i/50*(end-start);const yv=tPdf(xv,df);x.lineTo(toX(xv),pad.t+ph-yv/0.42*ph);}
  x.lineTo(toX(end),pad.t+ph);x.closePath();x.fillStyle=RED+'30';x.fill();
}
// legend
x.font='11px sans-serif';x.fillStyle=BLUE;x.fillText('— Normal (κ=3)',pad.l+10,pad.t+15);
x.fillStyle=RED;x.fillText(`— Fat-tailed (κ≈${kurt})`,pad.l+10,pad.t+30);
x.fillStyle=MUTED();x.font='10px sans-serif';x.fillText('Shaded: tail mass beyond ±3σ',pad.l+10,h-10);
if(ctrl)ctrl.oninput=()=>DRAWS['tail-risk']();
};

/* ═══════════════════════════════════════
   6 — Mean-Variance
   ═══════════════════════════════════════ */
DRAWS['mean-variance']=function(){
const s=setupCanvas('cvs-mean-variance');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="riskAversion"]');
const gamma=ctrl?+ctrl.value:5;
const pad={l:60,r:30,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
// efficient frontier: return = a*sqrt(sigma) parametrically
const pts=[];
for(let i=0;i<=100;i++){
  const vol=2+i*0.18;const ret=1+Math.sqrt(vol-2)*3.5;
  pts.push({vol,ret});
}
const maxVol=22,maxRet=16;
const toX=v=>pad.l+v/maxVol*pw;
const toY=v=>pad.t+ph-v/maxRet*ph;
// axes
x.strokeStyle=BORDER();x.lineWidth=1;
x.beginPath();x.moveTo(pad.l,pad.t);x.lineTo(pad.l,pad.t+ph);x.lineTo(pad.l+pw,pad.t+ph);x.stroke();
// grid
x.font='10px sans-serif';x.fillStyle=MUTED();x.textAlign='right';
for(let r=0;r<=maxRet;r+=4){x.fillText(r+'%',pad.l-6,toY(r)+3);x.beginPath();x.moveTo(pad.l,toY(r));x.lineTo(pad.l+pw,toY(r));x.strokeStyle=BORDER()+'60';x.stroke();}
x.textAlign='center';
for(let v=0;v<=maxVol;v+=5){x.fillText(v+'%',toX(v),h-10);}
// frontier curve
x.beginPath();pts.forEach((p,i)=>{const px=toX(p.vol),py=toY(p.ret);i===0?x.moveTo(px,py):x.lineTo(px,py);});
x.strokeStyle=ACCENT();x.lineWidth=2.5;x.stroke();
// tangency point depends on risk aversion
const tang=Math.max(0,Math.min(100,Math.round(100-gamma*4)));
const tp=pts[tang];
x.beginPath();x.arc(toX(tp.vol),toY(tp.ret),6,0,Math.PI*2);x.fillStyle=ACCENT();x.fill();
// capital market line from rf=1% to tangency
x.beginPath();x.moveTo(toX(0),toY(1));x.lineTo(toX(tp.vol*1.5),toY(1+(tp.ret-1)/tp.vol*tp.vol*1.5));
x.strokeStyle=GREEN;x.lineWidth=1.5;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
// labels
x.font='bold 11px sans-serif';x.fillStyle=ACCENT();x.textAlign='left';
x.fillText('Efficient Frontier',toX(pts[80].vol)+5,toY(pts[80].ret)-5);
x.fillStyle=GREEN;x.fillText('CML',toX(tp.vol*0.5)+5,toY(1+(tp.ret-1)/tp.vol*tp.vol*0.5)-8);
x.fillStyle=MUTED();x.font='10px sans-serif';
x.fillText('Risk (σ) →',pad.l+pw/2-30,h-2);
x.save();x.translate(12,pad.t+ph/2);x.rotate(-Math.PI/2);x.textAlign='center';x.fillText('Return →',0,0);x.restore();
if(ctrl)ctrl.oninput=()=>DRAWS['mean-variance']();
};

/* ═══════════════════════════════════════
   7 — Risk Parity
   ═══════════════════════════════════════ */
DRAWS['risk-parity']=function(){
const s=setupCanvas('cvs-risk-parity');if(!s)return;const{x,w,h}=s;
const pad={l:40,r:20,t:30,b:60};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const assets=[{name:'Equity',vol:16,color:BLUE},{name:'Bonds',vol:4,color:GREEN},{name:'Cmdty',vol:20,color:ORANGE},{name:'Gold',vol:14,color:PURPLE}];
const totalInvVol=assets.reduce((s,a)=>s+1/a.vol,0);
assets.forEach(a=>{a.rpWeight=(1/a.vol)/totalInvVol;a.eqWeight=1/assets.length;});
const barW=(pw/assets.length)/3;
const gap=pw/assets.length;
// draw grouped bars
x.font='10px sans-serif';x.textAlign='center';
assets.forEach((a,i)=>{
  const cx=pad.l+i*gap+gap/2;
  // Equal weight bar
  const h1=a.eqWeight*ph*0.9;
  x.fillStyle=a.color+'60';
  x.fillRect(cx-barW-2,pad.t+ph-h1,barW,h1);
  // Risk parity bar
  const h2=a.rpWeight*ph*0.9;
  x.fillStyle=a.color;
  x.fillRect(cx+2,pad.t+ph-h2,barW,h2);
  // labels
  x.fillStyle=MUTED();
  x.fillText(a.name,cx,h-15);
  x.font='9px sans-serif';
  x.fillStyle=a.color+'aa';
  x.fillText(`${(a.eqWeight*100).toFixed(0)}%`,cx-barW/2-2,pad.t+ph-h1-4);
  x.fillStyle=a.color;
  x.fillText(`${(a.rpWeight*100).toFixed(0)}%`,cx+barW/2+2,pad.t+ph-h2-4);
  x.font='10px sans-serif';
});
// legend
x.font='11px sans-serif';x.textAlign='left';
x.fillStyle=BLUE+'60';x.fillRect(pad.l,pad.t-5,12,12);x.fillStyle=MUTED();x.fillText('Equal weight',pad.l+16,pad.t+5);
x.fillStyle=BLUE;x.fillRect(pad.l+110,pad.t-5,12,12);x.fillStyle=MUTED();x.fillText('Risk parity',pad.l+126,pad.t+5);
x.fillStyle=MUTED();x.font='9px sans-serif';
x.fillText('(σ: '+assets.map(a=>a.vol+'%').join(', ')+')',pad.l,h-2);
};

/* ═══════════════════════════════════════
   8 — Factor Models
   ═══════════════════════════════════════ */
DRAWS['factor-models']=function(){
const s=setupCanvas('cvs-factor-models');if(!s)return;const{x,w,h}=s;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const factors=[{name:'Market β',exp:0.8,color:BLUE},{name:'Size',exp:0.2,color:GREEN},{name:'Value',exp:0.15,color:ORANGE},{name:'Momentum',exp:0.25,color:PURPLE},{name:'Alpha',exp:0.05,color:ACCENT()}];
const maxExp=1;
const barH=ph/(factors.length*2);
factors.forEach((f,i)=>{
  const y=pad.t+i*(barH*2)+barH*0.5;
  const bw=Math.abs(f.exp)/maxExp*pw*0.8;
  x.fillStyle=f.color+'cc';
  roundRect(x,pad.l,y,bw,barH,4);x.fill();
  x.font='11px sans-serif';x.fillStyle=MUTED();x.textAlign='right';
  x.fillText(f.name,pad.l-8,y+barH/2+4);
  x.textAlign='left';x.fillStyle=f.color;
  x.fillText((f.exp>0?'+':'')+f.exp.toFixed(2),pad.l+bw+6,y+barH/2+4);
});
x.textAlign='left';x.font='10px sans-serif';x.fillStyle=MUTED();
x.fillText('Factor exposure (β)',pad.l+pw/2-50,h-10);
};

/* ═══════════════════════════════════════
   9 — Rebalancing
   ═══════════════════════════════════════ */
DRAWS['rebalancing']=function(){
const s=setupCanvas('cvs-rebalancing');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="rebalBand"]');
const band=(ctrl?+ctrl.value:5)/100;
const pad={l:50,r:20,t:20,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=100;const target=0.6;
// simulate drifting weight
let rng=7;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*0.03;}
const weights=[];let wt=target;
for(let i=0;i<N;i++){
  wt+=rand();
  if(Math.abs(wt-target)>band)wt=target;
  wt=clamp(wt,0.3,0.9);
  weights.push(wt);
}
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph-(v-0.3)/0.6*ph;
// band
x.fillStyle=GREEN+'15';
x.fillRect(pad.l,toY(target+band),pw,toY(target-band)-toY(target+band));
// target line
x.beginPath();x.moveTo(pad.l,toY(target));x.lineTo(pad.l+pw,toY(target));
x.strokeStyle=GREEN;x.lineWidth=1;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
// band edges
x.beginPath();x.moveTo(pad.l,toY(target+band));x.lineTo(pad.l+pw,toY(target+band));
x.moveTo(pad.l,toY(target-band));x.lineTo(pad.l+pw,toY(target-band));
x.strokeStyle=RED+'60';x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
// weight path
x.beginPath();weights.forEach((wv,i)=>{const px=toX(i),py=toY(wv);i===0?x.moveTo(px,py):x.lineTo(px,py);});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// labels
x.font='11px sans-serif';x.fillStyle=GREEN;x.fillText(`Target: ${(target*100).toFixed(0)}%`,pad.l+5,toY(target)-8);
x.fillStyle=RED;x.fillText(`±${(band*100).toFixed(0)}% band`,pad.l+pw-90,toY(target+band)-8);
x.fillStyle=MUTED();x.font='10px sans-serif';x.fillText('Time →',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['rebalancing']();
};

/* ═══════════════════════════════════════
   10 — Diversification
   ═══════════════════════════════════════ */
DRAWS['diversification']=function(){
const s=setupCanvas('cvs-diversification');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="numAssets"]');
const N=ctrl?+ctrl.value:10;
const pad={l:60,r:30,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const sigma=20; // single asset vol
const maxN=50;
const toX=n=>pad.l+(n-1)/(maxN-1)*pw;
const toY=v=>pad.t+ph-v/sigma*ph;
// axes
x.strokeStyle=BORDER();x.lineWidth=1;
x.beginPath();x.moveTo(pad.l,pad.t);x.lineTo(pad.l,pad.t+ph);x.lineTo(pad.l+pw,pad.t+ph);x.stroke();
// curve: sigma/sqrt(n) for uncorrelated
x.beginPath();
for(let n=1;n<=maxN;n++){const vol=sigma/Math.sqrt(n);n===1?x.moveTo(toX(n),toY(vol)):x.lineTo(toX(n),toY(vol));}
x.strokeStyle=BLUE;x.lineWidth=2;x.stroke();
// correlated curve (with avg corr 0.3)
x.beginPath();
for(let n=1;n<=maxN;n++){const rho=0.3;const vol=sigma*Math.sqrt((1-rho)/n+rho);n===1?x.moveTo(toX(n),toY(vol)):x.lineTo(toX(n),toY(vol));}
x.strokeStyle=RED;x.lineWidth=2;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
// current N marker
const volN=sigma/Math.sqrt(N);
x.beginPath();x.arc(toX(N),toY(volN),5,0,Math.PI*2);x.fillStyle=ACCENT();x.fill();
// axis labels
x.font='10px sans-serif';x.fillStyle=MUTED();x.textAlign='center';
for(let n=1;n<=maxN;n+=10){x.fillText(n,toX(n),h-10);}
x.textAlign='right';
for(let v=0;v<=sigma;v+=5){x.fillText(v+'%',pad.l-6,toY(v)+3);}
// legend
x.textAlign='left';x.font='11px sans-serif';
x.fillStyle=BLUE;x.fillText('Uncorrelated (ρ=0)',pad.l+pw-180,pad.t+15);
x.fillStyle=RED;x.fillText('Correlated (ρ=0.3)',pad.l+pw-180,pad.t+30);
x.fillStyle=ACCENT();x.fillText(`N=${N}: σ=${volN.toFixed(1)}%`,toX(N)+10,toY(volN)-5);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';
x.fillText('Number of assets',pad.l+pw/2,h-2);
if(ctrl)ctrl.oninput=()=>DRAWS['diversification']();
};

/* ═══════════════════════════════════════
   11 — Kelly Criterion
   ═══════════════════════════════════════ */
DRAWS['kelly-criterion']=function(){
const s=setupCanvas('cvs-kelly-criterion');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="kellyWin"]');
const winRate=(ctrl?+ctrl.value:55)/100;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const b=1; // 1:1 payoff
const kelly=winRate-(1-winRate)/b;
const maxF=1;
// geometric growth rate: g(f) = p*ln(1+b*f)+(1-p)*ln(1-f)
const toX=f=>pad.l+f/maxF*pw;
function gRate(f){if(f<=0||f>=1)return-999;return winRate*Math.log(1+b*f)+(1-winRate)*Math.log(1-f);}
const vals=[];for(let i=0;i<=100;i++){const f=i/100;vals.push({f,g:gRate(f)});}
const maxG=Math.max(...vals.map(v=>v.g));
const minG=Math.min(...vals.filter(v=>v.g>-2).map(v=>v.g));
const toY=g=>pad.t+ph-(g-minG)/(maxG-minG+0.001)*ph*0.9;
// zero line
x.beginPath();x.moveTo(pad.l,toY(0));x.lineTo(pad.l+pw,toY(0));
x.strokeStyle=BORDER();x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
// growth curve
x.beginPath();
vals.forEach((v,i)=>{if(v.g<-2)return;const px=toX(v.f),py=toY(v.g);i===0?x.moveTo(px,py):x.lineTo(px,py);});
x.strokeStyle=ACCENT();x.lineWidth=2.5;x.stroke();
// kelly marker
if(kelly>0&&kelly<1){
  x.beginPath();x.arc(toX(kelly),toY(gRate(kelly)),6,0,Math.PI*2);x.fillStyle=GREEN;x.fill();
  x.beginPath();x.moveTo(toX(kelly),pad.t);x.lineTo(toX(kelly),pad.t+ph);x.strokeStyle=GREEN+'60';x.lineWidth=1;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
  // half kelly
  const hk=kelly/2;
  x.beginPath();x.arc(toX(hk),toY(gRate(hk)),4,0,Math.PI*2);x.fillStyle=BLUE;x.fill();
  x.font='10px sans-serif';x.fillStyle=GREEN;x.fillText(`Full Kelly: ${(kelly*100).toFixed(1)}%`,toX(kelly)+8,toY(gRate(kelly))-8);
  x.fillStyle=BLUE;x.fillText(`Half Kelly: ${(hk*100).toFixed(1)}%`,toX(hk)+8,toY(gRate(hk))+14);
}
x.font='11px sans-serif';x.fillStyle=MUTED();x.textAlign='center';
x.fillText('Bet fraction (f)',pad.l+pw/2,h-8);
x.textAlign='left';x.fillText(`Win rate: ${Math.round(winRate*100)}%`,pad.l+5,pad.t+15);
if(ctrl)ctrl.oninput=()=>DRAWS['kelly-criterion']();
};

/* ═══════════════════════════════════════
   12 — Fixed Fractional
   ═══════════════════════════════════════ */
DRAWS['fixed-fractional']=function(){
const s=setupCanvas('cvs-fixed-fractional');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="ffFrac"]');
const frac=(ctrl?+ctrl.value:2)/100;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=80;
// simulate equity curve with 55% win, 1:1 payoff
let rng=13;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return rng/0x7fffffff;}
let equity=100;const curve=[equity];
for(let i=0;i<N;i++){
  const risk=equity*frac;
  equity+=rand()<0.55?risk:-risk;
  curve.push(Math.max(equity,1));
}
const maxE=Math.max(...curve)*1.1;
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph-v/maxE*ph;
// equity line
x.beginPath();curve.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// starting equity
x.beginPath();x.moveTo(pad.l,toY(100));x.lineTo(pad.l+pw,toY(100));
x.strokeStyle=MUTED()+'60';x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
// labels
x.font='11px sans-serif';x.fillStyle=ACCENT();x.textAlign='left';
x.fillText(`Risk: ${(frac*100).toFixed(1)}% per trade`,pad.l+10,pad.t+15);
x.fillStyle=MUTED();x.font='10px sans-serif';
x.fillText(`Final: $${curve[curve.length-1].toFixed(0)}`,pad.l+pw-100,pad.t+15);
x.textAlign='center';x.fillText('Trades →',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['fixed-fractional']();
};

/* ═══════════════════════════════════════
   13 — Volatility Sizing
   ═══════════════════════════════════════ */
DRAWS['volatility-sizing']=function(){
const s=setupCanvas('cvs-volatility-sizing');if(!s)return;const{x,w,h}=s;
const pad={l:60,r:20,t:30,b:60};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const assets=[{name:'Low Vol Stock',atr:1.5,price:50},{name:'Med Vol Stock',atr:3,price:80},{name:'High Vol ETF',atr:5,price:120},{name:'Commodity',atr:8,price:200}];
const targetRisk=1000;
assets.forEach(a=>{a.shares=Math.round(targetRisk/(2*a.atr));a.dollarRisk=a.shares*2*a.atr;});
const barW=pw/assets.length*0.6;
const maxShares=Math.max(...assets.map(a=>a.shares));
assets.forEach((a,i)=>{
  const cx=pad.l+i*(pw/assets.length)+pw/assets.length/2;
  const bh=a.shares/maxShares*ph*0.7;
  x.fillStyle=[BLUE,GREEN,ORANGE,PURPLE][i]+'cc';
  roundRect(x,cx-barW/2,pad.t+ph-bh,barW,bh,4);x.fill();
  x.font='bold 11px sans-serif';x.fillStyle=[BLUE,GREEN,ORANGE,PURPLE][i];x.textAlign='center';
  x.fillText(`${a.shares} sh`,cx,pad.t+ph-bh-8);
  x.font='9px sans-serif';x.fillStyle=MUTED();
  x.fillText(`ATR=$${a.atr}`,cx,pad.t+ph-bh-22);
  x.fillText(a.name,cx,h-20);
  x.fillText(`$risk≈$${a.dollarRisk}`,cx,h-8);
});
x.font='11px sans-serif';x.fillStyle=ACCENT();x.textAlign='left';
x.fillText(`Target risk: $${targetRisk} (2×ATR)`,pad.l+5,pad.t+12);
};

/* ═══════════════════════════════════════
   14 — Pyramiding
   ═══════════════════════════════════════ */
DRAWS['pyramiding']=function(){
const s=setupCanvas('cvs-pyramiding');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="pyramidTiers"]');
const tiers=ctrl?+ctrl.value:3;
const pad={l:60,r:40,t:30,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
// price line going up
const entries=[];const basePrice=100;
for(let i=0;i<tiers;i++){entries.push(basePrice+i*5);}
const maxPrice=basePrice+tiers*5+10;
const toX=i=>pad.l+i/(tiers+2)*pw;
const toY=p=>pad.t+ph-(p-90)/(maxPrice-90)*ph;
// price line
x.beginPath();
x.moveTo(pad.l,toY(basePrice-2));
entries.forEach((p,i)=>{x.lineTo(toX(i+1),toY(p));});
x.lineTo(toX(tiers+1),toY(entries[entries.length-1]+8));
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// entry markers
const tierSizes=[4,3,2,1,1];
entries.forEach((p,i)=>{
  const px=toX(i+1),py=toY(p);
  x.beginPath();x.arc(px,py,6,0,Math.PI*2);x.fillStyle=GREEN;x.fill();
  x.font='bold 11px sans-serif';x.fillStyle=GREEN;x.textAlign='left';
  x.fillText(`Tier ${i+1}: ${tierSizes[i]} units @ $${p}`,px+10,py+4);
});
// stop line
const stop=basePrice-5;
x.beginPath();x.moveTo(pad.l,toY(stop));x.lineTo(pad.l+pw,toY(stop));
x.strokeStyle=RED;x.lineWidth=1.5;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
x.font='11px sans-serif';x.fillStyle=RED;x.textAlign='left';
x.fillText(`Stop: $${stop}`,pad.l+pw-80,toY(stop)+14);
// total units
const total=tierSizes.slice(0,tiers).reduce((a,b)=>a+b,0);
x.fillStyle=MUTED();x.font='10px sans-serif';
x.fillText(`Total: ${total} units across ${tiers} tiers`,pad.l+5,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['pyramiding']();
};

/* ═══════════════════════════════════════
   15 — Max Position
   ═══════════════════════════════════════ */
DRAWS['max-position']=function(){
const s=setupCanvas('cvs-max-position');if(!s)return;const{x,w,h}=s;
const pad={l:40,r:20,t:30,b:30};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const cx=pad.l+pw/2,cy=pad.t+ph/2,radius=Math.min(pw,ph)*0.4;
const slices=[
  {name:'Stock A',pct:0.22,color:BLUE},{name:'Stock B',pct:0.18,color:GREEN},
  {name:'Stock C',pct:0.15,color:ORANGE},{name:'Stock D',pct:0.12,color:PURPLE},
  {name:'Others',pct:0.33,color:MUTED()+'80'}
];
let angle=-Math.PI/2;
slices.forEach(sl=>{
  const sweep=sl.pct*2*Math.PI;
  x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,radius,angle,angle+sweep);x.closePath();
  x.fillStyle=sl.color;x.fill();x.strokeStyle=BG();x.lineWidth=2;x.stroke();
  const mid=angle+sweep/2;
  const lx=cx+Math.cos(mid)*(radius*0.65);
  const ly=cy+Math.sin(mid)*(radius*0.65);
  x.font='bold 10px sans-serif';x.fillStyle='#fff';x.textAlign='center';
  x.fillText(`${(sl.pct*100).toFixed(0)}%`,lx,ly+4);
  angle+=sweep;
});
// limit line at 5% — conceptual ring
x.beginPath();x.arc(cx,cy,radius*0.22,0,Math.PI*2);x.strokeStyle=RED;x.lineWidth=2;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
// legend
x.font='10px sans-serif';x.textAlign='left';let ly=pad.t+5;
slices.forEach(sl=>{
  x.fillStyle=sl.color;x.fillRect(pad.l,ly,10,10);
  x.fillStyle=MUTED();x.fillText(sl.name,pad.l+14,ly+9);
  ly+=16;
});
x.fillStyle=RED;x.font='bold 11px sans-serif';
x.fillText('Max single-name limit',cx+radius+10,cy-10);
};

/* ═══════════════════════════════════════
   16 — Options Hedging
   ═══════════════════════════════════════ */
DRAWS['options-hedging']=function(){
const s=setupCanvas('cvs-options-hedging');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="putStrike"]');
const putK=ctrl?+ctrl.value:95;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const prices=[];for(let p=70;p<=130;p++)prices.push(p);
const toX=p=>pad.l+(p-70)/60*pw;
const toY=v=>pad.t+ph/2-v/40*ph*0.4;
// stock payoff
x.beginPath();prices.forEach((p,i)=>{const pnl=p-100;i===0?x.moveTo(toX(p),toY(pnl)):x.lineTo(toX(p),toY(pnl));});
x.strokeStyle=BLUE+'80';x.lineWidth=1.5;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
// protective put payoff (stock + put at putK, premium ≈ 3)
const premium=3+(100-putK)*0.4;
x.beginPath();prices.forEach((p,i)=>{
  const putPayoff=Math.max(putK-p,0)-premium;
  const total=(p-100)+putPayoff;
  i===0?x.moveTo(toX(p),toY(total)):x.lineTo(toX(p),toY(total));
});
x.strokeStyle=GREEN;x.lineWidth=2.5;x.stroke();
// zero line
x.beginPath();x.moveTo(pad.l,toY(0));x.lineTo(pad.l+pw,toY(0));
x.strokeStyle=BORDER();x.lineWidth=1;x.stroke();
// put strike marker
x.beginPath();x.moveTo(toX(putK),pad.t);x.lineTo(toX(putK),pad.t+ph);
x.strokeStyle=RED+'60';x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
// labels
x.font='11px sans-serif';x.fillStyle=BLUE;x.textAlign='left';
x.fillText('Stock only',pad.l+10,pad.t+15);
x.fillStyle=GREEN;x.fillText(`Protected (put @ ${putK})`,pad.l+10,pad.t+30);
x.fillStyle=RED;x.fillText(`K=${putK}`,toX(putK)+4,pad.t+45);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';
x.fillText('Stock Price at Expiry',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['options-hedging']();
};

/* ═══════════════════════════════════════
   17 — Stop Losses
   ═══════════════════════════════════════ */
DRAWS['stop-losses']=function(){
const s=setupCanvas('cvs-stop-losses');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="atrMult"]');
const mult=(ctrl?+ctrl.value:20)/10;
const pad={l:50,r:20,t:20,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=60;
let rng=17;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
const prices=[100];const atr=2.5;
for(let i=1;i<N;i++){prices.push(prices[i-1]+rand()*atr*0.7+0.1);}
const maxP=Math.max(...prices)*1.02,minP=Math.min(...prices)*0.98;
const toX=i=>pad.l+i/N*pw;
const toY=p=>pad.t+(maxP-p)/(maxP-minP)*ph;
// price line
x.beginPath();prices.forEach((p,i)=>{i===0?x.moveTo(toX(i),toY(p)):x.lineTo(toX(i),toY(p));});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// trailing stop
let highWater=prices[0];const stops=[];
prices.forEach(p=>{highWater=Math.max(highWater,p);stops.push(highWater-mult*atr);});
x.beginPath();stops.forEach((s,i)=>{i===0?x.moveTo(toX(i),toY(s)):x.lineTo(toX(i),toY(s));});
x.strokeStyle=RED;x.lineWidth=1.5;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
// labels
x.font='11px sans-serif';x.fillStyle=ACCENT();x.textAlign='left';
x.fillText('Price',pad.l+5,pad.t+15);
x.fillStyle=RED;x.fillText(`Trailing stop (${mult.toFixed(1)}× ATR)`,pad.l+5,pad.t+30);
if(ctrl)ctrl.oninput=()=>DRAWS['stop-losses']();
};

/* ═══════════════════════════════════════
   18 — Pairs Trading
   ═══════════════════════════════════════ */
DRAWS['pairs-trading']=function(){
const s=setupCanvas('cvs-pairs-trading');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="pairsZ"]');
const entryZ=(ctrl?+ctrl.value:20)/10;
const pad={l:50,r:20,t:20,b:40};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=100;
// mean-reverting spread
let rng=23;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
const spread=[0];
for(let i=1;i<N;i++){spread.push(spread[i-1]*0.95+rand()*0.8);}
const maxS=Math.max(...spread.map(Math.abs))*1.2;
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph/2-v/maxS*(ph/2)*0.9;
// zero line
x.beginPath();x.moveTo(pad.l,toY(0));x.lineTo(pad.l+pw,toY(0));x.strokeStyle=BORDER();x.lineWidth=1;x.stroke();
// entry bands
[entryZ,-entryZ].forEach(z=>{
  x.beginPath();x.moveTo(pad.l,toY(z));x.lineTo(pad.l+pw,toY(z));
  x.strokeStyle=RED+'80';x.lineWidth=1;x.setLineDash([4,3]);x.stroke();x.setLineDash([]);
});
// spread line
x.beginPath();spread.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
x.strokeStyle=BLUE;x.lineWidth=2;x.stroke();
// mark entries
spread.forEach((v,i)=>{
  if(i>0&&Math.abs(spread[i-1])<entryZ&&Math.abs(v)>=entryZ){
    x.beginPath();x.arc(toX(i),toY(v),4,0,Math.PI*2);x.fillStyle=v>0?RED:GREEN;x.fill();
  }
});
x.font='11px sans-serif';x.fillStyle=RED;x.textAlign='left';
x.fillText(`Entry: ±${entryZ.toFixed(1)}σ`,pad.l+pw-120,pad.t+15);
x.fillStyle=BLUE;x.fillText('Spread (z-score)',pad.l+5,pad.t+15);
if(ctrl)ctrl.oninput=()=>DRAWS['pairs-trading']();
};

/* ═══════════════════════════════════════
   19 — Portfolio Insurance
   ═══════════════════════════════════════ */
DRAWS['portfolio-insurance']=function(){
const s=setupCanvas('cvs-portfolio-insurance');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="cppiMult"]');
const m=ctrl?+ctrl.value:4;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=80;const floor=80;
let rng=19;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
// simulate CPPI
let portfolio=100;const curve=[portfolio];
for(let i=0;i<N;i++){
  const cushion=Math.max(portfolio-floor,0);
  const riskyAlloc=Math.min(m*cushion/portfolio,1);
  const riskyReturn=rand()*0.03;
  const safeReturn=0.0002;
  portfolio=portfolio*(riskyAlloc*(1+riskyReturn)+(1-riskyAlloc)*(1+safeReturn));
  curve.push(portfolio);
}
const maxV=Math.max(...curve)*1.1;
const minV=Math.min(floor*0.95,...curve);
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph-(v-minV)/(maxV-minV)*ph;
// floor line
x.beginPath();x.moveTo(pad.l,toY(floor));x.lineTo(pad.l+pw,toY(floor));
x.strokeStyle=RED;x.lineWidth=1.5;x.setLineDash([4,4]);x.stroke();x.setLineDash([]);
// portfolio
x.beginPath();curve.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// labels
x.font='11px sans-serif';x.fillStyle=RED;x.textAlign='left';
x.fillText(`Floor: $${floor}`,pad.l+5,toY(floor)+14);
x.fillStyle=ACCENT();x.fillText(`CPPI (m=${m})`,pad.l+5,pad.t+15);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';x.fillText('Time →',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['portfolio-insurance']();
};

/* ═══════════════════════════════════════
   20 — Currency Hedging
   ═══════════════════════════════════════ */
DRAWS['currency-hedging']=function(){
const s=setupCanvas('cvs-currency-hedging');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="hedgeRatio"]');
const ratio=(ctrl?+ctrl.value:50)/100;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=60;
let rng=20;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
// local equity return + fx return
const localReturns=[],fxReturns=[];
for(let i=0;i<N;i++){localReturns.push(rand()*0.015+0.001);fxReturns.push(rand()*0.01);}
// cumulative returns
function cumulate(rets,hedge){let eq=100;const c=[eq];rets.forEach((r,i)=>{eq*=(1+r+(1-hedge)*fxReturns[i]);c.push(eq);});return c;}
const unhedged=cumulate(localReturns,0);
const hedged=cumulate(localReturns,ratio);
const full=cumulate(localReturns,1);
const allVals=[...unhedged,...hedged,...full];
const maxV=Math.max(...allVals)*1.05,minV=Math.min(...allVals)*0.95;
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph-(v-minV)/(maxV-minV)*ph;
// lines
[[unhedged,BLUE+'80','Unhedged',true],[hedged,ACCENT(),'Hedged '+Math.round(ratio*100)+'%',false],[full,GREEN+'80','Fully hedged',true]].forEach(([data,color,label,dashed])=>{
  x.beginPath();data.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
  x.strokeStyle=color;x.lineWidth=dashed?1.5:2.5;if(dashed){x.setLineDash([4,3]);x.stroke();x.setLineDash([]);}else x.stroke();
});
// legend
x.font='11px sans-serif';x.textAlign='left';
x.fillStyle=BLUE;x.fillText('Unhedged',pad.l+5,pad.t+15);
x.fillStyle=ACCENT();x.fillText(`${Math.round(ratio*100)}% hedged`,pad.l+5,pad.t+30);
x.fillStyle=GREEN;x.fillText('Fully hedged',pad.l+5,pad.t+45);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';x.fillText('Time →',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['currency-hedging']();
};

/* ═══════════════════════════════════════
   21 — Return Attribution
   ═══════════════════════════════════════ */
DRAWS['return-attribution']=function(){
const s=setupCanvas('cvs-return-attribution');if(!s)return;const{x,w,h}=s;
const pad={l:100,r:30,t:30,b:30};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const effects=[{name:'Allocation',val:0.45,color:BLUE},{name:'Selection',val:0.30,color:GREEN},{name:'Interaction',val:0.10,color:ORANGE},{name:'Total Active',val:0.85,color:ACCENT()}];
const maxVal=1;const barH=ph/effects.length*0.6;
effects.forEach((e,i)=>{
  const y=pad.t+i*(ph/effects.length)+ph/effects.length*0.2;
  const bw=e.val/maxVal*pw*0.8;
  x.fillStyle=e.color+'cc';
  roundRect(x,pad.l,y,bw,barH,4);x.fill();
  x.font='11px sans-serif';x.textAlign='right';x.fillStyle=MUTED();
  x.fillText(e.name,pad.l-8,y+barH/2+4);
  x.textAlign='left';x.fillStyle=e.color;
  x.fillText(`+${(e.val).toFixed(2)}%`,pad.l+bw+6,y+barH/2+4);
});
x.textAlign='left';
};

/* ═══════════════════════════════════════
   22 — Benchmark Tracking
   ═══════════════════════════════════════ */
DRAWS['benchmark-tracking']=function(){
const s=setupCanvas('cvs-benchmark-tracking');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="activeShare"]');
const as=(ctrl?+ctrl.value:50)/100;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=80;
let rng=22;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
let bmk=100,port=100;const bCurve=[bmk],pCurve=[port];
for(let i=0;i<N;i++){
  const mr=rand()*0.012+0.0005;
  bmk*=(1+mr);bCurve.push(bmk);
  port*=(1+mr+rand()*as*0.008);pCurve.push(port);
}
const allV=[...bCurve,...pCurve];
const maxV=Math.max(...allV)*1.02,minV=Math.min(...allV)*0.98;
const toX=i=>pad.l+i/N*pw;
const toY=v=>pad.t+ph-(v-minV)/(maxV-minV)*ph;
// benchmark
x.beginPath();bCurve.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
x.strokeStyle=BLUE;x.lineWidth=2;x.stroke();
// portfolio
x.beginPath();pCurve.forEach((v,i)=>{i===0?x.moveTo(toX(i),toY(v)):x.lineTo(toX(i),toY(v));});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// TE
const diffs=[];for(let i=1;i<=N;i++){diffs.push((pCurve[i]/pCurve[i-1])-(bCurve[i]/bCurve[i-1]));}
const teAnn=(Math.sqrt(diffs.reduce((s,d)=>s+d*d,0)/diffs.length)*Math.sqrt(252)*100).toFixed(2);
x.font='11px sans-serif';x.fillStyle=BLUE;x.textAlign='left';
x.fillText('Benchmark',pad.l+5,pad.t+15);
x.fillStyle=ACCENT();x.fillText('Portfolio',pad.l+5,pad.t+30);
x.fillStyle=MUTED();x.fillText(`TE ≈ ${teAnn}% | Active Share: ${Math.round(as*100)}%`,pad.l+5,pad.t+45);
if(ctrl)ctrl.oninput=()=>DRAWS['benchmark-tracking']();
};

/* ═══════════════════════════════════════
   23 — Alpha Generation
   ═══════════════════════════════════════ */
DRAWS['alpha-generation']=function(){
const s=setupCanvas('cvs-alpha-generation');if(!s)return;const{x,w,h}=s;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
// scatter: factor return vs portfolio excess return
let rng=31;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
const pts=[];const alpha=0.3;const beta=0.9;
for(let i=0;i<50;i++){const fm=rand()*4;const rp=alpha+beta*fm+rand()*1.5;pts.push({fm,rp});}
const maxX=6,minX=-6,maxY=8,minY=-8;
const toX=v=>pad.l+(v-minX)/(maxX-minX)*pw;
const toY=v=>pad.t+ph-(v-minY)/(maxY-minY)*ph;
// axes
x.strokeStyle=BORDER();x.lineWidth=1;
x.beginPath();x.moveTo(toX(0),pad.t);x.lineTo(toX(0),pad.t+ph);x.stroke();
x.beginPath();x.moveTo(pad.l,toY(0));x.lineTo(pad.l+pw,toY(0));x.stroke();
// regression line
x.beginPath();x.moveTo(toX(minX),toY(alpha+beta*minX));x.lineTo(toX(maxX),toY(alpha+beta*maxX));
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// points
pts.forEach(p=>{
  x.beginPath();x.arc(toX(p.fm),toY(p.rp),3,0,Math.PI*2);x.fillStyle=BLUE+'80';x.fill();
});
// alpha intercept
x.beginPath();x.arc(toX(0),toY(alpha),5,0,Math.PI*2);x.fillStyle=GREEN;x.fill();
x.font='bold 11px sans-serif';x.fillStyle=GREEN;x.textAlign='left';
x.fillText(`α = +${alpha.toFixed(1)}%`,toX(0)+8,toY(alpha)-6);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';
x.fillText('Factor Return →',pad.l+pw/2,h-8);
x.save();x.translate(14,pad.t+ph/2);x.rotate(-Math.PI/2);x.fillText('Portfolio Excess Return',0,0);x.restore();
};

/* ═══════════════════════════════════════
   24 — Risk-Adjusted Performance
   ═══════════════════════════════════════ */
DRAWS['risk-adjusted-perf']=function(){
const s=setupCanvas('cvs-risk-adjusted-perf');if(!s)return;const{x,w,h}=s;
const pad={l:100,r:40,t:30,b:30};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const ratios=[{name:'Sharpe',val:1.4,color:BLUE},{name:'Sortino',val:1.9,color:GREEN},{name:'Calmar',val:0.8,color:ORANGE},{name:'Treynor',val:1.1,color:PURPLE},{name:'Information',val:0.6,color:ACCENT()}];
const maxVal=2.5;const barH=ph/ratios.length*0.55;
// threshold lines
[1,2].forEach(v=>{
  const bx=pad.l+v/maxVal*pw*0.85;
  x.beginPath();x.moveTo(bx,pad.t);x.lineTo(bx,pad.t+ph);
  x.strokeStyle=BORDER()+'80';x.lineWidth=1;x.setLineDash([3,3]);x.stroke();x.setLineDash([]);
  x.font='9px sans-serif';x.fillStyle=MUTED();x.textAlign='center';
  x.fillText(v.toFixed(0),bx,pad.t-5);
});
ratios.forEach((r,i)=>{
  const y=pad.t+i*(ph/ratios.length)+ph/ratios.length*0.2;
  const bw=r.val/maxVal*pw*0.85;
  x.fillStyle=r.color+'cc';
  roundRect(x,pad.l,y,bw,barH,4);x.fill();
  x.font='11px sans-serif';x.textAlign='right';x.fillStyle=MUTED();
  x.fillText(r.name,pad.l-8,y+barH/2+4);
  x.textAlign='left';x.fillStyle=r.color;x.font='bold 11px sans-serif';
  x.fillText(r.val.toFixed(2),pad.l+bw+6,y+barH/2+4);
});
x.textAlign='left';
};

/* ═══════════════════════════════════════
   25 — Drawdown Analysis
   ═══════════════════════════════════════ */
DRAWS['drawdown-analysis']=function(){
const s=setupCanvas('cvs-drawdown-analysis');if(!s)return;const{x,w,h}=s;
const ctrl=document.querySelector('[data-ctrl="ddVol"]');
const vol=(ctrl?+ctrl.value:15)/100;
const pad={l:60,r:20,t:20,b:50};
const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;
const N=120;
let rng=25;function rand(){rng=(rng*1103515245+12345)&0x7fffffff;return(rng/0x7fffffff-0.5)*2;}
let eq=100;const eqCurve=[eq];
for(let i=0;i<N;i++){eq*=(1+rand()*vol/Math.sqrt(252)+0.0003);eqCurve.push(eq);}
// compute drawdown
let peak=eqCurve[0];const dd=[0];
for(let i=1;i<=N;i++){peak=Math.max(peak,eqCurve[i]);dd.push((eqCurve[i]-peak)/peak);}
const maxEq=Math.max(...eqCurve)*1.05,minEq=Math.min(...eqCurve)*0.95;
const minDD=Math.min(...dd);
const toX=i=>pad.l+i/N*pw;
// top half: equity
const eqH=ph*0.55;
const toYeq=v=>pad.t+eqH-(v-minEq)/(maxEq-minEq)*eqH;
x.beginPath();eqCurve.forEach((v,i)=>{i===0?x.moveTo(toX(i),toYeq(v)):x.lineTo(toX(i),toYeq(v));});
x.strokeStyle=ACCENT();x.lineWidth=2;x.stroke();
// bottom half: underwater curve
const ddTop=pad.t+eqH+10;
const ddH=ph-eqH-10;
const toYdd=v=>ddTop-v/Math.min(minDD,-0.01)*ddH;
// fill
x.beginPath();x.moveTo(toX(0),toYdd(0));
dd.forEach((v,i)=>{x.lineTo(toX(i),toYdd(v));});
x.lineTo(toX(N),toYdd(0));x.closePath();x.fillStyle=RED+'30';x.fill();
x.beginPath();dd.forEach((v,i)=>{i===0?x.moveTo(toX(i),toYdd(v)):x.lineTo(toX(i),toYdd(v));});
x.strokeStyle=RED;x.lineWidth=1.5;x.stroke();
// MDD label
const mdd=(minDD*100).toFixed(1);
x.font='bold 11px sans-serif';x.fillStyle=RED;x.textAlign='left';
x.fillText(`MDD: ${mdd}%`,pad.l+5,ddTop+ddH-5);
x.fillStyle=ACCENT();x.fillText('Equity curve',pad.l+5,pad.t+15);
x.fillStyle=MUTED();x.font='10px sans-serif';x.textAlign='center';x.fillText('Time →',pad.l+pw/2,h-8);
if(ctrl)ctrl.oninput=()=>DRAWS['drawdown-analysis']();
};
