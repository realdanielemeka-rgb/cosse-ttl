// Generates abstract, on-brand placeholder art (SVG) reusing the site's own
// visual language — the Acute glyph, the warm Lacquer sheen, and film grain —
// so TV-commercial and case-study media wells read as designed rather than
// empty, without fabricating any actual photography, footage, or brand marks.
//
// Deterministic (index-seeded, no Math.random()) so regenerating produces the
// same set. Run: node scripts/gen-placeholder-art.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public");

const W = 1280;
const H = 720;

// Deterministic pseudo-random in [0,1) from a seed.
function rand(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function acuteGlyph(seed, i, { focal = false } = {}) {
  const s = seed * 97 + i * 13.7;
  const size = focal ? 640 + rand(s + 1) * 420 : 260 + rand(s + 1) * 380;
  // Keep glyphs off the heavily-vignetted edges so every seed reads.
  const cx = W * (0.16 + rand(s + 2) * 0.68);
  const cy = H * (0.14 + rand(s + 3) * 0.7);
  const rot = rand(s + 4) * 360;
  // Desired blur in final on-screen px. The filter lives in the <g>'s local
  // (pre-scale) space, so stdDeviation must be divided back by the scale
  // factor — otherwise a "20px" blur on a 6-unit-wide line is actually a
  // filter-space blur ~3x the shape itself, which dilutes it to near nothing.
  const blurPx = focal ? 4 + rand(s + 5) * 10 : 26 + rand(s + 5) * 34;
  const op = focal ? 0.42 + rand(s + 6) * 0.23 : 0.12 + rand(s + 6) * 0.12;
  const scale = size / 12;
  const stdDev = blurPx / scale;
  const filterId = `b${seed}_${i}`;
  return {
    filter: `<filter id="${filterId}" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="${stdDev.toFixed(3)}"/></filter>`,
    glyph: `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${scale.toFixed(2)})" filter="url(#${filterId})" opacity="${op.toFixed(3)}">
      <line x1="3" y1="9" x2="9" y2="3" stroke="#FFF6E8" stroke-width="0.9" stroke-linecap="round"/>
    </g>`,
  };
}

function frame(seed, { label = "" } = {}) {
  const atmosphereCount = 2 + Math.floor(rand(seed) * 2); // 2-3
  const glyphs = [
    acuteGlyph(seed, 0, { focal: true }),
    ...Array.from({ length: atmosphereCount }, (_, i) => acuteGlyph(seed, i + 1)),
  ];
  const gradAngle = Math.floor(rand(seed + 50) * 360);
  const gx2 = 50 + 50 * Math.cos((gradAngle * Math.PI) / 180);
  const gy2 = 50 + 50 * Math.sin((gradAngle * Math.PI) / 180);
  // Base tone drifts slightly per seed so the set doesn't read as one flat swatch.
  const baseLift = 16 + Math.floor(rand(seed + 90) * 14); // 16-30

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="base_${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgb(${baseLift},${baseLift},${baseLift})"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <radialGradient id="vignette_${seed}" cx="50%" cy="46%" r="85%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
    </radialGradient>
    <linearGradient id="sheen_${seed}" x1="0%" y1="0%" x2="${gx2.toFixed(0)}%" y2="${gy2.toFixed(0)}%">
      <stop offset="0%" stop-color="#FFF6E8" stop-opacity="0.1"/>
      <stop offset="45%" stop-color="#FFF6E8" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FFF6E8" stop-opacity="0.14"/>
    </linearGradient>
    <filter id="grain_${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${seed}" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/>
    </filter>
    ${glyphs.map((g) => g.filter).join("\n    ")}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base_${seed})"/>
  ${glyphs.map((g) => g.glyph).join("\n  ")}
  <rect width="${W}" height="${H}" fill="url(#sheen_${seed})"/>
  <rect width="${W}" height="${H}" fill="url(#vignette_${seed})"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <rect width="${W}" height="${H}" filter="url(#grain_${seed})" opacity="0.5"/>
  ${label ? `<text x="40" y="${H - 36}" font-family="monospace" font-size="15" letter-spacing="2" fill="rgba(255,255,255,0.22)">${label}</text>` : ""}
</svg>`;
}

// --- TV commercial posters: 8 slots -----------------------------------
mkdirSync(join(ROOT, "commercials"), { recursive: true });
for (let i = 0; i < 8; i++) {
  const seed = 1000 + i * 37;
  const svg = frame(seed, { label: `COMMERCIAL ${String(i + 1).padStart(2, "0")}` });
  writeFileSync(join(ROOT, "commercials", `${String(i + 1).padStart(2, "0")}.svg`), svg);
}

// --- Case study execution stills: 9 cases x 3 -------------------------
mkdirSync(join(ROOT, "case-media"), { recursive: true });
const CASE_SLUGS = [
  "first-withdrawal",
  "brewed-for-the-bend",
  "count-me-in",
  "the-long-season",
  "show-up",
  "homecoming",
  "dudu",
  "lagos-loud",
  "hold-steady",
];
for (let c = 0; c < CASE_SLUGS.length; c++) {
  for (let e = 0; e < 3; e++) {
    const seed = 2000 + c * 97 + e * 17;
    const svg = frame(seed, {});
    writeFileSync(join(ROOT, "case-media", `${CASE_SLUGS[c]}-${e + 1}.svg`), svg);
  }
}

console.log("Generated 8 commercial posters + 27 case-media stills.");
