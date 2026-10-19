export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  legalEmail: string;
}

export const site: SiteConfig = {
  name: "StackPulse",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stackpulse.com.br",
  description:
    "Free, fast and private developer utilities — JSON formatter, JSON to TypeScript, Base64 encoder and UUID generator. 100% client-side, nothing ever leaves your browser.",
  keywords: [
    "developer tools",
    "developer utilities",
    "JSON formatter",
    "JSON validator",
    "JSON to TypeScript",
    "TypeScript type generator",
    "Base64 encoder",
    "Base64 decoder",
    "UUID generator",
    "online tools",
    "client-side tools",
  ],
  legalEmail: "legal@stackpulse.com.br",
};
