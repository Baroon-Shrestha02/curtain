"use client";

import React from "react";
import {
  ArrowRight,
  History,
  Fingerprint,
  Layers,
  ShieldCheck,
  Zap,
  Compass,
} from "lucide-react";

const Section = ({ className, children, id }) => (
  <section className={`w-full py-24 px-[6vw] ${className}`} id={id}>
    <div className="max-w-[1200px] mx-auto w-full">{children}</div>
  </section>
);

export default function OurStory() {
  return (
    <div className="w-full bg-[#FFFDF9] text-[#1A1B1C]">
      {/* 01. Genesis */}
      <Section className="bg-white border-b border-[#F4F3F0]" id="ourstory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold uppercase text-[#FF2A2A] tracking-[0.2em]">
              01 // The Genesis
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-6 leading-tight">
              The Spark of{" "}
              <span className="font-serif italic text-[#C19D53] block">
                Window Couture
              </span>
            </h2>
            <p className="mt-8 text-base md:text-lg text-[#2C2E30] leading-relaxed">
              In 2014, The Cozy Curtains was founded on a simple, transformative
              belief: that windows deserve more than standard, mass-produced
              coverings. We recognized that while the rest of the interior
              design world was embracing bespoke artistry, the window industry
              remained stagnant and impersonal.
            </p>
            <p className="mt-4 text-base md:text-lg text-[#2C2E30] leading-relaxed">
              We started with a single, small-scale workshop and an obsession
              with quality. By treating every fabric drape as an architectural
              element, we helped redefine the window as a central pillar of home
              design rather than an afterthought.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              <div className="flex gap-3 items-start">
                <History className="text-[#C19D53] w-5 h-5 mt-1" />{" "}
                <div>
                  <h4 className="font-bold text-sm">Established 2014</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    A decade spent mastering the tension, hang, and drape of
                    luxury textiles.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Fingerprint className="text-[#FF2A2A] w-5 h-5 mt-1" />{" "}
                <div>
                  <h4 className="font-bold text-sm">Bespoke DNA</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Every project is custom-patterned to the unique geometry of
                    the architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 h-[450px] bg-[#F4F3F0] rounded-sm overflow-hidden shadow-lg">
            <img
              src="about2.jpeg"
              alt="Artisan workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* 02. The Evolution */}
      <Section className="bg-[#F4F3F0]">
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase text-[#C19D53] tracking-[0.2em]">
            Our Evolution
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mt-3">
            Refining The Art of Drapery
          </h3>
          <p className="mt-6 text-gray-600 max-w-2xl leading-relaxed">
            Over the years, we have transitioned from a local workshop into a
            comprehensive design studio. Our growth is rooted in the constant
            pursuit of perfection—sourcing better materials, adopting quieter
            technologies, and nurturing the hands that craft our products.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Layers />,
              title: "Global Sourcing",
              text: "Direct alliances with heritage looms in Belgium and Italy.",
            },
            {
              icon: <ShieldCheck />,
              title: "In-House Craft",
              text: "Total control over every hem, pleat, and seam.",
            },
            {
              icon: <Zap />,
              title: "Smart Tech",
              text: "Quiet, intuitive motorization for the modern home.",
            },
            {
              icon: <Compass />,
              title: "Architectural Fit",
              text: "Precision measuring for complex glass architectures.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-sm shadow-sm flex flex-col gap-4 border border-gray-200/50"
            >
              <div className="text-[#C19D53]">{item.icon}</div>
              <h4 className="font-bold text-sm uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 03. Future Vision */}
      <Section className="bg-white">
        <div className="max-w-3xl text-center mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Setting The Next Era of{" "}
            <span className="font-serif italic text-[#C19D53] block mt-2">
              Tailored Living
            </span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-[#2C2E30] leading-relaxed">
            Today, The Cozy Curtains serves as an essential partner to top-tier
            design studios and architects. We understand that a window is more
            than an opening; it is the heartbeat of a room’s thermal and
            aesthetic environment. By balancing climate control with visual
            poetry, we create spaces that feel both protected and connected.
          </p>
          <p className="mt-6 text-base md:text-lg text-[#2C2E30] leading-relaxed">
            Looking ahead, we are committed to circular design and sustainable
            innovation. Our future path is clear: to continue crafting the
            essential interface between your home and the world, ensuring every
            installation remains a legacy of elegance and technical mastery.
          </p>
          <a
            href="/gallery"
            className="mt-12 inline-flex items-center gap-3 bg-[#1A1B1C] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#C19D53] transition-all"
          >
            View Our Curated Gallery <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>
    </div>
  );
}
