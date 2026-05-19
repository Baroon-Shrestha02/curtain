"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HomeHero() {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const timeline = useRef(null);

  const runAnimation = () => {
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 40,
    });

    gsap.set(imageRef.current, {
      scale: 1.08,
    });

    timeline.current = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
      },
    });

    timeline.current

      .to(
        imageRef.current,
        {
          scale: 1,
          duration: 5,
          ease: "power2.out",
        },
        0,
      )

      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        1.5,
      );
  };

  useEffect(() => {
    runAnimation();

    return () => {
      timeline.current?.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-black">
      {/* BACKGROUND IMAGE */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* SOFT VERTICAL LINES */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.03) 2px, transparent 4px, transparent 40px)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6"
      >
        {/* TITLE */}
        <h1
          className="text-white font-light leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-[110px] max-w-5xl"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          Elegant <br />
          Blends
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-10 max-w-3xl text-white/80 text-sm md:text-lg leading-9 uppercase tracking-[0.18em]">
          Inspired by royal interior styling with handcrafted premium velvet
          drapery designs for luxurious modern homes.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-5 mt-14">
          <button className="bg-[#62101F] text-white px-12 py-5 uppercase tracking-[0.3em] text-xs md:text-sm transition-all duration-300 shadow-2xl">
            Shop Now
          </button>

          <button className="border border-white/30 hover:bg-white hover:text-black text-white px-12 py-5 uppercase tracking-[0.3em] text-xs md:text-sm transition-all duration-300">
            Explore More
          </button>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
    </section>
  );
}
