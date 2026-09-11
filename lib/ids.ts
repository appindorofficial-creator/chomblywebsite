/**
 * Central identifier strategy for browser, edge and server runtimes.
 *
 * We deliberately rely on Web Crypto entropy and do not use Math.random. Some
 * embedded browsers expose getRandomValues without implementing randomUUID,
 * which is why UUID formatting lives here instead of calling randomUUID.
 */
export type SecureRandomSource = Pick<Crypto, "getRandomValues">;

function cryptoSource(source?: SecureRandomSource): SecureRandomSource {
  const candidate = source ?? globalThis.crypto;
  if (!candidate || typeof candidate.getRandomValues !== "function") {
    throw new Error("SECURE_RANDOM_UNAVAILABLE");
  }
  return candidate;
}

export function secureUuidV4(source?: SecureRandomSource): string {
  const bytes = new Uint8Array(16);
  cryptoSource(source).getRandomValues(bytes);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export const createClientId = secureUuidV4;
export const createServerId = secureUuidV4;
export const createIdempotencyKey = secureUuidV4;

