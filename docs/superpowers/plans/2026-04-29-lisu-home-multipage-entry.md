# Lisu Home Multipage Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `lisu-official-site` homepage into a multi-page entry homepage with site-level navigation, hover dropdown menus, archive-derived content, and consistent pending-page `alert` behavior.

**Architecture:** Replace the current anchor-navigation shell and section-list homepage body with a site-level content model. Keep the existing `HeroBand` and `OverviewBand` frame where they already match the approved spec, but move all navigation, CTA, and route-group behavior onto shared typed link models so Header, mobile menu, Footer, and homepage entry buttons use the same pending-page logic.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library, jsdom

---

## File Map

### Create

- `lisu-official-site/src/content/site-nav.ts`
- `lisu-official-site/src/components/site/header-desktop-nav.ts`
- `lisu-official-site/src/components/site/site-link.tsx`
- `lisu-official-site/src/components/site/site-link.test.tsx`
- `lisu-official-site/src/components/pages/home/entry-band.tsx`
- `lisu-official-site/src/components/pages/home/scenario-proof-band.tsx`
- `lisu-official-site/src/components/pages/home/route-closing-band.tsx`

### Modify

- `lisu-official-site/src/types/site.ts`
- `lisu-official-site/src/assets/home/index.ts`
- `lisu-official-site/src/components/pages/home/home-visual.test.tsx`
- `lisu-official-site/src/content/home.ts`
- `lisu-official-site/src/content/home.test.ts`
- `lisu-official-site/src/content/site-footer.ts`
- `lisu-official-site/src/components/site/header.tsx`
- `lisu-official-site/src/components/site/mobile-menu.tsx`
- `lisu-official-site/src/components/site/footer.tsx`
- `lisu-official-site/src/components/site/header.test.tsx`
- `lisu-official-site/src/components/site/footer.test.tsx`
- `lisu-official-site/src/components/pages/home/hero-band.tsx`
- `lisu-official-site/src/components/pages/home/home-page.tsx`
- `lisu-official-site/src/components/pages/home/home-page.test.tsx`
- `lisu-official-site/src/app/page.tsx`

### Delete

- `lisu-official-site/src/content/navigation.ts`
- `lisu-official-site/src/hooks/use-active-section.ts`
- `lisu-official-site/src/hooks/use-active-section.test.tsx`
- `lisu-official-site/src/components/pages/home/feature-band.tsx`
- `lisu-official-site/src/components/pages/home/closing-band.tsx`

### Responsibilities

- `src/types/site.ts` defines the shared site link contracts, menu structures, homepage entry band types, and closing route group types.
- `src/content/site-nav.ts` becomes the single source of truth for desktop dropdown menus and mobile menu content.
- `src/components/site/site-link.tsx` owns the shared `route` vs `pending` rendering behavior and the unified `alert` message.
- `src/content/home.ts` becomes the only source of homepage section copy, section order, CTA targets, and slide traceability.
- `src/components/pages/home/entry-band.tsx` renders the repeated solution-entry blocks.
- `src/components/pages/home/scenario-proof-band.tsx` renders the combined scene summary and proof cards section.
- `src/components/pages/home/route-closing-band.tsx` renders the final closing statement plus site route groups.
- `src/components/site/header.tsx`, `mobile-menu.tsx`, and `footer.tsx` consume the new shared site link models.

## Non-Goals

- Do not implement future route pages in this plan.
- Do not introduce a custom modal or toast system for pending pages.
- Do not add new business facts outside `archive/ppt-source`.
- Do not preserve homepage anchor navigation as a compatibility layer.

## Task 1: Replace the content contract with a site-level homepage model

**Files:**
- Create: `lisu-official-site/src/content/site-nav.ts`
- Modify: `lisu-official-site/src/types/site.ts`
- Modify: `lisu-official-site/src/content/home.ts`
- Modify: `lisu-official-site/src/content/home.test.ts`
- Modify: `lisu-official-site/src/assets/home/index.ts`
- Modify: `lisu-official-site/src/components/pages/home/home-visual.test.tsx`
- Delete: `lisu-official-site/src/content/navigation.ts`

- [ ] **Step 1: Rewrite the failing content tests around the new homepage contract**

