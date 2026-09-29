/* ── Return trail ──
   Pattern bridges are the point of the site — Backpropagation links to
   information cascades in Market Psychology, and so on — but following one
   used to open a new tab, and the page you landed on had no idea where you
   came from. Now a bridge opens in the same tab and the landing reader shows
   a chip, "← Back to Backpropagation", that returns to the exact spot, however
   many topics you have read on the far side.

   This file is the half that runs on both ends: it records the jump when a
   topic link leads to another page, and draws the chip. Loaded by the
   collection readers and by the pre-rendered topic pages. The reader owns the
   other half — which history entry the chip belongs to and how far back the
   origin is — because that lives in its history state (collection-reader.js). */
(function () {
  'use strict';

  var KEY = 'pp_trail';
  var MAX_AGE = 10 * 60 * 1000;   // a jump recorded longer ago than this is stale

  function samePage(a, b) {
    var norm = function (p) { return p.replace(/index\.html$/, ''); };
    return norm(a.pathname) === norm(b.pathname);
  }

  /* "Backpropagation — ML Math" → { title, collection }. The readers keep
     document.title in that shape per topic (topic-meta.js); the pre-rendered
     pages are generated with it. A title without the separator is a hub or
     overview, which is not a topic to come back to. */
  function currentTopic() {
    var parts = document.title.split(' — ');
    if (parts.length < 2 || parts[1] === 'Pattern is Everything') return null;
    return { title: parts[0].trim(), collection: parts.slice(1).join(' — ').trim() };
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('.topic a[href]');
    if (!a || a.origin !== location.origin || samePage(a, location)) return;
    // Topic markup opens its cross-collection links in a new tab, which leaves
    // the Back button with nowhere to go. A plain click now stays in this tab;
    // Ctrl/Cmd/middle-click still open a new one.
    if (a.target === '_blank') a.removeAttribute('target');
    var from = currentTopic();
    if (!from) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({
        title: from.title, collection: from.collection, to: a.href, t: Date.now()
      }));
    } catch (err) { /* storage blocked — the jump still works, just no chip */ }
  }, true);

  /* The jump recorded for this page load, if it led here. Consumed either way,
     so a later visit to the same page never shows a stale chip. */
  function take() {
    var raw;
    try { raw = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) { return null; }
    if (!raw) return null;
    try {
      var j = JSON.parse(raw);
      var to = new URL(j.to);
      if (Date.now() - j.t > MAX_AGE || !samePage(to, location) || to.hash !== location.hash) return null;
      return { title: String(j.title), collection: String(j.collection) };
    } catch (e) { return null; }
  }

  var chip = null;
  /* trail: { title, collection } or null to hide. onBack runs on click. */
  function render(trail, onBack) {
    if (!trail) { if (chip) chip.hidden = true; return; }
    if (!chip) {
      chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'return-trail';
      chip.innerHTML = '<span class="rt-arrow" aria-hidden="true">←</span>' +
        '<span class="rt-text">Back to <strong class="rt-title"></strong></span>' +
        '<span class="rt-col"></span>';
      document.body.appendChild(chip);
    }
    chip.querySelector('.rt-title').textContent = trail.title;
    chip.querySelector('.rt-col').textContent = trail.collection;
    chip.setAttribute('aria-label', 'Back to ' + trail.title + ' in ' + trail.collection);
    chip.onclick = onBack;
    chip.hidden = false;
  }

  window.ReturnTrail = { take: take, render: render };
})();
