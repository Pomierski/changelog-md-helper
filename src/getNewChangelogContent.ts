import config from "./config";
import { getReleaseHeader } from "./core/getReleaseHeader";
import { ConfigPlaceholder } from "./types/configPlaceholder";

export const getNewChangelogContent = (data: string, version: string) => {
  const vNextTemplate = config.useRegexInTemplates
    ? new RegExp(config.vNextTemplate)
    : config.vNextTemplate;
  const isDateInTemplate = config.releaseTemplate.includes(
    ConfigPlaceholder.date
  );
  return data.replace(
    vNextTemplate,
    getReleaseHeader(config.releaseTemplate, {
      version,
      isDateInTemplate,
    })
  );
};
