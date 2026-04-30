"use client";

import { EntryBand } from "@/components/pages/home/entry-band";
import { HeroBand } from "@/components/pages/home/hero-band";
import { OverviewBand } from "@/components/pages/home/overview-band";
import { RouteClosingBand } from "@/components/pages/home/route-closing-band";
import { ScenarioProofBand } from "@/components/pages/home/scenario-proof-band";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeArchitectureLayers,
  homeClosingStatement,
  homeEntryBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
  homeScenarioCards,
} from "@/content/home";

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#f7fbff]">
        <HeroBand content={homeHero} />
        <OverviewBand band={homeOverviewBand} layers={homeArchitectureLayers} />

        <section
          id="solutions"
          aria-labelledby="home-solutions-heading"
          className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_100%)] scroll-mt-24"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="mb-10 max-w-[760px]">
              <h2 id="home-solutions-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
                解决方案入口
              </h2>
              <p className="mt-4 text-pretty text-sm leading-7 text-slate-600 md:text-base">
                这里先建立整体理解，再把主方案、知识资产化路径与前台工作入口分发到后续页面。
              </p>
            </div>

            <div className="space-y-16 md:space-y-20">
              {homeEntryBands.map((band, index) => (
                <EntryBand key={band.id} band={band} variant={index % 2 === 0 ? "default" : "reversed"} />
              ))}
            </div>
          </div>
        </section>

        <ScenarioProofBand scenarios={homeScenarioCards} proofCards={homeProofCards} proofSection={homeProofSection} />
        <RouteClosingBand content={homeClosingStatement} />
      </main>
      <Footer />
    </>
  );
}
