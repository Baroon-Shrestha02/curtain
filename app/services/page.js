import HowWeWork from "@/components/ServiceComponents/HowWeWork";
import AboutSection from "@/components/ServiceComponents/ServiceAbout";
import ServicesSection from "@/components/ServiceComponents/ServicesCard";
import ServicesFaq from "@/components/ServiceComponents/ServicesFAQ";
import ServicesHero from "@/components/ServiceComponents/ServicesHero";
import ServicesHero2 from "@/components/ServiceComponents/ServicesHero2";
import ServicesMeasure from "@/components/ServiceComponents/ServicesMeasure";
import ServicesVideo from "@/components/ServiceComponents/ServicesVideo";
import React from "react";

export default function Services() {
  return (
    <div>
      {/* <ServicesHero /> */}
      <ServicesHero2 />
      <AboutSection />

      {/* <ServicesVideo /> */}
      <ServicesSection />
      <HowWeWork />
      <ServicesMeasure />
      <ServicesFaq />
    </div>
  );
}
