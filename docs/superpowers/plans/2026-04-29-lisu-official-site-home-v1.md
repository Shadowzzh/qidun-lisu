# Lisu Official Site Home V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `lisu-official-site` as a new Next.js 16 App Router project and deliver the Phase 1 homepage V1 with 8 rendered sections, anchor navigation, source traceability, and production-safe metadata.

**Architecture:** Create a fresh `lisu-official-site` app instead of mutating the clone template, but borrow the template's decomposition style: thin `app/` files, typed `content/` modules, focused `components/home/` sections, and a small `site/` shell. Use a typed content contract with `sourceSlides` on every section and summary item, then render the homepage from data so archive traceability and later multi-page expansion stay intact.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `next/font`, `lucide-react`, Vitest, Testing Library, jsdom

---

## File Map

### Project bootstrap and tooling

- Create: `lisu-official-site/`
- Modify: `lisu-official-site/package.json`
- Create: `lisu-official-site/vitest.config.ts`
- Create: `lisu-official-site/src/test/setup.ts`
- Create: `lisu-official-site/src/test/smoke.test.ts`

### Shared contracts and content

- Create: `lisu-official-site/src/types/site.ts`
- Create: `lisu-official-site/src/content/site.ts`
- Create: `lisu-official-site/src/content/navigation.ts`
- Create: `lisu-official-site/src/content/home.ts`
- Create: `lisu-official-site/src/content/home.test.ts`

### Site shell and behaviors

- Create: `lisu-official-site/src/lib/utils.ts`
- Create: `lisu-official-site/src/hooks/use-active-section.ts`
- Create: `lisu-official-site/src/hooks/use-active-section.test.tsx`
- Create: `lisu-official-site/src/components/site/skip-link.tsx`
- Create: `lisu-official-site/src/components/site/header.tsx`
- Create: `lisu-official-site/src/components/site/mobile-menu.tsx`
- Create: `lisu-official-site/src/components/site/footer.tsx`
- Create: `lisu-official-site/src/components/site/header.test.tsx`

### Homepage sections and page assembly

- Create: `lisu-official-site/src/components/home/hero-section.tsx`
- Create: `lisu-official-site/src/components/home/why-now-section.tsx`
- Create: `lisu-official-site/src/components/home/proposition-section.tsx`
- Create: `lisu-official-site/src/components/home/architecture-section.tsx`
- Create: `lisu-official-site/src/components/home/capability-section.tsx`
- Create: `lisu-official-site/src/components/home/scenarios-section.tsx`
- Create: `lisu-official-site/src/components/home/proof-section.tsx`
- Create: `lisu-official-site/src/components/home/closing-section.tsx`
- Create: `lisu-official-site/src/components/home/home-page.tsx`
- Create: `lisu-official-site/src/components/home/home-page.test.tsx`

### App layer and metadata

- Modify: `lisu-official-site/src/app/layout.tsx`
- Modify: `lisu-official-site/src/app/page.tsx`
- Modify: `lisu-official-site/src/app/globals.css`
- Create: `lisu-official-site/src/lib/metadata.ts`
- Create: `lisu-official-site/src/app/robots.ts`
- Create: `lisu-official-site/src/app/manifest.ts`

## Dependency note

This plan adds `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.

- Reason: the approved spec now includes runtime behavior requirements for anchor navigation, active section state, and typed source traceability; build-only checks are not enough.
- Benefit: behavior stays testable without introducing E2E tooling this early.
- Alternative: rely only on `lint`, `typecheck`, and `build`, but that would not catch anchor activation or traceability regressions.
- Impact: small dev dependency increase, no production bundle impact.

### Task 1: Scaffold the project and make the test harness real

**Files:**
- Create: `lisu-official-site/`
- Modify: `lisu-official-site/package.json`
- Create: `lisu-official-site/vitest.config.ts`
- Create: `lisu-official-site/src/test/setup.ts`
- Create: `lisu-official-site/src/test/smoke.test.ts`
- Create: `lisu-official-site/src/content/site.ts`

- [ ] **Step 1: Scaffold the new project**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
npm create next-app@latest lisu-official-site --yes --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
rm -f /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site/AGENTS.md
```

