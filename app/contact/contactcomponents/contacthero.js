"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Mail, MessageCircle } from "lucide-react";

export default function ContactHero() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(1.04);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // ── REUSABLE DISPATCH TRIGGER FOR SEAMLESS AUTO-SCROLL & TOGGLE ──
  const handleCtaClick = (targetChannel) => {
    // Triggers the form component to instantly switch view states
    window.dispatchEvent(
      new CustomEvent("custom-toggle-channel", { 
        detail: { channel: targetChannel } 
      })
    );
  };

  return (
    <div className="w-full relative min-h-[460px] md:min-h-[520px] flex items-center justify-center py-24 px-4 overflow-hidden group bg-stone-950">
      {/* ── 1. HIGH-END PROFESSIONAL ARCHITECTURAL BACKDROP ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[1200ms] ease-out opacity-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80')",
          transform: `scale(${scale})`,
        }}
      />

      {/* ── 2. CINEMATIC GRADIENT DIMMING ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950/60" />
      <div className="absolute inset-0 z-10 bg-stone-950/10 backdrop-blur-[0.5px]" />

      {/* ── 3. CONTENT AREA WITH STYLISH TYPOGRAPHY ── */}
      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-20">
        {/* Sleek Minimalist Badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase bg-stone-900/90 text-stone-300 px-4 py-1.5 rounded-full border border-stone-700/50 shadow-sm font-sans backdrop-blur-md">
          <Sparkles size={11} className="text-stone-400 animate-pulse" />{" "}
          Contact Us
        </span>

        {/* Main Heading */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight pt-1 drop-shadow-md italic"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Let’s Design Your{" "}
          <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent not-italic font-medium filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)] select-none">
            Ideal Space
          </span>
        </h1>

        {/* Luxury Gold Thin Divider Line */}
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto my-4 rounded-full" />

        {/* Supportive Description */}
        <p className="text-stone-200/90 max-w-xl mx-auto text-xs md:text-sm font-medium tracking-wide font-sans drop-shadow-sm">
          Have a blueprint in mind or need custom draping consultancy?
          <br />
          Share your design parameters below, and let’s construct something
          timeless.
        </p>

        {/* ── 4. TWO EXECUTIVE CTA BUTTONS LINKED TO CONTACT FORM ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 font-sans">
          
          {/* Email Inquiry Button */}
          <button
            id="hero-email-cta"
            type="button"
            onClick={() => handleCtaClick("email")}
            className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[10px] font-bold tracking-widest uppercase text-stone-950 bg-white border border-white shadow-md transition-all duration-300 hover:text-white transform active:scale-[0.98] before:absolute before:inset-0 before:z-0 before:bg-stone-900 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail
                size={13}
                className="transition-colors duration-300 text-stone-800 group-hover/btn:text-stone-200"
              />
              Email Inquiry
            </span>
          </button>

          {/* WhatsApp Chat Button */}
          <button
            id="hero-whatsapp-cta"
            type="button"
            onClick={() => handleCtaClick("whatsapp")}
            className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-transparent border border-emerald-500/50 shadow-xs transition-all duration-300 hover:text-white transform active:scale-[0.98] before:absolute before:inset-0 before:z-0 before:bg-emerald-600 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 group/btn2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle
                size={14}
                className="transition-colors duration-300 text-emerald-400 group-hover/btn2:text-white"
              />
              WhatsApp Chat
            </span>
          </button>
          
        </div>
      </div>

      {/* Container Parallax Scale Effect */}
      <style jsx global>{`
        .group:hover .absolute.inset-0.z-0 {
          transform: scale(1.06) !important;
        }
      `}</style>
    </div>
  );
}