"use client";

import { useState, type CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import Acute from "@/components/Acute";
import WorkCard from "@/components/WorkCard";
import CommercialCard from "@/components/CommercialCard";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { cases, disciplines, commercials } from "@/content";

const eyebrowStyle: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
};

const PAGE_SIZE = 6;

export default function WorkIndex() {
  const [filter, setFilter] = useState("All");
  const [filterHover, setFilterHover] = useState<string | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const labels = ["All", ...disciplines];

  const isAll = filter === "All";
  const matches = cases.filter((c) => isAll || c.discipline === filter);
  const visibleCases = isAll ? matches.slice(0, visibleCount) : matches;
  const canLoadMore = isAll && visibleCount < matches.length;

  const selectFilter = (label: string) => {
    setFilter(label);
    setHov(null);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main style={{ background: "#000000", minHeight: "100vh" }}>
      {/* INTRO */}
      <section
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
            The archive
          </Reveal>
          <Reveal
            as="h1"
            delay={130}
            dur={0.9}
            weight={[340, 680]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.4rem,6vw,5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "18ch",
              textWrap: "balance",
            }}
          >
            Thirty years, told as stories worth entering.
          </Reveal>
        </div>
      </section>

      {/* TV COMMERCIALS */}
      <section
        style={{
          background: "#0A0A0A",
          padding: "clamp(48px,7vw,90px) clamp(20px,5vw,60px)",
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
              <span style={eyebrowStyle}>TV Commercials</span>
              <h2
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem,3.6vw,2.8rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  margin: "14px 0 0",
                }}
              >
                Made for the screen, built to be remembered.
              </h2>
            </div>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              Placeholder — real films to follow
            </span>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "clamp(16px,2vw,24px)",
            }}
          >
            {commercials.map((c, i) => (
              <Reveal key={c.slot} delay={i * 60}>
                <CommercialCard slot={c.slot} client={c.client} title={c.title} videoId={c.videoId} poster={c.poster} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER ROW — sibling-dim on hover, active state on click */}
      <section style={{ background: "#000000", padding: "0 clamp(20px,5vw,60px)" }}>
        <Reveal
          onMouseLeave={() => setFilterHover(null)}
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 10px",
            padding: "18px 0",
            background: "#000000",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {labels.map((label) => {
            const active = label === filter;
            const dimmed = filterHover !== null && filterHover !== label;
            const style: CSSProperties = {
              display: "inline-flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "13px 0",
              minHeight: 44,
              marginRight: 20,
              color: active ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              opacity: dimmed ? 0.4 : 1,
              transition: "color .3s ease, opacity .3s ease",
              fontFamily: "inherit",
            };
            return (
              <button
                key={label}
                type="button"
                onClick={() => selectFilter(label)}
                onMouseEnter={() => setFilterHover(label)}
                onFocus={() => setFilterHover(label)}
                onBlur={() => setFilterHover(null)}
                style={style}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "0.62em",
                    height: "0.62em",
                    marginRight: "0.34em",
                    color: "#FFFFFF",
                    opacity: active ? 1 : 0,
                    transition: "opacity .3s ease",
                  }}
                >
                  <Acute />
                </span>
                {label}
              </button>
            );
          })}
        </Reveal>
      </section>

      {/* GRID — one hero-scale piece (index 0), the rest at standard scale */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(40px,5vw,72px) clamp(20px,5vw,60px) clamp(56px,7vw,90px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
            gap: "clamp(24px,3vw,52px)",
          }}
        >
          {visibleCases.map((x, i) => {
            const op = hov !== null && hov !== i ? 0.42 : 1;
            return (
              <Reveal
                key={x.slug}
                delay={(i % 2) * 70}
                y={18}
                style={{ gridColumn: i === 0 ? "1 / -1" : "auto" }}
              >
                <div
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ opacity: op, transition: "opacity .5s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  <WorkCard
                    href={`/work/${x.slug}`}
                    keyword={x.keyword}
                    discipline={x.discipline}
                    title={x.title}
                    client={x.client}
                    year={x.year}
                    idea={x.idea}
                    index={i}
                    featured={i === 0}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {canLoadMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(40px,5vw,64px)" }}>
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="lacquer-sweep btn-outline-glass"
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                background: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "18px 40px",
                cursor: "pointer",
              }}
            >
              Load more
            </button>
          </div>
        )}
      </section>

      <StartBand title="Your brief could be next." />
      <Footer />
    </main>
  );
}
