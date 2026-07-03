import type { CSSProperties, ReactNode } from "react";

/*
 * Placeholder — the content-integrity wrapper. Anything real client copy
 * hasn't supplied yet renders through here: a dashed hairline border, the
 * content itself dimmed, and a small tracked caption naming it as pending.
 * Never silently invented, never shippable by accident.
 */
export default function Placeholder({
  children,
  caption = "PLACEHOLDER — CLIENT TO SUPPLY",
  style,
  contentStyle,
  className,
}: {
  children: ReactNode;
  caption?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        border: "1px dashed var(--line)",
        padding: "clamp(28px,4vw,48px)",
        ...style,
      }}
    >
      <div style={{ opacity: 0.55, ...contentStyle }}>{children}</div>
      <span
        style={{
          display: "block",
          marginTop: "clamp(20px,3vw,28px)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {caption}
      </span>
    </div>
  );
}
