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
/* depth:start — generated from the scratch scripts mlops_snippets.py / mlops_depth.py; each
   worked example is the output of the code shown with it. */
const TOPIC_DEPTH = {
 "model-packaging": {
  "example": "The same six weights packaged with two requirement files that differ in a single pin — NumPy 1.26.4 against 2.0.0 — get different artifact IDs: <strong>e93e1a2e4504</strong> and <strong>c538e448aba7</strong>. That is the point of packaging: a model is not its weights, it is its weights plus everything they need to run, and a change to either is a new version.",
  "fails": [
   "A container is only reproducible if its inputs are pinned. A base image tagged <code>latest</code> or an unpinned <code>pip install</code> builds a different artifact next month.",
   "Converting to ONNX or another format can change numerics or drop unsupported operations; compare outputs before and after on real inputs.",
   "Loading a pickle runs code. Never load one from a source you do not control."
  ],
  "code": "import hashlib\nweights = np.arange(6, dtype=np.float32).reshape(2, 3)     # the trained model, tiny here\n\ndef artifact_id(weights, requirements):                    # identity = model bytes + the environment it needs\n    h = hashlib.sha256(weights.tobytes())\n    h.update(requirements.encode())\n    return h.hexdigest()[:12]\n\na = artifact_id(weights, 'numpy==1.26.4\\nscikit-learn==1.4.2')\nb = artifact_id(weights, 'numpy==2.0.0\\nscikit-learn==1.4.2')     # same weights, one pin changed",
  "sources": [
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015",
   "M. Zaharia et al., “Accelerating the Machine Learning Lifecycle with MLflow”, <em>IEEE Data Engineering Bulletin</em> 41(4), 2018",
   "Open Neural Network Exchange (ONNX) specification, onnx.ai — the portable model format"
  ]
 },
 "serving-patterns": {
  "example": "A million customers could be scored; fifty thousand are looked up each day. A nightly batch scores all <strong>1,000,000</strong>, and the average answer is <strong>12 hours</strong> old when read. Online serving scores only the <strong>50,000</strong> that are asked for, with fresh inputs. Here <strong>95%</strong> of the batch work is never read — but batch needs no low-latency service, and online does.",
  "fails": [
   "The choice is about freshness and cost, not fashion: a credit limit that changes monthly gains nothing from online serving.",
   "Batch and online paths built separately drift apart (training–serving skew); share the feature code.",
   "Streaming is not free real time: it adds state, ordering and replay problems that batch never has."
  ],
  "code": "entities = 1_000_000                   # customers that could be scored\nrequested = 50_000                     # customers actually looked up per day\nbatch = dict(scored=entities, avg_age_h=24 / 2)            # nightly batch: everyone, results half a day old on average\nonline = dict(scored=requested, avg_age_h=0)               # online: only who is asked for, scored on the spot\nwaste = 1 - requested / entities                           # share of batch scores nobody reads",
  "sources": [
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022",
   "<em>Designing Data-Intensive Applications</em>, M. Kleppmann, O’Reilly, 2017",
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015"
  ]
 },
 "ab-rollout": {
  "example": "To catch an error rate rising from 1.0% to 1.5% with the usual 5% significance and 80% power takes about <strong>7,747</strong> requests in each arm. With 100,000 requests a day and the canary on 5%, that is <strong>1.5 days</strong> of canary traffic. A ten-minute canary on 1% of traffic can only catch outright breakage, not a regression of this size.",
  "fails": [
   "Peeking at the canary every few minutes and stopping when it looks fine inflates false confidence; decide the sample size or use a sequential test.",
   "Canary traffic is often not a random slice (one region, one client version), so the comparison can be confounded.",
   "Business metrics such as conversion move slowly; a canary judged only on latency and errors can still ship a worse model."
  ],
  "code": "from scipy.stats import norm\np0, p1 = 0.010, 0.015                  # error rate today, and the regression we want to catch\nalpha, power = 0.05, 0.80\nz = norm.ppf(1 - alpha / 2) + norm.ppf(power)\nn = z**2 * (p0 * (1 - p0) + p1 * (1 - p1)) / (p1 - p0) ** 2    # requests needed in each arm\ndaily = 100_000\ndays_at_5pct = n / (0.05 * daily)       # canary gets 5% of traffic",
  "sources": [
   "<em>Trustworthy Online Controlled Experiments</em>, R. Kohavi, D. Tang &amp; Y. Xu, Cambridge University Press, 2020",
   "<em>The Site Reliability Workbook</em>, B. Beyer, N. R. Murphy, D. K. Rensin, K. Kawahara &amp; S. Thorne (eds.), O’Reilly, 2018 — “Canarying Releases”"
  ]
 },
 "latency-throughput": {
  "example": "100,000 simulated requests have a median of <strong>40 ms</strong> and a 99th percentile of <strong>162 ms</strong>. If each request waits on ten backend calls that are each slow 1% of the time, <strong>9.6%</strong> of requests hit at least one slow call — the tail of the parts becomes the body of the whole. And by Little’s law, 200 requests a second at 50 ms means <strong>10</strong> in flight at any moment.",
  "fails": [
   "Averages hide the tail; report percentiles, and know which percentile the SLO is about.",
   "Percentiles cannot be averaged across servers or time windows; aggregate the raw histograms instead.",
   "Load tests with a fixed number of clients under-report latency when the system slows (coordinated omission)."
  ],
  "code": "rng = np.random.default_rng(0)\nlat = rng.lognormal(mean=np.log(40), sigma=0.6, size=100_000)   # simulated latencies in ms\np50, p99 = np.percentile(lat, [50, 99])\nslow_one = 0.01                                # each backend call is slow 1% of the time\nslow_fanout = 1 - (1 - slow_one) ** 10          # a request that waits on 10 such calls\nin_flight = 200 * 0.050                         # Little: 200 requests/s x 50 ms = requests in progress",
  "sources": [
   "J. Dean &amp; L. A. Barroso, “The Tail at Scale”, <em>Communications of the ACM</em> 56(2), 2013",
   "J. D. C. Little, “A Proof for the Queuing Formula: L = λW”, <em>Operations Research</em> 9(3), 1961",
   "<em>Site Reliability Engineering: How Google Runs Production Systems</em>, B. Beyer, C. Jones, J. Petoff &amp; N. R. Murphy (eds.), O’Reilly, 2016"
  ]
 },
 "gpu-inference": {
  "example": "A 7-billion-parameter model in fp16 is <strong>14 GB</strong> of weights. Generating a token reads every weight once, so with about 2 TB/s of memory bandwidth one sequence gets at most about <strong>143 tokens/s</strong>, however fast the arithmetic is. Batching 16 sequences reuses each read, for up to about <strong>2,286 tokens/s</strong> — until the GPU becomes compute-bound or runs out of memory for the KV-cache.",
  "fails": [
   "These are ceilings, not measurements; kernels, attention and the KV-cache take their share. Benchmark on your own traffic.",
   "Bigger batches raise throughput but also latency per request; the right batch size depends on the SLO.",
   "For small models on tabular data a CPU is often cheaper per prediction; the GPU pays off only when it is kept busy."
  ],
  "code": "params = 7e9                           # a 7B-parameter model\nbytes_per = 2                          # fp16\nweights_gb = params * bytes_per / 1e9\nbandwidth_gb_s = 2000                  # memory bandwidth of a modern data-centre GPU, ~2 TB/s\ntokens_s_batch1 = bandwidth_gb_s / weights_gb      # each new token reads every weight once\ntokens_s_batch16 = 16 * tokens_s_batch1            # one read serves 16 sequences (until compute-bound)",
  "sources": [
   "S. Williams, A. Waterman &amp; D. Patterson, “Roofline: An Insightful Visual Performance Model for Multicore Architectures”, <em>Communications of the ACM</em> 52(4), 2009",
   "R. Pope et al., “Efficiently Scaling Transformer Inference”, <em>Proceedings of Machine Learning and Systems</em> 5, 2023"
  ]
 },
 "drift-detection": {
  "example": "Five score bins, training shares against this week’s: the population stability index is <strong>0.136</strong>. A common rule of thumb reads below 0.1 as stable and above 0.25 as a major shift, so this is “watch”. The second half of the snippet shows the opposite trap: a shift of just 0.02 standard deviations, irrelevant for any model, gives a KS-test p-value of <strong>0.0000006</strong> on 200,000 points.",
  "fails": [
   "With big data every test is significant; judge the size of the shift (PSI, effect size), not the p-value.",
   "Input drift is not performance drift: a model can be fine on shifted inputs and broken on unchanged ones (concept drift). Watch outcomes when labels arrive.",
   "PSI depends on the binning; fix the bins at training time."
  ],
  "code": "from scipy.stats import ks_2samp\nexpected = np.array([0.10, 0.20, 0.40, 0.20, 0.10])     # share of training data in five score bins\nactual   = np.array([0.05, 0.15, 0.35, 0.25, 0.20])     # the same bins this week\npsi = np.sum((actual - expected) * np.log(actual / expected))\n\nrng = np.random.default_rng(1)                           # a shift too small to matter...\ntrain, live = rng.normal(0, 1, 200_000), rng.normal(0.02, 1, 200_000)\nks_p = ks_2samp(train, live).pvalue                      # ...is still \"significant\" with this much data",
  "sources": [
   "N. Siddiqi, <em>Credit Risk Scorecards</em>, Wiley, 2006 — the PSI thresholds used in credit scoring",
   "J. Gama, I. Žliobaitė, A. Bifet, M. Pechenizkiy &amp; A. Bouchachia, “A Survey on Concept Drift Adaptation”, <em>ACM Computing Surveys</em> 46(4), 2014",
   "S. Rabanser, S. Günnemann &amp; Z. Lipton, “Failing Loudly: An Empirical Study of Methods for Detecting Dataset Shift”, <em>NeurIPS</em>, 2019"
  ]
 },
 "model-monitoring": {
  "example": "Labels arrive weeks late, so watch the predictions. Over two baseline weeks <strong>8.1%</strong> of 5,000 daily predictions are positive; a p-chart puts the control limits <strong>±1.16 points</strong> away. When the true rate moves to 11% on day 20, the chart flags day <strong>20</strong> itself, and days 21 and 22 after it — weeks before any accuracy number could.",
  "fails": [
   "A stable prediction rate does not prove a healthy model; the inputs and the outcome can change together.",
   "Watching dozens of charts at three-sigma limits produces false alarms; decide which signals page and which only inform.",
   "Dashboards nobody looks at are not monitoring. Tie each panel to an owner and an action."
  ],
  "code": "rng = np.random.default_rng(2)\nn = 5_000                                                 # predictions per day\nrate = np.r_[np.full(20, 0.08), np.full(10, 0.11)]        # share predicted positive; it shifts on day 20\npos = rng.binomial(n, rate) / n\nbase = pos[:14].mean()                                    # two weeks of baseline\nlimit = 3 * np.sqrt(base * (1 - base) / n)                # p-chart control limits\nflagged = np.where(np.abs(pos - base) &gt; limit)[0]",
  "sources": [
   "D. C. Montgomery, <em>Introduction to Statistical Quality Control</em>, Wiley (any recent edition) — p-charts",
   "E. Breck, S. Cai, E. Nielsen, M. Salib &amp; D. Sculley, “The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction”, <em>IEEE International Conference on Big Data</em>, 2017",
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022"
  ]
 },
 "alerting-slos": {
  "example": "An SLO of 99.5% over 30 days and 10 million requests allows <strong>50,000</strong> failures — the error budget. If the error rate is now 2%, the budget burns <strong>4×</strong> faster than allowed and is gone in <strong>7.5 days</strong>. Alerting on burn rate, not on the raw error rate, pages people for what threatens the objective and nothing else.",
  "fails": [
   "An SLO nobody agreed to is just a threshold; the budget only works if it changes decisions, such as freezing risky releases.",
   "For ML, “success” must include quality, not only uptime: a fast, wrong prediction meets a latency SLO.",
   "Alerts on short windows alone are noisy, on long windows alone are late; the SRE workbook combines both."
  ],
  "code": "slo = 0.995                            # 99.5% of requests succeed within 200 ms, over 30 days\nrequests = 10_000_000\nbudget = (1 - slo) * requests          # failures you are allowed in the window\nerror_rate = 0.02                      # what is happening right now\nburn = error_rate / (1 - slo)          # how many times faster than allowed\ndays_left = 30 / burn                  # budget gone at this pace",
  "sources": [
   "<em>Site Reliability Engineering: How Google Runs Production Systems</em>, B. Beyer, C. Jones, J. Petoff &amp; N. R. Murphy (eds.), O’Reilly, 2016",
   "<em>The Site Reliability Workbook</em>, B. Beyer, N. R. Murphy, D. K. Rensin, K. Kawahara &amp; S. Thorne (eds.), O’Reilly, 2018 — “Alerting on SLOs”"
  ]
 },
 "shadow-scoring": {
  "example": "Champion at 90% accuracy, challenger at 91%, both scoring the same labelled requests. McNemar’s test looks only at the cases where they disagree. After <strong>2,000</strong> requests the p-value is <strong>0.65</strong> — no evidence either way. After <strong>20,000</strong> it is <strong>0.0009</strong>. Shadow mode is safe, but a one-point improvement needs a lot of traffic to show.",
  "fails": [
   "Shadow mode only sees the champion’s world: if the challenger’s decisions would change user behaviour, the shadow comparison cannot see it.",
   "Comparing on the requests that happen to get labels quickly can bias the result.",
   "A shadow model doubles serving cost while it runs; set an end date."
  ],
  "code": "from scipy.stats import binomtest\nrng = np.random.default_rng(3)\n\ndef shadow(n, p_champ=0.90, p_chal=0.91):           # both models score the same n labelled requests\n    champ = rng.random(n) &lt; p_champ\n    chal = np.where(rng.random(n) &lt; 0.5, champ, rng.random(n) &lt; p_chal)   # they agree half the time by construction\n    only_chal, only_champ = (chal &amp; ~champ).sum(), (champ &amp; ~chal).sum()\n    return binomtest(only_chal, only_chal + only_champ).pvalue           # McNemar's exact test\n\np_2k, p_20k = shadow(2_000), shadow(20_000)",
  "sources": [
   "T. G. Dietterich, “Approximate Statistical Tests for Comparing Supervised Classification Learning Algorithms”, <em>Neural Computation</em> 10(7), 1998 — McNemar’s test",
   "<em>Trustworthy Online Controlled Experiments</em>, R. Kohavi, D. Tang &amp; Y. Xu, Cambridge University Press, 2020",
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022"
  ]
 },
 "data-quality": {
  "example": "Six rows checked against five rules before they reach the model. Row count and freshness pass. Three fail: <strong>17%</strong> of ages are missing against a 5% limit, one age is <strong>230</strong>, and a third of incomes are missing. A gate that stops this batch costs a delayed run; letting it through costs silently wrong predictions.",
  "fails": [
   "Rules written once go stale; review thresholds when the data legitimately changes.",
   "Hard failures on every rule stop pipelines for trivia; separate blocking checks from warnings.",
   "Valid-looking data can still be wrong (a unit change from euros to cents passes a range check); compare distributions too."
  ],
  "code": "batch = pd.DataFrame({'age': [34, 51, None, 29, 230, 45],\n                      'income': [52_000, 61_000, 48_000, None, None, 75_000],\n                      'ts': pd.to_datetime(['2026-09-30 22:00'] * 6)})\nnow, expected_rows = pd.Timestamp('2026-10-01 09:00'), 6\nchecks = {\n    'row count': len(batch) &gt;= 0.5 * expected_rows,\n    'age nulls &lt;= 5%': batch.age.isna().mean() &lt;= 0.05,\n    'age in 0-120': batch.age.dropna().between(0, 120).all(),\n    'income nulls &lt;= 5%': batch.income.isna().mean() &lt;= 0.05,\n    'fresh within 24 h': (now - batch.ts.max()) &lt;= pd.Timedelta('24h'),\n}\nfailed = [name for name, ok in checks.items() if not ok]",
  "sources": [
   "E. Breck, N. Polyzotis, S. Roy, S. E. Whang &amp; M. Zinkevich, “Data Validation for Machine Learning”, <em>Proceedings of Machine Learning and Systems</em> 1, 2019",
   "S. Schelter et al., “Automating Large-Scale Data Quality Verification”, <em>Proceedings of the VLDB Endowment</em> 11(12), 2018",
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015"
  ]
 },
 "ml-pipelines": {
  "example": "Seven steps that take <strong>185</strong> minutes one after another. Run in parallel where dependencies allow, the pipeline still takes <strong>170</strong> — features and labels overlap, but everything waits for training. Reuse cached ingestion, validation and features and a retrain takes <strong>120</strong>. The critical path, not the number of workers, sets the time.",
  "fails": [
   "Caching is only safe when the cache key includes the code and data versions; otherwise stale outputs are reused silently.",
   "Pipelines that retrain automatically can also degrade automatically; keep an evaluation gate before deploy.",
   "A pipeline nobody can run locally is hard to debug; keep steps runnable on their own."
  ],
  "code": "minutes = {'ingest': 20, 'validate': 5, 'features': 40, 'labels': 15,\n           'train': 90, 'evaluate': 10, 'deploy': 5}\nneeds = {'validate': ['ingest'], 'features': ['validate'], 'labels': ['validate'],\n         'train': ['features', 'labels'], 'evaluate': ['train'], 'deploy': ['evaluate']}\n\ndef finish(step, cache=()):                         # earliest finish, with unlimited parallel workers\n    start = max((finish(d, cache) for d in needs.get(step, [])), default=0)\n    return start + (0 if step in cache else minutes[step])\n\ntotal = finish('deploy')\ncached = finish('deploy', cache={'ingest', 'validate', 'features'})   # retrain on cached features\nserial = sum(minutes.values())",
  "sources": [
   "D. Baylor et al., “TFX: A TensorFlow-Based Production-Scale Machine Learning Platform”, <em>KDD</em>, 2017",
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015",
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022"
  ]
 },
 "feature-stores": {
  "example": "Three training events, each joined to a 30-day order count. Joining the <em>latest</em> value gives <strong>5, 5, 4</strong>; a point-in-time join, taking the value as it was at each event, gives <strong>2, 5, 1</strong>. Two of three rows leaked the future. A model trained on the first version would look better in training than it can ever be live.",
  "fails": [
   "A feature store does not prevent leakage by itself; the point-in-time join has to be used for every training set.",
   "Online and offline values can still differ if they are computed by different code paths.",
   "For a handful of models a feature store can be more infrastructure than the problem needs."
  ],
  "code": "events = pd.DataFrame({'user': [1, 1, 2], 'ts': pd.to_datetime(['2026-03-01', '2026-03-10', '2026-03-05'])})\nfeats = pd.DataFrame({'user': [1, 1, 2, 2], 'ts': pd.to_datetime(['2026-02-20', '2026-03-08', '2026-03-01', '2026-03-09']),\n                      'orders_30d': [2, 5, 1, 4]})\nlatest = events.merge(feats.sort_values('ts').groupby('user').tail(1)[['user', 'orders_30d']], on='user')\nas_of = pd.merge_asof(events.sort_values('ts'), feats.sort_values('ts'), on='ts', by='user')   # point-in-time\nleaked = (latest.sort_values(['user', 'ts']).orders_30d.values != as_of.sort_values(['user', 'ts']).orders_30d.values).sum()",
  "sources": [
   "S. Kaufman, S. Rosset, C. Perlich &amp; O. Stitelman, “Leakage in Data Mining: Formulation, Detection, and Avoidance”, <em>ACM Transactions on Knowledge Discovery from Data</em> 6(4), 2012",
   "Feast documentation, “Point-in-time joins”, feast.dev",
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022"
  ]
 },
 "experiment-tracking": {
  "example": "Two configurations, five seeds each. The single best run is config B at <strong>0.853</strong> AUC, so B looks like the winner. Averaged over seeds, A is <strong>0.8446</strong> and B <strong>0.8450</strong>, with seed-to-seed spreads of 0.005 to 0.007. The difference is a twentieth of the noise; tracking is what lets you see that.",
  "fails": [
   "Reporting the best seed is selection on noise; report the mean and spread over seeds.",
   "Tracking every metric invites picking the one that looks good afterwards; decide the main metric first.",
   "A run log without the data version cannot be reproduced."
  ],
  "code": "runs = pd.DataFrame({'config': ['A'] * 5 + ['B'] * 5,\n                     'seed': list(range(5)) * 2,\n                     'auc': [0.842, 0.851, 0.838, 0.847, 0.845,      # five seeds of each config, made up\n                             0.849, 0.836, 0.853, 0.841, 0.846]})\nbest = runs.loc[runs.auc.idxmax()]\nby_config = runs.groupby('config').auc.agg(['mean', 'std'])",
  "sources": [
   "M. Zaharia et al., “Accelerating the Machine Learning Lifecycle with MLflow”, <em>IEEE Data Engineering Bulletin</em> 41(4), 2018",
   "X. Bouthillier et al., “Accounting for Variance in Machine Learning Benchmarks”, <em>Proceedings of Machine Learning and Systems</em> 3, 2021",
   "P. Henderson et al., “Deep Reinforcement Learning That Matters”, <em>AAAI</em>, 2018"
  ]
 },
 "ci-cd-ml": {
  "example": "A candidate model beats the champion overall, <strong>0.906</strong> against <strong>0.898</strong> accuracy on 20,000 holdout cases. But on the 1,000 enterprise customers it is <strong>4 points worse</strong>. The gate requires that no segment loses more than one point, so the candidate is blocked. An overall metric would have shipped it.",
  "fails": [
   "Slices with few examples are noisy; a gate on them needs a tolerance or a confidence interval, or it blocks at random.",
   "A fixed holdout used for every gate is slowly overfitted by repeated decisions against it; refresh it.",
   "Tests on the model alone miss pipeline bugs; test the data and the serving path too."
  ],
  "code": "holdout = pd.DataFrame({'segment': ['new', 'returning', 'enterprise'],\n                        'n': [8_000, 11_000, 1_000],\n                        'champion': [0.880, 0.910, 0.900],\n                        'candidate': [0.895, 0.918, 0.860]})      # accuracy per segment\noverall = lambda col: (holdout[col] * holdout.n).sum() / holdout.n.sum()\nbetter_overall = overall('candidate') &gt; overall('champion')\nworst_drop = (holdout.candidate - holdout.champion).min()\nship = better_overall and worst_drop &gt;= -0.01            # gate: no segment may lose more than one point",
  "sources": [
   "E. Breck, S. Cai, E. Nielsen, M. Salib &amp; D. Sculley, “The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction”, <em>IEEE International Conference on Big Data</em>, 2017",
   "D. Sato, A. Wider &amp; C. Windheuser, “Continuous Delivery for Machine Learning”, martinfowler.com, 2019",
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015"
  ]
 },
 "orchestration": {
  "example": "A task that fails transiently one time in five succeeds within three retries with probability <strong>99.84%</strong>. Spacing the retries at <strong>30, 60 and 120 seconds</strong> lets a struggling dependency recover instead of being hammered. And when a bug is fixed, a backfill re-runs the daily DAG for each of the last <strong>90</strong> days.",
  "fails": [
   "Retries only help transient failures; a bug fails four times instead of once.",
   "Retries without jitter synchronize clients into waves that can take a service down again.",
   "Backfills of non-idempotent tasks double-write; make each run safe to repeat."
  ],
  "code": "p_fail = 0.20                          # a task fails transiently one time in five\nretries = 3\np_success = 1 - p_fail ** (retries + 1)\nbackoff = [30 * 2 ** k for k in range(retries)]           # seconds between attempts: exponential\nbackfill_runs = 90                                         # a daily DAG re-run for the last 90 days",
  "sources": [
   "Apache Airflow documentation, airflow.apache.org — retries, scheduling and backfill",
   "M. Brooker, “Exponential Backoff and Jitter”, AWS Architecture Blog, 2015",
   "<em>Site Reliability Engineering: How Google Runs Production Systems</em>, B. Beyer, C. Jones, J. Petoff &amp; N. R. Murphy (eds.), O’Reilly, 2016"
  ]
 },
 "model-compression": {
  "example": "Prune 80% of a layer’s weights, keeping the largest fifth, and measure how much its output changes. If the weights are all of similar size, the output error is <strong>59%</strong> — there is nothing small to remove. If a few weights are large and most near zero, the error is <strong>11%</strong>. Compression works when a model is redundant, and how redundant it is has to be measured, not assumed.",
  "fails": [
   "Output error is not task accuracy; fine-tune after pruning and evaluate on the real task.",
   "Unstructured sparsity rarely speeds up standard hardware; structured pruning (whole channels or heads) or distillation usually pays off more.",
   "Compressed models can lose accuracy unevenly, hurting rare classes most."
  ],
  "code": "rng = np.random.default_rng(4)\nx = rng.normal(0, 1, (1_000, 256))                 # a batch of inputs\n\ndef prune_error(W, keep=0.20):                     # keep the largest 20% of weights by size\n    cut = np.quantile(np.abs(W), 1 - keep)\n    Wp = np.where(np.abs(W) &gt;= cut, W, 0)\n    return np.linalg.norm(x @ Wp - x @ W) / np.linalg.norm(x @ W)\n\neven = prune_error(rng.normal(0, 1, (256, 256)))            # weights all of similar size\npeaked = prune_error(rng.standard_t(1.5, (256, 256)))       # a few large weights and many near zero",
  "sources": [
   "S. Han, H. Mao &amp; W. J. Dally, “Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding”, <em>ICLR</em>, 2016",
   "G. Hinton, O. Vinyals &amp; J. Dean, “Distilling the Knowledge in a Neural Network”, arXiv:1503.02531, 2015",
   "J. Frankle &amp; M. Carbin, “The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks”, <em>ICLR</em>, 2019"
  ]
 },
 "quantization": {
  "example": "10,000 weights rounded to 8-bit integers with one scale for the tensor: <strong>4×</strong> less memory, and an average error of <strong>0.9%</strong> of a weight’s size. Add a single outlier 50 standard deviations out and the scale stretches to fit it; the average error jumps to <strong>12%</strong>. Outliers, not the bit-width itself, are what breaks naive quantization — which is why LLM.int8() treats them separately.",
  "fails": [
   "Per-tensor scales are the crude version; per-channel or per-group scales handle uneven weights much better.",
   "Activations are often harder to quantize than weights.",
   "Small average errors can still flip close decisions; evaluate the task metric, not the reconstruction error."
  ],
  "code": "rng = np.random.default_rng(5)\nw = rng.normal(0, 0.02, 10_000).astype(np.float32)\n\ndef int8_error(w):                                 # symmetric per-tensor INT8\n    scale = np.abs(w).max() / 127\n    q = np.clip(np.round(w / scale), -127, 127)\n    return np.abs(q * scale - w).mean() / np.abs(w).mean()\n\nerr = int8_error(w)\nw_out = w.copy(); w_out[0] = 1.0                   # one outlier weight, 50 standard deviations out\nerr_outlier = int8_error(w_out)\nmemory_saving = 32 / 8",
  "sources": [
   "B. Jacob et al., “Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference”, <em>CVPR</em>, 2018",
   "T. Dettmers, M. Lewis, Y. Belkada &amp; L. Zettlemoyer, “LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale”, <em>NeurIPS</em>, 2022"
  ]
 },
 "caching-layers": {
  "example": "A million keys whose popularity follows Zipf’s law. Caching just the top 1% — 10,000 keys — serves <strong>68%</strong> of requests. At 1 ms from cache and 50 ms from the model, the average falls to <strong>16.7 ms</strong>. Skewed traffic is why small caches work so well.",
  "fails": [
   "A cached prediction is only as fresh as its TTL; for fast-changing inputs a cache serves stale answers confidently.",
   "If traffic is not skewed — every request unique — a cache adds cost and gains nothing.",
   "Cache keys must include the model version, or a rollout keeps serving the old model’s answers."
  ],
  "code": "keys = 1_000_000\nrank = np.arange(1, keys + 1)\nshare = (1 / rank) / (1 / rank).sum()             # Zipf: the k-th most popular key gets traffic ~ 1/k\nhit_rate = share[: keys // 100].sum()             # cache the top 1% of keys\nlatency = hit_rate * 1 + (1 - hit_rate) * 50       # ms: 1 from cache, 50 from the model",
  "sources": [
   "L. Breslau, P. Cao, L. Fan, G. Phillips &amp; S. Shenker, “Web Caching and Zipf-like Distributions: Evidence and Implications”, <em>IEEE INFOCOM</em>, 1999",
   "<em>Designing Data-Intensive Applications</em>, M. Kleppmann, O’Reilly, 2017"
  ]
 },
 "auto-scaling": {
  "example": "1,200 requests a second at 80 ms each means <strong>96</strong> in flight (Little’s law). With 8 concurrent requests per replica and a 70% utilisation target, that needs <strong>18</strong> replicas. Kubernetes’ own rule gets there step by step: 10 replicas at 92% CPU against a 70% target become <strong>14</strong> on the next evaluation.",
  "fails": [
   "Scaling reacts after load arrives; with cold starts of tens of seconds, a spike is served by the replicas you already had.",
   "CPU is a poor signal for GPU or I/O-bound models; scale on queue length or concurrency.",
   "Scale-to-zero saves money at the price of a slow first request; not every endpoint can afford it."
  ],
  "code": "import math\nrps, latency_s, per_replica = 1_200, 0.080, 8       # traffic, time per request, concurrent requests per replica\nin_flight = rps * latency_s                         # Little's law\nreplicas = math.ceil(in_flight / (per_replica * 0.70))   # target 70% utilisation\ncurrent, cpu, target = 10, 0.92, 0.70\nhpa = math.ceil(current * cpu / target)             # Kubernetes HPA rule",
  "sources": [
   "Kubernetes documentation, “Horizontal Pod Autoscaling”, kubernetes.io — the replica formula",
   "J. D. C. Little, “A Proof for the Queuing Formula: L = λW”, <em>Operations Research</em> 9(3), 1961",
   "<em>Site Reliability Engineering: How Google Runs Production Systems</em>, B. Beyer, C. Jones, J. Petoff &amp; N. R. Murphy (eds.), O’Reilly, 2016"
  ]
 },
 "cost-governance": {
  "example": "A 2.50-dollar-an-hour GPU that can serve 400 predictions a second. At <strong>30%</strong> utilisation each 1,000 predictions cost <strong>$0.0058</strong>; at <strong>80%</strong>, <strong>$0.0022</strong> — <strong>2.7×</strong> cheaper on the same hardware. Utilisation is usually the biggest lever, before any model change.",
  "fails": [
   "Cost per prediction ignores what a prediction is worth; the cheapest model is not the best value.",
   "Pushing utilisation to the limit raises latency sharply (see Latency &amp; Throughput).",
   "Training, data and engineering time are often larger costs than serving."
  ],
  "code": "gpu_per_hour = 2.50                        # dollars, on demand\ncapacity = 400                             # predictions per second at full use\n\ndef cost_per_1k(utilisation):\n    return gpu_per_hour / (capacity * utilisation * 3600) * 1000\n\nlow, high = cost_per_1k(0.30), cost_per_1k(0.80)",
  "sources": [
   "FinOps Foundation, <em>FinOps Framework</em>, finops.org",
   "E. Strubell, A. Ganesh &amp; A. McCallum, “Energy and Policy Considerations for Deep Learning in NLP”, <em>ACL</em>, 2019",
   "<em>Designing Machine Learning Systems</em>, C. Huyen, O’Reilly, 2022"
  ]
 },
 "model-registry": {
  "example": "The fraud model’s v9 is promoted to production, and v8 is archived. It misbehaves; one rollback call later <strong>v8</strong> is live again and v9 is archived. Because the registry records which version is where, rolling back is a pointer change, not a rebuild.",
  "fails": [
   "Rollback is only instant if the old artifact and its environment still exist; keep them.",
   "Rolling back the model does not roll back the data or features it was trained on.",
   "Approval steps that are always clicked through give a false sense of control."
  ],
  "code": "registry = {'fraud': {'v7': 'archived', 'v8': 'production', 'v9': 'staging'}}\nhistory = ['v7', 'v8']                                   # production versions, oldest first\n\ndef promote(name, version):\n    reg = registry[name]\n    for v, stage in reg.items():\n        if stage == 'production': reg[v] = 'archived'\n    reg[version] = 'production'; history.append(version)\n\ndef rollback(name):\n    history.pop(); promote(name, history.pop())\n\npromote('fraud', 'v9')\nrollback('fraud')                                        # v9 misbehaves: one call back to v8\nlive = [v for v, s in registry['fraud'].items() if s == 'production']",
  "sources": [
   "MLflow documentation, “Model Registry”, mlflow.org",
   "M. Zaharia et al., “Accelerating the Machine Learning Lifecycle with MLflow”, <em>IEEE Data Engineering Bulletin</em> 41(4), 2018",
   "M. Vartak et al., “ModelDB: A System for Machine Learning Model Management”, <em>HILDA Workshop at SIGMOD</em>, 2016"
  ]
 },
 "lineage-tracking": {
  "example": "One raw data partition turns out to be corrupt. Following the lineage graph downstream finds <strong>6</strong> things built from it: the feature set, two models, two prediction tables and a retention dashboard. Without lineage the question “what did this break?” is answered by memory.",
  "fails": [
   "Lineage captured by hand goes out of date; it has to be recorded automatically by the tools that run the jobs.",
   "Coarse lineage (whole tables) over-reports the impact; row- or partition-level lineage is costlier but precise.",
   "Lineage shows what depends on what, not whether the result changed."
  ],
  "code": "edges = {'raw/2026-09-28': ['features/v12'], 'raw/2026-09-29': ['features/v12'],\n         'features/v12': ['model/fraud-v9', 'model/churn-v4'],\n         'model/fraud-v9': ['preds/fraud-0930'], 'model/churn-v4': ['preds/churn-0930', 'dashboard/retention']}\n\ndef downstream(node):                                    # everything built from a node\n    seen, stack = set(), [node]\n    while stack:\n        for nxt in edges.get(stack.pop(), []):\n            if nxt not in seen: seen.add(nxt); stack.append(nxt)\n    return sorted(seen)\n\naffected = downstream('raw/2026-09-29')                  # this partition turned out to be corrupt",
  "sources": [
   "OpenLineage specification, openlineage.io",
   "M. Vartak et al., “ModelDB: A System for Machine Learning Model Management”, <em>HILDA Workshop at SIGMOD</em>, 2016",
   "D. Sculley et al., “Hidden Technical Debt in Machine Learning Systems”, <em>Advances in Neural Information Processing Systems</em> 28, 2015"
  ]
 },
 "fairness-audits": {
  "example": "A credit model selects <strong>36%</strong> of group a and <strong>16%</strong> of group b: a disparate-impact ratio of <strong>0.44</strong>, far under the four-fifths rule. Among people who would repay, it approves <strong>75%</strong> of a and <strong>60%</strong> of b. When groups differ in base rates, no model can equalize all of these at once (Kleinberg, Mullainathan &amp; Raghavan 2017); an audit makes the choice explicit.",
  "fails": [
   "The four-fifths rule is a screening heuristic from U.S. employment guidance, not a definition of fairness.",
   "Removing the protected attribute does not remove its effect; proxies such as postcode carry it.",
   "Small groups give noisy rates; report confidence intervals."
  ],
  "code": "g = pd.DataFrame({'group': ['a', 'b'],\n                  'tp': [300, 120], 'fn': [100, 80],      # among people who would repay\n                  'fp': [60, 40], 'tn': [540, 760]})       # among people who would not\ng['selection'] = (g.tp + g.fp) / (g.tp + g.fn + g.fp + g.tn)\ng['tpr'] = g.tp / (g.tp + g.fn)\ng['fpr'] = g.fp / (g.fp + g.tn)\ndisparate_impact = g.selection[1] / g.selection[0]        # four-fifths rule: worry below 0.8",
  "sources": [
   "M. Hardt, E. Price &amp; N. Srebro, “Equality of Opportunity in Supervised Learning”, <em>NeurIPS</em>, 2016",
   "J. Kleinberg, S. Mullainathan &amp; M. Raghavan, “Inherent Trade-Offs in the Fair Determination of Risk Scores”, <em>ITCS</em>, 2017",
   "Uniform Guidelines on Employee Selection Procedures, 29 CFR § 1607.4(D), 1978 — the four-fifths rule"
  ]
 },
 "reproducibility": {
  "example": "A million float32 numbers summed in two different orders differ by <strong>0.00012</strong>. Nothing is wrong with either sum; floating-point addition is not associative, and parallel hardware changes the order. The same seed does give the same random numbers (<strong>True</strong>), but bit-identical training also needs the same order of operations.",
  "fails": [
   "Fixing seeds is necessary, not sufficient: library versions, hardware and non-deterministic GPU kernels change results too.",
   "Exact reproduction is not always the goal; reporting the spread over seeds shows whether a result is robust.",
   "Unversioned data makes every other control useless."
  ],
  "code": "x = np.random.default_rng(6).normal(0, 1, 1_000_000).astype(np.float32)\ns1 = x.sum()\ns2 = x[np.random.default_rng(7).permutation(len(x))].sum()   # same numbers, different order\norder_diff = abs(float(s1) - float(s2))\nsame_seed = np.random.default_rng(42).random(3).tolist() == np.random.default_rng(42).random(3).tolist()",
  "sources": [
   "J. Pineau et al., “Improving Reproducibility in Machine Learning Research”, <em>Journal of Machine Learning Research</em> 22(164), 2021",
   "O. E. Gundersen &amp; S. Kjensmo, “State of the Art: Reproducibility in Artificial Intelligence”, <em>AAAI</em>, 2018",
   "D. Goldberg, “What Every Computer Scientist Should Know About Floating-Point Arithmetic”, <em>ACM Computing Surveys</em> 23(1), 1991"
  ]
 },
 "incident-response": {
  "example": "A bad model goes live at 50 requests a second. If someone notices after 45 minutes and rolls back in 5 more, <strong>150,000</strong> requests are served by it. A circuit breaker that switches to a fallback when the error rate passes 5% over two minutes limits it to <strong>6,000</strong> — <strong>25×</strong> fewer. Detection time, not repair time, dominates.",
  "fails": [
   "ML failures are often silent — predictions are wrong but no error is raised — so breakers on error rates miss them; watch prediction distributions too.",
   "A fallback is only safe if it has been tested recently.",
   "Postmortems that end in “be more careful” change nothing; fix the system that let it through."
  ],
  "code": "rps = 50                                   # requests per second\nbad_from = 0                               # a bad model goes live at t = 0\ndetect_manual = 45 * 60                    # someone notices after 45 minutes\ndetect_breaker = 2 * 60                    # error rate &gt; 5% over a 2-minute window trips the breaker\nrollback = 5 * 60                          # manual rollback takes 5 minutes\nhit_manual = rps * (detect_manual + rollback)\nhit_breaker = rps * detect_breaker          # the breaker switches to the fallback at once",
  "sources": [
   "<em>Site Reliability Engineering: How Google Runs Production Systems</em>, B. Beyer, C. Jones, J. Petoff &amp; N. R. Murphy (eds.), O’Reilly, 2016 — “Postmortem Culture”",
   "<em>Release It! Design and Deploy Production-Ready Software</em>, M. T. Nygard, Pragmatic Bookshelf, 2007 — the circuit breaker",
   "S. Shankar, R. Garcia, J. M. Hellerstein &amp; A. G. Parameswaran, “Operationalizing Machine Learning: An Interview Study”, arXiv:2209.09125, 2022"
  ]
 }
};
/* The content standard's depth under a topic (js/topic-depth.js lays it out). */
function depthHtml(id) {
  const d = TOPIC_DEPTH[id];
  if (!d || typeof renderDepth !== 'function') return '';
  return renderDepth({ ...d, codeNote: 'Assumes <code>import numpy as np</code> and <code>import pandas as pd</code>. Each snippet carries its own example numbers; the comments say which are made up or simulated.' });
}
/* depth:end */

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
    <canvas id="packCanvas" role="img" aria-label="Model Packaging &amp; Containers: Interactive — packaging pipeline flow" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model packaging is the deployment equivalent of <a href="../stats/#cross-validation">cross-validation</a> — both enforce separation between what you build and where you test it. In markets, <a href="../stats/#walk-forward">backtesting discipline</a> enforces the same boundary.</div>
  ${depthHtml('model-packaging')}
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
    <canvas id="serveCanvas" role="img" aria-label="Serving Patterns: Interactive — compare serving patterns" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Online vs batch serving mirrors the <a href="../timeseries/#resampling">timeframe choice</a> in trading — intraday (real-time) vs daily/weekly (batch). Both force you to match your system's response time to the decision frequency.</div>
  ${depthHtml('serving-patterns')}
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
    <canvas id="canaryCanvas" role="img" aria-label="A/B &amp; Canary Rollouts: Interactive — canary traffic split" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Canary rollouts apply the same risk management as <a href="../markets/risk/#fixed-fractional">position sizing</a> — start small, scale up only when evidence confirms safety. The <a href="../stats/#bayesian-ab">Bayesian A/B framework</a> from The Toolkit directly applies to evaluating canary metrics.</div>
  ${depthHtml('ab-rollout')}
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
    <canvas id="latencyCanvas" role="img" aria-label="Latency &amp; Throughput: Interactive — latency distribution with batch size" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Batch Size</span><input type="range" id="latBatch" min="1" max="64" step="1" value="1"><span class="vd" id="latBatchV">1</span></div>
      <div class="cg"><span class="cl">p50</span><span class="vd" id="latP50" style="color:var(--accent)">—</span></div>
      <div class="cg"><span class="cl">p99</span><span class="vd" id="latP99" style="color:#e57373">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Latency percentiles work exactly like <a href="../stats/#distribution-shape">distribution shape analysis</a> — the tail matters more than the mean. In markets, the equivalent is <a href="../markets/risk/#tail-risk">tail risk in volatility</a>.</div>
  ${depthHtml('latency-throughput')}
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
    <canvas id="gpuCanvas" role="img" aria-label="GPU Inference: Interactive — GPU vs CPU throughput comparison" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> GPU vs CPU is a <a href="#cost-governance">cost governance</a> decision — the same risk/reward calculus as <a href="../markets/risk/#mean-variance">risk appetite</a> in portfolio construction. Spend more only when the marginal return justifies it.</div>
  ${depthHtml('gpu-inference')}
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
    <canvas id="driftCanvas" role="img" aria-label="Drift Detection in Production: Interactive — reference vs production distributions" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Drift detection in ML is the same problem as <a href="../stats/#data-drift">data drift analysis</a> in The Toolkit and <a href="../timeseries/#changepoint-detection">regime detection</a> in markets — the distribution has changed, and your old assumptions no longer hold.</div>
  ${depthHtml('drift-detection')}
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
    <canvas id="monitorCanvas" role="img" aria-label="Model Monitoring Dashboards: Interactive — monitoring dashboard simulation" height="260"></canvas>
  </div>
  <table class="mt">
    <thead><tr><th>Layer</th><th>Metrics</th><th>Alert When</th></tr></thead>
    <tbody>
      <tr><td>System</td><td>Latency, error rate, throughput</td><td>p99 &gt; SLO or error rate &gt; 1%</td></tr>
      <tr><td>Data</td><td>Feature distributions, null rates</td><td>PSI &gt; 0.2 or null rate spikes</td></tr>
      <tr><td>Model</td><td>Prediction distribution, confidence</td><td>Distribution shift or low confidence</td></tr>
    </tbody>
  </table>
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML monitoring dashboards are structured like trading dashboards — layered views from system health down to individual signal quality. The <a href="../stats/#learning-curves">learning curve</a> concept extends to tracking model performance over time in production.</div>
  ${depthHtml('model-monitoring')}
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
    <canvas id="sloCanvas" role="img" aria-label="Alerting &amp; SLOs: Interactive — error budget burn rate" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">SLO Target %</span><input type="range" id="sloTarget" min="90" max="100" step="0.1" value="99.5"><span class="vd" id="sloTargetV">99.5%</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Error budgets work like <a href="../markets/risk/#drawdown-analysis">drawdown limits</a> in trading — a predefined loss tolerance that triggers defensive action when consumed. The statistical foundation is the same <a href="../stats/#confidence-intervals">confidence interval</a> logic.</div>
  ${depthHtml('alerting-slos')}
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
    <canvas id="shadowCanvas" role="img" aria-label="Shadow Mode &amp; Champion/Challenger: Interactive — champion vs challenger comparison" height="260"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Shadow scoring is <a href="../stats/#walk-forward">walk-forward validation</a> running live. In markets, <a href="../sandbox/markets/index.html#paper-trading">paper trading</a> serves the same purpose — test with real data without real consequences.</div>
  ${depthHtml('shadow-scoring')}
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
    <canvas id="dqCanvas" role="img" aria-label="Data Quality Gates: Interactive — data quality pipeline flow" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Data quality gates are the production equivalent of <a href="../stats/#missing-data">missing data strategies</a> — catching the problem before it corrupts your analysis. In markets, <a href="../stats/#survivorship-bias">data hygiene</a> (adjusting for splits, dividends, survivorship) serves the same protective role.</div>
  ${depthHtml('data-quality')}
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
    <canvas id="pipeCanvas" role="img" aria-label="ML Pipelines: Interactive — ML pipeline DAG" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML pipelines enforce the same disciplined workflow as <a href="../stats/#cross-validation">cross-validation</a> — each step has defined inputs and outputs, preventing data leakage between stages.</div>
  ${depthHtml('ml-pipelines')}
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
    <canvas id="featCanvas" role="img" aria-label="Feature Stores: Interactive — feature store architecture" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Feature stores solve training-serving skew just as <a href="../stats/#survivorship-bias">survivorship bias prevention</a> solves backtesting skew — both ensure the data you test on matches reality.</div>
  ${depthHtml('feature-stores')}
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
    <canvas id="expCanvas" role="img" aria-label="Experiment Tracking: Interactive — experiment comparison table" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Experiment tracking is the ML version of a <a href="../markets/psychology/#hindsight-bias">trading journal</a> — systematic logging that turns isolated attempts into cumulative learning. The <a href="../stats/#comparing-runs">comparing runs</a> framework from The Toolkit gives you the statistical tests to compare tracked experiments.</div>
  ${depthHtml('experiment-tracking')}
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
    <canvas id="cicdCanvas" role="img" aria-label="CI/CD for ML: Interactive — CI/CD pipeline stages" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> CI/CD gates are automated <a href="../stats/#effect-size">significance tests</a> — the model must prove it's better before shipping. The same "don't trust your intuition, trust the numbers" principle that <a href="../markets/psychology/#overconfidence">cognitive bias awareness</a> teaches.</div>
  ${depthHtml('ci-cd-ml')}
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
    <canvas id="orchCanvas" role="img" aria-label="Orchestration &amp; Scheduling: Interactive — DAG dependency graph" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Orchestration DAGs structure ML workflows the same way <a href="../ml-math/#backprop">computation graphs</a> structure neural networks — directed, acyclic, and dependency-ordered. In markets, systematic trading rules follow the same sequential logic.</div>
  ${depthHtml('orchestration')}
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
    <canvas id="compressCanvas" role="img" aria-label="Model Compression: Interactive — pruning vs accuracy tradeoff" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Sparsity %</span><input type="range" id="compSparsity" min="0" max="99" step="1" value="50"><span class="vd" id="compSparsityV">50%</span></div>
      <div class="cg"><span class="cl">Accuracy</span><span class="vd" id="compAcc" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model compression is <a href="../stats/#feature-correlation">feature selection</a> applied to weights — remove what's redundant to keep what matters. In markets, <a href="../essays/#essay-signal">signal-to-noise filtering</a> does the same: strip the noise, keep the signal.</div>
  ${depthHtml('model-compression')}
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
    <canvas id="quantCanvas" role="img" aria-label="Quantization: Interactive — precision vs accuracy vs speed" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Quantization trades precision for speed — the same tradeoff as <a href="../llm/#sampling">sampling temperature</a> in LLMs (precision vs diversity) or <a href="../timeseries/#resampling">timeframe compression</a> in charts (detail vs overview).</div>
  ${depthHtml('quantization')}
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
    <canvas id="cacheCanvas" role="img" aria-label="Caching &amp; Prediction Stores: Interactive — cache hit rate vs latency" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Cache Hit Rate %</span><input type="range" id="cacheHit" min="0" max="100" step="1" value="70"><span class="vd" id="cacheHitV">70%</span></div>
      <div class="cg"><span class="cl">Avg Latency</span><span class="vd" id="cacheLatV" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Prediction caching is memoization at system scale. In markets, <a href="../markets/charts/#support-resistance">precomputed support/resistance levels</a> serve the same purpose — calculate once, reference many times.</div>
  ${depthHtml('caching-layers')}
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
    <canvas id="scaleCanvas" role="img" aria-label="Auto-Scaling Endpoints: Interactive — replica count vs traffic" height="260"></canvas>
    <div class="ctrl">
      <div class="cg"><span class="cl">Traffic Load</span><input type="range" id="scaleLoad" min="0" max="100" step="1" value="50"><span class="vd" id="scaleLoadV">50%</span></div>
      <div class="cg"><span class="cl">Replicas</span><span class="vd" id="scaleReps" style="color:var(--accent)">—</span></div>
    </div>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Auto-scaling is dynamic <a href="../markets/risk/#volatility-sizing">position sizing</a> for infrastructure — scale up exposure when opportunity (traffic) increases, scale down when it drops. The <a href="../stats/#monte-carlo">Monte Carlo</a> approach helps simulate traffic scenarios for capacity planning.</div>
  ${depthHtml('auto-scaling')}
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
    <canvas id="costCanvas" role="img" aria-label="Cost Governance: Interactive — cost breakdown by category" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Cost governance applies the same <a href="../stats/#sharpe-ratio">risk-adjusted return</a> thinking to infrastructure — maximise model value per dollar spent, just as transaction cost analysis measures trading efficiency.</div>
  ${depthHtml('cost-governance')}
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
    <canvas id="regCanvas" role="img" aria-label="Model Registry &amp; Versioning: Interactive — model lifecycle states" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Model registries version models the way <a href="#lineage-tracking">lineage tracking</a> versions data — both create audit trails. In markets, <a href="../markets/psychology/#hindsight-bias">strategy journaling</a> serves the same purpose: versioned records of what you deployed and why.</div>
  ${depthHtml('model-registry')}
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
    <canvas id="lineageCanvas" role="img" aria-label="Lineage Tracking: Interactive — lineage graph" height="260"></canvas>
  </div>
  <div class="callout bridge"><strong>Pattern bridge:</strong> Lineage tracking is the ML equivalent of <a href="../ml-math/#backprop">backpropagation</a> for accountability — tracing effects back to causes. In markets, <a href="../markets/risk/#return-attribution">performance attribution</a> traces returns back to specific decisions.</div>
  ${depthHtml('lineage-tracking')}
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
    <canvas id="fairCanvas" role="img" aria-label="Fairness Audits: Interactive — fairness metrics across groups" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Fairness audits apply <a href="../stats/#confidence-intervals">confidence intervals</a> per subgroup — the same statistical rigour, applied to equity. In markets, <a href="../markets/psychology/#status-quo-bias">behavioral bias</a> recognition teaches the same lesson: your defaults aren't neutral.</div>
  ${depthHtml('fairness-audits')}
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
    <canvas id="reproCanvas" role="img" aria-label="Reproducibility: Interactive — reproducibility checklist" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> Reproducibility in ML is the same discipline as <a href="../stats/#walk-forward">walk-forward validation</a> — if you can't reproduce it, you can't trust it. In markets, <a href="../stats/#survivorship-bias">backtest reproducibility</a> faces the same challenge with data versioning.</div>
  ${depthHtml('reproducibility')}
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
    <canvas id="incidentCanvas" role="img" aria-label="Incident Response for ML: Interactive — incident response decision tree" height="260"></canvas>
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
  <div class="callout bridge"><strong>Pattern bridge:</strong> ML incident response mirrors <a href="../markets/risk/#stop-losses">stop-loss discipline</a> in trading — predefined rules that limit damage when things go wrong. The <a href="../stats/#power-analysis">power analysis</a> framework helps design monitoring that catches problems early enough to act.</div>
  ${depthHtml('incident-response')}
  <div class="topic-nav" id="nav-incident-response"></div>
</div>`;
}
