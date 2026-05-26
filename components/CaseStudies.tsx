// components/CaseStudies.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Factory } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { CASE_STUDIES } from "@/lib/company-data";

export default function CaseStudies() {
  return (
    <section id="projects" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">
            Case Studies
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Projects That{" "}
            <span className="text-gradient">Shaped India&apos;s Roads</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real plants, real roads, real results. Here&apos;s what we&apos;ve built.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.div
              key={cs.id}
              variants={fadeUp}
              className="group bg-charcoal-2 border border-border rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
        </motion.div>
      </div>
    </section>
  );
}
