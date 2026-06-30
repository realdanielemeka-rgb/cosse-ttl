"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
 * Global smooth, slightly-weighted scroll — "cinematic, not sluggish."
 * Mounted once in the root layout so it survives client navigation. Stands
 * fully down under prefers-reduced-motion. Also routes in-page hash links
 * (e.g. the cover scroll cue → #positioning) through Lenis.
 */
export default function LenisProvider() {
  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 40;
      lenis.scrollTo(y, { duration: 1.1 });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
