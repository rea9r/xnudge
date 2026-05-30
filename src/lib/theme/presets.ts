import type { Preset } from "./types";

export const dimNavy: Preset = {
  id: "dim-navy",
  label: "Dim navy",
  description: "The classic dim navy palette.",
  colors: {
    background: "#15202B",
    modal: "#22303C",
    border: "#38444D",
    text: "#E7EDF5",
    textMuted: "#8B98A5",
    link: "#1D9BF0",
    buttonBg: "#EFF3F4",
    buttonText: "#0F1419",
  },
};

export const lightsOut: Preset = {
  id: "lights-out",
  label: "Lights Out",
  description: "Pure black, OLED-friendly.",
  colors: {
    background: "#000000",
    modal: "#16181C",
    border: "#2F3336",
    text: "#E7E9EA",
    textMuted: "#71767B",
    link: "#1D9BF0",
    buttonBg: "#EFF3F4",
    buttonText: "#0F1419",
  },
};

export const sepia: Preset = {
  id: "sepia",
  label: "Sepia",
  description: "Warm cream, easy on the eyes.",
  colors: {
    background: "#F5EBDC",
    modal: "#FBF4E8",
    border: "#D4C4A8",
    text: "#2B2520",
    textMuted: "#8B7E68",
    link: "#CB6D4F",
    buttonBg: "#CB6D4F",
    buttonText: "#FFFFFF",
  },
};

export const forest: Preset = {
  id: "forest",
  label: "Forest",
  description: "Deep green, nature-inspired.",
  colors: {
    background: "#1B2A20",
    modal: "#243832",
    border: "#3A4F3F",
    text: "#DCE8DA",
    textMuted: "#8FA38F",
    link: "#7FB069",
    buttonBg: "#DCE8DA",
    buttonText: "#1B2A20",
  },
};

export const lavender: Preset = {
  id: "lavender",
  label: "Lavender",
  description: "Soft purple on white.",
  colors: {
    background: "#FFFFFF",
    modal: "#F4F1FB",
    border: "#E3DEF0",
    text: "#2A2440",
    textMuted: "#7A7390",
    link: "#7C5CFF",
    buttonBg: "#7C5CFF",
    buttonText: "#FFFFFF",
  },
};

export const frost: Preset = {
  id: "frost",
  label: "Frost",
  description: "Cool blue on crisp white.",
  colors: {
    background: "#FFFFFF",
    modal: "#FBFBFC",
    border: "#EDEEF0",
    text: "#16181C",
    textMuted: "#5B6B7A",
    link: "#5BB8D4",
    buttonBg: "#CDD3D9",
    buttonText: "#16181C",
  },
};

export const presets: readonly Preset[] = [
  dimNavy,
  lightsOut,
  sepia,
  forest,
  lavender,
  frost,
];

export function getPresetById(id: string): Preset | undefined {
  return presets.find((preset) => preset.id === id);
}
