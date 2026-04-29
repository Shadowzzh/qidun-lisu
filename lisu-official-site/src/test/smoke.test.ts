import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import { siteConfig } from "@/content/site";
import { defaultMetadata } from "@/lib/metadata";

describe("siteConfig", () => {
  it("exposes the Lisu homepage identity", () => {
    expect(siteConfig.companyName).toBe("北京骊甦科技");
    expect(siteConfig.siteName).toBe("北京骊甦科技官网");
  });

  it("publishes the brand icon across metadata and app manifest", () => {
    const siteManifest = manifest();

    expect(defaultMetadata.icons).toEqual({
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: "/apple-icon.png",
    });
    expect(siteManifest.icons).toEqual([
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ]);
  });
});
