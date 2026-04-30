# Lisu Header Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the desktop header a translucent blurred glass appearance while making the open header and dropdown panel feel like one continuous surface.

**Architecture:** Reuse the existing `openMenu` / `activeMenu` state in `header.tsx` to derive a simple `closed` or `open` visual mode. Keep the interaction model intact, add a semantic `data-menu-state` attribute for styling and tests, and limit the implementation to presentation changes in the desktop header plus regression coverage in the existing header test.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `lisu-official-site/src/components/site/header.tsx`
  - Add `cn` import.
  - Derive `menuState` from `activeMenu`.
  - Add `data-menu-state` to the header root.
  - Apply closed/open glass classes to the header and desktop dropdown panel.
- Modify: `lisu-official-site/src/components/site/header.test.tsx`
  - Assert default closed state.
  - Assert open state after hover.
  - Keep existing dropdown existence assertions.

### Task 1: Add Failing Regression Coverage For Glass State

**Files:**
- Modify: `lisu-official-site/src/components/site/header.test.tsx`
- Test: `lisu-official-site/src/components/site/header.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace the first test with the version below so it asserts both the default and hovered header states:

```tsx
it("renders four top-level menus and opens the solution panel on hover", () => {
  render(<Header />);

  const desktopNav = screen.getByRole("navigation", { name: "主导航" });
  const trigger = screen.getByRole("button", { name: "解决方案" });
  const brandLink = screen.getByRole("link", { name: "北京骊甦科技" });
  const banner = screen.getByRole("banner");

  expect(brandLink).toHaveAttribute("href", "/");
  expect(within(brandLink).getByRole("presentation", { hidden: true })).toHaveAttribute("alt", "");
  expect(banner).toHaveAttribute("data-menu-state", "closed");
  expect(within(desktopNav).getByRole("button", { name: "应用场景" })).toBeInTheDocument();
  expect(within(desktopNav).getByRole("button", { name: "案例中心" })).toBeInTheDocument();
  expect(within(desktopNav).getByRole("button", { name: "关于我们" })).toBeInTheDocument();

  fireEvent.mouseEnter(trigger);

  const panel = screen.getByTestId("desktop-nav-panel");
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(banner).toHaveAttribute("data-menu-state", "open");
  expect(within(panel).getByRole("button", { name: "主方案总览" })).toBeInTheDocument();
  expect(within(panel).getByRole("button", { name: "安全管控" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm test -- --run src/components/site/header.test.tsx
```

Expected:

```text
FAIL src/components/site/header.test.tsx
Expected the element to have attribute:
  data-menu-state="closed"
Received:
  null
```

- [ ] **Step 3: Commit the failing test change locally before implementation is not required**

Do not commit on red. Move directly to implementation after the failure is confirmed.

### Task 2: Implement Linked Glass States In The Desktop Header

**Files:**
- Modify: `lisu-official-site/src/components/site/header.tsx`
- Test: `lisu-official-site/src/components/site/header.test.tsx`

- [ ] **Step 1: Write minimal implementation**

Update the imports at the top of `header.tsx` to include `cn`:

```tsx
import { cn } from "@/lib/utils";
```

Inside `Header()`, derive the visual state right after `activeMenu`:

```tsx
const menuState = activeMenu ? "open" : "closed";
```

Replace the header root and desktop panel markup with the version below:

```tsx
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
```

Notes for the implementer:

- Do not change hover logic, click logic, or keyboard logic.
- Do not change `header-desktop-nav.ts`.
- Do not change `MobileMenu`.

- [ ] **Step 2: Run targeted test to verify it passes**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm test -- --run src/components/site/header.test.tsx
```

Expected:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
```

- [ ] **Step 3: Run full project verification**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu/lisu-official-site
npm run check
```

Expected:

```text
lint passes
typecheck passes
vitest passes
next build succeeds
```

- [ ] **Step 4: Commit the implementation**

Run:

```bash
cd /Users/zhangziheng/Documents/work/qidun-lisu
git add lisu-official-site/src/components/site/header.tsx lisu-official-site/src/components/site/header.test.tsx
git commit -m "实现头部玻璃态导航"
```

## Self-Review

### Spec Coverage

- Closed translucent blurred desktop header: covered in Task 2 implementation.
- Open denser glass header plus panel continuity: covered in Task 2 implementation.
- Preserve current interaction behavior: covered by the note that logic must remain unchanged and by the existing hover assertions.
- Add semantic open/closed state marker: covered in Task 1 and Task 2.
- Mobile menu unchanged: covered in Task 2 notes and file scope.

### Placeholder Scan

- No `TODO`, `TBD`, or “similar to previous task” placeholders remain.
- All changed code steps contain concrete code blocks.
- All run steps include exact commands and expected results.

### Type Consistency

- `menuState` uses only `"open"` and `"closed"` in both implementation and tests.
- `data-menu-state` is asserted with the same values the implementation sets.

