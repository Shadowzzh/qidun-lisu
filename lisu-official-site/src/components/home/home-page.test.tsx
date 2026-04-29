import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/home/home-page";

describe("HomePage", () => {
  it("renders the top four sections with stable ids", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute("id", "why-now");
    expect(screen.getByRole("region", { name: "拒绝概率玩具，打造知识大脑" })).toHaveAttribute("id", "proposition");
    expect(screen.getByRole("region", { name: "七层贯通、语义驱动的平台总览" })).toHaveAttribute("id", "architecture");
  });
});
