"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "motion/react";
import Link from "next/link";

const CARDS = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=600&q=80",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522444195799-478538b28823?w=600&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
  },
];

const CARD_W = 420;
const CARD_H = 230;
const RX = 380;
const RY = 230;
const CX = 660;
const CY = 300;
const MIN_OPACITY = 0.0;
const BRIGHT_BAND = 0.4;
const FADE_POWER = 1.0;

function computeCenterness(angle) {
  const depth = (Math.sin(angle) + 1) / 2;
  const dist = Math.abs(depth - 0.5) * 2;
  const ramped = Math.max(0, (dist - BRIGHT_BAND) / (1 - BRIGHT_BAND));
  return 1 - ramped;
}

function OrbitCard({ card, angle }) {
  const x = CX + RX * Math.cos(angle) - CARD_W / 2;
  const y = CY + RY * Math.sin(angle) - CARD_H / 2;
  const centerness = computeCenterness(angle);
  const eased = centerness * centerness * (3 - 2 * centerness);
  const shaped = Math.pow(eased, FADE_POWER);
  const opacity = MIN_OPACITY + (1 - MIN_OPACITY) * shaped;
  const scale = 0.62 + 0.38 * centerness;
  const zIndex = Math.round(centerness * 20);
  const interactive = opacity > 0.2;

  return (
    <motion.div
      animate={{ x, y, scale, opacity }}
      transition={{ type: "tween", duration: 0 }}
      whileHover={{ scale: interactive ? scale * 1.04 : scale }}
      className="absolute overflow-hidden rounded-[18px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      style={{
        zIndex,
        width: CARD_W,
        height: CARD_H,
        cursor: interactive ? "pointer" : "default",
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <img src={card.src} alt="" className="block h-full w-full object-cover" />
    </motion.div>
  );
}

function OrbitRig() {
  const angleRef = useRef(0);
  const [angles, setAngles] = useState(() =>
    CARDS.map((_, i) => (i / CARDS.length) * Math.PI * 2),
  );
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    angleRef.current -= (delta / 1000) * 0.32;
    setAngles(
      CARDS.map((_, i) => angleRef.current + (i / CARDS.length) * Math.PI * 2),
    );
  });

  const sorted = [...CARDS].sort(
    (a, b) => computeCenterness(angles[a.id]) - computeCenterness(angles[b.id]),
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[600px] w-[560px]"
    >
      {sorted.map((card) => (
        <OrbitCard key={card.id} card={card} angle={angles[card.id]} />
      ))}
    </div>
  );
}

function ImageMarquee() {
  const items = [...CARDS, ...CARDS];
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max gap-3 animate-[marquee_22s_linear_infinite] group-hover:[animation-play-state:paused]">
        {items.map((card, i) => (
          <div
            key={i}
            className="h-[150px] w-[230px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg sm:h-[180px] sm:w-[280px]"
          >
            <img src={card.src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// TYPEWRITER — plain white text, gold caret
// ─────────────────────────────────────────────
const PHRASES = [
  "Cozy Curtains",
  "Quiet Mornings",
  "Warm Evenings",
  "Soft Light, Always",
];

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_FULL = 1800;
const HOLD_EMPTY = 360;

function TypewriterHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timer;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_SPEED,
        );
      } else {
        timer = setTimeout(() => setPhase("holding"), HOLD_FULL);
      }
    } else if (phase === "holding") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          DELETE_SPEED,
        );
      } else {
        timer = setTimeout(() => setPhase("pausing"), HOLD_EMPTY);
      }
    } else if (phase === "pausing") {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [text, phase, phraseIndex]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="m-0 min-h-[1.15em] text-[44px] font-bold leading-[1.1] tracking-[-2px] text-white sm:text-[60px]"
      aria-label={PHRASES[phraseIndex]}
    >
      {text}
      {/* blinking caret */}
      <span
        aria-hidden="true"
        className="ml-[3px] inline-block w-[3px] align-middle bg-[#e2b97e] animate-[caret_1s_steps(1)_infinite]"
        style={{ height: "0.88em", verticalAlign: "-0.06em" }}
      />
      <style>{`
        @keyframes caret {
          0%,49%   { opacity: 1; }
          50%,100% { opacity: 0; }
        }
      `}</style>
    </motion.h1>
  );
}

