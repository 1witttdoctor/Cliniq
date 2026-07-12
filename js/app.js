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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ────────────────────────────────────────────────
// BODY MAP — organ → topic navigation (live organs only)
// Coordinates are % of the .bodymap box (SVG viewBox 200×470).
// ────────────────────────────────────────────────
const ORGANS = [
  { id: 'lungs', topicId: 'copd-exacerbation',  label: 'Lungs · Respiratory', x: 57.0, y: 19.5 },
  { id: 'heart', topicId: 'heart-failure',      label: 'Heart · Cardiology',  x: 44.0, y: 27.5 },
];

// ────────────────────────────────────────────────
// HOME
// ────────────────────────────────────────────────
function goHome() {
  currentTopicId = null;
  document.getElementById('nav-meta').textContent = 'Choose a topic to begin';
  renderHome();
  show('home');
}

function renderHome() {
  const stats = loadStats();

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

  renderBodyMap();
}

function renderBodyMap() {
  const stats = loadStats();
  const bodymap = document.getElementById('bodymap');
  if (bodymap) bodymap.classList.remove('zooming');  // reset zoom on return

  const live = ORGANS.filter(o => window.TOPICS && window.TOPICS[o.topicId]);

  const layer = document.getElementById('organ-layer');
  layer.innerHTML = live.map(o => {
    const done = stats.topics[o.topicId] && stats.topics[o.topicId].completed;
    return `
      <button class="organ-hotspot" style="left:${o.x}%; top:${o.y}%"
        onclick="pressOrgan('${o.topicId}')" aria-label="${o.label}">
        <span class="organ-dot"></span>
        <span class="organ-label">${o.label}${done ? ' ✓' : ''}</span>
      </button>`;
  }).join('');

  // Text fallback for accessibility / discoverability
  const fb = document.getElementById('bodymap-fallback');
  if (fb) {
    fb.innerHTML = 'or open a topic directly: ' + live.map(o => {
      const t = window.TOPICS[o.topicId];
      return `<a href="#" onclick="selectTopic('${o.topicId}');return false;">${t.title}</a>`;
    }).join(' · ');
  }
}

function pressOrgan(topicId) {
  const organ = ORGANS.find(o => o.topicId === topicId);
  const bodymap = document.getElementById('bodymap');
  if (organ && bodymap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    bodymap.style.transformOrigin = `${organ.x}% ${organ.y}%`;
    bodymap.classList.add('zooming');
    setTimeout(() => selectTopic(topicId), 460);
  } else {
    selectTopic(topicId);
  }
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
function startCase() {
  const topic = window.TOPICS[currentTopicId];
  S.learnDone = true;

  document.getElementById('pt-name').textContent = topic.patient.name;
  document.getElementById('pt-meta').textContent = topic.patient.meta;
  document.getElementById('pt-cc').textContent = topic.patient.cc;

  const sev = topic.severities[Math.floor(Math.random() * topic.severities.length)];
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
