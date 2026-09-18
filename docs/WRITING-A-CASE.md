# Writing a Cliniq case

Everything a topic needs lives in one file at `js/topics/<id>.js`. The engine
never changes. If you find yourself wanting to edit `js/app.js` to make a topic
work, the topic is wrong, not the engine.

---

## Non-negotiables

1. **Free forever, static, no backend.** No build step, no npm, no framework,
   no server. Plain files served from GitHub Pages.
2. **Never copy from UWorld, AMBOSS or First Aid.** Cases are original
   constructions written from primary sources: GOLD, KDIGO, AHA/ACC/HFSA,
   AHA/ASA, NICE, ATS/ERS, StatPearls. Teach the concept, never reproduce
   someone else's question.
3. **No page-number citations.** Every question carries a `concept` line naming
   the principle being tested. That is what transfers; a page number is not.
4. **No emoji anywhere.** All iconography comes from `js/icons.js`. If you need
   a glyph that does not exist, add it there as an SVG path.
5. **It must not read as a quiz.** It is a clinical instrument.
6. **British English**, and `prefers-reduced-motion` respected.

---

## The file

```js
// ────────────────────────────────────────────────
// TOPIC: <Title>  (<System> · Topic NN)
// ────────────────────────────────────────────────
window.TOPICS = window.TOPICS || {};

window.TOPICS['<kebab-id>'] = {
  id: '<kebab-id>',
  number: 5,
  system: 'Neurology',          // must match a system in REGIONS (js/app.js)
  title: 'Acute Ischaemic Stroke',
  navMeta: 'Neurology · Acute Ischaemic Stroke',
  desc: 'Two or three sentences. What the topic is and what it makes you do.',
  tags: [
    { label: 'Neurology',           cls: 'tag-cardio' },
    { label: 'Time-critical',       cls: 'tag-pharma' },
    { label: 'Vascular',            cls: 'tag-renal'  },
    { label: 'High-yield · Step 1', cls: 'tag-fa'     },
  ],

  patient: {
    name: 'Mrs. Leela Nair',
    meta: '71F · AF (not anticoagulated), HTN · Brought by her son',
    cc: '"Her own words, in quotation marks."',
    inspection: 'What you see from the end of the bed, in one or two sentences.',
  },

  layers: [ /* three, see below */ ],

  severities: ['mild', 'moderate', 'severe', 'atypical'],
  sevConf: { /* one entry per severity, see below */ },
  questions: { /* history, exam, labs, imaging, treat */ },
  contrast: { /* see below */ },
  takeaway: 'One paragraph tying the contrast table together.',
  ddx: [ /* five, exactly one correct */ ],
  teaching: [ /* six to eight standalone sentences */ ],
};
```

Register it with one line in `index.html`, above `js/app.js`:

```html
<script src="js/topics/<kebab-id>.js"></script>
```

That is the whole integration. There is nothing else to wire.

---

## Learn: three layers of typed blocks

A layer is `{ kicker, title, blocks }`. The `kicker` is one word for the left
rail — Physiology, Clinical, Management, Framework, Localising. Layers should
build on each other: if layer 3 does not depend on layer 2, it is a chapter
rather than a layer.

Five block kinds. Inline `<strong>` and `<em>` are allowed in text fields;
`<em>` renders as the accent colour.

```js
{ k: 'text',  t: 'A paragraph.' }

{ k: 'point', t: 'The claim, as a sentence',
              d: 'The explanation.',
              hi: true }              // hi = accent the left rule; use sparingly

{ k: 'chain', t: 'Caption for the sequence',
              steps: ['First', 'Then', 'Then', 'Finally'] }

{ k: 'compare',
  a: { h: 'Left column heading',  items: ['…', '…'] },
  b: { h: 'Right column heading', items: ['…', '…'] } }

{ k: 'check',
  q: 'A question the learner commits to before reading on.',
  opts: [ { t: 'Wrong but tempting' },
          { t: 'Right', ok: true },
          { t: 'Wrong for a different reason' } ],
  why: 'Why the right one is right AND why each wrong one was tempting.' }
```

**Use `chain` whenever the content is causal.** Most of these topics are a
sequence — output falls, RAAS activates, preload rises, the ventricle stiffens.
Rendering that as bullets loses the arrow, which was the lesson.

**One `check` per layer, at the end.** The grammar is commit first, then
explain. Never explain first and quiz afterwards.

---

## Severities

Four presentations of the same disease. `mild` and `moderate` have
`twist: null`. `severe` and `atypical` carry a `twist` string that appears in
the findings log if the patient deteriorates.

