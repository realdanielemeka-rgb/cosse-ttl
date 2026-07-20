"use client";

import { forwardRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Grain from "./Grain";
import Acute from "./Acute";

export interface WorkCardProps {
  href: string;
  keyword: string;
  discipline: string;
  title: string;
  client: string;
  year: string;
  idea: string;
  index: number;
  /** Hero-scale lead treatment — spans the full grid row. */
  featured?: boolean;
}

/*
 * WorkCard — full-bleed 16:9 media, a chevron discipline tag, title + client
 * beneath. Hover reveals a circular Acute "view" affordance (Framer Motion,
 * not CSS-only) and a one-shot Lacquer sweep across the media. Carries the
 * Total Expansion transition (see components/TotalExpand.tsx) rather than
 * the generic film-cut — the two are mutually exclusive per link.
 */
const WorkCard = forwardRef<HTMLAnchorElement, WorkCardProps>(function WorkCard(
  { href, keyword, discipline, title, client, year, idea, index, featured },
  ref
) {
  const [hovered, setHovered] = useState(false);
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const totalExpand = featured !== undefined;

  return (
    <Link
      ref={ref}
      href={href}
      data-cut={totalExpand ? undefined : true}
      data-total-expand={totalExpand ? "true" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "block" }}
    >
      <div
        data-media-well
        data-keyword={keyword}
        data-discipline={discipline}
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
        <span
          aria-hidden="true"
          style={{
            fontWeight: 700,
            fontSize: featured ? "clamp(4rem,16vw,12rem)" : "clamp(3.5rem,12vw,8rem)",
            color: "rgba(255,255,255,0.05)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {keyword}
        </span>
        <Grain size={featured ? 220 : 200} opacity={0.4} />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          className="chevron-tag"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "#000000",
            color: "rgba(255,255,255,0.85)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "7px 16px 7px 20px",
          }}
        >
          {discipline}
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
          {pad2(index + 1)}
        </span>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.55, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.55, rotate: -20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#FFFFFF",
                color: "#000000",
              }}
            >
              <span style={{ width: 16, height: 16 }}>
                <Acute strokeWidth={3} />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
        <div
          style={{
            position: "absolute",
            left: featured ? "clamp(20px,3vw,40px)" : 14,
            right: featured ? "clamp(20px,3vw,40px)" : 14,
            bottom: featured ? "clamp(20px,3vw,36px)" : 14,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: featured ? 12 : 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {client} · {year}
            </span>
            <h3
              style={{
                fontWeight: 700,
                fontSize: featured ? "clamp(2.05rem,4.4vw,3.85rem)" : "clamp(1.64rem,2.6vw,2.37rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                margin: featured ? "8px 0 0" : "6px 0 0",
              }}
            >
              {title}
            </h3>
          </div>
        </div>
      </div>
      <p
        style={{
          fontSize: featured ? "clamp(0.96rem,1.2vw,1.13rem)" : "clamp(1.02rem,1.3vw,1.19rem)",
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.55)",
          margin: "14px 0 0",
          maxWidth: "48ch",
        }}
      >
        {idea}
      </p>
    </Link>
  );
});

export default WorkCard;
