import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vinext emits dist/standalone for Azure App Service / Node self-hosting.
  output: "standalone",
};

export default nextConfig;
