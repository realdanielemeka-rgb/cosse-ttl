/*
 * LoadMore — reveals the next batch of items from content.ts. The calling
 * page owns the visible-count state and focus management (moving focus to
 * the first newly-revealed item is page-specific, since it needs the grid's
 * DOM refs); this component is the button + its expanded-state semantics.
 */
export default function LoadMore({
  onLoad,
  expanded,
  label = "Load more",
}: {
  onLoad: () => void;
  expanded: boolean;
  label?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(40px,5vw,64px)" }}>
      <button
        type="button"
        onClick={onLoad}
        aria-expanded={expanded}
        className="lacquer lacquer-sweep btn-outline-glass"
        style={{
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          background: "none",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "18px 40px",
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    </div>
  );
}
