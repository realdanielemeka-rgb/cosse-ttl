import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import CornerNav from "@/components/CornerNav";
import TotalExpand from "@/components/TotalExpand";
import LenisProvider from "@/components/LenisProvider";

/*
 * One authored type voice — Bricolage Grotesque (variable, OFL) across an
 * extreme opsz/wght range, used for everything. Space Mono is demoted to the
 * single earned role of film-style credits on case studies.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// The acute (´) as favicon — the brand glyph, monochrome.
const ACUTE_FAVICON =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23000%22%2F%3E%3Cline%20x1%3D%2211%22%20y1%3D%2222%22%20x2%3D%2221%22%20y2%3D%2210%22%20stroke%3D%22%23fff%22%20stroke-width%3D%223.4%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E";

export const metadata: Metadata = {
  metadataBase: new URL("https://cosse-ttl.example"),
  title: {
    default: "Cossé TTL — Integrated Marketing Communications, Lagos",
    template: "%s — Cossé TTL",
  },
  description:
    "We turn simple human truths into total brand experiences. A Lagos integrated marketing communications agency, since 1995.",
  icons: { icon: ACUTE_FAVICON },
  openGraph: {
    type: "website",
    siteName: "Cossé TTL",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${spaceMono.variable}`}>
      <body>
        <LenisProvider />
        <CornerNav />
        <TotalExpand />
        {children}
      </body>
    </html>
  );
}
