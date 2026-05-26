# Bio-Bitumen Homepage — Design Spec
**Date:** 2026-05-26  
**Project:** `D:\rahul\project-1`  
**Company:** PPS Anantams Corporation Private Limited (PACPL)  
**Brand:** PACPL / Prince Pratap Shah  
**Scope:** Homepage only (Phase 1). Inner pages are Phase 2.

---

## 1. Goals

Build a world-class, cinematic, highly animated homepage for PACPL — India's #1 Bio-Bitumen Plant Setup Consultant. The site must instantly communicate:

- **Trust** — 25 years, 9 plants, BSE-listed founder
- **Innovation** — India's first bio-bitumen technology (CSIR-CRRI, Jan 2026)
- **Scale** — national reach, ₹25,000 Cr market
- **Premium service** — A-to-Z PMC consulting

Target audience: new plant investors, existing bitumen companies, pyrolysis operators, government bodies, NHAI contractors.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG-friendly, great image optimization |
| Language | TypeScript strict | All props typed, no `any` |
| Styling | Tailwind CSS v4 | Design tokens in `@theme`, no config file |
| Components | shadcn/ui | Form + button primitives only |
| Animation | Framer Motion 11 | Component lifecycle, reveal, hover |
| Scroll animation | GSAP 3 + ScrollTrigger | Technology section only (precise timeline scrub) |
| Smooth scroll | Lenis 1.x | Global smooth scroll, replaces native |
| Tilt effects | `react-parallax-tilt` | Product cards only |
| Fonts | Inter + Satoshi | Self-hosted woff2 in `public/fonts/` |
| Images | Unsplash CDN placeholders | Swap with real photos in Phase 2 |
| Forms | react-hook-form | Contact form validation |
| Counters | react-countup | Trust bar animated numbers |

**Excluded:** Three.js (replaced with CSS radial glow + particle dots — 150KB bundle saving with no perceptible visual difference on a marketing page).

---

## 3. Design System

### 3.1 Color Tokens (defined in `globals.css @theme`)

```css
--color-black:        #050508   /* page background */
--color-white:        #F8FAFC   /* primary text */
--color-charcoal:     #0D1117   /* section surface */
--color-charcoal-2:   #161B22   /* card surface */
--color-green:        #22C55E   /* bio / eco / sustainability */
--color-gold:         #F59E0B   /* CTA / energy / primary accent */
--color-gold-dim:     rgba(245,158,11,0.15)
--color-gold-border:  rgba(245,158,11,0.30)
--color-border:       rgba(255,255,255,0.07)
--color-glass:        rgba(255,255,255,0.04)
```

### 3.2 Typography

```css
--font-display: 'Satoshi', system-ui, sans-serif   /* all headings */
--font-sans:    'Inter', system-ui, sans-serif      /* body + UI */
```

Scale:
- Hero headline: `text-6xl md:text-8xl lg:text-9xl` font-black
- Section heading: `text-4xl md:text-6xl` font-bold
- Subheading: `text-xl md:text-2xl` font-medium
- Body: `text-base md:text-lg` font-normal
- Label: `text-xs font-bold uppercase tracking-[0.2em]`

### 3.3 Spacing

- Section: `py-32 px-6` desktop · `py-20 px-4` mobile
- Container: `max-w-7xl mx-auto`
- Card gap: `gap-6` standard · `gap-8` large grids

### 3.4 Radius

- `rounded-2xl` — standard cards
- `rounded-3xl` — hero glass cards, large containers
- `rounded-full` — buttons, badges, pills

### 3.5 Glass Utility

```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
```

### 3.6 Shadow

- `shadow-[0_0_40px_rgba(245,158,11,0.15)]` — gold glow (CTAs)
- `shadow-[0_0_60px_rgba(34,197,94,0.10)]` — green glow (sustainability)
- `shadow-2xl` — standard card elevation

---

## 4. Animation System

All presets live in `animations/variants.ts`. Never define one-off variants inline.

### Framer Motion Presets

