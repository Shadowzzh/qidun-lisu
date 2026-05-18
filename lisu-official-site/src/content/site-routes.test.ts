import { describe, expect, it } from "vitest";
import { targetSiteRoutes } from "@/content/site-routes";
import { footerRouteGroups, siteNavMenus } from "@/content/site-nav";

const targetRouteSet = new Set<string>(targetSiteRoutes);

function getNavigationHrefs() {
  return [
    ...siteNavMenus.flatMap((menu) => menu.columns.flatMap((column) => column.items.map((item) => item.href))),
    ...footerRouteGroups.flatMap((group) => group.items.map((item) => item.href)),
  ];
}

describe("site route inventory", () => {
  it("defines the complete 18-page target route set", () => {
    expect(targetSiteRoutes).toEqual([
      "/",
      "/solution",
      "/capabilities",
      "/capabilities/semantic-layer",
      "/capabilities/data-platform",
      "/capabilities/security",
      "/capabilities/workspace",
      "/scenarios",
      "/scenarios/supply-chain",
      "/scenarios/finance",
      "/scenarios/risk-control",
      "/scenarios/customer-operations",
      "/cases",
      "/cases/auto-parts",
      "/cases/forklift",
      "/about",
      "/about/team",
      "/about/contact",
    ]);
  });

  it("uses real target routes in header and footer navigation", () => {
    const navigationHrefs = getNavigationHrefs();

    expect(navigationHrefs).toContain("/solution");
    expect(navigationHrefs).toContain("/capabilities");
    expect(navigationHrefs).toContain("/capabilities/semantic-layer");
    expect(navigationHrefs).toContain("/capabilities/data-platform");
    expect(navigationHrefs).toContain("/capabilities/security");
    expect(navigationHrefs).toContain("/capabilities/workspace");
    expect(navigationHrefs).toContain("/scenarios");
    expect(navigationHrefs).toContain("/scenarios/supply-chain");
    expect(navigationHrefs).toContain("/scenarios/finance");
    expect(navigationHrefs).toContain("/scenarios/risk-control");
    expect(navigationHrefs).toContain("/scenarios/customer-operations");
    expect(navigationHrefs).toContain("/cases");
    expect(navigationHrefs).toContain("/cases/auto-parts");
    expect(navigationHrefs).toContain("/cases/forklift");
    expect(navigationHrefs).toContain("/about");
    expect(navigationHrefs).toContain("/about/team");
    expect(navigationHrefs).toContain("/about/contact");
    expect(navigationHrefs.every((href) => targetRouteSet.has(href))).toBe(true);
  });

  it("does not expose old placeholder paths through navigation", () => {
    const navigationHrefs = getNavigationHrefs();

    expect(navigationHrefs).not.toContain("/company");
    expect(navigationHrefs).not.toContain("/semantic-layer");
    expect(navigationHrefs).not.toContain("/data-platform");
    expect(navigationHrefs).not.toContain("/security");
    expect(navigationHrefs).not.toContain("/workspace");
    expect(navigationHrefs).not.toContain("/infrastructure");
    expect(navigationHrefs).not.toContain("/insights");
    expect(navigationHrefs).not.toContain("/value");
  });
});
