import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBand } from "@/components/pages/home/hero-band";
import { homeHero } from "@/content/home";

describe("HeroBand", () => {
  it("renders a single centered slogan over the hero image and keeps metrics below the banner", () => {
    const { container } = render(<HeroBand content={homeHero} />);
    const metricsRail = container.querySelector("[data-testid='hero-metrics-rail']");

    expect(screen.getByRole("heading", { name: "AI 创造无限可能" })).toBeInTheDocument();
    expect(screen.queryByText("PRIVATE AI KNOWLEDGE PLATFORM")).not.toBeInTheDocument();
    expect(
      screen.queryByText("从「数据查询」到「知识决策」，构建可解释、可审计的企业智能中枢。"),
    ).not.toBeInTheDocument();
    expect(container.querySelector("[data-testid='hero-content-panel']")).not.toBeInTheDocument();
    expect(container.querySelector("[data-testid='hero-title']")).toBeInTheDocument();
    expect(screen.getByText("64 卡 H20 集群，9024GB 显存支撑。")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-testid='home-visual-hero']")).toHaveLength(2);
    expect(metricsRail).toBeInTheDocument();
  });
});
