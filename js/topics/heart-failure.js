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
    appearance: { build: 'average', posture: 'propped', age: 'older', hair: 'short', skin: 'mid', clothes: 'gown', cannula: true },
    inspection: 'Sat bolt upright in bed, breathless at rest, on 2L oxygen. Ankles visibly swollen.'
  },

  // ── LEARN DATA (3 layers, each a function) ──
  layers: [
    {
      kicker: 'Physiology',
      title: 'How the normal heart works — and how it fails',
      blocks: [
        { k: 'text', t: 'The heart has one job: maintain <strong>cardiac output</strong>. Everything that goes wrong in heart failure is a consequence of failing at that, or of the body trying too hard to compensate.' },
        { k: 'point', t: 'CO = heart rate × stroke volume',
          d: 'Stroke volume rests on three things: <em>preload</em> (how full the ventricle is), <em>afterload</em> (what it pumps against), and <em>contractility</em> (how hard it squeezes). Every heart failure drug moves one of these.' },
        { k: 'point', hi: true, t: 'Frank-Starling: stretch buys force, until it does not',
          d: 'Up to a point, a fuller ventricle contracts harder. In heart failure the curve shifts right and flattens — more stretch gives no more force, only congestion. This is why the failing heart drowns rather than pumps.' },
        { k: 'chain', t: 'The compensation that becomes the disease',
          steps: [
            'Cardiac output falls',
            'Renal perfusion drops — RAAS activates',
            'Aldosterone retains sodium and water',
            'Preload rises: more stretch, no more force',
            'Sympathetic surge raises rate and afterload',
            'Ventricle remodels and stiffens — output falls further',
          ] },
        { k: 'point', t: 'BNP is a rule-out test',
          d: 'Released by ventricular myocytes when the wall is stretched. Below 100 pg/mL (NT-proBNP below 300) heart failure is very unlikely — that is high sensitivity at work. Ruling it <em>in</em> needs age-adjusted NT-proBNP: above 450 under 50, 900 at 50–75, 1800 over 75.' },
        { k: 'check',
          q: 'Which compensatory mechanism is the one that drives fluid retention?',
          opts: [
            { t: 'Sympathetic activation raising heart rate' },
            { t: 'RAAS activation retaining sodium and water', ok: true },
            { t: 'Ventricular hypertrophy raising stroke volume' },
          ],
          why: 'RAAS is the fluid pathway. Low renal perfusion releases renin, which yields angiotensin II, which yields aldosterone, which holds onto sodium and water — and that is preload. The sympathetic surge raises rate and contractility rather than volume, and hypertrophy is a structural response over months, not a fluid one.' },
      ],
    },

    {
      kicker: 'Clinical',
      title: 'What you see — and how you confirm it',
      blocks: [
        { k: 'text', t: 'Left and right heart failure look different because they back up into different circuits. Left backs up into the lungs; right backs up into the body.' },
        { k: 'compare',
          a: { h: 'Left HF — raised PCWP', items: [
            'Pulmonary oedema, so crackles',
            'Orthopnoea — cannot lie flat',
            'Paroxysmal nocturnal dyspnoea',
            'S3 gallop from a volume-loaded ventricle',
            'Pink frothy sputum when severe',
          ] },
          b: { h: 'Right HF — raised JVP', items: [
            'Elevated JVP, the most specific sign',
            'Bilateral pitting oedema',
            'Hepatomegaly, later ascites',
            'Most common cause is left heart failure',
            'Congestive hepatopathy is a late finding',
          ] } },
        { k: 'point', t: 'The chest film shows redistributed fluid, and it is bilateral',
          d: 'Cardiomegaly (cardiothoracic ratio above 0.5), upper lobe blood diversion, Kerley B lines from engorged lymphatics, and bat-wing perihilar opacity. Unilateral or focal changes should make you reconsider the diagnosis.' },
        { k: 'point', t: 'Echo gives you the ejection fraction, and the EF decides the treatment',
          d: '<em>HFrEF</em> is EF below 40% — a ventricle that cannot squeeze. <em>HFpEF</em> is EF at or above 50% — a stiff ventricle that cannot fill. ACE inhibitors and beta-blockers do not improve survival in HFpEF, but SGLT2 inhibitors reduce hospitalisation and cardiovascular death.' },
        { k: 'check',
          q: 'A breathless patient could be cardiac or respiratory. Which finding separates them most specifically?',
          opts: [
            { t: 'Bilateral crackles at both lung bases' },
            { t: 'Elevated JVP with an S3 gallop', ok: true },
            { t: 'Bilateral pitting oedema of the legs' },
          ],
          why: 'Specificity is what you need here, not sensitivity. A raised JVP reflects right-heart filling pressure and is purely cardiac; the S3 marks a volume-loaded ventricle. Crackles occur in pneumonia and fibrosis, and bilateral oedema has a long non-cardiac list — venous insufficiency, low albumin, calcium channel blockers, nephrotic syndrome. Both are sensitive and neither is specific.' },
      ],
    },

    {
      kicker: 'Management',
      title: 'How you treat it — acute and chronic',
      blocks: [
        { k: 'text', t: 'Treatment splits cleanly in two, and confusing them is the classic error. <strong>Acute decompensation</strong> is about unloading the ventricle now. <strong>Chronic HFrEF</strong> is about reducing mortality over years. A drug that helps one can harm the other.' },
        { k: 'chain', t: 'The acute bundle',
          steps: [
            'Sit the patient upright — drops venous return',
            'Oxygen only if hypoxaemic: SpO₂ below 90% or PaO₂ below 60 mmHg',
            'IV furosemide — venodilates within minutes, then diureses',
            'Continuous monitoring for arrhythmia and deterioration',
          ] },
        { k: 'point', hi: true, t: 'Never start a beta-blocker during acute decompensation',
          d: 'They reduce contractility exactly when you need it. If the patient is already established on one, continue it at a lower dose. Start one only once the patient is euvolaemic and stable — and then it saves lives.' },
        { k: 'point', t: 'Oxygen is a drug, not a comfort measure',
          d: 'Given to a patient who is not hypoxaemic it raises systemic vascular resistance, lowers cardiac output and reduces coronary flow. Treat the hypoxaemia; do not chase a number.' },
        { k: 'chain', t: 'Chronic HFrEF — the drugs that reduce mortality',
          steps: [
            'ACE inhibitor or ARB — blocks RAAS, prevents remodelling',
            'Beta-blocker (metoprolol succinate or carvedilol) — reverses remodelling',
            'MRA such as spironolactone — blocks aldosterone, reduces fibrosis',
            'SGLT2 inhibitor — now part of the foundation, and it works in HFpEF too',
          ] },
        { k: 'point', t: 'Furosemide relieves symptoms; it does not extend life',
          d: 'It inhibits the Na⁺/K⁺/2Cl⁻ co-transporter in the thick ascending limb, dropping preload. Essential for congestion, and worth knowing it has never shown a mortality benefit. Watch the potassium.' },
        { k: 'check',
          q: 'A patient with HFrEF, EF 28%, is newly stable after diuresis. Which drug does most for survival now?',
          opts: [
            { t: 'Digoxin' },
            { t: 'An ACE inhibitor such as lisinopril', ok: true },
            { t: 'Continuing furosemide alone' },
          ],
          why: 'The word doing the work is <em>survival</em>. ACE inhibitors block RAAS, reduce afterload and prevent remodelling, and they reduce mortality. Furosemide makes the patient feel better without extending life. Digoxin reduces hospitalisations but not mortality. Note the timing too: now that the patient is stable, this is exactly the moment to start the chronic regimen.' },
      ],
    },
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
      concept: "Concept — in a breathless cardiac patient, exclude the acute killer before characterising the chronic syndrome.",
      opts: [
        { t: 'Any chest pain or pressure associated with this breathlessness?', type: 'correct', d: "Screens for an acute coronary event driving the decompensation.",
          fb_title: 'Correct — ACS must be excluded first.',
          fb: 'Acute MI can precipitate acute decompensated HF. Always ask about chest pain before anything else in a breathless cardiac patient — it changes your immediate management. Ruling out ACS is step one.' },
        { t: 'How many pillows do you use to sleep at night?', type: 'near', d: "Quantifies orthopnoea, a marker of cardiac dyspnoea.",
          fb_title: 'Good — orthopnoea confirms cardiac dyspnoea.',
          fb: "Orthopnoea (needing pillows to breathe) strongly favours cardiac over respiratory dyspnoea. Good question — but ask about chest pain first to exclude an acute coronary event driving this presentation." },
        { t: 'Any recent fever or cough suggesting infection?', type: 'wrong', d: "Looks for an infective trigger or a respiratory mimic.",
          fb_title: 'Not the priority here.',
          fb: 'Infection can trigger HF decompensation but bilateral leg oedema + orthopnoea + prior MI strongly points cardiac. Pursuing infection history first when there are clear cardiac flags wastes critical time.' },
        { t: 'Any recent change in your medications?', type: 'wrong', d: "Checks adherence and new drugs that precipitate decompensation.",
          fb_title: 'Relevant later — not your opening question.',
          fb: 'Non-compliance with diuretics/ACEi is a common HF trigger, but with acute decompensation you need to establish the acute risk (ACS? shock?) before taking a drug history.' },
      ],
    },
    exam: {
      label: 'Physical Examination',
      stem: 'What is the MOST diagnostically specific physical exam finding for confirming a cardiac cause of this presentation?',
      concept: "Concept — specificity beats sensitivity. Central congestion signs localise to the heart; peripheral ones have too many causes.",
      opts: [
        { t: 'Elevated JVP + bilateral basal crackles + S3 gallop', type: 'correct', d: "Central signs of raised cardiac filling pressures.",
          fb_title: 'The classic ADHF triad.',
          fb: 'Elevated JVP = raised right-sided filling pressures (cardiac). Basal crackles = pulmonary oedema from raised PCWP (cardiac). S3 = volume-overloaded ventricle (cardiac). This triad essentially confirms ADHF without investigations.' },
        { t: 'Bilateral pitting oedema to the knees', type: 'near', d: "Peripheral marker of fluid retention.",
          fb_title: 'Supportive but not specific.',
          fb: 'Bilateral oedema has many causes — venous insufficiency, hypoalbuminaemia, CCBs, nephrotic syndrome. It supports HF but central signs (JVP, S3, crackles) are far more specific for cardiac aetiology.' },
        { t: 'Dullness to percussion at both lung bases', type: 'near', d: "Screens for pleural effusions.",
          fb_title: 'Suggests pleural effusions — not specific.',
          fb: 'Pleural effusions occur in HF but also in pneumonia, malignancy, PE, hypoalbuminaemia. The JVP + S3 + crackles triad is specific to cardiac congestion — dullness alone does not differentiate.' },
        { t: 'Tender hepatomegaly', type: 'wrong', d: "Assesses congestive hepatopathy from right heart strain.",
          fb_title: 'Late right HF sign — not most diagnostic.',
          fb: 'Congestive hepatopathy and hepatomegaly indicate established right heart failure. While relevant, this is a late finding. The JVP + S3 + crackles triad is the primary diagnostic combination for ADHF.' },
      ],
    },
    labs: {
      label: 'Ordering Labs',
      stem: 'Which single lab result does most to settle whether this breathlessness is cardiac, and how bad it is?',
      concept: "Concept — one test confirms the syndrome (ventricular wall stress), another excludes its trigger (myocyte injury). They answer different questions.",
      opts: [
        { t: 'BNP (Brain Natriuretic Peptide)', type: 'correct', d: "Ventricular wall-stress biomarker, released under volume load.",
          fb_title: 'BNP — the right test, read the right way.',
          fb: "BNP is the natriuretic peptide test, released by ventricular myocytes under wall stress. Read its direction carefully: it has high SENSITIVITY, so a low value excludes — BNP &lt;100 pg/mL (NT-proBNP &lt;300) makes heart failure very unlikely. A high value does not confirm on its own, because ruling in needs age-adjusted NT-proBNP thresholds (&gt;450 under 50, &gt;900 at 50–75, &gt;1800 over 75). A fall of &gt;30% during admission predicts lower readmission, but targeting that number has not been shown to improve outcomes." },
        { t: 'Troponin I', type: 'near', d: "Marker of myocardial injury.",
          fb_title: 'Important — but confirms ACS, not HF.',
          fb: 'Troponin is essential to rule out ACS as the precipitant (always order it). Mildly elevated troponin also occurs in ADHF itself ("demand ischaemia"). But troponin speaks to myocyte injury, not to ventricular loading — BNP is the test that addresses the breathlessness itself. Order both.' },
        { t: 'Full blood count', type: 'near', d: "Screens for anaemia and infection as precipitants.",
          fb_title: 'Useful for triggers — not diagnostic.',
          fb: 'Anaemia (Hb <10) can precipitate or worsen HF by increasing cardiac demand. Always check FBC. But it doesn\'t confirm the diagnosis. BNP, troponin, and U&E/renal function are your priority labs.' },
        { t: 'Liver function tests', type: 'wrong', d: "Assesses hepatic congestion and drug tolerance.",
          fb_title: 'Not your first priority.',
          fb: "LFTs are useful for assessing congestive hepatopathy in chronic HF and monitoring medications. But in the acute setting they don't confirm diagnosis or guide immediate management. Focus on BNP, troponin, renal function first." },
      ],
    },
    imaging: {
      label: 'Imaging',
      stem: 'You order a CXR. Which pattern would you EXPECT in acute decompensated HF?',
      concept: "Concept — the failing heart redistributes fluid by hydrostatic pressure, so the film changes are bilateral. Air trapping and focal consolidation belong to other diseases.",
      opts: [
        { t: 'Cardiomegaly + upper lobe blood diversion + Kerley B lines + perihilar bat-wing opacity', type: 'correct', d: "Cardiac enlargement with redistributed pulmonary fluid.",
          fb_title: 'The classic ADHF CXR — memorise this.',
          fb: 'CTR >0.5 = dilated chambers. Upper lobe diversion = PCWP >12 mmHg. Kerley B lines = engorged lymphatics at pleural edges (1–2cm horizontal lines). Bat-wing perihilar opacity = bilateral pulmonary oedema. This constellation = ADHF on CXR.' },
        { t: 'Hyperinflation + flattened diaphragm + ↑AP diameter', type: 'wrong', d: "Air trapping and chest-wall changes of obstructive disease.",
          fb_title: "That's COPD/emphysema — different pathology entirely.",
          fb: 'Hyperinflation with flattened diaphragms = obstructive lung disease (COPD, emphysema). This patient has cardiac pathology. The HF CXR shows fluid redistribution and cardiac enlargement, not air trapping. Classic Step 1 trap.' },
        { t: 'Bilateral lower zone ground-glass opacification', type: 'near', d: "Diffuse alveolar filling at both bases.",
          fb_title: 'Possible in pulmonary oedema — but not specific.',
          fb: 'Ground-glass changes can occur in pulmonary oedema but also in pneumonia, ARDS, pulmonary haemorrhage. The specific ADHF pattern is cardiomegaly + upper lobe diversion + Kerley B lines — the full constellation.' },
        { t: 'Unilateral consolidation with air bronchograms', type: 'wrong', d: "Focal lobar airspace opacification.",
          fb_title: 'Classic pneumonia — not HF.',
          fb: 'Unilateral lobar consolidation with air bronchograms = bacterial pneumonia. HF causes BILATERAL changes reflecting raised hydrostatic pressure. If you see unilateral opacity, reconsider your differential — could be missed pneumonia triggering HF.' },
      ],
    },
    treat: {
      label: 'Treatment',
      stem: 'Diagnosis confirmed: acute decompensated HFrEF, EF 28%, SpO₂ 88% on room air. What is the correct IMMEDIATE management bundle?',
      concept: "Concept — in acute decompensation you unload the ventricle. Drugs that improve survival by reducing contractility are started only once the patient is dry and stable.",
      opts: [
        { t: 'Supplemental O₂ + sit upright + IV furosemide + continuous monitoring', type: 'correct', d: "Oxygenate, offload preload, and watch for deterioration.",
          fb_title: 'Correct acute ADHF bundle.',
          fb: 'Oxygen here is to correct hypoxaemia — this patient is at 88% — not to push a well-saturated patient higher. Give it for SpO₂ &lt;90% or PaO₂ &lt;60 mmHg; routine oxygen in a non-hypoxaemic patient raises systemic vascular resistance and lowers cardiac output. Sitting upright reduces venous return (↓preload). IV furosemide venodilates within minutes, then diureses — rapid preload reduction. Continuous monitoring for arrhythmias and haemodynamic deterioration.' },
        { t: 'Start oral metoprolol 25mg + lisinopril immediately', type: 'wrong', d: "Begin long-term neurohormonal blockade now.",
          harm: 'Within the hour the blood pressure drops and the patient becomes clammy. The beta-blocker has cut contractility in a ventricle that was already failing.',
          fb_title: 'DANGEROUS — never start BB in acute decompensation.',
          fb: 'Beta-blockers are CONTRAINDICATED in acute ADHF — they reduce contractility and worsen haemodynamics acutely. If patient is already on a BB, continue at lower dose. Only initiate after achieving euvolaemia. Lisinopril can be started once stable.' },
        { t: 'IV furosemide + IV dobutamine + urgent cardiology consult', type: 'near', d: "Diuresis plus inotropic support and specialist input.",
          fb_title: 'Partially correct — dobutamine only for low-output.',
          fb: 'Furosemide is correct. Dobutamine (inotrope) is reserved for cardiogenic shock / low-output state (cold + wet profile: low BP, low CO, high filling pressures). If BP and perfusion are adequate, start with diuresis alone. Cardiology consult is appropriate.' },
        { t: 'IV norepinephrine + intubation + ICU transfer', type: 'wrong', d: "Full haemodynamic and ventilatory takeover.",
          fb_title: 'Too aggressive — this is not yet cardiogenic shock.',
          fb: 'Vasopressors and intubation are for cardiogenic shock (SBP <90 + end-organ hypoperfusion). Even in severe ADHF, try diuresis + O₂ first. Escalate to vasopressors/intubation only if haemodynamics do not respond or the patient tires.' },
      ],
    },
  },


  // The two diagnoses that are hardest to tell apart at the bedside,
  // laid out on the features that actually separate them.
  contrast: {
    a: 'Acute decompensated heart failure',
    b: 'COPD exacerbation',
    rows: [
      { f: 'Dyspnoea pattern',   a: 'Orthopnoea and PND; worse lying flat',        b: 'Worse on exertion; no true orthopnoea' },
      { f: 'Onset',              a: 'Hours to days, often with weight gain',        b: 'Days, following a change in sputum' },
      { f: 'Auscultation',       a: 'Bibasal fine crackles, S3 gallop',             b: 'Widespread wheeze, prolonged expiration' },
      { f: 'JVP',                a: 'Elevated',                                      b: 'Normal unless cor pulmonale is established' },
      { f: 'Peripheral oedema',  a: 'Bilateral and pitting, often above the ankles', b: 'Only with established right heart strain' },
      { f: 'Chest X-ray',        a: 'Cardiomegaly, upper lobe diversion, Kerley B lines', b: 'Hyperinflation, flattened diaphragms' },
      { f: 'Natriuretic peptide',a: 'Elevated',                                      b: 'Normal or minimally raised' },
      { f: 'What helps',         a: 'Diuresis and preload reduction',                b: 'Bronchodilators and corticosteroids' },
    ],
  },
  takeaway: 'Both patients are breathless and both may be oedematous. The separation is central: a raised JVP, an S3 and a raised natriuretic peptide point at the pump. Wheeze, hyperinflation and a change in sputum point at the airway.',

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
    'BNP is a rule-OUT test. Below 100 pg/mL (NT-proBNP below 300) heart failure is very unlikely — that is its high sensitivity at work. Ruling IN needs age-adjusted NT-proBNP: above 450 under 50, 900 at 50–75, 1800 over 75.',
    'JVP + S3 gallop + bilateral basal crackles = the ADHF triad. Memorise this. JVP is most specific for cardiac cause.',
    'NEVER initiate beta-blockers in acute decompensation — acutely worsens haemodynamics. Start only once euvolemic and stable.',
    'CXR in ADHF: cardiomegaly + upper lobe blood diversion + Kerley B lines + perihilar bat-wing opacity.',
    'HFrEF long-term mortality triad: ACEi/ARB + beta-blocker (metoprolol succinate) + MRA (spironolactone).',
    'Furosemide: inhibits Na⁺/K⁺/2Cl⁻ in thick ascending limb. Venodilates BEFORE diuresis — immediate preload reduction. Watch K⁺.',
    'HFpEF (EF ≥50%) = diastolic failure — a stiff ventricle that cannot fill. ACE inhibitors and beta-blockers have never shown a mortality benefit here, but SGLT2 inhibitors have: they carry a Class 2a recommendation in HFpEF and reduce heart failure hospitalisation and cardiovascular death.',
  ],
};