Replace `lisu-official-site/src/content/home.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import {
  homeClosingStatement,
  homeEntryBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
  homeScenarioCards,
} from "@/content/home";
import { siteNavMenus } from "@/content/site-nav";

describe("home content contract", () => {
  it("maps the homepage into a multipage-entry structure", () => {
    expect(homeHero.id).toBe("hero");
    expect(homeOverviewBand.id).toBe("overview");
    expect(homeEntryBands.map((band) => band.id)).toEqual([
      "solution-overview",
      "semantic-layer",
      "data-platform",
      "security",
      "workspace",
    ]);
    expect(homeScenarioCards.map((card) => card.title)).toEqual(["供应链", "财务", "风控", "客服运营"]);
    expect(homeProofSection.id).toBe("proof");
    expect(homeClosingStatement.id).toBe("route-closing");
  });

  it("defines four desktop navigation menus for the site shell", () => {
    expect(siteNavMenus.map((menu) => menu.id)).toEqual(["solution", "scenarios", "cases", "company"]);
    expect(siteNavMenus.map((menu) => menu.label)).toEqual(["解决方案", "应用场景", "案例中心", "关于我们"]);
  });

  it("keeps every homepage section traceable to source slides", () => {
    expect(homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-05", "slide-07", "slide-10"]);
    expect(homeEntryBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeScenarioCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeClosingStatement.sourceSlides).toEqual(["slide-22"]);
  });
});
```

Replace `lisu-official-site/src/components/pages/home/home-visual.test.tsx` with:

```ts
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HomeVisual } from "@/components/pages/home/home-visual";

describe("HomeVisual", () => {
  it("renders archive-derived overview imagery instead of a visible placeholder", () => {
    render(<HomeVisual slot={homeVisuals.platformOverview} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "平台总览图" })).toBeInTheDocument();
    expect(screen.queryByText("建议放：七层架构总览图")).not.toBeInTheDocument();
  });

  it("renders archive-derived team imagery instead of a visible placeholder", () => {
    render(<HomeVisual slot={homeVisuals.proofTeam} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "核心团队缩略图" })).toBeInTheDocument();
    expect(screen.queryByText("建议放：团队背书图")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the targeted tests and verify they fail**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts src/components/pages/home/home-visual.test.tsx
```

Expected:

```text
FAIL  src/content/home.test.ts
FAIL  src/components/pages/home/home-visual.test.tsx
```

- [ ] **Step 3: Replace the old types, nav content, homepage content, and critical image slots**

Create `lisu-official-site/src/content/site-nav.ts`:

```ts
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
```

Update the relevant parts of `lisu-official-site/src/types/site.ts`:

```ts
export type SiteLinkItem = {
  label: string;
  href: "/" | `/${string}` | `/${string}#${string}`;
  kind: "route" | "pending";
};

export type NavColumn = {
  title: string;
  items: SiteLinkItem[];
};

export type SiteNavMenu = {
  id: "solution" | "scenarios" | "cases" | "company";
  label: string;
  columns: NavColumn[];
};

export type HomeEntryBand = {
  id: "solution-overview" | "semantic-layer" | "data-platform" | "security" | "workspace";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  action: SiteLinkItem;
  sourceSlides: SlideRef[];
};

export type HomeScenarioCard = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeClosingStatement = {
  id: "route-closing";
  title: string;
  description: string;
  routeGroups: FooterGroup[];
  sourceSlides: SlideRef[];
};

export type FooterGroup = {
  title: string;
  items: SiteLinkItem[];
};
```

Update the relevant parts of `lisu-official-site/src/content/home.ts`:

```ts
import { footerRouteGroups } from "@/content/site-nav";

export const homeEntryBands: HomeEntryBand[] = [
  {
    id: "solution-overview",
    title: "主方案总览",
    description: "解释整套私有化 AI 知识智能平台的总体定位、差异化价值与架构全景。",
    visual: homeVisuals.platformOverview,
    action: { label: "查看详情", href: "/solution", kind: "pending" },
    sourceSlides: ["slide-01", "slide-07", "slide-10"],
  },
  {
    id: "semantic-layer",
    title: "知识语义层",
    description: "说明业务知识、规则语义与生成结果如何被统一约束，形成可解释的知识大脑。",
    visual: homeVisuals.capabilityVisual,
    action: { label: "查看详情", href: "/semantic-layer", kind: "pending" },
    sourceSlides: ["slide-07", "slide-14"],
  },
  {
    id: "data-platform",
    title: "AI 数据平台",
    description: "说明企业真实数据如何通过多引擎协同、召回重排与闭环反馈转化为可调用知识。",
    visual: homeVisuals.capabilityVisual,
    action: { label: "查看详情", href: "/data-platform", kind: "pending" },
    sourceSlides: ["slide-13", "slide-15"],
  },
  {
    id: "security",
    title: "安全管控",
    description: "说明平台为什么能够进入核心业务生产环境，并满足运行时治理与合规审计要求。",
    visual: homeVisuals.capabilityVisual,
    action: { label: "查看详情", href: "/security", kind: "pending" },
    sourceSlides: ["slide-17", "slide-18"],
  },
  {
    id: "workspace",
    title: "员工 AI 工作台",
    description: "说明平台能力最终如何进入员工工作界面，支撑知识中心、智能体中心与统一运营管理。",
    visual: homeVisuals.scenarioVisual,
    action: { label: "查看详情", href: "/workspace", kind: "pending" },
    sourceSlides: ["slide-28", "slide-29"],
  },
];

