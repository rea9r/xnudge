import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import zipPack from "vite-plugin-zip-pack";
import manifest from "./manifest.config";

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    zipPack({ inDir: "dist", outDir: ".", outFileName: "xnudge.zip" }),
  ],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    hmr: {
      host: "localhost",
      port: 5173,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
