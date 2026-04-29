import type { AssetRef } from "@/types/site";

export const homeAssetMap: Record<string, AssetRef> = {
  heroPanel: {
    key: "heroPanel",
    assetPath: "src/assets/home/hero-panel.svg",
    alt: "首页首屏信号图",
    sourceSlides: ["slide-01"],
  },
  whyNowGrid: {
    key: "whyNowGrid",
    assetPath: "src/assets/home/why-now-grid.svg",
    alt: "时代之需与战略判断摘要图",
    sourceSlides: ["slide-04", "slide-05"],
  },
  propositionCards: {
    key: "propositionCards",
    assetPath: "src/assets/home/proposition-cards.svg",
    alt: "方案主张摘要图",
    sourceSlides: ["slide-07"],
  },
  architectureOverview: {
    key: "architectureOverview",
    assetPath: "src/assets/home/architecture-overview.svg",
    alt: "七层架构总览图",
    sourceSlides: ["slide-10"],
  },
  capabilityGrid: {
    key: "capabilityGrid",
    assetPath: "src/assets/home/capability-grid.svg",
    alt: "核心能力入口图",
    sourceSlides: ["slide-11", "slide-13", "slide-14", "slide-17", "slide-28"],
  },
  scenarioGrid: {
    key: "scenarioGrid",
    assetPath: "src/assets/home/scenario-grid.svg",
    alt: "场景价值摘要图",
    sourceSlides: ["slide-16"],
  },
  proofGrid: {
    key: "proofGrid",
    assetPath: "src/assets/home/proof-grid.svg",
    alt: "案例与团队摘要图",
    sourceSlides: ["slide-24", "slide-27", "slide-30"],
  },
  closingPanel: {
    key: "closingPanel",
    assetPath: "src/assets/home/closing-panel.svg",
    alt: "价值承诺收束图",
    sourceSlides: ["slide-01", "slide-22"],
  },
};
