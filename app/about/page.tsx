import type { Metadata } from "next";
import { StaticRedirect } from "@/components/static-redirect";

export const metadata: Metadata = {
  title: "Sobre",
  description: "A página institucional do StackPulse.",
  alternates: { canonical: "/sobre" },
  robots: { index: false, follow: true },
};

export default function AboutRedirect() {
  return <StaticRedirect to="/sobre" title="Sobre o StackPulse" />;
}
