"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export default function MessageFromCEO({
  jobPosition = "Chief Executive Officer",
  firstName = "Bhumika",
  lastName = "Bista",
  imageUrl = "https://cdn.pixabay.com/photo/2024/05/28/16/39/female-8794205_1280.png",
  shortQuote = "Weaving intentional, structural canvas frameworks into contemporary homes.",
  fullMessage = "Since our inception in 2014, our philosophy has remained completely uncompromised: to reject mass-produced, ready-made constraints and treat windows as vital architectural canvases. True luxury isn't simply about covering an opening; it is about calibrating light pathways, mastering textile densities, and tailoring spaces to reflect individual human stories. Thank you for welcoming our passion into your sanctuaries.",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const fullName = `${firstName} ${lastName}`;

  return (
    <section className="w-full bg-white py-24 px-[4vw] border-b border-gray-200/40 selection:bg-[#C19D53]/20 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative flex flex-col justify-center"
        >
          {/* Centered Fancy Section Header Layout */}
          <div className="flex flex-col items-center justify-center text-center mb-24 relative select-none">
            <h2 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-wide text-[#2E3133] relative pb-3 capitalize">
              Message from the CEO
            </h2>
            <div className="flex items-center gap-2 w-36 justify-center mt-2">
              <div className="h-px bg-gray-200/80 w-full" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#C19D53] shrink-0" />
              <div className="h-px bg-gray-200/80 w-full" />
            </div>
          </div>

          {/* Core Content Split Matrix Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side Portrait Framing Layout */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="relative h-[55vh] sm:h-[60vh] w-full max-w-[420px] overflow-hidden rounded-xs border border-gray-200/60 shadow-xl bg-[#F4F3F0]"
              >
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#2E3133]/20 via-transparent to-transparent" />
                <img
                  src={imageUrl}
                  alt={fullName}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-[0.25,1,0.5,1] hover:scale-103"
                />
              </motion.div>
            </div>

            {/* Right Side Content Context Layer */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start w-full max-w-2xl lg:pl-4">
              
              {/* Executive Leadership Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-[#FF2A2A]" />
                <p className="text-xs font-bold tracking-[0.4em] text-[#FF2A2A] uppercase">
                  {jobPosition}
                </p>
              </div>

              {/* Luxury Fancy Gold Typographic Heading */}
              <div className="relative select-none mb-10">
                <h3 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#A37F3D] leading-[0.95]">
                  {firstName}
                  <span className="font-serif italic text-[#C19D53] font-normal block mt-2 tracking-wide text-4xl sm:text-6xl">
                    {lastName}
                  </span>
                </h3>
              </div>

              {/* Interaction Block Area */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative w-full">
                {/* Decorative Giant Editorial Quote Mark */}
                <span className="hidden sm:block absolute -left-6 -top-14 font-serif text-9xl text-gray-200/30 pointer-events-none select-none">
                  “
                </span>

                {/* Expand/Collapse Interactive Circular Trigger */}
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                  className={cn(
                    "group flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-500 ease-[0.25,1,0.5,1] outline-none",
                    isOpen
                      ? "border-[#2E3133] bg-[#2E3133] shadow-md"
                      : "border-gray-200 bg-white hover:border-[#2E3133] hover:bg-[#2E3133] shadow-xs"
                  )}
                >
                  <ArrowRight
                    size={18}
                    className={cn(
                      "transition-transform duration-500 ease-[0.25,1,0.5,1]",
                      isOpen
                        ? "rotate-90 text-[#C19D53]"
                        : "text-[#2E3133] group-hover:text-white group-hover:-rotate-45"
                    )}
                  />
                </button>

                {/* Content Message Shell */}
                <div className="w-full flex flex-col justify-center">
                  {/* Premium Styled Preview Quote */}
                  <p className="text-lg sm:text-xl text-[#2E3133] font-medium tracking-wide leading-relaxed font-serif italic">
                    {shortQuote}
                  </p>

                  {/* Smooth Framer Motion Expansion Area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-6 border-t border-gray-100 mt-6 text-sm sm:text-base text-gray-500 font-light leading-[1.8] tracking-wide text-justify">
                          {fullMessage}
                        </p>

                        <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C19D53]">
                          Crafting Space Harmonies Since 2014
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}