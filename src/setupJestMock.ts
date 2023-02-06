import defaultConfig from "./default-config.json";

/* global jest */

jest.mock("./core/writeToChangelog", () => ({
  __esModule: true,
  writeToChangelog: jest.fn(),
}));

jest.mock("./config", () => {
  return {
    __esModule: true,
    default: defaultConfig,
  };
});
