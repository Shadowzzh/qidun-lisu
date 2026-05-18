import type { Metadata } from "next";
import { SitePage } from "@/components/pages/site-page/site-page";
import { getSitePageByHref } from "@/content/site-pages";

const page = getSitePageByHref("/scenarios/risk-control");

export const metadata: Metadata = {
  title: `${page.title} - 北京骊甦科技`,
  description: page.description,
};

export default function RiskControlPage() {
  return <SitePage page={page} />;
}
