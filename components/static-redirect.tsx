import Link from "next/link";

/**
 * Static-friendly redirect used by the legacy English routes. The site is
 * exported as static HTML, so the redirect is implemented with a meta refresh
 * plus a visible fallback link for no-JS clients.
 */
export function StaticRedirect({ to, title }: { to: string; title: string }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center md:px-6">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Redirecionando
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-ink-2">
        Esta página foi consolidada em uma versão canônica única. Você será redirecionado
        automaticamente.
      </p>
      <Link
        href={to}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Continuar para {to}
      </Link>
    </main>
  );
}
