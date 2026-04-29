import { homeSummaryCards } from "@/content/home";

export function CapabilitySection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-slate-50 py-20 scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium text-sky-700">CAPABILITIES</p>
        <h2 id="capabilities-heading" className="mt-3 text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
          核心能力入口
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {homeSummaryCards.capabilities.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
