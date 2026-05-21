"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  // 1) Stop the browser from restoring the old scroll position on back/forward.
  //    This is the actual fix for the "blank mid-page" issue — the browser was
  //    landing you partway down where whileInView sections had already passed.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // 2) Scroll to top on every route change (including back/forward navigation).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
