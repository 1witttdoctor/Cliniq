# Cliniq
# Cliniq

**Learn medicine. Think clinically.**

An AI-powered clinical reasoning tool for USMLE Step 1 — free, open source, built for IMGs worldwide.

Built by **Dr. Abhinay Poludasu** · [github.com/1witttdoctor](https://github.com/1witttdoctor)

---

## What it does

Most medical students read First Aid passively. Cliniq makes you use it actively.

**Learn Mode** — walk through any topic layer by layer:
- Normal physiology → what goes wrong → what you see clinically → how you diagnose it → how you treat it
- Each layer has a micro-check to activate recall before you move on
- Skip any layer if you already know it

**Case Mode** — a patient walks in:
- You see only the chief complaint and vitals
- Action buttons: History, Examine, Labs, Imaging, Diagnose, Treat
- 4 options per action — choose what to do next
- Severity randomizer: mild / moderate / severe / atypical presentation every time
- No points shown during the case — just clinical decisions

**Review Mode** — full debrief after every case:
- Every decision you made, explained
- Every DDx ruling with the distinguishing feature
- High-yield teaching points mapped to the topic

---

## Why I built this

12,000+ IMGs apply for US residency every year. Most cannot afford $400+ question banks.

Passive reading of review books does not build clinical reasoning. You need to apply knowledge to patients — repeatedly, with feedback, with randomization so you never see the same case twice.

Cliniq is free, runs locally with no server, and will cover all major Step 1 systems as it grows.

---

## Current coverage

- [x] Cardiology — Heart Failure (complete: Learn + Case + Review)
- [ ] Cardiology — Arrhythmias (in progress)
- [ ] Cardiology — ACS
- [ ] Renal — AKI / CKD
- [ ] Pharmacology — Cardiovascular drugs
- [ ] And more — one topic per week

---

## How to use

**Option 1 — Live demo (no install):**
Open in any browser: [1witttdoctor.github.io/Cliniq](https://1witttdoctor.github.io/Cliniq)

**Option 2 — Run locally:**
Download `index.html` → open in Chrome. That's it. No server, no dependencies, no account.

---

## Built with

- Vanilla HTML / CSS / JavaScript — zero dependencies
- Anthropic Claude API (for dynamic case generation — coming in v0.2)
- GitHub Pages for free hosting

---

## Roadmap

**v0.1 (now)** — Static prototype, Heart Failure case, full Learn + Case + Review flow

**v0.2** — Claude API integration for AI-generated case variants, never repeating

**v0.3** — PWA conversion — installable as desktop app, works offline

**v1.0** — All 18 Step 1 systems covered, spaced repetition, progress tracking

---

## License

MIT — free to use, free to build on, free forever.

---

## Contribute

If you're a medical student, doctor, or developer who wants to help add topics — open an issue or PR. Every topic added helps another IMG.

---

*Cliniq is an independent educational tool. Not affiliated with any publisher or licensing body.*
