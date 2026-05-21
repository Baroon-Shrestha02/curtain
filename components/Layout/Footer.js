"use client";

import React from "react";
import { StickyFooter } from "../ui/sticky-footer";
import HomeCTA from "../HomeComponents/HomeCTA";

export default function Footer() {
  return (
    <div className="relative w-full">
      <div className="flex h-screen flex-col items-center justify-center gap-10">
        <HomeCTA />
      </div>

      <StickyFooter />
    </div>
  );
}
