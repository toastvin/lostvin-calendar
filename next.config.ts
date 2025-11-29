import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack 설정 (Next.js 16 기본값)
  turbopack: {},
  webpack: (config) => {
    // @react-pdf/renderer를 위한 canvas alias 설정
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
