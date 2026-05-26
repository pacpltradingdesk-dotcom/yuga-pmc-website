# Bio-Bitumen Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, fully-animated production-ready homepage for PACPL (PPS Anantams Corporation Private Limited) — India's #1 Bio-Bitumen Plant Setup Consultant — in `D:\rahul\project-1`.

**Architecture:** Next.js 15 App Router with 11 section components assembled in `app/page.tsx`. All business content lives in `lib/company-data.ts` (never hardcoded in JSX). Framer Motion handles component animations; GSAP ScrollTrigger handles the Technology section scroll timeline; Lenis provides global smooth scrolling.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion 11, GSAP 3 + ScrollTrigger, Lenis 1.x, react-parallax-tilt, react-countup, react-hook-form, lucide-react, shadcn/ui primitives, Outfit + Inter (Google Fonts).

**Spec:** `docs/superpowers/specs/2026-05-26-bio-bitumen-homepage-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout: fonts, Lenis provider, global metadata |
| `app/page.tsx` | Homepage: compose all 11 sections |
| `app/globals.css` | Tailwind v4 `@theme` tokens, base styles, utilities |
| `components/Navbar.tsx` | Floating nav, transparent→blur on scroll |
| `components/Hero.tsx` | Fullscreen hero, particles, CTA, floating stat cards |
| `components/TrustBar.tsx` | Animated counters + logo ticker marquee |
| `components/About.tsx` | Split layout, founder card, milestone timeline |
| `components/Products.tsx` | 5 tilt cards, animated borders, specs |
| `components/Technology.tsx` | GSAP ScrollTrigger 4-stage process |
| `components/Sustainability.tsx` | SVG progress rings, green glow |
| `components/CaseStudies.tsx` | Masonry-style project cards |
| `components/WhyUs.tsx` | Bento grid, 6 animated cards |
| `components/Testimonials.tsx` | CSS marquee double-row quote cards |
| `components/Contact.tsx` | Glass form + WhatsApp CTA |
| `components/Footer.tsx` | 4-col mega footer |
| `components/ui/button.tsx` | shadcn Button primitive |
| `components/ui/input.tsx` | shadcn Input primitive |
| `components/ui/textarea.tsx` | shadcn Textarea primitive |
| `components/ui/select.tsx` | shadcn Select primitive |
| `animations/variants.ts` | Framer Motion variant presets |
| `animations/transitions.ts` | Reusable transition objects |
| `lib/company-data.ts` | All PACPL content — single source of truth |
| `lib/utils.ts` | `cn()` class merge helper |
| `hooks/use-scroll.ts` | Scroll position + direction hook |
| `providers/lenis-provider.tsx` | Client-side Lenis smooth scroll init |

---

## Task 1: Initialize Next.js 15 Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`

- [ ] **Step 1: Scaffold the project**

Run inside `D:\rahul\project-1`:
```bash
npx create-next-app@latest . --typescript --eslint --app --no-src-dir --import-alias "@/*" --no-tailwind
```
When prompted, accept all defaults. `--no-tailwind` because we install Tailwind v4 manually.

Expected: project files created, `package.json` present.

- [ ] **Step 2: Install Tailwind CSS v4**

```bash
npm install tailwindcss @tailwindcss/postcss
```

- [ ] **Step 3: Configure PostCSS for Tailwind v4**

Replace `postcss.config.mjs` with:
```js
/** @type {import('postcss').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 4: Verify the scaffold compiles**

```bash
npm run build
```
Expected: build succeeds (may show warnings, no errors).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind v4"
```

---

## Task 2: Install All Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install framer-motion gsap lenis react-parallax-tilt react-countup react-hook-form lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Install shadcn CLI and init**

```bash
npx shadcn@latest init
```
When prompted:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

This creates `components.json` and `components/ui/` skeleton.

- [ ] **Step 3: Add shadcn primitives we need**

```bash
npx shadcn@latest add button input textarea select
```

- [ ] **Step 4: Verify no peer dependency errors**

```bash
npm ls framer-motion gsap lenis 2>&1 | head -20
```
Expected: all packages listed without `UNMET PEER` errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: install framer-motion, gsap, lenis, shadcn and all runtime deps"
```

---

## Task 3: Design System — globals.css

**Files:**
- Create/replace: `app/globals.css`

- [ ] **Step 1: Replace globals.css with full design token system**

```css
/* app/globals.css */
@import "tailwindcss";

