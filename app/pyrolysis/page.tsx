// app/pyrolysis/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PROCESS_STAGES,
  PYROLYSIS_FEEDSTOCKS,
  PYROLYSIS_OUTPUTS,
  PYROLYSIS_PRODUCTS,
  type PyrolysisFeedstock,
  type PyrolysisOutput,
  type PyrolysisProduct,
} from "@/lib/company-data";
import {
  fadeUp,
  stagger,
  staggerSlow,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/animations/variants";
import { cn } from "@/lib/utils";

// ── Stage image map ───────────────────────────────────────────────────────────
const STAGE_IMAGES: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  "02": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
  "03": "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80",
  "04": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
};

const STAGE_ALT: Record<string, string> = {
  "01": "Agricultural biomass and farming raw materials for pelletization",
  "02": "Industrial pyrolysis reactor at high temperature",
  "03": "Laboratory chemistry — bio-oil refining and blending",
  "04": "Finished highway road surface — certified bio-bitumen",
};

// ── Feedstock Card ────────────────────────────────────────────────────────────
const FeedstockCard = ({ item }: { item: PyrolysisFeedstock }) => (
  <motion.div
    variants={scaleIn}
    className="relative rounded-2xl overflow-hidden min-h-[260px] group cursor-default"
  >
    {/* Background image */}
    <Image
      src={item.image}
      alt={item.name}
      fill
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      {/* Icon */}
      <span className="text-4xl mb-3 leading-none" aria-hidden="true">
        {item.icon}
      </span>

      {/* Name */}
      <h3 className="font-display font-bold text-white text-xl mb-2 leading-tight">
        {item.name}
      </h3>

      {/* Volume badge */}
      <span className="inline-block text-[10px] font-bold text-gold bg-gold/10 border border-gold/25 rounded-full px-3 py-1 mb-2 w-fit leading-none uppercase tracking-wider">
        {item.indiaVolume}
      </span>

      {/* Highlight */}
      <p className="text-xs text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">
        {item.highlight}
      </p>
    </div>
  </motion.div>
);

