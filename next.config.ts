import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/yuga-pmc-live",
  assetPrefix: "/yuga-pmc-live",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/yuga-pmc-live",
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
