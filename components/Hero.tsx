// components/Hero.tsx
// Full-viewport 3D scene — igloo.inc style
// Text lives at the periphery; 3D plant fills everything
"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PlantScene3D = dynamic(() => import("./PlantScene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-[#050508]"
    >
      {/* ── Full-screen 3D canvas ── */}
      <div className="absolute inset-0 z-[1]">
        {!reduce ? (
          <PlantScene3D />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-25"
          />
        )}
      </div>

      {/* Very subtle vignette — just edges, not a gradient wall */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 40%, rgba(5,5,8,0.55) 100%)",
        }}
      />
      {/* Bottom fade to section below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />

      {/* ── TOP-RIGHT: manifesto text (igloo style) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute top-24 right-8 z-10 text-right hidden md:block max-w-[200px]"
      >
        <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em] mb-2">
          ///// Manifesto
        </p>
        <p className="font-mono text-[11px] text-white/25 leading-[1.7]">
          India became the first country to commercially produce bio-bitumen. The window is open. Now.
        </p>
      </motion.div>

      {/* ── BOTTOM-RIGHT: technical meta ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 right-8 z-10 text-right hidden md:block"
      >
        <p className="font-mono text-[10px] text-white/35 uppercase tracking-[0.22em] leading-[2]">EST. 2001</p>
        <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.18em] leading-[2]">VADODARA, GUJARAT</p>
        <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.18em] leading-[2]">CSIR-CRRI LICENSED</p>
        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.16em] leading-[2]">KrishiBind Technology</p>
      </motion.div>

      {/* ── BOTTOM-LEFT: main content (igloo puts content at bottom) ── */}
      <div className="absolute bottom-12 left-0 right-0 z-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-mono text-[10px] text-gold/70 uppercase tracking-[0.28em] mb-5"
          >
            ///// India&apos;s #1 Bio-Bitumen Consultant
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.88] tracking-tight mb-5"
          >
            The Future of<br />
            <span className="text-gradient">Sustainable</span> Roads
          </motion.h1>

          {/* Sub + CTAs row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap items-center gap-6"
          >
            <p className="text-white/50 text-sm font-mono leading-relaxed max-w-xs">
              10 plants commissioned. 25 years of bitumen expertise.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-gold text-black font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider glow-gold hover:bg-amber-400 transition-colors"
              >
                Book Free Consultation
                <ArrowRight size={14} />
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 border border-white/15 text-white/70 font-mono text-xs px-5 py-3.5 rounded-full uppercase tracking-wider hover:border-white/30 hover:text-white transition-all"
              >
                Our Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── TOP-LEFT plants count (small) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute top-24 left-6 z-10 hidden md:block"
      >
        <p className="font-mono text-[28px] font-black text-white/10 leading-none">10+</p>
        <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.22em] mt-0.5">Plants Commissioned</p>
      </motion.div>
    </section>
  );
}
