import {
  classifyBackground,
  classifyBorderColor,
  classifyTextColor,
  type DimMatch,
  type TextMatch,
} from "../lib/theme/classify";
import { darken, parseHex } from "../lib/theme/color";
import type { ThemeColors } from "../lib/theme/types";

export type AtomicRule = {
  selector: string;
  backgroundColor: string;
  color?: string;
  borderColor?: string;
};

const ATOMIC_RE = /^\.r-[a-z0-9]+$/i;
const ATOMIC_HOVER_RE = /^\.r-[a-z0-9]+:hover$/i;

export function buildAtomicOverrides(
  rules: Iterable<AtomicRule>,
  prefix: string,
  colors: ThemeColors,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const rule of rules) {
    const sel = rule.selector;
    if (!ATOMIC_RE.test(sel) && !ATOMIC_HOVER_RE.test(sel)) continue;
    if (seen.has(sel)) continue;

    const decls: string[] = [];

    if (rule.backgroundColor) {
      const bgMatch = classifyBackground(rule.backgroundColor);
      if (bgMatch) {
        decls.push(
          `background-color: ${resolveBgColor(bgMatch, colors)} !important`,
        );
      }
    }

    if (rule.color) {
      const txMatch = classifyTextColor(rule.color);
      if (txMatch) {
        decls.push(`color: ${resolveTextColor(txMatch, colors)} !important`);
      }
    }

    if (rule.borderColor && classifyBorderColor(rule.borderColor)) {
      decls.push(`border-color: ${colors.border} !important`);
    }

    if (decls.length === 0) continue;
    out.push(`${prefix} ${sel} { ${decls.join("; ")}; }`);
    seen.add(sel);
  }
  return out;
}

export function scanStylesheets(): AtomicRule[] {
  const result: AtomicRule[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let cssRules: CSSRuleList | undefined;
    try {
      cssRules = sheet.cssRules;
    } catch {
      continue;
    }
    if (!cssRules) continue;
    for (const rule of Array.from(cssRules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      const bg = rule.style.backgroundColor;
      const color = rule.style.color;
      const borderColor = readBorderColor(rule.style);
      if (!bg && !color && !borderColor) continue;
      result.push({
        selector: rule.selectorText,
        backgroundColor: bg,
        color,
        borderColor,
      });
    }
  }
  return result;
}

/**
 * Reads a single representative border color from a rule. Longhands come first
 * because they always hold a single value; X frequently sets only
 * `border-bottom-color` on dividers, while boxes use the `border` shorthand.
 */
function readBorderColor(style: CSSStyleDeclaration): string {
  return (
    style.borderTopColor ||
    style.borderRightColor ||
    style.borderBottomColor ||
    style.borderLeftColor ||
    style.borderColor ||
    ""
  );
}

export function detectAtomicOverrides(
  prefix: string,
  colors: ThemeColors,
): string {
  return buildAtomicOverrides(scanStylesheets(), prefix, colors).join("\n");
}

function resolveBgColor(match: DimMatch, colors: ThemeColors): string {
  switch (match.kind) {
    case "navy":
      return colors.background;
    case "gray0":
      return colors.modal;
    case "gray100":
      return colors.border;
    case "navy-translucent":
      return rgbaFromHex(colors.background, match.alpha ?? 1);
    case "button":
      return colors.buttonBg;
    case "button-hover":
      return darken(colors.buttonBg, 0.1);
    case "link-hover":
      return darken(colors.link, 0.1);
  }
}

function resolveTextColor(match: TextMatch, colors: ThemeColors): string {
  switch (match.kind) {
    case "primary":
      return colors.text;
    case "muted":
      return colors.textMuted;
    case "on-button":
      return colors.buttonText;
  }
}

function rgbaFromHex(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
