import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/site/footer";
import { homeNavItems } from "@/content/navigation";
import { footerGroups } from "@/content/site-footer";

describe("Footer", () => {
  it("renders grouped footer content without fake qr or filing entries", () => {
    const { container } = render(<Footer />);
    const footerOverviewLink = screen.getByRole("link", { name: "平台总览" });

    expect(screen.getByText("网站导览")).toBeInTheDocument();
    expect(screen.getByText("方案能力")).toBeInTheDocument();
    expect(screen.getByText("页面规划")).toBeInTheDocument();
    expect(screen.getByText("企业级私有化 AI 知识智能平台方案")).toBeInTheDocument();
    expect(footerOverviewLink).toHaveAttribute("href", "#architecture");
    expect(container.querySelector("a[href='#overview']")).not.toBeInTheDocument();
    expect(screen.queryByText(/ICP备/)).not.toBeInTheDocument();
    expect(container.querySelector("[class*='grid-cols-\\[']")).not.toBeInTheDocument();
  });

  it("reuses the shared homepage nav source for the 网站导览 group", () => {
    expect(footerGroups[0]?.title).toBe("网站导览");
    expect(footerGroups[0]?.items).toBe(homeNavItems);
  });
});
