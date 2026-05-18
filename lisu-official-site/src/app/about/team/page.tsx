import type { Metadata } from "next";
import { SitePage } from "@/components/pages/site-page/site-page";
import { getSitePageByHref } from "@/content/site-pages";

const page = getSitePageByHref("/about/team");

export const metadata: Metadata = {
  title: `${page.title} - 北京骊甦科技`,
  description: page.description,
};

export default function TeamPage() {
  return <SitePage page={page} />;
}
