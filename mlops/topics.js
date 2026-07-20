/* ═══════════════════════════════════════════════════════════════
   MLOps & Production ML — Topics Data & Content Builder
   25 practical topics for deploying, monitoring & governing ML
   ═══════════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id:'sec-serve',     title:'Deploy & Serve',           topics:['home','model-packaging','serving-patterns','ab-rollout','latency-throughput','gpu-inference'] },
  { id:'sec-monitor',   title:'Monitor & Observe',        topics:['drift-detection','model-monitoring','alerting-slos','shadow-scoring','data-quality'] },
  { id:'sec-pipeline',  title:'Pipeline & Automation',    topics:['ml-pipelines','feature-stores','experiment-tracking','ci-cd-ml','orchestration'] },
  { id:'sec-scale',     title:'Scale & Optimize',         topics:['model-compression','quantization','caching-layers','auto-scaling','cost-governance'] },
  { id:'sec-govern',    title:'Governance & Trust',       topics:['model-registry','lineage-tracking','fairness-audits','reproducibility','incident-response'] },
];

const TOPICS = SECTIONS.flatMap(s => s.topics);

const TOPIC_NAMES = {
  home:'Overview',
  'model-packaging':'Model Packaging & Containers',
  'serving-patterns':'Serving Patterns',
  'ab-rollout':'A/B & Canary Rollouts',
  'latency-throughput':'Latency & Throughput',
  'gpu-inference':'GPU Inference',
  'drift-detection':'Drift Detection in Production',
  'model-monitoring':'Model Monitoring Dashboards',
  'alerting-slos':'Alerting & SLOs',
  'shadow-scoring':'Shadow Mode & Champion/Challenger',
  'data-quality':'Data Quality Gates',
  'ml-pipelines':'ML Pipelines',
  'feature-stores':'Feature Stores',
  'experiment-tracking':'Experiment Tracking',
  'ci-cd-ml':'CI/CD for ML',
  'orchestration':'Orchestration & Scheduling',
  'model-compression':'Model Compression',
  'quantization':'Quantization',
  'caching-layers':'Caching & Prediction Stores',
  'auto-scaling':'Auto-Scaling Endpoints',
  'cost-governance':'Cost Governance',
  'model-registry':'Model Registry & Versioning',
  'lineage-tracking':'Lineage Tracking',
  'fairness-audits':'Fairness Audits',
  'reproducibility':'Reproducibility',
  'incident-response':'Incident Response for ML',
};

/* ── Full topic data for search ── */
const TOPIC_DATA = [
  { id:'model-packaging', num:'01', title:'Model Packaging & Containers', category:'Deploy & Serve', keywords:['docker','container','ONNX','pickle','MLflow','BentoML','artifact','image','export','serialization'], content:'Exporting models into portable, versioned artifacts — Docker images, ONNX, MLflow format, and reproducible environments.' },
  { id:'serving-patterns', num:'02', title:'Serving Patterns', category:'Deploy & Serve', keywords:['REST','gRPC','batch','streaming','online','offline','microservice','endpoint','inference server','real-time'], content:'Real-time vs batch vs streaming inference — choosing the right serving pattern for your latency and throughput needs.' },
  { id:'ab-rollout', num:'03', title:'A/B & Canary Rollouts', category:'Deploy & Serve', keywords:['canary','blue-green','traffic split','rollback','gradual','deployment strategy','feature flag','progressive'], content:'Ship models safely with canary deploys, blue-green switches, and traffic-split A/B tests with automatic rollback.' },
  { id:'latency-throughput', num:'04', title:'Latency & Throughput', category:'Deploy & Serve', keywords:['p50','p99','requests per second','batching','async','queue','SLA','response time','concurrency','benchmark'], content:'Understanding p50/p99 latency, dynamic batching, request queuing, and the tradeoffs that define serving SLAs.' },
  { id:'gpu-inference', num:'05', title:'GPU Inference', category:'Deploy & Serve', keywords:['GPU','TensorRT','CUDA','Triton','multi-model','memory','VRAM','scheduling','mixed precision','accelerator'], content:'GPU memory management, TensorRT optimization, Triton Inference Server, and when CPU is actually enough.' },
  { id:'drift-detection', num:'06', title:'Drift Detection in Production', category:'Monitor & Observe', keywords:['PSI','KS test','data drift','concept drift','covariate shift','Evidently','NannyML','population stability','distribution shift'], content:'Detecting when input distributions or model-target relationships shift — PSI, KS test, and continuous monitoring.' },
  { id:'model-monitoring', num:'07', title:'Model Monitoring Dashboards', category:'Monitor & Observe', keywords:['Grafana','Prometheus','metrics','accuracy decay','feature distributions','prediction distribution','dashboard','alert'], content:'Building dashboards that track prediction distributions, feature drift, accuracy decay, and system health in one view.' },
  { id:'alerting-slos', num:'08', title:'Alerting & SLOs', category:'Monitor & Observe', keywords:['SLO','SLA','SLI','error budget','latency budget','alert fatigue','threshold','pager','on-call','reliability'], content:'Defining service-level objectives for ML systems — latency SLOs, accuracy SLOs, error budgets, and alert fatigue.' },
  { id:'shadow-scoring', num:'09', title:'Shadow Mode & Champion/Challenger', category:'Monitor & Observe', keywords:['shadow','champion','challenger','dark launch','comparison','offline evaluation','production validation','parallel scoring'], content:'Running new models alongside production without serving predictions — validating before you switch.' },
  { id:'data-quality', num:'10', title:'Data Quality Gates', category:'Monitor & Observe', keywords:['Great Expectations','schema','validation','missing values','type check','freshness','completeness','data contract','anomaly'], content:'Automated checks that prevent bad data from reaching your model — schema validation, freshness, completeness, and anomaly detection.' },
  { id:'ml-pipelines', num:'11', title:'ML Pipelines', category:'Pipeline & Automation', keywords:['DAG','pipeline','Kubeflow','Airflow','Vertex','SageMaker','step','orchestrate','workflow','retraining'], content:'Composing training, validation, and deployment into reproducible DAGs — Kubeflow, Airflow, Vertex, and SageMaker Pipelines.' },
  { id:'feature-stores', num:'12', title:'Feature Stores', category:'Pipeline & Automation', keywords:['Feast','Tecton','feature engineering','online store','offline store','point-in-time','feature serving','materialization','entity'], content:'Centralized feature management — offline/online stores, point-in-time correctness, and feature sharing across teams.' },
  { id:'experiment-tracking', num:'13', title:'Experiment Tracking', category:'Pipeline & Automation', keywords:['MLflow','Weights & Biases','Neptune','experiment','run','metric','hyperparameter','comparison','artifact','log'], content:'Logging every run — hyperparameters, metrics, artifacts, and comparisons that make experiments reproducible.' },
  { id:'ci-cd-ml', num:'14', title:'CI/CD for ML', category:'Pipeline & Automation', keywords:['continuous integration','continuous deployment','GitHub Actions','testing','model validation','data validation','pipeline trigger','automation'], content:'Extending CI/CD to ML — automated testing of data, model quality gates, and deployment triggers on metric thresholds.' },
  { id:'orchestration', num:'15', title:'Orchestration & Scheduling', category:'Pipeline & Automation', keywords:['Airflow','Prefect','Dagster','cron','scheduler','dependency','retry','backfill','trigger','DAG'], content:'Scheduling retraining, feature computation, and monitoring jobs — DAG design, retries, backfills, and trigger strategies.' },
  { id:'model-compression', num:'16', title:'Model Compression', category:'Scale & Optimize', keywords:['pruning','distillation','knowledge distillation','teacher-student','sparse','structured pruning','lottery ticket','smaller model'], content:'Making models smaller — pruning, knowledge distillation, and the lottery ticket hypothesis for deployable efficiency.' },
  { id:'quantization', num:'17', title:'Quantization', category:'Scale & Optimize', keywords:['INT8','FP16','mixed precision','post-training quantization','quantization-aware training','ONNX Runtime','TensorRT','dynamic quantization'], content:'Reducing precision from FP32 to INT8/FP16 — post-training vs quantization-aware training and the accuracy-speed tradeoff.' },
  { id:'caching-layers', num:'18', title:'Caching & Prediction Stores', category:'Scale & Optimize', keywords:['Redis','cache','prediction store','precompute','lookup','hash','TTL','invalidation','memoization','near-line'], content:'Caching repeated predictions, precomputing for known inputs, and TTL strategies that balance freshness with speed.' },
  { id:'auto-scaling', num:'19', title:'Auto-Scaling Endpoints', category:'Scale & Optimize', keywords:['horizontal scaling','Kubernetes HPA','scale-to-zero','cold start','replica','load balancer','burst','traffic spike','serverless'], content:'Scaling inference endpoints with demand — HPA, scale-to-zero, cold start mitigation, and cost-aware autoscaling.' },
  { id:'cost-governance', num:'20', title:'Cost Governance', category:'Scale & Optimize', keywords:['cloud cost','GPU cost','spot instances','reserved','budget','FinOps','cost per prediction','resource allocation','waste'], content:'Tracking cost per prediction, GPU utilization, spot vs reserved tradeoffs, and FinOps practices for ML workloads.' },
  { id:'model-registry', num:'21', title:'Model Registry & Versioning', category:'Governance & Trust', keywords:['MLflow registry','model version','staging','production','archive','approval','metadata','catalog','promote'], content:'Central catalog of model versions with staging, production, and archive states — approval workflows and metadata.' },
  { id:'lineage-tracking', num:'22', title:'Lineage Tracking', category:'Governance & Trust', keywords:['data lineage','model lineage','provenance','upstream','downstream','dependency','audit trail','traceability','metadata'], content:'Tracing every prediction back to its training data, features, code, and hyperparameters — full audit trail.' },
  { id:'fairness-audits', num:'23', title:'Fairness Audits', category:'Governance & Trust', keywords:['bias','fairness','disparate impact','equalized odds','demographic parity','Aequitas','Fairlearn','protected attribute','audit'], content:'Testing models for bias across protected groups — disparate impact, equalized odds, and structured audit frameworks.' },
  { id:'reproducibility', num:'24', title:'Reproducibility', category:'Governance & Trust', keywords:['seed','deterministic','environment','DVC','version','pin','lockfile','container','snapshot','replicate'], content:'Ensuring any result can be reproduced — pinned dependencies, seeds, DVC, containerized environments, and data snapshots.' },
  { id:'incident-response', num:'25', title:'Incident Response for ML', category:'Governance & Trust', keywords:['rollback','postmortem','runbook','degradation','fallback','circuit breaker','graceful degradation','on-call','triage'], content:'When models fail in production — rollback procedures, fallback strategies, circuit breakers, and postmortem templates.' },
];

