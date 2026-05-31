"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Ruler, ShieldCheck } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Ruler,
    title: "Made to Measure",
    body: "Every curtain and blind is crafted to your exact window dimensions — no off-the-shelf shortcuts, no compromise on fit or finish.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Fitting",
    body: "Our trained fitting team handles installation end to end, with a two-year workmanship guarantee and free revisits if needed.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 50, suffix: "+", label: "Fabric Collections", highlight: true },
  { value: 12, suffix: "+", label: "Years of Experience" },
];

// Replace these with your actual image paths
const IMAGE_1 = "/slider1.jpg";
const IMAGE_2 = "/slider2.jpg";

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────

function useCounter(target, duration = 1600, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

// ─── STAT ITEM ────────────────────────────────────────────────────────────────

function StatItem({ value, suffix, label, highlight, started, index }) {
  const count = useCounter(value, 1600, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative overflow-hidden px-6 py-7 ${
        index < STATS.length - 1 ? "border-r border-black/10" : ""
      } ${highlight ? "bg-[#62101F]" : ""}`}
    >
      {/* Decorative arc */}
      <div
        className={`pointer-events-none absolute right-0 bottom-0 h-[100px] w-[100px] rounded-tl-full border ${
          highlight ? "border-white/15" : "border-black/10"
        }`}
      />

      <p
        className={`text-[42px] font-semibold leading-none tracking-tight ${
          highlight ? "text-white" : "text-black"
        }`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {count}
        <span className={highlight ? "text-white/70" : "text-[#62101F]"}>
          {suffix}
        </span>
      </p>
      <p
        className={`mt-3 text-xs uppercase tracking-widest ${
          highlight ? "text-white/60" : "text-black/45"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const topRef = useRef(null);
  const statsRef = useRef(null);

  const topInView = useInView(topRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  // Stagger container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -36 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="bg-[#f7f7f5] px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* ── TOP — images + copy ── */}
        <motion.div
          ref={topRef}
          variants={container}
          initial="hidden"
          animate={topInView ? "show" : "hidden"}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left — two independent images */}
          <motion.div variants={fadeLeft} className="flex h-[420px] gap-4">
            {/* Tall image */}
            <div className="flex-[1.15] overflow-hidden rounded-[14px]">
              <img
                src={IMAGE_1}
                alt="Elegant curtains in a living room"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Shorter image — pinned to bottom */}
            <div className="mt-auto h-[73%] flex-1 overflow-hidden rounded-[14px]">
              <img
                src={IMAGE_2}
                alt="Fabric blind close-up"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right — copy */}
          <div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-semibold leading-[1.18] tracking-tight text-black md:text-[2.6rem]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Crafted with Care,
              <br />
              Made for Your Home
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 mb-7 max-w-md text-sm leading-7 text-black/55"
            >
              At Cozy Curtains, we believe every window tells a story. From the
              first measurement to the final fitting, we bring precision,
              quality, and warmth to every home we work with.
            </motion.p>

            <div className="flex flex-col gap-6">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  <div className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-[#62101F]">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="mb-1 text-[15px] font-semibold text-black"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {title}
                    </p>
                    <p className="text-sm leading-[1.7] text-black/55">
                      {body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── STATS ── */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-3 border-t border-black/10"
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              started={statsInView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
