"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Send, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export default function QuotationModal({ onClose }) {
  const [windows, setWindows] = useState([emptyWindow()]);
  const [fabric, setFabric] = useState("");
  const [header, setHeader] = useState("");
  const [lining, setLining] = useState("");
  const [designNotes, setDesignNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const addWindow = () => setWindows((prev) => [...prev, emptyWindow()]);

  const removeWindow = (id) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));

  const updateWindow = (id, field, value) =>
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
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
          `  ${i + 1}. ${w.room ? `${w.room} — ` : ""}W: ${w.width}" × H: ${w.height}"${w.quantity > 1 ? ` (×${w.quantity} panels)` : ""}`,
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
    if (!validate()) return;
    const msg = encodeURIComponent(buildMessage());
    // Replace with your actual WhatsApp/Viber number
    window.open(`https://wa.me/9779818739823?text=${msg}`, "_blank");
  };

  const inputCls = (err) =>
    `w-full rounded px-3 py-2.5 text-sm outline-none transition-all duration-200 ${
      err
        ? "border border-red-300 bg-red-50 focus:border-[#62101F]"
        : "border border-[rgba(98,16,31,0.15)] bg-white focus:border-[#62101F]"
    }`;

  const labelCls =
    "block text-[10px] uppercase tracking-[0.18em] mb-1.5 font-medium";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white"
            style={{ borderRadius: "16px", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-7 py-5"
              style={{ borderBottom: "0.5px solid rgba(98,16,31,0.1)" }}
            >
              <div>
                <p
                  className="text-[9px] uppercase tracking-[0.28em]"
                  style={{ color: "#C9A84C" }}
                >
                  Free Service
                </p>
                <h2
                  className="text-xl font-light"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A0A0D",
                  }}
                >
                  Request a Quote
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white transition-transform duration-200 hover:rotate-90"
              >
                <X size={14} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="max-h-[75vh] overflow-y-auto px-7 py-6">
              {/* Contact */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={labelCls}
                    style={{ color: errors.name ? "#c0392b" : "#1A0A0D" }}
                  >
                    Your Name{" "}
                    {errors.name && (
                      <span className="text-red-400 normal-case tracking-normal">
                        — required
                      </span>
                    )}
                  </label>
                  <input
                    className={inputCls(errors.name)}
                    placeholder="Aarati Shrestha"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: false }));
                    }}
                  />
                </div>
                <div>
                  <label
                    className={labelCls}
                    style={{ color: errors.phone ? "#c0392b" : "#1A0A0D" }}
                  >
                    Phone / Viber{" "}
                    {errors.phone && (
                      <span className="text-red-400 normal-case tracking-normal">
                        — required
                      </span>
                    )}
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

              {/* Divider */}
              <div
                className="mb-5 h-px"
                style={{ background: "rgba(98,16,31,0.07)" }}
              />

              {/* Window measurements */}
              <div className="mb-2 flex items-center justify-between">
                <p
                  className={labelCls}
                  style={{ color: "#1A0A0D", marginBottom: 0 }}
                >
                  Window Measurements{" "}
                  <span
                    style={{
                      color: "#9A7070",
                      fontWeight: 400,
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    (inches)
                  </span>
                </p>
                <button
                  onClick={addWindow}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 hover:opacity-70"
                  style={{ color: "#62101F" }}
                >
                  <Plus size={12} />
                  Add window
                </button>
              </div>

              <div className="mb-6 space-y-3">
                {windows.map((w, i) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-lg p-4"
                    style={{
                      background: errors[`win_${i}`]
                        ? "rgba(220,38,38,0.04)"
                        : "rgba(98,16,31,0.03)",
                      border: `0.5px solid ${errors[`win_${i}`] ? "rgba(220,38,38,0.2)" : "rgba(98,16,31,0.08)"}`,
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

                    <div className="grid grid-cols-4 gap-3">
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
              </div>

              {/* Divider */}
              <div
                className="mb-5 h-px"
                style={{ background: "rgba(98,16,31,0.07)" }}
              />

              {/* Fabric + Header + Lining */}
              <div className="mb-5">
                <label
                  className={labelCls}
                  style={{ color: errors.fabric ? "#c0392b" : "#1A0A0D" }}
                >
                  Fabric Type{" "}
                  {errors.fabric && (
                    <span className="text-red-400 normal-case tracking-normal">
                      — required
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {FABRICS.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setFabric(f);
                        setErrors((p) => ({ ...p, fabric: false }));
                      }}
                      className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] transition-all duration-200"
                      style={{
                        background:
                          fabric === f ? "#62101F" : "rgba(98,16,31,0.05)",
                        color: fabric === f ? "#fff" : "#62101F",
                        border: `0.5px solid ${fabric === f ? "#62101F" : "rgba(98,16,31,0.18)"}`,
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-4">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "#9A7070" }}
                    />
                  </div>
                </div>
              </div>

              {/* Design notes */}
              <div className="mb-2">
                <label className={labelCls} style={{ color: "#1A0A0D" }}>
                  Design Ideas / Notes{" "}
                  <span
                    style={{
                      color: "#9A7070",
                      fontWeight: 400,
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <textarea
                  className={inputCls(false)}
                  rows={3}
                  placeholder="e.g. Prefer warm earthy tones, floor-length drapes, matching the wooden furniture…"
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>

            {/* ── Footer ── */}
            <div
              className="px-7 py-5"
              style={{ borderTop: "0.5px solid rgba(98,16,31,0.1)" }}
            >
              <button
                onClick={handleSend}
                className="flex w-full items-center justify-center gap-2.5 rounded py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-opacity duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #7A1525 0%, #62101F 60%, #4A0C18 100%)",
                }}
              >
                <Send size={14} />
                Send via WhatsApp
              </button>
              <p
                className="mt-3 text-center text-[10px] uppercase tracking-[0.16em]"
                style={{ color: "#9A7070" }}
              >
                We&apos;ll reply within a few hours · Free quotation
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
