import { CLIOptions, options } from "../cli/options";
import config from "../config";

export const getIsSortEnabled = (): boolean =>
  config.sortChangelog || options[CLIOptions.sortOnly];
