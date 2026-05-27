// lib/company-data.ts

export const COMPANY = {
  name: "YUGA PMC",
  shortName: "YUGA PMC",
  cin: "U46632GJ2019PTC110676",
  gst: "24AAHCV1611L2ZD",
  phone: "+91 7795242424",
  whatsapp: "917795242424",
  email: "prince@pacpl.in",
  website: "www.pacpl.in",
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
  { value: 10,   suffix: "+", label: "Plants Commissioned", sub: "Across India" },
  { value: 25,   suffix: "+", label: "Years Expertise",     sub: "Since 2001" },
  { value: 4452, suffix: "+", label: "Industry Contacts",   sub: "Verified Network" },
  { value: 17,   suffix: "",  label: "States Covered",      sub: "Active Markets" },
] as const;

export const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "Consulting",  href: "/consulting" },
  { label: "IT Products", href: "/it-products" },
  { label: "Pyrolysis",   href: "/pyrolysis" },
  { label: "About",       href: "/about" },
  { label: "Contact",     href: "#contact" },
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
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
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
    title: "10 Plants Commissioned",
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
    title: "4,452 Industry Contacts",
    body: "2,758 contractors · 994 traders · 360 importers across 17 states.",
    icon: "Network",
    size: "wide",
  },
  {
    id: "certified",
    title: "CSIR-CRRI Certified",
    body: "Government-approved KrishiBind technology licence.",
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
      "YUGA PMC's end-to-end support was exceptional. From DPR to commissioning in 8 months — we couldn't have done it without Prince Shah's team.",
    name: "Rajesh Mehta",
    company: "Mehta Infra Pvt Ltd",
    location: "Gujarat",
  },
  {
    id: "t2",
    quote:
      "We were a pyrolysis operator with no bitumen knowledge. YUGA PMC converted our plant to bio-bitumen in 4 months. Now supplying to NHAI contractors.",
    name: "Suresh Patel",
    company: "GreenOil Industries",
    location: "Rajasthan",
  },
  {
    id: "t3",
    quote:
      "The NHAI vendor empanelment support was priceless. YUGA PMC's 4,452-contact network opened doors we didn't know existed.",
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
      "Prince Shah personally supervised our trial runs. That level of founder involvement is rare. Highly recommend YUGA PMC.",
    name: "Deepak Joshi",
    company: "Joshi Bitumen Works",
    location: "Madhya Pradesh",
  },
  {
    id: "t6",
    quote:
      "The regulatory support — PCB consents, factory licence, PESO — was handled entirely by YUGA PMC. Saved us months of delays.",
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
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85";
export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80";
export const SUSTAINABILITY_IMAGE =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80";

// ── Why Now ───────────────────────────────────────────────────────────────────

export const WHY_NOW = [
  {
    id: "wn1",
    number: "01",
    title: "India Goes First",
    body: "India became the FIRST country globally to commercially produce bio-bitumen (Jan 2026, Minister Gadkari).",
    stat: "Jan 2026",
    statLabel: "Historic Milestone",
  },
  {
    id: "wn2",
    number: "02",
    title: "CSIR-CRRI Transfer",
    body: "CSIR-CRRI transferred KrishiBind technology to 14 companies on 7 Jan 2026 — the window is open right now.",
    stat: "14",
    statLabel: "Licensees So Far",
  },
  {
    id: "wn3",
    number: "03",
    title: "₹4,500 Cr Savings",
    body: "Replacing 15–30% conventional bitumen with bio-oil saves India ₹4,500 Cr+ annually in petroleum imports.",
    stat: "₹4,500 Cr+",
    statLabel: "Annual Savings",
  },
  {
    id: "wn4",
    number: "04",
    title: "49% Import Dependency",
    body: "India imports 49% of its bitumen (₹25,000 Cr/yr). Government target: full replacement within 10 years.",
    stat: "₹25,000 Cr",
    statLabel: "Annual Imports",
  },
  {
    id: "wn5",
    number: "05",
    title: "130–216 Plants Needed",
    body: "India needs 130–216 bio-bitumen plants in 5–7 years. Most new entrants have ZERO bitumen expertise.",
    stat: "216",
    statLabel: "Plants Needed",
  },
] as const;

// ── Key Credentials ───────────────────────────────────────────────────────────

export const KEY_CREDENTIALS = [
  "BSE-Listed Founder — Omnipotent Industries (1.2L MT, 11 JVs)",
  "Int'l Import Contracts — 2.4 Lakh MT/yr VG-30 (Iraq/USA via Getka)",
  "Proven Consultant — 2 paid projects (Teknobit 2016 & 2024)",
  "5 Product Types — Emulsion / Blown / CRMB / PMB / VG30",
  "17-State Distribution — PAN India network, first of its kind",
  "Pride of India Award — Best Fast-Growing Business 2021",
  "Iran Consulate — Direct meeting for bitumen sourcing",
  "Bitumen India Forum — Founder Member",
] as const;

// ── Career Track ─────────────────────────────────────────────────────────────

export const CAREER_TRACK = [
  { year: 2001, company: "Southern Asphalt", location: "Mangalore, Karnataka", plantType: "Bitumen Emulsion Plant", role: "Employee (GM)" },
  { year: 2004, company: "Tiki Tar Industries", location: "Karnataka", plantType: "Blown Bitumen Plant", role: "Employee (GM)" },
  { year: 2008, company: "Tiki Tar Industries", location: "Karnataka", plantType: "CRMB Plant", role: "Employee (GM)" },
  { year: 2014, company: "Krush Tar Industries", location: "Karnataka", plantType: "Import Terminal + Emulsion (90 days)", role: "CEO — Own Venture" },
  { year: 2016, company: "Teknobit Industries", location: "Gujarat", plantType: "Bitumen Processing Plant", role: "Consultant" },
  { year: 2018, company: "Omnipotent Industries", location: "Panvel, Maharashtra", plantType: "Decanter + Warehousing", role: "Founder & MD" },
  { year: 2019, company: "Omnipotent Industries", location: "Vadodara, Gujarat", plantType: "Decanter + Warehousing", role: "Founder & MD" },
  { year: 2020, company: "Omnipotent Industries", location: "Kutch, Gujarat", plantType: "Decanter + Warehousing", role: "Founder & MD" },
  { year: 2024, company: "Teknobit Industries", location: "Mathura, UP", plantType: "Decanter Plant", role: "Consultant" },
  { year: 2026, company: "YOUR BIO-BITUMEN PLANT", location: "PAN India", plantType: "Pyrolysis + VG30 Blending", role: "Consultant" },
] as const;

// ── PMC Services ─────────────────────────────────────────────────────────────

export type PmcService = {
  id: string;
  category: string;
  icon: string;
  description: string;
  deliverables: string[];
};

export const PMC_SERVICES: PmcService[] = [
  {
    id: "feasibility",
    category: "Feasibility & DPR",
    icon: "ClipboardList",
    description: "Project feasibility studies, detailed project reports, financial modelling, ROI analysis, and land/site assessment before a single rupee is spent.",
    deliverables: ["Feasibility Report", "Detailed Project Report (DPR)", "Financial projections & ROI model", "Site assessment report"],
  },
  {
    id: "procurement",
    category: "Procurement Management",
    icon: "Wrench",
    description: "End-to-end vendor identification, RFQ preparation, quotation comparison, price negotiation, and purchase order management for machinery and materials.",
    deliverables: ["Vendor shortlist & scoring matrix", "Technical specifications", "Price benchmarking report", "PO tracking & follow-up"],
  },
  {
    id: "civil",
    category: "Civil & Construction Supervision",
    icon: "HardHat",
    description: "On-site supervision of civil works, structural fabrication, equipment foundations, and utility installation to ensure quality and schedule compliance.",
    deliverables: ["Daily/weekly site progress reports", "Quality inspection checklists", "Milestone MIS dashboard", "Snag list & close-out report"],
  },
  {
    id: "regulatory",
    category: "Regulatory Clearances",
    icon: "ScrollText",
    description: "Complete regulatory support from PCB NOC to factory license, fire safety NOC, MSME registration, and electricity/water connections.",
    deliverables: ["PCB / CPCB NOC", "Factory License (Factories Act)", "Fire NOC", "MSME Udyam Registration", "Electricity & water NOC"],
  },
  {
    id: "commissioning",
    category: "Commissioning & Training",
    icon: "Settings2",
    description: "Full plant commissioning including trial runs, quality calibration, operator training, and SOP documentation so your team runs the plant independently.",
    deliverables: ["Trial run report & sign-off", "Quality test certificates", "Operator training (classroom + hands-on)", "SOPs & maintenance manual"],
  },
  {
    id: "post-handover",
    category: "Post-Handover Support",
    icon: "Handshake",
    description: "Monthly retainer-based support: troubleshooting, market intelligence updates, buyer introductions, and process optimisation as the plant scales up.",
    deliverables: ["Monthly review calls", "Performance benchmarking", "Market intelligence updates", "Buyer/supplier introductions"],
  },
];

// ── Consulting Services ────────────────────────────────────────────────────────

export const CONSULTING_SERVICES: Record<string, string[]> = {
  Machinery: ["Verified vendor shortlisting", "Best pricing negotiation", "Procurement supervision", "Installation oversight", "Commissioning & trial run"],
  Setup: ["Site selection & layout", "Civil & electrical planning", "Utility arrangements", "Safety & fire compliance", "Pollution Control Board NOC"],
  Training: ["Plant operator training", "Quality testing procedures", "Bitumen grading knowledge", "Safety protocols", "Maintenance schedules"],
  "Market Data": ["Demand-supply analysis", "Pricing benchmarks", "Competitor mapping", "NHAI project pipeline", "State PWD tender info"],
  "Buyer/Seller Network": ["2,758 road contractors", "994 bitumen traders", "360 importers", "84 manufacturers", "NHAI/PWD direct links"],
  "Supply Chain": ["Agro-waste procurement", "Farmer aggregator setup", "VG-30 int'l supply", "Logistics optimization", "Seasonal planning"],
};

// ── Target Audiences ──────────────────────────────────────────────────────────

export type TargetAudience = {
  id: string;
  type: string;
  stages: string;
  investment: string;
  feeDpr: string;
  feeSetup: string;
  feeRetainer: string;
  keyServices: string[];
};

export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: "new-investor",
    type: "New Investor",
    stages: "ALL 4 STAGES",
    investment: "Rs 2–6 Cr",
    feeDpr: "Rs 3–5L",
    feeSetup: "Rs 15–25L",
    feeRetainer: "Rs 1–2L/month",
    keyServices: ["Complete A-to-Z plant setup from SCRATCH", "Land identification & site selection", "All regulatory clearances", "Machinery procurement", "Hiring & training", "Sales support: 2,758 contractors + NHAI"],
  },
  {
    id: "existing-bitumen",
    type: "Existing Bitumen Company",
    stages: "STAGE 1–2",
    investment: "Rs 80L–2 Cr",
    feeDpr: "Rs 3–5L",
    feeSetup: "Rs 10–15L",
    feeRetainer: "Rs 1L/month",
    keyServices: ["Raw material sourcing: farmer aggregator network", "Pelletization unit design", "Pyrolysis reactor commissioning", "Blending ratio calibration (15–30%)", "CSIR-CRRI specification compliance"],
  },
  {
    id: "pyrolysis-operator",
    type: "Existing Pyrolysis Operator",
    stages: "STAGE 3–4",
    investment: "Rs 40–80L",
    feeDpr: "Rs 2–3L",
    feeSetup: "Rs 8–12L",
    feeRetainer: "Rs 1–2L/month",
    keyServices: ["Bio-oil oxidation & upgrading (230–250°C)", "VG-30 supply for blending", "Blending unit setup", "NHAI specification compliance", "Market access: 2,758 contractors + 994 traders"],
  },
  {
    id: "biomass-manufacturer",
    type: "Biomass Pellet Manufacturer",
    stages: "STAGE 2–3–4",
    investment: "Rs 1–2 Cr",
    feeDpr: "Rs 3–5L",
    feeSetup: "Rs 12–18L",
    feeRetainer: "Rs 1–2L/month",
    keyServices: ["Pyrolysis reactor selection", "Bio-oil extraction & quality optimization", "Blending with VG-30", "NHAI/MoRTH certification", "Complete market linkage: 2,758 contractors + 360 importers"],
  },
  {
    id: "agro-processor",
    type: "Agro-Processor / Farmer Coop",
    stages: "ALL 4 STAGES",
    investment: "Rs 1.5–4 Cr",
    feeDpr: "Rs 3–5L",
    feeSetup: "Rs 15–25L",
    feeRetainer: "Rs 1–2L/month",
    keyServices: ["Raw material at zero/low cost — HIGHEST MARGIN", "Complete plant design: pelletization + pyrolysis + blending", "All regulatory clearances", "Government subsidy guidance (MNRE, Waste-to-Wealth)", "Full sales support"],
  },
];

