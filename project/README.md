# Cossé TTL — Website Prototype (v3 · identity, motion & finesse)

A front-end visual-direction prototype for **Cossé TTL** — a Nigerian integrated
marketing communications agency (Lagos, founded 1995, formerly Bates Cossé). Built
as streaming **Design Components** (`*.dc.html`), runnable directly in a browser and
mapping 1:1 to the requested **Next.js + TypeScript + Tailwind + Framer Motion +
Lenis** build (see *To productionise*).

**Lineage:** v1 (warm-ink + serif + ripple) → v2 (the *fatherlandlive.com* idiom:
monochrome, full-bleed, four-corner nav) → **v3 (this): an art-direction pass that
gives the monochrome shell an unmistakable, authored identity** — one variable type
voice, one recurring glyph, and three named motions. The monochrome palette,
strategy, three pages, seven-part case spine and clean-hands rules from v2 stand.

## Real brand assets (added)
- **Cossé logo** — the supplied script mark, extracted to a clean white-knockout
  (`cosse-white.png`, transparent, magenta accent preserved) for the dark UI, plus a
  dark version (`cosse-dark.png`). Used in the nav corner and the overlay-menu header.
- **Clients wall** — the supplied client sheet was auto-sliced into 21 individual
  logos on uniform white tiles (`clients/00–20.png`) and runs as a two-row, opposite-
  direction marquee (pause on hover; static wrapped grid under reduced-motion). Names
  live in `content.js` → `clients`. *Production:* swap each tile for the brand's
  official vector logo (a white-knockout set would let the tiles drop and sit straight
  on black).
- **Hero showreel** — the supplied YouTube film plays muted/looping, cover-fit behind
  the cover scrim+grain. *Production:* replace with a self-hosted, compressed master
  (poster, `playsInline`, pause-offscreen) for Nigerian-mobile budgets.

## Information architecture (reworked into a real multi-page site)
The site is no longer one overloaded scroll — it's a paced **lobby** that routes into
real pillar pages, with the menu mirroring the site exactly.
- **`Home.dc.html`** — overview/router: cover (showreel) → manifesto → selected work →
  clients → capabilities teaser → about teaser → thinking teaser → start-a-project band.
- **`Work.dc.html`** → **`Case Study.dc.html`** (`?slug=`) — the proof spine.
- **`Capabilities.dc.html`** — the six practices with depth + the 7-step method.
- **`About.dc.html`** — the 1995→now story, DNA/values, leadership, clients, careers teaser.
- **`Thinking.dc.html`** — POV/essays index (challenger thinking; placeholder articles).
- **`Contact.dc.html`** — the conversion surface: a validated brief form (challenge,
  budget, timeline) with a success state, "what happens next," and studio details.
- **`Careers.dc.html`** — culture + open roles (for young talent).

**Two flows, both seamless.** *Intent* → "Start a project" sits in every corner, the
menu, every page's closing **StartBand**, and the footer — always one move from the
brief form. *Learn* → Home teasers and the overlay menu both map to the real pillar
pages, so exploring never dead-ends.

**Shared chrome:** `CornerNav` (four-corner + overlay menu: primary Work · Capabilities ·
About · Thinking, secondary Start a project · Careers, plus contact/social), a reusable
`StartBand` close, and a single `Footer` with the full IA — so every page is consistent.

## Type identity (the biggest ownership move)
- **One variable family — Bricolage Grotesque** (OFL, shippable — also removes the
  Monument licensing problem). Used for *everything*: display, headlines, UI, body.
  Loaded via Google Fonts with `opsz` (12–96) + `wght` (200–800) axes.
- Coherence across an **extreme range** — micro labels at ~`wght 500`, giant display
  settling to ~`wght 640–720` — is what reads as bespoke rather than off-the-shelf.
- **Mono is demoted to a single earned role:** film-style credit/timecode micro-text
  on case studies (`00:01 — AGENCY · COSSÉ TTL`), in **Space Mono**. Nowhere else.
- **Edge tension:** the positioning statement and the case-study title hang off the
  left margin / bleed out of frame, breaking the centered monotony.
