import type { Metadata } from "next";
import { StaticRedirect } from "@/components/static-redirect";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do StackPulse.",
  alternates: { canonical: "/termos-de-uso" },
  robots: { index: false, follow: true },
};

export default function TermsRedirect() {
  return <StaticRedirect to="/termos-de-uso" title="Termos de Uso" />;
}
