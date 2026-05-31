"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CalendarHeart, Palette, Ruler, Wrench } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: CalendarHeart,
    title: "Book a Free Home Visit",
    body: "Get in touch and we'll arrange a convenient time to visit your home. No obligation, no charge — our advisor looks at each window and helps you understand your options.",
    tag: "No obligation",
    image: "/services/img/one.jpg",
    alt: "Home consultation",
  },
  {
    icon: Palette,
    title: "Choose Your Fabric & Style",
    body: "Browse our sample books in your own home and your own light. We help you select the right fabric, colour, heading style, and lining for each room.",
    tag: "In-home samples",
    image: "/services/img/two.jpg",
    alt: "Fabric samples",
  },
  {
    icon: Ruler,
    title: "We Measure, Cut & Craft",
    body: "Once you're happy, we take precise measurements of every window. Your curtains or blinds are then made to order by our experienced makers.",
    tag: "2–3 weeks",
    image: "/services/img/three.jpg",
    alt: "Crafting curtains",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    body: "Our fitting team installs everything cleanly and securely. We hang, dress, and adjust each piece until it looks exactly right — then walk you through the care.",
    tag: "1–3 hours",
    image: "/services/img/four.jpg",
    alt: "Professional fitting",
  },
];

const EASE = [0.22, 1, 0.36, 1];

// ─── REUSABLE NODE ────────────────────────────────────────────────────────────

function Node({ Icon, index, inView }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
      className="flex justify-center"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f7f7f5] bg-[#62101F] text-white">
        <Icon size={22} />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-[#62101F] bg-white text-[10px] font-bold text-[#62101F]">
          {index + 1}
        </span>
      </div>
    </motion.div>
  );
}

// ─── STEP ROW ─────────────────────────────────────────────────────────────────

function Step({ step, index }) {
  const { icon: Icon, title, body, tag, image, alt } = step;
  const isLeft = index % 2 === 0; // even -> content left (desktop)
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const Content = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className={`px-2 py-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
    >
      <h3
        className="mb-2 text-lg font-bold text-black"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="text-[13px] leading-[1.72] text-black/55">{body}</p>
      <span className="mt-3 inline-block rounded-full bg-[#f3e8ea] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#62101F]">
        {tag}
      </span>
    </motion.div>
  );

  const Image = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="h-[180px] overflow-hidden rounded-[14px]"
    >
      <img src={image} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );

  return (
    <div ref={ref}>
      {/* ── Mobile: left-line timeline + card ── */}
      <div className="relative mb-7 pl-[68px] md:hidden">
        {/* Node sits on the line */}
        <div className="absolute left-0 top-0">
          <Node Icon={Icon} index={index} inView={inView} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden rounded-2xl border border-[#ece8e2] bg-white"
        >
          <div className="h-[160px] overflow-hidden">
            <img src={image} alt={alt} className="h-full w-full object-cover" />
          </div>
          <div className="px-5 pb-6 pt-5">
            <h3
              className="mb-2 text-lg font-bold text-black"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h3>
            <p className="text-[13px] leading-[1.72] text-black/55">{body}</p>
            <span className="mt-3 inline-block rounded-full bg-[#f3e8ea] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#62101F]">
              {tag}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Desktop: alternating timeline row ── */}
      <div className="mb-10 hidden grid-cols-[1fr_60px_1fr] items-center md:grid">
        {isLeft ? (
          <>
            {Content}
            <Node Icon={Icon} index={index} inView={inView} />
            {Image}
          </>
        ) : (
          <>
            {Image}
            <Node Icon={Icon} index={index} inView={inView} />
            {Content}
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function HowWeWork() {
  const headRef = useRef(null);
  const timelineRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  // Line "draws" down as the section scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-[#f7f7f5] px-7 py-16">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* Heading */}
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto mb-12 max-w-xl text-center"
      >
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#62101F]">
          Our Process
        </p>
        <h2
          className="mb-3.5 text-3xl font-bold leading-[1.18] tracking-tight text-black md:text-[2.1rem]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          From First Enquiry to Perfect Fit
        </h2>
        <p className="text-sm leading-[1.75] text-black/55">
          We handle everything from the first measurement to the final fitting —
          so you don't have to worry about a thing.
        </p>
      </motion.div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative mx-auto max-w-4xl">
        {/* Desktop center line — scroll-driven draw */}
        <motion.div
          aria-hidden
          style={{ scaleY: lineScaleY }}
          className="absolute left-1/2 top-2.5 bottom-2.5 hidden w-0.5 origin-top -translate-x-1/2 bg-[#62101F]/30 md:block"
        />

        {/* Mobile left line — fixed at x = node center (24px) */}
        <motion.div
          aria-hidden
          style={{ scaleY: lineScaleY }}
          className="absolute left-[23px] top-3 bottom-3 w-0.5 origin-top bg-[#62101F]/25 md:hidden"
        />

        {STEPS.map((step, i) => (
          <Step key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
