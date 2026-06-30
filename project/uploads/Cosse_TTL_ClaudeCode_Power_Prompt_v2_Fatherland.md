# Claude Code — Power Prompt v2: Cossé TTL Website (Fatherland-grounded idiom)

> This **supersedes the visual/type/motion/navigation layer** of the earlier
> (serif + brass + ripple) prompt. It keeps Cossé's strategy intact — the
> positioning, the three pages, the case-study spine, the clean-hands rules — but
> re-skins the entire experience to the **verified design language of
> fatherlandlive.com**: stark monochrome, a grotesque-plus-mono type system,
> full-bleed film on every screen, four-corner navigation, and huge, sparse,
> centered type.
>
> We are reproducing that **language with Cossé's own substance and assets** —
> not cloning their site. Do not copy Fatherland's fonts, video, logos, copy, or
> template code (see Clean-hands).

---

## What we are building
A front-end prototype of the new website for **Cossé TTL** — a Nigerian
integrated marketing communications agency (Lagos, founded 1995, formerly Bates
Cossé). It must feel like a serious film/creative studio site: cinematic,
monochrome, confident, almost austere — while still doing an agency's job of
turning attention into briefs.

## Positioning (use verbatim where copy is needed)
- **Lead line:** "Simple human truths. Total brand experiences. Since 1995."
- **Descriptor:** "We turn simple human truths into brand experiences that move people, markets and culture."
- Background note (shapes tone, not shown): "TTL" historically meant *through-the-line* — retired in favour of the only word that still matters: **Total**.
- **DNA (tone, not slogans):** heart, can-do, challenger thinking, eclectic, professional, integrity, deep consumer understanding.
- **Audiences:** returning blue-chip clients, new clients & founders, young talent, institutions & global partners.

## Scope — three pages
1. **Landing + Home** — a black cover that opens into a sparse, scene-by-scene scroll.
2. **Case Study (detail)** — the centerpiece; the seven-part spine, rendered.
3. **Work (index)** — a filterable 16:9 grid.

If scoping down: **Landing/Home + one Case Study** are the priority pair.

---

## Tech stack (exactly this)
- **Next.js (App Router) + TypeScript + Tailwind CSS.**
- **Framer Motion** (reveals, overlay menu, page transitions) + **Lenis** (smooth scroll).
- No backend. All content in a typed `src/content.ts`.
- Responsive (360 → 1440+). Semantic HTML. WCAG AA. `prefers-reduced-motion` respected.

Scaffold:
```bash
npx create-next-app@latest cosse-ttl --typescript --tailwind --app --eslint --src-dir
cd cosse-ttl && npm i framer-motion lenis
```

---

## Design system — implement as tokens FIRST

