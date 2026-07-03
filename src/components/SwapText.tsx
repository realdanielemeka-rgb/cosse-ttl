/*
 * SwapText — a premium nav-hover idiom: two stacked copies of a label inside
 * an overflow-hidden mask; the parent link's hover slides the mask up one
 * line-height, so the label appears to swap rather than merely dim. Purely
 * decorative (aria-hidden duplicate); the real accessible label is the
 * enclosing link's own text content via sr-only semantics on the first copy.
 */
export default function SwapText({ children }: { children: string }) {
  return (
    <span
      className="swap-text"
      style={{ display: "inline-block", overflow: "hidden", height: "1.2em", verticalAlign: "top" }}
    >
      <span className="swap-text-inner" style={{ display: "block" }}>
        <span style={{ display: "block", lineHeight: "1.2em" }}>{children}</span>
        <span aria-hidden="true" style={{ display: "block", lineHeight: "1.2em" }}>
          {children}
        </span>
      </span>
    </span>
  );
}
