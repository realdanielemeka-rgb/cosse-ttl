import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import SwapText from "@/components/SwapText";
import Footer from "@/components/Footer";
import { careers, contact } from "@/content";

export const metadata: Metadata = {
  title: "Careers",
  description: "Come do the best work of your life. Open roles at Cossé TTL, Lagos.",
  openGraph: {
    title: "Careers — Cossé TTL",
    description: "Come do the best work of your life. Open roles at Cossé TTL, Lagos.",
  },
};

const eyebrow = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
} as const;

export default function CareersPage() {
  const careersEmail = contact.careersEmail;
  const roles = careers.roles.map((r) => ({
    ...r,
    href:
      "mailto:" +
      careersEmail +
      "?subject=" +
      encodeURIComponent("Application: " + r.title),
  }));
  const openHref =
    "mailto:" + careersEmail + "?subject=" + encodeURIComponent("Introduction");

  return (
    <main style={{ background: "#000000" }}>
      {/* HERO */}
      <header
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0A0A0A",
          padding: "clamp(140px,20vh,240px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)",
        }}
      >
        <Grain opacity={0.35} />
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto" }}>
          <Reveal as="p" style={{ ...eyebrow, margin: 0 }}>
            Careers
          </Reveal>
          <Reveal
            as="h1"
            delay={120}
            dur={0.9}
            weight={[340, 700]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.6rem,6.8vw,5.4rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "16ch",
              marginLeft: "-0.04em",
            }}
          >
            {careers.lead}
          </Reveal>
        </div>
      </header>

      {/* CULTURE */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(36px,5vw,56px)", maxWidth: 600 }}>
            <span style={eyebrow}>Why here</span>
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
              A room worth being in.
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
            {careers.culture.map((c) => (
              <Reveal key={c.t} className="card-sheen card-lift" style={{ background: "#000000", padding: "clamp(28px,3vw,42px)" }}>
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
                  {c.t}
                </h3>
                <p
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.55)",
                    margin: "14px 0 0",
                  }}
                >
                  {c.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 16,
              marginBottom: "clamp(28px,4vw,44px)",
            }}
          >
            <div>
              <span style={eyebrow}>Open roles</span>
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
                Where you fit.
              </h2>
            </div>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Lagos · on-site
            </span>
          </Reveal>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
            {roles.map((r) => (
              <Reveal
                key={r.title}
                as="a"
                href={r.href}
                className="hov-rowfill"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "14px 28px",
                  padding: "clamp(22px,2.6vw,32px) clamp(8px,1.4vw,20px)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  textDecoration: "none",
                  color: "#FFFFFF",
                }}
              >
                <h3
                  style={{
                    flex: "1 1 280px",
                    fontWeight: 600,
                    fontSize: "clamp(1.3rem,2.4vw,1.9rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {r.title}
                </h3>
                <span
                  style={{
                    flex: "0 0 auto",
                    minWidth: 120,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {r.team}
                </span>
                <span
                  style={{
                    flex: "0 0 auto",
                    minWidth: 90,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {r.type}
                </span>
                <span
                  style={{
                    flex: "0 0 auto",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <SwapText>Apply →</SwapText>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN APPLICATION */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(90px,13vw,180px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          textAlign: "center",
        }}
      >
        <Reveal style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={eyebrow}>No perfect fit?</span>
          <h2
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.2rem,5.4vw,4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "22px 0 0",
              textWrap: "balance",
            }}
          >
            Introduce yourself anyway.
          </h2>
          <p
            style={{
              fontSize: "clamp(1.05rem,1.6vw,1.25rem)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.6)",
              margin: "20px auto 0",
              maxWidth: "46ch",
            }}
          >
            We hire for heart and range. If that&apos;s you, we want to know.
          </p>
          <div style={{ marginTop: "clamp(34px,4vw,48px)" }}>
            <a
              href={openHref}
              className="btn-sheen"
              style={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#000000",
                padding: "19px 38px",
              }}
            >
              Email {careersEmail}
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
