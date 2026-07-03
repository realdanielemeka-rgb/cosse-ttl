"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Acute from "./Acute";
import SwapText from "./SwapText";
import LogoMark from "./LogoMark";
import PersistentCTA from "./PersistentCTA";

const EASE_CINE = "cubic-bezier(0.16,1,0.3,1)";
const EASE_CUT = "cubic-bezier(0.85,0,0.15,1)";

const PRIMARY = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Studio", href: "/studio" },
  { label: "About", href: "/about" },
  { label: "Thinking", href: "/thinking" },
];
const SECONDARY = [
  { label: "Start a project", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

/*
 * CornerNav — the global chrome. Four-corner labels + a bordered MENU control
 * opening a full-screen overlay; the acute as loader, custom cursor, menu hover
 * tick and scroll-progress marker; and film-cut route transitions. Mounted once
 * in the root layout. All motion guards reduced-motion / touch.
 */
export default function CornerNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovMenu, setHovMenu] = useState<number | null>(null);
  const [hovMenuBtn, setHovMenuBtn] = useState(false);
  // On Home, the top-left wordmark is omitted while the bold centred
  // LogoMark carries that role — it reappears once scrolled past landing.
  const [pastLanding, setPastLanding] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const botBarRef = useRef<HTMLDivElement | null>(null);
  const reducedRef = useRef(false);
  const pathRef = useRef(pathname);
  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    // Syncs with the route (pathname) and scroll position — both external to
    // React — so setting state directly here is the correct pattern, not the
    // cascading-render anti-pattern this rule otherwise guards against.
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPastLanding(true);
      return;
    }
    const check = () => setPastLanding(window.scrollY > window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // ── loader, cursor, scroll-progress, film-cut ──────────────────────────────
  useEffect(() => {
    const reduced =
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = !!window.matchMedia && window.matchMedia("(hover: none)").matches;
    reducedRef.current = reduced;

    const cleanup: Array<() => void> = [];

    // Acute loader: lifts on a real-time beat (first load only — chrome persists).
    const loader = loaderRef.current;
    if (loader) {
      if (reduced) {
        loader.style.display = "none";
      } else {
        loader.style.transition = "opacity .5s " + EASE_CINE;
        const t1 = window.setTimeout(() => (loader.style.opacity = "0"), 280);
        const t2 = window.setTimeout(() => (loader.style.display = "none"), 850);
        cleanup.push(() => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
        });
      }
    }

    // Acute custom cursor (desktop, motion-on). Sits EXACTLY on the pointer.
    if (!reduced && !touch && window.innerWidth >= 768) {
      const cur = cursorRef.current;
      if (cur) {
        document.documentElement.style.cursor = "none";
        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let px = tx;
        let rot = 0;
        let shown = false;
        const apply = () => {
          cur.style.transform =
            "translate3d(" + tx + "px," + ty + "px,0) rotate(" + rot.toFixed(2) + "deg)";
        };
        const onMove = (e: MouseEvent) => {
          tx = e.clientX;
          ty = e.clientY;
          rot = Math.max(-20, Math.min(20, (tx - px) * 0.5));
          px = tx;
          if (!shown) {
            shown = true;
            cur.style.opacity = "1";
          }
          apply();
        };
        const onOver = (e: MouseEvent) => {
          const t = e.target as HTMLElement;
          const interactive =
            t.closest && t.closest('a,button,[role="button"],input,textarea,select,[data-hit]');
          cur.style.width = interactive ? "42px" : "22px";
          cur.style.height = interactive ? "42px" : "22px";
          cur.style.margin = interactive ? "-21px 0 0 -21px" : "-11px 0 0 -11px";
        };
        const onDown = () => {
          cur.style.width = "12px";
          cur.style.height = "12px";
          cur.style.margin = "-6px 0 0 -6px";
        };
        const onUp = () => {
          cur.style.width = "22px";
          cur.style.height = "22px";
          cur.style.margin = "-11px 0 0 -11px";
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        let raf = 0;
        const loop = () => {
          rot += (0 - rot) * 0.08;
          apply();
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanup.push(() => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseover", onOver);
          window.removeEventListener("mousedown", onDown);
          window.removeEventListener("mouseup", onUp);
          cancelAnimationFrame(raf);
          document.documentElement.style.cursor = "";
        });
      }
    }

    // Scroll-progress acute marker on the right hairline.
    const marker = progressRef.current;
    if (marker) {
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        marker.style.transform = "translateY(" + p * (window.innerHeight - 13) + "px)";
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanup.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    }

    // Film-cut: intercept internal data-cut links, sweep bars closed, then route.
    const onCut = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[data-cut]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (a.target === "_blank" || !href.startsWith("/")) return;
      const base = href.split("#")[0];
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (base === pathRef.current) {
        window.scrollTo({ top: 0, behavior: reducedRef.current ? "auto" : "smooth" });
        return;
      }
      const top = topBarRef.current;
      const bot = botBarRef.current;
      if (reducedRef.current || !top || !bot) {
        router.push(href);
        return;
      }
      top.style.transition = "transform .5s " + EASE_CUT;
      bot.style.transition = "transform .5s " + EASE_CUT;
      top.style.transform = "translateY(0)";
      bot.style.transform = "translateY(0)";
      window.setTimeout(() => router.push(href), 520);
    };
    document.addEventListener("click", onCut, true);
    cleanup.push(() => document.removeEventListener("click", onCut, true));

    return () => {
      cleanup.forEach((f) => f());
    };
  }, [router]);

  // After a route change, lift the cut bars back off-screen.
  useEffect(() => {
    const top = topBarRef.current;
    const bot = botBarRef.current;
    if (!top || !bot) return;
    const id = window.setTimeout(() => {
      top.style.transition = "transform .5s " + EASE_CUT;
      bot.style.transition = "transform .5s " + EASE_CUT;
      top.style.transform = "translateY(-101%)";
      bot.style.transform = "translateY(101%)";
    }, 40);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Escape closes the menu; lock scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const menuBtnStyle: CSSProperties = {
    position: "absolute",
    top: "clamp(14px,2.4vw,30px)",
    right: "clamp(16px,2.6vw,30px)",
    pointerEvents: "auto",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "13px 16px",
    border: "1px solid " + (hovMenuBtn ? "#FFFFFF" : "rgba(255,255,255,0.34)"),
    background: hovMenuBtn ? "#FFFFFF" : "rgba(0,0,0,0.24)",
    color: hovMenuBtn ? "#000000" : "#FFFFFF",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    transition: "background .3s ease, color .3s ease, border-color .3s ease",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        color: "rgba(255,255,255,0.75)",
        fontFamily: "var(--font-bricolage), sans-serif",
      }}
    >
      {/* top scrim for corner legibility over any backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 150,
          background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0))",
          pointerEvents: "none",
        }}
      />

      {/* logo — top left (omitted on Home's landing frame; the centred
          LogoMark carries that role until scrolled past it) */}
      <Link
        href="/"
        data-cut
        aria-label="Cossé TTL — home"
        className="hov-dim"
        style={{
          position: "absolute",
          top: "clamp(16px,2.3vw,30px)",
          left: "clamp(20px,2.6vw,34px)",
          pointerEvents: pastLanding ? "auto" : "none",
          opacity: pastLanding ? 1 : 0,
          transition: "opacity .4s " + EASE_CINE,
          display: "block",
          padding: 12,
          margin: -12,
        }}
      >
        <LogoMark mode="corner" />
      </Link>

      {/* MENU button — top right */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        onMouseEnter={() => setHovMenuBtn(true)}
        onMouseLeave={() => setHovMenuBtn(false)}
        aria-label="Open menu"
        style={menuBtnStyle}
      >
        <span
          aria-hidden="true"
          style={{ display: "inline-flex", flexDirection: "column", gap: 4, width: 17 }}
        >
          <span style={{ display: "block", height: 1.5, width: "100%", background: "currentColor" }} />
          <span style={{ display: "block", height: 1.5, width: "100%", background: "currentColor" }} />
        </span>
        Menu
      </button>

      {/* bottom corners — desktop only */}
      <div className="cn-desktop" style={{ position: "absolute", bottom: "clamp(18px,2.6vw,34px)", left: "clamp(20px,2.6vw,34px)", pointerEvents: "auto" }}>
        <PersistentCTA variant="corner" />
      </div>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener"
        className="cn-desktop"
        style={{
          position: "absolute",
          bottom: "clamp(18px,2.6vw,34px)",
          right: "clamp(20px,2.6vw,34px)",
          pointerEvents: "auto",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <SwapText>Follow</SwapText>
      </a>

      {/* scroll-progress hairline + acute marker */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 1,
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          ref={progressRef}
          style={{
            position: "absolute",
            top: 0,
            right: -6,
            width: 13,
            height: 13,
            color: "#FFFFFF",
            transform: "translateY(0)",
          }}
        >
          <Acute />
        </div>
      </div>

      {/* overlay menu — a glass panel per the Lacquer system (UI-chrome scope
          only). @supports fallback in globals.css covers devices without
          backdrop-filter. */}
      <div
        className="overlay-glass"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "var(--glass-panel-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          padding: "clamp(72px,10vw,120px) clamp(20px,5vw,60px)",
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity .5s " + EASE_CINE + ", visibility .5s",
        }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="hov-dim"
          style={{
            position: "absolute",
            top: "clamp(18px,2.6vw,34px)",
            right: "clamp(20px,2.6vw,34px)",
            pointerEvents: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            padding: "13px 12px",
          }}
        >
          Close
        </button>
        <div
          style={{
            position: "absolute",
            top: "clamp(16px,2.3vw,30px)",
            left: "clamp(20px,2.6vw,34px)",
          }}
        >
          <LogoMark mode="corner" />
        </div>
        <div
          style={{
            maxWidth: 1320,
            margin: "auto",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(36px,5vw,90px)",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <nav
            aria-label="Primary"
            style={{ display: "flex", flexDirection: "column", gap: "clamp(2px,0.6vw,8px)" }}
          >
            {PRIMARY.map((l, i) => {
              const active = hovMenu === null || hovMenu === i;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cut
                  onMouseEnter={() => setHovMenu(i)}
                  onMouseLeave={() => setHovMenu(null)}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.34em",
                    width: "fit-content",
                    fontWeight: 500,
                    fontSize: "clamp(2rem,7.5vw,4.2rem)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    padding: "6px 0",
                    color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.3)",
                    transition: "color .35s ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: "0.42em",
                      height: "0.42em",
                      flex: "0 0 auto",
                      alignSelf: "center",
                      color: "#FFFFFF",
                      opacity: hovMenu === i ? 1 : 0,
                      transform: hovMenu === i ? "translateX(0px)" : "translateX(-12px)",
                      transition:
                        "opacity .35s " + EASE_CINE + ", transform .35s " + EASE_CINE,
                    }}
                  >
                    <Acute />
                  </span>
                  {l.label}
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minWidth: "min(100%,240px)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              More
            </span>
            {SECONDARY.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cut
                style={{
                  fontSize: "clamp(1.3rem,2.3vw,1.7rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  padding: "8px 0",
                  width: "fit-content",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <SwapText>{l.label}</SwapText>
              </Link>
            ))}
            <div style={{ height: 1, background: "rgba(255,255,255,0.14)", margin: "10px 0 6px" }} />
            <a
              href="mailto:newbusiness@cosse-ttl.example"
              className="hov-bright"
              style={{ fontSize: 13, letterSpacing: "0.02em", padding: "14px 0", width: "fit-content", color: "rgba(255,255,255,0.6)" }}
            >
              newbusiness@cosse-ttl.example
            </a>
            <div style={{ display: "flex", gap: 20, marginTop: 2 }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                className="hov-bright"
                style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", padding: "13px 0", color: "rgba(255,255,255,0.5)" }}
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                className="hov-bright"
                style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", padding: "13px 0", color: "rgba(255,255,255,0.5)" }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <p
          style={{
            position: "absolute",
            bottom: "clamp(20px,4vw,40px)",
            left: "clamp(20px,5vw,60px)",
            right: "clamp(20px,5vw,60px)",
            margin: 0,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Integrated Marketing Communications — Lagos, Nigeria
        </p>
      </div>

      {/* film-cut slate bars */}
      <div
        ref={topBarRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          height: "51%",
          background: "#000000",
          zIndex: 92,
          transform: "translateY(-101%)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={botBarRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "51%",
          background: "#000000",
          zIndex: 92,
          transform: "translateY(101%)",
          pointerEvents: "none",
        }}
      />

      {/* acute custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 22,
          height: 22,
          margin: "-11px 0 0 -11px",
          color: "#FFFFFF",
          zIndex: 95,
          pointerEvents: "none",
          opacity: 0,
          transition:
            "opacity .25s ease, width .22s " +
            EASE_CINE +
            ", height .22s " +
            EASE_CINE +
            ", margin .22s " +
            EASE_CINE,
        }}
      >
        <Acute strokeWidth={2.4} />
      </div>

      {/* acute loader */}
      <div
        ref={loaderRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ display: "block", width: 32, height: 32, color: "#FFFFFF", transform: "rotate(-12deg)" }}>
          <Acute />
        </span>
      </div>
    </div>
  );
}
