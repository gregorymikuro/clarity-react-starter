import teslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import { importX } from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import process from "node:process";
import { configs as teslintConfigs } from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["node_modules/", ".react-router", "!**/.server", "!**/.client", "!**/server"],
  },
  ...teslintConfigs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ["**/*.{jsx,tsx,js,ts}"],
    ...reactPlugin.configs.flat.recommended,
    plugins: {
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: teslintParser,
      parserOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions.parserOptions,
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: process.cwd(),
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "import-x/newline-after-import": ["warn", { count: 1, considerComments: true }],
      "@typescript-eslint/consistent-type-imports": "warn",
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: ["return", "export"] },
        {
          blankLine: "always",
          prev: ["const", "let", "var", "block-like", "export"],
          next: "*",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var", "block-like", "export"],
          next: ["const", "let", "var", "block-like", "export"],
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
