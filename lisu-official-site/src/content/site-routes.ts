export const targetSiteRoutes = [
  "/",
  "/solution",
  "/capabilities",
  "/capabilities/semantic-layer",
  "/capabilities/data-platform",
  "/capabilities/security",
  "/capabilities/workspace",
  "/scenarios",
  "/scenarios/supply-chain",
  "/scenarios/finance",
  "/scenarios/risk-control",
  "/scenarios/customer-operations",
  "/cases",
  "/cases/auto-parts",
  "/cases/forklift",
  "/about",
  "/about/team",
  "/about/contact",
] as const;

export type TargetSiteRoute = (typeof targetSiteRoutes)[number];
