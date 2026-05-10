import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json" with { type: "json" };

export default defineManifest({
  manifest_version: 3,
  name: "xnudge",
  version: pkg.version,
  description: "Customize X (Twitter) to your taste.",
  permissions: ["storage"],
  host_permissions: ["*://*.x.com/*", "*://*.twitter.com/*"],
  action: {
    default_popup: "src/popup/index.html",
    default_title: "xnudge",
  },
  content_scripts: [
    {
      matches: ["*://*.x.com/*", "*://*.twitter.com/*"],
      js: ["src/content/main.ts"],
      run_at: "document_start",
    },
  ],
});
