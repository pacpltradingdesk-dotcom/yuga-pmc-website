// hooks/use-scroll.ts
"use client";

import { useMotionValueEvent, useScroll as useMotionScroll } from "framer-motion";
import { useState } from "react";

export function useScroll(threshold = 60) {
  const { scrollY } = useMotionScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > threshold);
  });

  return scrolled;
}