export const homeScenarioCards: HomeScenarioCard[] = [
  { title: "供应链", description: "让规则沉淀、问答推理与跨域协同进入供应链关键环节。", sourceSlides: ["slide-16"] },
  { title: "财务", description: "让口径治理、审计支撑与财务判断建立在统一知识与可追溯过程之上。", sourceSlides: ["slide-16"] },
  { title: "风控", description: "让预警结果附带推理路径，避免黑盒式结论进入关键管理流程。", sourceSlides: ["slide-16"] },
  { title: "客服运营", description: "让业务知识、经验传承与精准答复沉淀为稳定可复用的服务能力。", sourceSlides: ["slide-16"] },
];

export const homeClosingStatement: HomeClosingStatement = {
  id: "route-closing",
  title: "继续浏览官网结构",
  description: "首页只建立品牌与方案总览，后续内容将围绕解决方案、应用场景、案例中心与关于我们持续展开。",
  routeGroups: footerRouteGroups,
  sourceSlides: ["slide-22"],
};
```

Update the critical image slots in `lisu-official-site/src/assets/home/index.ts`:

```ts
import platformOverviewImage from "@/assets/home/platform-overview.png";
import proofTeamImage from "@/assets/home/proof-team.jpeg";

platformOverview: {
  kind: "image",
  frame: "overview",
  alt: "平台总览图",
  src: platformOverviewImage,
  sourceSlides: ["slide-10"],
  sourceArchiveFiles: [image17Path],
},

proofTeam: {
  kind: "image",
  frame: "proof-card",
  alt: "核心团队缩略图",
  src: proofTeamImage,
  sourceSlides: ["slide-30"],
  sourceArchiveFiles: [image122Path],
},
```

- [ ] **Step 4: Run the targeted tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts src/components/pages/home/home-visual.test.tsx
```

Expected:

```text
PASS  src/content/home.test.ts
PASS  src/components/pages/home/home-visual.test.tsx
```

- [ ] **Step 5: Commit the content-contract changes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
git add src/types/site.ts src/content/site-nav.ts src/content/home.ts src/content/home.test.ts src/assets/home/index.ts src/components/pages/home/home-visual.test.tsx
git rm src/content/navigation.ts
git commit -m "refactor: reshape lisu home content contract"
```

## Task 2: Add a shared site link component for route vs pending behavior

**Files:**
- Create: `lisu-official-site/src/components/site/site-link.tsx`
- Create: `lisu-official-site/src/components/site/site-link.test.tsx`

- [ ] **Step 1: Write the failing shared-link tests**

Create `lisu-official-site/src/components/site/site-link.test.tsx`:

```ts
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteLink } from "@/components/site/site-link";

