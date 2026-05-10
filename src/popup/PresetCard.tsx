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
      onClick={onSelect}
      data-selected={selected}
    >
      <span className="swatches" aria-hidden="true">
        <span className="swatch" style={{ background }} />
        <span className="swatch" style={{ background: text }} />
        <span className="swatch" style={{ background: link }} />
      </span>
      <span className="preset-text">
        <span className="preset-label">{label}</span>
        {description && (
          <span className="preset-description">{description}</span>
        )}
      </span>
    </button>
  );
}
