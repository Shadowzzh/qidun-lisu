import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PlaceholderVisual } from "@/components/site/placeholder-visual";
import { cn } from "@/lib/utils";
import type { SitePageContent, SitePageSection } from "@/types/site";

type SitePageProps = {
  page: SitePageContent;
};

function getSectionVisualLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getScenarioVisualAspectRatio(section: SitePageSection) {
  const visualSrc = section.visual?.src as
    | { height?: number; src?: string; width?: number }
    | string
    | undefined;

  if (
    visualSrc &&
    typeof visualSrc === "object" &&
    typeof visualSrc.width === "number" &&
    typeof visualSrc.height === "number"
  ) {
    return `${visualSrc.width} / ${visualSrc.height}`;
  }

  const visualPath = typeof visualSrc === "string" ? visualSrc : visualSrc?.src;

  if (visualPath?.includes("scenario-supply-chain-card-center")) {
    return "1827 / 861";
  }

  if (visualPath?.includes("scenario-finance-card-center")) {
    return "1827 / 861";
  }

  if (visualPath?.includes("scenario-risk-control-card-center")) {
    return "2172 / 724";
  }

  if (visualPath?.includes("scenario-customer-operations-card-center")) {
    return "2172 / 724";
  }

  return "16 / 9";
}

function SectionVisual({
  className,
  hint,
  section,
}: {
  className?: string;
  hint: string;
  section: SitePageSection;
}) {
  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden border border-slate-100 bg-white p-2 md:p-3",
        className,
      )}
      data-testid="site-page-section-visual"
    >
      {section.visual ? (
        <div className="relative size-full overflow-hidden rounded-[2px]">
          <Image
            alt={section.visual.alt}
            className="object-cover object-center"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            src={section.visual.src}
          />
        </div>
      ) : (
        <PlaceholderVisual fill hint={hint} title={section.title} />
      )}
    </div>
  );
}

