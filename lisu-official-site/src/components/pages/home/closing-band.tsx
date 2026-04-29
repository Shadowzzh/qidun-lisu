import { HomeVisual } from "@/components/pages/home/home-visual";
import type {
  HomeClosingBand as HomeClosingBandContent,
  HomeProofCard,
  HomeProofSection,
} from "@/types/site";

type ClosingBandProps = {
  closingBand: HomeClosingBandContent;
  proofSection: HomeProofSection;
  proofCards: HomeProofCard[];
};

export function ClosingBand({ closingBand, proofSection, proofCards }: ClosingBandProps) {
  return (
    <section className="bg-[#f7fbff]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
        <section id="proof" aria-labelledby="home-proof-heading" className="scroll-mt-24">
          <div className="mb-10 text-center">
            <h2 id="home-proof-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
              {proofSection.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[760px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
              {proofSection.description}
            </p>
          </div>

          <ul className="grid gap-6 lg:grid-cols-3">
            {proofCards.map((card) => (
              <li key={card.id} className="overflow-hidden rounded-[4px] bg-white shadow-lg shadow-slate-200/60">
                <HomeVisual className="w-full" sizes="(min-width: 1024px) 33vw, 100vw" slot={card.visual} />
                <div className="p-5">
                  <p className="text-balance text-base font-medium text-slate-950">{card.title}</p>
                  <p className="mt-4 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id={closingBand.id}
          aria-labelledby="home-closing-heading"
          className="mt-14 rounded-[24px] bg-white px-6 py-8 shadow-lg shadow-slate-200/70 scroll-mt-24 md:px-10 md:py-10"
        >
          <div className="max-w-[760px]">
            <h2 id="home-closing-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
              {closingBand.title}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-600 md:text-base">{closingBand.description}</p>
          </div>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {closingBand.points.map((point) => (
              <li key={point.title} className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-base font-semibold text-slate-950">{point.title}</p>
                <p className="mt-2 text-pretty text-sm leading-7 text-slate-600">{point.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
