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
  { label: "About",       href: "#about" },
  { label: "Products",    href: "#products" },
  { label: "Technology",  href: "#technology" },
  { label: "Projects",    href: "#projects" },
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
      "The regulatory support — PCB consents, factory licence, PESO — was handled entirely by PACPL. Saved us months of delays.",
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
