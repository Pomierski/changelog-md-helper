import { program } from "commander";

export enum CLIOptions {
  sortOnly = "sortOnly",
  init = "init",
  versionOnly = "versionOnly"
}

program.option("-so, --sort-only");
program.option("-i, --init");
program.option("-vo, --version-only");

program.parse();

export const options = program.opts();
