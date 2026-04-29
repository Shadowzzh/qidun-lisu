"use client";

import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeHeroContent } from "@/types/site";

type HeroBandProps = {
  content: HomeHeroContent;
};

export function HeroBand({ content }: HeroBandProps) {
  return (
    <section id={content.id} aria-labelledby="home-hero-heading" className="relative overflow-hidden bg-[#f5faff]">
      <div aria-hidden="true" data-testid="hero-backdrop" className="absolute inset-0">
        <div className="hidden h-full w-full md:block">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.desktopVisual} />
        </div>
        <div className="h-full w-full md:hidden">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.mobileVisual} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(247,251,255,0.28)_56%,rgba(245,250,255,0.72)_100%)]" />
      </div>

      <div
        data-testid="hero-stage"
        className="relative mx-auto flex h-[calc((100dvh-4rem)*0.35)] max-w-[1200px] items-center justify-center px-4 py-6 text-center md:py-8"
      >
        <h1
          id="home-hero-heading"
          data-testid="hero-title"
          className="relative max-w-none whitespace-nowrap italic bg-[linear-gradient(90deg,#60a5fa_0%,#2563eb_52%,#172554_100%)] bg-clip-text text-4xl font-semibold leading-[1.08] text-transparent [text-shadow:0_10px_30px_rgba(255,255,255,0.24)] md:-translate-x-4 md:text-5xl lg:text-6xl"
        >
          {content.title}
        </h1>
      </div>

      <div
        data-testid="hero-metrics-wrap"
        className="relative mx-auto max-w-[1200px] px-4 pb-10 pt-6 md:pb-14 md:pt-8"
      >
        <ul data-testid="hero-metrics-rail" className="grid gap-3 md:grid-cols-3">
          {content.metrics.map((metric) => (
            <li
              key={metric.title}
              className="rounded-[20px] border border-sky-100/70 bg-white/78 px-5 py-4 text-left shadow-md shadow-slate-200/35"
            >
              <p className="text-sm font-semibold text-slate-950">{metric.title}</p>
              <p className="mt-2 text-pretty text-sm leading-6 text-slate-600">{metric.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
