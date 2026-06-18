"use client";

import React from "react";

export default function App() {
  const sections = [
    {
      title: "1. Orders & Deposits",
      content:
        "All custom orders require a 50% non-refundable deposit before production begins. The remaining balance is due upon successful installation.",
    },
    {
      title: "2. Measurements & Installation",
      content:
        "While we provide professional measurement services, any site-specific adjustments required due to wall irregularities must be communicated during the initial survey. Installation dates are subject to staff availability and environmental factors.",
    },
    {
      title: "3. Cancellations & Returns",
      content:
        "Once raw materials have been cut or production has commenced, cancellations may incur a material cost penalty. As our products are custom-made, returns are not accepted unless there is a verifiable manufacturing defect.",
    },
    {
      title: "4. Warranty",
      content:
        "We provide a 6-month limited warranty covering hardware functionality and craftsmanship. This warranty does not cover fabric fading due to sun exposure or damage resulting from improper use or cleaning.",
    },
    {
      title: "5. Intellectual Property",
      content:
        "All design concepts, sketches, and specifications provided by The Cozy-Curtains remain our intellectual property and may not be reproduced or shared for commercial use without prior written consent.",
    },
    {
      title: "6. Dispute Resolution",
      content:
        "In the event of any disagreement, we encourage clients to contact our management team first to find an amicable solution. Any unresolved disputes shall be governed by the laws of Nepal and settled within the jurisdiction of the local courts.",
    },
  ];

  return (
    <div className="w-full bg-white py-20 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1
            className="text-4xl font-normal text-stone-900 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Terms & Conditions
          </h1>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-stone-50 border border-stone-200/60 rounded-2xl p-8 hover:border-[#C5A059]/40 transition-colors"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-3">
                {section.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
