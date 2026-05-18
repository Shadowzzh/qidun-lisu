import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SitePage } from "@/components/pages/site-page/site-page";
import { getSitePageByHref } from "@/content/site-pages";

describe("SitePage", () => {
  it("renders a target page with sections and related route links", () => {
    const page = getSitePageByHref("/solution");

    render(<SitePage page={page} />);

    expect(screen.getByRole("heading", { level: 1, name: "主方案总览" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "企业级私有化 AI 知识智能平台方案，从数据查询走向知识决策，建设可解释、可审计、可追溯的企业智能中枢。",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("问题背景")).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "相关页面" })).getByRole("link", { name: "能力总览" })).toHaveAttribute(
      "href",
      "/capabilities",
    );
  });

  it("renders detail pages with a parent route and sibling links", () => {
    const page = getSitePageByHref("/capabilities/semantic-layer");

    render(<SitePage page={page} />);

    const relatedRegion = screen.getByRole("navigation", { name: "相关页面" });

    expect(screen.getByRole("heading", { level: 1, name: "知识语义层" })).toBeInTheDocument();
    expect(within(relatedRegion).getByRole("link", { name: "能力总览" })).toHaveAttribute("href", "/capabilities");
    expect(within(relatedRegion).getByRole("link", { name: "AI 数据平台" })).toHaveAttribute(
      "href",
      "/capabilities/data-platform",
    );
  });
});
