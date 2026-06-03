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
    expect(within(hero).getByTestId("site-page-hero-copy")).toHaveClass("max-w-[400px]");
    expect(screen.getByText(page.description)).toHaveClass("max-w-[560px]");
    expect(screen.getByRole("img", { name: "主方案总览封面图" })).toBeInTheDocument();
    expect(within(screen.getByTestId("site-page-hero")).queryByText("拒绝概率玩具，打造企业知识大脑。")).not.toBeInTheDocument();
    expect(screen.queryByTestId("site-page-cover-visual")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("site-page-section").length).toBeGreaterThanOrEqual(5);
    expect(screen.getAllByTestId("site-page-section-visual").length).toBeGreaterThanOrEqual(5);
    expect(within(screen.getByTestId("site-page-showcase")).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "主方案总览" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "企业级私有化 AI 知识智能平台方案，从数据查询走向知识决策，建设可解释、可审计、可追溯的企业智能中枢。",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "为什么现在必须建设" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "关键事实" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "核心能力" })).toBeInTheDocument();
    expect(screen.getByTestId("site-page-showcase")).toHaveClass("bg-[#f5f8fc]");
    expect(screen.getAllByTestId("site-page-showcase-card").length).toBe(3);
    expect(screen.getByRole("img", { name: "算力底座示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "核心主张示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "架构方式示意图" })).toBeInTheDocument();
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

  it("renders factual capability highlights with a capability-specific showcase heading", () => {
    const page = getSitePageByHref("/capabilities");

    render(<SitePage page={page} />);

    const showcase = screen.getByTestId("site-page-showcase");

    expect(within(showcase).getByRole("heading", { level: 2, name: "能力亮点" })).toBeInTheDocument();
    expect(
      within(showcase).getByText("从数据承接、语义约束到能力编排，形成可组合、可治理、可落地的平台能力。"),
    ).toBeInTheDocument();
    expect(within(showcase).queryByRole("heading", { level: 2, name: "成果展示" })).not.toBeInTheDocument();
    expect(within(showcase).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
    expect(within(showcase).getByRole("img", { name: "AI 数据平台多引擎事实基座示意图" })).toBeInTheDocument();
    expect(within(showcase).getByRole("img", { name: "知识语义层业务语义约束示意图" })).toBeInTheDocument();
    expect(within(showcase).getByRole("img", { name: "能力开放层业务能力编排示意图" })).toBeInTheDocument();
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

  it("uses generated cover visuals for scenario detail pages while keeping body placeholders", () => {
    const page = getSitePageByHref("/scenarios/supply-chain");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "供应链场景封面图" })).toBeInTheDocument();
    expect(within(screen.getByTestId("site-page-hero")).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("site-placeholder-visual").length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByRole("img", { name: "业务场景价值图" })).not.toBeInTheDocument();
  });

  it("right-aligns scenario detail cover visuals in the hero", () => {
    const page = getSitePageByHref("/scenarios/finance");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "财务场景封面图" })).toHaveClass("object-cover", "object-right");
  });

  it("uses generated solution imagery inside product page content slots", () => {
    const page = getSitePageByHref("/solution");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "主方案总览封面图" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "平台总览图" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "核心能力入口图" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "业务场景价值图" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "企业 AI 生产化建设必要性示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "企业知识智能平台核心定位示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "语义约束与知识沉淀差异化价值示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "企业知识智能平台七层架构总览图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "私有化部署与数据主权价值示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "企业知识平台落地治理闭环示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "决策口径审计确定性承诺示意图" })).toBeInTheDocument();
    expect(within(screen.getByTestId("site-page-showcase")).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
    expect(within(screen.getAllByTestId("site-page-section-visual")[0]).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
  });

  it("uses a single clean frame with consistent inset for generated solution section imagery", () => {
    const page = getSitePageByHref("/solution");

    render(<SitePage page={page} />);

    const firstVisual = screen.getAllByTestId("site-page-section-visual")[0];
    const firstImage = within(firstVisual).getByRole("img", { name: "企业 AI 生产化建设必要性示意图" });

    expect(firstVisual).toHaveClass("aspect-[3/2]", "bg-white", "border", "border-slate-100", "p-2", "md:p-3");
    expect(firstVisual).not.toHaveClass("bg-[#f4f7fb]");
    expect(firstImage).toHaveClass("object-cover", "object-center");
    expect(firstImage).not.toHaveClass("object-contain");
    expect(firstImage).not.toHaveClass("p-5");
    expect(firstImage).not.toHaveClass("p-2");
    expect(firstImage).not.toHaveClass("md:p-3");
  });

  it("renders archive-matched body visuals for case detail pages and keeps about body placeholders", () => {
    const casePage = getSitePageByHref("/cases/auto-parts");
    const { unmount } = render(<SitePage page={casePage} />);

    expect(screen.getByRole("img", { name: "汽车零部件知识中台示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "汽车零部件知识资产管理界面" })).toBeInTheDocument();

    unmount();

    const aboutPage = getSitePageByHref("/about");
    render(<SitePage page={aboutPage} />);

    expect(screen.queryByRole("img", { name: "核心团队缩略图" })).not.toBeInTheDocument();
    expect(screen.getAllByTestId("site-placeholder-visual").length).toBeGreaterThanOrEqual(1);
  });

  it("renders archive-matched visuals for the cases overview cards", () => {
    const page = getSitePageByHref("/cases");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "汽车零部件知识中台示意图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "叉车制造产品知识图谱流程图" })).toBeInTheDocument();
  });

  it("renders selected workspace visuals without replacing every placeholder", () => {
    const page = getSitePageByHref("/capabilities/workspace");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "叉车制造知识体系图谱界面" })).toBeInTheDocument();
    expect(screen.getAllByTestId("site-placeholder-visual").length).toBeGreaterThanOrEqual(1);
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

  it("uses scenario section imagery inside the scenarios overview cards", () => {
    const page = getSitePageByHref("/scenarios");

    render(<SitePage page={page} />);

    expect(screen.getByRole("img", { name: "供应链智能决策图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "财务精准提效图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "风控合规可视图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "客服运营智能传承图" })).toBeInTheDocument();
    expect(within(screen.getByTestId("site-page-scenario-grid")).queryByTestId("site-placeholder-visual")).not.toBeInTheDocument();
  });

  it("uses a company layout for the about overview", () => {
    const page = getSitePageByHref("/about");

    render(<SitePage page={page} />);

    expect(screen.getByTestId("site-page-company")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "核心团队" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "联系我们" })).toBeInTheDocument();
  });
});
