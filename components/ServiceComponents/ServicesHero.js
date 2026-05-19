"use client";

import React from "react";
import { HeroSection } from "../ui/hero-section-2";

export default function ServicesHero() {
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
        backgroundImage="/services.jpg"
        contactInfo={{
          website: "yourwebsite.com",
          phone: "+977 9881739823",
          address: "Sanepa, Lalipur, Nepal",
        }}
      />
    </div>
  );
}
