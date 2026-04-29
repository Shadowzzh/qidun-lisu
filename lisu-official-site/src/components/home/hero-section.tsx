import { homeHeroMetrics, homeSections } from "@/content/home";

const hero = homeSections.find((section) => section.id === "hero");

export function HeroSection() {
  if (!hero) {
    return null;
  }

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-28">
        <div>
          <p className="text-sm font-medium text-sky-300">PRIVATE AI KNOWLEDGE PLATFORM</p>
          <h1 id="hero-heading" className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 md:text-lg">
            {hero.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          {homeHeroMetrics.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200"
            >
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-2 text-pretty">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
