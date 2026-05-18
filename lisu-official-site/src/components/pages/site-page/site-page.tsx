import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import type { SitePageContent } from "@/types/site";

type SitePageProps = {
  page: SitePageContent;
};

export function SitePage({ page }: SitePageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <p className="text-sm font-semibold text-sky-700">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold text-slate-950 md:text-5xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-slate-600 md:text-lg">
              {page.description}
            </p>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {page.summaryPoints.map((point) => (
                <li key={point} className="rounded-md border border-slate-200 bg-slate-50 p-5 text-pretty text-sm leading-7 text-slate-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label={`${page.title}内容`} className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <div className="grid gap-6 lg:grid-cols-2">
              {page.sections.map((section) => (
                <article key={section.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-balance text-2xl font-semibold text-slate-950">{section.title}</h2>
                  <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{section.description}</p>
                  <ul className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3 text-pretty text-sm leading-7 text-slate-700">
                        <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-sky-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="相关页面" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <h2 className="text-balance text-2xl font-semibold text-slate-950">继续浏览</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-sky-700 hover:text-sky-700"
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}
