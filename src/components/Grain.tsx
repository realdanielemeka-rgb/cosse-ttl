import type { CSSProperties } from "react";

/* Archival film-grain overlay — the only texture device on the dark UI. */
export default function Grain({
  size = 220,
  opacity = 0.4,
  blend = true,
  drift = false,
  style,
}: {
  size?: number;
  opacity?: number;
  blend?: boolean;
  drift?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/grain.png)",
        backgroundSize: `${size}px`,
        opacity,
        mixBlendMode: blend ? "overlay" : undefined,
        animation: drift ? "grainDrift 42s linear infinite" : undefined,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
