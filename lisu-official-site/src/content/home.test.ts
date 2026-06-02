import { describe, expect, it } from "vitest";
import {
  homeEntryBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
  homeScenarioCards,
} from "@/content/home";
import { siteNavMenus } from "@/content/site-nav";

const getImageSource = (source: unknown) => {
  if (typeof source === "string") {
    return source;
  }

  if (source && typeof source === "object" && "src" in source && typeof source.src === "string") {
    return source.src;
  }

  return "";
};

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
    expect(homeScenarioCards.map((card) => card.action.href)).toEqual([
      "/scenarios/supply-chain",
      "/scenarios/finance",
      "/scenarios/risk-control",
      "/scenarios/customer-operations",
    ]);
    expect(homeProofSection.id).toBe("proof");
  });

  it("uses the platform overview section as a solution summary with architecture imagery", () => {
    expect(homeOverviewBand.title).toBe("企业级私有化 AI 知识智能平台方案");
    expect(homeOverviewBand.description).toBe(
      "我们希望提供的不是一套 AI 工具，而是帮助企业建设“数字决策中枢”。通过统一企业知识语义层，让业务语言直接驱动决策，推动企业从“数据查询”走向“知识决策”，在核心业务中实现可解释、可审计、可追溯的智能应用。",
    );
    expect(homeOverviewBand.visual.kind).toBe("image");
    expect(homeOverviewBand.visual.frame).toBe("overview");
  });

  it("uses overview cards that explain knowledge-base value in homepage language", () => {
    expect(homeOverviewBand.cards).toEqual([
      {
        title: "生产可用",
        description: "让 AI 从演示能力走进核心业务，而不是停留在试点和问答实验。",
        sourceSlides: ["slide-04"],
      },
      {
        title: "知识资产",
        description: "把手册、参数、故障代码和专家经验沉淀为统一的企业知识资产，减少跨部门“各说各话”。",
        sourceSlides: ["slide-04", "slide-26", "slide-29"],
      },
      {
        title: "知识大脑",
        description: "通过企业知识中心、知识图谱和语义约束，让搜索、问答和决策都建立在企业知识之上。",
        sourceSlides: ["slide-07", "slide-28", "slide-29"],
      },
    ]);
  });

  it("uses solution entry copy that explains knowledge assets before deeper pages exist", () => {
    expect(homeEntryBands[0]?.description).toBe(
      "展示业务人员自然语言提问，平台通过企业知识语义层和业务规则组织依据，形成“提问-回答-带依据”的可解释决策链路。",
    );
    expect(homeEntryBands[1]?.description).toBe(
      "展示领域语义、规则语义、数据语义汇聚到 L5 核心语义层，通过受控生成约束回答和决策输出。",
    );
    expect(homeEntryBands[2]?.description).toBe(
      "展示 ERP / CRM / BI 与文档对象进入 Milvus、ES、Neo4j、PGSQL、MinIO 多引擎底座，经混合召回、重排和上下文注入支撑上层应用。",
    );
    expect(homeEntryBands[3]?.description).toBe(
      "展示 OVTP 的身份确认、操作审批、全程追溯贯穿 L2-L7，并以镜像签名、模型哈希、SBOM 留存守住生产准入底线。",
    );
    expect(homeEntryBands[4]?.description).toBe(
      "说明员工如何通过企业知识中心使用多模态知识库、知识搜索与智能体应用，让知识真正进入日常工作界面。",
    );
  });

  it("defines four desktop navigation menus for the site shell", () => {
    expect(siteNavMenus.map((menu) => menu.id)).toEqual(["solution", "capabilities", "scenarios", "cases", "about"]);
    expect(siteNavMenus.map((menu) => menu.label)).toEqual(["解决方案", "能力页", "应用场景", "案例中心", "关于我们"]);
  });

  it("keeps every homepage section traceable to source slides", () => {
    expect(homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-07", "slide-10", "slide-26", "slide-28", "slide-29"]);
    expect(homeEntryBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeScenarioCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeProofSection.sourceSlides).toEqual(["slide-24", "slide-27", "slide-30"]);
  });

  it("uses generated WebP imagery for the first four solution entry modules", () => {
    const entryVisuals = homeEntryBands.slice(0, 4).map((band) => band.visual);

    expect(entryVisuals.every((visual) => visual.kind === "image")).toBe(true);
    expect(entryVisuals.map((visual) => visual.alt)).toEqual([
      "主方案总览入口示意图",
      "知识语义层入口示意图",
      "AI 数据平台入口示意图",
      "安全管控入口示意图",
    ]);
    expect(
      entryVisuals.every(
        (visual) => visual.kind === "image" && getImageSource(visual.src).includes("/assets/home/") && getImageSource(visual.src).endsWith(".webp"),
      ),
    ).toBe(true);
  });
});
