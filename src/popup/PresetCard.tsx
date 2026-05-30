type Props = {
  selected: boolean;
  onSelect: () => void;
  background: string;
  text: string;
  link: string;
  label: string;
  description?: string | undefined;
};

export function PresetCard({
  selected,
  onSelect,
  background,
  text,
  link,
  label,
  description,
}: Props) {
  return (
    <button
      type="button"
      className="preset"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={description}
      onClick={onSelect}
      data-selected={selected}
    >
      <span className="swatches" aria-hidden="true">
        <span className="swatch" style={{ backgroundColor: background }} />
        <span className="swatch" style={{ backgroundColor: text }} />
        <span className="swatch" style={{ backgroundColor: link }} />
      </span>
      <span className="preset-text">
        <span className="preset-label">{label}</span>
        {description && (
          <span className="preset-description">{description}</span>
        )}
      </span>
      <span className="preset-check" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}
