"use client";

import { useState } from "react";
import { Mail, MessageCircle, PlusCircle, Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What's included when I order curtains?",
    a: "Every order includes a free consultation, fabric swatches, in-home or Viber measurement support, and stitching. Fitting and installation across the Kathmandu Valley are handled by our team.",
  },
  {
    q: "How much do custom curtains cost?",
    a: "Pricing depends on the fabric, window size, and quantity. We offer options for every budget, from everyday sheers to premium velvet drapes. Send us your window measurements for a tailored quote.",
  },
  {
    q: "How long does it take to get my curtains?",
    a: "Standard custom orders are delivered across the Kathmandu Valley in 3–7 business days. Larger or specialty orders may need an additional 3–5 days for stitching.",
  },
  {
    q: "Do you only make premium curtains?",
    a: "Not at all — we carry everything from affordable everyday curtains to premium collections. There's a fabric and finish for every room and budget.",
  },
  {
    q: "How do I measure my windows?",
    a: "We make it easy — share a photo and rough sizes over Viber and we'll guide you, or book a free in-home measurement within the valley so the fit is exact.",
  },
];

export default function HomeFaq() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="container mx-auto px-6 md:px-12 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-4">
          FAQ
        </p>
        <h2
          className="text-[38px] font-medium text-gray-900 leading-tight tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Frequently Asked
        </h2>
        <h2
          className="text-[38px] font-normal italic leading-tight text-[#62101F]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Questions
        </h2>
      </div>

      {/* Body — accordion + image */}
      <div className="flex items-stretch border border-gray-100 rounded-2xl overflow-hidden">
        {/* Left — accordion */}
        <div className="flex-1 min-w-0 p-8 md:p-10">
          {/* Contact row */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#62101F] mb-1.5">
                Email us
              </p>
              <p
                className="text-sm font-medium text-gray-900"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                info@cozycurtains.com
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#62101F] text-white rounded-full px-5 py-2.5 text-[12px] tracking-[0.1em] hover:bg-[#62101F] transition-colors shadow-[#62101F] hover:shadow-xl hover:-translate-y-2"
            >
              <Mail size={14} />
              Get in touch
            </Link>
          </div>

          {/* Accordion */}
          <div>
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`transition-all duration-200 ${
                  open === i
                    ? "bg-[#FBF8F4] rounded-xl border-transparent my-1"
                    : "border-b border-gray-100"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  className={`w-full flex items-center justify-between gap-4 py-5 text-left transition-all ${
                    open === i ? "px-4" : "pr-2"
                  }`}
                >
                  <span
                    className={`text-sm font-normal leading-snug transition-colors duration-200 ${
                      open === i ? "text-[#62101F]" : "text-gray-900"
                    }`}
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      open === i ? "bg-[#62101F] rotate-45" : "bg-[#1A0A0D]"
                    }`}
                  >
                    <Plus size={14} color="white" />
                  </span>
                </button>
                <div
                  className={`text-sm text-gray-500 leading-relaxed overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-40 pb-5 px-4" : "max-h-0"
                  }`}
                >
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — full height image */}
        <div className="hidden md:block w-[280px] flex-shrink-0 relative">
          <img
            src="/services.jpg"
            alt="Product showcase"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="font-medium text-gray-900">
            Still have questions?
          </span>
          <br className="hidden sm:block" /> Our team is happy to help you find
          the right product.
        </p>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <PlusCircle size={14} />
            More FAQs
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#62101F] text-white rounded-lg px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] hover:bg-[#62101F] transition-colors"
          >
            <MessageCircle size={14} />
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
