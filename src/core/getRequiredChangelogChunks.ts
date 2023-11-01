import config, { Config } from "../config";
import { GENERIC_VERSION } from "../constants";
import { ConfigPlaceholder } from "../types/configPlaceholder";
import { getComparsionForTemplate } from "../utils/getComparsionForTemplate";
import { getIsSortEnabled } from "../utils/getIsSortEnabled";
import { parseTextToRegex } from "../utils/parseTextToRegex";
import { promptAddVNext } from "./promptAddVNext";
import { sortChangelog } from "./sortChangelog";

export interface ChangelogChunks {
  vNext: string[];
  latestReleaseHeader: string;
  fullLog: string;
}

export const getRequiredChangelogChunks = async (
  changelogData: string,
  loadedConfig: Config = config,
  skipOptionalTasks?: boolean
): Promise<ChangelogChunks> => {
  const isSortEnabled = getIsSortEnabled();
  const lines = changelogData.split("\n");

  const vNextIndex = lines.findIndex((line) =>
    getComparsionForTemplate(loadedConfig.vNextTemplate, line)
  );

  if (vNextIndex === -1) {
    await promptAddVNext(changelogData);
  }

  const latestReleaseTemplate = loadedConfig.releaseTemplate
    .replace(ConfigPlaceholder.version, GENERIC_VERSION)
    .replace(
      ConfigPlaceholder.date,
      loadedConfig.dateFormat.replace(/[A-Za-z0-9]/g, "1")
    );

  const latestReleaseIndex = lines.findIndex((line) =>
    line.match(parseTextToRegex(latestReleaseTemplate))
  );

  const vNextChunk = lines.slice(vNextIndex, latestReleaseIndex);
  const vNext =
    isSortEnabled && !skipOptionalTasks
      ? sortChangelog(vNextChunk)
      : vNextChunk;

  return {
    vNext,
    latestReleaseHeader: lines[latestReleaseIndex],
    fullLog: isSortEnabled
      ? [...vNext, ...lines.slice(latestReleaseIndex)].join("\n")
      : changelogData,
  };
};
