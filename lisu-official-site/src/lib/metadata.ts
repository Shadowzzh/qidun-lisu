import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.siteDescription,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
    locale: "zh_CN",
    type: "website",
  },
};
