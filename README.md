# Cossé TTL — Website

A production-grade front-end for **Cossé TTL**, a Nigerian integrated marketing
communications agency (Lagos, founded 1995, formerly Bates Cossé). Built in
**Next.js (App Router) + TypeScript + Tailwind v4**, with **Framer Motion**
available and **Lenis** for smooth scroll. It implements the approved
visual-direction prototype that was handed off from Claude Design.

The aesthetic is the **v3 monochrome idiom**: true black-on-white, one authored
type voice (Bricolage Grotesque across an extreme weight range, settling on
entrance), the **acute (´)** from *Cossé* as the recurring brand glyph (loader,
cursor, hover tick, scroll-progress, filter tick), and **film-cut** route
transitions. "Start a project" is always one move away.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
# production
npm run build && npm run start
```

`npm run lint` and `npx tsc --noEmit` both pass clean.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — paced lobby: cover showreel → manifesto → selected work → clients → capabilities → about → thinking → start band |
| `/work` | Work index — curated grid with quiet discipline filter chips |
| `/work/[slug]` | Case Study — the seven-part narrative spine (one page per case, statically generated) |
| `/capabilities` | Six practices in depth + the 7-step method |
| `/studio` | The integrated room, craft made in-house, and Lagos as studio-and-subject |
| `/about` | 1995→now story, stats, DNA/values, leadership, clients, careers teaser |
| `/thinking` | POV/essays index (featured + grid) |
| `/contact` | Validated brief form (challenge / budget / timeline) with success state |
| `/careers` | Culture + open roles |

Unknown case slugs return a real 404.

## Architecture

- **`src/content.ts`** — single, strongly-typed source of truth for all copy,
  the 9 case studies (every metric flagged `note: "placeholder"`), clients,
  capabilities, etc., plus `getCase` / `nextCase` helpers.
- **`src/app/layout.tsx`** — loads the fonts via `next/font/google`
  (Bricolage Grotesque with the `opsz` axis; Space Mono for case-study credits),
  sets global + Open Graph metadata and the acute favicon, and mounts the global
  chrome (`CornerNav`) and `LenisProvider`.
- **`src/app/globals.css`** — design tokens (CSS variables + Tailwind `@theme`),
  the global reset, `::selection`, styled scrollbar, form-field chrome, the
  grain-drift keyframe, the quiet-hover utility classes, and the full
  `prefers-reduced-motion` stand-down.
- **`src/components/`**
  - `CornerNav` — four-corner labels + bordered MENU → full-screen overlay menu;
    the acute **loader**, **custom cursor** (desktop, motion-on, sits exactly on
    the pointer), **scroll-progress** marker, and **film-cut** route transitions
    (intercepts internal `data-cut` links, sweeps two slates closed, then routes).
  - `Reveal` — the scroll-reveal primitive (fade + rise + optional weight-settle,
    once). React-stateful, so a parent re-render never resets a revealed element;
    respects reduced-motion and carries a real-time failsafe.
  - `StartBand`, `Footer`, `Acute`, `Grain` — shared chrome and the two
    decorative primitives.

### Notes on the port

- The prototype's inline-style fidelity is preserved (exact `clamp()` ramps,
  colours, spacing) via React style objects; quiet hovers — which the prototype
  drove with JS — are expressed as `hov-*` utility classes in `globals.css`.
- The Case Study route is a real dynamic segment (`/work/[slug]`) with
  `generateStaticParams` + per-case metadata, replacing the prototype's
  `?slug=` query.
- Lenis is a single global provider (survives client navigation) rather than
  per-page.

## Verified

- `npm run build` prerenders all 9 routes + 9 case-study pages with no errors.
- All routes return 200 (unknown slug → 404) and render content from `content.ts`.
- No horizontal overflow and no app console errors at **360 / 768 / 1280px**
  (checked headless across every route).

## To productionise

1. Drop in the **real Cossé logo + showreel/case footage** (the hero currently
   plays a placeholder YouTube film; swap for a self-hosted, compressed,
   `playsInline` master with a poster for Nigerian-mobile budgets). Replace the
   sliced client tiles in `public/clients/` with official white-knockout vectors.
2. Replace every **placeholder metric** with verified client results, and wire
   `Send the brief` (Contact) to a real endpoint / CRM.
3. Optional: implement the true edge-to-edge **"Total" frame-expansion** between
   the work grid and the case hero with Framer Motion shared layout (`layoutId` /
   FLIP) — this build expresses that beat as the film-cut.
4. Optional: self-host + subset the fonts and the YouTube facade for tighter
   first-load budgets.

## Clean hands

No AI or stock photos of real people — placeholders are typographic frames +
grain. All case-study metrics are explicitly **placeholder**. Fonts are OFL/free
and shippable. The original design bundle (transcripts + `.dc.html` prototypes)
is preserved under `chats/` and `project/` for reference.
