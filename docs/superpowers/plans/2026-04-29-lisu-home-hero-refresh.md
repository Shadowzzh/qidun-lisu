# Lisu Home Hero Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the homepage hero so the banner stays bright and only shows the centered slogan `AI 创造无限可能`, while moving the existing capability metrics below the banner.

**Architecture:** Keep the change local to the existing homepage hero boundary instead of reshaping the whole page. Tighten the `HomeHeroContent` contract so the hero no longer carries eyebrow or description copy, then refactor `HeroBand` to render a direct-on-image gradient headline with a lighter overlay and the existing metrics rail below the banner.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library

---

## File Map

- Modify: `lisu-official-site/src/types/site.ts`
  - Remove the unused hero `eyebrow` and `description` fields from `HomeHeroContent`.
- Modify: `lisu-official-site/src/content/home.ts`
  - Replace the hero title with `AI 创造无限可能` and keep the three metrics as the post-banner continuation layer.
- Modify: `lisu-official-site/src/content/home.test.ts`
  - Update the content contract assertions to match the refreshed hero copy.
- Modify: `lisu-official-site/src/components/pages/home/hero-band.tsx`
  - Remove the white content card, replace the dark overlay with a bright lightweight overlay, render a centered gradient headline, and keep the metrics rail below the banner.
- Modify: `lisu-official-site/src/components/pages/home/hero-band.test.tsx`
  - Assert the new one-line hero and the removal of the old card-based content panel.
- Modify: `lisu-official-site/src/components/pages/home/home-page.test.tsx`
  - Update page-level assertions so the homepage regression suite checks the new hero contract.

### Task 1: Lock the refreshed hero behavior with failing tests

**Files:**
- Modify: `lisu-official-site/src/content/home.test.ts`
- Modify: `lisu-official-site/src/components/pages/home/hero-band.test.tsx`
- Modify: `lisu-official-site/src/components/pages/home/home-page.test.tsx`

- [ ] **Step 1: Write the failing tests for the refreshed hero**

Update `lisu-official-site/src/content/home.test.ts`:

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
    expect(homeHero.title).toBe("AI 创造无限可能");
    expect(homeHero.metrics.map((metric) => metric.title)).toEqual([
      "澎湃算力底座",
      "知识驱动决策",
      "内生安全体系",
    ]);
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

Update `lisu-official-site/src/components/pages/home/hero-band.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBand } from "@/components/pages/home/hero-band";
import { homeHero } from "@/content/home";

describe("HeroBand", () => {
  it("renders a single centered slogan over the hero image and keeps metrics below the banner", () => {
    const { container } = render(<HeroBand content={homeHero} />);
    const metricsRail = container.querySelector("[data-testid='hero-metrics-rail']");

    expect(screen.getByRole("heading", { name: "AI 创造无限可能" })).toBeInTheDocument();
    expect(screen.queryByText("PRIVATE AI KNOWLEDGE PLATFORM")).not.toBeInTheDocument();
    expect(screen.queryByText("从「数据查询」到「知识决策」，构建可解释、可审计的企业智能中枢。")).not.toBeInTheDocument();
    expect(container.querySelector("[data-testid='hero-content-panel']")).not.toBeInTheDocument();
    expect(container.querySelector("[data-testid='hero-title']")).toBeInTheDocument();
    expect(screen.getByText("64 卡 H20 集群，9024GB 显存支撑。")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-testid='home-visual-hero']")).toHaveLength(2);
    expect(metricsRail).toBeInTheDocument();
  });
});
```

