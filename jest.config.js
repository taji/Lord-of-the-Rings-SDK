const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "html"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/core/types.ts"
  ],
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
  testMatch: [
    '**/tests/unit/**/*.unit.test.ts',
    '**/tests/api/**/*.api.test.ts',
  ],
};