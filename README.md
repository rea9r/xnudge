# xnudge

Chrome extension to nudge X (Twitter) into a more comfortable look.

## What it does

- **Theme overrides** — bring back the navy "Dim" feel, or pick your own colors for background, modals, borders, text, and links.
- **Presets** — built-in palettes (legacy Dim navy, true black, custom) so you don't re-pick five colors every time.
- **Resilient to UI changes** — keeps working when X tweaks its layout, instead of breaking on every release.

## Development

```bash
npm install
npm run dev       # Vite dev server with HMR via @crxjs/vite-plugin
npm run build     # production build to dist/
npm run typecheck
npm run lint
npm run format
```

### Loading the unpacked extension

1. Run `npm run build` (or `npm run dev`).
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select the `dist/` folder.

## License

TBD.
