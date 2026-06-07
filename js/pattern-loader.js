/* Pattern Loader — gradient descent + normal distribution animations */
window.PatternLoader = (function () {
  var canvas = document.getElementById('loaderCanvas');
  if (!canvas) return { hide: function(){} };

  var SIZE = 200;
  var DPR = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = SIZE * DPR; canvas.height = SIZE * DPR;
  var ctx = canvas.getContext('2d');
  ctx.scale(DPR, DPR);

  var ACCENT = '#D6A15B';
  var raf, hidden = false;

  function getTheme() {
    var dt = document.documentElement.getAttribute('data-theme');
    if (dt === 'dark') return 'dark';
    if (dt === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function ink() { return getTheme() === 'dark' ? '#E9E3D7' : '#1C1A16'; }

  function rgba(hex, a) {
    var h = hex.replace('#', '');
    return 'rgba(' + parseInt(h.slice(0,2),16) + ',' + parseInt(h.slice(2,4),16) + ',' + parseInt(h.slice(4,6),16) + ',' + a + ')';
  }
  function randn() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  // Gradient descent
  function makeGradient() {
    var f  = function(x) { return 0.60*x*x + 0.12*Math.sin(3*x+0.4); };
    var df = function(x) { return 1.20*x + 0.36*Math.cos(3*x+0.4); };
    var X0 = -1.30, X1 = 1.30;
    var mapX = function(x) { return 100 + (x/1.30)*64; };
    var vmin = Infinity, vmax = -Infinity, xmin = 0;
    for (var xx = X0; xx <= X1; xx += 0.005) {
      var v = f(xx);
      if (v < vmin) { vmin = v; xmin = xx; }
      if (v > vmax) vmax = v;
    }
    var TOP = 58, BOT = 168;
    var mapY = function(v) { return BOT - ((v-vmin)/(vmax-vmin))*(BOT-TOP); };
    var x = -1.20, vel = 0, hold = 0, trail = [];

    return function (dt) {
      var c = ink(), acc = ACCENT;
      ctx.beginPath();
      var first = true;
      for (var xx = X0; xx <= X1; xx += 0.02) {
        var px = mapX(xx), py = mapY(f(xx));
        if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = rgba(c, 0.5); ctx.lineWidth = 1.4; ctx.stroke();

      ctx.beginPath(); ctx.arc(mapX(xmin), mapY(vmin)+0.5, 2.4, 0, Math.PI*2);
      ctx.strokeStyle = rgba(c, 0.3); ctx.lineWidth = 1; ctx.stroke();

      if (hold > 0) {
        hold -= dt;
        if (hold <= 0) { x = (x < 0 ? 1.20 : -1.20); vel = 0; trail = []; }
      } else {
        var g = df(x);
        vel = 0.9*vel - 0.045*g;
        x += vel;
        if (x < X0) { x = X0; vel = 0; }
        if (x > X1) { x = X1; vel = 0; }
        if (Math.abs(g) < 0.03 && Math.abs(vel) < 0.004) hold = 0.75;
      }

      var bx = mapX(x), by = mapY(f(x));
      trail.push([bx, by]);
      if (trail.length > 16) trail.shift();
      for (var i = 0; i < trail.length; i++) {
        ctx.beginPath(); ctx.arc(trail[i][0], trail[i][1], 1.6, 0, Math.PI*2);
        ctx.fillStyle = rgba(acc, (i/trail.length)*0.5); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI*2);
      ctx.fillStyle = rgba(acc, 0.16); ctx.fill();
      ctx.beginPath(); ctx.arc(bx, by, 4.2, 0, Math.PI*2);
      ctx.fillStyle = acc; ctx.fill();
    };
  }

  // Normal distribution
  function makeNormal() {
    var K = 23, MAXCOL = 8;
    var L = 24, Rr = 176, BASE = 168, PEAK = 62;
    var binW = (Rr-L)/K;
    var unit = (BASE-PEAK)/MAXCOL;
    var mapX = function(x) { return L + ((x+3)/6)*(Rr-L); };
    var bell = function(x) { return Math.exp(-x*x/2); };
    var mapY = function(v) { return BASE - v*(BASE-PEAK); };
    var target = [];
    for (var i = 0; i < K; i++) {
      var xc = -3 + (i+0.5)/K*6;
      target.push(Math.max(0, Math.round(bell(xc)*MAXCOL)));
    }
    var counts = new Array(K).fill(0);
    var drops = [], spawnT = 0, fade = 1, fadeDir = 0, doneHold = 0;

    function reset() { counts = new Array(K).fill(0); drops = []; fadeDir = 0; fade = 1; doneHold = 0; }

    return function (dt) {
      var c = ink(), acc = ACCENT;
      ctx.globalAlpha = fade;

      for (var i = 0; i < K; i++) {
        if (counts[i] <= 0) continue;
        var h = counts[i]*unit;
        ctx.fillStyle = rgba(acc, 0.22);
        ctx.fillRect(L + i*binW + 0.7, BASE-h, binW-1.4, h);
      }
      ctx.beginPath();
      var first = true;
      for (var x = -3; x <= 3; x += 0.04) {
        var px = mapX(x), py = mapY(bell(x));
        if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = rgba(c, 0.6); ctx.lineWidth = 1.4; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(L, BASE); ctx.lineTo(Rr, BASE);
      ctx.strokeStyle = rgba(c, 0.12); ctx.lineWidth = 1; ctx.stroke();

      var full = counts.every(function(cv, i) { return cv >= target[i]; });

      if (fadeDir === 0 && !full) {
        spawnT += dt;
        if (spawnT > 0.055) {
          spawnT = 0;
          for (var tries = 0; tries < 6; tries++) {
            var xv = Math.max(-2.9, Math.min(2.9, randn()*0.95));
            var bin = Math.max(0, Math.min(K-1, Math.floor(((xv+3)/6)*K)));
            if (counts[bin] < target[bin]) {
              var ty = BASE - (counts[bin]+1)*unit + unit*0.5;
              drops.push({ x: mapX(xv), y: 34, ty: ty, bin: bin });
              break;
            }
          }
        }
      }
      for (var j = drops.length-1; j >= 0; j--) {
        var d = drops[j];
        d.y += (d.ty - d.y)*Math.min(1, dt*8);
        ctx.beginPath(); ctx.arc(d.x, d.y, 2.1, 0, Math.PI*2);
        ctx.fillStyle = acc; ctx.fill();
        if (Math.abs(d.y - d.ty) < 1.2) {
          if (counts[d.bin] < target[d.bin]) counts[d.bin]++;
          drops.splice(j, 1);
        }
      }

      if (fadeDir === 0 && full && drops.length === 0) {
        doneHold += dt;
        if (doneHold > 0.6) fadeDir = -1;
      }
      if (fadeDir === -1) {
        fade -= dt*1.2;
        if (fade <= 0) { reset(); fade = 0; fadeDir = 1; }
      } else if (fadeDir === 1) {
        fade += dt*1.8;
        if (fade >= 1) { fade = 1; fadeDir = 0; }
      }
      ctx.globalAlpha = 1;
    };
  }

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var draw = Math.random() < 0.5 ? makeGradient() : makeNormal();
  var last = performance.now();

  function loop(now) {
    if (hidden) return;
    var dt = Math.min(0.05, (now-last)/1000); last = now;
    ctx.clearRect(0, 0, SIZE, SIZE);
    draw(dt);
    raf = requestAnimationFrame(loop);
  }

  if (!REDUCED) requestAnimationFrame(loop);

  // Safety timeout
  setTimeout(function() { if (!hidden) hide(); }, 8000);

  function hide() {
    if (hidden) return;
    hidden = true;
    cancelAnimationFrame(raf);
    var el = document.getElementById('pageLoader');
    if (el) {
      el.classList.add('is-hidden');
      setTimeout(function() { el.remove(); }, 500);
    }
  }

  return { hide: hide };
})();
