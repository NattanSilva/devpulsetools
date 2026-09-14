import type { Metadata } from "next";
import { Mail, MessageSquareText } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — send feedback, report a bug, request a developer tool or ask a question about privacy and advertising.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Contact ${site.name}`,
    description: `Contact ${site.name} — send feedback, report a bug, request a developer tool or ask a question about privacy and advertising.`,
    url: `${site.url}/contact`,
    locale: "en_US",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Contact us</h1>
      <p className="mt-2 text-base leading-7 text-ink-2">
        We read every message. Send feedback, report a problem with a tool, request a new utility
        or ask a privacy question.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto]">
        <ContactForm />

        <aside className="space-y-3 md:w-64" aria-label="Direct contact">
          <div className="grid gap-2.5 rounded-2xl border border-line bg-surface p-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
              <Mail className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-ink">Prefer email?</h2>
            <p className="text-sm leading-6 text-ink-2">
              Write to us directly at{" "}
              <a
                href={`mailto:${site.legalEmail}`}
                className="font-medium text-accent break-all hover:underline"
              >
                {site.legalEmail}
              </a>
              .
            </p>
            <p className="text-xs leading-5 text-ink-3">
              General and support: suporte@stackpulse.com.br · Legal and privacy:{site.legalEmail}
            </p>
          </div>

          <div className="grid gap-2.5 rounded-2xl border border-line bg-surface p-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
              <MessageSquareText className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-ink">Response time</h2>
            <p className="text-sm leading-6 text-ink-2">
              We aim to reply within 2 business days. For privacy requests, contact{" "}
              <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
                {site.legalEmail}
              </a>{" "}
              so we can route your request to the right team.
            </p>
          </div>
        </aside>
      </div>

      <p className="mt-8 text-sm leading-6 text-ink-3">
        Do not include passwords, secrets or confidential production data in your message. Emails
        are used solely to respond to your enquiry.
      </p>
    </div>
  );
}

function ContactForm() {
  const subject = `[${site.name}] Feedback`;
  const body =
    "Please describe your question, feedback or bug report in as much detail as possible:";

  const mailtoHref = `mailto:${site.legalEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <form
      aria-label="Contact form"
      className="rounded-2xl border border-line bg-surface p-5 md:p-6"
      action={mailtoHref}
      method="post"
    >
      <div>
        <label htmlFor="contact-topic" className="text-sm font-medium text-ink">
          Topic
        </label>
        <select
          id="contact-topic"
          name="topic"
          className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        >
          <option>Feedback on a tool</option>
          <option>Bug report</option>
          <option>Tool request</option>
          <option>Advertising / partnership</option>
          <option>Privacy question</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          Your message <span className="text-ink-3">(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          rows={6}
          placeholder="Tell us what you'd like to report or request…"
          className="mt-1.5 w-full resize-y rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm leading-6 text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-ink-3">
        The form opens your email program with the message pre-filled. Nothing is sent until you
        press send.
      </p>

      <button
        type="submit"
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 md:w-auto"
      >
        <Mail className="h-4 w-4" /> Compose in your email app
      </button>
    </form>
  );
}