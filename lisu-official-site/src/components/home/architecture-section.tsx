import { homeArchitectureLayers } from "@/content/home";

export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="bg-white py-20 scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-sm font-medium text-sky-700">ARCHITECTURE</p>
        <h2 id="architecture-heading" className="mt-3 text-balance text-3xl font-semibold text-slate-950 md:text-4xl">
          七层贯通、语义驱动的平台总览
        </h2>

        <div className="mt-10 grid gap-4 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          {homeArchitectureLayers.map((layer) => (
            <div key={layer.title} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800">
              {layer.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
