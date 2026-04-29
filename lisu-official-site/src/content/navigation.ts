import type { NavItem } from "@/types/site";

export const homeNavItems: NavItem[] = [
  { id: "hero", label: "首页概览", href: "#hero", kind: "anchor" },
  { id: "why-now", label: "时代之需", href: "#why-now", kind: "anchor" },
  { id: "proposition", label: "方案主张", href: "#proposition", kind: "anchor" },
  { id: "architecture", label: "平台总览", href: "#architecture", kind: "anchor" },
  { id: "capabilities", label: "核心能力", href: "#capabilities", kind: "anchor" },
  { id: "scenarios", label: "场景价值", href: "#scenarios", kind: "anchor" },
  { id: "proof", label: "案例与团队", href: "#proof", kind: "anchor" },
  { id: "closing", label: "价值承诺", href: "#closing", kind: "anchor" },
];

export const reservedRouteItems: NavItem[] = [
  { id: "solution", label: "主方案总览", href: "/solution", kind: "route" },
  { id: "cases", label: "案例中心", href: "/cases", kind: "route" },
  { id: "company", label: "关于我们", href: "/company", kind: "route" },
];
