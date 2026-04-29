import Image from "next/image";
import footerBackgroundWave from "@/assets/site/footer-background-wave.png";
import { BrandLogo } from "@/components/site/brand-logo";
import { SiteLink } from "@/components/site/site-link";
import { footerGroups } from "@/content/site-footer";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-8 pt-10 md:px-6 md:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden xl:block xl:w-1/3">
          <Image
            alt=""
            aria-hidden="true"
            className="object-cover object-right-top"
            data-testid="footer-background-image"
            fill
            sizes="(min-width: 1280px) 33vw, 0vw"
            src={footerBackgroundWave}
          />
        </div>

        <div className="relative z-10 grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-2 xl:w-2/3 xl:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-balance text-sm font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <SiteLink item={item} className="text-sm text-slate-600 hover:text-sky-700">
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative z-10 py-6 text-sm text-slate-600">
          <div className="space-y-2">
            <BrandLogo
              className="flex items-center gap-3"
              markClassName="size-8 rounded-lg"
              textClassName="text-base font-semibold text-slate-900"
            />
            <p className="text-pretty text-sm">{siteConfig.siteDescription}</p>
            <p className="text-sm">{siteConfig.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
