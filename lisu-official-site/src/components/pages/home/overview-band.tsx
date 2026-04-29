import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeOverviewBand as HomeOverviewBandContent } from "@/types/site";

type OverviewBandProps = {
  band: HomeOverviewBandContent;
};

export function OverviewBand({ band }: OverviewBandProps) {
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
          <p className="mx-auto mt-6 max-w-[1160px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
            {band.description}
          </p>
        </div>

        <div className="mt-8 rounded-[20px] bg-white p-3 shadow-lg shadow-slate-200/70">
          <HomeVisual className="w-full" sizes="100vw" slot={band.visual} />
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
