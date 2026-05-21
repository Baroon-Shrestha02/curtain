"use client";

import React from "react";
import { motion } from "framer-motion";
import Contacthero from "./contactcomponents/contacthero";
import ContactForm from "./contactcomponents/contactform";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Dynamic Route Entry Transition System */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Contact Hero Section */}
        <Contacthero />
        {/* contact form section*/}
        <ContactForm />
      </motion.div>
    </main>
  );
}
