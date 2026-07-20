"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import LogoMark from "@/components/LogoMark";
import HeroBackdrop from "@/components/HeroBackdrop";
import PersistentCTA from "@/components/PersistentCTA";
import Placeholder from "@/components/Placeholder";
import CommercialCard from "@/components/CommercialCard";
import LoadMore from "@/components/LoadMore";
import { capabilities, values, commercials, positioning, ourPhilosophy, ourValues } from "@/content";

const eyebrow: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
};

const COMMERCIALS_PAGE = 4;

export default function HomeView() {
  const [visibleCommercials, setVisibleCommercials] = useState(COMMERCIALS_PAGE);
  const firstNewRef = useRef<HTMLDivElement | null>(null);
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const handleLoadMore = () => {
    const prevCount = visibleCommercials;
    setVisibleCommercials((n) => Math.min(n + COMMERCIALS_PAGE, commercials.length));
    // Move focus to the first newly-revealed tile once it mounts.
    requestAnimationFrame(() => {
      firstNewRef.current?.focus();
    });
    void prevCount;
  };

  const visible = commercials.slice(0, visibleCommercials);
  const hasMore = visibleCommercials < commercials.length;

  return (
    <main style={{ background: "#000000" }}>
      {/* ── 10.1 · LANDING ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          background: "#000000",
          padding: "120px clamp(20px,5vw,60px)",
        }}
      >
        <HeroBackdrop />
        <Reveal as="div" delay={200} style={{ position: "relative" }}>
          <LogoMark mode="hero" />
        </Reveal>
        <Reveal
          as="p"
          delay={520}
          style={{
            fontSize: "clamp(11px,1.4vw,13px)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            margin: "clamp(20px,3vw,30px) 0 0",
          }}
        >
          {positioning.lockup}
        </Reveal>

        <Reveal
          as="a"
          href="#philosophy"
          delay={800}
          rest="translateX(-50%)"
          style={{
            position: "absolute",
            bottom: "clamp(30px,5vh,52px)",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase" }}>Scroll</span>
          <span aria-hidden="true" style={{ width: 1, height: 48, background: "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0))" }} />
        </Reveal>
      </section>

      {/* ── 10.3 · OUR PHILOSOPHY ── */}
      <section
        id="philosophy"
        style={{
          background: "#0A0A0A",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", gap: "clamp(24px,4vw,56px)" }}>
          <span
            aria-hidden="true"
            style={{
              fontWeight: 700,
              fontSize: "clamp(4rem,10vw,9rem)",
              lineHeight: 0.8,
              color: "rgba(255,255,255,0.06)",
              flex: "0 0 auto",
            }}
          >
            01
          </span>
          <Reveal style={{ flex: "1 1 auto", textAlign: "left", maxWidth: 760 }}>
            <span style={eyebrow}>{ourPhilosophy.heading}</span>
            <p
              style={{
                fontSize: "clamp(1.3rem,2.4vw,1.9rem)",
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.75)",
                margin: "18px 0 0",
                textWrap: "pretty",
              }}
            >
              {ourPhilosophy.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10.4 · OUR DNA (populated) ── */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
            <span style={eyebrow}>Our DNA</span>
          </Reveal>
          <Reveal delay={100} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {values.map((v) => (
              <span
                key={v.word}
                className="lacquer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "#0A0A0A",
                  padding: "16px 26px",
                  fontSize: "clamp(1rem,1.6vw,1.25rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                  color: "#FFFFFF",
                }}
              >
                {v.word}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 10.5 · OUR VALUES (placeholder) ── */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexDirection: "row-reverse", gap: "clamp(24px,4vw,56px)" }}>
          <span
            aria-hidden="true"
            style={{
              fontWeight: 700,
              fontSize: "clamp(4rem,10vw,9rem)",
              lineHeight: 0.8,
              color: "rgba(255,255,255,0.06)",
              flex: "0 0 auto",
            }}
          >
            02
          </span>
          <Reveal style={{ flex: "1 1 auto", textAlign: "right", maxWidth: 760, marginLeft: "auto" }}>
            <span style={eyebrow}>{ourValues.heading}</span>
            <Placeholder style={{ marginTop: 18 }}>
              <p
                style={{
                  fontSize: "clamp(1.3rem,2.4vw,1.9rem)",
                  lineHeight: 1.4,
                  color: "rgba(255,255,255,0.75)",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                [Placeholder — client to supply: Cossé&apos;s stated values]
              </p>
            </Placeholder>
          </Reveal>
        </div>
      </section>

      {/* ── 10.6 · SELECTED WORK — TV COMMERCIALS ── */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
            <span style={eyebrow}>Some Work</span>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "clamp(16px,2vw,24px)",
            }}
          >
            {visible.map((c, i) => (
              <Reveal
                as="div"
                key={c.slot}
                delay={i >= visibleCommercials - COMMERCIALS_PAGE && i < visibleCommercials ? (i % COMMERCIALS_PAGE) * 70 : 0}
                ref={i === visibleCommercials - COMMERCIALS_PAGE && visibleCommercials > COMMERCIALS_PAGE ? firstNewRef : undefined}
                tabIndex={-1}
                style={{ outline: "none" }}
              >
                <CommercialCard slot={c.slot} client={c.client} title={c.title} videoId={c.videoId} poster={c.poster} />
              </Reveal>
            ))}
          </div>
          {hasMore && <LoadMore expanded={visibleCommercials > COMMERCIALS_PAGE} onLoad={handleLoadMore} />}
        </div>
      </section>

      {/* ── 10.7 · THE POSITIONING BEAT ── */}
      <section
        className="lacquer"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#000000",
          padding: "clamp(96px,15vh,200px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          textAlign: "center",
        }}
      >
        <Grain opacity={0.25} />
        <Reveal
          as="h2"
          dur={0.9}
          weight={[330, 700]}
          style={{
            position: "relative",
            fontWeight: 500,
            fontSize: "clamp(2.2rem,6vw,4.6rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: "0 auto",
            maxWidth: "18ch",
          }}
        >
          {positioning.leadLines.map((line, i) => {
            const isInterior = i > 0 && i < positioning.leadLines.length - 1;
            return (
              <span key={line} style={{ display: "block", color: isInterior ? "rgba(255,255,255,0.5)" : undefined }}>
                {line}
              </span>
            );
          })}
        </Reveal>
      </section>

      {/* ── 10.8 · CAPABILITIES ── */}
      <section
        style={{ background: "#000000", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}>
            <div style={{ maxWidth: "24ch" }}>
              <span style={eyebrow}>We Do</span>
            </div>
            <Link href="/capabilities" data-cut className="hov-bright" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", padding: "13px 0", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
              All we do →
            </Link>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {capabilities.map((cap, i) => (
              <Reveal key={cap.name} delay={(i % 3) * 80} className="lacquer card-lift" style={{ background: "#000000", padding: "clamp(28px,3vw,42px) clamp(24px,2.4vw,34px)" }}>
                <span style={{ fontSize: 12, letterSpacing: "0.16em", color: "rgba(255,255,255,0.4)" }}>{pad2(i + 1)}</span>
                <h3 style={{ fontWeight: 600, fontSize: "clamp(1.35rem,2.1vw,1.7rem)", lineHeight: 1.14, letterSpacing: "-0.015em", color: "#FFFFFF", margin: "18px 0 0" }}>{cap.name}</h3>
                <p style={{ fontWeight: 400, fontSize: "1rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>{cap.scope}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10.9 · CLOSE ── */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(120px,18vh,240px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          textAlign: "center",
        }}
      >
        <Reveal style={{ display: "flex", justifyContent: "center" }}>
          <PersistentCTA variant="inline" />
        </Reveal>
      </section>
    </main>
  );
}
