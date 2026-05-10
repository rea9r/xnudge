import { getState, onStateChanged, type State } from "../lib/storage";
import { getPresetById } from "../lib/theme/presets";
import { applyDynamicOverrides, applyTheme, clearTheme } from "./apply";
import { detectAtomicOverrides } from "./detect";

const ACTIVE_ATTR = "data-xnudge-active";
const PREFIX = `html[${ACTIVE_ATTR}="1"]`;
const MUTATION_DEBOUNCE_MS = 100;

let currentState: State | null = null;
let scheduled = false;
let mutationTimer: number | null = null;

function applyAll(state: State): void {
  const root = document.documentElement;

  if (!state.enabled) {
    root.removeAttribute(ACTIVE_ATTR);
    clearTheme();
    return;
  }

  const preset = getPresetById(state.presetId);
  if (!preset) {
    root.removeAttribute(ACTIVE_ATTR);
    clearTheme();
    return;
  }

  root.setAttribute(ACTIVE_ATTR, "1");
  applyTheme(preset, PREFIX);
  applyDynamicOverrides(detectAtomicOverrides(PREFIX));
}

function schedule(): void {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    if (currentState) applyAll(currentState);
  });
}

void (async () => {
  currentState = await getState();
  schedule();
})();

onStateChanged((next) => {
  currentState = next;
  schedule();
});

const observer = new MutationObserver(() => {
  if (mutationTimer !== null) return;
  mutationTimer = window.setTimeout(() => {
    mutationTimer = null;
    schedule();
  }, MUTATION_DEBOUNCE_MS);
});

observer.observe(document.documentElement, {
  subtree: true,
  childList: true,
});
