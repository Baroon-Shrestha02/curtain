"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, LayoutGrid, ArrowLeft } from "lucide-react";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// --- Internal Sub-Components ---

const StatCard = ({ value, label }) => (
  <div className="bg-[#FFFDF9] border border-gray-200/50 text-center p-5 rounded-xs shadow-xs transition-all duration-300 hover:border-[#C19D53]/60">
    <p className="text-2xl sm:text-3xl font-semibold text-[#A37F3D] tracking-tight">
      {value}
    </p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
      {label}
    </p>
  </div>
);

// Renders an isolated, single-person card container block with zero text overlapping
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="p-6 sm:p-8 rounded-xs shadow-xl flex flex-col bg-[#FFFDF9] border border-gray-200/50 transition-all duration-500 hover:border-[#C19D53]/40 h-full justify-between min-h-[280px]">
      <div>
        {/* Author Metadata Layout */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 sm:w-14 h-14 rounded-xs bg-cover bg-center shrink-0 border border-gray-200/40 bg-[#F4F3F0]"
            style={{ backgroundImage: `url(${testimonial.avatarSrc})` }}
            aria-label={`Photo of ${testimonial.name}`}
          />
          <div className="grow">
            <p className="font-semibold text-sm sm:text-base text-[#2E3133] tracking-tight">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-400 font-light mt-0.5">
              {testimonial.title}
            </p>
          </div>
        </div>

        {/* Editorial Ratings row */}
        <div className="flex items-center gap-2 my-4">
          <span className="font-serif italic text-xs sm:text-sm font-semibold text-[#A37F3D] mt-0.5">
            {testimonial.rating.toFixed(1)}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5 transition-colors duration-300",
                  i < Math.floor(testimonial.rating)
                    ? "text-[#C19D53] fill-[#C19D53]"
                    : "text-gray-200",
                )}
              />
            ))}
          </div>
        </div>

        {/* Premium Typography Quote Block */}
        {testimonial.quote && (
          <p className="text-sm sm:text-base text-gray-600 font-light font-serif italic leading-relaxed text-left">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
};

// --- Main Exported Component ---

export default function ClientsSection({
  tagLabel = "Voices of Trust",
  title = "What Our Clients Say",
  description = "Read authentic perspectives from patrons who entrusted our team to convert basic room layouts into curated sanctuaries of tailored light control.",
  stats = [
    { value: "320+", label: "Homes Framed" },
    { value: "95%", label: "Satisfaction" },
    { value: "7+", label: "Years Arc" },
  ],
  testimonials = [
    {
      name: "Siddharth Thapa",
      title: "Baluwatar Residency",
      quote:
        "The structural precision is unbelievable. Every drop-panel alignment hits perfectly down to the millimeter. Their light sheers completely shift how evening sunlight spills into our lounge space.",
      avatarSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
    },
    {
      name: "Pooja Shrestha",
      title: "Jhamsikhel Penthouse",
      quote:
        "We wanted custom tracks instead of mass production layouts. The artisan fabrication work they ran for our high drapery is true master-craftsmanship. It feels beautifully weighted and quiet.",
      avatarSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5.0,
    },
    {
      name: "Rohan Adhikari",
      title: "Budhanilkantha Villa",
      quote:
        "Absolute luxury throughout the entire timeline blueprint. From the millimeter-exact laser tracking configurations down to the imported linen curation arrays—they treated my space like a genuine design canvas.",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
    },
    {
      name: "Anjali Sharma",
      title: "Sanepa Apartment Flats",
      quote:
        "The custom motorized track synchronization completely changed our morning routine. Scheduling acoustic density shifts directly with the sun pathway shows an absolute master-level commitment to smart home craftsmanship.",
      avatarSrc:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5.0,
    },
    {
      name: "Niranjan Basnet",
      title: "Pokhara Lakeside Estate",
      quote:
        "Managing vast architecture openings facing heavy mountain crosswinds requires profound fabric calibration expertise. Their material layering choice eliminated solar glaze without choking the panoramic canvas.",
      avatarSrc:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      rating: 4.6,
    },
    {
      name: "Deepa Rai",
      title: "Lazimpat Commercial Studio",
      quote:
        "Flawless commercial-scale light calibration. Every architectural framing layout functions beautifully while completely aligning with our clean design guidelines. Highly professional delivery speed.",
      avatarSrc:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      rating: 4.5,
    },
  ],
}) {
  const [isGridMode, setIsGridMode] = useState(false);
  const sectionTopRef = useRef(null);

  // Isolate exactly the first two distinct client records
  const initialBriefTestimonials = testimonials.slice(0, 2);

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
      className="w-full bg-[#F4F3F0] text-[#2E3133] py-24 px-[4vw] border-b border-gray-200/40 selection:bg-[#C19D53]/20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {!isGridMode ? (
            /* --- EDITORIAL SPLIT GRID VIEW --- */
            <motion.div
              key="brief-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Content Narrative Column */}
              <div className="lg:col-span-5 flex flex-col min-h-[45vh] justify-between lg:sticky lg:top-24 py-2">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="h-px w-6 bg-[#FF2A2A]" />
                    <p className="text-xs font-bold tracking-[0.4em] text-[#FF2A2A] uppercase">
                      {tagLabel}
                    </p>
                  </div>

                  <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-normal text-[#2E3133] leading-[1.1] capitalize max-w-md">
                    {title}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed max-w-lg mt-1">
                    {description}
                  </p>
                </div>

                <div className="flex flex-col gap-8 mt-10 lg:mt-0">
                  {/* Performance Data Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, i) => (
                      <StatCard key={i} {...stat} />
                    ))}
                  </div>

                  {/* Open Archive Trigger Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsGridMode(true)}
                      className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#A37F3D] hover:text-[#2E3133] transition-all duration-300 cursor-pointer outline-none"
                    >
                      <LayoutGrid
                        size={14}
                        className="text-[#C19D53] transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="border-b border-[#C19D53]/40 pb-0.5 transition-all duration-300 group-hover:border-[#2E3133]">
                        Read All Reviews ({testimonials.length} Reviews)
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (Renders 2 completely isolated cards side-by-side or cleanly stacked) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 items-start lg:mt-4">
                {initialBriefTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="w-full"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- ARCHIVE COMPREHENSIVE MASONRY GRID MODE --- */
            <motion.div
              key="grid-layout"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="w-full flex flex-col"
            >
              {/* Back Navigation Architecture Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200/60 pb-6 mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <button
                      type="button"
                      onClick={handleExitGridMode}
                      className="group p-1.5 -ml-1.5 text-gray-400 hover:text-[#2E3133] transition-colors duration-300 outline-none cursor-pointer"
                      aria-label="Return to features view"
                    >
                      <ArrowLeft
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </button>
                    <p className="text-xs font-bold tracking-[0.4em] text-[#FF2A2A] uppercase">
                      {tagLabel}
                    </p>
                  </div>
                  <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-normal text-[#2E3133] capitalize">
                    All Client Reviews
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleExitGridMode}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#A37F3D] transition-colors duration-300 cursor-pointer mb-1 outline-none"
                >
                  Return to brief view
                </button>
              </div>

              {/* Complete Multi-Column Structural Grid (All Reviews Rendered Uniformly) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
