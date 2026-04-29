import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/site/footer";

describe("Footer", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders formal footer groups without anchor navigation or planning copy", () => {
    render(<Footer />);
    const companyName = screen.getAllByText("北京骊甦科技").at(-1) as HTMLElement;
    const description = screen.getByText(
      "企业级私有化 AI 知识智能平台方案，从数据查询到知识决策，构建可解释、可审计的企业智能中枢。",
    );
    const navGroups = screen.getByText("解决方案").closest("div")?.parentElement as HTMLElement;
    const footerBackground = screen.getByTestId("footer-background-image");

    expect(screen.getByText("解决方案")).toBeInTheDocument();
    expect(screen.getByText("能力页面")).toBeInTheDocument();
    expect(screen.getByText("应用与案例")).toBeInTheDocument();
    expect(screen.getByText("关于我们")).toBeInTheDocument();
    expect(navGroups).toHaveClass("xl:w-2/3");
    expect(footerBackground).toHaveAttribute("src", expect.stringContaining("footer-background-wave"));
    expect(description.nextElementSibling).toHaveTextContent("Copyright © 2026 北京骊甦科技");
    expect(within(companyName.parentElement as HTMLElement).getByRole("presentation", { hidden: true })).toHaveAttribute(
      "alt",
      "",
    );
    expect(screen.queryByText("企业级私有化 AI 知识智能平台方案")).not.toBeInTheDocument();
    expect(screen.queryByText("从数据查询到知识决策，构建可解释、可审计的企业智能中枢。")).not.toBeInTheDocument();
    expect(screen.queryByText("页面规划")).not.toBeInTheDocument();
    expect(screen.queryByText("平台总览")).not.toBeInTheDocument();
  });

  it("uses the shared pending-page alert for footer items", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    render(<Footer />);

    fireEvent.click(screen.getByRole("button", { name: "主方案总览" }));

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
