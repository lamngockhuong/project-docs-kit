import eslint from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import next from '@next/eslint-plugin-next';
import { fixupConfigRules } from '@eslint/compat';
import tsEslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const tsConfig = (
  tsEslint.configs.strict
);

const nextConfig = (
  fixupConfigRules(
    (compat.config(next.configs['core-web-vitals'])),
  )
);

export default [
  ...tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    prettierRecommended,
    {
      ignores: [
        '.*.?(c|m)js',
        '*.setup*.?(c|m)js',
        '*.config*.?(c|m)js',
        '*.d.ts',
        '.turbo/',
        '.git/',
        'build/',
        'dist/',
        'coverage/',
        'node_modules/',
        '.next/',
        'public/',
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
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React specific rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-unwanted-polyfillio': 'error',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
];
