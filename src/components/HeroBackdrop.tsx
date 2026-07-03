import Acute from "./Acute";

// 10 oversized, heavily-blurred acute marks — fixed (not random) positions so
// server and client render identically. Independent, unsynced durations via
// negative animation-delay (each starts mid-cycle rather than bursting
// together on load).
const PARTICLES = [
  { top: "4%", left: "8%", size: "28vh", blur: 60, dur: "78s", delay: "-12s", op: 0.08 },
  { top: "58%", left: "84%", size: "20vh", blur: 50, dur: "92s", delay: "-34s", op: 0.06 },
  { top: "78%", left: "14%", size: "35vh", blur: 75, dur: "105s", delay: "-50s", op: 0.07 },
  { top: "14%", left: "68%", size: "18vh", blur: 45, dur: "68s", delay: "-20s", op: 0.09 },
  { top: "42%", left: "46%", size: "40vh", blur: 80, dur: "118s", delay: "-60s", op: 0.05 },
  { top: "70%", left: "56%", size: "22vh", blur: 55, dur: "85s", delay: "-5s", op: 0.08 },
  { top: "24%", left: "28%", size: "16vh", blur: 42, dur: "72s", delay: "-40s", op: 0.09 },
  { top: "88%", left: "88%", size: "25vh", blur: 65, dur: "96s", delay: "-25s", op: 0.06 },
  { top: "6%", left: "48%", size: "19vh", blur: 48, dur: "110s", delay: "-70s", op: 0.07 },
  { top: "52%", left: "4%", size: "30vh", blur: 70, dur: "88s", delay: "-15s", op: 0.08 },
];

/*
 * HeroBackdrop — the Home landing's abstract, code-generated field. Never a
 * specific client commercial or licensed footage stand-in: 8–14 oversized
 * acute-glyph shapes, heavily blurred, drifting independently and slowly. A
 * dark vignette sits over the field so the crisp LogoMark reads clearly on
 * top — soft blur behind, sharp mark in front.
 */
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hb-particle"
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            color: "#FFF6E8",
            opacity: p.op,
            filter: `blur(${p.blur}px)`,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        >
          <Acute strokeWidth={2} />
        </span>
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}
