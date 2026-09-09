// ────────────────────────────────────────────────
// TOPIC: COPD Exacerbation  (Respiratory · Topic 02)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['copd-exacerbation'] = {
  id: 'copd-exacerbation',
  number: 2,
  system: 'Respiratory',
  title: 'COPD Exacerbation',
  navMeta: 'Respiratory · COPD Exacerbation',
  desc: 'An acute worsening of chronic obstructive pulmonary disease — often triggered by infection. Covers airflow obstruction physiology, the pink-puffer/blue-bloater spectrum, diagnosis, and the controlled-oxygen management that trips up most learners — step by step, then tested through a real patient case.',
  tags: [
    { label: 'Respiratory', cls: 'tag-resp' },
    { label: 'Pharmacology', cls: 'tag-pharma' },
    { label: 'Cardiac overlap', cls: 'tag-cardio' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mrs. Sandra Cole',
    meta: '71F · 40-pack-year smoker, known COPD on home inhalers · Brought by daughter',
    cc: '"I can\'t catch my breath, doctor. I\'ve been coughing up much more phlegm than usual — it\'s gone yellow-green — for about three days now."',
    // General inspection: tripod position, pursed-lip breathing, thin.
    appearance: { build: 'lean', posture: 'tripod', age: 'older', hair: 'long', skin: 'light', pursedLips: true },
  },

  // ── LEARN DATA (3 layers, each a function) ──
  layers: [
    // LAYER 1: Physiology + Pathophysiology
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 1 of 3</div>
        <h2 class="layer-title">Why the airways stay open on the way in — and collapse on the way out</h2>
        <div class="layer-body">
          <p>COPD is <strong>obstructive</strong> lung disease: airflow OUT is limited. Two overlapping processes drive it:</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>Emphysema</strong> destroys alveolar walls and elastic recoil (often α1-antitrypsin-related or smoking-driven protease/antiprotease imbalance). Without recoil, small airways collapse on expiration → air trapping.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Chronic bronchitis</strong> = productive cough ≥3 months/year for 2+ consecutive years. Mucous gland hyperplasia and inflammation narrow the airway lumen itself.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Air trapping → hyperinflation.</strong> Residual volume rises, the diaphragm flattens and loses mechanical advantage, and the patient starts breathing near total lung capacity — hugely increasing the work of breathing.</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>V/Q mismatch</strong> from destroyed alveoli and mucus-plugged airways causes hypoxaemia. Chronic CO₂ retention can blunt the central chemoreceptor drive over time — relevant later when you choose an O₂ target.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.674–676 — Obstructive lung disease &amp; COPD physiology</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Quick check — What is the PRIMARY mechanical consequence of lost elastic recoil in emphysema?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Increased FEV1/FVC ratio</button>
          <button class="micro-btn" onclick="microAns(this, true)">Air trapping and hyperinflation</button>
          <button class="micro-btn" onclick="microAns(this, false)">Restrictive reduction in TLC</button>
        </div>
        <div class="micro-ans" id="micro-ans-0">Correct. Without elastic recoil, small airways collapse during expiration before the lung fully empties. Air gets trapped, residual volume and TLC rise, and FEV1/FVC ratio FALLS (obstructive pattern) — the opposite of restrictive disease.</div>
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
        <h2 class="layer-title">What you see — and how you confirm an exacerbation</h2>
        <div class="layer-body">
          <p>Classic teaching contrasts two phenotypes, though most patients are a mix of both.</p>
          <div class="compare">
            <div class="compare-col">
              <div class="compare-head left">"Pink Puffer" (emphysema)</div>
              <div class="compare-item">Thin, older, dyspnoeic</div>
              <div class="compare-item">Pursed-lip breathing</div>
              <div class="compare-item">Barrel chest, hyperresonant</div>
              <div class="compare-item">Minimal cyanosis — "fights" for gas exchange</div>
            </div>
            <div class="compare-col">
              <div class="compare-head right">"Blue Bloater" (bronchitis)</div>
              <div class="compare-item">Overweight, productive cough</div>
              <div class="compare-item">Cyanotic — chronic hypoxaemia</div>
              <div class="compare-item">Signs of cor pulmonale (RHF)</div>
              <div class="compare-item">Wheeze, coarse crackles</div>
            </div>
          </div>
          <p><strong>Anthonisen criteria</strong> define an exacerbation — look for any of: (1) increased dyspnoea, (2) increased sputum volume, (3) increased sputum purulence. Purulent sputum is the strongest trigger for antibiotics.</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>CXR:</strong> hyperinflation, flattened diaphragms, increased retrosternal airspace, attenuated peripheral vessels. Mainly used to exclude a mimic (pneumonia, pneumothorax) rather than confirm COPD itself.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>ABG</strong> is the key test in a moderate–severe exacerbation: look for respiratory acidosis (↓pH, ↑PaCO₂). A chronically elevated bicarbonate on a baseline ABG shows renal metabolic compensation for chronic CO₂ retention.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.677–678 — COPD exacerbation diagnosis &amp; Anthonisen criteria</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Which single history finding most strongly indicates antibiotics are needed for this exacerbation?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Increased breathlessness alone</button>
          <button class="micro-btn" onclick="microAns(this, true)">Sputum turning purulent (yellow-green)</button>
          <button class="micro-btn" onclick="microAns(this, false)">Mild fatigue</button>
        </div>
        <div class="micro-ans" id="micro-ans-1">Correct. Increased sputum purulence is the strongest single predictor of a bacterial trigger and the criterion most tied to antibiotic benefit. Dyspnoea and sputum volume matter too (Anthonisen type I = all three present), but purulence is the one to anchor on.</div>
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
        <h2 class="layer-title">How you treat it — the O₂ trap everyone falls into</h2>
        <div class="layer-body">
          <p>The core bundle for an acute exacerbation is <strong>bronchodilators + steroids ± antibiotics ± controlled oxygen ± NIV</strong>.</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>Nebulised SABA + SAMA</strong> (e.g. albuterol + ipratropium) first-line — bronchodilation via β2-agonism and antimuscarinic action, combined for additive effect.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Controlled oxygen — target SpO₂ 88–92%, NOT 100%.</strong> High-flow O₂ can worsen V/Q mismatch and reduce hypoxic respiratory drive, precipitating CO₂ narcosis and worsening respiratory acidosis. This is the single most-tested pitfall in COPD management.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Systemic corticosteroids</strong> (e.g. prednisone, short 5-day course) reduce inflammation, shorten recovery, and reduce relapse — a standard part of every exacerbation, mild or severe.</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>NIV (BiPAP)</strong> is first-line respiratory support when there's respiratory acidosis (pH &lt;7.35) with preserved consciousness — it reduces work of breathing and avoids intubation. Reserve intubation for NIV failure, exhaustion, or reduced consciousness.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.678–680 — COPD management + Bronchodilators FA Pharmacology p.663</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">A COPD patient arrives hypoxic. Why not simply give high-flow 100% oxygen?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">It has no meaningful physiological effect</button>
          <button class="micro-btn" onclick="microAns(this, true)">Can worsen V/Q mismatch and blunt respiratory drive → CO₂ narcosis</button>
          <button class="micro-btn" onclick="microAns(this, false)">It immediately causes pneumothorax</button>
        </div>
        <div class="micro-ans" id="micro-ans-2">Correct. Uncontrolled high-flow O₂ can release hypoxic pulmonary vasoconstriction (worsening V/Q mismatch) and reduce respiratory drive in CO₂ retainers, both of which raise PaCO₂ and can precipitate acidosis and confusion. Titrate to SpO₂ 88–92%.</div>
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
      vitals: [{ l: 'BP', v: '134/82', n: false, w: false }, { l: 'HR', v: '92', n: false, w: true }, { l: 'RR', v: '20', n: false, w: true }, { l: 'SpO₂', v: '93%', n: false, w: true }, { l: 'Temp', v: '37.3°C', n: false, w: false }],
    },
    moderate: {
      label: 'Moderate', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '142/88', n: false, w: true }, { l: 'HR', v: '106', n: false, w: true }, { l: 'RR', v: '26', n: false, w: true }, { l: 'SpO₂', v: '89%', n: true, w: false }, { l: 'Temp', v: '37.8°C', n: false, w: true }],
    },
    severe: {
      label: 'Severe', cls: 'sev-severe',
      twist: 'Patient is becoming drowsy and confused. Repeat ABG shows worsening respiratory acidosis (pH 7.28, PaCO₂ 68). Escalation needed now.',
      vitals: [{ l: 'BP', v: '150/94', n: false, w: true }, { l: 'HR', v: '124', n: true, w: false }, { l: 'RR', v: '32', n: true, w: false }, { l: 'SpO₂', v: '82%', n: true, w: false }, { l: 'Temp', v: '38.1°C', n: false, w: true }],
    },
    atypical: {
      label: 'Atypical', cls: 'sev-atypical',
      twist: 'Atypical presentation — patient reports feeling unusually sleepy and mildly confused rather than markedly breathless, and her chest is unusually quiet on auscultation. A near-silent chest with minimal wheeze can mean too little air is moving to generate one — a red flag, not reassurance.',
      vitals: [{ l: 'BP', v: '128/80', n: false, w: false }, { l: 'HR', v: '98', n: false, w: true }, { l: 'RR', v: '24', n: false, w: true }, { l: 'SpO₂', v: '87%', n: true, w: false }, { l: 'Temp', v: '37.2°C', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      stem: 'She reports worsening breathlessness and more sputum over 3 days. What is the single most important history question right now?',
      fa: 'FA p.677 — Anthonisen criteria: dyspnoea, sputum volume, sputum purulence',
      opts: [
        { t: 'Has the colour or thickness of your sputum changed — is it yellow or green?', type: 'correct',
          fb_title: 'Correct — sputum purulence drives the antibiotic decision.',
          fb: "Purulent sputum is the strongest of the three Anthonisen criteria and the finding most closely tied to bacterial trigger and antibiotic benefit. Establishing this early shapes your entire management plan." },
        { t: 'Have you been using your rescue inhaler more than usual?', type: 'near',
          fb_title: 'Useful, but not the priority question.',
          fb: 'Rescue inhaler overuse confirms worsening symptoms and treatment failure at home — helpful context. But it does not tell you whether this is infective, and sputum character is the higher-yield question here.' },
        { t: 'Do you have any chest pain radiating to your jaw or arm?', type: 'wrong',
          fb_title: 'Low pre-test probability here.',
          fb: 'Always keep ACS on your differential for breathlessness, but this patient has a clear obstructive picture (known COPD, purulent-sounding cough, wheeze). Anchoring on cardiac chest pain here delays the more relevant respiratory workup.' },
        { t: 'How many years have you been smoking?', type: 'wrong',
          fb_title: 'Background information, not acute priority.',
          fb: 'Smoking history matters for long-term risk stratification and is presumably already known (COPD diagnosis implies significant smoking history). It does not change today\'s acute management the way sputum character does.' },
      ],
    },
    exam: {
      label: 'Physical Examination',
      stem: 'What is the MOST important physical exam finding to check for immediately in this breathless COPD patient?',
      fa: 'FA p.678 — Accessory muscle use, silent chest, and altered consciousness signal severe exacerbation',
      opts: [
        { t: 'Use of accessory muscles, pursed-lip breathing, and mental status', type: 'correct',
          fb_title: 'These flag severity and impending respiratory failure.',
          fb: 'Accessory muscle use and pursed-lip breathing show markedly increased work of breathing. Altered mental status suggests CO₂ narcosis or hypoxaemia — both are red flags for imminent respiratory failure requiring urgent escalation (NIV).' },
        { t: 'Presence of wheeze on auscultation', type: 'near',
          fb_title: 'Expected, but can be falsely reassuring.',
          fb: 'Wheeze confirms airflow obstruction but is not itself a severity marker — in fact, a "silent chest" (wheeze disappearing) with minimal air movement is more ominous than loud wheeze. Don\'t stop at "wheeze present, therefore mild."' },
        { t: 'Bilateral ankle oedema', type: 'near',
          fb_title: 'Relevant for cor pulmonale, not the acute priority.',
          fb: 'Peripheral oedema suggests chronic right heart strain (cor pulmonale) from long-standing COPD — useful chronic-disease context, but it does not tell you how the patient is doing right now the way work-of-breathing signs do.' },
        { t: 'Clubbing of the fingers', type: 'wrong',
          fb_title: 'Not expected and not the priority.',
          fb: "Clubbing is NOT typically a feature of COPD — its presence should make you reconsider the diagnosis (e.g. lung cancer, bronchiectasis, ILD). It is not a useful sign for judging this exacerbation's severity." },
      ],
    },
    labs: {
      label: 'Ordering Labs',
      stem: 'Which single test best confirms respiratory failure and guides your escalation decision?',
      fa: 'FA p.678 — ABG: respiratory acidosis with compensation defines severity in COPD',
      opts: [
        { t: 'Arterial blood gas (ABG)', type: 'correct',
          fb_title: 'ABG — the test that defines severity here.',
          fb: 'ABG directly shows PaO₂, PaCO₂, and pH. A falling pH with rising PaCO₂ (respiratory acidosis) tells you the patient is tiring and retaining CO₂ — this is exactly what determines whether NIV is needed. No other single test gives you this.' },
        { t: 'Sputum culture', type: 'near',
          fb_title: 'Useful for targeted therapy, not urgent severity assessment.',
          fb: 'Sputum culture can guide antibiotic choice if the patient fails empiric therapy or has resistant organism risk factors, but results take days and do not inform your immediate escalation decision the way an ABG does.' },
        { t: 'Full blood count', type: 'near',
          fb_title: 'Supportive, not the priority.',
          fb: 'A raised white cell count supports an infective trigger and polycythaemia can reflect chronic hypoxaemia, but neither tells you the patient\'s CURRENT acid-base and ventilatory status the way ABG does.' },
        { t: 'D-dimer', type: 'wrong',
          fb_title: 'Non-specific and not the priority here.',
          fb: 'D-dimer is useful when PE is a real competing diagnosis with low pre-test probability. In a patient with a classic infective COPD exacerbation picture, it is unlikely to change management and is often falsely elevated regardless.' },
      ],
    },
    imaging: {
      label: 'Imaging',
      stem: 'You order a CXR. Which pattern would you EXPECT in a COPD exacerbation, and why order it at all?',
      fa: 'FA p.677 — CXR in COPD: hyperinflation, flattened diaphragms; mainly used to exclude mimics',
      opts: [
        { t: 'Hyperinflation + flattened diaphragms + increased retrosternal airspace — ordered mainly to exclude pneumonia or pneumothorax', type: 'correct',
          fb_title: 'Correct — and correct reasoning for ordering it.',
          fb: "CXR in stable COPD shows hyperinflation and flattened diaphragms, but the main reason to order it during an exacerbation is to rule out a mimic or co-trigger — pneumonia, pneumothorax, or a new effusion — that would change management." },
        { t: 'Cardiomegaly + upper lobe blood diversion + Kerley B lines', type: 'wrong',
          fb_title: "That's the ADHF pattern — different pathology.",
          fb: 'Cardiomegaly with upper lobe diversion and Kerley B lines reflects cardiogenic pulmonary oedema, not obstructive lung disease. This patient\'s picture — known COPD, purulent sputum, wheeze — points to a respiratory, not cardiac, trigger. Classic Step 1 trap in reverse.' },
        { t: 'Unilateral consolidation with air bronchograms', type: 'near',
          fb_title: 'Would suggest a co-existing pneumonia, not COPD itself.',
          fb: 'If you saw this, it would suggest a pneumonic trigger for the exacerbation rather than COPD changes alone — worth recognising, but it is not the expected baseline COPD pattern the question is asking about.' },
        { t: 'Normal chest X-ray, no imaging needed', type: 'wrong',
          fb_title: "Skipping imaging risks missing a mimic.",
          fb: 'Even though CXR does not diagnose COPD itself, skipping it in a moderate–severe exacerbation risks missing pneumonia, pneumothorax, or effusion — any of which would change your management plan.' },
      ],
    },
    treat: {
      label: 'Treatment',
      stem: 'Diagnosis confirmed: moderate–severe COPD exacerbation, SpO₂ 89% on room air, purulent sputum. What is the correct IMMEDIATE management bundle?',
      fa: 'FA p.678–680 — COPD exacerbation bundle: bronchodilators + steroids + antibiotics + controlled O₂',
      opts: [
        { t: 'Nebulised SABA + SAMA + systemic corticosteroids + antibiotics + controlled O₂ titrated to SpO₂ 88–92%', type: 'correct',
          fb_title: 'Correct — the full evidence-based bundle.',
          fb: 'Bronchodilators relieve obstruction, steroids reduce inflammation and shorten recovery, antibiotics are indicated given purulent sputum, and controlled oxygen avoids precipitating CO₂ retention. This is the standard bundle for a moderate–severe exacerbation.' },
        { t: 'High-flow 100% oxygen by non-rebreather mask + IV fluids', type: 'wrong',
          fb_title: 'DANGEROUS — risks CO₂ narcosis.',
          fb: 'Uncontrolled high-flow oxygen in COPD can worsen V/Q mismatch and blunt respiratory drive, precipitating CO₂ retention and respiratory acidosis. Always titrate oxygen to a target range (typically SpO₂ 88–92%) in known or suspected COPD.' },
        { t: 'Nebulised bronchodilators + corticosteroids only, hold antibiotics', type: 'near',
          fb_title: 'Missing a clearly indicated component.',
          fb: 'Bronchodilators and steroids are correct, but this patient has purulent sputum — a clear indication for antibiotics per Anthonisen criteria. Withholding them here is a missed opportunity to treat the likely bacterial trigger.' },
        { t: 'Immediate intubation and mechanical ventilation', type: 'wrong',
          fb_title: 'Too aggressive at this stage.',
          fb: 'This patient is hypoxic but not yet in extremis. NIV (BiPAP) is first-line if respiratory acidosis develops with preserved consciousness. Reserve intubation for NIV failure, exhaustion, or reduced consciousness — not the initial move here.' },
      ],
    },
  },

  ddx: [
    { name: 'COPD Exacerbation', correct: true,
      reason: '✓ Confirmed. Known COPD + increased dyspnoea + increased purulent sputum (all 3 Anthonisen criteria) + wheeze/prolonged expiration + hyperinflated CXR without consolidation = infective COPD exacerbation.' },
    { name: 'Acute Decompensated Heart Failure', correct: false,
      reason: '✗ Ruled out. No orthopnoea, no elevated JVP or S3, no bilateral pitting oedema, and CXR shows hyperinflation rather than cardiomegaly with upper-lobe diversion. The purulent sputum and known COPD history point to an infective respiratory trigger, not cardiac.' },
    { name: 'Community-Acquired Pneumonia', correct: false,
      reason: '✗ Ruled out. Would expect focal consolidation with air bronchograms on CXR and often a more focal exam finding (bronchial breathing, dullness). This CXR shows diffuse hyperinflation, not lobar consolidation — though pneumonia can coexist and should always be actively excluded.' },
    { name: 'Pulmonary Embolism', correct: false,
      reason: '✗ Ruled out. PE classically causes sudden pleuritic chest pain and tachycardia without a preceding infective prodrome. This patient has a gradual 3-day history with purulent sputum and known COPD — a far more typical infective trigger than embolic.' },
    { name: 'Pneumothorax', correct: false,
      reason: '✗ Ruled out. Would present with sudden unilateral pleuritic pain, unilateral hyper-resonance, and absent breath sounds on one side. This patient has a symmetric, gradual, infective-sounding picture — CXR is used specifically to exclude this before finalising the diagnosis.' },
  ],

  teaching: [
    'Anthonisen criteria define an exacerbation: increased dyspnoea, increased sputum volume, increased sputum purulence. Purulence is the strongest driver for antibiotics.',
    'Controlled oxygen — target SpO₂ 88–92%, not 100%. Uncontrolled high-flow O₂ can worsen V/Q mismatch and blunt respiratory drive, precipitating CO₂ narcosis.',
    'NIV (BiPAP) is first-line for respiratory acidosis (pH <7.35) with preserved consciousness — reduces work of breathing and avoids intubation.',
    'A "silent chest" with minimal wheeze is a red flag, not reassurance — it can mean too little air is moving to generate a wheeze at all.',
    'CXR in COPD shows hyperinflation, flattened diaphragms, and increased retrosternal airspace — but its main acute use is excluding mimics (pneumonia, pneumothorax), not diagnosing COPD itself.',
    'Clubbing is NOT a feature of COPD — its presence should prompt you to reconsider the diagnosis (lung cancer, bronchiectasis, ILD).',
    'Systemic corticosteroids (short course, e.g. 5 days of prednisone) are standard in every exacerbation, mild through severe — they shorten recovery and reduce relapse.',
  ],
};
