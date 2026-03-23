import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/Evaluate_Satisfaction', // Removed to support Vercel root deployment and fix 404 issues
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
