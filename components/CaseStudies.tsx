// components/CaseStudies.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Factory, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/company-data";

export default function CaseStudies() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
            Projects That{" "}
            <span className="text-gradient">Shaped India&apos;s Roads</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-lg">
            Real plants, real roads, real results.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll-snap strip */}
      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CASE_STUDIES.map((cs, i) => (
          <motion.div
            key={cs.id}
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="snap-center flex-shrink-0 w-[85vw] md:w-[44vw] lg:w-[30vw] group bg-charcoal-2 border border-border rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={cs.image}
                alt={cs.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 44vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-2 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold-dim border border-gold-border rounded-full px-3 py-1">
                  {cs.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">
                {cs.title}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-text-muted text-xs">
                  <MapPin size={11} className="text-green" />
                  {cs.location}
                </span>
                <span className="flex items-center gap-1.5 text-text-muted text-xs">
                  <Factory size={11} className="text-gold" />
                  {cs.capacity}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {cs.outcome}
              </p>
            </div>
          </motion.div>
        ))}

        {/* CTA end-card */}
        <div className="snap-center flex-shrink-0 w-[85vw] md:w-[44vw] lg:w-[30vw] flex items-center justify-center glass rounded-2xl border border-border min-h-[360px]">
          <div className="text-center px-8">
            <p className="font-display font-bold text-white text-xl mb-2">
              Your Plant Next?
            </p>
            <p className="text-text-secondary text-sm mb-6">
              Join 10+ operators across 17 states.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold text-black font-bold px-6 py-3 rounded-full text-sm hover:bg-amber-400 transition-colors"
            >
              Book Free Consultation
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <p className="text-center text-text-muted text-xs mt-4 px-6 md:hidden">
        Swipe to see more projects
      </p>
    </section>
  );
}
