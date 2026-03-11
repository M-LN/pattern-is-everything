# Pattern is Everything

**An interactive visual encyclopedia of patterns — in math, verse, and markets.**

252 topics across 3 universes, each with interactive canvas visualizations, formulas, code examples, and deep explanations. Zero dependencies. Pure vanilla HTML, CSS, and JavaScript.

🔗 **Live:** [pattern-is-everything-iota.vercel.app](https://pattern-is-everything-iota.vercel.app)

---

## Universes

### 🧠 Machine Learning — 102 topics
| Collection | Topics | Covers |
|---|---|---|
| **ML Math** | 38 | Linear algebra, gradient descent, backprop, attention, transformers, diffusion, LoRA, RLHF |
| **Statistics & Probability** | 34 | Distributions, hypothesis testing, Bayesian methods, A/B testing, bootstrap |
| **LLM Engineering** | 30 | Tokenization, transformer internals, RLHF, DPO, RAG, inference optimization |

### ✒️ Poetry — 75 topics
| Collection | Topics | Covers |
|---|---|---|
| **Poetic Forms** | 25 | Sonnet, villanelle, ghazal, haiku, free verse, prose poetry |
| **Sound & Meter** | 25 | Iambic pentameter, caesura, alliteration, assonance, rhyme schemes |
| **Rhetoric & Figures** | 25 | Metaphor, anaphora, chiasmus, synecdoche, paradox |

### 📈 Markets — 75 topics
| Collection | Topics | Covers |
|---|---|---|
| **Chart Patterns** | 25 | Head & shoulders, double tops, flags, wedges, cup & handle |
| **Technical Indicators** | 25 | Moving averages, RSI, MACD, Bollinger Bands, Fibonacci |
| **Market Psychology** | 25 | Cognitive biases, fear & greed, herd behavior, sentiment cycles |

---

## Features

- **Interactive visualizations** — every topic has a canvas-drawn diagram or animation
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
├── index.html                  ← Homepage (3 universe cards)
├── css/main.css                ← Global design system
├── ml/index.html               ← ML hub
│   ├── ml-math/                ← 38 topics
│   ├── stats/                  ← 34 topics
│   └── llm/                    ← 30 topics
├── poetry/index.html           ← Poetry hub
│   ├── forms/                  ← 25 topics
│   ├── sound/                  ← 25 topics
│   └── rhetoric/               ← 25 topics
├── markets/index.html          ← Markets hub
│   ├── charts/                 ← 25 topics
│   ├── indicators/             ← 25 topics
│   └── psychology/             ← 25 topics
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
