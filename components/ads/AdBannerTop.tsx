import { ADSENSE_SLOTS } from "@/lib/ads";
import { AdFrame } from "@/components/ads/ad-frame";

export function AdBannerTop({ className = "" }: { className?: string }) {
  return (
    <AdFrame
      slot={ADSENSE_SLOTS.topBanner}
      format="horizontal"
      sizeLabel="320×50 → 728×90 responsive"
      className={`mx-auto h-12 max-w-[336px] sm:h-[60px] sm:max-w-[336px] md:h-[90px] md:max-w-[728px] ${className}`}
    />
  );
}