function PageHeroBlock({ page }: SitePageProps) {
  const heroVisual = page.cover.visual ?? null;
  const heroObjectPositionClass =
    page.cover.objectPosition === "right" ? "object-right" : "object-center";

  return (
    <section
      className="relative min-h-[420px] overflow-hidden bg-[#eef4fb] md:min-h-[480px]"
      data-testid="site-page-hero"
    >
      {heroVisual ? (
        <Image
          alt={`${page.title}封面图`}
          className={cn("object-cover", heroObjectPositionClass)}
          fill
          priority
          sizes="100vw"
          src={heroVisual}
        />
      ) : (
        <PlaceholderVisual
          className="absolute inset-0 border-0 px-6 md:justify-end md:px-16"
          hint={page.cover.hint}
          labelClassName="md:mr-[8%]"
          title={page.cover.title}
        />
      )}
      <div
        className="absolute inset-0 bg-[#eef4fb]/30"
        data-testid="site-page-hero-softener"
      />
      <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center px-5 py-16 sm:px-8 md:min-h-[480px]">
        <div className="max-w-[400px]" data-testid="site-page-hero-copy">
          <p className="text-sm font-semibold text-[#2563eb]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-semibold leading-tight text-[#1f2129] md:text-[48px]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-[560px] text-pretty text-sm leading-8 text-[#212121] md:text-base">
            {page.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductBody({ page }: SitePageProps) {
  const showcaseTitle = page.showcase?.title ?? "成果展示";

  return (
    <>
      <section aria-label={`${page.title}内容`} className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="text-center text-[30px] font-medium leading-[42px] text-[#1f2129]">
            核心能力
          </h2>
          <div className="mt-12 space-y-16 lg:mt-[60px] lg:space-y-20">
            {page.sections.map((section, index) => {
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
                    <p className="mt-5 text-pretty text-sm leading-7 text-[#54657e]">
                      {section.description}
                    </p>
                  </div>

                  <SectionVisual
                    className="aspect-[3/2] rounded-[4px]"
                    hint={page.cover.hint}
                    section={section}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#f5f8fc]"
        data-testid="site-page-showcase"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 md:py-[60px]">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-balance text-[30px] font-medium leading-[42px] text-[#1f2129]">
              {showcaseTitle}
            </h2>
            {page.showcase?.description ? (
              <p className="mt-4 text-pretty text-sm leading-7 text-[#54657e] md:text-base">
                {page.showcase.description}
              </p>
            ) : null}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {page.highlights.map((highlight) => {
              return (
                <article
                  key={highlight.label}
                  className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
                  data-testid="site-page-showcase-card"
                >
                  <div className="relative h-[188px] bg-[#f4f7fb] md:h-[220px]">
                    {highlight.visual ? (
                      <Image
                        alt={highlight.visual.alt}
                        className="object-cover object-center"
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        src={highlight.visual.src}
                      />
                    ) : (
                      <PlaceholderVisual
                        fill
                        hint={page.cover.hint}
                        title={highlight.label}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium text-[#2563eb]">
                      {highlight.label}
                    </p>
                    <h3 className="mt-3 line-clamp-2 min-h-[56px] text-balance text-xl font-medium leading-7 text-[#1f2129]">
                      {highlight.value}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-7 text-[#54657e]">
                      {highlight.description}
                    </p>
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
            const link = page.relatedLinks[index];
            const visualAspectRatio = getScenarioVisualAspectRatio(section);

            return (
              <article
                key={section.title}
                className="overflow-hidden rounded-[4px] bg-white shadow-[0_12px_32px_rgba(95,126,189,0.12)]"
                data-testid="site-page-scenario-card"
              >
                <div
                  className="relative bg-[#e6effa]"
                  data-testid="site-page-scenario-visual"
                  style={{ aspectRatio: visualAspectRatio }}
                >
                  {section.visual ? (
                    <Image
                      alt={section.visual.alt}
                      className="object-contain object-center"
                      fill
                      sizes="(min-width: 768px) 560px, 100vw"
                      src={section.visual.src}
                    />
                  ) : (
                    <PlaceholderVisual
                      fill
                      hint={page.cover.hint}
                      title={section.title}
                    />
                  )}
                </div>
                <div className="p-7">
                  <p className="tabular-nums text-sm font-semibold text-[#2563eb]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-balance text-2xl font-semibold text-[#111827]">
                    {section.title}
                  </h3>
                  <p className="mt-5 text-pretty text-sm leading-7 text-[#516070]">
                    {section.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.points.slice(0, 3).map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-[#d8e1ef] px-3 py-1 text-sm text-[#3d4b5f]"
                      >
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
  const caseSections = page.sections.filter(
    (section) =>
      section.title.includes("汽车") || section.title.includes("叉车"),
  );

  return (
    <section className="bg-[#f5f8fc]" data-testid="site-page-case-list">
      <div className="mx-auto grid max-w-[1220px] gap-8 px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#2563eb]">
            Customer Practice
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827] sm:text-4xl">
            客户实践
          </h2>
          <p className="mt-5 text-pretty text-base leading-8 text-[#516070]">
            {page.description}
          </p>
        </div>

        <div className="grid gap-6">
          {caseSections.slice(0, 2).map((section, index) => {
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
                    <p className="mt-5 text-pretty text-base leading-8 text-[#516070]">
                      {section.description}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {section.points.slice(0, 3).map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-[#d8e1ef] px-3 py-1 text-sm text-[#3d4b5f]"
                      >
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

                <SectionVisual
                  className="min-h-[280px] bg-[#dce7f8]"
                  hint={page.cover.hint}
                  section={section}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CompanyOverview({ page }: SitePageProps) {
  const teamSections = page.sections.filter((section) =>
    section.title.includes("能力"),
  );

  return (
    <div data-testid="site-page-company">
      <section className="mx-auto grid w-full max-w-[1220px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <p className="text-sm font-semibold text-[#2563eb]">Company</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827] sm:text-4xl">
            {page.title}
          </h2>
          <p className="mt-6 text-pretty text-base leading-8 text-[#516070]">
            {page.description}
          </p>
          <div className="mt-8 grid gap-4">
            {page.summaryPoints.slice(0, 3).map((point) => (
              <p
                key={point}
                className="rounded-lg border border-[#e1eaf5] bg-white p-5 text-sm leading-7 text-[#516070]"
              >
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[#edf3fb]">
          <PlaceholderVisual
            fill
            hint={page.cover.hint}
            title={page.cover.title}
          />
        </div>
      </section>

      <section className="bg-[#f5f8fc] px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <p className="text-sm font-semibold text-[#2563eb]">Team</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827]">
            核心团队
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {teamSections.slice(0, 3).map((section) => (
              <article
                className="rounded-lg border border-[#e1eaf5] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
                key={section.title}
              >
                <h3 className="text-xl font-semibold text-[#111827]">
                  {section.title}
                </h3>
                <p className="mt-4 text-pretty text-base leading-8 text-[#516070]">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1220px] px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold text-[#2563eb]">Contact</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold text-[#111827]">
          联系我们
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {page.highlights.slice(0, 2).map((highlight) => (
            <article
              className="rounded-lg border border-[#e1eaf5] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
              key={highlight.label}
            >
              <p className="text-sm font-medium text-[#2563eb]">
                {highlight.label}
              </p>
              <h3 className="mt-4 text-balance text-xl font-semibold text-[#111827]">
                {highlight.value}
              </h3>
              <p className="mt-4 text-pretty text-base leading-8 text-[#516070]">
                {highlight.description}
              </p>
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
            <h2 className="mt-2 text-balance text-2xl font-semibold text-[#1f2129]">
              继续浏览
            </h2>
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
