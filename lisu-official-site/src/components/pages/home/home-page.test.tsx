import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Page from "@/app/page";
import { HomePage } from "@/components/pages/home/home-page";

describe("HomePage", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders the homepage as a five-section multipage entry shell", () => {
    render(<HomePage />);

    const overviewRegion = screen.getByRole("region", { name: "为什么现在必须建设企业级 AI 平台" });

    expect(screen.getByRole("heading", { name: "企业级私有化 AI 知识智能平台方案" })).toBeInTheDocument();
    expect(overviewRegion).toHaveAttribute("id", "overview");
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

    expect(screen.getByRole("region", { name: "解决方案入口" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "继续浏览官网结构" })).toBeInTheDocument();
  });
});
