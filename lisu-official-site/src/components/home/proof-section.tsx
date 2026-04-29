import { homeSummaryCards } from "@/content/home";

export function ProofSection() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="bg-slate-950 py-20 text-white scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium text-sky-300">PROOF</p>
        <h2 id="proof-heading" className="mt-3 text-balance text-3xl font-semibold md:text-4xl">
          案例与团队摘要
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homeSummaryCards.proof.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-pretty text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
