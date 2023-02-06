import process from "process";
import prompts from "prompts";
import config from "../config";
import { writeToChangelog } from "./writeToChangelog";

enum Choices {
  Yes = "Yes",
  No = "No",
}

export const promptAddVNext = async (data: string): Promise<void> => {
  const response = await prompts({
    type: "select",
    name: "value",
    message:
      "Couldn't find vNext entry to replace it with proper version. Would you like to add vNext entry instead?",
    choices: [
      { title: Choices.Yes, value: Choices.Yes },
      { title: Choices.No, value: Choices.No },
    ],
  });

  if (response.value === Choices.No) {
    process.exit();
  }

  const changelogWithVNextAdded = [config.vNextTemplate, data].join("\n");

  await writeToChangelog(changelogWithVNextAdded);
};
