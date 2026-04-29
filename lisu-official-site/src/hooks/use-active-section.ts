"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const ratiosRef = useRef(new Map<string, { ratio: number; updatedAt: number }>());
  const updateCounterRef = useRef(0);
  const idsKey = ids.join("|");

  useEffect(() => {
    const stableIds = idsKey === "" ? [] : idsKey.split("|");

    if (stableIds.length === 0) {
      return;
    }

    const ratios = ratiosRef.current;
    const elements = stableIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            updateCounterRef.current += 1;
            ratios.set(entry.target.id, {
              ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
              updatedAt: updateCounterRef.current,
            });
          }
        });

        let nextActiveId = stableIds[0] ?? "";
        let bestRatio = -1;
        let bestUpdatedAt = -1;

        stableIds.forEach((id) => {
          const state = ratios.get(id);
          const ratio = state?.ratio ?? 0;
          const updatedAt = state?.updatedAt ?? -1;

          if (ratio > bestRatio || (ratio === bestRatio && updatedAt > bestUpdatedAt)) {
            bestRatio = ratio;
            bestUpdatedAt = updatedAt;
            nextActiveId = id;
          }
        });

        if (bestRatio > 0) {
          setActiveId(nextActiveId);
        }
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      ratios.clear();
    };
  }, [idsKey]);

  return activeId;
}
