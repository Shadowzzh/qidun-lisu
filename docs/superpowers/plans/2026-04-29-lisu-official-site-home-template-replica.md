# Lisu Homepage Template Replica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt `lisu-official-site` homepage onto the `ai-website-cloner-template` homepage structure and shell with Lisu-specific content, archive-derived imagery, placeholder fallbacks, and MCP-based validation.

**Architecture:** Replace the current 8-section homepage with a template-shaped page composed of 4 primary bands plus a simplified template-style shell, but do it by porting the template page wrappers and major class scaffolding instead of inventing a new outer layout. Keep all homepage copy and traceability in `src/content/home.ts`, move runtime imagery into `src/assets/home/*`, and render every image slot through a single asset contract that can fall back to a descriptive placeholder without changing the original frame ratio or layout role.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library, Playwright MCP, Chrome DevTools MCP

---

## File Map

### Create

- `lisu-official-site/src/content/site-footer.ts`
- `lisu-official-site/src/components/pages/home/home-page.tsx`
- `lisu-official-site/src/components/pages/home/home-page.test.tsx`
- `lisu-official-site/src/components/pages/home/home-visual.tsx`
- `lisu-official-site/src/components/pages/home/home-visual.test.tsx`
- `lisu-official-site/src/components/pages/home/hero-band.test.tsx`
- `lisu-official-site/src/components/pages/home/hero-band.tsx`
- `lisu-official-site/src/components/pages/home/overview-band.tsx`
- `lisu-official-site/src/components/pages/home/feature-band.tsx`
- `lisu-official-site/src/components/pages/home/closing-band.tsx`
- `lisu-official-site/src/components/site/footer.test.tsx`
- `lisu-official-site/src/assets/home/hero-background.jpeg`
- `lisu-official-site/src/assets/home/platform-overview.png`
- `lisu-official-site/src/assets/home/capability-visual.jpeg`
- `lisu-official-site/src/assets/home/scenario-visual.jpeg`
- `lisu-official-site/src/assets/home/proof-case-one.jpeg`
- `lisu-official-site/src/assets/home/proof-case-two.png`
- `lisu-official-site/src/assets/home/proof-team.jpeg`

### Modify

- `lisu-official-site/src/types/site.ts`
- `lisu-official-site/src/assets/home/index.ts`
- `lisu-official-site/src/content/home.ts`
- `lisu-official-site/src/content/home.test.ts`
- `lisu-official-site/src/content/navigation.ts`
- `lisu-official-site/src/components/site/header.tsx`
- `lisu-official-site/src/components/site/header.test.tsx`
- `lisu-official-site/src/components/site/mobile-menu.tsx`
- `lisu-official-site/src/components/site/footer.tsx`
- `lisu-official-site/src/app/page.tsx`
- `lisu-official-site/src/app/globals.css`

### Delete

- `lisu-official-site/src/components/home/architecture-section.tsx`
- `lisu-official-site/src/components/home/capability-section.tsx`
- `lisu-official-site/src/components/home/closing-section.tsx`
- `lisu-official-site/src/components/home/hero-section.tsx`
- `lisu-official-site/src/components/home/home-page.tsx`
- `lisu-official-site/src/components/home/home-page.test.tsx`
- `lisu-official-site/src/components/home/proof-section.tsx`
- `lisu-official-site/src/components/home/proposition-section.tsx`
- `lisu-official-site/src/components/home/scenarios-section.tsx`
- `lisu-official-site/src/components/home/why-now-section.tsx`

### Responsibilities

- `src/types/site.ts` defines the new homepage visual slot, band, proof card, and footer group contracts.
- `src/content/home.ts` becomes the single source of truth for template-shaped homepage copy, source slide traceability, anchor ids, and image slot assignments.
- `src/assets/home/index.ts` exports static runtime assets copied from `archive/ppt-source/images/*`.
- `src/components/pages/home/*` renders the template-shaped homepage bands and image placeholders.
- `src/components/site/*` restyles the shell to match template rhythm without recreating fake menus or fake company info.
- `src/content/site-footer.ts` carries footer columns, summary copy, and non-clickable future page labels.

## Asset Selection

Use these archive files as the first-pass runtime images. If a file renders poorly at the target aspect ratio, keep the semantic filename but switch that slot to a placeholder rather than substituting an unrelated image.

- `archive/ppt-source/images/image1.jpeg` -> `src/assets/home/hero-background.jpeg`
- `archive/ppt-source/images/image17.png` -> `src/assets/home/platform-overview.png`
- `archive/ppt-source/images/image53.jpeg` -> `src/assets/home/capability-visual.jpeg`
- `archive/ppt-source/images/image68.jpeg` -> `src/assets/home/scenario-visual.jpeg`
- `archive/ppt-source/images/image104.jpeg` -> `src/assets/home/proof-case-one.jpeg`
- `archive/ppt-source/images/image109.png` -> `src/assets/home/proof-case-two.png`
- `archive/ppt-source/images/image122.jpeg` -> `src/assets/home/proof-team.jpeg`

## Template Baseline Guard

- Treat `ai-website-cloner-template/src/components/pages/home/home-page.tsx` as the structural baseline for the homepage.
- Treat `ai-website-cloner-template/src/components/site/header.tsx` and `footer.tsx` as the structural baselines for shell spacing, rhythm, and grouping.
- Port existing template wrappers and major class scaffolding first, then replace content, links, and visuals inside those wrappers.
- Do not introduce a new outer homepage topology if a matching template section already exists.
- When a template wrapper must change, keep the change local to content needs and document it in the implementation diff.

## Task 1: Reshape the homepage content contract

**Files:**
- Modify: `lisu-official-site/src/types/site.ts`
- Modify: `lisu-official-site/src/assets/home/index.ts`
- Modify: `lisu-official-site/src/content/home.ts`
- Modify: `lisu-official-site/src/content/home.test.ts`
- Modify: `lisu-official-site/src/content/navigation.ts`

- [ ] **Step 1: Rewrite the failing content test around the template-shaped bands**

Update `lisu-official-site/src/content/home.test.ts` to this:

