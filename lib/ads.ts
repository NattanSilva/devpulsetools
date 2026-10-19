/**
 * Google AdSense configuration.
 *
 * The publisher id matches the one published in `public/ads.txt` and in the
 * `google-adsense-account` meta tag, so ads work out of the box. The ad unit
 * ids can be overridden with environment variables when new slots are created
 * in the AdSense dashboard.
 */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3836772354953908";

const PLACEHOLDER_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export const adsEnabled =
  ADSENSE_CLIENT !== PLACEHOLDER_CLIENT && /^ca-pub-\d{16}$/.test(ADSENSE_CLIENT);

export const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export const ADSENSE_SLOTS = {
  topBanner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? "5241999999",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "5241999998",
  inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT ?? "5241999997",
} as const;
