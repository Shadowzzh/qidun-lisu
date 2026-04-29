"use client";

import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeHeroContent } from "@/types/site";

type HeroBandProps = {
  content: HomeHeroContent;
};

export function HeroBand({ content }: HeroBandProps) {
  return (
    <section id={content.id} aria-labelledby="home-hero-heading" className="relative overflow-hidden bg-[#eef4fb]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="hidden h-full w-full md:block">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.desktopVisual} />
        </div>
        <div className="h-full w-full md:hidden">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.mobileVisual} />
        </div>
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      <div className="relative mx-auto flex min-h-[388px] max-w-[1200px] items-center px-4 pb-6 pt-10 md:min-h-[540px] md:pt-12">
        <div className="grid w-full gap-8 rounded-[24px] bg-slate-950/70 px-6 py-8 text-white shadow-xl shadow-slate-950/15 md:grid-cols-[minmax(0,1.1fr)_320px] md:px-10 md:py-12">
          <div>
            <p className="text-sm font-medium text-sky-200">{content.eyebrow}</p>
            <h1
              id="home-hero-heading"
              className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight md:text-6xl"
            >
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-200 md:text-lg">
              {content.description}
            </p>
          </div>

          <ul className="grid gap-4">
            {content.metrics.map((metric) => (
              <li key={metric.title} className="rounded-[20px] border border-white/15 bg-white/10 px-5 py-4">
                <p className="text-base font-semibold text-white">{metric.title}</p>
                <p className="mt-2 text-pretty text-sm leading-7 text-slate-200">{metric.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
