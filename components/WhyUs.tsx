// components/WhyUs.tsx
"use client";

import { motion } from "framer-motion";
import {
  Award, Factory, Route, Network, BadgeCheck, TrendingUp,
} from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { WHY_US_CARDS } from "@/lib/company-data";
import { cn } from "@/lib/utils";

const ICONS = { Award, Factory, Route, Network, BadgeCheck, TrendingUp } as const;
type IconName = keyof typeof ICONS;

export default function WhyUs() {
  return (
    <section className="py-32 px-6 bg-charcoal">
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
            Why Choose PACPL
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            The Difference That{" "}
            <span className="text-gradient">Matters Most</span>
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]"
        >
          {WHY_US_CARDS.map((card) => {
            const Icon = ICONS[card.icon as IconName];
            return (
              <motion.div
                key={card.id}
                variants={fadeUp}
                className={cn(
                  "glass-strong rounded-2xl p-6 flex flex-col justify-between",
                  "border border-border hover:border-gold/20 transition-all duration-300 group",
                  card.size === "large" && "md:col-span-2 md:row-span-2",
                  card.size === "wide"  && "md:col-span-2"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-display font-bold text-white leading-snug",
                      card.size === "large" ? "text-2xl mb-2" : "text-sm mb-1"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
