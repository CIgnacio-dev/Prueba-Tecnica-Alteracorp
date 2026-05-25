import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
  plugins: [
    tailwindcss(),
  ]
});