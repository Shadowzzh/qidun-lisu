import { describe, expect, it } from "vitest";
import { sitePages } from "@/content/site-pages";
import { targetSiteRoutes } from "@/content/site-routes";

const targetRouteSet = new Set<string>(targetSiteRoutes);

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

  it("keeps capabilities focused on factual capability groups", () => {
    const capabilities = sitePages.find((page) => page.href === "/capabilities");

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
