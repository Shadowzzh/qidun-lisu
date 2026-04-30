import capabilityVisualImage from "@/assets/home/capability-visual.jpeg";
import heroBackground from "@/assets/home/hero-background.jpeg";
import platformOverviewImage from "@/assets/home/platform-overview.png";
import proofCaseOneImage from "@/assets/home/proof-case-one.jpeg";
import proofCaseTwoImage from "@/assets/home/proof-case-two.png";
import proofTeamImage from "@/assets/home/proof-team.jpeg";
import scenarioVisualImage from "@/assets/home/scenario-visual.jpeg";
import type { HomeVisualSlot } from "@/types/site";

const image1Path = "archive/ppt-source/images/image1.jpeg";
const image17Path = "archive/ppt-source/images/image17.png";
const image53Path = "archive/ppt-source/images/image53.jpeg";
const image68Path = "archive/ppt-source/images/image68.jpeg";
const image104Path = "archive/ppt-source/images/image104.jpeg";
const image109Path = "archive/ppt-source/images/image109.png";
const image122Path = "archive/ppt-source/images/image122.jpeg";

export const homeVisuals = {
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
    sourceArchiveFiles: [image1Path],
  },
  heroMobile: {
    kind: "image",
    frame: "hero",
    alt: "首页主视觉图",
    src: heroBackground,
    sourceSlides: ["slide-01"],
    sourceArchiveFiles: [image1Path],
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
    src: platformOverviewImage,
    sourceSlides: ["slide-10"],
    sourceArchiveFiles: [image17Path],
  },
  capabilityVisual: {
    kind: "image",
    frame: "feature",
    alt: "核心能力入口图",
    src: capabilityVisualImage,
    sourceSlides: ["slide-14"],
    sourceArchiveFiles: [image53Path],
  },
  solutionOverviewEntry: {
    kind: "placeholder",
    frame: "feature",
    alt: "主方案总览占位图",
    title: "占位图",
    hint: "",
    sourceSlides: ["slide-01", "slide-07", "slide-10"],
    sourceArchiveFiles: [],
  },
  semanticLayerEntry: {
    kind: "placeholder",
    frame: "feature",
    alt: "知识语义层占位图",
    title: "占位图",
    hint: "",
    sourceSlides: ["slide-07", "slide-14"],
    sourceArchiveFiles: [],
  },
  dataPlatformEntry: {
    kind: "placeholder",
    frame: "feature",
    alt: "AI 数据平台占位图",
    title: "占位图",
    hint: "",
    sourceSlides: ["slide-13", "slide-15"],
    sourceArchiveFiles: [],
  },
  securityEntry: {
    kind: "placeholder",
    frame: "feature",
    alt: "安全管控占位图",
    title: "占位图",
    hint: "",
    sourceSlides: ["slide-17", "slide-18"],
    sourceArchiveFiles: [],
  },
  scenarioVisual: {
    kind: "image",
    frame: "feature",
    alt: "业务场景价值图",
    src: scenarioVisualImage,
    sourceSlides: ["slide-16"],
    sourceArchiveFiles: [image68Path],
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
    src: proofCaseOneImage,
    sourceSlides: ["slide-24"],
    sourceArchiveFiles: [image104Path],
  },
  proofCaseTwo: {
    kind: "image",
    frame: "proof-card",
    alt: "叉车制造案例缩略图",
    src: proofCaseTwoImage,
    sourceSlides: ["slide-27"],
    sourceArchiveFiles: [image109Path],
  },
  proofTeam: {
    kind: "image",
    frame: "proof-card",
    alt: "核心团队缩略图",
    src: proofTeamImage,
    sourceSlides: ["slide-30"],
    sourceArchiveFiles: [image122Path],
  },
} satisfies Record<
  | "heroPlaceholder"
  | "heroDesktop"
  | "heroMobile"
  | "platformOverviewPlaceholder"
  | "platformOverview"
  | "capabilityVisual"
  | "solutionOverviewEntry"
  | "semanticLayerEntry"
  | "dataPlatformEntry"
  | "securityEntry"
  | "scenarioVisual"
  | "scenarioPlaceholder"
  | "proofPlaceholder"
  | "proofCaseOne"
  | "proofCaseTwo"
  | "proofTeam",
  HomeVisualSlot
>;
