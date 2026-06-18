"use client";

import React from "react";
import { Eye, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop";

const badgeBackground = {
  New: "#C9A84C",
  Bestseller: "#1A0A0D",
  Sale: "#62101F",
  Limited: "#3D2D1F",
};

const fmt = (n) =>
  Number(n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export default function ProductCard({ product, onView, onWhatsApp }) {
  const image = product?.images?.[0]?.url ?? PLACEHOLDER_IMG;
  const hasDiscount = (product?.discount ?? 0) > 0;
  const showBadge = product?.badge && product.badge !== "None";

  const displayPrice =
    product?.discountedPricePerSqFt ?? product?.pricePerSqFt ?? 0;
  const originalPrice = product?.pricePerSqFt ?? 0;

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
        <div className="relative w-[110px] shrink-0 bg-[#F7F2EE]">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover"
          />

          {showBadge && (
            <div
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white"
              style={{
                background: badgeBackground[product.badge] ?? "#62101F",
              }}
            >
              {product.badge}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            <p
              className="mb-0.5 text-[8px] uppercase tracking-[0.24em]"
              style={{ color: "#C9A84C" }}
            >
              {product.subcategory}
            </p>

            <h3
              className="text-[12px] font-medium leading-snug capitalize"
              style={{
                color: "#1A0A0D",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {product.name}
            </h3>

            {product.colors?.length > 0 && (
              <div className="mt-1.5 flex gap-1">
                {product.colors.slice(0, 4).map((c) => (
                  <span
                    key={c._id ?? c.hex}
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-baseline gap-1.5 flex-wrap">
              {hasDiscount && (
                <span
                  className="text-[10px] line-through"
                  style={{ color: "#C4AEAD" }}
                >
                  Rs. {fmt(originalPrice)}
                </span>
              )}
              <span
                className="text-[15px] font-light"
                style={{
                  color: "#62101F",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Rs. {fmt(displayPrice)}
              </span>
              <span className="text-[9px] text-black/45">/ sq ft</span>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => onView?.(product)}
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
                onClick={() => onWhatsApp?.(product)}
                className="flex items-center gap-1 rounded px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-white transition-opacity duration-300 hover:opacity-90"
                style={{ background: "#62101F" }}
              >
                <MessageCircle size={10} />
                Order
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ────────────────────────────────────────
          DESKTOP  (≥ md) — Style D: square + tags
      ──────────────────────────────────────── */}
      <div className="hidden md:flex md:flex-col">
        <div
          className="relative overflow-hidden bg-[#F7F2EE]"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {showBadge && (
            <div
              className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white"
              style={{
                background: badgeBackground[product.badge] ?? "#62101F",
              }}
            >
              {product.badge}
            </div>
          )}

          {hasDiscount && (
            <div className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-[#62101F]">
              -{product.discount}%
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            <button
              onClick={() => onView?.(product)}
              className="flex w-full items-center justify-center gap-2 bg-white/95 py-3 text-[10px] uppercase tracking-[0.2em] text-[#1A0A0D] backdrop-blur-sm transition-colors duration-200 hover:bg-white"
            >
              <Eye size={12} />
              Quick View
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p
            className="mb-1 text-[9px] uppercase tracking-[0.28em]"
            style={{ color: "#C9A84C" }}
          >
            {product.subcategory}
          </p>

          <h3
            className="text-[13px] font-medium leading-snug capitalize"
            style={{
              color: "#1A0A0D",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {product.name}
          </h3>

          {product.features?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.1em]"
                  style={{
                    background: "rgba(98,16,31,0.06)",
                    color: "#62101F",
                    border: "0.5px solid rgba(98,16,31,0.12)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="mt-3 flex gap-1.5">
              {product.colors.slice(0, 5).map((c) => (
                <span
                  key={c._id ?? c.hex}
                  title={c.name}
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          <div className="flex-1" />

          <div
            className="my-3 h-px"
            style={{ background: "rgba(98,16,31,0.07)" }}
          />

          <div className="mb-1 flex items-baseline gap-2 flex-wrap">
            {hasDiscount && (
              <span
                className="text-[11px] line-through"
                style={{ color: "#C4AEAD" }}
              >
                Rs. {fmt(originalPrice)}
              </span>
            )}
            <span
              className="text-[18px] font-light"
              style={{
                color: "#62101F",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Rs. {fmt(displayPrice)}
            </span>
            <span className="text-[10px] text-black/45">/ sq ft</span>
          </div>

          {product.minOrderQty > 1 && (
            <p className="mb-3 text-[10px] text-black/45">
              Min order: {product.minOrderQty} sq ft
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => onView?.(product)}
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
              onClick={() => onWhatsApp?.(product)}
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
