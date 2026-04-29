import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteLink } from "@/components/site/site-link";

describe("SiteLink", () => {
  const originalAlert = window.alert;

  afterEach(() => {
    window.alert = originalAlert;
  });

  it("renders route items as links", () => {
    render(
      <SiteLink item={{ label: "首页", href: "/", kind: "route" }} className="test-link">
        首页
      </SiteLink>,
    );

    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute("href", "/");
  });

  it("renders pending items as buttons and shows a shared alert", () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;

    render(
      <SiteLink item={{ label: "主方案总览", href: "/solution", kind: "pending" }} className="test-link">
        主方案总览
      </SiteLink>,
    );

    fireEvent.click(screen.getByRole("button", { name: "主方案总览" }));

    expect(alertSpy).toHaveBeenCalledWith("该页面暂未开放，敬请期待。");
  });
});
