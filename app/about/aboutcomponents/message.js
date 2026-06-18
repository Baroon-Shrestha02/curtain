"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

export default function MessageFromCEO({
  jobPosition = "Chief Executive Officer",
  firstName = "Sushil",
  lastName = "BC",
  imageUrl = "message.jpg",
  shortQuote = "Weaving intentional, structural canvas frameworks into contemporary homes.",
  fullMessage = "Since our inception in 2014, our philosophy has remained completely uncompromised: to reject mass-produced, ready-made constraints and treat windows as vital architectural canvases. True luxury isn't simply about covering an opening; it is about calibrating light pathways, mastering textile densities, and tailoring spaces to reflect individual human stories. Thank you for welcoming our passion into your sanctuaries.",
}) {
  const fullName = `${firstName} ${lastName}`;
  const { phones } = useSiteSettings();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="w-full bg-[#FFFDF9] py-24 sm:py-32 px-[4vw] overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Portrait */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs border border-gray-100 shadow-xl bg-[#F4F3F0]">
              <img
                src={imageUrl}
                alt={fullName}
                className="h-full w-full object-cover object-center transition-transform duration-[3000ms] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#1A1B1C] tracking-wide">
                {fullName}
              </h4>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#C19D53]">
                {jobPosition}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Message */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <div className="mb-12">
              <motion.span
                variants={itemVariants}
                className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2A2A] px-2 py-1 bg-gray-100 rounded-sm"
              >
                A Personal Note
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-6xl font-extrabold text-[#1A1B1C] mt-6 tracking-tight leading-[1.1]"
              >
                {firstName}{" "}
                <span className="font-serif italic font-normal text-[#C19D53]">
                  {lastName}
                </span>
              </motion.h2>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative pl-8 border-l border-gray-200"
            >
              <blockquote className="text-2xl sm:text-3xl font-serif italic text-[#1A1B1C] mb-10 leading-snug">
                “{shortQuote}”
              </blockquote>

              <div className="prose prose-stone prose-lg text-[#2C2E30] leading-[1.8] font-light max-w-none">
                <p className="text-lg">{fullMessage}</p>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-[#C19D53]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1B1C]">
                    {phones.map((p) => `+977 ${p}`).join(" | ")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
