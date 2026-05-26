// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/company-data";

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div className="glass rounded-2xl p-6 w-80 flex-shrink-0 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="text-gold fill-gold" />
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <p className="text-text-muted text-xs">{t.company} · {t.location}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 6);

  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4">
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="flex gap-6 mb-6">
        <div className="flex gap-6 animate-marquee">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="flex gap-6">
        <div className="flex gap-6 animate-marquee-reverse">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
