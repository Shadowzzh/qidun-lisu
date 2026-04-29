import { describe, expect, it } from "vitest";
import {
  homeArchitectureLayers,
  homeClosingPoints,
  homeHeroMetrics,
  homePropositionCards,
  homeSections,
  homeSummaryCards,
  homeWhyNowGroups,
} from "@/content/home";

describe("home content contract", () => {
  it("defines eight rendered sections with source slides", () => {
    expect(homeSections).toHaveLength(8);
    expect(homeSections.map((section) => section.id)).toEqual([
      "hero",
      "why-now",
      "proposition",
      "architecture",
      "capabilities",
      "scenarios",
      "proof",
      "closing",
    ]);
    expect(homeSections.every((section) => section.sourceSlides.length > 0)).toBe(true);
  });

  it("keeps summary cards traceable", () => {
    expect(homeSummaryCards.capabilities).toHaveLength(5);
    expect(homeSummaryCards.proof).toHaveLength(3);
    expect(homeSummaryCards.capabilities.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeSummaryCards.proof.every((item) => item.sourceSlides.length > 0)).toBe(true);
  });

  it("keeps upper-section content traceable", () => {
    expect(homeHeroMetrics.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homePropositionCards.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeArchitectureLayers.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeClosingPoints.every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeWhyNowGroups.every((group) => group.sourceSlides.length > 0)).toBe(true);
    expect(homeWhyNowGroups.flatMap((group) => group.items).every((item) => item.sourceSlides.length > 0)).toBe(true);
  });
});
