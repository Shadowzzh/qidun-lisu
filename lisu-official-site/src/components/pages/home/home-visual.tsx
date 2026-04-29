import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HomeVisualFrame, HomeVisualSlot } from "@/types/site";

type HomeVisualProps = {
  slot: HomeVisualSlot;
  className?: string;
  sizes?: string;
};

function getFrameClassName(frame: HomeVisualFrame): string {
  if (frame === "hero") {
    return "absolute inset-0 h-full w-full overflow-hidden";
  }

  if (frame === "overview") {
    return "relative aspect-[2400/1352] overflow-hidden rounded-[20px]";
  }

  if (frame === "feature") {
    return "relative aspect-[1200/928] overflow-hidden rounded-[20px]";
  }

  return "relative aspect-[772/332] overflow-hidden";
}

export function HomeVisual({ slot, className, sizes }: HomeVisualProps) {
  const frameClassName = getFrameClassName(slot.frame);

  if (slot.kind === "placeholder") {
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

  return (
    <div data-testid={`home-visual-${slot.frame}`} className={cn(frameClassName, className)}>
      <Image alt={slot.alt} className="object-cover" fill sizes={sizes} src={slot.mobileSrc ?? slot.src} />
    </div>
  );
}
