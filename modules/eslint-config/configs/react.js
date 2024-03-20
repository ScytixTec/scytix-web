const { resolve } = require('node:path');

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  plugins: [
    'import',
  ],
  rules: require("./base-rules"),
};
