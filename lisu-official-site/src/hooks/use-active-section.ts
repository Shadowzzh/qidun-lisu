"use client";

import { useEffect, useState } from "react";

const OBSERVER_ROOT_MARGIN = "-96px 0px -55% 0px";
const OBSERVER_THRESHOLD = [0.2, 0.4, 0.6];

function parseRootMarginValue(value: string, viewportHeight: number) {
  if (value.endsWith("%")) {
    return (Number.parseFloat(value) / 100) * viewportHeight;
  }

  return Number.parseFloat(value);
}

function getCurrentVisibilityRatio(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  if (rect.height <= 0) {
    return 0;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const [topMarginValue, , bottomMarginValue] = OBSERVER_ROOT_MARGIN.split(" ");
  const rootTop = 0 - parseRootMarginValue(topMarginValue ?? "0px", viewportHeight);
  const rootBottom = viewportHeight + parseRootMarginValue(bottomMarginValue ?? "0px", viewportHeight);
  const visibleHeight = Math.min(rect.bottom, rootBottom) - Math.max(rect.top, rootTop);

  if (visibleHeight <= 0) {
    return 0;
  }

  return Math.min(visibleHeight / rect.height, 1);
}

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const idsKey = ids.join("|");

  useEffect(() => {
    const stableIds = idsKey === "" ? [] : idsKey.split("|");

    if (stableIds.length === 0) {
      return;
    }

    const elements = stableIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      () => {
        let nextActiveId = stableIds[0] ?? "";
        let bestRatio = -1;

        elements.forEach((element) => {
          const ratio = getCurrentVisibilityRatio(element);

          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextActiveId = element.id;
          }
        });

        if (bestRatio > 0) {
          setActiveId(nextActiveId);
        }
      },
      {
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: OBSERVER_THRESHOLD,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [idsKey]);

  return activeId;
}
