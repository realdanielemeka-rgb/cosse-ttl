"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  /** stagger, applied as transition-delay (ms) */
  delay?: number;
  /** distance to rise from (px) */
  y?: number;
  /** resting transform once shown (e.g. "translateX(-50%)") */
  rest?: string;
  /** transition duration (s) */
  dur?: number;
  /** weight-settle: [from, to] variable-font weight */
  weight?: [number, number];
  style?: CSSProperties;
  className?: string;
  // pass-throughs (id, href, role, aria-*, etc.)
  [key: string]: unknown;
};

/*
 * Scroll-reveal primitive — fade + rise (+ optional weight-settle), once.
 * Mirrors the prototype's reveal system but is React-stateful, so a parent
 * re-render (hover, form input) never resets an already-revealed element.
 * Respects prefers-reduced-motion and carries a real-time failsafe. Forwards
 * its ref (merged with the internal intersection-observer ref) so callers
 * can manage focus on the rendered element (e.g. LoadMore reveals).
 */
const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(props: RevealProps, forwardedRef) {
  const { as = "div", children, delay = 0, y = 16, rest = "none", dur = 0.8, weight, style, className, ...passthrough } = props;
  const innerRef = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  const setRefs = (el: HTMLElement | null) => {
    innerRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) (forwardedRef as { current: HTMLElement | null }).current = el;
  };

  useEffect(() => {
    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (mq && mq.matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const el = innerRef.current;
    if (!el) {
      setShown(true);
      return;
    }
    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              setShown(true);
              if (io) io.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -7% 0px" }
      );
      io.observe(el);
    } catch {
      setShown(true);
    }
    // Real-time failsafe — nothing ever stays hidden if the timeline throttles.
    const failsafe = window.setTimeout(() => setShown(true), 2500);
    return () => {
      if (io) io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const restFull = rest === "none" ? "" : rest;
  const transform = shown ? rest : `${restFull} translateY(${y}px)`.trim();

  const transitions = [`opacity ${dur}s ${EASE}`, `transform ${dur}s ${EASE}`];
  if (weight) transitions.push(`font-variation-settings ${Math.max(dur, 0.9)}s ${EASE}`);

  const computed: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform,
    transition: reduced ? "none" : transitions.join(", "),
    transitionDelay: reduced ? undefined : `${delay}ms`,
    ...(weight ? { fontVariationSettings: `'wght' ${shown ? weight[1] : weight[0]}` } : {}),
    ...style,
  };

  const Tag = as as ElementType;
  return (
    <Tag ref={setRefs} className={className} style={computed} {...passthrough}>
      {children}
    </Tag>
  );
});

export default Reveal;
