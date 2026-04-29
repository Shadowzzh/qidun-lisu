import { homePropositionCards } from "@/content/home";

export function PropositionSection() {
  return (
    <section
      id="proposition"
      aria-labelledby="proposition-heading"
      className="bg-slate-950 py-20 text-white scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium text-sky-300">POSITIONING</p>
        <h2 id="proposition-heading" className="mt-3 text-balance text-3xl font-semibold md:text-4xl">
          拒绝概率玩具，打造知识大脑
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {homePropositionCards.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200">
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-3 text-pretty">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