### Colour — true monochrome (this is the core of the Fatherland feel)
| Token | Value | Use |
|---|---|---|
| `black` | `#000000` | primary background |
| `near-black` | `#0A0A0A` | barely-raised surfaces |
| `grey-900` | `#141414` | panels / cards |
| `grey-800` | `#1E1E1E` | lit panels |
| `grey-mid` | `#333333` | secondary dark (Fatherland's only grey) |
| `white` | `#FFFFFF` | primary text |
| `white-75` | `rgba(255,255,255,0.75)` | **default link colour** |
| `white-40` | `rgba(255,255,255,0.40)` | active / dimmed link |
| `white-55` | `rgba(255,255,255,0.55)` | secondary text |
| `line` | `rgba(255,255,255,0.12)` | hairlines |
| `overlay-menu` | `rgba(0,0,0,0.90)` | full-screen menu background |
| `video-scrim` | `rgba(0,0,0,0.62)` | darkening layer over background video |

> **Accent toggle (OFF by default).** Fatherland uses *no* accent colour — keep it
> that way for the faithful build. If Daniel later wants a thread back to Cossé's
> deck, expose a single `--accent` (warm ink `#16130D` background or brass
> `#C9A24C` hairline) behind a one-line flag. Do not introduce it unprompted.

### Typography — grotesque + mono (NO serif)
- **Primary (display + UI): Monument Grotesk** (ABC Dinamo) — the real face. **Licensed**, so for this prototype build on the closest free equivalent, **Space Grotesk** (variable, Google Fonts), and leave a comment to swap to Monument once licensed.
- **Mono accent: Monument Grotesk Semi-Mono / Sometype Mono** (licensed) → build on **Space Mono** (Google Fonts) now. Use mono for: corner nav labels, work filters, eyebrows, credits/meta, numerals, the case-study spine markers.
- Load both via `next/font/google`.
- **Scale & rhythm (match the source):** big and tight. Section/hero headlines `clamp(2.5rem, 6vw, 6rem)`, `line-height: 1`. Body quiet. Plenty of black space.
- **Wordmark:** tracked caps — render "Cossé" as `C O S S É` (letter-spacing ~`0.35em`).
- Do **not** use a serif anywhere. (This explicitly replaces the v1 Fraunces choice.)

### No decorative motif
Fatherland has none — the film and the type carry it. Drop the ripple/orbit motif
from v1. Set surfaces apart with the grey tints + hairlines only.

---

## Global components
- **`CornerNav`** (persistent, overlaid on every page): four fixed labels in mono caps —
  - top-left: `COSSÉ` wordmark → Home
  - top-right: `MENU` → opens overlay
  - bottom-left: `START A PROJECT` → contact (this is Cossé's services CTA; it replaces Fatherland's bare "CONTACT" and must always be present)
  - bottom-right: `FOLLOW` → Instagram (placeholder link)
  - On mobile: collapse to top-left wordmark + top-right `MENU` only.
- **`OverlayMenu`**: fixed, full-screen, background `overlay-menu`. Big stacked grotesk links — `HOME / WHO WE ARE / WORK / THINKING / CONTACT` — links `white-75`, hover → `white`; `CLOSE` top-right. Reveal with a slow clip/curtain + staggered links (`~0.7–1.0s`, `--ease-cine`). Lock body scroll while open.
- **`BackgroundVideo`**: muted, `autoplay`, `loop`, `playsInline`, `poster`, with an `<img>` fallback and a `video-scrim` overlay so text always reads. Lazy-load; pause when offscreen.
- **`DimLinks`** wrapper: implements the verified Fatherland interaction — when one link in the set is hovered, the others fade toward `white-40`. Implement cleanly with a container hover-state + opacity transition (do **not** copy their jQuery `toggleClass` approach). Disable on touch / reduced-motion.
- **`Reveal`** (scroll-in: fade + `y:16→0`, `0.6–0.9s`, once), **`Loader`** (a minimal original mark — a thin ring or the Cossé wordmark fading in; never reuse Fatherland's loader SVG).

### Motion language
- Easing `--ease-cine: cubic-bezier(0.16, 1, 0.3, 1)`.
- Hero/landing `0.9–1.4s`; sections `0.6–0.9s`; menu/transitions `0.7–1.0s`; stagger `0.08–0.12s`.
- Transforms limited to `opacity`, `y`, `clip-path`. No parallax-everywhere, no spring/bounce, no autoplay carousels.
- Page transitions: a brief black `clip-path` wipe between routes (scenes, not jumps), `~0.7s`, skipped under reduced-motion.
- **Optional** WebGL parallax on a single backdrop (Fatherland uses one on its menu) — **off by default** for performance; leave a commented hook only.

---

## PAGE 1 — Landing + Home (`/`)

**Landing (first screen, 100svh):** pure black. A muted, looping **showreel** (Cossé work) fills the frame under a `video-scrim`; if no footage, fall back to a slow-drifting dark texture / grain. The **Cossé logotype sits centered**, vertically and horizontally — exactly the Fatherland cover. One quiet entry affordance (the wordmark links inward, plus a small mono `SCROLL` / `ENTER` cue). Hold the first beat before anything moves. Corner nav present but minimal.

**Then a sparse scroll — one idea per viewport:**
1. **Positioning statement.** Huge centered grotesk, three lines: *"Simple human truths. / Total brand experiences. / Since 1995."* Black field, nothing else.
2. **WHO WE ARE / WHAT WE DO.** Two oversized stacked links, centered (mirrors Fatherland's "Introduction" split) → link to About and Work. Apply `DimLinks`.
3. **Selected work.** 3–5 pieces, each a full-bleed 16:9 muted video/still with title + client + one-line idea in mono. Links to Case Study.
4. **Capabilities.** Six clusters, mono labels + short grotesk scope lines: Brand & Creative · Media & Channel Strategy · Experiential & Activation · Social & Content · Public Sector / Cause · Production & Storytelling.
5. **The method.** Tease the case-study spine — *Challenge · Human truth · Idea · Execution · Channels · Impact · Legacy* — as mono-numbered lines.
6. **Start a project (close).** Black; one line of huge grotesk; a tracked `START A PROJECT`. End held.

Keep it austere. The restraint is the point.

---

## PAGE 2 — Case Study (detail) (`/work/[slug]`, build one fully)
The centerpiece — dormant archive turned into proof. A long, monochrome, scroll-driven story on the seven-part spine:

1. **Hero** — full-bleed muted video/still under scrim; project title (huge grotesk), client / year / discipline in mono.
2. **01 Challenge** · 3. **02 Human truth** (give this pull-quote scale) · 4. **03 Idea** · 5. **04 Execution** (full-bleed media blocks) · 6. **05 Channels** (mono tag row) · 7. **06 Impact** — **placeholder metrics only**, marked e.g. `+38% — placeholder` (never present fabricated client results as real) · 8. **07 Legacy**.
9. **Next project** link + `START A PROJECT`.

Each spine step: a mono numeral + label, a huge grotesk heading, generous black space. Alternate `black` with the occasional `grey-900` block for rhythm.

---

## PAGE 3 — Work (index) (`/work`)
- A top filter row in mono caps (mirrors Fatherland's `ALL / FILM / MUSIC / ADVERTISING / PHOTO`), mapped to Cossé's disciplines: `ALL / BRAND / MEDIA / EXPERIENTIAL / SOCIAL / PUBLIC SECTOR / PRODUCTION`. Selecting one fades the grid and filters — no heavy UI.
- **16:9 thumbnail grid, two columns on desktop, one on mobile** (Fatherland's exact layout). Each card: muted video/still, title + discipline tag shown beneath in mono. Apply `DimLinks` so hovering a card dims the rest.
- Cards link to the case study.

---

## Content
All copy + the (fictional but plausible) case-study data in `src/content.ts`, strongly typed. Write real, spare, confident agency copy — no lorem, no corporate filler. Invent 8–10 plausible Nigerian-market case studies (brand · sector · idea), every metric marked placeholder. Mono is for labels/credits/meta; grotesk for statements.

---

## Clean-hands / guardrails (non-negotiable)
- **Fonts are licensed.** Monument Grotesk + Semi-Mono (ABC Dinamo) and Sometype Mono are commercial faces served through Cargo's licensed pipeline. **Do not copy their font files or hotlink Cargo's `type.cargo.site` URLs.** Build on **Space Grotesk + Space Mono** now; license Monument from ABC Dinamo for production (leave the swap commented).
- **Assets are Cossé's own.** Do **not** reuse any Fatherland video, logo SVG, image, copy, or Cargo template/markup. Use Cossé's real logo and footage; until footage exists, run on dark texture/grain + type. Comment where real assets slot in.
- **No AI-generated or stock photos of real, identifiable people.** Use film/texture, typographic frames, or clearly-labelled neutral placeholders, with good `alt` text.
- **Case-study metrics are placeholders**, never fabricated as real results.
- The brief is Fatherland's *language*, not its skin. If a screen looks like a recolour of their site rather than a Cossé original, it's wrong.
- Accessibility: semantic landmarks, visible focus states, AA contrast (watch `white-55`/`white-40` on black), reduced-motion, alt text.
- Performance (Nigerian mobile reality): compress/transcode video, poster frames, lazy-load, pause offscreen video, no layout shift, fonts via `next/font`.

## Where Cossé must diverge from a pure film-studio site
Fatherland sells story; **Cossé sells services.** So:
- `START A PROJECT` is reachable at all times (bottom-left corner) and closes the homepage.
- The **Work / case-study spine stays fully legible** — atmosphere never buries the proof or the path to a brief.

---

## Process & output
1. Build **tokens + fonts** first, then globals (`CornerNav`, `OverlayMenu`, `BackgroundVideo`, `DimLinks`, `Reveal`, `Loader`), then `content.ts`, then Landing/Home → Case Study → Work.
2. Verify all three routes render and inter-link, no console errors, no overflow at 360 / 768 / 1280.
3. Short `README.md`: design-system summary, run instructions, and a "to productionise" note (license Monument Grotesk, real Cossé logo/footage, true case-study data).
4. When done, name the routes to open and the 3–4 design decisions you're most confident in.

Build it austere, monochrome, and cinematic — like a film studio that happens to
solve business problems. Start now.
