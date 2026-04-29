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
        className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="text-sm font-medium">
          {open ? "关闭" : "菜单"}
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-40 border-t border-slate-200 bg-white px-4 py-6 shadow-lg"
        >
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base text-slate-700",
                    activeId === item.id && "bg-sky-50 font-semibold text-sky-700",
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
