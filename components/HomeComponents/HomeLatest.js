"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getLatestProducts } from "../services/ProductsApi";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop";

const badgeStyles = {
  New: "bg-[#C9A84C] text-white",
  Bestseller: "bg-[#0F6E56] text-[#E1F5EE]",
  Sale: "bg-[#993C1D] text-[#FAECE7]",
  Limited: "bg-[#1c0f00] text-[#e2b97e]",
  default: "bg-[#1c0f00] text-[#e2b97e]",
};

export default function HomeLatest({ limit = 8 }) {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getLatestProducts(limit)
      .then((items) => {
        if (!cancelled) setProducts(items);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="relative container mx-auto overflow-hidden bg-[#FBF8F4] px-6 py-16 md:px-12 rounded-2xl">
      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#993C1D]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1320px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A84C]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A84C]">
                New Arrivals
              </p>
            </div>
            <h2
              className="text-4xl font-light leading-[1.08] tracking-tight text-[#1c1410] md:text-[52px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Latest <span className="italic text-[#9a7b2e]">Products</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#7a6f63]">
              Hand-finished drapery and textures, curated for the season —
              crafted to soften light and frame every room beautifully.
            </p>
          </div>

          {/* Controls + view all */}
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e3dccf] text-[#1c1410] transition hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e3dccf] text-[#1c1410] transition hover:border-[#C9A84C] hover:bg-[#C9A84C] hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link
              href="/products"
              className="group hidden items-center gap-2 rounded-full bg-[#1c1410] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#f5efe6] transition hover:bg-[#2e221a] md:inline-flex"
            >
              View All
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <SkeletonRow />
        ) : error ? (
          <ErrorRow />
        ) : products.length === 0 ? (
          <EmptyRow />
        ) : (
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((p, i) => {
              const image = p.images?.[0]?.url ?? PLACEHOLDER_IMG;
              const showBadge = p.badge && p.badge !== "None";
              const hasDiscount = (p.discount ?? 0) > 0;
              const href = p.href ?? `/products/${p.slug}`;

              return (
                <motion.article
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group w-[260px] flex-shrink-0 snap-start"
                >
                  {/* Image */}
                  <Link
                    href={href}
                    className="relative mb-4 block h-[330px] w-full overflow-hidden rounded-2xl bg-[#F2EBE3]"
                  >
                    <img
                      src={image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    />
                    {/* Hover veil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {showBadge && (
                      <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] ${
                          badgeStyles[p.badge] || badgeStyles.default
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}

                  </Link>

                  {/* Info */}
                  <div className="px-0.5">
                    {p.colors?.length > 0 && (
                      <div className="mb-2 flex gap-1.5">
                        {p.colors.slice(0, 5).map((c) => (
                          <span
                            key={c._id ?? c.hex}
                            title={c.name}
                            className="h-3 w-3 rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}

                    <Link href={href}>
                      <h3 className="truncate text-[15px] font-medium capitalize text-[#1c1410] transition hover:text-[#9a7b2e]">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="mb-2 text-[12px] uppercase tracking-[0.1em] text-[#a89e90]">
                      {p.subcategory}
                    </p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-[16px] font-medium text-[#9a7b2e]">
                        Rs. {p.price?.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="text-[12px] text-[#c4bbae] line-through">
                            Rs. {p.originalPrice?.toLocaleString()}
                          </span>
                          <span className="ml-auto rounded-md bg-[#FAECE7] px-2 py-0.5 text-[10px] font-medium text-[#993C1D]">
                            -{p.discount}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-8 md:hidden">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1410] py-4 text-[11px] uppercase tracking-[0.16em] text-[#f5efe6] transition hover:bg-[#2e221a]"
          >
            View All Products
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function SkeletonRow() {
  return (
    <div className="flex animate-pulse gap-6 overflow-hidden pb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[260px] flex-shrink-0">
          <div className="mb-4 h-[330px] w-full rounded-2xl bg-[#ece4d8]" />
          <div className="space-y-2 px-0.5">
            <div className="h-3 w-3/4 rounded-full bg-[#ece4d8]" />
            <div className="h-3 w-1/3 rounded-full bg-[#ece4d8]" />
            <div className="h-4 w-1/2 rounded-full bg-[#ece4d8]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyRow() {
  return (
    <div className="rounded-2xl border border-[#e3dccf] bg-white px-6 py-14 text-center">
      <p className="text-sm text-[#7a6f63]">
        No new arrivals yet — check back soon.
      </p>
    </div>
  );
}

function ErrorRow() {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center">
      <p className="text-sm text-[#62101F]">
        Couldn't load the latest products. Please try again later.
      </p>
    </div>
  );
}
