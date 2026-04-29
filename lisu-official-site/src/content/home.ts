import { homeAssetMap } from "@/assets/home";
import type { HomeSection, SummaryCard, TraceableGroup, TraceableTextItem } from "@/types/site";

export const homeSections: HomeSection[] = [
  {
    id: "hero",
    title: "企业级私有化 AI 知识智能平台方案",
    description: "从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
    sourceSlides: ["slide-01"],
    visuals: [homeAssetMap.heroPanel],
  },
  {
    id: "why-now",
    title: "为什么现在必须建设企业级 AI 平台",
    description: "把时代之需和战略判断合并为一个复合 section，但继续保留两类来源边界。",
    sourceSlides: ["slide-04", "slide-05"],
    visuals: [homeAssetMap.whyNowGrid],
  },
  {
    id: "proposition",
    title: "拒绝概率玩具，打造知识大脑",
    description: "让业务语言直接驱动决策，从临时工走向数字助手。",
    sourceSlides: ["slide-07"],
    visuals: [homeAssetMap.propositionCards],
  },
  {
    id: "architecture",
    title: "七层贯通、语义驱动的平台总览",
    description: "从算力到底层应用，建立清晰的职责边界和可追溯能力。",
    sourceSlides: ["slide-10"],
    visuals: [homeAssetMap.architectureOverview],
  },
  {
    id: "capabilities",
    title: "核心能力入口",
    description: "保留算力、数据、语义、安全、工作台五条入口，支撑后续真实子页扩展。",
    sourceSlides: ["slide-11", "slide-13", "slide-14", "slide-17", "slide-28"],
    visuals: [homeAssetMap.capabilityGrid],
  },
  {
    id: "scenarios",
    title: "业务场景价值",
    description: "聚焦供应链、财务、风控、客服运营四个场景价值。",
    sourceSlides: ["slide-16"],
    visuals: [homeAssetMap.scenarioGrid],
  },
  {
    id: "proof",
    title: "案例与团队摘要",
    description: "在首页建立最小可信度，而不展开完整案例页。",
    sourceSlides: ["slide-24", "slide-27", "slide-30"],
    visuals: [homeAssetMap.proofGrid],
  },
  {
    id: "closing",
    title: "价值承诺",
    description: "用确定性价值判断与公司署名收束首页。",
    sourceSlides: ["slide-01", "slide-22"],
    visuals: [homeAssetMap.closingPanel],
  },
];

export const homeHeroMetrics: TraceableTextItem[] = [
  {
    title: "澎湃算力底座",
    description: "64 卡 H20 集群 / 9024GB 显存支撑",
    sourceSlides: ["slide-01"],
    visual: homeAssetMap.heroPanel,
  },
  {
    title: "知识驱动决策",
    description: "构建语义层模型 / 业务决策全可溯",
    sourceSlides: ["slide-01"],
    visual: homeAssetMap.heroPanel,
  },
  {
    title: "内生安全体系",
    description: "全链路可审计 / 关键路径上链存证",
    sourceSlides: ["slide-01"],
    visual: homeAssetMap.heroPanel,
  },
];

export const homeWhyNowGroups: TraceableGroup[] = [
  {
    title: "时代之需",
    sourceSlides: ["slide-04"],
    visual: homeAssetMap.whyNowGrid,
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
    visual: homeAssetMap.whyNowGrid,
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
];

export const homePropositionCards: TraceableTextItem[] = [
  {
    title: "拒绝概率玩具",
    description: "缺乏稳固知识语义层支持的 AI，只是基于概率的昂贵玩具。",
    sourceSlides: ["slide-07"],
    visual: homeAssetMap.propositionCards,
  },
  {
    title: "打造知识大脑",
    description: "让业务语言直接驱动决策，实现从随机猜测到确定性决策的跨越。",
    sourceSlides: ["slide-07"],
    visual: homeAssetMap.propositionCards,
  },
  {
    title: "数字助手",
    description: "从聪明的临时工，变成懂业务、有记忆、可审计的数字助手。",
    sourceSlides: ["slide-07"],
    visual: homeAssetMap.propositionCards,
  },
];

export const homeArchitectureLayers: TraceableTextItem[] = [
  { title: "L7 应用层", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L6 能力开放层", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L5 核心语义层", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L4 数据层", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L3.5 运维网关", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L2-L3 引擎层", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
  { title: "L1 超算底座", sourceSlides: ["slide-10"], visual: homeAssetMap.architectureOverview },
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
      visual: homeAssetMap.capabilityGrid,
    },
    {
      title: "AI 数据平台",
      description: "贯通多引擎数据处理、召回、重排和反馈闭环。",
      sourceSlides: ["slide-13"],
      visual: homeAssetMap.capabilityGrid,
    },
    {
      title: "知识语义层",
      description: "统一业务概念、规则语义与可解释输出。",
      sourceSlides: ["slide-14"],
      visual: homeAssetMap.capabilityGrid,
    },
    {
      title: "安全管控",
      description: "从模型接入、供应链到底层审计的全链路安全能力。",
      sourceSlides: ["slide-17"],
      visual: homeAssetMap.capabilityGrid,
    },
    {
      title: "员工 AI 工作台",
      description: "面向业务人员的知识中心、智能体中心和工具市场。",
      sourceSlides: ["slide-28"],
      visual: homeAssetMap.capabilityGrid,
    },
  ],
  scenarios: [
    {
      title: "供应链",
      description: "让规则沉淀和跨域因果链成为数字资产。",
      sourceSlides: ["slide-16"],
      visual: homeAssetMap.scenarioGrid,
    },
    {
      title: "财务",
      description: "统一口径治理，缩短审计支撑链路。",
      sourceSlides: ["slide-16"],
      visual: homeAssetMap.scenarioGrid,
    },
    {
      title: "风控",
      description: "让预警附带推理路径，拒绝黑盒警报。",
      sourceSlides: ["slide-16"],
      visual: homeAssetMap.scenarioGrid,
    },
    {
      title: "客服运营",
      description: "基于业务知识提供精准答复和经验传承。",
      sourceSlides: ["slide-16"],
      visual: homeAssetMap.scenarioGrid,
    },
  ],
  proof: [
    {
      title: "汽车零部件案例",
      description: "全球 AI 知识中台建设案例摘要。",
      sourceSlides: ["slide-24"],
      visual: homeAssetMap.proofGrid,
    },
    {
      title: "叉车制造案例",
      description: "工业产品知识图谱应用案例摘要。",
      sourceSlides: ["slide-27"],
      visual: homeAssetMap.proofGrid,
    },
    {
      title: "核心团队",
      description: "人工智能、数智化、安全与工程背景的团队摘要。",
      sourceSlides: ["slide-30"],
      visual: homeAssetMap.proofGrid,
    },
  ],
};

export const homeClosingPoints: TraceableTextItem[] = [
  {
    title: "方案价值总结",
    description: "把 AI 从演示能力变成真正可进入核心业务的生产能力。",
    sourceSlides: ["slide-22"],
    visual: homeAssetMap.closingPanel,
  },
  {
    title: "三个确定性承诺",
    description: "围绕可解释、可审计和企业可落地三条主线收束首页。",
    sourceSlides: ["slide-22"],
    visual: homeAssetMap.closingPanel,
  },
  {
    title: "公司署名",
    description: "北京骊甦科技",
    sourceSlides: ["slide-01"],
    visual: homeAssetMap.closingPanel,
  },
];
