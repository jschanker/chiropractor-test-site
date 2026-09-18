import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to GitHub Pages with a project name repository, set base: '/your-repo-name/'
  // For Cloudflare Pages or custom domains, base: '/' works out of the box.
  base: "/",
});
