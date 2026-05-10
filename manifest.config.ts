import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json" with { type: "json" };

export default defineManifest({
  manifest_version: 3,
  name: "xnudge",
  version: pkg.version,
  description: "Customize X (Twitter) to your taste.",
  homepage_url: "https://github.com/rea9r/xnudge",
  icons: {
    16: "icons/icon-16.png",
    32: "icons/icon-32.png",
    48: "icons/icon-48.png",
    128: "icons/icon-128.png",
  },
  permissions: ["storage"],
  host_permissions: ["*://*.x.com/*", "*://*.twitter.com/*"],
  action: {
    default_popup: "src/popup/index.html",
    default_title: "xnudge",
    default_icon: {
      16: "icons/icon-16.png",
      32: "icons/icon-32.png",
      48: "icons/icon-48.png",
    },
  },
  content_scripts: [
    {
      matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
      js: ["src/content/main.ts"],
      run_at: "document_start",
    },
  ],
});
