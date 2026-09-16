"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT = "ca-pub-3836772354953908";

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  className = "",
}: AdBannerProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // The slot stays as a placeholder if the push fails (script blocked, etc).
    }
  }, []);

  return (
    <div className={`relative w-full ${className}`} aria-label="Advertisement">
      <div className="flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-surface/60 px-4 py-3 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-3">
          Advertisement
        </span>
        <span className="text-xs text-ink-3/80">Responsive banner</span>
      </div>
      <ins
        className="adsbygoogle absolute inset-0"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}