# Pattern is Everything

**An interactive visual encyclopedia of patterns — in math and markets.**

249 topics across 2 universes, each with interactive canvas visualizations, formulas, code examples, and deep explanations. The site now also includes practical real-data mini-cases that connect topics to datasets, metrics, pitfalls, and notebook-ready workflows. Zero dependencies. Pure vanilla HTML, CSS, and JavaScript.

🔗 **Live:** [patterniseverything.com](https://patterniseverything.com)

---

## Universes

### 🧠 Machine Learning — 149 topics
| Collection | Topics | Covers |
|---|---|---|
| **ML Math** | 38 | Linear algebra, gradient descent, backprop, attention, transformers, diffusion, LoRA, RLHF |
| **The Toolkit** | 31 | Model evaluation, feature importance, data analysis, backtesting, decision-making, Python tools |
| **LLM Engineering** | 30 | Tokenization, transformer internals, RLHF, DPO, RAG, inference optimization |
| **MLOps & Production ML** | 25 | Model serving, drift detection, ML pipelines, feature stores, governance |
| **Timeseries Engineering** | 25 | Stationarity, ARIMA, SARIMA, Prophet, LSTM, Transformers, anomaly detection, backtesting |

### 📈 Markets — 100 topics
| Collection | Topics | Covers |
|---|---|---|
| **Chart Patterns** | 25 | Head & shoulders, double tops, flags, wedges, cup & handle |
| **Technical Indicators** | 25 | Moving averages, RSI, MACD, Bollinger Bands, Fibonacci |
| **Market Psychology** | 25 | Cognitive biases, fear & greed, herd behavior, sentiment cycles |
| **Risk & Portfolio** | 25 | VaR, expected shortfall, position sizing, hedging, performance attribution |

---

## Features

- **Interactive visualizations** — every topic has a canvas-drawn diagram or animation
- **Real-data cases** — mini workflows for classification, regression, forecasting, and market backtesting
- **Local sample datasets** — tiny CSV files under `cases/datasets/` for quick offline pipeline practice
- **Start Here path** — guided beginner → build → advanced progression through the site
- **Notebook-ready snippets** — practical copy blocks with minimal Python dependencies where relevant
- **Notebook companion** — `notebooks/pattern-portal-real-data-lab.ipynb` for executable Python case workflows
- **Keyboard navigation** — `←` `→` arrow keys between topics, `Ctrl+K` to search
- **Dark / light mode** — respects system preference, persists via localStorage
- **Progress tracking** — tracks how many topics you've viewed per collection
- **Deep linking** — every topic has a hash URL you can share
- **Responsive** — works on mobile, tablet, and desktop
- **Zero dependencies** — no frameworks, no build step, no npm

## Tech Stack

```
HTML + CSS + JavaScript
├── css/main.css          → Design system with CSS custom properties
├── */index.html          → Shell pages with inline runtime
├── */topics.js           → Topic data, builders, search index
└── */visualizations.js   → Canvas drawing functions (DRAWS object)
```

**Fonts:** Playfair Display · IBM Plex Mono · Inter  
**Colors:** Rust `#c84b2f` · Green `#2a7d5f` · Blue `#2955a0` · Purple `#8b4fa8`

## Project Structure

```
Pattern Portal/
├── index.html                  ← Homepage (2 universe cards)
├── css/main.css                ← Global design system
├── cases/                      ← Real-data mini-cases and notebook starters
│   └── datasets/               ← Small local CSV samples for case workflows
├── start/                      ← Guided Start Here learning path
├── notebooks/                  ← Jupyter notebook companions for cases
├── ml/index.html               ← ML hub
│   ├── ml-math/                ← 38 topics
│   ├── stats/                  ← 31 topics
│   ├── llm/                    ← 30 topics
│   ├── mlops/                  ← 25 topics
│   └── timeseries/             ← 25 topics
├── markets/index.html          ← Markets hub
│   ├── charts/                 ← 25 topics
│   ├── indicators/             ← 25 topics
│   ├── psychology/             ← 25 topics
│   └── risk/                   ← 25 topics
└── vercel.json                 ← Deployment config
```

## Run Locally

No install needed. Just serve the files:

```bash
npx serve .
```

Or open `index.html` directly in a browser.

## Deploy

Connected to Vercel — pushes to `master` auto-deploy.

```bash
# Manual deploy
vercel --prod
```

## License

MIT
