"use client";

import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {props.testimonials.map(({ text, image, name, role }, index) => (
              <div
                key={`${sectionIndex}-${index}`}
                className="max-w-[280px] w-full rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(98,16,31,0.09)",
                  boxShadow:
                    "0 4px 24px rgba(98,16,31,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="#C9A84C"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <div
                  className="text-2xl leading-none mb-2 font-serif"
                  style={{ color: "rgba(98,16,31,0.15)" }}
                >
                  "
                </div>

                {/* Text */}
                <p
                  className="text-[13px] leading-relaxed mb-5"
                  style={{ color: "#4A3030" }}
                >
                  {text}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{ background: "rgba(98,16,31,0.07)" }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover"
                    style={{ border: "2px solid rgba(98,16,31,0.12)" }}
                  />
                  <div>
                    <div
                      className="text-[12px] font-semibold leading-tight"
                      style={{ color: "#1A0A0D" }}
                    >
                      {name}
                    </div>
                    <div
                      className="text-[11px] leading-tight mt-0.5"
                      style={{ color: "#9A7070" }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
