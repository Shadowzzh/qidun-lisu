import { homeVisuals } from "@/assets/home";
import { footerRouteGroups } from "@/content/site-nav";
import type {
  HomeClosingStatement,
  HomeClosingBand,
  HomeEntryBand,
  HomeFeatureBand,
  HomeHeroContent,
  HomeOverviewBand,
  HomeProofCard,
  HomeProofSection,
  HomeScenarioCard,
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

export const homeProofSection: HomeProofSection = {
  id: "proof",
  title: "案例与团队摘要",
  description: "在首页建立最小可信度，而不展开完整案例页。",
  sourceSlides: homeProofCards.flatMap((card) => card.sourceSlides),
};

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

export const homeClosingStatement: HomeClosingStatement = {
  id: "route-closing",
  title: "继续浏览官网结构",
  description: "首页只建立品牌与方案总览，后续内容将围绕解决方案、应用场景、案例中心与关于我们持续展开。",
  routeGroups: footerRouteGroups,
  sourceSlides: ["slide-22"],
};
