import { themeToCss } from "../lib/theme/render";
import type { Theme } from "../lib/theme/types";

const STYLE_ID = "xnudge-style";

export function applyTheme(theme: Theme): void {
  const css = themeToCss(theme);
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    (document.head ?? document.documentElement).appendChild(style);
  }
  style.textContent = css;
}

export function clearTheme(): void {
  document.getElementById(STYLE_ID)?.remove();
}
