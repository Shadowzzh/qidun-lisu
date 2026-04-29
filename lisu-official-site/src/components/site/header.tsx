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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="#hero"
            className="text-base font-semibold text-slate-900 md:text-lg"
            prefetch={false}
          >
            北京骊甦科技
          </Link>

          <nav aria-label="首页导航" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    data-active={String(activeId === item.id)}
                    aria-current={activeId === item.id ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-4 py-2 text-sm text-slate-600",
                      activeId === item.id && "font-semibold text-blue-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <MobileMenu items={items} activeId={activeId} />
      </div>
    </header>
  );
}
