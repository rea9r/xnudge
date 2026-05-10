export type DimKind = "navy" | "gray0" | "gray100" | "navy-translucent";

export type DimMatch = {
  kind: DimKind;
  color: string;
};

export const DIM_NAVY = "#15202B";
export const DIM_GRAY0 = "#1F2833";
export const DIM_GRAY100 = "#38444D";

const RGB_RE =
  /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i;

type Rgb = { r: number; g: number; b: number; a: number };

function parseRgb(input: string): Rgb | null {
  const match = RGB_RE.exec(input.trim());
  if (!match) return null;
  return {
    r: parseInt(match[1]!, 10),
    g: parseInt(match[2]!, 10),
    b: parseInt(match[3]!, 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
}

export function classifyBackground(input: string): DimMatch | null {
  const rgb = parseRgb(input);
  if (!rgb) return null;
  const { r, g, b, a } = rgb;

  if (a < 1) {
    if (a < 0.25) return null;
    if (r < 50 && g < 55 && b < 60) {
      return { kind: "navy-translucent", color: `rgba(21, 32, 43, ${a})` };
    }
    return null;
  }

  if (r + g + b < 15) return { kind: "navy", color: DIM_NAVY };
  if (r < 25 && g < 30 && b < 35) return { kind: "navy", color: DIM_NAVY };
  if (r < 35 && g < 40 && b < 45) return { kind: "gray0", color: DIM_GRAY0 };
  if (r < 50 && g < 55 && b < 60) return { kind: "gray100", color: DIM_GRAY100 };
  return null;
}
