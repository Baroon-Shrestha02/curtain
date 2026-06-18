"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCategories, getProducts } from "../services/ProductsApi";

const AUTO_DELAY = 5000;

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop";

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

// Normalize a backend product into a category slide.
function toCategorySlide(category, product) {
  const slug = category.slug || category.name;
  return {
    id: category._id || slug,
    name: category.name,
    image: product?.images?.[0]?.url || PLACEHOLDER_IMG,
    href: `/products/category/${encodeURIComponent(slug)}`,
  };
}

export default function HomeProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fetch one product per category
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getCategories()
      .then(async (categories) => {
        if (cancelled) return;
        const results = await Promise.all(
          categories.map((cat) =>
            getProducts({
              category: cat.slug || cat.name,
              sort: "createdAt",
              order: "desc",
              limit: 1,
            })
              .then(({ products }) => toCategorySlide(cat, products[0]))
              .catch(() => toCategorySlide(cat, null)),
          ),
        );
        if (!cancelled) setItems(results);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const total = items.length;

  const at = useCallback(
    (current, offset) => {
      if (total === 0) return null;
      return items[(current + offset + total) % total];
    },
    [items, total],
  );

  const go = useCallback(
    (dir) => {
      if (total === 0) return;
      setDirection(dir);
      setActive((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  // Auto-advance
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => go(1), AUTO_DELAY);
    return () => clearInterval(id);
  }, [paused, go, active, total]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    if (paused || total <= 1) return;

    const start = Date.now();
    let raf;

    const tick = () => {
      const current = Math.min(
        ((Date.now() - start) / AUTO_DELAY) * 100,
        100,
      );
      setProgress(current);
      if (current < 100) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, total]);

  // Reset active if items shrink below current index
  useEffect(() => {
    if (active >= total && total > 0) setActive(0);
  }, [total, active]);

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
                {String(total === 0 ? 0 : active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous"
                disabled={total <= 1}
                className="w-10 h-10 rounded-sm border border-[#e0dbd4] flex items-center justify-center text-[#7a6f62] hover:border-[#62101F] hover:text-[#62101F] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => go(1)}
                aria-label="Next"
                disabled={total <= 1}
                className="w-10 h-10 rounded-sm border border-[#e0dbd4] flex items-center justify-center text-[#7a6f62] hover:border-[#62101F] hover:text-[#62101F] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content states */}
        {loading ? (
          <SkeletonRow />
        ) : error ? (
          <ErrorRow />
        ) : total === 0 ? (
          <EmptyRow />
        ) : (
          <>
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
                  transition={{ duration: 0.48, ease: [0.32, 0, 0.18, 1] }}
                  className="relative flex-[2.4] rounded-sm overflow-hidden group cursor-pointer min-w-0"
                >
                  <Link
                    href={at(active, 0).href}
                    className="relative block w-full h-full"
                  >
                    <img
                      src={at(active, 0).image}
                      alt={at(active, 0).name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20">
                      <motion.div
                        className="h-full bg-[#C9A84C]"
                        style={{ width: `${progress}%` }}
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
                        style={{ ...GS, letterSpacing: "0.1em" }}
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
              {[1, 2].map((offset) => {
                const slide = at(active, offset);
                if (!slide) return null;
                return (
                  <AnimatePresence
                    key={offset}
                    mode="popLayout"
                    custom={direction}
                  >
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
                        href={slide.href}
                        className="relative block w-full h-full"
                      >
                        <img
                          src={slide.image}
                          alt={slide.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />
                        <div
                          className="absolute top-3 left-3 text-[9px] tracking-[0.2em] text-[#C9A84C]/70"
                          style={GS}
                        >
                          {String(((active + offset) % total) + 1).padStart(
                            2,
                            "0",
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                          <p
                            className="text-[11px] font-light text-white leading-tight"
                            style={{ ...GS, letterSpacing: "0.08em" }}
                          >
                            {slide.name}
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
                );
              })}

              {/* Peek Strip */}
              {total > 3 && (
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
                    <img
                      src={at(active, 3).image}
                      alt={at(active, 3).name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
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
              )}
            </motion.div>

            {/* Category Name Strip */}
            <motion.div
              {...inView(0.25)}
              className="mt-5 flex gap-3 overflow-x-auto pb-1 scrollbar-none"
            >
              {[0, 1, 2, 3].map((offset) => {
                const slide = at(active, offset);
                if (!slide) return null;
                const isFeatured = offset === 0;

                return (
                  <Link
                    key={`strip-${offset}-${active}`}
                    href={slide.href}
                    className="shrink-0 flex items-center gap-2"
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] hover:text-[#62101F] transition-colors"
                      style={{
                        ...GS,
                        color: isFeatured ? "#62101F" : "#b0a89e",
                        fontWeight: isFeatured ? 500 : 400,
                      }}
                    >
                      {slide.name}
                    </span>

                    {offset < 3 && (
                      <span className="text-[#e0dbd4] text-[10px]">·</span>
                    )}
                  </Link>
                );
              })}
            </motion.div>

            {/* Dot Nav + CTA */}
            <motion.div
              {...inView(0.3)}
              className="flex items-center justify-between mt-5 gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                {items.map((_, index) => (
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
                          style={{ width: `${progress}%` }}
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
          </>
        )}
      </div>
    </section>
  );
}

/* ─── States ──────────────────────────────────────────────────────────── */

function SkeletonRow() {
  return (
    <div className="flex animate-pulse gap-2 md:gap-3 h-[380px] md:h-[480px]">
      <div className="flex-[2.4] rounded-sm bg-[#ece4d8]" />
      <div className="flex-1 rounded-sm bg-[#ece4d8] hidden sm:block" />
      <div className="flex-1 rounded-sm bg-[#ece4d8] hidden sm:block" />
      <div className="w-14 md:w-20 shrink-0 rounded-sm bg-[#ece4d8] hidden md:block" />
    </div>
  );
}

function EmptyRow() {
  return (
    <div className="rounded-sm border border-[#e3dccf] bg-[#FBF8F4] px-6 py-20 text-center">
      <p className="text-sm text-[#7a6f63]">
        No products available yet. Check back soon.
      </p>
    </div>
  );
}

function ErrorRow() {
  return (
    <div className="rounded-sm border border-red-200 bg-red-50 px-6 py-20 text-center">
      <p className="text-sm text-[#62101F]">
        Couldn&apos;t load the collection. Please try again later.
      </p>
    </div>
  );
}
