// components/Hero.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HERO_IMAGE } from "@/lib/company-data";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 95}%`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
  size: Math.random() > 0.7 ? "3px" : "2px",
}));

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE}
        alt="Aerial view of Indian national highway"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/30 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_500px_at_15%_50%,rgba(245,158,11,0.07),transparent)] z-[2]" />

      {/* Particles */}
      {!reduce &&
        PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle z-[3]"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}

      {/* Igloo-style corner annotations — desktop only */}
      <div className="absolute top-6 right-8 z-10 text-right hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">/// EST. 2001</p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">VADODARA, GUJARAT</p>
      </div>
      <div className="absolute bottom-8 left-6 z-10 hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">CSIR-CRRI LICENSED</p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">KrishiBind Technology</p>
      </div>
      <div className="absolute bottom-8 right-8 z-10 text-right hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">10 PLANTS+</p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">COMMISSIONED</p>
      </div>

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="section-label">
              India&apos;s #1 Bio-Bitumen Consultant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white mt-6 mb-6 leading-[0.9] tracking-tight"
          >
            The Future of{" "}
            <span className="text-gradient">Sustainable</span>{" "}
            Roads
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            From land selection to commercial production. YUGA PMC handles
            everything. 10 plants commissioned. 25 years of bitumen expertise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-gold text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider glow-gold hover:bg-amber-400 transition-colors"
              >
                Book Free Consultation
                <ChevronRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="#products"
                className="inline-flex items-center gap-2 glass text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/8 transition-colors"
              >
                Our Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
