import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";
import { homeNavItems } from "@/content/navigation";

describe("Header", () => {
  it("renders the six visible homepage anchors in template-like shell order", () => {
    const { container } = render(<Header items={homeNavItems} activeId="overview" />);

    expect(screen.getByRole("link", { name: "北京骊甦科技" })).toHaveAttribute("href", "#hero");
    expect(
      screen
        .getAllByRole("link", { name: "平台总览" })
        .some((node) => node.getAttribute("data-active") === "true"),
    ).toBe(true);
    expect(container.querySelectorAll("nav[aria-label='首页导航'] a")).toHaveLength(6);
    expect(container.querySelector("summary[aria-label='打开导航菜单']")).toBeInTheDocument();
  });
});
