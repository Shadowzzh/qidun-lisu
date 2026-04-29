import { HomeVisual } from "@/components/pages/home/home-visual";
import type { HomeProofCard, HomeProofSection, HomeScenarioCard } from "@/types/site";

type ScenarioProofBandProps = {
  scenarios: HomeScenarioCard[];
  proofSection: HomeProofSection;
  proofCards: HomeProofCard[];
};

export function ScenarioProofBand({ scenarios, proofSection, proofCards }: ScenarioProofBandProps) {
  return (
    <section id={proofSection.id} aria-labelledby="home-proof-heading" className="bg-[#f7fbff] scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
        <div className="text-center">
          <h2 id="home-proof-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
            场景与案例
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
            让平台能力进入关键业务场景，并用现有案例和团队背书建立最小可信度。
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {scenarios.map((card) => (
            <li key={card.title} className="rounded-[20px] bg-white px-6 py-6 shadow-lg shadow-slate-200/60">
              <p className="text-base font-semibold text-slate-950">{card.title}</p>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{card.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <div className="mb-8">
            <h3 className="text-balance text-2xl font-semibold text-slate-950 md:text-3xl">{proofSection.title}</h3>
            <p className="mt-3 max-w-[760px] text-pretty text-sm leading-7 text-slate-600 md:text-base">
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
        </div>
      </div>
    </section>
  );
}
