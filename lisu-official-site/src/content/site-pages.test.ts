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
});
