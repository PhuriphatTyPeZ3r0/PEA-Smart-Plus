import type { NextConfig } from "next";
import path from "path";

const projectRoot = process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT || path.resolve(__dirname);

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/Evaluate_Satisfaction', // Removed to support Vercel root deployment and fix 404 issues
  outputFileTracingRoot: projectRoot,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
