export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";

const PLACEHOLDER_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export const adsEnabled =
  ADSENSE_CLIENT !== PLACEHOLDER_CLIENT && /^ca-pub-\d{16}$/.test(ADSENSE_CLIENT);

export const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export const ADSENSE_SLOTS = {
  topBanner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? "5241999999",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "5241999998",
  inContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT ?? "5241999997",
} as const;