/* ─── Tailwind v4 Design Tokens ───────────────────────────── */
@theme {
  /* Colors */
  --color-black:        #050508;
  --color-white:        #F8FAFC;
  --color-charcoal:     #0D1117;
  --color-charcoal-2:   #161B22;
  --color-green:        #22C55E;
  --color-green-dim:    rgba(34, 197, 94, 0.12);
  --color-green-border: rgba(34, 197, 94, 0.25);
  --color-gold:         #F59E0B;
  --color-gold-dim:     rgba(245, 158, 11, 0.12);
  --color-gold-border:  rgba(245, 158, 11, 0.28);
  --color-border:       rgba(255, 255, 255, 0.07);
  --color-glass:        rgba(255, 255, 255, 0.04);

  /* Text */
  --color-text-primary:   #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-text-muted:     #64748B;

  /* Typography */
  --font-display: var(--font-outfit), system-ui, sans-serif;
  --font-sans:    var(--font-inter), system-ui, sans-serif;

  /* Spacing */
  --spacing-section: 8rem;

  /* Radius */
  --radius-card:  1rem;
  --radius-large: 1.5rem;
}

/* ─── Base ────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #050508;
  color: #F8FAFC;
  font-family: var(--font-sans);
  overflow-x: hidden;
}

/* ─── Utility Classes ─────────────────────────────────────── */
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.text-gradient {
  background: linear-gradient(135deg, #F59E0B, #FDE68A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-green {
  background: linear-gradient(135deg, #22C55E, #86EFAC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #F59E0B;
}

.section-label::before,
.section-label::after {
  content: '';
  display: block;
  width: 1.5rem;
  height: 1px;
  background: rgba(245, 158, 11, 0.4);
}

.glow-gold {
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.15), 0 0 80px rgba(245, 158, 11, 0.05);
}

.glow-green {
  box-shadow: 0 0 40px rgba(34, 197, 94, 0.15), 0 0 80px rgba(34, 197, 94, 0.05);
}

/* ─── Marquee animation ───────────────────────────────────── */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

.animate-marquee:hover,
.animate-marquee-reverse:hover {
  animation-play-state: paused;
}

/* ─── Particle dots for hero ──────────────────────────────── */
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(245, 158, 11, 0.4);
  border-radius: 50%;
  animation: pulse-dot 3s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.5); }
}

/* ─── Gradient border card ────────────────────────────────── */
.card-gradient-border {
  position: relative;
}

.card-gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0) 0%,
    rgba(245, 158, 11, 0.4) 50%,
    rgba(245, 158, 11, 0) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-gradient-border:hover::before {
  opacity: 1;
}
```

- [ ] **Step 2: Verify CSS loads without errors**

```bash
npm run dev
```
Open `http://localhost:3000`. Background should be near-black `#050508`. No CSS errors in console.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add Tailwind v4 design system tokens and utilities"
```

---

## Task 4: Fonts Setup

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx with font configuration**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PACPL — India's #1 Bio-Bitumen Plant Setup Consultant",
  description:
    "PPS Anantams Corporation Pvt Ltd — 25 years of bitumen expertise, 9 plants commissioned, complete A-to-Z PMC consulting for bio-bitumen plant setup across India.",
  metadataBase: new URL("https://pacpl.in"),
  openGraph: {
    title: "PACPL — India's #1 Bio-Bitumen Plant Setup Consultant",
    description:
      "From land selection to commercial production. 9 plants commissioned, 25 years expertise, 18 states covered.",
    url: "https://pacpl.in",
    siteName: "PACPL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load**

```bash
npm run dev
```
In browser DevTools → Network → filter "font" — you should see Outfit and Inter woff2 requests.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: configure Outfit (display) + Inter (body) fonts"
```

---

## Task 5: Animation System

**Files:**
- Create: `animations/variants.ts`
- Create: `animations/transitions.ts`

- [ ] **Step 1: Create animations/variants.ts**

```ts
// animations/variants.ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
```

- [ ] **Step 2: Create animations/transitions.ts**

```ts
// animations/transitions.ts

export const springEntrance = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const quickHover = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const slowReveal = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
```

- [ ] **Step 3: Commit**

```bash
git add animations/
git commit -m "feat: add Framer Motion variant presets and transition configs"
```

---

## Task 6: Company Data

**Files:**
- Create: `lib/company-data.ts`

- [ ] **Step 1: Create lib/company-data.ts with all PACPL content**

