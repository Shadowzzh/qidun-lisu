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
  heroPlaceholder: createPlaceholder(
    "hero",
    "首页主视觉图占位",
    "建议放：首页主视觉图",
    "类型：平台总览 / 架构概览 / 品牌主 KV",
    ["slide-01"],
  ),
  heroDesktop: createPlaceholder(
    "hero",
    "首页主视觉图占位",
    "建议放：首页主视觉图",
    "类型：平台总览 / 架构概览 / 品牌主 KV",
    ["slide-01"],
  ),
  heroMobile: createPlaceholder(
    "hero",
    "首页主视觉图占位",
    "建议放：首页主视觉图",
    "类型：平台总览 / 架构概览 / 品牌主 KV",
    ["slide-01"],
  ),
  platformOverviewPlaceholder: createPlaceholder(
    "overview",
    "平台总览图占位",
    "建议放：七层架构总览图",
    "类型：分层架构 / 平台全景 / 安全纵向切面",
    ["slide-10"],
  ),
  platformOverview: createPlaceholder(
    "overview",
    "平台总览图占位",
    "建议放：七层架构总览图",
    "类型：分层架构 / 平台全景 / 安全纵向切面",
    ["slide-10"],
  ),
  capabilityVisual: createPlaceholder(
    "feature",
    "核心能力入口图占位",
    "建议放：核心能力入口图",
    "类型：能力矩阵 / 产品功能总览 / 工作台示意",
    ["slide-14", "slide-28"],
  ),
  scenarioVisual: createPlaceholder(
    "feature",
    "业务场景价值图占位",
    "建议放：业务场景价值图",
    "类型：供应链 / 财务 / 风控 / 客服运营场景图",
    ["slide-16"],
  ),
  scenarioPlaceholder: createPlaceholder(
    "feature",
    "业务场景价值图占位",
    "建议放：业务场景价值图",
    "类型：供应链 / 财务 / 风控 / 客服运营场景图",
    ["slide-16"],
  ),
  proofPlaceholder: createPlaceholder(
    "proof-card",
    "案例缩略图占位",
    "建议放：案例缩略图",
    "类型：制造业案例 / 知识中台 / 架构落地图",
    ["slide-24"],
  ),
  proofCaseOne: createPlaceholder(
    "proof-card",
    "汽车零部件案例缩略图占位",
    "建议放：案例缩略图",
    "类型：制造业案例 / 知识中台 / 架构落地图",
    ["slide-24"],
  ),
  proofCaseTwo: createPlaceholder(
    "proof-card",
    "叉车制造案例缩略图占位",
    "建议放：案例缩略图",
    "类型：产品知识图谱 / 工业产品案例图",
    ["slide-27"],
  ),
  proofTeam: createPlaceholder(
    "proof-card",
    "核心团队缩略图占位",
    "建议放：团队背书图",
    "类型：团队形象 / 专家介绍 / 组织背书图",
    ["slide-30"],
  ),
} satisfies Record<string, HomeVisualSlot>;
