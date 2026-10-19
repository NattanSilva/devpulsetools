import type { Metadata } from "next";
import { StaticRedirect } from "@/components/static-redirect";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do StackPulse.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: false, follow: true },
};

export default function PrivacyRedirect() {
  return (
    <StaticRedirect to="/politica-de-privacidade" title="Política de Privacidade" />
  );
}
