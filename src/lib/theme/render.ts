import { parseHex } from "./color";
import type { Theme } from "./types";
import {
  rgbCss,
  X_BRAND_BLUE,
  X_BUTTON_BG,
  X_MUTED_TEXT,
  X_ON_BUTTON_TEXT,
  X_PRIMARY_TEXT,
} from "./x-colors";

export function hexToHslTriplet(hex: string): string {
  const rgb = parseHex(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      default:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const H = Math.round(h);
  const S = Math.round(s * 100);
  const L = Math.round(l * 100);
  return `${H} ${S}% ${L}%`;
}

export function themeToCss(theme: Theme, prefix = "html"): string {
  const {
    background,
    modal,
    border,
    text,
    textMuted,
    link,
    buttonBg,
    buttonText,
  } = theme.colors;
  const bg = hexToHslTriplet(background);
  const md = hexToHslTriplet(modal);
  const bd = hexToHslTriplet(border);
  const tx = hexToHslTriplet(text);
  const lk = hexToHslTriplet(link);
  return `${prefix} {
  --color-background: ${bg} !important;
  --background: ${bg} !important;
  --popover: ${md} !important;
  --color-nested-border: ${bd} !important;
  --border: ${bd} !important;
  --color-text: ${tx} !important;
  --color-brand: ${lk} !important;
}

${prefix} body,
${prefix} #react-root,
${prefix} main[role="main"],
${prefix} [data-testid="primaryColumn"],
${prefix} [data-testid="primaryColumn"] header,
${prefix} [data-testid="primaryColumn"] section,
${prefix} [data-testid="sidebarColumn"],
${prefix} [data-testid="sidebarColumn"] section,
${prefix} [data-testid="sidebarColumn"] aside,
${prefix} [data-testid="sidebarColumn"] nav,
${prefix} [data-testid="cellInnerDiv"] > div,
${prefix} [data-testid="SearchBox_Search_Input_Wrapper"] {
  background-color: ${background} !important;
}

${prefix} [role="dialog"],
${prefix} [aria-modal="true"] {
  background-color: ${modal} !important;
}

${prefix} body,
${prefix} #react-root {
  color: ${text} !important;
}

${prefix} a,
${prefix} a:visited,
${prefix} [role="link"] {
  color: ${link} !important;
}

${prefix} a[style*=" color:"],
${prefix} a[style^="color:"],
${prefix} [role="link"][style*=" color:"],
${prefix} [role="link"][style^="color:"] {
  color: inherit !important;
}

${prefix} a[style*="${rgbCss(X_BRAND_BLUE)}"],
${prefix} [role="link"][style*="${rgbCss(X_BRAND_BLUE)}"],
${prefix} [style*=" color: ${rgbCss(X_BRAND_BLUE)}"],
${prefix} [style^="color: ${rgbCss(X_BRAND_BLUE)}"] {
  color: ${link} !important;
}

${prefix} [style*=" background-color: ${rgbCss(X_BRAND_BLUE)}"],
${prefix} [style^="background-color: ${rgbCss(X_BRAND_BLUE)}"] {
  background-color: ${link} !important;
}

${prefix} [style*=" color: ${rgbCss(X_PRIMARY_TEXT)}"],
${prefix} [style^="color: ${rgbCss(X_PRIMARY_TEXT)}"] {
  color: ${text} !important;
}

${prefix} [style*=" color: ${rgbCss(X_BUTTON_BG)}"],
${prefix} [style^="color: ${rgbCss(X_BUTTON_BG)}"] {
  color: ${text} !important;
}

${prefix} [style*=" color: ${rgbCss(X_MUTED_TEXT)}"],
${prefix} [style^="color: ${rgbCss(X_MUTED_TEXT)}"] {
  color: ${textMuted} !important;
}

${prefix} [style*=" background-color: ${rgbCss(X_BUTTON_BG)}"],
${prefix} [style^="background-color: ${rgbCss(X_BUTTON_BG)}"] {
  background-color: ${buttonBg} !important;
}

${prefix} [style*=" color: ${rgbCss(X_ON_BUTTON_TEXT)}"],
${prefix} [style^="color: ${rgbCss(X_ON_BUTTON_TEXT)}"] {
  color: ${buttonText} !important;
}

${prefix} [data-testid="cellInnerDiv"] > div {
  border-color: ${border} !important;
}`;
}
