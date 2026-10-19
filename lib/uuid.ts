const HEX: string[] = [];

for (let i = 0; i < 256; i += 1) {
  HEX.push((i + 0x100).toString(16).slice(1));
}

/**
 * Builds an RFC 4122 version 4 UUID from the browser's cryptographically
 * secure random source.
 */
export function generateUuidV4(): string {
  const cryptoApi = globalThis.crypto;
  if (!cryptoApi) {
    throw new Error("This browser does not expose the Web Crypto API.");
  }

  if (typeof cryptoApi.randomUUID === "function") {
    return cryptoApi.randomUUID();
  }

  const bytes = new Uint8Array(16);
  cryptoApi.getRandomValues(bytes);

  // Version 4 + RFC 4122 variant.
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex: string[] = [];
  for (let i = 0; i < 16; i += 1) {
    hex.push(HEX[bytes[i]]);
  }

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export function generateUuidBatch(count: number, uppercase = false): string[] {
  const total = Math.max(1, Math.min(1000, Math.floor(count)));
  const values: string[] = [];

  for (let i = 0; i < total; i += 1) {
    const uuid = generateUuidV4();
    values.push(uppercase ? uuid.toUpperCase() : uuid);
  }

  return values;
}
