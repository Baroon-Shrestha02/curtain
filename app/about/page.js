import React from "react";
import StandoutHero from "./aboutcomponents/hero";
import OurStory from "./aboutcomponents/ourstory";
import OurProcess from "./aboutcomponents/ourprocess";
import MessageFromCEO from "./aboutcomponents/message";
import ClientsSection from "./aboutcomponents/clientssection";

export const metadata = {
  title: "About Us | The Cozy Curtains",
  description:
    "Redefining architectural canvases with premium custom-tailored window couture and luxury drapery since 2014.",
};

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FFFDF9] min-h-screen overflow-x-hidden select-none">
      {/* 1. hero section */}
      <StandoutHero />

      {/* 2. who we are */}
      <OurStory />

      {/*Our process */}
      <OurProcess />

      {/* Message from ceo */}
      <MessageFromCEO />

      {/* client section*/}
      <ClientsSection />
    </main>
  );
}
