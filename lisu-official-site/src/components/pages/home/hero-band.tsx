"use client";

import { HomeVisual } from "@/components/pages/home/home-visual";
import { cn } from "@/lib/utils";
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

      <div className="relative mx-auto flex min-h-[388px] max-w-[1200px] items-start justify-center px-4 pb-6 pt-10 text-center md:min-h-[540px] md:pt-12">
        <div className="w-full">
          <div
            data-testid="hero-content-panel"
            className="mx-auto max-w-[860px] rounded-[24px] bg-white/88 px-6 py-8 text-slate-950 shadow-xl shadow-slate-950/15 backdrop-blur-sm md:px-10 md:py-10"
          >
            <p className="text-sm font-medium text-sky-700">{content.eyebrow}</p>
            <h1
              id="home-hero-heading"
              className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl"
            >
              {content.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-700 md:text-lg">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 pb-8 md:pb-12">
        <ul data-testid="hero-metrics-rail" className="grid gap-4 md:-mt-14 md:grid-cols-3">
          {content.metrics.map((metric, index) => (
            <li
              key={metric.title}
              className={cn(
                "rounded-[20px] border border-white/20 bg-slate-950/78 px-5 py-5 text-left text-white shadow-lg shadow-slate-950/15 backdrop-blur-sm",
                index === 0 && "md:translate-y-3",
                index === 2 && "md:translate-y-3",
              )}
            >
              <p className="text-base font-semibold text-white">{metric.title}</p>
              <p className="mt-2 text-pretty text-sm leading-7 text-slate-200">{metric.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
