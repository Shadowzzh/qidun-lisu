import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HomeVisual } from "@/components/pages/home/home-visual";

describe("HomeVisual", () => {
  it("renders archive-derived imagery with alt text", () => {
    render(<HomeVisual slot={homeVisuals.platformOverview} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "平台总览图" })).toBeInTheDocument();
  });

  it("renders a descriptive placeholder when a slot is unresolved", () => {
    render(<HomeVisual slot={homeVisuals.scenarioPlaceholder} className="w-full" sizes="100vw" />);

    expect(screen.getByText("建议放：业务场景价值图")).toBeInTheDocument();
    expect(screen.getByText("类型：供应链 / 财务 / 风控 / 客服运营场景图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-feature")).toHaveClass("aspect-[1200/928]");
  });

  it("keeps overview placeholders in the overview frame ratio", () => {
    render(<HomeVisual slot={homeVisuals.platformOverviewPlaceholder} className="w-full" sizes="100vw" />);

    expect(screen.getByTestId("home-visual-overview")).toHaveClass("aspect-[2400/1352]");
  });
});