// ─────────────────────────────────────────────
// Stat pill — small trust-signal row
// ─────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[22px] font-bold leading-none tracking-tight text-white">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-[#9e8e7a]">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Feature tag
// ─────────────────────────────────────────────
function FeatureTag({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] text-[#d4c5a9] backdrop-blur-sm">
      <span className="text-[#e2b97e]" aria-hidden="true">
        {icon}
      </span>
      {label}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[86vh] items-center overflow-hidden bg-cover bg-center font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#0d0b08]/72" />

      {/* Subtle warm vignette — right edge bleeds lighter toward the orbit */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_75%_50%,rgba(226,185,126,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:gap-5 lg:py-0">
        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex w-full max-w-[520px] flex-shrink-0 flex-col gap-0"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#e2b97e]/25 bg-[#e2b97e]/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#e2b97e]"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#e2b97e] shadow-[0_0_5px_#e2b97e]" />
            Premium Collection · 2025
          </motion.div> */}

          {/* Typewriter headline */}
          <TypewriterHeadline />

          {/* Eyebrow line under headline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: 0.45,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 mb-6 h-px w-16 origin-left bg-[#e2b97e]"
          />

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="m-0 mb-2 text-[17px] leading-[1.65] text-[#e0d5c8] sm:text-[19px]"
          >
            Handcrafted window treatments woven from premium fabrics — designed
            to soften every room and frame the light you love.
          </motion.p>

          {/* Italic tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="m-0 mb-7 text-[14px] italic text-[#e2b97e]/80"
          >
            — Where comfort meets elegance
          </motion.p>

          {/* Feature tags row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55 }}
            className="mb-7 flex flex-wrap gap-2"
          >
            <FeatureTag icon="✦" label="Made to measure" />
            <FeatureTag icon="✦" label="Free home visit" />
            <FeatureTag icon="✦" label="5-year warranty" />
          </motion.div>

          {/* Divider */}
          <div className="mb-7 h-px w-full bg-white/8" />

          {/* Blockquote
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
            className="m-0 mb-8 border-l-2p border-[#e2b97e]/60 pl-5"
          >
            <p className="m-0 text-[13.5px] italic leading-[1.75] text-[#b8a99a]">
              The right curtain doesn&apos;t just cover a window — it frames
              your world, softens the light, and completes the room.
            </p>
          </motion.blockquote> */}

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-9 flex flex-wrap gap-3"
          >
            <Link
              href="/products"
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-[#62101F] px-7 py-[13px] text-[14px] font-semibold text-white shadow-[0_4px_24px_rgba(98,16,31,0.45)] transition-all hover:scale-[1.04] hover:bg-[#7a1526] hover:shadow-[0_6px_28px_rgba(98,16,31,0.6)] active:scale-[0.97]"
            >
              Explore Collection
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/quote"
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-white/15 bg-white/6 px-7 py-[13px] text-[14px] font-medium text-white backdrop-blur-sm transition-all hover:scale-[1.04] hover:border-white/25 hover:bg-white/10 active:scale-[0.97]"
            >
              Get a Free Quote
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <StatPill value="500+" label="Homes styled" />
            <div className="h-8 w-px bg-white/10" />
            <StatPill value="98%" label="Satisfaction" />
            <div className="h-8 w-px bg-white/10" />
            <StatPill value="5yr+" label="In business" />
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — orbit / marquee ── */}
        <motion.div
          className="flex w-full flex-1 items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="block w-full lg:hidden">
            <ImageMarquee />
          </div>
          <div className="hidden lg:block">
            <OrbitRig />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
