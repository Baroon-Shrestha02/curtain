"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import QuotationModal from "../ui/QuotationModal";

export default function GalleryHero() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <div className="bg-white">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-white px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          {/* Decorative line — left */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute left-6 top-0 bottom-0 w-px md:left-12"
            style={{ background: "rgba(98,16,31,0.12)" }}
          />

          <div className="max-w-7xl mx-auto">
            <div className="pl-6 md:pl-16">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="mb-6 text-[10px] uppercase tracking-[0.4em]"
                style={{ color: "#C9A84C" }}
              >
                Our Work · Kathmandu & Beyond
              </motion.p>

              {/* Main heading — line 1 */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.35,
                  }}
                  className="text-6xl font-light leading-none md:text-8xl lg:text-[9rem]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#1A0A0D",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Every Window,
                </motion.h1>
              </div>

              {/* Main heading — line 2 + badge */}
              <div className="overflow-hidden flex items-baseline gap-6">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.5,
                  }}
                  className="text-6xl font-light leading-none md:text-8xl lg:text-[9rem]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: "#62101F",
                    letterSpacing: "-0.02em",
                    fontStyle: "italic",
                  }}
                >
                  A Story.
                </motion.h1>

                {/* Stat badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "backOut", delay: 0.8 }}
                  className="hidden md:flex flex-col items-center justify-center rounded-full border text-center w-24 h-24 flex-shrink-0"
                  style={{
                    borderColor: "rgba(98,16,31,0.2)",
                    background: "rgba(98,16,31,0.03)",
                  }}
                >
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#62101F",
                    }}
                  >
                    200+
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-[0.14em] mt-0.5"
                    style={{ color: "#9A7070" }}
                  >
                    Homes done
                  </span>
                </motion.div>
              </div>

              {/* Sub copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.65,
                }}
                className="mt-8 max-w-md text-base leading-7 md:text-lg"
                style={{ color: "#7A5C5C" }}
              >
                Curtains we&apos;ve crafted for homes, apartments, and offices
                across Nepal — each one measured, stitched, and fitted in-house.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.8,
                }}
                className="mt-10 flex items-center gap-8 flex-wrap"
              >
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] transition-opacity duration-200 hover:opacity-70"
                  style={{ color: "#62101F" }}
                >
                  Request a quote
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <span
                  className="h-px w-12"
                  style={{ background: "rgba(98,16,31,0.2)" }}
                />

                <span
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "#9A7070" }}
                >
                  Free swatches available
                </span>
              </motion.div>
            </div>
          </div>

          {/* Decorative large watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none hidden lg:block"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "28vw",
              fontWeight: 300,
              color: "rgba(98,16,31,0.03)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            CC
          </motion.div>
        </section>
      </div>

      {/* Quotation Modal */}
      {quoteOpen && <QuotationModal onClose={() => setQuoteOpen(false)} />}
    </>
  );
}
