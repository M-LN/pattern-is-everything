/* ── Guides ──
   Enhances the guide pages written by scripts/build-guides.mjs. The pages
   work without this file; it adds:
   - decision trees: opening an option closes its siblings, so one path is
     shown at a time; reaching a result is counted (GoatCounter, via ppTrack);
   - checklists: ticks are saved in this browser only, with a running count;
   - the Start over / Clear all button. */
(function () {
  'use strict';
  var body = document.querySelector('.g-body');
  if (!body) return;
  var id = body.getAttribute('data-guide');
  var track = function (what) { if (typeof window.ppTrack === 'function') window.ppTrack('guide: ' + id + ' → ' + what, 'Guide'); };

  if (body.getAttribute('data-kind') === 'tree') {
    body.addEventListener('toggle', function (e) {
      var d = e.target;
      if (!d.classList || !d.classList.contains('g-opt') || !d.open) return;
      var opts = d.parentElement.children;
      for (var i = 0; i < opts.length; i++) {
        if (opts[i] === d) continue;
        opts[i].open = false;
        var inner = opts[i].querySelectorAll('details[open]');   // and every branch below it
        for (var k = 0; k < inner.length; k++) inner[k].open = false;
      }
      var res = d.querySelector(':scope > .g-next > .g-result');
      if (res) track(res.getAttribute('data-result'));
    }, true);
    body.querySelector('[data-reset]').addEventListener('click', function () {
      var all = body.querySelectorAll('details[open]');
      for (var i = 0; i < all.length; i++) all[i].open = false;
      body.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    return;
  }

  // checklist
  var key = 'pp-guide-' + id;
  var boxes = body.querySelectorAll('input[type=checkbox]');
  var done = body.querySelector('[data-done]');
  var saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
  for (var i = 0; i < boxes.length; i++) if (saved.indexOf(+boxes[i].getAttribute('data-k')) !== -1) boxes[i].checked = true;
  function update(save) {
    var on = [];
    for (var j = 0; j < boxes.length; j++) if (boxes[j].checked) on.push(+boxes[j].getAttribute('data-k'));
    if (done) done.textContent = on.length;
    if (save) { try { localStorage.setItem(key, JSON.stringify(on)); } catch (e) { /* private mode */ } }
    return on.length;
  }
  update(false);
  body.addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    if (update(true) === boxes.length) track('all checked');
  });
  body.querySelector('[data-reset]').addEventListener('click', function () {
    for (var j = 0; j < boxes.length; j++) boxes[j].checked = false;
    update(true);
  });
})();
