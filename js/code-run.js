/* ── Run the code ──
   The "Run" button under a topic's code (js/topic-depth.js draws it on
   blocks with data-run="<collection>/<topic>"). Pressing it turns the code
   into an editor, adds the lines that print what the worked example quotes,
   and runs it with Python in the browser (js/py-worker.js, Pyodide).

   The imports and data each snippet needs come from run/<collection>.json,
   built by scripts/build-run.py from scripts/snippets/ — the files that
   produced the example's numbers in the first place. They run first and are
   shown under "Setup", so nothing runs that the reader cannot see. */
(function () {
  'use strict';
  var worker = null, seq = 0, active = null;   // active: the block whose code is running
  var files = {}, tracked = {};
  var state = new WeakMap();                     // code-block -> { id, r, ed, out, btn, stop }

  function getFile(col) {
    if (!files[col]) {
      files[col] = fetch('/run/' + col + '.json').then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      });
      files[col].catch(function () { delete files[col]; });
    }
    return files[col];
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function fit(ta) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 2 + 'px';
  }

  function getWorker() {
    if (!worker) {
      worker = new Worker('/js/py-worker.js?v=2');
      worker.onmessage = onMessage;
      worker.onerror = function (e) {
        if (!active) return;
        write(active, 'Python could not start: ' + (e.message || 'the worker failed to load') + '\n', 'err');
        finish(active, false);
      };
    }
    return worker;
  }

  function write(s, text, kind) {
    if (kind === 'err') {
      var span = el('span', 'run-err', text);
      s.out.appendChild(span);
    } else {
      s.out.appendChild(document.createTextNode(text));
    }
  }

  function setStatus(s, text) { s.status.textContent = text; }

  function finish(s, ok, how) {
    var secs = ((performance.now() - s.t0) / 1000).toFixed(1);
    setStatus(s, ok ? 'Ran in ' + secs + ' s' : (how || 'Stopped with an error') + ' after ' + secs + ' s');
    s.btn.disabled = false;
    s.stop.hidden = true;
    active = null;
  }

  function onMessage(e) {
    var m = e.data, s = active;
    if (!s || m.id !== s.runId) return;
    if (m.type === 'status') {
      if (m.text === 'Running…') s.t0 = performance.now();   // time the code, not the downloads
      setStatus(s, m.text);
    }
    else if (m.type === 'out' || m.type === 'err') write(s, m.text, m.type);
    else if (m.type === 'done' || m.type === 'fail') {
      if (!s.out.firstChild) write(s, '(no output — add a print() to see a value)\n');
      finish(s, m.type === 'done');
    }
  }

  function run(s) {
    if (active) return;
    active = s;
    s.out.hidden = false;
    s.out.textContent = '';
    s.btn.disabled = true;
    s.stop.hidden = false;
    s.t0 = performance.now();
    s.runId = ++seq;
    setStatus(s, worker ? 'Starting…' : 'Loading Python — the first run downloads 10–40 MB, then the browser keeps it…');
    getWorker().postMessage({ id: s.runId, pkgs: s.r.pkgs, setup: s.r.setup, code: s.ed.value, files: s.r.files || [] });
    if (!tracked[s.id] && typeof window.ppTrack === 'function') {
      tracked[s.id] = 1;
      window.ppTrack('run: ' + s.id, 'Run code');
    }
  }

  function stop(s) {
    if (worker) worker.terminate();
    worker = null;
    write(s, '\nStopped. The next run starts Python afresh.\n', 'err');
    finish(s, false, 'Stopped');
  }

  /* First press: build the editor around the block, then run. */
  function open(block, btn) {
    var id = block.getAttribute('data-run');
    var col = id.slice(0, id.lastIndexOf('/')), topic = id.slice(id.lastIndexOf('/') + 1);
    btn.disabled = true;
    btn.textContent = 'Loading…';
    getFile(col).then(function (data) {
      var r = data[topic];
      if (!r) throw new Error('no runnable code for ' + id);
      var bar = btn.parentNode;
      var s = { id: id, r: r, btn: btn };

      if (r.setup) {   // on a case page, the steps before this one
        var setup = el('details', 'run-setup');
        setup.appendChild(el('summary', null, r.files ? 'Earlier steps, run first' : 'Setup — imports and data, run first'));
        setup.appendChild(el('pre', null, r.setup));
        block.parentNode.insertBefore(setup, block);
      }
      var initial = r.show ? r.code + '\n\n' + r.show : r.code;

      var pre = block.querySelector('pre');
      var ed = el('textarea', 'run-editor');
      ed.spellcheck = false;
      ed.setAttribute('autocapitalize', 'off');
      ed.setAttribute('autocomplete', 'off');
      ed.setAttribute('aria-label', 'Python code — edit and run');
      ed.value = initial;
      pre.replaceWith(ed);
      block.classList.add('is-editing');
      fit(ed);
      ed.addEventListener('input', function () { fit(ed); });
      ed.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(s); }
      });
      s.ed = ed;

      btn.textContent = '▶ Run again';
      var stopBtn = el('button', 'run-stop', 'Stop');
      stopBtn.type = 'button';
      stopBtn.hidden = true;
      stopBtn.addEventListener('click', function () { stop(s); });
      var reset = el('button', 'run-reset', 'Reset code');
      reset.type = 'button';
      reset.addEventListener('click', function () { ed.value = initial; fit(ed); });
      var status = el('span', 'run-status');
      status.setAttribute('role', 'status');
      bar.querySelector('.run-hint').replaceWith(status);
      bar.insertBefore(stopBtn, status);
      bar.insertBefore(reset, status);
      s.stop = stopBtn;
      s.status = status;

      var out = el('pre', 'run-out');
      out.hidden = true;
      out.setAttribute('aria-label', 'Output');
      var stat = bar.nextElementSibling;   // a case page's pre-computed output gives way to the live one
      if (stat && stat.classList.contains('run-static')) stat.hidden = true;
      bar.parentNode.insertBefore(out, bar.nextSibling);
      s.out = out;

      state.set(block, s);
      btn.disabled = false;
      run(s);
    }).catch(function (err) {
      btn.disabled = false;
      btn.textContent = '▶ Run';
      var hint = btn.parentNode.querySelector('.run-hint, .run-status');
      if (hint) hint.textContent = 'Could not load the code to run (' + err.message + ').';
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.run-btn');
    if (!btn) return;
    var block = btn.parentNode.previousElementSibling;
    if (!block || !block.hasAttribute('data-run')) return;
    var s = state.get(block);
    if (s) run(s); else open(block, btn);
  });
})();
