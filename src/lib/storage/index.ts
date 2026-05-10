export type State = {
  enabled: boolean;
  presetId: string;
};

export const DEFAULT_STATE: State = {
  enabled: true,
  presetId: "dim-navy",
};

const KEY = "state";

export async function getState(): Promise<State> {
  const result = await chrome.storage.sync.get(KEY);
  const stored = result[KEY] as Partial<State> | undefined;
  return { ...DEFAULT_STATE, ...stored };
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
    listener({ ...DEFAULT_STATE, ...newValue });
  };
  chrome.storage.onChanged.addListener(handler);
  return () => chrome.storage.onChanged.removeListener(handler);
}
