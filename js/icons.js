/* ──────────────────────────────────────────────────────────────
   Cliniq — icon set
   Hand-drawn line icons on a 24×24 grid, 1.5 stroke, round caps.
   No emoji anywhere in this project; everything visual comes
   from here. Add a new glyph by adding a key below.
   ────────────────────────────────────────────────────────────── */

window.ICONS = {

  // ── examination & bedside ──
  stethoscope: `
    <path d="M6 3v4.5a5 5 0 0 0 10 0V3"/>
    <path d="M4.6 3h2.8M14.6 3h2.8"/>
    <path d="M11 12.6V16a4 4 0 0 0 8 0v-1.4"/>
    <circle cx="19" cy="12.4" r="2.2"/>`,

  cuff: `
    <rect x="2.4" y="6.8" width="8.2" height="9" rx="1.4"/>
    <path d="M5.7 6.8v9"/>
    <path d="M10.6 9.2h2.7"/>
    <circle cx="17.1" cy="9.2" r="3.8"/>
    <path d="M17.1 7.3v1.9l1.4 1"/>
    <path d="M10.6 13.8c3.2 0 4.9 1.3 5.3 3.3"/>
    <ellipse cx="17.6" cy="18.5" rx="2.2" ry="2.7"/>`,

  // ── labs ──
  tube: `
    <path d="M8.5 6.5v11.4a3.5 3.5 0 0 0 7 0V6.5"/>
    <rect x="8" y="2.9" width="8" height="3.6" rx="0.8"/>
    <path d="M10.2 3.3v2.8M12 3.3v2.8M13.8 3.3v2.8"/>
    <path d="M8.5 13.4h7"/>`,

  microscope: `
    <path d="M13.4 3.4 17.1 7.1l-4.4 4.4a2.6 2.6 0 0 1-3.7-3.7z"/>
    <path d="M15.1 1.7 18.8 5.4"/>
    <path d="M11 12.6a6.5 6.5 0 0 0 5.6 6.3"/>
    <path d="M4.6 13.8h5.2"/>
    <path d="M7.2 13.8v5.1"/>
    <path d="M3.9 18.9h13"/>`,

  droplet: `
    <path d="M12 3.2c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z"/>`,

  // ── imaging ──
  xray: `
    <rect x="3.5" y="3" width="17" height="18" rx="2"/>
    <path d="M12 5.8v12.4"/>
    <path d="M12 8.4q3.4 0 4.8 1.9M12 8.4q-3.4 0-4.8 1.9"/>
    <path d="M12 11.8q3.2 0 4.5 1.8M12 11.8q-3.2 0-4.5 1.8"/>
    <path d="M12 15.2q2.8 0 4 1.7M12 15.2q-2.8 0-4 1.7"/>`,

  ct: `
    <circle cx="12" cy="10.2" r="7.8"/>
    <circle cx="12" cy="10.2" r="3.2"/>
    <path d="M3.2 17.4h17.6"/>
    <path d="M6.4 17.4V21M17.6 17.4V21"/>`,

  ultrasound: `
    <path d="M5.8 9.2a6.4 6.4 0 0 1 12.4 0"/>
    <path d="M8.4 10.7a3.8 3.8 0 0 1 7.2 0"/>
    <path d="M8.2 12.8h7.6l-1.1 4a2.7 2.7 0 0 1-2.6 1.9h-.2a2.7 2.7 0 0 1-2.6-1.9z"/>
    <path d="M12 18.7v1.1c0 1.2-1.8 1.3-1.8 2.4"/>`,

  // ── cardiac ──
  ecg: `
    <path d="M2 13h3.4q1-2.6 2 0H9l.8 2.6L11 4.5l1.3 11.6.9-3.1h1.9q1.5-3.4 3 0H22"/>`,

  heart: `
    <path d="M12 20.4s-7.5-4.6-7.5-9.7A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 3.1c0 5.1-7.5 9.7-7.5 9.7z"/>`,

  // ── respiratory ──
  lungs: `
    <path d="M12 3.6v6.8"/>
    <path d="m12 10.4-2.6-2M12 10.4l2.6-2"/>
    <path d="M9.4 8.4c-3.1.8-5.3 4.5-5.3 8.4 0 2.1 1 3.6 2.8 3.6s3.3-1.5 3.3-3.6z"/>
    <path d="M14.6 8.4c3.1.8 5.3 4.5 5.3 8.4 0 2.1-1 3.6-2.8 3.6s-3.3-1.5-3.3-3.6z"/>`,

  oxygen: `
    <path d="M5.4 7.4c0-.9.7-1.6 1.6-1.6h10c.9 0 1.6.7 1.6 1.6v3.2c0 3.7-3 6.8-6.6 6.8s-6.6-3.1-6.6-6.8z"/>
    <path d="M5.4 8.6H3.6a1.1 1.1 0 0 0-1.1 1.1v1.6a1.1 1.1 0 0 0 1.1 1.1h1.8"/>
    <path d="M18.6 8.6h1.8a1.1 1.1 0 0 1 1.1 1.1v1.6a1.1 1.1 0 0 1-1.1 1.1h-1.8"/>
    <rect x="10.7" y="11.6" width="2.6" height="3.4" rx="1.1"/>
    <path d="M12 17.4v4"/>`,

  // ── treatment ──
  pill: `
    <g transform="rotate(-45 12 12)">
      <rect x="2.6" y="8.5" width="18.8" height="7" rx="3.5"/>
      <path d="M12 8.5v7"/>
    </g>`,

  iv: `
    <circle cx="12" cy="2.9" r="1.2"/>
    <path d="M12 4.1v1.4"/>
    <rect x="6.2" y="5.3" width="11.6" height="11.6" rx="1.8"/>
    <path d="M14.6 8h1.4M14.6 10.2h1.4M14.6 12.4h1.4"/>
    <path d="M12 16.9v1.2"/>
    <rect x="10.6" y="18.1" width="2.8" height="2" rx="0.5"/>
    <path d="M12 20.1c0 1.7 2.8 1.2 2.8 2.6"/>`,

  syringe: `
    <g transform="rotate(-40 12 12)">
      <rect x="6" y="9.5" width="10" height="5" rx="0.6"/>
      <path d="M16 12h5.2"/>
      <path d="M6.6 8.9v6.2"/>
      <path d="M6 12H2.7"/>
      <path d="M2.7 10v4"/>
      <path d="M9.2 10.6v1.3M11 10.6v1.3M12.8 10.6v1.3"/>
    </g>`,

  // ── reasoning & chrome ──
  clipboard: `
    <rect x="4.5" y="4.4" width="15" height="16.6" rx="2"/>
    <rect x="8.5" y="2.6" width="7" height="3.6" rx="1.2"/>
    <circle cx="12" cy="2.6" r="0.9"/>
    <path d="M8 11h8M8 14h8M8 17h5"/>`,

  branch: `
    <circle cx="4.5" cy="12" r="1.9"/>
    <circle cx="19.2" cy="5.2" r="1.9"/>
    <circle cx="19.2" cy="12" r="1.9"/>
    <circle cx="19.2" cy="18.8" r="1.9"/>
    <path d="M6.4 12h3.1"/>
    <path d="M9.5 12V6.2a1 1 0 0 1 1-1h6.8"/>
    <path d="M9.5 12h7.8"/>
    <path d="M9.5 12v5.8a1 1 0 0 0 1 1h6.8"/>`,

  alert: `
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7.4v5.3"/>
    <circle cx="12" cy="16.4" r="0.95" class="ic-fill"/>`,

  chevron: `<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>`,

  check: `<path d="m4.5 12.5 5 5 10-11"/>`,

  cross: `<path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5"/>`,

  minus: `<path d="M5 12h14"/>`,
};

/* Render a glyph. `cls` lands on the <svg> so callers can size/colour it. */
function icon(name, cls) {
  const g = window.ICONS[name];
  if (!g) return '';
  return `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${g}</svg>`;
}
