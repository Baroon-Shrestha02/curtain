"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "motion/react";
import Link from "next/link";

// Image-only cards. Replace `src` with your own image URLs.
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

// ──────────────────────────────────────────────────────────────
// OPACITY CONTROLS — tweak these three to taste
const MIN_OPACITY = 0.0; // floor for top/bottom cards (0 = fully fade out, e.g. 0.25 keeps them faintly visible)
const BRIGHT_BAND = 0.4; // 0 = peak only at exact center; raise toward ~0.4 to keep a wider middle fully opaque
const FADE_POWER = 1.0; // 1 = linear-ish smoothstep; >1 = sharper/later fade; <1 = softer/earlier fade
// ──────────────────────────────────────────────────────────────

function computeCenterness(angle) {
  const depth = (Math.sin(angle) + 1) / 2; // 0 (top) → 1 (bottom)
  const dist = Math.abs(depth - 0.5) * 2; // 0 at center, 1 at top/bottom
  const ramped = Math.max(0, (dist - BRIGHT_BAND) / (1 - BRIGHT_BAND));
  return 1 - ramped; // 1 at/near center, 0 at edges
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
    angleRef.current -= (delta / 1000) * 0.32; // anti-clockwise
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

// Continuous horizontal marquee for small screens.
// The list is duplicated so the loop is seamless; animation defined in <style> below.
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

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center font-sans"
      style={{
        // ↓ Replace with your own background image URL
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80')",
      }}
    >
      {/* Flat overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#0d0b08]/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col items-center justify-between gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:gap-5 lg:py-0">
        {/* LEFT */}
        <motion.div
          className="flex w-full max-w-[500px] flex-shrink-0 flex-col gap-5 lg:gap-[22px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-[#d4c5a9]"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[#e2b97e] shadow-[0_0_6px_#e2b97e]" />
            Premium Collection · 2025
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="m-0 text-[42px] font-semibold leading-[1.1] tracking-[-1.5px] text-white sm:text-[58px]"
          >
            Cozy Curtains
          </motion.h1>

          {/* Sub */}
          <div>
            <p className="m-0 text-base leading-relaxed text-[#e7ddd0] sm:text-lg">
              Handcrafted window treatments that transform every room.
            </p>
            <p className="mt-2 text-[15px] italic text-[#e2b97e]">
              — Where comfort meets elegance
            </p>
          </div>

          {/* Quotation */}
          <blockquote className="m-0 rounded-r-[10px] border-l-[3px] border-[#e2b97e] bg-white/5 px-[18px] py-3.5">
            <p className="m-0 text-sm italic leading-relaxed text-[#d4c5a9]">
              The right curtain doesn&apos;t just cover a window — it frames
              your world, softens the light, and completes the room.
            </p>
          </blockquote>

          {/* CTA */}
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-[#e2b97e] px-[26px] py-[13px] text-sm font-semibold text-[#1c0f00] transition-transform hover:scale-[1.04] active:scale-[0.97]"
            >
              Explore Collection
            </Link>

            <Link
              href="/quote"
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-[26px] py-[13px] text-sm font-medium text-white transition-all hover:scale-[1.04] hover:bg-white/10 active:scale-[0.97]"
            >
              Get a Quotation
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — orbit on large screens, continuous row on small */}
        <motion.div
          className="flex w-full flex-1 items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Continuous marquee for mobile / tablet */}
          <div className="block w-full lg:hidden">
            <ImageMarquee />
          </div>
          {/* Orbit for desktop */}
          <div className="hidden lg:block">
            <OrbitRig />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
