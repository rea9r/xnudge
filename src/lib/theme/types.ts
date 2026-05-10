export type ThemeColors = {
  background: string;
  modal: string;
  border: string;
  text: string;
  link: string;
};

export type Theme = {
  colors: ThemeColors;
};

export type Preset = Theme & {
  id: string;
  label: string;
  description?: string;
};
