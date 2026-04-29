import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/site/footer";

describe("Footer", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders formal footer groups without anchor navigation or planning copy", () => {
    render(<Footer />);

    expect(screen.getByText("解决方案")).toBeInTheDocument();
    expect(screen.getByText("能力页面")).toBeInTheDocument();
    expect(screen.getByText("应用与案例")).toBeInTheDocument();
    expect(screen.getByText("关于我们")).toBeInTheDocument();
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
