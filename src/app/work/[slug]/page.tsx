import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import Footer from "@/components/Footer";
import { cases, getCase, nextCase } from "@/content";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return { title: "Case Study" };
  return {
    title: c.title,
    description: `${c.client} · ${c.year} — ${c.idea}`,
    openGraph: { title: `${c.title} — Cossé TTL`, description: c.idea },
  };
}

const numLabel = {
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
} as const;

const sectionPad = "clamp(72px,10vw,150px) clamp(20px,5vw,60px)";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!cases.some((c) => c.slug === slug)) notFound();

  const c = getCase(slug);
  const nx = nextCase(c.slug);
  const sp = c.spine;
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const credits = [
    { tc: "00:01", label: "Agency · Cossé TTL" },
    { tc: "00:09", label: "Client · " + c.client },
    { tc: "00:18", label: "Year · " + c.year },
    { tc: "00:27", label: "Direction · placeholder" },
  ];
  const primaryTag = (c.tags && c.tags[0]) || c.discipline;

  return (
    <main style={{ background: "#000000" }}>
      <article>
        {/* HERO (full-bleed) */}
        <header
          style={{
            position: "relative",
            minHeight: "92svh",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
            background: "#141414",
            padding: "clamp(96px,12vh,150px) clamp(20px,5vw,60px) clamp(40px,6vw,72px)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "6%",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 700,
              fontSize: "clamp(7rem,26vw,22rem)",
              lineHeight: 0.8,
              color: "rgba(255,255,255,0.04)",
              letterSpacing: "-0.05em",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {c.keyword}
          </span>
          <Grain opacity={0.4} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)",
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "clamp(96px,12vh,140px)",
              left: "clamp(20px,5vw,60px)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Case film — placeholder
          </span>

          <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
            <Reveal
              as="p"
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                margin: 0,
              }}
            >
              {c.client} · {c.year} · {primaryTag}
            </Reveal>
            <Reveal
              as="h1"
              delay={140}
              dur={0.9}
              weight={[420, 700]}
              style={{
                fontWeight: 600,
                fontSize: "clamp(2.6rem,7.6vw,5.6rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: "18px 0 0",
                marginLeft: "-0.05em",
                maxWidth: "18ch",
              }}
            >
              {c.title}
            </Reveal>
            <Reveal
              as="p"
              delay={320}
              style={{
                fontWeight: 400,
                fontSize: "clamp(1.15rem,2.2vw,1.7rem)",
                lineHeight: 1.34,
                color: "rgba(255,255,255,0.75)",
                margin: "22px 0 0",
                maxWidth: "34ch",
              }}
            >
              {c.idea}
            </Reveal>
            <Reveal
              delay={460}
              style={{ display: "flex", flexWrap: "wrap", gap: "7px 26px", marginTop: "clamp(28px,4vw,46px)" }}
            >
              {credits.map((cr) => (
                <span
                  key={cr.tc}
                  style={{
                    fontFamily: "var(--font-space-mono), ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.85)" }}>{cr.tc}</span> — {cr.label}
                </span>
              ))}
            </Reveal>
          </div>
        </header>

        {/* 01 CHALLENGE */}
        <section style={{ background: "#000000", padding: sectionPad }}>
          <Reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ ...numLabel, margin: "0 0 clamp(28px,4vw,48px)" }}>01 — Challenge</p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
                lineHeight: 1.28,
                letterSpacing: "-0.015em",
                color: "rgba(255,255,255,0.92)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {sp.challenge}
            </p>
          </Reveal>
        </section>

        {/* 02 HUMAN TRUTH (pull-quote) */}
        <section
          style={{
            background: "#0A0A0A",
            padding: "clamp(96px,13vw,190px) clamp(20px,5vw,60px)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Reveal style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ ...numLabel, margin: "0 0 clamp(32px,4vw,56px)" }}>02 — Human truth</p>
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(2.2rem,5.6vw,4.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: 0,
                maxWidth: "22ch",
                textWrap: "balance",
              }}
            >
              {sp.truth}
            </p>
          </Reveal>
        </section>

        {/* 03 IDEA */}
        <section style={{ background: "#000000", padding: sectionPad }}>
          <Reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ ...numLabel, margin: "0 0 clamp(28px,4vw,48px)" }}>03 — Idea</p>
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(1.9rem,4.4vw,3.4rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                margin: 0,
                maxWidth: "20ch",
                textWrap: "balance",
              }}
            >
              {sp.idea}
            </p>
          </Reveal>
        </section>

        {/* 04 EXECUTION */}
        <section
          style={{
            background: "#0A0A0A",
            padding: sectionPad,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal style={{ marginBottom: "clamp(36px,5vw,60px)" }}>
              <p style={{ ...numLabel, margin: 0 }}>04 — Execution</p>
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(1.9rem,4vw,3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  margin: "16px 0 0",
                }}
              >
                What we made
              </h2>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,3vw,40px)" }}>
              {sp.execution.map((ex, i) => (
                <Reveal key={ex.label}>
                  <div
                    className="lacquer-sweep"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      aspectRatio: "16/9",
                      background: "#141414",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "clamp(20px,3vw,40px)",
                    }}
                  >
                    {ex.image && (
                      <img
                        src={ex.image}
                        alt=""
                        aria-hidden="true"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "8%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: 700,
                        fontSize: "clamp(4rem,14vw,11rem)",
                        color: "rgba(255,255,255,0.04)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        pointerEvents: "none",
                      }}
                    >
                      {c.keyword}
                    </span>
                    <Grain opacity={0.4} />
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "clamp(16px,2vw,24px)",
                        left: "clamp(16px,2vw,24px)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {pad2(i + 1)} — Asset
                    </span>
                    <div style={{ position: "relative" }}>
                      <h3
                        style={{
                          fontWeight: 600,
                          fontSize: "clamp(1.3rem,2.6vw,2rem)",
                          lineHeight: 1.08,
                          letterSpacing: "-0.02em",
                          color: "#FFFFFF",
                          margin: 0,
                        }}
                      >
                        {ex.label}
                      </h3>
                      <p
                        style={{
                          fontSize: "clamp(0.8rem,1.1vw,0.95rem)",
                          lineHeight: 1.5,
                          color: "rgba(255,255,255,0.75)",
                          margin: "10px 0 0",
                          maxWidth: "48ch",
                        }}
                      >
                        {ex.caption}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05 CHANNELS */}
        <section style={{ background: "#000000", padding: sectionPad }}>
          <Reveal style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ ...numLabel, margin: "0 0 clamp(28px,4vw,48px)" }}>05 — Channels</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {sp.channels.map((ch) => (
                <span
                  key={ch}
                  className="chevron-tag lacquer"
                  style={{
                    fontSize: "clamp(0.85rem,1.3vw,1.05rem)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                    background: "#0A0A0A",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "14px 26px",
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 06 IMPACT */}
        <section
          style={{
            background: "#0A0A0A",
            padding: sectionPad,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 14,
                marginBottom: "clamp(36px,5vw,60px)",
              }}
            >
              <p style={{ ...numLabel, margin: 0 }}>06 — Impact</p>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Placeholder figures — replace with verified results
              </span>
            </Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                gap: 1,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {sp.impact.map((m, i) => (
                <Reveal
                  key={m.label}
                  delay={i * 80}
                  className="lacquer card-lift"
                  style={{ background: "#0A0A0A", padding: "clamp(32px,4vw,52px) clamp(24px,2.4vw,36px)" }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(3rem,6vw,4.6rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      color: "#FFFFFF",
                    }}
                  >
                    {m.stat}
                  </div>
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: 1.4,
                      color: "rgba(255,255,255,0.75)",
                      margin: "18px 0 0",
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      margin: "10px 0 0",
                    }}
                  >
                    {m.note}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 07 LEGACY */}
        <section style={{ background: "#000000", padding: sectionPad }}>
          <Reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ ...numLabel, margin: "0 0 clamp(28px,4vw,48px)" }}>07 — Legacy</p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
                lineHeight: 1.28,
                letterSpacing: "-0.015em",
                color: "rgba(255,255,255,0.92)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {sp.legacy}
            </p>
          </Reveal>
        </section>
      </article>

      {/* NEXT + CTA */}
      <section
        id="start"
        style={{
          background: "#000000",
          padding: "clamp(64px,8vw,110px) clamp(20px,5vw,60px) clamp(96px,13vw,170px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal as="a" href={`/work/${nx.slug}`} data-cut className="cs-next lacquer-sweep" style={{ display: "block" }}>
            <span style={{ ...numLabel }}>Next project</span>
            <div
              className="cs-next-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 16,
                marginTop: 16,
              }}
            >
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(2.2rem,6vw,4.4rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {nx.title}
              </h2>
              <span
                aria-hidden="true"
                style={{ fontWeight: 400, fontSize: "clamp(2rem,4vw,3rem)", color: "#FFFFFF", lineHeight: 1 }}
              >
                →
              </span>
            </div>
          </Reveal>

          <Reveal style={{ textAlign: "center", marginTop: "clamp(80px,12vw,160px)" }}>
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Start a project
            </span>
            <h2
              style={{
                fontWeight: 500,
                fontSize: "clamp(2.4rem,6.4vw,5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: "20px auto 0",
                maxWidth: "18ch",
                textWrap: "balance",
              }}
            >
              Bring us a brief with a truth in it.
            </h2>
            <div style={{ marginTop: "clamp(36px,4vw,52px)" }}>
              <Link
                href="/contact"
                data-cut
                className="hov-invert"
                style={{
                  display: "inline-block",
                  fontSize: 13,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "19px 38px",
                }}
              >
                Do you want to work with us?
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
