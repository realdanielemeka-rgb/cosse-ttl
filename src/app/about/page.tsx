import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { about, values, clients } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in Lagos in 1995. Thirty years turning simple human truths into total brand experiences.",
  openGraph: {
    title: "About — Cossé TTL",
    description:
      "Founded in Lagos in 1995. Thirty years turning simple human truths into total brand experiences.",
  },
};

const eyebrow = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
} as const;

export default function AboutPage() {
  const lead = about.lead;
  const stats = about.stats;
  const clientItems = clients.map((x) => ({ file: x.file, name: x.name }));

  return (
    <main style={{ background: "#000000" }}>
      {/* HERO */}
      <header
        style={{
          background: "#000000",
          padding: "clamp(132px,18vh,220px) clamp(20px,5vw,60px) clamp(48px,6vw,80px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            as="h1"
            delay={120}
            dur={0.9}
            weight={[340, 680]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.4rem,5.6vw,4.8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "20ch",
              marginLeft: "-0.04em",
            }}
          >
            {lead}
          </Reveal>
        </div>
      </header>

      {/* STORY + STATS */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(40px,6vw,90px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(40px,6vw,96px)",
          }}
        >
          <Reveal
            style={{
              flex: "1.4 1 460px",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px,2.4vw,30px)",
            }}
          >
            <span style={eyebrow}>{about.storyHeading}</span>
          </Reveal>
          <Reveal
            delay={120}
            style={{
              flex: "1 1 280px",
              alignSelf: "flex-start",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 1,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {stats.map((s) => (
              <div key={s.figure} className="lacquer" style={{ background: "#000000", padding: "clamp(24px,2.6vw,34px)" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1.9rem,3.4vw,2.6rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                  }}
                >
                  {s.figure}
                </div>
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.4,
                    color: "rgba(255,255,255,0.55)",
                    margin: "12px 0 0",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* VALUES / DNA */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(36px,5vw,56px)", maxWidth: 600 }}>
            <span style={eyebrow}>{about.dnaHeading}</span>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {values.map((v) => (
              <Reveal key={v.word} className="lacquer card-lift" style={{ background: "#000000", padding: "clamp(28px,3vw,40px)" }}>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1.4rem,2.2vw,1.8rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {v.word}
                </h3>
                <p
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.55)",
                    margin: "12px 0 0",
                  }}
                >
                  {v.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
              gap: "clamp(12px,1.4vw,18px)",
            }}
          >
            {clientItems.map((c) => (
              <img
                key={c.file}
                src={c.file}
                alt={c.name + " — client logo"}
                decoding="async"
                style={{
                  width: "100%",
                  aspectRatio: "380/220",
                  objectFit: "contain",
                  background: "#FFFFFF",
                  borderRadius: 5,
                  display: "block",
                }}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* CAREERS TEASER */}
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
          <div style={{ maxWidth: "30ch" }}>
            <span style={eyebrow}>Careers</span>
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
              Come do the best work of your life.
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
        title="Now you know us, let's work together."
        sub="Thirty years of finding the truth in a business problem. Bring us yours."
      />
      <Footer />
    </main>
  );
}
