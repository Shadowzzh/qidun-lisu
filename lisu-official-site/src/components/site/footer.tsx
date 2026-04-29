import { SiteLink } from "@/components/site/site-link";
import { footerGroups, footerSummary } from "@/content/site-footer";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6 md:pt-12">
        <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-2 xl:grid-cols-5">
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

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-balance text-sm font-semibold text-slate-900">{footerSummary.title}</p>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-700">{footerSummary.description}</p>
            <p className="mt-3 text-pretty text-sm leading-7 text-slate-600">{footerSummary.detail}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-balance text-base font-semibold text-slate-900">{siteConfig.companyName}</p>
            <p className="text-pretty text-sm">{siteConfig.siteDescription}</p>
          </div>
          <p className="text-sm">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
