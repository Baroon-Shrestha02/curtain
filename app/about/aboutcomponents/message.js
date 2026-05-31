"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MessageFromCEO({
  jobPosition = "Chief Executive Officer",
  firstName = "Sara",
  lastName = "Lamichhane",
  imageUrl = "https://cdn.pixabay.com/photo/2024/05/28/16/39/female-8794205_1280.png",
  shortQuote = "Weaving intentional, structural canvas frameworks into contemporary homes.",
  fullMessage = "Since our inception in 2014, our philosophy has remained completely uncompromised: to reject mass-produced, ready-made constraints and treat windows as vital architectural canvases. True luxury isn't simply about covering an opening; it is about calibrating light pathways, mastering textile densities, and tailoring spaces to reflect individual human stories. Thank you for welcoming our passion into your sanctuaries.",
}) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <section className="w-full bg-white py-24 px-[4vw] border-b border-gray-200/40 selection:bg-[#C19D53]/20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 select-none">
          <h2 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-wide text-[#2E3133] capitalize">
            Message from the CEO
          </h2>
          <div className="flex items-center gap-2 w-36 justify-center mt-4">
            <div className="h-px bg-gray-200/80 w-full" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#C19D53] shrink-0" />
            <div className="h-px bg-gray-200/80 w-full" />
          </div>
        </div>

        {/* Fixed-height Split Card:
            container is the scroll context, left portrait is sticky, right column scrolls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative rounded-xs border border-gray-200/60 shadow-xl bg-white overflow-hidden
                     flex flex-col lg:flex-row lg:items-start lg:h-[560px] lg:overflow-y-auto
                     [scrollbar-width:thin] [scrollbar-color:#C19D53_transparent]"
        >
          {/* Left — Sticky Portrait */}
          <div className="relative shrink-0 w-full lg:w-[42%] h-72 lg:h-[560px] lg:self-start lg:sticky lg:top-0 bg-[#F4F3F0]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#2E3133]/25 via-transparent to-transparent" />
            <img
              src={imageUrl}
              alt={fullName}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Right — Scrollable Content */}
          <div className="flex-1 flex flex-col justify-start px-8 sm:px-12 py-12 lg:py-14">
            {/* Executive Leadership Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-[#FF2A2A]" />
              <p className="text-xs font-bold tracking-[0.4em] text-[#FF2A2A] uppercase">
                {jobPosition}
              </p>
            </div>

            {/* Name */}
            <h3 className="select-none text-5xl sm:text-6xl font-extrabold tracking-tight text-[#A37F3D] leading-[0.95]">
              {firstName}
              <span className="block mt-2 font-serif italic font-normal text-[#C19D53] text-4xl sm:text-5xl tracking-wide">
                {lastName}
              </span>
            </h3>

            {/* Short Quote */}
            <p className="mt-8 font-serif text-lg sm:text-xl font-medium italic leading-relaxed text-[#2E3133]">
              &ldquo;{shortQuote}&rdquo;
            </p>

            {/* Full Message — always visible, scrolls within the card */}
            <p className="mt-6 pt-6 border-t border-gray-100 text-sm sm:text-base font-light leading-[1.8] tracking-wide text-gray-500 text-justify">
              {fullMessage}
            </p>

            {/* Signature Tag */}
            <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19D53]">
              Crafting Space Harmonies Since 2014
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
