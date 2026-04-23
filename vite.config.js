import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is set for GitHub Pages project site: https://<user>.github.io/ZenKeeper/
// Override with VITE_BASE=/ when deploying to Netlify or a custom domain.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/ZenKeeper/",
  build: {
    // Broad mobile compatibility. Vite's default "modules" target can emit
    // syntax (class private fields, top-level await, etc.) that older Android
    // WebView / Samsung Internet fail to parse — resulting in a blank dark page.
    target: ["es2018", "chrome70", "safari13"],
  },
});
