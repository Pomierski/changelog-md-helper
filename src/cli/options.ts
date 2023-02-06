import { program } from "commander";

export enum CLIOptions {
  SortOnly = "sortOnly",
}

program.option("-so, --sort-only");

program.parse();

export const options = program.opts();
