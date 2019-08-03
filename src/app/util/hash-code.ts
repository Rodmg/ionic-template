export default function hashCode(code: string): number {
  let hash = 0,
    i,
    chr;
  if (code.length === 0) {
    return hash;
  }
  for (i = 0; i < code.length; i++) {
    chr = code.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hash = (hash << 5) - hash + chr;
    // tslint:disable-next-line:no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