```ts
import { describe, expect, it } from "vitest";
import {
  homeClosingBand,
  homeFeatureBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
} from "@/content/home";
import { homeNavItems } from "@/content/navigation";

describe("home content contract", () => {
  it("maps the homepage into template-shaped bands", () => {
    expect(homeHero.id).toBe("hero");
    expect(homeOverviewBand.id).toBe("overview");
    expect(homeFeatureBands.map((band) => band.id)).toEqual(["capabilities", "scenarios"]);
    expect(homeClosingBand.id).toBe("closing");
  });

  it("exposes six visible anchor links for the shell", () => {
    expect(homeNavItems.map((item) => item.id)).toEqual([
      "hero",
      "overview",
      "capabilities",
      "scenarios",
      "proof",
      "closing",
    ]);
    expect(homeNavItems.every((item) => item.kind === "anchor")).toBe(true);
  });

  it("keeps every rendered block traceable to source slides", () => {
    expect(homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-05", "slide-07", "slide-10"]);
    expect(homeOverviewBand.cards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeFeatureBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeFeatureBands.flatMap((band) => band.items).every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeClosingBand.points.every((point) => point.sourceSlides.length > 0)).toBe(true);
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
... homeOverviewBand is undefined
```

- [ ] **Step 3: Replace the old section-centric types and content model**

Update `lisu-official-site/src/types/site.ts` to support runtime image slots and template-shaped bands:

```ts
import type { StaticImageData } from "next/image";

export type SlideRef = `slide-${string}`;

export type HomeVisualFrame = "hero" | "overview" | "feature" | "proof-card";

export type HomeVisualSlot =
  | {
      kind: "image";
      frame: HomeVisualFrame;
      alt: string;
      src: StaticImageData;
      mobileSrc?: StaticImageData;
      sourceSlides: SlideRef[];
      sourceArchiveFiles: string[];
    }
  | {
      kind: "placeholder";
      frame: HomeVisualFrame;
      alt: string;
      title: string;
      hint: string;
      sourceSlides: SlideRef[];
      sourceArchiveFiles: string[];
    };

export type NavItem = {
  id: string;
  label: string;
  href: `#${string}` | `/${string}`;
  kind: "anchor" | "route";
};

export type HomeMetric = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeOverviewCard = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeFeatureItem = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeProofCard = {
  id: "case-one" | "case-two" | "team";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};

export type HomeHeroContent = {
  id: "hero";
  title: string;
  description: string;
  eyebrow: string;
  metrics: HomeMetric[];
  desktopVisual: HomeVisualSlot;
  mobileVisual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};

export type HomeOverviewBand = {
  id: "overview";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  cards: HomeOverviewCard[];
  sourceSlides: SlideRef[];
};

export type HomeFeatureBand = {
  id: "capabilities" | "scenarios";
  title: string;
  description: string;
  items: HomeFeatureItem[];
  visual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};

export type HomeClosingBand = {
  id: "closing";
  title: string;
  description: string;
  points: HomeMetric[];
  sourceSlides: SlideRef[];
};

export type FooterGroup = {
  title: string;
  items: Array<{
    label: string;
    href?: `#${string}` | `/${string}`;
    kind: "anchor" | "route" | "text";
  }>;
};
```

Update `lisu-official-site/src/content/home.ts` so it exports the new data model:

```ts
import { homeVisuals } from "@/assets/home";
import type {
  HomeClosingBand,
  HomeFeatureBand,
  HomeHeroContent,
  HomeOverviewBand,
  HomeProofCard,
} from "@/types/site";

