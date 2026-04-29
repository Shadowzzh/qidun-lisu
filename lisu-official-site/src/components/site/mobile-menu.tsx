"use client";

import { useRef } from "react";
import { SiteLink } from "@/components/site/site-link";
import type { SiteNavMenu } from "@/types/site";

type MobileMenuProps = {
  menus: SiteNavMenu[];
};

export function MobileMenu({ menus }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function handleItemSelect() {
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details ref={detailsRef} className="group relative md:hidden">
      <summary
        aria-label="打开导航菜单"
        className="inline-flex size-10 list-none items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm marker:content-none"
      >
        <span aria-hidden="true" className="text-sm font-medium group-open:hidden">
          菜单
        </span>
        <span aria-hidden="true" className="hidden text-sm font-medium group-open:inline">
          关闭
        </span>
      </summary>

      <div
        id="mobile-nav"
        className="fixed inset-x-0 z-40 border-t border-slate-200 bg-white px-4 pb-6 pt-4 shadow-lg"
        style={{
          top: "calc(4rem + env(safe-area-inset-top))",
          paddingTop: "calc(1rem + env(safe-area-inset-top))",
        }}
      >
        <div className="space-y-6">
          {menus.map((menu) => (
            <section key={menu.id} aria-labelledby={`mobile-menu-${menu.id}`}>
              <h2 id={`mobile-menu-${menu.id}`} className="text-sm font-semibold text-slate-900">
                {menu.label}
              </h2>
              <div className="mt-3 space-y-4">
                {menu.columns.map((column) => (
                  <div key={column.title}>
                    <p className="text-xs font-medium uppercase text-slate-500">{column.title}</p>
                    <ul className="mt-2 space-y-2">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <SiteLink
                            item={item}
                            className="block w-full rounded-md px-3 py-2 text-left text-base text-slate-700 hover:bg-slate-50"
                            onClick={handleItemSelect}
                          >
                            {item.label}
                          </SiteLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}
