import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBand } from "@/components/pages/home/hero-band";
import { homeHero } from "@/content/home";

describe("HeroBand", () => {
  it("renders a tighter hero stage with an italic single-line title and a left-to-right light-to-dark gradient", () => {
    const { container } = render(<HeroBand content={homeHero} />);
    const heroRegion = screen.getByRole("region", { name: "AI 创造无限可能" });
    const metricsRail = container.querySelector("[data-testid='hero-metrics-rail']");
    const heroBackdrop = container.querySelector("[data-testid='hero-backdrop']");
    const heroStage = container.querySelector("[data-testid='hero-stage']");
    const heroTitle = container.querySelector("[data-testid='hero-title']");
    const metricsWrap = container.querySelector("[data-testid='hero-metrics-wrap']");
    const metricCards = container.querySelectorAll("[data-testid='hero-metrics-rail'] > li");

    expect(screen.getByRole("heading", { name: "AI 创造无限可能" })).toBeInTheDocument();
    expect(screen.queryByText("PRIVATE AI KNOWLEDGE PLATFORM")).not.toBeInTheDocument();
    expect(
      screen.queryByText("从「数据查询」到「知识决策」，构建可解释、可审计的企业智能中枢。"),
    ).not.toBeInTheDocument();
    expect(container.querySelector("[data-testid='hero-content-panel']")).not.toBeInTheDocument();
    expect(heroBackdrop).toBeInTheDocument();
    expect(heroRegion.contains(heroBackdrop as Node)).toBe(true);
    expect(heroStage?.contains(heroBackdrop as Node)).toBe(false);
    expect(heroStage).toHaveClass("h-[calc((100dvh-4rem)*0.35)]");
    expect(heroTitle).toHaveClass("whitespace-nowrap");
    expect(heroTitle).toHaveClass("italic");
    expect(heroTitle).toHaveClass("md:-translate-x-4");
    expect(heroTitle).toHaveClass("text-4xl", "md:text-5xl", "lg:text-6xl");
    expect(heroTitle).toHaveClass("bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_52%,#172554_100%)]");
    expect(screen.getByText("64 卡 H20 集群，9024GB 显存支撑。")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-testid='home-visual-hero']")).toHaveLength(2);
    expect(metricsRail).toBeInTheDocument();
    expect(metricsWrap).toHaveClass("pt-6", "md:pt-8");
    expect(metricCards).toHaveLength(3);
    expect(metricCards[0]).toHaveClass("bg-white/78", "px-5", "py-4", "shadow-md");
    expect(metricCards[0]).not.toHaveClass("md:translate-y-2");
  });
});
