import type { Metadata } from "next";
import WorkIndex from "./WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Thirty years of work, told as stories worth entering. Selected campaigns across brand, media, experiential, social, public sector and production.",
  openGraph: {
    title: "Work — Cossé TTL",
    description:
      "Thirty years of work, told as stories worth entering. Selected campaigns across brand, media, experiential, social, public sector and production.",
  },
};

export default function WorkPage() {
  return <WorkIndex />;
}
