"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Grain from "./Grain";

const EASE_CINE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.7;

type Xform = { x: number; y: number; sx: number; sy: number };
type Meta = { keyword: string; discipline: string };

/*
 * TotalExpand — the "Total expansion" motion signature (Brief §8): a work
 * card's media well grows to fill the screen, then the case study mounts
 * underneath. Mounted once in the root layout, beside CornerNav's film-cut.
 *
 * Two layers, not one: a background panel animates only x/y/scaleX/scaleY
 * (transform-origin 0 0, GPU-composited, no layout thrash — holds 60fps) from
 * the clicked card's rect to full-viewport; the keyword/discipline text sits
 * in a separate, never-scaled layer that only fades in, so it never stretches.
 *
 * Scope (best-effort, noted in README): a grow-then-cross-dissolve illusion,
 * not a true cross-route Framer Motion layoutId match — the App Router
 * unmounts the source tree before the destination mounts, so no element
 * actually persists across the navigation. Forward navigation only; Back and
 * "Next project" still use the film-cut (see CornerNav).
 */
export default function TotalExpand() {
  const router = useRouter();
  const pathname = usePathname();
  const [xform, setXform] = useState<Xform | null>(null);
  const [meta, setMeta] = useState<Meta>({ keyword: "", discipline: "" });
  const [active, setActive] = useState(false);
  const pendingHref = useRef<string | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[data-total-expand="true"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (a.target === "_blank" || !href.startsWith("/")) return;
      if (href.split("#")[0] === pathname) return;
      const well = a.querySelector("[data-media-well]") as HTMLElement | null;
      if (!well || reducedRef.current) return; // fall through to plain Link navigation

      const r = well.getBoundingClientRect();
      e.preventDefault();
      e.stopPropagation();

      pendingHref.current = href;
      setMeta({ keyword: well.dataset.keyword || "", discipline: well.dataset.discipline || "" });
      setXform({
        x: r.left,
        y: r.top,
        sx: r.width / window.innerWidth,
        sy: r.height / window.innerHeight,
      });
      setActive(true);

      window.setTimeout(() => {
        if (pendingHref.current) router.push(pendingHref.current);
      }, DURATION * 1000 - 60);
      // Failsafe — never leave the overlay stuck over a real page.
      window.setTimeout(() => {
        setActive(false);
        pendingHref.current = null;
      }, 3200);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, pathname]);

  // The destination has mounted (pathname changed) — hold a beat, then dissolve.
  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => {
      setActive(false);
      pendingHref.current = null;
    }, 120);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && xform && (
        <motion.div
          key="panel"
          aria-hidden="true"
          initial={{ x: xform.x, y: xform.y, scaleX: xform.sx, scaleY: xform.sy }}
          animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE_CINE } }}
          transition={{ duration: DURATION, ease: EASE_CINE }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            transformOrigin: "0 0",
            zIndex: 93,
            background: "#000000",
            pointerEvents: "none",
          }}
        />
      )}
      {active && xform && (
        <motion.div
          key="content"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: DURATION * 0.4, duration: DURATION * 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE_CINE } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 93,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {meta.keyword && (
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontWeight: 700,
                fontSize: "clamp(4rem,16vw,14rem)",
                color: "rgba(255,255,255,0.05)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {meta.keyword}
            </span>
          )}
          <Grain size={220} opacity={0.35} />
          {meta.discipline && (
            <span
              className="chevron-tag"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "#000000",
                color: "rgba(255,255,255,0.85)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "7px 16px 7px 20px",
              }}
            >
              {meta.discipline}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
