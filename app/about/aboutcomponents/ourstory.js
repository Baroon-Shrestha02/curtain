"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  History,
  Fingerprint,
  Scissors,
  Globe2,
  Cpu,
  Sparkles,
  Leaf,
} from "lucide-react";

const ACCENT = "#C19D53"; // brand gold
const ACCENT_ALT = "#FF2A2A"; // brand crimson highlight
const DARK = "#1A1B1C";
const TINT = `${ACCENT}1A`;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ───────────────────────── GENESIS ───────────────────────── */
function GenesisSection() {
  return (
    <motion.section
      id="our-story"
      aria-label="Our story origins"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative w-full overflow-hidden border-b border-gray-200/60 bg-[#FFFDF9] px-6 py-24 selection:bg-[#C19D53]/20 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
        {/* Left — narrative with accent rail */}
        <motion.div
          variants={child}
          className="relative text-left lg:col-span-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white"
              style={{ background: ACCENT }}
            >
              01 — Genesis
            </span>
            <span className="text-xs font-medium tracking-wider text-gray-400">
              Where our story began
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#1A1B1C] sm:text-6xl">
            The spark behind
            <span
              className="mt-2 block font-serif italic"
              style={{ color: ACCENT }}
            >
              The Cozy Curtains
            </span>
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-700 sm:text-lg">
            In 2014, The Cozy Curtains began with a simple conviction: windows
            deserve drapery built with real craft — not mass-produced panels
            rushed off a factory line. We set out to raise the standard for
            how curtains are tailored.
          </p>

          <p className="mt-4 text-sm leading-relaxed font-light text-gray-500 sm:text-base">
            Starting from a small, focused workshop, we committed to the hard
            parts — heritage textiles, hidden weighted hems, and precision
            pleating — so every panel we ship reads beautifully long after
            install day.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2">
            {[
              {
                icon: History,
                title: "Established 2014",
                body: "Built on a foundation of bespoke tailoring and quiet craft.",
              },
              {
                icon: Fingerprint,
                title: "Bespoke DNA",
                body: "No ready-made sizes — every drop is measured, every pleat is ours.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-gray-200 hover:bg-gray-50"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: TINT, color: ACCENT }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1B1C]">{title}</h4>
                  <p className="mt-1 text-xs leading-relaxed font-light text-gray-400">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — layered image with offset accent + floating badge */}
        <motion.div variants={child} className="relative lg:col-span-6">
          <div
            className="absolute -bottom-6 -right-6 h-2/3 w-2/3 rounded-3xl"
            style={{ background: TINT }}
            aria-hidden="true"
          />
          <div className="relative h-[45vh] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 lg:h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200"
              alt="Artisan workspace tailoring premium drapery fabric"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)",
              }}
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 backdrop-blur">
              <span
                className="text-3xl font-bold leading-none"
                style={{ color: ACCENT }}
              >
                10+
              </span>
              <span className="text-[11px] font-semibold uppercase leading-tight tracking-wider text-gray-600">
                Years of
                <br />
                tailoring
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ───────────────────────── EVOLUTION (timeline) ───────────────────────── */
function EvolutionSection() {
  const cards = [
    {
      year: "2014",
      phase: "Founding",
      icon: Globe2,
      eyebrow: "Textile sourcing",
      title: "Global curations",
      body: "Forming direct supply lines with heritage weavers across Belgium and Europe to source elite linen, sheer, and lace variants.",
    },
    {
      year: "2019",
      phase: "Expansion",
      icon: Scissors,
      eyebrow: "Artisan workrooms",
      title: "Fabrication in-house",
      body: "Moving every seam, double-fold hem, and custom master pleat under one roof so the finish stays under millimeter control.",
    },
    {
      year: "2023",
      phase: "Innovation",
      icon: Cpu,
      eyebrow: "Smart drapery",
      title: "Motorized & quiet",
      body: "Integrating architectural tracks with whisper-quiet motors and app-driven control for luxury homes and studios.",
    },
  ];

  return (
    <motion.section
      aria-label="How our work has evolved"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative w-full bg-[#F4F3F0] px-6 py-24 selection:bg-[#C19D53]/20 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl text-center">
        <motion.div variants={child} className="mx-auto mb-16 max-w-3xl">
          <span
            className="block text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            How our work has evolved
          </span>
          <div
            className="mx-auto mt-2 h-px w-12"
            style={{ background: ACCENT }}
          />
          <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#1A1B1C] sm:text-5xl">
            A decade of refining the{" "}
            <span
              className="font-serif italic"
              style={{ color: ACCENT }}
            >
              art of drapery
            </span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed font-light text-gray-500">
            From sourcing rare textiles to in-house artisan tailoring and
            motorized smart tracks — here&apos;s how the craft evolved.
          </p>
        </motion.div>

        {/* Timeline node strip (desktop) */}
        <div className="relative mb-6 hidden grid-cols-3 md:grid">
          <div
            className="absolute top-[7px] left-[16.6%] right-[16.6%] h-px"
            style={{ background: `${ACCENT}4D` }}
            aria-hidden="true"
          />
          {cards.map((c) => (
            <div key={c.year} className="relative flex flex-col items-center">
              <span
                className="h-3.5 w-3.5 rounded-full ring-4 ring-[#F4F3F0]"
                style={{ background: ACCENT }}
              />
              <span className="mt-3 text-sm font-bold text-[#1A1B1C]">
                {c.year}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {c.phase}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {cards.map(({ icon: Icon, eyebrow, title, body, year, phase }) => (
            <motion.div
              key={title}
              variants={child}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-[#FFFDF9] p-8 transition-colors duration-300 hover:border-[#C19D53]/40"
            >
              {/* Growing top accent bar */}
              <div
                className="absolute left-0 top-0 h-1 w-12 transition-all duration-300 group-hover:w-full"
                style={{ background: ACCENT }}
                aria-hidden="true"
              />
              <div className="pt-2">
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: TINT, color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {/* year shown inside card on mobile */}
                  <span className="text-xs font-bold text-gray-300 md:hidden">
                    {year} · {phase}
                  </span>
                </div>
                <span
                  className="mb-1 block text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: ACCENT }}
                >
                  {eyebrow}
                </span>
                <h4 className="mb-3 text-xl font-bold text-[#1A1B1C]">
                  {title}
                </h4>
                <p className="text-sm leading-relaxed font-light text-gray-600">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ───────────────────────── FUTURE (dark finale) ───────────────────────── */
function FutureVisionSection() {
  const statsRow = [
    { value: "500+", label: "Installations completed" },
    { value: "98%", label: "Client satisfaction" },
    { value: "10+", label: "Years of tailoring" },
    { value: "200+", label: "Partner studios" },
  ];

  const handleGalleryScroll = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section
      aria-label="Future vision"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative w-full overflow-hidden px-6 py-24 text-white selection:bg-[#C19D53]/30 sm:py-32"
      style={{ background: DARK }}
    >
      {/* faint gold glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${ACCENT}55, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <motion.div variants={child} className="text-left lg:col-span-6">
          <h5 className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-white/60">
            Our story{" "}
            <span style={{ color: ACCENT }} className="font-serif italic tracking-normal">
              continues
            </span>
          </h5>

          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Setting the next era of
            <span
              className="mt-2 block font-serif italic"
              style={{ color: ACCENT }}
            >
              tailored living
            </span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/70">
            Today, The Cozy Curtains partners with design studios, architects,
            and high-end homeowners to craft drapery that frames how a space
            feels — not just how it looks.
          </p>

          <p className="mt-4 text-sm leading-relaxed font-light text-white/45">
            Our future is defined by sustainable smart textiles, thermal-shield
            weaves, and motorized panels engineered for whisper-quiet
            performance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleGalleryScroll}
              className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1A1B1C] transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
              style={{ background: ACCENT }}
            >
              <span>View our curated gallery</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </button>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white"
            >
              Book a consultation
            </a>
          </div>

          {/* qualitative chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Sparkles, label: "Elite standards" },
              { icon: Leaf, label: "Sustainable textiles" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80"
              >
                <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — by the numbers */}
        <motion.div
          variants={child}
          className="grid w-full grid-cols-2 gap-4 lg:col-span-6"
        >
          {statsRow.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-[#C19D53]/50 ${
                i % 2 === 1 ? "sm:mt-6" : ""
              }`}
            >
              <p
                className="text-4xl font-bold leading-none tracking-tight sm:text-5xl"
                style={{ color: ACCENT }}
              >
                {s.value}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function OurStory() {
  return (
    <>
      <GenesisSection />
      <EvolutionSection />
      <FutureVisionSection />
    </>
  );
}
