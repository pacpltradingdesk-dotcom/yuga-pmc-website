// components/TrustBar.tsx
"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/company-data";

const LOGOS = [
  "BIS", "NHAI", "CSIR-CRRI", "MNRE", "MoRTH", "ISO 9001", "BSE", "NABL",
  "BIS", "NHAI", "CSIR-CRRI", "MNRE", "MoRTH", "ISO 9001", "BSE", "NABL",
];

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-charcoal border-y border-border" ref={ref}>
      {/* Counters */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-black text-4xl md:text-5xl text-gold leading-none">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.2}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </p>
              <p className="text-text-primary font-semibold text-sm mt-2">
                {stat.label}
              </p>
              <p className="text-text-muted text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo ticker */}
      <div className="border-t border-border py-8 overflow-hidden relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, #0D1117, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, #0D1117, transparent)" }}
        />
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {LOGOS.map((logo, i) => (
            <span
              key={i}
              className="text-text-muted text-xs font-bold uppercase tracking-[0.15em] flex-shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
