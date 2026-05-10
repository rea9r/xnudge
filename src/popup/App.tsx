import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_STATE,
  getState,
  onStateChanged,
  setState,
} from "../lib/storage";
import { presets } from "../lib/theme/presets";
import { CUSTOM_PRESET_ID } from "../lib/theme/resolve";
import type { ThemeColors } from "../lib/theme/types";

const SAVE_DEBOUNCE_MS = 150;

const COLOR_FIELDS: ReadonlyArray<{ key: keyof ThemeColors; label: string }> = [
  { key: "background", label: "Background" },
  { key: "modal", label: "Modal" },
  { key: "border", label: "Border" },
  { key: "text", label: "Text" },
  { key: "textMuted", label: "Muted text" },
  { key: "link", label: "Link" },
  { key: "buttonBg", label: "Button" },
  { key: "buttonText", label: "Button text" },
];

export function App() {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_STATE.enabled);
  const [presetId, setPresetId] = useState<string>(DEFAULT_STATE.presetId);
  const [customColors, setCustomColors] = useState<ThemeColors>(
    DEFAULT_STATE.customColors,
  );
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    void getState().then((s) => {
      setEnabled(s.enabled);
      setPresetId(s.presetId);
      setCustomColors(s.customColors);
    });
    return onStateChanged((s) => {
      setEnabled(s.enabled);
      setPresetId(s.presetId);
      setCustomColors(s.customColors);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    };
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

  const updateColor = (key: keyof ThemeColors, value: string): void => {
    const next = { ...customColors, [key]: value.toUpperCase() };
    setCustomColors(next);
    if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      saveTimer.current = null;
      void setState({ customColors: next });
    }, SAVE_DEBOUNCE_MS);
  };

  const customSelected = presetId === CUSTOM_PRESET_ID;

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
        <li>
          <button
            type="button"
            className="preset"
            role="radio"
            aria-checked={customSelected}
            onClick={() => selectPreset(CUSTOM_PRESET_ID)}
            data-selected={customSelected}
          >
            <span className="swatches" aria-hidden="true">
              <span
                className="swatch"
                style={{ background: customColors.background }}
              />
              <span
                className="swatch"
                style={{ background: customColors.text }}
              />
              <span
                className="swatch"
                style={{ background: customColors.link }}
              />
            </span>
            <span className="preset-text">
              <span className="preset-label">Custom</span>
              <span className="preset-description">
                Pick your own colors below.
              </span>
            </span>
          </button>
        </li>
      </ul>

      {customSelected && (
        <section className="editor" aria-label="Custom colors">
          {COLOR_FIELDS.map(({ key, label }) => (
            <label key={key} className="editor-row">
              <span className="editor-label">{label}</span>
              <span className="editor-controls">
                <input
                  type="color"
                  value={customColors[key]}
                  onChange={(e) => updateColor(key, e.target.value)}
                  aria-label={label}
                />
                <span className="editor-hex">{customColors[key]}</span>
              </span>
            </label>
          ))}
        </section>
      )}
    </main>
  );
}
