import { useEffect, useState } from "react";
import {
  DEFAULT_STATE,
  getState,
  onStateChanged,
  setState,
} from "../lib/storage";
import { presets } from "../lib/theme/presets";

export function App() {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_STATE.enabled);
  const [presetId, setPresetId] = useState<string>(DEFAULT_STATE.presetId);

  useEffect(() => {
    void getState().then((s) => {
      setEnabled(s.enabled);
      setPresetId(s.presetId);
    });
    return onStateChanged((s) => {
      setEnabled(s.enabled);
      setPresetId(s.presetId);
    });
  }, []);

  const toggle = (): void => {
    const next = !enabled;
    setEnabled(next);
    void setState({ enabled: next });
  };

  const selectPreset = (id: string): void => {
    if (id === presetId) return;
    setPresetId(id);
    void setState({ presetId: id });
  };

  return (
    <main className="popup">
      <header className="header">
        <h1 className="title">xnudge</h1>
        <label className="switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={toggle}
            aria-label={enabled ? "Turn theme off" : "Turn theme on"}
          />
          <span className="switch-track" aria-hidden="true">
            <span className="switch-thumb" />
          </span>
        </label>
      </header>

      <ul
        className="presets"
        role="radiogroup"
        aria-label="Theme preset"
        data-disabled={!enabled}
      >
        {presets.map((preset) => {
          const selected = preset.id === presetId;
          return (
            <li key={preset.id}>
              <button
                type="button"
                className="preset"
                role="radio"
                aria-checked={selected}
                onClick={() => selectPreset(preset.id)}
                data-selected={selected}
              >
                <span className="swatches" aria-hidden="true">
                  <span
                    className="swatch"
                    style={{ background: preset.colors.background }}
                  />
                  <span
                    className="swatch"
                    style={{ background: preset.colors.text }}
                  />
                  <span
                    className="swatch"
                    style={{ background: preset.colors.link }}
                  />
                </span>
                <span className="preset-text">
                  <span className="preset-label">{preset.label}</span>
                  {preset.description && (
                    <span className="preset-description">
                      {preset.description}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
