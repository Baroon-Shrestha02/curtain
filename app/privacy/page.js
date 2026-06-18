"use client";

import React from "react";

export default function App() {
  const sections = [
    {
      title: "1. Information Collection",
      content:
        "We collect personal information that you provide to us directly, such as your name, address, phone number, and project requirements when you fill out our contact or inquiry forms.",
    },
    {
      title: "2. Usage of Information",
      content:
        "The information we collect is used solely to respond to your inquiries, provide accurate project quotations, schedule home visits, and improve our customer service experience.",
    },
    {
      title: "3. Data Security",
      content:
        "We are committed to ensuring that your information is secure. We implement appropriate physical and electronic procedures to safeguard and protect the information we collect online.",
    },
    {
      title: "4. Sharing of Information",
      content:
        "We do not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so.",
    },
    {
      title: "5. Cookies",
      content:
        "Our website may use cookies to improve your browsing experience. You can choose to accept or decline cookies through your browser settings, though this may prevent you from taking full advantage of the website.",
    },
    {
      title: "6. Contacting Us",
      content:
        "If you have any questions about how we handle your personal data, please contact our team via the information provided on our contact page.",
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
            Privacy Policy
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
