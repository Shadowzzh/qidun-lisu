import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: "北京骊甦科技官网",
  description: "北京骊甦科技企业级私有化 AI 知识智能平台方案官网首页。",
};

export default function Page() {
  return <HomePage />;
}