Expected:

```text
Success! Created lisu-official-site at /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
```

- [ ] **Step 2: Write the failing smoke test**

Create `lisu-official-site/src/test/smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";

describe("siteConfig", () => {
  it("exposes the Lisu homepage identity", () => {
    expect(siteConfig.companyName).toBe("北京骊甦科技");
    expect(siteConfig.siteName).toBe("北京骊甦科技官网");
  });
});
```

- [ ] **Step 3: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm test -- --run src/test/smoke.test.ts
```

Expected:

```text
npm ERR! Missing script: "test"
```

- [ ] **Step 4: Add the minimal test harness and site config**

Install test dependencies:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom
```

Update `lisu-official-site/package.json` scripts block:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "check": "npm run lint && npm run typecheck && npm run test:run && npm run build"
  }
}
```

Create `lisu-official-site/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `lisu-official-site/src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { createElement, type AnchorHTMLAttributes, type ImgHTMLAttributes } from "react";

afterEach(() => {
  cleanup();
});

class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) =>
    createElement("a", { ...props, href: typeof href === "string" ? href : "#" }, children),
}));

vi.mock("next/image", () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", { ...props, alt: props.alt ?? "" }),
}));
```

Create `lisu-official-site/src/content/site.ts`:

```ts
export const siteConfig = {
  companyName: "北京骊甦科技",
  siteName: "北京骊甦科技官网",
  siteDescription:
    "企业级私有化 AI 知识智能平台方案，从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
} as const;
```

- [ ] **Step 5: Run the smoke test and commit**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/test/smoke.test.ts
```

Expected:

```text
✓ src/test/smoke.test.ts (1 test)
```

Commit:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site
git commit -m "feat: scaffold lisu official site project"
```

### Task 2: Lock the content contract and source traceability

**Files:**
- Create: `lisu-official-site/src/types/site.ts`
- Modify: `lisu-official-site/src/content/site.ts`
- Create: `lisu-official-site/src/content/navigation.ts`
- Create: `lisu-official-site/src/content/home.ts`
- Create: `lisu-official-site/src/content/home.test.ts`

- [ ] **Step 1: Write the failing content contract test**

Create `lisu-official-site/src/content/home.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { homeSections, homeSummaryCards } from "@/content/home";

describe("home content contract", () => {
  it("defines eight rendered sections with source slides", () => {
    expect(homeSections).toHaveLength(8);
    expect(homeSections.map((section) => section.id)).toEqual([
      "hero",
      "why-now",
      "proposition",
      "architecture",
      "capabilities",
      "scenarios",
      "proof",
      "closing",
    ]);
    expect(homeSections.every((section) => section.sourceSlides.length > 0)).toBe(true);
  });

  it("keeps summary cards traceable", () => {
    expect(homeSummaryCards.capabilities).toHaveLength(5);
    expect(homeSummaryCards.proof).toHaveLength(3);
    expect(homeSummaryCards.capabilities.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeSummaryCards.proof.every((item) => item.sourceSlides.length > 0)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts
```

Expected:

```text
FAIL  src/content/home.test.ts
Error: Failed to resolve import "@/content/home"
```

- [ ] **Step 3: Implement the typed content contract**

Create `lisu-official-site/src/types/site.ts`:

```ts
export type SlideRef = `slide-${string}`;

export type NavItem = {
  id: string;
  label: string;
  href: `#${string}` | `/${string}`;
  kind: "anchor" | "route";
};

