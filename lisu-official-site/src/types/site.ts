import type { StaticImageData } from "next/image";

export type SlideRef = `slide-${string}`;

export type HomeVisualFrame = "hero" | "overview" | "feature" | "proof-card";

export type HomeVisualSlot =
  | {
      kind: "image";
      frame: HomeVisualFrame;
      alt: string;
      src: StaticImageData;
      mobileSrc?: StaticImageData;
      sourceSlides: SlideRef[];
      sourceArchiveFiles: string[];
    }
  | {
      kind: "placeholder";
      frame: HomeVisualFrame;
      alt: string;
      title: string;
      hint: string;
      sourceSlides: SlideRef[];
      sourceArchiveFiles: string[];
    };

export type SiteLinkItem = {
  label: string;
  href: "/" | `/${string}` | `/${string}#${string}`;
  kind: "route" | "pending";
};

export type NavColumn = {
  title: string;
  items: SiteLinkItem[];
};

export type SiteNavMenu = {
  id: "solution" | "capabilities" | "scenarios" | "cases" | "about";
  label: string;
  href: import("@/content/site-routes").TargetSiteRoute;
  columns: NavColumn[];
};

export type NavItem = {
  id: string;
  label: string;
  href: `#${string}` | `/${string}`;
  kind: "anchor" | "route";
};

export type HomeMetric = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeOverviewCard = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeFeatureItem = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeProofCard = {
  id: "case-one" | "case-two" | "team";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  action: SiteLinkItem;
  sourceSlides: SlideRef[];
};

export type HomeHeroContent = {
  id: "hero";
  title: string;
  metrics: HomeMetric[];
  desktopVisual: HomeVisualSlot;
  mobileVisual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};

export type HomeOverviewBand = {
  id: "overview";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  cards: HomeOverviewCard[];
  sourceSlides: SlideRef[];
};

export type HomeFeatureBand = {
  id: "capabilities" | "scenarios";
  title: string;
  description: string;
  items: HomeFeatureItem[];
  visual: HomeVisualSlot;
  sourceSlides: SlideRef[];
};

export type HomeProofSection = {
  id: "proof";
  title: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type HomeClosingBand = {
  id: "closing";
  title: string;
  description: string;
  points: HomeMetric[];
  sourceSlides: SlideRef[];
};

export type HomeEntryBand = {
  id: "solution-overview" | "semantic-layer" | "data-platform" | "security" | "workspace";
  title: string;
  description: string;
  visual: HomeVisualSlot;
  action: SiteLinkItem;
  sourceSlides: SlideRef[];
};

export type HomeScenarioCard = {
  title: string;
  description: string;
  action: SiteLinkItem;
  sourceSlides: SlideRef[];
};

export type FooterGroup = {
  title: string;
  items: SiteLinkItem[];
};

export type SitePageSection = {
  title: string;
  description: string;
  points: string[];
  sourceSlides: SlideRef[];
};

export type SitePageCover = {
  alt: string;
  title: string;
  hint: string;
  sourceSlides: SlideRef[];
};

export type SitePageHighlight = {
  label: string;
  value: string;
  description: string;
  sourceSlides: SlideRef[];
};

export type SitePageContent = {
  href: import("@/content/site-routes").TargetSiteRoute;
  title: string;
  eyebrow: string;
  description: string;
  cover: SitePageCover;
  highlights: SitePageHighlight[];
  summaryPoints: string[];
  sections: SitePageSection[];
  relatedLinks: SiteLinkItem[];
  sourceSlides: SlideRef[];
};
