/* ── Pattern trails, in the browser ──
   The trails themselves are in trails/trails.json and their pages are built
   by scripts/build-trails.mjs. This does the parts that depend on the
   visitor:

   - In a collection reader opened with ?trail=<id>: a banner at the top of
     the topic with the trail, "Stop 3 of 7", the note on why this stop
     belongs, and the way back and on; the same way on again at the end of
     the topic. Wandering off to a topic that isn't on the trail turns it
     into a "back to stop 3" link instead.
   - On trail pages and trail cards: which stops this visitor has opened
     (js/progress.js), and "Continue at stop 4" in place of "Start".
   - Events (js/track.js): a trail started, each stop reached, finished. */
(function () {
  'use strict';

  var trailsP = null, topicsP = null;
  function trails() {
    if (!trailsP) trailsP = fetch('/trails/trails.json').then(function (r) { return r.json(); })
      .then(function (j) { return j.trails; }).catch(function () { return []; });
    return trailsP;
  }
  // Same URL as js/connections.js uses, so the browser fetches it once.
  function topics() {
    if (!topicsP) topicsP = fetch('/connections.json?v=1').then(function (r) { return r.json(); })
      .then(function (j) { return j.topics; }).catch(function () { return {}; });
    return topicsP;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function track(path, title) { if (window.ppTrack) window.ppTrack(path, title); }
  var seen = function (key) { return !!(window.PatternProgress && PatternProgress.seen(key)); };
  var stopUrl = function (trail, key) { var p = key.split('#'); return p[0] + '?trail=' + trail.id + '#' + p[1]; };

  /* ── Progress on trail pages and cards ── */
  function showProgress(list) {
    var byId = {};
    list.forEach(function (t) { byId[t.id] = t; });
    document.querySelectorAll('[data-trail-progress]').forEach(function (el) {
      var t = byId[el.getAttribute('data-trail-progress')];
      if (!t) return;
      var n = t.stops.filter(function (s) { return seen(s.key); }).length;
      el.textContent = n === t.stops.length ? '✓ Trail complete' : n ? n + ' of ' + t.stops.length + ' visited' : '';
      el.classList.toggle('is-done', n === t.stops.length);
    });
    var ol = document.querySelector('.trail-stops[data-trail]');
    if (!ol) return;
    var trail = byId[ol.getAttribute('data-trail')];
    ol.querySelectorAll('.trail-stop').forEach(function (li) {
      li.classList.toggle('is-seen', seen(li.getAttribute('data-key')));
    });
    // Partway through: pick up at the first stop not yet opened.
    var start = document.querySelector('.trail-start');
    if (trail && start) {
      var next = trail.stops.findIndex(function (s) { return !seen(s.key); });
      if (next > 0) {
        start.href = stopUrl(trail, trail.stops[next].key);
        start.textContent = 'Continue at stop ' + (next + 1) + ' →';
      }
      start.addEventListener('click', function () { track('trail: ' + trail.id + ' / start', 'Pattern trail started'); });
    }
  }

  /* ── The banner in a reader ── */
  var trailId = new URLSearchParams(location.search).get('trail');
  var STOP_KEY = 'pp_trail_stop_';

  function navLinks(trail, i, t) {
    var prev = trail.stops[i - 1], next = trail.stops[i + 1];
    var out = prev
      ? '<a class="tb-prev" href="' + esc(stopUrl(trail, prev.key)) + '" data-trail-nav>← ' + esc((t[prev.key] || {}).t || 'Previous stop') + '</a>'
      : '<a class="tb-prev" href="/trails/' + trail.id + '/" data-trail-nav>← About this trail</a>';
    out += next
      ? '<a class="tb-next" href="' + esc(stopUrl(trail, next.key)) + '" data-trail-nav>Next stop: ' + esc((t[next.key] || {}).t || '') + ' →</a>'
      : '<a class="tb-next tb-finish" href="/trails/' + trail.id + '/" data-trail-nav data-trail-finish>Finish the trail ✓</a>';
    return out;
  }

  function placeBanner(topicEl, trail, t, key) {
    document.querySelectorAll('.trail-banner, .trail-next').forEach(function (n) { n.remove(); });
    var i = trail.stops.findIndex(function (s) { return s.key === key; });
    var banner = document.createElement('div');
    banner.setAttribute('role', 'navigation');
    banner.setAttribute('aria-label', 'Pattern trail');
    var head = '<a class="tb-trail" href="/trails/' + trail.id + '/" data-trail-nav>◆ ' + esc(trail.title) + '</a>';
    if (i === -1) {
      // Off the trail: offer the way back to the last stop reached.
      var last = 0;
      try { last = Number(sessionStorage.getItem(STOP_KEY + trail.id)) || 0; } catch (e) { /* storage blocked */ }
      var back = trail.stops[last];
      banner.className = 'trail-banner is-off';
      banner.innerHTML = '<div class="tb-head">' + head + '<span class="tb-pos">Off the trail</span></div>' +
        '<div class="tb-nav"><a class="tb-next" href="' + esc(stopUrl(trail, back.key)) + '" data-trail-nav>Back to stop ' +
        (last + 1) + ': ' + esc((t[back.key] || {}).t || '') + ' →</a></div>';
      topicEl.insertBefore(banner, topicEl.firstChild);
      return;
    }
    try { sessionStorage.setItem(STOP_KEY + trail.id, String(i)); } catch (e) { /* storage blocked */ }
    banner.className = 'trail-banner';
    banner.innerHTML = '<div class="tb-head">' + head + '<span class="tb-pos">Stop ' + (i + 1) + ' of ' + trail.stops.length + '</span></div>' +
      '<p class="tb-note">' + esc(trail.stops[i].note) + '</p>' +
      '<div class="tb-nav">' + navLinks(trail, i, t) + '</div>';
    topicEl.insertBefore(banner, topicEl.firstChild);

    // The way on again at the end of the topic, above its own prev/next.
    var foot = document.createElement('div');
    foot.className = 'trail-next';
    foot.setAttribute('role', 'navigation');
    foot.setAttribute('aria-label', 'Pattern trail, continued');
    foot.innerHTML = '<div class="tb-head">' + head + '<span class="tb-pos">Stop ' + (i + 1) + ' of ' + trail.stops.length + '</span></div>' +
      '<div class="tb-nav">' + navLinks(trail, i, t) + '</div>';
    var nav = topicEl.querySelector('.topic-nav');
    if (nav) nav.parentNode.insertBefore(foot, nav); else topicEl.appendChild(foot);

    var once = 'pp_trail_tracked_' + trail.id + '_' + i;
    try {
      if (!sessionStorage.getItem(once)) {
        sessionStorage.setItem(once, '1');
        track('trail: ' + trail.id + ' / stop ' + (i + 1), 'Pattern trail stop reached');
      }
    } catch (e) { /* storage blocked: skip the event rather than repeat it */ }
  }

  if (trailId) {
    var current = null;
    var ready = Promise.all([trails(), topics()]);
    var render = function () {
      if (!current) return;
      ready.then(function (r) {
        var trail = r[0].find(function (x) { return x.id === trailId; });
        var el = document.getElementById(current.id);
        if (!trail || !el || current.id === 'home') return;
        placeBanner(el, trail, r[1], current.path + '#' + current.id);
      });
    };
    window.addEventListener('pp:topic', function (e) { current = e.detail; render(); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-trail-finish]');
      if (a) track('trail: ' + trailId + ' / complete', 'Pattern trail finished');
    });
  }

  if (document.querySelector('[data-trail-progress], .trail-stops')) {
    var go = function () { trails().then(showProgress); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  }
})();
