import type { Metadata } from "next";
import ContactSurface from "./ContactSurface";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell us the business problem. A senior team replies within 48 hours.",
  openGraph: {
    title: "Start a project — Cossé TTL",
    description: "Tell us the business problem. A senior team replies within 48 hours.",
  },
};

export default function ContactPage() {
  return <ContactSurface />;
}
