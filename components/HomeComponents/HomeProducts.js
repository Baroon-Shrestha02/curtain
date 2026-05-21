"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "./Contants/ProdData";

const AUTO_DELAY = 5000;
const total = categories.length;

const at = (active, offset) => {
  return categories[(active + offset + total) % total];
};

const GS = {
  fontFamily: "var(--font-geist-sans)",
};

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 52 : -52,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -52 : 52,
    opacity: 0,
  }),
};

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

export default function HomeProducts() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const go = useCallback((dir) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + total) % total);
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      go(1);
    }, AUTO_DELAY);

    return () => clearInterval(id);
  }, [paused, go, active]);

  useEffect(() => {
    setProgress(0);

    if (paused) return;

    const start = Date.now();
    let raf;

    const tick = () => {
      const currentProgress = Math.min(
        ((Date.now() - start) / AUTO_DELAY) * 100,
        100,
      );

      setProgress(currentProgress);

      if (currentProgress < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [active, paused]);

  const jumpTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  return (
    <section
      className="bg-white pt-16 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          {...inView(0)}
          className="flex items-end justify-between mb-10 gap-4 flex-wrap"
        >
          <div>
            <div className="w-6 h-[2px] bg-[#62101F] mb-4" />

            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-medium mb-3"
              style={GS}
            >
              Our Collection
            </p>

            <h2
              className="text-4xl md:text-5xl font-light leading-[1.05] text-[#1a1a1a]"
              style={{
                ...GS,
                letterSpacing: "0.06em",
              }}
            >
              Curtains
              <br />
              <span className="text-[#62101F]">&amp; Blends</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span
              className="text-[10px] uppercase tracking-[0.22em] text-[#b0a89e]"
              style={GS}
            >
              <span className="text-[#62101F] font-medium">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="w-10 h-10 rounded-sm border border-[#e0dbd4] flex items-center justify-center text-[#7a6f62] hover:border-[#62101F] hover:text-[#62101F] transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => go(1)}
                aria-label="Next"
                className="w-10 h-10 rounded-sm border border-[#e0dbd4] flex items-center justify-center text-[#7a6f62] hover:border-[#62101F] hover:text-[#62101F] transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filmstrip Row */}
        <motion.div
          {...inView(0.15)}
          className="flex gap-2 md:gap-3 h-[380px] md:h-[480px]"
        >
          {/* Hero Card */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`hero-${active}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.48,
                ease: [0.32, 0, 0.18, 1],
              }}
              className="relative flex-[2.4] rounded-sm overflow-hidden group cursor-pointer min-w-0"
            >
              <Link
                href={at(active, 0).href}
                className="relative block w-full h-full"
              >
                <Image
                  src={at(active, 0).image}
                  alt={at(active, 0).name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 55vw, 42vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20">
                  <motion.div
                    className="h-full bg-[#C9A84C]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <p
                    className="text-[9px] uppercase tracking-[0.28em] text-[#C9A84C] mb-2"
                    style={GS}
                  >
                    Featured
                  </p>

                  <h3
                    className="text-lg md:text-2xl font-light text-white leading-snug mb-4"
                    style={{
                      ...GS,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {at(active, 0).name}
                  </h3>

                  <span
                    className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/50 group-hover:text-[#C9A84C] transition-colors duration-300"
                    style={GS}
                  >
                    View Product <ArrowRight size={10} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Mid Cards */}
          {[1, 2].map((offset) => (
            <AnimatePresence key={offset} mode="popLayout" custom={direction}>
              <motion.div
                key={`mid-${offset}-${active}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.48,
                  ease: [0.32, 0, 0.18, 1],
                  delay: offset * 0.06,
                }}
                className="relative flex-1 rounded-sm overflow-hidden group cursor-pointer min-w-0 hidden sm:block"
              >
                <Link
                  href={at(active, offset).href}
                  className="relative block w-full h-full"
                >
                  <Image
                    src={at(active, offset).image}
                    alt={at(active, offset).name}
                    width={400}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />
                  <div
                    className="absolute top-3 left-3 text-[9px] tracking-[0.2em] text-[#C9A84C]/70"
                    style={GS}
                  >
                    {String(((active + offset) % total) + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <p
                      className="text-[11px] font-light text-white leading-tight"
                      style={{
                        ...GS,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {at(active, offset).name}
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="bg-[#62101F] text-[#C9A84C] text-[9px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm"
                      style={GS}
                    >
                      View
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          ))}

          {/* Peek Strip */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`peek-${active}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.48,
                ease: [0.32, 0, 0.18, 1],
                delay: 0.12,
              }}
              className="relative w-14 md:w-20 shrink-0 rounded-sm overflow-hidden cursor-pointer hidden md:block group"
              onClick={() => go(1)}
            >
              <Image
                src={at(active, 3).image}
                alt={at(active, 3).name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="80px"
              />

              <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 transition-all duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <p
                  className="text-[8px] uppercase tracking-[0.22em] text-[#4a4040] rotate-90 whitespace-nowrap"
                  style={GS}
                >
                  Next
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Category Name Strip */}
        <motion.div
          {...inView(0.25)}
          className="mt-5 flex gap-3 overflow-x-auto pb-1 scrollbar-none"
        >
          {[0, 1, 2, 3].map((offset) => {
            const cat = at(active, offset);
            const isFeatured = offset === 0;

            return (
              <div
                key={`strip-${offset}-${active}`}
                className="shrink-0 flex items-center gap-2"
              >
                <span
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    ...GS,
                    color: isFeatured ? "#62101F" : "#b0a89e",
                    fontWeight: isFeatured ? 500 : 400,
                  }}
                >
                  {cat.name}
                </span>

                {offset < 3 && (
                  <span className="text-[#e0dbd4] text-[10px]">·</span>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Dot Nav + CTA */}
        <motion.div
          {...inView(0.3)}
          className="flex items-center justify-between mt-5 gap-4 flex-wrap"
        >
          <div className="flex items-center gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => jumpTo(index)}
                aria-label={`Slide ${index + 1}`}
                className="relative h-[2px] rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width: index === active ? 28 : 10,
                  background: index === active ? "transparent" : "#e0dbd4",
                }}
              >
                {index === active && (
                  <>
                    <span className="absolute inset-0 bg-[#e0dbd4] rounded-full" />
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-[#62101F] rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </>
                )}
              </button>
            ))}
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#7a6f62] hover:text-[#62101F] transition-colors duration-200"
            style={GS}
          >
            View all {total} styles
            <ArrowRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
