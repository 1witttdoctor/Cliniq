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
  document.body.classList.remove('screen-home', 'reading');
  if (id === 'home') document.body.classList.add('screen-home');
  else if (id === 'learn' || id === 'case' || id === 'review') document.body.classList.add('reading');
  // pause the console ECG loop when it's off-screen
  if (id !== 'home' && ecgRAF) { cancelAnimationFrame(ecgRAF); ecgRAF = null; }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ────────────────────────────────────────────────
// DIAGNOSTIC CONSOLE — system → topic navigation
// ────────────────────────────────────────────────
const SYSTEM_CODES = {
  Cardiology: 'CVS', Respiratory: 'RESP', Renal: 'RENAL',
  Neurology: 'NEURO', Gastroenterology: 'GI', Endocrine: 'ENDO',
};
// Systems on the roadmap but not yet live — shown as the "up next" readout.
const UPCOMING_SYSTEMS = ['Neurology', 'Endocrine', 'Gastroenterology'];

function sysCode(topic) {
  const code = SYSTEM_CODES[topic.system] || topic.system.slice(0, 4).toUpperCase();
  return `${code}·${String(topic.number).padStart(2, '0')}`;
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
      <span class="focus-ico">🎯</span>
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

function renderAnatomy() {
  const stage = document.getElementById('anat-figure');
  if (!stage) return;
  stage.innerHTML = anatomyFigure();

  const bySystem = {};
  Object.values(window.TOPICS || {}).forEach(t => (bySystem[t.system] = bySystem[t.system] || []).push(t));

  document.getElementById('anat-sections').innerHTML = REGIONS.map((r, i) => {
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
  const r = REGIONS[i];
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
let featuredId = null;
const BOARD_SEV = 'moderate';   // the board always shows a representative presentation

function renderCaseboard(topicId) {
  const topic = window.TOPICS[topicId];
  if (!topic) return;
  featuredId = topicId;

  const sev = topic.sevConf[BOARD_SEV] ? BOARD_SEV : topic.severities[0];
  const sc = topic.sevConf[sev];
  const organ = (ORGAN_BY_SYSTEM[topic.system] || {}).organ;

  document.getElementById('cb-sev').textContent = sc.label + ' presentation';
  document.getElementById('cb-name').textContent = topic.patient.name;
  document.getElementById('cb-meta').textContent = topic.patient.meta;
  document.getElementById('cb-quote').textContent = topic.patient.cc;
  const insp = document.getElementById('cb-inspect');
  insp.textContent = topic.patient.inspection || '';
  insp.style.display = topic.patient.inspection ? 'block' : 'none';

  document.getElementById('cb-vitals').innerHTML = sc.vitals.map(v => `
    <div class="cb-v ${v.n ? 'abn' : v.w ? 'warn' : ''}">
      <span class="cb-v-lbl">${v.l}</span>
      <span class="cb-v-val">${v.v}</span>
    </div>`).join('');

  const acts = [['history', 'History'], ['exam', 'Examine'], ['labs', 'Labs'], ['imaging', 'Imaging']];
  document.getElementById('cb-btns').innerHTML = acts.map(([k, name]) =>
    `<button class="cb-btn" onclick="cbAction('${k}')">${name}</button>`).join('');

  // rail state
  [...document.querySelectorAll('.organ-btn')].forEach(b =>
    b.classList.toggle('on', b.dataset.topic === topicId));

  startBoardECG();
}

function renderOrganRail() {
  const topics = Object.values(window.TOPICS || {}).sort((a, b) => a.number - b.number);
  document.getElementById('organ-rail').innerHTML = topics.map(t => {
    const o = ORGAN_BY_SYSTEM[t.system] || { organ: 'heart', label: t.system };
    return `
      <button class="organ-btn" data-topic="${t.id}" onclick="renderCaseboard('${t.id}')" aria-label="${o.label} — ${t.title}">
        <svg viewBox="0 0 24 24">${ORGAN_ICON[o.organ] || ''}</svg>
        <span class="organ-lbl">${o.label}</span>
      </button>`;
  }).join('');
}

// Pressing an action drops you straight into that case, at that step.
function cbAction(type) {
  if (!featuredId) return;
  selectTopic(featuredId);
  startCase(BOARD_SEV);
  openQ(type);
}

// ────────────────────────────────────────────────
// CANVAS ECG — live PQRST trace
// ────────────────────────────────────────────────
let ecgRAF = null;

// Normalised cardiac waveform over one cycle t in [0,1). Sum of gaussians (P,Q,R,S,T).
function ecgWave(t) {
  const g = (c, w, a) => a * Math.exp(-((t - c) * (t - c)) / (2 * w * w));
  return g(0.17, 0.022, 0.14)   // P
       - g(0.32, 0.012, 0.10)   // Q
       + g(0.36, 0.010, 1.00)   // R
       - g(0.40, 0.014, 0.26)   // S
       + g(0.62, 0.040, 0.30);  // T
}

function drawECG(canvas, phase) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr; canvas.height = h * dpr;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const mid = h * 0.56, amp = h * 0.40, cycle = 118;
  ctx.lineWidth = 1.7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.strokeStyle = '#ffb84d';
  ctx.shadowColor = 'rgba(255,184,77,0.5)'; ctx.shadowBlur = 6;
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const t = ((((x + phase) % cycle) + cycle) % cycle) / cycle;
    const y = mid - ecgWave(t) * amp;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function startBoardECG() {
  if (ecgRAF) cancelAnimationFrame(ecgRAF);
  const c = document.getElementById('cb-ecg');
  if (!c) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { drawECG(c, 0); return; }
  let phase = 0;
  const loop = () => {
    phase += 0.9;
    drawECG(c, phase);
    ecgRAF = requestAnimationFrame(loop);
  };
  ecgRAF = requestAnimationFrame(loop);
}

// ────────────────────────────────────────────────
// TOPIC SELECT
// ────────────────────────────────────────────────
function selectTopic(id) {
  const topic = window.TOPICS[id];
  if (!topic) return;
  currentTopicId = id;

  document.getElementById('nav-meta').textContent = topic.navMeta;
  document.getElementById('topic-eyebrow').textContent = `Cliniq · ${topic.system} · Topic ${String(topic.number).padStart(2, '0')}`;
  document.getElementById('topic-title').textContent = topic.title;
  document.getElementById('topic-desc').textContent = topic.desc;
  document.getElementById('topic-tags').innerHTML = topic.tags.map(t => `<span class="tag ${t.cls}">${t.label}</span>`).join('');
  document.getElementById('case-eyebrow-text').textContent = `Clinical Case · ${topic.title}`;

  show('topic');
}

// ────────────────────────────────────────────────
// LEARN
// ────────────────────────────────────────────────
let microAnswered = [false, false, false];

function microAns(btn, correct) {
  const parent = btn.closest('.micro-check');
  const allBtns = parent.querySelectorAll('.micro-btn');
  const idx = [...document.querySelectorAll('.micro-check')].indexOf(parent);
  if (microAnswered[idx]) return;
  microAnswered[idx] = true;
  allBtns.forEach(b => {
    b.disabled = true;
    if (b === btn) b.classList.add(correct ? 'mc-correct' : 'mc-wrong');
  });
  const ans = parent.querySelector('[id^="micro-ans"]');
  if (ans) ans.classList.add('show');
}

function startLearn() {
  S.learnLayer = 0;
  show('learn');
  renderLayer(0);
}

function renderLayer(i) {
  const layers = window.TOPICS[currentTopicId].layers;
  for (let j = 0; j < layers.length; j++) {
    const el = document.getElementById('lp' + j);
    if (el) el.className = 'lp-step' + (j < i ? ' done' : j === i ? ' active' : '');
  }
  document.getElementById('lp-label').textContent = `Layer ${i + 1} of ${layers.length}`;
  document.getElementById('layer-content').innerHTML = layers[i]();
  microAnswered = [false, false, false];
}

function nextLayer() {
  const layers = window.TOPICS[currentTopicId].layers;
  S.learnLayer++;
  if (S.learnLayer >= layers.length) { startCase(); return; }
  renderLayer(S.learnLayer);
  document.getElementById('screen-learn').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ────────────────────────────────────────────────
// CASE INIT
// ────────────────────────────────────────────────
function startCase(forceSev) {
  const topic = window.TOPICS[currentTopicId];
  S.learnDone = true;

  document.getElementById('pt-name').textContent = topic.patient.name;
  document.getElementById('pt-meta').textContent = topic.patient.meta;
  document.getElementById('pt-cc').textContent = topic.patient.cc;

  const sev = (forceSev && topic.sevConf[forceSev])
    ? forceSev
    : topic.severities[Math.floor(Math.random() * topic.severities.length)];
  S.severity = sev;
  const sc = topic.sevConf[sev];

  // severity badge
  const pill = document.getElementById('sev-pill');
  pill.className = 'sev-pill ' + sc.cls;
  pill.textContent = sc.label + ' presentation';

  // vitals
  const vr = document.getElementById('vitals-row');
  vr.innerHTML = sc.vitals.map(v =>
    `<div class="vital-chip ${v.n ? 'abn' : v.w ? 'warn' : ''}">
      <div class="v-label">${v.l}</div>
      <div class="v-val">${v.v}</div>
    </div>`
  ).join('');

  // delayed twist
  if (sc.twist) {
    setTimeout(() => {
      if (S.twistShown || S.ddxDone) return;
      S.twistShown = true;
      document.getElementById('twist-text').textContent = sc.twist;
      document.getElementById('twist-box').classList.add('show');
      addLog('⚠️', sc.twist);
    }, 10000);
  }

  show('case');
}

// ────────────────────────────────────────────────
// LOG
// ────────────────────────────────────────────────
function addLog(icon, text) {
  const log = document.getElementById('info-log');
  const row = document.createElement('div');
  row.className = 'log-row';
  row.innerHTML = `<span class="log-ico">${icon}</span><span class="log-txt">${text}</span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

// ────────────────────────────────────────────────
// QUESTIONS
// ────────────────────────────────────────────────
function openQ(type) {
  if (type !== 'treat') {
    document.getElementById('ddx-panel').classList.remove('open');
    document.querySelectorAll('.act-btn').forEach(b => b.classList.remove('act-active'));
    const ab = document.getElementById('ab-' + type);
    if (ab) ab.classList.add('act-active');
  }

  const qd = window.TOPICS[currentTopicId].questions[type];
  if (!qd) return;

  document.getElementById('q-type-label').textContent = qd.label;
  document.getElementById('q-stem').textContent = qd.stem;

  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('opts').innerHTML = qd.opts.map((o, i) =>
    `<button class="opt" onclick="pickOpt('${type}', ${i})">
      <span class="opt-ltr">${letters[i]}</span>
      <span>${o.t}</span>
    </button>`
  ).join('');

  document.getElementById('feedback').className = 'feedback';
  document.getElementById('continue-btn').className = 'continue-btn';
  document.getElementById('q-panel').classList.add('open');
  document.getElementById('q-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function pickOpt(type, idx) {
  const qd = window.TOPICS[currentTopicId].questions[type];
  const picked = qd.opts[idx];
  const btns = document.querySelectorAll('#opts .opt');

  btns.forEach((btn, i) => {
    btn.disabled = true;
    const t = qd.opts[i].type;
    btn.classList.add(t === 'correct' ? 'o-correct' : t === 'near' ? 'o-near' : 'o-wrong');
  });

  const pts = picked.type === 'correct' ? 15 : picked.type === 'near' ? 7 : -3;
  S.pts += pts;
  S.log.push({ type, picked: picked.t, pickedType: picked.type, correct: qd.opts.find(o => o.type === 'correct').t, fb: picked.fb, fa: qd.fa });
  recordAnswer(currentTopicId, type, picked.type === 'correct');

  const fb = document.getElementById('feedback');
  const fcls = picked.type === 'correct' ? 'fb-good' : picked.type === 'near' ? 'fb-near' : 'fb-bad';
  fb.className = 'feedback show ' + fcls;
  document.getElementById('fb-title').textContent = picked.fb_title;
  document.getElementById('fb-body').textContent = picked.fb;
  document.getElementById('fb-fa').textContent = qd.fa;

  addLog(
    picked.type === 'correct' ? '✓' : picked.type === 'near' ? '~' : '✗',
    picked.t
  );

  document.getElementById('continue-btn').className = 'continue-btn show';

  S.usedActions.add(type);
  const ab = document.getElementById('ab-' + type);
  if (ab) { ab.classList.add('used'); ab.classList.remove('act-active'); }

  if (type === 'treat') {
    document.getElementById('continue-btn').textContent = 'See results →';
    document.getElementById('continue-btn').onclick = showReview;
  }
}

function closeQ() {
  document.getElementById('q-panel').classList.remove('open');
  document.querySelectorAll('.act-btn').forEach(b => b.classList.remove('act-active'));
  document.getElementById('continue-btn').onclick = closeQ;
  document.getElementById('continue-btn').textContent = 'Continue →';
}

// ────────────────────────────────────────────────
// DDX
// ────────────────────────────────────────────────
function openDDx() {
  if (S.usedActions.size < 1) {
    addLog('·', 'Gather at least some findings before attempting a diagnosis.');
    return;
  }
  closeQ();
  document.getElementById('ddx-panel').classList.add('open');
  document.getElementById('ab-diagnose').classList.add('act-active');

  const DDX = window.TOPICS[currentTopicId].ddx;
  document.getElementById('ddx-items').innerHTML = DDX.map((d, i) =>
    `<div class="ddx-item" id="di-${i}" onclick="pickDDx(${i})">
      <div class="ddx-num">${i + 1}</div>
      <div class="ddx-content">
        <div class="ddx-name">${d.name}</div>
        <div class="ddx-reason" id="dr-${i}"></div>
      </div>
      <div class="ddx-status" id="ds-${i}">Click to assess</div>
    </div>`
  ).join('');

  S.ddxAnswered = 0;
  document.getElementById('ddx-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function pickDDx(i) {
  const el = document.getElementById('di-' + i);
  if (el.classList.contains('answered')) return;
  el.classList.add('answered');
  const DDX = window.TOPICS[currentTopicId].ddx;
  const d = DDX[i];

  document.getElementById('dr-' + i).textContent = d.reason;
  if (d.correct) {
    el.classList.add('confirmed');
    document.getElementById('ds-' + i).textContent = '✓ Confirmed';
    S.ddxPts += 20;
    addLog('✓', `Confirmed: ${d.name}`);
  } else {
    el.classList.add('ruled-out');
    document.getElementById('ds-' + i).textContent = '✗ Ruled out';
    S.ddxPts += 5;
    addLog('✗', `Ruled out: ${d.name}`);
  }
  S.ddxLog.push({ name: d.name, correct: d.correct, reason: d.reason });
  S.ddxAnswered++;
  if (S.ddxAnswered >= DDX.length) {
    S.ddxDone = true;
    document.getElementById('ddx-proceed').style.display = 'inline-block';
    document.getElementById('ab-treat').disabled = false;
    document.getElementById('ab-treat').querySelector('.act-hint').textContent = 'Now unlocked';
  }
}

// ────────────────────────────────────────────────
// REVIEW
// ────────────────────────────────────────────────
function showReview() {
  const topic = window.TOPICS[currentTopicId];
  recordCaseCompleted(currentTopicId);

  const total = S.pts + S.ddxPts;
  let grade, gcls;
  if (total >= 120) { grade = 'S'; gcls = 'grade-S'; }
  else if (total >= 90) { grade = 'A'; gcls = 'grade-A'; }
  else if (total >= 65) { grade = 'B'; gcls = 'grade-B'; }
  else if (total >= 40) { grade = 'C'; gcls = 'grade-C'; }
  else { grade = 'F'; gcls = 'grade-F'; }

  document.getElementById('review-grade').innerHTML = `<span class="${gcls}">${grade}</span>`;
  document.getElementById('review-summary').textContent =
    `${total} points · ${topic.title} · ${S.severity} presentation · ${S.log.length} questions answered`;

  document.getElementById('sc-learn').textContent = S.learnDone ? '✓' : '–';
  document.getElementById('sc-case').textContent = S.pts;
  document.getElementById('sc-ddx').textContent = S.ddxPts;

  // question review
  const qri = document.getElementById('q-review-items');
  qri.innerHTML = S.log.map(l => `
    <div class="review-item">
      <div class="ri-q">${l.type.charAt(0).toUpperCase() + l.type.slice(1)}</div>
      <div class="ri-picked ${l.pickedType === 'correct' ? 'correct' : l.pickedType === 'near' ? 'near' : 'wrong'}">
        ${l.pickedType === 'correct' ? '✓' : l.pickedType === 'near' ? '~' : '✗'} You picked: ${l.picked}
      </div>
      ${l.pickedType !== 'correct' ? `<div class="ri-correct-ans">✓ Best answer: ${l.correct}</div>` : ''}
      <div class="ri-why">${l.fb}</div>
      <div class="ri-fa">${l.fa}</div>
    </div>
  `).join('') || '<div class="review-item"><div class="ri-why" style="color:var(--text3)">No questions answered in this case.</div></div>';

  // ddx review
  const dri = document.getElementById('ddx-review-items');
  dri.innerHTML = S.ddxLog.map(d => `
    <div class="review-item">
      <div class="ri-picked ${d.correct ? 'correct' : 'wrong'}">
        ${d.correct ? '✓ Confirmed' : '✗ Ruled out'}: ${d.name}
      </div>
      <div class="ri-why">${d.reason}</div>
    </div>
  `).join('') || '<div class="review-item"><div class="ri-why" style="color:var(--text3)">DDx not attempted.</div></div>';

  // teaching points
  document.getElementById('teaching-list').innerHTML = topic.teaching.map(t =>
    `<div class="teaching-item"><span class="ti-arrow">→</span><span>${t}</span></div>`
  ).join('');

  show('review');
}

// ────────────────────────────────────────────────
// RESTART
// ────────────────────────────────────────────────
function restart() {
  S = { pts: 0, ddxPts: 0, learnDone: false, learnLayer: 0, severity: '', usedActions: new Set(), ddxAnswered: 0, ddxDone: false, twistShown: false, log: [], ddxLog: [] };
  document.getElementById('info-log').innerHTML = `
    <div class="log-row"><span class="log-ico">·</span><span class="log-txt starter">Patient arrived. Use the action buttons below to gather information and build your diagnosis.</span></div>`;
  document.getElementById('q-panel').classList.remove('open');
  document.getElementById('ddx-panel').classList.remove('open');
  document.getElementById('twist-box').classList.remove('show');
  document.querySelectorAll('.act-btn').forEach(b => { b.classList.remove('used', 'act-active'); b.disabled = false; });
  document.getElementById('ab-treat').disabled = true;
  document.getElementById('ab-treat').querySelector('.act-hint').textContent = 'Diagnose first';
  document.getElementById('ddx-proceed').style.display = 'none';
  document.getElementById('continue-btn').onclick = closeQ;
  document.getElementById('continue-btn').textContent = 'Continue →';
  microAnswered = [false, false, false];
  show('topic');
}

// ────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────
goHome();
