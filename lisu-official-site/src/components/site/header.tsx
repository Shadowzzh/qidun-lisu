"use client";

import Link from "next/link";
import { MobileMenu } from "@/components/site/mobile-menu";
import { homeNavItems } from "@/content/navigation";
import { cn } from "@/lib/utils";

type HeaderProps = {
  items?: typeof homeNavItems;
  activeId: string;
};

export function Header({ items = homeNavItems, activeId }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#hero" className="text-sm font-semibold text-slate-900" prefetch={false}>
          北京骊甦科技
        </Link>

        <nav aria-label="首页导航" className="hidden gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              prefetch={false}
              data-active={String(activeId === item.id)}
              className={cn(
                "text-sm text-slate-600 transition-colors",
                activeId === item.id && "font-semibold text-sky-700",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu items={items} activeId={activeId} />
      </div>
    </header>
  );
}