- **Type-in-motion:** headlines **settle by gaining weight** on entrance
  (`font-variation-settings: 'wght'` ~340 → ~700) over ~0.9s with `--ease-cine`,
  paired with the fade+rise. Hero and major heads only.
- *Alternative register (not applied):* **Big Shoulders Display** for a more
  condensed, title-card feel. Production: commission/license a bespoke contrasty
  display here — see the comment in each page's `<helmet>`.

## The acute (´) — the brand glyph
Extracted from the É in *Cossé* and made the recurring device (it replaces the v1
ripple). One shape, monochrome, reused as: the **loader** (a single acute that ticks
in), the **custom cursor** mark, the **link hover indicator** (slides in left of a
hovered link in the overlay menu), the **scroll-progress** marker on a hairline
track, and the **active work-filter tick**.

## Three named motion signatures
1. **"Total" / film-cut grammar** — route changes are **cuts, not crossfades**: two
   black bars sweep closed with `--ease-cut` (`cubic-bezier(0.85,0,0.15,1)`) before the
   next scene loads. *"We don't transition, we cut."* (A true edge-to-edge frame
   **expansion** between the work grid and the case hero needs Framer Motion shared-
   layout / `layoutId` — see *To productionise*; here it is expressed as the cut.)
2. **The acute as moving agent** — the custom **acute cursor** (desktop only) lerps to
   the pointer, tilts with horizontal velocity, grows over interactive elements,
   collapses to a dot on press; plus the loader, scroll-progress and hover tick.
3. **Settle & open** — headlines settle by weight; reveals fade + rise on `--ease-cine`.

Easing tokens: `--ease-cine: cubic-bezier(0.16,1,0.3,1)` · `--ease-cut:
cubic-bezier(0.85,0,0.15,1)` · `--ease-glyph: cubic-bezier(0.34,1.56,0.64,1)` (acute only).

## Robustness note
Every reveal/weight-settle triggers a CSS transition **and** a real-time `setTimeout`
failsafe that forces the final visible state — so nothing is ever stuck hidden if the
rendering timeline is throttled (e.g. an automated preview). The loader lifts on a
real-time timer for the same reason.

## Accessibility & performance
`prefers-reduced-motion` path: weight-settle lands at final weight, cuts become
instant, cursor → native, grain drift off, reveals instant. Cursor disabled on touch
/ `hover: none`. Semantic landmarks, visible focus, AA-minded contrast on black,
styled-but-keyboard-safe scrollbar, GPU-friendly props only.

## Clean hands
No Fatherland fonts/footage/logo/copy/template. No AI or stock photos of real people —
placeholders are typographic frames + grain, clearly labelled, with comments marking
where real Cossé footage slots in. All case-study metrics are explicitly
**placeholder**. Fonts are OFL/free and shippable.

## To productionise
1. `npx create-next-app@latest cosse-ttl --typescript --tailwind --app --eslint --src-dir`
   then `npm i framer-motion lenis`. Port tokens to `tailwind.config.ts`; rebuild
   components (`CornerNav`, `OverlayMenu`, `BackgroundVideo`, `DimLinks`, `Reveal`,
   `Loader`, `Acute`) as React; data → typed `src/content.ts`.
2. Implement the **true "Total" expansion** with Framer Motion shared layout
   (`layoutId` / FLIP), 60fps, reversing on back — the one piece this static-file
   prototype expresses as a cut.
3. Drop in the **real Cossé logo + showreel/case footage**; replace placeholder
   metrics with verified results; wire `START A PROJECT` to a real endpoint.
4. Optionally commission/license a **bespoke contrasty display** face (swap point
   commented); Bricolage Grotesque stays as the workhorse.

## Most confident "only-Cossé" moves
1. **Bricolage Grotesque across an extreme weight range, settling on entrance** — a
   single authored voice, not a fashionable sans.
2. **The acute (´) running through loader, cursor, hover, filter and progress** — one
   piece of punctuation the brand breathes.
3. **Film-cut navigation + edge-tension headlines** — decisive, cinematic, and not
   centered-generic; it sells services without losing the film-studio seriousness.
4. **`START A PROJECT` always one move away** (corner + every close) inside all the
   spectacle — the brief is never buried.
