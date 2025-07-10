const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
  testMatch: [
    '**/tests/unit/**/*.unit.test.ts',
    '**/tests/api/**/*.api.test.ts',
  ],
};