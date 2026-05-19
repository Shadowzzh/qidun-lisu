import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SitePage } from "@/components/pages/site-page/site-page";
import { getSitePageByHref } from "@/content/site-pages";

describe("SitePage", () => {
  it("renders a target page with sections and related route links", () => {
    const page = getSitePageByHref("/solution");

    render(<SitePage page={page} />);

    const hero = screen.getByTestId("site-page-hero");

    expect(hero).toHaveClass("min-h-[420px]");
    expect(hero).toHaveClass("md:min-h-[480px]");
    expect(hero.querySelector('[class*="bg-[#eef4fb]/70"]')).not.toBeInTheDocument();
    expect(within(hero).getByTestId("site-page-hero-softener")).toHaveClass("bg-[#eef4fb]/30");
    expect(within(hero).getByTestId("site-page-hero-copy")).toHaveClass("max-w-[600px]");
    expect(screen.getByText(page.description)).toHaveClass("max-w-[560px]");
    expect(screen.getByRole("img", { name: "主方案总览封面图" })).toBeInTheDocument();
    expect(within(screen.getByTestId("site-page-hero")).queryByText("拒绝概率玩具，打造企业知识大脑。")).not.toBeInTheDocument();
    expect(screen.queryByTestId("site-page-cover-visual")).not.toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "平台总览图" }).length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("site-page-section").length).toBeGreaterThanOrEqual(5);
    expect(screen.getAllByTestId("site-page-section-visual").length).toBeGreaterThanOrEqual(5);
    expect(screen.getByRole("heading", { level: 1, name: "主方案总览" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "企业级私有化 AI 知识智能平台方案，从数据查询走向知识决策，建设可解释、可审计、可追溯的企业智能中枢。",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("为什么现在必须建设")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "关键事实" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "核心能力" })).toBeInTheDocument();
    expect(screen.getByTestId("site-page-showcase")).toHaveClass("bg-[#f5f8fc]");
    expect(screen.getAllByTestId("site-page-showcase-card").length).toBe(3);
    expect(screen.getAllByText("64 卡 H20 集群").length).toBeGreaterThan(0);
    expect(within(screen.getByRole("navigation", { name: "相关页面" })).getByRole("link", { name: "能力总览" })).toHaveAttribute(
      "href",
      "/capabilities",
    );
  });

  it("uses dedicated cover visuals for the core solution and capability pages", () => {
    const expectedCovers = [
      ["/solution", "主方案总览封面图"],
      ["/capabilities", "能力总览封面图"],
      ["/capabilities/semantic-layer", "知识语义层封面图"],
      ["/capabilities/data-platform", "AI 数据平台封面图"],
      ["/capabilities/security", "安全管控封面图"],
      ["/capabilities/workspace", "员工 AI 工作台封面图"],
      ["/scenarios", "应用场景总览封面图"],
    ] as const;

    for (const [href, alt] of expectedCovers) {
      const { unmount } = render(<SitePage page={getSitePageByHref(href)} />);

      expect(screen.getByRole("img", { name: alt })).toBeInTheDocument();

      unmount();
    }
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

  it("uses a case-list layout for the cases overview", () => {
    const page = getSitePageByHref("/cases");

    render(<SitePage page={page} />);

    expect(screen.getByTestId("site-page-case-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("site-page-case-card").length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByTestId("site-page-showcase")).not.toBeInTheDocument();
  });

  it("uses a scenario-card layout for the scenarios overview", () => {
    const page = getSitePageByHref("/scenarios");

    render(<SitePage page={page} />);

    expect(screen.getByTestId("site-page-scenario-grid")).toBeInTheDocument();
    expect(screen.getAllByTestId("site-page-scenario-card").length).toBeGreaterThanOrEqual(4);
  });

  it("uses a company layout for the about overview", () => {
    const page = getSitePageByHref("/about");

    render(<SitePage page={page} />);

    expect(screen.getByTestId("site-page-company")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "核心团队" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "联系我们" })).toBeInTheDocument();
  });
});
