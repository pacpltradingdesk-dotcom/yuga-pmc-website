import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  trailingSlash: true,
  basePath: "/yuga-pmc-website",
  assetPrefix: "/yuga-pmc-website",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/yuga-pmc-website",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
