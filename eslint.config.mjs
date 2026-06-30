import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design-prototype reference bundle — not part of the app source.
    "project/**",
  ]),
  {
    rules: {
      // Placeholder client logos / textured wells render at known sizes and are
      // stand-ins for licensed assets — plain <img> keeps the markup faithful.
      "@next/next/no-img-element": "off",
      // Copy is editorial and lives in content.ts; allow apostrophes in JSX text.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
