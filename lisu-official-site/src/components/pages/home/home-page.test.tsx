import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";

describe("HomePage", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders the homepage as a five-section multipage entry shell with the refreshed hero", () => {
    render(<HomePage />);

    const heroRegion = screen.getByRole("region", { name: "AI 创造无限可能" });
    const overviewRegion = screen.getByRole("region", { name: "企业级私有化 AI 知识智能平台方案" });

    expect(heroRegion).toHaveAttribute("id", "hero");
    expect(within(heroRegion).queryByText("PRIVATE AI KNOWLEDGE PLATFORM")).not.toBeInTheDocument();
    expect(within(heroRegion).getByText("澎湃算力底座")).toBeInTheDocument();
    expect(overviewRegion).toHaveAttribute("id", "overview");
    expect(
      within(overviewRegion).getByText(
        "我们希望提供的不是一套 AI 工具，而是帮助企业建设“数字决策中枢”。通过统一企业知识语义层，让业务语言直接驱动决策，推动企业从“数据查询”走向“知识决策”，在核心业务中实现可解释、可审计、可追溯的智能应用。",
      ),
    ).toBeInTheDocument();
    expect(within(overviewRegion).getByText("生产可用")).toBeInTheDocument();
    expect(within(overviewRegion).getByText("知识资产")).toBeInTheDocument();
    expect(within(overviewRegion).getByText("知识大脑")).toBeInTheDocument();
    expect(within(overviewRegion).getByRole("img", { name: "平台总览图" })).toBeInTheDocument();
    expect(within(overviewRegion).getByText("L7 应用层")).toBeInTheDocument();
    expect(within(overviewRegion).getByText("L1 超算底座")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "解决方案入口" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "场景与案例" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toHaveAttribute("id", "route-closing");
  });

  it("renders five solution entry modules with pending detail buttons", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    render(<HomePage />);

    const entryRegion = screen.getByRole("region", { name: "解决方案入口" });
    expect(
      within(entryRegion).getByText("这里先建立整体理解，再把主方案、知识资产化路径与前台工作入口分发到后续页面。"),
    ).toBeInTheDocument();
    expect(within(entryRegion).getByText("主方案总览")).toBeInTheDocument();
    expect(within(entryRegion).getByText("知识语义层")).toBeInTheDocument();
    expect(within(entryRegion).getByText("AI 数据平台")).toBeInTheDocument();
    expect(within(entryRegion).getByText("安全管控")).toBeInTheDocument();
    expect(within(entryRegion).getByText("员工 AI 工作台")).toBeInTheDocument();

    fireEvent.click(within(entryRegion).getAllByRole("button", { name: "查看详情" })[0]);

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });

  it("renders scenario summaries and proof cards together in the closing content region", () => {
    render(<HomePage />);

    const proofRegion = screen.getByRole("region", { name: "场景与案例" });

    expect(within(proofRegion).getByText("供应链")).toBeInTheDocument();
    expect(within(proofRegion).getByText("财务")).toBeInTheDocument();
    expect(within(proofRegion).getByText("汽车零部件案例")).toBeInTheDocument();
    expect(within(proofRegion).getByText("核心团队")).toBeInTheDocument();
  });
});

describe("app page", () => {
  it("renders the rebuilt multipage-entry homepage from the route entry", () => {
    render(<Page />);

    expect(screen.getByRole("region", { name: "AI 创造无限可能" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "解决方案入口" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toBeInTheDocument();
  });
});
