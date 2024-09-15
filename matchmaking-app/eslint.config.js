import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"], // Ignore the 'dist' directory
  },
  {
    files: ["**/*.{js,jsx}"], // Apply to all JavaScript/JSX files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 standard
      globals: globals.browser, // Use browser global variables
      parserOptions: {
        ecmaVersion: "latest", // Latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module", // Set to 'module' for ES modules
      },
    },
    settings: { react: { version: "detect" } }, // Automatically detect the React version
    plugins: {
      react, // React plugin for ESLint
      "react-hooks": reactHooks, // React Hooks plugin
      "react-refresh": reactRefresh, // React Refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules, // Use recommended rules from ESLint core
      ...react.configs.recommended.rules, // Use recommended React rules
      ...react.configs["jsx-runtime"].rules, // Rules for new JSX runtime
      ...reactHooks.configs.recommended.rules, // Recommended rules for React hooks
      "react/jsx-no-target-blank": "off", // Disable target="_blank" rule
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