```ts
fadeUp:      { hidden: { opacity:0, y:40 }, visible: { opacity:1, y:0, transition:{ duration:0.6, ease:[0.16,1,0.3,1] } } }
fadeIn:      { hidden: { opacity:0 },        visible: { opacity:1, transition:{ duration:0.5 } } }
scaleIn:     { hidden: { opacity:0, scale:0.92 }, visible: { opacity:1, scale:1, transition:{ duration:0.5, ease:[0.16,1,0.3,1] } } }
stagger:     { visible: { transition: { staggerChildren: 0.10 } } }
staggerFast: { visible: { transition: { staggerChildren: 0.06 } } }
```

Rules:
- All scroll reveals: `whileInView` + `viewport={{ once:true, amount:0.2 }}`
- Max duration: 0.6s entrances · 0.2s hover/micro
- Only animate `transform` + `opacity` — never `width`, `height`, `margin`
- `"use client"` required on any component using Framer Motion

### GSAP Usage (Technology section only)

- Import dynamically: `const gsap = (await import('gsap')).default`
- Register ScrollTrigger in `useEffect`, kill on cleanup
- Animates SVG path `strokeDashoffset` (line drawing between process stages)
- Each stage card pins for 200px of scroll, then releases

### Lenis

- Initialized in `app/layout.tsx` via a `<LenisProvider>` client component
- `lerp: 0.08` (slightly slow, premium feel)
- Synced with Framer Motion via `lenis.on('scroll', ScrollTrigger.update)`

---

## 5. File Structure

```
project-1/
├── app/
│   ├── layout.tsx           ← RootLayout: fonts, Lenis, metadata
│   ├── page.tsx             ← HomePage: composes 11 sections
│   ├── globals.css          ← @theme tokens, base styles, utilities
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx           ← Floating, blur+border on scroll
│   ├── Hero.tsx
│   ├── TrustBar.tsx
│   ├── About.tsx
│   ├── Products.tsx
│   ├── Technology.tsx
│   ├── Sustainability.tsx
│   ├── CaseStudies.tsx
│   ├── WhyUs.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── button.tsx       ← shadcn
│       ├── input.tsx        ← shadcn
│       ├── textarea.tsx     ← shadcn
│       └── select.tsx       ← shadcn
├── animations/
│   ├── variants.ts          ← Framer Motion variant presets (above)
│   └── transitions.ts       ← Reusable transition objects
├── lib/
│   ├── company-data.ts      ← ALL PACPL content (source of truth)
│   └── utils.ts             ← cn() + helpers
├── hooks/
│   └── use-scroll.ts        ← scroll position + direction
├── public/
│   └── fonts/               ← Satoshi woff2 files
├── next.config.ts
├── tailwind.config.ts       ← empty (v4 uses @theme in CSS)
├── tsconfig.json
└── package.json
```

---

## 6. Section Specifications

### Section 1: Hero

**Layout:** Fullscreen `min-h-[100dvh]`, `position:relative`, overflow hidden.

**Background:**
- Unsplash aerial highway image: `https://images.unsplash.com/photo-1545558014-8692077e9b5c` (or similar), `next/image` with `fill` + `object-cover`
- Dark overlay: `bg-gradient-to-b from-black/80 via-black/60 to-black`
- CSS radial glow: `radial-gradient(ellipse 800px 600px at 50% 40%, rgba(245,158,11,0.08), transparent)` — behind headline

**Particles:** 20–30 small CSS dots (`position:absolute`, random placement via inline style, `animate-pulse` with varied delays). No JavaScript particle library.

**Content (centered, `max-w-4xl mx-auto`):**
- Section eyebrow: `INDIA'S #1 BIO-BITUMEN CONSULTANT` — gold label
- H1: `"The Future of Sustainable Roads"` — Satoshi, 72px+, white, word-by-word stagger (`staggerFast` variant)
- Subheadline: `"From land selection to commercial production — PPS Anantams handles everything. 9 plants commissioned. 25 years of bitumen expertise."` — slate-300, 20px
- CTA row: Gold filled button `"Get Free Consultation"` + glass outline button `"Download Brochure"` (both `rounded-full`, magnetic hover via Framer Motion `whileHover scale:1.04`)
- Scroll indicator: animated chevron, `animate-bounce`

