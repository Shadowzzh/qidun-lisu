"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const ratiosRef = useRef(new Map<string, number>());
  const idsKey = ids.join("|");

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            ratiosRef.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
        });

        let nextActiveId = ids[0] ?? "";
        let bestRatio = -1;

        ids.forEach((id) => {
          const ratio = ratiosRef.current.get(id) ?? 0;

          if (ratio > bestRatio) {
            bestRatio = ratio;
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
      ratiosRef.current.clear();
    };
  }, [idsKey]);

  return activeId;
}
