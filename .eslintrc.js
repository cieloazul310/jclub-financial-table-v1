module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['react', '@typescript-eslint'],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    // Allows for the use of imports
    project: './tsconfig.eslint.json',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-props-no-spreading': 'warn',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/stories/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/function-component-definition': 'warn',
      },
    },
  ],
};
