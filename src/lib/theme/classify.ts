import {
  X_BRAND_BLUE,
  X_BRAND_BLUE_HOVER,
  X_BUTTON_BG,
  X_BUTTON_BG_HOVER,
  X_MUTED_TEXT,
  X_ON_BUTTON_TEXT,
  X_PRIMARY_TEXT,
  type RgbTuple,
} from "./x-colors";

export type DimKind =
  | "navy"
  | "gray0"
  | "gray100"
  | "navy-translucent"
  | "button"
  | "button-hover"
  | "link-hover"
  | "brand";

export type DimMatch = {
  kind: DimKind;
  /** Original alpha, present only for translucent matches. */
  alpha?: number;
};

export type TextKind = "primary" | "muted" | "on-button";

export type TextMatch = {
  kind: TextKind;
};

export type BorderMatch = {
  kind: "border";
};

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

function matchesRgb(rgb: Rgb, [r, g, b]: RgbTuple): boolean {
  return rgb.r === r && rgb.g === g && rgb.b === b;
}

export function classifyBackground(input: string): DimMatch | null {
  const rgb = parseRgb(input);
  if (!rgb) return null;
  const { r, g, b, a } = rgb;

  if (a < 1) {
    if (a < 0.25) return null;
    if (r < 50 && g < 55 && b < 60) {
      return { kind: "navy-translucent", alpha: a };
    }
    return null;
  }

  if (r + g + b < 15) return { kind: "navy" };
  if (r < 25 && g < 30 && b < 35) return { kind: "navy" };
  if (r < 35 && g < 40 && b < 45) return { kind: "gray0" };
  if (r < 50 && g < 55 && b < 60) return { kind: "gray100" };
  if (matchesRgb(rgb, X_BUTTON_BG)) return { kind: "button" };
  if (matchesRgb(rgb, X_BUTTON_BG_HOVER)) return { kind: "button-hover" };
  if (matchesRgb(rgb, X_BRAND_BLUE)) return { kind: "brand" };
  if (matchesRgb(rgb, X_BRAND_BLUE_HOVER)) return { kind: "link-hover" };
  return null;
}

export function classifyTextColor(input: string): TextMatch | null {
  const rgb = parseRgb(input);
  if (!rgb) return null;
  if (rgb.a < 1) return null;
  if (matchesRgb(rgb, X_PRIMARY_TEXT)) return { kind: "primary" };
  if (matchesRgb(rgb, X_MUTED_TEXT)) return { kind: "muted" };
  if (matchesRgb(rgb, X_ON_BUTTON_TEXT)) return { kind: "on-button" };
  return null;
}

export function classifyBorderColor(input: string): BorderMatch | null {
  const rgb = parseRgb(input);
  if (!rgb) return null;
  if (rgb.a < 1) return null;
  const { r, g, b } = rgb;
  // X's dark-theme dividers and module borders are low-saturation greys in the
  // ~#2F3336 (47,51,54) to ~#38444D (56,68,77) band. Match that band so the
  // border follows the active preset. Pure black is skipped (it's the universal
  // `border: 0 solid black` reset), and lighter or saturated colors are left alone.
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (min < 30 || max > 95) return null;
  if (max - min > 35) return null;
  return { kind: "border" };
}
