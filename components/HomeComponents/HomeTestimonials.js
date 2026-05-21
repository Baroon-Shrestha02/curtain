"use client";

import { motion } from "motion/react";
import { TestimonialsRow } from "../blocks/testimonialRow";

const testimonials = [
  {
    text: "Ordered blackout curtains for our bedroom — measured, stitched, and delivered to Lazimpat in 5 days. Perfect fit, zero hassle.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Priya Shrestha",
    role: "Homeowner, Lazimpat",
  },
  {
    text: "Paid via eSewa, sent my window sizes over Viber, and the curtains arrived beautifully packed. The fabric quality is outstanding.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Rohan Maharjan",
    role: "Apartment Owner, Patan",
  },
  {
    text: "They sent free swatches before I committed. Ended up choosing the ivory sheer — it looks exactly like the sample. Very trustworthy.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Sunita Tamang",
    role: "Interior Decorator, Bhaktapur",
  },
  {
    text: "Furnished my entire flat in Baneshwor with custom curtains. The in-home measurement visit saved me so much time and guesswork.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Anil Thapa",
    role: "Property Developer, Baneshwor",
  },
  {
    text: "Responsive on Viber even on a Saturday evening. Got my zebra blinds fitted within the week. Will definitely order again.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Kabita Gurung",
    role: "Homeowner, Budhanilkantha",
  },
  {
    text: "Cozy Curtains handled our entire office fitout — 14 windows across two floors. Delivered on time and within budget.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Nisha Karki",
    role: "Office Manager, Thamel",
  },
  {
    text: "The Jacquard curtains I ordered are stunning. Guests always ask where I got them. Premium quality at a very fair price.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Bikash Pandey",
    role: "Homeowner, Koteshwor",
  },
  {
    text: "I was skeptical about ordering custom curtains online, but the whole process — from swatches to delivery — was seamless.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Aarati Rijal",
    role: "Homeowner, Kirtipur",
  },
  {
    text: "Best decision for our new house in Pokhara. Ordered remotely, tracked the delivery, and everything fit perfectly first time.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Sagar Oli",
    role: "Homeowner, Pokhara",
  },
];
const firstRow = testimonials.slice(0, 5);
const secondRow = testimonials.slice(4, 9); // slight overlap feels natural

export default function HomeTestimonials() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="relative container mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14"
        >
          <h2
            className="text-4xl md:text-5xl font-light leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#1A0A0D",
              letterSpacing: "-0.01em",
            }}
          >
            Loved by Homes Across{" "}
            <em className="not-italic" style={{ color: "#62101F" }}>
              Nepal.
            </em>
          </h2>
          <p
            className="text-sm md:text-base max-w-md leading-relaxed"
            style={{ color: "#7A5C5C" }}
          >
            From Kathmandu apartments to Pokhara villas — here&apos;s what our
            customers say after living with Cozy Curtains.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="#C9A84C"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: "#62101F" }}>
              4.9
            </span>
            <span className="text-xs" style={{ color: "#9A7070" }}>
              from 200+ happy customers
            </span>
          </div>
        </motion.div>

        {/* Two rows, opposite directions */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <TestimonialsRow testimonials={firstRow} reverse={false} />
          <TestimonialsRow testimonials={secondRow} reverse={true} />
          <TestimonialsRow testimonials={firstRow} reverse={false} />
        </motion.div>
      </div>
    </section>
  );
}
