module.exports = {
  "@typescript-eslint/no-unnecessary-condition": "off",
  "@typescript-eslint/no-confusing-void-expression": "off",
  "@typescript-eslint/unbound-method": [
    "error", 
    {
      "ignoreStatic": true
    },
  ],
  "import/order": [
    "error",
    {
      "groups": [
        ["builtin", "external", "internal"]
      ],
      "newlines-between": "always"
    }
  ],
  "@typescript-eslint/prefer-nullish-coalescing": [
    "error",
    {
      "ignoreConditionalTests": true,
      "ignoreTernaryTests": true,
    },
  ],
};