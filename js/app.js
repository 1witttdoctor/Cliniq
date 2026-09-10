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

  renderOrganRail();
  const topics = Object.values(window.TOPICS || {}).sort((a, b) => a.number - b.number);
  renderCaseboard(featuredId && window.TOPICS[featuredId] ? featuredId : topics[0].id);
}

// Which organ lights up in the body diagram, and the rail icon, per system.
const ORGAN_BY_SYSTEM = {
  Cardiology:  { organ: 'heart',   label: 'Heart' },
  Respiratory: { organ: 'lungs',   label: 'Lungs' },
  Renal:       { organ: 'kidneys', label: 'Kidneys' },
};

const ORGAN_ICON = {
  heart:   '<path class="ic" d="M12 20s-7-4.6-7-9.2A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.8C19 15.4 12 20 12 20z"/>',
  lungs:   '<path class="ic" d="M12 4v7"/><path class="ic" d="M12 11H9.6c-1.6 0-2.6 1.2-3 3.1-.4 1.9-.6 3.4-.6 4.4a1.9 1.9 0 0 0 3.7.5c.6-1.9 1.3-4.6 1.3-6.5"/><path class="ic" d="M12 11h2.4c1.6 0 2.6 1.2 3 3.1.4 1.9.6 3.4.6 4.4a1.9 1.9 0 0 1-3.7.5c-.6-1.9-1.3-4.6-1.3-6.5"/>',
  kidneys: '<path class="ic" d="M10 4c3.2 0 5.4 3.4 5.4 8s-2.2 8-5.4 8c-2.1 0-3.4-1.5-3.4-3.2 0-1.4.8-2.1.8-4.8S7.9 4 10 4z"/>',
};

// Clinical body diagram — the kind findings get marked on in a real chart.
function bodyDiagram(lit) {
  const on = o => (o === lit ? ' lit' : '');
  return `
    <svg viewBox="0 0 120 250" aria-hidden="true">
      <circle class="fig" cx="60" cy="16" r="10"></circle>
      <path class="fig" d="M60,26 L60,36"></path>
      <path class="fig" d="M48,44 C48,38 72,38 72,44 L76,62 L77,98 L73,132 L47,132 L43,98 L44,62 Z"></path>
      <path class="fig" d="M48,45 C39,50 34,64 32,82 C31,94 31,106 32,116"></path>
      <path class="fig" d="M72,45 C81,50 86,64 88,82 C89,94 89,106 88,116"></path>
      <path class="fig" d="M53,132 L51,182 L53,238"></path>
      <path class="fig" d="M67,132 L69,182 L67,238"></path>
      <g class="organ${on('lungs')}">
        <path d="M55,58 C50,58 48,66 49,78 C50,85 55,86 56,82 C58,74 58,64 55,58 Z"></path>
        <path d="M65,58 C70,58 72,66 71,78 C70,85 65,86 64,82 C62,74 62,64 65,58 Z"></path>
      </g>
      <g class="organ${on('kidneys')}">
        <path d="M53,102 C49,102 47,106 48,111 C49,115 53,116 55,113 C57,110 56,103 53,102 Z"></path>
        <path d="M67,102 C71,102 73,106 72,111 C71,115 67,116 65,113 C63,110 64,103 67,102 Z"></path>
      </g>
      <g class="organ${on('heart')}">
        <path d="M60,70 C58,67 53,68 53,73 C53,78 60,83 60,83 C60,83 67,78 67,73 C67,68 62,67 60,70 Z"></path>
      </g>
    </svg>`;
}

// ────────────────────────────────────────────────
// PATIENT SPRITE — pixel figure drawn from the case
// Build, posture, age and props are CLINICAL DATA
// (general inspection), never randomised.
// ────────────────────────────────────────────────
const SKIN   = { light: '#e0aa80', mid: '#c98a5e', deep: '#8d5a3b' };
const BUILDS = {
  cachectic: { x: 8, w: 6,  leg: 2 },
  lean:      { x: 8, w: 6,  leg: 2 },
  average:   { x: 7, w: 8,  leg: 2 },
  heavy:     { x: 6, w: 10, leg: 3 },
};

