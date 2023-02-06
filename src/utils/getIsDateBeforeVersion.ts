import config from "../config";
import { ConfigPlaceholder } from "../types/configPlaceholder";

export const getIsDateBeforeVersion = (): boolean => {
  const releaseTemplate = config.releaseTemplate.split(" ");

  const dateIndex = releaseTemplate.findIndex((line) =>
    line.includes(ConfigPlaceholder.date)
  );

  if (dateIndex === -1) {
    return false;
  }

  const versionIndex = releaseTemplate.findIndex((line) =>
    line.includes(ConfigPlaceholder.version)
  );

  return dateIndex < versionIndex;
};
