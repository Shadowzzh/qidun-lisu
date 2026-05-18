import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("legacy route redirects", () => {
  it("redirects old placeholder paths to the target information architecture", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/company", destination: "/about", permanent: true },
        { source: "/semantic-layer", destination: "/capabilities/semantic-layer", permanent: true },
        { source: "/data-platform", destination: "/capabilities/data-platform", permanent: true },
        { source: "/security", destination: "/capabilities/security", permanent: true },
        { source: "/workspace", destination: "/capabilities/workspace", permanent: true },
        { source: "/infrastructure", destination: "/capabilities", permanent: true },
        { source: "/insights", destination: "/scenarios", permanent: true },
        { source: "/value", destination: "/solution", permanent: true },
      ]),
    );
  });
});
