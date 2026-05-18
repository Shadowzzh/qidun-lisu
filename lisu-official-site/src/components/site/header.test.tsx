import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";

describe("Header", () => {
  it("renders five top-level menus and opens the solution panel on hover", () => {
    render(<Header />);

    const desktopNav = screen.getByRole("navigation", { name: "主导航" });
    const trigger = within(desktopNav).getByRole("link", { name: "解决方案" });
    const brandLink = screen.getByRole("link", { name: "北京骊甦科技" });
    const banner = screen.getByRole("banner");

    expect(brandLink).toHaveAttribute("href", "/");
    expect(within(brandLink).getByRole("presentation", { hidden: true })).toHaveAttribute("alt", "");
    expect(banner).toHaveAttribute("data-menu-state", "closed");
    expect(banner).toHaveClass("bg-white");
    expect(banner.className).not.toContain("bg-white/");
    expect(banner.className).not.toContain("backdrop-blur");
    expect(trigger).toHaveAttribute("href", "/solution");
    expect(within(desktopNav).getByRole("link", { name: "能力页" })).toHaveAttribute("href", "/capabilities");
    expect(within(desktopNav).getByRole("link", { name: "应用场景" })).toHaveAttribute("href", "/scenarios");
    expect(within(desktopNav).getByRole("link", { name: "案例中心" })).toHaveAttribute("href", "/cases");
    expect(within(desktopNav).getByRole("link", { name: "关于我们" })).toHaveAttribute("href", "/about");

    fireEvent.mouseEnter(trigger);

    const panel = screen.getByTestId("desktop-nav-panel");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(banner).toHaveAttribute("data-menu-state", "open");
    expect(within(panel).getByRole("link", { name: "主方案总览" })).toHaveAttribute("href", "/solution");
    expect(within(panel).getByRole("link", { name: "能力总览" })).toHaveAttribute("href", "/capabilities");
  });

  it("links desktop and mobile menus to real target pages", () => {
    const { container } = render(<Header />);

    const desktopNav = screen.getByRole("navigation", { name: "主导航" });

    fireEvent.mouseEnter(within(desktopNav).getByRole("link", { name: "关于我们" }));
    expect(within(screen.getByTestId("desktop-nav-panel")).getByRole("link", { name: "公司介绍" })).toHaveAttribute(
      "href",
      "/about",
    );

    const mobileDisclosure = container.querySelector("details");
    mobileDisclosure?.setAttribute("open", "");
    expect(within(mobileDisclosure as HTMLDetailsElement).getByRole("link", { name: "解决方案" })).toHaveAttribute(
      "href",
      "/solution",
    );
    expect(
      within(mobileDisclosure as HTMLDetailsElement)
        .getAllByRole("link", { name: "应用场景总览" })
        .some((link) => link.getAttribute("href") === "/scenarios"),
    ).toBe(true);
  });
});