function patientSprite(a) {
  a = a || {};
  const build   = BUILDS[a.build] || BUILDS.average;
  const posture = a.posture || 'upright';
  const skin    = SKIN[a.skin] || SKIN.mid;
  const grey    = a.age === 'older';
  const hairCol = grey ? '#c3c7d1' : '#3a3a44';
  const CLOTHES = {
    gown:     ['#b9c6d6', '#95a4b8'],   // hospital gown
    cardigan: ['#c9b6d8', '#a690bb'],   // came from home
    shirt:    ['#9fc2b4', '#7ea394'],
  };
  const [gown, gownSh] = CLOTHES[a.clothes] || CLOTHES.gown;
  const ink     = '#2b2b33';

  const px = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
  const out = [];

  const cx = build.x + build.w / 2;          // body centre
  let headDX = 0, headDY = 0, torsoDX = 0;
  if (posture === 'tripod')  { headDX = 4;  headDY = 2; torsoDX = 3; }
  if (posture === 'slumped') { headDX = 1;  headDY = 4; torsoDX = 0; }

  // pillow behind a propped-up patient (orthopnoea)
  if (posture === 'propped') {                                  // clearly in a bed, sat up
    out.push(px(build.x - 4, 6,  build.w + 8, 3, 'rgba(255,255,255,0.07)'));
    out.push(px(build.x - 5, 9,  build.w + 10, 3, 'rgba(255,255,255,0.10)'));
    out.push(px(build.x - 6, 12, build.w + 12, 2, 'rgba(255,255,255,0.13)'));
    out.push(px(build.x - 6, 26, build.w + 12, 2, 'rgba(255,255,255,0.13)'));
  }

  // ── torso ──
  const ty = 9;
  if (posture === 'tripod') {
    out.push(px(build.x + 3, ty,     build.w, 4, gown));      // rounded back, leant right forward
    out.push(px(build.x + 2, ty + 4, build.w, 3, gown));
    out.push(px(build.x,     ty + 7, build.w, 3, gown));
  } else if (posture === 'slumped') {
    out.push(px(build.x, ty + 2, build.w, 8, gown));          // shoulders dropped
  } else {
    out.push(px(build.x, ty, build.w, 10, gown));
    if (a.build === 'heavy') out.push(px(build.x - 1, ty + 5, build.w + 2, 5, gown));
  }
  out.push(px(build.x, ty + 9, build.w, 1, gownSh));

  // ── head ──
  const hx = Math.round(cx - 3 + headDX), hy = 2 + headDY;
  out.push(px(hx, hy, 6, 6, skin));
  out.push(px(hx + 2, hy + 6, 2, 1, skin));                    // neck
  // hair
  if (a.hair !== 'bald') {
    out.push(px(hx, hy - 1, 6, 2, hairCol));
    if (a.hair === 'long') { out.push(px(hx - 1, hy, 1, 5, hairCol)); out.push(px(hx + 6, hy, 1, 5, hairCol)); }
    else { out.push(px(hx - 1, hy, 1, 2, hairCol)); out.push(px(hx + 6, hy, 1, 2, hairCol)); }
  }
  // eyes + glasses
  if (a.glasses) {
    out.push(px(hx, hy + 2, 2, 2, '#eaf0f6'));
    out.push(px(hx + 4, hy + 2, 2, 2, '#eaf0f6'));
    out.push(px(hx + 2, hy + 3, 2, 1, '#eaf0f6'));
    out.push(px(hx + 1, hy + 3, 1, 1, ink));
    out.push(px(hx + 4, hy + 3, 1, 1, ink));
  } else {
    out.push(px(hx + 1, hy + 3, 1, 1, ink));
    out.push(px(hx + 4, hy + 3, 1, 1, ink));
  }
  // pursed lips — the COPD breathing pattern
  if (a.pursedLips) out.push(px(hx + 2, hy + 5, 2, 1, '#a4606a'));
  // nasal cannula
  if (a.cannula) {
    out.push(px(hx + 2, hy + 4, 2, 1, '#eaf0f6'));            // prongs under the nose
    out.push(px(hx - 1, hy + 2, 1, 4, '#eaf0f6'));            // tubing down the cheek
  }

  // ── arms ──
  const ay = ty + 1;
  if (posture === 'tripod') {                                  // braced forward on knees
    out.push(px(build.x + build.w,     ay,     2, 4, skin));   // upper arm, braced
    out.push(px(build.x + build.w + 1, ay + 4, 2, 5, skin));   // forearm down to knee
    out.push(px(build.x - 2,           ay,     2, 7, skin));   // other arm still at side
  } else if (posture === 'slumped') {
    out.push(px(build.x - 2, ay + 2, 2, 9, skin));
    out.push(px(build.x + build.w, ay + 2, 2, 9, skin));
  } else {
    out.push(px(build.x - 2, ay, 2, 8, skin));
    out.push(px(build.x + build.w, ay, 2, 8, skin));
  }

  // ── legs + feet ──
  const ly = 19, lw = build.leg;
  const lL = Math.round(cx - 1 - lw), lR = Math.round(cx + 1);
  out.push(px(lL, ly, lw, 9, gownSh));
  out.push(px(lR, ly, lw, 9, gownSh));
  out.push(px(lL - 1, ly + 9, lw + 1, 1, ink));
  out.push(px(lR, ly + 9, lw + 1, 1, ink));

  return `<svg viewBox="0 0 22 30" shape-rendering="crispEdges" aria-hidden="true">${out.join('')}</svg>`;
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

  document.getElementById('cb-body').innerHTML = patientSprite(topic.patient.appearance);
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
