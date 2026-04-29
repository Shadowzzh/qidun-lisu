import type { FooterGroup } from "@/types/site";

export const footerGroups: FooterGroup[] = [
  {
    title: "网站导览",
    items: [
      { label: "首页概览", href: "#hero", kind: "anchor" },
      { label: "平台总览", href: "#overview", kind: "anchor" },
      { label: "核心能力", href: "#capabilities", kind: "anchor" },
      { label: "场景价值", href: "#scenarios", kind: "anchor" },
      { label: "案例团队", href: "#proof", kind: "anchor" },
      { label: "价值承诺", href: "#closing", kind: "anchor" },
    ],
  },
  {
    title: "方案能力",
    items: [
      { label: "算力底座", kind: "text" },
      { label: "AI 数据平台", kind: "text" },
      { label: "知识语义层", kind: "text" },
      { label: "安全管控", kind: "text" },
      { label: "员工 AI 工作台", kind: "text" },
    ],
  },
  {
    title: "页面规划",
    items: [
      { label: "主方案总览", kind: "text" },
      { label: "案例中心", kind: "text" },
      { label: "关于我们", kind: "text" },
      { label: "行业洞察", kind: "text" },
      { label: "价值展望", kind: "text" },
    ],
  },
];

export const footerSummary = {
  title: "北京骊甦科技",
  description: "企业级私有化 AI 知识智能平台方案",
  detail: "从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
} as const;
