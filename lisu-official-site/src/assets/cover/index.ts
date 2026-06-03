import aboutCover from "@/assets/cover/about-cover.webp";
import autoPartsCover from "@/assets/cover/auto-parts-cover.webp";
import capabilitiesCover from "@/assets/cover/capabilities-cover.webp";
import casesCover from "@/assets/cover/cases-cover.webp";
import contactCover from "@/assets/cover/contact-cover.webp";
import dataPlatformCover from "@/assets/cover/data-platform-cover.webp";
import forkliftCover from "@/assets/cover/forklift-cover.webp";
import customerOperationsCover from "@/assets/cover/scenario-customer-operations-cover-right.webp";
import financeCover from "@/assets/cover/scenario-finance-cover-right.webp";
import industrialAiCover from "@/assets/cover/industrial-ai-cover.webp";
import riskControlCover from "@/assets/cover/scenario-risk-control-cover-right.webp";
import supplyChainCover from "@/assets/cover/scenario-supply-chain-cover-right.webp";
import securityGovernanceCover from "@/assets/cover/security-governance-cover.webp";
import semanticLayerCover from "@/assets/cover/semantic-layer-cover.webp";
import solutionCover from "@/assets/cover/solution-cover.webp";
import teamCover from "@/assets/cover/team-cover.webp";
import workspaceCover from "@/assets/cover/workspace-cover.webp";

export const coverVisuals = {
  solution: solutionCover,
  capabilities: capabilitiesCover,
  semanticLayer: semanticLayerCover,
  dataPlatform: dataPlatformCover,
  securityGovernance: securityGovernanceCover,
  workspace: workspaceCover,
  industrialAi: industrialAiCover,
  cases: casesCover,
  supplyChain: supplyChainCover,
  finance: financeCover,
  riskControl: riskControlCover,
  customerOperations: customerOperationsCover,
  autoParts: autoPartsCover,
  forklift: forkliftCover,
  about: aboutCover,
  team: teamCover,
  contact: contactCover,
} as const;
