const HEX_RE = /^#?([0-9a-fA-F]{6})$/;

export type Rgb = { r: number; g: number; b: number };

export function parseHex(hex: string): Rgb {
  const match = HEX_RE.exec(hex.trim());
  if (!match) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const digits = match[1]!;
  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
}
