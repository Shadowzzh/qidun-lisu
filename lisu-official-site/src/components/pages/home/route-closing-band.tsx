import { SiteLink } from "@/components/site/site-link";
import type { HomeClosingStatement } from "@/types/site";

type RouteClosingBandProps = {
  content: HomeClosingStatement;
};

export function RouteClosingBand({ content }: RouteClosingBandProps) {
  return (
    <section id={content.id} aria-labelledby="route-closing-heading" className="bg-[#f7fbff] scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-4 pb-16 md:pb-20">
        <div className="rounded-[24px] bg-white px-6 py-8 shadow-lg shadow-slate-200/70 md:px-10 md:py-10">
          <div className="max-w-[760px]">
            <h2 id="route-closing-heading" className="text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-slate-600 md:text-base">{content.description}</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.routeGroups.map((group) => (
              <div key={group.title} className="rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-base font-semibold text-slate-950">{group.title}</p>
                <ul className="mt-4 space-y-3">
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
        </div>
      </div>
    </section>
  );
}
