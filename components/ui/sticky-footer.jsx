"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaViber } from "react-icons/fa6";
import { MdFilterFrames } from "react-icons/md";
import { ChevronDown } from "lucide-react";

export function StickyFooter({ className, ...props }) {
  return (
    <footer
      className={cn("relative h-screen w-full", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="fixed bottom-0 h-screen w-full">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative flex h-full w-full flex-col justify-end overflow-hidden">
            {/* BACKGROUND IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop"
              alt="Luxury Interior"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
            <div className="absolute bottom-0 left-0 h-[55%] w-full bg-gradient-to-t from-black via-black/80 to-transparent" />

            {/* TOP TITLE */}
            <div className="absolute left-1/2 top-[14%] z-10 w-full -translate-x-1/2 px-6 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-light leading-tight text-white md:text-6xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Woven for Every
                <br />
                Nepali Home.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mx-auto mt-6 max-w-2xl text-xs uppercase tracking-[0.28em] text-white/70"
              >
                Custom curtains · Free swatches · Delivered across Nepal
              </motion.p>
            </div>

            {/* FOOTER LINKS */}
            <div className="relative z-10 px-5 pb-6 md:px-12 md:pb-10">
              <div className="border-t border-white/20 pt-6 md:pt-8">
                {/* Brand row — full width on mobile, first col on desktop */}
                <AnimatedContainer className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:hidden">
                  <div className="flex items-center gap-3">
                    <MdFilterFrames className="size-7 text-white" />
                    <p className="text-sm leading-5 text-white/65">
                      Kathmandu-based custom curtain makers. Delivered across
                      Nepal in 3–7 days.
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.title}
                        size="icon"
                        variant="outline"
                        className="size-8 border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
                      >
                        <link.icon className="size-4" />
                      </Button>
                    ))}
                  </div>
                </AnimatedContainer>

                {/* Link groups grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-[1.2fr_repeat(4,1fr)] md:gap-10">
                  {/* Brand col — desktop only */}
                  <AnimatedContainer className="hidden space-y-5 md:block">
                    <MdFilterFrames className="size-8 text-white" />
                    <p className="max-w-sm text-sm leading-6 text-white/65">
                      Kathmandu-based custom curtain makers. Order via Viber,
                      pay with eSewa or Khalti, and we deliver across Nepal in
                      3–7 days.
                    </p>
                    <div className="flex gap-2">
                      {socialLinks.map((link) => (
                        <Button
                          key={link.title}
                          size="icon"
                          variant="outline"
                          className="size-8 border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
                        >
                          <link.icon className="size-4" />
                        </Button>
                      ))}
                    </div>
                  </AnimatedContainer>

                  {footerLinkGroups.map((group, index) => (
                    <FooterLinkGroup
                      key={group.label}
                      group={group}
                      delay={0.1 + index * 0.1}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center justify-between gap-1 border-t border-white/15 pt-4 text-xs text-white/50 sm:flex-row sm:text-sm md:mt-10 md:pt-5">
                <p>© 2025 Cozy Curtains. All rights reserved.</p>
                <p>Handcrafted in Kathmandu, Nepal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** On mobile: collapsible accordion. On md+: always-visible static list. */
function FooterLinkGroup({ group, delay }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatedContainer delay={delay}>
      {/* Mobile accordion trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between md:cursor-default md:pointer-events-none"
        aria-expanded={open}
      >
        <h3 className="text-xs uppercase tracking-[0.18em] text-white">
          {group.label}
        </h3>
        <ChevronDown
          className={cn(
            "size-4 text-white/50 transition-transform duration-300 md:hidden",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Links — always visible on md+, toggled on mobile */}
      <ul
        className={cn(
          "mt-3 space-y-2 overflow-hidden text-sm text-white/60 transition-all duration-300",
          // Mobile: collapse/expand
          "max-h-0 md:max-h-none",
          open && "max-h-96",
        )}
      >
        {group.links.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              className="block py-0.5 transition-colors duration-300 hover:text-white"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </AnimatedContainer>
  );
}

const socialLinks = [
  { title: "Facebook", href: "#", icon: FaFacebookSquare },
  { title: "Instagram", href: "#", icon: FaSquareInstagram },
  { title: "Viber", href: "#", icon: FaViber },
  { title: "LinkedIn", href: "#", icon: FaLinkedin },
];

const footerLinkGroups = [
  {
    label: "Curtain Types",
    links: [
      { title: "Blackout Curtains", href: "/products/blackout-curtains" },
      { title: "Sheer Curtains", href: "/products/sheer-curtains" },
      { title: "Velvet Drapes", href: "/products/velvet-drapes" },
      { title: "Jacquard Curtains", href: "/products/jacquard-curtains" },
      { title: "Zebra Blinds", href: "/products/zebra-blinds" },
      { title: "Roller Blinds", href: "/products/roller-blinds" },
    ],
  },
  {
    label: "Services",
    links: [
      { title: "Free Fabric Swatches", href: "/services/swatches" },
      { title: "In-Home Measurement", href: "/services/measurement" },
      { title: "Custom Stitching", href: "/services/stitching" },
      { title: "Fitting & Installation", href: "/services/installation" },
      { title: "Design Consultation", href: "/services/consultation" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Our Products", href: "/products" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms & Conditions", href: "/terms" },
    ],
  },
];

function AnimatedContainer({ delay = 0.1, children, className }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: 12, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
