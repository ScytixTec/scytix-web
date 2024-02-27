module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts)",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  testPathIgnorePatterns: [
    ".config.ts"
  ],
};
