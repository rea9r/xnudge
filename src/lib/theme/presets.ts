import type { Preset } from "./types";

export const dimNavy: Preset = {
  id: "dim-navy",
  label: "Dim navy",
  description: "The classic dim navy palette.",
  colors: {
    background: "#15202B",
    modal: "#15202B",
    border: "#38444D",
    text: "#E7EDF5",
    link: "#1D9BF0",
  },
};

export const presets: readonly Preset[] = [dimNavy];

export function getPresetById(id: string): Preset | undefined {
  return presets.find((preset) => preset.id === id);
}
