import { readFileSync } from "fs";
import { displayWarningMessage } from "./cli/cliMessages";
import { USER_CONFIG_FILE_PATH } from "./constants";
import defaultConfig from "./default-config.json";

export type Config = {
  vNextTemplate: string;
  releaseTemplate: string;
  majorTemplate: string;
  minorTemplate: string;
  patchTemplate: string;
  useRegexInTemplates: boolean;
  parseTemplatesToRegex: boolean;
  dateFormat: string;
  bumpMinorByMajor: boolean;
  bumpMinorByPatch: boolean;
  sortChangelog: boolean;
  changelogPath: string;
  displayExampleCommit: boolean;
};

const getConfig = (): Config => {
  let config = defaultConfig;
  try {
    const userConfig = JSON.parse(readFileSync(USER_CONFIG_FILE_PATH, "utf-8"));
    config = { ...config, ...userConfig };
  } catch (e) {
    displayWarningMessage(
      "Couldn't read user config, using default config instead..."
    );
  }

  return config;
};

export default getConfig();
