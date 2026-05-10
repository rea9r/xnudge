import { describe, expect, it } from "vitest";
import { dimNavy } from "./presets";
import { hexToHslTriplet, themeToCss } from "./render";

describe("hexToHslTriplet", () => {
  it("converts white", () => {
    expect(hexToHslTriplet("#FFFFFF")).toBe("0 0% 100%");
  });

  it("converts black", () => {
    expect(hexToHslTriplet("#000000")).toBe("0 0% 0%");
  });

  it("converts dim navy to its HSL triplet", () => {
    expect(hexToHslTriplet("#15202B")).toBe("210 34% 13%");
  });

  it("accepts lowercase hex", () => {
    expect(hexToHslTriplet("#15202b")).toBe("210 34% 13%");
  });

  it("accepts hex without leading hash", () => {
    expect(hexToHslTriplet("15202B")).toBe("210 34% 13%");
  });

  it("throws on invalid input", () => {
    expect(() => hexToHslTriplet("not-a-color")).toThrow();
    expect(() => hexToHslTriplet("#FFF")).toThrow();
  });
});

describe("themeToCss", () => {
  it("emits HSL triplets for each color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain("210 34% 13%");
    expect(css).toContain("--color-background");
    expect(css).toContain("--color-text");
    expect(css).toContain("--color-brand");
  });

  it("uses !important to win over X's stylesheet", () => {
    const css = themeToCss(dimNavy);
    const importantCount = (css.match(/!important/g) ?? []).length;
    expect(importantCount).toBeGreaterThanOrEqual(5);
  });

  it("scopes overrides to html", () => {
    const css = themeToCss(dimNavy);
    expect(css.startsWith("html {")).toBe(true);
  });

  it("paints structural surfaces with the background color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain("body,");
    expect(css).toContain("#react-root");
    expect(css).toContain('[data-testid="primaryColumn"]');
    expect(css).toContain('[data-testid="primaryColumn"] header');
    expect(css).toContain('[data-testid="primaryColumn"] section');
    expect(css).toContain('[data-testid="sidebarColumn"]');
    expect(css).toContain('[data-testid="sidebarColumn"] section');
    expect(css).toContain('[data-testid="sidebarColumn"] aside');
    expect(css).toContain('[data-testid="sidebarColumn"] nav');
    expect(css).toContain('[data-testid="cellInnerDiv"] > div');
    expect(css).toMatch(/background-color:\s*#15202B\s*!important/i);
  });

  it("paints dialog surfaces with the modal color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[role="dialog"]');
    expect(css).toContain('[aria-modal="true"]');
  });
});
