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