**Floating stat cards** (3 cards, absolute positioned bottom-left area):
- `9 Plants Commissioned` · `25+ Years Expertise` · `18 States Covered`
- Glass style, `fadeUp` stagger with 0.3s delay after headline

**Navbar** overlays the hero (transparent → blur on scroll).

---

### Section 2: Trust Bar

**Layout:** Full-width, `bg-charcoal`, `py-20`.

**Part A — Counters (4 items, horizontal):**
| Stat | Value | Suffix | Label |
|---|---|---|---|
| Plants Commissioned | 9 | + | Across India |
| Years in Industry | 25 | + | Since 2001 |
| Pan-India Network | 150,000 | + | Verified Contacts |
| States Covered | 18 | | Active Markets |

`react-countup` with `enableScrollSpy`. Gold numbers, white labels.

**Part B — Logo ticker:**
- CSS `@keyframes marquee` infinite scroll
- 8 placeholder company/cert logos (SVG text placeholders: BIS, NHAI, CSIR, MNRE, MoRTH, ISO, BSE, CSIR-CRRI)
- Gradient fade on left/right edges

---

### Section 3: About

**Layout:** 2-col `lg:grid-cols-2 gap-16`, `py-32`.

**Left col:**
- Gold section label: `WHO WE ARE`
- H2: `"India's Most Trusted Bio-Bitumen Consultant"`
- 2 paragraphs from `WEBSITE_CONTENT.txt` About section
- Founder card: photo placeholder (Unsplash portrait) + name `Prince Pratap Shah` + title `Founder & MD` + `BSE-Listed · DIN 06680837` badge
- Key facts list with Lucide `CheckCircle2` icons (gold)

**Right col:**
- Large Unsplash industrial/refinery image, `rounded-3xl overflow-hidden`
- `whileInView` scale from `0.95→1` on the image wrapper
- Overlaid glass card bottom-right: `"Pride of India Icon 2021"` badge

**Timeline** (below the 2-col, full-width):
- Horizontal on desktop, vertical on mobile
- 5 milestones: 2001 · 2009 · 2020 · 2024 · 2026
- Each node: year (gold) + short event label
- Animated line connecting nodes (CSS `scaleX` from 0→1 on `whileInView`)

---

### Section 4: Products

**Layout:** `py-32 bg-black`.

**Header:** Section label `OUR PRODUCTS` + H2 `"Complete Bio-Bitumen Product Range"` + subtext.

