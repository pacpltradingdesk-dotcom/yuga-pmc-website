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
