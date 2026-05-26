// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe, Share2 } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/company-data";

const SERVICES = [
  "DPR & Feasibility Study",
  "Land Selection & Site Scoring",
  "Machinery Procurement",
  "Licensing & Regulatory",
  "Market Access & Sales",
  "Post-Commissioning Support",
];

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/yuga-logo.jpg"
                alt="YUGA PMC"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              India&apos;s #1 Bio-Bitumen Plant Setup Consultant. From land
              selection to commercial production.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-gold/30 transition-colors cursor-pointer"
                >
                  <Icon size={14} className="text-text-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s} className="text-text-secondary text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-text-secondary text-sm">{COMPANY.phone}</li>
              <li className="text-text-secondary text-sm">{COMPANY.email}</li>
              <li className="text-text-secondary text-sm">{COMPANY.address}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {["BIS", "NHAI", "CSIR"].map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-bold text-text-muted border border-border rounded-full px-2 py-0.5 uppercase tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            &copy; 2026 {COMPANY.name} &middot; CIN {COMPANY.cin}
          </p>
          <p className="text-text-muted text-xs">Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
