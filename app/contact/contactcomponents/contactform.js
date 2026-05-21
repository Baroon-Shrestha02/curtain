"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, MessageCircle, Phone, Clock, Send, MapPin } from "lucide-react";

export default function ContactForm() {
  const [channel, setChannel] = useState("email");
  const formSectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleHeroClick = (targetChannel) => {
      setChannel(targetChannel);
      setIsSubmitted(false);
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    };

    const emailBtn = document.getElementById("hero-email-cta");
    const waBtn = document.getElementById("hero-whatsapp-cta");

    const onEmailClick = () => handleHeroClick("email");
    const onWaClick = () => handleHeroClick("whatsapp");

    if (emailBtn) emailBtn.addEventListener("click", onEmailClick);
    if (waBtn) waBtn.addEventListener("click", onWaClick);

    const handleChannelSwitch = (e) => {
      if (
        e.detail &&
        (e.detail.channel === "email" || e.detail.channel === "whatsapp")
      ) {
        handleHeroClick(e.detail.channel);
      }
    };
    window.addEventListener("custom-toggle-channel", handleChannelSwitch);

    return () => {
      if (emailBtn) emailBtn.removeEventListener("click", onEmailClick);
      if (waBtn) waBtn.removeEventListener("click", onWaClick);
      window.removeEventListener("custom-toggle-channel", handleChannelSwitch);
    };
  }, []);

  const isFieldRequired = (fieldName) => {
    if (
      fieldName === "name" ||
      fieldName === "address" ||
      fieldName === "message"
    )
      return true;
    if (channel === "email" && fieldName === "email") return true;
    if (channel === "whatsapp" && fieldName === "phone") return true;
    return false;
  };

  const getBorderColor = (fieldName) => {
    const value = formData[fieldName].trim();
    const required = isFieldRequired(fieldName);

    if (!isSubmitted && !value)
      return "border-stone-200 focus:border-stone-500";

    if (required) {
      return value
        ? "border-emerald-500 bg-emerald-50/10 focus:border-emerald-600"
        : "border-rose-500 bg-rose-50/10 focus:border-rose-600";
    } else {
      return value
        ? "border-amber-400 bg-amber-50/10 focus:border-amber-500"
        : "border-stone-200 focus:border-stone-500";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isNameValid = formData.name.trim() !== "";
    const isAddressValid = formData.address.trim() !== "";
    const isMessageValid = formData.message.trim() !== "";
    const isEmailValid =
      channel === "email" ? formData.email.trim() !== "" : true;
    const isPhoneValid =
      channel === "whatsapp" ? formData.phone.trim() !== "" : true;

    if (
      !isNameValid ||
      !isAddressValid ||
      !isMessageValid ||
      !isEmailValid ||
      !isPhoneValid
    ) {
      return;
    }

    const templateText = `Hello The Cozy-Curtains,
New Design & Draping Inquiry:
- Client Name: ${formData.name}
- Site Address: ${formData.address}
- Email: ${formData.email || "Not Provided"}
- Phone/WhatsApp: ${formData.phone || "Not Provided"}

Message parameters provided:
${formData.message}`;

    if (channel === "email") {
      const recipientEmail = "info@cozycurtains.com.np";
      const subject = encodeURIComponent(
        `New Curtains Inquiry - ${formData.name}`,
      );
      const body = encodeURIComponent(templateText);
      window.open(
        `mailto:${recipientEmail}?subject=${subject}&body=${body}`,
        "_blank",
      );
    } else {
      const whatsappNumber = "9779800000000";
      const encodedText = encodeURIComponent(templateText);
      window.open(
        `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`,
        "_blank",
      );
    }

    setFormData({ name: "", address: "", email: "", phone: "", message: "" });
    setIsSubmitted(false);
  };

  return (
    <div
      ref={formSectionRef}
      id="contact-form"
      className="w-full bg-white py-16 px-4 md:px-8 font-sans scroll-mt-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── LEFT CONTAINER: DETAILS & MAP (5 COLS) ── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-6 md:p-8 space-y-5 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-5">
                <div>
                  <h3
                    className="text-xl font-normal text-stone-900 tracking-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    The Cozy-Curtains
                  </h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">
                    Company Details
                  </p>
                </div>
                <div className="w-8 h-px bg-stone-300 rounded-full" />
              </div>
              <div className="md:col-span-4 flex justify-end md:justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-stone-200/80 bg-white shadow-3xs p-2 flex items-center justify-center overflow-hidden group/logo relative transition-all duration-300 hover:border-amber-300">
                  <img
                    src="./logo.png"
                    alt="The Cozy-Curtains Logo"
                    className="w-full h-full object-contain rounded-lg grayscale group-hover/logo:grayscale-0 transition-all duration-500 group-hover/logo:scale-105"
                  />

                  <div className="absolute inset-0 bg-stone-950/5 group-hover/logo:bg-transparent transition-colors duration-300" />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs md:bg-transparent md:shadow-none hover:border-stone-200 hover:bg-white hover:shadow-3xs transition-all duration-350 ease-out transform hover:-translate-y-1 group/item">
                <div className="p-2 bg-white rounded-lg border border-stone-200/60 text-stone-500 mt-0.5 group-hover/item:text-stone-900 group-hover/item:border-stone-400 transition-colors duration-300">
                  <MapPin
                    size={15}
                    className="group-hover/item:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                    Address
                  </p>
                  <p className="text-sm font-medium text-stone-700 mt-0.5 transition-colors duration-300 group-hover/item:text-stone-950">
                    Sanepa, Ward-2, Lalitpur, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs md:bg-transparent md:shadow-none hover:border-stone-200 hover:bg-white hover:shadow-3xs transition-all duration-350 ease-out transform hover:-translate-y-1 group/item">
                <div className="p-2 bg-white rounded-lg border border-stone-200/60 text-stone-500 mt-0.5 group-hover/item:text-emerald-600 group-hover/item:border-emerald-300 transition-colors duration-300">
                  <Phone
                    size={15}
                    className="group-hover/item:rotate-12 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                    Call Support
                  </p>
                  <div className="text-sm font-medium text-stone-700 mt-0.5 flex flex-wrap gap-x-2 gap-y-1 transition-colors duration-300 group-hover/item:text-stone-950">
                    <a
                      href="tel:+97715500000"
                      className="hover:text-emerald-600 hover:underline"
                    >
                      +977 1-5500000
                    </a>
                    <span className="text-stone-300">/</span>
                    <a
                      href="tel:+9779800000000"
                      className="hover:text-emerald-600 hover:underline"
                    >
                      +977 9800000000
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-transparent bg-white shadow-3xs md:bg-transparent md:shadow-none hover:border-stone-200 hover:bg-white hover:shadow-3xs transition-all duration-350 ease-out transform hover:-translate-y-1 group/item">
                <div className="p-2 bg-white rounded-lg border border-stone-200/60 text-stone-500 mt-0.5 group-hover/item:text-amber-600 group-hover/item:border-amber-300 transition-colors duration-300">
                  <Clock
                    size={15}
                    className="group-hover/item:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                    Office Hours
                  </p>
                  <p className="text-sm font-medium text-stone-700 mt-0.5 transition-colors duration-300 group-hover/item:text-stone-950">
                    Sun - Fri: 9:00 AM - 6:00 PM NPT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[280px] rounded-2xl overflow-hidden border border-stone-200/60 shadow-3xs group relative bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.224232203648!2d85.29920837529966!3d27.679463676198623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000b9b0c7b%3A0xf062d9f1da8c3790!2sJavtech%20Infosys!5e0!3m2!1sen!2snp!4v1779166609165!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* ── RIGHT CONTAINER: FORM PANEL (7 COLS) ── */}
        <div className="lg:col-span-7 bg-stone-50 border border-stone-200/60 rounded-2xl p-6 md:p-8 shadow-3xs">
          <div className="flex bg-stone-200/50 p-1 rounded-xl mb-8 max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => {
                setChannel("email");
                setIsSubmitted(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all duration-300 ${
                channel === "email"
                  ? "bg-white text-stone-900 shadow-3xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <Mail size={13} /> Email Mode
            </button>
            <button
              type="button"
              onClick={() => {
                setChannel("whatsapp");
                setIsSubmitted(false);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold tracking-wider uppercase rounded-lg transition-all duration-300 ${
                channel === "whatsapp"
                  ? "bg-emerald-600 text-white shadow-3xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <MessageCircle size={14} />
              WhatsApp Mode
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Mahesh Basnet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-800 focus:outline-none border-b-2 transition-all duration-200 ${getBorderColor("name")}`}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                  Address *
                </label>
                <input
                  type="text"
                  placeholder="Gundu,Bhaktapur, Nepal"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-800 focus:outline-none border-b-2 transition-all duration-200 ${getBorderColor("address")}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                  Email {channel === "email" ? "*" : "(Optional)"}
                </label>
                <input
                  type="email"
                  placeholder="mahesh@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-800 focus:outline-none border-b-2 transition-all duration-200 ${getBorderColor("email")}`}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                  Phone {channel === "whatsapp" ? "*" : "(Optional)"}
                </label>
                <input
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-800 focus:outline-none border-b-2 transition-all duration-200 ${getBorderColor("phone")}`}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                Message *
              </label>
              <textarea
                rows={4}
                placeholder="Share your custom draping requirements or design specifications here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-800 focus:outline-none border-b-2 resize-none transition-all duration-200 ${getBorderColor("message")}`}
              />
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase text-white shadow-sm transition-all duration-300 transform active:scale-[0.99] ${
                channel === "whatsapp"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10"
                  : "bg-stone-900 hover:bg-stone-950 shadow-stone-900/10"
              }`}
            >
              <Send size={12} />
              Chat via {channel === "email" ? "Email" : "WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
