import { describe, expect, it } from "vitest";
import * as homeContent from "@/content/home";
import { homeNavItems } from "@/content/navigation";

describe("home content contract", () => {
  const homeProofSection = Reflect.get(homeContent, "homeProofSection") as
    | {
        id: string;
        title: string;
        description: string;
        sourceSlides: string[];
      }
    | undefined;

  it("maps the homepage into template-shaped bands", () => {
    expect(homeContent.homeHero.id).toBe("hero");
    expect(homeContent.homeOverviewBand.id).toBe("overview");
    expect(homeContent.homeFeatureBands.map((band) => band.id)).toEqual(["capabilities", "scenarios"]);
    expect(homeProofSection?.id).toBe("proof");
    expect(homeContent.homeClosingBand.id).toBe("closing");
  });

  it("exposes six visible anchor links for the shell", () => {
    expect(homeNavItems.map((item) => item.id)).toEqual([
      "hero",
      "overview",
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
      "#overview",
      "#capabilities",
      "#scenarios",
      "#proof",
      "#closing",
    ]);
    expect(homeNavItems.every((item) => item.kind === "anchor")).toBe(true);
  });

  it("exposes dedicated proof content without legacy section compatibility", () => {
    expect(homeProofSection).toEqual({
      id: "proof",
      title: "案例与团队摘要",
      description: "在首页建立最小可信度，而不展开完整案例页。",
      sourceSlides: ["slide-24", "slide-27", "slide-30"],
    });
    expect(homeContent).not.toHaveProperty("homeSections");
  });

  it("keeps every rendered block traceable to source slides", () => {
    expect(homeContent.homeHero.sourceSlides).toEqual(["slide-01"]);
    expect(homeContent.homeOverviewBand.sourceSlides).toEqual(["slide-04", "slide-05", "slide-07", "slide-10"]);
    expect(homeContent.homeOverviewBand.cards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeContent.homeFeatureBands.every((band) => band.sourceSlides.length > 0)).toBe(true);
    expect(homeContent.homeFeatureBands.flatMap((band) => band.items).every((item) => item.sourceSlides.length > 0)).toBe(true);
    expect(homeContent.homeProofCards.every((card) => card.sourceSlides.length > 0)).toBe(true);
    expect(homeContent.homeClosingBand.points.every((point) => point.sourceSlides.length > 0)).toBe(true);
    expect(homeProofSection?.sourceSlides).toEqual(["slide-24", "slide-27", "slide-30"]);
  });
});
