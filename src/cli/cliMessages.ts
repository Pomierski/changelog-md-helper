import { blueBright, greenBright, redBright, yellow } from "colorette";

const addNewLine = (...message: string[]) => [message.join(" "), "\n"].join("");

export const displayFormattedError = (message: string) => {
  return console.log(addNewLine("❌", redBright(message)));
};

export const displaySuccessMessage = (message: string) => {
  return console.log(addNewLine("✅", greenBright(message)));
};

export const displayWarningMessage = (message: string) => {
  return console.log(addNewLine("⚠️ ", yellow(message)));
};

export const displayInfoMessage = (message: string) => {
  return console.log(addNewLine("➡️ ", blueBright(message)));
};