describe("SiteLink", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders route items as links", () => {
    render(
      <SiteLink item={{ label: "首页", href: "/", kind: "route" }} className="test-link">
        首页
      </SiteLink>,
    );

    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
  });

  it("renders pending items as buttons and shows a shared alert", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;

    render(
      <SiteLink item={{ label: "主方案总览", href: "/solution", kind: "pending" }} className="test-link">
        主方案总览
      </SiteLink>,
    );

    fireEvent.click(screen.getByRole("button", { name: "主方案总览" }));

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
```

- [ ] **Step 2: Run the shared-link test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/site-link.test.tsx
```

Expected:

```text
FAIL  src/components/site/site-link.test.tsx
... Cannot find module '@/components/site/site-link'
```

- [ ] **Step 3: Implement the shared SiteLink component**

Create `lisu-official-site/src/components/site/site-link.tsx`:

```tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteLinkItem } from "@/types/site";
import { cn } from "@/lib/utils";

type SiteLinkProps = {
  item: SiteLinkItem;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const pendingPageMessage = "该页面暂未开放，敬请期待。";

export function SiteLink({ item, className, children, onClick }: SiteLinkProps) {
  const content = children ?? item.label;

  if (item.kind === "route") {
    return (
      <Link className={cn(className)} href={item.href} onClick={onClick} prefetch={false}>
        {content}
      </Link>
    );
  }

  function handlePendingClick() {
    window.alert(pendingPageMessage);
    onClick?.();
  }

  return (
    <button
      type="button"
      data-pending-href={item.href}
      className={cn(className)}
      onClick={handlePendingClick}
    >
      {content}
    </button>
  );
}
```

- [ ] **Step 4: Run the shared-link test and verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/site-link.test.tsx
```

Expected:

```text
PASS  src/components/site/site-link.test.tsx
```

- [ ] **Step 5: Commit the shared-link behavior**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
git add src/components/site/site-link.tsx src/components/site/site-link.test.tsx
git commit -m "feat: add shared pending page link behavior"
```

## Task 3: Rebuild Header, mobile menu, and Footer as a site shell

**Files:**
- Create: `lisu-official-site/src/components/site/header-desktop-nav.ts`
- Modify: `lisu-official-site/src/components/site/header.tsx`
- Modify: `lisu-official-site/src/components/site/mobile-menu.tsx`
- Modify: `lisu-official-site/src/components/site/footer.tsx`
- Modify: `lisu-official-site/src/content/site-footer.ts`
- Modify: `lisu-official-site/src/components/site/header.test.tsx`
- Modify: `lisu-official-site/src/components/site/footer.test.tsx`

- [ ] **Step 1: Replace Header and Footer tests with site-shell expectations**

Replace `lisu-official-site/src/components/site/header.test.tsx` with:

```ts
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/site/header";

describe("Header", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders four top-level menus and opens the solution panel on hover", () => {
    render(<Header />);

    const trigger = screen.getByRole("button", { name: "解决方案" });

    expect(screen.getByRole("link", { name: "北京骊甦科技" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: "应用场景" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "案例中心" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "关于我们" })).toBeInTheDocument();

    fireEvent.mouseEnter(trigger);

    const panel = screen.getByTestId("desktop-nav-panel");
    expect(within(panel).getByRole("button", { name: "主方案总览" })).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "安全管控" })).toBeInTheDocument();
  });

  it("shows the pending-page alert from both desktop and mobile menus", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    const { container } = render(<Header />);

    fireEvent.mouseEnter(screen.getByRole("button", { name: "关于我们" }));
    fireEvent.click(screen.getByRole("button", { name: "公司介绍" }));

    const mobileDisclosure = container.querySelector("details");
    mobileDisclosure?.setAttribute("open", "");
    fireEvent.click(within(mobileDisclosure as HTMLDetailsElement).getByRole("button", { name: "应用场景" }));

    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
```

Replace `lisu-official-site/src/components/site/footer.test.tsx` with:

```ts
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/site/footer";

describe("Footer", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders formal footer groups without anchor navigation or planning copy", () => {
    render(<Footer />);

    expect(screen.getByText("解决方案")).toBeInTheDocument();
    expect(screen.getByText("能力页面")).toBeInTheDocument();
    expect(screen.getByText("应用与案例")).toBeInTheDocument();
    expect(screen.getByText("关于我们")).toBeInTheDocument();
    expect(screen.queryByText("页面规划")).not.toBeInTheDocument();
    expect(screen.queryByText("平台总览")).not.toBeInTheDocument();
  });

  it("uses the shared pending-page alert for footer items", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    render(<Footer />);

    fireEvent.click(screen.getByRole("button", { name: "主方案总览" }));

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
```

- [ ] **Step 2: Run the shell tests and verify they fail**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/header.test.tsx src/components/site/footer.test.tsx
```

Expected:

```text
FAIL  src/components/site/header.test.tsx
FAIL  src/components/site/footer.test.tsx
```

- [ ] **Step 3: Implement the new shell helpers and components**

Create `lisu-official-site/src/components/site/header-desktop-nav.ts`:

```ts
export type HeaderMenuId = "solution" | "scenarios" | "cases" | "company";

const desktopNavItemBaseClassName =
  "flex h-full flex-col justify-center whitespace-nowrap border-b-[3px] px-4 text-sm transition-colors";

export function getDesktopNavItemClassName(isActive: boolean) {
  if (isActive) {
    return `${desktopNavItemBaseClassName} border-sky-700 text-sky-700 font-semibold`;
  }

  return `${desktopNavItemBaseClassName} border-transparent text-slate-700 hover:border-sky-700 hover:text-sky-700`;
}

export function isHeaderMenuOpen(openMenu: HeaderMenuId | null, menu: HeaderMenuId) {
  return openMenu === menu;
}

export function toggleHeaderMenu(openMenu: HeaderMenuId | null, menu: HeaderMenuId) {
  if (openMenu === menu) {
    return null;
  }

  return menu;
}
```

Update `lisu-official-site/src/content/site-footer.ts`:

```ts
import { footerRouteGroups } from "@/content/site-nav";

export const footerGroups = footerRouteGroups;

export const footerSummary = {
  title: "北京骊甦科技",
  description: "企业级私有化 AI 知识智能平台方案",
  detail: "从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
} as const;
```

Update `lisu-official-site/src/components/site/mobile-menu.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { SiteLink } from "@/components/site/site-link";
import type { SiteNavMenu } from "@/types/site";

type MobileMenuProps = {
  menus: SiteNavMenu[];
};

export function MobileMenu({ menus }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function handleItemSelect() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details ref={detailsRef} className="group relative md:hidden">
      <summary
        aria-label="打开导航菜单"
        className="inline-flex size-10 list-none items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm marker:content-none"
      >
        <span aria-hidden="true" className="text-sm font-medium group-open:hidden">菜单</span>
        <span aria-hidden="true" className="hidden text-sm font-medium group-open:inline">关闭</span>
      </summary>

      <div className="fixed inset-x-0 top-16 z-40 border-t border-slate-200 bg-white px-4 pb-6 pt-4 shadow-lg">
        <div className="space-y-6">
          {menus.map((menu) => (
            <section key={menu.id} aria-labelledby={`mobile-menu-${menu.id}`}>
              <h2 id={`mobile-menu-${menu.id}`} className="text-sm font-semibold text-slate-900">{menu.label}</h2>
              <div className="mt-3 space-y-4">
                {menu.columns.map((column) => (
                  <div key={column.title}>
                    <p className="text-xs font-medium uppercase text-slate-500">{column.title}</p>
                    <ul className="mt-2 space-y-2">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <SiteLink
                            item={item}
                            className="block w-full rounded-md px-3 py-2 text-left text-base text-slate-700 hover:bg-slate-50"
                            onClick={handleItemSelect}
                          >
                            {item.label}
                          </SiteLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}
```

Update `lisu-official-site/src/components/site/header.tsx`:

```tsx
"use client";

import type { FocusEvent, KeyboardEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  getDesktopNavItemClassName,
  isHeaderMenuOpen,
  toggleHeaderMenu,
  type HeaderMenuId,
} from "@/components/site/header-desktop-nav";
import { MobileMenu } from "@/components/site/mobile-menu";
import { SiteLink } from "@/components/site/site-link";
import { siteNavMenus } from "@/content/site-nav";
import type { NavColumn } from "@/types/site";

function renderMenuColumn(column: NavColumn) {
  return (
    <div key={column.title}>
      <p className="text-sm font-semibold text-sky-700">{column.title}</p>
      <div className="mt-3 h-px bg-slate-200" />
      <ul className="mt-4 space-y-3">
        {column.items.map((item) => (
          <li key={item.label}>
            <SiteLink item={item} className="text-sm text-slate-700 transition-colors hover:text-sky-700">
              {item.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<HeaderMenuId | null>(null);
  const activeMenu = siteNavMenus.find((menu) => menu.id === openMenu) ?? null;

  function closeIfFocusLeaves(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>, menu: HeaderMenuId) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpenMenu(menu);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpenMenu(null);
    }
  }

  return (
    <header
      className="relative sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm"
      onBlurCapture={closeIfFocusLeaves}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex h-full items-center gap-8">
          <Link href="/" className="text-base font-semibold text-slate-900 md:text-lg" prefetch={false}>
            北京骊甦科技
          </Link>

          <nav aria-label="主导航" className="hidden h-full md:block">
            <ul className="flex h-full items-stretch">
              {siteNavMenus.map((menu) => (
                <li key={menu.id} className="flex h-full items-stretch">
                  <button
                    type="button"
                    aria-expanded={isHeaderMenuOpen(openMenu, menu.id)}
                    className={getDesktopNavItemClassName(isHeaderMenuOpen(openMenu, menu.id))}
                    onClick={() => setOpenMenu((value) => toggleHeaderMenu(value, menu.id))}
                    onKeyDown={(event) => handleTriggerKeyDown(event, menu.id)}
                    onMouseEnter={() => setOpenMenu(menu.id)}
                  >
                    {menu.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <MobileMenu menus={siteNavMenus} />
      </div>

      {activeMenu ? (
        <div
          data-testid="desktop-nav-panel"
          className="absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-lg"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-2">
            {activeMenu.columns.map((column) => renderMenuColumn(column))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
```

Update `lisu-official-site/src/components/site/footer.tsx`:

```tsx
import { SiteLink } from "@/components/site/site-link";
import { footerGroups, footerSummary } from "@/content/site-footer";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6 md:pt-12">
        <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-2 xl:grid-cols-5">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-balance text-sm font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <SiteLink item={item} className="text-sm text-slate-600 hover:text-sky-700">
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-balance text-sm font-semibold text-slate-900">{footerSummary.title}</p>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-700">{footerSummary.description}</p>
            <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{footerSummary.detail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-balance text-base font-semibold text-slate-900">{siteConfig.companyName}</p>
            <p className="text-pretty text-sm">{siteConfig.siteDescription}</p>
          </div>
          <p className="text-sm">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the shell tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/site-link.test.tsx src/components/site/header.test.tsx src/components/site/footer.test.tsx
```

Expected:

```text
PASS  src/components/site/site-link.test.tsx
PASS  src/components/site/header.test.tsx
PASS  src/components/site/footer.test.tsx
```

- [ ] **Step 5: Commit the site-shell rewrite**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
git add src/components/site/header-desktop-nav.ts src/components/site/header.tsx src/components/site/mobile-menu.tsx src/components/site/footer.tsx src/content/site-footer.ts src/components/site/header.test.tsx src/components/site/footer.test.tsx
git commit -m "feat: rebuild lisu site shell navigation"
```

## Task 4: Recompose the homepage into five approved sections

**Files:**
- Create: `lisu-official-site/src/components/pages/home/entry-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/scenario-proof-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/route-closing-band.tsx`
- Modify: `lisu-official-site/src/components/pages/home/hero-band.tsx`
- Modify: `lisu-official-site/src/components/pages/home/home-page.tsx`
- Modify: `lisu-official-site/src/components/pages/home/home-page.test.tsx`
- Modify: `lisu-official-site/src/app/page.tsx`
- Delete: `lisu-official-site/src/components/pages/home/feature-band.tsx`
- Delete: `lisu-official-site/src/components/pages/home/closing-band.tsx`
- Delete: `lisu-official-site/src/hooks/use-active-section.ts`
- Delete: `lisu-official-site/src/hooks/use-active-section.test.tsx`

- [ ] **Step 1: Replace the homepage test with the five-section entry-page expectations**

Replace `lisu-official-site/src/components/pages/home/home-page.test.tsx` with:

```ts
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";

describe("HomePage", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders the homepage as a five-section multipage entry shell", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute("id", "overview");
    expect(screen.getByRole("region", { name: "解决方案入口" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "场景与案例" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toHaveAttribute("id", "route-closing");
  });

  it("renders five solution entry modules with pending detail buttons", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    render(<HomePage />);

    const entryRegion = screen.getByRole("region", { name: "解决方案入口" });
    expect(within(entryRegion).getByText("主方案总览")).toBeInTheDocument();
    expect(within(entryRegion).getByText("知识语义层")).toBeInTheDocument();
    expect(within(entryRegion).getByText("AI 数据平台")).toBeInTheDocument();
    expect(within(entryRegion).getByText("安全管控")).toBeInTheDocument();
    expect(within(entryRegion).getByText("员工 AI 工作台")).toBeInTheDocument();

    fireEvent.click(within(entryRegion).getAllByRole("button", { name: "查看详情" })[0]);

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });

  it("renders scenario summaries and proof cards together in the closing content region", () => {
    render(<HomePage />);

    const proofRegion = screen.getByRole("region", { name: "场景与案例" });

    expect(within(proofRegion).getByText("供应链")).toBeInTheDocument();
    expect(within(proofRegion).getByText("财务")).toBeInTheDocument();
    expect(within(proofRegion).getByText("汽车零部件案例")).toBeInTheDocument();
    expect(within(proofRegion).getByText("核心团队")).toBeInTheDocument();
  });
});

describe("app page", () => {
  it("renders the rebuilt multipage-entry homepage from the route entry", () => {
    render(<Page />);

    expect(screen.getByRole("region", { name: "解决方案入口" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the homepage test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-page.test.tsx
```

Expected:

```text
FAIL  src/components/pages/home/home-page.test.tsx
```

- [ ] **Step 3: Implement the new entry bands and homepage assembly**

Create `lisu-official-site/src/components/pages/home/entry-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import { SiteLink } from "@/components/site/site-link";
import { cn } from "@/lib/utils";
import type { HomeEntryBand as HomeEntryBandContent } from "@/types/site";

type EntryBandProps = {
  band: HomeEntryBandContent;
  variant?: "default" | "reversed";
};

export function EntryBand({ band, variant = "default" }: EntryBandProps) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_600px]">
      <div className={cn("max-w-[520px]", variant === "reversed" && "md:order-2 md:justify-self-end")}>
        <h3 className="text-balance text-lg font-semibold text-slate-950 md:text-xl">{band.title}</h3>
        <p className="mt-5 text-pretty text-sm leading-8 text-slate-600">{band.description}</p>
        <SiteLink
          item={band.action}
          className="mt-8 inline-flex items-center rounded-sm bg-sky-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-800"
        >
          查看详情
        </SiteLink>
      </div>

      <div className={cn("w-full justify-self-end", variant === "reversed" && "md:order-1 md:justify-self-start")}>
        <HomeVisual className="w-full" sizes="(min-width: 768px) 600px, 100vw" slot={band.visual} />
      </div>
    </article>
  );
}
```

Create `lisu-official-site/src/components/pages/home/scenario-proof-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeProofCard, HomeProofSection, HomeScenarioCard } from "@/types/site";

type ScenarioProofBandProps = {
  scenarios: HomeScenarioCard[];
  proofSection: HomeProofSection;
  proofCards: HomeProofCard[];
};

export function ScenarioProofBand({ scenarios, proofSection, proofCards }: ScenarioProofBandProps) {
  return (
    <section id={proofSection.id} aria-labelledby="home-proof-heading" className="bg-[#f7fbff] scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
        <div className="text-center">
          <h2 id="home-proof-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
            场景与案例
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
            让平台能力进入关键业务场景，并用现有案例和团队背书建立最小可信度。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {scenarios.map((card) => (
            <li key={card.title} className="rounded-[20px] bg-white px-6 py-6 shadow-lg shadow-slate-200/60">
              <p className="text-base font-semibold text-slate-950">{card.title}</p>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <div className="mb-8">
            <h3 className="text-balance text-2xl font-semibold text-slate-950 md:text-3xl">{proofSection.title}</h3>
            <p className="mt-3 max-w-[760px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
              {proofSection.description}
            </p>
          </div>

          <ul className="grid gap-6 lg:grid-cols-3">
            {proofCards.map((card) => (
              <li key={card.id} className="overflow-hidden rounded-[4px] bg-white shadow-lg shadow-slate-200/60">
                <HomeVisual className="w-full" sizes="(min-width: 1024px) 33vw, 100vw" slot={card.visual} />
                <div className="p-5">
                  <p className="text-balance text-base font-medium text-slate-950">{card.title}</p>
                  <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/pages/home/route-closing-band.tsx`:

```tsx
import { SiteLink } from "@/components/site/site-link";
import type { HomeClosingStatement } from "@/types/site";

type RouteClosingBandProps = {
  content: HomeClosingStatement;
};

export function RouteClosingBand({ content }: RouteClosingBandProps) {
  return (
    <section
      id={content.id}
      aria-labelledby="route-closing-heading"
      className="bg-[#f7fbff] scroll-mt-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 pb-16 md:pb-20">
        <div className="rounded-[24px] bg-white px-6 py-8 shadow-lg shadow-slate-200/70 md:px-10 md:py-10">
          <div className="max-w-[760px]">
            <h2 id="route-closing-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-600 md:text-base">{content.description}</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.routeGroups.map((group) => (
              <div key={group.title} className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-base font-semibold text-slate-950">{group.title}</p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <SiteLink item={item} className="text-sm text-slate-600 hover:text-sky-700">
                        {item.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Update the relevant part of `lisu-official-site/src/components/pages/home/hero-band.tsx` so the metric labels read as short official selling points:

```tsx
<ul data-testid="hero-metrics-rail" className="grid gap-4 md:-mt-14 md:grid-cols-3">
  {content.metrics.map((metric) => (
    <li
      key={metric.title}
      className="rounded-[20px] border border-white/20 bg-slate-950/78 px-5 py-5 text-left text-white shadow-lg shadow-slate-950/15 backdrop-blur-sm"
    >
      <p className="text-base font-semibold text-white">{metric.title}</p>
      <p className="mt-2 text-pretty text-sm leading-7 text-slate-200">{metric.description}</p>
    </li>
  ))}
</ul>
```

Update `lisu-official-site/src/components/pages/home/home-page.tsx`:

```tsx
"use client";

import { EntryBand } from "@/components/pages/home/entry-band";
import { HeroBand } from "@/components/pages/home/hero-band";
import { OverviewBand } from "@/components/pages/home/overview-band";
import { RouteClosingBand } from "@/components/pages/home/route-closing-band";
import { ScenarioProofBand } from "@/components/pages/home/scenario-proof-band";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeClosingStatement,
  homeEntryBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
  homeScenarioCards,
} from "@/content/home";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#f7fbff]">
        <HeroBand content={homeHero} />
        <OverviewBand band={homeOverviewBand} />

        <section
          id="solutions"
          aria-labelledby="home-solutions-heading"
          className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_100%)] scroll-mt-24"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 max-w-[760px]">
              <h2 id="home-solutions-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
                解决方案入口
              </h2>
              <p className="mt-4 text-pretty text-sm leading-7 text-slate-600 md:text-base">
                首页只建立第一层理解，具体能力将在后续页面中分别展开。
              </p>
            </div>

            <div className="space-y-16 md:space-y-20">
              {homeEntryBands.map((band, index) => (
                <EntryBand key={band.id} band={band} variant={index % 2 === 0 ? "default" : "reversed"} />
              ))}
            </div>
          </div>
        </section>

        <ScenarioProofBand scenarios={homeScenarioCards} proofCards={homeProofCards} proofSection={homeProofSection} />
        <RouteClosingBand content={homeClosingStatement} />
      </main>
      <Footer />
    </>
  );
}
```

Update `lisu-official-site/src/app/page.tsx`:

```tsx
import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: "北京骊甦科技官网",
  description: "北京骊甦科技企业级私有化 AI 知识智能平台方案官网首页。",
};

export default function Page() {
  return <HomePage />;
}
```

- [ ] **Step 4: Run the homepage tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-page.test.tsx
```

Expected:

```text
PASS  src/components/pages/home/home-page.test.tsx
```

- [ ] **Step 5: Commit the homepage recomposition**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
git add src/components/pages/home/entry-band.tsx src/components/pages/home/scenario-proof-band.tsx src/components/pages/home/route-closing-band.tsx src/components/pages/home/hero-band.tsx src/components/pages/home/home-page.tsx src/components/pages/home/home-page.test.tsx src/app/page.tsx
git rm src/components/pages/home/feature-band.tsx src/components/pages/home/closing-band.tsx src/hooks/use-active-section.ts src/hooks/use-active-section.test.tsx
git commit -m "feat: recompose lisu homepage as multipage entry"
```

## Task 5: Run full verification and do the final cleanup pass

**Files:**
- Modify: `lisu-official-site/src/components/site/header.tsx`
- Modify: `lisu-official-site/src/components/site/mobile-menu.tsx`
- Modify: `lisu-official-site/src/components/site/footer.tsx`
- Modify: `lisu-official-site/src/components/pages/home/home-page.tsx`

- [ ] **Step 1: Run the full automated checks**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run check
```

Expected:

```text
> lisu-official-site@0.1.0 check
> npm run lint && npm run typecheck && npm run test:run && npm run build
...
✓ Compiled successfully
```

- [ ] **Step 2: Start the dev server and manually smoke-test the homepage**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run dev
```

Manual checks at `http://localhost:5173`:

- Desktop `Header` hover opens a dropdown panel for all four top-level menus.
- Clicking any pending item in Header, mobile menu, Footer, or entry buttons shows `alert("该页面暂未开放，敬请期待。")`.
- 首页不再出现“页面规划”。
- 首页不再出现“建议放：七层架构总览图”或“建议放：团队背书图”。
- 首页正文顺序是：Hero -> 方案总览 -> 解决方案入口 -> 场景与案例 -> 继续浏览官网结构。

- [ ] **Step 3: Fix any small shell-level regressions found during manual smoke**

If dropdown spacing or mobile menu stacking needs a small fix, apply it only in these files:

```tsx
src/components/site/header.tsx
src/components/site/mobile-menu.tsx
src/components/site/footer.tsx
src/components/pages/home/home-page.tsx
```

Do not change content contracts or add new sections during this pass.

- [ ] **Step 4: Re-run the targeted homepage checks after the final polish**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/header.test.tsx src/components/site/footer.test.tsx src/components/pages/home/home-page.test.tsx
```

Expected:

```text
PASS  src/components/site/header.test.tsx
PASS  src/components/site/footer.test.tsx
PASS  src/components/pages/home/home-page.test.tsx
```

- [ ] **Step 5: Commit the verified homepage entry baseline**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
git status --short
git add src
git commit -m "feat: finalize lisu multipage entry homepage"
```
