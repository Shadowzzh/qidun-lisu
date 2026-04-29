import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.siteDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    locale: "zh_CN",
    type: "website",
  },
};
