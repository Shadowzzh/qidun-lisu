"use client";

import { ClosingBand } from "@/components/pages/home/closing-band";
import { FeatureBand } from "@/components/pages/home/feature-band";
import { HeroBand } from "@/components/pages/home/hero-band";
import { OverviewBand } from "@/components/pages/home/overview-band";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import {
  homeClosingBand,
  homeFeatureBands,
  homeHero,
  homeOverviewBand,
  homeProofCards,
  homeProofSection,
} from "@/content/home";
import { homeNavItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = homeNavItems.map((item) => item.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header activeId={activeId} />
      <main id="main-content" className="bg-[#f7fbff]">
        <HeroBand content={homeHero} />
        <OverviewBand band={homeOverviewBand} />

        <section className="bg-[linear-gradient(180deg,#eef6ff_0%,#f7fbff_100%)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
            <div className="space-y-16 md:space-y-20">
              {homeFeatureBands.map((band, index) => (
                <FeatureBand
                  key={band.id}
                  band={band}
                  variant={index % 2 === 0 ? "default" : "reversed"}
                />
              ))}
            </div>
          </div>
        </section>

        <ClosingBand closingBand={homeClosingBand} proofCards={homeProofCards} proofSection={homeProofSection} />
      </main>
      <Footer />
    </>
  );
}
