# Lisu Header Glass Design

## Context

`lisu-official-site` currently uses a sticky white desktop header with a hover-driven dropdown panel. The requested change is to make the desktop header feel transparent and blurred, while avoiding the abrupt transition that would happen if the header stayed highly transparent after the dropdown opens.

The existing desktop interaction model is already acceptable:

- hover opens the dropdown
- mouse leave closes the dropdown
- keyboard open and close behavior remains intact

The design work in this document changes presentation only. It does not change the navigation information architecture or the mobile menu.

## Goals

- Give the desktop header a light glass appearance over the hero background.
- Avoid a jarring mismatch between a transparent header and an opened dropdown panel.
- Make the opened header and dropdown feel like one continuous surface.
- Preserve current desktop interaction behavior.
- Keep text readability stable on top of the hero image.

## Non-Goals

- No mobile header redesign.
- No menu content restructuring.
- No new animation system.
- No rebuild of menu keyboard or focus behavior in this task.

## Options Considered

### Option 1: Linked Glass States

Closed state uses a lighter glass surface. Open state uses a denser glass surface for both header and dropdown so they read as one container.

Pros:

- best visual continuity
- keeps the transparent feel in the closed state
- reduces the abruptness called out by the user

Cons:

- requires two appearance states instead of one

### Option 2: Constant Glass State

Header stays visually the same whether the menu is closed or open.

Pros:

- simplest visual model

Cons:

- more likely to feel weak or muddy once the dropdown appears
- lower readability margin against the hero background

### Option 3: Open State Becomes Near-Solid

Closed state is glass. Open state becomes close to a solid light surface.

Pros:

- strongest readability
- very safe for menu usability

Cons:

- loses too much of the glass character
- state shift becomes more obvious than necessary

## Chosen Direction

Choose Option 1: linked glass states.

This is the best balance between the requested transparent effect and a stable open-menu surface.

## Final Design

### Closed Desktop Header

- Use a translucent white surface.
- Apply a moderate backdrop blur.
- Keep a very light bottom border and soft shadow so the header remains legible over the hero.
- Keep navigation text and logo colors unchanged unless readability requires a minimal adjustment.

### Open Desktop Header

- Increase surface opacity relative to the closed state.
- Keep the glass treatment, but make it denser than the closed state.
- Use a clearer border and slightly firmer shadow so the open header has a stronger edge.
- Do not animate blur strength. State change should be immediate or only use the existing light color transition.

### Open Dropdown Panel

- Use the same surface family as the open header.
- Make the panel slightly denser than the open header so menu text remains stable.
- Keep the panel visually attached to the header with matching border color and compatible shadow treatment.
- The combined result should read as a single glass navigation container split into top and bottom sections.

## Implementation Boundaries

### Files

- `lisu-official-site/src/components/site/header.tsx`
- `lisu-official-site/src/components/site/header.test.tsx`

`header-desktop-nav.ts` should stay unchanged unless a minimal class tweak is required for readability.

### State Source

- Reuse `openMenu` and `activeMenu`.
- Do not add a separate React state for glass mode.
- Derive closed versus open appearance directly from whether a desktop menu is active.

### Markup

- Add a semantic attribute such as `data-menu-state=\"closed\" | \"open\"` on the header root.
- Use this state only for styling and tests.

### Styling

- Apply glass styling only to the desktop header and desktop dropdown panel.
- Keep mobile menu styling unchanged.
- Include a readable translucent fallback for environments where `backdrop-filter` support is weaker.

## Validation Plan

- Update the header test to assert that hover opens the menu and the header enters the open state.
- Run targeted tests for `header.test.tsx`.
- Run project verification with `npm run check`.
- Manually verify in browser at the local site URL used by the user, including desktop width over the hero background.

## Risks And Mitigations

### Risk: Reduced Readability Over The Hero

Mitigation:

- use a denser open state
- do not push transparency too far in the closed state

### Risk: Glass Surface Feels Visually Detached From The Panel

Mitigation:

- share the same surface family between the open header and panel
- align border and shadow treatments

### Risk: Blur Becomes Heavy Or Muddy

Mitigation:

- keep blur moderate
- avoid animating blur
- use opacity and border definition rather than stronger effects

## Acceptance Criteria

- Closed desktop header feels transparent and softly blurred.
- Hovering a desktop menu still opens the dropdown panel.
- When the panel is open, header and panel feel visually continuous rather than abrupt.
- Desktop text remains readable over the hero.
- Mobile navigation remains unchanged.
