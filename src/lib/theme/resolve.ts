import { getPresetById } from "./presets";
import type { Theme, ThemeColors } from "./types";

export const CUSTOM_PRESET_ID = "custom";

export function resolveTheme(
  presetId: string,
  customColors: ThemeColors,
): Theme | undefined {
  if (presetId === CUSTOM_PRESET_ID) {
    return { colors: customColors };
  }
  return getPresetById(presetId);
}
