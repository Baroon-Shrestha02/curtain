"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "@/components/services/SettingsApi";

const DEFAULTS = {
  phones: ["9851349844", "9822915510"],
  whatsapp: "9851349844",
  email: "",
  address: "",
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    twitter: "",
    linkedin: "",
  },
};

const SiteSettingsContext = createContext(DEFAULTS);

const COUNTRY_CODE = "977";

// Strip non-digits, drop leading "977" duplicates, return display + e164.
const normalizePhone = (raw) => {
  if (!raw) return "";
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith(COUNTRY_CODE)) return digits;
  return `${COUNTRY_CODE}${digits}`;
};

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    getSettings()
      .then((data) => {
        if (cancelled || !data) return;
        setSettings({
          phones: data.phones?.length ? data.phones : DEFAULTS.phones,
          whatsapp: data.whatsapp || DEFAULTS.whatsapp,
          email: data.email || DEFAULTS.email,
          address: data.address || DEFAULTS.address,
          socials: { ...DEFAULTS.socials, ...(data.socials || {}) },
        });
      })
      .catch(() => {
        /* keep defaults */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

// Helper: e164-formatted WhatsApp number (no +, ready for wa.me / api.whatsapp.com)
export function useWhatsappNumber() {
  const { whatsapp } = useSiteSettings();
  return normalizePhone(whatsapp);
}

export { normalizePhone };
