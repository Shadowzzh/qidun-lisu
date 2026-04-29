"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/site";

type MobileMenuProps = {
  items: NavItem[];
  activeId: string;
};

export function MobileMenu({ items, activeId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const normalizedItems = items.map((item) => {
    if (item.id === "architecture" && item.href === "#architecture") {
      return {
        ...item,
        id: "overview",
        href: "#overview" as const,
      };
    }

    return item;
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
        className="inline-flex size-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-sm font-medium">
          {open ? "关闭" : "菜单"}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 z-40 border-t border-slate-200 bg-white px-4 pb-6 shadow-lg md:hidden"
          style={{ top: "calc(4rem + env(safe-area-inset-top))", paddingTop: "calc(1rem + env(safe-area-inset-top))" }}
        >
          <ul className="space-y-3">
            {normalizedItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base text-slate-700",
                    activeId === item.id && "bg-blue-50 font-semibold text-blue-700",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
