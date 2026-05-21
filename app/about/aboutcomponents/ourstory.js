'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, History, Fingerprint, Sparkles, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

const FlowSection = ({
  className,
  style = {},
  children,
  id, // Added id prop to support anchor navigation on specific panels if needed
  'aria-label': ariaLabel,
}) => (
  <section
    id={id}
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-screen w-full overflow-hidden bg-[#FFFDF9]', className)}
  >
    <div
      data-flow-inner
      className="flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]"
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

const childCount = (children) => React.Children.count(children);

const FlowArt = ({
  children,
  className,
  id, // Target ID passed down to the main wrapper
  ariaLabel = 'Brand narrative scroll',
}) => {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = gsap.utils.toArray('[data-flow-section]');
      if (sections.length === 0) return;

      // Master configuration Context for pinning loops
      sections.forEach((section, i) => {
        const inner = section.querySelector('.flow-art-container');
        if (!inner) return;

        // Establish stack indexing hierarchy
        gsap.set(section, { zIndex: i + 1 });

        // Phase 1: Incoming rotation unroll animation sequence
        if (i > 0) {
          gsap.set(inner, { rotation: 12, transformOrigin: 'bottom left' });
          gsap.to(inner, {
            rotation: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: 1, // Smooth dampening catch-up delay latency metric
            },
          });
        }

        // Phase 2: Outgoing sticky pinning contraction animation layout
        if (i < sections.length - 1) {
          const outgoingTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: '+=100%', // Match scale track velocity values 
              pin: true,
              pinSpacing: false,
              scrub: 1,
              invalidateOnRefresh: true
            }
          });

          outgoingTimeline.to(inner, {
            scale: 0.92,
            opacity: 0.4,
            blur: 4,
            ease: 'power1.inOut'
          });
        }
      });

      // Recalculate operational spatial mapping lines safely
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] }
  );

  return (
    <div
      id={id}
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden bg-[#FFFDF9]', className)}
    >
      {children}
    </div>
  );
};

