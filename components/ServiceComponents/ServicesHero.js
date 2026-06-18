"use client";

import React from "react";
import { HeroSection } from "../ui/hero-section-2";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

export default function ServicesHero() {
  const { phones, address } = useSiteSettings();
  const phoneLabel = phones.map((p) => `+977 ${p}`).join(", ");

  return (
    <div className="w-full">
      <HeroSection
        slogan="ELEVATE YOUR PERSPECTIVE"
        title={
          <>
            We&apos;re here to <br />
            <span className="text-primary">Design your home</span>
          </>
        }
        subtitle="Discover breathtaking landscapes and challenge yourself with our guided mountain expeditions. Join a community of adventurers."
        callToAction={{
          text: "JOIN US TO EXPLORE",
          href: "/contact",
        }}
        backgroundImage="/about2.jpeg"
        contactInfo={{
          website: "yourwebsite.com",
          phone: phoneLabel,
          address: address || "Sanepa, Lalipur, Nepal",
        }}
      />
    </div>
  );
}
