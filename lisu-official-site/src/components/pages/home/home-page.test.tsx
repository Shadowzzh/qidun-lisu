import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";
import * as homeContent from "@/content/home";

describe("HomePage", () => {
  it("renders the template-shaped homepage bands with overview navigation semantics", () => {
    const { container } = render(<HomePage />);
    const capabilitiesSection = screen.getByRole("region", { name: "核心能力入口" });
    const scenariosSection = screen.getByRole("region", { name: "业务场景价值" });

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" })).toHaveAttribute(
      "id",
      "overview",
    );
    expect(capabilitiesSection).toHaveAttribute("id", "capabilities");
    expect(capabilitiesSection).toHaveAttribute("data-feature-layout", "default");
    expect(scenariosSection).toHaveAttribute("id", "scenarios");
    expect(scenariosSection).toHaveAttribute("data-feature-layout", "reversed");
    expect(screen.getByRole("region", { name: "案例与团队摘要" })).toHaveAttribute("id", "proof");
    expect(screen.getByRole("region", { name: "价值承诺" })).toHaveAttribute("id", "closing");
    expect(screen.getByRole("heading", { name: homeContent.homeClosingBand.title, level: 2 })).toBeInTheDocument();
    expect(within(capabilitiesSection).getByText("员工 AI 工作台")).toBeInTheDocument();
    expect(within(scenariosSection).getByText("供应链")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "案例与团队摘要" })).getByText("汽车零部件案例")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "平台总览" }).every((item) => item.getAttribute("href") === "#overview")).toBe(true);
    expect(container.querySelector("section#architecture")).not.toBeInTheDocument();
  });

  it("renders proof heading and description from the dedicated proof content model", () => {
    render(<HomePage />);

    const proofSection = screen.getByRole("region", { name: "案例与团队摘要" });
    const homeProofSection = Reflect.get(homeContent, "homeProofSection") as
      | {
          title: string;
          description: string;
        }
      | undefined;

    expect(homeProofSection).toBeDefined();
    expect(within(proofSection).getByRole("heading", { name: homeProofSection?.title, level: 2 })).toBeInTheDocument();
    expect(within(proofSection).getByText(homeProofSection?.description ?? "")).toBeInTheDocument();
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
