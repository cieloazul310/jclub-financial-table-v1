/** @type {import("eslint").Linter.Config} */
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ["airbnb", "airbnb-typescript", "prettier", "plugin:storybook/recommended"],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2024,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
    // Allows for the use of imports
    project: "./tsconfig.eslint.json",
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "react/jsx-props-no-spreading": "warn",
    "react/require-default-props": "off",
    "@typescript-eslint/naming-convention": "off",
    "import/extensions": [
      "warn",
      "never",
      {
        ignorePackages: true,
      }
    ],
  },
  overrides: [
    {
      files: ["./gatsby-*.*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["**/stories/**/*"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "react/function-component-definition": "warn",
      },
    },
  ],
};
