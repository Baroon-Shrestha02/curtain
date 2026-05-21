'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Next.js Native Link imported for clean routing with hash anchors
import Link from 'next/link';
import { ArrowUpRight, Ruler, Scissors, Milestone, CheckCircle2 } from 'lucide-react';

// Inline utility to combine classes dynamically
function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

// Enhanced Process Card Component with Liquid Micro-Animations
const ProcessCard = ({ icon: Icon, title, description, num, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.610, 0.355, 1.0] }}
    whileHover={{ y: -6 }}
    className={cn(
      "group relative w-full rounded-sm border bg-white p-8 transition-all cursor-pointer duration-400",
      "border-gray-200/70 shadow-xs hover:shadow-xl hover:border-[#C19D53]/60 flex flex-col justify-between"
    )}
  >
    <div>
      {/* Top Header Row within Card */}
      <div className="flex items-center justify-between mb-6">
        {/* Icon Container */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xs border border-gray-100 bg-[#F4F3F0] text-[#C19D53] shadow-2xs transition-all duration-400 group-hover:bg-[#1A1B1C] group-hover:text-white group-hover:border-[#1A1B1C]">
          <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6" />
        </div>
        
        {/* Phase Number Tag */}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-[#C19D53] transition-colors duration-300">
          Phase {num}
        </span>
      </div>

      {/* Content Block */}
      <div className="flex flex-col">
        <h3 className="text-lg font-extrabold tracking-tight text-[#1A1B1C]">
          {title}
        </h3>
        
        {/* Clean, Expanding Minimal Accent Line */}
        <div className="h-0.5 w-6 bg-gray-200 mt-2 mb-3 transition-all duration-400 group-hover:w-16 group-hover:bg-[#C19D53]" />
        
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

// Main Process Section Component
export default function OurProcess() {
  const processSteps = [
    {
      num: "01",
      icon: Ruler,
      title: "Laser Measurement",
      description: "We conduct millimeter-accurate structural assessments, recording window depths and casing limitations.",
    },
    {
      num: "02",
      icon: Scissors,
      title: "Textile Curation",
      description: "Select premium textures straight from our elite collection of imported linens and light sheers.",
    },
    {
      num: "03",
      icon: Milestone,
      title: "Artisan Fabrication",
      description: "Our local workshop hand-cuts, lines, and constructs every drapery panel for flawless folds.",
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Precision Fitting",
      description: "Our dedicated technicians securely mount hidden silent tracks and run full configuration checks.",
    },
  ];

  return (
    <section className="w-full bg-[#F4F3F0] py-24 px-[4vw] border-t border-gray-200/40 selection:bg-[#C19D53]/20 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8 lg:gap-16 items-center">
        
        {/* Left Side Static Content Header Framework */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-start text-left md:col-span-4"
        >
          <span className="text-xs font-black uppercase text-[#FF2A2A] tracking-[0.35em] block mb-3">
            Blueprint to Reality
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-[#1A1B1C] mb-4">
            Our Seamless <br />
            <span className="font-serif italic text-[#C19D53] font-normal block mt-1">Design Process</span>
          </h2>
          
          <p className="mb-8 text-sm sm:text-base text-gray-500 font-light leading-relaxed max-w-sm">
            We simplify window installations down to a structural science. From exact calculations to final reveals, we handle every milestone layout flawlessly.
          </p>
          
          {/* ── LINKED DIRECTLY TO THE CONTACT FORM SECTION ANCHOR ── */}
          <Link 
            href="/contact#contact-form"
            className="group inline-flex items-center justify-center gap-2 bg-[#1A1B1C] text-white border-2 border-[#1A1B1C] hover:bg-transparent hover:text-[#1A1B1C] font-black uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-sm shadow-sm transition-all duration-400 cursor-pointer outline-none"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>

        {/* Right Side Cards Grid (Takes up 8 columns of the layout) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-8 w-full">
          {processSteps.map((step, index) => (
            <ProcessCard 
              key={step.num} 
              index={index}
              num={step.num}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}