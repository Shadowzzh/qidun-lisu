"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SiteLinkItem } from "@/types/site";

type SiteLinkProps = {
  item: SiteLinkItem;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const pendingPageMessage = "该页面暂未开放，敬请期待。";

export function SiteLink({ item, className, children, onClick }: SiteLinkProps) {
  const content = children ?? item.label;

  if (item.kind === "route") {
    return (
      <Link className={cn(className)} href={item.href} onClick={onClick} prefetch={false}>
        {content}
      </Link>
    );
  }

  function handlePendingClick() {
    window.alert(pendingPageMessage);
    onClick?.();
  }

  return (
    <button type="button" className={cn(className)} data-pending-href={item.href} onClick={handlePendingClick}>
      {content}
    </button>
  );
}
