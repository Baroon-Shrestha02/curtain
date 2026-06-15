"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, LayoutGrid, ArrowLeft } from "lucide-react";

const ACCENT = "#E01522";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-semibold" style={{ color: ACCENT }}>
        {rating.toFixed(1)}
      </span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5"
            style={{
              color: i < Math.round(rating) ? ACCENT : "#e5e7eb",
              fill: i < Math.round(rating) ? ACCENT : "#e5e7eb",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Author({ testimonial }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-xl bg-cover bg-center bg-gray-100"
        style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
        aria-label={`Photo of ${testimonial.name}`}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">
          {testimonial.name}
        </p>
        <p className="truncate text-xs text-gray-500">{testimonial.title}</p>
      </div>
    </div>
  );
}

/* A single white quote tile. `clamp` keeps long quotes from breaking the
   bento tessellation; pass 0 in the full grid view to show everything. */
function QuoteTile({ testimonial, className, clamp = 5, index = 0 }) {
  const clampStyle = clamp
    ? {
        display: "-webkit-box",
        WebkitLineClamp: clamp,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 hover:border-[#E01522]/40",
        className,
      )}
    >
      <div>
        <Quote
          className="mb-3 h-6 w-6"
          style={{ color: ACCENT }}
          aria-hidden="true"
        />
        <p
          className="text-[15px] leading-relaxed text-gray-700"
          style={clampStyle}
        >
          {testimonial.quote}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <Author testimonial={testimonial} />
        <Stars rating={testimonial.rating} />
      </div>
    </motion.div>
  );
}

/* Brand-red stat tile. */
function StatTile({ value, label, className, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex h-full flex-col justify-center rounded-2xl p-6 text-white",
        className,
      )}
      style={{ background: ACCENT }}
    >
      <p className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
        {label}
      </p>
    </motion.div>
  );
}

/* Dark heading tile that anchors the bento. */
function HeadingTile({
  tagLabel,
  title,
  description,
  count,
  onReadAll,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl bg-[#111114] p-7 text-white",
        className,
      )}
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-6" style={{ background: ACCENT }} />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            {tagLabel}
          </span>
        </div>
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>
      {count > 0 && (
        <button
          type="button"
          onClick={onReadAll}
          className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-white/20"
        >
          <LayoutGrid size={14} />
          Read all {count} reviews
        </button>
      )}
    </motion.div>
  );
}

export default function ClientsSection({
  tagLabel = "Client voices",
  title = "Trusted by teams we build for",
  description = "Real feedback from the businesses we've shipped websites, apps, and security work for.",
  stats = [
    { value: "120+", label: "Projects delivered" },
    { value: "98%", label: "Client satisfaction" },
    { value: "6+", label: "Years building" },
  ],
  testimonials = [
    {
      name: "Siddharth Thapa",
      title: "Founder, GharSewa Nepal",
      quote:
        "They rebuilt our platform end to end and the performance gains were immediate. Communication was clear at every stage and deadlines were actually met.",
      avatarSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5.0,
    },
    {
      name: "Pooja Shrestha",
      title: "Director, Abhiyan Consultancy",
      quote:
        "The new site made it far easier for students to find courses and reach us. Inquiries went up within the first month of launch.",
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
    },
    {
      name: "Rohan Adhikari",
      title: "CTO, Sajilo Hardware",
      quote:
        "Their penetration test surfaced issues our last audit missed, with a clear remediation plan we could actually act on. Genuinely thorough work.",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5.0,
    },
    {
      name: "Anjali Sharma",
      title: "Owner, Vaishno Jewellers",
      quote:
        "From design to deployment everything felt considered. The store looks premium and finally works flawlessly on mobile.",
      avatarSrc:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 4.8,
    },
    {
      name: "Niranjan Basnet",
      title: "Manager, Bajra Books",
      quote:
        "Reliable, responsive, and easy to work with. They handled a tricky migration without a single day of downtime.",
      avatarSrc:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      rating: 4.7,
    },
    {
      name: "Deepa Rai",
      title: "Lead, Humans for Humanity",
      quote:
        "Our campaigns finally have a home that does them justice. The team understood our mission and translated it into a clean, fast site.",
      avatarSrc:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
    },
  ],
}) {
  const [isGridMode, setIsGridMode] = useState(false);
  const sectionTopRef = useRef(null);

  const featured = testimonials.slice(0, 4);

  const handleExitGridMode = () => {
    setIsGridMode(false);
    setTimeout(() => {
      sectionTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section
      ref={sectionTopRef}
      className="w-full overflow-hidden bg-white px-6 py-20 text-gray-900 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {!isGridMode ? (
            /* ── BENTO MOSAIC ── */
            <motion.div
              key="bento"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-4 md:grid-cols-3 md:[grid-auto-rows:minmax(220px,auto)]"
            >
              <HeadingTile
                tagLabel={tagLabel}
                title={title}
                description={description}
                count={testimonials.length}
                onReadAll={() => setIsGridMode(true)}
                className="md:col-span-1 md:row-span-2"
              />

              {featured[0] && <QuoteTile testimonial={featured[0]} index={0} />}
              {stats[0] && (
                <StatTile
                  value={stats[0].value}
                  label={stats[0].label}
                  index={1}
                />
              )}
              {featured[1] && (
                <QuoteTile
                  testimonial={featured[1]}
                  index={2}
                  clamp={3}
                  className="md:col-span-2"
                />
              )}
              {featured[2] && <QuoteTile testimonial={featured[2]} index={3} />}
              {featured[3] && <QuoteTile testimonial={featured[3]} index={4} />}
              {stats[1] && (
                <StatTile
                  value={stats[1].value}
                  label={stats[1].label}
                  index={5}
                />
              )}
            </motion.div>
          ) : (
            /* ── ALL REVIEWS GRID ── */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleExitGridMode}
                      className="group -ml-1.5 p-1.5 text-gray-400 transition-colors duration-300 hover:text-gray-900"
                      aria-label="Back to overview"
                    >
                      <ArrowLeft
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </button>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.3em]"
                      style={{ color: ACCENT }}
                    >
                      {tagLabel}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    All client reviews
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleExitGridMode}
                  className="self-start text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors duration-300 hover:text-gray-900 md:self-end"
                >
                  Back to overview
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                  <QuoteTile key={t.name} testimonial={t} clamp={0} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
