import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/site/header";
import { homeNavItems } from "@/content/navigation";

describe("Header", () => {
  it("renders the six visible homepage anchors in template-like shell order", () => {
    render(<Header items={homeNavItems} activeId="overview" />);

    expect(screen.getByRole("link", { name: "北京骊甦科技" })).toHaveAttribute("href", "#hero");
    expect(screen.getByRole("link", { name: "平台总览" })).toHaveAttribute("data-active", "true");
    expect(screen.getAllByRole("link").filter((node) => node.textContent === "价值承诺")).toHaveLength(1);
  });
});
