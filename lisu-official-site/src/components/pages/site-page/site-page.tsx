import Image from "next/image";
import Link from "next/link";
import { homeVisuals } from "@/assets/home";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import type { HomeVisualSlot, SitePageContent } from "@/types/site";

type SitePageProps = {
  page: SitePageContent;
};

function getSectionVisualLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

type SiteSectionVisual = {
  alt: string;
  src: Extract<HomeVisualSlot, { kind: "image" }>["src"];
};

function getSectionVisual(page: SitePageContent, index: number): SiteSectionVisual | null {
  if (page.href === "/solution") {
    if (index === 0 || index === 2) {
      return homeVisuals.platformOverview.kind === "image"
        ? { alt: homeVisuals.platformOverview.alt, src: homeVisuals.platformOverview.src }
        : null;
    }

    if (index === 1 || index === 4) {
      return homeVisuals.capabilityVisual.kind === "image"
        ? { alt: homeVisuals.capabilityVisual.alt, src: homeVisuals.capabilityVisual.src }
        : null;
    }

    return homeVisuals.scenarioVisual.kind === "image"
      ? { alt: homeVisuals.scenarioVisual.alt, src: homeVisuals.scenarioVisual.src }
      : null;
  }

  if (page.href.startsWith("/capabilities")) {
    if (page.href === "/capabilities/data-platform" || index % 2 === 0) {
      return homeVisuals.platformOverview.kind === "image"
        ? { alt: homeVisuals.platformOverview.alt, src: homeVisuals.platformOverview.src }
        : null;
    }

    return homeVisuals.capabilityVisual.kind === "image"
      ? { alt: homeVisuals.capabilityVisual.alt, src: homeVisuals.capabilityVisual.src }
      : null;
  }

  if (page.href.startsWith("/scenarios")) {
    return homeVisuals.scenarioVisual.kind === "image"
      ? { alt: homeVisuals.scenarioVisual.alt, src: homeVisuals.scenarioVisual.src }
      : null;
  }

  if (page.href.includes("forklift")) {
    return homeVisuals.proofCaseTwo.kind === "image"
      ? { alt: homeVisuals.proofCaseTwo.alt, src: homeVisuals.proofCaseTwo.src }
      : null;
  }

  if (page.href.startsWith("/cases")) {
    return homeVisuals.proofCaseOne.kind === "image"
      ? { alt: homeVisuals.proofCaseOne.alt, src: homeVisuals.proofCaseOne.src }
      : null;
  }

  if (page.href.startsWith("/about")) {
    return homeVisuals.proofTeam.kind === "image"
      ? { alt: homeVisuals.proofTeam.alt, src: homeVisuals.proofTeam.src }
      : null;
  }

  return null;
}

function getShowcaseVisual(page: SitePageContent, index: number): SiteSectionVisual | null {
  if (page.href.includes("forklift")) {
    return homeVisuals.proofCaseTwo.kind === "image"
      ? { alt: homeVisuals.proofCaseTwo.alt, src: homeVisuals.proofCaseTwo.src }
      : null;
  }

  if (page.href.startsWith("/cases")) {
    return homeVisuals.proofCaseOne.kind === "image"
      ? { alt: homeVisuals.proofCaseOne.alt, src: homeVisuals.proofCaseOne.src }
      : null;
  }

  if (page.href.startsWith("/about")) {
    return homeVisuals.proofTeam.kind === "image"
      ? { alt: homeVisuals.proofTeam.alt, src: homeVisuals.proofTeam.src }
      : null;
  }

  if (index === 0) {
    return homeVisuals.platformOverview.kind === "image"
      ? { alt: homeVisuals.platformOverview.alt, src: homeVisuals.platformOverview.src }
      : null;
  }

  if (index === 1) {
    return homeVisuals.capabilityVisual.kind === "image"
      ? { alt: homeVisuals.capabilityVisual.alt, src: homeVisuals.capabilityVisual.src }
      : null;
  }

  return homeVisuals.scenarioVisual.kind === "image"
    ? { alt: homeVisuals.scenarioVisual.alt, src: homeVisuals.scenarioVisual.src }
    : null;
}

