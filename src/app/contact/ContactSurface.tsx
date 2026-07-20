"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Acute from "@/components/Acute";
import Footer from "@/components/Footer";
import { contact } from "@/content";

const labelText: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
};

const fieldBase: CSSProperties = {
  width: "100%",
  background: "transparent",
  color: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: "1rem",
  padding: "15px 16px",
  outline: "none",
  transition: "border-color .3s ease",
};

const selectBase: CSSProperties = {
  ...fieldBase,
  background: "#000000",
  border: "1px solid rgba(255,255,255,0.2)",
  WebkitAppearance: "none",
  appearance: "none",
};

type Errors = { name?: string; email?: string; challenge?: string };

export default function ContactSurface() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    timeline: "",
    challenge: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value;
      setForm((s) => ({ ...s, [k]: v }));
      setErrors((s) => ({ ...s, [k]: undefined }));
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!form.name.trim()) errs.name = "Your name, please.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) errs.email = "A valid email, please.";
    if (form.challenge.trim().length < 10) errs.challenge = "A line or two about the challenge.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmittedName(form.name.trim().split(" ")[0]);
    setSubmitted(true);
    try {
      const reduced =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    } catch {}
  };

  const bd = (k: keyof Errors) => (errors[k] ? "#E0795A" : "rgba(255,255,255,0.2)");
  const errStyle: CSSProperties = { fontSize: "0.82rem", color: "#E0795A" };

  return (
    <main style={{ background: "#000000" }}>
      <header
        style={{
          background: "#000000",
          padding: "clamp(132px,18vh,210px) clamp(20px,5vw,60px) clamp(28px,4vw,52px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal as="p" style={{ ...labelText, fontSize: 12, letterSpacing: "0.2em", margin: 0 }}>
            Start a project
          </Reveal>
          <Reveal
            as="h1"
            delay={120}
            dur={0.9}
            weight={[340, 720]}
            style={{
              fontWeight: 500,
              fontSize: "clamp(2.95rem,6.4vw,5.65rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              margin: "20px 0 0",
              maxWidth: "16ch",
              marginLeft: "-0.04em",
            }}
          >
            Let&apos;s find the truth in it.
          </Reveal>
          <Reveal
            as="p"
            delay={260}
            style={{
              fontSize: "clamp(1.24rem,1.8vw,1.64rem)",
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.6)",
              margin: "24px 0 0",
              maxWidth: "48ch",
            }}
          >
            A few lines on the business problem is enough to start. No formal RFP required.
          </Reveal>
        </div>
      </header>

      <section
        style={{
          background: "#000000",
          padding: "clamp(24px,3vw,44px) clamp(20px,5vw,60px) clamp(80px,11vw,140px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(40px,6vw,90px)",
            alignItems: "flex-start",
          }}
        >
          {/* FORM */}
          <Reveal style={{ flex: "1.5 1 460px" }}>
            {!submitted ? (
              <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,2.4vw,28px)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(18px,2vw,24px)" }}>
                  <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 9 }}>
                    <span style={labelText}>Your name *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Ada Okeke"
                      style={{ ...fieldBase, border: `1px solid ${bd("name")}` }}
                    />
                    {errors.name && <span style={errStyle}>{errors.name}</span>}
                  </label>
                  <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 9 }}>
                    <span style={labelText}>Company</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Brand or organisation"
                      style={{ ...fieldBase, border: "1px solid rgba(255,255,255,0.2)" }}
                    />
                  </label>
                </div>

                <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={labelText}>Email *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com"
                    style={{ ...fieldBase, border: `1px solid ${bd("email")}` }}
                  />
                  {errors.email && <span style={errStyle}>{errors.email}</span>}
                </label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(18px,2vw,24px)" }}>
                  <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 9 }}>
                    <span style={labelText}>Budget</span>
                    <select value={form.budget} onChange={set("budget")} style={selectBase}>
                      <option value="">Select a range</option>
                      {contact.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 9 }}>
                    <span style={labelText}>Timeline</span>
                    <select value={form.timeline} onChange={set("timeline")} style={selectBase}>
                      <option value="">Select a timeline</option>
                      {contact.timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={labelText}>The challenge *</span>
                  <textarea
                    value={form.challenge}
                    onChange={set("challenge")}
                    rows={5}
                    placeholder="What's the business problem? What does winning look like?"
                    style={{ ...fieldBase, border: `1px solid ${bd("challenge")}`, lineHeight: 1.5, resize: "vertical" }}
                  />
                  {errors.challenge && <span style={errStyle}>{errors.challenge}</span>}
                </label>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px 24px", marginTop: 6 }}>
                  <button
                    type="submit"
                    className="hov-soft"
                    style={{
                      fontFamily: "inherit",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#000000",
                      background: "#FFFFFF",
                      border: "none",
                      padding: "18px 36px",
                      cursor: "pointer",
                    }}
                  >
                    Send the brief
                  </button>
                  <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}>
                    Or email{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.3)" }}
                    >
                      {contact.email}
                    </a>
                  </span>
                </div>
              </form>
            ) : (
              <div className="lacquer" style={{ border: "1px solid rgba(255,255,255,0.18)", background: "#0A0A0A", padding: "clamp(36px,5vw,64px)" }}>
                <span aria-hidden="true" style={{ display: "inline-block", width: 26, height: 26, color: "#FFFFFF" }}>
                  <Acute />
                </span>
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(2.05rem,3.4vw,2.95rem)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.025em",
                    color: "#FFFFFF",
                    margin: "18px 0 0",
                  }}
                >
                  Brief received, {submittedName}.
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1.19rem,1.5vw,1.36rem)",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.65)",
                    margin: "16px 0 0",
                    maxWidth: "46ch",
                  }}
                >
                  A senior team is reading it now. You&apos;ll hear a point of view from us within 48 hours.
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", margin: "18px 0 0" }}>
                  (Prototype — no message was actually sent.)
                </p>
              </div>
            )}
          </Reveal>

          {/* SIDEBAR */}
          <Reveal
            as="aside"
            delay={120}
            style={{
              flex: "1 1 280px",
              maxWidth: 420,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(32px,4vw,48px)",
            }}
          >
            <div>
              <span style={{ ...labelText, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>
                What happens next
              </span>
              <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                {contact.steps.map((s) => (
                  <div
                    key={s.n}
                    style={{ display: "flex", gap: 18, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <span style={{ flex: "0 0 auto", fontSize: 13, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", paddingTop: 3 }}>
                      {s.n}
                    </span>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: "1.12rem", lineHeight: 1.2, color: "#FFFFFF", margin: 0 }}>{s.t}</h3>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", margin: "7px 0 0" }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span style={{ ...labelText, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>The studio</span>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.5 }}>
                {contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <a href={`mailto:${contact.email}`} className="hov-bright" style={{ fontSize: "1rem", padding: "6px 0", width: "fit-content", color: "rgba(255,255,255,0.7)" }}>
                  {contact.email}
                </a>
                <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>{contact.phone}</span>
              </div>
              <div style={{ marginTop: 14, display: "flex", gap: 18 }}>
                <a href="https://instagram.com" target="_blank" rel="noopener" className="hov-bright" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", padding: "12px 0", color: "rgba(255,255,255,0.5)" }}>
                  Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener" className="hov-bright" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", padding: "12px 0", color: "rgba(255,255,255,0.5)" }}>
                  LinkedIn
                </a>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
              <span style={{ ...labelText, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>Looking to join?</span>
              <Link href="/careers" data-cut className="hov-dim" style={{ display: "inline-block", fontSize: "1.15rem", fontWeight: 500, color: "#FFFFFF", marginTop: 10, padding: "8px 0" }}>
                See open roles →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
