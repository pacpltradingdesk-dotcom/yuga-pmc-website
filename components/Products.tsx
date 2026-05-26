// components/Products.tsx
"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Download, ArrowUpRight } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { PRODUCTS } from "@/lib/company-data";
import { cn } from "@/lib/utils";

export default function Products() {
  return (
    <section id="products" className="py-32 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">
            Our Products
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Complete Bio-Bitumen{" "}
            <span className="text-gradient">Product Range</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            From CSIR-CRRI certified bio-modified blends to industrial-grade
            oxidized bitumen — every product you need for India&apos;s roads.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCTS.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable={false}
                scale={1.01}
                transitionSpeed={400}
                className="h-full"
              >
                <div
                  className={cn(
                    "card-gradient-border h-full bg-charcoal-2 border border-border rounded-2xl p-6 flex flex-col gap-4",
                    "hover:border-white/12 transition-all duration-300"
                  )}
                >
                  {/* Badge */}
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                        product.color === "gold"
                          ? "text-gold bg-gold-dim border border-gold-border"
                          : "text-green bg-green-dim border border-green-border"
                      )}
                    >
                      {product.tagline}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-xl text-white">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {product.description}
                  </p>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-medium text-text-muted bg-white/3 border border-border rounded-full px-3 py-1"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <button className="flex items-center gap-1.5 text-gold text-xs font-semibold hover:text-amber-400 transition-colors">
                      <Download size={13} />
                      Brochure
                    </button>
                    <button className="flex items-center gap-1 text-text-secondary text-xs font-semibold hover:text-white transition-colors ml-auto">
                      Learn More
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
