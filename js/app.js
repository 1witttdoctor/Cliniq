// ────────────────────────────────────────────────
// STATE
// ────────────────────────────────────────────────
let currentTopicId = null;

let S = {
  pts: 0, ddxPts: 0,
  learnDone: false, learnLayer: 0,
  severity: '',
  usedActions: new Set(),
  ddxAnswered: 0,
  ddxDone: false,
  twistShown: false,
  vit: [], pressure: 0, deteriorated: false, harmedByTreatment: false, openPanel: null,
  learnChecks: {},
  log: [],          // { type, picked, correct, q, fb, fa }
  ddxLog: [],       // { name, correct, picked }
};

const QTYPE_LABELS = { history: 'History-taking', exam: 'Examination', labs: 'Labs', imaging: 'Imaging', treat: 'Treatment' };

// ────────────────────────────────────────────────
// LOCAL STATS  (localStorage, no backend/account)
// ────────────────────────────────────────────────
const STATS_KEY = 'cliniq_stats_v1';

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { topics: {} };
}

function saveStats(stats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) {}
}

function statsTopic(stats, id) {
  if (!stats.topics[id]) stats.topics[id] = { completed: false, wrongByType: {} };
  return stats.topics[id];
}

function recordAnswer(topicId, type, wasCorrect) {
  const stats = loadStats();
  const t = statsTopic(stats, topicId);
  if (!wasCorrect) t.wrongByType[type] = (t.wrongByType[type] || 0) + 1;
  saveStats(stats);
}

function recordCaseCompleted(topicId) {
  const stats = loadStats();
  statsTopic(stats, topicId).completed = true;
  saveStats(stats);
}

function weakestFocusArea() {
  const stats = loadStats();
  const totals = {};
  Object.values(stats.topics).forEach(t => {
    Object.entries(t.wrongByType || {}).forEach(([type, n]) => {
      totals[type] = (totals[type] || 0) + n;
    });
  });
  let best = null;
  Object.entries(totals).forEach(([type, n]) => {
    if (n >= 2 && (!best || n > best.n)) best = { type, n };
  });
  return best;
}

