import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeArchitectureLayers, homeOverviewBand } from "@/content/home";
import { OverviewBand } from "@/components/pages/home/overview-band";

describe("OverviewBand", () => {
  it("wraps the desktop platform overview image in a framed, narrower stage", () => {
    render(<OverviewBand band={homeOverviewBand} layers={homeArchitectureLayers} />);

    const overviewVisual = screen.getByTestId("home-visual-overview");
    const desktopStage = overviewVisual.parentElement;
    const outerFrame = desktopStage?.parentElement;

    expect(desktopStage).not.toBeNull();
    expect(outerFrame).not.toBeNull();
    expect(outerFrame).toHaveClass("max-w-[920px]");
    expect(outerFrame).toHaveClass("rounded-[32px]");
    expect(outerFrame).toHaveClass("border");
    expect(outerFrame).toHaveClass("border-sky-100");
    expect(outerFrame).toHaveClass("bg-white");
    expect(outerFrame).toHaveClass("p-3");
    expect(desktopStage).toHaveClass("rounded-[28px]");
    expect(desktopStage).toHaveClass("border");
    expect(desktopStage).toHaveClass("border-sky-50");
    expect(desktopStage).toHaveClass("overflow-hidden");
    expect(overviewVisual).toHaveClass("aspect-[1672/941]");
    expect(overviewVisual).toHaveClass("rounded-[24px]");
  });
});
