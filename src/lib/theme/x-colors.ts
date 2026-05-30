export type RgbTuple = readonly [number, number, number];

export const X_PRIMARY_TEXT: RgbTuple = [231, 233, 234];
export const X_MUTED_TEXT: RgbTuple = [113, 118, 123];
export const X_ON_BUTTON_TEXT: RgbTuple = [15, 20, 25];
export const X_BUTTON_BG: RgbTuple = [239, 243, 244];
export const X_BUTTON_BG_HOVER: RgbTuple = [215, 219, 220];
export const X_BRAND_BLUE: RgbTuple = [29, 155, 240];
export const X_BRAND_BLUE_HOVER: RgbTuple = [26, 140, 216];

export function rgbCss([r, g, b]: RgbTuple): string {
  return `rgb(${r}, ${g}, ${b})`;
}
