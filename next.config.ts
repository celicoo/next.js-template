import type { NextConfig } from "next";

const config: NextConfig = {
  compiler: {
    removeConsole: {
      exclude: ["error", "info", "warn"],
    },
  },
  compress: false,
  experimental: {
    nextScriptWorkers: true,
    optimizeCss: true,
    reactCompiler: true,
    swcTraceProfiling: true,
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Update the default value to one year to ensure Cloudflare can fully apply
  // the stale-while-revalidate semantics as intended.
  expireTime: 60 * 60 * 24 * 365,
  poweredByHeader: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // the code has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
};

export default config;
