import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  pluginReact.configs.flat.recommended,
  ...fixupConfigRules({
    rules: {
      // 0 - Disable
      // 1 - Warning
      // 2 - Error
      "react/react-in-jsx-scope": 0
    }
  }),
  {
    ignores: [
      "node_modules/*",
      ".next"
    ]
  }
];