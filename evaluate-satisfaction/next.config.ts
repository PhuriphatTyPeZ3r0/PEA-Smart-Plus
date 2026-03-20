import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Evaluate_Satisfaction',
  images: {
    unoptimized: true,
  },
  // @ts-ignore - turbopack root for Next.js 16/Canary
  turbopack: {
    root: path.resolve(__dirname),
  },
} as any;

export default nextConfig;
