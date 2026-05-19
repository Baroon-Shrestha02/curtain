"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProductsHero() {
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const timeline = useRef(null);

  const runAnimation = () => {
    if (!curtainRef.current || !contentRef.current || !imageRef.current) return;

    gsap.set(curtainRef.current, {
      x: "-100%",
    });

    gsap.set(contentRef.current, {
      opacity: 0,
      y: 36,
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
        curtainRef.current,
        {
          x: "-10%",
          duration: 2.8,
        },
        0,
      )
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
        1.2,
      );
  };

  useEffect(() => {
    runAnimation();

    return () => {
      timeline.current?.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-[75vh] min-h-[620px] overflow-hidden bg-black">
      {/* BACKGROUND IMAGE */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2200&auto=format&fit=crop"
          alt="Luxury Curtains"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* LUXURY CURTAIN EFFECT */}
        <div
          ref={curtainRef}
          className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#1a1a1a]/95 via-[#3d2d1f]/70 to-transparent"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
          }}
        />

        {/* VERTICAL TEXTURE LINES */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.02) 2px, transparent 4px, transparent 45px)",
          }}
        />
      </div>

      {/* HERO CONTENT */}
      <div
        ref={contentRef}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* TOP LABEL */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[2px] w-12 md:w-16 bg-[#d6a85f]" />

          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/80">
            Premium Curtain Collection
          </p>

          <div className="h-[2px] w-12 md:w-16 bg-[#d6a85f]" />
        </div>

        {/* MAIN TITLE */}
        <h1
          className="max-w-6xl text-5xl font-light leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[92px]"
          style={{
            fontFamily: "Georgia, serif",
          }}
        >
          Luxury Curtains <br />
          For Elegant Homes
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-8 max-w-3xl text-sm uppercase leading-8 tracking-[0.16em] text-white/80 md:text-base">
          Beautiful designer curtains crafted with premium fabrics, modern
          luxury styling and timeless interior elegance.
        </p>

        {/* STATS */}
        <div className="mt-12 flex flex-wrap justify-center gap-10 md:gap-14">
          <div>
            <h2 className="text-3xl font-light text-white md:text-4xl">2K+</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Curtain Designs
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-light text-white md:text-4xl">15K+</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Happy Clients
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-light text-white md:text-4xl">4.9★</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
              Luxury Rating
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 z-10 h-36 w-full bg-gradient-to-t from-black via-black/50 to-transparent" />
    </section>
  );
}
