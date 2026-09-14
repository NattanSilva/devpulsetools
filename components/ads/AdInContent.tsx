import { ADSENSE_SLOTS } from "@/lib/ads";
import { AdFrame } from "@/components/ads/ad-frame";

export function AdInContent({ className = "" }: { className?: string }) {
  return (
    <AdFrame
      slot={ADSENSE_SLOTS.inContent}
      format="auto"
      sizeLabel="Responsive · 300×250 → 728×90"
      className={`mx-auto h-[90px] max-w-2xl md:h-[140px] ${className}`}
    />
  );
}