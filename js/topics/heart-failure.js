// ────────────────────────────────────────────────
// TOPIC: Heart Failure  (Cardiology · Topic 01)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['heart-failure'] = {
  id: 'heart-failure',
  number: 1,
  system: 'Cardiology',
  title: 'Heart Failure',
  navMeta: 'Cardiology · Heart Failure',
  desc: "A clinical syndrome where the heart cannot pump enough blood to meet the body's demands. Covers physiology, pathophysiology, clinical presentation, diagnosis, and management — step by step, then tested through a real patient case.",
  tags: [
    { label: 'Cardiology', cls: 'tag-cardio' },
    { label: 'Pharmacology', cls: 'tag-pharma' },
    { label: 'Renal overlap', cls: 'tag-renal' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mr. Ramesh Iyer',
    meta: '68M · HTN, DM Type 2, MI (2019) · Brought by family',
    cc: '"Doctor, I am feeling very breathless since 3–4 days. Cannot sleep lying flat. My legs have also become heavy and swollen."',
    // General inspection: propped upright (orthopnoea), on oxygen.
    appearance: { build: 'average', posture: 'propped', age: 'older', hair: 'short', skin: 'mid', cannula: true },
  },

  // ── LEARN DATA (3 layers, each a function) ──
  layers: [
    // LAYER 1: Physiology + Pathophysiology
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 1 of 3</div>
        <h2 class="layer-title">How the normal heart works — and how it fails</h2>
        <div class="layer-body">
          <p>The heart's job is to maintain <strong>cardiac output (CO)</strong>. It does this through two variables:</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>CO = Heart Rate × Stroke Volume.</strong> Stroke volume depends on three things: <em>preload</em> (how full the ventricle is), <em>afterload</em> (resistance it must pump against), and <em>contractility</em> (force of contraction).</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Frank-Starling Law:</strong> up to a point, the more you stretch the ventricle (more preload), the stronger it contracts. In HF, this curve shifts right and flattens — more stretch gives no more force.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>When CO falls,</strong> the body compensates: RAAS activates (retains Na⁺/H₂O → more preload), sympathetic system surges (↑HR, ↑contractility), ventricle remodels (hypertrophies). These help short-term but worsen HF long-term.</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>BNP</strong> (Brain Natriuretic Peptide) is released by ventricular myocytes when the wall is stretched by pressure/volume overload. It's the biomarker of HF. BNP >100 pg/mL = cardiac dyspnea confirmed.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.280–282 — Cardiac physiology &amp; Frank-Starling</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Quick check — Which compensatory mechanism in HF leads to fluid retention?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Sympathetic activation → ↑HR</button>
          <button class="micro-btn" onclick="microAns(this, true)">RAAS activation → Na⁺/H₂O retention</button>
          <button class="micro-btn" onclick="microAns(this, false)">Ventricular hypertrophy → ↑stroke volume</button>
        </div>
        <div class="micro-ans" id="micro-ans-0">Correct. RAAS (Renin–Angiotensin–Aldosterone System) is the key. Low renal perfusion → renin → angiotensin II → aldosterone → Na⁺ and water retention → more preload. This initially helps but worsens congestion.</div>
      </div>
      <div class="learn-nav">
        <button class="btn-primary" onclick="nextLayer()">Next layer →</button>
        <button class="btn-ghost" onclick="startCase()">Skip to case</button>
      </div>
    `,

    // LAYER 2: Clinical + Diagnosis
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 2 of 3</div>
        <h2 class="layer-title">What you see — and how you confirm it</h2>
        <div class="layer-body">
          <p>Left and right HF present differently because they back up into different circuits.</p>
          <div class="compare">
            <div class="compare-col">
              <div class="compare-head left">Left HF (↑PCWP)</div>
              <div class="compare-item">Pulmonary oedema → crackles</div>
              <div class="compare-item">Orthopnoea (can't lie flat)</div>
              <div class="compare-item">PND (paroxysmal nocturnal dyspnoea)</div>
              <div class="compare-item">S3 gallop (volume overload)</div>
              <div class="compare-item">Pink frothy sputum (severe)</div>
            </div>
            <div class="compare-col">
              <div class="compare-head right">Right HF (↑CVP/JVP)</div>
              <div class="compare-item">Elevated JVP</div>
              <div class="compare-item">Bilateral pitting oedema</div>
              <div class="compare-item">Hepatomegaly / ascites</div>
              <div class="compare-item">Most common cause: Left HF</div>
              <div class="compare-item">JVP = most specific sign</div>
            </div>
          </div>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>CXR findings:</strong> Cardiomegaly (CTR >0.5) + upper lobe blood diversion + Kerley B lines (engorged lymphatics) + bat-wing perihilar oedema.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Echo</strong> gives you EF. <em>HFrEF</em> = EF &lt;40% (systolic failure). <em>HFpEF</em> = EF ≥50% (diastolic failure — stiff ventricle, can't fill). Different pathophysiology, different management.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.283–285 — HF presentation &amp; investigations</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Which finding most specifically points to cardiac cause of dyspnoea vs respiratory?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Bilateral lung crackles</button>
          <button class="micro-btn" onclick="microAns(this, true)">Elevated JVP + S3 gallop</button>
          <button class="micro-btn" onclick="microAns(this, false)">Bilateral leg oedema</button>
        </div>
        <div class="micro-ans" id="micro-ans-1">Correct. JVP elevation reflects raised right-heart filling pressures — purely cardiac. Crackles and oedema both occur in non-cardiac causes. The S3 gallop specifically indicates volume-overloaded ventricle.</div>
      </div>
      <div class="learn-nav">
        <button class="btn-primary" onclick="nextLayer()">Next layer →</button>
        <button class="btn-ghost" onclick="startCase()">Skip to case</button>
      </div>
    `,

    // LAYER 3: Management
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 3 of 3</div>
        <h2 class="layer-title">How you treat it — acute and chronic</h2>
        <div class="layer-body">
          <p>Management splits into <strong>acute decompensation</strong> (stabilise now) and <strong>chronic HFrEF</strong> (reduce mortality long-term).</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>Acute ADHF bundle:</strong> Sit upright + O₂ (target SpO₂ ≥94%) + <em>IV furosemide</em> (venodilates before diuresis → rapid preload reduction). Monitor closely.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>NEVER start beta-blockers in acute decompensation</strong> — they reduce contractility acutely and worsen haemodynamics. Start only once the patient is euvolemic and stable.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Chronic HFrEF mortality-reducing triad:</strong>
                <br>1. <em>ACE inhibitor / ARB</em> — blocks RAAS, prevents remodelling
                <br>2. <em>Beta-blocker</em> (metoprolol succinate / carvedilol) — blocks catecholamine toxicity, reverse remodelling
                <br>3. <em>MRA</em> (spironolactone) — blocks aldosterone, reduces fibrosis</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>Furosemide mechanism:</strong> Inhibits Na⁺/K⁺/2Cl⁻ co-transporter in thick ascending limb of loop of Henle. Reduces preload. Monitor K⁺ (hypokalaemia risk).</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.286–290 — HF management + FA Pharmacology p.245</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">A patient with HFrEF (EF 28%) is newly stable after diuresis. Which drug reduces mortality most in this scenario?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Digoxin</button>
          <button class="micro-btn" onclick="microAns(this, true)">ACE inhibitor (e.g. lisinopril)</button>
          <button class="micro-btn" onclick="microAns(this, false)">Furosemide</button>
        </div>
        <div class="micro-ans" id="micro-ans-2">Correct. ACE inhibitors are the cornerstone of HFrEF management. They block RAAS, reduce afterload, prevent remodelling, and significantly reduce mortality. Furosemide helps symptoms but does not reduce mortality. Digoxin reduces hospitalisations but not mortality.</div>
      </div>
      <div class="learn-nav">
        <button class="btn-primary" onclick="startCase()">Start the case →</button>
      </div>
    `,
  ],

  // ── CASE DATA ──
  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: {
    mild: {
      label: 'Mild', cls: 'sev-mild', twist: null,
      vitals: [{ l: 'BP', v: '148/92', n: false, w: true }, { l: 'HR', v: '88', n: false, w: false }, { l: 'RR', v: '18', n: false, w: false }, { l: 'SpO₂', v: '96%', n: false, w: false }, { l: 'Temp', v: '37.1°C', n: false, w: false }],
    },
    moderate: {
      label: 'Moderate', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '155/96', n: false, w: true }, { l: 'HR', v: '104', n: false, w: true }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '90%', n: true, w: false }, { l: 'Temp', v: '37.2°C', n: false, w: false }],
    },
    severe: {
      label: 'Severe', cls: 'sev-severe',
      twist: 'Patient suddenly diaphoretic. BP has dropped to 88/60. Possible cardiogenic shock — reassess immediately.',
      vitals: [{ l: 'BP', v: '88/60', n: true, w: false }, { l: 'HR', v: '120', n: true, w: false }, { l: 'RR', v: '28', n: true, w: false }, { l: 'SpO₂', v: '84%', n: true, w: false }, { l: 'Temp', v: '37.0°C', n: false, w: false }],
    },
    atypical: {
      label: 'Atypical', cls: 'sev-atypical',
      twist: 'Atypical presentation — patient denies orthopnoea. Reports only a 3-week productive cough and fatigue. Do not be misled — look at the full picture.',
      vitals: [{ l: 'BP', v: '142/88', n: false, w: true }, { l: 'HR', v: '78', n: false, w: false }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '94%', n: false, w: false }, { l: 'Temp', v: '36.9°C', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      stem: 'The patient is breathless, cannot lie flat, and has swollen legs. What is the single most important history question right now?',
      fa: 'FA p.283 — HF history: orthopnoea, PND, exertional dyspnoea are cardinal symptoms',
      opts: [
        { t: 'Any chest pain or pressure associated with this breathlessness?', type: 'correct',
          fb_title: 'Correct — ACS must be excluded first.',
          fb: 'Acute MI can precipitate acute decompensated HF. Always ask about chest pain before anything else in a breathless cardiac patient — it changes your immediate management. Ruling out ACS is step one.' },
        { t: 'How many pillows do you use to sleep at night?', type: 'near',
          fb_title: 'Good — orthopnoea confirms cardiac dyspnoea.',
          fb: "Orthopnoea (needing pillows to breathe) strongly favours cardiac over respiratory dyspnoea. Good question — but ask about chest pain first to exclude an acute coronary event driving this presentation." },
        { t: 'Any recent fever or cough suggesting infection?', type: 'wrong',
          fb_title: 'Not the priority here.',
          fb: 'Infection can trigger HF decompensation but bilateral leg oedema + orthopnoea + prior MI strongly points cardiac. Pursuing infection history first when there are clear cardiac flags wastes critical time.' },
        { t: 'Any recent change in your medications?', type: 'wrong',
          fb_title: 'Relevant later — not your opening question.',
          fb: 'Non-compliance with diuretics/ACEi is a common HF trigger, but with acute decompensation you need to establish the acute risk (ACS? shock?) before taking a drug history.' },
      ],
    },
    exam: {
      label: 'Physical Examination',
      stem: 'What is the MOST diagnostically specific physical exam finding for confirming a cardiac cause of this presentation?',
      fa: 'FA p.283 — Elevated JVP + S3 + basal crackles = classic ADHF triad',
      opts: [
        { t: 'Elevated JVP + bilateral basal crackles + S3 gallop', type: 'correct',
          fb_title: 'The classic ADHF triad.',
          fb: 'Elevated JVP = raised right-sided filling pressures (cardiac). Basal crackles = pulmonary oedema from raised PCWP (cardiac). S3 = volume-overloaded ventricle (cardiac). This triad essentially confirms ADHF without investigations.' },
        { t: 'Bilateral pitting oedema to the knees', type: 'near',
          fb_title: 'Supportive but not specific.',
          fb: 'Bilateral oedema has many causes — venous insufficiency, hypoalbuminaemia, CCBs, nephrotic syndrome. It supports HF but central signs (JVP, S3, crackles) are far more specific for cardiac aetiology.' },
        { t: 'Dullness to percussion at both lung bases', type: 'near',
          fb_title: 'Suggests pleural effusions — not specific.',
          fb: 'Pleural effusions occur in HF but also in pneumonia, malignancy, PE, hypoalbuminaemia. The JVP + S3 + crackles triad is specific to cardiac congestion — dullness alone does not differentiate.' },
        { t: 'Tender hepatomegaly', type: 'wrong',
          fb_title: 'Late right HF sign — not most diagnostic.',
          fb: 'Congestive hepatopathy and hepatomegaly indicate established right heart failure. While relevant, this is a late finding. The JVP + S3 + crackles triad is the primary diagnostic combination for ADHF.' },
      ],
    },
    labs: {
      label: 'Ordering Labs',
      stem: 'Which single lab result best confirms the diagnosis AND helps gauge severity?',
      fa: 'FA p.284 — BNP: the HF biomarker. >100 pg/mL confirms cardiac dyspnoea.',
      opts: [
        { t: 'BNP (Brain Natriuretic Peptide)', type: 'correct',
          fb_title: 'BNP — the definitive HF biomarker.',
          fb: "BNP >100 pg/mL (or NT-proBNP >300) confirms cardiac dyspnoea with high sensitivity. It's released by ventricular myocytes under wall stress. BNP also correlates with severity and guides discharge — should fall >30% before safe discharge." },
        { t: 'Troponin I', type: 'near',
          fb_title: 'Important — but confirms ACS, not HF.',
          fb: 'Troponin is essential to rule out ACS as the precipitant (always order it). Mildly elevated troponin also occurs in ADHF itself ("demand ischaemia"). But troponin doesn\'t confirm HF — BNP does. Order both.' },
        { t: 'Full blood count', type: 'near',
          fb_title: 'Useful for triggers — not diagnostic.',
          fb: 'Anaemia (Hb <10) can precipitate or worsen HF by increasing cardiac demand. Always check FBC. But it doesn\'t confirm the diagnosis. BNP, troponin, and U&E/renal function are your priority labs.' },
        { t: 'Liver function tests', type: 'wrong',
          fb_title: 'Not your first priority.',
          fb: "LFTs are useful for assessing congestive hepatopathy in chronic HF and monitoring medications. But in the acute setting they don't confirm diagnosis or guide immediate management. Focus on BNP, troponin, renal function first." },
      ],
    },
    imaging: {
      label: 'Imaging',
      stem: 'You order a CXR. Which pattern would you EXPECT in acute decompensated HF?',
      fa: 'FA p.284 — CXR in ADHF: cardiomegaly + upper lobe diversion + Kerley B lines + bat-wing oedema',
      opts: [
        { t: 'Cardiomegaly + upper lobe blood diversion + Kerley B lines + perihilar bat-wing opacity', type: 'correct',
          fb_title: 'The classic ADHF CXR — memorise this.',
          fb: 'CTR >0.5 = dilated chambers. Upper lobe diversion = PCWP >12 mmHg. Kerley B lines = engorged lymphatics at pleural edges (1–2cm horizontal lines). Bat-wing perihilar opacity = bilateral pulmonary oedema. This constellation = ADHF on CXR.' },
        { t: 'Hyperinflation + flattened diaphragm + ↑AP diameter', type: 'wrong',
          fb_title: "That's COPD/emphysema — different pathology entirely.",
          fb: 'Hyperinflation with flattened diaphragms = obstructive lung disease (COPD, emphysema). This patient has cardiac pathology. The HF CXR shows fluid redistribution and cardiac enlargement, not air trapping. Classic Step 1 trap.' },
        { t: 'Bilateral lower zone ground-glass opacification', type: 'near',
          fb_title: 'Possible in pulmonary oedema — but not specific.',
          fb: 'Ground-glass changes can occur in pulmonary oedema but also in pneumonia, ARDS, pulmonary haemorrhage. The specific ADHF pattern is cardiomegaly + upper lobe diversion + Kerley B lines — the full constellation.' },
        { t: 'Unilateral consolidation with air bronchograms', type: 'wrong',
          fb_title: 'Classic pneumonia — not HF.',
          fb: 'Unilateral lobar consolidation with air bronchograms = bacterial pneumonia. HF causes BILATERAL changes reflecting raised hydrostatic pressure. If you see unilateral opacity, reconsider your differential — could be missed pneumonia triggering HF.' },
      ],
    },
    treat: {
      label: 'Treatment',
      stem: 'Diagnosis confirmed: acute decompensated HFrEF, EF 28%, SpO₂ 88% on room air. What is the correct IMMEDIATE management bundle?',
      fa: 'FA p.286–288 — Acute HF management + Loop diuretics FA Pharmacology p.245',
      opts: [
        { t: 'Supplemental O₂ + sit upright + IV furosemide + continuous monitoring', type: 'correct',
          fb_title: 'Correct acute ADHF bundle.',
          fb: 'O₂ targets SpO₂ ≥94%. Sitting upright reduces venous return to the heart (↓preload). IV furosemide causes immediate venodilation (within minutes) then diuresis — rapid preload reduction. Continuous monitoring for arrhythmias and haemodynamic deterioration.' },
        { t: 'Start oral metoprolol 25mg + lisinopril immediately', type: 'wrong',
          fb_title: 'DANGEROUS — never start BB in acute decompensation.',
          fb: 'Beta-blockers are CONTRAINDICATED in acute ADHF — they reduce contractility and worsen haemodynamics acutely. If patient is already on a BB, continue at lower dose. Only initiate after achieving euvolaemia. Lisinopril can be started once stable.' },
        { t: 'IV furosemide + IV dobutamine + urgent cardiology consult', type: 'near',
          fb_title: 'Partially correct — dobutamine only for low-output.',
          fb: 'Furosemide is correct. Dobutamine (inotrope) is reserved for cardiogenic shock / low-output state (cold + wet profile: low BP, low CO, high filling pressures). If BP and perfusion are adequate, start with diuresis alone. Cardiology consult is appropriate.' },
        { t: 'IV norepinephrine + intubation + ICU transfer', type: 'wrong',
          fb_title: 'Too aggressive — this is not yet cardiogenic shock.',
          fb: 'Vasopressors and intubation are for cardiogenic shock (SBP <90 + end-organ hypoperfusion). Even in severe ADHF, try diuresis + O₂ first. Escalate to vasopressors/intubation only if haemodynamics do not respond or the patient tires.' },
      ],
    },
  },

  ddx: [
    { name: 'Acute Decompensated Heart Failure', correct: true,
      reason: '✓ Confirmed. Orthopnoea + bilateral oedema + elevated JVP + S3 + prior MI + cardiomegaly on CXR + BNP elevation = ADHF. EF 28% on echo confirms HFrEF.' },
    { name: 'Pulmonary Embolism', correct: false,
      reason: "✗ Ruled out. PE causes acute pleuritic chest pain + tachycardia without bilateral oedema or orthopnoea. No DVT risk factors highlighted. CXR would be normal or show Westermark sign / Hampton's hump, not pulmonary oedema." },
    { name: 'COPD Exacerbation', correct: false,
      reason: '✗ Ruled out. COPD exacerbation: wheeze, prolonged expiration, hyperinflation on CXR. No smoking history. Elevated JVP and S3 are cardiac signs — not features of obstructive lung disease.' },
    { name: 'Nephrotic Syndrome', correct: false,
      reason: '✗ Ruled out. Can cause bilateral oedema (low oncotic pressure) but NOT orthopnoea, elevated JVP, or pulmonary oedema. JVP is normal or low in nephrotic syndrome — the key differentiator here.' },
    { name: 'Bilateral Pneumonia', correct: false,
      reason: '✗ Ruled out. Bilateral pneumonia: fever, purulent sputum, consolidation on CXR. Bilateral leg oedema is not a feature. Elevated JVP is cardiac. CXR shows pulmonary oedema pattern, not consolidation.' },
  ],

  teaching: [
    'BNP >100 pg/mL confirms cardiac dyspnoea. Falls >30% = safe to discharge. It is produced by ventricular myocytes under wall stress.',
    'JVP + S3 gallop + bilateral basal crackles = the ADHF triad. Memorise this. JVP is most specific for cardiac cause.',
    'NEVER initiate beta-blockers in acute decompensation — acutely worsens haemodynamics. Start only once euvolemic and stable.',
    'CXR in ADHF: cardiomegaly + upper lobe blood diversion + Kerley B lines + perihilar bat-wing opacity.',
    'HFrEF long-term mortality triad: ACEi/ARB + beta-blocker (metoprolol succinate) + MRA (spironolactone).',
    'Furosemide: inhibits Na⁺/K⁺/2Cl⁻ in thick ascending limb. Venodilates BEFORE diuresis — immediate preload reduction. Watch K⁺.',
    'HFpEF (EF ≥50%) = diastolic failure. Cannot fill properly. Managed differently from HFrEF — no mortality benefit from ACEi/BB proven.',
  ],
};
