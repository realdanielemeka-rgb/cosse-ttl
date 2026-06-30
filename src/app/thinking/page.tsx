import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { thinking } from "@/content";

export const metadata: Metadata = {
  title: "Thinking",
  description: "Points of view on culture, strategy, media and craft from Cossé TTL.",
  openGraph: {
    title: "Thinking — Cossé TTL",
    description: "Points of view on culture, strategy, media and craft from Cossé TTL.",
  },
};

export default function ThinkingPage() {
  const arts = thinking.map((x) => ({ ...x, meta: x.date + " · " + x.read }));
  const featured = arts[0];
  const rest = arts.slice(1).map((x, i) => ({ ...x, d: (i % 3) * 80 }));

  return (
    <main style={{ background: "#000000" }}>
      {/* HERO */}
      <header
        style={{
          background: "#000000",
          padding: "clamp(132px,18vh,220px) clamp(20px,5vw,60px) clamp(40px,5vw,64px)",
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
            Thinking
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
            Points of view, sharply held.
          </Reveal>
          <Reveal
            as="p"
            delay={260}
            style={{
              fontSize: "clamp(1.1rem,1.8vw,1.5rem)",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.6)",
              margin: "26px 0 0",
              maxWidth: "50ch",
            }}
          >
            How we read culture, markets and craft. Challenger thinking, written down.
          </Reveal>
        </div>
      </header>

      {/* FEATURED */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(24px,3vw,40px) clamp(20px,5vw,60px) clamp(20px,3vw,36px)",
        }}
      >
        <Reveal style={{ maxWidth: 1320, margin: "0 auto" }}>
          <article
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "clamp(32px,5vw,72px)",
              display: "flex",
              flexDirection: "column",
              minHeight: "clamp(320px,38vw,460px)",
              justifyContent: "flex-end",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-4%",
                right: "clamp(10px,3vw,48px)",
                fontWeight: 700,
                fontSize: "clamp(8rem,22vw,18rem)",
                lineHeight: 0.8,
                color: "rgba(255,255,255,0.035)",
                letterSpacing: "-0.05em",
                pointerEvents: "none",
              }}
            >
              01
            </span>
            <Grain opacity={0.4} />
            <span
              style={{
                position: "absolute",
                top: "clamp(24px,3vw,40px)",
                left: "clamp(32px,5vw,72px)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Featured · {featured.kicker}
            </span>
            <div style={{ position: "relative", maxWidth: 760 }}>
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(2rem,4.6vw,3.6rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  fontSize: "clamp(1.05rem,1.6vw,1.3rem)",
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.65)",
                  margin: "18px 0 0",
                  maxWidth: "56ch",
                }}
              >
                {featured.dek}
              </p>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 24,
                }}
              >
                {featured.author} · {featured.meta}
              </span>
            </div>
          </article>
        </Reveal>
      </section>

      {/* INDEX */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(20px,3vw,36px) clamp(20px,5vw,60px) clamp(60px,8vw,110px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {rest.map((a) => (
            <Reveal
              as="article"
              key={a.title}
              delay={a.d}
              style={{
                background: "#000000",
                padding: "clamp(28px,3vw,42px)",
                display: "flex",
                flexDirection: "column",
                minHeight: "clamp(240px,24vw,300px)",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {a.kicker}
              </span>
              <h3
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(1.4rem,2.1vw,1.85rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                  margin: "18px 0 0",
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.55)",
                  margin: "14px 0 0",
                }}
              >
                {a.dek}
              </p>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "auto",
                  paddingTop: 22,
                }}
              >
                {a.author} · {a.meta}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal
          as="p"
          style={{
            maxWidth: 1320,
            margin: "clamp(28px,3vw,40px) auto 0",
            fontSize: "0.92rem",
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Full essays are placeholders in this prototype — real articles and author pages slot in at production.
        </Reveal>
      </section>

      <StartBand
        kicker="Work with us"
        title="Like how we think? Let's apply it."
        sub="The point of view is free. Putting it to work on your business is the fun part."
      />
      <Footer />
    </main>
  );
}
