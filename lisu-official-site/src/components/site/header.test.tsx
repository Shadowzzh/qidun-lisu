import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/site/header";

describe("Header", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders four top-level menus and opens the solution panel on hover", () => {
    render(<Header />);

    const desktopNav = screen.getByRole("navigation", { name: "主导航" });
    const trigger = screen.getByRole("button", { name: "解决方案" });

    expect(screen.getByRole("link", { name: "北京骊甦科技" })).toHaveAttribute("href", "/");
    expect(within(desktopNav).getByRole("button", { name: "应用场景" })).toBeInTheDocument();
    expect(within(desktopNav).getByRole("button", { name: "案例中心" })).toBeInTheDocument();
    expect(within(desktopNav).getByRole("button", { name: "关于我们" })).toBeInTheDocument();

    fireEvent.mouseEnter(trigger);

    const panel = screen.getByTestId("desktop-nav-panel");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(within(panel).getByRole("button", { name: "主方案总览" })).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "安全管控" })).toBeInTheDocument();
  });

  it("shows the pending-page alert from both desktop and mobile menus", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    const { container } = render(<Header />);

    fireEvent.mouseEnter(screen.getByRole("button", { name: "关于我们" }));
    fireEvent.click(within(screen.getByTestId("desktop-nav-panel")).getByRole("button", { name: "公司介绍" }));

    const mobileDisclosure = container.querySelector("details");
    mobileDisclosure?.setAttribute("open", "");
    fireEvent.click(within(mobileDisclosure as HTMLDetailsElement).getByRole("button", { name: "应用场景" }));

    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
