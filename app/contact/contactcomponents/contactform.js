"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Phone,
  Clock,
  Send,
  MapPin,
  Building2,
} from "lucide-react";

const ACCENT = "#E01522";
const WA = "#25D366";
const WA_DARK = "#1EBE5D";
const WHATSAPP_NUMBER = "9779800000000";

export default function ContactForm() {
  const formSectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Let hero buttons (if present) scroll to this form.
  useEffect(() => {
    const scrollToForm = () =>
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    const ids = ["hero-whatsapp-cta", "hero-contact-cta", "hero-email-cta"];
    const btns = ids.map((id) => document.getElementById(id)).filter(Boolean);
    btns.forEach((b) => b.addEventListener("click", scrollToForm));

    const onEvent = () => scrollToForm();
    window.addEventListener("custom-toggle-channel", onEvent);

    return () => {
      btns.forEach((b) => b.removeEventListener("click", scrollToForm));
      window.removeEventListener("custom-toggle-channel", onEvent);
    };
  }, []);

  const isRequired = (field) =>
    field === "name" || field === "address" || field === "message";

  const getBorderColor = (field) => {
    const value = formData[field].trim();
    if (!isSubmitted && !value) return "border-gray-200 focus:border-gray-500";
    if (isRequired(field)) {
      return value
        ? "border-green-500 focus:border-green-600"
        : "border-red-500 focus:border-red-600";
    }
    return value
      ? "border-gray-400 focus:border-gray-600"
      : "border-gray-200 focus:border-gray-500";
  };

  const buildMessage = () =>
    `Hello The Cozy Curtains,
New design & draping inquiry:
- Name: ${formData.name || "—"}
- Site address: ${formData.address || "—"}
- Phone: ${formData.phone || "—"}

Message:
${formData.message || "—"}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      formData.name.trim() === "" ||
      formData.address.trim() === "" ||
      formData.message.trim() === ""
    )
      return;

    const encodedText = encodeURIComponent(buildMessage());
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`,
      "_blank",
    );

    setFormData({ name: "", address: "", phone: "", message: "" });
    setIsSubmitted(false);
  };

  const fieldClass = (field) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-800 focus:outline-none border-b-2 transition-all duration-200 ${getBorderColor(field)}`;

  return (
    <div
      ref={formSectionRef}
      id="contact-form"
      className="w-full bg-white py-16 px-4 font-sans scroll-mt-6 md:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
        {/* ── LEFT: DETAILS & MAP ── */}
        <div className="space-y-6 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
              <div className="space-y-5 md:col-span-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900">
                    The Cozy Curtains
                  </h3>
                  <p
                    className="mt-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: ACCENT }}
                  >
                    Company details
                  </p>
                </div>
                <div
                  className="h-px w-8 rounded-full"
                  style={{ background: ACCENT }}
                />
              </div>
              <div className="flex justify-end md:col-span-4 md:justify-center">
                <div className="group/logo relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2 transition-all duration-300 hover:border-[#E01522]/40 md:h-24 md:w-24">
                  <img
                    src="/logo.png"
                    alt="The Cozy Curtains logo"
                    className="h-full w-full rounded-lg object-contain grayscale transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:grayscale-0"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <p className="mt-0.5 text-sm font-medium text-gray-700 transition-colors duration-300 group-hover/item:text-gray-950">
                      Sanepa, Ward-2, Lalitpur, Nepal
                    </p>
                  ),
                },
                {
                  icon: Phone,
                  label: "Call us",
                  content: (
                    <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-gray-700">
                      <a
                        href="tel:+97715500000"
                        className="transition-colors hover:underline"
                        style={{ color: "inherit" }}
                      >
                        +977 1-5500000
                      </a>
                      <span className="text-gray-300">/</span>
                      <a
                        href="tel:+9779800000000"
                        className="transition-colors hover:underline"
                        style={{ color: "inherit" }}
                      >
                        +977 9800000000
                      </a>
                    </div>
                  ),
                },
                {
                  icon: Clock,
                  label: "Office hours",
                  content: (
                    <p className="mt-0.5 text-sm font-medium text-gray-700 transition-colors duration-300 group-hover/item:text-gray-950">
                      Sun – Fri: 9:00 AM – 6:00 PM NPT
                    </p>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div
                  key={label}
                  className="group/item flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gray-200 hover:bg-white"
                >
                  <div
                    className="mt-0.5 rounded-lg border border-gray-200/60 p-2 transition-colors duration-300"
                    style={{ color: ACCENT }}
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-300 group-hover/item:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {label}
                    </p>
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="group relative h-[280px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <iframe
              title="The Cozy Curtains location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.224232203648!2d85.29920837529966!3d27.679463676198623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000b9b0c7b%3A0xf062d9f1da8c3790!2sJavtech%20Infosys!5e0!3m2!1sen!2snp!4v1779166609165!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="opacity-90 grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
        </div>

        {/* ── RIGHT: WHATSAPP FORM ── */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:col-span-7 md:p-8 lg:col-span-7">
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
              style={{ background: WA }}
            >
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                Message us on WhatsApp
              </h3>
              <p className="text-xs text-gray-500">
                Tell us about your space and we&apos;ll open WhatsApp with your
                inquiry ready to send.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Full name *
                </label>
                <input
                  type="text"
                  placeholder="Mahesh Basnet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={fieldClass("name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Site address *
                </label>
                <input
                  type="text"
                  placeholder="Gundu, Bhaktapur, Nepal"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={fieldClass("address")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Phone (optional)
              </label>
              <input
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={fieldClass("phone")}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Message *
              </label>
              <textarea
                rows={4}
                placeholder="Share your custom draping requirements — windows, rooms, fabric preferences, and any design ideas."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`${fieldClass("message")} resize-none`}
              />
            </div>

            {/* Live preview bubble */}
            <div className="rounded-xl border border-gray-200 bg-white p-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Preview — this is what we&apos;ll receive
              </p>
              <div
                className="max-w-[90%] rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] leading-relaxed text-gray-800"
                style={{ background: "#DCF8C6" }}
              >
                <pre className="whitespace-pre-wrap font-sans">
                  {buildMessage()}
                </pre>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-300 active:scale-[0.99]"
              style={{ background: WA }}
              onMouseEnter={(e) => (e.currentTarget.style.background = WA_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = WA)}
            >
              <Send size={13} />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