**Product cards grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` — 5 cards (last row centered).

**Each card (via `react-parallax-tilt`):**
- Dark glass card `bg-charcoal-2 border border-white/7 rounded-2xl p-6`
- Animated gradient border on hover (`conic-gradient` cycling via CSS `@keyframes`)
- Product name (H3, white, bold)
- Short description (2 lines, slate-300)
- 3–4 spec chips: `rounded-full bg-white/5 border border-white/10 text-xs px-3 py-1`
- Bottom row: gold `Download Brochure` ghost button + green `Learn More` link
- `stagger` variant, `whileInView`

**Products:**
1. Bio-Modified VG-30 — 15–30% bio-oil blend, CSIR-CRRI certified
2. CRMB (Crumb Rubber Modified) — enhanced durability, cold resistance
3. PMB (Polymer Modified) — high-traffic highways, bridges
4. Bitumen Emulsion — spray applications, surface dressing
5. Blown Bitumen — industrial waterproofing, roofing

---

### Section 5: Technology

**Layout:** `py-32 bg-charcoal`. Full-width. GSAP section.

**Header:** `H2 "How Bio-Bitumen is Made"` + animated subtext.

**Background:** Large Unsplash pyrolysis/industrial image, `position:sticky top:0`, `opacity:0.15`, creates depth.

**4-stage flow:**
Each stage is a full-width card that fades in as user scrolls into its ScrollTrigger zone.

| Stage | Title | Temp/Detail | Icon |
|---|---|---|---|
| 01 | Raw Material & Pelletization | Agro-waste → 6mm pellets | Layers |
| 02 | Pyrolysis & Bio-Oil Extraction | 450–550°C, anaerobic | Flame |
| 03 | Refining & Blending | 15–30% bio-oil + VG-30 | FlaskConical |
| 04 | Testing & NHAI Certification | BIS/NABL quality labs | BadgeCheck |

**SVG connector line** runs vertically (desktop) / horizontally (mobile) between stages. GSAP animates `strokeDashoffset` from 100%→0 as the section scrolls through.

**Stats strip below:** `20–25% Bio-Oil Yield` · `450–550°C Process Temp` · `15–30% Bitumen Replacement` · `6 months post-commissioning support`.

---

### Section 6: Sustainability

**Layout:** `py-32 bg-black` with green radial glow `rgba(34,197,94,0.06)` behind content.

**Header:** Section label `ENVIRONMENTAL IMPACT` + H2 `"Building Roads, Protecting the Planet"`.

**3 impact cards (horizontal):**
- `₹4,500 Cr+` saved annually (bitumen import reduction)
- `49%` bitumen import replaced (govt. 10-year target)
- `25%` capital subsidy (MNRE Waste-to-Wealth Mission)

Each card: large number (green, Satoshi bold), label below, animated SVG radial progress ring (Framer Motion `pathLength` 0→target value, triggered `whileInView`).

**Copy block:** Short paragraph about CSIR-CRRI KrishiBind technology transfer (Jan 7 2026), India being the first country to commercially produce bio-bitumen.

**Earth visual:** Unsplash aerial green landscape image, full-width, `h-64`, `object-cover`, dark overlay, parallax scroll.

---

### Section 7: Case Studies

**Layout:** `py-32 bg-charcoal`.

**Header + filter tabs:** `All · Highway · Urban · Industrial` — Framer Motion `layoutId` animated underline.

**Cards grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`, masonry feel via different card heights.

**Each card:**
- Unsplash project image (road/highway/construction), `h-56 object-cover rounded-t-2xl`
- Card body: project name, state badge (green pill), plant capacity badge (gold pill), 1-line outcome
- Hover: image scales 1.05, bottom overlay slides up with more detail
- `whileInView fadeUp stagger`

**3 sample projects:**
1. `National Highway 48 Upgrade` — Gujarat · 30 MT/Day · 40km resurfaced
2. `Urban Road Renewal` — Maharashtra · 20 MT/Day · 850 tonnes supplied
3. `Industrial Access Road` — Rajasthan · 15 MT/Day · Client: Existing bitumen operator

---

### Section 8: Why Choose Us

**Layout:** `py-32 bg-black`.

**Bento grid:** `grid-cols-2 md:grid-cols-4` with varying `col-span` values.

**6 cards:**

| Size | Title | Icon | Body |
|---|---|---|---|
| `col-span-2 row-span-2` (large) | 25 Years Expertise | Award | Since 2001, across 18 states |
| `col-span-1` | 9 Plants Commissioned | Factory | All delivered on time |
| `col-span-1` | A-to-Z PMC | Route | Land to commercial production |
| `col-span-2` | 150,000 Contact Network | Network | Buyers, contractors, traders |
| `col-span-1` | CSIR-CRRI Certified | BadgeCheck | Government-approved technology |
| `col-span-1` | BSE-Listed Founder | TrendingUp | Omnipotent Industries Ltd IPO 2020 |

Each card: `bg-charcoal-2 border border-white/7 rounded-2xl p-6`, icon (Lucide, gold 28px), title (H3 white), body (slate-400 small). Hover: `border-gold/30 shadow-gold-glow` transition.

---

### Section 9: Testimonials

**Layout:** `py-32 bg-charcoal overflow-hidden`.

**Double-row marquee** (CSS `@keyframes marquee`, row 1 left, row 2 right — creates dynamic feel). Pauses on `hover`.