export const homeHero: HomeHeroContent = {
  id: "hero",
  eyebrow: "PRIVATE AI KNOWLEDGE PLATFORM",
  title: "企业级私有化 AI 知识智能平台方案",
  description: "从「数据查询」到「知识决策」，构建可解释、可审计的企业智能中枢。",
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

export const homeOverviewBand: HomeOverviewBand = {
  id: "overview",
  title: "为什么现在必须建设企业级 AI 平台",
  description:
    "企业 AI 的竞争已进入下半场，关键不再是“有没有 AI”，而是“能不能让 AI 在核心业务中安全、可信、高效地工作”。",
  visual: homeVisuals.platformOverview,
  sourceSlides: ["slide-04", "slide-05", "slide-07", "slide-10"],
  cards: [
    {
      title: "时代之需",
      description: "AI 从实验走向生产，企业不能再让核心业务停留在“不敢用”的阶段。",
      sourceSlides: ["slide-04"],
    },
    {
      title: "战略判断",
      description: "竞争焦点正在转向业务敢用、会用、可追溯，可解释能力将成为合规入场券。",
      sourceSlides: ["slide-05"],
    },
    {
      title: "方案主张",
      description: "拒绝概率玩具，打造知识大脑，让 AI 从临时工进化为可审计的数字助手。",
      sourceSlides: ["slide-07"],
    },
  ],
};

export const homeFeatureBands: HomeFeatureBand[] = [
  {
    id: "capabilities",
    title: "核心能力入口",
    description: "从算力底座到员工 AI 工作台，以模板式图文区呈现五条核心能力入口。",
    visual: homeVisuals.capabilityVisual,
    sourceSlides: ["slide-11", "slide-13", "slide-14", "slide-17", "slide-28"],
    items: [
      { title: "算力底座", description: "本地部署、云原生编排与生产级推理支撑。", sourceSlides: ["slide-11"] },
      { title: "AI 数据平台", description: "多引擎协同、召回重排与反馈闭环。", sourceSlides: ["slide-13"] },
      { title: "知识语义层", description: "统一业务概念、规则语义和可解释输出。", sourceSlides: ["slide-14"] },
      { title: "安全管控", description: "模型接入、供应链与运行时全链路安全治理。", sourceSlides: ["slide-17"] },
      { title: "员工 AI 工作台", description: "知识中心、智能体中心、工具市场与统一运营管理。", sourceSlides: ["slide-28"] },
    ],
  },
  {
    id: "scenarios",
    title: "业务场景价值",
    description: "让能力真正进入供应链、财务、风控和客服运营等关键业务环节。",
    visual: homeVisuals.scenarioVisual,
    sourceSlides: ["slide-16"],
    items: [
      { title: "供应链", description: "把规则沉淀和跨域因果链转化为数字资产。", sourceSlides: ["slide-16"] },
      { title: "财务", description: "统一口径治理，压缩审计支撑链路。", sourceSlides: ["slide-16"] },
      { title: "风控", description: "让预警附带推理路径，拒绝黑盒警报。", sourceSlides: ["slide-16"] },
      { title: "客服运营", description: "基于业务知识提供精准答复和经验传承。", sourceSlides: ["slide-16"] },
    ],
  },
];

export const homeProofCards: HomeProofCard[] = [
  {
    id: "case-one",
    title: "汽车零部件案例",
    description: "中国汽车零部件制造头部企业的全球 AI 知识中台案例。",
    visual: homeVisuals.proofCaseOne,
    sourceSlides: ["slide-24"],
  },
  {
    id: "case-two",
    title: "叉车制造案例",
    description: "中国叉车制造头部企业的工业产品知识图谱应用案例。",
    visual: homeVisuals.proofCaseTwo,
    sourceSlides: ["slide-27"],
  },
  {
    id: "team",
    title: "核心团队",
    description: "人工智能、数智化与安全工程背景构成的复合型核心团队。",
    visual: homeVisuals.proofTeam,
    sourceSlides: ["slide-30"],
  },
];

export const homeClosingBand: HomeClosingBand = {
  id: "closing",
  title: "价值承诺",
  description: "让 AI 从演示能力变成真正可进入核心业务的生产能力。",
  sourceSlides: ["slide-01", "slide-22"],
  points: [
    { title: "可解释", description: "业务规则与决策路径可追溯。", sourceSlides: ["slide-22"] },
    { title: "可审计", description: "关键链路留痕，满足企业合规要求。", sourceSlides: ["slide-22"] },
    { title: "北京骊甦科技", description: "企业级私有化 AI 知识智能平台方案。", sourceSlides: ["slide-01"] },
  ],
};
```

Update `lisu-official-site/src/assets/home/index.ts` to a placeholder-first registry so the new content contract compiles before real images land:

```ts
import type { HomeVisualSlot } from "@/types/site";

function createPlaceholder(
  frame: HomeVisualSlot["frame"],
  alt: string,
  title: string,
  hint: string,
  sourceSlides: HomeVisualSlot["sourceSlides"],
): HomeVisualSlot {
  return {
    kind: "placeholder",
    frame,
    alt,
    title,
    hint,
    sourceSlides,
    sourceArchiveFiles: [],
  };
}

export const homeVisuals = {
  heroPlaceholder: createPlaceholder("hero", "首页主视觉图占位", "建议放：首页主视觉图", "类型：平台总览 / 架构概览 / 品牌主 KV", ["slide-01"]),
  heroDesktop: createPlaceholder("hero", "首页主视觉图占位", "建议放：首页主视觉图", "类型：平台总览 / 架构概览 / 品牌主 KV", ["slide-01"]),
  heroMobile: createPlaceholder("hero", "首页主视觉图占位", "建议放：首页主视觉图", "类型：平台总览 / 架构概览 / 品牌主 KV", ["slide-01"]),
  platformOverviewPlaceholder: createPlaceholder("overview", "平台总览图占位", "建议放：七层架构总览图", "类型：分层架构 / 平台全景 / 安全纵向切面", ["slide-10"]),
  platformOverview: createPlaceholder("overview", "平台总览图占位", "建议放：七层架构总览图", "类型：分层架构 / 平台全景 / 安全纵向切面", ["slide-10"]),
  capabilityVisual: createPlaceholder("feature", "核心能力入口图占位", "建议放：核心能力入口图", "类型：能力矩阵 / 产品功能总览 / 工作台示意", ["slide-14", "slide-28"]),
  scenarioVisual: createPlaceholder("feature", "业务场景价值图占位", "建议放：业务场景价值图", "类型：供应链 / 财务 / 风控 / 客服运营场景图", ["slide-16"]),
  scenarioPlaceholder: createPlaceholder("feature", "业务场景价值图占位", "建议放：业务场景价值图", "类型：供应链 / 财务 / 风控 / 客服运营场景图", ["slide-16"]),
  proofPlaceholder: createPlaceholder("proof-card", "案例缩略图占位", "建议放：案例缩略图", "类型：制造业案例 / 知识中台 / 架构落地图", ["slide-24"]),
  proofCaseOne: createPlaceholder("proof-card", "汽车零部件案例缩略图占位", "建议放：案例缩略图", "类型：制造业案例 / 知识中台 / 架构落地图", ["slide-24"]),
  proofCaseTwo: createPlaceholder("proof-card", "叉车制造案例缩略图占位", "建议放：案例缩略图", "类型：产品知识图谱 / 工业产品案例图", ["slide-27"]),
  proofTeam: createPlaceholder("proof-card", "核心团队缩略图占位", "建议放：团队背书图", "类型：团队形象 / 专家介绍 / 组织背书图", ["slide-30"]),
} satisfies Record<string, HomeVisualSlot>;
```

Update `lisu-official-site/src/content/navigation.ts` to the 6 visible anchors:

```ts
import type { NavItem } from "@/types/site";

export const homeNavItems: NavItem[] = [
  { id: "hero", label: "首页概览", href: "#hero", kind: "anchor" },
  { id: "overview", label: "平台总览", href: "#overview", kind: "anchor" },
  { id: "capabilities", label: "核心能力", href: "#capabilities", kind: "anchor" },
  { id: "scenarios", label: "场景价值", href: "#scenarios", kind: "anchor" },
  { id: "proof", label: "案例团队", href: "#proof", kind: "anchor" },
  { id: "closing", label: "价值承诺", href: "#closing", kind: "anchor" },
];
```

- [ ] **Step 4: Run the updated content test and verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/content/home.test.ts
```

Expected:

```text
✓ src/content/home.test.ts
```

- [ ] **Step 5: Commit the content-contract rewrite**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/types/site.ts \
        lisu-official-site/src/assets/home/index.ts \
        lisu-official-site/src/content/home.ts \
        lisu-official-site/src/content/home.test.ts \
        lisu-official-site/src/content/navigation.ts
git commit -m "refactor: reshape lisu homepage content contract"
```

## Task 2: Establish runtime assets and placeholder rendering

**Files:**
- Create: `lisu-official-site/src/assets/home/hero-background.jpeg`
- Create: `lisu-official-site/src/assets/home/platform-overview.png`
- Create: `lisu-official-site/src/assets/home/capability-visual.jpeg`
- Create: `lisu-official-site/src/assets/home/scenario-visual.jpeg`
- Create: `lisu-official-site/src/assets/home/proof-case-one.jpeg`
- Create: `lisu-official-site/src/assets/home/proof-case-two.png`
- Create: `lisu-official-site/src/assets/home/proof-team.jpeg`
- Modify: `lisu-official-site/src/assets/home/index.ts`
- Create: `lisu-official-site/src/components/pages/home/home-visual.tsx`
- Create: `lisu-official-site/src/components/pages/home/home-visual.test.tsx`

- [ ] **Step 1: Write the failing visual-slot test**

Create `lisu-official-site/src/components/pages/home/home-visual.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HomeVisual } from "@/components/pages/home/home-visual";

