#!/usr/bin/env node

import { readFile } from "fs";
import { stdout } from "node:process";
import { displayFormattedError } from "./src/cli/cliMessages";
import { CLIOptions, options } from "./src/cli/options";
import config from "./src/config";
import { getReleaseVersion } from "./src/core/getReleaseVersion";
import { getRequiredChangelogChunks } from "./src/core/getRequiredChangelogChunks";
import { initUserConfig } from "./src/core/initUserConfig";
import { writeToChangelog } from "./src/core/writeToChangelog";
import { getNewChangelogContent } from "./src/getNewChangelogContent";

if (options[CLIOptions.init]) {
  initUserConfig();
}

readFile(config.changelogPath, "utf8", async (err, data) => {
  if (err) {
    displayFormattedError(
      `Couldn't find or read ${config.changelogPath}. Check your config`
    );
    console.error(err);
    process.exit(1);
  }

  const requiredChangelogChunks = await getRequiredChangelogChunks(data);
  const releaseVersion = getReleaseVersion(requiredChangelogChunks);

  if (options[CLIOptions.sortOnly]) {
    await writeToChangelog(requiredChangelogChunks.fullLog);
  }

  if (options[CLIOptions.versionOnly]) {
    stdout.write(releaseVersion);

    return;
  }

  await writeToChangelog(
    getNewChangelogContent(requiredChangelogChunks.fullLog, releaseVersion)
  );
});
