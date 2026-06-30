# Claude Code — Power Prompt v3: Cossé TTL — Signature Identity, Motion & Finesse Pass

> Run this **after** the v2 build exists. You are now art-directing it, not just
> coding it. Your job is to take a competent-but-generic dark site and give it a
> **core, unmistakable ownership** — in type and in motion — and to stress-test
> the craft until nothing reads as a template.
>
> This **overrides the type system specified in v2** (the Space Grotesk / Monument
> Grotesk + mono-labels pairing). Everything else from v2 stands: the monochrome
> palette, the strategy, the three pages, the seven-part case-study spine, the
> clean-hands rules, the Next.js + Framer Motion + Lenis stack.

---

## PART A — Stress-test first (write a critique before you touch code)

Before implementing anything, produce a short written **design critique** of the
current v2 build (5–10 bullets). Hunt specifically for the *generic tells* below
and name where each one appears, then state what you'll change and why. Do not
skip this — the critique is a deliverable.

Generic tells to find and kill:
- **Type that reads "default studio"** — the grotesque + mono pairing, mono used as decoration, neutral weights, flat hierarchy. (Fixed in Part B.)
- **Centered-everything monotony.** Fatherland centers heavily; on a services site that can feel inert. Introduce asymmetry and edge-tension.
- **Even vertical rhythm.** Every section the same height/pace feels mechanical. Vary it — pin some, cut fast through others.
- **A uniform thumbnail grid** with no focal hierarchy — give the index one hero-scale piece and rhythm.
- **Generic interaction** — hover = opacity only; transitions = crossfade; default focus ring; default cursor; default loader. (Fixed in Parts C/D.)
- **Swap test:** if you could drop another brand's name and colour in and the site would still "work," it isn't specific enough yet.

---

## PART B — Type identity (rework, don't reshuffle)

**Principle:** ownership comes from one coherent, characterful voice plus a
signature treatment — not from picking another fashionable sans.