```js
sevConf: {
  moderate: {
    label: 'Established deficit',
    cls: 'sev-moderate',            // sev-mild | sev-moderate | sev-severe | sev-atypical
    twist: null,
    vitals: [
      { l: 'BP',   v: '176/96', n: false, w: true  },
      { l: 'HR',   v: '98',     n: false, w: false },
      { l: 'RR',   v: '18',     n: false, w: false },
      { l: 'SpO₂', v: '95',     n: false, w: false },
      { l: 'Temp', v: '36.8',   n: false, w: false },
    ],
  },
}
```

- `l` must be exactly one of `BP`, `HR`, `RR`, `SpO₂`, `Temp`. Units are added
  by the engine — write the number only, not `95%` or `36.8°C`.
- `n: true` renders red (critical). `w: true` renders amber (abnormal). Both
  false renders white.
- `atypical` must be a genuinely different patient, not a milder one. A
  posterior-circulation stroke, a silent MI, an afebrile infection.

---

## Questions

Exactly five keys: `history`, `exam`, `labs`, `imaging`, `treat`. Four options
each: one `correct`, one or two `near`, the rest `wrong`.

```js
history: {
  label: 'Taking History',
  concept: 'Concept — the principle this question tests, in one sentence.',
  stem: 'The question.',
  opts: [
    { t: 'The order itself',
      d: 'What this order is, clinically neutral — never hint at whether it is right.',
      type: 'correct',
      fb_title: 'A short verdict.',
      fb: 'Why, at length. Two to four sentences.' },

    { t: 'A tempting wrong order',
      d: 'What it is.',
      type: 'wrong',
      harm: 'What happens to the patient, if this order actively harms them.',
      fb_title: 'DANGEROUS — a short verdict.',
      fb: 'Why it is wrong and why it was tempting.' },
  ],
},
```

- `d` describes what the order **is**, never how good it is. "Measures cardiac
  biomarker for myocardial injury", not "the best test here".
- `fb` is written for every option, not just the correct one. The near miss is
  usually where the learning is — say why it was tempting.
- `harm` is optional and rare. Use it only when the order actively injures the
  patient: uncontrolled oxygen in a CO₂ retainer, a beta-blocker in acute
  decompensation, thrombolysis into an uncontrolled blood pressure. An option
  with `harm` deteriorates the patient immediately, and the string is written
  into the findings log as a clinical observation.
- Icons are chosen automatically from the wording of `t` (see `ICON_RULES` in
  `js/app.js`). You do not author icons. If an order gets a poor glyph, add a
  rule there rather than an `ic` field.

---

## Contrast table and takeaway

Set the correct diagnosis against **the one most easily confused with it** —
not the most dangerous, the most *confusable*. Eight rows, on the features that
genuinely separate them.

```js
contrast: {
  a: 'Ischaemic stroke',
  b: 'Intracerebral haemorrhage',
  rows: [
    { f: 'Onset', a: 'Sudden, often maximal at onset', b: 'Sudden, may worsen over hours' },
  ],
},
takeaway: 'One paragraph on what actually separates them.',
```

If a row is "no reliable difference", say so. That is often the teaching point.

---

## Differential and teaching points

Five diagnoses, exactly one with `correct: true`. Each `reason` begins with
`✓ Confirmed.` or `✗ Ruled out.` and explains against *this patient's* findings.

```js
ddx: [
  { name: 'Acute Ischaemic Stroke', correct: true,
    reason: '✓ Confirmed. …' },
  { name: 'Hypoglycaemia', correct: false,
    reason: '✗ Ruled out by the capillary glucose. …' },
],
```

`teaching` is six to eight sentences, each standing alone out of context. These
are what a learner screenshots.

---

## Before you call it done

```bash
node --check js/topics/<kebab-id>.js
cd /path/to/Cliniq && python3 -m http.server 8801
```

Then drive it headlessly and confirm the flow completes at every severity with
no console errors:

```js
selectTopic('<kebab-id>');
startLearn(); [0,1,2].forEach(i => renderLayer(i));
startCase('moderate');
['history','exam','labs','imaging'].forEach(t => { openQ(t); pickOpt(t, 0); });
openDDx(); window.TOPICS['<kebab-id>'].ddx.forEach((d, i) => pickDDx(i, !!d.correct));
openQ('treat'); pickOpt('treat', 0);
showReview();
```

Check at 1440×900 and at 390×844. Perfect play should score 150 and grade S.

**Then have a clinician read the medicine.** The engine cannot tell you whether
"ask about chest pain before pillows" is the right teaching priority. That is a
judgement, not a fact with a citation, and it is the one thing no amount of
testing will catch.
