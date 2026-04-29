import { describe, expect, it } from "vitest";
import {
  homeClosingBand,
  homeFeatureBands,
  homeHero,
  homeOverviewBand,
  homeSections,
  homeProofCards,
} from "@/content/home";
import { homeNavItems } from "@/content/navigation";

describe("home content contract", () => {
  it("maps the homepage into template-shaped bands", () => {
    expect(homeHero.id).toBe("hero");
    expect(homeOverviewBand.id).toBe("overview");
    expect(homeFeatureBands.map((band) => band.id)).toEqual(["capabilities", "scenarios"]);
    expect(homeClosingBand.id).toBe("closing");
  });

  it("exposes six visible anchor links for the shell", () => {
    expect(homeNavItems.map((item) => item.id)).toEqual([
      "hero",
      "architecture",
      "capabilities",
      "scenarios",
      "proof",
      "closing",
    ]);
    expect(homeNavItems.map((item) => item.label)).toEqual([
      "首页概览",
      "平台总览",
      "核心能力",
      "场景价值",
      "案例团队",
      "价值承诺",
    ]);
    expect(homeNavItems.map((item) => item.href)).toEqual([
      "#hero",
      "#architecture",
      "#capabilities",
      "#scenarios",
      "#proof",
      "#closing",
    ]);
    expect(homeNavItems.every((item) => item.kind === "anchor")).toBe(true);
  });

  it("keeps compatibility proposition content on an explicit mapping", () => {
    const propositionSection = homeSections.find((section) => section.id === "proposition");
    const propositionCard = homeOverviewBand.cards.find((card) => card.title === "方案主张");

    expect(propositionSection?.description).toBe(propositionCard?.description);
  });

  it("keeps every rendered block traceable to source slides", () => {
    expect(homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-05", "slide-07", "slide-10"]);
    expect(homeOverviewBand.cards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeFeatureBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeFeatureBands.flatMap((band) => band.items).every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeClosingBand.points.every((point) => point.sourceSlides.length > 0)).toBe(true);
  });
});