Update `lisu-official-site/src/components/pages/home/home-page.test.tsx`:

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

  it("renders the homepage as a five-section multipage entry shell with the refreshed hero", () => {
    render(<HomePage />);

    const heroRegion = screen.getByRole("region", { name: "AI 创造无限可能" });
    const overviewRegion = screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" });

    expect(heroRegion).toHaveAttribute("id", "hero");
    expect(within(heroRegion).queryByText("PRIVATE AI KNOWLEDGE PLATFORM")).not.toBeInTheDocument();
    expect(within(heroRegion).getByText("澎湃算力底座")).toBeInTheDocument();
    expect(overviewRegion).toHaveAttribute("id", "overview");
    expect(within(overviewRegion).getByText("L7 应用层")).toBeInTheDocument();
    expect(within(overviewRegion).getByText("L1 超算底座")).toBeInTheDocument();
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

    expect(screen.getByRole("region", { name: "AI 创造无限可能" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the targeted tests and verify the red state**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts src/components/pages/home/hero-band.test.tsx src/components/pages/home/home-page.test.tsx
```

Expected:

```text
FAIL  src/content/home.test.ts > home content contract > maps the homepage into a multipage-entry structure
  Expected: "AI 创造无限可能"
  Received: "企业级私有化 AI 知识智能平台方案"

FAIL  src/components/pages/home/hero-band.test.tsx > HeroBand > renders a single centered slogan over the hero image and keeps metrics below the banner
  expected document not to contain text "PRIVATE AI KNOWLEDGE PLATFORM"

FAIL  src/components/pages/home/home-page.test.tsx > HomePage > renders the homepage as a five-section multipage entry shell with the refreshed hero
  Unable to find an accessible role="region" with name "AI 创造无限可能"
```

- [ ] **Step 3: Confirm the failures are the intended behavior gap**

Check:

- The content test fails because the hero title is still the old long solution title.
- The hero component test fails because the eyebrow, description, and white content panel still render.
- The page test fails because the route still renders the old hero.

Do not change production code until all three failures are caused by the missing refresh behavior rather than syntax or import errors.

- [ ] **Step 4: Keep the failing test list visible while implementing**

Re-run the same command immediately before editing production files if any unrelated failure appears:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts src/components/pages/home/hero-band.test.tsx src/components/pages/home/home-page.test.tsx
```

Expected:

```text
3 failed
```

- [ ] **Step 5: Start implementation only after the red state is stable**

Proceed only when the failure output is stable and limited to the refreshed hero expectations above.

### Task 2: Implement the minimal hero refresh to satisfy the new contract

**Files:**
- Modify: `lisu-official-site/src/types/site.ts`
- Modify: `lisu-official-site/src/content/home.ts`
- Modify: `lisu-official-site/src/components/pages/home/hero-band.tsx`

- [ ] **Step 1: Remove obsolete hero fields from the shared type**

Update the `HomeHeroContent` type in `lisu-official-site/src/types/site.ts`:

```ts
export type HomeHeroContent = {
  id: "hero";
  title: string;
  metrics: HomeMetric[];
  desktopVisual: HomeVisualSlot;
  mobileVisual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};
```

- [ ] **Step 2: Replace the hero copy with the approved slogan**

Update the `homeHero` export in `lisu-official-site/src/content/home.ts`:

```ts
export const homeHero: HomeHeroContent = {
  id: "hero",
  title: "AI 创造无限可能",
  desktopVisual: homeVisuals.heroDesktop,
  mobileVisual: homeVisuals.heroMobile,
  sourceSlides: ["slide-01"],
  metrics: [
    {
      title: "澎湃算力底座",
      description: "64 卡 H20 集群，9024GB 显存支撑。",
      sourceSlides: ["slide-01"],
    },
    {
      title: "知识驱动决策",
      description: "构建语义层模型，让业务决策全可溯。",
      sourceSlides: ["slide-01"],
    },
    {
      title: "内生安全体系",
      description: "全链路可审计，关键路径上链存证。",
      sourceSlides: ["slide-01"],
    },
  ],
};
```

- [ ] **Step 3: Rewrite the hero layout to use a bright banner and a direct-on-image headline**

Replace `lisu-official-site/src/components/pages/home/hero-band.tsx` with:

```tsx
"use client";

import { HomeVisual } from "@/components/pages/home/home-visual";
import { cn } from "@/lib/utils";
import type { HomeHeroContent } from "@/types/site";

type HeroBandProps = {
  content: HomeHeroContent;
};

export function HeroBand({ content }: HeroBandProps) {
  return (
    <section id={content.id} aria-labelledby="home-hero-heading" className="relative overflow-hidden bg-[#f5faff]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="hidden h-full w-full md:block">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.desktopVisual} />
        </div>
        <div className="h-full w-full md:hidden">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.mobileVisual} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(247,251,255,0.28)_56%,rgba(245,250,255,0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center justify-center px-4 pb-20 pt-16 text-center md:min-h-[620px] md:pb-24 md:pt-20">
        <h1
          id="home-hero-heading"
          data-testid="hero-title"
          className="max-w-[10ch] bg-[linear-gradient(90deg,#1d4ed8_0%,#2563eb_48%,#0ea5e9_100%)] bg-clip-text text-5xl font-semibold leading-[1.08] text-transparent [text-shadow:0_10px_30px_rgba(255,255,255,0.24)] md:text-7xl"
        >
          {content.title}
        </h1>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 pb-10 md:-mt-10 md:pb-14">
        <ul data-testid="hero-metrics-rail" className="grid gap-4 md:grid-cols-3">
          {content.metrics.map((metric, index) => (
            <li
              key={metric.title}
              className={cn(
                "rounded-[24px] border border-sky-100/90 bg-white/92 px-6 py-6 text-left shadow-[0_20px_48px_rgba(148,163,184,0.18)] backdrop-blur-sm",
                index === 0 && "md:translate-y-2",
                index === 2 && "md:translate-y-2",
              )}
            >
              <p className="text-base font-semibold text-slate-950">{metric.title}</p>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{metric.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Re-run the targeted tests and verify they turn green**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts src/components/pages/home/hero-band.test.tsx src/components/pages/home/home-page.test.tsx
```

Expected:

```text
PASS  src/content/home.test.ts
PASS  src/components/pages/home/hero-band.test.tsx
PASS  src/components/pages/home/home-page.test.tsx
```

- [ ] **Step 5: Refactor only if all three tests are already green**

Allowed refactors after green:

- Adjust the exact gradient stop values if the banner colors need tighter visual matching.
- Tighten `min-h-*`, `pb-*`, or `md:-mt-*` spacing values if the metrics rail sits too close or too far from the banner.

Do not add new copy, new sections, or new dependencies.

### Task 3: Verify the refreshed hero against the wider project checks and commit it cleanly

**Files:**
- Modify: `lisu-official-site/src/content/home.test.ts`
- Modify: `lisu-official-site/src/components/pages/home/hero-band.test.tsx`
- Modify: `lisu-official-site/src/components/pages/home/home-page.test.tsx`
- Modify: `lisu-official-site/src/types/site.ts`
- Modify: `lisu-official-site/src/content/home.ts`
- Modify: `lisu-official-site/src/components/pages/home/hero-band.tsx`

- [ ] **Step 1: Run the full verification command for the project**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run check
```

Expected:

```text
eslint: 0 errors
tsc: 0 errors
vitest: all tests passed
next build: compiled successfully
```

- [ ] **Step 2: Inspect the final diff before committing**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git diff -- lisu-official-site/src/types/site.ts lisu-official-site/src/content/home.ts lisu-official-site/src/content/home.test.ts lisu-official-site/src/components/pages/home/hero-band.tsx lisu-official-site/src/components/pages/home/hero-band.test.tsx lisu-official-site/src/components/pages/home/home-page.test.tsx
```

Expected:

```text
Only the hero content contract, hero component, and hero-related tests changed.
```

- [ ] **Step 3: Commit the hero refresh**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/types/site.ts lisu-official-site/src/content/home.ts lisu-official-site/src/content/home.test.ts lisu-official-site/src/components/pages/home/hero-band.tsx lisu-official-site/src/components/pages/home/hero-band.test.tsx lisu-official-site/src/components/pages/home/home-page.test.tsx
git commit -m "feat: simplify home hero presentation"
```

Expected:

```text
[branch-name] feat: simplify home hero presentation
```

- [ ] **Step 4: Record the verification evidence in the working notes**

Capture:

- The `npm run check` result.
- The fact that the hero now renders `AI 创造无限可能` as the only hero-line copy.
- The fact that the three metrics still render below the banner.

Use the final handoff message to report these three points explicitly.

- [ ] **Step 5: Hand off for visual review**

Ask for one focused review pass on:

- The brightness of the banner after the overlay change.
- The readability of the blue gradient title on both desktop and mobile.
- The vertical rhythm between the banner and the metrics rail.
