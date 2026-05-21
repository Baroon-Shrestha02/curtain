"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_IMAGE =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2400&auto=format&fit=crop";

export default function HomeHeroCinematic() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const lineRefs = useRef([]);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = lineRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([lines, subRef.current, ctaRef.current, cueRef.current], {
          opacity: 1,
          y: 0,
        });
        gsap.set(imageRef.current, { scale: 1 });
        return;
      }

      gsap.set(lines, { yPercent: 120 });
      gsap.set([subRef.current, ctaRef.current], { opacity: 0, y: 28 });
      gsap.set(cueRef.current, { opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.16 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(imageRef.current, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .to(
          lines,
          { yPercent: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" },
          0.35,
        )
        .to(
          subRef.current,
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7",
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.65",
        )
        .to(cueRef.current, { opacity: 1, duration: 0.8 }, "-=0.4");

      // Cinematic parallax-out: image drifts down, content lifts and fades.
      gsap.to(imageRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -22,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Idle float on the scroll cue.
      gsap.to(cueRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 2.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headline = [
    { text: "Drape your home", pill: false },
    { text: "in quiet luxury.", pill: true },
  ];

  return (
    <section
      ref={rootRef}
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-[#120a0c]"
    >
      {/* Background image (parallax + ken burns) */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <img
          src={BG_IMAGE}
          alt="Sunlit interior framed by tailored curtains"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Cinematic washes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#120a0c]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 22%, transparent 0%, transparent 42%, rgba(18,10,12,0.78) 100%)",
        }}
      />
      {/* Faint vertical drapery light-lines */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.06) 2px, transparent 5px, transparent 46px)",
        }}
      />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="hero-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          className="max-w-6xl font-light leading-[0.98] tracking-[-0.01em] text-white"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2.6rem, 6.2vw, 6rem)",
          }}
        >
          {headline.map((line, i) => (
            <span key={i} className="block overflow-hidden py-[0.06em]">
              <span
                ref={(el) => (lineRefs.current[i] = el)}
                className="inline-flex items-center justify-center gap-[0.28em]"
              >
                {line.pill ? (
                  <>
                    <span>in quiet</span>
                    <span
                      aria-hidden
                      className="inline-block h-[0.74em] w-[1.5em] shrink-0 rounded-full bg-cover bg-center align-middle ring-1 ring-white/25"
                      style={{ backgroundImage: "url('/curtains/jacquard.webp')" }}
                    />
                    <span className="italic text-[#e7c976]">luxury.</span>
                  </>
                ) : (
                  line.text
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-xl text-[13px] uppercase leading-7 tracking-[0.22em] text-white/70 md:text-sm"
        >
          Custom-stitched curtains and blinds — measured, made, and fitted
          across the Kathmandu Valley.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-maroon px-9 py-4 text-[11px] font-medium uppercase tracking-[0.26em] text-white shadow-[0_18px_50px_-12px_rgba(98,16,31,0.8)] transition-all duration-300 hover:bg-maroon-dark hover:-translate-y-0.5"
          >
            Shop the Collection
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.26em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#120a0c]"
          >
            Book a Measurement
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
