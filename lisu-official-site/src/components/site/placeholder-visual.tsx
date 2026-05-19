import { cn } from "@/lib/utils";

type PlaceholderVisualProps = {
  title: string;
  hint?: string;
  className?: string;
  fill?: boolean;
  labelClassName?: string;
  stageClassName?: string;
  showHint?: boolean;
  testId?: string;
};

export function PlaceholderVisual({
  title,
  hint,
  className,
  fill = false,
  labelClassName,
  stageClassName,
  showHint = false,
  testId = "site-placeholder-visual",
}: PlaceholderVisualProps) {
  const layoutClassName = fill ? "absolute inset-0" : "relative h-full w-full";

  return (
    <div
      className={cn(
        layoutClassName,
        "flex items-center justify-center overflow-hidden border border-slate-200 bg-slate-100/80 text-center",
        className,
      )}
      data-testid={testId}
    >
      <div
        aria-hidden="true"
        className={cn("absolute inset-5 rounded-2xl border border-dashed border-slate-300/80 bg-white/40", stageClassName)}
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-px w-3/5 -translate-x-1/2 -translate-y-1/2 rotate-12 bg-slate-300/80"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-px w-3/5 -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-slate-300/80"
      />
      <div className={cn("relative max-w-[28rem] bg-white/85 px-4 py-2", labelClassName)}>
        <p className="text-sm font-medium text-slate-400 md:text-base">{title}</p>
        {showHint && hint ? <p className="mt-2 text-pretty text-xs leading-6 text-slate-500 md:text-sm">{hint}</p> : null}
      </div>
    </div>
  );
}
