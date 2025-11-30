import { dirname } from "path";
import { fileURLToPath } from "url";
import typescriptEslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      ".turbo/**",
      "dist/**",
    ],
  },
  ...typescriptEslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "prefer-const": "error",
    },
  },
];

export default eslintConfig;
