// ────────────────────────────────────────────────
// TOPIC: Pulmonary Embolism  (Respiratory · Topic 05)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['pulmonary-embolism'] = {
  id: 'pulmonary-embolism',
  number: 5,
  system: 'Respiratory',
  title: 'Pulmonary Embolism',
  navMeta: 'Respiratory · Pulmonary Embolism',
  desc: 'A clot from the systemic veins lodges in the pulmonary arteries, and the lungs become a circulation problem rather than an airway one. Covers the probability-first diagnostic pathway, the physiology of a clear chest with falling saturations, and the line between anticoagulation and reperfusion.',
  tags: [
    { label: 'Respiratory', cls: 'tag-resp' },
    { label: 'Time-critical', cls: 'tag-pharma' },
    { label: 'Vascular', cls: 'tag-renal' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Ms. Amara Diallo',
    meta: '44F · Combined oral contraceptive, 14-hour flight three days ago · Walked in',
    cc: '"I get this sharp pain in the side of my chest every time I breathe in. It started yesterday, and I cannot walk to the kitchen without stopping to catch my breath."',
    inspection: 'Tachypnoeic at rest but speaking in full sentences. Chest expansion symmetrical, no tracheal deviation, breath sounds clear.',
  },

  // ── LEARN ──
  layers: [
    {
      kicker: 'Physiology',
      title: 'Why a clot in the leg is a lung problem',
      blocks: [
        { k: 'text', t: 'Pulmonary embolism is not a lung disease. It is a venous disease that ends up in the lungs: the deep-vein thrombus and the embolus are one clot seen at two addresses. Everything about the presentation — the clear chest, the falling saturations, the racing heart — follows from where the clot sits and what it does to the circulation.' },
        { k: 'point', hi: true, t: 'Virchow still explains every risk factor you will ever be asked about',
          d: 'Stasis (long flights, surgery, immobility), endothelial injury (trauma, surgery, lines) and hypercoagulability (oestrogen, pregnancy, malignancy, thrombophilia) — every risk factor on every list is one of these three. Her story is two of them in a single week: fourteen hours of venous stasis, and an oestrogen-containing contraceptive.' },
        { k: 'chain', t: 'From stasis to obstructive shock, in order',
          steps: [
            'Stasis and hypercoagulability form a thrombus in a deep calf or thigh vein',
            'Part of it dislodges and rides through the right atrium and ventricle',
            'It lodges in a branch of the pulmonary artery: distal alveoli are ventilated but no longer perfused — dead space',
            'Flow diverts to unoccluded vessels, and released mediators (serotonin, thromboxane) vasoconstrict them too — mismatch everywhere',
            'Hypoxaemia and hypocapnia appear; the patient breathes faster and harder',
            'The right ventricle faces a sudden afterload it has never trained for — it dilates, then fails',
            'Output falls: tachycardia, hypotension, syncope',
          ] },
        { k: 'point', t: 'Massive PE kills the circulation, not the lungs',
          d: 'The right ventricle is a thin-walled volume pump; it cannot hypertrophy its way out of a pressure that arrived in the last hour. It dilates, the septum shifts left, and the left ventricle cannot fill. That is <em>obstructive shock</em> — hypotension with a raised JVP and clear lungs — and it is why blood pressure, not oxygen saturation or clot size, is what moves thrombolysis from "never" to "now".' },
        { k: 'point', t: 'Why the chest sounds so normal',
          d: 'The airway and the parenchyma are intact. Breath sounds are clear, the film is clear, and there is nothing to hear — which is exactly the clue. Hypoxaemia with a clear chest and a tachycardia is the PE signature, because pneumonia and heart failure both leave their marks on the chest X-ray and PE usually does not.' },
        { k: 'check',
          q: 'A pulmonary embolus makes the patient hypoxic. What is the direct mechanism?',
          opts: [
            { t: 'Ventilated alveoli beyond the clot become dead space, and diverted flow is mismatched to what it reaches', ok: true },
            { t: 'Oedema fluid floods the alveoli and blocks diffusion across the membrane' },
            { t: 'Bronchospasm narrows the airways and traps air distally' },
          ],
          why: 'The clot is in the vasculature, so the disturbance is a <em>perfusion</em> problem: alveoli keep receiving air that never meets blood, and blood shunted elsewhere meets alveoli in the wrong proportions — V/Q mismatch. Oedema flooding the alveoli is the mechanism in heart failure and pneumonia, both of which mark the chest X-ray. Bronchoconstriction does occur in PE, but it is a side-effect of released mediators, not the reason the saturations fall.' },
      ],
    },

    {
      kicker: 'Probability',
      title: 'What it looks like — and how to weigh it before you scan it',
      blocks: [
        { k: 'text', t: 'No single symptom or sign diagnoses a pulmonary embolism. The diagnosis is built by adding small pieces of evidence together, which is why every pathway in the world starts with an explicit probability score rather than a test. The score is not bureaucracy — it decides which test can be trusted.' },
        { k: 'compare',
          a: { h: 'What raises the probability', items: [
            'Unilateral calf swelling or tenderness — the source clot',
            'Heart rate above 100',
            'Surgery or immobilisation within four weeks',
            'Previous venous thromboembolism',
            'Haemoptysis — usually small volume and late',
            'Active malignancy',
            'No better alternative explanation',
          ] },
          b: { h: 'What a negative PERC score does', items: [
            'Age under 50, heart rate under 100',
            'Saturation 95% or above on air',
            'No unilateral leg signs, no haemoptysis',
            'No recent surgery or trauma, no prior VTE',
            'No oestrogen use',
            'All eight negative in a low-suspicion patient: PE is ruled out with no test at all',
          ] } },
        { k: 'point', hi: true, t: 'The ECG is a trap for the unwary',
          d: 'The commonest ECG finding in PE is <em>sinus tachycardia</em>. S1Q3T3 — the deep S in lead I with a Q wave and inverted T in lead III — is the examination answer, and it is neither sensitive nor early. Look instead for right heart strain: new right bundle branch block, T-wave inversion across V1–V4, right axis deviation. Their absence excludes nothing; their presence in a hypoxic patient is close to a diagnosis.' },
        { k: 'point', t: 'The chest X-ray helps by what it does not show',
          d: 'A normal film in a hypoxic, tachycardic patient actively raises the probability of PE, because pneumonia, oedema and pneumothorax all declare themselves. It also covers the two things that must not be missed before anticoagulation planning — and small peripheral opacities or effusions from infarction, when present, fit the story.' },
        { k: 'check',
          q: 'A 44-year-old on the combined pill, three days off a long-haul flight: heart rate 104, saturations 93%, pleuritic pain, clear chest X-ray. What is the next step?',
          opts: [
            { t: 'CT pulmonary angiography — the probability is high enough that a D-dimer cannot help', ok: true },
            { t: 'D-dimer first, and stop if it is negative' },
            { t: 'Antibiotics for community-acquired pneumonia and review in the morning' },
          ],
          why: 'D-dimer is only useful when the probability is low enough that a negative result truly ends the question. In a patient with this risk profile and this presentation, the probability is already high — so a negative D-dimer would not be believed and a positive one was expected; either way the scan was always coming, and ordering the blood test first only moves the scan later in the day. Clear lungs and no fever make pneumonia the explanation that has to be proved, not presumed.' },
      ],
    },

    {
      kicker: 'Management',
      title: 'Probability first, imaging second, anticoagulation for almost everyone',
      blocks: [
        { k: 'text', t: 'PE management is a decision tree with exactly three branches: exclude it cheaply, confirm it, and then treat by how much circulation is left. Most of the errors in real practice are shortcuts taken between those branches.' },
        { k: 'chain', t: 'The diagnostic and treatment pathway',
          steps: [
            'Assess probability explicitly — Wells or Geneva',
            'Low or intermediate probability, low suspicion: D-dimer; a negative ends the workup',
            'High probability, or D-dimer positive: CT pulmonary angiography',
            'Haemodynamically stable: anticoagulation — LMWH or a DOAC, at least three months',
            'Haemodynamically unstable: reperfusion — systemic thrombolysis',
            'Treat the source: stop provoking factors, examine the legs, plan duration',
          ] },
        { k: 'point', hi: true, t: 'D-dimer rules out; it never rules in',
          d: 'It is a marker of fibrin turnover — exquisitely <em>sensitive</em> (a negative result in a low-probability patient effectively excludes PE) and uselessly <em>non-specific</em>: it rises after surgery, in pregnancy, with infection, malignancy and normal ageing, which is why age-adjusted cutoffs exist. In the high-probability patient it is confirmatory noise. It is a gate you walk through or past, not a destination.' },
        { k: 'point', t: 'Anticoagulation is the definitive treatment — timing beats route',
          d: 'The clot is not surgically removed; it is prevented from growing while endogenous fibrinolysis dismantles it. That is why anticoagulation starts the moment the diagnosis is made — LMWH or fondaparinux, or a DOAC such as apixaban or rivaroxaban from the outset — and why duration is a separate decision: at least three months for a provoked event, longer if it was unprovoked or recurrent. The provocation in her case — the contraceptive — stops the day it is identified.' },
        { k: 'point', t: 'Thrombolysis belongs to the failing circulation — and to the one about to fail',
          d: 'Sub-massive PE — right ventricular strain with positive biomarkers but normal blood pressure — is monitored closely, with rescue thrombolysis if the patient deteriorates; many of these patients were never hypotensive at presentation, and the monitoring is what keeps reperfusion available to them. Massive PE, meaning hypotension, is thrombolysed up front. In a low-risk patient with a normal right ventricle, giving a thrombolytic adds a one-to-two per cent intracranial haemorrhage rate to a disease that anticoagulation was already curing.' },
        { k: 'check',
          q: 'CTPA confirms a segmental PE. Blood pressure 118/74, heart rate 96, right ventricle normal on echocardiography. Treatment?',
          opts: [
            { t: 'Anticoagulate — LMWH or a DOAC from today, planned for at least three months', ok: true },
            { t: 'Thrombolyse to dissolve the clot completely and quickly' },
            { t: 'Aspirin for three months, then review' },
          ],
          why: 'With a normal blood pressure and a normal right ventricle, the clot is not killing her today — and anticoagulation lets her own fibrinolytic system clear it over days to weeks. Thrombolysis buys speed she does not need and charges a bleeding price she must not pay. Aspirin is the wrong family entirely: venous thrombus is fibrin- and red-cell-rich, which is why anticoagulants treat it and antiplatelets do not.' },
      ],
    },
  ],

  // ── CASE DATA ──
  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: {
    mild: {
      label: 'Segmental PE, stable', cls: 'sev-mild', twist: null,
      vitals: [{ l: 'BP', v: '122/76', n: false, w: false }, { l: 'HR', v: '98', n: false, w: false }, { l: 'RR', v: '19', n: false, w: false }, { l: 'SpO₂', v: '94', n: false, w: true }, { l: 'Temp', v: '36.6', n: false, w: false }],
    },
    moderate: {
      label: 'Sub-massive — right heart strain', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '104/64', n: false, w: true }, { l: 'HR', v: '112', n: false, w: true }, { l: 'RR', v: '24', n: false, w: true }, { l: 'SpO₂', v: '91', n: false, w: true }, { l: 'Temp', v: '36.9', n: false, w: false }],
    },
    severe: {
      label: 'Massive — obstructive shock', cls: 'sev-severe',
      twist: 'The blood pressure is falling further and she has become drowsy. The right ventricle is dilated on bedside echo. The clot is obstructing more than half the pulmonary circulation.',
      vitals: [{ l: 'BP', v: '82/54', n: true, w: false }, { l: 'HR', v: '128', n: false, w: true }, { l: 'RR', v: '30', n: false, w: true }, { l: 'SpO₂', v: '86', n: false, w: true }, { l: 'Temp', v: '36.8', n: false, w: false }],
    },
    atypical: {
      label: 'Syncope-dominant', cls: 'sev-atypical',
      twist: 'The "faints" were exertional, with no warning and no convulsive movements — she collapses when the obstructed circulation cannot raise its output. This is not vasovagal syncope.',
      vitals: [{ l: 'BP', v: '96/60', n: false, w: true }, { l: 'HR', v: '104', n: false, w: true }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '93', n: false, w: true }, { l: 'Temp', v: '36.8', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      concept: 'Concept — a PE is suspected before any test is ordered: the history assembles the Virchow risk profile that sets pre-test probability, and pre-test probability decides which test can be trusted.',
      stem: 'She is breathless with pleuritic pain. Her sister is on the phone. What do you establish first?',
      opts: [
        { t: 'Anything that has left her immobile in the last four weeks, oestrogen use, previous clots, surgery and malignancy', type: 'correct', d: "Assembles the Virchow risk profile that sets pre-test probability.",
          fb_title: 'Correct — probability is built here, not at the scanner.',
          fb: 'Stasis, hypercoagulability and endothelial injury cover every risk factor that matters, and each is a history question. They are worth asking first because they are the inputs to the probability score — and the score decides whether a D-dimer may be used or whether you go straight to CT. Her flight and her contraceptive have already told you two chapters of the story; make sure there are no others.' },
        { t: 'The exact character of the pain and whether anything relieves it', type: 'near', d: "Characterises the pain as pleuritic or ischaemic.",
          fb_title: 'Worth having — and largely already in front of you.',
          fb: 'Pleuritic character is real evidence: ischaemic pain is central and pressure-like and ignores respiration. But she has already told you the pain is sharp and breath-linked, so re-interviewing adds little. The risk-factor question changes which test you order; this one mostly confirms what the opening sentence said.' },
        { t: 'Whether she has a cough, and if so what the sputum is like', type: 'wrong', d: "Screens for an infective, productive cough.",
          fb_title: 'The wrong pattern to chase.',
          fb: 'Pneumonia and bronchitis are the misdiagnoses PE most often wears, and the sputum question is how the anchor gets set. She is afebrile with a clear chest; small-volume haemoptysis matters because it signals infarction, but purulent sputum would argue against PE, not for it.' },
        { t: 'Her family history of heart disease', type: 'wrong', d: "Screens for inherited cardiovascular risk.",
          fb_title: 'Does not move this diagnosis.',
          fb: 'Ischaemic disease in a 44-year-old woman with pleuritic pain and clear lungs is not the leading diagnosis, and a family history would not change today\'s test sequence. The thrombophilia family history — relatives with clots at young ages — is the one that would, and it is a different question.' },
      ],
    },

    exam: {
      label: 'Physical Examination',
      concept: 'Concept — the examination in suspected PE is a probability instrument: it looks for the source clot in the legs, for right heart strain, and for the vital signs that grade how much circulation is left.',
      stem: 'What do you do at the bedside?',
      opts: [
        { t: 'Compare the calves, check the JVP and listen for a loud pulmonary second sound, then recheck the vitals', type: 'correct', d: "Looks for the source DVT and for right heart strain, and regrades stability.",
          fb_title: 'Correct — two diagnoses in one examination.',
          fb: 'Unilateral swelling and tenderness find the source clot and add heavily to the probability score. A raised JVP, a loud P2 and a right ventricular heave are the bedside evidence of acute pressure overload — the right ventricle shouting. And the vitals regrade the case: blood pressure is what separates anticoagulation from thrombolysis, so it is rechecked, not assumed.' },
        { t: 'Auscultate over the painful area for a pleural rub', type: 'near', d: "Listens for pleural inflammation at the site of pain.",
          fb_title: 'A real finding with a low yield.',
          fb: 'A rub accompanies pleural infarction in a minority of patients, and its absence excludes nothing — while its presence changes no decision. It tempts because the pain genuinely is pleural, but calf signs and right-heart signs move probability in a way the rub does not.' },
        { t: "Elicit Homan's sign — dorsiflex the foot and note calf pain", type: 'wrong', d: "A classical bedside manoeuvre said to indicate deep-vein thrombosis.",
          fb_title: 'A test that should have been retired.',
          fb: "Homan's sign is absent in around half of deep-vein thromboses and positive in many aching knees and calves — useless in both directions. Generations of clinicians also feared it might dislodge clot. Modern scoring uses what you can see: measured calf asymmetry with tenderness and pitting oedema, not a manoeuvre." },
        { t: 'Percuss and auscultate both bases for stony dullness', type: 'wrong', d: "Looks for pleural effusion at the lung bases.",
          fb_title: 'Present in a minority, decisive in none.',
          fb: 'Small transudative effusions do accompany pulmonary infarction, but finding or missing one changes nothing about the probability score or the next test. The expectation in PE is a clear chest — and that clarity, next to hypoxaemia, is itself evidence.' },
      ],
    },

    labs: {
      label: 'Ordering Labs',
      concept: 'Concept — D-dimer is a rule-out test whose value depends entirely on the probability you built in the history: in the right patient a negative result ends the workup, in the wrong patient it means nothing.',
      stem: 'Which test do you order first, and what are you allowed to conclude from its result?',
      opts: [
        { t: 'D-dimer — a negative result effectively excludes PE when clinical probability is not high', type: 'correct', d: "Measures fibrin degradation products from recent clot.",
          fb_title: 'Correct — and the caveat is the whole lesson.',
          fb: 'D-dimer is around 95% sensitive, so in a low- or intermediate-probability patient a negative result ends the workup and saves a CT. It is close to useless in the other direction: it rises after surgery, in pregnancy, infection, malignancy and normal ageing, so a positive confirms nothing. In a patient like this one — high probability — a negative would not be believed; the scan decides.' },
        { t: 'High-sensitivity troponin', type: 'near', d: "Detects myocardial injury.",
          fb_title: 'Prognostic gold, diagnostic dust.',
          fb: 'Troponin rises in up to half of patients with PE and right-heart strain — it reflects right ventricular ischaemia and grades severity, and a raised troponin with right ventricular dysfunction identifies a higher-risk group worth monitoring. What it never does is make the diagnosis, and the raised value in a breathless patient with chest pain is exactly the finding that pulls you towards the wrong artery. The ECG separates the two.' },
        { t: 'Arterial blood gas', type: 'wrong', d: "Measures gas exchange and acid–base status.",
          fb_title: 'Quantifies the damage, excludes nothing.',
          fb: 'It will show hypoxaemia with a widened A–a gradient and a respiratory alkalosis from tachypnoea — entirely consistent with PE, and equally present in a dozen other diagnoses. Small PEs can have a completely normal blood gas, so a normal result excludes nothing either. It costs an arterial puncture and changes no decision.' },
        { t: 'B-type natriuretic peptide', type: 'wrong', d: "Hormone released by ventricular stretch.",
          fb_title: 'The wrong organ\'s marker.',
          fb: 'BNP reflects ventricular wall stretch and earns its place in heart failure. It can rise with right ventricular strain in PE, but like troponin it grades rather than diagnoses — and it will not distinguish a pulmonary circulation problem from a bronchial one. The probability score and the CT are the decision-makers.' },
      ],
    },

    imaging: {
      label: 'Imaging',
      concept: 'Concept — CT pulmonary angiography is the diagnostic standard because it shows the clot itself; every other test either raises or lowers the odds that it is there.',
      stem: 'Probability is high enough that imaging is required. Which scan confirms the diagnosis?',
      opts: [
        { t: 'CT pulmonary angiography', type: 'correct', d: "Contrast-enhanced CT of the pulmonary arterial tree.",
          fb_title: 'Correct — the reference standard, for a practical reason.',
          fb: 'It shows the filling defect directly, grades the clot load, images the proximal leg veins on the way past, and gives alternative diagnoses — pneumonia, dissection, a tumour — in the same acquisition. It is fast, widely available around the clock, and her renal function allows the contrast. This is the scan the pathway funnels everyone towards.' },
        { t: 'Ventilation–perfusion (V/Q) scan', type: 'near', d: "Nuclear medicine comparison of ventilation and perfusion.",
          fb_title: 'The right test for a different patient.',
          fb: 'A normal V/Q scan excludes PE reliably, and the scan earns its place in renal impairment, contrast allergy and pregnancy, where CT contrast and dose are genuine concerns. Its weakness is the nondiagnostic middle ground — "intermediate probability" results that resolve nothing — and in an otherwise straightforward patient, CT is faster and definitive.' },
        { t: 'Chest X-ray as the diagnostic test', type: 'wrong', d: "Plain radiograph of the chest.",
          fb_title: 'Normal is the expected answer — and it excludes nothing.',
          fb: 'The film is usually normal or near-normal in PE, with atelectasis or a small effusion at most. Its job is exclusion — pneumothorax, pneumonia, oedema — and a normal film beside hypoxaemia actively raises the probability of PE. It is part of the argument, never the verdict.' },
        { t: 'Transthoracic echocardiogram to visualise the clot', type: 'wrong', d: "Ultrasound imaging of the heart.",
          fb_title: 'Sees the strain, almost never the clot.',
          fb: 'Clot is only occasionally visible in the central pulmonary arteries on transthoracic echo. The scan\'s real role is at the bedside of a patient too unstable to reach CT: right ventricular dilation supports massive PE and can justify empirical thrombolysis. In a stable patient it is an indirect test standing in for a direct one.' },
      ],
    },

    treat: {
      label: 'Treatment',
      concept: 'Concept — in a haemodynamically stable PE with a normal right ventricle, anticoagulation is the definitive treatment; thrombolysis is reperfusion for a failing circulation, or rescue for the monitored intermediate-high-risk patient who deteriorates — and using it early trades intracranial bleeding for no benefit.',
      stem: 'CTPA confirms a segmental PE. BP 116/70, HR 98, SpO₂ 94% on air, right ventricle normal on echocardiography. What is the treatment?',
      opts: [
        { t: 'Therapeutic anticoagulation — LMWH or a DOAC from today, planned for at least three months', type: 'correct', d: "Stops clot propagation and lets endogenous fibrinolysis clear it.",
          fb_title: 'Correct — the treatment is preventing growth, not extraction.',
          fb: 'Stable patient, normal right ventricle: anticoagulation alone, started today. Her normal right ventricle makes her low-risk — the intermediate-high-risk patient, normotensive but with RV dysfunction and a raised troponin, gets the same anticoagulation plus close monitoring, precisely so rescue reperfusion remains on the table if they deteriorate. The body\'s own fibrinolytic system dismantles the clot over days to weeks once it cannot enlarge. Three months is the minimum for this provoked event, and part of treating the source is stopping the contraceptive and advising against long-haul travel without prophylaxis while the risk settles.' },
        { t: 'Aspirin, with clinic review in three months', type: 'near', d: "An antiplatelet agent.",
          fb_title: 'The wrong drug family.',
          fb: 'Arterial thrombus is platelet-rich, which is why aspirin treats coronary and cerebral events. Venous thrombus is fibrin- and red-cell-rich, which is why anticoagulants treat it and antiplatelets do not. Prescribing aspirin here leaves the clot unprotected and able to propagate — it feels like treatment because "aspirin thins the blood", but it is the wrong thinning.' },
        { t: 'Systemic thrombolysis with alteplase now, while she is stable', type: 'wrong', d: "Intravenous infusion of a plasminogen activator to dissolve clot.",
          harm: 'Forty minutes into the infusion she develops a severe headache and her BP climbs to 178/104. CT shows an intracerebral haemorrhage and the infusion is abandoned.',
          fb_title: 'DANGEROUS — reperfusion therapy without a reperfusion problem.',
          fb: 'The clot is not obstructing enough of the circulation to kill her today, and anticoagulation lets her own fibrinolysis finish the job it started. Thrombolysis adds a one-to-two per cent risk of intracranial haemorrhage to that benign arithmetic — reasonable when the alternative is death from shock, indefensible when it is not. The tempting logic, "bigger hammer, faster cure", ignores that the hammer is aimed at a target already dissolving.' },
        { t: 'Insert an inferior vena cava filter', type: 'wrong', d: "A metallic sieve deployed in the IVC to intercept emboli.",
          fb_title: 'A device for patients who cannot be anticoagulated.',
          fb: 'Filters exist for the rare patient with a contraindication to anticoagulation, or recurrent embolism despite therapeutic anticoagulation. They do not treat the clot, do not stop the DVT extending, and add their own late complications — filter thrombosis and recurrent obstruction. She can be anticoagulated, so a filter can only add risk.' },
      ],
    },
  },

  // Both present with sudden chest pain, both can raise troponin, and both
  // can end in a thrombolytic — at opposite ends of haemodynamic stability.
  contrast: {
    a: 'Pulmonary embolism',
    b: 'Acute coronary syndrome',
    rows: [
      { f: 'Pain character',      a: 'Sharp, lateral or pleuritic, breath-linked',   b: 'Central, crushing, pressure-like' },
      { f: 'Response to breathing', a: 'Worse on deep inspiration; patient feels breathless at rest', b: 'Unaffected by respiration; patient often lies still' },
      { f: 'Autonomic company',   a: 'Less prominent — anxiety and restlessness',   b: 'Diaphoresis, nausea, a sense of doom' },
      { f: 'ECG',                 a: 'Sinus tachycardia commonest; S1Q3T3 and right-heart strain if large', b: 'ST elevation or depression with reciprocal changes' },
      { f: 'Troponin',            a: 'May rise from right ventricular strain — grades severity, does not diagnose', b: 'Rises from myocyte necrosis — the diagnostic pair with the ECG' },
      { f: 'Chest X-ray',         a: 'Usually normal — normality beside hypoxaemia is itself a clue', b: 'Often normal early; pulmonary oedema if the left ventricle fails' },
      { f: 'Shock, if it comes',  a: 'Obstructive — hypotension with raised JVP and clear lungs', b: 'Cardiogenic — hypotension with pulmonary oedema and third sound' },
      { f: 'First-line treatment', a: 'Anticoagulation for all; thrombolysis for instability, or rescue if deteriorating on treatment', b: 'Antiplatelets and urgent reperfusion — PCI, or thrombolysis if PCI is unavailable' },
    ],
  },
  takeaway: 'The overlap is the trap. Both cause sudden chest pain, both can raise troponin, and both can require a thrombolytic — but at opposite ends of stability: in ACS the ECG commits you to reperfusion while the blood pressure is often still fine, whereas in PE anticoagulation leads, reperfusion waits for haemodynamic compromise, and the normotensive patient with RV dysfunction and a raised troponin is monitored precisely so that rescue stays available. Reading the pain (breath-linked versus pressure) and the ECG (right-heart strain versus regional ST elevation) separates the two before any scanner does — which matters, because giving a fibrinolytic to the wrong patient is the kind of error that does not offer a second attempt.',

  ddx: [
    { name: 'Pulmonary Embolism', correct: true,
      reason: '✓ Confirmed. Sudden pleuritic pain with hypoxaemia on a clear chest X-ray, sinus tachycardia, and a risk profile of combined oestrogen and a long-haul flight — with the filling defect shown directly on CT pulmonary angiography. One clot, two addresses: the legs are where it began.' },
    { name: 'Acute Coronary Syndrome', correct: false,
      reason: '✗ Ruled out. The pain is breath-linked and lateral rather than central and crushing, with no diaphoresis or nausea, and the ECG shows sinus tachycardia with no ST change. Serial troponins stay flat. A coronary syndrome with this ECG, this pain character and flat troponins at this interval would be very unusual indeed.' },
    { name: 'Community-Acquired Pneumonia', correct: false,
      reason: '✗ Ruled out. Afebrile, normal white cell count, and a clear chest X-ray — pleuritic pain without focal crackles, consolidation or purulent sputum. Pneumonia is the mimic PE most often wears precisely because both cause pleuritic pain; the film is what pulls them apart.' },
    { name: 'Primary Spontaneous Pneumothorax', correct: false,
      reason: '✗ Ruled out by the examination and the film. Breath sounds are equal, the trachea is central, and there is no rim of air on the X-ray. It stays on this list because it genuinely causes sudden pleuritic pain and breathlessness — and it is one of the few alternatives the plain film reliably excludes.' },
    { name: 'Panic Attack', correct: false,
      reason: '✗ Ruled out by objective gas exchange. Anxiety is common in PE — breathlessness is frightening — and "anxiety" is often the label a missed PE leaves behind. Her saturations of 94% on air with a widened A–a gradient are measurable hypoxaemia, which hyperventilation does not produce. This diagnosis is earned only after the D-dimer, never before it.' },
  ],

  teaching: [
    'D-dimer is sensitive, not specific: a negative result can end a workup in a low-probability patient, and a positive one means nothing in a high-probability patient. The value of the test is set by the history before the blood is drawn.',
    'The commonest ECG finding in pulmonary embolism is sinus tachycardia. S1Q3T3 is the examination answer, not the bedside answer — its absence excludes nothing.',
    'Massive (high-risk) PE is defined by haemodynamic instability, not clot size — hypotension moves thrombolysis from never to now. A normal pressure keeps it off the table for now: the intermediate-high-risk patient, normotensive but with RV dysfunction and a raised troponin, is monitored closely exactly because rescue reperfusion becomes indicated if they deteriorate on anticoagulation.',
    'Hypoxaemia on a clear chest X-ray with a tachycardia is the PE signature — pneumonia, oedema and pneumothorax all leave their mark on the film, and PE usually does not.',
    'Venous thrombus is fibrin-rich and needs an anticoagulant; arterial thrombus is platelet-rich and needs an antiplatelet. Aspirin is not treatment for a DVT or a PE.',
    'Deep-vein thrombosis and pulmonary embolism are one disease at two addresses: examine the calves in every suspected PE, and protect the veins of every immobile patient.',
    'The combined oral contraceptive is a hypercoagulable exposure: a PE in a woman taking it is a provoked event, and the provocation stops the day it is identified.',
    'Haemoptysis in PE is small and late — a sign of established infarction. Large-volume haemoptysis points somewhere other than a pulmonary embolus.',
  ],
};
