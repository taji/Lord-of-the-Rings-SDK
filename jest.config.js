const { createDefaultPreset } = require("ts-jest");

// adding commment.

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    '^.+\.ts$': 'ts-jest',
  },
};