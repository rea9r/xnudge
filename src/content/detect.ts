import { classifyBackground } from "../lib/theme/classify";

export type AtomicRule = {
  selector: string;
  backgroundColor: string;
};

const ATOMIC_RE = /^\.r-[a-z0-9]+$/i;
const ATOMIC_HOVER_RE = /^\.r-[a-z0-9]+:hover$/i;

export function buildAtomicOverrides(
  rules: Iterable<AtomicRule>,
  prefix: string,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const rule of rules) {
    const sel = rule.selector;
    if (!ATOMIC_RE.test(sel) && !ATOMIC_HOVER_RE.test(sel)) continue;
    if (seen.has(sel)) continue;

    const match = classifyBackground(rule.backgroundColor);
    if (!match) continue;

    out.push(
      `${prefix} ${sel} { background-color: ${match.color} !important; }`,
    );
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
      if (!bg) continue;
      result.push({ selector: rule.selectorText, backgroundColor: bg });
    }
  }
  return result;
}

export function detectAtomicOverrides(prefix: string): string {
  return buildAtomicOverrides(scanStylesheets(), prefix).join("\n");
}
