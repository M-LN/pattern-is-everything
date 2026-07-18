# Pattern is Everything

**A visual field guide to patterns in machine learning, markets, and ideas.**

[Live site](https://patterniseverything.com) · [Start here](https://patterniseverything.com/start/) · [Support](https://patterniseverything.com/support/)

Pattern is Everything is a free educational platform for learning complex concepts through interactive visual references. The core library covers **257 topics** across machine learning and markets, each paired with a canvas-based visualization, practical explanation, formulas, and code-oriented context.

The project also includes essays, real-data mini-cases, notebook companions, sandboxes, and a public donation log for mental-health-related giving.

## At a Glance

| Metric | Count | Notes |
|---|---:|---|
| Core topics | 257 | Machine Learning + Markets topic pages, excluding collection overview pages |
| Core visualizations | 257 | One interactive visual reference per core topic |
| Universes | 4 | Machine Learning, Statistics & Data Analytics, Markets, and Pattern Essays |
| Collections | 10 | 4 ML collections, 1 Statistics & Analytics collection, 4 Markets collections, 1 Essays collection |

## Universes

### Machine Learning - 118 topics

| Collection | Topics | Covers |
|---|---:|---|
| ML Math | 38 | Linear algebra, gradients, backprop, attention, transformers, diffusion, LoRA, RLHF |
| LLM Engineering | 30 | Tokenization, transformer internals, RLHF, DPO, RAG, inference optimization |
| MLOps & Production ML | 25 | Serving, drift, feature stores, pipelines, monitoring, governance |
| Timeseries Engineering | 25 | Stationarity, ARIMA, Prophet, LSTM, transformers, anomaly detection, forecasting workflows |

### Statistics & Data Analytics - 39 topics

| Collection | Topics | Covers |
|---|---:|---|
| The Toolkit | 39 | Evaluation, feature importance, statistical foundations, data analytics, backtesting, decision support |

### Markets - 100 topics

| Collection | Topics | Covers |
|---|---:|---|
| Chart Patterns | 25 | Head and shoulders, double tops, flags, wedges, cup and handle |
| Technical Indicators | 25 | Moving averages, RSI, MACD, Bollinger Bands, Fibonacci, volatility tools |
| Market Psychology | 25 | Biases, fear and greed, herding, sentiment cycles, behavioral traps |
| Risk & Portfolio | 25 | VaR, expected shortfall, position sizing, hedging, performance attribution |

### Pattern Essays

Long-form visual essays that connect pattern thinking across machine learning, markets, language, systems, and decision-making.

## What Makes It Useful

- **Visual first** - diagrams and animations make abstract ideas easier to inspect.
- **Practical by default** - formulas, examples, pitfalls, and code-oriented notes sit beside the visuals.
- **Real-data cases** - small workflows for classification, regression, forecasting, fraud detection, and market backtesting.
- **Notebook companions** - Jupyter notebooks under `notebooks/` for executable case walkthroughs.
- **Guided learning path** - the Start Here flow helps visitors move from beginner concepts to applied workflows.
- **Sandbox areas** - focused playgrounds for ML, stats, deep learning, markets, and chaos concepts.
- **Fast static site** - the public site is plain HTML, CSS, and JavaScript with no app build step.
- **Respectful experience** - no ads, no paywalls, and privacy-friendly analytics only.

## Project Map

```text
Pattern Portal/
├── index.html                 # Homepage
├── css/main.css               # Shared design system
├── js/                        # Shared homepage and learning-path behavior
├── start/                     # Guided beginner path
├── stats/                     # Statistics & Data Analytics universe (The Toolkit)
├── ml-math/                   # ML Math collection
├── llm/                       # LLM Engineering collection
├── mlops/                     # MLOps & Production ML collection
├── timeseries/                # Timeseries Engineering collection
├── markets/                   # Market hub and market collections
│   ├── charts/
│   ├── indicators/
│   ├── psychology/
│   └── risk/
├── essays/                    # Pattern Essays universe
├── cases/                     # Real-data mini-cases and local CSV samples
├── notebooks/                 # Notebook companions
├── sandbox/                   # Interactive sandbox surfaces
├── support/                   # Giving page
├── impact/                    # Public donation log
└── vercel.json                # Deployment headers and cache rules
```

## Run Locally

Use any static file server from the repository root.

```bash
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

You can also use `npx serve .` or another static server if that is your normal workflow.

## Deployment

The site is deployed on Vercel. Pushes to `master` trigger production deployment.

```bash
git push origin master
```

## Giving

Pattern is Everything is free to use. Donations are intended to support mental health organizations. The receiving organization is confirmed before transfer, and received amounts, transfers, and kept amounts are documented in the public donation log.

## License

MIT