/* ═══════════════════════════════════════════════════════════════
   NAV BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const progressHTML = nav.innerHTML;
  let html = progressHTML;
  let num = 0;
  SECTIONS.forEach(sec => {
    html += `<div class="nav-section open" id="${sec.id}">
      <div class="nav-section-header" onclick="toggleSection('${sec.id}')">
        <span class="nav-section-title">${sec.title}</span>
        <span class="nav-section-arrow">\u25be</span>
      </div><div class="nav-items">`;
    sec.topics.forEach(tid => {
      if (tid === 'home') {
        html += `<div class="ni" data-topic="home" onclick="show('home')"><span class="ni-num">\u25c9</span>Overview</div>`;
      } else {
        num++;
        const n = String(num).padStart(2,'0');
        html += `<div class="ni" data-topic="${tid}" onclick="show('${tid}',true)"><span class="ni-num">${n}</span>${TOPIC_NAMES[tid]}</div>`;
      }
    });
    html += '</div></div>';
  });
  nav.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT BUILDER
   ═══════════════════════════════════════════════════════════════ */
function buildContent() {
  const main = document.getElementById('mainContent');
  if (!main) return;
  main.innerHTML = buildHome()
    + buildModelPackaging() + buildServingPatterns() + buildABRollout()
    + buildLatencyThroughput() + buildGPUInference()
    + buildDriftDetection() + buildModelMonitoring() + buildAlertingSLOs()
    + buildShadowScoring() + buildDataQuality()
    + buildMLPipelines() + buildFeatureStores() + buildExperimentTracking()
    + buildCICDML() + buildOrchestration()
    + buildModelCompression() + buildQuantization() + buildCachingLayers()
    + buildAutoScaling() + buildCostGovernance()
    + buildModelRegistry() + buildLineageTracking() + buildFairnessAudits()
    + buildReproducibility() + buildIncidentResponse();
}

