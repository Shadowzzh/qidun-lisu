export type SlideRef = `slide-${string}`;

export type AssetRef = {
  key: string;
  assetPath: `src/assets/home/${string}`;
  alt: string;
  sourceSlides: SlideRef[];
};

export type NavItem = {
  id: string;
  label: string;
  href: `#${string}` | `/${string}`;
  kind: "anchor" | "route";
};

export type SummaryCard = {
  title: string;
  description: string;
  sourceSlides: SlideRef[];
  visual?: AssetRef;
};

export type TraceableTextItem = {
  title: string;
  description?: string;
  sourceSlides: SlideRef[];
  visual?: AssetRef;
};

export type TraceableGroup = {
  title: string;
  sourceSlides: SlideRef[];
  items: TraceableTextItem[];
  visual?: AssetRef;
};

export type HomeSection = {
  id:
    | "hero"
    | "why-now"
    | "proposition"
    | "architecture"
    | "capabilities"
    | "scenarios"
    | "proof"
    | "closing";
  title: string;
  eyebrow?: string;
  description?: string;
  sourceSlides: SlideRef[];
  visuals?: AssetRef[];
};
