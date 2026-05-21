"use client";

import React from "react";
import { X, MessageCircle, Star, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProductModal({ product, onClose, onWhatsApp }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl overflow-hidden bg-white"
            style={{ borderRadius: "16px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex flex-col md:flex-row"
              style={{ maxHeight: "90vh" }}
            >
              {/* ── LEFT — sticky image ── */}
              <div
                className="relative w-full shrink-0 bg-[#F7F2EE] md:w-[48%]"
                style={{ minHeight: "280px" }}
              >
                <div className="sticky top-0 h-[280px] md:h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    style={{ minHeight: "280px", maxHeight: "90vh" }}
                  />
                  {(product.sale || product.badge) && (
                    <div
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "#62101F",
                      }}
                    >
                      {product.badge ?? "Sale"}
                    </div>
                  )}
                  <div className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/85 backdrop-blur-sm">
                    <Heart size={14} stroke="#62101F" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* ── RIGHT — scrollable ── */}
              <div
                className="w-full flex-1 overflow-y-auto"
                style={{ maxHeight: "90vh" }}
              >
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white transition-transform duration-200 hover:rotate-90"
                >
                  <X size={14} />
                </button>

                <div className="p-7 md:p-10">
                  <p
                    className="mb-2 text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: "#C9A84C" }}
                  >
                    {product.category} · Premium Collection
                  </p>

                  <h2
                    className="text-2xl font-light leading-tight md:text-3xl"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#1A0A0D",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {product.name}
                  </h2>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex gap-0.5" style={{ color: "#C9A84C" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "#9A7070" }}>
                      {product.rating} / 5 · {product.reviews} reviews
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-3">
                    {product.oldPrice && (
                      <span
                        className="text-base line-through"
                        style={{ color: "#C4AEAD" }}
                      >
                        Rs. {product.oldPrice}
                      </span>
                    )}
                    <span
                      className="text-3xl font-light"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: "#62101F",
                      }}
                    >
                      Rs. {product.price}
                    </span>
                  </div>

                  <p
                    className="mt-6 text-sm leading-7"
                    style={{ color: "#7A5C5C" }}
                  >
                    {product.description}
                  </p>

                  <div
                    className="my-7 h-px"
                    style={{ background: "rgba(98,16,31,0.08)" }}
                  />

                  {product.tags?.length > 0 && (
                    <div className="mb-7">
                      <p
                        className="mb-3 text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "#1A0A0D" }}
                      >
                        Features
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.1em]"
                            style={{
                              background: "rgba(98,16,31,0.06)",
                              color: "#62101F",
                              border: "0.5px solid rgba(98,16,31,0.15)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.colors?.length > 0 && (
                    <div className="mb-7">
                      <p
                        className="mb-3 text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "#1A0A0D" }}
                      >
                        Available Colours
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <div
                            key={color}
                            className="h-9 w-9 cursor-pointer rounded-full ring-2 ring-white ring-offset-1 transition-transform duration-150 hover:scale-110"
                            style={{
                              backgroundColor: color,
                              boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {product.swatches?.length > 0 && (
                    <div className="mb-7">
                      <p
                        className="mb-3 text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "#1A0A0D" }}
                      >
                        Fabric Swatches
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {product.swatches.map((swatch, i) => (
                          <img
                            key={i}
                            src={swatch}
                            alt={`Swatch ${i + 1}`}
                            className="h-24 w-full cursor-pointer rounded object-cover transition-opacity duration-200 hover:opacity-80"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {product.specs && (
                    <div className="mb-7">
                      <p
                        className="mb-3 text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "#1A0A0D" }}
                      >
                        Details
                      </p>
                      <div className="space-y-2">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <div
                            key={key}
                            className="flex justify-between text-xs"
                            style={{
                              borderBottom: "0.5px solid rgba(98,16,31,0.06)",
                              paddingBottom: "6px",
                            }}
                          >
                            <span style={{ color: "#9A7070" }}>{key}</span>
                            <span style={{ color: "#1A0A0D", fontWeight: 500 }}>
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className="mb-6 h-px"
                    style={{ background: "rgba(98,16,31,0.08)" }}
                  />

                  {/* CTA buttons */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => onWhatsApp(product)}
                      className="flex items-center justify-center gap-2 rounded py-4 text-[11px] uppercase tracking-[0.18em] text-white transition-opacity duration-200 hover:opacity-90"
                      style={{ background: "#25D366" }}
                    >
                      <MessageCircle size={14} />
                      Order via WhatsApp
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 rounded py-4 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 hover:bg-[#1A0A0D] hover:text-white"
                      style={{
                        border: "0.5px solid rgba(26,10,13,0.2)",
                        color: "#1A0A0D",
                        background: "transparent",
                      }}
                    >
                      Request Free Swatch
                    </button>
                  </div>

                  <p
                    className="mt-5 text-center text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "#9A7070" }}
                  >
                    Free delivery · 3–7 days (KTM) · Pay via eSewa or Khalti
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
