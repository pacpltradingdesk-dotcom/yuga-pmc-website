// components/CredentialsBar.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { KEY_CREDENTIALS } from "@/lib/company-data";

export default function CredentialsBar() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 bg-charcoal border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            Proven at Every Level
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {KEY_CREDENTIALS.map((cred, i) => (
            <motion.div
              key={cred}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-3 glass rounded-xl px-4 py-3 border border-border hover:border-gold/20 transition-colors"
            >
              <CheckCircle2
                size={14}
                className="text-gold flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-text-secondary text-xs leading-relaxed font-medium">
                {cred}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
