import {
  classifyBackground,
  classifyTextColor,
  type DimMatch,
  type TextMatch,
} from "../lib/theme/classify";
import type { ThemeColors } from "../lib/theme/types";

export type AtomicRule = {
  selector: string;
  backgroundColor: string;
  color?: string;
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
      if (!bg && !color) continue;
      result.push({
        selector: rule.selectorText,
        backgroundColor: bg,
        color,
      });
    }
  }
  return result;
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
  const cleaned = hex.replace(/^#/, "");
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
