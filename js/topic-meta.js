/* ── Per-topic document metadata ──
   Collections render every topic client-side behind a hash, so the tab title
   and social tags stayed frozen on the collection's landing values no matter
   which topic was open — all 39 stats topics read as "The Toolkit".

   This wraps the page's own show() and keeps the document metadata in step
   with the visible topic. That fixes browser tabs, bookmarks, history entries
   and crawlers that execute JS. Social crawlers (Facebook/LinkedIn/X) never
   run JS, so real share cards still need pre-rendered per-topic pages; the
   tags written here are what those pages would carry.

   `canonical` and `og:url` are deliberately left alone: they correctly point
   at the collection page until per-topic URLs actually exist. */
(function () {
  'use strict';

  var meta = function (sel) { return document.head.querySelector(sel); };
  var TITLE = document.title;
  var COLLECTION = TITLE.split(' — ')[0].trim() || TITLE;

  var slots = [
    { el: meta('meta[property="og:title"]'), attr: 'content', kind: 'title' },
    { el: meta('meta[name="twitter:title"]'), attr: 'content', kind: 'title' },
    { el: meta('meta[property="og:description"]'), attr: 'content', kind: 'desc' },
    { el: meta('meta[name="twitter:description"]'), attr: 'content', kind: 'desc' },
    { el: meta('meta[name="description"]'), attr: 'content', kind: 'desc' }
  ].filter(function (s) { return s.el; });

  // Remember the landing values so returning to the overview restores them.
  var defaults = { title: TITLE };
  slots.forEach(function (s, i) { defaults[i] = s.el.getAttribute(s.attr); });

  function describe(topic) {
    var text = String(topic.content || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length > 155) text = text.slice(0, 152).replace(/\s+\S*$/, '') + '…';
    return text;
  }

  function find(id) {
    if (typeof TOPIC_DATA === 'undefined' || !Array.isArray(TOPIC_DATA)) return null;
    for (var i = 0; i < TOPIC_DATA.length; i++) if (TOPIC_DATA[i].id === id) return TOPIC_DATA[i];
    return null;
  }

  function apply(id) {
    var topic = id && id !== 'home' ? find(id) : null;
    if (!topic) {
      document.title = defaults.title;
      slots.forEach(function (s, i) { if (defaults[i] != null) s.el.setAttribute(s.attr, defaults[i]); });
      return;
    }
    var title = topic.title + ' — ' + COLLECTION;
    var desc = describe(topic) || defaults[0];
    document.title = title;
    slots.forEach(function (s, i) {
      var v = s.kind === 'title' ? title : desc;
      if (v) s.el.setAttribute(s.attr, v);
      else if (defaults[i] != null) s.el.setAttribute(s.attr, defaults[i]);
    });
  }

  // The page defines show() in an inline script; this file loads after it.
  // show() navigates with history.replaceState, which fires no hashchange,
  // so wrapping the function is the only reliable hook.
  function install() {
    if (typeof window.show !== 'function' || window.show.__metaWrapped) return false;
    var original = window.show;
    var wrapped = function (id) {
      var result = original.apply(this, arguments);
      try { apply(id); } catch (e) { /* metadata must never break navigation */ }
      return result;
    };
    wrapped.__metaWrapped = true;
    window.show = wrapped;
    return true;
  }

  if (!install()) {
    // Inline script not parsed yet — retry once the document is ready.
    document.addEventListener('DOMContentLoaded', install);
    window.addEventListener('load', install);
  }
})();
