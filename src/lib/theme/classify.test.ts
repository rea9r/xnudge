import { describe, expect, it } from "vitest";
import { classifyBackground, classifyTextColor } from "./classify";

describe("classifyBackground", () => {
  it("classifies pure black as navy", () => {
    expect(classifyBackground("rgb(0, 0, 0)")).toEqual({ kind: "navy" });
  });

  it("classifies very dark colors as navy", () => {
    expect(classifyBackground("rgb(15, 20, 25)")).toEqual({ kind: "navy" });
  });

  it("classifies dark grays as gray0", () => {
    expect(classifyBackground("rgb(32, 35, 39)")).toEqual({ kind: "gray0" });
  });

  it("classifies medium dark grays as gray100", () => {
    expect(classifyBackground("rgb(39, 44, 48)")).toEqual({ kind: "gray100" });
  });

  it("classifies X primary-button background as button", () => {
    expect(classifyBackground("rgb(239, 243, 244)")).toEqual({
      kind: "button",
    });
  });

  it("returns null for unrecognized light colors", () => {
    expect(classifyBackground("rgb(255, 255, 255)")).toBeNull();
    expect(classifyBackground("rgb(80, 80, 80)")).toBeNull();
  });

  it("classifies dark translucent overlays with alpha preserved", () => {
    expect(classifyBackground("rgba(0, 0, 0, 0.65)")).toEqual({
      kind: "navy-translucent",
      alpha: 0.65,
    });
  });

  it("ignores translucent overlays below alpha 0.25", () => {
    expect(classifyBackground("rgba(0, 0, 0, 0.1)")).toBeNull();
  });

  it("ignores translucent overlays on light colors", () => {
    expect(classifyBackground("rgba(255, 255, 255, 0.5)")).toBeNull();
  });

  it("returns null for unparseable input", () => {
    expect(classifyBackground("transparent")).toBeNull();
    expect(classifyBackground("")).toBeNull();
    expect(classifyBackground("#000000")).toBeNull();
  });

  it("accepts whitespace and case variations", () => {
    expect(classifyBackground("RGB(0,0,0)")).toEqual({ kind: "navy" });
    expect(classifyBackground("  rgb( 0 , 0 , 0 )  ")).toEqual({
      kind: "navy",
    });
  });
});

describe("classifyTextColor", () => {
  it("classifies X primary text rgb as primary", () => {
    expect(classifyTextColor("rgb(231, 233, 234)")).toEqual({
      kind: "primary",
    });
  });

  it("classifies X muted text rgb as muted", () => {
    expect(classifyTextColor("rgb(113, 118, 123)")).toEqual({ kind: "muted" });
  });

  it("classifies X on-button text rgb as on-button", () => {
    expect(classifyTextColor("rgb(15, 20, 25)")).toEqual({ kind: "on-button" });
  });

  it("returns null for unrecognized colors", () => {
    expect(classifyTextColor("rgb(0, 0, 0)")).toBeNull();
    expect(classifyTextColor("rgb(255, 255, 255)")).toBeNull();
    expect(classifyTextColor("rgb(232, 233, 234)")).toBeNull();
  });

  it("returns null for translucent values", () => {
    expect(classifyTextColor("rgba(231, 233, 234, 0.5)")).toBeNull();
  });

  it("returns null for unparseable input", () => {
    expect(classifyTextColor("inherit")).toBeNull();
    expect(classifyTextColor("")).toBeNull();
    expect(classifyTextColor("#E7E9EA")).toBeNull();
  });
});
