"use client";

import React, { useEffect, useRef } from "react";

export const TestimonialsRow = ({
  testimonials,
  duration,
  className = "",
  reverse = false,
}) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardW = 280 + 16;
    const totalW = cardW * testimonials.length;
    const speed = reverse ? 0.5 : -0.5;

    if (reverse) xRef.current = -totalW;

    const animate = () => {
      xRef.current += speed;
      if (!reverse && xRef.current <= -totalW) xRef.current = 0;
      if (reverse && xRef.current >= 0) xRef.current = -totalW;
      track.style.transform = `translateX(${xRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animRef.current);
    const resume = () => {
      animRef.current = requestAnimationFrame(animate);
    };

    const container = track.parentElement;
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, [testimonials, reverse]);

  const cards = [...testimonials, ...testimonials];

  return (
    <div className={className} style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{ display: "flex", gap: "16px", width: "max-content" }}
      >
        {cards.map(({ text, image, name, role }, index) => (
          <div
            key={index}
            style={{
              minWidth: "280px",
              maxWidth: "280px",
              borderRadius: "16px",
              padding: "20px",
              flexShrink: 0,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(98,16,31,0.09)",
              boxShadow:
                "0 4px 24px rgba(98,16,31,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="#C9A84C"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div
              style={{
                fontSize: "22px",
                lineHeight: 1,
                marginBottom: "6px",
                fontFamily: "serif",
                color: "rgba(98,16,31,0.15)",
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                margin: "0 0 16px",
                color: "#4A3030",
              }}
            >
              {text}
            </p>
            <div
              style={{
                height: "1px",
                background: "rgba(98,16,31,0.07)",
                marginBottom: "14px",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={image}
                alt={name}
                width={36}
                height={36}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(98,16,31,0.12)",
                  width: 36,
                  height: 36,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#1A0A0D",
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#9A7070",
                    marginTop: "2px",
                  }}
                >
                  {role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
