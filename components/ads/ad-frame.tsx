"use client";

import { useEffect, useRef } from "react";
import { adsEnabled, ADSENSE_CLIENT } from "@/lib/ads";

type AdFormat = "auto" | "horizontal" | "vertical" | "rectangle";

export interface AdFrameProps {
  slot: string;
  format?: AdFormat;
  sizeLabel?: string;
  className?: string;
}

export function AdFrame({ slot, format = "auto", sizeLabel, className = "" }: AdFrameProps) {
  const registered = useRef(false);

  useEffect(() => {
    if (!adsEnabled || registered.current) return;
    registered.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // The ad slot stays as a placeholder if the push fails (script blocked, etc).
    }
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-label="Advertisement"
      data-ad-slot-format={format}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line bg-surface/60 px-3 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-3">
          Advertisement
        </span>
        {sizeLabel ? <span className="text-xs text-ink-3/80">{sizeLabel}</span> : null}
      </div>
      {adsEnabled ? (
        <ins
          className="adsbygoogle absolute inset-0"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : null}
    </div>
  );
}