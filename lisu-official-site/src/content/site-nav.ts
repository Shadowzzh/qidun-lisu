import type { FooterGroup, SiteNavMenu } from "@/types/site";

export const siteNavMenus: SiteNavMenu[] = [
  {
    id: "solution",
    label: "解决方案",
    columns: [
      {
        title: "方案总览",
        items: [
          { label: "主方案总览", href: "/solution", kind: "pending" },
          { label: "员工 AI 工作台", href: "/workspace", kind: "pending" },
        ],
      },
      {
        title: "核心能力",
        items: [
          { label: "算力底座", href: "/infrastructure", kind: "pending" },
          { label: "知识语义层", href: "/semantic-layer", kind: "pending" },
          { label: "AI 数据平台", href: "/data-platform", kind: "pending" },
          { label: "安全管控", href: "/security", kind: "pending" },
        ],
      },
    ],
  },
  {
    id: "scenarios",
    label: "应用场景",
    columns: [
      {
        title: "场景与洞察",
        items: [
          { label: "应用场景", href: "/scenarios", kind: "pending" },
          { label: "行业洞察", href: "/insights", kind: "pending" },
          { label: "价值展望", href: "/value", kind: "pending" },
        ],
      },
    ],
  },
  {
    id: "cases",
    label: "案例中心",
    columns: [
      {
        title: "案例与背书",
        items: [
          { label: "制造业案例", href: "/cases", kind: "pending" },
          { label: "团队与能力背书", href: "/company", kind: "pending" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "关于我们",
    columns: [
      {
        title: "公司信息",
        items: [
          { label: "公司介绍", href: "/company", kind: "pending" },
          { label: "核心团队", href: "/company#team", kind: "pending" },
        ],
      },
    ],
  },
];

export const footerRouteGroups: FooterGroup[] = [
  {
    title: "解决方案",
    items: [
      { label: "主方案总览", href: "/solution", kind: "pending" },
      { label: "员工 AI 工作台", href: "/workspace", kind: "pending" },
    ],
  },
  {
    title: "能力页面",
    items: [
      { label: "知识语义层", href: "/semantic-layer", kind: "pending" },
      { label: "AI 数据平台", href: "/data-platform", kind: "pending" },
      { label: "安全管控", href: "/security", kind: "pending" },
    ],
  },
  {
    title: "应用与案例",
    items: [
      { label: "应用场景", href: "/scenarios", kind: "pending" },
      { label: "案例中心", href: "/cases", kind: "pending" },
    ],
  },
  {
    title: "关于我们",
    items: [{ label: "公司介绍", href: "/company", kind: "pending" }],
  },
];
