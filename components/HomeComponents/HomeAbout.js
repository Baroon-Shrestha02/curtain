"use client";
// components/AboutSection.jsx
import React from "react";
import { motion } from "motion/react";

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
    <section className="container mx-auto relative min-h-screen w-full bg-white overflow-hidden px-6 md:px-14 py-20">
      <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-3 items-center gap-12">
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
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                marginBottom: i === 3 ? "2rem" : 0,
              }}
            >
              {word}
            </motion.h2>
          ))}

          <motion.div
            {...fadeUp(0.55)}
            className="relative w-[220px] h-[135px] rounded overflow-hidden cursor-pointer group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70')",
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-3.5 h-3.5 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.p
            {...fadeIn(0.7)}
            className="mt-3 text-xs leading-relaxed text-black/40"
          >
            Crafting custom curtains for homes
            <br />
            across the Kathmandu Valley.
          </motion.p>
        </div>

        {/* Center Image */}
        {/* Center Image */}
        <div className="flex justify-center">
          <motion.div
            {...imageReveal}
            className="relative w-[260px] md:w-[320px] h-[430px] md:h-[520px] overflow-hidden bg-neutral-200"
          >
            <motion.img
              {...imageScale}
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
              alt="Curtain interior"
              className="block w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-6 max-w-[300px]">
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
