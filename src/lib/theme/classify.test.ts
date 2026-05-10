import { describe, expect, it } from "vitest";
import { classifyBackground } from "./classify";

describe("classifyBackground", () => {
  it("classifies pure black as navy", () => {
    expect(classifyBackground("rgb(0, 0, 0)")).toEqual({
      kind: "navy",
      color: "#15202B",
    });
  });

  it("classifies very dark colors as navy", () => {
    expect(classifyBackground("rgb(15, 20, 25)")).toEqual({
      kind: "navy",
      color: "#15202B",
    });
  });

  it("classifies dark grays as gray0", () => {
    expect(classifyBackground("rgb(32, 35, 39)")).toEqual({
      kind: "gray0",
      color: "#1F2833",
    });
  });

  it("classifies medium dark grays as gray100", () => {
    expect(classifyBackground("rgb(39, 44, 48)")).toEqual({
      kind: "gray100",
      color: "#38444D",
    });
  });

  it("returns null for light colors", () => {
    expect(classifyBackground("rgb(255, 255, 255)")).toBeNull();
    expect(classifyBackground("rgb(80, 80, 80)")).toBeNull();
  });

  it("classifies dark translucent overlays", () => {
    expect(classifyBackground("rgba(0, 0, 0, 0.65)")).toEqual({
      kind: "navy-translucent",
      color: "rgba(21, 32, 43, 0.65)",
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
    expect(classifyBackground("RGB(0,0,0)")).toEqual({
      kind: "navy",
      color: "#15202B",
    });
    expect(classifyBackground("  rgb( 0 , 0 , 0 )  ")).toEqual({
      kind: "navy",
      color: "#15202B",
    });
  });
});
