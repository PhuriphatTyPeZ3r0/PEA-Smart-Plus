import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/Evaluate_Satisfaction', // Removed to support Vercel root deployment and fix 404 issues
  images: {
    unoptimized: true,
  },
  // @ts-ignore - turbopack root for Next.js 16/Canary
  turbopack: {
    root: path.resolve(__dirname),
  },
} as any;

export default nextConfig;
