import type { ComponentType } from "react";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { JsonToTypescript } from "@/components/tools/json-to-typescript";
import { Base64Encoder } from "@/components/tools/base64-encoder";
import { UuidGenerator } from "@/components/tools/uuid-generator";

/**
 * Maps a published tool slug to its interactive client-side implementation.
 * Every entry here is a fully working tool — there is no placeholder state.
 */
const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "json-to-typescript": JsonToTypescript,
  "base64-encoder": Base64Encoder,
  "uuid-generator": UuidGenerator,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = TOOL_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
