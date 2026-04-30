import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeOverviewBand as HomeOverviewBandContent } from "@/types/site";

type OverviewBandProps = {
  band: HomeOverviewBandContent;
  layers: ReadonlyArray<{
    label: string;
    description: string;
  }>;
};

export function OverviewBand({ band, layers }: OverviewBandProps) {
  return (
    <section
      id={band.id}
      aria-labelledby="home-overview-heading"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)] scroll-mt-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:py-14">
        <div className="mx-auto max-w-[1320px] text-center">
          <h2 id="home-overview-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
            {band.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[900px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
            {band.description}
          </p>
        </div>

        <div className="mx-auto mt-10 hidden max-w-[920px] rounded-[32px] border border-sky-100 bg-white p-3 shadow-lg shadow-slate-200/60 md:block">
          <div className="overflow-hidden rounded-[28px] border border-sky-50">
            <HomeVisual className="w-full rounded-[24px]" sizes="(min-width: 1200px) 920px, 100vw" slot={band.visual} />
          </div>
        </div>

        <div className="mt-8 rounded-[20px] bg-white p-6 shadow-lg shadow-slate-200/70 md:hidden">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {layers.map((layer) => (
              <article key={layer.label} className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-sm font-semibold text-sky-700">{layer.label}</p>
                <p className="mt-3 text-pretty text-sm leading-7 text-slate-700">{layer.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {band.cards.map((card) => (
            <article key={card.title} className="rounded-[20px] bg-white px-7 py-8 text-left shadow-lg shadow-slate-200/60">
              <h3 className="text-balance text-lg font-semibold text-slate-950">{card.title}</h3>
              <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
