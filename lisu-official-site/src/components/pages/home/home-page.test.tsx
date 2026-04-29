import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";

describe("HomePage", () => {
  it("renders the template-shaped homepage bands with overview navigation semantics", () => {
    const { container } = render(<HomePage />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute(
      "id",
      "overview",
    );
    expect(screen.getByRole("region", { name: "核心能力入口" })).toHaveAttribute("id", "capabilities");
    expect(screen.getByRole("region", { name: "业务场景价值" })).toHaveAttribute("id", "scenarios");
    expect(screen.getByRole("region", { name: "案例与团队摘要" })).toHaveAttribute("id", "proof");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(within(screen.getByRole("region", { name: "核心能力入口" })).getByText("员工 AI 工作台")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "案例与团队摘要" })).getByText("汽车零部件案例")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "平台总览" }).every((item) => item.getAttribute("href") === "#overview")).toBe(true);
    expect(container.querySelector("section#architecture")).not.toBeInTheDocument();
  });
});

describe("app page", () => {
  it("renders the rebuilt homepage through the route entry", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute(
      "id",
      "overview",
    );
  });
});
