export interface Base64DecodeResult {
  ok: boolean;
  text: string;
  error?: string;
  /** True when the decoded bytes are not valid UTF-8 text. */
  binary: boolean;
}

export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export function decodeBase64(input: string): Base64DecodeResult {
  const compact = input.replace(/\s+/g, "");
  if (!compact) {
    return { ok: false, text: "", error: "Waiting for input", binary: false };
  }

  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(compact)) {
    return {
      ok: false,
      text: "",
      error: "Invalid Base64: the input contains characters outside the Base64 alphabet.",
      binary: false,
    };
  }

  if (compact.length % 4 !== 0) {
    return {
      ok: false,
      text: "",
      error: "Invalid Base64: the length is not a multiple of 4 (padding is missing).",
      binary: false,
    };
  }

  let binary: string;
  try {
    binary = atob(compact);
  } catch {
    return {
      ok: false,
      text: "",
      error: "Invalid Base64: the padding does not match the payload.",
      binary: false,
    };
  }

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, text, binary: false };
  } catch {
    // The payload is not valid UTF-8: surface the raw bytes as latin-1 so the
    // user can still inspect the content.
    const text = new TextDecoder("latin1").decode(bytes);
    return { ok: true, text, binary: true };
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read the selected file."));
        return;
      }
      // Strip the `data:<mime>;base64,` prefix produced by FileReader.
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(file);
  });
}
