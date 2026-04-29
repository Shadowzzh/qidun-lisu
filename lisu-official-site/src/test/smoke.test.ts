import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";

describe("siteConfig", () => {
  it("exposes the Lisu homepage identity", () => {
    expect(siteConfig.companyName).toBe("北京骊甦科技");
    expect(siteConfig.siteName).toBe("北京骊甦科技官网");
  });
});
