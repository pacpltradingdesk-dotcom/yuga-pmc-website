// components/About.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeUp, slideInRight, stagger } from "@/animations/variants";
import { COMPANY, FOUNDER, ABOUT_IMAGE } from "@/lib/company-data";

const MILESTONES = [
  { year: "2001", event: "Founded in bitumen industry" },
  { year: "2009", event: "Registered as Company Director (MCA)" },
  { year: "2020", event: "Omnipotent Industries IPO — BSE listed" },
  { year: "2024", event: "9th plant commissioned" },
  { year: "2026", event: "CSIR-CRRI KrishiBind licensee — India's first bio-bitumen" },
];

const KEY_FACTS = [
  "25+ years in bitumen since 2001",
  "9 plants commissioned across India",
  "₹25,000 Cr+ market opportunity",
  "NHAI vendor empanelment support",
  "150,000 verified industry contacts",
  "6-month post-commissioning support",
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span variants={fadeUp} className="section-label">
              Who We Are
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-4xl md:text-5xl text-white mt-4 mb-6 leading-tight"
            >
              India&apos;s Most Trusted{" "}
              <span className="text-gradient">Bio-Bitumen</span> Consultant
            </motion.h2>
            <motion.p variants={fadeUp} className="text-text-secondary text-lg leading-relaxed mb-4">
              PPS Anantams Corporation Private Limited (PACPL) is India&apos;s
              leading full-service Project Management Consultancy for
              Bio-Modified Bitumen, Conventional Bitumen, CRMB, PMB, and
              Emulsion plants.
            </motion.p>
            <motion.p variants={fadeUp} className="text-text-secondary text-base leading-relaxed mb-8">
              Founded by Prince Pratap Shah — a 25-year bitumen industry veteran
              — PACPL provides end-to-end consulting from feasibility study to
              post-commissioning hand-holding. We are the ONE-POINT SOLUTION
              PROVIDER for anyone looking to set up a bio-bitumen or bitumen
              plant in India.
            </motion.p>

            {/* Key facts */}
            <motion.ul variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {KEY_FACTS.map((fact) => (
                <motion.li
                  key={fact}
                  variants={fadeUp}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {fact}
                </motion.li>
              ))}
            </motion.ul>

            {/* Founder card */}
            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-gold text-lg">P</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{FOUNDER.name}</p>
                <p className="text-text-muted text-xs">{FOUNDER.title}</p>
                <p className="text-gold text-xs mt-0.5">{FOUNDER.bseListed}</p>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-bold uppercase tracking-wider text-green bg-green-dim border border-green-border rounded-full px-3 py-1">
                  {COMPANY.award}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-3xl overflow-hidden h-[500px]"
          >
            <Image
              src={ABOUT_IMAGE}
              alt="Industrial plant setup"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
              <p className="text-gold font-black text-2xl font-display">9</p>
              <p className="text-white text-xs font-medium">Plants Commissioned</p>
            </div>
          </motion.div>
        </div>

        {/* Milestone timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label justify-center mb-10">Our Journey</p>
          <div className="relative">
            {/* Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
            />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center md:text-left"
                >
                  <div className="inline-flex md:flex items-center justify-center w-8 h-8 rounded-full bg-gold text-black font-black text-xs mb-3 md:mb-4 md:mx-auto relative z-10">
                    {m.year.slice(2)}
                  </div>
                  <p className="text-gold font-display font-bold text-sm">{m.year}</p>
                  <p className="text-text-secondary text-xs mt-1 leading-relaxed">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
