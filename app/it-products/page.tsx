"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Monitor,
  BarChart3,
  Link2,
  TrendingUp,
  Smartphone,
  Layers,
  WifiOff,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IT_SERVICES } from "@/lib/company-data";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  stagger,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/animations/variants";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Monitor,
  BarChart3,
  Link: Link2,
  TrendingUp,
  Smartphone,
} as const;

type IconKey = keyof typeof ICON_MAP;

// ── Fake metric data per tab ──────────────────────────────────────────────────
const MOCK_METRICS: Record<
  string,
  Array<{ label: string; value: string; bar: number }>
> = {
  portals: [
    { label: "Active Projects", value: "24", bar: 80 },
    { label: "Documents Uploaded", value: "1,847", bar: 65 },
    { label: "Pending Milestones", value: "7", bar: 30 },
    { label: "Payments Cleared", value: "₹42L", bar: 90 },
  ],
  "plant-dashboard": [
    { label: "Today's Output", value: "28.4 MT", bar: 92 },
    { label: "Bio-Oil Yield", value: "24.1%", bar: 78 },
    { label: "Biomass Stock", value: "142 MT", bar: 55 },
    { label: "Reactor Temp", value: "498°C", bar: 83 },
  ],
  "supply-chain": [
    { label: "Open POs", value: "11", bar: 45 },
    { label: "Vessels in Transit", value: "3", bar: 35 },
    { label: "SGS Docs Pending", value: "2", bar: 20 },
    { label: "Payment Due", value: "$1.2M", bar: 60 },
  ],
  "market-intel": [
    { label: "States Tracked", value: "17", bar: 100 },
    { label: "Price Δ (7d)", value: "+2.3%", bar: 58 },
    { label: "Active Tenders", value: "43", bar: 72 },
    { label: "Competitor Alerts", value: "6", bar: 25 },
  ],
  "mobile-apps": [
    { label: "Shift Reports Filed", value: "312", bar: 88 },
    { label: "Quality Checks", value: "89", bar: 74 },
    { label: "Safety Incidents", value: "0", bar: 5 },
    { label: "Photos Uploaded", value: "1,204", bar: 67 },
  ],
};

// ── Why Custom cards ──────────────────────────────────────────────────────────
const WHY_CUSTOM = [
  {
    id: "industry",
    icon: Layers,
    title: "Industry-Specific",
    description:
      "Built around bitumen plant workflows, NHAI compliance, and Indian supply chain realities — not generic templates.",
  },
  {
    id: "offline",
    icon: WifiOff,
    title: "Offline-Ready",
    description:
      "Field apps work without connectivity. Shift reports, quality entries, and photo evidence sync when back online.",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "Integrates with WhatsApp",
    description:
      "Alerts, approvals, and reports delivered via WhatsApp — the channel your team already uses every day.",
  },
] as const;

