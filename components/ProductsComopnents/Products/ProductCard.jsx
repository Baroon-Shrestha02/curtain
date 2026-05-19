"use client";

import React, { useState } from "react";
import { Eye, MessageCircle, Star, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function ProductCard({ product, onView, onViber }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white"
      style={{
        border: "0.5px solid rgba(98,16,31,0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(98,16,31,0.05)",
      }}
    >
      {/* ────────────────────────────────────────
          MOBILE  (< md) — Style B: horizontal
      ──────────────────────────────────────── */}
      <div className="flex md:hidden">
        {/* Image — fixed width strip */}
        <div className="relative w-[110px] shrink-0 bg-[#F7F2EE]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />

          {/* Badge */}
          {(product.sale || product.badge) && (
            <div
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em]"
              style={{ background: "#C9A84C", color: "#7a5500" }}
            >
              {product.badge ?? "Sale"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.08em]"
                    style={{
                      background: "rgba(98,16,31,0.06)",
                      color: "#62101F",
                      border: "0.5px solid rgba(98,16,31,0.12)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p
              className="mb-0.5 text-[8px] uppercase tracking-[0.24em]"
              style={{ color: "#C9A84C" }}
            >
              {product.category}
            </p>

            <h3
              className="text-[12px] font-medium leading-snug"
              style={{
                color: "#1A0A0D",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {product.name}
            </h3>

            <div className="mt-1.5 flex items-center gap-1">
              <div className="flex gap-px" style={{ color: "#C9A84C" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={9} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-[9px]" style={{ color: "#9A7070" }}>
                ({product.reviews})
              </span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-baseline gap-1.5">
              {product.oldPrice && (
                <span
                  className="text-[10px] line-through"
                  style={{ color: "#C4AEAD" }}
                >
                  Rs. {product.oldPrice}
                </span>
              )}
              <span
                className="text-[15px] font-light"
                style={{
                  color: "#62101F",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Rs. {product.price}
              </span>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => onView(product)}
                className="rounded px-3 py-2 text-[9px] uppercase tracking-[0.14em] transition-all duration-300 hover:bg-[#1A0A0D] hover:text-white"
                style={{
                  border: "0.5px solid rgba(26,10,13,0.2)",
                  color: "#1A0A0D",
                  background: "transparent",
                }}
              >
                View
              </button>
              <button
                onClick={() => onViber(product)}
                className="flex items-center gap-1 rounded px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-white transition-opacity duration-300 hover:opacity-90"
                style={{ background: "#62101F" }}
              >
                <MessageCircle size={10} />
                Order
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist — top right */}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90"
          aria-label="Wishlist"
        >
          <Heart
            size={11}
            fill={wished ? "#62101F" : "none"}
            stroke={wished ? "#62101F" : "#1A0A0D"}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* ────────────────────────────────────────
          DESKTOP  (≥ md) — Style D: square + tags
      ──────────────────────────────────────── */}
      <div className="hidden md:flex md:flex-col">
        {/* Square image */}
        <div
          className="relative overflow-hidden bg-[#F7F2EE]"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Badge */}
          {(product.sale || product.badge) && (
            <div
              className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: "rgba(255,255,255,0.92)", color: "#62101F" }}
            >
              {product.badge ?? "Sale"}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setWished((w) => !w)}
            className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform duration-200 hover:scale-110"
            aria-label="Wishlist"
          >
            <Heart
              size={13}
              fill={wished ? "#62101F" : "none"}
              stroke={wished ? "#62101F" : "#1A0A0D"}
              strokeWidth={1.5}
            />
          </button>

          {/* Quick view slide-up */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            <button
              onClick={() => onView(product)}
              className="flex w-full items-center justify-center gap-2 bg-white/95 py-3 text-[10px] uppercase tracking-[0.2em] text-[#1A0A0D] backdrop-blur-sm transition-colors duration-200 hover:bg-white"
            >
              <Eye size={12} />
              Quick View
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.1em]"
                  style={{
                    background: "rgba(98,16,31,0.06)",
                    color: "#62101F",
                    border: "0.5px solid rgba(98,16,31,0.12)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p
            className="mb-1 text-[9px] uppercase tracking-[0.28em]"
            style={{ color: "#C9A84C" }}
          >
            {product.category}
          </p>

          <h3
            className="text-[13px] font-medium leading-snug"
            style={{
              color: "#1A0A0D",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {product.name}
          </h3>

          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex gap-0.5" style={{ color: "#C9A84C" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={10} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-[10px]" style={{ color: "#9A7070" }}>
              ({product.reviews})
            </span>
          </div>

          <div className="flex-1" />

          <div
            className="my-3 h-px"
            style={{ background: "rgba(98,16,31,0.07)" }}
          />

          <div className="mb-3 flex items-baseline gap-2">
            {product.oldPrice && (
              <span
                className="text-[11px] line-through"
                style={{ color: "#C4AEAD" }}
              >
                Rs. {product.oldPrice}
              </span>
            )}
            <span
              className="text-[18px] font-light"
              style={{
                color: "#62101F",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Rs. {product.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onView(product)}
              className="rounded py-2.5 text-[10px] uppercase tracking-[0.16em] transition-all duration-300 hover:bg-[#1A0A0D] hover:text-white"
              style={{
                border: "0.5px solid rgba(26,10,13,0.2)",
                color: "#1A0A0D",
                background: "transparent",
              }}
            >
              View
            </button>
            <button
              onClick={() => onViber(product)}
              className="flex items-center justify-center gap-1.5 rounded py-2.5 text-[10px] uppercase tracking-[0.16em] text-white transition-opacity duration-300 hover:opacity-90"
              style={{ background: "#62101F" }}
            >
              <MessageCircle size={11} />
              Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