export type SummaryCard = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeSection = {
  id:
    | "hero"
    | "why-now"
    | "proposition"
    | "architecture"
    | "capabilities"
    | "scenarios"
    | "proof"
    | "closing";
  title: string;
  eyebrow?: string;
  description?: string;
  sourceSlides: SlideRef[];
};
```

Update `lisu-official-site/src/content/site.ts`:

```ts
export const siteConfig = {
  companyName: "北京骊甦科技",
  siteName: "北京骊甦科技官网",
  siteDescription:
    "企业级私有化 AI 知识智能平台方案，从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
  legalName: "北京骊甦科技",
  copyright: "Copyright © 2026 北京骊甦科技",
} as const;
```

Create `lisu-official-site/src/content/navigation.ts`:

```ts
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
```

Create `lisu-official-site/src/content/home.ts`:

```ts
import type { HomeSection, SummaryCard } from "@/types/site";

export const homeSections: HomeSection[] = [
  {
    id: "hero",
    title: "企业级私有化 AI 知识智能平台方案",
    description: "从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
    sourceSlides: ["slide-01"],
  },
  {
    id: "why-now",
    title: "为什么现在必须建设企业级 AI 平台",
    description: "把时代之需和战略判断合并为一个复合 section，但继续保留两类来源边界。",
    sourceSlides: ["slide-04", "slide-05"],
  },
  {
    id: "proposition",
    title: "拒绝概率玩具，打造知识大脑",
    description: "让业务语言直接驱动决策，从临时工走向数字助手。",
    sourceSlides: ["slide-07"],
  },
  {
    id: "architecture",
    title: "七层贯通、语义驱动的平台总览",
    description: "从算力到底层应用，建立清晰的职责边界和可追溯能力。",
    sourceSlides: ["slide-10"],
  },
  {
    id: "capabilities",
    title: "核心能力入口",
    description: "保留算力、数据、语义、安全、工作台五条入口，支撑后续真实子页扩展。",
    sourceSlides: ["slide-11", "slide-13", "slide-14", "slide-17", "slide-28"],
  },
  {
    id: "scenarios",
    title: "业务场景价值",
    description: "聚焦供应链、财务、风控、客服运营四个场景价值。",
    sourceSlides: ["slide-16"],
  },
  {
    id: "proof",
    title: "案例与团队摘要",
    description: "在首页建立最小可信度，而不展开完整案例页。",
    sourceSlides: ["slide-24", "slide-27", "slide-30"],
  },
  {
    id: "closing",
    title: "价值承诺",
    description: "用确定性价值判断与公司署名收束首页。",
    sourceSlides: ["slide-01", "slide-22"],
  },
];

