import eslint from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import next from "@next/eslint-plugin-next";
import { fixupConfigRules } from "@eslint/compat";
import tsEslint from "typescript-eslint";
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
});

const tsConfig = (
  tsEslint.configs.strict
);

const nextConfig = (
  fixupConfigRules(
    (compat.config(next.configs["core-web-vitals"])),
  )
);

export default [
  ...tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    prettierRecommended,
    {
      ignores: [
        ".*.?(c|m)js",
        "*.setup*.?(c|m)js",
        "*.config*.?(c|m)js",
        "*.d.ts",
        ".turbo/",
        ".git/",
        "build/",
        "dist/",
        "coverage/",
        "node_modules/",
      ],
    },
  ),
  ...tsConfig,
  ...nextConfig,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
];
