/* ── Connections ──
   Two things built on connections.json (scripts/connections.mjs), the graph
   of which topics link to which:

   1. A preview card when hovering or focusing a link to a topic — its
      collection, title and pattern line — so a pattern bridge says where it
      goes before you take it.
   2. A "Linked from" list under each topic: the topics elsewhere on the site
      whose bridges point here. Bridges only ever pointed outwards; this is
      the way back in.

   Loaded by the collection readers, which call Connections.render(id) as
   each topic is shown, and by the pre-rendered topic pages, which render
   their one topic on load. The graph is fetched once, on first need. */
(function () {
  'use strict';

  var data = null;
  var loading = null;
  function load() {
    if (!loading) {
      loading = fetch('/connections.json?v=1')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { data = j; return j; })
        .catch(function () { return null; });
    }
    return loading;
  }

  /* "/ml-math/#activation" for a link to a topic, whether it points at the
     reader (/ml-math/#activation) or at the pre-rendered page
     (/ml-math/activation/, as the generated "Linked from" lists do). Null
     for anything else; a key that names no topic just finds no card. */
  function keyOf(a) {
    if (!a || a.origin !== location.origin) return null;
    var path = a.pathname.replace(/index\.html$/, '');
    if (a.hash) return path + a.hash;
    var m = path.match(/^(\/.+\/)([^/]+)\/$/);
    return m ? m[1] + '#' + m[2] : null;
  }

  /* This page's key for a topic id: a reader lives at /<col>/, a pre-rendered
     page at /<col>/<id>/. */
  function keyFor(id) {
    var path = location.pathname.replace(/index\.html$/, '');
    if (document.querySelector('.topic-page')) path = path.replace(/[^/]+\/$/, '');
    return path + '#' + id;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ── 1. Preview card ── */
  var card = null, showTimer = null, current = null, armed = null;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  function place(a) {
    var r = a.getBoundingClientRect();
    var w = card.offsetWidth, h = card.offsetHeight;
    var left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
    var top = r.top - h - 10;
    card.classList.toggle('below', top < 12);
    if (top < 12) top = r.bottom + 10;
    card.style.left = left + 'px';
    card.style.top = top + 'px';
  }

  /* The topic's visualization, captured by scripts/build-thumbs.mjs:
     "/markets/charts/#doji" → /assets/thumbs/markets/charts/doji.webp,
     versioned by its hash. Null for a topic without one. */
  function thumbSrc(key) {
    var t = data && data.topics[key];
    if (!t || !t.i) return null;
    return '/assets/thumbs/' + key.slice(1).replace('/#', '/') + '.webp?v=' + t.i;
  }

  function open(a, key) {
    var t = data && data.topics[key];
    if (!t) return;
    if (!card) {
      card = document.createElement('div');
      card.className = 'bridge-preview';
      card.id = 'bridgePreview';
      card.setAttribute('role', 'tooltip');
      document.body.appendChild(card);
    }
    var incoming = (data.linkedFrom[key] || []).length;
    var src = thumbSrc(key);
    card.innerHTML =
      (src ? '<div class="bp-thumb"><img src="' + esc(src) + '" alt="" decoding="async"></div>' : '') +
      '<div class="bp-col">' + esc(t.c) + '</div>' +
      '<div class="bp-title">' + esc(t.t) + '</div>' +
      (t.p ? '<div class="bp-pattern"><span class="bp-mark" aria-hidden="true">◆</span>' + esc(t.p) + '</div>' : '') +
      (incoming > 1 ? '<div class="bp-meta">' + incoming + ' topics link here</div>' : '');
    card.hidden = false;
    place(a);
    card.classList.add('is-open');
    a.setAttribute('aria-describedby', 'bridgePreview');
    current = a;
  }

  function close() {
    clearTimeout(showTimer);
    armed = null;
    if (current) current.removeAttribute('aria-describedby');
    current = null;
    if (card) { card.classList.remove('is-open'); card.hidden = true; }
  }

  function candidate(e) {
    var a = e.target.closest && e.target.closest('.topic a[href], .topic-connections a[href]');
    if (!a || a.closest('.heading-anchor') || a.classList.contains('heading-anchor')) return null;
    var key = keyOf(a);
    // A link to the topic being read isn't going anywhere.
    return key && key !== keyFor((a.closest('.topic') || {}).id) ? { a: a, key: key } : null;
  }

  function arm(e, delay) {
    var c = candidate(e);
    if (!c || c.a === current) return;
    close();
    armed = c.a;
    load().then(function () {
      // The pointer may have left while the graph was still loading.
      if (armed !== c.a) return;
      // Start fetching the thumbnail during the hover delay, not after it.
      var src = thumbSrc(c.key);
      if (src) new Image().src = src;
      showTimer = setTimeout(function () { open(c.a, c.key); }, delay);
    });
  }

  // Pointer hover only where there is one; on touch a tap should just follow
  // the link. Keyboard focus shows it everywhere.
  document.addEventListener('mouseover', function (e) { if (canHover.matches) arm(e, 220); });
  document.addEventListener('mouseout', function (e) {
    var c = candidate(e);
    if (c && !(e.relatedTarget && c.a.contains(e.relatedTarget))) close();
  });
  document.addEventListener('focusin', function (e) { arm(e, 0); });
  document.addEventListener('focusout', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', close, { passive: true });
  document.addEventListener('click', close, true);

  /* ── 2. Linked from ── */
  function render(id) {
    if (!id || id === 'home') return;
    load().then(function (d) {
      var topic = document.getElementById(id);
      if (!d || !topic || topic.querySelector('.topic-connections')) return;
      var from = d.linkedFrom[keyFor(id)];
      if (!from || !from.length) return;
      var items = from.map(function (k) {
        var t = d.topics[k];
        return '<li><a href="' + esc(k) + '">' +
          '<span class="tc-col">' + esc(t.c) + '</span>' +
          '<span class="tc-title">' + esc(t.t) + '</span>' +
          (t.p ? '<span class="tc-pattern">' + esc(t.p) + '</span>' : '') +
          '</a></li>';
      }).join('');
      var box = document.createElement('section');
      box.className = 'topic-connections';
      box.setAttribute('aria-label', 'Topics that link here');
      box.innerHTML = '<div class="tc-head"><span aria-hidden="true">↔</span> Linked from ' +
        '<span class="tc-count">' + from.length + '</span></div><ul>' + items + '</ul>';
      // Above the reader's prev/next buttons, which sit inside the topic.
      var nav = topic.querySelector('.topic-nav');
      if (nav) nav.parentNode.insertBefore(box, nav); else topic.appendChild(box);
    });
  }

  window.Connections = { render: render };

  // A pre-rendered page holds exactly one topic.
  // It usually carries its list already, written by scripts/prerender.mjs.
  var only = document.querySelector('.topic-page .topic');
  if (only && !document.querySelector('.topic-connections')) render(only.id);
})();