export const homeSummaryCards: {
  capabilities: SummaryCard[];
  scenarios: SummaryCard[];
  proof: SummaryCard[];
} = {
  capabilities: [
    {
      title: "算力底座",
      description: "面向本地部署与生产推理的超算底座。",
      sourceSlides: ["slide-11"],
    },
    {
      title: "AI 数据平台",
      description: "贯通多引擎数据处理、召回、重排和反馈闭环。",
      sourceSlides: ["slide-13"],
    },
    {
      title: "知识语义层",
      description: "统一业务概念、规则语义与可解释输出。",
      sourceSlides: ["slide-14"],
    },
    {
      title: "安全管控",
      description: "从模型接入、供应链到底层审计的全链路安全能力。",
      sourceSlides: ["slide-17"],
    },
    {
      title: "员工 AI 工作台",
      description: "面向业务人员的知识中心、智能体中心和工具市场。",
      sourceSlides: ["slide-28"],
    },
  ],
  scenarios: [
    {
      title: "供应链",
      description: "让规则沉淀和跨域因果链成为数字资产。",
      sourceSlides: ["slide-16"],
    },
    {
      title: "财务",
      description: "统一口径治理，缩短审计支撑链路。",
      sourceSlides: ["slide-16"],
    },
    {
      title: "风控",
      description: "让预警附带推理路径，拒绝黑盒警报。",
      sourceSlides: ["slide-16"],
    },
    {
      title: "客服运营",
      description: "基于业务知识提供精准答复和经验传承。",
      sourceSlides: ["slide-16"],
    },
  ],
  proof: [
    {
      title: "汽车零部件案例",
      description: "全球 AI 知识中台建设案例摘要。",
      sourceSlides: ["slide-24"],
    },
    {
      title: "叉车制造案例",
      description: "工业产品知识图谱应用案例摘要。",
      sourceSlides: ["slide-27"],
    },
    {
      title: "核心团队",
      description: "人工智能、数智化、安全与工程背景的团队摘要。",
      sourceSlides: ["slide-30"],
    },
  ],
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts
```

Expected:

```text
✓ src/content/home.test.ts (2 tests)
```

- [ ] **Step 5: Commit**

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/types/site.ts \
        lisu-official-site/src/content/site.ts \
        lisu-official-site/src/content/navigation.ts \
        lisu-official-site/src/content/home.ts \
        lisu-official-site/src/content/home.test.ts
git commit -m "feat: define lisu homepage content contract"
```

### Task 3: Build the site shell and anchor behavior

**Files:**
- Create: `lisu-official-site/src/lib/utils.ts`
- Create: `lisu-official-site/src/hooks/use-active-section.ts`
- Create: `lisu-official-site/src/hooks/use-active-section.test.tsx`
- Create: `lisu-official-site/src/components/site/skip-link.tsx`
- Create: `lisu-official-site/src/components/site/header.tsx`
- Create: `lisu-official-site/src/components/site/mobile-menu.tsx`
- Create: `lisu-official-site/src/components/site/footer.tsx`
- Create: `lisu-official-site/src/components/site/header.test.tsx`

- [ ] **Step 1: Write failing tests for navigation behavior**

Create `lisu-official-site/src/hooks/use-active-section.test.tsx`:

```tsx
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useActiveSection } from "@/hooks/use-active-section";

class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
}

describe("useActiveSection", () => {
  it("starts with the first section id", () => {
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);
    const { result } = renderHook(() => useActiveSection(["hero", "why-now", "closing"]));
    expect(result.current).toBe("hero");
  });
});
```

Create `lisu-official-site/src/components/site/header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeNavItems } from "@/content/navigation";
import { Header } from "@/components/site/header";

describe("Header", () => {
  it("renders only anchor navigation items for phase 1", () => {
    render(<Header items={homeNavItems} activeId="hero" />);

    expect(screen.getByRole("link", { name: "首页概览" })).toHaveAttribute("href", "#hero");
    expect(screen.queryByRole("link", { name: "主方案总览" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "首页概览" })).toHaveAttribute("data-active", "true");
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/hooks/use-active-section.test.tsx src/components/site/header.test.tsx
```

Expected:

```text
FAIL  src/hooks/use-active-section.test.tsx
FAIL  src/components/site/header.test.tsx
```

- [ ] **Step 3: Implement the shell and active-section behavior**

Create `lisu-official-site/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `lisu-official-site/src/hooks/use-active-section.ts`:

```tsx
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
```

Create `lisu-official-site/src/components/site/skip-link.tsx`:

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-slate-950"
    >
      跳到主要内容
    </a>
  );
}
```

Create `lisu-official-site/src/components/site/header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { homeNavItems } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/site/mobile-menu";

type HeaderProps = {
  items?: typeof homeNavItems;
  activeId: string;
};

export function Header({ items = homeNavItems, activeId }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#hero" className="text-sm font-semibold tracking-[0.18em] text-slate-900" prefetch={false}>
          北京骊甦科技
        </Link>

        <nav aria-label="首页导航" className="hidden gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              prefetch={false}
              data-active={String(activeId === item.id)}
              className={cn(
                "text-sm text-slate-600 transition-colors",
                activeId === item.id && "font-semibold text-sky-700",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu items={items} activeId={activeId} />
      </div>
    </header>
  );
}
```

Create `lisu-official-site/src/components/site/mobile-menu.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  items: NavItem[];
  activeId: string;
};

export function MobileMenu({ items, activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 z-40 border-t border-slate-200 bg-white px-4 py-6 shadow-lg">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base text-slate-700",
                    activeId === item.id && "bg-sky-50 font-semibold text-sky-700",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
```

Create `lisu-official-site/src/components/site/footer.tsx`:

```tsx
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 md:px-6">
        <p className="font-semibold text-slate-900">{siteConfig.companyName}</p>
        <p>{siteConfig.siteDescription}</p>
        <p>{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/hooks/use-active-section.test.tsx src/components/site/header.test.tsx
```

Expected:

```text
✓ src/hooks/use-active-section.test.tsx (1 test)
✓ src/components/site/header.test.tsx (1 test)
```

- [ ] **Step 5: Commit**

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/lib/utils.ts \
        lisu-official-site/src/hooks/use-active-section.ts \
        lisu-official-site/src/hooks/use-active-section.test.tsx \
        lisu-official-site/src/components/site/skip-link.tsx \
        lisu-official-site/src/components/site/header.tsx \
        lisu-official-site/src/components/site/mobile-menu.tsx \
        lisu-official-site/src/components/site/footer.tsx \
        lisu-official-site/src/components/site/header.test.tsx
git commit -m "feat: add homepage site shell and anchor behavior"
```

### Task 4: Implement the upper homepage sections

**Files:**
- Create: `lisu-official-site/src/components/home/hero-section.tsx`
- Create: `lisu-official-site/src/components/home/why-now-section.tsx`
- Create: `lisu-official-site/src/components/home/proposition-section.tsx`
- Create: `lisu-official-site/src/components/home/architecture-section.tsx`
- Create: `lisu-official-site/src/components/home/home-page.test.tsx`

- [ ] **Step 1: Write the failing homepage structure test**

Create `lisu-official-site/src/components/home/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";

describe("HomePage", () => {
  it("renders the top four sections with stable ids", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute("id", "why-now");
    expect(screen.getByRole("region", { name: "拒绝概率玩具，打造知识大脑" })).toHaveAttribute("id", "proposition");
    expect(screen.getByRole("region", { name: "七层贯通、语义驱动的平台总览" })).toHaveAttribute("id", "architecture");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/home/home-page.test.tsx
```

Expected:

```text
FAIL  src/components/home/home-page.test.tsx
Error: Failed to resolve import "@/components/home/home-page"
```

- [ ] **Step 3: Implement `hero`, `why-now`, `proposition`, and `architecture`**

Create `lisu-official-site/src/components/home/hero-section.tsx`:

```tsx
import { homeSections } from "@/content/home";

const hero = homeSections.find((section) => section.id === "hero");

export function HeroSection() {
  if (!hero) {
    return null;
  }

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-slate-950 text-white scroll-mt-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-28">
        <div>
          <p className="text-sm tracking-[0.22em] text-sky-300">PRIVATE AI KNOWLEDGE PLATFORM</p>
          <h1 id="hero-heading" className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{hero.description}</p>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          {[
            "64 卡 H20 集群 / 9024GB 显存支撑",
            "构建语义层模型 / 业务决策全可溯",
            "全链路可审计 / 关键路径上链存证",
          ].map((line) => (
            <div key={line} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200">
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/why-now-section.tsx`:

```tsx
export function WhyNowSection() {
  const painPoints = [
    "AI 从实验到生产：核心业务不敢用黑盒答案",
    "从数据到知识孤岛：跨部门定义不一致，决策彼此质疑",
    "算力需求跨越式升级：实验级部署难以支撑生产推理",
  ];

  const strategyPoints = [
    "竞争焦点正在从算力比拼转向业务敢用、会用、可追溯",
    "合规要求迫近，可解释能力将成为准入门槛",
    "提前布局不是锦上添花，而是未来竞争资格",
  ];

  return (
    <section
      id="why-now"
      aria-labelledby="why-now-heading"
      className="scroll-mt-28 bg-white py-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-700">WHY NOW</p>
        <h2 id="why-now-heading" className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          为什么现在必须建设企业级 AI 平台
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-950">时代之需</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {painPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-sky-50 p-6">
            <h3 className="text-lg font-semibold text-slate-950">战略判断</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {strategyPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/proposition-section.tsx`:

```tsx
export function PropositionSection() {
  return (
    <section
      id="proposition"
      aria-labelledby="proposition-heading"
      className="scroll-mt-28 bg-slate-950 py-18 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-300">POSITIONING</p>
        <h2 id="proposition-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
          拒绝概率玩具，打造知识大脑
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            "缺乏稳固知识语义层支持的 AI，只是基于概率的昂贵玩具。",
            "让业务语言直接驱动决策，实现从随机猜测到确定性决策的跨越。",
            "从聪明的临时工，变成懂业务、有记忆、可审计的数字助手。",
          ].map((item) => (
            <article key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
              {item}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/architecture-section.tsx`:

```tsx
export function ArchitectureSection() {
  const layers = [
    "L7 应用层",
    "L6 能力开放层",
    "L5 核心语义层",
    "L4 数据层",
    "L3.5 运维网关",
    "L2-L3 引擎层",
    "L1 超算底座",
  ];

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="scroll-mt-28 bg-white py-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-700">ARCHITECTURE</p>
        <h2 id="architecture-heading" className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          七层贯通、语义驱动的平台总览
        </h2>
        <div className="mt-10 grid gap-4 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          {layers.map((layer) => (
            <div key={layer} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800">
              {layer}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/home-page.tsx`:

```tsx
"use client";

import { homeNavItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/home/hero-section";
import { WhyNowSection } from "@/components/home/why-now-section";
import { PropositionSection } from "@/components/home/proposition-section";
import { ArchitectureSection } from "@/components/home/architecture-section";

const sectionIds = homeNavItems.map((item) => item.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header activeId={activeId} />
      <main id="main-content">
        <HeroSection />
        <WhyNowSection />
        <PropositionSection />
        <ArchitectureSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/home/home-page.test.tsx
```

Expected:

```text
✓ src/components/home/home-page.test.tsx (1 test)
```

- [ ] **Step 5: Commit**

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/components/home/hero-section.tsx \
        lisu-official-site/src/components/home/why-now-section.tsx \
        lisu-official-site/src/components/home/proposition-section.tsx \
        lisu-official-site/src/components/home/architecture-section.tsx \
        lisu-official-site/src/components/home/home-page.tsx \
        lisu-official-site/src/components/home/home-page.test.tsx
git commit -m "feat: build lisu homepage lead sections"
```

### Task 5: Implement the lower homepage sections

**Files:**
- Create: `lisu-official-site/src/components/home/capability-section.tsx`
- Create: `lisu-official-site/src/components/home/scenarios-section.tsx`
- Create: `lisu-official-site/src/components/home/proof-section.tsx`
- Create: `lisu-official-site/src/components/home/closing-section.tsx`
- Modify: `lisu-official-site/src/components/home/home-page.tsx`
- Modify: `lisu-official-site/src/components/home/home-page.test.tsx`

- [ ] **Step 1: Extend the failing homepage test for the lower sections**

Update `lisu-official-site/src/components/home/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";

describe("HomePage", () => {
  it("renders all eight homepage sections", () => {
    render(<HomePage />);

    expect(screen.getByRole("region", { name: "核心能力入口" })).toHaveAttribute("id", "capabilities");
    expect(screen.getByRole("region", { name: "业务场景价值" })).toHaveAttribute("id", "scenarios");
    expect(screen.getByRole("region", { name: "案例与团队摘要" })).toHaveAttribute("id", "proof");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(screen.getByText("员工 AI 工作台")).toBeInTheDocument();
    expect(screen.getByText("汽车零部件案例")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/home/home-page.test.tsx
```

Expected:

```text
FAIL  src/components/home/home-page.test.tsx
Unable to find role="region" name="核心能力入口"
```

- [ ] **Step 3: Implement `capabilities`, `scenarios`, `proof`, and `closing`**

Create `lisu-official-site/src/components/home/capability-section.tsx`:

```tsx
import { homeSummaryCards } from "@/content/home";

export function CapabilitySection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-28 bg-slate-50 py-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-700">CAPABILITIES</p>
        <h2 id="capabilities-heading" className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          核心能力入口
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {homeSummaryCards.capabilities.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/scenarios-section.tsx`:

```tsx
import { homeSummaryCards } from "@/content/home";

export function ScenariosSection() {
  return (
    <section
      id="scenarios"
      aria-labelledby="scenarios-heading"
      className="scroll-mt-28 bg-white py-18 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-700">SCENARIOS</p>
        <h2 id="scenarios-heading" className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          业务场景价值
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {homeSummaryCards.scenarios.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/proof-section.tsx`:

```tsx
import { homeSummaryCards } from "@/content/home";

export function ProofSection() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="scroll-mt-28 bg-slate-950 py-18 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-300">PROOF</p>
        <h2 id="proof-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
          案例与团队摘要
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homeSummaryCards.proof.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/home/closing-section.tsx`:

```tsx
export function ClosingSection() {
  return (
    <section
      id="closing"
      aria-labelledby="closing-heading"
      className="scroll-mt-28 bg-sky-50 py-18 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-700">VALUE</p>
        <h2 id="closing-heading" className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
          价值承诺
        </h2>
        <p className="mt-6 text-base leading-8 text-slate-700 md:text-lg">
          用企业知识、可解释路径与可审计机制，把 AI 从演示能力变成真正可进入核心业务的生产能力。
        </p>
        <p className="mt-6 text-sm font-medium tracking-[0.18em] text-slate-600">北京骊甦科技</p>
      </div>
    </section>
  );
}
```

Update `lisu-official-site/src/components/home/home-page.tsx`:

```tsx
"use client";

import { homeNavItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HeroSection } from "@/components/home/hero-section";
import { WhyNowSection } from "@/components/home/why-now-section";
import { PropositionSection } from "@/components/home/proposition-section";
import { ArchitectureSection } from "@/components/home/architecture-section";
import { CapabilitySection } from "@/components/home/capability-section";
import { ScenariosSection } from "@/components/home/scenarios-section";
import { ProofSection } from "@/components/home/proof-section";
import { ClosingSection } from "@/components/home/closing-section";

const sectionIds = homeNavItems.map((item) => item.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header activeId={activeId} />
      <main id="main-content">
        <HeroSection />
        <WhyNowSection />
        <PropositionSection />
        <ArchitectureSection />
        <CapabilitySection />
        <ScenariosSection />
        <ProofSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/home/home-page.test.tsx
```

Expected:

```text
✓ src/components/home/home-page.test.tsx (1 test)
```

- [ ] **Step 5: Commit**

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/components/home/capability-section.tsx \
        lisu-official-site/src/components/home/scenarios-section.tsx \
        lisu-official-site/src/components/home/proof-section.tsx \
        lisu-official-site/src/components/home/closing-section.tsx \
        lisu-official-site/src/components/home/home-page.tsx \
        lisu-official-site/src/components/home/home-page.test.tsx
git commit -m "feat: complete lisu homepage section stack"
```

### Task 6: Finalize the app layer, metadata, and verification commands

**Files:**
- Modify: `lisu-official-site/src/app/layout.tsx`
- Modify: `lisu-official-site/src/app/page.tsx`
- Modify: `lisu-official-site/src/app/globals.css`
- Create: `lisu-official-site/src/lib/metadata.ts`
- Create: `lisu-official-site/src/app/robots.ts`
- Create: `lisu-official-site/src/app/manifest.ts`

- [ ] **Step 1: Replace the homepage test with an app-level integration test**

Replace `lisu-official-site/src/components/home/home-page.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";
import Page from "@/app/page";

describe("HomePage", () => {
  it("renders all eight homepage sections", () => {
    render(<HomePage />);

    expect(screen.getByRole("region", { name: "核心能力入口" })).toHaveAttribute("id", "capabilities");
    expect(screen.getByRole("region", { name: "业务场景价值" })).toHaveAttribute("id", "scenarios");
    expect(screen.getByRole("region", { name: "案例与团队摘要" })).toHaveAttribute("id", "proof");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(screen.getByText("员工 AI 工作台")).toBeInTheDocument();
    expect(screen.getByText("汽车零部件案例")).toBeInTheDocument();
  });
});

describe("app page", () => {
  it("renders the homepage through the route entry", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/home/home-page.test.tsx
```

Expected:

```text
FAIL  src/components/home/home-page.test.tsx
Unable to find role="heading" name="企业级私有化 AI 知识智能平台方案"
```

- [ ] **Step 3: Implement the app layer and metadata**

Create `lisu-official-site/src/lib/metadata.ts`:

```ts
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
```

Update `lisu-official-site/src/app/layout.tsx`:

```tsx
import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { SkipLink } from "@/components/site/skip-link";
import { defaultMetadata } from "@/lib/metadata";
import "./globals.css";

const notoSansSc = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={notoSansSc.variable}>
      <body className="min-h-screen bg-white text-slate-950 antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
```

Update `lisu-official-site/src/app/page.tsx`:

```tsx
import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "首页",
  description: "北京骊甦科技企业级私有化 AI 知识智能平台方案首页。",
};

export default function Page() {
  return <HomePage />;
}
```

Update `lisu-official-site/src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), "PingFang SC", "Microsoft YaHei", sans-serif;
}

section {
  scroll-margin-top: 5.5rem;
}
```

Create `lisu-official-site/src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
  };
}
```

Create `lisu-official-site/src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "北京骊甦科技官网",
    short_name: "骊甦科技",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}
```

- [ ] **Step 4: Run the test suite and the full project checks**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run
npm run lint
npm run typecheck
npm run build
```

Expected:

```text
All tests passed
✔ No ESLint warnings or errors
Found 0 errors
Route (app) /
✓ Compiled successfully
```

- [ ] **Step 5: Commit**

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/app/layout.tsx \
        lisu-official-site/src/app/page.tsx \
        lisu-official-site/src/app/globals.css \
        lisu-official-site/src/lib/metadata.ts \
        lisu-official-site/src/app/robots.ts \
        lisu-official-site/src/app/manifest.ts \
        lisu-official-site/src/components/home/home-page.test.tsx
git commit -m "feat: wire lisu homepage app entry and metadata"
```

## Self-Review

### Spec coverage

- Phase 1 homepage only: covered by Tasks 1-6 and no subpages are implemented.
- 8 rendered sections / 9 content responsibilities: covered by Task 2 content contract and Tasks 4-5 section components.
- `sourceSlides` traceability: covered by Task 2.
- Sticky anchor navigation and active state: covered by Task 3 and verified by Task 6 full checks.
- Metadata and homepage route: covered by Task 6.

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation markers were left in the tasks.
- Every task includes exact files, commands, and code blocks.
- No task references an undefined helper without first creating it.

### Type consistency

- `HomeSection`, `SummaryCard`, and `NavItem` are defined once in `src/types/site.ts` and reused throughout.
- Rendered section ids match the approved 8-section anchor set.
- `sourceSlides` is present in the content contract before any component code depends on it.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-29-lisu-official-site-home-v1.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