// ── Output Card ───────────────────────────────────────────────────────────────
const OutputCard = ({ output }: { output: PyrolysisOutput }) => (
  <motion.div
    variants={fadeUp}
    className={cn(
      "glass-strong rounded-2xl p-5 group relative overflow-hidden",
      "hover:border-white/20 transition-colors duration-300",
      output.colorClass
    )}
  >
    {/* Glow blob */}
    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-current" />

    {/* Icon */}
    <span className="text-3xl mb-3 block leading-none" aria-hidden="true">
      {output.icon}
    </span>

    {/* Name */}
    <h3 className="font-display font-bold text-white text-sm mb-1 leading-tight">
      {output.name}
    </h3>

    {/* Yield */}
    <p className="text-[11px] text-text-muted mb-3 leading-relaxed">{output.yieldRange}</p>

    {/* Uses — first 2 bullets */}
    <ul className="space-y-1">
      {output.uses.slice(0, 2).map((use) => (
        <li key={use} className="flex items-start gap-1.5">
          <CheckCircle2
            size={11}
            className="text-gold mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-[11px] text-text-secondary leading-relaxed">{use}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// ── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product }: { product: PyrolysisProduct }) => (
  <motion.div
    variants={fadeUp}
    className={cn(
      "glass rounded-2xl p-5 group relative overflow-hidden",
      "hover:border-gold/20 transition-colors duration-300",
      "card-gradient-border"
    )}
  >
    {/* Radial hover glow */}
    <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(245,158,11,0.06),transparent)]" />

    {/* Icon */}
    <span className="text-3xl mb-3 block leading-none" aria-hidden="true">
      {product.icon}
    </span>

    {/* Name */}
    <h3 className="font-display font-bold text-white text-sm mb-2 leading-tight">
      {product.name}
    </h3>

    {/* Description */}
    <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
      {product.description}
    </p>

    {/* Big stat */}
    <div className="mt-auto">
      <p className="font-display font-extrabold text-2xl text-gradient leading-none mb-0.5">
        {product.stat}
      </p>
      <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none">
        {product.statLabel}
      </p>
    </div>
  </motion.div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PyrolysisPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Section 1: Hero ────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[60vh] bg-black flex items-center justify-center overflow-hidden"
          aria-labelledby="pyrolysis-hero-heading"
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=85"
            alt="Industrial pyrolysis reactor — dark, high-temperature thermal conversion"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Ambient particles */}
          <div
            className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-gold/60 blur-[1px] animate-pulse"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-gold/40 blur-[1px] animate-pulse [animation-delay:1.2s]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-green/40 animate-pulse [animation-delay:2.5s]"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.span variants={fadeUp} className="section-label mb-6 block">
                Pyrolysis Technology
              </motion.span>

              <motion.h1
                variants={fadeUp}
                id="pyrolysis-hero-heading"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6"
              >
                <span className="text-gradient-green">Waste</span> Into Roads.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl"
              >
                Thermo-chemical conversion at 450–550°C transforms agricultural biomass,
                plastic waste, and end-of-life tyres into certified bio-bitumen for
                India&apos;s highways.
              </motion.p>

              {/* Floating stats */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4"
              >
                <div className="glass rounded-xl px-5 py-3 border border-gold/20">
                  <p className="font-display font-extrabold text-gold text-xl leading-none mb-0.5">
                    450–550°C
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none">
                    Process Temperature
                  </p>
                </div>
                <div className="glass rounded-xl px-5 py-3 border border-green/20">
                  <p className="font-display font-extrabold text-green text-xl leading-none mb-0.5">
                    20–25%
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider leading-none">
                    Bio-Oil Yield
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
            aria-hidden="true"
          />
        </section>

        {/* ── Section 2: 4-Stage Process ─────────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-black"
          aria-labelledby="process-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-20"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                How It Works
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="process-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                The 4-Stage Process
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base mt-4 max-w-xl mx-auto"
              >
                From raw agricultural waste to NHAI-certified bio-bitumen — a fully
                engineered thermo-chemical pipeline.
              </motion.p>
            </motion.div>

            {/* Alternating stage rows */}
            <div className="space-y-24">
              {PROCESS_STAGES.map((stage, index) => {
                const isEven = index % 2 === 1;
                const textVariant = isEven ? slideInRight : slideInLeft;
                const imageVariant = isEven ? slideInLeft : slideInRight;
                const stageImg = STAGE_IMAGES[stage.stage];
                const stageAlt = STAGE_ALT[stage.stage];

                return (
                  <div
                    key={stage.stage}
                    className={cn(
                      "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                      isEven && "lg:direction-rtl"
                    )}
                  >
                    {/* Image side */}
                    <motion.div
                      variants={imageVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className={cn(isEven && "lg:order-2")}
                    >
                      <div className="relative rounded-2xl overflow-hidden h-[300px] w-full glow-gold">
                        <Image
                          src={stageImg}
                          alt={stageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        {/* Stage number watermark */}
                        <div className="absolute bottom-4 right-4 font-display font-extrabold text-6xl text-white/10 leading-none select-none">
                          {stage.stage}
                        </div>
                      </div>
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                      variants={textVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className={cn(isEven && "lg:order-1")}
                    >
                      {/* Gold numbered badge */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                          <span className="font-display font-extrabold text-gold text-sm leading-none">
                            {stage.stage}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-white text-2xl mb-4 leading-tight">
                        {stage.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-base leading-relaxed mb-6">
                        {stage.description}
                      </p>

                      {/* Stat callout */}
                      <div className="inline-flex items-baseline gap-2 glass rounded-xl px-5 py-3 border border-gold/20">
                        <span className="font-display font-extrabold text-gold text-2xl leading-none">
                          {stage.stat}
                        </span>
                        <span className="text-xs text-text-muted uppercase tracking-wider">
                          {stage.statLabel}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Feedstocks ─────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-charcoal relative overflow-hidden"
          aria-labelledby="feedstocks-heading"
        >
          {/* Top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-green/4 blur-[120px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                Feedstock Types
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="feedstocks-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                Four Waste Streams.{" "}
                <span className="text-gradient-green">One Premium Product.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base mt-4 max-w-xl mx-auto"
              >
                India generates hundreds of millions of tonnes of biomass, plastic, and
                tyre waste annually. Each stream is a profitable pyrolysis feedstock.
              </motion.p>
            </motion.div>

            {/* 4-card grid */}
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
            >
              {PYROLYSIS_FEEDSTOCKS.map((item) => (
                <FeedstockCard key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 4: Outputs Grid ───────────────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-black relative overflow-hidden"
          aria-labelledby="outputs-heading"
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                What You Get
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="outputs-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                Five Revenue Streams{" "}
                <span className="text-gradient">from One Plant</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base mt-4 max-w-xl mx-auto"
              >
                Every tonne of feedstock generates multiple sellable outputs — stacking
                revenue and maximising plant economics.
              </motion.p>
            </motion.div>

            {/* 5-card grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {PYROLYSIS_OUTPUTS.map((output) => (
                <OutputCard key={output.id} output={output} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 5: Commercial Products ──────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-charcoal relative overflow-hidden"
          aria-labelledby="products-heading"
        >
          {/* Radial gold glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(245,158,11,0.05),transparent)]"
            aria-hidden="true"
          />

          {/* Ring accents */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/4 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                Commercial Applications
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="products-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                ₹ Billion{" "}
                <span className="text-gradient">Market Opportunities</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base mt-4 max-w-xl mx-auto"
              >
                Each pyrolysis output addresses a large, established Indian market — from
                highways to pharmaceuticals to rubber manufacturing.
              </motion.p>
            </motion.div>

            {/* 5-card grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {PYROLYSIS_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 6: CTA ────────────────────────────────────────────────────── */}
        <section
          id="pyrolysis-cta"
          className="py-24 px-6 bg-black relative overflow-hidden"
          aria-labelledby="pyrolysis-cta-heading"
        >
          {/* Gold radial */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(245,158,11,0.07),transparent)]"
            aria-hidden="true"
          />

          {/* Gold ring decor */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/6 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-gold/3 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span variants={fadeUp} className="section-label mb-6 block justify-center">
                Start Building
              </motion.span>

              <motion.h2
                variants={fadeUp}
                id="pyrolysis-cta-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight"
              >
                Ready to Build{" "}
                <span className="text-gradient">Your Plant?</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
              >
                Whether you&apos;re a new investor, an existing pyrolysis operator, or an
                agro-processor — YUGA PMC has a structured pathway to transform waste into
                certified bio-bitumen and build a profitable plant from day one.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gold text-black font-bold text-base px-8 py-4 rounded-full hover:bg-amber-400 transition-colors glow-gold min-h-[44px]"
                >
                  Book Free Consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/consulting"
                  className="inline-flex items-center gap-2 glass text-white hover:bg-white/8 font-bold text-base px-8 py-4 rounded-full border border-border transition-colors min-h-[44px]"
                >
                  View PMC Services
                </Link>
              </motion.div>

              {/* Trust micro-stats */}
              <motion.div
                variants={fadeUp}
                className="mt-14 flex flex-wrap items-center justify-center gap-10"
              >
                {[
                  { value: "10+", label: "Plants Commissioned" },
                  { value: "450–550°C", label: "Proven Process Temp" },
                  { value: "CSIR-CRRI", label: "Certified Technology" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display font-extrabold text-2xl text-gradient leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