/* ═══════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════ */
function buildHome() {
  return `<div class="home active" id="home">
  <div class="home-hero">
    <h2>MLOps &amp; <em>Production ML</em></h2>
    <p style="margin-top:14px">A practical reference covering 25 topics &mdash; from model packaging
    and serving patterns to monitoring, pipelines, and governance. What happens after you train the model.</p>
    <div class="home-stats">
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Topics</div></div>
      <div class="home-stat"><div class="home-stat-num">25</div><div class="home-stat-label">Visualizations</div></div>
      <div class="home-stat"><div class="home-stat-num">5</div><div class="home-stat-label">Sections</div></div>
    </div>
    <p style="margin-top:10px;font-size:11px;color:var(--muted)">
      <span class="kbd">&larr;</span> <span class="kbd">&rarr;</span> arrow keys to navigate &nbsp;&middot;&nbsp;
      <span class="kbd">Ctrl+K</span> to search
    </p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" onclick="showSection('sec-serve','model-packaging')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="4.5" rx="1"/><rect x="5" y="10" width="14" height="4.5" rx="1"/><rect x="5" y="16" width="14" height="4.5" rx="1"/></svg></div>
      <div class="cat-card-name">Deploy &amp; Serve</div>
      <div class="cat-card-count">5 topics &middot; Packaging, serving patterns, rollouts, latency, GPU</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-monitor','drift-detection')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/></svg></div>
      <div class="cat-card-name">Monitor &amp; Observe</div>
      <div class="cat-card-count">5 topics &middot; Drift, dashboards, SLOs, shadow mode, data quality</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-pipeline','ml-pipelines')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20M6.4 6.4l1.8 1.8M15.8 15.8l1.8 1.8M17.6 6.4l-1.8 1.8M8.2 15.8l-1.8 1.8"/></svg></div>
      <div class="cat-card-name">Pipeline &amp; Automation</div>
      <div class="cat-card-count">5 topics &middot; Pipelines, feature stores, tracking, CI/CD</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-scale','model-compression')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 18 9 12.5 13 15 20 6.5"/></svg></div>
      <div class="cat-card-name">Scale &amp; Optimize</div>
      <div class="cat-card-count">5 topics &middot; Compression, quantization, caching, auto-scaling</div>
    </div>
    <div class="cat-card" onclick="showSection('sec-govern','model-registry')">
      <div class="cat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z"/></svg></div>
      <div class="cat-card-name">Governance &amp; Trust</div>
      <div class="cat-card-count">5 topics &middot; Registry, lineage, fairness, reproducibility</div>
    </div>
  </div>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   TOPIC BUILDERS — one function per topic
   ═══════════════════════════════════════════════════════════════ */

/* 01 — Model Packaging & Containers */
function buildModelPackaging() {
  return `<div class="topic" id="model-packaging">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">01 — Deploy & Serve</div><h2>Model Packaging &amp; <em>Containers</em></h2></div>
    <span class="topic-badge">Deployment</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Exporting models into portable, versioned artifacts</p>
  <p class="prose">A trained model sitting in a notebook is not production-ready. <strong>Model packaging</strong> wraps your model, its dependencies, and inference code into a self-contained artifact — a Docker image, an ONNX file, or an MLflow model directory — that can be deployed anywhere identically.</p>
  <div class="fb"><div class="fm">Artifact = Model + Dependencies + Inference Code + Config</div><div class="fd"><span>Packaging</span> ensures every deployment gets the exact same model, libraries, and preprocessing — no "works on my machine" surprises.</div></div>
  <div class="va">
    <div class="vl">// Interactive — packaging pipeline flow</div>
    <canvas id="packCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Format</th><th>Pros</th><th>Best for</th></tr></thead>
    <tbody>
      <tr><td>Docker Image</td><td>Full environment isolation</td><td>Microservice deployments</td></tr>
      <tr><td>ONNX</td><td>Framework-agnostic, optimized runtime</td><td>Cross-platform inference</td></tr>
      <tr><td>MLflow Model</td><td>Versioned, metadata-rich</td><td>MLflow ecosystem</td></tr>
      <tr><td>BentoML Bundle</td><td>Built-in API server</td><td>Quick API endpoints</td></tr>
      <tr><td>Pickle / Joblib</td><td>Simple, native Python</td><td>Prototyping only</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — export model as ONNX + Docker</span>
<span class="kw">import</span> onnx, torch

<span class="cm"># Export PyTorch model to ONNX</span>
dummy = torch.randn(<span class="st">1</span>, <span class="st">10</span>)
torch.onnx.export(model, dummy, <span class="st">"model.onnx"</span>,
                  input_names=[<span class="st">"features"</span>],
                  output_names=[<span class="st">"prediction"</span>])

<span class="cm"># Dockerfile</span>
<span class="cm"># FROM python:3.11-slim</span>
<span class="cm"># COPY model.onnx requirements.txt serve.py .</span>
<span class="cm"># RUN pip install -r requirements.txt</span>
<span class="cm"># CMD ["python", "serve.py"]</span></pre></div>
  <div class="callout info"><strong>Avoid pickle in production:</strong> Pickle files are Python-version-specific, not human-readable, and pose security risks (arbitrary code execution). Use ONNX or framework-native formats for anything beyond prototypes.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model packaging is the deployment equivalent of <a href="../stats/#cross-validation" target="_blank" rel="noopener">cross-validation</a> — both enforce separation between what you build and where you test it. In markets, <a href="../markets/indicators/#backtesting-rules" target="_blank" rel="noopener">backtesting discipline</a> enforces the same boundary.</div>
  <div class="topic-nav" id="nav-model-packaging"></div>
</div>`;
}

/* 02 — Serving Patterns */
function buildServingPatterns() {
  return `<div class="topic" id="serving-patterns">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">02 — Deploy & Serve</div><h2>Serving <em>Patterns</em></h2></div>
    <span class="topic-badge">Architecture</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Real-time vs batch vs streaming — choosing your inference architecture</p>
  <p class="prose">How you serve predictions matters as much as model accuracy. <strong>Online serving</strong> returns predictions in milliseconds via API calls. <strong>Batch serving</strong> scores entire datasets on a schedule. <strong>Streaming</strong> processes events as they arrive. Each pattern has different latency, cost, and complexity profiles.</p>
  <div class="va">
    <div class="vl">// Interactive — compare serving patterns</div>
    <canvas id="serveCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Request Volume</span><input type="range" id="serveVol" min="1" max="100" step="1" value="50"><span class="vd" id="serveVolV">50k/day</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Pattern</th><th>Latency</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td>Online (REST/gRPC)</td><td>&lt;100ms</td><td>User-facing predictions, recommendations</td></tr>
      <tr><td>Batch</td><td>Minutes–hours</td><td>Nightly scoring, report generation</td></tr>
      <tr><td>Streaming</td><td>Seconds</td><td>Fraud detection, real-time pricing</td></tr>
      <tr><td>Embedded</td><td>&lt;1ms</td><td>On-device, edge inference</td></tr>
    </tbody>
  </table>
  <div class="code-block"><pre><span class="cm"># Python — FastAPI online serving</span>
<span class="kw">from</span> fastapi <span class="kw">import</span> FastAPI
<span class="kw">import</span> onnxruntime <span class="kw">as</span> ort
<span class="kw">import</span> numpy <span class="kw">as</span> np

app = FastAPI()
session = ort.InferenceSession(<span class="st">"model.onnx"</span>)

@app.post(<span class="st">"/predict"</span>)
<span class="kw">async def</span> predict(features: list[float]):
    inp = np.array([features], dtype=np.float32)
    result = session.run(<span class="st">None</span>, {<span class="st">"features"</span>: inp})
    <span class="kw">return</span> {<span class="st">"prediction"</span>: result[<span class="st">0</span>].tolist()}</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Online vs batch serving mirrors the <a href="../markets/charts/#timeframes" target="_blank" rel="noopener">timeframe choice</a> in trading — intraday (real-time) vs daily/weekly (batch). Both force you to match your system's response time to the decision frequency.</div>
  <div class="topic-nav" id="nav-serving-patterns"></div>
</div>`;
}

/* 03 — A/B & Canary Rollouts */
function buildABRollout() {
  return `<div class="topic" id="ab-rollout">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">03 — Deploy & Serve</div><h2>A/B &amp; <em>Canary</em> Rollouts</h2></div>
    <span class="topic-badge">Deployment</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Ship models safely with progressive traffic splitting</p>
  <p class="prose">Deploying a new model to 100% of traffic is reckless. <strong>Canary rollouts</strong> send a small fraction (1–5%) of traffic to the new model while monitoring metrics. <strong>Blue-green</strong> deploys keep the old version warm for instant rollback. <strong>A/B tests</strong> run both models simultaneously to measure real-world lift.</p>
  <div class="va">
    <div class="vl">// Interactive — canary traffic split</div>
    <canvas id="canaryCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Canary %</span><input type="range" id="canaryPct" min="0" max="100" step="1" value="5"><span class="vd" id="canaryPctV">5%</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Kubernetes canary with Istio traffic split</span>
<span class="cm"># VirtualService:</span>
<span class="cm">#   http:</span>
<span class="cm">#   - route:</span>
<span class="cm">#     - destination:</span>
<span class="cm">#         host: model-service</span>
<span class="cm">#         subset: stable</span>
<span class="cm">#       weight: 95</span>
<span class="cm">#     - destination:</span>
<span class="cm">#         host: model-service</span>
<span class="cm">#         subset: canary</span>
<span class="cm">#       weight: 5</span></pre></div>
  <div class="callout info"><strong>Rollback triggers:</strong> Define automatic rollback criteria before deploying — e.g., if p99 latency exceeds 200ms or error rate exceeds 1%, revert immediately.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Canary rollouts apply the same risk management as <a href="../markets/psychology/#position-sizing" target="_blank" rel="noopener">position sizing</a> — start small, scale up only when evidence confirms safety. The <a href="../stats/#bayesian-ab" target="_blank" rel="noopener">Bayesian A/B framework</a> from The Toolkit directly applies to evaluating canary metrics.</div>
  <div class="topic-nav" id="nav-ab-rollout"></div>
</div>`;
}

/* 04 — Latency & Throughput */
function buildLatencyThroughput() {
  return `<div class="topic" id="latency-throughput">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">04 — Deploy & Serve</div><h2>Latency &amp; <em>Throughput</em></h2></div>
    <span class="topic-badge">Performance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// p50, p99, batching, and the tradeoffs that define your SLA</p>
  <p class="prose"><strong>Latency</strong> is the time for a single prediction. <strong>Throughput</strong> is predictions per second. You can often trade one for the other — dynamic batching increases throughput but adds latency. p50 tells you the typical experience; <strong>p99 tells you the worst</strong>.</p>
  <div class="fb"><div class="fm">Throughput = Batch Size / Latency</div><div class="fd"><span>Batching</span> amortises fixed overhead (model loading, context switching) across multiple inputs, improving throughput at the cost of per-request latency.</div></div>
  <div class="va">
    <div class="vl">// Interactive — latency distribution with batch size</div>
    <canvas id="latencyCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Batch Size</span><input type="range" id="latBatch" min="1" max="64" step="1" value="1"><span class="vd" id="latBatchV">1</span></div>
      <div class="cg"><span class="cl">p50</span><span class="vd" id="latP50" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">p99</span><span class="vd" id="latP99" style="color:#e57373">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Latency percentiles work exactly like <a href="../stats/#distribution-shape" target="_blank" rel="noopener">distribution shape analysis</a> — the tail matters more than the mean. In markets, the equivalent is <a href="../markets/indicators/#volatility" target="_blank" rel="noopener">tail risk in volatility</a>.</div>
  <div class="topic-nav" id="nav-latency-throughput"></div>
</div>`;
}

/* 05 — GPU Inference */
function buildGPUInference() {
  return `<div class="topic" id="gpu-inference">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">05 — Deploy & Serve</div><h2>GPU <em>Inference</em></h2></div>
    <span class="topic-badge">Hardware</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// VRAM management, TensorRT, and knowing when CPU is enough</p>
  <p class="prose">GPUs accelerate inference through massive parallelism, but they're expensive and tricky to manage. <strong>TensorRT</strong> optimises models for NVIDIA GPUs with layer fusion and kernel auto-tuning. <strong>Triton Inference Server</strong> handles multi-model scheduling and dynamic batching on GPU.</p>
  <div class="va">
    <div class="vl">// Interactive — GPU vs CPU throughput comparison</div>
    <canvas id="gpuCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Model Size (M params)</span><input type="range" id="gpuSize" min="1" max="1000" step="10" value="100"><span class="vd" id="gpuSizeV">100M</span></div>
    </div>
  </div>
  <table class="mt">
    <thead><tr><th>Approach</th><th>Speedup</th><th>Tradeoff</th></tr></thead>
    <tbody>
      <tr><td>TensorRT FP16</td><td>2–4×</td><td>Slight accuracy loss, compile time</td></tr>
      <tr><td>TensorRT INT8</td><td>3–6×</td><td>Needs calibration dataset</td></tr>
      <tr><td>Multi-model GPU</td><td>Better utilisation</td><td>Memory contention</td></tr>
      <tr><td>CPU (small models)</td><td>Baseline</td><td>Often sufficient for &lt;10M params</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Cost rule of thumb:</strong> If your model is under 10M parameters and doesn't process images/audio, benchmark CPU first. GPU inference makes sense when you're throughput-bound, not latency-bound.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> GPU vs CPU is a <a href="#cost-governance">cost governance</a> decision — the same risk/reward calculus as <a href="../markets/psychology/#risk-appetite" target="_blank" rel="noopener">risk appetite</a> in portfolio construction. Spend more only when the marginal return justifies it.</div>
  <div class="topic-nav" id="nav-gpu-inference"></div>
</div>`;
}

/* 06 — Drift Detection in Production */
function buildDriftDetection() {
  return `<div class="topic" id="drift-detection">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">06 — Monitor & Observe</div><h2>Drift Detection <em>in Production</em></h2></div>
    <span class="topic-badge">Monitoring</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Detecting when the world changes under your model</p>
  <p class="prose"><strong>Data drift</strong> means input distributions have shifted. <strong>Concept drift</strong> means the relationship between inputs and targets has changed. Both silently degrade model performance. Continuous monitoring with PSI, KS tests, and page-based detection catches drift before users notice.</p>
  <div class="fb"><div class="fm">PSI = &Sigma; (p<sub>i</sub> &minus; q<sub>i</sub>) &middot; ln(p<sub>i</sub> / q<sub>i</sub>)</div><div class="fd"><span>PSI</span> &lt; 0.1 = stable &nbsp;|&nbsp; 0.1–0.2 = moderate shift &nbsp;|&nbsp; &gt; 0.2 = significant drift</div></div>
  <div class="va">
    <div class="vl">// Interactive — reference vs production distributions</div>
    <canvas id="driftCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Drift Amount</span><input type="range" id="driftAmt" min="0" max="100" step="1" value="10"><span class="vd" id="driftAmtV">0.10</span></div>
      <div class="cg"><span class="cl">PSI</span><span class="vd" id="driftPSI" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — drift detection with Evidently</span>
<span class="kw">from</span> evidently.report <span class="kw">import</span> Report
<span class="kw">from</span> evidently.metric_preset <span class="kw">import</span> DataDriftPreset

report = Report(metrics=[DataDriftPreset()])
report.run(reference_data=df_train,
           current_data=df_prod)
report.save_html(<span class="st">"drift_report.html"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drift detection in ML is the same problem as <a href="../stats/#data-drift" target="_blank" rel="noopener">data drift analysis</a> in The Toolkit and <a href="../markets/indicators/#regime-detection" target="_blank" rel="noopener">regime detection</a> in markets — the distribution has changed, and your old assumptions no longer hold.</div>
  <div class="topic-nav" id="nav-drift-detection"></div>
</div>`;
}

/* 07 — Model Monitoring Dashboards */
function buildModelMonitoring() {
  return `<div class="topic" id="model-monitoring">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">07 — Monitor & Observe</div><h2>Model Monitoring <em>Dashboards</em></h2></div>
    <span class="topic-badge">Observability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Prediction health, feature drift, and system metrics in one view</p>
  <p class="prose">A model monitoring dashboard tracks three layers: <strong>system metrics</strong> (latency, errors, throughput), <strong>data metrics</strong> (feature distributions, missing rates), and <strong>model metrics</strong> (prediction distribution, accuracy if labels are available). Grafana + Prometheus is the standard stack.</p>
  <div class="va">
    <div class="vl">// Interactive — monitoring dashboard simulation</div>
    <canvas id="monitorCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Layer</th><th>Metrics</th><th>Alert When</th></tr></thead>
    <tbody>
      <tr><td>System</td><td>Latency, error rate, throughput</td><td>p99 &gt; SLO or error rate &gt; 1%</td></tr>
      <tr><td>Data</td><td>Feature distributions, null rates</td><td>PSI &gt; 0.2 or null rate spikes</td></tr>
      <tr><td>Model</td><td>Prediction distribution, confidence</td><td>Distribution shift or low confidence</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML monitoring dashboards are structured like <a href="../markets/charts/#dashboard-setup" target="_blank" rel="noopener">trading dashboards</a> — layered views from system health down to individual signal quality. The <a href="../stats/#learning-curves" target="_blank" rel="noopener">learning curve</a> concept extends to tracking model performance over time in production.</div>
  <div class="topic-nav" id="nav-model-monitoring"></div>
</div>`;
}

/* 08 — Alerting & SLOs */
function buildAlertingSLOs() {
  return `<div class="topic" id="alerting-slos">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">08 — Monitor & Observe</div><h2>Alerting &amp; <em>SLOs</em></h2></div>
    <span class="topic-badge">Reliability</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Latency budgets, error budgets, and avoiding alert fatigue</p>
  <p class="prose">A <strong>Service Level Objective (SLO)</strong> defines what "good enough" means: "99.5% of predictions return within 200ms." The <strong>error budget</strong> is what's left — you can spend it on risky deployments. Too many alerts and people ignore them; too few and incidents go unnoticed.</p>
  <div class="fb"><div class="fm">Error Budget = 1 &minus; SLO target</div><div class="fd">If your SLO is 99.5% availability, your error budget is 0.5% — roughly 3.6 hours of downtime per month.</div></div>
  <div class="va">
    <div class="vl">// Interactive — error budget burn rate</div>
    <canvas id="sloCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">SLO Target %</span><input type="range" id="sloTarget" min="90" max="100" step="0.1" value="99.5"><span class="vd" id="sloTargetV">99.5%</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Error budgets work like <a href="../markets/indicators/#drawdown-limits" target="_blank" rel="noopener">drawdown limits</a> in trading — a predefined loss tolerance that triggers defensive action when consumed. The statistical foundation is the same <a href="../stats/#confidence-intervals" target="_blank" rel="noopener">confidence interval</a> logic.</div>
  <div class="topic-nav" id="nav-alerting-slos"></div>
</div>`;
}

/* 09 — Shadow Mode & Champion/Challenger */
function buildShadowScoring() {
  return `<div class="topic" id="shadow-scoring">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">09 — Monitor & Observe</div><h2>Shadow Mode &amp; <em>Champion/Challenger</em></h2></div>
    <span class="topic-badge">Validation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Validating new models in production without serving their predictions</p>
  <p class="prose">In <strong>shadow mode</strong>, the new model scores every request alongside the current champion, but only the champion's prediction is served. You collect real production data to compare — without risking user experience. When the challenger wins on key metrics, you promote it.</p>
  <div class="va">
    <div class="vl">// Interactive — champion vs challenger comparison</div>
    <canvas id="shadowCanvas" height="260"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Shadow scoring is <a href="../stats/#walk-forward" target="_blank" rel="noopener">walk-forward validation</a> running live. In markets, <a href="../markets/psychology/#paper-trading" target="_blank" rel="noopener">paper trading</a> serves the same purpose — test with real data without real consequences.</div>
  <div class="topic-nav" id="nav-shadow-scoring"></div>
</div>`;
}

/* 10 — Data Quality Gates */
function buildDataQuality() {
  return `<div class="topic" id="data-quality">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">10 — Monitor & Observe</div><h2>Data Quality <em>Gates</em></h2></div>
    <span class="topic-badge">Data</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Automated checks that stop bad data before it reaches your model</p>
  <p class="prose">Garbage in, garbage out — but in production, garbage arrives silently. <strong>Data quality gates</strong> enforce schema validation, range checks, freshness constraints, and completeness thresholds. They sit in your pipeline before feature engineering and before inference.</p>
  <div class="va">
    <div class="vl">// Interactive — data quality pipeline flow</div>
    <canvas id="dqCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Great Expectations data quality check</span>
<span class="kw">import</span> great_expectations <span class="kw">as</span> gx

context = gx.get_context()
ds = context.sources.add_pandas(<span class="st">"prod_data"</span>)
asset = ds.add_dataframe_asset(<span class="st">"batch"</span>, dataframe=df)

expectations = [
    gx.expectations.ExpectColumnValuesToNotBeNull(column=<span class="st">"user_id"</span>),
    gx.expectations.ExpectColumnValuesToBeBetween(
        column=<span class="st">"price"</span>, min_value=<span class="st">0</span>, max_value=<span class="st">100000</span>),
]</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Data quality gates are the production equivalent of <a href="../stats/#missing-data" target="_blank" rel="noopener">missing data strategies</a> — catching the problem before it corrupts your analysis. In markets, <a href="../markets/charts/#data-hygiene" target="_blank" rel="noopener">data hygiene</a> (adjusting for splits, dividends, survivorship) serves the same protective role.</div>
  <div class="topic-nav" id="nav-data-quality"></div>
</div>`;
}

/* 11 — ML Pipelines */
function buildMLPipelines() {
  return `<div class="topic" id="ml-pipelines">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">11 — Pipeline & Automation</div><h2>ML <em>Pipelines</em></h2></div>
    <span class="topic-badge">Automation</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Composing training, validation, and deployment into reproducible DAGs</p>
  <p class="prose">An <strong>ML pipeline</strong> is a directed acyclic graph (DAG) of steps: data ingestion → preprocessing → training → evaluation → deployment. Each step is versioned, cacheable, and independently retriable. Kubeflow, Airflow, Vertex, and SageMaker Pipelines are the main orchestrators.</p>
  <div class="va">
    <div class="vl">// Interactive — ML pipeline DAG</div>
    <canvas id="pipeCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Platform</th><th>Strengths</th><th>Best for</th></tr></thead>
    <tbody>
      <tr><td>Kubeflow Pipelines</td><td>K8s-native, portable</td><td>Cloud-agnostic teams</td></tr>
      <tr><td>Apache Airflow</td><td>Mature, huge ecosystem</td><td>Data engineering + ML</td></tr>
      <tr><td>Vertex AI Pipelines</td><td>Managed, GCP-integrated</td><td>Google Cloud shops</td></tr>
      <tr><td>SageMaker Pipelines</td><td>Managed, AWS-integrated</td><td>AWS shops</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML pipelines enforce the same disciplined workflow as <a href="../stats/#cross-validation" target="_blank" rel="noopener">cross-validation</a> — each step has defined inputs and outputs, preventing data leakage between stages.</div>
  <div class="topic-nav" id="nav-ml-pipelines"></div>
</div>`;
}

/* 12 — Feature Stores */
function buildFeatureStores() {
  return `<div class="topic" id="feature-stores">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">12 — Pipeline & Automation</div><h2>Feature <em>Stores</em></h2></div>
    <span class="topic-badge">Data</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Centralized feature management with online/offline consistency</p>
  <p class="prose">A <strong>feature store</strong> serves two stores from one source of truth: the <strong>offline store</strong> (historical data for training) and the <strong>online store</strong> (low-latency data for serving). This solves the training-serving skew problem — the features your model trains on are identical to what it sees in production.</p>
  <div class="va">
    <div class="vl">// Interactive — feature store architecture</div>
    <canvas id="featCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Feast feature store</span>
<span class="kw">from</span> feast <span class="kw">import</span> FeatureStore

store = FeatureStore(repo_path=<span class="st">"."</span>)

<span class="cm"># Online serving — low latency</span>
features = store.get_online_features(
    features=[<span class="st">"user_stats:avg_purchase"</span>,
              <span class="st">"user_stats:visit_count"</span>],
    entity_rows=[{<span class="st">"user_id"</span>: <span class="st">123</span>}]
).to_dict()

<span class="cm"># Offline training — point-in-time correct</span>
training_df = store.get_historical_features(
    entity_df=entity_df,
    features=[<span class="st">"user_stats:avg_purchase"</span>]
).to_df()</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Feature stores solve training-serving skew just as <a href="../stats/#survivorship-bias" target="_blank" rel="noopener">survivorship bias prevention</a> solves backtesting skew — both ensure the data you test on matches reality.</div>
  <div class="topic-nav" id="nav-feature-stores"></div>
</div>`;
}

/* 13 — Experiment Tracking */
function buildExperimentTracking() {
  return `<div class="topic" id="experiment-tracking">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">13 — Pipeline & Automation</div><h2>Experiment <em>Tracking</em></h2></div>
    <span class="topic-badge">Workflow</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Logging every run so you never lose a good result</p>
  <p class="prose"><strong>Experiment tracking</strong> logs hyperparameters, metrics, artifacts, and code versions for every training run. Three months from now, when someone asks "which model was that?" you can answer. MLflow, Weights &amp; Biases, and Neptune are the main tools.</p>
  <div class="va">
    <div class="vl">// Interactive — experiment comparison table</div>
    <canvas id="expCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — MLflow experiment tracking</span>
<span class="kw">import</span> mlflow

mlflow.set_experiment(<span class="st">"fraud-detection"</span>)
<span class="kw">with</span> mlflow.start_run():
    mlflow.log_param(<span class="st">"n_estimators"</span>, <span class="st">200</span>)
    mlflow.log_param(<span class="st">"max_depth"</span>, <span class="st">8</span>)
    mlflow.log_metric(<span class="st">"auc"</span>, <span class="st">0.942</span>)
    mlflow.log_metric(<span class="st">"f1"</span>, <span class="st">0.873</span>)
    mlflow.sklearn.log_model(model, <span class="st">"model"</span>)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Experiment tracking is the ML version of a <a href="../markets/psychology/#trading-journal" target="_blank" rel="noopener">trading journal</a> — systematic logging that turns isolated attempts into cumulative learning. The <a href="../stats/#comparing-runs" target="_blank" rel="noopener">comparing runs</a> framework from The Toolkit gives you the statistical tests to compare tracked experiments.</div>
  <div class="topic-nav" id="nav-experiment-tracking"></div>
</div>`;
}

/* 14 — CI/CD for ML */
function buildCICDML() {
  return `<div class="topic" id="ci-cd-ml">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">14 — Pipeline & Automation</div><h2>CI/CD <em>for ML</em></h2></div>
    <span class="topic-badge">DevOps</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Automated testing of data, models, and deployments</p>
  <p class="prose">ML CI/CD extends traditional CI/CD with three additional test layers: <strong>data validation</strong> (schema + quality), <strong>model validation</strong> (performance thresholds), and <strong>serving validation</strong> (latency + correctness). A merge should trigger retraining, evaluation, and conditional deployment.</p>
  <div class="va">
    <div class="vl">// Interactive — CI/CD pipeline stages</div>
    <canvas id="cicdCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Stage</th><th>Tests</th><th>Gate</th></tr></thead>
    <tbody>
      <tr><td>Data</td><td>Schema, freshness, completeness</td><td>All checks pass</td></tr>
      <tr><td>Training</td><td>Convergence, no NaN loss</td><td>Loss below threshold</td></tr>
      <tr><td>Evaluation</td><td>AUC, F1, latency benchmark</td><td>Metrics &ge; champion</td></tr>
      <tr><td>Deployment</td><td>Smoke test, shadow run</td><td>No errors in canary</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> CI/CD gates are automated <a href="../stats/#effect-size" target="_blank" rel="noopener">significance tests</a> — the model must prove it's better before shipping. The same "don't trust your intuition, trust the numbers" principle that <a href="../markets/psychology/#cognitive-bias" target="_blank" rel="noopener">cognitive bias awareness</a> teaches.</div>
  <div class="topic-nav" id="nav-ci-cd-ml"></div>
</div>`;
}

/* 15 — Orchestration & Scheduling */
function buildOrchestration() {
  return `<div class="topic" id="orchestration">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">15 — Pipeline & Automation</div><h2>Orchestration &amp; <em>Scheduling</em></h2></div>
    <span class="topic-badge">Infrastructure</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// DAGs, retries, backfills, and trigger strategies</p>
  <p class="prose"><strong>Orchestrators</strong> manage the when, how, and what-if of ML workflows. Airflow, Prefect, and Dagster define DAGs with dependency resolution, automatic retries, and backfill capabilities. Good orchestration means your retraining runs reliably at 2 AM without you.</p>
  <div class="va">
    <div class="vl">// Interactive — DAG dependency graph</div>
    <canvas id="orchCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Airflow DAG for retraining</span>
<span class="kw">from</span> airflow <span class="kw">import</span> DAG
<span class="kw">from</span> airflow.operators.python <span class="kw">import</span> PythonOperator
<span class="kw">from</span> datetime <span class="kw">import</span> datetime

dag = DAG(<span class="st">"retrain_model"</span>,
          schedule_interval=<span class="st">"0 2 * * *"</span>,
          start_date=datetime(<span class="st">2025</span>, <span class="st">1</span>, <span class="st">1</span>))

ingest = PythonOperator(task_id=<span class="st">"ingest"</span>, python_callable=ingest_data, dag=dag)
train  = PythonOperator(task_id=<span class="st">"train"</span>,  python_callable=train_model,  dag=dag)
eval_  = PythonOperator(task_id=<span class="st">"eval"</span>,   python_callable=evaluate,     dag=dag)
deploy = PythonOperator(task_id=<span class="st">"deploy"</span>, python_callable=deploy_model, dag=dag)

ingest >> train >> eval_ >> deploy</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Orchestration DAGs structure ML workflows the same way <a href="../ml-math/#computation-graphs" target="_blank" rel="noopener">computation graphs</a> structure neural networks — directed, acyclic, and dependency-ordered. In markets, <a href="../markets/indicators/#systematic-rules" target="_blank" rel="noopener">systematic trading rules</a> follow the same sequential logic.</div>
  <div class="topic-nav" id="nav-orchestration"></div>
</div>`;
}

/* 16 — Model Compression */
function buildModelCompression() {
  return `<div class="topic" id="model-compression">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">16 — Scale & Optimize</div><h2>Model <em>Compression</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Pruning, distillation, and the lottery ticket hypothesis</p>
  <p class="prose"><strong>Pruning</strong> removes unimportant weights (structured or unstructured). <strong>Knowledge distillation</strong> trains a small "student" model to mimic a large "teacher." The <strong>lottery ticket hypothesis</strong> suggests sparse subnetworks within large models can match full performance — if you find the right ticket.</p>
  <div class="fb"><div class="fm">Compression Ratio = Original Size / Compressed Size</div><div class="fd">A 4× compression ratio means your model is 75% smaller — potentially 4× faster with minimal accuracy loss.</div></div>
  <div class="va">
    <div class="vl">// Interactive — pruning vs accuracy tradeoff</div>
    <canvas id="compressCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sparsity %</span><input type="range" id="compSparsity" min="0" max="99" step="1" value="50"><span class="vd" id="compSparsityV">50%</span></div>
      <div class="cg"><span class="cl">Accuracy</span><span class="vd" id="compAcc" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model compression is <a href="../stats/#feature-correlation" target="_blank" rel="noopener">feature selection</a> applied to weights — remove what's redundant to keep what matters. In markets, <a href="../markets/indicators/#signal-noise" target="_blank" rel="noopener">signal-to-noise filtering</a> does the same: strip the noise, keep the signal.</div>
  <div class="topic-nav" id="nav-model-compression"></div>
</div>`;
}

/* 17 — Quantization */
function buildQuantization() {
  return `<div class="topic" id="quantization">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">17 — Scale & Optimize</div><h2><em>Quantization</em></h2></div>
    <span class="topic-badge">Optimization</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// FP32 → INT8 — trading precision for speed</p>
  <p class="prose"><strong>Quantization</strong> reduces weight precision from 32-bit floats to 16-bit or 8-bit integers. <strong>Post-training quantization (PTQ)</strong> is the quick path — just convert. <strong>Quantization-aware training (QAT)</strong> simulates low precision during training for better accuracy at INT8.</p>
  <div class="fb"><div class="fm">Memory &prop; bits &times; parameters</div><div class="fd">INT8 uses 4× less memory than FP32, enabling larger batch sizes and faster inference.</div></div>
  <div class="va">
    <div class="vl">// Interactive — precision vs accuracy vs speed</div>
    <canvas id="quantCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Method</th><th>Accuracy Impact</th><th>Speed Gain</th></tr></thead>
    <tbody>
      <tr><td>FP16 (half precision)</td><td>Negligible</td><td>~2×</td></tr>
      <tr><td>PTQ INT8</td><td>0.5–2% drop</td><td>~3×</td></tr>
      <tr><td>QAT INT8</td><td>&lt;0.5% drop</td><td>~3×</td></tr>
      <tr><td>INT4 (experimental)</td><td>Variable</td><td>~5×</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Quantization trades precision for speed — the same tradeoff as <a href="../llm/#sampling-temperature" target="_blank" rel="noopener">sampling temperature</a> in LLMs (precision vs diversity) or <a href="../markets/charts/#timeframes" target="_blank" rel="noopener">timeframe compression</a> in charts (detail vs overview).</div>
  <div class="topic-nav" id="nav-quantization"></div>
</div>`;
}

/* 18 — Caching & Prediction Stores */
function buildCachingLayers() {
  return `<div class="topic" id="caching-layers">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">18 — Scale & Optimize</div><h2>Caching &amp; <em>Prediction Stores</em></h2></div>
    <span class="topic-badge">Performance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Don't predict what you've already predicted</p>
  <p class="prose">If 80% of your requests are repeated inputs (product recommendations, credit scores), a <strong>prediction cache</strong> (Redis, Memcached) can serve them in microseconds. <strong>Prediction stores</strong> precompute scores for all known entities on a schedule. TTL and invalidation strategies keep results fresh.</p>
  <div class="va">
    <div class="vl">// Interactive — cache hit rate vs latency</div>
    <canvas id="cacheCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Cache Hit Rate %</span><input type="range" id="cacheHit" min="0" max="100" step="1" value="70"><span class="vd" id="cacheHitV">70%</span></div>
      <div class="cg"><span class="cl">Avg Latency</span><span class="vd" id="cacheLatV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Prediction caching is <a href="../ml-math/#memoization" target="_blank" rel="noopener">memoization</a> at system scale. In markets, <a href="../markets/indicators/#precomputed-levels" target="_blank" rel="noopener">precomputed support/resistance levels</a> serve the same purpose — calculate once, reference many times.</div>
  <div class="topic-nav" id="nav-caching-layers"></div>
</div>`;
}

/* 19 — Auto-Scaling Endpoints */
function buildAutoScaling() {
  return `<div class="topic" id="auto-scaling">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">19 — Scale & Optimize</div><h2>Auto-Scaling <em>Endpoints</em></h2></div>
    <span class="topic-badge">Infrastructure</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Scaling with demand — and scaling back to save money</p>
  <p class="prose"><strong>Horizontal Pod Autoscaler (HPA)</strong> adds replicas when CPU/memory/custom metrics exceed thresholds. <strong>Scale-to-zero</strong> (Knative, serverless) eliminates idle costs but adds cold start latency. The right strategy depends on traffic patterns — bursty vs steady, latency-tolerant vs strict SLO.</p>
  <div class="va">
    <div class="vl">// Interactive — replica count vs traffic</div>
    <canvas id="scaleCanvas" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Traffic Load</span><input type="range" id="scaleLoad" min="0" max="100" step="1" value="50"><span class="vd" id="scaleLoadV">50%</span></div>
      <div class="cg"><span class="cl">Replicas</span><span class="vd" id="scaleReps" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Auto-scaling is dynamic <a href="../markets/psychology/#position-sizing" target="_blank" rel="noopener">position sizing</a> for infrastructure — scale up exposure when opportunity (traffic) increases, scale down when it drops. The <a href="../stats/#monte-carlo" target="_blank" rel="noopener">Monte Carlo</a> approach helps simulate traffic scenarios for capacity planning.</div>
  <div class="topic-nav" id="nav-auto-scaling"></div>
</div>`;
}

/* 20 — Cost Governance */
function buildCostGovernance() {
  return `<div class="topic" id="cost-governance">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">20 — Scale & Optimize</div><h2>Cost <em>Governance</em></h2></div>
    <span class="topic-badge">FinOps</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Tracking cost per prediction and eliminating ML waste</p>
  <p class="prose">ML workloads are expensive — GPUs, storage, compute for training and serving. <strong>Cost governance</strong> tracks cost per prediction, GPU utilisation, idle resources, and spot vs reserved savings. The goal: same model quality at lower cost, or better models at the same cost.</p>
  <div class="va">
    <div class="vl">// Interactive — cost breakdown by category</div>
    <canvas id="costCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Strategy</th><th>Savings</th><th>Risk</th></tr></thead>
    <tbody>
      <tr><td>Spot/preemptible instances</td><td>60–90%</td><td>Interruption risk</td></tr>
      <tr><td>Right-sizing instances</td><td>20–50%</td><td>Under-provisioning</td></tr>
      <tr><td>Model compression</td><td>40–75%</td><td>Accuracy loss</td></tr>
      <tr><td>Prediction caching</td><td>50–80%</td><td>Stale results</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Cost governance applies the same <a href="../stats/#sharpe-ratio" target="_blank" rel="noopener">risk-adjusted return</a> thinking to infrastructure — maximise model value per dollar spent, just as <a href="../markets/indicators/#cost-analysis" target="_blank" rel="noopener">transaction cost analysis</a> measures trading efficiency.</div>
  <div class="topic-nav" id="nav-cost-governance"></div>
</div>`;
}

/* 21 — Model Registry & Versioning */
function buildModelRegistry() {
  return `<div class="topic" id="model-registry">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">21 — Governance & Trust</div><h2>Model Registry &amp; <em>Versioning</em></h2></div>
    <span class="topic-badge">Governance</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Central catalog with staging, production, and archive states</p>
  <p class="prose">A <strong>model registry</strong> is a versioned catalog where every model has metadata (who trained it, on what data, with which hyperparameters) and a lifecycle stage: <em>staging</em> → <em>production</em> → <em>archived</em>. Approval workflows ensure no model reaches production without review.</p>
  <div class="va">
    <div class="vl">// Interactive — model lifecycle states</div>
    <canvas id="regCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — MLflow model registry</span>
<span class="kw">import</span> mlflow

<span class="cm"># Register a new model version</span>
result = mlflow.register_model(
    <span class="st">"runs:/abc123/model"</span>,
    <span class="st">"fraud-detector"</span>
)

<span class="cm"># Promote to production</span>
client = mlflow.tracking.MlflowClient()
client.transition_model_version_stage(
    name=<span class="st">"fraud-detector"</span>,
    version=result.version,
    stage=<span class="st">"Production"</span>
)</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model registries version models the way <a href="#lineage-tracking">lineage tracking</a> versions data — both create audit trails. In markets, <a href="../markets/psychology/#strategy-journal" target="_blank" rel="noopener">strategy journaling</a> serves the same purpose: versioned records of what you deployed and why.</div>
  <div class="topic-nav" id="nav-model-registry"></div>
</div>`;
}

/* 22 — Lineage Tracking */
function buildLineageTracking() {
  return `<div class="topic" id="lineage-tracking">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">22 — Governance & Trust</div><h2>Lineage <em>Tracking</em></h2></div>
    <span class="topic-badge">Audit</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Tracing every prediction back to its training data and code</p>
  <p class="prose"><strong>Lineage tracking</strong> records the full provenance chain: which data → which features → which code → which model → which prediction. When a model misbehaves, you can trace backwards to find the root cause. Regulatory compliance (GDPR, finance) often requires this.</p>
  <div class="va">
    <div class="vl">// Interactive — lineage graph</div>
    <canvas id="lineageCanvas" height="260"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Lineage tracking is the ML equivalent of <a href="../ml-math/#backpropagation" target="_blank" rel="noopener">backpropagation</a> for accountability — tracing effects back to causes. In markets, <a href="../markets/charts/#attribution-analysis" target="_blank" rel="noopener">performance attribution</a> traces returns back to specific decisions.</div>
  <div class="topic-nav" id="nav-lineage-tracking"></div>
</div>`;
}

/* 23 — Fairness Audits */
function buildFairnessAudits() {
  return `<div class="topic" id="fairness-audits">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">23 — Governance & Trust</div><h2>Fairness <em>Audits</em></h2></div>
    <span class="topic-badge">Ethics</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Testing for bias across protected groups</p>
  <p class="prose"><strong>Fairness audits</strong> measure whether your model treats different groups equitably. <strong>Demographic parity</strong> checks if positive rates are equal across groups. <strong>Equalized odds</strong> checks if error rates are equal. No single metric captures all fairness — you must choose which definition matches your context.</p>
  <div class="fb"><div class="fm">Disparate Impact = P(ŷ=1|G=a) / P(ŷ=1|G=b)</div><div class="fd">A ratio below 0.8 (the "four-fifths rule") suggests adverse impact against group b.</div></div>
  <div class="va">
    <div class="vl">// Interactive — fairness metrics across groups</div>
    <canvas id="fairCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — Fairlearn fairness assessment</span>
<span class="kw">from</span> fairlearn.metrics <span class="kw">import</span> MetricFrame
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> accuracy_score

mf = MetricFrame(
    metrics=accuracy_score,
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=demographics
)
print(mf.by_group)
print(<span class="st">"Ratio:"</span>, mf.ratio())</pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Fairness audits apply <a href="../stats/#confidence-intervals" target="_blank" rel="noopener">confidence intervals</a> per subgroup — the same statistical rigour, applied to equity. In markets, <a href="../markets/psychology/#behavioral-bias" target="_blank" rel="noopener">behavioral bias</a> recognition teaches the same lesson: your defaults aren't neutral.</div>
  <div class="topic-nav" id="nav-fairness-audits"></div>
</div>`;
}

/* 24 — Reproducibility */
function buildReproducibility() {
  return `<div class="topic" id="reproducibility">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">24 — Governance & Trust</div><h2><em>Reproducibility</em></h2></div>
    <span class="topic-badge">Science</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// Ensuring any result can be replicated exactly</p>
  <p class="prose"><strong>Reproducibility</strong> means anyone can re-run your experiment and get the same result. This requires pinned dependencies, fixed random seeds, versioned data (DVC), containerised environments, and recorded hardware specs. Without it, your "state of the art" result is just a story.</p>
  <div class="va">
    <div class="vl">// Interactive — reproducibility checklist</div>
    <canvas id="reproCanvas" height="260"></canvas>
  </div>
  <div class="code-block"><pre><span class="cm"># Python — reproducibility essentials</span>
<span class="kw">import</span> random, numpy <span class="kw">as</span> np, torch

<span class="cm"># Lock all seeds</span>
SEED = <span class="st">42</span>
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)
torch.cuda.manual_seed_all(SEED)
torch.backends.cudnn.deterministic = <span class="st">True</span>

<span class="cm"># Pin deps: pip freeze > requirements.txt</span>
<span class="cm"># Version data: dvc add data/train.csv</span>
<span class="cm"># Container: docker build -t experiment:v1 .</span></pre></div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Reproducibility in ML is the same discipline as <a href="../stats/#walk-forward" target="_blank" rel="noopener">walk-forward validation</a> — if you can't reproduce it, you can't trust it. In markets, <a href="../markets/charts/#backtest-reproducibility" target="_blank" rel="noopener">backtest reproducibility</a> faces the same challenge with data versioning.</div>
  <div class="topic-nav" id="nav-reproducibility"></div>
</div>`;
}

/* 25 — Incident Response for ML */
function buildIncidentResponse() {
  return `<div class="topic" id="incident-response">
  <div class="topic-header">
    <div class="topic-meta"><div class="topic-num">25 — Governance & Trust</div><h2>Incident Response <em>for ML</em></h2></div>
    <span class="topic-badge">Operations</span><span class="evidence-badge proven" title="Based on mathematical/statistical foundations with peer-reviewed evidence">✓ Mathematical</span>
  </div>
  <p class="sub">// When models fail in production — rollback, fallback, postmortem</p>
  <p class="prose">ML incidents are different from software bugs: the code runs fine, but predictions are wrong. <strong>Rollback</strong> reverts to the previous model version. <strong>Fallbacks</strong> (rule-based defaults, cached predictions) serve something when the model is down. <strong>Circuit breakers</strong> automatically switch to fallback when error rates spike.</p>
  <div class="va">
    <div class="vl">// Interactive — incident response decision tree</div>
    <canvas id="incidentCanvas" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Severity</th><th>Response</th><th>Timeline</th></tr></thead>
    <tbody>
      <tr><td>P0 — Model serving errors</td><td>Rollback immediately</td><td>Minutes</td></tr>
      <tr><td>P1 — Accuracy degradation</td><td>Switch to fallback, investigate</td><td>Hours</td></tr>
      <tr><td>P2 — Slight drift detected</td><td>Schedule retraining</td><td>Days</td></tr>
      <tr><td>P3 — Feature quality warning</td><td>Monitor and log</td><td>Next sprint</td></tr>
    </tbody>
  </table>
  <div class="callout info"><strong>Blameless postmortems:</strong> After every incident, document what happened, why detection was delayed, and what systemic fix prevents recurrence. Blame the system, not the person.</div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML incident response mirrors <a href="../markets/psychology/#stop-loss" target="_blank" rel="noopener">stop-loss discipline</a> in trading — predefined rules that limit damage when things go wrong. The <a href="../stats/#power-analysis" target="_blank" rel="noopener">power analysis</a> framework helps design monitoring that catches problems early enough to act.</div>
  <div class="topic-nav" id="nav-incident-response"></div>
</div>`;
}
