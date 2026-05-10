import { describe, expect, it } from "vitest";
import { getPresetById, presets } from "./presets";
import { themeToCss } from "./render";

describe("presets", () => {
  it("includes the default preset", () => {
    expect(getPresetById("dim-navy")).toBeDefined();
  });

  it("returns undefined for unknown ids", () => {
    expect(getPresetById("not-a-preset")).toBeUndefined();
  });

  it("has unique ids", () => {
    const ids = presets.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("renders each preset without throwing", () => {
    for (const preset of presets) {
      expect(() => themeToCss(preset)).not.toThrow();
    }
  });
});
