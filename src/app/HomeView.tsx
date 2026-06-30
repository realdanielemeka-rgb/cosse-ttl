"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Grain from "@/components/Grain";
import StartBand from "@/components/StartBand";
import Footer from "@/components/Footer";
import { cases, capabilities, about, thinking, clients } from "@/content";

const eyebrow: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type YTWindow = Window & {
  YT?: { Player: new (id: string, opts: any) => any };
  onYouTubeIframeAPIReady?: () => void;
};

export default function HomeView() {
  const [hovWork, setHovWork] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const row0Ref = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const selected = cases.slice(0, 4);
  const caps = capabilities;
  const teasers = thinking.slice(0, 3);

  // Clients split into two opposite-running rows, each doubled for the loop.
  const half = Math.ceil(clients.length / 2);
  const a = clients.slice(0, half);
  const b = clients.slice(half);
  const row1 = a.concat(a);
  const row2 = b.concat(b);

  // ── Hero showreel (YouTube IFrame API: forces muted autoplay) ──────────────
  useEffect(() => {
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = videoRef.current;
    if (!mount || reduced) return;
    const w = window as YTWindow;
    let player: any;
    let poll = 0;
    let kicked = false;

    const start = () => {
      try {
        player = new w.YT!.Player("heroVideo", {
          width: "100%",
          height: "100%",
          host: "https://www.youtube-nocookie.com",
          videoId: "SOx8N5KW4Hc",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            loop: 1,
            playlist: "SOx8N5KW4Hc",
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            start: 2,
            origin: location.origin,
          },
          events: {
            onReady: (e: any) => {
              try {
                e.target.mute();
                e.target.playVideo();
              } catch {}
            },
            onStateChange: (e: any) => {
              if (e.data === 0) {
                try {
                  e.target.seekTo(2);
                  e.target.playVideo();
                } catch {}
              }
            },
          },
        });
      } catch {}
    };

    if (w.YT && w.YT.Player) {
      start();
    } else {
      if (!document.getElementById("yt-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") {
          try {
            prev();
          } catch {}
        }
        start();
      };
      poll = window.setInterval(() => {
        if (w.YT && w.YT.Player) {
          window.clearInterval(poll);
          start();
        }
      }, 150);
    }

    // First-gesture fallback in case nested-frame autoplay policy blocks it.
    const kick = () => {
      if (kicked) return;
      try {
        if (player && player.playVideo) {
          player.mute();
          player.playVideo();
        }
      } catch {}
      kicked = true;
    };
    const evs = ["pointerdown", "touchstart", "keydown", "scroll", "mousemove"] as const;
    evs.forEach((ev) => window.addEventListener(ev, kick, { passive: true }));

    return () => {
      window.clearInterval(poll);
      evs.forEach((ev) => window.removeEventListener(ev, kick));
      try {
        if (player && player.destroy) player.destroy();
      } catch {}
    };
  }, []);

  // ── Clients marquee (timer + delta-time, consistent speed) ─────────────────
  useEffect(() => {
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tracks = [row0Ref.current, row1Ref.current].filter(Boolean) as HTMLDivElement[];
    if (reduced) {
      tracks.forEach((t) => {
        t.style.flexWrap = "wrap";
        t.style.justifyContent = "center";
        t.style.width = "100%";
      });
      return;
    }
    const state = [
      { x: 0, dir: -1 },
      { x: 0, dir: 1 },
    ];
    const paused = [false, false];
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const wrap = target?.closest?.("[data-mq-wrap]");
      document.querySelectorAll("[data-mq-wrap]").forEach((el, i) => {
        paused[i] = el === wrap;
      });
    };
    document.addEventListener("mouseover", onOver, { passive: true });

    const SPEED = 40;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.1) dt = 0.1;
      tracks.forEach((el, i) => {
        const s = state[i];
        const halfW = el.scrollWidth / 2 || 1;
        if (!paused[i]) s.x += s.dir * SPEED * dt;
        if (s.x <= -halfW) s.x += halfW;
        else if (s.x > 0) s.x -= halfW;
        el.style.transform = "translateX(" + s.x.toFixed(2) + "px)";
      });
    }, 16);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  const logoStyle: CSSProperties = {
    flex: "0 0 auto",
    width: "clamp(166px,17vw,208px)",
    height: "clamp(94px,9.4vw,118px)",
    objectFit: "contain",
    background: "#FFFFFF",
    borderRadius: 5,
    display: "block",
  };

  return (
    <main style={{ background: "#000000" }}>
      {/* ── LANDING / COVER ── */}
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
          background: "#0A0A0A",
          padding: "120px clamp(20px,5vw,60px)",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", background: "#0A0A0A" }}>
          <div
            ref={videoRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "max(100vw, 177.78svh)",
              height: "max(100svh, 56.25vw)",
              opacity: 1,
            }}
          >
            <div id="heroVideo" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <Grain blend={false} drift opacity={0.42} />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.62) 100%)",
            pointerEvents: "none",
          }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", pointerEvents: "none" }} />

        <Reveal
          as="span"
          rest="translateX(-50%)"
          style={{
            position: "absolute",
            top: "clamp(78px,11vh,120px)",
            left: "50%",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "min(86vw,560px)",
            textAlign: "center",
          }}
        >
          Integrated Marketing Communications — Lagos
        </Reveal>

        <div style={{ position: "relative" }}>
          <Reveal
            as="h1"
            delay={180}
            dur={0.9}
            weight={[360, 640]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(3.4rem,15vw,12rem)",
              lineHeight: 0.9,
              letterSpacing: "0.12em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            COSSÉ
          </Reveal>
          <Reveal
            as="p"
            delay={440}
            style={{
              fontSize: "clamp(12px,1.5vw,15px)",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              margin: "clamp(14px,2vw,22px) 0 0",
            }}
          >
            TTL · Est. 1995
          </Reveal>
        </div>

        <Reveal
          as="a"
          href="#positioning"
          delay={720}
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

      {/* ── 1 · POSITIONING ── */}
      <section
        id="positioning"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "left",
          background: "#000000",
          padding: "clamp(90px,14vh,180px) clamp(16px,4vw,56px)",
          overflow: "hidden",
        }}
      >
        <Reveal
          as="h2"
          dur={0.9}
          weight={[330, 720]}
          style={{
            fontSize: "clamp(2.75rem,9.5vw,8.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            color: "#FFFFFF",
            margin: "0 0 0 -0.04em",
            maxWidth: "15ch",
          }}
        >
          Simple human truths.
          <br />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Total brand experiences.</span>
          <br />
          Since 1995.
        </Reveal>
      </section>

      {/* ── 2 · SELECTED WORK ── */}
      <section
        style={{
          background: "#000000",
          padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
              marginBottom: "clamp(36px,5vw,64px)",
            }}
          >
            <span style={eyebrow}>Selected work</span>
            <Link href="/work" className="hov-bright" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              All work →
            </Link>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px,7vw,104px)" }}>
            {selected.map((x, i) => {
              const op = hovWork === null || hovWork === i ? 1 : 0.32;
              return (
                <Reveal key={x.slug}>
                  <Link
                    href={`/work/${x.slug}`}
                    data-cut
                    onMouseEnter={() => setHovWork(i)}
                    onMouseLeave={() => setHovWork(null)}
                    style={{ opacity: op, display: "block", color: "#FFFFFF", transition: "opacity .5s cubic-bezier(0.16,1,0.3,1)" }}
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
                        style={{ fontWeight: 700, fontSize: "clamp(4rem,16vw,12rem)", color: "rgba(255,255,255,0.05)", letterSpacing: "-0.04em", lineHeight: 1 }}
                      >
                        {x.keyword}
                      </span>
                      <Grain opacity={0.4} />
                      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 100%)", pointerEvents: "none" }} />
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
                        {pad2(i + 1)} — Film / still
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          left: "clamp(20px,3vw,40px)",
                          right: "clamp(20px,3vw,40px)",
                          bottom: "clamp(20px,3vw,36px)",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          gap: 14,
                        }}
                      >
                        <div>
                          <span style={{ display: "block", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
                            {x.client} · {x.year}
                          </span>
                          <h3 style={{ fontWeight: 600, fontSize: "clamp(1.8rem,4.4vw,3.4rem)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "#FFFFFF", margin: "8px 0 0" }}>
                            {x.title}
                          </h3>
                        </div>
                        <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
                          View case →
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: "clamp(0.85rem,1.2vw,1rem)", lineHeight: 1.55, letterSpacing: "0.01em", color: "rgba(255,255,255,0.55)", margin: "20px 0 0", maxWidth: "52ch" }}>
                      {x.idea}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3 · CLIENTS ── */}
      <section
        id="clients"
        style={{ background: "#000000", padding: "clamp(80px,11vw,150px) 0", borderTop: "1px solid rgba(255,255,255,0.12)", overflow: "hidden" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div>
              <span style={eyebrow}>Clients</span>
              <h2 style={{ fontWeight: 500, fontSize: "clamp(2.1rem,4.6vw,3.6rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#FFFFFF", margin: "18px 0 0", maxWidth: "22ch" }}>
                Banks, brands, government and culture.
              </h2>
            </div>
            <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>A selection · 30 years</span>
          </Reveal>
        </div>

        <Reveal dur={0.9} y={0} style={{ marginTop: "clamp(40px,5vw,64px)", display: "flex", flexDirection: "column", gap: "clamp(14px,1.6vw,22px)" }}>
          <div data-mq-wrap style={{ position: "relative", overflow: "hidden" }}>
            <div ref={row0Ref} style={{ display: "flex", gap: "clamp(14px,1.6vw,22px)", width: "max-content", willChange: "transform" }}>
              {row1.map((c, i) => (
                <img key={`r1-${i}`} src={c.file} alt={`${c.name} — client logo`} decoding="async" style={logoStyle} />
              ))}
            </div>
          </div>
          <div data-mq-wrap style={{ position: "relative", overflow: "hidden" }}>
            <div ref={row1Ref} style={{ display: "flex", gap: "clamp(14px,1.6vw,22px)", width: "max-content", willChange: "transform" }}>
              {row2.map((c, i) => (
                <img key={`r2-${i}`} src={c.file} alt={`${c.name} — client logo`} decoding="async" style={logoStyle} />
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ maxWidth: 1320, margin: "clamp(34px,4vw,52px) auto 0", padding: "0 clamp(20px,5vw,60px)" }}>
          <Reveal as="p" style={{ fontSize: "clamp(0.95rem,1.4vw,1.12rem)", lineHeight: 1.55, color: "rgba(255,255,255,0.55)", margin: 0, maxWidth: "60ch" }}>
            From FIRS and Lagos State to MTN, Unilever, UBA and Nigerian Breweries — three decades of work for the institutions and brands that move the market.
          </Reveal>
        </div>
      </section>

      {/* ── 4 · CAPABILITIES ── */}
      <section
        id="capabilities"
        style={{ background: "#000000", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}>
            <div style={{ maxWidth: "24ch" }}>
              <span style={eyebrow}>Capabilities</span>
              <h2 style={{ fontWeight: 500, fontSize: "clamp(2.1rem,4.6vw,3.6rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#FFFFFF", margin: "18px 0 0" }}>
                One agency, integrated. We plan it, make it and run it.
              </h2>
            </div>
            <Link href="/capabilities" data-cut className="hov-bright" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
              All capabilities →
            </Link>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {caps.map((cap, i) => (
              <Reveal key={cap.name} delay={(i % 3) * 80} style={{ background: "#000000", padding: "clamp(28px,3vw,42px) clamp(24px,2.4vw,34px)" }}>
                <span style={{ fontSize: 12, letterSpacing: "0.16em", color: "rgba(255,255,255,0.4)" }}>{pad2(i + 1)}</span>
                <h3 style={{ fontWeight: 600, fontSize: "clamp(1.35rem,2.1vw,1.7rem)", lineHeight: 1.14, letterSpacing: "-0.015em", color: "#FFFFFF", margin: "18px 0 0" }}>{cap.name}</h3>
                <p style={{ fontWeight: 400, fontSize: "1rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>{cap.scope}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · ABOUT (teaser) ── */}
      <section
        style={{ background: "#0A0A0A", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,90px)", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Reveal style={{ flex: "1 1 440px", maxWidth: 640 }}>
            <span style={eyebrow}>The studio</span>
            <h2 style={{ fontWeight: 500, fontSize: "clamp(2rem,4.2vw,3.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em", color: "#FFFFFF", margin: "18px 0 0" }}>
              {about.lead}
            </h2>
            <Link href="/about" data-cut className="hov-bright" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 28, fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              About Cossé <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={120} style={{ flex: "1 1 300px", maxWidth: 460, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {about.stats.map((s) => (
              <div key={s.label} style={{ background: "#0A0A0A", padding: "clamp(22px,2.6vw,34px)" }}>
                <div style={{ fontWeight: 600, fontSize: "clamp(1.8rem,3.4vw,2.6rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "#FFFFFF" }}>{s.figure}</div>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.4, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 6 · THINKING (teaser) ── */}
      <section
        style={{ background: "#000000", padding: "clamp(80px,11vw,150px) clamp(20px,5vw,60px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: "clamp(36px,5vw,56px)" }}>
            <div style={{ maxWidth: "24ch" }}>
              <span style={eyebrow}>Thinking</span>
              <h2 style={{ fontWeight: 500, fontSize: "clamp(2.1rem,4.6vw,3.6rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#FFFFFF", margin: "18px 0 0" }}>
                Sharp points of view.
              </h2>
            </div>
            <Link href="/thinking" data-cut className="hov-bright" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
              All thinking →
            </Link>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {teasers.map((t, i) => (
              <Reveal key={t.title} delay={i * 90} style={{ display: "flex" }}>
                <Link
                  href="/thinking"
                  data-cut
                  className="hov-panel"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "#000000",
                    padding: "clamp(28px,3vw,40px)",
                    minHeight: "clamp(240px,26vw,300px)",
                    color: "#FFFFFF",
                  }}
                >
                  <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{t.kicker}</span>
                  <h3 style={{ fontWeight: 500, fontSize: "clamp(1.35rem,2vw,1.7rem)", lineHeight: 1.14, letterSpacing: "-0.015em", color: "#FFFFFF", margin: "18px 0 0" }}>{t.title}</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", margin: "12px 0 0" }}>{t.dek}</p>
                  <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "auto", paddingTop: 20 }}>
                    {t.date} · {t.read}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StartBand />
      <Footer />
    </main>
  );
}
