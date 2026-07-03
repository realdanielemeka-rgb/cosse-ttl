import type { CSSProperties } from "react";
import Link from "next/link";
import Acute from "./Acute";

/*
 * PersistentCTA — "Start a project," formalised. Built entirely from Cossé's
 * own Acute glyph: an idle micro-pulse on the icon (the acute-as-moving-agent
 * signature, at rest) and a Lacquer sweep on hover. Two variants: `corner`
 * (fixed-nav scale) and `inline` (larger, embeddable — e.g. Home's close).
 */
export default function PersistentCTA({
  variant = "corner",
  label = "Start a project",
  className,
  style,
}: {
  variant?: "corner" | "inline";
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const isInline = variant === "inline";
  return (
    <Link
      href="/contact"
      data-cut
      className={["lacquer", "lacquer-sweep", "pcta", className].filter(Boolean).join(" ")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isInline ? 14 : 10,
        fontSize: isInline ? 13 : 12,
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#FFFFFF",
        border: "1px solid rgba(255,255,255,0.34)",
        background: "rgba(0,0,0,0.45)",
        padding: isInline ? "22px 42px" : "13px 18px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        className="pcta-pulse"
        style={{ display: "inline-block", width: isInline ? 16 : 11, height: isInline ? 16 : 11, color: "#FFFFFF" }}
      >
        <Acute />
      </span>
      {label}
    </Link>
  );
}
