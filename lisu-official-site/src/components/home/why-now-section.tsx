import { homeWhyNowGroups } from "@/content/home";

export function WhyNowSection() {
  return (
    <section id="why-now" aria-labelledby="why-now-heading" className="bg-white py-20 scroll-mt-28 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium text-sky-700">WHY NOW</p>
        <h2 id="why-now-heading" className="mt-3 text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
          为什么现在必须建设企业级 AI 平台
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {homeWhyNowGroups.map((group, index) => (
            <article
              key={group.title}
              className={
                index === 0
                  ? "rounded-3xl border border-slate-200 bg-slate-50 p-6"
                  : "rounded-3xl border border-slate-200 bg-sky-50 p-6"
              }
            >
              <h3 className="text-lg font-semibold text-slate-950">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <span className="font-medium text-slate-900">{item.title}</span>
                    {item.description ? `：${item.description}` : ""}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
