# Cossé TTL — Website

A production-grade front-end for **Cossé TTL**, a Nigerian integrated marketing
communications agency (Lagos, founded 1995, formerly Bates Cossé). Built in
**Next.js (App Router) + TypeScript + Tailwind v4**, with **Framer Motion**
and **Lenis** for smooth scroll. It implements the approved visual-direction
prototype handed off from Claude Design, then two rounds of client revisions.

The aesthetic is monochrome-plus-**Lacquer**: true black, one authored type
voice (Bricolage Grotesque across an extreme weight range, settling on
entrance), the **acute (´)** from *Cossé* as the recurring brand glyph (loader,
cursor, hover tick, scroll-progress, filter tick), and a glossy black-lacquer
surface treatment on cards, chips and buttons — never a shiny-plastic one.
"Start a project" is always one move away.

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
| `/` | Home — landing → opening statement → Our Philosophy → Our DNA → Our Values → Selected Work (TV commercials) → positioning → capabilities → start |
| `/work` | Work index — one hero-scale case, TV commercials, discipline filter row, curated grid |
| `/work/[slug]` | Case Study — the seven-part narrative spine (one page per case, statically generated) |
| `/capabilities` | Six practices in depth + the 7-step method |
| `/studio` | The integrated room, craft made in-house, and Lagos as studio-and-subject |
| `/about` | 1995→now story, stats, DNA, leadership, clients, careers teaser |
| `/thinking` | POV/essays index (featured + grid) |
| `/contact` | Validated brief form (challenge / budget / timeline) with success state |
| `/careers` | Culture + open roles |

Unknown case slugs return a real 404. Home, Work and Case Study carry this
round's full **Lacquer + content-integrity** pass; the other six routes got a
lighter chrome-only pass (Lacquer swapped in wherever they used the old gloss
classes).

## Content-integrity policy

Nothing on this site is invented to look finished. Two copy tiers coexist:

- **Real, used verbatim**: the opening statement ("Human Beings are simple at
  heart and can be reached in simple ways."), the positioning line, the
  "ESTABLISHED IN 1995" lockup, and the seven **Our DNA** traits.
- **Explicitly pending**: Our Philosophy, Our Values, and all 8 TV-commercial
  slots render through `<Placeholder>` — a dashed `1px` border, dimmed
  content, and a tracked micro-caption reading `PLACEHOLDER — CLIENT TO
  SUPPLY`. Nothing is dressed up as final.

The 9 case studies are the one deliberate exception, carried over from the
original brief: they're fictional-but-plausible narratives invented for the
prototype (every metric already flagged `note: "placeholder"`). Per client
direction this round, their copy stays as-is — only Lacquer chrome (tiles,
chips) was added to them, no new content was invented.

## The Lacquer system

`globals.css` defines the tokens and two utility classes that carry the
site's "glossy" pass:

- `--sheen-warm` / `--sheen-warm-strong` — a pale warm-ivory tint (the
  retired brass, now a lacquer highlight, never a colour accent).
- `.lacquer` — a static panel sheen: a soft warm diagonal + a hairline warm
  top edge, as if a black lacquered surface is catching one light source.
- `.lacquer-sweep` — the one-shot hover signature: a single warm band sweeps
  once on hover-enter and does not loop (buttons, work cards, the persistent
  CTA, chevron chips).
- `.chevron-tag` — a `clip-path` chip shape used for discipline/format tags.
- `--glass-panel-bg` / `--glass-blur` — the overlay menu's frosted-glass
  panel, with a solid-fill `@supports` fallback for browsers without
  `backdrop-filter`.

Filled white CTAs (StartBand, the contact form's submit) are deliberately
**excluded** — a lacquer tint reads as gloss on black, but as dirt on white
paper, so they stay plain per the "restraint over shine-everything" rule.

## Architecture

- **`src/content.ts`** — single, strongly-typed source of truth for all copy:
  positioning (incl. `openingStatement`/`lockup`), the DNA trait list, the 9
  case studies, the 8-slot `commercials` array, `ourPhilosophy`/`ourValues`
  placeholder flags, clients, capabilities, `getCase`/`nextCase` helpers.
- **`src/app/layout.tsx`** — fonts via `next/font/google`, global/OG metadata,
  the acute favicon, and the two persistent global mounts: `CornerNav` and
  `TotalExpand`.
- **`src/app/globals.css`** — design tokens incl. the Lacquer system, the
  quiet-hover utility classes, and the full `prefers-reduced-motion`
  stand-down (every animation added this round — particles, pulse, sweeps —
  has an explicit reduced-motion override).
- **`src/components/`**
  - `CornerNav` — four-corner labels + bordered MENU → full-screen glass-panel
    overlay menu; the acute **loader**, **custom cursor**, **scroll-progress**
    marker, and the **film-cut** route transition (intercepts `data-cut`
    links, sweeps two slates closed, then routes). Also owns the top-left
    wordmark's fade-in-past-landing behaviour on Home.
  - `TotalExpand` — the "Total expansion" motion signature: intercepts
    `data-total-expand="true"` links (WorkCard), grows a full-screen panel
    from the clicked media well's rect via GPU-only `transform` (no
    layout thrash, holds 60fps), then cross-dissolves into the case study
    underneath. **Best-effort by design**: this is a grow-then-dissolve
    illusion, not a true cross-route Framer Motion `layoutId` match — the App
    Router unmounts the source tree before the destination mounts, so no DOM
    node actually persists across the navigation. Forward navigation only;
    Back and "Next project" use the film-cut. `data-cut` and
    `data-total-expand` are mutually exclusive per link.
  - `LogoMark` — the real logo asset (hero/corner modes); if the file is
    missing, renders a bordered placeholder frame, never a fabricated
    stand-in.
  - `HeroBackdrop` — 10 oversized, blurred, independently-drifting acute
    glyphs behind Home's landing frame.
  - `PersistentCTA` — the "Start a project" control (corner + inline
    variants) with an idle micro-pulse and a Lacquer sweep.
  - `WorkCard` / `CommercialCard` — the shared grid formats. `WorkCard` has a
    Framer-Motion (not CSS-only) circular view affordance on hover.
    `CommercialCard` renders entirely through `<Placeholder>` until a real
    `videoId` is supplied.
  - `LoadMore` — `aria-expanded`; the parent owns state and moves focus to
    the first newly-revealed item.
  - `Placeholder` — the shared dashed-border / dimmed-content / captioned
    treatment described above.
  - `Reveal` — the scroll-reveal primitive (fade + rise + optional
    weight-settle, once). Forwards its ref (merged with its own
    IntersectionObserver ref) so parents can manage focus on reveal, e.g.
    LoadMore. Respects reduced-motion and carries a real-time failsafe.
  - `StartBand`, `Footer`, `Acute`, `Grain` — shared chrome and the two
    decorative primitives.

## Verified

- `npm run build` prerenders all 9 routes + 9 case-study pages with no errors.
- All routes return 200 (unknown slug → 404) and render content from `content.ts`.
- No horizontal overflow and no console/page errors at **360 / 768 / 1280px**
  across every route (headless, incl. Home's 9 beats, Work's filter+grid, and
  a Case Study's full spine).
- The Total Expansion transition: verified forward-navigation frames land on
  the correct route with no console errors; verified the `prefers-reduced-
  motion` path skips the overlay entirely and falls through to a plain,
  instant `Link` navigation with nothing left stuck on screen.
- Lacquer-adjacent text contrast: the sheen tokens top out at 14% opacity
  warm-white, which doesn't move any text/background pairing enough to change
  its contrast class. One pre-existing, sitewide micro-label convention
  (uppercase captions at 40% white opacity, e.g. section numbers and
  `PLACEHOLDER` captions) sits under 4.5:1 against near-black panels — by
  design, as de-emphasised metadata rather than body copy, and unchanged by
  this round's Lacquer work. Flagging it here rather than silently
  overriding a sitewide typographic decision no one asked to revisit.

## What Daniel needs to supply

1. **The Cossé logo file** (SVG or high-res PNG, white-knockout). `LogoMark`
   is wired for it at `public/cosse-white-bold.png` — until it's dropped in,
   every mode renders an explicit bordered placeholder frame rather than a
   fabricated wordmark.
2. **Our Philosophy** and **Our Values** copy (2–4 sentences each) — both
   currently render as flagged `<Placeholder>` blocks on Home.
3. **TV commercial assets** — up to 8 films (title, client, a YouTube/Vimeo
   ID, a poster still). `content.ts`'s `commercials` array has 8 typed slots
   waiting; each renders as an explicit placeholder tile until filled.
4. **Verified case-study results** to replace the placeholder-flagged metrics
   on the 9 existing narratives (or real case studies, if the fictional ones
   should be retired rather than kept dressed with real numbers).
5. Real client logos for `public/clients/` (currently sliced from a supplied
   sheet), and a decision on whether the 9 existing case studies stay as
   scaffolding narratives or get replaced with real client work.

## Clean hands

No AI or stock photos of real people — placeholders are typographic frames +
grain, and are always labelled as such via `<Placeholder>`, never dressed up
as finished content. All case-study metrics are explicitly **placeholder**.
Fonts are OFL/free and shippable. The original design bundle (transcripts +
`.dc.html` prototypes) is preserved under `chats/` and `project/` for
reference.
