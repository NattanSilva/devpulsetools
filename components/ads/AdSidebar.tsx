import { ADSENSE_SLOTS } from "@/lib/ads";
import { AdFrame } from "@/components/ads/ad-frame";

export function AdSidebar({ className = "" }: { className?: string }) {
  return (
    <AdFrame
      slot={ADSENSE_SLOTS.sidebar}
      format="vertical"
      sizeLabel="300×600 · Skyscraper"
      className={`mx-auto h-[120px] w-full lg:h-[600px] lg:w-[300px] ${className}`}
    />
  );
}