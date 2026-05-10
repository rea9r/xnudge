import { getPresetById } from "../lib/theme/presets";
import { getState, onStateChanged, type State } from "../lib/storage";
import { applyTheme, clearTheme } from "./apply";

function sync(state: State): void {
  if (!state.enabled) {
    clearTheme();
    return;
  }
  const preset = getPresetById(state.presetId);
  if (!preset) {
    clearTheme();
    return;
  }
  applyTheme(preset);
}

void (async () => {
  sync(await getState());
})();

onStateChanged(sync);
