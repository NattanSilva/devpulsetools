import Script from "next/script";
import { adsEnabled, ADSENSE_CLIENT, ADSENSE_SRC } from "@/lib/ads";

export function AdScript() {
  if (!adsEnabled) return null;

  return (
    <Script
      id="adsense-script"
      src={ADSENSE_SRC}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      data-ad-client={ADSENSE_CLIENT}
      async
    />
  );
}