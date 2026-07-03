import Grain from "./Grain";
import Placeholder from "./Placeholder";

export interface CommercialCardProps {
  slot: string;
  client: string;
  title: string | null;
  videoId: string | null;
  poster: string | null;
}

function MediaWell({ hasReal, poster, title, slot }: { hasReal: boolean; poster: string | null; title: string | null; slot: string }) {
  return (
    <div
      className="lacquer-sweep"
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
      {poster ? (
        <img src={poster} alt={title ?? slot} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Grain size={200} opacity={0.35} />
      )}
      <span
        className="chevron-tag"
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "#000000",
          color: "rgba(255,255,255,0.85)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "7px 16px 7px 20px",
        }}
      >
        {hasReal ? "TV Commercial" : "Placeholder"}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.6em",
          height: "2.6em",
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "50%",
        }}
      >
        ►
      </span>
    </div>
  );
}

/*
 * CommercialCard — the TV-commercial format. No fabricated titles/clients:
 * until a real videoId is supplied, this renders entirely through
 * <Placeholder> (dashed border, dimmed content, explicit caption).
 */
export default function CommercialCard({ slot, client, title, videoId, poster }: CommercialCardProps) {
  const hasReal = !!videoId;

  if (!hasReal) {
    return (
      <Placeholder style={{ padding: 0, border: "none" }} contentStyle={{ opacity: 1 }}>
        <div style={{ border: "1px dashed var(--line)", padding: "10px 10px 0" }}>
          <MediaWell hasReal={false} poster={poster} title={title} slot={slot} />
        </div>
        <p style={{ fontSize: "0.95rem", letterSpacing: "0.01em", color: "rgba(255,255,255,0.6)", margin: "12px 10px 0" }}>
          {slot} — {client}
        </p>
      </Placeholder>
    );
  }

  return (
    <div className="lacquer">
      <MediaWell hasReal poster={poster} title={title} slot={slot} />
      <p style={{ fontSize: "0.95rem", letterSpacing: "0.01em", color: "rgba(255,255,255,0.6)", margin: "12px 0 0" }}>
        {title} — {client}
      </p>
    </div>
  );
}
