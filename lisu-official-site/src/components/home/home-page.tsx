"use client";

import { ArchitectureSection } from "@/components/home/architecture-section";
import { HeroSection } from "@/components/home/hero-section";
import { PropositionSection } from "@/components/home/proposition-section";
import { WhyNowSection } from "@/components/home/why-now-section";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { homeNavItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = homeNavItems.map((item) => item.id);

export function HomePage() {
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <Header activeId={activeId} />
      <main id="main-content">
        <HeroSection />
        <WhyNowSection />
        <PropositionSection />
        <ArchitectureSection />
      </main>
      <Footer />
    </>
  );
}
