export function getUtf8ByteLength(text: string) {
  return new TextEncoder().encode(text).byteLength;
}
