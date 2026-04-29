import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";
import { homeNavItems } from "@/content/navigation";

describe("Header", () => {
  it("renders only anchor navigation items for phase 1", () => {
    render(<Header items={homeNavItems} activeId="hero" />);

    expect(screen.getByRole("link", { name: "首页概览" })).toHaveAttribute("href", "#hero");
    expect(screen.queryByRole("link", { name: "主方案总览" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "首页概览" })).toHaveAttribute("data-active", "true");
  });
});
