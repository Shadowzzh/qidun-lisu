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
});