function PageHeroBlock({ page }: SitePageProps) {
  return (
    <section
      className="relative min-h-[500px] overflow-hidden bg-[#eef4fb] md:min-h-[560px]"
      data-testid="site-page-hero"
    >
      {homeVisuals.heroDesktop.kind === "image" ? (
        <Image
          alt={`${page.title}页面背景图`}
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={homeVisuals.heroDesktop.src}
        />
      ) : null}
      <div className="absolute inset-0 bg-[#eef4fb]/70" />
      <div className="relative mx-auto flex min-h-[500px] max-w-[1200px] items-center px-5 py-16 sm:px-8 md:min-h-[560px]">
        <div className="max-w-[680px]">
          <p className="text-sm font-semibold text-[#2563eb]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-semibold leading-tight text-[#1f2129] md:text-[48px]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-sm leading-8 text-[#212121] md:text-base">
            {page.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductBody({ page }: SitePageProps) {
  return (
    <>
      <section aria-label={`${page.title}内容`} className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="text-center text-[30px] font-medium leading-[42px] text-[#1f2129]">核心能力</h2>
          <div className="mt-12 space-y-16 lg:mt-[60px] lg:space-y-20">
            {page.sections.map((section, index) => {
              const visual = getSectionVisual(page, index);

              return (
                <article
                  key={section.title}
                  className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:[&:nth-child(even)>*:first-child]:order-2"
                  data-testid="site-page-section"
                >
                  <div className="min-w-0">
                    <p className="tabular-nums text-sm font-semibold text-[#2563eb]">
                      {getSectionVisualLabel(index)}
                    </p>
                    <h3 className="mt-4 text-balance text-[22px] font-medium leading-8 text-[#1f2129] md:text-[30px] md:leading-[42px]">
                      {section.title}
                    </h3>
                    <p className="mt-5 text-pretty text-sm leading-7 text-[#54657e]">{section.description}</p>
                  </div>

                  <div
                    className="relative min-h-[220px] overflow-hidden rounded-[4px] bg-[#f4f7fb] md:min-h-[350px]"
                    data-testid="site-page-section-visual"
                  >
                    {visual ? (
                      <Image
                        alt={visual.alt}
                        className="object-contain p-3"
                        fill
                        sizes="(max-width: 767px) 100vw, 560px"
                        src={visual.src}
                      />
                    ) : (
                      <div className="flex min-h-[220px] items-center justify-center p-6 md:min-h-[350px]">
                        <p className="text-sm font-medium text-[#708099]">{page.cover.title}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f8fc]" data-testid="site-page-showcase">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 md:py-[60px]">
          <h2 className="text-center text-[30px] font-medium leading-[42px] text-[#1f2129]">成果展示</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {page.highlights.map((highlight, index) => {
              const visual = getShowcaseVisual(page, index);

              return (
                <article
                  key={highlight.label}
                  className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
                  data-testid="site-page-showcase-card"
                >
                  <div className="relative h-[188px] bg-[#f4f7fb] md:h-[220px]">
                    {visual ? (
                      <Image
                        alt={visual.alt}
                        className="object-cover"
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        src={visual.src}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6">
                        <p className="text-sm font-medium text-[#708099]">{page.cover.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium text-[#2563eb]">{highlight.label}</p>
                    <h3 className="mt-3 line-clamp-2 min-h-[56px] text-balance text-xl font-medium leading-7 text-[#1f2129]">
                      {highlight.value}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-7 text-[#54657e]">{highlight.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function ScenarioOverview({ page }: SitePageProps) {
  return (
    <section className="bg-[#f5f8fc]" data-testid="site-page-scenario-grid">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="text-center">
          <h2 className="text-balance text-[30px] font-medium leading-[42px] text-[#1f2129]">
            业务场景
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-pretty text-sm leading-7 text-[#54657e]">
            把知识语义层、AI 数据平台和安全管控翻译成业务可理解的价值入口。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {page.sections.slice(0, 4).map((section, index) => {
            const visual = getSectionVisual(page, index);
            const link = page.relatedLinks[index];

            return (
              <article
                key={section.title}
                className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
                data-testid="site-page-scenario-card"
              >
                <div className="relative h-[220px] bg-[#e6effa]">
                  {visual ? (
                    <Image
                      alt={visual.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={visual.src}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6">
                      <p className="text-sm font-medium text-[#708099]">{page.cover.title}</p>
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <p className="tabular-nums text-sm font-semibold text-[#2563eb]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-balance text-2xl font-semibold text-[#111827]">{section.title}</h3>
                  <p className="mt-5 text-pretty text-sm leading-7 text-[#516070]">{section.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.points.slice(0, 3).map((point) => (
                      <span key={point} className="rounded-full border border-[#d8e1ef] px-3 py-1 text-sm text-[#3d4b5f]">
                        {point}
                      </span>
                    ))}
                  </div>
                  {link ? (
                    <Link
                      href={link.href}
                      className="mt-7 inline-flex rounded-[4px] bg-[#2563eb] px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2055d9]"
                      prefetch={false}
                    >
                      查看详情
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseOverview({ page }: SitePageProps) {
  const caseSections = page.sections.filter((section) => section.title.includes("汽车") || section.title.includes("叉车"));

  return (
    <section className="bg-[#f5f8fc]" data-testid="site-page-case-list">
      <div className="mx-auto grid max-w-[1220px] gap-8 px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#2563eb]">Customer Practice</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827] sm:text-4xl">
            客户实践
          </h2>
          <p className="mt-5 text-pretty text-base leading-8 text-[#516070]">{page.description}</p>
        </div>

        <div className="grid gap-6">
          {caseSections.slice(0, 2).map((section, index) => {
            const visual = getSectionVisual(page, index);
            const link = page.relatedLinks[index];

            return (
              <article
                className="grid overflow-hidden rounded-lg bg-white shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:grid-cols-[0.92fr_1.08fr]"
                data-testid="site-page-case-card"
                key={section.title}
              >
                <div className="flex min-h-[280px] flex-col justify-between p-7 sm:p-9">
                  <div>
                    <p className="tabular-nums text-sm font-semibold text-[#2563eb]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 text-balance text-2xl font-semibold text-[#111827]">
                      {section.title}
                    </h3>
                    <p className="mt-5 text-pretty text-base leading-8 text-[#516070]">{section.description}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {section.points.slice(0, 3).map((point) => (
                      <span key={point} className="rounded-full border border-[#d8e1ef] px-3 py-1 text-sm text-[#3d4b5f]">
                        {point}
                      </span>
                    ))}
                  </div>
                  {link ? (
                    <Link
                      href={link.href}
                      className="mt-7 inline-flex text-sm font-medium text-[#2563eb] transition-colors duration-200 hover:text-[#2055d9]"
                      prefetch={false}
                    >
                      查看案例
                    </Link>
                  ) : null}
                </div>

                <div className="relative min-h-[280px] bg-[#dce7f8]">
                  {visual ? (
                    <Image
                      alt={visual.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      src={visual.src}
                    />
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center p-6">
                      <p className="text-sm font-medium text-[#708099]">{page.cover.title}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CompanyOverview({ page }: SitePageProps) {
  const teamSections = page.sections.filter((section) => section.title.includes("能力"));

  return (
    <div data-testid="site-page-company">
      <section className="mx-auto grid w-full max-w-[1220px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <p className="text-sm font-semibold text-[#2563eb]">Company</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827] sm:text-4xl">
            {page.title}
          </h2>
          <p className="mt-6 text-pretty text-base leading-8 text-[#516070]">{page.description}</p>
          <div className="mt-8 grid gap-4">
            {page.summaryPoints.slice(0, 3).map((point) => (
              <p key={point} className="rounded-lg border border-[#e1eaf5] bg-white p-5 text-sm leading-7 text-[#516070]">
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#edf3fb]">
          {homeVisuals.proofTeam.kind === "image" ? (
            <Image
              alt={homeVisuals.proofTeam.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={homeVisuals.proofTeam.src}
            />
          ) : (
            <div className="flex h-full min-h-[360px] items-center justify-center p-6">
              <p className="text-sm font-medium text-[#708099]">{page.cover.title}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <p className="text-sm font-semibold text-[#2563eb]">Team</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827]">核心团队</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {teamSections.slice(0, 3).map((section) => (
              <article
                className="rounded-lg border border-[#e1eaf5] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
                key={section.title}
              >
                <h3 className="text-xl font-semibold text-[#111827]">{section.title}</h3>
                <p className="mt-4 text-pretty text-base leading-8 text-[#516070]">{section.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1220px] px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold text-[#2563eb]">Contact</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827]">联系我们</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {page.highlights.slice(0, 2).map((highlight) => (
            <article
              className="rounded-lg border border-[#e1eaf5] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
              key={highlight.label}
            >
              <p className="text-sm font-medium text-[#2563eb]">{highlight.label}</p>
              <h3 className="mt-4 text-balance text-xl font-semibold text-[#111827]">{highlight.value}</h3>
              <p className="mt-4 text-pretty text-base leading-8 text-[#516070]">{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function RelatedPagesNav({ page }: SitePageProps) {
  return (
    <nav aria-label="相关页面" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#2563eb]">Next</p>
            <h2 className="mt-2 text-balance text-2xl font-semibold text-[#1f2129]">继续浏览</h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex rounded-[4px] border border-[#d8e1ef] px-5 py-3 text-sm font-medium text-[#3d4b5f] transition-colors duration-200 hover:border-[#2563eb] hover:text-[#2563eb]"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function renderPageBody(page: SitePageContent) {
  if (page.href === "/scenarios") {
    return <ScenarioOverview page={page} />;
  }

  if (page.href === "/cases") {
    return <CaseOverview page={page} />;
  }

  if (page.href === "/about") {
    return <CompanyOverview page={page} />;
  }

  return <ProductBody page={page} />;
}

export function SitePage({ page }: SitePageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-white text-slate-950">
        <PageHeroBlock page={page} />
        {renderPageBody(page)}
        <RelatedPagesNav page={page} />
      </main>
      <Footer />
    </>
  );
}
