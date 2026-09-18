# Cliniq

**A free clinical-reasoning simulator for USMLE Step 1, built for IMGs.**
Built by Dr. Abhinay Poludasu.

🌐 Live: [1witttdoctor.github.io/Cliniq](https://1witttdoctor.github.io/Cliniq)

---

## What is Cliniq?

Most question banks test whether you can recognise an answer. Cliniq tests
whether you can work a patient. You are handed someone in front of you, you
decide what to ask, examine, order and treat, and the patient responds to
what you chose.

Each topic runs in three stages:

- **Learn** — the concept in layers, from physiology through to management
- **Case** — a live patient on a monitor: take a history, examine, order
  investigations, build a differential, then treat. You choose the order;
  there is no fixed path through a patient.
- **Review** — walk the case back order by order, with every option
  explained (not just the one you picked), and a table setting the correct
  diagnosis against the one most easily confused with it.

The patient can deteriorate. Pressure builds from the decisions you make,
never from how long you take — reading carefully is never punished. Some
orders harm the patient outright: uncontrolled oxygen in a CO₂ retainer,
a beta-blocker in acute decompensation, thrombolysis into an uncontrolled
blood pressure, a large-volume tap without albumin cover.

---

## Topics available

| System | Topic |
|---|---|
| Neurology | Acute ischaemic stroke |
| Respiratory | COPD exacerbation |
| Respiratory | Pulmonary embolism |
| Cardiology | Acute decompensated heart failure |
| Cardiology | Acute coronary syndrome |
| Hepatology | Decompensated cirrhosis |
| Renal | Acute kidney injury |

Each runs in four presentations — mild, moderate, severe and atypical — so
the same topic is a different patient each time.

Every organ on the home page now has a case behind it. Endocrine and
gastroenterology are next.

---

## How it is built

A static site. No backend, no accounts, no build step, no dependencies —
plain HTML, CSS and JavaScript served from GitHub Pages. It stays free
because there is nothing to run.

```
index.html          the shell and every screen
css/style.css       design tokens and layout
js/icons.js         the line-icon set (no emoji anywhere)
js/app.js           navigation and the case engine
js/topics/*.js      one file per topic — all the medicine lives here
```

Adding a topic means adding one file to `js/topics/` and one `<script>` tag.
Icons are matched to orders by wording, so new cases need no icon authoring.
The full schema and house rules are in
[docs/WRITING-A-CASE.md](docs/WRITING-A-CASE.md).

Progress is kept in `localStorage` on your own device. Nothing is uploaded
and there is nothing to sign up for.

---

## On the medicine

Cases are written from primary sources — GOLD, KDIGO, AHA/ACC, NICE and
StatPearls among them — and are original constructions, not reproductions of
any question bank or review book. They teach the concept being tested rather
than pointing at a page number.

This is an educational tool for exam preparation. It is not clinical
decision support and must not be used to treat anyone.

---

## License

This project is **free to use** for personal and educational purposes.

It is **not open source.** You may not modify, redistribute, or build upon
this work.

Licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)
© 2025 Dr. Abhinay Poludasu

---

> Independent educational tool. Not affiliated with any publisher or
> licensing body.
