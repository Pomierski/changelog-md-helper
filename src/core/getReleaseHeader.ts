import dayjs from "dayjs";
import { displayFormattedError, displayInfoMessage } from "../cli/cliMessages";
import config from "../config";
import { ConfigPlaceholder } from "../types/configPlaceholder";

export type ReleasePlaceholderConfig = {
  version?: string;
  isDateInTemplate?: boolean;
};

export const getReleaseHeader = (
  template: string,
  headerConfig: ReleasePlaceholderConfig
): string => {
  if (!headerConfig.version) {
    displayFormattedError(`Couldn't find vNext or lastest version.`);
    process.exit();
  }
  const replaceVersion = template.replace(
    ConfigPlaceholder.version,
    headerConfig.version
  );

  const releaseHeader = headerConfig.isDateInTemplate
    ? replaceVersion.replace(
        ConfigPlaceholder.date,
        dayjs().format(config.dateFormat)
      )
    : replaceVersion;

  if (config.displayExampleCommit) {
    displayInfoMessage(`Example commit msg: ${releaseHeader}`);
  }

  return releaseHeader;
};
