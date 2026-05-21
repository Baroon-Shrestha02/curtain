// components/GalleryHero.jsx
// Requires: Tailwind CSS, next/image (optional), Google Fonts (Cormorant Garamond + Montserrat)
// Add to your globals.css or layout:
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;500&display=swap');

import React from "react";

const SERVICES = [
  "Custom Framing",
  "Art Curation",
  "Installations",
  "Restoration",
  "Private Tours",
  "Commissions",
];

const BG_IMAGE = "/services.jpg";

// Pill tag with background-clip text effect
function ServiceTag({ label }) {
  return (
    <span
      className="relative inline-block px-4 py-1.5 rounded-full border border-white/40 overflow-hidden cursor-pointer text-xs font-medium tracking-wide transition-all duration-200 hover:border-white/70"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <span className="text-white font-extrabold">{label}</span>
    </span>
  );
}

// Clipped headline word (white pill with background showing through text)
function ClippedWord({ children, italic = true }) {
  return (
    <span
      className="relative inline-block px-3 rounded-full overflow-hidden"
      style={{ paddingTop: "0.02em", paddingBottom: "0.02em" }}
    >
      {/* White pill background */}
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(255,255,255,0.88)" }}
        aria-hidden="true"
      />
      {/* Clipped text */}
      <span
        className="relative z-10"
        style={{
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default function ServicesHero2() {
  return (
    <section
      className="relative w-full min-h-[80vh] flex flex-col justify-between overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%), url('${BG_IMAGE}')`,
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-8">
        {/* Left: avatars + label */}
        <div className="flex items-center gap-4">
          <div className="flex">
            {[
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=60",
            ].map((img, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white/60 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${img}')`,
                  marginLeft: i === 0 ? 0 : "-10px",
                }}
              />
            ))}
          </div>
          <div className="text-[11px] text-white/75 tracking-wide leading-snug">
            <strong className="block text-white font-medium text-xs">
              1K+ Happy Customers
            </strong>
          </div>
        </div>
      </nav>

      {/* Headline */}
      <div className="relative z-10 px-12 mt-auto pb-10">
        <h1
          className="font-light text-white leading-none tracking-tight mb-10"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 7vw, 96px)",
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span>Crafting</span>
            <ClippedWord>Dreams</ClippedWord>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-1">
            <span>Not</span>
            <ClippedWord>Just</ClippedWord>
            <span>Decorations.</span>
          </div>
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-end justify-between px-12 pb-10">
        {/* Services */}
        <div className="flex-1">
          <p className="text-[11px] text-white/60 uppercase tracking-widest mb-3">
            Services we offer
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <ServiceTag key={s} label={s} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-end gap-3">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#111] rounded-full text-[13px] font-medium tracking-wide transition-transform duration-150 hover:scale-[1.03] cursor-pointer border-none"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Book a Consultation
            <span className="text-base leading-none">↗</span>
          </button>
          <p className="max-w-[280px] text-right text-[11px] text-white/55 leading-relaxed">
            Art is a language that speaks where words fall silent. Let us help
            you find yours.
          </p>
        </div>
      </div>
    </section>
  );
}
