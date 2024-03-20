module.exports = {
    roots: ["<rootDir>"],
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
  