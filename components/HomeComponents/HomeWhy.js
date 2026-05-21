"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: "✦",
    label: "Custom Made",
    twopages: { value: true },
    dept: { value: false },
    specialty: { value: true },
  },
  {
    icon: "⏱",
    label: "Time to Order",
    twopages: { value: "10 min" },
    dept: { value: "Half day" },
    specialty: { value: "Half day" },
  },
  {
    icon: "🚚",
    label: "Delivery (KTM Valley)",
    twopages: { value: "3–7 days" },
    dept: { value: "Same day" },
    specialty: { value: "7–14 days" },
  },
  {
    icon: "₨",
    label: "Price Range",
    twopages: { value: "₨₨" },
    dept: { value: "₨₨₨" },
    specialty: { value: "₨₨₨₨" },
  },
  {
    icon: "🎨",
    label: "Fabric Swatches",
    twopages: { value: true },
    dept: { value: false },
    specialty: { value: true },
  },
  {
    icon: "🕐",
    label: "Service Hours",
    twopages: { value: "7 × 24h" },
    dept: { value: "Sun–Fri 10–8" },
    specialty: { value: "Sun–Fri 10–7" },
  },
  {
    icon: "📦",
    label: "Variety / SKUs",
    twopages: { value: "500+ designs" },
    dept: { value: "50–80 designs" },
    specialty: { value: "100–200 designs" },
  },
  {
    icon: "🏭",
    label: "Manufacturing",
    twopages: { value: "Fully In-House" },
    dept: { value: "Imported Goods" },
    specialty: { value: "Local Mill Partners" },
  },
  {
    icon: "📏",
    label: "Measurement Support",
    twopages: { value: "Viber & In-Home" },
    dept: { value: false },
    specialty: { value: "Store Visit Only" },
  },
  {
    icon: "🛋",
    label: "Design Consult",
    twopages: { value: "7 × 24h" },
    dept: { value: false },
    specialty: { value: "By Appointment" },
  },
];

export default function HomeWhy() {
  const sectionRef = useRef(null);
  const tableRef = useRef(null);
  const rowsRef = useRef([]);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.055,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tableRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:px-12 lg:px-24"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#1A0A0D",
              letterSpacing: "-0.02em",
            }}
          >
            See How We Stand Out.
          </h2>

          <p
            ref={subRef}
            className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "#7A5C5C" }}
          >
            Compared to Kathmandu department stores and specialty curtain shops
            — here&apos;s the honest picture.
          </p>
        </div>

        {/* Table */}
        <div
          ref={tableRef}
          className="overflow-x-auto rounded-3xl"
          style={{
            border: "1px solid rgba(98,16,31,0.12)",
            boxShadow:
              "0 20px 60px rgba(98,16,31,0.08), 0 4px 16px rgba(98,16,31,0.05)",
          }}
        >
          <table className="w-full min-w-[660px] border-collapse text-sm">
            <thead>
              <tr>
                <th
                  className="text-left px-6 py-6 w-52"
                  style={{ background: "#FDF8F3" }}
                ></th>

                {/* Hero column */}
                <th
                  className="px-6 py-6 text-center relative"
                  style={{ background: "#62101F" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
                    }}
                  />
                  <span
                    className="block text-white font-bold text-base tracking-wide relative z-10"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Cozy Curtains
                  </span>
                  <span
                    className="block text-xs mt-1 tracking-[0.18em] uppercase relative z-10"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Our Promise
                  </span>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] rounded-t-full"
                    style={{ background: "rgba(255,255,255,0.35)" }}
                  />
                </th>

                <th
                  className="px-6 py-6 text-center"
                  style={{ background: "#FDF8F3" }}
                >
                  <span
                    className="text-xs tracking-[0.12em] uppercase font-medium"
                    style={{ color: "#9A7070" }}
                  >
                    Dept. Stores
                  </span>
                  <span
                    className="block text-[10px] mt-0.5"
                    style={{ color: "#B89090" }}
                  >
                    Bhat-Bhateni / CG
                  </span>
                </th>

                <th
                  className="px-6 py-6 text-center"
                  style={{ background: "#FDF8F3" }}
                >
                  <span
                    className="text-xs tracking-[0.12em] uppercase font-medium"
                    style={{ color: "#9A7070" }}
                  >
                    Specialty Shops
                  </span>
                  <span
                    className="block text-[10px] mt-0.5"
                    style={{ color: "#B89090" }}
                  >
                    New Road / Pulchowk
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {features.map((row, i) => {
                const isOdd = i % 2 === 0;
                return (
                  <tr
                    key={i}
                    ref={(el) => (rowsRef.current[i] = el)}
                    style={{
                      borderTop: "1px solid rgba(98,16,31,0.07)",
                      background: isOdd
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(253,248,243,0.8)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(98,16,31,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isOdd
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(253,248,243,0.8)";
                    }}
                  >
                    {/* Label */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-medium"
                          style={{ color: "#1A0A0D" }}
                        >
                          {row.label}
                        </span>
                      </div>
                    </td>

                    {/* Cozy Curtains */}
                    <td
                      className="px-6 py-4 text-center"
                      style={{ background: "rgba(98,16,31,0.03)" }}
                    >
                      {typeof row.twopages.value === "boolean" ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold"
                          style={
                            row.twopages.value
                              ? {
                                  background: "#62101F",
                                  color: "white",
                                  boxShadow: "0 2px 8px rgba(98,16,31,0.3)",
                                }
                              : { background: "#F0E6E6", color: "#C09090" }
                          }
                        >
                          {row.twopages.value ? "✓" : "✗"}
                        </span>
                      ) : (
                        <span
                          className="font-semibold"
                          style={{ color: "#62101F" }}
                        >
                          {row.twopages.value}
                        </span>
                      )}
                    </td>

                    {/* Dept Store */}
                    <td
                      className="px-6 py-4 text-center"
                      style={{ color: "#9A7070" }}
                    >
                      {typeof row.dept.value === "boolean" ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
                          style={
                            row.dept.value
                              ? { background: "#E8D8D8", color: "#7A4848" }
                              : { color: "#C4A4A4", fontSize: "18px" }
                          }
                        >
                          {row.dept.value ? "✓" : "✗"}
                        </span>
                      ) : (
                        <span className="text-sm">{row.dept.value}</span>
                      )}
                    </td>

                    {/* Specialty */}
                    <td
                      className="px-6 py-4 text-center"
                      style={{ color: "#9A7070" }}
                    >
                      {typeof row.specialty.value === "boolean" ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
                          style={
                            row.specialty.value
                              ? { background: "#E8D8D8", color: "#7A4848" }
                              : { color: "#C4A4A4", fontSize: "18px" }
                          }
                        >
                          {row.specialty.value ? "✓" : "✗"}
                        </span>
                      ) : (
                        <span className="text-sm">{row.specialty.value}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="/products"
            className="group inline-flex items-center gap-3 text-white text-sm font-semibold tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #7A1525 0%, #62101F 50%, #4A0C18 100%)",
              boxShadow: "0 8px 32px rgba(98,16,31,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 16px 48px rgba(98,16,31,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(98,16,31,0.35)";
            }}
          >
            Shop All Curtains
            <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
