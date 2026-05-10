import type { Theme } from "./types";

const HEX_RE = /^#?([0-9a-fA-F]{6})$/;

export function hexToHslTriplet(hex: string): string {
  const match = HEX_RE.exec(hex.trim());
  if (!match) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const digits = match[1]!;
  const r = parseInt(digits.slice(0, 2), 16) / 255;
  const g = parseInt(digits.slice(2, 4), 16) / 255;
  const b = parseInt(digits.slice(4, 6), 16) / 255;

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

export function themeToCss(theme: Theme): string {
  const { background, modal, border, text, link } = theme.colors;
  const bg = hexToHslTriplet(background);
  const md = hexToHslTriplet(modal);
  const bd = hexToHslTriplet(border);
  const tx = hexToHslTriplet(text);
  const lk = hexToHslTriplet(link);
  return `html {
  --color-background: ${bg} !important;
  --background: ${bg} !important;
  --popover: ${md} !important;
  --color-nested-border: ${bd} !important;
  --border: ${bd} !important;
  --color-text: ${tx} !important;
  --color-brand: ${lk} !important;
}

body,
#react-root,
main[role="main"],
[data-testid="primaryColumn"],
[data-testid="primaryColumn"] header,
[data-testid="primaryColumn"] section,
[data-testid="sidebarColumn"],
[data-testid="sidebarColumn"] section,
[data-testid="sidebarColumn"] aside,
[data-testid="sidebarColumn"] nav,
[data-testid="cellInnerDiv"] > div {
  background-color: ${background} !important;
}

[role="dialog"],
[aria-modal="true"] {
  background-color: ${modal} !important;
}`;
}