```ts
// lib/company-data.ts

export const COMPANY = {
  name: "PPS Anantams Corporation Private Limited",
  shortName: "PACPL",
  cin: "U46632GJ2019PTC110676",
  gst: "24AAHCV1611L2ZD",
  phone: "+91 7795242424",
  whatsapp: "917795242424",
  email: "sales@princeshah.com",
  website: "www.princeshah.com",
  address: "Vadodara, Gujarat",
  registered: "1/13 Damji Nenshi Estate, Station Road, Bhandup (W), Mumbai 400078",
  award: "Pride of India Icon 2021",
} as const;

export const FOUNDER = {
  name: "Prince Pratap Shah",
  title: "Founder & Managing Director",
  experience: "25+ Years in Bitumen Industry",
  din: "DIN 06680837",
  bseListed: "Omnipotent Industries Limited — BSE-Listed (IPO 2020)",
  since: "Director since 2009",
} as const;

export const STATS = [
  { value: 9,      suffix: "+", label: "Plants Commissioned", sub: "Across India" },
  { value: 25,     suffix: "+", label: "Years Expertise",     sub: "Since 2001" },
  { value: 150000, suffix: "+", label: "Industry Contacts",   sub: "Verified Network" },
  { value: 18,     suffix: "",  label: "States Covered",      sub: "Active Markets" },
] as const;

export const NAV_LINKS = [
  { label: "About",          href: "#about" },
  { label: "Products",       href: "#products" },
  { label: "Technology",     href: "#technology" },
  { label: "Projects",       href: "#projects" },
  { label: "Contact",        href: "#contact" },
] as const;

export const PRODUCTS = [
  {
    id: "bio-vg30",
    name: "Bio-Modified VG-30",
    tagline: "CSIR-CRRI Certified Blend",
    description:
      "15–30% bio-oil blended with conventional VG-30. India's first commercially produced bio-bitumen compliant with NHAI mandates.",
    specs: ["15–30% Bio-Oil Blend", "CSIR-CRRI Certified", "NHAI Compliant", "BIS Standard"],
    color: "gold",
  },
  {
    id: "crmb",
    name: "CRMB",
    tagline: "Crumb Rubber Modified",
    description:
      "Enhanced durability and cold-crack resistance using recycled crumb rubber. Ideal for high-temperature regions.",
    specs: ["Cold Crack Resistant", "Recycled Rubber", "Heavy Traffic", "IS 15462"],
    color: "green",
  },
  {
    id: "pmb",
    name: "PMB",
    tagline: "Polymer Modified Bitumen",
    description:
      "SBS polymer modification for high-traffic highways, flyovers, and bridge deck applications. Superior fatigue resistance.",
    specs: ["SBS Polymer", "Bridges & Flyovers", "High Fatigue Resistance", "IS 15462"],
    color: "gold",
  },
  {
    id: "emulsion",
    name: "Bitumen Emulsion",
    tagline: "Cold Application",
    description:
      "RS-1, RS-2, SS-1, MS grades. Spray applications, tack coat, surface dressing, and microsurfacing.",
    specs: ["RS/SS/MS Grades", "Cold Application", "Tack Coat", "IS 8887"],
    color: "green",
  },
  {
    id: "blown",
    name: "Blown Bitumen",
    tagline: "Industrial Grade",
    description:
      "Air-blown oxidized bitumen for industrial waterproofing, roofing, and anti-corrosion applications.",
    specs: ["85/25 & 90/15 Grades", "Waterproofing", "Roofing Grade", "IS 702"],
    color: "gold",
  },
] as const;

export const PROCESS_STAGES = [
  {
    stage: "01",
    title: "Raw Material & Pelletization",
    description:
      "Agricultural waste (rice husk, sugarcane bagasse, cotton stalk) is sourced, dried, and compressed into uniform 6mm fuel pellets for consistent pyrolysis feed.",
    icon: "Layers",
    stat: "6mm",
    statLabel: "Pellet Size",
    temp: null,
  },
  {
    stage: "02",
    title: "Pyrolysis & Bio-Oil Extraction",
    description:
      "Pellets undergo thermo-chemical conversion at 450–550°C in an oxygen-free reactor. Bio-oil (20–25% yield) is condensed and collected.",
    icon: "Flame",
    stat: "450–550°C",
    statLabel: "Process Temp",
    temp: "450–550°C",
  },
  {
    stage: "03",
    title: "Refining & Blending",
    description:
      "Bio-oil is refined and blended with conventional VG-30 bitumen at 15–30% ratio. The blend is homogenized and quality-tested per CSIR-CRRI specifications.",
    icon: "FlaskConical",
    stat: "15–30%",
    statLabel: "Bio-Oil Ratio",
    temp: null,
  },
  {
    stage: "04",
    title: "Testing & NHAI Certification",
    description:
      "Final product undergoes penetration, softening point, ductility, and viscosity tests in NABL-accredited labs. NHAI/BIS certification obtained before market dispatch.",
    icon: "BadgeCheck",
    stat: "NABL",
    statLabel: "Lab Certified",
    temp: null,
  },
] as const;

export const SUSTAINABILITY_STATS = [
  {
    value: "₹4,500 Cr+",
    label: "Annual savings potential",
    sub: "Through reduced petroleum bitumen imports",
    color: "green",
  },
  {
    value: "49%",
    label: "Import replacement target",
    sub: "India currently imports 49% of its bitumen",
    color: "green",
  },
  {
    value: "25%",
    label: "Capital subsidy available",
    sub: "MNRE Waste-to-Wealth Mission",
    color: "gold",
  },
] as const;

export const CASE_STUDIES = [
  {
    id: "nh48",
    title: "National Highway 48 Upgrade",
    location: "Gujarat",
    capacity: "30 MT/Day",
    outcome: "40 km resurfaced with bio-modified VG-30",
    category: "Highway",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
  },
  {
    id: "urban-mh",
    title: "Urban Road Renewal",
    location: "Maharashtra",
    capacity: "20 MT/Day",
    outcome: "850 tonnes supplied to MSRDC contractor",
    category: "Urban",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "industrial-rj",
    title: "Industrial Access Road",
    location: "Rajasthan",
    capacity: "15 MT/Day",
    outcome: "Pyrolysis operator converted to bio-bitumen",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
] as const;

export const WHY_US_CARDS = [
  {
    id: "expertise",
    title: "25 Years of Expertise",
    body: "In bitumen industry since 2001 — before bio-bitumen was a policy mandate.",
    icon: "Award",
    size: "large",
  },
  {
    id: "plants",
    title: "9 Plants Commissioned",
    body: "All delivered on time, fully operational.",
    icon: "Factory",
    size: "small",
  },
  {
    id: "pmc",
    title: "A-to-Z PMC",
    body: "Land to commercial production — one partner for everything.",
    icon: "Route",
    size: "small",
  },
  {
    id: "network",
    title: "150,000 Industry Contacts",
    body: "2,758 contractors · 994 traders · 360 importers across 18 states.",
    icon: "Network",
    size: "wide",
  },
  {
    id: "certified",
    title: "CSIR-CRRI Certified",
    body: "Government-approved KrishiBind technology license.",
    icon: "BadgeCheck",
    size: "small",
  },
  {
    id: "bse",
    title: "BSE-Listed Founder",
    body: "Omnipotent Industries Ltd — IPO 2020, DIN 06680837.",
    icon: "TrendingUp",
    size: "small",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "PACPL's end-to-end support was exceptional. From DPR to commissioning in 8 months — we couldn't have done it without Prince Shah's team.",
    name: "Rajesh Mehta",
    company: "Mehta Infra Pvt Ltd",
    location: "Gujarat",
  },
  {
    id: "t2",
    quote:
      "We were a pyrolysis operator with no bitumen knowledge. PACPL converted our plant to bio-bitumen in 4 months. Now supplying to NHAI contractors.",
    name: "Suresh Patel",
    company: "GreenOil Industries",
    location: "Rajasthan",
  },
  {
    id: "t3",
    quote:
      "The NHAI vendor empanelment support was priceless. PACPL's 150,000-contact network opened doors we didn't know existed.",
    name: "Vikram Singh",
    company: "Singh Road Materials",
    location: "Uttar Pradesh",
  },
  {
    id: "t4",
    quote:
      "Best investment decision of 2024. 25% MNRE subsidy + 30 MT/Day plant. ROI in 18 months as projected in the DPR.",
    name: "Anita Sharma",
    company: "EcoRoads Ltd",
    location: "Maharashtra",
  },
  {
    id: "t5",
    quote:
      "Prince Shah personally supervised our trial runs. That level of founder involvement is rare. Highly recommend PACPL.",
    name: "Deepak Joshi",
    company: "Joshi Bitumen Works",
    location: "Madhya Pradesh",
  },
  {
    id: "t6",
    quote:
      "The regulatory support — PCB consents, factory license, PESO — was handled entirely by PACPL. Saved us months of delays.",
    name: "Mohammed Iqbal",
    company: "Iqbal Construction",
    location: "Karnataka",
  },
] as const;

export const CAPACITY_OPTIONS = [
  "5 MT/Day — ₹1.5 Crore",
  "10 MT/Day — ₹3.0 Crore",
  "15 MT/Day — ₹4.5 Crore",
  "20 MT/Day — ₹8.0 Crore",
  "25 MT/Day — ₹10.0 Crore",
  "30 MT/Day — ₹12.0 Crore",
  "50 MT/Day — ₹16.0 Crore",
  "Custom / 75–100 MT/Day",
] as const;

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=85";
export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80";
export const SUSTAINABILITY_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80";
```