### The family — one variable face, used across an extreme range
- **Bricolage Grotesque** (variable; SIL OFL — free and shippable, which also removes the Monument licensing problem). Load via `next/font/google` with the variable axes available (`wght`, `opsz`).
- Use it for **everything**: display, headlines, UI, body. Coherence across a wide range — `wght` ~200 → ~800, true optical-size contrast between giant display and micro-labels — is what makes it feel bespoke rather than off-the-shelf.
- It has humanist character and an editorial edge that a 30-year challenger agency can own; it is markedly less saturated than Space/Monument.
- **Alternative register (offer, don't assume):** if Daniel wants something more condensed and cinematic / title-card, **Big Shoulders Display** (variable, OFL) is the bolder swap. Note it; default to Bricolage.
- **Mono is demoted.** No mono-as-labels. Mono is allowed in **one role only** — film-style credit/timecode micro-text on case studies (e.g. `00:01 — DIRECTOR`, set tiny, wide-tracked) — and only because it earns the *film* association. If in doubt, drop it. (If kept: Space Mono, this role only.)
- Production note: for ultimate ownership, this is where a studio would commission a bespoke display or license a distinctive contrasty grotesque — leave a comment marking the swap point.

### The signature glyph — the acute accent (´) from "Cossé"
Extract the acute mark from the É in the wordmark and make it the brand's
recurring graphic device (this replaces the ripple motif from earlier work). Build
it once as an SVG/`<span>` component, `Acute`, and reuse it as:
- the **loader** (a single acute that ticks/rotates in),
- the **custom cursor** mark (Part C),
- the **hover indicator** — an acute slides in to the left of a hovered link (instead of an underline), paired with the existing dim-siblings effect,
- the **scroll-progress** marker travelling a thin vertical track,
- **list / section markers** and the **active work-filter** tick.
Keep it tiny, monochrome, consistent. It should feel like punctuation the brand
breathes.

### Typographic treatment rules (the ownable craft)
- **Scale with conviction:** giant display (`clamp(2.75rem, 7vw, 7rem)`, `line-height: 0.95–1`) against genuinely small, wide-tracked micro-labels. No timid in-between sizes.
- **Edge tension:** set the biggest headlines to hang off the left margin / bleed partly out of frame on at least the landing and case-study hero — a recurring signature, breaking the centered monotony.
- **Tracking discipline:** tight on display (`-0.01em` to `-0.02em`); wide on the few micro/eyebrow elements (`0.18em–0.24em`, uppercase).
- **Wordmark:** `C O S S É` with bespoke tracking; the É's acute is the glyph above.
- **Hanging punctuation; no headline widows/orphans;** baseline-aligned; honour a consistent margin/grid token set.

### Type-in-motion (a signature you can't get from a static font)
- Headlines **settle by gaining weight** on entrance: animate `font-variation-settings` `wght` from ~`300` to its final ~`720` (and `opsz` toward display) over `0.7–0.9s` with `--ease-cine`, combined with a single-line clip reveal.
- Use sparingly — hero and major section heads only, once each.

---

## PART C — Signature motion system (named, repeated, ownable)

Define these as a small, coherent vocabulary. Three signatures, each tied to the
brand's own logic. Repetition is what creates ownership — apply them consistently.

### Easings & timing (tokens)
- `--ease-cine: cubic-bezier(0.16, 1, 0.3, 1)` — settles, reveals.
- `--ease-cut: cubic-bezier(0.85, 0, 0.15, 1)` — film cuts / wipes (decisive).
- `--ease-glyph: cubic-bezier(0.34, 1.56, 0.64, 1)` — a hint of overshoot for the **tiny acute mark only** (small scale → reads as a "tick," never bouncy). Nothing else uses spring.
- Durations: Total expansion `0.6–0.8s`; cuts `0.45–0.65s`; reveals `0.6–0.9s`; weight-settle `0.7–0.9s`; cursor lerps continuously.

### Signature 1 — "Total" expansion (the one wow moment)
Clicking a work frame makes the **16:9 frame expand edge-to-edge to fill the entire
viewport (total)** before resolving into the case-study hero; reverses on back.
Implement with Framer Motion shared layout (`layoutId` / FLIP). Motion that enacts
"Total brand experiences." Make this flawless and 60fps — it's the signature
interaction. Section reveals echo it: content arrives by a frame **opening**
(clip-path inset from an edge/centre, like an aperture) rather than a plain fade.

### Signature 2 — the acute mark (´) as moving agent
- **Custom cursor (desktop only):** a small acute that subtly rotates toward pointer movement, grows over interactive elements, and collapses to a dot on press. Must degrade safely — hide on touch, keep the native caret over inputs, and respect reduced-motion / offer an off switch.
- **Link hover:** the acute slides in left of the hovered link (with dim-siblings).
- **Loader & scroll-progress:** as in Part B.

### Signature 3 — film-cut grammar (transitions & rhythm)
- Route transitions are **cuts, not crossfades:** a fast slate-wipe — a black bar (or two bars closing like a clapperboard) sweeps with `--ease-cut`, then the new scene opens. `~0.5–0.65s`. No long dissolves anywhere.
- The overlay menu opens as an iris/curtain and **closes on a hard cut**.
- Editorial framing for the team: *"We don't transition, we cut."*

### Supporting motion (restraint still governs)
- Background video: slow and quiet; on section-enter, a brief **exposure shift** (scrim opacity dips then settles) so each film "breathes" in.
- Media hover: ≤`1.03` scale + scrim lift; quiet.
- Transforms limited to `opacity`, `transform`, `clip-path`. No parallax-everywhere, no autoplay carousels, no decorative loops.

---

## PART D — Spatial & detail finesse

- **Asymmetry & edge-tension:** break the centered default — bleed headlines off the left, use the full frame, set up a real grid with a few deliberate rule-breaks. Vary section pacing (pin one, cut fast through another).
- **State craft (match the aesthetic):** focus states use an **acute-based indicator**, never the default blue ring; define `::selection` (white on near-black or inverted); polish link / active / pressed / disabled states; refine the work-filter and the menu; style the scrollbar minimally (or hide tastefully with keyboard access intact).
- **Index hierarchy:** give the Work grid one hero-scale piece and intentional rhythm rather than a uniform wall.
- **Micro-polish:** consistent hairlines, no layout shift, no janky reveals, image/video poster discipline.

---

## Constraints (do not break)
- **Accessibility through all of this:** AA contrast on monochrome (audit `white-55`/`white-40` on black), visible (acute) focus, full keyboard nav through the overlay menu and filters, and a complete **`prefers-reduced-motion`** path — Total expansion → instant; cuts → instant black swap; weight-settle → land at final weight; cursor → native; video → poster. The film-cut language degrades gracefully to instant cuts, which suits it.
- **Performance (Nigerian mobile reality):** GPU-friendly props only, pause offscreen video, compress/transcode, lazy-load, fonts via `next/font`. The cursor and heavy motion must never cost smoothness on a mid-tier phone.
- **Clean-hands (carryover):** Cossé's own logo/footage/assets only; do **not** reuse any Fatherland video, logo, copy, or template. Case-study metrics stay **placeholder**. No AI-generated or stock photos of real, identifiable people. Fonts here are OFL/free and shippable.
- **Don't break the strategy:** `START A PROJECT` stays reachable (corner + closing screen); the case-study spine stays legible. Spectacle never buries the path to a brief.

---

## Process & output
1. Post the **Part A critique** first.
2. Implement: type system + the `Acute` glyph component → the three motion signatures → spatial/state finesse.
3. Verify all routes, no console errors, 60fps on the Total expansion, no overflow at 360 / 768 / 1280, full reduced-motion path.
4. Update `README.md` with the type rationale, the acute-glyph system, the three named motion signatures, and the production swap points (bespoke display; real assets).
5. Report the routes to open and the 3–4 moves you're most confident make it unmistakably Cossé.

Make it feel authored — one voice in the type, one glyph running through it, three
motions that only make sense for *this* agency. Start with the critique.