describe("HomeVisual", () => {
  it("renders archive-derived imagery with alt text", () => {
    render(
      <HomeVisual
        slot={homeVisuals.platformOverview}
        className="w-full"
        sizes="100vw"
      />,
    );

    expect(screen.getByRole("img", { name: "平台总览图" })).toBeInTheDocument();
  });

  it("renders a descriptive placeholder when a slot is unresolved", () => {
    render(
      <HomeVisual
        slot={homeVisuals.scenarioPlaceholder}
        className="w-full"
        sizes="100vw"
      />,
    );

    expect(screen.getByText("建议放：业务场景价值图")).toBeInTheDocument();
    expect(screen.getByText("类型：供应链 / 财务 / 风控 / 客服运营场景图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-feature")).toHaveClass("aspect-[1200/928]");
  });

  it("keeps overview placeholders in the overview frame ratio", () => {
    render(
      <HomeVisual
        slot={homeVisuals.platformOverviewPlaceholder}
        className="w-full"
        sizes="100vw"
      />,
    );

    expect(screen.getByTestId("home-visual-overview")).toHaveClass("aspect-[2400/1352]");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-visual.test.tsx
```

Expected:

```text
FAIL  src/components/pages/home/home-visual.test.tsx
... Cannot find module '@/components/pages/home/home-visual'
```

- [ ] **Step 3: Copy the selected archive images into semantic runtime filenames**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
cp archive/ppt-source/images/image1.jpeg lisu-official-site/src/assets/home/hero-background.jpeg
cp archive/ppt-source/images/image17.png lisu-official-site/src/assets/home/platform-overview.png
cp archive/ppt-source/images/image53.jpeg lisu-official-site/src/assets/home/capability-visual.jpeg
cp archive/ppt-source/images/image68.jpeg lisu-official-site/src/assets/home/scenario-visual.jpeg
cp archive/ppt-source/images/image104.jpeg lisu-official-site/src/assets/home/proof-case-one.jpeg
cp archive/ppt-source/images/image109.png lisu-official-site/src/assets/home/proof-case-two.png
cp archive/ppt-source/images/image122.jpeg lisu-official-site/src/assets/home/proof-team.jpeg
```

Expected:

```text
<no output>
```

- [ ] **Step 4: Implement the asset registry and a single placeholder-aware renderer**

Update `lisu-official-site/src/assets/home/index.ts`:

```ts
import heroBackground from "@/assets/home/hero-background.jpeg";
import platformOverview from "@/assets/home/platform-overview.png";
import capabilityVisual from "@/assets/home/capability-visual.jpeg";
import scenarioVisual from "@/assets/home/scenario-visual.jpeg";
import proofCaseOne from "@/assets/home/proof-case-one.jpeg";
import proofCaseTwo from "@/assets/home/proof-case-two.png";
import proofTeam from "@/assets/home/proof-team.jpeg";
import type { HomeVisualSlot } from "@/types/site";

export const homeVisuals: Record<string, HomeVisualSlot> = {
  heroPlaceholder: {
    kind: "placeholder",
    frame: "hero",
    alt: "首页主视觉图占位",
    title: "建议放：首页主视觉图",
    hint: "类型：平台总览 / 架构概览 / 品牌主 KV",
    sourceSlides: ["slide-01"],
    sourceArchiveFiles: [],
  },
  heroDesktop: {
    kind: "image",
    frame: "hero",
    alt: "首页主视觉图",
    src: heroBackground,
    mobileSrc: heroBackground,
    sourceSlides: ["slide-01"],
    sourceArchiveFiles: ["image1.jpeg"],
  },
  heroMobile: {
    kind: "image",
    frame: "hero",
    alt: "首页主视觉图",
    src: heroBackground,
    sourceSlides: ["slide-01"],
    sourceArchiveFiles: ["image1.jpeg"],
  },
  platformOverviewPlaceholder: {
    kind: "placeholder",
    frame: "overview",
    alt: "平台总览图占位",
    title: "建议放：七层架构总览图",
    hint: "类型：分层架构 / 平台全景 / 安全纵向切面",
    sourceSlides: ["slide-10"],
    sourceArchiveFiles: [],
  },
  platformOverview: {
    kind: "image",
    frame: "overview",
    alt: "平台总览图",
    src: platformOverview,
    sourceSlides: ["slide-10"],
    sourceArchiveFiles: ["image17.png"],
  },
  capabilityVisual: {
    kind: "image",
    frame: "feature",
    alt: "核心能力入口图",
    src: capabilityVisual,
    sourceSlides: ["slide-14"],
    sourceArchiveFiles: ["image53.jpeg"],
  },
  scenarioVisual: {
    kind: "image",
    frame: "feature",
    alt: "业务场景价值图",
    src: scenarioVisual,
    sourceSlides: ["slide-16"],
    sourceArchiveFiles: ["image68.jpeg"],
  },
  scenarioPlaceholder: {
    kind: "placeholder",
    frame: "feature",
    alt: "业务场景价值图占位",
    title: "建议放：业务场景价值图",
    hint: "类型：供应链 / 财务 / 风控 / 客服运营场景图",
    sourceSlides: ["slide-16"],
    sourceArchiveFiles: [],
  },
  proofPlaceholder: {
    kind: "placeholder",
    frame: "proof-card",
    alt: "案例缩略图占位",
    title: "建议放：案例缩略图",
    hint: "类型：制造业案例 / 知识中台 / 架构落地图",
    sourceSlides: ["slide-24"],
    sourceArchiveFiles: [],
  },
  proofCaseOne: {
    kind: "image",
    frame: "proof-card",
    alt: "汽车零部件案例缩略图",
    src: proofCaseOne,
    sourceSlides: ["slide-24"],
    sourceArchiveFiles: ["image104.jpeg"],
  },
  proofCaseTwo: {
    kind: "image",
    frame: "proof-card",
    alt: "叉车制造案例缩略图",
    src: proofCaseTwo,
    sourceSlides: ["slide-27"],
    sourceArchiveFiles: ["image109.png"],
  },
  proofTeam: {
    kind: "image",
    frame: "proof-card",
    alt: "核心团队缩略图",
    src: proofTeam,
    sourceSlides: ["slide-30"],
    sourceArchiveFiles: ["image122.jpeg"],
  },
};
```

Create `lisu-official-site/src/components/pages/home/home-visual.tsx`:

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HomeVisualSlot } from "@/types/site";

type HomeVisualProps = {
  slot: HomeVisualSlot;
  className?: string;
  sizes?: string;
};

export function HomeVisual({ slot, className, sizes }: HomeVisualProps) {
  const frameClassName =
    slot.frame === "hero"
      ? "absolute inset-0 h-full w-full"
      : slot.frame === "overview"
        ? "relative aspect-[2400/1352] overflow-hidden rounded-[20px]"
        : slot.frame === "feature"
          ? "relative aspect-[1200/928] overflow-hidden rounded-[20px]"
          : "relative aspect-[772/332] overflow-hidden";

  if (slot.kind === "placeholder") {
    return (
      <div
        data-testid={`home-visual-${slot.frame}`}
        className={cn(
          frameClassName,
          "flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 px-6 text-center",
          className,
        )}
      >
        <div className="flex max-w-[28rem] flex-col items-center">
          <svg
            aria-hidden="true"
            className="size-12 text-slate-400"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="9" width="34" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M13 28L20 21L26 27L31 23L35 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="16" r="2.5" fill="currentColor" />
          </svg>
          <p className="mt-4 text-balance text-base font-semibold text-slate-900">{slot.title}</p>
          <p className="mt-2 text-pretty text-sm leading-7 text-slate-600">{slot.hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid={`home-visual-${slot.frame}`} className={cn(frameClassName, className)}>
      <Image
        alt={slot.alt}
        className="h-full w-full object-cover"
        fill={slot.frame !== "hero"}
        height={slot.frame === "hero" ? 960 : undefined}
        priority={false}
        sizes={sizes}
        src={slot.src}
        width={slot.frame === "hero" ? 5120 : undefined}
      />
    </div>
  );
}
```

- [ ] **Step 5: Run the visual-slot test and verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-visual.test.tsx src/components/pages/home/hero-band.test.tsx
```

Expected:

```text
✓ src/components/pages/home/home-visual.test.tsx
✓ src/components/pages/home/hero-band.test.tsx
```

- [ ] **Step 6: Commit the runtime asset chain**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/assets/home \
        lisu-official-site/src/components/pages/home/home-visual.tsx \
        lisu-official-site/src/components/pages/home/home-visual.test.tsx
git commit -m "feat: add homepage runtime visuals and placeholders"
```

## Task 3: Restyle the template-like shell

**Files:**
- Create: `lisu-official-site/src/content/site-footer.ts`
- Modify: `lisu-official-site/src/components/site/header.tsx`
- Modify: `lisu-official-site/src/components/site/mobile-menu.tsx`
- Modify: `lisu-official-site/src/components/site/footer.tsx`
- Modify: `lisu-official-site/src/components/site/header.test.tsx`
- Create: `lisu-official-site/src/components/site/footer.test.tsx`

- [ ] **Step 1: Update the header test and add a footer test**

Update `lisu-official-site/src/components/site/header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";
import { homeNavItems } from "@/content/navigation";

describe("Header", () => {
  it("renders the six visible homepage anchors in template-like shell order", () => {
    render(<Header items={homeNavItems} activeId="overview" />);

    expect(screen.getByRole("link", { name: "北京骊甦科技" })).toHaveAttribute("href", "#hero");
    expect(screen.getByRole("link", { name: "平台总览" })).toHaveAttribute("data-active", "true");
    expect(screen.getAllByRole("link").filter((node) => node.textContent === "价值承诺")).toHaveLength(1);
  });
});
```

Create `lisu-official-site/src/components/site/footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/site/footer";

describe("Footer", () => {
  it("renders grouped footer content without fake qr or filing entries", () => {
    render(<Footer />);

    expect(screen.getByText("网站导览")).toBeInTheDocument();
    expect(screen.getByText("方案能力")).toBeInTheDocument();
    expect(screen.getByText("页面规划")).toBeInTheDocument();
    expect(screen.getByText("企业级私有化 AI 知识智能平台方案")).toBeInTheDocument();
    expect(screen.queryByText(/ICP备/)).not.toBeInTheDocument();
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

- [ ] **Step 3: Implement footer content and template-like shell styling**

Create `lisu-official-site/src/content/site-footer.ts`:

```ts
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
```

Update `lisu-official-site/src/components/site/header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { MobileMenu } from "@/components/site/mobile-menu";
import { homeNavItems } from "@/content/navigation";
import { cn } from "@/lib/utils";

type HeaderProps = {
  items?: typeof homeNavItems;
  activeId: string;
};

export function Header({ items = homeNavItems, activeId }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-[66px] max-w-[1234px] items-center justify-between px-4">
        <div className="flex h-full items-center gap-7">
          <Link
            href="#hero"
            className="flex h-full w-[182px] items-center text-[18px] font-semibold text-slate-900"
            prefetch={false}
          >
            北京骊甦科技
          </Link>

          <nav aria-label="首页导航" className="hidden h-full md:flex md:items-stretch">
            <ul className="hidden h-full pl-4 text-[16px] md:flex">
              {items.map((item) => (
                <li key={item.id} className="flex h-full items-center px-5">
                  <Link
                    href={item.href}
                    prefetch={false}
                    data-active={String(activeId === item.id)}
                    className={cn(
                      "text-[16px] text-slate-700 transition-colors hover:text-[#1f5fff]",
                      activeId === item.id && "font-semibold text-[#1f5fff]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <MobileMenu items={items} activeId={activeId} />
      </div>
    </header>
  );
}
```

Update `lisu-official-site/src/components/site/mobile-menu.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/site";

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
        aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
        className="inline-flex size-10 items-center justify-center rounded-md border border-slate-200 text-slate-700"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-sm font-medium">
          {open ? "关闭" : "菜单"}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[66px] z-40 border-t border-slate-200 bg-white px-4 py-6 shadow-lg"
        >
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base text-slate-700",
                    activeId === item.id && "bg-sky-50 font-semibold text-[#1f5fff]",
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

Update `lisu-official-site/src/components/site/footer.tsx`:

```tsx
import Link from "next/link";
import { footerGroups, footerSummary } from "@/content/site-footer";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#f7fbff]">
      <div className="mx-auto max-w-[1234px] px-4 pt-10 pb-9 md:pt-12">
        <div className="grid gap-8 border-b border-[#dfe8f3] pb-9 md:grid-cols-[repeat(3,minmax(0,1fr))_280px]">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[15px] font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.kind === "text" ? (
                      <span className="text-[15px] text-slate-600">{item.label}</span>
                    ) : (
                      <Link
                        className="text-[15px] text-slate-600 transition-colors hover:text-[#1f5fff]"
                        href={item.href ?? "#hero"}
                        prefetch={false}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-[12px] bg-white p-5 shadow-sm">
            <p className="text-[15px] font-semibold text-slate-900">{footerSummary.title}</p>
            <p className="mt-4 text-pretty text-[15px] leading-7 text-slate-700">{footerSummary.description}</p>
            <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{footerSummary.detail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">{siteConfig.companyName}</p>
            <p className="text-pretty text-[14px]">{siteConfig.siteDescription}</p>
          </div>
          <p className="text-[14px]">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
```

 - [ ] **Step 4: Run a baseline-ui review on the shell files**

Review these files against the agreed `baseline-ui` constraints and fix violations inline before the shell tests:

- `src/components/site/header.tsx`
- `src/components/site/mobile-menu.tsx`
- `src/components/site/footer.tsx`

Check at minimum:

- icon-only button has `aria-label`
- headings and summary copy use `text-balance` or `text-pretty` where applicable
- no new animations
- no arbitrary `z-*`
- no new gradients beyond those already copied from template wrappers

- [ ] **Step 5: Run the shell tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/site/header.test.tsx src/components/site/footer.test.tsx
```

Expected:

```text
✓ src/components/site/header.test.tsx
✓ src/components/site/footer.test.tsx
```

- [ ] **Step 6: Commit the shell restyle**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/content/site-footer.ts \
        lisu-official-site/src/components/site/header.tsx \
        lisu-official-site/src/components/site/header.test.tsx \
        lisu-official-site/src/components/site/mobile-menu.tsx \
        lisu-official-site/src/components/site/footer.tsx \
        lisu-official-site/src/components/site/footer.test.tsx
git commit -m "feat: restyle lisu homepage shell"
```

## Task 4: Rebuild the homepage in template shape

**Files:**
- Create: `lisu-official-site/src/components/pages/home/hero-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/hero-band.test.tsx`
- Create: `lisu-official-site/src/components/pages/home/overview-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/feature-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/closing-band.tsx`
- Create: `lisu-official-site/src/components/pages/home/home-page.tsx`
- Create: `lisu-official-site/src/components/pages/home/home-page.test.tsx`
- Modify: `lisu-official-site/src/app/page.tsx`

- [ ] **Step 1: Write the failing page tests against the new structure**

Create `lisu-official-site/src/components/pages/home/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";

describe("HomePage", () => {
  it("renders the template-shaped homepage bands", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute("id", "overview");
    expect(screen.getByRole("region", { name: "核心能力入口" })).toHaveAttribute("id", "capabilities");
    expect(screen.getByRole("region", { name: "业务场景价值" })).toHaveAttribute("id", "scenarios");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(screen.getByText("汽车零部件案例")).toBeInTheDocument();
    expect(screen.queryByText("最新动态")).not.toBeInTheDocument();
  });
});

describe("app page", () => {
  it("renders the homepage through the route entry", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
  });
});
```

Create `lisu-official-site/src/components/pages/home/hero-band.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HeroBand } from "@/components/pages/home/hero-band";
import { homeHero } from "@/content/home";

describe("HeroBand", () => {
  it("keeps the template hero frame when a placeholder is injected", () => {
    render(
      <HeroBand
        hero={{
          ...homeHero,
          desktopVisual: homeVisuals.heroPlaceholder,
          mobileVisual: homeVisuals.heroPlaceholder,
        }}
      />,
    );

    expect(screen.getByText("建议放：首页主视觉图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-hero")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the page test and verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-page.test.tsx src/components/pages/home/hero-band.test.tsx
```

Expected:

```text
FAIL  src/components/pages/home/home-page.test.tsx
FAIL  src/components/pages/home/hero-band.test.tsx
... Cannot find module '@/components/pages/home/home-page'
```

- [ ] **Step 3: Port the template wrappers and inject the Lisu homepage content**

Implementation guard for this step:

- Start from `ai-website-cloner-template/src/components/pages/home/home-page.tsx`.
- Preserve the template outer section wrappers, spacing rhythm, and major class scaffolding unless the spec explicitly requires a content change.
- Replace content and visuals inside those wrappers instead of inventing a new page topology.

Build the homepage files as follows:

Create `lisu-official-site/src/components/pages/home/hero-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import { homeHero } from "@/content/home";

type HeroBandProps = {
  hero?: typeof homeHero;
};

export function HeroBand({ hero = homeHero }: HeroBandProps) {
  const desktopVisual = hero.desktopVisual;
  const mobileVisual = hero.mobileVisual;

  if (desktopVisual.kind !== "image" || mobileVisual.kind !== "image") {
    return (
      <section id="hero" className="relative overflow-hidden bg-[#eef4fb]">
        <HomeVisual slot={desktopVisual.kind === "placeholder" ? desktopVisual : hero.desktopVisual} sizes="100vw" />
        <div className="relative mx-auto flex min-h-[388px] max-w-[1200px] items-start justify-center px-4 pt-10 pb-6 text-center md:min-h-[540px] md:pt-12">
          <div className="absolute left-4 top-10 max-w-[420px] rounded-[20px] bg-slate-950/72 p-6 text-left text-white backdrop-blur-sm md:left-8 md:top-14">
            <p className="text-sm font-medium text-sky-200">{hero.eyebrow}</p>
            <h1 id="hero-heading" className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-5xl">{hero.title}</h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-100 md:text-base">{hero.description}</p>
          </div>
          <div className="absolute inset-x-4 bottom-6 grid gap-4 md:inset-x-8 md:grid-cols-3">
            {hero.metrics.map((metric) => (
              <div
                key={metric.title}
                className="rounded-[20px] border border-white/15 bg-slate-950/72 p-4 text-left text-white backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-sky-100">{metric.title}</p>
                <p className="mt-2 text-pretty text-sm leading-7 text-slate-100">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-[#eef4fb]">
      <picture className="absolute inset-0 block h-full w-full">
        <source media="(max-width: 767px)" srcSet={mobileVisual.mobileSrc?.src ?? mobileVisual.src.src} />
        <img
          alt=""
          className="h-full w-full object-cover object-center"
          height="960"
          src={desktopVisual.src.src}
          width="5120"
        />
      </picture>
      <div className="relative mx-auto flex min-h-[388px] max-w-[1200px] items-start justify-center px-4 pt-10 pb-6 text-center md:min-h-[540px] md:pt-12">
        <div className="absolute left-4 top-10 max-w-[420px] rounded-[20px] bg-slate-950/72 p-6 text-left text-white backdrop-blur-sm md:left-8 md:top-14">
          <p className="text-sm font-medium text-sky-200">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-5xl">{hero.title}</h1>
          <p className="mt-4 text-pretty text-sm leading-7 text-slate-100 md:text-base">{hero.description}</p>
        </div>
        <div className="absolute inset-x-4 bottom-6 grid gap-4 md:inset-x-8 md:grid-cols-3">
          {hero.metrics.map((metric) => (
            <div
              key={metric.title}
              className="rounded-[20px] border border-white/15 bg-slate-950/72 p-4 text-left text-white backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-sky-100">{metric.title}</p>
              <p className="mt-2 text-pretty text-sm leading-7 text-slate-100">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/pages/home/overview-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import { homeOverviewBand } from "@/content/home";

export function OverviewBand() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:py-14">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 id="overview-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
            {homeOverviewBand.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[980px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
            {homeOverviewBand.description}
          </p>
        </div>

        <div className="mt-8">
          <HomeVisual slot={homeOverviewBand.visual} className="h-auto w-full rounded-[20px]" sizes="100vw" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {homeOverviewBand.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] bg-white px-7 py-8 shadow-[0_18px_48px_rgba(126,156,213,0.14)]"
            >
              <h3 className="text-[18px] font-semibold text-slate-950">{card.title}</h3>
              <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/pages/home/feature-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeFeatureBand as HomeFeatureBandType } from "@/types/site";

type FeatureBandProps = {
  band: HomeFeatureBandType;
  reverse?: boolean;
};

export function FeatureBand({ band, reverse = false }: FeatureBandProps) {
  const articleClassName = reverse
    ? "grid items-center gap-10 md:grid-cols-[600px_minmax(0,1fr)]"
    : "grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_600px]";

  return (
    <section id={band.id} aria-labelledby={`${band.id}-heading`} className={articleClassName}>
      <div className={reverse ? "order-2 max-w-[520px] justify-self-end" : "max-w-[520px]"}>
        <h2 id={`${band.id}-heading`} className="text-balance text-[22px] font-semibold text-slate-950">
          {band.title}
        </h2>
        <p className="mt-5 text-pretty text-sm leading-8 text-slate-600">{band.description}</p>
        <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
          {band.items.map((item) => (
            <li key={item.title}>
              <span className="font-semibold text-slate-900">{item.title}</span>
              {`：${item.description}`}
            </li>
          ))}
        </ul>
      </div>

      <div className={reverse ? "order-1" : "justify-self-end"}>
        <HomeVisual
          slot={band.visual}
          className="h-auto w-full max-w-[600px] rounded-[20px]"
          sizes="(min-width: 768px) 600px, 100vw"
        />
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/pages/home/closing-band.tsx`:

```tsx
import { HomeVisual } from "@/components/pages/home/home-visual";
import { homeClosingBand, homeProofCards } from "@/content/home";

export function ClosingBand() {
  return (
    <section id="closing" aria-labelledby="closing-heading" className="bg-[#f7fbff]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 id="closing-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
            {homeClosingBand.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-pretty text-sm leading-8 text-slate-600 md:text-base">
            {homeClosingBand.description}
          </p>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
            {homeClosingBand.points.map((point) => (
              <p key={point.title}>
                <span className="font-semibold text-slate-900">{point.title}</span>
                {`：${point.description}`}
              </p>
            ))}
          </div>
        </div>

        <section id="proof" aria-labelledby="proof-heading" className="mt-12">
          <div className="mb-10 text-center">
            <h3 id="proof-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
              案例与团队摘要
            </h3>
          </div>

          <ul className="grid gap-6 lg:grid-cols-3">
            {homeProofCards.map((card) => (
              <li
                key={card.id}
                className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
              >
                <HomeVisual slot={card.visual} className="h-auto w-full" sizes="(min-width: 1024px) 33vw, 100vw" />
                <div className="p-5">
                  <p className="text-base font-medium text-slate-950">{card.title}</p>
                  <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
```

Create `lisu-official-site/src/components/pages/home/home-page.tsx`:

```tsx
"use client";

import { ClosingBand } from "@/components/pages/home/closing-band";
import { FeatureBand } from "@/components/pages/home/feature-band";
import { HeroBand } from "@/components/pages/home/hero-band";
import { OverviewBand } from "@/components/pages/home/overview-band";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { homeFeatureBands } from "@/content/home";
import { homeNavItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = homeNavItems.map((item) => item.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header activeId={activeId} />
      <main id="main-content" className="bg-[#f7fbff]">
        <HeroBand />
        <OverviewBand />
        <section className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="space-y-16 md:space-y-20">
              <FeatureBand band={homeFeatureBands[0]} />
              <FeatureBand band={homeFeatureBands[1]} reverse />
            </div>
          </div>
        </section>
        <ClosingBand />
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
  title: "首页",
  description: "北京骊甦科技企业级私有化 AI 知识智能平台方案首页。",
};

export default function Page() {
  return <HomePage />;
}
```

- [ ] **Step 4: Run a baseline-ui review on the homepage files**

Review these files against the agreed `baseline-ui` constraints and fix violations inline before the final tests:

- `src/components/pages/home/home-page.tsx`
- `src/components/pages/home/home-visual.tsx`
- `src/components/pages/home/hero-band.tsx`
- `src/components/pages/home/overview-band.tsx`
- `src/components/pages/home/feature-band.tsx`
- `src/components/pages/home/closing-band.tsx`
- `src/app/globals.css`

Check at minimum:

- headings use `text-balance`
- body copy uses `text-pretty`
- no new arbitrary `z-*`
- no new animations
- no new gradients beyond the template wrappers already being ported
- no icon-only button without `aria-label`

- [ ] **Step 5: Run the homepage tests and verify they pass**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run test:run -- src/components/pages/home/home-page.test.tsx src/components/pages/home/hero-band.test.tsx
```

Expected:

```text
✓ src/components/pages/home/home-page.test.tsx
✓ src/components/pages/home/hero-band.test.tsx
```

- [ ] **Step 6: Commit the new homepage structure**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/components/pages/home \
        lisu-official-site/src/app/page.tsx
git commit -m "feat: rebuild lisu homepage in template layout"
```

## Task 5: Remove obsolete sections and verify the finished page

**Files:**
- Delete: `lisu-official-site/src/components/home/architecture-section.tsx`
- Delete: `lisu-official-site/src/components/home/capability-section.tsx`
- Delete: `lisu-official-site/src/components/home/closing-section.tsx`
- Delete: `lisu-official-site/src/components/home/hero-section.tsx`
- Delete: `lisu-official-site/src/components/home/home-page.tsx`
- Delete: `lisu-official-site/src/components/home/home-page.test.tsx`
- Delete: `lisu-official-site/src/components/home/proof-section.tsx`
- Delete: `lisu-official-site/src/components/home/proposition-section.tsx`
- Delete: `lisu-official-site/src/components/home/scenarios-section.tsx`
- Delete: `lisu-official-site/src/components/home/why-now-section.tsx`
- Modify: `lisu-official-site/src/app/globals.css`

- [ ] **Step 1: Delete the obsolete section-based homepage files**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
rm lisu-official-site/src/components/home/architecture-section.tsx
rm lisu-official-site/src/components/home/capability-section.tsx
rm lisu-official-site/src/components/home/closing-section.tsx
rm lisu-official-site/src/components/home/hero-section.tsx
rm lisu-official-site/src/components/home/home-page.tsx
rm lisu-official-site/src/components/home/home-page.test.tsx
rm lisu-official-site/src/components/home/proof-section.tsx
rm lisu-official-site/src/components/home/proposition-section.tsx
rm lisu-official-site/src/components/home/scenarios-section.tsx
rm lisu-official-site/src/components/home/why-now-section.tsx
```

Expected:

```text
<no output>
```

- [ ] **Step 2: Align the global styles with the template rhythm**

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
  background: #f7fbff;
  color: var(--foreground);
  font-family: var(--font-body), "PingFang SC", "Microsoft YaHei", sans-serif;
}

section {
  scroll-margin-top: 5.5rem;
}
```

- [ ] **Step 3: Run the full automated verification suite**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run check
```

Expected:

```text
> lint
> typecheck
> test:run
> build
✓ compiled successfully
```

- [ ] **Step 4: Run the MCP validation pass**

Use `Playwright MCP` for the homepage flow:

```text
1. Open `/`
2. Verify Header, Hero, Overview, Capabilities, Scenarios, Proof, Closing all render
3. Click each top-nav anchor and confirm scroll lands on the matching id
4. Resize to a mobile viewport and verify the mobile menu opens, closes, and links still navigate
5. Confirm no “最新动态” block remains
6. If any homepage slot remains unresolved in final content, confirm it shows descriptive placeholder copy instead of a broken image
7. If all final homepage slots resolve to images, record that live fallback was covered by `home-visual.test.tsx` and `hero-band.test.tsx`
```

Use `Chrome DevTools MCP` for runtime checks:

```text
1. Inspect the DOM and confirm the homepage is composed of the 4 template-shaped bands
2. Inspect network requests and confirm the copied asset files load without 404
3. Check console output and confirm no runtime errors
4. Run a Lighthouse snapshot for accessibility and best practices
5. Verify Hero, overview, feature, and proof-card visuals render at expected aspect ratios
```

- [ ] **Step 5: Commit the cleanup and verification**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add -A lisu-official-site/src/components/home \
        lisu-official-site/src/app/globals.css
git commit -m "chore: clean legacy homepage sections and verify replica"
```

## Self-Review

- Spec coverage: this plan covers template-shaped homepage bands, runtime asset slots, placeholder fallback, template-style shell, baseline-ui constraints, and MCP validation.
- Placeholder scan: no `TBD`, `TODO`, or deferred implementation markers remain.
- Type consistency: all tasks use the same `HomeVisualSlot`, `HomeHeroContent`, `HomeOverviewBand`, `HomeFeatureBand`, `HomeProofCard`, and `HomeClosingBand` naming.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-29-lisu-official-site-home-template-replica.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
