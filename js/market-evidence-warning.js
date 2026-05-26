(function() {
  function isMarketPage() {
    return location.pathname.replace(/\\/g, '/').includes('/markets/');
  }

  function createPanel() {
    const panel = document.createElement('section');
    panel.className = 'market-evidence-panel';
    panel.innerHTML = `
      <div class="market-evidence-copy">
        <div class="market-evidence-kicker">Evidence Check</div>
        <div class="market-evidence-title">Market patterns are hypotheses, not guarantees</div>
        <p>Risk and portfolio math can be statistical. Chart patterns, indicators, and psychology signals are usually heuristic or debated until validated with out-of-sample data, costs, slippage, and regime checks.</p>
      </div>
      <div class="market-evidence-legend" aria-label="Evidence label legend">
        <span class="evidence-badge statistical">Statistical</span>
        <span class="evidence-badge heuristic">Heuristic</span>
        <span class="evidence-badge debated">Debated</span>
      </div>`;
    return panel;
  }

  function inject() {
    if (!isMarketPage() || document.querySelector('.market-evidence-panel')) return;
    const portalContent = document.querySelector('.portal-content');
    const layout = document.querySelector('.layout');
    const panel = createPanel();
    if (portalContent) portalContent.insertAdjacentElement('beforebegin', panel);
    else if (layout) layout.insertAdjacentElement('beforebegin', panel);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
  window.addEventListener('load', () => setTimeout(inject, 150));
})();
