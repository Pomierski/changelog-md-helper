import { displayFormattedError } from "../cli/cliMessages";
import config, { Config } from "../config";
import { getComparsionForTemplate } from "../utils/getComparsionForTemplate";
import { getIsDateBeforeVersion } from "../utils/getIsDateBeforeVersion";
import { versionRegexGlobal } from "../utils/utils";
import { ChangelogChunks } from "./getRequiredChangelogChunks";

export interface Version {
  major: number;
  minor: number;
  patch: number;
}

const getUpdatedVersion = (
  version: Version,
  bump: keyof Version,
  loadedConfig: Config = config
): string => {
  const nextVersion = { ...version };

  if (loadedConfig.bumpMinorByMajor && bump === "major") {
    bump = "minor";
  } else if (loadedConfig.bumpMinorByPatch && bump === "patch") {
    bump = "minor";
  }

  nextVersion[bump] += 1;

  if (bump === "major") {
    nextVersion["minor"] = 0;
  }

  if (bump === "major" || bump === "minor") {
    nextVersion["patch"] = 0;
  }

  return Object.values(nextVersion).join(".");
};

export const getReleaseVersion = (
  changelogChunks: ChangelogChunks,
  loadedConfig: Config = config
): string => {
  const dateFormatIncludesDots = loadedConfig.dateFormat.includes(".");
  const correctVersionIndex =
    dateFormatIncludesDots && getIsDateBeforeVersion() ? 1 : 0;

  let latestReleaseVersion: RegExpMatchArray;

  try {
    const matchedVersion = [
      ...changelogChunks.latestReleaseHeader.matchAll(versionRegexGlobal),
    ];

    if (matchedVersion.length === 1 && dateFormatIncludesDots) {
      displayFormattedError(
        "Couldn't find version in latest release entry. Check your config"
      );
      process.exit();
    }

    latestReleaseVersion = matchedVersion[correctVersionIndex];
  } catch (error) {
    displayFormattedError(
      "Couldn't find version in latest release entry. Check your config"
    );
    process.exit();
  }

  const [latestReleaseMajor, latestReleaseMinor, latestReleasePatch] =
    latestReleaseVersion[0].split(".");

  const lastVersion = {
    major: parseInt(latestReleaseMajor),
    minor: parseInt(latestReleaseMinor),
    patch: parseInt(latestReleasePatch),
  };

  const majorFound = changelogChunks.vNext.find((line) =>
    getComparsionForTemplate(loadedConfig.majorTemplate, line)
  );

  if (majorFound) {
    return getUpdatedVersion(lastVersion, "major");
  }

  const minorFound = changelogChunks.vNext.find((line) =>
    getComparsionForTemplate(loadedConfig.minorTemplate, line)
  );

  if (minorFound) {
    return getUpdatedVersion(lastVersion, "minor");
  }

  const patchFound = changelogChunks.vNext.find((line) =>
    getComparsionForTemplate(loadedConfig.patchTemplate, line)
  );

  if (patchFound) {
    return getUpdatedVersion(lastVersion, "patch");
  }

  displayFormattedError(
    "Couldn't find any changelog entry that fits into MAJOR/MINOR/PATCH criteria."
  );

  process.exit();
};
