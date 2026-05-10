import { getState, onStateChanged, type State } from "../lib/storage";
import { resolveTheme } from "../lib/theme/resolve";
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

  const theme = resolveTheme(state.presetId, state.customColors);
  if (!theme) {
    root.removeAttribute(ACTIVE_ATTR);
    clearTheme();
    return;
  }

  root.setAttribute(ACTIVE_ATTR, "1");
  applyTheme(theme, PREFIX);
  applyDynamicOverrides(detectAtomicOverrides(PREFIX, theme.colors));
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
