"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuotationModal from "../ui/QuotationModal";

const categories = [
  { id: "all", label: "All Work" },
  { id: "blackout", label: "Blackout" },
  { id: "sheer", label: "Sheer & Linen" },
  { id: "velvet", label: "Velvet" },
  { id: "jacquard", label: "Jacquard" },
  { id: "blinds", label: "Blinds" },
  { id: "office", label: "Office & Commercial" },
];

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    category: "sheer",
    label: "Ivory Linen Sheer",
    location: "Lazimpat, KTM",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    category: "velvet",
    label: "Burgundy Velvet",
    location: "Patan Residence",
    span: "wide",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "blackout",
    label: "Charcoal Blackout",
    location: "Baneshwor Flat",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    category: "jacquard",
    label: "Floral Jacquard",
    location: "Bhaktapur Villa",
    span: "normal",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    category: "sheer",
    label: "White Voile Panel",
    location: "Budhanilkantha",
    span: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    category: "office",
    label: "Corporate Fitout",
    location: "Thamel Office, KTM",
    span: "wide",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "blinds",
    label: "Zebra Roller Blind",
    location: "Koteshwor",
    span: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "velvet",
    label: "Olive Velvet Drape",
    location: "Kirtipur",
    span: "normal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    category: "blackout",
    label: "Navy Blackout",
    location: "Pokhara Residence",
    span: "wide",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
    category: "jacquard",
    label: "Gold Jacquard Panel",
    location: "Durbarmarg",
    span: "tall",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "sheer",
    label: "Blush Linen Sheer",
    location: "Naxal, KTM",
    span: "normal",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
    category: "office",
    label: "Boardroom Drapes",
    location: "Hattisar Office",
    span: "normal",
  },
];

const spanClass = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [quoteOpen, setQuoteOpen] = useState(false);

  const filtered =
    active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* ── GALLERY SECTION ─────────────────────────────── */}
        <section
          className="px-5 pb-24 md:px-10 lg:px-16"
          style={{
            background: "linear-gradient(180deg, white 0%, #FDF8F3 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 flex flex-wrap items-center gap-2 border-b pb-8"
              style={{ borderColor: "rgba(98,16,31,0.08)" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className="rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    background: active === cat.id ? "#62101F" : "transparent",
                    color: active === cat.id ? "#fff" : "#9A7070",
                    border: `0.5px solid ${active === cat.id ? "#62101F" : "rgba(98,16,31,0.18)"}`,
                  }}
                >
                  {cat.label}
                </button>
              ))}

              {/* Count badge */}
              <span
                className="ml-auto text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "#C9A84C" }}
              >
                {filtered.length} projects
              </span>
            </motion.div>

            {/* Masonry-style grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px]"
              >
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.05,
                    }}
                    className={`group relative overflow-hidden cursor-pointer ${spanClass[img.span] ?? ""}`}
                    style={{ borderRadius: "10px" }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(26,10,13,0.8) 0%, rgba(26,10,13,0.2) 50%, transparent 100%)",
                      }}
                    />

                    {/* Label — slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p
                        className="text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: "#C9A84C" }}
                      >
                        {img.location}
                      </p>
                      <p
                        className="mt-0.5 text-sm font-light text-white"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {img.label}
                      </p>
                    </div>

                    {/* Category pill — always visible */}
                    <div
                      className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        color: "#62101F",
                      }}
                    >
                      {categories.find((c) => c.id === img.category)?.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 text-center"
            >
              <p className="mb-6 text-sm" style={{ color: "#7A5C5C" }}>
                Want curtains like these for your home?
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="group inline-flex items-center gap-3 rounded-full px-10 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #7A1525 0%, #62101F 60%, #4A0C18 100%)",
                }}
              >
                Request a Free Quote
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {quoteOpen && <QuotationModal onClose={() => setQuoteOpen(false)} />}
    </>
  );
}
