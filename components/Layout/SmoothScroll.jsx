"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

let lenisInstance = null;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Prevent the browser from restoring a scroll position that Lenis
    // doesn't know about — the desync freezes scroll-reveal animations
    // (framer-motion whileInView) after back/forward navigation.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis();
    lenisInstance = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