// ── IT Services ───────────────────────────────────────────────────────────────

export type ItService = {
  id: string;
  name: string;
  icon: string;
  description: string;
  example: string;
  tags: string[];
};

export const IT_SERVICES: ItService[] = [
  {
    id: "portals",
    name: "Consultant & Client Portals",
    icon: "Monitor",
    description: "Custom web portals for consultants and clients — dashboards, document management, project stage tracking, communication logs, and payment milestone tracking.",
    example: "Bio-bitumen consultant portal: client onboarding, 4-stage project tracker, document uploads, payment milestones, WhatsApp integration.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "plant-dashboard",
    name: "Plant Management Dashboards",
    icon: "BarChart3",
    description: "Real-time production tracking: daily output, raw material consumption, quality test results, cost-per-unit analytics, and dispatch logs.",
    example: "Pyrolysis plant dashboard: live bio-oil yield tracking, reactor temperature logs, biomass inventory, dispatch MIS, daily shift reports.",
    tags: ["Data visualisation", "REST APIs", "Real-time updates"],
  },
  {
    id: "supply-chain",
    name: "Supply Chain & Vendor Systems",
    icon: "Link",
    description: "Vendor management portals, procurement tracking, price comparison dashboards, and purchase order automation for industrial supply chains.",
    example: "Bitumen import tracking: vessel tracking, SGS certificates, LC document management, payment schedule alerts.",
    tags: ["Workflow automation", "Document management", "Notifications"],
  },
  {
    id: "market-intel",
    name: "Market Intelligence Tools",
    icon: "TrendingUp",
    description: "Competitor price tracking, demand-supply analysis, NHAI project pipeline monitors, and buyer/seller matching tools for industrial markets.",
    example: "Bitumen price tracker: daily prices from 17 states, competitor mapping, margin calculator, tender alert notifications.",
    tags: ["Data aggregation", "Pricing intelligence", "Email/SMS alerts"],
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps for Plant Operations",
    icon: "Smartphone",
    description: "Field-ready mobile apps for plant supervisors: shift reports, quality test entry, safety checklists, incident logging, photo uploads — offline-capable.",
    example: "Plant supervisor app: shift report entry, dispatch log, quality check form, safety incident with photo evidence upload.",
    tags: ["Progressive Web App", "Offline-capable", "iOS & Android"],
  },
];

