"use client";

import type { FocusEvent, KeyboardEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  getDesktopNavItemClassName,
  isHeaderMenuOpen,
  toggleHeaderMenu,
  type HeaderMenuId,
} from "@/components/site/header-desktop-nav";
import { MobileMenu } from "@/components/site/mobile-menu";
import { SiteLink } from "@/components/site/site-link";
import { siteNavMenus } from "@/content/site-nav";
import type { NavColumn } from "@/types/site";

function renderMenuColumn(column: NavColumn) {
  return (
    <div key={column.title}>
      <p className="text-sm font-semibold text-sky-700">{column.title}</p>
      <div className="mt-3 h-px bg-slate-200" />
      <ul className="mt-4 space-y-3">
        {column.items.map((item) => (
          <li key={item.label}>
            <SiteLink item={item} className="text-sm text-slate-700 transition-colors hover:text-sky-700">
              {item.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<HeaderMenuId | null>(null);
  const activeMenu = siteNavMenus.find((menu) => menu.id === openMenu) ?? null;

  function closeIfFocusLeaves(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>, menu: HeaderMenuId) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpenMenu(menu);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpenMenu(null);
    }
  }

  return (
    <header
      className="relative sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm"
      onBlurCapture={closeIfFocusLeaves}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex h-full items-center gap-8">
          <Link href="/" className="text-base font-semibold text-slate-900 md:text-lg" prefetch={false}>
            北京骊甦科技
          </Link>

          <nav aria-label="主导航" className="hidden h-full md:block">
            <ul className="flex h-full items-stretch">
              {siteNavMenus.map((menu) => (
                <li key={menu.id} className="flex h-full items-stretch">
                  <button
                    type="button"
                    aria-expanded={isHeaderMenuOpen(openMenu, menu.id)}
                    className={getDesktopNavItemClassName(isHeaderMenuOpen(openMenu, menu.id))}
                    onClick={() => setOpenMenu((value) => toggleHeaderMenu(value, menu.id))}
                    onKeyDown={(event) => handleTriggerKeyDown(event, menu.id)}
                    onMouseEnter={() => setOpenMenu(menu.id)}
                  >
                    {menu.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <MobileMenu menus={siteNavMenus} />
      </div>

      {activeMenu ? (
        <div data-testid="desktop-nav-panel" className="absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-lg">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-2">
            {activeMenu.columns.map((column) => renderMenuColumn(column))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
