import assert from "node:assert/strict";
import { formatJson, SAMPLE_JSON } from "../lib/jsonFormatter.ts";
import { encodeBase64, decodeBase64 } from "../lib/base64.ts";
import { generateUuidBatch, generateUuidV4 } from "../lib/uuid.ts";
import { jsonToTypescript } from "../lib/jsonToTypescript.ts";

let failures = 0;
function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL  ${name}: ${(error as Error).message}`);
  }
}

console.log("jsonFormatter");
check("pretty prints with 2 spaces", () => {
  const result = formatJson('{"a":1,"b":[1,2]}', { mode: "pretty", indent: 2 });
  assert.equal(result.ok, true);
  assert.equal(result.output, '{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}');
  assert.equal(result.entries, 2);
});
check("minifies", () => {
  const result = formatJson('{ "a" : 1 }', { mode: "minified", indent: 2 });
  assert.equal(result.output, '{"a":1}');
});
check("reports line and column on error", () => {
  const result = formatJson('{\n  "a": 1,\n}', { mode: "pretty", indent: 2 });
  assert.equal(result.ok, false);
  assert.equal(result.line, 3);
  assert.ok(result.column && result.column > 0);
});
check("rejects trailing comma", () => {
  const result = formatJson('{"a":1,}', { mode: "pretty", indent: 2 });
  assert.equal(result.ok, false);
});
check("accepts the sample payload", () => {
  const result = formatJson(SAMPLE_JSON, { mode: "pretty", indent: 4 });
  assert.equal(result.ok, true);
  assert.ok(result.bytes > 0);
});

console.log("base64");
check("encodes ascii text", () => {
  assert.equal(encodeBase64("Hello, StackPulse"), "SGVsbG8sIFN0YWNrUHVsc2U=");
});
check("encodes utf-8 text", () => {
  assert.equal(encodeBase64("ação"), "YcOnw6Nv");
});
check("round-trips utf-8 text", () => {
  const encoded = encodeBase64("StackPulse — ação ✓");
  const decoded = decodeBase64(encoded);
  assert.equal(decoded.ok, true);
  assert.equal(decoded.text, "StackPulse — ação ✓");
});
check("rejects invalid alphabet", () => {
  const decoded = decodeBase64("not*valid*base64");
  assert.equal(decoded.ok, false);
});
check("rejects bad padding length", () => {
  const decoded = decodeBase64("SGVsbG8");
  assert.equal(decoded.ok, false);
});
check("rejects empty input", () => {
  assert.equal(decodeBase64("   ").ok, false);
});

console.log("uuid");
check("generates RFC 4122 v4", () => {
  const uuid = generateUuidV4();
  assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
check("generates a batch of unique ids", () => {
  const batch = generateUuidBatch(50);
  assert.equal(batch.length, 50);
  assert.equal(new Set(batch).size, 50);
});
check("supports uppercase output", () => {
  const batch = generateUuidBatch(3, true);
  assert.ok(batch.every((value) => value === value.toUpperCase()));
});
check("clamps the batch size", () => {
  assert.equal(generateUuidBatch(0).length, 1);
  assert.equal(generateUuidBatch(99999).length, 1000);
});

console.log("jsonToTypescript");
check("generates a type alias", () => {
  const result = jsonToTypescript('{"id":1,"tags":["a"]}', { style: "type", indent: 2 });
  assert.equal(result.ok, true);
  assert.ok(result.ok && result.code.includes("id: number"));
  assert.ok(result.ok && result.code.includes("tags: string[]"));
});
check("generates an interface", () => {
  const result = jsonToTypescript('{"id":1}', { style: "interface", indent: 2 });
  assert.ok(result.ok && result.code.startsWith("export interface Root {"));
});
check("quotes non-identifier keys", () => {
  const result = jsonToTypescript('{"payment-status":"ok"}', { style: "type", indent: 2 });
  assert.ok(result.ok && result.code.includes('"payment-status": string'));
});
check("reports invalid json", () => {
  const result = jsonToTypescript("{", { style: "type", indent: 2 });
  assert.equal(result.ok, false);
});

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
