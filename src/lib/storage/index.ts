import { dimNavy } from "../theme/presets";
import type { ThemeColors } from "../theme/types";

export type State = {
  enabled: boolean;
  presetId: string;
  customColors: ThemeColors;
};

export const DEFAULT_STATE: State = {
  enabled: true,
  presetId: "dim-navy",
  customColors: { ...dimNavy.colors },
};

const KEY = "state";

function merge(stored: Partial<State> | undefined): State {
  return {
    ...DEFAULT_STATE,
    ...stored,
    customColors: {
      ...DEFAULT_STATE.customColors,
      ...(stored?.customColors ?? {}),
    },
  };
}

export async function getState(): Promise<State> {
  const result = await chrome.storage.sync.get(KEY);
  const stored = result[KEY] as Partial<State> | undefined;
  return merge(stored);
}

export async function setState(patch: Partial<State>): Promise<void> {
  const current = await getState();
  await chrome.storage.sync.set({ [KEY]: { ...current, ...patch } });
}

export function onStateChanged(listener: (state: State) => void): () => void {
  const handler = (
    changes: { [key: string]: chrome.storage.StorageChange },
    area: string,
  ): void => {
    if (area !== "sync") return;
    if (!(KEY in changes)) return;
    const newValue = changes[KEY]?.newValue as Partial<State> | undefined;
    listener(merge(newValue));
  };
  chrome.storage.onChanged.addListener(handler);
  return () => chrome.storage.onChanged.removeListener(handler);
}
