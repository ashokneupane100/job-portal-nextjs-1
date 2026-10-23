import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { hostname: "**.ufs.sh", protocol: "https" },
      { hostname: "utfs.io", protocol: "https" },
    ],
  },
};

export default nextConfig;
