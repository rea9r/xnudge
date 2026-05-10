# Store submission

Answers to Chrome Web Store policy questions: single purpose, permission justifications, category, and privacy practices. Pair with `description.md` for the public listing copy.

## Single purpose

xnudge has one purpose: to override the colors of x.com (Twitter) so the user can read it in a more comfortable theme. Every feature serves that single function.

## Permission justifications

### `storage`

Used to persist the user's theme preference — whether the override is enabled, the active preset, and the custom palette colors. The values stay in Chrome's `storage.sync` and are never sent anywhere.

### Host permission: `*://*.x.com/*`, `*://*.twitter.com/*`

Required to inject the theme stylesheet into x.com and twitter.com pages. Without this permission the extension cannot apply the chosen palette, which is its only purpose.

## Category

Productivity. (The "Themes" category is for browser themes, not page recolor extensions.)

## Privacy practices

- **Data collected**: none.
- **Data sold or shared with third parties**: no.
- **Data used or transferred for purposes unrelated to the item's core functionality**: no.
- **Use of remote code**: no — all code is bundled in the package.

The user's theme preferences (toggle state, active preset, custom palette colors) are stored locally via Chrome's `storage.sync` and never leave the browser except as part of Chrome's own sync.
