"use client";

import React from "react";
import { motion } from "motion/react";
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  useSiteSettings,
  useWhatsappNumber,
} from "@/lib/SiteSettingsContext";

export default function HomeCTA() {
  const { phones, email, address } = useSiteSettings();
  const whatsappNumber = useWhatsappNumber();
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Cozy Curtains, I want to order custom curtains.",
  )}`;

  return (
    <section className="relative w-full bg-white px-5 py-20 md:px-10">
      <div className="container mx-auto">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem]">
          {/* Background Image */}
          <img
            src="footer.jpeg"
            alt="Premium curtains interior"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-7 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[#C9A84C]">
                Ready For A New Look?
              </p>

              <h2
                className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Get Your Curtains
                <br />
                As Soon As Possible
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                From measurement to stitching and fitting, we make custom
                curtains simple, fast, and reliable. Send us your window size or
                request a quotation today.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#62101F] px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <MessageCircle size={18} />
                  Leave a Message
                </a>

                <Link
                  href="/quote"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
                >
                  Get a Quotation
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-14 grid gap-4 border-t border-white/15 pt-6 text-white/75 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-[#C9A84C]" />
                <span className="text-sm">
                  {phones.map((p) => `+977 ${p}`).join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={17} className="text-[#C9A84C]" />
                <span className="text-sm">WhatsApp Available</span>
              </div>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3"
                >
                  <Mail size={17} className="text-[#C9A84C]" />
                  <span className="text-sm">{email}</span>
                </a>
              )}
              {address && (
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="text-[#C9A84C]" />
                  <span className="text-sm">{address}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
