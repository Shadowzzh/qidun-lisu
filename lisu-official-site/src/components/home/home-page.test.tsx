import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";

describe("HomePage", () => {
  it("renders all eight homepage sections", () => {
    render(<HomePage />);

    expect(screen.getByRole("region", { name: "核心能力入口" })).toHaveAttribute("id", "capabilities");
    expect(screen.getByRole("region", { name: "业务场景价值" })).toHaveAttribute("id", "scenarios");
    expect(screen.getByRole("region", { name: "案例与团队摘要" })).toHaveAttribute("id", "proof");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(screen.getByText("员工 AI 工作台")).toBeInTheDocument();
    expect(screen.getByText("汽车零部件案例")).toBeInTheDocument();
  });
});