// ── Tab content transition variant ───────────────────────────────────────────
const tabVariant: Variants = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0,  transition: { duration: 0.4, ease: "easeOut" } },
  exit:     { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ItProductsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const activeService = IT_SERVICES[activeTab];
  const ActiveIcon = ICON_MAP[activeService.icon as IconKey] ?? Monitor;
  const metrics = MOCK_METRICS[activeService.id] ?? [];

  return (
    <>
      <Navbar />

      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
        <section
          className="relative min-h-[55vh] bg-charcoal flex items-center justify-center overflow-hidden"
          aria-label="IT Products hero"
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=85"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 text-center px-6 max-w-4xl mx-auto py-32"
          >
            <motion.span variants={fadeUp} className="section-label mb-6">
              Industrial IT Solutions
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mt-4 mb-6"
            >
              Software Built for the{" "}
              <span className="text-gradient-green">Bitumen Industry</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Purpose-built digital tools for plant operators, consultants, and
              supply chain managers — not generic SaaS.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Section 2: Tabbed Products ──────────────────────────────────── */}
        <section className="bg-black py-24 px-6" aria-label="IT product showcase">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-12"
            >
              <motion.span variants={fadeUp} className="section-label mb-4">
                Our Products
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-3xl md:text-4xl text-white mt-4"
              >
                Five tools, one platform
              </motion.h2>
            </motion.div>

            {/* Tab bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex overflow-x-auto gap-1 mb-10 pb-1 scrollbar-hide"
              role="tablist"
              aria-label="IT product tabs"
            >
              {IT_SERVICES.map((service, idx) => {
                const TabIcon = ICON_MAP[service.icon as IconKey] ?? Monitor;
                return (
                  <button
                    key={service.id}
                    role="tab"
                    aria-selected={activeTab === idx}
                    aria-controls={`tabpanel-${service.id}`}
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "relative flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 min-w-fit min-h-[44px]",
                      activeTab === idx
                        ? "text-white bg-charcoal"
                        : "text-text-secondary hover:text-white hover:bg-white/5"
                    )}
                  >
                    <TabIcon size={15} aria-hidden="true" />
                    <span>{service.name}</span>
                    {activeTab === idx && (
                      <motion.span
                        layoutId="active-tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Tab panels */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                id={`tabpanel-${activeService.id}`}
                role="tabpanel"
                aria-label={activeService.name}
                variants={tabVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                {/* Left — product info */}
                <motion.div variants={slideInLeft} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <ActiveIcon size={26} className="text-gold" aria-hidden="true" />
                    </div>
                    <h2 className="font-display font-bold text-3xl text-white leading-tight">
                      {activeService.name}
                    </h2>
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed">
                    {activeService.description}
                  </p>

                  {/* Example use-case box */}
                  <div className="glass-strong rounded-xl p-4">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                      Example Use Case
                    </p>
                    <p className="text-gold text-sm italic leading-relaxed">
                      &ldquo;{activeService.example}&rdquo;
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeService.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass text-text-secondary text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Right — dashboard mockup */}
                <motion.div variants={slideInRight}>
                  <div className="glass-strong rounded-2xl overflow-hidden">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
                      <div className="flex gap-1.5" aria-hidden="true">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 bg-black/40 rounded-md px-3 py-1">
                        <span className="text-text-muted text-xs select-none">
                          app.yugapmc.in/{activeService.id}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard content */}
                    <div className="bg-black/50 p-5 space-y-4">
                      {/* Title bar */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-white text-sm">
                          {activeService.name}
                        </h3>
                        <span className="text-[10px] font-bold text-green px-2 py-0.5 bg-green/10 border border-green/20 rounded-full">
                          LIVE
                        </span>
                      </div>

                      {/* Metric cards */}
                      <div className="grid grid-cols-2 gap-3">
                        {metrics.map((m) => (
                          <div
                            key={m.label}
                            className="glass rounded-xl p-3 space-y-1"
                          >
                            <p className="text-text-muted text-[10px] uppercase tracking-wider font-medium">
                              {m.label}
                            </p>
                            <p className="font-display font-bold text-gold text-lg leading-none">
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Fake chart */}
                      <div className="glass rounded-xl p-3 space-y-2">
                        <p className="text-text-muted text-[10px] uppercase tracking-wider font-medium mb-3">
                          Activity Overview
                        </p>
                        {metrics.slice(0, 3).map((m) => (
                          <div key={m.label} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-text-secondary text-[10px]">
                                {m.label}
                              </span>
                              <span className="text-gold text-[10px] font-bold">
                                {m.bar}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gold/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold rounded-full"
                                style={{ width: `${m.bar}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Section 3: Why Custom > Generic ─────────────────────────────── */}
        <section
          className="bg-charcoal py-24 px-6"
          aria-label="Why custom software beats generic SaaS"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-14"
            >
              <motion.span variants={fadeUp} className="section-label mb-4">
                Why Custom Wins
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-3xl md:text-4xl text-white mt-4"
              >
                Built for bitumen, not built for everyone
              </motion.h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {WHY_CUSTOM.map((card) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    variants={scaleIn}
                    className="glass-strong rounded-2xl p-8 space-y-4 hover:border-gold/20 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <CardIcon size={22} className="text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {card.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Section 4: CTA ──────────────────────────────────────────────── */}
        <section
          className="bg-black py-24 px-6"
          aria-label="Contact call to action"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span variants={fadeUp} className="section-label mb-4">
              Get Started
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-4xl md:text-5xl text-white mt-4 mb-6"
            >
              Need a Custom Solution?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-text-secondary text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Tell us your workflow and we&apos;ll scope a purpose-built tool in
              48 hours. No bloated enterprise pricing, no unused features.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-amber-400 transition-colors glow-gold min-h-[44px]"
              >
                Talk to us
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
