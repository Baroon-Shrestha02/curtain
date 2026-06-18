"use client";

import React, { useState, useRef } from "react";
import { MessageCircle, Phone, Clock, Send, MapPin } from "lucide-react";
import {
  useSiteSettings,
  useWhatsappNumber,
} from "@/lib/SiteSettingsContext";

export default function ContactForm() {
  const { phones, email, address } = useSiteSettings();
  const whatsappNumber = useWhatsappNumber();
  const formSectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getBorderColor = (fieldName) => {
    const value = formData[fieldName].trim();
    if (!isSubmitted && !value)
      return "border-stone-200 focus:border-stone-500";
    return value
      ? "border-emerald-500 bg-emerald-50/10 focus:border-emerald-600"
      : "border-rose-500 bg-rose-50/10 focus:border-rose-600";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      return;
    }

    const templateText = `Hello The Cozy-Curtains,
New Design & Draping Inquiry:
- Client Name: ${formData.name}
- Site Address: ${formData.address}
- Phone/WhatsApp: ${formData.phone}

Message: ${formData.message}`;

    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(templateText)}`,
      "_blank",
    );

    setFormData({ name: "", address: "", phone: "", message: "" });
    setIsSubmitted(false);
  };

  return (
    <div
      ref={formSectionRef}
      id="contact-form"
      className="w-full bg-white py-16 px-4 md:px-8 font-sans scroll-mt-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT CONTAINER: DETAILS & MAP */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-6 md:p-8 space-y-5">
            <h3
              className="text-xl font-normal text-stone-900 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Cozy-Curtains
            </h3>
            <div className="space-y-3 pt-2">
              {address && (
                <div className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs hover:border-stone-200 transition-all">
                  <MapPin size={15} className="text-stone-500 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                      Address
                    </p>
                    <p className="text-sm font-medium text-stone-700">
                      {address}
                    </p>
                  </div>
                </div>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs hover:border-stone-200 transition-all"
                >
                  <MessageCircle size={15} className="text-stone-500 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-stone-700 break-all">
                      {email}
                    </p>
                  </div>
                </a>
              )}
              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs hover:border-stone-200 transition-all">
                <Phone size={15} className="text-stone-500 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                    Call Support
                  </p>
                  <p className="text-sm font-medium text-stone-700 flex flex-col gap-3">
                    {phones.map((p) => (
                      <span key={p}>+977 {p}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* UPDATED MAP: Smaller height and full color */}
          <div className="w-full h-[200px] rounded-2xl overflow-hidden border border-stone-200/60 shadow-3xs relative bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.224232203648!2d85.29920837529966!3d27.679463676198623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000b9b0c7b%3A0xf062d9f1da8c3790!2sJavtech%20Infosys!5e0!3m2!1sen!2snp!4v1779166609165!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* RIGHT CONTAINER: FORM */}
        <div className="lg:col-span-7 bg-stone-50 border border-stone-200/60 rounded-2xl p-6 md:p-8 shadow-3xs">
          <div className="flex items-center justify-center gap-2 mb-8 bg-emerald-600/10 py-3 rounded-xl text-emerald-700">
            <MessageCircle size={18} />{" "}
            <span className="text-[11px] font-bold tracking-widest uppercase">
              Start a WhatsApp Conversation
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mahesh Basnet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm border-b-2 ${getBorderColor("name")}`}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gundu , Bhaktapur"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm border-b-2 ${getBorderColor("address")}`}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 9800000000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm border-b-2 ${getBorderColor("phone")}`}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                Requirement / Message
              </label>
              <textarea
                rows={4}
                placeholder="e.g. I need custom velvet curtains for my living room..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm border-b-2 resize-none ${getBorderColor("message")}`}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-all"
            >
              <Send size={12} /> Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
