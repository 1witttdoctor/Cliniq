// ────────────────────────────────────────────────
// TOPIC: Acute Ischaemic Stroke  (Neurology · Topic 04)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['ischaemic-stroke'] = {
  id: 'ischaemic-stroke',
  number: 4,
  system: 'Neurology',
  title: 'Acute Ischaemic Stroke',
  navMeta: 'Neurology · Acute Ischaemic Stroke',
  desc: "Sudden focal neurological deficit from an occluded cerebral artery. The only topic where the clock is part of the diagnosis: everything you do is measured against how long the brain has been without blood. Covers localisation, the imaging that decides treatment, and the narrow window in which you can reverse it.",
  tags: [
    { label: 'Neurology', cls: 'tag-cardio' },
    { label: 'Time-critical', cls: 'tag-pharma' },
    { label: 'Vascular', cls: 'tag-renal' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mrs. Leela Nair',
    meta: '71F · AF (not anticoagulated), HTN · Brought by her son',
    cc: '"She was fine at breakfast. At about nine she dropped her cup, and when she tried to speak nothing came out properly. Her right side has gone weak."',
    inspection: 'Alert but dysphasic. Right facial droop sparing the forehead. Right arm falls to the bed within seconds when lifted.'
  },

  // ── LEARN ──
  layers: [
    {
      kicker: 'Mechanism',
      title: 'Why minutes are the unit of damage',
      blocks: [
        { k: 'text', t: 'The brain has almost no reserve. It cannot store oxygen or glucose, so when an artery occludes the tissue it feeds begins to die within minutes. Everything about stroke management follows from that one fact.' },
        { k: 'point', hi: true, t: 'The core is already dead. The penumbra is what you are treating',
          d: 'At the centre of the territory, flow is near zero and neurons are lost. Around it sits the <em>penumbra</em> — tissue kept marginally alive by collateral flow. It is electrically silent but structurally intact, and it is salvageable. Every minute without reperfusion converts more penumbra into core.' },
        { k: 'chain', t: 'What an occlusion does, in order',
          steps: [
            'An artery occludes — usually embolus from the heart or a carotid plaque',
            'Flow falls below the threshold for electrical function: the deficit appears',
            'The penumbra survives on collaterals, for now',
            'ATP fails in the core; the sodium pump stops',
            'Cells swell, glutamate floods out, calcium enters',
            'Core expands outward into the penumbra, minute by minute',
          ] },
        { k: 'point', t: 'Embolic or thrombotic — the history usually tells you',
          d: 'A deficit that is <em>maximal at onset</em> suggests embolus, classically from atrial fibrillation or a carotid plaque. A stuttering, stepwise deficit suggests in-situ thrombosis of a small penetrating vessel. Lacunar strokes from small-vessel disease give pure motor or pure sensory syndromes with no cortical signs.' },
        { k: 'point', t: 'Cortical signs tell you the territory is large',
          d: 'Dysphasia, neglect, gaze deviation and visual field loss are <em>cortical</em>. Their presence means a large-vessel territory rather than a lacune — which matters, because large-vessel occlusion is what thrombectomy treats.' },
        { k: 'check',
          q: 'Why does reperfusion at three hours help when reperfusion at twenty-four usually does not?',
          opts: [
            { t: 'The clot becomes harder to dissolve over time' },
            { t: 'The salvageable penumbra has largely become infarcted core', ok: true },
            { t: 'Cerebral autoregulation recovers by then' },
          ],
          why: 'The target of treatment is the penumbra, not the clot. You dissolve or retrieve the clot in order to save the tissue that is still alive around the core — and that tissue is disappearing the whole time. By the time the penumbra is gone there is nothing left to rescue, and reperfusing dead tissue only risks haemorrhage into it. Clot composition does change with age, but that is not why the window closes.' },
      ],
    },

    {
      kicker: 'Localising',
      title: 'Reading the deficit — and the things that imitate it',
      blocks: [
        { k: 'text', t: 'The pattern of the deficit tells you which artery. That matters less for treatment than it once did, but it tells you how big the territory is, and it is what separates a stroke from its mimics.' },
        { k: 'compare',
          a: { h: 'Middle cerebral artery', items: [
            'Face and arm weaker than leg',
            'Dysphasia if the dominant hemisphere',
            'Neglect if the non-dominant hemisphere',
            'Gaze deviates toward the lesion',
            'Contralateral homonymous hemianopia',
          ] },
          b: { h: 'Anterior cerebral artery', items: [
            'Leg weaker than face and arm',
            'Abulia, apathy, personality change',
            'Urinary incontinence',
            'Grasp reflex may return',
            'Language usually spared',
          ] } },
        { k: 'point', t: 'Posterior circulation is the one that gets missed',
          d: 'Vertigo, ataxia, diplopia, dysarthria, crossed signs — ipsilateral face with contralateral body. It gets sent home as labyrinthitis. Any of the five Ds (dizziness, diplopia, dysarthria, dysphagia, dystaxia) in a vascular patient deserves a stroke workup, not a vestibular sedative.' },
        { k: 'point', hi: true, t: 'Check the glucose before you do anything else',
          d: 'Hypoglycaemia reproduces a focal deficit exactly, including hemiplegia and dysphasia, and it is fully reversible. It is the one mimic that is both common and instantly correctable. A capillary glucose is a mandatory part of the stroke call, not an afterthought.' },
        { k: 'point', t: 'The other mimics worth holding in mind',
          d: 'Todd\'s paresis after an unwitnessed seizure; hemiplegic migraine in a younger patient with a headache history; a re-emergent deficit from an old stroke unmasked by sepsis or fever. None of them has a sudden onset in a vascular patient with an irregular pulse.' },
        { k: 'check',
          q: 'A 71-year-old with atrial fibrillation has sudden right arm and face weakness with dysphasia. Which single test comes first?',
          opts: [
            { t: 'Capillary blood glucose', ok: true },
            { t: 'Non-contrast CT head' },
            { t: 'ECG to confirm the atrial fibrillation' },
          ],
          why: 'The CT is the test that decides treatment and it follows immediately — but glucose comes first because it takes seconds, requires no transfer, and rules out the one mimic that is fully reversible at the bedside. Sending a hypoglycaemic patient to CT wastes the only window in which correcting it is trivial. The ECG can wait; the atrial fibrillation explains the mechanism but changes nothing about the next twenty minutes.' },
      ],
    },

    {
      kicker: 'Management',
      title: 'What you can reverse, and the window you have to do it',
      blocks: [
        { k: 'text', t: 'There are exactly two treatments that reverse an ischaemic stroke, and both are governed by the clock. Everything else is supportive.' },
        { k: 'point', hi: true, t: 'The CT is ordered to exclude blood, not to find the infarct',
          d: 'An ischaemic stroke is usually <em>invisible</em> on a non-contrast CT in the first hours. That is expected and it does not exclude the diagnosis. The scan is there to answer one question: is this a haemorrhage? Because if it is, thrombolysis would kill the patient.' },
        { k: 'chain', t: 'The order of operations',
          steps: [
            'Glucose — exclude the reversible mimic',
            'Non-contrast CT head — exclude haemorrhage',
            'Establish the time of onset, or last known well',
            'Thrombolysis if within 4.5 hours and no contraindication',
            'CT angiography for large-vessel occlusion — thrombectomy if present',
            'Aspirin at 24 hours if thrombolysed, or immediately if not',
          ] },
        { k: 'point', t: 'Last known well, not "when it was noticed"',
          d: 'The clock starts when the patient was last seen at their baseline. Someone who wakes with a deficit was last well when they went to bed, which usually puts them outside the thrombolysis window — though perfusion imaging can still select some of them for thrombectomy.' },
        { k: 'point', t: 'Permissive hypertension: do not chase the blood pressure down',
          d: 'A raised pressure is maintaining flow through collaterals into the penumbra. Lower it and the penumbra infarcts. Treat only above <em>220/120</em> — or above <em>185/110</em> if you intend to thrombolyse, because that is the threshold at which the bleeding risk becomes unacceptable.' },
        { k: 'point', t: 'Thrombectomy extends the window for large vessels',
          d: 'For a proximal large-vessel occlusion, mechanical retrieval is standard within 6 hours, and selected patients benefit out to 24 hours when perfusion imaging shows a small core and a large penumbra. This is why the CT angiogram matters even after the thrombolysis window has closed.' },
        { k: 'check',
          q: 'BP is 196/104 in a patient you are about to thrombolyse at 2 hours. What do you do?',
          opts: [
            { t: 'Thrombolyse now — permissive hypertension protects the penumbra' },
            { t: 'Lower the pressure below 185/110, then thrombolyse', ok: true },
            { t: 'Withhold thrombolysis; the pressure is an absolute contraindication' },
          ],
          why: 'Both halves of the rule are true and they apply in different situations. Left alone, a high pressure is protective — that is permissive hypertension. But thrombolysis changes the arithmetic: above 185/110 the risk of symptomatic intracranial haemorrhage rises sharply, so you bring it under that threshold and then treat. It is a barrier to be lowered, not a contraindication: withholding thrombolysis here forfeits a salvageable brain for a problem you can fix in minutes.' },
      ],
    },
  ],

  // ── CASE DATA ──
  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: {
    mild: {
      label: 'Minor deficit', cls: 'sev-mild', twist: null,
      vitals: [{ l: 'BP', v: '158/88', n: false, w: true }, { l: 'HR', v: '86', n: false, w: false }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '97', n: false, w: false }, { l: 'Temp', v: '36.6', n: false, w: false }],
    },
    moderate: {
      label: 'Established deficit', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '176/96', n: false, w: true }, { l: 'HR', v: '98', n: false, w: false }, { l: 'RR', v: '18', n: false, w: false }, { l: 'SpO₂', v: '95', n: false, w: false }, { l: 'Temp', v: '36.8', n: false, w: false }],
    },
    severe: {
      label: 'Large vessel occlusion', cls: 'sev-severe',
      twist: 'Conscious level is dropping and the gaze has deviated further to the left. The territory is extending.',
      vitals: [{ l: 'BP', v: '204/112', n: true, w: false }, { l: 'HR', v: '112', n: false, w: true }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '92', n: false, w: true }, { l: 'Temp', v: '37.1', n: false, w: false }],
    },
    atypical: {
      label: 'Posterior circulation', cls: 'sev-atypical',
      twist: 'The vertigo and vomiting are worsening and she cannot sit unsupported. This is not a peripheral vestibular problem.',
      vitals: [{ l: 'BP', v: '168/92', n: false, w: true }, { l: 'HR', v: '76', n: false, w: false }, { l: 'RR', v: '17', n: false, w: false }, { l: 'SpO₂', v: '96', n: false, w: false }, { l: 'Temp', v: '36.7', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      concept: 'Concept — in stroke the history is not background, it is the treatment decision. One question determines whether anything reversible can be offered at all.',
      stem: 'Her son is at the bedside and can answer questions. What do you establish first?',
      opts: [
        { t: 'Exactly when she was last seen at her normal self', type: 'correct', d: "Fixes the time of onset, or last known well.",
          fb_title: 'Correct — this is the question that decides treatment.',
          fb: 'Everything reversible is governed by the clock, and the clock starts at last known well, not when the deficit was noticed. Without this number you cannot offer thrombolysis at all. Asking it first also lets you send for imaging while the rest of the history is taken.' },
        { t: 'Whether she is on any anticoagulant or antiplatelet', type: 'near', d: "Screens for a bleeding-risk contraindication.",
          fb_title: 'Essential — but it comes second.',
          fb: 'You must have this before thrombolysis, and with known atrial fibrillation it is very likely to be relevant. But it only matters if she is in the window at all, and the timing question is what establishes that. Ask it in the same breath, after the clock.' },
        { t: 'Whether there is a history of migraine or seizures', type: 'wrong', d: "Screens for a stroke mimic.",
          fb_title: 'A mimic worth excluding, not the opening question.',
          fb: 'Hemiplegic migraine and Todd\'s paresis are real mimics and worth a moment later. But a sudden maximal deficit in a 71-year-old with untreated atrial fibrillation has an obvious mechanism, and pursuing mimics first spends time the penumbra does not have.' },
        { t: 'Her functional baseline and whether she lives independently', type: 'wrong', d: "Establishes premorbid function for prognosis.",
          fb_title: 'Relevant to the decision, but not yet.',
          fb: 'Premorbid function shapes the conversation about whether aggressive treatment is appropriate, and it belongs in the assessment. It does not belong before the question that determines whether treatment is possible at all.' },
      ],
    },

    exam: {
      label: 'Physical Examination',
      concept: 'Concept — the examination answers two questions: how big is the territory, and is this actually a stroke? Cortical signs answer the first; a bedside glucose answers the second.',
      stem: 'What do you do at the bedside before she goes to the scanner?',
      opts: [
        { t: 'Capillary glucose, then a focused NIHSS with attention to cortical signs', type: 'correct', d: "Excludes the reversible mimic, then quantifies the deficit.",
          fb_title: 'Correct — glucose first, then quantify.',
          fb: 'Hypoglycaemia reproduces a focal deficit exactly and is fully reversible in minutes, so it is checked before anything else. The NIHSS then gives you a number to compare against after treatment, and the cortical signs — dysphasia, neglect, gaze deviation — tell you the territory is large enough that thrombectomy may apply.' },
        { t: 'A full cranial nerve and peripheral neurological examination', type: 'near', d: "Complete neurological assessment.",
          fb_title: 'Too slow for the window.',
          fb: 'A complete neurological examination is the right instinct and the wrong tempo. The NIHSS exists precisely because it captures what changes management in a few minutes. Do the focused version now and the detailed examination once she is treated.' },
        { t: 'Fundoscopy for papilloedema', type: 'wrong', d: "Looks for raised intracranial pressure.",
          fb_title: 'Not the priority, and it will not be present.',
          fb: 'Papilloedema takes hours to days to develop and is not a feature of acute ischaemia. Looking for it delays the scan without changing anything.' },
        { t: 'Head impulse, nystagmus and test of skew, to exclude a vestibular cause', type: 'wrong', d: "Bedside battery separating central from peripheral vertigo.",
          fb_title: 'The right test for a different presentation.',
          fb: 'This battery is genuinely valuable — in a patient whose <em>only</em> symptom is vertigo. Here there is dysphasia and a hemiparesis, which localise to the cerebral hemisphere and settle the question already.' },
      ],
    },

    labs: {
      label: 'Ordering Labs',
      concept: 'Concept — no blood test diagnoses a stroke. Bloods are taken to find the mimics and to clear the path for thrombolysis, and only one of them may hold up treatment.',
      stem: 'Which bloods do you send, and which one is allowed to delay treatment?',
      opts: [
        { t: 'Glucose, full blood count, coagulation screen and electrolytes — and only the coagulation result may hold up thrombolysis', type: 'correct', d: "The panel that clears the path, with one gate.",
          fb_title: 'Correct — and the caveat is the point.',
          fb: 'Glucose excludes the mimic, platelets and clotting establish bleeding risk, and electrolytes catch the metabolic imitators. Guidelines are explicit that you should not wait for results before thrombolysing <em>unless</em> there is a reason to suspect a coagulopathy — anticoagulant use, liver disease, a known disorder. Waiting for routine bloods in a patient with none of those spends brain for no information.' },
        { t: 'A full panel, and wait for every result before giving thrombolysis', type: 'near', d: "Complete results before any decision.",
          fb_title: 'Safe-sounding, and it costs tissue.',
          fb: 'The instinct is understandable, but the arithmetic is against it. A routine panel takes thirty to sixty minutes, and that time converts penumbra into core in every patient. Send the bloods, and wait only when something in the history raises a real suspicion of coagulopathy.' },
        { t: 'Troponin and a lipid profile', type: 'wrong', d: "Cardiac injury marker and vascular risk assessment.",
          fb_title: 'Both belong to the next phase of care.',
          fb: 'Troponin is often mildly raised after a stroke and rarely changes the acute plan. Lipids matter for secondary prevention over the following days. Neither has any bearing on the decision you are making in the next thirty minutes.' },
        { t: 'Blood cultures and inflammatory markers', type: 'wrong', d: "Screens for infection.",
          fb_title: 'No infective features here.',
          fb: 'Sepsis can unmask an old deficit and infective endocarditis can throw emboli, so there are presentations where this is right. This is not one of them: she is afebrile with a sudden deficit and an obvious embolic source in untreated atrial fibrillation.' },
      ],
    },

    imaging: {
      label: 'Imaging',
      concept: 'Concept — the first scan is not looking for the stroke. It is looking for the one finding that would make the treatment lethal.',
      stem: 'She is 90 minutes from onset. What imaging do you order, and what are you looking for?',
      opts: [
        { t: 'Non-contrast CT head immediately, to exclude haemorrhage — then CT angiography to look for a large-vessel occlusion', type: 'correct', d: "Rules out blood, then looks for a retrievable clot.",
          fb_title: 'Correct — and for the correct reason.',
          fb: 'The non-contrast CT answers one question: is there blood? Thrombolysis into a haemorrhage is fatal, and nothing else distinguishes the two — the bedside picture is identical. Expect the scan to look normal, because early ischaemia usually is invisible. The angiogram then identifies a proximal occlusion, which is what thrombectomy treats and what extends her window beyond 4.5 hours.' },
        { t: 'MRI with diffusion-weighted imaging, which is far more sensitive for early infarction', type: 'near', d: "The most sensitive test for acute ischaemia.",
          fb_title: 'More sensitive, and the wrong trade.',
          fb: 'Diffusion-weighted MRI genuinely does show infarction within minutes, where CT shows nothing. But it takes longer, is not always available out of hours, and is unsafe with certain implants — and it is not needed, because you are not trying to see the infarct. You are trying to exclude blood, and CT does that in ninety seconds.' },
        { t: 'CT head with contrast, for better tissue definition', type: 'wrong', d: "Contrast-enhanced cross-sectional imaging.",
          fb_title: 'Contrast obscures the finding you need.',
          fb: 'Contrast can make acute blood harder to identify, which defeats the entire purpose of the scan. The first study in suspected stroke is always non-contrast.' },
        { t: 'Carotid Doppler ultrasound to identify the embolic source', type: 'wrong', d: "Assesses carotid stenosis as a source.",
          fb_title: 'Right investigation, wrong week.',
          fb: 'Carotid imaging matters for secondary prevention and decides whether she needs endarterectomy. It says nothing about whether you can treat her now, and it does not exclude haemorrhage.' },
      ],
    },

    treat: {
      label: 'Treatment',
      concept: 'Concept — a raised blood pressure after a stroke is usually protecting the brain. The exception is the patient you are about to thrombolyse, where the same pressure becomes the thing most likely to kill them.',
      stem: 'CT shows no haemorrhage. She is 2 hours from onset, NIHSS 12, not anticoagulated. BP is 196/104. What now?',
      opts: [
        { t: 'Lower the blood pressure below 185/110, then thrombolyse, and refer for thrombectomy assessment', type: 'correct', d: "Bring the pressure under the threshold, then reperfuse.",
          fb_title: 'Correct — the pressure is a barrier, not a veto.',
          fb: 'She is well inside the 4.5-hour window with no contraindication, so thrombolysis is indicated. Above 185/110 the risk of symptomatic intracranial haemorrhage after thrombolysis rises sharply, so the pressure is brought under that threshold with a short-acting agent and treatment proceeds. Her cortical signs suggest a large-vessel occlusion, so she is referred for thrombectomy in parallel rather than afterwards.' },
        { t: 'Thrombolyse immediately without touching the blood pressure, since permissive hypertension protects the penumbra', type: 'wrong', d: "Reperfuse now, leave the pressure alone.",
          harm: 'Forty minutes after the infusion her conscious level drops and the pupils become unequal. Repeat imaging shows haemorrhagic transformation into the infarct.',
          fb_title: 'DANGEROUS — the rule you are applying is the untreated one.',
          fb: 'Permissive hypertension is correct in a patient you are <em>not</em> thrombolysing, where the raised pressure drives collateral flow and the treatment threshold is 220/120. The moment you give a thrombolytic, the threshold becomes 185/110, because the bleeding risk dominates. Applying the wrong threshold here is how a salvageable stroke becomes a fatal haemorrhage.' },
        { t: 'Give aspirin 300 mg now and admit for observation', type: 'near', d: "Antiplatelet therapy and supportive care.",
          fb_title: 'The right treatment for a patient outside the window.',
          fb: 'Aspirin is correct management — for someone who cannot be thrombolysed. Giving it now instead forfeits a reversible treatment in a patient who qualifies for it, and it also complicates thrombolysis if you change your mind. Aspirin follows at 24 hours once post-thrombolysis imaging is clear.' },
        { t: 'Withhold thrombolysis because the blood pressure is an absolute contraindication', type: 'wrong', d: "Treat the pressure as disqualifying.",
          fb_title: 'It is a correctable one, not an absolute one.',
          fb: 'Absolute contraindications are things you cannot undo in the window: haemorrhage on imaging, recent intracranial surgery, active internal bleeding. A blood pressure of 196/104 is a number you can bring down in minutes with a short-acting agent. Treating it as disqualifying costs her the only treatment that reverses the deficit.' },
      ],
    },
  },

  // The two diagnoses that are clinically indistinguishable and whose
  // treatments are opposites — which is the whole reason for the scan.
  contrast: {
    a: 'Ischaemic stroke',
    b: 'Intracerebral haemorrhage',
    rows: [
      { f: 'Onset',            a: 'Sudden, often maximal at onset',            b: 'Sudden, may worsen over minutes to hours' },
      { f: 'Headache',         a: 'Usually absent',                            b: 'Common, and often severe' },
      { f: 'Vomiting',         a: 'Uncommon unless posterior circulation',     b: 'Common early' },
      { f: 'Conscious level',  a: 'Usually preserved unless the territory is large', b: 'Often depressed early' },
      { f: 'Blood pressure',   a: 'Raised, and protective',                    b: 'Often very high, and driving the bleed' },
      { f: 'Non-contrast CT',  a: 'Usually normal in the first hours',         b: 'Hyperdense blood, visible immediately' },
      { f: 'Bedside distinction', a: 'None reliable',                          b: 'None reliable' },
      { f: 'Treatment',        a: 'Thrombolysis and thrombectomy',             b: 'Reverse anticoagulation, control BP, neurosurgical opinion' },
    ],
  },
  takeaway: 'The two look the same at the bedside and their treatments are opposites — one is given a thrombolytic, the other would be killed by it. That single fact is why the non-contrast CT comes before treatment in every stroke pathway in the world, and why a normal-looking scan is a green light rather than a reason to doubt the diagnosis.',

  ddx: [
    { name: 'Acute Ischaemic Stroke', correct: true,
      reason: '✓ Confirmed. Sudden maximal deficit in a 71-year-old with untreated atrial fibrillation, cortical signs (dysphasia, right facial droop sparing the forehead, arm weaker than leg) localising to the left middle cerebral artery territory, and no blood on CT. Forehead sparing marks it as upper motor neurone.' },
    { name: 'Intracerebral Haemorrhage', correct: false,
      reason: '✗ Ruled out — but only by the scan. Nothing at the bedside distinguishes it: headache and early vomiting make it more likely, and their absence makes it less likely, but neither is reliable. The non-contrast CT showing no hyperdense blood is what excludes it, and that is precisely why the scan precedes treatment.' },
    { name: 'Hypoglycaemia', correct: false,
      reason: '✗ Ruled out by the capillary glucose. It deserves its place on this list because it reproduces a focal deficit exactly, including hemiplegia and dysphasia, and reverses completely with treatment. It is the one mimic you must exclude at the bedside before anything else happens.' },
    { name: "Todd's Paresis", correct: false,
      reason: '✗ Ruled out. Post-ictal weakness follows a seizure and resolves over minutes to hours. There was no witnessed seizure, no tongue biting or incontinence, and the deficit has been static since onset rather than improving. Worth considering when the onset is unwitnessed.' },
    { name: 'Hemiplegic Migraine', correct: false,
      reason: '✗ Ruled out. It typically occurs in younger patients with an established migraine history, and the deficit builds gradually over twenty to thirty minutes with headache and visual aura rather than arriving complete. A sudden maximal deficit at 71 with atrial fibrillation is vascular until proven otherwise.' },
  ],

  teaching: [
    'The clock starts at last known well, not when the deficit was noticed. A patient who wakes with a deficit was last well at bedtime, which usually places them outside the 4.5-hour thrombolysis window — though perfusion imaging may still select them for thrombectomy.',
    'The non-contrast CT is ordered to exclude haemorrhage, not to find the infarct. Early ischaemia is usually invisible on CT, and a normal-looking scan is the expected finding and a green light to treat.',
    'Check the glucose before anything else. Hypoglycaemia reproduces a focal deficit exactly and is fully reversible at the bedside.',
    'Permissive hypertension: do not lower the blood pressure in an untreated ischaemic stroke below a threshold of 220/120, because the pressure is driving collateral flow into the penumbra. If you intend to thrombolyse, the threshold becomes 185/110.',
    'Cortical signs — dysphasia, neglect, gaze deviation, visual field loss — mean a large-vessel territory rather than a lacune, and large-vessel occlusion is what thrombectomy treats.',
    'Forehead sparing distinguishes an upper motor neurone facial weakness (stroke) from a lower motor neurone one (Bell\'s palsy), because the upper face has bilateral cortical innervation.',
    'Posterior circulation stroke is the one that gets sent home. Vertigo with any of dysarthria, diplopia, dysphagia or ataxia in a vascular patient is a stroke workup, not a vestibular sedative.',
    'Thrombectomy is standard within 6 hours for a proximal large-vessel occlusion, and selected patients benefit out to 24 hours when perfusion imaging shows a small core and a large penumbra.',
  ],
};
