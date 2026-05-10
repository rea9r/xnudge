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
- Curated presets — the first ships with a Dim navy palette that restores the classic navy look.
- Dynamic detection that follows X's frequent UI changes, so the theme keeps up when X renames or restyles its components.
- No accounts, no tracking, no servers — settings stay in your browser via Chrome's storage.sync.

**How it works**

xnudge injects a stylesheet into x.com (and twitter.com) that overrides background, modal, link, and border colors using the active preset. It also scans the page's stylesheets on load and as the DOM evolves, applying matching overrides to dynamically-named classes.

**Privacy**

xnudge does not collect, store, or transmit any personal information. It only stores your theme preference using Chrome's storage.sync API.

Full privacy policy: https://github.com/rea9r/xnudge/blob/main/PRIVACY_POLICY.md

**Permissions**

- `storage`: to remember your theme preference.
- Host permissions on `x.com` and `twitter.com`: to inject the theme stylesheet.

**Source code**

xnudge is open source: https://github.com/rea9r/xnudge
