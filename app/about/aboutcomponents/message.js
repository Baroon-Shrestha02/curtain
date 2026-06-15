"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ACCENT = "#E01522";

export default function MessageFromCEO({
  jobPosition = "Chief Executive Officer",
  firstName = "Sara",
  lastName = "Lamichhane",
  imageUrl = "https://cdn.pixabay.com/photo/2024/05/28/16/39/female-8794205_1280.png",
  shortQuote = "We don't just deliver projects — we build digital experiences that move businesses forward.",
  fullMessage = "Since our founding in 2014, our goal has stayed the same: to treat every website, app, and security engagement as a product worth obsessing over. We believe great technology is equal parts craft and care — clean code, thoughtful design, and an honest partnership with the people we build for. Thank you for trusting our team to bring your ideas to life.",
  tagline = "JavTech Infosys · Building digital products since 2014",
}) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <section className="w-full overflow-hidden border-b border-gray-200/60 bg-white px-6 py-24 selection:bg-[#E01522]/20">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 flex select-none flex-col items-center text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            Leadership
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Message from the CEO
          </h2>
          <div className="mt-5 flex w-36 items-center justify-center gap-2">
            <div className="h-px w-full bg-gray-200" />
            <div
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ACCENT }}
            />
            <div className="h-px w-full bg-gray-200" />
          </div>
        </div>

        {/* Split card — sizes to content, no internal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 overflow-hidden rounded-3xl border border-gray-200 bg-white lg:min-h-[480px] lg:grid-cols-[42%_1fr]"
        >
          {/* Left — portrait (fills the card height on desktop) */}
          <div className="relative h-80 overflow-hidden bg-gray-100 lg:h-auto">
            <img
              src={imageUrl}
              alt={fullName}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Right — content */}
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14 lg:py-14">
            {/* Role */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-6" style={{ background: ACCENT }} />
              <p
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: ACCENT }}
              >
                {jobPosition}
              </p>
            </div>

            {/* Quote mark + short quote */}
            <Quote
              className="mb-4 h-8 w-8"
              style={{ color: ACCENT }}
              aria-hidden="true"
            />
            <p className="text-xl font-medium leading-snug text-gray-900 sm:text-2xl">
              {shortQuote}
            </p>

            {/* Full message */}
            <p className="mt-6 border-t border-gray-100 pt-6 text-[15px] font-light leading-[1.8] text-gray-500">
              {fullMessage}
            </p>

            {/* Name + signature */}
            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-2xl font-bold tracking-tight text-gray-900">
                  {fullName}
                </p>
                <p
                  className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  {tagline}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
