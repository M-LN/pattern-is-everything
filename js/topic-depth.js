/* ── Topic depth ──
   The content standard's sections under a topic's explanation: a worked
   example (with the data it was worked on), where the idea misleads, the
   code that computes it, and sources. Each collection's topics.js holds its
   own TOPIC_DEPTH entries and calls renderDepth from buildContent; this file
   only lays them out, so every collection reads the same.

   renderDepth({ id, example, dataHtml, fails: [], code, codeNote, sources: [], run })
   returns HTML, or '' for a topic with no entry. The strings are trusted
   markup written in the repo, not user input. With run ("<collection>/<topic>",
   a key into run/*.json) the code gets a Run button; js/code-run.js runs it. */
(function () {
  'use strict';
  /* When a topic was last checked against its sources (see /about/): the
     reviewed date on its TOPIC_DATA entry, shown as month and year. Each topic
     carries its own, so re-reviewing one topic dates only that topic;
     node scripts/reviews.mjs lists the ones due. */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
  window.reviewedOn = function (id) {
    var t = typeof TOPIC_DATA !== 'undefined' && TOPIC_DATA.find(function (x) { return x.id === id; });
    var m = t && /^(\d{4})-(\d{2})-\d{2}$/.exec(t.reviewed || '');
    return m ? MONTHS[+m[2] - 1] + ' ' + m[1] : '';
  };

  /* "Report a mistake": a GitHub issue form (.github/ISSUE_TEMPLATE/correction.yml)
     with the topic's own page filled in. The page URL is built from the
     collection the topic is rendered in, so the pre-rendered pages carry the
     same link. scripts/build-guides.mjs and build-cases.py build the same URL. */
  var ISSUE_FORM = 'https://github.com/M-LN/pattern-is-everything/issues/new?template=correction.yml';
  window.reportLink = function (id) {
    var t = typeof TOPIC_DATA !== 'undefined' && TOPIC_DATA.find(function (x) { return x.id === id; });
    var page = 'https://patterniseverything.com' + location.pathname.replace(/index\.html$/, '') + id + '/';
    return '<a href="' + ISSUE_FORM + '&amp;title=' + encodeURIComponent('Correction: ' + (t ? t.title : id)) +
      '&amp;page=' + encodeURIComponent(page) + '" target="_blank" rel="noopener">Report a mistake</a>';
  };

  window.renderDepth = function (d) {
    if (!d) return '';
    var list = function (items) {
      return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    };
    return '<section class="depth">' +
      '<div class="depth-block"><div class="depth-title">Worked example</div><p>' + d.example + '</p>' + (d.dataHtml || '') + '</div>' +
      '<div class="depth-block"><div class="depth-title">Where it misleads</div>' + list(d.fails) + '</div>' +
      '<div class="depth-block"><div class="depth-title">In code</div>' +
        '<div class="code-block" tabindex="0"' + (d.run ? ' data-run="' + d.run + '"' : '') + '><pre>' + d.code + '</pre></div>' +
        (d.run ? '<div class="run-bar"><button type="button" class="run-btn">▶ Run</button>' +
          '<span class="run-hint">Python, in your browser — edit the code and run it again</span></div>' : '') +
        (d.codeNote ? '<p class="depth-note">' + d.codeNote + '</p>' : '') + '</div>' +
      '<div class="depth-block depth-sources"><div class="depth-title">Sources</div>' + list(d.sources) +
        (reviewedOn(d.id) ? '<p class="depth-note depth-reviewed">Last reviewed ' + reviewedOn(d.id) +
          ' · <a href="/about/#checked">How this site checks its content</a> · ' + reportLink(d.id) + '</p>' : '') + '</div>' +
    '</section>';
  };

  /* One code section per topic. Many topics also show a library example in
     their body (scikit-learn, statsmodels…), written before the depth
     sections existed. foldLibraryCode moves it under "In code", folded,
     after the runnable snippet. collection-reader.js calls it once the
     topics are built, so the pre-rendered pages carry the same layout. */
  window.foldLibraryCode = function (root) {
    var depths = (root || document).querySelectorAll('.depth');
    for (var i = 0; i < depths.length; i++) {
      var depth = depths[i];
      var topic = depth.closest('.topic') || depth.parentNode;
      var run = depth.querySelector('.code-block[data-run]');
      if (!topic || !run) continue;
      var olds = [], all = topic.querySelectorAll('.code-block');
      for (var k = 0; k < all.length; k++) if (!depth.contains(all[k])) olds.push(all[k]);
      if (!olds.length) continue;
      var det = document.createElement('details');
      det.className = 'code-alt';
      det.innerHTML = '<summary>The same idea with a library</summary>';
      for (var j = 0; j < olds.length; j++) det.appendChild(olds[j]);
      run.closest('.depth-block').appendChild(det);
    }
  };
})();
