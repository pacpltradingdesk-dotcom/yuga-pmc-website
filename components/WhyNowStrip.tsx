// components/WhyNowStrip.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations/variants";
import { WHY_NOW } from "@/lib/company-data";

export default function WhyNowStrip() {
  return (
    <section className="py-32 px-6 bg-charcoal relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">
            Market Timing
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Why Act <span className="text-gradient">Now?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            A once-in-a-generation policy window has opened. The companies that move in 2026 will
            dominate this market for the next decade.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {WHY_NOW.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i}
              className="glass rounded-2xl p-6 flex flex-col gap-4 border border-border hover:border-gold/20 transition-all duration-300 group card-gradient-border"
            >
              <span className="font-display font-black text-5xl text-gold/10 group-hover:text-gold/20 transition-colors leading-none">
                {item.number}
              </span>
              <div>
                <p className="font-display font-bold text-white text-sm mb-2 leading-snug">
                  {item.title}
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">{item.body}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-border">
                <p className="font-display font-black text-gold text-xl">{item.stat}</p>
                <p className="text-text-muted text-[10px] uppercase tracking-wider mt-0.5">
                  {item.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
