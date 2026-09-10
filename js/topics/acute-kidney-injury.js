// ────────────────────────────────────────────────
// TOPIC: Acute Kidney Injury  (Renal · Topic 03)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['acute-kidney-injury'] = {
  id: 'acute-kidney-injury',
  number: 3,
  system: 'Renal',
  title: 'Acute Kidney Injury',
  navMeta: 'Renal · Acute Kidney Injury',
  desc: 'An abrupt fall in glomerular filtration over hours to days. The entire workup is one clean reasoning tree — pre-renal, intrinsic, or post-renal — read from the urine, the volume status, and an ultrasound. Learn the framework, then take a real patient from a rising creatinine to a diagnosis and a plan.',
  tags: [
    { label: 'Renal', cls: 'tag-renal' },
    { label: 'Pharmacology', cls: 'tag-pharma' },
    { label: 'Fluids & Electrolytes', cls: 'tag-resp' },
    { label: 'High-yield · Step 1', cls: 'tag-fa' },
  ],

  patient: {
    name: 'Mr. Harold Whitfield',
    meta: '72M · HTN, osteoarthritis · on lisinopril + ibuprofen · Brought by wife',
    cc: '"He\'s been vomiting and off his food for three or four days, doctor, and he\'s barely passed water today. He just seems slower and more tired than himself."',
    // General inspection: dehydrated and lethargic, slumped.
    appearance: { build: 'lean', posture: 'slumped', age: 'older', hair: 'short', skin: 'deep', clothes: 'shirt', glasses: true },
    inspection: 'Slumped in the chair and drowsy, dry mucous membranes, skin turgor reduced.'
  },

  // ── LEARN DATA (3 layers) ──
  layers: [
    // LAYER 1: Definition + the pre/intra/post framework + autoregulation
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 1 of 3</div>
        <h2 class="layer-title">What AKI is — and the only framework you need</h2>
        <div class="layer-body">
          <p><strong>AKI</strong> is an abrupt drop in GFR, defined by a rise in creatinine (<em>≥0.3 mg/dL in 48h</em>, or ≥1.5× baseline) or oliguria (&lt;0.5 mL/kg/h). Every cause fits into one of three buckets:</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>Pre-renal (≈60%):</strong> the kidney is fine but <em>under-perfused</em> — hypovolaemia, haemorrhage, heart failure, sepsis. Reversible if you restore perfusion fast, but prolonged ischaemia tips into ATN.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Intrinsic:</strong> the parenchyma is damaged. Most common is <em>acute tubular necrosis (ATN)</em> — from ischaemia or nephrotoxins (aminoglycosides, contrast, myoglobin, cisplatin). Also AIN (drug-induced, allergic) and glomerulonephritis.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Post-renal:</strong> <em>obstruction</em> to outflow — BPH, stones, pelvic malignancy. Needs obstruction of both kidneys (or one in a single-kidney patient) to raise creatinine. Always excluded early because it's so reversible.</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>Autoregulation — the "triple whammy":</strong> the afferent arteriole dilates (prostaglandins) and the efferent constricts (angiotensin II) to hold GFR. <em>NSAIDs</em> block afferent dilation; <em>ACE inhibitors/ARBs</em> block efferent constriction. Add <em>volume depletion</em> and GFR collapses.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.586–589 — AKI classification &amp; renal autoregulation</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Quick check — Which combination most predictably precipitates pre-renal AKI?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">A beta-blocker + a statin</button>
          <button class="micro-btn" onclick="microAns(this, true)">Volume depletion + an NSAID + an ACE inhibitor</button>
          <button class="micro-btn" onclick="microAns(this, false)">A proton-pump inhibitor + paracetamol</button>
        </div>
        <div class="micro-ans" id="micro-ans-0">Correct — the classic "triple whammy." Hypovolaemia lowers renal perfusion, the NSAID blocks the afferent (prostaglandin-mediated) dilation that would defend GFR, and the ACE inhibitor blocks the efferent (angiotensin II) constriction. Together they strip away autoregulation and GFR falls sharply.</div>
      </div>
      <div class="learn-nav">
        <button class="btn-primary" onclick="nextLayer()">Next layer →</button>
        <button class="btn-ghost" onclick="startCase()">Skip to case</button>
      </div>
    `,

    // LAYER 2: Localising it — urine studies + ultrasound
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 2 of 3</div>
        <h2 class="layer-title">Reading the urine — pre-renal vs ATN</h2>
        <div class="layer-body">
          <p>The urine tells you the bucket. A pre-renal kidney is <em>avidly reabsorbing</em> sodium and water; a necrotic tubule <em>cannot</em>.</p>
          <div class="compare">
            <div class="compare-col">
              <div class="compare-head left">Pre-renal</div>
              <div class="compare-item">BUN:Cr &gt; 20:1</div>
              <div class="compare-item">FENa &lt; 1% · Urine Na &lt; 20</div>
              <div class="compare-item">Urine osmolality &gt; 500 (concentrated)</div>
              <div class="compare-item">Bland sediment ± hyaline casts</div>
              <div class="compare-item">Responds to fluids</div>
            </div>
            <div class="compare-col">
              <div class="compare-head right">ATN (intrinsic)</div>
              <div class="compare-item">BUN:Cr ≈ 10–15:1</div>
              <div class="compare-item">FENa &gt; 2% · Urine Na &gt; 40</div>
              <div class="compare-item">Urine osmolality &lt; 350 (isosthenuric)</div>
              <div class="compare-item">Muddy-brown granular casts</div>
              <div class="compare-item">Does NOT respond to fluids</div>
            </div>
          </div>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>Renal ultrasound</strong> is the key structural test — it detects <em>hydronephrosis</em> (post-renal obstruction) and shows kidney size. Small, echogenic kidneys suggest chronic disease, not AKI. No contrast, no nephrotoxicity.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Sediment is a shortcut:</strong> muddy-brown granular casts → ATN. RBC casts → glomerulonephritis. WBC casts + eosinophils → acute interstitial nephritis. Bland → pre-renal or post-renal.</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.588–590 — Urine indices, casts &amp; imaging in AKI</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">Muddy-brown granular casts with a FENa of 3% point to which diagnosis?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Pre-renal azotaemia</button>
          <button class="micro-btn" onclick="microAns(this, true)">Acute tubular necrosis</button>
          <button class="micro-btn" onclick="microAns(this, false)">Post-renal obstruction</button>
        </div>
        <div class="micro-ans" id="micro-ans-1">Correct. Muddy-brown granular casts are the signature of ATN, and a FENa &gt; 2% confirms the tubules have lost their ability to reabsorb sodium. A pre-renal kidney would show FENa &lt; 1% and a bland sediment.</div>
      </div>
      <div class="learn-nav">
        <button class="btn-primary" onclick="nextLayer()">Next layer →</button>
        <button class="btn-ghost" onclick="startCase()">Skip to case</button>
      </div>
    `,

    // LAYER 3: Management + hyperkalaemia + dialysis
    () => `
      <div class="layer-card">
        <div class="layer-num">Layer 3 of 3</div>
        <h2 class="layer-title">Managing it — and the emergency inside it</h2>
        <div class="layer-body">
          <p>Treatment is <strong>cause-directed</strong>, plus vigilant management of the complications that actually kill people.</p>
          <div class="fact-grid">
            <div class="fact-item">
              <div class="fact-dot"></div>
              <div class="fact-text"><strong>By bucket:</strong> pre-renal → restore perfusion with <em>IV isotonic fluids</em> and stop nephrotoxins. Post-renal → relieve the obstruction (catheter, nephrostomy). ATN → supportive; avoid further insults; most tubules recover over days–weeks.</div>
            </div>
            <div class="fact-item amber-border">
              <div class="fact-dot amber"></div>
              <div class="fact-text"><strong>Stop the offenders:</strong> hold NSAIDs, ACEi/ARBs, and renally-cleared or nephrotoxic drugs. Dose-adjust everything to the current GFR. Diuretics do <em>not</em> treat AKI — they only manage volume overload once the patient is filled.</div>
            </div>
            <div class="fact-item blue-border">
              <div class="fact-dot blue"></div>
              <div class="fact-text"><strong>Hyperkalaemia is the emergency.</strong> With ECG changes (peaked T waves → widened QRS), give <em>IV calcium gluconate first</em> to stabilise the myocardium, then <em>insulin + glucose</em> (± salbutamol) to shift K⁺ into cells, then remove it (diuresis, K⁺-binder, or dialysis).</div>
            </div>
            <div class="fact-item purple-border">
              <div class="fact-dot purple"></div>
              <div class="fact-text"><strong>Dialysis indications — "AEIOU":</strong> <em>A</em>cidosis (refractory), <em>E</em>lectrolytes (refractory hyperkalaemia), <em>I</em>ngestions (dialysable toxins), <em>O</em>verload (refractory pulmonary oedema), <em>U</em>raemia (pericarditis, encephalopathy).</div>
            </div>
          </div>
          <div class="fa-ref">📖 FA p.590–592 — AKI management + Hyperkalaemia FA p.585</div>
        </div>
      </div>
      <div class="micro-check">
        <div class="micro-q">AKI with K⁺ 6.9 and peaked T waves on ECG. What is the FIRST drug you give?</div>
        <div class="micro-opts">
          <button class="micro-btn" onclick="microAns(this, false)">Insulin with dextrose</button>
          <button class="micro-btn" onclick="microAns(this, true)">IV calcium gluconate</button>
          <button class="micro-btn" onclick="microAns(this, false)">Oral potassium binder (resin)</button>
        </div>
        <div class="micro-ans" id="micro-ans-2">Correct. When there are ECG changes, calcium gluconate comes first — it stabilises the cardiac membrane within minutes (it does not lower K⁺). Only then do you shift K⁺ intracellularly with insulin + glucose (± salbutamol), and finally remove it with a binder, diuresis, or dialysis.</div>
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
      vitals: [{ l: 'BP', v: '118/74', n: false, w: false }, { l: 'HR', v: '92', n: false, w: true }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '98%', n: false, w: false }, { l: 'Temp', v: '37.0°C', n: false, w: false }],
    },
    moderate: {
      label: 'Moderate', cls: 'sev-moderate', twist: null,
      vitals: [{ l: 'BP', v: '104/66', n: false, w: true }, { l: 'HR', v: '108', n: false, w: true }, { l: 'RR', v: '18', n: false, w: false }, { l: 'SpO₂', v: '97%', n: false, w: false }, { l: 'Temp', v: '37.1°C', n: false, w: false }],
    },
    severe: {
      label: 'Severe', cls: 'sev-severe',
      twist: 'Bedside labs are back: K⁺ 6.9 mmol/L, and the monitor shows tall peaked T waves. This is a hyperkalaemic emergency — protect the heart before anything else.',
      vitals: [{ l: 'BP', v: '88/58', n: true, w: false }, { l: 'HR', v: '120', n: true, w: false }, { l: 'RR', v: '22', n: false, w: true }, { l: 'SpO₂', v: '96%', n: false, w: false }, { l: 'Temp', v: '36.8°C', n: false, w: false }],
    },
    atypical: {
      label: 'Atypical', cls: 'sev-atypical',
      twist: 'Atypical presentation — the wife adds he has passed almost no urine for a day and has a long history of a weak, hesitant stream. His lower abdomen feels full and tender. Do not anchor on dehydration — exclude obstruction first.',
      vitals: [{ l: 'BP', v: '146/88', n: false, w: true }, { l: 'HR', v: '84', n: false, w: false }, { l: 'RR', v: '16', n: false, w: false }, { l: 'SpO₂', v: '98%', n: false, w: false }, { l: 'Temp', v: '37.0°C', n: false, w: false }],
    },
  },

  questions: {
    history: {
      label: 'Taking History',
      stem: 'His creatinine is up sharply from a normal baseline. What is the single most important line of history right now?',
      fa: 'FA p.587 — AKI history: volume losses, nephrotoxic drugs, and urinary symptoms sort pre/intra/post',
      opts: [
        { t: 'Fluid losses and intake over the last few days, plus every new or regular medication — NSAIDs, ACE inhibitors, recent contrast', type: 'correct',
          fb_title: 'Correct — this sorts the three buckets at once.',
          fb: 'Vomiting and poor intake point straight at pre-renal hypovolaemia, and NSAID + ACE inhibitor use is the "triple whammy" that strips renal autoregulation. Medication and volume history is the highest-yield question in any AKI and immediately shapes management.' },
        { t: 'Any change in his urinary stream, hesitancy, or a sudden drop in urine volume', type: 'near',
          fb_title: 'Good — this screens for obstruction.',
          fb: 'Obstructive symptoms (hesitancy, poor stream, anuria) are important and must be asked — post-renal AKI is so reversible you never want to miss it. But given the clear volume losses and nephrotoxic meds, the fluid-and-drug history is the higher-yield opening line.' },
        { t: 'A detailed family history of polycystic kidney disease', type: 'wrong',
          fb_title: 'Not the acute priority.',
          fb: 'Hereditary kidney disease matters for chronic risk, but this is an acute rise in creatinine from a normal baseline with obvious volume losses and nephrotoxic drugs. Family history will not change today\'s management.' },
        { t: 'His usual dietary protein and salt intake', type: 'wrong',
          fb_title: 'Low yield here.',
          fb: 'Diet is relevant to chronic kidney disease management, not to working up an acute drop in GFR. You need the acute drivers — volume status and nephrotoxins — first.' },
      ],
    },
    exam: {
      label: 'Physical Examination',
      stem: 'What examination will most change your immediate reasoning?',
      fa: 'FA p.587 — Volume status + a palpable bladder separate pre-renal from post-renal at the bedside',
      opts: [
        { t: 'Volume status — mucous membranes, JVP, skin turgor, orthostatic BP — and palpate/percuss for a distended bladder', type: 'correct',
          fb_title: 'Exactly the two questions the exam should answer.',
          fb: 'Volume status tells you whether this is pre-renal (dry: flat JVP, dry mucosa, postural drop) and a distended bladder flags post-renal obstruction. Together they triage pre- vs post-renal at the bedside before any lab returns.' },
        { t: 'A focused search for peripheral oedema', type: 'near',
          fb_title: 'Useful, but incomplete on its own.',
          fb: 'Oedema informs volume status and points toward cardiorenal or nephrotic pictures, but on its own it does not distinguish the buckets. You need the full volume assessment plus a bladder check to move your reasoning.' },
        { t: 'Fundoscopy for hypertensive retinopathy', type: 'wrong',
          fb_title: 'Not the priority in acute AKI.',
          fb: 'Fundoscopy has a role in malignant hypertension or diabetic assessment, but it will not localise this acute kidney injury or change your immediate fluids-versus-obstruction decision.' },
        { t: 'A full neurological examination', type: 'wrong',
          fb_title: 'Not the first-line exam here.',
          fb: 'A neuro exam matters if you suspect uraemic encephalopathy, but the immediate question is volume status and obstruction. Anchoring on the nervous system delays the assessment that actually sorts the diagnosis.' },
      ],
    },
    labs: {
      label: 'Ordering Labs',
      stem: 'Beyond the basic metabolic panel, which single test best CATEGORISES the AKI?',
      fa: 'FA p.588 — Urinalysis with microscopy + FENa distinguish pre-renal, ATN, AIN, and GN',
      opts: [
        { t: 'Urinalysis with microscopy plus urine electrolytes for the FENa', type: 'correct',
          fb_title: 'This is the categorising test.',
          fb: 'FENa &lt; 1% with a bland sediment says pre-renal; FENa &gt; 2% with muddy-brown granular casts says ATN; RBC casts say glomerulonephritis; WBC casts and eosinophils say AIN. No other single test partitions the diagnosis like the urine does.' },
        { t: 'A basic metabolic panel for creatinine and potassium', type: 'near',
          fb_title: 'Essential — but it confirms AKI, it doesn\'t localise it.',
          fb: 'You must have the BMP: it defines the AKI and catches dangerous hyperkalaemia. But a rising creatinine and K⁺ tell you the kidney is failing, not why. The urine studies are what sort pre- from intra- from post-renal.' },
        { t: 'Creatine kinase (CK)', type: 'near',
          fb_title: 'Targeted — only if you suspect rhabdomyolysis.',
          fb: 'CK is the right call when pigment nephropathy is on the table (a found-down patient, a positive dipstick for blood with no red cells). Here there is no such trigger, so it is a directed test rather than the categorising one.' },
        { t: 'A 24-hour urine protein collection', type: 'wrong',
          fb_title: 'Wrong setting and too slow.',
          fb: 'Quantifying proteinuria matters in chronic kidney disease and glomerular workups, not in the acute triage of AKI. It takes a day to collect and will not guide your immediate management.' },
      ],
    },
    imaging: {
      label: 'Imaging',
      stem: 'You want to exclude obstruction and assess the kidneys. What is the correct first study?',
      fa: 'FA p.589 — Renal ultrasound: detects hydronephrosis and kidney size, no contrast load',
      opts: [
        { t: 'Renal ultrasound', type: 'correct',
          fb_title: 'Correct — safe, fast, and answers the question.',
          fb: 'Ultrasound detects hydronephrosis (post-renal obstruction) and shows kidney size — small echogenic kidneys would suggest chronic disease rather than acute injury. It uses no contrast and adds no nephrotoxic insult, making it the first-line structural test in AKI.' },
        { t: 'CT abdomen with IV contrast', type: 'wrong',
          fb_title: 'Adds a nephrotoxin to a failing kidney.',
          fb: 'Iodinated IV contrast risks contrast-associated nephropathy in an already injured kidney and is the wrong first move. If cross-sectional detail is truly needed, a non-contrast CT (e.g. for stones) is preferred — but ultrasound answers the obstruction question first.' },
        { t: 'Bladder scan for post-void residual', type: 'near',
          fb_title: 'Helpful for obstruction — but narrower than ultrasound.',
          fb: 'A bladder scan quickly flags lower-tract obstruction (e.g. BPH with retention) and is a reasonable bedside adjunct. But renal ultrasound covers the upper tracts and kidney size too, so it is the more complete first study.' },
        { t: 'Renal biopsy', type: 'wrong',
          fb_title: 'Not a first-line test.',
          fb: 'Biopsy is reserved for intrinsic AKI that stays unexplained after non-invasive workup — suspected rapidly progressive glomerulonephritis or vasculitis. It is never the opening structural study in undifferentiated AKI.' },
      ],
    },
    treat: {
      label: 'Treatment',
      stem: 'Diagnosis confirmed: pre-renal AKI from hypovolaemia, compounded by an NSAID and an ACE inhibitor, sediment bland and FENa &lt; 1%. What is the correct management?',
      fa: 'FA p.590 — Pre-renal AKI: restore perfusion, remove nephrotoxins, monitor K⁺',
      opts: [
        { t: 'Restore perfusion with IV isotonic crystalloid, stop the NSAID and hold the ACE inhibitor, and monitor urine output and potassium', type: 'correct',
          fb_title: 'Correct — treat the cause, remove the insults.',
          fb: 'Pre-renal AKI reverses when you refill the tank: isotonic fluids restore renal perfusion, and stopping the NSAID and ACE inhibitor removes the two drugs blocking autoregulation. Close monitoring of urine output and potassium guards against overload and hyperkalaemia as the kidney recovers.' },
        { t: 'Give IV furosemide to force urine output', type: 'wrong',
          fb_title: 'Wrong — diuretics do not treat pre-renal AKI.',
          fb: 'The problem is under-perfusion; a diuretic worsens hypovolaemia and can deepen the injury. Diuretics only manage established volume overload after the patient is adequately filled — they never "flush out" AKI or improve outcomes.' },
        { t: 'Give IV fluids but continue all of his home medications unchanged', type: 'near',
          fb_title: 'Half right — you missed the nephrotoxins.',
          fb: 'Fluids are correct, but continuing the NSAID and ACE inhibitor leaves the two drugs crippling renal autoregulation in place. You have to both restore perfusion and remove the offending agents, then dose-adjust everything to the current GFR.' },
        { t: 'Start urgent haemodialysis', type: 'wrong',
          fb_title: 'Not indicated here.',
          fb: 'Dialysis is for the refractory complications — the AEIOU list (acidosis, refractory hyperkalaemia, ingestions, refractory overload, uraemia). This patient has reversible pre-renal AKI that should respond to fluids and drug withdrawal, so dialysis is premature.' },
      ],
    },
  },

  ddx: [
    { name: 'Pre-renal Acute Kidney Injury', correct: true,
      reason: '✓ Confirmed. Days of vomiting and poor intake + hypovolaemic signs + NSAID and ACE inhibitor use + BUN:Cr &gt; 20:1, FENa &lt; 1%, concentrated urine and a bland sediment = pre-renal azotaemia. It responds to fluids and withdrawal of the offending drugs.' },
    { name: 'Acute Tubular Necrosis', correct: false,
      reason: '✗ Ruled out. ATN would show FENa &gt; 2%, urine Na &gt; 40, isosthenuric urine and muddy-brown granular casts, and would NOT respond to fluids. Here the indices and sediment are pre-renal — though untreated pre-renal ischaemia can progress to ATN, which is why perfusion is restored quickly.' },
    { name: 'Post-renal (Obstructive) AKI', correct: false,
      reason: '✗ Ruled out. No hydronephrosis on ultrasound and no distended bladder, with a clear pre-renal picture. Obstruction is always actively excluded because it is so reversible, but the imaging and exam are clean here.' },
    { name: 'Acute Interstitial Nephritis', correct: false,
      reason: '✗ Ruled out. AIN is a drug-induced hypersensitivity nephritis with fever, rash, WBC casts and urine eosinophils. This patient has neither the allergic features nor the sediment — the urine is bland and the story is volume loss, not a hypersensitivity reaction.' },
    { name: 'Chronic Kidney Disease', correct: false,
      reason: '✗ Ruled out. The creatinine rose acutely from a documented normal baseline, the kidneys are normal-sized on ultrasound, and there is no anaemia or the metabolic stigmata of chronic disease. This is acute, not chronic, kidney injury.' },
  ],

  teaching: [
    'Every AKI sorts into pre-renal, intrinsic, or post-renal — read it from volume status, the urine (FENa + sediment), and a renal ultrasound.',
    'Pre-renal: BUN:Cr > 20:1, FENa < 1%, urine Na < 20, concentrated urine, bland sediment — and it responds to fluids.',
    'ATN: FENa > 2%, urine Na > 40, isosthenuria, and muddy-brown granular casts — and it does NOT respond to fluids.',
    'The "triple whammy": volume depletion + an NSAID (blocks afferent dilation) + an ACE inhibitor/ARB (blocks efferent constriction) collapses GFR.',
    'Always get a renal ultrasound to exclude obstruction, and avoid IV contrast and nephrotoxins in a failing kidney.',
    'Hyperkalaemia is the most immediately life-threatening complication: with ECG changes, give IV calcium gluconate FIRST to stabilise the myocardium, then shift K⁺ with insulin + glucose (± salbutamol), then remove it.',
    'Dialysis indications = AEIOU: refractory Acidosis, refractory Electrolytes (hyperkalaemia), Ingestions, refractory Overload, and Uraemia (pericarditis/encephalopathy).',
  ],
};
