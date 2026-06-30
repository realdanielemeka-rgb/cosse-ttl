import Image from "next/image";
import Link from "next/link";

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
            <Image src="/cosse-white.png" alt="Cossé" width={150} height={34} style={{ height: 34, width: "auto", display: "block" }} />
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
              Simple human truths. Total brand experiences.{" "}
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
              Start a project <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px clamp(40px,5vw,72px)" }}>
            <nav aria-label="Explore" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Explore</span>
              <Link href="/work" data-cut className="hov-bright" style={linkStyle}>Work</Link>
              <Link href="/capabilities" data-cut className="hov-bright" style={linkStyle}>Capabilities</Link>
              <Link href="/studio" data-cut className="hov-bright" style={linkStyle}>Studio</Link>
              <Link href="/about" data-cut className="hov-bright" style={linkStyle}>About</Link>
              <Link href="/thinking" data-cut className="hov-bright" style={linkStyle}>Thinking</Link>
            </nav>
            <nav aria-label="Company" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Company</span>
              <Link href="/studio" data-cut className="hov-bright" style={linkStyle}>The studio</Link>
              <Link href="/careers" data-cut className="hov-bright" style={linkStyle}>Careers</Link>
              <Link href="/contact" data-cut className="hov-bright" style={linkStyle}>Contact</Link>
            </nav>
            <nav aria-label="Connect" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={colLabel}>Connect</span>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}>Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}>LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noopener" className="hov-bright" style={linkStyle}>X / Twitter</a>
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
