import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/DVS",
  assetPrefix: "/DVS",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;