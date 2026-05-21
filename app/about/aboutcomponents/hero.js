"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

export default function StandoutHero() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Typewriter chain sequence flags
  const [line1Finished, setLine1Finished] = useState(false);
  const [line2Finished, setLine2Finished] = useState(false);
  const [line3Finished, setLine3Finished] = useState(false);

  const webSlides = [
    {
      url: "./slider1.jpg",
      alt: "Elegant living room with luxurious drapery and soft natural light",
    },
    {
      url: "./slider2.jpg",
      alt: "Sophisticated bedroom featuring tailored curtains and a serene ambiance",
    },
    {
      url: "./slider3.jpg",
      alt: "Modern dining area with floor-to-ceiling curtains and a warm, inviting atmosphere",
    },
    {
      url: "./slider4.jpg",
      alt: "Contemporary office space with sleek blackout curtains and a professional atmosphere",
    }
  ];

  // Smooth Scroll Function
  const scrollToStory = () => {
    const storySection = document.getElementById("our-story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Premium cinematic typography staggers
  const typewriterContainer = {
    hidden: { opacity: 0, letterSpacing: "0.2em" },
    visible: {
      opacity: 1,
      letterSpacing: "0.4em",
      transition: { 
        staggerChildren: 0.025,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const textLineContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    }
  };

  const characterItem = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative h-[85vh] sm:h-[92vh] w-full overflow-hidden bg-[#2C2E30]">
      
      {/* Background Cinematic Canvas Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1600}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {webSlides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative h-full w-full">
            <motion.img
              src={slide.url}
              alt={slide.alt}
              initial={{ scale: 1 }}
              animate={activeIndex === idx ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full w-full object-cover object-center pointer-events-none select-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Narrative Typography Frame */}
      <div className="absolute inset-0 z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 flex items-end pb-16 sm:pb-24 pointer-events-none">
        <div className="w-full max-w-5xl text-[#FFFDF9] pointer-events-auto selection:bg-[#ECC970]/30 rounded-sm p-2">
          
          {/* HEAVY DEEP DROP SHADOW SYSTEM TO SEPARATE TEXT FROM BACKGROUND */}
          <h1 className="flex flex-col justify-end tracking-tight drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]">
            
            {/* Identity High-Contrast Vibrant Crimson Red Label */}
            <div className="relative mb-3 h-5 overflow-hidden">
              <motion.span 
                variants={typewriterContainer}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => setLine1Finished(true)}
                className="text-[11px] font-black uppercase text-[#FF2A2A] block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
              >
                {"Our Legacy".split("").map((char, index) => (
                  <motion.span key={index} variants={characterItem}>{char}</motion.span>
                ))}
              </motion.span>
            </div>

            {/* Row 2: Reduced, Hard-hitting Core Headline */}
            <span className="block overflow-visible min-h-[1.2em]">
              {line1Finished && (
                <motion.span 
                  variants={textLineContainer}
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={() => setLine2Finished(true)}
                  className="text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] block text-[#FFFDF9]"
                >
                  {"Luxury Tailored".split("").map((char, index) => (
                    <motion.span key={index} variants={characterItem}>{char}</motion.span>
                  ))}
                </motion.span>
              )}
            </span>

            {/* Row 3: High-Vibrancy Gold Accent Focus */}
            <span className="block overflow-visible min-h-[1.2em]">
              {line2Finished && (
                <motion.span 
                  variants={textLineContainer}
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={() => setLine3Finished(true)}
                  className="text-3xl sm:text-6xl lg:text-7xl font-serif italic text-[#ECC970] font-normal block leading-[1.1] mt-1 sm:mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                >
                  {"Windows Since 2014".split("").map((char, index) => (
                    <motion.span key={index} variants={characterItem}>{char}</motion.span>
                  ))}
                </motion.span>
              )}
            </span>
          </h1>

          {/* Clean, Condensed Secondary Copy */}
          <div className="mt-6 overflow-hidden max-w-xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <motion.p 
              initial={{ y: "100%", opacity: 0 }}
              animate={line3Finished ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-white font-normal leading-relaxed"
            >
              For over a decade, The Cozy Curtains has redefined spaces with premium bespoke couture—blending architectural light control with tailored comfort.
            </motion.p>
          </div>

          {/* Architectural Reveal Action Button */}
          <div className="mt-8 overflow-hidden h-16 flex items-center">
            <motion.div 
              initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              animate={line3Finished ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                onClick={scrollToStory}
                className="group flex items-center gap-4 bg-[#ECC970] border-2 border-[#ECC970] text-[#121314] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-black transition-all duration-500 rounded-sm hover:border-white hover:text-white hover:bg-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-2.5 text-[#121314] group-hover:text-white" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Precision Peripheral Manual Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 sm:px-8 pointer-events-none">
        <button 
          onClick={() => swiperInstance?.slidePrev()}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1B1C]/60 text-white border border-white/20 backdrop-blur-xs transition-all duration-300 hover:bg-[#ECC970] hover:text-[#121314] hover:border-[#ECC970] active:scale-95 shadow-2xl cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        <button 
          onClick={() => swiperInstance?.slideNext()}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1B1C]/60 text-white border border-white/20 backdrop-blur-xs transition-all duration-300 hover:bg-[#ECC970] hover:text-[#121314] hover:border-[#ECC970] active:scale-95 shadow-2xl cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Minimalist Linear Pagination Tracker */}
      <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center items-center gap-2.5 pointer-events-none">
        {webSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideToLoop(index)}
            className={`pointer-events-auto h-1.5 transition-all duration-700 ease-[0.16,1,0.3,1] rounded-full cursor-pointer ${
              index === activeIndex ? "bg-[#ECC970] w-9" : "bg-white/40 w-1.5 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}