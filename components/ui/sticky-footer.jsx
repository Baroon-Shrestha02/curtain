"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "./button";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram, FaViber } from "react-icons/fa6";
import { MdFilterFrames } from "react-icons/md";

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
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
            <div className="relative z-10 px-5 pb-8 md:px-12 md:pb-10">
              <div className="grid gap-10 border-t border-white/20 pt-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
                {/* Brand col */}
                <AnimatedContainer className="space-y-5">
                  <MdFilterFrames className="size-8 text-white" />
                  <p className="max-w-sm text-sm leading-6 text-white/65">
                    Kathmandu-based custom curtain makers. Order via Viber, pay
                    with eSewa or Khalti, and we deliver across Nepal in 3–7
                    days.
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
                  <AnimatedContainer
                    key={group.label}
                    delay={0.1 + index * 0.1}
                  >
                    <h3 className="text-xs uppercase tracking-[0.18em] text-white">
                      {group.label}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-white/60">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="transition-colors duration-300 hover:text-white"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-5 text-sm text-white/50 md:flex-row">
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
    label: "Order & Support",
    links: [
      { title: "Order via Viber", href: "/order/viber" },
      { title: "Pay with eSewa", href: "/order/esewa" },
      { title: "Track Your Order", href: "/order/track" },
      { title: "Care Instructions", href: "/support/care-guide" },
      { title: "FAQs", href: "/support/faqs" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Our Showroom", href: "/showroom" },
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
