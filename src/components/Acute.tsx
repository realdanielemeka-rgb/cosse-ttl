import type { CSSProperties } from "react";

/*
 * The acute (´) — the brand glyph, extracted from the É in "Cossé".
 * One shape, reused as loader, cursor, hover tick, filter tick, scroll marker
 * and section accent. Paints with currentColor so the parent controls colour.
 */
export default function Acute({
  strokeWidth = 2.6,
  style,
}: {
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="9"
        x2="9"
        y2="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
