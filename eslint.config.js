import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  { settings: { react: { version: "detect" } } },
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
);
