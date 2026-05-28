// components/Technology.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Layers, Flame, FlaskConical, BadgeCheck } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { PROCESS_STAGES } from "@/lib/company-data";

const ICONS = { Layers, Flame, FlaskConical, BadgeCheck } as const;
type IconName = keyof typeof ICONS;

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      if (typeof window === "undefined") return;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !lineRef.current) return;

      const totalLength = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      ctx = gsap.context(() => {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="py-32 px-6 bg-black relative overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[20vw] text-white/[0.015] pointer-events-none select-none whitespace-nowrap">
        PYROLYSIS
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
          >
            How <span className="text-gradient">Bio-Bitumen</span> is Made
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Four integrated stages convert agro-waste into commercial bio-bitumen
            for India&apos;s road network, all implementable with PACPL&apos;s proven process.
          </motion.p>
        </motion.div>

        {/* Desktop: horizontal flow with SVG line */}
        <div className="hidden lg:block relative mb-16">
          <svg
            className="absolute top-8 left-0 right-0 w-full h-16 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1200 64"
          >
            <path
              d="M 150 32 L 1050 32"
              stroke="rgba(245,158,11,0.5)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              ref={lineRef}
            />
          </svg>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {PROCESS_STAGES.map((stage, i) => {
              const Icon = ICONS[stage.icon as IconName];
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-charcoal-2 border border-border rounded-2xl p-6 hover:border-gold/20 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gold font-display font-black text-3xl">{stage.stage}</span>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Icon size={18} className="text-gold" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mb-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  <div className="glass rounded-lg px-3 py-2 text-center">
                    <p className="text-gold font-black text-sm font-display">{stage.stat}</p>
                    <p className="text-text-muted text-[10px]">{stage.statLabel}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden space-y-4">
          {PROCESS_STAGES.map((stage, i) => {
            const Icon = ICONS[stage.icon as IconName];
            return (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-charcoal-2 border border-border rounded-2xl p-5 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gold font-black text-xs font-display">{stage.stage}</span>
                    <h3 className="font-display font-bold text-white text-sm">{stage.title}</h3>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{stage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { v: "20–25%", l: "Bio-Oil Yield" },
            { v: "450–550°C", l: "Process Temperature" },
            { v: "15–30%", l: "Bitumen Replacement" },
            { v: "6 Months", l: "Post-Commissioning Support" },
          ].map((item) => (
            <div
              key={item.l}
              className="glass rounded-xl px-4 py-4 text-center border border-gold/10"
            >
              <p className="font-display font-black text-gold text-lg">{item.v}</p>
              <p className="text-text-muted text-xs mt-1">{item.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
