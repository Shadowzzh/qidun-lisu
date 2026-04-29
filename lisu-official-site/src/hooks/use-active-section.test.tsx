import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useActiveSection } from "@/hooks/use-active-section";

let observerCallback:
  | ((entries: Array<{ isIntersecting: boolean; intersectionRatio: number; target: { id: string } }>) => void)
  | undefined;

class IntersectionObserverMock {
  constructor(callback: typeof observerCallback) {
    observerCallback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function mockSectionRect(
  id: string,
  rect: {
    top: number;
    bottom: number;
    height: number;
  },
) {
  const element = document.getElementById(id) as HTMLElement;

  vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: rect.top,
    width: 1200,
    height: rect.height,
    top: rect.top,
    right: 1200,
    bottom: rect.bottom,
    left: 0,
    toJSON: () => ({}),
  });
}

function setSectionRects(
  rects: Record<
    string,
    {
      top: number;
      bottom: number;
      height: number;
    }
  >,
) {
  Object.entries(rects).forEach(([id, rect]) => {
    mockSectionRect(id, rect);
  });
}

describe("useActiveSection", () => {
  it("starts with the first section id", () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="why-now"></section>
      <section id="closing"></section>
    `;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);
    const { result } = renderHook(() => useActiveSection(["hero", "why-now", "closing"]));
    expect(result.current).toBe("hero");
  });

  it("keeps the highest visible section active across separate observer callbacks", () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="why-now"></section>
      <section id="closing"></section>
    `;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);
    const { result } = renderHook(() => useActiveSection(["hero", "why-now", "closing"]));

    setSectionRects({
      hero: { top: 0, bottom: 80, height: 80 },
      "why-now": { top: 136, bottom: 276, height: 200 },
      closing: { top: 900, bottom: 1100, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("why-now") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 0.7,
        },
      ]);
    });
    expect(result.current).toBe("why-now");

    setSectionRects({
      hero: { top: 0, bottom: 80, height: 80 },
      "why-now": { top: 136, bottom: 276, height: 200 },
      closing: { top: 260, bottom: 460, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("closing") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 0.3,
        },
      ]);
    });
    expect(result.current).toBe("why-now");

    setSectionRects({
      hero: { top: 0, bottom: 80, height: 80 },
      "why-now": { top: 20, bottom: 220, height: 200 },
      closing: { top: 136, bottom: 296, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("closing") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ]);
    });
    expect(result.current).toBe("closing");
  });

  it("drops stale ratios when a later callback reports a different section as fully visible", () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="why-now"></section>
      <section id="closing"></section>
    `;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);
    const { result } = renderHook(() => useActiveSection(["hero", "why-now", "closing"]));

    setSectionRects({
      hero: { top: 0, bottom: 280, height: 280 },
      "why-now": { top: 500, bottom: 700, height: 200 },
      closing: { top: 900, bottom: 1100, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("hero") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 1,
        },
      ]);
    });
    expect(result.current).toBe("hero");

    setSectionRects({
      hero: { top: 0, bottom: 80, height: 80 },
      "why-now": { top: 500, bottom: 700, height: 200 },
      closing: { top: 96, bottom: 346, height: 250 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("closing") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 1,
        },
      ]);
    });
    expect(result.current).toBe("closing");
  });

  it("ignores stale hero visibility when only a newly visible section is reported later", () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="why-now"></section>
      <section id="closing"></section>
    `;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock as unknown as typeof IntersectionObserver);
    const { result } = renderHook(() => useActiveSection(["hero", "why-now", "closing"]));

    setSectionRects({
      hero: { top: 96, bottom: 296, height: 200 },
      "why-now": { top: 500, bottom: 700, height: 200 },
      closing: { top: 900, bottom: 1100, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("hero") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 1,
        },
      ]);
    });
    expect(result.current).toBe("hero");

    setSectionRects({
      hero: { top: 0, bottom: 80, height: 80 },
      "why-now": { top: 136, bottom: 296, height: 200 },
      closing: { top: 900, bottom: 1100, height: 200 },
    });

    act(() => {
      observerCallback?.([
        {
          target: document.getElementById("why-now") as HTMLElement,
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ]);
    });
    expect(result.current).toBe("why-now");
  });
});