// ────────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────────
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  // Screen-aware ambient: home = body map (no DNA), reading screens = calm, topic = full
  document.body.classList.remove('screen-home', 'screen-case', 'screen-review', 'screen-learn', 'reading');
  if (id === 'home') document.body.classList.add('screen-home');
  else if (id === 'case') document.body.classList.add('screen-case', 'reading');
  else if (id === 'review') document.body.classList.add('screen-review', 'reading');
  else if (id === 'learn') document.body.classList.add('screen-learn', 'reading');
  if (id !== 'case') {
    if (caseECGRAF) { cancelAnimationFrame(caseECGRAF); caseECGRAF = null; }
    stopClock();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ────────────────────────────────────────────────
// HOME
// ────────────────────────────────────────────────
function goHome() {
  currentTopicId = null;
  document.getElementById('nav-meta').textContent = 'Clinical reasoning';
  renderHome();
  show('home');
}

function renderHome() {
  // focus callout
  const focus = weakestFocusArea();
  const callout = document.getElementById('focus-callout');
  if (focus) {
    callout.style.display = 'flex';
    callout.innerHTML = `
      <span class="focus-ico">${icon('branch')}</span>
      <div>
        <div class="focus-title">Focus area</div>
        <div class="focus-body">You've missed <strong>${focus.n} ${QTYPE_LABELS[focus.type] || focus.type}</strong> questions across your cases. Pay extra attention to that step next time.</div>
      </div>`;
  } else {
    callout.style.display = 'none';
    callout.innerHTML = '';
  }

  renderAnatomy();
}

// ────────────────────────────────────────────────
// ANATOMY SCROLL — the body is the navigation.
// Sections run top-to-bottom in anatomical order;
// the figure pins and the active organ lights up.
// ────────────────────────────────────────────────
const REGIONS = [
  { organ: 'brain',   system: 'Neurology',   label: 'The brain',   cy: 42,
    teaches: 'Stroke, seizures and the localising signs that tell you where the lesion is.' },
  { organ: 'lungs',   system: 'Respiratory', label: 'The lungs',   cy: 150,
    teaches: 'Breathlessness, gas exchange, and telling an airway problem from a pump problem.' },
  { organ: 'heart',   system: 'Cardiology',  label: 'The heart',   cy: 168,
    teaches: 'Pump failure, chest pain, and reading the circulation from the bedside.' },
  { organ: 'liver',   system: 'Hepatology',  label: 'The liver',   cy: 228,
    teaches: 'Jaundice, deranged LFTs, and the failing liver.' },
  { organ: 'kidneys', system: 'Renal',       label: 'The kidneys', cy: 268,
    teaches: 'Falling filtration, fluid balance and the electrolytes that kill.' },
];

function anatomyFigure() {
  return `
  <svg class="anat-svg" id="anat-svg" viewBox="0 0 200 470" aria-hidden="true">
    <g class="body">
      <ellipse cx="100" cy="44" rx="27" ry="31"/>
      <path d="M92,74 h16 v14 h-16 z"/>
      <path d="M100,86 C126,86 142,98 146,116 L152,168 L150,236 C150,262 142,286 138,300 L62,300 C58,286 50,262 50,236 L48,168 L54,116 C58,98 74,86 100,86 Z"/>
      <path d="M56,112 C40,120 32,146 29,178 C27,202 27,224 29,242 L43,242 C41,222 41,200 43,178 C45,152 50,130 60,120 Z"/>
      <path d="M144,112 C160,120 168,146 171,178 C173,202 173,224 171,242 L157,242 C159,222 159,200 157,178 C155,152 150,130 140,120 Z"/>
      <path d="M66,300 L60,380 L58,450 L82,450 L84,380 L96,306 Z"/>
      <path d="M134,300 L140,380 L142,450 L118,450 L116,380 L104,306 Z"/>
    </g>

    <g class="organ" data-organ="brain">
      <path d="M100,26 C88,26 80,33 80,42 C80,52 88,60 100,60 C112,60 120,52 120,42 C120,33 112,26 100,26 Z"/>
      <path class="det" d="M100,27 V59 M88,32 C93,37 93,45 88,52 M112,32 C107,37 107,45 112,52"/>
    </g>

    <g class="organ" data-organ="lungs">
      <path d="M92,120 C78,122 70,140 68,164 C66,182 70,196 80,197 C89,198 92,188 93,172 C94,152 94,132 92,120 Z"/>
      <path d="M108,120 C122,122 130,140 132,164 C134,182 130,196 120,197 C111,198 108,188 107,172 C106,152 106,132 108,120 Z"/>
      <path class="det" d="M86,132 C82,146 80,162 80,178 M114,132 C118,146 120,162 120,178"/>
    </g>

    <g class="organ" data-organ="heart">
      <path d="M100,150 C96,142 84,143 82,153 C80,164 90,176 100,186 C110,176 120,164 118,153 C116,143 104,142 100,150 Z"/>
      <path class="det" d="M100,152 V184 M86,158 C92,162 108,162 114,158"/>
    </g>

    <g class="organ" data-organ="liver">
      <path d="M62,212 C82,206 112,208 120,216 C126,222 120,238 106,242 C88,247 68,240 62,230 C58,224 58,214 62,212 Z"/>
      <path class="det" d="M96,209 C98,222 98,234 96,242"/>
    </g>

    <g class="organ" data-organ="kidneys">
      <path d="M78,254 C70,254 65,262 66,272 C67,282 74,286 80,281 C86,276 85,256 78,254 Z"/>
      <path d="M122,254 C130,254 135,262 134,272 C133,282 126,286 120,281 C114,276 115,256 122,254 Z"/>
      <path class="det" d="M79,262 C83,266 83,272 79,276 M121,262 C117,266 117,272 121,276"/>
    </g>
  </svg>`;
}

/* Systems with cases come first — the home page should never open on
   an empty state. Empty systems keep their anatomical order behind them. */
let VIEW_REGIONS = REGIONS;

function orderedRegions() {
  const has = new Set(Object.values(window.TOPICS || {}).map(t => t.system));
  return [...REGIONS].sort((a, b) => (has.has(b.system) ? 1 : 0) - (has.has(a.system) ? 1 : 0));
}

function renderAnatomy() {
  const stage = document.getElementById('anat-figure');
  if (!stage) return;
  VIEW_REGIONS = orderedRegions();
  stage.innerHTML = anatomyFigure();

  const bySystem = {};
  Object.values(window.TOPICS || {}).forEach(t => (bySystem[t.system] = bySystem[t.system] || []).push(t));

  document.getElementById('anat-sections').innerHTML = VIEW_REGIONS.map((r, i) => {
    const cases = bySystem[r.system] || [];
    const body = cases.length
      ? cases.map(t => `
          <button class="anat-case" onclick="selectTopic('${t.id}')">
            <span class="ac-title">${t.title}</span>
            <span class="ac-patient">${t.patient.name} · ${t.patient.meta.split('·')[0].trim()}</span>
            <span class="ac-cc">${t.patient.cc.replace(/^"|"$/g, '')}</span>
            <span class="ac-go">Start the case →</span>
          </button>`).join('')
      : `<div class="anat-soon">Cases in development</div>`;
    return `
      <section class="anat-sec${cases.length ? '' : ' is-soon'}" data-i="${i}">
        <span class="anat-sys">${r.system}</span>
        <h2 class="anat-h">${r.label}</h2>
        <p class="anat-teach">${r.teaches}</p>
        ${body}
      </section>`;
  }).join('');

  setActiveRegion(0);
  observeSections();
}

function setActiveRegion(i) {
  const r = VIEW_REGIONS[i];
  if (!r) return;
  const svg = document.getElementById('anat-svg');
  if (!svg) return;
  svg.querySelectorAll('.organ').forEach(g =>
    g.classList.toggle('on', g.dataset.organ === r.organ));
  // drift the figure so the active organ settles toward the centre
  svg.style.transform = `translateY(${(200 - r.cy) * 0.22}px) scale(1.05)`;
  const cap = document.getElementById('anat-caption');
  if (cap) cap.textContent = r.label;
}

let anatObserver = null;
function observeSections() {
  if (anatObserver) anatObserver.disconnect();
  const secs = [...document.querySelectorAll('.anat-sec')];
  if (!secs.length) return;
  anatObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActiveRegion(Number(e.target.dataset.i));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  secs.forEach(s => anatObserver.observe(s));
}

// ── The live case dashboard on the home screen ──
// Normalised cardiac waveform over one cycle t in [0,1). Sum of gaussians (P,Q,R,S,T).
function ecgWave(t) {
  const g = (c, w, a) => a * Math.exp(-((t - c) * (t - c)) / (2 * w * w));
  return g(0.17, 0.022, 0.14)   // P
       - g(0.32, 0.012, 0.10)   // Q
       + g(0.36, 0.010, 1.00)   // R
       - g(0.40, 0.014, 0.26)   // S
       + g(0.62, 0.040, 0.30);  // T
}

function drawECG(canvas, phase, opts) {
  opts = opts || {};
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr; canvas.height = h * dpr;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // Faster heart rate = shorter cycle = tighter complexes on the strip.
  const mid = h * 0.58, amp = h * 0.40;
  const cycle = opts.cycle || 118;
  const col = opts.color || '#ffb84d';
  ctx.lineWidth = 1.7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.strokeStyle = col;
  ctx.shadowColor = opts.glow || 'rgba(255,184,77,0.5)'; ctx.shadowBlur = 6;
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const t = ((((x + phase) % cycle) + cycle) % cycle) / cycle;
    const y = mid - ecgWave(t) * amp;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// ────────────────────────────────────────────────
// TOPIC SELECT
// ────────────────────────────────────────────────
function paintIcons(root) {
  (root || document).querySelectorAll('[data-ic]').forEach(el => {
    if (!el.firstChild) el.innerHTML = icon(el.dataset.ic);
  });
}

function selectTopic(id) {
  const topic = window.TOPICS[id];
  if (!topic) return;
  currentTopicId = id;

  document.getElementById('nav-meta').textContent = topic.navMeta;
  document.getElementById('topic-eyebrow').textContent = `Cliniq · ${topic.system} · Topic ${String(topic.number).padStart(2, '0')}`;
  document.getElementById('topic-title').textContent = topic.title;
  document.getElementById('topic-desc').textContent = topic.desc;
  document.getElementById('topic-tags').innerHTML = topic.tags.map(t => `<span class="tag ${t.cls}">${t.label}</span>`).join('');

  paintIcons();
  show('topic');
}

// ────────────────────────────────────────────────
// LEARN — concepts as data, not hand-written HTML
//
// A layer is { kicker, title, blocks: [...] }. Each block is a typed
// object the renderer below turns into markup, so a new topic is
// written as content and never as tags.
// ────────────────────────────────────────────────

function lnText(b)  { return `<p class="ln-p">${b.t}</p>`; }

function lnPoint(b) {
  return `<div class="ln-point ${b.hi ? 'hi' : ''}">
            <div class="ln-point-t">${b.t}</div>
            ${b.d ? `<div class="ln-point-d">${b.d}</div>` : ''}
          </div>`;
}

/* A causal chain — the shape almost every one of these topics actually
   has. Reading "A drives B drives C" as a list loses the arrow. */
function lnChain(b) {
  return `<div class="ln-chain">
    ${b.t ? `<div class="col-label">${b.t}</div>` : ''}
    <div class="ln-steps">
      ${b.steps.map((st, i) => `
        <div class="ln-step">
          <span class="ln-step-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="ln-step-t">${st}</span>
        </div>`).join('')}
    </div>
  </div>`;
}

function lnCompare(b) {
  const col = (c, side) => `
    <div class="ln-col">
      <div class="ln-col-h ${side}">${c.h}</div>
      ${c.items.map(i => `<div class="ln-col-i">${i}</div>`).join('')}
    </div>`;
  return `<div class="ln-compare">${col(b.a, 'left')}${col(b.b, 'right')}</div>`;
}

/* Same grammar as the case screen: commit first, then read why.
   Lower stakes here, but the habit is the point. */
function lnCheck(b, li, bi) {
  const key = li + '-' + bi;
  const done = S.learnChecks[key];
  return `<div class="ln-check" id="chk-${key}">
    <div class="col-label">Check yourself</div>
    <div class="ln-check-q">${b.q}</div>
    <div class="ln-opts">
      ${b.opts.map((o, i) => `
        <button class="ln-opt ${done ? (o.ok ? 'ok' : (done.i === i ? 'no' : 'dim')) : ''}"
                ${done ? 'disabled' : ''} onclick="learnCheck(${li}, ${bi}, ${i})">
          <span class="ln-opt-t">${o.t}</span>
          ${done && o.ok ? '<span class="ln-opt-tag">Correct</span>' : ''}
          ${done && !o.ok && done.i === i ? '<span class="ln-opt-tag">Your pick</span>' : ''}
        </button>`).join('')}
    </div>
    <div class="ln-why ${done ? 'show' : ''}">${b.why}</div>
  </div>`;
}

const LN_BLOCKS = { text: lnText, point: lnPoint, chain: lnChain, compare: lnCompare, check: lnCheck };

function renderLearnBlocks(blocks, li) {
  return blocks.map((b, bi) => (LN_BLOCKS[b.k] || lnText)(b, li, bi)).join('');
}

function learnCheck(li, bi, i) {
  const key = li + '-' + bi;
  if (S.learnChecks[key]) return;
  const layer = window.TOPICS[currentTopicId].layers[li];
  const blk = layer.blocks[bi];
  S.learnChecks[key] = { i, ok: !!blk.opts[i].ok };
  document.getElementById('chk-' + key).outerHTML = lnCheck(blk, li, bi);
}

function startLearn() {
  S.learnLayer = 0;
  S.learnChecks = {};
  const topic = window.TOPICS[currentTopicId];
  document.getElementById('ln-ctx').textContent = topic.system + ' · ' + topic.title;
  show('learn');
  renderLayer(0);
}

function renderLayerNav() {
  const layers = window.TOPICS[currentTopicId].layers;
  document.getElementById('ln-nav').innerHTML = layers.map((L, i) => `
    <button class="onav ${i === S.learnLayer ? 'on' : ''} ${i < S.learnLayer ? 'done' : ''}"
            onclick="renderLayer(${i})">
      <span>${L.kicker}</span>
      ${i < S.learnLayer ? `<span class="onav-tick">${icon('check')}</span>` : ''}
    </button>`).join('');
}

function renderLayer(i) {
  const layers = window.TOPICS[currentTopicId].layers;
  const L = layers[i];
  S.learnLayer = i;
  document.getElementById('ln-prog').textContent = `Layer ${i + 1} of ${layers.length}`;

  const last = i === layers.length - 1;
  document.getElementById('ln-mid').innerHTML = `
    <div class="ws-head"><span class="ws-kicker">${L.kicker}</span></div>
    <h2 class="ws-stem">${L.title}</h2>
    <div class="ln-body">${renderLearnBlocks(L.blocks, i)}</div>
    <div class="ws-foot">
      ${i > 0 ? `<button class="btn-ghost" onclick="renderLayer(${i - 1})">Back</button>` : ''}
      <button class="btn-go" onclick="${last ? 'startCase()' : `renderLayer(${i + 1})`}">
        ${last ? 'Start the case' : 'Next layer'}
      </button>
    </div>`;

  renderLayerNav();
  document.getElementById('screen-learn').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ────────────────────────────────────────────────
// COCKPIT — case engine
// ────────────────────────────────────────────────

/* Pick a glyph from the wording of an order, so new cases need no
   icon authoring. First rule that matches wins — keep specific
   phrases above the general ones. */
const ICON_RULES = [
  [/coronary angiograph|cardiac cath/i,                                   'heart'],
  [/\becg\b|electrocardiogram|telemetry|rhythm strip|\bekg\b/i,           'ecg'],
  [/\bv\/?q\b|ventilation[- ]perfusion|perfusion scan/i,                     'lungs'],
  [/\bct\b|computed tomograph|\bctpa\b|\bcta\b/i,                          'ct'],
  [/echo|ultrasound|\btte\b|\btoe\b|doppler|sonograph/i,                  'ultrasound'],
  [/x-?ray|\bcxr\b|radiograph|\bkub\b/i,                                  'xray'],
  [/urinalysis|urine|urinary|\bfena\b|catheter|dipstick/i,                'droplet'],
  [/microscop|casts|sediment|biopsy|blood film|gram stain|culture/i,      'microscope'],
  [/troponin|\bbnp\b|natriuretic|\bfbc\b|full blood|\bu&e\b|electrolyte|lactate|creatinine|urea|\blft\b|liver function|\babg\b|blood gas|\bcrp\b|d-?dimer|serum|bloods/i, 'tube'],
  [/oxygen|non-?rebreather|nasal cannula|\bniv\b|bipap|cpap|ventilat|intubat|nebulis|nebuliz|inhaler|airway/i, 'oxygen'],
  [/crystalloid|saline|hartmann|fluid bolus|\biv fluid|infusion|noradrenaline|norepinephrine|dobutamine|vasopressor/i, 'iv'],
  [/inject|subcutaneous|\bim\b |heparin|enoxaparin|thromboly/i,           'syringe'],
  [/blood pressure|\bbp\b|haemodynamic|hemodynamic/i,                     'cuff'],
  [/auscultat|palpat|percuss|\bjvp\b|examin|inspect|bedside/i,            'stethoscope'],
  [/pulmonary|\bpe\b|lung|respirat|pneumo|chest wall/i,                   'lungs'],
  [/ask|enquire|history|pillows|onset|questionn/i,                        'clipboard'],
  [/furosemide|diuretic|tablet|\bpo\b|oral|dose|mg\b|start .*(pril|olol|statin|zosin)/i, 'pill'],
];
const ICON_FALLBACK = { history: 'clipboard', exam: 'stethoscope', labs: 'tube', imaging: 'xray', treat: 'pill' };

function iconFor(text, qtype) {
  for (const [re, name] of ICON_RULES) if (re.test(text)) return name;
  return ICON_FALLBACK[qtype] || 'clipboard';
}

// ── vitals ───────────────────────────────────────
const VITAL_UNITS = { BP: 'mmHg', HR: 'bpm', RR: '/min', 'SpO₂': '%', Temp: '°C' };

function vitalNum(v) {
  const m = String(v).match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

/* Strip the unit out of the stored value so it can sit under the number
   the way a real monitor prints it. */
function normVital(v) {
  return {
    lab: v.l,
    val: String(v.v).replace(/\s*(%|°C|mmHg|bpm)\s*$/i, '').trim(),
    unit: VITAL_UNITS[v.l] || '',
    level: v.n ? 'crit' : v.w ? 'warn' : '',
    trend: v.tr || '',
  };
}

/* Turn the live vitals into the clinical words a doctor would use.
   Direction matters — 88/60 and 168/102 are both "abnormal BP" but
   they mean opposite things. */
function considerations(vitals) {
  const out = [];
  for (const v of vitals) {
    const n = vitalNum(v.val);
    if (isNaN(n)) continue;
    if (v.lab === 'BP')        { if (n < 90) out.push('Hypotension'); else if (n > 140) out.push('Hypertension'); }
    else if (v.lab === 'HR')   { if (n > 100) out.push('Tachycardia'); else if (n < 60) out.push('Bradycardia'); }
    else if (v.lab === 'RR')   { if (n > 20) out.push('Tachypnoea'); }
    else if (v.lab === 'SpO₂') { if (n < 92) out.push('Hypoxaemia'); }
    else if (v.lab === 'Temp') { if (n >= 38) out.push('Pyrexia'); else if (n < 36) out.push('Hypothermia'); }
  }
  return out;
}

function renderVitals() {
  document.getElementById('vitals-row').innerHTML = S.vit.map(v => `
    <div class="vital ${v.level}">
      <div class="v-lab">${v.lab}</div>
      <div class="v-val">${v.val}${v.trend ? `<span class="v-trend">${v.trend}</span>` : ''}</div>
      <div class="v-unit">${v.unit}</div>
    </div>`).join('');
}

// ── clock ────────────────────────────────────────
let caseTimer = null, caseSec = 0;

function fmtClock(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
}

function startClock() {
  clearInterval(caseTimer);
  caseSec = 0;
  document.getElementById('sim-clock').textContent = '00:00';
  caseTimer = setInterval(() => {
    caseSec++;
    const el = document.getElementById('sim-clock');
    if (el) el.textContent = fmtClock(caseSec);
  }, 1000);
}
function stopClock() { clearInterval(caseTimer); caseTimer = null; }

// ── monitor trace ────────────────────────────────
let caseECGRAF = null;

function startCaseECG() {
  if (caseECGRAF) { cancelAnimationFrame(caseECGRAF); caseECGRAF = null; }
  const c = document.getElementById('case-ecg');
  if (!c) return;

  const hr = vitalNum((S.vit.find(v => v.lab === 'HR') || {}).val) || 80;
  const crit = S.deteriorated;
  const opts = {
    cycle: Math.max(46, 9400 / hr),
    color: crit ? '#f0524f' : '#46c98b',
    glow: crit ? 'rgba(240,82,79,0.45)' : 'rgba(70,201,139,0.4)',
  };
  document.getElementById('trace-rhythm').textContent =
    hr > 100 ? 'Sinus tachycardia' : hr < 60 ? 'Sinus bradycardia' : 'Sinus rhythm';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { drawECG(c, 0, opts); return; }
  let phase = 0;
  const loop = () => {
    phase += 1.1;
    drawECG(c, phase, opts);
    caseECGRAF = requestAnimationFrame(loop);
  };
  caseECGRAF = requestAnimationFrame(loop);
}

// ── findings log ─────────────────────────────────
function addLog(kind, text) {
  const log = document.getElementById('info-log');
  if (!log) return;
  document.querySelectorAll('.log-line.here').forEach(e => e.remove());
  const row = document.createElement('div');
  row.className = 'log-line ' + (kind || '');
  const mark = kind === 'good' ? '✓' : kind === 'near' ? '~' : kind === 'bad' ? '✗' : '';
  row.innerHTML = `<span class="log-t">${fmtClock(caseSec)}</span>` +
                  `<span class="log-x">${mark ? mark + ' ' : ''}${text}</span>`;
  log.appendChild(row);
  const here = document.createElement('div');
  here.className = 'log-line here';
  here.innerHTML = `<span class="log-t">${fmtClock(caseSec)}</span><span class="log-x">You are here</span>`;
  log.appendChild(here);
}

// ── deterioration: driven by decisions, never by the wall clock ──
const PRESSURE = { correct: 0.04, near: 0.14, wrong: 0.36 };

/* Push each vital in the direction it deteriorates, starting from where
   it currently is. The old version swapped in the topic's "severe"
   vitals wholesale, which did nothing at all when the case already
   started severe, and teleported an atypical patient onto a different
   presentation entirely. */
function worsen(v) {
  const bp = String(v.val).match(/^(\d+)\s*\/\s*(\d+)$/);
  let val = v.val;
  if (bp)                    val = Math.round(+bp[1] * 0.82) + '/' + Math.round(+bp[2] * 0.82);
  else if (v.lab === 'HR')   val = String(Math.round(vitalNum(v.val) * 1.22));
  else if (v.lab === 'RR')   val = String(Math.round(vitalNum(v.val) * 1.25));
  else if (v.lab === 'SpO₂') val = String(Math.max(70, Math.round(vitalNum(v.val) - 6)));
  else return { ...v };

  const n = vitalNum(val);
  const crit =
    v.lab === 'BP'   ? n < 90  :
    v.lab === 'HR'   ? n > 130 :
    v.lab === 'RR'   ? n > 28  :
    v.lab === 'SpO₂' ? n < 90  : false;
  const warn = !crit && (
    v.lab === 'BP'   ? n < 100 || n > 160 :
    v.lab === 'HR'   ? n > 100 :
    v.lab === 'RR'   ? n > 20  :
    v.lab === 'SpO₂' ? n < 94  : false);

  const down = v.lab === 'BP' || v.lab === 'SpO₂';
  return { ...v, val, level: crit ? 'crit' : warn ? 'warn' : '', trend: down ? '↓' : '↑' };
}

/* `harm` marks the options that hurt the patient outright rather than
   merely wasting time — 100% oxygen in a CO₂ retainer, a beta-blocker
   in acute decompensation. Those deteriorate the patient on their own,
   without needing accumulated pressure behind them. */
function applyPressure(answerType, opt) {
  S.pressure += PRESSURE[answerType] || 0;
  const harm = !!(opt && opt.harm);
  if (S.deteriorated || (!harm && S.pressure < 0.6)) return;

  S.deteriorated = true;
  S.vit = S.vit.map(worsen);
  renderVitals();
  startCaseECG();

  const words = considerations(S.vit).slice(0, 3).join(', ').toLowerCase();
  document.getElementById('alert-ico').innerHTML = icon('alert');
  document.getElementById('alert-text').textContent =
    'Patient deteriorating — ' + (words || 'haemodynamic instability');
  document.getElementById('alert-band').classList.add('show');

  const twist = (window.TOPICS[currentTopicId].sevConf[S.severity] || {}).twist;
  addLog('crit', harm && opt.harm !== true ? opt.harm
                : twist || 'Repeat observations show the patient is losing ground.');
  renderSidebar();
}

// ── CASE INIT ────────────────────────────────────
function startCase(forceSev) {
  const topic = window.TOPICS[currentTopicId];

  /* Every case starts clean. Without this a second case inherits the
     first one's answered orders, and pickOpt() silently ignores every
     input because the category is already in usedActions. */
  S.pts = 0; S.ddxPts = 0;
  S.usedActions = new Set();
  S.ddxAnswered = 0; S.ddxDone = false;
  S.log = []; S.ddxLog = [];
  S.pressure = 0; S.deteriorated = false; S.harmedByTreatment = false;
  S.openPanel = null;
  S.learnDone = true;

  const sev = (forceSev && topic.sevConf[forceSev])
    ? forceSev
    : topic.severities[Math.floor(Math.random() * topic.severities.length)];
  S.severity = sev;
  S.vit = topic.sevConf[sev].vitals.map(normVital);

  document.getElementById('sim-ctx').textContent = topic.system;
  document.getElementById('sim-case-no').textContent =
    'Case ' + String(topic.number || 1).padStart(3, '0') + ' · ' + topic.sevConf[sev].label;
  document.getElementById('pt-name').textContent = topic.patient.name;
  document.getElementById('pt-meta').textContent = topic.patient.meta;
  document.getElementById('pt-cc').textContent = topic.patient.cc;
  document.getElementById('alert-band').classList.remove('show');

  renderVitals();
  renderOrderNav();
  renderSidebar();
  renderIdle();

  document.getElementById('info-log').innerHTML = '';
  addLog('', 'Patient arrived in the department.');
  if (topic.patient.inspection) addLog('', topic.patient.inspection);

  show('case');
  startClock();
  requestAnimationFrame(startCaseECG);
}

// ── left rail: orders ────────────────────────────
const ORDERS = [
  { k: 'history',  ic: 'clipboard',    t: 'History' },
  { k: 'exam',     ic: 'stethoscope',  t: 'Examination' },
  { k: 'labs',     ic: 'tube',         t: 'Bloods' },
  { k: 'imaging',  ic: 'xray',         t: 'Imaging' },
  { k: 'diagnose', ic: 'branch',       t: 'Differential' },
  { k: 'treat',    ic: 'pill',         t: 'Treatment' },
];

function renderOrderNav() {
  document.getElementById('order-nav').innerHTML = ORDERS.map(o => {
    const done = o.k === 'diagnose' ? S.ddxDone : S.usedActions.has(o.k);
    const locked = o.k === 'treat' && !S.ddxDone;
    const on = S.openPanel === o.k;
    const fn = o.k === 'diagnose' ? 'openDDx()' : `openQ('${o.k}')`;
    return `<button class="onav ${done ? 'done' : ''} ${on ? 'on' : ''}"
              ${locked ? 'disabled' : ''} onclick="${fn}">
              ${icon(o.ic)}<span>${o.t}</span>
              ${done ? `<span class="onav-tick">${icon('check')}</span>` : ''}
            </button>`;
  }).join('');
}

// ── right rail ───────────────────────────────────
function renderSidebar() {
  const topic = window.TOPICS[currentTopicId];
  const cons = considerations(S.vit);
  const goal = topic.goal || (S.ddxDone
    ? ['Confirm the working diagnosis', 'Start definitive therapy', 'Prevent further deterioration']
    : ['Characterise the presentation', 'Narrow the differential', 'Identify reversible causes']);

  // Etiologies stay hidden until an answer is in — otherwise they hand
  // you the differential before you have reasoned about it.
  const revealed = S.ddxDone;
  const etio = topic.ddx.map(d => d.name);

  document.getElementById('ck-right').innerHTML = `
    <div class="side-block">
      <div class="col-label">Key considerations</div>
      <div class="side-list">
        ${cons.length
          ? cons.map(c => `<div class="side-item hi">${c}</div>`).join('')
          : '<div class="side-item">Observations within normal limits</div>'}
        ${S.deteriorated ? '<div class="side-item hi">Clinical deterioration</div>' : ''}
      </div>
    </div>
    <div class="side-block ${revealed ? '' : 'locked'}">
      <div class="col-label">Possible etiologies</div>
      <div class="side-list">${etio.map(e => `<div class="side-item">${e}</div>`).join('')}</div>
      ${revealed ? '' : '<div class="side-lock">Reveals once you have worked the differential</div>'}
    </div>
    <div class="side-block">
      <div class="col-label">Goal</div>
      <div class="side-list">${goal.map(g => `<div class="side-item">${g}</div>`).join('')}</div>
    </div>`;
}

// ── centre: idle ─────────────────────────────────
function renderIdle() {
  S.openPanel = null;
  const n = S.usedActions.size;
  document.getElementById('ck-mid').innerHTML = `
    <div class="ws-head">
      <span class="ws-kicker">Awaiting orders</span>
      <span class="ws-count">${n} of 5 gathered</span>
    </div>
    <div class="ws-idle">
      <p class="ws-stem">${n === 0
        ? 'The patient is in front of you. Choose where to start.'
        : 'What do you want to do next?'}</p>
      <p class="ws-sub">Select an order from the left. You can work in any sequence —
         there is no fixed path through a patient.</p>
    </div>`;
  renderOrderNav();
}

// ── centre: a question ───────────────────────────
function openQ(type) {
  const topic = window.TOPICS[currentTopicId];
  const qd = topic.questions[type];
  if (!qd) return;
  if (type === 'treat' && !S.ddxDone) return;

  S.openPanel = type;
  const answered = S.usedActions.has(type);

  document.getElementById('ck-mid').innerHTML = `
    <div class="ws-head">
      <span class="ws-kicker">${qd.label}</span>
      <span class="ws-count" id="ws-count">${S.usedActions.size} of 5 gathered</span>
    </div>
    <h2 class="ws-stem">${qd.stem}</h2>
    <p class="ws-sub">Select one order.</p>
    <div class="orders">
      ${qd.opts.map((o, i) => `
        <button class="order" onclick="pickOpt('${type}', ${i})">
          <span class="order-ico">${icon(o.ic || iconFor(o.t, type))}</span>
          <span class="order-rule"></span>
          <span class="order-body">
            <span class="order-t">${o.t}</span>
            <span class="order-d">${o.d || ''}</span>
          </span>
          <span class="order-go">${icon('chevron')}</span>
        </button>`).join('')}
    </div>
    <div class="ws-foot" id="ws-foot"></div>`;

  renderOrderNav();
  if (answered) revealAll(type, S.log.find(l => l.type === type), document.getElementById('ck-mid'));
}

function revealAll(type, entry, root) {
  const qd = window.TOPICS[currentTopicId].questions[type];
  const concept = qd.concept || '';
  const rows = (root || document).querySelectorAll('.orders .order');
  qd.opts.forEach((o, i) => {
    const el = rows[i];
    if (!el) return;
    el.disabled = true;
    el.classList.add('reveal', 'g-' + o.type);
    if (entry && o.t === entry.picked) el.classList.add('picked');
    else el.classList.add('dim');

    const tag = o.type === 'correct' ? 'Correct' : o.type === 'near' ? 'Near miss' : 'Wrong';
    const go = el.querySelector('.order-go');
    if (go) go.outerHTML = `<span class="order-tag">${tag}</span>`;
    const why = document.createElement('span');
    why.className = 'order-why';
    const c = o.concept || (o.type === 'correct' ? concept : '');
    why.innerHTML = `<b>${o.fb_title}</b> ${o.fb}` +
      (c ? `<span class="order-concept">${c}</span>` : '');
    el.appendChild(why);
  });
}

function pickOpt(type, idx) {
  const qd = window.TOPICS[currentTopicId].questions[type];
  const picked = qd.opts[idx];
  if (S.usedActions.has(type)) return;

  const pts = picked.type === 'correct' ? 15 : picked.type === 'near' ? 7 : -3;
  S.pts += pts;
  S.log.push({
    type, picked: picked.t, pickedType: picked.type,
    correct: qd.opts.find(o => o.type === 'correct').t,
    fb: picked.fb, concept: picked.concept || qd.concept || '',
  });
  recordAnswer(currentTopicId, type, picked.type === 'correct');
  S.usedActions.add(type);

  const cnt = document.getElementById('ws-count');
  if (cnt) cnt.textContent = `${S.usedActions.size} of 5 gathered`;
  revealAll(type, S.log[S.log.length - 1], document.getElementById('ck-mid'));
  addLog(picked.type === 'correct' ? 'good' : picked.type === 'near' ? 'near' : 'bad', picked.t);

  applyPressure(picked.type, picked);

  const last = type === 'treat';
  if (last) S.harmedByTreatment = S.deteriorated && picked.type === 'wrong';
  document.getElementById('ws-foot').innerHTML = last
    ? `<button class="btn-go" onclick="showReview()">See your review</button>`
    : `<button class="btn-ghost" onclick="renderIdle()">Back to orders</button>`;
  renderOrderNav();
  renderSidebar();
}

// ── centre: differential ─────────────────────────
function openDDx() {
  if (S.usedActions.size < 1) {
    addLog('', 'Gather some findings before committing to a differential.');
    return;
  }
  S.openPanel = 'diagnose';
  const DDX = window.TOPICS[currentTopicId].ddx;

  document.getElementById('ck-mid').innerHTML = `
    <div class="ws-head">
      <span class="ws-kicker">Differential</span>
      <span class="ws-count" id="ws-count">${S.usedActions.size} of 5 gathered</span>
    </div>
    <h2 class="ws-stem">Work the differential.</h2>
    <p class="ws-sub">Confirm or rule out each diagnosis against what you have found so far.</p>
    <div class="ddx-grid">
      ${DDX.map((d, i) => `
        <div class="ddx-row" id="di-${i}">
          <span class="ddx-n">${d.name}</span>
          <span class="ddx-act" id="da-${i}">
            <button class="ddx-b" onclick="pickDDx(${i}, true)">Confirm</button>
            <button class="ddx-b" onclick="pickDDx(${i}, false)">Rule out</button>
          </span>
        </div>`).join('')}
    </div>
    <div class="ws-foot" id="ws-foot"></div>`;

  renderOrderNav();
}

function pickDDx(i, saidConfirm) {
  const el = document.getElementById('di-' + i);
  if (!el || el.classList.contains('done')) return;
  const DDX = window.TOPICS[currentTopicId].ddx;
  const d = DDX[i];
  const right = saidConfirm === !!d.correct;

  el.classList.add('done', right ? 'got' : 'missed', d.correct ? 'confirmed' : 'ruled');
  document.getElementById('da-' + i).outerHTML =
    `<span class="ddx-s">${saidConfirm ? 'You confirmed' : 'You ruled out'} · ${right ? 'correct' : 'wrong'}</span>`;
  const r = document.createElement('span');
  r.className = 'ddx-r';
  r.textContent = d.reason;
  el.appendChild(r);

  S.ddxPts += right ? 15 : -3;
  S.ddxLog.push({ name: d.name, correct: d.correct, saidConfirm, right, reason: d.reason });
  addLog(right ? 'good' : 'bad',
         (saidConfirm ? 'Confirmed: ' : 'Ruled out: ') + d.name);
  S.ddxAnswered++;

  if (S.ddxAnswered >= DDX.length) {
    S.ddxDone = true;
    document.getElementById('ws-foot').innerHTML =
      `<button class="btn-go" onclick="openQ('treat')">Proceed to treatment</button>`;
    renderOrderNav();
    renderSidebar();
  }
}

// ────────────────────────────────────────────────
// REVIEW — walk the case back, step by step
// ────────────────────────────────────────────────

/* The monitor is rebuilt read-only on the review screen so the
   numbers you were reasoning from are still in front of you. */
function monitorHTML(topic) {
  return `
    <div class="mon-pt">
      <div class="mon-name">${topic.patient.name}</div>
      <div class="mon-meta">${topic.patient.meta}</div>
      <div class="mon-cc">${topic.patient.cc}</div>
    </div>
    <div class="mon-vitals">
      ${S.vit.map(v => `
        <div class="vital ${v.level}">
          <div class="v-lab">${v.lab}</div>
          <div class="v-val">${v.val}${v.trend ? `<span class="v-trend">${v.trend}</span>` : ''}</div>
          <div class="v-unit">${v.unit}</div>
        </div>`).join('')}
    </div>
    <div class="mon-trace">
      <div class="trace-top">ECG Lead II · final</div>
      <canvas class="trace-canvas" id="rv-ecg" width="760" height="76"></canvas>
      <div class="trace-foot"><span>25 mm/s</span><span>10 mm/mV</span></div>
    </div>`;
}

const GRADES = [
  { min: 140, g: 'S', say: 'Exceptional. You reasoned like a registrar.' },
  { min: 115, g: 'A', say: 'Strong. The reasoning held up under pressure.' },
  { min:  85, g: 'B', say: 'Solid, with a few detours worth reading below.' },
  { min:  55, g: 'C', say: 'You got there, but the path cost the patient time.' },
  { min:-999, g: 'F', say: 'Work the differential again — the reasoning came apart early.' },
];

let rvStep = 'summary';

function showReview() {
  const topic = window.TOPICS[currentTopicId];
  recordCaseCompleted(currentTopicId);
  stopClock();

  document.getElementById('rv-ctx').textContent   = topic.system + ' · ' + topic.title;
  document.getElementById('rv-clock').textContent = fmtClock(caseSec);
  document.getElementById('rv-monitor').innerHTML = monitorHTML(topic);

  const total = S.pts + S.ddxPts;
  const gr = GRADES.find(x => total >= x.min);
  document.getElementById('rv-grade').innerHTML = `
    <div class="rvg-mark grade-${gr.g}">${gr.g}</div>
    <div class="rvg-say">${gr.say}</div>
    <div class="rvg-nums">
      <span>${total} pts</span><span>${S.log.length} orders</span>
      <span>${S.log.filter(l => l.pickedType === 'correct').length} correct</span>
    </div>`;

  // right rail: what separates the two diagnoses that look alike
  const c = topic.contrast;
  document.getElementById('rv-right').innerHTML = (c ? `
    <div class="col-label">Contrasting diagnoses</div>
    <table class="ctab">
      <thead><tr><th>Feature</th><th>${c.a}</th><th>${c.b}</th></tr></thead>
      <tbody>${c.rows.map(r => `<tr><td class="ct-f">${r.f}</td><td data-a="${c.a}">${r.a}</td><td data-b="${c.b}">${r.b}</td></tr>`).join('')}</tbody>
    </table>` : '') + (topic.takeaway ? `
    <div class="takeaway">
      <div class="col-label">Key takeaway</div>
      <p>${topic.takeaway}</p>
    </div>` : '');

  rvStep = 'summary';
  renderReviewNav();
  renderReviewStep();
  show('review');
  requestAnimationFrame(() => {
    const cv = document.getElementById('rv-ecg');
    if (cv) drawECG(cv, 0, {
      cycle: Math.max(46, 9400 / (vitalNum((S.vit.find(v => v.lab === 'HR') || {}).val) || 80)),
      color: S.deteriorated ? '#f0524f' : '#46c98b',
      glow:  S.deteriorated ? 'rgba(240,82,79,0.45)' : 'rgba(70,201,139,0.4)',
    });
  });
}

function renderReviewNav() {
  const steps = [{ k: 'summary', ic: 'clipboard', t: 'Summary' }];
  ORDERS.forEach(o => {
    if (o.k === 'diagnose') { if (S.ddxLog.length) steps.push({ k: 'diagnose', ic: 'branch', t: 'Differential' }); return; }
    if (S.log.some(l => l.type === o.k)) steps.push({ k: o.k, ic: o.ic, t: o.t });
  });
  steps.push({ k: 'points', ic: 'microscope', t: 'Key points' });

  document.getElementById('rv-nav').innerHTML = steps.map(st => {
    const entry = S.log.find(l => l.type === st.k);
    const dot = entry
      ? `<span class="onav-tick ${entry.pickedType === 'correct' ? '' : entry.pickedType}">${icon(entry.pickedType === 'correct' ? 'check' : 'cross')}</span>`
      : '';
    return `<button class="onav ${rvStep === st.k ? 'on' : ''}" onclick="gotoReview('${st.k}')">
              ${icon(st.ic)}<span>${st.t}</span>${dot}
            </button>`;
  }).join('');
}

function gotoReview(k) { rvStep = k; renderReviewNav(); renderReviewStep(); }

function renderReviewStep() {
  const topic = window.TOPICS[currentTopicId];
  const mid = document.getElementById('rv-mid');

  if (rvStep === 'summary') {
    const missed = S.log.filter(l => l.pickedType !== 'correct');
    mid.innerHTML = `
      <div class="ws-head"><span class="ws-kicker">Summary</span></div>
      <h2 class="ws-stem">${topic.title} — ${S.severity} presentation.</h2>
      <p class="ws-sub">${S.harmedByTreatment
        ? 'Your treatment made the patient worse. That is the order to re-read first — the rail on the left marks it.'
        : S.deteriorated
        ? 'The patient deteriorated during your workup. The orders that cost time are marked in the rail on the left.'
        : 'The patient remained stable throughout your workup.'}</p>
      ${missed.length ? `
        <div class="col-label" style="margin-top:30px">What to re-read</div>
        <div class="rv-miss">${missed.map(l => `
          <button class="rv-miss-row" onclick="gotoReview('${l.type}')">
            <span class="rvm-k">${(ORDERS.find(o => o.k === l.type) || {}).t || l.type}</span>
            <span class="rvm-p">You ordered: ${l.picked}</span>
            <span class="rvm-c">Better: ${l.correct}</span>
          </button>`).join('')}</div>`
        : `<div class="rv-clean">${icon('check')}<span>Every order you placed was the best available one.</span></div>`}
      <div class="ws-foot"><button class="btn-go" onclick="restart()">Try another variant</button></div>`;
    return;
  }

  if (rvStep === 'points') {
    mid.innerHTML = `
      <div class="ws-head"><span class="ws-kicker">Key points</span></div>
      <h2 class="ws-stem">What this case was teaching.</h2>
      <div class="kp-list">${topic.teaching.map(t => `<div class="kp"><span>${t}</span></div>`).join('')}</div>
      <div class="ws-foot"><button class="btn-go" onclick="restart()">Try another variant</button></div>`;
    return;
  }

  if (rvStep === 'diagnose') {
    mid.innerHTML = `
      <div class="ws-head"><span class="ws-kicker">Differential</span></div>
      <h2 class="ws-stem">How your differential resolved.</h2>
      <div class="ddx-grid">${S.ddxLog.map(d => `
        <div class="ddx-row done ${d.right ? 'got' : 'missed'}">
          <span class="ddx-n">${d.name}</span>
          <span class="ddx-s">${d.saidConfirm ? 'You confirmed' : 'You ruled out'} · ${d.right ? 'correct' : 'wrong'}</span>
          <span class="ddx-r">${d.reason}</span>
        </div>`).join('')}</div>`;
    return;
  }

  // a question step: show every option graded, the way it looked when answered
  const qd = topic.questions[rvStep];
  const entry = S.log.find(l => l.type === rvStep);
  if (!qd || !entry) { mid.innerHTML = ''; return; }

  mid.innerHTML = `
    <div class="ws-head"><span class="ws-kicker">${qd.label}</span></div>
    <h2 class="ws-stem">${qd.stem}</h2>
    <p class="ws-sub">You ordered: <b>${entry.picked}</b></p>
    <div class="orders">
      ${qd.opts.map((o, i) => `
        <button class="order" disabled>
          <span class="order-ico">${icon(o.ic || iconFor(o.t, rvStep))}</span>
          <span class="order-rule"></span>
          <span class="order-body">
            <span class="order-t">${o.t}</span>
            <span class="order-d">${o.d || ''}</span>
          </span>
          <span class="order-go"></span>
        </button>`).join('')}
    </div>`;
  revealAll(rvStep, entry, mid);
}

function restart() {
  stopClock();
  if (caseECGRAF) { cancelAnimationFrame(caseECGRAF); caseECGRAF = null; }
  S = {
    pts: 0, ddxPts: 0, learnDone: false, learnLayer: 0, severity: '',
    usedActions: new Set(), ddxAnswered: 0, ddxDone: false, twistShown: false,
    vit: [], pressure: 0, deteriorated: false, harmedByTreatment: false, openPanel: null,
  learnChecks: {},
    log: [], ddxLog: [], learnChecks: {},
  };
  show('topic');
}


// ────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────
goHome();
