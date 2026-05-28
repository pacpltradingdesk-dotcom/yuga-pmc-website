// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  COMPANY,
  FOUNDER,
  CAREER_TRACK,
  KEY_CREDENTIALS,
} from "@/lib/company-data";
import {
  fadeUp,
  fadeIn,
  stagger,
  staggerSlow,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/animations/variants";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NetworkCategory {
  label: string;
  count: number;
}

// ── Static data ───────────────────────────────────────────────────────────────

const FOUNDER_STATS: { value: string; label: string }[] = [
  { value: "25", label: "Years in Industry" },
  { value: "10", label: "Plants Commissioned" },
  { value: "4,452", label: "Industry Contacts" },
  { value: "17", label: "States Covered" },
];

const NETWORK_CATEGORIES: NetworkCategory[] = [
  { label: "Contractors", count: 2758 },
  { label: "Traders", count: 994 },
  { label: "Importers", count: 360 },
  { label: "Transporters", count: 206 },
  { label: "Manufacturers", count: 84 },
  { label: "Decanters", count: 50 },
];

const NETWORK_TOTAL = 4452;

// ── Sub-components ────────────────────────────────────────────────────────────

interface TimelineEntryProps {
  year: number;
  company: string;
  location: string;
  plantType: string;
  role: string;
  isLast: boolean;
}

