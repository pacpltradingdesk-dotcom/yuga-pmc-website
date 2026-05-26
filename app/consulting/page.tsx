// app/consulting/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  Wrench,
  HardHat,
  ScrollText,
  Settings2,
  Handshake,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CONSULTING_SERVICES,
  PMC_SERVICES,
  TARGET_AUDIENCES,
  type PmcService,
  type TargetAudience,
} from "@/lib/company-data";
import { fadeUp, stagger, scaleIn } from "@/animations/variants";
import { cn } from "@/lib/utils";

// ── Icon map for PMC service icons ────────────────────────────────────────────
const PMC_ICON_MAP: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList size={22} className="text-gold" />,
  Wrench:        <Wrench size={22} className="text-gold" />,
  HardHat:       <HardHat size={22} className="text-gold" />,
  ScrollText:    <ScrollText size={22} className="text-gold" />,
  Settings2:     <Settings2 size={22} className="text-gold" />,
  Handshake:     <Handshake size={22} className="text-gold" />,
};

// ── Consulting Services Card ──────────────────────────────────────────────────
interface ConsultingCardProps {
  category: string;
  services: string[];
}

const ConsultingCard = ({ category, services }: ConsultingCardProps) => (
  <motion.div
    variants={fadeUp}
    className={cn(
      "glass-strong rounded-2xl p-6 group relative overflow-hidden",
      "hover:border-gold/30 transition-colors duration-300",
      "card-gradient-border"
    )}
  >
    {/* Gold left border accent */}
    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold/0 group-hover:bg-gold/70 transition-all duration-300 rounded-l-2xl" />

    <h3 className="font-display font-bold text-white text-base mb-4 group-hover:text-gold transition-colors duration-200">
      {category}
    </h3>
    <ul className="space-y-2">
      {services.map((service) => (
        <li key={service} className="flex items-start gap-2">
          <CheckCircle2
            size={13}
            className="text-gold mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs text-text-secondary leading-relaxed">
            {service}
          </span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// ── PMC Service Card ──────────────────────────────────────────────────────────
const PmcServiceCard = ({ service }: { service: PmcService }) => (
  <motion.div
    variants={fadeUp}
    className={cn(
      "glass-strong rounded-2xl p-6 group relative overflow-hidden",
      "hover:border-gold/30 transition-colors duration-300",
      "card-gradient-border"
    )}
  >
    {/* Glow blob */}
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Icon */}
    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors duration-200">
      {PMC_ICON_MAP[service.icon] ?? <ClipboardList size={22} className="text-gold" />}
    </div>

    <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-gold transition-colors duration-200">
      {service.category}
    </h3>
    <p className="text-sm text-text-secondary leading-relaxed mb-4">
      {service.description}
    </p>

    {/* Deliverable pills */}
    <div className="flex flex-wrap gap-1.5">
      {service.deliverables.map((d) => (
        <span
          key={d}
          className="text-[10px] font-semibold bg-gold/8 border border-gold/20 text-gold/80 rounded-full px-2.5 py-1 leading-none"
        >
          {d}
        </span>
      ))}
    </div>
  </motion.div>
);

// ── Target Audience Card ──────────────────────────────────────────────────────
const AudienceCard = ({ audience }: { audience: TargetAudience }) => (
  <motion.div
    variants={scaleIn}
    className={cn(
      "glass-strong rounded-2xl p-6 group relative overflow-hidden",
      "hover:border-gold/30 transition-colors duration-300"
    )}
  >
    {/* Background accent */}
    <div className="absolute inset-0 bg-gradient-to-br from-gold/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Stages badge */}
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-bold bg-gold text-black px-3 py-1 rounded-full uppercase tracking-widest">
        {audience.stages}
      </span>
    </div>

    {/* Type */}
    <h3 className="font-display font-bold text-white text-lg mb-1 leading-tight">
      {audience.type}
    </h3>

    {/* Investment */}
    <p className="text-2xl font-display font-extrabold text-gradient mb-4 leading-none">
      {audience.investment}
    </p>

    {/* Fee stats */}
    <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-black/30 border border-border">
      <div className="text-center">
        <p className="text-[10px] text-text-muted mb-0.5 uppercase tracking-wider leading-none">DPR</p>
        <p className="text-xs font-bold text-gold leading-tight">{audience.feeDpr}</p>
      </div>
      <div className="text-center border-x border-border">
        <p className="text-[10px] text-text-muted mb-0.5 uppercase tracking-wider leading-none">Setup</p>
        <p className="text-xs font-bold text-gold leading-tight">{audience.feeSetup}</p>
      </div>
      <div className="text-center">
        <p className="text-[10px] text-text-muted mb-0.5 uppercase tracking-wider leading-none">Retainer</p>
        <p className="text-xs font-bold text-gold leading-tight">{audience.feeRetainer}</p>
      </div>
    </div>

    {/* Key services */}
    <ul className="space-y-1.5">
      {audience.keyServices.map((s) => (
        <li key={s} className="flex items-start gap-2">
          <CheckCircle2
            size={13}
            className="text-green mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="text-xs text-text-secondary leading-relaxed">{s}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ConsultingPage() {
  const consultingEntries = Object.entries(CONSULTING_SERVICES) as [string, string[]][];

  return (
    <>
      <Navbar />

      <main>
        {/* ── Section 1: Page Hero ──────────────────────────────────────────── */}
        <section
          className="relative min-h-[60vh] bg-black flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85"
            alt="Bio-bitumen plant construction site"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Particle accents */}
          <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-gold/60 blur-[1px] animate-pulse" aria-hidden="true" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-gold/40 blur-[1px] animate-pulse [animation-delay:1s]" aria-hidden="true" />
          <div className="absolute bottom-1/3 right-1/5 w-1 h-1 rounded-full bg-gold/50 animate-pulse [animation-delay:2s]" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.span variants={fadeUp} className="section-label mb-6 block">
                Bio-Bitumen Consulting
              </motion.span>

              <motion.h1
                variants={fadeUp}
                id="hero-heading"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6"
              >
                Complete Plant Setup.{" "}
                <span className="text-gradient">Zero Guesswork.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl"
              >
                From feasibility study to first tonne of certified bio-bitumen — YUGA PMC
                manages everything. 10 plants commissioned. 4,452 industry contacts.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gold text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-amber-400 transition-colors glow-gold min-h-[44px]"
                >
                  Get Free Consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="#pmc-services"
                  className="inline-flex items-center gap-2 glass text-white hover:bg-white/8 font-bold text-sm px-6 py-3 rounded-full border border-border transition-colors min-h-[44px]"
                >
                  View PMC Services
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />
        </section>

        {/* ── Section 2: Consulting Services Grid ──────────────────────────── */}
        <section
          className="py-24 px-6 bg-black"
          aria-labelledby="consulting-services-heading"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                What We Cover
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="consulting-services-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                Every Aspect of Your Plant
              </motion.h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {consultingEntries.map(([category, services]) => (
                <ConsultingCard key={category} category={category} services={services} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 3: PMC Services ───────────────────────────────────────── */}
        <section
          id="pmc-services"
          className="py-24 px-6 bg-charcoal relative overflow-hidden"
          aria-labelledby="pmc-services-heading"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold/4 blur-[100px] rounded-full pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                PMC Services
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="pmc-services-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl"
              >
                <span className="text-white">A-to-Z Project </span>
                <span className="text-gradient">Management</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-secondary text-base mt-4 max-w-2xl mx-auto">
                Six comprehensive service pillars — from the first drawing board moment to
                the day your plant ships its first certified tonne.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {PMC_SERVICES.map((service) => (
                <PmcServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 4: Target Audiences ──────────────────────────────────── */}
        <section
          className="py-24 px-6 bg-black relative overflow-hidden"
          aria-labelledby="audiences-heading"
        >
          {/* Decorative grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label mb-4 block justify-center">
                Who We Serve
              </motion.span>
              <motion.h2
                variants={fadeUp}
                id="audiences-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white"
              >
                Find Your Entry Point
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-secondary text-base mt-4 max-w-2xl mx-auto">
                Whether you&apos;re starting from scratch or converting an existing
                operation, we have a structured consulting path for you.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {TARGET_AUDIENCES.map((audience) => (
                <AudienceCard key={audience.id} audience={audience} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 5: Contact CTA Strip ─────────────────────────────────── */}
        <section
          id="contact"
          className="py-24 px-6 bg-charcoal relative overflow-hidden"
          aria-labelledby="contact-cta-heading"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.06),transparent)]"
            aria-hidden="true"
          />

          {/* Gold ring accent */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/5 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold/3 pointer-events-none"
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
                Start Today
              </motion.span>

              <motion.h2
                variants={fadeUp}
                id="contact-cta-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight"
              >
                Ready to Start Your{" "}
                <span className="text-gradient">Plant Journey?</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
              >
                Book your free 45-minute consultation with Prince Shah. We&apos;ll assess
                your investor profile, recommend the right plant capacity, and outline a
                clear path to your first tonne of certified bio-bitumen.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gold text-black font-bold text-sm px-8 py-4 rounded-full hover:bg-amber-400 transition-colors glow-gold min-h-[44px] text-base"
                >
                  Book Free Consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Trust micro-stats */}
              <motion.div
                variants={fadeUp}
                className="mt-12 flex flex-wrap items-center justify-center gap-8"
              >
                {[
                  { value: "10+", label: "Plants Commissioned" },
                  { value: "4,452", label: "Industry Contacts" },
                  { value: "25+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display font-extrabold text-2xl text-gradient leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
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
