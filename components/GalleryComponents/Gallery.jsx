"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import QuotationModal from "../ui/QuotationModal";
import { getGallery, getGalleryCategories } from "../services/GalleryApi";

// Rotating span pattern so the masonry layout still feels varied
// even though the backend doesn't store a "span".
const SPANS = ["tall", "wide", "normal", "normal"];
const spanClass = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

const labelize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const img = images[current];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(10,4,6,0.92)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        >
          <X size={16} />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Media */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-16 flex max-h-[85vh] max-w-4xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {img.type === "video" ? (
            <video
              src={img.src}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          ) : (
            <img
              src={img.src}
              alt={img.label}
              className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          )}

          {/* Caption */}
          <div className="mt-4 text-center">
            {img.location && (
              <p
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "#C9A84C" }}
              >
                {img.location}
              </p>
            )}
            <p
              className="mt-1 text-base font-light text-white/90"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {img.label}
            </p>
            {img.category && (
              <p
                className="mt-1 text-[10px] uppercase tracking-[0.14em]"
                style={{ color: "#9A7070" }}
              >
                {labelize(img.category)}
              </p>
            )}
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <p
              className="mt-3 text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {current + 1} / {images.length}
            </p>
          )}
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── GalleryPage ─────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [active, setActive] = useState("all");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { index: number }

  const [categories, setCategories] = useState([
    { id: "all", label: "All Work" },
  ]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories once.
  useEffect(() => {
    let active = true;
    getGalleryCategories()
      .then((list) => {
        if (!active) return;
        const cats = (list || []).map((c) => ({ id: c, label: labelize(c) }));
        setCategories([{ id: "all", label: "All Work" }, ...cats]);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Fetch media whenever the active filter changes (server-side filtering).
  useEffect(() => {
    let alive = true;
    setLoading(true);
    const params = active === "all" ? {} : { category: active };
    getGallery(params)
      .then((res) => {
        if (!alive) return;
        const docs = res.data || [];
        const mapped = docs.map((d, i) => {
          const m = d.media || d.image || {}; // handles both old + new records
          return {
            id: d._id || i,
            src: m.url || d.url || "",
            type: m.type || "image", // "image" | "video"
            category: d.category || "",
            label: d.alt || "Untitled",
            location: d.location || "",
            span: SPANS[i % SPANS.length],
          };
        });
        setImages(mapped);
      })
      .catch(() => alive && setImages([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [active]);

  return (
    <>
      <div className="bg-white min-h-screen">
        <section
          className="px-5 pb-24 md:px-10 lg:px-16"
          style={{
            background: "linear-gradient(180deg, white 0%, #FDF8F3 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Category filter */}
            {/* Category filter — "All Work" fixed, rest scroll horizontally */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 flex items-center gap-2 border-b pb-8"
              style={{ borderColor: "rgba(98,16,31,0.08)" }}
            >
              {/* Fixed: All Work */}
              <button
                onClick={() => setActive("all")}
                className="flex-shrink-0 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  background: active === "all" ? "#62101F" : "transparent",
                  color: active === "all" ? "#fff" : "#9A7070",
                  border: `0.5px solid ${active === "all" ? "#62101F" : "rgba(98,16,31,0.18)"}`,
                }}
              >
                All Work
              </button>

              {/* Scrollable: other categories */}
              <div
                className="flex min-w-0 flex-1 gap-2 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {categories
                  .filter((cat) => cat.id !== "all")
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActive(cat.id)}
                      className="flex-shrink-0 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                      style={{
                        background:
                          active === cat.id ? "#62101F" : "transparent",
                        color: active === cat.id ? "#fff" : "#9A7070",
                        border: `0.5px solid ${active === cat.id ? "#62101F" : "rgba(98,16,31,0.18)"}`,
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
              </div>

              {/* Projects count */}
              <span
                className="flex-shrink-0 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "#C9A84C" }}
              >
                {images.length} projects
              </span>
            </motion.div>

            {/* Grid / states */}
            {loading ? (
              <div
                className="flex items-center justify-center py-32"
                style={{ color: "#9A7070" }}
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
                gallery…
              </div>
            ) : images.length === 0 ? (
              <div className="py-32 text-center" style={{ color: "#7A5C5C" }}>
                No projects in this category yet.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[220px] grid-flow-dense"
                >
                  {images.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                        delay: i * 0.05,
                      }}
                      onClick={() => setLightbox({ index: i })}
                      className={`group relative overflow-hidden cursor-pointer ${spanClass[img.span] ?? ""}`}
                      style={{ borderRadius: "10px" }}
                    >
                      {img.type === "video" ? (
                        <video
                          src={img.src}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                      ) : (
                        <img
                          src={img.src}
                          alt={img.label}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                      )}

                      {/* Play icon for videos */}
                      {img.type === "video" && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full"
                            style={{ background: "rgba(255,255,255,0.85)" }}
                          >
                            <Play
                              size={18}
                              style={{ color: "#62101F", marginLeft: 2 }}
                              fill="#62101F"
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(26,10,13,0.8) 0%, rgba(26,10,13,0.2) 50%, transparent 100%)",
                        }}
                      />

                      <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {img.location && (
                          <p
                            className="text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: "#C9A84C" }}
                          >
                            {img.location}
                          </p>
                        )}
                        <p
                          className="mt-0.5 text-sm font-light text-white"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                          }}
                        >
                          {img.label}
                        </p>
                      </div>

                      {img.category && (
                        <div
                          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: "rgba(255,255,255,0.9)",
                            color: "#62101F",
                          }}
                        >
                          {labelize(img.category)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 text-center"
            >
              <p className="mb-6 text-sm" style={{ color: "#7A5C5C" }}>
                Want curtains like these for your home?
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="group inline-flex items-center gap-3 rounded-full px-10 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #7A1525 0%, #62101F 60%, #4A0C18 100%)",
                }}
              >
                Request a Free Quote
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Media lightbox */}
      {lightbox && (
        <Lightbox
          images={images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {quoteOpen && <QuotationModal onClose={() => setQuoteOpen(false)} />}
    </>
  );
}
