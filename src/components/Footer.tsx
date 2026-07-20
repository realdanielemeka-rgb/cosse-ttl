import Image from "next/image";
import Link from "next/link";
import SwapText from "./SwapText";

const linkStyle = {
  fontSize: 15,
  color: "rgba(255,255,255,0.7)",
  padding: "9px 0",
  width: "fit-content",
} as const;

const colLabel = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: 4,
} as const;

/* Footer — dark, restrained, mirroring the full IA. One hairline divider. */
export default function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: "clamp(60px,8vw,104px) clamp(20px,5vw,60px) 38px",
        color: "rgba(255,255,255,0.55)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(40px,6vw,80px)",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 340px", maxWidth: 460 }}>
            <Image
              src="/cosse-white-bold.png"
              alt="Cossé"
              width={220}
              height={114}
              style={{ height: 46, width: "auto", display: "block" }}
            />
            <p
              style={{
                fontWeight: 500,
                fontSize: "clamp(1.35rem,2.4vw,1.95rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                margin: "24px 0 0",
                textWrap: "balance",
              }}
            >
              Ideas that make the cash register ring,{" "}
              <span style={{ color: "rgba(255,255,255,0.45)" }}>Since 1995.</span>
            </p>
            <Link
              href="/contact"
              data-cut
              className="hov-border"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 28,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                paddingTop: 12,
                paddingBottom: 8,
              }}
            >
              Let's do some great work together <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px clamp(40px,5vw,72px)" }}>
            <nav aria-label="Explore" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Explore</span>
              <Link href="/capabilities" data-cut className="hov-bright" style={linkStyle}><SwapText>We Do</SwapText></Link>
              <Link href="/work" data-cut className="hov-bright" style={linkStyle}><SwapText>Work</SwapText></Link>
              <Link href="/studio" data-cut className="hov-bright" style={linkStyle}><SwapText>Studio</SwapText></Link>
              <Link href="/about" data-cut className="hov-bright" style={linkStyle}><SwapText>About</SwapText></Link>
              <Link href="/thinking" data-cut className="hov-bright" style={linkStyle}><SwapText>Thinking</SwapText></Link>
            </nav>
            <nav aria-label="Company" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Company</span>
              <Link href="/studio" data-cut className="hov-bright" style={linkStyle}><SwapText>The studio</SwapText></Link>
              <Link href="/careers" data-cut className="hov-bright" style={linkStyle}><SwapText>Careers</SwapText></Link>
              <Link href="/contact" data-cut className="hov-bright" style={linkStyle}><SwapText>Contact</SwapText></Link>
            </nav>
            <nav aria-label="Connect" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Connect</span>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}><SwapText>Instagram</SwapText></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}><SwapText>LinkedIn</SwapText></a>
              <a href="https://x.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}><SwapText>X / Twitter</SwapText></a>
            </nav>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "clamp(44px,6vw,72px) 0 26px" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 28px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.4)" }}>
            Integrated Marketing Communications · Victoria Island, Lagos, Nigeria
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.4)" }}>
            © 1995–2026 Cossé TTL
          </span>
        </div>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.03em",
            color: "rgba(255,255,255,0.28)",
            margin: "18px 0 0",
            maxWidth: "80ch",
          }}
        >
          Visual-direction prototype — placeholder content and metrics; client logos, the Cossé logo
          and showreel are stand-ins for licensed production assets.
        </p>
      </div>
    </footer>
  );
}
