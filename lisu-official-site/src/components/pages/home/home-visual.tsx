import Image from "next/image";
import { PlaceholderVisual } from "@/components/site/placeholder-visual";
import { cn } from "@/lib/utils";
import type { HomeVisualFrame, HomeVisualSlot } from "@/types/site";

type HomeVisualProps = {
  slot: HomeVisualSlot;
  className?: string;
  sizes?: string;
};

function assertNever(value: never): never {
  throw new Error(`Unhandled home visual frame: ${String(value)}`);
}

function getFrameClassName(frame: HomeVisualFrame): string {
  if (frame === "hero") {
    return "absolute inset-0 h-full w-full overflow-hidden";
  }

  if (frame === "overview") {
    return "relative aspect-[1672/941] overflow-hidden rounded-[24px]";
  }

  if (frame === "feature") {
    return "relative aspect-[1200/720] overflow-hidden rounded-[20px]";
  }

  if (frame === "proof-card") {
    return "relative aspect-[772/332] overflow-hidden";
  }

  return assertNever(frame);
}

function getImageClassName(frame: HomeVisualFrame): string {
  if (frame === "hero" || frame === "feature") {
    return "object-cover";
  }

  return "object-contain bg-white";
}

export function HomeVisual({ slot, className, sizes }: HomeVisualProps) {
  const frameClassName = getFrameClassName(slot.frame);

  if (slot.kind === "placeholder") {
    if (slot.frame === "feature") {
      return (
        <PlaceholderVisual
          testId={`home-visual-${slot.frame}`}
          className={cn(
            frameClassName,
            className,
          )}
          title={slot.title}
        />
      );
    }

    return (
      <div
        data-testid={`home-visual-${slot.frame}`}
        className={cn(
          frameClassName,
          "flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 px-6 text-center",
          className,
        )}
      >
        <div className="flex max-w-[28rem] flex-col items-center">
          <svg
            aria-hidden="true"
            className="size-12 text-slate-400"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="9" width="34" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M13 28L20 21L26 27L31 23L35 28"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <circle cx="18" cy="16" r="2.5" fill="currentColor" />
          </svg>
          <p className="mt-4 text-base font-semibold text-slate-900">{slot.title}</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">{slot.hint}</p>
        </div>
      </div>
    );
  }

  if (slot.frame === "feature") {
    return (
      <div
        data-testid={`home-visual-${slot.frame}`}
        className={cn(
          frameClassName,
          "border border-sky-100 bg-white p-3 shadow-lg shadow-slate-200/40",
          className,
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[16px] border border-slate-200/80 bg-white">
          <Image alt={slot.alt} className={getImageClassName(slot.frame)} fill sizes={sizes} src={slot.src} />
        </div>
      </div>
    );
  }

  return (
    <div data-testid={`home-visual-${slot.frame}`} className={cn(frameClassName, className)}>
      <Image alt={slot.alt} className={getImageClassName(slot.frame)} fill sizes={sizes} src={slot.src} />
    </div>
  );
}
