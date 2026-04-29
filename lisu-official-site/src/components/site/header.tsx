"use client";

import type { FocusEvent, KeyboardEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import {
  getDesktopNavItemClassName,
  isHeaderMenuOpen,
  toggleHeaderMenu,
  type HeaderMenuId,
} from "@/components/site/header-desktop-nav";
import { MobileMenu } from "@/components/site/mobile-menu";
import { SiteLink } from "@/components/site/site-link";
import { siteNavMenus } from "@/content/site-nav";
import { cn } from "@/lib/utils";
import type { NavColumn } from "@/types/site";

function renderMenuColumn(column: NavColumn) {
  return (
    <div key={column.title}>
      <div className="flex items-center gap-1 text-sm font-semibold text-sky-700 text-balance">
        <span>{column.title}</span>
        <span aria-hidden="true" className="text-sky-400">
          ›
        </span>
      </div>
      <div className="mt-3 h-px bg-sky-100" />
      <ul className="mt-5 space-y-5">
        {column.items.map((item) => (
          <li key={item.label}>
            <SiteLink
              item={item}
              className="block text-base text-slate-800 text-pretty transition-colors duration-200 hover:text-sky-700"
            >
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
  const menuState = activeMenu ? "open" : "closed";

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
      data-menu-state={menuState}
      className={cn(
        "relative sticky top-0 z-50 border-b shadow-sm transition-colors duration-200",
        menuState === "open"
          ? "border-slate-200/80 bg-white/80 backdrop-blur-lg"
          : "border-white/20 bg-white/45 backdrop-blur-md",
      )}
      onBlurCapture={closeIfFocusLeaves}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex h-full items-center gap-10">
          <Link href="/" className="shrink-0" prefetch={false}>
            <BrandLogo
              className="flex items-center gap-3.5"
              markClassName="size-9 rounded-xl"
              textClassName="text-sm font-semibold text-slate-900 md:text-base"
            />
          </Link>

          <nav aria-label="主导航" className="hidden h-full md:flex md:items-stretch">
            <ul className="flex h-full items-stretch pl-3">
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
        <div
          data-testid="desktop-nav-panel"
          className="absolute inset-x-0 top-full border-t border-slate-200/70 bg-white/88 shadow-lg backdrop-blur-lg"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-8 md:grid-cols-2">
            {activeMenu.columns.map((column) => renderMenuColumn(column))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
