import { program } from "commander";

export enum CLIOptions {
  sortOnly = "sortOnly",
  init = "init"
}

program.option("-so, --sort-only");
program.option("-i, --init");

program.parse();

export const options = program.opts();
