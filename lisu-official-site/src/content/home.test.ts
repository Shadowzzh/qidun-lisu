import { describe, expect, it } from "vitest";
import {
  homeClosingStatement,
  homeEntryBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
  homeScenarioCards,
} from "@/content/home";
import { siteNavMenus } from "@/content/site-nav";

describe("home content contract", () => {
  it("maps the homepage into a multipage-entry structure", () => {
    expect(homeHero.id).toBe("hero");
    expect(homeOverviewBand.id).toBe("overview");
    expect(homeEntryBands.map((band) => band.id)).toEqual([
      "solution-overview",
      "semantic-layer",
      "data-platform",
      "security",
      "workspace",
    ]);
    expect(homeScenarioCards.map((card) => card.title)).toEqual(["供应链", "财务", "风控", "客服运营"]);
    expect(homeProofSection.id).toBe("proof");
    expect(homeClosingStatement.id).toBe("route-closing");
  });

  it("defines four desktop navigation menus for the site shell", () => {
    expect(siteNavMenus.map((menu) => menu.id)).toEqual(["solution", "scenarios", "cases", "company"]);
    expect(siteNavMenus.map((menu) => menu.label)).toEqual(["解决方案", "应用场景", "案例中心", "关于我们"]);
  });

  it("keeps every homepage section traceable to source slides", () => {
    expect(homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-05", "slide-07", "slide-10"]);
    expect(homeEntryBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeScenarioCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeClosingStatement.sourceSlides).toEqual(["slide-22"]);
  });
});
