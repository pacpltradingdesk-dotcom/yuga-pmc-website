// components/Sustainability.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations/variants";
import { SUSTAINABILITY_STATS, SUSTAINABILITY_IMAGE } from "@/lib/company-data";

function ProgressRing({ percent, color }: { percent: number; color: "green" | "gold" }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  const stroke = color === "green" ? "#22C55E" : "#F59E0B";

  return (
    <svg width="88" height="88" className="-rotate-90">
      <circle
        cx="44"
        cy="44"
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4"
        fill="none"
      />
      <motion.circle
        cx="44"
        cy="44"
        r={r}
        stroke={stroke}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
}

export default function Sustainability() {
  return (
    <section
      id="sustainability"
      className="py-32 px-6 bg-charcoal relative overflow-hidden"
    >
      {/* Green radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(34,197,94,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
          >
            Building Roads,{" "}
            <span className="text-gradient-green">Protecting the Planet</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            India became the world&apos;s first country to commercially produce
            bio-bitumen (January 2026). PACPL holds CSIR-CRRI KrishiBind
            technology licence, one of only 14 companies in India.
          </motion.p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {SUSTAINABILITY_STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className="glass rounded-2xl p-8 text-center border border-border hover:border-green-border transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <ProgressRing
                  percent={i === 0 ? 80 : i === 1 ? 49 : 25}
                  color={stat.color as "green" | "gold"}
                />
              </div>
              <p
                className={`font-display font-black text-3xl md:text-4xl ${
                  stat.color === "green" ? "text-gradient-green" : "text-gradient"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-white font-semibold text-sm mt-2">{stat.label}</p>
              <p className="text-text-muted text-xs mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Full-width image banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative h-64 rounded-3xl overflow-hidden"
        >
          <Image
            src={SUSTAINABILITY_IMAGE}
            alt="Green landscape representing environmental sustainability"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display font-black text-2xl md:text-4xl text-white text-center max-w-2xl px-6">
              Every ton of bio-bitumen saves{" "}
              <span className="text-gradient-green">₹3,000+</span> in import costs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
