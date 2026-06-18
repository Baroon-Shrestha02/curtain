"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    number: 1,
    question: "What types of curtains do you offer?",
    answer:
      "Cozy Curtains offers a wide range of curtain solutions, including blackout curtains, sheer curtains, day curtains, night curtains, decorative curtains, custom curtains, and premium fabric curtains. We help you choose the right curtain based on your room style, privacy needs, lighting preference, and budget.",
    subtitle: "Curtain types and product options",
  },
  {
    number: 2,
    question: "Do you provide custom-made curtains?",
    answer:
      "Yes, we provide custom-made curtains according to your window size, interior design, fabric choice, and preferred curtain style. Our team takes accurate measurements and prepares curtains that fit your space properly, giving your room a clean and premium finish.",
    subtitle: "Custom curtain design and fitting",
  },
  {
    number: 3,
    question: "Do you offer free in-home measuring?",
    answer:
      "Yes, Cozy Curtains provides in-home measuring service so that your curtains can be prepared with accurate dimensions. Proper measurement is very important for a perfect curtain fit, smooth installation, and a professional final look.",
    subtitle: "Measurement service for accurate fitting",
  },
  {
    number: 4,
    question: "Do you provide curtain installation service?",
    answer:
      "Yes, we provide curtain installation service for homes, offices, hotels, apartments, and commercial spaces. Our installation team ensures that curtain rods, tracks, brackets, and curtains are fitted properly and securely.",
    subtitle: "Professional curtain installation",
  },
  {
    number: 5,
    question: "Can I choose curtain fabrics and colors?",
    answer:
      "Yes, you can choose from different fabrics, textures, colors, and patterns based on your interior theme. We guide you in selecting fabric that matches your wall color, furniture, flooring, room lighting, and overall design concept.",
    subtitle: "Fabric, color, and design selection",
  },
  {
    number: 6,
    question: "What are blackout curtains?",
    answer:
      "Blackout curtains are specially designed curtains that block most outside light and provide better privacy. They are ideal for bedrooms, media rooms, offices, and spaces where you want reduced sunlight, better sleep quality, and improved temperature control.",
    subtitle: "Blackout curtain benefits",
  },
  {
    number: 7,
    question: "What is the difference between sheer and blackout curtains?",
    answer:
      "Sheer curtains are lightweight and allow natural light to enter while maintaining a soft and elegant look. Blackout curtains are thicker and block sunlight for privacy, comfort, and better room control. Many customers use both together for a layered and premium appearance.",
    subtitle: "Sheer vs blackout curtains",
  },
  {
    number: 8,
    question: "Do you provide curtains for offices and commercial spaces?",
    answer:
      "Yes, we provide curtain and window covering solutions for offices, showrooms, hotels, restaurants, apartments, and other commercial spaces. We recommend designs that are professional, durable, easy to maintain, and suitable for daily use.",
    subtitle: "Commercial curtain solutions",
  },
  {
    number: 9,
    question: "How long does it take to prepare and install curtains?",
    answer:
      "The timeline depends on the curtain type, fabric availability, order quantity, and customization requirements. After measurement and fabric confirmation, we provide an estimated completion and installation schedule.",
    subtitle: "Order processing and installation time",
  },
  {
    number: 10,
    question: "Do you offer curtain rods and tracks?",
    answer:
      "Yes, we offer curtain rods, curtain tracks, brackets, and other accessories required for proper installation. Our team can suggest the best hardware option depending on your curtain type, wall structure, and interior style.",
    subtitle: "Curtain rods, tracks, and accessories",
  },
  {
    number: 11,
    question: "Can you help me choose curtains for my room?",
    answer:
      "Yes, our team can help you select the right curtains based on your room size, wall color, furniture style, sunlight direction, privacy needs, and budget. We aim to provide curtains that are both functional and visually appealing.",
    subtitle: "Curtain consultation and guidance",
  },
  {
    number: 12,
    question: "Do you provide curtains for bedrooms and living rooms?",
    answer:
      "Yes, we provide curtains for bedrooms, living rooms, dining rooms, kitchens, study rooms, and other spaces. For bedrooms, blackout curtains are commonly preferred, while living rooms often look better with layered curtains using sheer and decorative fabrics.",
    subtitle: "Room-wise curtain solutions",
  },
  {
    number: 13,
    question: "How do I maintain and clean my curtains?",
    answer:
      "Curtain maintenance depends on the fabric type. Some curtains can be gently vacuumed, while others may require dry cleaning or careful washing. We provide basic care guidance based on the fabric you choose so your curtains stay fresh and long-lasting.",
    subtitle: "Curtain cleaning and maintenance",
  },
  {
    number: 14,
    question: "Do curtains help with heat and sunlight control?",
    answer:
      "Yes, the right curtains can help reduce direct sunlight, control indoor brightness, and improve room comfort. Blackout and thicker fabric curtains are especially useful for reducing heat and glare during sunny hours.",
    subtitle: "Light, heat, and privacy control",
  },
  {
    number: 15,
    question: "Can I order curtains for unusual window sizes?",
    answer:
      "Yes, we can prepare curtains for standard windows, large windows, small windows, sliding doors, balcony doors, and custom window shapes. Our measurement service helps ensure the final product fits properly.",
    subtitle: "Custom sizes and special windows",
  },
  {
    number: 16,
    question: "Do you provide curtain design for new homes?",
    answer:
      "Yes, we provide curtain planning and design support for new homes, apartments, and renovation projects. We can help you select curtain styles for each room so your entire space feels consistent, elegant, and comfortable.",
    subtitle: "Curtain planning for new interiors",
  },
  {
    number: 17,
    question: "Can I get a quotation before ordering?",
    answer:
      "Yes, you can request a quotation before placing your order. The final cost depends on fabric type, curtain size, design, accessories, and installation requirements. After measurement and fabric selection, we can provide a clear price estimate.",
    subtitle: "Quotation and pricing details",
  },
  {
    number: 18,
    question: "Do you provide premium curtain fabrics?",
    answer:
      "Yes, Cozy Curtains provides premium curtain fabric options for customers who want a more luxurious and elegant interior finish. These fabrics are suitable for living rooms, bedrooms, hotels, offices, and modern interior spaces.",
    subtitle: "Premium curtain fabric options",
  },
  {
    number: 19,
    question: "Can curtains improve the overall look of my interior?",
    answer:
      "Yes, curtains play an important role in interior design. The right curtain color, fabric, and style can make a room look warmer, more spacious, more elegant, and more complete. Curtains also add texture and personality to your space.",
    subtitle: "Interior styling with curtains",
  },
  {
    number: 20,
    question: "How can I place an order with Cozy Curtains?",
    answer:
      "You can place an order by contacting us through our website, phone, social media, or by requesting a quotation. Our team will guide you through measurement, fabric selection, pricing, preparation, and installation.",
    subtitle: "Ordering process",
  },
  {
    number: 21,
    question: "Do you provide after-sales support?",
    answer:
      "Yes, we provide support after installation if you need guidance regarding curtain handling, maintenance, or minor adjustments. Our goal is to ensure you are satisfied with the final look and functionality of your curtains.",
    subtitle: "Customer support after installation",
  },

  // ── Decor ──────────────────────────────────────────────────────────────────
  {
    number: 22,
    question: "Do you offer home decor items along with curtains?",
    answer:
      "Yes, alongside curtains we offer complementary decor items such as cushion covers, throw pillows, bed runners, table runners, and decorative drapery accessories. Pairing curtains with matching decor creates a coordinated, finished look across the room.",
    subtitle: "Home decor and curtain pairing",
  },
  {
    number: 23,
    question:
      "Can you match curtains with my existing wall paint and furniture?",
    answer:
      "Yes, we help you pick curtain fabrics, tones, and patterns that complement your existing wall color, flooring, and furniture. We can bring physical fabric swatches to your home so colors are judged in real light, not on a screen.",
    subtitle: "Color matching with interior decor",
  },
  {
    number: 24,
    question: "What curtain styles work best for modern minimalist interiors?",
    answer:
      "For minimalist interiors we suggest plain weaves in muted tones, full-length panels with subtle texture, and ripple-fold or wave headers for clean vertical lines. Avoiding busy prints keeps the focus on the architecture and furniture.",
    subtitle: "Curtains for minimalist style",
  },
  {
    number: 25,
    question: "What curtain styles suit traditional or classic interiors?",
    answer:
      "Traditional interiors pair well with heavier fabrics like jacquard, damask, and velvet, often with pinch-pleat or pencil-pleat headers, tiebacks, and decorative valances. These details add formality and a layered, lived-in elegance.",
    subtitle: "Curtains for classic interiors",
  },
  {
    number: 26,
    question: "Do you offer layered curtain designs (sheer + heavy)?",
    answer:
      "Yes, layered curtains use a sheer inner panel and a heavier outer panel on a double track or rod. This setup gives you soft daytime light and full privacy at night, and is one of the most popular decor upgrades for living rooms and bedrooms.",
    subtitle: "Sheer + blackout layered setups",
  },
  {
    number: 27,
    question: "Can curtains be coordinated with cushions and upholstery?",
    answer:
      "Yes, we can match or contrast curtains with cushion covers, sofa upholstery, and bed linen. Repeating a fabric, tone, or pattern across two or three points in the room creates a balanced, intentional decor scheme.",
    subtitle: "Coordinated soft furnishings",
  },
  {
    number: 28,
    question:
      "Do you suggest curtain decor for festivals or special occasions?",
    answer:
      "Yes, for weddings, Tihar, Dashain, or housewarming events we can prepare temporary decorative drapes, backdrop curtains, and accent fabrics. These can be installed for the occasion and removed or replaced afterwards.",
    subtitle: "Event and festival drapery",
  },
  {
    number: 29,
    question: "Can valances, swags, or pelmets be added to my curtains?",
    answer:
      "Yes, valances, swags, and pelmets are decorative top treatments that hide the rod and add a tailored, premium look. We can design them to match your curtain fabric or use a contrasting accent fabric for visual interest.",
    subtitle: "Decorative top treatments",
  },

  // ── Insect / pest protection ───────────────────────────────────────────────
  {
    number: 30,
    question: "Do curtains attract insects, dust mites, or nests?",
    answer:
      "Curtains themselves do not attract insects, but undisturbed folds and dusty fabric can become a hiding spot for spiders, moths, and dust mites over time. Regular vacuuming and occasional washing or dry cleaning keeps fabrics fresh and pest-free.",
    subtitle: "Curtains and insect activity",
  },
  {
    number: 31,
    question: "How do I prevent insect or spider nests in my curtains?",
    answer:
      "Vacuum curtains lightly every 2–4 weeks using an upholstery attachment, open windows for ventilation, and shake or part the panels regularly. Avoid leaving curtains permanently bunched, as still folds are where webs and egg sacs tend to form.",
    subtitle: "Preventing nests in fabric folds",
  },
  {
    number: 32,
    question: "Do you offer insect-resistant or mosquito-net curtains?",
    answer:
      "Yes, we offer mosquito-net curtain panels and fine-mesh window screens that can be installed alongside regular curtains. They allow airflow while keeping mosquitoes, flies, and small insects out, which is especially useful during monsoon months.",
    subtitle: "Mosquito-net and mesh curtain options",
  },
  {
    number: 33,
    question: "Can curtains be treated to repel insects?",
    answer:
      "Some fabrics can be treated with safe, non-toxic insect-repellent finishes on request. We can also suggest tightly woven fabric weaves that are harder for moths and silverfish to penetrate or lay eggs in.",
    subtitle: "Insect-repellent fabric treatment",
  },
  {
    number: 34,
    question:
      "How should I clean curtains if I find a spider web or insect nest?",
    answer:
      "First, vacuum the affected area gently with a soft brush attachment to remove the web, egg sac, or debris. Then spot-clean or dry-clean the panel based on the fabric's care instructions. For heavy infestations, take the panel down and wash or dry-clean fully before re-hanging.",
    subtitle: "Cleaning webs and nests safely",
  },
  {
    number: 35,
    question: "Are blackout curtains more prone to insect nesting?",
    answer:
      "Blackout curtains have thicker, denser fabric and are usually less prone to insect activity than loosely woven sheers. However, they can collect more dust on the back side, so vacuum both sides occasionally to keep them clean and pest-free.",
    subtitle: "Blackout curtains and pest risk",
  },
  {
    number: 36,
    question: "Do you provide window screens or insect-mesh installation?",
    answer:
      "Yes, we install fixed and sliding insect screens alongside our curtain systems. Screens stop mosquitoes, flies, and larger insects at the window, so your curtains stay cleaner and your room stays comfortable with the windows open.",
    subtitle: "Insect screen installation",
  },
];

export default function Question() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen my-12 px-4 md:px-8">
      <div className="flex flex-col lg:flex-row">
        {/* Title Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white lg:sticky lg:top-0 lg:h-screen mb-8 lg:mb-0">
          <div className="max-w-md p-4 md:p-8 text-center lg:text-left">
            <div className="relative">
              <div className="absolute -top-10 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 opacity-80">
                <img
                  src="/logo.png"
                  alt="Cozy Curtains Logo"
                  className="h-[100px] object-contain"
                />
              </div>

              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Frequently <br className="hidden lg:block" />
                  Asked <br className="hidden lg:block" />
                  Questions
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Everything you need to know about curtains, measurements,
                  installation, and custom designs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={faq.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                  >
                    <div className="flex items-start gap-4 text-left flex-1">
                      <div className="text-[#62101F] font-extrabold text-2xl">
                        {faq.number}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {faq.question}
                        </h3>

                        <p className="text-gray-500 text-sm">{faq.subtitle}</p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4"
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.2, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: "easeIn" },
                            opacity: { duration: 0.1 },
                          },
                        }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="p-6 pl-20 max-sm:pl-6">
                          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
