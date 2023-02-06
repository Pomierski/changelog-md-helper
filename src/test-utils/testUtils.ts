import config, { Config } from "../config";
import defaultConfig from "../default-config.json";

export const $testUtils = {
  overrideConfigValues: (overrideConfig: Partial<Config>) => {
    (config as Config) = { ...config, ...overrideConfig };

    return { config };
  },
  replaceConfig: (overrideConfig: Partial<Config>) => {
    (config as Partial<Config>) = { ...overrideConfig };

    return { config };
  },
  resetConfig: () => {
    (config as Config) = { ...defaultConfig };

    return { config };
  },
  getConfig: () => ({
    config,
  }),
};