**6 quote cards (glass style):**
- Quote text (italic, slate-200)
- Reviewer name (white bold)
- Company + state (gold, small)
- 5 gold stars (Lucide `Star` fill)

Cards are `w-80 flex-shrink-0`. Sample content from WEBSITE_CONTENT.txt testimonials or plausible stand-ins.

---

### Section 10: Contact

**Layout:** `py-32 bg-black`. 2-col `lg:grid-cols-5`.

**Left col (`lg:col-span-3`) — Glass form:**
- Heading: `"Start Your Plant Journey"`
- Subtext: `"Free consultation. No commitment."`
- Fields: Full Name · Phone Number · Email Address · Plant Capacity (Select: 5MT/10MT/15MT/20MT/25MT/30MT/50MT+) · Message
- Submit: full-width gold gradient button `"Get Free Consultation →"`
- `react-hook-form` validation, `mailto:sales@princeshah.com` action
- Glass card wrapper: `bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-8`

**Right col (`lg:col-span-2`) — Info stack:**
- Contact card: Phone `+91 7795242424` (Lucide Phone icon)
- Email card: `sales@princeshah.com`
- WhatsApp CTA: large green button `"Chat on WhatsApp"` with `wa.me/917795242424` link and green glow
- Office: Vadodara, Gujarat
- Sticky CTA button (fixed bottom-right, mobile only): `"Get Free Consultation"` gold pill

---

### Section 11: Footer

**Layout:** `bg-charcoal border-t border-white/7`.

**Top section (4-col grid `py-16`):**
| Col | Content |
|---|---|
| Brand (col-span-1) | PACPL logo + tagline `"India's #1 Bio-Bitumen Consultant"` + short about text + social icons |
| Quick Links | Home, About, Products, Technology, Sustainability, Projects |
| Services | DPR & Feasibility, Land Selection, Machinery Procurement, Licensing, Market Access |
| Contact | Address, phone, email, WhatsApp link |

**Bottom bar (`py-6 border-t border-white/7`):**
- Left: `© 2026 PPS Anantams Corporation Pvt Ltd · CIN U46632GJ2019PTC110676`
- Right: `Made in India 🇮🇳` + certification badges (BIS, NHAI, CSIR text pills)

---

### Navbar

**Behavior:** Fixed top. Transparent + no border on hero overlap → `bg-black/70 backdrop-blur-xl border-b border-white/7` on scroll (via `useScroll` + `useTransform`).

**Content:** PACPL logo (left) · nav links (center, hidden on mobile) · `"Get Consultation"` gold button (right) · hamburger menu (mobile).

**Links:** Home · About · Products · Technology · Projects · Contact

---

## 7. Performance & SEO

- All images via `next/image` with `sizes` prop
- GSAP imported dynamically (client-side only, no SSR)
- Lenis initialized only in browser (`typeof window !== 'undefined'`)
- `metadata` export on `app/layout.tsx`: title, description, OG image, canonical `https://pacpl.in`
- Section `id` attributes for anchor nav: `#hero #about #products #technology #sustainability #projects #why-us #contact`
- `loading="lazy"` on all below-fold images

---

## 8. Content Source

All business content (stats, product names, founder info, process stages, contact details) comes from:
- `lib/company-data.ts` — single source of truth
- Sourced from `D:\rahul\bio biitumen\WEBSITE_CONTENT.txt`

No content is hardcoded in component JSX.

---

## 9. Out of Scope (Phase 1)

- Inner pages (About, Products detail, Pyrolysis, Contact standalone, Services)
- CMS / Sanity integration
- Blog
- Multi-language
- Analytics (GA4 can be added in 1 line post-launch)
- Real video assets (hero uses image + CSS effects)
- Three.js

---

## 10. Success Criteria

- [ ] Lighthouse Performance ≥ 85 on desktop
- [ ] All 11 sections render with no layout shift
- [ ] Animations run at 60fps (no jank on mid-range laptop)
- [ ] Mobile layout fully usable at 375px
- [ ] Contact form submits without error
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] All images have meaningful `alt` text
