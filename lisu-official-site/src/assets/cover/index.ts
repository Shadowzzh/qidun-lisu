import aboutCover from "@/assets/cover/about-cover.webp";
import capabilitiesCover from "@/assets/cover/capabilities-cover.webp";
import casesCover from "@/assets/cover/cases-cover.webp";
import dataPlatformCover from "@/assets/cover/data-platform-cover.webp";
import industrialAiCover from "@/assets/cover/industrial-ai-cover.webp";
import securityGovernanceCover from "@/assets/cover/security-governance-cover.webp";
import semanticLayerCover from "@/assets/cover/semantic-layer-cover.webp";
import solutionCover from "@/assets/cover/solution-cover.webp";
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
  about: aboutCover,
} as const;
