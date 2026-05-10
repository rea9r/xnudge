import { useEffect, useState } from "react";
import {
  DEFAULT_STATE,
  getState,
  onStateChanged,
  setState,
} from "../lib/storage";

export function App() {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_STATE.enabled);

  useEffect(() => {
    void getState().then((s) => setEnabled(s.enabled));
    return onStateChanged((s) => setEnabled(s.enabled));
  }, []);

  const toggle = (): void => {
    const next = !enabled;
    setEnabled(next);
    void setState({ enabled: next });
  };

  return (
    <main className="popup">
      <h1 className="title">xnudge</h1>
      <p className="hint">Nudge X into a more comfortable look.</p>
      <button
        type="button"
        className="toggle"
        onClick={toggle}
        aria-pressed={enabled}
      >
        <span className="toggle-label">Theme</span>
        <span className="toggle-state">{enabled ? "On" : "Off"}</span>
      </button>
    </main>
  );
}
