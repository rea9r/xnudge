# Store description

Drafts for the Chrome Web Store listing.

## Title (max 75 chars)

xnudge — Theme overrides for X (Twitter)

## Short description (max 132 chars)

Customize X (Twitter) with curated theme overrides. Lightweight, private, resilient to UI changes.

## Detailed description

xnudge nudges X (Twitter) into a more comfortable look by overriding its theme through curated presets.

**Features**

- One-click toggle from the toolbar popup.
- Curated presets — Dim navy (the classic), Lights Out (pure black, OLED-friendly), Sepia (warm cream), Forest (deep green).
- Dynamic detection that follows X's frequent UI changes, so the theme keeps up when X renames or restyles its components.
- No accounts, no tracking, no servers — settings stay in your browser via Chrome's storage.sync.

**How it works**

xnudge injects a stylesheet into x.com (and twitter.com) that overrides background, modal, border, text, and link colors using the active preset. It also scans the page's stylesheets on load and as the DOM evolves, applying matching overrides to dynamically-named classes.

**Privacy**

xnudge does not collect, store, or transmit any personal information. It only stores your theme preference using Chrome's storage.sync API.

Full privacy policy: https://github.com/rea9r/xnudge/blob/main/PRIVACY_POLICY.md

**Permissions**

- `storage`: to remember your theme preference.
- Host permissions on `x.com` and `twitter.com`: to inject the theme stylesheet.

**Source code**

xnudge is open source: https://github.com/rea9r/xnudge
