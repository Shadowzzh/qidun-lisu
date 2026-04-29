import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 md:px-6">
        <p className="font-semibold text-slate-900">{siteConfig.companyName}</p>
        <p>{siteConfig.siteDescription}</p>
        <p>{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