const TimelineEntry = ({
  year,
  company,
  location,
  plantType,
  role,
  isLast,
}: TimelineEntryProps) => {
  const isConsultantOrFounder =
    role.toLowerCase().includes("consultant") ||
    role.toLowerCase().includes("founder") ||
    role.toLowerCase().includes("ceo");

  const isYou = company === "YOUR BIO-BITUMEN PLANT";

  return (
    <motion.div
      variants={fadeUp}
      className="relative flex items-start gap-4 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[17px] top-8 bottom-0 w-px bg-gold/15" />
      )}

      {/* Year badge + dot */}
      <div className="relative flex-shrink-0 flex flex-col items-center gap-1">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs z-10",
            isYou
              ? "bg-gold text-black glow-gold"
              : "bg-gold/10 border border-gold/30 text-gold"
          )}
        >
          {String(year).slice(2)}
        </div>
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 glass-strong rounded-xl p-4",
          isYou && "border-gold/40 glow-gold"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h4
              className={cn(
                "font-display font-bold text-sm",
                isYou ? "text-gold" : "text-white"
              )}
            >
              {company}
            </h4>
            <p className="text-text-secondary text-xs mt-0.5">
              {location} &middot; {plantType}
            </p>
          </div>

          <span
            className={cn(
              "self-start text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap",
              isConsultantOrFounder
                ? "bg-gold/15 text-gold border border-gold/25"
                : "bg-white/5 text-text-secondary border border-white/10"
            )}
          >
            {role}
          </span>
        </div>

        {isYou && (
          <p className="mt-2 text-gold text-xs font-semibold">
            This Could Be You →
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-[55vh] flex items-center justify-center bg-black overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=85"
              alt="Corporate office, YUGA PMC headquarters"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/75" />
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          >
            <motion.span variants={fadeUp} className="section-label mb-6">
              About YUGA PMC
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white mt-4 leading-tight"
            >
              25 Years of Bitumen{" "}
              <span className="text-gradient">Mastery</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary text-lg md:text-xl leading-relaxed"
            >
              One founder. One mission. India&apos;s most trusted bio-bitumen
              plant consultant.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Section 2: Founder Story ─────────────────────────────────────── */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.span variants={slideInLeft} className="section-label">
                  The Founder
                </motion.span>

                <motion.h2
                  variants={slideInLeft}
                  className="font-display font-black text-4xl md:text-5xl text-white mt-4 leading-tight"
                >
                  {FOUNDER.name}
                </motion.h2>

                <motion.p
                  variants={slideInLeft}
                  className="text-gold text-sm font-semibold uppercase tracking-wider mt-2"
                >
                  {FOUNDER.title}
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary leading-relaxed mt-6"
                >
                  Prince Pratap Shah&apos;s journey began in 2001 at Southern
                  Asphalt, Mangalore, where he mastered every layer of bitumen
                  production from the ground up. Over two and a half decades he
                  moved through emulsion, blown bitumen, CRMB, and PMB plants
                  across Karnataka, Maharashtra, and Gujarat, accumulating an
                  operational depth that textbooks cannot replicate.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary leading-relaxed mt-4"
                >
                  In 2018 he founded Omnipotent Industries Limited, a
                  BSE-listed company that achieved IPO in 2020, before pivoting
                  to become India&apos;s premier bio-bitumen plant consultant.
                  Today YUGA PMC has commissioned 10 plants across 17 states,
                  backed by a live network of 4,452 verified industry contacts
                  and direct CSIR-CRRI certification for the KrishiBind
                  bio-bitumen technology.
                </motion.p>

                {/* Badges */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-3 mt-6"
                >
                  <span className="glass-strong rounded-full px-4 py-2 text-xs font-bold text-gold border border-gold/25">
                    {FOUNDER.bseListed}
                  </span>
                  <span className="glass-strong rounded-full px-4 py-2 text-xs font-bold text-green border border-green/25">
                    {COMPANY.award}
                  </span>
                </motion.div>

                {/* 2×2 Stats grid */}
                <motion.div
                  variants={stagger}
                  className="grid grid-cols-2 gap-4 mt-8"
                >
                  {FOUNDER_STATS.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={scaleIn}
                      className="glass rounded-xl p-4 text-center"
                    >
                      <p className="font-display font-black text-3xl text-gradient">
                        {stat.value}
                      </p>
                      <p className="text-text-secondary text-xs mt-1 font-medium">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Portrait image */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative rounded-3xl overflow-hidden h-[500px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Prince Pratap Shah, Founder and Managing Director, YUGA PMC"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Floating glass card */}
                <div className="absolute bottom-6 left-6 glass-strong rounded-2xl px-5 py-3">
                  <p className="text-gold font-display font-bold text-sm">
                    {FOUNDER.din}
                  </p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    BSE Listed · IPO 2020
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Career Timeline ───────────────────────────────────── */}
        <section className="py-24 px-6 bg-charcoal">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <motion.span variants={fadeUp} className="section-label">
                Career Journey
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-3xl md:text-4xl text-white mt-4"
              >
                2001-2026: Building India&apos;s{" "}
                <span className="text-gradient">Bitumen Industry</span>
              </motion.h2>
            </motion.div>

            {/* Timeline */}
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative"
            >
              {CAREER_TRACK.map((entry, idx) => (
                <TimelineEntry
                  key={`${entry.year}-${entry.company}`}
                  year={entry.year}
                  company={entry.company}
                  location={entry.location}
                  plantType={entry.plantType}
                  role={entry.role}
                  isLast={idx === CAREER_TRACK.length - 1}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 4: Key Credentials ───────────────────────────────────── */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="section-label">
                Credentials
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-3xl md:text-5xl text-white mt-4"
              >
                Proven at Every Level
              </motion.h2>
            </motion.div>

            {/* 2×4 grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {KEY_CREDENTIALS.map((credential, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  className={cn(
                    "glass-strong rounded-2xl p-5 flex items-start gap-3",
                    "hover:border-gold/30 transition-colors duration-300 card-gradient-border group"
                  )}
                >
                  <CheckCircle2
                    size={18}
                    className="text-gold flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-white text-sm leading-relaxed">
                    {credential}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Section 5: Industry Network ──────────────────────────────────── */}
        <section className="py-24 px-6 bg-charcoal">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="section-label">
                Industry Network
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-3xl md:text-5xl text-white mt-4"
              >
                4,452 Live Industry Contacts
              </motion.h2>
            </motion.div>

            {/* Big stat */}
            <motion.p
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-display font-black text-8xl md:text-[10rem] lg:text-[12rem] text-gradient text-center leading-none mb-16"
              aria-label="4452 total contacts"
            >
              4,452
            </motion.p>

            {/* Category cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {NETWORK_CATEGORIES.map((cat) => {
                const barWidth = Math.round((cat.count / NETWORK_TOTAL) * 100);
                return (
                  <motion.div
                    key={cat.label}
                    variants={fadeUp}
                    className="glass-strong rounded-2xl p-5 flex flex-col gap-3"
                  >
                    <p className="font-display font-black text-2xl text-gold">
                      {cat.count.toLocaleString()}
                    </p>
                    <p className="text-text-secondary text-xs font-medium">
                      {cat.label}
                    </p>
                    {/* Visual bar */}
                    <div className="relative h-1.5 rounded-full bg-gold/15 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gold rounded-full"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Section 6: CTA ───────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-black">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Glow ring */}
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] bg-gold"
              aria-hidden="true"
            />

            <motion.span variants={fadeUp} className="section-label">
              Get Started
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-3xl md:text-5xl text-white mt-4 leading-tight"
            >
              Start Your Plant Journey{" "}
              <span className="text-gradient">With Us</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-text-secondary text-lg mt-6 leading-relaxed"
            >
              25 years of expertise, a 4,452-strong industry network, and a
              proven A-to-Z PMC framework: everything you need to commission
              your bio-bitumen plant on time and on budget.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gold text-black font-bold text-base px-8 py-4 rounded-full hover:bg-amber-400 transition-colors duration-200 glow-gold min-h-[52px]"
              >
                Book Free Consultation
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
