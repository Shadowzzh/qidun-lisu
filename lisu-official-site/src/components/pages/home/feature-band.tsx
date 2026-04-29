import { HomeVisual } from "@/components/pages/home/home-visual";
import { cn } from "@/lib/utils";
import type { HomeFeatureBand as HomeFeatureBandContent } from "@/types/site";

type FeatureBandProps = {
  band: HomeFeatureBandContent;
  variant?: "default" | "reversed";
};

export function FeatureBand({ band, variant = "default" }: FeatureBandProps) {
  return (
    <section
      id={band.id}
      aria-labelledby={`${band.id}-heading`}
      className="scroll-mt-24"
      data-feature-layout={variant}
    >
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_600px]">
        <div className={cn("max-w-[520px]", variant === "reversed" && "md:order-2 md:justify-self-end")}>
          <h2 id={`${band.id}-heading`} className="text-balance text-lg font-semibold text-slate-950 md:text-xl">
            {band.title}
          </h2>
          <p className="mt-5 text-pretty text-sm leading-8 text-slate-600">{band.description}</p>

          <ul className="mt-8 grid gap-4">
            {band.items.map((item) => (
              <li key={item.title} className="rounded-[20px] bg-white px-5 py-4 shadow-lg shadow-slate-200/50">
                <p className="text-base font-semibold text-slate-950">{item.title}</p>
                <p className="mt-2 text-pretty text-sm leading-7 text-slate-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn("w-full justify-self-end", variant === "reversed" && "md:order-1 md:justify-self-start")}>
          <HomeVisual className="w-full" sizes="(min-width: 768px) 600px, 100vw" slot={band.visual} />
        </div>
      </div>
    </section>
  );
}
