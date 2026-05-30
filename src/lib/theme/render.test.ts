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

  it("recolors X-blue inline text (hashtags, mentions, Show more/posts) with the link color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('a[style*="rgb(29, 155, 240)"]');
    expect(css).toContain('[style^="color: rgb(29, 155, 240)"]');
    expect(css).toContain('[style*=" color: rgb(29, 155, 240)"]');
    expect(css).toMatch(
      /\[style\^="color: rgb\(29, 155, 240\)"\] \{\s*color:\s*#1D9BF0\s*!important/i,
    );
  });

  it("paints body and #react-root with the text color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toMatch(
      /html body,\s*html #react-root \{\s*color:\s*#E7EDF5\s*!important/i,
    );
  });

  it("recolors X primary-text inline color with the text color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[style^="color: rgb(231, 233, 234)"]');
    expect(css).toContain('[style*=" color: rgb(231, 233, 234)"]');
    expect(css).toMatch(
      /\[style\^="color: rgb\(231, 233, 234\)"\] \{\s*color:\s*#E7EDF5\s*!important/i,
    );
  });

  it("recolors X muted-text inline color with the textMuted color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[style^="color: rgb(113, 118, 123)"]');
    expect(css).toContain('[style*=" color: rgb(113, 118, 123)"]');
    expect(css).toMatch(
      /\[style\^="color: rgb\(113, 118, 123\)"\] \{\s*color:\s*#8B98A5\s*!important/i,
    );
  });

  it("recolors X button-bg inline color with the buttonBg color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain(
      '[style^="background-color: rgb(239, 243, 244)"]',
    );
    expect(css).toContain(
      '[style*=" background-color: rgb(239, 243, 244)"]',
    );
    expect(css).toMatch(
      /\[style\^="background-color: rgb\(239, 243, 244\)"\] \{\s*background-color:\s*#EFF3F4\s*!important/i,
    );
  });

  it("recolors X on-button text inline color with the buttonText color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[style^="color: rgb(15, 20, 25)"]');
    expect(css).toContain('[style*=" color: rgb(15, 20, 25)"]');
    expect(css).toMatch(
      /\[style\^="color: rgb\(15, 20, 25\)"\] \{\s*color:\s*#0F1419\s*!important/i,
    );
  });

  it("recolors the light button color used as a foreground (icons, outline buttons) with the text color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[style^="color: rgb(239, 243, 244)"]');
    expect(css).toContain('[style*=" color: rgb(239, 243, 244)"]');
    expect(css).toMatch(
      /\[style\^="color: rgb\(239, 243, 244\)"\] \{\s*color:\s*#E7EDF5\s*!important/i,
    );
  });

  it("recolors X-blue button backgrounds (e.g. Subscribe) with the link color", () => {
    const css = themeToCss(dimNavy);
    expect(css).toContain('[style^="background-color: rgb(29, 155, 240)"]');
    expect(css).toContain('[style*=" background-color: rgb(29, 155, 240)"]');
    expect(css).toMatch(
      /\[style\^="background-color: rgb\(29, 155, 240\)"\] \{\s*background-color:\s*#1D9BF0\s*!important/i,
    );
  });
});
