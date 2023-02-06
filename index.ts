#!/usr/bin/env node

import { readFile } from "fs";
import { displayFormattedError } from "./src/cli/cliMessages";
import { CLIOptions, options } from "./src/cli/options";
import config from "./src/config";
import { getReleaseVersion } from "./src/core/getReleaseVersion";
import { getRequiredChangelogChunks } from "./src/core/getRequiredChangelogChunks";
import { writeToChangelog } from "./src/core/writeToChangelog";
import { getNewChangelogContent } from "./src/getNewChangelogContent";

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

  if (options[CLIOptions.SortOnly]) {
    await writeToChangelog(requiredChangelogChunks.fullLog);
  }

  await writeToChangelog(
    getNewChangelogContent(requiredChangelogChunks.fullLog, releaseVersion)
  );
});
