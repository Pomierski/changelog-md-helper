import { readFile } from "fs/promises";
import { getReleaseVersion } from "../core/getReleaseVersion";
import { getRequiredChangelogChunks } from "../core/getRequiredChangelogChunks";

export const getReleaseHeaderOnly = async (changelogPath: string) => {
  const data = await readFile(changelogPath, "utf8");

  const requiredChangelogChunks = await getRequiredChangelogChunks(data);
  const releaseVersion = getReleaseVersion(requiredChangelogChunks);

  return releaseVersion;
};
