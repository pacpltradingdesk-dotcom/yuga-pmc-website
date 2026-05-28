// components/CapacityCalculator.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, IndianRupee, Clock } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";

type CapacityOption = {
  label: string;
  mtPerDay: number;
  capexCr: number;
};

const OPTIONS: CapacityOption[] = [
  { label: "5 MT/Day",  mtPerDay: 5,  capexCr: 1.5  },
  { label: "10 MT/Day", mtPerDay: 10, capexCr: 3.0  },
  { label: "15 MT/Day", mtPerDay: 15, capexCr: 4.5  },
  { label: "20 MT/Day", mtPerDay: 20, capexCr: 8.0  },
  { label: "25 MT/Day", mtPerDay: 25, capexCr: 10.0 },
  { label: "30 MT/Day", mtPerDay: 30, capexCr: 12.0 },
  { label: "50 MT/Day", mtPerDay: 50, capexCr: 16.0 },
];

function fmt(n: number, decimals = 1) {
  return n.toFixed(decimals);
}

export default function CapacityCalculator() {
  const [selectedIdx, setSelectedIdx] = useState(2); // default 15 MT/Day

  const opt = OPTIONS[selectedIdx];

  // Rough revenue model: Rs 8,500/MT selling price, 300 working days/yr
  const revenuePerYear = opt.mtPerDay * 300 * 8500 / 1e7; // in Cr
  const opexPerYear = revenuePerYear * 0.55; // ~55% opex
  const ebitdaPerYear = revenuePerYear - opexPerYear;
  const paybackYears = ebitdaPerYear > 0 ? opt.capexCr / ebitdaPerYear : 0;

  const results = [
    { icon: IndianRupee, label: "CapEx Investment",    value: `₹${fmt(opt.capexCr, 1)} Cr`,    sub: "Total plant setup cost"         },
    { icon: TrendingUp,  label: "Annual Revenue",      value: `₹${fmt(revenuePerYear, 1)} Cr`, sub: "At ₹8,500/MT · 300 days/yr"    },
    { icon: Calculator,  label: "EBITDA / Year",       value: `₹${fmt(ebitdaPerYear, 1)} Cr`,  sub: "~45% operating margin"          },
    { icon: Clock,       label: "Payback Period",      value: `${fmt(paybackYears, 1)} yrs`,   sub: "Full capital recovery estimate" },
  ];

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
          >
            Estimate Your <span className="text-gradient">Plant Returns</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-xl mx-auto">
            Select a plant capacity to see indicative financial projections. Contact us for a
            detailed DPR with site-specific numbers.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-3xl p-8 md:p-10"
        >
          {/* Capacity selector */}
          <p className="text-text-muted text-xs uppercase tracking-widest mb-4 font-bold">
            Select Capacity
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {OPTIONS.map((o, i) => (
              <button
                key={o.label}
                onClick={() => setSelectedIdx(i)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  selectedIdx === i
                    ? "bg-gold text-black glow-gold"
                    : "glass text-text-secondary hover:text-white hover:border-gold/20 border border-border"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map(({ icon: Icon, label, value, sub }) => (
              <motion.div
                key={label}
                layout
                className="glass rounded-2xl p-5 flex flex-col gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon size={14} className="text-gold" />
                </div>
                <p className="text-text-muted text-[10px] uppercase tracking-wider">{label}</p>
                <motion.p
                  key={value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display font-black text-gold text-xl leading-none"
                >
                  {value}
                </motion.p>
                <p className="text-text-muted text-[10px] leading-tight">{sub}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-text-muted text-xs mt-6 text-center">
            * Indicative estimates only. Actual figures depend on feedstock cost, location, and market conditions.
            YUGA PMC provides a detailed DPR with bankable projections.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
