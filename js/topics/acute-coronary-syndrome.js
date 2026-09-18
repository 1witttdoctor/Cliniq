// ────────────────────────────────────────────────
// TOPIC: Acute Coronary Syndrome  (Cardiology · Topic 06)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['acute-coronary-syndrome'] = {
  id: 'acute-coronary-syndrome',
  number: 6,
  system: 'Cardiology',
  title: 'Acute Coronary Syndrome',
  navMeta: 'Cardiology · Acute Coronary Syndrome',
  desc: 'An atherosclerotic plaque ruptures, platelets flood in, and a coronary artery begins to occlude. Covers the unstable-angina-to-STEMI spectrum, reading the infarct from the ECG, and the arithmetic of reperfusion — plus the dissection screen that must precede every anticoagulation decision.',
  tags: [
    { label: 'Cardiology', cls: 'tag-cardio' },
    { label: 'Time-critical', cls: 'tag-pharma' },
    { label: 'Vascular', cls: 'tag-renal' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mr. Frank Kowalski',
    meta: '64M · Smoker, type 2 diabetes, hypertension · Brought by ambulance',
    cc: '"It came on while I was reading — a heavy weight sitting on my chest, going into my left arm and my jaw. I thought it was wind, but it isn\'t stopping, and I am soaked through."',
    inspection: 'Grey and clammy. Speaking in short phrases between waves of pain. Cardiac monitor showing sinus rhythm at 104.',
  },

  // ── LEARN ──
  layers: [
    {
      kicker: 'Mechanism',
      title: 'The plaque decides, the platelets deliver',
      blocks: [
        { k: 'text', t: 'Acute coronary syndrome is one event wearing three names. An atherosclerotic plaque ruptures or erodes, its contents meet the blood, and a thrombus grows on top of it. How completely the artery occludes — and for how long — decides whether you are dealing with unstable angina, a NSTEMI or a STEMI.' },
        { k: 'chain', t: 'From stable plaque to dead myocardium',
          steps: [
            'A lipid-rich plaque with a thin fibrous cap grows silently for decades',
            'The cap ruptures; collagen and tissue factor meet flowing blood',
            'Platelets adhere, activate and recruit more — via thromboxane A₂ and ADP',
            'Aspirin blocks thromboxane (COX-1); clopidogrel and ticagrelor block the ADP receptor (P2Y12)',
            'Fibrin weaves through the platelet mass; the thrombus occludes the artery',
            'Complete occlusion: transmural ischaemia, ST elevation, infarction from the subendocardium outward',
          ] },
        { k: 'point', hi: true, t: 'Time is muscle: the wavefront of necrosis',
          d: 'Myocardium dies from the inside out. The subendocardium — highest wall tension, furthest from the coronary lumen — goes first, and the wavefront advances through the wall over the following hours. Reperfusion given early salvages the outer border zone; reperfusion given late rescues nothing. This is why "door-to-balloon" is measured in minutes and why every delay in the pathway is a clinical decision, not an administrative one.' },
        { k: 'point', t: 'Three names, one event',
          d: 'Unstable angina: ischaemia with a <em>negative troponin</em> — myocardium stressed, not yet dead. NSTEMI: troponin rises, but no ST elevation — a partially or intermittently occluded artery. STEMI: persistent ST elevation, meaning near-total occlusion of a large vessel, and the one true emergency of the three. The STEMI pathway moves immediately to reperfusion; the others move to risk stratification and early angiography.' },
        { k: 'check',
          q: 'Why is the aspirin given chewed rather than swallowed whole?',
          opts: [
            { t: 'A chewed tablet is absorbed in minutes, and platelets must be blocked before the cath lab', ok: true },
            { t: 'Chewing converts aspirin into its active metabolite' },
            { t: 'The full tablet would pass undigested during a sympathetic gastrointestinal shutdown' },
          ],
          why: 'Aspirin\'s antiplatelet effect depends on saturating platelets before they meet the ruptured plaque again, and absorption through the buccal mucosa reaches that effect in minutes rather than the better part of an hour. The drug is not activated by chewing — the liver does the activating — and gastrointestinal absorption is slowed, not abolished, by sympathetic tone. Small detail, deliberate design: everything in the first ten minutes is measured against the wavefront.' },
      ],
    },

    {
      kicker: 'Clinical',
      title: 'Reading the pain — and the imitator that kills',
      blocks: [
        { k: 'text', t: 'The history makes the diagnosis and the ECG confirms it. But chest pain is a crowded waiting room, and one imitator — aortic dissection — is not merely similar: every treatment an infarct needs will kill a dissection patient. The history screens for both at once.' },
        { k: 'point', t: 'The pain is autonomic, not just cardiac',
          d: 'Ischaemic pain is retrosternal, pressure-like or heavy, and radiates to the left arm, both arms or the jaw. What makes it convincing is the company it keeps: diaphoresis, nausea, breathlessness and a sense of doom are sympathetic discharges, and muscular pain does not produce them. Pain lasting more than twenty minutes at rest is an infarction until the troponin says otherwise.' },
        { k: 'point', hi: true, t: 'Silent is not rare',
          d: 'In elderly patients, in women, and above all in diabetics — autonomic neuropathy blunts the afferent signal — infarction arrives as breathlessness, epigastric discomfort, profound fatigue or syncope, with no chest pain at all. The ECG is the only thing that catches these. Any diabetic presenting acutely unwell gets an ECG as a reflex, the way any collapsed patient gets a glucose.' },
        { k: 'compare',
          a: { h: 'Points to dissection', items: [
            'Pain tearing in quality, maximal within seconds',
            'Migrates — front to interscapular back, then abdomen as the tear extends',
            'Systolic BP difference over 20 mmHg between arms',
            'A pulse deficit in any limb',
            'New early diastolic murmur — aortic regurgitation',
            'Focal neurological deficit from carotid involvement',
          ] },
          b: { h: 'Points to infarction', items: [
            'Pressure-like pain building over minutes',
            'Radiates to arm and jaw, stays put',
            'Equal pulses and arm blood pressures',
            'Diaphoresis and nausea',
            'Regional ST elevation with reciprocal changes',
            'Troponin rising on the serial samples',
          ] } },
        { k: 'check',
          q: 'The same 64-year-old, the same crushing pain — but his right arm systolic pressure is 30 mmHg lower than his left. What changes?',
          opts: [
            { t: 'Everything — dissection must be excluded before any anticoagulation or a catheter crosses the aorta', ok: true },
            { t: 'Nothing measurable — cuff error is common; proceed as STEMI' },
            { t: 'Only the risk score — it adds weight to an atherosclerotic cause' },
          ],
          why: 'An inter-arm systolic difference above 20 mmHg is a dissection red flag, and it rewrites the plan: the CT aorta comes before the coronary angiogram, the antiplatelet loading dose waits, and the fibrinolytic — if one was ever under consideration — is now the most dangerous drug in the department. Cuff error is real but symmetric; it does not produce a consistent 30 mmHg. Atherosclerosis is the background noise of every 64-year-old smoker — it does not create pulse differentials.' },
      ],
    },

    {
      kicker: 'Management',
      title: 'The first ten minutes decide the next ten years',
      blocks: [
        { k: 'text', t: 'Almost everything that matters in ACS happens in the first ten minutes, and almost all of it is decisions to act rather than tests to await. The ECG makes the diagnosis, aspirin buys its platelet blockade, and reperfusion — promptly — is the only treatment that changes the size of the infarct.' },
        { k: 'chain', t: 'The order of operations',
          steps: [
            'ECG within ten minutes of arrival — the diagnosis is electrical',
            'Aspirin 300 mg chewed, a P2Y12 inhibitor loaded, anticoagulation given',
            'IV access, continuous monitoring, defibrillator pads on if unstable',
            'Serial high-sensitivity troponin — confirming, not deciding',
            'Portable chest X-ray — without delaying reperfusion',
            'STEMI: activate the cath lab. Target door-to-balloon under 90 minutes',
          ] },
        { k: 'point', hi: true, t: 'Oxygen is a drug',
          d: 'Routine oxygen in a normoxic infarct shows no benefit, and trials of hyperoxia suggest it may enlarge the infarct — free radicals and coronary vasoconstriction. Give oxygen for saturations below 90 per cent, not for the habit of it. The same discipline applies to morphine: it is legitimate analgesia, but it slows absorption of the P2Y12 inhibitor and carries worse outcomes in observational data, so it is given when pain is severe — not routinely.' },
        { k: 'point', t: 'Nitrates, and the tripwires around them',
          d: 'Sublingual nitrate is reasonable for pain, and relief of it was once held to diagnose angina — it does not; oesophageal spasm can relent too. The absolute tripwires are hypotension, right ventricular infarction and phosphodiesterase-5 inhibitor use within a day or two. The right ventricle in inferior infarction is preload-dependent: venodilate it and the output falls off a cliff.' },
        { k: 'point', t: 'Reperfusion arithmetic',
          d: 'STEMI within reach of a cath lab: primary PCI, door-to-balloon inside 90 minutes at a PCI centre (120 if transferring). If PCI cannot happen within that window, a fibrinolytic within ten minutes of diagnosis — then transfer for angiography anyway, two to twenty-four hours later. The ECG localises the artery: V1–V4 the LAD, II, III and aVF the right coronary, I and aVL the circumflex — and reciprocal depression on the opposite wall is what makes elevation convincing.' },
        { k: 'check',
          q: 'An anterior STEMI. SpO₂ is 96% on air. Does the patient get oxygen?',
          opts: [
            { t: 'No — normal saturations gain nothing, and hyperoxia may enlarge the infarct', ok: true },
            { t: 'Yes — the myocardium is starving; maximise oxygen delivery' },
            { t: 'Only if the patient reports feeling breathless' },
          ],
          why: 'The intuition that a dying muscle wants more oxygen is exactly right — and exactly wrong at the tissue level: the artery is occluded, and no fraction of inspired oxygen crosses a clot. Trials in normoxic infarcts show no benefit from routine oxygen, and hyperoxia adds vasoconstriction and oxidative injury. Symptoms are an even worse guide — ischaemic breathlessness is unreliable and the saturation is not. Below 90%, give oxygen; at 96%, give nothing.' },
      ],
    },
  ],

  // ── CASE DATA ──
  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: {
    mild: {
      label: 'Pain settling', cls: 'sev-mild', twist: null,
      vitals: [{ l: 'BP', v: '148/88', n: false, w: true }, { l: 'HR', v: '84', n: false, w: false }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '97', n: false, w: false }, { l: 'Temp', v: '36.5', n: false, w: false }],
    },
    moderate: {
      label: 'NSTEMI — established', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '156/94', n: false, w: true }, { l: 'HR', v: '96', n: false, w: false }, { l: 'RR', v: '18', n: false, w: false }, { l: 'SpO₂', v: '96', n: false, w: false }, { l: 'Temp', v: '36.8', n: false, w: false }],
    },
    severe: {
      label: 'Anterior STEMI', cls: 'sev-severe',
      twist: 'The monitor has captured a run of ventricular tachycardia, self-terminating after eight beats. The infarcting muscle is electrically unstable, and the rhythm will not always be so courteous.',
      vitals: [{ l: 'BP', v: '102/66', n: false, w: true }, { l: 'HR', v: '112', n: false, w: true }, { l: 'RR', v: '24', n: false, w: true }, { l: 'SpO₂', v: '93', n: false, w: true }, { l: 'Temp', v: '36.6', n: false, w: false }],
    },
    atypical: {
      label: 'Silent infarction', cls: 'sev-atypical',
      twist: 'There has been no chest pain at any point — only epigastric discomfort and sweating, the signature of the diabetic autonomic neuropathy that blunts cardiac pain afferents. The ECG is the only thing catching this.',
      vitals: [{ l: 'BP', v: '168/96', n: false, w: true }, { l: 'HR', v: '100', n: false, w: true }, { l: 'RR', v: '20', n: false, w: false }, { l: 'SpO₂', v: '94', n: false, w: true }, { l: 'Temp', v: '36.7', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      concept: 'Concept — the character of the pain and the company it keeps distinguishes cardiac ischaemia from its mimics, and the same two minutes of questioning screen for the one mimic — dissection — that makes infarct treatment lethal.',
      stem: 'He arrives forty minutes into the pain. What do you establish first?',
      opts: [
        { t: 'The character and radiation of the pain, its speed of onset, and whether it feels tearing or moves into the back', type: 'correct', d: "Characterises ischaemic pain and screens for dissection red flags in one question.",
          fb_title: 'Correct — one question, two diseases.',
          fb: 'Crushing retrosternal pressure radiating to arm and jaw, arriving over minutes, is ischaemic; tearing pain maximal within seconds and migrating to the interscapular back is dissection. Both are 64-year-old smokers, and the dissection screen costs fifteen seconds — the cheapest insurance in cardiology, because every treatment an infarct needs is poison to a dissected aorta.' },
        { t: 'His exertional history — could he previously walk this pain off?', type: 'near', d: "Distinguishes stable angina from an acute syndrome.",
          fb_title: 'The right question, already answered.',
          fb: 'Stable angina — exertional, ten minutes at most, relieved by rest — is managed from a clinic. But forty minutes of pain at rest has already told you this is not stable angina; the acute syndrome is established by the history of onset. The exertional history refines the risk profile later; it does not move the next ten minutes.' },
        { t: 'Reassure that muscular chest pain is common, prescribe simple analgesia and arrange review at the GP', type: 'wrong', d: "Treats the presentation as musculoskeletal strain.",
          harm: 'He collapses in the waiting room twenty minutes later. The rhythm strip shows ventricular fibrillation; return of spontaneous circulation takes four minutes of CPR and defibrillation, and the anterior wall is lost.',
          fb_title: 'DANGEROUS — an attribution that kills.',
          fb: 'Musculoskeletal pain is reproducible on movement and palpation and never brings diaphoresis and nausea with it. A 64-year-old diabetic smoker with forty minutes of crushing, sweating pain is a coronary occlusion until an ECG says otherwise — and "it is probably muscular" is precisely the sentence that sends STEMIs home. The history has already given you the answer; this order simply declines to hear it.' },
        { t: 'A detailed dietary history and what he ate that evening', type: 'wrong', d: "Screens for a gastrointestinal cause of the pain.",
          fb_title: 'The wrong ending to a familiar story.',
          fb: 'Reflux and oesophageal spasm genuinely mimic cardiac pain — spasm is relieved by nitrate too — so the GI differential is real. But it is asked after the ECG, not instead of it, and nothing about a heavy retrosternal pressure with sweating and nausea is answered by the menu. Starting with the diet anchors on the most dangerous benign diagnosis in the department.' },
      ],
    },

    exam: {
      label: 'Physical Examination',
      concept: 'Concept — the examination does two jobs at once: it looks for complications already happening (murmurs, failure, instability) and for the one finding — a pulse or blood-pressure differential — that would forbid anticoagulation.',
      stem: 'What do you do at the bedside?',
      opts: [
        { t: 'Blood pressure in both arms, all four limb pulses, and auscultation for new murmurs, a rub and crackles', type: 'correct', d: "Screens for dissection and detects mechanical complications.",
          fb_title: 'Correct — the screen and the scoreboard.',
          fb: 'The inter-arm pressure difference and pulse check complete the dissection screen the history began. Auscultation scores what the infarct is already doing: a new pansystolic murmur means papillary muscle or septal involvement, a rub means pericarditis, crackles mean the left ventricle is failing. Each changes urgency and destination — and all of it fits in two minutes at the bedside.' },
        { t: 'Reproduce the pain with palpation of the chest wall', type: 'near', d: "Tests for a musculoskeletal source.",
          fb_title: 'Genuinely useful — in the right patient, with the right caveat.',
          fb: 'Fully reproducible pain makes infarction much less likely, and in a young patient with no risk factors that manoeuvre can end the workup. In a 64-year-old diabetic smoker it cannot: a meaningful minority of acute coronary syndromes report some reproducibility, so a tender chest false-reassures precisely where reassurance is most expensive. It complements the ECG; it never substitutes for one.' },
        { t: 'A detailed respiratory examination looking for consolidation', type: 'wrong', d: "Screens for lobar pneumonia.",
          fb_title: 'The wrong disease for this story.',
          fb: 'Pneumonia causes pleuritic pain with fever, focal crackles and bronchial breathing — a pattern nothing in his history suggests. His pain came on at rest in a chair, is retrosternal and heavy, and arrived with autonomic discharge. Chasing consolidation spends the golden minutes on a diagnosis whose clues are all absent.' },
        { t: 'Ophthalmoscopy for hypertensive retinopathy', type: 'wrong', d: "Grades chronic hypertensive end-organ damage.",
          fb_title: 'A chronic answer to an acute question.',
          fb: 'Retinopathy grades decades of hypertension and belongs to the outpatient risk conversation. The acute question — is the pressure high enough to matter for nitrates, low enough to signal cardiogenic shock — is answered by the cuff, which is already on his arm.' },
      ],
    },

    labs: {
      label: 'Ordering Labs',
      concept: 'Concept — troponin confirms necrosis but is invisible for the first hours: it is the rise and fall between serial samples that makes the diagnosis, which is why a single normal value never reassures.',
      stem: 'Which blood tests do you send, and what are you allowed to conclude from them?',
      opts: [
        { t: 'Serial high-sensitivity troponin at zero and one to three hours — the delta is the diagnosis', type: 'correct', d: "Quantifies myocardial injury, and its change over time.",
          fb_title: 'Correct — the trend, not the number.',
          fb: 'High-sensitivity assays detect injury within one to three hours, and it is the rise or fall between samples that separates an acute event from the chronic, low-grade elevation seen in renal failure and heart failure. Send the rest of the panel — electrolytes, glucose, full blood count — but nothing in it gates reperfusion: in a STEMI the troponin is a receipt, printed after the purchase.' },
        { t: 'D-dimer', type: 'near', d: "Fibrin degradation marker.",
          fb_title: 'A dissection and PE screen, not an infarct test.',
          fb: 'It is a legitimate rule-out adjunct — a negative D-dimer in a low-probability patient helps close the door on dissection and PE. But it says nothing about a coronary occlusion, and it rises with age, infection and surgery, so a positive excludes nothing. In this case the way to dismiss dissection is the bedside screen and a normal mediastinum, not a fibrin marker.' },
        { t: 'Creatine kinase MB fraction as the first-line marker', type: 'wrong', d: "The cardiac isoenzyme of creatine kinase.",
          fb_title: 'Yesterday\'s marker.',
          fb: 'CK-MB is less sensitive and less specific than troponin and has been superseded for diagnosis. Its one remaining use is timing a reinfarction: troponin stays elevated for about a fortnight, while CK-MB clears in two to three days, so a new CK-MB rise amid a high troponin means something new has happened. That is a specialist question; today\'s is answered by the troponin delta.' },
        { t: 'CRP and erythrocyte sedimentation rate', type: 'wrong', d: "Non-specific inflammatory markers.",
          fb_title: 'Inflammation is not today\'s diagnosis.',
          fb: 'Inflammatory markers earn their keep in pericarditis, myocarditis and later Dressler syndrome — none of which is the diagnosis in the first hour of a suspected occlusion. The acute decision rests on the ECG and the troponin trend; everything else is background panel.' },
      ],
    },

    imaging: {
      label: 'Imaging',
      concept: 'Concept — imaging in ACS exists to exclude the great imitators and check for contraindications to anticoagulation; the ECG, not the X-ray, makes the diagnosis, and no scan may delay reperfusion.',
      stem: 'The ECG shows 4 mm ST elevation in V1–V4 with reciprocal depression inferiorly. What imaging now?',
      opts: [
        { t: 'A portable chest X-ray — obtained without delaying the cath lab', type: 'correct', d: "Checks the mediastinum and lung fields in one film.",
          fb_title: 'Correct — the portable film, and only the portable film.',
          fb: 'It looks for the widened mediastinum that would demand the dissection pathway before full anticoagulation, and for pulmonary oedema that changes the anaesthetic plan. The key word is portable: the film comes to him, because every minute of an occluded LAD is measured in myocardium. A normal film talks no one out of the cath lab.' },
        { t: 'CT aortogram to exclude dissection before anything else', type: 'near', d: "Contrast CT imaging of the aorta.",
          fb_title: 'The right scan for a different patient.',
          fb: 'With regional ST elevation, pressure-type pain that never left the front of the chest, equal arm pressures and no tearing quality, dissection is not the leading diagnosis — and the scanner is the wrong room to spend the reperfusion window in. The aortogram earns its place the moment a red flag appears: tearing pain, back radiation, a pulse deficit, a widened mediastinum.' },
        { t: 'Exercise treadmill stress test with ECG monitoring to confirm the diagnosis', type: 'wrong', d: "Controlled exercise with continuous ECG monitoring.",
          harm: 'At three minutes on the treadmill he develops ventricular fibrillation and is defibrillated on the spot. The test is abandoned and the arrest costs him another five minutes of coronary occlusion.',
          fb_title: 'DANGEROUS — exercising an artery that is occluding right now.',
          fb: 'Stress testing is for chest pain in patients in whom ACS has been excluded — it is a clinic and follow-up tool. In an evolving STEMI it is contraindicated in the strongest sense: demand ischaemia on an occluded vessel is how ventricular fibrillation is manufactured. The tempting confusion is that it is "the classic chest-pain test" — that classic belongs to outpatients, not to the resuscitation room.' },
        { t: 'Echocardiogram before reperfusion', type: 'wrong', d: "Ultrasound assessment of wall motion and function.",
          fb_title: 'It confirms what the ECG already knows.',
          fb: 'Echo would show anteroseptal akinesia — genuinely confirmatory, and genuinely slow. Its acute role is for the unstable: suspected free-wall rupture, acute mitral regurgitation, or shock of uncertain cause. In a stable STEMI the diagnosis is already made on twelve leads, and reperfusion does not wait for an ultrasound list.' },
      ],
    },

    treat: {
      label: 'Treatment',
      concept: 'Concept — reperfusion is the treatment and everything else is noise reduction: the choice between the cath lab and a fibrinolytic is an arithmetic of time and availability, made once and made quickly.',
      stem: 'Anterior STEMI, seventy minutes from pain onset. Your hospital has a 24/7 cath lab. BP 152/94, SpO₂ 96% on air. What now?',
      opts: [
        { t: 'Aspirin 300 mg chewed, a P2Y12 inhibitor, anticoagulation — and activate primary PCI, door-to-balloon inside 90 minutes', type: 'correct', d: "Dual antiplatelet therapy with urgent mechanical reperfusion.",
          fb_title: 'Correct — the full pathway, at full speed.',
          fb: 'Primary PCI is superior to fibrinolysis whenever it can be delivered inside the window, and this hospital is the inside-the-window case. Dual antiplatelet therapy and anticoagulation go in beforehand; no oxygen at 96%, no routine morphine; a nitrate spray is acceptable for pain but reopens nothing. The LAD is occluded and the wavefront is moving — the only variable that matters is minutes to wire.' },
        { t: 'Immediate thrombolysis with tenecteplase', type: 'near', d: "Intravenous fibrinolytic given as a bolus.",
          fb_title: 'The right drug, the wrong hospital.',
          fb: 'Fibrinolysis is the answer where PCI cannot happen within 120 minutes of diagnosis — rural centres, long transfers, cath labs that do not open at night. Here it forfeits the superior treatment, accepts a higher intracranial haemorrhage rate, and still commits him to angiography two to twenty-four hours later under the lyse-then-transfer strategy. The drug is not wrong; the geography is.' },
        { t: 'GTN infusion, ward admission, and a repeat ECG in the morning', type: 'wrong', d: "Anti-anginal infusion with delayed reassessment.",
          fb_title: 'A delay is a decision — this is the wrong one.',
          fb: 'An occluded LAD is necrosing transmurally minute by minute, and nitrates relieve spasm, not occlusion. Overnight observation converts an anterior STEMI into either a large anteroapical infarct with a failing ventricle, or a cardiac arrest at 3 a.m. on a general ward with a defibrillator four minutes away. The plan does not merely waste time — it chooses the complication.' },
        { t: 'Aspirin alone, awaiting the three-hour troponin before committing to treatment', type: 'wrong', d: "Single antiplatelet, treatment deferred to biomarkers.",
          fb_title: 'The ECG is the diagnosis; the troponin is a receipt.',
          fb: 'STEMI is a clinical-electrical diagnosis precisely because troponin lags the event by hours — waiting for it to rise spends the entire reperfusion window waiting for proof of what twelve leads have already shown. Aspirin alone, meanwhile, is incomplete antithrombotic cover for an occluding thrombus. The biomarker confirms and quantifies after the fact; it was never the gate.' },
      ],
    },
  },

  // The confusable pair: the dissection patient looks like a STEMI and every
  // ACS treatment is poison to them. That is why the screen precedes therapy.
  contrast: {
    a: 'STEMI',
    b: 'Aortic dissection',
    rows: [
      { f: 'Pain at onset',        a: 'Builds over minutes, pressure-like',                    b: 'Instant, maximal within seconds, tearing in quality' },
      { f: 'Radiation',            a: 'To left arm and jaw; stays put',                        b: 'To the interscapular back; migrates to the abdomen as the tear extends' },
      { f: 'Limb pulses and BP',   a: 'Symmetrical — no pulse deficit, arms within 20 mmHg',   b: 'Pulse deficit in a limb, or inter-arm systolic difference over 20 mmHg' },
      { f: 'New murmur',           a: 'Pansystolic (papillary muscle) or fourth sound',        b: 'Early diastolic — aortic regurgitation from root involvement' },
      { f: 'ECG',                  a: 'Regional ST elevation with reciprocal depression',      b: 'Often normal or hypertensive; inferior elevation if the tear involves the right coronary ostium — no reliable separation at the bedside' },
      { f: 'Troponin',             a: 'Rising from myocyte necrosis',                          b: 'Normal unless a coronary ostium is involved — and early on, both can be normal: no reliable difference in the first hour' },
      { f: 'Mediastinum on X-ray', a: 'Normal width; pulmonary oedema if the ventricle fails', b: 'Widened in around 60% — a normal width does not exclude it' },
      { f: 'Treatment',            a: 'Antiplatelets, anticoagulation, urgent reperfusion',    b: 'IV beta-blocker to slow the shear, then surgical repair (type A) — anticoagulants and lytics are lethal' },
    ],
  },
  takeaway: 'These two kill by different doors and share a waiting room. The dissection patient looks like a STEMI — same age, same risk factors, same pain — and sometimes even has the same ECG, if the tear involves a coronary ostium. Every treatment an infarct needs is poison to a dissection: heparin, a clopidogrel load, a fibrinolytic, a wire across the aortic arch. The two-minute screen — tearing quality, back radiation, unequal arms, new aortic regurgitation — is the highest-yield history in chest pain, and it must be taken before the first antithrombotic is given.',

  ddx: [
    { name: 'Acute Coronary Syndrome — Anterior STEMI', correct: true,
      reason: '✓ Confirmed. Forty minutes of crushing retrosternal pain radiating to arm and jaw with diaphoresis, 4 mm regional ST elevation in V1–V4 with reciprocal inferior depression, and a rising troponin — an occluded left anterior descending artery until the catheter proves otherwise.' },
    { name: 'Aortic Dissection', correct: false,
      reason: '✗ Ruled out — by the screen you ran first. The pain built rather than tore, never migrated to the back, arm pressures are equal within 8 mmHg, all pulses are present, and the mediastinum is normal on the portable film. It remains the diagnosis to re-open the instant any of those findings moves, because it is the one that forbids everything else on this list.' },
    { name: 'Pulmonary Embolism', correct: false,
      reason: '✗ Ruled out. The pain has no pleuritic component, saturations are 96% on air, and the ECG shows a regional infarct pattern rather than the sinus tachycardia with right-heart strain a large embolus produces. A massive PE can imitate an inferior STEMI — this anterior pattern is not that one.' },
    { name: 'Acute Pericarditis', correct: false,
      reason: '✗ Ruled out. The pain is not positional or pleuritic, there is no fever, no pericardial rub, and the ST elevation is regional and convex with reciprocal depression. Pericarditis gives widespread concave elevation with PR depression and no reciprocals — the ECGs are not similar, and the troponin in pericarditis, if raised at all, is a whisper.' },
    { name: 'GORD and Oesophageal Spasm', correct: false,
      reason: '✗ Ruled out by the company the pain keeps. No relation to food or posture, no burning quality — and retrosternal pressure with diaphoresis, nausea and 4 mm of ST elevation is not a GI diagnosis. Spasm genuinely mimics angina and genuinely yields to nitrate, which is exactly why the ECG and the troponin trend, not the antacid trial, settle this list.' },
  ],

  teaching: [
    'Time is muscle: necrosis spreads from the subendocardium outward, and every thirty minutes of delay to reperfusion measurably increases mortality. The clock is part of the diagnosis.',
    'Get an ECG within ten minutes for every chest pain. STEMI is a clinical-electrical diagnosis — the troponin confirms it later and was never the gate.',
    'A single normal troponin never excludes infarction in the first hours. Serial sampling, and the rise-and-fall between them, is what makes the diagnosis — especially in renal failure, where troponin runs chronically high.',
    'Give oxygen only for saturations below 90%. Routine oxygen in a normoxic infarct shows no benefit, and hyperoxia may enlarge the infarct.',
    'Chew the aspirin, load the P2Y12 inhibitor, and skip routine morphine — it delays antiplatelet absorption and carries worse observational outcomes.',
    'Screen for dissection before any antithrombotic: tearing pain maximal at onset, radiation to the back, inter-arm pressure difference over 20 mmHg, absent pulse, new aortic regurgitation. Anticoagulating a dissection is lethal.',
    'No nitrates in inferior infarction with right ventricular involvement — the infarcted right ventricle is preload-dependent, and venodilation drops the output off a cliff.',
    'Silent infarction is common in diabetics and the elderly. Breathlessness, epigastric discomfort, collapse or unexplained sweating deserves an ECG exactly as quickly as chest pain does.',
  ],
};
