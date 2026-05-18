import type { FooterGroup, SiteNavMenu } from "@/types/site";

export const siteNavMenus: SiteNavMenu[] = [
  {
    id: "solution",
    label: "解决方案",
    href: "/solution",
    columns: [
      {
        title: "方案总览",
        items: [{ label: "主方案总览", href: "/solution", kind: "route" }],
      },
      {
        title: "相关入口",
        items: [
          { label: "能力总览", href: "/capabilities", kind: "route" },
          { label: "应用场景总览", href: "/scenarios", kind: "route" },
        ],
      },
    ],
  },
  {
    id: "capabilities",
    label: "能力页",
    href: "/capabilities",
    columns: [
      {
        title: "能力总览",
        items: [{ label: "能力总览", href: "/capabilities", kind: "route" }],
      },
      {
        title: "核心能力",
        items: [
          { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
          { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
          { label: "安全管控", href: "/capabilities/security", kind: "route" },
          { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
        ],
      },
    ],
  },
  {
    id: "scenarios",
    label: "应用场景",
    href: "/scenarios",
    columns: [
      {
        title: "场景与洞察",
        items: [
          { label: "应用场景总览", href: "/scenarios", kind: "route" },
          { label: "供应链场景", href: "/scenarios/supply-chain", kind: "route" },
          { label: "财务场景", href: "/scenarios/finance", kind: "route" },
          { label: "风控场景", href: "/scenarios/risk-control", kind: "route" },
          { label: "客服运营场景", href: "/scenarios/customer-operations", kind: "route" },
        ],
      },
    ],
  },
  {
    id: "cases",
    label: "案例中心",
    href: "/cases",
    columns: [
      {
        title: "案例与背书",
        items: [
          { label: "案例总览", href: "/cases", kind: "route" },
          { label: "汽车零部件案例", href: "/cases/auto-parts", kind: "route" },
          { label: "叉车制造案例", href: "/cases/forklift", kind: "route" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "关于我们",
    href: "/about",
    columns: [
      {
        title: "公司信息",
        items: [
          { label: "公司介绍", href: "/about", kind: "route" },
          { label: "核心团队", href: "/about/team", kind: "route" },
          { label: "联系方式", href: "/about/contact", kind: "route" },
        ],
      },
    ],
  },
];

export const footerRouteGroups: FooterGroup[] = [
  {
    title: "解决方案",
    items: [{ label: "主方案总览", href: "/solution", kind: "route" }],
  },
  {
    title: "能力页面",
    items: [
      { label: "能力总览", href: "/capabilities", kind: "route" },
      { label: "知识语义层", href: "/capabilities/semantic-layer", kind: "route" },
      { label: "AI 数据平台", href: "/capabilities/data-platform", kind: "route" },
      { label: "安全管控", href: "/capabilities/security", kind: "route" },
      { label: "员工 AI 工作台", href: "/capabilities/workspace", kind: "route" },
    ],
  },
  {
    title: "应用与案例",
    items: [
      { label: "应用场景总览", href: "/scenarios", kind: "route" },
      { label: "供应链场景", href: "/scenarios/supply-chain", kind: "route" },
      { label: "财务场景", href: "/scenarios/finance", kind: "route" },
      { label: "风控场景", href: "/scenarios/risk-control", kind: "route" },
      { label: "客服运营场景", href: "/scenarios/customer-operations", kind: "route" },
      { label: "案例总览", href: "/cases", kind: "route" },
      { label: "汽车零部件案例", href: "/cases/auto-parts", kind: "route" },
      { label: "叉车制造案例", href: "/cases/forklift", kind: "route" },
    ],
  },
  {
    title: "关于我们",
    items: [
      { label: "公司介绍", href: "/about", kind: "route" },
      { label: "核心团队", href: "/about/team", kind: "route" },
      { label: "联系方式", href: "/about/contact", kind: "route" },
    ],
  },
];