export default function OurStory() {
  // Smooth Scroll function to navigate to navbar's gallery section
  const handleGalleryScroll = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <FlowArt id="our-story" className="selection:bg-[#C19D53]/20">
      
      {/* PANEL 1: THE FOUNDATION ORIGINS (Light Ivory Palette) */}
      <FlowSection className="bg-[#FFFDF9] border-b border-[#F4F3F0]">
        <div className="my-auto mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black uppercase text-[#FF2A2A] tracking-[0.4em] px-2.5 py-1 bg-gray-100 rounded-full">
                01 // Genesis
              </span>
              <span className="font-serif italic text-xs text-[#C19D53] tracking-wider">
                — Our Story Began Here
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#1A1B1C]">
              The Spark of <br />
              <span className="font-serif italic text-[#C19D53] font-normal block mt-2">Window Couture</span>
            </h2>
            
            <p className="mt-8 text-base sm:text-lg text-[#2C2E30] leading-relaxed font-normal">
              In 2014, The Cozy Curtains was born out of a stark realization: while interior design was rapidly evolving into an art form, window styling remained an afterthought of basic mass production. We set out to change that standard completely.
            </p>
            
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed font-light">
              Operating from a modest, specialized workshop, we committed ourselves entirely to bespoke panel craft. We studied architectural layout frameworks and light orientations to make drapery an intentional structural statements.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200/60 pt-8">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xs bg-[#F4F3F0] flex items-center justify-center shrink-0 text-[#C19D53]">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#1A1B1C]">Established 2014</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">Built on a foundational philosophy of high-precision tailoring layouts.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xs bg-[#F4F3F0] flex items-center justify-center shrink-0 text-[#FF2A2A]">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#1A1B1C]">Bespoke DNA</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">Rejecting ready-made sizes to ensure perfect drop-panel metrics.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[45vh] lg:h-[70vh] w-full rounded-xs overflow-hidden bg-[#F4F3F0] border border-gray-200/60 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200" 
              alt="Artisan sewing workspace detailing high-end fabric integration"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </FlowSection>

      {/* PANEL 2: MATURATION & THE CRAFT (Architectural Warm Gray Palette) */}
      <FlowSection className="bg-[#F4F3F0]">
        <div className="my-auto mx-auto max-w-7xl w-full text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="inline-block relative mb-4">
              <span className="text-xs font-serif italic text-[#C19D53] block tracking-[0.2em]">
                The Evolution Of Our Story
              </span>
              <div className="w-12 h-[1px] bg-[#FF2A2A] mx-auto mt-2"></div>
            </div>
            
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1A1B1C]">
              Refining The Elegant <span className="font-serif italic font-normal text-[#C19D53]">Art of Drapery</span>
            </h3>
            <p className="text-sm text-gray-500 mt-4 max-w-xl mx-auto font-light leading-relaxed">
              As design standards shifted toward minimalist architectural silhouettes, we evolved our methods, sourcing globally premium fabrics and training our hands to track hidden weights perfectly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-[#FFFDF9] p-10 rounded-xs border border-gray-200/50 flex flex-col justify-between group shadow-sm hover:shadow-md transition-colors duration-300">
              <div>
                <span className="text-[32px] font-serif italic font-light text-gray-200 block mb-4 group-hover:text-[#C19D53] transition-colors duration-300">01</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19D53] block mb-1">Textile Sourcing</span>
                <h4 className="text-xl font-black text-[#1A1B1C] mb-4">Global Curations</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Forming premium supply loops directly with heritage weavers across Belgium and Europe to obtain elite linen and lace variants.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-[10px] font-black tracking-widest uppercase text-gray-400">
                Premium Networks
              </div>
            </div>

            <div className="bg-[#FFFDF9] p-10 rounded-xs border border-gray-200/50 flex flex-col justify-between group shadow-sm hover:shadow-md transition-colors duration-300">
              <div>
                <span className="text-[32px] font-serif italic font-light text-gray-200 block mb-4 group-hover:text-[#FF2A2A] transition-colors duration-300">02</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19D53] block mb-1">Internal Workrooms</span>
                <h4 className="text-xl font-black text-[#1A1B1C] mb-4">Artisan Crafting</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Moving fabrication entirely in-house. Every seam, double-fold hem, and custom master pleat is executed under strict localized oversight.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-[10px] font-black tracking-widest uppercase text-gray-400">
                Millimeter Control
              </div>
            </div>

            <div className="bg-[#FFFDF9] p-10 rounded-xs border border-gray-200/50 flex flex-col justify-between group shadow-sm hover:shadow-md transition-colors duration-300">
              <div>
                <span className="text-[32px] font-serif italic font-light text-gray-200 block mb-4 group-hover:text-[#C19D53] transition-colors duration-300">03</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C19D53] block mb-1">Ecosystem Merging</span>
                <h4 className="text-xl font-black text-[#1A1B1C] mb-4">Smart Automation</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Integrating architectural track pathways with luxury automation engines, introducing quiet motorizations to luxury developments.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-[10px] font-black tracking-widest uppercase text-gray-400">
                Modern Execution
              </div>
            </div>

          </div>
        </div>
      </FlowSection>

      {/* PANEL 3: THE FUTURE VISION (Contrast Framing Layout) */}
      <FlowSection className="bg-[#FFFDF9] border-t border-[#F4F3F0]">
        <div className="my-auto mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 text-left">
            <div className="mb-4">
              <h5 className="text-[11px] font-extrabold uppercase tracking-[0.5em] text-[#1A1B1C]">
                OUR STORY <span className="text-[#C19D53] font-serif italic font-normal lowercase font-bold text-sm tracking-normal">continues</span>
              </h5>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#1A1B1C]">
              Setting The Next Era Of <br />
              <span className="font-serif italic text-[#C19D53] font-normal block mt-2">Tailored Living</span>
            </h2>
            
            <p className="mt-6 text-base text-[#2C2E30] leading-relaxed font-normal">
              Today, The Cozy Curtains serves as an authority for design studios, architects, and high-end homeowners. We continue to break free from standard retail catalog constraints to create spatial harmonies.
            </p>
            
            <p className="mt-4 text-sm text-gray-500 leading-relaxed font-light">
              Our future is defined by sustainable smart textiles and integrated motorized draperies that preserve thermal layers while executing pristine movement fluidities.
            </p>
            
            <div className="mt-8">
              {/* Added onClick tracking to smooth scroll up to navbar's target container */}
              <button 
                onClick={handleGalleryScroll}
                className="group flex items-center gap-3 bg-[#1A1B1C] border-2 border-[#1A1B1C] text-white px-7 py-4 text-xs tracking-[0.2em] uppercase font-black transition-all duration-300 rounded-xs hover:bg-transparent hover:text-[#1A1B1C] cursor-pointer"
              >
                <span>View Our Curated Gallery</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-[#F4F3F0] p-8 rounded-xs border border-gray-200/60 flex flex-col justify-between min-h-[250px] shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-[#FFFDF9] border border-gray-200/60 text-[#C19D53] mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1A1B1C] tracking-wide">Elite Standards</h4>
                <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">Maintaining rigorous metrics across hidden weighted baselines and pleat configurations.</p>
              </div>
            </div>

            <div className="bg-[#F4F3F0] p-8 rounded-xs border border-gray-200/60 flex flex-col justify-between min-h-[250px] shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xs bg-[#FFFDF9] border border-gray-200/60 text-[#FF2A2A] mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1A1B1C] tracking-wide">Forward Footprint</h4>
                <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">Pioneering sustainable, thermal-shield weave installations for contemporary buildings.</p>
              </div>
            </div>
          </div>
          
        </div>
      </FlowSection>

    </FlowArt>
  );
}