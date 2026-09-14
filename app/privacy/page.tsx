import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} processes data — privacy policy in compliance with LGPD and GDPR, including cookies and Google AdSense advertising.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Privacy Policy · ${site.name}`,
    description: `How ${site.name} processes data — privacy policy in compliance with LGPD and GDPR, including cookies and Google AdSense advertising.`,
    url: `${site.url}/privacy`,
    locale: "en_US",
  },
};

const updated = "September 2026";

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink">
        {n}. {title}
      </h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-3">Last updated: {updated}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-7 text-ink-2">
        <Section n="1" title="Introduction">
          <p>
            {site.name} (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) operates{" "}
            {site.url} and provides a collection of free, client-side developer utilities. This
            Privacy Policy explains what information we process, why we process it, and the rights
            you have over your personal data, in compliance with the Brazilian General Data
            Protection Law (LGPD — Lei nº 13.709/2018) and the European General Data Protection
            Regulation (GDPR).
          </p>
          <p>
            The core design principle of the platform is <strong>local processing</strong>: the
            JSON payloads, text, hashes, regular expressions and any other content you paste into a
            tool are processed exclusively inside your own browser. We never receive, transmit,
            store or process that content on our servers.
          </p>
        </Section>

        <Section n="2" title="Data we do NOT collect">
          <p>
            Because all processing happens on your device, we do not collect, store or have any
            access to the data you submit to the tools, including pasted text, uploaded content,
            generated output or download history. There are no accounts, no user profiles and no
            persistent personal identifiers tied to tool usage.
          </p>
        </Section>

        <Section n="3" title="Data we may collect">
          <p>
            We may process limited, non-personal or anonymized technical data to operate and
            improve the site, such as aggregated page views, device type, browser family and
            approximate region. This data is used to measure performance, diagnose errors and
            understand which tools are useful — always in aggregate and never to identify you
            individually.
          </p>
        </Section>

        <Section n="4" title="Cookies and local storage">
          <p>
            The site uses browser local storage solely to remember interface preferences, such as
            your chosen light or dark theme. This preference is stored locally and is not
            transmitted to us.
          </p>
          <p>
            We do not set marketing cookies of our own. However, our advertising service provider
            may use cookies, pixel tags or similar technologies to serve ads based on your prior
            visits to this and other websites, as described in the Advertising section below.
          </p>
        </Section>

        <Section n="5" title="Advertising and third-party ad identifiers">
          <p>
            We fund the free utilities through advertising served by{" "}
            <strong>Google AdSense</strong> and its certified advertising partners. Google and its
            partners may employ cookies and advertising identifiers (such as the Google Advertising
            ID on Android and the ID for Advertisers on iOS) to display ads, including
            personalised ads shown to you across the web, and to measure the performance of those
            ads.
          </p>
          <p>
            When an advertisement is displayed, third-party ad vendors and ad networks may collect
            or receive information from your browser or device, such as your approximate location,
            the pages you visit, the ads you view, and interaction data, which may be combined with
            identifiers to personalise advertising. These third parties are independent data
            controllers and operate under their own privacy policies.
          </p>
          <p>
            You can opt out of personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="font-medium text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s Ads Settings
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info/choices"
              className="font-medium text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aboutads.info/choices
            </a>
            . For users in the European Economic Area, the UK and Switzerland, we rely on AdSense&apos;s
            consent frameworks (including TCF from IAB Europe where applicable) to legally serve
            personalised ads, and you will see an appropriate consent prompt before such ads load.
          </p>
          <p>
            We may also include affiliate links to developer tool providers. Clicking these links
            may earn us a commission; the merchant you visit handles your data under its own
            privacy policy.
          </p>
        </Section>

        <Section n="6" title="Legal bases for processing (GDPR)">
          <p>
            Where the GDPR applies, the processing of your data is based on: (a) your consent,
            which you may withdraw at any time, for advertising and personalisation; (b) our
            legitimate interest in operating, securing and improving the service, where your
            interests and fundamental rights do not override those interests; and (c) compliance
            with legal obligations, such as responding to lawful requests from competent
            authorities.
          </p>
        </Section>

        <Section n="7" title="Your privacy rights">
          <p>
            Depending on your jurisdiction, you may have the right to: access the personal data we
            hold about you; request rectification of inaccurate data; request erasure; restrict or
            object to processing; data portability (LGPD Art. 18 and GDPR Art. 20); and withdraw
            consent at any time. Because the tools themselves process content locally, most of
            these rights relate to the limited technical and advertising data described above.
          </p>
          <p>
            To exercise any of these rights, including through a data subject access request,
            contact us at{" "}
            <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
              {site.legalEmail}
            </a>
            . We respond within the legally required timeframe and may ask you to verify your
            identity. You also have the right to lodge a complaint with your local data protection
            authority (such as the ANPD in Brazil or a European supervisory authority).
          </p>
        </Section>

        <Section n="8" title="International data transfers">
          <p>
            Advertising partners and analytics providers that process technical data may transfer
            it to servers outside your country of residence. Where required by the GDPR, such
            transfers are safeguarded through Standard Contractual Clauses or equivalent lawful
            transfer mechanisms, and your information is protected to the standards described in
            this policy.
          </p>
        </Section>

        <Section n="9" title="Children&apos;s privacy">
          <p>
            The service is intended for software developers and IT professionals and is not
            directed to children under the age of 13 (or the applicable minimum age in your
            jurisdiction). We do not knowingly collect personal information from children. If you
            believe a child has provided us with personal data, please contact us and we will
            delete it.
          </p>
        </Section>

        <Section n="10" title="Security and retention">
          <p>
            We apply appropriate technical and organisational measures to protect the limited data
            we handle against loss, misuse and unauthorised access. Technical and advertising data
            is retained only for as long as necessary for the purposes described above or as
            required by law, after which it is deleted or anonymised.
          </p>
        </Section>

        <Section n="11" title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. Material changes will be
            reflected by a revised &quot;Last updated&quot; date at the top of this page. Continued
            use of the site after changes take effect constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section n="12" title="Contact">
          <p>
            Questions, feedback or privacy requests:{" "}
            <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
              {site.legalEmail}
            </a>
            . See our{" "}
            <Link href="/contact" className="font-medium text-accent">
              Contact page
            </Link>{" "}
            for more ways to reach us.
          </p>
        </Section>
      </div>

      <p className="mt-10 text-sm text-ink-3">
        See also the{" "}
        <Link href="/terms" className="font-medium text-accent">
          Terms of Use
        </Link>
        .
      </p>
    </div>
  );
}