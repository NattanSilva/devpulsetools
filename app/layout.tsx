import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdScript } from "@/components/ads/AdScript";
import { AdBannerTop } from "@/components/ads/AdBannerTop";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const themeScript = `(function(){try{var t=window.localStorage.getItem("theme");if(t==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stackpulse.com.br"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  title: {
    default: `${site.name} — Client-side developer utilities`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Free developer utilities in your browser`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Free developer utilities in your browser`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "nX8m4qySmm5h3VPp4JGJ9PwdsKzcNsJnFFyp8gkL38E",
  },
  alternates: { canonical: "/" },
  other: {
    "google-adsense-account": "ca-pub-3836772354953908",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <div className="border-b border-line bg-surface/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 md:px-6">
            <AdBannerTop />
          </div>
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AdScript />
        <Script
          async
          id="adsbygoogle-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3836772354953908"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Analytics />
      </body>
    </html>
  );
}