import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { studio, capabilities } from "@/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "One integrated room in Lagos. Strategy, creative, media, production and activation at the same table — total brand experiences, built whole.",
  openGraph: {
    title: "Studio — Cossé TTL",
    description: "One integrated room in Lagos. Total brand experiences, built whole.",
  },
};

const eyebrow = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
} as const;

export default function StudioPage() {
  const craft = capabilities.map((c) => c.name);

  return (
    <main style={{ background: "#000000" }}>
      {/* HERO */}
      <header
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0A0A0A",
          padding: "clamp(132px,18vh,220px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)",
        }}
      >
        <Grain opacity={0.32} />
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto" }}>
          <Reveal as="p" style={{ ...eyebrow, margin: 0 }}>
            Studio
          </Reveal>
          <Reveal
            as="h1"
            delay={120}
            dur={0.9}
            weight={[340, 700]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.5rem,6.2vw,5rem)",
              lineHeight: 0.99,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "16ch",
              marginLeft: "-0.04em",
            }}
          >
            {studio.lead}
          </Reveal>
          <Reveal
            as="p"
            delay={260}
            style={{
              fontSize: "clamp(1.15rem,1.9vw,1.5rem)",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.62)",
              margin: "26px 0 0",
              maxWidth: "54ch",
            }}
          >
            {studio.intro}
          </Reveal>
        </div>
      </header>

      {/* THE ROOM / WAYS OF WORKING */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(36px,5vw,56px)", maxWidth: 600 }}>
            <span style={eyebrow}>How the room works</span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(2rem,4.4vw,3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                margin: "18px 0 0",
              }}
            >
              Integrated isn&apos;t a service line. It&apos;s the seating plan.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {studio.ways.map((w) => (
              <Reveal key={w.t} className="card-sheen card-lift" style={{ background: "#000000", padding: "clamp(28px,3vw,42px)" }}>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1.35rem,2.1vw,1.7rem)",
                    lineHeight: 1.14,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {w.t}
                </h3>
                <p
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.55)",
                    margin: "14px 0 0",
                  }}
                >
                  {w.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MADE IN-HOUSE / CRAFT */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px,5vw,80px)",
            alignItems: "flex-start",
          }}
        >
          <Reveal style={{ flex: "1 1 320px", maxWidth: 460 }}>
            <span style={eyebrow}>Made in-house</span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(2rem,4.4vw,3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                margin: "18px 0 0",
              }}
            >
              Craft we control, end to end.
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem,1.4vw,1.15rem)",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.6)",
                margin: "18px 0 0",
              }}
            >
              Every discipline lives in the building, so quality never gets lost in a hand-off.
            </p>
            <Link
              href="/capabilities"
              data-cut
              className="hov-bright"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 24,
                padding: "13px 0",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              See capabilities <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal
            delay={120}
            style={{
              flex: "1.3 1 360px",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignContent: "flex-start",
              paddingTop: 8,
            }}
          >
            {craft.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: "clamp(0.95rem,1.4vw,1.15rem)",
                  letterSpacing: "0.01em",
                  color: "rgba(255,255,255,0.82)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "13px 22px",
                }}
              >
                {c}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* THE PLACE / LAGOS */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#000000",
          padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-6%",
            right: "clamp(10px,3vw,52px)",
            fontWeight: 700,
            fontSize: "clamp(7rem,20vw,17rem)",
            lineHeight: 0.8,
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.05em",
            pointerEvents: "none",
          }}
        >
          LAGOS
        </span>
        <Grain opacity={0.3} />
        <Reveal style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <span style={eyebrow}>The place · {studio.place.city}</span>
          <h2
            style={{
              fontWeight: 500,
              fontSize: "clamp(2rem,5vw,3.8rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "22px 0 0",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            {studio.place.line}
          </h2>
        </Reveal>
      </section>

      {/* CAREERS NUDGE */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(72px,9vw,130px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Reveal
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "32ch" }}>
            <span style={eyebrow}>Work here</span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(1.9rem,4vw,3rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                margin: "16px 0 0",
              }}
            >
              The room is only as good as the people in it.
            </h2>
          </div>
          <Link
            href="/careers"
            data-cut
            className="btn-outline-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "18px 30px",
              whiteSpace: "nowrap",
            }}
          >
            See open roles <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <StartBand
        title="Want to work in this room?"
        sub="Bring us a brief, or bring us your career. Either way, let's talk."
      />
      <Footer />
    </main>
  );
}
