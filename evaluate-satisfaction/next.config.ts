import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // basePath: '/Evaluate_Satisfaction', // Uncomment if you want to serve from a subpath
  images: {
    unoptimized: true,
  },
  // @ts-ignore - turbopack root for Next.js 16/Canary
  turbopack: {
    root: path.resolve(__dirname),
  },
} as any;

export default nextConfig;
