import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

// Library build. Storybook uses its own builder and ignores this `build` config,
// but reuses the `plugins` (react + tailwind) via viteFinal.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["src"], exclude: ["**/*.stories.tsx"], rollupTypes: false }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
      ],
      output: {
        assetFileNames: "[name][extname]",
      },
    },
  },
});
