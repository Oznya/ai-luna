import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pour Netlify, on n'utilise pas standalone
  // output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true, // Nécessaire pour Netlify
  },
};

export default nextConfig;
