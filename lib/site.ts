export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  legalEmail: string;
}

export const site: SiteConfig = {
  name: "StackPulse",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stackpulse.com.br",
  description:
    "Free, fast and private developer utilities — JSON to TypeScript, formatters, converters and generators. 100% client-side, nothing ever leaves your browser.",
  keywords: [
    "developer tools",
    "JSON to TypeScript",
    "JSON formatter",
    "cron generator",
    "base64 encoder",
    "uuid generator",
    "hash generator",
    "regex tester",
  ],
  legalEmail: "legal@stackpulse.com.br",
};