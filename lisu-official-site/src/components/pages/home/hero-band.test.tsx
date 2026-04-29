import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBand } from "@/components/pages/home/hero-band";
import { homeHero } from "@/content/home";

describe("HeroBand", () => {
  it("keeps the template hero frame with a separate content panel and metrics rail", () => {
    const { container } = render(<HeroBand content={homeHero} />);
    const contentPanel = container.querySelector("[data-testid='hero-content-panel']");
    const metricsRail = container.querySelector("[data-testid='hero-metrics-rail']");

    expect(screen.getByText(homeHero.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: homeHero.title })).toBeInTheDocument();
    expect(screen.getByText(homeHero.description)).toBeInTheDocument();
    expect(screen.getByText("64 卡 H20 集群，9024GB 显存支撑。")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-testid='home-visual-hero']")).toHaveLength(2);
    expect(container.querySelector(".relative.mx-auto.flex.min-h-\\[388px\\]")).toBeInTheDocument();
    expect(contentPanel).toBeInTheDocument();
    expect(metricsRail).toBeInTheDocument();
    expect(contentPanel?.contains(metricsRail as Node)).toBe(false);
  });
});
