(function() {
  const TEMPLATES = {
    gradient: {
      pipeline: ['Choose a loss that matches the task.', 'Scale inputs and start with a conservative learning rate.', 'Track train and validation loss every epoch.', 'Stop when validation loss stops improving.', 'Save the run with optimizer, learning rate, seed, and metric.'],
      pitfall: 'Learning rate too high can diverge; too low can look like the model is broken.',
      metrics: ['Training loss', 'Validation loss', 'Gradient norm', 'Wall-clock time'],
      build: ['Open JupyterLite regression lab', '../lite/lab/?path=pattern-portal-real-data-lab.ipynb']
    },
    'bias-variance': {
      pipeline: ['Fit a simple baseline.', 'Compare train vs validation error.', 'Increase capacity only if both errors are high.', 'Regularize or simplify if validation lags behind training.', 'Confirm with cross-validation before using the test set.'],
      pitfall: 'A single split can make variance look smaller than it is.',
      metrics: ['Train error', 'Validation error', 'Cross-validation spread', 'Learning curve slope'],
      build: ['Open housing case', '../cases/index.html#housing-regression']
    },
    regularization: {
      pipeline: ['Start from an unregularized baseline.', 'Tune L2 or weight decay on validation data.', 'Use L1 when sparse features matter.', 'Re-check calibration and important features.', 'Freeze settings before final test evaluation.'],
      pitfall: 'Regularization cannot fix bad labels, leakage, or an underfit baseline.',
      metrics: ['Validation gap', 'Coefficient size', 'Calibration error', 'Final holdout metric'],
      build: ['Open housing case', '../cases/index.html#housing-regression']
    },
    'cross-validation': {
      pipeline: ['Define the target and leakage boundaries.', 'Build preprocessing inside the pipeline.', 'Choose folds that match the data process.', 'Tune on validation folds only.', 'Keep one final holdout untouched.'],
      pitfall: 'Preprocessing before the split leaks information into every fold.',
      metrics: ['Mean score', 'Fold spread', 'Worst fold', 'Holdout score'],
      build: ['Open cases', '../cases/index.html']
    },
    'shap-values': {
      pipeline: ['Train and validate the model first.', 'Choose a background sample that represents production data.', 'Explain validation examples, not just training rows.', 'Compare global and local explanations.', 'Check explanations against known leakage features.'],
      pitfall: 'SHAP explains model behavior, not causality in the real world.',
      metrics: ['Model score first', 'Feature attribution stability', 'Background sample sensitivity', 'Error-slice explanations'],
      build: ['Open housing case', '../cases/index.html#housing-regression']
    },
    'data-drift': {
      pipeline: ['Save reference feature distributions from training data.', 'Compute PSI/KS on new batches.', 'Prioritize drift on important features.', 'Compare drift alerts against model performance.', 'Retrain only when drift affects decisions.'],
      pitfall: 'Feature drift is not automatically model failure.',
      metrics: ['PSI', 'KS statistic', 'Metric decay', 'Alert precision'],
      build: ['Open JupyterLite drift lab', '../lite/lab/?path=pattern-portal-real-data-lab.ipynb']
    },
    'cross-validation-ts': {
      pipeline: ['Sort by timestamp.', 'Create lag features using past values only.', 'Use expanding or sliding windows.', 'Add a purge gap when labels overlap.', 'Report metrics by forecast horizon.'],
      pitfall: 'Random folds usually leak future information.',
      metrics: ['MAE by horizon', 'Naive baseline lift', 'Window stability', 'Worst-period error'],
      build: ['Open energy case', '../cases/index.html#energy-forecast']
    },
    rsi: {
      pipeline: ['Define the rule before looking at results.', 'Shift signals by one bar.', 'Include transaction costs.', 'Walk forward across regimes.', 'Compare against buy-and-hold and cash.'],
      pitfall: 'The RSI formula is mathematical; the trading edge is heuristic until validated out of sample.',
      metrics: ['Sharpe', 'Max drawdown', 'Turnover', 'Cost sensitivity'],
      build: ['Open market case', '../../cases/index.html#market-backtest'],
      market: true
    },
    macd: {
      pipeline: ['Compute fast/slow EMAs with past prices only.', 'Define crossover and exit rules.', 'Shift positions to avoid look-ahead.', 'Backtest with costs and slippage.', 'Stress-test across market regimes.'],
      pitfall: 'MACD is a lagging signal and can churn in sideways markets.',
      metrics: ['Sharpe', 'Drawdown', 'Hit rate', 'Regime split'],
      build: ['Open market lab', '../../sandbox/markets/index.html#indicator-playground'],
      market: true
    },
    'bollinger-bands': {
      pipeline: ['Compute rolling mean and volatility with past values.', 'Choose mean-reversion or breakout logic explicitly.', 'Shift signals before returns.', 'Test cost sensitivity.', 'Review tail losses during volatility shocks.'],
      pitfall: 'Bands show relative volatility, not guaranteed reversal levels.',
      metrics: ['Return distribution', 'Max drawdown', 'Tail loss', 'Turnover'],
      build: ['Open market case', '../../cases/index.html#market-backtest'],
      market: true
    },
    'head-and-shoulders': {
      pipeline: ['Define the pattern rules quantitatively.', 'Avoid selecting examples after the fact.', 'Measure breakout confirmation and invalidation.', 'Backtest with costs and failed-pattern cases.', 'Compare against a simple trend baseline.'],
      pitfall: 'Visual chart patterns are heuristic and highly sensitive to subjective labeling.',
      metrics: ['Base rate', 'False breakout rate', 'Average return after signal', 'Drawdown'],
      build: ['Open markets lab', '../../sandbox/markets/index.html#candlestick-patterns'],
      market: true
    }
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  }

  function relativeHref(href) {
    const path = location.pathname.replace(/\\/g, '/');
    if (path.includes('/markets/') && href.startsWith('../') && !href.startsWith('../../')) return `../${href}`;
    return href;
  }

  function buildTemplate(id, config) {
    return `
      <section class="practical-template" data-practical-template="${escapeHTML(id)}">
        <div class="practical-template-head">
          <div>
            <div class="practical-kicker">Practical Template</div>
            <div class="practical-title">Use this pattern in a real workflow</div>
          </div>
          <span class="evidence-badge ${config.market ? 'heuristic' : 'statistical'}">${config.market ? 'Heuristic' : 'Statistical'}</span>
        </div>
        <div class="practical-grid">
          <div><div class="practical-label">Pipeline</div><ol>${config.pipeline.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ol></div>
          <div><div class="practical-label">Failure mode</div><p>${escapeHTML(config.pitfall)}</p><div class="practical-label">Metrics</div><ul>${config.metrics.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
        </div>
        <a class="practical-build" href="${relativeHref(config.build[1])}">${escapeHTML(config.build[0])}</a>
      </section>`;
  }

  function inject() {
    Object.entries(TEMPLATES).forEach(([id, config]) => {
      const topic = document.getElementById(id);
      if (!topic || topic.querySelector('.practical-template')) return;
      const anchor = topic.querySelector('.topic-nav') || topic.lastElementChild;
      if (!anchor) return;
      anchor.insertAdjacentHTML('beforebegin', buildTemplate(id, config));
    });
    if (window.EVIDENCE_TAXONOMY) setTimeout(() => window.dispatchEvent(new Event('pattern:practical-template')), 0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(inject, 120));
  else setTimeout(inject, 120);
  window.addEventListener('load', () => setTimeout(inject, 300));
  window.addEventListener('hashchange', () => setTimeout(inject, 120));
})();
