"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, MessageCircle } from "lucide-react";

export default function ContactHero() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(1.04);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCtaClick = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="w-full relative min-h-[460px] md:min-h-[520px] flex items-center justify-center py-24 px-4 overflow-hidden group bg-stone-950">
      {/* Architectural Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[1200ms] ease-out opacity-75"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80')",
          transform: `scale(${scale})`,
        }}
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950/60" />
      
      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-20">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase bg-stone-900/90 text-stone-300 px-4 py-1.5 rounded-full border border-stone-700/50 shadow-sm font-sans backdrop-blur-md">
          <Sparkles size={11} className="text-stone-400 animate-pulse" /> Contact Us
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight italic" style={{ fontFamily: "'Georgia', serif" }}>
          Let’s Design Your <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent not-italic font-medium">Ideal Space</span>
        </h1>

        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto my-4" />

        <p className="text-stone-200/90 max-w-xl mx-auto text-xs md:text-sm font-medium tracking-wide font-sans">
          Have a blueprint in mind or need custom draping consultancy? 
          Share your design parameters below, and let’s construct something timeless.
        </p>

        <div className="flex items-center justify-center pt-6">
          <button
            onClick={handleCtaClick}
            className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-transparent border border-emerald-500/50 hover:text-white transition-all duration-300 group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle size={14} className="text-emerald-400 group-hover/btn:text-white" />
              Start WhatsApp Chat
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .group:hover .absolute.inset-0.z-0 { transform: scale(1.06) !important; }
      `}</style>
    </div>
  );
}