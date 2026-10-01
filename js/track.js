/* ── Events ──
   Which connections people actually follow — pattern bridges, "Linked
   from", the "Back to …" chip, the pattern trails — counted as GoatCounter
   events, so what gets written next can follow what gets used. Same
   privacy-friendly analytics the pages already load: no cookies, nothing
   personal, and nothing at all on localhost.

   ppTrack(path, title). GoatCounter's count.js loads async and sends with
   sendBeacon, so an event fired on the click that leaves the page still
   arrives; one fired before the script has loaded waits for it briefly. */
(function () {
  'use strict';
  var queue = [];
  var waiting = false;

  function ready() { return window.goatcounter && typeof window.goatcounter.count === 'function'; }
  function send(e) {
    try { window.goatcounter.count({ path: e.path, title: e.title || e.path, event: true }); }
    catch (err) { /* analytics must never break the page */ }
  }
  function flushWhenReady(tries) {
    if (ready()) { queue.splice(0).forEach(send); waiting = false; return; }
    if (tries > 20) { queue.length = 0; waiting = false; return; }   // ~10 s, then give up
    setTimeout(function () { flushWhenReady(tries + 1); }, 500);
  }

  window.ppTrack = function (path, title) {
    var e = { path: String(path).slice(0, 200), title: title && String(title).slice(0, 200) };
    if (ready()) return send(e);
    queue.push(e);
    if (!waiting) { waiting = true; flushWhenReady(0); }
  };

  /* "ml-math/activation" for the topic a URL (or this page) points at:
     a reader is /<col>/#<id>, a pre-rendered page /<col>/<id>/. */
  window.ppTopicSlug = function (url) {
    var u = url || location;
    return (u.pathname.replace(/index\.html$/, '') + (u.hash || '').replace('#', ''))
      .replace(/^\/|\/$/g, '');
  };
})();
