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
