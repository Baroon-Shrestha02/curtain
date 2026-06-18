"use client";
// components/AboutSection.jsx
import React from "react";
import { motion } from "motion/react";

// 👇 Swap these for your own files (put them in /public or use a CDN URL)
const VIDEO_SRC = "/living.MOV";
const VIDEO_SRC_CENTER = "about.mp4";
const POSTER_SRC =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70";
const POSTER_SRC_CENTER =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

const imageReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
};

const imageScale = {
  initial: { scale: 1.12 },
  whileInView: { scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
};

export default function HomeAbout() {
  return (
    <section className="container mx-auto relative w-full bg-white overflow-hidden px-5 sm:px-8 lg:px-12 py-16 lg:py-0 lg:pt-16 lg:min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-start lg:items-center gap-12 lg:min-h-[80vh]">
        {/* Left Content */}
        <div className="flex flex-col">
          <motion.p
            {...fadeIn(0)}
            className="text-[9px] tracking-[0.32em] uppercase mb-5 text-black/40"
          >
            About Us
          </motion.p>

          {["WOVEN FOR", "YOUR", "NEPALI", "HOME."].map((word, i) => (
            <motion.h2
              key={i}
              {...fadeUp(0.1 + i * 0.1)}
              className="leading-none tracking-tight text-[#0f0f0f]"
              style={{
                fontFamily: "var(--font-bebas), 'Arial Black', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                marginBottom: i === 3 ? "2rem" : 0,
              }}
            >
              {word}
            </motion.h2>
          ))}

          {/* Video — autoplay, muted, loop */}
          <motion.div
            {...fadeUp(0.55)}
            className="group relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-neutral-200"
          >
            <video
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover transition-all duration-500"
            />
          </motion.div>

          <motion.p
            {...fadeIn(0.7)}
            className="mt-3 text-xs leading-relaxed text-black/40"
          >
            See how each curtain is measured, stitched, and fitted —
            <br />
            crafted for homes across the Kathmandu Valley.
          </motion.p>
        </div>

        {/* Center Video */}
        <div className="flex justify-center">
          <motion.div
            {...imageReveal}
            className="relative w-[260px] md:w-[320px] h-[430px] md:h-[520px] overflow-hidden bg-neutral-200"
          >
            <motion.video
              {...imageScale}
              src={VIDEO_SRC_CENTER}
              poster={POSTER_SRC_CENTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col max-w-[300px]">
          <motion.p
            {...slideRight(0.4)}
            className="text-base leading-relaxed text-black/60"
          >
            <strong className="text-[#111] font-semibold text-base">
              Cozy Curtains is a Kathmandu-based custom curtain maker trusted by
              hundreds of homes and offices across Nepal.
            </strong>{" "}
            From sheer linens to blackout drapes, every piece is tailored to
            your exact window dimensions and delivered to your door.
          </motion.p>

          <motion.div {...fadeIn(0.5)} className="h-px bg-black/10 my-6" />

          <motion.p
            {...slideRight(0.55)}
            className="text-base leading-relaxed text-black/60"
          >
            <strong className="text-[#111] font-semibold text-base">
              With fully in-house manufacturing and same-week delivery within
              the valley, we make custom curtains as easy as ordering online.
            </strong>{" "}
            Order via Viber, pay with eSewa or Khalti, and we handle the rest —
            measuring, stitching, and fitting included.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
