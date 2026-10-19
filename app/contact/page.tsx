import type { Metadata } from "next";
import { StaticRedirect } from "@/components/static-redirect";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o StackPulse.",
  alternates: { canonical: "/contato" },
  robots: { index: false, follow: true },
};

export default function ContactRedirect() {
  return <StaticRedirect to="/contato" title="Entre em contato" />;
}
