// components/Hero.tsx
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// SSR-safe dynamic import — static export ke saath safe
const PlantScene3D = dynamic(() => import("./PlantScene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black"
    >
      {/* 3D Plant Scene — full canvas background */}
      {!reduce && (
        <div className="absolute inset-0 z-[1]">
          <PlantScene3D />
        </div>
      )}

      {/* Fallback background for reduced-motion / loading */}
      {reduce && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}

      {/* Gradient overlay — left text readable over 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-[2]" />

      {/* Igloo-style corner annotations — desktop only */}
      <div className="absolute top-6 right-8 z-[5] text-right hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">
          /// EST. 2001
        </p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">
          VADODARA, GUJARAT
        </p>
      </div>
      <div className="absolute bottom-8 left-6 z-[5] hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">
          CSIR-CRRI LICENSED
        </p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">
          KrishiBind Technology
        </p>
      </div>
      <div className="absolute bottom-8 right-8 z-[5] text-right hidden md:block">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em]">
          10 PLANTS+
        </p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.15em] mt-1">
          COMMISSIONED
        </p>
      </div>

      {/* Content — left-aligned, z above scene */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="section-label">
              India&apos;s #1 Bio-Bitumen Consultant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          >
            From land selection to commercial production. YUGA PMC handles
            everything. 10 plants commissioned. 25 years of bitumen expertise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
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
