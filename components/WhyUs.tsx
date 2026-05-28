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

// Visual treatment per card id
const CARD_STYLE: Record<string, string> = {
  expertise: "relative overflow-hidden",
  network:   "bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.10),transparent_60%)]",
};

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
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
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
            const isLarge = card.size === "large";
            return (
              <motion.div
                key={card.id}
                variants={fadeUp}
                className={cn(
                  "glass-strong rounded-2xl p-6 flex flex-col justify-between",
                  "border border-border hover:border-gold/20 transition-all duration-300 group",
                  isLarge && "md:col-span-2 md:row-span-2",
                  card.size === "wide" && "md:col-span-2",
                  CARD_STYLE[card.id] ?? ""
                )}
              >
                {/* Background image for expertise cell */}
                {card.id === "expertise" && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=60"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-2/80 to-transparent rounded-2xl" />
                  </>
                )}

                <div className="relative z-10 w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div className="relative z-10">
                  <h3
                    className={cn(
                      "font-display font-bold text-white leading-snug",
                      isLarge ? "text-2xl mb-2" : "text-sm mb-1"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
