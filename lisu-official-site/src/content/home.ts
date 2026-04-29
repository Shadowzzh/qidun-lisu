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

const propositionOverviewCard = homeOverviewBand.cards.find((card) => card.title === "方案主张");

export const homeSections = [
  {
    id: "hero",
    title: homeHero.title,
    description: homeHero.description,
    sourceSlides: homeHero.sourceSlides,
  },
  {
    id: "why-now",
    title: homeOverviewBand.title,
    description: homeOverviewBand.description,
    sourceSlides: ["slide-04", "slide-05"],
  },
  {
    id: "proposition",
    title: "拒绝概率玩具，打造知识大脑",
    description: propositionOverviewCard?.description,
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
    title: homeFeatureBands[0].title,
    description: homeFeatureBands[0].description,
    sourceSlides: homeFeatureBands[0].sourceSlides,
  },
  {
    id: "scenarios",
    title: homeFeatureBands[1].title,
    description: homeFeatureBands[1].description,
    sourceSlides: homeFeatureBands[1].sourceSlides,
  },
  {
    id: "proof",
    title: "案例与团队摘要",
    description: "在首页建立最小可信度，而不展开完整案例页。",
    sourceSlides: homeProofCards.flatMap((card) => card.sourceSlides),
  },
  {
    id: "closing",
    title: homeClosingBand.title,
    description: homeClosingBand.description,
    sourceSlides: homeClosingBand.sourceSlides,
  },
] as const;

export const homeHeroMetrics = homeHero.metrics;

export const homeWhyNowGroups = [
  {
    title: "时代之需",
    sourceSlides: ["slide-04"],
    items: [
      {
        title: "AI 从实验到生产",
        description: "核心业务不敢用黑盒答案。",
        sourceSlides: ["slide-04"],
      },
      {
        title: "从数据到知识孤岛",
        description: "跨部门定义不一致，决策彼此质疑。",
        sourceSlides: ["slide-04"],
      },
      {
        title: "算力需求跨越式升级",
        description: "实验级部署难以支撑生产推理。",
        sourceSlides: ["slide-04"],
      },
    ],
  },
  {
    title: "战略判断",
    sourceSlides: ["slide-05"],
    items: [
      {
        title: "竞争焦点变化",
        description: "焦点从算力比拼转向业务敢用、会用、可追溯。",
        sourceSlides: ["slide-05"],
      },
      {
        title: "合规要求迫近",
        description: "可解释能力将成为未来准入门槛。",
        sourceSlides: ["slide-05"],
      },
      {
        title: "布局窗口期",
        description: "提前布局意味着更早获得竞争资格。",
        sourceSlides: ["slide-05"],
      },
    ],
  },
] as const;

export const homePropositionCards = [
  {
    title: "拒绝概率玩具",
    description: "缺乏稳固知识语义层支持的 AI，只是基于概率的昂贵玩具。",
    sourceSlides: ["slide-07"],
  },
  {
    title: "打造知识大脑",
    description: "让业务语言直接驱动决策，实现从随机猜测到确定性决策的跨越。",
    sourceSlides: ["slide-07"],
  },
  {
    title: "数字助手",
    description: "从聪明的临时工，变成懂业务、有记忆、可审计的数字助手。",
    sourceSlides: ["slide-07"],
  },
] as const;

export const homeArchitectureLayers = [
  { title: "L7 应用层", sourceSlides: ["slide-10"] },
  { title: "L6 能力开放层", sourceSlides: ["slide-10"] },
  { title: "L5 核心语义层", sourceSlides: ["slide-10"] },
  { title: "L4 数据层", sourceSlides: ["slide-10"] },
  { title: "L3.5 运维网关", sourceSlides: ["slide-10"] },
  { title: "L2-L3 引擎层", sourceSlides: ["slide-10"] },
  { title: "L1 超算底座", sourceSlides: ["slide-10"] },
] as const;

export const homeSummaryCards = {
  capabilities: homeFeatureBands[0].items,
  scenarios: homeFeatureBands[1].items,
  proof: homeProofCards.map((card) => ({
    title: card.title,
    description: card.description,
    sourceSlides: card.sourceSlides,
  })),
};

export const homeClosingPoints = homeClosingBand.points;
