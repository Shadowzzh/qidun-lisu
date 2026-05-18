import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/company", destination: "/about", permanent: true },
      { source: "/semantic-layer", destination: "/capabilities/semantic-layer", permanent: true },
      { source: "/data-platform", destination: "/capabilities/data-platform", permanent: true },
      { source: "/security", destination: "/capabilities/security", permanent: true },
      { source: "/workspace", destination: "/capabilities/workspace", permanent: true },
      { source: "/infrastructure", destination: "/capabilities", permanent: true },
      { source: "/insights", destination: "/scenarios", permanent: true },
      { source: "/value", destination: "/solution", permanent: true },
    ];
  },
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "100.103.79.86",
    "mini",
    "test.logit.cn",
    "test.zzheng.dev",
    "https://test.logit.cn"
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
