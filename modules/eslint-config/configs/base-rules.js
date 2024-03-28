module.exports = {
  "eslint-comments/require-description": "off",
  "@typescript-eslint/no-unnecessary-condition": "off",
  "@typescript-eslint/no-confusing-void-expression": "off",
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "enumMember",
      "format": ["UPPER_CASE"]
    }
  ],  
  "@typescript-eslint/unbound-method": ["error", {
    "ignoreStatic": true
  }],
  "import/order": [
    "error",
    {
      groups: [
        ["builtin", "external", "internal"]
      ],
      "newlines-between": "always"
    }
  ],
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksVoidReturn": false
    }
  ],  
  "@typescript-eslint/prefer-nullish-coalescing": [
    "error",
    {
      "ignoreConditionalTests": true,
      "ignoreTernaryTests": true,
    },
  ],
  "@typescript-eslint/no-misused-promises": [
    "error",
    {
      "checksVoidReturn": false
    }
  ],  
};