# YUGA PMC Site Audit Report
**Date:** 2026-05-27  
**Site:** https://pacpltradingdesk-dotcom.github.io/yuga-pmc-live/  
**Build:** commit `50606f8` (deployed, pending GitHub Pages propagation)

---

## Summary

| Severity | Count |
|----------|-------|
| HIGH     | 1     |
| MEDIUM   | 1     |
| LOW      | 1     |
| OK       | 11    |

---

## Bugs

### [HIGH] Logo not loading
- **What:** Navbar and footer logo returns 404
- **URL hitting:** `https://pacpltradingdesk-dotcom.github.io/yuga-logo.jpg`
- **Should be:** `https://pacpltradingdesk-dotcom.github.io/yuga-pmc-live/yuga-logo.jpg`
- **Root cause:** GitHub Pages still serving old build that used `next/image` without basePath prefix
- **Fix:** Already applied in `components/Navbar.tsx` and `components/Footer.tsx` — switched to plain `<img>` with `NEXT_PUBLIC_BASE_PATH` env var. Deploy pending.
- **ETA:** Resolves automatically once GitHub Pages propagates commit `50606f8`

### [MEDIUM] RSC prefetch 404s (4 errors in console)
- **What:** Client-side navigation prefetch requests return 404
- **Affected pages:** `/about`, `/consulting`, `/pyrolysis`, `/it-products`
- **Error pattern:** `__next.about.__PAGE__.txt?_rsc=...` → 404
- **Root cause:** Old build's JavaScript requesting RSC payload files that don't match the new build's file structure
- **Fix:** Resolves automatically once new build deploys (same fix as above)

### [LOW] Unsplash images slow to load
- **What:** Background images in several sections appear black for 2–3 seconds on first load
- **Affected images:**
  - `photo-1441974231531-c6227db76b6e` (w=1600) — hero/section background
  - `photo-1474487548417-781cb71495f3` (w=800) — case study card
  - `photo-1558618666-fcd25c85cd64` (w=800) — case study card
  - `photo-1504307651254-35680f356dfd` (w=800) — case study card
- **Root cause:** Large image dimensions, no loading placeholder
- **Fix options:**
  1. Reduce `w=1600` to `w=1200` for hero background
  2. Add CSS `background-color` fallback on sections while image loads
  3. Use Unsplash blur hash placeholders

---

## Pages Checked

| Page | Sections | Navbar | Footer | JS Errors |
|------|----------|--------|--------|-----------|
| `/` (Home) | 14 ✅ | ✅ | ✅ | 0 ✅ |
| `/about` | Not tested (RSC 404) | — | — | — |
| `/consulting` | Not tested (RSC 404) | — | — | — |
| `/pyrolysis` | Not tested (RSC 404) | — | — | — |
| `/it-products` | Not tested (RSC 404) | — | — | — |

---

## What's Working

- All 14 homepage sections render correctly
- Navbar links present and structured correctly
- Footer with contact info, quick links, services, certifications (BIS, NHAI, CSIR)
- "Get Consultation" CTA button visible
- Dark theme rendering correctly
- No JavaScript runtime errors
- No layout overflow issues detected
- All internal links use correct `/yuga-pmc-live/` basePath prefix

---

## Action Items

- [ ] Wait for GitHub Pages to deploy commit `50606f8` — fixes logo + RSC 404s
- [ ] Reduce hero background image size from `w=1600` to `w=1200` for faster load
- [ ] Add CSS background-color fallback on image sections (e.g. `bg-charcoal`)
- [ ] Re-test all 5 pages after new deploy propagates