// ── Pyrolysis Data ────────────────────────────────────────────────────────────

export type PyrolysisFeedstock = {
  id: string;
  name: string;
  icon: string;
  description: string;
  indiaVolume: string;
  highlight: string;
  image: string;
};

export const PYROLYSIS_FEEDSTOCKS: PyrolysisFeedstock[] = [
  {
    id: "agro",
    name: "Agricultural Biomass",
    icon: "🌾",
    description: "Rice husk, sugarcane bagasse, cotton stalk, wheat straw, coconut shell, and wood waste from India's vast agro-processing sector.",
    indiaVolume: "750 million MT/year available (MNRE estimate)",
    highlight: "Rice straw: 100–120 MT/yr · Bagasse: 130–150 MT/yr · Coconut shell: 5 MT/yr",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  },
  {
    id: "plastic",
    name: "Plastic Waste",
    icon: "♻️",
    description: "LDPE, HDPE, PP, and mixed plastics from packaging, bottles, and films. India's plastic waste is growing — only 8% is formally recycled.",
    indiaVolume: "15.5 million MT/year generated across India",
    highlight: "LDPE yields 93% pyrolysis oil · Plastic oil has >40 MJ/kg — diesel equivalent",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
  },
  {
    id: "tyres",
    name: "End-of-Life Tyres",
    icon: "🚗",
    description: "Scrap tyres from cars, trucks, and heavy machinery. EPR regulations now mandate formal recycling — creating a guaranteed feedstock supply.",
    indiaVolume: "2.5 million MT/year generated; additional 1.8 MT imported for recycling",
    highlight: "1,000 kg of tyres → 450 L fuel oil + 330 kg carbon black + 125 kg syngas",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
  },
  {
    id: "msw",
    name: "Municipal Solid Waste",
    icon: "🏙️",
    description: "The combustible, non-organic fraction (RDF) from urban waste — plastics, paper, and textiles — suitable for thermal pyrolysis.",
    indiaVolume: "1,50,000–1,70,000 tonnes/day generated across Indian cities",
    highlight: "Swachh Bharat Mission actively supports Waste-to-Energy conversion pathways",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export type PyrolysisOutput = {
  id: string;
  name: string;
  icon: string;
  yieldRange: string;
  heatingValue: string;
  uses: string[];
  colorClass: string;
};

export const PYROLYSIS_OUTPUTS: PyrolysisOutput[] = [
  {
    id: "bio-oil",
    name: "Bio-Oil / Pyrolysis Oil",
    icon: "🛢️",
    yieldRange: "60–70% of dry biomass weight (fast pyrolysis)",
    heatingValue: "14–18 MJ/kg as-produced; upgradeable to 35 MJ/kg",
    uses: ["Industrial boiler & furnace fuel", "Bio-bitumen feedstock for roads", "Chemical extraction (phenols, acetic acid)", "Diesel blending after hydrotreatment"],
    colorClass: "border-amber-500/30 bg-amber-500/5",
  },
  {
    id: "biochar",
    name: "Bio-Char / Charcoal",
    icon: "⚫",
    yieldRange: "25–35% of biomass (slow pyrolysis optimised for char)",
    heatingValue: "28–32 MJ/kg — comparable to sub-bituminous coal",
    uses: ["Soil amendment & carbon sequestration", "Charcoal briquettes for industry & export", "Activated carbon precursor", "Industrial process fuel"],
    colorClass: "border-slate-500/30 bg-slate-500/5",
  },
  {
    id: "syngas",
    name: "Syngas (Producer Gas)",
    icon: "💨",
    yieldRange: "10–20% of biomass; 60–80% in flash pyrolysis",
    heatingValue: "4–18 MJ/Nm³ depending on feedstock and temperature",
    uses: ["Recirculated to heat the reactor (self-sufficient)", "Power generation via gas engines/turbines", "BioCNG production under SATAT scheme", "Fischer-Tropsch chemical synthesis"],
    colorClass: "border-blue-500/30 bg-blue-500/5",
  },
  {
    id: "carbon-black",
    name: "Carbon Black (Tyre)",
    icon: "🖤",
    yieldRange: "~330 kg per tonne of waste tyres processed",
    heatingValue: "~32 MJ/kg; rCB replaces virgin grades N330/N550/N660",
    uses: ["Rubber & tyre manufacturing reinforcement", "Printing inks & pigments", "Plastic compounding & UV protection", "Asphalt & concrete filler"],
    colorClass: "border-zinc-500/30 bg-zinc-500/5",
  },
  {
    id: "fuel-oil",
    name: "Pyrolysis Fuel Oil (Plastic)",
    icon: "⛽",
    yieldRange: "600–930 litres per tonne of plastic input",
    heatingValue: ">40 MJ/kg — diesel-equivalent calorific value",
    uses: ["Industrial diesel substitute for boilers & generators", "Blending with conventional diesel (up to 30%)", "Shipping & marine fuel (blended)", "Petrochemical cracker feedstock"],
    colorClass: "border-yellow-500/30 bg-yellow-500/5",
  },
];

export type PyrolysisProduct = {
  id: string;
  name: string;
  icon: string;
  description: string;
  stat: string;
  statLabel: string;
};

export const PYROLYSIS_PRODUCTS: PyrolysisProduct[] = [
  {
    id: "bio-bitumen",
    name: "Bio-Bitumen / Bio-Asphalt",
    icon: "🛣️",
    description: "Replaces 15–30% of petroleum bitumen in road construction. India became the first country globally to commercially produce bio-bitumen (Jan 2026, CSIR-CRRI + Ministry Gadkari).",
    stat: "70%",
    statLabel: "Lower GHG Emissions",
  },
  {
    id: "activated-carbon",
    name: "Activated Carbon",
    icon: "🔬",
    description: "High-surface-area carbon (500–1,500 m²/g) produced by activating biochar. Used in water treatment, air purification, gold recovery, and pharmaceuticals.",
    stat: "USD 241M",
    statLabel: "India Market (2024)",
  },
  {
    id: "briquettes",
    name: "Charcoal Briquettes",
    icon: "🔥",
    description: "Uniform high-energy briquettes (28–32 MJ/kg). Used in industrial kilns, hookah/shisha export, restaurant BBQ, and rural cooking fuel.",
    stat: "USD 8B",
    statLabel: "India Charcoal Market",
  },
  {
    id: "rcb",
    name: "Recovered Carbon Black (rCB)",
    icon: "⚫",
    description: "Processed rCB from tyre pyrolysis replaces virgin carbon black grades N330, N550, N660 in rubber, tyres, plastics, and printing inks.",
    stat: "2.5M MT",
    statLabel: "Annual Import Replaced",
  },
  {
    id: "biocng",
    name: "Alternative Fuels (BioCNG)",
    icon: "⚡",
    description: "Plastic pyrolysis oil as industrial diesel substitute; syngas-derived BioCNG under SATAT scheme; tyre pyrolysis oil for cement kilns and power generation.",
    stat: "5,000 MW",
    statLabel: "India W2E Potential",
  },
];
