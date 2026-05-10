import { describe, expect, it } from "vitest";
import { dimNavy, sepia } from "./presets";
import { CUSTOM_PRESET_ID, resolveTheme } from "./resolve";
import type { ThemeColors } from "./types";

const customColors: ThemeColors = {
  background: "#101010",
  modal: "#202020",
  border: "#303030",
  text: "#FAFAFA",
  textMuted: "#999999",
  link: "#FF0080",
  buttonBg: "#FAFAFA",
  buttonText: "#101010",
};

describe("resolveTheme", () => {
  it("returns the matching built-in preset's colors", () => {
    expect(resolveTheme("dim-navy", customColors)?.colors).toEqual(
      dimNavy.colors,
    );
    expect(resolveTheme("sepia", customColors)?.colors).toEqual(sepia.colors);
  });

  it("returns customColors when presetId is custom", () => {
    expect(resolveTheme(CUSTOM_PRESET_ID, customColors)?.colors).toEqual(
      customColors,
    );
  });

  it("returns undefined for unknown preset ids", () => {
    expect(resolveTheme("nope", customColors)).toBeUndefined();
  });
});
