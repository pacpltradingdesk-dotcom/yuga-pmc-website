// components/PlantTypes.tsx
// Igloo-inspired editorial plant scale explorer
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PLANT_SCALES = [
  {
    id: "starter",
    scale: "01",
    name: "Starter Plant",
    sub: "Entry into bio-bitumen",
    capacity: "5-15 MT/Day",
    investment: "Rs 1.5-4.5 Cr",
    roi: "18-24 months",
    tag: "LOWEST CAPEX",
    description:
      "Purpose-built for first-time investors. Compact footprint, fast commissioning, complete NHAI compliance from day one.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=85",
    specs: ["AGRO-WASTE FEEDSTOCK", "6-MONTH SETUP", "NHAI GRADE OUTPUT"],
    accentColor: "text-gold",
  },
  {
    id: "growth",
    scale: "02",
    name: "Growth Plant",
    sub: "Scale what works",
    capacity: "20-30 MT/Day",
    investment: "Rs 8-12 Cr",
    roi: "14-18 months",
    tag: "MOST POPULAR",
    description:
      "The preferred scale for operators converting from pyrolysis. Dedicated blending unit, automated QC, full supply-chain integration.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
    specs: ["PYROLYSIS + BLENDING", "AUTOMATED QC", "NHAI CONTRACTOR SUPPLY"],
    accentColor: "text-green",
  },
  {
    id: "industrial",
    scale: "03",
    name: "Industrial Plant",
    sub: "Command the market",
    capacity: "50+ MT/Day",
    investment: "Rs 16+ Cr",
    roi: "12-16 months",
    tag: "HIGHEST YIELD",
    description:
      "Integrated facility for biomass aggregators and large contractors. Multi-product output: bio-bitumen, biochar, and syngas.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85",
    specs: ["MULTI-PRODUCT OUTPUT", "BIOCHAR + SYNGAS", "JV READY STRUCTURE"],
    accentColor: "text-gold",
  },
] as const;

export default function PlantTypes() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-black">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-8"
        >
          <div>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.25em] mb-4">
              ///// Plant Configuration
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-none">
              Choose Your
              <br />
              <span className="text-gradient">Plant Scale</span>
            </h2>
          </div>
          <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
            Three configurations. Each engineered for a different investor
            profile. YUGA PMC builds all three, A-to-Z.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed editorial panels */}
      <div className="space-y-1">
        {PLANT_SCALES.map((plant, i) => (
          <motion.div
            key={plant.id}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className="relative h-[72vh] min-h-[500px] overflow-hidden group"
          >
            {/* Background image */}
            <Image
              src={plant.image}
              alt={plant.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="100vw"
              quality={85}
            />

            {/* Overlay layers */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />

            {/* Top-right: scale + tag — igloo-style */}
            <div className="absolute top-7 right-8 text-right hidden md:block">
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.25em]">
                SCALE {plant.scale} / 03
              </p>
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em] mt-1">
                {plant.tag}
              </p>
            </div>

            {/* Bottom-right: spec list — igloo-style */}
            <div className="absolute bottom-8 right-8 text-right hidden md:block">
              {plant.specs.map((spec) => (
                <p
                  key={spec}
                  className="font-mono text-[9px] text-white/25 uppercase tracking-[0.2em] leading-[1.8]"
                >
                  {spec}
                </p>
              ))}
            </div>

            {/* Main content — bottom-left */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 md:max-w-2xl">
              {/* Tag */}
              <span className="inline-flex w-fit font-mono text-[9px] uppercase tracking-[0.25em] text-gold/60 border border-gold/15 rounded-full px-3 py-1 mb-5">
                {plant.tag}
              </span>

              {/* Plant name */}
              <h3 className="font-display font-black text-4xl md:text-6xl text-white leading-none mb-1">
                {plant.name}
              </h3>
              <p className="font-mono text-[10px] text-white/35 uppercase tracking-[0.22em] mb-7">
                {plant.sub}
              </p>

              {/* Key metrics */}
              <div className="flex items-center gap-8 mb-6 flex-wrap">
                <div>
                  <p className={`font-display font-black text-2xl ${plant.accentColor}`}>
                    {plant.capacity}
                  </p>
                  <p className="font-mono text-[9px] text-white/35 uppercase tracking-[0.2em] mt-0.5">
                    Output / Day
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                <div>
                  <p className="font-display font-black text-2xl text-white">
                    {plant.investment}
                  </p>
                  <p className="font-mono text-[9px] text-white/35 uppercase tracking-[0.2em] mt-0.5">
                    Investment
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                <div>
                  <p className="font-display font-black text-2xl text-green">
                    {plant.roi}
                  </p>
                  <p className="font-mono text-[9px] text-white/35 uppercase tracking-[0.2em] mt-0.5">
                    ROI Period
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-7 max-w-md">
                {plant.description}
              </p>

              {/* CTA */}
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 border border-gold/25 text-gold font-mono font-bold text-[10px] uppercase tracking-[0.2em] px-5 py-3 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 w-fit"
              >
                Discuss This Scale
                <ArrowRight size={11} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">
          ///// All capacities custom-engineered per site
        </p>
        <Link
          href="/consulting"
          className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em] hover:text-gold transition-colors flex items-center gap-1"
        >
          Full PMC Services <ArrowRight size={10} />
        </Link>
      </div>
    </section>
  );
}
