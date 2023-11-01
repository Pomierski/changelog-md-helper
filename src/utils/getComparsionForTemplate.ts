import config, { Config } from "../config";
import { parseTextToRegex } from "./parseTextToRegex";

export const getComparsionForTemplate = (
  template: string,
  compare: string,
  loadedConfig: Config = config
): boolean => {
  if (loadedConfig.useRegexInTemplates) {
    return Boolean(compare.match(new RegExp(template)));
  }

  if (loadedConfig.parseTemplatesToRegex) {
    return Boolean(compare.match(parseTextToRegex(template)));
  }

  return compare.includes(template);
};