- [ ] **Step 2: Commit**

```bash
git add lib/company-data.ts
git commit -m "feat: add company-data.ts — single source of truth for all PACPL content"
```

---

## Task 7: Utilities

**Files:**
- Create: `lib/utils.ts`
- Create: `hooks/use-scroll.ts`

- [ ] **Step 1: Create lib/utils.ts**

```ts
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 100000) return (n / 100000).toFixed(0) + "L";
  if (n >= 1000)   return (n / 1000).toFixed(0) + "K";
  return String(n);
}
```

- [ ] **Step 2: Create hooks/use-scroll.ts**

```ts
// hooks/use-scroll.ts
"use client";

import { useState, useEffect } from "react";

export function useScroll(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts hooks/use-scroll.ts
git commit -m "feat: add cn() utility and useScroll hook"
```

---

## Task 8: Lenis Smooth Scroll Provider

**Files:**
- Create: `providers/lenis-provider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create providers/lenis-provider.tsx**

```tsx
// providers/lenis-provider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update app/layout.tsx to include LenisProvider**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PACPL — India's #1 Bio-Bitumen Plant Setup Consultant",
  description:
    "PPS Anantams Corporation Pvt Ltd — 25 years of bitumen expertise, 9 plants commissioned, complete A-to-Z PMC consulting for bio-bitumen plant setup across India.",
  metadataBase: new URL("https://pacpl.in"),
  openGraph: {
    title: "PACPL — India's #1 Bio-Bitumen Plant Setup Consultant",
    description:
      "From land selection to commercial production. 9 plants commissioned, 25 years expertise, 18 states covered.",
    url: "https://pacpl.in",
    siteName: "PACPL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-black text-white antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify smooth scroll works**

```bash
npm run dev
```
Open `http://localhost:3000`. Scroll should feel slightly dampened/luxurious compared to native scroll.

- [ ] **Step 4: Commit**

```bash
git add providers/ app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider (lerp 0.08)"
```

---

## Task 9: Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```tsx
// components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { NAV_LINKS, COMPANY } from "@/lib/company-data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrolled = useScroll(60);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/7 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-black font-black text-sm">P</span>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              {COMPANY.shortName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 bg-gold text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-amber-400 transition-colors glow-gold"
            >
              Get Consultation
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-display font-bold text-white hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center bg-gold text-black font-bold px-6 py-4 rounded-full text-lg"
              >
                Get Free Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with scroll-aware blur and mobile menu"
```

---

## Task 10: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```tsx
// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { fadeUp, stagger, staggerFast } from "@/animations/variants";
import { HERO_IMAGE, STATS } from "@/lib/company-data";

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 95}%`,
  delay: `${(Math.random() * 3).toFixed(1)}s`,
  size: Math.random() > 0.7 ? "3px" : "2px",
}));

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Aerial view of Indian national highway"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_700px_at_50%_35%,rgba(245,158,11,0.07),transparent)] z-[2]" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle z-[3]"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="section-label">India&apos;s #1 Bio-Bitumen Consultant</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white mt-6 mb-6 leading-[0.9] tracking-tight"
        >
          {["The", "Future", "of", "Sustainable", "Roads"].map((word) => (
            <motion.span
              key={word}
              variants={fadeUp}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word === "Sustainable" ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From land selection to commercial production — PPS Anantams handles
          everything. 9 plants commissioned. 25 years of bitumen expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-gold text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider glow-gold hover:bg-amber-400 transition-colors"
            >
              Get Free Consultation
              <ChevronRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 glass text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/8 transition-colors"
            >
              Our Products
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass rounded-2xl px-4 py-4 text-center"
            >
              <p className="font-display font-black text-2xl md:text-3xl text-gold">
                {stat.value >= 1000
                  ? `${(stat.value / 1000).toFixed(0)}K`
                  : stat.value}
                {stat.suffix}
              </p>
              <p className="text-text-secondary text-xs mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with parallax bg, animated headline, stat cards"
```

