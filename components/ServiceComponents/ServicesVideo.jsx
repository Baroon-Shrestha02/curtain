import React from "react";

export default function ServicesVideo() {
  return (
    <section className="container mx-auto">
      <div className="h-[60vh] overflow-hidden rounded-2xl">
        <video
          src="/services.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
