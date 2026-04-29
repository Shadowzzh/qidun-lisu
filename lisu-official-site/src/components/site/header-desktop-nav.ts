import { cn } from "@/lib/utils";

export type HeaderMenuId = "solution" | "scenarios" | "cases" | "company";

const desktopNavItemBaseClassName =
  "flex h-full flex-col justify-center whitespace-nowrap border-b-4 px-5 text-base leading-none transition-colors duration-200";

export function getDesktopNavItemClassName(isActive: boolean) {
  if (isActive) {
    return cn(desktopNavItemBaseClassName, "border-sky-700 text-sky-700 font-medium");
  }

  return cn(
    desktopNavItemBaseClassName,
    "border-transparent text-slate-800 hover:border-sky-700 hover:text-sky-700",
  );
}

export function isHeaderMenuOpen(openMenu: HeaderMenuId | null, menu: HeaderMenuId) {
  return openMenu === menu;
}

export function toggleHeaderMenu(openMenu: HeaderMenuId | null, menu: HeaderMenuId) {
  if (openMenu === menu) {
    return null;
  }

  return menu;
}
