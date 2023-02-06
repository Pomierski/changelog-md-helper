import config from "../config";
import { parseTextToRegex } from "./parseTextToRegex";

export const getComparsionForTemplate = (
  template: string,
  compare: string
): boolean => {
  if (config.useRegexInTemplates) {
    return Boolean(compare.match(new RegExp(template)));
  }

  if (config.parseTemplatesToRegex) {
    return Boolean(compare.match(parseTextToRegex(template)));
  }

  return compare.includes(template);
};
