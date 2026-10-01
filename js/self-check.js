/* ── Check yourself ──
   A few multiple-choice questions under a topic, each with the reasoning
   behind the answer. A pilot on The Toolkit: renderSelfCheck(id, items)
   returns the markup (the collection's topics.js holds the questions);
   the rest of this file makes the options clickable and counts answers as
   GoatCounter events, so the pilot can be judged on whether people use it.

   Without JavaScript — or on a pre-rendered page before this loads — each
   question still works: the answer sits in a <details> under it.

   items: [{ q, options: [..], answer: <index>, why }] — trusted markup
   written in the repo, not user input. */
(function () {
  'use strict';

  window.renderSelfCheck = function (id, items) {
    if (!items || !items.length) return '';
    return '<section class="selfcheck" data-topic="' + id + '">' +
      '<div class="depth-title">Check yourself</div>' +
      items.map(function (it, n) {
        return '<div class="sc-q" data-answer="' + it.answer + '" data-n="' + (n + 1) + '">' +
          '<p class="sc-prompt"><span class="sc-num">' + (n + 1) + '.</span> ' + it.q + '</p>' +
          '<div class="sc-options">' + it.options.map(function (o, k) {
            return '<button type="button" class="sc-opt" data-k="' + k + '">' +
              '<span class="sc-key">' + 'ABCD'[k] + '</span><span>' + o + '</span></button>';
          }).join('') + '</div>' +
          '<details class="sc-why"><summary>Show answer</summary><p><strong>' + 'ABCD'[it.answer] + '.</strong> ' + it.why + '</p></details>' +
        '</div>';
      }).join('') +
    '</section>';
  };

  var css = '' +
    '.selfcheck{margin:28px 0 8px;padding:18px 20px;border:1px solid var(--border);border-radius:var(--radius,10px);background:var(--surface,transparent)}' +
    '.selfcheck .depth-title{margin-bottom:6px}' +
    '.sc-q{padding:12px 0;border-top:1px solid var(--border)}' +
    '.sc-q:first-of-type{border-top:0}' +
    '.sc-prompt{margin:0 0 10px;font-size:14.5px;line-height:1.6;color:var(--text)}' +
    '.sc-num{font-family:var(--mono);color:var(--accent);margin-right:2px}' +
    '.sc-options{display:grid;gap:6px}' +
    '.sc-opt{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%;padding:9px 12px;border:1px solid var(--border);border-radius:8px;background:transparent;color:var(--text);font:inherit;font-size:14px;line-height:1.5;cursor:pointer}' +
    '.sc-opt:hover:not([disabled]){border-color:var(--accent)}' +
    '.sc-opt:focus-visible{outline:2px solid var(--accent);outline-offset:2px}' +
    '.sc-opt[disabled]{cursor:default}' +
    '.sc-key{font-family:var(--mono);font-size:12px;color:var(--muted);padding-top:2px}' +
    '.sc-opt.is-right{border-color:#2e8b57;background:rgba(46,139,87,.10)}' +
    '.sc-opt.is-wrong{border-color:#c0392b;background:rgba(192,57,43,.08)}' +
    '.sc-why{margin-top:8px;font-size:14px;line-height:1.65;color:var(--text)}' +
    '.sc-why summary{cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}' +
    '.sc-why p{margin:8px 0 0}' +
    '.sc-q.is-answered .sc-why summary{display:none}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* One delegated listener: the reader builds topics after this file loads. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.sc-opt');
    if (!btn || btn.disabled) return;
    var q = btn.closest('.sc-q');
    var right = +q.getAttribute('data-answer');
    var picked = +btn.getAttribute('data-k');
    var opts = q.querySelectorAll('.sc-opt');
    for (var i = 0; i < opts.length; i++) {
      opts[i].disabled = true;
      if (i === right) opts[i].classList.add('is-right');
    }
    if (picked !== right) btn.classList.add('is-wrong');
    q.classList.add('is-answered');
    var why = q.querySelector('.sc-why');
    if (why) why.open = true;
    var topic = (q.closest('.selfcheck') || q).getAttribute('data-topic');
    if (typeof window.ppTrack === 'function') {
      window.ppTrack('selfcheck: ' + topic + ' q' + q.getAttribute('data-n') + ' ' + (picked === right ? 'right' : 'wrong'),
        'Check yourself');
    }
  });
})();
