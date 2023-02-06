import { writeFile } from "fs";
import {
  displayFormattedError,
  displaySuccessMessage,
} from "../cli/cliMessages";
import config from "../config";

export const writeToChangelog = async (content: string): Promise<never> => {
  return new Promise((resolve, reject) => {
    writeFile(config.changelogPath, content, (err: Error) => {
      if (err) {
        displayFormattedError(
          `Couldn't write changelog to ${config.changelogPath}. Check your config or anylize this error message`
        );
        console.error(err);
        reject(process.exit());
      }
      displaySuccessMessage(
        `Successfuly saved changes to ${config.changelogPath}`
      );

      resolve(process.exit());
    });
  });
};
