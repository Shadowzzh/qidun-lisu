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

  it("renders feature placeholders as a muted light centered label block", () => {
    const { container } = render(<HomeVisual slot={homeVisuals.solutionOverviewEntry} className="w-full" sizes="100vw" />);

    expect(screen.getByText("占位图")).toBeInTheDocument();
    expect(screen.getByTestId("home-visual-feature")).toHaveClass("bg-slate-100/80", "border-slate-200");
    expect(container.querySelector("svg")).toBeNull();
  });
});
