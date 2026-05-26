// components/BusinessLineCards.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";

const LINES = [
  {
    id: "consulting",
    label: "Service 01",
    title: "Bio-Bitumen\nPlant Consulting",
    description:
      "End-to-end Project Management Consultancy — from feasibility study and land selection to commercial production. India's only A-to-Z consultant for bio-bitumen plants.",
    cta: "Explore Consulting",
    href: "/consulting",
    color: "gold",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    stats: [
      { value: "10+", label: "Plants Built" },
      { value: "Rs 2–6 Cr", label: "Plant Cost" },
      { value: "6 Months", label: "Avg Timeline" },
    ],
  },
  {
    id: "it",
    label: "Service 02",
    title: "Industrial IT\nProducts",
    description:
      "Custom digital solutions built specifically for bitumen and industrial clients — plant dashboards, procurement systems, market intelligence tools, and mobile apps.",
    cta: "Explore IT Products",
    href: "/it-products",
    color: "green",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    stats: [
      { value: "5", label: "Product Types" },
      { value: "Real-time", label: "Data Sync" },
      { value: "Offline", label: "Mobile Ready" },
    ],
  },
] as const;

export default function BusinessLineCards() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">
            What We Do
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4"
          >
            Two Lines of <span className="text-gradient">Excellence</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {LINES.map((line, i) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden min-h-[500px] flex flex-col justify-end"
            >
              {/* Background image */}
              <Image
                src={line.image}
                alt={line.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />
              <div
                className={`absolute inset-0 ${
                  line.color === "gold"
                    ? "bg-[radial-gradient(ellipse_600px_400px_at_50%_100%,rgba(245,158,11,0.08),transparent)]"
                    : "bg-[radial-gradient(ellipse_600px_400px_at_50%_100%,rgba(34,197,94,0.08),transparent)]"
                } z-10`}
              />

              {/* Content */}
              <div className="relative z-20 p-8 md:p-10">
                <span className="section-label mb-4 block">{line.label}</span>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white mb-4 leading-tight whitespace-pre-line">
                  {line.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
                  {line.description}
                </p>

                {/* Stats row */}
                <div className="flex gap-6 mb-8">
                  {line.stats.map((s) => (
                    <div key={s.label}>
                      <p
                        className={`font-display font-black text-lg ${
                          line.color === "gold" ? "text-gold" : "text-green"
                        }`}
                      >
                        {s.value}
                      </p>
                      <p className="text-text-muted text-[10px] uppercase tracking-wider">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={line.href}
                  className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 ${
                    line.color === "gold"
                      ? "bg-gold text-black hover:bg-amber-400 glow-gold"
                      : "bg-green text-black hover:bg-emerald-400 glow-green"
                  }`}
                >
                  {line.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
