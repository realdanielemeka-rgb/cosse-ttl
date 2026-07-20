import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { capabilities, method } from "@/content";

export const metadata: Metadata = {
  title: "We Do",
  description:
    "Six practices under one roof: brand, media, experiential, social, public sector and production. We plan it, make it and run it.",
  openGraph: {
    title: "We Do — Cossé TTL",
    description:
      "Six practices under one roof: brand, media, experiential, social, public sector and production. We plan it, make it and run it.",
  },
};

export default function CapabilitiesPage() {
  const caps = capabilities.map((cap, i) => ({
    ...cap,
    num: String(i + 1).padStart(2, "0"),
  }));

  return (
    <main style={{ background: "#000000" }}>
      {/* HERO */}
      <header
        style={{
          background: "#000000",
          padding:
            "clamp(132px,18vh,220px) clamp(20px,5vw,60px) clamp(48px,6vw,80px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            as="p"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}
          >
            We Do
          </Reveal>
          <Reveal
            as="h1"
            delay={120}
            dur={0.9}
            weight={[340, 680]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.6rem,6.4vw,5.2rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "18ch",
              marginLeft: "-0.04em",
            }}
          >
            We plan it, make it and run it.
          </Reveal>
          <Reveal
            as="p"
            delay={260}
            style={{
              fontSize: "clamp(1.15rem,2vw,1.6rem)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.6)",
              margin: "28px 0 0",
              maxWidth: "46ch",
            }}
          >
            Six practices under one roof. Integrated by default, so the idea
            stays whole from the first insight to the last execution.
          </Reveal>
        </div>
      </header>

      {/* PRACTICES */}
      <section
        style={{
          background: "#000000",
          padding:
            "clamp(20px,3vw,40px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {caps.map((cap) => (
            <Reveal
              key={cap.num}
              className="row-hover"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(20px,4vw,64px)",
                padding: "clamp(34px,4.5vw,64px) clamp(12px,1.4vw,20px)",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div style={{ flex: "1 1 280px", minWidth: 240 }}>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {cap.num}
                </span>
                <h2
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1.8rem,3.4vw,2.8rem)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.025em",
                    color: "#FFFFFF",
                    margin: "14px 0 0",
                  }}
                >
                  {cap.name}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1rem,1.4vw,1.18rem)",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.6)",
                    margin: "16px 0 0",
                    maxWidth: "38ch",
                  }}
                >
                  {cap.scope}
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 320px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                  paddingTop: 6,
                }}
              >
                {cap.includes.map((inc) => (
                  <span
                    key={inc}
                    style={{
                      fontSize: "clamp(0.85rem,1.2vw,0.98rem)",
                      letterSpacing: "0.01em",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      padding: "11px 18px",
                    }}
                  >
                    {inc}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* METHOD */}
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
              marginBottom: "clamp(28px,4vw,52px)",
              maxWidth: 640,
            }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              How we work
            </span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(2.1rem,4.6vw,3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                margin: "18px 0 0",
              }}
            >
              Seven moves, every time.
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem,1.4vw,1.15rem)",
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.55)",
                margin: "20px 0 0",
              }}
            >
              The same spine runs through every brief — and through every case
              study on this site.
            </p>
          </Reveal>
          <div>
            {method.map((step) => (
              <Reveal
                key={step.n}
                className="row-hover"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "clamp(16px,3vw,48px)",
                  padding: "clamp(22px,2.6vw,34px) clamp(12px,1.4vw,20px)",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span
                  style={{
                    flex: "0 0 auto",
                    width: 48,
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {step.n}
                </span>
                <h3
                  style={{
                    flex: "1 1 220px",
                    fontWeight: 500,
                    fontSize: "clamp(1.7rem,3.6vw,2.8rem)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {step.name}
                </h3>
                <p
                  style={{
                    flex: "2 1 320px",
                    fontWeight: 400,
                    fontSize: "clamp(0.98rem,1.4vw,1.15rem)",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                  }}
                >
                  {step.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StartBand
        title="Bring us the brief."
        sub="Tell us the business problem. We'll show you the practices — and the people — that solve it."
      />
      <Footer />
    </main>
  );
}
