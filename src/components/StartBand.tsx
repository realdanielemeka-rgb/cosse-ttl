import Link from "next/link";
import Acute from "./Acute";

/*
 * StartBand — the reusable "Start a project" close that ends every page.
 * "Start a project" is never more than one move away.
 */
export default function StartBand({
  kicker = "Start a project",
  title = "Let’s find the truth in it.",
  sub = "You bring the business problem. We’ll find the simple human truth inside it — and build the total brand experience around it.",
}: {
  kicker?: string;
  title?: string;
  sub?: string;
}) {
  return (
    <section
      id="start"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: "clamp(96px,15vh,200px) clamp(20px,5vw,60px)",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/grain.png)",
          backgroundSize: "220px",
          opacity: 0.35,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(90vw,900px)",
          height: "min(90vw,900px)",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 62%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span aria-hidden="true" style={{ display: "inline-block", width: 11, height: 11, color: "#FFFFFF" }}>
            <Acute />
          </span>
          {kicker}
        </span>
        <h2
          style={{
            fontWeight: 500,
            fontSize: "clamp(2.6rem,7vw,5.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: "22px 0 0",
            textWrap: "balance",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "clamp(1.05rem,1.7vw,1.3rem)",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.6)",
            margin: "22px auto 0",
            maxWidth: "48ch",
          }}
        >
          {sub}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 18px",
            justifyContent: "center",
            marginTop: "clamp(36px,4vw,52px)",
          }}
        >
          <Link
            href="/contact"
            data-cut
            className="hov-soft"
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#000000",
              background: "#FFFFFF",
              padding: "19px 38px",
            }}
          >
            Ready to work with us?
          </Link>
          <Link
            href="/work"
            data-cut
            className="btn-outline-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "19px 32px",
            }}
          >
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
