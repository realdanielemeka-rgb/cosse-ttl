import Acute from "./Acute";

// Sparse, deliberately off-centre so the drifting marks never compete with
// the logo/type sitting in the middle of the cover. Fixed (not random) so
// server and client render identically — no hydration mismatch.
const MARKS = [
  { top: "14%", left: "9%", size: 20, delay: "0s", dur: "16s" },
  { top: "22%", left: "84%", size: 14, delay: "-4s", dur: "13s" },
  { top: "68%", left: "6%", size: 16, delay: "-9s", dur: "18s" },
  { top: "78%", left: "90%", size: 22, delay: "-2s", dur: "15s" },
  { top: "40%", left: "94%", size: 12, delay: "-7s", dur: "12s" },
  { top: "86%", left: "40%", size: 14, delay: "-12s", dur: "17s" },
  { top: "10%", left: "48%", size: 12, delay: "-5s", dur: "14s" },
];

/*
 * AbstractField — the cover's abstract backdrop, replacing real footage.
 * Two large, slow-drifting soft light blobs (the "sheen") plus a sparse
 * field of the acute brand glyph, faint and always behind the type. Pure
 * CSS (GPU-cheap), fully stands down under prefers-reduced-motion.
 */
export default function AbstractField() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div className="af-blob af-blob-a" />
      <div className="af-blob af-blob-b" />
      {MARKS.map((m, i) => (
        <span
          key={i}
          className="af-mark"
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            animationDelay: m.delay,
            animationDuration: m.dur,
          }}
        >
          <Acute strokeWidth={2} />
        </span>
      ))}
    </div>
  );
}
