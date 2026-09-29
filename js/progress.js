/* ── Reading progress ──
   Which topics this visitor has opened, kept in localStorage so it survives
   the session. Before this the readers counted "12 / 38 viewed" in memory,
   and every reload set it back to zero.

   Feeds four places:
   - the collection readers: the persisted counter, and a mark on each
     sidebar entry already seen (collection-reader.js);
   - the pre-rendered topic pages: opening one counts too (below);
   - the homepage: "Continue where you left off";
   - the universe map: topics already explored are ringed.

   Keys are reader URLs, "/ml-math/#activation" — the same keys as
   connections.json. Only ever stored on this device; nothing is sent. */
(function () {
  'use strict';

  var KEY = 'pp_progress_v1';

  function read() {
    try {
      var j = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (j && typeof j === 'object' && j.seen) return j;
    } catch (e) { /* unreadable or blocked — start fresh */ }
    return { seen: {}, last: null, totals: {} };
  }
  function write(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* blocked or full */ }
  }

  var api = {
    /* Record that `key` was opened, and make it the place to continue from. */
    mark: function (key, title, collection) {
      if (!key) return;
      var s = read();
      s.seen[key] = Date.now();
      s.last = { key: key, title: String(title || ''), collection: String(collection || '') };
      write(s);
    },
    seen: function (key) { return !!read().seen[key]; },
    /* Seen keys under a collection path, e.g. "/ml-math/". */
    seenIn: function (prefix) {
      return Object.keys(read().seen).filter(function (k) { return k.indexOf(prefix + '#') === 0; });
    },
    count: function () { return Object.keys(read().seen).length; },
    last: function () { return read().last; },
    /* Collection sizes, recorded by the readers so the homepage can say
       "12 of 38" without loading every collection. */
    setTotal: function (prefix, n) {
      var s = read();
      if (s.totals[prefix] === n) return;
      s.totals[prefix] = n;
      write(s);
    },
    total: function (prefix) { return read().totals[prefix] || 0; },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }
  };
  window.PatternProgress = api;

  /* A pre-rendered topic page (/<col>/<id>/) counts as opening that topic.
     Its title is "Topic — Collection". */
  var only = document.querySelector('.topic-page .topic');
  if (only && only.id) {
    var parts = document.title.split(' — ');
    var col = location.pathname.replace(/index\.html$/, '').replace(/[^/]+\/$/, '');
    api.mark(col + '#' + only.id, parts[0], parts.slice(1).join(' — '));
  }

  /* Homepage: fill the "Continue" card, if the page has one and there is
     somewhere to continue from. */
  function fillContinue() {
    var box = document.getElementById('continueReading');
    var last = api.last();
    if (!box || !last || !last.key) return;
    var prefix = last.key.split('#')[0];
    var n = api.seenIn(prefix).length, total = api.total(prefix);
    var link = box.querySelector('.cr-link');
    link.href = last.key;
    box.querySelector('.cr-title').textContent = last.title;
    box.querySelector('.cr-col').textContent = last.collection;
    box.querySelector('.cr-count').textContent = total
      ? n + ' of ' + total + ' viewed'
      : n + (n === 1 ? ' topic' : ' topics') + ' viewed';
    var all = api.count();
    box.querySelector('.cr-all').textContent = all + (all === 1 ? ' topic' : ' topics') + ' explored across the site';
    var forget = box.querySelector('.cr-forget');
    if (forget) forget.onclick = function () { api.clear(); box.hidden = true; };
    box.hidden = false;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fillContinue);
  else fillContinue();
})();
