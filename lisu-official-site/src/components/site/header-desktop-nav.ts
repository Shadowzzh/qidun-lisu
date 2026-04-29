export type HeaderMenuId = "solution" | "scenarios" | "cases" | "company";

const desktopNavItemBaseClassName =
  "flex h-full flex-col justify-center whitespace-nowrap border-b-[3px] px-4 text-sm transition-colors";

export function getDesktopNavItemClassName(isActive: boolean) {
  if (isActive) {
    return `${desktopNavItemBaseClassName} border-sky-700 text-sky-700 font-semibold`;
  }

  return `${desktopNavItemBaseClassName} border-transparent text-slate-700 hover:border-sky-700 hover:text-sky-700`;
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
