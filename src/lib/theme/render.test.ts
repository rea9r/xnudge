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

  it("includes the search box wrapper selector", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[data-testid="SearchBox_Search_Input_Wrapper"]');
  });

  it("scopes everything under the supplied prefix", () => {
    const css = themeToCss(dimNavy, 'html[data-xnudge-active="1"]');
    expect(css.startsWith('html[data-xnudge-active="1"] {')).toBe(true);
    expect(css).toContain('html[data-xnudge-active="1"] body');
    expect(css).toContain('html[data-xnudge-active="1"] [role="dialog"]');
    expect(css).not.toMatch(/^html \{/m);
  });

  it("recolors links with the link color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain("a,");
    expect(css).toContain("a:visited,");
    expect(css).toContain('[role="link"]');
    expect(css).toMatch(/color:\s*#1D9BF0\s*!important/i);
  });

  it("repaints cell separators with the border color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[data-testid="cellInnerDiv"] > div');
    expect(css).toMatch(/border-color:\s*#38444D\s*!important/i);
  });

  it("preserves X's inline color on links (e.g. user names)", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('a[style^="color:"]');
    expect(css).toContain('a[style*=" color:"]');
    expect(css).toContain('[role="link"][style^="color:"]');
    expect(css).toContain('[role="link"][style*=" color:"]');
    expect(css).toMatch(/color:\s*inherit\s*!important/i);
  });

  it("recolors X-blue inline links (hashtags, mentions) with the link color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('a[style*="rgb(29, 155, 240)"]');
    expect(css).toContain('[role="link"][style*="rgb(29, 155, 240)"]');
  });
});
