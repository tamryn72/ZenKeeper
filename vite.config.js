import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is set for GitHub Pages project site: https://<user>.github.io/ZenKeeper/
// Override with VITE_BASE=/ when deploying to Netlify or a custom domain.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? "/ZenKeeper/",
});
