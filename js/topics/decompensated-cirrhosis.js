// ────────────────────────────────────────────────
// TOPIC: Decompensated Cirrhosis  (Hepatology · Topic 07)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['decompensated-cirrhosis'] = {
  id: 'decompensated-cirrhosis',
  number: 7,
  system: 'Hepatology',
  title: 'Decompensated Cirrhosis',
  navMeta: 'Hepatology · Decompensated Cirrhosis',
  desc: 'A scarred liver fails two ways at once — hepatocellular and portal — and decompensation is the moment one of them becomes a symptom: ascites, encephalopathy, variceal bleeding, jaundice. Covers the physiology of the failing circuit, the precipitant hunt, and the taps, albumin and lactulose that decide the admission.',
  tags: [
    { label: 'Hepatology', cls: 'tag-renal' },
    { label: 'Pharmacology', cls: 'tag-pharma' },
    { label: 'Portal hypertension', cls: 'tag-cardio' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mr. Douglas Hayes',
    meta: '58M · Alcohol-related cirrhosis, abstinent two years, known varices · Brought by his wife',
    cc: '"He has not been himself for three days — forgetting things, sleeping all day, up all night. His belly has swelled over the past month, and last night he was talking nonsense and did not know where he was."',
    inspection: 'Jaundiced, with spider naevi across the shoulders and an everted umbilicus. Drowsy but rousable; his hands flap when held outstretched. Abdomen grossly distended, tympanic, with shifting dullness.',
  },

  // ── LEARN ──
  layers: [
    {
      kicker: 'Physiology',
      title: 'One scar, two failures',
      blocks: [
        { k: 'text', t: 'Cirrhosis is fibrosis plus regenerative nodules — architecture, not just injury. That single change splits the liver\'s failure into two syndromes that progress on different clocks: the hepatocellular failure of the cells themselves, and the portal hypertension of the plumbing around them. A patient decompensates when either becomes a symptom.' },
        { k: 'chain', t: 'From fibrosis to a belly full of salt water',
          steps: [
            'Chronic injury lays down fibrous tissue; nodules regenerate inside a shrinking capsule',
            'The sinusoids stiffen and portal resistance climbs — portal hypertension',
            'Splanchnic vasodilation follows (nitric-oxide driven); the arterial tree underfills',
            'The body reads underfill: renin–angiotensin, aldosterone and ADH all activate',
            'Sodium and free water are retained; hypoalbuminaemia lowers oncotic pressure',
            'Fluid collects in the peritoneum: ascites — the commonest first decompensation',
          ] },
        { k: 'point', hi: true, t: 'Portal hypertension does the mechanical damage',
          d: 'Pressure finds the old embryonic connections: portosystemic collaterals open as varices at the lower oesophagus and stomach, as caput medusae at the umbilicus, as anorectal varices. The spleen congests and over-works its platelets — hypersplenism, and with it the thrombocytopenia that quietly predicts the varices. And because collaterals bypass the liver, gut-derived ammonia reaches the brain unmetabolised: the second road to encephalopathy.' },
        { k: 'point', t: 'The synthetic side fails quietly',
          d: 'Albumin synthesis falls — oncotic pressure, drug binding and nutrition go with it. Clotting factor synthesis falls — the INR creeps up, the one "blood test of liver function" that tracks mortality. Bile handling fails late; jaundice is a late sign because a liver can lose most of its functional reserve before the sclera turns. When the synthetic markers and the portal signs appear together, the liver has less reserve than either suggests alone.' },
        { k: 'check',
          q: 'Why does ascites form in cirrhosis? The single best answer.',
          opts: [
            { t: 'Portal hypertension leaks fluid into the peritoneum while a sodium-avid, aldosterone-driven kidney refuses to excrete it', ok: true },
            { t: 'The failing liver cannot clear the water the patient drinks each day' },
            { t: 'A protein-losing enteropathy drains albumin and fluid into the gut' },
          ],
          why: 'Both halves matter. Vasodilation drops the effective arterial volume, so the kidney retains sodium and water as if the patient were hypovolaemic — the "underfill" that drives the whole syndrome — while portal pressure and hypoalbuminaemia push fluid across the splanchnic bed. Drinking water is neither retained preferentially nor the issue; the retention is hormonal and sodium-directed, which is why diuretic therapy pairs spironolactone with furosemide. Protein-losing enteropathy is a different disease\'s mechanism.' },
      ],
    },

    {
      kicker: 'Clinical',
      title: 'The stigmata, the flapping hands, the silent infection',
      blocks: [
        { k: 'text', t: 'Decompensation announces itself as one or more of the four: ascites, encephalopathy, variceal haemorrhage, jaundice. The bedside examination is unusually powerful here — the liver writes its history on the skin, the hands and the belly — but its most important finding is usually the one that is not there: fever, in a patient with an infected peritoneum.' },
        { k: 'point', t: 'The bedside is the diagnosis',
          d: 'Spider naevi (upper half of the body), palmar erythema, gynaecomastia and testicular atrophy from disordered oestrogen handling, leuconychia and a hard nodular liver edge. Asterixis — the flapping tremor of sustained posture, a <em>negative</em> myoclonus — is metabolic: hepatic, uraemic or hypercapnic, and never a cerebellar sign. Fetor hepaticus, a sweet musty halitosis, comes from portosystemic shunting of sulfur compounds.' },
        { k: 'point', hi: true, t: 'Grade the brain: West Haven',
          d: 'Grade I: sleep–wake reversal and shortened attention. Grade II: lethargy, disorientation, asterixis. Grade III: somnolent but rousable, marked confusion. Grade IV: coma. And behind every grade sits the precipitant list — infection, gastrointestinal bleeding (blood is a protein load the gut converts to ammonia), constipation, sedatives, electrolyte derangement, over-diuresis. Finding and treating the precipitant is the treatment; lactulose is only the bridge.' },
        { k: 'point', t: 'Spontaneous bacterial peritonitis presents quietly',
          d: 'SBP is infection of the ascitic fluid with no surgical source, almost always monomicrobial from gut translocation. It presents as encephalopathy, worsening renal function, low-grade fever, abdominal discomfort — or nothing at all. It cannot be excluded from the bedside: the diagnostic tap is done on every admission with ascites, and an ascitic neutrophil count of 250 per microlitre or more treats the patient before any culture returns.' },
        { k: 'check',
          q: 'A cirrhotic with ascites becomes newly confused. Temperature 37.9°C. What comes first?',
          opts: [
            { t: 'Diagnostic paracentesis — cell count and culture — before anything else', ok: true },
            { t: 'Lactulose, and ask the family about constipation' },
            { t: 'CT head to exclude a structural cause' },
          ],
          why: 'SBP is the precipitant that kills silently, and it is invisible without the tap — the neutrophil count commits you to antibiotics within the hour, weeks before any culture result. Lactulose treats the encephalopathy but not the infection driving it, and starting with constipation is how the fever gets explained away. CT head is for focal signs, seizures or trauma; a flapping, febrile, jaundiced brain is metabolic until proven otherwise.' },
      ],
    },

    {
      kicker: 'Management',
      title: 'Drain carefully, sedate never, protein always',
      blocks: [
        { k: 'text', t: 'The decompensated cirrhotic has three parallel jobs: find and kill the precipitant, protect the circulation during any large drain, and never make the brain worse. Almost every harm in this specialty comes from skipping one of the three.' },
        { k: 'chain', t: 'The decompensated patient, in order',
          steps: [
            'Airway, glucose, exclude active bleeding; stop sedatives and nephrotoxins',
            'Diagnostic paracentesis — neutrophil count, culture, SAAG',
            'Treat the precipitant: cefotaxime for SBP — with its own albumin if the kidneys are injured — endoscopic banding for varices',
            'Lactulose titrated to two or three soft stools a day',
            'Large-volume paracentesis with IV albumin cover — 6–8 g per litre above 5 L',
            'Spironolactone with furosemide at a 100:40 ratio once stable',
            'Non-selective beta-blocker for varices, six-monthly ultrasound surveillance, transplant conversation',
          ] },
        { k: 'point', hi: true, t: 'The tap that hurts: large-volume paracentesis without albumin',
          d: 'The cirrhotic circulation is already maximally vasodilated and maximally aldosterone-driven — there is no compensatory reserve left. Drain five litres or more without oncotic cover and the effective arterial volume collapses: post-paracentesis circulatory dysfunction, with hyponatraemia, renal failure and earlier death. Six to eight grams of albumin per litre drained above the first five is not a nicety; it is the difference between a paracentesis and a shock state.' },
        { k: 'point', t: 'SBP gets its own albumin — a survival drug, not a cover',
          d: 'Around a third of SBP episodes injure the kidneys, and in that setting — a creatinine above 1 mg/dL (88 µmol/L), marked uraemia or a bilirubin above 4 mg/dL — albumin 1.5 g/kg on day one then 1 g/kg on day three alongside the antibiotic markedly reduces hepatorenal syndrome and short-term mortality. Do not conflate it with paracentesis cover: that replaces drained oncotic volume, this defends kidneys failing under infection-driven vasodilation. Two indications, two doses, two mechanisms — and conflating them is usually how the SBP dose is the one that gets forgotten.' },
        { k: 'point', t: 'Diuretics have a speed limit',
          d: 'Target weight loss is about half a kilogram a day — a kilogram with peripheral oedema to spend. Faster than that and you diurese the intravascular compartment of a patient who cannot refill it: hypovolaemia, hepatorenal syndrome, encephalopathy. Refractory ascites is not treated with bigger doses; it is treated with frequent taps plus albumin, a TIPS, or a transplant list.' },
        { k: 'point', t: 'Things that quietly injure cirrhotics',
          d: 'NSAIDs precipitate renal failure; aminoglycosides are nephrotoxic on principle; benzodiazepines are GABA-ergic sedation of a brain already bathed in shunted toxins — coma on prescription. And protein restriction, once standard for encephalopathy, is a myth with a body count: the target is 1.2 to 1.5 grams per kilogram a day, because sarcopenia shortens more lives than ammonia ever did.' },
        { k: 'check',
          q: 'You are draining 8 litres of ascites. What must accompany the procedure?',
          opts: [
            { t: 'IV albumin, 6–8 g per litre above the first 5 litres', ok: true },
            { t: 'Slowing the drain to under 2 litres makes cover unnecessary' },
            { t: 'A furosemide bolus, to keep the drained volume from returning' },
          ],
          why: 'Albumin expands the intravascular volume the tap is emptying, and the 6–8 g per litre figure above 5 L is the studied dose that prevents post-paracentesis circulatory dysfunction. Slowing the drain does not refill the circulation — low-rate taps of large volume still unload it, and the total removed is what counts. Furosemide goes in exactly the wrong direction: it diureses the very compartment the albumin is propping up.' },
      ],
    },
  ],

  // ── CASE DATA ──
  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: {
    mild: {
      label: 'Early decompensation', cls: 'sev-mild', twist: null,
      vitals: [{ l: 'BP', v: '110/68', n: false, w: false }, { l: 'HR', v: '88', n: false, w: false }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '97', n: false, w: false }, { l: 'Temp', v: '37.0', n: false, w: false }],
    },
    moderate: {
      label: 'Ascites with encephalopathy', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '102/62', n: false, w: true }, { l: 'HR', v: '96', n: false, w: false }, { l: 'RR', v: '18', n: false, w: false }, { l: 'SpO₂', v: '96', n: false, w: false }, { l: 'Temp', v: '37.4', n: false, w: true }],
    },
    severe: {
      label: 'SBP with renal injury', cls: 'sev-severe',
      twist: 'Urine output has fallen to 15 mL per hour and the creatinine is climbing despite volume. The tap came back positive: this is spontaneous bacterial peritonitis driving hepatorenal physiology.',
      vitals: [{ l: 'BP', v: '88/52', n: true, w: false }, { l: 'HR', v: '114', n: false, w: true }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '95', n: false, w: false }, { l: 'Temp', v: '38.2', n: false, w: true }],
    },
    atypical: {
      label: 'Variceal haemorrhage', cls: 'sev-atypical',
      twist: 'He has been passing melaena since yesterday — the encephalopathy was precipitated by a variceal bleed, and the blood in his gut is the protein load his flora are converting to ammonia.',
      vitals: [{ l: 'BP', v: '94/58', n: false, w: true }, { l: 'HR', v: '118', n: false, w: true }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '96', n: false, w: false }, { l: 'Temp', v: '36.4', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      concept: 'Concept — decompensation has a precipitant more often than not, and finding it — infection, bleeding, constipation, sedatives, diuretics — is the treatment; the history is where it hides.',
      stem: 'His wife is at the bedside. What do you establish first?',
      opts: [
        { t: 'The last three weeks: infections, black or bloody stools, constipation, new medicines or diuretic changes, and any return to drinking', type: 'correct', d: "Hunts for the precipitant — infection, bleeding, constipation, sedatives, diuretics, alcohol.",
          fb_title: 'Correct — the trigger is the treatment.',
          fb: 'Every item on that list is a treatable trigger: spontaneous bacterial peritonitis, a variceal bleed loading the gut with protein, constipation feeding ammonia, a sedative the brain cannot afford, over-diuresis shrinking the circulation. Treating encephalopathy without removing its cause is a revolving door — and the melaena question is asked aloud, not assumed, because patients with hepatic flap rarely volunteer it.' },
        { t: 'A quantified lifetime and current alcohol history', type: 'near', d: "Characterises the aetiological insult.",
          fb_title: 'The right history for a different day.',
          fb: 'Aetiology decides prognosis, transplant candidacy and the abstinence conversation — and sustained abstinence is the single strongest modifier of this disease\'s course. But the notes record two abstinent years, and today\'s question is why he decompensated now. The alcohol history follows the precipitant; it does not replace it.' },
        { t: 'Whether he has been eating large amounts of red meat', type: 'wrong', d: "Screens for dietary protein as an ammonia load.",
          fb_title: 'A myth worth burying on the record.',
          fb: 'Protein restriction was standard teaching for decades and it was wrong: cirrhotic patients lose muscle faster than almost anyone, and sarcopenia shortens more lives than a protein-associated ammonia rise. Current targets are 1.2 to 1.5 grams per kilogram daily. A history of protein intake explains nothing here and quietly rehearses the wrong treatment.' },
        { t: 'Travel history, tattoos and past transfusions', type: 'wrong', d: "Screens for viral hepatitis acquisition.",
          fb_title: 'A first-consult question, not a third-week question.',
          fb: 'Viral serology belongs to the initial workup of liver disease — and his is established, biopsied or scanned, and labelled. The exposure question adds days and changes nothing about why a known cirrhotic decompensated this week. Today\'s cause is a precipitant, not a virus.' },
      ],
    },

    exam: {
      label: 'Physical Examination',
      concept: 'Concept — the examination distinguishes chronic decompensation (stigmata, ascites, asterixis) from a new acute insult (fever, peritonism, hypotension) that changes today\'s treatment.',
      stem: 'What do you do at the bedside?',
      opts: [
        { t: 'Hands outstretched for asterixis, a West Haven grade for the confusion, temperature, and gentle palpation for peritonism', type: 'correct', d: "Grades the encephalopathy and screens for infection.",
          fb_title: 'Correct — two questions, one examination.',
          fb: 'Asterixis and a formal grade make the encephalopathy a number you can follow over days instead of an impression. Temperature and peritonism screen for SBP — and their absence excludes nothing, which is exactly why the tap in the next section is non-negotiable. The everted umbilicus you noticed on inspection also matters: it is a hernia, and it is sitting on your tap site.' },
        { t: 'Shifting dullness and a fluid thrill to size the ascites', type: 'near', d: "Bedside estimation of intraperitoneal fluid.",
          fb_title: 'Confirms the obvious, measures nothing you need.',
          fb: 'Shifting dullness confirms free fluid at volume — but the belly has already told you that, and neither the dullness nor the thrill changes what you do today. The volume that matters is measured by ultrasound and drained under cover; the number that matters is the neutrophil count, and it needs a needle, not a hand.' },
        { t: 'Test rapid alternating movements for dysdiadochokinesis', type: 'wrong', d: "A cerebellar coordination test.",
          fb_title: 'The flap is not ataxia.',
          fb: 'It tempts because the wandering, flapping hands look like incoordination — but asterixis is a negative myoclonus of the antigravity muscles, a metabolic phenomenon seen in hepatic and uraemic encephalopathy and hypercapnia. Cerebellar signs would point somewhere else entirely — alcohol-related cerebellar degeneration, Wernicke encephalopathy — with different urgent treatments. Grade the flap, do not dance around it.' },
        { t: "Assess for Dupuytren's contracture and parotid enlargement", type: 'wrong', d: "Signs of chronic alcohol-related tissue disease.",
          fb_title: 'Aetiological stigmata, irrelevant to the grade.',
          fb: 'Both are real markers of chronic alcohol-related disease and both belong in the first consult that established the diagnosis years ago. Neither grades an encephalopathy, finds a precipitant, or changes a single order today. The examination time is better spent on temperature, peritonism and the flap you can follow.' },
      ],
    },

    labs: {
      label: 'Ordering Labs',
      concept: 'Concept — the most important test in decompensated cirrhosis is not a blood test: the ascitic neutrophil count finds the infection that presents as confusion, and the count decides treatment long before any culture returns.',
      stem: 'Which investigation do you send first, and what result changes management today?',
      opts: [
        { t: 'Diagnostic paracentesis — ascitic neutrophil count, culture and SAAG', type: 'correct', d: "Samples the peritoneal fluid for infection and its cause.",
          fb_title: 'Correct — one needle answers the biggest question.',
          fb: 'A neutrophil count of 250 per microlitre or more is spontaneous bacterial peritonitis, and it commits you to a third-generation cephalosporin within the hour — cultures take two days and change nothing today, which is why the fluid goes into blood-culture bottles at the bedside to raise the yield. The SAAG tells the older story: at 11 g/L or more, the ascites is portal-hypertensive, which is the story you expected.' },
        { t: 'Urea, creatinine and sodium', type: 'near', d: "Grades renal function and electrolyte status.",
          fb_title: 'Mandatory — but it is not the first order.',
          fb: 'These bloods are essential: hyponatraemia both mimics and worsens encephalopathy, and a rising creatinine in this patient is hepatorenal syndrome until volume and nephrotoxins say otherwise — it is also one of the strongest prognostic numbers he has. But they do not find the precipitant. The confusion could be a sodium of 118 or a peritoneum full of bacteria, and only one of those is invisible without a needle.' },
        { t: 'Serum ammonia level', type: 'wrong', d: "Measures the nitrogen metabolite implicated in encephalopathy.",
          fb_title: 'The test that looks like the answer.',
          fb: 'Ammonia is mechanistically central — the urea cycle cannot clear what the shunted portal blood delivers — but it correlates poorly with encephalopathy grade, venous samples are unreliable, and no management decision turns on the number. It tempts precisely because Step 1 teaches the urea cycle; the lesson is that mechanism and diagnostic utility are different currencies. You treat the brain you examined, not the value you sent.' },
        { t: 'Hepatitis serology and an autoimmune profile', type: 'wrong', d: "Screens for alternative aetiological diagnoses.",
          fb_title: 'Fishing in water already charted.',
          fb: 'The aetiology of his cirrhosis is established, and re-opening the viral and autoimmune question costs days and answers nothing about this admission. Aetiology matters when it is unknown — the young patient with a first deranged clotting profile. His liver has a label; his abdomen has a question.' },
      ],
    },

    imaging: {
      label: 'Imaging',
      concept: 'Concept — imaging in decompensation answers three questions: is the fluid what it seems, is the portal vein open, and is there a tumour — and the first two need nothing more than ultrasound.',
      stem: 'What imaging does he need?',
      opts: [
        { t: 'Ultrasound abdomen with portal vein Doppler', type: 'correct', d: "Confirms ascites, screens for HCC and portal vein thrombosis.",
          fb_title: 'Correct — three answers, no contrast, no radiation.',
          fb: 'Ultrasound confirms and measures the ascites, marks a safe tap site away from that everted umbilical hernia, screens for the hepatocellular carcinoma whose six-monthly surveillance was due, and the Doppler asks whether the portal vein is still patent — a thrombosed vein changes anticoagulation and transplant decisions. It is cheap, portable, and kind to kidneys that are one bad day away from hepatorenal syndrome.' },
        { t: 'CT head', type: 'near', d: "Excludes structural intracranial causes of confusion.",
          fb_title: 'The reflex worth resisting.',
          fb: 'In a drowsy 58-year-old the scanner is a reasonable reflex — and it is the right call with focal signs, a seizure, a fall or anticoagulation on board. Here the asterixis, fever, jaundice and known cirrhosis make the brain metabolic until proven otherwise; CT does not show hepatic encephalopathy. The real risk is opportunity cost: every hour in the scanner is an hour the untreated SBP and the untapped abdomen spend getting worse.' },
        { t: 'CT abdomen with IV contrast', type: 'wrong', d: "Cross-sectional imaging with iodinated contrast.",
          fb_title: 'The right information, the wrong first move.',
          fb: 'Contrast CT would show more than ultrasound — and cost radiation plus a contrast load to kidneys already hypoperfused by vasodilation and diuretics. Ultrasound answers today\'s questions; contrast CT earns its place for characterising a focal lesion found on ultrasound, or for planning a TIPS. Order it for a reason, not for completeness.' },
        { t: 'Barium swallow to screen the known varices', type: 'wrong', d: "Contrast radiography of the oesophagus.",
          fb_title: 'Half a century out of date.',
          fb: 'Barium swallows screened varices before flexible endoscopy existed, and nothing about this admission would change even if they had not: variceal screening is an endoscopic, planned exercise, and active bleeding is endoscoped urgently with vasoactive cover. His varices are already known — what this admission needs is the tap, the antibiotics and the albumin.' },
      ],
    },

    treat: {
      label: 'Treatment',
      concept: 'Concept — the decompensated cirrhotic has three parallel jobs: kill the precipitant, protect the circulation through any large drain with albumin, and never make the brain worse — no sedatives, no protein restriction. And each albumin is matched to its indication: oncotic cover for a drained volume is not the survival dose for SBP with renal failure.',
      stem: 'The ascitic neutrophil count is 310 per microlitre. He is grade II encephalopathy. You plan an 8-litre paracentesis. What is the treatment plan?',
      opts: [
        { t: 'Cefotaxime for the SBP with its own albumin — 1.5 g/kg on day 1, 1 g/kg on day 3; the creatinine is climbing — plus lactulose, and 6–8 g per litre above the first 5 litres for the drain', type: 'correct', d: "Treats the infection, the kidneys, the brain and the drained volume.",
          fb_title: 'Correct — and two different albumins, for two different reasons.',
          fb: 'The neutrophil count is SBP by definition, so cefotaxime starts before any culture returns — and because his creatinine is climbing with the urine output falling, this is exactly the SBP that earns infection-specific albumin: 1.5 g/kg on day 1 and 1 g/kg on day 3, the regimen shown to cut hepatorenal syndrome and short-term mortality, not merely to refill a drained belly. Lactulose handles the brain. The 6–8 g per litre above five litres is a separate infusion entirely — oncotic cover for the volume the tap removes. One is a survival intervention; the other is plumbing.' },
        { t: 'Cefotaxime and lactulose, with albumin cover for the 8-litre tap — but no day-1/day-3 SBP albumin', type: 'near', d: "Treats infection and brain and covers the drain; omits the SBP renal dose.",
          fb_title: 'The distinction this case is built to test.',
          fb: 'It feels complete — the infection is treated, the brain is treated, and albumin was given. But the two albumins are different drugs doing different jobs: tap cover replaces drained oncotic volume, while the SBP course defends kidneys already failing under infection-driven vasodilation, and it is the one intervention proven to reduce hepatorenal syndrome and mortality in this situation. In a man whose creatinine is climbing and whose urine output is falling, leaving it out treats the belly and abandons the kidney.' },
        { t: 'Drain to dryness quickly, and give midazolam to keep him calm during the tap', type: 'wrong', d: "Complete paracentesis with benzodiazepine sedation.",
          harm: 'Ninety minutes after the tap his BP is 78/48 with cold peripheries, and the midazolam has deepened the grade II encephalopathy into unrousable coma. He is intubated on the unit.',
          fb_title: 'DANGEROUS — two injuries in a single order.',
          fb: 'Dry taps of that volume without albumin cover invite post-paracentesis circulatory dysfunction at its worst. And midazolam in a cirrhotic brain is GABAergic sedation of tissue already primed for coma — the diseased liver cannot clear it and the shunted blood delivers it past what clearance remains. If sedation were truly unavoidable it would be the smallest dose of the gentlest agent with an airway plan; here it is not needed at all. He is drowsy because his brain is poisoned, and you would be adding to the poison to solve a behavioural problem that a slower, covered tap does not create.' },
        { t: 'Restrict dietary protein, and add furosemide to clear the ascites faster', type: 'wrong', d: "Protein restriction with aggressive diuresis.",
          fb_title: 'Both halves are how cirrhotics used to be killed.',
          fb: 'Protein restriction worsens the sarcopenia that actually determines survival — the target is 1.2 to 1.5 g/kg/day, and it is part of the treatment, not the problem. The furosemide push is the other classic: a depleted vasculature diuresed past its speed limit slides into hepatorenal syndrome and deepens the encephalopathy. Diuresis in this disease has a speed limit of about half a kilogram a day; refractory ascites is a needle, a TIPS or a transplant conversation — never a bigger dose.' },
      ],
    },
  },

  // The confusable pair: the first presentation of an undiagnosed cirrhotic
  // can wear acute liver failure's clothes. Time and architecture separate them.
  contrast: {
    a: 'Decompensated cirrhosis',
    b: 'Acute liver failure',
    rows: [
      { f: 'Course',              a: 'Chronic — years of silent injury before the first decompensation', b: 'Acute — a healthy liver destroyed within days to weeks' },
      { f: 'The brain',           a: 'Shunted ammonia plus precipitants; fluctuating, usually reversible; cerebral oedema rare', b: 'Direct hepatocellular failure; progressive; cerebral oedema is the feared complication' },
      { f: 'Portal hypertension', a: 'Central to the picture — varices, splenomegaly, caput medusae', b: 'Absent — the liver is not yet fibrotic' },
      { f: 'Liver architecture',  a: 'Nodular, shrunken, fibrotic; the stigmata are on the skin', b: 'Structurally normal, with massive necrosis on histology' },
      { f: 'Ascites',             a: 'Usual — often the first decompensation', b: 'Unusual' },
      { f: 'Coagulopathy',        a: 'Often prolonged but partially compensated; bleeding is usually variceal', b: 'Severe and progressive — encephalopathy with INR over 1.5 defines the syndrome' },
      { f: 'First presentation',  a: 'May be the first diagnosis ever made — no prior history exists', b: 'Acute-on-chronic failure sits between the two: no reliable bedside rule separates them on day one' },
      { f: 'Definitive treatment', a: 'Treat the precipitant, control portal hypertension, transplant when the MELD earns it', b: 'Support the brain, treat the cause (N-acetylcysteine for paracetamol), and urgent transplant assessment' },
    ],
  },
  takeaway: 'The difference is time and architecture. The cirrhotic fails slowly and then suddenly — a brain poisoned by shunted ammonia, a belly full of retained salt water — and each episode has a treatable precipitant hiding inside it. Acute liver failure is a previously healthy liver destroyed in days, where the brain swells, the INR climbs, and the only question is whether transplant arrives in time. The trap is the first presentation of a never-diagnosed cirrhotic, which can wear acute liver failure\'s clothes; the stigmata — spiders, a hard nodular edge, a high-SAAG ascites — are what untangle them.',

  ddx: [
    { name: 'Decompensated Cirrhosis with SBP and Encephalopathy', correct: true,
      reason: '✓ Confirmed. Known alcohol-related cirrhosis with new ascites, grade II encephalopathy with asterixis, an ascitic neutrophil count of 310 per microlitre and a high SAAG — portal-hypertensive ascites infected: spontaneous bacterial peritonitis presenting as confusion, which is how it usually presents.' },
    { name: 'Acute Liver Failure', correct: false,
      reason: '✗ Ruled out — with respect to the trap. Chronic stigmata, known varices, a high SAAG and established portal hypertension all mark a liver that has been failing structurally for years, and cerebral oedema — the signature of acute failure — is absent. Had he arrived without that history, this row would look different; that humility is the point of the contrast table.' },
    { name: 'Tuberculous Peritonitis', correct: false,
      reason: '✗ Ruled out by the tap. Tuberculous peritonitis gives a low-SAAG ascites with a lymphocyte-predominant cell count; his fluid is high-SAAG with 310 neutrophils per microlitre. Adenosine deaminase and peritoneal biopsy are for the lymphocytic picture, not this one.' },
    { name: 'Cardiac Ascites', correct: false,
      reason: '✗ Ruled out at the bedside. Right heart failure and constrictive pericarditis also raise the SAAG — which is exactly why the JVP is examined in every ascites: his is not raised, there are no signs of pulmonary hypertension, and encephalopathy plus chronic stigmata point at the liver, not the pump.' },
    { name: 'Hepatocellular Carcinoma', correct: false,
      reason: '✗ Ruled out on this admission\'s ultrasound — no focal lesion, and the decompensation is fully explained by the SBP. It stays on the list because it is the standing reason known cirrhotics decompensate without warning, and the six-monthly surveillance scan is how you meet it before it introduces itself like this.' },
  ],

  teaching: [
    'A SAAG of 11 g/L or more says the ascites is portal-hypertensive; below that, look outside the liver — tuberculosis, malignancy, pancreas, nephrotic syndrome.',
    'An ascitic neutrophil count of 250 per microlitre is spontaneous bacterial peritonitis — treat with a third-generation cephalosporin on the spot, which is why the diagnostic tap belongs at the front of every cirrhotic admission: SBP presents as confusion, renal failure or nothing at all.',
    'Drain more than five litres and you owe the vein 6–8 grams of albumin per litre — post-paracentesis circulatory dysfunction is a preventable, mortal event.',
    'SBP with renal dysfunction earns albumin of its own — 1.5 g/kg on day 1 and 1 g/kg on day 3 — a survival intervention against hepatorenal syndrome. It is not paracentesis cover: the 6–8 g per litre for a large drain is a different infusion doing a different job.',
    'Ammonia levels correlate poorly with encephalopathy and change no decision: you treat the brain you examined, not the number you sent.',
    'Hunt the precipitant first — infection, gastrointestinal bleed, constipation, sedatives, electrolytes, over-diuresis. Treating encephalopathy without removing its cause is a revolving door.',
    'Never restrict protein (target 1.2–1.5 g/kg/day) and never give benzodiazepines to a cirrhotic brain — both make the encephalopathy worse.',
    'Non-selective beta-blockers and variceal banding prevent the bleed that ends the story; six-monthly ultrasound surveillance catches the hepatocellular carcinoma that would end it instead.',
  ],
};
