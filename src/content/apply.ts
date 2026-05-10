import { themeToCss } from "../lib/theme/render";
import type { Theme } from "../lib/theme/types";

const STYLE_ID = "xnudge-style";
const DYN_STYLE_ID = "xnudge-style-dyn";

export function applyTheme(theme: Theme, prefix: string): void {
  upsertStyle(STYLE_ID, themeToCss(theme, prefix));
}

export function applyDynamicOverrides(css: string): void {
  if (!css) {
    document.getElementById(DYN_STYLE_ID)?.remove();
    return;
  }
  upsertStyle(DYN_STYLE_ID, css);
}

export function clearTheme(): void {
  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(DYN_STYLE_ID)?.remove();
}

function upsertStyle(id: string, css: string): void {
  let style = document.getElementById(id) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    (document.head ?? document.documentElement).appendChild(style);
  }
  style.textContent = css;
}