---

## Task 11: Trust Bar

**Files:**
- Create: `components/TrustBar.tsx`

- [ ] **Step 1: Create components/TrustBar.tsx**

```tsx
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
          style={{
            background:
              "linear-gradient(to right, #0D1117, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10"
          style={{
            background:
              "linear-gradient(to left, #0D1117, transparent)",
          }}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/TrustBar.tsx
git commit -m "feat: add TrustBar with animated counters and logo marquee"
```

---

## Task 12: About Section

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create components/About.tsx**

```tsx
// components/About.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeUp, slideInLeft, slideInRight, stagger } from "@/animations/variants";
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
    <section
      id="about"
      className="py-32 px-6 bg-black"
    >
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
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About section with split layout, founder card, milestone timeline"
```

---

## Task 13: Products Section

**Files:**
- Create: `components/Products.tsx`

- [ ] **Step 1: Create components/Products.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Products.tsx
git commit -m "feat: add Products section with 3D tilt cards and animated gradient borders"
```

---

## Task 14: Technology Section (GSAP)

**Files:**
- Create: `components/Technology.tsx`

- [ ] **Step 1: Create components/Technology.tsx**

```tsx
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
      {/* Background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[20vw] text-white/[0.015] pointer-events-none select-none whitespace-nowrap"
      >
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
          <motion.span variants={fadeUp} className="section-label">
            The Technology
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            How <span className="text-gradient">Bio-Bitumen</span> is Made
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Four integrated stages convert agro-waste into commercial bio-bitumen
            for India&apos;s road network — all implementable with PACPL&apos;s proven process.
          </motion.p>
        </motion.div>

        {/* Desktop: horizontal flow with SVG line */}
        <div className="hidden lg:block relative mb-16">
          {/* SVG connector line */}
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
                  {/* Stage number + icon */}
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

                  {/* Stat */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Technology.tsx
git commit -m "feat: add Technology section with GSAP ScrollTrigger SVG line draw"
```

---

## Task 15: Sustainability Section

**Files:**
- Create: `components/Sustainability.tsx`

- [ ] **Step 1: Create components/Sustainability.tsx**

```tsx
// components/Sustainability.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animations/variants";
import { SUSTAINABILITY_STATS, SUSTAINABILITY_IMAGE } from "@/lib/company-data";

function ProgressRing({
  percent,
  color,
}: {
  percent: number;
  color: "green" | "gold";
}) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  const stroke = color === "green" ? "#22C55E" : "#F59E0B";

  return (
    <svg width="88" height="88" className="-rotate-90">
      <circle
        cx="44"
        cy="44"
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4"
        fill="none"
      />
      <motion.circle
        cx="44"
        cy="44"
        r={r}
        stroke={stroke}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
}

export default function Sustainability() {
  return (
    <section
      id="sustainability"
      className="py-32 px-6 bg-charcoal relative overflow-hidden"
    >
      {/* Green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(34,197,94,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label" style={{ color: "#22C55E" }}>
            Environmental Impact
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Building Roads,{" "}
            <span className="text-gradient-green">Protecting the Planet</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            India became the world&apos;s first country to commercially produce
            bio-bitumen (January 2026). PACPL holds CSIR-CRRI KrishiBind
            technology licence — one of only 14 companies in India.
          </motion.p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {SUSTAINABILITY_STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className="glass rounded-2xl p-8 text-center border border-border hover:border-green-border transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <ProgressRing
                  percent={i === 0 ? 80 : i === 1 ? 49 : 25}
                  color={stat.color as "green" | "gold"}
                />
              </div>
              <p
                className={`font-display font-black text-3xl md:text-4xl ${
                  stat.color === "green" ? "text-gradient-green" : "text-gradient"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-white font-semibold text-sm mt-2">{stat.label}</p>
              <p className="text-text-muted text-xs mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Earth image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative h-64 rounded-3xl overflow-hidden"
        >
          <Image
            src={SUSTAINABILITY_IMAGE}
            alt="Green landscape — environmental sustainability"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display font-black text-2xl md:text-4xl text-white text-center max-w-2xl px-6">
              Every ton of bio-bitumen saves{" "}
              <span className="text-gradient-green">₹3,000+</span> in import costs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Sustainability.tsx
git commit -m "feat: add Sustainability section with SVG progress rings and green glow"
```

---

## Task 16: Case Studies Section

**Files:**
- Create: `components/CaseStudies.tsx`

- [ ] **Step 1: Create components/CaseStudies.tsx**

```tsx
// components/CaseStudies.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Factory } from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { CASE_STUDIES } from "@/lib/company-data";

export default function CaseStudies() {
  return (
    <section id="projects" className="py-32 px-6 bg-black">
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
            Case Studies
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Projects That{" "}
            <span className="text-gradient">Shaped India&apos;s Roads</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real plants, real roads, real results. Here&apos;s what we&apos;ve built.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.div
              key={cs.id}
              variants={fadeUp}
              className="group bg-charcoal-2 border border-border rounded-2xl overflow-hidden hover:border-gold/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-2 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold-dim border border-gold-border rounded-full px-3 py-1">
                    {cs.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">
                  {cs.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-text-muted text-xs">
                    <MapPin size={11} className="text-green" />
                    {cs.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted text-xs">
                    <Factory size={11} className="text-gold" />
                    {cs.capacity}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {cs.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CaseStudies.tsx
git commit -m "feat: add CaseStudies section with masonry-style project cards"
```

---

## Task 17: Why Us — Bento Grid

**Files:**
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Create components/WhyUs.tsx**

```tsx
// components/WhyUs.tsx
"use client";

import { motion } from "framer-motion";
import {
  Award, Factory, Route, Network, BadgeCheck, TrendingUp,
} from "lucide-react";
import { fadeUp, stagger } from "@/animations/variants";
import { WHY_US_CARDS } from "@/lib/company-data";
import { cn } from "@/lib/utils";

const ICONS = { Award, Factory, Route, Network, BadgeCheck, TrendingUp } as const;
type IconName = keyof typeof ICONS;

export default function WhyUs() {
  return (
    <section className="py-32 px-6 bg-charcoal">
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
            Why Choose PACPL
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            The Difference That{" "}
            <span className="text-gradient">Matters Most</span>
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 auto-rows-[160px]"
        >
          {WHY_US_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon as IconName];
            return (
              <motion.div
                key={card.id}
                variants={fadeUp}
                className={cn(
                  "glass-strong rounded-2xl p-6 flex flex-col justify-between",
                  "border border-border hover:border-gold/20 transition-all duration-300 group",
                  "hover:glow-gold cursor-default",
                  card.size === "large" && "md:col-span-2 md:row-span-2",
                  card.size === "wide"  && "md:col-span-2"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-display font-bold text-white leading-snug",
                      card.size === "large" ? "text-2xl mb-2" : "text-sm mb-1"
                    )}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhyUs.tsx
git commit -m "feat: add WhyUs bento grid section with animated hover effects"
```

---

## Task 18: Testimonials Section

**Files:**
- Create: `components/Testimonials.tsx`

- [ ] **Step 1: Create components/Testimonials.tsx**

```tsx
// components/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp } from "@/animations/variants";
import { TESTIMONIALS } from "@/lib/company-data";

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div className="glass rounded-2xl p-6 w-80 flex-shrink-0 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="text-gold fill-gold" />
        ))}
      </div>
      <p className="text-text-secondary text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-white font-semibold text-sm">{t.name}</p>
        <p className="text-text-muted text-xs">{t.company} · {t.location}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 6);

  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-4">
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="flex gap-6 mb-6">
        <div className="flex gap-6 animate-marquee">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="flex gap-6">
        <div className="flex gap-6 animate-marquee-reverse">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: add Testimonials section with dual-row CSS marquee"
```

---

## Task 19: Contact Section

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create components/Contact.tsx**

```tsx
// components/Contact.tsx
"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { fadeUp, slideInLeft, slideInRight, stagger } from "@/animations/variants";
import { COMPANY, CAPACITY_OPTIONS } from "@/lib/company-data";

type FormData = {
  name: string;
  phone: string;
  email: string;
  capacity: string;
  message: string;
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Bio-Bitumen Plant Inquiry — ${data.capacity}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCapacity: ${data.capacity}\n\n${data.message}`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-muted focus:outline-none focus:border-gold/40 focus:bg-white/8 transition-all";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <section id="contact" className="py-32 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Contact</motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-4xl md:text-6xl text-white mt-4 mb-4"
          >
            Start Your{" "}
            <span className="text-gradient">Plant Journey</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-lg max-w-xl mx-auto">
            Free consultation. No commitment. Prince Shah personally reviews
            every inquiry.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form — col-span-3 */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle2 size={48} className="text-green" />
                <h3 className="font-display font-bold text-2xl text-white">
                  Thank you!
                </h3>
                <p className="text-text-secondary">
                  Your inquiry is being routed to{" "}
                  <span className="text-gold">{COMPANY.email}</span>. We&apos;ll
                  respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Full Name"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="Phone Number"
                      type="tel"
                      className={inputClass}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <input
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email Address"
                    type="email"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                <div>
                  <select
                    {...register("capacity", { required: "Please select a capacity" })}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Plant Capacity / Investment
                    </option>
                    {CAPACITY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-charcoal">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.capacity && <p className={errorClass}>{errors.capacity.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your project (optional)"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-amber-400 text-black font-bold py-4 rounded-xl text-sm uppercase tracking-wider glow-gold hover:opacity-90 transition-opacity"
                >
                  Get Free Consultation →
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info stack — col-span-2 */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Phone */}
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-0.5">Call us</p>
                <p className="text-white font-semibold text-sm">{COMPANY.phone}</p>
              </div>
            </div>

            {/* Email */}
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-0.5">Email</p>
                <p className="text-white font-semibold text-sm">{COMPANY.email}</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20PACPL%2C%20I%27m%20interested%20in%20bio-bitumen%20plant%20setup.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full bg-green text-black font-bold py-4 rounded-2xl text-sm glow-green hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </motion.a>

            {/* Address */}
            <div className="glass rounded-2xl p-5">
              <p className="text-text-muted text-xs mb-1">Operations</p>
              <p className="text-white text-sm font-medium">{COMPANY.address}</p>
              <p className="text-text-muted text-xs mt-2">{COMPANY.registered}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a
          href="#contact"
          className="flex items-center justify-center bg-gold text-black font-bold py-4 rounded-full text-sm uppercase tracking-wider glow-gold"
        >
          Get Free Consultation
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact section with glass form, WhatsApp CTA, sticky mobile button"
```

---

## Task 20: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
// components/Footer.tsx
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
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
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-black font-black text-sm">P</span>
              </div>
              <span className="font-display font-bold text-white text-lg">
                {COMPANY.shortName}
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              India&apos;s #1 Bio-Bitumen Plant Setup Consultant. From land
              selection to commercial production.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
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
          <p className="text-text-muted text-xs">Made in India</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add premium mega footer with 4-col layout"
```

---

## Task 21: Assemble Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with full homepage composition**

```tsx
// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Products from "@/components/Products";
import Technology from "@/components/Technology";
import Sustainability from "@/components/Sustainability";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Products />
        <Technology />
        <Sustainability />
        <CaseStudies />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run dev server and visually verify all 11 sections render**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- [ ] Hero fullscreen with image background and animated headline
- [ ] TrustBar counters animate on scroll into view
- [ ] About section split layout renders correctly
- [ ] Products 5 cards in responsive grid
- [ ] Technology 4-stage process, GSAP line draws on scroll
- [ ] Sustainability progress rings animate
- [ ] Case Studies 3 cards with image hover
- [ ] WhyUs bento grid renders
- [ ] Testimonials marquee scrolls automatically
- [ ] Contact form renders with all fields
- [ ] Footer 4-column layout

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all 11 sections"
```

---

## Task 22: Final Polish & Build Verification

**Files:**
- Modify: `app/globals.css` (add missing Tailwind color references if needed)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds. Note any warnings about image sizes — fix `sizes` props if needed.

- [ ] **Step 2: Fix any TypeScript or lint errors**

If `tsc --noEmit` reports errors, fix them before this step is complete.

- [ ] **Step 3: Check mobile layout at 375px**

In Chrome DevTools, set device to iPhone SE (375px). Verify:
- Navbar hamburger menu opens correctly
- Hero headline doesn't overflow at `text-5xl`
- Products cards stack to single column
- Contact form is usable
- Sticky mobile CTA appears at bottom

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: bio-bitumen homepage complete — all 11 sections, production build passing"
```

---

## Self-Review Notes

**Spec coverage check:**
- Section 1 Hero → Task 10 ✓
- Section 2 Trust Bar → Task 11 ✓
- Section 3 About → Task 12 ✓
- Section 4 Products → Task 13 ✓
- Section 5 Technology (GSAP) → Task 14 ✓
- Section 6 Sustainability → Task 15 ✓
- Section 7 Case Studies → Task 16 ✓
- Section 8 Why Us bento → Task 17 ✓
- Section 9 Testimonials → Task 18 ✓
- Section 10 Contact → Task 19 ✓
- Section 11 Footer → Task 20 ✓
- Navbar floating → Task 9 ✓
- Lenis smooth scroll → Task 8 ✓
- Design system tokens → Task 3 ✓
- Animation variants → Task 5 ✓
- Company data file → Task 6 ✓

**Type consistency check:**
- `STATS`, `PRODUCTS`, `PROCESS_STAGES`, `SUSTAINABILITY_STATS`, `CASE_STUDIES`, `WHY_US_CARDS`, `TESTIMONIALS`, `CAPACITY_OPTIONS` — all defined in Task 6, consumed identically in Tasks 10–20 ✓
- `ICONS` record uses `keyof typeof ICONS` as type guard — consistent in Tasks 14 and 17 ✓
- All animation variants use `Variants` from `framer-motion` — consistent ✓

**No placeholders:** All steps contain actual executable code. ✓
