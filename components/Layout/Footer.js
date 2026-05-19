"use client";
import React from "react";
import Lenis from "@studio-freight/lenis";
import { ArrowDownIcon } from "lucide-react";
import { StickyFooter } from "../ui/sticky-footer";
import { TestimonialsColumn } from "../blocks/testimonials-columns-1";
import HomeTestimonials from "../HomeComponents/HomeTestimonials";
import HomeCTA from "../HomeComponents/HomeCTA";

export default function Footer() {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex h-screen flex-col items-center justify-center gap-10">
        {/* <HomeTestimonials /> */}
        <HomeCTA />
      </div>

      <StickyFooter />
    </div>
  );
}
