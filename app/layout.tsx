// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YUGA PMC — India's #1 Bio-Bitumen Plant Setup Consultant",
  description:
    "YUGA PMC — 25 years of bitumen expertise, 10 plants commissioned, complete A-to-Z PMC consulting for bio-bitumen plant setup across India.",
  metadataBase: new URL("https://pacpl.in"),
  openGraph: {
    title: "YUGA PMC — India's #1 Bio-Bitumen Plant Setup Consultant",
    description:
      "From land selection to commercial production. 10 plants commissioned, 25 years expertise, 17 states covered.",
    url: "https://pacpl.in",
    siteName: "YUGA PMC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${outfit.variable}`}>
      <body className="font-sans bg-black text-white antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
