"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";

// The real, client-supplied Cossé script mark — processed to a bolder,
// higher-contrast, supersampled master. Not a placeholder or fabricated
// stand-in; see README for provenance.
const SRC = "/cosse-white-bold.png";
const NATIVE_W = 1060;
const NATIVE_H = 548;

/*
 * LogoMark — the one real logo asset, rendered in two modes:
 *  - "hero": large, bold, centered (Home landing only)
 *  - "corner": small lockup (CornerNav, everywhere else)
 * If the asset ever fails to load, this renders a clearly bordered
 * placeholder frame rather than fabricating a stand-in mark.
 */
export default function LogoMark({
  mode = "corner",
  style,
}: {
  mode?: "hero" | "corner";
  style?: CSSProperties;
}) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    const frame: CSSProperties =
      mode === "hero"
        ? { width: "clamp(240px,44vw,560px)", height: "clamp(124px,22vw,290px)" }
        : { width: 140, height: 36 };
    return (
      <div
        role="img"
        aria-label="Cossé logo — asset pending"
        style={{
          ...frame,
          border: "1px dashed var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          ...style,
        }}
      >
        <span
          style={{
            fontSize: mode === "hero" ? 12 : 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          [Cossé logo — drop SVG/PNG here]
        </span>
      </div>
    );
  }

  const imgStyle: CSSProperties =
    mode === "hero"
      ? { display: "block", width: "clamp(240px,44vw,620px)", height: "auto", margin: "0 auto", ...style }
      : { display: "block", height: "clamp(34px,3.4vw,48px)", width: "auto", ...style };

  return (
    <Image
      src={SRC}
      alt="Cossé"
      width={NATIVE_W}
      height={NATIVE_H}
      priority={mode === "hero"}
      onError={() => setBroken(true)}
      style={imgStyle}
    />
  );
}
