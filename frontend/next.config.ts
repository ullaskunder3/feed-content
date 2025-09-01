import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ullaskunder.tech",
      },
    ],
  },
};

export default nextConfig;
