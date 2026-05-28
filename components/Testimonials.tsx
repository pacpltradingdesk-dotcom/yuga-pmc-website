// components/Testimonials.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/company-data";

function TestimonialCard({
  t,
  delay,
}: {
  t: (typeof TESTIMONIALS)[number];
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-strong rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-gold/15 transition-colors duration-300"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="text-gold fill-gold" />
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="pt-4 border-t border-border">
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <p className="text-text-muted text-xs">
          {t.company} &middot; {t.location}
        </p>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            What Our Clients Say
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-xl mx-auto">
            From new investors to existing operators. Real outcomes across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
