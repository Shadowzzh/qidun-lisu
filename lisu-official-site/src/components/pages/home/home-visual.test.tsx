import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HomeVisual } from "@/components/pages/home/home-visual";

describe("HomeVisual", () => {
  it("renders archive-derived imagery with alt text", () => {
    render(<HomeVisual slot={homeVisuals.capabilityVisual} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "核心能力入口图" })).toBeInTheDocument();
    expect(screen.queryByText("建议放：核心能力入口图")).not.toBeInTheDocument();
  });

  it("renders a descriptive placeholder when a slot is unresolved", () => {
    render(<HomeVisual slot={homeVisuals.scenarioPlaceholder} className="w-full" sizes="100vw" />);

    expect(screen.getByText("建议放：业务场景价值图")).toBeInTheDocument();
    expect(screen.getByText("类型：供应链 / 财务 / 风控 / 客服运营场景图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-feature")).toHaveClass("aspect-[1200/928]");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("degrades the overview slot to a descriptive placeholder when the asset is unsuitable", () => {
    render(<HomeVisual slot={homeVisuals.platformOverview} className="w-full" sizes="100vw" />);

    expect(screen.getByText("建议放：七层架构总览图")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "平台总览图" })).not.toBeInTheDocument();
    expect(screen.getByTestId("home-visual-overview")).toHaveClass("aspect-[2400/1352]");
  });

  it("keeps proof-card placeholders in the proof-card frame ratio", () => {
    render(<HomeVisual slot={homeVisuals.proofTeam} className="w-full" sizes="100vw" />);

    expect(screen.getByText("建议放：团队背书图")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "核心团队缩略图" })).not.toBeInTheDocument();
    expect(screen.getByTestId("home-visual-proof-card")).toHaveClass("aspect-[772/332]");
  });
});
