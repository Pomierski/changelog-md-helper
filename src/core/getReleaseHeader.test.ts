import dayjs from "dayjs";
import config from "../config";
import { $testUtils } from "../test-utils/testUtils";
import { ConfigPlaceholder } from "../types/configPlaceholder";
import { getReleaseHeader } from "./getReleaseHeader";

afterAll(() => {
  $testUtils.resetConfig();
});

describe("getReleaseHeader", () => {
  it("should correctly return latest version header", () => {
    const today = dayjs().format(config.dateFormat);

    const changelogLatestVersion1 = `[v1.0.0] ${today}`;
    const changelogLatestVersion2 = `${today} [v1.0.0]`;

    const releaseTemplate1 = `[v${ConfigPlaceholder.version}] ${ConfigPlaceholder.date}`;
    const releaseTemplate2 = `${ConfigPlaceholder.date} [v${ConfigPlaceholder.version}]`;

    expect(
      getReleaseHeader(releaseTemplate1, {
        version: "1.0.0",
        isDateInTemplate: true,
      })
    ).toBe(changelogLatestVersion1);
    expect(
      getReleaseHeader(releaseTemplate2, {
        version: "1.0.0",
        isDateInTemplate: true,
      })
    ).toBe(changelogLatestVersion2);
  });
  it("should correctly use date format from config", () => {
    const dateFormat1 = "DD-MM-YYYY";
    const dateFormat2 = "YYYY.MM.DD";

    const changelogLatestVersion1 = `[v1.0.0] ${dayjs().format(dateFormat1)}`;
    const changelogLatestVersion2 = `${dayjs().format(dateFormat2)} [v1.0.0]`;

    const releaseTemplate1 = `[v${ConfigPlaceholder.version}] ${ConfigPlaceholder.date}`;
    const releaseTemplate2 = `${ConfigPlaceholder.date} [v${ConfigPlaceholder.version}]`;

    $testUtils.overrideConfigValues({ dateFormat: dateFormat1 });

    expect(
      getReleaseHeader(releaseTemplate1, {
        version: "1.0.0",
        isDateInTemplate: true,
      })
    ).toBe(changelogLatestVersion1);

    $testUtils.overrideConfigValues({ dateFormat: dateFormat2 });

    expect(
      getReleaseHeader(releaseTemplate2, {
        version: "1.0.0",
        isDateInTemplate: true,
      })
    ).toBe(changelogLatestVersion2);
  });
});
