"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    duration: "30–60 MIN",
    title: "The Home Visit",
    body: "Our advisor measures every window precisely — recess depth, wall return, ceiling height, and any obstructions — then advises on the ideal drop, fullness, and stack-back, and confirms your walls can take the fixings.",
  },
  {
    num: "02",
    duration: "1–3 HOURS",
    title: "Fitting Day",
    body: "Our team arrives with everything pre-cut and ready. We install, make good any minor marks, dress the curtains to set the pleats and folds, test everything operates correctly, and show you how to care for them.",
  },
];

// Swap for your own atmospheric photo (a measuring or fitting shot works well)
const BG_VIDEO = "/services/vid.mp4";

const EASE = [0.22, 1, 0.36, 1];

export default function ServicesMeasure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section className="bg-[#f7f7f5] px-5 py-12 md:px-10 lg:px-16">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[22px] bg-[#2a201c] px-6 py-14 md:px-8 md:py-14"
        >
          {/* Background image */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={BG_VIDEO} type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(20,12,9,.78), rgba(20,12,9,.66))",
            }}
          />

          {/* Heading */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative mx-auto mb-11 max-w-xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E8B4A0]"
            >
              Measuring &amp; Fitting
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-3.5 text-3xl font-bold leading-[1.16] tracking-tight text-white md:text-[2.1rem]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Precision from the First Visit to the Final Hook
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm leading-[1.75] text-white/70"
            >
              A centimetre off can ruin the look — that's why we never ask you
              to measure yourself.
            </motion.p>
          </motion.div>

          {/* Stepper */}
          <div className="relative mx-auto grid max-w-3xl grid-cols-1 gap-9 md:grid-cols-2 md:gap-12">
            {/* Dotted connector — draws across on scroll (desktop only) */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="absolute left-1/4 right-1/4 top-8 hidden h-0.5 origin-left md:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 7px, transparent 7px 14px)",
              }}
            />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.18,
                  ease: EASE,
                }}
                className="text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-[#E8B4A0]/50 bg-white/10 backdrop-blur-sm">
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {step.num}
                  </span>
                  <span className="absolute -bottom-[7px] left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[#62101F] px-2.5 py-[3px] text-[9px] font-bold tracking-[0.1em] text-white">
                    {step.duration}
                  </span>
                </div>

                <h3
                  className="mb-2.5 text-lg font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs text-[13px] leading-[1.72] text-white/70">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
