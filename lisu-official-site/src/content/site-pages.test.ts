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

  it("keeps customer-facing copy free from internal planning language", () => {
    const internalCopyPatterns = [
      /首页/,
      /详情页/,
      /页面/,
      /摘要/,
      /叙述/,
      /官网表达/,
      /官网主线/,
      /不编造/,
      /未确认/,
      /素材/,
      /转化闭环/,
      /落地表达/,
    ];
    const customerCopy = sitePages.flatMap((page) => [
      page.description,
      ...page.highlights.map((highlight) => highlight.description),
      ...page.summaryPoints,
      ...page.sections.flatMap((section) => [section.title, section.description, ...section.points]),
    ]);

    expect(
      customerCopy.filter((copy) => internalCopyPatterns.some((pattern) => pattern.test(copy))),
    ).toEqual([]);
  });
});
