import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeVisuals } from "@/assets/home";
import { HomeVisual } from "@/components/pages/home/home-visual";

describe("HomeVisual", () => {
  it("renders archive-derived overview imagery instead of a visible placeholder", () => {
    render(<HomeVisual slot={homeVisuals.platformOverview} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "平台总览图" })).toBeInTheDocument();
    expect(screen.queryByText("建议放：七层架构总览图")).not.toBeInTheDocument();
  });

  it("renders archive-derived team imagery instead of a visible placeholder", () => {
    render(<HomeVisual slot={homeVisuals.proofTeam} className="w-full" sizes="100vw" />);

    expect(screen.getByRole("img", { name: "核心团队缩略图" })).toBeInTheDocument();
    expect(screen.queryByText("建议放：团队背书图")).not.toBeInTheDocument();
  });

  it("wraps feature imagery in a bordered stage with rounded clipping", () => {
    render(<HomeVisual slot={homeVisuals.scenarioVisual} className="w-full" sizes="100vw" />);

    const featureVisual = screen.getByTestId("home-visual-feature");
    const clippedStage = featureVisual.firstElementChild;
    const featureImage = screen.getByRole("img", { name: "业务场景价值图" });

    expect(featureVisual).toHaveClass("border");
    expect(featureVisual).toHaveClass("border-sky-100");
    expect(featureVisual).toHaveClass("bg-white");
    expect(featureVisual).toHaveClass("p-3");
    expect(clippedStage).not.toBeNull();
    expect(clippedStage).toHaveClass("overflow-hidden");
    expect(clippedStage).toHaveClass("rounded-[16px]");
    expect(clippedStage).toHaveClass("border");
    expect(clippedStage).toHaveClass("border-slate-200/80");
    expect(featureImage).toHaveClass("object-cover");
  });

  it("renders feature placeholders as a muted light centered label block", () => {
    const { container } = render(<HomeVisual slot={homeVisuals.solutionOverviewEntry} className="w-full" sizes="100vw" />);

    expect(screen.getByText("占位图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-feature")).toHaveClass("bg-slate-100/80", "border-slate-200");
    expect(container.querySelector("svg")).toBeNull();
  });
});
