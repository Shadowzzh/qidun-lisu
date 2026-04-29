"use client";

import { HomeVisual } from "@/components/pages/home/home-visual";
import { cn } from "@/lib/utils";
import type { HomeHeroContent } from "@/types/site";

type HeroBandProps = {
  content: HomeHeroContent;
};

export function HeroBand({ content }: HeroBandProps) {
  return (
    <section id={content.id} aria-labelledby="home-hero-heading" className="relative overflow-hidden bg-[#f5faff]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="hidden h-full w-full md:block">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.desktopVisual} />
        </div>
        <div className="h-full w-full md:hidden">
          <HomeVisual className="h-full w-full" sizes="100vw" slot={content.mobileVisual} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(247,251,255,0.28)_56%,rgba(245,250,255,0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[420px] max-w-[1200px] items-center justify-center px-4 pb-20 pt-16 text-center md:min-h-[620px] md:pb-24 md:pt-20">
        <h1
          id="home-hero-heading"
          data-testid="hero-title"
          className="max-w-[10ch] bg-[linear-gradient(90deg,#1d4ed8_0%,#2563eb_48%,#0ea5e9_100%)] bg-clip-text text-5xl font-semibold leading-[1.08] text-transparent [text-shadow:0_10px_30px_rgba(255,255,255,0.24)] md:text-7xl"
        >
          {content.title}
        </h1>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 pb-10 md:-mt-10 md:pb-14">
        <ul data-testid="hero-metrics-rail" className="grid gap-4 md:grid-cols-3">
          {content.metrics.map((metric, index) => (
            <li
              key={metric.title}
              className={cn(
                "rounded-[24px] border border-sky-100/90 bg-white/92 px-6 py-6 text-left shadow-[0_20px_48px_rgba(148,163,184,0.18)] backdrop-blur-sm",
                index === 0 && "md:translate-y-2",
                index === 2 && "md:translate-y-2",
              )}
            >
              <p className="text-base font-semibold text-slate-950">{metric.title}</p>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{metric.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
