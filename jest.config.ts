import type { Config } from "jest";

import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  // testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "<rootDir>/.jest/test-utils.tsx",
    "<rootDir>/__mocks__/*",
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  watchPlugins: ["jest-watch-typeahead/filename"],
  coverageReporters: ["json", "html"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.*",
    "!**/*.d.ts",
    "!**/node_modules/**",
    // '!<rootDir>/src/components/**/*.stories.*',
    // '!<rootDir>/src/pages/_app.tsx'
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/core/(.*)$": "<rootDir>/src/core/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/tests(.*)$": "<rootDir>/.jest$1",
    "^@/mock(.*)$": "<rootDir>/__mock__/$1",
  },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
};

export default createJestConfig(jestConfig);
