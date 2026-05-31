"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronDown,
  ArrowLeft,
  Clock,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "9779818739823"; // your WhatsApp business number (no +, no spaces)
const BG_IMAGE = "/quote.jpg"; // atmospheric curtain / interior photo

const FABRICS = [
  "Velvet",
  "Linen",
  "Sheer / Voile",
  "Blackout",
  "Jacquard",
  "Polyester",
  "Cotton",
  "Silk Blend",
  "Zebra / Roller Blind",
];
const HEADERS = ["Eyelet", "Pencil Pleat", "Tab Top", "Rod Pocket", "Wave"];
const LININGS = [
  "No lining",
  "Standard lining",
  "Blackout lining",
  "Thermal lining",
];

const emptyWindow = () => ({
  id: Date.now() + Math.random(),
  room: "",
  width: "",
  height: "",
  quantity: 1,
});

export default function QuotePage() {
  const [windows, setWindows] = useState([emptyWindow()]);
  const [fabric, setFabric] = useState("");
  const [header, setHeader] = useState("");
  const [lining, setLining] = useState("");
  const [designNotes, setDesignNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const addWindow = () => setWindows((p) => [...p, emptyWindow()]);
  const removeWindow = (id) => setWindows((p) => p.filter((w) => w.id !== id));
  const updateWindow = (id, field, value) =>
    setWindows((p) =>
      p.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    );

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = true;
    if (!phone.trim()) e.phone = true;
    if (!fabric) e.fabric = true;
    windows.forEach((w, i) => {
      if (!w.width || !w.height) e[`win_${i}`] = true;
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const lines = [
      `🪟 *Cozy Curtains — Quotation Request*`,
      ``,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      ``,
      `📐 *Window Measurements:*`,
      ...windows.map(
        (w, i) =>
          `  ${i + 1}. ${w.room ? `${w.room} — ` : ""}W: ${w.width}" × H: ${w.height}"${
            w.quantity > 1 ? ` (×${w.quantity} panels)` : ""
          }`,
      ),
      ``,
      `🎨 *Fabric:* ${fabric}`,
      `📎 *Header style:* ${header || "Not specified"}`,
      `🧵 *Lining:* ${lining || "Not specified"}`,
      designNotes ? `\n💬 *Design notes:*\n${designNotes}` : "",
      ``,
      `_Sent from CozyCurtains.com_`,
    ];
    return lines.filter((l) => l !== "").join("\n");
  };

  const handleSend = () => {
    if (!validate()) {
      // jump to the first error so the user sees what's missing
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const inputCls = (err) =>
    `w-full rounded-lg px-3.5 py-3 text-sm outline-none transition-all duration-200 ${
      err
        ? "border border-red-300 bg-red-50 focus:border-[#62101F]"
        : "border border-[rgba(98,16,31,0.15)] bg-white focus:border-[#62101F] focus:ring-2 focus:ring-[#62101F]/10"
    }`;

  const labelCls =
    "block text-[10px] uppercase tracking-[0.18em] mb-1.5 font-medium";

  return (
    <div className="relative min-h-screen">
      {/* ── Background image + black overlay ── */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,7,6,0.72) 0%, rgba(12,7,6,0.80) 45%, rgba(12,7,6,0.88) 100%)",
        }}
      />

      {/* ── Top nav bar ── */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(12,7,6,0.45)",
          backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/80 transition-opacity hover:opacity-60"
        >
          <ArrowLeft size={13} />
          Back
        </Link>
        <span
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "#C9A84C" }}
        >
          Free Quotation
        </span>
        <div className="w-14" />
      </div>

      {/* ── Page content ── */}
      <div className="relative mx-auto max-w-2xl px-5 pb-24 pt-14 sm:px-8">
        {/* Hero heading (over the image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          <h1
            className="mb-3 text-4xl font-medium leading-tight md:text-5xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            Request a{" "}
            <em className="not-italic" style={{ color: "#E8B4A0" }}>
              Free Quote
            </em>
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/70">
            Tell us about your windows and fabric preferences — we'll reply
            within a few hours with a full price breakdown.
          </p>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Trust icon={<Clock size={14} />} label="Reply in hours" />
            <Trust icon={<ShieldCheck size={14} />} label="No obligation" />
            <Trust
              icon={<MessageCircle size={14} />}
              label="Sent via WhatsApp"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="space-y-6"
        >
          {/* ── Contact ── */}
          <Section title="Your Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div data-error={!!errors.name}>
                <label
                  className={labelCls}
                  style={{ color: errors.name ? "#c0392b" : "#1A0A0D" }}
                >
                  Name{errors.name && <Req />}
                </label>
                <input
                  className={inputCls(errors.name)}
                  placeholder="Sara Lamichhane"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: false }));
                  }}
                />
              </div>
              <div data-error={!!errors.phone}>
                <label
                  className={labelCls}
                  style={{ color: errors.phone ? "#c0392b" : "#1A0A0D" }}
                >
                  Phone / Viber{errors.phone && <Req />}
                </label>
                <input
                  className={inputCls(errors.phone)}
                  placeholder="98XXXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((p) => ({ ...p, phone: false }));
                  }}
                />
              </div>
            </div>
          </Section>

          {/* ── Windows ── */}
          <Section
            title="Window Measurements"
            subtitle="inches"
            action={
              <button
                onClick={addWindow}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
                style={{ color: "#62101F" }}
              >
                <Plus size={12} />
                Add window
              </button>
            }
          >
            <div className="space-y-3">
              <AnimatePresence>
                {windows.map((w, i) => (
                  <motion.div
                    key={w.id}
                    data-error={!!errors[`win_${i}`]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-xl p-4"
                    style={{
                      background: errors[`win_${i}`]
                        ? "rgba(220,38,38,0.04)"
                        : "rgba(98,16,31,0.03)",
                      border: `0.5px solid ${
                        errors[`win_${i}`]
                          ? "rgba(220,38,38,0.2)"
                          : "rgba(98,16,31,0.08)"
                      }`,
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="text-[10px] font-medium uppercase tracking-[0.14em]"
                        style={{ color: "#62101F" }}
                      >
                        Window {i + 1}
                      </span>
                      {windows.length > 1 && (
                        <button
                          onClick={() => removeWindow(w.id)}
                          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] opacity-40 transition-opacity hover:opacity-80"
                          style={{ color: "#62101F" }}
                        >
                          <Trash2 size={11} />
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          className={labelCls}
                          style={{ color: "#9A7070" }}
                        >
                          Room
                        </label>
                        <input
                          className={inputCls(false)}
                          placeholder="Bedroom"
                          value={w.room}
                          onChange={(e) =>
                            updateWindow(w.id, "room", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          className={labelCls}
                          style={{
                            color: errors[`win_${i}`] ? "#c0392b" : "#9A7070",
                          }}
                        >
                          Width&ldquo;
                        </label>
                        <input
                          className={inputCls(errors[`win_${i}`] && !w.width)}
                          placeholder='60"'
                          type="number"
                          min="0"
                          value={w.width}
                          onChange={(e) => {
                            updateWindow(w.id, "width", e.target.value);
                            setErrors((p) => ({ ...p, [`win_${i}`]: false }));
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className={labelCls}
                          style={{
                            color: errors[`win_${i}`] ? "#c0392b" : "#9A7070",
                          }}
                        >
                          Height&ldquo;
                        </label>
                        <input
                          className={inputCls(errors[`win_${i}`] && !w.height)}
                          placeholder='84"'
                          type="number"
                          min="0"
                          value={w.height}
                          onChange={(e) => {
                            updateWindow(w.id, "height", e.target.value);
                            setErrors((p) => ({ ...p, [`win_${i}`]: false }));
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className={labelCls}
                          style={{ color: "#9A7070" }}
                        >
                          Panels
                        </label>
                        <input
                          className={inputCls(false)}
                          placeholder="1"
                          type="number"
                          min="1"
                          value={w.quantity}
                          onChange={(e) =>
                            updateWindow(w.id, "quantity", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {errors[`win_${i}`] && (
                      <p
                        className="mt-2 text-[10px]"
                        style={{ color: "#c0392b" }}
                      >
                        Width and height are required.
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Section>

          {/* ── Fabric ── */}
          <Section title="Fabric Type" error={errors.fabric}>
            <div data-error={!!errors.fabric} className="flex flex-wrap gap-2">
              {FABRICS.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFabric(f);
                    setErrors((p) => ({ ...p, fabric: false }));
                  }}
                  className="rounded-full px-3.5 py-2 text-[10px] uppercase tracking-[0.1em] transition-all duration-200"
                  style={{
                    background:
                      fabric === f ? "#62101F" : "rgba(98,16,31,0.05)",
                    color: fabric === f ? "#fff" : "#62101F",
                    border: `0.5px solid ${
                      fabric === f ? "#62101F" : "rgba(98,16,31,0.18)"
                    }`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {errors.fabric && (
              <p className="mt-2 text-[10px]" style={{ color: "#c0392b" }}>
                Please select a fabric type.
              </p>
            )}
          </Section>

          {/* ── Header + Lining ── */}
          <Section title="Finish Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls} style={{ color: "#1A0A0D" }}>
                  Header Style
                </label>
                <div className="relative">
                  <select
                    className={
                      inputCls(false) + " appearance-none pr-8 cursor-pointer"
                    }
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                  >
                    <option value="">Select header…</option>
                    {HEADERS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9A7070" }}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls} style={{ color: "#1A0A0D" }}>
                  Lining
                </label>
                <div className="relative">
                  <select
                    className={
                      inputCls(false) + " appearance-none pr-8 cursor-pointer"
                    }
                    value={lining}
                    onChange={(e) => setLining(e.target.value)}
                  >
                    <option value="">Select lining…</option>
                    {LININGS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9A7070" }}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* ── Notes ── */}
          <Section title="Design Ideas" subtitle="optional">
            <textarea
              className={inputCls(false)}
              rows={4}
              placeholder="e.g. Prefer warm earthy tones, floor-length drapes, matching the wooden furniture…"
              value={designNotes}
              onChange={(e) => setDesignNotes(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </Section>

          {/* ── Submit ── */}
          <div className="pt-2">
            <button
              onClick={handleSend}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-[11px] uppercase tracking-[0.2em] text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background:
                  "linear-gradient(135deg, #7A1525 0%, #62101F 60%, #4A0C18 100%)",
                boxShadow: "0 12px 30px rgba(98,16,31,0.4)",
              }}
            >
              <MessageCircle size={15} />
              Send via WhatsApp
            </button>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/55">
              We&apos;ll reply within a few hours · Free quotation
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function Section({ title, subtitle, action, error, children }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#fff",
        border: `0.5px solid ${error ? "rgba(220,38,38,0.25)" : "rgba(98,16,31,0.08)"}`,
        boxShadow: "0 18px 45px rgba(0,0,0,0.28)",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2
            className="text-[10px] uppercase tracking-[0.2em] font-medium"
            style={{ color: "#1A0A0D" }}
          >
            {title}
          </h2>
          {subtitle && (
            <span className="text-[10px]" style={{ color: "#9A7070" }}>
              ({subtitle})
            </span>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Trust({ icon, label }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-white/70">
      <span style={{ color: "#E8B4A0" }}>{icon}</span>
      {label}
    </span>
  );
}

function Req() {
  return (
    <span
      className="ml-1 normal-case tracking-normal font-normal"
      style={{ color: "#c0392b" }}
    >
      — required
    </span>
  );
}
