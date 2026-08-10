import { describe, expect, it } from "vitest";
import { sitePages } from "@/content/site-pages";
import { targetSiteRoutes } from "@/content/site-routes";

const targetRouteSet = new Set<string>(targetSiteRoutes);

const getImagePath = (image: unknown) => {
  if (typeof image === "string") {
    return image;
  }

  if (image && typeof image === "object" && "src" in image && typeof image.src === "string") {
    return image.src;
  }

  return "";
};

describe("site page content", () => {
  it("provides content for every target route except the homepage", () => {
    expect(sitePages.map((page) => page.href)).toEqual(targetSiteRoutes.filter((route) => route !== "/"));
  });

  it("keeps each page traceable and connected to related pages", () => {
    expect(
      sitePages.every(
        (page) =>
          page.sourceSlides.length > 0 &&
          page.cover.sourceSlides.length > 0 &&
          page.highlights.length >= 3 &&
          page.highlights.every((highlight) => highlight.sourceSlides.length > 0) &&
          page.sections.length > 0 &&
          page.sections.every((section) => section.sourceSlides.length > 0 && section.points.length >= 3) &&
          page.relatedLinks.length > 0 &&
          page.relatedLinks.every((link) => targetRouteSet.has(link.href)),
      ),
    ).toBe(true);
  });

  it("gives the core first-level pages enough body content for standalone reading", () => {
    const coreRoutes = ["/solution", "/capabilities", "/scenarios", "/cases", "/about"] as const;

    for (const route of coreRoutes) {
      const page = sitePages.find((item) => item.href === route);

      expect(page?.sections.length).toBeGreaterThanOrEqual(5);
      expect(page?.summaryPoints.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("uses the expected top-level page titles", () => {
    expect(sitePages.find((page) => page.href === "/solution")?.title).toBe("主方案总览");
    expect(sitePages.find((page) => page.href === "/capabilities")?.title).toBe("能力总览");
    expect(sitePages.find((page) => page.href === "/scenarios")?.title).toBe("应用场景总览");
    expect(sitePages.find((page) => page.href === "/cases")?.title).toBe("案例总览");
    expect(sitePages.find((page) => page.href === "/about")?.title).toBe("公司介绍");
  });

  it("keeps scenario descriptions grounded in slide 16 facts", () => {
    const scenarios = sitePages.find((page) => page.href === "/scenarios");
    const scenarioDetails = [
      sitePages.find((page) => page.href === "/scenarios/supply-chain"),
      sitePages.find((page) => page.href === "/scenarios/finance"),
      sitePages.find((page) => page.href === "/scenarios/risk-control"),
      sitePages.find((page) => page.href === "/scenarios/customer-operations"),
    ];

    expect(scenarios?.sections.slice(0, 4).map((section) => section.description)).toEqual([
      "围绕调货决策，沉淀专家经验与业务规则，自动关联延迟、成本和利润因果链，让供应链判断从天级协同压缩到分钟级问答与复核。",
      "围绕预算编制、核心指标口径和审计材料准备，统一业务定义与依据链，让财务判断从口径对齐走向可追溯的智能分析。",
      "将风险规则、变更审批、预警解释和决策档案纳入同一治理链路，让风控结果能说明触发原因、推理路径和合规依据。",
      "基于业务知识提供精准答复，支持业务语言自助分析，并沉淀服务经验，缩短新人上岗培训周期。",
    ]);
    expect(scenarioDetails.map((page) => page?.description)).toEqual([
      "围绕调货决策，沉淀专家经验与业务规则，自动关联延迟、成本和利润因果链，让供应链判断从天级协同压缩到分钟级问答与复核。",
      "围绕预算编制、核心指标口径和审计材料准备，统一业务定义与依据链，让财务判断从口径对齐走向可追溯的智能分析。",
      "将风险规则、变更审批、预警解释和决策档案纳入同一治理链路，让风控结果能说明触发原因、推理路径和合规依据。",
      "基于业务知识提供精准答复，支持业务语言自助分析，并沉淀服务经验，缩短新人上岗培训周期。",
    ]);
    expect(scenarios?.sections.slice(0, 4).every((section) => section.sourceSlides.includes("slide-16"))).toBe(true);
    expect(scenarioDetails.every((page) => page?.sourceSlides.includes("slide-16"))).toBe(true);
  });

  it("keeps scenario cover and card visuals on purpose-specific assets", () => {
    const scenarios = sitePages.find((page) => page.href === "/scenarios");

    expect(getImagePath(scenarios?.cover.visual)).toContain("industrial-ai-cover");
    expect(scenarios?.sections.slice(0, 4).map((section) => getImagePath(section.visual?.src))).toEqual([
      expect.stringContaining("scenario-supply-chain-card-center"),
      expect.stringContaining("scenario-finance-card-center"),
      expect.stringContaining("scenario-risk-control-card-center"),
      expect.stringContaining("scenario-customer-operations-card-center"),
    ]);
  });

  it("uses dedicated cover visuals for cases and about pages", () => {
    const casesCover = sitePages.find((page) => page.href === "/cases")?.cover.visual;
    const aboutCover = sitePages.find((page) => page.href === "/about")?.cover.visual;

    expect(casesCover).toBeDefined();
    expect(aboutCover).toBeDefined();
    expect(casesCover).not.toBe(aboutCover);
  });

  it("uses generated cover visuals for the available scenario, case, and contact detail pages", () => {
    const routesWithGeneratedCovers = [
      "/scenarios/supply-chain",
      "/scenarios/finance",
      "/scenarios/risk-control",
      "/scenarios/customer-operations",
      "/cases/auto-parts",
      "/cases/forklift",
      "/about/team",
      "/about/contact",
    ] as const;

    for (const route of routesWithGeneratedCovers) {
      expect(sitePages.find((page) => page.href === route)?.cover.visual).toBeDefined();
    }
  });

  it("keeps cover visual metadata free from placeholder copy", () => {
    for (const page of sitePages) {
      expect(page.cover.visual).toBeDefined();
      expect(page.cover.alt).not.toContain("占位图");
      expect(page.cover.title).not.toContain("占位图");
    }
  });

  it("keeps solution focused on scheme rationale instead of capability module indexing", () => {
    const solution = sitePages.find((page) => page.href === "/solution");

    expect(solution?.sections.map((section) => section.title)).toEqual([
      "为什么现在必须建设",
      "核心定位",
      "差异化价值",
      "架构总览",
      "私有化部署价值",
      "落地治理",
      "确定性承诺",
    ]);
    expect(solution?.sections.find((section) => section.title === "架构总览")?.points).toEqual([
      "L5 知识语义层统一业务概念、规则显性化和决策溯源，向上支撑复杂业务应用，向下贯通数据存储与 AI 推理。",
      "L4 数据层组合 Milvus、ES、Neo4j Fabric、PGSQL 和 MinIO，支撑向量、文档、多媒体和图数据库能力。",
      "L6 能力开放层通过 Skill Engine、Context Engine、知识处理引擎、智能编排、记忆组件和工具连接层组合平台能力。",
    ]);
    expect(solution?.sections.find((section) => section.title === "架构总览")?.sourceSlides).toEqual([
      "slide-10",
      "slide-13",
      "slide-15",
    ]);
    expect(solution?.sections.map((section) => section.title)).not.toContain("七层架构");
  });

  it("uses generated visuals for every solution core capability section", () => {
    const solution = sitePages.find((page) => page.href === "/solution");

    expect(solution?.sections.every((section) => section.visual)).toBe(true);
    expect(solution?.sections.map((section) => section.visual?.alt)).toEqual([
      "企业 AI 生产化建设必要性示意图",
      "企业知识智能平台核心定位示意图",
      "语义约束与知识沉淀差异化价值示意图",
      "企业知识智能平台七层架构总览图",
      "私有化部署与数据主权价值示意图",
      "企业知识平台落地治理闭环示意图",
      "决策口径审计确定性承诺示意图",
    ]);
  });

  it("uses webp assets for every site-page visual", () => {
    const visualSources = sitePages.flatMap((page) => [
      page.cover.visual,
      ...page.highlights.map((highlight) => highlight.visual?.src),
      ...page.sections.map((section) => section.visual?.src),
    ]);
    const sitePageVisualSources = visualSources
      .map(getImagePath)
      .filter((source) => source.includes("/assets/site-page/"));

    expect(sitePageVisualSources.length).toBeGreaterThan(0);
    expect(sitePageVisualSources.filter((source) => !source.endsWith(".webp"))).toEqual([]);
  });

  it("keeps capabilities focused on factual capability groups", () => {
    const capabilities = sitePages.find((page) => page.href === "/capabilities");

    expect(capabilities?.showcase?.title).toBe("能力亮点");
    expect(capabilities?.showcase?.description).toBe(
      "从数据承接、语义约束到能力编排，形成可组合、可治理、可落地的平台能力。",
    );
    expect(capabilities?.highlights.map((highlight) => highlight.value)).toEqual([
      "多引擎事实基座",
      "可约束的业务语义",
      "可编排的业务能力",
    ]);
    expect(capabilities?.highlights.every((highlight) => highlight.visual)).toBe(true);
    expect(capabilities?.sections.map((section) => section.title)).toEqual([
      "能力分层",
      "知识语义层",
      "AI 数据平台",
      "安全管控",
      "员工 AI 工作台",
    ]);
    expect(capabilities?.sections.find((section) => section.title === "能力分层")?.points).toEqual([
      "知识语义层统一业务概念、规则显性化和决策溯源，是数据智能走向知识智能的核心。",
      "AI 数据平台通过 Milvus、ES、Neo4j、PGSQL 和 MinIO 协同承接向量、全文、图谱、事实和非结构化对象。",
      "安全管控与员工 AI 工作台贯穿运行治理、知识搜索、知识问答、智能体中心和工具市场。",
    ]);
    expect(capabilities?.sections.find((section) => section.title === "能力分层")?.sourceSlides).toEqual([
      "slide-10",
      "slide-13",
      "slide-17",
      "slide-18",
      "slide-28",
      "slide-29",
    ]);
    expect(capabilities?.relatedLinks.map((link) => link.href)).toEqual([
      "/capabilities/semantic-layer",
      "/capabilities/data-platform",
      "/capabilities/security",
      "/capabilities/workspace",
    ]);
  });

  it("frames semantic layer highlights as factual capability outputs", () => {
    const semanticLayer = sitePages.find((page) => page.href === "/capabilities/semantic-layer");

    expect(semanticLayer?.highlights.map((highlight) => highlight.label)).toEqual(["语义边界", "语义映射", "受控生成"]);
    expect(semanticLayer?.highlights.map((highlight) => highlight.value)).toEqual([
      "统一业务定义",
      "打通概念、规则与数据",
      "可审计的决策链路",
    ]);
    expect(semanticLayer?.highlights.map((highlight) => highlight.description)).toEqual([
      "把业务概念、业务关系和不可违背规则沉淀为企业统一语义边界，让模型输出运行在企业定义的语义边界内。",
      "以领域语义、规则语义和数据语义连接业务概念、业务逻辑、字段与 API，让自然语言问题能落到可计算对象。",
      "通过语义解析、规则执行、结构化决策链和边界内表达输出结果，并附带全路径溯源。",
    ]);
    expect(semanticLayer?.highlights.map((highlight) => highlight.visual?.alt)).toEqual([
      "语义边界统一业务定义示意图",
      "语义映射打通概念规则与数据示意图",
      "受控生成可审计决策链路示意图",
    ]);
    expect(semanticLayer?.highlights.map((highlight) => getImagePath(highlight.visual?.src))).toEqual([
      expect.stringContaining("capabilities-semantic-layer-highlight-boundary"),
      expect.stringContaining("capabilities-semantic-layer-highlight-mapping"),
      expect.stringContaining("capabilities-semantic-layer-highlight-controlled-generation"),
    ]);
    expect(semanticLayer?.highlights.every((highlight) => highlight.sourceSlides.includes("slide-14"))).toBe(true);
  });

  it("frames data platform core capabilities as enterprise data and knowledge operations", () => {
    const dataPlatform = sitePages.find((page) => page.href === "/capabilities/data-platform");

    expect(dataPlatform?.sections.map((section) => section.title)).toEqual(["多引擎协同", "知识增强数据流", "企业知识中台"]);
    expect(dataPlatform?.sections.map((section) => section.description)).toEqual([
      "平台不替换原有 ERP、CRM、BI 等业务系统，而是在其上建立统一的数据与知识承接层，让不同类型数据进入适合的检索、推理和存储引擎。",
      "平台将一次自然语言查询拆解为可治理的数据流，从意图识别、混合召回到重排序、幻觉检测和上下文注入，控制答案生成的依据边界。",
      "平台把企业内部文档、知识库、专业词库、权限流程和运行日志纳入统一管理，让知识不只可检索，也能被运营、治理和复用。",
    ]);
    expect(dataPlatform?.sections.map((section) => section.points)).toEqual([
      [
        "Milvus 承接向量检索，支撑语义相似度召回。",
        "ES 承接全文与日志索引，提升关键词和过程记录检索效率。",
        "Neo4j、PGSQL 和 MinIO 分别承接图谱关系、结构化事实和非结构化对象。",
      ],
      [
        "先识别 Query 意图，再进行多路并行混合召回。",
        "通过知识处理引擎融合、重排序和幻觉检测提升答案可信度。",
        "将精准上下文注入 LLM，并通过用户反馈持续更新知识链路。",
      ],
      [
        "支持文档同步、文件上传和内网文档处理，沉淀企业知识资产。",
        "通过知识空间、知识库和专业词库管理不同业务域的知识口径。",
        "结合权限、日志和运营管理，为问答、检索和智能体应用持续供给知识。",
      ],
    ]);
    expect(dataPlatform?.sections.map((section) => section.visual?.alt)).toEqual([
      "AI 数据平台多引擎协同示意图",
      "AI 数据平台知识增强数据流示意图",
      "AI 数据平台企业知识中台示意图",
    ]);
    expect(dataPlatform?.sections.map((section) => getImagePath(section.visual?.src))).toEqual([
      expect.stringContaining("capabilities-data-platform-multi-engine"),
      expect.stringContaining("capabilities-data-platform-rag-flow"),
      expect.stringContaining("capabilities-data-platform-knowledge-hub"),
    ]);
  });

  it("keeps customer-facing copy free from internal planning language", () => {
    const internalCopyPatterns = [
      /首页/,
      /详情页/,
      /页面/,
      /方案页/,
      /能力页/,
      /团队页/,
      /页面策略/,
      /模块地图/,
      /能力说明/,
      /独立详情/,
      /方案判断/,
      /承接更深入/,
      /案例中心/,
      /关于我们/,
      /摘要/,
      /叙述/,
      /官网表达/,
      /官网主线/,
      /不编造/,
      /未确认/,
      /素材/,
      /后续可替换/,
      /可替换/,
      /转化闭环/,
      /落地表达/,
    ];
    const customerCopy = sitePages.flatMap((page) => [
      page.eyebrow,
      page.description,
      page.cover.title,
      page.cover.hint,
      ...page.highlights.map((highlight) => highlight.description),
      ...page.summaryPoints,
      ...page.sections.flatMap((section) => [section.title, section.description, ...section.points]),
    ]);

    expect(
      customerCopy.filter((copy) => internalCopyPatterns.some((pattern) => pattern.test(copy))),
    ).toEqual([]);
  });
});
