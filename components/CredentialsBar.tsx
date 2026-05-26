// components/CredentialsBar.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { KEY_CREDENTIALS } from "@/lib/company-data";

export default function CredentialsBar() {
  const doubled = [...KEY_CREDENTIALS, ...KEY_CREDENTIALS];

  return (
    <section className="py-20 bg-charcoal border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          Credentials & Proof
        </motion.span>
      </div>

      {/* Marquee */}
      <div className="flex gap-8 overflow-hidden">
        <div className="flex gap-8 animate-marquee flex-shrink-0">
          {doubled.map((cred, i) => (
            <div
              key={i}
              className="flex items-center gap-3 glass rounded-full px-5 py-3 flex-shrink-0 border border-border hover:border-gold/20 transition-colors"
            >
              <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
              <span className="text-text-secondary text-sm whitespace-nowrap font-medium">
                {cred}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
