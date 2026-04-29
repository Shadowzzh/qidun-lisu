import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "100.103.79.86",
    "mini",
    "test.logit.cn",
    "test.zzheng.dev",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
