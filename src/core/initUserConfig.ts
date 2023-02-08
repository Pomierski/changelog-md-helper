import { copyFile } from "fs";
import path from "path";
import {
  displayFormattedError,
  displaySuccessMessage,
} from "../cli/cliMessages";

const defaultConfigPath = path.join(__dirname, "../default-config.json");

export const initUserConfig = () => {
  copyFile(
    defaultConfigPath,
    "./cmh-config.json",
    (err) => {
      if (err) {
        console.error(err);
        displayFormattedError("Couldn't initialize config.");
        process.exit(1);
      }

      displaySuccessMessage("Initialized cmh-config.json");
      process.exit();
    }
  );
};
