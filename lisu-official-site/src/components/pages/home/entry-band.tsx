import { HomeVisual } from "@/components/pages/home/home-visual";
import { SiteLink } from "@/components/site/site-link";
import { cn } from "@/lib/utils";
import type { HomeEntryBand as HomeEntryBandContent } from "@/types/site";

type EntryBandProps = {
  band: HomeEntryBandContent;
  variant?: "default" | "reversed";
};

export function EntryBand({ band, variant = "default" }: EntryBandProps) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_600px]">
      <div className={cn("max-w-[520px]", variant === "reversed" && "md:order-2 md:justify-self-end")}>
        <h3 className="text-balance text-lg font-semibold text-slate-950 md:text-xl">{band.title}</h3>
        <p className="mt-5 text-pretty text-sm leading-8 text-slate-600">{band.description}</p>
        <SiteLink
          item={band.action}
          className="mt-8 inline-flex items-center rounded-sm bg-sky-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-800"
        >
          查看详情
        </SiteLink>
      </div>

      <div className={cn("w-full justify-self-end", variant === "reversed" && "md:order-1 md:justify-self-start")}>
        <HomeVisual className="w-full" sizes="(min-width: 768px) 600px, 100vw" slot={band.visual} />
      </div>
    </article>
  );
}
