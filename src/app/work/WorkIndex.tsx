"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import Acute from "@/components/Acute";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { cases, disciplines } from "@/content";

export default function WorkIndex() {
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const labels = ["All", ...disciplines];

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

      {/* FILTER ROW */}
      <section style={{ background: "#000000", padding: "0 clamp(20px,5vw,60px)" }}>
        <Reveal
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
              padding: "8px 0",
              marginRight: 20,
              color: active ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              transition: "color .3s ease",
              fontFamily: "inherit",
            };
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setFilter(label);
                  setHov(null);
                }}
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

      {/* GRID */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(40px,5vw,72px) clamp(20px,5vw,60px) clamp(96px,13vw,170px)",
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
          {cases.map((x, i) => {
            const visible = filter === "All" || x.discipline === filter;
            const op = !visible ? 0.14 : hov !== null && hov !== i ? 0.42 : 1;
            return (
              <Reveal
                key={x.slug}
                delay={(i % 2) * 70}
                y={18}
                style={{ gridColumn: i === 0 ? "1 / -1" : "auto" }}
              >
                <Link
                  href={`/work/${x.slug}`}
                  data-cut
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    opacity: op,
                    pointerEvents: visible ? "auto" : "none",
                    display: "block",
                    transition: "opacity .5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      aspectRatio: "16/9",
                      background: "#141414",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(3.5rem,12vw,8rem)",
                        color: "rgba(255,255,255,0.05)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {x.keyword}
                    </span>
                    <Grain size={200} opacity={0.4} />
                    <span
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {pad2(i + 1)}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {x.discipline}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "10px 18px",
                      paddingTop: 18,
                    }}
                  >
                    <h2
                      style={{
                        fontWeight: 600,
                        fontSize: "clamp(1.45rem,2.6vw,2.1rem)",
                        lineHeight: 1.06,
                        letterSpacing: "-0.02em",
                        color: "#FFFFFF",
                        margin: 0,
                      }}
                    >
                      {x.title}
                    </h2>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.55)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {x.client} · {x.year}
                    </span>
                  </div>
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: "clamp(0.98rem,1.4vw,1.12rem)",
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.55)",
                      margin: "10px 0 0",
                      maxWidth: "48ch",
                    }}
                  >
                    {x.idea}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <StartBand title="Your brief could be next." />
      <Footer />
    </main>
  );
}
