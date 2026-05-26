// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { fadeUp, stagger, staggerFast } from "@/animations/variants";
import { HERO_IMAGE, STATS } from "@/lib/company-data";

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 95}%`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
  size: Math.random() > 0.7 ? "3px" : "2px",
}));

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Aerial view of Indian national highway"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_700px_at_50%_35%,rgba(245,158,11,0.07),transparent)] z-[2]" />

      {/* Particles */}
      {PARTICLES.map((p) => (
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

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="section-label">India&apos;s #1 Bio-Bitumen Consultant</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mt-6 mb-6 leading-[0.9] tracking-tight"
        >
          {["The", "Future", "of", "Sustainable", "Roads"].map((word) => (
            <motion.span
              key={word}
              variants={fadeUp}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word === "Sustainable" ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From land selection to commercial production — YUGA PMC handles
          everything. 10 plants commissioned. 25 years of bitumen expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider glow-gold hover:bg-amber-400 transition-colors"
            >
              Get Free Consultation
              <ChevronRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 glass text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/8 transition-colors"
            >
              Our Products
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass rounded-2xl px-4 py-4 text-center"
            >
              <p className="font-display font-black text-2xl md:text-3xl text-gold">
                {stat.value >= 1000
                  ? `${(stat.value / 1000).toFixed(0)}K`
                  : stat.value}
                {stat.suffix}
              </p>
              <p className="text-text-secondary text-xs mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
