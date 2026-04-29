import { homeClosingPoints } from "@/content/home";

export function ClosingSection() {
  return (
    <section
      id="closing"
      aria-labelledby="closing-heading"
      className="bg-sky-50 py-20 scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-sm font-medium text-sky-700">VALUE</p>
        <h2 id="closing-heading" className="mt-3 text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
          价值承诺
        </h2>

        <div className="mt-6 space-y-4 text-base leading-8 text-slate-700 md:text-lg">
          {homeClosingPoints.map((item) => (
            <p key={item.title} className="text-pretty">
              <span className="font-medium text-slate-950">{item.title}</span>
              {item.description ? `：${item.description}` : ""}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
